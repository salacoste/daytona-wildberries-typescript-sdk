/**
 * TDD RED-PHASE Tests for EPIC 46: Finances Type & Parameter Fixes
 *
 * These tests define the expected behavior for type corrections, missing fields,
 * and parameter fixes. They are EXPECTED TO FAIL until the implementation is complete.
 *
 * Acceptance Criteria verified:
 *  4. Required params not wrapped in optional objects
 *  5. Balance response uses named interface
 *
 * Note: ACs #1-3 covered getSupplierReportDetailByPeriod / DetailReportItem,
 * removed in v4.0.0 — see docs/guides/migration-v4.md.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FinancesModule } from '../../src/modules/finances';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 46: Finances Type & Parameter Fixes', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: FinancesModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new FinancesModule(mockClient as unknown as BaseClient);
  });

  describe('AC #4: Required params not wrapped in optional objects', () => {
    it('should have getDocumentsDownload with required serviceName and extension params', async () => {
      // Currently: options?: { serviceName: string; extension: string }
      // Should be: options: { serviceName: string; extension: string } (not optional wrapper)
      // The method exists but params are incorrectly wrapped as optional
      await module.getDocumentsDownload({ serviceName: 'test-service', extension: 'pdf' });
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({
            serviceName: 'test-service',
            extension: 'pdf',
          }),
        })
      );
    });

    it.todo('getDocumentsDownload options parameter is required (not optional)');
    it.todo('getDocumentsList required params (beginTime, endTime) are not optional');
  });

  describe('AC #5: Balance response uses named interface', () => {
    it('should return AccountBalanceResponse from getAccountBalance, not inline type', async () => {
      // Currently: Promise<{ currency?: string; current?: number; for_withdraw?: number }>
      // Should be: Promise<AccountBalanceResponse>
      const mockBalance = { currency: 'RUB', current: 50000, for_withdraw: 30000 };
      mockClient.get.mockResolvedValue(mockBalance);
      const result = await module.getAccountBalance();
      expect(result).toEqual(mockBalance);
      expect(result).toHaveProperty('currency');
      expect(result).toHaveProperty('current');
      expect(result).toHaveProperty('for_withdraw');
    });

    it.todo('AccountBalanceResponse interface is exported from finances.types');
    it.todo('AccountBalanceResponse fields are not all optional (currency should be required)');
  });
});
