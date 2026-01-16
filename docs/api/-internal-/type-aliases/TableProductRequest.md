[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableProductRequest

# Type Alias: TableProductRequest

```ts
type TableProductRequest = CommonProductFilters & {
  limit?: number;
  offset: number;
};
```

Defined in: [types/analytics.types.ts:1338](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1338)

Параметры запроса об остатках по товарам

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `limit?` | `number` | Количество товаров в ответе | [types/analytics.types.ts:1340](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1340) |
| `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:1342](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1342) |
