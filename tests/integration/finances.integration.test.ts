/**
 * Integration tests for FinancesModule
 *
 * Tests the FinancesModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow for finance endpoints
 * - Balance retrieval from finance-api.wildberries.ru
 * - Transaction history from statistics-api.wildberries.ru
 * - Document management from documents-api.wildberries.ru
 * - Rate limiting enforcement
 * - Error transformation from HTTP responses
 * - Query parameter handling
 * - Pagination logic
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/finances/index FinancesModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { FinancesModule } from '../../src/modules/finances';
import { BaseClient } from '../../src/client/base-client';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { ValidationError } from '../../src/errors/validation-error';

/**
 * MSW handlers for Finance API endpoints
 */
const handlers = [
  // GET /api/v1/account/balance - Balance endpoint
  http.get('https://finance-api.wildberries.ru/api/v1/account/balance', () => {
    return HttpResponse.json({
      currency: 'RUB',
      current: 10196.21,
      for_withdraw: 6395.8,
    });
  }),

  // GET /api/v5/supplier/reportDetailByPeriod - Transaction history endpoint
  http.get(
    'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
    ({ request }) => {
      const url = new URL(request.url);
      const dateFrom = url.searchParams.get('dateFrom');
      const dateTo = url.searchParams.get('dateTo');
      const rrdid = parseInt(url.searchParams.get('rrdid') ?? '0');

      // Validate required parameters
      if (!dateFrom || !dateTo) {
        return HttpResponse.json({ error: 'dateFrom and dateTo are required' }, { status: 400 });
      }

      // Mock pagination: return empty array if rrdid indicates we've reached the end
      if (rrdid >= 1232610467) {
        return HttpResponse.json([]);
      }

      // Return mock transactions
      return HttpResponse.json([
        {
          realizationreport_id: 1234567,
          date_from: dateFrom,
          date_to: dateTo,
          create_dt: '2024-01-08',
          currency_name: 'руб',
          suppliercontract_code: null,
          rrd_id: 1232610467,
          gi_id: 123456,
          dlv_prc: 1.8,
          fix_tariff_date_from: '2024-01-01',
          fix_tariff_date_to: '2024-01-31',
          subject_name: 'Электроника',
          nm_id: 123456,
          brand_name: 'TestBrand',
          sa_name: 'SA123',
          ts_name: 'M',
          barcode: '1234567890',
          doc_type_name: 'Продажа',
          quantity: 1,
          retail_price: 2000,
          retail_amount: 2000,
          sale_percent: 0,
          commission_percent: 15,
          office_name: 'Москва',
          supplier_oper_name: 'Продажа',
          order_dt: '2024-01-05',
          sale_dt: '2024-01-06',
          rr_dt: null,
          shk_id: 999,
          retail_price_withdisc_rub: 2000,
          delivery_rub: 100,
          gi_box_type_name: 'Коробка',
          product_discount_for_report: 0,
          supplier_promo: 0,
          ppvz_kvw_prc_base_date: null,
          ppvz_kvw_prc: 50,
          ppvz_sales_commission: 300,
          ppvz_for_pay: 1550.5,
          ppvz_reward: 100,
          acquiring_fee: 20,
          acquiring_percent: 1,
          acquiring_bank: 'Банк',
          ppvz_vw: 1450,
          ppvz_vw_nds: 145,
          stock_id: null,
          supplier_oper_id: 'OP123',
          country_name: 'Россия',
          bonus_type_name: null,
          srid: 'SR123',
        },
        {
          realizationreport_id: 1234568,
          date_from: dateFrom,
          date_to: dateTo,
          create_dt: '2024-01-08',
          currency_name: 'руб',
          suppliercontract_code: null,
          rrd_id: 1232610468,
          gi_id: 123457,
          dlv_prc: 1.8,
          fix_tariff_date_from: '2024-01-01',
          fix_tariff_date_to: '2024-01-31',
          subject_name: 'Одежда',
          nm_id: 123457,
          brand_name: 'TestBrand2',
          sa_name: 'SA124',
          ts_name: 'L',
          barcode: '1234567891',
          doc_type_name: 'Возврат',
          quantity: -1,
          retail_price: 1500,
          retail_amount: -1500,
          sale_percent: 0,
          commission_percent: 15,
          office_name: 'Санкт-Петербург',
          supplier_oper_name: 'Возврат',
          order_dt: '2024-01-04',
          sale_dt: '2024-01-05',
          rr_dt: '2024-01-07',
          shk_id: 998,
          retail_price_withdisc_rub: 1500,
          delivery_rub: 80,
          gi_box_type_name: 'Пакет',
          product_discount_for_report: 0,
          supplier_promo: 0,
          ppvz_kvw_prc_base_date: null,
          ppvz_kvw_prc: 40,
          ppvz_sales_commission: -225,
          ppvz_for_pay: -1235,
          ppvz_reward: -80,
          acquiring_fee: -15,
          acquiring_percent: 1,
          acquiring_bank: 'Банк',
          ppvz_vw: -1155,
          ppvz_vw_nds: -115.5,
          stock_id: null,
          supplier_oper_id: 'OP124',
          country_name: 'Россия',
          bonus_type_name: null,
          srid: 'SR124',
        },
      ]);
    }
  ),

  // GET /api/v1/documents/categories - Document categories endpoint
  http.get('https://documents-api.wildberries.ru/api/v1/documents/categories', ({ request }) => {
    const url = new URL(request.url);
    const locale = url.searchParams.get('locale') ?? 'en';

    return HttpResponse.json({
      data: {
        categories: [
          {
            name: 'redeem-notification',
            title: locale === 'ru' ? 'Уведомление о выкупе' : 'Redemption notification',
          },
          { name: 'act', title: locale === 'ru' ? 'Акт' : 'Act' },
          {
            name: 'invoice',
            title: locale === 'ru' ? 'Счёт-фактура' : 'Invoice',
          },
        ],
      },
    });
  }),

  // GET /api/v1/documents/list - Documents list endpoint
  http.get('https://documents-api.wildberries.ru/api/v1/documents/list', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    let documents = [
      {
        serviceName: 'redeem-notification-44841941',
        name: 'redeem-notification',
        category: 'Уведомление о выкупе',
        extensions: ['zip', 'pdf'],
        creationTime: '2024-07-09T10:00:00Z',
        viewed: false,
      },
      {
        serviceName: 'act-123456',
        name: 'act',
        category: 'Акт',
        extensions: ['pdf'],
        creationTime: '2024-07-10T11:00:00Z',
        viewed: true,
      },
    ];

    // Filter by category if provided
    if (category) {
      documents = documents.filter((doc) => doc.name === category);
    }

    return HttpResponse.json({
      data: { documents },
    });
  }),

  // GET /api/v1/documents/download - Single document download endpoint
  http.get('https://documents-api.wildberries.ru/api/v1/documents/download', ({ request }) => {
    const url = new URL(request.url);
    const serviceName = url.searchParams.get('serviceName');
    const extension = url.searchParams.get('extension');

    if (!serviceName || !extension) {
      return HttpResponse.json(
        { error: 'serviceName and extension are required' },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      data: {
        fileName: `${serviceName}.${extension}`,
        extension,
        document: 'UEsDBBQACAgIAAAAAAA...', // Mock base64 content
      },
    });
  }),

  // POST /api/v1/documents/download/all - Multiple documents download endpoint
  http.post(
    'https://documents-api.wildberries.ru/api/v1/documents/download/all',
    async ({ request }) => {
      const body = (await request.json()) as {
        params?: { serviceName: string; extension: string }[];
      };

      if (!body.params || body.params.length === 0) {
        return HttpResponse.json({ error: 'At least one document required' }, { status: 400 });
      }

      if (body.params.length > 50) {
        return HttpResponse.json({ error: 'Maximum 50 documents allowed' }, { status: 400 });
      }

      return HttpResponse.json({
        data: {
          fileName: 'documents.zip',
          extension: 'zip',
          document: 'UEsDBBQACAgIAAAAAAA...', // Mock base64 ZIP content
        },
      });
    }
  ),

  // Error response handlers for testing error scenarios
  http.get('https://finance-api.wildberries.ru/api/v1/account/balance-401', () => {
    return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }),

  http.get('https://finance-api.wildberries.ru/api/v1/account/balance-429', () => {
    return HttpResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }),
];

const server = setupServer(...handlers);

describe('FinancesModule Integration Tests', () => {
  let baseClient: BaseClient;
  let financesModule: FinancesModule;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  beforeAll(() => {
    baseClient = new BaseClient({
      apiKey: 'test-api-key',
      timeout: 5000,
      logLevel: 'error',
    });
    financesModule = new FinancesModule(baseClient);
  });

  describe('getBalance() - Balance Retrieval Flow', () => {
    it('should successfully retrieve account balance', async () => {
      // Act
      const balance = await financesModule.getBalance();

      // Assert
      expect(balance).toEqual({
        currency: 'RUB',
        current: 10196.21,
        for_withdraw: 6395.8,
      });
      expect(balance.currency).toBe('RUB');
      expect(balance.current).toBeGreaterThan(balance.for_withdraw);
    });

    it('should handle 401 authentication error', async () => {
      // Arrange
      server.use(
        http.get('https://finance-api.wildberries.ru/api/v1/account/balance', () => {
          return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
        })
      );

      // Act & Assert
      await expect(financesModule.getBalance()).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 rate limit error', async () => {
      // Arrange
      server.use(
        http.get('https://finance-api.wildberries.ru/api/v1/account/balance', () => {
          return HttpResponse.json(
            { error: 'Too many requests' },
            { status: 429, headers: { 'Retry-After': '60' } }
          );
        })
      );

      // Act & Assert
      await expect(financesModule.getBalance()).rejects.toThrow(RateLimitError);
    });
  });

  describe('getTransactions() - Transaction History Flow', () => {
    it('should successfully retrieve transaction list', async () => {
      // Act
      const transactions = await financesModule.getTransactions({
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        limit: 100,
      });

      // Assert
      expect(Array.isArray(transactions)).toBe(true);
      expect(transactions).toHaveLength(2);
      expect(transactions[0].rrd_id).toBe(1232610467);
      expect(transactions[0].brand_name).toBe('TestBrand');
      expect(transactions[1].doc_type_name).toBe('Возврат');
    });

    it('should support pagination with rrdid parameter', async () => {
      // Act - First page
      const page1 = await financesModule.getTransactions({
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        rrdid: 0,
        limit: 100,
      });

      // Act - Second page (should be empty based on our mock)
      const lastRrdId = page1[page1.length - 1].rrd_id;
      const page2 = await financesModule.getTransactions({
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        rrdid: lastRrdId,
        limit: 100,
      });

      // Assert
      expect(page1).toHaveLength(2);
      expect(page2).toHaveLength(0); // End of pagination
    });

    it('should support period filter (weekly/daily)', async () => {
      // Act
      const transactions = await financesModule.getTransactions({
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        period: 'weekly',
      });

      // Assert
      expect(transactions).toBeDefined();
      expect(Array.isArray(transactions)).toBe(true);
    });

    it('should throw ValidationError for missing dateFrom', async () => {
      // Act & Assert
      await expect(
        financesModule.getTransactions({
          dateFrom: '',
          dateTo: '2024-01-31',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for missing dateTo', async () => {
      // Act & Assert
      await expect(
        financesModule.getTransactions({
          dateFrom: '2024-01-01',
          dateTo: '',
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('getTransactionById() - Single Transaction Detail Flow', () => {
    it('should retrieve specific transaction by ID', async () => {
      // Act
      const transaction = await financesModule.getTransactionById(1232610467, {
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
      });

      // Assert
      expect(transaction).toBeDefined();
      expect(transaction.rrd_id).toBe(1232610467);
      expect(transaction.brand_name).toBe('TestBrand');
      expect(transaction.ppvz_for_pay).toBe(1550.5);
    });

    it('should throw ValidationError for transaction not found', async () => {
      // Act & Assert
      await expect(
        financesModule.getTransactionById(999999999, {
          dateFrom: '2024-01-01',
          dateTo: '2024-01-31',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid transaction ID', async () => {
      // Act & Assert
      await expect(
        financesModule.getTransactionById(0, {
          dateFrom: '2024-01-01',
          dateTo: '2024-01-31',
        })
      ).rejects.toThrow(ValidationError);

      await expect(
        financesModule.getTransactionById(-100, {
          dateFrom: '2024-01-01',
          dateTo: '2024-01-31',
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('getDocumentCategories() - Document Categories Flow', () => {
    it('should retrieve document categories with default locale', async () => {
      // Act
      const response = await financesModule.getDocumentCategories();

      // Assert
      expect(response.data.categories).toHaveLength(3);
      expect(response.data.categories[0].name).toBe('redeem-notification');
      expect(response.data.categories[0].title).toBe('Redemption notification');
    });

    it('should support locale parameter', async () => {
      // Act
      const response = await financesModule.getDocumentCategories('ru');

      // Assert
      expect(response.data.categories[0].title).toBe('Уведомление о выкупе');
    });
  });

  describe('getDocuments() - Documents List Flow', () => {
    it('should retrieve all documents without filters', async () => {
      // Act
      const response = await financesModule.getDocuments();

      // Assert
      expect(response.data.documents).toHaveLength(2);
      expect(response.data.documents[0].serviceName).toBe('redeem-notification-44841941');
      expect(response.data.documents[1].viewed).toBe(true);
    });

    it('should filter documents by category', async () => {
      // Act
      const response = await financesModule.getDocuments({
        category: 'act',
      });

      // Assert
      expect(response.data.documents).toHaveLength(1);
      expect(response.data.documents[0].name).toBe('act');
    });

    it('should support date range filters', async () => {
      // Act
      const response = await financesModule.getDocuments({
        beginTime: '2024-07-09',
        endTime: '2024-07-15',
        sort: 'date',
        order: 'desc',
      });

      // Assert
      expect(response.data.documents).toBeDefined();
    });
  });

  describe('downloadDocument() - Single Document Download Flow', () => {
    it('should download single document successfully', async () => {
      // Act
      const response = await financesModule.downloadDocument('redeem-notification-44841941', 'pdf');

      // Assert
      expect(response.data.fileName).toBe('redeem-notification-44841941.pdf');
      expect(response.data.extension).toBe('pdf');
      expect(response.data.document).toBeDefined();
    });

    it('should throw ValidationError for empty serviceName', async () => {
      // Act & Assert
      await expect(financesModule.downloadDocument('', 'pdf')).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for empty extension', async () => {
      // Act & Assert
      await expect(financesModule.downloadDocument('doc-123', '')).rejects.toThrow(ValidationError);
    });
  });

  describe('downloadDocuments() - Multiple Documents Download Flow', () => {
    it('should download multiple documents as ZIP archive', async () => {
      // Act
      const response = await financesModule.downloadDocuments([
        { serviceName: 'doc-123', extension: 'pdf' },
        { serviceName: 'doc-456', extension: 'xlsx' },
      ]);

      // Assert
      expect(response.data.fileName).toBe('documents.zip');
      expect(response.data.extension).toBe('zip');
      expect(response.data.document).toBeDefined();
    });

    it('should throw ValidationError for empty documents array', async () => {
      // Act & Assert
      await expect(financesModule.downloadDocuments([])).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for more than 50 documents', async () => {
      // Arrange
      const tooManyDocuments = Array.from({ length: 51 }, (_, i) => ({
        serviceName: `doc-${i}`,
        extension: 'pdf',
      }));

      // Act & Assert
      await expect(financesModule.downloadDocuments(tooManyDocuments)).rejects.toThrow(
        ValidationError
      );
    });

    it('should accept exactly 50 documents', async () => {
      // Arrange
      const fiftyDocuments = Array.from({ length: 50 }, (_, i) => ({
        serviceName: `doc-${i}`,
        extension: 'pdf',
      }));

      // Act
      const response = await financesModule.downloadDocuments(fiftyDocuments);

      // Assert
      expect(response.data.fileName).toBe('documents.zip');
    });
  });
});
