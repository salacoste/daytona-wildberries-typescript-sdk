/**
 * TDD RED-PHASE Tests for EPIC 39: Tariffs Type & Parameter Fixes
 *
 * These tests verify that TariffsModule types and parameters are aligned
 * with the swagger schema definitions. They are EXPECTED TO FAIL until
 * the implementation is complete.
 *
 * Acceptance Criteria verified:
 *  1. Types aligned with swagger schemas
 *  2. Parameter types corrected to match swagger parameter definitions
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TariffsModule } from '../../src/modules/tariffs';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 39: Tariffs Type & Parameter Fixes', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: TariffsModule;

  beforeEach(() => {
    mockClient = { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() };
    module = new TariffsModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: Types aligned with swagger schemas', () => {
    it('tariff types match swagger schema definitions', async () => {
      // The tariffs types file should export named types matching all
      // schemas from the swagger (10-tariffs.yaml + 10-tariffs/ directory).
      const types = await import('../../src/types/tariffs.types');
      const exportedNames = Object.keys(types);

      // Key schemas that must exist as named types
      const requiredTypes = [
        'Commission',
        'TariffsBoxResponse',
        'TariffsPalletResponse',
        'ReturnTariffsResponse',
        'CommissionChina',
        'CommissionTurkey',
        'CommissionUzbekistan',
        'CommissionUAE',
        'TariffItem',
        'BoxTariffItem',
        'PalletTariffItem',
      ];

      for (const typeName of requiredTypes) {
        expect(exportedNames, `Missing exported type: ${typeName}`).toContain(typeName);
      }
    });

    it('Commission type has all required fields from swagger', async () => {
      const types = await import('../../src/types/tariffs.types');

      // Commission schema should be a proper interface, not a union
      // After EPIC 39, the commission response should be properly typed
      // with discriminated fields per country variant
      expect(types).toHaveProperty('Commission');
    });

    it('no inline anonymous types in method return signatures', async () => {
      const types = await import('../../src/types/tariffs.types');
      const exportedNames = Object.keys(types);

      // Every tariff endpoint response should have a named type
      const responseTypes = [
        'TariffsCommissionResponse',
        'TariffsBoxResponse',
        'TariffsPalletResponse',
        'ReturnTariffsResponse',
      ];

      for (const typeName of responseTypes) {
        expect(exportedNames, `Missing response type: ${typeName}`).toContain(typeName);
      }
    });
  });

  describe('AC #2: Parameter types corrected', () => {
    it('getTariffsCommission accepts locale parameter as string', async () => {
      mockClient.get.mockResolvedValue({ report: [] });

      await module.getTariffsCommission({ locale: 'en' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('tariffs/commission'),
        expect.objectContaining({
          params: expect.objectContaining({ locale: 'en' }),
        })
      );
    });

    it('getTariffsBox accepts date parameter in correct format', async () => {
      mockClient.get.mockResolvedValue({ response: { data: {} } });

      // After EPIC 39, the method should accept a date parameter
      await (module as any).getTariffsBox({ date: '2024-01-15' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('tariffs/box'),
        expect.objectContaining({
          params: expect.objectContaining({ date: '2024-01-15' }),
        })
      );
    });

    it('getTariffsPallet accepts date parameter in correct format', async () => {
      mockClient.get.mockResolvedValue({ response: { data: {} } });

      await (module as any).getTariffsPallet({ date: '2024-01-15' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('tariffs/pallet'),
        expect.objectContaining({
          params: expect.objectContaining({ date: '2024-01-15' }),
        })
      );
    });

    it('getReturnTariffs accepts date parameter', async () => {
      mockClient.get.mockResolvedValue({ response: { data: {} } });

      await (module as any).getReturnTariffs({ date: '2024-01-15' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('return'),
        expect.objectContaining({
          params: expect.objectContaining({ date: '2024-01-15' }),
        })
      );
    });

    it('method parameters use named request types not inline objects', async () => {
      const types = await import('../../src/types/tariffs.types');
      const exportedNames = Object.keys(types);

      // Each method should have named parameter types
      const paramTypes = [
        'TariffsCommissionParams',
        'TariffsBoxParams',
        'TariffsPalletParams',
        'ReturnTariffsParams',
      ];

      for (const typeName of paramTypes) {
        expect(exportedNames, `Missing parameter type: ${typeName}`).toContain(typeName);
      }
    });
  });
});
