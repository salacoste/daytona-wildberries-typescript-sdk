[Wildberries API TypeScript SDK](../modules.md) / CardDocumentVerdict

# Interface: CardDocumentVerdict

Defined in: [types/products.types.ts:1230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1230)

Validation verdict of a single card document.
Returned in `getCardsList()` responses when the document validation is completed.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="verified"></a> `verified?` | `boolean` | `true` — the document is validated, `false` — not validated | [types/products.types.ts:1232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1232) |
| <a id="status"></a> `status?` | `number` | Document validation result: `1` — validation passed, `2` — validation rejected | [types/products.types.ts:1234](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1234) |
| <a id="reason"></a> `reason?` | [`CardDocumentReason`](../type-aliases/CardDocumentReason.md) \| `null` | Validation error, returned for `status: 2`. See [CardDocumentReason](../type-aliases/CardDocumentReason.md) | [types/products.types.ts:1236](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1236) |
| <a id="additionaldata"></a> `additionalData?` | `Record`\<`string`, `unknown`\> \| `null` | Additional data | [types/products.types.ts:1238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1238) |
| <a id="createdat"></a> `createdAt?` | `string` | Listing validation date (ISO 8601) | [types/products.types.ts:1240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1240) |
