/**
 * TDD Unit tests for calculateSupplyCost utility
 *
 * Story 11.3: Калькулятор прогноза затрат на поставку
 *
 * Tests the calculateSupplyCost() utility which:
 * - Takes: volume (liters), warehouseID, storage days
 * - Uses data from /api/v1/acceptance/coefficients
 * - Returns: calculated cost (acceptance + storage + logistics)
 *
 * Formulas:
 * - Storage: (storageBaseLiter + (volume-1) * storageAdditionalLiter) * storageCoef/100 * days
 * - Logistics: (deliveryBaseLiter + (volume-1) * deliveryAdditionalLiter) * deliveryCoef/100
 * - Acceptance: Based on coefficient (0=free, 1=base, >1=multiplier)
 *
 * @see {@link ../../../src/utils/calculateSupplyCost}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ModelsAcceptanceCoefficient } from '../../../src/types/orders-fbw.types';
import { calculateSupplyCost } from '../../../src/utils/calculateSupplyCost';

describe('calculateSupplyCost', () => {
  // Mock coefficient data based on real API structure
  const createMockCoefficient = (
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

  // Krasnodar (Tikhoretskaya) real data from API
  const krasnodarCoefficient: ModelsAcceptanceCoefficient = {
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
    deliveryAdditionalLiter: '7.59',
    storageBaseLiter: '0.13',
    storageAdditionalLiter: '0.013',
    isSortingCenter: false,
  };

  let mockGetCoefficients: ReturnType<typeof vi.fn<[], Promise<ModelsAcceptanceCoefficient[]>>>;

  beforeEach(() => {
    mockGetCoefficients = vi.fn<[], Promise<ModelsAcceptanceCoefficient[]>>();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Storage Cost Calculation', () => {
    // Formula: (storageBaseLiter + (volume-1) * storageAdditionalLiter) * storageCoef/100 * days

    describe('1 liter goods, 30 days', () => {
      it('should calculate storage cost for 1 liter volume', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          storageBaseLiter: '0.10',
          storageAdditionalLiter: '0.02',
          storageCoef: '100',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 1, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        // Formula: (0.10 + (1-1) * 0.02) * 100/100 * 30 = 0.10 * 1 * 30 = 3.00
        expect(result.storageCost).toBe(3.0);
      });
    });

    describe('5 liters goods, 30 days', () => {
      it('should calculate storage cost with additional liter pricing', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          storageBaseLiter: '0.10',
          storageAdditionalLiter: '0.02',
          storageCoef: '100',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        // Formula: (0.10 + (5-1) * 0.02) * 100/100 * 30 = (0.10 + 0.08) * 1 * 30 = 5.40
        expect(result.storageCost).toBe(5.4);
      });
    });

    describe('10 liters goods, 60 days', () => {
      it('should calculate storage cost for larger volume and longer period', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          storageBaseLiter: '0.10',
          storageAdditionalLiter: '0.02',
          storageCoef: '100',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 10, warehouseID: 507, days: 60 },
          mockGetCoefficients
        );

        // Assert
        // Formula: (0.10 + (10-1) * 0.02) * 100/100 * 60 = (0.10 + 0.18) * 1 * 60 = 16.80
        expect(result.storageCost).toBe(16.8);
      });
    });

    describe('with storage coefficient multiplier', () => {
      it('should apply storage coefficient percentage', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          storageBaseLiter: '0.10',
          storageAdditionalLiter: '0.02',
          storageCoef: '200', // 200% multiplier
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 1, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        // Formula: (0.10 + 0) * 200/100 * 30 = 0.10 * 2 * 30 = 6.00
        expect(result.storageCost).toBe(6.0);
      });
    });
  });

  describe('Logistics Cost Calculation', () => {
    // Formula: (deliveryBaseLiter + (volume-1) * deliveryAdditionalLiter) * deliveryCoef/100

    describe('1 liter goods', () => {
      it('should calculate logistics cost for 1 liter (base only)', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          deliveryBaseLiter: '50.0',
          deliveryAdditionalLiter: '5.0',
          deliveryCoef: '100',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 1, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        // Formula: (50.0 + (1-1) * 5.0) * 100/100 = 50.0 * 1 = 50.00
        expect(result.logisticsCost).toBe(50.0);
      });
    });

    describe('5 liters goods', () => {
      it('should calculate logistics cost with additional liter pricing', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          deliveryBaseLiter: '50.0',
          deliveryAdditionalLiter: '5.0',
          deliveryCoef: '100',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        // Formula: (50.0 + (5-1) * 5.0) * 100/100 = (50.0 + 20.0) * 1 = 70.00
        expect(result.logisticsCost).toBe(70.0);
      });
    });

    describe('10 liters goods', () => {
      it('should calculate logistics cost for larger volume', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          deliveryBaseLiter: '50.0',
          deliveryAdditionalLiter: '5.0',
          deliveryCoef: '100',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 10, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        // Formula: (50.0 + (10-1) * 5.0) * 100/100 = (50.0 + 45.0) * 1 = 95.00
        expect(result.logisticsCost).toBe(95.0);
      });
    });

    describe('with delivery coefficient multiplier', () => {
      it('should apply delivery coefficient percentage', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          deliveryBaseLiter: '50.0',
          deliveryAdditionalLiter: '5.0',
          deliveryCoef: '150', // 150% multiplier
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 1, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        // Formula: (50.0 + 0) * 150/100 = 50.0 * 1.5 = 75.00
        expect(result.logisticsCost).toBe(75.0);
      });
    });
  });

  describe('Acceptance Cost Calculation', () => {
    describe('coefficient = 0 (free acceptance)', () => {
      it('should return 0 for free acceptance', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          coefficient: 0,
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        expect(result.acceptanceCost).toBe(0);
      });
    });

    describe('coefficient = 1 (base cost)', () => {
      it('should return base acceptance cost', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          coefficient: 1,
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        // Base acceptance cost is coefficient * base_rate (assumed 50 RUB per unit)
        // The actual base rate should come from API or configuration
        expect(result.acceptanceCost).toBeGreaterThan(0);
        expect(result.appliedCoefficients.acceptance).toBe(1);
      });
    });

    describe('coefficient > 1 (multiplier)', () => {
      it('should apply acceptance coefficient as multiplier', async () => {
        // Arrange
        const baseCoefficient = createMockCoefficient({ coefficient: 1 });
        const multipliedCoefficient = createMockCoefficient({ coefficient: 3 });

        mockGetCoefficients.mockResolvedValueOnce([baseCoefficient]);
        const baseResult = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        mockGetCoefficients.mockResolvedValueOnce([multipliedCoefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        expect(result.acceptanceCost).toBe(baseResult.acceptanceCost * 3);
        expect(result.appliedCoefficients.acceptance).toBe(3);
      });
    });
  });

  describe('Total Cost Calculation', () => {
    it('should sum acceptance + storage + logistics costs', async () => {
      // Arrange
      const coefficient = createMockCoefficient({
        coefficient: 1,
        storageBaseLiter: '0.10',
        storageAdditionalLiter: '0.02',
        storageCoef: '100',
        deliveryBaseLiter: '50.0',
        deliveryAdditionalLiter: '5.0',
        deliveryCoef: '100',
      });
      mockGetCoefficients.mockResolvedValue([coefficient]);

      // Act
      const result = await calculateSupplyCost(
        { volume: 5, warehouseID: 507, days: 30 },
        mockGetCoefficients
      );

      // Assert
      const expectedTotal = result.acceptanceCost + result.storageCost + result.logisticsCost;
      expect(result.totalCost).toBe(expectedTotal);
    });

    it('should round to 2 decimal places', async () => {
      // Arrange
      const coefficient = createMockCoefficient({
        storageBaseLiter: '0.123',
        storageAdditionalLiter: '0.0234',
        storageCoef: '115',
      });
      mockGetCoefficients.mockResolvedValue([coefficient]);

      // Act
      const result = await calculateSupplyCost(
        { volume: 7, warehouseID: 507, days: 45 },
        mockGetCoefficients
      );

      // Assert - all costs should be rounded to 2 decimal places
      expect(Number(result.storageCost.toFixed(2))).toBe(result.storageCost);
      expect(Number(result.logisticsCost.toFixed(2))).toBe(result.logisticsCost);
      expect(Number(result.totalCost.toFixed(2))).toBe(result.totalCost);
    });
  });

  describe('Edge Cases', () => {
    describe('volume = 0', () => {
      it('should throw ValidationError for zero volume', async () => {
        // Arrange
        const coefficient = createMockCoefficient();
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act & Assert
        await expect(
          calculateSupplyCost({ volume: 0, warehouseID: 507, days: 30 }, mockGetCoefficients)
        ).rejects.toThrow('Volume must be greater than 0');
      });
    });

    describe('volume < 0 (negative)', () => {
      it('should throw ValidationError for negative volume', async () => {
        // Arrange
        const coefficient = createMockCoefficient();
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act & Assert
        await expect(
          calculateSupplyCost({ volume: -5, warehouseID: 507, days: 30 }, mockGetCoefficients)
        ).rejects.toThrow('Volume must be greater than 0');
      });
    });

    describe('days = 0', () => {
      it('should calculate with zero storage cost for 0 days', async () => {
        // Arrange
        const coefficient = createMockCoefficient();
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 0 },
          mockGetCoefficients
        );

        // Assert
        expect(result.storageCost).toBe(0);
        expect(result.logisticsCost).toBeGreaterThan(0); // Logistics still applies
      });
    });

    describe('null coefficients in API data', () => {
      it('should handle null storageBaseLiter as 0', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          storageBaseLiter: undefined,
          storageAdditionalLiter: '0.02',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert - should use 0 as default for null values
        expect(result.storageCost).toBeGreaterThanOrEqual(0);
      });

      it('should handle null deliveryBaseLiter as 0', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          deliveryBaseLiter: undefined,
          deliveryAdditionalLiter: '5.0',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert
        expect(result.logisticsCost).toBeGreaterThanOrEqual(0);
      });

      it('should handle null storageCoef as 100 (default)', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          storageCoef: undefined,
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act
        const result = await calculateSupplyCost(
          { volume: 5, warehouseID: 507, days: 30 },
          mockGetCoefficients
        );

        // Assert - should use 100% as default
        expect(result.appliedCoefficients.storage).toBe(100);
      });
    });

    describe('coefficient = -1 (acceptance unavailable)', () => {
      it('should throw AcceptanceUnavailableError when coefficient is -1', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          coefficient: -1,
          warehouseName: 'Коледино',
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act & Assert
        await expect(
          calculateSupplyCost({ volume: 5, warehouseID: 507, days: 30 }, mockGetCoefficients)
        ).rejects.toThrow('Acceptance unavailable for warehouse: Коледино');
      });
    });

    describe('warehouse not found', () => {
      it('should throw NotFoundError when warehouse is not in coefficients', async () => {
        // Arrange
        const coefficient = createMockCoefficient({
          warehouseID: 999,
        });
        mockGetCoefficients.mockResolvedValue([coefficient]);

        // Act & Assert
        await expect(
          calculateSupplyCost({ volume: 5, warehouseID: 507, days: 30 }, mockGetCoefficients)
        ).rejects.toThrow('Warehouse with ID 507 not found');
      });
    });

    describe('empty coefficients response', () => {
      it('should throw Error when no coefficients returned', async () => {
        // Arrange
        mockGetCoefficients.mockResolvedValue([]);

        // Act & Assert
        await expect(
          calculateSupplyCost({ volume: 5, warehouseID: 507, days: 30 }, mockGetCoefficients)
        ).rejects.toThrow('No acceptance coefficients available');
      });
    });
  });

  describe('API Integration', () => {
    it('should call getCoefficients function', async () => {
      // Arrange
      const coefficient = createMockCoefficient();
      mockGetCoefficients.mockResolvedValue([coefficient]);

      // Act
      try {
        await calculateSupplyCost({ volume: 5, warehouseID: 507, days: 30 }, mockGetCoefficients);
      } catch {
        // Expected to fail until implementation
      }

      // Assert
      expect(mockGetCoefficients).toHaveBeenCalledTimes(1);
    });

    it('should filter coefficients by warehouseID', async () => {
      // Arrange
      const coefficients = [
        createMockCoefficient({ warehouseID: 507, warehouseName: 'Коледино' }),
        createMockCoefficient({ warehouseID: 218623, warehouseName: 'Краснодар' }),
        createMockCoefficient({ warehouseID: 123, warehouseName: 'Подольск' }),
      ];
      mockGetCoefficients.mockResolvedValue(coefficients);

      // Act
      const result = await calculateSupplyCost(
        { volume: 5, warehouseID: 218623, days: 30 },
        mockGetCoefficients
      );

      // Assert
      expect(result.warehouseName).toBe('Краснодар');
    });

    it('should filter by boxType when provided', async () => {
      // Arrange
      const coefficients = [
        createMockCoefficient({
          warehouseID: 507,
          boxTypeName: 'Короба',
          boxTypeID: 2,
        }),
        createMockCoefficient({
          warehouseID: 507,
          boxTypeName: 'Монопаллеты',
          boxTypeID: 5,
        }),
      ];
      mockGetCoefficients.mockResolvedValue(coefficients);

      // Act
      const result = await calculateSupplyCost(
        { volume: 5, warehouseID: 507, days: 30, boxType: 'pallet' },
        mockGetCoefficients
      );

      // Assert - should use pallet coefficient
      expect(result).toBeDefined();
    });
  });

  describe('Real World Example: Krasnodar (Tikhoretskaya)', () => {
    // Real data: deliveryBaseLiter=75.9, storageBaseLiter=0.13, coef=165%

    it('should calculate correct cost for 5L goods, 30 days in Krasnodar', async () => {
      // Arrange
      mockGetCoefficients.mockResolvedValue([krasnodarCoefficient]);

      // Act
      const result = await calculateSupplyCost(
        { volume: 5, warehouseID: 218623, days: 30 },
        mockGetCoefficients
      );

      // Assert
      // Storage: (0.13 + (5-1) * 0.013) * 165/100 * 30
      //        = (0.13 + 0.052) * 1.65 * 30
      //        = 0.182 * 1.65 * 30
      //        = 9.009 (rounded to 9.01)
      const expectedStorage = Number(((0.13 + 4 * 0.013) * 1.65 * 30).toFixed(2));
      expect(result.storageCost).toBeCloseTo(expectedStorage, 2);

      // Logistics: (75.9 + (5-1) * 7.59) * 165/100
      //          = (75.9 + 30.36) * 1.65
      //          = 106.26 * 1.65
      //          = 175.329 (rounded to 175.33)
      const expectedLogistics = Number(((75.9 + 4 * 7.59) * 1.65).toFixed(2));
      expect(result.logisticsCost).toBeCloseTo(expectedLogistics, 2);

      // Verify warehouse name
      expect(result.warehouseName).toBe('Краснодар (Тихорецкая)');

      // Verify applied coefficients
      expect(result.appliedCoefficients.storage).toBe(165);
      expect(result.appliedCoefficients.delivery).toBe(165);
    });

    it('should calculate correct cost for 1L goods, 14 days in Krasnodar', async () => {
      // Arrange
      mockGetCoefficients.mockResolvedValue([krasnodarCoefficient]);

      // Act
      const result = await calculateSupplyCost(
        { volume: 1, warehouseID: 218623, days: 14 },
        mockGetCoefficients
      );

      // Assert
      // Storage: (0.13 + 0) * 165/100 * 14 = 0.13 * 1.65 * 14 = 3.003
      const expectedStorage = Number((0.13 * 1.65 * 14).toFixed(2));
      expect(result.storageCost).toBeCloseTo(expectedStorage, 2);

      // Logistics: (75.9 + 0) * 165/100 = 75.9 * 1.65 = 125.235
      const expectedLogistics = Number((75.9 * 1.65).toFixed(2));
      expect(result.logisticsCost).toBeCloseTo(expectedLogistics, 2);
    });
  });

  describe('Result Structure', () => {
    it('should return all required fields', async () => {
      // Arrange
      const coefficient = createMockCoefficient();
      mockGetCoefficients.mockResolvedValue([coefficient]);

      // Act
      const result = await calculateSupplyCost(
        { volume: 5, warehouseID: 507, days: 30 },
        mockGetCoefficients
      );

      // Assert
      expect(result).toHaveProperty('acceptanceCost');
      expect(result).toHaveProperty('storageCost');
      expect(result).toHaveProperty('logisticsCost');
      expect(result).toHaveProperty('totalCost');
      expect(result).toHaveProperty('warehouseName');
      expect(result).toHaveProperty('appliedCoefficients');
      expect(result.appliedCoefficients).toHaveProperty('acceptance');
      expect(result.appliedCoefficients).toHaveProperty('storage');
      expect(result.appliedCoefficients).toHaveProperty('delivery');
    });

    it('should return numeric values for all cost fields', async () => {
      // Arrange
      const coefficient = createMockCoefficient();
      mockGetCoefficients.mockResolvedValue([coefficient]);

      // Act
      const result = await calculateSupplyCost(
        { volume: 5, warehouseID: 507, days: 30 },
        mockGetCoefficients
      );

      // Assert
      expect(typeof result.acceptanceCost).toBe('number');
      expect(typeof result.storageCost).toBe('number');
      expect(typeof result.logisticsCost).toBe('number');
      expect(typeof result.totalCost).toBe('number');
      expect(Number.isFinite(result.totalCost)).toBe(true);
    });
  });

  describe('Pallet-specific calculations', () => {
    it('should use pallet storage rate (per pallet, not per liter)', async () => {
      // Arrange - for pallets, storageBaseLiter is cost per pallet
      const palletCoefficient = createMockCoefficient({
        boxTypeName: 'Монопаллеты',
        boxTypeID: 5,
        storageBaseLiter: '100.0', // Cost per pallet per day
        storageAdditionalLiter: undefined, // null for pallets
        storageCoef: '100',
      });
      mockGetCoefficients.mockResolvedValue([palletCoefficient]);

      // Act
      const result = await calculateSupplyCost(
        { volume: 500, warehouseID: 507, days: 30, boxType: 'pallet' },
        mockGetCoefficients
      );

      // Assert - should use flat pallet rate, not volume-based
      // For pallets: storageBaseLiter * storageCoef/100 * days
      const expectedStorage = 100.0 * 1.0 * 30;
      expect(result.storageCost).toBe(expectedStorage);
    });
  });
});
