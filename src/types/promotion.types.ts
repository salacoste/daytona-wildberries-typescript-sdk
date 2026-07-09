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
 * Места размещения (перечисление WB `PlacementType`):
 *  - `search` — поиск
 *  - `recommendation` — рекомендации
 *  - `combined` — поиск и рекомендации
 *
 * Примечание: единственное число `recommendation` соответствует компоненту `PlacementType`
 * в WB OpenAPI etalon (08-promotion.yaml:4536-4541). Не путать с полем `placement` ответа
 * `updateBids`, которое использует множественное число `recommendations`.
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
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   */
  currency?: string;
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
    /** Тип ставки: `unified` — единая ставка (Type 8, управляет WB), `manual` — ручная ставка (Type 9) */
    bid_type: BidType;
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
  /** Время последнего запуска кампании (`null`, если кампания ещё не запускалась) */
  started: string | null;
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
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   * @since task-170
   */
  currency?: string;
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
  /** Количество просмотров (отсутствует для cpc-кампаний) */
  views?: number;
  /** Количество кликов */
  clicks?: number;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Количество заказов */
  orders?: number;
  /** Кликабельность — отношение числа кликов к количеству показов, % (отсутствует для cpc-кампаний) */
  ctr?: number;
  /** Стоимость одного клика, ₽ */
  cpc?: number;
  /** Средняя стоимость за тысячу показов, ₽ (отсутствует для cpc-кампаний) */
  cpm?: number;
  /** Средняя позиция товара на страницах поисковой выдачи */
  avg_pos?: number;
  /** Количество заказанных товаров, шт. */
  shks?: number;
  /** Затраты на продвижение товара в конкретном поисковом кластере кампании */
  spend?: number;
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   * @since task-170
   */
  currency?: string;
}

/**
 * Запрос списка активных и неактивных поисковых кластеров (v0)
 *
 * POST /adv/v0/normquery/list — возвращает списки активных и неактивных
 * поисковых кластеров с количеством просмотров от 100.
 */
export interface V0GetNormQueryListRequest {
  /** Массив элементов запроса (макс. 100) */
  items: V0GetNormQueryListRequestItem[];
}

/**
 * Элемент запроса списка поисковых кластеров
 */
export interface V0GetNormQueryListRequestItem {
  /** ID кампании */
  advertId: number;
  /** Артикул WB */
  nmId: number;
}

/**
 * Ответ со списком активных и неактивных поисковых кластеров (v0)
 */
export interface V0GetNormQueryListResponse {
  /** Список поисковых кластеров по кампаниям и артикулам (может быть null) */
  items?: (V0GetNormQueryListResponseItem | null)[] | null;
}

/**
 * Элемент ответа со списком поисковых кластеров
 */
export interface V0GetNormQueryListResponseItem {
  /** ID кампании */
  advertId?: number;
  /** Артикул WB */
  nmId?: number;
  /** Поисковые кластеры (активные и исключённые) */
  normQueries?: V0GetNormQueryListResponseItemNormQueries;
}

/**
 * Активные и исключённые поисковые кластеры
 */
export interface V0GetNormQueryListResponseItemNormQueries {
  /** Активные поисковые кластеры (может быть null) */
  active?: string[] | null;
  /** Неактивные поисковые кластеры (может быть null) */
  excluded?: string[] | null;
}

/**
 * Запрос ежедневной статистики по поисковым кластерам (v1)
 *
 * POST /adv/v1/normquery/stats — возвращает статистику (просмотры, клики,
 * добавления в корзину, заказы, CTR, CPC, CPM и т.д.) по поисковым кластерам
 * за указанный период с детализацией по дням. Применимо для кампаний с моделью
 * оплаты `cpm` (за показы) и `cpc` (за клики).
 *
 * V1-преемник метода {@link V0GetNormQueryStatsRequest} (`/adv/v0/normquery/stats`).
 */
export interface V1GetNormQueryStatsRequest {
  /** Дата начала периода (YYYY-MM-DD) */
  from: string;
  /** Дата окончания периода (YYYY-MM-DD) */
  to: string;
  /** Массив элементов запроса (макс. 100) */
  items: V1GetNormQueryStatsRequestItem[];
}

/**
 * Элемент запроса ежедневной статистики по поисковым кластерам
 */
export interface V1GetNormQueryStatsRequestItem {
  /** ID кампании */
  advertId: number;
  /** Артикул WB */
  nmId: number;
}

/**
 * Ответ с ежедневной статистикой по поисковым кластерам (v1)
 */
export interface V1GetNormQueryStatsResponse {
  /** Статистика по кампаниям и артикулам */
  items: V1GetNormQueryStatsResponseItem[];
}

/**
 * Элемент ответа с ежедневной статистикой
 */
export interface V1GetNormQueryStatsResponseItem {
  /** ID кампании */
  advertId: number;
  /** Артикул WB */
  nmId: number;
  /** Детализация статистики по дням */
  dailyStats: V1GetNormQueryStatsResponseItemDailyStat[];
}

/**
 * Статистика за конкретный день
 */
export interface V1GetNormQueryStatsResponseItemDailyStat {
  /** Дата */
  date: string;
  /** Статистика по поисковому кластеру */
  stat: V1GetNormQueryStatsResponseItemStat;
}

/**
 * Статистика по конкретному поисковому кластеру (v1)
 */
export interface V1GetNormQueryStatsResponseItemStat {
  /** Поисковый кластер */
  normQuery?: string;
  /** Количество добавлений товаров в корзину */
  atbs?: number;
  /** Средняя позиция товара на страницах поисковой выдачи */
  avgPos?: number;
  /** Количество кликов */
  clicks?: number;
  /** Стоимость одного клика, в базовых единицах валюты кабинета продавца */
  cpc?: number;
  /** Средняя стоимость за тысячу показов, в базовых единицах валюты кабинета продавца (null для cpc-кампаний) */
  cpm?: number;
  /** Кликабельность — отношение числа кликов к количеству показов, % (null для cpc-кампаний) */
  ctr?: number;
  /** Количество заказов */
  orders?: number;
  /** Количество заказанных товаров, шт. */
  shks?: number;
  /** Затраты на продвижение товара в конкретном поисковом кластере кампании */
  spend?: number;
  /** Количество просмотров (null для cpc-кампаний) */
  views?: number;
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
  /**
   * Текущая ставка в минорных единцах валюты — 0.01 базовой единицы
   * [валюты кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) за тысячу показов.
   * @since task-170
   */
  bid_kopecks?: number;
  /**
   * Идентификатор ставки в минорных единицах валюты (0.01 базовой единицы за тысячу показов).
   * Отличается от `bid_kopecks` — это отдельное поле идентификатора ставки.
   * @since task-170
   */
  id_kopecks?: number;
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   * @since task-170
   */
  currency?: string;
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
  /** Тип ставки: unified — единая ставка (Type 8, управляет WB), manual — ручная ставка (Type 9) */
  bid_type: BidType;
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   * @since task-170
   */
  currency?: string;
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
// V2 API Types (with bid_kopecks)
// ============================================================================

/**
 * Ставки в копейках для поиска и рекомендаций.
 * Ставка в копейках (например, 250 = 2.50 RUB)
 */
export interface BidsKopecks {
  /**
   * Ставка для поиска в копейках.
   * Например, 1100 = 11.00 RUB
   */
  search: number;
  /**
   * Ставка для рекомендаций в копейках.
   * Например, 2500 = 25.00 RUB
   */
  recommendations: number;
}

/**
 * Предмет/категория товара
 */
export interface Subject {
  /** ID предмета */
  id: number;
  /** Название предмета */
  name: string;
}

/**
 * Настройки артикула для V2 API.
 * Использует ставки в копейках (bids_kopecks) вместо устаревшего bid.
 */
export interface NmSettingV2 {
  /**
   * Ставки в копейках.
   * Ставка в копейках (например, 250 = 2.50 RUB)
   */
  bids_kopecks: BidsKopecks;
  /** Артикул WB */
  nm_id: number;
  /** Предмет/категория */
  subject: Subject;
}

/**
 * Временные метки кампании
 */
export interface AdvertTimestamps {
  /** Время создания кампании */
  created: string;
  /** Время последнего изменения кампании */
  updated: string;
  /** Время последнего запуска кампании (null если не запускалась) */
  started: string | null;
  /** Время удаления кампании. Если кампания не удалена, время указывается в будущем */
  deleted: string;
}

/**
 * Информация о кампании из V2 API.
 * Использует bid_type: 'unified' | 'manual' и ставки в копейках.
 */
export interface AdvertV2 {
  /**
   * Тип ставки:
   * - `unified` — единая ставка (Type 8; ставкой управляет WB)
   * - `manual` — ручная ставка (Type 9)
   */
  bid_type: BidType;
  /** ID кампании */
  id: number;
  /** Настройки артикулов (с ставками в копейках) */
  nm_settings: NmSettingV2[];
  /** Настройки кампании */
  settings: AdvertSettings;
  /**
   * Статус кампании:
   * - `-1` — удалена
   * - `4` — готова к запуску
   * - `7` — завершена
   * - `8` — отменена
   * - `9` — активна
   * - `11` — на паузе
   */
  status: -1 | 4 | 7 | 8 | 9 | 11;
  /** Временные метки */
  timestamps: AdvertTimestamps;
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   * @since task-170
   */
  currency?: string;
}

/**
 * Ответ метода getAdvertsV2 (GET /adv/v2/adverts).
 * Содержит список кампаний с типизированным bid_type и ставками в копейках.
 */
export interface GetAdvertsV2Response {
  /** Список кампаний */
  adverts: AdvertV2[];
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

// ============================================================================
// Campaign Count/List Types
// ============================================================================

/**
 * Campaign list item in count response
 */
export interface CampaignListItem {
  /** Campaign ID */
  advertId: number;
  /** Last change date/time */
  changeTime: string;
}

/**
 * Campaign group by type/status in count response
 */
export interface CampaignGroup {
  /** Campaign type: 8 - unified bid (deprecated), 9 - manual/unified bid */
  type: 8 | 9;
  /** Campaign status: -1, 4, 7, 8, 9, 11 */
  status: -1 | 4 | 7 | 8 | 9 | 11;
  /** Number of campaigns in this group */
  count: number;
  /** List of campaigns */
  advert_list: CampaignListItem[];
}

/**
 * Response from campaign count endpoint
 */
export interface GetCampaignCountResponse {
  /** Campaign groups by type/status */
  adverts: CampaignGroup[] | null;
  /** Total number of campaigns */
  all: number;
}

// ============================================================================
// Campaign Creation Types
// ============================================================================

/**
 * Bid type for campaign (per WB OpenAPI etalon `08-promotion.yaml` enum).
 * - `unified` — единая ставка (Type 8; ставкой управляет WB).
 * - `manual` — ручная ставка (Type 9; ставку задаёт продавец).
 *
 * NOTE: an earlier SDK version used `'auto'` for the unified/Type-8 value — that
 * was incorrect. WB's spec and the live API use `'unified'` (and never `'auto'`):
 * a prod probe returned 118 `unified` + 154 `manual` campaigns, 0 `auto`.
 *
 * {@link PromotionModule.updateBids} применяется к кампаниям `unified` (единая) и
 * `manual` (ручная).
 */
export type BidType = 'manual' | 'unified';

/**
 * Campaign placement types (per WB OpenAPI etalon `PlacementType` enum).
 * - `combined` — search and recommendation
 * - `search` — search only
 * - `recommendation` — recommendation only (singular)
 *
 * Note: this is distinct from the bid `placement` field
 * (`UpdateBidsArticle.placement` = `'search' | 'recommendations' | 'combined'`,
 * plural `'recommendations'`), which is used by `updateBids`.
 */
export type CampaignPlacementType = 'combined' | 'search' | 'recommendation';

/**
 * Request to create a campaign
 */
export interface CreateCampaignRequest {
  /** Campaign name */
  name: string;
  /** WB article IDs (nmId), max 50 */
  nms: number[];
  /** Bid type: manual or unified */
  bid_type?: BidType;
  /** Payment type: cpm or cpc */
  payment_type?: 'cpm' | 'cpc';
  /** Placement types (only for manual bid campaigns) */
  placement_types?: CampaignPlacementType[];
}

// ============================================================================
// Supplier Subjects Types
// ============================================================================

/**
 * Subject item for campaigns
 */
export interface SupplierSubject {
  /** Subject ID */
  id: number;
  /** Subject name */
  name: string;
  /** Number of WB articles (nmId) with this subject */
  count: number;
}

/**
 * Parameters for getting supplier subjects
 */
export interface GetSupplierSubjectsParams {
  /** Payment type: cpm or cpc */
  payment_type?: 'cpm' | 'cpc';
}

// ============================================================================
// Supplier Product Cards Types
// ============================================================================

/**
 * Product card item for campaigns
 */
export interface SupplierNmItem {
  /** Product title */
  title: string;
  /** WB article (nmId) */
  nm: number;
  /** Subject ID */
  subjectId: number;
}

// ============================================================================
// Campaign Control Response Types
// ============================================================================

/**
 * Error response for campaign control operations
 */
export interface CampaignControlError {
  /** Error message */
  error?: string;
}

/**
 * Campaign 400 error response
 */
export interface Campaign400Response {
  /** Error details */
  detail?: string;
  /** Internal service name */
  origin?: string;
  /** Request ID */
  request_id?: string;
  /** HTTP status code */
  status?: number;
  /** Error title */
  title?: string;
}

// ============================================================================
// UpdateBids Types (V1 API with bid_kopecks)
// ============================================================================

/**
 * Request for updating bids in campaigns (V1 API)
 *
Description: Uses bid_kopecks instead of bid for ставки в копейках.
 * Max 50 campaigns, max 50 articles per campaign.
 */
export interface UpdateBidsRequest {
  /**
   * Bids in campaigns
   * Max items: 50
   */
  bids: UpdateBidsCampaign[];
}

/**
 * Campaign bid configuration
 */
export interface UpdateBidsCampaign {
  /** Campaign ID */
  advert_id: number;
  /**
   * Article bids in kopecks
   * Max items: 50
   */
  nm_bids: UpdateBidsArticle[];
}

/**
 * Article bid configuration in kopecks
 */
export interface UpdateBidsArticle {
  /** WB Article ID (nm_id) */
  nm_id: number;
  /**
   * Bid amount in KOPECKS (not rubles!)
   *
   * Ставка в копейках. Пример: 250 = 2.50 RUB
   *
   * Conversion examples:
   * - 1.00 RUB = 100 kopecks
   * - 2.50 RUB = 250 kopecks
   * - 15.00 RUB = 1500 kopecks
   */
  bid_kopecks: number;
  /**
   * Placement type:
   * - "search" - for search placement (manual bidding campaigns)
   * - "recommendations" - for recommendations placement (manual bidding campaigns)
   * - "combined" - for both search and recommendations (unified bidding campaigns)
   */
  placement: 'search' | 'recommendations' | 'combined';
}

/**
 * Response from updateBids (V1 API)
 */
export interface UpdateBidsResponse {
  /** Results of bid updates */
  bids: UpdateBidsResultCampaign[];
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   * @since task-170
   */
  currency?: string;
}

/**
 * Result of bid update for a campaign
 */
export interface UpdateBidsResultCampaign {
  /** Campaign ID */
  advert_id: number;
  /** Updated bids */
  nm_bids: UpdateBidsResultArticle[];
}

/**
 * Result of bid update for an article
 */
export interface UpdateBidsResultArticle {
  /** WB Article ID */
  nm_id: number;
  /** Updated bid in kopecks */
  bid_kopecks: number;
  /** Placement where bid was applied */
  placement: 'search' | 'recommendations' | 'combined';
}

// ============================================================================
// V1 Config + V1 NormQuery Bids Types (task-170)
// ============================================================================

/**
 * Ответ метода GET /api/advert/v1/config — конфигурация кабинета продвижения.
 *
 * Возвращает валюту, код валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances)
 * и допустимые шаги ставок для метода POST /api/advert/v1/normquery/bids.
 *
 * @since task-170
 */
export interface V2GetConfigResponse {
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   */
  currency: string;
  /**
   * Код валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances)
   * (напр. 860 для UZS).
   */
  currencyCode: number;
  /**
   * Шаг ставки в минорных единицах валюты — 0.01 базовой единицы валюты кабинета
   * — для CPM-кампаний (за показы).
   */
  cpmStep: number;
  /**
   * Шаг ставки в минорных единицах валюты — 0.01 базовой единицы валюты кабинета
   * — для CPC-кампаний (за клики).
   */
  cpcStep: number;
}

/**
 * Элемент запроса на установку ставки для поискового кластера (V1, валюта кабинета).
 *
 * @since task-170
 */
export interface V1SetNormQueryBidsRequestItem {
  /** ID кампании */
  advertId: number;
  /** Артикул WB */
  nmId: number;
  /** Поисковый кластер — группа похожих поисковых запросов */
  normQuery: string;
  /**
   * Ставка в минорных единицах валюты — 0.01 базовой единицы
   * [валюты кабинета продавца](https://cmp.wildberries.ru/campaigns/finances).
   * Допустимый шаг ставки возвращается методом GET /api/advert/v1/config.
   */
  bidMinorUnits: number;
}

/**
 * Запрос на установку ставок для поисковых кластеров (V1, валюта кабинета).
 *
 * @since task-170
 */
export interface V1SetNormQueryBidsRequest {
  /** Массив ставок (макс. 100) */
  bids: V1SetNormQueryBidsRequestItem[];
}

/**
 * Успешно обработанный элемент ставки (V1).
 *
 * @since task-170
 */
export interface V1SetNormQueryBidsSuccessItem {
  /** ID кампании */
  advertId: number;
  /** Артикул WB */
  nmId: number;
  /** Поисковый кластер — группа похожих поисковых запросов */
  normQuery: string;
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   */
  currency: string;
}

/**
 * Элемент с причиной отклонения ставки (V1).
 *
 * @since task-170
 */
export interface V1SetNormQueryBidsFailItem {
  /** ID кампании */
  advertId: number;
  /** Артикул WB */
  nmId: number;
  /** Поисковый кластер — группа похожих поисковых запросов */
  normQuery: string;
  /** Описание причины ошибки */
  reason: string;
}

/**
 * Ответ метода POST /api/advert/v1/normquery/bids (V1, валюта кабинета).
 *
 * @since task-170
 */
export interface V1SetNormQueryBidsResponse {
  /** Успешно обработанные ставки */
  success: V1SetNormQueryBidsSuccessItem[];
  /** Отклонённые ставки с указанием причины */
  failed: V1SetNormQueryBidsFailItem[];
}

// ============================================================================
// UpdateCampaignProducts Types (PATCH /adv/v0/auction/nms)
// ============================================================================

/**
 * Request for adding/removing products from campaigns
 *
Description: Only for Type 9 campaigns.
 * Max 20 campaigns, max 50 products per campaign.
 */
export interface UpdateCampaignProductsRequest {
  /**
   * Campaigns to update
   * Max items: 20
   */
  campaigns: CampaignProductsUpdate[];
}

/**
 * Single campaign update item
 */
export interface CampaignProductsUpdate {
  /** Campaign ID */
  advert_id: number;
  /**
   * WB article IDs to add
   * For added products, the current minimum bid is set.
   * Max items: 50
   */
  add_nms?: number[];
  /**
   * WB article IDs to delete
   * Max items: 50
   */
  delete_nms?: number[];
}

/**
 * Response from updateCampaignProducts
 */
export interface UpdateCampaignProductsResponse {
  /** Results of product updates */
  nms: CampaignProductsResult[];
}

/**
 * Result for a single campaign update
 */
export interface CampaignProductsResult {
  /** Campaign ID */
  advert_id: number;
  /** Product cards result */
  nms: {
    /** Successfully added product cards */
    added: number[];
    /** Successfully deleted product cards */
    deleted: number[];
  };
}

// ============================================================================
// Minus Phrases Types (task-54)
// ============================================================================

/**
 * Request to get minus phrases for campaigns
 */
export interface GetMinusPhrasesRequest {
  /** Array of campaign/product items (max 100) */
  items: GetMinusPhrasesRequestItem[];
}

/**
 * Item in get minus phrases request
 */
export interface GetMinusPhrasesRequestItem {
  /** Campaign ID */
  advert_id: number;
  /**
   * WB Article ID
   * - Type 8 campaigns: use nm_id=0 for campaign-wide settings
   * - Type 9 campaigns: use actual WB article ID
   */
  nm_id: number;
}

/**
 * Response with minus phrases
 */
export interface GetMinusPhrasesResponse {
  /** Array of items with minus phrases */
  items: GetMinusPhrasesResponseItem[];
}

/**
 * Item in get minus phrases response
 */
export interface GetMinusPhrasesResponseItem {
  /** Campaign ID */
  advert_id: number;
  /** WB Article ID */
  nm_id: number;
  /** List of minus phrases (may be empty or undefined) */
  norm_queries?: string[];
}

/**
 * Request to set minus phrases for a campaign
 * WARNING: Sending an empty norm_queries array REMOVES ALL minus phrases!
 */
export interface SetMinusPhrasesRequest {
  /** Campaign ID */
  advert_id: number;
  /**
   * WB Article ID
   * - Type 8 campaigns: use nm_id=0 for campaign-wide settings
   * - Type 9 campaigns: use actual WB article ID
   */
  nm_id: number;
  /**
   * Minus phrases (max 1000)
   * WARNING: Empty array removes ALL minus phrases!
   */
  norm_queries: string[];
}

// ============================================================================
// Search Cluster Statistics Types (task-55)
// ============================================================================

/**
 * Request to get search cluster statistics
 */
export interface GetSearchClusterStatsRequest {
  /** Start date in YYYY-MM-DD format */
  from: string;
  /** End date in YYYY-MM-DD format */
  to: string;
  /** Array of campaign/product items (max 100) */
  items: GetSearchClusterStatsRequestItem[];
}

/**
 * Item in search cluster stats request
 */
export interface GetSearchClusterStatsRequestItem {
  /** Campaign ID */
  advert_id: number;
  /**
   * WB Article ID
   * - Type 8 campaigns: use nm_id=0 for aggregate statistics
   * - Type 9 campaigns: use actual WB article ID
   */
  nm_id: number;
}

/**
 * Response with search cluster statistics
 */
export interface GetSearchClusterStatsResponse {
  /** Array of statistics per campaign/product */
  stats: GetSearchClusterStatsItem[];
}

/**
 * Statistics item for a campaign/product
 */
export interface GetSearchClusterStatsItem {
  /** Campaign ID */
  advert_id: number;
  /** WB Article ID */
  nm_id: number;
  /** Array of statistics per search cluster */
  stats: SearchClusterStatEntry[];
}

/**
 * Statistics entry for a single search cluster
 */
export interface SearchClusterStatEntry {
  /** Search cluster (normalized query) */
  norm_query: string;
  /** Number of views */
  views: number;
  /** Number of clicks */
  clicks: number;
  /** Number of add-to-basket actions */
  atbs: number;
  /** Number of orders */
  orders: number;
  /** Click-through rate (%) */
  ctr: number;
  /** Cost per click (RUB) */
  cpc: number;
  /** Cost per mille - cost per 1000 impressions (RUB) */
  cpm: number;
  /** Average position on search results page */
  avg_pos: number;
  /** Количество заказанных товаров, шт. */
  shks?: number;
  /** Затраты на продвижение товара в поисковом кластере, ₽ */
  spend?: number;
  /**
   * Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB').
   */
  currency?: string;
}

// ============================================================================
// Bid Recommendations Types
// ============================================================================

/** Parameters for the bid recommendations endpoint
 * @since 3.4.0 */
export interface GetBidsRecommendationsParams {
  /** Campaign ID */
  advertId: number;
  /** WB article ID */
  nmId: number;
}

/** Bid value in kopecks */
export interface ReachBid {
  /** Bid amount in kopecks */
  bidKopecks: number;
  /** Minimum allowed bid in kopecks — the floor. Bidding below this triggers WB 400 "wrong bid value". */
  bidKopecksMin?: number;
}

/** Recommended bids for a search cluster (norm query) */
export interface NormQueryBidRecommendation {
  /** Normalized search query text */
  normQuery: string;
  /** Bid for maximum reach */
  reachMax: ReachBid;
  /** Bid for medium reach */
  reachMedium: ReachBid;
  /** Bid for minimum reach */
  reachMin: ReachBid;
}

/** Recommended base bids for the product card */
export interface BaseBidRecommendation {
  /** Competitive bid level */
  competitiveBid?: ReachBid;
  /** Leaders bid level */
  leadersBid?: ReachBid;
  /** Top-2 position bid level */
  top2?: ReachBid;
}

/** Response from GET /api/advert/v0/bids/recommendations
 * @since 3.4.0 */
export interface BidsRecommendationsResponse {
  /** Campaign ID */
  advertId: number;
  /** WB article ID */
  nmId: number;
  /** Recommended base bids for the product card */
  base?: BaseBidRecommendation;
  /** Recommended bids per search cluster */
  normQueries: NormQueryBidRecommendation[];
}
