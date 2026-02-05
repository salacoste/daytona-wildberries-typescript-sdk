[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DailyStats2

# Type Alias: DailyStats2

```ts
type DailyStats2 = {
  date?: string;
  app_type_stats?: {
     app_type?: number;
     stats?: Stats2;
  }[];
}[];
```

Defined in: [types/promotion.types.ts:491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L491)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `date?` | `string` | Дата | [types/promotion.types.ts:493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L493) |
| `app_type_stats?` | \{ `app_type?`: `number`; `stats?`: [`Stats2`](Stats2.md); \}[] | Статистика по платформам | [types/promotion.types.ts:495](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/promotion.types.ts#L495) |
