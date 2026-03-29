[Wildberries API TypeScript SDK](../modules.md) / getWriteOperations

# Function: getWriteOperations()

```ts
function getWriteOperations(): string[];
```

Defined in: [config/operation-metadata.ts:3323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/config/operation-metadata.ts#L3323)

Get all write operations (not readonly)

## Returns

`string`[]

Array of operation keys that have side effects

## Example

```typescript
import { getWriteOperations } from 'daytona-wildberries-typescript-sdk';

const writeOps = getWriteOperations();
// Returns: ['products.createContentTag', 'products.createCardsUpload', ...]

// These operations should NOT be automatically retried
```
