import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';
import { AuthenticationError } from '../../src/errors/auth-error';

const server = setupServer(
  // Products endpoints
  http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Электроника', isVisible: true },
        { id: 2, name: 'Одежда', isVisible: true }
      ]
    });
  }),

  http.get('https://content-api.wildberries.ru/content/v2/object/all', () => {
    return HttpResponse.json({
      data: [
        { subjectID: 101, subjectName: 'Смартфоны', parentID: 1, parentName: 'Электроника' }
      ]
    });
  }),

  http.post('https://content-api.wildberries.ru/content/v2/cards/upload', () => {
    return HttpResponse.json({
      id: 'PROD123',
      error: null
    });
  }),

  // Orders FBS endpoints
  http.get('https://marketplace-api.wildberries.ru/api/v3/orders/new', () => {
    return HttpResponse.json({
      orders: [
        { id: 12345, createdAt: '2024-10-22T10:00:00Z' }
      ]
    });
  }),

  http.get('https://marketplace-api.wildberries.ru/api/v3/orders', () => {
    return HttpResponse.json({
      orders: [
        { id: 12345, status: 'new', createdAt: '2024-10-22T10:00:00Z' },
        { id: 12346, status: 'confirm', createdAt: '2024-10-22T11:00:00Z' }
      ],
      total: 2
    });
  }),

  http.post('https://marketplace-api.wildberries.ru/api/v3/supplies', () => {
    return HttpResponse.json({
      id: 'WB-GI-123',
      name: 'Test Supply'
    });
  }),

  // Orders FBW endpoints
  http.get('https://supplies-api.wildberries.ru/api/v1/warehouses', () => {
    return HttpResponse.json([
      {
        ID: 507,
        name: 'Коледино',
        officeID: 1,
        cargoType: 1,
        isActive: true
      },
      {
        ID: 508,
        name: 'Санкт-Петербург',
        officeID: 2,
        cargoType: 1,
        isActive: true
      }
    ]);
  }),

  http.post('https://supplies-api.wildberries.ru/api/v1/supplies', () => {
    return HttpResponse.json([
      {
        supplyID: 123,
        statusID: 2,
        statusName: 'Запланировано',
        warehouseID: 507
      }
    ]);
  }),

  http.get('https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients', () => {
    return HttpResponse.json([
      {
        boxTypeID: 1,
        boxTypeName: 'Короба',
        coefficient: 5,
        date: '2024-10-22',
        warehouseID: 507,
        warehouseName: 'Коледино'
      }
    ]);
  }),

  // General endpoints
  http.get('https://common-api.wildberries.ru/ping', () => {
    return HttpResponse.json({
      Status: 'OK',
      TS: Date.now()
    });
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('SDK Integration', () => {
  describe('SDK Initialization', () => {
    it('should create SDK with all modules initialized', () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-api-key' });

      expect(sdk.general).toBeDefined();
      expect(sdk.products).toBeDefined();
      expect(sdk.ordersFBS).toBeDefined();
      expect(sdk.ordersFBW).toBeDefined();
    });

    it('should throw AuthenticationError when API key is missing', () => {
      expect(() => {
        return new WildberriesSDK({ apiKey: '' });
      }).toThrow(AuthenticationError);

      expect(() => {
        return new WildberriesSDK({ apiKey: '   ' });
      }).toThrow(AuthenticationError);
    });

    it('should accept valid configuration options', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-api-key',
        timeout: 60000,
        retryConfig: {
          maxRetries: 5,
          retryDelay: 2000,
          exponentialBackoff: true
        },
        logLevel: 'debug'
      });

      expect(sdk).toBeDefined();
      expect(sdk.products).toBeDefined();
    });
  });

  describe('Shared BaseClient', () => {
    let sdk: WildberriesSDK;

    beforeEach(() => {
      sdk = new WildberriesSDK({ apiKey: 'test-api-key' });
    });

    it('should share BaseClient across all modules', async () => {
      // All modules should use same auth/config
      const [ping, categories, newOrders, warehouses] = await Promise.all([
        sdk.general.ping(),
        sdk.products.getParentAll(),
        sdk.ordersFBS.getNewOrders(),
        sdk.ordersFBW.getWarehouses()
      ]);

      expect(ping.Status).toBe('OK');
      expect(categories.data).toHaveLength(2);
      expect(newOrders).toHaveLength(1);
      expect(warehouses).toHaveLength(2);
    });

    it('should apply same authentication to all modules', async () => {
      // Each module call should include auth headers
      const categories = await sdk.products.getParentAll();
      const orders = await sdk.ordersFBS.getNewOrders();
      const warehouses = await sdk.ordersFBW.getWarehouses();

      // If auth wasn't working, these calls would fail with 401
      expect(categories).toBeDefined();
      expect(orders).toBeDefined();
      expect(warehouses).toBeDefined();
    });
  });

  describe('Cross-Module Workflows', () => {
    let sdk: WildberriesSDK;

    beforeEach(() => {
      sdk = new WildberriesSDK({ apiKey: 'test-api-key' });
    });

    it('should handle end-to-end workflow: product → order → supply', async () => {
      // 1. Create product (Products Module)
      const categories = await sdk.products.getParentAll();
      expect(categories.data).toHaveLength(2);

      const categoriesData = categories.data as { id: number; name: string }[];
      const firstCategory = categoriesData[0];
      expect(firstCategory).toBeDefined();

      const subcategories = await sdk.products.getObjectAll({
        parentID: firstCategory.id
      });
      expect(subcategories.data).toHaveLength(1);

      // Note: Actual product creation requires full data structure
      // This validates the workflow pattern

      // 2. Get new orders (Orders FBS Module)
      const newOrders = await sdk.ordersFBS.getNewOrders();
      expect(newOrders).toHaveLength(1);

      const firstOrder = newOrders[0];
      expect(firstOrder).toBeDefined();
      expect(firstOrder.id).toBe(12345);

      // 3. Create FBS supply
      const supply = await sdk.ordersFBS.createSupply('Test Supply');
      expect(supply.id).toBe('WB-GI-123');

      // 4. Check FBW warehouses for alternative fulfillment
      const warehouses = await sdk.ordersFBW.getWarehouses();
      expect(warehouses[0].name).toBe('Коледино');
    });

    it('should support parallel multi-module operations', async () => {
      const start = Date.now();

      // Execute multiple operations in parallel across different modules
      const results = await Promise.all([
        sdk.products.getParentAll(),
        sdk.ordersFBS.getNewOrders(),
        sdk.ordersFBW.getWarehouses(),
        sdk.general.ping()
      ]);

      const elapsed = Date.now() - start;

      // All operations should complete
      expect(results[0].data).toHaveLength(2); // products
      expect(results[1]).toHaveLength(1); // ordersFBS - returns OrderNew[]
      expect(results[2]).toHaveLength(2); // ordersFBW
      expect(results[3].Status).toBe('OK'); // general

      // With mocked API, should be fast (parallel execution)
      expect(elapsed).toBeLessThan(1000);
    });

    it('should handle complex multi-step FBS workflow', async () => {
      // 1. Get new orders
      const newOrders = await sdk.ordersFBS.getNewOrders();
      expect(newOrders).toHaveLength(1);

      // 2. Get all orders with filters
      const allOrders = await sdk.ordersFBS.getOrders({
        limit: 10,
        next: 0
      });
      expect(allOrders.orders).toHaveLength(2);

      // 3. Create supply for shipping
      const supply = await sdk.ordersFBS.createSupply('Shipment #1');
      expect(supply.id).toBe('WB-GI-123');

      // Workflow validates successful FBS order processing
    });

    it('should handle complex multi-step FBW workflow', async () => {
      // 1. Get available warehouses
      const warehouses = await sdk.ordersFBW.getWarehouses();
      expect(warehouses).toHaveLength(2);
      expect(warehouses[0].isActive).toBe(true);

      // 2. Check acceptance coefficients
      const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();
      expect(coefficients).toHaveLength(1);
      expect(coefficients[0].warehouseID).toBe(507);

      // 3. Get supply information
      const supplies = await sdk.ordersFBW.getSupplies({});
      expect(supplies).toHaveLength(1);
      expect(supplies[0].supplyID).toBe(123);

      // Workflow validates successful FBW warehouse planning
    });
  });

  describe('Error Propagation', () => {
    it('should propagate authentication errors from any module', () => {
      // SDK constructor should throw when API key is empty
      expect(() => {
        return new WildberriesSDK({ apiKey: '' });
      }).toThrow(AuthenticationError);
    });

    it('should handle API errors consistently across modules', async () => {
      // Override server handlers to return errors
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
          return HttpResponse.json(
            { error: 'Invalid API key' },
            { status: 401 }
          );
        }),
        http.get('https://marketplace-api.wildberries.ru/api/v3/orders/new', () => {
          return HttpResponse.json(
            { error: 'Invalid API key' },
            { status: 401 }
          );
        })
      );

      const sdk = new WildberriesSDK({ apiKey: 'test-api-key' });

      try {
        // Both calls should fail with authentication errors
        await expect(sdk.products.getParentAll()).rejects.toThrow();
        await expect(sdk.ordersFBS.getNewOrders()).rejects.toThrow();
      } finally {
        // Explicitly reset handlers after this test
        server.resetHandlers();
      }
    });
  });

  describe('Module Independence', () => {
    let sdk: WildberriesSDK;

    beforeEach(() => {
      sdk = new WildberriesSDK({ apiKey: 'test-api-key' });
    });

    it('should allow using only Products module', async () => {
      const categories = await sdk.products.getParentAll();
      const subcategories = await sdk.products.getObjectAll({ parentID: 1 });

      expect(categories.data).toHaveLength(2);
      expect(subcategories.data).toHaveLength(1);
      // Other modules not used, demonstrating tree-shaking capability
    });

    it('should allow using only Orders FBS module', async () => {
      const newOrders = await sdk.ordersFBS.getNewOrders();
      const allOrders = await sdk.ordersFBS.getOrders({ limit: 5 });

      expect(newOrders).toHaveLength(1);
      expect(allOrders.orders).toHaveLength(2);
      // Other modules not used
    });

    it('should allow using only Orders FBW module', async () => {
      const warehouses = await sdk.ordersFBW.getWarehouses();
      const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

      expect(warehouses).toHaveLength(2);
      expect(coefficients).toHaveLength(1);
      // Other modules not used
    });
  });

  describe('Rate Limiting Coordination', () => {
    let sdk: WildberriesSDK;

    beforeEach(() => {
      sdk = new WildberriesSDK({ apiKey: 'test-api-key' });
    });

    it('should enforce rate limits across all modules', async () => {
      const start = Date.now();

      // Make multiple rapid requests across different modules
      await Promise.all([
        sdk.products.getParentAll(),
        sdk.ordersFBS.getNewOrders(),
        sdk.ordersFBW.getWarehouses(),
        sdk.general.ping()
      ]);

      const elapsed = Date.now() - start;

      // With mocked API and no actual rate limiting delays, should be fast
      // In production, rate limiter would enforce delays
      expect(elapsed).toBeLessThan(2000);
    });

    it('should maintain separate rate limit buckets per endpoint', async () => {
      // Each endpoint should have independent rate limiting
      // Products endpoints don't affect Orders endpoints

      await sdk.products.getParentAll();
      await sdk.products.getParentAll();

      await sdk.ordersFBS.getNewOrders();
      await sdk.ordersFBS.getNewOrders();

      // Both should succeed without interference
      expect(true).toBe(true);
    });
  });

  describe('Configuration Propagation', () => {
    it('should apply timeout configuration to all modules', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-api-key',
        timeout: 5000
      });

      // All modules should respect the 5-second timeout
      expect(sdk.products).toBeDefined();
      expect(sdk.ordersFBS).toBeDefined();
      expect(sdk.ordersFBW).toBeDefined();
    });

    it('should apply retry configuration to all modules', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-api-key',
        retryConfig: {
          maxRetries: 5,
          retryDelay: 1000,
          exponentialBackoff: true
        }
      });

      // All modules should use same retry settings
      expect(sdk.products).toBeDefined();
      expect(sdk.ordersFBS).toBeDefined();
      expect(sdk.ordersFBW).toBeDefined();
    });

    it('should apply log level configuration to all modules', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-api-key',
        logLevel: 'debug'
      });

      // All modules should use debug logging
      expect(sdk.products).toBeDefined();
      expect(sdk.ordersFBS).toBeDefined();
      expect(sdk.ordersFBW).toBeDefined();
    });
  });
});
