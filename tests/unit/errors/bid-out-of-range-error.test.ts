/**
 * Unit tests for BidOutOfRangeError and parseBidOutOfRangeDetail.
 *
 * Covers task-132:
 * - Pure parser: matches WB 'wrong bid value: X; min: Y[; max: Z]' detail strings
 * - Error class: exposes received/min/max/field, extends ValidationError
 * - Backward-compat: instanceof ValidationError and WBAPIError both hold
 */

import { describe, it, expect } from 'vitest';
import {
  BidOutOfRangeError,
  parseBidOutOfRangeDetail,
} from '../../../src/errors/bid-out-of-range-error';
import { ValidationError } from '../../../src/errors/validation-error';
import { WBAPIError } from '../../../src/errors/base-error';

describe('parseBidOutOfRangeDetail', () => {
  it('parses received + min from the canonical WB detail', () => {
    expect(parseBidOutOfRangeDetail('wrong bid value: 3; min: 150')).toEqual({
      received: 3,
      min: 150,
    });
  });

  it('parses an optional max ceiling when present', () => {
    expect(parseBidOutOfRangeDetail('wrong bid value: 3; min: 150; max: 5000')).toEqual({
      received: 3,
      min: 150,
      max: 5000,
    });
  });

  it('is case-insensitive and tolerates extra whitespace', () => {
    expect(parseBidOutOfRangeDetail('Wrong Bid Value:   12  ;  Min:   200')).toEqual({
      received: 12,
      min: 200,
    });
  });

  it('parses negative bid values', () => {
    expect(parseBidOutOfRangeDetail('wrong bid value: -5; min: 0')).toEqual({
      received: -5,
      min: 0,
    });
  });

  it('returns null for non-matching detail strings', () => {
    expect(parseBidOutOfRangeDetail('some other validation error')).toBeNull();
    expect(parseBidOutOfRangeDetail('invalid payload')).toBeNull();
    expect(parseBidOutOfRangeDetail('min: 150')).toBeNull();
  });

  it('returns null for non-string input', () => {
    expect(parseBidOutOfRangeDetail(undefined)).toBeNull();
    expect(parseBidOutOfRangeDetail(null)).toBeNull();
    expect(parseBidOutOfRangeDetail({ detail: 'wrong bid value: 3; min: 150' })).toBeNull();
    expect(parseBidOutOfRangeDetail(123)).toBeNull();
  });
});

describe('BidOutOfRangeError', () => {
  it('exposes received, min, max, and field', () => {
    const error = new BidOutOfRangeError(
      'wrong bid value: 3; min: 150',
      { received: 3, min: 150, field: 'bid' },
      { title: 'invalid payload' },
      'req-123'
    );

    expect(error.received).toBe(3);
    expect(error.min).toBe(150);
    expect(error.max).toBeUndefined();
    expect(error.message).toBe('wrong bid value: 3; min: 150');
    expect(error.statusCode).toBe(400);
    expect(error.requestId).toBe('req-123');
    expect(error.fieldErrors).toEqual({ bid: 'wrong bid value: 3; min: 150' });
  });

  it('includes max when provided', () => {
    const error = new BidOutOfRangeError('wrong bid value: 3; min: 150; max: 5000', {
      received: 3,
      min: 150,
      max: 5000,
    });

    expect(error.max).toBe(5000);
  });

  it('defaults field to "bid" when not provided', () => {
    const error = new BidOutOfRangeError('wrong bid value: 3; min: 150', {
      received: 3,
      min: 150,
    });

    expect(error.fieldErrors).toHaveProperty('bid');
  });

  it('is an instance of ValidationError (backward-compat)', () => {
    const error = new BidOutOfRangeError('wrong bid value: 3; min: 150', {
      received: 3,
      min: 150,
    });

    // AC #3: existing `catch (e instanceof ValidationError)` must still catch it
    expect(error).toBeInstanceOf(ValidationError);
    expect(error).toBeInstanceOf(WBAPIError);
    expect(error).toBeInstanceOf(BidOutOfRangeError);
    expect(error.name).toBe('BidOutOfRangeError');
  });

  it('getUserMessage() includes the accepted range', () => {
    const error = new BidOutOfRangeError('wrong bid value: 3; min: 150', {
      received: 3,
      min: 150,
      max: 5000,
    });

    const message = error.getUserMessage();
    expect(message).toContain('Your bid: 3');
    expect(message).toContain('Minimum accepted: 150');
    expect(message).toContain('Maximum accepted: 5000');
  });

  it('toJSON() preserves received/min/max', () => {
    const error = new BidOutOfRangeError('wrong bid value: 3; min: 150', {
      received: 3,
      min: 150,
      max: 5000,
    });

    const json = error.toJSON();
    expect(json.received).toBe(3);
    expect(json.min).toBe(150);
    expect(json.max).toBe(5000);
    expect(json.name).toBe('BidOutOfRangeError');
    expect(json.statusCode).toBe(400);
  });

  it('is constructible with only the message (no context)', () => {
    const error = new BidOutOfRangeError('wrong bid value: 3; min: 150');
    expect(error.received).toBeUndefined();
    expect(error.min).toBeUndefined();
    expect(error.fieldErrors).toEqual({ bid: 'wrong bid value: 3; min: 150' });
  });
});
