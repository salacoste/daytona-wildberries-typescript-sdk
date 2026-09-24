[Wildberries API TypeScript SDK](../modules.md) / CardDocumentReason

# Type Alias: CardDocumentReason

```ts
type CardDocumentReason = 
  | "document_missing"
  | "document_not_found"
  | "document_inactive"
  | "document_expired"
  | "applicant_mismatch"
  | "trade_name_mismatch"
  | "unknown"
  | "document_type_mismatch"
  | "document_dates_mismatch";
```

Defined in: [types/products.types.ts:1198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1198)

Reason a card document failed validation.
Returned for `verdict.status: 2` (validation rejected) in `getCardsList()` responses.

## Since

4.3.0
