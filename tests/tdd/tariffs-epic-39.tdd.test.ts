/**
 * TDD Tests for EPIC 39: Tariffs Type & Parameter Fixes
 *
 * These tests verify that TariffsModule types and parameters are aligned
 * with the swagger schema definitions.
 *
 * NOTE: TypeScript interfaces are compile-time only constructs and are erased
 * during compilation. Runtime checks using Object.keys() cannot verify interfaces.
 * Type correctness is verified by:
 * 1. TypeScript compilation passing (npx tsc --noEmit)
 * 2. These structural tests verifying module behavior
 *
 * Acceptance Criteria verified:
 *  1. Types aligned with swagger schemas (verified by imports compiling)
 *  2. Parameter types corrected to match swagger parameter definitions
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TariffsModule } from '../../src/modules/tariffs';
import type { BaseClient } from '../../src/client/base-client';
import type {
  // Verify these types exist by importing them (compilation = verification)
  Commission,
  CommissionChina,
  CommissionTurkey,
  CommissionUzbekistan,
  CommissionUAE,
  TariffsBoxResponse,
  TariffsPalletResponse,
  ReturnTariffsResponse,
  TariffItem,
  BoxTariffItem,
  PalletTariffItem,
  TariffsCommissionResponse,
  ModelsErrorModel,
  ModelsAcceptanceCoefficient,
} from '../../src/types/tariffs.types';

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

  describe('AC #1: CommissionUzbekistan has correct fields', () => {
    it('CommissionUzbekistan type is importable and has FBS/FBW/DBS fields', () => {
      // This test passes if TypeScript compilation succeeds.
      // CommissionUzbekistan should have: kgvpMarketplaceUz, kgvpPaidStorageUz, kgvpSupplierUz
      const mockUzbekistan: CommissionUzbekistan = {
        report: [
          {
            kgvpMarketplaceUz: 10, // FBS commission
            kgvpPaidStorageUz: 8, // FBW commission
            kgvpSupplierUz: 12, // DBS commission
            parentID: 1,
            parentName: 'Test Category',
          },
        ],
      };
      expect(mockUzbekistan.report?.[0].kgvpMarketplaceUz).toBe(10);
      expect(mockUzbekistan.report?.[0].kgvpPaidStorageUz).toBe(8);
      expect(mockUzbekistan.report?.[0].kgvpSupplierUz).toBe(12);
    });
  });

  describe('AC #2-3: Missing types added', () => {
    it('ModelsErrorModel type is importable', () => {
      const mockError: ModelsErrorModel = {
        status: 400,
        title: 'Bad Request',
        detail: 'Invalid date format',
        requestId: 'req-123',
        origin: 'tariffs-service',
      };
      expect(mockError.status).toBe(400);
    });

    it('ModelsAcceptanceCoefficient type is importable', () => {
      const mockCoeff: ModelsAcceptanceCoefficient = {
        date: '2024-01-15',
        coefficient: 1.5,
        warehouseID: 123,
        warehouseName: 'Moscow',
        allowUnload: true,
        boxTypeID: 2,
      };
      expect(mockCoeff.coefficient).toBe(1.5);
    });
  });

  describe('AC #4-6: Date parameter is required (not optional)', () => {
    it('getTariffsBox requires date parameter', async () => {
      mockClient.get.mockResolvedValue({ response: { data: {} } });

      // Method takes date: string directly (required, not optional)
      await module.getTariffsBox('2024-01-15');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('tariffs/box'),
        expect.objectContaining({
          params: { date: '2024-01-15' },
        })
      );
    });

    it('getTariffsPallet requires date parameter', async () => {
      mockClient.get.mockResolvedValue({ response: { data: {} } });

      await module.getTariffsPallet('2024-01-15');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('tariffs/pallet'),
        expect.objectContaining({
          params: { date: '2024-01-15' },
        })
      );
    });

    it('getTariffsReturn requires date parameter', async () => {
      mockClient.get.mockResolvedValue({ response: { data: {} } });

      await module.getTariffsReturn('2024-01-15');

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('return'),
        expect.objectContaining({
          params: { date: '2024-01-15' },
        })
      );
    });
  });

  describe('AC #7: All module methods have correct signatures', () => {
    it('getTariffsCommission accepts optional locale parameter', async () => {
      mockClient.get.mockResolvedValue({ report: [] });

      await module.getTariffsCommission({ locale: 'en' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('tariffs/commission'),
        expect.objectContaining({
          params: { locale: 'en' },
        })
      );
    });

    it('all tariff methods exist as functions', () => {
      expect(typeof module.getTariffsCommission).toBe('function');
      expect(typeof module.getTariffsBox).toBe('function');
      expect(typeof module.getTariffsPallet).toBe('function');
      expect(typeof module.getTariffsReturn).toBe('function');
    });
  });

  describe('AC #8-9: Type aliases for convenience', () => {
    it('TariffsCommissionResponse type alias exists', () => {
      // This compiles = type exists
      const mockResponse: TariffsCommissionResponse = { report: [] };
      expect(mockResponse).toBeDefined();
    });

    it('TariffItem, BoxTariffItem, PalletTariffItem type aliases exist', () => {
      // These compile = types exist
      const boxItem: BoxTariffItem = { warehouseName: 'Test' };
      const palletItem: PalletTariffItem = { warehouseName: 'Test' };

      expect(boxItem.warehouseName).toBe('Test');
      expect(palletItem.warehouseName).toBe('Test');
    });
  });
});
