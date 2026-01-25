/**
 * TDD Unit tests for compareTariffs utility
 *
 * Story 11.4: Сравнение тарифов
 *
 * Tests the compareTariffs() utility which:
 * - Takes: warehouseName, date
 * - Calls tariffs/box (inventory storage) and acceptance/coefficients (supply)
 * - Returns: comparison with percentage difference and recommendation
 *
 * @see {@link ../../../src/utils/compareTariffs}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ModelsWarehouseBoxRates } from '../../../src/types/tariffs.types';
import type { ModelsAcceptanceCoefficient } from '../../../src/types/orders-fbw.types';
import { compareTariffs } from '../../../src/utils/compareTariffs';

describe('compareTariffs', () => {
  const createMockBoxTariff = (
    overrides: Partial<ModelsWarehouseBoxRates> = {}
  ): ModelsWarehouseBoxRates => ({
    warehouseName: 'Коледино',
    boxDeliveryBase: '50.0',
    boxDeliveryCoefExpr: '100',
    boxDeliveryLiter: '5.0',
    boxStorageBase: '0.10',
    boxStorageCoefExpr: '100',
    boxStorageLiter: '0.02',
    geoName: 'Центральный округ',
    ...overrides,
  });

  const createMockAcceptanceCoefficient = (
    overrides: Partial<ModelsAcceptanceCoefficient> = {}
  ): ModelsAcceptanceCoefficient => ({
    date: '2025-01-25',
    coefficient: 1,
    warehouseID: 507,
    warehouseName: 'Коледино',
    allowUnload: true,
    boxTypeName: 'Короба',
    boxTypeID: 2,
    storageCoef: '100',
    deliveryCoef: '100',
    deliveryBaseLiter: '50.0',
    deliveryAdditionalLiter: '5.0',
    storageBaseLiter: '0.10',
    storageAdditionalLiter: '0.02',
    isSortingCenter: false,
    ...overrides,
  });

  // Real Krasnodar data
  const krasnodarBoxTariff: ModelsWarehouseBoxRates = {
    warehouseName: 'Краснодар',
    boxDeliveryBase: '73.6',
    boxDeliveryCoefExpr: '160',
    boxStorageBase: '0.12',
    boxStorageCoefExpr: '160',
    geoName: 'Южный округ',
  };

  const krasnodarAcceptanceCoef: ModelsAcceptanceCoefficient = {
    date: '2025-01-25',
    coefficient: 1,
    warehouseID: 218623,
    warehouseName: 'Краснодар (Тихорецкая)',
    allowUnload: true,
    boxTypeName: 'Короба',
    boxTypeID: 2,
    storageCoef: '165',
    deliveryCoef: '165',
    deliveryBaseLiter: '75.9',
    storageBaseLiter: '0.13',
    isSortingCenter: false,
  };

  let mockGetBoxTariffs: ReturnType<typeof vi.fn<[], Promise<ModelsWarehouseBoxRates[]>>>;
  let mockGetAcceptanceCoefficients: ReturnType<
    typeof vi.fn<[], Promise<ModelsAcceptanceCoefficient[]>>
  >;

  beforeEach(() => {
    mockGetBoxTariffs = vi.fn<[], Promise<ModelsWarehouseBoxRates[]>>();
    mockGetAcceptanceCoefficients = vi.fn<[], Promise<ModelsAcceptanceCoefficient[]>>();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Successful Comparison', () => {
    it('should return inventory and supply data for matching warehouse', async () => {
      mockGetBoxTariffs.mockResolvedValue([createMockBoxTariff()]);
      mockGetAcceptanceCoefficients.mockResolvedValue([createMockAcceptanceCoefficient()]);

      const result = await compareTariffs(
        { warehouseName: 'Коледино', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.inventory.found).toBe(true);
      expect(result.supply.found).toBe(true);
      expect(result.inventory.deliveryBase).toBe(50.0);
      expect(result.supply.deliveryBase).toBe(50.0);
    });
  });

  describe('Response Structure', () => {
    it('should return all required fields', async () => {
      mockGetBoxTariffs.mockResolvedValue([createMockBoxTariff()]);
      mockGetAcceptanceCoefficients.mockResolvedValue([createMockAcceptanceCoefficient()]);

      const result = await compareTariffs(
        { warehouseName: 'Коледино', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result).toHaveProperty('warehouseName');
      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('inventory');
      expect(result).toHaveProperty('supply');
      expect(result).toHaveProperty('difference');
      expect(result).toHaveProperty('recommendation');

      expect(result.inventory).toHaveProperty('deliveryBase');
      expect(result.inventory).toHaveProperty('deliveryCoef');
      expect(result.inventory).toHaveProperty('storageBase');
      expect(result.inventory).toHaveProperty('storageCoef');
      expect(result.inventory).toHaveProperty('found');

      expect(result.difference).toHaveProperty('deliveryBasePercent');
      expect(result.difference).toHaveProperty('storageBasePercent');
    });
  });

  describe('Percentage Difference Calculation', () => {
    it('should calculate deliveryBase difference in percent', async () => {
      // inventory: 50.0, supply: 75.0 -> diff = (75-50)/50 * 100 = 50%
      mockGetBoxTariffs.mockResolvedValue([createMockBoxTariff({ boxDeliveryBase: '50.0' })]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({ deliveryBaseLiter: '75.0' }),
      ]);

      const result = await compareTariffs(
        { warehouseName: 'Коледино', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.difference.deliveryBasePercent).toBeCloseTo(50, 1);
    });

    it('should calculate storageBase difference in percent', async () => {
      // inventory: 0.10, supply: 0.15 -> diff = (0.15-0.10)/0.10 * 100 = 50%
      mockGetBoxTariffs.mockResolvedValue([createMockBoxTariff({ boxStorageBase: '0.10' })]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({ storageBaseLiter: '0.15' }),
      ]);

      const result = await compareTariffs(
        { warehouseName: 'Коледино', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.difference.storageBasePercent).toBeCloseTo(50, 1);
    });
  });

  describe('Recommendation Logic', () => {
    it('should return SUPPLY_CHEAPER when supply rates are lower', async () => {
      mockGetBoxTariffs.mockResolvedValue([
        createMockBoxTariff({ boxDeliveryBase: '100.0', boxStorageBase: '0.20' }),
      ]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({ deliveryBaseLiter: '50.0', storageBaseLiter: '0.10' }),
      ]);

      const result = await compareTariffs(
        { warehouseName: 'Коледино', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.recommendation).toBe('SUPPLY_CHEAPER');
    });

    it('should return INVENTORY_CHEAPER when inventory rates are lower', async () => {
      mockGetBoxTariffs.mockResolvedValue([
        createMockBoxTariff({ boxDeliveryBase: '50.0', boxStorageBase: '0.10' }),
      ]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({ deliveryBaseLiter: '100.0', storageBaseLiter: '0.20' }),
      ]);

      const result = await compareTariffs(
        { warehouseName: 'Коледино', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.recommendation).toBe('INVENTORY_CHEAPER');
    });

    it('should return EQUAL when rates are the same', async () => {
      mockGetBoxTariffs.mockResolvedValue([
        createMockBoxTariff({ boxDeliveryBase: '50.0', boxStorageBase: '0.10' }),
      ]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({ deliveryBaseLiter: '50.0', storageBaseLiter: '0.10' }),
      ]);

      const result = await compareTariffs(
        { warehouseName: 'Коледино', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.recommendation).toBe('EQUAL');
    });
  });

  describe('Real World Example: Krasnodar', () => {
    it('should compare tariffs for Krasnodar warehouse', async () => {
      // inventory: 73.6 / 160%, supply: 75.9 / 165%
      mockGetBoxTariffs.mockResolvedValue([krasnodarBoxTariff]);
      mockGetAcceptanceCoefficients.mockResolvedValue([krasnodarAcceptanceCoef]);

      const result = await compareTariffs(
        { warehouseName: 'Краснодар', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.inventory.deliveryBase).toBe(73.6);
      expect(result.inventory.deliveryCoef).toBe(160);
      expect(result.supply.deliveryBase).toBe(75.9);
      expect(result.supply.deliveryCoef).toBe(165);

      // deliveryBase diff: (75.9-73.6)/73.6 * 100 ≈ 3.13%
      expect(result.difference.deliveryBasePercent).toBeCloseTo(3.13, 1);

      // inventory is cheaper
      expect(result.recommendation).toBe('INVENTORY_CHEAPER');
    });
  });

  describe('Warehouse Search', () => {
    it('should throw error when warehouse not found in both APIs', async () => {
      mockGetBoxTariffs.mockResolvedValue([createMockBoxTariff({ warehouseName: 'Коледино' })]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({ warehouseName: 'Коледино' }),
      ]);

      await expect(
        compareTariffs(
          { warehouseName: 'НесуществующийСклад', date: '2025-01-25' },
          mockGetBoxTariffs,
          mockGetAcceptanceCoefficients
        )
      ).rejects.toThrow('Warehouse "НесуществующийСклад" not found');
    });

    it('should match warehouse with different names in APIs (partial match)', async () => {
      // tariffs/box: "Краснодар", acceptance: "Краснодар (Тихорецкая)"
      mockGetBoxTariffs.mockResolvedValue([createMockBoxTariff({ warehouseName: 'Краснодар' })]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({ warehouseName: 'Краснодар (Тихорецкая)' }),
      ]);

      const result = await compareTariffs(
        { warehouseName: 'Краснодар', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.inventory.found).toBe(true);
      expect(result.supply.found).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values in tariff data', async () => {
      mockGetBoxTariffs.mockResolvedValue([
        createMockBoxTariff({
          boxDeliveryBase: undefined,
          boxStorageBase: undefined,
        }),
      ]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({
          deliveryBaseLiter: '50.0',
          storageBaseLiter: '0.10',
        }),
      ]);

      const result = await compareTariffs(
        { warehouseName: 'Коледино', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.inventory.deliveryBase).toBe(0);
      expect(result.inventory.storageBase).toBe(0);
    });

    it('should handle warehouse found only in one API', async () => {
      mockGetBoxTariffs.mockResolvedValue([
        createMockBoxTariff({ warehouseName: 'ТолькоВТарифах' }),
      ]);
      mockGetAcceptanceCoefficients.mockResolvedValue([
        createMockAcceptanceCoefficient({ warehouseName: 'ДругойСклад' }),
      ]);

      const result = await compareTariffs(
        { warehouseName: 'ТолькоВТарифах', date: '2025-01-25' },
        mockGetBoxTariffs,
        mockGetAcceptanceCoefficients
      );

      expect(result.inventory.found).toBe(true);
      expect(result.supply.found).toBe(false);
      expect(result.recommendation).toBe('INVENTORY_CHEAPER');
    });
  });
});
