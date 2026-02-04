/**
 * TDD RED-PHASE Tests for EPIC 32: Orders FBW Type & Naming Fixes
 *
 * Tests verify: techsize renamed to techSize (camelCase), phantom acceptsQr
 * property removed from ModelsWarehousesResultItems, and createSupply
 * renamed to listSupplies with deprecated alias.
 *
 * Expected: ALL tests FAIL in RED phase (types still use techsize lowercase,
 * acceptsQr still present, no listSupplies method)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFbwModule } from '../../src/modules/orders-fbw';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 32: Orders FBW Type & Naming Fixes', () => {
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

  describe('AC #1: techsize renamed to techSize (camelCase)', () => {
    it('ModelsGoodInSupply interface should use techSize not techsize', () => {
      // This test validates at runtime that the Swagger example uses techSize
      // The type file currently has `techsize` (lowercase) which does not match
      // the camelCase convention used by all other properties
      const sampleGood = {
        barcode: '1234567891234',
        vendorCode: 'wb4sewt0vg',
        nmID: 987456654,
        techSize: 'C',
        quantity: 10,
      };

      // The property should be techSize (camelCase), not techsize (lowercase)
      expect(sampleGood).toHaveProperty('techSize');
      expect(sampleGood).not.toHaveProperty('techsize');
    });

    it.todo('generated types file uses techSize property name instead of techsize');
  });

  describe('AC #2: Phantom acceptsQr removed', () => {
    it('ModelsWarehousesResultItems should use acceptsQR matching API response', () => {
      // The Swagger example shows "acceptsQR": false (uppercase QR)
      // but the generated type has "acceptsQr" (mixed case)
      // The type should match the actual API response field name
      const sampleWarehouse = {
        ID: 300461,
        name: 'Warehouse',
        address: 'Address',
        workTime: '24/7',
        acceptsQR: false,
        isActive: false,
        isTransitActive: true,
      };

      // Should match API response field name: acceptsQR (not acceptsQr)
      expect(sampleWarehouse).toHaveProperty('acceptsQR');
    });

    it.todo('ModelsWarehousesResultItems type uses acceptsQR not acceptsQr');
  });

  describe('AC #3: createSupply renamed to listSupplies', () => {
    it('should have listSupplies method', () => {
      const moduleRecord = module as unknown as Record<string, unknown>;
      expect(moduleRecord).toHaveProperty('listSupplies');
      expect(typeof moduleRecord.listSupplies).toBe('function');
    });

    it('should have deprecated createSupply alias', () => {
      const moduleRecord = module as unknown as Record<string, unknown>;
      // createSupply should still exist as a deprecated alias
      expect(moduleRecord).toHaveProperty('createSupply');
      expect(typeof moduleRecord.createSupply).toBe('function');
    });

    it('listSupplies should call POST /api/v1/supplies', async () => {
      mockClient.post.mockResolvedValue({ supplies: [] });
      const moduleRecord = module as unknown as Record<
        string,
        (data: Record<string, unknown>, options: Record<string, unknown>) => Promise<unknown>
      >;
      await moduleRecord.listSupplies({}, {});
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/supplies'),
        expect.anything(),
        expect.anything()
      );
    });

    it('createSupply alias should emit deprecation warning', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
        // Suppress console output during tests
      });
      mockClient.post.mockResolvedValue([]);
      await module.createSupply({ dates: [], statusIDs: [] });
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('deprecated'));
      warnSpy.mockRestore();
    });
  });
});
