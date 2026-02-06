[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsWarehousesResultItems

# Interface: ModelsWarehousesResultItems

Defined in: [types/orders-fbw.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/orders-fbw.types.ts#L297)

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
| <a id="id"></a> `ID?` | `number` | ID склада | [types/orders-fbw.types.ts:299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/orders-fbw.types.ts#L299) |
| <a id="name"></a> `name?` | `string` | Название склада | [types/orders-fbw.types.ts:301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/orders-fbw.types.ts#L301) |
| <a id="address"></a> `address?` | `string` | Адрес склада | [types/orders-fbw.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/orders-fbw.types.ts#L303) |
| <a id="worktime"></a> `workTime?` | `string` | Режим работы склада | [types/orders-fbw.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/orders-fbw.types.ts#L305) |
| <a id="acceptsqr"></a> `acceptsQR?` | `boolean` | Принимает ли склад QR-поставки: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/orders-fbw.types.ts#L307) |
| <a id="isactive"></a> `isActive?` | `boolean` | Доступен ли в качестве склада назначения: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:309](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/orders-fbw.types.ts#L309) |
| <a id="istransitactive"></a> `isTransitActive?` | `boolean` | Доступен ли в качестве транзитного склада: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/orders-fbw.types.ts#L311) |
