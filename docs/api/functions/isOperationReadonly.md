[Wildberries API TypeScript SDK](../modules.md) / isOperationReadonly

# Function: isOperationReadonly()

```ts
function isOperationReadonly(operationKey: string): boolean;
```

Defined in: [config/operation-metadata.ts:3190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/config/operation-metadata.ts#L3190)

Check if an operation is readonly (safe to retry)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operationKey` | `string` | Operation key in format '{module}.{methodName}' |

## Returns

`boolean`

true if the operation is readonly, false otherwise

## Example

```typescript
import { isOperationReadonly } from 'daytona-wildberries-typescript-sdk';

if (isOperationReadonly('products.getParentAll')) {
  // Safe to retry on transient failures
}

if (!isOperationReadonly('products.createCardsUpload')) {
  // Should NOT auto-retry - may cause duplicate cards
}
```
