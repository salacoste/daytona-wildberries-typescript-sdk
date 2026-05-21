import { describe, it, expect } from 'vitest';
import { parseMetaValidationFail } from '../../../src/utils/parseMetaValidationFail';
import { MetaValidationFailError } from '../../../src/errors/meta-validation-fail-error';
import { WBAPIError } from '../../../src/errors/base-error';
import type { MetaDetail } from '../../../src/types/orders-fbs.types';

const sampleMetaDetails: MetaDetail[] = [
  { key: 'sgtin', value: '', decision: 'invalid' },
  { key: 'sgtin', value: '0104607085078824215KlYF93VKHf', decision: 'invalid' },
];

describe('parseMetaValidationFail', () => {
  describe('MetaValidationFailError instance', () => {
    it('should return parsed payload from a MetaValidationFailError', () => {
      const error = new MetaValidationFailError(
        'Marking codes are invalid',
        'MetaValidationFail',
        sampleMetaDetails
      );

      const result = parseMetaValidationFail(error);

      expect(result).not.toBeNull();
      expect(result?.code).toBe('MetaValidationFail');
      expect(result?.message).toBe('Marking codes are invalid');
      expect(result?.metaDetails).toEqual(sampleMetaDetails);
    });

    it('should return all three fields', () => {
      const error = new MetaValidationFailError('msg', 'MyCode', sampleMetaDetails);
      const result = parseMetaValidationFail(error);
      expect(result).toHaveProperty('code');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('metaDetails');
    });

    it('should handle empty metaDetails array', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      const result = parseMetaValidationFail(error);
      expect(result?.metaDetails).toEqual([]);
    });
  });

  describe('plain object duck-typing (fallback path)', () => {
    it('should return parsed payload for plain 409 object with metaDetails in response', () => {
      const plainErr = {
        statusCode: 409,
        message: 'Meta validation failed',
        response: {
          code: 'MetaValidationFail',
          message: 'Marking codes are invalid for some assembly tasks',
          metaDetails: sampleMetaDetails,
        },
      };

      const result = parseMetaValidationFail(plainErr);

      expect(result).not.toBeNull();
      expect(result?.code).toBe('MetaValidationFail');
      expect(result?.message).toBe('Marking codes are invalid for some assembly tasks');
      expect(result?.metaDetails).toEqual(sampleMetaDetails);
    });

    it('should fall back to errObj.message when response has no message', () => {
      const plainErr = {
        statusCode: 409,
        message: 'Fallback message',
        response: {
          code: 'SomeCode',
          metaDetails: sampleMetaDetails,
        },
      };

      const result = parseMetaValidationFail(plainErr);
      expect(result?.message).toBe('Fallback message');
    });

    it('should use default code "Unknown" when response.code is missing', () => {
      const plainErr = {
        statusCode: 409,
        response: {
          metaDetails: sampleMetaDetails,
        },
      };

      const result = parseMetaValidationFail(plainErr);
      expect(result?.code).toBe('Unknown');
    });

    it('should use default message when neither response.message nor errObj.message present', () => {
      const plainErr = {
        statusCode: 409,
        response: {
          metaDetails: sampleMetaDetails,
        },
      };

      const result = parseMetaValidationFail(plainErr);
      expect(result?.message).toBe('Meta validation failed');
    });
  });

  describe('returns null for non-matching inputs', () => {
    it('should return null for plain Error', () => {
      expect(parseMetaValidationFail(new Error('plain error'))).toBeNull();
    });

    it('should return null for plain WBAPIError', () => {
      const err = new WBAPIError('base error', 409);
      expect(parseMetaValidationFail(err)).toBeNull();
    });

    it('should return null for null', () => {
      expect(parseMetaValidationFail(null)).toBeNull();
    });

    it('should return null for undefined', () => {
      expect(parseMetaValidationFail(undefined)).toBeNull();
    });

    it('should return null for a string', () => {
      expect(parseMetaValidationFail('some error string')).toBeNull();
    });

    it('should return null for a number', () => {
      expect(parseMetaValidationFail(42)).toBeNull();
    });

    it('should return null for 409 without metaDetails', () => {
      const plainErr = {
        statusCode: 409,
        message: 'Supply has zero orders',
        response: {
          code: 'SupplyHasZeroOrders',
          message: 'Не удалось обработать поставку',
        },
      };
      expect(parseMetaValidationFail(plainErr)).toBeNull();
    });

    it('should return null for 409 with non-array metaDetails', () => {
      const plainErr = {
        statusCode: 409,
        response: {
          metaDetails: 'not-an-array',
        },
      };
      expect(parseMetaValidationFail(plainErr)).toBeNull();
    });

    it('should return null for non-409 with metaDetails', () => {
      const plainErr = {
        statusCode: 400,
        response: {
          code: 'SomeError',
          metaDetails: sampleMetaDetails,
        },
      };
      expect(parseMetaValidationFail(plainErr)).toBeNull();
    });

    it('should return null for 409 when response is null', () => {
      const plainErr = { statusCode: 409, response: null };
      expect(parseMetaValidationFail(plainErr)).toBeNull();
    });

    it('should return null for 409 when response is a string', () => {
      const plainErr = { statusCode: 409, response: 'error string' };
      expect(parseMetaValidationFail(plainErr)).toBeNull();
    });

    it('should return null for empty object', () => {
      expect(parseMetaValidationFail({})).toBeNull();
    });

    it('should return null when metaDetails is an object (not array) — MEDIUM-6', () => {
      const plainErr = {
        statusCode: 409,
        response: {
          code: 'SomeError',
          metaDetails: {},
        },
      };
      expect(parseMetaValidationFail(plainErr)).toBeNull();
    });

    it('should return null when metaDetails is null — MEDIUM-6', () => {
      const plainErr = {
        statusCode: 409,
        response: {
          code: 'SomeError',
          metaDetails: null,
        },
      };
      expect(parseMetaValidationFail(plainErr)).toBeNull();
    });
  });

  describe('MEDIUM-6: edge cases', () => {
    it('should fast-path via instanceof for MetaValidationFailError (Proxy-wrapped scenario)', () => {
      const inner = new MetaValidationFailError('msg', 'code', sampleMetaDetails);
      // Wrap in a Proxy to simulate cross-realm / bundler scenario where the
      // object is a real MetaValidationFailError but accessed through a proxy
      const proxied = new Proxy(inner, {});
      const result = parseMetaValidationFail(proxied);
      expect(result).not.toBeNull();
      expect(result?.code).toBe('code');
      expect(result?.metaDetails).toEqual(sampleMetaDetails);
    });

    it('should still work via duck-type for Object.create(null) prototype objects', () => {
      // Object.create(null) has no prototype — simulates hostile/unusual inputs
      const noProto = Object.create(null) as Record<string, unknown>;
      noProto.statusCode = 409;
      noProto.response = Object.create(null) as Record<string, unknown>;
      (noProto.response as Record<string, unknown>).code = 'SomeCode';
      (noProto.response as Record<string, unknown>).metaDetails = sampleMetaDetails;
      const result = parseMetaValidationFail(noProto);
      expect(result).not.toBeNull();
      expect(result?.metaDetails).toEqual(sampleMetaDetails);
    });

    it('should return non-null for metaDetails array with empty entry objects — MEDIUM-6', () => {
      // Arrays with partially-shaped entries are still valid (WB may extend fields later)
      const plainErr = {
        statusCode: 409,
        response: {
          code: 'MetaValidationFail',
          metaDetails: [{}],
        },
      };
      const result = parseMetaValidationFail(plainErr);
      expect(result).not.toBeNull();
    });

    it('should return non-null for metaDetails array with partial entries — MEDIUM-6', () => {
      const plainErr = {
        statusCode: 409,
        response: {
          code: 'MetaValidationFail',
          metaDetails: [{ key: 'sgtin' }],
        },
      };
      const result = parseMetaValidationFail(plainErr);
      expect(result).not.toBeNull();
    });
  });
});
