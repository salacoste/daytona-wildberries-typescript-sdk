# Product Catalog Sync

Synchronize your product catalog with Wildberries.

## Description

This use case demonstrates how to manage your product catalog on Wildberries, including listing products, updating information, and syncing with external systems.

## Get All Products

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get all products using the helper method (handles pagination automatically)
async function getAllProducts() {
  const products = await sdk.products.getAllProducts({
    locale: 'ru',
    withPhoto: 1  // Include photo URLs
  });

  console.log(`Total products: ${products.length}`);
  return products;
}

const products = await getAllProducts();
```

## Get Products with Filtering

```typescript
// Get products with specific settings
async function getProductsFiltered() {
  const response = await sdk.products.listProducts({
    limit: 100,
    offset: 0,
    locale: 'ru',
    withPhoto: 1
  });

  // Filter by specific criteria
  const activeProducts = response.cards?.filter(
    card => card.nmID && !card.trash
  );

  return activeProducts;
}
```

## Get Categories Structure

```typescript
interface CategoryTree {
  id: number;
  name: string;
  children: CategoryTree[];
}

async function getCategoryTree(): Promise<CategoryTree[]> {
  // Get parent categories
  const parents = await sdk.products.getParentAll();

  const tree: CategoryTree[] = [];

  for (const parent of parents.data ?? []) {
    // Get child categories for each parent
    const children = await sdk.products.getObjectAll({
      parentID: parent.id
    });

    tree.push({
      id: parent.id,
      name: parent.name,
      children: children.data?.map(child => ({
        id: child.objectID,
        name: child.objectName,
        children: []
      })) ?? []
    });
  }

  return tree;
}
```

## Get Product Characteristics

```typescript
// Get required characteristics for a category
async function getCategoryCharacteristics(categoryId: number) {
  const characteristics = await sdk.products.getObjectCharc(categoryId);

  const required = characteristics.data?.filter(c => c.required);
  const optional = characteristics.data?.filter(c => !c.required);

  console.log(`Category ${categoryId}:`);
  console.log(`  Required: ${required?.length ?? 0} characteristics`);
  console.log(`  Optional: ${optional?.length ?? 0} characteristics`);

  return { required, optional };
}
```

## Sync Products from External System

```typescript
interface ExternalProduct {
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  barcode: string;
}

async function syncFromExternalSystem(externalProducts: ExternalProduct[]) {
  // 1. Get existing WB products
  const wbProducts = await sdk.products.getAllProducts({ locale: 'ru' });

  // 2. Create lookup map
  const wbProductMap = new Map(
    wbProducts.map(p => [p.vendorCode, p])
  );

  // 3. Identify products to update
  const updates: { nmId: number; price: number }[] = [];
  const stockUpdates: { sku: string; amount: number }[] = [];

  for (const ext of externalProducts) {
    const wbProduct = wbProductMap.get(ext.sku);

    if (wbProduct) {
      // Check if price needs update
      if (wbProduct.sizes?.[0]?.price !== ext.price) {
        updates.push({
          nmId: wbProduct.nmID,
          price: ext.price
        });
      }

      // Always sync stock
      stockUpdates.push({
        sku: ext.barcode,
        amount: ext.stock
      });
    }
  }

  // 4. Apply updates
  if (updates.length > 0) {
    await sdk.products.updatePrices(updates);
    console.log(`Updated prices for ${updates.length} products`);
  }

  console.log(`Sync complete: ${updates.length} price updates`);
}
```

## Export Product Catalog

```typescript
interface CatalogExport {
  nmId: number;
  vendorCode: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  photos: string[];
  barcode: string;
  stock: number;
}

async function exportCatalog(): Promise<CatalogExport[]> {
  // Get all products
  const products = await sdk.products.getAllProducts({
    locale: 'ru',
    withPhoto: 1
  });

  // Get stock levels
  const stocks = await sdk.reports.getStocks(
    new Date().toISOString().split('T')[0]
  );

  const stockMap = new Map(
    stocks.map(s => [s.nmId, s.quantity])
  );

  // Build export
  return products.map(p => ({
    nmId: p.nmID,
    vendorCode: p.vendorCode ?? '',
    title: p.title ?? '',
    brand: p.brand ?? '',
    category: p.subjectName ?? '',
    price: p.sizes?.[0]?.price ?? 0,
    discountPrice: p.sizes?.[0]?.discountedPrice,
    photos: p.photos?.map(ph => ph.big ?? '') ?? [],
    barcode: p.sizes?.[0]?.skus?.[0] ?? '',
    stock: stockMap.get(p.nmID) ?? 0
  }));
}

// Usage
const catalog = await exportCatalog();
console.log(`Exported ${catalog.length} products`);

// Save to JSON
import { writeFileSync } from 'fs';
writeFileSync('catalog.json', JSON.stringify(catalog, null, 2));
```

## Monitor Product Status

```typescript
async function checkProductHealth() {
  const products = await sdk.products.getAllProducts({ locale: 'ru' });
  const stocks = await sdk.reports.getStocks(
    new Date().toISOString().split('T')[0]
  );

  const stockMap = new Map(stocks.map(s => [s.nmId, s.quantity]));

  const issues = {
    outOfStock: [] as number[],
    lowStock: [] as number[],
    noPhotos: [] as number[],
    noPrice: [] as number[]
  };

  for (const product of products) {
    const stock = stockMap.get(product.nmID) ?? 0;

    if (stock === 0) {
      issues.outOfStock.push(product.nmID);
    } else if (stock < 5) {
      issues.lowStock.push(product.nmID);
    }

    if (!product.photos?.length) {
      issues.noPhotos.push(product.nmID);
    }

    if (!product.sizes?.[0]?.price) {
      issues.noPrice.push(product.nmID);
    }
  }

  console.log('Product Health Report:');
  console.log(`  Out of stock: ${issues.outOfStock.length}`);
  console.log(`  Low stock (<5): ${issues.lowStock.length}`);
  console.log(`  No photos: ${issues.noPhotos.length}`);
  console.log(`  No price: ${issues.noPrice.length}`);

  return issues;
}
```

## Related Materials

- [API Reference: ProductsModule](/api/classes/ProductsModule)
- [Pricing Updates](pricing-updates.md)
- [Stock Management](stock-management.md)

---

[Back to Examples](../index.md) | [Next: Pricing Updates](pricing-updates.md)
