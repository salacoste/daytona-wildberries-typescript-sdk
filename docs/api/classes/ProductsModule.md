[Wildberries API TypeScript SDK](../modules.md) / ProductsModule

# Class: ProductsModule

Defined in: [modules/products/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L10)

## Constructors

### Constructor

```ts
new ProductsModule(client: BaseClient): ProductsModule;
```

Defined in: [modules/products/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`ProductsModule`

## Methods

### getParentAll()

```ts
getParentAll(options?: {
  locale?: string;
}): Promise<{
  data?: unknown;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L28)

Родительские категории товаров

Метод возвращает названия и ID всех родительских категорий для [создания карточек товаров](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov): например, `Электроника`, `Бытовая химия`, `Рукоделие`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: `unknown`;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getParentAll({});
console.log(result);
```

***

### getObjectAll()

```ts
getObjectAll(options?: {
  locale?: string;
  name?: string;
  limit?: number;
  offset?: number;
  parentID?: number;
}): Promise<{
  data?: {
     subjectID?: number;
     parentID?: number;
     subjectName?: string;
     parentName?: string;
  }[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L47)

Список предметов

Метод возвращает список названий [родительских категорий предметов](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1parent~1all/get) и их предметов с ID. Например, у категории `Игрушки` будут предметы `Калейдоскопы`, `Куклы`, `Мячики`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; `name?`: `string`; `limit?`: `number`; `offset?`: `number`; `parentID?`: `number`; \} | Query parameters |
| `options.locale?` | `string` | - |
| `options.name?` | `string` | - |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.parentID?` | `number` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `subjectID?`: `number`;
     `parentID?`: `number`;
     `subjectName?`: `string`;
     `parentName?`: `string`;
  \}[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getObjectAll({});
console.log(result);
```

***

### getObjectCharc()

```ts
getObjectCharc(subjectId: number, options?: {
  locale?: string;
}): Promise<{
  data?: {
     charcID?: number;
     subjectName?: string;
     subjectID?: number;
     name?: string;
     required?: boolean;
     unitName?: string;
     maxCount?: number;
     popular?: boolean;
     charcType?: number;
  }[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L67)

Характеристики предмета

Метод возвращает параметры характеристик предмета: названия, типы данных, единицы измерения и так далее. В запросе необходимо указать ID [предмета](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1all/get). <div class="description_important"> Для получения значений характеристик <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1colors/get">Цвет</a>, <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1kinds/get">Пол</a>, <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1countries/get">Страна производства</a>, <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1seasons/get">Сезон</a>, <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1vat/get">Ставка НДС</a> и <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1tnved/get">ТНВЭД-код</a> используйте отдельные методы </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `subjectId` | `number` | ID предмета |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `charcID?`: `number`;
     `subjectName?`: `string`;
     `subjectID?`: `number`;
     `name?`: `string`;
     `required?`: `boolean`;
     `unitName?`: `string`;
     `maxCount?`: `number`;
     `popular?`: `boolean`;
     `charcType?`: `number`;
  \}[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getObjectCharc('subjectId-value', {});
console.log(result);
```

***

### getDirectoryColors()

```ts
getDirectoryColors(options?: {
  locale?: string;
}): Promise<{
  data?: unknown;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L86)

Цвет

Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Цвет`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: `unknown`;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getDirectoryColors({});
console.log(result);
```

***

### getDirectoryKinds()

```ts
getDirectoryKinds(options?: {
  locale?: string;
}): Promise<{
  data?: string[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L105)

Пол

Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Пол`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: `string`[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getDirectoryKinds({});
console.log(result);
```

***

### getDirectoryCountries()

```ts
getDirectoryCountries(options?: {
  locale?: string;
}): Promise<{
  data?: unknown;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L124)

Страна производства

Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Страна производства`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: `unknown`;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getDirectoryCountries({});
console.log(result);
```

***

### getDirectorySeasons()

```ts
getDirectorySeasons(options?: {
  locale?: string;
}): Promise<{
  data?: string[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L143)

Сезон

Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Сезон`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: `string`[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getDirectorySeasons({});
console.log(result);
```

***

### getDirectoryVat()

```ts
getDirectoryVat(options?: {
  locale?: string;
}): Promise<{
  data?: string[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L162)

Ставка НДС

Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Ставка НДС`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: `string`[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getDirectoryVat({});
console.log(result);
```

***

### getDirectoryTnved()

```ts
getDirectoryTnved(options?: {
  subjectID: number;
  search?: number;
  locale?: string;
}): Promise<{
  data?: {
     tnved?: string;
     isKiz?: boolean;
  }[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L181)

ТНВЭД-код

Метод возвращает список ТНВЭД-кодов по ID [предмета](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1all/get) и фрагменту ТНВЭД-кода. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `subjectID`: `number`; `search?`: `number`; `locale?`: `string`; \} | Query parameters |
| `options.subjectID?` | `number` | - |
| `options.search?` | `number` | - |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `tnved?`: `string`;
     `isKiz?`: `boolean`;
  \}[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getDirectoryTnved({});
console.log(result);
```

***

### getContentTags()

```ts
getContentTags(): Promise<{
  data?: unknown;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L199)

Список ярлыков

Метод возвращает список и характеристики всех ярлыков продавца для группировки и фильтрации товаров. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Returns

`Promise`\<\{
  `data?`: `unknown`;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getContentTags();
console.log(result);
```

***

### createContentTag()

```ts
createContentTag(data: {
  color?: string;
  name?: string;
}): Promise<ResponseContentError>;
```

Defined in: [modules/products/index.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L218)

Создание ярлыка

Метод добавляет один ярлык продавца. Можно создать максимум 15 ярлыков для одного продавца. Максимальная длина ярлыка — 15 символов. <br>Созданный ярлык можно получить в общем [списке](/openapi/work-with-products#tag/Yarlyki/paths/~1content~1v2~1tags/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `color?`: `string`; `name?`: `string`; \} | Request body data |
| `data.color?` | `string` | - |
| `data.name?` | `string` | - |

#### Returns

`Promise`\<[`ResponseContentError`](../-internal-/interfaces/ResponseContentError.md)\>

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
const result = await sdk.general.createContentTag({});
console.log(result);
```

***

### updateContentTag()

```ts
updateContentTag(id: number, data: {
  color?: string;
  name?: string;
}): Promise<ResponseContentError>;
```

Defined in: [modules/products/index.ts:238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L238)

Изменение ярлыка

Метод заменяет данные ярлыка: имя и цвет. <br>Новые данные можно получить в общем [списке](/openapi/work-with-products#tag/Yarlyki/paths/~1content~1v2~1tags/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `number` | Числовой ID ярлыка |
| `data` | \{ `color?`: `string`; `name?`: `string`; \} | Request body data |
| `data.color?` | `string` | - |
| `data.name?` | `string` | - |

#### Returns

`Promise`\<[`ResponseContentError`](../-internal-/interfaces/ResponseContentError.md)\>

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
const result = await sdk.general.updateContentTag('id-value', {});
console.log(result);
```

***

### deleteContentTag()

```ts
deleteContentTag(id: number): Promise<ResponseContentError>;
```

Defined in: [modules/products/index.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L257)

Удаление ярлыка

Метод удаляет ярлык из [списка ярлыков](/openapi/work-with-products#tag/Yarlyki/paths/~1content~1v2~1tags/get) продавца. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `number` | Числовой ID ярлыка |

#### Returns

`Promise`\<[`ResponseContentError`](../-internal-/interfaces/ResponseContentError.md)\>

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
const result = await sdk.general.deleteContentTag('id-value');
console.log(result);
```

***

### createNomenclatureLink()

```ts
createNomenclatureLink(data: {
  nmID?: number;
  tagsIDs?: number[];
}): Promise<ResponseContentError>;
```

Defined in: [modules/products/index.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L276)

Управление ярлыками в карточке товара

Метод добавляет или снимает ярлык с карточки товара. К карточке можно добавить максимум 15 ярлыков.<br> При удалении ярлыка из карточки товара он не удаляется из [списка ярлыков](/openapi/work-with-products#tag/Yarlyki/paths/~1content~1v2~1tags/get) продавца. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmID?`: `number`; `tagsIDs?`: `number`[]; \} | Request body data |
| `data.nmID?` | `number` | - |
| `data.tagsIDs?` | `number`[] | - |

#### Returns

`Promise`\<[`ResponseContentError`](../-internal-/interfaces/ResponseContentError.md)\>

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
const result = await sdk.general.createNomenclatureLink({});
console.log(result);
```

***

### createCardsList()

```ts
createCardsList(data: {
  settings?: {
     sort?: {
        ascending?: boolean;
     };
     filter?: {
        withPhoto?: number;
        textSearch?: string;
        tagIDs?: number[];
        allowedCategoriesOnly?: boolean;
        objectIDs?: number[];
        brands?: string[];
        imtID?: number;
     };
     cursor?: {
        limit?: number;
        updatedAt?: string;
        nmID?: number;
     };
  };
}, options?: {
  locale?: string;
}): Promise<{
  cards?: {
     nmID?: number;
     imtID?: number;
     nmUUID?: string;
     subjectID?: number;
     subjectName?: string;
     vendorCode?: string;
     brand?: string;
     title?: string;
     description?: string;
     needKiz?: boolean;
     photos?: {
        big?: string;
        c246x328?: string;
        c516x688?: string;
        square?: string;
        tm?: string;
     }[];
     video?: string;
     wholesale?: {
        enabled?: boolean;
        quantum?: number;
     };
     dimensions?: {
        length?: number;
        width?: number;
        height?: number;
        weightBrutto?: number;
        isValid?: boolean;
     };
     characteristics?: {
        id?: number;
        name?: string;
        value?: unknown;
     }[];
     sizes?: {
        chrtID?: number;
        techSize?: string;
        wbSize?: string;
        skus?: string[];
     }[];
     tags?: {
        id?: number;
        name?: string;
        color?: string;
     }[];
     createdAt?: string;
     updatedAt?: string;
  }[];
  cursor?: {
     updatedAt?: string;
     nmID?: number;
     total?: number;
  };
}>;
```

Defined in: [modules/products/index.ts:296](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L296)

Список карточек товаров

<div class="description_auth"> Метод доступен по <a href="/openapi/api-information#tag/Avtorizaciya/Kak-sozdat-token">токену</a> с категорией <strong>Контент</strong> или <strong>Продвижение</strong> </div> Метод возвращает список созданных карточек товаров. <div class="description_important"> В ответе метода не будет карточек, находящихся в корзине. Получить такие карточки можно через <a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post">отдельный метод</a>. </div> Чтобы получить **больше 100** карточек товаров, используйте пагинацию: 1. Сделайте первый запрос: <br> <pre style="background-color: rgb(38 50 56 / 5%); color: #e53935"> { "settings": { "cursor": { "limit": 100 }, "filter": { "withPhoto": -1 } } }</pre> 2. Пройдите в конец полученного списка карточек товаров. 3. Скопируйте из `cursor` две строки: - `"updatedAt": "***"` - `"nmID": ***` 4. Вставьте скопированные строки в параметр запроса `cursor`. 5. Повторите запрос. 6. Повторяйте пункты 2-5, пока поле `total` в ответе не станет меньше чем параметр `limit` в запросе. Это будет означать, что вы получили все карточки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `settings?`: \{ `sort?`: \{ `ascending?`: `boolean`; \}; `filter?`: \{ `withPhoto?`: `number`; `textSearch?`: `string`; `tagIDs?`: `number`[]; `allowedCategoriesOnly?`: `boolean`; `objectIDs?`: `number`[]; `brands?`: `string`[]; `imtID?`: `number`; \}; `cursor?`: \{ `limit?`: `number`; `updatedAt?`: `string`; `nmID?`: `number`; \}; \}; \} | Request body data |
| `data.settings?` | \{ `sort?`: \{ `ascending?`: `boolean`; \}; `filter?`: \{ `withPhoto?`: `number`; `textSearch?`: `string`; `tagIDs?`: `number`[]; `allowedCategoriesOnly?`: `boolean`; `objectIDs?`: `number`[]; `brands?`: `string`[]; `imtID?`: `number`; \}; `cursor?`: \{ `limit?`: `number`; `updatedAt?`: `string`; `nmID?`: `number`; \}; \} | - |
| `data.settings.sort?` | \{ `ascending?`: `boolean`; \} | - |
| `data.settings.sort.ascending?` | `boolean` | - |
| `data.settings.filter?` | \{ `withPhoto?`: `number`; `textSearch?`: `string`; `tagIDs?`: `number`[]; `allowedCategoriesOnly?`: `boolean`; `objectIDs?`: `number`[]; `brands?`: `string`[]; `imtID?`: `number`; \} | - |
| `data.settings.filter.withPhoto?` | `number` | - |
| `data.settings.filter.textSearch?` | `string` | - |
| `data.settings.filter.tagIDs?` | `number`[] | - |
| `data.settings.filter.allowedCategoriesOnly?` | `boolean` | - |
| `data.settings.filter.objectIDs?` | `number`[] | - |
| `data.settings.filter.brands?` | `string`[] | - |
| `data.settings.filter.imtID?` | `number` | - |
| `data.settings.cursor?` | \{ `limit?`: `number`; `updatedAt?`: `string`; `nmID?`: `number`; \} | - |
| `data.settings.cursor.limit?` | `number` | - |
| `data.settings.cursor.updatedAt?` | `string` | - |
| `data.settings.cursor.nmID?` | `number` | - |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<\{
  `cards?`: \{
     `nmID?`: `number`;
     `imtID?`: `number`;
     `nmUUID?`: `string`;
     `subjectID?`: `number`;
     `subjectName?`: `string`;
     `vendorCode?`: `string`;
     `brand?`: `string`;
     `title?`: `string`;
     `description?`: `string`;
     `needKiz?`: `boolean`;
     `photos?`: \{
        `big?`: `string`;
        `c246x328?`: `string`;
        `c516x688?`: `string`;
        `square?`: `string`;
        `tm?`: `string`;
     \}[];
     `video?`: `string`;
     `wholesale?`: \{
        `enabled?`: `boolean`;
        `quantum?`: `number`;
     \};
     `dimensions?`: \{
        `length?`: `number`;
        `width?`: `number`;
        `height?`: `number`;
        `weightBrutto?`: `number`;
        `isValid?`: `boolean`;
     \};
     `characteristics?`: \{
        `id?`: `number`;
        `name?`: `string`;
        `value?`: `unknown`;
     \}[];
     `sizes?`: \{
        `chrtID?`: `number`;
        `techSize?`: `string`;
        `wbSize?`: `string`;
        `skus?`: `string`[];
     \}[];
     `tags?`: \{
        `id?`: `number`;
        `name?`: `string`;
        `color?`: `string`;
     \}[];
     `createdAt?`: `string`;
     `updatedAt?`: `string`;
  \}[];
  `cursor?`: \{
     `updatedAt?`: `string`;
     `nmID?`: `number`;
     `total?`: `number`;
  \};
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
const result = await sdk.general.createCardsList({}, {});
console.log(result);
```

***

### createErrorList()

```ts
createErrorList(data: RequestPublicViewerPublicErrorsTableListV2, options?: {
  locale?: string;
}): Promise<ResponsePublicViewerPublicErrorsTableListV2>;
```

Defined in: [modules/products/index.ts:339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L339)

Список несозданных карточек товаров с ошибками

Метод возвращает список карточек товаров ([черновиков](https://seller.wildberries.ru/new-goods/error-cards)), при создании или редактировании которых произошли ошибки, с описанием этих ошибок. <br><br> Данные в ответе возвращаются пакетами `batch`. Один пакет содержит: - все ошибки по одной объединённой карточке товара `imtID` одного запроса при [создании](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post) карточек товаров - все ошибки одного запроса при [создании с присоединением](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post) или [редактировании](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post) карточек товаров <br><br> Чтобы получить более 100 пакетов, используйте пагинацию: 1. Сделайте первый запрос: <br> <pre style="background-color: rgb(38 50 56 / 5%); color: #e53935"> { "cursor": { "limit": 100 }, "order": { "ascending": true } }</pre> 2. Скопируйте `"updatedAt": "***"`,`"batchUUID": "***" `из `cursor` ответа и вставьте в `cursor` запроса. 3. Повторите запрос. 4. Повторяйте пункты 2 и 3, пока не получите в ответе `"next": false`. Это будет означать, что вы получили все пакеты. <div class="description_important"> Чтобы удалить карточку товара из списка, сделайте ещё один запрос на создание, создание с присоединением или редактирование карточки товара с исправленными ошибками </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 10 запросов | 6 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`RequestPublicViewerPublicErrorsTableListV2`](../-internal-/interfaces/RequestPublicViewerPublicErrorsTableListV2.md) | Request body data |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<[`ResponsePublicViewerPublicErrorsTableListV2`](../-internal-/interfaces/ResponsePublicViewerPublicErrorsTableListV2.md)\>

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
const result = await sdk.general.createErrorList({}, {});
console.log(result);
```

***

### createCardsUpdate()

```ts
createCardsUpdate(data?: {
  nmID: number;
  vendorCode: string;
  brand?: string;
  title?: string;
  description?: string;
  dimensions?: {
     length?: number;
     width?: number;
     height?: number;
     weightBrutto?: number;
  };
  characteristics?: {
     id: number;
     value: unknown;
  }[];
  sizes: {
     chrtID?: number;
     techSize?: string;
     wbSize?: string;
     skus?: string[];
  }[];
}[]): Promise<ResponseCardCreate>;
```

Defined in: [modules/products/index.ts:358](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L358)

Редактирование карточек товаров

Метод обновляет карточки товаров. Данные для обновления можно получить через [список карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) и [список карточек товаров в корзине](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post). <div class="description_important"> Карточка товара перезаписывается при обновлении. Поэтому в запросе нужно передать <strong>все</strong> параметры карточки, в том числе те, которые вы не собираетесь обновлять. </div> Нельзя редактировать или удалять баркоды, но можно добавить дополнительный баркод к карточке товара. Параметры `photos`, `video` и `tags` редактировать или удалять через данный метод нельзя.<br> Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`. <br><br> В одном запросе можно отредактировать максимум 3000 карточек товаров (`nmID`). Максимальный размер запроса 10 Мб.<br> Если ответ `Успешно` (`200`), но какие-то карточки не обновились, проверьте [список несозданных карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 10 запросов | 6 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `nmID`: `number`; `vendorCode`: `string`; `brand?`: `string`; `title?`: `string`; `description?`: `string`; `dimensions?`: \{ `length?`: `number`; `width?`: `number`; `height?`: `number`; `weightBrutto?`: `number`; \}; `characteristics?`: \{ `id`: `number`; `value`: `unknown`; \}[]; `sizes`: \{ `chrtID?`: `number`; `techSize?`: `string`; `wbSize?`: `string`; `skus?`: `string`[]; \}[]; \}[] | Request body data |

#### Returns

`Promise`\<[`ResponseCardCreate`](../-internal-/interfaces/ResponseCardCreate.md)\>

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
const result = await sdk.general.createCardsUpdate({});
console.log(result);
```

***

### createCardsMovenm()

```ts
createCardsMovenm(data?: 
  | RequestMoveNmsImtConn
| RequestMoveNmsImtDisconn): Promise<ResponseCardCreate>;
```

Defined in: [modules/products/index.ts:377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L377)

Объединение и разъединение карточек товаров

Метод объединяет и разъединяет карточки товаров. Карточки товаров считаются объединёнными, если у них одинаковый `imtID`. <br><br> Для объединения карточек товаров сделайте запрос **с указанием** `imtID`. Можно объединять не более 30 карточек товаров.<br> Для разъединения карточек товаров сделайте запрос **без указания** `imtID`. Для разъединенных карточек будут сгенерированы новые `imtID`. <br><br> Если вы разъедините одновременно несколько карточек товаров, эти карточки объединятся в одну и получат новый `imtID`.<br> Чтобы присвоить каждой карточке товара уникальный `imtID`, необходимо передавать по одной карточке товара за запрос.<br> <br> Максимальный размер запроса 10 Мб. <div class="description_important"> Объединить можно только карточки товаров с одинаковыми предметами. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \| [`RequestMoveNmsImtConn`](../-internal-/interfaces/RequestMoveNmsImtConn.md) \| [`RequestMoveNmsImtDisconn`](../-internal-/interfaces/RequestMoveNmsImtDisconn.md) | Request body data |

#### Returns

`Promise`\<[`ResponseCardCreate`](../-internal-/interfaces/ResponseCardCreate.md)\>

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
const result = await sdk.general.createCardsMovenm({});
console.log(result);
```

***

### createDeleteTrash()

```ts
createDeleteTrash(data: {
  nmIDs?: number[];
}): Promise<{
  data?: Record<string, never>;
  error?: boolean;
  errorText?: string;
  additionalErrors?: Record<string, never>;
}>;
```

Defined in: [modules/products/index.ts:396](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L396)

Перенос карточек товаров в корзину

Метод переносит [карточки товаров в корзину](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post). При этом карточки товаров не удаляются, их можно [восстановить](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1recover/post). <div class="description_important"> После переноса в корзину карточке товара присваивается новый <code>imtID</code>. </div> Карточки товаров удаляются автоматически, если лежат в корзине больше 30 дней. Очистка корзины происходит каждую ночь по московскому времени.<br> Карточки товаров можно удалить в любое время в [личном кабинете](https://seller.wildberries.ru/new-goods/basket-cards). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmIDs?`: `number`[]; \} | Request body data |
| `data.nmIDs?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `Record`\<`string`, `never`\>;
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
const result = await sdk.general.createDeleteTrash({});
console.log(result);
```

***

### createCardsRecover()

```ts
createCardsRecover(data: {
  nmIDs?: number[];
}): Promise<{
  data?: Record<string, never>;
  error?: boolean;
  errorText?: string;
  additionalErrors?: Record<string, never>;
}>;
```

Defined in: [modules/products/index.ts:415](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L415)

Восстановление карточек товаров из корзины

Метод восстанавливает [карточки товаров из корзины](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post). <div class="description_important"> Карточка товара сохраняет тот же <code>imtID</code>, что был присвоен ей при <a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1delete~1trash/post">перемещении в корзину</a>. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmIDs?`: `number`[]; \} | Request body data |
| `data.nmIDs?` | `number`[] | - |

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `Record`\<`string`, `never`\>;
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
const result = await sdk.general.createCardsRecover({});
console.log(result);
```

***

### createCardsTrash()

```ts
createCardsTrash(data: {
  settings?: {
     sort?: {
        ascending?: boolean;
     };
     cursor?: {
        limit?: number;
        trashedAt?: string;
        nmID?: number;
     };
     filter?: {
        textSearch?: string;
     };
  };
}, options?: {
  locale?: "ru" | "en" | "zh";
}): Promise<{
  cards?: {
     nmID?: number;
     vendorCode?: string;
     subjectID?: number;
     subjectName?: string;
     photos?: {
        big?: string;
        c246x328?: string;
        c516x688?: string;
        square?: string;
        tm?: string;
     }[];
     video?: string;
     wholesale?: {
        enabled?: boolean;
        quantum?: number;
     };
     sizes?: {
        chrtID?: number;
        techSize?: string;
        wbSize?: string;
        skus?: string[];
     }[];
     dimensions?: {
        length?: number;
        width?: number;
        height?: number;
        weightBrutto?: number;
        isValid?: boolean;
     };
     characteristics?: {
        id?: number;
        name?: string;
        value?: unknown;
     }[];
     createdAt?: string;
     trashedAt?: string;
  }[];
  cursor?: {
     trashedAt?: string;
     nmID?: number;
     total?: number;
  };
}>;
```

Defined in: [modules/products/index.ts:435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L435)

Список карточек товаров в корзине

<div class="description_auth"> Метод доступен по <a href="/openapi/api-information#tag/Avtorizaciya/Kak-sozdat-token">токену</a> с категорией <strong>Контент</strong> или <strong>Продвижение</strong> </div> Метод возвращает список карточек товаров в корзине.<br><br> Чтобы получить **больше 100** карточек товаров, воспользуйтесь пагинацией: 1. Сделайте первый запрос: <br> <pre style="background-color: rgb(38 50 56 / 5%); color: #e53935"> { "settings": { "cursor": { "limit": 100 }, "filter": { "withPhoto": -1 } } }</pre> 2. Пройдите в конец полученного списка карточек товаров. 3. Скопируйте из `cursor` две строки: - `"trashedAt": "***"` - `"nmID": ***` 4. Вставьте скопированные строки в параметр запроса `cursor`. 5. Повторите запрос. 6. Повторяйте пункты 2-5, пока поле `total` в ответе не станет меньше чем параметр `limit` в запросе. Это будет означать, что вы получили все карточки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `settings?`: \{ `sort?`: \{ `ascending?`: `boolean`; \}; `cursor?`: \{ `limit?`: `number`; `trashedAt?`: `string`; `nmID?`: `number`; \}; `filter?`: \{ `textSearch?`: `string`; \}; \}; \} | Request body data |
| `data.settings?` | \{ `sort?`: \{ `ascending?`: `boolean`; \}; `cursor?`: \{ `limit?`: `number`; `trashedAt?`: `string`; `nmID?`: `number`; \}; `filter?`: \{ `textSearch?`: `string`; \}; \} | - |
| `data.settings.sort?` | \{ `ascending?`: `boolean`; \} | - |
| `data.settings.sort.ascending?` | `boolean` | - |
| `data.settings.cursor?` | \{ `limit?`: `number`; `trashedAt?`: `string`; `nmID?`: `number`; \} | - |
| `data.settings.cursor.limit?` | `number` | - |
| `data.settings.cursor.trashedAt?` | `string` | - |
| `data.settings.cursor.nmID?` | `number` | - |
| `data.settings.filter?` | \{ `textSearch?`: `string`; \} | - |
| `data.settings.filter.textSearch?` | `string` | - |
| `options?` | \{ `locale?`: `"ru"` \| `"en"` \| `"zh"`; \} | Query parameters |
| `options.locale?` | `"ru"` \| `"en"` \| `"zh"` | - |

#### Returns

`Promise`\<\{
  `cards?`: \{
     `nmID?`: `number`;
     `vendorCode?`: `string`;
     `subjectID?`: `number`;
     `subjectName?`: `string`;
     `photos?`: \{
        `big?`: `string`;
        `c246x328?`: `string`;
        `c516x688?`: `string`;
        `square?`: `string`;
        `tm?`: `string`;
     \}[];
     `video?`: `string`;
     `wholesale?`: \{
        `enabled?`: `boolean`;
        `quantum?`: `number`;
     \};
     `sizes?`: \{
        `chrtID?`: `number`;
        `techSize?`: `string`;
        `wbSize?`: `string`;
        `skus?`: `string`[];
     \}[];
     `dimensions?`: \{
        `length?`: `number`;
        `width?`: `number`;
        `height?`: `number`;
        `weightBrutto?`: `number`;
        `isValid?`: `boolean`;
     \};
     `characteristics?`: \{
        `id?`: `number`;
        `name?`: `string`;
        `value?`: `unknown`;
     \}[];
     `createdAt?`: `string`;
     `trashedAt?`: `string`;
  \}[];
  `cursor?`: \{
     `trashedAt?`: `string`;
     `nmID?`: `number`;
     `total?`: `number`;
  \};
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
const result = await sdk.general.createCardsTrash({}, {});
console.log(result);
```

***

### getCardsLimits()

```ts
getCardsLimits(): Promise<{
  data?: {
     freeLimits?: number;
     paidLimits?: number;
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L453)

Лимиты карточек товаров

Возвращает бесплатные и платные лимиты продавца на [создание карточек товаров](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post).<br><br> Формула для получения количества карточек, которые можно создать: > (`freeLimits` + `paidLimits`) - количество созданных карточек Созданными считаются карточки, которые можно получить через методы [список карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) и [список карточек товаров в корзине](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Returns

`Promise`\<\{
  `data?`: \{
     `freeLimits?`: `number`;
     `paidLimits?`: `number`;
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.getCardsLimits();
console.log(result);
```

***

### createContentBarcode()

```ts
createContentBarcode(data: {
  count?: number;
}): Promise<{
  data?: string[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:472](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L472)

Генерация баркодов

Метод генерирует массив уникальных баркодов для создания размера в [карточке товара](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post). Можно использовать, если у вас нет собственных баркодов. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `count?`: `number`; \} | Request body data |
| `data.count?` | `number` | - |

#### Returns

`Promise`\<\{
  `data?`: `string`[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
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
const result = await sdk.general.createContentBarcode({});
console.log(result);
```

***

### createCardsUpload()

```ts
createCardsUpload(data?: {
  subjectID: number;
  variants: {
     brand?: string;
     title?: string;
     description?: string;
     vendorCode: string;
     wholesale?: {
        enabled?: boolean;
        quantum?: number;
     };
     dimensions?: {
        length?: number;
        width?: number;
        height?: number;
        weightBrutto?: number;
     };
     sizes?: {
        techSize?: string;
        wbSize?: string;
        price?: number;
        skus?: string[];
     }[];
     characteristics?: {
        id: number;
        value: unknown;
     }[];
  }[];
}[]): Promise<ResponseCardCreate>;
```

Defined in: [modules/products/index.ts:491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L491)

Создание карточек товаров

Метод создаёт карточки товаров c указанием описаний и характеристик товаров.<br> <div class="description_important"> Есть две формы запроса: для создания отдельных и объединённых карточек товаров. </div> Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`. <br><br> Создание карточки товара происходит асинхронно. После отправки запрос становится в очередь на обработку.<br> В одном запросе можно создать максимум 100 объединённых карточек товаров (`imtID`), по 30 карточек товаров в каждой. Максимальный размер запроса 10 Мб.<br> Если ответ `Успешно` (`200`), но какие-то карточки не создались, проверьте [список несозданных карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 10 запросов | 6 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `subjectID`: `number`; `variants`: \{ `brand?`: `string`; `title?`: `string`; `description?`: `string`; `vendorCode`: `string`; `wholesale?`: \{ `enabled?`: `boolean`; `quantum?`: `number`; \}; `dimensions?`: \{ `length?`: `number`; `width?`: `number`; `height?`: `number`; `weightBrutto?`: `number`; \}; `sizes?`: \{ `techSize?`: `string`; `wbSize?`: `string`; `price?`: `number`; `skus?`: `string`[]; \}[]; `characteristics?`: \{ `id`: `number`; `value`: `unknown`; \}[]; \}[]; \}[] | Request body data |

#### Returns

`Promise`\<[`ResponseCardCreate`](../-internal-/interfaces/ResponseCardCreate.md)\>

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
const result = await sdk.general.createCardsUpload({});
console.log(result);
```

***

### createUploadAdd()

```ts
createUploadAdd(data?: {
  imtID?: number;
  cardsToAdd?: {
     brand?: string;
     vendorCode: string;
     wholesale?: {
        enabled?: boolean;
        quantum?: number;
     };
     title?: string;
     description?: string;
     dimensions?: {
        length?: number;
        width?: number;
        height?: number;
        weightBrutto?: number;
     };
     sizes?: {
        techSize?: string;
        wbSize?: string;
        price?: number;
        skus?: string[];
     }[];
     characteristics?: {
        id: number;
        value: unknown;
     }[];
  }[];
}): Promise<ResponseCardCreate>;
```

Defined in: [modules/products/index.ts:510](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L510)

Создание карточек товаров с присоединением

Метод создаёт новые карточки товаров, присоединяя их к существующим карточкам. <br><br> Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`. <br><br> Создание карточки товара происходит асинхронно. После отправки запрос становится в очередь на обработку.<br>Максимальный размер запроса 10 Мб.<br> Если ответ `Успешно` (`200`), но какие-то карточки не создались, проверьте [список несозданных карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 10 запросов | 6 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `imtID?`: `number`; `cardsToAdd?`: \{ `brand?`: `string`; `vendorCode`: `string`; `wholesale?`: \{ `enabled?`: `boolean`; `quantum?`: `number`; \}; `title?`: `string`; `description?`: `string`; `dimensions?`: \{ `length?`: `number`; `width?`: `number`; `height?`: `number`; `weightBrutto?`: `number`; \}; `sizes?`: \{ `techSize?`: `string`; `wbSize?`: `string`; `price?`: `number`; `skus?`: `string`[]; \}[]; `characteristics?`: \{ `id`: `number`; `value`: `unknown`; \}[]; \}[]; \} | Request body data |
| `data.imtID?` | `number` | - |
| `data.cardsToAdd?` | \{ `brand?`: `string`; `vendorCode`: `string`; `wholesale?`: \{ `enabled?`: `boolean`; `quantum?`: `number`; \}; `title?`: `string`; `description?`: `string`; `dimensions?`: \{ `length?`: `number`; `width?`: `number`; `height?`: `number`; `weightBrutto?`: `number`; \}; `sizes?`: \{ `techSize?`: `string`; `wbSize?`: `string`; `price?`: `number`; `skus?`: `string`[]; \}[]; `characteristics?`: \{ `id`: `number`; `value`: `unknown`; \}[]; \}[] | - |

#### Returns

`Promise`\<[`ResponseCardCreate`](../-internal-/interfaces/ResponseCardCreate.md)\>

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
const result = await sdk.general.createUploadAdd({});
console.log(result);
```

***

### createMediaFile()

```ts
createMediaFile(): Promise<{
  data?: Record<string, never>;
  error?: boolean;
  errorText?: string;
  additionalErrors?: Record<string, never>;
}>;
```

Defined in: [modules/products/index.ts:528](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L528)

Загрузить медиафайл

Метод загружает и добавляет один медиафайл к карточке товара. Требования к изображениям: * максимум изображений для одной карточки товара — 30 * минимальное разрешение — 700x900 px * максимальный размер — 32 Мб * минимальное качество — 65% * форматы — JPG, PNG, BMP, GIF (статичные), WebP Требования к видео: * максимум одно видео для одной карточки товара * максимальный размер — 50 Мб * форматы — MOV, MP4 <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `Record`\<`string`, `never`\>;
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
const result = await sdk.general.createMediaFile();
console.log(result);
```

***

### createMediaSave()

```ts
createMediaSave(data: {
  nmId?: number;
  data?: string[];
}): Promise<{
  data?: Record<string, never>;
  error?: boolean;
  errorText?: string;
  additionalErrors?: Record<string, never>;
}>;
```

Defined in: [modules/products/index.ts:547](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L547)

Загрузить медиафайлы по ссылкам

Метод загружает набор медиафайлов в карточку товара через указание ссылок в запросе. <div class="description_important"> Новые медиафайлы полностью заменяют старые. Чтобы добавить новые медиафайлы, укажите в запросе ссылки одновременно на новые и старые медиафайлы. </div> Требования к ссылкам: * ссылка должна вести прямо на файл. Убедитесь, что ссылка не ведёт на страницу предпросмотра или авторизации, например. Если по ссылке открывается текстовая страница TXT или HTML, ссылка считается некорректной * для доступа к файлу по ссылке не нужна авторизация Требования к изображениям: * максимум изображений для одной карточки товара — 30 * минимальное разрешение — 700×900 px * максимальный размер — 32 Мб * минимальное качество — 65% * форматы — JPG, PNG, BMP, GIF (статичные), WebP Требования к видео: * максимум одно видео для одной карточки товара * максимальный размер — 50 Мб * форматы — MOV, MP4 Если видео или хотя бы одно изображение в запросе не соответствует требованиям, то даже при успешном ответе (`200`) ни одно изображение/видео не загрузится. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmId?`: `number`; `data?`: `string`[]; \} | Request body data |
| `data.nmId?` | `number` | - |
| `data.data?` | `string`[] | - |

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `Record`\<`string`, `never`\>;
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
const result = await sdk.general.createMediaSave({});
console.log(result);
```

***

### createUploadTask()

```ts
createUploadTask(): Promise<unknown>;
```

Defined in: [modules/products/index.ts:565](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L565)

Установить цены и скидки

Метод устанавливает цены и скидки для товаров. <br><br> Чтобы установить цены для размеров товара, используйте [отдельный метод](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1size/post). <div class="description_important"> Получить информацию о процессе установки цен и скидок можно с помощью методов <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get">состояния</a> и <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get">детализации</a> обработанной загрузки. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.createUploadTask();
console.log(result);
```

***

### createTaskSize()

```ts
createTaskSize(): Promise<unknown>;
```

Defined in: [modules/products/index.ts:583](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L583)

Установить цены для размеров

Метод устанавливает цены отдельно для размеров товаров. Работает только для товаров из категорий, где можно устанавливать цены отдельно для разных размеров. Для [таких товаров](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1size~1nm/get) `"editableSizePrice":true`. Чтобы установить цены и скидки для самих товаров, используйте [отдельный метод](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task/post). <div class="description_important"> Получить информацию о процессе установки цен и скидок можно с помощью методов <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get">состояния</a> и <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get">детализации</a> обработанной загрузки. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.createTaskSize();
console.log(result);
```

***

### createTaskClubDiscount()

```ts
createTaskClubDiscount(): Promise<unknown>;
```

Defined in: [modules/products/index.ts:601](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L601)

Установить скидки WB Клуба

Устанавливает скидки для товаров в рамках подписки [WB Клуб](https://seller.wildberries.ru/help-center/article/A-337). <div class="description_important"> Получить информацию о процессе установки цен и скидок можно с помощью методов <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get">состояния</a> и <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get">детализации</a> обработанной загрузки. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.createTaskClubDiscount();
console.log(result);
```

***

### getHistoryTasks()

```ts
getHistoryTasks(options?: {
  uploadID: number;
}): Promise<unknown>;
```

Defined in: [modules/products/index.ts:620](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L620)

Состояние обработанной загрузки

Метод возвращает информацию об обработанной загрузке цен и скидок. <div class="description_important"> Обработанная загрузка — это загрузка цен и скидок для <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task/post">товаров</a>, цен для <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1size/post">размеров товаров</a> и скидок <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post">WB Клуба</a>. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `uploadID`: `number`; \} | Query parameters |
| `options.uploadID?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.getHistoryTasks({});
console.log(result);
```

***

### getGoodsTask()

```ts
getGoodsTask(options?: {
  limit: number;
  offset?: number;
  uploadID: number;
}): Promise<unknown>;
```

Defined in: [modules/products/index.ts:639](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L639)

Детализация обработанной загрузки

Метод возвращает информацию о товарах и об ошибках в товарах в обработанной загрузке. <div class="description_important"> Обработанная загрузка — это загрузка цен и скидок для <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task/post">товаров</a>, цен для <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1size/post">размеров товаров</a> и скидок <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post">WB Клуба</a>. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; `uploadID`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.uploadID?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.getGoodsTask({});
console.log(result);
```

***

### getBufferTasks()

```ts
getBufferTasks(options?: {
  uploadID: number;
}): Promise<unknown>;
```

Defined in: [modules/products/index.ts:658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L658)

Состояние необработанной загрузки

Метод возвращает информацию про загрузку скидок в обработке. <div class="description_important"> Необработанная загрузка — это загрузка скидок в <a href="/openapi/promotion#tag/Kalendar-akcij">календаре акций</a>. Такие скидки применятся к товарам только в момент старта акции. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `uploadID`: `number`; \} | Query parameters |
| `options.uploadID?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.getBufferTasks({});
console.log(result);
```

***

### getGoodsTask2()

```ts
getGoodsTask2(options?: {
  limit: number;
  offset?: number;
  uploadID: number;
}): Promise<unknown>;
```

Defined in: [modules/products/index.ts:677](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L677)

Детализация необработанной загрузки

Метод возвращает информацию о товарах и ошибках в товарах из загрузки в обработке. <div class="description_important"> Необработанная загрузка — это загрузка скидок в <a href="/openapi/promotion#tag/Kalendar-akcij">календаре акций</a>. Такие скидки применятся к товарам только в момент старта акции. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; `uploadID`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.uploadID?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.getGoodsTask({});
console.log(result);
```

***

### getGoodsFilter()

```ts
getGoodsFilter(options?: {
  limit: number;
  offset?: number;
  filterNmID?: number;
}): Promise<unknown>;
```

Defined in: [modules/products/index.ts:696](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L696)

Получить товары с ценами

Метод возвращает информацию о товарах: цены, валюту, общие скидки и скидки [WB Клуба](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post). <br><br> В одном запросе можно указать только один артикул. <br><br> Чтобы получить информацию обо всех товарах продавца, не указывая артикулы, установите `limit=1000`, в параметре `offset` установите смещение по количеству записей. Количество нужно рассчитать по формуле: `offset` плюс `limit` из предыдущего запроса. Повторяйте запрос, пока вы не получите ответ с пустым массивом.<br><br> Используйте отдельные методы, чтобы получить информацию: - о [нескольких товарах по артикулам](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post) - о [размерах товара](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1size~1nm/get) <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; `filterNmID?`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.filterNmID?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.getGoodsFilter({});
console.log(result);
```

***

### createGoodsFilter()

```ts
createGoodsFilter(): Promise<unknown>;
```

Defined in: [modules/products/index.ts:714](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L714)

Получить товары с ценами по артикулам

Метод возвращает информацию о товарах по их артикулам: цены, валюту, общие скидки и скидки [WB Клуба](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post). <br><br> В одном запросе можно указать более одного артикула. <br><br> Используйте отдельные методы, чтобы получить информацию: - обо [всех товарах продавца, не указывая артикулы](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) - о [размерах товара](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1size~1nm/get) <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.createGoodsFilter();
console.log(result);
```

***

### getSizeNm()

```ts
getSizeNm(options?: {
  limit: number;
  offset?: number;
  nmID: number;
}): Promise<unknown>;
```

Defined in: [modules/products/index.ts:733](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L733)

Получить размеры товара с ценами

Метод возвращает информацию обо всех размерах одного товара: цены, валюту, общие скидки и скидки для [WB Клуба](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post). <br><br> Работает только для товаров из категорий, где можно устанавливать цены отдельно для разных размеров. Для таких товаров `"editableSizePrice":true`. <br><br> Чтобы получить информацию о самом товаре, используйте [отдельный метод](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; `nmID`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.nmID?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.getSizeNm({});
console.log(result);
```

***

### getQuarantineGoods()

```ts
getQuarantineGoods(options?: {
  limit: number;
  offset?: number;
}): Promise<unknown>;
```

Defined in: [modules/products/index.ts:752](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L752)

Получить товары в карантине

Метод возвращает информацию о товарах в карантине. <br><br> Если новая цена товара со скидкой будет минимум в 3 раза меньше старой, товар попадёт в [карантин](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) и будет продаваться по старой цене. Ошибка об этом будет в ответах методов [состояний загрузок](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get). <br><br> Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine). <br><br> Для товаров с [поразмерной установкой цен](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1size/post) карантин не применяется. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; \} | Query parameters |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

Response data

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
const result = await sdk.general.getQuarantineGoods({});
console.log(result);
```

***

### createStock()

```ts
createStock(warehouseId: number, data: {
  skus: string[];
}): Promise<{
  stocks?: {
     sku?: string;
     amount?: number;
  }[];
}>;
```

Defined in: [modules/products/index.ts:772](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L772)

Получить остатки товаров

Метод возвращает данные об остатках товаров на [складах продавца](/openapi/work-with-products#tag/Sklady-prodavca). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>остатков на складах продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data` | \{ `skus`: `string`[]; \} | Request body data |
| `data.skus` | `string`[] | - |

#### Returns

`Promise`\<\{
  `stocks?`: \{
     `sku?`: `string`;
     `amount?`: `number`;
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
const result = await sdk.general.createStock('warehouseId-value', {});
console.log(result);
```

***

### updateStock()

```ts
updateStock(warehouseId: number, data?: {
  stocks: {
     sku?: string;
     amount?: number;
  }[];
}): Promise<void>;
```

Defined in: [modules/products/index.ts:791](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L791)

Обновить остатки товаров

Метод обновляет количество остатков товаров продавца [в списке](/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca/paths/~1api~1v3~1stocks~1%7BwarehouseId%7D/post). <div class="description_important"> Названия параметров запроса не валидируются. При отправке некорректных названий вы получите успешный ответ (<code>204</code>), но остатки не обновятся. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>остатков на складах продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data?` | \{ `stocks`: \{ `sku?`: `string`; `amount?`: `number`; \}[]; \} | Request body data |
| `data.stocks?` | \{ `sku?`: `string`; `amount?`: `number`; \}[] | - |

#### Returns

`Promise`\<`void`\>

Response data

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
const result = await sdk.general.updateStock('warehouseId-value', {});
```

***

### deleteStock()

```ts
deleteStock(warehouseId: number, data: {
  skus?: string[];
}): Promise<void>;
```

Defined in: [modules/products/index.ts:810](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L810)

Удалить остатки товаров

Метод удаляет запись об остатках товаров продавца из [списка остатков](/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca/paths/~1api~1v3~1stocks~1%7BwarehouseId%7D/post). <div class="description_important"> <strong>Действие необратимо</strong>. Удаленный остаток будет необходимо загрузить повторно для возобновления продаж. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>остатков на складах продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data` | \{ `skus?`: `string`[]; \} | Request body data |
| `data.skus?` | `string`[] | - |

#### Returns

`Promise`\<`void`\>

Response data

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
const result = await sdk.general.deleteStock('warehouseId-value', {});
```

***

### offices()

```ts
offices(): Promise<Office[]>;
```

Defined in: [modules/products/index.ts:828](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L828)

Получить список складов WB

Метод возвращает список всех складов WB для привязки к складам продавца. Предназначен для определения складов WB, чтобы сдавать готовые заказы по модели [FBS](/openapi/orders-fbs#tag/Zakazy-FBS) (Fulfillment by Seller). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Returns

`Promise`\<[`Office`](../-internal-/interfaces/Office.md)[]\>

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
const result = await sdk.general.offices();
console.log(result);
```

***

### warehouses()

```ts
warehouses(): Promise<Warehouse[]>;
```

Defined in: [modules/products/index.ts:846](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L846)

Получить список складов продавца

Метод возвращает список всех складов продавца. Может использоваться для получения [остатков товаров](/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca/paths/~1api~1v3~1stocks~1%7BwarehouseId%7D/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Returns

`Promise`\<[`Warehouse`](../-internal-/interfaces/Warehouse.md)[]\>

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
const result = await sdk.general.warehouses();
console.log(result);
```

***

### createWarehous()

```ts
createWarehous(data: {
  name: string;
  officeId: number;
}): Promise<{
  id?: number;
}>;
```

Defined in: [modules/products/index.ts:865](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L865)

Создать склад продавца

Метод создаёт склад продавца для работы с [остатками товаров](/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca/paths/~1api~1v3~1stocks~1%7BwarehouseId%7D/post). Нужно привязать к складу продавца [склад WB](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1offices/get) для работы по модели [FBS](/openapi/orders-fbs#tag/Zakazy-FBS) (Fulfillment by Seller). <div class="description_important"> Нельзя привязывать склад WB, который уже используется </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `name`: `string`; `officeId`: `number`; \} | Request body data |
| `data.name` | `string` | - |
| `data.officeId` | `number` | - |

#### Returns

`Promise`\<\{
  `id?`: `number`;
\}\>

Создано

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
const result = await sdk.general.createWarehous({});
console.log(result);
```

***

### updateWarehous()

```ts
updateWarehous(warehouseId: number, data: {
  name: string;
  officeId: number;
}): Promise<void>;
```

Defined in: [modules/products/index.ts:884](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L884)

Обновить склад продавца

Метод обновляет данные склада продавца в [списке складов](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1warehouses/get). Данные о привязанном [складе WB](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1offices/get) можно изменить один раз в сутки. <div class="description_important"> Нельзя привязывать склад WB, который уже используется </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data` | \{ `name`: `string`; `officeId`: `number`; \} | Request body data |
| `data.name` | `string` | - |
| `data.officeId` | `number` | - |

#### Returns

`Promise`\<`void`\>

Response data

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
const result = await sdk.general.updateWarehous('warehouseId-value', {});
```

***

### deleteWarehous()

```ts
deleteWarehous(warehouseId: number): Promise<void>;
```

Defined in: [modules/products/index.ts:902](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L902)

Удалить склад продавца

Метод удаляет склад продавца из [списка складов](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1warehouses/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |

#### Returns

`Promise`\<`void`\>

Response data

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
const result = await sdk.general.deleteWarehous('warehouseId-value');
```

***

### getWarehousesContact()

```ts
getWarehousesContact(warehouseId: number): Promise<{
  contacts?: {
     comment?: string;
     phone?: string;
  }[];
}>;
```

Defined in: [modules/products/index.ts:921](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L921)

Список контактов

Метод возвращает список контактов, привязанных к [складу продавца](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1warehouses/get). <br> Только для складов с типом доставки `3` — доставка курьером WB (DBW). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для следующих методов DBW: <ul> <li>получение и обновление списка контактов</li> <li>получение и удаление метаданных</li> <li>методы сборочных заданий</li> </ul> | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |

#### Returns

`Promise`\<\{
  `contacts?`: \{
     `comment?`: `string`;
     `phone?`: `string`;
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
const result = await sdk.general.getWarehousesContact('warehouseId-value');
console.log(result);
```

***

### updateWarehousesContact()

```ts
updateWarehousesContact(warehouseId: number, data: StoreContactRequestBody): Promise<void>;
```

Defined in: [modules/products/index.ts:940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/products/index.ts#L940)

Обновить список контактов

Метод обновляет список контактов [склада продавца](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1warehouses/get). <div class="description_important"> Список контактов перезаписывается при обновлении. Поэтому в запросе нужно передать <strong>все</strong> параметры списка контактов, в том числе те, которые вы не собираетесь обновлять. </div> Только для складов с типом доставки `3` — курьером WB (DBW). <br><br> К складу можно добавить максимум 5 контактов. Чтобы удалить контакты, отправьте пустой массив `contacts`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для следующих методов DBW: <ul> <li>получение и обновление списка контактов</li> <li>получение и удаление метаданных</li> <li>методы сборочных заданий</li> </ul> | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data` | [`StoreContactRequestBody`](../-internal-/interfaces/StoreContactRequestBody.md) | Request body data |

#### Returns

`Promise`\<`void`\>

Response data

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
const result = await sdk.general.updateWarehousesContact('warehouseId-value', {});
```
