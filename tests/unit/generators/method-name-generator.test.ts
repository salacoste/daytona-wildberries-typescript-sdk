/**
 * Unit Tests for Method Name Generator
 *
 * Tests method name generation from OpenAPI operations including:
 * - operationId-based generation
 * - Path-based generation with HTTP method
 * - camelCase conversion
 * - Singularization logic
 * - Method name uniqueness tracking
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateMethodName,
  generateMethodNameFromPath,
  toCamelCase,
  singularize,
  MethodNameTracker,
} from '../../../tools/generators/method-name-generator.js';
import type { ParsedOperation } from '../../../tools/generators/path-parser.js';

describe('method-name-generator', () => {
  describe('generateMethodName', () => {
    it('should use operationId when present', () => {
      const operation: ParsedOperation = {
        operationId: 'get_seller_info',
        path: '/api/v1/seller/info',
        method: 'get',
        responses: {},
      };

      expect(generateMethodName(operation)).toBe('getSellerInfo');
    });

    it('should convert snake_case operationId to camelCase', () => {
      const operation: ParsedOperation = {
        operationId: 'get_seller_info',
        path: '/api/v1/seller/info',
        method: 'get',
        responses: {},
      };

      expect(generateMethodName(operation)).toBe('getSellerInfo');
    });

    it('should generate from path when operationId missing', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        responses: {},
      };

      expect(generateMethodName(operation)).toBe('ping');
    });
  });

  describe('generateMethodNameFromPath', () => {
    describe('Simple paths', () => {
      it('should handle single-word GET without path params', () => {
        expect(generateMethodNameFromPath('/ping', 'get')).toBe('ping');
        expect(generateMethodNameFromPath('/balance', 'get')).toBe('balance');
        expect(generateMethodNameFromPath('/news', 'get')).toBe('news');
      });

      it('should prefix non-GET single words with HTTP verb', () => {
        expect(generateMethodNameFromPath('/users', 'post')).toBe('createUsers');
        expect(generateMethodNameFromPath('/products', 'delete')).toBe('deleteProducts');
      });
    });

    describe('API version removal', () => {
      it('should remove /api prefix', () => {
        expect(generateMethodNameFromPath('/api/news', 'get')).toBe('news');
        expect(generateMethodNameFromPath('/API/news', 'get')).toBe('news');
      });

      it('should remove version segments (/v1, /v2)', () => {
        expect(generateMethodNameFromPath('/api/v1/news', 'get')).toBe('news');
        expect(generateMethodNameFromPath('/api/v2/products', 'get')).toBe('products');
        expect(generateMethodNameFromPath('/v1/users', 'get')).toBe('users');
      });

      it('should remove /communications prefix', () => {
        expect(generateMethodNameFromPath('/communications/news', 'get')).toBe('news');
        expect(generateMethodNameFromPath('/api/communications/v2/news', 'get')).toBe('news');
      });
    });

    describe('Path parameters', () => {
      it('should remove path parameters and singularize', () => {
        expect(generateMethodNameFromPath('/orders/{id}', 'get')).toBe('getOrder');
        expect(generateMethodNameFromPath('/products/{id}', 'get')).toBe('getProduct');
        expect(generateMethodNameFromPath('/users/{userId}', 'get')).toBe('getUser');
      });

      it('should handle multiple path parameters', () => {
        expect(generateMethodNameFromPath('/users/{id}/posts/{postId}', 'get')).toBe('getUsersPost');
      });
    });

    describe('Multi-segment paths', () => {
      it('should combine last 2 segments for compound names', () => {
        expect(generateMethodNameFromPath('/api/v1/seller/info', 'get')).toBe('getSellerInfo');
        expect(generateMethodNameFromPath('/api/v1/order/status', 'get')).toBe('getOrderStatus');
      });

      it('should handle POST with multi-segment paths', () => {
        expect(generateMethodNameFromPath('/api/v1/seller/info', 'post')).toBe('createSellerInfo');
      });

      it('should handle PUT with multi-segment paths', () => {
        expect(generateMethodNameFromPath('/api/v1/order/status', 'put')).toBe('updateOrderStatus');
      });

      it('should handle PATCH with multi-segment paths', () => {
        expect(generateMethodNameFromPath('/api/v1/product/price', 'patch')).toBe('updateProductPrice');
      });

      it('should handle DELETE with multi-segment paths', () => {
        expect(generateMethodNameFromPath('/api/v1/order/item', 'delete')).toBe('deleteOrderItem');
      });
    });

    describe('HTTP method mapping', () => {
      it('should map GET to get for multi-word resources', () => {
        expect(generateMethodNameFromPath('/api/v1/users', 'get')).toBe('users');
      });

      it('should map POST to create', () => {
        expect(generateMethodNameFromPath('/api/v1/users', 'post')).toBe('createUsers');
      });

      it('should map PUT to update', () => {
        expect(generateMethodNameFromPath('/api/v1/users', 'put')).toBe('updateUsers');
      });

      it('should map PATCH to update', () => {
        expect(generateMethodNameFromPath('/api/v1/users', 'patch')).toBe('updateUsers');
      });

      it('should map DELETE to delete', () => {
        expect(generateMethodNameFromPath('/api/v1/users', 'delete')).toBe('deleteUsers');
      });
    });

    describe('Edge cases', () => {
      it('should handle empty path', () => {
        expect(generateMethodNameFromPath('/', 'get')).toBe('getRequest');
      });

      it('should handle path with only slashes', () => {
        expect(generateMethodNameFromPath('///', 'get')).toBe('getRequest');
      });

      it('should handle path with only API segments', () => {
        expect(generateMethodNameFromPath('/api/v1', 'get')).toBe('getRequest');
      });
    });
  });

  describe('toCamelCase', () => {
    it('should convert snake_case to camelCase', () => {
      expect(toCamelCase('get_seller_info')).toBe('getSellerInfo');
      expect(toCamelCase('create_order_status')).toBe('createOrderStatus');
      expect(toCamelCase('update_product_price')).toBe('updateProductPrice');
    });

    it('should convert all-caps to lowercase when no delimiters', () => {
      expect(toCamelCase('GETSELLERINFO')).toBe('getsellerinfo');
      expect(toCamelCase('CREATEORDERSTATUS')).toBe('createorderstatus');
    });

    it('should convert kebab-case to camelCase', () => {
      expect(toCamelCase('get-seller-info')).toBe('getSellerInfo');
      expect(toCamelCase('create-order-status')).toBe('createOrderStatus');
    });

    it('should convert space-separated to camelCase', () => {
      expect(toCamelCase('get seller info')).toBe('getSellerInfo');
      expect(toCamelCase('create order status')).toBe('createOrderStatus');
    });

    it('should handle strings without delimiters as-is (lowercase)', () => {
      expect(toCamelCase('getSellerInfo')).toBe('getsellerinfo');
      expect(toCamelCase('createOrderStatus')).toBe('createorderstatus');
    });

    it('should handle single word', () => {
      expect(toCamelCase('ping')).toBe('ping');
      expect(toCamelCase('PING')).toBe('ping');
      expect(toCamelCase('Ping')).toBe('ping');
    });

    it('should handle mixed delimiters', () => {
      expect(toCamelCase('get_seller-info data')).toBe('getSellerInfoData');
    });

    it('should handle empty string', () => {
      expect(toCamelCase('')).toBe('');
    });
  });

  describe('singularize', () => {
    describe('Regular plurals', () => {
      it('should singularize words ending in s', () => {
        expect(singularize('orders')).toBe('order');
        expect(singularize('products')).toBe('product');
        expect(singularize('users')).toBe('user');
        expect(singularize('items')).toBe('item');
      });
    });

    describe('Special cases - ies endings', () => {
      it('should convert ies to y', () => {
        expect(singularize('categories')).toBe('category');
        expect(singularize('entries')).toBe('entry');
      });
    });

    describe('Special cases - ses endings', () => {
      it('should remove es from words ending in ses', () => {
        expect(singularize('analyses')).toBe('analys');
        expect(singularize('bases')).toBe('bas');
      });
    });

    describe('Invariant words', () => {
      it('should not change news', () => {
        expect(singularize('news')).toBe('news');
      });

      it('should not change info', () => {
        expect(singularize('info')).toBe('info');
      });

      it('should not change data', () => {
        expect(singularize('data')).toBe('data');
      });

      it('should not change series', () => {
        expect(singularize('series')).toBe('series');
      });

      it('should not change species', () => {
        expect(singularize('species')).toBe('species');
      });
    });

    describe('Words ending in ss', () => {
      it('should not change words ending in ss', () => {
        expect(singularize('class')).toBe('class');
        expect(singularize('address')).toBe('address');
      });
    });

    describe('Already singular', () => {
      it('should not change singular words', () => {
        expect(singularize('order')).toBe('order');
        expect(singularize('product')).toBe('product');
        expect(singularize('user')).toBe('user');
      });
    });
  });

  describe('MethodNameTracker', () => {
    let tracker: MethodNameTracker;

    beforeEach(() => {
      tracker = new MethodNameTracker();
    });

    it('should return the same name on first registration', () => {
      const name = tracker.register('getNews');
      expect(name).toBe('getNews');
    });

    it('should append 2 for first duplicate', () => {
      tracker.register('getNews');
      const duplicate = tracker.register('getNews');
      expect(duplicate).toBe('getNews2');
    });

    it('should increment counter for multiple duplicates', () => {
      expect(tracker.register('getNews')).toBe('getNews');
      expect(tracker.register('getNews')).toBe('getNews2');
      expect(tracker.register('getNews')).toBe('getNews3');
      expect(tracker.register('getNews')).toBe('getNews4');
    });

    it('should track multiple different names', () => {
      expect(tracker.register('getNews')).toBe('getNews');
      expect(tracker.register('getUsers')).toBe('getUsers');
      expect(tracker.register('getNews')).toBe('getNews2');
      expect(tracker.register('getUsers')).toBe('getUsers2');
    });

    it('should reset tracker', () => {
      tracker.register('getNews');
      tracker.register('getNews');
      tracker.reset();
      expect(tracker.register('getNews')).toBe('getNews');
    });

    it('should return all used names', () => {
      tracker.register('getNews');
      tracker.register('getUsers');
      tracker.register('getNews');

      const usedNames = tracker.getUsedNames();
      expect(usedNames).toContain('getNews');
      expect(usedNames).toContain('getUsers');
      expect(usedNames).toContain('getNews2');
      expect(usedNames).toHaveLength(3);
    });

    it('should handle long sequences of duplicates', () => {
      for (let i = 1; i <= 10; i++) {
        const name = tracker.register('test');
        if (i === 1) {
          expect(name).toBe('test');
        } else {
          expect(name).toBe(`test${String(i)}`);
        }
      }
    });
  });
});
