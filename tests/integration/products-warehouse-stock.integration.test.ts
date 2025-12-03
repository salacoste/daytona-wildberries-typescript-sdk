/**
 * Integration tests for Products Warehouse and Stock Management (Story 2.4)
 *
 * Tests complete warehouse setup and stock management workflows:
 * - Get WB offices → Create warehouse → Manage stock → Delete stock
 * Uses MSW to mock HTTP requests at the network level
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src/index';
import { ValidationError } from '../../src/errors/validation-error';

// Mock data
const mockOffices = [
  { id: 1, name: 'Коледино', address: 'Московская область, Коледино' },
  { id: 2, name: 'Подольск', address: 'Московская область, Подольск' },
  { id: 3, name: 'Электросталь', address: 'Московская область, Электросталь' },
];

const mockWarehouses = [
  { id: 100, name: 'Склад Москва Центр', officeId: 1, isDeleting: false },
  { id: 101, name: 'Склад Коледино', officeId: 2, isDeleting: false },
];

// Track created warehouses for state management
let createdWarehouses: { id: number; name: string; officeId: number; isDeleting: boolean }[] = [];
let warehouseIdCounter = 200;
const stockState = new Map<number, { sku: string; amount: number }[]>();

// MSW server setup with handlers for all warehouse/stock endpoints
const server = setupServer(
  // Get WB offices
  http.get('https://marketplace-api.wildberries.ru/api/v3/offices', () => {
    return HttpResponse.json(mockOffices);
  }),

  // Get seller warehouses
  http.get('https://marketplace-api.wildberries.ru/api/v3/warehouses', () => {
    return HttpResponse.json([...mockWarehouses, ...createdWarehouses]);
  }),

  // Create warehouse
  http.post('https://marketplace-api.wildberries.ru/api/v3/warehouses', async ({ request }) => {
    const body = (await request.json()) as { name: string; officeId: number };

    // Check if office already bound
    const allWarehouses = [...mockWarehouses, ...createdWarehouses];
    const officeAlreadyBound = allWarehouses.some((w) => w.officeId === body.officeId);

    if (officeAlreadyBound && body.officeId !== 999) {
      // Allow 999 for testing
      return new HttpResponse(
        JSON.stringify({
          error: true,
          errorText: 'Office already bound to another warehouse',
        }),
        { status: 409 }
      );
    }

    const newWarehouse = {
      id: warehouseIdCounter++,
      name: body.name,
      officeId: body.officeId,
      isDeleting: false,
    };
    createdWarehouses.push(newWarehouse);

    return HttpResponse.json({ id: newWarehouse.id }, { status: 201 });
  }),

  // Update warehouse
  http.put(
    'https://marketplace-api.wildberries.ru/api/v3/warehouses/:warehouseId',
    async ({ params, request }) => {
      const warehouseId = parseInt(params.warehouseId as string);
      const body = (await request.json()) as { name: string; officeId: number };

      // Find warehouse
      const warehouse = [...mockWarehouses, ...createdWarehouses].find((w) => w.id === warehouseId);

      if (!warehouse) {
        return new HttpResponse(null, { status: 404 });
      }

      // Check if new office already bound to another warehouse
      const allWarehouses = [...mockWarehouses, ...createdWarehouses];
      const officeAlreadyBound = allWarehouses.some(
        (w) => w.officeId === body.officeId && w.id !== warehouseId
      );

      if (officeAlreadyBound) {
        return new HttpResponse(
          JSON.stringify({
            error: true,
            errorText: 'Office already bound to another warehouse',
          }),
          { status: 409 }
        );
      }

      // Update warehouse in createdWarehouses array
      const index = createdWarehouses.findIndex((w) => w.id === warehouseId);
      if (index !== -1) {
        createdWarehouses[index] = { ...warehouse, name: body.name, officeId: body.officeId };
      }

      return new HttpResponse(null, { status: 204 });
    }
  ),

  // Delete warehouse
  http.delete(
    'https://marketplace-api.wildberries.ru/api/v3/warehouses/:warehouseId',
    ({ params }) => {
      const warehouseId = parseInt(params.warehouseId as string);

      // Find warehouse
      const warehouseExists = [...mockWarehouses, ...createdWarehouses].some(
        (w) => w.id === warehouseId
      );

      if (!warehouseExists) {
        return new HttpResponse(null, { status: 404 });
      }

      // Remove from createdWarehouses
      createdWarehouses = createdWarehouses.filter((w) => w.id !== warehouseId);

      // Remove stock for this warehouse
      stockState.delete(warehouseId);

      return new HttpResponse(null, { status: 204 });
    }
  ),

  // Get stock
  http.post(
    'https://marketplace-api.wildberries.ru/api/v3/stocks/:warehouseId',
    async ({ params, request }) => {
      const warehouseId = parseInt(params.warehouseId as string);
      const body = (await request.json()) as { skus: string[] };

      // Get stock for this warehouse
      const warehouseStock = stockState.get(warehouseId) ?? [];

      // Filter by requested SKUs
      const stocks = warehouseStock.filter((s) => body.skus.includes(s.sku));

      return HttpResponse.json({ stocks });
    }
  ),

  // Update stock
  http.put(
    'https://marketplace-api.wildberries.ru/api/v3/stocks/:warehouseId',
    async ({ params, request }) => {
      const warehouseId = parseInt(params.warehouseId as string);
      const body = (await request.json()) as { stocks: { sku: string; amount: number }[] };

      // Simulate cargo type warehouse restriction error for testing
      if (body.stocks.some((s) => s.sku === 'CARGO_ERROR')) {
        return new HttpResponse(
          JSON.stringify({
            error: true,
            errorText: 'The selected warehouse is not suitable for goods with the type "LCL"',
          }),
          { status: 409 }
        );
      }

      // Get current stock for this warehouse
      const currentStock = stockState.get(warehouseId) ?? [];

      // Update stock
      body.stocks.forEach((update) => {
        const existingIndex = currentStock.findIndex((s) => s.sku === update.sku);
        if (existingIndex !== -1) {
          currentStock[existingIndex].amount = update.amount;
        } else {
          currentStock.push({ sku: update.sku, amount: update.amount });
        }
      });

      stockState.set(warehouseId, currentStock);

      return new HttpResponse(null, { status: 204 });
    }
  ),

  // Delete stock
  http.delete(
    'https://marketplace-api.wildberries.ru/api/v3/stocks/:warehouseId',
    async ({ params, request }) => {
      const warehouseId = parseInt(params.warehouseId as string);
      const body = (await request.json()) as { skus: string[] };

      // Get current stock for this warehouse
      const currentStock = stockState.get(warehouseId) ?? [];

      // Check if SKUs exist
      const nonExistentSkus = body.skus.filter((sku) => !currentStock.some((s) => s.sku === sku));
      if (nonExistentSkus.length > 0) {
        return new HttpResponse(
          JSON.stringify({
            error: true,
            errorText: `SKUs not found: ${nonExistentSkus.join(', ')}`,
          }),
          { status: 404 }
        );
      }

      // Simulate warehouse processing error for testing
      if (body.skus.includes('PROCESSING_ERROR')) {
        return new HttpResponse(
          JSON.stringify({
            error: true,
            errorText: 'Warehouse processing in progress',
          }),
          { status: 409 }
        );
      }

      // Delete stock
      const updatedStock = currentStock.filter((s) => !body.skus.includes(s.sku));
      stockState.set(warehouseId, updatedStock);

      return new HttpResponse(null, { status: 204 });
    }
  )
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  createdWarehouses = [];
  warehouseIdCounter = 200;
  stockState.clear();
});

afterAll(() => {
  server.close();
});

describe('Products Warehouse and Stock Management Integration Tests', () => {
  const sdk = new WildberriesSDK({ apiKey: 'test-api-key' });

  describe('Complete Warehouse Setup Workflow', () => {
    it('should complete warehouse setup workflow', async () => {
      // 1. Get available WB offices
      const offices = await sdk.products.getWBOffices();
      expect(offices).toHaveLength(3);
      expect(offices[0]).toHaveProperty('id');
      expect(offices[0]).toHaveProperty('name');
      expect(offices[0]).toHaveProperty('address');

      // 2. Create seller warehouse bound to WB office
      const newWarehouse = await sdk.products.createWarehouse(
        'Склад Коледино',
        999 // Use non-conflicting office ID
      );
      expect(newWarehouse.id).toBeDefined();
      expect(newWarehouse.id).toBeGreaterThan(0);

      // 3. Verify warehouse in list
      const warehouses = await sdk.products.getWarehouses();
      expect(warehouses.length).toBeGreaterThan(0);

      const created = warehouses.find((w) => w.id === newWarehouse.id);
      expect(created).toBeDefined();
      expect(created?.name).toBe('Склад Коледино');
      expect(created?.officeId).toBe(999);
      expect(created?.isDeleting).toBe(false);
    });

    it('should update warehouse name and office binding', async () => {
      // Create warehouse first
      const warehouse = await sdk.products.createWarehouse('Original Name', 999);

      // Update warehouse
      await sdk.products.updateWarehouse(warehouse.id, 'Updated Name', 999);

      // Verify update
      const warehouses = await sdk.products.getWarehouses();
      const updated = warehouses.find((w) => w.id === warehouse.id);
      expect(updated?.name).toBe('Updated Name');
    });

    it('should delete warehouse and unbind office', async () => {
      // Create warehouse first
      const warehouse = await sdk.products.createWarehouse('Temp Warehouse', 999);

      // Delete warehouse
      await sdk.products.deleteWarehouse(warehouse.id);

      // Verify deletion
      const warehouses = await sdk.products.getWarehouses();
      const deleted = warehouses.find((w) => w.id === warehouse.id);
      expect(deleted).toBeUndefined();
    });
  });

  describe('Stock Management Workflow', () => {
    it('should manage stock levels', async () => {
      const warehouseId = 123;

      // 1. Update stock for multiple products
      await sdk.products.updateStockLevels(warehouseId, [
        { sku: 'SKU001', amount: 100 },
        { sku: 'SKU002', amount: 50 },
        { sku: 'SKU003', amount: 200 },
      ]);

      // 2. Get stock levels
      const stocks = await sdk.products.getStock(warehouseId, ['SKU001', 'SKU002', 'SKU003']);
      expect(stocks).toHaveLength(3);
      expect(stocks.find((s) => s.sku === 'SKU001')?.amount).toBe(100);
      expect(stocks.find((s) => s.sku === 'SKU002')?.amount).toBe(50);
      expect(stocks.find((s) => s.sku === 'SKU003')?.amount).toBe(200);

      // 3. Delete specific stock
      await sdk.products.deleteStockRecords(warehouseId, ['SKU003']);

      // 4. Verify deletion
      const remainingStocks = await sdk.products.getStock(warehouseId, [
        'SKU001',
        'SKU002',
        'SKU003',
      ]);
      expect(remainingStocks).toHaveLength(2);
      expect(remainingStocks.some((s) => s.sku === 'SKU003')).toBe(false);
    });

    it('should update existing stock quantities', async () => {
      const warehouseId = 456;

      // Initial stock
      await sdk.products.updateStockLevels(warehouseId, [{ sku: 'TEST-SKU', amount: 100 }]);

      // Update to new quantity
      await sdk.products.updateStockLevels(warehouseId, [{ sku: 'TEST-SKU', amount: 250 }]);

      // Verify update
      const stocks = await sdk.products.getStock(warehouseId, ['TEST-SKU']);
      expect(stocks[0].amount).toBe(250);
    });

    it('should handle bulk stock operations (up to 1000 SKUs)', async () => {
      const warehouseId = 789;

      // Create 100 stock updates (testing batch capability)
      const bulkUpdates = Array.from({ length: 100 }, (_, i) => ({
        sku: `BULK-SKU-${i + 1}`,
        amount: (i + 1) * 10,
      }));

      await sdk.products.updateStockLevels(warehouseId, bulkUpdates);

      // Verify all stocks created
      const skus = bulkUpdates.map((u) => u.sku);
      const stocks = await sdk.products.getStock(warehouseId, skus);
      expect(stocks).toHaveLength(100);
      expect(stocks.find((s) => s.sku === 'BULK-SKU-50')?.amount).toBe(500);
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle 409 error when WB office already bound', async () => {
      // Try to create warehouse with office ID 1 (already bound in mockWarehouses)
      await expect(sdk.products.createWarehouse('New Warehouse', 1)).rejects.toThrow();
    });

    it('should handle 404 error for non-existent warehouse', async () => {
      // Try to delete non-existent warehouse
      await expect(sdk.products.deleteWarehouse(99999)).rejects.toThrow();
    });

    it('should handle 409 error for warehouse processing conflict', async () => {
      const warehouseId = 123;

      // First add some stock with the special SKU
      await sdk.products.updateStockLevels(warehouseId, [{ sku: 'PROCESSING_ERROR', amount: 100 }]);

      // Try to delete stock with special SKU that triggers 409
      await expect(
        sdk.products.deleteStockRecords(warehouseId, ['PROCESSING_ERROR'])
      ).rejects.toThrow();
    });

    it('should handle stock amount validation (> 100,000)', async () => {
      const warehouseId = 123;

      // Try to set stock amount over limit
      await expect(
        sdk.products.updateStockLevels(warehouseId, [{ sku: 'TEST-SKU', amount: 150000 }])
      ).rejects.toThrow(ValidationError);
    });

    it('should handle SKU array size validation (> 1000)', async () => {
      const warehouseId = 123;

      // Try to get stock for > 1000 SKUs
      const tooManySkus = Array.from({ length: 1001 }, (_, i) => `SKU-${i}`);

      await expect(sdk.products.getStock(warehouseId, tooManySkus)).rejects.toThrow(
        ValidationError
      );
    });

    it('should handle 409 error for cargo type warehouse restrictions', async () => {
      const warehouseId = 123;

      // Try to update stock with special SKU that triggers cargo type error
      await expect(
        sdk.products.updateStockLevels(warehouseId, [{ sku: 'CARGO_ERROR', amount: 100 }])
      ).rejects.toThrow();
    });

    it('should handle 404 error when deleting non-existent stock', async () => {
      const warehouseId = 123;

      // Try to delete stock that doesn't exist
      await expect(
        sdk.products.deleteStockRecords(warehouseId, ['NON_EXISTENT_SKU'])
      ).rejects.toThrow();
    });
  });

  describe('Warehouse Validation Tests', () => {
    it('should validate warehouse name length (1-200 chars)', async () => {
      // Empty name
      await expect(sdk.products.createWarehouse('', 999)).rejects.toThrow(ValidationError);

      // Name too long (> 200 chars)
      const longName = 'A'.repeat(201);
      await expect(sdk.products.createWarehouse(longName, 999)).rejects.toThrow(ValidationError);
    });

    it('should validate office ID is positive integer', async () => {
      // Negative office ID
      await expect(sdk.products.createWarehouse('Test Warehouse', -1)).rejects.toThrow(
        ValidationError
      );

      // Zero office ID
      await expect(sdk.products.createWarehouse('Test Warehouse', 0)).rejects.toThrow(
        ValidationError
      );
    });
  });

  describe('Stock Validation Tests', () => {
    it('should validate stock amount range (0-100,000)', async () => {
      const warehouseId = 123;

      // Negative amount
      await expect(
        sdk.products.updateStockLevels(warehouseId, [{ sku: 'TEST-SKU', amount: -10 }])
      ).rejects.toThrow(ValidationError);

      // Amount > 100,000
      await expect(
        sdk.products.updateStockLevels(warehouseId, [{ sku: 'TEST-SKU', amount: 100001 }])
      ).rejects.toThrow(ValidationError);

      // Valid amount = 0 (should succeed)
      await expect(
        sdk.products.updateStockLevels(warehouseId, [{ sku: 'TEST-SKU', amount: 0 }])
      ).resolves.not.toThrow();

      // Valid amount = 100,000 (should succeed)
      await expect(
        sdk.products.updateStockLevels(warehouseId, [{ sku: 'TEST-SKU', amount: 100000 }])
      ).resolves.not.toThrow();
    });

    it('should validate SKU array size (1-1000)', async () => {
      const warehouseId = 123;

      // Empty array
      await expect(sdk.products.getStock(warehouseId, [])).rejects.toThrow(ValidationError);

      // Array > 1000
      const tooManySkus = Array.from({ length: 1001 }, (_, i) => `SKU-${i}`);
      await expect(sdk.products.getStock(warehouseId, tooManySkus)).rejects.toThrow(
        ValidationError
      );

      // Valid array with 1 SKU (should succeed)
      await expect(sdk.products.getStock(warehouseId, ['SKU1'])).resolves.not.toThrow();

      // Valid array with 1000 SKUs (should succeed)
      const maxSkus = Array.from({ length: 1000 }, (_, i) => `SKU-${i}`);
      await expect(sdk.products.getStock(warehouseId, maxSkus)).resolves.not.toThrow();
    });
  });

  describe('Real-world Scenarios', () => {
    it('should handle complete inventory management workflow', async () => {
      // Scenario: Setting up new warehouse and managing initial stock

      // 1. Get WB offices
      const offices = await sdk.products.getWBOffices();
      expect(offices.length).toBeGreaterThan(0);

      // 2. Create warehouse
      const warehouse = await sdk.products.createWarehouse('Склад Москва Обновлённый', 999);

      // 3. Add initial stock for multiple products
      await sdk.products.updateStockLevels(warehouse.id, [
        { sku: 'PRODUCT-001', amount: 500 },
        { sku: 'PRODUCT-002', amount: 300 },
        { sku: 'PRODUCT-003', amount: 150 },
      ]);

      // 4. Check stock levels
      const stocks = await sdk.products.getStock(warehouse.id, [
        'PRODUCT-001',
        'PRODUCT-002',
        'PRODUCT-003',
      ]);
      expect(stocks).toHaveLength(3);

      // 5. Adjust stock (restock)
      await sdk.products.updateStockLevels(warehouse.id, [
        { sku: 'PRODUCT-001', amount: 1000 }, // Increased
        { sku: 'PRODUCT-002', amount: 250 }, // Decreased
      ]);

      // 6. Verify adjustments
      const updatedStocks = await sdk.products.getStock(warehouse.id, [
        'PRODUCT-001',
        'PRODUCT-002',
      ]);
      expect(updatedStocks.find((s) => s.sku === 'PRODUCT-001')?.amount).toBe(1000);
      expect(updatedStocks.find((s) => s.sku === 'PRODUCT-002')?.amount).toBe(250);

      // 7. Discontinue a product (delete stock)
      await sdk.products.deleteStockRecords(warehouse.id, ['PRODUCT-003']);

      // 8. Verify only 2 products remain
      const finalStocks = await sdk.products.getStock(warehouse.id, [
        'PRODUCT-001',
        'PRODUCT-002',
        'PRODUCT-003',
      ]);
      expect(finalStocks).toHaveLength(2);
    });
  });
});
