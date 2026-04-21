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

import { defineConfig } from 'vitepress';

export default defineConfig({
  // Base URL for GitHub Pages deployment
  // Development: uses '/' for local testing
  // Production: uses '/daytona-wildberries-typescript-sdk/' for GitHub Pages
  base: process.env.NODE_ENV === 'production'
    ? '/daytona-wildberries-typescript-sdk/'
    : '/',

  // Output directory for production build (relative to docs/)
  outDir: './.vitepress/dist',

  // Markdown configuration
  // Configure markdown-it to properly handle TypeDoc's escaped angle brackets
  markdown: {
    // Disable Vue template syntax in markdown (fixes TypeDoc generic parsing)
    // TypeDoc outputs \< and \> for TypeScript generics which Vue parses as HTML
    config: (md) => {
      // Disable HTML tags in markdown to prevent Vue from parsing escaped brackets as HTML
      md.set({ html: false });
    }
  },

  // Dead links to ignore (external links or intentionally missing)
  // TODO: Phase 6 documentation update - fix remaining dead links:
  // 1. Create missing use-case examples (pricing-updates, stock-management, shipping, returns, etc.)
  // 2. Create tutorials/index.md files
  // 3. Sync Russian localization with English version
  ignoreDeadLinks: [
    // External links
    /^https?:\/\//,
    // API reference links (TypeDoc generated, may have different structure)
    /\/api\//,
    // Relative links to non-existent pages (will be created in future)
    /^\.\//,
    // Russian version links (need localization sync)
    /\/ru\//,
    // Internal docs (excluded from build via srcExclude, referenced from module pages)
    /\/epics\//,
    /\/stories\//,
    // Root-level docs referenced from nested folders
    /README$/,
    /CONTRIBUTING$/,
    /CODE_OF_CONDUCT$/,
    /SECURITY$/,
    /CHANGELOG$/,
    /LICENSE$/,
    /architecture$/,
    /faq$/i,
    // Tutorial indexes (to be created)
    /tutorials\/index/,
    // Wildberries API doc links from TypeDoc
    /work-with-products/,
    /orders-fbw/,
    /promotion/,
    /openapi/
  ],

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
              { text: '🔄 Migration v3.0 - Complete Guide', link: '/guides/migration-v3' },
              { text: '⚠️ Migration v2.7 - Analytics v3 Sales Funnel', link: '/guides/migration-v2.7-analytics-v3' },
              { text: '⚠️ Type 8 → Type 9 Campaign Migration', link: '/guides/migration-type8-to-type9' },
              { text: 'Migration v2.2 → v2.3', link: '/guides/migration-v2.3' },
              { text: 'Best Practices', link: '/guides/best-practices' },
              { text: 'Performance Tuning', link: '/guides/performance' },
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
                  { text: 'Sales Funnel Analytics', link: '/guides/sales-funnel-analytics' },
                  { text: 'Search Queries Analytics', link: '/guides/search-queries-analytics' },
                  { text: 'Seller Analytics CSV', link: '/guides/seller-analytics-csv' }
                ]
              },
              {
                text: 'Finance Reconciliation',
                collapsed: true,
                items: [
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
              { text: 'Finances', link: '/modules/finances' }
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
                  { text: 'InStorePickupModule', link: '/api/classes/InStorePickupModule' }
                ]
              },
              {
                text: 'Types',
                collapsed: true,
                items: [
                  { text: 'Interfaces', link: '/api/modules#interfaces' },
                  { text: 'Type Aliases', link: '/api/modules#type-aliases' },
                  { text: 'Enumerations', link: '/api/modules#enumerations' }
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
              { text: '🔄 Миграция v3.0 - Полное руководство', link: '/ru/guides/migration-v3' },
              { text: '⚠️ Миграция v2.7 - Аналитика v3 (Воронка продаж)', link: '/ru/guides/migration-v2.7-analytics-v3' },
              { text: '⚠️ Миграция Type 8 → Type 9 кампаний', link: '/ru/guides/migration-type8-to-type9' },
              { text: 'Миграция v2.2 → v2.3', link: '/ru/guides/migration-v2.3' },
              { text: 'Лучшие практики', link: '/ru/guides/best-practices' },
              { text: 'Настройка производительности', link: '/ru/guides/performance' },
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
            text: 'Модули',
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
              { text: 'Finances', link: '/modules/finances' }
            ]
          },
          {
            text: 'Справочник API',
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
                  { text: 'InStorePickupModule', link: '/api/classes/InStorePickupModule' }
                ]
              },
              {
                text: 'Типы',
                collapsed: true,
                items: [
                  { text: 'Интерфейсы', link: '/api/modules#interfaces' },
                  { text: 'Псевдонимы типов', link: '/api/modules#type-aliases' },
                  { text: 'Перечисления', link: '/api/modules#enumerations' }
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
