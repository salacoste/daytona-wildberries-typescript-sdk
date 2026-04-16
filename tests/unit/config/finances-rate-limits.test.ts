/**
 * Unit tests for finances rate limit configuration
 *
 * Verifies that all rate limit entries in financesRateLimits have the correct
 * values as specified in the OpenAPI specifications under wildberries_api_doc/13-finances.yaml.
 *
 * @module tests/unit/config/finances-rate-limits
 */

import { describe, it, expect } from 'vitest';
import { financesRateLimits } from '../../../src/config/finances-rate-limits';

describe('financesRateLimits', () => {
  // ──────────────────────────────────────────────────
  // Balance Tier (1 req/min, 60s interval, burst 1)
  // ──────────────────────────────────────────────────

  describe('Balance Tier (1 req/min, 60s interval, burst 1)', () => {
    it('should have correct values for finances.accountBalance', () => {
      expect(financesRateLimits['finances.accountBalance']).toEqual({
        requestsPerMinute: 1,
        intervalSeconds: 60,
        burstLimit: 1,
      });
    });
  });

  // ──────────────────────────────────────────────────
  // Supplier Report Tier (1 req/min, 60s interval, burst 1)
  // ──────────────────────────────────────────────────

  describe('Supplier Report Tier (1 req/min, 60s interval, burst 1)', () => {
    it('should have correct values for finances.supplierReportDetailByPeriod', () => {
      expect(financesRateLimits['finances.supplierReportDetailByPeriod']).toEqual({
        requestsPerMinute: 1,
        intervalSeconds: 60,
        burstLimit: 1,
      });
    });
  });

  // ──────────────────────────────────────────────────
  // Documents Standard Tier (6 req/min, 10s interval, burst 5)
  // ──────────────────────────────────────────────────

  describe('Documents Standard Tier (6 req/min, 10s interval, burst 5)', () => {
    const documentsStandardKeys = [
      'finances.documentsCategories',
      'finances.documentsList',
      'finances.documentsDownload',
    ];

    it.each(documentsStandardKeys)('should have correct values for %s', (key) => {
      expect(financesRateLimits[key]).toEqual({
        requestsPerMinute: 6,
        intervalSeconds: 10,
        burstLimit: 5,
      });
    });
  });

  // ──────────────────────────────────────────────────
  // Download All Tier (1 req/5min, 300s interval, burst 5)
  // ──────────────────────────────────────────────────

  describe('Download All Tier (1 req/5min, 300s interval, burst 5)', () => {
    it('should have correct values for finances.createDownloadAll', () => {
      expect(financesRateLimits['finances.createDownloadAll']).toEqual({
        requestsPerMinute: 1,
        intervalSeconds: 300,
        burstLimit: 5,
      });
    });
  });

  // ──────────────────────────────────────────────────
  // Removed / Renamed Keys
  // ──────────────────────────────────────────────────

  describe('Removed keys', () => {
    it('should NOT have old key finances.postDocumentsDownloadAll', () => {
      expect(financesRateLimits).not.toHaveProperty('finances.postDocumentsDownloadAll');
    });
  });

  // ──────────────────────────────────────────────────
  // Completeness
  // ──────────────────────────────────────────────────

  // v1 Sales Reports Tier (1 req/min, 60s interval, burst 1) — since v3.7.0
  describe('Sales Reports v1 Tier (1 req/min, 60s interval, burst 1)', () => {
    const salesReportsV1Keys = [
      'finances.salesReportsList',
      'finances.salesReportsDetailed',
      'finances.salesReportsDetailedByReportId',
    ];

    for (const key of salesReportsV1Keys) {
      it(`should have correct values for ${key}`, () => {
        expect(financesRateLimits[key]).toEqual({
          requestsPerMinute: 1,
          intervalSeconds: 60,
          burstLimit: 1,
        });
      });
    }
  });

  // v1 Acquiring Reports Tier (1 req/min, 60s interval, burst 1) — since v3.7.0, RU-only
  describe('Acquiring Reports v1 Tier (1 req/min, 60s interval, burst 1)', () => {
    const acquiringReportsV1Keys = [
      'finances.acquiringReportsList',
      'finances.acquiringReportsDetailed',
      'finances.acquiringReportsDetailedByReportId',
    ];

    for (const key of acquiringReportsV1Keys) {
      it(`should have correct values for ${key}`, () => {
        expect(financesRateLimits[key]).toEqual({
          requestsPerMinute: 1,
          intervalSeconds: 60,
          burstLimit: 1,
        });
      });
    }
  });

  describe('Completeness', () => {
    it('should have entries for all 12 expected keys', () => {
      const expectedKeys = [
        'finances.accountBalance',
        'finances.supplierReportDetailByPeriod',
        'finances.documentsCategories',
        'finances.documentsList',
        'finances.documentsDownload',
        'finances.createDownloadAll',
        // v1 Sales Reports (since v3.7.0)
        'finances.salesReportsList',
        'finances.salesReportsDetailed',
        'finances.salesReportsDetailedByReportId',
        // v1 Acquiring Reports (since v3.7.0)
        'finances.acquiringReportsList',
        'finances.acquiringReportsDetailed',
        'finances.acquiringReportsDetailedByReportId',
      ];

      for (const key of expectedKeys) {
        expect(financesRateLimits).toHaveProperty(key);
      }
    });

    it('should have exactly 12 entries (no unexpected keys)', () => {
      const actualKeys = Object.keys(financesRateLimits);
      expect(actualKeys).toHaveLength(12);
    });
  });
});
