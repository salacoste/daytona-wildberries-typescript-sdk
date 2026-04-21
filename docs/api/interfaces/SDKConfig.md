[Wildberries API TypeScript SDK](../modules.md) / SDKConfig

# Interface: SDKConfig

Defined in: [config/sdk-config.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L45)

Configuration options for initializing the Wildberries SDK

This interface defines all configuration parameters accepted by the SDK,
including authentication credentials, network settings, and operational parameters.

## Examples

```typescript
const config: SDKConfig = {
  apiKey: 'your-wildberries-api-key',
  timeout: 30000,
  logLevel: 'debug'
};

const sdk = new WildberriesSDK(config);
```

```typescript
const config: SDKConfig = {
  apiKey: process.env.WB_API_KEY || '',
  baseUrls: {
    products: 'https://test-content-api.wildberries.ru', // Testing override
  },
  timeout: 60000, // 60 seconds for report generation
  retryConfig: {
    maxRetries: 5,
    retryDelay: 2000,
    exponentialBackoff: true
  },
  rateLimitConfig: {
    requestsPerSecond: 10,
    requestsPerMinute: 100
  },
  logLevel: 'info'
};
```

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="apikey"></a> `apiKey` | `string` | `undefined` | Wildberries API key for authentication This key is automatically injected as `Authorization: Bearer <apiKey>` header on all API requests. Obtain your API key from the Wildberries seller portal. **See** [Wildberries API Documentation](https://dev.wildberries.ru/) | [config/sdk-config.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L54) |
| <a id="baseurls"></a> `baseUrls?` | `Partial`\<`Record`\<`string`, `string`\>\> | `undefined` | Optional base URL overrides per API module By default, each module uses its standard production base URL. Use this option to override specific module base URLs (e.g., for testing environments). **Example** `baseUrls: { products: 'https://test-content-api.wildberries.ru', orders: 'https://test-marketplace-api.wildberries.ru' }` | [config/sdk-config.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L70) |
| <a id="timeout"></a> `timeout?` | `number` | `30000 (30 seconds)` | Request timeout in milliseconds **Remarks** Wildberries API can be slow for complex operations (e.g., report generation). Consider increasing this timeout for long-running operations. | [config/sdk-config.ts:81](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L81) |
| <a id="retryconfig"></a> `retryConfig?` | \{ `maxRetries?`: `number`; `retryDelay?`: `number`; `exponentialBackoff?`: `boolean`; \} | `undefined` | Retry configuration for failed requests Controls automatic retry behavior for transient failures (network errors, 5xx, 429). Will be used by RetryHandler in Story 1.5. **Remarks** Authentication errors (401, 403) and validation errors (400, 422) are NOT retried. | [config/sdk-config.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L92) |
| `retryConfig.maxRetries?` | `number` | `3` | Maximum number of retry attempts | [config/sdk-config.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L97) |
| `retryConfig.retryDelay?` | `number` | `1000 (1 second)` | Base delay between retries in milliseconds | [config/sdk-config.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L103) |
| `retryConfig.exponentialBackoff?` | `boolean` | `true` | Enable exponential backoff for retries When enabled, retry delay increases exponentially: delay * 2^attempt | [config/sdk-config.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L111) |
| <a id="ratelimitconfig"></a> `rateLimitConfig?` | \{ `requestsPerSecond?`: `number`; `requestsPerMinute?`: `number`; \} | `undefined` | Global rate limiting configuration Enforces global rate limits across all API endpoints. Will be used by RateLimiter in Story 1.4. **Remarks** Per-endpoint rate limits (extracted from OpenAPI specs) take precedence over global limits. | [config/sdk-config.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L123) |
| `rateLimitConfig.requestsPerSecond?` | `number` | `undefined (no global limit)` | Maximum requests per second across all endpoints | [config/sdk-config.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L128) |
| `rateLimitConfig.requestsPerMinute?` | `number` | `undefined (no global limit)` | Maximum requests per minute across all endpoints | [config/sdk-config.ts:134](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L134) |
| <a id="loglevel"></a> `logLevel?` | `"debug"` \| `"info"` \| `"warn"` \| `"error"` | `'warn'` | Logging verbosity level Controls the amount of debug information logged to console. - `debug`: Logs all requests, responses, and internal operations - `info`: Logs high-level operations and successful requests - `warn`: Logs warnings and recoverable errors (default) - `error`: Logs only critical errors **Remarks** API keys and PII are automatically sanitized from logs at all levels. | [config/sdk-config.ts:152](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L152) |
| <a id="tokentype"></a> `tokenType?` | `"personal"` \| `"service"` \| `"basic"` \| `"test"` | `'personal'` | Wildberries API token type Different token types have different rate limits. Personal and Service tokens have full rate limits. Basic and Test tokens have significantly reduced rate limits (enforced since March 30, 2026). - `'personal'` — For proprietary software, on-premise solutions. Full limits. - `'service'` — For third-party SaaS services from WB Catalog. Full limits. - `'basic'` — Auxiliary token. Reduced rate limits. - `'test'` — For testing. Reduced rate limits. **See** [WB API Rate Limits by Token Type](https://dev.wildberries.ru/news/281) | [config/sdk-config.ts:170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/config/sdk-config.ts#L170) |
