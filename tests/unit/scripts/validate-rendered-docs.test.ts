import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import {
  normalizeBase,
  normalizeOrigin,
  validateRenderedSite,
} from '../../../scripts/validate-rendered-docs.mjs';

const temporaryDirectories: string[] = [];

async function createSite(files: Record<string, string>) {
  const directory = await mkdtemp(join(tmpdir(), 'rendered-docs-'));
  temporaryDirectories.push(directory);
  for (const [path, contents] of Object.entries(files)) {
    const destination = join(directory, path);
    await mkdir(join(destination, '..'), { recursive: true });
    await writeFile(destination, contents);
  }
  return directory;
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true }))
  );
});

describe('validateRenderedSite', () => {
  it('validates root and Russian navigation with the configured base and valid fragments', async () => {
    const site = await createSite({
      'index.html': '<a href="/sdk/guide.html#setup">Guide</a><a href="/sdk/ru/">Русский</a>',
      'guide.html': '<h2 id="setup">Setup</h2><a href="https://example.com/docs">External</a>',
      'ru/index.html':
        '<a href="/sdk/guide.html#setup">Общий API</a><a href="/sdk/ru/help.html">Помощь</a>',
      'ru/help.html': '<h1 id="help">Помощь</h1>',
    });

    const result = await validateRenderedSite({ distDirectory: site, base: '/sdk/' });

    expect(result.errors).toEqual([]);
    expect(result.htmlRoutes).toBe(4);
    expect(result.rootLocaleRoutes).toBe(2);
    expect(result.russianLocaleRoutes).toBe(2);
    expect(result.fragmentReferences).toBe(2);
    expect(result.externalReferences).toBe(1);
  });

  it.each([
    ['route', '<a href="/sdk/missing.html">Missing</a>', 'route'],
    ['fragment', '<a href="/sdk/guide.html#missing">Missing anchor</a>', 'fragment'],
    ['base path', '<a href="/guide.html">Wrong base</a>', 'base'],
    ['locale route', '<a href="/sdk/ru/missing.html">Missing RU page</a>', 'route'],
  ])('reports a broken %s', async (_label, link, errorType) => {
    const site = await createSite({
      'index.html': link,
      'guide.html': '<h2 id="setup">Setup</h2>',
      'ru/index.html': '<h1 id="ru">RU</h1>',
    });

    const result = await validateRenderedSite({ distDirectory: site, base: '/sdk/' });

    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].type).toBe(errorType);
  });

  it('accepts extensionless and explicit .html routes when both resolve to rendered HTML', async () => {
    const site = await createSite({
      'index.html': '<a href="/sdk/guide">Clean</a><a href="/sdk/guide.html">HTML</a>',
      'guide.html': '<h1 id="guide">Guide</h1>',
    });

    const result = await validateRenderedSite({ distDirectory: site, base: 'sdk' });

    expect(result.errors).toEqual([]);
  });

  it('validates absolute and protocol-relative same-site URLs while inventorying other origins', async () => {
    const site = await createSite({
      'index.html': [
        '<a href="https://docs.example/sdk/guide.html#setup">Absolute</a>',
        '<a href="//docs.example/sdk/guide#setup">Protocol relative</a>',
        '<a href="https://external.example/docs">External</a>',
      ].join(''),
      'guide.html': '<h2 id="setup">Setup</h2>',
    });

    const result = await validateRenderedSite({
      distDirectory: site,
      base: '/sdk/',
      siteOrigin: 'https://docs.example',
    });

    expect(result.errors).toEqual([]);
    expect(result.internalReferences).toBe(2);
    expect(result.fragmentReferences).toBe(2);
    expect(result.externalReferences).toBe(1);
    expect(result.externalUrls).toEqual(['https://external.example/docs']);
  });

  it.each([
    [
      'absolute same-site route',
      '<a href="https://docs.example/sdk/missing.html">Missing</a>',
      'route',
    ],
    [
      'absolute same-site fragment',
      '<a href="https://docs.example/sdk/guide.html#missing">Missing</a>',
      'fragment',
    ],
    [
      'absolute same-site wrong base',
      '<a href="https://docs.example/guide.html">Wrong base</a>',
      'base',
    ],
  ])('rejects a broken %s', async (_label, link, errorType) => {
    const site = await createSite({
      'index.html': link,
      'guide.html': '<h2 id="setup">Setup</h2>',
    });

    const result = await validateRenderedSite({
      distDirectory: site,
      base: '/sdk/',
      siteOrigin: 'https://docs.example',
    });

    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].type).toBe(errorType);
  });

  it('enforces required routes', async () => {
    const site = await createSite({
      'index.html': '<h1>Docs</h1>',
    });

    const result = await validateRenderedSite({
      distDirectory: site,
      base: '/sdk/',
      requiredRoutes: ['/', '/ru/'],
    });

    expect(result.errors).toEqual([
      expect.objectContaining({ type: 'required-route', reference: '/ru/' }),
    ]);
  });

  it('accepts a base-aware local SVG favicon and clean Russian API placeholder', async () => {
    const site = await createSite({
      'index.html': '<link rel="icon" type="image/svg+xml" href="/sdk/favicon.svg">',
      'favicon.svg': '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
      'ru/api/classes/Module.html': '<p>Справочник доступен на английском языке.</p>',
    });

    const result = await validateRenderedSite({
      distDirectory: site,
      base: '/sdk/',
      requiredFavicon: true,
      forbidLiteralScriptSetupRoutes: ['/ru/api/'],
    });

    expect(result.errors).toEqual([]);
    expect(result.faviconReferences).toBe(1);
  });

  it.each([
    ['missing favicon', { 'index.html': '<h1>Docs</h1>' }, 'required-favicon'],
    [
      'wrong-base favicon',
      {
        'index.html': '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
        'favicon.svg': '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
      },
      'base',
    ],
    [
      'literal script setup placeholder',
      {
        'index.html': '<link rel="icon" type="image/svg+xml" href="/sdk/favicon.svg">',
        'favicon.svg': '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
        'ru/api/classes/Module.html': '<p>&lt;script setup&gt;</p>',
      },
      'literal-script-setup',
    ],
  ])('rejects %s', async (_label, files, errorType) => {
    const site = await createSite(files);

    const result = await validateRenderedSite({
      distDirectory: site,
      base: '/sdk/',
      requiredFavicon: true,
      forbidLiteralScriptSetupRoutes: ['/ru/api/'],
    });

    expect(result.errors).toContainEqual(expect.objectContaining({ type: errorType }));
  });

  it.each([
    ['locale switch', '/', '/ru/'],
    ['sidebar target', '/guide.html', '/target.html'],
  ])('enforces a required %s link', async (_label, sourceRoute, targetRoute) => {
    const site = await createSite({
      'index.html': '<h1>Docs</h1>',
      'ru/index.html': '<h1>RU</h1>',
      'guide.html': '<h1>Guide</h1>',
      'target.html': '<h1>Target</h1>',
    });

    const result = await validateRenderedSite({
      distDirectory: site,
      base: '/sdk/',
      requiredLinks: [{ sourceRoute, targetRoute }],
    });

    expect(result.errors).toEqual([expect.objectContaining({ type: 'required-link' })]);
  });
});

describe('normalizeBase', () => {
  it.each([
    ['/', '/'],
    ['sdk', '/sdk/'],
    ['/sdk', '/sdk/'],
    ['/sdk/', '/sdk/'],
  ])('normalizes %s', (input, expected) => {
    expect(normalizeBase(input)).toBe(expected);
  });
});

describe('normalizeOrigin', () => {
  it('normalizes a canonical HTTP(S) origin', () => {
    expect(normalizeOrigin('https://docs.example')).toBe('https://docs.example');
  });

  it.each(['ftp://docs.example', 'https://docs.example/path', 'https://user:secret@docs.example'])(
    'rejects non-canonical origin %s',
    (origin) => {
      expect(() => normalizeOrigin(origin)).toThrow();
    }
  );
});
