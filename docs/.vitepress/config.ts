/**
 * VitePress Configuration
 *
 * Configures the VitePress documentation site for Wildberries TypeScript SDK.
 *
 * Based on Context7 VitePress documentation patterns:
 * @see {@link https://github.com/vuejs/vitepress} - Official VitePress repository
 * @see Context7: /vuejs/vitepress - "i18n internationalization configuration"
 *
 * Configuration uses TypeScript with `defineConfig` for full IntelliSense support.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfigWithTheme, type DefaultTheme } from 'vitepress';
import { normalizeDocumentationFragment } from './fragment-utils';

interface DocumentationThemeConfig extends DefaultTheme.Config {
  localeCounterparts?: string[];
}

const docsDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const documentationBase = process.env.NODE_ENV === 'production'
  ? '/daytona-wildberries-typescript-sdk/'
  : '/';

const collectMarkdownFiles = (directory: string): string[] => readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectMarkdownFiles(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  });

const markdownFiles = collectMarkdownFiles(docsDirectory);
const markdownRelativePath = (path: string): string => relative(docsDirectory, path).split('\\').join('/');
const explicitFragmentIds = new Map(
  markdownFiles.map((path) => [
    markdownRelativePath(path),
    new Set([...readFileSync(path, 'utf8').matchAll(/<a id="([a-z0-9_-]+)"><\/a>/g)].map((match) => match[1])),
  ])
);

const explicitIdsForLink = (sourceRelativePath: string, hrefPath: string): ReadonlySet<string> => {
  let targetPath: string;
  if (!hrefPath) {
    targetPath = sourceRelativePath;
  } else if (hrefPath.startsWith('/')) {
    targetPath = hrefPath.slice(1);
  } else {
    targetPath = markdownRelativePath(resolve(docsDirectory, dirname(sourceRelativePath), hrefPath));
  }

  if (extname(targetPath) === '.html') targetPath = targetPath.replace(/\.html$/, '.md');
  else if (!extname(targetPath)) {
    const filePath = `${targetPath}.md`;
    targetPath = explicitFragmentIds.has(filePath) ? filePath : `${targetPath.replace(/\/$/, '')}/index.md`;
  }

  return explicitFragmentIds.get(targetPath) ?? new Set();
};

const localeCounterparts = collectMarkdownFiles(join(docsDirectory, 'ru'))
  .map((path) => relative(join(docsDirectory, 'ru'), path).split('\\').join('/'))
  .filter((path) => path !== 'README.md' && existsSync(join(docsDirectory, path)))
  .sort();

export default defineConfigWithTheme<DocumentationThemeConfig>({
  // Base URL for GitHub Pages deployment
  // Development: uses '/' for local testing
  // Production: uses '/daytona-wildberries-typescript-sdk/' for GitHub Pages
  base: documentationBase,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${documentationBase}favicon.svg` }]
  ],

  // Output directory for production build (relative to docs/)
  outDir: './.vitepress/dist',

  // Markdown configuration
  // Configure markdown-it to properly handle TypeDoc's escaped angle brackets
  markdown: {
    // Disable Vue template syntax in markdown (fixes TypeDoc generic parsing)
    // TypeDoc outputs \< and \> for TypeScript generics which Vue parses as HTML
    config: (md) => {
      // Keep general inline HTML escaped so TypeScript-like text cannot be parsed as
      // Vue templates. TypeDoc's exact empty member anchors are restored below.
      md.set({ html: false });

      md.core.ruler.after('inline', 'typedoc-member-anchors', (state) => {
        const anchorPattern = /<a id="[a-z0-9_-]+"><\/a>/g;

        for (const token of state.tokens) {
          if (token.type !== 'inline' || !token.children) continue;

          const children = [];
          for (const child of token.children) {
            if (child.type !== 'text' || !anchorPattern.test(child.content)) {
              anchorPattern.lastIndex = 0;
              children.push(child);
              continue;
            }

            anchorPattern.lastIndex = 0;
            let start = 0;
            for (const match of child.content.matchAll(anchorPattern)) {
              if (match.index > start) {
                const textToken = new state.Token('text', '', 0);
                textToken.content = child.content.slice(start, match.index);
                children.push(textToken);
              }

              const anchorToken = new state.Token('html_inline', '', 0);
              anchorToken.content = match[0];
              children.push(anchorToken);
              start = match.index + match[0].length;
            }

            if (start < child.content.length) {
              const textToken = new state.Token('text', '', 0);
              textToken.content = child.content.slice(start);
              children.push(textToken);
            }
          }

          token.children = children;
        }
      });

      const defaultLinkOpen = md.renderer.rules.link_open ??
        ((tokens, index, options, _env, self) => self.renderToken(tokens, index, options));
      md.renderer.rules.link_open = (tokens, index, options, env, self) => {
        const href = tokens[index].attrGet('href');
        if (href?.startsWith('/openapi/')) {
          tokens[index].attrSet('href', `https://dev.wildberries.ru${href}`);
        } else if (href?.startsWith('/examples/') && /\.[cm]?[jt]s(?:#.*)?$/.test(href)) {
          tokens[index].attrSet(
            'href',
            `https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main${href}`
          );
        } else if (href && /^(?:\.\.\/)+examples\/$/.test(href)) {
          tokens[index].attrSet('href', '/examples/');
        } else if (href && /^(?:\.\.\/)+examples\/(.+)$/.test(href)) {
          const examplePath = href.match(/^(?:\.\.\/)+examples\/(.+)$/)?.[1];
          tokens[index].attrSet(
            'href',
            `https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/${examplePath}`
          );
        } else if (href && /(?:^|\/)CHANGELOG(?:\.md)?(?:#.*)?$/.test(href)) {
          const fragment = href.includes('#') ? `#${href.split('#')[1]}` : '';
          tokens[index].attrSet(
            'href',
            `https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/CHANGELOG.md${fragment}`
          );
        } else if (href && /^(?:(?:\.\.\/)+|\/)src\/(.+)$/.test(href)) {
          const sourcePath = href.match(/^(?:(?:\.\.\/)+|\/)src\/(.+)$/)?.[1];
          tokens[index].attrSet(
            'href',
            `https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/src/${sourcePath}`
          );
        } else if (href && /(?:^|\/)(README|CONTRIBUTING|CODE_OF_CONDUCT|SECURITY|LICENSE)\.md$/.test(href)) {
          const file = href.match(/(?:^|\/)(README|CONTRIBUTING|CODE_OF_CONDUCT|SECURITY|LICENSE)\.md$/)?.[1];
          tokens[index].attrSet(
            'href',
            `https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/${file}.md`
          );
        } else if (href && /(?:^|\/)api\/[^#]+#[^#]+$/.test(href)) {
          const [path, fragment] = href.split('#');
          tokens[index].attrSet('href', `${path}#${fragment.toLowerCase()}`);
        }

        const renderedHref = tokens[index].attrGet('href');
        if (renderedHref && !/^(?:https?:|mailto:|tel:|\/\/)/i.test(renderedHref) && renderedHref.includes('#')) {
          const [path, fragment] = renderedHref.split('#');
          let decodedFragment = fragment;
          try {
            decodedFragment = decodeURIComponent(fragment);
          } catch {
            // Keep malformed fragments visible to the rendered-site validator.
          }
          const explicitIds = explicitIdsForLink(env.relativePath, path.split('?')[0]);
          tokens[index].attrSet(
            'href',
            `${path}#${normalizeDocumentationFragment(decodedFragment, explicitIds)}`
          );
        }
        return defaultLinkOpen(tokens, index, options, env, self);
      };
    }
  },

  // VitePress emits external URLs unchanged. The rendered-site validator
  // inventories them without network requests and validates same-origin
  // absolute URLs as internal routes and fragments.

  // Exclude planning/development files from documentation build
  // Only include actual user-facing documentation (guides, getting-started, etc.)
  srcExclude: [
    'EPIC_6_PRD.md',          // Specific Epic file causing build error
    'EPIC_*.md',              // Epic planning documents (root level)
    'prd.md',                 // Product requirements
    'brief.md',               // Project brief
    'architecture.md',        // Architecture planning
    'EPIC_5_DOCUMENTATION.md', // Other Epic files
    'EPIC_4_PLAN.md',
    'epics.md',
    'epics/**',               // Historical implementation planning
    'ru/README.md',           // Repository README translation, not a site route
    'sprint-1-epics.md',
    'stories/**',             // Development stories
    'qa/**'                   // QA reports and testing docs
  ],

  // Multi-language support (i18n)
  // Pattern based on Context7: /vuejs/vitepress - "locales configuration"
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'Wildberries TypeScript SDK',
      description: 'Full-featured SDK providing type-safe access to all Wildberries marketplace API methods',

      themeConfig: {
        // Site title displayed in navigation
        siteTitle: 'Wildberries SDK',

        // Navigation menu
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Getting Started', link: '/getting-started/quickstart' },
          { text: 'Guides', link: '/guides/best-practices' },
          { text: 'API Reference', link: '/api/' },
          { text: 'FAQ', link: '/FAQ' }
        ],

        // Sidebar navigation
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Overview', link: '/getting-started/' },
              { text: 'Quickstart Guide', link: '/getting-started/quickstart' },
              {
                text: 'Tutorials',
                collapsed: false,
                items: [
                  { text: 'Product Catalog Sync', link: '/getting-started/tutorials/product-catalog-sync' },
                  { text: 'Order Fulfillment', link: '/getting-started/tutorials/order-fulfillment' },
                  { text: 'Analytics Dashboard', link: '/getting-started/tutorials/analytics-dashboard' },
                  { text: 'Multi-Module Integration', link: '/getting-started/tutorials/multi-module-integration' }
                ]
              }
            ]
          },
          {
            text: 'Guides',
            items: [
              { text: 'Overview', link: '/guides/' },
              { text: '🚨 Migration v4.0.0 — Breaking Removals', link: '/guides/migration-v4' },
              { text: '📣 WB API Changes — October 2026', link: '/guides/wb-api-changes-2026-10' },
              { text: '📣 WB API Changes — September 2026', link: '/guides/wb-api-changes-2026-09' },
              { text: '🔄 Migration v3.0 - Complete Guide', link: '/guides/migration-v3' },
              { text: '⚠️ Migration v2.7 - Analytics v3 Sales Funnel', link: '/guides/migration-v2.7-analytics-v3' },
              { text: '⚠️ Type 8 → Type 9 Campaign Migration', link: '/guides/migration-type8-to-type9' },
              { text: 'Migration v2.2 → v2.3', link: '/guides/migration-v2.3' },
              { text: 'Best Practices', link: '/guides/best-practices' },
              { text: 'Performance Tuning', link: '/guides/performance' },
              { text: 'NodeNext ESM & CommonJS', link: '/guides/nodenext' },
              { text: 'Security Guide', link: '/guides/security' },
              { text: 'Configuration Guide', link: '/guides/configuration' },
              { text: 'Troubleshooting', link: '/guides/troubleshooting' },
              { text: 'Testing Guide', link: '/guides/testing' },
              {
                text: 'SDK Usage',
                collapsed: false,
                items: [
                  { text: 'Realization Report', link: '/guides/realization-report' },
                  { text: 'Reports Module', link: '/guides/reports-module' },
                  { text: 'Regional Sales → Order Feed', link: '/guides/region-sale-to-order-feed' },
                  { text: 'Commissions & Fees', link: '/guides/commissions-fees' },
                  { text: 'Stock Management', link: '/guides/stock-management' },
                  { text: 'Returns Handling', link: '/guides/returns-handling' },
                  { text: 'Storage Fees Integration', link: '/guides/storage-fees-integration' },
                  { text: 'Orders DBS Guide', link: '/guides/orders-dbs-getting-started' },
                  { text: 'DBS Workflows', link: '/guides/orders-dbs-workflows' },
                  { text: 'In-Store Pickup Guide', link: '/guides/in-store-pickup-getting-started' },
                  { text: 'Orders FBW (Supplies) Guide', link: '/guides/orders-fbw-getting-started' },
                  { text: 'DBS Migration Guide', link: '/guides/migration-dbs-legacy-to-bulk' },
                  { text: '📊 Advertising Statistics Guide', link: '/guides/advertising-statistics-guide' },
                  { text: '🎯 Advertising Campaign Best Practices', link: '/guides/best-practices-advertising' },
                  { text: '📈 Sales Funnel Analytics Best Practices', link: '/guides/best-practices-sales-funnel' },
                  { text: '📋 Promotion Module Guide', link: '/guides/promotion-advertising' },
                  { text: '👥 User Management Guide', link: '/guides/user-management' },
                  { text: '📢 Рекламные кампании', link: '/guides/advertising-campaigns' },
                  { text: '🎫 Jam Subscription Detection', link: '/guides/jam-subscription' }
                ]
              },
              {
                text: 'Product Guides',
                collapsed: true,
                items: [
                  { text: 'Working with Product Cards', link: '/guides/working-with-product-cards' },
                  { text: 'Product Card Merging', link: '/guides/product-card-merging' },
                  { text: '⚠️ Mandatory Characteristics (Apr 29)', link: '/guides/mandatory-product-characteristics' }
                ]
              },
              {
                text: 'Communications Guides',
                collapsed: true,
                items: [
                  { text: 'Communications Overview', link: '/guides/communications' },
                  { text: 'Communications Getting Started', link: '/guides/communications-getting-started' },
                  { text: 'Customer Communication', link: '/guides/customer-communication' }
                ]
              },
              {
                text: 'Promotion Guides',
                collapsed: true,
                items: [
                  { text: 'Promotion Getting Started', link: '/guides/promotion-getting-started' },
                  { text: '⚠️ Migration v2.4 - Promotion Deprecation', link: '/guides/migration-v2.4-promotion-deprecation' }
                ]
              },
              {
                text: 'Tariffs & Supplies',
                collapsed: true,
                items: [
                  { text: 'Tariffs Overview', link: '/guides/tariffs-overview' },
                  { text: 'Supplies Planning', link: '/guides/supplies-planning' },
                  { text: 'Supplies Tariffs', link: '/guides/supplies-tariffs' }
                ]
              },
              {
                text: 'Analytics Guides',
                collapsed: true,
                items: [
                  { text: '🆕 Item Rating v1 → v2 Migration', link: '/guides/migration-item-rating-v2' },
                  { text: 'Sales Funnel Analytics', link: '/guides/sales-funnel-analytics' },
                  { text: 'Search Queries Analytics', link: '/guides/search-queries-analytics' },
                  { text: 'Seller Analytics CSV', link: '/guides/seller-analytics-csv' }
                ]
              },
              {
                text: 'Finance Reconciliation',
                collapsed: true,
                items: [
                  { text: '🆕 Returns Module (v3.10.0)', link: '/guides/returns-module' },
                  { text: 'Buyout & Return Reconciliation', link: '/guides/buyout-return-reconciliation' },
                  { text: 'Tracking Promotion Channels with Substitute Articles', link: '/guides/tracking-promotion-channels-with-substitute-articles' },
                  { text: '⚠️ Finance Reports v5 → v1 Migration', link: '/guides/migration-finance-reports-v5-to-v1' }
                ]
              },
              {
                text: 'Performance',
                collapsed: true,
                items: [
                  { text: 'Performance Tuning Guide', link: '/guides/performance-tuning' }
                ]
              }
            ]
          },
          {
            text: 'Modules',
            items: [
              { text: 'General', link: '/modules/general' },
              { text: 'Products', link: '/modules/products' },
              { text: 'Orders FBS', link: '/modules/orders-fbs' },
              { text: 'Orders FBW', link: '/modules/orders-fbw' },
              { text: 'Orders DBS', link: '/modules/orders-dbs' },
              { text: 'In-Store Pickup', link: '/modules/in-store-pickup' },
              { text: 'Promotion', link: '/modules/promotion' },
              { text: 'Communications', link: '/modules/communications' },
              { text: 'Tariffs', link: '/modules/tariffs' },
              { text: 'Analytics', link: '/modules/analytics' },
              { text: 'Reports', link: '/modules/reports' },
              { text: 'Finances', link: '/modules/finances' },
              { text: '🆕 Returns (v3.10.0)', link: '/modules/returns' },
              { text: 'User Management', link: '/modules/user-management' }
            ]
          },
          {
            text: 'API Reference',
            items: [
              { text: 'Overview', link: '/api/' },
              {
                text: 'SDK Core',
                collapsed: false,
                items: [
                  { text: 'WildberriesSDK', link: '/api/classes/WildberriesSDK' }
                ]
              },
              {
                text: 'Modules',
                collapsed: true,
                items: [
                  { text: 'GeneralModule', link: '/api/classes/GeneralModule' },
                  { text: 'ProductsModule', link: '/api/classes/ProductsModule' },
                  { text: 'OrdersFbsModule', link: '/api/classes/OrdersFbsModule' },
                  { text: 'OrdersFbwModule', link: '/api/classes/OrdersFbwModule' },
                  { text: 'OrdersDbsModule', link: '/api/classes/OrdersDbsModule' },
                  { text: 'FinancesModule', link: '/api/classes/FinancesModule' },
                  { text: 'AnalyticsModule', link: '/api/classes/AnalyticsModule' },
                  { text: 'ReportsModule', link: '/api/classes/ReportsModule' },
                  { text: 'CommunicationsModule', link: '/api/classes/CommunicationsModule' },
                  { text: 'PromotionModule', link: '/api/classes/PromotionModule' },
                  { text: 'TariffsModule', link: '/api/classes/TariffsModule' },
                  { text: 'InStorePickupModule', link: '/api/classes/InStorePickupModule' },
                  { text: 'ReturnsModule', link: '/api/classes/ReturnsModule' },
                  { text: 'UserManagementModule', link: '/api/classes/UserManagementModule' }
                ]
              },
              {
                text: 'Types',
                collapsed: true,
                items: [
                  { text: 'Interfaces', link: '/api/modules#interfaces' },
                  { text: 'Type Aliases', link: '/api/modules#type-aliases' }
                ]
              }
            ]
          },
          {
            text: 'Examples',
            items: [
              { text: 'Overview', link: '/examples/' },
              {
                text: 'Basic',
                collapsed: true,
                items: [
                  { text: 'Hello World', link: '/examples/basic/hello-world' },
                  { text: 'Single API Call', link: '/examples/basic/single-call' }
                ]
              },
              {
                text: 'Intermediate',
                collapsed: true,
                items: [
                  { text: 'Error Handling', link: '/examples/intermediate/error-handling' },
                  { text: 'Rate Limiting', link: '/examples/intermediate/rate-limiting' },
                  { text: 'Batch Operations', link: '/examples/intermediate/batch-operations' }
                ]
              },
              {
                text: 'Advanced',
                collapsed: true,
                items: [
                  { text: 'Multi-Module Workflow', link: '/examples/advanced/multi-module' },
                  { text: 'Custom Retry Logic', link: '/examples/advanced/custom-retry' },
                  { text: 'Performance', link: '/examples/advanced/performance' }
                ]
              },
              {
                text: 'Use Cases',
                collapsed: true,
                items: [
                  { text: 'Product Catalog', link: '/examples/use-cases/product-catalog' },
                  { text: 'Pricing Updates', link: '/examples/use-cases/pricing-updates' },
                  { text: 'Stock Management', link: '/examples/use-cases/stock-management' },
                  { text: 'Order Processing', link: '/examples/use-cases/order-processing' },
                  { text: 'Shipping Management', link: '/examples/use-cases/shipping' },
                  { text: 'Returns Handling', link: '/examples/use-cases/returns' },
                  { text: 'Sales Dashboard', link: '/examples/use-cases/sales-dashboard' },
                  { text: 'Inventory Reports', link: '/examples/use-cases/inventory-reports' },
                  { text: 'Financial Reports', link: '/examples/use-cases/financial-reports' }
                ]
              }
            ]
          },
          {
            text: 'Reference',
            items: [
              { text: 'FAQ', link: '/FAQ' },
              { text: 'Glossary', link: '/GLOSSARY' }
            ]
          }
        ]
      }
    },

    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      title: 'Wildberries TypeScript SDK',
      description: 'Полнофункциональный SDK с полной типизацией для всех методов Wildberries API',

      themeConfig: {
        // Site title displayed in navigation
        siteTitle: 'Wildberries SDK',

        // Navigation menu (Russian)
        nav: [
          { text: 'Главная', link: '/ru/' },
          { text: 'Начало работы', link: '/ru/getting-started/quickstart' },
          { text: 'Руководства', link: '/ru/guides/best-practices' },
          { text: 'Справочник API', link: '/api/' },
          { text: 'FAQ', link: '/ru/FAQ' }
        ],

        // Sidebar navigation (Russian)
        sidebar: [
          {
            text: 'Начало работы',
            items: [
              { text: 'Обзор', link: '/ru/getting-started/' },
              { text: 'Быстрый старт', link: '/ru/getting-started/quickstart' },
              {
                text: 'Руководства',
                collapsed: false,
                items: [
                  { text: 'Синхронизация каталога товаров', link: '/ru/getting-started/tutorials/product-catalog-sync' },
                  { text: 'Обработка заказов', link: '/ru/getting-started/tutorials/order-fulfillment' },
                  { text: 'Панель аналитики', link: '/ru/getting-started/tutorials/analytics-dashboard' },
                  { text: 'Мультимодульная интеграция', link: '/ru/getting-started/tutorials/multi-module-integration' }
                ]
              }
            ]
          },
          {
            text: 'Руководства',
            items: [
              { text: 'Обзор', link: '/ru/guides/' },
              { text: '🚨 Миграция v4.0.0 — Критические удаления', link: '/guides/migration-v4' },
              { text: '📣 Изменения WB API — октябрь 2026', link: '/ru/guides/wb-api-changes-2026-10' },
              { text: '📣 Изменения WB API — сентябрь 2026', link: '/ru/guides/wb-api-changes-2026-09' },
              { text: '🔄 Миграция v3.0 - Полное руководство', link: '/ru/guides/migration-v3' },
              { text: '⚠️ Миграция v2.7 - Аналитика v3 (Воронка продаж)', link: '/ru/guides/migration-v2.7-analytics-v3' },
              { text: '⚠️ Миграция Type 8 → Type 9 кампаний', link: '/ru/guides/migration-type8-to-type9' },
              { text: 'Миграция v2.2 → v2.3', link: '/ru/guides/migration-v2.3' },
              { text: 'Лучшие практики', link: '/ru/guides/best-practices' },
              { text: 'Настройка производительности', link: '/ru/guides/performance' },
              { text: 'NodeNext: ESM и CommonJS', link: '/ru/guides/nodenext' },
              { text: 'Руководство по безопасности', link: '/ru/guides/security' },
              { text: 'Руководство по настройке', link: '/ru/guides/configuration' },
              { text: 'Устранение неполадок', link: '/ru/guides/troubleshooting' },
              { text: 'Руководство по тестированию', link: '/ru/guides/testing' },
              {
                text: 'Использование SDK',
                collapsed: false,
                items: [
                  { text: 'Отчёт о реализации', link: '/ru/guides/realization-report' },
                  { text: 'Модуль отчётов', link: '/ru/guides/reports-module' },
                  { text: 'Продажи по регионам → Лента заказов', link: '/ru/guides/region-sale-to-order-feed' },
                  { text: 'Комиссии и тарифы', link: '/ru/guides/commissions-fees' },
                  { text: 'Управление остатками', link: '/ru/guides/stock-management' },
                  { text: 'Возвраты и отмены', link: '/ru/guides/returns-handling' },
                  { text: 'Платное хранение', link: '/ru/guides/storage-fees-integration' },
                  { text: '📊 Рекламная статистика', link: '/ru/guides/advertising-statistics-guide' },
                  { text: '🎯 Лучшие практики рекламных кампаний', link: '/ru/guides/best-practices-advertising' },
                  { text: '📈 Аналитика воронки продаж', link: '/ru/guides/best-practices-sales-funnel' },
                  { text: '📋 Руководство по модулю Promotion', link: '/ru/guides/promotion-advertising' },
                  { text: '👥 Управление пользователями', link: '/ru/guides/user-management' },
                  { text: '📢 Рекламные кампании', link: '/ru/guides/advertising-campaigns' },
                  { text: '🎫 Определение подписки Джем', link: '/ru/guides/jam-subscription' }
                ]
              },
              {
                text: 'Заказы и Логистика',
                collapsed: true,
                items: [
                  { text: 'Начало работы с DBS', link: '/ru/guides/orders-dbs-getting-started' },
                  { text: 'DBS рабочие процессы', link: '/ru/guides/orders-dbs-workflows' },
                  { text: 'Миграция DBS legacy → bulk', link: '/ru/guides/migration-dbs-legacy-to-bulk' },
                  { text: 'Начало работы с FBW', link: '/ru/guides/orders-fbw-getting-started' },
                  { text: 'Самовывоз (In-Store Pickup)', link: '/ru/guides/in-store-pickup-getting-started' }
                ]
              },
              {
                text: 'Руководства по товарам',
                collapsed: true,
                items: [
                  { text: 'Работа с карточками товаров', link: '/ru/guides/working-with-product-cards' },
                  { text: 'Объединение карточек товаров', link: '/ru/guides/product-card-merging' },
                  { text: '⚠️ Обязательные характеристики (29 апр)', link: '/ru/guides/mandatory-product-characteristics' }
                ]
              },
              {
                text: 'Коммуникации',
                collapsed: true,
                items: [
                  { text: 'Обзор коммуникаций', link: '/ru/guides/communications' },
                  { text: 'Начало работы с коммуникациями', link: '/ru/guides/communications-getting-started' },
                  { text: 'Общение с покупателями', link: '/ru/guides/customer-communication' }
                ]
              },
              {
                text: 'Продвижение',
                collapsed: true,
                items: [
                  { text: 'Начало работы с продвижением', link: '/ru/guides/promotion-getting-started' },
                  { text: '⚠️ Миграция v2.4 - Устаревшие методы Promotion', link: '/ru/guides/migration-v2.4-promotion-deprecation' }
                ]
              },
              {
                text: 'Тарифы и поставки',
                collapsed: true,
                items: [
                  { text: 'Обзор тарифов', link: '/ru/guides/tariffs-overview' },
                  { text: 'Планирование поставок', link: '/ru/guides/supplies-planning' },
                  { text: 'Тарифы на поставки', link: '/ru/guides/supplies-tariffs' }
                ]
              },
              {
                text: 'Руководства по аналитике',
                collapsed: true,
                items: [
                  { text: 'Воронка продаж', link: '/ru/guides/sales-funnel-analytics' },
                  { text: 'Поисковые запросы', link: '/ru/guides/search-queries-analytics' },
                  { text: 'CSV-отчёты аналитики', link: '/ru/guides/seller-analytics-csv' }
                ]
              },
              {
                text: 'Финансовая сверка',
                collapsed: true,
                items: [
                  { text: '🆕 Модуль возвратов (v3.10.0)', link: '/ru/guides/returns-module' },
                  { text: 'Сверка выкупов и возвратов', link: '/ru/guides/buyout-return-reconciliation' },
                  { text: 'Отслеживание каналов продвижения', link: '/ru/guides/tracking-promotion-channels-with-substitute-articles' },
                  { text: '⚠️ Миграция финансовых отчётов v5 → v1', link: '/ru/guides/migration-finance-reports-v5-to-v1' }
                ]
              },
              {
                text: 'Производительность',
                collapsed: true,
                items: [
                  { text: 'Руководство по оптимизации', link: '/ru/guides/performance-tuning' }
                ]
              }
            ]
          },
          {
            text: 'Модули (общие страницы, English)',
            items: [
              { text: 'General', link: '/modules/general' },
              { text: 'Products', link: '/modules/products' },
              { text: 'Orders FBS', link: '/modules/orders-fbs' },
              { text: 'Orders FBW', link: '/modules/orders-fbw' },
              { text: 'Orders DBS', link: '/modules/orders-dbs' },
              { text: 'In-Store Pickup', link: '/modules/in-store-pickup' },
              { text: 'Promotion', link: '/modules/promotion' },
              { text: 'Communications', link: '/modules/communications' },
              { text: 'Tariffs', link: '/modules/tariffs' },
              { text: 'Analytics', link: '/modules/analytics' },
              { text: 'Reports', link: '/modules/reports' },
              { text: 'Finances', link: '/modules/finances' },
              { text: '🆕 Returns (v3.10.0)', link: '/modules/returns' },
              { text: 'User Management', link: '/modules/user-management' }
            ]
          },
          {
            text: 'Справочник API (общие страницы, English)',
            items: [
              { text: 'Обзор', link: '/api/' },
              {
                text: 'Ядро SDK',
                collapsed: false,
                items: [
                  { text: 'WildberriesSDK', link: '/api/classes/WildberriesSDK' }
                ]
              },
              {
                text: 'Модули',
                collapsed: true,
                items: [
                  { text: 'GeneralModule', link: '/api/classes/GeneralModule' },
                  { text: 'ProductsModule', link: '/api/classes/ProductsModule' },
                  { text: 'OrdersFbsModule', link: '/api/classes/OrdersFbsModule' },
                  { text: 'OrdersFbwModule', link: '/api/classes/OrdersFbwModule' },
                  { text: 'OrdersDbsModule', link: '/api/classes/OrdersDbsModule' },
                  { text: 'FinancesModule', link: '/api/classes/FinancesModule' },
                  { text: 'AnalyticsModule', link: '/api/classes/AnalyticsModule' },
                  { text: 'ReportsModule', link: '/api/classes/ReportsModule' },
                  { text: 'CommunicationsModule', link: '/api/classes/CommunicationsModule' },
                  { text: 'PromotionModule', link: '/api/classes/PromotionModule' },
                  { text: 'TariffsModule', link: '/api/classes/TariffsModule' },
                  { text: 'InStorePickupModule', link: '/api/classes/InStorePickupModule' },
                  { text: 'ReturnsModule (English)', link: '/api/classes/ReturnsModule' },
                  { text: 'UserManagementModule (English)', link: '/api/classes/UserManagementModule' }
                ]
              },
              {
                text: 'Типы',
                collapsed: true,
                items: [
                  { text: 'Интерфейсы', link: '/api/modules#interfaces' },
                  { text: 'Псевдонимы типов', link: '/api/modules#type-aliases' }
                ]
              }
            ]
          },
          {
            text: 'Примеры',
            items: [
              { text: 'Обзор', link: '/examples/' },
              {
                text: 'Базовые',
                collapsed: true,
                items: [
                  { text: 'Hello World', link: '/examples/basic/hello-world' },
                  { text: 'Простой API вызов', link: '/examples/basic/single-call' }
                ]
              },
              {
                text: 'Продвинутые',
                collapsed: true,
                items: [
                  { text: 'Обработка ошибок', link: '/examples/intermediate/error-handling' },
                  { text: 'Rate Limiting', link: '/examples/intermediate/rate-limiting' },
                  { text: 'Пакетные операции', link: '/examples/intermediate/batch-operations' }
                ]
              }
            ]
          },
          {
            text: 'Справочник',
            items: [
              { text: 'FAQ', link: '/ru/FAQ' },
              { text: 'Глоссарий', link: '/ru/GLOSSARY' },
              { text: 'Глоссарий переводов', link: '/ru/TRANSLATION_GLOSSARY' }
            ]
          }
        ],

        // Russian-specific UI text
        outlineTitle: 'На этой странице',
        darkModeSwitchLabel: 'Оформление',
        sidebarMenuLabel: 'Меню',
        returnToTopLabel: 'Вернуться к началу',
        docFooter: {
          prev: 'Предыдущая страница',
          next: 'Следующая страница'
        }
      }
    }
  },

  // Theme configuration (shared across locales)
  themeConfig: {
    // The documentation has partial Russian coverage. A language switch must
    // therefore use a valid locale home instead of inventing a mirrored route
    // that does not exist in the target locale.
    i18nRouting: false,
    localeCounterparts,

    // Social links in navigation
    // Based on Context7 VitePress socialLinks configuration patterns
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/salacoste/daytona-wildberries-typescript-sdk'
      },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/daytona-wildberries-typescript-sdk'
      }
    ],

    // Footer configuration
    // Based on Context7 VitePress footer configuration patterns
    footer: {
      message: 'Made with ❤️ for the Wildberries developer community',
      copyright: 'Copyright © 2025 Wildberries API TypeScript SDK Contributors | MIT License'
    }
  }
});
