[Wildberries API TypeScript SDK](../modules.md) / validateMergedCardVariants

# Function: validateMergedCardVariants()

```ts
function validateMergedCardVariants(characteristics: SubjectCharacteristic[], variants: MergedCardVariant[]): MergedCardValidationResult;
```

Defined in: utils/validateMergedCardVariants.ts:54

Client-side validator for merged product card variants.

Checks that:
1. All variants share the same value for `isVariable: false` characteristics (fixed chars).
2. No two variants have identical combinations of `isVariable: true` values (duplicate variants).
3. Optionally flags variable characteristics that don't actually vary across variants.

This is a best-effort client-side hint. The Wildberries API is the final authority —
a validation pass here doesn't guarantee API acceptance.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characteristics` | [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[] | All characteristics for the category (from `getObjectCharc()`) |
| `variants` | [`MergedCardVariant`](../interfaces/MergedCardVariant.md)[] | Variants planned for the merged card |

## Returns

[`MergedCardValidationResult`](../interfaces/MergedCardValidationResult.md)

Validation result with violations grouped by type

## Example

```typescript
const charcs = await sdk.products.getObjectCharc(2314);
const result = validateMergedCardVariants(charcs.data ?? [], [
  { characteristics: [{ id: 91, value: 'Acme' }, { id: 14177449, value: 'Red' }] },
  { characteristics: [{ id: 91, value: 'Acme' }, { id: 14177449, value: 'Blue' }] },
]);
if (result.divergentFixedChars.length > 0) {
  throw new Error(`Fixed chars differ: ${result.divergentFixedChars.map(c => c.name).join(', ')}`);
}
```

## Since

v3.9.2
