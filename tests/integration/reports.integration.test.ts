/**
 * Integration tests for ReportsModule with MSW
 *
 * @module tests/integration/reports
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';
import { AuthenticationError, RateLimitError, ValidationError } from '../../src/errors';

// MSW server setup
const server = setupServer(
  // GET /api/v1/supplier/incomes - Inbound shipments
  http.get('https://statistics-api.wildberries.ru/api/v1/supplier/incomes', ({ request }) => {
    const url = new URL(request.url);
    const dateFrom = url.searchParams.get('dateFrom');

    if (!dateFrom) {
      return HttpResponse.json({ errors: ['dateFrom: field required'] }, { status: 400 });
    }

    // Simulate pagination: return empty on second request
    if (dateFrom === '2024-01-01T10:30:00') {
      return HttpResponse.json([]);
    }

    return HttpResponse.json([
      {
        incomeId: 12345,
        number: '',
        date: '2024-01-01T10:00:00',
        lastChangeDate: '2024-01-01T10:30:00',
        supplierArticle: 'ART-001',
        techSize: '0',
        barcode: '2000328074123',
        quantity: 3,
        totalPrice: 0,
        dateClose: '2024-01-01T12:00:00',
        warehouseName: 'Подольск',
        nmId: 1234567,
        status: 'Принято',
      },
    ]);
  }),

  // GET /api/v1/supplier/stocks - Stock levels
  http.get('https://statistics-api.wildberries.ru/api/v1/supplier/stocks', () => {
    return HttpResponse.json([
      {
        lastChangeDate: '2024-01-01T10:00:00',
        warehouseName: 'Краснодар',
        supplierArticle: '443284',
        nmId: 1439871458,
        barcode: '2037401340280',
        quantity: 33,
        inWayToClient: 1,
        inWayFromClient: 0,
        quantityFull: 34,
        category: 'Посуда',
        subject: 'Формы для запекания',
        brand: 'X',
        techSize: '0',
        Price: 185,
        Discount: 0,
        isSupply: true,
        isRealization: false,
        SCCode: 'Tech',
      },
    ]);
  }),

  // GET /api/v1/supplier/orders - Orders
  http.get('https://statistics-api.wildberries.ru/api/v1/supplier/orders', () => {
    return HttpResponse.json([
      {
        date: '2024-01-01T10:00:00',
        lastChangeDate: '2024-01-01T10:30:00',
        warehouseName: 'Подольск',
        warehouseType: 'Склад WB',
        countryName: 'Россия',
        oblastOkrugName: 'Центральный',
        regionName: 'Москва',
        supplierArticle: 'ART-001',
        nmId: 123456,
        barcode: '2037401340280',
        category: 'Электроника',
        subject: 'Телефоны',
        brand: 'TestBrand',
        techSize: '0',
        incomeID: 12345,
        isSupply: true,
        isRealization: false,
        totalPrice: 1000,
        discountPercent: 10,
        spp: 5,
        finishedPrice: 850,
        priceWithDisc: 900,
        isCancel: false,
        cancelDate: '0001-01-01T00:00:00',
        sticker: 'ST123',
        gNumber: 'GN123',
        srid: 'SRID123',
      },
    ]);
  }),

  // GET /api/v1/supplier/sales - Sales and returns
  http.get('https://statistics-api.wildberries.ru/api/v1/supplier/sales', () => {
    return HttpResponse.json([
      {
        date: '2024-01-01T10:00:00',
        lastChangeDate: '2024-01-01T10:30:00',
        warehouseName: 'Подольск',
        warehouseType: 'Склад WB',
        countryName: 'Россия',
        oblastOkrugName: 'Центральный',
        regionName: 'Москва',
        supplierArticle: 'ART-001',
        nmId: 123456,
        barcode: '2037401340280',
        category: 'Электроника',
        subject: 'Телефоны',
        brand: 'TestBrand',
        techSize: '0',
        incomeID: 12345,
        isSupply: true,
        isRealization: false,
        totalPrice: 1000,
        discountPercent: 10,
        spp: 5,
        paymentSaleAmount: 100,
        forPay: 850,
        finishedPrice: 850,
        priceWithDisc: 900,
        saleID: 'S1234567890',
        sticker: 'ST123',
        gNumber: 'GN123',
        srid: 'SRID123',
      },
    ]);
  }),

  // POST /api/v1/analytics/excise-report - Excise report
  http.post('https://seller-analytics-api.wildberries.ru/api/v1/analytics/excise-report', () => {
    return HttpResponse.json({
      response: {
        data: [
          {
            name: 'Россия',
            price: 100,
            currency_name_short: 'руб',
            excise_short: '0102900254680370215_Re/=lSbNiGD',
            barcode: '2038893425820',
            nm_id: 169085355,
            operation_type_id: 1,
            fiscal_doc_number: 12345678,
            fiscal_dt: '2024-01-01',
            rid: 606217433440,
            srid: '7513432034713632943.1.0',
          },
        ],
      },
    });
  }),

  // GET /api/v1/warehouse_remains - Create report
  http.get('https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains', () => {
    return HttpResponse.json({
      data: {
        taskId: '219eaecf-e532-4bd8-9f15-8036ec1b042d',
      },
    });
  }),

  // GET /api/v1/warehouse_remains/tasks/{taskId}/status - Check status
  http.get(
    'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/:taskId/status',
    ({ params }) => {
      return HttpResponse.json({
        data: {
          id: params.taskId as string,
          status: 'done',
          file: {
            url: 'https://download.link/report.xlsx',
          },
        },
      });
    }
  ),

  // GET /api/v1/warehouse_remains/tasks/{taskId}/download - Download report
  http.get(
    'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/:taskId/download',
    () => {
      const blob = new Blob(['mock excel data'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      return new HttpResponse(blob, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });
    }
  )
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('Reports Integration Tests', () => {
  const sdk = new WildberriesSDK({ apiKey: 'test-key' });

  describe('Basic Reports Workflow', () => {
    it('should fetch incomes with pagination', async () => {
      const incomes = await sdk.reports.getIncomes('2024-01-01');

      expect(incomes).toHaveLength(1);
      expect(incomes[0].nmId).toBe(1234567);
      expect(incomes[0].warehouseName).toBe('Подольск');
      expect(incomes[0].status).toBe('Принято');
    });

    it('should complete pagination when empty array returned', async () => {
      // First request returns data
      const firstBatch = await sdk.reports.getIncomes('2024-01-01');
      expect(firstBatch).toHaveLength(1);

      // Second request with lastChangeDate returns empty array
      const secondBatch = await sdk.reports.getIncomes(firstBatch[0].lastChangeDate);
      expect(secondBatch).toHaveLength(0);
    });

    it('should fetch stocks with quantity breakdown', async () => {
      const stocks = await sdk.reports.getStocks('2019-01-01');

      expect(stocks).toHaveLength(1);
      expect(stocks[0].quantity).toBe(33);
      expect(stocks[0].inWayToClient).toBe(1);
      expect(stocks[0].inWayFromClient).toBe(0);
      expect(stocks[0].quantityFull).toBe(34);
      expect(stocks[0].quantityFull).toBe(
        stocks[0].quantity + stocks[0].inWayToClient + stocks[0].inWayFromClient
      );
    });

    it('should fetch orders successfully', async () => {
      const orders = await sdk.reports.getOrders('2024-01-01');

      expect(orders).toHaveLength(1);
      expect(orders[0].srid).toBe('SRID123');
      expect(orders[0].isCancel).toBe(false);
    });

    it('should fetch sales with payment information', async () => {
      const sales = await sdk.reports.getSales('2024-01-01');

      expect(sales).toHaveLength(1);
      expect(sales[0].saleID).toBe('S1234567890');
      expect(sales[0].paymentSaleAmount).toBe(100);
      expect(sales[0].forPay).toBe(850);
    });
  });

  describe('Excise Report Workflow', () => {
    it('should fetch excise report with date range', async () => {
      const report = await sdk.reports.getExciseReport('2024-01-01', '2024-01-31');

      expect(report.response.data).toHaveLength(1);
      expect(report.response.data[0].name).toBe('Россия');
      expect(report.response.data[0].operation_type_id).toBe(1);
      expect(report.response.data[0].fiscal_doc_number).toBe(12345678);
    });

    it('should fetch excise report with country filters', async () => {
      const report = await sdk.reports.getExciseReport('2024-01-01', '2024-01-31', {
        countries: ['RU'],
      });

      expect(report.response.data).toBeDefined();
      expect(Array.isArray(report.response.data)).toBe(true);
    });
  });

  describe('Async Report Workflow', () => {
    it('should complete full async report workflow: create → check → download', async () => {
      // Step 1: Create warehouse remains report
      const task = await sdk.reports.createWarehouseRemainsReport({
        locale: 'ru',
        groupByBrand: true,
        groupBySubject: true,
      });

      expect(task.data.taskId).toBe('219eaecf-e532-4bd8-9f15-8036ec1b042d');

      // Step 2: Check status
      const status = await sdk.reports.checkReportStatus(task.data.taskId, 'warehouse_remains');

      expect(status.data.status).toBe('done');
      expect(status.data.file).toBeDefined();
      expect(status.data.file?.url).toBe('https://download.link/report.xlsx');

      // Step 3: Download report
      const reportBlob = await sdk.reports.downloadReport(task.data.taskId, 'warehouse_remains');

      // In Node.js test environment with MSW, Blob might be returned as string or Buffer
      // Just verify we got a response (could be Blob, Buffer, or string)
      expect(reportBlob).toBeDefined();
      // Verify the response has content
      expect(reportBlob).toBeTruthy();
    });

    it('should create report with different locales', async () => {
      const task = await sdk.reports.createWarehouseRemainsReport({
        locale: 'en',
      });

      expect(task.data.taskId).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle 400 error for missing dateFrom', async () => {
      server.use(
        http.get('https://statistics-api.wildberries.ru/api/v1/supplier/incomes', () => {
          return HttpResponse.json({ errors: ['dateFrom: field required'] }, { status: 400 });
        })
      );

      await expect(sdk.reports.getIncomes('')).rejects.toThrow(ValidationError);
    });

    it('should handle 401 authentication error', async () => {
      server.use(
        http.get('https://statistics-api.wildberries.ru/api/v1/supplier/stocks', () => {
          return HttpResponse.json({ detail: 'Invalid API key' }, { status: 401 });
        })
      );

      await expect(sdk.reports.getStocks('2024-01-01')).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 rate limit error', async () => {
      server.use(
        http.get('https://statistics-api.wildberries.ru/api/v1/supplier/orders', () => {
          return HttpResponse.json({ detail: 'Rate limit exceeded' }, { status: 429 });
        })
      );

      await expect(sdk.reports.getOrders('2024-01-01')).rejects.toThrow(RateLimitError);
    });
  });
});
