/**
 * TDD RED-PHASE Tests for EPIC 22: Orders FBS URL Fixes
 *
 * These tests verify that Orders FBS methods use the CORRECT updated URLs
 * and HTTP methods as specified in the latest Swagger documentation.
 *
 * Expected: ALL tests FAIL in RED phase (methods use old URLs or wrong HTTP methods)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFbsModule } from '../../src/modules/orders-fbs';
import type { BaseClient } from '../../src/client/base-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModuleWithMethods = OrdersFbsModule & Record<string, (...args: any[]) => Promise<unknown>>;

describe('EPIC 22: Orders FBS URL Fixes', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let mod: ModuleWithMethods;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    mod = new OrdersFbsModule(mockClient as unknown as BaseClient) as ModuleWithMethods;
  });

  describe('AC1: getOrdersMeta uses POST /api/marketplace/v3/orders/meta', () => {
    it('should have a getOrdersMeta method that accepts an array of order IDs (batch)', async () => {
      // The updated API uses POST with a body containing order IDs (batch endpoint)
      // instead of GET with a single orderId path parameter
      const orderIds = [12345, 67890];
      await mod.getOrdersMeta({ orders: orderIds });

      // Should use POST (not GET)
      expect(mockClient.post).toHaveBeenCalled();
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should call the new URL /api/marketplace/v3/orders/meta', async () => {
      const orderIds = [12345, 67890];
      await mod.getOrdersMeta({ orders: orderIds });

      const calledUrl = mockClient.post.mock.calls[0][0] as string;
      expect(calledUrl).toContain('/api/marketplace/v3/orders/meta');
      // Should NOT contain the old per-order path pattern
      expect(calledUrl).not.toMatch(/\/orders\/\d+\/meta/);
    });

    it('should send order IDs in the request body', async () => {
      const requestData = { orders: [12345, 67890] };
      await mod.getOrdersMeta(requestData);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        requestData,
        expect.anything()
      );
    });
  });

  describe('AC2: getOrdersStickers uses POST /api/marketplace/v3/orders/stickers', () => {
    it('should call the URL containing /api/marketplace/v3/orders/stickers', async () => {
      // The current method is createOrdersSticker; the fixed version should be getOrdersStickers
      await mod.getOrdersStickers({ type: 'png', width: 58, height: 40 }, { orders: [12345] });

      const calledUrl = mockClient.post.mock.calls[0][0] as string;
      expect(calledUrl).toContain('/api/marketplace/v3/orders/stickers');
    });

    it('should use POST method for stickers retrieval', async () => {
      await mod.getOrdersStickers({ type: 'png', width: 58, height: 40 }, { orders: [12345] });

      expect(mockClient.post).toHaveBeenCalled();
      expect(mockClient.get).not.toHaveBeenCalled();
    });
  });

  describe('AC3: getSupplyOrders calls correct new URL', () => {
    it('should have a getSupplyOrders method', () => {
      // Renamed from getSuppliesOrder to getSupplyOrders for consistency
      expect(typeof mod.getSupplyOrders).toBe('function');
    });

    it('should call the correct URL pattern /api/v3/supplies/{supplyId}/orders', async () => {
      const supplyId = 'WB-GI-12345';
      await mod.getSupplyOrders(supplyId);

      const getUrl = mockClient.get.mock.calls[0]?.[0] as string | undefined;
      const postUrl = mockClient.post.mock.calls[0]?.[0] as string | undefined;
      const calledUrl = getUrl ?? postUrl;
      expect(calledUrl).toContain(`/api/v3/supplies/${supplyId}/orders`);
    });
  });

  describe('AC4: cancelOrder calls correct new URL', () => {
    it('should have a cancelOrder method', () => {
      // Renamed from updateOrdersCancel to cancelOrder for clearer API
      expect(typeof mod.cancelOrder).toBe('function');
    });

    it('should call the correct URL /api/v3/orders/{orderId}/cancel', async () => {
      const orderId = 98765;
      await mod.cancelOrder(orderId);

      const calledUrl = mockClient.patch.mock.calls[0][0] as string;
      expect(calledUrl).toContain(`/api/v3/orders/${orderId}/cancel`);
    });

    it('should use PATCH method for cancel', async () => {
      await mod.cancelOrder(98765);

      expect(mockClient.patch).toHaveBeenCalled();
    });
  });

  describe('AC5: Deprecated getOrderMeta (singular per-order) removed or deprecated', () => {
    it('should not have the old getOrdersMeta method that takes a single orderId path param', async () => {
      // The old method signature: getOrdersMeta(orderId: number) -> GET /orders/{orderId}/meta
      // The new method should accept an object (batch), not a single orderId
      await mod.getOrdersMeta({ orders: [12345] });
      // Verify it does NOT call GET (which is the old behavior)
      expect(mockClient.get).not.toHaveBeenCalledWith(
        expect.stringMatching(/\/orders\/\d+\/meta/),
        expect.anything()
      );
    });

    it('should provide batch meta retrieval via POST', async () => {
      // getOrdersMeta should be updated to batch mode using POST
      await mod.getOrdersMeta({ orders: [111, 222] });
      expect(mockClient.post).toHaveBeenCalled();
    });
  });
});
