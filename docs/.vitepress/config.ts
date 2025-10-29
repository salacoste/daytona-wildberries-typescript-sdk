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

  // Ignore dead links during build (will be fixed in Stories 6.2-6.3)
  // Many links point to API reference (Story 6.3) or planning docs we moved
  ignoreDeadLinks: [
    (_url) => true  // Ignore all dead links temporarily
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
              { text: 'Testing Guide', link: '/guides/testing' }
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
                  { text: 'Interfaces', link: '/api/interfaces' },
                  { text: 'Type Aliases', link: '/api/type-aliases' },
                  { text: 'Enumerations', link: '/api/enumerations' }
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
              { text: 'Руководство по тестированию', link: '/ru/guides/testing' }
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
                  { text: 'Интерфейсы', link: '/api/interfaces' },
                  { text: 'Псевдонимы типов', link: '/api/type-aliases' },
                  { text: 'Перечисления', link: '/api/enumerations' }
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
