/**
 * Integration tests for Products CRUD operations (Story 2.2)
 *
 * Tests the complete product lifecycle: create → list → update → delete
 * Uses MSW to mock HTTP requests at the network level
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src/index';

const mockProductCard = {
  nmID: 12345,
  imtID: 67890,
  vendorCode: 'TEST-001',
  brand: 'Test Brand',
  title: 'Test Product',
  description: 'Test description',
  subjectID: 105,
  sizes: [{ chrtID: 1, techSize: 'XL', wbSize: '52', skus: ['1234567890123'] }],
  characteristics: [{ id: 1, name: 'Color', value: 'Red' }],
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T00:00:00Z'
};

// MSW server setup with handlers for all CRUD endpoints
const server = setupServer(
  // Create product
  http.post('https://content-api.wildberries.ru/content/v2/cards/upload', () => {
    return HttpResponse.json({
      error: false,
      errorText: '',
      data: {}
    });
  }),

  // List products
  http.post('https://content-api.wildberries.ru/content/v2/get/cards/list', async ({ request }) => {
    const body = await request.json() as { settings?: { filter?: { textSearch?: string } } };
    const textSearch = body.settings?.filter?.textSearch;

    // Return matching product if searching by nmID
    if (textSearch === '12345') {
      return HttpResponse.json({
        cards: [mockProductCard],
        cursor: { total: 1 }
      });
    }

    // Return all products
    return HttpResponse.json({
      cards: [mockProductCard],
      cursor: { total: 1, updatedAt: '2025-01-01T00:00:00Z', nmID: 12345 }
    });
  }),

  // Update product
  http.post('https://content-api.wildberries.ru/content/v2/cards/update', () => {
    return HttpResponse.json({
      error: false,
      errorText: '',
      data: {}
    });
  }),

  // Delete product
  http.post('https://content-api.wildberries.ru/content/v2/cards/delete/trash', () => {
    return HttpResponse.json({
      error: false,
      errorText: '',
      data: {}
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

describe('Products CRUD Integration Tests', () => {
  const sdk = new WildberriesSDK({ apiKey: 'test-api-key' });

  describe('Product Lifecycle', () => {
    it('should complete full product lifecycle: create → list → update → delete', async () => {
      // 1. Create product
      const createData = {
        subjectID: 105,
        variants: [{
          vendorCode: 'TEST-001',
          brand: 'Test Brand',
          title: 'Test Product',
          description: 'Test description for integration test',
          dimensions: {
            length: 10,
            width: 5,
            height: 2,
            weightBrutto: 0.5
          },
          sizes: [{
            techSize: 'XL',
            wbSize: '52',
            skus: ['1234567890123']
          }],
          characteristics: [
            { id: 1, value: ['Red'] }
          ]
        }]
      };

      const createResult = await sdk.products.createProduct(createData);
      expect(createResult.error).toBe(false);

      // 2. List products to verify creation
      const listResult = await sdk.products.listProducts();
      expect(listResult.cards).toBeDefined();
      expect(listResult.cards).toHaveLength(1);
      expect(listResult.cards?.[0].vendorCode).toBe('TEST-001');

      // 3. Get single product
      const product = await sdk.products.getProductCard(12345);
      expect(product).not.toBeNull();
      expect(product?.nmID).toBe(12345);
      expect(product?.vendorCode).toBe('TEST-001');

      // 4. Update product (with all fields)
      if (product?.nmID && product.vendorCode) {
        const updateData = [{
          nmID: product.nmID,
          vendorCode: product.vendorCode,
          sizes: product.sizes?.map(s => ({
            chrtID: s.chrtID,
            techSize: s.techSize,
            wbSize: s.wbSize,
            skus: s.skus
          })) ?? [],
          brand: product.brand,
          title: 'Updated Test Product',  // Changed
          description: product.description,
          characteristics: product.characteristics?.map(c => ({
            id: c.id ?? 0,
            value: c.value
          }))
        }];

        const updateResult = await sdk.products.updateProduct(updateData);
        expect(updateResult.error).toBe(false);
      }

      // 5. Delete product
      const deleteResult = await sdk.products.deleteProduct([12345]);
      expect(deleteResult.error).toBe(false);
    });

    it('should handle cursor-based pagination', async () => {
      // First page
      const page1 = await sdk.products.listProducts({
        cursor: { limit: 100 }
      });

      expect(page1.cards).toBeDefined();
      expect(page1.cursor).toBeDefined();
      expect(page1.cursor?.total).toBeGreaterThan(0);

      // Simulate second page (if cursor present)
      if (page1.cursor?.updatedAt && page1.cursor.nmID) {
        const page2 = await sdk.products.listProducts({
          cursor: {
            limit: 100,
            updatedAt: page1.cursor.updatedAt,
            nmID: page1.cursor.nmID
          }
        });

        expect(page2.cards).toBeDefined();
      }
    });

    it('should filter products by brand', async () => {
      const result = await sdk.products.listProducts({
        filter: { brands: ['Test Brand'] }
      });

      expect(result.cards).toBeDefined();
      result.cards?.forEach(card => {
        expect(card.brand).toBe('Test Brand');
      });
    });

    it('should search products by text', async () => {
      const result = await sdk.products.listProducts({
        filter: { textSearch: 'TEST-001' }
      });

      expect(result.cards).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle 401 authentication errors', async () => {
      server.use(
        http.post('https://content-api.wildberries.ru/content/v2/cards/upload', () => {
          return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
        })
      );

      await expect(sdk.products.createProduct({
        subjectID: 105,
        variants: [{ vendorCode: 'TEST' }]
      })).rejects.toThrow();
    });

    it('should handle 429 rate limit errors', async () => {
      server.use(
        http.post('https://content-api.wildberries.ru/content/v2/cards/upload', () => {
          return HttpResponse.json({ error: 'Rate limit exceeded' }, {
            status: 429,
            headers: { 'Retry-After': '60' }
          });
        })
      );

      await expect(sdk.products.createProduct({
        subjectID: 105,
        variants: [{ vendorCode: 'TEST' }]
      })).rejects.toThrow();
    });

    it('should handle 400 validation errors', async () => {
      server.use(
        http.post('https://content-api.wildberries.ru/content/v2/cards/upload', () => {
          return HttpResponse.json({
            error: true,
            errorText: 'Missing required fields',
            additionalErrors: { vendorCode: 'Required' }
          }, { status: 400 });
        })
      );

      await expect(sdk.products.createProduct({
        subjectID: 105,
        variants: []
      })).rejects.toThrow();
    });
  });

  describe('Batch Operations', () => {
    it('should handle batch product updates', async () => {
      const updates = [
        { nmID: 12345, vendorCode: 'V1', sizes: [], title: 'Product 1' },
        { nmID: 12346, vendorCode: 'V2', sizes: [], title: 'Product 2' },
        { nmID: 12347, vendorCode: 'V3', sizes: [], title: 'Product 3' }
      ];

      const result = await sdk.products.updateProduct(updates);
      expect(result.error).toBe(false);
    });

    it('should handle batch product deletion', async () => {
      const nmIDs = [12345, 12346, 12347];

      const result = await sdk.products.deleteProduct(nmIDs);
      expect(result.error).toBe(false);
    });
  });
});
