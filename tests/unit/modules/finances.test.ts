/**
 * Unit tests for FinancesModule
 *
 * Tests the FinancesModule class with mocked BaseClient to verify:
 * - Balance retrieval methods
 * - Transaction history methods
 * - Document management methods
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Validation logic and error handling
 * - Type safety
 *
 * @see {@link ../../../src/modules/finances/index FinancesModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FinancesModule } from '../../../src/modules/finances';
import type { BaseClient } from '../../../src/client/base-client';
import { ValidationError } from '../../../src/errors/validation-error';

describe('FinancesModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };

  let financesModule: FinancesModule;

  beforeEach(() => {
    // Create fresh mocks before each test
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
    };

    // Create fresh instance before each test
    financesModule = new FinancesModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('getBalance() - Account Balance', () => {
    const mockBalanceResponse = {
      currency: 'RUB',
      current: 10196.21,
      for_withdraw: 6395.8,
    };

    it('should call BaseClient.get with correct URL and rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockBalanceResponse);

      // Act
      await financesModule.getBalance();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://finance-api.wildberries.ru/api/v1/account/balance',
        { rateLimitKey: 'finances.getBalance' }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return typed balance response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockBalanceResponse);

      // Act
      const result = await financesModule.getBalance();

      // Assert
      expect(result).toEqual(mockBalanceResponse);
      expect(result.currency).toBe('RUB');
      expect(result.current).toBe(10196.21);
      expect(result.for_withdraw).toBe(6395.8);
    });
  });

  describe('getTransactions() - Transaction History', () => {
    const mockTransactionResponse = [
      {
        realizationreport_id: 1234567,
        date_from: '2024-01-01',
        date_to: '2024-01-07',
        create_dt: '2024-01-08',
        currency_name: 'руб',
        rrd_id: 1232610467,
        nm_id: 123456,
        brand_name: 'TestBrand',
        sa_name: 'SA123',
        ppvz_for_pay: 1500.5,
      },
    ];

    it('should call BaseClient.get with correct URL, parameters, and rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockTransactionResponse);
      const filters = {
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        limit: 100,
        period: 'weekly' as const,
      };

      // Act
      await financesModule.getTransactions(filters);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
        {
          params: filters,
          rateLimitKey: 'finances.getTransactions',
        }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return typed transaction list response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockTransactionResponse);
      const filters = {
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
      };

      // Act
      const result = await financesModule.getTransactions(filters);

      // Assert
      expect(result).toEqual(mockTransactionResponse);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0].rrd_id).toBe(1232610467);
    });

    it('should throw ValidationError when dateFrom is missing', async () => {
      // Arrange
      const filters = {
        dateFrom: '',
        dateTo: '2024-01-31',
      };

      // Act & Assert
      await expect(financesModule.getTransactions(filters)).rejects.toThrow(
        ValidationError
      );
      await expect(financesModule.getTransactions(filters)).rejects.toThrow(
        'Both dateFrom and dateTo are required for transaction queries'
      );
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when dateTo is missing', async () => {
      // Arrange
      const filters = {
        dateFrom: '2024-01-01',
        dateTo: '',
      };

      // Act & Assert
      await expect(financesModule.getTransactions(filters)).rejects.toThrow(
        ValidationError
      );
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should support pagination with rrdid parameter', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockTransactionResponse);
      const filters = {
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        rrdid: 1232610467,
        limit: 100000,
      };

      // Act
      await financesModule.getTransactions(filters);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
        {
          params: filters,
          rateLimitKey: 'finances.getTransactions',
        }
      );
    });
  });

  describe('getTransactionById() - Single Transaction Detail', () => {
    const mockTransactionList = [
      {
        rrd_id: 111,
        realizationreport_id: 1234567,
        date_from: '2024-01-01',
        date_to: '2024-01-07',
        ppvz_for_pay: 1000,
      },
      {
        rrd_id: 222,
        realizationreport_id: 1234568,
        date_from: '2024-01-01',
        date_to: '2024-01-07',
        ppvz_for_pay: 2000,
      },
    ];

    it('should fetch transactions and return matching transaction by ID', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockTransactionList);
      const transactionId = 222;
      const dateRange = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

      // Act
      const result = await financesModule.getTransactionById(
        transactionId,
        dateRange
      );

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
        {
          params: { ...dateRange, limit: 100000 },
          rateLimitKey: 'finances.getTransactions',
        }
      );
      expect(result).toEqual(mockTransactionList[1]);
      expect(result.rrd_id).toBe(222);
    });

    it('should throw ValidationError for invalid transaction ID (zero)', async () => {
      // Arrange
      const transactionId = 0;
      const dateRange = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

      // Act & Assert
      await expect(
        financesModule.getTransactionById(transactionId, dateRange)
      ).rejects.toThrow(ValidationError);
      await expect(
        financesModule.getTransactionById(transactionId, dateRange)
      ).rejects.toThrow('Transaction ID must be a positive number');
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should throw ValidationError for negative transaction ID', async () => {
      // Arrange
      const transactionId = -100;
      const dateRange = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

      // Act & Assert
      await expect(
        financesModule.getTransactionById(transactionId, dateRange)
      ).rejects.toThrow(ValidationError);
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when transaction not found', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockTransactionList);
      const transactionId = 999; // Non-existent ID
      const dateRange = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

      // Act & Assert
      const promise = financesModule.getTransactionById(transactionId, dateRange);
      await expect(promise).rejects.toThrow(ValidationError);
      await expect(promise).rejects.toThrow('Transaction not found with the given ID');
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDocumentCategories() - Document Categories', () => {
    const mockCategoriesResponse = {
      data: {
        categories: [
          { name: 'redeem-notification', title: 'Уведомление о выкупе' },
          { name: 'act', title: 'Акт' },
        ],
      },
    };

    it('should call BaseClient.get with correct URL and default locale', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);

      // Act
      await financesModule.getDocumentCategories();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/categories',
        {
          params: { locale: 'en' },
          rateLimitKey: 'finances.getDocumentCategories',
        }
      );
    });

    it('should support locale parameter', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);

      // Act
      await financesModule.getDocumentCategories('ru');

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/categories',
        {
          params: { locale: 'ru' },
          rateLimitKey: 'finances.getDocumentCategories',
        }
      );
    });

    it('should return typed categories response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);

      // Act
      const result = await financesModule.getDocumentCategories();

      // Assert
      expect(result).toEqual(mockCategoriesResponse);
      expect(result.data.categories).toHaveLength(2);
    });
  });

  describe('getDocuments() - Document List', () => {
    const mockDocumentsResponse = {
      data: {
        documents: [
          {
            serviceName: 'doc-123',
            name: 'redeem-notification',
            category: 'Уведомление о выкупе',
            extensions: ['pdf', 'zip'],
            creationTime: '2024-07-09T10:00:00Z',
            viewed: false,
          },
        ],
      },
    };

    it('should call BaseClient.get without filters', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockDocumentsResponse);

      // Act
      await financesModule.getDocuments();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/list',
        {
          params: undefined,
          rateLimitKey: 'finances.getDocuments',
        }
      );
    });

    it('should pass filters to BaseClient.get', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockDocumentsResponse);
      const filters = {
        beginTime: '2024-07-09',
        endTime: '2024-07-15',
        sort: 'date' as const,
        order: 'desc' as const,
      };

      // Act
      await financesModule.getDocuments(filters);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/list',
        {
          params: filters,
          rateLimitKey: 'finances.getDocuments',
        }
      );
    });

    it('should return typed documents list response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockDocumentsResponse);

      // Act
      const result = await financesModule.getDocuments();

      // Assert
      expect(result).toEqual(mockDocumentsResponse);
      expect(result.data.documents).toHaveLength(1);
      expect(result.data.documents[0].serviceName).toBe('doc-123');
    });
  });

  describe('downloadDocument() - Single Document Download', () => {
    const mockDownloadResponse = {
      data: {
        fileName: 'document.pdf',
        extension: 'pdf',
        document: 'base64EncodedContent',
      },
    };

    it('should call BaseClient.get with correct parameters', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockDownloadResponse);

      // Act
      await financesModule.downloadDocument('doc-123', 'pdf');

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/download',
        {
          params: { serviceName: 'doc-123', extension: 'pdf' },
          rateLimitKey: 'finances.downloadDocument',
        }
      );
    });

    it('should throw ValidationError when serviceName is empty', async () => {
      // Act & Assert
      await expect(
        financesModule.downloadDocument('', 'pdf')
      ).rejects.toThrow(ValidationError);
      await expect(
        financesModule.downloadDocument('', 'pdf')
      ).rejects.toThrow('Service name and extension are required');
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when extension is empty', async () => {
      // Act & Assert
      await expect(
        financesModule.downloadDocument('doc-123', '')
      ).rejects.toThrow(ValidationError);
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should return typed download response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockDownloadResponse);

      // Act
      const result = await financesModule.downloadDocument('doc-123', 'pdf');

      // Assert
      expect(result).toEqual(mockDownloadResponse);
      expect(result.data.fileName).toBe('document.pdf');
      expect(result.data.extension).toBe('pdf');
    });
  });

  describe('downloadDocuments() - Multiple Documents Download', () => {
    const mockArchiveResponse = {
      data: {
        fileName: 'documents.zip',
        extension: 'zip',
        document: 'base64EncodedZipContent',
      },
    };

    it('should call BaseClient.post with correct body and rate limit key', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockArchiveResponse);
      const documents = [
        { serviceName: 'doc-123', extension: 'pdf' },
        { serviceName: 'doc-456', extension: 'xlsx' },
      ];

      // Act
      await financesModule.downloadDocuments(documents);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://documents-api.wildberries.ru/api/v1/documents/download/all',
        { params: documents },
        { rateLimitKey: 'finances.downloadDocuments' }
      );
    });

    it('should throw ValidationError for empty documents array', async () => {
      // Act & Assert
      await expect(financesModule.downloadDocuments([])).rejects.toThrow(
        ValidationError
      );
      await expect(financesModule.downloadDocuments([])).rejects.toThrow(
        'At least one document must be specified'
      );
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError for more than 50 documents', async () => {
      // Arrange
      const tooManyDocuments = Array.from({ length: 51 }, (_, i) => ({
        serviceName: `doc-${i}`,
        extension: 'pdf',
      }));

      // Act & Assert
      await expect(
        financesModule.downloadDocuments(tooManyDocuments)
      ).rejects.toThrow(ValidationError);
      await expect(
        financesModule.downloadDocuments(tooManyDocuments)
      ).rejects.toThrow('Maximum 50 documents allowed per request');
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should return typed archive download response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockArchiveResponse);
      const documents = [{ serviceName: 'doc-123', extension: 'pdf' }];

      // Act
      const result = await financesModule.downloadDocuments(documents);

      // Assert
      expect(result).toEqual(mockArchiveResponse);
      expect(result.data.extension).toBe('zip');
    });

    it('should accept exactly 50 documents', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockArchiveResponse);
      const fiftyDocuments = Array.from({ length: 50 }, (_, i) => ({
        serviceName: `doc-${i}`,
        extension: 'pdf',
      }));

      // Act
      await financesModule.downloadDocuments(fiftyDocuments);

      // Assert
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });
  });

  // ============================================================================
  // Financial Reports Tests (Story 3.2)
  // ============================================================================

  describe('generateReport() - Generate Financial Report', () => {
    const mockReportResponse = {
      reportId: 'rpt_abc123',
      status: 'pending' as const,
      createdAt: '2024-01-15T10:30:00Z',
    };

    it('should call BaseClient.post with correct URL, body, and rate limit key', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockReportResponse);

      // Act
      await financesModule.generateReport(
        'sales_summary',
        { from: '2024-01-01', to: '2024-12-31' },
        'pdf'
      );

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://finance-api.wildberries.ru/api/v1/reports/generate',
        {
          reportType: 'sales_summary',
          dateRange: { from: '2024-01-01', to: '2024-12-31' },
          format: 'pdf',
        },
        { rateLimitKey: 'finances.generateReport' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should default to PDF format when not specified', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockReportResponse);

      // Act
      await financesModule.generateReport('tax_report', {
        from: '2024-01-01',
        to: '2024-03-31',
      });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ format: 'pdf' }),
        expect.any(Object)
      );
    });

    it('should accept all report types', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockReportResponse);
      const reportTypes = ['sales_summary', 'tax_report', 'commission_breakdown', 'detailed_transactions'] as const;

      // Act & Assert
      for (const reportType of reportTypes) {
        await financesModule.generateReport(reportType, { from: '2024-01-01', to: '2024-12-31' });
        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ reportType }),
          expect.any(Object)
        );
      }
    });

    it('should accept all report formats', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockReportResponse);
      const formats = ['pdf', 'csv', 'json', 'xlsx'] as const;

      // Act & Assert
      for (const format of formats) {
        await financesModule.generateReport('sales_summary', { from: '2024-01-01', to: '2024-12-31' }, format);
        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ format }),
          expect.any(Object)
        );
      }
    });

    it('should handle Date objects in dateRange', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockReportResponse);
      const fromDate = new Date('2024-01-01');
      const toDate = new Date('2024-12-31');

      // Act
      await financesModule.generateReport('sales_summary', { from: fromDate, to: toDate });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          dateRange: {
            from: fromDate.toISOString(),
            to: toDate.toISOString(),
          },
        }),
        expect.any(Object)
      );
    });

    it('should throw ValidationError if dateFrom is after dateTo', async () => {
      // Act & Assert
      await expect(
        financesModule.generateReport('sales_summary', { from: '2024-12-31', to: '2024-01-01' })
      ).rejects.toThrow(ValidationError);
      await expect(
        financesModule.generateReport('sales_summary', { from: '2024-12-31', to: '2024-01-01' })
      ).rejects.toThrow('dateFrom must be before dateTo');
    });

    it('should return typed report generation response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockReportResponse);

      // Act
      const result = await financesModule.generateReport('sales_summary', {
        from: '2024-01-01',
        to: '2024-12-31',
      });

      // Assert
      expect(result).toEqual(mockReportResponse);
      expect(result.reportId).toBe('rpt_abc123');
      expect(result.status).toBe('pending');
    });
  });

  describe('getReport() - Get Report Status', () => {
    const mockReportPending = {
      id: 'rpt_abc123',
      type: 'sales_summary' as const,
      status: 'pending' as const,
      format: 'pdf' as const,
      url: null,
      expiresAt: null,
      createdAt: '2024-01-15T10:30:00Z',
    };

    const mockReportCompleted = {
      id: 'rpt_abc123',
      type: 'sales_summary' as const,
      status: 'completed' as const,
      format: 'pdf' as const,
      url: 'https://s3.example.com/reports/rpt_abc123.pdf',
      expiresAt: '2024-01-16T10:30:00Z',
      createdAt: '2024-01-15T10:30:00Z',
    };

    it('should call BaseClient.get with correct URL and rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportPending);

      // Act
      await financesModule.getReport('rpt_abc123');

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://finance-api.wildberries.ru/api/v1/reports/rpt_abc123',
        { rateLimitKey: 'finances.getReport' }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return pending report status', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportPending);

      // Act
      const result = await financesModule.getReport('rpt_abc123');

      // Assert
      expect(result.status).toBe('pending');
      expect(result.url).toBeNull();
      expect(result.expiresAt).toBeNull();
    });

    it('should return completed report with download URL', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportCompleted);

      // Act
      const result = await financesModule.getReport('rpt_abc123');

      // Assert
      expect(result.status).toBe('completed');
      expect(result.url).toBe('https://s3.example.com/reports/rpt_abc123.pdf');
      expect(result.expiresAt).toBe('2024-01-16T10:30:00Z');
    });

    it('should throw ValidationError for empty report ID', async () => {
      // Act & Assert
      await expect(financesModule.getReport('')).rejects.toThrow(ValidationError);
      await expect(financesModule.getReport('   ')).rejects.toThrow('Report ID cannot be empty');
    });
  });

  describe('downloadReport() - Download Completed Report', () => {
    const mockReportCompleted = {
      id: 'rpt_abc123',
      type: 'sales_summary' as const,
      status: 'completed' as const,
      format: 'pdf' as const,
      url: 'https://s3.example.com/reports/rpt_abc123.pdf',
      expiresAt: '2024-01-16T10:30:00Z',
      createdAt: '2024-01-15T10:30:00Z',
    };

    const mockReportPending = {
      id: 'rpt_abc123',
      type: 'sales_summary' as const,
      status: 'pending' as const,
      format: 'pdf' as const,
      url: null,
      expiresAt: null,
      createdAt: '2024-01-15T10:30:00Z',
    };

    it('should return download URL for completed report', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportCompleted);

      // Act
      const result = await financesModule.downloadReport('rpt_abc123');

      // Assert
      expect(result.url).toBe('https://s3.example.com/reports/rpt_abc123.pdf');
      expect(result.format).toBe('pdf');
      expect(result.expiresAt).toBe('2024-01-16T10:30:00Z');
    });

    it('should throw ValidationError for pending report', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportPending);

      // Act & Assert
      await expect(financesModule.downloadReport('rpt_abc123')).rejects.toThrow(ValidationError);
      await expect(financesModule.downloadReport('rpt_abc123')).rejects.toThrow(
        'Report not ready for download'
      );
    });

    it('should throw ValidationError for failed report', async () => {
      // Arrange
      const mockReportFailed = {
        ...mockReportPending,
        status: 'failed' as const,
        error: 'Report generation failed',
      };
      mockClient.get.mockResolvedValue(mockReportFailed);

      // Act & Assert
      await expect(financesModule.downloadReport('rpt_abc123')).rejects.toThrow(ValidationError);
      await expect(financesModule.downloadReport('rpt_abc123')).rejects.toThrow('Current status: failed');
    });

    it('should throw ValidationError if completed report has no URL', async () => {
      // Arrange
      const mockReportBroken = {
        ...mockReportCompleted,
        url: null,
      };
      mockClient.get.mockResolvedValue(mockReportBroken);

      // Act & Assert
      await expect(financesModule.downloadReport('rpt_abc123')).rejects.toThrow(ValidationError);
      await expect(financesModule.downloadReport('rpt_abc123')).rejects.toThrow(
        'download URL not available'
      );
    });
  });

  // ============================================================================
  // Payouts Tests (Story 3.2)
  // ============================================================================

  describe('getPayouts() - Get Payout History', () => {
    const mockPayoutsResponse = {
      data: [
        {
          id: 'payout_xyz789',
          amount: 50000,
          date: '2024-01-20',
          status: 'completed' as const,
          bankInfo: {
            bankName: 'Sberbank',
            accountNumber: '****1234',
            transferDate: '2024-01-20',
          },
          currency: 'RUB',
          transactionCount: 150,
        },
      ],
      pagination: {
        total: 1,
        offset: 0,
        limit: 50,
        hasMore: false,
      },
    };

    it('should call BaseClient.get with correct URL and rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutsResponse);

      // Act
      await financesModule.getPayouts();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://finance-api.wildberries.ru/api/v1/payouts',
        {
          params: undefined,
          rateLimitKey: 'finances.getPayouts',
        }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should pass filter parameters correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutsResponse);
      const filters = {
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
        status: 'completed' as const,
        limit: 50,
        offset: 0,
      };

      // Act
      await financesModule.getPayouts(filters);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(expect.any(String), {
        params: filters,
        rateLimitKey: 'finances.getPayouts',
      });
    });

    it('should filter by date range', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutsResponse);

      // Act
      await financesModule.getPayouts({
        dateFrom: '2024-01-01',
        dateTo: '2024-01-31',
      });

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            dateFrom: '2024-01-01',
            dateTo: '2024-01-31',
          }) as Record<string, unknown>,
        }) as Record<string, unknown>
      );
    });

    it('should filter by status', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutsResponse);
      const statuses = ['pending', 'processing', 'completed', 'failed', 'cancelled'] as const;

      // Act & Assert
      for (const status of statuses) {
        await financesModule.getPayouts({ status });
        expect(mockClient.get).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            params: expect.objectContaining({ status }) as Record<string, unknown>,
          }) as Record<string, unknown>
        );
      }
    });

    it('should support pagination', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutsResponse);

      // Act
      await financesModule.getPayouts({ limit: 25, offset: 50 });

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            limit: 25,
            offset: 50,
          }) as Record<string, unknown>,
        }) as Record<string, unknown>
      );
    });

    it('should return typed payout list response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutsResponse);

      // Act
      const result = await financesModule.getPayouts();

      // Assert
      expect(result).toEqual(mockPayoutsResponse);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('payout_xyz789');
      expect(result.data[0].amount).toBe(50000);
      expect(result.data[0].bankInfo.accountNumber).toBe('****1234');
    });
  });

  describe('getPayoutById() - Get Payout Details', () => {
    const mockPayoutDetail = {
      id: 'payout_xyz789',
      amount: 50000,
      date: '2024-01-20',
      status: 'completed' as const,
      bankInfo: {
        bankName: 'Sberbank',
        accountNumber: '****1234',
        transferDate: '2024-01-20',
        bankCode: 'SABRRUMM',
      },
      currency: 'RUB',
      feeBreakdown: {
        commission: 5000,
        processingFee: 500,
        totalFees: 5500,
        netAmount: 44500,
        currency: 'RUB',
      },
      transactionIds: [1232610467, 1232610468],
      transactionCount: 150,
      periodFrom: '2024-01-01',
      periodTo: '2024-01-20',
    };

    it('should call BaseClient.get with correct URL and rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutDetail);

      // Act
      await financesModule.getPayoutById('payout_xyz789');

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://finance-api.wildberries.ru/api/v1/payouts/payout_xyz789',
        { rateLimitKey: 'finances.getPayoutById' }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return typed payout detail response with fee breakdown', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutDetail);

      // Act
      const result = await financesModule.getPayoutById('payout_xyz789');

      // Assert
      expect(result).toEqual(mockPayoutDetail);
      expect(result.feeBreakdown.commission).toBe(5000);
      expect(result.feeBreakdown.processingFee).toBe(500);
      expect(result.feeBreakdown.totalFees).toBe(5500);
      expect(result.feeBreakdown.netAmount).toBe(44500);
    });

    it('should include bank transfer information', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockPayoutDetail);

      // Act
      const result = await financesModule.getPayoutById('payout_xyz789');

      // Assert
      expect(result.bankInfo.bankName).toBe('Sberbank');
      expect(result.bankInfo.accountNumber).toBe('****1234');
      expect(result.bankInfo.transferDate).toBe('2024-01-20');
      expect(result.bankInfo.bankCode).toBe('SABRRUMM');
    });

    it('should throw ValidationError for empty payout ID', async () => {
      // Act & Assert
      await expect(financesModule.getPayoutById('')).rejects.toThrow(ValidationError);
      await expect(financesModule.getPayoutById('   ')).rejects.toThrow('Payout ID cannot be empty');
    });
  });
});
