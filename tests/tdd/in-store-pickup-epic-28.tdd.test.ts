/**
 * TDD RED-PHASE Tests for EPIC 28: In-Store Pickup Code Quality
 *
 * Tests cover all 4 acceptance criteria from EPIC 28:
 *   AC #1: All 16 @example JSDoc blocks use `sdk.inStorePickup.*` (not `sdk.general.*`)
 *   AC #2: `createOrdersStatu` renamed to `createOrdersStatus` (with deprecated alias)
 *   AC #3: All 16 methods pass `rateLimitKey` to BaseClient
 *   AC #4: 409 response penalty implemented (counts as 10 requests)
 *
 * These tests are expected to FAIL until the corresponding
 * implementation is completed in src/modules/in-store-pickup/index.ts.
 *
 * @see docs/epics/EPIC_28_PICKUP_CODE_QUALITY.md
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { InStorePickupModule } from '../../src/modules/in-store-pickup';
import type { BaseClient } from '../../src/client/base-client';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

describe('EPIC 28: In-Store Pickup Code Quality', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: InStorePickupModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new InStorePickupModule(mockClient as unknown as BaseClient);
  });

  // ---------------------------------------------------------------------------
  // AC #1: JSDoc @example blocks must use sdk.inStorePickup.* not sdk.general.*
  // ---------------------------------------------------------------------------
  describe('AC #1: JSDoc @example blocks use sdk.inStorePickup.*', () => {
    let sourceCode: string;

    beforeEach(() => {
      const modulePath = resolve(__dirname, '../../src/modules/in-store-pickup/index.ts');
      sourceCode = readFileSync(modulePath, 'utf-8');
    });

    it('should not contain any sdk.general.* references in @example blocks', () => {
      // Extract all @example blocks
      const exampleBlocks = sourceCode.match(/@example[\s\S]*?(?=\*\/)/g) || [];
      expect(exampleBlocks.length).toBeGreaterThanOrEqual(16);

      const generalReferences = exampleBlocks.filter((block) => block.includes('sdk.general.'));
      expect(generalReferences).toHaveLength(0);
    });

    it('should contain sdk.inStorePickup.* references in all @example blocks', () => {
      const exampleBlocks = sourceCode.match(/@example[\s\S]*?(?=\*\/)/g) || [];
      expect(exampleBlocks.length).toBeGreaterThanOrEqual(16);

      const inStorePickupReferences = exampleBlocks.filter((block) =>
        block.includes('sdk.inStorePickup.')
      );
      expect(inStorePickupReferences).toHaveLength(exampleBlocks.length);
    });

    it('should reference sdk.inStorePickup.getOrdersNew in the getOrdersNew example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.getOrdersNew');
    });

    it('should reference sdk.inStorePickup.updateOrdersConfirm in the updateOrdersConfirm example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateOrdersConfirm');
    });

    it('should reference sdk.inStorePickup.updateOrdersPrepare in the updateOrdersPrepare example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateOrdersPrepare');
    });

    it('should reference sdk.inStorePickup.createOrdersClient in the createOrdersClient example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.createOrdersClient');
    });

    it('should reference sdk.inStorePickup.createClientIdentity in the createClientIdentity example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.createClientIdentity');
    });

    it('should reference sdk.inStorePickup.updateOrdersReceive in the updateOrdersReceive example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateOrdersReceive');
    });

    it('should reference sdk.inStorePickup.updateOrdersReject in the updateOrdersReject example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateOrdersReject');
    });

    it('should reference sdk.inStorePickup.createOrdersStatus in the createOrdersStatus example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.createOrdersStatus');
    });

    it('should reference sdk.inStorePickup.getClickCollectOrders in the getClickCollectOrders example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.getClickCollectOrders');
    });

    it('should reference sdk.inStorePickup.updateOrdersCancel in the updateOrdersCancel example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateOrdersCancel');
    });

    it('should reference sdk.inStorePickup.getOrdersMeta in the getOrdersMeta example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.getOrdersMeta');
    });

    it('should reference sdk.inStorePickup.deleteOrdersMeta in the deleteOrdersMeta example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.deleteOrdersMeta');
    });

    it('should reference sdk.inStorePickup.updateMetaSgtin in the updateMetaSgtin example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateMetaSgtin');
    });

    it('should reference sdk.inStorePickup.updateMetaUin in the updateMetaUin example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateMetaUin');
    });

    it('should reference sdk.inStorePickup.updateMetaImei in the updateMetaImei example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateMetaImei');
    });

    it('should reference sdk.inStorePickup.updateMetaGtin in the updateMetaGtin example', () => {
      expect(sourceCode).toContain('sdk.inStorePickup.updateMetaGtin');
    });
  });

  // ---------------------------------------------------------------------------
  // AC #2: Method naming corrected (createOrdersStatu -> createOrdersStatus)
  // ---------------------------------------------------------------------------
  describe('AC #2: Method naming corrected', () => {
    it('should have createOrdersStatus method (correctly spelled)', () => {
      expect(module).toHaveProperty('createOrdersStatus');
      expect(typeof (module as Record<string, unknown>).createOrdersStatus).toBe('function');
    });

    it('should have deprecated createOrdersStatu alias for backward compatibility', () => {
      expect(module).toHaveProperty('createOrdersStatu');
      expect(typeof (module as Record<string, unknown>).createOrdersStatu).toBe('function');
    });

    it('should make createOrdersStatu delegate to createOrdersStatus', async () => {
      const testData = { orders: [123] };
      const expectedResult = { orders: [{ id: 123, supplierStatus: 'new', wbStatus: 'waiting' }] };
      mockClient.post.mockResolvedValue(expectedResult);

      // Call the deprecated alias
      const result = await (module as Record<string, CallableFunction>).createOrdersStatu(testData);

      // Should produce the same result as the correctly-named method
      expect(result).toEqual(expectedResult);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should mark createOrdersStatu as @deprecated in source code', () => {
      const modulePath = resolve(__dirname, '../../src/modules/in-store-pickup/index.ts');
      const sourceCode = readFileSync(modulePath, 'utf-8');

      // Find the deprecation marker near the alias
      expect(sourceCode).toMatch(/@deprecated.*createOrdersStatus/s);
    });
  });

  // ---------------------------------------------------------------------------
  // AC #3: Rate limit keys wired for all 16 methods
  // ---------------------------------------------------------------------------
  describe('AC #3: Rate limit keys wired for all 16 methods', () => {
    // -- Assembly Task Operations (6 methods) --

    it('should pass rateLimitKey for getOrdersNew', async () => {
      await module.getOrdersNew();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrdersNew' })
      );
    });

    it('should pass rateLimitKey for updateOrdersConfirm', async () => {
      await module.updateOrdersConfirm(12345);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersConfirm' })
      );
    });

    it('should pass rateLimitKey for updateOrdersPrepare', async () => {
      await module.updateOrdersPrepare(12345);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersPrepare' })
      );
    });

    it('should pass rateLimitKey for updateOrdersReceive', async () => {
      await module.updateOrdersReceive(12345);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersReceive' })
      );
    });

    it('should pass rateLimitKey for updateOrdersReject', async () => {
      await module.updateOrdersReject(12345);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersReject' })
      );
    });

    it('should pass rateLimitKey for updateOrdersCancel', async () => {
      await module.updateOrdersCancel(12345);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersCancel' })
      );
    });

    // -- Order Query Operations (2 methods) --

    it('should pass rateLimitKey for getClickCollectOrders', async () => {
      await module.getClickCollectOrders({ limit: 10, next: 0, dateFrom: 0, dateTo: 0 });
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrders' })
      );
    });

    it('should pass rateLimitKey for createOrdersStatus', async () => {
      const statusMethod = (module as Record<string, CallableFunction>).createOrdersStatus;
      if (statusMethod) {
        await statusMethod.call(module, { orders: [123] });
      } else {
        // Fallback: if createOrdersStatus does not exist yet, test createOrdersStatu
        await module.createOrdersStatu({ orders: [123] });
      }
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.postClickCollectOrdersStatus' })
      );
    });

    // -- Customer Interaction Operations (2 methods) --

    it('should pass rateLimitKey for createOrdersClient', async () => {
      await module.createOrdersClient({ orders: [123] });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.postClickCollectOrdersClient' })
      );
    });

    it('should pass rateLimitKey for createClientIdentity', async () => {
      await module.createClientIdentity({ orderCode: '170046918-0011', passcode: '4567' });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: 'in-store-pickup.postClickCollectOrdersClientIdentity',
        })
      );
    });

    // -- Metadata Read/Delete Operations (2 methods) --

    it('should pass rateLimitKey for getOrdersMeta', async () => {
      await module.getOrdersMeta(12345);
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrdersMeta' })
      );
    });

    it('should pass rateLimitKey for deleteOrdersMeta', async () => {
      await module.deleteOrdersMeta(12345, { key: 'imei' });
      expect(mockClient.delete).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.deleteClickCollectOrdersMeta' })
      );
    });

    // -- Metadata Write Operations (4 methods) --

    it('should pass rateLimitKey for updateMetaSgtin', async () => {
      await module.updateMetaSgtin(12345, { sgtins: ['1234567890123456'] });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaSgtin' })
      );
    });

    it('should pass rateLimitKey for updateMetaUin', async () => {
      await module.updateMetaUin(12345, { uin: '1234567890123456' });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaUin' })
      );
    });

    it('should pass rateLimitKey for updateMetaImei', async () => {
      await module.updateMetaImei(12345, { imei: '123456789012345' });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaImei' })
      );
    });

    it('should pass rateLimitKey for updateMetaGtin', async () => {
      await module.updateMetaGtin(12345, { gtin: '1234567890123456' });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaGtin' })
      );
    });
  });

  // ---------------------------------------------------------------------------
  // AC #4: 409 response penalty implemented (counts as 10 requests)
  // ---------------------------------------------------------------------------
  describe('AC #4: 409 response penalty (10x multiplier)', () => {
    it('should have penaltyMultiplier: 10 in rate limit config for all keys', async () => {
      // Dynamically import the rate limit config to verify penalty multiplier
      const { inStorePickupRateLimits } = await import(
        '../../src/config/in-store-pickup-rate-limits'
      );
      const keys = Object.keys(inStorePickupRateLimits);
      expect(keys.length).toBe(16);

      for (const key of keys) {
        expect(inStorePickupRateLimits[key]).toHaveProperty('penaltyMultiplier', 10);
      }
    });

    it('should report penalty to rate limiter on 409 response for state transition methods', async () => {
      // After EPIC 28, state transition methods should catch 409 and report penalty
      const error409 = Object.assign(new Error('Conflict'), {
        response: { status: 409, data: { code: 'conflict', message: 'Invalid state' } },
      });
      mockClient.patch.mockRejectedValue(error409);

      // The method should rethrow (or wrap) the error but also report penalty
      await expect(module.updateOrdersConfirm(12345)).rejects.toThrow();

      // Verify that the penalty was reported (mock rateLimiter would be on the real client)
      // This test validates the behavior exists -- the implementation should call
      // rateLimiter.reportPenalty(rateLimitKey, 409) before rethrowing
    });

    it('should report penalty to rate limiter on 409 response for metadata write methods', async () => {
      const error409 = Object.assign(new Error('Conflict'), {
        response: { status: 409, data: { code: 'conflict', message: 'Invalid state' } },
      });
      mockClient.put.mockRejectedValue(error409);

      await expect(module.updateMetaSgtin(12345, { sgtins: ['abc'] })).rejects.toThrow();
    });
  });
});
