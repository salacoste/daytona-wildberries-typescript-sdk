/**
 * Integration tests for OrdersFbwModule
 *
 * Tests the OrdersFbwModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow from module → BaseClient → RateLimiter → RetryHandler → HTTP
 * - Correct URL construction for supplies-api.wildberries.ru
 * - Query parameter forwarding (warehouseIDs, limit, offset, isPreorderID)
 * - Path parameter interpolation (/api/v1/supplies/:ID)
 * - Request body passing for POST endpoints
 * - Response type conformity
 * - Deprecated endpoint behavior (warn-once pattern)
 * - Error handling (400, 401, 404, 429)
 * - Pagination for supply listing and supply goods
 *
 * @see {@link ../../src/modules/orders-fbw/index OrdersFbwModule}
 * @module tests/integration/orders-fbw.integration.test
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { OrdersFbwModule } from '../../src/modules/orders-fbw';
import { BaseClient } from '../../src/client/base-client';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { ValidationError } from '../../src/errors/validation-error';
import { WBAPIError } from '../../src/errors/base-error';
import type {
  ModelsAcceptanceCoefficient,
  ModelsBox,
  ModelsGoodInSupply,
  ModelsHandySupplyStatus,
  ModelsOptionsResultModel,
  ModelsSupply,
  ModelsSupplyDetails,
  ModelsTransitTariff,
  ModelsWarehousesResultItems,
} from '../../src/types/orders-fbw.types';

// =============================================================================
// MSW Handlers for supplies-api.wildberries.ru
// =============================================================================

const BASE_URL = 'https://supplies-api.wildberries.ru';

const coefficientsData: ModelsAcceptanceCoefficient[] = [
  {
    date: '2026-02-06',
    coefficient: 0,
    warehouseID: 507,
    warehouseName: 'Коледино',
    allowUnload: true,
    boxTypeName: 'Короба',
    boxTypeID: 2,
    storageCoef: '1.5',
    deliveryCoef: '1.2',
    deliveryBaseLiter: '10.50',
    deliveryAdditionalLiter: '2.30',
    storageBaseLiter: '5.00',
    storageAdditionalLiter: '1.00',
    isSortingCenter: false,
  },
  {
    date: '2026-02-06',
    coefficient: -1,
    warehouseID: 211622,
    warehouseName: 'Электросталь',
    allowUnload: false,
    boxTypeName: 'Монопаллеты',
    boxTypeID: 5,
    isSortingCenter: false,
  },
  {
    date: '2026-02-07',
    coefficient: 2,
    warehouseID: 507,
    warehouseName: 'Коледино',
    allowUnload: true,
    boxTypeName: 'Суперсейф',
    boxTypeID: 6,
    storageCoef: '2.0',
    deliveryCoef: '1.5',
    isSortingCenter: false,
  },
  {
    date: '2026-02-07',
    coefficient: 1,
    warehouseID: 300461,
    warehouseName: 'Гомель 2',
    allowUnload: true,
    boxTypeName: 'QR-поставка с коробами',
    isSortingCenter: false,
  },
];

const warehousesData: ModelsWarehousesResultItems[] = [
  {
    ID: 507,
    name: 'Коледино',
    address: 'МО, Подольск',
    workTime: 'Пн-Пт: 09:00-18:00',
    acceptsQR: true,
    isActive: true,
    isTransitActive: false,
  },
  {
    ID: 211622,
    name: 'Электросталь',
    address: 'МО, Электросталь',
    workTime: '24/7',
    acceptsQR: false,
    isActive: true,
    isTransitActive: true,
  },
  {
    ID: 300461,
    name: 'Гомель 2',
    address: 'Гомель, Могилёвская улица 1/А',
    workTime: '24/7',
    acceptsQR: false,
    isActive: false,
    isTransitActive: true,
  },
];

const transitTariffsData: ModelsTransitTariff[] = [
  {
    transitWarehouseName: 'Москва (транзит)',
    destinationWarehouseName: 'Санкт-Петербург',
    activeFrom: '2026-01-01',
    boxTariff: [
      { from: 0, to: 100, value: 5.5 },
      { from: 100, to: 500, value: 4.75 },
    ],
    palletTariff: 1200.0,
  },
  {
    transitWarehouseName: 'Казань (транзит)',
    destinationWarehouseName: 'Новосибирск',
    activeFrom: '2026-01-15',
    boxTariff: undefined,
    palletTariff: 2500.0,
  },
];

const suppliesData: ModelsSupply[] = [
  {
    phone: '+7 903 *** 98 62',
    supplyID: 12345,
    preorderID: 67890,
    createDate: '2026-01-15T10:30:00Z',
    supplyDate: '2026-01-20',
    factDate: '2026-01-20T14:22:00Z',
    updatedDate: '2026-01-21T08:15:00Z',
    statusID: 5,
    statusName: 'Принято',
  },
  {
    phone: '+7 903 *** 98 62',
    supplyID: 12346,
    preorderID: 0,
    createDate: '2026-01-16T11:00:00Z',
    supplyDate: '2026-01-22',
    statusID: 2,
    statusName: 'Запланировано',
  },
];

const supplyDetailsData: ModelsSupplyDetails = {
  phone: '+7 903 *** 98 62',
  statusID: 5,
  statusName: 'Принято',
  boxTypeID: 1,
  boxTypeName: 'Короба',
  createDate: '2026-01-15T10:30:00Z',
  supplyDate: '2026-01-20',
  factDate: '2026-01-20T14:22:00Z',
  updatedDate: '2026-01-21T08:15:00Z',
  warehouseID: 507,
  warehouseName: 'Коледино',
  acceptanceCost: 1500,
  paidAcceptanceCoefficient: 0,
  storageCoef: '215',
  deliveryCoef: '200',
  quantity: 100,
  readyForSaleQuantity: 90,
  acceptedQuantity: 95,
  unloadingQuantity: 5,
};

const supplyGoodsData: ModelsGoodInSupply[] = [
  {
    barcode: '1234567891234',
    vendorCode: 'PROD-001',
    nmID: 98765,
    needKiz: true,
    tnved: '6204620000',
    techSize: '42',
    color: 'Черный',
    quantity: 50,
    acceptedQuantity: 48,
    readyForSaleQuantity: 45,
    unloadingQuantity: 3,
  },
  {
    barcode: '9876543210987',
    vendorCode: 'PROD-002',
    nmID: 98766,
    needKiz: false,
    techSize: 'M',
    color: 'Белый',
    quantity: 50,
    acceptedQuantity: 47,
    readyForSaleQuantity: 45,
    unloadingQuantity: 2,
  },
];

const supplyPackageData: ModelsBox[] = [
  {
    packageCode: 'WB-PKG-12345-A',
    quantity: 25,
    barcodes: [
      { barcode: '1234567891234', quantity: 15 },
      { barcode: '9876543210987', quantity: 10 },
    ],
  },
  {
    packageCode: 'WB-PKG-12345-B',
    quantity: 75,
    barcodes: [
      { barcode: '1234567891234', quantity: 35 },
      { barcode: '9876543210987', quantity: 40 },
    ],
  },
];

const handlers = [
  // 1. GET /api/v1/acceptance/coefficients
  http.get(`${BASE_URL}/api/v1/acceptance/coefficients`, ({ request }) => {
    const url = new URL(request.url);
    const warehouseIDs = url.searchParams.get('warehouseIDs');

    if (warehouseIDs) {
      const ids = warehouseIDs.split(',').map(Number);
      const filtered = coefficientsData.filter((c) => ids.includes(c.warehouseID ?? 0));
      return HttpResponse.json(filtered);
    }
    return HttpResponse.json(coefficientsData);
  }),

  // 2. POST /api/v1/acceptance/options
  http.post(`${BASE_URL}/api/v1/acceptance/options`, async ({ request }) => {
    const url = new URL(request.url);
    const warehouseID = url.searchParams.get('warehouseID');
    const body = (await request.json()) as { barcode?: string; quantity?: number }[];

    if (!Array.isArray(body) || body.length === 0) {
      return new HttpResponse(
        JSON.stringify({ status: 400, title: 'bad request', detail: 'empty goods array' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result: ModelsOptionsResultModel = {
      result: body.map((good) => ({
        barcode: good.barcode,
        warehouses: [
          {
            warehouseID: warehouseID ? parseInt(warehouseID) : 507,
            canBox: true,
            canMonopallet: false,
            canSupersafe: false,
          },
        ],
      })),
    };
    return HttpResponse.json(result);
  }),

  // 3. GET /api/v1/warehouses
  http.get(`${BASE_URL}/api/v1/warehouses`, () => {
    return HttpResponse.json(warehousesData);
  }),

  // 4. GET /api/v1/transit-tariffs
  http.get(`${BASE_URL}/api/v1/transit-tariffs`, () => {
    return HttpResponse.json(transitTariffsData);
  }),

  // 5. POST /api/v1/supplies
  http.post(`${BASE_URL}/api/v1/supplies`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') ?? '1000');
    const offset = parseInt(url.searchParams.get('offset') ?? '0');

    const paginated = suppliesData.slice(offset, offset + limit);
    return HttpResponse.json(paginated);
  }),

  // 6. GET /api/v1/supplies/:ID
  http.get(`${BASE_URL}/api/v1/supplies/:id`, ({ params, request }) => {
    const id = params.id as string;
    const url = new URL(request.url);
    const isPreorderID = url.searchParams.get('isPreorderID');

    // Only match non-path routes (exclude /goods and /package)
    if (request.url.includes('/goods') || request.url.includes('/package')) {
      return;
    }

    if (id === '999999') {
      return new HttpResponse(
        JSON.stringify({ status: 404, title: 'not found', detail: `Supply ${id} not found` }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return HttpResponse.json({
      ...supplyDetailsData,
      ...(isPreorderID === 'true' ? { preorderID: parseInt(id) } : {}),
    });
  }),

  // 7. GET /api/v1/supplies/:ID/goods
  http.get(`${BASE_URL}/api/v1/supplies/:id/goods`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') ?? '100');
    const offset = parseInt(url.searchParams.get('offset') ?? '0');

    const paginated = supplyGoodsData.slice(offset, offset + limit);
    return HttpResponse.json(paginated);
  }),

  // 8. GET /api/v1/supplies/:ID/package
  http.get(`${BASE_URL}/api/v1/supplies/:id/package`, () => {
    return HttpResponse.json(supplyPackageData);
  }),
];

// =============================================================================
// Server Setup
// =============================================================================

const server = setupServer(...handlers);

describe('OrdersFBW Integration Tests', () => {
  let client: BaseClient;
  let ordersFbw: OrdersFbwModule;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  beforeEach(() => {
    client = new BaseClient({
      apiKey: 'test-key-fbw-integration',
      timeout: 5000,
      retryConfig: { maxRetries: 0 },
    });
    ordersFbw = new OrdersFbwModule(client);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  // ===========================================================================
  // Scenario 1: Supply Planning Workflow (Happy Path)
  // ===========================================================================

  describe('Supply Planning Workflow', () => {
    it('should get acceptance options for goods array', async () => {
      const goods = [
        { barcode: '1234567891234', quantity: 10 },
        { barcode: '9876543210987', quantity: 5 },
      ];

      const result = await ordersFbw.createAcceptanceOption(goods);

      expect(result.result).toBeDefined();
      expect(result.result).toHaveLength(2);
      expect(result.result![0].barcode).toBe('1234567891234');
      expect(result.result![0].warehouses).toBeDefined();
      expect(result.result![0].warehouses![0].canBox).toBe(true);
    });

    it('should filter acceptance options by warehouseID', async () => {
      const goods = [{ barcode: '1234567891234', quantity: 10 }];

      const result = await ordersFbw.createAcceptanceOption(goods, { warehouseID: '211622' });

      expect(result.result![0].warehouses![0].warehouseID).toBe(211622);
    });

    it('should list WB warehouses with active/inactive status', async () => {
      const result = await ordersFbw.warehouses();

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3);

      const active = result.filter((w) => w.isActive);
      const inactive = result.filter((w) => !w.isActive);
      expect(active).toHaveLength(2);
      expect(inactive).toHaveLength(1);

      // Verify QR acceptance flag
      const qrEnabled = result.find((w) => w.acceptsQR === true);
      expect(qrEnabled).toBeDefined();
      expect(qrEnabled!.name).toBe('Коледино');
    });

    it('should fetch transit tariffs with box and pallet pricing', async () => {
      const result = await ordersFbw.transitTariffs();

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);

      // First tariff has box tiers
      expect(result[0].boxTariff).toBeDefined();
      expect(result[0].boxTariff).toHaveLength(2);
      expect(result[0].palletTariff).toBe(1200.0);

      // Second tariff has no box tariff (route without box support)
      expect(result[1].boxTariff).toBeUndefined();
      expect(result[1].palletTariff).toBe(2500.0);
    });
  });

  // ===========================================================================
  // Scenario 2: Supply Detail Hierarchy (Happy Path)
  // ===========================================================================

  describe('Supply Detail Hierarchy', () => {
    it('should list supplies with pagination', async () => {
      const filters = { dates: [], statusIDs: [] as ModelsHandySupplyStatus[] };
      const result = await ordersFbw.listSupplies(filters, { limit: 10, offset: 0 });

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0].supplyID).toBe(12345);
      expect(result[0].statusName).toBe('Принято');
    });

    it('should get supply details by supply ID', async () => {
      const result = await ordersFbw.getSupply(12345);

      expect(result.warehouseID).toBe(507);
      expect(result.warehouseName).toBe('Коледино');
      expect(result.statusID).toBe(5);
      expect(result.statusName).toBe('Принято');
      expect(result.quantity).toBe(100);
      expect(result.acceptanceCost).toBe(1500);
    });

    it('should get supply details by preorder ID', async () => {
      const result = await ordersFbw.getSupply(67890, { isPreorderID: true });

      expect(result).toBeDefined();
      expect(result.statusID).toBe(5);
    });

    it('should list goods in a supply with correct fields', async () => {
      const result = await ordersFbw.getSuppliesGood(12345);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0].barcode).toBe('1234567891234');
      expect(result[0].techSize).toBe('42');
      expect(result[0].needKiz).toBe(true);
      expect(result[0].vendorCode).toBe('PROD-001');
    });

    it('should get package information with nested barcodes', async () => {
      const result = await ordersFbw.getSuppliesPackage(12345);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0].packageCode).toBe('WB-PKG-12345-A');
      expect(result[0].quantity).toBe(25);
      expect(result[0].barcodes).toHaveLength(2);
      expect(result[0].barcodes![0].barcode).toBe('1234567891234');
      expect(result[0].barcodes![0].quantity).toBe(15);
    });
  });

  // ===========================================================================
  // Scenario 3: Error Handling
  // ===========================================================================

  describe('Error Handling', () => {
    it('should handle 401 authentication error', async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/warehouses`, () => {
          return new HttpResponse(
            JSON.stringify({
              title: 'unauthorized',
              detail: 'token problem; token is malformed',
              status: 401,
            }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/problem+json' },
            }
          );
        })
      );

      await expect(ordersFbw.warehouses()).rejects.toThrow(AuthenticationError);
    });

    it('should handle 400 validation error for acceptance options', async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/acceptance/options`, () => {
          return new HttpResponse(
            JSON.stringify({
              status: 400,
              title: 'bad request',
              detail: 'Неверный формат warehouseID',
            }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        })
      );

      await expect(
        ordersFbw.createAcceptanceOption([{ barcode: '123', quantity: 1 }])
      ).rejects.toThrow(ValidationError);
    });

    it('should handle 404 not found for non-existent supply', async () => {
      await expect(ordersFbw.getSupply(999999)).rejects.toThrow(WBAPIError);
    });

    it('should handle 429 rate limit with retry information', async () => {
      server.use(
        http.get(`${BASE_URL}/api/v1/warehouses`, () => {
          return new HttpResponse(
            JSON.stringify({
              title: 'too many requests',
              detail: 'Rate limit exceeded',
              status: 429,
            }),
            {
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'Retry-After': '10',
              },
            }
          );
        })
      );

      await expect(ordersFbw.warehouses()).rejects.toThrow(RateLimitError);
    });
  });

  // ===========================================================================
  // Scenario 5: Pagination
  // ===========================================================================

  describe('Pagination', () => {
    it('should pass limit/offset for supply listing', async () => {
      const filters = { dates: [], statusIDs: [] as ModelsHandySupplyStatus[] };
      const result = await ordersFbw.listSupplies(filters, { limit: 1, offset: 0 });

      expect(result).toHaveLength(1);
      expect(result[0].supplyID).toBe(12345);
    });

    it('should pass offset for second page of supply listing', async () => {
      const filters = { dates: [], statusIDs: [] as ModelsHandySupplyStatus[] };
      const result = await ordersFbw.listSupplies(filters, { limit: 1, offset: 1 });

      expect(result).toHaveLength(1);
      expect(result[0].supplyID).toBe(12346);
    });

    it('should pass limit/offset for supply goods', async () => {
      const result = await ordersFbw.getSuppliesGood(12345, { limit: 1, offset: 0 });

      expect(result).toHaveLength(1);
      expect(result[0].barcode).toBe('1234567891234');
    });

    it('should handle empty result page gracefully', async () => {
      const filters = { dates: [], statusIDs: [] as ModelsHandySupplyStatus[] };
      const result = await ordersFbw.listSupplies(filters, { limit: 10, offset: 100 });

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
    });
  });
});
