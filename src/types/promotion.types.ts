/**
 * Auto-generated TypeScript types for promotion module
 * Generated from: wildberries_api_doc/08-promotion.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-25T16:51:03.204Z
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
 * Статистка по дням (V3)
 */
export type DaysV3 = DaysV3Item[];

/**
 * Элемент статистики по дням (V3)
 */
export interface DaysV3Item {
  /** Дата, за которую представлены данные */
  date: string;
  /** Количество просмотров */
  views: number;
  /** Количество кликов */
  clicks: number;
  /** CTR (click-through rate) — отношение числа кликов к количеству показов в процентах */
  ctr: number;
  /** Средняя стоимость клика, ₽ */
  cpc: number;
  /** Затраты, ₽ */
  sum: number;
  /** Количество добавлений товаров в корзину */
  atbs: number;
  /** Количество заказов */
  orders: number;
  /** CR (conversion rate) — отношение количества заказов к общему количеству посещений кампании */
  cr: number;
  /** Количество заказанных товаров, шт. */
  shks: number;
  /** Заказов на сумму, ₽ */
  sum_price: number;
  /** Отмены, шт. */
  canceled: number;
  /** Блок информации о платформе */
  apps: DaysV3AppItem[];
}

/**
 * Элемент статистики по платформе (V3)
 */
export interface DaysV3AppItem {
  /** Тип платформы: 1 — сайт, 32 — Android, 64 — IOS */
  appType: 1 | 32 | 64;
  /** Количество просмотров */
  views: number;
  /** Количество кликов */
  clicks: number;
  /** CTR (click-through rate) — отношение числа кликов к количеству показов в процентах */
  ctr: number;
  /** Средняя стоимость клика, ₽ */
  cpc: number;
  /** Затраты, ₽ */
  sum: number;
  /** Количество добавлений товаров в корзину */
  atbs: number;
  /** Количество заказов */
  orders: number;
  /** CR (conversion rate) — отношение количества заказов к общему количеству кликов */
  cr: number;
  /** Количество заказанных товаров, шт. */
  shks: number;
  /** Заказов на сумму, ₽ */
  sum_price: number;
  /** Отмены, шт. */
  canceled: number;
  /** Блок статистики по артикулам WB */
  nms: DaysV3NmItem[];
}

/**
 * Элемент статистики по артикулу WB (V3)
 */
export interface DaysV3NmItem {
  /** Артикул WB */
  nmId: number;
  /** Название товара */
  name: string;
  /** Количество просмотров */
  views: number;
  /** Количество кликов */
  clicks: number;
  /** CTR (click-through rate) — отношение числа кликов к количеству показов в процентах */
  ctr: number;
  /** Средняя стоимость клика, ₽ */
  cpc: number;
  /** Затраты, ₽ */
  sum: number;
  /** Количество добавлений товаров в корзину */
  atbs: number;
  /** Количество заказов */
  orders: number;
  /** CR (conversion rate) — отношение количества заказов к общему количеству кликов */
  cr: number;
  /** Количество заказанных товаров, шт. */
  shks: number;
  /** Заказов на сумму, ₽ */
  sum_price: number;
  /** Отмены, шт. */
  canceled: number;
}

/**
 * Статистика по средней позиции товара (для кампаний с единой ставкой) (V3)
 */
export type BoosterStatsV3 = BoosterStatsV3Item[];

/**
 * Элемент статистики по средней позиции товара (V3)
 */
export interface BoosterStatsV3Item {
  /** Дата, за которую предоставлены данные */
  date: string;
  /** Артикул WB */
  nm: number;
  /** Средняя позиция товара */
  avg_position: number;
}

// ============================================================================
// NormQuery (Search Cluster) Types
// ============================================================================

/**
 * Запрос статистики по поисковым кластерам
 */
export interface V0GetNormQueryStatsRequest {
  /** Дата начала периода */
  from: string;
  /** Дата окончания периода */
  to: string;
  /** Массив элементов запроса (макс. 100) */
  items: V0GetNormQueryStatsRequestItem[];
}

/**
 * Элемент запроса статистики по поисковым кластерам
 */
export interface V0GetNormQueryStatsRequestItem {
  /** ID кампании */
  advert_id: number;
  /** Артикул WB */
  nm_id: number;
}

/**
 * Статистика по поисковым кластерам
 */
export interface V0GetNormQueryStatsResponse {
  /** Статистика */
  stats: V0GetNormQueryStatsItem[];
}

/**
 * Элемент статистики по поисковым кластерам
 */
export interface V0GetNormQueryStatsItem {
  /** ID кампании */
  advert_id: number;
  /** Артикул WB */
  nm_id: number;
  /** Статистика по поисковым кластерам */
  stats?: V0GetNormQueryStatsItemStat[];
}

/**
 * Статистика по конкретному поисковому кластеру
 */
export interface V0GetNormQueryStatsItemStat {
  /** Поисковый кластер */
  norm_query?: string;
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Количество заказов */
  orders?: number;
  /** Кликабельность — отношение числа кликов к количеству показов, % */
  ctr?: number;
  /** Стоимость одного клика, ₽ */
  cpc?: number;
  /** Средняя стоимость за тысячу показов, ₽ */
  cpm?: number;
  /** Средняя позиция товара на страницах поисковой выдачи */
  avg_pos?: number;
}

/**
 * Запрос на установку ставок для поисковых кластеров
 */
export interface V0SetNormQueryBidsRequest {
  /** Массив ставок (макс. 100) */
  bids: V0SetNormQueryBidsRequestItem[];
}

/**
 * Элемент запроса на установку ставки
 */
export interface V0SetNormQueryBidsRequestItem {
  /** ID кампании */
  advert_id: number;
  /** Артикул WB */
  nm_id: number;
  /** Поисковый кластер */
  norm_query: string;
  /** Ставка за тысячу показов, ₽ */
  bid: number;
}

/**
 * Запрос на получение ставок поисковых кластеров
 */
export interface V0GetNormQueryBidsRequest {
  /** Массив элементов запроса (макс. 100) */
  items: V0GetNormQueryBidsRequestItem[];
}

/**
 * Элемент запроса на получение ставок
 */
export interface V0GetNormQueryBidsRequestItem {
  /** ID кампании */
  advert_id: number;
  /** Артикул WB */
  nm_id: number;
}

/**
 * Ответ со списком ставок поисковых кластеров
 */
export interface V0GetNormQueryBidsResponse {
  /** Массив ставок */
  bids: V0GetNormQueryBidsItem[];
}

/**
 * Элемент ставки поискового кластера
 */
export interface V0GetNormQueryBidsItem {
  /** ID кампании */
  advert_id: number;
  /** Артикул WB */
  nm_id: number;
  /** Поисковый кластер */
  norm_query: string;
  /** Текущая ставка за тысячу показов, ₽ */
  bid: number;
}

/**
 * Запрос на установку/удаление минус-фраз
 */
export interface V0SetMinusNormQueryRequest {
  /** ID кампании */
  advert_id: number;
  /** Артикул WB */
  nm_id: number;
  /** Поисковые кластеры (минус-фразы, макс. 1000). Пустой массив удаляет все минус-фразы */
  norm_queries: string[];
}

/**
 * Запрос на получение минус-фраз
 */
export interface V0GetNormQueryMinusRequest {
  /** Массив элементов запроса (макс. 100) */
  items: V0GetNormQueryMinusRequestItem[];
}

/**
 * Элемент запроса на получение минус-фраз
 */
export interface V0GetNormQueryMinusRequestItem {
  /** ID кампании */
  advert_id: number;
  /** Артикул WB */
  nm_id: number;
}

/**
 * Ответ со списком минус-фраз
 */
export interface V0GetNormQueryMinusResponse {
  /** Массив элементов */
  items: V0GetNormQueryMinusResponseItem[];
}

/**
 * Элемент ответа со списком минус-фраз
 */
export interface V0GetNormQueryMinusResponseItem {
  /** ID кампании */
  advert_id: number;
  /** Артикул WB */
  nm_id: number;
  /** Список минус-фраз */
  norm_queries?: string[];
}

// ============================================================================
// GetAdverts Types (Non-Auction with Kopecks)
// ============================================================================

/**
 * Ответ со списком кампаний (с ставками в копейках)
 */
export interface GetAdverts {
  /** Кампании */
  adverts: GetAdvertsItem[];
}

/**
 * Элемент списка кампаний
 */
export interface GetAdvertsItem {
  /** ID кампании */
  id: number;
  /** Настройки товаров */
  nm_settings: AdvertNMsSettings[];
  /** Настройки кампании */
  settings: AdvertSettings;
  /** Статус кампании */
  status: -1 | 4 | 7 | 8 | 9 | 11;
  /** Временные отметки */
  timestamps: Timestamps;
  /** Тип ставки: unified — единая ставка, manual — ручная ставка */
  bid_type: string;
}

/**
 * Настройки товаров кампании (с ставками в копейках)
 */
export interface AdvertNMsSettings {
  /** Ставки в копейках */
  bids_kopecks: AdvertBidsKopecks;
  /** Предмет */
  subject: AdvertSubject;
  /** Артикул WB */
  nm_id: number;
}

/**
 * Ставки в копейках
 */
export interface AdvertBidsKopecks {
  /** Ставка в поиске */
  search: number;
  /** Ставка в рекомендациях */
  recommendations: number;
}

/**
 * Предмет (для кампаний с копейками)
 */
export interface AdvertSubject {
  /** ID предмета */
  id: number;
  /** Название предмета */
  name: string;
}

/**
 * Настройки кампании
 */
export interface AdvertSettings {
  /** Тип оплаты: cpm — за показы, cpc — за клик */
  payment_type: 'cpm' | 'cpc';
  /** Название кампании */
  name: string;
  /** Места размещения */
  placements: AdvertPlacements;
}

/**
 * Места размещения кампании
 */
export interface AdvertPlacements {
  /** Размещение в поиске */
  search: boolean;
  /** Размещение в рекомендациях */
  recommendations: boolean;
}

// ============================================================================
// Promotion Calendar Types
// ============================================================================

/**
 * Данные ответа списка акций
 */
export interface PromotionsListResponseData {
  /** Список акций */
  promotions: PromotionItem[];
}

/**
 * Элемент акции
 */
export interface PromotionItem {
  /** ID акции */
  id: number;
  /** Название акции */
  name: string;
  /** Начало акции */
  startDateTime: string;
  /** Конец акции */
  endDateTime: string;
  /** Тип акции: regular — акция, auto — автоакция */
  type: 'regular' | 'auto';
}

/**
 * Детальная информация об акции
 */
export interface PromotionDetailItem {
  /** ID акции */
  id: number;
  /** Название акции */
  name: string;
  /** Описание акции */
  description?: string;
  /** Преимущества акции */
  advantages?: string[];
  /** Начало акции */
  startDateTime: string;
  /** Конец акции */
  endDateTime: string;
  /** Количество товаров с остатками, участвующих в акции */
  inPromoActionLeftovers?: number;
  /** Общее количество товаров, участвующих в акции */
  inPromoActionTotal?: number;
  /** Количество товаров с остатками, не участвующих в акции */
  notInPromoActionLeftovers?: number;
  /** Общее количество товаров, не участвующих в акции */
  notInPromoActionTotal?: number;
  /** Уже участвующие в акции товары, % */
  participationPercentage?: number;
  /** Тип акции: regular — акция, auto — автоакция */
  type: 'regular' | 'auto';
  /** Количество товаров, исключенных из автоакции до её старта */
  exceptionProductsCount?: number;
  /** Ранжирование (если подключено) */
  ranging?: PromotionRangingItem[];
}

/**
 * Элемент ранжирования
 */
export interface PromotionRangingItem {
  /** Тип ранжирования */
  condition: 'productsInPromotion' | 'calculateProducts' | 'allProducts';
  /** Количество товаров продавца для перехода на следующий уровень ранжирования, % */
  participationRate: number;
  /** Текущий уровень поднятия в поиске, % */
  boost: number;
}

/**
 * Запрос на добавление товаров в акцию
 */
export interface PromotionSupplierTaskRequestData {
  /** ID акции */
  promotionID: number;
  /** Установить скидку: true — сейчас, false — в момент старта акции */
  uploadNow: boolean;
  /** Артикулы WB, которые можно добавить в акцию (макс. 1000) */
  nomenclatures: number[];
}

/**
 * Ответ на запрос добавления товаров в акцию
 */
export interface PromotionUploadResponseData {
  /** Загрузка с такими данными уже существует */
  alreadyExists: boolean;
  /** ID загрузки */
  uploadID: number;
}

// ============================================================================
// Auto Campaign Stat Words Types (deprecated)
// ============================================================================

/**
 * Ответ статистики по кластерам фраз для кампании с единой ставкой
 */
export interface AutoStatWordsResponse {
  /** Исключения (минус-фразы) для товаров из кампании */
  excluded?: string[];
  /** Кластеры ключевых фраз */
  clusters?: AutoStatWordsCluster[];
}

/**
 * Кластер ключевых фраз
 */
export interface AutoStatWordsCluster {
  /** Кластер — набор похожих ключевых фраз */
  cluster: string;
  /** Сколько раз товары показывались по всем фразам из кластера */
  count: number;
  /** Ключевые фразы из кластера, по которым товары показывались хотя бы один раз */
  keywords: string[];
}

// ============================================================================
// Manual Campaign Stat Words Types (deprecated)
// ============================================================================

/**
 * Ответ статистики по ключевым фразам для кампании с ручной ставкой
 */
export interface ManualStatWordsResponse {
  /** Блок информации по ключевым фразам */
  words?: ManualStatWordsInfo;
  /** Массив информации по статистике */
  stat?: ManualStatWordsStatItem[];
}

/**
 * Информация по ключевым фразам
 */
export interface ManualStatWordsInfo {
  /** Фразовое соответствие (минус фразы) */
  phrase?: string[];
  /** Точное соответствие (минус фразы) */
  strong?: string[];
  /** Минус фразы из поиска */
  excluded?: string[];
  /** Фиксированные фразы */
  pluse?: string[];
  /** Блок со статистикой по ключевым фразам */
  keywords?: ManualStatWordsKeyword[];
  /** Фиксированные ключевые фразы включены */
  fixed?: boolean;
}

/**
 * Статистика по ключевой фразе
 */
export interface ManualStatWordsKeyword {
  /** Ключевая фраза */
  keyword: string;
  /** Количество просмотров по ключевой фразе */
  count: number;
}

/**
 * Элемент статистики
 */
export interface ManualStatWordsStatItem {
  /** ID кампании в системе WB */
  advertId?: number;
  /** Ключевая фраза */
  keyword?: string;
  /** Поле перманентно отключено */
  advertName?: string;
  /** Название кампании */
  campaignName?: string;
  /** Дата запуска кампании */
  begin?: string;
  /** Дата завершения кампании */
  end?: string;
  /** Количество просмотров */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** Частота — отношение количества просмотров к количеству уникальных пользователей */
  frq?: number;
  /** Кликабельность — отношение числа кликов к количеству показов, % */
  ctr?: number;
  /** Стоимость клика, ₽ */
  cpc?: number;
  /** Длительность кампании, в секундах */
  duration?: number;
  /** Затраты, ₽ */
  sum?: number;
}

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
