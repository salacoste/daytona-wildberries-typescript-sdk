/**
 * Auto-generated TypeScript types for reports module
 * Generated from: wildberries_api_doc/12-reports.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.807Z
 */

export interface IncomesItem {
  /** Номер поставки */
  incomeId?: number;
  /** Номер УПД */
  number?: string;
  /** Дата поступления. Если часовой пояс не указан, то берётся Московское время UTC+3. */
  date?: string;
  /** Дата и время обновления информации в сервисе. Это поле соответствует параметру `dateFrom` в запросе. Если часовой пояс не указан, то берётся Московское время UTC+3. */
  lastChangeDate?: string;
  /** Артикул продавца */
  supplierArticle?: string;
  /** Размер товара */
  techSize?: string;
  /** Баркод */
  barcode?: string;
  /** Количество */
  quantity?: number;
  /** Цена из УПД */
  totalPrice?: number;
  /** Дата принятия (закрытия) в WB. Если часовой пояс не указан, то берётся Московское время UTC+3 */
  dateClose?: string;
  /** Название склада */
  warehouseName?: string;
  /** Артикул WB */
  nmId?: number;
  /** Текущий статус поставки */
  status?: 'Принято';
}

export interface StocksItem {
  /** Дата и время обновления информации в сервисе. Это поле соответствует параметру `dateFrom` в запросе. Если часовой пояс не указан, то берётся Московское время (UTC+3) */
  lastChangeDate?: string;
  /** Название склада */
  warehouseName?: string;
  /** Артикул продавца */
  supplierArticle?: string;
  /** Артикул WB */
  nmId?: number;
  /** Баркод */
  barcode?: string;
  /** Количество, доступное для продажи (сколько можно добавить в корзину) */
  quantity?: number;
  /** В пути к клиенту */
  inWayToClient?: number;
  /** В пути от клиента */
  inWayFromClient?: number;
  /** Полное (непроданное) количество, которое числится за складом (= `quantity` + в пути) */
  quantityFull?: number;
  /** Категория */
  category?: string;
  /** Предмет */
  subject?: string;
  /** Бренд */
  brand?: string;
  /** Размер */
  techSize?: string;
  /** Цена */
  Price?: number;
  /** Скидка */
  Discount?: number;
  /** Договор поставки (внутренние технологические данные) */
  isSupply?: boolean;
  /** Договор реализации (внутренние технологические данные) */
  isRealization?: boolean;
  /** Код контракта (внутренние технологические данные) */
  SCCode?: string;
}

export interface OrdersItem {
  /** Дата и время заказа. Это поле соответствует параметру `dateFrom` в запросе, если параметр `flag`=1. Если часовой пояс не указан, то берётся Московское время (UTC+3). */
  date?: string;
  /** Дата и время обновления информации в сервисе. Это поле соответствует параметру `dateFrom` в запросе, если параметр `flag`=0 или не указан. Если часовой пояс не указан, то берётся Московское время (UTC+3). */
  lastChangeDate?: string;
  /** Склад отгрузки */
  warehouseName?: string;
  /** Тип склада хранения товаров */
  warehouseType?: 'Склад WB' | 'Склад продавца';
  /** Страна */
  countryName?: string;
  /** Округ */
  oblastOkrugName?: string;
  /** Регион */
  regionName?: string;
  /** Артикул продавца */
  supplierArticle?: string;
  /** Артикул WB */
  nmId?: number;
  /** Баркод */
  barcode?: string;
  /** Категория */
  category?: string;
  /** Предмет */
  subject?: string;
  /** Бренд */
  brand?: string;
  /** Размер товара */
  techSize?: string;
  /** Номер поставки */
  incomeID?: number;
  /** Договор поставки */
  isSupply?: boolean;
  /** Договор реализации */
  isRealization?: boolean;
  /** Цена без скидок */
  totalPrice?: number;
  /** Скидка продавца, % */
  discountPercent?: number;
  /** Скидка WB, % */
  spp?: number;
  /** Цена с учетом всех скидок, кроме суммы по WB Кошельку */
  finishedPrice?: number;
  /** Цена со скидкой продавца (= `totalPrice` * (1 - `discountPercent`/100)) */
  priceWithDisc?: number;
  /** Отмена заказа: - `true` — заказ отменен */
  isCancel?: boolean;
  /** Дата и время отмены заказа. Если заказ не был отменен, то "0001-01-01T00:00:00".Если часовой пояс не указан, то берётся Московское время UTC+3. */
  cancelDate?: string;
  /** ID стикера */
  sticker?: string;
  /** ID корзины покупателя. Заказы одной транзакции будут иметь одинаковый `gNumber` */
  gNumber?: string;
  /** Уникальный ID заказа.<br> Примечание для использующих API Маркетплейс: `srid` равен `rid` в ответах методов сборочных заданий. */
  srid?: string;
}

export interface SalesItem {
  /** Дата и время продажи. Это поле соответствует параметру `dateFrom` в запросе, если параметр `flag`=1. Если часовой пояс не указан, то берётся Московское время (UTC+3). */
  date?: string;
  /** Дата и время обновления информации в сервисе. Это поле соответствует параметру `dateFrom` в запросе, если параметр `flag`=0 или не указан. Если часовой пояс не указан, то берётся Московское время (UTC+3). */
  lastChangeDate?: string;
  /** Склад отгрузки */
  warehouseName?: string;
  /** Тип склада хранения товаров */
  warehouseType?: 'Склад WB' | 'Склад продавца';
  /** Страна */
  countryName?: string;
  /** Округ */
  oblastOkrugName?: string;
  /** Регион */
  regionName?: string;
  /** Артикул продавца */
  supplierArticle?: string;
  /** Артикул WB */
  nmId?: number;
  /** Баркод */
  barcode?: string;
  /** Категория */
  category?: string;
  /** Предмет */
  subject?: string;
  /** Бренд */
  brand?: string;
  /** Размер товара */
  techSize?: string;
  /** Номер поставки */
  incomeID?: number;
  /** Договор поставки */
  isSupply?: boolean;
  /** Договор реализации */
  isRealization?: boolean;
  /** Цена без скидок */
  totalPrice?: number;
  /** Скидка продавца, % */
  discountPercent?: number;
  /** Скидка WB, % */
  spp?: number;
  /** Скидка за оплату WB Кошельком, ₽ */
  paymentSaleAmount?: number;
  /** К перечислению продавцу */
  forPay?: number;
  /** Фактическая цена с учетом всех скидок (к взиманию с покупателя) */
  finishedPrice?: number;
  /** Цена со скидкой продавца, от которой считается сумма к перечислению продавцу `forPay` (= `totalPrice` * (1 - `discountPercent`/100)) */
  priceWithDisc?: number;
  /** Уникальный ID продажи/возврата - `S**********` — продажа - `R**********` — возврат (на склад WB) */
  saleID?: string;
  /** ID стикера */
  sticker?: string;
  /** ID корзины покупателя. Заказы одной транзакции будут иметь одинаковый `gNumber` */
  gNumber?: string;
  /** Уникальный ID заказа.<br> Примечание для использующих API Маркетплейс: `srid` равен `rid` в ответах методов сборочных заданий. */
  srid?: string;
}

export interface ResponseErrorStatistics {
  errors?: string[];
}

export interface ResponseErrorStatistics2 {
  errors?: string;
}

/**
 * @example
```json
{
  "countries": [
    "AM",
    "RU"
  ]
}
```
 */
export interface ExciseReportRequest {
  /** Код стран по стандарту ISO 3166-2. Чтобы получить данные по всем странам, оставьте параметр пустым */
  countries?: ('AM' | 'BY' | 'KG' | 'KZ' | 'RU' | 'UZ')[];
}

export interface ExciseReportResponse {
  response?: ModelsExciseReportResponse;
}

export interface ModelsExciseReportResponse {
  data?: ModelsExciseReportResponseData;
}

export type ModelsExciseReportResponseData = {
  /** Страна покупателя */
  name?: string;
  /** Цена товара, с НДС */
  price?: number;
  /** Валюта */
  currency_name_short?: string;
  /** Код маркировки */
  excise_short?: string;
  /** Баркод */
  barcode?: string;
  /** Артикул WB */
  nm_id?: number;
  /** Тип операции, если есть: * `1` — вывод из оборота * `2` — возврат в оборот */
  operation_type_id?: number;
  /** Номер фискального документа (чека полного расчёта), если есть */
  fiscal_doc_number?: number;
  /** Дата фискализации (дата в чеке), если есть, `ГГГГ-ММ-ДД` */
  fiscal_dt?: string;
  /** Номер фискального накопителя, если есть */
  fiscal_drive_number?: string;
  /** `Rid` */
  rid?: number;
  /** `Srid` */
  srid?: string;
}[];

/**
 * Measurement-penalty report item (one element of `data.reports[]` in the
 * `MeasurementPenalties` response schema).
 * @see EPIC 43 - Flattened to match swagger MeasurementPenalties `data.reports[]` item shape.
 * Response is single-wrapped by {@link MeasurementPenaltiesResponse} (`{ data: { reports: Penalty[], total } }`).
 */
export interface Penalty {
  /** Артикул WB */
  nmId?: number;
  /** ID замера */
  dimId?: number;
  /** Предмет */
  subjectName?: string;
  /** Разница в габаритах, % */
  prcOver?: number;
  /** Объём, л (фактические габариты) */
  volume?: number;
  /** Ширина, см (фактические габариты) */
  width?: number;
  /** Длина, см (фактические габариты) */
  length?: number;
  /** Высота, см (фактические габариты) */
  height?: number;
  /** Объём, л (габариты карточки товара) */
  volumeSup?: number;
  /** Ширина, см (габариты карточки товара) */
  widthSup?: number;
  /** Длина, см (габариты карточки товара) */
  lengthSup?: number;
  /** Высота, см (габариты карточки товара) */
  heightSup?: number;
  /** Фото замеров */
  photoUrls?: string[];
  /** Дата штрафа */
  dtBonus?: string;
  /** Статус обмера: - `false` — отменён - `true` — подтверждён */
  isValid?: boolean;
  /** Дата и время подтверждения или отмены обмера */
  isValidDt?: string;
  /** Сумма сторно */
  reversalAmount?: number;
  /** Сумма штрафа */
  penaltyAmount?: number;
}

/**
 * Warehouse-measurement report item (one element of `data.reports[]` in the
 * `WHM` response schema).
 * @see EPIC 43 - Flattened to match swagger WHM `data.reports[]` item shape.
 * Response is single-wrapped by {@link WarehouseMeasurementsV2Response} (`{ data: { reports: Measurement[], total } }`).
 */
export interface Measurement {
  /** Артикул WB */
  nmId?: number;
  /** Предмет */
  subjectName?: string;
  /** ID замера */
  dimId?: number;
  /** Объём, л (фактические габариты) */
  volume?: number;
  /** Ширина, см (фактические габариты) */
  width?: number;
  /** Длина, см (фактические габариты) */
  length?: number;
  /** Высота, см (фактические габариты) */
  height?: number;
  /** Фото замеров */
  photoUrls?: string[];
  /** Дата и время замера */
  dt?: string;
}

/**
 * 400 error response for retentions endpoints (measurement-penalties, warehouse-measurements, deductions)
 * @see EPIC 43 - Added per swagger Response400Retentions schema
 */
export interface Response400Retentions {
  /** Заголовок ошибки */
  title?: string;
  /** HTTP статус-код */
  status?: number;
  /** Детали ошибки */
  detail?: string;
  /** Уникальный ID запроса */
  requestId?: string;
  /** ID внутреннего сервиса WB */
  origin?: string;
}

/**
 * 403 error response for retentions endpoints (measurement-penalties, warehouse-measurements, deductions)
 * @see EPIC 43 - Added per swagger Response403Retentions schema
 */
export interface Response403Retentions {
  /** Заголовок ошибки */
  title?: string;
  /** HTTP статус-код */
  status?: number;
  /** Детали ошибки */
  detail?: string;
  /** Уникальный ID запроса */
  requestId?: string;
  /** ID внутреннего сервиса WB */
  origin?: string;
}

/**
 * @example
```json
[
  {
    "date": "2023-10-01",
    "logWarehouseCoef": 0,
    "officeId": 507,
    "warehouse": "Коледино",
    "warehouseCoef": 1.7,
    "giId": 123456,
    "chrt_id": 1234567,
    "size": "0",
    "barcode": "",
    "subject": "Маски одноразовые",
    "brand": "1000 Каталог",
    "vendorCode": "Артикул_продавца",
    "nmId": 1234567,
    "volume": 12,
    "calcType": "короба: без габаритов",
    "warehousePrice": 7.65,
    "barcodesCount": 1,
    "palletPlaceCode": 0,
    "palletCount": 0,
    "originalDate": "2023-10-01",
    "loyaltyDiscount": 10,
    "tariffFixDate": "2023-10-01",
    "tariffLowerDate": "2023-11-01"
  }
]
```
 */
export type ResponsePaidStorage = {
  /** Дата, за которую был расчёт или перерасчёт */
  date?: string;
  /** Коэффициент логистики и хранения */
  logWarehouseCoef?: number;
  /** ID склада */
  officeId?: number;
  /** Название склада */
  warehouse?: string;
  /** Коэффициент склада */
  warehouseCoef?: number;
  /** ID поставки */
  giId?: number;
  /** ID размера для этого артикула WB */
  chrtId?: number;
  /** Размер (`techSize` в карточке товара) */
  size?: string;
  /** Баркод */
  barcode?: string;
  /** Предмет */
  subject?: string;
  /** Бренд */
  brand?: string;
  /** Артикул продавца */
  vendorCode?: string;
  /** Артикул WB */
  nmId?: number;
  /** Объём товара */
  volume?: number;
  /** Способ расчёта */
  calcType?: string;
  /** Сумма хранения */
  warehousePrice?: number;
  /** Количество единиц товара (штук), подлежащих тарифицированию за расчётные сутки */
  barcodesCount?: number;
  /** Код паллетоместа */
  palletPlaceCode?: number;
  /** Количество паллет */
  palletCount?: number;
  /** Если был перерасчёт, это дата первоначального расчёта. Если перерасчёта не было, совпадает с `date` */
  originalDate?: string;
  /** Скидка программы лояльности, ₽ */
  loyaltyDiscount?: number;
  /** Дата фиксации тарифа */
  tariffFixDate?: string;
  /** Дата понижения тарифа */
  tariffLowerDate?: string;
}[];

export interface GetTasksResponse {
  data?: GetTasksResponseData;
}

export interface GetTasksResponseData {
  /** ID задания */
  id?: string;
  /** Статус задания: * `new` — новое * `processing` — обрабатывается * `done` — отчёт готов * `purged` — отчёт удалён * `canceled` — отклонено */
  status?: string;
}

export interface CreateTaskResponse {
  data?: CreateTaskResponseData;
}

export interface CreateTaskResponseData {
  /** ID задания на генерацию */
  taskId?: string;
}

export interface Response4xxResponse {
  /** Детали ошибки */
  detail?: string;
  /** ID внутреннего сервиса WB */
  origin?: string;
  /** Уникальный ID запроса */
  requestId?: string;
  /** Заголовок ошибки */
  title?: string;
}

// ============================================================================
// Response types for Promise<unknown> methods - EPIC 43 AC #4
// ============================================================================

/**
 * Antifraud details report item (self-purchase deductions)
 * @see EPIC 43 - Response type for getAnalyticsAntifraudDetails
 * OpenAPI schema: `SuccessTaskResponse` in `12-reports.yaml`.
 */
export interface AntifraudDetailsItem {
  /** Артикул Wildberries */
  nmID?: number;
  /** Сумма заказа */
  sum?: number;
  /** Валюта */
  currency?: string;
  /** Дата начала отчёта */
  dateFrom?: string;
  /** Дата окончания отчёта */
  dateTo?: string;
}

/**
 * Response for getAnalyticsAntifraudDetails
 * @see EPIC 43 - Response type for getAnalyticsAntifraudDetails
 * OpenAPI schema: `SuccessTaskResponse` in `12-reports.yaml`; wrapper key: `details`.
 */
export interface AntifraudDetailsResponse {
  details?: AntifraudDetailsItem[];
}

/**
 * Goods labeling report item
 * @see EPIC 43 - Response type for getAnalyticsGoodsLabeling
 * OpenAPI schema: `SuccessGoodsLabelingResponse` in `12-reports.yaml`.
 */
export interface GoodsLabelingItem {
  /** Сумма штрафа, руб. */
  amount?: number;
  /** Дата */
  date?: string;
  /** ID поставки */
  incomeId?: number;
  /** Артикул WB */
  nmID?: number;
  /** Фото товара */
  photoUrls?: string[];
  /** SKU товара Wildberries */
  shkID?: number;
  /** SKU объявления */
  sku?: string;
}

/**
 * Response for getAnalyticsGoodsLabeling
 * @see EPIC 43 - Response type for getAnalyticsGoodsLabeling
 * OpenAPI schema: `SuccessGoodsLabelingResponse` in `12-reports.yaml`; wrapper key:
 * `report` (flat, no nesting).
 */
export interface GoodsLabelingResponse {
  report?: GoodsLabelingItem[];
}

/**
 * Region sale report item
 * @see EPIC 43 - Response type for getAnalyticsRegionSale
 * OpenAPI schema: `SuccessRegionSaleResponse` in `12-reports.yaml`.
 */
export interface RegionSaleItem {
  /** Населённый пункт (location) */
  cityName?: string;
  /** Страна */
  countryName?: string;
  /** Федеральный округ */
  foName?: string;
  /** Артикул WB */
  nmID?: number;
  /** Регион */
  regionName?: string;
  /** Артикул продавца */
  sa?: string;
  /** К оплате за единицу товара, руб. */
  saleInvoiceCostPrice?: number;
  /** Доля, % */
  saleInvoiceCostPricePerc?: number;
  /** Выкуплено, шт. */
  saleItemInvoiceQty?: number;
}

/**
 * Response for getAnalyticsRegionSale
 * @see EPIC 43 - Response type for getAnalyticsRegionSale
 * OpenAPI schema: `SuccessRegionSaleResponse` in `12-reports.yaml`; wrapper key: `report`.
 */
export interface RegionSaleResponse {
  report?: RegionSaleItem[];
}

/**
 * Response for getBrandShareBrands
 * @see EPIC 43 - Response type for getBrandShareBrands
 * OpenAPI schema: `SuccessBrandsResponse` in `12-reports.yaml`; `data` is an array of bare
 * brand-name strings (e.g. ["H&M", "WOW"]).
 */
export interface BrandShareBrandsResponse {
  data?: string[];
}

/**
 * Brand share parent subjects item
 * @see EPIC 43 - Response type for getBrandShareParentSubjects
 */
export interface BrandShareParentSubjectsItem {
  /** Название категории */
  parentName?: string;
  /** ID категории */
  parentId?: number;
}

/**
 * Response for getBrandShareParentSubjects
 * @see EPIC 43 - Response type for getBrandShareParentSubjects
 */
export interface BrandShareParentSubjectsResponse {
  data?: BrandShareParentSubjectsItem[];
}

/**
 * Brand share report item
 * @see EPIC 43 - Response type for getAnalyticsBrandShare
 * OpenAPI schema: `SuccessBrandShareResponse` in `12-reports.yaml`.
 */
export interface BrandShareItem {
  /** Дата (ГГГГ-ММ-ДД) */
  applyDate?: string;
  /** Рейтинг бренда в родительской категории */
  brandRating?: number;
  /** Доля продаж в родительской категории — цена, % */
  pricePercent?: number;
  /** Доля продаж в родительской категории — количество, % */
  qtyPercent?: number;
}

/**
 * Response for getAnalyticsBrandShare
 * @see EPIC 43 - Response type for getAnalyticsBrandShare
 * OpenAPI schema: `SuccessBrandShareResponse` in `12-reports.yaml`; wrapper key: `report`.
 */
export interface BrandShareResponse {
  report?: BrandShareItem[];
}

// ============================================================================
// Extracted inline types - EPIC 43 AC #7
// ============================================================================

/**
 * Warehouse remains download item (extracted from getTasksDownload inline type)
 * @see EPIC 43 - Extracted from inline type literal
 */
export interface WarehouseRemainsDownloadItem {
  /** Бренд */
  brand?: string;
  /** Предмет */
  subjectName?: string;
  /** Артикул продавца */
  vendorCode?: string;
  /** Артикул WB */
  nmId?: number;
  /** Баркод */
  barcode?: string;
  /** Размер */
  techSize?: string;
  /** Объём, л */
  volume?: number;
  /** Остатки по складам */
  warehouses?: WarehouseQuantity[];
}

/**
 * Warehouse quantity for remains report
 */
export interface WarehouseQuantity {
  /** Название склада */
  warehouseName?: string;
  /** Количество */
  quantity?: number;
}

/**
 * Acceptance report download item (extracted from getTasksDownload2 inline type)
 * @see EPIC 43 - Extracted from inline type literal
 */
export interface AcceptanceReportDownloadItem {
  /** Количество */
  count?: number;
  /** Дата создания приёмки */
  giCreateDate?: string;
  /** ID поставки */
  incomeId?: number;
  /** Артикул WB */
  nmID?: number;
  /** Дата создания ШК */
  shkCreateDate?: string;
  /** Предмет */
  subjectName?: string;
  /** Сумма */
  total?: number;
}

/**
 * Banned product item for blocked products report
 * @see EPIC 43 - Extracted from inline type literal
 */
export interface BannedProductBlockedItem {
  /** Бренд */
  brand?: string;
  /** Артикул WB */
  nmId?: number;
  /** Название товара */
  title?: string;
  /** Артикул продавца */
  vendorCode?: string;
  /** Причина блокировки */
  reason?: string;
}

/**
 * Response for getBannedProductsBlocked
 * @see EPIC 43 - Extracted from inline type literal
 */
export interface BannedProductsBlockedResponse {
  report?: BannedProductBlockedItem[];
}

/**
 * Banned product item for shadowed products report
 * @see EPIC 43 - Extracted from inline type literal
 */
export interface BannedProductShadowedItem {
  /** Бренд */
  brand?: string;
  /** Артикул WB */
  nmId?: number;
  /** Название товара */
  title?: string;
  /** Артикул продавца */
  vendorCode?: string;
  /** Рейтинг товара */
  nmRating?: number;
}

/**
 * Response for getBannedProductsShadowed
 * @see EPIC 43 - Extracted from inline type literal
 */
export interface BannedProductsShadowedResponse {
  report?: BannedProductShadowedItem[];
}

/**
 * Goods return report item
 * @see EPIC 43 - Extracted from inline type literal
 */
export interface GoodsReturnItem {
  /** Баркод */
  barcode?: string;
  /** Бренд */
  brand?: string;
  /** Дата завершения */
  completedDt?: string;
  /** Адрес ПВЗ назначения */
  dstOfficeAddress?: string;
  /** ID ПВЗ назначения */
  dstOfficeId?: number;
  /** Дата истечения срока */
  expiredDt?: string;
  /** Статус активности: 0 — неактивен, 1 — активен */
  isStatusActive?: 0 | 1;
  /** Артикул WB */
  nmId?: number;
  /** Дата заказа */
  orderDt?: string;
  /** ID заказа */
  orderId?: number;
  /** Дата готовности к возврату */
  readyToReturnDt?: string;
  /** Причина возврата */
  reason?: string;
  /** Тип возврата */
  returnType?: string;
  /** ID ШК */
  shkId?: number;
  /** Srid */
  srid?: string;
  /** Статус */
  status?: string;
  /** ID стикера */
  stickerId?: string;
  /** Предмет */
  subjectName?: string;
  /** Размер */
  techSize?: string;
}

/**
 * Response for getAnalyticsGoodsReturn
 * @see EPIC 43 - Extracted from inline type literal
 */
export interface GoodsReturnResponse {
  report?: GoodsReturnItem[];
}

// ============================================================================
// Request parameter types for new endpoints - EPIC 44 preparation
// ============================================================================

/**
 * Parameters for getMeasurementPenalties
 * @see EPIC 44 - Request params for new measurement-penalties endpoint
 */
export interface MeasurementPenaltiesParams {
  /** Index signature for Record<string, unknown> compatibility */
  [key: string]: string | number | undefined;
  /** Дата начала периода (ISO 8601) */
  dateFrom?: string;
  /** Дата окончания периода (ISO 8601, обязательный) */
  dateTo: string;
  /** Количество записей в ответе (max 1000) */
  limit: number;
  /** Количество записей для пропуска (default 0) */
  offset?: number;
}

/**
 * Parameters for getWarehouseMeasurementsV2
 * @see EPIC 44 - Request params for new warehouse-measurements endpoint
 */
export interface WarehouseMeasurementsV2Params {
  /** Index signature for Record<string, unknown> compatibility */
  [key: string]: string | number | undefined;
  /** Дата начала периода (ISO 8601) */
  dateFrom?: string;
  /** Дата окончания периода (ISO 8601, обязательный) */
  dateTo: string;
  /** Количество записей в ответе (max 1000) */
  limit: number;
  /** Количество записей для пропуска (default 0) */
  offset?: number;
}

/**
 * Parameters for getDeductions
 * @see EPIC 44 - Request params for new deductions endpoint
 */
export interface DeductionsParams {
  /** Index signature for Record<string, unknown> compatibility */
  [key: string]: string | number | undefined;
  /** Дата начала периода (ISO 8601) */
  dateFrom?: string;
  /** Дата окончания периода (ISO 8601, обязательный) */
  dateTo: string;
  /** Поле сортировки */
  sort?: 'nmId' | 'dtBonus' | 'bonusSumm';
  /** Направление сортировки */
  order?: 'desc' | 'asc';
  /** Количество записей в ответе (max 1000) */
  limit: number;
  /** Количество записей для пропуска (default 0) */
  offset?: number;
}

/**
 * Deduction report item
 * @see EPIC 44 - Response type for getDeductions
 */
export interface DeductionItem {
  /** Дата штрафа */
  dtBonus?: string;
  /** Артикул WB */
  nmId?: number;
  /** Старый ID ШК */
  oldShkId?: number;
  /** Старый цвет */
  oldColor?: string;
  /** Старый размер */
  oldSize?: string;
  /** Старый артикул WB */
  oldSku?: string;
  /** Старый артикул продавца */
  oldVendorCode?: string;
  /** Новый ID ШК */
  newShkId?: number;
  /** Новый цвет */
  newColor?: string;
  /** Новый размер */
  newSize?: string;
  /** Новый артикул WB */
  newSku?: string;
  /** Новый артикул продавца */
  newVendorCode?: string;
  /** Сумма штрафа */
  bonusSumm?: number;
  /** Тип штрафа */
  bonusType?: string;
  /** Фото */
  photoUrls?: string[];
}

/**
 * Response for getDeductions
 * @see EPIC 44 - Response type for getDeductions
 */
export interface DeductionsResponse {
  data?: {
    reports?: DeductionItem[];
    total?: number;
  };
}

/**
 * Response for getMeasurementPenalties
 * Uses the Penalty interface for report items
 * @see EPIC 44 - Response type for getMeasurementPenalties
 */
export interface MeasurementPenaltiesResponse {
  data?: {
    reports?: Penalty[];
    total?: number;
  };
}

/**
 * Response for getWarehouseMeasurementsV2
 * Uses the Measurement interface for report items
 * @see EPIC 44 - Response type for getWarehouseMeasurementsV2
 */
export interface WarehouseMeasurementsV2Response {
  data?: {
    reports?: Measurement[];
    total?: number;
  };
}
