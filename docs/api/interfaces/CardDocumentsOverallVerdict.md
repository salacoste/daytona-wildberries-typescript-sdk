[Wildberries API TypeScript SDK](../modules.md) / CardDocumentsOverallVerdict

# Interface: CardDocumentsOverallVerdict

Defined in: [types/products.types.ts:1249](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1249)

Overall validation verdict of the card listing documents.
Returned in `getCardsList()` responses when the validation is completed.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="isfullychecked"></a> `isFullyChecked?` | `boolean` | `true` — the listing is validated, `false` — not validated | [types/products.types.ts:1251](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1251) |
| <a id="status"></a> `status?` | `number` | Listing validation result: `1` — validation passed, `2` — validation rejected | [types/products.types.ts:1253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1253) |
| <a id="reason"></a> `reason?` | \| [`CardListingValidationReason`](../type-aliases/CardListingValidationReason.md) \| `null` | Validation error, returned for `status: 2`. See [CardListingValidationReason](../type-aliases/CardListingValidationReason.md) | [types/products.types.ts:1255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1255) |
| <a id="createdat"></a> `createdAt?` | `string` | Listing validation date and time (ISO 8601) | [types/products.types.ts:1257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1257) |
