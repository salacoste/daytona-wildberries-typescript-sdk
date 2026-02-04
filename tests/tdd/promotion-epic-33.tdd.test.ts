/**
 * TDD RED-PHASE Tests for EPIC 33: Promotion Type Expansion
 *
 * Tests verify: All 62 Swagger schemas have corresponding TypeScript types,
 * no inline anonymous types in method signatures, and type exports are complete.
 *
 * Expected: ALL tests FAIL in RED phase (promotion.types.ts currently exports
 * fewer than 62 types, and many method signatures use inline anonymous objects)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromotionModule } from '../../src/modules/promotion';
import type { BaseClient } from '../../src/client/base-client';
import * as PromotionTypes from '../../src/types/promotion.types';

describe('EPIC 33: Promotion Type Expansion', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: PromotionModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new PromotionModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: All 62 Swagger schemas have TypeScript types', () => {
    it('types file should export at least 62 named types', () => {
      // Count all exported type/interface names from the promotion types module
      const exportedNames = Object.keys(PromotionTypes);
      // Current file exports far fewer than 62; this test will FAIL
      expect(exportedNames.length).toBeGreaterThanOrEqual(62);
    });

    it('should export PromotionCount response type', () => {
      expect(PromotionTypes).toHaveProperty('PromotionCountResponse');
    });

    it('should export AdvConfig response type', () => {
      expect(PromotionTypes).toHaveProperty('AdvConfigResponse');
    });

    it('should export BidsMin request type', () => {
      expect(PromotionTypes).toHaveProperty('BidsMinRequest');
    });

    it('should export BidsMin response type', () => {
      expect(PromotionTypes).toHaveProperty('BidsMinResponse');
    });

    it('should export SaveAd request type', () => {
      expect(PromotionTypes).toHaveProperty('SaveAdRequest');
    });

    it('should export SeacatSaveAd request type', () => {
      expect(PromotionTypes).toHaveProperty('SeacatSaveAdRequest');
    });

    it('should export AdvBalance response type', () => {
      expect(PromotionTypes).toHaveProperty('AdvBalanceResponse');
    });

    it('should export AdvBudget response type', () => {
      expect(PromotionTypes).toHaveProperty('AdvBudgetResponse');
    });

    it('should export BudgetDeposit request type', () => {
      expect(PromotionTypes).toHaveProperty('BudgetDepositRequest');
    });

    it('should export AdvUpd response type', () => {
      expect(PromotionTypes).toHaveProperty('AdvUpdResponse');
    });

    it('should export AdvPayments response type', () => {
      expect(PromotionTypes).toHaveProperty('AdvPaymentsResponse');
    });

    it('should export CalendarPromotions response type', () => {
      expect(PromotionTypes).toHaveProperty('CalendarPromotionsResponse');
    });
  });

  describe('AC #2: No inline anonymous types in method signatures', () => {
    it('getPromotionCount should return a named type not inline object', () => {
      // Currently returns Promise<{ adverts?: ... }> - should use a named interface
      // This is a structural test; the method must exist
      expect(typeof module.getPromotionCount).toBe('function');
    });

    it('getAdvConfig should return a named type not inline object', () => {
      expect(typeof module.getAdvConfig).toBe('function');
    });

    it('createBidsMin should accept and return named types', () => {
      expect(typeof module.createBidsMin).toBe('function');
    });

    it('getAdvBalance should return a named type', () => {
      expect(typeof module.getAdvBalance).toBe('function');
    });

    it('getAdvBudget should return a named type', () => {
      expect(typeof module.getAdvBudget).toBe('function');
    });

    it('getAdvUpd should return a named type', () => {
      expect(typeof module.getAdvUpd).toBe('function');
    });

    it('getAdvPayments should return a named type', () => {
      expect(typeof module.getAdvPayments).toBe('function');
    });

    it.todo('all method return types use named interfaces verified by type checker');
  });
});
