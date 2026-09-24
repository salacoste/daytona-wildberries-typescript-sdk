[Wildberries API TypeScript SDK](../modules.md) / CardListingValidationReason

# Type Alias: CardListingValidationReason

```ts
type CardListingValidationReason = 
  | "tnved_missing"
  | "supplier_inn_missing"
  | "supplier_not_registered"
  | "supplier_inactive"
  | "product_group_not_registered"
  | "kiz_required"
  | "kiz_certificate_missing";
```

Defined in: [types/products.types.ts:1215](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1215)

Reason a card listing failed validation.
Returned for `overallVerdict.status: 2` (validation rejected) in `getCardsList()` responses.

## Since

4.3.0
