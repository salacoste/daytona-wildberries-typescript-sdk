[Wildberries API TypeScript SDK](../modules.md) / ProductListResponse

# Interface: ProductListResponse

Defined in: [types/products.types.ts:948](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L948)

Response from listing product cards

## Example

```typescript
const response: ProductListResponse = {
  cards: [{ nmID: 12345, vendorCode: 'VENDOR-001', ... }],
  cursor: {
    total: 150,
    updatedAt: '2025-01-01T00:00:00Z',
    nmID: 12345
  }
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cards"></a> `cards?` | [`ProductCard`](ProductCard.md)[] | Array of product cards | [types/products.types.ts:950](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L950) |
| <a id="cursor"></a> `cursor?` | \{ `total?`: `number`; `updatedAt?`: `string`; `nmID?`: `number`; \} | Pagination cursor | [types/products.types.ts:952](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L952) |
| `cursor.total?` | `number` | Total cards in response | [types/products.types.ts:954](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L954) |
| `cursor.updatedAt?` | `string` | Cursor for next page | [types/products.types.ts:956](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L956) |
| `cursor.nmID?` | `number` | Cursor for next page | [types/products.types.ts:958](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/products.types.ts#L958) |
