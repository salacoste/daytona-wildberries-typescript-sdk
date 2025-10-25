/**
 * Integration tests for Orders FBS Module
 *
 * Tests the OrdersFBS module with MSW (Mock Service Worker) to simulate
 * real HTTP interactions with the Wildberries API.
 *
 * Tests cover:
 * - New order retrieval
 * - Filtered order retrieval with date ranges
 * - Pagination workflows
 * - Order status checks
 * - Error scenarios (validation, rate limits, invalid requests)
 *
 * @see {@link ../../../src/modules/orders-fbs/index OrdersFBSModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';
import { ValidationError } from '../../src/errors/validation-error';

// MSW server setup
const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('Orders FBS Integration Tests', () => {
  const sdk = new WildberriesSDK({ apiKey: 'test-api-key-integration' });

  describe('New Orders Retrieval', () => {
    it('should retrieve new FBS orders', async () => {
      // Mock response
      server.use(
        http.get('https://marketplace-api.wildberries.ru/api/v3/orders/new', () => {
          return HttpResponse.json({
            orders: [
              {
                id: 12345,
                article: 'TEST-ARTICLE-1',
                skus: ['1234567890123'],
                rid: 'test-rid-1',
                createdAt: '2024-10-22T10:00:00Z',
                orderUid: 'test-uid-1',
                nmId: 98765,
                chrtId: 54321,
                price: 150000,
                convertedPrice: 150000,
                currencyCode: 643,
                convertedCurrencyCode: 643,
                deliveryType: 'fbs',
                warehouseId: 100,
                officeId: 200,
                cargoType: 1,
                isZeroOrder: false,
              },
            ],
          });
        })
      );

      // Execute
      const newOrders = await sdk.ordersFBS.getNewOrders();

      // Verify
      expect(newOrders).toBeInstanceOf(Array);
      expect(newOrders.length).toBeGreaterThan(0);
      expect(newOrders[0]).toHaveProperty('id');
      expect(newOrders[0]).toHaveProperty('article');
      expect(newOrders[0]).toHaveProperty('orderUid');
      expect(newOrders[0].deliveryType).toBe('fbs');
    });
  });

  describe('Filtered Orders with Pagination', () => {
    it('should retrieve orders with date filters and pagination', async () => {
      const dateFrom = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60; // 30 days ago
      const dateTo = Math.floor(Date.now() / 1000);

      server.use(
        http.get('https://marketplace-api.wildberries.ru/api/v3/orders', () => {
          return HttpResponse.json({
            next: 100,
            orders: [
              {
                id: 67890,
                article: 'TEST-ARTICLE-2',
                skus: ['9876543210123'],
                rid: 'test-rid-2',
                createdAt: '2024-10-21T15:00:00Z',
                orderUid: 'test-uid-2',
                nmId: 11111,
                chrtId: 22222,
                price: 250000,
                convertedPrice: 250000,
                currencyCode: 643,
                convertedCurrencyCode: 643,
                deliveryType: 'fbs',
                warehouseId: 101,
                officeId: 201,
                cargoType: 2,
                isZeroOrder: true,
              },
            ],
          });
        })
      );

      const response = await sdk.ordersFBS.getOrders({
        dateFrom,
        dateTo,
        limit: 100,
        next: 0,
      });

      expect(response.orders).toBeInstanceOf(Array);
      expect(response).toHaveProperty('next');
      expect(response.next).toBe(100);
    });

    it('should handle pagination correctly', async () => {
      let callCount = 0;

      server.use(
        http.get('https://marketplace-api.wildberries.ru/api/v3/orders', () => {
          callCount++;

          if (callCount === 1) {
            return HttpResponse.json({
              next: 100,
              orders: Array.from({ length: 100 }, (_, i) => ({
                id: i + 1,
                article: `ARTICLE-${i + 1}`,
                skus: [`SKU-${i + 1}`],
                rid: `rid-${i + 1}`,
                createdAt: '2024-10-22T10:00:00Z',
                orderUid: `uid-${i + 1}`,
                nmId: 1000 + i,
                chrtId: 2000 + i,
                price: 100000,
                convertedPrice: 100000,
                currencyCode: 643,
                convertedCurrencyCode: 643,
                deliveryType: 'fbs' as const,
                warehouseId: 100,
                officeId: 200,
                cargoType: 1 as const,
                isZeroOrder: false,
              })),
            });
          }

          // Second page - last page
          return HttpResponse.json({
            next: 0,
            orders: Array.from({ length: 50 }, (_, i) => ({
              id: 100 + i + 1,
              article: `ARTICLE-${100 + i + 1}`,
              skus: [`SKU-${100 + i + 1}`],
              rid: `rid-${100 + i + 1}`,
              createdAt: '2024-10-22T10:00:00Z',
              orderUid: `uid-${100 + i + 1}`,
              nmId: 1100 + i,
              chrtId: 2100 + i,
              price: 100000,
              convertedPrice: 100000,
              currencyCode: 643,
              convertedCurrencyCode: 643,
              deliveryType: 'fbs' as const,
              warehouseId: 100,
              officeId: 200,
              cargoType: 1 as const,
              isZeroOrder: false,
            })),
          });
        })
      );

      // Paginate through all results
      const allOrders = [];
      let nextCursor = 0;

      do {
        const response = await sdk.ordersFBS.getOrders({
          limit: 100,
          next: nextCursor,
        });

        allOrders.push(...response.orders);
        nextCursor = response.next;
      } while (nextCursor > 0);

      expect(allOrders.length).toBe(150);
    });
  });

  describe('Order Status Retrieval', () => {
    it('should retrieve statuses for multiple orders', async () => {
      server.use(
        http.post('https://marketplace-api.wildberries.ru/api/v3/orders/status', () => {
          return HttpResponse.json({
            orders: [
              { id: 12345, supplierStatus: 'new', wbStatus: 'waiting' },
              { id: 67890, supplierStatus: 'confirm', wbStatus: 'sorted' },
              { id: 11111, supplierStatus: 'complete', wbStatus: 'sold' },
            ],
          });
        })
      );

      const orderIds = [12345, 67890, 11111];
      const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);

      expect(statuses).toHaveLength(3);
      statuses.forEach((status) => {
        expect(status).toHaveProperty('id');
        expect(status).toHaveProperty('supplierStatus');
        expect(status).toHaveProperty('wbStatus');
        expect(['new', 'confirm', 'complete', 'cancel']).toContain(status.supplierStatus);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle validation error for empty orderIds array', async () => {
      await expect(sdk.ordersFBS.getOrderStatuses([])).rejects.toThrow(ValidationError);
    });

    it('should handle validation error for orderIds > 1000', async () => {
      const tooManyIds = Array.from({ length: 1001 }, (_, i) => i + 1);
      await expect(sdk.ordersFBS.getOrderStatuses(tooManyIds)).rejects.toThrow(ValidationError);
    });

    it('should handle 400 error for invalid date range', async () => {
      server.use(
        http.get('https://marketplace-api.wildberries.ru/api/v3/orders', () => {
          return HttpResponse.json(
            { error: 'Date range exceeds 30 days' },
            { status: 400 }
          );
        })
      );

      const dateFrom = Math.floor(Date.now() / 1000) - 60 * 24 * 60 * 60; // 60 days ago
      const dateTo = Math.floor(Date.now() / 1000);

      await expect(
        sdk.ordersFBS.getOrders({ dateFrom, dateTo })
      ).rejects.toThrow();
    });

    it('should handle 429 rate limit error', async () => {
      server.use(
        http.get('https://marketplace-api.wildberries.ru/api/v3/orders/new', () => {
          return HttpResponse.json(
            { error: 'Rate limit exceeded' },
            { status: 429, headers: { 'Retry-After': '5' } }
          );
        })
      );

      await expect(sdk.ordersFBS.getNewOrders()).rejects.toThrow();
    });
  });

  // ============================================================================
  // Supply Management Integration Tests (Story 2.6)
  // ============================================================================

  describe('Complete FBS Fulfillment Workflow', () => {
    it('should complete full FBS fulfillment workflow end-to-end', async () => {
      // Setup: MSW handlers for complete workflow
      server.use(
        // 1. Get new orders
        http.get('https://marketplace-api.wildberries.ru/api/v3/orders/new', () => {
          return HttpResponse.json({
            orders: [
              {
                id: 12345,
                rid: 'rid-001',
                createdAt: '2024-01-15T10:00:00Z',
                offices: ['office1'],
                skus: ['sku1'],
                orderUid: 'uid-001',
                article: 'TEST-ART-001',
                deliveryType: 'fbs',
                warehouseId: 1,
                nmId: 1001,
                chrtId: 2001,
                price: 100000,
                convertedPrice: 100000,
                currencyCode: 643,
                convertedCurrencyCode: 643,
                cargoType: 1,
                isZeroOrder: false,
                officeId: 101,
              },
              {
                id: 67890,
                rid: 'rid-002',
                createdAt: '2024-01-15T10:05:00Z',
                offices: ['office1'],
                skus: ['sku2'],
                orderUid: 'uid-002',
                article: 'TEST-ART-002',
                deliveryType: 'fbs',
                warehouseId: 1,
                nmId: 1002,
                chrtId: 2002,
                price: 150000,
                convertedPrice: 150000,
                currencyCode: 643,
                convertedCurrencyCode: 643,
                cargoType: 1,
                isZeroOrder: false,
                officeId: 101,
              },
            ],
          });
        }),

        // 2. Create supply
        http.post('https://marketplace-api.wildberries.ru/api/v3/supplies', () => {
          return HttpResponse.json({ id: 'WB-GI-TEST123' });
        }),

        // 3. Add orders to supply
        http.patch(
          'https://marketplace-api.wildberries.ru/api/v3/supplies/:supplyId/orders/:orderId',
          () => {
            return new HttpResponse(null, { status: 204 });
          }
        ),

        // 4. Get order statuses (after adding to supply, status = confirm)
        http.post('https://marketplace-api.wildberries.ru/api/v3/orders/status', () => {
          return HttpResponse.json({
            orders: [
              { id: 12345, supplierStatus: 'confirm', wbStatus: 'waiting' },
              { id: 67890, supplierStatus: 'confirm', wbStatus: 'waiting' },
            ],
          });
        }),

        // 5. Get order stickers
        http.post('https://marketplace-api.wildberries.ru/api/v3/orders/stickers', () => {
          return HttpResponse.json({
            stickers: [
              {
                orderId: 12345,
                partA: 'partA-001',
                partB: 'partB-001',
                barcode: 'BC-12345',
                file: 'base64encodedlabel1',
              },
              {
                orderId: 67890,
                partA: 'partA-002',
                partB: 'partB-002',
                barcode: 'BC-67890',
                file: 'base64encodedlabel2',
              },
            ],
          });
        }),

        // 6. Deliver supply
        http.patch('https://marketplace-api.wildberries.ru/api/v3/supplies/:supplyId/deliver', () => {
          return new HttpResponse(null, { status: 204 });
        }),

        // 7. Get supply QR code
        http.get('https://marketplace-api.wildberries.ru/api/v3/supplies/:supplyId/barcode', () => {
          return HttpResponse.json({
            barcode: 'WB-GI-TEST123',
            file: 'base64encodedqrcode',
          });
        })
      );

      // Execute workflow
      // Step 1: Get new orders
      const newOrders = await sdk.ordersFBS.getNewOrders();
      expect(newOrders).toHaveLength(2);
      expect(newOrders[0].id).toBe(12345);
      expect(newOrders[1].id).toBe(67890);

      // Step 2: Create supply
      const supply = await sdk.ordersFBS.createSupply('Integration Test Supply');
      expect(supply.id).toMatch(/^WB-GI-/);

      // Step 3: Add orders to supply
      await sdk.ordersFBS.addOrderToSupply(supply.id, newOrders[0].id);
      await sdk.ordersFBS.addOrderToSupply(supply.id, newOrders[1].id);

      // Step 4: Verify statuses changed to "confirm"
      const statuses = await sdk.ordersFBS.getOrderStatuses([newOrders[0].id, newOrders[1].id]);
      expect(statuses).toHaveLength(2);
      expect(statuses[0].supplierStatus).toBe('confirm');
      expect(statuses[1].supplierStatus).toBe('confirm');

      // Step 5: Get shipping labels
      const stickers = await sdk.ordersFBS.getOrderStickers([newOrders[0].id, newOrders[1].id], {
        type: 'png',
        width: 58,
        height: 40,
      });
      expect(stickers).toHaveLength(2);
      expect(stickers[0].orderId).toBe(12345);
      expect(stickers[0].file).toBeDefined();
      expect(stickers[0].barcode).toBe('BC-12345');

      // Step 6: Deliver supply
      await sdk.ordersFBS.deliverSupply(supply.id);

      // Step 7: Get supply QR code
      const qrCode = await sdk.ordersFBS.getSupplyBarcode(supply.id, 'svg');
      expect(qrCode.barcode).toBe(supply.id);
      expect(qrCode.file).toBeDefined();
    });
  });

  describe('Supply Management Operations', () => {
    it('should create and list supplies with pagination', async () => {
      server.use(
        http.post('https://marketplace-api.wildberries.ru/api/v3/supplies', () => {
          return HttpResponse.json({ id: 'WB-GI-999888' });
        }),
        http.get('https://marketplace-api.wildberries.ru/api/v3/supplies', () => {
          return HttpResponse.json({
            next: 0,
            supplies: [
              {
                id: 'WB-GI-999888',
                name: 'Test Supply',
                done: false,
                createdAt: '2024-01-15T10:00:00Z',
              },
            ],
          });
        })
      );

      const created = await sdk.ordersFBS.createSupply('Test Supply');
      expect(created.id).toMatch(/^WB-GI-/);

      const supplies = await sdk.ordersFBS.getSupplies({ limit: 100, next: 0 });
      expect(supplies.supplies).toHaveLength(1);
      expect(supplies.next).toBe(0);
    });

    it('should get individual supply details', async () => {
      server.use(
        http.get('https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-DETAIL', () => {
          return HttpResponse.json({
            id: 'WB-GI-DETAIL',
            name: 'Detail Test',
            done: true,
            createdAt: '2024-01-15T10:00:00Z',
            closedAt: '2024-01-15T12:00:00Z',
          });
        })
      );

      const supply = await sdk.ordersFBS.getSupply('WB-GI-DETAIL');
      expect(supply.id).toBe('WB-GI-DETAIL');
      expect(supply.done).toBe(true);
      expect(supply.closedAt).toBeDefined();
    });

    it('should delete empty supply', async () => {
      server.use(
        http.delete('https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-EMPTY', () => {
          return new HttpResponse(null, { status: 204 });
        })
      );

      await expect(sdk.ordersFBS.deleteSupply('WB-GI-EMPTY')).resolves.toBeUndefined();
    });
  });

  describe('Order Cancellation', () => {
    it('should cancel order', async () => {
      server.use(
        http.patch('https://marketplace-api.wildberries.ru/api/v3/orders/12345/cancel', () => {
          return new HttpResponse(null, { status: 204 });
        })
      );

      await expect(sdk.ordersFBS.cancelOrder(12345)).resolves.toBeUndefined();
    });
  });

  describe('Supply and Shipping Error Handling', () => {
    it('should handle validation error for invalid supply name', async () => {
      await expect(sdk.ordersFBS.createSupply('')).rejects.toThrow(ValidationError);

      const longName = 'x'.repeat(129);
      await expect(sdk.ordersFBS.createSupply(longName)).rejects.toThrow(ValidationError);
    });

    it('should handle validation error for invalid sticker array size', async () => {
      await expect(
        sdk.ordersFBS.getOrderStickers([], { type: 'png', width: 58, height: 40 })
      ).rejects.toThrow(ValidationError);

      const tooManyIds = Array.from({ length: 101 }, (_, i) => i + 1);
      await expect(
        sdk.ordersFBS.getOrderStickers(tooManyIds, { type: 'png', width: 58, height: 40 })
      ).rejects.toThrow(ValidationError);
    });

    it('should handle validation error for invalid sticker size', async () => {
      await expect(
        sdk.ordersFBS.getOrderStickers([12345], { type: 'png', width: 50, height: 35 } as never)
      ).rejects.toThrow(ValidationError);
    });

    it('should handle 409 error when adding order with wrong cargoType to supply', async () => {
      server.use(
        http.patch(
          'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-TYPE/orders/99999',
          () => {
            return HttpResponse.json(
              { error: 'Cargo type mismatch' },
              { status: 409 }
            );
          }
        )
      );

      await expect(sdk.ordersFBS.addOrderToSupply('WB-GI-TYPE', 99999)).rejects.toThrow();
    });

    it('should handle 409 error when delivering supply with zero orders', async () => {
      server.use(
        http.patch('https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-EMPTY/deliver', () => {
          return HttpResponse.json(
            { error: 'Supply has zero orders' },
            { status: 409 }
          );
        })
      );

      await expect(sdk.ordersFBS.deliverSupply('WB-GI-EMPTY')).rejects.toThrow();
    });

    it('should handle 409 error when getting QR code for non-delivered supply', async () => {
      server.use(
        http.get('https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-NOTDONE/barcode', () => {
          return HttpResponse.json(
            { error: 'Supply not delivered yet' },
            { status: 409 }
          );
        })
      );

      await expect(sdk.ordersFBS.getSupplyBarcode('WB-GI-NOTDONE', 'png')).rejects.toThrow();
    });

    it('should handle 409 error when deleting supply with orders', async () => {
      server.use(
        http.delete('https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-HASORDERS', () => {
          return HttpResponse.json(
            { error: 'Supply has orders attached' },
            { status: 409 }
          );
        })
      );

      await expect(sdk.ordersFBS.deleteSupply('WB-GI-HASORDERS')).rejects.toThrow();
    });

    it('should handle 409 error when canceling completed order', async () => {
      server.use(
        http.patch('https://marketplace-api.wildberries.ru/api/v3/orders/99999/cancel', () => {
          return HttpResponse.json(
            { error: 'Cannot cancel completed order' },
            { status: 409 }
          );
        })
      );

      await expect(sdk.ordersFBS.cancelOrder(99999)).rejects.toThrow();
    });
  });
});
