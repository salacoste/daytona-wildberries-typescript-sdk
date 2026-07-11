[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableGroupRequestSt

# Type Alias: TableGroupRequestSt

```ts
type TableGroupRequestSt = CommonReportFilters & {
  limit?: number;
  offset: number;
};
```

Defined in: [types/analytics.types.ts:938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L938)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `limit?` | `number` | Количество групп в ответе | [types/analytics.types.ts:940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L940) |
| `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L942) |
