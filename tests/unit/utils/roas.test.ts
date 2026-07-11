/**
 * Unit tests for computeROAS() — task-136.1.
 *
 * Covers: default excludeLastDays=1; custom exclude; windowDays cap; spend=0 → null;
 * empty days; single day (excluded → empty window → null); FullStatsItem vs DaysV3Item[]
 * input equivalence; excludeLastDays=0; unsorted input (sorts).
 */
import { describe, it, expect } from 'vitest';
import { computeROAS } from '../../../src';
import type { DaysV3Item, FullStatsItem } from '../../../src/types/promotion.types';

/** Build a per-day row with only the ROAS-relevant fields set (rest 0, apps empty). */
function day(date: string, sum: number, sum_price: number, clicks = 0): DaysV3Item {
  return {
    date,
    views: 0,
    clicks,
    ctr: 0,
    cpc: 0,
    sum,
    atbs: 0,
    orders: 0,
    cr: 0,
    shks: 0,
    sum_price,
    canceled: 0,
    apps: [],
  };
}

/** Build a FullStatsItem wrapping the given days (aggregate fields zeroed). */
function fullStats(days: DaysV3Item[]): FullStatsItem {
  return {
    advertId: 1,
    atbs: 0,
    canceled: 0,
    clicks: 0,
    cpc: 0,
    cr: 0,
    ctr: 0,
    days,
    orders: 0,
    shks: 0,
    sum: 0,
    sum_price: 0,
    views: 0,
  };
}

describe('computeROAS', () => {
  // AC#6: default excludeLastDays=1
  it('default: excludes the freshest day, ROAS = revenue/spend over the rest', () => {
    const days = [
      day('2026-07-09', 100, 500),
      day('2026-07-10', 200, 1000),
      day('2026-07-11', 50, 0), // freshest — excluded
    ];
    const r = computeROAS(days);
    expect(r.roas).toBe(5); // 1500 / 300
    expect(r.revenue).toBe(1500);
    expect(r.spend).toBe(300);
    expect(r.daysUsed).toBe(2);
    expect(r.excludedDays).toBe(1);
  });

  // AC#6: custom excludeLastDays
  it('custom excludeLastDays=2 drops the two freshest days', () => {
    const days = [
      day('2026-07-09', 100, 500),
      day('2026-07-10', 200, 1000),
      day('2026-07-11', 50, 0),
    ];
    const r = computeROAS(days, { excludeLastDays: 2 });
    expect(r.roas).toBe(5); // 500 / 100 (only 07-09)
    expect(r.daysUsed).toBe(1);
    expect(r.excludedDays).toBe(2);
  });

  // AC#6: windowDays cap
  it('windowDays caps to the most recent N days after exclusion', () => {
    const days = [
      day('2026-07-07', 100, 500),
      day('2026-07-08', 100, 500),
      day('2026-07-09', 100, 500),
      day('2026-07-10', 100, 500),
      day('2026-07-11', 100, 500), // freshest — excluded
    ];
    const r = computeROAS(days, { excludeLastDays: 1, windowDays: 2 });
    // after excluding 07-11, keep most recent 2 of [07-07..07-10] = 07-09, 07-10
    expect(r.daysUsed).toBe(2);
    expect(r.spend).toBe(200);
    expect(r.revenue).toBe(1000);
    expect(r.roas).toBe(5);
    expect(r.excludedDays).toBe(1);
  });

  // AC#6: spend=0 → roas null
  it('spend=0 (no ad spend) → roas is null, revenue still summed', () => {
    const days = [
      day('2026-07-10', 0, 500),
      day('2026-07-11', 0, 100), // freshest — excluded
    ];
    const r = computeROAS(days);
    expect(r.roas).toBeNull();
    expect(r.spend).toBe(0);
    expect(r.revenue).toBe(500);
    expect(r.daysUsed).toBe(1);
  });

  // AC#6: empty days
  it('empty days → roas null, zeroed sums, 0 days used', () => {
    const r = computeROAS([]);
    expect(r.roas).toBeNull();
    expect(r.revenue).toBe(0);
    expect(r.spend).toBe(0);
    expect(r.daysUsed).toBe(0);
    expect(r.excludedDays).toBe(0);
  });

  // AC#6: single day (excluded → empty window → null)
  it('single day with default exclude=1 → empty window → roas null', () => {
    const r = computeROAS([day('2026-07-11', 100, 500)]);
    expect(r.roas).toBeNull();
    expect(r.daysUsed).toBe(0);
    expect(r.excludedDays).toBe(1);
  });

  // AC#6: FullStatsItem input vs DaysV3Item[] input
  it('accepts a FullStatsItem (uses .days) and matches the array input', () => {
    const days = [
      day('2026-07-09', 100, 500),
      day('2026-07-10', 200, 1000),
      day('2026-07-11', 50, 0),
    ];
    const fromItem = computeROAS(fullStats(days));
    const fromArray = computeROAS(days);
    expect(fromItem).toEqual(fromArray);
    expect(fromItem.roas).toBe(5);
  });

  // excludeLastDays=0 keeps all days
  it('excludeLastDays=0 keeps every day', () => {
    const days = [
      day('2026-07-09', 100, 500),
      day('2026-07-10', 200, 1000),
      day('2026-07-11', 50, 0),
    ];
    const r = computeROAS(days, { excludeLastDays: 0 });
    expect(r.daysUsed).toBe(3);
    expect(r.excludedDays).toBe(0);
    expect(r.spend).toBe(350);
    expect(r.revenue).toBe(1500);
    expect(r.roas).toBeCloseTo(1500 / 350, 5);
  });

  // unsorted input sorts chronologically before excluding the freshest
  it('sorts unsorted input chronologically (freshest excluded correctly)', () => {
    const days = [
      day('2026-07-11', 50, 0), // freshest, given first
      day('2026-07-09', 100, 500),
      day('2026-07-10', 200, 1000),
    ];
    const r = computeROAS(days);
    expect(r.excludedDays).toBe(1);
    expect(r.daysUsed).toBe(2);
    expect(r.spend).toBe(300); // 07-09 + 07-10
    expect(r.roas).toBe(5);
  });

  // excludeLastDays larger than the day count → all excluded, empty window
  it('excludeLastDays > day count → empty window, roas null, excludedDays capped', () => {
    const days = [day('2026-07-10', 100, 500), day('2026-07-11', 200, 1000)];
    const r = computeROAS(days, { excludeLastDays: 5 });
    expect(r.excludedDays).toBe(2); // capped to available
    expect(r.daysUsed).toBe(0);
    expect(r.roas).toBeNull();
  });
});
