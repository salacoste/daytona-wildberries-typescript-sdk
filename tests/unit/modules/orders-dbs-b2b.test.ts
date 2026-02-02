/**
 * Unit tests for OrdersDbsModule - B2B Support (Story 12.4)
 *
 * TDD tests for the getB2BInfo method that retrieves B2B buyer information
 * for DBS orders. Tests are written FIRST before implementation.
 *
 * Test Categories:
 * 1. Success Scenarios - Valid B2B order retrieval
 * 2. Partial Error Scenarios - Mix of B2B and B2C orders
 * 3. Input Validation - Array size and content validation
 * 4. API Contract - URL, method, body, rate limit verification
 * 5. Error Propagation - Authentication, rate limit, network errors
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
import type { GetB2BInfoResponse } from '../../../src/types/orders-dbs.types';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

describe('OrdersDbsModule - B2B Support (Story 12.4)', () => {
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
  // getB2BInfo() Tests
  // ==========================================================================

  describe('getB2BInfo()', () => {
    // ========================================================================
    // Success Scenarios
    // ========================================================================

    describe('success scenarios', () => {
      const mockB2BSuccessResponse: GetB2BInfoResponse = {
        requestId: 'req-uuid-12345',
        results: [
          {
            orderId: 123456,
            isError: false,
            data: {
              orgName: 'OOO Romashka',
              inn: '7707083893',
              kpp: '773601001',
            },
          },
        ],
      };

      it('should fetch B2B info for valid order IDs', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockB2BSuccessResponse);
        const orderIds = [123456];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(result).toEqual(mockB2BSuccessResponse);
        expect(result.results).toBeDefined();
        expect(result.results).toHaveLength(1);
      });

      it('should return successful response with all B2B fields populated', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockB2BSuccessResponse);
        const orderIds = [123456];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        const b2bResult = result.results?.[0];
        expect(b2bResult?.orderId).toBe(123456);
        expect(b2bResult?.isError).toBe(false);
        expect(b2bResult?.data).toBeDefined();
        expect(b2bResult?.data?.orgName).toBe('OOO Romashka');
        expect(b2bResult?.data?.inn).toBe('7707083893');
        expect(b2bResult?.data?.kpp).toBe('773601001');
      });

      it('should return requestId for tracking purposes', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockB2BSuccessResponse);
        const orderIds = [123456];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(result.requestId).toBe('req-uuid-12345');
        expect(typeof result.requestId).toBe('string');
      });

      it('should handle successful response with empty KPP (valid for Individual Entrepreneurs)', async () => {
        // Arrange - Individual Entrepreneur (IP) has no KPP
        const ipResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-67890',
          results: [
            {
              orderId: 234567,
              isError: false,
              data: {
                orgName: 'IP Ivanov Ivan Ivanovich',
                inn: '123456789012', // 12-digit INN for IP
                kpp: '', // Empty KPP is valid for Individual Entrepreneurs
              },
            },
          ],
        };
        mockClient.post.mockResolvedValue(ipResponse);
        const orderIds = [234567];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        const b2bResult = result.results?.[0];
        expect(b2bResult?.isError).toBe(false);
        expect(b2bResult?.data?.kpp).toBe('');
        expect(b2bResult?.data?.inn).toHaveLength(12); // IP has 12-digit INN
      });

      it('should handle 10-digit INN for legal entities', async () => {
        // Arrange - Legal entity has 10-digit INN
        const legalEntityResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-11111',
          results: [
            {
              orderId: 111111,
              isError: false,
              data: {
                orgName: 'OOO Test Company',
                inn: '7707083893', // 10-digit INN for legal entities
                kpp: '773601001',
              },
            },
          ],
        };
        mockClient.post.mockResolvedValue(legalEntityResponse);
        const orderIds = [111111];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        const b2bResult = result.results?.[0];
        expect(b2bResult?.data?.inn).toHaveLength(10);
      });

      it('should handle multiple orders in one request', async () => {
        // Arrange
        const multipleOrdersResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-multi',
          results: [
            {
              orderId: 111111,
              isError: false,
              data: {
                orgName: 'OOO First Company',
                inn: '1234567890',
                kpp: '123456789',
              },
            },
            {
              orderId: 222222,
              isError: false,
              data: {
                orgName: 'OOO Second Company',
                inn: '0987654321',
                kpp: '987654321',
              },
            },
            {
              orderId: 333333,
              isError: false,
              data: {
                orgName: 'IP Third Person',
                inn: '123456789012',
                kpp: '',
              },
            },
          ],
        };
        mockClient.post.mockResolvedValue(multipleOrdersResponse);
        const orderIds = [111111, 222222, 333333];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(result.results).toHaveLength(3);
        expect(result.results?.[0].orderId).toBe(111111);
        expect(result.results?.[1].orderId).toBe(222222);
        expect(result.results?.[2].orderId).toBe(333333);
      });
    });

    // ========================================================================
    // Partial Error Scenarios
    // ========================================================================

    describe('partial error scenarios', () => {
      it('should handle mix of B2B orders (success) and B2C orders (isError: true, 404)', async () => {
        // Arrange - Mix of B2B (success) and B2C (error) orders
        const mixedResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-mixed',
          results: [
            {
              orderId: 111111, // B2B order - success
              isError: false,
              data: {
                orgName: 'OOO B2B Company',
                inn: '1234567890',
                kpp: '123456789',
              },
            },
            {
              orderId: 222222, // B2C order - error
              isError: true,
              errors: [
                {
                  code: 404,
                  detail: 'Заказ не является B2B заказом',
                },
              ],
            },
          ],
        };
        mockClient.post.mockResolvedValue(mixedResponse);
        const orderIds = [111111, 222222];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(result.results).toHaveLength(2);

        // B2B order should be successful
        const b2bOrder = result.results?.[0];
        expect(b2bOrder?.orderId).toBe(111111);
        expect(b2bOrder?.isError).toBe(false);
        expect(b2bOrder?.data).toBeDefined();
        expect(b2bOrder?.errors).toBeUndefined();

        // B2C order should have error
        const b2cOrder = result.results?.[1];
        expect(b2cOrder?.orderId).toBe(222222);
        expect(b2cOrder?.isError).toBe(true);
        expect(b2cOrder?.data).toBeUndefined();
        expect(b2cOrder?.errors).toBeDefined();
        expect(b2cOrder?.errors?.[0].code).toBe(404);
      });

      it('should handle all orders being B2C (all return errors)', async () => {
        // Arrange - All orders are B2C
        const allB2CResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-all-b2c',
          results: [
            {
              orderId: 111111,
              isError: true,
              errors: [
                {
                  code: 404,
                  detail: 'Заказ не является B2B заказом',
                },
              ],
            },
            {
              orderId: 222222,
              isError: true,
              errors: [
                {
                  code: 404,
                  detail: 'Заказ не является B2B заказом',
                },
              ],
            },
          ],
        };
        mockClient.post.mockResolvedValue(allB2CResponse);
        const orderIds = [111111, 222222];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(result.results).toHaveLength(2);
        expect(result.results?.every((r) => r.isError === true)).toBe(true);
        expect(result.results?.every((r) => r.data === undefined)).toBe(true);
        expect(result.results?.every((r) => r.errors !== undefined)).toBe(true);
      });

      it('should return error details with code and detail fields', async () => {
        // Arrange
        const errorResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-error',
          results: [
            {
              orderId: 999999,
              isError: true,
              errors: [
                {
                  code: 404,
                  detail: 'Заказ не найден',
                },
              ],
            },
          ],
        };
        mockClient.post.mockResolvedValue(errorResponse);
        const orderIds = [999999];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        const errorResult = result.results?.[0];
        expect(errorResult?.errors).toHaveLength(1);
        expect(errorResult?.errors?.[0].code).toBe(404);
        expect(errorResult?.errors?.[0].detail).toBe('Заказ не найден');
      });
    });

    // ========================================================================
    // Input Validation
    // ========================================================================

    describe('input validation', () => {
      it('should throw ValidationError when orderIds array is empty', async () => {
        // Arrange
        const emptyOrderIds: number[] = [];

        // Act & Assert
        await expect(ordersDbsModule.getB2BInfo(emptyOrderIds)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getB2BInfo(emptyOrderIds)).rejects.toThrow(
          'orderIds array cannot be empty'
        );
      });

      it('should throw ValidationError when array exceeds 1000 items', async () => {
        // Arrange - Create array with 1001 items
        const tooManyOrderIds = Array.from({ length: 1001 }, (_, i) => i + 1);

        // Act & Assert
        await expect(ordersDbsModule.getB2BInfo(tooManyOrderIds)).rejects.toThrow(ValidationError);
        await expect(ordersDbsModule.getB2BInfo(tooManyOrderIds)).rejects.toThrow(
          'orderIds array cannot exceed 1000 items'
        );
      });

      it('should accept exactly 1000 items (boundary test)', async () => {
        // Arrange
        const maxOrderIds = Array.from({ length: 1000 }, (_, i) => i + 1);
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-max',
          results: maxOrderIds.map((id) => ({
            orderId: id,
            isError: false,
            data: {
              orgName: `Company ${id}`,
              inn: '1234567890',
              kpp: '123456789',
            },
          })),
        };
        mockClient.post.mockResolvedValue(mockResponse);

        // Act
        const result = await ordersDbsModule.getB2BInfo(maxOrderIds);

        // Assert
        expect(result).toBeDefined();
        expect(mockClient.post).toHaveBeenCalled();
      });

      it('should accept single item array (boundary test)', async () => {
        // Arrange
        const singleOrderId = [123456];
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-single',
          results: [
            {
              orderId: 123456,
              isError: false,
              data: {
                orgName: 'OOO Single',
                inn: '1234567890',
                kpp: '123456789',
              },
            },
          ],
        };
        mockClient.post.mockResolvedValue(mockResponse);

        // Act
        const result = await ordersDbsModule.getB2BInfo(singleOrderId);

        // Assert
        expect(result).toBeDefined();
        expect(result.results).toHaveLength(1);
        expect(mockClient.post).toHaveBeenCalled();
      });

      it('should accept 999 items (just under maximum)', async () => {
        // Arrange
        const orderIds = Array.from({ length: 999 }, (_, i) => i + 1);
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-999',
          results: [],
        };
        mockClient.post.mockResolvedValue(mockResponse);

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(result).toBeDefined();
        expect(mockClient.post).toHaveBeenCalled();
      });
    });

    // ========================================================================
    // API Contract Verification
    // ========================================================================

    describe('API contract', () => {
      it('should call BaseClient.post with correct URL', async () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-url',
          results: [],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [123456];

        // Act
        await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/dbs/orders/b2b/info`,
          expect.any(Object),
          expect.any(Object)
        );
      });

      it('should use HTTP POST method (not GET)', async () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-method',
          results: [],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [123456];

        // Act
        await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(mockClient.post).toHaveBeenCalledTimes(1);
        expect(mockClient.get).not.toHaveBeenCalled();
      });

      it('should send correct request body with ordersIds field', async () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-body',
          results: [],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [123456, 234567, 345678];

        // Act
        await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          { ordersIds: [123456, 234567, 345678] },
          expect.any(Object)
        );
      });

      it('should include correct rate limit key', async () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-ratelimit',
          results: [],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [123456];

        // Act
        await ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object), {
          rateLimitKey: 'orders-dbs.getB2BInfo',
        });
      });

      it('should call BaseClient.post with all correct parameters combined', async () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-combined',
          results: [],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [111111, 222222];

        // Act
        await ordersDbsModule.getB2BInfo(orderIds);

        // Assert - Verify complete call signature
        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/dbs/orders/b2b/info`,
          { ordersIds: [111111, 222222] },
          { rateLimitKey: 'orders-dbs.getB2BInfo' }
        );
      });
    });

    // ========================================================================
    // Error Propagation
    // ========================================================================

    describe('error propagation', () => {
      it('should propagate AuthenticationError (401) from BaseClient', async () => {
        // Arrange
        const error = new AuthenticationError('Invalid API key');
        mockClient.post.mockRejectedValue(error);
        const orderIds = [123456];

        // Act & Assert
        await expect(ordersDbsModule.getB2BInfo(orderIds)).rejects.toThrow(AuthenticationError);
        await expect(ordersDbsModule.getB2BInfo(orderIds)).rejects.toThrow('Invalid API key');
      });

      it('should propagate AuthenticationError (403) for forbidden access', async () => {
        // Arrange
        const error = new AuthenticationError('Access forbidden');
        mockClient.post.mockRejectedValue(error);
        const orderIds = [123456];

        // Act & Assert
        await expect(ordersDbsModule.getB2BInfo(orderIds)).rejects.toThrow(AuthenticationError);
      });

      it('should propagate RateLimitError (429) from BaseClient', async () => {
        // Arrange
        const error = new RateLimitError('Rate limit exceeded', 5000);
        mockClient.post.mockRejectedValue(error);
        const orderIds = [123456];

        // Act & Assert
        await expect(ordersDbsModule.getB2BInfo(orderIds)).rejects.toThrow(RateLimitError);
        await expect(ordersDbsModule.getB2BInfo(orderIds)).rejects.toThrow('Rate limit exceeded');
      });

      it('should propagate RateLimitError with retryAfter value', async () => {
        // Arrange
        const error = new RateLimitError('Too many requests', 10000);
        mockClient.post.mockRejectedValue(error);
        const orderIds = [123456];

        // Act & Assert
        try {
          await ordersDbsModule.getB2BInfo(orderIds);
          expect.fail('Should have thrown RateLimitError');
        } catch (e) {
          expect(e).toBeInstanceOf(RateLimitError);
          expect((e as RateLimitError).retryAfter).toBe(10000);
        }
      });

      it('should propagate NetworkError from BaseClient', async () => {
        // Arrange
        const error = new NetworkError('Network request failed', false, 500);
        mockClient.post.mockRejectedValue(error);
        const orderIds = [123456];

        // Act & Assert
        await expect(ordersDbsModule.getB2BInfo(orderIds)).rejects.toThrow(NetworkError);
        await expect(ordersDbsModule.getB2BInfo(orderIds)).rejects.toThrow(
          'Network request failed'
        );
      });

      it('should propagate NetworkError with isTimeout flag', async () => {
        // Arrange
        const error = new NetworkError('Request timeout', true, undefined);
        mockClient.post.mockRejectedValue(error);
        const orderIds = [123456];

        // Act & Assert
        try {
          await ordersDbsModule.getB2BInfo(orderIds);
          expect.fail('Should have thrown NetworkError');
        } catch (e) {
          expect(e).toBeInstanceOf(NetworkError);
          expect((e as NetworkError).isTimeout).toBe(true);
        }
      });

      it('should propagate generic Error from BaseClient', async () => {
        // Arrange
        const error = new Error('Unexpected error');
        mockClient.post.mockRejectedValue(error);
        const orderIds = [123456];

        // Act & Assert
        await expect(ordersDbsModule.getB2BInfo(orderIds)).rejects.toThrow('Unexpected error');
      });
    });

    // ========================================================================
    // Method Existence
    // ========================================================================

    describe('method existence', () => {
      it('should expose getB2BInfo method on OrdersDbsModule', () => {
        // Assert
        expect(typeof ordersDbsModule.getB2BInfo).toBe('function');
      });

      it('should return a Promise', () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid',
          results: [],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [123456];

        // Act
        const result = ordersDbsModule.getB2BInfo(orderIds);

        // Assert
        expect(result).toBeInstanceOf(Promise);
      });
    });

    // ========================================================================
    // Response Type Verification
    // ========================================================================

    describe('response type verification', () => {
      it('should return GetB2BInfoResponse type with requestId and results', async () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-type',
          results: [
            {
              orderId: 123456,
              isError: false,
              data: {
                orgName: 'Test',
                inn: '1234567890',
                kpp: '123456789',
              },
            },
          ],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [123456];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert - Verify structure matches GetB2BInfoResponse
        expect(result).toHaveProperty('requestId');
        expect(result).toHaveProperty('results');
        expect(Array.isArray(result.results)).toBe(true);
      });

      it('should return results array with B2BInfoResult structure', async () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-structure',
          results: [
            {
              orderId: 123456,
              isError: false,
              data: {
                orgName: 'OOO Structure Test',
                inn: '1234567890',
                kpp: '123456789',
              },
            },
          ],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [123456];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert - Verify B2BInfoResult structure
        const item = result.results?.[0];
        expect(item).toHaveProperty('orderId');
        expect(item).toHaveProperty('isError');
        expect(item).toHaveProperty('data');
        expect(item?.data).toHaveProperty('orgName');
        expect(item?.data).toHaveProperty('inn');
        expect(item?.data).toHaveProperty('kpp');
      });

      it('should return error structure when order has isError: true', async () => {
        // Arrange
        const mockResponse: GetB2BInfoResponse = {
          requestId: 'req-uuid-error-structure',
          results: [
            {
              orderId: 123456,
              isError: true,
              errors: [
                {
                  code: 404,
                  detail: 'Not a B2B order',
                },
              ],
            },
          ],
        };
        mockClient.post.mockResolvedValue(mockResponse);
        const orderIds = [123456];

        // Act
        const result = await ordersDbsModule.getB2BInfo(orderIds);

        // Assert - Verify error structure
        const item = result.results?.[0];
        expect(item).toHaveProperty('orderId');
        expect(item).toHaveProperty('isError');
        expect(item).toHaveProperty('errors');
        expect(item?.errors?.[0]).toHaveProperty('code');
        expect(item?.errors?.[0]).toHaveProperty('detail');
      });
    });
  });
});
