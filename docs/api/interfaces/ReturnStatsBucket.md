[Wildberries API TypeScript SDK](../modules.md) / ReturnStatsBucket

# Interface: ReturnStatsBucket

Defined in: types/returns.types.ts:191

Single bucket in a return statistics aggregation.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="key"></a> `key` | `string` | Group key value (string for category/orderType, number stringified for nmId) | types/returns.types.ts:193 |
| <a id="count"></a> `count` | `number` | Number of returns in this bucket | types/returns.types.ts:195 |
| <a id="totalamount"></a> `totalAmount` | `number` | Sum of returnAmount values (skipping undefined) in this bucket | types/returns.types.ts:197 |
| <a id="pendingfinancecount"></a> `pendingFinanceCount` | `number` | Number of records with returnAmount === undefined (finance not yet materialized) | types/returns.types.ts:199 |
