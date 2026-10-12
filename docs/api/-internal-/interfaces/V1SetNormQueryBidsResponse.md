[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V1SetNormQueryBidsResponse

# Interface: V1SetNormQueryBidsResponse

Defined in: [types/promotion.types.ts:1927](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L1927)

Ответ метода POST /api/advert/v1/normquery/bids (V1, валюта кабинета).

## Since

task-170

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="success"></a> `success` | [`V1SetNormQueryBidsSuccessItem`](V1SetNormQueryBidsSuccessItem.md)[] | Успешно обработанные ставки | [types/promotion.types.ts:1929](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L1929) |
| <a id="failed"></a> `failed` | [`V1SetNormQueryBidsFailItem`](V1SetNormQueryBidsFailItem.md)[] | Отклонённые ставки с указанием причины | [types/promotion.types.ts:1931](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L1931) |
