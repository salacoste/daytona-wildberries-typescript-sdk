import { describe, it, expect } from 'vitest';
import { MetaValidationFailError } from '../../../src/errors/meta-validation-fail-error';
import { WBAPIError } from '../../../src/errors/base-error';
import type { MetaDetail } from '../../../src/types/orders-fbs.types';

const sampleMetaDetails: MetaDetail[] = [
  { key: 'sgtin', value: '', decision: 'invalid' },
  { key: 'sgtin', value: '0104607085078824215KlYF93VKHf', decision: 'invalid' },
];

describe('MetaValidationFailError', () => {
  describe('constructor', () => {
    it('should create error with all fields', () => {
      const response = {
        code: 'MetaValidationFail',
        message: 'Bad codes',
        metaDetails: sampleMetaDetails,
      };
      const error = new MetaValidationFailError(
        'Marking codes are invalid',
        'MetaValidationFail',
        sampleMetaDetails,
        response,
        'req-abc-123'
      );

      expect(error.message).toBe('Marking codes are invalid');
      expect(error.code).toBe('MetaValidationFail');
      expect(error.metaDetails).toEqual(sampleMetaDetails);
      expect(error.statusCode).toBe(409);
      expect(error.response).toEqual(response);
      expect(error.requestId).toBe('req-abc-123');
    });

    it('should create error with minimal required fields', () => {
      const error = new MetaValidationFailError('Meta validation failed', 'MetaValidationFail', []);

      expect(error.message).toBe('Meta validation failed');
      expect(error.code).toBe('MetaValidationFail');
      expect(error.metaDetails).toEqual([]);
      expect(error.statusCode).toBe(409);
      expect(error.response).toBeUndefined();
      expect(error.requestId).toBeUndefined();
    });

    it('should always set statusCode to 409', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error.statusCode).toBe(409);
    });

    it('should accept empty metaDetails array', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error.metaDetails).toHaveLength(0);
    });

    it('should preserve all metaDetail fields', () => {
      const details: MetaDetail[] = [
        { key: 'imei', value: '123456789012345', decision: 'filled' },
        { key: 'uin', value: '', decision: 'required' },
        { key: 'sgtin', value: 'bad-code', decision: 'invalid' },
        { key: 'gtin', value: '', decision: 'optional' },
      ];
      const error = new MetaValidationFailError('msg', 'code', details);
      expect(error.metaDetails).toEqual(details);
    });
  });

  describe('inheritance', () => {
    it('should extend WBAPIError', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error).toBeInstanceOf(WBAPIError);
    });

    it('should extend Error', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error).toBeInstanceOf(Error);
    });

    it('should be instanceof MetaValidationFailError', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error).toBeInstanceOf(MetaValidationFailError);
    });

    it('plain WBAPIError should NOT be instanceof MetaValidationFailError', () => {
      const base = new WBAPIError('base error', 409);
      expect(base).not.toBeInstanceOf(MetaValidationFailError);
    });
  });

  describe('name property', () => {
    it('should set name to MetaValidationFailError', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error.name).toBe('MetaValidationFailError');
    });
  });

  describe('code field', () => {
    it('should expose the code string', () => {
      const error = new MetaValidationFailError('msg', 'MetaValidationFail', []);
      expect(error.code).toBe('MetaValidationFail');
    });

    it('should preserve arbitrary code values', () => {
      const error = new MetaValidationFailError('msg', 'CustomErrorCode', []);
      expect(error.code).toBe('CustomErrorCode');
    });
  });

  describe('metaDetails field', () => {
    it('should be accessible as an array', () => {
      const error = new MetaValidationFailError('msg', 'code', sampleMetaDetails);
      expect(Array.isArray(error.metaDetails)).toBe(true);
    });

    it('should contain items with key, value, decision properties', () => {
      const error = new MetaValidationFailError('msg', 'code', sampleMetaDetails);
      const first = error.metaDetails[0];
      expect(first).toHaveProperty('key');
      expect(first).toHaveProperty('value');
      expect(first).toHaveProperty('decision');
    });

    it('should return correct decision values', () => {
      const error = new MetaValidationFailError('msg', 'code', sampleMetaDetails);
      const invalidItems = error.metaDetails.filter((d) => d.decision === 'invalid');
      expect(invalidItems).toHaveLength(2);
    });
  });

  describe('getUserMessage()', () => {
    it('should include the base message with status code', () => {
      const error = new MetaValidationFailError(
        'Marking codes are invalid',
        'code',
        sampleMetaDetails
      );
      expect(error.getUserMessage()).toContain('Marking codes are invalid (Status: 409)');
    });

    it('should list invalid codes', () => {
      const error = new MetaValidationFailError('msg', 'code', sampleMetaDetails);
      expect(error.getUserMessage()).toContain('Invalid marking codes (2)');
      expect(error.getUserMessage()).toContain('sgtin');
    });

    it('should list required-but-missing codes', () => {
      const details: MetaDetail[] = [{ key: 'uin', value: '', decision: 'required' }];
      const error = new MetaValidationFailError('msg', 'code', details);
      expect(error.getUserMessage()).toContain('Missing required marking codes (1)');
      expect(error.getUserMessage()).toContain('uin');
    });

    it('should include rate-limit penalty warning', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error.getUserMessage()).toContain('10 requests');
    });

    it('should include recovery steps', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error.getUserMessage()).toContain('getOrdersMetaBulk');
    });

    it('should include requestId in message when present', () => {
      const error = new MetaValidationFailError('msg', 'code', [], undefined, 'req-xyz');
      expect(error.getUserMessage()).toContain('req-xyz');
    });
  });

  describe('origin and timestamp (RFC 7807)', () => {
    it('should accept and expose origin parameter', () => {
      const error = new MetaValidationFailError(
        'msg',
        'code',
        [],
        undefined,
        undefined,
        'test-service'
      );
      expect(error.origin).toBe('test-service');
    });

    it('should accept and expose timestamp parameter', () => {
      const error = new MetaValidationFailError(
        'msg',
        'code',
        [],
        undefined,
        undefined,
        undefined,
        '2026-05-21T10:00:00Z'
      );
      expect(error.timestamp).toBe('2026-05-21T10:00:00Z');
    });

    it('should forward origin and timestamp to WBAPIError base', () => {
      const error = new MetaValidationFailError(
        'msg',
        'code',
        [],
        { raw: true },
        'req-001',
        's2s-api-auth-catalog',
        '2026-05-21T10:00:00Z'
      );
      expect(error.requestId).toBe('req-001');
      expect(error.origin).toBe('s2s-api-auth-catalog');
      expect(error.timestamp).toBe('2026-05-21T10:00:00Z');
    });

    it('origin and timestamp should be undefined when not provided', () => {
      const error = new MetaValidationFailError('msg', 'code', []);
      expect(error.origin).toBeUndefined();
      expect(error.timestamp).toBeUndefined();
    });
  });

  describe('defensive copy of metaDetails', () => {
    it('should not be mutated by downstream changes to the original array', () => {
      const details: MetaDetail[] = [{ key: 'sgtin', value: '', decision: 'invalid' }];
      const error = new MetaValidationFailError('msg', 'code', details);
      details.push({ key: 'imei', value: '12345', decision: 'filled' });
      // error.metaDetails should still have length 1
      expect(error.metaDetails).toHaveLength(1);
    });
  });

  describe('serialization', () => {
    it('should serialize to JSON preserving all properties', () => {
      const error = new MetaValidationFailError(
        'Marking codes are invalid',
        'MetaValidationFail',
        sampleMetaDetails,
        { raw: true },
        'req-123'
      );
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as {
        name: string;
        message: string;
        statusCode: number;
        code: string;
        metaDetails: MetaDetail[];
        response: unknown;
        requestId: string;
      };

      expect(parsed.name).toBe('MetaValidationFailError');
      expect(parsed.message).toBe('Marking codes are invalid');
      expect(parsed.statusCode).toBe(409);
      expect(parsed.code).toBe('MetaValidationFail');
      expect(parsed.metaDetails).toEqual(sampleMetaDetails);
      expect(parsed.requestId).toBe('req-123');
    });
  });
});
