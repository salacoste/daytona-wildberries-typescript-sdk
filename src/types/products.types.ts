/**
 * Auto-generated TypeScript types for products module
 * Generated from: wildberries_api_doc/02-products.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-10-21T20:27:47.245Z
 */

/**
 * Контакты склада продавца
 */
export interface StoreContactRequestBody {
  contacts?: {
  /** Комментарий */
  comment?: string;
  /** Номер телефона.<br>Поддерживаются коды стран: - `+7` — Россия, Казахстан - `+374` — Армения - `+375` — Беларусь - `+996` — Кыргызстан */
  phone?: string;
}[];
}

export interface ResponseCardCreate {
  /** Данные ответа */
  data?: Record<string, never>;
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: {
  string?: string;
} | string | {
  error: string;
};
}

export interface RequestMoveNmsImtConn {
  /** Существующий у продавца `imtID`, под которым необходимо объединить карточки товаров */
  targetIMT: number;
  /** `nmID`, которые необходимо объединить (максимум 30) */
  nmIDs: number[];
}

export interface RequestMoveNmsImtDisconn {
  /** `nmID`, которые необходимо разъединить (max 30) */
  nmIDs: number[];
}

export interface ResponseIncorrectDate {
  error?: string;
}

export interface ResponseBodyContentError400 {
  /** Данные ошибки */
  data?: Record<string, never>;
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: Record<string, never>;
}

/**
 * @example
```json
{
  "data": null,
  "error": true,
  "errorText": "Доступ запрещен",
  "additionalErrors": "Доступ запрещен"
}
```
 */
export interface ResponseBodyContentError403 {
  /** Данные ошибки */
  data?: Record<string, never>;
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string;
}

/**
 * @example
```json
{
  "data": null,
  "error": false,
  "errorText": "",
  "additionalErrors": null
}
```
 */
export interface ResponseContentError {
  /** Данные ошибки */
  data?: Record<string, never>;
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string;
}

/**
 * @example
```json
{
  "additionalErrors": null,
  "data": null,
  "error": true,
  "errorText": "Текст ошибки"
}
```
 */
export interface MediaErrors {
  /** Дополнительные ошибки */
  additionalErrors?: Record<string, never>;
  /** Данные ошибки */
  data?: Record<string, never>;
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

export interface ResponseError {
  /** Данные ошибки */
  data?: Record<string, never>;
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

export interface RequestAlreadyExistsError {
  /** Данные ответа */
  data?: {
  /** ID загрузки */
  id?: number;
  /** Флаг дублирования загрузки: `true` — такая загрузка уже есть */
  alreadyExists?: boolean;
};
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

export type StocksWarehouseError = {
  /** Код ошибки */
  code?: string;
  /** Дополнительная информация об ошибке */
  data?: Record<string, never>;
  /** Описание ошибки */
  message?: string;
}[];

export interface TaskCreated {
  /** Данные ответа */
  data?: {
  /** ID загрузки */
  id?: number;
  /** Флаг дублирования загрузки: `true` — такая загрузка уже есть */
  alreadyExists?: boolean;
};
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

/**
 * Товары, цены и скидки для них. Максимум 1 000 товаров. Цена и скидка не могут быть пустыми одновременно.
 * 
 * Если новая цена со скидкой будет хотя бы в 3 раза меньше старой, она попадёт в [карантин](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) и товар будет продаваться по старой цене. Ошибка об этом будет в ответах методов состояний загрузок.
 * 
 * Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine)
 */
export type Goods = Good[];

export interface Good {
  /** Артикул WB */
  nmID: number;
  /** Цена. Валюту можно получить с помощью методов [Получить товары с ценами](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `currencyIsoCode4217` */
  price?: number;
  /** Скидка, % */
  discount?: number;
}

/**
 * Размеры и цены для них. Максимум 1 000 размеров.
 * 
 * Для товаров с поразмерной установкой цен [карантин](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) не применяется
 */
export type SizeGoodsBody = SizeGoodReq[];

export interface SizeGoodReq {
  /** Артикул WB */
  nmID: number;
  /** ID размера. Можно получить с помощью методов [Получить товары с ценами](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `sizeID`. В методах Контента это поле `chrtID` */
  sizeID: number;
  /** Цена. Валюту можно получить с помощью методов [Получить товары с ценами](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `currencyIsoCode4217` */
  price: number;
}

/**
 * Товары и скидки WB Клуба для них. Максимум 1 000 товаров.
 */
export type ClubDisc = ClubDiscReq[];

export interface ClubDiscReq {
  /** Артикул WB */
  nmID: number;
  /** Скидка WB Клуба, % */
  clubDiscount: number;
}

/**
 * Размеры товара
 */
export interface GoodsList {
  /** Артикул WB */
  nmID?: number;
  /** Артикул продавца */
  vendorCode?: string;
  /** Размер */
  sizes?: {
  /** ID размера. В методах Контента это поле `chrtID` */
  sizeID: number;
  /** Цена */
  price: number;
  /** Цена со скидкой */
  discountedPrice: number;
  /** Цена со скидкой, включая скидку WB Клуба */
  clubDiscountedPrice: number;
  /** Размер товара */
  techSizeName: string;
}[];
  /** Валюта, по стандарту ISO 4217 */
  currencyIsoCode4217?: string;
  /** Скидка, % */
  discount?: number;
  /** Скидка WB Клуба, % */
  clubDiscount?: number;
  /** Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя */
  editableSizePrice?: boolean;
  /** Признак неликвидного товара: - `true` — неликвидный товар с [низким индексом остатка](https://seller.wildberries.ru/instructions/ru/ru/material/stocks-index?categoryId=e324ce0f-9a2a-4b8d-8fd1-72f751b09b3b&goBackOption=prevRoute#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B0-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B0) - Поле отсутствует — ликвидный товар */
  isBadTurnover?: boolean;
}

/**
 * Информация о размере
 */
export interface SizeGood {
  /** Артикул WB */
  nmID?: number;
  /** ID размера. Можно получить с помощью метода [Получение списка товаров по артикулам](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get), поле `sizeID`. В методах Контента это поле `chrtID` */
  sizeID?: number;
  /** Артикул продавца */
  vendorCode?: string;
  /** Цена */
  price?: number;
  /** Валюта, по стандарту ISO 4217 */
  currencyIsoCode4217?: string;
  /** Цена со скидкой */
  discountedPrice?: number;
  /** Цена со скидкой, включая скидку WB Клуба */
  clubDiscountedPrice?: number;
  /** Скидка, % */
  discount?: number;
  /** Скидка WB Клуба, % */
  clubDiscount?: number;
  /** Размер товара */
  techSizeName?: string;
  /** Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя */
  editableSizePrice?: boolean;
  /** Признак неликвидного товара: - `true` — неликвидный товар с [низким индексом остатка](https://seller.wildberries.ru/instructions/ru/ru/material/stocks-index?categoryId=e324ce0f-9a2a-4b8d-8fd1-72f751b09b3b&goBackOption=prevRoute#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B0-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B0) - Поле отсутствует — ликвидный товар */
  isBadTurnover?: boolean;
}

export interface GoodBufferHistory {
  /** Артикул WB */
  nmID?: number;
  /** Артикул продавца */
  vendorCode?: string;
  /** ID размера. В методах Контента это поле `chrtID` */
  sizeID?: number;
  /** Размер */
  techSizeName?: string;
  /** Цена */
  price?: number;
  /** Валюта, по стандарту ISO 4217 */
  currencyIsoCode4217?: string;
  /** Скидка, % */
  discount?: number;
  /** Скидка WB Клуба, % */
  clubDiscount?: number;
  status?: GoodStatusBuffer;
  /** Текст ошибки */
  errorText?: string;
}

export interface GoodHistory {
  /** Артикул WB */
  nmID?: number;
  /** Артикул продавца */
  vendorCode?: string;
  /** ID размера. В методах Контента это поле `chrtID` */
  sizeID?: number;
  /** Размер */
  techSizeName?: string;
  /** Цена */
  price?: number;
  /** Валюта, по стандарту ISO 4217 */
  currencyIsoCode4217?: string;
  /** Скидка, % */
  discount?: number;
  /** Скидка WB Клуба, % */
  clubDiscount?: number;
  status?: GoodStatus;
  /** Текст ошибки. Например: - `You can't change the item price. Item was added to the Sale due to high inventory` — ошибка возникает, если товар попал под распродажу по [индексу остатка](https://seller.wildberries.ru/instructions/ru/ru/material/A-1159). - `The new price is several times lower than the current price. Item has been moved to Price Quarantine` — ошибка возникает, если новая цена со скидкой хотя бы в 3 раза меньше старой. Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine). */
  errorText?: string;
}

/**
 * Данные ответа
 */
export interface SupplierTaskMetadata {
  /** ID загрузки */
  uploadID?: number;
  status?: TaskStatus;
  uploadDate?: Date;
  activationDate?: Date1;
  /** Всего товаров */
  overAllGoodsNumber?: number;
  /** Товаров без ошибок */
  successGoodsNumber?: number;
}

/**
 * Данные ответа
 */
export interface SupplierTaskMetadataBuffer {
  /** ID загрузки */
  uploadID?: number;
  status?: TaskStatusBuffer;
  uploadDate?: Date;
  activationDate?: Date1;
  /** Всего товаров */
  overAllGoodsNumber?: number;
  /** Товаров без ошибок (0, потому что загрузка в обработке) */
  successGoodsNumber?: number;
}

/**
 * Дата и время, когда загрузка создана
 *
 * @example
```json
"2022-08-21T22:00:13+02:00"
```
 */
export type Date = string;

/**
 * Дата и время, когда загрузка отправляется в обработку
 *
 * @example
```json
"2022-08-21T22:00:13+02:00"
```
 */
export type Date1 = string;

/**
 * Статус загрузки:
 *  * `3` — обработана, в товарах нет ошибок, цены и скидки обновились
 *  * `4` — отменена
 *  * `5` — обработана, но в товарах есть ошибки. Для товаров без ошибок цены и скидки обновились, а ошибки в остальных товарах можно получить с помощью метода [Детализация обработанной загрузки](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get)
 *  * `6` — обработана, но во всех товарах есть ошибки. Их тоже можно получить с помощью метода [Детализация обработанной загрузки](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get)
 *
 * @example
```json
3
```
 */
export type TaskStatus = number;

/**
 * Статус загрузки: `1` — в обработке
 *
 * @example
```json
1
```
 */
export type TaskStatusBuffer = number;

/**
 * Статус товара:
 *  * `2` — товар без ошибок, цена и/или скидка обновилась
 *  * `3` — есть ошибки, данные не обновились
 *
 * @example
```json
1
```
 */
export type GoodStatus = number;

/**
 * Статус товара: `1` — в обработке
 *
 * @example
```json
1
```
 */
export type GoodStatusBuffer = number;

export interface Error {
  /** Код ошибки */
  code?: string;
  /** Описание ошибки */
  message?: string;
  /** Дополнительные данные ошибки */
  data?: Record<string, never>;
}

export interface QuarantineGoods {
  /** Артикул WB */
  nmID?: number;
  /** Не используется */
  sizeID?: number;
  /** Не используется */
  techSizeName?: string;
  /** Валюта по стандарту ISO 4217 */
  currencyIsoCode4217?: string;
  /** Новая цена продавца до скидки */
  newPrice?: number;
  /** Текущая цена продавца до скидки */
  oldPrice?: number;
  /** Новая скидка продавца, % */
  newDiscount?: number;
  /** Текущая скидка продавца, % */
  oldDiscount?: number;
  /** Разница: `newPrice` * (1 - `newDiscount` / 100) - `oldPrice` * (1 - `oldDiscount` / 100) */
  priceDiff?: number;
}

/**
 * Данные о складе WB
 */
export interface Office {
  /** Адрес */
  address?: string;
  /** Название */
  name?: string;
  /** Город */
  city?: string;
  /** ID */
  id?: number;
  /** Долгота */
  longitude?: number;
  /** Широта */
  latitude?: number;
  /** Тип товара, который принимает склад: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) */
  cargoType?: 1 | 2 | 3;
  /** Тип доставки, который принимает склад: - `1` — доставка на склад WB (FBS) - `2` — доставка силами продавца (DBS) - `3` — доставка курьером WB (DBW) - `5` — самовывоз (C&C) - `6` — экспресс-доставка силами продавца (ЕDBS) */
  deliveryType?: 1 | 2 | 3 | 5 | 6;
  /** Федеральный округ склада WB. Если `null`, склад находится за пределами РФ или федеральный округ не указан */
  federalDistrict?: string;
  /** Признак того, что склад уже выбран продавцом */
  selected?: boolean;
}

/**
 * Данные о складе продавца
 */
export interface Warehouse {
  /** Название склада продавца */
  name?: string;
  /** ID склада WB */
  officeId?: number;
  /** ID склада продавца */
  id?: number;
  /** Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) */
  cargoType?: 1 | 2 | 3;
  /** Тип доставки, который принимает склад: - `1` — доставка на склад WB (FBS) - `2` — доставка силами продавца (DBS) - `3` — доставка курьером WB (DBW) - `5` — самовывоз (C&C) - `6` — экспресс-доставка силами продавца (ЕDBS) */
  deliveryType?: 1 | 2 | 3 | 5 | 6;
  /** Склад удаляется: - `false` — нет - `true` — да После удаления склад пропадёт из списка */
  isDeleting?: boolean;
  /** Данные склада обновляются: - `false` — нет - `true` — да, обновление и удаление остатков недоступно Обновление данных может занимать несколько минут */
  isProcessing?: boolean;
}

export interface ResponsePublicViewerPublicErrorsTableListV2 {
  data: ModelsErrorTableListPublicRespV2;
  /** Флаг ошибки */
  error: boolean;
  /** Описание ошибки */
  errorText: string;
  /** Дополнительные ошибки */
  additionalErrors: Record<string, never>;
}

/**
 * Данные ответа
 */
export interface ModelsErrorTableListPublicRespV2 {
  /** Пакеты данных */
  items: ModelsErrorTableListPublicRespV2Item[];
  cursor: ViewerContractPublicErrorsCursorOutput;
}

export interface ModelsErrorTableListPublicRespV2Item {
  /** ID пакета */
  batchUUID: string;
  /** Предметы. Разбивка по `vendorCodes` */
  subjects: Record<string, ModelsErrorSubject>;
  /** Бренды. Разбивка по `vendorCodes` */
  brands: Record<string, ModelsErrorBrand>;
  /** Артикулы продавца */
  vendorCodes: string[];
  /** Ошибки. Разбивка по `vendorCodes` */
  errors: Record<string, string[]>;
}

/**
 * Пагинатор
 */
export interface ViewerContractPublicErrorsCursorOutput {
  /** Есть ли ещё черновики: - `false` — нет - `true` — да */
  next: boolean;
  /** Дата и время формирования последнего пакета в ответе */
  updatedAt: string;
  /** ID последнего пакета в ответе */
  batchUUID: string;
}

export interface ModelsErrorSubject {
  /** ID предмета */
  id: number;
  /** Название предмета */
  name: string;
}

export interface ModelsErrorBrand {
  /** ID бренда */
  id?: number;
  /** Бренд */
  name?: string;
}

export interface RequestPublicViewerPublicErrorsTableListV2 {
  cursor?: SwaggerPublicErrorsCursorInput;
  order?: SwaggerPublicErrorsOrderV2;
}

/**
 * Пагинатор
 */
export interface SwaggerPublicErrorsCursorInput {
  /** Количество пакетов в ответе */
  limit?: number;
  /** Дата и время формирования последнего пакета в ответе на предыдущий запрос */
  updatedAt?: string;
  /** ID последнего пакета в ответе на предыдущий запрос */
  batchUUID?: string;
}

/**
 * Порядок выдачи пакетов
 */
export interface SwaggerPublicErrorsOrderV2 {
  /** - `false` — сортировка по убыванию - `true` — сортировка по возрастанию */
  ascending?: boolean;
}

// ============================================================================
// User-Friendly Type Aliases for CRUD Operations
// ============================================================================
// These types provide better naming and documentation for common CRUD operations.
// They are manually maintained aliases for the auto-generated types above.
// DO NOT regenerate this section - it is hand-maintained for developer experience.

/**
 * Product characteristic (attribute) with ID and value
 *
 * @example
 * ```typescript
 * const characteristic: ProductCharacteristic = {
 *   id: 1,           // Characteristic ID from getCharacteristics
 *   value: ['Red']   // Value(s) - type depends on charcType
 * };
 * ```
 */
export interface ProductCharacteristic {
  /** Characteristic ID from getCharacteristics endpoint */
  id: number;
  /** Characteristic value(s) - can be string array or number depending on charcType */
  value: unknown;
}

/**
 * Product dimensions and weight
 */
export interface ProductDimensions {
  /** Length in centimeters */
  length?: number;
  /** Width in centimeters */
  width?: number;
  /** Height in centimeters */
  height?: number;
  /** Weight with packaging in kilograms (max 3 decimal places) */
  weightBrutto?: number;
}

/**
 * Product size information with barcode(s)
 */
export interface ProductSize {
  /** Size label (e.g., "XL", "45") */
  techSize?: string;
  /** Russian size */
  wbSize?: string;
  /** Price for this size */
  price?: number;
  /** Barcodes (auto-generated if not provided) */
  skus?: string[];
}

/**
 * Product size with chrtID for updates
 */
export interface UpdateProductSize {
  /** Required for existing sizes, omit for new sizes */
  chrtID?: number;
  /** Size label (e.g., "XL", "45") */
  techSize?: string;
  /** Russian size */
  wbSize?: string;
  /** Barcodes (auto-generated if not provided) */
  skus?: string[];
}

/**
 * Individual product variant within a product card
 */
export interface ProductVariant {
  /** Brand name */
  brand?: string;
  /** Product title (max 60 characters) */
  title?: string;
  /** Product description (1000-5000 characters, category-dependent) */
  description?: string;
  /** Required: Seller's article ID (max 72 characters) */
  vendorCode: string;
  /** Wholesale settings */
  wholesale?: {
    /** Enable wholesale */
    enabled: boolean;
    /** Units per package */
    quantum: number;
  };
  /** Product dimensions and weight */
  dimensions?: ProductDimensions;
  /** Product sizes */
  sizes?: ProductSize[];
  /** Product characteristics/attributes */
  characteristics?: ProductCharacteristic[];
}

/**
 * Request body for creating new product cards
 *
 * Creates product cards with descriptions and characteristics.
 * Async processing - check error list if 200 OK but some cards fail.
 *
 * **Limits:**
 * - Max 100 unified cards (imtID)
 * - Max 30 cards each
 * - Max 10MB request size
 *
 * **Rate limit:** 10 req/min, 6 second interval
 *
 * @example
 * ```typescript
 * const request: CreateProductRequest = {
 *   subjectID: 105,  // Category ID
 *   variants: [{
 *     vendorCode: 'VENDOR-001',
 *     brand: 'My Brand',
 *     title: 'Example Product',
 *     description: 'Detailed description...',
 *     dimensions: {
 *       length: 10,
 *       width: 5,
 *       height: 2,
 *       weightBrutto: 0.5
 *     },
 *     sizes: [{
 *       techSize: 'XL',
 *       wbSize: '52',
 *       skus: ['1234567890123']
 *     }],
 *     characteristics: [
 *       { id: 1, value: ['Red'] },
 *       { id: 2, value: ['Cotton'] }
 *     ]
 *   }]
 * };
 * ```
 */
export interface CreateProductRequest {
  /** Required: Category/subject ID from getCategories */
  subjectID: number;
  /** Required: Array of product variants (max 30 per imtID) */
  variants: ProductVariant[];
}

/**
 * Request body for updating existing product cards
 *
 * **CRITICAL:** Card is completely rewritten - must send ALL parameters (even unchanged ones).
 * Missing fields will be removed from the product.
 *
 * **Limits:**
 * - Max 3000 cards per request
 * - Max 10MB request size
 *
 * **Cannot edit:** Barcodes, photos, video, tags (use separate endpoints)
 * **Can add:** Additional barcodes to existing products
 *
 * **Rate limit:** 10 req/min, 6 second interval
 *
 * @example
 * ```typescript
 * // GOOD: Send all fields
 * const product = await getProductCard(12345);
 * const update: UpdateProductRequest = {
 *   ...product,
 *   title: 'New Title'  // Only this changes, rest preserved
 * };
 *
 * // BAD: Only send changed field - other fields will be lost!
 * const badUpdate: UpdateProductRequest = {
 *   nmID: 12345,
 *   vendorCode: 'VENDOR-001',
 *   sizes: [],
 *   title: 'New Title'
 * };
 * ```
 */
export interface UpdateProductRequest {
  /** Required: Wildberries article ID */
  nmID: number;
  /** Required: Seller's article ID */
  vendorCode: string;
  /** Required: Size array (can be empty for non-sized products) */
  sizes: UpdateProductSize[];
  /** Brand name */
  brand?: string;
  /** Product title (max 60 characters) */
  title?: string;
  /** Product description (1000-5000 characters) */
  description?: string;
  /** Product dimensions and weight */
  dimensions?: ProductDimensions;
  /** Product characteristics/attributes */
  characteristics?: ProductCharacteristic[];
}

/**
 * Pagination cursor for product list
 */
export interface ProductListCursor {
  /** Maximum items per page (max 100) */
  limit?: number;
  /** Cursor: Last updatedAt from previous page */
  updatedAt?: string;
  /** Cursor: Last nmID from previous page */
  nmID?: number;
}

/**
 * Filters for product list
 */
export interface ProductListFilter {
  /** Photo filter: -1=all, 0=without photo, 1=with photo */
  withPhoto?: -1 | 0 | 1;
  /** Search by vendorCode, nmID, or barcode */
  textSearch?: string;
  /** Filter by label IDs */
  tagIDs?: number[];
  /** Only allowed categories */
  allowedCategoriesOnly?: boolean;
  /** Filter by subject IDs */
  objectIDs?: number[];
  /** Filter by brands */
  brands?: string[];
  /** Filter by unified card ID */
  imtID?: number;
}

/**
 * Request body for listing product cards with filtering and pagination
 *
 * **Pagination:** Cursor-based for >100 products (use limit max 100, updatedAt + nmID for next page)
 * **Note:** Excludes products in trash
 *
 * **Rate limit:** 100 req/min, 600ms interval
 *
 * @example
 * ```typescript
 * // First page
 * const page1: ProductListRequest = {
 *   filter: { withPhoto: 1, brands: ['My Brand'] },
 *   cursor: { limit: 100 }
 * };
 *
 * // Next page using cursor
 * const page2: ProductListRequest = {
 *   filter: { withPhoto: 1, brands: ['My Brand'] },
 *   cursor: {
 *     limit: 100,
 *     updatedAt: page1Response.cursor.updatedAt,
 *     nmID: page1Response.cursor.nmID
 *   }
 * };
 * ```
 */
export interface ProductListRequest {
  /** Sort settings */
  sort?: {
    /** Sort by updatedAt (false = descending, default) */
    ascending?: boolean;
  };
  /** Filter criteria */
  filter?: ProductListFilter;
  /** Pagination cursor */
  cursor?: ProductListCursor;
}

/**
 * Full product card response
 */
export interface ProductCard {
  /** Wildberries article ID */
  nmID?: number;
  /** Unified card ID */
  imtID?: number;
  /** UUID of the product card */
  nmUUID?: string;
  /** Subject/category ID */
  subjectID?: number;
  /** Subject/category name */
  subjectName?: string;
  /** Seller's article ID */
  vendorCode?: string;
  /** Brand name */
  brand?: string;
  /** Product title */
  title?: string;
  /** Product description */
  description?: string;
  /** Requires KiZ marking */
  needKiz?: boolean;
  /** Product photos */
  photos?: {
    /** Big size photo URL */
    big?: string;
    /** 246x328 photo URL */
    c246x328?: string;
    /** 516x688 photo URL */
    c516x688?: string;
    /** Square photo URL */
    square?: string;
    /** Thumbnail photo URL */
    tm?: string;
  }[];
  /** Video URL */
  video?: string;
  /** Wholesale settings */
  wholesale?: {
    enabled?: boolean;
    quantum?: number;
  };
  /** Product dimensions */
  dimensions?: ProductDimensions & {
    /** Dimensions validity */
    isValid?: boolean;
  };
  /** Product characteristics */
  characteristics?: {
    /** Characteristic ID */
    id?: number;
    /** Characteristic name */
    name?: string;
    /** Characteristic value */
    value?: unknown;
  }[];
  /** Product sizes */
  sizes?: {
    /** Characteristic ID */
    chrtID?: number;
    /** Tech size */
    techSize?: string;
    /** WB size */
    wbSize?: string;
    /** Barcodes */
    skus?: string[];
  }[];
  /** Tags/labels */
  tags?: {
    /** Tag ID */
    id?: number;
    /** Tag name */
    name?: string;
    /** Tag color */
    color?: string;
  }[];
  /** Creation timestamp (ISO 8601) */
  createdAt?: string;
  /** Last update timestamp (ISO 8601) */
  updatedAt?: string;
}

/**
 * Response from listing product cards
 *
 * @example
 * ```typescript
 * const response: ProductListResponse = {
 *   cards: [{ nmID: 12345, vendorCode: 'VENDOR-001', ... }],
 *   cursor: {
 *     total: 150,
 *     updatedAt: '2025-01-01T00:00:00Z',
 *     nmID: 12345
 *   }
 * };
 * ```
 */
export interface ProductListResponse {
  /** Array of product cards */
  cards?: ProductCard[];
  /** Pagination cursor */
  cursor?: {
    /** Total cards in response */
    total?: number;
    /** Cursor for next page */
    updatedAt?: string;
    /** Cursor for next page */
    nmID?: number;
  };
}

/**
 * Response from create/update/delete operations
 */
export interface ProductOperationResponse {
  /** Operation-specific data */
  data?: Record<string, never>;
  /** Error flag */
  error: boolean;
  /** Error description */
  errorText: string;
  /** Additional error details */
  additionalErrors?: string | Record<string, string>;
}

/**
 * Type alias for create product response
 */
export type CreateProductResponse = ResponseCardCreate;

/**
 * Type alias for update product response
 */
export type UpdateProductResponse = ResponseCardCreate;

/**
 * Type alias for delete product response
 */
export type DeleteProductResponse = ResponseCardCreate;

// ============================================================================
// Media and Pricing Types (Story 2.3)
// ============================================================================

/**
 * Media upload response from WB API
 *
 * Returned by both file and URL upload endpoints.
 *
 * **Media Requirements:**
 * - **Images**: Max 30, min 700×900px, max 32MB, min 65% quality
 * - **Formats**: JPG, PNG, BMP, GIF (static only), WebP
 * - **Video**: Max 1, max 50MB, formats: MOV, MP4
 *
 * @example
 * ```typescript
 * const response: MediaUploadResponse = {
 *   data: {},
 *   error: false,
 *   errorText: '',
 *   additionalErrors: null
 * };
 * ```
 */
export interface MediaUploadResponse {
  /** Operation data (usually empty on success) */
  data: Record<string, unknown>;
  /** Error flag (false = success, true = error) */
  error: boolean;
  /** Error description (empty string if no error) */
  errorText: string;
  /** Additional error details */
  additionalErrors: Record<string, unknown> | null;
}

/**
 * Request body for uploading media via URLs
 *
 * **CRITICAL:** This COMPLETELY REPLACES all existing media.
 * To add new media, include both new AND old URLs.
 *
 * **All-or-Nothing:** If ANY file fails validation, NONE upload.
 *
 * **URL Requirements:**
 * - Direct file link (not preview/HTML page)
 * - No authentication required
 * - Must return file content, not text
 *
 * @example
 * ```typescript
 * // BAD - Loses existing media
 * await uploadMediaByURLs(12345, ['https://new-photo.jpg']);
 *
 * // GOOD - Preserves existing media
 * const existing = await getMediaList(12345);
 * await uploadMediaByURLs(12345, [...existing, 'https://new-photo.jpg']);
 * ```
 */
export interface MediaSaveRequest {
  /** Wildberries article ID */
  nmId: number;
  /** Array of media URLs (max 30 images + 1 video) */
  data: string[];
}

/**
 * Pricing update for single product
 *
 * **Constraints:**
 * - Prices must be integers (whole numbers only)
 * - Discounts: 0-99%
 * - Price and discount cannot both be empty
 *
 * **Quarantine Warning:**
 * If new price with discount is ≥3x lower than old price,
 * it goes to quarantine and old price continues.
 *
 * @example
 * ```typescript
 * const update: PricingUpdate = {
 *   nmID: 12345,
 *   price: 2999,      // Integer only! (no decimals)
 *   discount: 15      // 15% discount
 * };
 * ```
 */
export interface PricingUpdate {
  /** Wildberries article ID */
  nmID: number;
  /** Price in rubles (integer only!) */
  price?: number;
  /** Discount percentage (0-99) */
  discount?: number;
}

/**
 * Request body for bulk pricing updates
 *
 * **Async Processing:**
 * Returns task ID immediately. Poll getPricingTaskStatus() to verify.
 * 200 OK means task queued, NOT that prices updated.
 *
 * **Limits:**
 * - Max 1000 products per request
 *
 * @example
 * ```typescript
 * const request: PricingUpdateRequest = {
 *   data: [
 *     { nmID: 12345, price: 2999, discount: 15 },
 *     { nmID: 67890, price: 1499, discount: 10 }
 *   ]
 * };
 * ```
 */
export interface PricingUpdateRequest {
  /** Array of pricing updates (max 1000) */
  data: PricingUpdate[];
}

/**
 * Response from pricing update operation
 *
 * **Important:** Async processing - use uploadID to check status.
 *
 * @example
 * ```typescript
 * const response: PricingTaskResponse = {
 *   uploadID: 'abc123-def456'
 * };
 *
 * // Poll for status
 * const status = await getPricingTaskStatus(response.uploadID);
 * ```
 */
export interface PricingTaskResponse {
  /** Task ID for status polling */
  uploadID: string;
}

/**
 * Current pricing information for a product
 *
 * Returned by getPricing() method.
 *
 * @example
 * ```typescript
 * const pricing: PricingInfo = {
 *   nmID: 12345,
 *   price: 2999,
 *   discount: 15,
 *   promoCode: 0,
 *   wbClubDiscount: 5,
 *   currency: 'RUB'
 * };
 *
 * // Final price calculation:
 * // base: 2999 RUB
 * // with 15% discount: 2549.15 RUB
 * // with 5% WB Club: 2421.69 RUB
 * ```
 */
export interface PricingInfo {
  /** Wildberries article ID */
  nmID: number;
  /** Current price (before discounts) */
  price: number;
  /** Current seller discount (%) */
  discount: number;
  /** Promo code discount (%) */
  promoCode: number;
  /** WB Club discount (%) */
  wbClubDiscount: number;
  /** Currency code (usually RUB) */
  currency: string;
}

/**
 * Response from getPricing() method
 *
 * Contains pricing information for one or more products.
 *
 * @example
 * ```typescript
 * const response: GetPricingResponse = {
 *   data: [
 *     { nmID: 12345, price: 2999, discount: 15, ... },
 *     { nmID: 67890, price: 1499, discount: 10, ... }
 *   ]
 * };
 * ```
 */
export interface GetPricingResponse {
  /** Array of pricing information */
  data: PricingInfo[];
}

/**
 * Pricing task status response
 *
 * Use to check if pricing update completed successfully.
 *
 * **Status Values:**
 * - `pending` - Task queued, not started
 * - `processing` - Task in progress
 * - `completed` - All prices updated successfully
 * - `failed` - Task failed, check error details
 *
 * @example
 * ```typescript
 * const status: PricingTaskStatusResponse = {
 *   uploadID: 'abc123-def456',
 *   status: 'completed',
 *   createdAt: '2025-01-01T00:00:00Z',
 *   completedAt: '2025-01-01T00:00:05Z'
 * };
 * ```
 */
export interface PricingTaskStatusResponse {
  /** Task ID from updatePricing() */
  uploadID: string;
  /** Current task status */
  status: 'pending' | 'processing' | 'completed' | 'failed';
  /** Task creation timestamp (ISO 8601) */
  createdAt: string;
  /** Task completion timestamp (ISO 8601, if completed) */
  completedAt?: string;
}

// ============================================================================
// Warehouse and Stock Types (Story 2.4)
// ============================================================================

/**
 * Request to create seller warehouse bound to WB office
 *
 * **CRITICAL Constraints:**
 * - Name: 1-200 characters
 * - WB office binding: Cannot reuse office already bound to another warehouse (409 error)
 * - Office binding enables FBS (Fulfillment by Seller) model
 *
 * @example
 * ```typescript
 * const request: WarehouseCreateRequest = {
 *   name: 'Склад Москва Центр',
 *   officeId: 123  // WB office ID from getWBOffices()
 * };
 * ```
 */
export interface WarehouseCreateRequest {
  /** Warehouse name (1-200 characters) */
  name: string;
  /** WB office/warehouse ID (must not be bound elsewhere) */
  officeId: number;
}

/**
 * Request to update seller warehouse details
 *
 * **IMPORTANT:**
 * - Office binding can only be changed once per 24 hours
 * - Cannot reuse WB office already bound to another warehouse
 *
 * @example
 * ```typescript
 * const request: WarehouseUpdateRequest = {
 *   name: 'Склад Москва Обновлённый',
 *   officeId: 123  // Can change max once/day
 * };
 * ```
 */
export interface WarehouseUpdateRequest {
  /** Warehouse name (1-200 characters) */
  name: string;
  /** WB office ID (can change max once per 24 hours) */
  officeId: number;
}

/**
 * Response from warehouse creation
 *
 * @example
 * ```typescript
 * const response: WarehouseCreateResponse = {
 *   id: 456  // New seller warehouse ID
 * };
 * ```
 */
export interface WarehouseCreateResponse {
  /** New warehouse ID */
  id: number;
}

/**
 * Single SKU stock update
 *
 * **Constraints:**
 * - Amount: 0-100,000 per SKU
 * - Batch size: 1-1000 SKUs per request
 *
 * @example
 * ```typescript
 * const update: StockUpdate = {
 *   sku: 'BARCODE123',
 *   amount: 100
 * };
 * ```
 */
export interface StockUpdate {
  /** Product barcode */
  sku: string;
  /** Stock quantity (0-100,000) */
  amount: number;
}

/**
 * Stock information for a product
 *
 * @example
 * ```typescript
 * const stock: StockInfo = {
 *   sku: 'BARCODE123',
 *   amount: 100
 * };
 * ```
 */
export interface StockInfo {
  /** Product barcode */
  sku: string;
  /** Current stock quantity */
  amount: number;
}

/**
 * Request to get stock levels
 *
 * **Constraints:**
 * - Batch size: 1-1000 SKUs
 *
 * @example
 * ```typescript
 * const request: GetStockRequest = {
 *   skus: ['BARCODE123', 'BARCODE456', 'BARCODE789']
 * };
 * ```
 */
export interface GetStockRequest {
  /** Array of product barcodes (1-1000 items) */
  skus: string[];
}

/**
 * Response from get stock operation
 *
 * @example
 * ```typescript
 * const response: GetStockResponse = {
 *   stocks: [
 *     { sku: 'BARCODE123', amount: 100 },
 *     { sku: 'BARCODE456', amount: 50 }
 *   ]
 * };
 * ```
 */
export interface GetStockResponse {
  /** Array of stock information */
  stocks: StockInfo[];
}

/**
 * Request to update stock quantities (bulk operation)
 *
 * **CRITICAL:**
 * - Parameter names NOT validated! Incorrect names = silent failure with 200 OK
 * - Correct field names: `stocks` (array), `sku` (string), `amount` (number)
 *
 * **Constraints:**
 * - Max 1000 SKUs per request
 * - Amount: 0-100,000 per SKU
 *
 * **409 Errors (count as 5 requests!):**
 * - DBS/FBS warehouse restrictions
 * - Cargo type warehouse restrictions (LCL, ODC, CD+)
 * - Warehouse processing in progress
 *
 * @example
 * ```typescript
 * const request: UpdateStockRequest = {
 *   stocks: [
 *     { sku: 'BARCODE123', amount: 100 },
 *     { sku: 'BARCODE456', amount: 50 }
 *   ]
 * };
 * ```
 */
export interface UpdateStockRequest {
  /** Array of stock updates (1-1000 items) */
  stocks: StockUpdate[];
}

/**
 * Request to delete stock records (bulk operation)
 *
 * **IRREVERSIBLE:**
 * - Deleted stock must be re-uploaded to resume sales
 * - No undo functionality
 *
 * **Constraints:**
 * - Batch size: 1-1000 SKUs
 *
 * **409 Errors (count as 5 requests!):**
 * - Warehouse processing in progress
 *
 * @example
 * ```typescript
 * const request: DeleteStockRequest = {
 *   skus: ['BARCODE123', 'BARCODE456']
 * };
 * ```
 */
export interface DeleteStockRequest {
  /** Array of barcodes to delete (1-1000 items) */
  skus: string[];
}

/**
 * Ярлык продавца
 */
export interface ProductTag {
  /** Числовой ID ярлыка */
  id: number;
  /** Цвет ярлыка в hex формате */
  color: string;
  /** Название ярлыка */
  name: string;
}

/**
 * Ответ метода getTags()
 */
export interface TagsResponse {
  /** Массив ярлыков продавца */
  data: ProductTag[];
  /** Флаг ошибки */
  error: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string;
}

// ==========================================
// Prices & Discounts API Response Types
// ==========================================

/**
 * Ответ состояния обработанной загрузки (history/tasks)
 */
export interface HistoryTasksResponse {
  data?: SupplierTaskMetadata;
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

/**
 * Ответ детализации обработанной загрузки (history/goods/task)
 */
export interface GoodsTaskResponse {
  data?: {
    /** ID загрузки */
    uploadID?: number;
    /** Информация о товарах в загрузке */
    historyGoods?: GoodHistory[];
  };
}

/**
 * Ответ состояния необработанной загрузки (buffer/tasks)
 */
export interface BufferTasksResponse {
  data?: SupplierTaskMetadataBuffer;
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

/**
 * Ответ детализации необработанной загрузки (buffer/goods/task)
 */
export interface BufferGoodsTaskResponse {
  data?: {
    /** ID загрузки */
    uploadID?: number | null;
    /** Информация о товарах в загрузке */
    bufferGoods?: GoodBufferHistory[] | null;
  };
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

/**
 * Ответ списка товаров с ценами (list/goods/filter)
 */
export interface GoodsFilterResponse {
  data?: {
    /** Информация о товарах */
    listGoods?: GoodsList[];
  };
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

/**
 * Ответ размеров товара с ценами (list/goods/size/nm)
 */
export interface SizeNmResponse {
  data?: {
    /** Размеры товара */
    listGoods?: SizeGood[] | null;
  };
  /** Флаг ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorText?: string;
}

/**
 * Ответ товаров в карантине (quarantine/goods)
 */
export interface QuarantineGoodsResponse {
  data?: {
    /** Товары в карантине */
    quarantineGoods?: QuarantineGoods[] | null;
  };
}