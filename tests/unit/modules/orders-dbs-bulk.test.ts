/**
 * Unit tests for OrdersDbsModule - Bulk Status Management Methods
 *
 * Tests the 6 bulk methods with mocked BaseClient to verify:
 * - Correct endpoint calls
 * - Rate limit key passing
 * - Input validation
 * - Error propagation
 *
 * @see {@link ../../../src/modules/orders-dbs/index OrdersDbsModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OrdersDbsModule } from '../../../src/modules/orders-dbs';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { ValidationError } from '../../../src/errors/validation-error';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

describe('OrdersDbsModule - Bulk Status Methods', () => {
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
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    module = new OrdersDbsModule(mockClient as unknown as BaseClient);
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
        { orderId: 123456, status: 'confirmed' },
        { orderId: 234567, status: 'delivering' },
      ],
    };

    it('should call correct endpoint with POST method', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.getStatusesBulk([123456, 234567]);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/info`,
        { orders: [123456, 234567] },
        { rateLimitKey: 'orders-dbs.getStatusesBulk' }
      );
    });

    it('should pass rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.getStatusesBulk([123456]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'orders-dbs.getStatusesBulk' })
      );
    });

    it('should return typed response with order statuses', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getStatusesBulk([123456, 234567]);

      expect(result).toEqual(mockResponse);
      expect(result.orders).toHaveLength(2);
    });

    it('should throw ValidationError when orderIds array is empty', async () => {
      await expect(module.getStatusesBulk([])).rejects.toThrow(ValidationError);
      await expect(module.getStatusesBulk([])).rejects.toThrow('orderIds array cannot be empty');
    });

    it('should throw ValidationError when orderIds exceeds 1000 items', async () => {
      const orderIds = Array.from({ length: 1001 }, (_, i) => i + 1);

      await expect(module.getStatusesBulk(orderIds)).rejects.toThrow(ValidationError);
      await expect(module.getStatusesBulk(orderIds)).rejects.toThrow(
        'orderIds array cannot exceed 1000 items'
      );
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(module.getStatusesBulk([123456])).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(module.getStatusesBulk([123456])).rejects.toThrow(RateLimitError);
    });
  });

  // ==========================================================================
  // confirmBulk() Tests
  // ==========================================================================

  describe('confirmBulk()', () => {
    const mockResponse = {
      requestId: 'req-123',
      results: [{ orderId: 123456, success: true }],
    };

    it('should call correct endpoint with POST method', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.confirmBulk([123456, 234567]);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/confirm`,
        { orders: [123456, 234567] },
        { rateLimitKey: 'orders-dbs.confirmBulk' }
      );
    });

    it('should pass rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.confirmBulk([123456]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'orders-dbs.confirmBulk' })
      );
    });

    it('should return typed response with results', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.confirmBulk([123456]);

      expect(result.requestId).toBe('req-123');
      expect(result.results).toBeDefined();
    });

    it('should throw ValidationError when orderIds array is empty', async () => {
      await expect(module.confirmBulk([])).rejects.toThrow(ValidationError);
      await expect(module.confirmBulk([])).rejects.toThrow('orderIds array cannot be empty');
    });

    it('should throw ValidationError when orderIds exceeds 1000 items', async () => {
      const orderIds = Array.from({ length: 1001 }, (_, i) => i + 1);

      await expect(module.confirmBulk(orderIds)).rejects.toThrow(ValidationError);
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(module.confirmBulk([123456])).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // deliverBulk() Tests
  // ==========================================================================

  describe('deliverBulk()', () => {
    const mockResponse = {
      requestId: 'req-456',
      results: [{ orderId: 123456, success: true }],
    };

    it('should call correct endpoint with POST method', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.deliverBulk([123456, 234567]);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/deliver`,
        { orders: [123456, 234567] },
        { rateLimitKey: 'orders-dbs.deliverBulk' }
      );
    });

    it('should pass rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.deliverBulk([123456]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'orders-dbs.deliverBulk' })
      );
    });

    it('should return typed response with results', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.deliverBulk([123456]);

      expect(result.requestId).toBe('req-456');
    });

    it('should throw ValidationError when orderIds array is empty', async () => {
      await expect(module.deliverBulk([])).rejects.toThrow(ValidationError);
      await expect(module.deliverBulk([])).rejects.toThrow('orderIds array cannot be empty');
    });

    it('should throw ValidationError when orderIds exceeds 1000 items', async () => {
      const orderIds = Array.from({ length: 1001 }, (_, i) => i + 1);

      await expect(module.deliverBulk(orderIds)).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(module.deliverBulk([123456])).rejects.toThrow(RateLimitError);
    });
  });

  // ==========================================================================
  // receiveBulk() Tests
  // ==========================================================================

  describe('receiveBulk()', () => {
    const mockResponse = {
      requestId: 'req-789',
      results: [{ orderId: 123456, success: true }],
    };

    const validOrders = [
      { orderId: 123456, code: 'ABC123' },
      { orderId: 234567, code: 'DEF456' },
    ];

    it('should call correct endpoint with POST method', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.receiveBulk(validOrders);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/receive`,
        { orders: validOrders },
        { rateLimitKey: 'orders-dbs.receiveBulk' }
      );
    });

    it('should pass rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.receiveBulk([{ orderId: 123456, code: 'ABC123' }]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'orders-dbs.receiveBulk' })
      );
    });

    it('should return typed response with results', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.receiveBulk(validOrders);

      expect(result.requestId).toBe('req-789');
    });

    it('should throw ValidationError when orders array is empty', async () => {
      await expect(module.receiveBulk([])).rejects.toThrow(ValidationError);
      await expect(module.receiveBulk([])).rejects.toThrow('orders array cannot be empty');
    });

    it('should throw ValidationError when orders exceeds 1000 items', async () => {
      const orders = Array.from({ length: 1001 }, (_, i) => ({
        orderId: i + 1,
        code: `CODE${i}`,
      }));

      await expect(module.receiveBulk(orders)).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when orderId is not positive', async () => {
      await expect(module.receiveBulk([{ orderId: 0, code: 'ABC' }])).rejects.toThrow(
        ValidationError
      );
      await expect(module.receiveBulk([{ orderId: 0, code: 'ABC' }])).rejects.toThrow(
        'orderId must be a positive number'
      );
    });

    it('should throw ValidationError when code is empty', async () => {
      await expect(module.receiveBulk([{ orderId: 123456, code: '' }])).rejects.toThrow(
        ValidationError
      );
      await expect(module.receiveBulk([{ orderId: 123456, code: '' }])).rejects.toThrow(
        'code cannot be empty'
      );
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(module.receiveBulk(validOrders)).rejects.toThrow(AuthenticationError);
    });
  });

  // ==========================================================================
  // rejectBulk() Tests
  // ==========================================================================

  describe('rejectBulk()', () => {
    const mockResponse = {
      requestId: 'req-101',
      results: [{ orderId: 123456, success: true }],
    };

    const validOrders = [
      { orderId: 123456, code: 'ABC123' },
      { orderId: 234567, code: 'DEF456' },
    ];

    it('should call correct endpoint with POST method', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.rejectBulk(validOrders);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/reject`,
        { orders: validOrders },
        { rateLimitKey: 'orders-dbs.rejectBulk' }
      );
    });

    it('should pass rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.rejectBulk([{ orderId: 123456, code: 'ABC123' }]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'orders-dbs.rejectBulk' })
      );
    });

    it('should return typed response with results', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.rejectBulk(validOrders);

      expect(result.requestId).toBe('req-101');
    });

    it('should throw ValidationError when orders array is empty', async () => {
      await expect(module.rejectBulk([])).rejects.toThrow(ValidationError);
      await expect(module.rejectBulk([])).rejects.toThrow('orders array cannot be empty');
    });

    it('should throw ValidationError when orders exceeds 1000 items', async () => {
      const orders = Array.from({ length: 1001 }, (_, i) => ({
        orderId: i + 1,
        code: `CODE${i}`,
      }));

      await expect(module.rejectBulk(orders)).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when orderId is not positive', async () => {
      await expect(module.rejectBulk([{ orderId: -1, code: 'ABC' }])).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError when code is empty', async () => {
      await expect(module.rejectBulk([{ orderId: 123456, code: '' }])).rejects.toThrow(
        ValidationError
      );
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(module.rejectBulk(validOrders)).rejects.toThrow(RateLimitError);
    });
  });

  // ==========================================================================
  // cancelBulk() Tests
  // ==========================================================================

  describe('cancelBulk()', () => {
    const mockResponse = {
      requestId: 'req-202',
      results: [{ orderId: 123456, success: true }],
    };

    it('should call correct endpoint with POST method', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.cancelBulk([123456, 234567]);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/marketplace/v3/dbs/orders/status/cancel`,
        { orders: [123456, 234567] },
        { rateLimitKey: 'orders-dbs.cancelBulk' }
      );
    });

    it('should pass rateLimitKey in options', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.cancelBulk([123456]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'orders-dbs.cancelBulk' })
      );
    });

    it('should return typed response with results', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.cancelBulk([123456]);

      expect(result.requestId).toBe('req-202');
      expect(result.results).toBeDefined();
    });

    it('should throw ValidationError when orderIds array is empty', async () => {
      await expect(module.cancelBulk([])).rejects.toThrow(ValidationError);
      await expect(module.cancelBulk([])).rejects.toThrow('orderIds array cannot be empty');
    });

    it('should throw ValidationError when orderIds exceeds 1000 items', async () => {
      const orderIds = Array.from({ length: 1001 }, (_, i) => i + 1);

      await expect(module.cancelBulk(orderIds)).rejects.toThrow(ValidationError);
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(module.cancelBulk([123456])).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(module.cancelBulk([123456])).rejects.toThrow(RateLimitError);
    });
  });
});
