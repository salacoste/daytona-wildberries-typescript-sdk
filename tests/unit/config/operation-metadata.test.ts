/**
 * Tests for Operation Metadata Registry
 *
 * @module tests/unit/config/operation-metadata
 */

import { describe, it, expect } from 'vitest';
import {
  operationMetadata,
  isOperationReadonly,
  getOperationCategory,
  getOperationRateLimitKey,
  getOperationMetadata,
  getOperationsByCategory,
  getReadonlyOperations,
  getWriteOperations,
  type OperationMetadata,
} from '../../../src/config/operation-metadata';

// ============================================================================
// Registry Structure Tests
// ============================================================================

describe('operationMetadata registry', () => {
  it('should have entries for all modules', () => {
    const keys = Object.keys(operationMetadata);

    // General module
    expect(keys.some((k) => k.startsWith('general.'))).toBe(true);

    // Products module
    expect(keys.some((k) => k.startsWith('products.'))).toBe(true);

    // User Management module
    expect(keys.some((k) => k.startsWith('userManagement.'))).toBe(true);
  });

  it('should have non-empty registry', () => {
    const keys = Object.keys(operationMetadata);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('each entry should have valid readonly boolean', () => {
    Object.entries(operationMetadata).forEach(([_key, meta]) => {
      expect(typeof meta.readonly).toBe('boolean');
      // Ensure it's not undefined or null
      expect(meta.readonly).not.toBeUndefined();
    });
  });

  it('each entry should have non-empty category', () => {
    Object.entries(operationMetadata).forEach(([_key, meta]) => {
      expect(meta.category).toBeTruthy();
      expect(typeof meta.category).toBe('string');
      expect(meta.category.length).toBeGreaterThan(0);
    });
  });

  it('each entry should have non-empty rateLimitKey', () => {
    Object.entries(operationMetadata).forEach(([_key, meta]) => {
      expect(meta.rateLimitKey).toBeTruthy();
      expect(typeof meta.rateLimitKey).toBe('string');
      expect(meta.rateLimitKey.length).toBeGreaterThan(0);
    });
  });

  it('operation keys should follow module.operation pattern', () => {
    Object.keys(operationMetadata).forEach((key) => {
      // Keys follow pattern: camelCase.camelCase (may include digits like B2B)
      expect(key).toMatch(/^[a-zA-Z]+\.[a-zA-Z0-9]+$/);
    });
  });

  it('should have valid category values (non-empty strings)', () => {
    // Categories are dynamic and grow as SDK expands
    // Core validation: each category is a non-empty lowercase string
    Object.entries(operationMetadata).forEach(([_key, meta]) => {
      expect(meta.category).toBeTruthy();
      expect(typeof meta.category).toBe('string');
      // Categories are typically lowercase
      expect(meta.category).toMatch(/^[a-z]+$/);
    });
  });

  it('should include core API categories', () => {
    // These core categories should always exist
    const allCategories = new Set(Object.values(operationMetadata).map((m) => m.category));
    expect(allCategories.has('all')).toBe(true);
    expect(allCategories.has('content')).toBe(true);
    expect(allCategories.has('marketplace')).toBe(true);
  });
});

// ============================================================================
// Specific Module Coverage Tests
// ============================================================================

describe('operationMetadata - General module entries', () => {
  it('should have general.ping entry', () => {
    const meta = operationMetadata['general.ping'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(true);
    expect(meta.category).toBe('all');
    expect(meta.rateLimitKey).toBe('general.ping');
  });

  it('should have general.news entry', () => {
    const meta = operationMetadata['general.news'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(true);
    expect(meta.category).toBe('commonapi');
    expect(meta.rateLimitKey).toBe('general.communicationsNews');
  });

  it('should have general.sellerInfo entry', () => {
    const meta = operationMetadata['general.sellerInfo'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(true);
    expect(meta.category).toBe('commonapi');
    expect(meta.rateLimitKey).toBe('general.sellerInfo');
  });
});

describe('operationMetadata - Products module entries', () => {
  it('should have products.getParentAll entry', () => {
    const meta = operationMetadata['products.getParentAll'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(true);
    expect(meta.category).toBe('content');
    expect(meta.rateLimitKey).toBe('products.contentObjectParentAll');
  });

  it('should have products.createContentTag entry (write operation)', () => {
    const meta = operationMetadata['products.createContentTag'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(false);
    expect(meta.category).toBe('content');
    expect(meta.rateLimitKey).toBe('products.postContentTag');
  });

  it('should have products.createCardsUpload entry (write operation)', () => {
    const meta = operationMetadata['products.createCardsUpload'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(false);
    expect(meta.category).toBe('content');
    expect(meta.rateLimitKey).toBe('products.postContentCardsUpload');
  });

  it('should have marketplace category operations', () => {
    const meta = operationMetadata['products.getStocks'];
    expect(meta).toBeDefined();
    expect(meta.category).toBe('marketplace');
  });

  it('should have discountsandprices category operations', () => {
    const meta = operationMetadata['products.createUploadTask'];
    expect(meta).toBeDefined();
    expect(meta.category).toBe('discountsandprices');
  });
});

describe('operationMetadata - User Management module entries', () => {
  it('should have userManagement.createInvite entry', () => {
    const meta = operationMetadata['userManagement.createInvite'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(false);
    expect(meta.category).toBe('usermanagement');
    expect(meta.rateLimitKey).toBe('userManagement.createInvite');
  });

  it('should have userManagement.getUsers entry', () => {
    const meta = operationMetadata['userManagement.getUsers'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(true);
    expect(meta.category).toBe('usermanagement');
    expect(meta.rateLimitKey).toBe('userManagement.getUsers');
  });

  it('should have userManagement.updateUserAccess entry', () => {
    const meta = operationMetadata['userManagement.updateUserAccess'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(false);
    expect(meta.category).toBe('usermanagement');
  });

  it('should have userManagement.deleteUser entry', () => {
    const meta = operationMetadata['userManagement.deleteUser'];
    expect(meta).toBeDefined();
    expect(meta.readonly).toBe(false);
    expect(meta.category).toBe('usermanagement');
  });
});

describe('operationMetadata - Orders FBS module entries', () => {
  it('should have ordersFBS module entries', () => {
    const keys = Object.keys(operationMetadata).filter((k) => k.startsWith('ordersFBS.'));
    expect(keys.length).toBeGreaterThan(0);
  });

  it('ordersFBS operations should have supplies or marketplace category', () => {
    const fbsOps = Object.entries(operationMetadata).filter(([k]) => k.startsWith('ordersFBS.'));
    fbsOps.forEach(([_key, meta]) => {
      expect(['supplies', 'marketplace']).toContain(meta.category);
    });
  });
});

describe('operationMetadata - Orders FBW module entries', () => {
  it('should have ordersFBW module entries', () => {
    const keys = Object.keys(operationMetadata).filter((k) => k.startsWith('ordersFBW.'));
    expect(keys.length).toBeGreaterThan(0);
  });
});

describe('operationMetadata - Orders DBS module entries', () => {
  it('should have ordersDBS module entries', () => {
    const keys = Object.keys(operationMetadata).filter((k) => k.startsWith('ordersDBS.'));
    expect(keys.length).toBeGreaterThan(0);
  });

  it('should include B2B operations', () => {
    const meta = operationMetadata['ordersDBS.getB2BInfo'];
    expect(meta).toBeDefined();
  });
});

// ============================================================================
// Helper Function Tests - isOperationReadonly
// ============================================================================

describe('isOperationReadonly', () => {
  it('returns true for readonly operations', () => {
    expect(isOperationReadonly('general.ping')).toBe(true);
    expect(isOperationReadonly('general.news')).toBe(true);
    expect(isOperationReadonly('general.sellerInfo')).toBe(true);
    expect(isOperationReadonly('products.getParentAll')).toBe(true);
    expect(isOperationReadonly('products.getObjectAll')).toBe(true);
    expect(isOperationReadonly('products.getDirectoryColors')).toBe(true);
    expect(isOperationReadonly('userManagement.getUsers')).toBe(true);
  });

  it('returns false for write operations', () => {
    expect(isOperationReadonly('products.createContentTag')).toBe(false);
    expect(isOperationReadonly('products.updateContentTag')).toBe(false);
    expect(isOperationReadonly('products.deleteContentTag')).toBe(false);
    expect(isOperationReadonly('products.createCardsUpload')).toBe(false);
    expect(isOperationReadonly('products.updateStock')).toBe(false);
    expect(isOperationReadonly('userManagement.createInvite')).toBe(false);
    expect(isOperationReadonly('userManagement.deleteUser')).toBe(false);
  });

  it('returns false for unknown operations', () => {
    expect(isOperationReadonly('unknown.operation')).toBe(false);
    expect(isOperationReadonly('nonexistent.method')).toBe(false);
    expect(isOperationReadonly('')).toBe(false);
    expect(isOperationReadonly('invalid')).toBe(false);
  });

  it('is case-sensitive', () => {
    expect(isOperationReadonly('general.Ping')).toBe(false);
    expect(isOperationReadonly('General.ping')).toBe(false);
    expect(isOperationReadonly('GENERAL.PING')).toBe(false);
  });
});

// ============================================================================
// Helper Function Tests - getOperationCategory
// ============================================================================

describe('getOperationCategory', () => {
  it('returns category for known operations', () => {
    expect(getOperationCategory('general.ping')).toBe('all');
    expect(getOperationCategory('general.news')).toBe('commonapi');
    expect(getOperationCategory('products.getParentAll')).toBe('content');
    expect(getOperationCategory('products.createUploadTask')).toBe('discountsandprices');
    expect(getOperationCategory('products.getStocks')).toBe('marketplace');
    expect(getOperationCategory('userManagement.getUsers')).toBe('usermanagement');
  });

  it('returns undefined for unknown operations', () => {
    expect(getOperationCategory('unknown.operation')).toBeUndefined();
    expect(getOperationCategory('nonexistent.method')).toBeUndefined();
    expect(getOperationCategory('')).toBeUndefined();
  });

  it('is case-sensitive', () => {
    expect(getOperationCategory('general.Ping')).toBeUndefined();
    expect(getOperationCategory('Products.getParentAll')).toBeUndefined();
  });
});

// ============================================================================
// Helper Function Tests - getOperationRateLimitKey
// ============================================================================

describe('getOperationRateLimitKey', () => {
  it('returns rate limit key for known operations', () => {
    expect(getOperationRateLimitKey('general.ping')).toBe('general.ping');
    expect(getOperationRateLimitKey('general.news')).toBe('general.communicationsNews');
    expect(getOperationRateLimitKey('products.getParentAll')).toBe(
      'products.contentObjectParentAll'
    );
    expect(getOperationRateLimitKey('products.createContentTag')).toBe('products.postContentTag');
    expect(getOperationRateLimitKey('userManagement.createInvite')).toBe(
      'userManagement.createInvite'
    );
  });

  it('returns undefined for unknown operations', () => {
    expect(getOperationRateLimitKey('unknown.operation')).toBeUndefined();
    expect(getOperationRateLimitKey('nonexistent.method')).toBeUndefined();
    expect(getOperationRateLimitKey('')).toBeUndefined();
  });

  it('is case-sensitive', () => {
    expect(getOperationRateLimitKey('general.Ping')).toBeUndefined();
  });
});

// ============================================================================
// Helper Function Tests - getOperationMetadata
// ============================================================================

describe('getOperationMetadata', () => {
  it('returns full metadata for known operations', () => {
    const meta = getOperationMetadata('products.getParentAll');
    expect(meta).toBeDefined();
    expect(meta).toEqual({
      readonly: true,
      category: 'content',
      rateLimitKey: 'products.contentObjectParentAll',
    });
  });

  it('returns full metadata for write operations', () => {
    const meta = getOperationMetadata('products.createCardsUpload');
    expect(meta).toBeDefined();
    expect(meta).toEqual({
      readonly: false,
      category: 'content',
      rateLimitKey: 'products.postContentCardsUpload',
    });
  });

  it('returns undefined for unknown operations', () => {
    expect(getOperationMetadata('unknown.operation')).toBeUndefined();
    expect(getOperationMetadata('')).toBeUndefined();
  });

  it('returned object has all required properties', () => {
    const meta = getOperationMetadata('general.ping');
    expect(meta).toBeDefined();
    expect(meta).toHaveProperty('readonly');
    expect(meta).toHaveProperty('category');
    expect(meta).toHaveProperty('rateLimitKey');
  });
});

// ============================================================================
// Category Grouping Tests - getOperationsByCategory
// ============================================================================

describe('getOperationsByCategory', () => {
  it('returns operations for content category', () => {
    const ops = getOperationsByCategory('content');
    expect(ops.length).toBeGreaterThan(0);
    ops.forEach((op) => {
      expect(getOperationCategory(op)).toBe('content');
    });
  });

  it('returns operations for marketplace category', () => {
    const ops = getOperationsByCategory('marketplace');
    expect(ops.length).toBeGreaterThan(0);
    ops.forEach((op) => {
      expect(getOperationCategory(op)).toBe('marketplace');
    });
  });

  it('returns operations for discountsandprices category', () => {
    const ops = getOperationsByCategory('discountsandprices');
    expect(ops.length).toBeGreaterThan(0);
    ops.forEach((op) => {
      expect(getOperationCategory(op)).toBe('discountsandprices');
    });
  });

  it('returns operations for commonapi category', () => {
    const ops = getOperationsByCategory('commonapi');
    expect(ops.length).toBeGreaterThan(0);
    ops.forEach((op) => {
      expect(getOperationCategory(op)).toBe('commonapi');
    });
  });

  it('returns operations for usermanagement category', () => {
    const ops = getOperationsByCategory('usermanagement');
    expect(ops.length).toBeGreaterThan(0);
    ops.forEach((op) => {
      expect(getOperationCategory(op)).toBe('usermanagement');
    });
  });

  it('returns operations for all category', () => {
    const ops = getOperationsByCategory('all');
    expect(ops.length).toBeGreaterThan(0);
    ops.forEach((op) => {
      expect(getOperationCategory(op)).toBe('all');
    });
    // general.ping should be in 'all' category
    expect(ops).toContain('general.ping');
  });

  it('returns operations for supplies category', () => {
    const ops = getOperationsByCategory('supplies');
    expect(ops.length).toBeGreaterThan(0);
    ops.forEach((op) => {
      expect(getOperationCategory(op)).toBe('supplies');
    });
  });

  it('returns empty array for unknown category', () => {
    const ops = getOperationsByCategory('nonexistent');
    expect(ops).toEqual([]);
  });

  it('returns empty array for empty string category', () => {
    const ops = getOperationsByCategory('');
    expect(ops).toEqual([]);
  });
});

// ============================================================================
// Readonly/Write Operations Tests
// ============================================================================

describe('getReadonlyOperations and getWriteOperations', () => {
  it('readonly and write operations should not overlap', () => {
    const readonly = getReadonlyOperations();
    const write = getWriteOperations();
    const overlap = readonly.filter((r) => write.includes(r));
    expect(overlap).toHaveLength(0);
  });

  it('all operations should be either readonly or write', () => {
    const allKeys = Object.keys(operationMetadata);
    const classified = [...getReadonlyOperations(), ...getWriteOperations()];
    expect(classified.sort()).toEqual(allKeys.sort());
  });

  it('getReadonlyOperations returns non-empty array', () => {
    const readonly = getReadonlyOperations();
    expect(readonly.length).toBeGreaterThan(0);
  });

  it('getWriteOperations returns non-empty array', () => {
    const write = getWriteOperations();
    expect(write.length).toBeGreaterThan(0);
  });

  it('all readonly operations have readonly=true in metadata', () => {
    const readonly = getReadonlyOperations();
    readonly.forEach((op) => {
      const meta = getOperationMetadata(op);
      expect(meta?.readonly).toBe(true);
    });
  });

  it('all write operations have readonly=false in metadata', () => {
    const write = getWriteOperations();
    write.forEach((op) => {
      const meta = getOperationMetadata(op);
      expect(meta?.readonly).toBe(false);
    });
  });

  it('isOperationReadonly agrees with getReadonlyOperations', () => {
    const readonly = getReadonlyOperations();
    readonly.forEach((op) => {
      expect(isOperationReadonly(op)).toBe(true);
    });
  });

  it('isOperationReadonly returns false for all write operations', () => {
    const write = getWriteOperations();
    write.forEach((op) => {
      expect(isOperationReadonly(op)).toBe(false);
    });
  });
});

// ============================================================================
// Consistency and Integrity Tests
// ============================================================================

describe('operationMetadata consistency', () => {
  it('should have unique operation keys', () => {
    const keys = Object.keys(operationMetadata);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });

  it('rateLimitKey should match expected pattern', () => {
    Object.entries(operationMetadata).forEach(([_key, meta]) => {
      // Rate limit key should contain a dot separator
      // Pattern allows: module-name.operationName (dashes in module, camelCase in operation)
      expect(meta.rateLimitKey).toMatch(/^[a-zA-Z-]+\.[a-zA-Z0-9]+$/);
    });
  });

  it('module prefix in key and rateLimitKey should be related', () => {
    // Note: module prefixes may differ in format (camelCase vs kebab-case)
    // e.g., 'ordersFBS' vs 'orders-fbs'
    Object.entries(operationMetadata).forEach(([key, meta]) => {
      const keyModule = key.split('.')[0].toLowerCase();
      const rateLimitModule = meta.rateLimitKey.split('.')[0].toLowerCase().replace(/-/g, '');
      // After normalization, they should be similar
      expect(rateLimitModule).toBe(keyModule);
    });
  });

  it('should have reasonable number of operations per category', () => {
    // Dynamically get all categories
    const allCategories = new Set(Object.values(operationMetadata).map((m) => m.category));

    allCategories.forEach((category) => {
      const ops = getOperationsByCategory(category);
      // Each category should have at least one operation
      expect(ops.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('total operations should match sum of operations by category', () => {
    const allKeys = Object.keys(operationMetadata);

    // Dynamically get all categories
    const allCategories = new Set(Object.values(operationMetadata).map((m) => m.category));

    let sumByCategory = 0;
    allCategories.forEach((category) => {
      sumByCategory += getOperationsByCategory(category).length;
    });

    expect(sumByCategory).toBe(allKeys.length);
  });
});

// ============================================================================
// Edge Cases and Error Handling Tests
// ============================================================================

describe('edge cases and error handling', () => {
  it('handles null-like inputs gracefully for isOperationReadonly', () => {
    // TypeScript would normally catch these, but testing runtime behavior
    expect(isOperationReadonly('')).toBe(false);
  });

  it('handles null-like inputs gracefully for getOperationCategory', () => {
    expect(getOperationCategory('')).toBeUndefined();
  });

  it('handles null-like inputs gracefully for getOperationRateLimitKey', () => {
    expect(getOperationRateLimitKey('')).toBeUndefined();
  });

  it('handles null-like inputs gracefully for getOperationMetadata', () => {
    expect(getOperationMetadata('')).toBeUndefined();
  });

  it('handles special characters in operation key lookup', () => {
    expect(isOperationReadonly('general.ping!')).toBe(false);
    expect(getOperationCategory('products.test@123')).toBeUndefined();
  });

  it('handles whitespace in operation key lookup', () => {
    expect(isOperationReadonly(' general.ping')).toBe(false);
    expect(isOperationReadonly('general.ping ')).toBe(false);
    expect(getOperationCategory(' general.ping ')).toBeUndefined();
  });
});

// ============================================================================
// Type Safety Tests
// ============================================================================

describe('type safety', () => {
  it('OperationMetadata interface has correct shape', () => {
    const meta: OperationMetadata = {
      readonly: true,
      category: 'test',
      rateLimitKey: 'test.key',
    };

    expect(meta.readonly).toBeDefined();
    expect(meta.category).toBeDefined();
    expect(meta.rateLimitKey).toBeDefined();
  });

  it('operationMetadata values conform to OperationMetadata interface', () => {
    Object.values(operationMetadata).forEach((meta) => {
      // Check that each value has all required properties
      const typedMeta: OperationMetadata = meta;
      expect(typeof typedMeta.readonly).toBe('boolean');
      expect(typeof typedMeta.category).toBe('string');
      expect(typeof typedMeta.rateLimitKey).toBe('string');
    });
  });
});
