[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V1SetNormQueryBidsResponse

# Interface: V1SetNormQueryBidsResponse

Defined in: [types/promotion.types.ts:1910](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1910)

Ответ метода POST /api/advert/v1/normquery/bids (V1, валюта кабинета).

## Since

task-170

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="success"></a> `success` | [`V1SetNormQueryBidsSuccessItem`](V1SetNormQueryBidsSuccessItem.md)[] | Успешно обработанные ставки | [types/promotion.types.ts:1912](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1912) |
| <a id="failed"></a> `failed` | [`V1SetNormQueryBidsFailItem`](V1SetNormQueryBidsFailItem.md)[] | Отклонённые ставки с указанием причины | [types/promotion.types.ts:1914](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1914) |
