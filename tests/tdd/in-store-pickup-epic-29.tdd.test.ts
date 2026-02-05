/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * TDD RED-PHASE Tests for EPIC 29: In-Store Pickup Test Coverage
 *
 * Comprehensive unit tests for all 16 methods of InStorePickupModule.
 * These tests are expected to FAIL until the corresponding
 * implementation is completed in src/modules/in-store-pickup/index.ts.
 *
 * ACs:
 *   AC1: All 16 methods have unit tests
 *   AC2: Each method is callable and returns Promise
 *   AC3: >= 80% coverage target
 *
 * @see docs/epics/EPIC_29_PICKUP_TEST_COVERAGE.md
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InStorePickupModule } from '../../src/modules/in-store-pickup';
import type { BaseClient } from '../../src/client/base-client';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

describe('EPIC 29: In-Store Pickup Test Coverage', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let mod: InStorePickupModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    mod = new InStorePickupModule(mockClient as unknown as BaseClient);
  });

  // ===========================================================================
  // Section 1: Method Count Check
  // ===========================================================================
  describe('AC1: Module exposes >= 16 public methods', () => {
    it('should have at least 16 public methods on the prototype', () => {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(mod)).filter(
        (m) => m !== 'constructor' && typeof (mod as any)[m] === 'function'
      );
      expect(methods.length).toBeGreaterThanOrEqual(16);
    });

    it('should expose getOrdersNew', () => {
      expect(typeof mod.getOrdersNew).toBe('function');
    });

    it('should expose updateOrdersConfirm', () => {
      expect(typeof mod.updateOrdersConfirm).toBe('function');
    });

    it('should expose updateOrdersPrepare', () => {
      expect(typeof mod.updateOrdersPrepare).toBe('function');
    });

    it('should expose updateOrdersReceive', () => {
      expect(typeof mod.updateOrdersReceive).toBe('function');
    });

    it('should expose updateOrdersReject', () => {
      expect(typeof mod.updateOrdersReject).toBe('function');
    });

    it('should expose updateOrdersCancel', () => {
      expect(typeof mod.updateOrdersCancel).toBe('function');
    });

    it('should expose getClickCollectOrders', () => {
      expect(typeof mod.getClickCollectOrders).toBe('function');
    });

    it('should expose createOrdersStatus', () => {
      expect(typeof (mod as any).createOrdersStatus).toBe('function');
    });

    it('should expose createOrdersClient', () => {
      expect(typeof mod.createOrdersClient).toBe('function');
    });

    it('should expose createClientIdentity', () => {
      expect(typeof mod.createClientIdentity).toBe('function');
    });

    it('should expose getOrdersMeta', () => {
      expect(typeof mod.getOrdersMeta).toBe('function');
    });

    it('should expose deleteOrdersMeta', () => {
      expect(typeof mod.deleteOrdersMeta).toBe('function');
    });

    it('should expose updateMetaSgtin', () => {
      expect(typeof mod.updateMetaSgtin).toBe('function');
    });

    it('should expose updateMetaUin', () => {
      expect(typeof mod.updateMetaUin).toBe('function');
    });

    it('should expose updateMetaImei', () => {
      expect(typeof mod.updateMetaImei).toBe('function');
    });

    it('should expose updateMetaGtin', () => {
      expect(typeof mod.updateMetaGtin).toBe('function');
    });
  });

  // ===========================================================================
  // Section 2: Assembly Task Operations (6 methods)
  // ===========================================================================
  describe('Assembly Task Operations', () => {
    // -- getOrdersNew --
    describe('getOrdersNew', () => {
      it('should call client.get with correct URL', async () => {
        await mod.getOrdersNew();
        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/new`,
          expect.anything()
        );
      });

      it('should use GET HTTP method', async () => {
        await mod.getOrdersNew();
        expect(mockClient.get).toHaveBeenCalledTimes(1);
        expect(mockClient.post).not.toHaveBeenCalled();
      });

      it('should return the response from client', async () => {
        const expected = { orders: [{ id: 1 }] };
        mockClient.get.mockResolvedValue(expected);
        const result = await mod.getOrdersNew();
        expect(result).toEqual(expected);
      });
    });

    // -- updateOrdersConfirm --
    describe('updateOrdersConfirm', () => {
      it('should call client.patch with correct URL containing orderId', async () => {
        await mod.updateOrdersConfirm(98765);
        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/98765/confirm`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PATCH HTTP method', async () => {
        await mod.updateOrdersConfirm(100);
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
        expect(mockClient.put).not.toHaveBeenCalled();
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateOrdersConfirm(42);
        const url = mockClient.patch.mock.calls[0][0];
        expect(url).toContain('/42/confirm');
      });
    });

    // -- updateOrdersPrepare --
    describe('updateOrdersPrepare', () => {
      it('should call client.patch with correct URL containing orderId', async () => {
        await mod.updateOrdersPrepare(111);
        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/111/prepare`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PATCH HTTP method', async () => {
        await mod.updateOrdersPrepare(111);
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateOrdersPrepare(999);
        const url = mockClient.patch.mock.calls[0][0];
        expect(url).toContain('/999/prepare');
      });
    });

    // -- updateOrdersReceive --
    describe('updateOrdersReceive', () => {
      it('should call client.patch with correct URL containing orderId', async () => {
        await mod.updateOrdersReceive(222);
        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/222/receive`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PATCH HTTP method', async () => {
        await mod.updateOrdersReceive(222);
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateOrdersReceive(7777);
        const url = mockClient.patch.mock.calls[0][0];
        expect(url).toContain('/7777/receive');
      });
    });

    // -- updateOrdersReject --
    describe('updateOrdersReject', () => {
      it('should call client.patch with correct URL containing orderId', async () => {
        await mod.updateOrdersReject(333);
        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/333/reject`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PATCH HTTP method', async () => {
        await mod.updateOrdersReject(333);
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateOrdersReject(5050);
        const url = mockClient.patch.mock.calls[0][0];
        expect(url).toContain('/5050/reject');
      });
    });

    // -- updateOrdersCancel --
    describe('updateOrdersCancel', () => {
      it('should call client.patch with correct URL containing orderId', async () => {
        await mod.updateOrdersCancel(444);
        expect(mockClient.patch).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/444/cancel`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PATCH HTTP method', async () => {
        await mod.updateOrdersCancel(444);
        expect(mockClient.patch).toHaveBeenCalledTimes(1);
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateOrdersCancel(6060);
        const url = mockClient.patch.mock.calls[0][0];
        expect(url).toContain('/6060/cancel');
      });
    });
  });

  // ===========================================================================
  // Section 3: Order Query Operations (2 methods)
  // ===========================================================================
  describe('Order Query Operations', () => {
    // -- getClickCollectOrders --
    describe('getClickCollectOrders', () => {
      it('should call client.get with correct URL', async () => {
        await mod.getClickCollectOrders();
        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders`,
          expect.anything()
        );
      });

      it('should use GET HTTP method', async () => {
        await mod.getClickCollectOrders();
        expect(mockClient.get).toHaveBeenCalledTimes(1);
        expect(mockClient.post).not.toHaveBeenCalled();
      });

      it('should forward pagination params (limit, next, dateFrom, dateTo)', async () => {
        const params = { limit: 50, next: 100, dateFrom: 1700000000, dateTo: 1700100000 };
        await mod.getClickCollectOrders(params);
        expect(mockClient.get).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ params })
        );
      });

      it('should work without optional params', async () => {
        await mod.getClickCollectOrders();
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should return the response from client', async () => {
        const expected = { orders: [{ id: 1 }], next: 200 };
        mockClient.get.mockResolvedValue(expected);
        const result = await mod.getClickCollectOrders({ limit: 10, next: 0, dateFrom: 0, dateTo: 0 });
        expect(result).toEqual(expected);
      });
    });

    // -- createOrdersStatus --
    describe('createOrdersStatus', () => {
      it('should call client.post with correct URL', async () => {
        const data = { orders: [123, 456] };
        await (mod as any).createOrdersStatus(data);
        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/status`,
          data,
          expect.anything()
        );
      });

      it('should use POST HTTP method', async () => {
        await (mod as any).createOrdersStatus({ orders: [1] });
        expect(mockClient.post).toHaveBeenCalledTimes(1);
        expect(mockClient.get).not.toHaveBeenCalled();
      });

      it('should forward the request body', async () => {
        const body = { orders: [10, 20, 30] };
        await (mod as any).createOrdersStatus(body);
        const passedBody = mockClient.post.mock.calls[0][1];
        expect(passedBody).toEqual(body);
      });

      it('should return the response from client', async () => {
        const expected = { orders: [{ id: 123, supplierStatus: 'new', wbStatus: 'waiting' }] };
        mockClient.post.mockResolvedValue(expected);
        const result = await (mod as any).createOrdersStatus({ orders: [123] });
        expect(result).toEqual(expected);
      });
    });
  });

  // ===========================================================================
  // Section 4: Customer Interaction Operations (2 methods)
  // ===========================================================================
  describe('Customer Interaction Operations', () => {
    // -- createOrdersClient --
    describe('createOrdersClient', () => {
      it('should call client.post with correct URL', async () => {
        const data = { orders: [555] } as any;
        await mod.createOrdersClient(data);
        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/client`,
          data,
          expect.anything()
        );
      });

      it('should use POST HTTP method', async () => {
        await mod.createOrdersClient({ orders: [1] } as any);
        expect(mockClient.post).toHaveBeenCalledTimes(1);
        expect(mockClient.get).not.toHaveBeenCalled();
      });

      it('should forward the request body', async () => {
        const body = { orders: [777] } as any;
        await mod.createOrdersClient(body);
        const passedBody = mockClient.post.mock.calls[0][1];
        expect(passedBody).toEqual(body);
      });

      it('should return the response from client', async () => {
        const expected = { client: { phone: '+7...' } };
        mockClient.post.mockResolvedValue(expected);
        const result = await mod.createOrdersClient({ orders: [1] } as any);
        expect(result).toEqual(expected);
      });
    });

    // -- createClientIdentity --
    describe('createClientIdentity', () => {
      it('should call client.post with correct URL', async () => {
        const data = { orderCode: '170046918-0011', passcode: '4567' } as any;
        await mod.createClientIdentity(data);
        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/client/identity`,
          data,
          expect.anything()
        );
      });

      it('should use POST HTTP method', async () => {
        await mod.createClientIdentity({ orderCode: 'abc', passcode: '1234' } as any);
        expect(mockClient.post).toHaveBeenCalledTimes(1);
      });

      it('should forward the request body with orderCode and passcode', async () => {
        const body = { orderCode: 'ORD-001', passcode: '9999' } as any;
        await mod.createClientIdentity(body);
        const passedBody = mockClient.post.mock.calls[0][1];
        expect(passedBody).toEqual(body);
      });

      it('should return the response from client', async () => {
        const expected = { ok: true };
        mockClient.post.mockResolvedValue(expected);
        const result = await mod.createClientIdentity({ orderCode: 'x', passcode: 'y' } as any);
        expect(result).toEqual(expected);
      });
    });
  });

  // ===========================================================================
  // Section 5: Metadata Read/Delete (2 methods)
  // ===========================================================================
  describe('Metadata Read/Delete Operations', () => {
    // -- getOrdersMeta --
    describe('getOrdersMeta', () => {
      it('should call client.get with correct URL containing orderId', async () => {
        await mod.getOrdersMeta(12345);
        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/12345/meta`,
          expect.anything()
        );
      });

      it('should use GET HTTP method', async () => {
        await mod.getOrdersMeta(12345);
        expect(mockClient.get).toHaveBeenCalledTimes(1);
        expect(mockClient.delete).not.toHaveBeenCalled();
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.getOrdersMeta(54321);
        const url = mockClient.get.mock.calls[0][0];
        expect(url).toContain('/54321/meta');
      });

      it('should return the response from client', async () => {
        const expected = { imei: '123456789012345', uin: '', sgtins: [] };
        mockClient.get.mockResolvedValue(expected);
        const result = await mod.getOrdersMeta(1);
        expect(result).toEqual(expected);
      });
    });

    // -- deleteOrdersMeta --
    describe('deleteOrdersMeta', () => {
      it('should call client.delete with correct URL containing orderId', async () => {
        await mod.deleteOrdersMeta(12345, { key: 'imei' });
        expect(mockClient.delete).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/12345/meta`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use DELETE HTTP method', async () => {
        await mod.deleteOrdersMeta(12345, { key: 'imei' });
        expect(mockClient.delete).toHaveBeenCalledTimes(1);
        expect(mockClient.get).not.toHaveBeenCalled();
      });

      it('should forward the key query parameter', async () => {
        await mod.deleteOrdersMeta(12345, { key: 'sgtin' });
        expect(mockClient.delete).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ params: { key: 'sgtin' } })
        );
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.deleteOrdersMeta(8888);
        const url = mockClient.delete.mock.calls[0][0];
        expect(url).toContain('/8888/meta');
      });
    });
  });

  // ===========================================================================
  // Section 6: Metadata Write Operations (4 methods)
  // ===========================================================================
  describe('Metadata Write Operations', () => {
    // -- updateMetaSgtin --
    describe('updateMetaSgtin', () => {
      it('should call client.put with correct URL containing orderId', async () => {
        await mod.updateMetaSgtin(500, { sgtins: ['abc123'] } as any);
        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/500/meta/sgtin`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PUT HTTP method', async () => {
        await mod.updateMetaSgtin(500, { sgtins: ['abc123'] } as any);
        expect(mockClient.put).toHaveBeenCalledTimes(1);
        expect(mockClient.patch).not.toHaveBeenCalled();
      });

      it('should forward the request body', async () => {
        const body = { sgtins: ['sgtin-001', 'sgtin-002'] } as any;
        await mod.updateMetaSgtin(500, body);
        const passedBody = mockClient.put.mock.calls[0][1];
        expect(passedBody).toEqual(body);
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateMetaSgtin(3030, { sgtins: ['x'] } as any);
        const url = mockClient.put.mock.calls[0][0];
        expect(url).toContain('/3030/meta/sgtin');
      });
    });

    // -- updateMetaUin --
    describe('updateMetaUin', () => {
      it('should call client.put with correct URL containing orderId', async () => {
        await mod.updateMetaUin(600, { uin: 'UIN-123' } as any);
        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/600/meta/uin`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PUT HTTP method', async () => {
        await mod.updateMetaUin(600, { uin: 'UIN-123' } as any);
        expect(mockClient.put).toHaveBeenCalledTimes(1);
        expect(mockClient.patch).not.toHaveBeenCalled();
      });

      it('should forward the request body', async () => {
        const body = { uin: 'UIN-456' } as any;
        await mod.updateMetaUin(600, body);
        const passedBody = mockClient.put.mock.calls[0][1];
        expect(passedBody).toEqual(body);
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateMetaUin(4040, { uin: 'x' } as any);
        const url = mockClient.put.mock.calls[0][0];
        expect(url).toContain('/4040/meta/uin');
      });
    });

    // -- updateMetaImei --
    describe('updateMetaImei', () => {
      it('should call client.put with correct URL containing orderId', async () => {
        await mod.updateMetaImei(700, { imei: '123456789012345' } as any);
        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/700/meta/imei`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PUT HTTP method', async () => {
        await mod.updateMetaImei(700, { imei: '123456789012345' } as any);
        expect(mockClient.put).toHaveBeenCalledTimes(1);
        expect(mockClient.patch).not.toHaveBeenCalled();
      });

      it('should forward the request body', async () => {
        const body = { imei: '999888777666555' } as any;
        await mod.updateMetaImei(700, body);
        const passedBody = mockClient.put.mock.calls[0][1];
        expect(passedBody).toEqual(body);
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateMetaImei(5050, { imei: 'x' } as any);
        const url = mockClient.put.mock.calls[0][0];
        expect(url).toContain('/5050/meta/imei');
      });
    });

    // -- updateMetaGtin --
    describe('updateMetaGtin', () => {
      it('should call client.put with correct URL containing orderId', async () => {
        await mod.updateMetaGtin(800, { gtin: '1234567890123456' } as any);
        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/click-collect/orders/800/meta/gtin`,
          expect.anything(),
          expect.anything()
        );
      });

      it('should use PUT HTTP method', async () => {
        await mod.updateMetaGtin(800, { gtin: '1234567890123456' } as any);
        expect(mockClient.put).toHaveBeenCalledTimes(1);
        expect(mockClient.patch).not.toHaveBeenCalled();
      });

      it('should forward the request body', async () => {
        const body = { gtin: '9999888877776666' } as any;
        await mod.updateMetaGtin(800, body);
        const passedBody = mockClient.put.mock.calls[0][1];
        expect(passedBody).toEqual(body);
      });

      it('should interpolate orderId into the URL path', async () => {
        await mod.updateMetaGtin(6060, { gtin: 'x' } as any);
        const url = mockClient.put.mock.calls[0][0];
        expect(url).toContain('/6060/meta/gtin');
      });
    });
  });

  // ===========================================================================
  // Section 7: AC2 - Each method returns a Promise
  // ===========================================================================
  describe('AC2: Each method returns a Promise', () => {
    it('getOrdersNew returns a Promise', () => {
      const result = mod.getOrdersNew();
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateOrdersConfirm returns a Promise', () => {
      const result = mod.updateOrdersConfirm(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateOrdersPrepare returns a Promise', () => {
      const result = mod.updateOrdersPrepare(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateOrdersReceive returns a Promise', () => {
      const result = mod.updateOrdersReceive(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateOrdersReject returns a Promise', () => {
      const result = mod.updateOrdersReject(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateOrdersCancel returns a Promise', () => {
      const result = mod.updateOrdersCancel(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('getClickCollectOrders returns a Promise', () => {
      const result = mod.getClickCollectOrders();
      expect(result).toBeInstanceOf(Promise);
    });

    it('createOrdersStatus returns a Promise', () => {
      const result = (mod as any).createOrdersStatus({ orders: [1] });
      expect(result).toBeInstanceOf(Promise);
    });

    it('createOrdersClient returns a Promise', () => {
      const result = mod.createOrdersClient({ orders: [1] } as any);
      expect(result).toBeInstanceOf(Promise);
    });

    it('createClientIdentity returns a Promise', () => {
      const result = mod.createClientIdentity({ orderCode: 'x', passcode: 'y' } as any);
      expect(result).toBeInstanceOf(Promise);
    });

    it('getOrdersMeta returns a Promise', () => {
      const result = mod.getOrdersMeta(1);
      expect(result).toBeInstanceOf(Promise);
    });

    it('deleteOrdersMeta returns a Promise', () => {
      const result = mod.deleteOrdersMeta(1, { key: 'imei' });
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateMetaSgtin returns a Promise', () => {
      const result = mod.updateMetaSgtin(1, { sgtins: ['x'] } as any);
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateMetaUin returns a Promise', () => {
      const result = mod.updateMetaUin(1, { uin: 'x' } as any);
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateMetaImei returns a Promise', () => {
      const result = mod.updateMetaImei(1, { imei: 'x' } as any);
      expect(result).toBeInstanceOf(Promise);
    });

    it('updateMetaGtin returns a Promise', () => {
      const result = mod.updateMetaGtin(1, { gtin: 'x' } as any);
      expect(result).toBeInstanceOf(Promise);
    });
  });

  // ===========================================================================
  // Section 8: Error Handling Tests
  // ===========================================================================
  describe('Error handling', () => {
    // --- 401 Unauthorized ---
    describe('401 Unauthorized', () => {
      it('should propagate 401 error from getOrdersNew', async () => {
        const err = Object.assign(new Error('Unauthorized'), { response: { status: 401 } });
        mockClient.get.mockRejectedValue(err);
        await expect(mod.getOrdersNew()).rejects.toThrow('Unauthorized');
      });

      it('should propagate 401 error from updateOrdersConfirm', async () => {
        const err = Object.assign(new Error('Unauthorized'), { response: { status: 401 } });
        mockClient.patch.mockRejectedValue(err);
        await expect(mod.updateOrdersConfirm(1)).rejects.toThrow('Unauthorized');
      });

      it('should propagate 401 error from createOrdersClient', async () => {
        const err = Object.assign(new Error('Unauthorized'), { response: { status: 401 } });
        mockClient.post.mockRejectedValue(err);
        await expect(mod.createOrdersClient({ orders: [1] } as any)).rejects.toThrow('Unauthorized');
      });

      it('should propagate 401 error from updateMetaSgtin', async () => {
        const err = Object.assign(new Error('Unauthorized'), { response: { status: 401 } });
        mockClient.put.mockRejectedValue(err);
        await expect(mod.updateMetaSgtin(1, { sgtins: ['x'] } as any)).rejects.toThrow('Unauthorized');
      });

      it('should propagate 401 error from deleteOrdersMeta', async () => {
        const err = Object.assign(new Error('Unauthorized'), { response: { status: 401 } });
        mockClient.delete.mockRejectedValue(err);
        await expect(mod.deleteOrdersMeta(1, { key: 'imei' })).rejects.toThrow('Unauthorized');
      });
    });

    // --- 403 Forbidden ---
    describe('403 Forbidden', () => {
      it('should propagate 403 error from getOrdersNew', async () => {
        const err = Object.assign(new Error('Forbidden'), { response: { status: 403 } });
        mockClient.get.mockRejectedValue(err);
        await expect(mod.getOrdersNew()).rejects.toThrow('Forbidden');
      });

      it('should propagate 403 error from updateOrdersPrepare', async () => {
        const err = Object.assign(new Error('Forbidden'), { response: { status: 403 } });
        mockClient.patch.mockRejectedValue(err);
        await expect(mod.updateOrdersPrepare(1)).rejects.toThrow('Forbidden');
      });

      it('should propagate 403 error from createClientIdentity', async () => {
        const err = Object.assign(new Error('Forbidden'), { response: { status: 403 } });
        mockClient.post.mockRejectedValue(err);
        await expect(mod.createClientIdentity({ orderCode: 'x', passcode: 'y' } as any)).rejects.toThrow('Forbidden');
      });
    });

    // --- 400 Bad Request ---
    describe('400 Bad Request', () => {
      it('should propagate 400 error from createOrdersStatus', async () => {
        const err = Object.assign(new Error('Bad Request'), { response: { status: 400 } });
        mockClient.post.mockRejectedValue(err);
        await expect((mod as any).createOrdersStatus({ orders: [] })).rejects.toThrow('Bad Request');
      });

      it('should propagate 400 error from updateMetaImei', async () => {
        const err = Object.assign(new Error('Bad Request'), { response: { status: 400 } });
        mockClient.put.mockRejectedValue(err);
        await expect(mod.updateMetaImei(1, { imei: '' } as any)).rejects.toThrow('Bad Request');
      });

      it('should propagate 400 error from deleteOrdersMeta', async () => {
        const err = Object.assign(new Error('Bad Request'), { response: { status: 400 } });
        mockClient.delete.mockRejectedValue(err);
        await expect(mod.deleteOrdersMeta(1)).rejects.toThrow('Bad Request');
      });
    });

    // --- 404 Not Found ---
    describe('404 Not Found', () => {
      it('should propagate 404 error from getOrdersMeta', async () => {
        const err = Object.assign(new Error('Not Found'), { response: { status: 404 } });
        mockClient.get.mockRejectedValue(err);
        await expect(mod.getOrdersMeta(99999)).rejects.toThrow('Not Found');
      });

      it('should propagate 404 error from updateOrdersReceive', async () => {
        const err = Object.assign(new Error('Not Found'), { response: { status: 404 } });
        mockClient.patch.mockRejectedValue(err);
        await expect(mod.updateOrdersReceive(99999)).rejects.toThrow('Not Found');
      });

      it('should propagate 404 error from updateMetaGtin', async () => {
        const err = Object.assign(new Error('Not Found'), { response: { status: 404 } });
        mockClient.put.mockRejectedValue(err);
        await expect(mod.updateMetaGtin(99999, { gtin: 'x' } as any)).rejects.toThrow('Not Found');
      });
    });

    // --- 409 Conflict ---
    describe('409 Conflict', () => {
      it('should propagate 409 error from updateOrdersConfirm', async () => {
        const err = Object.assign(new Error('Conflict'), {
          response: { status: 409, data: { code: 'conflict', message: 'Invalid state transition' } },
        });
        mockClient.patch.mockRejectedValue(err);
        await expect(mod.updateOrdersConfirm(1)).rejects.toThrow('Conflict');
      });

      it('should propagate 409 error from updateOrdersCancel', async () => {
        const err = Object.assign(new Error('Conflict'), {
          response: { status: 409, data: { code: 'conflict', message: 'Already cancelled' } },
        });
        mockClient.patch.mockRejectedValue(err);
        await expect(mod.updateOrdersCancel(1)).rejects.toThrow('Conflict');
      });

      it('should propagate 409 error from updateOrdersReject', async () => {
        const err = Object.assign(new Error('Conflict'), {
          response: { status: 409, data: { code: 'conflict', message: 'Wrong status' } },
        });
        mockClient.patch.mockRejectedValue(err);
        await expect(mod.updateOrdersReject(1)).rejects.toThrow('Conflict');
      });

      it('should propagate 409 error from updateMetaUin', async () => {
        const err = Object.assign(new Error('Conflict'), {
          response: { status: 409, data: { code: 'conflict', message: 'Meta conflict' } },
        });
        mockClient.put.mockRejectedValue(err);
        await expect(mod.updateMetaUin(1, { uin: 'x' } as any)).rejects.toThrow('Conflict');
      });

      it('should propagate 409 error from createClientIdentity', async () => {
        const err = Object.assign(new Error('Conflict'), {
          response: { status: 409, data: { code: 'conflict', message: 'Not the buyer' } },
        });
        mockClient.post.mockRejectedValue(err);
        await expect(mod.createClientIdentity({ orderCode: 'x', passcode: 'y' } as any)).rejects.toThrow('Conflict');
      });
    });

    // --- 429 Too Many Requests ---
    describe('429 Too Many Requests', () => {
      it('should propagate 429 error from getOrdersNew', async () => {
        const err = Object.assign(new Error('Too Many Requests'), { response: { status: 429 } });
        mockClient.get.mockRejectedValue(err);
        await expect(mod.getOrdersNew()).rejects.toThrow('Too Many Requests');
      });

      it('should propagate 429 error from getClickCollectOrders', async () => {
        const err = Object.assign(new Error('Too Many Requests'), { response: { status: 429 } });
        mockClient.get.mockRejectedValue(err);
        await expect(mod.getClickCollectOrders()).rejects.toThrow('Too Many Requests');
      });

      it('should propagate 429 error from updateOrdersPrepare', async () => {
        const err = Object.assign(new Error('Too Many Requests'), { response: { status: 429 } });
        mockClient.patch.mockRejectedValue(err);
        await expect(mod.updateOrdersPrepare(1)).rejects.toThrow('Too Many Requests');
      });

      it('should propagate 429 error from createOrdersClient', async () => {
        const err = Object.assign(new Error('Too Many Requests'), { response: { status: 429 } });
        mockClient.post.mockRejectedValue(err);
        await expect(mod.createOrdersClient({ orders: [1] } as any)).rejects.toThrow('Too Many Requests');
      });

      it('should propagate 429 error from updateMetaSgtin', async () => {
        const err = Object.assign(new Error('Too Many Requests'), { response: { status: 429 } });
        mockClient.put.mockRejectedValue(err);
        await expect(mod.updateMetaSgtin(1, { sgtins: ['x'] } as any)).rejects.toThrow('Too Many Requests');
      });

      it('should propagate 429 error from deleteOrdersMeta', async () => {
        const err = Object.assign(new Error('Too Many Requests'), { response: { status: 429 } });
        mockClient.delete.mockRejectedValue(err);
        await expect(mod.deleteOrdersMeta(1, { key: 'imei' })).rejects.toThrow('Too Many Requests');
      });
    });
  });
});
