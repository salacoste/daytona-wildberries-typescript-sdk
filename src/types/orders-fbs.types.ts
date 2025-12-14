/**
 * Auto-generated TypeScript types for orders-fbs module
 * Generated from: wildberries_api_doc/03-orders-fbs.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.780Z
 */

/**
 * Данные о складе, для которого требуется пропуск
 */
export interface PassOffice {
  /** Название */
  name?: string;
  /** Адрес */
  address?: string;
  /** ID */
  id?: number;
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
 * Параметр пагинации. Содержит значение, которое необходимо указать в запросе для получения следующего пакета данных
 *
 * @example
```json
13833711
```
 */
export type Next = number;

export interface Order {
  /** Точный адрес покупателя для доставки, если применимо. Из-за особенностей адреса некоторые поля могут быть пустыми */
  address?: {
  /** Адрес доставки */
  fullAddress?: string;
  /** Долгота */
  longitude?: number;
  /** Широта */
  latitude?: number;
};
  /** Цена приёмки в копейках. Отображается после фактической приёмки заказа */
  scanPrice?: number;
  /** Тип доставки: - `fbs` — доставка на склад Wildberries (FBS) */
  deliveryType?: 'fbs';
  /** ID поставки. Возвращается, если заказ закреплён за поставкой */
  supplyId?: string;
  /** ID транзакции для группировки сборочных заданий. Сборочные задания в одной корзине покупателя будут иметь одинаковый `orderUid` */
  orderUid?: string;
  /** Артикул продавца */
  article?: string;
  /** Код цвета (только для колеруемых товаров) */
  colorCode?: string;
  /** Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](./reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](./financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Дата создания сборочного задания (RFC3339) */
  createdAt?: string;
  /** Список офисов, куда следует привезти товар */
  offices?: string[];
  /** Список баркодов */
  skus?: string[];
  /** ID сборочного задания */
  id?: number;
  /** ID склада продавца, на который поступило сборочное задание */
  warehouseId?: number;
  /** ID склада WB, к которому привязан склад продавца */
  officeId?: number;
  /** Артикул WB */
  nmId?: number;
  /** ID размера товара в системе WB */
  chrtId?: number;
  /** Цена в валюте продажи с учётом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи — в поле `currencyCode`. Предоставляется в информационных целях */
  price?: number;
  /** Цена в валюте страны продавца с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Предоставляется в информационных целях */
  convertedPrice?: number;
  /** Код валюты продажи */
  currencyCode?: number;
  /** Код валюты страны продавца */
  convertedCurrencyCode?: number;
  /** Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) */
  cargoType?: 1 | 2 | 3;
  /** Комментарий покупателя */
  comment?: string;
  /** Признак заказа товара с нулевым остатком: - `false` — заказ сделан на товар с ненулевым остатком - `true` — заказ сделан на товар с нулевым остатком. Такой заказ можно отменить без штрафа за отмену */
  isZeroOrder?: boolean;
  /** Опции заказа */
  options?: {
  /** Признак B2B-продажи: - `false` — не B2B-продажа - `true` — B2B-продажа */
  isB2b?: boolean;
};
}

export interface Supply {
  /** ID поставки */
  id?: string;
  /** Флаг закрытия поставки: - `true` — закрыта - `false` — открыта */
  done?: boolean;
  /** Дата создания поставки (RFC3339) */
  createdAt?: string;
  /** Дата закрытия поставки (RFC3339) */
  closedAt?: string;
  /** Дата скана поставки (RFC3339) */
  scanDt?: string;
  /** Наименование поставки */
  name?: string;
  /** Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) */
  cargoType?: 0 | 1 | 2 | 3;
  /** ID склада назначения поставки. Если `null`, склад назначения не указан */
  destinationOfficeId?: number;
}

export interface OrderNew {
  /** Точный адрес покупателя для доставки, если применимо. Из-за особенностей адреса некоторые поля могут быть пустыми */
  address?: {
  /** Адрес доставки */
  fullAddress?: string;
  /** Долгота */
  longitude?: number;
  /** Широта */
  latitude?: number;
};
  /** Планируемая дата доставки.<br> Поле отображается для сборочных заданий со сверхгабаритными товарами `СГТ`, `cargoType: 2`. */
  ddate?: string;
  /** Цена продавца в валюте продажи с учётом скидки продавца, без учёта скидки WB Клуба, умноженная на 100. Предоставляется в информационных целях */
  salePrice?: number;
  /** Список метаданных, которые необходимо добавить в сборочное задание. <br> На данный момент обязательными к добавлению являются UIN и IMEI при их наличии в перечне */
  requiredMeta?: string[];
  /** Тип доставки: - `fbs` — доставка на склад Wildberries (FBS) */
  deliveryType?: 'fbs';
  /** Комментарий покупателя */
  comment?: string;
  /** Цена приёмки в копейках. Отображается после фактической приёмки заказа. Для данного метода всегда будет возвращаться `null`. Предоставляется в информационных целях */
  scanPrice?: number;
  /** ID транзакции для группировки сборочных заданий. Сборочные задания в одной корзине покупателя будут иметь одинаковый `orderUid` */
  orderUid?: string;
  /** Артикул продавца */
  article?: string;
  /** Код цвета (только для колеруемых товаров) */
  colorCode?: string;
  /** Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](./reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](./financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Дата создания сборочного задания (RFC3339) */
  createdAt?: string;
  /** Список офисов, куда следует привезти товар */
  offices?: string[];
  /** Список баркодов */
  skus?: string[];
  /** ID сборочного задания */
  id?: number;
  /** ID склада продавца, на который поступило сборочное задание */
  warehouseId?: number;
  /** ID склада WB, к которому привязан склад продавца */
  officeId?: number;
  /** Артикул WB */
  nmId?: number;
  /** ID размера товара в системе WB */
  chrtId?: number;
  /** Цена в валюте продажи с учётом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи — в поле `currencyCode`. Предоставляется в информационных целях */
  price?: number;
  /** Cумма к оплате покупателем в валюте продажи с учетом всех скидок, умноженная на 100. Код валюты продажи указан в поле `currencyCode`. Предоставляется в информационных целях */
  finalPrice?: number;
  /** Цена в валюте страны продавца с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Предоставляется в информационных целях */
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
  /** Признак B2B-продажи: - `false` — не B2B-продажа - `true` — B2B-продажа */
  isB2b?: boolean;
};
}

export interface SupplyOrder {
  /** Цена приёмки в копейках. Отображается после фактической приёмки заказа. Для данного метода всегда будет возвращаться `null`. Предоставляется в информационных целях */
  scanPrice?: number;
  /** ID транзакции для группировки сборочных заданий. Сборочные задания в одной корзине покупателя будут иметь одинаковый `orderUid` */
  orderUid?: string;
  /** Артикул продавца */
  article?: string;
  /** Код цвета (только для колеруемых товаров) */
  colorCode?: string;
  /** Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](./reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](./financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Дата создания сборочного задания (RFC3339) */
  createdAt?: string;
  /** Список офисов, куда следует привезти товар */
  offices?: string[];
  /** Список баркодов */
  skus?: string[];
  /** ID сборочного задания */
  id?: number;
  /** ID склада продавца, на который поступило сборочное задание */
  warehouseId?: number;
  /** Артикул WB */
  nmId?: number;
  /** ID размера товара в системе WB */
  chrtId?: number;
  /** Цена в валюте продажи с учётом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Код валюты продажи — в поле `currencyCode`. Предоставляется в информационных целях */
  price?: number;
  /** Цена в валюте страны продавца с учетом всех скидок, кроме скидки по WB Кошельку, умноженная на 100. Предоставляется в информационных целях */
  convertedPrice?: number;
  /** Код валюты продажи */
  currencyCode?: number;
  /** Код валюты страны продавца */
  convertedCurrencyCode?: number;
  /** Тип товара: - `1` — малогабаритный товар (МГТ) - `2` — сверхгабаритный товар (СГТ) - `3` — крупногабаритный товар (КГТ+) */
  cargoType?: 1 | 2 | 3;
  /** Признак заказа товара с нулевым остатком: - `false` — заказ сделан на товар с ненулевым остатком - `true` — заказ сделан на товар с нулевым остатком. Такой заказ можно отменить без штрафа за отмену */
  isZeroOrder?: boolean;
}

export interface SupplyTrbx {
  /** ID короба */
  id?: string;
}

export interface TrbxStickers {
  /** Закодированное значение стикера */
  barcode?: string;
  /** Полное представление стикера в заданном формате (кодировка base64) */
  file?: string;
}

/**
 * Метаданные сборочного задания
 */
export interface Meta {
  /** IMEI */
  imei?: {
  value?: string;
};
  /** УИН */
  uin?: {
  value?: string;
};
  /** GTIN */
  gtin?: {
  value?: string;
};
  /** Код маркировки Честного знака */
  sgtin?: {
  value?: string[];
};
  /** Срок годности товара */
  expiration?: {
  value?: string;
};
}

/**
 * Данные о пропуске продавца
 */
export interface Pass {
  /** Имя водителя */
  firstName?: string;
  /** Дата окончания действия пропуска */
  dateEnd?: string;
  /** Фамилия водителя */
  lastName?: string;
  /** Марка машины */
  carModel?: string;
  /** Номер машины */
  carNumber?: string;
  /** Название склада */
  officeName?: string;
  /** Адрес склада */
  officeAddress?: string;
  /** ID склада */
  officeId?: number;
  /** ID пропуска */
  id?: number;
}

export interface CrossborderTurkeyClientInfo {
  /** Имя клиента */
  firstName?: string;
  /** Фамилия, Имя, Отчество */
  fullName?: string;
  /** Фамилия клиента */
  lastName?: string;
  /** Отчество клиента */
  middleName?: string;
  /** Номер заказа */
  orderID?: number;
  /** Телефон для связи с клиентом */
  phone?: string;
  /** Не используется */
  phoneCode?: string;
}

export interface CrossborderTurkeyClientInfoResp {
  /** Информация по клиенту для кроссбордер-заказа из Турции */
  orders?: CrossborderTurkeyClientInfo[];
}

/**
 * @example
```json
{
  "orders": [
    987654321,
    123456789
  ]
}
```
 */
export interface OrdersRequestAPI {
  /** Список заказов */
  orders?: number[];
}