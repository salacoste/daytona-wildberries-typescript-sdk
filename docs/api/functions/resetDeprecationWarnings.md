[Wildberries API TypeScript SDK](../modules.md) / resetDeprecationWarnings

# Function: resetDeprecationWarnings()

```ts
function resetDeprecationWarnings(): void;
```

Defined in: [utils/deprecation.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/utils/deprecation.ts#L49)

Reset all deprecation warning flags. **Test helper only.**

Call in `beforeEach` to ensure deprecation warnings fire again in each test.

## Returns

`void`

## Example

```typescript
import { resetDeprecationWarnings } from 'daytona-wildberries-typescript-sdk';

beforeEach(() => {
  resetDeprecationWarnings();
});
```
