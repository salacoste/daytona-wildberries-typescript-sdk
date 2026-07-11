[Wildberries API TypeScript SDK](../modules.md) / parseMetaValidationFail

# Function: parseMetaValidationFail()

```ts
function parseMetaValidationFail(err: unknown): 
  | MetaValidationFailPayload
  | null;
```

Defined in: [utils/parseMetaValidationFail.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/parseMetaValidationFail.ts#L48)

Extracts marking-code validation failure details from an unknown caught value.

Useful in shared error boundaries (e.g. middleware, global catch handlers) that
cannot import `MetaValidationFailError` directly but still want typed access to
the `metaDetails` array.

Returns `null` for any input that is not a 409 meta-validation failure.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `err` | `unknown` | The value caught in a `catch` block (typically `unknown`) |

## Returns

  \| [`MetaValidationFailPayload`](../interfaces/MetaValidationFailPayload.md)
  \| `null`

Parsed payload `{ code, message, metaDetails }` or `null`

## Since

3.15.0

## Example

```typescript
import { parseMetaValidationFail } from 'daytona-wildberries-typescript-sdk';

async function deliverSupply(supplyId: string) {
  try {
    await sdk.ordersFBS.updateSuppliesDeliver(supplyId);
  } catch (err) {
    const parsed = parseMetaValidationFail(err);
    if (parsed) {
      // Typed access without importing MetaValidationFailError
      parsed.metaDetails
        .filter(d => d.decision === 'invalid')
        .forEach(d => console.error(`Invalid code for ${d.key}: "${d.value}"`));
      return;
    }
    throw err;
  }
}
```
