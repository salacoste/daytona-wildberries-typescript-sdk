[Wildberries API TypeScript SDK](../modules.md) / BaseClient

# Class: BaseClient

Defined in: [client/base-client.ts:60](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/client/base-client.ts#L60)

Base HTTP client for all Wildberries API modules

This class provides a unified HTTP interface with:
- Automatic authentication header injection
- Configurable timeouts
- Typed error transformation
- Debug logging with PII sanitization

All API modules receive a BaseClient instance via dependency injection
to ensure consistent behavior across the SDK.

## Examples

```typescript
const config: SDKConfig = {
  apiKey: 'your-api-key',
  timeout: 30000,
  logLevel: 'debug'
};

const client = new BaseClient(config);

// Make GET request
const data = await client.get<ProductResponse>(
  'https://content-api.wildberries.ru/api/v1/products'
);
```

```typescript
const data = await client.post<CreateProductResponse>(
  'https://content-api.wildberries.ru/api/v1/products',
  { brandName: 'MyBrand', title: 'Product Title' },
  { headers: { 'X-Request-ID': '123' } }
);
```

## Constructors

### Constructor

```ts
new BaseClient(config: SDKConfig): BaseClient;
```

Defined in: [client/base-client.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/client/base-client.ts#L83)

Creates a new BaseClient instance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`SDKConfig`](../interfaces/SDKConfig.md) | SDK configuration object |

#### Returns

`BaseClient`

#### Throws

If apiKey is not provided or invalid

#### Example

```typescript
const client = new BaseClient({
  apiKey: process.env.WB_API_KEY || '',
  timeout: 60000,
  logLevel: 'info'
});
```

## Methods

### get()

```ts
get<T>(url: string, options?: RequestOptions): Promise<T>;
```

Defined in: [client/base-client.ts:135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/client/base-client.ts#L135)

Make a GET request with automatic retry on transient failures

Automatically retries on network errors, 5xx server errors, and 429 rate limits.
Does NOT retry on authentication errors (401/403) or validation errors (400/422).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Expected response type |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | Full URL for the request |
| `options?` | [`RequestOptions`](../interfaces/RequestOptions.md) | Optional request options |

#### Returns

`Promise`\<`T`\>

Promise resolving to typed response data

#### Throws

On 401/403 responses

#### Throws

On 429 responses (after retries exhausted)

#### Throws

On 400/422 responses

#### Throws

On network failures or 5xx responses (after retries exhausted)

#### Example

```typescript
interface Product {
  id: string;
  name: string;
}

const product = await client.get<Product>(
  'https://content-api.wildberries.ru/api/v1/products/123'
);
console.log(product.name);
```

***

### post()

```ts
post<T>(
   url: string, 
   data?: unknown, 
options?: RequestOptions): Promise<T>;
```

Defined in: [client/base-client.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/client/base-client.ts#L197)

Make a POST request with automatic retry on transient failures

Automatically retries on network errors, 5xx server errors, and 429 rate limits.
Does NOT retry on authentication errors (401/403) or validation errors (400/422).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Expected response type |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | Full URL for the request |
| `data?` | `unknown` | Request body data |
| `options?` | [`RequestOptions`](../interfaces/RequestOptions.md) | Optional request options |

#### Returns

`Promise`\<`T`\>

Promise resolving to typed response data

#### Throws

On 401/403 responses

#### Throws

On 429 responses (after retries exhausted)

#### Throws

On 400/422 responses

#### Throws

On network failures or 5xx responses (after retries exhausted)

#### Example

```typescript
interface CreateProductRequest {
  brandName: string;
  title: string;
}

interface CreateProductResponse {
  id: string;
}

const result = await client.post<CreateProductResponse>(
  'https://content-api.wildberries.ru/api/v1/products',
  { brandName: 'MyBrand', title: 'New Product' }
);
```

***

### put()

```ts
put<T>(
   url: string, 
   data?: unknown, 
options?: RequestOptions): Promise<T>;
```

Defined in: [client/base-client.ts:253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/client/base-client.ts#L253)

Make a PUT request with automatic retry on transient failures

Automatically retries on network errors, 5xx server errors, and 429 rate limits.
Does NOT retry on authentication errors (401/403) or validation errors (400/422).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Expected response type |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | Full URL for the request |
| `data?` | `unknown` | Request body data |
| `options?` | [`RequestOptions`](../interfaces/RequestOptions.md) | Optional request options |

#### Returns

`Promise`\<`T`\>

Promise resolving to typed response data

#### Throws

On 401/403 responses

#### Throws

On 429 responses (after retries exhausted)

#### Throws

On 400/422 responses

#### Throws

On network failures or 5xx responses (after retries exhausted)

#### Example

```typescript
const updated = await client.put<ProductResponse>(
  'https://content-api.wildberries.ru/api/v1/products/123',
  { title: 'Updated Title' }
);
```

***

### patch()

```ts
patch<T>(
   url: string, 
   data?: unknown, 
options?: RequestOptions): Promise<T>;
```

Defined in: [client/base-client.ts:309](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/client/base-client.ts#L309)

Make a PATCH request with automatic retry on transient failures

Automatically retries on network errors, 5xx server errors, and 429 rate limits.
Does NOT retry on authentication errors (401/403) or validation errors (400/422).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Expected response type |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | Full URL for the request |
| `data?` | `unknown` | Request body data |
| `options?` | [`RequestOptions`](../interfaces/RequestOptions.md) | Optional request options |

#### Returns

`Promise`\<`T`\>

Promise resolving to typed response data

#### Throws

On 401/403 responses

#### Throws

On 429 responses (after retries exhausted)

#### Throws

On 400/422 responses

#### Throws

On network failures or 5xx responses (after retries exhausted)

#### Example

```typescript
const patched = await client.patch<ProductResponse>(
  'https://content-api.wildberries.ru/api/v1/products/123',
  { stock: 100 }
);
```

***

### delete()

```ts
delete<T>(
   url: string, 
   data?: unknown, 
options?: RequestOptions): Promise<T>;
```

Defined in: [client/base-client.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/client/base-client.ts#L371)

Make a DELETE request with automatic retry on transient failures

Automatically retries on network errors, 5xx server errors, and 429 rate limits.
Does NOT retry on authentication errors (401/403) or validation errors (400/422).

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Expected response type |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `url` | `string` | Full URL for the request |
| `data?` | `unknown` | Optional request body data (RFC 7231 allows DELETE with body) |
| `options?` | [`RequestOptions`](../interfaces/RequestOptions.md) | Optional request options |

#### Returns

`Promise`\<`T`\>

Promise resolving to typed response data

#### Throws

On 401/403 responses

#### Throws

On 429 responses (after retries exhausted)

#### Throws

On 400/422 responses

#### Throws

On network failures or 5xx responses (after retries exhausted)

#### Example

```typescript
// DELETE without body
await client.delete<void>(
  'https://content-api.wildberries.ru/api/v1/products/123'
);

// DELETE with body (RFC 7231 allows this)
await client.delete<void>(
  'https://marketplace-api.wildberries.ru/api/v3/stocks/123',
  { skus: ['SKU123', 'SKU456'] }
);
```
