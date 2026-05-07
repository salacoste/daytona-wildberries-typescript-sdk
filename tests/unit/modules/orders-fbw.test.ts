/**
 * Unit tests for OrdersFbwModule
 *
 * Tests FBW (Fulfillment by Wildberries) module methods including:
 * - Warehouse information retrieval
 * - Supply management and details
 * - Package information
 * - Transit tariff calculation
 * - Rate limit key wiring (EPIC 30)
 * - Method renaming and aliases (EPIC 32)
 *
 * @module tests/unit/modules/orders-fbw.test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFbwModule } from '../../../src/modules/orders-fbw';
import type { BaseClient } from '../../../src/client/base-client';
import type { ModelsGood, ModelsSuppliesFiltersRequest } from '../../../src/types/orders-fbw.types';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { ValidationError } from '../../../src/errors/validation-error';
import { WBAPIError } from '../../../src/errors/base-error';

describe('OrdersFbwModule', () => {
  let mockClient: { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };
  let ordersFbw: OrdersFbwModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
    };

    ordersFbw = new OrdersFbwModule(mockClient as unknown as BaseClient);
  });

  // ============================================================================
  // warehouses()
  // ============================================================================

  describe('warehouses', () => {
    it('should fetch warehouses list', async () => {
      const mockWarehouses = [
        {
          ID: 507,
          name: 'Коледино',
          address: 'МО, Подольск',
          workTime: 'Пн-Пт: 09:00-18:00',
          acceptsQR: true,
          isActive: true,
          isTransitActive: false,
        },
      ];

      mockClient.get.mockResolvedValue(mockWarehouses);

      const result = await ordersFbw.warehouses();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/warehouses',
        { rateLimitKey: 'orders-fbw.warehouses' }
      );
      expect(result).toEqual(mockWarehouses);
    });
  });

  // ============================================================================
  // createAcceptanceOption()
  // ============================================================================

  describe('createAcceptanceOption', () => {
    it('should fetch acceptance options for goods', async () => {
      const goods: ModelsGood[] = [
        { barcode: '1234567891234', quantity: 10 },
        { barcode: '9876543210987', quantity: 5 },
      ];

      const mockOptions = {
        result: [
          {
            barcode: '1234567891234',
            warehouses: [
              {
                warehouseID: 507,
                warehouseName: 'Коледино',
                canBox: true,
                canMonopallet: false,
                canSupersafe: false,
              },
            ],
            isError: false,
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockOptions);

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        goods,
        { params: undefined, rateLimitKey: 'orders-fbw.postAcceptanceOptions' }
      );
      expect(result).toEqual(mockOptions);
    });

    it('should pass warehouse ID parameter when provided', async () => {
      const goods: ModelsGood[] = [{ barcode: '1234567891234', quantity: 10 }];
      const mockOptions = { result: [] };

      mockClient.post.mockResolvedValue(mockOptions);

      await ordersFbw.createAcceptanceOption(goods, { warehouseID: '507' });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        goods,
        { params: { warehouseID: '507' }, rateLimitKey: 'orders-fbw.postAcceptanceOptions' }
      );
    });
  });

  // ============================================================================
  // transitTariffs()
  // ============================================================================

  describe('transitTariffs', () => {
    it('should fetch transit tariffs', async () => {
      const mockTariffs = [
        {
          transitWarehouseName: 'Москва (транзит)',
          destinationWarehouseName: 'Санкт-Петербург',
          activeFrom: '2024-01-01',
          boxTariff: [
            { from: 0, to: 100, value: 5.5 },
            { from: 100, to: 500, value: 4.75 },
          ],
          palletTariff: 1200.0,
        },
      ];

      mockClient.get.mockResolvedValue(mockTariffs);

      const result = await ordersFbw.transitTariffs();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/transit-tariffs',
        { rateLimitKey: 'orders-fbw.transitTariffs' }
      );
      expect(result).toEqual(mockTariffs);
    });
  });

  // ============================================================================
  // listSupplies() - List supplies with filters (renamed from createSupply)
  // ============================================================================

  describe('listSupplies', () => {
    it('should fetch supplies with filters', async () => {
      const filters: ModelsSuppliesFiltersRequest = {
        dates: [
          {
            from: '2024-01-01',
            till: '2024-12-31',
            type: 'createDate',
          },
        ],
        statusIDs: [2, 3, 4],
      };

      const mockSupplies = [
        {
          phone: '+79001234567',
          supplyID: 12345,
          preorderID: 67890,
          createDate: '2024-01-15T10:30:00Z',
          supplyDate: '2024-01-20',
          factDate: '2024-01-20T14:22:00Z',
          updatedDate: '2024-01-21T08:15:00Z',
          statusID: 5,
          statusName: 'Принято',
        },
      ];

      mockClient.post.mockResolvedValue(mockSupplies);

      const result = await ordersFbw.listSupplies(filters, { limit: 100, offset: 0 });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies',
        filters,
        { params: { limit: 100, offset: 0 }, rateLimitKey: 'orders-fbw.postSupplies' }
      );
      expect(result).toEqual(mockSupplies);
    });

    it('should work without pagination options', async () => {
      const filters: ModelsSuppliesFiltersRequest = { dates: [], statusIDs: [] };
      mockClient.post.mockResolvedValue([]);

      await ordersFbw.listSupplies(filters);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies',
        filters,
        { params: undefined, rateLimitKey: 'orders-fbw.postSupplies' }
      );
    });
  });

  // ============================================================================
  // createSupply() - Deprecated alias for listSupplies
  // ============================================================================
  // getSupply() - Get single supply details by ID
  // ============================================================================

  describe('getSupply', () => {
    it('should fetch supply details by supply ID', async () => {
      const mockDetails = {
        phone: '+79001234567',
        supplyID: 12345,
        preorderID: 67890,
        createDate: '2024-01-15T10:30:00Z',
        supplyDate: '2024-01-20',
        factDate: '2024-01-20T14:22:00Z',
        updatedDate: '2024-01-21T08:15:00Z',
        statusID: 5,
        statusName: 'Принято',
        warehouseID: 507,
        warehouseName: 'Коледино',
        boxTypeID: 1,
        boxTypeName: 'Короба',
        quantity: 100,
        acceptedQuantity: 95,
        readyForSaleQuantity: 90,
        acceptanceCost: 1500.5,
        storageCoefficient: 1.2,
        deliveryCoefficient: 1.0,
      };

      mockClient.get.mockResolvedValue(mockDetails);

      const result = await ordersFbw.getSupply(12345);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/12345',
        { params: undefined, rateLimitKey: 'orders-fbw.supplies' }
      );
      expect(result).toEqual(mockDetails);
    });

    it('should fetch supply details by preorder ID', async () => {
      const mockDetails = {
        phone: '+79001234567',
        supplyID: 12345,
        preorderID: 67890,
        createDate: '2024-01-15T10:30:00Z',
        supplyDate: '2024-01-20',
        statusID: 5,
        statusName: 'Принято',
      };

      mockClient.get.mockResolvedValue(mockDetails);

      const result = await ordersFbw.getSupply(67890, { isPreorderID: true });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/67890',
        { params: { isPreorderID: true }, rateLimitKey: 'orders-fbw.supplies' }
      );
      expect(result).toEqual(mockDetails);
    });
  });

  // ============================================================================
  // getSuppliesGood()
  // ============================================================================

  describe('getSuppliesGood', () => {
    it('should fetch supply goods with default options', async () => {
      const mockGoods = [
        {
          barcode: '1234567891234',
          vendorCode: 'PROD-001',
          nmID: 98765,
          needKiz: true,
          tnved: '6204620000',
          techSize: '42',
          color: 'Черный',
          quantity: 10,
          acceptedQuantity: 9,
          readyForSaleQuantity: 8,
          unloadingQuantity: 1,
        },
      ];

      mockClient.get.mockResolvedValue(mockGoods);

      const result = await ordersFbw.getSuppliesGood(12345);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/12345/goods',
        { params: undefined, rateLimitKey: 'orders-fbw.suppliesGoods' }
      );
      expect(result).toEqual(mockGoods);
    });

    it('should fetch supply goods with custom pagination', async () => {
      mockClient.get.mockResolvedValue([]);

      await ordersFbw.getSuppliesGood(12345, { limit: 50, offset: 100, isPreorderID: false });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/12345/goods',
        {
          params: { limit: 50, offset: 100, isPreorderID: false },
          rateLimitKey: 'orders-fbw.suppliesGoods',
        }
      );
    });

    it('should fetch supply goods by preorder ID', async () => {
      mockClient.get.mockResolvedValue([]);

      await ordersFbw.getSuppliesGood(67890, { isPreorderID: true });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/67890/goods',
        { params: { isPreorderID: true }, rateLimitKey: 'orders-fbw.suppliesGoods' }
      );
    });
  });

  // ============================================================================
  // getSuppliesPackage()
  // ============================================================================

  describe('getSuppliesPackage', () => {
    it('should fetch supply package information', async () => {
      const mockBoxes = [
        {
          packageCode: 'WB-PKG-12345',
          quantity: 15,
          barcodes: [
            { barcode: '1234567891234', quantity: 10 },
            { barcode: '9876543210987', quantity: 5 },
          ],
        },
      ];

      mockClient.get.mockResolvedValue(mockBoxes);

      const result = await ordersFbw.getSuppliesPackage(12345);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/12345/package',
        { rateLimitKey: 'orders-fbw.suppliesPackage' }
      );
      expect(result).toEqual(mockBoxes);
    });
  });

  // ============================================================================
  // getClientInfo (DBW buyer info)
  // ============================================================================

  describe('getClientInfo()', () => {
    const DBW_CLIENT_URL =
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/dbw/orders/client';

    it('should return buyer info for DBW orders', async () => {
      const mockResponse = {
        orders: [
          {
            orderID: 987654321,
            firstName: 'Иван',
            phone: '1234567',
            phoneCode: 7,
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getClientInfo([987654321]);

      expect(result.orders).toHaveLength(1);
      expect(result.orders![0].orderID).toBe(987654321);
      expect(result.orders![0].firstName).toBe('Иван');
      expect(result.orders![0].phoneCode).toBe(7);
    });

    it('should call correct URL with marketplace-api domain', async () => {
      mockClient.post.mockResolvedValue({ orders: null });

      await ordersFbw.getClientInfo([123]);

      expect(mockClient.post).toHaveBeenCalledWith(
        DBW_CLIENT_URL,
        { orders: [123] },
        { rateLimitKey: 'orders-fbw.getClientInfo' }
      );
    });

    it('should send orderIds in request body as { orders: [...] }', async () => {
      mockClient.post.mockResolvedValue({ orders: null });

      await ordersFbw.getClientInfo([111, 222, 333]);

      expect(mockClient.post).toHaveBeenCalledWith(
        DBW_CLIENT_URL,
        { orders: [111, 222, 333] },
        expect.objectContaining({ rateLimitKey: 'orders-fbw.getClientInfo' })
      );
    });

    it('should throw ValidationError for empty orderIds', async () => {
      await expect(ordersFbw.getClientInfo([])).rejects.toThrow(ValidationError);
      await expect(ordersFbw.getClientInfo([])).rejects.toThrow('orderIds array cannot be empty');
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));
      await expect(ordersFbw.getClientInfo([123])).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(ordersFbw.getClientInfo([123])).rejects.toThrow(RateLimitError);
    });
  });

  // ============================================================================
  // deleteMetaBulk() — DBW bulk metadata deletion (v3.11.0)
  // ============================================================================

  describe('deleteMetaBulk', () => {
    it('should post correct body to correct URL and return response', async () => {
      const mockResponse = { orders: [{ orderId: 123456, success: true }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.deleteMetaBulk({ orders: [123456], key: 'imei' });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/dbw/orders/meta/delete'),
        { orders: [123456], key: 'imei' },
        expect.objectContaining({ rateLimitKey: 'orders-fbw.deleteMetaBulkDBW' })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should honour rateLimitKey orders-fbw.deleteMetaBulkDBW', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });

      await ordersFbw.deleteMetaBulk({ orders: [111], key: 'sgtin' });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbw.deleteMetaBulkDBW' })
      );
    });

    it('should propagate ValidationError on 409/422', async () => {
      mockClient.post.mockRejectedValue(new ValidationError('Invalid request'));

      await expect(ordersFbw.deleteMetaBulk({ orders: [123], key: 'gtin' })).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError when orders is empty', async () => {
      await expect(ordersFbw.deleteMetaBulk({ orders: [], key: 'imei' })).rejects.toThrow(
        ValidationError
      );
      await expect(ordersFbw.deleteMetaBulk({ orders: [], key: 'imei' })).rejects.toThrow(/empty/);
      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  // ============================================================================
  // setSgtinBulk() — DBW bulk SGTIN assignment (v3.11.0)
  // ============================================================================

  describe('setSgtinBulk', () => {
    it('should post correct body to correct URL and return response', async () => {
      const request = { orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }] };
      const mockResponse = { orders: [{ orderId: 123456, success: true }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.setSgtinBulk(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/dbw/orders/meta/sgtin'),
        request,
        expect.objectContaining({ rateLimitKey: 'orders-fbw.setSgtinBulkDBW' })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should honour rateLimitKey orders-fbw.setSgtinBulkDBW', async () => {
      mockClient.post.mockResolvedValue({ orders: [] });

      await ordersFbw.setSgtinBulk({ orders: [{ orderId: 1, sgtins: ['abc'] }] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbw.setSgtinBulkDBW' })
      );
    });

    it('should return errors array when some orders fail', async () => {
      const mockResponse = {
        orders: [{ orderId: 123, success: false, error: 'invalid sgtin' }],
        errors: [{ orderId: 123, message: 'SGTIN validation failed', code: 'INVALID_SGTIN' }],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.setSgtinBulk({
        orders: [{ orderId: 123, sgtins: ['bad'] }],
      });

      expect(result.errors).toHaveLength(1);
      expect(result.errors![0].code).toBe('INVALID_SGTIN');
    });

    it('should throw ValidationError when orders is empty', async () => {
      await expect(ordersFbw.setSgtinBulk({ orders: [] })).rejects.toThrow(ValidationError);
      await expect(ordersFbw.setSgtinBulk({ orders: [] })).rejects.toThrow(/empty/);
      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  // ============================================================================
  // deliverBulk() — DBW bulk status deliver (v3.11.0)
  // ============================================================================

  describe('deliverBulk', () => {
    it('should succeed with single order', async () => {
      const mockResponse = { requestId: 'req-1', results: [{ orderId: 111, isError: false }] };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.deliverBulk([111]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/dbw/orders/status/deliver'),
        { orders: [111] },
        expect.objectContaining({ rateLimitKey: 'orders-fbw.deliverBulkDBW' })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should succeed with 1000 orders (boundary)', async () => {
      const orderIds = Array.from({ length: 1000 }, (_, i) => i + 1);
      mockClient.post.mockResolvedValue({ requestId: 'req-2', results: [] });

      await expect(ordersFbw.deliverBulk(orderIds)).resolves.toBeDefined();
      expect(mockClient.post).toHaveBeenCalled();
    });

    it('should throw ValidationError on empty array', async () => {
      await expect(ordersFbw.deliverBulk([])).rejects.toThrow(ValidationError);
      await expect(ordersFbw.deliverBulk([])).rejects.toThrow(/empty/);
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when orderIds exceeds 1000', async () => {
      const tooMany = Array.from({ length: 1001 }, (_, i) => i + 1);
      await expect(ordersFbw.deliverBulk(tooMany)).rejects.toThrow(ValidationError);
      await expect(ordersFbw.deliverBulk(tooMany)).rejects.toThrow(/1000/);
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should propagate 409 MetaValidationFail with metaDetails on rejection', async () => {
      const metaDetails = [{ orderId: 123456, status: 'invalid', message: 'SGTIN format invalid' }];
      const error = new WBAPIError('MetaValidationFail', 409, {
        errors: [{ code: 409, detail: 'MetaValidationFail', metaDetails }],
      });
      mockClient.post.mockRejectedValue(error);

      await expect(ordersFbw.deliverBulk([123456])).rejects.toMatchObject({
        statusCode: 409,
        response: {
          errors: [
            expect.objectContaining({
              metaDetails: expect.arrayContaining([
                expect.objectContaining({ orderId: 123456, status: 'invalid' }),
              ]),
            }),
          ],
        },
      });
    });

    it('should honour rateLimitKey orders-fbw.deliverBulkDBW', async () => {
      mockClient.post.mockResolvedValue({ requestId: 'req-4', results: [] });

      await ordersFbw.deliverBulk([1, 2, 3]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbw.deliverBulkDBW' })
      );
    });
  });

  // ============================================================================
  // checkMetaValidation() — DBW pre-flight metadata validator (v3.11.0)
  // ============================================================================

  describe('checkMetaValidation', () => {
    it('should post correct body to correct URL and return parsed metaDetails array', async () => {
      const mockResponse = {
        metaDetails: [
          { orderId: 123456, status: 'valid', message: '' },
          { orderId: 234567, status: 'invalid', message: 'SGTIN format invalid' },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.checkMetaValidation({ orders: [123456, 234567] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/dbw/orders/meta/details'),
        { orders: [123456, 234567] },
        expect.objectContaining({ rateLimitKey: 'orders-fbw.checkMetaValidationDBW' })
      );
      expect(result).toEqual(mockResponse);
      expect(result.metaDetails).toHaveLength(2);
    });

    it('should honour rateLimitKey orders-fbw.checkMetaValidationDBW', async () => {
      mockClient.post.mockResolvedValue({ metaDetails: [] });

      await ordersFbw.checkMetaValidation({ orders: [111] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'orders-fbw.checkMetaValidationDBW' })
      );
    });

    it('should throw ValidationError on empty orders array', async () => {
      await expect(ordersFbw.checkMetaValidation({ orders: [] })).rejects.toThrow(ValidationError);
      await expect(ordersFbw.checkMetaValidation({ orders: [] })).rejects.toThrow(/empty/);
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should accept exactly 1000 orders (boundary)', async () => {
      const exactly1000 = Array.from({ length: 1000 }, (_, i) => i + 1);
      mockClient.post.mockResolvedValue({ metaDetails: [] });
      await expect(ordersFbw.checkMetaValidation({ orders: exactly1000 })).resolves.toBeDefined();
    });

    it('should throw ValidationError when orders array exceeds 1000 items', async () => {
      const tooMany = Array.from({ length: 1001 }, (_, i) => i + 1);
      await expect(ordersFbw.checkMetaValidation({ orders: tooMany })).rejects.toThrow(
        ValidationError
      );
      await expect(ordersFbw.checkMetaValidation({ orders: tooMany })).rejects.toThrow(/1000/);
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should parse mixed valid/invalid response — metaDetails[].status and .message accessible', async () => {
      const mockResponse = {
        metaDetails: [
          { orderId: 111, status: 'valid', message: '' },
          { orderId: 222, status: 'invalid', message: 'IMEI checksum failed' },
          { orderId: 333, status: 'invalid', message: 'UIN missing' },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbw.checkMetaValidation({ orders: [111, 222, 333] });

      expect(result.metaDetails[0].status).toBe('valid');
      expect(result.metaDetails[1].status).toBe('invalid');
      expect(result.metaDetails[1].message).toBe('IMEI checksum failed');
      expect(result.metaDetails[2].message).toBe('UIN missing');
    });
  });
});
