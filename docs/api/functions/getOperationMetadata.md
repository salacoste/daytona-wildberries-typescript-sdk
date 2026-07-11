[Wildberries API TypeScript SDK](../modules.md) / getOperationMetadata

# Function: getOperationMetadata()

```ts
function getOperationMetadata(operationKey: string): OperationMetadata | undefined;
```

Defined in: [config/operation-metadata.ts:3066](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/config/operation-metadata.ts#L3066)

Get full metadata for an operation

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operationKey` | `string` | Operation key in format '{module}.{methodName}' |

## Returns

[`OperationMetadata`](../interfaces/OperationMetadata.md) \| `undefined`

The full OperationMetadata object, or undefined if not found

## Example

```typescript
import { getOperationMetadata } from 'daytona-wildberries-typescript-sdk';

const meta = getOperationMetadata('products.createCardsUpload');
if (meta) {
  console.log('Readonly:', meta.readonly);        // false
  console.log('Category:', meta.category);        // 'content'
  console.log('Rate limit key:', meta.rateLimitKey); // 'products.postContentCardsUpload'
}
```
