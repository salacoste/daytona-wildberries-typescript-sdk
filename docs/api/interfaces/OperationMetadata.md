[Wildberries API TypeScript SDK](../modules.md) / OperationMetadata

# Interface: OperationMetadata

Defined in: [config/operation-metadata.ts:32](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/config/operation-metadata.ts#L32)

Metadata for a single SDK operation

## Example

```typescript
import { operationMetadata, type OperationMetadata } from 'daytona-wildberries-typescript-sdk';

const pingMeta = operationMetadata['general.ping'];
if (pingMeta.readonly) {
  // Safe to retry on transient failures
}
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="readonly"></a> `readonly` | `boolean` | Whether the operation is readonly (safe to retry) Operations marked as readonly=true are idempotent and safe to retry on transient failures (network errors, timeouts, 5xx errors). Operations with readonly=false may have side effects (create, update, delete) and should NOT be automatically retried. | [config/operation-metadata.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/config/operation-metadata.ts#L42) |
| <a id="category"></a> `category` | `string` | API category for the operation Categories map to different API domains: - 'all': Can be used with any API domain (e.g., /ping) - 'content': https://content-api.wildberries.ru - 'marketplace': https://marketplace-api.wildberries.ru - 'discountsandprices': https://discounts-prices-api.wildberries.ru - 'commonapi': https://common-api.wildberries.ru - 'usermanagement': https://user-management-api.wildberries.ru | [config/operation-metadata.ts:55](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/config/operation-metadata.ts#L55) |
| <a id="ratelimitkey"></a> `rateLimitKey` | `string` | Rate limit key for the operation This key is used to look up rate limit configuration in the rate limits registry. Format: '{module}.{operationName}' | [config/operation-metadata.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/config/operation-metadata.ts#L63) |
