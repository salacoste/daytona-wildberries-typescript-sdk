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

Defined in: [types/promotion.types.ts:499](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L499)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `date?` | `string` | Дата | [types/promotion.types.ts:501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L501) |
| `app_type_stats?` | \{ `app_type?`: `number`; `stats?`: [`Stats2`](Stats2.md); \}[] | Статистика по платформам | [types/promotion.types.ts:503](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L503) |
