# SDK Scripts Documentation

This directory contains utility scripts for maintaining code quality, documentation accuracy, and development workflows.

## 📋 Available Scripts

### Documentation Validation

#### `validate-doc-examples.ts`

**Purpose**: Validates code examples across all documentation files against actual SDK implementation.

**What it checks:**
- ✅ Module names are valid (e.g., `sdk.products`, `sdk.ordersFBS`)
- ✅ Method names exist in the actual SDK
- ✅ TypeScript code blocks are syntactically correct
- ✅ Examples match current SDK API (prevents documentation drift)
- ✅ Response structure usage is correct (accessing `.data` property)
- ✅ SDK method calls are properly awaited
- ✅ Promise handling patterns are correct (.then(), Promise.all(), etc.)

**Validated Files**:
- Troubleshooting guide
- Best practices guide
- Quickstart guide
- All tutorial files (product-catalog-sync, order-fulfillment, analytics-dashboard, multi-module-integration)

**Usage:**
```bash
# Run validation
npm run validate:examples

# Or directly
tsx scripts/validate-doc-examples.ts
```

**Output:**
```
═══════════════════════════════════════════════════════
  Documentation Examples Validator
═══════════════════════════════════════════════════════

Validating: docs/guides/troubleshooting.md
Total code examples: 48
✓ All examples are valid!

Validating: docs/guides/best-practices.md
Total code examples: 28
✓ All examples are valid!

Validating: docs/getting-started/quickstart.md
Total code examples: 2
✓ All examples are valid!

[... additional files ...]

═══════════════════════════════════════════════════════
  Validation Summary
═══════════════════════════════════════════════════════
Files validated: 7/7
Total code examples: 115
✓ All examples are valid across all documentation!
═══════════════════════════════════════════════════════
✓ Validation passed! All examples are accurate.
```

**Exit codes:**
- `0` - All validations passed
- `1` - Validation errors found

**Integration:**
- ✅ Runs automatically in CI/CD (GitHub Actions)
- ✅ Validates before every commit/PR
- ✅ Prevents merging outdated documentation

**Maintaining the validator:**

When adding new SDK methods:
1. Add method name to `VALID_METHODS` object in `validate-doc-examples.ts`
2. Run `npm run validate:examples` to ensure it passes
3. Commit both the SDK changes and validator updates

When adding intentional wrong examples:
1. Add pattern to `KNOWN_WRONG_EXAMPLES` array
2. Include a comment explaining why it's intentionally wrong
3. Ensure the documentation clearly marks it as ❌ WRONG

**Example validation error:**
```
Error 1:
  Line 1404: Invalid method: "sdk.products.creatProduct()" does not exist
  Code: await sdk.products.creatProduct(data);  // Missing 'e'
  Suggestion: Did you mean: sdk.products.createProduct()?
```

**Example validation warning:**
```
Warning 1:
  Line 946: Response property access should use .data: products.cursor
  Code: expect(products.cursor.total).toBeGreaterThan(0);
  Suggestion: SDK responses have structure { data, error, errorText }. Use: products.data.cursor
```

### Response Type Validation

The validator performs advanced checks on response structure usage:

**All SDK methods return this structure:**
```typescript
Promise<{
  data?: T;              // Actual response data
  error?: boolean;       // Error flag
  errorText?: string;    // Error message
  additionalErrors?: any;// Additional error details
}>
```

**Common Mistakes Caught:**
1. **Missing `.data` access:**
   ```typescript
   // ❌ WRONG
   const products = await sdk.products.listProducts();
   console.log(products.cursor.total);  // Validator warning!

   // ✅ CORRECT
   const products = await sdk.products.listProducts();
   console.log(products.data.cursor.total);
   ```

2. **Missing `await`:**
   ```typescript
   // ❌ WRONG
   const result = sdk.products.createProduct(data);  // Validator warning!

   // ✅ CORRECT
   const result = await sdk.products.createProduct(data);
   ```

3. **Allowed patterns:**
   ```typescript
   // ✅ CORRECT - Promise.all() pattern
   const updates = products.map(p =>
     sdk.products.updatePricing({ id: p.id, price: p.price })
   );
   await Promise.all(updates);  // No warning

   // ✅ CORRECT - .then() pattern
   sdk.products.createProduct(data).then(result => {
     console.log(result.data);
   });  // No warning
   ```

---

#### `validate-links.js`

**Purpose**: Validates markdown links in documentation files.

**What it checks:**
- ✅ Internal links resolve to actual files/sections
- ✅ External links return 200 status
- ✅ No broken anchors or missing references

**Usage:**
```bash
npm run validate:links
```

---

### Performance Benchmarking

#### `benchmark-latency.ts`

**Purpose**: Measures API response latency across different SDK methods.

**Usage:**
```bash
tsx scripts/benchmark-latency.ts
```

**Metrics:**
- P50, P95, P99 latencies
- Average response time
- Min/max latency
- Standard deviation

---

#### `benchmark-throughput.ts`

**Purpose**: Measures SDK throughput (requests per second).

**Usage:**
```bash
tsx scripts/benchmark-throughput.ts
```

**Metrics:**
- Total requests/second
- Concurrent request handling
- Rate limit compliance
- Error rate under load

---

#### `benchmark-memory.ts`

**Purpose**: Tracks memory usage patterns during SDK operations.

**Usage:**
```bash
tsx scripts/benchmark-memory.ts
```

**Metrics:**
- Memory allocation per operation
- Memory leaks detection
- Heap usage patterns
- Garbage collection impact

---

## 🔄 CI/CD Integration

All validation scripts run automatically in GitHub Actions:

```yaml
# .github/workflows/ci.yml
- name: Validate documentation links
  run: npm run validate:links

- name: Validate documentation examples
  run: npm run validate:examples
```

**Workflow:**
1. Code pushed to GitHub
2. CI triggers validation scripts
3. If validation fails → Build fails → Can't merge
4. If validation passes → Proceeds with tests

---

## 🛠️ Development Workflow

### Before Committing

```bash
# Validate everything locally
npm run validate:all

# Individual validations
npm run validate:links
npm run validate:examples
```

### When Adding SDK Methods

1. **Update SDK code** (`src/modules/*/index.ts`)
2. **Update validator** (`scripts/validate-doc-examples.ts`):
   ```typescript
   const VALID_METHODS: Record<string, string[]> = {
     products: [
       'existingMethod1',
       'existingMethod2',
       'newMethodName',  // ← Add here
     ],
   };
   ```
3. **Update documentation** (`docs/guides/troubleshooting.md`)
4. **Run validation**: `npm run validate:examples`
5. **Commit all changes together**

### When SDK API Changes

If SDK method names/signatures change:
1. Update SDK implementation
2. Update `VALID_METHODS` in validator
3. Update all documentation examples
4. Run `npm run validate:examples`
5. Fix any errors reported
6. Update version badge in troubleshooting guide

---

## 📊 Validation Statistics

Current coverage:
- **Documentation files validated**: 7 files
  - `docs/guides/troubleshooting.md` (48 examples)
  - `docs/guides/best-practices.md` (28 examples)
  - `docs/getting-started/quickstart.md` (2 examples)
  - `docs/getting-started/tutorials/product-catalog-sync.md` (9 examples)
  - `docs/getting-started/tutorials/order-fulfillment.md` (13 examples)
  - `docs/getting-started/tutorials/analytics-dashboard.md` (7 examples)
  - `docs/getting-started/tutorials/multi-module-integration.md` (8 examples)
- **Example TypeScript files validated**: 24 files
  - All `.ts` files in `examples/` directory covering all SDK modules
- **Total files validated**: 31 files
- **Total code examples**: 139 validated
- **SDK modules validated**: 14 modules, 76+ methods
- **Known wrong examples**: 30+ (educational anti-patterns + placeholder methods)
- **Response type checks**: Property access validation, await validation, promise pattern detection
- **Validation types**: Method name validation, response structure validation, async pattern validation
- **Multi-line comment handling**: Commented code blocks are automatically skipped during validation

---

## 🐛 Troubleshooting

### "Validation failed" in CI

**Cause**: Documentation examples don't match current SDK API.

**Fix:**
1. Run locally: `npm run validate:examples`
2. Review errors reported
3. Update documentation to match SDK
4. Or update validator if new methods added

### "Method not found" but it exists

**Cause**: Validator's `VALID_METHODS` is outdated.

**Fix:**
1. Add method to `VALID_METHODS` in `scripts/validate-doc-examples.ts`
2. Commit validator update with SDK changes

### "False positive" on intentional wrong example

**Cause**: Educational wrong example not in `KNOWN_WRONG_EXAMPLES`.

**Fix:**
1. Add pattern to `KNOWN_WRONG_EXAMPLES` array
2. Add comment explaining it's intentional
3. Ensure docs mark it as ❌ WRONG

---

## 📝 Script Maintenance

### Adding New Validators

Template for new validation scripts:

```typescript
#!/usr/bin/env tsx
/**
 * [Script Name]
 *
 * Purpose: [What it validates]
 * Usage: npm run validate:[name]
 */

// Your validation logic here

// Exit codes
process.exit(errors.length > 0 ? 1 : 0);
```

### Best Practices

1. **Always use tsx**: Scripts use TypeScript via `tsx`
2. **Clear output**: Use colors and formatting
3. **Exit codes**: 0 = success, 1 = failure
4. **npm scripts**: Add to package.json
5. **CI integration**: Add to GitHub Actions
6. **Documentation**: Update this README

---

## 🔗 Related Documentation

- [Troubleshooting Guide](../docs/guides/troubleshooting.md) - Validated by `validate-doc-examples.ts`
- [GitHub Actions Workflow](../.github/workflows/ci.yml) - CI/CD configuration
- [Contributing Guide](../CONTRIBUTING.md) - Development guidelines
- [Package Scripts](../package.json) - All available npm commands

---

**Last Updated**: 2024-10-27
**Maintained By**: SDK Contributors
