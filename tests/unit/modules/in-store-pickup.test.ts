/**
 * Unit tests for InStorePickupModule
 *
 * Tests the InStorePickupModule class with mocked BaseClient to verify:
 * - Correct URL construction for the batch click-collect API (v3.17.0)
 * - The *Bulk batch methods POST to the correct batch URLs with the
 *   correct body + rateLimitKey
 * - The untouched read/client methods (getOrdersNew, createOrdersClient,
 *   createClientIdentity, getClickCollectOrders, checkMetaValidation,
 *   setCustomsDeclarationBulk) remain correct
 * - Error propagation for 401, 403, 400, 429, 409, and network errors
 *
 * @module tests/unit/modules/in-store-pickup
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InStorePickupModule } from '../../../src/modules/in-store-pickup';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';
import { WBAPIError } from '../../../src/errors/base-error';

const BASE_URL = 'https://marketplace-api.wildberries.ru';
const BATCH = `${BASE_URL}/api/marketplace/v3/click-collect`;

describe('InStorePickupModule', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: InStorePickupModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    module = new InStorePickupModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // Module Instantiation
  // ==========================================================================

  describe('module instantiation', () => {
    it('should create module instance with BaseClient', () => {
      expect(module).toBeInstanceOf(InStorePickupModule);
    });

    it('should expose all surviving methods', () => {
      // untouched read/client methods
      expect(typeof module.getOrdersNew).toBe('function');
      expect(typeof module.getClickCollectOrders).toBe('function');
      expect(typeof module.createOrdersClient).toBe('function');
      expect(typeof module.createClientIdentity).toBe('function');
      // batch methods
      expect(typeof module.confirmBulk).toBe('function');
      expect(typeof module.prepareBulk).toBe('function');
      expect(typeof module.receiveBulk).toBe('function');
      expect(typeof module.rejectBulk).toBe('function');
      expect(typeof module.cancelBulk).toBe('function');
      expect(typeof module.getStatusesBulk).toBe('function');
      expect(typeof module.getMetaBulk).toBe('function');
      expect(typeof module.deleteMetaBulk).toBe('function');
      expect(typeof module.setSgtinBulk).toBe('function');
      expect(typeof module.setUinBulk).toBe('function');
      expect(typeof module.setImeiBulk).toBe('function');
      expect(typeof module.setGtinBulk).toBe('function');
    });
  });

  // ==========================================================================
  // Untouched methods (read paths still using /api/v3/click-collect)
  // ==========================================================================

  describe('Untouched methods', () => {
    describe('getOrdersNew', () => {
      it('should fetch new pickup orders via GET', async () => {
        const mockResponse = { orders: [] };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await module.getOrdersNew();

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/new`,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrdersNew' })
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('createOrdersClient', () => {
      it('should fetch customer info via POST', async () => {
        const requestData = { orders: [12345] };
        const mockResponse = { orders: [] };
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await module.createOrdersClient(requestData);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/client`,
          requestData,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.postClickCollectOrdersClient' })
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('createClientIdentity', () => {
      it('should verify customer identity via POST', async () => {
        const requestData = { orderCode: '170046918-0011', passcode: '4567' };
        const mockResponse = { ok: true };
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await module.createClientIdentity(requestData);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/client/identity`,
          requestData,
          expect.objectContaining({
            rateLimitKey: 'in-store-pickup.postClickCollectOrdersClientIdentity',
          })
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('getClickCollectOrders', () => {
      it('should fetch orders with pagination parameters via GET', async () => {
        const mockResponse = { next: 54321, orders: [] };
        const params = { limit: 10, next: 0, dateFrom: 1706745600, dateTo: 1707350400 };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await module.getClickCollectOrders(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders`,
          expect.objectContaining({
            params,
            rateLimitKey: 'in-store-pickup.clickCollectOrders',
          })
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  // ==========================================================================
  // New *Bulk batch methods (task-147)
  // ==========================================================================

  describe('Bulk status setters', () => {
    const cases: {
      name: string;
      endpoint: string;
      key: string;
    }[] = [
      { name: 'confirmBulk', endpoint: 'status/confirm', key: 'in-store-pickup.confirmBulk' },
      { name: 'prepareBulk', endpoint: 'status/prepare', key: 'in-store-pickup.prepareBulk' },
      { name: 'receiveBulk', endpoint: 'status/receive', key: 'in-store-pickup.receiveBulk' },
      { name: 'rejectBulk', endpoint: 'status/reject', key: 'in-store-pickup.rejectBulk' },
      { name: 'cancelBulk', endpoint: 'status/cancel', key: 'in-store-pickup.cancelBulk' },
    ];

    for (const c of cases) {
      describe(c.name, () => {
        it(`should POST to ${c.endpoint} with {ordersIds} + rateLimitKey`, async () => {
          mockClient.post.mockResolvedValue({ requestId: 'r1', results: [] });
          await (module as unknown as Record<string, (ids: number[]) => unknown>)[c.name]([
            123456, 234567,
          ]);
          expect(mockClient.post).toHaveBeenCalledWith(
            `${BATCH}/orders/${c.endpoint}`,
            { ordersIds: [123456, 234567] },
            expect.objectContaining({ rateLimitKey: c.key })
          );
        });

        it('should throw ValidationError on empty array', async () => {
          await expect(
            (module as unknown as Record<string, (ids: number[]) => unknown>)[c.name]([])
          ).rejects.toThrow(ValidationError);
        });

        it('should throw ValidationError on >1000 items', async () => {
          const big = Array.from({ length: 1001 }, (_, i) => i);
          await expect(
            (module as unknown as Record<string, (ids: number[]) => unknown>)[c.name](big)
          ).rejects.toThrow(ValidationError);
        });
      });
    }
  });

  describe('getStatusesBulk', () => {
    it('should POST to status/info with {ordersIds} + rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      await module.getStatusesBulk([123456, 234567]);
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BATCH}/orders/status/info`,
        { ordersIds: [123456, 234567] },
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.getStatusesBulk' })
      );
    });

    it('should throw ValidationError on empty array', async () => {
      await expect(module.getStatusesBulk([])).rejects.toThrow(ValidationError);
    });
  });

  describe('getMetaBulk', () => {
    it('should POST to meta/details with request + rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ requestId: 'r1', orders: [] });
      await module.getMetaBulk({ ordersIds: [123456] });
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BATCH}/orders/meta/details`,
        { ordersIds: [123456] },
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.getMetaBulk' })
      );
    });

    it('should throw ValidationError on empty array', async () => {
      await expect(module.getMetaBulk({ ordersIds: [] })).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError on >1000 items', async () => {
      const big = Array.from({ length: 1001 }, (_, i) => i);
      await expect(module.getMetaBulk({ ordersIds: big })).rejects.toThrow(ValidationError);
    });
  });

  describe('deleteMetaBulk', () => {
    it('should POST to meta/delete with {key, ordersIds} + rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ requestId: 'r1', results: [] });
      await module.deleteMetaBulk({ key: 'imei', ordersIds: [123456] });
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BATCH}/orders/meta/delete`,
        { key: 'imei', ordersIds: [123456] },
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.deleteMetaBulk' })
      );
    });

    it('should accept all enum key values', async () => {
      mockClient.post.mockResolvedValue({ requestId: 'r1', results: [] });
      for (const key of ['imei', 'uin', 'gtin', 'sgtin', 'customsDeclaration'] as const) {
        await module.deleteMetaBulk({ key, ordersIds: [1] });
      }
      expect(mockClient.post).toHaveBeenCalledTimes(5);
    });
  });

  describe('Bulk meta setters', () => {
    const cases: {
      name: string;
      endpoint: string;
      key: string;
      body: unknown;
    }[] = [
      {
        name: 'setSgtinBulk',
        endpoint: 'meta/sgtin',
        key: 'in-store-pickup.setSgtinBulk',
        body: { orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }] },
      },
      {
        name: 'setUinBulk',
        endpoint: 'meta/uin',
        key: 'in-store-pickup.setUinBulk',
        body: { orders: [{ orderId: 123456, uin: '1234567890123456' }] },
      },
      {
        name: 'setImeiBulk',
        endpoint: 'meta/imei',
        key: 'in-store-pickup.setImeiBulk',
        body: { orders: [{ orderId: 123456, imei: '123456789012345' }] },
      },
      {
        name: 'setGtinBulk',
        endpoint: 'meta/gtin',
        key: 'in-store-pickup.setGtinBulk',
        body: { orders: [{ orderId: 123456, gtin: '1234567890123' }] },
      },
    ];

    for (const c of cases) {
      describe(c.name, () => {
        it(`should POST to ${c.endpoint} with body + rateLimitKey`, async () => {
          mockClient.post.mockResolvedValue({ requestId: 'r1', results: [] });
          await (module as unknown as Record<string, (req: unknown) => unknown>)[c.name](c.body);
          expect(mockClient.post).toHaveBeenCalledWith(
            `${BATCH}/orders/${c.endpoint}`,
            c.body,
            expect.objectContaining({ rateLimitKey: c.key })
          );
        });
      });
    }
  });

  // ==========================================================================
  // Bulk B2B marking validation + customs-declaration (task-158, unchanged)
  // ==========================================================================

  describe('Bulk B2B marking validation + customs-declaration (task-158)', () => {
    it('checkMetaValidation - POST meta/details with ordersIds + rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ requestId: 'req-1', orders: [] });
      await module.checkMetaValidation([123456, 234567]);
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BATCH}/orders/meta/details`,
        { ordersIds: [123456, 234567] },
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.checkMetaValidation' })
      );
    });

    it('checkMetaValidation - throws ValidationError on empty array', async () => {
      await expect(module.checkMetaValidation([])).rejects.toThrow(ValidationError);
    });

    it('checkMetaValidation - throws ValidationError on >1000 items', async () => {
      const big = Array.from({ length: 1001 }, (_, i) => i);
      await expect(module.checkMetaValidation(big)).rejects.toThrow(ValidationError);
    });

    it('setCustomsDeclarationBulk - POST with originCountryCode (string)', async () => {
      mockClient.post.mockResolvedValue({ requestId: 'req-2', results: [] });
      await module.setCustomsDeclarationBulk({
        orders: [
          {
            orderId: 123456,
            customsDeclaration: '10704010/010624/0000302',
            originCountryCode: '643',
          },
        ],
      });
      expect(mockClient.post).toHaveBeenCalledWith(
        `${BATCH}/orders/meta/customs-declaration`,
        {
          orders: [
            {
              orderId: 123456,
              customsDeclaration: '10704010/010624/0000302',
              originCountryCode: '643',
            },
          ],
        },
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.setCustomsDeclarationBulk' })
      );
    });
  });

  // ==========================================================================
  // Error Handling
  // ==========================================================================

  describe('Error Handling', () => {
    it('should propagate AuthenticationError on 401 response', async () => {
      const error = new AuthenticationError('Invalid API key', 401);
      mockClient.get.mockRejectedValue(error);
      await expect(module.getOrdersNew()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate ValidationError on 400 response', async () => {
      const error = new ValidationError('Bad request');
      mockClient.post.mockRejectedValue(error);
      await expect(module.confirmBulk([1])).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError on 429 response from a bulk setter', async () => {
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);
      await expect(module.confirmBulk([1])).rejects.toThrow(RateLimitError);
    });

    it('should propagate WBAPIError on 409 conflict for prepareBulk', async () => {
      const error = new WBAPIError('Conflict: invalid state transition', 409);
      mockClient.post.mockRejectedValue(error);
      await expect(module.prepareBulk([1])).rejects.toThrow(WBAPIError);
    });

    it('should propagate NetworkError on network timeout', async () => {
      const error = new NetworkError('Request timed out', true, undefined);
      mockClient.get.mockRejectedValue(error);
      await expect(module.getOrdersNew()).rejects.toThrow(NetworkError);
    });

    it('should propagate RateLimitError through receiveBulk', async () => {
      const error = new RateLimitError('Too many requests', 10000);
      mockClient.post.mockRejectedValue(error);
      await expect(module.receiveBulk([1])).rejects.toThrow(RateLimitError);
    });
  });
});
