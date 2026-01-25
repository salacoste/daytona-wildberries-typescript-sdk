/**
 * Pallets vs Boxes Storage Cost Comparison
 *
 * This file demonstrates the differences between pallet and box storage pricing
 * in Wildberries FBW (Fulfilled by Wildberries) system.
 *
 * Key Differences:
 * - BOXES (BoxTypeID: 2): Volume-based pricing, pay for each liter
 * - PALLETS (BoxTypeID: 5): Flat rate pricing, pay per pallet regardless of volume
 * - SUPERSAFE (BoxTypeID: 6): Volume-based pricing (same as boxes)
 *
 * When to use each:
 * - Boxes: Best for small items, irregular shapes, low-volume products
 * - Pallets: Best for high-volume items, when you can fill the pallet efficiently
 * - Supersafe: For high-value items requiring enhanced security
 */

import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

/**
 * CRITICAL: Helper function to parse Wildberries API numbers
 *
 * Wildberries SUPPLY API returns numbers with comma separators (e.g., "0,13").
 * Using parseFloat directly on "0,13" will return NaN.
 */
function parseWBNumber(value: string | null | undefined): number {
  if (!value) return 0;
  return parseFloat(value.replace(',', '.'));
}

/**
 * Calculate box storage cost (volume-based pricing)
 *
 * Formula: (storageBaseLiter + (volume-1) * storageAdditionalLiter) * (storageCoef / 100) * days
 *
 * @param tariff - Acceptance coefficient tariff
 * @param volume - Volume in liters
 * @param days - Storage days
 * @returns Cost in rubles
 */
function calculateBoxStorage(tariff: any, volume: number, days: number): number {
  const base = parseWBNumber(tariff.storageBaseLiter);
  const additional = parseWBNumber(tariff.storageAdditionalLiter);
  const coef = parseWBNumber(tariff.storageCoef) || 100;

  return (base + (volume - 1) * additional) * (coef / 100) * days;
}

/**
 * Calculate pallet storage cost (flat rate pricing)
 *
 * Formula: storageBaseLiter * (storageCoef / 100) * days
 * Note: storageAdditionalLiter is null for pallets
 *
 * @param tariff - Acceptance coefficient tariff
 * @param palletCount - Number of pallets
 * @param days - Storage days
 * @returns Cost in rubles
 */
function calculatePalletStorage(tariff: any, palletCount: number, days: number): number {
  const base = parseWBNumber(tariff.storageBaseLiter);
  const coef = parseWBNumber(tariff.storageCoef) || 100;

  return base * palletCount * (coef / 100) * days;
}

/**
 * Compare box vs pallet storage costs
 */
function compareBoxVsPallet(
  boxTariff: any,
  palletTariff: any,
  volume: number,
  days: number,
  approximatePalletCapacity: number = 1000 // Typical pallet capacity in liters
): {
  boxCost: number;
  palletCost: number;
  palletsNeeded: number;
  cheaper: 'box' | 'pallet';
  savings: number;
  savingsPercent: number;
  breakevenVolume: number;
} {
  const boxCost = calculateBoxStorage(boxTariff, volume, days);

  // Calculate how many pallets needed
  const palletsNeeded = Math.ceil(volume / approximatePalletCapacity);
  const palletCost = calculatePalletStorage(palletTariff, palletsNeeded, days);

  const cheaper = boxCost < palletCost ? 'box' : 'pallet';
  const savings = Math.abs(boxCost - palletCost);
  const savingsPercent = (savings / Math.max(boxCost, palletCost)) * 100;

  // Calculate breakeven volume where pallet becomes cheaper
  const boxBase = parseWBNumber(boxTariff.storageBaseLiter);
  const boxAdditional = parseWBNumber(boxTariff.storageAdditionalLiter);
  const boxCoef = parseWBNumber(boxTariff.storageCoef) || 100;

  const palletBase = parseWBNumber(palletTariff.storageBaseLiter);
  const palletCoef = parseWBNumber(palletTariff.storageCoef) || 100;

  // Solve: (boxBase + (V-1) * boxAdditional) * boxCoef = palletBase * palletCoef
  // This is an approximation
  const palletCostPerDay = (palletBase * palletCoef) / 100;
  const boxCostPerLiterPerDay = (boxAdditional * boxCoef) / 100;
  const breakevenVolume = Math.ceil(palletCostPerDay / boxCostPerLiterPerDay);

  return {
    boxCost,
    palletCost,
    palletsNeeded,
    cheaper,
    savings,
    savingsPercent,
    breakevenVolume,
  };
}

/**
 * Main comparison function
 */
async function main() {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY || 'your-api-key',
  });

  console.log('=== Pallets vs Boxes Storage Cost Comparison ===\n');

  // Get SUPPLY tariffs for planning
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

  // Find Краснодар (Тихорецкая) warehouse
  const warehouseID = 130744;

  const boxTariff = coefficients.find(
    (c) => c.warehouseID === warehouseID && c.boxTypeID === 2 // Boxes
  );

  const palletTariff = coefficients.find(
    (c) => c.warehouseID === warehouseID && c.boxTypeID === 5 // Pallets
  );

  if (!boxTariff || !palletTariff) {
    console.log('Required tariffs not found for warehouse', warehouseID);
    return;
  }

  console.log('Warehouse:', boxTariff.warehouseName);
  console.log('Date:', new Date().toISOString().split('T')[0]);
  console.log();

  // Display tariff information
  console.log('--- Box Tariff (Короба, BoxTypeID: 2) ---');
  console.log('Pricing Model: Volume-based (pay for each liter)');
  console.log('storageBaseLiter:', boxTariff.storageBaseLiter, '₽/liter (first liter)');
  console.log('storageAdditionalLiter:', boxTariff.storageAdditionalLiter, '₽/liter (additional)');
  console.log('storageCoef:', boxTariff.storageCoef, '%');
  console.log();

  console.log('--- Pallet Tariff (Монопаллеты, BoxTypeID: 5) ---');
  console.log('Pricing Model: Flat rate (pay per pallet)');
  console.log('storageBaseLiter:', palletTariff.storageBaseLiter, '₽/pallet (flat rate)');
  console.log('storageAdditionalLiter:', palletTariff.storageAdditionalLiter, '(null - not used)');
  console.log('storageCoef:', palletTariff.storageCoef, '%');
  console.log();

  const days = 30;

  // Example 1: Low volume (50 liters)
  console.log('--- Example 1: Low Volume (50 liters) ---');
  const comparison1 = compareBoxVsPallet(boxTariff, palletTariff, 50, days);

  console.log(`Volume: 50 liters for ${days} days`);
  console.log(`Box cost: ${comparison1.boxCost.toFixed(2)} ₽`);
  console.log(`Pallet cost: ${comparison1.palletCost.toFixed(2)} ₽ (1 pallet)`);
  console.log(`Cheaper option: ${comparison1.cheaper.toUpperCase()}`);
  console.log(
    `Savings: ${comparison1.savings.toFixed(2)} ₽ (${comparison1.savingsPercent.toFixed(1)}%)`
  );
  console.log();

  // Example 2: Medium volume (300 liters)
  console.log('--- Example 2: Medium Volume (300 liters) ---');
  const comparison2 = compareBoxVsPallet(boxTariff, palletTariff, 300, days);

  console.log(`Volume: 300 liters for ${days} days`);
  console.log(`Box cost: ${comparison2.boxCost.toFixed(2)} ₽`);
  console.log(`Pallet cost: ${comparison2.palletCost.toFixed(2)} ₽ (1 pallet)`);
  console.log(`Cheaper option: ${comparison2.cheaper.toUpperCase()}`);
  console.log(
    `Savings: ${comparison2.savings.toFixed(2)} ₽ (${comparison2.savingsPercent.toFixed(1)}%)`
  );
  console.log();

  // Example 3: High volume (1000 liters)
  console.log('--- Example 3: High Volume (1000 liters) ---');
  const comparison3 = compareBoxVsPallet(boxTariff, palletTariff, 1000, days);

  console.log(`Volume: 1000 liters for ${days} days`);
  console.log(`Box cost: ${comparison3.boxCost.toFixed(2)} ₽`);
  console.log(
    `Pallet cost: ${comparison3.palletCost.toFixed(2)} ₽ (${comparison3.palletsNeeded} pallet(s))`
  );
  console.log(`Cheaper option: ${comparison3.cheaper.toUpperCase()}`);
  console.log(
    `Savings: ${comparison3.savings.toFixed(2)} ₽ (${comparison3.savingsPercent.toFixed(1)}%)`
  );
  console.log();

  // Example 4: Very high volume (2000 liters)
  console.log('--- Example 4: Very High Volume (2000 liters) ---');
  const comparison4 = compareBoxVsPallet(boxTariff, palletTariff, 2000, days);

  console.log(`Volume: 2000 liters for ${days} days`);
  console.log(`Box cost: ${comparison4.boxCost.toFixed(2)} ₽`);
  console.log(
    `Pallet cost: ${comparison4.palletCost.toFixed(2)} ₽ (${comparison4.palletsNeeded} pallets)`
  );
  console.log(`Cheaper option: ${comparison4.cheaper.toUpperCase()}`);
  console.log(
    `Savings: ${comparison4.savings.toFixed(2)} ₽ (${comparison4.savingsPercent.toFixed(1)}%)`
  );
  console.log();

  // Breakeven analysis
  console.log('--- Breakeven Analysis ---');
  console.log(`Breakeven volume: ~${comparison1.breakevenVolume} liters`);
  console.log(`Below this volume: Boxes are cheaper`);
  console.log(`Above this volume: Pallets are cheaper`);
  console.log();

  // Cost per liter comparison
  console.log('--- Cost per Liter Comparison ---');
  const volumes = [50, 100, 200, 500, 1000, 1500, 2000];

  console.log('Volume (L) | Box Cost/Day | Pallet Cost/Day | Cheaper');
  console.log('------------|--------------|-----------------|---------');

  volumes.forEach((vol) => {
    const comp = compareBoxVsPallet(boxTariff, palletTariff, vol, 1);
    const boxCostPerDay = comp.boxCost;
    const palletCostPerDay = comp.palletCost;
    const cheaper = comp.cheaper === 'box' ? 'BOX   ' : 'PALLET';

    console.log(
      `${vol.toString().padStart(10)} | ${boxCostPerDay.toFixed(2).padStart(12)} | ` +
        `${palletCostPerDay.toFixed(2).padStart(15)} | ${cheaper}`
    );
  });

  console.log();
  console.log('=== Recommendations ===');
  console.log('1. Use BOXES for:');
  console.log('   - Low volume items (< 300 liters)');
  console.log('   - Irregular shaped items');
  console.log('   - Products with varying sizes');
  console.log('   - When you cannot efficiently fill pallets');
  console.log();
  console.log('2. Use PALLETS for:');
  console.log('   - High volume items (> 500 liters)');
  console.log('   - Standardized products');
  console.log('   - When you can efficiently fill pallets');
  console.log('   - Bulk storage of similar items');
  console.log();
  console.log('3. Use SUPERSAFE for:');
  console.log('   - High-value items');
  console.log('   - Products requiring enhanced security');
  console.log('   - Same pricing model as boxes (volume-based)');
}

// Execute if run directly
if (require.main === module) {
  main().catch(console.error);
}

export { parseWBNumber, calculateBoxStorage, calculatePalletStorage, compareBoxVsPallet };
