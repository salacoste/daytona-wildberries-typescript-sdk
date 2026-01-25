/**
 * Supply Cost Calculator Utility
 *
 * Story 11.3: Калькулятор прогноза затрат на поставку
 *
 * Calculates supply costs using acceptance coefficients data.
 *
 * Formulas:
 * - Storage: (storageBaseLiter + (volume-1) * storageAdditionalLiter) * storageCoef/100 * days
 * - Logistics: (deliveryBaseLiter + (volume-1) * deliveryAdditionalLiter) * deliveryCoef/100
 * - Acceptance: coefficient * base_rate (varies by boxType)
 *
 * @module utils/calculateSupplyCost
 */

import type { ModelsAcceptanceCoefficient } from '../types/orders-fbw.types';

/**
 * Input parameters for supply cost calculation
 */
export interface SupplyCostInput {
  /** Volume of goods in liters */
  volume: number;
  /** Warehouse ID */
  warehouseID: number;
  /** Number of storage days */
  days: number;
  /** Box type: 'box' | 'pallet' | 'supersafe' */
  boxType?: 'box' | 'pallet' | 'supersafe';
}

/**
 * Result of supply cost calculation
 */
export interface SupplyCostResult {
  /** Acceptance cost in rubles */
  acceptanceCost: number;
  /** Storage cost in rubles */
  storageCost: number;
  /** Logistics/delivery cost in rubles */
  logisticsCost: number;
  /** Total cost (acceptance + storage + logistics) */
  totalCost: number;
  /** Warehouse name */
  warehouseName: string;
  /** Applied coefficients for transparency */
  appliedCoefficients: {
    acceptance: number;
    storage: number;
    delivery: number;
  };
}

/** Base acceptance rate per unit in rubles */
const BASE_ACCEPTANCE_RATE = 50;

/** Default storage coefficient (100%) */
const DEFAULT_STORAGE_COEF = 100;

/** Default delivery coefficient (100%) */
const DEFAULT_DELIVERY_COEF = 100;

/**
 * Box type name mappings for filtering coefficients
 */
const BOX_TYPE_MAPPINGS: Record<string, string[]> = {
  box: ['Короба', 'QR-поставка с коробами'],
  pallet: ['Монопаллеты'],
  supersafe: ['Суперсейф'],
};

/**
 * Safely parses a string to number, returns default if undefined/null/invalid
 */
function parseNumeric(value: string | undefined | null, defaultValue = 0): number {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

/**
 * Rounds a number to 2 decimal places
 * Uses toFixed for consistent rounding behavior with floating-point numbers
 */
function roundTo2Decimals(value: number): number {
  return Number(value.toFixed(2));
}

/**
 * Calculates storage cost based on volume, days, and coefficient data
 *
 * Formula: (storageBaseLiter + (volume-1) * storageAdditionalLiter) * storageCoef/100 * days
 * For pallets: storageBaseLiter * storageCoef/100 * days (flat rate)
 */
function calculateStorageCost(
  volume: number,
  days: number,
  coefficient: ModelsAcceptanceCoefficient,
  isPallet: boolean
): number {
  const storageBaseLiter = parseNumeric(coefficient.storageBaseLiter, 0);
  const storageAdditionalLiter = parseNumeric(coefficient.storageAdditionalLiter, 0);
  const storageCoef = parseNumeric(coefficient.storageCoef, DEFAULT_STORAGE_COEF);

  let baseCost: number;

  if (isPallet) {
    // For pallets, use flat rate (storageBaseLiter is per pallet, not per liter)
    baseCost = storageBaseLiter;
  } else {
    // For boxes: base + additional for each liter beyond the first
    baseCost = storageBaseLiter + (volume - 1) * storageAdditionalLiter;
  }

  const storageCost = baseCost * (storageCoef / 100) * days;

  return roundTo2Decimals(storageCost);
}

/**
 * Calculates logistics/delivery cost based on volume and coefficient data
 *
 * Formula: (deliveryBaseLiter + (volume-1) * deliveryAdditionalLiter) * deliveryCoef/100
 */
function calculateLogisticsCost(
  volume: number,
  coefficient: ModelsAcceptanceCoefficient,
  isPallet: boolean
): number {
  const deliveryBaseLiter = parseNumeric(coefficient.deliveryBaseLiter, 0);
  const deliveryAdditionalLiter = parseNumeric(coefficient.deliveryAdditionalLiter, 0);
  const deliveryCoef = parseNumeric(coefficient.deliveryCoef, DEFAULT_DELIVERY_COEF);

  let baseCost: number;

  if (isPallet) {
    // For pallets, use flat rate
    baseCost = deliveryBaseLiter;
  } else {
    // For boxes: base + additional for each liter beyond the first
    baseCost = deliveryBaseLiter + (volume - 1) * deliveryAdditionalLiter;
  }

  const logisticsCost = baseCost * (deliveryCoef / 100);

  return roundTo2Decimals(logisticsCost);
}

/**
 * Calculates acceptance cost based on coefficient
 *
 * Rules:
 * - coefficient = 0: free acceptance (0 cost)
 * - coefficient = 1: base rate
 * - coefficient > 1: multiplier of base rate
 */
function calculateAcceptanceCost(acceptanceCoefficient: number): number {
  if (acceptanceCoefficient === 0) {
    return 0;
  }

  return roundTo2Decimals(acceptanceCoefficient * BASE_ACCEPTANCE_RATE);
}

/**
 * Finds the matching coefficient for given warehouse and box type
 */
function findMatchingCoefficient(
  coefficients: ModelsAcceptanceCoefficient[],
  warehouseID: number,
  boxType?: 'box' | 'pallet' | 'supersafe'
): ModelsAcceptanceCoefficient | undefined {
  // Filter by warehouse ID first
  const warehouseCoefficients = coefficients.filter((c) => c.warehouseID === warehouseID);

  if (warehouseCoefficients.length === 0) {
    return undefined;
  }

  // If boxType specified, filter by box type name
  if (boxType) {
    const boxTypeNames = BOX_TYPE_MAPPINGS[boxType];
    const matchingByBoxType = warehouseCoefficients.find((c) =>
      boxTypeNames.some((name) => c.boxTypeName === name)
    );

    if (matchingByBoxType) {
      return matchingByBoxType;
    }
  }

  // Return first matching warehouse coefficient (default to box type)
  return warehouseCoefficients[0];
}

/**
 * Calculates the total supply cost including acceptance, storage, and logistics
 *
 * @param input - Supply cost input parameters
 * @param getCoefficients - Function to retrieve acceptance coefficients from API
 * @returns Promise resolving to detailed cost breakdown
 *
 * @throws Error when volume is <= 0
 * @throws Error when no coefficients are available
 * @throws Error when warehouse is not found
 * @throws Error when acceptance is unavailable (coefficient = -1)
 *
 * @example
 * ```typescript
 * const result = await calculateSupplyCost(
 *   { volume: 5, warehouseID: 507, days: 30 },
 *   () => sdk.ordersFBW.getAcceptanceCoefficients()
 * );
 *
 * console.log(result.totalCost); // Total cost in rubles
 * console.log(result.storageCost); // Storage cost breakdown
 * ```
 */
export async function calculateSupplyCost(
  input: SupplyCostInput,
  getCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>
): Promise<SupplyCostResult> {
  const { volume, warehouseID, days, boxType } = input;

  // Validate input
  if (volume <= 0) {
    throw new Error('Volume must be greater than 0');
  }

  // Fetch coefficients from API
  const coefficients = await getCoefficients();

  // Validate coefficients response
  if (coefficients.length === 0) {
    throw new Error('No acceptance coefficients available');
  }

  // Find matching coefficient for warehouse and box type
  const matchingCoefficient = findMatchingCoefficient(coefficients, warehouseID, boxType);

  if (!matchingCoefficient) {
    throw new Error(`Warehouse with ID ${warehouseID} not found`);
  }

  // Check if acceptance is available
  const acceptanceCoefficient = matchingCoefficient.coefficient ?? 0;
  if (acceptanceCoefficient === -1) {
    throw new Error(`Acceptance unavailable for warehouse: ${matchingCoefficient.warehouseName}`);
  }

  // Determine if this is a pallet shipment
  const isPallet = boxType === 'pallet' || matchingCoefficient.boxTypeName === 'Монопаллеты';

  // Calculate individual costs
  const acceptanceCost = calculateAcceptanceCost(acceptanceCoefficient);
  const storageCost = calculateStorageCost(volume, days, matchingCoefficient, isPallet);
  const logisticsCost = calculateLogisticsCost(volume, matchingCoefficient, isPallet);

  // Calculate total
  const totalCost = roundTo2Decimals(acceptanceCost + storageCost + logisticsCost);

  // Build result
  return {
    acceptanceCost,
    storageCost,
    logisticsCost,
    totalCost,
    warehouseName: matchingCoefficient.warehouseName ?? '',
    appliedCoefficients: {
      acceptance: acceptanceCoefficient,
      storage: parseNumeric(matchingCoefficient.storageCoef, DEFAULT_STORAGE_COEF),
      delivery: parseNumeric(matchingCoefficient.deliveryCoef, DEFAULT_DELIVERY_COEF),
    },
  };
}

export default calculateSupplyCost;
