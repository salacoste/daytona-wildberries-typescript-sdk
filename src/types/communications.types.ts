/**
 * Auto-generated TypeScript types for communications module
 * Generated from: wildberries_api_doc/09-communications.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.797Z
 */

export interface StandardizedFQError {
  /** Заголовок ошибки */
  title?: string;
  /** Уникальный ID запроса */
  requestId?: string;
  /** ID внутреннего сервиса WB */
  origin?: string;
  /** Детали ошибки */
  detail?: string;
}

/**
 * Успешно
 */
export interface ResponseTemplate {
  data?: {
  templates?: {
  /** ID шаблона */
  id?: string;
  /** Название шаблона */
  name?: string;
  /** Текст шаблона */
  text?: string;
}[];
};
  /** Есть ли ошибка */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string[];
}

export interface PostTemplate {
  data?: {
  /** ID шаблона */
  id?: string;
};
  /** Есть ли ошибка */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string[];
}

export interface PatchDelResp {
  data?: boolean;
  /** Есть ли ошибка */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string[];
}

export interface ResponsefeedbackErr {
  data?: Record<string, never>;
  /** Есть ли ошибка */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: string[];
  requestId?: string;
}

/**
 * Массив отзывов
 */
export type ResponseFeedback = {
  /** ID отзыва */
  id?: string;
  /** Текст отзыва */
  text?: string;
  /** Достоинства товара */
  pros?: string;
  /** Недостатки товара */
  cons?: string;
  /** Оценка товара */
  productValuation?: number;
  /** Дата и время создания отзыва */
  createdDate?: string;
  /** Структура ответа */
  answer?: {
  /** Текст ответа */
  text?: string;
  /** Статус: - `none` — новый - `wbRu` — отображается на сайте - `reviewRequired` — ответ проходит проверку - `rejected` — ответ отклонён */
  state?: string;
  /** Можно ли отредактировать ответ: - `false` — нет - `true` — да */
  editable?: boolean;
};
  /** Статус отзыва: - `none` - не обработан (новый) - `wbRu` - обработан */
  state?: string;
  /** Информация о товаре */
  productDetails?: {
  /** Артикул WB */
  nmId?: number;
  /** ID карточки товара */
  imtId?: number;
  /** Название товара */
  productName?: string;
  /** Артикул продавца */
  supplierArticle?: string;
  /** Имя продавца */
  supplierName?: string;
  /** Бренд товара */
  brandName?: string;
  /** Размер товара (`techSize` в КТ) */
  size?: string;
};
  /** Массив структур фотографий */
  photoLinks?: {
  /** Адрес фотографии полного размера */
  fullSize?: string;
  /** Адрес фотографии маленького размера */
  miniSize?: string;
}[];
  /** Структура видео */
  video?: {
  /** Ссылка на обложку видео */
  previewImage?: string;
  /** Ссылка на файл плейлиста видео (доступно по протоколу HLS) */
  link?: string;
  /** Общая продолжительность видео */
  durationSec?: number;
};
  /** Просмотрен ли отзыв */
  wasViewed?: boolean;
  /** Имя автора отзыва */
  userName?: string;
  /** Соответствие заявленного размера реальному. <br>Возможные значения: - ` ` - для безразмерных товаров - `ок` - соответствует размеру - `smaller` - маломерит - `bigger` - большемерит */
  matchingSize?: string;
  /** Доступна ли продавцу возможность оставить жалобу на отзыв (`true` - доступна, `false` - не доступна) */
  isAbleSupplierFeedbackValuation?: boolean;
  /** Ключ причины жалобы на отзыв <br> (Значения см. в примерах ответа метода получения <a href="./user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get"> списков причин жалоб и проблем с товаром</a>, поле `feedbackValuations` ) */
  supplierFeedbackValuation?: number;
  /** Доступна ли продавцу возможность сообщить о проблеме с товаром: - `true` — да - `false` — нет */
  isAbleSupplierProductValuation?: boolean;
  /** Ключ проблемы с товаром <br> (Значения см. в примерах ответа метода получения [списков причин жалоб и проблем с товаром](./user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get), поле `supplierProductValuation`) */
  supplierProductValuation?: number;
  /** Опция возврата товара: - `true` — доступна - `false` — недоступна */
  isAbleReturnProductOrders?: boolean;
  /** Дата и время, когда на запрос возврата был получен ответ со статус-кодом 200. */
  returnProductOrdersDate?: string;
  /** Список тегов покупателя */
  bables?: string[];
  /** Штрихкод единицы товара */
  lastOrderShkId?: number;
  /** Дата покупки */
  lastOrderCreatedAt?: string;
  /** Цвет товара */
  color?: string;
  /** ID предмета */
  subjectId?: number;
  /** Название предмета */
  subjectName?: string;
  /** ID начального отзыва (`null`, если этот отзыв начальный) */
  parentFeedbackId?: string;
  /** ID дополненного отзыва (`null`, если этот отзыв дополненный) */
  childFeedbackId?: string;
}[];

/**
 * Информация о последнем сообщении в чате
 */
export interface LastMessage {
  /** Текст сообщения */
  text?: string;
  /** Время сообщения в формате Unix timestamp (миллисекунды) */
  addTimestamp?: number;
}

export interface Chat {
  /** ID чата */
  chatID?: string;
  /** Подпись чата. Требуется при [отправке сообщения](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) */
  replySign?: string;
  /** ID покупателя */
  clientID?: string;
  /** Имя покупателя */
  clientName?: string;
  goodCard?: GoodCard;
  lastMessage?: LastMessage;
}

export interface ChatsResponse {
  result?: Chat[];
  /** Ошибки, если есть */
  errors?: string[];
}

export interface Event {
  /** ID чата */
  chatID?: string;
  /** ID события */
  eventID?: string;
  eventType?: EventType;
  /** Признак нового чата: - `false` — чат не новый - `true` — чат новый */
  isNewChat?: boolean;
  /** Данные сообщения */
  message?: {
  attachments?: EventAttachments;
  /** Текст сообщения */
  text?: string;
};
  /** Источник отправки сообщения: - `seller-portal` — портал продавцов - `seller-public-api` — API Чата с покупателями - `rusite` — портал покупателей - `global` — портал `global.wildberries.ru` - `ios` — мобильная операционная система от **Apple** - `android` — операционная система **Android** от **Google** */
  source?: string;
  /** Время появления события на сервере. Формат Unix timestamp */
  addTimestamp?: number;
  /** Время появления события на сервере в UTC */
  addTime?: string;
  /** Подпись чата. Доступна только при `"isNewChat": true`. Требуется при [отправке сообщения](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) */
  replySign?: string;
  sender?: Sender;
  /** ID покупателя */
  clientID?: string;
  /** Имя покупателя */
  clientName?: string;
}

/**
 * Вложения
 */
export interface EventAttachments {
  goodCard?: GoodCard;
  /** Файлы */
  files?: File[];
  /** Изображения */
  images?: Image[];
}

/**
 * Тип события:
 * - `message` — сообщение
 * - `refund` — возврат (устаревший)
 */
export type EventType = 'message';

export interface File {
  /** Тип файла */
  contentType?: string;
  /** Дата загрузки файла */
  date?: string;
  /** ID файла. [Получить файл](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1download~1%7Bid%7D/get) */
  downloadID?: string;
  /** Название файла */
  name?: string;
  /** URL для получения файла */
  url?: string;
  /** Размер файла в байтах */
  size?: number;
}

/**
 * Информация о заказе
 */
export interface GoodCard {
  /** Дата заказа */
  date?: string;
  /** **Поле будет удалено 24 октября**.<br> Используйте отдельный метод для получения [заявок покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get). <br><br> Запрошен ли возврат товара: - `false` — не запрошен - `true` — запрошен */
  needRefund?: boolean;
  /** Артикул WB */
  nmID?: number;
  /** Фактическая цена с учетом всех скидок. Взимается с покупателя */
  price?: number;
  /** Валюта */
  priceCurrency?: string;
  /** Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](./user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](./reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](./reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](./financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Размер товара, соответствует `wbSize` в [карточке товара](./work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) */
  size?: string;
  /** Статус товара: - `0` — Товар активный - `1` — Товар оформлен - `2` — Товар собирается - `3` — Товар в пути - `4` — Товар ожидает в ПВЗ - `5` — Товар у курьера - `10` — Товар в архиве - `11` — Товар выкуплен - `12` — Товар отменён - `13` — Оформлен возврат - `14` — Товар отменён (нет на складе) */
  statusID?: number;
}

/**
 * Изображение
 */
export interface Image {
  /** Дата загрузки изображения */
  date?: string;
  /** ID файла. [Получить файл](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1download~1%7Bid%7D/get) */
  downloadID?: string;
  /** URL для получения изображения */
  url?: string;
}

export interface MessageResponse {
  /** Ошибки загрузки файлов, если есть */
  errors?: string[];
  result?: {
  /** Время загрузки */
  addTime?: number;
  /** ID чата */
  chatID?: string;
};
}

/**
 * Отправитель:
 * - `client` — покупатель
 * - `seller` — продавец
 * - `wb` — Wildberries
 */
export type Sender = 'client' | 'seller' | 'wb';

export interface EventsResponse {
  result?: EventsResult;
  /** Ошибки, если есть */
  errors?: string[];
}

export interface EventsResult {
  /** Пагинатор. Значение поля необходимо указать в запросе для получения следующего пакета данных. */
  next?: number;
  /** Время новейшего события в ответе */
  newestEventTime?: string;
  /** Время старейшего события в ответе */
  oldestEventTime?: string;
  /** Количество событий */
  totalEvents?: number;
  events?: Event[];
}