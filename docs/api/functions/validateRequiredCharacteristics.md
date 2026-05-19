[Wildberries API TypeScript SDK](../modules.md) / validateRequiredCharacteristics

# Function: validateRequiredCharacteristics()

```ts
function validateRequiredCharacteristics(
   characteristics: SubjectCharacteristic[], 
   input: CardCharacteristicInput[], 
   namedFields?: Record<string, unknown>): SubjectCharacteristic[];
```

Defined in: [utils/validateRequiredCharacteristics.ts:46](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/utils/validateRequiredCharacteristics.ts#L46)

Validates that all mandatory characteristics are present in a card creation request.
Returns the list of missing mandatory characteristics.

**v3.10.2 update**: added optional `namedFields` parameter to correctly handle WB API
characteristics with `existNamedField: true` (e.g. `brand`, `height`, `length`, `name`,
`width`, `weight`) which are submitted as top-level card fields rather than inside
the `characteristics[]` array.

Without the `namedFields` parameter the helper falls back to legacy behaviour and emits
a one-time `console.warn` whenever a required `existNamedField: true` characteristic is
encountered — this may cause false positives. Pass the named-field values as the third
argument to suppress the warning and get accurate results.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characteristics` | [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[] | All characteristics for the category (from getObjectCharc()) |
| `input` | [`CardCharacteristicInput`](../-internal-/interfaces/CardCharacteristicInput.md)[] | Characteristics included in the card creation request |
| `namedFields?` | `Record`\<`string`, `unknown`\> | Optional map of named-field values (brand, height, length, etc.) keyed by characteristic name. Pass values from the top-level card fields. |

## Returns

[`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[]

Array of missing mandatory characteristics (empty if all present)

## Examples

```typescript
const charcs = await sdk.products.getObjectCharc(1260);
const myChars = [{ id: 101, value: '64GB' }];
const missing = validateRequiredCharacteristics(
  charcs.data ?? [],
  myChars,
  { brand: 'Acme', height: 10, length: 20, width: 5, weight: 0.5 }
);
if (missing.length > 0) {
  console.error('Missing:', missing.map(c => c.name));
}
```

```typescript
const missing = validateRequiredCharacteristics(charcs.data ?? [], myChars);
```

## See

CHANGELOG v3.10.2 for migration details

## Since

v3.9.0
