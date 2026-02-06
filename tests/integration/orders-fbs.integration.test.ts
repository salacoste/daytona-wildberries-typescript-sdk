/**
 * Integration tests for OrdersFbsModule
 *
 * Tests the OrdersFbsModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow from module → BaseClient → RateLimiter → RetryHandler → HTTP
 * - Rate limiting enforcement
 * - Retry logic with real timing
 * - Error transformation from HTTP responses
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/orders-fbs/index OrdersFbsModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { OrdersFbsModule } from '../../src/modules/orders-fbs';
import { BaseClient } from '../../src/client/base-client';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { NetworkError } from '../../src/errors/network-error';

const TEST_API_URL = 'https://marketplace-api.wildberries.ru';

/**
 * MSW handlers for Orders FBS API endpoints
 */
const handlers = [
  // ============================================================================
  // Orders Operations
  // ============================================================================

  // GET /api/v3/orders/new - Get new orders
  http.get(`${TEST_API_URL}/api/v3/orders/new`, () => {
    return HttpResponse.json({
      orders: [
        {
          id: 123456,
          rid: 'rid-123',
          createdAt: '2025-01-15T10:00:00Z',
          warehouseId: 1,
          supplyId: 'WB-GI-1234',
          nmId: 12345,
          chrtId: 67890,
          price: 1500,
          convertedPrice: 1500,
          currencyCode: 643,
          cargoType: 1,
        },
      ],
    });
  }),

  // GET /api/v3/orders - Get orders with pagination
  http.get(`${TEST_API_URL}/api/v3/orders`, () => {
    return HttpResponse.json({
      next: 12345,
      orders: [
        {
          id: 123456,
          rid: 'rid-123',
          createdAt: '2025-01-15T10:00:00Z',
          warehouseId: 1,
          nmId: 12345,
          chrtId: 67890,
          price: 1500,
        },
      ],
    });
  }),

  // POST /api/v3/orders/status - Get order statuses
  http.post(`${TEST_API_URL}/api/v3/orders/status`, async ({ request }) => {
    const body = (await request.json()) as { orders: number[] };
    return HttpResponse.json({
      orders: body.orders.map((id) => ({
        id,
        supplierStatus: 'confirm',
        wbStatus: 'waiting',
      })),
    });
  }),

  // GET /api/v3/supplies/orders/reshipment - Get reshipment orders
  http.get(`${TEST_API_URL}/api/v3/supplies/orders/reshipment`, () => {
    return HttpResponse.json({
      orders: [{ supplyID: 'WB-GI-OLD', orderID: 111222 }],
    });
  }),

  // PATCH /api/v3/orders/:orderId/cancel - Cancel order
  http.patch(`${TEST_API_URL}/api/v3/orders/:orderId/cancel`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // POST /api/v3/orders/stickers - Get order stickers
  http.post(`${TEST_API_URL}/api/v3/orders/stickers`, async ({ request }) => {
    const body = (await request.json()) as { orders: number[] };
    return HttpResponse.json({
      stickers: body.orders.map((orderId) => ({
        orderId,
        partA: 'PARTA',
        partB: 'PARTB',
        barcode: 'BARCODE123',
        file: 'base64encodedfile',
      })),
    });
  }),

  // ============================================================================
  // Supplies Operations
  // ============================================================================

  // GET /api/v3/supplies - List supplies
  http.get(`${TEST_API_URL}/api/v3/supplies`, () => {
    return HttpResponse.json({
      next: 100,
      supplies: [
        {
          id: 'WB-GI-1234',
          name: 'Test Supply',
          done: false,
          createdAt: '2025-01-15T10:00:00Z',
          closedAt: null,
          scanDt: null,
          cargoType: 1,
        },
      ],
    });
  }),

  // POST /api/v3/supplies - Create supply
  http.post(`${TEST_API_URL}/api/v3/supplies`, () => {
    return HttpResponse.json({ id: 'WB-GI-NEW-1234' });
  }),

  // GET /api/v3/supplies/:supplyId - Get supply info
  http.get(`${TEST_API_URL}/api/v3/supplies/:supplyId`, ({ params }) => {
    return HttpResponse.json({
      id: params.supplyId,
      name: 'Test Supply',
      done: false,
      createdAt: '2025-01-15T10:00:00Z',
      closedAt: null,
      scanDt: null,
      cargoType: 1,
    });
  }),

  // DELETE /api/v3/supplies/:supplyId - Delete supply
  http.delete(`${TEST_API_URL}/api/v3/supplies/:supplyId`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // PATCH /api/v3/supplies/:supplyId/deliver - Deliver supply
  http.patch(`${TEST_API_URL}/api/v3/supplies/:supplyId/deliver`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // GET /api/v3/supplies/:supplyId/barcode - Get supply barcode
  http.get(`${TEST_API_URL}/api/v3/supplies/:supplyId/barcode`, () => {
    return HttpResponse.json({
      barcode: 'WB-GI-1234-BARCODE',
      file: 'base64encodedbarcode',
    });
  }),

  // GET /api/v3/supplies/:supplyId/orders - Get supply orders (legacy)
  http.get(`${TEST_API_URL}/api/v3/supplies/:supplyId/orders`, () => {
    return HttpResponse.json({
      orders: [{ id: 123456, status: 'confirm' }],
    });
  }),

  // PATCH /api/v3/supplies/:supplyId/orders/:orderId - Add order to supply
  http.patch(`${TEST_API_URL}/api/v3/supplies/:supplyId/orders/:orderId`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // ============================================================================
  // Passes Operations
  // ============================================================================

  // GET /api/v3/passes/offices - Get pass offices
  http.get(`${TEST_API_URL}/api/v3/passes/offices`, () => {
    return HttpResponse.json([
      { id: 1, name: 'Moscow Warehouse', address: '123 Moscow St' },
      { id: 2, name: 'SPB Warehouse', address: '456 SPB Ave' },
    ]);
  }),

  // GET /api/v3/passes - List passes
  http.get(`${TEST_API_URL}/api/v3/passes`, () => {
    return HttpResponse.json([
      {
        id: 1001,
        firstName: 'Ivan',
        lastName: 'Petrov',
        carModel: 'GAZelle',
        carNumber: 'A123BC77',
        officeId: 1,
      },
    ]);
  }),

  // POST /api/v3/passes - Create pass
  http.post(`${TEST_API_URL}/api/v3/passes`, () => {
    return HttpResponse.json({ id: 1002 });
  }),

  // PUT /api/v3/passes/:passId - Update pass
  http.put(`${TEST_API_URL}/api/v3/passes/:passId`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // DELETE /api/v3/passes/:passId - Delete pass
  http.delete(`${TEST_API_URL}/api/v3/passes/:passId`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // ============================================================================
  // Metadata Operations
  // ============================================================================

  // POST /api/marketplace/v3/orders/meta - Get bulk metadata
  http.post(`${TEST_API_URL}/api/marketplace/v3/orders/meta`, async ({ request }) => {
    const body = (await request.json()) as { orders: number[] };
    return HttpResponse.json({
      orders: body.orders.map((id) => ({
        id,
        meta: { imei: '123456789012345', sgtin: ['01234567890123456789012'] },
      })),
    });
  }),

  // DELETE /api/v3/orders/:orderId/meta - Delete metadata
  http.delete(`${TEST_API_URL}/api/v3/orders/:orderId/meta`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // PUT /api/v3/orders/:orderId/meta/imei - Set IMEI
  http.put(`${TEST_API_URL}/api/v3/orders/:orderId/meta/imei`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // PUT /api/v3/orders/:orderId/meta/sgtin - Set SGTIN
  http.put(`${TEST_API_URL}/api/v3/orders/:orderId/meta/sgtin`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // ============================================================================
  // Trbx (Boxes) Operations
  // ============================================================================

  // GET /api/v3/supplies/:supplyId/trbx - Get supply boxes
  http.get(`${TEST_API_URL}/api/v3/supplies/:supplyId/trbx`, () => {
    return HttpResponse.json({
      trbxes: [{ id: 'trbx-001', supplyId: 'WB-GI-1234' }],
    });
  }),

  // POST /api/v3/supplies/:supplyId/trbx - Create boxes
  http.post(`${TEST_API_URL}/api/v3/supplies/:supplyId/trbx`, async ({ request }) => {
    const body = (await request.json()) as { amount: number };
    const trbxIds = Array.from({ length: body.amount }, (_, i) => `trbx-new-${i + 1}`);
    return HttpResponse.json({ trbxIds });
  }),

  // DELETE /api/v3/supplies/:supplyId/trbx - Delete boxes
  http.delete(`${TEST_API_URL}/api/v3/supplies/:supplyId/trbx`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // New bulk endpoints
  http.get(`${TEST_API_URL}/api/marketplace/v3/supplies/:supplyId/order-ids`, () => {
    return HttpResponse.json({ orderIds: [123, 456, 789] });
  }),

  http.patch(`${TEST_API_URL}/api/marketplace/v3/supplies/:supplyId/orders`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('OrdersFbsModule Integration Tests', () => {
  let ordersFbs: OrdersFbsModule;
  let baseClient: BaseClient;

  beforeEach(() => {
    baseClient = new BaseClient({
      apiKey: 'test-integration-key',
      timeout: 5000,
      retryConfig: {
        maxRetries: 3,
        retryDelay: 100,
        exponentialBackoff: true,
      },
    });
    ordersFbs = new OrdersFbsModule(baseClient);
  });

  describe('Orders Operations', () => {
    it('should fetch new orders', async () => {
      const result = await ordersFbs.getOrdersNew();

      expect(result.orders).toBeDefined();
      expect(result.orders).toHaveLength(1);
      expect(result.orders![0].id).toBe(123456);
    });

    it('should fetch orders with pagination', async () => {
      const result = await ordersFbs.orders({ limit: 100, next: 0 });

      expect(result.orders).toBeDefined();
      expect(result.next).toBe(12345);
    });

    it('should get order statuses', async () => {
      const result = await ordersFbs.getOrderStatuses({ orders: [123, 456] });

      expect(result.orders).toBeDefined();
      expect(result.orders).toHaveLength(2);
      expect(result.orders![0].supplierStatus).toBe('confirm');
    });

    it('should get reshipment orders', async () => {
      const result = await ordersFbs.getOrdersReshipment();

      expect(result.orders).toBeDefined();
      expect(result.orders![0].supplyID).toBe('WB-GI-OLD');
    });

    it('should cancel an order', async () => {
      await expect(ordersFbs.updateOrdersCancel(123456)).resolves.not.toThrow();
    });

    it('should get order stickers', async () => {
      const result = await ordersFbs.createOrdersSticker(
        { type: 'png', width: 58, height: 40 },
        { orders: [123, 456] }
      );

      expect(result.stickers).toBeDefined();
      expect(result.stickers).toHaveLength(2);
      expect(result.stickers![0].barcode).toBe('BARCODE123');
    });
  });

  describe('Supplies Operations', () => {
    it('should list supplies', async () => {
      const result = await ordersFbs.supplies({ limit: 100, next: 0 });

      expect(result.supplies).toBeDefined();
      expect(result.supplies![0].id).toBe('WB-GI-1234');
    });

    it('should create a supply', async () => {
      const result = await ordersFbs.createSupply({ name: 'New Supply' });

      expect(result.id).toBe('WB-GI-NEW-1234');
    });

    it('should get supply info', async () => {
      const result = await ordersFbs.getSupply('WB-GI-1234');

      expect(result.id).toBe('WB-GI-1234');
      expect(result.name).toBe('Test Supply');
    });

    it('should delete a supply', async () => {
      await expect(ordersFbs.deleteSupply('WB-GI-1234')).resolves.not.toThrow();
    });

    it('should deliver a supply', async () => {
      await expect(ordersFbs.updateSuppliesDeliver('WB-GI-1234')).resolves.not.toThrow();
    });

    it('should get supply barcode', async () => {
      const result = await ordersFbs.getSuppliesBarcode('WB-GI-1234', { type: 'png' });

      expect(result.barcode).toBeDefined();
      expect(result.file).toBeDefined();
    });

    it('should get supply orders (legacy)', async () => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const result = await ordersFbs.getSuppliesOrder('WB-GI-1234');

      expect(result.orders).toBeDefined();
    });

    it('should add order to supply', async () => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      await expect(ordersFbs.updateSuppliesOrder('WB-GI-1234', 123456)).resolves.not.toThrow();
    });

    it('should get supply order IDs (bulk)', async () => {
      const result = await ordersFbs.getSupplyOrderIds('WB-GI-1234');

      expect(result.orderIds).toEqual([123, 456, 789]);
    });

    it('should add multiple orders to supply (bulk)', async () => {
      await expect(
        ordersFbs.addOrdersToSupply('WB-GI-1234', { orders: [123, 456] })
      ).resolves.not.toThrow();
    });
  });

  describe('Passes Operations', () => {
    it('should get pass offices', async () => {
      const result = await ordersFbs.getPassesOffices();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Moscow Warehouse');
    });

    it('should list passes', async () => {
      const result = await ordersFbs.passes();

      expect(result).toHaveLength(1);
      expect(result[0].firstName).toBe('Ivan');
    });

    it('should create a pass', async () => {
      const result = await ordersFbs.createPass({
        firstName: 'Ivan',
        lastName: 'Petrov',
        carModel: 'GAZelle',
        carNumber: 'A123BC77',
        officeId: 1,
      });

      expect(result.id).toBe(1002);
    });

    it('should update a pass', async () => {
      await expect(
        ordersFbs.updatePass(1001, {
          firstName: 'Ivan',
          lastName: 'Sidorov',
          carModel: 'GAZelle',
          carNumber: 'A123BC77',
          officeId: 2,
        })
      ).resolves.not.toThrow();
    });

    it('should delete a pass', async () => {
      await expect(ordersFbs.deletePass(1001)).resolves.not.toThrow();
    });
  });

  describe('Metadata Operations', () => {
    it('should get bulk metadata', async () => {
      const result = await ordersFbs.getOrdersMetaBulk({ orders: [123, 456] });

      expect(result.orders).toBeDefined();
      expect(result.orders).toHaveLength(2);
      expect(result.orders![0].meta?.imei).toBe('123456789012345');
    });

    it('should get single order metadata', async () => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const result = await ordersFbs.getOrdersMeta(123);

      expect(result.meta).toBeDefined();
    });

    it('should delete metadata', async () => {
      await expect(ordersFbs.deleteOrdersMeta(123456, { key: 'imei' })).resolves.not.toThrow();
    });

    it('should set IMEI metadata', async () => {
      await expect(
        ordersFbs.updateMetaImei(123456, { imei: '123456789012345' })
      ).resolves.not.toThrow();
    });

    it('should set SGTIN metadata', async () => {
      await expect(
        ordersFbs.updateMetaSgtin(123456, { sgtins: ['01234567890123456789012'] })
      ).resolves.not.toThrow();
    });
  });

  describe('Trbx (Boxes) Operations', () => {
    it('should get supply boxes', async () => {
      const result = await ordersFbs.getSuppliesTrbx('WB-GI-1234');

      expect(result.trbxes).toBeDefined();
      expect(result.trbxes![0].id).toBe('trbx-001');
    });

    it('should create boxes', async () => {
      const result = await ordersFbs.createSuppliesTrbx('WB-GI-1234', { amount: 3 });

      expect(result.trbxIds).toHaveLength(3);
    });

    it('should delete boxes', async () => {
      await expect(
        ordersFbs.deleteSuppliesTrbx('WB-GI-1234', { trbxIds: ['trbx-001'] })
      ).resolves.not.toThrow();
    });
  });

  describe('Error Transformation', () => {
    it('should transform 401 to AuthenticationError', async () => {
      server.use(
        http.get(`${TEST_API_URL}/api/v3/orders/new`, () => {
          return new HttpResponse(null, { status: 401 });
        })
      );

      await expect(ordersFbs.getOrdersNew()).rejects.toThrow(AuthenticationError);
    });

    it('should transform 429 to RateLimitError', async () => {
      server.use(
        http.get(`${TEST_API_URL}/api/v3/orders/new`, () => {
          return new HttpResponse(null, {
            status: 429,
            headers: { 'Retry-After': '5' },
          });
        })
      );

      await expect(ordersFbs.getOrdersNew()).rejects.toThrow(RateLimitError);
    });

    it('should transform 500 to NetworkError', async () => {
      server.use(
        http.get(`${TEST_API_URL}/api/v3/orders/new`, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(ordersFbs.getOrdersNew()).rejects.toThrow(NetworkError);
    });
  });

  describe('Retry Logic', () => {
    it('should retry on transient 503 and succeed', async () => {
      let attempts = 0;

      server.use(
        http.get(`${TEST_API_URL}/api/v3/orders/new`, () => {
          attempts++;
          if (attempts < 3) {
            return new HttpResponse(null, { status: 503 });
          }
          return HttpResponse.json({ orders: [] });
        })
      );

      const result = await ordersFbs.getOrdersNew();

      expect(attempts).toBe(3);
      expect(result.orders).toEqual([]);
    });

    it('should not retry on 400 Bad Request', async () => {
      let attempts = 0;

      server.use(
        http.get(`${TEST_API_URL}/api/v3/orders/new`, () => {
          attempts++;
          return new HttpResponse(null, { status: 400 });
        })
      );

      await expect(ordersFbs.getOrdersNew()).rejects.toThrow();
      expect(attempts).toBe(1);
    });
  });

  describe('Authentication', () => {
    it('should include Authorization header', async () => {
      let authHeader: string | null = null;

      server.use(
        http.get(`${TEST_API_URL}/api/v3/orders/new`, ({ request }) => {
          authHeader = request.headers.get('Authorization');
          return HttpResponse.json({ orders: [] });
        })
      );

      await ordersFbs.getOrdersNew();

      expect(authHeader).toContain('test-integration-key');
    });
  });
});
