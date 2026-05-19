[Wildberries API TypeScript SDK](../modules.md) / getOperationCategory

# Function: getOperationCategory()

```ts
function getOperationCategory(operationKey: string): string | undefined;
```

Defined in: [config/operation-metadata.ts:3217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/config/operation-metadata.ts#L3217)

Get the API category for an operation

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operationKey` | `string` | Operation key in format '{module}.{methodName}' |

## Returns

`string` \| `undefined`

The category string, or undefined if operation not found

## Example

```typescript
import { getOperationCategory } from 'daytona-wildberries-typescript-sdk';

const category = getOperationCategory('products.getParentAll');
// Returns 'content'

// Map category to API domain
const domains: Record<string, string> = {
  'content': 'https://content-api.wildberries.ru',
  'marketplace': 'https://marketplace-api.wildberries.ru',
  'discountsandprices': 'https://discounts-prices-api.wildberries.ru',
};
const domain = domains[category!];
```
