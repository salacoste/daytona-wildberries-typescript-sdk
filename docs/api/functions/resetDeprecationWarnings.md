[Wildberries API TypeScript SDK](../modules.md) / resetDeprecationWarnings

# Function: resetDeprecationWarnings()

```ts
function resetDeprecationWarnings(): void;
```

Defined in: [utils/deprecation.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/utils/deprecation.ts#L49)

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
