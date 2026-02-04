/**
 * TDD RED-PHASE Tests for EPIC 30: Orders FBW Code Quality
 *
 * Tests verify: JSDoc @example blocks use sdk.ordersFBW.*, deprecated endpoint
 * marking with console.warn, and rate limit keys wired for all 8 methods.
 *
 * Expected: ALL tests FAIL in RED phase (current code uses sdk.general.* examples,
 * no deprecated marking, no rateLimitKey options)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFbwModule } from '../../src/modules/orders-fbw';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 30: Orders FBW Code Quality', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: OrdersFbwModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new OrdersFbwModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: JSDoc @example blocks use sdk.ordersFBW.*', () => {
    // This AC is verified via static analysis / code review.
    // The following test acts as a structural guard: all public method names
    // should exist so that @example references like sdk.ordersFBW.<method>() are valid.
    it('all 8 public methods should be callable functions', () => {
      const expectedMethods = [
        'getAcceptanceCoefficients',
        'createAcceptanceOption',
        'warehouses',
        'transitTariffs',
        'createSupply',
        'getSupply',
        'getSuppliesGood',
        'getSuppliesPackage',
      ];

      for (const method of expectedMethods) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(typeof (module as unknown as Record<string, unknown>)[method]).toBe('function');
      }
    });

    it.todo('all 8 @example blocks reference sdk.ordersFBW.* not sdk.general.*');
  });

  describe('AC #2: getAcceptanceCoefficients deprecated marking', () => {
    it('should emit console.warn on first call', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
        // Suppress console output during tests
      });
      mockClient.get.mockResolvedValue([]);
      await module.getAcceptanceCoefficients();
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('deprecated'));
      warnSpy.mockRestore();
    });

    it('should only warn once across multiple calls', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
        // Suppress console output during tests
      });
      mockClient.get.mockResolvedValue([]);
      await module.getAcceptanceCoefficients();
      await module.getAcceptanceCoefficients();
      await module.getAcceptanceCoefficients();
      // Should only warn once, not on every call
      const deprecatedCalls = warnSpy.mock.calls.filter((call) =>
        String(call[0]).includes('deprecated')
      );
      expect(deprecatedCalls.length).toBe(1);
      warnSpy.mockRestore();
    });

    it('should still return valid data despite deprecation warning', async () => {
      vi.spyOn(console, 'warn').mockImplementation(() => {
        // Suppress console output during tests
      });
      const mockData = [{ date: '2025-01-01', coefficient: 1 }];
      mockClient.get.mockResolvedValue(mockData);
      const result = await module.getAcceptanceCoefficients();
      expect(result).toEqual(mockData);
    });
  });

  describe('AC #3: Rate limit keys wired for all 8 methods', () => {
    it('should pass rateLimitKey for getAcceptanceCoefficients()', async () => {
      mockClient.get.mockResolvedValue([]);
      await module.getAcceptanceCoefficients();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should pass rateLimitKey for createAcceptanceOption()', async () => {
      mockClient.post.mockResolvedValue({});
      await module.createAcceptanceOption([{ quantity: 1, barcode: '123' }]);
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should pass rateLimitKey for warehouses()', async () => {
      mockClient.get.mockResolvedValue([]);
      await module.warehouses();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should pass rateLimitKey for transitTariffs()', async () => {
      mockClient.get.mockResolvedValue([]);
      await module.transitTariffs();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should pass rateLimitKey for createSupply()', async () => {
      mockClient.post.mockResolvedValue([]);
      await module.createSupply({ dates: [], statusIDs: [] });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should pass rateLimitKey for getSupply()', async () => {
      mockClient.get.mockResolvedValue({});
      await module.getSupply(12345);
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should pass rateLimitKey for getSuppliesGood()', async () => {
      mockClient.get.mockResolvedValue([]);
      await module.getSuppliesGood(12345);
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });

    it('should pass rateLimitKey for getSuppliesPackage()', async () => {
      mockClient.get.mockResolvedValue([]);
      await module.getSuppliesPackage(12345);
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });
  });
});
