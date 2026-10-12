#!/usr/bin/env node

import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const NON_ROUTE_SCHEMES = /^(?:data:|javascript:)/i;
const HTTP_PROTOCOLS = new Set(['http:', 'https:']);

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function decodeUrlComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeBase(base) {
  if (typeof base !== 'string' || base.includes('?') || base.includes('#')) {
    throw new Error('The documentation base must be a path without a query or fragment');
  }

  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function normalizeOrigin(origin) {
  const url = new URL(origin);
  if (
    !HTTP_PROTOCOLS.has(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'The documentation origin must be an HTTP(S) origin without credentials, path, query, or fragment'
    );
  }
  return url.origin;
}

async function listFiles(root, extension) {
  const files = [];

  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(path);
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        files.push(path);
      }
    }
  }

  await walk(root);
  return files.sort();
}

function extractAttributeValues(html, attribute) {
  const values = [];
  const pattern = new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'gis');
  for (const match of html.matchAll(pattern)) {
    values.push(decodeHtml(match[2]));
  }
  return values;
}

function renderedPathForFile(distDirectory, file) {
  const path = relative(distDirectory, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -'index.html'.length)}`;
  return `/${path}`;
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolveRenderedTarget(distDirectory, routePath) {
  const decodedPath = decodeUrlComponent(routePath);
  const relativePath = decodedPath.replace(/^\/+/, '');
  const direct = resolve(distDirectory, relativePath);
  const relativeDirect = relative(resolve(distDirectory), direct);

  if (relativeDirect.startsWith('..') || relativeDirect === '') {
    if (relativeDirect === '') {
      return (await isFile(join(direct, 'index.html'))) ? join(direct, 'index.html') : null;
    }
    return null;
  }

  const candidates = [];
  if (decodedPath.endsWith('/')) {
    candidates.push(join(direct, 'index.html'));
  } else if (extname(decodedPath)) {
    candidates.push(direct);
  } else {
    candidates.push(`${direct}.html`, join(direct, 'index.html'), direct);
  }

  for (const candidate of candidates) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

function formatReference(sourceRoute, href) {
  return `${sourceRoute} -> ${href}`;
}

export async function validateRenderedSite({
  distDirectory,
  base = '/',
  siteOrigin = 'https://docs.invalid',
  requiredRoutes = [],
  requiredLinks = [],
}) {
  const normalizedBase = normalizeBase(base);
  const normalizedOrigin = normalizeOrigin(siteOrigin);
  const absoluteDist = resolve(distDirectory);
  const htmlFiles = await listFiles(absoluteDist, '.html');
  if (htmlFiles.length === 0) {
    throw new Error(`No rendered HTML files found in ${absoluteDist}`);
  }

  const htmlCache = new Map();
  const idCache = new Map();
  const errors = [];
  const externalUrls = new Set();
  const discoveredInternalLinks = new Map();
  let internalReferences = 0;
  let externalReferences = 0;
  let fragmentReferences = 0;
  let rootLocaleRoutes = 0;
  let russianLocaleRoutes = 0;

  async function loadHtml(file) {
    if (!htmlCache.has(file)) htmlCache.set(file, await readFile(file, 'utf8'));
    return htmlCache.get(file);
  }

  async function loadIds(file) {
    if (!idCache.has(file)) {
      const html = await loadHtml(file);
      idCache.set(file, new Set(extractAttributeValues(html, 'id')));
    }
    return idCache.get(file);
  }

  for (const htmlFile of htmlFiles) {
    const sourceRoute = renderedPathForFile(absoluteDist, htmlFile);
    if (sourceRoute.startsWith('/ru/')) russianLocaleRoutes += 1;
    else rootLocaleRoutes += 1;

    const sourceUrl = new URL(
      `${normalizedBase.replace(/^\//, '')}${sourceRoute.replace(/^\//, '')}`,
      `${normalizedOrigin}/`
    );
    const html = await loadHtml(htmlFile);

    for (const rawHref of extractAttributeValues(html, 'href')) {
      const href = rawHref.trim();
      if (!href || NON_ROUTE_SCHEMES.test(href)) continue;

      let targetUrl;
      try {
        targetUrl = new URL(href, sourceUrl);
      } catch {
        errors.push({
          type: 'route',
          reference: formatReference(sourceRoute, href),
          detail: 'invalid URL',
        });
        continue;
      }

      if (!HTTP_PROTOCOLS.has(targetUrl.protocol) || targetUrl.origin !== normalizedOrigin) {
        externalReferences += 1;
        externalUrls.add(href);
        continue;
      }

      internalReferences += 1;

      const targetPath = decodeUrlComponent(targetUrl.pathname);
      if (!targetPath.startsWith(normalizedBase)) {
        errors.push({
          type: 'base',
          reference: formatReference(sourceRoute, href),
          detail: `internal URL does not use configured base ${normalizedBase}`,
        });
        continue;
      }

      const routePath = `/${targetPath.slice(normalizedBase.length)}`.replace(/\/+/g, '/');
      const targetFile = await resolveRenderedTarget(absoluteDist, routePath);
      if (!targetFile) {
        errors.push({
          type: 'route',
          reference: formatReference(sourceRoute, href),
          detail: `missing rendered target ${routePath}`,
        });
        continue;
      }

      const targetRoute = renderedPathForFile(absoluteDist, targetFile);
      if (!discoveredInternalLinks.has(sourceRoute)) {
        discoveredInternalLinks.set(sourceRoute, new Set());
      }
      discoveredInternalLinks.get(sourceRoute).add(targetRoute);

      if (targetUrl.hash && targetUrl.hash !== '#') {
        fragmentReferences += 1;
        if (!targetFile.endsWith('.html')) {
          errors.push({
            type: 'fragment',
            reference: formatReference(sourceRoute, href),
            detail: 'fragment target is not HTML',
          });
          continue;
        }

        const fragment = decodeUrlComponent(targetUrl.hash.slice(1));
        const ids = await loadIds(targetFile);
        if (!ids.has(fragment)) {
          errors.push({
            type: 'fragment',
            reference: formatReference(sourceRoute, href),
            detail: `missing fragment #${fragment}`,
          });
        }
      }
    }
  }

  async function resolveRequiredRoute(route) {
    if (typeof route !== 'string' || route.includes('?') || route.includes('#')) return null;
    const routePath = `/${decodeUrlComponent(route).replace(/^\/+/, '')}`.replace(/\/+/g, '/');
    const file = await resolveRenderedTarget(absoluteDist, routePath);
    return file ? renderedPathForFile(absoluteDist, file) : null;
  }

  for (const route of requiredRoutes) {
    if (!(await resolveRequiredRoute(route))) {
      errors.push({
        type: 'required-route',
        reference: route,
        detail: 'required rendered route is missing',
      });
    }
  }

  for (const requirement of requiredLinks) {
    const sourceRoute = await resolveRequiredRoute(requirement.sourceRoute);
    const targetRoute = await resolveRequiredRoute(requirement.targetRoute);
    if (!sourceRoute || !targetRoute) {
      errors.push({
        type: 'required-link',
        reference: formatReference(requirement.sourceRoute, requirement.targetRoute),
        detail: 'required link source or target route is missing',
      });
      continue;
    }
    if (!discoveredInternalLinks.get(sourceRoute)?.has(targetRoute)) {
      errors.push({
        type: 'required-link',
        reference: formatReference(sourceRoute, targetRoute),
        detail: 'required rendered link is missing',
      });
    }
  }

  return {
    base: normalizedBase,
    siteOrigin: normalizedOrigin,
    htmlRoutes: htmlFiles.length,
    rootLocaleRoutes,
    russianLocaleRoutes,
    internalReferences,
    fragmentReferences,
    externalReferences,
    externalUrls: [...externalUrls].sort(),
    errors,
  };
}

function readArguments(argv) {
  const values = {
    distDirectory: 'docs/.vitepress/dist',
    base: '/',
    siteOrigin: 'https://docs.invalid',
    requiredRoutes: [],
    requiredLinks: [],
  };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--dist') values.distDirectory = argv[++index];
    else if (argv[index] === '--base') values.base = argv[++index];
    else if (argv[index] === '--origin') values.siteOrigin = argv[++index];
    else if (argv[index] === '--require-route') values.requiredRoutes.push(argv[++index]);
    else if (argv[index] === '--require-link') {
      const value = argv[++index];
      const separator = value.indexOf('=>');
      if (separator < 1 || separator === value.length - 2) {
        throw new Error(`Invalid required link: ${value}`);
      }
      values.requiredLinks.push({
        sourceRoute: value.slice(0, separator),
        targetRoute: value.slice(separator + 2),
      });
    } else throw new Error(`Unknown argument: ${argv[index]}`);
  }
  return values;
}

async function main() {
  const result = await validateRenderedSite(readArguments(process.argv.slice(2)));
  console.log(
    `Rendered HTML routes: ${String(result.htmlRoutes)} (${String(result.rootLocaleRoutes)} root, ${String(result.russianLocaleRoutes)} ru)`
  );
  console.log(`Internal link references: ${String(result.internalReferences)}`);
  console.log(`Fragment references: ${String(result.fragmentReferences)}`);
  console.log(
    `External link references: ${String(result.externalReferences)} (${String(result.externalUrls.length)} unique; reported separately, network not requested)`
  );
  console.log(`Configured base: ${result.base}`);
  console.log(`Canonical site origin: ${result.siteOrigin}`);

  if (result.errors.length > 0) {
    for (const error of result.errors) {
      console.error(`[${error.type}] ${error.reference}: ${error.detail}`);
    }
    console.error(
      `Rendered documentation validation failed with ${String(result.errors.length)} internal error(s)`
    );
    process.exitCode = 1;
    return;
  }

  console.log('Rendered documentation validation passed');
}

const entryFile = process.argv[1] ? resolve(process.argv[1]) : '';
if (entryFile && import.meta.url === pathToFileURL(entryFile).href) {
  await main();
}
