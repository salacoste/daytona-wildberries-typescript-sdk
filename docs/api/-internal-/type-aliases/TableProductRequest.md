[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableProductRequest

# Type Alias: TableProductRequest

```ts
type TableProductRequest = CommonProductFilters & {
  limit?: number;
  offset: number;
};
```

Defined in: [types/analytics.types.ts:1150](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/analytics.types.ts#L1150)

Параметры запроса об остатках по товарам

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `limit?` | `number` | Количество товаров в ответе | [types/analytics.types.ts:1152](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/analytics.types.ts#L1152) |
| `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:1154](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/analytics.types.ts#L1154) |
