[Wildberries API TypeScript SDK](../modules.md) / getReadonlyOperations

# Function: getReadonlyOperations()

```ts
function getReadonlyOperations(): string[];
```

Defined in: [config/operation-metadata.ts:3106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/config/operation-metadata.ts#L3106)

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
