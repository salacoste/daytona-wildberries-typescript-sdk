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
 * Integration tests for FinancesModule
 *
 * Tests the FinancesModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow from module -> BaseClient -> RateLimiter -> RetryHandler -> HTTP
 * - Correct URL construction for 3 different API domains
 * - Query parameter forwarding
 * - Request body passing for POST endpoints
 * - Response type conformity
 *
 * API domains tested:
 * - finance-api.wildberries.ru (Balance)
 * - statistics-api.wildberries.ru (Financial reports)
 * - documents-api.wildberries.ru (Documents)
 *
 * @see {@link ../../src/modules/finances/index FinancesModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { FinancesModule } from '../../src/modules/finances';
import { BaseClient } from '../../src/client/base-client';
import type {
  AccountBalanceResponse,
  DetailReportItem,
  GetCategories,
  GetList,
  GetDoc,
  GetDocs,
} from '../../src/types/finances.types';

/**
 * MSW handlers for Finances API endpoints
 */
const handlers = [
  // GET /api/v1/account/balance (finance-api)
  http.get('https://finance-api.wildberries.ru/api/v1/account/balance', () => {
    return HttpResponse.json({
      currency: 'RUB',
      current: 150000.5,
      for_withdraw: 75000.25,
    } satisfies AccountBalanceResponse);
  }),

  // GET /api/v5/supplier/reportDetailByPeriod (statistics-api)
  http.get(
    'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
    ({ request }) => {
      const url = new URL(request.url);
      const dateFrom = url.searchParams.get('dateFrom');
      const dateTo = url.searchParams.get('dateTo');

      if (!dateFrom || !dateTo) {
        return new HttpResponse(
          JSON.stringify({ title: 'Bad Request', detail: 'missing dateTo params' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const items: DetailReportItem[] = [
        {
          realizationreport_id: 100001,
          date_from: dateFrom,
          date_to: dateTo,
          create_dt: '2026-01-20T12:00:00Z',
          currency_name: 'руб',
          suppliercontract_code: null,
          rrd_id: 1,
          nm_id: 12345678,
          brand_name: 'TestBrand',
          sa_name: 'ART-001',
          barcode: '1234567890123',
          doc_type_name: 'Продажа',
          quantity: 1,
          retail_price: 2500,
          retail_amount: 2500,
          sale_percent: 15,
          commission_percent: 10,
          ppvz_for_pay: 1912.5,
          delivery_method: 'FBS',
          report_type: 1,
        },
      ];

      return HttpResponse.json(items);
    }
  ),

  // GET /api/v1/documents/categories (documents-api)
  http.get('https://documents-api.wildberries.ru/api/v1/documents/categories', () => {
    const response: GetCategories = {
      data: {
        categories: [
          { name: 'act', title: 'Акт' },
          { name: 'invoice', title: 'Счёт-фактура' },
        ],
      },
    };
    return HttpResponse.json(response);
  }),

  // GET /api/v1/documents/list (documents-api)
  http.get('https://documents-api.wildberries.ru/api/v1/documents/list', () => {
    const response: GetList = {
      data: {
        documents: [
          {
            serviceName: 'doc-abc-123',
            name: 'Invoice January 2026',
            category: 'Акт',
            extensions: ['pdf', 'xlsx'],
            creationTime: '2026-01-15T10:00:00Z',
            viewed: false,
          },
        ],
      },
    };
    return HttpResponse.json(response);
  }),

  // GET /api/v1/documents/download (documents-api)
  http.get('https://documents-api.wildberries.ru/api/v1/documents/download', () => {
    const response: GetDoc = {
      data: {
        fileName: 'invoice.pdf',
        extension: 'pdf',
        document: 'JVBERi0xLjQKJeLj...base64content',
      },
    };
    return HttpResponse.json(response);
  }),

  // POST /api/v1/documents/download/all (documents-api)
  http.post('https://documents-api.wildberries.ru/api/v1/documents/download/all', () => {
    const response: GetDocs = {
      data: {
        fileName: 'documents.zip',
        extension: 'zip',
        document: 'UEsDBBQAAAA...base64zipdata',
      },
    };
    return HttpResponse.json(response);
  }),
];

const server = setupServer(...handlers);

describe('Finances Integration Tests', () => {
  let client: BaseClient;
  let finances: FinancesModule;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  beforeEach(() => {
    client = new BaseClient({
      apiKey: 'test-key-finances',
      timeout: 5000,
      retryConfig: { maxRetries: 0 },
    });
    finances = new FinancesModule(client);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('Balance (finance-api domain)', () => {
    it('should return account balance', async () => {
      const result = await finances.getAccountBalance();
      expect(result).toEqual({
        currency: 'RUB',
        current: 150000.5,
        for_withdraw: 75000.25,
      });
    });

    it('should return correct response shape', async () => {
      const result = await finances.getAccountBalance();
      expect(result).toHaveProperty('currency');
      expect(result).toHaveProperty('current');
      expect(result).toHaveProperty('for_withdraw');
      expect(typeof result.currency).toBe('string');
      expect(typeof result.current).toBe('number');
    });
  });

  describe('Financial Reports (statistics-api domain)', () => {
    it('should return report items with valid date range', async () => {
      const result = await finances.getSupplierReportDetailByPeriod({
        dateFrom: '2026-01-01',
        dateTo: '2026-01-31',
      });
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0].realizationreport_id).toBe(100001);
      expect(result[0].brand_name).toBe('TestBrand');
      expect(result[0].report_type).toBe(1);
      expect(result[0].delivery_method).toBe('FBS');
    });

    it('should forward date parameters', async () => {
      const result = await finances.getSupplierReportDetailByPeriod({
        dateFrom: '2026-01-01',
        dateTo: '2026-01-31',
      });
      expect(result[0].date_from).toBe('2026-01-01');
      expect(result[0].date_to).toBe('2026-01-31');
    });
  });

  describe('Documents - Categories (documents-api domain)', () => {
    it('should return document categories', async () => {
      const result = await finances.getDocumentsCategories();
      expect(result.data).toBeDefined();
      expect(result.data?.categories).toHaveLength(2);
      expect(result.data?.categories?.[0].name).toBe('act');
      expect(result.data?.categories?.[0].title).toBe('Акт');
    });
  });

  describe('Documents - List (documents-api domain)', () => {
    it('should return documents list', async () => {
      const result = await finances.getDocumentsList();
      expect(result.data).toBeDefined();
      expect(result.data?.documents).toHaveLength(1);
      expect(result.data?.documents?.[0].serviceName).toBe('doc-abc-123');
      expect(result.data?.documents?.[0].extensions).toContain('pdf');
      expect(result.data?.documents?.[0].viewed).toBe(false);
    });
  });

  describe('Documents - Download (documents-api domain)', () => {
    it('should download a single document', async () => {
      const result = await finances.getDocumentsDownload({
        serviceName: 'doc-abc-123',
        extension: 'pdf',
      });
      expect(result.data).toBeDefined();
      expect(result.data?.fileName).toBe('invoice.pdf');
      expect(result.data?.extension).toBe('pdf');
      expect(result.data?.document).toBeTruthy();
    });
  });

  describe('Documents - Download All (documents-api domain)', () => {
    it('should download multiple documents', async () => {
      const result = await finances.createDownloadAll({
        params: [
          { serviceName: 'doc-abc-123', extension: 'pdf' },
          { serviceName: 'doc-def-456', extension: 'xlsx' },
        ],
      });
      expect(result.data).toBeDefined();
      expect(result.data?.fileName).toBe('documents.zip');
      expect(result.data?.extension).toBe('zip');
    });
  });
});
