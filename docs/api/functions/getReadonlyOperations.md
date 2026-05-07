[Wildberries API TypeScript SDK](../modules.md) / getReadonlyOperations

# Function: getReadonlyOperations()

```ts
function getReadonlyOperations(): string[];
```

Defined in: [config/operation-metadata.ts:3302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/config/operation-metadata.ts#L3302)

Get all readonly operations

## Returns

`string`[]

Array of operation keys that are safe to retry

## Example

```typescript
import { getReadonlyOperations } from 'daytona-wildberries-typescript-sdk';

const safeToRetry = getReadonlyOperations();
// Returns: ['general.ping', 'general.news', 'products.getParentAll', ...]
```
