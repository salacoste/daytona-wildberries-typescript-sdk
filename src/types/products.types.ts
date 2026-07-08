/**
 * Auto-generated TypeScript types for products module
 * Generated from: wildberries_api_doc/02-products.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.773Z
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
  additionalErrors?: Record<string, string> | string | { error: string };
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
  additionalErrors?: Record<string, string>;
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
  additionalErrors?: Record<string, string>;
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
  /** Цена. Валюту можно получить с помощью методов [Получить товары с ценами](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `currencyIsoCode4217` */
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
  /** ID размера. Можно получить с помощью методов [Получить товары с ценами](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `sizeID`. В методах Контента это поле `chrtID` */
  sizeID: number;
  /** Цена. Валюту можно получить с помощью методов [Получить товары с ценами](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) и [Получить товары с ценами по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post), поле `currencyIsoCode4217` */
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
 * Товары и пороги оптовых скидок для B2B-продаж. Максимум 1 000 товаров.
 *
 * Body for POST /api/discounts-prices/v1/upload/task/b2b/wholesale.
 *
 * Note: This endpoint lives on the `/api/discounts-prices/v1/` path (v1) — a
 * different prefix from the existing `/api/v2/upload/task*` methods. Auth accepts
 * a Personal OR Service token for the Prices & Discounts category.
 */
export type B2bWholesaleGoods = B2bWholesaleGood[];

export interface B2bWholesaleGood {
  /** Артикул WB */
  nmID: number;
  /** Пороги оптовой скидки для B2B-продаж (per-item wholesale discount thresholds) */
  wholesaleDiscountThreshold: WholesaleDiscountThreshold[];
}

/**
 * Результат обработки одной позиции загрузки оптовых скидок B2B.
 *
 * 200 response item for POST /api/discounts-prices/v1/upload/task/b2b/wholesale.
 * `success` is `true` on successful processing; on `false`, error details are in `error`.
 */
export interface B2bWholesaleTaskResult {
  /** Артикул WB */
  nmID?: number;
  /** Успешность обработки: `true` — успешно, `false` — неуспешно (детали в `error`) */
  success: boolean;
  /** Детали ошибки. Присутствует только когда `success` = `false` */
  error?: {
    /** Код/причина ошибки */
    code?: string;
    /** Текст ошибки */
    message?: string;
  };
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
  /** Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя
   *
   * Also true when the 'Size-Based Prices' Tariff-Builder option is enabled (RU only) and the item has >1 size. If not enabled, size-priced cards fall into drafts (`/content/v2/cards/error/list`); size-priced items cannot be added to promos (`POST /api/v1/calendar/promotions/upload` → 400). */
  editableSizePrice?: boolean;
  /** Признак неликвидного товара: - `true` — неликвидный товар с [низким индексом остатка](https://seller.wildberries.ru/instructions/ru/ru/material/stocks-index?categoryId=e324ce0f-9a2a-4b8d-8fd1-72f751b09b3b&goBackOption=prevRoute#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D0%B8%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%D0%B0-%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B0) - Поле отсутствует — ликвидный товар */
  isBadTurnover?: boolean;
  /**
   * Пороги оптовых скидок для B2B-продаж.
   *
   * Returned by GET/POST /api/v2/list/goods/filter when B2B wholesale discounts
   * have been set via POST /api/discounts-prices/v1/upload/task/b2b/wholesale.
   * Each entry describes one wholesale discount tier (price breakpoint + discount %).
   * Absent when no B2B wholesale discounts are configured for the item.
   */
  wholesaleDiscountThreshold?: WholesaleDiscountThreshold[];
}

/**
 * Порог оптовой скидки для B2B-продаж.
 *
 * One tier of a per-item wholesale discount: the discount percentage applied once
 * the order qualifies for this wholesale price breakpoint.
 */
export interface WholesaleDiscountThreshold {
  /** Порог цены, от которого начинает действовать оптовая скидка */
  minPrice?: number;
  /** Оптовая скидка, % */
  discount?: number;
}

/**
 * Информация о размере
 */
export interface SizeGood {
  /** Артикул WB */
  nmID?: number;
  /** ID размера. Можно получить с помощью метода [Получение списка товаров по артикулам](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get), поле `sizeID`. В методах Контента это поле `chrtID` */
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
  /** Можно ли устанавливать цены отдельно для разных размеров (зависит от категории товара): - `true` — можно - `false` — нельзя
   *
   * Also true when the 'Size-Based Prices' Tariff-Builder option is enabled (RU only) and the item has >1 size. If not enabled, size-priced cards fall into drafts (`/content/v2/cards/error/list`); size-priced items cannot be added to promos (`POST /api/v1/calendar/promotions/upload` → 400). */
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
 *  * `5` — обработана, но в товарах есть ошибки. Для товаров без ошибок цены и скидки обновились, а ошибки в остальных товарах можно получить с помощью метода [Детализация обработанной загрузки](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get)
 *  * `6` — обработана, но во всех товарах есть ошибки. Их тоже можно получить с помощью метода [Детализация обработанной загрузки](https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get)
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
  /** Дата и время создания или изменения пакета (когда карточка попала в черновики) */
  updatedAt?: string;
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

/**
 * Бренд
 */
export interface Brand {
  /** ID бренда */
  id: number;
  /** URL логотипа бренда */
  logoUrl: string;
  /** Название бренда */
  name: string;
}

/**
 * Ответ со списком брендов
 *
 * Возвращается методом GET /api/content/v1/brands.
 * Содержит пагинированный список брендов для указанного предмета.
 */
export interface BrandsResponse {
  /** Список брендов */
  brands: Brand[];
  /**
   * Курсор пагинации. Передайте это значение как параметр `next`
   * для получения следующей страницы. Отсутствует, когда все данные получены.
   */
  next?: number;
  /** Общее количество брендов для предмета */
  total: number;
}

/**
 * Ошибка при запросе брендов (400/404)
 *
 * Использует формат application/problem+json.
 */
export interface BrandsResponseError {
  /** Заголовок ошибки */
  title: string;
  /** Детали ошибки */
  detail: string;
  /** Внутренний ID сервиса WB */
  origin: string;
  /** Уникальный ID запроса */
  requestId: string;
  /** Детали ошибок валидации */
  errors?: {
    /** Текст ошибки */
    message: string;
    /** Местоположение параметра, вызвавшего ошибку */
    location: string;
  }[];
}

/**
 * Response for upload task creation (POST /api/v2/upload/task, /task/size, /task/club-discount)
 */
export interface UploadTaskResponse {
  /** Upload task data */
  data?: {
    /** Upload task ID */
    id?: number;
    /** Whether this upload already exists */
    alreadyExists?: boolean;
  };
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for B2B wholesale discount upload
 * (POST /api/discounts-prices/v1/upload/task/b2b/wholesale).
 *
 * Per the WB announcement: the response carries a per-item result in a `success`
 * field — `true` on successful processing, `false` on failure with error details
 * in an `error` object. See {@link B2bWholesaleTaskResult} for the item shape.
 */
export interface B2bWholesaleUploadTaskResponse {
  /** Per-item processing results */
  data?: B2bWholesaleTaskResult[];
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for processed upload tasks history (GET /api/v2/history/tasks)
 */
export interface TaskHistoryResponse {
  /** Upload task metadata */
  data?: SupplierTaskMetadata;
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for goods in processed upload (GET /api/v2/history/goods/task)
 */
export interface GoodsHistoryResponse {
  /** Goods history items */
  data?: GoodHistory[];
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for buffer upload tasks (GET /api/v2/buffer/tasks)
 */
export interface TaskBufferResponse {
  /** Buffer upload task metadata */
  data?: SupplierTaskMetadataBuffer;
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for goods in buffer upload (GET /api/v2/buffer/goods/task)
 */
export interface GoodsBufferResponse {
  /** Goods buffer history items */
  data?: GoodBufferHistory[];
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for goods list with prices (GET /api/v2/list/goods/filter)
 */
export interface GoodsFilterResponse {
  /** Goods list with pricing */
  data?: {
    /** Cursor for next offset */
    listGoods?: GoodsList[];
  };
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for goods list by article numbers (POST /api/v2/list/goods/filter)
 */
export interface GoodsFilterByNmResponse {
  /** Goods list with pricing */
  data?: {
    listGoods?: GoodsList[];
  };
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for size-specific pricing (GET /api/v2/list/goods/size/nm)
 */
export interface SizeGoodsResponse {
  /** Size-specific pricing data */
  data?: {
    listGoods?: SizeGood[];
  };
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

/**
 * Response for quarantine goods (GET /api/v2/list/goods/quarantine)
 */
export interface QuarantineGoodsResponse {
  /** Quarantine goods items */
  data?: QuarantineGoods[];
  /** Error flag */
  error?: boolean;
  /** Error description */
  errorText?: string;
}

// ─── Directory & Category Response Types ───────────────────────────────

/**
 * Родительская категория
 *
 * Returned by GET /content/v2/object/parent/all
 */
export interface ParentCategory {
  /** ID родительской категории */
  id: number;
  /** Название категории (e.g., "Электроника") */
  name: string;
  /** Виден на сайте */
  isVisible: boolean;
}

/**
 * Response for parent categories (GET /content/v2/object/parent/all)
 */
export interface GetParentAllResponse {
  /** Массив родительских категорий */
  data?: ParentCategory[];
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string;
}

/**
 * Цвет из справочника
 *
 * Returned by GET /content/v2/directory/colors
 */
export interface DirectoryColor {
  /** Наименование цвета (e.g., "персиковый мелок") */
  name: string;
  /** Наименование родительского цвета (e.g., "оранжевый") */
  parentName: string;
}

/**
 * Response for colors directory (GET /content/v2/directory/colors)
 */
export interface GetDirectoryColorsResponse {
  /** Массив цветов */
  data?: DirectoryColor[];
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string;
}

/**
 * Страна из справочника
 *
 * Returned by GET /content/v2/directory/countries
 */
export interface DirectoryCountry {
  /** ID страны */
  id: number;
  /** Значение характеристики Страны (e.g., "Китай") */
  name: string;
  /** Полное название страны (e.g., "Китайская Народная Республика") */
  fullName: string;
}

/**
 * Response for countries directory (GET /content/v2/directory/countries)
 */
export interface GetDirectoryCountriesResponse {
  /** Массив стран */
  data?: DirectoryCountry[];
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string;
}

/**
 * Ярлык (тег контента)
 *
 * Returned by GET /content/v2/tags
 */
export interface ContentTag {
  /** Числовой ID ярлыка */
  id: number;
  /** Цвет ярлыка (e.g., "D1CFD7") */
  color: string;
  /** Имя ярлыка (e.g., "Sale") */
  name: string;
}

/**
 * Response for content tags (GET /content/v2/tags)
 */
export interface GetContentTagsResponse {
  /** Массив ярлыков */
  data?: ContentTag[];
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string;
}

// ──────────────────────────────────────────────────────────────
// Characteristic types (extracted from inline types — task-109/110, v3.9.0)
// ──────────────────────────────────────────────────────────────

/**
 * Characteristic metadata for a product category (subject).
 * Returned by `getObjectCharc()`.
 *
 * @since 3.9.0
 * @see {@link https://dev.wildberries.ru/docs/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki}
 */
export interface SubjectCharacteristic {
  /** Characteristic ID */
  charcID?: number;
  /** Subject (category) name */
  subjectName?: string;
  /** Subject (category) ID */
  subjectID?: number;
  /** Characteristic name */
  name?: string;
  /** Whether this characteristic is required in product cards */
  required?: boolean;
  /**
   * Whether this characteristic is mandatory when **creating** a product card.
   * Enforced by WB starting April 29, 2026 for select categories.
   *
   * Affected categories include: flash drives (1260), fitness bracelets (1514),
   * hair straighteners (2314), blenders (614), nettops/mini PCs (8992),
   * photo frames (28), calculators (977), lids (819), pillowcases (605),
   * cleaning wipes (1202).
   *
   * @since 3.9.0
   */
  isRequiredForCreate?: boolean;
  /**
   * Whether product variants within a merged card can differ by this characteristic.
   * Use when creating merged cards (`createCardsUpload()`) or attaching to existing
   * merged cards (`createUploadAdd()`) — characteristics with `isVariable: true`
   * can have different values across variants of the same merged card.
   *
   * @since 3.9.2
   */
  isVariable?: boolean;
  /**
   * Routing flag — indicates how this characteristic should be passed in
   * card create/update requests:
   *
   * - `false` → include in the `characteristics[]` array. Example: `color` for a coffee grinder.
   * - `true` → pass as a separate top-level request parameter (NOT in `characteristics[]`).
   *   Examples: `brand`, `height`, `length`, `name`, `width`, `weight`.
   *
   * **Important for validation helpers**: when this is `true`, the characteristic
   * value is provided by the consumer outside `characteristics[]`. The
   * `validateRequiredCharacteristics()` and `validateMergedCardVariants()`
   * helpers, **starting in 3.10.2**, accept an optional `namedFields` parameter to
   * correctly track these characteristics. (The helpers themselves were added in
   * 3.9.0/3.9.2.)
   *
   * @since 3.10.2
   * @see {@link https://dev.wildberries.ru/release-notes}
   */
  existNamedField?: boolean;
  /**
   * Read-only flag from `getObjectCharc()`. When `true`, this characteristic appears
   * as a buyer-facing filter on the WB storefront category page.
   *
   * **Consumer impact:**
   * - Combined with `required: true`, marks a key/filter mandatory characteristic
   * - Filter characteristics typically have higher priority for buyer discovery —
   *   surface them prominently in seller UIs
   * - Read the obligation matrix in
   *   `docs/guides/mandatory-product-characteristics.md` for full routing logic
   *
   * @since 3.10.2
   */
  hasFilter?: boolean;
  /** Unit name (e.g., "см", "г") */
  unitName?: string;
  /** Maximum number of values for this characteristic */
  maxCount?: number;
  /** Whether this is a popular/frequently used characteristic */
  popular?: boolean;
  /** Characteristic value type: 0=string, 1=number, 4=array */
  charcType?: number;
}

/**
 * Characteristic value for card create/update requests.
 * Used in `createCardsUpload()`, `createUploadAdd()`, `createCardsUpdate()`.
 *
 * @since 3.9.0
 */
export interface CardCharacteristicInput {
  /** Characteristic ID (from {@link SubjectCharacteristic.charcID}) */
  id: number;
  /**
   * Characteristic value. Expected type depends on `charcType`:
   * - `0` → `string` (text value)
   * - `1` → `number` (numeric value)
   * - `4` → `string[]` (array of text values)
   *
   * Typed as union for DX; WB API accepts any JSON-serializable value.
   */
  value: string | number | string[];
}

/**
 * Characteristic value returned in card listing responses.
 * Includes the characteristic name in addition to id and value.
 * Returned by `getCardsList()`, `getCardsCursorList()`.
 *
 * @since 3.9.0
 */
export interface CardCharacteristicOutput {
  /** Characteristic ID */
  id?: number;
  /** Characteristic name */
  name?: string;
  /** Characteristic value */
  value?: unknown;
}

// ============================================================================
// Stock Management Types (v3.12.0 — sku → chrtId migration)
// ============================================================================

/**
 * A single stock record on a seller warehouse.
 *
 * **Migration deadline 2026-05-20 13:00 MSK:** Wildberries is phasing out the `sku`
 * field in favor of `chrtId` (size ID). Pass `chrtId` for all new code. The `sku` field
 * will return HTTP 400 from the WB API after the deadline.
 *
 * Exactly one of `sku` or `chrtId` should be set per item. If both are set, `chrtId` wins
 * at the SDK level (the request will be sent with `chrtId` only).
 *
 * @since 3.12.0
 */
export interface StockItem {
  /**
   * @deprecated since 3.12.0 — use `chrtId` instead. WB API will reject `sku` after
   * 2026-05-20 13:00 MSK. See `docs/guides/stocks-sku-to-chrtid-migration.md`.
   */
  sku?: string;
  /**
   * Size ID returned by `POST /content/v2/get/cards/list`.
   *
   * **Casing note**: WB API uses `chrtID` (uppercase D) in Content endpoints
   * (`/content/v2/get/cards/list`) but `chrtId` (lowercase d) in this Marketplace stocks
   * endpoint. Pass the same numeric value, but the SDK property is `chrtId` (lowercase d)
   * for stocks methods.
   *
   * The SDK type keeps this optional for backwards compatibility, but the WB API will
   * REQUIRE `chrtId` (and reject `sku`) after 2026-05-20 13:00 MSK.
   * @since 3.12.0
   */
  chrtId?: number;
  /** Stock amount. */
  amount?: number;
}

/**
 * Request body for {@link ProductsModule.getStocks} and {@link ProductsModule.deleteStock}.
 *
 * Provide EITHER `skus` (deprecated) OR `chrtIds` (preferred). If both are provided,
 * `chrtIds` wins. Pass `chrtIds` for all new code before 2026-05-20 13:00 MSK.
 * @since 3.12.0
 * @example
 * ```typescript
 * // New v3.12.0+ pattern (preferred)
 * const request: StocksRequest = { chrtIds: [12345678] };
 *
 * // Legacy pattern (deprecated)
 * const legacyRequest: StocksRequest = { skus: ['1234567890123'] };
 * ```
 */
export interface StocksRequest {
  /**
   * @deprecated since 3.12.0 — use `chrtIds` instead. WB API will reject `skus` after
   * 2026-05-20 13:00 MSK.
   */
  skus?: string[];
  /**
   * Array of size IDs (from `POST /content/v2/get/cards/list`).
   *
   * **Casing note**: WB API uses `chrtID` (uppercase D) in Content endpoints
   * (`/content/v2/get/cards/list`) but `chrtId` (lowercase d) in this Marketplace stocks
   * endpoint. Pass the same numeric values; the SDK property is `chrtIds` (lowercase d)
   * for stocks methods.
   *
   * The SDK type keeps this optional for backwards compatibility, but the WB API will
   * REQUIRE `chrtIds` (and reject `skus`) after 2026-05-20 13:00 MSK.
   * @since 3.12.0
   */
  chrtIds?: number[];
}

/**
 * Request body for {@link ProductsModule.updateStock}.
 * @since 3.12.0
 * @example
 * ```typescript
 * // New v3.12.0+ pattern (preferred)
 * const request: UpdateStockRequest = { stocks: [{ chrtId: 12345678, amount: 100 }] };
 *
 * // Legacy pattern (deprecated)
 * const legacyRequest: UpdateStockRequest = { stocks: [{ sku: '1234567890123', amount: 100 }] };
 * ```
 */
export interface UpdateStockRequest {
  /** Array of stock items. Use `chrtId` per item (not `sku`) after 2026-05-20. */
  stocks: StockItem[];
}

/**
 * Response from {@link ProductsModule.getStocks}.
 *
 * WB returns one of `sku` or `chrtId` per item, matching whichever identifier the
 * request used. After 2026-05-20 13:00 MSK, only `chrtId` will be populated.
 * @since 3.12.0
 */
export interface GetStocksResponse {
  stocks?: StockItem[];
}

// ============================================================================
// Card Trash Management Types (v3.13.1 — sandbox-first permanent delete)
// ============================================================================

/**
 * Request body for {@link ProductsModule.deleteCardsFromTrash}.
 *
 * **Sandbox-only at v3.13.1 release (2026-05-15)**: WB announced this endpoint in the
 * Sandbox environment. Production availability is tracked via WL-5 in
 * `backlog/watch-list.md`. SDK consumers running production traffic should test with
 * sandbox credentials first to confirm the endpoint is responsive in their target
 * environment.
 *
 * @since 3.13.1
 */
export interface DeleteCardsFromTrashRequest {
  /** Array of product card IDs (nmID) currently in trash to delete permanently. */
  nmIDs?: number[];
}

/**
 * Response from {@link ProductsModule.deleteCardsFromTrash}.
 *
 * Standard WB content-api envelope: `error` flag + `errorText` for failure modes,
 * `additionalErrors` for per-card errors when partial failure, empty `data` object
 * on success (WB does not return the deleted nmIDs back).
 *
 * @since 3.13.1
 */
export interface DeleteCardsFromTrashResponse {
  data?: Record<string, never>;
  error?: boolean;
  errorText?: string;
  /**
   * Per-card error details (when partial failure). Keys are card identifiers (e.g., nmID
   * as string), values are error messages. WB sandbox returns `{}` on full-success; this
   * shape accommodates the per-card-error case documented in the JSDoc above.
   *
   * NOTE: Intentional divergence from `createCardsRecover`'s `Record<string, never>` —
   * this field's JSDoc semantics ("per-card errors") require a value type of `string`,
   * not `never`. `Record<string, never>` can only represent `{}` and cannot hold any
   * per-card error map. See story-task-139 Implementation Notes for rationale.
   */
  additionalErrors?: Record<string, string>;
}
