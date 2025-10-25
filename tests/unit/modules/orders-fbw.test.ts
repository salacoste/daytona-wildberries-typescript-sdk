/**
 * Unit tests for OrdersFBWModule
 *
 * Tests FBW (Fulfillment by Wildberries) module methods including:
 * - Warehouse information retrieval
 * - Acceptance coefficient checking
 * - Supply management and details
 * - Package information
 * - Transit tariff calculation
 *
 * @module tests/unit/modules/orders-fbw.test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFBWModule } from '../../../src/modules/orders-fbw';
import { ValidationError } from '../../../src/errors/validation-error';
import type { BaseClient } from '../../../src/client/base-client';
import type { Good } from '../../../src/types/orders-fbw.types';

describe('OrdersFBWModule', () => {
  let mockClient: { get: ReturnType<typeof vi.fn>; post: ReturnType<typeof vi.fn> };
  let ordersFBW: OrdersFBWModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
    };

    ordersFBW = new OrdersFBWModule(mockClient as unknown as BaseClient);
  });

  // ============================================================================
  // getWarehouses()
  // ============================================================================

  describe('getWarehouses', () => {
    it('should fetch warehouses list', async () => {
      const mockWarehouses = [
        {
          ID: 507,
          name: 'Коледино',
          address: 'МО, Подольск',
          workTime: 'Пн-Пт: 09:00-18:00',
          acceptsQr: true,
          isActive: true,
          isTransitActive: false,
        },
      ];

      mockClient.get.mockResolvedValue(mockWarehouses);

      const result = await ordersFBW.getWarehouses();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/warehouses',
        { rateLimitKey: 'ordersFBW.getWarehouses' }
      );
      expect(result).toEqual(mockWarehouses);
    });
  });

  // ============================================================================
  // getAcceptanceCoefficients()
  // ============================================================================

  describe('getAcceptanceCoefficients', () => {
    it('should fetch coefficients without warehouse filter', async () => {
      const mockCoefficients = [
        {
          date: '2024-01-25',
          coefficient: 0,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 1,
          storageCoef: 1.0,
          deliveryCoef: 1.0,
          isSortingCenter: false,
        },
      ];

      mockClient.get.mockResolvedValue(mockCoefficients);

      const result = await ordersFBW.getAcceptanceCoefficients();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients',
        { params: {}, rateLimitKey: 'ordersFBW.getAcceptanceCoefficients' }
      );
      expect(result).toEqual(mockCoefficients);
    });

    it('should fetch coefficients with warehouse filter', async () => {
      const mockCoefficients = [
        {
          date: '2024-01-25',
          coefficient: 1,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 1,
          storageCoef: 1.2,
          deliveryCoef: 1.0,
          isSortingCenter: false,
        },
      ];

      mockClient.get.mockResolvedValue(mockCoefficients);

      const result = await ordersFBW.getAcceptanceCoefficients('507,117501');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients',
        { params: { warehouseIDs: '507,117501' }, rateLimitKey: 'ordersFBW.getAcceptanceCoefficients' }
      );
      expect(result).toEqual(mockCoefficients);
    });
  });

  // ============================================================================
  // getAcceptanceOptions()
  // ============================================================================

  describe('getAcceptanceOptions', () => {
    it('should fetch acceptance options for goods', async () => {
      const goods = [
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

      const result = await ordersFBW.getAcceptanceOptions(goods);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        goods,
        { params: {}, rateLimitKey: 'ordersFBW.getAcceptanceOptions' }
      );
      expect(result).toEqual(mockOptions);
    });

    it('should pass warehouse ID parameter when provided', async () => {
      const goods = [{ barcode: '1234567891234', quantity: 10 }];
      const mockOptions = { result: [] };

      mockClient.post.mockResolvedValue(mockOptions);

      await ordersFBW.getAcceptanceOptions(goods, '507');

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
        goods,
        { params: { warehouseID: '507' }, rateLimitKey: 'ordersFBW.getAcceptanceOptions' }
      );
    });

    it('should throw ValidationError for empty goods array', async () => {
      await expect(ordersFBW.getAcceptanceOptions([])).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getAcceptanceOptions([])).rejects.toThrow('Goods array cannot be empty');
    });

    it('should throw ValidationError for too many goods (>5000)', async () => {
      const tooManyGoods: Good[] = Array(5001)
        .fill(null)
        .map(() => ({ barcode: '1234567891234', quantity: 1 }));

      await expect(ordersFBW.getAcceptanceOptions(tooManyGoods)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getAcceptanceOptions(tooManyGoods)).rejects.toThrow(
        'Maximum 5000 goods per request'
      );
    });

    it('should throw ValidationError for missing barcode', async () => {
      const invalidGoods: Good[] = [{ barcode: '', quantity: 10 }];

      await expect(ordersFBW.getAcceptanceOptions(invalidGoods)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getAcceptanceOptions(invalidGoods)).rejects.toThrow('missing barcode');
    });

    it('should throw ValidationError for invalid quantity (<1)', async () => {
      const invalidGoods = [{ barcode: '1234567891234', quantity: 0 }];

      await expect(ordersFBW.getAcceptanceOptions(invalidGoods)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getAcceptanceOptions(invalidGoods)).rejects.toThrow(
        'quantity must be 1-999999'
      );
    });

    it('should throw ValidationError for invalid quantity (>999999)', async () => {
      const invalidGoods = [{ barcode: '1234567891234', quantity: 1000000 }];

      await expect(ordersFBW.getAcceptanceOptions(invalidGoods)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getAcceptanceOptions(invalidGoods)).rejects.toThrow(
        'quantity must be 1-999999'
      );
    });
  });

  // ============================================================================
  // getTransitTariffs()
  // ============================================================================

  describe('getTransitTariffs', () => {
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

      const result = await ordersFBW.getTransitTariffs();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/transit-tariffs',
        { rateLimitKey: 'ordersFBW.getTransitTariffs' }
      );
      expect(result).toEqual(mockTariffs);
    });
  });

  // ============================================================================
  // getSupplies()
  // ============================================================================

  describe('getSupplies', () => {
    it('should fetch supplies with filters', async () => {
      const filters = {
        dates: [
          {
            from: '2024-01-01',
            till: '2024-12-31',
            type: 'createDate' as const,
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

      const result = await ordersFBW.getSupplies(filters, 100, 0);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies?limit=100&offset=0',
        filters,
        { rateLimitKey: 'ordersFBW.getSupplies' }
      );
      expect(result).toEqual(mockSupplies);
    });

    it('should use default pagination values', async () => {
      const filters = { dates: [], statusIDs: [] };
      mockClient.post.mockResolvedValue([]);

      await ordersFBW.getSupplies(filters);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies?limit=1000&offset=0',
        filters,
        { rateLimitKey: 'ordersFBW.getSupplies' }
      );
    });

    it('should throw ValidationError for invalid limit (<1)', async () => {
      const filters = { dates: [], statusIDs: [] };

      await expect(ordersFBW.getSupplies(filters, 0, 0)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplies(filters, 0, 0)).rejects.toThrow('Limit must be 1-1000');
    });

    it('should throw ValidationError for invalid limit (>1000)', async () => {
      const filters = { dates: [], statusIDs: [] };

      await expect(ordersFBW.getSupplies(filters, 1001, 0)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplies(filters, 1001, 0)).rejects.toThrow('Limit must be 1-1000');
    });

    it('should throw ValidationError for invalid offset (<0)', async () => {
      const filters = { dates: [], statusIDs: [] };

      await expect(ordersFBW.getSupplies(filters, 100, -1)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplies(filters, 100, -1)).rejects.toThrow('Offset must be >= 0');
    });

    it('should throw ValidationError for invalid date format', async () => {
      const filters = {
        dates: [{ from: 'invalid-date', till: '2024-12-31', type: 'createDate' as const }],
        statusIDs: [],
      };

      await expect(ordersFBW.getSupplies(filters)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplies(filters)).rejects.toThrow('Invalid from date format');
    });

    it('should throw ValidationError for invalid status ID', async () => {
      const filters = {
        dates: [],
        statusIDs: [7], // Invalid: must be 1-6
      };

      await expect(ordersFBW.getSupplies(filters)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplies(filters)).rejects.toThrow('Invalid status ID');
    });
  });

  // ============================================================================
  // getSupplyDetails()
  // ============================================================================

  describe('getSupplyDetails', () => {
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

      const result = await ordersFBW.getSupplyDetails(12345, false);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/12345?isPreorderID=false',
        { rateLimitKey: 'ordersFBW.getSupplyDetails' }
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

      const result = await ordersFBW.getSupplyDetails(67890, true);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/67890?isPreorderID=true',
        { rateLimitKey: 'ordersFBW.getSupplyDetails' }
      );
      expect(result).toEqual(mockDetails);
    });

    it('should throw ValidationError for invalid ID (<1)', async () => {
      await expect(ordersFBW.getSupplyDetails(0)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplyDetails(0)).rejects.toThrow('Supply/Preorder ID must be > 0');
    });
  });

  // ============================================================================
  // getSupplyGoods()
  // ============================================================================

  describe('getSupplyGoods', () => {
    it('should fetch supply goods with default pagination', async () => {
      const mockGoods = [
        {
          barcode: '1234567891234',
          vendorCode: 'PROD-001',
          nmID: 98765,
          needKiz: true,
          tnved: '6204620000',
          techsize: '42',
          color: 'Черный',
          quantity: 10,
          acceptedQuantity: 9,
          readyForSaleQuantity: 8,
          unloadingQuantity: 1,
        },
      ];

      mockClient.get.mockResolvedValue(mockGoods);

      const result = await ordersFBW.getSupplyGoods(12345);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/12345/goods?limit=100&offset=0&isPreorderID=false',
        { rateLimitKey: 'ordersFBW.getSupplyGoods' }
      );
      expect(result).toEqual(mockGoods);
    });

    it('should fetch supply goods with custom pagination', async () => {
      mockClient.get.mockResolvedValue([]);

      await ordersFBW.getSupplyGoods(12345, false, 50, 100);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/12345/goods?limit=50&offset=100&isPreorderID=false',
        { rateLimitKey: 'ordersFBW.getSupplyGoods' }
      );
    });

    it('should throw ValidationError for invalid ID', async () => {
      await expect(ordersFBW.getSupplyGoods(0)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplyGoods(0)).rejects.toThrow('Supply/Preorder ID must be > 0');
    });

    it('should throw ValidationError for invalid limit', async () => {
      await expect(ordersFBW.getSupplyGoods(12345, false, 0, 0)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplyGoods(12345, false, 0, 0)).rejects.toThrow(
        'Limit must be 1-1000'
      );
    });

    it('should throw ValidationError for invalid offset', async () => {
      await expect(ordersFBW.getSupplyGoods(12345, false, 100, -1)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplyGoods(12345, false, 100, -1)).rejects.toThrow(
        'Offset must be >= 0'
      );
    });
  });

  // ============================================================================
  // getSupplyPackage()
  // ============================================================================

  describe('getSupplyPackage', () => {
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

      const result = await ordersFBW.getSupplyPackage(12345);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/supplies/12345/package',
        { rateLimitKey: 'ordersFBW.getSupplyPackage' }
      );
      expect(result).toEqual(mockBoxes);
    });

    it('should throw ValidationError for invalid supply ID', async () => {
      await expect(ordersFBW.getSupplyPackage(0)).rejects.toThrow(ValidationError);
      await expect(ordersFBW.getSupplyPackage(0)).rejects.toThrow('Supply ID must be > 0');
    });
  });
});
