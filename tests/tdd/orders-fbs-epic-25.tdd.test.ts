/**
 * TDD RED-PHASE Tests for EPIC 25: Orders FBS Testing
 *
 * These tests verify that the OrdersFbsModule has all critical methods
 * present, callable, and returning promises. This serves as the foundation
 * for achieving >= 80% unit test coverage.
 *
 * Expected: Some tests may PASS (existing methods), some FAIL (renamed/new methods)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFbsModule } from '../../src/modules/orders-fbs';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 25: Orders FBS Testing - Method Completeness', () => {
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

  describe('AC: All critical methods exist on module', () => {
    describe('Order retrieval methods', () => {
      it('should have getOrders method', () => {
        // getOrders is the expected public API name (currently "orders")
        expect(typeof module.getOrders).toBe('function');
      });

      it('should have getOrdersNew method', () => {
        expect(typeof module.getOrdersNew).toBe('function');
      });

      it('should have getOrdersReshipment method', () => {
        expect(typeof module.getOrdersReshipment).toBe('function');
      });
    });

    describe('Order metadata methods', () => {
      it('should have deleteOrdersMeta method', () => {
        expect(typeof module.deleteOrdersMeta).toBe('function');
      });
    });

    describe('Order action methods', () => {
      it('should have getOrdersStickers method', () => {
        // Expected renamed from createOrdersSticker to getOrdersStickers
        expect(typeof module.getOrdersStickers).toBe('function');
      });

      it('should have confirmOrder method', () => {
        // confirmOrder should exist to transition order to confirm status
        expect(typeof module.confirmOrder).toBe('function');
      });

      it('should have cancelOrder method', () => {
        // cancelOrder should exist (renamed from updateOrdersCancel)
        expect(typeof module.cancelOrder).toBe('function');
      });

      it('should have getOrdersStatus method', () => {
        // getOrdersStatus is the expected name (currently createOrdersStatu)
        expect(typeof module.getOrdersStatus).toBe('function');
      });
    });

    describe('Supply methods', () => {
      it('should have getSupplies method', () => {
        // Expected renamed from supplies to getSupplies
        expect(typeof module.getSupplies).toBe('function');
      });

      it('should have createSupply method', () => {
        expect(typeof module.createSupply).toBe('function');
      });

      it('should have getSupply method', () => {
        expect(typeof module.getSupply).toBe('function');
      });

      it('should have deleteSupply method', () => {
        expect(typeof module.deleteSupply).toBe('function');
      });

      it('should have getSupplyOrders method', () => {
        // Expected renamed from getSuppliesOrder to getSupplyOrders
        expect(typeof module.getSupplyOrders).toBe('function');
      });

      it('should have addOrderToSupply method', () => {
        // Expected renamed from updateSuppliesOrder to addOrderToSupply
        expect(typeof module.addOrderToSupply).toBe('function');
      });

      it('should have deliverSupply method', () => {
        // Expected renamed from updateSuppliesDeliver to deliverSupply
        expect(typeof module.deliverSupply).toBe('function');
      });
    });

    describe('Pass methods', () => {
      it('should have getPassesOffices method', () => {
        expect(typeof module.getPassesOffices).toBe('function');
      });

      it('should have getPasses method', () => {
        // Expected renamed from passes to getPasses
        expect(typeof module.getPasses).toBe('function');
      });

      it('should have createPass method', () => {
        expect(typeof module.createPass).toBe('function');
      });

      it('should have updatePass method', () => {
        expect(typeof module.updatePass).toBe('function');
      });

      it('should have deletePass method', () => {
        expect(typeof module.deletePass).toBe('function');
      });
    });
  });

  describe('AC: Each method should be callable and return a promise', () => {
    it('getOrdersNew() should return a promise', async () => {
      const result = module.getOrdersNew();
      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('orders() should return a promise', async () => {
      const result = module.orders({ limit: 10, next: 0 });
      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('createOrdersStatu() should return a promise', async () => {
      const result = module.createOrdersStatu({ orders: [123] });
      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('updateOrdersCancel() should return a promise', async () => {
      const result = module.updateOrdersCancel(12345);
      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('createOrdersSticker() should return a promise', async () => {
      const result = module.createOrdersSticker(
        { type: 'png', width: 58, height: 40 },
        { orders: [123] }
      );
      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('getSupply() should return a promise', async () => {
      const result = module.getSupply('WB-GI-123');
      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('createSupply() should return a promise', async () => {
      const result = module.createSupply({ name: 'Test' });
      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('deleteSupply() should return a promise', async () => {
      const result = module.deleteSupply('WB-GI-123');
      expect(result).toBeInstanceOf(Promise);
      await result;
    });

    it('getPassesOffices() should return a promise', async () => {
      const result = module.getPassesOffices();
      expect(result).toBeInstanceOf(Promise);
      await result;
    });
  });

  describe('AC: Module can be instantiated with BaseClient', () => {
    it('should create an instance of OrdersFbsModule', () => {
      expect(module).toBeInstanceOf(OrdersFbsModule);
    });

    it('should not expose the internal client', () => {
      // The client should be private
      expect(
        Object.getOwnPropertyDescriptor(Object.getPrototypeOf(module), 'client')
      ).toBeUndefined();
    });
  });

  describe('AC: Methods call correct base URL domain', () => {
    it('should use marketplace-api.wildberries.ru for all order endpoints', async () => {
      await module.getOrdersNew();
      const calledUrl = mockClient.get.mock.calls[0][0] as string;
      expect(calledUrl).toContain('marketplace-api.wildberries.ru');
    });

    it('should use marketplace-api.wildberries.ru for supply endpoints', async () => {
      await module.getSupply('WB-GI-123');
      const calledUrl = mockClient.get.mock.calls[0][0] as string;
      expect(calledUrl).toContain('marketplace-api.wildberries.ru');
    });

    it('should use marketplace-api.wildberries.ru for pass endpoints', async () => {
      await module.getPassesOffices();
      const calledUrl = mockClient.get.mock.calls[0][0] as string;
      expect(calledUrl).toContain('marketplace-api.wildberries.ru');
    });
  });
});
