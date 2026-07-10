/**
 * Auto-generated TypeScript types for in-store-pickup module
 * Generated from: wildberries_api_doc/06-in-store-pickup.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.784Z
 */

export interface ApiCheckedIdentity {
  /** Принадлежит ли заказ покупателю: - `true` — принадлежит - `false` — значение не применяется. Если заказ не принадлежит покупателю, вы получите ответ со статус-кодом `409` */
  ok?: boolean;
}

export interface Error {
  /** Код ошибки */
  code?: string;
  /** Описание ошибки */
  message?: string;
  /** Дополнительные данные, обогащающие ошибку */
  data?: Record<string, unknown> | null;
}

/**
 * @example
```json
{
  "orderCode": "170046918-0011",
  "passcode": "4567"
}
```
 */
export interface ApiCheckIdentityRequest {
  /** Уникальный ID заказа покупателя */
  orderCode?: string;
  /** Код подтверждения */
  passcode?: string;
}

export interface ApiError {
  code?: string;
  data?: Record<string, unknown> | null;
  message?: string;
}

export interface ApiNewOrder {
  /** Планируемая дата доставки */
  ddate?: string;
  /** Цена продавца в валюте продажи с учётом скидки продавца, без учёта скидки WB Клуба, умноженная на 100. Предоставляется в информационных целях */
  salePrice?: number | null;
  /** Список метаданных, доступных для сборочного задания */
  requiredMeta?: string[] | null;
  /** Артикул продавца */
  article?: string;
  /** Уникальный ID заказа. <br> Примечание: поле `rid` — это поле `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Дата и время создания сборочного задания */
  createdAt?: string;
  /** Адрес магазина (склада продавца), на который поступило сборочное задание */
  warehouseAddress?: string;
  /** Уникальный ID заказа покупателя */
  orderCode?: string;
  /** Режим оплаты: - `prepaid` — предоплатный - `postpaid` — постоплатный - `unknown` — неизвестный */
  payMode?: 'prepaid' | 'postpaid' | 'unknown';
  /** Массив баркодов товара */
  skus?: string[];
  /** ID сборочного задания */
  id?: number;
  /** ID склада продавца, на который поступило сборочное задание */
  warehouseId?: number;
  /** Артикул WB */
  nmId?: number;
  /** ID размера товара в системе WB */
  chrtId?: number;
  /** Цена в валюте продажи с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях */
  price?: number;
  /** Cумма к оплате покупателем в валюте продажи с учетом всех скидок, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях */
  finalPrice?: number;
  /** Цена в валюте страны продавца с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях */
  convertedPrice?: number;
  /** Cумма к оплате покупателем в валюте страны продавца с учетом всех скидок, умноженная на 100. Предоставляется в информационных целях */
  convertedFinalPrice?: number;
  /** Код валюты продажи */
  currencyCode?: number;
  /** Код валюты страны продавца */
  convertedCurrencyCode?: number;
  /** Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) */
  cargoType?: 1 | 2 | 3;
  /** Признак заказа товара с нулевым остатком: - `false` — заказ сделан на товар с ненулевым остатком - `true` — заказ сделан на товар с нулевым остатком. Такой заказ можно отменить без штрафа за отмену */
  isZeroOrder?: boolean;
  /** Опции заказа */
  options?: {
    /** Признак B2B-продажи: - `false` — не B2B - `true` — B2B-продажа */
    isB2b?: boolean;
  };
}

export interface ApiNewOrders {
  /** Список сборочных заданий */
  orders?: ApiNewOrder[];
}

export interface ApiOrder {
  /** Артикул продавца */
  article?: string;
  /** Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) */
  cargoType?: 1 | 2 | 3;
  /** ID размера товара в системе WB */
  chrtId?: number;
  /** Дата и время создания сборочного задания */
  createdAt?: string;
  /** Цена в валюте продажи с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях */
  price?: number;
  /** Cумма к оплате покупателем в валюте продажи с учетом всех скидок, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях */
  finalPrice?: number;
  /** Цена в валюте страны продавца с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях */
  convertedPrice?: number;
  /** Cумма к оплате покупателем в валюте страны продавца с учетом всех скидок, умноженная на 100. Предоставляется в информационных целях */
  convertedFinalPrice?: number;
  /** Код валюты продажи */
  currencyCode?: number;
  /** Код валюты страны продавца */
  convertedCurrencyCode?: number;
  /** ID сборочного задания */
  id?: number;
  /** Признак заказа товара с нулевым остатком: - `false` — заказ сделан на товар с ненулевым остатком - `true` — заказ сделан на товар с нулевым остатком. Такой заказ можно отменить без штрафа за отмену */
  isZeroOrder?: boolean;
  /** Артикул WB */
  nmId?: number;
  /** Уникальный ID заказа покупателя */
  orderCode?: string;
  /** Режим оплаты: - `prepaid` — предоплатный - `postpaid` — постоплатный - `unknown` — неизвестный */
  payMode?: 'prepaid' | 'postpaid' | 'unknown';
  /** Уникальный ID заказа. <br> Примечание: поле `rid` — это поле `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Массив баркодов товара */
  skus?: string[];
  /** Адрес магазина (склада продавца), на который поступило сборочное задание */
  warehouseAddress?: string;
  /** ID склада продавца, на который поступило сборочное задание */
  warehouseId?: number;
  /** Опции заказа */
  options?: {
    /** Признак B2B-продажи: - `false` — не B2B - `true` — B2B-продажа */
    isB2b?: boolean;
  };
}

/**
 * @example
```json
{
  "phone": "+71111111111",
  "firstName": "Иван",
  "orderID": 1234567,
  "phoneCode": 1234567
}
```
 */
export interface ApiOrderClientInfo {
  /** Телефон для связи с покупателем. Чтобы связаться с покупателем наберите этот номер и введите добавочный код. Данный номер не является прямым номером покупателя. */
  phone?: string;
  /** Имя покупателя */
  firstName?: string;
  /** ID сборочного задания */
  orderID?: number;
  /** Добавочный код */
  phoneCode?: number;
}

export interface ApiOrderClientInfoResp {
  orders?: ApiOrderClientInfo[];
}

export interface ApiOrders {
  /** Параметр пагинации. Содержит значение, которое необходимо указать в запросе для получения следующего пакета данных */
  next?: number;
  /** Список сборочных заданий */
  orders?: ApiOrder[];
}

/**
 * @example
```json
{
  "orders": [
    1234567
  ]
}
```
 */
export interface ApiOrdersRequest {
  /** Список ID сборочных заданий */
  orders?: number[];
}

// ============================================================================
// Bulk B2B marking validation + customs-declaration (task-158, since 3.16.0)
// ============================================================================

/** Per-order label-identifier validation detail (meta/details response). */
export interface PickupMetaDetail {
  /** Identifier name: imei | uin | gtin | sgtin | customsDeclaration | originCountryCode. */
  key: string;
  /** Identifier value (null when not set). */
  value?: string | null;
  /** Validation status (filled, optional, pending, required, imeiInvalidFormat, sgtinNotFound, …). */
  decision: string;
}

/** Per-order result in the meta/details response. */
export interface PickupMetaDetailsOrder {
  orderId: number;
  isError: boolean;
  errors?: { code: number; detail: string }[];
  metaDetails: PickupMetaDetail[];
}

/** Response from {@link InStorePickupModule.checkMetaValidation}. */
export interface CheckMetaValidationResponse {
  requestId: string;
  orders: PickupMetaDetailsOrder[];
}

/** Per-order item in a setCustomsDeclarationBulk request. */
export interface PickupCustomsDeclarationItem {
  orderId: number;
  /** Customs declaration number (17–29 chars). */
  customsDeclaration: string;
  /** Numeric country-of-origin code (ОКСМ, https://esnsi.gosuslugi.ru/classifiers/16269). REQUIRED for B2B since 2026-07-08. */
  originCountryCode: string;
}

/** Request body for {@link InStorePickupModule.setCustomsDeclarationBulk}. */
export interface SetCustomsDeclarationBulkRequest {
  /** Orders with customs declarations + origin country codes (max 1000). */
  orders: PickupCustomsDeclarationItem[];
}

/** Per-order result in the setCustomsDeclarationBulk response. */
export interface PickupCustomsDeclarationResult {
  orderId: number;
  isError: boolean;
  /** Error entries (includes `InvalidOriginCountryCode` for B2B orders missing/invalid originCountryCode). */
  errors?: { code: number; detail: string }[];
}

/** Response from {@link InStorePickupModule.setCustomsDeclarationBulk}. */
export interface CustomsDeclarationSetResponse {
  requestId: string;
  results: PickupCustomsDeclarationResult[];
}

// ============================================================================
// Batch click-collect API (task-147, since 3.17.0)
// WB shut down single-order /api/v3/click-collect/orders/{orderId}/* paths and
// migrated to batch POST /api/marketplace/v3/click-collect/*. The legacy
// single-order @deprecated shims were removed in v4.0.0; only these live batch
// types remain. Shapes mirror the DBS module (server-identical).
// ============================================================================

/** Metadata key type for label identifiers (delete + validation). */
export type PickupMetadataKey = 'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration';

/**
 * Request body for batch status setters + status info + meta read.
 * `{ ordersIds }` — pickup receive/reject take NO passcodes (unlike DBS).
 */
export interface OrdersRequestV2 {
  /** List of assembly order IDs (max 1000). */
  ordersIds: number[];
}

/** Per-order error in a batch response. */
export interface BatchError {
  /** Error code (e.g. 404). */
  code: number;
  /** Error description (e.g. `NotFound`). */
  detail: string;
}

/** Per-order result in a batch status-change response. */
export interface StatusSetResponse {
  /** Assembly order ID. */
  orderId: number;
  /** Whether an error occurred for this order. */
  isError: boolean;
  /** Error details (present when `isError` is true). */
  errors?: BatchError[];
}

/** Response from batch status setters (confirm/prepare/receive/reject/cancel). */
export interface BulkStatusChangeResponse {
  /** Unique request ID. */
  requestId: string;
  /** Per-order results. */
  results: StatusSetResponse[];
}

/** Per-order status in the batch status-info response. */
export interface PickupOrderStatusBulk {
  /** Assembly order ID. */
  orderId: number;
  /** Status set by the seller. */
  supplierStatus?: string;
  /** Status set by the WB system. */
  wbStatus?: string;
  /** Error details (present when the order was not found). */
  errors?: BatchError[];
}

/** Response from {@link InStorePickupModule.getStatusesBulk}. */
export interface GetStatusInfoResponse {
  /** Status data for each requested order. */
  orders: PickupOrderStatusBulk[];
}

/** Request body for {@link InStorePickupModule.getMetaBulk}. */
export interface GetMetaBulkRequest {
  /** Order IDs to get metadata for (max 1000). */
  ordersIds: number[];
}

/** Single order's label identifiers (meta/details response item). */
export interface OrderMetaV2 {
  /** Error message (`""` = no errors, `NotFound` = order not found). */
  error: string;
  /** GTIN. */
  gtin?: string | null;
  /** IMEI. */
  imei?: string | null;
  /** Assembly order ID. */
  orderId: number;
  /** Chestny ZNAK labeling codes. */
  sgtin?: string[] | null;
  /** UIN. */
  uin?: string | null;
  /** Customs declaration number. */
  customsDeclaration?: string | null;
}

/** Response from {@link InStorePickupModule.getMetaBulk}. */
export interface GetOrderMetaBulkResponse {
  /** Unique request ID. */
  requestId: string;
  /** Label identifiers for each requested order. */
  orders: OrderMetaV2[];
}

/** Request body for {@link InStorePickupModule.deleteMetaBulk}. */
export interface DeleteMetaBulkRequest {
  /** Label identifier type to delete (only one per request). */
  key: PickupMetadataKey;
  /** Assembly order IDs (max 1000). */
  ordersIds: number[];
}

/** Response from {@link InStorePickupModule.deleteMetaBulk}. */
export interface DeleteMetaBulkResponse {
  /** Unique request ID. */
  requestId: string;
  /** Per-order results. */
  results: StatusSetResponse[];
}

/** Request body for {@link InStorePickupModule.setSgtinBulk}. */
export interface SetSgtinBulkRequest {
  /** Orders with SGTIN (Data Matrix) codes (max 1000). */
  orders: { orderId: number; sgtins: string[] }[];
}

/** Request body for {@link InStorePickupModule.setUinBulk}. */
export interface SetUinBulkRequest {
  /** Orders with UIN values (max 1000). */
  orders: { orderId: number; uin: string }[];
}

/** Request body for {@link InStorePickupModule.setImeiBulk}. */
export interface SetImeiBulkRequest {
  /** Orders with IMEI values (max 1000). */
  orders: { orderId: number; imei: string }[];
}

/** Request body for {@link InStorePickupModule.setGtinBulk}. */
export interface SetGtinBulkRequest {
  /** Orders with GTIN values (max 1000). */
  orders: { orderId: number; gtin: string }[];
}

/** Response from batch meta-set operations (sgtin/uin/imei/gtin). */
export interface SetMetaBulkResponse {
  /** Unique request ID. */
  requestId: string;
  /** Per-order results. */
  results: StatusSetResponse[];
}
