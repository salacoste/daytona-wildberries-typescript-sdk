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
 * @since v3.9.0
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
   * @since v3.9.0
   */
  isRequiredForCreate?: boolean;
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
 * @since v3.9.0
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
 * @since v3.9.0
 */
export interface CardCharacteristicOutput {
  /** Characteristic ID */
  id?: number;
  /** Characteristic name */
  name?: string;
  /** Characteristic value */
  value?: unknown;
}
