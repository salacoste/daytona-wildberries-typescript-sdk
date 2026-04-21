[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0SetMinusNormQueryRequest

# Interface: V0SetMinusNormQueryRequest

Defined in: [types/promotion.types.ts:1022](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/promotion.types.ts#L1022)

Запрос на установку/удаление минус-фраз

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | ID кампании | [types/promotion.types.ts:1024](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/promotion.types.ts#L1024) |
| <a id="nm_id"></a> `nm_id` | `number` | Артикул WB | [types/promotion.types.ts:1026](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/promotion.types.ts#L1026) |
| <a id="norm_queries"></a> `norm_queries` | `string`[] | Поисковые кластеры (минус-фразы, макс. 1000). Пустой массив удаляет все минус-фразы | [types/promotion.types.ts:1028](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/promotion.types.ts#L1028) |
