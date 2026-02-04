/**
 * Unit tests for OrdersFbsModule — Core Order & Supply Lifecycle
 *
 * Tests core FBS (Fulfillment by Seller) module methods including:
 * - New orders retrieval
 * - Order listing with pagination
 * - Order status lookup
 * - Supply creation and delivery
 * - Supply listing with pagination
 * - Deprecated wrappers (createOrdersStatu, updateSuppliesOrder, getSuppliesOrder)
 * - Bulk methods (addOrdersToSupply, getSupplyOrderIds, getOrdersMetaBulk)
 *
 * @module tests/unit/modules/orders-fbs-core.test
 */

/* eslint-disable @typescript-eslint/no-deprecated -- intentionally testing deprecated methods */
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- void assertions in tests */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFbsModule } from '../../../src/modules/orders-fbs';
import type { BaseClient } from '../../../src/client/base-client';

describe('OrdersFbsModule — Core Order & Supply Lifecycle', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let ordersFbs: OrdersFbsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    ordersFbs = new OrdersFbsModule(mockClient as unknown as BaseClient);
  });

  // ============================================================================
  // getOrdersNew()
  // ============================================================================

  describe('getOrdersNew', () => {
    it('should call GET on the correct URL and return orders', async () => {
      const mockResponse = {
        orders: [
          {
            id: 123456789,
            rid: 'abcdef1234',
            createdAt: '2025-01-15T10:30:00Z',
            warehouseId: 507,
            nmId: 12345678,
            chrtId: 98765432,
            price: 150000,
            convertedPrice: 150000,
            currencyCode: 643,
            cargoType: 1,
          },
          {
            id: 987654321,
            rid: 'ghijkl5678',
            createdAt: '2025-01-15T11:00:00Z',
            warehouseId: 301,
            nmId: 87654321,
            chrtId: 11223344,
            price: 250000,
            convertedPrice: 250000,
            currencyCode: 643,
            cargoType: 2,
          },
        ],
      };

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbs.getOrdersNew();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/new',
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockResponse);
      expect(result.orders).toHaveLength(2);
    });

    it('should handle an empty orders response', async () => {
      const mockResponse = { orders: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbs.getOrdersNew();

      expect(result.orders).toEqual([]);
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.get.mockResolvedValue({ orders: [] });

      await ordersFbs.getOrdersNew();

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.ordersNew' })
      );
    });
  });

  // ============================================================================
  // orders()
  // ============================================================================

  describe('orders', () => {
    it('should call GET on the correct URL and return orders with pagination', async () => {
      const mockResponse = {
        next: 12345,
        orders: [
          {
            id: 123456789,
            rid: 'abc123',
            createdAt: '2025-01-10T08:00:00Z',
            warehouseId: 507,
            nmId: 12345678,
            chrtId: 98765432,
            price: 100000,
            convertedPrice: 100000,
            currencyCode: 643,
            cargoType: 1,
          },
        ],
      };

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbs.orders({ limit: 100, next: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders',
        expect.objectContaining({
          params: { limit: 100, next: 0 },
          rateLimitKey: expect.any(String),
        })
      );
      expect(result).toEqual(mockResponse);
      expect(result.next).toBe(12345);
    });

    it('should pass date range params when provided', async () => {
      const mockResponse = { next: 0, orders: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const dateFrom = 1705312000;
      const dateTo = 1705398400;

      await ordersFbs.orders({ limit: 50, next: 0, dateFrom, dateTo });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders',
        expect.objectContaining({
          params: { limit: 50, next: 0, dateFrom, dateTo },
        })
      );
    });

    it('should handle call without params (undefined)', async () => {
      const mockResponse = { orders: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbs.orders();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders',
        expect.objectContaining({ params: undefined })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.get.mockResolvedValue({ orders: [] });

      await ordersFbs.orders({ limit: 10, next: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.orders' })
      );
    });
  });

  // ============================================================================
  // getOrderStatuses()
  // ============================================================================

  describe('getOrderStatuses', () => {
    it('should call POST on the correct URL with order IDs and return statuses', async () => {
      const requestData = { orders: [123456789, 987654321, 555666777] };
      const mockResponse = {
        orders: [
          { id: 123456789, supplierStatus: 'new' as const, wbStatus: 'waiting' as const },
          { id: 987654321, supplierStatus: 'confirm' as const, wbStatus: 'sorted' as const },
          { id: 555666777, supplierStatus: 'complete' as const, wbStatus: 'sold' as const },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbs.getOrderStatuses(requestData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/status',
        requestData,
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockResponse);
      expect(result.orders).toHaveLength(3);
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });

      await ordersFbs.getOrderStatuses({ orders: [123456789] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.postOrdersStatus' })
      );
    });
  });

  // ============================================================================
  // createSupply()
  // ============================================================================

  describe('createSupply', () => {
    it('should call POST on the correct URL and return created supply ID', async () => {
      const requestData = { name: 'Test Supply January' };
      const mockResponse = { id: 'WB-GI-12345' };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbs.createSupply(requestData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        requestData,
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockResponse);
      expect(result.id).toBe('WB-GI-12345');
    });

    it('should create a supply with a name', async () => {
      const requestData = { name: 'Morning Batch 2025-01-15' };
      mockClient.post.mockResolvedValue({ id: 'WB-GI-99999' });

      await ordersFbs.createSupply(requestData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        { name: 'Morning Batch 2025-01-15' },
        expect.any(Object)
      );
    });

    it('should create a supply without a name', async () => {
      const requestData = {};
      mockClient.post.mockResolvedValue({ id: 'WB-GI-00001' });

      await ordersFbs.createSupply(requestData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        {},
        expect.any(Object)
      );
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue({ id: 'WB-GI-00001' });

      await ordersFbs.createSupply({});

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.postSupplies' })
      );
    });
  });

  // ============================================================================
  // supplies()
  // ============================================================================

  describe('supplies', () => {
    it('should call GET on the correct URL and return supplies with pagination', async () => {
      const mockResponse = {
        next: 54321,
        supplies: [
          {
            id: 'WB-GI-12345',
            done: false,
            createdAt: '2025-01-10T08:00:00Z',
            closedAt: '',
            scanDt: '',
            name: 'Test Supply',
            cargoType: 1,
          },
          {
            id: 'WB-GI-12346',
            done: true,
            createdAt: '2025-01-09T10:00:00Z',
            closedAt: '2025-01-09T18:00:00Z',
            scanDt: '2025-01-10T09:00:00Z',
            name: 'Completed Supply',
            cargoType: 2,
          },
        ],
      };

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbs.supplies({ limit: 100, next: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        expect.objectContaining({
          params: { limit: 100, next: 0 },
          rateLimitKey: expect.any(String),
        })
      );
      expect(result).toEqual(mockResponse);
      expect(result.supplies).toHaveLength(2);
      expect(result.next).toBe(54321);
    });

    it('should pass pagination params correctly', async () => {
      mockClient.get.mockResolvedValue({ supplies: [] });

      await ordersFbs.supplies({ limit: 25, next: 500 });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        expect.objectContaining({
          params: { limit: 25, next: 500 },
        })
      );
    });

    it('should handle call without params (undefined)', async () => {
      mockClient.get.mockResolvedValue({ supplies: [] });

      const result = await ordersFbs.supplies();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        expect.objectContaining({ params: undefined })
      );
      expect(result).toEqual({ supplies: [] });
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.get.mockResolvedValue({ supplies: [] });

      await ordersFbs.supplies({ limit: 10, next: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.supplies' })
      );
    });
  });

  // ============================================================================
  // updateSuppliesDeliver()
  // ============================================================================

  describe('updateSuppliesDeliver', () => {
    it('should call PATCH on the correct URL with supply ID', async () => {
      const supplyId = 'WB-GI-12345';
      mockClient.patch.mockResolvedValue(undefined);

      await ordersFbs.updateSuppliesDeliver(supplyId);

      expect(mockClient.patch).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/deliver`,
        undefined,
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should return void on success', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      const result = await ordersFbs.updateSuppliesDeliver('WB-GI-67890');

      expect(result).toBeUndefined();
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      await ordersFbs.updateSuppliesDeliver('WB-GI-12345');

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        undefined,
        expect.objectContaining({ rateLimitKey: 'orders-fbs.patchSuppliesDeliver' })
      );
    });
  });

  // ============================================================================
  // createOrdersStatu() — @deprecated
  // ============================================================================

  describe('createOrdersStatu (deprecated)', () => {
    it('should call POST on the correct URL with order IDs', async () => {
      const requestData = { orders: [123456789, 987654321] };
      const mockResponse = {
        orders: [
          { id: 123456789, supplierStatus: 'confirm' as const, wbStatus: 'waiting' as const },
          { id: 987654321, supplierStatus: 'new' as const, wbStatus: 'waiting' as const },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbs.createOrdersStatu(requestData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/status',
        requestData,
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });

      await ordersFbs.createOrdersStatu({ orders: [123456789] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.postOrdersStatus' })
      );
    });
  });

  // ============================================================================
  // updateSuppliesOrder() — @deprecated
  // ============================================================================

  describe('updateSuppliesOrder (deprecated)', () => {
    it('should call PATCH on the correct URL with supply and order IDs', async () => {
      const supplyId = 'WB-GI-12345';
      const orderId = 123456789;

      mockClient.patch.mockResolvedValue(undefined);

      await ordersFbs.updateSuppliesOrder(supplyId, orderId);

      expect(mockClient.patch).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/orders/${orderId}`,
        undefined,
        expect.objectContaining({ rateLimitKey: 'orders-fbs.patchSuppliesOrders' })
      );
    });

    it('should return void on success', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      const result = await ordersFbs.updateSuppliesOrder('WB-GI-99999', 987654321);

      expect(result).toBeUndefined();
    });
  });

  // ============================================================================
  // getSuppliesOrder() — @deprecated
  // ============================================================================

  describe('getSuppliesOrder (deprecated)', () => {
    it('should call GET on the correct URL with supply ID', async () => {
      const supplyId = 'WB-GI-12345';
      const mockResponse = {
        orders: [
          { id: 123456789, rid: 'abc123', nmId: 12345678 },
          { id: 987654321, rid: 'def456', nmId: 87654321 },
        ],
      };

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbs.getSuppliesOrder(supplyId);

      expect(mockClient.get).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/orders`,
        expect.objectContaining({ rateLimitKey: 'orders-fbs.suppliesOrders' })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should return the orders in the supply', async () => {
      const mockResponse = { orders: [] };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbs.getSuppliesOrder('WB-GI-00001');

      expect(result.orders).toEqual([]);
    });
  });

  // ============================================================================
  // addOrdersToSupply() — bulk
  // ============================================================================

  describe('addOrdersToSupply', () => {
    it('should call PATCH on the correct marketplace URL with supply ID and order data', async () => {
      const supplyId = 'WB-GI-12345';
      const requestData = { orders: [123456789, 987654321, 555666777] };

      mockClient.patch.mockResolvedValue(undefined);

      await ordersFbs.addOrdersToSupply(supplyId, requestData);

      expect(mockClient.patch).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/marketplace/v3/supplies/${supplyId}/orders`,
        requestData,
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should return void on success', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      const result = await ordersFbs.addOrdersToSupply('WB-GI-12345', {
        orders: [123456789],
      });

      expect(result).toBeUndefined();
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      await ordersFbs.addOrdersToSupply('WB-GI-12345', { orders: [123456789] });

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.patchMarketplaceSuppliesOrders' })
      );
    });
  });

  // ============================================================================
  // getSupplyOrderIds() — bulk
  // ============================================================================

  describe('getSupplyOrderIds', () => {
    it('should call GET on the correct marketplace URL with supply ID', async () => {
      const supplyId = 'WB-GI-12345';
      const mockResponse = {
        orderIds: [123456789, 987654321, 555666777],
      };

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbs.getSupplyOrderIds(supplyId);

      expect(mockClient.get).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/marketplace/v3/supplies/${supplyId}/order-ids`,
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockResponse);
      expect(result.orderIds).toHaveLength(3);
    });

    it('should return empty orderIds when supply has no orders', async () => {
      mockClient.get.mockResolvedValue({ orderIds: [] });

      const result = await ordersFbs.getSupplyOrderIds('WB-GI-00001');

      expect(result.orderIds).toEqual([]);
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.get.mockResolvedValue({ orderIds: [] });

      await ordersFbs.getSupplyOrderIds('WB-GI-12345');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.getMarketplaceSuppliesOrderIds' })
      );
    });
  });

  // ============================================================================
  // getOrdersMetaBulk() — bulk
  // ============================================================================

  describe('getOrdersMetaBulk', () => {
    it('should call POST on the correct marketplace URL with order IDs and return metadata', async () => {
      const requestData = { orders: [123456789, 987654321] };
      const mockResponse = {
        orders: [
          {
            id: 123456789,
            meta: {
              imei: { value: '123456789012345' },
              sgtin: { code: 'sgtin-abc-123' },
            },
          },
          {
            id: 987654321,
            meta: {
              uin: { value: 'UIN-XYZ-789' },
            },
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbs.getOrdersMetaBulk(requestData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/marketplace/v3/orders/meta',
        requestData,
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockResponse);
      expect(result.orders).toHaveLength(2);
    });

    it('should handle empty orders array in request', async () => {
      const requestData = { orders: [123456789] };
      const mockResponse = { orders: [] };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbs.getOrdersMetaBulk(requestData);

      expect(result.orders).toEqual([]);
    });

    it('should pass the rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });

      await ordersFbs.getOrdersMetaBulk({ orders: [123456789] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbs.postMarketplaceOrdersMeta' })
      );
    });
  });
});
