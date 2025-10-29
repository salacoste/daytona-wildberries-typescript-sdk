# Story 6.14: Translation Conventions & Workflow

**Purpose:** Document translation standards and workflow for comprehensive Russian documentation translation.

**Date Created:** 2025-10-29
**Story Reference:** docs/stories/6.14.comprehensive-russian-translation.md

---

## Translation Conventions for This Story

### 1. Frontmatter Metadata (REQUIRED for ALL pages)

All translated pages MUST include frontmatter with Russian metadata:

```yaml
---
title: Русский заголовок страницы
description: Краткое описание страницы на русском языке для SEO
---
```

**Required Fields:**
- `title`: Page title in Russian (for browser tab and navigation)
- `description`: SEO meta description in Russian (1-2 sentences)

**Example from English → Russian:**
```yaml
# English (source)
---
title: Quickstart Guide
description: Get started with Wildberries TypeScript SDK in 5 minutes
---

# Russian (translation)
---
title: Быстрый старт
description: Начните работу с Wildberries TypeScript SDK за 5 минут
---
```

---

### 2. Technical Terms (Reference TRANSLATION_GLOSSARY.md)

**ALWAYS reference `docs/ru/TRANSLATION_GLOSSARY.md` before translating technical terms.**

**Keep in English (DO NOT translate):**
- SDK, API, TypeScript, Node.js, npm, JSON, HTTP, HTTPS
- Code keywords: `const`, `async`, `await`, `Promise`, `interface`, `type`
- Technical acronyms: FBS, FBW, CRUD, REST, URL, GUID

**Translate to Russian:**
- Documentation structure: Guide → Руководство, Tutorial → Учебное руководство
- Action verbs: Create → Создать, Update → Обновить, Delete → Удалить
- Business terms: Marketplace → Маркетплейс, Seller → Продавец, Order → Заказ
- SDK components: Error Handling → Обработка ошибок, Rate Limiting → Лимит запросов

---

### 3. Code Example Translation Rules

**DO:**
- ✅ Translate comments to Russian: `// Initialize SDK` → `// Инициализация SDK`
- ✅ Translate console.log string messages: `console.log('Success')` → `console.log('Успех')`
- ✅ Translate inline documentation comments (JSDoc-style)
- ✅ Preserve code formatting and indentation exactly

**DON'T:**
- ❌ Translate variable names: `const products =` stays as `const products =`
- ❌ Translate function names: `getProducts()` stays as `getProducts()`
- ❌ Translate object keys: `{ apiKey: '...' }` stays as `{ apiKey: '...' }`
- ❌ Translate code keywords: `const`, `async`, `await`, `try`, `catch`, `if`, `else`
- ❌ Change code logic or structure

**Example:**
```typescript
// English version
// Initialize SDK with API key
const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Fetch product categories
const categories = await sdk.products.getParentCategories();
console.log('Categories loaded:', categories);
```

```typescript
// Russian version (CORRECT)
// Инициализация SDK с API ключом
const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Получение категорий товаров
const categories = await sdk.products.getParentCategories();
console.log('Категории загружены:', categories);
```

---

### 4. Internal Links (Update to /ru/ prefix)

**CRITICAL:** All internal links must point to Russian pages.

**Find and Replace Patterns:**
- `./` → `/ru/` (relative links)
- `/en/` → `/ru/` (English locale links)
- `/guides/` → `/ru/guides/` (root-level links)
- `/getting-started/` → `/ru/getting-started/`
- `/api/` → `/api/` (API reference is NOT translated, keep as-is)

**Example:**
```markdown
<!-- English -->
See [Best Practices](./best-practices.md) for more information.
Learn about [Configuration](/guides/configuration.md).

<!-- Russian -->
См. [Лучшие практики](/ru/guides/best-practices.md) для получения дополнительной информации.
Узнайте о [Конфигурации](/ru/guides/configuration.md).
```

---

### 5. External Links (Keep as-is)

**DO NOT translate external links.** English resources are acceptable.

**Examples:**
- GitHub repositories: https://github.com/...
- npm packages: https://www.npmjs.com/...
- Official documentation: https://www.typescriptlang.org/...
- Wildberries API docs: https://dev.wildberries.ru/...

---

### 6. Markdown Formatting (Preserve exactly)

**Preserve ALL markdown formatting:**
- ✅ Heading hierarchy: `#`, `##`, `###`, `####`
- ✅ Lists: `- `, `1. `, `* `
- ✅ Tables: `| Column | Column |`
- ✅ Code blocks: ` ```typescript`
- ✅ Blockquotes: `> `
- ✅ Bold/Italic: `**bold**`, `*italic*`

**Example:**
```markdown
<!-- English -->
## Error Handling

SDK provides comprehensive error handling:

1. **AuthenticationError** - Invalid API key
2. **RateLimitError** - Rate limit exceeded

> **Note:** Always handle errors gracefully in production.

<!-- Russian -->
## Обработка ошибок

SDK предоставляет комплексную обработку ошибок:

1. **AuthenticationError** - Недействительный API ключ
2. **RateLimitError** - Превышен лимит запросов

> **Примечание:** Всегда обрабатывайте ошибки грамотно в production-среде.
```

---

### 7. File Naming (Match English exactly)

**Russian files MUST use same filename as English:**
- ✅ `best-practices.md` → `docs/ru/guides/best-practices.md`
- ✅ `quickstart.md` → `docs/ru/getting-started/quickstart.md`
- ❌ NOT: `luchshie-praktiki.md` (do NOT transliterate filenames)

---

### 8. File Encoding & Line Endings

- **Encoding:** UTF-8 (REQUIRED for Cyrillic characters)
- **Line Endings:** LF (Unix-style, enforced by .editorconfig)
- **Charset:** Verify `<meta charset="UTF-8">` in rendered HTML

---

## Per-File Translation Checklist

Use this checklist for EVERY file translated:

- [ ] **Frontmatter metadata complete** (title, description in Russian)
- [ ] **All headings translated** (preserve hierarchy: h1, h2, h3, h4)
- [ ] **All body text translated** (paragraphs, lists, tables)
- [ ] **Code examples:** code unchanged, comments translated
- [ ] **Internal links updated** to `/ru/` prefix
- [ ] **External links unchanged** (English resources acceptable)
- [ ] **Technical terms verified** against TRANSLATION_GLOSSARY.md
- [ ] **Markdown formatting preserved** (lists, tables, code blocks, blockquotes)
- [ ] **Images display correctly** (no path changes needed)
- [ ] **File saved as UTF-8** encoding (verify Cyrillic displays correctly)
- [ ] **File renders correctly** in VitePress preview (`npm run docs:dev`)

---

## Quality Verification Process

### Phase-Based Verification

**After Phase 1 (5 files):**
- Spot-check 5 documents
- Verify technical terms use glossary translations
- Test all internal links
- Run `npm run docs:dev` and manually review pages

**After Phase 2 (10 files total):**
- Spot-check additional 5 documents
- Verify technical consistency across ALL Phase 1+2 pages
- Test all internal links
- Run `npm run docs:dev` and manually review new pages

**After Phase 3 (14 files total):**
- Comprehensive quality check on ALL translations
- Spot-check review of 10 key pages (see IV2 in story)
- Verify all technical terms against TRANSLATION_GLOSSARY.md
- Test language switching for all pages
- Test all internal cross-references

### Build Verification

**Development Server:**
```bash
npm run docs:dev
# Navigate to http://localhost:5173/ru/
# Click through all newly translated pages
# Verify Russian text displays correctly (Cyrillic)
# Test language switching (EN ↔ RU)
```

**Production Build:**
```bash
npm run docs:build
# Verify build completes without errors
# Check for missing file warnings
# Verify output includes all Russian pages in .vitepress/dist/ru/
```

**SDK Integrity:**
```bash
npm run build    # SDK builds successfully
npm test         # All 1,200+ tests pass
```

---

## New Terms Discovery Process

**During translation, if you discover new technical terms NOT in TRANSLATION_GLOSSARY.md:**

1. **Document the term** in this file temporarily:
   ```markdown
   ### New Terms Found
   - **English Term** → **Русский перевод** (Context: where found)
   ```

2. **Use consistent translation** throughout your work

3. **At end of story,** add all new terms to `docs/ru/TRANSLATION_GLOSSARY.md`

### New Terms Found During Story 6.14

*(To be populated during translation)*

- **Account Balance** → **Баланс счета** (Context: Finances, GLOSSARY.md)
- **Barcode** → **Штрих-код** (Context: Products, GLOSSARY.md)
- **Customer** → **Покупатель** (Context: Orders, GLOSSARY.md)
- *(Add more as discovered)*

---

## Common Translation Challenges & Solutions

### Challenge 1: Cyrillic characters display as ???
**Solution:** Verify file encoding is UTF-8 in editor settings.

### Challenge 2: Code examples break syntax highlighting
**Solution:** Ensure code blocks use ` ```typescript ` and code syntax unchanged.

### Challenge 3: Internal links return 404
**Solution:** Verify all links updated to `/ru/` prefix and target files exist.

### Challenge 4: Technical terms inconsistent across pages
**Solution:** Always reference TRANSLATION_GLOSSARY.md before translating terms.

### Challenge 5: VitePress build fails with "File not found"
**Solution:** Check sidebar configuration references actual files in `docs/ru/`.

---

## Translation Progress Tracking

| Phase | Files | Lines | Status | Completion Date |
|-------|-------|-------|--------|-----------------|
| Phase 1: Critical Documentation | 5 | 4,101 | 🔄 In Progress | - |
| Phase 2: Advanced Content | 5 | 6,815 | ⏳ Pending | - |
| Phase 3: Navigation & Additional | 4 | 1,214 | ⏳ Pending | - |
| **Total** | **14** | **12,130** | **🔄** | **-** |

---

**Last Updated:** 2025-10-29
**Updated By:** James (Dev Agent)
**Status:** Active workflow for Story 6.14
