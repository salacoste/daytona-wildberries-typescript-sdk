/**
 * @skip MSW v2.x localStorage compatibility issue
 *
 * These tests are skipped due to MSW v2.x requiring localStorage at module
 * initialization, which is not available in Node.js test environment.
 *
 * @see https://github.com/mswjs/msw/issues - MSW Node.js compatibility
 * @todo Re-enable when MSW v3 or Vitest provides a solution
 */

/**
 * Integration tests for TariffsModule with MSW
 *
 * Tests all 5 tariffs endpoints against mocked API responses.
 * These tests verify correct URL construction, HTTP methods, and response handling.
 *
 * API domain tested:
 * - common-api.wildberries.ru (all tariffs endpoints)
 *
 * @see {@link ../../src/modules/tariffs/index TariffsModule}
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';

const BASE_URL = 'https://common-api.wildberries.ru';

/**
 * MSW handlers for Tariffs API endpoints
 */
const handlers = [
  // GET /api/v1/tariffs/commission - Commission tariffs
  http.get(`${BASE_URL}/api/v1/tariffs/commission`, () => {
    return HttpResponse.json({
      report: [
        {
          parentID: 1,
          parentName: 'Electronics',
          subjectID: 101,
          subjectName: 'Smartphones',
          kgvpMarketplace: 15,
          kgvpSupplier: 12,
          kgvpSupplierExpress: 14,
          paidStorageKgvp: 10,
        },
      ],
    });
  }),

  // GET /api/v1/tariffs/box - Box delivery tariffs
  http.get(`${BASE_URL}/api/v1/tariffs/box`, ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    if (!date) {
      return HttpResponse.json({ error: 'Date required' }, { status: 400 });
    }
    return HttpResponse.json({
      response: {
        data: {
          dtNextBox: '2024-02-01',
          dtTillMax: '2024-12-31',
          warehouseList: [
            {
              warehouseName: 'Moscow',
              warehouseID: 507,
              boxDeliveryAndStorageExpr: '60',
              boxDeliveryBase: '50',
              boxDeliveryLiter: '2',
              boxStorageBase: '5',
              boxStorageLiter: '0.5',
            },
          ],
        },
      },
    });
  }),

  // GET /api/v1/tariffs/pallet - Pallet delivery tariffs
  http.get(`${BASE_URL}/api/v1/tariffs/pallet`, ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    if (!date) {
      return HttpResponse.json({ error: 'Date required' }, { status: 400 });
    }
    return HttpResponse.json({
      response: {
        data: {
          dtNextPallet: '2024-02-01',
          dtTillMax: '2024-12-31',
          warehouseList: [
            {
              warehouseName: 'Moscow',
              warehouseID: 507,
              palletDeliveryExpr: '500',
              palletDeliveryValueBase: '400',
              palletDeliveryValueLiter: '10',
              palletStorageExpr: '50',
              palletStorageValueExpr: '40',
            },
          ],
        },
      },
    });
  }),

  // GET /api/v1/tariffs/return - Return tariffs
  http.get(`${BASE_URL}/api/v1/tariffs/return`, ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    if (!date) {
      return HttpResponse.json({ error: 'Date required' }, { status: 400 });
    }
    return HttpResponse.json({
      response: {
        data: {
          dtNextDeliveryDumpSup: '2024-02-01',
          dtNextDeliveryDumpKgt: '2024-02-01',
          dtNextDeliveryDumpSrg: '2024-02-01',
          warehouseList: [
            {
              warehouseName: 'Moscow',
              warehouseID: 507,
              deliveryDumpSupOfficeBase: '30',
              deliveryDumpSupOfficeLiter: '3',
              deliveryDumpSupCourierBase: '25',
              deliveryDumpSupCourierLiter: '2.5',
            },
          ],
        },
      },
    });
  }),

  // GET /api/tariffs/v1/acceptance/coefficients - Acceptance coefficients
  http.get(`${BASE_URL}/api/tariffs/v1/acceptance/coefficients`, ({ request }) => {
    const url = new URL(request.url);
    const warehouseIDs = url.searchParams.get('warehouseIDs');

    const mockData = [
      {
        date: '2024-04-11T00:00:00Z',
        coefficient: 1,
        warehouseID: 507,
        warehouseName: 'Moscow',
        allowUnload: true,
        boxTypeID: 2,
        boxTypeName: 'Standard Box',
      },
      {
        date: '2024-04-11T00:00:00Z',
        coefficient: 1.5,
        warehouseID: 508,
        warehouseName: 'Saint Petersburg',
        allowUnload: true,
        boxTypeID: 2,
        boxTypeName: 'Standard Box',
      },
    ];

    // Filter by warehouseIDs if provided
    if (warehouseIDs) {
      const ids = warehouseIDs.split(',').map((id) => parseInt(id, 10));
      return HttpResponse.json(mockData.filter((item) => ids.includes(item.warehouseID)));
    }

    return HttpResponse.json(mockData);
  }),
];

const server = setupServer(...handlers);

describe('TariffsModule Integration Tests', () => {
  let sdk: WildberriesSDK;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    sdk = new WildberriesSDK({ apiKey: 'test-api-key' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('getTariffsCommission', () => {
    it('should fetch commission tariffs with category data', async () => {
      const result = await sdk.tariffs.getTariffsCommission();

      expect(result.report).toBeDefined();
      expect(Array.isArray(result.report)).toBe(true);
      expect(result.report?.[0]).toEqual(
        expect.objectContaining({
          parentID: 1,
          parentName: 'Electronics',
          subjectID: 101,
          subjectName: 'Smartphones',
          kgvpMarketplace: 15,
        }),
      );
    });

    it('should pass locale parameter for localized responses', async () => {
      const result = await sdk.tariffs.getTariffsCommission({ locale: 'en' });

      expect(result.report).toBeDefined();
      expect(result.report?.[0].parentName).toBe('Electronics');
    });
  });

  describe('getTariffsBox', () => {
    it('should fetch box tariffs with warehouse data', async () => {
      const result = await sdk.tariffs.getTariffsBox('2024-01-15');

      expect(result.response?.data).toBeDefined();
      expect(result.response?.data?.dtNextBox).toBe('2024-02-01');
      expect(result.response?.data?.warehouseList).toHaveLength(1);
      expect(result.response?.data?.warehouseList?.[0]).toEqual(
        expect.objectContaining({
          warehouseName: 'Moscow',
          boxDeliveryBase: '50',
        }),
      );
    });
  });

  describe('getTariffsPallet', () => {
    it('should fetch pallet tariffs with warehouse data', async () => {
      const result = await sdk.tariffs.getTariffsPallet('2024-01-15');

      expect(result.response?.data).toBeDefined();
      expect(result.response?.data?.dtNextPallet).toBe('2024-02-01');
      expect(result.response?.data?.warehouseList).toHaveLength(1);
      expect(result.response?.data?.warehouseList?.[0]).toEqual(
        expect.objectContaining({
          warehouseName: 'Moscow',
          palletDeliveryValueBase: '400',
        }),
      );
    });
  });

  describe('getTariffsReturn', () => {
    it('should fetch return tariffs with warehouse data', async () => {
      const result = await sdk.tariffs.getTariffsReturn('2024-01-15');

      expect(result.response?.data).toBeDefined();
      expect(result.response?.data?.dtNextDeliveryDumpSup).toBe('2024-02-01');
      expect(result.response?.data?.warehouseList).toHaveLength(1);
      expect(result.response?.data?.warehouseList?.[0]).toEqual(
        expect.objectContaining({
          warehouseName: 'Moscow',
          deliveryDumpSupOfficeBase: '30',
        }),
      );
    });
  });

  describe('getAcceptanceCoefficients', () => {
    it('should fetch acceptance coefficients for all warehouses', async () => {
      const result = await sdk.tariffs.getAcceptanceCoefficients();

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(
        expect.objectContaining({
          warehouseID: 507,
          warehouseName: 'Moscow',
          coefficient: 1,
          allowUnload: true,
        }),
      );
      expect(result[1]).toEqual(
        expect.objectContaining({
          warehouseID: 508,
          warehouseName: 'Saint Petersburg',
          coefficient: 1.5,
        }),
      );
    });

    it('should filter by warehouseIDs parameter', async () => {
      const result = await sdk.tariffs.getAcceptanceCoefficients({ warehouseIDs: '507' });

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0].warehouseID).toBe(507);
      expect(result[0].warehouseName).toBe('Moscow');
    });

    it('should support multiple warehouseIDs', async () => {
      const result = await sdk.tariffs.getAcceptanceCoefficients({ warehouseIDs: '507,508' });

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
    });
  });
});
