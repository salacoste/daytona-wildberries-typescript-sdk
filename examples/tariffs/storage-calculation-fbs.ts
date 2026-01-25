/**
 * FBS Storage Cost Calculation Examples
 *
 * This file demonstrates how to calculate storage costs for FBS (Fulfilled by Seller)
 * using the INVENTORY API (getTariffsBox).
 *
 * Key Points:
 * - INVENTORY API returns numbers with DOT separators (e.g., "0.13")
 * - parseFloat works directly without conversion
 * - Use this for calculating costs of EXISTING inventory
 * - For supply planning, use SUPPLY API (ordersFBW.getAcceptanceCoefficients)
 */

import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

/**
 * Calculate storage cost for existing inventory using INVENTORY API
 *
 * Formula: (boxStorageBase + (volume-1) * boxStorageLiter) * (boxStorageCoefExpr / 100) * days
 *
 * Note: INVENTORY API uses dot separators (e.g., "0.13"), so parseFloat works directly.
 *
 * @param tariff - Warehouse tariff from getTariffsBox API
 * @param volume - Volume in liters
 * @param days - Number of storage days
 * @returns Storage cost in rubles
 */
function calculateInventoryStorage(tariff: any, volume: number, days: number): number {
  // INVENTORY API uses dot format, so parseFloat works directly
  const boxStorageBase = parseFloat(tariff.boxStorageBase || '0');
  const boxStorageLiter = parseFloat(tariff.boxStorageLiter || '0');
  const boxStorageCoef = parseFloat(tariff.boxStorageCoefExpr || '100');

  // Formula: (base + (volume-1) * additional) * (coef / 100) * days
  return (boxStorageBase + (volume - 1) * boxStorageLiter) * (boxStorageCoef / 100) * days;
}

/**
 * Main example: Calculate storage costs for existing inventory
 */
async function main() {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY || 'your-api-key',
  });

  console.log('=== FBS Storage Cost Calculation Examples ===\n');

  // Get INVENTORY tariffs (for current costs)
  const date = new Date().toISOString().split('T')[0]; // Today's date
  const tariffs = await sdk.tariffs.getTariffsBox({ date });

  const warehouses = tariffs.response?.data?.warehouseList || [];

  // Example 1: Calculate storage cost for a specific warehouse
  console.log('--- Example 1: Calculate Storage Cost ---');

  const warehouseName = 'Коледино';
  const warehouse = warehouses.find((w) => w.warehouseName?.includes(warehouseName));

  if (warehouse) {
    console.log('Warehouse:', warehouse.warehouseName);
    console.log('Region:', warehouse.geoName);
    console.log('\nRaw API values:');
    console.log('  boxStorageBase:', warehouse.boxStorageBase);
    console.log('  boxStorageLiter:', warehouse.boxStorageLiter);
    console.log('  boxStorageCoefExpr:', warehouse.boxStorageCoefExpr);

    const volume = 50; // liters
    const days = 30;

    const storageCost = calculateInventoryStorage(warehouse, volume, days);
    console.log(`\nStorage cost for ${volume} liters for ${days} days:`);
    console.log(`  ${storageCost.toFixed(2)} ₽`);
    console.log(
      `  Calculation: (${warehouse.boxStorageBase} + (${volume}-1) * ${warehouse.boxStorageLiter}) * (${warehouse.boxStorageCoefExpr} / 100) * ${days}`
    );
  } else {
    console.log(`Warehouse ${warehouseName} not found`);
  }

  // Example 2: Compare warehouses for storage costs
  console.log('\n--- Example 2: Compare Warehouses ---');

  const volume = 50;
  const days = 30;

  const warehouseCosts = warehouses
    .map((wh) => ({
      warehouseName: wh.warehouseName,
      geoName: wh.geoName,
      cost: calculateInventoryStorage(wh, volume, days),
    }))
    .sort((a, b) => a.cost - b.cost);

  console.log(`\nTop 5 cheapest warehouses for ${volume}L storage (${days} days):`);
  warehouseCosts.slice(0, 5).forEach((wh, i) => {
    console.log(`  ${i + 1}. ${wh.warehouseName} (${wh.geoName}): ${wh.cost.toFixed(2)} ₽`);
  });

  console.log(`\nTop 5 most expensive warehouses for ${volume}L storage (${days} days):`);
  warehouseCosts
    .slice(-5)
    .reverse()
    .forEach((wh, i) => {
      console.log(`  ${i + 1}. ${wh.warehouseName} (${wh.geoName}): ${wh.cost.toFixed(2)} ₽`);
    });

  // Example 3: Calculate storage for multiple products
  console.log('\n--- Example 3: Calculate Storage for Multiple Products ---');

  interface Product {
    name: string;
    volume: number;
    quantity: number;
  }

  const products: Product[] = [
    { name: 'Product A', volume: 3, quantity: 100 },
    { name: 'Product B', volume: 5, quantity: 50 },
    { name: 'Product C', volume: 2, quantity: 200 },
  ];

  const targetWarehouse = warehouses[0]; // Use first warehouse

  console.log(`Warehouse: ${targetWarehouse.warehouseName}\n`);

  let totalVolume = 0;
  let totalCost = 0;

  products.forEach((product) => {
    const productVolume = product.volume * product.quantity;
    const productCost = calculateInventoryStorage(targetWarehouse, productVolume, days);

    totalVolume += productVolume;
    totalCost += productCost;

    console.log(`${product.name}:`);
    console.log(`  Volume: ${product.volume}L × ${product.quantity} = ${productVolume}L`);
    console.log(`  Storage cost (${days} days): ${productCost.toFixed(2)} ₽`);
  });

  console.log(`\nTotal volume: ${totalVolume}L`);
  console.log(`Total storage cost (${days} days): ${totalCost.toFixed(2)} ₽`);
  console.log(`Average cost per liter: ${(totalCost / totalVolume / days).toFixed(4)} ₽/L/day`);

  // Example 4: Calculate storage by region
  console.log('\n--- Example 4: Average Storage Cost by Region ---');

  const regionCosts = new Map<string, { total: number; count: number }>();

  warehouses.forEach((wh) => {
    const cost = calculateInventoryStorage(wh, volume, days);
    const region = wh.geoName || 'Unknown';

    const existing = regionCosts.get(region) || { total: 0, count: 0 };
    existing.total += cost;
    existing.count += 1;
    regionCosts.set(region, existing);
  });

  const regionAverages = Array.from(regionCosts.entries())
    .map(([region, data]) => ({
      region,
      average: data.total / data.count,
      count: data.count,
    }))
    .sort((a, b) => a.average - b.average);

  console.log(`\nAverage storage cost by region for ${volume}L (${days} days):`);
  regionAverages.slice(0, 10).forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.region}: ${r.average.toFixed(2)} ₽ (${r.count} warehouses)`);
  });

  console.log('\n=== Important Notes ===');
  console.log('1. INVENTORY API uses DOT format (e.g., "0.13") - parseFloat works directly');
  console.log('2. Use INVENTORY API for calculating costs of EXISTING inventory');
  console.log('3. Use SUPPLY API (ordersFBW) for planning NEW supplies');
  console.log('4. INVENTORY tariffs may differ from SUPPLY tariffs (actual vs forecast)');
  console.log('5. Always specify the date parameter for accurate tariff data');
}

// Execute if run directly
if (require.main === module) {
  main().catch(console.error);
}

export { calculateInventoryStorage };
