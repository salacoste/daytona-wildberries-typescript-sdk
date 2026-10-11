import {
  access,
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const expectedRuntimeExports = {
  '.': 'WildberriesSDK',
  './finances': 'FinancesModule',
  './analytics': 'AnalyticsModule',
  './communications': 'CommunicationsModule',
  './reports': 'ReportsModule',
};

const packageConsumerFixtures = resolve(root, 'package-consumer-fixtures');

const esmRuntimeConsumer = `import * as rootPackage from 'daytona-wildberries-typescript-sdk';
import * as financesPackage from 'daytona-wildberries-typescript-sdk/finances';
import * as analyticsPackage from 'daytona-wildberries-typescript-sdk/analytics';
import * as communicationsPackage from 'daytona-wildberries-typescript-sdk/communications';
import * as reportsPackage from 'daytona-wildberries-typescript-sdk/reports';

for (const [subpath, value] of [
  ['.', rootPackage.WildberriesSDK],
  ['./finances', financesPackage.FinancesModule],
  ['./analytics', analyticsPackage.AnalyticsModule],
  ['./communications', communicationsPackage.CommunicationsModule],
  ['./reports', reportsPackage.ReportsModule],
]) {
  if (typeof value !== 'function') {
    throw new Error(\`Packed ESM export \${subpath} did not resolve to its constructor\`);
  }
}
`;

const cjsRuntimeConsumer = `const rootPackage = require('daytona-wildberries-typescript-sdk');
const financesPackage = require('daytona-wildberries-typescript-sdk/finances');
const analyticsPackage = require('daytona-wildberries-typescript-sdk/analytics');
const communicationsPackage = require('daytona-wildberries-typescript-sdk/communications');
const reportsPackage = require('daytona-wildberries-typescript-sdk/reports');

for (const [subpath, value] of [
  ['.', rootPackage.WildberriesSDK],
  ['./finances', financesPackage.FinancesModule],
  ['./analytics', analyticsPackage.AnalyticsModule],
  ['./communications', communicationsPackage.CommunicationsModule],
  ['./reports', reportsPackage.ReportsModule],
]) {
  if (typeof value !== 'function') {
    throw new Error(\`Packed CommonJS export \${subpath} did not resolve to its constructor\`);
  }
}
`;

/**
 * Normalize npm's version-dependent `npm pack --dry-run --json` output.
 * npm 10 emits an array; newer npm versions may emit an object keyed by package name.
 *
 * @param {string} stdout
 * @returns {{ files: Array<{ path: string }>, entryCount?: number }}
 */
export function parseNpmPackManifest(stdout) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch (error) {
    throw new Error(
      `npm pack --dry-run returned malformed JSON: ${error instanceof Error ? error.message : String(error)}`
    );
  }

  const outerForm = Array.isArray(parsed) ? 'npm array' : 'package-name keyed object';
  const manifest = Array.isArray(parsed)
    ? parsed[0]
    : parsed && typeof parsed === 'object'
      ? Object.values(parsed)[0]
      : undefined;

  if (!manifest || typeof manifest !== 'object' || !Array.isArray(manifest.files)) {
    throw new Error('npm pack --dry-run returned no package manifest with a files array');
  }

  if (manifest.files.length === 0) {
    throw new Error(`npm pack --dry-run ${outerForm} manifest contains an empty files array`);
  }

  for (const [index, file] of manifest.files.entries()) {
    if (
      !file ||
      typeof file !== 'object' ||
      typeof file.path !== 'string' ||
      file.path.trim() === ''
    ) {
      throw new Error(
        `npm pack --dry-run ${outerForm} manifest files[${String(index)}] must be an object with a non-empty string path`
      );
    }
  }

  return manifest;
}

function runChecked(command, args, cwd, label) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });

  if (result.status !== 0) {
    throw new Error(
      `${label} failed with exit ${String(result.status)}:\n${result.stdout}${result.stderr}`
    );
  }
}

function runExpectedTypeFailure(command, args, cwd, label, expectedDiagnostic) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  const output = `${result.stdout}${result.stderr}`;

  if (result.status === 0) {
    throw new Error(`${label} unexpectedly compiled successfully`);
  }
  if (!output.includes(expectedDiagnostic)) {
    throw new Error(
      `${label} failed without the expected diagnostic ${JSON.stringify(expectedDiagnostic)}:\n${output}`
    );
  }
}

async function validatePackedConsumers(npmCommand) {
  const validationRoot = await mkdtemp(resolve(tmpdir(), 'wb-sdk-package-validation-'));

  try {
    const packDirectory = resolve(validationRoot, 'pack');
    const extractDirectory = resolve(validationRoot, 'extract');
    const consumerRoot = resolve(validationRoot, 'consumer');
    const consumerNodeModules = resolve(consumerRoot, 'node_modules');
    await Promise.all([
      mkdir(packDirectory, { recursive: true }),
      mkdir(extractDirectory, { recursive: true }),
      mkdir(consumerNodeModules, { recursive: true }),
    ]);

    const packResult = spawnSync(
      npmCommand,
      ['pack', '--json', '--ignore-scripts', '--pack-destination', packDirectory],
      {
        cwd: root,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      }
    );
    if (packResult.status !== 0) {
      throw new Error(`npm pack failed:\n${packResult.stdout}${packResult.stderr}`);
    }

    const packManifest = parseNpmPackManifest(packResult.stdout);
    if (typeof packManifest.filename !== 'string' || packManifest.filename.trim() === '') {
      throw new Error('npm pack returned no tarball filename');
    }

    const packedFiles = new Set(packManifest.files.map((file) => file.path));
    for (const conditions of Object.values(packageJson.exports)) {
      for (const condition of ['import', 'require', 'types']) {
        const packedPath = conditions[condition].replace(/^\.\//, '');
        if (!packedFiles.has(packedPath)) {
          throw new Error(`The npm tarball is missing ${packedPath}`);
        }
      }
    }

    const tarballPath = resolve(packDirectory, packManifest.filename);
    runChecked('tar', ['-xzf', tarballPath, '-C', extractDirectory], root, 'tarball extraction');

    const packedPackageRoot = resolve(consumerNodeModules, packageJson.name);
    await rename(resolve(extractDirectory, 'package'), packedPackageRoot);
    await symlink(
      resolve(root, 'node_modules/axios'),
      resolve(consumerNodeModules, 'axios'),
      'dir'
    );
    await Promise.all([
      writeFile(resolve(consumerRoot, 'package.json'), '{"private":true,"type":"module"}\n'),
      copyFile(
        resolve(packageConsumerFixtures, 'news-public-types.mts'),
        resolve(consumerRoot, 'consumer.mts')
      ),
      copyFile(
        resolve(packageConsumerFixtures, 'news-public-types.cts'),
        resolve(consumerRoot, 'consumer.cts')
      ),
      copyFile(
        resolve(packageConsumerFixtures, 'full-okpd-locale-negative.mts'),
        resolve(consumerRoot, 'full-okpd-locale-negative.mts')
      ),
      writeFile(resolve(consumerRoot, 'runtime.mjs'), esmRuntimeConsumer),
      writeFile(resolve(consumerRoot, 'runtime.cjs'), cjsRuntimeConsumer),
    ]);

    const tscPath = resolve(root, 'node_modules/typescript/bin/tsc');
    const strictNodeNextArgs = [
      tscPath,
      '--noEmit',
      '--strict',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      '--target',
      'ES2022',
      '--skipLibCheck',
      'false',
    ];
    runChecked(
      process.execPath,
      [...strictNodeNextArgs, resolve(consumerRoot, 'consumer.mts')],
      consumerRoot,
      'strict packed ESM type consumer'
    );
    runChecked(
      process.execPath,
      [...strictNodeNextArgs, resolve(consumerRoot, 'consumer.cts')],
      consumerRoot,
      'strict packed CommonJS type consumer'
    );
    runExpectedTypeFailure(
      process.execPath,
      [...strictNodeNextArgs, resolve(consumerRoot, 'full-okpd-locale-negative.mts')],
      consumerRoot,
      'strict packed full-OKPD2 locale negative consumer',
      `Type '"en"' is not assignable to type '"ru"'`
    );
    runChecked(process.execPath, ['runtime.mjs'], consumerRoot, 'packed ESM runtime consumer');
    runChecked(process.execPath, ['runtime.cjs'], consumerRoot, 'packed CommonJS runtime consumer');

    return packManifest;
  } finally {
    await rm(validationRoot, { recursive: true, force: true });
  }
}

async function main() {
  for (const [subpath, conditions] of Object.entries(packageJson.exports)) {
    const expectedExport = expectedRuntimeExports[subpath];
    if (!expectedExport) {
      throw new Error(`No package-export assertion is defined for ${subpath}`);
    }

    for (const condition of ['import', 'require', 'types']) {
      const target = conditions[condition];
      if (!target) {
        throw new Error(`${subpath} is missing its ${condition} target`);
      }
      await access(resolve(root, target));
    }

    const esm = await import(pathToFileURL(resolve(root, conditions.import)).href);
    if (typeof esm[expectedExport] !== 'function') {
      throw new Error(`${subpath} ESM target does not export ${expectedExport}`);
    }

    const cjs = require(resolve(root, conditions.require));
    if (typeof cjs[expectedExport] !== 'function') {
      throw new Error(`${subpath} CommonJS target does not export ${expectedExport}`);
    }
  }

  const analyticsExport = packageJson.exports['./analytics'];
  const analyticsEsm = await import(pathToFileURL(resolve(root, analyticsExport.import)).href);
  const analyticsCjs = require(resolve(root, analyticsExport.require));
  for (const moduleFormat of [analyticsEsm, analyticsCjs]) {
    if (typeof moduleFormat.AnalyticsModule.prototype.getItemRatingV2 !== 'function') {
      throw new Error('The packed analytics runtime is missing getItemRatingV2()');
    }
  }

  const analyticsDeclarations = await readFile(resolve(root, analyticsExport.types), 'utf8');
  for (const declaration of ['getItemRatingV2', 'ItemRatingV2Request', 'ItemRatingV2Response']) {
    if (!analyticsDeclarations.includes(declaration)) {
      throw new Error(`The analytics declaration surface is missing ${declaration}`);
    }
  }

  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const packManifest = await validatePackedConsumers(npmCommand);

  console.log(
    `Validated ${Object.keys(packageJson.exports).length} package export surfaces across ${String(packManifest.entryCount)} packed files with strict NodeNext ESM/CommonJS type and runtime consumers`
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await main();
}
