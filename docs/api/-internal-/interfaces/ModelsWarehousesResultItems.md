[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsWarehousesResultItems

# Interface: ModelsWarehousesResultItems

Defined in: [types/orders-fbw.types.ts:285](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbw.types.ts#L285)

## Example

```json
{
 "ID": 300461,
 "name": "Гомель 2",
 "address": "Гомель, Могилёвская улица 1/А",
 "workTime": "24/7",
 "acceptsQR": false,
 "isActive": false,
 "isTransitActive": true
}
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `ID?` | `number` | ID склада | [types/orders-fbw.types.ts:287](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbw.types.ts#L287) |
| <a id="name"></a> `name?` | `string` | Название склада | [types/orders-fbw.types.ts:289](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbw.types.ts#L289) |
| <a id="address"></a> `address?` | `string` | Адрес склада | [types/orders-fbw.types.ts:291](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbw.types.ts#L291) |
| <a id="worktime"></a> `workTime?` | `string` | Режим работы склада | [types/orders-fbw.types.ts:293](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbw.types.ts#L293) |
| <a id="acceptsqr"></a> `acceptsQr?` | `boolean` | Принимает ли склад QR-поставки: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbw.types.ts#L295) |
| <a id="isactive"></a> `isActive?` | `boolean` | Доступен ли в качестве склада назначения: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbw.types.ts#L297) |
| <a id="istransitactive"></a> `isTransitActive?` | `boolean` | Доступен ли в качестве транзитного склада: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/orders-fbw.types.ts#L299) |
