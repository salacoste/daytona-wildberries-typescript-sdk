[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RetryOptions

# Interface: RetryOptions

Defined in: [client/retry-handler.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/client/retry-handler.ts#L111)

Options for controlling retry behavior per-operation

Allows callers to specify operation metadata for readonly-aware retry logic
and to force retries even for write operations when explicitly intended.

## Example

```typescript
// Retry with operation key lookup
await handler.executeWithRetry(
  () => api.getProducts(),
  'getProducts',
  { operationKey: 'products.getCardsList' }
);

// Force retry for write operation (use with caution)
await handler.executeWithRetry(
  () => api.createProduct(data),
  'createProduct',
  { operationKey: 'products.createCardsUpload', forceRetry: true }
);
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="operationkey"></a> `operationKey?` | `string` | Operation key for metadata lookup (format: '{module}.{methodName}') Used to check if the operation is readonly (safe to retry). If the operation is NOT readonly (write operation), retries will be skipped unless `forceRetry` is true. **Example** `'products.getCardsList', 'products.createCardsUpload'` | [client/retry-handler.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/client/retry-handler.ts#L121) |
| <a id="forceretry"></a> `forceRetry?` | `boolean` | Force retry even for write operations **Use with extreme caution!** Write operations may have side effects and retrying could cause duplicate data (e.g., duplicate product cards). Only set to true when you have idempotency guarantees or are certain the operation can be safely retried. **Default** `false` | [client/retry-handler.ts:134](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/client/retry-handler.ts#L134) |
