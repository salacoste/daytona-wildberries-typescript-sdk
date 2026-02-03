/**
 * Auto-generated TypeScript types for analytics module
 * Generated from: wildberries_api_doc/11-analytics.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.804Z
 */

/**
 * Параметры запроса для формирования главной страницы:
 *  - `currentPeriod` — текущий период
 *  - `pastPeriod` — предыдущий период для сравнения
 */
export interface MainRequest {
  currentPeriod: Period;
  pastPeriod?: PastPeriod;
  /** Список артикулов WB для фильтрации */
  nmIds?: number[];
  /** Список ID предметов для фильтрации */
  subjectIds?: number[];
  /** Список брендов для фильтрации */
  brandNames?: string[];
  /** Список ID ярлыков для фильтрации */
  tagIds?: number[];
  positionCluster: PositionCluster;
  orderBy: OrderBy;
  /** Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) */
  includeSubstitutedSKUs?: boolean;
  /** Показать данные по поисковым запросам без учёта подменного артикула */
  includeSearchTexts?: boolean;
  /** Количество групп товаров в ответе */
  limit: number;
  /** После какого элемента выдавать данные */
  offset: number;
}

export interface MainResponse {
  commonInfo: CommonInfo;
  positionInfo: PositionInfo;
  visibilityInfo: VisibilityInfo;
  /** Список элементов таблицы */
  groups?: TableGroupItem[];
}

export interface CommonInfo {
  /** Рейтинг продавца */
  supplierRating: {
    /** Текущий рейтинг продавца */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
  /** Количество товаров в рекламе */
  advertisedProducts: {
    /** Текущее количество товаров в рекламе */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
  /** Общее количество товаров */
  totalProducts: number;
}

/**
 * Информация о позиции товара
 */
export interface PositionInfo {
  /** Средняя позиция товара в результатах поиска */
  average: {
    /** Текущая средняя позиция товара */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
  /** Медианная позиция товара в результатах поиска */
  median: {
    /** Текущая медианная позиция товара */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
  /** Данные для чарта по средней и медианной позиции товара в результатах поиска */
  chartItems: SearchReportPositionChartItem[];
  clusters: SearchReportPositionClusters;
}

export interface SearchReportPositionChartItem {
  /** Дата */
  dt: string;
  /** Средняя позиция товара в результатах поиска */
  average: number;
  /** Медианная позиция товара в результатах поиска */
  median: number;
}

/**
 * Количество товаров со средней позицией в поиске:
 *  - `firstHundred` — от 1 до 100
 *  - `secondHundred` — от 101 до 200
 *  - `below` — от 201 и ниже
 */
export interface SearchReportPositionClusters {
  /** от 1 до 100 */
  firstHundred: {
    /** Текущее количество товаров */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
  /** от 101 до 200 */
  secondHundred: {
    /** Текущее количество товаров */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
  /** от 201 и ниже */
  below: {
    /** Текущее количество товаров */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
}

/**
 * Видимость карточек и переходы в карточки. По дням, неделям, месяцам
 */
export interface VisibilityInfo {
  /** Видимость — процент вероятности, что пользователь увидит карточку товара. Зависит от средней позиции */
  visibility: {
    /** Видимость в текущий период */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
  /** Количество переходов в карточку товара из поиска */
  openCard: {
    /** Текущее количество переходов */
    current: number;
    /** Динамика по сравнению с предыдущим периодом, % */
    dynamics?: number;
  };
  /** Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по дням */
  byDay?: {
    dt: Date;
    /** Видимость карточки в результатах поиска, % */
    visibility: number;
    /** Количество переходов в карточку */
    open: number;
  }[];
  /** Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по неделям */
  byWeek?: {
    dt: Date;
    /** Видимость карточки в результатах поиска, % */
    visibility: number;
    /** Количество переходов в карточку */
    open: number;
  }[];
  /** Данные для отрисовки графика в личном кабинете по видимости и переходам в карточки по месяцам */
  byMonth?: {
    dt: Date;
    /** Видимость карточки в результатах поиска, % */
    visibility: number;
    /** Количество переходов в карточку */
    open: number;
  }[];
}

/**
 * К группе товаров относятся все карточки, подходящие хотя бы по одному из параметров:
 *  - `subjectName` — название предмета
 *  - `brandName` — бренд
 *  - `tagName` — название ярлыка
 */
export interface TableGroupItem {
  /** Название предмета */
  subjectName?: string;
  /** ID предмета */
  subjectId?: number;
  /** Бренд */
  brandName?: string;
  /** Название ярлыка */
  tagName?: string;
  /** ID ярлыка */
  tagId?: number;
  /** Метрики товара в таблице */
  metrics: {
    /** Средняя позиция товара в результатах поиска */
    avgPosition: {
      /** Текущая средняя позиция */
      current: number;
      /** Динамика по сравнению с предыдущим периодом, % */
      dynamics?: number;
    };
    /** Количество переходов в карточку товара из поиска */
    openCard: {
      /** Текущее количество переходов */
      current: number;
      /** Динамика по сравнению с предыдущим периодом, % */
      dynamics?: number;
    };
    /** Сколько раз товар из поиска добавили в корзину */
    addToCart: {
      /** Текущее количество */
      current: number;
      /** Динамика по сравнению с предыдущим периодом, % */
      dynamics?: number;
    };
    /** Конверсия в корзину из поиска — доля добавлений товара в корзину по отношению ко всем переходам в карточку товара из поиска */
    openToCart: {
      /** Текущая конверсия */
      current: number;
      /** Динамика по сравнению с предыдущим периодом, % */
      dynamics?: number;
    };
    /** Сколько раз товары из поиска заказали */
    orders: {
      /** Текущее количество */
      current: number;
      /** Динамика по сравнению с предыдущим периодом, % */
      dynamics?: number;
    };
    /** Конверсия в заказ из поиска — доля заказов товара по отношению ко всем добавлениям товара из поиска в корзину */
    cartToOrder: {
      /** Текущая конверсия */
      current: number;
      /** Динамика по сравнению с предыдущим периодом, % */
      dynamics?: number;
    };
    /** Процент видимости товара в результатах поиска */
    visibility: {
      /** Текущий процент видимости */
      current: number;
      /** Динамика по сравнению с предыдущим периодом, % */
      dynamics?: number;
    };
  };
  /** Массив товаров группы */
  items: TableProductItem[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableProductItem {
  // API returns empty object, interface reserved for future expansion
}

/**
 * Параметры запроса для пагинации по группам:
 *  - `currentPeriod` — текущий период
 *  - `pastPeriod` — предыдущий период для сравнения
 */
export interface TableGroupRequest {
  currentPeriod: Period;
  pastPeriod?: PastPeriod;
  /** Список артикулов WB для фильтрации */
  nmIds?: number[];
  /** Список ID предметов для фильтрации */
  subjectIds?: number[];
  /** Список брендов для фильтрации */
  brandNames?: string[];
  /** Список ID ярлыков для фильтрации */
  tagIds?: number[];
  orderBy: OrderByGrTe;
  positionCluster: PositionCluster;
  /** Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) */
  includeSubstitutedSKUs?: boolean;
  /** Показать данные по поисковым запросам без учёта подменного артикула */
  includeSearchTexts?: boolean;
  /** Количество групп товаров в ответе */
  limit: number;
  /** После какого элемента выдавать данные */
  offset: number;
}

export interface TableGroupResponse {
  /** Список групп товаров для таблицы */
  groups: TableGroupItem[];
}

/**
 * Параметры запроса для пагинации по товарам в группе:
 *  - `currentPeriod` — текущий период
 *  - `pastPeriod` — предыдущий период для сравнения
 */
export interface TableDetailsRequest {
  currentPeriod: Period;
  pastPeriod?: PastPeriod;
  /** ID предмета */
  subjectId?: number;
  /** Название товара */
  brandName?: string;
  /** ID ярлыка */
  tagId?: number;
  /** Список артикулов WB */
  nmIds?: number[];
  orderBy: OrderBy;
  /** Товары с какой средней позицией в поиске показывать в отчёте: - `all` — все - `firstHundred` — от 1 до 100 - `secondHundred` — от 101 до 200 - `below` — от 201 и ниже */
  positionCluster: 'all' | 'firstHundred' | 'secondHundred' | 'below';
  /** Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) */
  includeSubstitutedSKUs?: boolean;
  /** Показать данные по поисковым запросам без учёта подменного артикула */
  includeSearchTexts?: boolean;
  /** Количество товаров в ответе */
  limit: number;
  /** После какого элемента выдавать данные */
  offset: number;
}

export interface TableDetailsResponse {
  /** Список товаров в группе по фильтру */
  products: TableProductItem[];
}

/**
 * Параметры для запроса по рейтингу поисковых запросов:
 *  - `currentPeriod` — текущий период
 *  - `pastPeriod` — предыдущий период для сравнения
 */
export interface ProductSearchTextsRequest {
  currentPeriod: Period;
  pastPeriod?: PastPeriod;
  /** Список артикулов WB */
  nmIds: number[];
  /** Фильтрация по поисковым запросам, по которым больше всего: - `openCard` — перешли в карточку - `addToCart` — добавили в корзину - `openToCart` — конверсия в корзину - `orders` — заказали товаров - `cartToOrder` — конверсия в заказ */
  topOrderBy: 'openCard' | 'addToCart' | 'openToCart' | 'orders' | 'cartToOrder';
  /** Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) */
  includeSubstitutedSKUs?: boolean;
  /** Показать данные по поисковым запросам без учёта подменного артикула */
  includeSearchTexts?: boolean;
  orderBy: OrderByGrTe;
  limit: TextLimit;
}

export interface ProductSearchTextsResponse {
  items: TableSearchTextItem[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableSearchTextItem {
  // API returns empty object, interface reserved for future expansion
}

export interface ProductOrdersRequest {
  period: PeriodOrdersRequest;
  /** Артикул WB */
  nmId: number;
  /** Поисковые запросы. Для тарифа [Продвинутый](https://seller.wildberries.ru/monetization/tariffs) максимум — 100 */
  searchTexts: string[];
}

export interface ProductOrdersResponse {
  /** Итог по товарам */
  total: ProductOrdersMetrics[];
  /** Элементы таблицы */
  items: ProductOrdersTextItem[];
}

export interface ProductOrdersTextItem {
  /** Текст поискового запроса */
  text: string;
  /** Количество обращений с поисковым запросом */
  frequency: number;
  /** Статистика по датам */
  dateItems: ProductOrdersMetrics[];
}

export interface ProductOrdersMetrics {
  /** Дата сбора статистики */
  dt: string;
  /** Средняя позиция товара в результатах поиска */
  avgPosition: number;
  /** Сколько раз товары из поиска заказали */
  orders: number;
}

/**
 * Товары с какой средней позицией в поиске показывать в отчёте:
 *  - `all` — все
 *  - `firstHundred` — от 1 до 100
 *  - `secondHundred` — от 101 до 200
 *  - `below` — от 201 и ниже
 *
 * @example
```json
"all"
```
 */
export type PositionCluster = 'all' | 'firstHundred' | 'secondHundred' | 'below';

/**
 * Параметры сортировки
 */
export interface OrderBy {
  /** Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара - `minPrice` — по минимальной цене - `maxPrice` — по максимальной цене */
  field:
    | 'avgPosition'
    | 'openCard'
    | 'addToCart'
    | 'openToCart'
    | 'orders'
    | 'cartToOrder'
    | 'visibility'
    | 'minPrice'
    | 'maxPrice';
  /** Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию */
  mode: 'asc' | 'desc';
}

/**
 * Параметры сортировки
 */
export interface OrderByGrTe {
  /** Поле для сортировки: - `avgPosition` — по средней позиции - `addToCart` — по добавлениям в корзину - `openCard` — по открытию карточки (переход на страницу товара) - `orders` — по количеству заказов - `cartToOrder` — по конверсии в заказ из поиска - `openToCart` — по конверсии в корзину из поиска - `visibility` — по видимости товара */
  field:
    | 'avgPosition'
    | 'openCard'
    | 'addToCart'
    | 'openToCart'
    | 'orders'
    | 'cartToOrder'
    | 'visibility';
  /** Порядок сортировки: - `asc` — по возрастанию - `desc` — по убыванию */
  mode: 'asc' | 'desc';
}

// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
export type TextLimit = StandardTariff | AdvancedTariff;

/**
 * Количество поисковых запросов по товару для [стандартного](https://seller.wildberries.ru/monetization/tariffs) тарифа
 *
 * @example
```json
20
```
 */
export type StandardTariff = number;

/**
 * Количество поисковых запросов по товару для [продвинутого](https://seller.wildberries.ru/monetization/tariffs) тарифа
 *
 * @example
```json
50
```
 */
export type AdvancedTariff = number;

/**
 * Дата
 *
 * @example
```json
"2024-02-10"
```
 */
export type Date = string;

/**
 * Текущий период. Максимум 7 суток
 */
export interface PeriodOrdersRequest {
  /** Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня */
  start: string;
  /** Дата окончания периода. Не ранее 365 суток от сегодня */
  end: string;
}

/**
 * Текущий период
 */
export interface Period {
  /** Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня */
  start: string;
  /** Дата окончания периода. Не ранее 365 суток от сегодня */
  end: string;
}

/**
 * Прошлый период для сравнения. Количество дней — меньше или равно `currentPeriod`
 */
export interface PastPeriod {
  /** Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня */
  start: string;
  /** Дата окончания периода. Не позднее даты перед датой начала `currentPeriod`. Не ранее 365 суток от сегодня */
  end: string;
}

/**
 * Результат запроса
 */
export interface CommonResponseProperties {
  data?: Record<string, never>;
}

export interface ErrorObject400 {
  /** Заголовок ошибки */
  title: string;
  /** Детали ошибки */
  detail: string;
  /** Уникальный ID запроса */
  requestId: string;
  /** ID внутреннего сервиса WB */
  origin: string;
}

export interface ErrorObject403 {
  /** Заголовок ошибки */
  title: string;
  /** Детали ошибки */
  detail: string;
  /** Уникальный ID запроса */
  requestId: string;
  /** ID внутреннего сервиса WB */
  origin: string;
}

export interface ResponseError {
  data?: Record<string, never>[];
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: {
    /** Структура, где допущена ошибка */
    field?: string;
    /** Описание */
    description?: string;
  }[];
}

/** @deprecated Use SalesFunnelProductsRequest instead. v2 endpoint /api/v2/nm-report/detail is dead (404). */
export interface NmReportDetailRequest {
  /** Бренды */
  brandNames?: string[];
  /** ID предметов */
  objectIDs?: number[];
  /** ID ярлыков */
  tagIDs?: number[];
  /** Артикулы WB */
  nmIDs?: number[];
  /** Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. */
  timezone?: string;
  /** Период */
  period: {
    /** Начало периода */
    begin?: string;
    /** Конец периода */
    end?: string;
  };
  /** Параметры сортировки. Если не указано, то по умолчанию используется значение "openCard" и сортировка по убыванию. Все виды сортировки `field`: - `openCard` — по открытию карточки (переход на страницу товара) - `addToCart` — по добавлениям в корзину - `orders` — по кол-ву заказов - `avgRubPrice` — по средней цене в рублях - `ordersSumRub` — по сумме заказов в рублях - `stockMpQty` — по кол-ву остатков маркетплейса шт. - `stockWbQty` — по кол-ву остатков на складе шт. - `cancelSumRub` — сумме возвратов в рублях - `cancelCount` — по кол-ву возвратов - `buyoutCount` — по кол-ву выкупов - `buyoutSumRub` — по сумме выкупов */
  orderBy?: {
    /** Вид сортировки */
    field?: string;
    /** `asc` — по возрастанию, `desc` — по убыванию */
    mode?: string;
  };
  /** Страница */
  page: number;
}

/** @deprecated Use SalesFunnelProductsHistoryRequest instead. v2 endpoint /api/v2/nm-report/detail/history is dead (404). */
export interface NmReportDetailHistoryRequest {
  /** Артикул WB (максимум 20) */
  nmIDs: number[];
  /** Период */
  period: {
    /** Начало периода */
    begin?: string;
    /** Конец периода */
    end?: string;
  };
  /** Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. */
  timezone?: string;
  /** Тип агрегации. Если не указано, то по умолчанию используется агрегация по дням. <br> Доступные уровни агрегации `day`, `week` */
  aggregationLevel?: string;
}

/** @deprecated Use SalesFunnelGroupedHistoryRequest instead. v2 endpoint /api/v2/nm-report/grouped/history is dead (404). */
export interface NmReportGroupedHistoryRequest {
  /** ID предметов */
  objectIDs?: number[];
  /** Бренды */
  brandNames?: string[];
  /** ID ярлыков */
  tagIDs?: number[];
  /** Период */
  period: {
    /** Начало периода */
    begin?: string;
    /** Конец периода */
    end?: string;
  };
  /** Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. */
  timezone?: string;
  /** Тип агрегации. Если не указано, то по умолчанию используется агрегация по дням. <br> Доступные уровни агрегации `day`, `week` */
  aggregationLevel?: string;
}

/** @deprecated Use SalesFunnelProductsResponse instead. v2 endpoint /api/v2/nm-report/detail is dead (404). */
export interface NmReportDetailResponse {
  data?: {
    /** Страница */
    page?: number;
    /** Есть ли следующая страница (`false` — нет, `true` — есть) */
    isNextPage?: boolean;
    cards?: {
      /** Артикул WB */
      nmID?: number;
      /** Артикул продавца */
      vendorCode?: string;
      /** Бренд */
      brandName?: string;
      /** Ярлыки */
      tags?: {
        /** ID ярлыка */
        id?: number;
        /** Название ярлыка */
        name?: string;
      }[];
      /** Предмет */
      object?: {
        /** ID предмета */
        id?: number;
        /** Название предмета */
        name?: string;
      };
      /** Статистика */
      statistics?: {
        /** Запрашиваемый период */
        selectedPeriod?: {
          /** Начало периода */
          begin?: string;
          /** Конец периода */
          end?: string;
          /** Количество переходов в карточку товара */
          openCardCount?: number;
          /** Положили в корзину, штук */
          addToCartCount?: number;
          /** Заказали товаров, шт */
          ordersCount?: number;
          /** Заказали на сумму, руб. */
          ordersSumRub?: number;
          /** Выкупили товаров, шт. */
          buyoutsCount?: number;
          /** Выкупили на сумму, руб. */
          buyoutsSumRub?: number;
          /** Отменили товаров, шт. */
          cancelCount?: number;
          /** Отменили на сумму, руб. */
          cancelSumRub?: number;
          /** Средняя цена, руб. */
          avgPriceRub?: number;
          /** Среднее количество заказов в день, шт. */
          avgOrdersCountPerDay?: number;
          /** Конверсии */
          conversions?: {
            /** Конверсия в корзину, % (Какой процент посетителей, открывших карточку товара, добавили товар в корзину) */
            addToCartPercent?: number;
            /** Конверсия в заказ, % (Какой процент посетителей, добавивших товар в корзину, сделали заказ) */
            cartToOrderPercent?: number;
            /** Процент выкупа, % (Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю.) */
            buyoutsPercent?: number;
          };
        };
        /** Статистика за предыдущий период */
        previousPeriod?: {
          /** Начало периода */
          begin?: string;
          /** Конец периода */
          end?: string;
          /** Количество переходов в карточку товара */
          openCardCount?: number;
          /** Положили в корзину, штук */
          addToCartCount?: number;
          /** Заказали товаров, штук */
          ordersCount?: number;
          /** Заказали на сумму, руб. */
          ordersSumRub?: number;
          /** Выкупили товаров, шт. */
          buyoutsCount?: number;
          /** Выкупили на сумму, руб. */
          buyoutsSumRub?: number;
          /** Отменили товаров, штук */
          cancelCount?: number;
          /** Отменили на сумму, руб. */
          cancelSumRub?: number;
          /** Средняя цена, руб. */
          avgPriceRub?: number;
          /** Среднее количество заказов в день, шт. */
          avgOrdersCountPerDay?: number;
          /** Конверсии */
          conversions?: {
            /** Конверсия в корзину, % (Какой процент посетителей, открывших карточку товара, добавили товар в корзину) */
            addToCartPercent?: number;
            /** Конверсия в заказ, % (Какой процент посетителей, добавивших товар в корзину, сделали заказ) */
            cartToOrderPercent?: number;
            /** Процент выкупа, % (Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю.) */
            buyoutsPercent?: number;
          };
        };
        /** Сравнение двух периодов, в процентах */
        periodComparison?: {
          /** Динамика переходов в карточку товара */
          openCardDynamics?: number;
          /** Динамика добавлений в корзину */
          addToCartDynamics?: number;
          /** Динамика количества заказов */
          ordersCountDynamics?: number;
          /** Динамика суммы заказов, рублей */
          ordersSumRubDynamics?: number;
          /** Динамика выкупов, штук */
          buyoutsCountDynamics?: number;
          /** Динамика суммы выкупов, рублей */
          buyoutsSumRubDynamics?: number;
          /** Динамика отмен товаров, штук */
          cancelCountDynamics?: number;
          /** Динамика сумм отмен товаров, рублей */
          cancelSumRubDynamics?: number;
          /** Динамика среднего количества заказов в день */
          avgOrdersCountPerDayDynamics?: number;
          /** Динамика средней цены на товары. Учитываются скидки для акций и WB скидка. */
          avgPriceRubDynamics?: number;
          /** Конверсии */
          conversions?: {
            /** Конверсия в корзину, % (Какой процент посетителей, открывших карточку товара, добавили товар в корзину) */
            addToCartPercent?: number;
            /** Конверсия в заказ, % (Какой процент посетителей, добавивших товар в корзину, сделали заказ) */
            cartToOrderPercent?: number;
            /** Процент выкупа, % (Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю.) */
            buyoutsPercent?: number;
          };
        };
      };
      /** Остатки */
      stocks?: {
        /** Остатки МП, шт. (Общее количество остатков на складах продавца на текущий день) */
        stocksMp?: number;
        /** Остатки на складах WB (Общее количество остатков на складах WB на текущий день) */
        stocksWb?: number;
      };
    }[];
  };
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: {
    /** Структура, где допущена ошибка */
    field?: string;
    /** Описание */
    description?: string;
  }[];
}

/** @deprecated Use SalesFunnelProductsHistoryResponse instead. v2 endpoint /api/v2/nm-report/detail/history is dead (404). */
export interface NmReportDetailHistoryResponse {
  data?: {
    /** Артикул WB */
    nmID?: number;
    /** Наименование карточки товара */
    imtName?: string;
    /** Артикул продавца */
    vendorCode?: string;
    history?: {
      /** Дата */
      dt?: string;
      /** Количество переходов в карточку товара */
      openCardCount?: number;
      /** Положили в корзину, штук */
      addToCartCount?: number;
      /** Заказали товаров, шт */
      ordersCount?: number;
      /** Заказали на сумму, руб. */
      ordersSumRub?: number;
      /** Выкупили товаров, шт. */
      buyoutsCount?: number;
      /** Выкупили на сумму, руб. */
      buyoutsSumRub?: number;
      /** Процент выкупа, % (Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю.) */
      buyoutPercent?: number;
      /** Конверсия в корзину, % (Какой процент посетителей, открывших карточку товара, добавили товар в корзину) */
      addToCartConversion?: number;
      /** Конверсия в заказ, % (Какой процент посетителей, добавивших товар в корзину, сделали заказ) */
      cartToOrderConversion?: number;
    }[];
  }[];
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: {
    /** Структура, где допущена ошибка */
    field?: string;
    /** Описание */
    description?: string;
  }[];
}

/** @deprecated Use SalesFunnelGroupedHistoryResponse instead. v2 endpoint /api/v2/nm-report/grouped/history is dead (404). */
export interface NmReportGroupedHistoryResponse {
  data?: {
    /** Предмет */
    object?: {
      /** ID предмета */
      id?: number;
      /** Название предмета */
      name?: string;
    };
    /** Бренд */
    brandName?: string;
    /** Ярлык */
    tag?: {
      /** ID ярлыка */
      id?: number;
      /** Название ярлыка */
      name?: string;
    };
    history?: {
      /** Дата */
      dt?: string;
      /** Количество переходов в карточку товара */
      openCardCount?: number;
      /** Положили в корзину, штук */
      addToCartCount?: number;
      /** Заказали товаров, шт */
      ordersCount?: number;
      /** Заказали на сумму, руб. */
      ordersSumRub?: number;
      /** Выкупили товаров, шт. */
      buyoutsCount?: number;
      /** Выкупили на сумму, руб. */
      buyoutsSumRub?: number;
      /** Процент выкупа, % (Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю.) */
      buyoutPercent?: number;
      /** Конверсия в корзину, % (Какой процент посетителей, открывших карточку товара, добавили товар в корзину) */
      addToCartConversion?: number;
      /** Конверсия в заказ, % (Какой процент посетителей, добавивших товар в корзину, сделали заказ) */
      cartToOrderConversion?: number;
    }[];
  }[];
  /** Флаг ошибки */
  error?: boolean;
  /** Описание ошибки */
  errorText?: string;
  /** Дополнительные ошибки */
  additionalErrors?: {
    /** Структура, где допущена ошибка */
    field?: string;
    /** Описание */
    description?: string;
  }[];
}

export interface SalesFunnelProductReq {
  /** ID отчёта в UUID-формате. Генерируется продавцом самостоятельно */
  id: string;
  /** Тип отчёта — `DETAIL_HISTORY_REPORT` */
  reportType: string;
  /** Название отчёта. Если не указано, сформируется автоматически */
  userReportName?: string;
  /** Параметры отчёта */
  params: {
    /** Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах */
    nmIDs?: number[];
    /** Список ID предметов для фильтрации */
    subjectIds?: number[];
    /** Список брендов для фильтрации */
    brandNames?: string[];
    /** Список ID ярлыков для фильтрации */
    tagIds?: number[];
    /** Начало периода */
    startDate: string;
    /** Конец периода */
    endDate: string;
    /** Временная зона, по умолчанию Europe/Moscow */
    timezone?: string;
    /** Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам */
    aggregationLevel?: 'day' | 'week' | 'month';
    /** Скрыть удалённые карточки товаров */
    skipDeletedNm?: boolean;
  };
}

export interface SalesFunnelGroupReq {
  /** ID отчёта в UUID-формате. Генерируется продавцом самостоятельно */
  id: string;
  /** Тип отчёта — `GROUPED_HISTORY_REPORT` */
  reportType: string;
  /** Название отчёта. Если не указано, сформируется автоматически */
  userReportName?: string;
  /** Параметры отчёта */
  params: {
    /** Список ID предметов для фильтрации */
    subjectIds?: number[];
    /** Список брендов для фильтрации */
    brandNames?: string[];
    /** Список ID ярлыков для фильтрации */
    tagIds?: number[];
    /** Начало периода */
    startDate: string;
    /** Конец периода */
    endDate: string;
    /** Временная зона, по умолчанию Europe/Moscow */
    timezone?: string;
    /** Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам */
    aggregationLevel?: string;
    /** Скрыть удалённые `nmID` */
    skipDeletedNm?: boolean;
  };
}

export interface SearchReportGroupReq {
  /** ID отчёта в UUID-формате. Генерируется продавцом самостоятельно */
  id: string;
  /** Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_GROUP` */
  reportType: string;
  /** Название отчёта. Если не указано, сформируется автоматически */
  userReportName?: string;
  /** Параметры отчёта */
  params: {
    currentPeriod: Period;
    pastPeriod?: PastPeriod;
    /** Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах */
    nmIds?: number[];
    /** Список ID предметов для фильтрации. Оставьте пустым, чтобы получить отчёт по всем предметам */
    subjectIds: number[];
    /** Список брендов для фильтрации */
    brandNames?: string[];
    /** Список ID ярлыков для фильтрации */
    tagIds?: number[];
    orderBy: OrderByGrTe;
    positionCluster: PositionCluster;
    /** Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) */
    includeSubstitutedSKUs?: boolean;
    /** Показать данные по поисковым запросам без учёта подменного артикула */
    includeSearchTexts?: boolean;
  };
}

export interface SearchReportProductReq {
  /** ID отчёта в UUID-формате. Генерируется продавцом самостоятельно */
  id: string;
  /** Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_PRODUCT` */
  reportType: string;
  /** Название отчёта. Если не указано, сформируется автоматически */
  userReportName?: string;
  /** Параметры отчёта */
  params: {
    currentPeriod: Period;
    pastPeriod?: PastPeriod;
    /** ID предмета. Используйте значение `0`, чтобы получить отчёт по всем предметам */
    subjectId?: number;
    /** Бренд */
    brandName?: string;
    /** ID ярлыка. Чтобы получить отчёт по всем ярлыкам, укажите значение 0 */
    tagId?: number;
    /** Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах */
    nmIds?: number[];
    positionCluster: PositionCluster;
    orderBy: OrderBy;
    /** Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) */
    includeSubstitutedSKUs?: boolean;
    /** Показать данные по поисковым запросам без учёта подменного артикула */
    includeSearchTexts?: boolean;
  };
}

export interface SearchReportTextReq {
  /** ID отчёта в UUID-формате. Генерируется продавцом самостоятельно */
  id: string;
  /** Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_TEXT` */
  reportType: string;
  /** Название отчёта. Если не указано, сформируется автоматически */
  userReportName?: string;
  /** Параметры отчёта */
  params: {
    currentPeriod: Period;
    pastPeriod?: PastPeriod;
    /** Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт по всем товарам */
    nmIds?: unknown[];
    /** Список ID предметов для фильтрации */
    subjectIds?: number[];
    /** Список брендов для фильтрации */
    brandNames?: string[];
    /** Список ID ярлыков для фильтрации */
    tagIds?: number[];
    /** Фильтрация по поисковым запросам, по которым больше всего: - `openCard` — перешли в карточку - `addToCart` — добавили в корзину - `openToCart` — конверсия в корзину - `orders` — заказали товаров - `cartToOrder` — конверсия в заказ */
    topOrderBy: 'openCard' | 'addToCart' | 'openToCart' | 'orders' | 'cartToOrder';
    orderBy: OrderByGrTe;
    /** Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) */
    includeSubstitutedSKUs?: boolean;
    /** Показать данные по поисковым запросам без учёта подменного артикула */
    includeSearchTexts?: boolean;
    limit: TextLimit;
  };
}

export interface StocksReportReq {
  /** ID отчёта в UUID-формате. Генерируется продавцом самостоятельно */
  id: string;
  /** Тип отчёта — `STOCK_HISTORY_REPORT_CSV` */
  reportType: string;
  /** Название отчёта. Если не указано, сформируется автоматически */
  userReportName?: string;
  /** Параметры отчёта */
  params: CommonReportFilters;
}

export interface NmReportRetryReportRequest {
  /** ID отчёта */
  downloadId?: string;
}

export interface NmReportCreateReportResponse {
  /** Уведомление, что началась генерация отчёта */
  data: string;
}

export interface NmReportGetReportsResponse {
  data: {
    /** ID отчёта */
    id: string;
    /** Дата и время завершения генерации */
    createdAt: string;
    /** Статус отчёта: * `WAITING` — в очереди на обработку * `PROCESSING` — генерируется * `SUCCESS —` готов * `RETRY` — ожидает повторной обработки * `FAILED` — не получилось сгенерировать, сгенерируйте повторно */
    status: string;
    /** Название отчёта */
    name: string;
    /** Размер отчёта, Б */
    size: number;
    /** Начало периода */
    startDate: string;
    /** Конец периода */
    endDate: string;
  }[];
}

export interface NmReportRetryReportResponse {
  /** Уведомление, что началась повторная генерация отчёта */
  data: string;
}

/**
 * Слишком много запросов
 *
 * @example
```json
{
  "title": "too many requests",
  "detail": "limited by c122a060-a7fb-4bb4-abb0-32fd4e18d489",
  "code": "07e4668e-ac2242c5c8c5-[UK-4dx7JUdskGZ]",
  "requestId": "9d3c02cc698f8b041c661a7c28bed293",
  "origin": "s2s-api-auth-stat",
  "status": 429,
  "statusText": "Too Many Requests",
  "timestamp": "2024-09-30T06:52:38Z"
}
```
 */
export interface Response429Download {
  /** Заголовок ошибки */
  title?: string;
  /** Детали ошибки */
  detail?: string;
  /** Внутренний код ошибки */
  code?: string;
  /** Уникальный ID запроса */
  requestId?: string;
  /** ID внутреннего сервиса WB */
  origin?: string;
  /** HTTP статус-код */
  status?: number;
  /** Расшифровка HTTP статус-кода */
  statusText?: string;
  /** Дата и время запроса */
  timestamp?: string;
}

/**
 * @example
```json
{
  "title": "Too many requests",
  "detail": "The daily response limit has been exceeded. The maximum number is 20.",
  "requestId": "51b7828b-e298-4dfa-b7cd-45ab179921d393",
  "origin": "analytics-open-api"
}
```
 */
export interface Response429DownloadDaily {
  /** Заголовок ошибки */
  title: string;
  /** Детали ошибки */
  detail: string;
  /** Уникальный ID запроса */
  requestId: string;
  /** ID внутреннего сервиса WB */
  origin: string;
}

export type TableGroupRequestSt = CommonReportFilters & {
  /** Количество групп в ответе */
  limit?: number;
  /** После какого элемента выдавать данные */
  offset: number;
};

/**
 * Общие фильтры по отчёту
 */
export interface CommonReportFilters {
  /** Список артикулов WB для фильтрации */
  nmIDs?: number[];
  /** Список ID предметов для фильтрации */
  subjectIDs?: number[];
  /** Список брендов для фильтрации */
  brandNames?: string[];
  /** Список ID ярлыков для фильтрации */
  tagIDs?: number[];
  currentPeriod: PeriodSt;
  stockType: StockType;
  /** Скрыть удалённые товары */
  skipDeletedNm: boolean;
  availabilityFilters: AvailabilityFilters;
  orderBy: TableOrderBy;
}

/**
 * Период
 */
export interface PeriodSt {
  /** Дата начала периода. Не позднее `end`. Не ранее 3 месяцев от текущей даты */
  start: string;
  /** Дата окончания периода. Не ранее 3 месяцев от текущей даты */
  end: string;
}

/**
 * Тип складов хранения товаров:
 *  - `""` — все
 *  - `wb` — Склады WB
 *  - `mp` — Склады Маркетплейс (FBS)
 *
 * @example
```json
"mp"
```
 */
export type StockType = '' | 'wb' | 'mp';

/**
 * Доступность товара:
 *  - `deficient` — Дефицит
 *  - `actual` — Актуальный
 *  - `balanced` — Баланс
 *  - `nonActual` — Неактуальный
 *  - `nonLiquid` — Неликвид
 *  - `invalidData` — Не рассчитано
 *
 * @example
```json
[
  "deficient",
  "balanced"
]
```
 */
export type AvailabilityFilters =
  | 'deficient'
  | 'actual'
  | 'balanced'
  | 'nonActual'
  | 'nonLiquid'
  | 'invalidData'[];

/**
 * Вид сортировки данных
 */
export interface TableOrderBy {
  field: TableGroupField;
  mode: OrderByMode;
}

/**
 * Cортировка по полю:
 *  - `ordersCount` — Заказы, шт.
 *  - `ordersSum` — Заказы, сумма
 *  - `avgOrders` — Среднее количество заказов в день
 *  - `buyoutCount` — Выкупы, шт.
 *  - `buyoutSum` — Выкупы, сумма
 *  - `buyoutPercent` — Процент выкупа
 *  - `stockCount` — Остатки на текущий день, шт.
 *  - `stockSum` — Стоимость остатков на текущий день
 *  - `saleRate` — Оборачиваемость текущих остатков
 *  - `avgStockTurnover` — Оборачиваемость средних остатков
 *  - `toClientCount` — В пути к клиенту, шт.
 *  - `fromClientCount` — В пути от клиента, шт.
 *  - `minPrice` — Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
 *  - `maxPrice` — Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба)
 *  - `officeMissingTime` — Время отсутствия товара на складе
 *  - `lostOrdersCount` — Упущенные заказы, шт.
 *  - `lostOrdersSum` — Упущенные заказы, сумма
 *  - `lostBuyoutsCount` — Упущенные выкупы, шт.
 *  - `lostBuyoutsSum` — Упущенные выкупы, сумма
 *
 * @example
```json
"avgOrders"
```
 */
export type TableGroupField =
  | 'ordersCount'
  | 'ordersSum'
  | 'avgOrders'
  | 'buyoutCount'
  | 'buyoutSum'
  | 'buyoutPercent'
  | 'stockCount'
  | 'stockSum'
  | 'saleRate'
  | 'avgStockTurnover'
  | 'toClientCount'
  | 'fromClientCount'
  | 'minPrice'
  | 'maxPrice'
  | 'officeMissingTime'
  | 'lostOrdersCount'
  | 'lostOrdersSum'
  | 'lostBuyoutsCount'
  | 'lostBuyoutsSum';

/**
 * Порядок сортировки:
 * - asc — по возрастанию
 * - desc — по убыванию
 *
 * @example
```json
"asc"
```
 */
export type OrderByMode = 'asc' | 'desc';

export interface TableGroupResponseSt {
  groups: TableGroups;
}

/**
 * Множество данных по группам
 */
export type TableGroups = TableGroupItemSt[];

/**
 * Данные по группе
 */
export interface TableGroupItemSt {
  /** ID предмета */
  subjectID: number;
  /** Название предмета */
  subjectName: string;
  /** Бренд */
  brandName: string;
  /** ID ярлыка */
  tagID: number;
  /** Название ярлыка */
  tagName: string;
  /** Метрики группы */
  metrics: TableCommonMetrics;
  /** Товары группы */
  items: TableProductItemSt[];
}

/**
 * Метрики
 */
export interface TableCommonMetrics {
  /** Заказы, шт. */
  ordersCount: number;
  /** Заказы, сумма */
  ordersSum: number;
  /** Среднее количество заказов в день */
  avgOrders: number;
  /** Среднее количество заказов по месяцам */
  avgOrdersByMonth: FloatGraphByPeriodItem[];
  /** Выкупы, шт. */
  buyoutCount: number;
  /** Выкупы, сумма */
  buyoutSum: number;
  /** Процент выкупа */
  buyoutPercent: number;
  /** Остатки на текущий день, шт. */
  stockCount: number;
  /** Стоимость остатков на текущий день */
  stockSum: number;
  /** Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность */
  saleRate: {
    /** Количество дней */
    days: number;
    /** Количество часов */
    hours: number;
  };
  /** Оборачиваемость средних остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность */
  avgStockTurnover: {
    /** Количество дней */
    days: number;
    /** Количество часов */
    hours: number;
  };
  /** В пути к клиенту, шт. */
  toClientCount: number;
  /** В пути от клиента, шт. */
  fromClientCount: number;
  /** Время отсутствия товара на складе. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность 4. `"hours":-4` — отсутствие в течение всего периода */
  officeMissingTime: {
    /** Количество дней */
    days: number;
    /** Количество часов */
    hours: number;
  };
  /** Упущенные заказы, шт. Особые случаи: 1. Значение меньше `0` и не равно `-2` — значение не рассчитано 2. Значение `-2` — нулевое значение */
  lostOrdersCount: number;
  /** Упущенные заказы, сумма. Особые случаи: 1. Значение меньше `0` и не равно `-2` — значение не рассчитано 2. Значение `-2` — нулевое значение */
  lostOrdersSum: number;
  /** Упущенные выкупы, шт. Особые случаи: 1. Значение меньше `0` и не равно `-2` — значение не рассчитано 2. Значение `-2` — нулевое значение */
  lostBuyoutsCount: number;
  /** Упущенные выкупы, сумма. Особые случаи: 1. Значение меньше `0` и не равно `-2` — значение не рассчитано 2. Значение `-2` — нулевое значение */
  lostBuyoutsSum: number;
}

/**
 * Среднее количество заказов за месяц
 */
export interface FloatGraphByPeriodItem {
  /** Начало месяца */
  start: string;
  /** Конец месяца */
  end: string;
  /** Среднее количество заказов */
  value: number;
}

/**
 * Данные по товару
 */
export interface TableProductItemSt {
  /** Артикул WB */
  nmID: number;
  /** Является ли товар удалённым */
  isDeleted: boolean;
  /** Название предмета */
  subjectName: string;
  /** Название товара */
  name: string;
  /** Артикул продавца */
  vendorCode: string;
  /** Бренд */
  brandName: string;
  /** Ссылка на главное фото */
  mainPhoto: string;
  /** Является ли товар размерным. Неразмерный товар имеет единственный размер, с `"techSize":"0"` */
  hasSizes: boolean;
  /** Метрики товара */
  metrics: TableCommonMetrics & {
    /** Текущая цена */
    currentPrice: {
      /** Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба) */
      minPrice: number;
      /** Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба) */
      maxPrice: number;
    };
    /** Доступность товара: - `deficient` — Дефицит - `actual` — Актуальный - `balanced` — Баланс - `nonActual` — Неактуальный - `nonLiquid` — Неликвид - `invalidData` — Не рассчитано */
    availability: 'deficient' | 'actual' | 'balanced' | 'nonActual' | 'nonLiquid' | 'invalidData';
  };
}

/**
 * Параметры запроса об остатках по товарам
 */
export type TableProductRequest = CommonProductFilters & {
  /** Количество товаров в ответе */
  limit?: number;
  /** После какого элемента выдавать данные */
  offset: number;
};

/**
 * Общие фильтры по товару
 */
export interface CommonProductFilters {
  /** Список артикулов WB для фильтрации */
  nmIDs?: number[];
  /** ID предмета */
  subjectID?: number;
  /** Бренд */
  brandName?: string;
  /** ID ярлыка */
  tagID?: number;
  currentPeriod: PeriodSt;
  stockType: StockType;
  /** Скрыть удалённые товары */
  skipDeletedNm: boolean;
  orderBy: TableOrderBy;
  availabilityFilters: AvailabilityFilters;
}

export interface TableProductResponse {
  /** Множество данных по товарам */
  items: TableProductItemSt[];
}

/**
 * Параметры запроса об остатках по размерам товара
 */
export type TableSizeRequest = CommonSizeFilters;

/**
 * Общие фильтры по размеру
 */
export interface CommonSizeFilters {
  /** Артикул WB */
  nmID: number;
  currentPeriod: PeriodSt;
  stockType: StockType;
  orderBy: TableOrderBy;
  /** Включить детализацию по складам */
  includeOffice: boolean;
}

export interface TableSizeResponse {
  /** Множество данных по складам */
  offices?: TableOfficeItem[];
  /** Множество данных по размерам товара */
  sizes?: {
    /** Название размера */
    name: string;
    /** ID размера */
    chrtID: number;
    /** Склады */
    offices?: TableOfficeItem[];
    /** Метрики размера */
    metrics: TableCommonMetrics & {
      /** Текущая цена */
      currentPrice: {
        /** Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба) */
        minPrice: number;
        /** Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба) */
        maxPrice: number;
      };
    };
  }[];
}

/**
 * Данные по складу
 */
export interface TableOfficeItem {
  /** Регион отгрузки */
  regionName: string;
  /** ID склада */
  officeID: number;
  /** Название склада */
  officeName: string;
  /** Метрики склада */
  metrics: TableCommonMetrics;
}

/**
 * Параметры запроса об остатках по складам
 */
export type TableShippingOfficeRequest = CommonShippingOfficeFilters;

/**
 * Общие фильтры по регионам отгрузки
 */
export interface CommonShippingOfficeFilters {
  /** Список артикулов WB для фильтрации */
  nmIDs?: number[];
  /** Список ID предметов для фильтрации */
  subjectIDs?: number[];
  /** Список брендов для фильтрации */
  brandNames?: string[];
  /** Список ID ярлыков для фильтрации */
  tagIDs?: number[];
  currentPeriod: PeriodSt;
  stockType: StockType;
  /** Скрыть удалённые товары */
  skipDeletedNm: boolean;
}

export interface TableShippingOfficeResponse {
  /** Множество данных по регионам отгрузки */
  regions?: TableShippingOfficeItem[];
}

/**
 * Данные по региону отгрузки
 */
export interface TableShippingOfficeItem {
  /** Регион отгрузки */
  regionName: string;
  /** Метрики по региону */
  metrics: TableShippingOfficeMetrics;
  /** Данные по складам */
  offices: {
    /** ID склада */
    officeID: number;
    /** Название склада */
    officeName: string;
    /** Метрики по складу */
    metrics: TableShippingOfficeMetrics;
  }[];
}

/**
 * Общие метрики по регионам/складам отгрузки
 */
export interface TableShippingOfficeMetrics {
  /** Остатки на текущий день, шт. */
  stockCount: number;
  /** Остатки на текущий день, сумма */
  stockSum: number;
  /** Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность */
  saleRate: {
    /** Количество дней */
    days: number;
    /** Количество часов */
    hours: number;
  };
  /** В пути к клиенту, шт. */
  toClientCount: number;
  /** В пути от клиента, шт. */
  fromClientCount: number;
}

// ============ v3 Sales Funnel Types ============
// Source: wildberries_api_doc/11-analytics.yaml (v3 schemas, lines 4271-5134)

// --- Supporting types ---

/** Период дат для v3 Sales Funnel запросов */
export interface DatePeriod {
  /** Начало периода */
  start: string;
  /** Конец периода */
  end: string;
}

/** Тип агрегации: по дням или по неделям */
export type AggregationLevel = 'day' | 'week';

/** Параметры сортировки для v3 Sales Funnel */
export interface SalesFunnelOrderBy {
  /** Поле для сортировки */
  field:
    | 'openCard'
    | 'addToCart'
    | 'orderCount'
    | 'orderSum'
    | 'buyoutCount'
    | 'buyoutSum'
    | 'cancelCount'
    | 'cancelSum'
    | 'avgPrice'
    | 'stockMpQty'
    | 'stockWbQty'
    | 'shareOrderPercent'
    | 'addToWishlist'
    | 'timeToReady'
    | 'localizationPercent'
    | 'wbClub.orderCount'
    | 'wbClub.orderSum'
    | 'wbClub.buyoutSum'
    | 'wbClub.cancelSum'
    | 'wbClub.buyoutCount'
    | 'wbClub.avgPrice'
    | 'wbClub.buyoutPercent'
    | 'wbClub.avgOrderCountPerDay'
    | 'wbClub.cancelCount';
  /** Порядок сортировки */
  mode: 'asc' | 'desc';
}

/** Ярлык товара (v3) */
export interface SalesFunnelTag {
  /** ID ярлыка */
  id: number;
  /** Название ярлыка */
  name: string;
}

/** Среднее время доставки */
export interface SalesFunnelTimeToReady {
  /** Дни */
  days: number;
  /** Часы */
  hours: number;
  /** Минуты */
  mins: number;
}

/** Конверсии */
export interface SalesFunnelConversions {
  /** Конверсия в корзину, % */
  addToCartPercent: number;
  /** Конверсия в заказ, % */
  cartToOrderPercent: number;
  /** Процент выкупа, % */
  buyoutPercent: number;
}

/** Статистика WB Клуба */
export interface SalesFunnelWbClubMetrics {
  /** Заказали товаров с WB Клубом, шт. */
  orderCount: number;
  /** Заказали на сумму с WB Клубом */
  orderSum: number;
  /** Выкупили на сумму с WB Клубом */
  buyoutSum: number;
  /** Выкупили товаров с WB Клубом, шт. */
  buyoutCount: number;
  /** Отменили на сумму с WB Клубом */
  cancelSum: number;
  /** Отменили товаров с WB Клубом, шт. */
  cancelCount: number;
  /** Средняя цена с WB Клубом */
  avgPrice: number;
  /** Процент выкупа с WB Клубом */
  buyoutPercent: number;
  /** Среднее количество заказов в день с WB Клубом, шт. */
  avgOrderCountPerDay: number;
}

/** Динамика статистики WB Клуба */
export interface SalesFunnelWbClubMetricsDynamic {
  /** Динамика количества заказов с WB Клубом */
  orderCount: number;
  /** Динамика суммы заказов с WB Клубом */
  orderSum: number;
  /** Динамика суммы выкупов с WB Клубом */
  buyoutSum: number;
  /** Динамика выкупов с WB Клубом */
  buyoutCount: number;
  /** Динамика сумм отмен товаров с WB Клубом */
  cancelSum: number;
  /** Динамика отмен товаров с WB Клубом */
  cancelCount: number;
  /** Динамика средней цены на товары с WB Клубом */
  avgPrice: number;
  /** Динамика процента выкупа с WB Клубом */
  buyoutPercent: number;
  /** Динамика среднего количества заказов в день с WB Клубом */
  avgOrderCountPerDay: number;
}

// --- Request types ---

/** Запрос списка товаров воронки продаж v3 (Swagger: ProductsRequest) */
export interface SalesFunnelProductsRequest {
  /** Запрашиваемый период */
  selectedPeriod: DatePeriod;
  /** Период для сравнения */
  pastPeriod?: DatePeriod;
  /** Артикулы WB */
  nmIds?: number[];
  /** Список брендов для фильтрации */
  brandNames?: string[];
  /** Список ID предметов для фильтрации */
  subjectIds?: number[];
  /** Список ID ярлыков для фильтрации */
  tagIds?: number[];
  /** Скрыть удалённые карточки товаров */
  skipDeletedNm?: boolean;
  /** Параметры сортировки */
  orderBy?: SalesFunnelOrderBy;
  /** Количество карточек товара в ответе */
  limit?: number;
  /** Сколько элементов пропустить */
  offset?: number;
}

/** Запрос истории по товарам воронки продаж v3 (Swagger: ProductHistoryRequest) */
export interface SalesFunnelProductsHistoryRequest {
  /** Запрашиваемый период */
  selectedPeriod: DatePeriod;
  /** Артикулы WB */
  nmIds: number[];
  /** Скрыть удалённые карточки товаров */
  skipDeletedNm?: boolean;
  /** Тип агрегации */
  aggregationLevel?: AggregationLevel;
}

/** Запрос сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryRequest) */
export interface SalesFunnelGroupedHistoryRequest {
  /** Запрашиваемый период */
  selectedPeriod: DatePeriod;
  /** Список брендов для фильтрации */
  brandNames?: string[];
  /** Список ID предметов для фильтрации */
  subjectIds?: number[];
  /** Список ID ярлыков для фильтрации */
  tagIds?: number[];
  /** Скрыть удалённые карточки товаров */
  skipDeletedNm?: boolean;
  /** Тип агрегации */
  aggregationLevel?: AggregationLevel;
}

// --- Entity types ---

/** Карточка товара v3 (Swagger: Product) */
export interface SalesFunnelProduct {
  /** Артикул WB */
  nmId: number;
  /** Название карточки товара */
  title: string;
  /** Артикул продавца */
  vendorCode: string;
  /** Бренд */
  brandName: string;
  /** ID предмета */
  subjectId: number;
  /** Название предмета */
  subjectName: string;
  /** Ярлыки */
  tags: SalesFunnelTag[];
  /** Оценка карточки */
  productRating: number;
  /** Оценка пользователей */
  feedbackRating: number;
  /** Остатки */
  stocks: {
    /** Общее количество остатков на складах WB на текущий день, шт. */
    wb: number;
    /** Общее количество остатков на складах продавца на текущий день, шт. */
    mp: number;
    /** Сумма остатков на складах */
    balanceSum: number;
  };
}

/** Облегчённая карточка товара для истории v3 (Swagger: HistoryProduct) */
export interface SalesFunnelHistoryProduct {
  /** Артикул WB */
  nmId: number;
  /** Название карточки товара */
  title: string;
  /** Артикул продавца */
  vendorCode: string;
  /** Бренд */
  brandName: string;
  /** ID предмета */
  subjectId: number;
  /** Название предмета */
  subjectName: string;
}

/** Статистика за период v3 (Swagger: Statistic) */
export interface SalesFunnelStatistic {
  /** Даты периода */
  period: DatePeriod;
  /** Количество переходов в карточку товара */
  openCount: number;
  /** Положили в корзину, шт. */
  cartCount: number;
  /** Заказали товаров, шт. */
  orderCount: number;
  /** Заказали на сумму */
  orderSum: number;
  /** Выкупили товаров, шт. */
  buyoutCount: number;
  /** Выкупили на сумму */
  buyoutSum: number;
  /** Отменили товаров, шт. */
  cancelCount: number;
  /** Отменили на сумму */
  cancelSum: number;
  /** Средняя цена */
  avgPrice: number;
  /** Среднее количество заказов в день, шт. */
  avgOrdersCountPerDay: number;
  /** Доля в выручке */
  shareOrderPercent: number;
  /** Добавили в Отложенные */
  addToWishlist: number;
  /** Среднее время доставки */
  timeToReady: SalesFunnelTimeToReady;
  /** Локальные заказы в рамках одного региона */
  localizationPercent: number;
  /** Статистика WB Клуба */
  wbClub: SalesFunnelWbClubMetrics;
  /** Конверсии */
  conversions: SalesFunnelConversions;
}

/** Сравнение двух периодов v3 (Swagger: Comparison) */
export interface SalesFunnelComparison {
  /** Динамика переходов в карточку товара */
  openCountDynamic: number;
  /** Динамика добавлений в корзину */
  cartCountDynamic: number;
  /** Динамика количества заказов */
  orderCountDynamic: number;
  /** Динамика суммы заказов */
  orderSumDynamic: number;
  /** Динамика выкупов */
  buyoutCountDynamic: number;
  /** Динамика суммы выкупов */
  buyoutSumDynamic: number;
  /** Динамика отмен товаров */
  cancelCountDynamic: number;
  /** Динамика сумм отмен товаров */
  cancelSumDynamic: number;
  /** Динамика среднего количества заказов в день */
  avgOrdersCountPerDayDynamic: number;
  /** Динамика средней цены на товары */
  avgPriceDynamic: number;
  /** Динамика доли в выручке */
  shareOrderPercentDynamic: number;
  /** Динамика добавлений товара в избранное */
  addToWishlistDynamic: number;
  /** Динамика среднего времени доставки */
  timeToReadyDynamic: SalesFunnelTimeToReady;
  /** Динамика локальных заказов в рамках одного региона */
  localizationPercentDynamic: number;
  /** Динамика заказов с WB Клубом */
  wbClubDynamic: SalesFunnelWbClubMetricsDynamic;
  /** Конверсии */
  conversions: SalesFunnelConversions;
}

/** Статистика по периодам v3 (Swagger: Statistics) */
export interface SalesFunnelStatistics {
  /** Запрашиваемый период */
  selected: SalesFunnelStatistic;
  /** Период для сравнения */
  past?: SalesFunnelStatistic;
  /** Сравнение */
  comparison?: SalesFunnelComparison;
}

/** Запись истории v3 (Swagger: History) — использует `date` вместо `dt` */
export interface SalesFunnelHistory {
  /** Дата сбора статистики */
  date: string;
  /** Количество переходов в карточку товара */
  openCount: number;
  /** Положили в корзину, шт. */
  cartCount: number;
  /** Заказали товаров, шт. */
  orderCount: number;
  /** Заказали на сумму */
  orderSum: number;
  /** Выкупили товаров, шт. */
  buyoutCount: number;
  /** Выкупили на сумму */
  buyoutSum: number;
  /** Процент выкупа */
  buyoutPercent: number;
  /** Конверсия в корзину, % */
  addToCartConversion: number;
  /** Конверсия в заказ, % */
  cartToOrderConversion: number;
  /** Количество добавлений товара в Отложенные */
  addToWishlistCount: number;
}

// --- Response types ---

/** Ответ списка товаров воронки продаж v3 (Swagger: ProductsResponse) */
export interface SalesFunnelProductsResponse {
  /** Список карточек товаров */
  products: {
    /** Карточка товара */
    product: SalesFunnelProduct;
    /** Статистика */
    statistic: SalesFunnelStatistics;
  }[];
}

/** Ответ истории по товарам воронки продаж v3 (Swagger: ProductHistoryResponse) */
export type SalesFunnelProductsHistoryResponse = {
  /** Карточка товара */
  product: SalesFunnelHistoryProduct;
  /** Статистика за период */
  history: SalesFunnelHistory[];
}[];

/** Ответ сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryResponse) */
export type SalesFunnelGroupedHistoryResponse = {
  /** Карточка товара */
  product: SalesFunnelHistoryProduct;
  /** Статистика за период */
  history: SalesFunnelHistory[];
}[];
