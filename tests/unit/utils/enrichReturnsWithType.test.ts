import { describe, it, expect } from 'vitest';
import {
  enrichReturnsWithType,
  type WbReturn,
  type FbsReturnInput,
} from '../../../src/utils/enrichReturnsWithType';
import type { GoodsReturnItem } from '../../../src/types/reports.types';

// ─── helpers ────────────────────────────────────────────────────────────────

function makeFboItem(overrides: Partial<GoodsReturnItem> = {}): GoodsReturnItem {
  return {
    nmId: 100,
    orderId: 200,
    completedDt: '2024-03-15T10:00:00',
    reason: '',
    ...overrides,
  };
}

function makeFbsItem(overrides: Partial<FbsReturnInput> = {}): FbsReturnInput {
  return {
    nmId: 300,
    orderId: 400,
    lastChangeDate: '2024-03-10T08:00:00',
    reason: '',
    ...overrides,
  };
}

// ─── tests ───────────────────────────────────────────────────────────────────

describe('enrichReturnsWithType', () => {
  // 1. FBO-only → all marked fbo, sorted desc
  it('marks all FBO items as orderType fbo and sorts by returnDate descending', () => {
    const fboReturns: GoodsReturnItem[] = [
      makeFboItem({ nmId: 1, orderId: 10, completedDt: '2024-01-01T00:00:00' }),
      makeFboItem({ nmId: 2, orderId: 20, completedDt: '2024-03-01T00:00:00' }),
      makeFboItem({ nmId: 3, orderId: 30, completedDt: '2024-02-01T00:00:00' }),
    ];

    const result = enrichReturnsWithType(fboReturns);

    expect(result).toHaveLength(3);
    result.forEach((r) => {
      expect(r.orderType).toBe('fbo');
    });
    // sorted desc: Mar → Feb → Jan
    expect(result[0].nmId).toBe(2);
    expect(result[1].nmId).toBe(3);
    expect(result[2].nmId).toBe(1);
  });

  // 2. FBS-only → all marked fbs
  it('marks all FBS items as orderType fbs', () => {
    const fbsReturns: FbsReturnInput[] = [
      makeFbsItem({ nmId: 10, orderId: 11, lastChangeDate: '2024-05-01T00:00:00' }),
      makeFbsItem({ nmId: 20, orderId: 21, lastChangeDate: '2024-05-02T00:00:00' }),
    ];

    const result = enrichReturnsWithType([], fbsReturns);

    expect(result).toHaveLength(2);
    result.forEach((r) => {
      expect(r.orderType).toBe('fbs');
    });
  });

  // 3. Mixed FBO + FBS → both types present, sorted desc
  it('returns mixed orderTypes sorted by returnDate descending', () => {
    const fboReturns: GoodsReturnItem[] = [
      makeFboItem({ nmId: 1, orderId: 10, completedDt: '2024-01-15T00:00:00' }),
    ];
    const fbsReturns: FbsReturnInput[] = [
      makeFbsItem({ nmId: 2, orderId: 20, lastChangeDate: '2024-01-20T00:00:00' }),
    ];

    const result = enrichReturnsWithType(fboReturns, fbsReturns);

    expect(result).toHaveLength(2);
    const types = result.map((r) => r.orderType);
    expect(types).toContain('fbo');
    expect(types).toContain('fbs');
    // FBS date (Jan 20) > FBO date (Jan 15) → FBS first
    expect(result[0].orderType).toBe('fbs');
    expect(result[1].orderType).toBe('fbo');
  });

  // 4. Both arrays empty → returns []
  it('returns empty array when both inputs are empty', () => {
    expect(enrichReturnsWithType([], [])).toEqual([]);
  });

  // 5. FBO item missing nmId → skipped
  it('skips FBO items that are missing nmId', () => {
    const fboReturns: GoodsReturnItem[] = [
      makeFboItem({ nmId: undefined, orderId: 10, completedDt: '2024-01-01T00:00:00' }),
      makeFboItem({ nmId: 99, orderId: 11, completedDt: '2024-01-02T00:00:00' }),
    ];

    const result = enrichReturnsWithType(fboReturns);

    expect(result).toHaveLength(1);
    expect(result[0].nmId).toBe(99);
  });

  // 6. FBO item with no completedDt but readyToReturnDt → uses readyToReturnDt
  it('falls back to readyToReturnDt when completedDt is absent', () => {
    const fboReturns: GoodsReturnItem[] = [
      makeFboItem({
        nmId: 55,
        orderId: 55,
        completedDt: undefined,
        readyToReturnDt: '2024-06-10T00:00:00',
      }),
    ];

    const result = enrichReturnsWithType(fboReturns);

    expect(result).toHaveLength(1);
    expect(result[0].returnDate).toBe('2024-06-10T00:00:00');
  });

  // 7. reasonCode correctly derived via classifyReturnReason
  it('derives reasonCode "defect" for reason "Брак товара"', () => {
    const fboReturns: GoodsReturnItem[] = [makeFboItem({ reason: 'Брак товара' })];

    const result = enrichReturnsWithType(fboReturns);

    expect(result[0].reasonCode).toBe('defect');
  });

  // 8. quantity defaults to 1 for FBS when undefined
  it('defaults FBS quantity to 1 when not provided', () => {
    const fbsReturns: FbsReturnInput[] = [makeFbsItem({ quantity: undefined })];

    const result = enrichReturnsWithType([], fbsReturns);

    expect(result[0].quantity).toBe(1);
  });

  // bonus: FBS quantity is respected when provided
  it('uses provided FBS quantity when present', () => {
    const fbsReturns: FbsReturnInput[] = [makeFbsItem({ quantity: 3 })];

    const result = enrichReturnsWithType([], fbsReturns);

    expect(result[0].quantity).toBe(3);
  });

  // bonus: FBO items missing orderId are skipped
  it('skips FBO items that are missing orderId', () => {
    const fboReturns: GoodsReturnItem[] = [makeFboItem({ nmId: 1, orderId: undefined })];

    expect(enrichReturnsWithType(fboReturns)).toHaveLength(0);
  });

  // bonus: FBO items missing all date fields are skipped
  it('skips FBO items where all date fields are undefined', () => {
    const fboReturns: GoodsReturnItem[] = [
      makeFboItem({
        nmId: 1,
        orderId: 1,
        completedDt: undefined,
        readyToReturnDt: undefined,
        orderDt: undefined,
      }),
    ];

    expect(enrichReturnsWithType(fboReturns)).toHaveLength(0);
  });

  // bonus: warehouseName mapped from dstOfficeAddress for FBO
  it('maps dstOfficeAddress to warehouseName for FBO items', () => {
    const fboReturns: GoodsReturnItem[] = [makeFboItem({ dstOfficeAddress: 'Склад Коледино' })];

    const result = enrichReturnsWithType(fboReturns);

    expect(result[0].warehouseName).toBe('Склад Коледино');
  });

  // bonus: FBS item missing lastChangeDate is skipped
  it('skips FBS items missing lastChangeDate', () => {
    const fbsReturns: FbsReturnInput[] = [makeFbsItem({ lastChangeDate: undefined })];

    expect(enrichReturnsWithType([], fbsReturns)).toHaveLength(0);
  });

  // bonus: FBO quantity is always 1
  it('always sets quantity to 1 for FBO items', () => {
    const result = enrichReturnsWithType([makeFboItem()]);
    expect(result[0].quantity).toBe(1);
  });

  // bonus: WbReturn shape has all required fields
  it('produces WbReturn records with all required fields populated', () => {
    const result = enrichReturnsWithType([
      makeFboItem({ nmId: 42, orderId: 99, completedDt: '2024-07-01T00:00:00', reason: 'Брак' }),
    ]);

    const r: WbReturn = result[0];
    expect(r.nmId).toBe(42);
    expect(r.orderId).toBe(99);
    expect(r.returnDate).toBe('2024-07-01T00:00:00');
    expect(r.reason).toBe('Брак');
    expect(r.reasonCode).toBeDefined();
    expect(r.orderType).toBe('fbo');
    expect(r.quantity).toBe(1);
  });
});
