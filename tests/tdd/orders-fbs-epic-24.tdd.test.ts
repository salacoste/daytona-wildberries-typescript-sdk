/**
 * TDD RED-PHASE Tests for EPIC 24: Orders FBS Rate Limits
 *
 * These tests verify that all Orders FBS methods pass the correct
 * rateLimitKey to the BaseClient, enabling per-endpoint rate limiting.
 *
 * Expected: ALL tests FAIL in RED phase (rateLimitKey not passed)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFbsModule } from '../../src/modules/orders-fbs';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 24: Orders FBS Rate Limits', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: OrdersFbsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new OrdersFbsModule(mockClient as unknown as BaseClient);
  });

  describe('AC: All methods pass rateLimitKey to BaseClient', () => {
    it('should pass rateLimitKey when calling orders()', async () => {
      await module.orders({ limit: 10, next: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling getOrdersNew()', async () => {
      await module.getOrdersNew();

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling createOrdersStatu()', async () => {
      await module.createOrdersStatu({ orders: [123] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling createOrdersSticker()', async () => {
      await module.createOrdersSticker({ type: 'png', width: 58, height: 40 }, { orders: [123] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling updateOrdersCancel()', async () => {
      await module.updateOrdersCancel(12345);

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling supplies()', async () => {
      await module.supplies({ limit: 10, next: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling createSupply()', async () => {
      await module.createSupply({ name: 'Test Supply' });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling updateSuppliesOrder()', async () => {
      await module.updateSuppliesOrder('WB-GI-123', 456);

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling getPassesOffices()', async () => {
      await module.getPassesOffices();

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should pass rateLimitKey when calling updateSuppliesDeliver()', async () => {
      await module.updateSuppliesDeliver('WB-GI-123');

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringContaining('orders-fbs'),
        })
      );
    });

    it('should use distinct rateLimitKeys for endpoints with different limits', async () => {
      // Orders cancel has 100 req/min vs general 300 req/min
      await module.updateOrdersCancel(111);
      const cancelKey = (mockClient.patch.mock.calls[0][2] as Record<string, string>).rateLimitKey;

      mockClient.get.mockClear();
      await module.orders({ limit: 10, next: 0 });
      const ordersKey = (mockClient.get.mock.calls[0][1] as Record<string, string>).rateLimitKey;

      // They should have different rate limit keys since limits differ
      expect(cancelKey).not.toBe(ordersKey);
    });
  });
});
