[Wildberries API TypeScript SDK](../modules.md) / RequestOptions

# Interface: RequestOptions

Defined in: [config/sdk-config.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/config/sdk-config.ts#L199)

Per-request options that can override SDK defaults

These options are passed to individual HTTP method calls to customize
behavior for specific requests.

## Examples

```typescript
const options: RequestOptions = {
  headers: {
    'X-Custom-Header': 'custom-value'
  },
  rateLimitKey: 'products.create' // For rate limiter identification
};

await client.get<ProductResponse>(url, options);
```

```typescript
// Override global timeout for a single slow request
await client.get<ReportResponse>(url, {
  timeout: 120000 // 2 minutes for report generation
});
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="headers"></a> `headers?` | `Record`\<`string`, `string`\> | Custom HTTP headers to merge with defaults These headers are merged with the SDK's default headers (Authorization, Content-Type, User-Agent). **Example** `headers: { 'X-Request-ID': '123e4567-e89b-12d3-a456-426614174000', 'Accept-Language': 'ru-RU' }` | [config/sdk-config.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/config/sdk-config.ts#L214) |
| <a id="params"></a> `params?` | `Record`\<`string`, `unknown`\> | URL query parameters Query parameters to append to the request URL. These are automatically URL-encoded by axios. **Example** `params: { from: '2024-01-01', limit: 10, filter: 'active' } // Results in: ?from=2024-01-01&limit=10&filter=active` | [config/sdk-config.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/config/sdk-config.ts#L232) |
| <a id="ratelimitkey"></a> `rateLimitKey?` | `string` | Rate limit key for endpoint identification Used by RateLimiter (Story 1.4) to enforce per-endpoint rate limits. Format: `moduleName.methodName` (e.g., 'products.create', 'orders.list') **Remarks** This is automatically set by API module methods. Manual override is rare. | [config/sdk-config.ts:243](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/config/sdk-config.ts#L243) |
| <a id="timeout"></a> `timeout?` | `number` | Per-request timeout in milliseconds Overrides the global `SDKConfig.timeout` for this single request. Useful for long-running operations (e.g., report generation, large data sync) that need more time than the default 30-second timeout. Each retry attempt uses this timeout individually (not cumulative). **Example** `// 2-minute timeout for large order sync await sdk.ordersFBS.getOrders(params, { timeout: 120000 });` | [config/sdk-config.ts:262](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/config/sdk-config.ts#L262) |
| <a id="responsetype"></a> `responseType?` | `"json"` \| `"blob"` \| `"text"` \| `"arraybuffer"` \| `"document"` \| `"stream"` | Response type for special handling Specifies the expected response data type for Axios. Used for downloading files as Blob (e.g., Excel reports). **Example** `responseType: 'blob' // For file downloads` | [config/sdk-config.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/config/sdk-config.ts#L275) |
