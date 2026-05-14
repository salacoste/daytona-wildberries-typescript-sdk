[Wildberries API TypeScript SDK](../modules.md) / resetDeprecationWarnings

# Function: resetDeprecationWarnings()

```ts
function resetDeprecationWarnings(): void;
```

Defined in: [utils/deprecation.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/utils/deprecation.ts#L49)

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
