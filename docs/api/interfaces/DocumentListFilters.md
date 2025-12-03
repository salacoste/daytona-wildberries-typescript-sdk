[Wildberries API TypeScript SDK](../modules.md) / DocumentListFilters

# Interface: DocumentListFilters

Defined in: [types/finances.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L266)

Document list query parameters

## Indexable

```ts
[key: string]: string | number | undefined
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="locale"></a> `locale?` | `"ru"` \| `"en"` \| `"zh"` | Language for category field: 'ru', 'en', or 'zh' | [types/finances.types.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L268) |
| <a id="begintime"></a> `beginTime?` | `string` | Period start date (requires endTime) | [types/finances.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L270) |
| <a id="endtime"></a> `endTime?` | `string` | Period end date (requires beginTime) | [types/finances.types.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L272) |
| <a id="sort"></a> `sort?` | `"date"` \| `"category"` | Sort by: 'date' or 'category' | [types/finances.types.ts:274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L274) |
| <a id="order"></a> `order?` | `"asc"` \| `"desc"` | Sort order: 'asc' or 'desc' | [types/finances.types.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L276) |
| <a id="category"></a> `category?` | `string` | Filter by category name | [types/finances.types.ts:278](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L278) |
| <a id="page"></a> `page?` | `number` | Page number for pagination | [types/finances.types.ts:280](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L280) |
