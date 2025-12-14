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
  data?: Record<string, never>;
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
  data?: Record<string, never>;
  message?: string;
}

/**
 * @example
```json
{
  "gtin": [
    "1234567890123456"
  ]
}
```
 */
export interface ApiGTINRequest {
  /** GTIN */
  gtin?: string;
}

/**
 * @example
```json
{
  "imei": [
    "123456789012345"
  ]
}
```
 */
export interface ApiIMEIRequest {
  /** IMEI */
  imei?: string;
}

export interface ApiNewOrder {
  /** Планируемая дата доставки */
  ddate?: string;
  /** Цена продавца в валюте продажи с учётом скидки продавца, без учёта скидки WB Клуба, умноженная на 100. Предоставляется в информационных целях */
  salePrice?: number;
  /** Список метаданных, доступных для сборочного задания */
  requiredMeta?: string[];
  /** Артикул продавца */
  article?: string;
  /** Уникальный ID заказа. <br> Примечание: поле `rid` — это поле `srid` в ответах методов: - [Заявки покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](./reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](./financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Дата и время создания сборочного задания */
  createdAt?: string;
  /** Адрес магазина (склада продавца), на который поступило сборочное задание */
  warehouseAddress?: string;
  /** Уникальный ID заказа покупателя */
  orderCode?: string;
  /** Режим оплаты: - `prepaid` — предоплатный - `postpaid` — постоплатный - `unknown` — неизвестный */
  payMode?: string;
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
  payMode?: string;
  /** Уникальный ID заказа. <br> Примечание: поле `rid` — это поле `srid` в ответах методов: - [Заявки покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](./reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](./financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Массив баркодов товара */
  skus?: string[];
  /** Адрес магазина (склада продавца), на который поступило сборочное задание */
  warehouseAddress?: string;
  /** ID склада продавца, на который поступило сборочное задание */
  warehouseId?: number;
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

/**
 * @example
```json
{
  "supplierStatus": "confirm",
  "wbStatus": "waiting",
  "id": 1234567
}
```
 */
export interface ApiOrderStatus {
  /** ID сборочного задания */
  id?: number;
  /** Статус сборочного задания, установленный продавцом */
  supplierStatus?: string;
  /** Статус сборочного задания в системе WB */
  wbStatus?: string;
}

export interface ApiOrderStatuses {
  /** Список статусов сборочных заданий */
  orders?: ApiOrderStatus[];
}

export interface ApiOrders {
  /** Параметр пагинации. Содержит значение, которое необходимо указать в запросе для получения следующего пакета данных */
  next?: number;
  /** Список сборочных заданий */
  orders?: ApiOrder[];
}

export interface ApiOrdersMeta {
  /** Метаданные сборочного задания */
  meta?: ApiBaseMeta;
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

/**
 * @example
```json
{
  "sgtins": [
    "1234567890123456"
  ]
}
```
 */
export interface ApiSGTINsRequest {
  /** Массив кодов маркировки. Допускается от 16 до 135 символов для кода одной маркировки */
  sgtins?: string[];
}

/**
 * @example
```json
{
  "uin": [
    "1234567890123456"
  ]
}
```
 */
export interface ApiUINRequest {
  /** УИН */
  uin?: string;
}

export interface ApiBaseMeta {
  /** GTIN */
  gtin?: {
  value?: string;
};
  /** IMEI */
  imei?: {
  value?: string;
};
  /** Код маркировки Честного знака */
  sgtin?: {
  value?: string[];
};
  /** УИН */
  uin?: {
  value?: string;
};
}