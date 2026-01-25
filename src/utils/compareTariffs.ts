/**
 * Utility for comparing tariffs between inventory storage (tariffs/box) and supply (acceptance/coefficients) APIs
 *
 * Story 11.4: Compare tariffs across different Wildberries APIs
 *
 * @module utils/compareTariffs
 */

import type { ModelsWarehouseBoxRates } from '../types/tariffs.types';
import type { ModelsAcceptanceCoefficient } from '../types/orders-fbw.types';

/**
 * Input parameters for tariff comparison
 */
export interface CompareTariffsInput {
  /** Warehouse name to search for (supports partial matching) */
  warehouseName: string;
  /** Date for the comparison (ISO format: YYYY-MM-DD) */
  date: string;
}

/**
 * Tariff data from a single source
 */
export interface TariffData {
  /** Base delivery cost per liter */
  deliveryBase: number;
  /** Delivery coefficient (percentage) */
  deliveryCoef: number;
  /** Base storage cost per liter per day */
  storageBase: number;
  /** Storage coefficient (percentage) */
  storageCoef: number;
  /** Whether the warehouse was found in this API */
  found: boolean;
}

/**
 * Percentage differences between inventory and supply tariffs
 */
export interface TariffDifference {
  /** Percentage difference in delivery base cost: (supply - inventory) / inventory * 100 */
  deliveryBasePercent: number;
  /** Percentage difference in storage base cost: (supply - inventory) / inventory * 100 */
  storageBasePercent: number;
}

/**
 * Recommendation based on tariff comparison
 */
export type TariffRecommendation = 'SUPPLY_CHEAPER' | 'INVENTORY_CHEAPER' | 'EQUAL';

/**
 * Complete tariff comparison result
 */
export interface TariffComparison {
  /** Warehouse name used for comparison */
  warehouseName: string;
  /** Date used for comparison */
  date: string;
  /** Tariff data from inventory storage API (tariffs/box) */
  inventory: TariffData;
  /** Tariff data from supply API (acceptance/coefficients) */
  supply: TariffData;
  /** Percentage differences between the two sources */
  difference: TariffDifference;
  /** Recommendation based on which source has lower overall costs */
  recommendation: TariffRecommendation;
}

/**
 * Safely parse a numeric string value, returning 0 for undefined/null/invalid values
 *
 * @param value - String value to parse
 * @returns Parsed number or 0
 */
function parseNumericValue(value: string | undefined | null): number {
  if (value === undefined || value === null || value === '') {
    return 0;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Check if warehouse name matches the search term (case-insensitive, partial match)
 *
 * Supports matching where API names may have additional qualifiers:
 * - "Краснодар" matches "Краснодар (Тихорецкая)"
 * - "Коледино" matches "Коледино"
 *
 * @param warehouseName - The warehouse name from API
 * @param searchTerm - The search term to match
 * @returns True if the warehouse name matches
 */
function matchesWarehouseName(warehouseName: string | undefined, searchTerm: string): boolean {
  if (!warehouseName) {
    return false;
  }

  const normalizedWarehouse = warehouseName.toLowerCase().trim();
  const normalizedSearch = searchTerm.toLowerCase().trim();

  // Exact match or starts with the search term
  return (
    normalizedWarehouse === normalizedSearch || normalizedWarehouse.startsWith(normalizedSearch)
  );
}

/**
 * Find warehouse in box tariffs data
 *
 * @param boxTariffs - Array of box tariffs from API
 * @param warehouseName - Warehouse name to search for
 * @returns Found tariff or undefined
 */
function findBoxTariff(
  boxTariffs: ModelsWarehouseBoxRates[],
  warehouseName: string
): ModelsWarehouseBoxRates | undefined {
  return boxTariffs.find((tariff) => matchesWarehouseName(tariff.warehouseName, warehouseName));
}

/**
 * Find warehouse in acceptance coefficients data
 *
 * @param coefficients - Array of acceptance coefficients from API
 * @param warehouseName - Warehouse name to search for
 * @returns Found coefficient or undefined
 */
function findAcceptanceCoefficient(
  coefficients: ModelsAcceptanceCoefficient[],
  warehouseName: string
): ModelsAcceptanceCoefficient | undefined {
  return coefficients.find((coef) => matchesWarehouseName(coef.warehouseName, warehouseName));
}

/**
 * Extract tariff data from box tariff (inventory storage API)
 *
 * @param tariff - Box tariff data from API
 * @returns Normalized tariff data
 */
function extractInventoryTariff(tariff: ModelsWarehouseBoxRates | undefined): TariffData {
  if (!tariff) {
    return {
      deliveryBase: 0,
      deliveryCoef: 0,
      storageBase: 0,
      storageCoef: 0,
      found: false,
    };
  }

  return {
    deliveryBase: parseNumericValue(tariff.boxDeliveryBase),
    deliveryCoef: parseNumericValue(tariff.boxDeliveryCoefExpr),
    storageBase: parseNumericValue(tariff.boxStorageBase),
    storageCoef: parseNumericValue(tariff.boxStorageCoefExpr),
    found: true,
  };
}

/**
 * Extract tariff data from acceptance coefficient (supply API)
 *
 * @param coefficient - Acceptance coefficient data from API
 * @returns Normalized tariff data
 */
function extractSupplyTariff(coefficient: ModelsAcceptanceCoefficient | undefined): TariffData {
  if (!coefficient) {
    return {
      deliveryBase: 0,
      deliveryCoef: 0,
      storageBase: 0,
      storageCoef: 0,
      found: false,
    };
  }

  return {
    deliveryBase: parseNumericValue(coefficient.deliveryBaseLiter),
    deliveryCoef: parseNumericValue(coefficient.deliveryCoef),
    storageBase: parseNumericValue(coefficient.storageBaseLiter),
    storageCoef: parseNumericValue(coefficient.storageCoef),
    found: true,
  };
}

/**
 * Calculate percentage difference between two values
 *
 * Formula: (supply - inventory) / inventory * 100
 *
 * @param inventory - Inventory (base) value
 * @param supply - Supply value to compare
 * @returns Percentage difference (positive means supply is higher)
 */
function calculatePercentageDifference(inventory: number, supply: number): number {
  if (inventory === 0) {
    // If inventory is 0, we can't calculate percentage difference
    return supply === 0 ? 0 : 100;
  }
  return ((supply - inventory) / inventory) * 100;
}

/**
 * Calculate differences between inventory and supply tariffs
 *
 * @param inventory - Inventory tariff data
 * @param supply - Supply tariff data
 * @returns Calculated differences
 */
function calculateDifferences(inventory: TariffData, supply: TariffData): TariffDifference {
  return {
    deliveryBasePercent: calculatePercentageDifference(inventory.deliveryBase, supply.deliveryBase),
    storageBasePercent: calculatePercentageDifference(inventory.storageBase, supply.storageBase),
  };
}

/**
 * Determine recommendation based on tariff comparison
 *
 * Compares total costs (delivery + storage) to determine which option is cheaper.
 * If only one source has data, that source is recommended as "cheaper".
 *
 * @param inventory - Inventory tariff data
 * @param supply - Supply tariff data
 * @returns Recommendation
 */
function determineRecommendation(inventory: TariffData, supply: TariffData): TariffRecommendation {
  // If only inventory is found, recommend inventory
  if (inventory.found && !supply.found) {
    return 'INVENTORY_CHEAPER';
  }

  // If only supply is found, recommend supply
  if (!inventory.found && supply.found) {
    return 'SUPPLY_CHEAPER';
  }

  // Calculate total costs (weighted comparison using delivery + storage base costs)
  const inventoryTotal = inventory.deliveryBase + inventory.storageBase;
  const supplyTotal = supply.deliveryBase + supply.storageBase;

  // Compare totals with small epsilon for floating point comparison
  const epsilon = 0.0001;
  if (Math.abs(inventoryTotal - supplyTotal) < epsilon) {
    return 'EQUAL';
  }

  return supplyTotal < inventoryTotal ? 'SUPPLY_CHEAPER' : 'INVENTORY_CHEAPER';
}

/**
 * Compare tariffs between inventory storage (tariffs/box) and supply (acceptance/coefficients) APIs
 *
 * This utility fetches and compares tariff data from two different Wildberries APIs:
 * - tariffs/box (common-api): Inventory storage tariffs
 * - acceptance/coefficients (supplies-api): Supply acceptance tariffs
 *
 * The comparison helps sellers decide which fulfillment option is more cost-effective.
 *
 * @param input - Comparison parameters (warehouseName, date)
 * @param getBoxTariffs - Function to fetch box tariffs from API
 * @param getAcceptanceCoefficients - Function to fetch acceptance coefficients from API
 * @returns Comprehensive tariff comparison result
 * @throws Error if warehouse not found in both APIs
 *
 * @example
 * ```typescript
 * const result = await compareTariffs(
 *   { warehouseName: 'Коледино', date: '2025-01-25' },
 *   () => sdk.tariffs.getBoxTariffs(),
 *   () => sdk.ordersFBW.getAcceptanceCoefficients()
 * );
 *
 * if (result.recommendation === 'SUPPLY_CHEAPER') {
 *   console.log('Supply is more cost-effective');
 * }
 * ```
 */
export async function compareTariffs(
  input: CompareTariffsInput,
  getBoxTariffs: () => Promise<ModelsWarehouseBoxRates[]>,
  getAcceptanceCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>
): Promise<TariffComparison> {
  const { warehouseName, date } = input;

  // Fetch data from both APIs in parallel
  const [boxTariffs, acceptanceCoefficients] = await Promise.all([
    getBoxTariffs(),
    getAcceptanceCoefficients(),
  ]);

  // Find matching warehouses
  const boxTariff = findBoxTariff(boxTariffs, warehouseName);
  const acceptanceCoef = findAcceptanceCoefficient(acceptanceCoefficients, warehouseName);

  // Extract tariff data
  const inventory = extractInventoryTariff(boxTariff);
  const supply = extractSupplyTariff(acceptanceCoef);

  // Check if warehouse was found in at least one API
  if (!inventory.found && !supply.found) {
    throw new Error(`Warehouse "${warehouseName}" not found`);
  }

  // Calculate differences
  const difference = calculateDifferences(inventory, supply);

  // Determine recommendation
  const recommendation = determineRecommendation(inventory, supply);

  return {
    warehouseName,
    date,
    inventory,
    supply,
    difference,
    recommendation,
  };
}
