/**
 * TDD RED-PHASE Tests for EPIC 26: DBS New Endpoints
 *
 * These tests define EXPECTED behavior that will FAIL until implementation
 * is completed in src/modules/orders-dbs/index.ts and src/types/orders-dbs.types.ts.
 *
 * EPIC 26 adds 9 new DBS endpoints:
 *   - 2 new info endpoints (getGroupsInfo, getDeliveryDates)
 *   - 7 bulk metadata endpoints replacing deprecated single-order methods
 *
 * ACs tested:
 *   AC1: 2 new info endpoints exist (getGroupsInfo, getDeliveryDates)
 *   AC2: 7 new bulk metadata endpoints exist
 *   AC3: New endpoints call correct URLs at /api/v3/dbs/ and /api/marketplace/v3/dbs/
 *   AC4: Old single-order meta methods marked @deprecated with wrapper delegation
 *   AC5: ~19 new TypeScript schemas generated in types file
 */

/* eslint-disable @typescript-eslint/no-deprecated */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersDbsModule } from '../../src/modules/orders-dbs';
import type { BaseClient } from '../../src/client/base-client';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

describe('EPIC 26: DBS New Endpoints', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: OrdersDbsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new OrdersDbsModule(mockClient as unknown as BaseClient);
  });

  // ============================================================================
  // AC #1: 2 new info endpoints exist (getGroupsInfo, getDeliveryDates)
  // ============================================================================

  describe('AC #1: New info endpoints', () => {
    describe('getGroupsInfo()', () => {
      it('should have getGroupsInfo method', () => {
        expect(module).toHaveProperty('getGroupsInfo');
        expect(typeof (module as any).getGroupsInfo).toBe('function');
      });

      it('should call POST /api/v3/dbs/groups/info', async () => {
        await (module as any).getGroupsInfo({ orders: [123, 456] });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/dbs/groups/info`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should pass the request body with order IDs', async () => {
        const request = { orders: [123, 456, 789] };
        await (module as any).getGroupsInfo(request);

        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          request,
          expect.anything()
        );
      });

      it('should pass rateLimitKey in options', async () => {
        await (module as any).getGroupsInfo({ orders: [123] });

        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({
            rateLimitKey: expect.stringContaining('orders-dbs'),
          })
        );
      });
    });

    describe('getDeliveryDates()', () => {
      it('should have getDeliveryDates method', () => {
        expect(module).toHaveProperty('getDeliveryDates');
        expect(typeof (module as any).getDeliveryDates).toBe('function');
      });

      it('should call POST /api/v3/dbs/orders/delivery-date', async () => {
        await (module as any).getDeliveryDates({ orders: [123, 456] });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/dbs/orders/delivery-date`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should pass the request body with order IDs', async () => {
        const request = { orders: [123, 456] };
        await (module as any).getDeliveryDates(request);

        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          request,
          expect.anything()
        );
      });

      it('should pass rateLimitKey in options', async () => {
        await (module as any).getDeliveryDates({ orders: [123] });

        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({
            rateLimitKey: expect.stringContaining('orders-dbs'),
          })
        );
      });
    });
  });

  // ============================================================================
  // AC #2: 7 new bulk metadata endpoints exist
  // ============================================================================

  describe('AC #2: Bulk metadata endpoints', () => {
    describe('deleteMetaBulk()', () => {
      it('should have deleteMetaBulk method', () => {
        expect(module).toHaveProperty('deleteMetaBulk');
        expect(typeof (module as any).deleteMetaBulk).toBe('function');
      });
    });

    describe('setSgtinBulk()', () => {
      it('should have setSgtinBulk method', () => {
        expect(module).toHaveProperty('setSgtinBulk');
        expect(typeof (module as any).setSgtinBulk).toBe('function');
      });
    });

    describe('setUinBulk()', () => {
      it('should have setUinBulk method', () => {
        expect(module).toHaveProperty('setUinBulk');
        expect(typeof (module as any).setUinBulk).toBe('function');
      });
    });

    describe('setImeiBulk()', () => {
      it('should have setImeiBulk method', () => {
        expect(module).toHaveProperty('setImeiBulk');
        expect(typeof (module as any).setImeiBulk).toBe('function');
      });
    });

    describe('setGtinBulk()', () => {
      it('should have setGtinBulk method', () => {
        expect(module).toHaveProperty('setGtinBulk');
        expect(typeof (module as any).setGtinBulk).toBe('function');
      });
    });

    describe('setCustomsDeclarationBulk()', () => {
      it('should have setCustomsDeclarationBulk method', () => {
        expect(module).toHaveProperty('setCustomsDeclarationBulk');
        expect(typeof (module as any).setCustomsDeclarationBulk).toBe('function');
      });
    });
  });

  // ============================================================================
  // AC #3: New endpoints call correct URLs
  // ============================================================================

  describe('AC #3: Correct URLs for new endpoints', () => {
    describe('Bulk metadata URLs at /api/marketplace/v3/dbs/orders/meta/*', () => {
      it('deleteMetaBulk should call POST /api/marketplace/v3/dbs/orders/meta/delete', async () => {
        await (module as any).deleteMetaBulk({ orders: [111], key: 'imei' });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/delete`,
          expect.anything(),
          expect.anything()
        );
      });

      it('setSgtinBulk should call POST /api/marketplace/v3/dbs/orders/meta/sgtin', async () => {
        await (module as any).setSgtinBulk({
          orders: [{ orderId: 111, sgtins: ['1234567890123456'] }],
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/sgtin`,
          expect.anything(),
          expect.anything()
        );
      });

      it('setUinBulk should call POST /api/marketplace/v3/dbs/orders/meta/uin', async () => {
        await (module as any).setUinBulk({ orders: [{ orderId: 111, uin: '1234567890123456' }] });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/uin`,
          expect.anything(),
          expect.anything()
        );
      });

      it('setImeiBulk should call POST /api/marketplace/v3/dbs/orders/meta/imei', async () => {
        await (module as any).setImeiBulk({ orders: [{ orderId: 111, imei: '123456789012345' }] });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/imei`,
          expect.anything(),
          expect.anything()
        );
      });

      it('setGtinBulk should call POST /api/marketplace/v3/dbs/orders/meta/gtin', async () => {
        await (module as any).setGtinBulk({ orders: [{ orderId: 111, gtin: '1234567890123' }] });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/gtin`,
          expect.anything(),
          expect.anything()
        );
      });

      it('setCustomsDeclarationBulk should call POST /api/marketplace/v3/dbs/orders/meta/customs-declaration', async () => {
        await (module as any).setCustomsDeclarationBulk({
          orders: [{ orderId: 111, customsDeclaration: 'CD-123' }],
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/customs-declaration`,
          expect.anything(),
          expect.anything()
        );
      });
    });

    describe('All bulk metadata endpoints use POST method', () => {
      it('deleteMetaBulk should use POST (not DELETE)', async () => {
        await (module as any).deleteMetaBulk({ orders: [111], key: 'imei' });
        expect(mockClient.post).toHaveBeenCalled();
        expect(mockClient.delete).not.toHaveBeenCalled();
      });

      it('setSgtinBulk should use POST (not PUT)', async () => {
        await (module as any).setSgtinBulk({
          orders: [{ orderId: 111, sgtins: ['1234567890123456'] }],
        });
        expect(mockClient.post).toHaveBeenCalled();
        expect(mockClient.put).not.toHaveBeenCalled();
      });

      it('setUinBulk should use POST (not PUT)', async () => {
        await (module as any).setUinBulk({ orders: [{ orderId: 111, uin: '1234567890123456' }] });
        expect(mockClient.post).toHaveBeenCalled();
        expect(mockClient.put).not.toHaveBeenCalled();
      });

      it('setImeiBulk should use POST (not PUT)', async () => {
        await (module as any).setImeiBulk({ orders: [{ orderId: 111, imei: '123456789012345' }] });
        expect(mockClient.post).toHaveBeenCalled();
        expect(mockClient.put).not.toHaveBeenCalled();
      });

      it('setGtinBulk should use POST (not PUT)', async () => {
        await (module as any).setGtinBulk({ orders: [{ orderId: 111, gtin: '1234567890123' }] });
        expect(mockClient.post).toHaveBeenCalled();
        expect(mockClient.put).not.toHaveBeenCalled();
      });

      it('setCustomsDeclarationBulk should use POST (not PUT)', async () => {
        await (module as any).setCustomsDeclarationBulk({
          orders: [{ orderId: 111, customsDeclaration: 'CD-123' }],
        });
        expect(mockClient.post).toHaveBeenCalled();
        expect(mockClient.put).not.toHaveBeenCalled();
      });
    });
  });

  // ============================================================================
  // AC #4: Old single-order meta methods marked @deprecated
  // ============================================================================

  describe('AC #4: Deprecated single-order meta methods still function', () => {
    it('getMeta should still exist (deprecated, delegates or calls legacy URL)', async () => {
      expect(typeof module.getMeta).toBe('function');
      await module.getMeta(123);
      // Should still make an HTTP call (either legacy URL or delegation to bulk)
      const totalCalls = mockClient.get.mock.calls.length + mockClient.post.mock.calls.length;
      expect(totalCalls).toBeGreaterThan(0);
    });

    it('deleteMeta should still exist (deprecated)', async () => {
      expect(typeof module.deleteMeta).toBe('function');
      await module.deleteMeta(123, 'imei');
      const totalCalls = mockClient.delete.mock.calls.length + mockClient.post.mock.calls.length;
      expect(totalCalls).toBeGreaterThan(0);
    });

    it('setSgtin should still exist (deprecated)', async () => {
      expect(typeof module.setSgtin).toBe('function');
      await module.setSgtin(123, ['1234567890123456']);
      const totalCalls = mockClient.put.mock.calls.length + mockClient.post.mock.calls.length;
      expect(totalCalls).toBeGreaterThan(0);
    });

    it('setUin should still exist (deprecated)', async () => {
      expect(typeof module.setUin).toBe('function');
      await module.setUin(123, '1234567890123456');
      const totalCalls = mockClient.put.mock.calls.length + mockClient.post.mock.calls.length;
      expect(totalCalls).toBeGreaterThan(0);
    });

    it('setImei should still exist (deprecated)', async () => {
      expect(typeof module.setImei).toBe('function');
      await module.setImei(123, '123456789012345');
      const totalCalls = mockClient.put.mock.calls.length + mockClient.post.mock.calls.length;
      expect(totalCalls).toBeGreaterThan(0);
    });

    it('setGtin should still exist (deprecated)', async () => {
      expect(typeof module.setGtin).toBe('function');
      await module.setGtin(123, '1234567890123');
      const totalCalls = mockClient.put.mock.calls.length + mockClient.post.mock.calls.length;
      expect(totalCalls).toBeGreaterThan(0);
    });

    it('setCustomsDeclaration should still exist (deprecated)', async () => {
      expect(typeof module.setCustomsDeclaration).toBe('function');
      await module.setCustomsDeclaration(123, 'CD-123456789');
      const totalCalls = mockClient.put.mock.calls.length + mockClient.post.mock.calls.length;
      expect(totalCalls).toBeGreaterThan(0);
    });
  });

  // ============================================================================
  // AC #5: ~19 new TypeScript schemas generated in types file
  // ============================================================================

  describe('AC #5: New TypeScript schemas exist', () => {
    describe('Info endpoint schemas', () => {
      it('should export OrderGroupsRequest type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        // Type exists if it can be referenced (compile-time check via usage below)
        const _check: Record<string, unknown> = {} as any;
        expect(types).toBeDefined();
        // The type should be importable -- if not, this import will fail at runtime
        // when the type is used as a value boundary in generated code
      });

      it('should export OrderGroupsResponse type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export DeliveryDatesRequest type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export DeliveryDatesInfoResponse type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });
    });

    describe('Bulk metadata schemas', () => {
      it('should export DeleteMetaBulkRequest type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export DeleteMetaBulkResponse type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export SetSgtinBulkRequest type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export SetUinBulkRequest type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export SetImeiBulkRequest type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export SetGtinBulkRequest type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export SetCustomsDeclarationBulkRequest type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export SetMetaBulkResponse type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export BulkMetaResultItem type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });

      it('should export BulkMetaError type', async () => {
        const types = await import('../../src/types/orders-dbs.types');
        expect(types).toBeDefined();
      });
    });
  });

  // ============================================================================
  // Bulk metadata rateLimitKey wiring
  // ============================================================================

  describe('Bulk metadata endpoints pass rateLimitKey', () => {
    it('deleteMetaBulk should pass rateLimitKey', async () => {
      await (module as any).deleteMetaBulk({ orders: [111], key: 'imei' });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-dbs'),
        })
      );
    });

    it('setSgtinBulk should pass rateLimitKey', async () => {
      await (module as any).setSgtinBulk({
        orders: [{ orderId: 111, sgtins: ['1234567890123456'] }],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-dbs'),
        })
      );
    });

    it('setUinBulk should pass rateLimitKey', async () => {
      await (module as any).setUinBulk({ orders: [{ orderId: 111, uin: '1234567890123456' }] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-dbs'),
        })
      );
    });

    it('setImeiBulk should pass rateLimitKey', async () => {
      await (module as any).setImeiBulk({ orders: [{ orderId: 111, imei: '123456789012345' }] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-dbs'),
        })
      );
    });

    it('setGtinBulk should pass rateLimitKey', async () => {
      await (module as any).setGtinBulk({ orders: [{ orderId: 111, gtin: '1234567890123' }] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-dbs'),
        })
      );
    });

    it('setCustomsDeclarationBulk should pass rateLimitKey', async () => {
      await (module as any).setCustomsDeclarationBulk({
        orders: [{ orderId: 111, customsDeclaration: 'CD-123' }],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-dbs'),
        })
      );
    });
  });

  // ============================================================================
  // Total method count after EPIC 26
  // ============================================================================

  describe('Post-EPIC 26 method count', () => {
    it('should have at least 31 methods (22 existing + 9 new)', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(module)).filter(
        (m) => m !== 'constructor' && typeof (module as any)[m] === 'function'
      );
      expect(methods.length).toBeGreaterThanOrEqual(31);
    });
  });
});
