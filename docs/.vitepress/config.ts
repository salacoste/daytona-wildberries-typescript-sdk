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
              { text: 'Best Practices', link: '/guides/best-practices' },
              { text: 'Performance Tuning', link: '/guides/performance' },
              { text: 'Security Guide', link: '/guides/security' },
              { text: 'Configuration Guide', link: '/guides/configuration' },
              { text: 'Troubleshooting', link: '/guides/troubleshooting' },
              { text: 'Testing Guide', link: '/guides/testing' },
              { text: 'Storage Fees Integration', link: '/guides/storage-fees-integration' }
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
                  { text: 'OrdersFBSModule', link: '/api/classes/OrdersFBSModule' },
                  { text: 'OrdersFBWModule', link: '/api/classes/OrdersFBWModule' },
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
              { text: 'Лучшие практики', link: '/ru/guides/best-practices' },
              { text: 'Настройка производительности', link: '/ru/guides/performance' },
              { text: 'Руководство по безопасности', link: '/ru/guides/security' },
              { text: 'Руководство по настройке', link: '/ru/guides/configuration' },
              { text: 'Устранение неполадок', link: '/ru/guides/troubleshooting' },
              { text: 'Руководство по тестированию', link: '/ru/guides/testing' },
              { text: 'Интеграция платного хранения', link: '/guides/storage-fees-integration' }
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
                  { text: 'OrdersFBSModule', link: '/api/classes/OrdersFBSModule' },
                  { text: 'OrdersFBWModule', link: '/api/classes/OrdersFBWModule' },
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
