import type { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  WildberriesSDK,
  type CreateTestDbsOrdersAddress,
  type CreateTestDbsOrdersRequest,
  type DbsTestDeliveryType,
} from '../../../src';
import type { RateLimitConfig } from '../../../src/client/rate-limiter';
import { NetworkError, ValidationError } from '../../../src/errors';

const SANDBOX_URL = 'https://marketplace-api-sandbox.wildberries.ru/api/v3/test/dbs/orders/make';

interface BaseClientInternals {
  axios: AxiosInstance;
  rateLimiter: { config: Record<string, RateLimitConfig> };
}

describe('ordersDBS.createTestOrders()', () => {
  let sdk: WildberriesSDK;
  let mockAxios: MockAdapter;
  let client: BaseClientInternals;

  beforeEach(() => {
    sdk = new WildberriesSDK({
      apiKey: 'synthetic-test-token',
      tokenType: 'test',
      baseUrls: { orders: 'https://example.invalid/production-override' },
      retryConfig: { maxRetries: 2, retryDelay: 0 },
    });
    client = (sdk as unknown as { client: BaseClientInternals }).client;
    mockAxios = new MockAdapter(client.axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it.each<DbsTestDeliveryType>(['dbs', 'dbsPickupPoint', 'edbs'])(
    'serializes deliveryType=%s to the fixed sandbox host',
    async (deliveryType) => {
      const request: CreateTestDbsOrdersRequest = {
        orders: [{ sku: 'sku-1', amount: 1 }],
        deliveryType,
      };
      mockAxios.onPost(SANDBOX_URL).reply((config) => {
        expect(JSON.parse(config.data as string)).toEqual(request);
        return [204];
      });

      await sdk.ordersDBS.createTestOrders(request);

      expect(mockAxios.history.post).toHaveLength(1);
      expect(mockAxios.history.post[0].url).toBe(SANDBOX_URL);
    }
  );

  it('preserves deliveryType and address omission without injecting defaults', async () => {
    const request: CreateTestDbsOrdersRequest = {
      orders: [{ sku: 'sku-omitted', amount: 2 }],
    };
    mockAxios.onPost(SANDBOX_URL).reply((config) => {
      const body = JSON.parse(config.data as string) as Record<string, unknown>;
      expect(body).toEqual(request);
      expect(body).not.toHaveProperty('deliveryType');
      expect(body).not.toHaveProperty('address');
      return [204];
    });

    await expect(sdk.ordersDBS.createTestOrders(request)).resolves.toBeUndefined();
  });

  it.each([1, 10])('accepts %i orders', async (count) => {
    const request: CreateTestDbsOrdersRequest = {
      orders: Array.from({ length: count }, (_, index) => ({
        sku: `sku-${String(index)}`,
        amount: 10,
      })),
    };
    mockAxios.onPost(SANDBOX_URL).reply(204);

    await expect(sdk.ordersDBS.createTestOrders(request)).resolves.toBeUndefined();
    expect(mockAxios.history.post).toHaveLength(1);
  });

  it.each([0, 11])('rejects %i orders before calling the HTTP client', async (count) => {
    const request: CreateTestDbsOrdersRequest = {
      orders: Array.from({ length: count }, (_, index) => ({
        sku: `sku-${String(index)}`,
        amount: 1,
      })),
    };

    await expect(sdk.ordersDBS.createTestOrders(request)).rejects.toThrow(ValidationError);
    expect(mockAxios.history.post).toHaveLength(0);
  });

  it.each([
    { amount: 1.5, message: 'amount must be an integer' },
    { amount: 11, message: 'amount cannot exceed 10' },
  ])('rejects only the displayed amount constraints: $amount', async ({ amount, message }) => {
    await expect(
      sdk.ordersDBS.createTestOrders({ orders: [{ sku: 'sku-amount', amount }] })
    ).rejects.toThrow(message);
    expect(mockAxios.history.post).toHaveLength(0);
  });

  it('does not invent an unrendered amount minimum or string constraints', async () => {
    const address: CreateTestDbsOrdersAddress = {
      region: '',
      locality: '',
      street: '',
      houseNumber: '',
    };
    const request: CreateTestDbsOrdersRequest = {
      orders: [{ sku: '', amount: -1 }],
      address,
    };
    mockAxios.onPost(SANDBOX_URL).reply(204);

    await expect(sdk.ordersDBS.createTestOrders(request)).resolves.toBeUndefined();
  });

  it('does not retry a transient failure for the registered write operation', async () => {
    mockAxios
      .onPost(SANDBOX_URL)
      .replyOnce(503, { message: 'temporary failure' })
      .onPost(SANDBOX_URL)
      .reply(204);

    await expect(
      sdk.ordersDBS.createTestOrders({ orders: [{ sku: 'sku-retry', amount: 1 }] })
    ).rejects.toBeInstanceOf(NetworkError);
    expect(mockAxios.history.post).toHaveLength(1);
  });

  it('keeps the documented sandbox limit unchanged for a Test token', () => {
    expect(client.rateLimiter.config['sandbox-dbs.createTestOrders']).toEqual({
      requestsPerMinute: 60,
      intervalSeconds: 1,
      burstLimit: 1,
      penaltyMultiplier: 1,
    });
  });

  it('keeps null outside the public request contract', () => {
    const request: CreateTestDbsOrdersRequest = {
      orders: [{ sku: 'sku-type', amount: 1 }],
      // @ts-expect-error The rendered contract supports omission, not null.
      deliveryType: null,
    };
    expect(request.deliveryType).toBeNull();
  });

  it('remains constructible through the public root type exports', () => {
    const request: CreateTestDbsOrdersRequest = {
      orders: [{ sku: 'sku-root', amount: 1 }],
      deliveryType: 'dbsPickupPoint',
      address: {
        region: 'Москва',
        locality: 'Москва',
        street: 'Сумская улица',
        houseNumber: '6 к 5',
        entrance: '1',
        intercom: '5545',
        floor: '2',
        apartment: '10',
      },
    };
    expect(request.deliveryType).toBe('dbsPickupPoint');
  });
});
