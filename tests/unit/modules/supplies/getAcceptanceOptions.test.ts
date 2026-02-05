/**
 * TDD Unit tests for getAcceptanceOptions (createAcceptanceOption method)
 *
 * API: POST https://supplies-api.wildberries.ru/api/v1/acceptance/options
 * Rate limit: 6 req/min
 *
 * Tests acceptance options retrieval for FBW supplies
 *
 * @module tests/unit/modules/supplies/getAcceptanceOptions.test
 */

/* eslint-disable @typescript-eslint/no-deprecated */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OrdersFbwModule } from '../../../../src/modules/orders-fbw';
import type { BaseClient } from '../../../../src/client/base-client';
import type { ModelsGood, ModelsOptionsResultModel } from '../../../../src/types/orders-fbw.types';
import { AuthenticationError } from '../../../../src/errors/auth-error';
import { RateLimitError } from '../../../../src/errors/rate-limit-error';
import { ValidationError } from '../../../../src/errors/validation-error';

describe('getAcceptanceOptions (createAcceptanceOption)', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };
  let ordersFbw: OrdersFbwModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
    };
    ordersFbw = new OrdersFbwModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // SUCCESS SCENARIOS
  // ==========================================================================

  describe('Success Scenarios', () => {
    it('should fetch acceptance options for a single product (all warehouses)', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 10 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              {
                warehouseID: 507,
                canBox: true,
                canMonopallet: false,
                canSupersafe: false,
              },
              {
                warehouseID: 211622,
                canBox: false,
                canMonopallet: true,
                canSupersafe: false,
              },
            ],
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        goods,
        { params: undefined, rateLimitKey: 'orders-fbw.postAcceptanceOptions' }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch acceptance options for a single product with specific warehouseID', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 10 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              {
                warehouseID: 507,
                canBox: true,
                canMonopallet: true,
                canSupersafe: false,
              },
            ],
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods, { warehouseID: '507' });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        goods,
        { params: { warehouseID: '507' }, rateLimitKey: 'orders-fbw.postAcceptanceOptions' }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch acceptance options for multiple products (up to 5000)', async () => {
      const goods: ModelsGood[] = [
        { barcode: '1234567891234', quantity: 100 },
        { barcode: '9876543210987', quantity: 50 },
        { barcode: '5555555555555', quantity: 200 },
      ];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              { warehouseID: 507, canBox: true, canMonopallet: false, canSupersafe: false },
            ],
          },
          {
            barcode: '9876543210987',
            warehouses: [
              { warehouseID: 507, canBox: true, canMonopallet: true, canSupersafe: false },
            ],
          },
          {
            barcode: '5555555555555',
            warehouses: [
              { warehouseID: 211622, canBox: false, canMonopallet: true, canSupersafe: true },
            ],
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        goods,
        { params: undefined, rateLimitKey: 'orders-fbw.postAcceptanceOptions' }
      );
      expect(result.result).toHaveLength(3);
    });
  });

  // ==========================================================================
  // RESPONSE STRUCTURE VALIDATION
  // ==========================================================================

  describe('Response Structure Validation', () => {
    it('should return correct response structure with all fields', async () => {
      const goods: ModelsGood[] = [{ barcode: '123456789', quantity: 5 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '123456789',
            warehouses: [
              {
                warehouseID: 205349,
                canBox: true,
                canMonopallet: false,
                canSupersafe: false,
              },
              {
                warehouseID: 211622,
                canBox: false,
                canMonopallet: true,
                canSupersafe: false,
              },
            ],
          },
        ],
        requestId: 'kr53d2bRKYmkK2N6zaNKHs',
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      // Validate result array
      expect(result.result).toBeDefined();
      expect(Array.isArray(result.result)).toBe(true);

      // Validate first item structure
      const firstItem = result.result![0];
      expect(firstItem.barcode).toBe('123456789');
      expect(firstItem.warehouses).toBeDefined();
      expect(Array.isArray(firstItem.warehouses)).toBe(true);

      // Validate warehouse structure
      const warehouse = firstItem.warehouses![0];
      expect(typeof warehouse.warehouseID).toBe('number');
      expect(typeof warehouse.canBox).toBe('boolean');
      expect(typeof warehouse.canMonopallet).toBe('boolean');
      expect(typeof warehouse.canSupersafe).toBe('boolean');
    });

    it('should handle response with isError field when product has error', async () => {
      const goods: ModelsGood[] = [{ barcode: 'invalid-barcode', quantity: 10 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: 'invalid-barcode',
            warehouses: undefined,
            error: {
              title: 'barcode validation error',
              detail: 'barcode invalid-barcode is not found',
            },
            isError: true,
          },
        ],
        requestId: 'test-request-id',
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      const errorItem = result.result![0];
      expect(errorItem.isError).toBe(true);
      expect(errorItem.error).toBeDefined();
      expect(errorItem.error?.title).toBe('barcode validation error');
      expect(errorItem.error?.detail).toContain('is not found');
      expect(errorItem.warehouses).toBeUndefined();
    });

    it('should handle requestId in response', async () => {
      const goods: ModelsGood[] = [{ barcode: '123456789', quantity: 1 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [{ barcode: '123456789', warehouses: [] }],
        requestId: 'unique-request-id-12345',
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(result.requestId).toBe('unique-request-id-12345');
    });
  });

  // ==========================================================================
  // INPUT VALIDATION SCENARIOS
  // ==========================================================================

  describe('Input Validation', () => {
    it('should handle empty goods array', async () => {
      const goods: ModelsGood[] = [];

      const mockResponse: ModelsOptionsResultModel = {
        result: [],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        [],
        { params: undefined, rateLimitKey: 'orders-fbw.postAcceptanceOptions' }
      );
      expect(result.result).toEqual([]);
    });

    it('should reject quantity less than 1', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 0 }];

      const error = new ValidationError(
        'Validation failed: quantity must be at least 1',
        { quantity: 'must be >= 1' },
        400
      );
      mockClient.post.mockRejectedValue(error);

      await expect(ordersFbw.createAcceptanceOption(goods)).rejects.toThrow(ValidationError);
      await expect(ordersFbw.createAcceptanceOption(goods)).rejects.toThrow(
        'quantity must be at least 1'
      );
    });

    it('should reject quantity greater than 999999', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 1000000 }];

      const error = new ValidationError(
        'Validation failed: quantity exceeds maximum (999999)',
        { quantity: 'must be <= 999999' },
        400
      );
      mockClient.post.mockRejectedValue(error);

      await expect(ordersFbw.createAcceptanceOption(goods)).rejects.toThrow(ValidationError);
    });

    it('should reject invalid barcode format', async () => {
      const goods: ModelsGood[] = [{ barcode: '', quantity: 10 }];

      const error = new ValidationError(
        'Validation failed: barcode is required',
        { barcode: 'is required' },
        400
      );
      mockClient.post.mockRejectedValue(error);

      await expect(ordersFbw.createAcceptanceOption(goods)).rejects.toThrow(ValidationError);
    });

    it('should reject more than 5000 items (API limit)', async () => {
      // Create array with 5001 items
      const goods: ModelsGood[] = Array.from({ length: 5001 }, (_, i) => ({
        barcode: `barcode-${i}`,
        quantity: 1,
      }));

      const error = new ValidationError(
        'Validation failed: maximum 5000 items allowed',
        { items: 'exceeds maximum of 5000' },
        400
      );
      mockClient.post.mockRejectedValue(error);

      await expect(ordersFbw.createAcceptanceOption(goods)).rejects.toThrow(ValidationError);
    });
  });

  // ==========================================================================
  // ERROR HANDLING IN RESPONSE
  // ==========================================================================

  describe('Error Handling in Response', () => {
    it('should handle product not found error (isError: true)', async () => {
      const goods: ModelsGood[] = [{ barcode: 'кrrr', quantity: 1 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: 'кrrr',
            warehouses: undefined,
            error: {
              title: 'barcode validation error',
              detail: 'barcode кrrr is not found',
            },
            isError: true,
          },
        ],
        requestId: 'error-request-id',
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(result.result![0].isError).toBe(true);
      expect(result.result![0].error?.title).toBe('barcode validation error');
      expect(result.result![0].warehouses).toBeUndefined();
    });

    it('should handle partial success (some items with errors)', async () => {
      const goods: ModelsGood[] = [
        { barcode: '1234567891234', quantity: 10 },
        { barcode: 'invalid-item', quantity: 5 },
        { barcode: '9876543210987', quantity: 20 },
      ];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              { warehouseID: 507, canBox: true, canMonopallet: false, canSupersafe: false },
            ],
          },
          {
            barcode: 'invalid-item',
            warehouses: undefined,
            error: {
              title: 'barcode validation error',
              detail: 'barcode invalid-item is not found',
            },
            isError: true,
          },
          {
            barcode: '9876543210987',
            warehouses: [
              { warehouseID: 211622, canBox: true, canMonopallet: true, canSupersafe: false },
            ],
          },
        ],
        requestId: 'partial-success-request',
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      // First item - success
      expect(result.result![0].isError).toBeUndefined();
      expect(result.result![0].warehouses).toBeDefined();

      // Second item - error
      expect(result.result![1].isError).toBe(true);
      expect(result.result![1].error).toBeDefined();
      expect(result.result![1].warehouses).toBeUndefined();

      // Third item - success
      expect(result.result![2].isError).toBeUndefined();
      expect(result.result![2].warehouses).toBeDefined();
    });

    it('should handle all items with errors', async () => {
      const goods: ModelsGood[] = [
        { barcode: 'bad1', quantity: 1 },
        { barcode: 'bad2', quantity: 1 },
      ];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: 'bad1',
            warehouses: undefined,
            error: { title: 'error', detail: 'not found' },
            isError: true,
          },
          {
            barcode: 'bad2',
            warehouses: undefined,
            error: { title: 'error', detail: 'not found' },
            isError: true,
          },
        ],
        requestId: 'all-errors-request',
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(result.result!.every((item) => item.isError === true)).toBe(true);
      expect(result.result!.every((item) => !item.warehouses)).toBe(true);
    });
  });

  // ==========================================================================
  // HTTP ERROR SCENARIOS
  // ==========================================================================

  describe('HTTP Errors', () => {
    it('should handle 400 Bad Request', async () => {
      const goods: ModelsGood[] = [{ barcode: '123', quantity: 1 }];

      const error = new ValidationError('Неверный формат warehouseID', undefined, 400, {
        status: 400,
        title: 'bad request',
        detail: 'Неверный формат warehouseID',
        requestId: 'a6bdc2a4d2fde51c2036fa8af2483886',
        origin: 'supply-api',
      });
      mockClient.post.mockRejectedValue(error);

      await expect(
        ordersFbw.createAcceptanceOption(goods, { warehouseID: 'invalid' })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle 401 Unauthorized', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 10 }];

      const error = new AuthenticationError('token problem; token is malformed', 401, {
        title: 'unauthorized',
        detail: 'token problem; token is malformed',
        status: 401,
        statusText: 'Unauthorized',
      });
      mockClient.post.mockRejectedValue(error);

      await expect(ordersFbw.createAcceptanceOption(goods)).rejects.toThrow(AuthenticationError);
      await expect(ordersFbw.createAcceptanceOption(goods)).rejects.toThrow('token problem');
    });

    it('should handle 429 Rate Limit with retryAfter', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 10 }];

      const error = new RateLimitError('Rate limit exceeded', 10000);
      mockClient.post.mockRejectedValue(error);

      try {
        await ordersFbw.createAcceptanceOption(goods);
        expect.fail('Should have thrown RateLimitError');
      } catch (err) {
        expect(err).toBeInstanceOf(RateLimitError);
        if (err instanceof RateLimitError) {
          expect(err.retryAfter).toBe(10000);
        }
      }
    });
  });

  // ==========================================================================
  // RATE LIMIT COMPLIANCE
  // ==========================================================================

  describe('Rate Limit Compliance', () => {
    it('should correctly call API endpoint (rate limit: 6 req/min, 10s interval)', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 10 }];
      mockClient.post.mockResolvedValue({ result: [] });

      await ordersFbw.createAcceptanceOption(goods);

      // Verify the correct endpoint is called
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        goods,
        { params: undefined, rateLimitKey: 'orders-fbw.postAcceptanceOptions' }
      );
    });
  });

  // ==========================================================================
  // EDGE CASES
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle maximum valid quantity (999999)', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 999999 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              { warehouseID: 507, canBox: true, canMonopallet: true, canSupersafe: false },
            ],
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(result.result![0].warehouses).toBeDefined();
    });

    it('should handle minimum valid quantity (1)', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 1 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              { warehouseID: 507, canBox: true, canMonopallet: false, canSupersafe: false },
            ],
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(result.result![0].warehouses).toBeDefined();
    });

    it('should handle warehouse with all packaging types available', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 100 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              {
                warehouseID: 507,
                canBox: true,
                canMonopallet: true,
                canSupersafe: true,
              },
            ],
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      const warehouse = result.result![0].warehouses![0];
      expect(warehouse.canBox).toBe(true);
      expect(warehouse.canMonopallet).toBe(true);
      expect(warehouse.canSupersafe).toBe(true);
    });

    it('should handle warehouse with no packaging types available', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 100 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              {
                warehouseID: 507,
                canBox: false,
                canMonopallet: false,
                canSupersafe: false,
              },
            ],
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      const warehouse = result.result![0].warehouses![0];
      expect(warehouse.canBox).toBe(false);
      expect(warehouse.canMonopallet).toBe(false);
      expect(warehouse.canSupersafe).toBe(false);
    });

    it('should handle empty warehouses array (product found but no warehouses available)', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 10 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [],
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(result.result![0].warehouses).toEqual([]);
      expect(result.result![0].isError).toBeUndefined();
    });

    it('should handle Cyrillic characters in barcode', async () => {
      const goods: ModelsGood[] = [{ barcode: 'кррр', quantity: 1 }];

      const mockResponse: ModelsOptionsResultModel = {
        result: [
          {
            barcode: 'кррр',
            warehouses: undefined,
            error: { title: 'barcode validation error', detail: 'barcode кррр is not found' },
            isError: true,
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(result.result![0].barcode).toBe('кррр');
      expect(result.result![0].isError).toBe(true);
    });
  });
});
