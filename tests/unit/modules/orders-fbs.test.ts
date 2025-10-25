/**
 * Unit tests for OrdersFBSModule
 *
 * Tests the OrdersFBSModule class with mocked BaseClient to verify:
 * - Order retrieval methods (getNewOrders, getOrders, getOrderStatuses)
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Validation logic and error handling
 * - Rate limit key usage
 *
 * @see {@link ../../../src/modules/orders-fbs/index OrdersFBSModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OrdersFBSModule } from '../../../src/modules/orders-fbs';
import type { BaseClient } from '../../../src/client/base-client';
import { ValidationError } from '../../../src/errors/validation-error';

describe('OrdersFBSModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let ordersFBSModule: OrdersFBSModule;

  beforeEach(() => {
    // Create fresh mocks before each test
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    // Create fresh instance before each test
    ordersFBSModule = new OrdersFBSModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('Module initialization', () => {
    it('should be created with BaseClient', () => {
      expect(ordersFBSModule).toBeInstanceOf(OrdersFBSModule);
    });

    it('should have all required methods defined', () => {
      expect(typeof ordersFBSModule.getNewOrders).toBe('function');
      expect(typeof ordersFBSModule.getOrders).toBe('function');
      expect(typeof ordersFBSModule.getOrderStatuses).toBe('function');
    });
  });

  describe('getNewOrders()', () => {
    const mockNewOrdersResponse = {
      orders: [
        {
          id: 12345,
          article: 'TEST-ARTICLE-1',
          skus: ['1234567890123'],
          rid: 'test-rid-1',
          createdAt: '2024-10-22T10:00:00Z',
          orderUid: 'test-uid-1',
          nmId: 98765,
          chrtId: 54321,
          price: 150000,
          convertedPrice: 150000,
          currencyCode: 643,
          convertedCurrencyCode: 643,
          deliveryType: 'fbs' as const,
          warehouseId: 100,
          officeId: 200,
          cargoType: 1 as const,
          isZeroOrder: false,
        },
      ],
    };

    it('should call BaseClient.get with correct URL', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewOrdersResponse);

      // Act
      await ordersFBSModule.getNewOrders();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/new',
        { rateLimitKey: 'ordersFBS.getNewOrders' }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return orders array from response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewOrdersResponse);

      // Act
      const result = await ordersFBSModule.getNewOrders();

      // Assert
      expect(result).toEqual(mockNewOrdersResponse.orders);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(12345);
      expect(result[0].article).toBe('TEST-ARTICLE-1');
    });

    it('should use correct rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewOrdersResponse);

      // Act
      await ordersFBSModule.getNewOrders();

      // Assert
      const callArgs = mockClient.get.mock.calls[0][1] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.getNewOrders');
    });
  });

  describe('getOrders()', () => {
    const mockOrdersResponse = {
      next: 100,
      orders: [
        {
          id: 67890,
          article: 'TEST-ARTICLE-2',
          skus: ['9876543210123'],
          rid: 'test-rid-2',
          createdAt: '2024-10-21T15:00:00Z',
          orderUid: 'test-uid-2',
          nmId: 11111,
          chrtId: 22222,
          price: 250000,
          convertedPrice: 250000,
          currencyCode: 643,
          convertedCurrencyCode: 643,
          deliveryType: 'fbs' as const,
          warehouseId: 101,
          officeId: 201,
          cargoType: 2 as const,
          isZeroOrder: true,
        },
      ],
    };

    it('should use default limit 1000 and next 0 when no filters provided', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockOrdersResponse);

      // Act
      await ordersFBSModule.getOrders();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders',
        {
          params: { limit: 1000, next: 0 },
          rateLimitKey: 'ordersFBS.getOrders',
        }
      );
    });

    it('should include dateFrom and dateTo if provided', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockOrdersResponse);
      const sevenDaysAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
      const now = Math.floor(Date.now() / 1000);

      // Act
      await ordersFBSModule.getOrders({
        dateFrom: sevenDaysAgo,
        dateTo: now,
      });

      // Assert
      const callArgs = mockClient.get.mock.calls[0][1] as {
        params: Record<string, number>;
        rateLimitKey: string;
      };
      expect(callArgs.params).toHaveProperty('dateFrom', sevenDaysAgo);
      expect(callArgs.params).toHaveProperty('dateTo', now);
      expect(callArgs.params).toHaveProperty('limit', 1000);
      expect(callArgs.params).toHaveProperty('next', 0);
    });

    it('should pass limit and next from filters', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockOrdersResponse);

      // Act
      await ordersFBSModule.getOrders({ limit: 100, next: 50 });

      // Assert
      const callArgs = mockClient.get.mock.calls[0][1] as {
        params: Record<string, number>;
        rateLimitKey: string;
      };
      expect(callArgs.params).toHaveProperty('limit', 100);
      expect(callArgs.params).toHaveProperty('next', 50);
    });

    it('should return response with orders and next cursor', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockOrdersResponse);

      // Act
      const result = await ordersFBSModule.getOrders();

      // Assert
      expect(result).toEqual(mockOrdersResponse);
      expect(result.next).toBe(100);
      expect(result.orders).toHaveLength(1);
    });

    it('should use correct rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockOrdersResponse);

      // Act
      await ordersFBSModule.getOrders();

      // Assert
      const callArgs = mockClient.get.mock.calls[0][1] as {
        params: Record<string, number>;
        rateLimitKey: string;
      };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.getOrders');
    });
  });

  describe('getOrderStatuses()', () => {
    const mockStatusesResponse = {
      orders: [
        { id: 12345, supplierStatus: 'new' as const, wbStatus: 'waiting' as const },
        { id: 67890, supplierStatus: 'confirm' as const, wbStatus: 'sorted' as const },
        { id: 11111, supplierStatus: 'complete' as const, wbStatus: 'sold' as const },
      ],
    };

    it('should validate orderIds array size (must have 1-1000 items)', async () => {
      // Arrange & Act & Assert
      await expect(ordersFBSModule.getOrderStatuses([])).rejects.toThrow(ValidationError);
      await expect(ordersFBSModule.getOrderStatuses([])).rejects.toThrow(
        'Order IDs array must contain 1-1000 items'
      );
    });

    it('should throw ValidationError if orderIds empty', async () => {
      // Arrange & Act & Assert
      await expect(ordersFBSModule.getOrderStatuses([])).rejects.toThrow(ValidationError);
      await expect(ordersFBSModule.getOrderStatuses([])).rejects.toThrow(
        /Order IDs array must contain 1-1000 items/
      );

      try {
        await ordersFBSModule.getOrderStatuses([]);
      } catch (error) {
        if (error instanceof ValidationError) {
          expect(error.fieldErrors).toBeDefined();
          expect(error.fieldErrors?.orderIds).toContain('Array size must be between 1 and 1000');
        }
      }
    });

    it('should throw ValidationError if orderIds > 1000', async () => {
      // Arrange
      const tooManyIds = Array.from({ length: 1001 }, (_, i) => i + 1);

      // Act & Assert
      await expect(ordersFBSModule.getOrderStatuses(tooManyIds)).rejects.toThrow(ValidationError);
      await expect(ordersFBSModule.getOrderStatuses(tooManyIds)).rejects.toThrow(
        /Order IDs array must contain 1-1000 items/
      );

      try {
        await ordersFBSModule.getOrderStatuses(tooManyIds);
      } catch (error) {
        if (error instanceof ValidationError) {
          expect(error.fieldErrors).toBeDefined();
          expect(error.fieldErrors?.orderIds).toContain('Array size must be between 1 and 1000');
        }
      }
    });

    it('should send orders array in request body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStatusesResponse);
      const orderIds = [12345, 67890, 11111];

      // Act
      await ordersFBSModule.getOrderStatuses(orderIds);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/status',
        { orders: orderIds },
        { rateLimitKey: 'ordersFBS.getOrderStatuses' }
      );
    });

    it('should return statuses array', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStatusesResponse);
      const orderIds = [12345, 67890, 11111];

      // Act
      const result = await ordersFBSModule.getOrderStatuses(orderIds);

      // Assert
      expect(result).toEqual(mockStatusesResponse.orders);
      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('id', 12345);
      expect(result[0]).toHaveProperty('supplierStatus', 'new');
      expect(result[0]).toHaveProperty('wbStatus', 'waiting');
    });

    it('should accept exactly 1 order ID', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({ orders: [mockStatusesResponse.orders[0]] });

      // Act
      const result = await ordersFBSModule.getOrderStatuses([12345]);

      // Assert
      expect(mockClient.post).toHaveBeenCalled();
      expect(result).toHaveLength(1);
    });

    it('should accept exactly 1000 order IDs', async () => {
      // Arrange
      const maxIds = Array.from({ length: 1000 }, (_, i) => i + 1);
      mockClient.post.mockResolvedValue({ orders: [] });

      // Act
      await ordersFBSModule.getOrderStatuses(maxIds);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/status',
        { orders: maxIds },
        { rateLimitKey: 'ordersFBS.getOrderStatuses' }
      );
    });

    it('should use correct rate limit key', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStatusesResponse);

      // Act
      await ordersFBSModule.getOrderStatuses([12345]);

      // Assert
      const callArgs = mockClient.post.mock.calls[0][2] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.getOrderStatuses');
    });
  });

  // ============================================================================
  // Supply Management Tests (Story 2.6)
  // ============================================================================

  describe('createSupply()', () => {
    it('should validate name length (1-128 characters)', async () => {
      // Arrange - Empty name
      await expect(ordersFBSModule.createSupply('')).rejects.toThrow(ValidationError);
      await expect(ordersFBSModule.createSupply('')).rejects.toThrow(/Supply name must be 1-128 characters/);

      // Arrange - Name too long
      const longName = 'x'.repeat(129);
      await expect(ordersFBSModule.createSupply(longName)).rejects.toThrow(ValidationError);
    });

    it('should create supply and return supply ID', async () => {
      // Arrange
      const mockResponse = { id: 'WB-GI-1234567' };
      mockClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await ordersFBSModule.createSupply('Test Supply');

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        { name: 'Test Supply' },
        { rateLimitKey: 'ordersFBS.createSupply' }
      );
      expect(result).toEqual(mockResponse);
      expect(result.id).toMatch(/^WB-GI-/);
    });

    it('should use correct rate limit key', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({ id: 'WB-GI-1234567' });

      // Act
      await ordersFBSModule.createSupply('Test');

      // Assert
      const callArgs = mockClient.post.mock.calls[0][2] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.createSupply');
    });
  });

  describe('getSupplies()', () => {
    const mockSuppliesResponse = {
      next: 100,
      supplies: [
        {
          id: 'WB-GI-1234567',
          name: 'Test Supply',
          done: false,
          createdAt: '2024-01-15T10:00:00Z',
        },
      ],
    };

    it('should call GET with correct URL', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSuppliesResponse);

      // Act
      await ordersFBSModule.getSupplies();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        expect.objectContaining({
          rateLimitKey: 'ordersFBS.getSupplies',
        })
      );
    });

    it('should use pagination with limit and next', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSuppliesResponse);

      // Act
      await ordersFBSModule.getSupplies({ limit: 100, next: 50 });

      // Assert
      const callArgs = mockClient.get.mock.calls[0][1] as {
        params: Record<string, number>;
        rateLimitKey: string;
      };
      expect(callArgs.params).toHaveProperty('limit', 100);
      expect(callArgs.params).toHaveProperty('next', 50);
    });

    it('should return supplies array and next cursor', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSuppliesResponse);

      // Act
      const result = await ordersFBSModule.getSupplies();

      // Assert
      expect(result).toEqual(mockSuppliesResponse);
      expect(result.next).toBe(100);
      expect(result.supplies).toHaveLength(1);
    });
  });

  describe('getSupply()', () => {
    const mockSupply = {
      id: 'WB-GI-1234567',
      name: 'Test Supply',
      done: false,
      createdAt: '2024-01-15T10:00:00Z',
    };

    it('should call GET with supplyId', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSupply);

      // Act
      await ordersFBSModule.getSupply('WB-GI-1234567');

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-1234567',
        { rateLimitKey: 'ordersFBS.getSupply' }
      );
    });

    it('should return supply details', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSupply);

      // Act
      const result = await ordersFBSModule.getSupply('WB-GI-1234567');

      // Assert
      expect(result).toEqual(mockSupply);
      expect(result.id).toBe('WB-GI-1234567');
    });
  });

  describe('addOrderToSupply()', () => {
    it('should call PATCH with supplyId and orderId', async () => {
      // Arrange
      mockClient.patch.mockResolvedValue(undefined);

      // Act
      await ordersFBSModule.addOrderToSupply('WB-GI-1234567', 12345);

      // Assert
      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-1234567/orders/12345',
        {},
        { rateLimitKey: 'ordersFBS.addOrderToSupply' }
      );
    });

    it('should use correct rate limit key (1000 req/min)', async () => {
      // Arrange
      mockClient.patch.mockResolvedValue(undefined);

      // Act
      await ordersFBSModule.addOrderToSupply('WB-GI-1234567', 12345);

      // Assert
      const callArgs = mockClient.patch.mock.calls[0][2] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.addOrderToSupply');
    });
  });

  describe('deliverSupply()', () => {
    it('should call PATCH /deliver', async () => {
      // Arrange
      mockClient.patch.mockResolvedValue(undefined);

      // Act
      await ordersFBSModule.deliverSupply('WB-GI-1234567');

      // Assert
      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-1234567/deliver',
        {},
        { rateLimitKey: 'ordersFBS.deliverSupply' }
      );
    });

    it('should use correct rate limit key', async () => {
      // Arrange
      mockClient.patch.mockResolvedValue(undefined);

      // Act
      await ordersFBSModule.deliverSupply('WB-GI-1234567');

      // Assert
      const callArgs = mockClient.patch.mock.calls[0][2] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.deliverSupply');
    });
  });

  describe('deleteSupply()', () => {
    it('should call DELETE with supplyId', async () => {
      // Arrange
      mockClient.delete.mockResolvedValue(undefined);

      // Act
      await ordersFBSModule.deleteSupply('WB-GI-1234567');

      // Assert
      expect(mockClient.delete).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-1234567',
        { rateLimitKey: 'ordersFBS.deleteSupply' }
      );
    });

    it('should use correct rate limit key', async () => {
      // Arrange
      mockClient.delete.mockResolvedValue(undefined);

      // Act
      await ordersFBSModule.deleteSupply('WB-GI-1234567');

      // Assert
      const callArgs = mockClient.delete.mock.calls[0][1] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.deleteSupply');
    });
  });

  // ============================================================================
  // Shipping Labels and Barcodes Tests (Story 2.6)
  // ============================================================================

  describe('getOrderStickers()', () => {
    const mockStickersResponse = {
      stickers: [
        {
          orderId: 12345,
          partA: 'part1',
          partB: 'part2',
          barcode: 'barcode123',
          file: 'base64encodedcontent',
        },
      ],
    };

    it('should validate orderIds array size (1-100)', async () => {
      // Arrange - Empty array
      await expect(
        ordersFBSModule.getOrderStickers([], { type: 'png', width: 58, height: 40 })
      ).rejects.toThrow(ValidationError);

      // Arrange - Too many orders
      const tooManyIds = Array.from({ length: 101 }, (_, i) => i + 1);
      await expect(
        ordersFBSModule.getOrderStickers(tooManyIds, { type: 'png', width: 58, height: 40 })
      ).rejects.toThrow(/Order IDs array must contain 1-100 items/);
    });

    it('should validate size combinations (58×40 or 40×30)', async () => {
      // Arrange - Invalid size combination
      await expect(
        ordersFBSModule.getOrderStickers([12345], { type: 'png', width: 50, height: 35 } as never)
      ).rejects.toThrow(ValidationError);
      await expect(
        ordersFBSModule.getOrderStickers([12345], { type: 'png', width: 50, height: 35 } as never)
      ).rejects.toThrow(/Invalid size combination/);
    });

    it('should pass type, width, height as query params', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStickersResponse);

      // Act
      await ordersFBSModule.getOrderStickers([12345, 67890], { type: 'svg', width: 58, height: 40 });

      // Assert
      const callArgs = mockClient.post.mock.calls[0][2] as {
        params: Record<string, string | number>;
        rateLimitKey: string;
      };
      expect(callArgs.params).toHaveProperty('type', 'svg');
      expect(callArgs.params).toHaveProperty('width', 58);
      expect(callArgs.params).toHaveProperty('height', 40);
    });

    it('should return stickers array', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStickersResponse);

      // Act
      const result = await ordersFBSModule.getOrderStickers([12345], { type: 'png', width: 58, height: 40 });

      // Assert
      expect(result).toEqual(mockStickersResponse.stickers);
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('orderId', 12345);
      expect(result[0]).toHaveProperty('file');
    });

    it('should use correct rate limit key', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStickersResponse);

      // Act
      await ordersFBSModule.getOrderStickers([12345], { type: 'png', width: 58, height: 40 });

      // Assert
      const callArgs = mockClient.post.mock.calls[0][2] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.getOrderStickers');
    });
  });

  describe('getSupplyBarcode()', () => {
    const mockBarcodeResponse = {
      barcode: 'WB-GI-1234567',
      file: 'base64encodedqrcode',
    };

    it('should pass type as query param', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockBarcodeResponse);

      // Act
      await ordersFBSModule.getSupplyBarcode('WB-GI-1234567', 'svg');

      // Assert
      const callArgs = mockClient.get.mock.calls[0][1] as {
        params: Record<string, string>;
        rateLimitKey: string;
      };
      expect(callArgs.params).toHaveProperty('type', 'svg');
    });

    it('should return barcode and file', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockBarcodeResponse);

      // Act
      const result = await ordersFBSModule.getSupplyBarcode('WB-GI-1234567', 'png');

      // Assert
      expect(result).toEqual(mockBarcodeResponse);
      expect(result.barcode).toBe('WB-GI-1234567');
      expect(result.file).toBeDefined();
    });

    it('should use correct rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockBarcodeResponse);

      // Act
      await ordersFBSModule.getSupplyBarcode('WB-GI-1234567', 'png');

      // Assert
      const callArgs = mockClient.get.mock.calls[0][1] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.getSupplyBarcode');
    });
  });

  describe('cancelOrder()', () => {
    it('should call PATCH /cancel', async () => {
      // Arrange
      mockClient.patch.mockResolvedValue(undefined);

      // Act
      await ordersFBSModule.cancelOrder(12345);

      // Assert
      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/12345/cancel',
        {},
        { rateLimitKey: 'ordersFBS.cancelOrder' }
      );
    });

    it('should use correct rate limit key (100 req/min)', async () => {
      // Arrange
      mockClient.patch.mockResolvedValue(undefined);

      // Act
      await ordersFBSModule.cancelOrder(12345);

      // Assert
      const callArgs = mockClient.patch.mock.calls[0][2] as { rateLimitKey: string };
      expect(callArgs).toHaveProperty('rateLimitKey', 'ordersFBS.cancelOrder');
    });
  });
});
