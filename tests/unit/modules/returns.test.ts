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
import type { GoodsReturnResponse, GoodsReturnItem } from '../../../src/types/reports.types';
import type { SalesReportDetailedItem } from '../../../src/types/finances.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeGoodsReturnResponse(items: Partial<GoodsReturnItem>[]): GoodsReturnResponse {
  return {
    report: items.map((item) => ({
      nmId: 100,
      orderId: 1,
      orderDt: '2026-04-15',
      reason: '',
      isStatusActive: 0,
      completedDt: '2026-04-20',
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
    mockReports = { getAnalyticsGoodsReturn: vi.fn() } as unknown as ReportsModule;
    mockOrdersFBS = { orders: vi.fn() } as unknown as OrdersFbsModule;
    mockFinances = { getSalesReportsDetailed: vi.fn() } as unknown as FinancesModule;
    mockClient = {} as BaseClient;
    returns = new ReturnsModule(mockClient, mockReports, mockOrdersFBS, mockFinances);
  });

  // -------------------------------------------------------------------------
  // TC1 — Happy path: FBO + Finance → unified ReturnItem[] with enrichment
  // -------------------------------------------------------------------------
  it('TC1: happy path — 2 FBO items + 1 srid finance match → enriched data', async () => {
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([
        { nmId: 101, orderId: 10, srid: 'srid-A', completedDt: '2026-04-20', isStatusActive: 0 },
        { nmId: 102, orderId: 11, srid: 'srid-B', completedDt: '2026-04-18', isStatusActive: 1 },
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

  // -------------------------------------------------------------------------
  // TC2 — FBO source fails (e.g. 429) → partialFailures populated, finance still in _meta
  // -------------------------------------------------------------------------
  it('TC2: FBO 429 → partialFailures contains fbo entry, response still valid', async () => {
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockRejectedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue({ report: [] });
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue({ report: [] });
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

  it('TC6b: dateFrom > dateTo → throws Error', async () => {
    await expect(
      returns.getReturns({ dateFrom: '2026-04-30', dateTo: '2026-04-01' })
    ).rejects.toThrow(/must be <= dateTo/);
  });

  // -------------------------------------------------------------------------
  // TC7 — Stale finance (no srid match) → returnAmount: undefined
  // -------------------------------------------------------------------------
  it('TC7: stale finance (no srid/orderId match) → returnAmount undefined', async () => {
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
      makeGoodsReturnResponse([{ nmId: 500, orderId: 50, completedDt: '2026-04-22' }])
    );
    vi.mocked(mockFinances.getSalesReportsDetailed).mockResolvedValue([]);

    const result = await returns.getReturns({
      dateFrom: '2026-04-01',
      dateTo: '2026-04-30',
      orderType: 'fbo',
    });

    expect(mockOrdersFBS.orders).not.toHaveBeenCalled();
    expect(mockReports.getAnalyticsGoodsReturn).toHaveBeenCalledOnce();
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    mockReports = { getAnalyticsGoodsReturn: vi.fn() } as unknown as ReportsModule;
    mockOrdersFBS = { orders: vi.fn() } as unknown as OrdersFbsModule;
    mockFinances = { getSalesReportsDetailed: vi.fn() } as unknown as FinancesModule;
    mockClient = {} as BaseClient;
    returns = new ReturnsModule(mockClient, mockReports, mockOrdersFBS, mockFinances);
  });

  it('GBO_TC1: orderId match → returns the matching ReturnItem', async () => {
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    mockReports = { getAnalyticsGoodsReturn: vi.fn() } as unknown as ReportsModule;
    mockOrdersFBS = { orders: vi.fn() } as unknown as OrdersFbsModule;
    mockFinances = { getSalesReportsDetailed: vi.fn() } as unknown as FinancesModule;
    mockClient = {} as BaseClient;
    returns = new ReturnsModule(mockClient, mockReports, mockOrdersFBS, mockFinances);
  });

  it('STATS_TC1: groupBy nmId → buckets keyed by nmId, sorted desc by count', async () => {
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue({ report: [] });
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
    vi.mocked(mockReports.getAnalyticsGoodsReturn).mockResolvedValue(
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
