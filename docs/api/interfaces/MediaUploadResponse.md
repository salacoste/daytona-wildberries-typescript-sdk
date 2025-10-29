[Wildberries API TypeScript SDK](../modules.md) / MediaUploadResponse

# Interface: MediaUploadResponse

Defined in: [types/products.types.ts:1015](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L1015)

Media upload response from WB API

Returned by both file and URL upload endpoints.

**Media Requirements:**
- **Images**: Max 30, min 700×900px, max 32MB, min 65% quality
- **Formats**: JPG, PNG, BMP, GIF (static only), WebP
- **Video**: Max 1, max 50MB, formats: MOV, MP4

## Example

```typescript
const response: MediaUploadResponse = {
  data: {},
  error: false,
  errorText: '',
  additionalErrors: null
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | `Record`\<`string`, `unknown`\> | Operation data (usually empty on success) | [types/products.types.ts:1017](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L1017) |
| <a id="error"></a> `error` | `boolean` | Error flag (false = success, true = error) | [types/products.types.ts:1019](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L1019) |
| <a id="errortext"></a> `errorText` | `string` | Error description (empty string if no error) | [types/products.types.ts:1021](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L1021) |
| <a id="additionalerrors"></a> `additionalErrors` | `Record`\<`string`, `unknown`\> \| `null` | Additional error details | [types/products.types.ts:1023](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/products.types.ts#L1023) |
