[Wildberries API TypeScript SDK](../modules.md) / validateRequiredCharacteristics

# Function: validateRequiredCharacteristics()

```ts
function validateRequiredCharacteristics(characteristics: SubjectCharacteristic[], input: CardCharacteristicInput[]): SubjectCharacteristic[];
```

Defined in: [utils/validateRequiredCharacteristics.ts:23](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/utils/validateRequiredCharacteristics.ts#L23)

Validates that all mandatory characteristics are present in a card creation request.
Returns the list of missing mandatory characteristics.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `characteristics` | [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[] | All characteristics for the category (from getObjectCharc()) |
| `input` | [`CardCharacteristicInput`](../-internal-/interfaces/CardCharacteristicInput.md)[] | Characteristics included in the card creation request |

## Returns

[`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[]

Array of missing mandatory characteristics (empty if all present)

## Example

```typescript
const charcs = await sdk.products.getObjectCharc(1260);
const myChars = [{ id: 101, value: '64GB' }];
const missing = validateRequiredCharacteristics(charcs.data ?? [], myChars);
if (missing.length > 0) {
  console.error('Missing:', missing.map(c => c.name));
}
```

## Since

v3.9.0
