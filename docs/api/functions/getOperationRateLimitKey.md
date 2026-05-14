[Wildberries API TypeScript SDK](../modules.md) / getOperationRateLimitKey

# Function: getOperationRateLimitKey()

```ts
function getOperationRateLimitKey(operationKey: string): string | undefined;
```

Defined in: [config/operation-metadata.ts:3239](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/config/operation-metadata.ts#L3239)

Get the rate limit key for an operation

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operationKey` | `string` | Operation key in format '{module}.{methodName}' |

## Returns

`string` \| `undefined`

The rate limit key, or undefined if operation not found

## Example

```typescript
import { getOperationRateLimitKey, productsRateLimits } from 'daytona-wildberries-typescript-sdk';

const rateLimitKey = getOperationRateLimitKey('products.getParentAll');
// Returns 'products.contentObjectParentAll'

const config = productsRateLimits[rateLimitKey!];
console.log(config.requestsPerMinute); // 100
```
