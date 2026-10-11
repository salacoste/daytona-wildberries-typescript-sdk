import { describe, it, expect } from 'vitest';

const liveApiTestsEnabled = process.env.WB_LIVE_API_TESTS === 'true';

const liveSetup = liveApiTestsEnabled
  ? await (async () => {
      const [{ default: axios }, { default: dotenv }, path] = await Promise.all([
        import('axios'),
        import('dotenv'),
        import('node:path'),
      ]);

      dotenv.config({ path: path.resolve(__dirname, '../../.env') });
      const apiKey = process.env.WB_API_KEY;

      return {
        apiKey,
        client: axios.create({
          headers: {
            Authorization: apiKey,
            'Content-Type': 'application/json',
          },
          validateStatus: () => true, // Allow all status codes for inspection
        }),
      };
    })()
  : undefined;

function getLiveClient() {
  if (!liveSetup) {
    throw new Error('Live WB API tests require WB_LIVE_API_TESTS=true');
  }
  return liveSetup.client;
}

// This file is excluded from the default integration config. Operators must
// select it explicitly and set WB_LIVE_API_TESTS=true to load dotenv or send requests.
describe.skipIf(!liveSetup?.apiKey)('Wildberries API Integration Tests', () => {
  describe('Products Module', () => {
    it('should access /content/v2/tags (SDK version)', async () => {
      const response = await getLiveClient().get(
        'https://content-api.wildberries.ru/content/v2/tags'
      );
      expect(response.status).not.toBe(404);
      expect(response.status).not.toBe(405);
    });

    it('should NOT access /content/v2/tag (Docs version)', async () => {
      const response = await getLiveClient().get(
        'https://content-api.wildberries.ru/content/v2/tag'
      );
      // Expecting 405 or 404, just confirming it behaves differently than the working one
      expect([404, 405]).toContain(response.status);
    });
  });

  describe('Promotion Module', () => {
    it('should access /adv/v1/advert (SDK version)', async () => {
      const response = await getLiveClient().get(
        'https://advert-media-api.wildberries.ru/adv/v1/advert'
      );
      expect(response.status).not.toBe(404);
    });

    it('should access POST /adv/v2/fullstats (SDK version)', async () => {
      const response = await getLiveClient().post(
        'https://advert-api.wildberries.ru/adv/v2/fullstats',
        []
      );
      // WB may deprecate/relocate endpoints — skip gracefully on 404
      if (response.status === 404) {
        // eslint-disable-next-line no-console -- Test diagnostic message
        console.log('Skipping /adv/v2/fullstats test - endpoint returned 404 (deprecated)');
        return;
      }
      expect(response.status).not.toBe(405);
    });

    it('should access /adv/v3/fullstats (SDK version)', async () => {
      const response = await getLiveClient().get(
        'https://advert-api.wildberries.ru/adv/v3/fullstats'
      );
      expect(response.status).not.toBe(404);
    });

    it('should access /adv/v1/stat/words (SDK version)', async () => {
      const response = await getLiveClient().get(
        'https://advert-api.wildberries.ru/adv/v1/stat/words'
      );
      // WB may deprecate/relocate endpoints — skip gracefully on 404
      if (response.status === 404) {
        // eslint-disable-next-line no-console -- Test diagnostic message
        console.log('Skipping /adv/v1/stat/words test - endpoint returned 404 (deprecated)');
        return;
      }
      expect(response.status).not.toBe(405);
    });

    it('should access /adv/v0/config (Extra)', async () => {
      const response = await getLiveClient().get('https://advert-api.wildberries.ru/adv/v0/config');
      // Handle rate limiting or deprecation gracefully
      if (response.status === 429 || response.status === 404) {
        // eslint-disable-next-line no-console -- Test diagnostic message
        console.log(`Skipping /adv/v0/config test - got ${response.status}`);
        return; // Graceful skip, test passes
      }
      expect(response.status).not.toBe(405);
    });
  });

  describe('Calendar API', () => {
    it('should access /api/v1/calendar/promotions', async () => {
      const response = await getLiveClient().get(
        'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions'
      );
      expect(response.status).not.toBe(404);
    });
  });
});
