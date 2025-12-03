[Wildberries API TypeScript SDK](../modules.md) / GeneralModule

# Class: GeneralModule

Defined in: [modules/general/index.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/general/index.ts#L16)

## Constructors

### Constructor

```ts
new GeneralModule(client: BaseClient): GeneralModule;
```

Defined in: [modules/general/index.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/general/index.ts#L17)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`GeneralModule`

## Methods

### ping()

```ts
ping(): Promise<PingResponse>;
```

Defined in: [modules/general/index.ts:31](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/general/index.ts#L31)

Проверка подключения

#### Returns

`Promise`\<[`PingResponse`](../-internal-/interfaces/PingResponse.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.general.ping();
console.log(result);
```

***

### news()

```ts
news(options: NewsRequestParams): Promise<NewsResponse>;
```

Defined in: [modules/general/index.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/general/index.ts#L53)

Получение новостей портала продавцов

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`NewsRequestParams`](../-internal-/interfaces/NewsRequestParams.md) | Query parameters (at least one required) |

#### Returns

`Promise`\<[`NewsResponse`](../-internal-/interfaces/NewsResponse.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422) or no parameters provided

#### Throws

When network request fails or times out

#### Example

```ts
// Get news from specific date
const result = await sdk.general.news({ from: '2025-01-01' });

// Get news from specific ID
const result = await sdk.general.news({ fromID: 7369 });
```

***

### sellerInfo()

```ts
sellerInfo(): Promise<SellerInfoResponse>;
```

Defined in: [modules/general/index.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/general/index.ts#L113)

Получение информации о продавце

#### Returns

`Promise`\<[`SellerInfoResponse`](../-internal-/interfaces/SellerInfoResponse.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.general.sellerInfo();
console.log(result);
```
