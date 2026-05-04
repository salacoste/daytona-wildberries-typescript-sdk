import { describe, it, expect } from 'vitest';
import { classifyFbsReturnCategory } from '../../../src/utils/classifyFbsReturnCategory';
import type { FbsStatusEvent } from '../../../src/utils/classifyFbsReturnCategory';

// Helper to build status events with dummy dates in order
function events(...statuses: string[]): FbsStatusEvent[] {
  return statuses.map((status, i) => ({
    status,
    date: `2026-04-${String(i + 1).padStart(2, '0')}T10:00:00Z`,
  }));
}

describe('classifyFbsReturnCategory', () => {
  // ── cancel_before_shipment ──────────────────────────────────────────────

  it('cancel_before_shipment: [new, cancelled] → cancelled before confirmation', () => {
    expect(classifyFbsReturnCategory(events('new', 'cancelled'))).toBe('cancel_before_shipment');
  });

  it('cancel_before_shipment: [new, canceled] alt spelling → cancel_before_shipment', () => {
    expect(classifyFbsReturnCategory(events('new', 'canceled'))).toBe('cancel_before_shipment');
  });

  it('cancel_before_shipment: [new] with only cancel status → cancel_before_shipment', () => {
    expect(classifyFbsReturnCategory(events('cancelled'))).toBe('cancel_before_shipment');
  });

  // ── refusal_at_pvz ─────────────────────────────────────────────────────

  it('refusal_at_pvz: [confirmed, assembled, delivered, defected] → refused at pickup point', () => {
    expect(
      classifyFbsReturnCategory(events('confirmed', 'assembled', 'delivered', 'defected'))
    ).toBe('refusal_at_pvz');
  });

  it('refusal_at_pvz: [confirmed, delivered, canceled_by_client] → buyer refused at pvz', () => {
    expect(classifyFbsReturnCategory(events('confirmed', 'delivered', 'canceled_by_client'))).toBe(
      'refusal_at_pvz'
    );
  });

  // ── return_after_receipt ────────────────────────────────────────────────

  it('return_after_receipt: [new, confirmed, assembled, delivered, returned] → full return cycle', () => {
    expect(
      classifyFbsReturnCategory(events('new', 'confirmed', 'assembled', 'delivered', 'returned'))
    ).toBe('return_after_receipt');
  });

  // ── unknown ────────────────────────────────────────────────────────────

  it('unknown: empty array → unknown', () => {
    expect(classifyFbsReturnCategory([])).toBe('unknown');
  });

  it('unknown: only positive statuses (no return signal) → unknown', () => {
    expect(classifyFbsReturnCategory(events('new', 'confirmed', 'assembled', 'delivered'))).toBe(
      'unknown'
    );
  });

  it('unknown: cancelled AFTER confirmed → ambiguous, hasConfirmed blocks rule 1', () => {
    // Rule 1 requires !hasConfirmed. If 'confirmed' appears before 'cancelled',
    // hasConfirmed=true so cancel_before_shipment does NOT fire → unknown.
    expect(classifyFbsReturnCategory(events('new', 'confirmed', 'cancelled'))).toBe('unknown');
  });

  // ── order-independence ─────────────────────────────────────────────────

  it('order-independence: out-of-order events produce same result as sorted', () => {
    const sorted: FbsStatusEvent[] = [
      { status: 'new', date: '2026-04-01T10:00:00Z' },
      { status: 'confirmed', date: '2026-04-02T10:00:00Z' },
      { status: 'assembled', date: '2026-04-03T10:00:00Z' },
      { status: 'delivered', date: '2026-04-05T10:00:00Z' },
      { status: 'returned', date: '2026-04-09T10:00:00Z' },
    ];
    const shuffled: FbsStatusEvent[] = [
      { status: 'returned', date: '2026-04-09T10:00:00Z' },
      { status: 'new', date: '2026-04-01T10:00:00Z' },
      { status: 'delivered', date: '2026-04-05T10:00:00Z' },
      { status: 'assembled', date: '2026-04-03T10:00:00Z' },
      { status: 'confirmed', date: '2026-04-02T10:00:00Z' },
    ];
    expect(classifyFbsReturnCategory(sorted)).toBe(classifyFbsReturnCategory(shuffled));
    expect(classifyFbsReturnCategory(shuffled)).toBe('return_after_receipt');
  });

  // ── case insensitivity ─────────────────────────────────────────────────

  it('case-insensitive: CANCELLED (uppercase) → cancel_before_shipment', () => {
    expect(classifyFbsReturnCategory(events('new', 'CANCELLED'))).toBe('cancel_before_shipment');
  });

  it('case-insensitive: DELIVERED + RETURNED → return_after_receipt', () => {
    expect(classifyFbsReturnCategory(events('NEW', 'CONFIRMED', 'DELIVERED', 'RETURNED'))).toBe(
      'return_after_receipt'
    );
  });

  it('case-insensitive: Mixed Case Defected → refusal_at_pvz', () => {
    expect(classifyFbsReturnCategory(events('confirmed', 'Delivered', 'DEFECTED'))).toBe(
      'refusal_at_pvz'
    );
  });

  it('refusal_at_pvz: cancelled_by_client (double-l spelling) → refusal_at_pvz', () => {
    expect(classifyFbsReturnCategory(events('confirmed', 'delivered', 'cancelled_by_client'))).toBe(
      'refusal_at_pvz'
    );
  });

  // ── Rule 2 robustness ──────────────────────────────────────────────────

  it('refusal_at_pvz: with intermediate received status before defected → refusal_at_pvz', () => {
    expect(
      classifyFbsReturnCategory(
        events('new', 'confirmed', 'assembled', 'delivered', 'received', 'defected')
      )
    ).toBe('refusal_at_pvz');
  });
});
