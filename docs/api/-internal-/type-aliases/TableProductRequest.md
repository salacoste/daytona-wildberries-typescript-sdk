[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableProductRequest

# Type Alias: TableProductRequest

```ts
type TableProductRequest = CommonProductFilters & {
  limit?: number;
  offset: number;
};
```

Defined in: [types/analytics.types.ts:1385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L1385)

Параметры запроса об остатках по товарам

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `limit?` | `number` | Количество товаров в ответе | [types/analytics.types.ts:1387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L1387) |
| `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:1389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L1389) |
