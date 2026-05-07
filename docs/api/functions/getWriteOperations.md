[Wildberries API TypeScript SDK](../modules.md) / getWriteOperations

# Function: getWriteOperations()

```ts
function getWriteOperations(): string[];
```

Defined in: [config/operation-metadata.ts:3323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/config/operation-metadata.ts#L3323)

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
