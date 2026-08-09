import { describe, it, expect } from 'vitest';
import { reconcileAcceptanceDelta } from '../../../src/utils/reconcileAcceptanceDelta';
import type { AcceptanceReportDownloadItem } from '../../../src/types/reports.types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeAccepted(
  overrides: Partial<AcceptanceReportDownloadItem>
): AcceptanceReportDownloadItem {
  return {
    nmID: 1000,
    count: 1,
    incomeId: 500,
    ...overrides,
  };
}

describe('reconcileAcceptanceDelta', () => {
  // -------------------------------------------------------------------------
  // Empty input
  // -------------------------------------------------------------------------
  it('returns an empty result for empty declared and accepted', () => {
    const result = reconcileAcceptanceDelta({ declared: {}, accepted: [] });

    expect(result).toEqual({
      items: [],
      totalDeclared: 0,
      totalAccepted: 0,
      totalDelta: 0,
      discrepancyCount: 0,
    });
  });

  // -------------------------------------------------------------------------
  // Declared-only (accepted = [])
  // -------------------------------------------------------------------------
  it('treats every declared nmId as a full shortage when accepted is empty', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 100: 5, 200: 3 },
      accepted: [],
    });

    expect(result.items).toEqual([
      { nmId: 100, declared: 5, accepted: 0, delta: 5, hasDiscrepancy: true },
      { nmId: 200, declared: 3, accepted: 0, delta: 3, hasDiscrepancy: true },
    ]);
    expect(result.totalDeclared).toBe(8);
    expect(result.totalAccepted).toBe(0);
    expect(result.totalDelta).toBe(8);
    expect(result.discrepancyCount).toBe(2);
  });

  // -------------------------------------------------------------------------
  // Accepted-only (declared = {})
  // -------------------------------------------------------------------------
  it('treats every accepted nmId as over-acceptance when declared is empty', () => {
    const result = reconcileAcceptanceDelta({
      declared: {},
      accepted: [makeAccepted({ nmID: 100, count: 4 })],
    });

    expect(result.items).toEqual([
      { nmId: 100, declared: 0, accepted: 4, delta: -4, hasDiscrepancy: true },
    ]);
    expect(result.totalDeclared).toBe(0);
    expect(result.totalAccepted).toBe(4);
    expect(result.totalDelta).toBe(-4);
    expect(result.discrepancyCount).toBe(1);
  });

  // -------------------------------------------------------------------------
  // Exact match (no discrepancy)
  // -------------------------------------------------------------------------
  it('reports no discrepancy when declared equals accepted', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 100: 5, 200: 3 },
      accepted: [makeAccepted({ nmID: 100, count: 5 }), makeAccepted({ nmID: 200, count: 3 })],
    });

    expect(result.items).toEqual([
      { nmId: 100, declared: 5, accepted: 5, delta: 0, hasDiscrepancy: false },
      { nmId: 200, declared: 3, accepted: 3, delta: 0, hasDiscrepancy: false },
    ]);
    expect(result.totalDelta).toBe(0);
    expect(result.discrepancyCount).toBe(0);
  });

  // -------------------------------------------------------------------------
  // Shortage (declared > accepted, positive delta)
  // -------------------------------------------------------------------------
  it('detects a shortage with a positive delta', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 100: 10 },
      accepted: [makeAccepted({ nmID: 100, count: 7 })],
    });

    expect(result.items[0]).toEqual({
      nmId: 100,
      declared: 10,
      accepted: 7,
      delta: 3,
      hasDiscrepancy: true,
    });
    expect(result.totalDelta).toBe(3);
    expect(result.discrepancyCount).toBe(1);
  });

  // -------------------------------------------------------------------------
  // Over-acceptance (accepted > declared, negative delta)
  // -------------------------------------------------------------------------
  it('detects over-acceptance with a negative delta', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 100: 2 },
      accepted: [makeAccepted({ nmID: 100, count: 5 })],
    });

    expect(result.items[0]).toEqual({
      nmId: 100,
      declared: 2,
      accepted: 5,
      delta: -3,
      hasDiscrepancy: true,
    });
    expect(result.totalDelta).toBe(-3);
    expect(result.discrepancyCount).toBe(1);
  });

  // -------------------------------------------------------------------------
  // Map input equals Record input
  // -------------------------------------------------------------------------
  it('treats a Map input identically to the equivalent Record input', () => {
    const recordResult = reconcileAcceptanceDelta({
      declared: { 100: 4, 200: 6 },
      accepted: [makeAccepted({ nmID: 100, count: 3 }), makeAccepted({ nmID: 200, count: 6 })],
    });

    const mapResult = reconcileAcceptanceDelta({
      declared: new Map<number, number>([
        [100, 4],
        [200, 6],
      ]),
      accepted: [makeAccepted({ nmID: 100, count: 3 }), makeAccepted({ nmID: 200, count: 6 })],
    });

    expect(mapResult).toEqual(recordResult);
  });

  // -------------------------------------------------------------------------
  // Aggregation: multiple accepted rows for the same nmID are summed
  // -------------------------------------------------------------------------
  it('aggregates multiple accepted rows for the same nmID', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 100: 10 },
      accepted: [
        makeAccepted({ nmID: 100, count: 3 }),
        makeAccepted({ nmID: 100, count: 4 }),
        makeAccepted({ nmID: 100, count: 2 }),
      ],
    });

    expect(result.items[0].accepted).toBe(9);
    expect(result.items[0].delta).toBe(1);
  });

  // -------------------------------------------------------------------------
  // Totals + discrepancyCount correct (mixed scenario)
  // -------------------------------------------------------------------------
  it('computes correct totals and discrepancyCount for a mixed scenario', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 100: 10, 200: 5, 300: 4 },
      accepted: [
        makeAccepted({ nmID: 100, count: 10 }), // exact (no discrepancy)
        makeAccepted({ nmID: 200, count: 3 }), // shortage
        makeAccepted({ nmID: 300, count: 6 }), // over-acceptance
      ],
    });

    expect(result.items.map((i) => i.nmId)).toEqual([100, 200, 300]);
    expect(result.totalDeclared).toBe(19);
    expect(result.totalAccepted).toBe(19);
    expect(result.totalDelta).toBe(0);
    expect(result.discrepancyCount).toBe(2);
  });

  // -------------------------------------------------------------------------
  // Missing nmID rows are skipped
  // -------------------------------------------------------------------------
  it('skips accepted rows without an nmID', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 100: 5 },
      accepted: [
        makeAccepted({ nmID: 100, count: 5 }),
        { count: 99, incomeId: 500 }, // no nmID → skipped
        { incomeId: 500 }, // no nmID, no count → skipped
      ],
    });

    expect(result.items).toEqual([
      { nmId: 100, declared: 5, accepted: 5, delta: 0, hasDiscrepancy: false },
    ]);
    expect(result.totalAccepted).toBe(5);
    expect(result.discrepancyCount).toBe(0);
  });

  // -------------------------------------------------------------------------
  // Missing count on an accepted row is treated as 0
  // -------------------------------------------------------------------------
  it('treats a missing count on an accepted row as 0', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 100: 5 },
      accepted: [makeAccepted({ nmID: 100, count: undefined })], // count omitted
    });

    expect(result.items[0].accepted).toBe(0);
    expect(result.items[0].delta).toBe(5);
    expect(result.items[0].hasDiscrepancy).toBe(true);
  });

  // -------------------------------------------------------------------------
  // Items are sorted by nmId ascending
  // -------------------------------------------------------------------------
  it('sorts items by nmId ascending regardless of input order', () => {
    const result = reconcileAcceptanceDelta({
      declared: { 300: 1, 100: 1, 200: 1 },
      accepted: [],
    });

    expect(result.items.map((i) => i.nmId)).toEqual([100, 200, 300]);
  });

  // -------------------------------------------------------------------------
  // Purity: input collections are not mutated
  // -------------------------------------------------------------------------
  it('does not mutate the input Map or accepted array', () => {
    const declaredMap = new Map<number, number>([[100, 5]]);
    const accepted = [makeAccepted({ nmID: 100, count: 3 })];

    reconcileAcceptanceDelta({ declared: declaredMap, accepted });

    expect(declaredMap.get(100)).toBe(5);
    expect(declaredMap.size).toBe(1);
    expect(accepted[0].count).toBe(3);
  });
});
