[Wildberries API TypeScript SDK](../modules.md) / getOperationsByCategory

# Function: getOperationsByCategory()

```ts
function getOperationsByCategory(category: string): string[];
```

Defined in: [config/operation-metadata.ts:3283](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/config/operation-metadata.ts#L3283)

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
