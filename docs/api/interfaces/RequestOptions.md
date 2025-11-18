[Wildberries API TypeScript SDK](../modules.md) / RequestOptions

# Interface: RequestOptions

Defined in: [config/sdk-config.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/config/sdk-config.ts#L173)

Per-request options that can override SDK defaults

These options are passed to individual HTTP method calls to customize
behavior for specific requests.

## Example

```typescript
const options: RequestOptions = {
  headers: {
    'X-Custom-Header': 'custom-value'
  },
  rateLimitKey: 'products.create' // For rate limiter identification
};

await client.get<ProductResponse>(url, options);
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="headers"></a> `headers?` | `Record`\<`string`, `string`\> | Custom HTTP headers to merge with defaults These headers are merged with the SDK's default headers (Authorization, Content-Type, User-Agent). **Example** `headers: { 'X-Request-ID': '123e4567-e89b-12d3-a456-426614174000', 'Accept-Language': 'ru-RU' }` | [config/sdk-config.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/config/sdk-config.ts#L188) |
| <a id="params"></a> `params?` | `Record`\<`string`, `unknown`\> | URL query parameters Query parameters to append to the request URL. These are automatically URL-encoded by axios. **Example** `params: { from: '2024-01-01', limit: 10, filter: 'active' } // Results in: ?from=2024-01-01&limit=10&filter=active` | [config/sdk-config.ts:206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/config/sdk-config.ts#L206) |
| <a id="ratelimitkey"></a> `rateLimitKey?` | `string` | Rate limit key for endpoint identification Used by RateLimiter (Story 1.4) to enforce per-endpoint rate limits. Format: `moduleName.methodName` (e.g., 'products.create', 'orders.list') **Remarks** This is automatically set by API module methods. Manual override is rare. | [config/sdk-config.ts:217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/config/sdk-config.ts#L217) |
| <a id="responsetype"></a> `responseType?` | `"json"` \| `"blob"` \| `"text"` \| `"arraybuffer"` \| `"document"` \| `"stream"` | Response type for special handling Specifies the expected response data type for Axios. Used for downloading files as Blob (e.g., Excel reports). **Example** `responseType: 'blob' // For file downloads` | [config/sdk-config.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/config/sdk-config.ts#L230) |
