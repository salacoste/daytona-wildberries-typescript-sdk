/**
 * Unit Tests for Rate Limit Parser
 *
 * Comprehensive test suite for Russian rate limit table parsing,
 * time unit conversion, and rate limit configuration generation.
 *
 * @module tests/unit/generators/rate-limit-parser
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  findRateLimitTable,
  convertToSeconds,
  extractRateLimitInfo,
  generateRateLimitConfig,
  getDefaultRateLimitConfig,
  parseOperationRateLimit,
  generateRateLimitMap,
  DEFAULT_RATE_LIMIT_CONFIG,
  type RateLimitInfo
} from '../../../tools/generators/rate-limit-parser.js';
import type { ParsedOperation } from '../../../tools/generators/path-parser.js';

describe('Rate Limit Parser', () => {
  describe('findRateLimitTable', () => {
    it('should find rate limit table in clean description', () => {
      const description = `
        Лимит запросов на один аккаунт продавца:
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |
      `;

      const result = findRateLimitTable(description);
      expect(result).not.toBeNull();
      expect(result).toContain('Период');
      expect(result).toContain('Лимит');
      expect(result).toContain('Интервал');
      expect(result).toContain('Всплеск');
    });

    it('should find rate limit table wrapped in HTML', () => {
      const description = `
        <div class="description_limit">
        Лимит запросов на один аккаунт продавца:
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |
        </div>
      `;

      const result = findRateLimitTable(description);
      expect(result).not.toBeNull();
      expect(result).not.toContain('<div');
      expect(result).not.toContain('</div>');
      expect(result).toContain('Лимит запросов');
    });

    it('should return null when no table found', () => {
      const description = 'Simple description without rate limit table';
      const result = findRateLimitTable(description);
      expect(result).toBeNull();
    });

    it('should return null when description is empty', () => {
      const result = findRateLimitTable('');
      expect(result).toBeNull();
    });

    it('should return null when description has Лимит but no table', () => {
      const description = 'This has Лимит in text but no table structure';
      const result = findRateLimitTable(description);
      expect(result).toBeNull();
    });

    it('should strip complex HTML tags', () => {
      const description = `
        <div class="description_limit">
        <a href="/docs">Лимит запросов</a> на один аккаунт продавца:
        <table>
        <tr><td>Период</td><td>Лимит</td><td>Интервал</td><td>Всплеск</td></tr>
        <tr><td>---</td><td>---</td><td>---</td><td>---</td></tr>
        <tr><td>1 минута</td><td>100 запросов</td><td>600 миллисекунд</td><td>5 запросов</td></tr>
        </table>
        </div>
      `;

      const result = findRateLimitTable(description);
      expect(result).not.toBeNull();
      expect(result).not.toContain('<a');
      expect(result).not.toContain('<table>');
      expect(result).not.toContain('</table>');
    });
  });

  describe('convertToSeconds', () => {
    describe('milliseconds conversion', () => {
      it('should convert миллисекунд to seconds', () => {
        expect(convertToSeconds(600, 'миллисекунд')).toBe(0.6);
      });

      it('should convert миллисекунды to seconds', () => {
        expect(convertToSeconds(1000, 'миллисекунды')).toBe(1);
      });

      it('should convert миллисекунда to seconds', () => {
        expect(convertToSeconds(500, 'миллисекунда')).toBe(0.5);
      });

      it('should handle case variations', () => {
        expect(convertToSeconds(600, 'МИЛЛИСЕКУНД')).toBe(0.6);
        expect(convertToSeconds(600, 'МиЛлИсЕкУнД')).toBe(0.6);
      });
    });

    describe('seconds conversion', () => {
      it('should convert секунд to seconds', () => {
        expect(convertToSeconds(20, 'секунд')).toBe(20);
      });

      it('should convert секунды to seconds', () => {
        expect(convertToSeconds(10, 'секунды')).toBe(10);
      });

      it('should convert секунда to seconds', () => {
        expect(convertToSeconds(1, 'секунда')).toBe(1);
      });
    });

    describe('minutes conversion', () => {
      it('should convert минут to seconds', () => {
        expect(convertToSeconds(5, 'минут')).toBe(300);
      });

      it('should convert минуты to seconds', () => {
        expect(convertToSeconds(2, 'минуты')).toBe(120);
      });

      it('should convert минута to seconds', () => {
        expect(convertToSeconds(1, 'минута')).toBe(60);
      });
    });

    describe('hours conversion', () => {
      it('should convert часов to seconds', () => {
        expect(convertToSeconds(2, 'часов')).toBe(7200);
      });

      it('should convert часа to seconds', () => {
        expect(convertToSeconds(2, 'часа')).toBe(7200);
      });

      it('should convert час to seconds', () => {
        expect(convertToSeconds(1, 'час')).toBe(3600);
      });
    });

    describe('unknown units', () => {
      let consoleSpy: ReturnType<typeof vi.spyOn>;

      beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      });

      afterEach(() => {
        consoleSpy.mockRestore();
      });

      it('should default to seconds for unknown unit', () => {
        const result = convertToSeconds(10, 'unknown');
        expect(result).toBe(10);
        expect(consoleSpy).toHaveBeenCalledWith(
          "Warning: Unknown time unit 'unknown', treating as seconds"
        );
      });

      it('should log warning for unrecognized unit', () => {
        convertToSeconds(5, 'xyz');
        expect(consoleSpy).toHaveBeenCalled();
      });
    });
  });

  describe('extractRateLimitInfo', () => {
    it('should extract standard format rate limit', () => {
      const description = `
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |
      `;

      const result = extractRateLimitInfo(description);
      expect(result).not.toBeNull();
      expect(result).toMatchObject({
        period: '1 минута',
        periodValue: 1,
        periodUnit: 'минута',
        limit: 100,
        interval: '600 миллисекунд',
        intervalValue: 600,
        intervalUnit: 'миллисекунд',
        burst: 5
      });
    });

    it('should extract rate limit with seconds interval', () => {
      const description = `
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 1 минута | 6 запросов | 10 секунд | 1 запрос |
      `;

      const result = extractRateLimitInfo(description);
      expect(result).not.toBeNull();
      expect(result).toMatchObject({
        periodValue: 1,
        periodUnit: 'минута',
        limit: 6,
        intervalValue: 10,
        intervalUnit: 'секунд',
        burst: 1
      });
    });

    it('should handle different plural forms', () => {
      const description1 = `
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |
      `;

      const description2 = `
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 2 минуты | 50 запроса | 2 секунды | 10 запроса |
      `;

      const description3 = `
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 5 минут | 10 запросов | 30 секунд | 3 запроса |
      `;

      expect(extractRateLimitInfo(description1)).not.toBeNull();
      expect(extractRateLimitInfo(description2)).not.toBeNull();
      expect(extractRateLimitInfo(description3)).not.toBeNull();
    });

    it('should handle whitespace variations', () => {
      const description = `
        |Период|Лимит|Интервал|Всплеск|
        |---|---|---|---|
        |1 минута|100 запросов|600 миллисекунд|5 запросов|
      `;

      const result = extractRateLimitInfo(description);
      expect(result).not.toBeNull();
      if (result) {
        expect(result.limit).toBe(100);
      }
    });

    it('should return null when no table found', () => {
      const description = 'No rate limit information here';
      const result = extractRateLimitInfo(description);
      expect(result).toBeNull();
    });

    it('should return null for malformed table', () => {
      const description = `
        | Период | Лимит | Интервал |
        | --- | --- | --- |
        | broken | data | here |
      `;

      const result = extractRateLimitInfo(description);
      expect(result).toBeNull();
    });

    it('should return null for invalid negative values', () => {
      // This would require a malicious OpenAPI spec with negative values
      // The regex should not match negative numbers
      const description = `
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 1 минута | 0 запросов | 600 миллисекунд | 5 запросов |
      `;

      const result = extractRateLimitInfo(description);
      // Will return null because limit is 0 (validation fails)
      expect(result).toBeNull();
    });

    it('should validate extracted numbers are positive', () => {
      const description = `
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 1 минута | 100 запросов | 0 миллисекунд | 5 запросов |
      `;

      const result = extractRateLimitInfo(description);
      expect(result).toBeNull(); // intervalValue is 0
    });
  });

  describe('generateRateLimitConfig', () => {
    it('should generate config from standard rate limit info', () => {
      const info: RateLimitInfo = {
        period: '1 минута',
        periodValue: 1,
        periodUnit: 'минута',
        limit: 100,
        interval: '600 миллисекунд',
        intervalValue: 600,
        intervalUnit: 'миллисекунд',
        burst: 5
      };

      const result = generateRateLimitConfig(info);
      expect(result).toMatchObject({
        requestsPerMinute: 100,
        intervalSeconds: 0.6,
        burstLimit: 5
      });
    });

    it('should calculate requests per minute for 30 second period', () => {
      const info: RateLimitInfo = {
        period: '30 секунд',
        periodValue: 30,
        periodUnit: 'секунд',
        limit: 15,
        interval: '2 секунды',
        intervalValue: 2,
        intervalUnit: 'секунды',
        burst: 5
      };

      const result = generateRateLimitConfig(info);
      expect(result.requestsPerMinute).toBe(30); // 15 requests / 30 seconds * 60 = 30 req/min
      expect(result.intervalSeconds).toBe(2);
      expect(result.burstLimit).toBe(5);
    });

    it('should handle strict rate limits', () => {
      const info: RateLimitInfo = {
        period: '1 минута',
        periodValue: 1,
        periodUnit: 'минута',
        limit: 6,
        interval: '10 секунд',
        intervalValue: 10,
        intervalUnit: 'секунд',
        burst: 1
      };

      const result = generateRateLimitConfig(info);
      expect(result).toMatchObject({
        requestsPerMinute: 6,
        intervalSeconds: 10,
        burstLimit: 1
      });
    });

    it('should round requests per minute to nearest integer', () => {
      const info: RateLimitInfo = {
        period: '1 минута',
        periodValue: 1,
        periodUnit: 'минута',
        limit: 7,
        interval: '8 секунд',
        intervalValue: 8,
        intervalUnit: 'секунд',
        burst: 2
      };

      const result = generateRateLimitConfig(info);
      expect(result.requestsPerMinute).toBe(7); // Should round properly
      expect(Number.isInteger(result.requestsPerMinute)).toBe(true);
    });

    it('should handle large burst limits', () => {
      const info: RateLimitInfo = {
        period: '1 минута',
        periodValue: 1,
        periodUnit: 'минута',
        limit: 1000,
        interval: '100 миллисекунд',
        intervalValue: 100,
        intervalUnit: 'миллисекунд',
        burst: 50
      };

      const result = generateRateLimitConfig(info);
      expect(result.requestsPerMinute).toBe(1000);
      expect(result.intervalSeconds).toBe(0.1);
      expect(result.burstLimit).toBe(50);
    });
  });

  describe('getDefaultRateLimitConfig', () => {
    it('should return conservative default config', () => {
      const result = getDefaultRateLimitConfig();
      expect(result).toEqual(DEFAULT_RATE_LIMIT_CONFIG);
      expect(result).toMatchObject({
        requestsPerMinute: 10,
        intervalSeconds: 6,
        burstLimit: 5
      });
    });

    it('should return same object as constant', () => {
      const result = getDefaultRateLimitConfig();
      expect(result).toBe(DEFAULT_RATE_LIMIT_CONFIG);
    });
  });

  describe('parseOperationRateLimit', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    it('should parse operation with rate limit table', () => {
      const operation: ParsedOperation = {
        path: '/api/v1/news',
        method: 'get',
        summary: 'Get news',
        description: `
          Get latest news
          | Период | Лимит | Интервал | Всплеск |
          | --- | --- | --- | --- |
          | 1 минута | 30 запросов | 2 секунды | 10 запросов |
        `,
        responses: { '200': { description: 'Success' } }
      };

      const result = parseOperationRateLimit(operation, 'general.getNews');
      expect(result).toMatchObject({
        requestsPerMinute: 30,
        intervalSeconds: 2,
        burstLimit: 10
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'Parsed rate limit for general.getNews:',
        '30 req/min',
        '(2s interval)',
        'burst: 10'
      );
    });

    it('should use defaults when description missing', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        summary: 'Ping endpoint',
        responses: { '200': { description: 'Pong' } }
      };

      const result = parseOperationRateLimit(operation, 'general.ping');
      expect(result).toEqual(DEFAULT_RATE_LIMIT_CONFIG);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No rate limit found for general.ping (missing description), using conservative defaults'
      );
    });

    it('should use defaults when no rate limit table in description', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        summary: 'Ping endpoint',
        description: 'Simple ping endpoint without rate limit table',
        responses: { '200': { description: 'Pong' } }
      };

      const result = parseOperationRateLimit(operation, 'general.ping');
      expect(result).toEqual(DEFAULT_RATE_LIMIT_CONFIG);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No rate limit found for general.ping, using conservative defaults'
      );
    });

    it('should use defaults for malformed rate limit table', () => {
      const operation: ParsedOperation = {
        path: '/endpoint',
        method: 'post',
        summary: 'Endpoint',
        description: `
          | Broken | Table | Here |
          | --- | --- | --- |
          | invalid | data | format |
        `,
        responses: { '200': { description: 'Success' } }
      };

      const result = parseOperationRateLimit(operation, 'module.endpoint');
      expect(result).toEqual(DEFAULT_RATE_LIMIT_CONFIG);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No rate limit found for module.endpoint, using conservative defaults'
      );
    });
  });

  describe('generateRateLimitMap', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    it('should generate rate limit map for multiple operations', () => {
      const operations: ParsedOperation[] = [
        {
          path: '/ping',
          method: 'get',
          summary: 'Ping',
          description: 'Ping endpoint',
          responses: { '200': { description: 'Pong' } }
        },
        {
          path: '/api/v1/news',
          method: 'get',
          summary: 'Get news',
          description: `
            | Период | Лимит | Интервал | Всплеск |
            | --- | --- | --- | --- |
            | 1 минута | 30 запросов | 2 секунды | 10 запросов |
          `,
          responses: { '200': { description: 'Success' } }
        }
      ];

      const methodNames = new Map([
        ['/ping:get', 'ping'],
        ['/api/v1/news:get', 'getNews']
      ]);

      const result = generateRateLimitMap(operations, 'general', methodNames);

      expect(result).toHaveProperty('general.ping');
      expect(result).toHaveProperty('general.getNews');
      expect(result['general.ping']).toEqual(DEFAULT_RATE_LIMIT_CONFIG);
      expect(result['general.getNews']).toMatchObject({
        requestsPerMinute: 30,
        intervalSeconds: 2,
        burstLimit: 10
      });
    });

    it('should skip operations without method names', () => {
      const operations: ParsedOperation[] = [
        {
          path: '/unknown',
          method: 'get',
          summary: 'Unknown',
          responses: { '200': { description: 'OK' } }
        }
      ];

      const methodNames = new Map<string, string>();

      const result = generateRateLimitMap(operations, 'general', methodNames);

      expect(Object.keys(result)).toHaveLength(0);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No method name found for operation /unknown:get, skipping rate limit'
      );
    });

    it('should generate correct endpoint keys', () => {
      const operations: ParsedOperation[] = [
        {
          path: '/products',
          method: 'post',
          summary: 'Create product',
          responses: { '200': { description: 'Created' } }
        }
      ];

      const methodNames = new Map([
        ['/products:post', 'createProduct']
      ]);

      const result = generateRateLimitMap(operations, 'products', methodNames);

      expect(result).toHaveProperty('products.createProduct');
      expect(result['products.createProduct']).toBeDefined();
    });

    it('should handle empty operations array', () => {
      const operations: ParsedOperation[] = [];
      const methodNames = new Map<string, string>();

      const result = generateRateLimitMap(operations, 'empty', methodNames);

      expect(result).toEqual({});
      expect(Object.keys(result)).toHaveLength(0);
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete workflow from description to config', () => {
      const description = `
        <div class="description_limit">
        Лимит запросов на один аккаунт продавца:
        | Период | Лимит | Интервал | Всплеск |
        | --- | --- | --- | --- |
        | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |
        </div>
      `;

      // Step 1: Find table
      const table = findRateLimitTable(description);
      expect(table).not.toBeNull();

      // Step 2: Extract info
      const info = extractRateLimitInfo(description);
      expect(info).not.toBeNull();

      // Step 3: Generate config
      if (info) {
        const config = generateRateLimitConfig(info);
        expect(config).toMatchObject({
          requestsPerMinute: 100,
          intervalSeconds: 0.6,
          burstLimit: 5
        });
      }
    });

    it('should handle workflow with fallback to defaults', () => {
      const description = 'No rate limit table here';

      // Step 1: Find table
      const table = findRateLimitTable(description);
      expect(table).toBeNull();

      // Step 2: Extract info
      const info = extractRateLimitInfo(description);
      expect(info).toBeNull();

      // Step 3: Use defaults
      const config = getDefaultRateLimitConfig();
      expect(config).toEqual(DEFAULT_RATE_LIMIT_CONFIG);
    });
  });
});
