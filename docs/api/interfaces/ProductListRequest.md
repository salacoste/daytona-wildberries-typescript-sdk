[Wildberries API TypeScript SDK](../modules.md) / ProductListRequest

# Interface: ProductListRequest

Defined in: [types/products.types.ts:837](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L837)

Request body for listing product cards with filtering and pagination

**Pagination:** Cursor-based for >100 products (use limit max 100, updatedAt + nmID for next page)
**Note:** Excludes products in trash

**Rate limit:** 100 req/min, 600ms interval

## Example

```typescript
// First page
const page1: ProductListRequest = {
  filter: { withPhoto: 1, brands: ['My Brand'] },
  cursor: { limit: 100 }
};

// Next page using cursor
const page2: ProductListRequest = {
  filter: { withPhoto: 1, brands: ['My Brand'] },
  cursor: {
    limit: 100,
    updatedAt: page1Response.cursor.updatedAt,
    nmID: page1Response.cursor.nmID
  }
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sort"></a> `sort?` | \{ `ascending?`: `boolean`; \} | Sort settings | [types/products.types.ts:839](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L839) |
| `sort.ascending?` | `boolean` | Sort by updatedAt (false = descending, default) | [types/products.types.ts:841](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L841) |
| <a id="filter"></a> `filter?` | [`ProductListFilter`](ProductListFilter.md) | Filter criteria | [types/products.types.ts:844](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L844) |
| <a id="cursor"></a> `cursor?` | [`ProductListCursor`](ProductListCursor.md) | Pagination cursor | [types/products.types.ts:846](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L846) |
