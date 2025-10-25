/**
 * Integration tests for Orders FBW Module
 *
 * Tests the OrdersFBW module with MSW (Mock Service Worker) to simulate
 * real HTTP interactions with the Wildberries API.
 *
 * Tests cover:
 * - Warehouse information retrieval
 * - Acceptance coefficient checking
 * - Acceptance options for goods
 * - Transit tariff calculation
 * - Supply creation and management
 * - Supply details and goods tracking
 * - Package information retrieval
 * - Complete FBW fulfillment workflow
 * - Error scenarios (validation, rate limits, invalid requests)
 *
 * @see {@link ../../../src/modules/orders-fbw/index OrdersFBWModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';
import { ValidationError } from '../../src/errors/validation-error';
import type { Good } from '../../src/types/orders-fbw.types';

// MSW server setup
const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('Orders FBW Integration Tests', () => {
  const sdk = new WildberriesSDK({ apiKey: 'test-api-key-integration' });

  // ============================================================================
  // Warehouse Information
  // ============================================================================

  describe('Warehouse Information Retrieval', () => {
    it('should retrieve available warehouses', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/warehouses', () => {
          return HttpResponse.json([
            {
              ID: 507,
              name: 'Коледино',
              address: 'МО, Подольск, деревня Коледино',
              workTime: 'Пн-Пт: 09:00-18:00',
              acceptsQr: true,
              isActive: true,
              isTransitActive: false,
            },
            {
              ID: 117501,
              name: 'Санкт-Петербург (Уткина Заводь)',
              address: 'г. Санкт-Петербург, Уткина Заводь',
              workTime: 'Пн-Вс: 08:00-20:00',
              acceptsQr: true,
              isActive: true,
              isTransitActive: true,
            },
          ]);
        })
      );

      const warehouses = await sdk.ordersFBW.getWarehouses();

      expect(warehouses).toBeInstanceOf(Array);
      expect(warehouses.length).toBeGreaterThan(0);
      expect(warehouses[0]).toHaveProperty('ID');
      expect(warehouses[0]).toHaveProperty('name');
      expect(warehouses[0]).toHaveProperty('address');
      expect(warehouses[0]).toHaveProperty('workTime');
      expect(warehouses[0]).toHaveProperty('acceptsQr');
      expect(warehouses[0].ID).toBe(507);
      expect(warehouses[0].name).toBe('Коледино');
    });
  });

  // ============================================================================
  // Acceptance Coefficients
  // ============================================================================

  describe('Acceptance Coefficient Checking', () => {
    it('should retrieve acceptance coefficients for all warehouses', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients', () => {
          return HttpResponse.json([
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
            {
              date: '2024-01-25',
              coefficient: 1,
              warehouseID: 117501,
              warehouseName: 'Санкт-Петербург',
              allowUnload: true,
              boxTypeName: 'Короба',
              boxTypeID: 1,
              storageCoef: 1.2,
              deliveryCoef: 1.0,
              isSortingCenter: false,
            },
          ]);
        })
      );

      const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

      expect(coefficients).toBeInstanceOf(Array);
      expect(coefficients.length).toBeGreaterThan(0);
      expect(coefficients[0]).toHaveProperty('date');
      expect(coefficients[0]).toHaveProperty('coefficient');
      expect(coefficients[0]).toHaveProperty('warehouseID');
      expect(coefficients[0]).toHaveProperty('warehouseName');
      expect(coefficients[0]).toHaveProperty('allowUnload');
    });

    it('should filter coefficients by warehouse IDs', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients', ({ request }) => {
          const url = new URL(request.url);
          const warehouseIDs = url.searchParams.get('warehouseIDs');

          expect(warehouseIDs).toBe('507,117501');

          return HttpResponse.json([
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
          ]);
        })
      );

      const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients('507,117501');

      expect(coefficients).toBeInstanceOf(Array);
      expect(coefficients.length).toBe(1);
      expect(coefficients[0].warehouseID).toBe(507);
    });
  });

  // ============================================================================
  // Acceptance Options
  // ============================================================================

  describe('Acceptance Options for Goods', () => {
    it('should retrieve acceptance options for goods', async () => {
      const goods: Good[] = [
        { barcode: '1234567891234', quantity: 10 },
        { barcode: '9876543210987', quantity: 5 },
      ];

      server.use(
        http.post('https://supplies-api.wildberries.ru/api/v1/acceptance/options', async ({ request }) => {
          const body = await request.json();
          expect(body).toEqual(goods);

          return HttpResponse.json({
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
              {
                barcode: '9876543210987',
                warehouses: [
                  {
                    warehouseID: 117501,
                    warehouseName: 'Санкт-Петербург',
                    canBox: true,
                    canMonopallet: true,
                    canSupersafe: false,
                  },
                ],
                isError: false,
              },
            ],
          });
        })
      );

      const options = await sdk.ordersFBW.getAcceptanceOptions(goods);

      expect(options.result).toBeInstanceOf(Array);
      expect(options.result.length).toBe(2);
      expect(options.result[0].barcode).toBe('1234567891234');
      expect(options.result[0].warehouses).toBeInstanceOf(Array);
      expect(options.result[0].warehouses[0]).toHaveProperty('warehouseID');
      expect(options.result[0].warehouses[0]).toHaveProperty('canBox');
      expect(options.result[0].warehouses[0]).toHaveProperty('canMonopallet');
    });

    it('should filter acceptance options by warehouse ID', async () => {
      const goods: Good[] = [{ barcode: '1234567891234', quantity: 10 }];

      server.use(
        http.post('https://supplies-api.wildberries.ru/api/v1/acceptance/options', ({ request }) => {
          const url = new URL(request.url);
          const warehouseID = url.searchParams.get('warehouseID');

          expect(warehouseID).toBe('507');

          return HttpResponse.json({
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
          });
        })
      );

      const options = await sdk.ordersFBW.getAcceptanceOptions(goods, '507');

      expect(options.result.length).toBe(1);
      expect(options.result[0].warehouses[0].warehouseID).toBe(507);
    });

    it('should handle validation errors for goods', async () => {
      // Empty array
      await expect(sdk.ordersFBW.getAcceptanceOptions([])).rejects.toThrow(ValidationError);

      // Too many goods (>5000)
      const tooManyGoods: Good[] = Array(5001)
        .fill(null)
        .map(() => ({ barcode: '1234567891234', quantity: 1 }));
      await expect(sdk.ordersFBW.getAcceptanceOptions(tooManyGoods)).rejects.toThrow(ValidationError);

      // Missing barcode
      const invalidGoods: Good[] = [{ barcode: '', quantity: 10 }];
      await expect(sdk.ordersFBW.getAcceptanceOptions(invalidGoods)).rejects.toThrow(ValidationError);

      // Invalid quantity
      const badQuantity: Good[] = [{ barcode: '1234567891234', quantity: 0 }];
      await expect(sdk.ordersFBW.getAcceptanceOptions(badQuantity)).rejects.toThrow(ValidationError);
    });
  });

  // ============================================================================
  // Transit Tariffs
  // ============================================================================

  describe('Transit Tariff Calculation', () => {
    it('should retrieve transit tariffs', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/transit-tariffs', () => {
          return HttpResponse.json([
            {
              transitWarehouseName: 'Москва (транзит)',
              destinationWarehouseName: 'Санкт-Петербург',
              activeFrom: '2024-01-01',
              boxTariff: [
                { from: 0, to: 100, value: 5.5 },
                { from: 100, to: 500, value: 4.75 },
                { from: 500, to: 1000, value: 4.0 },
              ],
              palletTariff: 1200.0,
            },
            {
              transitWarehouseName: 'Санкт-Петербург (транзит)',
              destinationWarehouseName: 'Екатеринбург',
              activeFrom: '2024-01-01',
              boxTariff: [
                { from: 0, to: 100, value: 7.5 },
                { from: 100, to: 500, value: 6.75 },
              ],
              palletTariff: 1500.0,
            },
          ]);
        })
      );

      const tariffs = await sdk.ordersFBW.getTransitTariffs();

      expect(tariffs).toBeInstanceOf(Array);
      expect(tariffs.length).toBeGreaterThan(0);

      const firstTariff = tariffs[0];
      expect(firstTariff).toHaveProperty('transitWarehouseName');
      expect(firstTariff).toHaveProperty('destinationWarehouseName');
      expect(firstTariff).toHaveProperty('activeFrom');
      expect(firstTariff).toHaveProperty('boxTariff');
      expect(firstTariff).toHaveProperty('palletTariff');

      if (firstTariff.boxTariff && firstTariff.boxTariff.length > 0) {
        expect(firstTariff.boxTariff).toBeInstanceOf(Array);
        expect(firstTariff.boxTariff.length).toBeGreaterThan(0);

        const firstBoxTariff = firstTariff.boxTariff[0];
        expect(firstBoxTariff).toHaveProperty('from');
        expect(firstBoxTariff).toHaveProperty('to');
        expect(firstBoxTariff).toHaveProperty('value');
      }
    });
  });

  // ============================================================================
  // Supply Management
  // ============================================================================

  describe('Supply Creation and Listing', () => {
    it('should retrieve supplies with filters and pagination', async () => {
      server.use(
        http.post('https://supplies-api.wildberries.ru/api/v1/supplies', async ({ request }) => {
          const url = new URL(request.url);
          const limit = url.searchParams.get('limit');
          const offset = url.searchParams.get('offset');

          expect(limit).toBe('100');
          expect(offset).toBe('0');

          const body = await request.json();
          expect(body).toHaveProperty('dates');
          expect(body).toHaveProperty('statusIDs');

          return HttpResponse.json([
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
            {
              phone: '+79007654321',
              supplyID: 54321,
              preorderID: 98765,
              createDate: '2024-01-16T11:00:00Z',
              supplyDate: '2024-01-21',
              factDate: '',
              updatedDate: '2024-01-21T09:00:00Z',
              statusID: 2,
              statusName: 'Запланирована',
            },
          ]);
        })
      );

      const filters = {
        dates: [
          {
            from: '2024-01-01',
            till: '2024-12-31',
            type: 'createDate' as const,
          },
        ],
        statusIDs: [2, 5],
      };

      const supplies = await sdk.ordersFBW.getSupplies(filters, 100, 0);

      expect(supplies).toBeInstanceOf(Array);
      expect(supplies.length).toBe(2);
      expect(supplies[0]).toHaveProperty('supplyID');
      expect(supplies[0]).toHaveProperty('preorderID');
      expect(supplies[0]).toHaveProperty('statusID');
      expect(supplies[0]).toHaveProperty('statusName');
      expect(supplies[0].statusID).toBe(5);
      expect(supplies[1].statusID).toBe(2);
    });

    it('should use default pagination values', async () => {
      server.use(
        http.post('https://supplies-api.wildberries.ru/api/v1/supplies', ({ request }) => {
          const url = new URL(request.url);
          const limit = url.searchParams.get('limit');
          const offset = url.searchParams.get('offset');

          expect(limit).toBe('1000');
          expect(offset).toBe('0');

          return HttpResponse.json([]);
        })
      );

      const filters = { dates: [], statusIDs: [] };
      const supplies = await sdk.ordersFBW.getSupplies(filters);

      expect(supplies).toBeInstanceOf(Array);
    });

    it('should validate pagination parameters', async () => {
      const filters = { dates: [], statusIDs: [] };

      // Invalid limit
      await expect(sdk.ordersFBW.getSupplies(filters, 0, 0)).rejects.toThrow(ValidationError);
      await expect(sdk.ordersFBW.getSupplies(filters, 1001, 0)).rejects.toThrow(ValidationError);

      // Invalid offset
      await expect(sdk.ordersFBW.getSupplies(filters, 100, -1)).rejects.toThrow(ValidationError);
    });

    it('should validate date formats', async () => {
      const filters = {
        dates: [{ from: 'invalid-date', till: '2024-12-31', type: 'createDate' as const }],
        statusIDs: [],
      };

      await expect(sdk.ordersFBW.getSupplies(filters)).rejects.toThrow(ValidationError);
    });

    it('should validate status IDs', async () => {
      const filters = {
        dates: [],
        statusIDs: [7], // Invalid: must be 1-6
      };

      await expect(sdk.ordersFBW.getSupplies(filters)).rejects.toThrow(ValidationError);
    });
  });

  // ============================================================================
  // Supply Details
  // ============================================================================

  describe('Supply Details Retrieval', () => {
    it('should retrieve supply details by supply ID', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/12345', ({ request }) => {
          const url = new URL(request.url);
          const isPreorderID = url.searchParams.get('isPreorderID');

          expect(isPreorderID).toBe('false');

          return HttpResponse.json({
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
          });
        })
      );

      const details = await sdk.ordersFBW.getSupplyDetails(12345, false);

      expect(details).toHaveProperty('supplyID');
      expect(details).toHaveProperty('preorderID');
      expect(details).toHaveProperty('warehouseID');
      expect(details).toHaveProperty('warehouseName');
      expect(details).toHaveProperty('quantity');
      expect(details).toHaveProperty('acceptedQuantity');
      expect(details).toHaveProperty('acceptanceCost');
      expect(details.supplyID).toBe(12345);
      expect(details.warehouseID).toBe(507);
    });

    it('should retrieve supply details by preorder ID', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/67890', ({ request }) => {
          const url = new URL(request.url);
          const isPreorderID = url.searchParams.get('isPreorderID');

          expect(isPreorderID).toBe('true');

          return HttpResponse.json({
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
          });
        })
      );

      const details = await sdk.ordersFBW.getSupplyDetails(67890, true);

      expect(details.preorderID).toBe(67890);
    });

    it('should validate supply/preorder ID', async () => {
      await expect(sdk.ordersFBW.getSupplyDetails(0)).rejects.toThrow(ValidationError);
      await expect(sdk.ordersFBW.getSupplyDetails(-1)).rejects.toThrow(ValidationError);
    });
  });

  // ============================================================================
  // Supply Goods
  // ============================================================================

  describe('Supply Goods Retrieval', () => {
    it('should retrieve goods for a supply with default pagination', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/12345/goods', ({ request }) => {
          const url = new URL(request.url);
          const limit = url.searchParams.get('limit');
          const offset = url.searchParams.get('offset');
          const isPreorderID = url.searchParams.get('isPreorderID');

          expect(limit).toBe('100');
          expect(offset).toBe('0');
          expect(isPreorderID).toBe('false');

          return HttpResponse.json([
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
            {
              barcode: '9876543210987',
              vendorCode: 'PROD-002',
              nmID: 98766,
              needKiz: false,
              tnved: '6204620001',
              techsize: '44',
              color: 'Белый',
              quantity: 5,
              acceptedQuantity: 5,
              readyForSaleQuantity: 5,
              unloadingQuantity: 0,
            },
          ]);
        })
      );

      const goods = await sdk.ordersFBW.getSupplyGoods(12345);

      expect(goods).toBeInstanceOf(Array);
      expect(goods.length).toBe(2);
      expect(goods[0]).toHaveProperty('barcode');
      expect(goods[0]).toHaveProperty('vendorCode');
      expect(goods[0]).toHaveProperty('nmID');
      expect(goods[0]).toHaveProperty('quantity');
      expect(goods[0]).toHaveProperty('acceptedQuantity');
      expect(goods[0].barcode).toBe('1234567891234');
    });

    it('should retrieve goods with custom pagination', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/12345/goods', ({ request }) => {
          const url = new URL(request.url);
          const limit = url.searchParams.get('limit');
          const offset = url.searchParams.get('offset');

          expect(limit).toBe('50');
          expect(offset).toBe('100');

          return HttpResponse.json([]);
        })
      );

      const goods = await sdk.ordersFBW.getSupplyGoods(12345, false, 50, 100);

      expect(goods).toBeInstanceOf(Array);
    });

    it('should validate supply ID and pagination', async () => {
      // Invalid ID
      await expect(sdk.ordersFBW.getSupplyGoods(0)).rejects.toThrow(ValidationError);

      // Invalid limit
      await expect(sdk.ordersFBW.getSupplyGoods(12345, false, 0, 0)).rejects.toThrow(ValidationError);

      // Invalid offset
      await expect(sdk.ordersFBW.getSupplyGoods(12345, false, 100, -1)).rejects.toThrow(ValidationError);
    });
  });

  // ============================================================================
  // Supply Package
  // ============================================================================

  describe('Supply Package Information', () => {
    it('should retrieve package information for a supply', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/12345/package', () => {
          return HttpResponse.json([
            {
              packageCode: 'WB-PKG-12345',
              quantity: 15,
              barcodes: [
                { barcode: '1234567891234', quantity: 10 },
                { barcode: '9876543210987', quantity: 5 },
              ],
            },
            {
              packageCode: 'WB-PKG-12346',
              quantity: 8,
              barcodes: [{ barcode: '1111222233334', quantity: 8 }],
            },
          ]);
        })
      );

      const packages = await sdk.ordersFBW.getSupplyPackage(12345);

      expect(packages).toBeInstanceOf(Array);
      expect(packages.length).toBe(2);
      expect(packages[0]).toHaveProperty('packageCode');
      expect(packages[0]).toHaveProperty('quantity');
      expect(packages[0]).toHaveProperty('barcodes');
      expect(packages[0].barcodes).toBeInstanceOf(Array);
      expect(packages[0].barcodes[0]).toHaveProperty('barcode');
      expect(packages[0].barcodes[0]).toHaveProperty('quantity');
      expect(packages[0].packageCode).toBe('WB-PKG-12345');
      expect(packages[0].quantity).toBe(15);
    });

    it('should validate supply ID', async () => {
      await expect(sdk.ordersFBW.getSupplyPackage(0)).rejects.toThrow(ValidationError);
      await expect(sdk.ordersFBW.getSupplyPackage(-1)).rejects.toThrow(ValidationError);
    });
  });

  // ============================================================================
  // Complete FBW Fulfillment Workflow
  // ============================================================================

  describe('Complete FBW Fulfillment Workflow', () => {
    it('should complete full FBW supply planning and management workflow', async () => {
      server.use(
        // Step 1: Get available warehouses
        http.get('https://supplies-api.wildberries.ru/api/v1/warehouses', () => {
          return HttpResponse.json([
            {
              ID: 507,
              name: 'Коледино',
              address: 'МО, Подольск',
              workTime: 'Пн-Пт: 09:00-18:00',
              acceptsQr: true,
              isActive: true,
              isTransitActive: false,
            },
          ]);
        }),

        // Step 2: Get acceptance coefficients
        http.get('https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients', () => {
          return HttpResponse.json([
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
          ]);
        }),

        // Step 3: Get acceptance options for goods
        http.post('https://supplies-api.wildberries.ru/api/v1/acceptance/options', () => {
          return HttpResponse.json({
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
          });
        }),

        // Step 4: Get supplies list (empty initially)
        http.post('https://supplies-api.wildberries.ru/api/v1/supplies', () => {
          return HttpResponse.json([]);
        }),

        // Step 5: Get supply details
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/12345', () => {
          return HttpResponse.json({
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
            quantity: 10,
            acceptedQuantity: 10,
            readyForSaleQuantity: 10,
            acceptanceCost: 150.0,
            storageCoefficient: 1.0,
            deliveryCoefficient: 1.0,
          });
        }),

        // Step 6: Get supply goods
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/12345/goods', () => {
          return HttpResponse.json([
            {
              barcode: '1234567891234',
              vendorCode: 'PROD-001',
              nmID: 98765,
              needKiz: true,
              tnved: '6204620000',
              techsize: '42',
              color: 'Черный',
              quantity: 10,
              acceptedQuantity: 10,
              readyForSaleQuantity: 10,
              unloadingQuantity: 0,
            },
          ]);
        }),

        // Step 7: Get package information
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/12345/package', () => {
          return HttpResponse.json([
            {
              packageCode: 'WB-PKG-12345',
              quantity: 10,
              barcodes: [{ barcode: '1234567891234', quantity: 10 }],
            },
          ]);
        })
      );

      // Execute complete workflow
      // Step 1: Get warehouses
      const warehouses = await sdk.ordersFBW.getWarehouses();
      expect(warehouses.length).toBeGreaterThan(0);
      const targetWarehouse = warehouses[0];
      expect(targetWarehouse.ID).toBe(507);

      // Step 2: Check acceptance coefficients
      const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
      expect(coefficients.length).toBeGreaterThan(0);
      const warehouseCoef = coefficients.find((c) => c.warehouseID === targetWarehouse.ID);
      expect(warehouseCoef).toBeDefined();
      expect(warehouseCoef?.allowUnload).toBe(true);

      // Step 3: Check acceptance options for planned goods
      const goods: Good[] = [{ barcode: '1234567891234', quantity: 10 }];
      const options = await sdk.ordersFBW.getAcceptanceOptions(goods);
      expect(options.result.length).toBe(1);
      expect(options.result[0].isError).toBe(false);
      expect(options.result[0].warehouses.length).toBeGreaterThan(0);

      // Step 4: Check existing supplies
      const filters = {
        dates: [
          {
            from: '2024-01-01',
            till: '2024-12-31',
            type: 'createDate' as const,
          },
        ],
        statusIDs: [],
      };
      const existingSupplies = await sdk.ordersFBW.getSupplies(filters);
      expect(existingSupplies).toBeInstanceOf(Array);

      // Step 5: Get supply details (simulate existing supply)
      const supplyDetails = await sdk.ordersFBW.getSupplyDetails(12345);
      expect(supplyDetails.supplyID).toBe(12345);
      expect(supplyDetails.warehouseID).toBe(507);
      expect(supplyDetails.statusName).toBe('Принято');

      // Step 6: Get goods in supply
      const supplyGoods = await sdk.ordersFBW.getSupplyGoods(12345);
      expect(supplyGoods.length).toBe(1);
      expect(supplyGoods[0].barcode).toBe('1234567891234');
      expect(supplyGoods[0].acceptedQuantity).toBe(10);

      // Step 7: Get package information
      const packages = await sdk.ordersFBW.getSupplyPackage(12345);
      expect(packages.length).toBe(1);
      expect(packages[0].packageCode).toBe('WB-PKG-12345');
      expect(packages[0].quantity).toBe(10);
    });
  });

  // ============================================================================
  // Error Handling
  // ============================================================================

  describe('Error Handling', () => {
    it('should handle 429 rate limit error', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/warehouses', () => {
          return HttpResponse.json(
            { error: 'Rate limit exceeded' },
            { status: 429, headers: { 'Retry-After': '10' } }
          );
        })
      );

      await expect(sdk.ordersFBW.getWarehouses()).rejects.toThrow();
    });

    it('should handle 400 bad request error', async () => {
      server.use(
        http.get('https://supplies-api.wildberries.ru/api/v1/supplies/99999', () => {
          return HttpResponse.json({ error: 'Supply not found' }, { status: 400 });
        })
      );

      await expect(sdk.ordersFBW.getSupplyDetails(99999)).rejects.toThrow();
    });

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    it(
      'should handle 500 server error with retries',
      async () => {
        // Create SDK with minimal retry config to avoid test timeout
        const testSdk = new WildberriesSDK({
          apiKey: 'test-api-key-integration',
          retryConfig: {
            maxRetries: 1, // Reduced for test performance
            retryDelay: 100,
            exponentialBackoff: false,
          },
        });

        server.use(
          http.get('https://supplies-api.wildberries.ru/api/v1/warehouses', () => {
            return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
          })
        );

        await expect(testSdk.ordersFBW.getWarehouses()).rejects.toThrow();
      },
      { timeout: 15000 }
    ); // 500 errors trigger retry logic; custom SDK config reduces retry count for test performance
  });
});
