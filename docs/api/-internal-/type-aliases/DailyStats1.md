[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DailyStats1

# Type Alias: DailyStats1

```ts
type DailyStats1 = {
  date?: string;
  app_type_stats?: {
     app_type?: number;
     stats?: Stats1;
  }[];
}[];
```

Defined in: [types/promotion.types.ts:425](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/promotion.types.ts#L425)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `date?` | `string` | Дата | [types/promotion.types.ts:427](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/promotion.types.ts#L427) |
| `app_type_stats?` | \{ `app_type?`: `number`; `stats?`: [`Stats1`](Stats1.md); \}[] | Статистика по платформам | [types/promotion.types.ts:429](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/promotion.types.ts#L429) |
