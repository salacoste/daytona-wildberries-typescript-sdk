/**
 * FBW Storage Cost Calculation Examples
 *
 * This file demonstrates how to calculate storage costs for FBW (Fulfilled by Wildberries)
 * supply planning using the SUPPLY API (getAcceptanceCoefficients).
 *
 * Key Points:
 * - Wildberries API returns numbers with COMMA separators (e.g., "0,13")
 * - You MUST convert commas to dots before parsing
 * - Different box types have different pricing models
 * - Storage cost = (base + (volume-1) * additional) * (coef / 100) * days
 */

import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

/**
 * CRITICAL: Helper function to parse Wildberries API numbers
 *
 * Wildberries API returns numbers with comma separators in some endpoints.
 * For example: "0,13" instead of "0.13"
 *
 * Using parseFloat directly on "0,13" will return NaN, which becomes 0 in calculations.
 *
 * @param value - The number string from API (may contain commas)
 * @returns The parsed number
 */
function parseWBNumber(value: string | null | undefined): number {
  if (!value) return 0;
  return parseFloat(value.replace(',', '.'));
}

/**
 * Calculate storage cost for boxes (Короба, BoxTypeID: 2)
 *
 * Formula: (storageBaseLiter + (volume-1) * storageAdditionalLiter) * (storageCoef / 100) * days
 *
 * @param tariff - Acceptance coefficient tariff from API
 * @param volume - Volume in liters
 * @param days - Number of storage days
 * @returns Storage cost in rubles
 */
function calculateBoxStorage(tariff: any, volume: number, days: number): number {
  const base = parseWBNumber(tariff.storageBaseLiter);
  const additional = parseWBNumber(tariff.storageAdditionalLiter);
  const coef = parseWBNumber(tariff.storageCoef) || 100;

  return (base + (volume - 1) * additional) * (coef / 100) * days;
}

/**
 * Calculate storage cost for pallets (Монопаллеты, BoxTypeID: 5)
 *
 * Formula: storageBaseLiter * (storageCoef / 100) * days
 * Note: storageAdditionalLiter is null for pallets (flat rate pricing)
 *
 * @param tariff - Acceptance coefficient tariff from API
 * @param palletCount - Number of pallets
 * @param days - Number of storage days
 * @returns Storage cost in rubles
 */
function calculatePalletStorage(tariff: any, palletCount: number, days: number): number {
  const base = parseWBNumber(tariff.storageBaseLiter);
  const coef = parseWBNumber(tariff.storageCoef) || 100;

  // storageAdditionalLiter is null for pallets - flat rate pricing
  return base * palletCount * (coef / 100) * days;
}

/**
 * Calculate storage cost for supersafe (Суперсейф, BoxTypeID: 6)
 *
 * Uses the same formula as boxes (volume-based pricing).
 *
 * @param tariff - Acceptance coefficient tariff from API
 * @param volume - Volume in liters
 * @param days - Number of storage days
 * @returns Storage cost in rubles
 */
function calculateSupersafeStorage(tariff: any, volume: number, days: number): number {
  // Same formula as boxes
  return calculateBoxStorage(tariff, volume, days);
}

/**
 * Main example: Calculate storage costs for different box types
 */
async function main() {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY || 'your-api-key',
  });

  console.log('=== FBW Storage Cost Calculation Examples ===\n');

  // Get SUPPLY tariffs (for planning future supplies)
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

  // Find Краснодар (Тихорецкая) warehouse for different box types
  const warehouseID = 130744;

  // Example 1: Boxes (Короба, BoxTypeID: 2)
  console.log('--- Example 1: Box Storage (BoxTypeID: 2) ---');
  const boxTariff = coefficients.find((c) => c.warehouseID === warehouseID && c.boxTypeID === 2);

  if (boxTariff) {
    console.log('Warehouse:', boxTariff.warehouseName);
    console.log('Box Type:', boxTariff.boxTypeName);
    console.log('Raw API values:');
    console.log('  storageBaseLiter:', boxTariff.storageBaseLiter);
    console.log('  storageAdditionalLiter:', boxTariff.storageAdditionalLiter);
    console.log('  storageCoef:', boxTariff.storageCoef);

    const volume = 50; // liters
    const days = 30;

    const boxStorageCost = calculateBoxStorage(boxTariff, volume, days);
    console.log(`\nStorage cost for ${volume} liters for ${days} days:`);
    console.log(`  ${boxStorageCost.toFixed(2)} ₽`);
    console.log(
      `  Calculation: (${parseWBNumber(boxTariff.storageBaseLiter)} + (${volume}-1) * ${parseWBNumber(boxTariff.storageAdditionalLiter)}) * (${parseWBNumber(boxTariff.storageCoef)} / 100) * ${days}`
    );
  }

  console.log('\n--- Example 2: Pallet Storage (BoxTypeID: 5) ---');
  const palletTariff = coefficients.find((c) => c.warehouseID === warehouseID && c.boxTypeID === 5);

  if (palletTariff) {
    console.log('Warehouse:', palletTariff.warehouseName);
    console.log('Box Type:', palletTariff.boxTypeName);
    console.log('Raw API values:');
    console.log('  storageBaseLiter:', palletTariff.storageBaseLiter);
    console.log('  storageAdditionalLiter:', palletTariff.storageAdditionalLiter); // null
    console.log('  storageCoef:', palletTariff.storageCoef);

    const palletCount = 2;
    const palletDays = 30;

    const palletStorageCost = calculatePalletStorage(palletTariff, palletCount, palletDays);
    console.log(`\nStorage cost for ${palletCount} pallets for ${palletDays} days:`);
    console.log(`  ${palletStorageCost.toFixed(2)} ₽`);
    console.log(
      `  Calculation: ${parseWBNumber(palletTariff.storageBaseLiter)} * ${palletCount} * (${parseWBNumber(palletTariff.storageCoef)} / 100) * ${palletDays}`
    );
    console.log('  Note: storageAdditionalLiter is null for pallets (flat rate)');
  }

  console.log('\n--- Example 3: Supersafe Storage (BoxTypeID: 6) ---');
  const supersafeTariff = coefficients.find(
    (c) => c.warehouseID === warehouseID && c.boxTypeID === 6
  );

  if (supersafeTariff) {
    console.log('Warehouse:', supersafeTariff.warehouseName);
    console.log('Box Type:', supersafeTariff.boxTypeName);

    const volume = 30; // liters
    const days = 30;

    const supersafeStorageCost = calculateSupersafeStorage(supersafeTariff, volume, days);
    console.log(`\nStorage cost for ${volume} liters for ${days} days:`);
    console.log(`  ${supersafeStorageCost.toFixed(2)} ₽`);
    console.log('  Note: Uses same formula as boxes (volume-based pricing)');
  }

  // Example 4: Compare warehouses for boxes
  console.log('\n--- Example 4: Compare Warehouses for Box Storage ---');

  const boxTariffs = coefficients.filter((c) => c.boxTypeID === 2);
  const volume = 50;
  const days = 30;

  const warehouseCosts = boxTariffs
    .map((tariff) => ({
      warehouseName: tariff.warehouseName,
      warehouseID: tariff.warehouseID,
      cost: calculateBoxStorage(tariff, volume, days),
    }))
    .sort((a, b) => a.cost - b.cost);

  console.log(`\nTop 5 cheapest warehouses for ${volume}L storage (${days} days):`);
  warehouseCosts.slice(0, 5).forEach((wh, i) => {
    console.log(`  ${i + 1}. ${wh.warehouseName} (ID: ${wh.warehouseID}): ${wh.cost.toFixed(2)} ₽`);
  });

  console.log('\n=== Important Notes ===');
  console.log('1. ALWAYS use parseWBNumber() for SUPPLY API values');
  console.log('2. Different box types have different pricing models');
  console.log('3. Pallets use flat rate (storageAdditionalLiter is null)');
  console.log('4. Boxes and Supersafe use volume-based pricing');
  console.log('5. SUPPLY API is for planning (14-day forecast)');
}

// Execute if run directly
if (require.main === module) {
  main().catch(console.error);
}

export { parseWBNumber, calculateBoxStorage, calculatePalletStorage, calculateSupersafeStorage };
