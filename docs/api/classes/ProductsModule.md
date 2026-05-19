[Wildberries API TypeScript SDK](../modules.md) / ProductsModule

# Class: ProductsModule

Defined in: [modules/products/index.ts:194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L194)

## Constructors

### Constructor

```ts
new ProductsModule(client: BaseClient): ProductsModule;
```

Defined in: [modules/products/index.ts:195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L195)

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
}): Promise<GetParentAllResponse>;
```

Defined in: [modules/products/index.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L218)

Родительские категории товаров

Returns parent category names and IDs for product card creation (e.g., Electronics, Household chemicals).

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

#### Returns

`Promise`\<[`GetParentAllResponse`](../-internal-/interfaces/GetParentAllResponse.md)\>

Parent categories list

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getParentAll({ locale: 'ru' });
console.log(result.data); // Parent categories array
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

Defined in: [modules/products/index.ts:253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L253)

Список предметов

Returns parent category names and their subjects with IDs (e.g., category "Toys" contains "Kaleidoscopes", "Dolls", "Balls").

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; `name?`: `string`; `limit?`: `number`; `offset?`: `number`; `parentID?`: `number`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |
| `options.name?` | `string` | Subject name filter |
| `options.limit?` | `number` | Number of items to return |
| `options.offset?` | `number` | Items offset |
| `options.parentID?` | `number` | Parent category ID filter |

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

List of subjects with their parent categories

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getObjectAll({ parentID: 306, locale: 'ru', limit: 50 });
console.log(result.data); // [{ subjectID, parentID, subjectName, parentName }]
```

***

### getObjectCharc()

```ts
getObjectCharc(subjectId: number, options?: {
  locale?: string;
}): Promise<{
  data?: SubjectCharacteristic[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}>;
```

Defined in: [modules/products/index.ts:299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L299)

Характеристики предмета

Returns characteristic parameters for a subject: names, data types, units of measure, etc.
Use separate methods for Color, Gender, Country, Season, VAT, and TNVED values.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `subjectId` | `number` | ID предмета |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

#### Returns

`Promise`\<\{
  `data?`: [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
\}\>

Subject characteristics list

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getObjectCharc(105, { locale: 'ru' });
console.log(result.data); // [{ charcID, name, required, unitName, charcType }]
```

***

### getDirectoryColors()

```ts
getDirectoryColors(options?: {
  locale?: string;
}): Promise<GetDirectoryColorsResponse>;
```

Defined in: [modules/products/index.ts:340](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L340)

Цвет

Returns possible values for the "Color" product characteristic.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

#### Returns

`Promise`\<[`GetDirectoryColorsResponse`](../-internal-/interfaces/GetDirectoryColorsResponse.md)\>

Available color values

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getDirectoryColors({ locale: 'ru' });
console.log(result.data); // Available color values
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

Defined in: [modules/products/index.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L371)

Пол

Returns possible values for the "Gender" product characteristic.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

#### Returns

`Promise`\<\{
  `data?`: `string`[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
\}\>

Available gender values

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getDirectoryKinds({ locale: 'ru' });
console.log(result.data); // ['Мужской', 'Женский', 'Унисекс']
```

***

### getDirectoryCountries()

```ts
getDirectoryCountries(options?: {
  locale?: string;
}): Promise<GetDirectoryCountriesResponse>;
```

Defined in: [modules/products/index.ts:406](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L406)

Страна производства

Returns possible values for the "Country of manufacture" product characteristic.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

#### Returns

`Promise`\<[`GetDirectoryCountriesResponse`](../-internal-/interfaces/GetDirectoryCountriesResponse.md)\>

Available country values

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getDirectoryCountries({ locale: 'ru' });
console.log(result.data); // Available country values
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

Defined in: [modules/products/index.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L439)

Сезон

Returns possible values for the "Season" product characteristic.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

#### Returns

`Promise`\<\{
  `data?`: `string`[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
\}\>

Available season values

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getDirectorySeasons({ locale: 'ru' });
console.log(result.data); // ['Лето', 'Зима', 'Демисезон', 'Всесезон']
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

Defined in: [modules/products/index.ts:474](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L474)

Ставка НДС

Returns possible values for the "VAT rate" product characteristic.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

#### Returns

`Promise`\<\{
  `data?`: `string`[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
\}\>

Available VAT rate values

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getDirectoryVat({ locale: 'ru' });
console.log(result.data); // Available VAT rate values
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

Defined in: [modules/products/index.ts:511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L511)

ТНВЭД-код

Returns list of TNVED codes by subject ID and optional code fragment search.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `subjectID`: `number`; `search?`: `number`; `locale?`: `string`; \} | Query parameters |
| `options.subjectID?` | `number` | Subject ID (required) |
| `options.search?` | `number` | TNVED code fragment to search |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

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

TNVED codes with KIZ marking flag

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getDirectoryTnved({ subjectID: 105, search: 6403 });
console.log(result.data); // [{ tnved: '6403919100', isKiz: true }]
```

***

### getBrands()

```ts
getBrands(subjectId: number, next?: number): Promise<BrandsResponse>;
```

Defined in: [modules/products/index.ts:564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L564)

Бренды

Метод возвращает список брендов по ID предмета.
Используйте курсорную пагинацию с параметром `next` для получения всех результатов.

Rate limit: 1 запрос в секунду, всплеск 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `subjectId` | `number` | ID предмета |
| `next?` | `number` | Курсор пагинации из предыдущего ответа |

#### Returns

`Promise`\<[`BrandsResponse`](../-internal-/interfaces/BrandsResponse.md)\>

Пагинированный список брендов с общим количеством

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki](https://dev.wildberries.ru/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki)

#### Example

```typescript
// Получить первую страницу брендов для предмета 1234
const result = await sdk.products.getBrands(1234);
console.log(`Всего брендов: ${result.total}`);

// Пагинация по всем брендам
let next: number | undefined;
do {
  const page = await sdk.products.getBrands(1234, next);
  page.brands.forEach(b => console.log(b.name));
  next = page.next;
} while (next);
```

***

### getContentTags()

```ts
getContentTags(): Promise<GetContentTagsResponse>;
```

Defined in: [modules/products/index.ts:593](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L593)

Список ярлыков

Returns all seller tags for grouping and filtering products.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Returns

`Promise`\<[`GetContentTagsResponse`](../-internal-/interfaces/GetContentTagsResponse.md)\>

Seller tags list

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getContentTags();
console.log(result.data); // Seller tags array
```

***

### createContentTag()

```ts
createContentTag(data: {
  color?: string;
  name?: string;
}): Promise<ResponseContentError>;
```

Defined in: [modules/products/index.ts:624](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L624)

Создание ярлыка

Creates a seller tag. Max 15 tags per seller, max 15 characters per tag name.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `color?`: `string`; `name?`: `string`; \} | Tag creation data |
| `data.color?` | `string` | Tag color |
| `data.name?` | `string` | Tag name (max 15 characters) |

#### Returns

`Promise`\<[`ResponseContentError`](../-internal-/interfaces/ResponseContentError.md)\>

Creation result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createContentTag({ color: '#ff0000', name: 'Sale' });
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

Defined in: [modules/products/index.ts:655](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L655)

Изменение ярлыка

Replaces tag data: name and color.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `number` | Числовой ID ярлыка |
| `data` | \{ `color?`: `string`; `name?`: `string`; \} | Tag update data |
| `data.color?` | `string` | New tag color |
| `data.name?` | `string` | New tag name |

#### Returns

`Promise`\<[`ResponseContentError`](../-internal-/interfaces/ResponseContentError.md)\>

Update result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.updateContentTag(42, { color: '#00ff00', name: 'New Arrivals' });
console.log(result);
```

***

### deleteContentTag()

```ts
deleteContentTag(id: number): Promise<ResponseContentError>;
```

Defined in: [modules/products/index.ts:686](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L686)

Удаление ярлыка

Deletes a tag from the seller's tag list.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `number` | Числовой ID ярлыка |

#### Returns

`Promise`\<[`ResponseContentError`](../-internal-/interfaces/ResponseContentError.md)\>

Deletion result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.deleteContentTag(42);
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

Defined in: [modules/products/index.ts:717](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L717)

Управление ярлыками в карточке товара

Adds or removes tags from a product card. Max 15 tags per card.
Removing a tag from a card does not delete it from the seller's tag list.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmID?`: `number`; `tagsIDs?`: `number`[]; \} | Tag link data |
| `data.nmID?` | `number` | Product card nomenclature ID |
| `data.tagsIDs?` | `number`[] | Array of tag IDs to link/unlink |

#### Returns

`Promise`\<[`ResponseContentError`](../-internal-/interfaces/ResponseContentError.md)\>

Link result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createNomenclatureLink({ nmID: 12345678, tagsIDs: [1, 2, 3] });
console.log(result);
```

***

### getCardsList()

```ts
getCardsList(data: {
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
     kizMarked?: boolean;
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
     characteristics?: CardCharacteristicOutput[];
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

Defined in: [modules/products/index.ts:765](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L765)

Список карточек товаров

Returns a paginated list of product cards. Trashed cards are excluded; use getTrashedCards() instead.
Use cursor-based pagination with updatedAt and nmID from the response cursor to fetch more than 100 cards.

Rate limit: 100 req/min, 600ms interval, burst 5

⚠️ **Deadline 2026-06-16**: WB changes the `withPhoto` filter schema.
`withPhoto: 0` (or missing) currently means "only no-photo cards" but will mean
"ALL cards" after the deadline. A new value `withPhoto: 2` will mean "only no-photo
cards" (replacing the old `0` semantic). If your code passes `withPhoto: 0` to
filter for no-photo cards, you MUST migrate to `withPhoto: 2` (or
`WITH_PHOTO_FILTER.NO_PHOTO`) before 2026-06-16. See
`docs/guides/withphoto-semantic-migration.md` for the full migration matrix.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `settings?`: \{ `sort?`: \{ `ascending?`: `boolean`; \}; `filter?`: \{ `withPhoto?`: `number`; `textSearch?`: `string`; `tagIDs?`: `number`[]; `allowedCategoriesOnly?`: `boolean`; `objectIDs?`: `number`[]; `brands?`: `string`[]; `imtID?`: `number`; \}; `cursor?`: \{ `limit?`: `number`; `updatedAt?`: `string`; `nmID?`: `number`; \}; \}; \} | Request body with settings, filters, and cursor |
| `data.settings?` | \{ `sort?`: \{ `ascending?`: `boolean`; \}; `filter?`: \{ `withPhoto?`: `number`; `textSearch?`: `string`; `tagIDs?`: `number`[]; `allowedCategoriesOnly?`: `boolean`; `objectIDs?`: `number`[]; `brands?`: `string`[]; `imtID?`: `number`; \}; `cursor?`: \{ `limit?`: `number`; `updatedAt?`: `string`; `nmID?`: `number`; \}; \} | - |
| `data.settings.sort?` | \{ `ascending?`: `boolean`; \} | - |
| `data.settings.sort.ascending?` | `boolean` | - |
| `data.settings.filter?` | \{ `withPhoto?`: `number`; `textSearch?`: `string`; `tagIDs?`: `number`[]; `allowedCategoriesOnly?`: `boolean`; `objectIDs?`: `number`[]; `brands?`: `string`[]; `imtID?`: `number`; \} | - |
| `data.settings.filter.withPhoto?` | `number` | Photo filter. Schema changes 2026-06-16: - `-1` — all cards (unchanged) - `0` or missing — all cards (was "no photo only" until 2026-06-16) - `1` — only with photo (unchanged) - `2` — only without photo (NEW; replaces legacy `0` semantic) Use [WITH\_PHOTO\_FILTER](../variables/WITH_PHOTO_FILTER.md) for self-documenting code that survives the schema change. |
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
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

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
     `kizMarked?`: `boolean`;
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
     `characteristics?`: [`CardCharacteristicOutput`](../-internal-/interfaces/CardCharacteristicOutput.md)[];
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

Product cards with pagination cursor

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: WITH_PHOTO_FILTER.ALL },
  },
}, { locale: 'ru' });
console.log(result.cards); // Product cards array
console.log(result.cursor?.total); // Total count
```

***

### createErrorList()

```ts
createErrorList(data: RequestPublicViewerPublicErrorsTableListV2, options?: {
  locale?: string;
}): Promise<ResponsePublicViewerPublicErrorsTableListV2>;
```

Defined in: [modules/products/index.ts:938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L938)

Список несозданных карточек товаров с ошибками

Returns product cards (drafts) that failed during creation or editing, with error descriptions.
Data is returned in batches. Use cursor pagination with updatedAt and batchUUID.

Rate limit: 10 req/min, 6s interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`RequestPublicViewerPublicErrorsTableListV2`](../-internal-/interfaces/RequestPublicViewerPublicErrorsTableListV2.md) | Request body with cursor and order settings |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | Language locale (e.g., 'ru', 'en') |

#### Returns

`Promise`\<[`ResponsePublicViewerPublicErrorsTableListV2`](../-internal-/interfaces/ResponsePublicViewerPublicErrorsTableListV2.md)\>

Error list with pagination

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createErrorList(
  { cursor: { limit: 100 }, order: { ascending: true } },
  { locale: 'ru' }
);
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
  characteristics?: CardCharacteristicInput[];
  sizes: {
     chrtID?: number;
     techSize?: string;
     wbSize?: string;
     skus?: string[];
  }[];
  kizMarked?: boolean;
}[]): Promise<ResponseCardCreate>;
```

Defined in: [modules/products/index.ts:977](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L977)

Редактирование карточек товаров

Updates product cards. Card is fully overwritten, so all parameters must be sent including unchanged ones.
Cannot edit barcodes, photos, video, or tags. Max 3000 cards per request, 10 MB max.
Dimensions in cm, weight in kg.

Rate limit: 10 req/min, 6s interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `nmID`: `number`; `vendorCode`: `string`; `brand?`: `string`; `title?`: `string`; `description?`: `string`; `dimensions?`: \{ `length?`: `number`; `width?`: `number`; `height?`: `number`; `weightBrutto?`: `number`; \}; `characteristics?`: [`CardCharacteristicInput`](../-internal-/interfaces/CardCharacteristicInput.md)[]; `sizes`: \{ `chrtID?`: `number`; `techSize?`: `string`; `wbSize?`: `string`; `skus?`: `string`[]; \}[]; `kizMarked?`: `boolean`; \}[] | Array of product cards to update |

#### Returns

`Promise`\<[`ResponseCardCreate`](../-internal-/interfaces/ResponseCardCreate.md)\>

Update result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createCardsUpdate([{
  nmID: 12345678,
  vendorCode: 'ART-001',
  title: 'Updated Product',
  sizes: [{ techSize: '42', skus: ['1234567890123'] }],
  characteristics: [{ id: 1, value: 'Blue' }],
}]);
console.log(result);
```

***

### createCardsMovenm()

```ts
createCardsMovenm(data?: 
  | RequestMoveNmsImtConn
| RequestMoveNmsImtDisconn): Promise<ResponseCardCreate>;
```

Defined in: [modules/products/index.ts:1023](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1023)

Объединение и разъединение карточек товаров

Merges or splits product cards by imtID. With imtID: merge (max 30 cards, same subject only).
Without imtID: split (new imtID generated). Max request size 10 MB.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \| [`RequestMoveNmsImtConn`](../-internal-/interfaces/RequestMoveNmsImtConn.md) \| [`RequestMoveNmsImtDisconn`](../-internal-/interfaces/RequestMoveNmsImtDisconn.md) | Merge/split request (with or without imtID) |

#### Returns

`Promise`\<[`ResponseCardCreate`](../-internal-/interfaces/ResponseCardCreate.md)\>

Operation result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
// Merge cards under a single imtID
const result = await sdk.products.createCardsMovenm({
  imtID: 98765,
  nmIDs: [12345678, 12345679],
});
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

Defined in: [modules/products/index.ts:1055](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1055)

Перенос карточек товаров в корзину

Moves product cards to trash. Cards are not deleted and can be recovered.
Cards get a new imtID after trashing. Auto-deleted after 30 days.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmIDs?`: `number`[]; \} | Request body with nmIDs to trash |
| `data.nmIDs?` | `number`[] | Array of product card IDs to move to trash |

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `Record`\<`string`, `never`\>;
\}\>

Trash operation result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createDeleteTrash({ nmIDs: [12345678, 12345679] });
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

Defined in: [modules/products/index.ts:1092](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1092)

Восстановление карточек товаров из корзины

Restores product cards from trash. Card retains the imtID assigned when it was trashed.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmIDs?`: `number`[]; \} | Request body with nmIDs to recover |
| `data.nmIDs?` | `number`[] | Array of product card IDs to restore |

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `Record`\<`string`, `never`\>;
\}\>

Recovery result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createCardsRecover({ nmIDs: [12345678] });
console.log(result);
```

***

### deleteCardsFromTrash()

```ts
deleteCardsFromTrash(data: DeleteCardsFromTrashRequest): Promise<DeleteCardsFromTrashResponse>;
```

Defined in: [modules/products/index.ts:1166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1166)

Окончательно удалить карточки товаров из корзины

Permanently delete product cards from trash (irreversible). Frees up limit slots
immediately, bypassing the 30-day auto-cleanup. Complement to `createDeleteTrash()`
(soft, move to trash) — call this when you want to recover limit slots NOW.

**Sandbox-only at v3.13.1 release (2026-05-15)**: WB announced this endpoint in the
Sandbox environment. Production availability is tracked via WL-5 in
`backlog/watch-list.md`. When WB confirms production release, this JSDoc marker
will drop in a patch release.

Workflow:
```
createDeleteTrash → cards → trash (soft, 30d auto-cleanup)
       │
       ├── createCardsRecover → restore
       ├── wait 30d            → auto-cleanup
       └── deleteCardsFromTrash → hard delete NOW (this method)
```

Rate limit: matches `createCardsRecover` sibling (server-side enforced)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`DeleteCardsFromTrashRequest`](../interfaces/DeleteCardsFromTrashRequest.md) | Request body with nmIDs to permanently delete from trash |

#### Returns

`Promise`\<[`DeleteCardsFromTrashResponse`](../interfaces/DeleteCardsFromTrashResponse.md)\>

Standard content-api envelope (error flag, errorText, additionalErrors)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

 - [https://dev.wildberries.ru/docs/openapi-other/sandbox-environment](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment) (search for `cards/delete` under Работа с товарами section)
 - [ProductsModule.createDeleteTrash](#createdeletetrash) — move TO trash (soft)
 - [ProductsModule.createCardsRecover](#createcardsrecover) — restore from trash
 - [ProductsModule.getCardsLimits](#getcardslimits) — pre-flight limit check

#### Since

3.13.1

#### Example

```typescript
// Free up limit slots immediately by permanently deleting trashed cards
const limits = await sdk.products.getCardsLimits();
// Treat undefined freeLimits as "no slots free" (WB may omit when zero)
if (limits.data && !limits.data.freeLimits) {
  // No free slots — clear old trash to make room
  const trashed = await sdk.products.getTrashedCards({
    settings: { cursor: { limit: 100 } },
  });
  const oldIds = trashed.cards
    ?.filter((c) => c.nmID !== undefined)
    .map((c) => c.nmID as number) ?? [];

  if (oldIds.length > 0) {
    const result = await sdk.products.deleteCardsFromTrash({ nmIDs: oldIds });
    if (result.error) {
      console.error('Delete failed:', result.errorText);
    }
  }
}
```

***

### getTrashedCards()

```ts
getTrashedCards(data: {
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
     characteristics?: CardCharacteristicOutput[];
     needKiz?: boolean;
     kizMarked?: boolean;
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

Defined in: [modules/products/index.ts:1200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1200)

Список карточек товаров в корзине

Returns trashed product cards with cursor-based pagination (trashedAt + nmID).

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `settings?`: \{ `sort?`: \{ `ascending?`: `boolean`; \}; `cursor?`: \{ `limit?`: `number`; `trashedAt?`: `string`; `nmID?`: `number`; \}; `filter?`: \{ `textSearch?`: `string`; \}; \}; \} | Request body with settings, cursor, and filter |
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
| `options.locale?` | `"ru"` \| `"en"` \| `"zh"` | Language locale ('ru', 'en', 'zh') |

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
     `characteristics?`: [`CardCharacteristicOutput`](../-internal-/interfaces/CardCharacteristicOutput.md)[];
     `needKiz?`: `boolean`;
     `kizMarked?`: `boolean`;
     `createdAt?`: `string`;
     `trashedAt?`: `string`;
  \}[];
  `cursor?`: \{
     `trashedAt?`: `string`;
     `nmID?`: `number`;
     `total?`: `number`;
  \};
\}\>

Trashed product cards with pagination cursor

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getTrashedCards({
  settings: { cursor: { limit: 100 }, filter: { textSearch: 'shoes' } },
}, { locale: 'ru' });
console.log(result.cards); // Trashed cards array
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

Defined in: [modules/products/index.ts:1298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1298)

Лимиты карточек товаров

Returns free and paid limits for product card creation.
Available cards = (freeLimits + paidLimits) - created cards count.

Rate limit: 100 req/min, 600ms interval, burst 5

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

Card creation limits

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.getCardsLimits();
console.log(result.data); // { freeLimits: 1000, paidLimits: 500 }
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

Defined in: [modules/products/index.ts:1335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1335)

Генерация баркодов

Generates unique barcodes for product card size creation. Use when you don't have your own barcodes.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `count?`: `number`; \} | Request body |
| `data.count?` | `number` | Number of barcodes to generate |

#### Returns

`Promise`\<\{
  `data?`: `string`[];
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`;
\}\>

Generated barcodes array

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createContentBarcode({ count: 5 });
console.log(result.data); // ['1234567890123', '1234567890124', ...]
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
     characteristics?: CardCharacteristicInput[];
     kizMarked?: boolean;
  }[];
}[]): Promise<ResponseCardCreate>;
```

Defined in: [modules/products/index.ts:1378](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1378)

Создание карточек товаров

Creates product cards asynchronously. Max 100 merged cards (imtID) with 30 cards each per request, 10 MB max.
Dimensions in cm, weight in kg. Check error list if 200 response but some cards were not created.

Rate limit: 10 req/min, 6s interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `subjectID`: `number`; `variants`: \{ `brand?`: `string`; `title?`: `string`; `description?`: `string`; `vendorCode`: `string`; `wholesale?`: \{ `enabled?`: `boolean`; `quantum?`: `number`; \}; `dimensions?`: \{ `length?`: `number`; `width?`: `number`; `height?`: `number`; `weightBrutto?`: `number`; \}; `sizes?`: \{ `techSize?`: `string`; `wbSize?`: `string`; `price?`: `number`; `skus?`: `string`[]; \}[]; `characteristics?`: [`CardCharacteristicInput`](../-internal-/interfaces/CardCharacteristicInput.md)[]; `kizMarked?`: `boolean`; \}[]; \}[] | Array of product card groups to create |

#### Returns

`Promise`\<[`ResponseCardCreate`](../-internal-/interfaces/ResponseCardCreate.md)\>

Creation result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createCardsUpload([{
  subjectID: 105,
  variants: [{
    vendorCode: 'ART-001',
    brand: 'MyBrand',
    title: 'Product Name',
    sizes: [{ techSize: '42', skus: ['1234567890123'] }],
    characteristics: [{ id: 1, value: 'Blue' }],
  }],
}]);
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
     characteristics?: CardCharacteristicInput[];
     kizMarked?: boolean;
  }[];
}): Promise<ResponseCardCreate>;
```

Defined in: [modules/products/index.ts:1430](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1430)

Создание карточек товаров с присоединением

Creates new product cards and joins them to existing cards by imtID. Async processing, 10 MB max.
Dimensions in cm, weight in kg.

Rate limit: 10 req/min, 6s interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `imtID?`: `number`; `cardsToAdd?`: \{ `brand?`: `string`; `vendorCode`: `string`; `wholesale?`: \{ `enabled?`: `boolean`; `quantum?`: `number`; \}; `title?`: `string`; `description?`: `string`; `dimensions?`: \{ `length?`: `number`; `width?`: `number`; `height?`: `number`; `weightBrutto?`: `number`; \}; `sizes?`: \{ `techSize?`: `string`; `wbSize?`: `string`; `price?`: `number`; `skus?`: `string`[]; \}[]; `characteristics?`: [`CardCharacteristicInput`](../-internal-/interfaces/CardCharacteristicInput.md)[]; `kizMarked?`: `boolean`; \}[]; \} | Cards to create and join to existing imtID |
| `data.imtID?` | `number` | - |
| `data.cardsToAdd?` | \{ `brand?`: `string`; `vendorCode`: `string`; `wholesale?`: \{ `enabled?`: `boolean`; `quantum?`: `number`; \}; `title?`: `string`; `description?`: `string`; `dimensions?`: \{ `length?`: `number`; `width?`: `number`; `height?`: `number`; `weightBrutto?`: `number`; \}; `sizes?`: \{ `techSize?`: `string`; `wbSize?`: `string`; `price?`: `number`; `skus?`: `string`[]; \}[]; `characteristics?`: [`CardCharacteristicInput`](../-internal-/interfaces/CardCharacteristicInput.md)[]; `kizMarked?`: `boolean`; \}[] | - |

#### Returns

`Promise`\<[`ResponseCardCreate`](../-internal-/interfaces/ResponseCardCreate.md)\>

Creation result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createUploadAdd({
  imtID: 98765,
  cardsToAdd: [{
    vendorCode: 'ART-002',
    sizes: [{ techSize: '44', skus: ['1234567890124'] }],
    characteristics: [{ id: 1, value: 'Red' }],
  }],
});
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

Defined in: [modules/products/index.ts:1472](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1472)

Загрузить медиафайл

Uploads a single media file to a product card. Images: max 30 per card, min 700x900px, max 32MB,
formats JPG/PNG/BMP/GIF/WebP. Video: max 1 per card, max 50MB, formats MOV/MP4.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `Record`\<`string`, `never`\>;
\}\>

Upload result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createMediaFile();
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

Defined in: [modules/products/index.ts:1514](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1514)

Загрузить медиафайлы по ссылкам

Uploads media files to a product card via URLs. New files fully replace old ones.
Links must be direct file URLs (no auth required). If any file fails validation, none are uploaded.

Rate limit: 100 req/min, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmId?`: `number`; `data?`: `string`[]; \} | Request body |
| `data.nmId?` | `number` | Product card nomenclature ID |
| `data.data?` | `string`[] | Array of direct file URLs |

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `Record`\<`string`, `never`\>;
\}\>

Upload result

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products](https://dev.wildberries.ru/openapi/work-with-products)

#### Example

```typescript
const result = await sdk.products.createMediaSave({
  nmId: 12345678,
  data: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
});
console.log(result);
```

***

### createUploadTask()

```ts
createUploadTask(data: Goods): Promise<UploadTaskResponse>;
```

Defined in: [modules/products/index.ts:1553](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1553)

Установить цены и скидки

Sets prices and discounts for products. Use createTaskSize() for per-size pricing.
Track upload status via getHistoryTasks() and getGoodsTask().

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`Goods`](../-internal-/type-aliases/Goods.md) | Goods pricing data |

#### Returns

`Promise`\<[`UploadTaskResponse`](../-internal-/interfaces/UploadTaskResponse.md)\>

Upload task response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.createUploadTask({
  data: [{ nmID: 12345678, price: 1500, discount: 10 }],
});
console.log(result);
```

***

### createTaskSize()

```ts
createTaskSize(data: SizeGoodsBody): Promise<UploadTaskResponse>;
```

Defined in: [modules/products/index.ts:1584](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1584)

Установить цены для размеров

Sets prices per size for eligible products (editableSizePrice: true).
Use createUploadTask() for product-level pricing.

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SizeGoodsBody`](../-internal-/type-aliases/SizeGoodsBody.md) | Size pricing data |

#### Returns

`Promise`\<[`UploadTaskResponse`](../-internal-/interfaces/UploadTaskResponse.md)\>

Upload task response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.createTaskSize({
  data: [{ nmID: 12345678, sizeID: 100, price: 2000 }],
});
console.log(result);
```

***

### createTaskClubDiscount()

```ts
createTaskClubDiscount(data: ClubDisc): Promise<UploadTaskResponse>;
```

Defined in: [modules/products/index.ts:1614](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1614)

Установить скидки WB Клуба

Sets WB Club subscription discounts for products.

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ClubDisc`](../-internal-/type-aliases/ClubDisc.md) | Club discount data |

#### Returns

`Promise`\<[`UploadTaskResponse`](../-internal-/interfaces/UploadTaskResponse.md)\>

Upload task response

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.createTaskClubDiscount({
  data: [{ nmID: 12345678, clubDiscount: 15 }],
});
console.log(result);
```

***

### getHistoryTasks()

```ts
getHistoryTasks(options?: {
  uploadID: number;
}): Promise<TaskHistoryResponse>;
```

Defined in: [modules/products/index.ts:1643](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1643)

Состояние обработанной загрузки

Returns processed upload status for prices, size prices, and WB Club discounts.

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `uploadID`: `number`; \} | Query parameters |
| `options.uploadID?` | `number` | Upload task ID to check |

#### Returns

`Promise`\<[`TaskHistoryResponse`](../-internal-/interfaces/TaskHistoryResponse.md)\>

Task history with status

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.getHistoryTasks({ uploadID: 12345 });
console.log(result);
```

***

### getGoodsTask()

```ts
getGoodsTask(options?: {
  limit: number;
  offset?: number;
  uploadID: number;
}): Promise<GoodsHistoryResponse>;
```

Defined in: [modules/products/index.ts:1673](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1673)

Детализация обработанной загрузки

Returns per-item details and errors from a processed price/discount upload.

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; `uploadID`: `number`; \} | Query parameters |
| `options.limit?` | `number` | Number of items to return |
| `options.offset?` | `number` | Items offset |
| `options.uploadID?` | `number` | Upload task ID |

#### Returns

`Promise`\<[`GoodsHistoryResponse`](../-internal-/interfaces/GoodsHistoryResponse.md)\>

Goods history with errors

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.getGoodsTask({ limit: 100, uploadID: 12345 });
console.log(result);
```

***

### getBufferTasks()

```ts
getBufferTasks(options?: {
  uploadID: number;
}): Promise<TaskBufferResponse>;
```

Defined in: [modules/products/index.ts:1705](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1705)

Состояние необработанной загрузки

Returns pending upload status (promo calendar discounts not yet applied).

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `uploadID`: `number`; \} | Query parameters |
| `options.uploadID?` | `number` | Upload task ID to check |

#### Returns

`Promise`\<[`TaskBufferResponse`](../-internal-/interfaces/TaskBufferResponse.md)\>

Buffer task status

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.getBufferTasks({ uploadID: 12345 });
console.log(result);
```

***

### getBufferGoodsTask()

```ts
getBufferGoodsTask(options?: {
  limit: number;
  offset?: number;
  uploadID: number;
}): Promise<GoodsBufferResponse>;
```

Defined in: [modules/products/index.ts:1735](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1735)

Детализация необработанной загрузки

Returns per-item details and errors from a pending (promo calendar) discount upload.

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; `uploadID`: `number`; \} | Query parameters |
| `options.limit?` | `number` | Number of items to return |
| `options.offset?` | `number` | Items offset |
| `options.uploadID?` | `number` | Upload task ID |

#### Returns

`Promise`\<[`GoodsBufferResponse`](../-internal-/interfaces/GoodsBufferResponse.md)\>

Buffer goods with errors

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.getBufferGoodsTask({ limit: 100, uploadID: 12345 });
console.log(result);
```

***

### getGoodsFilter()

```ts
getGoodsFilter(options?: {
  limit: number;
  offset?: number;
  filterNmID?: number;
}): Promise<GoodsFilterResponse>;
```

Defined in: [modules/products/index.ts:1770](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1770)

Получить товары с ценами

Returns product pricing info: prices, currency, discounts, WB Club discounts.
Use limit/offset pagination for all products, or filterNmID for a single article.

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; `filterNmID?`: `number`; \} | Query parameters |
| `options.limit?` | `number` | Number of items to return (max 1000) |
| `options.offset?` | `number` | Items offset for pagination |
| `options.filterNmID?` | `number` | Filter by single article ID |

#### Returns

`Promise`\<[`GoodsFilterResponse`](../-internal-/interfaces/GoodsFilterResponse.md)\>

Goods with pricing information

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.getGoodsFilter({ limit: 1000, offset: 0 });
console.log(result);
```

***

### createGoodsFilter()

```ts
createGoodsFilter(data: {
  nmIDs: number[];
}): Promise<GoodsFilterByNmResponse>;
```

Defined in: [modules/products/index.ts:1802](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1802)

Получить товары с ценами по артикулам

Returns pricing info for multiple products by article IDs.

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `nmIDs`: `number`[]; \} | Request body with article IDs |
| `data.nmIDs` | `number`[] | Array of article IDs to fetch pricing for |

#### Returns

`Promise`\<[`GoodsFilterByNmResponse`](../-internal-/interfaces/GoodsFilterByNmResponse.md)\>

Goods with pricing information filtered by nmIDs

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.createGoodsFilter({ nmIDs: [12345678, 87654321] });
console.log(result);
```

***

### getSizeNm()

```ts
getSizeNm(options?: {
  limit: number;
  offset?: number;
  nmID: number;
}): Promise<SizeGoodsResponse>;
```

Defined in: [modules/products/index.ts:1833](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1833)

Получить размеры товара с ценами

Returns per-size pricing info for a single product (only for categories with editableSizePrice: true).

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; `nmID`: `number`; \} | Query parameters |
| `options.limit?` | `number` | Number of items to return |
| `options.offset?` | `number` | Items offset |
| `options.nmID?` | `number` | Product article ID |

#### Returns

`Promise`\<[`SizeGoodsResponse`](../-internal-/interfaces/SizeGoodsResponse.md)\>

Size-level pricing data

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.getSizeNm({ limit: 100, nmID: 12345678 });
console.log(result);
```

***

### getQuarantineGoods()

```ts
getQuarantineGoods(options?: {
  limit: number;
  offset?: number;
}): Promise<QuarantineGoodsResponse>;
```

Defined in: [modules/products/index.ts:1867](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1867)

Получить товары в карантине

Returns quarantined products (price dropped 3x or more). Quarantine does not apply to per-size pricing.
Products sell at old price while quarantined. Remove via API or seller dashboard.

Rate limit: 10 req/6s, 600ms interval, burst 5

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `limit`: `number`; `offset?`: `number`; \} | Query parameters |
| `options.limit?` | `number` | Number of items to return |
| `options.offset?` | `number` | Items offset |

#### Returns

`Promise`\<[`QuarantineGoodsResponse`](../-internal-/interfaces/QuarantineGoodsResponse.md)\>

Quarantined goods list

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki)

#### Example

```typescript
const result = await sdk.products.getQuarantineGoods({ limit: 100, offset: 0 });
console.log(result);
```

***

### getStocks()

```ts
getStocks(warehouseId: number, data: StocksRequest): Promise<GetStocksResponse>;
```

Defined in: [modules/products/index.ts:1909](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1909)

Получить остатки товаров

Returns stock amounts for products at a seller's warehouse. A 409 response counts as 10 requests.

**Migration deadline 2026-05-20 13:00 MSK**: Wildberries is phasing out the `skus`
parameter on this endpoint in favor of `chrtIds`. Pass `chrtIds` for all new code.
After the deadline, WB returns HTTP 400 if `skus` is sent.

Rate limit: 300 req/min, 200ms interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data` | [`StocksRequest`](../interfaces/StocksRequest.md) | Request body — see [StocksRequest](../interfaces/StocksRequest.md). Pass `chrtIds` (preferred since v3.12.0) or `skus` (deprecated; rejected by WB API after 2026-05-20). |

#### Returns

`Promise`\<[`GetStocksResponse`](../interfaces/GetStocksResponse.md)\>

Stock amounts. See [GetStocksResponse](../interfaces/GetStocksResponse.md).

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca)

#### Examples

```typescript
const result = await sdk.products.getStocks(12345, { chrtIds: [12345678, 12345679] });
console.log(result.stocks); // [{ chrtId: 12345678, amount: 50 }, ...]
```

```typescript
// Will emit a console.warn (since v3.12.0) and return HTTP 400 from WB after 2026-05-20
const result = await sdk.products.getStocks(12345, { skus: ['1234567890123'] });
```

***

### updateStock()

```ts
updateStock(warehouseId: number, data?: UpdateStockRequest): Promise<void>;
```

Defined in: [modules/products/index.ts:1958](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L1958)

Обновить остатки товаров

Updates stock amounts for products at a seller's warehouse. Parameter names are not validated;
incorrect names return 204 but do not update stocks. A 409 response counts as 10 requests.

**Migration deadline 2026-05-20 13:00 MSK**: Wildberries is phasing out the `sku` field
in stock items in favor of `chrtId`. Use `chrtId` per item for all new code.
After the deadline, WB returns HTTP 400 if `sku` is sent.

Rate limit: 300 req/min, 200ms interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data?` | [`UpdateStockRequest`](../interfaces/UpdateStockRequest.md) | Request body — see [UpdateStockRequest](../interfaces/UpdateStockRequest.md). Use `chrtId` per stock item (preferred since v3.12.0) or `sku` (deprecated; rejected by WB API after 2026-05-20). |

#### Returns

`Promise`\<`void`\>

void on success (204)

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca)

#### Examples

```typescript
await sdk.products.updateStock(12345, {
  stocks: [{ chrtId: 12345678, amount: 100 }],
});
```

```typescript
// Will emit a console.warn (since v3.12.0) and return HTTP 400 from WB after 2026-05-20
await sdk.products.updateStock(12345, {
  stocks: [{ sku: '1234567890123', amount: 100 }],
});
```

***

### deleteStock()

```ts
deleteStock(warehouseId: number, data: StocksRequest): Promise<void>;
```

Defined in: [modules/products/index.ts:2000](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L2000)

Удалить остатки товаров

Irreversibly deletes stock records. Must re-upload stocks to resume sales.
A 409 response counts as 10 requests.

**Migration deadline 2026-05-20 13:00 MSK**: Wildberries is phasing out the `skus`
parameter on this endpoint in favor of `chrtIds`. Pass `chrtIds` for all new code.
After the deadline, WB returns HTTP 400 if `skus` is sent.

Rate limit: 300 req/min, 200ms interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data` | [`StocksRequest`](../interfaces/StocksRequest.md) | Request body — see [StocksRequest](../interfaces/StocksRequest.md). Pass `chrtIds` (preferred since v3.12.0) or `skus` (deprecated; rejected by WB API after 2026-05-20). |

#### Returns

`Promise`\<`void`\>

void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca)

#### Examples

```typescript
await sdk.products.deleteStock(12345, { chrtIds: [12345678, 12345679] });
```

```typescript
// Will emit a console.warn (since v3.12.0) and return HTTP 400 from WB after 2026-05-20
await sdk.products.deleteStock(12345, { skus: ['1234567890123'] });
```

***

### offices()

```ts
offices(): Promise<Office[]>;
```

Defined in: [modules/products/index.ts:2029](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L2029)

Получить список складов WB

Returns all WB warehouses for binding to seller warehouses (FBS model).

Rate limit: 300 req/min, 200ms interval, burst 20

#### Returns

`Promise`\<[`Office`](../-internal-/interfaces/Office.md)[]\>

Array of WB office/warehouse locations

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca)

#### Example

```typescript
const result = await sdk.products.offices();
console.log(result); // [{ id: 1, name: 'Коледино', ... }]
```

***

### warehouses()

```ts
warehouses(): Promise<Warehouse[]>;
```

Defined in: [modules/products/index.ts:2054](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L2054)

Получить список складов продавца

Returns all seller warehouses. Use warehouse IDs to manage stock.

Rate limit: 300 req/min, 200ms interval, burst 20

#### Returns

`Promise`\<[`Warehouse`](../-internal-/interfaces/Warehouse.md)[]\>

Array of seller warehouses

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca)

#### Example

```typescript
const result = await sdk.products.warehouses();
console.log(result); // [{ id: 12345, name: 'Main Warehouse', officeId: 1 }]
```

***

### createWarehouse()

```ts
createWarehouse(data: {
  name: string;
  officeId: number;
}): Promise<{
  id?: number;
}>;
```

Defined in: [modules/products/index.ts:2084](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L2084)

Создать склад продавца

Creates a seller warehouse bound to a WB office for FBS fulfillment.
Cannot bind a WB warehouse that is already in use.

Rate limit: 300 req/min, 200ms interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `name`: `string`; `officeId`: `number`; \} | Warehouse creation data |
| `data.name` | `string` | Warehouse name |
| `data.officeId` | `number` | WB office ID to bind |

#### Returns

`Promise`\<\{
  `id?`: `number`;
\}\>

Created warehouse with ID

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca)

#### Example

```typescript
const result = await sdk.products.createWarehouse({ name: 'Main Warehouse', officeId: 1 });
console.log(result.id); // New warehouse ID
```

***

### updateWarehouse()

```ts
updateWarehouse(warehouseId: number, data: {
  name: string;
  officeId: number;
}): Promise<void>;
```

Defined in: [modules/products/index.ts:2115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L2115)

Обновить склад продавца

Updates seller warehouse data. WB office binding can be changed once per day.
Cannot bind a WB warehouse that is already in use.

Rate limit: 300 req/min, 200ms interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data` | \{ `name`: `string`; `officeId`: `number`; \} | Warehouse update data |
| `data.name` | `string` | Updated warehouse name |
| `data.officeId` | `number` | Updated WB office ID |

#### Returns

`Promise`\<`void`\>

void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca)

#### Example

```typescript
await sdk.products.updateWarehouse(12345, { name: 'Updated Warehouse', officeId: 2 });
```

***

### deleteWarehouse()

```ts
deleteWarehouse(warehouseId: number): Promise<void>;
```

Defined in: [modules/products/index.ts:2145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L2145)

Удалить склад продавца

Deletes a seller warehouse from the list.

Rate limit: 300 req/min, 200ms interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |

#### Returns

`Promise`\<`void`\>

void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca)

#### Example

```typescript
await sdk.products.deleteWarehouse(12345);
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

Defined in: [modules/products/index.ts:2173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L2173)

Список контактов

Returns contacts linked to a seller warehouse. Only for warehouses with delivery type 3 (DBW - WB courier).

Rate limit: 300 req/min, 200ms interval, burst 20

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

Warehouse contacts list

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca)

#### Example

```typescript
const result = await sdk.products.getWarehousesContact(12345);
console.log(result.contacts); // [{ phone: '+79001234567', comment: 'Main' }]
```

***

### updateWarehousesContact()

```ts
updateWarehousesContact(warehouseId: number, data: StoreContactRequestBody): Promise<void>;
```

Defined in: [modules/products/index.ts:2205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/modules/products/index.ts#L2205)

Обновить список контактов

Overwrites the contact list for a seller warehouse (DBW delivery type 3 only).
Send ALL contacts including unchanged ones. Max 5 contacts. Send empty array to delete all.

Rate limit: 300 req/min, 200ms interval, burst 20

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `warehouseId` | `number` | ID склада продавца |
| `data` | [`StoreContactRequestBody`](../-internal-/interfaces/StoreContactRequestBody.md) | Contact list data (overwrites existing) |

#### Returns

`Promise`\<`void`\>

void on success

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca](https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca)

#### Example

```typescript
await sdk.products.updateWarehousesContact(12345, {
  contacts: [{ phone: '+79001234567', comment: 'Main contact' }],
});
```
