/**
 * Unit tests for ReturnsModule.getReturns()
 * TC1–TC9 per story 13.2 acceptance criteria.
 */
/* eslint-disable @typescript-eslint/unbound-method -- vi.mocked() + expect().toHaveBeenCalled* patterns require method references */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReturnsModule } from '../../../src/modules/returns';
import type { ReportsModule } from '../../../src/modules/reports';
import type { OrdersFbsModule } from '../../../src/modules/orders-fbs';
import type { FinancesModule } from '../../../src/modules/finances';
import type { BaseClient } from '../../../src/client/base-client';
import type { GoodsReturnV1Response, GoodsReturnV1Item } from '../../../src/types/reports.types';
import type { SalesReportDetailedItem } from '../../../src/types/finances.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeGoodsReturnResponse(items: Partial<GoodsReturnV1Item>[]): GoodsReturnV1Response {
  return {
    count: items.length,
    report: items.map((item) => ({
      sku: '2000000000000',
      brand: 'Synthetic Brand',
      dstOfficeAddress: 'Synthetic return office',
      dstOfficeId: 1,
      expiredDt: null,
      kiz: null,
      nmId: 100,
      orderId: 1,
      orderDt: '2026-04-15',
      completedDt: '2026-04-20',
      readyToReturnDt: null,
      returnReason: '',
      returnType: 'Synthetic return',
      shkId: 1,
      srid: item.srid ?? `synthetic-${String(item.orderId ?? 1)}`,
      returnStatus: 'Ready for pickup',
      stickerId: 'synthetic-sticker',
      subjectName: 'Synthetic subject',
      techSize: '0',
      ...item,
    })),
  };
}

function makeFinanceLines(
  overrides: Partial<SalesReportDetailedItem>[]
): SalesReportDetailedItem[] {
  return overrides.map((o) => ({
    nmId: 100,
    orderId: 1,
    forPay: '500.00',
    srid: undefined,
    ...o,
  }));
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

describe('ReturnsModule.getReturns', () => {
  let mockClient: BaseClient;
  let mockReports: ReportsModule;
  let mockOrdersFBS: OrdersFbsModule;
  let mockFinances: FinancesModule;
  let returns: ReturnsModule;

  beforeEach(() => {
    mockReports = { getAnalyticsV1GoodsReturn: vi.fn() } as unknown as ReportsModule;
    mockOrdersFBS = { orders: vi.fn() } as unknown as OrdersFbsModule;
    mockFinances = { getSalesReportsDetailed: vi.fn() } as unknown as FinancesModule;
    mockClient = {} as BaseClient;
    returns = new ReturnsModule(mockClient, mockReports, mockOrdersFBS, mockFinances);
  });

  // -------------------------------------------------------------------------
  // TC1 — Happy path: FBO + Finance → unified ReturnItem[] with enrichment
  // -------------------------------------------------------------------------
  it('TC1: happy path — 2 FBO items + 1 srid finance match → enriched data', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 101, orderId: 10, srid: 'srid-A', completedDt: '2026-04-20' },
        { nmId: 102, orderId: 11, srid: 'srid-B', completedDt: '2026-04-18' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue(
      makeFinanceLines([{ nmId: 101, orderId: 10, srid: 'srid-A', forPay: '750.50' }])
    );

    const result = await returns.getReturns({ dateFrom: '2026-04-01', dateTo: '2026-04-30' });

    expect(result.data).toHaveLength(2);
    expect(result.partialFailures).toHaveLength(0);
    expect(result.total).toBe(2);

    // srid-A should have returnAmount enriched
    const itemA = result.data.find((r) => r.srid === 'srid-A');
    expect(itemA).toBeDefined();
    expect(itemA?.returnAmount).toBe(750.5);
    expect(itemA?.orderType).toBe('fbo');

    // srid-B has no finance match — returnAmount undefined
    const itemB = result.data.find((r) => r.srid === 'srid-B');
    expect(itemB?.returnAmount).toBeUndefined();

    // Sorted descending by returnDate
    expect(result.data[0].returnDate >= result.data[1].returnDate).toBe(true);
  });

  it('paginates active then archive returns and maps v1 fields with status context', async () => {
    const activePage = Array.from({ length: 1000 }, (_, index) => ({
      ...makeGoodsReturnResponse([
        {
          nmId: 10_000 + index,
          orderId: 20_000 + index,
          srid: `active-${String(index)}`,
          completedDt: null,
          readyToReturnDt: '2026-04-20T10:00:00Z',
          returnReason: index === 0 ? 'Synthetic active reason' : '',
        },
      ]).report[0],
    }));
    const archivePage = Array.from({ length: 1000 }, (_, index) => ({
      ...makeGoodsReturnResponse([
        {
          nmId: 30_000 + index,
          orderId: 40_000 + index,
          srid: `archive-${String(index)}`,
          completedDt: '2026-04-22T10:00:00Z',
        },
      ]).report[0],
    }));

    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockImplementation((params) => {
      if (params.status === 'active' && params.offset === 0) {
        return Promise.resolve({ count: 1001, report: activePage });
      }
      if (params.status === 'active') {
        return Promise.resolve(
          makeGoodsReturnResponse([
            {
              nmId: 11_001,
              orderId: 21_001,
              srid: 'active-final',
              completedDt: null,
              readyToReturnDt: '2026-04-21T10:00:00Z',
            },
          ])
        );
      }
      if (params.offset === 0) {
        return Promise.resolve({ count: 1001, report: archivePage });
      }
      return Promise.resolve(
        makeGoodsReturnResponse([
          {
            nmId: 12_000,
            orderId: 22_000,
            srid: 'archive-final',
            completedDt: '2026-04-22T10:00:00Z',
            returnReason: 'Synthetic archive reason',
          },
        ])
      );
    });
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      orderType: 'fbo',
    });

    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenNthCalledWith(1, {
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      status: 'active',
      limit: 1000,
      offset: 0,
    });
    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenNthCalledWith(2, {
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      status: 'active',
      limit: 1000,
      offset: 1000,
    });
    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenNthCalledWith(3, {
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      status: 'archive',
      limit: 1000,
      offset: 0,
    });
    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenNthCalledWith(4, {
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      status: 'archive',
      limit: 1000,
      offset: 1000,
    });
    expect(result.total).toBe(2002);
    expect(result.data.find((item) => item.srid === 'active-0')).toMatchObject({
      returnStatus: 'initiated',
      returnReason: 'Synthetic active reason',
    });
    expect(result.data.find((item) => item.srid === 'archive-final')).toMatchObject({
      returnStatus: 'processed',
      returnReason: 'Synthetic archive reason',
    });
  });

  it('reports a later-page FBO failure through existing partial-failure telemetry', async () => {
    const firstPage = Array.from({ length: 1000 }, (_, index) => ({
      ...makeGoodsReturnResponse([
        {
          nmId: 50_000 + index,
          orderId: 60_000 + index,
          srid: `before-failure-${String(index)}`,
        },
      ]).report[0],
    }));
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockImplementation((params) => {
      if (params.status === 'active' && params.offset === 0) {
        return Promise.resolve({ count: 1001, report: firstPage });
      }
      return Promise.reject(new Error('429 on subsequent FBO page'));
    });
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      orderType: 'fbo',
    });

    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenCalledTimes(2);
    expect(result.data).toEqual([]);
    expect(result.partialFailures).toEqual([
      { source: 'fbo', error: '429 on subsequent FBO page' },
    ]);
    expect(result._meta.sources.fbo).toMatchObject({
      fetched: 0,
      skipped: false,
      failed: true,
      reason: 'fetch failed',
    });
  });

  it('treats HTTP 204-equivalent empty responses as no FBO rows', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      undefined as unknown as GoodsReturnV1Response
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      orderType: 'fbo',
    });

    expect(result.data).toEqual([]);
    expect(result._meta.sources.fbo).toMatchObject({ fetched: 0, skipped: false, failed: false });
    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenCalledTimes(2);
  });

  it('requests an empty terminal page after an exact full page before processing archive', async () => {
    const fullActivePage = Array.from(
      { length: 1000 },
      (_, index) =>
        makeGoodsReturnResponse([
          {
            nmId: 70_000 + index,
            orderId: 80_000 + index,
            srid: `full-active-${String(index)}`,
          },
        ]).report[0]
    );
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockImplementation((params) => {
      if (params.status === 'active' && params.offset === 0) {
        return Promise.resolve({ count: 1000, report: fullActivePage });
      }
      return Promise.resolve({ count: 0, report: [] });
    });
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      orderType: 'fbo',
    });

    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ status: 'active', offset: 1000 })
    );
    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ status: 'archive', offset: 0 })
    );
    expect(result.total).toBe(1000);
  });

  it('maps sku and reason while archive wins an active/archive srid transition', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockImplementation((params) => {
      if (params.status === 'active') {
        return Promise.resolve(
          makeGoodsReturnResponse([
            {
              orderId: 91,
              nmId: 901,
              sku: 'active-sku',
              srid: 'transition-srid',
              completedDt: '2026-04-20T10:00:00Z',
              returnReason: 'Причина активного возврата',
            },
            {
              orderId: 92,
              nmId: 902,
              sku: 'active-only-sku',
              srid: 'active-only-srid',
              completedDt: '2026-04-22T10:00:00Z',
              returnReason: 'Активный возврат',
            },
          ])
        );
      }
      return Promise.resolve(
        makeGoodsReturnResponse([
          {
            orderId: 91,
            nmId: 901,
            sku: 'archive-sku',
            srid: 'transition-srid',
            completedDt: null,
            readyToReturnDt: '2026-04-21T10:00:00Z',
            returnReason: 'Брак товара',
          },
        ])
      );
    });
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      orderType: 'fbo',
    });

    expect(result.data.find((item) => item.srid === 'transition-srid')).toMatchObject({
      sku: 'archive-sku',
      returnStatus: 'received',
      returnReason: 'Брак товара',
      returnReasonCode: 'defect',
    });
    expect(result.data.find((item) => item.srid === 'active-only-srid')).toMatchObject({
      sku: 'active-only-sku',
      returnStatus: 'initiated',
      returnDate: '2026-04-22T10:00:00Z',
    });
  });

  // -------------------------------------------------------------------------
  // TC2 — FBO source fails (e.g. 429) → partialFailures populated, finance still in _meta
  // -------------------------------------------------------------------------
  it('TC2: FBO 429 → partialFailures contains fbo entry, response still valid', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockRejectedValue(
      new Error('429 Rate limit exceeded')
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue(
      makeFinanceLines([{ nmId: 100, orderId: 1, forPay: '300.00' }])
    );

    const result = await returns.getReturns({ dateFrom: '2026-04-01', dateTo: '2026-04-30' });

    expect(result.partialFailures).toHaveLength(1);
    expect(result.partialFailures[0].source).toBe('fbo');
    expect(result.partialFailures[0].error).toContain('429');
    // Data is empty (FBO failed, FBS skipped, finance only enriches existing rows)
    expect(result.data).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  // -------------------------------------------------------------------------
  // TC3 — FBS opt-out default: ordersFBS.orders never called, warning present
  // -------------------------------------------------------------------------
  it('TC3: FBS always skipped by default — orders() not called, warning in response', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue({ count: 0, report: [] });
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({ dateFrom: '2026-04-01', dateTo: '2026-04-30' });

    expect(mockOrdersFBS.orders).not.toHaveBeenCalled();
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain('FBS');
    expect(result._meta.sources.fbs.skipped).toBe(true);
  });

  // -------------------------------------------------------------------------
  // TC4 — nmIds filter: only matching nmId records in result
  // -------------------------------------------------------------------------
  it('TC4: nmIds filter — only matching records returned', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 200, orderId: 20, completedDt: '2026-04-10' },
        { nmId: 201, orderId: 21, completedDt: '2026-04-11' },
        { nmId: 202, orderId: 22, completedDt: '2026-04-12' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      nmIds: [200, 202],
    });

    expect(result.data).toHaveLength(2);
    expect(result.data.every((r) => [200, 202].includes(r.nmId))).toBe(true);
    expect(result.data.find((r) => r.nmId === 201)).toBeUndefined();
  });

  // -------------------------------------------------------------------------
  // TC5 — Empty inputs: all sources return empty → { data: [], total: 0 }
  // -------------------------------------------------------------------------
  it('TC5: all sources return empty → data: [], total: 0, no failures', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue({ count: 0, report: [] });
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({ dateFrom: '2026-04-01', dateTo: '2026-04-30' });

    expect(result.data).toHaveLength(0);
    expect(result.total).toBe(0);
    expect(result.partialFailures).toHaveLength(0);
  });

  // -------------------------------------------------------------------------
  // TC6 — Date range > 31 days → throws with clear message
  // -------------------------------------------------------------------------
  it('TC6: date range > 31 days → throws Error with clear message', async () => {
    await expect(
      returns.getReturns({ dateFrom: '2026-01-01', dateTo: '2026-03-15' })
    ).rejects.toThrow(/31-day limit/);
  });

  it('TC6a: accepts an exact 31-day date window and rejects 32 days', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue({ count: 0, report: [] });
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    await expect(
      returns.getReturns({ dateFrom: '2026-01-01', dateTo: '2026-02-01', orderType: 'fbo' })
    ).resolves.toMatchObject({ total: 0, partialFailures: [] });
    await expect(
      returns.getReturns({ dateFrom: '2026-01-01', dateTo: '2026-02-02', orderType: 'fbo' })
    ).rejects.toThrow(/31-day limit \(got 32 days\)/);
  });

  it('TC6b: dateFrom > dateTo → throws Error', async () => {
    await expect(
      returns.getReturns({ dateFrom: '2026-04-30', dateTo: '2026-04-01' })
    ).rejects.toThrow(/dateTo .* must be after dateFrom/);
  });

  it('TC6c: rejects the same date before any source call', async () => {
    await expect(
      returns.getReturns({ dateFrom: '2026-04-01', dateTo: '2026-04-01' })
    ).rejects.toThrow(/dateTo .* must be after dateFrom/);
    expect(mockReports.getAnalyticsV1GoodsReturn).not.toHaveBeenCalled();
    expect(mockFinances.getSalesReportsDetailed).not.toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // TC7 — Stale finance (no srid match) → returnAmount: undefined
  // -------------------------------------------------------------------------
  it('TC7: stale finance (no srid/orderId match) → returnAmount undefined', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 300, orderId: 30, srid: 'srid-X', completedDt: '2026-04-25' },
      ])
    );
    // Finance lines with a completely different srid and orderId
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue(
      makeFinanceLines([{ nmId: 999, orderId: 999, srid: 'srid-UNRELATED', forPay: '100.00' }])
    );

    const result = await returns.getReturns({ dateFrom: '2026-04-01', dateTo: '2026-04-30' });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].returnAmount).toBeUndefined();
  });

  // -------------------------------------------------------------------------
  // TC8 — Merge dedup: same srid in FBO only → ONE row (not doubled by finance enrichment)
  // -------------------------------------------------------------------------
  it('TC8: same srid appears once in FBO and once in finance → ONE merged row', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 400, orderId: 40, srid: 'srid-DUP', completedDt: '2026-04-20' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue(
      makeFinanceLines([{ nmId: 400, orderId: 40, srid: 'srid-DUP', forPay: '600.00' }])
    );

    const result = await returns.getReturns({ dateFrom: '2026-04-01', dateTo: '2026-04-30' });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].srid).toBe('srid-DUP');
    expect(result.data[0].returnAmount).toBe(600);
    expect(result.total).toBe(1);
  });

  // -------------------------------------------------------------------------
  // TC9 — orderType:'fbo' → FBS mock not called; FBO calls happen
  // -------------------------------------------------------------------------
  it('TC9: orderType fbo → ordersFBS.orders NOT called, FBO source fetched', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([{ nmId: 500, orderId: 50, completedDt: '2026-04-22' }])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      orderType: 'fbo',
    });

    expect(mockOrdersFBS.orders).not.toHaveBeenCalled();
    expect(mockReports.getAnalyticsV1GoodsReturn).toHaveBeenCalledTimes(2);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].orderType).toBe('fbo');
    // When orderType:'fbo', FBS warning should NOT be present (FBS would be filtered anyway)
    expect(result._meta.sources.fbo.skipped).toBe(false);
    expect(result._meta.sources.fbs.skipped).toBe(true);
  });

  // -------------------------------------------------------------------------
  // TC10 — H2 fix: same srid with multiple finance lines → SUM, not last
  // -------------------------------------------------------------------------
  it('TC10: multiple finance lines for same srid → returnAmount is the SUM', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 700, orderId: 70, srid: 'srid-MULTI', completedDt: '2026-04-15' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue(
      makeFinanceLines([
        { nmId: 700, orderId: 70, srid: 'srid-MULTI', forPay: '500.00' },
        { nmId: 700, orderId: 70, srid: 'srid-MULTI', forPay: '300.00' },
        { nmId: 700, orderId: 70, srid: 'srid-MULTI', forPay: '-100.00' }, // correction
      ])
    );

    const result = await returns.getReturns({ dateFrom: '2026-04-01', dateTo: '2026-04-30' });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].returnAmount).toBe(700); // 500 + 300 - 100
  });
});

describe('ReturnsModule.getReturnByOrderId', () => {
  let mockClient: BaseClient;
  let mockReports: ReportsModule;
  let mockOrdersFBS: OrdersFbsModule;
  let mockFinances: FinancesModule;
  let returns: ReturnsModule;

  beforeEach(() => {
    mockReports = { getAnalyticsV1GoodsReturn: vi.fn() } as unknown as ReportsModule;
    mockOrdersFBS = { orders: vi.fn() } as unknown as OrdersFbsModule;
    mockFinances = { getSalesReportsDetailed: vi.fn() } as unknown as FinancesModule;
    mockClient = {} as BaseClient;
    returns = new ReturnsModule(mockClient, mockReports, mockOrdersFBS, mockFinances);
  });

  it('GBO_TC1: orderId match → returns the matching ReturnItem', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 800, orderId: 80, completedDt: '2026-04-15' },
        { nmId: 801, orderId: 81, completedDt: '2026-04-16' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturnByOrderId('80', {
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
    });

    expect(result).not.toBeNull();
    expect(result?.orderId).toBe('80');
    expect(result?.nmId).toBe(800);
  });

  it('GBO_TC2: no match → returns null', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([{ nmId: 900, orderId: 90, completedDt: '2026-04-15' }])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturnByOrderId('999', {
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
    });

    expect(result).toBeNull();
  });

  it('GBO_TC3: empty orderId → throws Error', async () => {
    await expect(
      returns.getReturnByOrderId('', { dateFrom: '2026-04-01', dateTo: '2026-04-30' })
    ).rejects.toThrow(/non-empty string/);
  });

  it('GBO_TC4: getReturns throws on date range > 31 days → propagates', async () => {
    await expect(
      returns.getReturnByOrderId('80', { dateFrom: '2026-01-01', dateTo: '2026-03-15' })
    ).rejects.toThrow(/31-day limit/);
  });

  it('GBO_TC5: whitespace-only orderId → throws Error', async () => {
    await expect(
      returns.getReturnByOrderId('   ', { dateFrom: '2026-04-01', dateTo: '2026-04-30' })
    ).rejects.toThrow(/non-empty string/);
  });
});

describe('ReturnsModule.getReturnStats', () => {
  let mockClient: BaseClient;
  let mockReports: ReportsModule;
  let mockOrdersFBS: OrdersFbsModule;
  let mockFinances: FinancesModule;
  let returns: ReturnsModule;

  beforeEach(() => {
    mockReports = { getAnalyticsV1GoodsReturn: vi.fn() } as unknown as ReportsModule;
    mockOrdersFBS = { orders: vi.fn() } as unknown as OrdersFbsModule;
    mockFinances = { getSalesReportsDetailed: vi.fn() } as unknown as FinancesModule;
    mockClient = {} as BaseClient;
    returns = new ReturnsModule(mockClient, mockReports, mockOrdersFBS, mockFinances);
  });

  it('STATS_TC1: groupBy nmId → buckets keyed by nmId, sorted desc by count', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 100, orderId: 1, completedDt: '2026-04-15' },
        { nmId: 100, orderId: 2, completedDt: '2026-04-16' },
        { nmId: 100, orderId: 3, completedDt: '2026-04-17' },
        { nmId: 200, orderId: 4, completedDt: '2026-04-18' },
        { nmId: 200, orderId: 5, completedDt: '2026-04-19' },
        { nmId: 300, orderId: 6, completedDt: '2026-04-20' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const stats = await returns.getReturnStats({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      groupBy: 'nmId',
    });

    expect(stats.buckets).toHaveLength(3);
    expect(stats.buckets[0].key).toBe('100');
    expect(stats.buckets[0].count).toBe(3);
    expect(stats.buckets[1].key).toBe('200');
    expect(stats.buckets[1].count).toBe(2);
    expect(stats.buckets[2].key).toBe('300');
    expect(stats.buckets[2].count).toBe(1);
    expect(stats.totalReturns).toBe(6);
  });

  it('STATS_TC2: groupBy category → buckets keyed by returnCategory', async () => {
    // FBO records always have returnCategory: 'unknown' from mapFboToReturnItems
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 100, orderId: 1, completedDt: '2026-04-15' },
        { nmId: 200, orderId: 2, completedDt: '2026-04-16' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const stats = await returns.getReturnStats({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      groupBy: 'category',
    });

    expect(stats.buckets).toHaveLength(1);
    expect(stats.buckets[0].key).toBe('unknown');
    expect(stats.buckets[0].count).toBe(2);
  });

  it('STATS_TC3: groupBy orderType → buckets keyed by fbo/fbs', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 100, orderId: 1, completedDt: '2026-04-15' },
        { nmId: 200, orderId: 2, completedDt: '2026-04-16' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const stats = await returns.getReturnStats({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      groupBy: 'orderType',
    });

    // Only FBO in v3.10.0 (FBS deferred)
    expect(stats.buckets).toHaveLength(1);
    expect(stats.buckets[0].key).toBe('fbo');
    expect(stats.buckets[0].count).toBe(2);
  });

  it('STATS_TC4: totalAmount sums correctly, undefined skipped, pendingFinanceCount tracked', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 100, orderId: 1, srid: 'srid-1', completedDt: '2026-04-15' },
        { nmId: 100, orderId: 2, srid: 'srid-2', completedDt: '2026-04-16' },
        { nmId: 100, orderId: 3, srid: 'srid-3', completedDt: '2026-04-17' },
      ])
    );
    // Only srid-1 and srid-2 have finance lines; srid-3 has no finance match
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue(
      makeFinanceLines([
        { nmId: 100, orderId: 1, srid: 'srid-1', forPay: '500.00' },
        { nmId: 100, orderId: 2, srid: 'srid-2', forPay: '300.00' },
      ])
    );

    const stats = await returns.getReturnStats({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      groupBy: 'nmId',
    });

    expect(stats.buckets).toHaveLength(1);
    expect(stats.buckets[0].count).toBe(3);
    expect(stats.buckets[0].totalAmount).toBe(800); // 500 + 300
    expect(stats.buckets[0].pendingFinanceCount).toBe(1); // srid-3 unmatched
    expect(stats.totalAmount).toBe(800);
  });

  it('STATS_TC5: empty data → buckets:[], totalReturns:0, totalAmount:0', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue({ count: 0, report: [] });
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const stats = await returns.getReturnStats({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      groupBy: 'nmId',
    });

    expect(stats.buckets).toHaveLength(0);
    expect(stats.totalReturns).toBe(0);
    expect(stats.totalAmount).toBe(0);
  });

  it('STATS_TC7: groupBy category with all FBO data → single unknown bucket (FBS deferred)', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 100, orderId: 1, completedDt: '2026-04-15' },
        { nmId: 200, orderId: 2, completedDt: '2026-04-16' },
        { nmId: 300, orderId: 3, completedDt: '2026-04-17' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const stats = await returns.getReturnStats({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      groupBy: 'category',
    });

    // All FBO records have returnCategory: 'unknown' until FBS implementation
    // ships in v3.10.1 with classifyFbsReturnCategory wired into the aggregator
    expect(stats.buckets).toHaveLength(1);
    expect(stats.buckets[0].key).toBe('unknown');
    expect(stats.buckets[0].count).toBe(3);
  });

  it('STATS_TC6: nmIds and orderType filters passed through', async () => {
    vi.mocked(mockReports.getAnalyticsV1GoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 100, orderId: 1, completedDt: '2026-04-15' },
        { nmId: 200, orderId: 2, completedDt: '2026-04-16' },
        { nmId: 300, orderId: 3, completedDt: '2026-04-17' },
      ])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const stats = await returns.getReturnStats({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      groupBy: 'nmId',
      nmIds: [100, 300],
      orderType: 'fbo',
    });

    expect(stats.totalReturns).toBe(2);
    const keys = stats.buckets.map((b) => b.key);
    expect(keys).toContain('100');
    expect(keys).toContain('300');
    expect(keys).not.toContain('200');
    // FBS skipped via orderType: 'fbo'
    expect(mockOrdersFBS.orders).not.toHaveBeenCalled();
  });
});
