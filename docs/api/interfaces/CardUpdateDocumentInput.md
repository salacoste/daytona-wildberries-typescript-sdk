[Wildberries API TypeScript SDK](../modules.md) / CardUpdateDocumentInput

# Interface: CardUpdateDocumentInput

Defined in: [types/products.types.ts:1166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1166)

A single product card document in update requests (`createCardsUpdate()`).

⚠️ **Card update OVERWRITES the card** — pass ALL documents, including the
unchanged ones, or the omitted documents are dropped. Reuse the `id` of an
existing document (from `getCardsList()` → `documents.items[].id`) to keep it.

## Since

4.3.0

## Extends

- [`CardDocumentInput`](CardDocumentInput.md)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="type"></a> `type?` | [`CardDocumentType`](../type-aliases/CardDocumentType.md) | Document type. See [CardDocumentType](../type-aliases/CardDocumentType.md) for the full list of kinds. | [`CardDocumentInput`](CardDocumentInput.md).[`type`](CardDocumentInput.md#type) | [types/products.types.ts:1121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1121) |
| <a id="number"></a> `number?` | `string` | Document number | [`CardDocumentInput`](CardDocumentInput.md).[`number`](CardDocumentInput.md#number) | [types/products.types.ts:1123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1123) |
| <a id="productnumber"></a> `productNumber?` | `string` | Additional document number | [`CardDocumentInput`](CardDocumentInput.md).[`productNumber`](CardDocumentInput.md#productnumber) | [types/products.types.ts:1125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1125) |
| <a id="tradename"></a> `tradeName?` | `string` | Trade name | [`CardDocumentInput`](CardDocumentInput.md).[`tradeName`](CardDocumentInput.md#tradename) | [types/products.types.ts:1127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1127) |
| <a id="applicant"></a> `applicant?` | `string` | Representative of the medical device manufacturer | [`CardDocumentInput`](CardDocumentInput.md).[`applicant`](CardDocumentInput.md#applicant) | [types/products.types.ts:1129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1129) |
| <a id="startdate"></a> `startDate?` | `string` | Document start date and time (ISO 8601, e.g. `2025-01-15T00:00:00Z`) | [`CardDocumentInput`](CardDocumentInput.md).[`startDate`](CardDocumentInput.md#startdate) | [types/products.types.ts:1131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1131) |
| <a id="enddate"></a> `endDate?` | `string` | Document end date and time (ISO 8601). Omit when `isEndless: true` | [`CardDocumentInput`](CardDocumentInput.md).[`endDate`](CardDocumentInput.md#enddate) | [types/products.types.ts:1133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1133) |
| <a id="isendless"></a> `isEndless?` | `boolean` | Is the document valid indefinitely: `true` — indefinite, `false` — has an expiration date | [`CardDocumentInput`](CardDocumentInput.md).[`isEndless`](CardDocumentInput.md#isendless) | [types/products.types.ts:1135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1135) |
| <a id="id"></a> `id?` | `string` | Document ID (from `getCardsList()` response). Identifies an already-attached document | - | [types/products.types.ts:1168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1168) |
