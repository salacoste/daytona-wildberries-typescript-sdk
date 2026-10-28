[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0SetMinusNormQueryRequest

# Interface: V0SetMinusNormQueryRequest

Defined in: [types/promotion.types.ts:1176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L1176)

Запрос на установку/удаление минус-фраз

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | ID кампании | [types/promotion.types.ts:1178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L1178) |
| <a id="nm_id"></a> `nm_id` | `number` | Артикул WB | [types/promotion.types.ts:1180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L1180) |
| <a id="norm_queries"></a> `norm_queries` | `string`[] | Поисковые кластеры (минус-фразы, макс. 1000). Пустой массив удаляет все минус-фразы | [types/promotion.types.ts:1182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L1182) |
