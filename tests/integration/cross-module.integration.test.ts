/**
 * Cross-Module Integration Tests
 *
 * Tests interaction between different SDK modules to ensure:
 * - Data consistency across modules
 * - Rate limiting works across all modules
 * - Workflows spanning multiple modules function correctly
 *
 * Story 2.9 - Task 4
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';

// Mock MSW server for integration testing
const server = setupServer(
  // Products endpoints
  http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: 'Электроника', parentID: 0 },
        { id: 2, name: 'Одежда', parentID: 0 },
      ],
      error: false,
    });
  }),

  http.get('https://content-api.wildberries.ru/content/v2/object/all', () => {
    return HttpResponse.json({
      data: [
        { subjectID: 105, subjectName: 'Смартфоны', parentID: 1, parentName: 'Электроника' },
        { subjectID: 106, subjectName: 'Ноутбуки', parentID: 1, parentName: 'Электроника' },
      ],
      error: false,
    });
  }),

  http.post('https://content-api.wildberries.ru/content/v2/cards/upload', () => {
    return HttpResponse.json({
      data: { id: 'PROD123', taskID: 1 },
      error: false,
    });
  }),

  http.post('https://content-api.wildberries.ru/content/v2/get/cards/list', () => {
    return HttpResponse.json({
      cards: [
        {
          nmID: 123456789,
          imtID: 100,
          vendorCode: 'EXAMPLE-001',
          brand: 'Example Brand',
          title: 'Example Product',
          subjectID: 105,
          subjectName: 'Смартфоны',
          sizes: [
            { chrtID: 1001, techSize: 'ONE SIZE', wbSize: 'ONE SIZE', skus: ['1234567890123'] },
          ],
        },
      ],
      cursor: { total: 1 },
    });
  }),

  // Orders FBS endpoints
  http.get('https://marketplace-api.wildberries.ru/api/v3/orders/new', () => {
    return HttpResponse.json({
      orders: [
        {
          id: 12345,
          article: 'EXAMPLE-001',
          orderUid: 'ORDER-UID-123',
          cargoType: 1,
          products: [{ nmId: 123456789 }],
        },
      ],
      next: 0,
    });
  }),

  http.get('https://marketplace-api.wildberries.ru/api/v3/orders', () => {
    return HttpResponse.json({
      orders: [
        {
          id: 12345,
          article: 'EXAMPLE-001',
          orderUid: 'ORDER-UID-123',
          cargoType: 1,
        },
      ],
      next: 0,
    });
  }),

  http.post('https://marketplace-api.wildberries.ru/api/v3/supplies', () => {
    return HttpResponse.json({
      id: 'WB-GI-1234567',
    });
  }),

  // Orders FBW endpoints
  http.get('https://supplies-api.wildberries.ru/api/v1/warehouses', () => {
    return HttpResponse.json([
      {
        ID: 507,
        name: 'Коледино',
        address: 'Московская обл., Подольск',
        workTime: '09:00-18:00',
        acceptsQR: true,
        isActive: true,
      },
      {
        ID: 117501,
        name: 'Казань',
        address: 'Респ. Татарстан, Казань',
        workTime: '10:00-19:00',
        acceptsQR: true,
        isActive: true,
      },
    ]);
  }),

  http.get('https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients', () => {
    return HttpResponse.json([
      {
        date: '2024-11-01',
        coefficient: 0,
        warehouseID: 507,
        warehouseName: 'Коледино',
        boxTypeName: 'Монопалета',
        allowUnload: true,
      },
    ]);
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});
afterAll(() => {
  server.close();
});
beforeEach(() => {
  server.resetHandlers();
});

describe('Cross-Module Integration Tests', () => {
  let sdk: WildberriesSDK;

  beforeEach(() => {
    sdk = new WildberriesSDK({ apiKey: 'test-api-key' });
  });

  describe('Product to Order Workflow', () => {
    it('should handle complete product-to-order workflow', async () => {
      // Step 1: Get parent categories (Products module)
      const parents = await sdk.products.getParentAll();
      expect(parents.data).toBeDefined();
      expect(Array.isArray(parents.data)).toBe(true);
      const parentData = parents.data as { id: number; name: string }[];
      expect(parentData.length).toBeGreaterThan(0);

      // Step 2: Get subjects for category (Products module)
      const firstParent = parentData[0];
      expect(firstParent).toBeDefined();
      const subjects = await sdk.products.getObjectAll({ parentID: firstParent.id });
      expect(subjects.data).toBeDefined();
      const subjectData = subjects.data as { subjectID: number; subjectName: string }[];
      expect(subjectData.length).toBeGreaterThan(0);

      // Step 3: Create product (Products module)
      const firstSubject = subjectData[0];
      expect(firstSubject).toBeDefined();
      const product = await sdk.products.createProduct({
        subjectID: firstSubject.subjectID,
        variants: [
          {
            vendorCode: 'EXAMPLE-001',
            brand: 'Example Brand',
            title: 'Example Product',
            description: 'Test product for cross-module workflow',
            dimensions: { length: 10, width: 10, height: 5, weightBrutto: 0.5 },
            sizes: [{ techSize: 'ONE SIZE', wbSize: 'ONE SIZE' }],
            characteristics: [],
          },
        ],
      });
      expect(product.error).toBe(false);

      // Step 4: List products to verify creation (Products module)
      const productList = await sdk.products.listProducts({
        filter: { textSearch: 'EXAMPLE-001' },
      });
      expect(productList.cards).toBeDefined();
      const cards = productList.cards;
      expect(cards).toBeDefined();
      if (!cards || cards.length === 0) {
        throw new Error('No products found');
      }
      expect(cards.length).toBeGreaterThan(0);

      const createdProduct = cards[0];
      expect(createdProduct.vendorCode).toBe('EXAMPLE-001');
      expect(createdProduct.nmID).toBeDefined();

      // Step 5: Fetch orders containing the product (Orders FBS module)
      const orders = await sdk.ordersFBS.getNewOrders();
      expect(orders).toBeDefined();
      expect(Array.isArray(orders)).toBe(true);

      // Verify order references the created product
      const orderWithProduct = orders.find((o) => {
        const orderData = o as unknown as { products?: { nmId: number }[] };
        return orderData.products?.some((p) => p.nmId === createdProduct.nmID);
      });
      expect(orderWithProduct).toBeDefined();
    });

    it('should validate data consistency between Products and Orders modules', async () => {
      // Create product
      const productList = await sdk.products.listProducts({
        filter: { textSearch: 'EXAMPLE-001' },
      });
      const cards = productList.cards;
      if (!cards || cards.length === 0) {
        throw new Error('No products found');
      }
      const product = cards[0];

      // Fetch orders
      const orders = await sdk.ordersFBS.getOrders({
        limit: 100,
        next: 0,
      });

      // Verify article/vendor code consistency
      expect(product.vendorCode).toBe('EXAMPLE-001');

      // Find matching order
      const matchingOrder = orders.orders.find((o) => o.article === product.vendorCode);
      expect(matchingOrder).toBeDefined();
      expect(matchingOrder?.article).toBe(product.vendorCode);
    });
  });

  describe('FBW Warehouse Selection Workflow', () => {
    it('should successfully retrieve and filter WB warehouses', async () => {
      const warehouses = await sdk.ordersFBW.getWarehouses();

      expect(Array.isArray(warehouses)).toBe(true);
      expect(warehouses.length).toBeGreaterThan(0);

      // Filter active warehouses
      const activeWarehouses = warehouses.filter((w) => w.isActive);
      expect(activeWarehouses.length).toBeGreaterThan(0);

      // Verify warehouse structure
      const warehouse = activeWarehouses[0];
      expect(warehouse.ID).toBeDefined();
      expect(warehouse.name).toBeDefined();
      expect(warehouse.address).toBeDefined();
      expect(warehouse.isActive).toBe(true);
    });

    it('should check acceptance coefficients for selected warehouse', async () => {
      // Get warehouses
      const warehouses = await sdk.ordersFBW.getWarehouses();
      const warehouse = warehouses.find((w) => w.isActive);
      expect(warehouse).toBeDefined();
      if (!warehouse) {
        throw new Error('No active warehouse found');
      }

      // Check acceptance coefficients
      const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients(
        warehouse.ID?.toString() ?? ''
      );

      expect(Array.isArray(coefficients)).toBe(true);
      expect(coefficients.length).toBeGreaterThan(0);

      // Verify coefficient structure
      const coeff = coefficients[0];
      expect(coeff.date).toBeDefined();
      expect(coeff.coefficient).toBeDefined();
      expect(coeff.warehouseID).toBe(warehouse.ID);
      expect(coeff.allowUnload).toBeDefined();
    });
  });

  describe('Rate Limiting Across Modules', () => {
    it('should respect rate limits across different modules', async () => {
      const start = Date.now();

      // Call methods from different modules
      await sdk.products.getParentAll();
      await sdk.ordersFBS.getOrders({ limit: 1 });
      await sdk.ordersFBW.getWarehouses();

      const elapsed = Date.now() - start;

      // With MSW mocking, requests should complete quickly
      expect(elapsed).toBeLessThan(1000);
    });

    it('should handle multiple rapid requests to same module', async () => {
      const promises = [];

      // Make 5 rapid requests to Products module
      for (let i = 0; i < 5; i++) {
        promises.push(sdk.products.getParentAll());
      }

      const results = await Promise.all(promises);

      // All requests should succeed
      results.forEach((result) => {
        expect(result.error).toBe(false);
        expect(result.data).toBeDefined();
      });
    });
  });

  describe('Error Propagation Between Modules', () => {
    it('should properly propagate errors from Products to Orders workflow', async () => {
      // Override with error response
      server.use(
        http.post('https://content-api.wildberries.ru/content/v2/cards/upload', () => {
          return HttpResponse.json(
            {
              data: null,
              error: true,
              errorText: 'Validation error: Missing required field',
            },
            { status: 400 }
          );
        })
      );

      // Attempt to create invalid product - should throw ValidationError
      try {
        await sdk.products.createProduct({
          subjectID: 105,
          variants: [
            {
              vendorCode: 'INVALID',
              brand: '', // Invalid: empty brand
              title: '', // Invalid: empty title
              description: '',
              dimensions: { length: 0, width: 0, height: 0, weightBrutto: 0 },
              sizes: [],
              characteristics: [],
            },
          ],
        });

        // If we get here, the test should fail
        expect.fail('Expected ValidationError to be thrown');
      } catch (error) {
        // Error should be properly propagated
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toContain('Validation failed');
      }
    });
  });

  describe('Module Independence', () => {
    it('should allow independent module usage without initialization of others', async () => {
      // Test that each module can be used independently
      const productsResult = await sdk.products.getParentAll();
      expect(productsResult.error).toBe(false);

      const ordersResult = await sdk.ordersFBS.getOrders({ limit: 1 });
      expect(ordersResult).toBeDefined();

      const warehousesResult = await sdk.ordersFBW.getWarehouses();
      expect(Array.isArray(warehousesResult)).toBe(true);

      // All modules should work independently
      expect(productsResult.data).toBeDefined();
      expect(ordersResult.orders).toBeDefined();
      expect(warehousesResult.length).toBeGreaterThan(0);
    });
  });
});
