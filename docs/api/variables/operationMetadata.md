[Wildberries API TypeScript SDK](../modules.md) / operationMetadata

# Variable: operationMetadata

```ts
const operationMetadata: Record<string, OperationMetadata>;
```

Defined in: [config/operation-metadata.ts:89](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/config/operation-metadata.ts#L89)

Registry of operation metadata for all SDK operations

Keys follow the pattern: '{module}.{methodName}'

## Example

```typescript
import { operationMetadata, isOperationReadonly, getOperationCategory } from 'daytona-wildberries-typescript-sdk';

// Direct access
const meta = operationMetadata['products.getParentAll'];
console.log(meta.readonly); // true
console.log(meta.category); // 'content'

// Helper functions
if (isOperationReadonly('products.getParentAll')) {
  // Safe to retry
}

const category = getOperationCategory('products.getParentAll');
// Returns 'content'
```
