[Wildberries API TypeScript SDK](../modules.md) / isOperationReadonly

# Function: isOperationReadonly()

```ts
function isOperationReadonly(operationKey: string): boolean;
```

Defined in: [config/operation-metadata.ts:3190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/config/operation-metadata.ts#L3190)

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
