/**
 * Unit tests for OrdersDbsModule
 *
 * Tests the OrdersDbsModule class with mocked BaseClient to verify:
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Input validation
 * - Error handling
 *
 * @see {@link ../../../src/modules/orders-dbs/index OrdersDbsModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OrdersDbsModule } from '../../../src/modules/orders-dbs';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

describe('OrdersDbsModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let ordersDbsModule: OrdersDbsModule;

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
    ordersDbsModule = new OrdersDbsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  // ==========================================================================
  // getNewOrders() Tests
  // ==========================================================================

  describe('getNewOrders()', () => {
    const mockNewOrdersResponse = {
      orders: [
        {
          id: 123456,
          address: {
            fullAddress: 'Moscow, Red Square 1',
            longitude: 37.6173,
            latitude: 55.7558,
          },
          deliveryType: 'dbs' as const,
          requiredMeta: ['sgtin'],
          ddate: '2026-02-03',
          dTimeFrom: '10:00',
          dTimeTo: '18:00',
          salePrice: 1500,
          comment: 'Please call before delivery',
          orderUid: 'order-uid-123',
          article: 'ART-001',
          colorCode: '',
          rid: 'rid-123',
          createdAt: '2026-02-02T10:00:00Z',
          skus: ['2000000000001'],
          warehouseId: 1,
          nmId: 12345,
          chrtId: 67890,
          price: 150000,
          convertedPrice: 150000,
          currencyCode: 643,
          convertedCurrencyCode: 643,
          cargoType: 1,
          isZeroOrder: false,
        },
      ],
    };

    it('should call BaseClient.get with correct URL and rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewOrdersResponse);

      // Act
      await ordersDbsModule.getNewOrders();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(`${BASE_URL}/api/v3/dbs/orders/new`, {
        rateLimitKey: 'orders-dbs.getNewOrders',
      });
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return typed response with DBS orders', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewOrdersResponse);

      // Act
      const result = await ordersDbsModule.getNewOrders();

      // Assert
      expect(result).toEqual(mockNewOrdersResponse);
      expect(result.orders).toBeDefined();
      expect(result.orders).toHaveLength(1);
      expect(result.orders?.[0].id).toBe(123456);
      expect(result.orders?.[0].deliveryType).toBe('dbs');
      expect(result.orders?.[0].address?.fullAddress).toBe('Moscow, Red Square 1');
    });

    it('should return orders with GPS coordinates for delivery routing', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewOrdersResponse);

      // Act
      const result = await ordersDbsModule.getNewOrders();

      // Assert
      const order = result.orders?.[0];
      expect(order?.address?.longitude).toBe(37.6173);
      expect(order?.address?.latitude).toBe(55.7558);
    });

    it('should return orders with delivery window information', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewOrdersResponse);

      // Act
      const result = await ordersDbsModule.getNewOrders();

      // Assert
      const order = result.orders?.[0];
      expect(order?.ddate).toBe('2026-02-03');
      expect(order?.dTimeFrom).toBe('10:00');
      expect(order?.dTimeTo).toBe('18:00');
    });

    it('should return orders with requiredMeta field', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewOrdersResponse);

      // Act
      const result = await ordersDbsModule.getNewOrders();

      // Assert
      const order = result.orders?.[0];
      expect(order?.requiredMeta).toEqual(['sgtin']);
    });

    it('should handle empty orders array', async () => {
      // Arrange
      const emptyResponse = { orders: [] };
      mockClient.get.mockResolvedValue(emptyResponse);

      // Act
      const result = await ordersDbsModule.getNewOrders();

      // Assert
      expect(result.orders).toEqual([]);
      expect(result.orders).toHaveLength(0);
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(ordersDbsModule.getNewOrders()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(ordersDbsModule.getNewOrders()).rejects.toThrow(RateLimitError);
    });

    it('should propagate NetworkError from BaseClient', async () => {
      // Arrange
      const error = new NetworkError('Network request failed', false, 500);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(ordersDbsModule.getNewOrders()).rejects.toThrow(NetworkError);
    });
  });

  // ==========================================================================
  // getOrders() Tests
  // ==========================================================================

  describe('getOrders()', () => {
    const mockOrdersResponse = {
      next: 0,
      orders: [
        {
          id: 234567,
          address: {
            fullAddress: 'Moscow, Arbat 10',
            longitude: 37.5931,
            latitude: 55.7522,
          },
          deliveryType: 'dbs',
          orderUid: 'order-uid-234',
          article: 'ART-002',
          colorCode: '',
          rid: 'rid-234',
          createdAt: '2026-01-25T15:30:00Z',
          skus: ['2000000000002'],
          warehouseId: 1,
          nmId: 23456,
          chrtId: 78901,
          price: 200000,
          convertedPrice: 200000,
          currencyCode: 643,
          convertedCurrencyCode: 643,
          cargoType: 1,
          comment: '',
          isZeroOrder: false,
        },
      ],
    };

    const validParams = {
      limit: 100,
      next: 0,
      dateFrom: 1706745600, // 2024-02-01
      dateTo: 1707350400, // 2024-02-08
    };

    it('should call BaseClient.get with correct URL and parameters', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockOrdersResponse);

      // Act
      await ordersDbsModule.getOrders(validParams);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(`${BASE_URL}/api/v3/dbs/orders`, {
        params: {
          limit: validParams.limit,
          next: validParams.next,
          dateFrom: validParams.dateFrom,
          dateTo: validParams.dateTo,
        },
        rateLimitKey: 'orders-dbs.getOrders',
      });
    });

    it('should return typed response with completed orders', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockOrdersResponse);

      // Act
      const result = await ordersDbsModule.getOrders(validParams);

      // Assert
      expect(result).toEqual(mockOrdersResponse);
      expect(result.orders).toBeDefined();
      expect(result.orders).toHaveLength(1);
      expect(result.next).toBe(0);
    });

    it('should return pagination cursor for more data', async () => {
      // Arrange
      const responseWithMore = { ...mockOrdersResponse, next: 234567 };
      mockClient.get.mockResolvedValue(responseWithMore);

      // Act
      const result = await ordersDbsModule.getOrders(validParams);

      // Assert
      expect(result.next).toBe(234567);
    });

    // Validation tests
    describe('input validation', () => {
      it('should throw ValidationError when limit is less than 1', async () => {
        // Arrange
        const invalidParams = { ...validParams, limit: 0 };

        // Act & Assert
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(
          'limit must be between 1 and 1000'
        );
      });

      it('should throw ValidationError when limit is greater than 1000', async () => {
        // Arrange
        const invalidParams = { ...validParams, limit: 1001 };

        // Act & Assert
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(
          'limit must be between 1 and 1000'
        );
      });

      it('should throw ValidationError when next is negative', async () => {
        // Arrange
        const invalidParams = { ...validParams, next: -1 };

        // Act & Assert
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow('next must be >= 0');
      });

      it('should throw ValidationError when date range exceeds 30 days', async () => {
        // Arrange
        const thirtyOneDaysInSeconds = 31 * 24 * 60 * 60;
        const invalidParams = {
          ...validParams,
          dateFrom: 1706745600,
          dateTo: 1706745600 + thirtyOneDaysInSeconds,
        };

        // Act & Assert
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(
          'Date range cannot exceed 30 calendar days'
        );
      });

      it('should throw ValidationError when dateFrom is greater than dateTo', async () => {
        // Arrange
        const invalidParams = {
          ...validParams,
          dateFrom: 1707350400, // Later date
          dateTo: 1706745600, // Earlier date
        };

        // Act & Assert
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getOrders(invalidParams)).rejects.toThrow(
          'dateFrom must be less than or equal to dateTo'
        );
      });

      it('should accept valid limit of 1', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockOrdersResponse);
        const params = { ...validParams, limit: 1 };

        // Act
        const result = await ordersDbsModule.getOrders(params);

        // Assert
        expect(result).toBeDefined();
        expect(mockClient.get).toHaveBeenCalled();
      });

      it('should accept valid limit of 1000', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockOrdersResponse);
        const params = { ...validParams, limit: 1000 };

        // Act
        const result = await ordersDbsModule.getOrders(params);

        // Assert
        expect(result).toBeDefined();
        expect(mockClient.get).toHaveBeenCalled();
      });

      it('should accept exactly 30 days date range', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockOrdersResponse);
        const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
        const params = {
          ...validParams,
          dateFrom: 1706745600,
          dateTo: 1706745600 + thirtyDaysInSeconds,
        };

        // Act
        const result = await ordersDbsModule.getOrders(params);

        // Assert
        expect(result).toBeDefined();
        expect(mockClient.get).toHaveBeenCalled();
      });
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(ordersDbsModule.getOrders(validParams)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(ordersDbsModule.getOrders(validParams)).rejects.toThrow(RateLimitError);
    });
  });

  // ==========================================================================
  // getClientInfo() Tests
  // ==========================================================================

  describe('getClientInfo()', () => {
    const mockClientInfoResponse = {
      orders: [
        {
          orderID: 123456,
          firstName: 'Ivan',
          fullName: 'Ivan Ivanov',
          phone: '9001234567',
          phoneCode: 7,
          additionalPhoneCodes: [],
        },
        {
          orderID: 234567,
          firstName: 'Maria',
          fullName: 'Maria Petrova',
          phone: '9007654321',
          phoneCode: 7,
          additionalPhoneCodes: [375, 380],
        },
      ],
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockClientInfoResponse);
      const orderIds = [123456, 234567];

      // Act
      await ordersDbsModule.getClientInfo(orderIds);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/v3/dbs/orders/client`,
        { orders: orderIds },
        { rateLimitKey: 'orders-dbs.getClientInfo' }
      );
    });

    it('should return typed response with customer information', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockClientInfoResponse);
      const orderIds = [123456, 234567];

      // Act
      const result = await ordersDbsModule.getClientInfo(orderIds);

      // Assert
      expect(result).toEqual(mockClientInfoResponse);
      expect(result.orders).toBeDefined();
      expect(result.orders).toHaveLength(2);
    });

    it('should return customer name and phone information', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockClientInfoResponse);
      const orderIds = [123456];

      // Act
      const result = await ordersDbsModule.getClientInfo(orderIds);

      // Assert
      const client = result.orders?.[0];
      expect(client?.firstName).toBe('Ivan');
      expect(client?.fullName).toBe('Ivan Ivanov');
      expect(client?.phone).toBe('9001234567');
      expect(client?.phoneCode).toBe(7);
    });

    it('should return additional phone codes when available', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockClientInfoResponse);
      const orderIds = [234567];

      // Act
      const result = await ordersDbsModule.getClientInfo(orderIds);

      // Assert
      const client = result.orders?.[1];
      expect(client?.additionalPhoneCodes).toEqual([375, 380]);
    });

    // Validation tests
    describe('input validation', () => {
      it('should throw ValidationError when orderIds array is empty', async () => {
        // Arrange
        const emptyOrderIds: number[] = [];

        // Act & Assert
        await expect(ordersDbsModule.getClientInfo(emptyOrderIds)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getClientInfo(emptyOrderIds)).rejects.toThrow(
          'orderIds array cannot be empty'
        );
      });

      it('should accept single order ID', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockClientInfoResponse);
        const orderIds = [123456];

        // Act
        const result = await ordersDbsModule.getClientInfo(orderIds);

        // Assert
        expect(result).toBeDefined();
        expect(mockClient.post).toHaveBeenCalled();
      });

      it('should accept multiple order IDs', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockClientInfoResponse);
        const orderIds = [123456, 234567, 345678];

        // Act
        const result = await ordersDbsModule.getClientInfo(orderIds);

        // Assert
        expect(result).toBeDefined();
        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          { orders: orderIds },
          expect.any(Object)
        );
      });
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.post.mockRejectedValue(error);
      const orderIds = [123456];

      // Act & Assert
      await expect(ordersDbsModule.getClientInfo(orderIds)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);
      const orderIds = [123456];

      // Act & Assert
      await expect(ordersDbsModule.getClientInfo(orderIds)).rejects.toThrow(RateLimitError);
    });

    it('should propagate NetworkError from BaseClient', async () => {
      // Arrange
      const error = new NetworkError('Network request failed', false, 500);
      mockClient.post.mockRejectedValue(error);
      const orderIds = [123456];

      // Act & Assert
      await expect(ordersDbsModule.getClientInfo(orderIds)).rejects.toThrow(NetworkError);
    });
  });

  // ==========================================================================
  // getGroupsInfo() Tests
  // ==========================================================================

  describe('getGroupsInfo()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ groups: [] });
      const request = { orders: [123456] };

      await ordersDbsModule.getGroupsInfo(request);

      expect(mockClient.post).toHaveBeenCalledWith(`${BASE_URL}/api/v3/dbs/groups/info`, request, {
        rateLimitKey: 'orders-dbs.getGroupsInfo',
      });
    });

    it('should return groups info response', async () => {
      const mockResponse = { groups: [{ groupId: 1, orders: [123456] }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.getGroupsInfo({ orders: [123456] });

      expect(result).toEqual(mockResponse);
    });
  });

  // ==========================================================================
  // getDeliveryDates() Tests
  // ==========================================================================

  describe('getDeliveryDates()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      const request = { orders: [123456] };

      await ordersDbsModule.getDeliveryDates(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/v3/dbs/orders/delivery-date`,
        request,
        { rateLimitKey: 'orders-dbs.getDeliveryDates' }
      );
    });

    it('should return delivery dates response', async () => {
      const mockResponse = { orders: [{ orderId: 123456, deliveryDate: '2026-02-10' }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.getDeliveryDates({ orders: [123456] });

      expect(result).toEqual(mockResponse);
    });
  });

  // ==========================================================================
  // getMetaBulk() Tests
  // ==========================================================================

  describe('getMetaBulk()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      const request = { orders: [123456] };

      // eslint-disable-next-line @typescript-eslint/no-deprecated -- intentionally testing deprecated method
      await ordersDbsModule.getMetaBulk(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/info`,
        request,
        { rateLimitKey: 'orders-dbs.getMetaBulk' }
      );
    });

    it('should return metadata response', async () => {
      const mockResponse = { orders: [{ orderId: 123456, imei: '123' }] };
      mockClient.post.mockResolvedValue(mockResponse);

      // eslint-disable-next-line @typescript-eslint/no-deprecated -- intentionally testing deprecated method
      const result = await ordersDbsModule.getMetaBulk({ orders: [123456] });

      expect(result).toEqual(mockResponse);
    });
  });

  // ==========================================================================
  // deleteMetaBulk() Tests
  // ==========================================================================

  describe('deleteMetaBulk()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      const request = { orders: [123456], key: 'imei' as const };

      await ordersDbsModule.deleteMetaBulk(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/delete`,
        request,
        { rateLimitKey: 'orders-dbs.deleteMetaBulk' }
      );
    });

    it('should return delete response', async () => {
      const mockResponse = { orders: [{ orderId: 123456, deleted: true }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.deleteMetaBulk({ orders: [123456], key: 'imei' });

      expect(result).toEqual(mockResponse);
    });
  });

  // ==========================================================================
  // setSgtinBulk() Tests
  // ==========================================================================

  describe('setSgtinBulk()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      const request = { orders: [{ orderId: 123456, sgtins: ['sgtin123'] }] };

      await ordersDbsModule.setSgtinBulk(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/sgtin`,
        request,
        { rateLimitKey: 'orders-dbs.setSgtinBulk' }
      );
    });

    it('should return bulk set response', async () => {
      const mockResponse = { orders: [{ orderId: 123456, success: true }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.setSgtinBulk({
        orders: [{ orderId: 123456, sgtins: ['sgtin123'] }],
      });

      expect(result).toEqual(mockResponse);
    });
  });

  // ==========================================================================
  // setUinBulk() Tests
  // ==========================================================================

  describe('setUinBulk()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      const request = { orders: [{ orderId: 123456, uin: 'uin123' }] };

      await ordersDbsModule.setUinBulk(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/uin`,
        request,
        { rateLimitKey: 'orders-dbs.setUinBulk' }
      );
    });

    it('should return bulk set response', async () => {
      const mockResponse = { orders: [{ orderId: 123456, success: true }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.setUinBulk({
        orders: [{ orderId: 123456, uin: 'uin123' }],
      });

      expect(result).toEqual(mockResponse);
    });
  });

  // ==========================================================================
  // setImeiBulk() Tests
  // ==========================================================================

  describe('setImeiBulk()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      const request = { orders: [{ orderId: 123456, imei: '123456789012345' }] };

      await ordersDbsModule.setImeiBulk(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/imei`,
        request,
        { rateLimitKey: 'orders-dbs.setImeiBulk' }
      );
    });

    it('should return bulk set response', async () => {
      const mockResponse = { orders: [{ orderId: 123456, success: true }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.setImeiBulk({
        orders: [{ orderId: 123456, imei: '123456789012345' }],
      });

      expect(result).toEqual(mockResponse);
    });
  });

  // ==========================================================================
  // setGtinBulk() Tests
  // ==========================================================================

  describe('setGtinBulk()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({ orders: [] });
      const request = { orders: [{ orderId: 123456, gtin: '1234567890123' }] };

      // Act
      await ordersDbsModule.setGtinBulk(request);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/gtin`,
        request,
        { rateLimitKey: 'orders-dbs.setGtinBulk' }
      );
    });

    it('should return bulk set response', async () => {
      // Arrange
      const mockResponse = { orders: [{ orderId: 123456, success: true }] };
      mockClient.post.mockResolvedValue(mockResponse);
      const request = { orders: [{ orderId: 123456, gtin: '1234567890123' }] };

      // Act
      const result = await ordersDbsModule.setGtinBulk(request);

      // Assert
      expect(result).toEqual(mockResponse);
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.post.mockRejectedValue(error);
      const request = { orders: [{ orderId: 123456, gtin: '1234567890123' }] };

      // Act & Assert
      await expect(ordersDbsModule.setGtinBulk(request)).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // setCustomsDeclarationBulk() Tests
  // ==========================================================================

  describe('setCustomsDeclarationBulk()', () => {
    it('should call correct endpoint with rateLimitKey', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({ orders: [] });
      const request = {
        orders: [{ orderId: 123456, customsDeclaration: 'CD-123456789', originCountryCode: 643 }],
      };

      // Act
      await ordersDbsModule.setCustomsDeclarationBulk(request);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/customs-declaration`,
        request,
        { rateLimitKey: 'orders-dbs.setCustomsDeclarationBulk' }
      );
    });

    it('should return bulk set response', async () => {
      // Arrange
      const mockResponse = { orders: [{ orderId: 123456, success: true }] };
      mockClient.post.mockResolvedValue(mockResponse);
      const request = { orders: [{ orderId: 123456, customsDeclaration: 'CD-123456789' }] };

      // Act
      const result = await ordersDbsModule.setCustomsDeclarationBulk(request);

      // Assert
      expect(result).toEqual(mockResponse);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 60000);
      mockClient.post.mockRejectedValue(error);
      const request = { orders: [{ orderId: 123456, customsDeclaration: 'CD-123456789' }] };

      // Act & Assert
      await expect(ordersDbsModule.setCustomsDeclarationBulk(request)).rejects.toThrow(
        RateLimitError
      );
    });
  });

  // ==========================================================================
  // Module Instantiation Tests
  // ==========================================================================

  describe('module instantiation', () => {
    it('should create module instance with BaseClient', () => {
      // Assert
      expect(ordersDbsModule).toBeInstanceOf(OrdersDbsModule);
    });

    it('should expose all core methods', () => {
      // Assert
      expect(typeof ordersDbsModule.getNewOrders).toBe('function');
      expect(typeof ordersDbsModule.getOrders).toBe('function');
      expect(typeof ordersDbsModule.getClientInfo).toBe('function');
    });
  });

  describe('checkMetaValidation() (task-142)', () => {
    it('should call POST meta/details with orders + rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ metaDetails: [] });
      await ordersDbsModule.checkMetaValidation({ orders: [123456, 234567] });
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/details`,
        { orders: [123456, 234567] },
        expect.objectContaining({ rateLimitKey: 'orders-dbs.checkMetaValidation' })
      );
    });

    it('should throw ValidationError on empty orders', async () => {
      await expect(ordersDbsModule.checkMetaValidation({ orders: [] })).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError on >1000 orders', async () => {
      const big = Array.from({ length: 1001 }, (_, i) => i);
      await expect(ordersDbsModule.checkMetaValidation({ orders: big })).rejects.toThrow(
        ValidationError
      );
    });
  });
});
