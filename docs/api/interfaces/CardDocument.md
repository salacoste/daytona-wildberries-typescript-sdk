[Wildberries API TypeScript SDK](../modules.md) / CardDocument

# Interface: CardDocument

Defined in: [types/products.types.ts:1268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1268)

A single product card document as returned by `getCardsList()`.

Documents previously passed only via the `characteristics` array are
auto-duplicated into this `documents` object by WB.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | Document ID | [types/products.types.ts:1270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1270) |
| <a id="type"></a> `type?` | [`CardDocumentType`](../type-aliases/CardDocumentType.md) | Document type. See [CardDocumentType](../type-aliases/CardDocumentType.md) for the full list of kinds. | [types/products.types.ts:1272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1272) |
| <a id="number"></a> `number?` | `string` | Document number | [types/products.types.ts:1274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1274) |
| <a id="productnumber"></a> `productNumber?` | `string` | Additional document number | [types/products.types.ts:1276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1276) |
| <a id="tradename"></a> `tradeName?` | `string` | Trade name | [types/products.types.ts:1278](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1278) |
| <a id="applicant"></a> `applicant?` | `string` | Representative of the medical device manufacturer | [types/products.types.ts:1280](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1280) |
| <a id="startdate"></a> `startDate?` | `string` | Document start date and time (ISO 8601) | [types/products.types.ts:1282](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1282) |
| <a id="enddate"></a> `endDate?` | `string` | Document end date and time (ISO 8601) | [types/products.types.ts:1284](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1284) |
| <a id="isendless"></a> `isEndless?` | `boolean` | Is the document valid indefinitely: `true` — indefinite, `false` — has an expiration date | [types/products.types.ts:1286](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1286) |
| <a id="verdict"></a> `verdict?` | [`CardDocumentVerdict`](CardDocumentVerdict.md) | Document validation result (present once validation is completed) | [types/products.types.ts:1288](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1288) |
| <a id="createdat"></a> `createdAt?` | `string` | Date the document was added (ISO 8601) | [types/products.types.ts:1290](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1290) |
