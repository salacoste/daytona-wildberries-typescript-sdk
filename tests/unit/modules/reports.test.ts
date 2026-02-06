/**
 * Unit Tests for Reports Module (EPIC 43, 44 & 45)
 *
 * Tests cover:
 * - rateLimitKey wiring for all 29 active methods
 * - Type fixes (response types properly typed)
 * - New endpoints (measurement-penalties, warehouse-measurements, deductions)
 * - Deprecated method warnings
 * - Async task workflows (create/poll/download)
 *
 * @see {@link docs/epics/EPIC_43_REPORTS_TYPE_SCHEMA_FIXES.md}
 * @see {@link docs/epics/EPIC_44_REPORTS_NEW_REMOVED_ENDPOINTS.md}
 * @see {@link docs/epics/EPIC_45_REPORTS_CODE_QUALITY.md}
 */

/* eslint-disable @typescript-eslint/no-deprecated */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ReportsModule } from '../../../src/modules/reports';
import type { BaseClient } from '../../../src/client/base-client';

const STATISTICS_URL = 'https://statistics-api.wildberries.ru';
const ANALYTICS_URL = 'https://seller-analytics-api.wildberries.ru';

describe('ReportsModule', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: ReportsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    module = new ReportsModule(mockClient as unknown as BaseClient);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // EPIC 43: Type & Schema Fixes
  // ==========================================================================

  describe('EPIC 43: Type & Schema Fixes', () => {
    describe('Response types properly typed', () => {
      it('getBannedProductsBlocked returns BannedProductsBlockedResponse', async () => {
        const mockResponse = { data: [{ nmId: 123, reason: 'test' }] };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await module.getBannedProductsBlocked({ sort: 'nmId', order: 'desc' });

        expect(result).toEqual(mockResponse);
      });

      it('getAnalyticsGoodsReturn returns GoodsReturnResponse', async () => {
        const mockResponse = { data: [{ nmId: 123 }] };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await module.getAnalyticsGoodsReturn({
          dateFrom: '2026-01-01',
          dateTo: '2026-01-31',
        });

        expect(result).toEqual(mockResponse);
      });
    });
  });

  // ==========================================================================
  // EPIC 44: New & Removed Endpoints
  // ==========================================================================

  describe('EPIC 44: New & Removed Endpoints', () => {
    describe('New endpoints', () => {
      it('getMeasurementPenalties calls correct URL with params', async () => {
        mockClient.get.mockResolvedValue({ data: { reports: [] } });

        await module.getMeasurementPenalties({
          dateTo: '2026-02-06',
          limit: 100,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/analytics/v1/measurement-penalties`,
          expect.objectContaining({
            params: { dateTo: '2026-02-06', limit: 100 },
            rateLimitKey: 'reports.measurementPenalties',
          })
        );
      });

      it('getWarehouseMeasurementsV2 calls correct URL with params', async () => {
        mockClient.get.mockResolvedValue({ data: { reports: [] } });

        await module.getWarehouseMeasurementsV2({
          dateTo: '2026-02-06',
          limit: 100,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/analytics/v1/warehouse-measurements`,
          expect.objectContaining({
            params: { dateTo: '2026-02-06', limit: 100 },
            rateLimitKey: 'reports.warehouseMeasurementsV2',
          })
        );
      });

      it('getDeductions calls correct URL with params', async () => {
        mockClient.get.mockResolvedValue({ data: { reports: [] } });

        await module.getDeductions({
          dateTo: '2026-02-06',
          limit: 100,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/analytics/v1/deductions`,
          expect.objectContaining({
            params: { dateTo: '2026-02-06', limit: 100 },
            rateLimitKey: 'reports.deductions',
          })
        );
      });
    });

    describe('Deprecated methods show warnings', () => {
      it('getSupplierIncomes shows deprecation warning', async () => {
        mockClient.get.mockResolvedValue([]);

        await module.getSupplierIncomes({ dateFrom: '2026-01-01' });

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
      });

      it('getAnalyticsWarehouseMeasurements shows deprecation warning', async () => {
        mockClient.get.mockResolvedValue({});

        await module.getAnalyticsWarehouseMeasurements({
          dateTo: '2026-02-06',
          tab: 'penalty',
          limit: 100,
        });

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
      });

      it('getAnalyticsIncorrectAttachments shows deprecation warning', async () => {
        mockClient.get.mockResolvedValue({});

        await module.getAnalyticsIncorrectAttachments({
          dateFrom: '2026-01-01',
          dateTo: '2026-01-31',
        });

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
      });

      it('getAnalyticsCharacteristicsChange shows deprecation warning', async () => {
        mockClient.get.mockResolvedValue({});

        await module.getAnalyticsCharacteristicsChange({
          dateFrom: '2026-01-01',
          dateTo: '2026-01-31',
        });

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
      });
    });

    describe('Renamed methods with deprecated wrappers', () => {
      it('getTasksStatu calls getWarehouseRemainsTaskStatus', async () => {
        mockClient.get.mockResolvedValue({ data: { status: 'done' } });

        await module.getTasksStatu('task-uuid');

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('warehouse_remains/tasks/task-uuid/status'),
          expect.anything()
        );
      });

      it('getTasksDownload calls downloadWarehouseRemainsReport', async () => {
        mockClient.get.mockResolvedValue([]);

        await module.getTasksDownload('task-uuid');

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('warehouse_remains/tasks/task-uuid/download'),
          expect.anything()
        );
      });

      it('getTasksStatu2 calls getAcceptanceReportTaskStatus', async () => {
        mockClient.get.mockResolvedValue({ data: { status: 'done' } });

        await module.getTasksStatu2('task-uuid');

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
      });

      it('getTasksDownload2 calls downloadAcceptanceReport', async () => {
        mockClient.get.mockResolvedValue([]);

        await module.getTasksDownload2('task-uuid');

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
      });

      it('getTasksStatu3 calls getPaidStorageTaskStatus', async () => {
        mockClient.get.mockResolvedValue({ data: { status: 'done' } });

        await module.getTasksStatu3('task-uuid');

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
      });

      it('getTasksDownload3 calls downloadPaidStorageReport', async () => {
        mockClient.get.mockResolvedValue({});

        await module.getTasksDownload3('task-uuid');

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('FINAL WARNING'));
      });
    });
  });

  // ==========================================================================
  // EPIC 45: Rate Limit Key Wiring
  // ==========================================================================

  describe('EPIC 45: Rate Limit Key Wiring', () => {
    describe('Statistics API methods', () => {
      it('getSupplierIncomes passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue([]);
        await module.getSupplierIncomes({ dateFrom: '2026-01-01' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${STATISTICS_URL}/api/v1/supplier/incomes`,
          expect.objectContaining({ rateLimitKey: 'reports.supplierIncomes' })
        );
      });

      it('getSupplierStocks passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue([]);
        await module.getSupplierStocks({ dateFrom: '2026-01-01' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${STATISTICS_URL}/api/v1/supplier/stocks`,
          expect.objectContaining({ rateLimitKey: 'reports.supplierStocks' })
        );
      });

      it('getSupplierOrders passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue([]);
        await module.getSupplierOrders({ dateFrom: '2026-01-01' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${STATISTICS_URL}/api/v1/supplier/orders`,
          expect.objectContaining({ rateLimitKey: 'reports.supplierOrders' })
        );
      });

      it('getSupplierSales passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue([]);
        await module.getSupplierSales({ dateFrom: '2026-01-01' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${STATISTICS_URL}/api/v1/supplier/sales`,
          expect.objectContaining({ rateLimitKey: 'reports.supplierSales' })
        );
      });
    });

    describe('Excise report', () => {
      it('createAnalyticsExciseReport passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({});
        await module.createAnalyticsExciseReport(
          { dateFrom: '2026-01-01', dateTo: '2026-01-31' },
          { countries: ['RU'] }
        );

        expect(mockClient.post).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/excise-report`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'reports.postAnalyticsExciseReport' })
        );
      });
    });

    describe('Warehouse remains workflow', () => {
      it('warehouseRemains passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: { taskId: 'uuid' } });
        await module.warehouseRemains({});

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/warehouse_remains`,
          expect.objectContaining({ rateLimitKey: 'reports.warehouse_remains' })
        );
      });

      it('getWarehouseRemainsTaskStatus passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: { status: 'done' } });
        await module.getWarehouseRemainsTaskStatus('task-uuid');

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('warehouse_remains/tasks/task-uuid/status'),
          expect.objectContaining({ rateLimitKey: 'reports.warehouse_remainsTasksStatus' })
        );
      });

      it('downloadWarehouseRemainsReport passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue([]);
        await module.downloadWarehouseRemainsReport('task-uuid');

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('warehouse_remains/tasks/task-uuid/download'),
          expect.objectContaining({ rateLimitKey: 'reports.warehouse_remainsTasksDownload' })
        );
      });
    });

    describe('Acceptance report workflow', () => {
      it('acceptanceReport passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: { taskId: 'uuid' } });
        await module.acceptanceReport({ dateFrom: '2026-01-01', dateTo: '2026-01-31' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/acceptance_report`,
          expect.objectContaining({ rateLimitKey: 'reports.acceptance_report' })
        );
      });

      it('getAcceptanceReportTaskStatus passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: { status: 'done' } });
        await module.getAcceptanceReportTaskStatus('task-uuid');

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('acceptance_report/tasks/task-uuid/status'),
          expect.objectContaining({ rateLimitKey: 'reports.acceptance_reportTasksStatus' })
        );
      });

      it('downloadAcceptanceReport passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue([]);
        await module.downloadAcceptanceReport('task-uuid');

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('acceptance_report/tasks/task-uuid/download'),
          expect.objectContaining({ rateLimitKey: 'reports.acceptance_reportTasksDownload' })
        );
      });
    });

    describe('Paid storage workflow', () => {
      it('paidStorage passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: { taskId: 'uuid' } });
        await module.paidStorage({ dateFrom: '2026-01-01', dateTo: '2026-01-08' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/paid_storage`,
          expect.objectContaining({ rateLimitKey: 'reports.paid_storage' })
        );
      });

      it('getPaidStorageTaskStatus passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: { status: 'done' } });
        await module.getPaidStorageTaskStatus('task-uuid');

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('paid_storage/tasks/task-uuid/status'),
          expect.objectContaining({ rateLimitKey: 'reports.paid_storageTasksStatus' })
        );
      });

      it('downloadPaidStorageReport passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.downloadPaidStorageReport('task-uuid');

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('paid_storage/tasks/task-uuid/download'),
          expect.objectContaining({ rateLimitKey: 'reports.paid_storageTasksDownload' })
        );
      });
    });

    describe('Analytics reports', () => {
      it('getAnalyticsAntifraudDetails passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getAnalyticsAntifraudDetails({ date: '2026-01-15' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/antifraud-details`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsAntifraudDetails' })
        );
      });

      it('getAnalyticsGoodsLabeling passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getAnalyticsGoodsLabeling({ dateFrom: '2026-01-01', dateTo: '2026-01-31' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/goods-labeling`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsGoodsLabeling' })
        );
      });

      it('getAnalyticsRegionSale passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getAnalyticsRegionSale({ dateFrom: '2026-01-01', dateTo: '2026-01-31' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/region-sale`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsRegionSale' })
        );
      });

      it('getAnalyticsGoodsReturn passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getAnalyticsGoodsReturn({ dateFrom: '2026-01-01', dateTo: '2026-01-31' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/goods-return`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsGoodsReturn' })
        );
      });
    });

    describe('Brand share reports', () => {
      it('getBrandShareBrands passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getBrandShareBrands();

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/brand-share/brands`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsBrandShareBrands' })
        );
      });

      it('getBrandShareParentSubjects passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getBrandShareParentSubjects({
          brand: 'TestBrand',
          dateFrom: '2026-01-01',
          dateTo: '2026-01-31',
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/brand-share/parent-subjects`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsBrandShareParentSubjects' })
        );
      });

      it('getAnalyticsBrandShare passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getAnalyticsBrandShare({
          parentId: 123,
          brand: 'TestBrand',
          dateFrom: '2026-01-01',
          dateTo: '2026-01-31',
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/brand-share`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsBrandShare' })
        );
      });
    });

    describe('Banned products reports', () => {
      it('getBannedProductsBlocked passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getBannedProductsBlocked({ sort: 'nmId', order: 'desc' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/banned-products/blocked`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsBannedProductsBlocked' })
        );
      });

      it('getBannedProductsShadowed passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getBannedProductsShadowed({ sort: 'nmId', order: 'desc' });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/banned-products/shadowed`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsBannedProductsShadowed' })
        );
      });
    });

    describe('Deprecated methods still pass rateLimitKey', () => {
      it('getAnalyticsWarehouseMeasurements passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getAnalyticsWarehouseMeasurements({
          dateTo: '2026-02-06',
          tab: 'penalty',
          limit: 100,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/warehouse-measurements`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsWarehouseMeasurements' })
        );
      });

      it('getAnalyticsIncorrectAttachments passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getAnalyticsIncorrectAttachments({
          dateFrom: '2026-01-01',
          dateTo: '2026-01-31',
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/incorrect-attachments`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsIncorrectAttachments' })
        );
      });

      it('getAnalyticsCharacteristicsChange passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({});
        await module.getAnalyticsCharacteristicsChange({
          dateFrom: '2026-01-01',
          dateTo: '2026-01-31',
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          `${ANALYTICS_URL}/api/v1/analytics/characteristics-change`,
          expect.objectContaining({ rateLimitKey: 'reports.analyticsCharacteristicsChange' })
        );
      });
    });
  });

  // ==========================================================================
  // Async Task Workflow Tests
  // ==========================================================================

  describe('Async Task Workflows', () => {
    describe('Warehouse Remains create/poll/download', () => {
      it('complete workflow: create task → poll status → download report', async () => {
        // Step 1: Create task
        mockClient.get.mockResolvedValueOnce({ data: { taskId: 'wr-task-123' } });
        const createResult = await module.warehouseRemains({ groupByBrand: true });
        expect(createResult.data?.taskId).toBe('wr-task-123');

        // Step 2: Poll status
        mockClient.get.mockResolvedValueOnce({ data: { status: 'done' } });
        const statusResult = await module.getWarehouseRemainsTaskStatus('wr-task-123');
        expect(statusResult.data?.status).toBe('done');

        // Step 3: Download report
        mockClient.get.mockResolvedValueOnce([{ nmId: 123, brand: 'Test' }]);
        const downloadResult = await module.downloadWarehouseRemainsReport('wr-task-123');
        expect(downloadResult).toHaveLength(1);
      });
    });

    describe('Acceptance Report create/poll/download', () => {
      it('complete workflow: create task → poll status → download report', async () => {
        // Step 1: Create task
        mockClient.get.mockResolvedValueOnce({ data: { taskId: 'ar-task-456' } });
        const createResult = await module.acceptanceReport({
          dateFrom: '2026-01-01',
          dateTo: '2026-01-31',
        });
        expect(createResult.data?.taskId).toBe('ar-task-456');

        // Step 2: Poll status
        mockClient.get.mockResolvedValueOnce({ data: { status: 'done' } });
        const statusResult = await module.getAcceptanceReportTaskStatus('ar-task-456');
        expect(statusResult.data?.status).toBe('done');

        // Step 3: Download report
        mockClient.get.mockResolvedValueOnce([{ nmId: 456 }]);
        const downloadResult = await module.downloadAcceptanceReport('ar-task-456');
        expect(downloadResult).toHaveLength(1);
      });
    });

    describe('Paid Storage create/poll/download', () => {
      it('complete workflow: create task → poll status → download report', async () => {
        // Step 1: Create task
        mockClient.get.mockResolvedValueOnce({ data: { taskId: 'ps-task-789' } });
        const createResult = await module.paidStorage({
          dateFrom: '2026-01-01',
          dateTo: '2026-01-08',
        });
        expect(createResult.data?.taskId).toBe('ps-task-789');

        // Step 2: Poll status
        mockClient.get.mockResolvedValueOnce({ data: { status: 'done' } });
        const statusResult = await module.getPaidStorageTaskStatus('ps-task-789');
        expect(statusResult.data?.status).toBe('done');

        // Step 3: Download report (ResponsePaidStorage is an array type)
        mockClient.get.mockResolvedValueOnce([{ date: '2026-01-01', nmId: 789 }]);
        const downloadResult = await module.downloadPaidStorageReport('ps-task-789');
        expect(downloadResult).toHaveLength(1);
      });
    });
  });

  // ==========================================================================
  // All Methods Exist
  // ==========================================================================

  describe('All module methods exist', () => {
    it('should have all 35 methods (29 active + 6 deprecated wrappers)', () => {
      // Statistics API (4)
      expect(typeof module.getSupplierIncomes).toBe('function');
      expect(typeof module.getSupplierStocks).toBe('function');
      expect(typeof module.getSupplierOrders).toBe('function');
      expect(typeof module.getSupplierSales).toBe('function');

      // Excise report (1)
      expect(typeof module.createAnalyticsExciseReport).toBe('function');

      // Warehouse remains (3 + 2 deprecated)
      expect(typeof module.warehouseRemains).toBe('function');
      expect(typeof module.getWarehouseRemainsTaskStatus).toBe('function');
      expect(typeof module.downloadWarehouseRemainsReport).toBe('function');
      expect(typeof module.getTasksStatu).toBe('function');
      expect(typeof module.getTasksDownload).toBe('function');

      // Deprecated analytics (3)
      expect(typeof module.getAnalyticsWarehouseMeasurements).toBe('function');
      expect(typeof module.getAnalyticsIncorrectAttachments).toBe('function');
      expect(typeof module.getAnalyticsCharacteristicsChange).toBe('function');

      // Active analytics (3)
      expect(typeof module.getAnalyticsAntifraudDetails).toBe('function');
      expect(typeof module.getAnalyticsGoodsLabeling).toBe('function');
      expect(typeof module.getAnalyticsRegionSale).toBe('function');

      // Acceptance report (3 + 2 deprecated)
      expect(typeof module.acceptanceReport).toBe('function');
      expect(typeof module.getAcceptanceReportTaskStatus).toBe('function');
      expect(typeof module.downloadAcceptanceReport).toBe('function');
      expect(typeof module.getTasksStatu2).toBe('function');
      expect(typeof module.getTasksDownload2).toBe('function');

      // Paid storage (3 + 2 deprecated)
      expect(typeof module.paidStorage).toBe('function');
      expect(typeof module.getPaidStorageTaskStatus).toBe('function');
      expect(typeof module.downloadPaidStorageReport).toBe('function');
      expect(typeof module.getTasksStatu3).toBe('function');
      expect(typeof module.getTasksDownload3).toBe('function');

      // Brand share (3)
      expect(typeof module.getBrandShareBrands).toBe('function');
      expect(typeof module.getBrandShareParentSubjects).toBe('function');
      expect(typeof module.getAnalyticsBrandShare).toBe('function');

      // Banned products (2)
      expect(typeof module.getBannedProductsBlocked).toBe('function');
      expect(typeof module.getBannedProductsShadowed).toBe('function');

      // Goods return (1)
      expect(typeof module.getAnalyticsGoodsReturn).toBe('function');

      // New EPIC 44 endpoints (3)
      expect(typeof module.getMeasurementPenalties).toBe('function');
      expect(typeof module.getWarehouseMeasurementsV2).toBe('function');
      expect(typeof module.getDeductions).toBe('function');
    });
  });
});
