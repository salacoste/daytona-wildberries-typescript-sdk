import { describe, expect, it } from 'vitest';

// The validator is an executable ESM script and intentionally remains outside tsconfig's JS inputs.
// @ts-expect-error no declaration file is emitted for repository validation scripts
import { parseNpmPackManifest } from '../../../scripts/validate-package-exports.mjs';

describe('parseNpmPackManifest', () => {
  const manifest = {
    filename: 'daytona-wildberries-typescript-sdk-4.6.0.tgz',
    files: [{ path: 'dist/esm/index.js' }, { path: 'package.json' }],
    entryCount: 2,
  };

  it('parses the npm array output used by npm 10', () => {
    expect(parseNpmPackManifest(JSON.stringify([manifest]))).toEqual(manifest);
  });

  it('parses the package-name keyed object emitted by current npm', () => {
    expect(
      parseNpmPackManifest(JSON.stringify({ 'daytona-wildberries-typescript-sdk': manifest }))
    ).toEqual(manifest);
  });

  it.each(['', '{not-json}', '{}', '[]'])(
    'rejects malformed or empty pack output: %j',
    (stdout) => {
      expect(() => parseNpmPackManifest(stdout)).toThrow(/npm pack --dry-run/);
    }
  );

  const invalidFiles = [
    { label: 'empty files', files: [] },
    { label: 'null member', files: [null] },
    { label: 'object without path', files: [{}] },
    { label: 'empty path', files: [{ path: '' }] },
    { label: 'non-string path', files: [{ path: 42 }] },
  ];

  it.each(invalidFiles)('rejects $label in the npm array form', ({ files }) => {
    expect(() => parseNpmPackManifest(JSON.stringify([{ ...manifest, files }]))).toThrow(
      /npm pack --dry-run npm array manifest/
    );
  });

  it.each(invalidFiles)('rejects $label in the package-name keyed form', ({ files }) => {
    expect(() =>
      parseNpmPackManifest(
        JSON.stringify({ 'daytona-wildberries-typescript-sdk': { ...manifest, files } })
      )
    ).toThrow(/npm pack --dry-run package-name keyed object manifest/);
  });
});
