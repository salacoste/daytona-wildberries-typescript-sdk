[Wildberries API TypeScript SDK](../modules.md) / getOperationsByCategory

# Function: getOperationsByCategory()

```ts
function getOperationsByCategory(category: string): string[];
```

Defined in: [config/operation-metadata.ts:3087](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/config/operation-metadata.ts#L3087)

Get all operations for a specific category

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `category` | `string` | API category (e.g., 'content', 'marketplace', 'discountsandprices') |

## Returns

`string`[]

Array of operation keys matching the category

## Example

```typescript
import { getOperationsByCategory } from 'daytona-wildberries-typescript-sdk';

const contentOps = getOperationsByCategory('content');
// Returns: ['products.getParentAll', 'products.getObjectAll', ...]

const marketplaceOps = getOperationsByCategory('marketplace');
// Returns: ['products.getStocks', 'products.updateStock', ...]
```
