[Wildberries API TypeScript SDK](../modules.md) / PayoutFilters

# Interface: PayoutFilters

Defined in: [types/finances.types.ts:410](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L410)

Payout filters for querying payout history
Optional parameters for filtering payout list

## Indexable

```ts
[key: string]: string | number | undefined
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `string` | Start date for payout search (ISO 8601 format) | [types/finances.types.ts:412](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L412) |
| <a id="dateto"></a> `dateTo?` | `string` | End date for payout search (ISO 8601 format) | [types/finances.types.ts:414](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L414) |
| <a id="status"></a> `status?` | [`PayoutStatus`](../type-aliases/PayoutStatus.md) | Filter by payout status | [types/finances.types.ts:416](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L416) |
| <a id="bankaccount"></a> `bankAccount?` | `string` | Filter by bank account (last 4 digits or identifier) | [types/finances.types.ts:418](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L418) |
| <a id="limit"></a> `limit?` | `number` | Maximum number of results to return | [types/finances.types.ts:420](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L420) |
| <a id="offset"></a> `offset?` | `number` | Offset for pagination | [types/finances.types.ts:422](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L422) |
