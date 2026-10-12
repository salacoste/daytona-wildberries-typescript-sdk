[Wildberries API TypeScript SDK](../modules.md) / CardDocumentVerdict

# Interface: CardDocumentVerdict

Defined in: [types/products.types.ts:1304](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1304)

Validation verdict of a single card document.
Returned in `getCardsList()` responses when the document validation is completed.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="verified"></a> `verified?` | `boolean` | `true` — the document is validated, `false` — not validated | [types/products.types.ts:1306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1306) |
| <a id="status"></a> `status?` | `number` | Document validation result: `1` — validation passed, `2` — validation rejected | [types/products.types.ts:1308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1308) |
| <a id="reason"></a> `reason?` | [`CardDocumentReason`](../type-aliases/CardDocumentReason.md) \| `null` | Validation error, returned for `status: 2`. See [CardDocumentReason](../type-aliases/CardDocumentReason.md) | [types/products.types.ts:1310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1310) |
| <a id="additionaldata"></a> `additionalData?` | `Record`\<`string`, `unknown`\> \| `null` | Additional data | [types/products.types.ts:1312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1312) |
| <a id="createdat"></a> `createdAt?` | `string` | Listing validation date (ISO 8601) | [types/products.types.ts:1314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1314) |
