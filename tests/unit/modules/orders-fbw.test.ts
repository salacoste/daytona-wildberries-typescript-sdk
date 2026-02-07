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
});
