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

Defined in: [types/products.types.ts:1272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1272)

Reason a card document failed validation.
Returned for `verdict.status: 2` (validation rejected) in `getCardsList()` responses.

## Since

4.3.0
