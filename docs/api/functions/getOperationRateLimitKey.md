[Wildberries API TypeScript SDK](../modules.md) / getOperationRateLimitKey

# Function: getOperationRateLimitKey()

```ts
function getOperationRateLimitKey(operationKey: string): string | undefined;
```

Defined in: [config/operation-metadata.ts:3043](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/config/operation-metadata.ts#L3043)

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
