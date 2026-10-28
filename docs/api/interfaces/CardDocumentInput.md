[Wildberries API TypeScript SDK](../modules.md) / CardDocumentInput

# Interface: CardDocumentInput

Defined in: [types/products.types.ts:1193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1193)

A single product card document in create requests.
Used in `createCardsUpload()` (per variant), `createUploadAdd()` (per card to add).

⚠️ **WB recommends passing documents ONLY through this `documents` object.**
Passing documents via the `characteristics` array is now restricted: it keeps working
only if the `documents` object was never used for the card AND the "Documents" block
in the new WB seller cabinet was never filled — otherwise characteristics-based
documents may be processed incorrectly.

## Since

4.3.0

## Example

```typescript
const documents: CardDocumentsRequest = {
  items: [
    {
      type: 1, // Certificate of Conformity
      number: 'RU D-RU.АГ01.В.12345',
      tradeName: 'Product Trade Name',
      startDate: '2025-01-15T00:00:00Z',
      endDate: '2028-01-14T23:59:59Z',
      isEndless: false,
    },
  ],
};
```

## Extended by

- [`CardUpdateDocumentInput`](CardUpdateDocumentInput.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="type"></a> `type?` | [`CardDocumentType`](../type-aliases/CardDocumentType.md) | Document type. See [CardDocumentType](../type-aliases/CardDocumentType.md) for the full list of kinds. | [types/products.types.ts:1195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1195) |
| <a id="number"></a> `number?` | `string` | Document number | [types/products.types.ts:1197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1197) |
| <a id="productnumber"></a> `productNumber?` | `string` | Additional document number | [types/products.types.ts:1199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1199) |
| <a id="tradename"></a> `tradeName?` | `string` | Trade name | [types/products.types.ts:1201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1201) |
| <a id="applicant"></a> `applicant?` | `string` | Representative of the medical device manufacturer | [types/products.types.ts:1203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1203) |
| <a id="startdate"></a> `startDate?` | `string` | Document start date and time (ISO 8601, e.g. `2025-01-15T00:00:00Z`) | [types/products.types.ts:1205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1205) |
| <a id="enddate"></a> `endDate?` | `string` | Document end date and time (ISO 8601). Omit when `isEndless: true` | [types/products.types.ts:1207](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1207) |
| <a id="isendless"></a> `isEndless?` | `boolean` | Is the document valid indefinitely: `true` — indefinite, `false` — has an expiration date | [types/products.types.ts:1209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1209) |
