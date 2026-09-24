[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsWarehousesResultItems

# Interface: ModelsWarehousesResultItems

Defined in: [types/orders-fbw.types.ts:397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L397)

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
| <a id="id"></a> `ID?` | `number` | ID склада | [types/orders-fbw.types.ts:399](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L399) |
| <a id="name"></a> `name?` | `string` | Название склада | [types/orders-fbw.types.ts:401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L401) |
| <a id="address"></a> `address?` | `string` | Адрес склада | [types/orders-fbw.types.ts:403](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L403) |
| <a id="worktime"></a> `workTime?` | `string` | Режим работы склада | [types/orders-fbw.types.ts:405](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L405) |
| <a id="acceptsqr"></a> `acceptsQR?` | `boolean` | Принимает ли склад QR-поставки: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L407) |
| <a id="isactive"></a> `isActive?` | `boolean` | Доступен ли в качестве склада назначения: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L409) |
| <a id="istransitactive"></a> `isTransitActive?` | `boolean` | Доступен ли в качестве транзитного склада: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L411) |
