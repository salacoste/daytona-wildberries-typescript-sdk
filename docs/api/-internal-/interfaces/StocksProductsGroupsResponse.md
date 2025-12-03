[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksProductsGroupsResponse

# Interface: StocksProductsGroupsResponse

Defined in: [types/analytics.types.ts:1259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1259)

Response from stocks products groups endpoint

## Extends

- [`ResponseError`](ResponseError.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `boolean` | Error occurred flag | [`ResponseError`](ResponseError.md).[`error`](ResponseError.md#error) | [types/analytics.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L169) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [`ResponseError`](ResponseError.md).[`errorText`](ResponseError.md#errortext) | [types/analytics.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L171) |
| <a id="additionalerrors"></a> `additionalErrors?` | \| \{ `field`: `string`; `description`: `string`; \}[] \| `null` | Additional error details (field-level errors) | [`ResponseError`](ResponseError.md).[`additionalErrors`](ResponseError.md#additionalerrors) | [types/analytics.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L173) |
| <a id="data"></a> `data` | \{ `groups`: [`StocksGroupItem`](StocksGroupItem.md)[]; `isNextPage?`: `boolean`; \} | - | - | [types/analytics.types.ts:1260](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1260) |
| `data.groups` | [`StocksGroupItem`](StocksGroupItem.md)[] | List of stock groups | - | [types/analytics.types.ts:1262](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1262) |
| `data.isNextPage?` | `boolean` | Is there a next page | - | [types/analytics.types.ts:1264](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1264) |
