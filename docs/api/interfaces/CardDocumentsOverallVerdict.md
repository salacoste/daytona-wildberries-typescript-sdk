[Wildberries API TypeScript SDK](../modules.md) / CardDocumentsOverallVerdict

# Interface: CardDocumentsOverallVerdict

Defined in: [types/products.types.ts:1323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1323)

Overall validation verdict of the card listing documents.
Returned in `getCardsList()` responses when the validation is completed.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="isfullychecked"></a> `isFullyChecked?` | `boolean` | `true` — the listing is validated, `false` — not validated | [types/products.types.ts:1325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1325) |
| <a id="status"></a> `status?` | `number` | Listing validation result: `1` — validation passed, `2` — validation rejected | [types/products.types.ts:1327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1327) |
| <a id="reason"></a> `reason?` | \| [`CardListingValidationReason`](../type-aliases/CardListingValidationReason.md) \| `null` | Validation error, returned for `status: 2`. See [CardListingValidationReason](../type-aliases/CardListingValidationReason.md) | [types/products.types.ts:1329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1329) |
| <a id="createdat"></a> `createdAt?` | `string` | Listing validation date and time (ISO 8601) | [types/products.types.ts:1331](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1331) |
