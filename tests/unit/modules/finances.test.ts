/**
 * Unit tests for FinancesModule
 *
 * Tests the FinancesModule class with mocked BaseClient to verify:
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Rate limit key assignment
 * - Type safety and error handling
 *
 * @see {@link ../../../src/modules/finances/index FinancesModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FinancesModule } from '../../../src/modules/finances';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { ValidationError } from '../../../src/errors/validation-error';

describe('FinancesModule', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let module: FinancesModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    module = new FinancesModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ──────────────────────────────────────────────────
  // Test Fixtures
  // ──────────────────────────────────────────────────

  const mockAccountBalanceResponse = {
    currency: 'RUB',
    current: 150000.5,
    for_withdraw: 120000.0,
  };

  const mockDetailReportItems = [
    {
      realizationreport_id: 123456,
      date_from: '2024-01-01',
      date_to: '2024-01-07',
      create_dt: '2024-01-08T10:00:00Z',
      currency_name: 'руб',
      subject_name: 'Футболки',
      nm_id: 98765,
      brand_name: 'TestBrand',
      sa_name: 'ART-001',
      barcode: '1234567890123',
      quantity: 10,
      retail_price: 1500,
      retail_amount: 15000,
      commission_percent: 15,
      ppvz_for_pay: 12750,
      delivery_rub: 200,
      penalty: 0,
      storage_fee: 50,
      srid: 'srid-abc-123',
    },
  ];

  const mockGetCategoriesResponse = {
    data: {
      categories: [
        { name: 'acts', title: 'Акты' },
        { name: 'invoices', title: 'Счета-фактуры' },
      ],
    },
  };

  const mockGetListResponse = {
    data: {
      documents: [
        {
          serviceName: 'act-2024-01',
          name: 'Акт за январь 2024',
          category: 'Акты',
          extensions: ['pdf', 'xlsx'],
          creationTime: '2024-02-01T00:00:00Z',
          viewed: false,
        },
      ],
    },
  };

  const mockGetDocResponse = {
    data: {
      fileName: 'act-2024-01.pdf',
      extension: 'pdf',
      document: 'base64encodedcontent==',
    },
  };

  const mockGetDocsResponse = {
    data: {
      fileName: 'documents-archive.zip',
      extension: 'zip',
      document: 'base64encodedarchive==',
    },
  };

  // ──────────────────────────────────────────────────
  // getAccountBalance()
  // ──────────────────────────────────────────────────

  describe('getAccountBalance()', () => {
    it('should call BaseClient.get with correct URL', async () => {
      mockClient.get.mockResolvedValue(mockAccountBalanceResponse);

      await module.getAccountBalance();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://finance-api.wildberries.ru/api/v1/account/balance',
        expect.any(Object)
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should use GET method', async () => {
      mockClient.get.mockResolvedValue(mockAccountBalanceResponse);

      await module.getAccountBalance();

      expect(mockClient.get).toHaveBeenCalled();
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should pass rateLimitKey finances.accountBalance', async () => {
      mockClient.get.mockResolvedValue(mockAccountBalanceResponse);

      await module.getAccountBalance();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://finance-api.wildberries.ru/api/v1/account/balance',
        expect.objectContaining({ rateLimitKey: 'finances.accountBalance' })
      );
    });

    it('should return AccountBalanceResponse shape', async () => {
      mockClient.get.mockResolvedValue(mockAccountBalanceResponse);

      const result = await module.getAccountBalance();

      expect(result).toEqual(mockAccountBalanceResponse);
      expect(result.currency).toBe('RUB');
      expect(result.current).toBe(150000.5);
      expect(result.for_withdraw).toBe(120000.0);
    });

    it('should propagate AuthenticationError (401)', async () => {
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      await expect(module.getAccountBalance()).rejects.toThrow(AuthenticationError);
      await expect(module.getAccountBalance()).rejects.toThrow('Invalid API key');
    });

    it('should propagate RateLimitError (429)', async () => {
      const error = new RateLimitError('Rate limit exceeded', 60000);
      mockClient.get.mockRejectedValue(error);

      await expect(module.getAccountBalance()).rejects.toThrow(RateLimitError);
    });
  });

  // ──────────────────────────────────────────────────
  // getSupplierReportDetailByPeriod()
  // ──────────────────────────────────────────────────

  describe('getSupplierReportDetailByPeriod()', () => {
    const requiredParams = {
      dateFrom: '2024-01-01',
      dateTo: '2024-01-31',
    };

    it('should call BaseClient.get with correct URL', async () => {
      mockClient.get.mockResolvedValue(mockDetailReportItems);

      await module.getSupplierReportDetailByPeriod(requiredParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
        expect.any(Object)
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should use GET method', async () => {
      mockClient.get.mockResolvedValue(mockDetailReportItems);

      await module.getSupplierReportDetailByPeriod(requiredParams);

      expect(mockClient.get).toHaveBeenCalled();
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should forward dateFrom and dateTo params', async () => {
      mockClient.get.mockResolvedValue(mockDetailReportItems);

      await module.getSupplierReportDetailByPeriod(requiredParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            dateFrom: '2024-01-01',
            dateTo: '2024-01-31',
          }),
        })
      );
    });

    it('should forward optional limit, rrdid, period params', async () => {
      mockClient.get.mockResolvedValue(mockDetailReportItems);

      const fullParams = {
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        limit: 100,
        rrdid: 55555,
        period: 'weekly' as const,
      };

      await module.getSupplierReportDetailByPeriod(fullParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            dateFrom: '2024-01-01',
            dateTo: '2024-01-31',
            limit: 100,
            rrdid: 55555,
            period: 'weekly',
          }),
        })
      );
    });

    it('should pass rateLimitKey finances.supplierReportDetailByPeriod', async () => {
      mockClient.get.mockResolvedValue(mockDetailReportItems);

      await module.getSupplierReportDetailByPeriod(requiredParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
        expect.objectContaining({ rateLimitKey: 'finances.supplierReportDetailByPeriod' })
      );
    });

    it('should return array of DetailReportItem', async () => {
      mockClient.get.mockResolvedValue(mockDetailReportItems);

      const result = await module.getSupplierReportDetailByPeriod(requiredParams);

      expect(result).toEqual(mockDetailReportItems);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0].realizationreport_id).toBe(123456);
      expect(result[0].brand_name).toBe('TestBrand');
    });

    it('should handle empty result array', async () => {
      mockClient.get.mockResolvedValue([]);

      const result = await module.getSupplierReportDetailByPeriod(requiredParams);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    // Regression test for v3.6.0 — substitute article and wholesale discount fields.
    // Source: WB news id=11270 (substitute articles) and id=11226 (wholesale discount).
    // This test will FAIL if any of the 4 fields is renamed or removed from DetailReportItem,
    // catching silent type rot. Quinn's rule: every type change ships with at least one test
    // that would fail if the type is removed.
    it('should expose substitute article and wholesale discount fields on DetailReportItem (v3.6.0)', async () => {
      const mockItemWithNewFields = [
        {
          ...mockDetailReportItems[0],
          article_substitution: 'SUB-CAMPAIGN-001',
          sale_price_affiliated_discount_prc: 10,
          agency_vat: 0,
          sale_price_wholesale_discount_prc: 5,
        },
      ];
      mockClient.get.mockResolvedValue(mockItemWithNewFields);

      const result = await module.getSupplierReportDetailByPeriod(requiredParams);

      expect(result[0].article_substitution).toBe('SUB-CAMPAIGN-001');
      expect(result[0].sale_price_affiliated_discount_prc).toBe(10);
      expect(result[0].agency_vat).toBe(0);
      expect(result[0].sale_price_wholesale_discount_prc).toBe(5);
    });

    it('should propagate AuthenticationError (401)', async () => {
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      await expect(module.getSupplierReportDetailByPeriod(requiredParams)).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should propagate RateLimitError (429)', async () => {
      const error = new RateLimitError('Rate limit exceeded', 60000);
      mockClient.get.mockRejectedValue(error);

      await expect(module.getSupplierReportDetailByPeriod(requiredParams)).rejects.toThrow(
        RateLimitError
      );
    });
  });

  // ──────────────────────────────────────────────────
  // getDocumentsCategories()
  // ──────────────────────────────────────────────────

  describe('getDocumentsCategories()', () => {
    it('should call BaseClient.get with correct URL', async () => {
      mockClient.get.mockResolvedValue(mockGetCategoriesResponse);

      await module.getDocumentsCategories();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/categories',
        expect.any(Object)
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should use GET method', async () => {
      mockClient.get.mockResolvedValue(mockGetCategoriesResponse);

      await module.getDocumentsCategories();

      expect(mockClient.get).toHaveBeenCalled();
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should forward locale param', async () => {
      mockClient.get.mockResolvedValue(mockGetCategoriesResponse);

      await module.getDocumentsCategories({ locale: 'ru' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({ locale: 'ru' }),
        })
      );
    });

    it('should work without parameters', async () => {
      mockClient.get.mockResolvedValue(mockGetCategoriesResponse);

      await module.getDocumentsCategories();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/categories',
        expect.objectContaining({
          params: undefined,
          rateLimitKey: 'finances.documentsCategories',
        })
      );
    });

    it('should pass rateLimitKey finances.documentsCategories', async () => {
      mockClient.get.mockResolvedValue(mockGetCategoriesResponse);

      await module.getDocumentsCategories();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/categories',
        expect.objectContaining({ rateLimitKey: 'finances.documentsCategories' })
      );
    });

    it('should return GetCategories shape', async () => {
      mockClient.get.mockResolvedValue(mockGetCategoriesResponse);

      const result = await module.getDocumentsCategories();

      expect(result).toEqual(mockGetCategoriesResponse);
      expect(result.data?.categories).toHaveLength(2);
      expect(result.data?.categories?.[0].name).toBe('acts');
      expect(result.data?.categories?.[0].title).toBe('Акты');
    });

    it('should propagate AuthenticationError (401)', async () => {
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      await expect(module.getDocumentsCategories()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError (429)', async () => {
      const error = new RateLimitError('Rate limit exceeded', 10000);
      mockClient.get.mockRejectedValue(error);

      await expect(module.getDocumentsCategories()).rejects.toThrow(RateLimitError);
    });
  });

  // ──────────────────────────────────────────────────
  // getDocumentsList()
  // ──────────────────────────────────────────────────

  describe('getDocumentsList()', () => {
    it('should call BaseClient.get with correct URL', async () => {
      mockClient.get.mockResolvedValue(mockGetListResponse);

      await module.getDocumentsList();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/list',
        expect.any(Object)
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should use GET method', async () => {
      mockClient.get.mockResolvedValue(mockGetListResponse);

      await module.getDocumentsList();

      expect(mockClient.get).toHaveBeenCalled();
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should forward all params', async () => {
      mockClient.get.mockResolvedValue(mockGetListResponse);

      const params = {
        locale: 'ru' as const,
        beginTime: '2024-01-01T00:00:00Z',
        endTime: '2024-12-31T23:59:59Z',
        sort: 'date' as const,
        order: 'desc' as const,
        category: 'acts',
        serviceName: 'act-2024-01',
        limit: 20,
        offset: 0,
      };

      await module.getDocumentsList(params);

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining(params),
        })
      );
    });

    it('should work without parameters', async () => {
      mockClient.get.mockResolvedValue(mockGetListResponse);

      await module.getDocumentsList();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/list',
        expect.objectContaining({
          params: undefined,
          rateLimitKey: 'finances.documentsList',
        })
      );
    });

    it('should pass rateLimitKey finances.documentsList', async () => {
      mockClient.get.mockResolvedValue(mockGetListResponse);

      await module.getDocumentsList();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/list',
        expect.objectContaining({ rateLimitKey: 'finances.documentsList' })
      );
    });

    it('should return GetList shape', async () => {
      mockClient.get.mockResolvedValue(mockGetListResponse);

      const result = await module.getDocumentsList();

      expect(result).toEqual(mockGetListResponse);
      expect(result.data?.documents).toHaveLength(1);
      expect(result.data?.documents?.[0].serviceName).toBe('act-2024-01');
      expect(result.data?.documents?.[0].extensions).toContain('pdf');
    });

    it('should propagate AuthenticationError (401)', async () => {
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      await expect(module.getDocumentsList()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError (429)', async () => {
      const error = new RateLimitError('Rate limit exceeded', 10000);
      mockClient.get.mockRejectedValue(error);

      await expect(module.getDocumentsList()).rejects.toThrow(RateLimitError);
    });

    it('should propagate ValidationError (400)', async () => {
      const error = new ValidationError('Invalid date range', {
        beginTime: 'Must be a valid ISO date',
      });
      mockClient.get.mockRejectedValue(error);

      await expect(module.getDocumentsList()).rejects.toThrow(ValidationError);
    });
  });

  // ──────────────────────────────────────────────────
  // getDocumentsDownload()
  // ──────────────────────────────────────────────────

  describe('getDocumentsDownload()', () => {
    const downloadParams = { serviceName: 'act-2024-01', extension: 'pdf' };

    it('should call BaseClient.get with correct URL', async () => {
      mockClient.get.mockResolvedValue(mockGetDocResponse);

      await module.getDocumentsDownload(downloadParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/download',
        expect.any(Object)
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should use GET method', async () => {
      mockClient.get.mockResolvedValue(mockGetDocResponse);

      await module.getDocumentsDownload(downloadParams);

      expect(mockClient.get).toHaveBeenCalled();
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should forward serviceName and extension params', async () => {
      mockClient.get.mockResolvedValue(mockGetDocResponse);

      await module.getDocumentsDownload(downloadParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            serviceName: 'act-2024-01',
            extension: 'pdf',
          }),
        })
      );
    });

    it('should pass rateLimitKey finances.documentsDownload', async () => {
      mockClient.get.mockResolvedValue(mockGetDocResponse);

      await module.getDocumentsDownload(downloadParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/download',
        expect.objectContaining({ rateLimitKey: 'finances.documentsDownload' })
      );
    });

    it('should return GetDoc shape', async () => {
      mockClient.get.mockResolvedValue(mockGetDocResponse);

      const result = await module.getDocumentsDownload(downloadParams);

      expect(result).toEqual(mockGetDocResponse);
      expect(result.data?.fileName).toBe('act-2024-01.pdf');
      expect(result.data?.extension).toBe('pdf');
      expect(result.data?.document).toBe('base64encodedcontent==');
    });

    it('should propagate AuthenticationError (401)', async () => {
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      await expect(module.getDocumentsDownload(downloadParams)).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should propagate RateLimitError (429)', async () => {
      const error = new RateLimitError('Rate limit exceeded', 10000);
      mockClient.get.mockRejectedValue(error);

      await expect(module.getDocumentsDownload(downloadParams)).rejects.toThrow(RateLimitError);
    });

    it('should propagate ValidationError (400)', async () => {
      const error = new ValidationError('Document not found', {
        serviceName: 'Invalid service name',
      });
      mockClient.get.mockRejectedValue(error);

      await expect(module.getDocumentsDownload(downloadParams)).rejects.toThrow(ValidationError);
      await expect(module.getDocumentsDownload(downloadParams)).rejects.toThrow(
        'Document not found'
      );
    });
  });

  // ──────────────────────────────────────────────────
  // createDownloadAll()
  // ──────────────────────────────────────────────────

  describe('createDownloadAll()', () => {
    const requestBody = {
      params: [
        { extension: 'pdf', serviceName: 'act-2024-01' },
        { extension: 'xlsx', serviceName: 'invoice-2024-01' },
      ],
    };

    it('should call BaseClient.post with correct URL', async () => {
      mockClient.post.mockResolvedValue(mockGetDocsResponse);

      await module.createDownloadAll(requestBody);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/download/all',
        expect.anything(),
        expect.any(Object)
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should use POST method', async () => {
      mockClient.post.mockResolvedValue(mockGetDocsResponse);

      await module.createDownloadAll(requestBody);

      expect(mockClient.post).toHaveBeenCalled();
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should pass request body', async () => {
      mockClient.post.mockResolvedValue(mockGetDocsResponse);

      await module.createDownloadAll(requestBody);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.arrayContaining([
            expect.objectContaining({ extension: 'pdf', serviceName: 'act-2024-01' }),
            expect.objectContaining({ extension: 'xlsx', serviceName: 'invoice-2024-01' }),
          ]),
        }),
        expect.any(Object)
      );
    });

    it('should pass rateLimitKey finances.createDownloadAll', async () => {
      mockClient.post.mockResolvedValue(mockGetDocsResponse);

      await module.createDownloadAll(requestBody);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/download/all',
        expect.anything(),
        expect.objectContaining({ rateLimitKey: 'finances.createDownloadAll' })
      );
    });

    it('should work with undefined body', async () => {
      mockClient.post.mockResolvedValue(mockGetDocsResponse);

      await module.createDownloadAll();

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/download/all',
        undefined,
        { rateLimitKey: 'finances.createDownloadAll' }
      );
    });

    it('should return GetDocs shape', async () => {
      mockClient.post.mockResolvedValue(mockGetDocsResponse);

      const result = await module.createDownloadAll(requestBody);

      expect(result).toEqual(mockGetDocsResponse);
      expect(result.data?.fileName).toBe('documents-archive.zip');
      expect(result.data?.extension).toBe('zip');
      expect(result.data?.document).toBe('base64encodedarchive==');
    });

    it('should propagate AuthenticationError (401)', async () => {
      const error = new AuthenticationError('Invalid API key');
      mockClient.post.mockRejectedValue(error);

      await expect(module.createDownloadAll(requestBody)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError (429)', async () => {
      const error = new RateLimitError('Rate limit exceeded', 300000);
      mockClient.post.mockRejectedValue(error);

      await expect(module.createDownloadAll(requestBody)).rejects.toThrow(RateLimitError);
    });

    it('should propagate ValidationError (400)', async () => {
      const error = new ValidationError('Invalid request body', {
        params: 'Must contain at least one document',
      });
      mockClient.post.mockRejectedValue(error);

      await expect(module.createDownloadAll(requestBody)).rejects.toThrow(ValidationError);
      await expect(module.createDownloadAll(requestBody)).rejects.toThrow('Invalid request body');
    });
  });
});
