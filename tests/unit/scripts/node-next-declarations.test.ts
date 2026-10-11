import { describe, expect, it } from 'vitest';

import {
  rewriteNodeNextDeclarationSpecifiers,
  type RelativeDeclarationTarget,
} from '../../../scripts/node-next-declarations';

describe('rewriteNodeNextDeclarationSpecifiers', () => {
  const targets = new Map<string, RelativeDeclarationTarget>([
    ['./client/base-client', 'file'],
    ['./modules/analytics', 'directory'],
    ['./types/products.types', 'file'],
    ['./utils', 'directory'],
  ]);
  const resolveTarget = (specifier: string): RelativeDeclarationTarget | undefined =>
    targets.get(specifier);

  it('adds runtime-resolvable specifiers for files and index directories', () => {
    const content = [
      "import { BaseClient } from './client/base-client';",
      "export { AnalyticsModule } from './modules/analytics';",
      "export type { ProductCard } from './types/products.types';",
      "export type Utils = import('./utils').Utils;",
      '',
    ].join('\n');

    expect(
      rewriteNodeNextDeclarationSpecifiers('/dist/esm/index.d.ts', content, resolveTarget)
    ).toBe(
      [
        "import { BaseClient } from './client/base-client.js';",
        "export { AnalyticsModule } from './modules/analytics/index.js';",
        "export type { ProductCard } from './types/products.types.js';",
        "export type Utils = import('./utils/index.js').Utils;",
        '',
      ].join('\n')
    );
  });

  it('rewrites import-equals declarations while preserving packages, explicit extensions, and comments', () => {
    const content = [
      "import BaseClient = require('./client/base-client');",
      "import type { AxiosInstance } from 'axios';",
      "export { ready } from './ready.js';",
      "/** Example: import { AnalyticsModule } from './modules/analytics'; */",
      '',
    ].join('\n');

    expect(
      rewriteNodeNextDeclarationSpecifiers('/dist/esm/index.d.ts', content, resolveTarget)
    ).toBe(
      [
        "import BaseClient = require('./client/base-client.js');",
        "import type { AxiosInstance } from 'axios';",
        "export { ready } from './ready.js';",
        "/** Example: import { AnalyticsModule } from './modules/analytics'; */",
        '',
      ].join('\n')
    );
  });

  it('fails the build when a relative declaration target cannot be classified', () => {
    expect(() =>
      rewriteNodeNextDeclarationSpecifiers(
        '/dist/esm/index.d.ts',
        "export { Missing } from './missing';\n",
        resolveTarget
      )
    ).toThrow('Cannot resolve declaration specifier "./missing"');
  });
});
