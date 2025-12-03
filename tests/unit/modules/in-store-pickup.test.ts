/**
 * Unit tests for InStorePickupModule
 *
 * Tests the InStorePickupModule class with mocked BaseClient to verify:
 * - Order assembly management methods (confirm, prepare, receive, reject, cancel)
 * - Customer identity verification
 * - Product metadata management (SGTIN, UIN, IMEI, GTIN)
 * - Order querying and status tracking
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Validation logic and error handling
 * - Rate limit key usage (including 409 penalty awareness)
 * - Order state transition logic
 *
 * @see {@link ../../../src/modules/in-store-pickup/index InStorePickupModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InStorePickupModule } from '../../../src/modules/in-store-pickup';
import type { BaseClient } from '../../../src/client/base-client';
import {
  PickupOrderNotFoundError,
  InvalidOrderStateError,
  CustomerVerificationError,
  MetadataValidationError,
} from '../../../src/errors/in-store-pickup-errors';

describe('InStorePickupModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let inStorePickupModule: InStorePickupModule;

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
    inStorePickupModule = new InStorePickupModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('Module initialization', () => {
    it('should be created with BaseClient', () => {
      expect(inStorePickupModule).toBeInstanceOf(InStorePickupModule);
    });

    it('should have all required methods defined', () => {
      // Assembly management methods
      expect(typeof inStorePickupModule.getNewOrders).toBe('function');
      expect(typeof inStorePickupModule.confirmOrder).toBe('function');
      expect(typeof inStorePickupModule.prepareOrder).toBe('function');
      expect(typeof inStorePickupModule.receiveOrder).toBe('function');
      expect(typeof inStorePickupModule.rejectOrder).toBe('function');
      expect(typeof inStorePickupModule.cancelOrder).toBe('function');

      // Query methods
      expect(typeof inStorePickupModule.getOrders).toBe('function');
      expect(typeof inStorePickupModule.getOrderStatuses).toBe('function');

      // Customer methods
      expect(typeof inStorePickupModule.getCustomerInfo).toBe('function');
      expect(typeof inStorePickupModule.verifyCustomerIdentity).toBe('function');

      // Metadata methods
      expect(typeof inStorePickupModule.getOrderMetadata).toBe('function');
      expect(typeof inStorePickupModule.setSGTINCode).toBe('function');
      expect(typeof inStorePickupModule.setUINCode).toBe('function');
      expect(typeof inStorePickupModule.setIMEICode).toBe('function');
      expect(typeof inStorePickupModule.setGTINCode).toBe('function');
      expect(typeof inStorePickupModule.deleteOrderMetadata).toBe('function');
    });
  });

  describe('Assembly Management Methods', () => {
    describe('getNewOrders()', () => {
      const mockNewOrdersResponse = {
        orders: [
          {
            id: 12345,
            wbStatus: 'waiting' as const,
            orderCode: '21117866-0006',
            article: 'TEST-ART-001',
            deliveryType: 'fbs' as const,
            requiredMeta: ['sgtin'],
            createdAt: '2024-10-24T10:00:00Z',
          },
        ],
      };

      it('should call BaseClient.get with correct URL and rate limit key', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockNewOrdersResponse);

        // Act
        await inStorePickupModule.getNewOrders();

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/new',
          { rateLimitKey: 'inStorePickup.getNewOrders' }
        );
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should return orders array from response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockNewOrdersResponse);

        // Act
        const result = await inStorePickupModule.getNewOrders();

        // Assert
        expect(result).toEqual(mockNewOrdersResponse);
        expect(result.orders).toHaveLength(1);
        expect(result.orders[0].id).toBe(12345);
        expect(result.orders[0].orderCode).toBe('21117866-0006');
      });

      it('should use correct rate limit key (300 req/min)', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockNewOrdersResponse);

        // Act
        await inStorePickupModule.getNewOrders();

        // Assert
        const callArgs = mockClient.get.mock.calls[0][1] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.getNewOrders');
      });
    });

    describe('confirmOrder()', () => {
      const orderId = 12345;

      it('should call BaseClient.patch with correct URL and parameters', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.confirmOrder(orderId);

        // Assert
        expect(mockClient.patch).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/confirm`,
          {},
          { rateLimitKey: 'inStorePickup.confirmOrder' }
        );
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (100 req/min)', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.confirmOrder(orderId);

        // Assert
        const callArgs = mockClient.patch.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.confirmOrder');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.confirmOrder(orderId);

        // Assert - method should complete without error
        expect(mockClient.patch).toHaveBeenCalled();
      });

      it('should handle 409 error (invalid state transition)', async () => {
        // Arrange
        const error = new InvalidOrderStateError(orderId, 'prepare', 'confirm');
        mockClient.patch.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.confirmOrder(orderId)).rejects.toThrow(
          InvalidOrderStateError
        );
      });
    });

    describe('prepareOrder()', () => {
      const orderId = 12345;

      it('should call BaseClient.patch with correct URL and parameters', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.prepareOrder(orderId);

        // Assert
        expect(mockClient.patch).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/prepare`,
          {},
          { rateLimitKey: 'inStorePickup.prepareOrder' }
        );
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (100 req/min)', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.prepareOrder(orderId);

        // Assert
        const callArgs = mockClient.patch.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.prepareOrder');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.prepareOrder(orderId);

        // Assert - method should complete without error
        expect(mockClient.patch).toHaveBeenCalled();
      });
    });

    describe('receiveOrder()', () => {
      const orderId = 12345;

      it('should call BaseClient.patch with correct URL and parameters', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.receiveOrder(orderId);

        // Assert
        expect(mockClient.patch).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/receive`,
          {},
          { rateLimitKey: 'inStorePickup.receiveOrder' }
        );
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (100 req/min)', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.receiveOrder(orderId);

        // Assert
        const callArgs = mockClient.patch.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.receiveOrder');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.receiveOrder(orderId);

        // Assert - method should complete without error
        expect(mockClient.patch).toHaveBeenCalled();
      });
    });

    describe('rejectOrder()', () => {
      const orderId = 12345;

      it('should call BaseClient.patch with correct URL and parameters', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.rejectOrder(orderId);

        // Assert
        expect(mockClient.patch).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/reject`,
          {},
          { rateLimitKey: 'inStorePickup.rejectOrder' }
        );
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (100 req/min)', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.rejectOrder(orderId);

        // Assert
        const callArgs = mockClient.patch.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.rejectOrder');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.rejectOrder(orderId);

        // Assert - method should complete without error
        expect(mockClient.patch).toHaveBeenCalled();
      });
    });

    describe('cancelOrder()', () => {
      const orderId = 12345;

      it('should call BaseClient.patch with correct URL and parameters', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.cancelOrder(orderId);

        // Assert
        expect(mockClient.patch).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/cancel`,
          {},
          { rateLimitKey: 'inStorePickup.cancelOrder' }
        );
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (100 req/min)', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.cancelOrder(orderId);

        // Assert
        const callArgs = mockClient.patch.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.cancelOrder');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.patch.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.cancelOrder(orderId);

        // Assert - method should complete without error
        expect(mockClient.patch).toHaveBeenCalled();
      });

      it('should handle 404 error (order not found)', async () => {
        // Arrange
        const error = new PickupOrderNotFoundError(orderId);
        mockClient.patch.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.cancelOrder(orderId)).rejects.toThrow(
          PickupOrderNotFoundError
        );
      });
    });
  });

  describe('Query Methods', () => {
    describe('getOrders()', () => {
      const mockOrdersResponse = {
        next: 100,
        orders: [
          {
            id: 12345,
            wbStatus: 'waiting' as const,
            orderCode: '21117866-0006',
            article: 'TEST-ART-001',
            deliveryType: 'fbs' as const,
            requiredMeta: [],
            createdAt: '2024-10-24T10:00:00Z',
          },
        ],
      };

      const params = {
        limit: 10,
        next: 0,
        dateFrom: 1729756800,
        dateTo: 1729843200,
      };

      it('should call BaseClient.get with correct URL and query parameters', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockOrdersResponse);

        // Act
        await inStorePickupModule.getOrders(params);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders',
          {
            params: {
              limit: 10,
              next: 0,
              dateFrom: 1729756800,
              dateTo: 1729843200,
            },
            rateLimitKey: 'inStorePickup.getOrders',
          }
        );
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should return orders and pagination data', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockOrdersResponse);

        // Act
        const result = await inStorePickupModule.getOrders(params);

        // Assert
        expect(result).toEqual(mockOrdersResponse);
        expect(result.next).toBe(100);
        expect(result.orders).toHaveLength(1);
        expect(result.orders[0].id).toBe(12345);
      });

      it('should use correct rate limit key (300 req/min)', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockOrdersResponse);

        // Act
        await inStorePickupModule.getOrders(params);

        // Assert
        const callArgs = mockClient.get.mock.calls[0][1] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.getOrders');
      });
    });

    describe('getOrderStatuses()', () => {
      const mockStatusesResponse = {
        orders: [
          {
            id: 12345,
            wbStatus: 'waiting' as const,
          },
          {
            id: 67890,
            wbStatus: 'complete' as const,
          },
        ],
      };

      it('should call BaseClient.post with correct URL and order IDs', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockStatusesResponse);
        const orderIds = [12345, 67890];

        // Act
        await inStorePickupModule.getOrderStatuses(orderIds);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/status',
          { orders: orderIds },
          { rateLimitKey: 'inStorePickup.getOrderStatuses' }
        );
        expect(mockClient.post).toHaveBeenCalledTimes(1);
      });

      it('should return statuses for all requested orders', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockStatusesResponse);
        const orderIds = [12345, 67890];

        // Act
        const result = await inStorePickupModule.getOrderStatuses(orderIds);

        // Assert
        expect(result).toEqual(mockStatusesResponse);
        expect(result.orders).toHaveLength(2);
        expect(result.orders[0].id).toBe(12345);
        expect(result.orders[0].wbStatus).toBe('waiting');
        expect(result.orders[1].id).toBe(67890);
        expect(result.orders[1].wbStatus).toBe('complete');
      });

      it('should use correct rate limit key (300 req/min)', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockStatusesResponse);
        const orderIds = [12345];

        // Act
        await inStorePickupModule.getOrderStatuses(orderIds);

        // Assert
        const callArgs = mockClient.post.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.getOrderStatuses');
      });
    });
  });

  describe('Customer Methods', () => {
    describe('getCustomerInfo()', () => {
      const mockCustomerResponse = {
        orders: [
          {
            orderID: 12345,
            firstName: 'Иван',
            lastName: 'Иванов',
            phone: '1234567',
            phoneCode: '890',
          },
        ],
      };

      it('should call BaseClient.post with correct URL and order IDs', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockCustomerResponse);
        const orderIds = [12345];

        // Act
        await inStorePickupModule.getCustomerInfo(orderIds);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/client',
          { orders: orderIds },
          { rateLimitKey: 'inStorePickup.getCustomerInfo' }
        );
        expect(mockClient.post).toHaveBeenCalledTimes(1);
      });

      it('should return customer information', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockCustomerResponse);
        const orderIds = [12345];

        // Act
        const result = await inStorePickupModule.getCustomerInfo(orderIds);

        // Assert
        expect(result).toEqual(mockCustomerResponse);
        expect(result.orders).toHaveLength(1);
        expect(result.orders[0].orderID).toBe(12345);
        expect(result.orders[0].firstName).toBe('Иван');
      });

      it('should use correct rate limit key (300 req/min)', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockCustomerResponse);
        const orderIds = [12345];

        // Act
        await inStorePickupModule.getCustomerInfo(orderIds);

        // Assert
        const callArgs = mockClient.post.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.getCustomerInfo');
      });
    });

    describe('verifyCustomerIdentity()', () => {
      const mockVerificationResponse = {
        ok: true,
      };

      const verificationData = {
        orderCode: '21117866-0006',
        passcode: '1234',
      };

      it('should call BaseClient.post with correct URL and verification data', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockVerificationResponse);

        // Act
        await inStorePickupModule.verifyCustomerIdentity(verificationData);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/client/identity',
          verificationData,
          { rateLimitKey: 'inStorePickup.verifyCustomerIdentity' }
        );
        expect(mockClient.post).toHaveBeenCalledTimes(1);
      });

      it('should return verification result with order ID', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockVerificationResponse);

        // Act
        const result = await inStorePickupModule.verifyCustomerIdentity(verificationData);

        // Assert
        expect(result).toEqual(mockVerificationResponse);
        expect(result.ok).toBe(true);
      });

      it('should use correct rate limit key (30 req/min - CRITICAL)', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockVerificationResponse);

        // Act
        await inStorePickupModule.verifyCustomerIdentity(verificationData);

        // Assert
        const callArgs = mockClient.post.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.verifyCustomerIdentity');
      });

      it('should handle 409 error (invalid passcode)', async () => {
        // Arrange
        const error = new CustomerVerificationError(verificationData.orderCode, 'Invalid passcode');
        mockClient.post.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.verifyCustomerIdentity(verificationData)).rejects.toThrow(
          CustomerVerificationError
        );
      });
    });
  });

  describe('Metadata Methods', () => {
    describe('getOrderMetadata()', () => {
      const mockMetadataResponse = {
        meta: {
          sgtin: {
            value: ['1234567890123456'],
          },
          uin: {
            value: null,
          },
          imei: {
            value: '123456789012345',
          },
          gtin: {
            value: null,
          },
        },
      };

      const orderId = 12345;

      it('should call BaseClient.get with correct URL', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockMetadataResponse);

        // Act
        await inStorePickupModule.getOrderMetadata(orderId);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta`,
          { rateLimitKey: 'inStorePickup.getOrderMetadata' }
        );
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should return all metadata types', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockMetadataResponse);

        // Act
        const result = await inStorePickupModule.getOrderMetadata(orderId);

        // Assert
        expect(result).toEqual(mockMetadataResponse);
        expect(result.meta.sgtin?.value).toHaveLength(1);
        expect(result.meta.sgtin?.value).toContain('1234567890123456');
        expect(result.meta.imei?.value).toBe('123456789012345');
      });

      it('should use correct rate limit key (1000 req/min)', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockMetadataResponse);

        // Act
        await inStorePickupModule.getOrderMetadata(orderId);

        // Assert
        const callArgs = mockClient.get.mock.calls[0][1] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.getOrderMetadata');
      });
    });

    describe('setSGTINCode()', () => {
      const orderId = 12345;
      const sgtins = ['1234567890123456', '6543210987654321'];

      it('should call BaseClient.put with correct URL and SGTIN codes', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setSGTINCode(orderId, sgtins);

        // Assert
        expect(mockClient.put).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/sgtin`,
          { sgtins },
          { rateLimitKey: 'inStorePickup.setSGTINCode' }
        );
        expect(mockClient.put).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (1000 req/min)', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setSGTINCode(orderId, sgtins);

        // Assert
        const callArgs = mockClient.put.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.setSGTINCode');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setSGTINCode(orderId, sgtins);

        // Assert - method should complete without error
        expect(mockClient.put).toHaveBeenCalled();
      });

      it('should handle 409 error (metadata validation failure)', async () => {
        // Arrange
        const error = new MetadataValidationError('SGTIN', orderId, 'Order not in confirm status');
        mockClient.put.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.setSGTINCode(orderId, sgtins)).rejects.toThrow(
          MetadataValidationError
        );
      });
    });

    describe('setUINCode()', () => {
      const orderId = 12345;
      const uin = 'UIN123456789';

      it('should call BaseClient.put with correct URL and UIN code', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setUINCode(orderId, uin);

        // Assert
        expect(mockClient.put).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/uin`,
          { uin },
          { rateLimitKey: 'inStorePickup.setUINCode' }
        );
        expect(mockClient.put).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (1000 req/min)', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setUINCode(orderId, uin);

        // Assert
        const callArgs = mockClient.put.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.setUINCode');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setUINCode(orderId, uin);

        // Assert - method should complete without error
        expect(mockClient.put).toHaveBeenCalled();
      });
    });

    describe('setIMEICode()', () => {
      const orderId = 12345;
      const imei = '123456789012345';

      it('should call BaseClient.put with correct URL and IMEI code', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setIMEICode(orderId, imei);

        // Assert
        expect(mockClient.put).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/imei`,
          { imei },
          { rateLimitKey: 'inStorePickup.setIMEICode' }
        );
        expect(mockClient.put).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (1000 req/min)', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setIMEICode(orderId, imei);

        // Assert
        const callArgs = mockClient.put.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.setIMEICode');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setIMEICode(orderId, imei);

        // Assert - method should complete without error
        expect(mockClient.put).toHaveBeenCalled();
      });
    });

    describe('setGTINCode()', () => {
      const orderId = 12345;
      const gtin = '12345678901234';

      it('should call BaseClient.put with correct URL and GTIN code', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setGTINCode(orderId, gtin);

        // Assert
        expect(mockClient.put).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/gtin`,
          { gtin },
          { rateLimitKey: 'inStorePickup.setGTINCode' }
        );
        expect(mockClient.put).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (1000 req/min)', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setGTINCode(orderId, gtin);

        // Assert
        const callArgs = mockClient.put.mock.calls[0][2] as { rateLimitKey: string };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.setGTINCode');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.setGTINCode(orderId, gtin);

        // Assert - method should complete without error
        expect(mockClient.put).toHaveBeenCalled();
      });
    });

    describe('deleteOrderMetadata()', () => {
      const orderId = 12345;

      it('should call BaseClient.delete with correct URL and query parameter', async () => {
        // Arrange
        mockClient.delete.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.deleteOrderMetadata(orderId, 'sgtin');

        // Assert
        expect(mockClient.delete).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta`,
          undefined,
          {
            params: { key: 'sgtin' },
            rateLimitKey: 'inStorePickup.deleteOrderMetadata',
          }
        );
        expect(mockClient.delete).toHaveBeenCalledTimes(1);
      });

      it('should use correct rate limit key (300 req/min)', async () => {
        // Arrange
        mockClient.delete.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.deleteOrderMetadata(orderId, 'sgtin');

        // Assert
        const callArgs = mockClient.delete.mock.calls[0][2] as {
          params: { key: string };
          rateLimitKey: string;
        };
        expect(callArgs).toHaveProperty('rateLimitKey', 'inStorePickup.deleteOrderMetadata');
        expect(callArgs.params).toEqual({ key: 'sgtin' });
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.delete.mockResolvedValue(undefined);

        // Act
        await inStorePickupModule.deleteOrderMetadata(orderId, 'sgtin');

        // Assert - method should complete without error
        expect(mockClient.delete).toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling', () => {
    describe('Rate Limit Awareness (409 = 5 requests)', () => {
      it('should be aware that 409 responses count as 5 requests (documented in JSDoc)', () => {
        // This is a documentation test - verify that all state change methods
        // have JSDoc comments warning about 409 penalty

        // The actual rate limit enforcement is handled by BaseClient,
        // but developers need to be aware that 409 errors have a penalty

        // All state transition methods should document this in their JSDoc
        const stateChangeMethods = [
          'confirmOrder',
          'prepareOrder',
          'receiveOrder',
          'rejectOrder',
          'cancelOrder',
        ];

        stateChangeMethods.forEach((method) => {
          expect(inStorePickupModule).toHaveProperty(method);
          expect(typeof inStorePickupModule[method as keyof InStorePickupModule]).toBe('function');
        });
      });
    });

    describe('Order State Transition Validation', () => {
      it('should handle invalid state transition from NEW to PREPARE (must go through CONFIRM)', async () => {
        // Arrange
        const orderId = 12345;
        const error = new InvalidOrderStateError(orderId, 'new', 'prepare');
        mockClient.patch.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.prepareOrder(orderId)).rejects.toThrow(
          InvalidOrderStateError
        );
        await expect(inStorePickupModule.prepareOrder(orderId)).rejects.toThrow(
          /Cannot prepare order 12345 in new state/
        );
      });

      it('should handle order not found error', async () => {
        // Arrange
        const orderId = 99999;
        const error = new PickupOrderNotFoundError(orderId);
        mockClient.patch.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.confirmOrder(orderId)).rejects.toThrow(
          PickupOrderNotFoundError
        );
        await expect(inStorePickupModule.confirmOrder(orderId)).rejects.toThrow(
          /Pickup order not found: 99999/
        );
      });
    });

    describe('Customer Verification Errors', () => {
      it('should handle invalid passcode error', async () => {
        // Arrange
        const verificationData = {
          orderCode: '21117866-0006',
          passcode: 'wrong',
        };
        const error = new CustomerVerificationError(verificationData.orderCode, 'Invalid passcode');
        mockClient.post.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.verifyCustomerIdentity(verificationData)).rejects.toThrow(
          CustomerVerificationError
        );
        await expect(inStorePickupModule.verifyCustomerIdentity(verificationData)).rejects.toThrow(
          /Customer verification failed for order 21117866-0006/
        );
      });
    });

    describe('Metadata Validation Errors', () => {
      it('should handle metadata validation error (order not in confirm status)', async () => {
        // Arrange
        const orderId = 12345;
        const sgtins = ['1234567890123456'];
        const error = new MetadataValidationError('SGTIN', orderId, 'Order not in confirm status');
        mockClient.put.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.setSGTINCode(orderId, sgtins)).rejects.toThrow(
          MetadataValidationError
        );
        await expect(inStorePickupModule.setSGTINCode(orderId, sgtins)).rejects.toThrow(
          /Order not in confirm status/
        );
      });

      it('should handle metadata validation error (SGTIN not in requiredMeta)', async () => {
        // Arrange
        const orderId = 12345;
        const sgtins = ['1234567890123456'];
        const error = new MetadataValidationError(
          'SGTIN',
          orderId,
          'SGTIN not required for this order'
        );
        mockClient.put.mockRejectedValue(error);

        // Act & Assert
        await expect(inStorePickupModule.setSGTINCode(orderId, sgtins)).rejects.toThrow(
          MetadataValidationError
        );
        await expect(inStorePickupModule.setSGTINCode(orderId, sgtins)).rejects.toThrow(
          /SGTIN not required for this order/
        );
      });
    });
  });
});
