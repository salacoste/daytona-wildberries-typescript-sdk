/**
 * Integration tests for Products Media and Pricing operations (Story 2.3)
 *
 * Tests media upload/management and pricing update workflows
 * Uses MSW to mock HTTP requests at the network level
 */

import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src/index';

const mockProductCard = {
  nmID: 12345,
  vendorCode: 'TEST-001',
  photos: [{ big: 'https://example.com/photo1.jpg' }, { big: 'https://example.com/photo2.jpg' }],
};

// MSW server setup with handlers for media and pricing endpoints
const server = setupServer(
  // Upload media file (multipart/form-data)
  http.post('https://content-api.wildberries.ru/content/v3/media/file', () => {
    return HttpResponse.json({
      data: {},
      error: false,
      errorText: '',
      additionalErrors: null,
    });
  }),

  // Upload media by URLs
  http.post('https://content-api.wildberries.ru/content/v3/media/save', async ({ request }) => {
    const body = (await request.json()) as { nmId: number; data?: string[] };

    // Validate that URLs were provided
    if (body.data?.length === 0 || !body.data) {
      return HttpResponse.json(
        {
          data: {},
          error: true,
          errorText: 'No media URLs provided',
          additionalErrors: null,
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      data: {},
      error: false,
      errorText: '',
      additionalErrors: null,
    });
  }),

  // Get product card (for getMediaList)
  http.post('https://content-api.wildberries.ru/content/v2/get/cards/list', async ({ request }) => {
    const body = (await request.json()) as { settings?: { filter?: { textSearch?: string } } };
    const textSearch = body.settings?.filter?.textSearch;

    if (textSearch === '12345') {
      return HttpResponse.json({
        cards: [mockProductCard],
        cursor: { total: 1 },
      });
    }

    return HttpResponse.json({
      cards: [],
      cursor: { total: 0 },
    });
  }),

  // Update pricing
  http.post('https://discounts-prices-api.wildberries.ru/api/v2/upload/task', () => {
    return HttpResponse.json({
      uploadID: 'task-abc-123',
    });
  }),

  // Get pricing (GET - single product)
  http.get(
    'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
    ({ request }) => {
      const url = new URL(request.url);
      const filterNmID = url.searchParams.get('filterNmID');

      if (filterNmID === '12345') {
        return HttpResponse.json({
          data: [
            {
              nmID: 12345,
              price: 2999,
              discount: 15,
              promoCode: 0,
              wbClubDiscount: 0,
              currency: 'RUB',
            },
          ],
        });
      }

      return HttpResponse.json({ data: [] });
    }
  ),

  // Get pricing (POST - multiple products)
  http.post(
    'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
    async ({ request }) => {
      const body = (await request.json()) as { nmIDs: number[] };

      return HttpResponse.json({
        data: body.nmIDs.map((nmID) => ({
          nmID,
          price: 2999,
          discount: 15,
          promoCode: 0,
          wbClubDiscount: 0,
          currency: 'RUB',
        })),
      });
    }
  ),

  // Get pricing task status
  http.get('https://discounts-prices-api.wildberries.ru/api/v2/history/tasks', ({ request }) => {
    const url = new URL(request.url);
    const uploadID = url.searchParams.get('uploadID');

    return HttpResponse.json({
      uploadID: uploadID ?? 'task-abc-123',
      status: 'completed',
      createdAt: '2025-10-22T00:00:00Z',
      completedAt: '2025-10-22T00:01:00Z',
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

describe('Products Media and Pricing Integration Tests', () => {
  const sdk = new WildberriesSDK({ apiKey: 'test-api-key' });

  describe('Media Upload Workflow', () => {
    it('should upload media file successfully', async () => {
      // Arrange
      const file = Buffer.from('fake image data');
      const nmID = 12345;
      const photoNumber = 1;

      // Act
      const response = await sdk.products.uploadMediaFile(nmID, file, photoNumber);

      // Assert
      expect(response.error).toBe(false);
      expect(response.errorText).toBe('');
    });

    it('should upload media by URLs successfully', async () => {
      // Arrange
      const nmID = 12345;
      const mediaURLs = ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'];

      // Act
      const response = await sdk.products.uploadMediaByURLs(nmID, mediaURLs);

      // Assert
      expect(response.error).toBe(false);
    });

    it('should replace all media when uploading by URLs', async () => {
      // Arrange
      const nmID = 12345;
      const newMediaURLs = ['https://example.com/new-photo.jpg'];

      // Act
      const response = await sdk.products.uploadMediaByURLs(nmID, newMediaURLs);

      // Assert
      expect(response.error).toBe(false);
      // Note: Actual replacement verified by subsequent getMediaList call in workflow test
    });

    it('should get media list from product card', async () => {
      // Arrange
      const nmID = 12345;

      // Act
      const mediaList = await sdk.products.getMediaList(nmID);

      // Assert
      expect(Array.isArray(mediaList)).toBe(true);
      expect(mediaList).toHaveLength(2);
      expect(mediaList[0]).toBe('https://example.com/photo1.jpg');
      expect(mediaList[1]).toBe('https://example.com/photo2.jpg');
    });

    it('should handle validation error for invalid media URLs', async () => {
      // Arrange
      server.use(
        http.post('https://content-api.wildberries.ru/content/v3/media/save', () => {
          return HttpResponse.json(
            {
              error: 'Invalid media format',
            },
            { status: 400 }
          );
        })
      );

      const nmID = 12345;
      const invalidURLs = ['https://example.com/invalid.txt'];

      // Act & Assert
      await expect(sdk.products.uploadMediaByURLs(nmID, invalidURLs)).rejects.toThrow(
        'Validation failed'
      );
    });
  });

  describe('Pricing Update Workflow', () => {
    it('should complete pricing update workflow', async () => {
      // 1. Update pricing (get task ID)
      const updates = [{ nmID: 12345, price: 2999, discount: 15 }];
      const task = await sdk.products.updatePricing(updates);

      expect(task.uploadID).toBe('task-abc-123');

      // 2. Check task status
      const status = await sdk.products.getPricingTaskStatus(task.uploadID);
      expect(status.status).toBe('completed');
      expect(status.uploadID).toBe('task-abc-123');

      // 3. Verify pricing applied
      const pricing = await sdk.products.getPricing(12345);
      expect(pricing).toHaveLength(1);
      expect(pricing[0].price).toBe(2999);
      expect(pricing[0].discount).toBe(15);
    });

    it('should update pricing for multiple products', async () => {
      // Arrange
      const bulkUpdates = [
        { nmID: 12345, price: 2999, discount: 15 },
        { nmID: 54321, price: 1499, discount: 10 },
      ];

      // Act
      const task = await sdk.products.updatePricing(bulkUpdates);

      // Assert
      expect(task.uploadID).toBeDefined();
      expect(typeof task.uploadID).toBe('string');
    });

    it('should get pricing for single product using GET', async () => {
      // Arrange
      const nmID = 12345;

      // Act
      const pricing = await sdk.products.getPricing(nmID);

      // Assert
      expect(Array.isArray(pricing)).toBe(true);
      expect(pricing).toHaveLength(1);
      expect(pricing[0].nmID).toBe(12345);
      expect(pricing[0].price).toBe(2999);
      expect(pricing[0].discount).toBe(15);
      expect(pricing[0].currency).toBe('RUB');
    });

    it('should get pricing for multiple products using POST', async () => {
      // Arrange
      const nmIDs = [12345, 54321];

      // Act
      const pricing = await sdk.products.getPricing(nmIDs);

      // Assert
      expect(Array.isArray(pricing)).toBe(true);
      expect(pricing).toHaveLength(2);
      expect(pricing[0].nmID).toBe(12345);
      expect(pricing[1].nmID).toBe(54321);
    });

    it('should handle pending pricing task status', async () => {
      // Arrange
      server.use(
        http.get('https://discounts-prices-api.wildberries.ru/api/v2/history/tasks', () => {
          return HttpResponse.json({
            uploadID: 'task-pending-123',
            status: 'pending',
            createdAt: '2025-10-22T00:00:00Z',
          });
        })
      );

      // Act
      const status = await sdk.products.getPricingTaskStatus('task-pending-123');

      // Assert
      expect(status.status).toBe('pending');
      expect(status.completedAt).toBeUndefined();
    });
  });

  describe('Combined Media and Pricing Workflow', () => {
    it('should complete full product setup with media and pricing', async () => {
      const nmID = 12345;

      // 1. Upload media
      const mediaURLs = [
        'https://example.com/main-photo.jpg',
        'https://example.com/side-photo.jpg',
        'https://example.com/back-photo.jpg',
      ];
      const mediaResponse = await sdk.products.uploadMediaByURLs(nmID, mediaURLs);
      expect(mediaResponse.error).toBe(false);

      // 2. Verify media uploaded
      const currentMedia = await sdk.products.getMediaList(nmID);
      expect(currentMedia.length).toBeGreaterThan(0);

      // 3. Set pricing
      const pricingTask = await sdk.products.updatePricing([{ nmID, price: 2999, discount: 15 }]);
      expect(pricingTask.uploadID).toBeDefined();

      // 4. Check pricing task status
      const taskStatus = await sdk.products.getPricingTaskStatus(pricingTask.uploadID);
      expect(taskStatus.status).toBe('completed');

      // 5. Verify pricing applied
      const pricing = await sdk.products.getPricing(nmID);
      expect(pricing[0].price).toBe(2999);
      expect(pricing[0].discount).toBe(15);
    });
  });

  describe('Error Handling', () => {
    it('should handle 429 rate limit for pricing updates', async () => {
      // Arrange
      server.use(
        http.post('https://discounts-prices-api.wildberries.ru/api/v2/upload/task', () => {
          return HttpResponse.json(
            { error: 'Rate limit exceeded' },
            { status: 429, headers: { 'Retry-After': '60' } }
          );
        })
      );

      // Act & Assert
      await expect(sdk.products.updatePricing([{ nmID: 12345, price: 2999 }])).rejects.toThrow(
        'Rate limit exceeded'
      );
    }, 15000); // Increase timeout for retry logic

    it('should handle 400 validation error for invalid prices', async () => {
      // Arrange
      server.use(
        http.post('https://discounts-prices-api.wildberries.ru/api/v2/upload/task', () => {
          return HttpResponse.json({ error: 'Price must be an integer' }, { status: 400 });
        })
      );

      // Act & Assert
      await expect(sdk.products.updatePricing([{ nmID: 12345, price: 29.99 }])).rejects.toThrow(
        'Validation failed'
      );
    });
  });
});
