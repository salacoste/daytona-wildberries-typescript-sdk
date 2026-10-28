[Wildberries API TypeScript SDK](../modules.md) / CardDocument

# Interface: CardDocument

Defined in: [types/products.types.ts:1342](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1342)

A single product card document as returned by `getCardsList()`.

Documents previously passed only via the `characteristics` array are
auto-duplicated into this `documents` object by WB.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `string` | Document ID | [types/products.types.ts:1344](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1344) |
| <a id="type"></a> `type?` | [`CardDocumentType`](../type-aliases/CardDocumentType.md) | Document type. See [CardDocumentType](../type-aliases/CardDocumentType.md) for the full list of kinds. | [types/products.types.ts:1346](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1346) |
| <a id="number"></a> `number?` | `string` | Document number | [types/products.types.ts:1348](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1348) |
| <a id="productnumber"></a> `productNumber?` | `string` | Additional document number | [types/products.types.ts:1350](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1350) |
| <a id="tradename"></a> `tradeName?` | `string` | Trade name | [types/products.types.ts:1352](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1352) |
| <a id="applicant"></a> `applicant?` | `string` | Representative of the medical device manufacturer | [types/products.types.ts:1354](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1354) |
| <a id="startdate"></a> `startDate?` | `string` | Document start date and time (ISO 8601) | [types/products.types.ts:1356](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1356) |
| <a id="enddate"></a> `endDate?` | `string` | Document end date and time (ISO 8601) | [types/products.types.ts:1358](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1358) |
| <a id="isendless"></a> `isEndless?` | `boolean` | Is the document valid indefinitely: `true` — indefinite, `false` — has an expiration date | [types/products.types.ts:1360](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1360) |
| <a id="verdict"></a> `verdict?` | [`CardDocumentVerdict`](CardDocumentVerdict.md) | Document validation result (present once validation is completed) | [types/products.types.ts:1362](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1362) |
| <a id="createdat"></a> `createdAt?` | `string` | Date the document was added (ISO 8601) | [types/products.types.ts:1364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1364) |
