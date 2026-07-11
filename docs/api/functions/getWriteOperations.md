[Wildberries API TypeScript SDK](../modules.md) / getWriteOperations

# Function: getWriteOperations()

```ts
function getWriteOperations(): string[];
```

Defined in: [config/operation-metadata.ts:3127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/config/operation-metadata.ts#L3127)

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
