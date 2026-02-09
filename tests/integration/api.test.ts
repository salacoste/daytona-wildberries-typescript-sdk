import { describe, it, expect } from 'vitest';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const apiKey = process.env.WB_API_KEY;

const client = axios.create({
  headers: {
    Authorization: apiKey,
    'Content-Type': 'application/json',
  },
  validateStatus: () => true, // Allow all status codes for inspection
});

// Use describe.skipIf to avoid empty test suite error in CI
describe.skipIf(!apiKey)('Wildberries API Integration Tests', () => {
  describe('Products Module', () => {
    it('should access /content/v2/tags (SDK version)', async () => {
      const response = await client.get('https://content-api.wildberries.ru/content/v2/tags');
      expect(response.status).not.toBe(404);
      expect(response.status).not.toBe(405);
    });

    it('should NOT access /content/v2/tag (Docs version)', async () => {
      const response = await client.get('https://content-api.wildberries.ru/content/v2/tag');
      // Expecting 405 or 404, just confirming it behaves differently than the working one
      expect([404, 405]).toContain(response.status);
    });
  });

  describe('Promotion Module', () => {
    it('should access /adv/v1/advert (SDK version)', async () => {
      const response = await client.get('https://advert-media-api.wildberries.ru/adv/v1/advert');
      expect(response.status).not.toBe(404);
    });

    it('should access POST /adv/v2/fullstats (SDK version)', async () => {
      const response = await client.post('https://advert-api.wildberries.ru/adv/v2/fullstats', []);
      expect(response.status).not.toBe(404);
      expect(response.status).not.toBe(405);
    });

    it('should access /adv/v3/fullstats (SDK version)', async () => {
      const response = await client.get('https://advert-api.wildberries.ru/adv/v3/fullstats');
      expect(response.status).not.toBe(404);
    });

    it('should access /adv/v1/stat/words (SDK version)', async () => {
      const response = await client.get('https://advert-api.wildberries.ru/adv/v1/stat/words');
      expect(response.status).not.toBe(404);
    });

    it('should access /adv/v0/config (Extra)', async () => {
      const response = await client.get('https://advert-api.wildberries.ru/adv/v0/config');
      // Handle rate limiting gracefully - this endpoint has strict limits
      if (response.status === 429) {
        // eslint-disable-next-line no-console -- Test diagnostic message
        console.log('Skipping /adv/v0/config test - rate limited (429)');
        return; // Graceful skip, test passes
      }
      expect(response.status).toBe(200);
    });
  });

  describe('Calendar API', () => {
    it('should access /api/v1/calendar/promotions', async () => {
      const response = await client.get(
        'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions'
      );
      expect(response.status).not.toBe(404);
    });
  });
});
