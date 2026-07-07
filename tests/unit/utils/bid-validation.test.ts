import { describe, it, expect } from 'vitest';
import { extractBidRange, validateBid, clampBid } from '../../../src/utils/bid-validation';
import { BidOutOfRangeError, ValidationError } from '../../../src/errors';
import type { BidsRecommendationsResponse } from '../../../src/types/promotion.types';

/** Build a recommendations response with the given per-cluster reachMin/reachMax (kopecks). */
function reco(
  clusters: { min: number; max: number; medium?: number }[],
  nmId = 2
): BidsRecommendationsResponse {
  return {
    advertId: 1,
    nmId,
    normQueries: clusters.map((c, i) => ({
      normQuery: `q${i}`,
      reachMin: { bidKopecks: c.min },
      reachMedium: { bidKopecks: c.medium ?? c.min },
      reachMax: { bidKopecks: c.max },
    })),
  };
}

const noReco: BidsRecommendationsResponse = { advertId: 1, nmId: 2, normQueries: [] };

describe('extractBidRange', () => {
  it('returns min(reachMin) / max(reachMax) across clusters', () => {
    expect(
      extractBidRange(
        reco([
          { min: 150, max: 500 },
          { min: 100, max: 800 },
        ])
      )
    ).toEqual({
      min: 100,
      max: 800,
    });
  });

  it('handles a single cluster', () => {
    expect(extractBidRange(reco([{ min: 200, max: 600 }]))).toEqual({ min: 200, max: 600 });
  });

  it('returns null when there are no normQueries (missing data)', () => {
    expect(extractBidRange(noReco)).toBeNull();
  });
});

describe('clampBid', () => {
  // range across clusters = [100, 800]
  const r = reco([
    { min: 150, max: 500 },
    { min: 100, max: 800 },
  ]);

  it('clamps a below-floor bid up to the minimum', () => {
    expect(clampBid(r, 5)).toBe(100);
  });

  it('clamps an above-ceiling bid down to the maximum', () => {
    expect(clampBid(r, 9999)).toBe(800);
  });

  it('leaves an in-range bid unchanged (no-op)', () => {
    expect(clampBid(r, 250)).toBe(250);
  });

  it('returns the bid unchanged when range is null (missing data)', () => {
    expect(clampBid(noReco, 250)).toBe(250);
  });
});

describe('validateBid', () => {
  // range across clusters = [100, 800]
  const r = reco([
    { min: 150, max: 500 },
    { min: 100, max: 800 },
  ]);

  it('throws BidOutOfRangeError below min, with parsed received/min/max', () => {
    try {
      validateBid(r, 5);
      expect.fail('validateBid should have thrown for an out-of-range bid');
    } catch (e) {
      expect(e).toBeInstanceOf(BidOutOfRangeError);
      const err = e as BidOutOfRangeError;
      expect(err.received).toBe(5);
      expect(err.min).toBe(100);
      expect(err.max).toBe(800);
    }
  });

  it('throws BidOutOfRangeError above max', () => {
    expect(() => {
      validateBid(r, 9999);
    }).toThrow(BidOutOfRangeError);
  });

  it('does not throw within range (including boundaries)', () => {
    expect(() => {
      validateBid(r, 250);
    }).not.toThrow();
    expect(() => {
      validateBid(r, 100);
    }).not.toThrow(); // == min
    expect(() => {
      validateBid(r, 800);
    }).not.toThrow(); // == max
  });

  it('is a no-op when range is null (missing data, never throws)', () => {
    expect(() => {
      validateBid(noReco, 250);
    }).not.toThrow();
  });

  it('thrown error is also catchable as ValidationError (backward-compat)', () => {
    try {
      validateBid(r, 5);
      expect.fail('validateBid should have thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(BidOutOfRangeError);
      expect(e).toBeInstanceOf(ValidationError);
    }
  });
});
