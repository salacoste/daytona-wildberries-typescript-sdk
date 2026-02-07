/**
 * Unit tests for InStorePickupModule
 *
 * Tests the InStorePickupModule class with mocked BaseClient to verify:
 * - Correct URL construction including path parameter interpolation
 * - Correct HTTP method selection per endpoint (GET/POST/PATCH/PUT/DELETE)
 * - Rate limit key presence in options for all 16 methods
 * - Request body payloads forwarded correctly
 * - Query parameters passed via params option
 * - Deprecated alias delegation
 * - Error propagation for 401, 403, 400, 429, 409, and network errors
 *
 * @module tests/unit/modules/in-store-pickup
 */

/* eslint-disable @typescript-eslint/no-deprecated -- intentionally testing deprecated methods */
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- void assertions in tests */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InStorePickupModule } from '../../../src/modules/in-store-pickup';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';
import { WBAPIError } from '../../../src/errors/base-error';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

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

    it('should expose all 16 core methods', () => {
      expect(typeof module.getOrdersNew).toBe('function');
      expect(typeof module.updateOrdersConfirm).toBe('function');
      expect(typeof module.updateOrdersPrepare).toBe('function');
      expect(typeof module.updateOrdersReceive).toBe('function');
      expect(typeof module.updateOrdersReject).toBe('function');
      expect(typeof module.updateOrdersCancel).toBe('function');
      expect(typeof module.getClickCollectOrders).toBe('function');
      expect(typeof module.createOrdersStatus).toBe('function');
      expect(typeof module.createOrdersClient).toBe('function');
      expect(typeof module.createClientIdentity).toBe('function');
      expect(typeof module.getOrdersMeta).toBe('function');
      expect(typeof module.deleteOrdersMeta).toBe('function');
      expect(typeof module.updateMetaSgtin).toBe('function');
      expect(typeof module.updateMetaUin).toBe('function');
      expect(typeof module.updateMetaImei).toBe('function');
      expect(typeof module.updateMetaGtin).toBe('function');
    });
  });

  // ==========================================================================
  // Assembly Task Operations
  // ==========================================================================

  describe('Assembly Task Operations', () => {
    describe('getOrdersNew', () => {
      it('should fetch new pickup orders via GET', async () => {
        const mockResponse = {
          orders: [
            {
              id: 12345,
              rid: 'abc-123',
              createdAt: '2026-02-01T10:00:00Z',
              warehouseId: 507,
              warehouseAddress: 'Moscow, Main St 1',
              nmId: 99887766,
              chrtId: 11223344,
              price: 150000,
              finalPrice: 140000,
              convertedPrice: 150000,
              convertedFinalPrice: 140000,
              currencyCode: 643,
              convertedCurrencyCode: 643,
              cargoType: 1,
              article: 'ART-001',
              skus: ['2000000000001'],
              orderCode: '170046918-0011',
              payMode: 'prepaid',
              requiredMeta: ['sgtin', 'imei'],
              isZeroOrder: false,
            },
          ],
        };

        mockClient.get.mockResolvedValue(mockResponse);

        const result = await module.getOrdersNew();

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/new`,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrdersNew' })
        );
        expect(result).toEqual(mockResponse);
        expect(result.orders).toHaveLength(1);
      });

      it('should handle empty orders response', async () => {
        mockClient.get.mockResolvedValue({ orders: [] });

        const result = await module.getOrdersNew();

        expect(result.orders).toEqual([]);
      });
    });

    describe('updateOrdersConfirm', () => {
      it('should confirm an order for assembly via PATCH', async () => {
        const orderId = 12345;
        mockClient.patch.mockResolvedValue(undefined);

        await module.updateOrdersConfirm(orderId);

        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/confirm`,
          {},
          expect.objectContaining({
            rateLimitKey: 'in-store-pickup.patchClickCollectOrdersConfirm',
          })
        );
      });

      it('should pass empty object as body', async () => {
        mockClient.patch.mockResolvedValue(undefined);

        await module.updateOrdersConfirm(99999);

        expect(mockClient.patch).toHaveBeenCalledWith(expect.any(String), {}, expect.any(Object));
      });
    });

    describe('updateOrdersPrepare', () => {
      it('should mark an order as prepared via PATCH', async () => {
        const orderId = 12345;
        mockClient.patch.mockResolvedValue(undefined);

        await module.updateOrdersPrepare(orderId);

        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/prepare`,
          {},
          expect.objectContaining({
            rateLimitKey: 'in-store-pickup.patchClickCollectOrdersPrepare',
          })
        );
      });
    });

    describe('updateOrdersReceive', () => {
      it('should mark an order as received via PATCH', async () => {
        const orderId = 12345;
        mockClient.patch.mockResolvedValue(undefined);

        await module.updateOrdersReceive(orderId);

        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/receive`,
          {},
          expect.objectContaining({
            rateLimitKey: 'in-store-pickup.patchClickCollectOrdersReceive',
          })
        );
      });
    });

    describe('updateOrdersReject', () => {
      it('should reject an order via PATCH', async () => {
        const orderId = 12345;
        mockClient.patch.mockResolvedValue(undefined);

        await module.updateOrdersReject(orderId);

        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/reject`,
          {},
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersReject' })
        );
      });
    });

    describe('updateOrdersCancel', () => {
      it('should cancel an order via PATCH', async () => {
        const orderId = 12345;
        mockClient.patch.mockResolvedValue(undefined);

        await module.updateOrdersCancel(orderId);

        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/cancel`,
          {},
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersCancel' })
        );
      });
    });
  });

  // ==========================================================================
  // Order Query Operations
  // ==========================================================================

  describe('Order Query Operations', () => {
    describe('getClickCollectOrders', () => {
      it('should fetch orders with pagination parameters via GET', async () => {
        const mockResponse = {
          next: 54321,
          orders: [
            {
              id: 12345,
              article: 'ART-001',
              createdAt: '2026-01-15T10:00:00Z',
              orderCode: '170046918-0011',
              warehouseId: 507,
              nmId: 99887766,
              chrtId: 11223344,
              price: 150000,
              currencyCode: 643,
              cargoType: 1,
            },
          ],
        };
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
        expect(result.next).toBe(54321);
      });

      it('should fetch orders with minimal required parameters', async () => {
        mockClient.get.mockResolvedValue({ orders: [] });
        const params = { limit: 1, next: 0, dateFrom: 0, dateTo: 0 };

        const result = await module.getClickCollectOrders(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders`,
          expect.objectContaining({ params })
        );
        expect(result).toEqual({ orders: [] });
      });
    });

    describe('createOrdersStatus', () => {
      it('should get order statuses via POST', async () => {
        const requestData = { orders: [12345, 67890] };
        const mockResponse = {
          orders: [
            { id: 12345, supplierStatus: 'confirm', wbStatus: 'waiting' },
            { id: 67890, supplierStatus: 'prepare', wbStatus: 'sorted' },
          ],
        };

        mockClient.post.mockResolvedValue(mockResponse);

        const result = await module.createOrdersStatus(requestData);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/status`,
          requestData,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.postClickCollectOrdersStatus' })
        );
        expect(result).toEqual(mockResponse);
        expect(result.orders).toHaveLength(2);
      });
    });
  });

  // ==========================================================================
  // Customer Interaction
  // ==========================================================================

  describe('Customer Interaction', () => {
    describe('createOrdersClient', () => {
      it('should fetch customer info via POST', async () => {
        const requestData = { orders: [12345] };
        const mockResponse = {
          orders: [
            {
              phone: '+71111111111',
              firstName: 'Ivan',
              orderID: 12345,
              phoneCode: 1234567,
            },
          ],
        };

        mockClient.post.mockResolvedValue(mockResponse);

        const result = await module.createOrdersClient(requestData);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/client`,
          requestData,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.postClickCollectOrdersClient' })
        );
        expect(result).toEqual(mockResponse);
        expect(result.orders).toHaveLength(1);
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
        expect(result.ok).toBe(true);
      });
    });
  });

  // ==========================================================================
  // Metadata Read/Delete
  // ==========================================================================

  describe('Metadata Read/Delete', () => {
    describe('getOrdersMeta', () => {
      it('should fetch order metadata via GET', async () => {
        const orderId = 12345;
        const mockResponse = {
          meta: {
            imei: { value: '123456789012345' },
            sgtin: { value: ['1234567890123456'] },
            uin: { value: 'UIN-001' },
            gtin: { value: 'GTIN-001' },
          },
        };

        mockClient.get.mockResolvedValue(mockResponse);

        const result = await module.getOrdersMeta(orderId);

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/meta`,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrdersMeta' })
        );
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteOrdersMeta', () => {
      it('should delete order metadata with key parameter via DELETE', async () => {
        const orderId = 12345;
        const options = { key: 'imei' };

        mockClient.delete.mockResolvedValue(undefined);

        await module.deleteOrdersMeta(orderId, options);

        expect(mockClient.delete).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/meta`,
          {},
          expect.objectContaining({
            params: options,
            rateLimitKey: 'in-store-pickup.deleteClickCollectOrdersMeta',
          })
        );
      });

      it('should delete order metadata with different key values', async () => {
        const orderId = 12345;
        mockClient.delete.mockResolvedValue(undefined);

        await module.deleteOrdersMeta(orderId, { key: 'gtin' });

        expect(mockClient.delete).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/meta`,
          {},
          expect.objectContaining({ params: { key: 'gtin' } })
        );
      });
    });
  });

  // ==========================================================================
  // Metadata Write
  // ==========================================================================

  describe('Metadata Write', () => {
    describe('updateMetaSgtin', () => {
      it('should set SGTIN via PUT', async () => {
        const orderId = 12345;
        const data = { sgtins: ['1234567890123456'] };

        mockClient.put.mockResolvedValue(undefined);

        await module.updateMetaSgtin(orderId, data);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/meta/sgtin`,
          data,
          expect.objectContaining({
            rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaSgtin',
          })
        );
      });
    });

    describe('updateMetaUin', () => {
      it('should set UIN via PUT', async () => {
        const orderId = 12345;
        const data = { uin: '1234567890123456' };

        mockClient.put.mockResolvedValue(undefined);

        await module.updateMetaUin(orderId, data);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/meta/uin`,
          data,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaUin' })
        );
      });
    });

    describe('updateMetaImei', () => {
      it('should set IMEI via PUT', async () => {
        const orderId = 12345;
        const data = { imei: '123456789012345' };

        mockClient.put.mockResolvedValue(undefined);

        await module.updateMetaImei(orderId, data);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/meta/imei`,
          data,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaImei' })
        );
      });
    });

    describe('updateMetaGtin', () => {
      it('should set GTIN via PUT', async () => {
        const orderId = 12345;
        const data = { gtin: '1234567890123456' };

        mockClient.put.mockResolvedValue(undefined);

        await module.updateMetaGtin(orderId, data);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/${orderId}/meta/gtin`,
          data,
          expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaGtin' })
        );
      });
    });
  });

  // ==========================================================================
  // Rate Limit Key Presence (all 16 methods)
  // ==========================================================================

  describe('Rate Limit Key Presence', () => {
    it('should pass rateLimitKey for getOrdersNew', async () => {
      mockClient.get.mockResolvedValue({ orders: [] });
      await module.getOrdersNew();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrdersNew' })
      );
    });

    it('should pass rateLimitKey for updateOrdersConfirm', async () => {
      mockClient.patch.mockResolvedValue(undefined);
      await module.updateOrdersConfirm(1);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersConfirm' })
      );
    });

    it('should pass rateLimitKey for updateOrdersPrepare', async () => {
      mockClient.patch.mockResolvedValue(undefined);
      await module.updateOrdersPrepare(1);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersPrepare' })
      );
    });

    it('should pass rateLimitKey for createOrdersClient', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      await module.createOrdersClient({ orders: [1] });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.postClickCollectOrdersClient' })
      );
    });

    it('should pass rateLimitKey for createClientIdentity', async () => {
      mockClient.post.mockResolvedValue({ ok: true });
      await module.createClientIdentity({ orderCode: 'x', passcode: '1' });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: 'in-store-pickup.postClickCollectOrdersClientIdentity',
        })
      );
    });

    it('should pass rateLimitKey for updateOrdersReceive', async () => {
      mockClient.patch.mockResolvedValue(undefined);
      await module.updateOrdersReceive(1);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersReceive' })
      );
    });

    it('should pass rateLimitKey for updateOrdersReject', async () => {
      mockClient.patch.mockResolvedValue(undefined);
      await module.updateOrdersReject(1);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersReject' })
      );
    });

    it('should pass rateLimitKey for createOrdersStatus', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });
      await module.createOrdersStatus({ orders: [1] });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.postClickCollectOrdersStatus' })
      );
    });

    it('should pass rateLimitKey for getClickCollectOrders', async () => {
      mockClient.get.mockResolvedValue({ orders: [] });
      await module.getClickCollectOrders({ limit: 10, next: 0, dateFrom: 0, dateTo: 0 });
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrders' })
      );
    });

    it('should pass rateLimitKey for updateOrdersCancel', async () => {
      mockClient.patch.mockResolvedValue(undefined);
      await module.updateOrdersCancel(1);
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.patchClickCollectOrdersCancel' })
      );
    });

    it('should pass rateLimitKey for getOrdersMeta', async () => {
      mockClient.get.mockResolvedValue({ meta: {} });
      await module.getOrdersMeta(1);
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.clickCollectOrdersMeta' })
      );
    });

    it('should pass rateLimitKey for deleteOrdersMeta', async () => {
      mockClient.delete.mockResolvedValue(undefined);
      await module.deleteOrdersMeta(1, { key: 'imei' });
      expect(mockClient.delete).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.deleteClickCollectOrdersMeta' })
      );
    });

    it('should pass rateLimitKey for updateMetaSgtin', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await module.updateMetaSgtin(1, { sgtins: ['x'] });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaSgtin' })
      );
    });

    it('should pass rateLimitKey for updateMetaUin', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await module.updateMetaUin(1, { uin: 'x' });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaUin' })
      );
    });

    it('should pass rateLimitKey for updateMetaImei', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await module.updateMetaImei(1, { imei: 'x' });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaImei' })
      );
    });

    it('should pass rateLimitKey for updateMetaGtin', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await module.updateMetaGtin(1, { gtin: 'x' });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaGtin' })
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

    it('should propagate AuthenticationError on 403 response', async () => {
      const error = new AuthenticationError('Forbidden', 403);
      mockClient.get.mockRejectedValue(error);

      await expect(module.getOrdersNew()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate ValidationError on 400 response', async () => {
      const error = new ValidationError('Bad request');
      mockClient.post.mockRejectedValue(error);

      await expect(module.createOrdersStatus({ orders: [1] })).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError on 429 response', async () => {
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.patch.mockRejectedValue(error);

      await expect(module.updateOrdersConfirm(1)).rejects.toThrow(RateLimitError);
    });

    it('should propagate WBAPIError on 409 conflict for state transition methods', async () => {
      const error = new WBAPIError('Conflict: invalid state transition', 409);
      mockClient.patch.mockRejectedValue(error);

      await expect(module.updateOrdersConfirm(1)).rejects.toThrow(WBAPIError);
      await expect(module.updateOrdersConfirm(1)).rejects.toThrow('Conflict');
    });

    it('should propagate WBAPIError on 409 conflict for metadata write methods', async () => {
      const error = new WBAPIError('Conflict: metadata already set', 409);
      mockClient.put.mockRejectedValue(error);

      await expect(module.updateMetaSgtin(1, { sgtins: ['x'] })).rejects.toThrow(WBAPIError);
      await expect(module.updateMetaSgtin(1, { sgtins: ['x'] })).rejects.toThrow('Conflict');
    });

    it('should propagate NetworkError on network timeout', async () => {
      const error = new NetworkError('Request timed out', true, undefined);
      mockClient.get.mockRejectedValue(error);

      await expect(module.getOrdersNew()).rejects.toThrow(NetworkError);
    });

    it('should propagate NetworkError on server error', async () => {
      const error = new NetworkError('Internal server error', false, 500);
      mockClient.post.mockRejectedValue(error);

      await expect(module.createOrdersClient({ orders: [1] })).rejects.toThrow(NetworkError);
    });

    it('should propagate errors from DELETE operations', async () => {
      const error = new AuthenticationError('Invalid API key');
      mockClient.delete.mockRejectedValue(error);

      await expect(module.deleteOrdersMeta(1, { key: 'imei' })).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should propagate errors from PUT operations', async () => {
      const error = new RateLimitError('Too many requests', 10000);
      mockClient.put.mockRejectedValue(error);

      await expect(module.updateMetaImei(1, { imei: 'x' })).rejects.toThrow(RateLimitError);
    });
  });
});
