# Contributing to Wildberries API TypeScript SDK

First off, thank you for considering contributing to the Wildberries API TypeScript SDK! It's people like you that make this SDK a great tool for the developer community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Updating Project Status](#updating-project-status)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Use the bug report template** and provide:
- Clear, descriptive title
- Exact steps to reproduce the issue
- Expected vs. actual behavior
- SDK version, Node.js version, OS
- Code snippet demonstrating the issue
- Relevant logs or error messages

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- Use a clear, descriptive title
- Provide step-by-step description of the suggested enhancement
- Explain why this enhancement would be useful
- Include code examples if applicable

### 📝 Improving Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or grammatical errors
- Adding missing API documentation
- Improving code examples
- Adding tutorials or guides
- Translating documentation

**Documentation Types:**
- **README.md**: High-level overview and quick start
- **Documentation Hub** (docs/index.md): Central navigation for all documentation
- **Getting Started** (docs/getting-started/): Installation, quickstart, tutorials
- **API Reference** (docs/api/): Auto-generated from JSDoc via TypeDoc
- **Guides** (docs/guides/): Best practices, performance, troubleshooting
- **Examples** (docs/examples/): Working code demonstrating common use cases
- **Code Examples** (examples/): Executable TypeScript examples with README

**Validating Documentation Links:**

Before submitting documentation changes, validate all links:

```bash
npm run validate:links
```

This script checks all markdown files for broken links (both internal and external). Fix any broken links before submitting your PR.

### 📊 Updating Project Status

**IMPORTANT:** When working on epics or stories, you **MUST update** the project status documentation.

**Project Status Summary (`PROJECT_STATUS_SUMMARY.md`)**

This file contains the comprehensive status of all epics, stories, and implementation progress. It is automatically generated but requires manual updates when:

- ✅ **Completing** an epic or story
- 📝 **Creating** a new epic or story
- 🔄 **Changing** the status of an epic (Draft → In Progress → Completed)
- 🧪 **Adding** or **removing** tests
- 📦 **Implementing** new modules or endpoints

**When to Update:**

1. **Before marking a story as DONE** — Update the epic status and completion percentage
2. **After creating a new epic** — Add it to the summary with initial status
3. **When module implementation changes** — Update the module implementation status table
4. **After running test suites** — Update test coverage metrics

**How to Update:**

```bash
# The summary is located at:
docs/PROJECT_STATUS_SUMMARY.md

# Key sections to update:
# - Epic Status Details (for each epic)
# - Module Implementation Status table
# - Test Suite Status section
# - Build & Performance Metrics
# - Next Steps & Priorities
```

**Best Practices:**

- 📖 **Keep percentages accurate** — Update completion % when stories finish
- 🔄 **Update status badges** — Change 📝 Draft → 🔄 In Progress → ✅ Completed
- 📊 **Sync with epic files** — Ensure PROJECT_STATUS_SUMMARY matches epic file statuses
- 📅 **Add timestamp** — Update "Last Updated" date when making changes

**Example Status Update:**

```markdown
## Epic 10: Web API Module

**Status:** 🔄 IN PROGRESS (was 📝 DRAFT)
**Completion:** 25% (was 0%)

**Changes:**
- ✅ Story 10.1: Web API Foundation completed
- 🔄 Story 10.2: Gem Subscription Check in progress
```

> **⚠️ REQUIRED:** All pull requests that change epic/story status MUST include updates to `PROJECT_STATUS_SUMMARY.md`. PRs missing this update will be flagged for review.

### 🛠️ Code Contributions

We love code contributions! Here's how to get started:

1. **Find an issue** to work on or create a new one
2. **Comment** on the issue to let others know you're working on it
3. **Fork** the repository and create a branch
4. **Make your changes** following our coding standards
5. **Write tests** for new functionality
6. **Submit a pull request**

**Good First Issues:**
Look for issues labeled [`good first issue`](https://github.com/salacoste/daytona-wildberries-typescript-sdk/labels/good%20first%20issue) - these are great for newcomers.

---

## Development Setup

### Prerequisites

- **Node.js**: 20.x or 22.x (18.x no longer supported)
- **npm**: 9.x or later
- **Git**: 2.x or later

### Setup Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/daytona-wildberries-typescript-sdk.git
cd daytona-wildberries-typescript-sdk

# 2. Install dependencies
npm install

# 3. Run tests to ensure everything works
npm test

# 4. Build the SDK
npm run build

# 5. Type check
npm run type-check

# 6. Lint
npm run lint
```

### Project Structure

```
wb-api-sdk/
├── src/
│   ├── client/           # Core HTTP client, rate limiter, retry handler
│   ├── modules/          # 14 API modules (products, orders, etc.)
│   ├── types/            # Generated TypeScript types from OpenAPI
│   ├── errors/           # Custom error classes
│   └── utils/            # Shared utilities
├── tests/
│   ├── unit/             # Unit tests per module
│   └── integration/      # Integration tests with MSW
├── examples/             # Working code examples
├── tools/                # Code generation and build tools
└── docs/                 # Documentation
```

---

## Coding Standards

### TypeScript Guidelines

**1. Strict Type Safety**
```typescript
// ✅ GOOD: Explicit types
function processOrder(orderId: number): Promise<Order> {
  return this.client.get<Order>(`/orders/${orderId}`);
}

// ❌ BAD: Implicit any
function processOrder(orderId) {
  return this.client.get(`/orders/${orderId}`);
}
```

**2. Use Interface over Type**
```typescript
// ✅ GOOD: Interface for object shapes
interface Product {
  id: number;
  name: string;
  price: number;
}

// ⚠️ OK: Type for unions/intersections
type Status = 'active' | 'inactive' | 'pending';
```

**3. Async/Await (No Callbacks)**
```typescript
// ✅ GOOD: async/await
async function fetchProduct(id: number): Promise<Product> {
  return await this.client.get<Product>(`/products/${id}`);
}

// ❌ BAD: callbacks
function fetchProduct(id: number, callback: (err, product) => void) {
  // Don't use callbacks in new code
}
```

**4. Error Handling**
```typescript
// ✅ GOOD: Typed errors with context
try {
  const result = await sdk.products.createProduct(data);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error('Rate limited. Retry after:', error.retryAfter);
  } else if (error instanceof ValidationError) {
    console.error('Invalid data:', error.message);
  } else {
    throw error;
  }
}

// ❌ BAD: Generic error handling
try {
  await sdk.products.createProduct(data);
} catch (error) {
  console.error('Error:', error);
}
```

### Code Formatting

**Automated with Prettier:**
```bash
# Format all files
npm run format

# Check formatting without modifying files
npm run format:check
```

**Key Settings:**
- **Indent**: 2 spaces (no tabs)
- **Semicolons**: Required
- **Quotes**: Single quotes for strings
- **Trailing Commas**: ES5 (objects, arrays)
- **Line Width**: 100 characters

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Class** | PascalCase | `ProductsModule`, `RateLimiter` |
| **Interface** | PascalCase | `ProductCard`, `OrderStatus` |
| **Type Alias** | PascalCase | `APIResponse`, `ErrorCode` |
| **Function** | camelCase | `getProducts()`, `createOrder()` |
| **Variable** | camelCase | `productList`, `orderCount` |
| **Constant** | SCREAMING_SNAKE | `MAX_RETRIES`, `DEFAULT_TIMEOUT` |
| **Enum** | PascalCase | `OrderStatus.CONFIRMED` |
| **Private** | camelCase with _ | `_internalMethod()` |

### JSDoc Comments

**All public methods MUST have JSDoc:**

```typescript
/**
 * Create a new product card
 *
 * Uploads product information to Wildberries content API.
 * Rate limit: 1 request per 10 seconds.
 *
 * @param data - Product card data with variants and characteristics
 * @returns Response with created product ID and error status
 * @throws {RateLimitError} When rate limit exceeded
 * @throws {ValidationError} When product data is invalid
 * @throws {AuthenticationError} When API key is invalid
 *
 * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
 *
 * @example
 * ```typescript
 * const product = await sdk.products.createProduct({
 *   subjectID: 105,
 *   variants: [{
 *     vendorCode: 'SKU-001',
 *     title: 'Product Name',
 *     brand: 'Brand Name'
 *   }]
 * });
 * ```
 */
async createProduct(data: CreateProductRequest): Promise<CreateProductResponse> {
  // Implementation
}
```

---

## Testing Requirements

### Test Coverage Thresholds

All contributions **MUST** meet these coverage requirements:

| Module | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| **src/client/** | 90% | 85% | 90% | 90% |
| **src/modules/** | 80% | 75% | 64% | 80% |
| **Global** | 80% | 75% | 65% | 80% |

Run coverage report:
```bash
npm run test:coverage
```

### Test Structure

**1. Unit Tests** (`tests/unit/`)

Test individual functions and methods in isolation:

```typescript
import { describe, it, expect, vi } from 'vitest';
import { ProductsModule } from '../../../src/modules/products';

describe('ProductsModule', () => {
  it('should fetch parent categories', async () => {
    const mockClient = {
      get: vi.fn().mockResolvedValue({ data: [{ id: 1, name: 'Electronics' }] })
    };

    const products = new ProductsModule(mockClient as any);
    const result = await products.getParentCategories();

    expect(mockClient.get).toHaveBeenCalledWith(
      'https://content-api.wildberries.ru/content/v2/object/parent/all'
    );
    expect(result.data).toHaveLength(1);
  });
});
```

**2. Integration Tests** (`tests/integration/`)

Test module interactions with mocked HTTP:

```typescript
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
    return HttpResponse.json({
      data: [{ id: 1, name: 'Electronics' }]
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test products.test.ts

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

---

## Common Pitfalls (Error Handling Patterns)

### Application-level error codes inside HTTP 200 responses

Several WB endpoints return **HTTP 200** with an application-level error code embedded
in the response body. The most prominent example: `code: 409` with `detail: 'MetaValidationFail'`
from `ordersDBS.deliverBulk()` and `ordersFBW.deliverBulk()`.

Because these arrive as HTTP 200, `BaseClient.transformError()` does NOT throw — the body
is returned to the caller intact.

**Right way to handle this in module JSDoc:**

```ts
/**
 * @returns Promise resolving to BulkStatusChangeResponse. When WB returns a 409
 *   MetaValidationFail at the application level, inspect:
 *   - `result.results[].errors[].code === 409`
 *   - `result.results[].errors[].detail === 'MetaValidationFail'`
 *   - `result.results[].errors[].metaDetails[]` (per-order SGTIN/IMEI/UIN status)
 *
 *   Use `checkMetaValidation()` as a pre-flight to detect bad metadata before retry.
 */
```

**Wrong patterns to avoid:**

- ❌ Adding `@throws {ValidationError} (409)` — the method does NOT throw on 409.
- ❌ Referencing `error.response.errors[]` in JSDoc — there is no thrown error to access.
- ❌ Writing tests with `mockClient.post.mockRejectedValue(...)` for the 409 path —
  the 409 arrives as resolved value, not rejection. Use `mockResolvedValue()` and assert
  on `result.results[]` shape.

If you ever change `BaseClient.transformError()` to throw on HTTP 409, update every
`deliverBulk()` JSDoc and the corresponding error-path tests across `orders-dbs` and
`orders-fbw` in lockstep. See `src/client/base-client.ts:transformError()` for the
canonical mapping table.

### Sharded vs unsharded swagger sync

Swagger source files in `wildberries_api_doc/` exist in two forms:
- Single-file: `<NN>-<module>.yaml`
- Sharded: `<NN>-<module>/<tag>.yaml` + `_index.yaml` + `_schemas.yaml`

Both must stay in sync. Use `node wildberries_api_doc/validate_shards.cjs` to verify;
this script enforces parity for modules listed in its `modules` array. When adding
endpoints to a yaml that the script does not currently cover, add the module name
to the script's `modules` array in the same PR.

---

## Pull Request Process

### Before Submitting

**Checklist:**
- [ ] Code follows TypeScript coding standards
- [ ] All tests pass (`npm test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Test coverage meets thresholds
- [ ] JSDoc comments added for public methods
- [ ] Examples updated (if applicable)
- [ ] CHANGELOG.md updated (for notable changes)
- [ ] Self-review completed

### PR Title Format

Use conventional commit format:

```
<type>(<scope>): <description>

Examples:
feat(products): add bulk upload method
fix(orders): correct FBS status transition logic
docs(readme): update installation instructions
test(analytics): add sales funnel integration tests
refactor(client): improve retry logic performance
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `test`: Test additions or updates
- `refactor`: Code refactoring (no functional changes)
- `perf`: Performance improvements
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### PR Description Template

```markdown
## Description
<!-- Describe your changes in detail -->

## Motivation and Context
<!-- Why is this change required? What problem does it solve? -->

## Related Issue
<!-- Link to the issue: Fixes #123 -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## Testing
<!-- Describe the tests you ran and how to reproduce them -->

## Checklist
- [ ] My code follows the code style of this project
- [ ] I have updated the documentation accordingly
- [ ] I have added tests to cover my changes
- [ ] All new and existing tests pass
- [ ] I have checked my code and corrected any misspellings
```

### Review Process

1. **Automated Checks**: CI/CD runs tests, linting, type-check
2. **Maintainer Review**: Core team reviews code and provides feedback
3. **Revisions**: Address feedback and push updates
4. **Approval**: Maintainer approves PR
5. **Merge**: Maintainer merges to main branch

**Response Time SLA:**
- Initial review: Within 3 business days
- Follow-up reviews: Within 2 business days

---

## Issue Reporting Guidelines

### Bug Reports

**Use the bug report template** with:

1. **Environment Information**
```
SDK Version: 4.1.0
Node.js Version: 20.10.0
Operating System: macOS 14.0
```

2. **Steps to Reproduce**
```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'test' });
const result = await sdk.products.getProduct(12345);
// Expected: Product data
// Actual: RateLimitError
```

3. **Error Output**
```
RateLimitError: Rate limit exceeded
  at RateLimiter.waitForSlot (/path/to/rate-limiter.ts:45)
  ...
```

### Feature Requests

**Include:**
- Use case and motivation
- Proposed solution (if any)
- Alternatives considered
- Impact on existing functionality

---

## Community

### Communication Channels

- **GitHub Issues**: Bug reports, feature requests, questions
- **GitHub Discussions**: General questions, ideas, show & tell
- **Pull Requests**: Code contributions and reviews

### Recognition

Contributors are recognized in:
- **CHANGELOG.md**: Notable contributions credited
- **README.md**: Top contributors listed
- **GitHub Insights**: Contributor graphs and stats

### License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

If you have questions about contributing, please:

1. Check existing [Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
2. Review [Documentation](https://github.com/salacoste/daytona-wildberries-typescript-sdk#readme)
3. Create a new [Issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues/new) with your question

Thank you for contributing! 🎉
