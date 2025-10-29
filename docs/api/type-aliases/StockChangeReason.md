[Wildberries API TypeScript SDK](../modules.md) / StockChangeReason

# Type Alias: StockChangeReason

```ts
type StockChangeReason = "sale" | "return" | "adjustment" | "transfer" | "damaged" | "lost";
```

Defined in: [types/analytics.types.ts:492](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L492)

Stock change reason enumeration

Represents the various reasons why stock levels change:
- `sale`: Normal product sales (most common)
- `return`: Customer returns increasing stock
- `adjustment`: Manual corrections from inventory audits
- `transfer`: Movement between warehouses
- `damaged`: Damaged goods removal
- `lost`: Lost or stolen inventory write-offs
