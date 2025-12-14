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
  countries?: 'AM' | 'BY' | 'KG' | 'KZ' | 'RU' | 'UZ'[];
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

export interface Penalty {
  /** Данные ответа */
  data: {
  /** Удержания */
  reports: {
  /** Артикул WB */
  nmId?: number;
  /** ID замера */
  dimId?: number;
  /** Предмет */
  subject?: string;
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
}[];
  /** Количество удержаний в отчёте */
  totalCount: number;
};
}

export interface Measurement {
  /** Данные ответа */
  data: {
  /** Замеры */
  reports: {
  /** Артикул WB */
  nmId?: number;
  /** Предмет */
  subject?: string;
  /** ID замера */
  dimId?: number;
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
  /** Дата и время */
  dt?: string;
  /** Дата начала замера */
  dateStart?: string;
  /** Дата конца замера */
  dateEnd?: string;
}[];
  /** Количество замеров в отчёте */
  totalCount: number;
};
}

export interface Response400WHM {
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

export interface Response403WHM {
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