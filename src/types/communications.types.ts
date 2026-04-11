/**
 * Auto-generated TypeScript types for communications module
 * Generated from: wildberries_api_doc/09-communications.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.797Z
 * Updated: 2026-02-06 - Added Pinned Reviews types from EPIC 36
 */

// ============================================================================
// Pinned Reviews Types (Закреплённые отзывы)
// ============================================================================

/**
 * Method for pinning reviews
 * - `subscription` - Jam subscription (подписка Джем)
 * - `tariff` - Tariff option (тарифная опция)
 */
export type ReviewPinMethod = 'subscription' | 'tariff';

/**
 * Location where review is pinned
 * - `nm` - Product card (карточка товара)
 * - `imt` - Group of merged product cards (группа объединённых карточек товаров)
 */
export type ReviewPinOn = 'nm' | 'imt';

/**
 * State of pinned review
 * - `pinned` - Review is pinned
 * - `unpinned` - Review is unpinned
 */
export type ReviewState = 'pinned' | 'unpinned';

/**
 * Cause for review being unpinned automatically
 */
export type UnpinnedCause =
  | 'sysTariffUnpinned' // Subscription or tariff option expired
  | 'sysLimitReached' // General subscription limit reached
  | 'sysNoratingUnpinned' // Review excluded from rating (deleted or banned)
  | 'sysAdditionalSlot'; // Maximum pinned reviews for card/group reached

/**
 * Error status codes for pinned reviews operations
 */
export type PinnedReviewErrorStatus =
  | 'feedbackNotFound'
  | 'itemNotFound'
  | 'feedbackMismatch'
  | 'itemNoImages'
  | 'feedbackExcluded'
  | 'imtNotDisplayed'
  | 'globalLimitReached'
  | 'unitLimitReached'
  | 'tariffRestriction'
  | 'subscriptionRestriction'
  | 'alreadyPinned'
  | 'bodyNotValid';

/**
 * Error details for pinned reviews operations
 */
export interface PinnedReviewError {
  /** Error status code */
  status: PinnedReviewErrorStatus;
  /** Error title */
  title: string;
  /** Error details */
  detail?: string;
  /** Request ID */
  requestId: string;
  /** Internal WB service ID */
  origin: string;
}

/**
 * Generic error response for pinned reviews API
 */
export interface RespondResultError {
  /** HTTP status code */
  status: number;
  /** Error title */
  title: string;
  /** Error details */
  detail?: string;
  /** Request ID */
  requestId: string;
  /** Internal WB service ID */
  origin: string;
}

/**
 * Request item for pinning a review
 */
export interface PinReviewItem {
  /**
   * Pin method
   * - `subscription` - Jam subscription
   * - `tariff` - Tariff option
   */
  pinMethod: ReviewPinMethod;
  /**
   * Pin location
   * - `nm` - Product card
   * - `imt` - Group of merged product cards
   */
  pinOn: ReviewPinOn;
  /** Review ID */
  feedbackId: string;
}

/**
 * Result item from pin operation
 */
export interface PinReviewItemResultData {
  /** Review ID */
  feedbackId: string;
  /** Pin operation ID (absent if pinning failed) */
  pinId?: number;
  /** Pin method */
  pinMethod: ReviewPinMethod;
  /** Pin location */
  pinOn: ReviewPinOn;
  /** Whether there are errors */
  isErrors: boolean;
  /** Error details if any */
  errors?: PinnedReviewError[];
}

/**
 * Detailed information about a pinned/unpinned review
 */
export interface PinnedReviewItemResult {
  /** Date and time of pin/unpin operation */
  changeStateAt: string;
  /** IMT ID for merged product cards */
  imtId: number;
  /** WB article number */
  nmId: number;
  /** Pin operation ID */
  pinId: number;
  /** Pin method */
  pinMethod: ReviewPinMethod;
  /** Pin location */
  pinOn: ReviewPinOn;
  /** Review ID */
  feedbackId: string;
  /** Review pin state */
  state: ReviewState;
  /** Cause for automatic unpinning (only for unpinned reviews) */
  unpinnedCause?: UnpinnedCause;
}

/**
 * Request body for pinning reviews (array of items, max 500)
 */
export type PinnedReviewsCreateRequest = PinReviewItem[];

/**
 * Response from pin reviews operation
 */
export interface PinnedReviewsCreateResponse {
  data: PinReviewItemResultData[];
}

/**
 * Request body for unpinning reviews (array of pin IDs, max 500)
 */
export type PinnedReviewsDeleteRequest = number[];

/**
 * Response from unpin reviews operation
 */
export interface PinnedReviewsDeleteResponse {
  /** Array of successfully unpinned pin IDs */
  data: number[];
}

/**
 * Parameters for listing pinned/unpinned reviews
 */
export interface PinnedReviewsListParams {
  /** Filter by pin state */
  state?: ReviewState;
  /** Filter by pin location */
  pinOn?: ReviewPinOn;
  /** Filter by IMT ID */
  imtId?: number;
  /** Filter by WB article number */
  nmId?: number;
  /** Filter by review ID */
  feedbackId?: number;
  /** Start date for filtering (ISO 8601 format) */
  dateFrom?: string;
  /** End date for filtering (ISO 8601 format) */
  dateTo?: string;
  /** Pagination cursor (last pin operation ID) */
  next?: number;
  /** Number of reviews per page (max 500, default 500) */
  limit?: number;
  /** Index signature for compatibility with Record<string, unknown> */
  [key: string]: unknown;
}

/**
 * Response from list pinned/unpinned reviews
 */
export interface PinnedReviewsListResponse {
  /** Array of pinned/unpinned review items */
  data: PinnedReviewItemResult[];
  /** Pagination cursor for next page (absent if all data received) */
  next?: number;
}

/**
 * Parameters for counting pinned/unpinned reviews
 */
export interface PinnedReviewsCountParams {
  /** Filter by pin state */
  state?: ReviewState;
  /** Filter by pin location */
  pinOn?: ReviewPinOn;
  /** Filter by IMT ID */
  imtId?: number;
  /** Filter by WB article number */
  nmId?: number;
  /** Filter by review ID */
  feedbackId?: number;
  /** Start date for filtering (ISO 8601 format) */
  dateFrom?: string;
  /** End date for filtering (ISO 8601 format) */
  dateTo?: string;
  /** Index signature for compatibility with Record<string, unknown> */
  [key: string]: unknown;
}

/**
 * Response from count pinned/unpinned reviews
 */
export interface PinnedReviewsCountResponse {
  /** Number of reviews matching the filter */
  data: number;
}

/**
 * Seller limit details for pinned reviews
 */
export interface SellerLimit {
  /** Max pinned reviews per product card or merged group */
  perUnitLimit: number;
  /** Remaining pinnable reviews */
  remaining: number;
  /** Total pin limit */
  totalLimit: number;
  /** Whether pinning is unlimited */
  unlimited: boolean;
  /** Current number of pinned reviews */
  used: number;
}

/**
 * Seller limits data for subscription and tariff
 */
export interface SellerLimitsData {
  /** Subscription limits (null if no active subscription) */
  subscription: SellerLimit | null;
  /** Tariff limits (null if no active tariff option) */
  tariff: SellerLimit | null;
}

/**
 * Response from get pinned reviews limits
 */
export interface PinnedReviewsLimitsResponse {
  data: SellerLimitsData;
}

// ============================================================================
// Original Communications Types
// ============================================================================

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
  /** Ключ причины жалобы на отзыв <br> (Значения см. в примерах ответа метода получения <a href="https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get"> списков причин жалоб и проблем с товаром</a>, поле `feedbackValuations` ) */
  supplierFeedbackValuation?: number;
  /** Доступна ли продавцу возможность сообщить о проблеме с товаром: - `true` — да - `false` — нет */
  isAbleSupplierProductValuation?: boolean;
  /** Ключ проблемы с товаром <br> (Значения см. в примерах ответа метода получения [списков причин жалоб и проблем с товаром](https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get), поле `supplierProductValuation`) */
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
  /** Подпись чата. Требуется при [отправке сообщения](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) */
  replySign?: string;
  /**
   * ID покупателя
   * @deprecated This field will be removed on February 2. See https://dev.wildberries.ru/release-notes?id=466
   */
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
  /** Подпись чата. Доступна только при `"isNewChat": true`. Требуется при [отправке сообщения](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) */
  replySign?: string;
  sender?: Sender;
  /**
   * ID покупателя
   * @deprecated This field will be removed on February 2. See https://dev.wildberries.ru/release-notes?id=466
   */
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
  /** ID файла. [Получить файл](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1download~1%7Bid%7D/get) */
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
  /**
   * Запрошен ли возврат товара
   * @deprecated This field has been removed. Use the claims endpoint instead: /api/v1/claims
   */
  needRefund?: boolean;
  /** Артикул WB */
  nmID?: number;
  /** Фактическая цена с учетом всех скидок. Взимается с покупателя */
  price?: number;
  /** Валюта */
  priceCurrency?: string;
  /** Уникальный ID заказа. <br> Примечание: `rid` — это `srid` в ответах методов: - [Заявки покупателей на возврат](https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) - [Заказы](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1orders/get) - [Продажи](https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty/paths/~1api~1v1~1supplier~1sales/get) - [Отчет о возвратах и перемещении товаров](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov) - [Отчет о продажах по реализации](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get) */
  rid?: string;
  /** Размер товара, соответствует `wbSize` в [карточке товара](https://dev.wildberries.ru/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) */
  size?: string;
  /**
   * Статус товара
   * @deprecated This field will be removed on February 10. See https://dev.wildberries.ru/release-notes?id=469
   */
  statusID?: number;
}

/**
 * Изображение
 */
export interface Image {
  /** Дата загрузки изображения */
  date?: string;
  /** ID файла. [Получить файл](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1download~1%7Bid%7D/get) */
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

// ============================================================================
// Feedback and Questions Response Types
// ============================================================================

/**
 * Response from the feedbacks() method - list of feedbacks
 */
export interface FeedbackListResponse {
  data?: {
    /** Count of unanswered feedbacks */
    countUnanswered?: number;
    /** Count of archived feedbacks */
    countArchive?: number;
    /** Array of feedback items */
    feedbacks?: ResponseFeedback;
  };
  /** Whether there was an error */
  error?: boolean;
  /** Error description */
  errorText?: string;
  /** Additional errors */
  additionalErrors?: string[];
}

/**
 * Response from the newFeedbacksQuestions() method - check for new feedbacks/questions
 */
export interface NewFeedbacksQuestionsResponse {
  data?: {
    /** Whether there are new questions */
    hasNewQuestions?: boolean;
    /** Whether there are new feedbacks */
    hasNewFeedbacks?: boolean;
  };
  /** Whether there was an error */
  error?: boolean;
  /** Error description */
  errorText?: string;
  /** Additional errors */
  additionalErrors?: string[];
}
