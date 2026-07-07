/**
 * Tests for BaseClient 409 error mapping logic.
 *
 * Verifies that HTTP 409 responses are correctly mapped to:
 * - MetaValidationFailError when the body contains a metaDetails array
 * - WBAPIError (base) for 409s without metaDetails (e.g. SupplyHasZeroOrders)
 *
 * Both cases must still satisfy instanceof WBAPIError.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { BaseClient } from '../../../src/client/base-client';
import { MetaValidationFailError } from '../../../src/errors/meta-validation-fail-error';
import { WBAPIError } from '../../../src/errors/base-error';
import { BidOutOfRangeError } from '../../../src/errors/bid-out-of-range-error';
import { ValidationError } from '../../../src/errors/validation-error';
import type { SDKConfig } from '../../../src/config';

describe('BaseClient — 409 error mapping', () => {
  let mockAxios: MockAdapter;
  let client: BaseClient;

  const testConfig: SDKConfig = {
    apiKey: 'test-api-key',
    timeout: 5000,
    logLevel: 'error',
  };

  const testUrl = 'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-1234/deliver';

  beforeEach(() => {
    client = new BaseClient(testConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    mockAxios = new MockAdapter((client as any).axios);
  });

  afterEach(() => {
    mockAxios.reset();
    mockAxios.restore();
  });

  describe('409 with metaDetails → MetaValidationFailError', () => {
    it('should throw MetaValidationFailError when body has metaDetails array', async () => {
      const body = {
        code: 'MetaValidationFail',
        message: 'Marking codes are invalid for some assembly tasks',
        metaDetails: [
          { key: 'sgtin', value: '', decision: 'invalid' },
          { key: 'sgtin', value: '0104607085078824215KlYF93VKHf', decision: 'invalid' },
        ],
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      await expect(client.patch(testUrl, undefined)).rejects.toThrow(MetaValidationFailError);
    });

    it('should expose metaDetails on the thrown error', async () => {
      const metaDetails = [
        { key: 'sgtin', value: '', decision: 'invalid' },
        { key: 'uin', value: '', decision: 'required' },
      ];
      const body = {
        code: 'MetaValidationFail',
        message: 'Marking codes are invalid',
        metaDetails,
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown MetaValidationFailError');
      } catch (error) {
        expect(error).toBeInstanceOf(MetaValidationFailError);
        const mvfe = error as MetaValidationFailError;
        expect(mvfe.metaDetails).toEqual(metaDetails);
        expect(mvfe.code).toBe('MetaValidationFail');
        expect(mvfe.message).toBe('Marking codes are invalid');
        expect(mvfe.statusCode).toBe(409);
      }
    });

    it('should satisfy instanceof WBAPIError for MetaValidationFailError', async () => {
      const body = {
        code: 'MetaValidationFail',
        message: 'Marking codes are invalid',
        metaDetails: [{ key: 'sgtin', value: '', decision: 'invalid' }],
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(WBAPIError);
        expect(error).toBeInstanceOf(MetaValidationFailError);
      }
    });

    it('should handle empty metaDetails array as MetaValidationFailError', async () => {
      const body = {
        code: 'MetaValidationFail',
        message: 'Meta validation failed',
        metaDetails: [],
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      await expect(client.patch(testUrl, undefined)).rejects.toThrow(MetaValidationFailError);
    });

    it('should use default code "Unknown" when body.code is missing', async () => {
      const body = {
        message: 'Meta validation failed',
        metaDetails: [{ key: 'sgtin', value: '', decision: 'invalid' }],
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(MetaValidationFailError);
        expect((error as MetaValidationFailError).code).toBe('Unknown');
      }
    });

    it('should propagate origin from RFC 7807 problem+json to MetaValidationFailError', async () => {
      const body = {
        code: 'MetaValidationFail',
        message: 'Marking codes are invalid',
        metaDetails: [{ key: 'sgtin', value: '', decision: 'invalid' }],
        origin: 's2s-fbs-api',
        requestId: 'req-origin-test',
      };
      mockAxios.onPatch(testUrl).reply(409, body, { 'content-type': 'application/problem+json' });

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(MetaValidationFailError);
        const mvfe = error as MetaValidationFailError;
        expect(mvfe.origin).toBe('s2s-fbs-api');
      }
    });

    it('should propagate timestamp from RFC 7807 problem+json to MetaValidationFailError', async () => {
      const body = {
        code: 'MetaValidationFail',
        message: 'Marking codes are invalid',
        metaDetails: [{ key: 'sgtin', value: '', decision: 'invalid' }],
        timestamp: '2026-05-21T10:00:00Z',
      };
      mockAxios.onPatch(testUrl).reply(409, body, { 'content-type': 'application/problem+json' });

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(MetaValidationFailError);
        const mvfe = error as MetaValidationFailError;
        expect(mvfe.timestamp).toBe('2026-05-21T10:00:00Z');
      }
    });

    it('should use default message when body.message is missing', async () => {
      const body = {
        code: 'MetaValidationFail',
        metaDetails: [{ key: 'sgtin', value: '', decision: 'invalid' }],
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(MetaValidationFailError);
        expect((error as MetaValidationFailError).message).toBeTruthy();
      }
    });
  });

  describe('409 without metaDetails → plain WBAPIError', () => {
    it('should throw plain WBAPIError when body has no metaDetails', async () => {
      const body = {
        code: 'SupplyHasZeroOrders',
        message:
          'Не удалось обработать поставку. Убедитесь, что за ней закреплён хотя бы одно сборочное задание.',
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown WBAPIError');
      } catch (error) {
        expect(error).toBeInstanceOf(WBAPIError);
        expect(error).not.toBeInstanceOf(MetaValidationFailError);
        expect((error as WBAPIError).statusCode).toBe(409);
      }
    });

    it('should throw plain WBAPIError when metaDetails is not an array', async () => {
      const body = {
        code: 'SomeError',
        message: 'Some error',
        metaDetails: 'not-an-array',
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown WBAPIError');
      } catch (error) {
        expect(error).toBeInstanceOf(WBAPIError);
        expect(error).not.toBeInstanceOf(MetaValidationFailError);
      }
    });

    it('should throw plain WBAPIError for 409 with empty body', async () => {
      mockAxios.onPatch(testUrl).reply(409, null);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown WBAPIError');
      } catch (error) {
        expect(error).toBeInstanceOf(WBAPIError);
        expect(error).not.toBeInstanceOf(MetaValidationFailError);
      }
    });

    it('plain WBAPIError for 409 should still satisfy instanceof WBAPIError', async () => {
      const body = { code: 'UinIsNotFilled', message: 'Some 409 error' };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(WBAPIError);
        expect((error as WBAPIError).statusCode).toBe(409);
      }
    });
  });

  describe('409 malformed metaDetails (MEDIUM-6)', () => {
    it('should throw plain WBAPIError when metaDetails is an object (not array)', async () => {
      const body = {
        code: 'SomeError',
        message: 'Some error',
        metaDetails: {},
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown WBAPIError');
      } catch (error) {
        expect(error).toBeInstanceOf(WBAPIError);
        expect(error).not.toBeInstanceOf(MetaValidationFailError);
      }
    });

    it('should throw plain WBAPIError when metaDetails is null', async () => {
      const body = {
        code: 'SomeError',
        message: 'Some error',
        metaDetails: null,
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      try {
        await client.patch(testUrl, undefined);
        expect.fail('Should have thrown WBAPIError');
      } catch (error) {
        expect(error).toBeInstanceOf(WBAPIError);
        expect(error).not.toBeInstanceOf(MetaValidationFailError);
      }
    });

    it('should throw MetaValidationFailError when metaDetails has empty entry objects', async () => {
      const body = {
        code: 'MetaValidationFail',
        message: 'Meta validation failed',
        metaDetails: [{}],
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      await expect(client.patch(testUrl, undefined)).rejects.toThrow(MetaValidationFailError);
    });

    it('should throw MetaValidationFailError when metaDetails has partial entries', async () => {
      const body = {
        code: 'MetaValidationFail',
        message: 'Meta validation failed',
        metaDetails: [{ key: 'sgtin' }],
      };
      mockAxios.onPatch(testUrl).reply(409, body);

      await expect(client.patch(testUrl, undefined)).rejects.toThrow(MetaValidationFailError);
    });
  });

  describe('existing error paths are not broken', () => {
    it('should still throw WBAPIError for 418 (unchanged behavior)', async () => {
      mockAxios.onGet(testUrl).reply(418, { error: "I'm a teapot" });
      await expect(client.get(testUrl)).rejects.toThrow(WBAPIError);
    });
  });

  describe('400 bid-out-of-range → BidOutOfRangeError', () => {
    const bidsUrl = 'https://advert-api.wildberries.ru/api/advert/v1/bids';

    it('should throw BidOutOfRangeError when body matches the WB bid-400 shape', async () => {
      const body = {
        detail: 'wrong bid value: 3; min: 150',
        title: 'invalid payload',
        status: 400,
      };
      mockAxios.onPatch(bidsUrl).reply(400, body);

      try {
        await client.patch(bidsUrl, { bids: [] });
        expect.fail('Should have thrown BidOutOfRangeError');
      } catch (error) {
        expect(error).toBeInstanceOf(BidOutOfRangeError);
        const boe = error as BidOutOfRangeError;
        expect(boe.received).toBe(3);
        expect(boe.min).toBe(150);
        expect(boe.max).toBeUndefined();
        expect(boe.message).toBe('wrong bid value: 3; min: 150');
        expect(boe.statusCode).toBe(400);
      }
    });

    it('should parse an optional max ceiling when WB reports one', async () => {
      const body = { detail: 'wrong bid value: 3; min: 150; max: 5000', title: 'invalid payload' };
      mockAxios.onPatch(bidsUrl).reply(400, body);

      try {
        await client.patch(bidsUrl, { bids: [] });
        expect.fail('Should have thrown BidOutOfRangeError');
      } catch (error) {
        expect(error).toBeInstanceOf(BidOutOfRangeError);
        const boe = error as BidOutOfRangeError;
        expect(boe.received).toBe(3);
        expect(boe.min).toBe(150);
        expect(boe.max).toBe(5000);
      }
    });

    it('BidOutOfRangeError satisfies instanceof ValidationError (backward-compat)', async () => {
      const body = { detail: 'wrong bid value: 3; min: 150', title: 'invalid payload' };
      mockAxios.onPatch(bidsUrl).reply(400, body);

      // Existing `catch (e instanceof ValidationError)` must still catch it
      await expect(client.patch(bidsUrl, { bids: [] })).rejects.toBeInstanceOf(ValidationError);
      await expect(client.patch(bidsUrl, { bids: [] })).rejects.toBeInstanceOf(WBAPIError);
    });

    it('should fall back to generic ValidationError for non-bid 400s', async () => {
      // Same advert category, but a non-bid validation error
      const body = { detail: 'advert_id is required', title: 'invalid payload' };
      mockAxios.onPatch(bidsUrl).reply(400, body);

      await expect(client.patch(bidsUrl, { bids: [] })).rejects.not.toBeInstanceOf(
        BidOutOfRangeError
      );
      await expect(client.patch(bidsUrl, { bids: [] })).rejects.toBeInstanceOf(ValidationError);
    });

    it('should fall back to generic ValidationError for non-bid-shaped 400s on other categories', async () => {
      // Detection is body-pattern-based: a 400 whose detail is NOT a bid-range string stays a
      // generic ValidationError, regardless of category. No non-advert endpoint ever emits a
      // 'wrong bid value: X; min: Y' body in practice, so this is the realistic guarantee.
      const productsUrl = 'https://content-api.wildberries.ru/content/v2/cards';
      const body = { detail: 'field "title" is required', title: 'invalid payload' };
      mockAxios.onPost(productsUrl).reply(400, body);

      await expect(client.post(productsUrl, {})).rejects.not.toBeInstanceOf(BidOutOfRangeError);
      await expect(client.post(productsUrl, {})).rejects.toBeInstanceOf(ValidationError);
    });
  });
});
