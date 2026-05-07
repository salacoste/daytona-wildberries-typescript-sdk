[Wildberries API TypeScript SDK](../modules.md) / validateMergedCardVariants

# Function: validateMergedCardVariants()

```ts
function validateMergedCardVariants(
   characteristics: SubjectCharacteristic[], 
   variants: MergedCardVariant[], 
   namedFieldsPerVariant?: Record<string, unknown>[]): MergedCardValidationResult;
```

Defined in: [utils/validateMergedCardVariants.ts:79](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/utils/validateMergedCardVariants.ts#L79)

Client-side validator for merged product card variants.

Checks that:
1. All variants share the same value for `isVariable: false` characteristics (fixed chars).
2. No two variants have identical combinations of `isVariable: true` values (duplicate variants).
3. Optionally flags variable characteristics that don't actually vary across variants.

**v3.10.2 update**: added optional `namedFieldsPerVariant` parameter — an array (one map per
variant by index) — to correctly handle WB API characteristics with `existNamedField: true`
(e.g. `brand`, `height`, `length`, `name`, `width`, `weight`) which are submitted as top-level
card fields rather than inside the variant `characteristics[]` array.

Without the `namedFieldsPerVariant` parameter the helper falls back to legacy behaviour and
emits a one-time `console.warn` whenever a required `existNamedField: true` characteristic is
encountered — this may cause false positives.

This is a best-effort client-side hint. The Wildberries API is the final authority —
a validation pass here doesn't guarantee API acceptance.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characteristics` | [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[] | All characteristics for the category (from `getObjectCharc()`) |
| `variants` | [`MergedCardVariant`](../interfaces/MergedCardVariant.md)[] | Variants planned for the merged card |
| `namedFieldsPerVariant?` | `Record`\<`string`, `unknown`\>[] | Optional array of named-field maps, one per variant (by index). Each map holds top-level field values (brand, height, etc.) keyed by characteristic name. |

## Returns

[`MergedCardValidationResult`](../interfaces/MergedCardValidationResult.md)

Validation result with violations grouped by type

## Examples

```typescript
const charcs = await sdk.products.getObjectCharc(2314);
const result = validateMergedCardVariants(
  charcs.data ?? [],
  [
    { characteristics: [{ id: 14177449, value: 'Red' }] },
    { characteristics: [{ id: 14177449, value: 'Blue' }] },
  ],
  [
    { brand: 'Acme', height: 10 },
    { brand: 'Acme', height: 10 },
  ]
);
if (result.divergentFixedChars.length > 0) {
  throw new Error(`Fixed chars differ: ${result.divergentFixedChars.map(c => c.name).join(', ')}`);
}
```

```typescript
const result = validateMergedCardVariants(charcs.data ?? [], variants);
```

## See

CHANGELOG v3.10.2 for migration details

## Since

v3.9.2
