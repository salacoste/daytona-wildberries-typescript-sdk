[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableGroupRequestSt

# Type Alias: TableGroupRequestSt

```ts
type TableGroupRequestSt = CommonReportFilters & {
  limit?: number;
  offset: number;
};
```

Defined in: [types/analytics.types.ts:879](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/analytics.types.ts#L879)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `limit?` | `number` | Количество групп в ответе | [types/analytics.types.ts:881](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/analytics.types.ts#L881) |
| `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:883](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/analytics.types.ts#L883) |
