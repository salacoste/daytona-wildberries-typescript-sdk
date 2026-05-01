import { describe, it, expect } from 'vitest';
import {
  reconcileBuyoutsAndReturns,
  type BuyoutInput,
  type ReconciliationResult,
} from '../../../src/utils/reconcileBuyoutsAndReturns';
import type { WbReturn } from '../../../src/utils/enrichReturnsWithType';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeReturn(overrides: Partial<WbReturn>): WbReturn {
  return {
    nmId: 1000,
    orderId: 1,
    returnDate: '2024-03-01',
    reason: '',
    reasonCode: 'other',
    orderType: 'fbo',
    quantity: 1,
    ...overrides,
  };
}

function makeBuyout(overrides: Partial<BuyoutInput>): BuyoutInput {
  return {
    nmId: 1000,
    buyoutCount: 5,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('reconcileBuyoutsAndReturns', () => {
  // 1. Happy path — matching buyouts and returns, no anomalies
  it('happy path: matching buyouts and returns produce correct counts and no anomalies', () => {
    const buyouts: BuyoutInput[] = [
      makeBuyout({ nmId: 1000, buyoutCount: 5, buyoutRevenue: 25000 }),
    ];
    const returns: WbReturn[] = [
      makeReturn({ nmId: 1000, quantity: 1 }),
      makeReturn({ nmId: 1000, quantity: 1 }),
    ];

    const result = reconcileBuyoutsAndReturns(buyouts, returns);

    expect(result).toHaveLength(1);
    const entry = result[0];
    expect(entry.nmId).toBe(1000);
    expect(entry.buyoutCount).toBe(5);
    expect(entry.returnCount).toBe(2);
    expect(entry.netRevenue).toBe(25000);
    expect(entry.anomalies).toHaveLength(0);
  });

  // 2. return_without_buyout: more returns than buyouts
  it('fires return_without_buyout anomaly when returns exceed buyouts', () => {
    const buyouts: BuyoutInput[] = [makeBuyout({ nmId: 2000, buyoutCount: 3 })];
    const returns: WbReturn[] = [
      makeReturn({ nmId: 2000, quantity: 2 }),
      makeReturn({ nmId: 2000, quantity: 2 }),
    ]; // 4 total > 3 buyouts

    const result = reconcileBuyoutsAndReturns(buyouts, returns);

    expect(result[0].returnCount).toBe(4);
    expect(result[0].anomalies).toHaveLength(1);
    expect(result[0].anomalies[0].type).toBe('return_without_buyout');
    expect(result[0].anomalies[0].nmId).toBe(2000);
  });

  // 3. Return without any buyout record at all
  it('fires return_without_buyout anomaly for nmId that has returns but no buyout record', () => {
    const buyouts: BuyoutInput[] = [];
    const returns: WbReturn[] = [makeReturn({ nmId: 3000, quantity: 1 })];

    const result = reconcileBuyoutsAndReturns(buyouts, returns);

    expect(result).toHaveLength(1);
    expect(result[0].nmId).toBe(3000);
    expect(result[0].buyoutCount).toBe(0);
    expect(result[0].returnCount).toBe(1);
    expect(result[0].anomalies[0].type).toBe('return_without_buyout');
    expect(result[0].anomalies[0].details).toContain('0 buyouts');
  });

  // 4. orphan_buyout when strictTemporalAlignment = true
  it('fires orphan_buyout anomaly for nmId with buyouts but no returns when strictTemporalAlignment=true', () => {
    const buyouts: BuyoutInput[] = [makeBuyout({ nmId: 4000, buyoutCount: 7 })];
    const returns: WbReturn[] = []; // no returns at all

    const result = reconcileBuyoutsAndReturns(buyouts, returns, { strictTemporalAlignment: true });

    expect(result[0].nmId).toBe(4000);
    expect(result[0].returnCount).toBe(0);
    expect(result[0].anomalies).toHaveLength(1);
    expect(result[0].anomalies[0].type).toBe('orphan_buyout');
    expect(result[0].anomalies[0].details).toContain('7 buyouts');
  });

  // 4b. orphan_buyout NOT fired when strictTemporalAlignment = false (default)
  it('does NOT fire orphan_buyout anomaly when strictTemporalAlignment is not set', () => {
    const buyouts: BuyoutInput[] = [makeBuyout({ nmId: 4001, buyoutCount: 7 })];
    const returns: WbReturn[] = [];

    const result = reconcileBuyoutsAndReturns(buyouts, returns);

    expect(result[0].anomalies).toHaveLength(0);
  });

  // 5. FBO + FBS split correctly counted
  it('correctly splits fboReturnCount and fbsReturnCount', () => {
    const buyouts: BuyoutInput[] = [makeBuyout({ nmId: 5000, buyoutCount: 20 })];
    const returns: WbReturn[] = [
      makeReturn({ nmId: 5000, orderType: 'fbo', quantity: 3 }),
      makeReturn({ nmId: 5000, orderType: 'fbs', quantity: 2 }),
      makeReturn({ nmId: 5000, orderType: 'fbo', quantity: 1 }),
    ];

    const result = reconcileBuyoutsAndReturns(buyouts, returns);

    expect(result[0].returnCount).toBe(6);
    expect(result[0].fboReturnCount).toBe(4);
    expect(result[0].fbsReturnCount).toBe(2);
    expect(result[0].anomalies).toHaveLength(0);
  });

  // 6. Empty inputs → returns []
  it('returns empty array when both inputs are empty', () => {
    const result = reconcileBuyoutsAndReturns([], []);
    expect(result).toEqual([]);
  });

  // 7. Multiple nmIds sorted ascending
  it('sorts results by nmId ascending', () => {
    const buyouts: BuyoutInput[] = [
      makeBuyout({ nmId: 9000, buyoutCount: 1 }),
      makeBuyout({ nmId: 1001, buyoutCount: 1 }),
      makeBuyout({ nmId: 5555, buyoutCount: 1 }),
    ];
    const returns: WbReturn[] = [];

    const result = reconcileBuyoutsAndReturns(buyouts, returns);

    const ids = result.map((r: ReconciliationResult) => r.nmId);
    expect(ids).toEqual([1001, 5555, 9000]);
  });

  // 8. quantity > 1 in WbReturn correctly summed via returnCount += quantity
  it('sums quantity > 1 correctly into returnCount', () => {
    const buyouts: BuyoutInput[] = [makeBuyout({ nmId: 7000, buyoutCount: 50 })];
    const returns: WbReturn[] = [
      makeReturn({ nmId: 7000, quantity: 5 }),
      makeReturn({ nmId: 7000, quantity: 10 }),
      makeReturn({ nmId: 7000, quantity: 3 }),
    ];

    const result = reconcileBuyoutsAndReturns(buyouts, returns);

    expect(result[0].returnCount).toBe(18); // 5 + 10 + 3
    expect(result[0].anomalies).toHaveLength(0);
  });
});
