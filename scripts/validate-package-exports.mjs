import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
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
const packResult = spawnSync(npmCommand, ['pack', '--dry-run', '--json', '--ignore-scripts'], {
  cwd: root,
  encoding: 'utf8',
});
if (packResult.status !== 0) {
  throw new Error(`npm pack --dry-run failed:\n${packResult.stderr}`);
}
const [packManifest] = JSON.parse(packResult.stdout);
const packedFiles = new Set(packManifest.files.map((file) => file.path));
for (const conditions of Object.values(packageJson.exports)) {
  for (const condition of ['import', 'require', 'types']) {
    const packedPath = conditions[condition].replace(/^\.\//, '');
    if (!packedFiles.has(packedPath)) {
      throw new Error(`The npm tarball is missing ${packedPath}`);
    }
  }
}

console.log(
  `Validated ${Object.keys(packageJson.exports).length} package export surfaces across ${String(packManifest.entryCount)} packed files`
);
