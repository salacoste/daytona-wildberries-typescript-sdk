[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsWarehousesResultItems

# Interface: ModelsWarehousesResultItems

Defined in: [types/orders-fbw.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-fbw.types.ts#L303)

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
| <a id="id"></a> `ID?` | `number` | ID склада | [types/orders-fbw.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-fbw.types.ts#L305) |
| <a id="name"></a> `name?` | `string` | Название склада | [types/orders-fbw.types.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-fbw.types.ts#L307) |
| <a id="address"></a> `address?` | `string` | Адрес склада | [types/orders-fbw.types.ts:309](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-fbw.types.ts#L309) |
| <a id="worktime"></a> `workTime?` | `string` | Режим работы склада | [types/orders-fbw.types.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-fbw.types.ts#L311) |
| <a id="acceptsqr"></a> `acceptsQR?` | `boolean` | Принимает ли склад QR-поставки: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:313](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-fbw.types.ts#L313) |
| <a id="isactive"></a> `isActive?` | `boolean` | Доступен ли в качестве склада назначения: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:315](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-fbw.types.ts#L315) |
| <a id="istransitactive"></a> `isTransitActive?` | `boolean` | Доступен ли в качестве транзитного склада: - `true` — да - `false` — нет | [types/orders-fbw.types.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-fbw.types.ts#L317) |
