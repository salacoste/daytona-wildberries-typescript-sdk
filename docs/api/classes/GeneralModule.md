[Wildberries API TypeScript SDK](../modules.md) / GeneralModule

# Class: GeneralModule

Defined in: [modules/general/index.ts:9](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/general/index.ts#L9)

## Constructors

### Constructor

```ts
new GeneralModule(client: BaseClient): GeneralModule;
```

Defined in: [modules/general/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/general/index.ts#L10)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`GeneralModule`

## Methods

### ping()

```ts
ping(): Promise<{
  TS?: string;
  Status?: "OK";
}>;
```

Defined in: [modules/general/index.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/general/index.ts#L24)

Проверка подключения

#### Returns

`Promise`\<\{
  `TS?`: `string`;
  `Status?`: `"OK"`;
\}\>

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
news(options?: {
  from?: string;
  fromID?: number;
}): Promise<{
  data?: {
     content?: string;
     date?: string;
     header?: string;
     id?: number;
     types?: {
        id?: number;
        name?: string;
     }[];
  }[];
}>;
```

Defined in: [modules/general/index.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/general/index.ts#L41)

Получение новостей портала продавцов

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `from?`: `string`; `fromID?`: `number`; \} | Query parameters |
| `options.from?` | `string` | - |
| `options.fromID?` | `number` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `content?`: `string`;
     `date?`: `string`;
     `header?`: `string`;
     `id?`: `number`;
     `types?`: \{
        `id?`: `number`;
        `name?`: `string`;
     \}[];
  \}[];
\}\>

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
const result = await sdk.general.news({});
console.log(result);
```

***

### sellerInfo()

```ts
sellerInfo(): Promise<{
  name?: string;
  sid?: string;
  tradeMark?: string;
}>;
```

Defined in: [modules/general/index.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/modules/general/index.ts#L57)

Получение информации о продавце

#### Returns

`Promise`\<\{
  `name?`: `string`;
  `sid?`: `string`;
  `tradeMark?`: `string`;
\}\>

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
