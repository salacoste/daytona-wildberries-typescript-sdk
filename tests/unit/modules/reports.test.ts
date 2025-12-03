/**
 * Unit tests for ReportsModule
 *
 * @module tests/unit/modules/reports
 */

/* eslint-disable @typescript-eslint/unbound-method */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReportsModule } from '../../../src/modules/reports';
import type { BaseClient } from '../../../src/client/base-client';
import type {
  IncomesItem,
  StocksItem,
  OrdersItem,
  SalesItem,
  ExciseReportResponse,
  ReportTaskResponse,
  ReportStatus,
} from '../../../src/types/reports.types';

describe('ReportsModule', () => {
  let mockClient: BaseClient;
  let reports: ReportsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as unknown as BaseClient;

    reports = new ReportsModule(mockClient);
  });

  describe('getIncomes()', () => {
    it('should fetch incomes with dateFrom parameter', async () => {
      const mockIncomes: IncomesItem[] = [
        {
          incomeId: 12345,
          number: 'УПД123',
          date: '2024-01-01T10:00:00',
          lastChangeDate: '2024-01-01T10:30:00',
          supplierArticle: 'ART-001',
          techSize: '0',
          barcode: '2000328074123',
          quantity: 10,
          totalPrice: 1500,
          dateClose: '2024-01-01T12:00:00',
          warehouseName: 'Подольск',
          nmId: 123456,
          status: 'Принято',
        },
      ];

      vi.mocked(mockClient).get.mockResolvedValue(mockIncomes);

      const result = await reports.getIncomes('2024-01-01');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v1/supplier/incomes',
        {
          params: { dateFrom: '2024-01-01' },
          rateLimitKey: 'reports.getIncomes',
        }
      );
      expect(result).toEqual(mockIncomes);
      expect(result[0].nmId).toBe(123456);
    });

    it('should fetch incomes with flag=0 parameter', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      await reports.getIncomes('2024-01-01', 0);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v1/supplier/incomes',
        {
          params: { dateFrom: '2024-01-01', flag: 0 },
          rateLimitKey: 'reports.getIncomes',
        }
      );
    });

    it('should fetch incomes with flag=1 parameter', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      await reports.getIncomes('2024-01-01', 1);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v1/supplier/incomes',
        {
          params: { dateFrom: '2024-01-01', flag: 1 },
          rateLimitKey: 'reports.getIncomes',
        }
      );
    });

    it('should return empty array when no incomes available', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      const result = await reports.getIncomes('2024-01-01');

      expect(result).toEqual([]);
    });

    it('should use correct rate limit key', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      await reports.getIncomes('2024-01-01');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.getIncomes',
        })
      );
    });
  });

  describe('getStocks()', () => {
    it('should fetch stocks with dateFrom parameter', async () => {
      const mockStocks: StocksItem[] = [
        {
          lastChangeDate: '2024-01-01T10:00:00',
          warehouseName: 'Краснодар',
          supplierArticle: 'ART-001',
          nmId: 123456,
          barcode: '2037401340280',
          quantity: 50,
          inWayToClient: 5,
          inWayFromClient: 2,
          quantityFull: 57,
          category: 'Электроника',
          subject: 'Телефоны',
          brand: 'TestBrand',
          techSize: '0',
          Price: 1000,
          Discount: 10,
          isSupply: true,
          isRealization: false,
          SCCode: 'SC001',
        },
      ];

      vi.mocked(mockClient).get.mockResolvedValue(mockStocks);

      const result = await reports.getStocks('2019-01-01');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v1/supplier/stocks',
        {
          params: { dateFrom: '2019-01-01' },
          rateLimitKey: 'reports.getStocks',
        }
      );
      expect(result).toEqual(mockStocks);
      expect(result[0].quantityFull).toBe(57);
    });

    it('should validate quantity breakdown in stocks', async () => {
      const mockStocks: StocksItem[] = [
        {
          lastChangeDate: '2024-01-01T10:00:00',
          warehouseName: 'Краснодар',
          supplierArticle: 'ART-001',
          nmId: 123456,
          barcode: '2037401340280',
          quantity: 50,
          inWayToClient: 5,
          inWayFromClient: 2,
          quantityFull: 57,
          category: 'Электроника',
          subject: 'Телефоны',
          brand: 'TestBrand',
          techSize: '0',
          Price: 1000,
          Discount: 10,
          isSupply: true,
          isRealization: false,
          SCCode: 'SC001',
        },
      ];

      vi.mocked(mockClient).get.mockResolvedValue(mockStocks);

      const result = await reports.getStocks('2019-01-01');

      // Verify quantityFull calculation
      const stock = result[0];
      const calculatedFull = stock.quantity + stock.inWayToClient + stock.inWayFromClient;
      expect(stock.quantityFull).toBe(calculatedFull);
    });

    it('should use correct rate limit key', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      await reports.getStocks('2019-01-01');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.getStocks',
        })
      );
    });
  });

  describe('getOrders()', () => {
    it('should fetch orders with dateFrom parameter', async () => {
      const mockOrders: OrdersItem[] = [
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
      ];

      vi.mocked(mockClient).get.mockResolvedValue(mockOrders);

      const result = await reports.getOrders('2024-01-01');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v1/supplier/orders',
        {
          params: { dateFrom: '2024-01-01' },
          rateLimitKey: 'reports.getOrders',
        }
      );
      expect(result).toEqual(mockOrders);
    });

    it('should fetch orders with flag parameter', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      await reports.getOrders('2024-01-01', 1);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v1/supplier/orders',
        {
          params: { dateFrom: '2024-01-01', flag: 1 },
          rateLimitKey: 'reports.getOrders',
        }
      );
    });

    it('should handle canceled orders', async () => {
      const mockOrders: OrdersItem[] = [
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
          isCancel: true,
          cancelDate: '2024-01-02T15:00:00',
          sticker: 'ST123',
          gNumber: 'GN123',
          srid: 'SRID123',
        },
      ];

      vi.mocked(mockClient).get.mockResolvedValue(mockOrders);

      const result = await reports.getOrders('2024-01-01');

      expect(result[0].isCancel).toBe(true);
      expect(result[0].cancelDate).not.toBe('0001-01-01T00:00:00');
    });

    it('should use correct rate limit key', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      await reports.getOrders('2024-01-01');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.getOrders',
        })
      );
    });
  });

  describe('getSales()', () => {
    it('should fetch sales with dateFrom parameter', async () => {
      const mockSales: SalesItem[] = [
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
      ];

      vi.mocked(mockClient).get.mockResolvedValue(mockSales);

      const result = await reports.getSales('2024-01-01');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v1/supplier/sales',
        {
          params: { dateFrom: '2024-01-01' },
          rateLimitKey: 'reports.getSales',
        }
      );
      expect(result).toEqual(mockSales);
    });

    it('should fetch sales with flag parameter', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      await reports.getSales('2024-01-01', 1);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://statistics-api.wildberries.ru/api/v1/supplier/sales',
        {
          params: { dateFrom: '2024-01-01', flag: 1 },
          rateLimitKey: 'reports.getSales',
        }
      );
    });

    it('should handle sales (positive paymentSaleAmount)', async () => {
      const mockSales: SalesItem[] = [
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
      ];

      vi.mocked(mockClient).get.mockResolvedValue(mockSales);

      const result = await reports.getSales('2024-01-01');

      expect(result[0].paymentSaleAmount).toBeGreaterThan(0);
      expect(result[0].saleID).toMatch(/^S/);
    });

    it('should handle returns (negative paymentSaleAmount)', async () => {
      const mockSales: SalesItem[] = [
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
          paymentSaleAmount: -100,
          forPay: -850,
          finishedPrice: 850,
          priceWithDisc: 900,
          saleID: 'R1234567890',
          sticker: 'ST123',
          gNumber: 'GN123',
          srid: 'SRID123',
        },
      ];

      vi.mocked(mockClient).get.mockResolvedValue(mockSales);

      const result = await reports.getSales('2024-01-01');

      expect(result[0].paymentSaleAmount).toBeLessThan(0);
      expect(result[0].saleID).toMatch(/^R/);
    });

    it('should use correct rate limit key', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);

      await reports.getSales('2024-01-01');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.getSales',
        })
      );
    });
  });

  describe('getExciseReport()', () => {
    it('should fetch excise report with date range', async () => {
      const mockReport: ExciseReportResponse = {
        response: {
          data: [
            {
              name: 'Россия',
              price: 100,
              currency_name_short: 'руб',
              excise_short: '0102900254680370215',
              barcode: '2038893425820',
              nm_id: 123456,
              operation_type_id: 1,
            },
          ],
        },
      };

      vi.mocked(mockClient).post.mockResolvedValue(mockReport);

      const result = await reports.getExciseReport('2024-01-01', '2024-01-31');

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/excise-report',
        {},
        {
          params: { dateFrom: '2024-01-01', dateTo: '2024-01-31' },
          rateLimitKey: 'reports.getExciseReport',
        }
      );
      expect(result).toEqual(mockReport);
    });

    it('should fetch excise report with country filters', async () => {
      const mockReport: ExciseReportResponse = {
        response: { data: [] },
      };

      vi.mocked(mockClient).post.mockResolvedValue(mockReport);

      await reports.getExciseReport('2024-01-01', '2024-01-31', {
        countries: ['RU', 'BY'],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/excise-report',
        { countries: ['RU', 'BY'] },
        {
          params: { dateFrom: '2024-01-01', dateTo: '2024-01-31' },
          rateLimitKey: 'reports.getExciseReport',
        }
      );
    });

    it('should fetch excise report with brand and INN filters', async () => {
      const mockReport: ExciseReportResponse = {
        response: { data: [] },
      };

      vi.mocked(mockClient).post.mockResolvedValue(mockReport);

      await reports.getExciseReport('2024-01-01', '2024-01-31', {
        countries: ['RU'],
        brands: ['TestBrand'],
        inns: ['1234567890'],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/excise-report',
        {
          countries: ['RU'],
          brands: ['TestBrand'],
          inns: ['1234567890'],
        },
        expect.objectContaining({
          params: { dateFrom: '2024-01-01', dateTo: '2024-01-31' },
        })
      );
    });

    it('should use POST method for excise report', async () => {
      vi.mocked(mockClient).post.mockResolvedValue({
        response: { data: [] },
      });

      await reports.getExciseReport('2024-01-01', '2024-01-31');

      expect(mockClient.post).toHaveBeenCalled();
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('should use correct rate limit key', async () => {
      vi.mocked(mockClient).post.mockResolvedValue({
        response: { data: [] },
      });

      await reports.getExciseReport('2024-01-01', '2024-01-31');

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: 'reports.getExciseReport',
        })
      );
    });
  });

  describe('createWarehouseRemainsReport()', () => {
    it('should create warehouse remains report with locale', async () => {
      const mockResponse: ReportTaskResponse = {
        data: {
          taskId: 'task-abc123',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockResponse);

      const result = await reports.createWarehouseRemainsReport({
        locale: 'ru',
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains',
        {
          params: { locale: 'ru' },
          rateLimitKey: 'reports.createWarehouseRemainsReport',
        }
      );
      expect(result.data.taskId).toBe('task-abc123');
    });

    it('should create report with groupBy options', async () => {
      const mockResponse: ReportTaskResponse = {
        data: {
          taskId: 'task-def456',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockResponse);

      await reports.createWarehouseRemainsReport({
        locale: 'en',
        groupByBrand: true,
        groupBySubject: true,
        groupByNm: true,
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains',
        {
          params: {
            locale: 'en',
            groupByBrand: true,
            groupBySubject: true,
            groupByNm: true,
          },
          rateLimitKey: 'reports.createWarehouseRemainsReport',
        }
      );
    });

    it('should create report with filter options', async () => {
      const mockResponse: ReportTaskResponse = {
        data: {
          taskId: 'task-ghi789',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockResponse);

      await reports.createWarehouseRemainsReport({
        locale: 'zh',
        filterPics: 1,
        filterVolume: 3,
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains',
        {
          params: {
            locale: 'zh',
            filterPics: 1,
            filterVolume: 3,
          },
          rateLimitKey: 'reports.createWarehouseRemainsReport',
        }
      );
    });

    it('should use correct rate limit key', async () => {
      vi.mocked(mockClient).get.mockResolvedValue({
        data: { taskId: 'task-123' },
      });

      await reports.createWarehouseRemainsReport({ locale: 'ru' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.createWarehouseRemainsReport',
        })
      );
    });
  });

  describe('checkReportStatus()', () => {
    it('should check status for warehouse_remains report', async () => {
      const mockStatus: ReportStatus = {
        data: {
          id: 'task-abc123',
          status: 'done',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      const result = await reports.checkReportStatus('task-abc123', 'warehouse_remains');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/task-abc123/status',
        { rateLimitKey: 'reports.checkReportStatus.warehouse_remains' }
      );
      expect(result.data.status).toBe('done');
    });

    it('should check status for acceptance report', async () => {
      const mockStatus: ReportStatus = {
        data: {
          id: 'task-def456',
          status: 'processing',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      await reports.checkReportStatus('task-def456', 'acceptance');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/task-def456/status',
        { rateLimitKey: 'reports.checkReportStatus.acceptance' }
      );
    });

    it('should check status for paid_storage report', async () => {
      const mockStatus: ReportStatus = {
        data: {
          id: 'task-ghi789',
          status: 'new',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      await reports.checkReportStatus('task-ghi789', 'paid_storage');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/task-ghi789/status',
        { rateLimitKey: 'reports.checkReportStatus.paid_storage' }
      );
    });

    it('should handle "new" status', async () => {
      const mockStatus: ReportStatus = {
        data: {
          id: 'task-123',
          status: 'new',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      const result = await reports.checkReportStatus('task-123', 'warehouse_remains');

      expect(result.data.status).toBe('new');
    });

    it('should handle "processing" status', async () => {
      const mockStatus: ReportStatus = {
        data: {
          id: 'task-123',
          status: 'processing',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      const result = await reports.checkReportStatus('task-123', 'warehouse_remains');

      expect(result.data.status).toBe('processing');
    });

    it('should handle "done" status with file info', async () => {
      const mockStatus: ReportStatus = {
        data: {
          id: 'task-123',
          status: 'done',
          file: {
            url: 'https://download.link/report.xlsx',
          },
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      const result = await reports.checkReportStatus('task-123', 'warehouse_remains');

      expect(result.data.status).toBe('done');
      expect(result.data.file).toBeDefined();
      expect(result.data.file?.url).toBe('https://download.link/report.xlsx');
    });

    it('should handle "error" status with error message', async () => {
      const mockStatus: ReportStatus = {
        data: {
          id: 'task-123',
          status: 'error',
          error: 'Report generation failed',
        },
      };

      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      const result = await reports.checkReportStatus('task-123', 'warehouse_remains');

      expect(result.data.status).toBe('error');
      expect(result.data.error).toBe('Report generation failed');
    });

    it('should use correct rate limit keys for each report type', async () => {
      vi.mocked(mockClient).get.mockResolvedValue({
        data: { id: 'task-123', status: 'done' },
      });

      await reports.checkReportStatus('task-123', 'warehouse_remains');
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.checkReportStatus.warehouse_remains',
        })
      );

      await reports.checkReportStatus('task-456', 'acceptance');
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.checkReportStatus.acceptance',
        })
      );

      await reports.checkReportStatus('task-789', 'paid_storage');
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.checkReportStatus.paid_storage',
        })
      );
    });
  });

  describe('downloadReport()', () => {
    it('should download warehouse_remains report as Blob', async () => {
      const mockBlob = new Blob(['report data'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      vi.mocked(mockClient).get.mockResolvedValue(mockBlob);

      const result = await reports.downloadReport('task-abc123', 'warehouse_remains');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/task-abc123/download',
        {
          rateLimitKey: 'reports.downloadReport.warehouse_remains',
          responseType: 'blob',
        }
      );
      expect(result).toBeInstanceOf(Blob);
    });

    it('should download acceptance report as Blob', async () => {
      const mockBlob = new Blob(['report data']);

      vi.mocked(mockClient).get.mockResolvedValue(mockBlob);

      await reports.downloadReport('task-def456', 'acceptance');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/task-def456/download',
        {
          rateLimitKey: 'reports.downloadReport.acceptance',
          responseType: 'blob',
        }
      );
    });

    it('should download paid_storage report as Blob', async () => {
      const mockBlob = new Blob(['report data']);

      vi.mocked(mockClient).get.mockResolvedValue(mockBlob);

      await reports.downloadReport('task-ghi789', 'paid_storage');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/task-ghi789/download',
        {
          rateLimitKey: 'reports.downloadReport.paid_storage',
          responseType: 'blob',
        }
      );
    });

    it('should specify blob response type', async () => {
      vi.mocked(mockClient).get.mockResolvedValue(new Blob());

      await reports.downloadReport('task-123', 'warehouse_remains');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          responseType: 'blob',
        })
      );
    });

    it('should use correct rate limit keys for each report type', async () => {
      vi.mocked(mockClient).get.mockResolvedValue(new Blob());

      await reports.downloadReport('task-123', 'warehouse_remains');
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.downloadReport.warehouse_remains',
        })
      );

      await reports.downloadReport('task-456', 'acceptance');
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.downloadReport.acceptance',
        })
      );

      await reports.downloadReport('task-789', 'paid_storage');
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'reports.downloadReport.paid_storage',
        })
      );
    });
  });

  // ==================== Compliance Reports Tests ====================

  describe('getGoodsLabelingReport()', () => {
    const validParams = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

    it('should fetch goods labeling report with required params', async () => {
      const mockData = [{ nmId: 123, labeled: true }];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getGoodsLabelingReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-labeling',
        { params: validParams, rateLimitKey: 'reports.getGoodsLabelingReport' }
      );
      expect(result).toEqual(mockData);
    });

    it('should fetch goods labeling report with additional params', async () => {
      vi.mocked(mockClient).get.mockResolvedValue([]);
      const paramsWithFilter = { ...validParams, filter: 'test' };

      await reports.getGoodsLabelingReport(paramsWithFilter);

      expect(mockClient.get).toHaveBeenCalledWith(expect.any(String), {
        params: paramsWithFilter,
        rateLimitKey: 'reports.getGoodsLabelingReport',
      });
    });
  });

  describe('getCharacteristicsChangeReport()', () => {
    const validParams = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

    it('should fetch characteristics change report with required params', async () => {
      const mockData = [{ nmId: 123, changeType: 'update', date: '2024-01-01' }];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getCharacteristicsChangeReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/characteristics-change',
        { params: validParams, rateLimitKey: 'reports.getCharacteristicsChangeReport' }
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('getAntifraudDetailsReport()', () => {
    it('should fetch antifraud details report', async () => {
      const mockData = [{ event: 'fraud_detected', severity: 'high' }];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getAntifraudDetailsReport();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/antifraud-details',
        { params: undefined, rateLimitKey: 'reports.getAntifraudDetailsReport' }
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('getIncorrectAttachmentsReport()', () => {
    const validParams = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

    it('should fetch incorrect attachments report with required params', async () => {
      const mockData = [{ nmId: 123, issueType: 'missing_image' }];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getIncorrectAttachmentsReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/incorrect-attachments',
        { params: validParams, rateLimitKey: 'reports.getIncorrectAttachmentsReport' }
      );
      expect(result).toEqual(mockData);
    });
  });

  // ==================== Warehouse Operations Tests ====================

  describe('getWarehouseMeasurementsReport()', () => {
    const validParams = { dateTo: '2024-01-31', tab: 'penalty' as const };

    it('should fetch warehouse measurements report with required params', async () => {
      const mockData = [{ nmId: 123, volume: 100, weight: 500 }];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getWarehouseMeasurementsReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/warehouse-measurements',
        { params: validParams, rateLimitKey: 'reports.getWarehouseMeasurementsReport' }
      );
      expect(result).toEqual(mockData);
    });
  });

  // ==================== Acceptance Report Tests ====================

  describe('requestAcceptanceReport()', () => {
    const validParams = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

    it('should create acceptance report task with required params', async () => {
      const mockResponse: ReportTaskResponse = {
        data: { taskId: 'acceptance-task-123', status: 'new' },
      };
      vi.mocked(mockClient).get.mockResolvedValue(mockResponse);

      const result = await reports.requestAcceptanceReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report',
        { params: validParams, rateLimitKey: 'reports.requestAcceptanceReport' }
      );
      expect(result.data.taskId).toBe('acceptance-task-123');
    });
  });

  describe('getAcceptanceReportStatus()', () => {
    it('should check acceptance report status', async () => {
      const mockStatus: ReportStatus = {
        data: { id: 'task-123', taskId: 'task-123', status: 'done' },
      };
      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      const result = await reports.getAcceptanceReportStatus('task-123');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/task-123/status',
        { rateLimitKey: 'reports.getAcceptanceReportStatus' }
      );
      expect(result.data.status).toBe('done');
    });
  });

  describe('downloadAcceptanceReport()', () => {
    it('should download acceptance report', async () => {
      const mockBlob = new Blob();
      vi.mocked(mockClient).get.mockResolvedValue(mockBlob);

      const result = await reports.downloadAcceptanceReport('task-123');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/task-123/download',
        {
          rateLimitKey: 'reports.downloadAcceptanceReport',
          responseType: 'blob',
        }
      );
      expect(result).toBeInstanceOf(Blob);
    });
  });

  // ==================== Paid Storage Report Tests ====================

  describe('requestPaidStorageReport()', () => {
    const validParams = { dateFrom: '2024-01-01', dateTo: '2024-01-08' };

    it('should create paid storage report task with required params', async () => {
      const mockResponse: ReportTaskResponse = {
        data: { taskId: 'storage-task-456', status: 'new' },
      };
      vi.mocked(mockClient).get.mockResolvedValue(mockResponse);

      const result = await reports.requestPaidStorageReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage',
        { params: validParams, rateLimitKey: 'reports.requestPaidStorageReport' }
      );
      expect(result.data.taskId).toBe('storage-task-456');
    });
  });

  describe('getPaidStorageReportStatus()', () => {
    it('should check paid storage report status', async () => {
      const mockStatus: ReportStatus = {
        data: { id: 'task-456', taskId: 'task-456', status: 'processing' },
      };
      vi.mocked(mockClient).get.mockResolvedValue(mockStatus);

      const result = await reports.getPaidStorageReportStatus('task-456');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/task-456/status',
        { rateLimitKey: 'reports.getPaidStorageReportStatus' }
      );
      expect(result.data.status).toBe('processing');
    });
  });

  describe('downloadPaidStorageReport()', () => {
    it('should download paid storage report', async () => {
      const mockBlob = new Blob();
      vi.mocked(mockClient).get.mockResolvedValue(mockBlob);

      const result = await reports.downloadPaidStorageReport('task-456');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/task-456/download',
        {
          rateLimitKey: 'reports.downloadPaidStorageReport',
          responseType: 'blob',
        }
      );
      expect(result).toBeInstanceOf(Blob);
    });
  });

  // ==================== Analytics Reports Tests ====================

  describe('getRegionalSalesReport()', () => {
    const validParams = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

    it('should fetch regional sales report with required params', async () => {
      const mockData = [
        { region: 'Moscow', sales: 1000, revenue: 50000 },
        { region: 'St. Petersburg', sales: 500, revenue: 25000 },
      ];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getRegionalSalesReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/region-sale',
        { params: validParams, rateLimitKey: 'reports.getRegionalSalesReport' }
      );
      expect(result).toEqual(mockData);
      expect(result).toHaveLength(2);
    });
  });

  describe('getBrandsForBrandShare()', () => {
    it('should fetch brands list for brand share', async () => {
      const mockData = [
        { id: 1, name: 'Brand A' },
        { id: 2, name: 'Brand B' },
      ];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getBrandsForBrandShare();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share/brands',
        { rateLimitKey: 'reports.getBrandsForBrandShare' }
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('getParentSubjectsForBrandShare()', () => {
    it('should fetch parent subjects list for brand share', async () => {
      const mockData = [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
      ];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getParentSubjectsForBrandShare();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share/parent-subjects',
        { rateLimitKey: 'reports.getParentSubjectsForBrandShare' }
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('getBrandShareReport()', () => {
    const validParams = {
      parentId: 123,
      brand: 'TestBrand',
      dateFrom: '2024-01-01',
      dateTo: '2024-01-31',
    };

    it('should fetch brand share report with required params', async () => {
      const mockData = {
        brandName: 'TestBrand',
        marketShare: 15.5,
        totalSales: 1000,
      };
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getBrandShareReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share',
        {
          params: validParams,
          rateLimitKey: 'reports.getBrandShareReport',
        }
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('getBlockedProductsReport()', () => {
    it('should fetch blocked products report', async () => {
      const mockData = [
        { nmId: 123, blockReason: 'Policy violation' },
        { nmId: 456, blockReason: 'Quality issue' },
      ];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getBlockedProductsReport();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/banned-products/blocked',
        { params: undefined, rateLimitKey: 'reports.getBlockedProductsReport' }
      );
      expect(result).toEqual(mockData);
      expect(result).toHaveLength(2);
    });
  });

  describe('getShadowedProductsReport()', () => {
    it('should fetch shadowed products report', async () => {
      const mockData = [{ nmId: 789, reason: 'Low visibility score' }];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getShadowedProductsReport();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/banned-products/shadowed',
        { params: undefined, rateLimitKey: 'reports.getShadowedProductsReport' }
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('getGoodsReturnReport()', () => {
    const validParams = { dateFrom: '2024-01-01', dateTo: '2024-01-31' };

    it('should fetch goods return report with required params', async () => {
      const mockData = [
        { nmId: 123, returnReason: 'Size mismatch', date: '2024-01-01' },
        { nmId: 456, returnReason: 'Damaged', date: '2024-01-02' },
      ];
      vi.mocked(mockClient).get.mockResolvedValue(mockData);

      const result = await reports.getGoodsReturnReport(validParams);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-return',
        { params: validParams, rateLimitKey: 'reports.getGoodsReturnReport' }
      );
      expect(result).toEqual(mockData);
      expect(result).toHaveLength(2);
    });
  });
});
