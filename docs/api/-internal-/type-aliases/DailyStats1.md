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

Defined in: [types/promotion.types.ts:433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L433)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `date?` | `string` | Дата | [types/promotion.types.ts:435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L435) |
| `app_type_stats?` | \{ `app_type?`: `number`; `stats?`: [`Stats1`](Stats1.md); \}[] | Статистика по платформам | [types/promotion.types.ts:437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L437) |
