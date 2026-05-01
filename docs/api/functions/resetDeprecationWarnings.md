[Wildberries API TypeScript SDK](../modules.md) / resetDeprecationWarnings

# Function: resetDeprecationWarnings()

```ts
function resetDeprecationWarnings(): void;
```

Defined in: [utils/deprecation.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/utils/deprecation.ts#L49)

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
