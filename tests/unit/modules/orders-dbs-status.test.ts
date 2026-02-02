/**
 * Unit tests for OrdersDbsModule - Status Management Methods (Story 12.2)
 *
 * TDD tests for bulk and deprecated status management methods.
 * Tests will initially fail until implementation is complete.
 *
 * @see {@link ../../../src/modules/orders-dbs/index OrdersDbsModule}
 */

/* eslint-disable @typescript-eslint/no-deprecated -- Testing deprecated methods intentionally */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OrdersDbsModule } from '../../../src/modules/orders-dbs';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

describe('OrdersDbsModule - Status Management', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let ordersDbsModule: OrdersDbsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    ordersDbsModule = new OrdersDbsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // getStatusesBulk() Tests
  // ==========================================================================

  describe('getStatusesBulk()', () => {
    const mockResponse = {
      orders: [
        { orderId: 123456, supplierStatus: 'new', wbStatus: 'waiting' },
        { orderId: 234567, supplierStatus: 'confirm', wbStatus: 'sorted' },
      ],
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const orderIds = [123456, 234567];

      await ordersDbsModule.getStatusesBulk(orderIds);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/info`,
        { orders: orderIds },
        { rateLimitKey: 'orders-dbs.getStatusesBulk' }
      );
    });

    it('should return typed response with order statuses', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.getStatusesBulk([123456, 234567]);

      expect(result.orders).toHaveLength(2);
      expect(result.orders?.[0].supplierStatus).toBe('new');
      expect(result.orders?.[1].wbStatus).toBe('sorted');
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderIds array is empty', async () => {
        await expect(ordersDbsModule.getStatusesBulk([])).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getStatusesBulk([])).rejects.toThrow(
          'orderIds array cannot be empty'
        );
      });

      it('should throw ValidationError when orderIds exceeds 1000', async () => {
        const tooManyIds = Array.from({ length: 1001 }, (_, i) => i + 1);

        await expect(ordersDbsModule.getStatusesBulk(tooManyIds)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getStatusesBulk(tooManyIds)).rejects.toThrow(
          'orderIds array cannot exceed 1000 items'
        );
      });

      it('should accept exactly 1000 order IDs', async () => {
        mockClient.post.mockResolvedValue({ orders: [] });
        const maxIds = Array.from({ length: 1000 }, (_, i) => i + 1);

        await ordersDbsModule.getStatusesBulk(maxIds);

        expect(mockClient.post).toHaveBeenCalled();
      });

      it('should accept single order ID', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        await ordersDbsModule.getStatusesBulk([123456]);

        expect(mockClient.post).toHaveBeenCalled();
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.getStatusesBulk([123456])).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(ordersDbsModule.getStatusesBulk([123456])).rejects.toThrow(RateLimitError);
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('Network failed', false, 500));

      await expect(ordersDbsModule.getStatusesBulk([123456])).rejects.toThrow(NetworkError);
    });
  });

  // ==========================================================================
  // confirmBulk() Tests
  // ==========================================================================

  describe('confirmBulk()', () => {
    const mockResponse = {
      requestId: 'req-123',
      results: [
        { orderId: 123456, isError: false },
        { orderId: 234567, isError: false },
      ],
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const orderIds = [123456, 234567];

      await ordersDbsModule.confirmBulk(orderIds);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/confirm`,
        { orders: orderIds },
        { rateLimitKey: 'orders-dbs.confirmBulk' }
      );
    });

    it('should return BulkStatusChangeResponse with requestId', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.confirmBulk([123456, 234567]);

      expect(result.requestId).toBe('req-123');
      expect(result.results).toHaveLength(2);
    });

    it('should handle partial success response', async () => {
      const partialResponse = {
        requestId: 'req-456',
        results: [
          { orderId: 123456, isError: false },
          { orderId: 234567, isError: true, errors: [{ code: 1001, detail: 'Order not found' }] },
        ],
      };
      mockClient.post.mockResolvedValue(partialResponse);

      const result = await ordersDbsModule.confirmBulk([123456, 234567]);

      expect(result.results?.[0].isError).toBe(false);
      expect(result.results?.[1].isError).toBe(true);
      expect(result.results?.[1].errors?.[0].detail).toBe('Order not found');
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderIds array is empty', async () => {
        await expect(ordersDbsModule.confirmBulk([])).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.confirmBulk([])).rejects.toThrow(
          'orderIds array cannot be empty'
        );
      });

      it('should throw ValidationError when orderIds exceeds 1000', async () => {
        const tooManyIds = Array.from({ length: 1001 }, (_, i) => i + 1);

        await expect(ordersDbsModule.confirmBulk(tooManyIds)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.confirmBulk(tooManyIds)).rejects.toThrow(
          'orderIds array cannot exceed 1000 items'
        );
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.confirmBulk([123456])).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(ordersDbsModule.confirmBulk([123456])).rejects.toThrow(RateLimitError);
    });
  });

  // ==========================================================================
  // deliverBulk() Tests
  // ==========================================================================

  describe('deliverBulk()', () => {
    const mockResponse = {
      requestId: 'req-789',
      results: [{ orderId: 123456, isError: false }],
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await ordersDbsModule.deliverBulk([123456]);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/deliver`,
        { orders: [123456] },
        { rateLimitKey: 'orders-dbs.deliverBulk' }
      );
    });

    it('should return BulkStatusChangeResponse', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.deliverBulk([123456]);

      expect(result.requestId).toBe('req-789');
      expect(result.results?.[0].isError).toBe(false);
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderIds array is empty', async () => {
        await expect(ordersDbsModule.deliverBulk([])).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.deliverBulk([])).rejects.toThrow(
          'orderIds array cannot be empty'
        );
      });

      it('should throw ValidationError when orderIds exceeds 1000', async () => {
        const tooManyIds = Array.from({ length: 1001 }, (_, i) => i + 1);

        await expect(ordersDbsModule.deliverBulk(tooManyIds)).rejects.toThrow(ValidationError);
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.deliverBulk([123456])).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // receiveBulk() Tests
  // ==========================================================================

  describe('receiveBulk()', () => {
    const mockResponse = {
      requestId: 'req-abc',
      results: [{ orderId: 123456, isError: false }],
    };

    const validOrders = [
      { orderId: 123456, code: 'ABC123' },
      { orderId: 234567, code: 'DEF456' },
    ];

    it('should call BaseClient.post with correct URL and body', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await ordersDbsModule.receiveBulk(validOrders);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/receive`,
        { orders: validOrders },
        { rateLimitKey: 'orders-dbs.receiveBulk' }
      );
    });

    it('should return BulkStatusChangeResponse', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.receiveBulk(validOrders);

      expect(result.requestId).toBe('req-abc');
    });

    describe('input validation', () => {
      it('should throw ValidationError when orders array is empty', async () => {
        await expect(ordersDbsModule.receiveBulk([])).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.receiveBulk([])).rejects.toThrow(
          'orders array cannot be empty'
        );
      });

      it('should throw ValidationError when orders exceeds 1000', async () => {
        const tooManyOrders = Array.from({ length: 1001 }, (_, i) => ({
          orderId: i + 1,
          code: `CODE${i}`,
        }));

        await expect(ordersDbsModule.receiveBulk(tooManyOrders)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.receiveBulk(tooManyOrders)).rejects.toThrow(
          'orders array cannot exceed 1000 items'
        );
      });

      it('should throw ValidationError when orderId is not positive', async () => {
        const invalidOrders = [{ orderId: 0, code: 'ABC123' }];

        await expect(ordersDbsModule.receiveBulk(invalidOrders)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.receiveBulk(invalidOrders)).rejects.toThrow(
          'orderId must be a positive number'
        );
      });

      it('should throw ValidationError when orderId is negative', async () => {
        const invalidOrders = [{ orderId: -1, code: 'ABC123' }];

        await expect(ordersDbsModule.receiveBulk(invalidOrders)).rejects.toThrow(ValidationError);
      });

      it('should throw ValidationError when code is empty', async () => {
        const invalidOrders = [{ orderId: 123456, code: '' }];

        await expect(ordersDbsModule.receiveBulk(invalidOrders)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.receiveBulk(invalidOrders)).rejects.toThrow(
          'code cannot be empty'
        );
      });

      it('should accept exactly 1000 orders', async () => {
        mockClient.post.mockResolvedValue({ requestId: 'x', results: [] });
        const maxOrders = Array.from({ length: 1000 }, (_, i) => ({
          orderId: i + 1,
          code: `CODE${i}`,
        }));

        await ordersDbsModule.receiveBulk(maxOrders);

        expect(mockClient.post).toHaveBeenCalled();
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.receiveBulk(validOrders)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(ordersDbsModule.receiveBulk(validOrders)).rejects.toThrow(RateLimitError);
    });
  });

  // ==========================================================================
  // rejectBulk() Tests
  // ==========================================================================

  describe('rejectBulk()', () => {
    const mockResponse = {
      requestId: 'req-def',
      results: [{ orderId: 123456, isError: false }],
    };

    const validOrders = [{ orderId: 123456, code: 'ABC123' }];

    it('should call BaseClient.post with correct URL and body', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await ordersDbsModule.rejectBulk(validOrders);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/reject`,
        { orders: validOrders },
        { rateLimitKey: 'orders-dbs.rejectBulk' }
      );
    });

    it('should return BulkStatusChangeResponse', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.rejectBulk(validOrders);

      expect(result.requestId).toBe('req-def');
    });

    describe('input validation', () => {
      it('should throw ValidationError when orders array is empty', async () => {
        await expect(ordersDbsModule.rejectBulk([])).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.rejectBulk([])).rejects.toThrow(
          'orders array cannot be empty'
        );
      });

      it('should throw ValidationError when orders exceeds 1000', async () => {
        const tooManyOrders = Array.from({ length: 1001 }, (_, i) => ({
          orderId: i + 1,
          code: `CODE${i}`,
        }));

        await expect(ordersDbsModule.rejectBulk(tooManyOrders)).rejects.toThrow(ValidationError);
      });

      it('should throw ValidationError when orderId is not positive', async () => {
        await expect(ordersDbsModule.rejectBulk([{ orderId: 0, code: 'X' }])).rejects.toThrow(
          ValidationError
        );
      });

      it('should throw ValidationError when code is empty', async () => {
        await expect(ordersDbsModule.rejectBulk([{ orderId: 1, code: '' }])).rejects.toThrow(
          ValidationError
        );
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.rejectBulk(validOrders)).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // cancelBulk() Tests
  // ==========================================================================

  describe('cancelBulk()', () => {
    const mockResponse = {
      requestId: 'req-ghi',
      results: [{ orderId: 123456, isError: false }],
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await ordersDbsModule.cancelBulk([123456]);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/cancel`,
        { orders: [123456] },
        { rateLimitKey: 'orders-dbs.cancelBulk' }
      );
    });

    it('should return BulkStatusChangeResponse', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.cancelBulk([123456]);

      expect(result.requestId).toBe('req-ghi');
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderIds array is empty', async () => {
        await expect(ordersDbsModule.cancelBulk([])).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.cancelBulk([])).rejects.toThrow(
          'orderIds array cannot be empty'
        );
      });

      it('should throw ValidationError when orderIds exceeds 1000', async () => {
        const tooManyIds = Array.from({ length: 1001 }, (_, i) => i + 1);

        await expect(ordersDbsModule.cancelBulk(tooManyIds)).rejects.toThrow(ValidationError);
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.cancelBulk([123456])).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // DEPRECATED METHODS - getStatuses()
  // ==========================================================================

  describe('getStatuses() [DEPRECATED]', () => {
    const mockResponse = {
      orders: [{ id: 123456, supplierStatus: 'new', wbStatus: 'waiting' }],
    };

    it('should call BaseClient.post with correct URL', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await ordersDbsModule.getStatuses([123456]);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/v3/dbs/orders/status`,
        { orders: [123456] },
        { rateLimitKey: 'orders-dbs.getStatuses' }
      );
    });

    it('should return legacy status response', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersDbsModule.getStatuses([123456]);

      expect(result.orders?.[0].id).toBe(123456);
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderIds is empty', async () => {
        await expect(ordersDbsModule.getStatuses([])).rejects.toThrow(ValidationError);
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.getStatuses([123456])).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // DEPRECATED METHODS - confirm()
  // ==========================================================================

  describe('confirm() [DEPRECATED]', () => {
    it('should call BaseClient.patch with correct URL', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      await ordersDbsModule.confirm(123456);

      expect(mockClient.patch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v3/dbs/orders/123456/confirm`,
        undefined,
        { rateLimitKey: 'orders-dbs.confirm' }
      );
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderId is not positive', async () => {
        await expect(ordersDbsModule.confirm(0)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.confirm(0)).rejects.toThrow(
          'orderId must be a positive number'
        );
      });

      it('should throw ValidationError when orderId is negative', async () => {
        await expect(ordersDbsModule.confirm(-1)).rejects.toThrow(ValidationError);
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.patch.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.confirm(123456)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.patch.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(ordersDbsModule.confirm(123456)).rejects.toThrow(RateLimitError);
    });
  });

  // ==========================================================================
  // DEPRECATED METHODS - deliver()
  // ==========================================================================

  describe('deliver() [DEPRECATED]', () => {
    it('should call BaseClient.patch with correct URL', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      await ordersDbsModule.deliver(123456);

      expect(mockClient.patch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v3/dbs/orders/123456/deliver`,
        undefined,
        { rateLimitKey: 'orders-dbs.deliver' }
      );
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderId is not positive', async () => {
        await expect(ordersDbsModule.deliver(0)).rejects.toThrow(ValidationError);
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.patch.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.deliver(123456)).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // DEPRECATED METHODS - receive()
  // ==========================================================================

  describe('receive() [DEPRECATED]', () => {
    it('should call BaseClient.patch with correct URL and body', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      await ordersDbsModule.receive(123456, 'ABC123');

      expect(mockClient.patch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v3/dbs/orders/123456/receive`,
        { code: 'ABC123' },
        { rateLimitKey: 'orders-dbs.receive' }
      );
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderId is not positive', async () => {
        await expect(ordersDbsModule.receive(0, 'ABC123')).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.receive(0, 'ABC123')).rejects.toThrow(
          'orderId must be a positive number'
        );
      });

      it('should throw ValidationError when code is empty', async () => {
        await expect(ordersDbsModule.receive(123456, '')).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.receive(123456, '')).rejects.toThrow('code cannot be empty');
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.patch.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.receive(123456, 'ABC123')).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // DEPRECATED METHODS - reject()
  // ==========================================================================

  describe('reject() [DEPRECATED]', () => {
    it('should call BaseClient.patch with correct URL and body', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      await ordersDbsModule.reject(123456, 'ABC123');

      expect(mockClient.patch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v3/dbs/orders/123456/reject`,
        { code: 'ABC123' },
        { rateLimitKey: 'orders-dbs.reject' }
      );
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderId is not positive', async () => {
        await expect(ordersDbsModule.reject(0, 'ABC123')).rejects.toThrow(ValidationError);
      });

      it('should throw ValidationError when code is empty', async () => {
        await expect(ordersDbsModule.reject(123456, '')).rejects.toThrow(ValidationError);
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.patch.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.reject(123456, 'ABC123')).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // DEPRECATED METHODS - cancel()
  // ==========================================================================

  describe('cancel() [DEPRECATED]', () => {
    it('should call BaseClient.patch with correct URL', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      await ordersDbsModule.cancel(123456);

      expect(mockClient.patch).toHaveBeenCalledWith(
        `${BASE_URL}/api/v3/dbs/orders/123456/cancel`,
        undefined,
        { rateLimitKey: 'orders-dbs.cancel' }
      );
    });

    describe('input validation', () => {
      it('should throw ValidationError when orderId is not positive', async () => {
        await expect(ordersDbsModule.cancel(0)).rejects.toThrow(ValidationError);
      });
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.patch.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(ordersDbsModule.cancel(123456)).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // Module Method Exposure Tests
  // ==========================================================================

  describe('module methods exposure', () => {
    it('should expose all bulk status methods', () => {
      expect(typeof ordersDbsModule.getStatusesBulk).toBe('function');
      expect(typeof ordersDbsModule.confirmBulk).toBe('function');
      expect(typeof ordersDbsModule.deliverBulk).toBe('function');
      expect(typeof ordersDbsModule.receiveBulk).toBe('function');
      expect(typeof ordersDbsModule.rejectBulk).toBe('function');
      expect(typeof ordersDbsModule.cancelBulk).toBe('function');
    });

    it('should expose all deprecated status methods', () => {
      expect(typeof ordersDbsModule.getStatuses).toBe('function');
      expect(typeof ordersDbsModule.confirm).toBe('function');
      expect(typeof ordersDbsModule.deliver).toBe('function');
      expect(typeof ordersDbsModule.receive).toBe('function');
      expect(typeof ordersDbsModule.reject).toBe('function');
      expect(typeof ordersDbsModule.cancel).toBe('function');
    });
  });
});
