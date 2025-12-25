/**
 * Auto-generated TypeScript types for promotion module
 * Generated from: wildberries_api_doc/08-promotion.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-25T16:22:19.850Z
 */

export interface Response400 {
  error?: string;
}

/**
 * Места размещения:
 *  - `search` — поиск
 *  - `recommendation` — рекомендации
 *  - `combined` — поиск и рекомендации
 */
export type PlacementType = 'combined' | 'search' | 'recommendation';

export interface StandardizedBatchError {
  /** Детали ошибки */
  detail: string;
  /** ID внутреннего сервиса WB */
  origin: string;
  /** Уникальный ID запроса */
  request_id: string;
  /** HTTP статус-код */
  status: number;
  /** Заголовок ошибки */
  title: string;
}

/**
 * @example
```json
{
  "id": 760,
  "name": "Автомобильные товары",
  "cpm_min": 112
}
```
 */
export interface V0GetConfigCategoriesResponse {
  /** ID категории товара */
  id: number;
  /** Название категории товара */
  name: string;
  /** Минимально допустимая ставка */
  cpm_min: number;
}

export interface V0AdvertMultiBidItem {
  /** Артикул WB */
  nm: number;
  /** Ставка. Минимально допустимые ставки вы можете получить в ответе метода [получения минимальных ставок для карточек товаров](./promotion#tag/Sozdanie-kampanij/paths/~1adv~1v0~1bids~1min/post) */
  bid: number;
}

export interface V0AdvertMultibid {
  /** ID кампании */
  advert_id: number;
  /** Артикулы WB и ставки для них */
  nm_bids: V0AdvertMultiBidItem[];
}

export interface ResponseWithReturn {
  /** Размер обновлённого бюджета */
  total?: number;
}

export interface ResponseInfoAdvert {
  /** Дата завершения кампании */
  endTime?: string;
  /** Время создания кампании */
  createTime?: string;
  /** Время последнего изменения кампании */
  changeTime?: string;
  /** Дата последнего запуска кампании */
  startTime?: string;
  /** Название кампании */
  name?: string;
  /** Параметры кампании */
  params?: {
  /** Название предметной группы. Для кампаний в поиске и рекомендациях (**устаревшие типы кампаний**) */
  subjectName?: string;
  /** Флаг активности предметной группы: - `true` — активна - `false` — неактивна */
  active?: boolean;
  /** Временные интервалы показа кампании */
  intervals?: {
  /** Время начала показов */
  begin?: number;
  /** Время окончания показов */
  end?: number;
}[];
  /** Текущая ставка */
  price?: number;
  /** ID меню, где размещается кампания. Для кампаний в каталоге (**устаревший тип кампании**) */
  menuId?: number;
  /** ID предметной группы, для которой создана кампания. Для кампаний в поиске и рекомендациях (**устаревшие типы кампаний** */
  subjectId?: number;
  /** ID сочетания предмета и пола. Для кампаний в карточке товара (**устаревший тип кампании**) */
  setId?: number;
  /** Сочетание предмета и пола. Для кампаний в карточке товара (**устаревший тип кампании**) */
  setName?: string;
  /** Название меню, где размещается кампания. Для кампаний в каталоге (**устаревший тип кампании**) */
  menuName?: string;
  /** Массив карточек товаров кампании */
  nms?: {
  /** Артикул WB */
  nm?: number;
  /** Состояние карточки товара: - `true` — активна - `false` — неактивна */
  active?: boolean;
}[];
}[];
  /** Дневной бюджет. Если не установлен, то `0` */
  dailyBudget?: number;
  /** ID кампании */
  advertId?: number;
  /** Статус кампании: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе */
  status?: number;
  /** Тип кампании: - `4` — кампания в каталоге (**устаревший тип**) - `5` — кампания в карточке товара (**устаревший тип**) - `6` — кампания в поиске (**устаревший тип**) - `7` — кампания в рекомендациях на главной странице (**устаревший тип**) */
  type?: number;
  /** Модель оплаты: - `cpm` — за показы */
  paymentType?: string;
  /** Активность фиксированных фраз: - `false` — не активны - `true` — активны */
  searchPluseState?: boolean;
}

export interface ResponseInfoAdvertType8 {
  /** Дата завершения кампании */
  endTime?: string;
  /** Дата создания кампании */
  createTime?: string;
  /** Дата последнего изменения кампании */
  changeTime?: string;
  /** Дата последнего запуска кампании */
  startTime?: string;
  autoParams?: {
  /** Продвигаемый предмет */
  subject?: {
  /** ID предмета */
  id?: number;
  /** Название предмета */
  name?: string;
};
  /** Внутренняя (системная) сущность (пол + предмет) */
  sets?: {
  /** ID set */
  id?: number;
  /** Название set */
  name?: string;
}[];
  menus?: {
  /** ID меню */
  id?: number;
  /** Название меню */
  name?: string;
}[];
  /** Места размещения */
  active?: {
  /** Карточка товара - `false` — отключено - `true` — включено */
  carousel?: boolean;
  /** Рекомендации на главной - `false` — отключено - `true` — включено */
  recom?: boolean;
  /** Ручная ставка - `false` — отключено - `true` — включено */
  booster?: boolean;
};
  /** Ставки карточек товаров */
  nmCPM?: {
  /** Артикул WB */
  nm?: number;
  /** Ставка */
  cpm?: number;
}[];
  /** Артикулы WB */
  nms?: number[];
  /** Ставка, указанная при создании кампании.<br> Поле актуально только для кампаний, созданных через API. */
  cpm?: number;
};
  /** Название кампании */
  name?: string;
  /** Не используется */
  dailyBudget?: number;
  /** ID кампании */
  advertId?: number;
  /** Статус кампании: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе */
  status?: number;
  /** Тип кампании: - `8` — единая ставка */
  type?: number;
  /** Модель оплаты: - `cpm` — за показы */
  paymentType?: string;
}

export interface ResponseInfoAdvertType9 {
  /** Дата завершения кампании */
  endTime?: string;
  /** Дата создания кампании */
  createTime?: string;
  /** Дата последнего изменения кампании */
  changeTime?: string;
  /** Дата последнего запуска кампании */
  startTime?: string;
  /** Активность фиксированных фраз: - `false` — не активны - `true` — активны */
  searchPluseState?: boolean;
  /** Название кампании */
  name?: string;
  unitedParams?: {
  /** Продвигаемый предмет */
  subject?: {
  /** ID предмета */
  id?: number;
  /** Название предмета */
  name?: string;
};
  menus?: {
  /** ID меню */
  id?: number;
  /** Название меню */
  name?: string;
}[];
  /** Артикулы WB */
  nms?: number[];
  /** Ставка в поиске */
  searchCPM?: number;
  /** Ставка в Каталоге */
  catalogCPM?: number;
}[];
  /** Не используется */
  dailyBudget?: number;
  /** ID кампании */
  advertId?: number;
  /** Статус кампании: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе */
  status?: number;
  /** Тип кампании: - `9` — Ручная ставка */
  type?: number;
  /** Модель оплаты: - `cpm` — за показы */
  paymentType?: string;
  /** Ставки артикулов WB */
  auction_multibids?: {
  /** Артикул WB */
  nm?: number;
  /** Ставка */
  bid?: number;
}[];
}

export interface ResponseAdvError1 {
  error?: string;
}

export interface PromotionsGoodsList {
  /** Артикул WB */
  id?: number;
  /** Участвует в акции: - `true` — да - `false` — нет */
  inAction?: boolean;
  /** Текущая розничная цена */
  price?: number;
  /** Валюта в формате ISO 4217 */
  currencyCode?: string;
  /** Плановая цена (цена во время акции) */
  planPrice?: number;
  /** Текущая скидка */
  discount?: number;
  /** Рекомендуемая скидка для участия в акции */
  planDiscount?: number;
}

export interface GetAuctionAdverts {
  /** Кампании */
  adverts: {
  /** ID кампании */
  id: number;
  /** Настройки товаров */
  nm_settings: AuctionAdvertNMsSettings[];
  settings: AuctionAdvertSettings;
  /** Статус кампании: - `-1` — удалена, процесс удаления будет завершён в течение 10 минут - `4` — готова к запуску - `7` — завершена - `8` — отменена - `9` — активна - `11` — на паузе */
  status: -1 | 4 | 7 | 8 | 9 | 11;
  timestamps: Timestamps;
  /** Тип ставки: - `unified` — единая ставка - `manual` — ручная ставка */
  bid_type: string;
};
}

export interface AuctionAdvertNMsSettings {
  bids: AuctionAdvertBids;
  subject: AuctionAdvertSubject;
  /** Артикул WB */
  nm_id: number;
}

/**
 * Предмет
 */
export interface AuctionAdvertSubject {
  /** ID предмета */
  id: number;
  /** Название предмета */
  name: string;
}

/**
 * Ставки
 */
export interface AuctionAdvertBids {
  /** Ставка в поиске */
  search: number;
  /** Ставка в рекомендациях */
  recommendations: number;
}

/**
 * Настройки кампании
 */
export interface AuctionAdvertSettings {
  /** Тип оплаты: - `cpm` — за показы - `cpc` — за клик */
  payment_type: 'cpm' | 'cpc';
  /** Имя кампании */
  name: string;
  /** Места размещения */
  placements: {
  /** Размещение в поиске: - `false` — да - `true` — нет */
  search: boolean;
  /** Размещение в рекомендациях: - `false` — отключено - `true` — включено */
  recommendations: boolean;
};
}

/**
 * Временные отметки
 */
export interface Timestamps {
  /** Время создания кампании */
  created: string;
  /** Время последнего изменения кампании */
  updated: string;
  /** Время последнего запуска кампании */
  started: string;
  /** Время удаления кампании. Если кампания не удалена, время указывается в будущем */
  deleted: string;
}

export interface Response400 {
  /** Детали ошибки */
  detail: string;
  /** ID внутреннего сервиса WB */
  origin: string;
  /** Уникальный ID запроса */
  request_id: string;
  /** HTTP статус-код */
  status: number;
  /** Заголовок ошибки */
  title: string;
}

export interface StatInterval {
  /** Период */
  interval: {
  /** Начало периода */
  begin?: string;
  /** Конец периода */
  end?: string;
};
  /** Блок статистики */
  stats?: StatsBlok1[];
}

export interface StatDate {
  /** Даты, за которые нужно получить информацию */
  dates: string[];
  /** Блок статистики */
  stats?: StatsBlok2[];
}

export interface Stat {
  /** Блок статистики */
  stats?: StatsBlok1[];
}

export interface StatsBlok1 {
  /** ID баннера */
  item_id?: number;
  /** Бренд */
  item_name?: string;
  /** Название категории */
  category_name?: string;
  /** Тип медиакампании: - `1` — размещение по дням - `2` — размещение по просмотрам */
  advert_type?: number;
  /** Место на странице */
  place?: number;
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** CR(conversion rate) — это отношение количества заказов к общему количеству посещений медиакампании */
  cr?: number;
  /** CTR (click-through rate) — показатель кликабельности, отношение числа кликов к количеству показов в рамках медиакампании */
  ctr?: number;
  /** Время начала размещения */
  date_from?: string;
  /** Время завершения размещения */
  date_to?: string;
  /** Родительская категория предмета */
  subject_name?: string;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Количество заказов */
  orders?: number;
  /** Стоимость размещения */
  price?: number;
  /** (cost per click) — цена клика по продвигаемому товару */
  cpc?: number;
  /** Статус медиакампании */
  status?: number;
  daily_stats?: DailyStats1;
  /** Стоимость размещения баннера */
  expenses?: number;
  /** Отношение количества добавлений в корзину к количеству кликов */
  cr1?: number;
  /** Отношение количества заказов к количеству добавлений в корзину */
  cr2?: number;
}

export type DailyStats1 = {
  /** Дата */
  date?: string;
  /** Статистика по платформам */
  app_type_stats?: {
  /** Тип платформы: - `1` — сайт - `32` — Android - `64` — IOS */
  app_type?: number;
  stats?: Stats1;
}[];
}[];

export type Stats1 = {
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** CTR (click-through rate) — показатель кликабельности, отношение числа кликов к количеству показов в рамках медиакампании */
  ctr?: number;
}[];

export interface StatsBlok2 {
  /** ID баннера */
  item_id?: number;
  /** Бренд */
  item_name?: string;
  /** Название категории */
  category_name?: string;
  /** Тип медиакампании: - `1` — размещение по дням - `2` — размещение по просмотрам */
  advert_type?: number;
  /** Место на странице */
  place?: number;
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** CR(conversion rate) — это отношение количества заказов к общему количеству посещений медиакампании */
  cr?: number;
  /** CTR (click-through rate) — показатель кликабельности, отношение числа кликов к количеству показов в рамках медиакампании */
  ctr?: number;
  /** Время начала размещения */
  date_from?: string;
  /** Время завершения размещения */
  date_to?: string;
  /** Родительская категория предмета */
  subject_name?: string;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Количество заказов */
  orders?: number;
  /** Стоимость размещения */
  price?: number;
  /** (cost per click) — цена клика по продвигаемому товару */
  cpc?: number;
  /** Статус медиакампании */
  status?: number;
  daily_stats?: DailyStats2;
  /** Стоимость размещения баннера */
  expenses?: number;
  /** Отношение количества добавлений в корзину к количеству кликов */
  cr1?: number;
  /** Отношение количества заказов к количеству добавлений в корзину */
  cr2?: number;
}

export type DailyStats2 = {
  /** Дата */
  date?: string;
  /** Статистика по платформам */
  app_type_stats?: {
  /** Тип платформы: - `1` — сайт - `32` — Android - `64` — IOS */
  app_type?: number;
  stats?: Stats2;
}[];
}[];

export type Stats2 = {
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Количество заказов */
  orders?: number;
  /** CR(conversion rate) — отношение количества заказов к общему количеству посещений медиакампании */
  cr?: number;
  /** CTR (click-through rate) — показатель кликабельности, отношение числа кликов к количеству показов в рамках медиакампании */
  ctr?: number;
}[];

export interface RequestWithDate {
  /** ID кампании */
  id: number;
  /** Даты, за которые нужно получить информацию */
  dates: string[];
}

export interface RequestWithCampaignID {
  /** ID кампании */
  id: number;
}

export interface RequestWithInterval {
  /** ID кампании */
  id: number;
  /** Временной диапазон, за который необходимо выдать данные */
  interval: {
  /** Начало запрашиваемого периода */
  begin?: string;
  /** Конец запрашиваемого периода */
  end?: string;
};
}

/**
 * Статистка по дням
 */
export type Days = {
  /** Дата, за которую представлены данные */
  date?: string;
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** Показатель кликабельности, отношение числа кликов к количеству показов, % */
  ctr?: number;
  /** Средняя стоимость клика, ₽ */
  cpc?: number;
  /** Затраты, ₽ */
  sum?: number;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Количество заказов */
  orders?: number;
  /** CR(conversion rate) — отношение количества заказов к общему количеству посещений кампании */
  cr?: number;
  /** Количество заказанных товаров, шт. */
  shks?: number;
  /** Заказов на сумму, ₽ */
  sum_price?: number;
  /** Блок информации о платформе */
  apps?: {
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** Показатель кликабельности, отношение числа кликов к количеству показов, % */
  ctr?: number;
  /** Средняя стоимость клика, ₽ */
  cpc?: number;
  /** Затраты, ₽ */
  sum?: number;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Количество заказов */
  orders?: number;
  /** CR(conversion rate) — это отношение количества заказов к общему количеству посещений кампании */
  cr?: number;
  /** Количество заказанных товаров, шт. */
  shks?: number;
  /** Заказов на сумму, ₽ */
  sum_price?: number;
  /** Блок статистики по артикулам WB */
  nm?: {
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** Показатель кликабельности, отношение числа кликов к количеству показов, % */
  ctr?: number;
  /** Средняя стоимость клика, ₽ */
  cpc?: number;
  /** Затраты, ₽ */
  sum?: number;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Количество заказов */
  orders?: number;
  /** CR(conversion rate) — отношение количества заказов к общему количеству посещений кампании */
  cr?: number;
  /** Количество заказанных товаров, шт. */
  shks?: number;
  /** Заказов на сумму, ₽ */
  sum_price?: number;
  /** Название товара */
  name?: string;
  /** ID артикула WB */
  nmId?: number;
}[];
  /** Тип платформы (`1` — сайт, `32` — Android, `64` — IOS) */
  appType?: number;
}[];
}[];

/**
 * Статистика по средней позиции товара на страницах поисковой выдачи и каталога (для кампаний с единой ставкой)
 */
export type BoosterStats = {
  /** Дата, за которую предоставлены данные */
  date?: string;
  /** Артикул WB */
  nm?: number;
  /** Средняя позиция товара на страницах поисковой выдачи и каталога */
  avg_position?: number;
}[];

/**
 * Ответ при запросе с interval
 */
export type ResponseWithInterval = {
  /** Период */
  interval?: {
  /** Начало периода */
  begin?: string;
  /** Конец периода */
  end?: string;
};
  /** Количество просмотров. <br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  views?: number;
  /** Количество кликов.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  clicks?: number;
  /** Показатель кликабельности.<br> Отношение числа кликов к количеству показов. Выражается в процентах.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  ctr?: number;
  /** Средняя стоимость клика, ₽.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  cpc?: number;
  /** Затраты, ₽.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  sum?: number;
  /** Количество добавлений товаров в корзину.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  atbs?: number;
  /** Количество заказов.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  orders?: number;
  /** CR(conversion rate) — это отношение количества заказов к общему количеству посещений кампании.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  cr?: number;
  /** Количество заказанных товаров, шт.<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  shks?: number;
  /** Заказов на сумму, ₽<br> За все дни запрошенного диапазона, по всем артикулам WB и платформам */
  sum_price?: number;
  days?: Days;
  boosterStats?: BoosterStats;
  /** ID кампании */
  advertId?: number;
}[];

/**
 * Ответ при запросе с dates
 */
export type ResponseWithDate = {
  /** Даты, за которые нужно получить информацию */
  dates?: string[];
  /** Количество просмотров. <br> За все дни, по всем артикулам WB и платформам */
  views?: number;
  /** Количество кликов.<br> За все дни, по всем артикулам WB и платформам */
  clicks?: number;
  /** Показатель кликабельности.<br> Отношение числа кликов к количеству показов. Выражается в процентах<br> За все дни, по всем артикулам WB и платформам<br> */
  ctr?: number;
  /** Средняя стоимость клика, ₽.<br> За все дни, по всем артикулам WB и платформам */
  cpc?: number;
  /** Затраты, ₽.<br> За все дни, по всем артикулам WB и платформам */
  sum?: number;
  /** Количество добавлений товаров в корзину.<br> За все дни, по всем артикулам WB и платформам */
  atbs?: number;
  /** Количество заказов.<br> За все дни, по всем артикулам WB и платформам */
  orders?: number;
  /** CR(conversion rate) — это отношение количества заказов к общему количеству посещений кампании.<br> За все дни, по всем артикулам WB и платформам */
  cr?: number;
  /** Количество заказанных товаров, шт.<br> За все дни, по всем артикулам WB и платформам */
  shks?: number;
  /** Заказов на сумму, ₽.<br> За все дни, по всем артикулам WB и платформам */
  sum_price?: number;
  days?: Days;
  boosterStats?: BoosterStats;
  /** ID кампании */
  advertId?: number;
}[];

export interface V0KeywordsStatistic {
  /** Количество кликов */
  clicks: number;
  /** CTR (Click-Through Rate) — показатель кликабельности */
  ctr: number;
  /** Ключевая фраза */
  keyword: string;
  /** Сумма затрат по ключевой фразе */
  sum: number;
  /** Количество показов */
  views: number;
}

export interface V0KeywordsStatistics {
  /** Дата */
  date: string;
  stats: V0KeywordsStatistic[];
}

export interface V0KeywordsStatisticsResponse {
  keywords: V0KeywordsStatistics[];
}

export interface ErrorResponse {
  type: string;
  message: string;
}

/**
 * Статистика по кампаниям за период, указанный в запросе. По всем артикулам WB и платформам
 */
export type ResponseFullStats = FullStatsItem[];

/**
 * Статистика по одной кампании за период, указанный в запросе. По всем артикулам WB и платформам
 */
export interface FullStatsItem {
  /** ID кампании */
  advertId: number;
  /** Количество добавлений товаров в корзину */
  atbs: number;
  /** Статистика по бустеру */
  boosterStats?: BoosterStatsV3;
  /** Отмены, шт. */
  canceled: number;
  /** Количество кликов */
  clicks: number;
  /** Средняя стоимость клика, ₽ */
  cpc: number;
  /** CR (conversion rate) — отношение количества заказов к общему количеству кликов */
  cr: number;
  /** CTR (click-through rate) — отношение числа кликов к количеству показов в процентах */
  ctr: number;
  /** Статистика с разбивкой по дням */
  days: DaysV3;
  /** Количество заказов */
  orders: number;
  /** Количество заказанных товаров, шт. */
  shks: number;
  /** Затраты, ₽ */
  sum: number;
  /** Сумма заказов, ₽ */
  sum_price: number;
  /** Количество просмотров */
  views: number;
}

/**
 * Статистка по дням
 */
export type DaysV3 = unknown;

/**
 * Статистика по средней позиции товара (для кампаний с единой ставкой)
 */
export type BoosterStatsV3 = unknown;

/**
 * Ошибка
 */
export interface FullStatsError {
  /** Детали ошибки */
  detail: string;
  /** ID внутреннего сервиса WB */
  origin: string;
  /** ID запроса */
  request_id: string;
  /** HTTP статус-код */
  status: number;
  /** Заголовок ошибки */
  title: string;
}