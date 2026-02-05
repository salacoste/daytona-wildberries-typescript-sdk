[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsDateFilterRequest

# Interface: ModelsDateFilterRequest

Defined in: [types/orders-fbw.types.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/orders-fbw.types.ts#L116)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="from"></a> `from?` | `string` | Дата начала периода | [types/orders-fbw.types.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/orders-fbw.types.ts#L118) |
| <a id="till"></a> `till?` | `string` | Дата окончания периода | [types/orders-fbw.types.ts:120](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/orders-fbw.types.ts#L120) |
| <a id="type"></a> `type` | `"factDate"` \| `"createDate"` \| `"supplyDate"` \| `"updatedDate"` | Тип дат: - `factDate` — дата фактической отгрузки поставки - `createDate` — дата создания поставки - `supplyDate` — плановая дата отгрузки поставки - `updatedDate` — дата изменения поставки | [types/orders-fbw.types.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/orders-fbw.types.ts#L122) |
