/**
 * Auto-generated TypeScript types for finances module
 * Generated from: wildberries_api_doc/13-finances.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.810Z
 */

/** Response from the balance endpoint */
export interface AccountBalanceResponse {
  /** Валюта (currency code) */
  currency?: string;
  /** Текущий баланс */
  current?: number;
  /** Доступно для вывода */
  for_withdraw?: number;
}

/** Supported locale values for document endpoints */
export type DocumentsLocale = 'ru' | 'en' | 'zh';

export interface RequestDownload {
  params?: {
    /** Формат документа */
    extension?: string;
    /** Уникальный ID документа */
    serviceName?: string;
  }[];
}

export interface GetCategories {
  data?: {
    /** Категории документов */
    categories?: {
      /** ID категории документа из параметра [запроса](./financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get) `category` */
      name?: string;
      /** Название категории документа из поля [ответа](./financial-reports-and-accounting#tag/Dokumenty/~1api~1v1~1documents~1list/get) `category` */
      title?: string;
    }[];
  };
}

export interface GetList {
  data?: {
    /** Категории документов */
    documents?: {
      /** Уникальный ID документа */
      serviceName?: string;
      /** Название документа */
      name?: string;
      /** Название [категории документов](./financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1categories/get) из поля ответа `title` */
      category?: string;
      /** Форматы документа */
      extensions?: string[];
      /** Дата и время создания документа */
      creationTime?: string;
      /** Выгружен ли документ в личном кабинете */
      viewed?: boolean;
    }[];
  };
}

export interface GetDoc {
  data?: {
    /** Название документа */
    fileName?: string;
    /** Формат документа */
    extension?: string;
    /** Документ в кодировке base64 */
    document?: string;
  };
}

export interface GetDocs {
  data?: {
    /** Название документа */
    fileName?: string;
    /** Формат документа */
    extension?: string;
    /** Документ в кодировке base64 */
    document?: string;
  };
}

export interface DetailReportItem {
  /** Номер отчёта */
  realizationreport_id?: number;
  /** Дата начала отчётного периода */
  date_from?: string;
  /** Дата конца отчётного периода */
  date_to?: string;
  /** Дата формирования отчёта */
  create_dt?: string;
  /** Валюта отчёта */
  currency_name?: string;
  /** Договор */
  suppliercontract_code?: object | null;
  /** Номер строки */
  rrd_id?: number;
  /** Номер поставки */
  gi_id?: number;
  /** Фиксированный коэффициент склада по поставке */
  dlv_prc?: number;
  /** Дата начала действия фиксации */
  fix_tariff_date_from?: string;
  /** Дата конца действия фиксации */
  fix_tariff_date_to?: string;
  /** Предмет */
  subject_name?: string;
  /** Артикул WB */
  nm_id?: number;
  /** Бренд */
  brand_name?: string;
  /** Артикул продавца */
  sa_name?: string;
  /** Размер */
  ts_name?: string;
  /** Баркод */
  barcode?: string;
  /** Тип документа */
  doc_type_name?: string;
  /** Количество */
  quantity?: number;
  /** Цена розничная */
  retail_price?: number;
  /** Вайлдберриз реализовал Товар (Пр) */
  retail_amount?: number;
  /** Согласованный продуктовый дисконт, % */
  sale_percent?: number;
  /** Размер кВВ, % */
  commission_percent?: number;
  /** Склад */
  office_name?: string;
  /** Обоснование для оплаты */
  supplier_oper_name?: string;
  /** Дата заказа. <br>Присылается с явным указанием часового пояса */
  order_dt?: string;
  /** Дата продажи. <br>Присылается с явным указанием часового пояса */
  sale_dt?: string;
  /** Дата операции */
  rr_dt?: string;
  /** Штрихкод */
  shk_id?: number;
  /** Цена розничная с учётом согласованной скидки */
  retail_price_withdisc_rub?: number;
  /** Количество доставок */
  delivery_amount?: number;
  /** Количество возврата */
  return_amount?: number;
  /** Услуги по доставке товара покупателю */
  delivery_rub?: number;
  /** Тип коробов */
  gi_box_type_name?: string;
  /** Итоговая согласованная скидка, % */
  product_discount_for_report?: number;
  /** Промокод, % */
  supplier_promo?: number;
  /** Скидка постоянного Покупателя (СПП), % */
  ppvz_spp_prc?: number;
  /** Размер кВВ без НДС, % базовый */
  ppvz_kvw_prc_base?: number;
  /** Итоговый кВВ без НДС, % */
  ppvz_kvw_prc?: number;
  /** Размер снижения кВВ из-за рейтинга, % */
  sup_rating_prc_up?: number;
  /** Размер снижения кВВ из-за акции, % */
  is_kgvp_v2?: number;
  /** Вознаграждение с продаж до вычета услуг поверенного, без НДС */
  ppvz_sales_commission?: number;
  /** К перечислению продавцу за реализованный товар */
  ppvz_for_pay?: number;
  /** Возмещение за выдачу и возврат товаров на ПВЗ */
  ppvz_reward?: number;
  /** Эквайринг/Комиссии за организацию платежей */
  acquiring_fee?: number;
  /** Размер комиссии за эквайринг/Комиссии за организацию платежей, % */
  acquiring_percent?: number;
  /** Тип платежа за Эквайринг/Комиссии за организацию платежей */
  payment_processing?: string;
  /** Наименование банка-эквайера */
  acquiring_bank?: string;
  /** Вознаграждение Вайлдберриз (ВВ), без НДС */
  ppvz_vw?: number;
  /** НДС с вознаграждения Вайлдберриз */
  ppvz_vw_nds?: number;
  /** Наименование офиса доставки */
  ppvz_office_name?: string;
  /** Номер офиса доставки */
  ppvz_office_id?: number;
  /** Номер партнёра */
  ppvz_supplier_id?: number;
  /** Партнёр */
  ppvz_supplier_name?: string;
  /** ИНН партнёра */
  ppvz_inn?: string;
  /** Номер таможенной декларации */
  declaration_number?: string;
  /** Виды логистики, штрафов и корректировок ВВ.<br> Поле будет в ответе при наличии значения */
  bonus_type_name?: string;
  /** Цифровое значение стикера, который клеится на товар в процессе сборки заказа по схеме "Маркетплейс" */
  sticker_id?: string;
  /** Страна продажи */
  site_country?: string;
  /** Признак услуги платной доставки */
  srv_dbs?: boolean;
  /** Общая сумма штрафов */
  penalty?: number;
  /** Корректировка Вознаграждения Вайлдберриз (ВВ) */
  additional_payment?: number;
  /** Возмещение издержек по перевозке/по складским операциям с товаром */
  rebill_logistic_cost?: number;
  /** Организатор перевозки.<br> Поле будет в ответе при наличии значения */
  rebill_logistic_org?: string;
  /** Хранение */
  storage_fee?: number;
  /** Удержания */
  deduction?: number;
  /** Операции на приёмке */
  acceptance?: number;
  /** Номер сборочного задания */
  assembly_id?: number;
  /** Код маркировки.<br> Поле будет в ответе при наличии значения */
  kiz?: string;
  /** Уникальный ID заказа. Примечание для использующих API Marketplace: `srid` равен `rid` в ответах методов сборочных заданий. */
  srid?: string;
  /** Тип отчёта: - `1` — стандартный - `2` — для уведомления о выкупе - `3` — уведомление о выкупе для Грузии - `4` — уведомление о выкупе для Грузии */
  report_type?: 1 | 2 | 3 | 4;
  /** Признак B2B-продажи */
  is_legal_entity?: boolean;
  /** Номер короба для обработки товара */
  trbx_id?: string;
  /** Скидка по программе софинансирования */
  installment_cofinancing_amount?: number;
  /** Скидка Wibes, % */
  wibes_wb_discount_percent?: number;
  /** Сумма, удержанная за начисленные баллы программы лояльности */
  cashback_amount?: number;
  /** Компенсация скидки по программе лояльности */
  cashback_discount?: number;
  /** Стоимость участия в программе лояльности */
  cashback_commission_change?: number;
  /** ID транзакции. Заказы в одной корзине покупателя будут иметь одинаковый `order_uid` */
  order_uid?: string;
  /** Способ продажи: `FBS` — со склада продавца, `FBW` — со склада WB, `DBS` — доставка продавцом */
  delivery_method?: string;
  /** Идентификатор программы лояльности продавца */
  loyalty_id?: number;
  /** Скидка по программе лояльности продавца, % */
  loyalty_discount?: number;
  /** Разовое изменение срока перечисления денежных средств */
  payment_schedule?: number;
  /** ID собственной акции продавца с дополнительной скидкой */
  seller_promo_id?: number;
  /** Размер дополнительной скидки по собственной акции продавца, % */
  seller_promo_discount?: number;
  /** ID промокода */
  uuid_promocode?: string;
  /** Скидка за промокод, % */
  sale_price_promocode_discount_prc?: number;
  /**
   * ID подменного артикула / Substitute article ID.
   *
   * Substitute articles (подменные артикулы) are alternate product identifiers used for external
   * promotion campaigns. Each substitute article can carry its own discount (3%–50%) on top of the
   * seller's existing discount, allowing sellers to attribute sales to specific marketing channels.
   *
   * Empty string `""` indicates no substitute article was used for this transaction.
   *
   * Added in WB API update on 2026-04-06 (news id=11270).
   *
   * @example "SUB-CAMPAIGN-001"
   * @see {@link https://seller.wildberries.ru/news-v2/news-details?id=11270}
   * @since v3.6.0
   */
  article_substitution?: string;
  /**
   * Скидка по подменному артикулу, % / Substitute article discount, percent.
   *
   * The additional discount applied via the substitute article (3–50%). Layered on top of any
   * existing seller discount and shown to buyers as e.g. "Вам -10%".
   *
   * Added in WB API update on 2026-04-06 (news id=11270).
   *
   * @example 10
   * @see {@link https://seller.wildberries.ru/news-v2/news-details?id=11270}
   * @since v3.6.0
   */
  sale_price_affiliated_discount_prc?: number;
  /**
   * Agency VAT (semantics undocumented by WB as of 2026-04-08).
   *
   * Field present in the WB OpenAPI spec example response for `/api/v5/supplier/reportDetailByPeriod`
   * but NOT in the public WB news announcements (id=11270, id=11226). Local spec
   * `wildberries_api_doc/13-finances.yaml` does not document this field either. Semantics, units, and
   * rollout date are unknown. SDK exposes the field as `number` for type safety; consumers should
   * verify with WB before relying on its value.
   *
   * @example 0
   * @since v3.6.0
   */
  agency_vat?: number;
  /**
   * Оптовая скидка для бизнеса, % / Wholesale business discount, percent.
   *
   * The new "Оптовая скидка для бизнеса" column added on 2026-04-06 in preparation for the upcoming
   * **прогрессирующая скидка для юрлиц и ИП** (progressive wholesale discount for legal entities and
   * individual entrepreneurs) tool. Currently always returns `0`; will populate with non-zero values
   * once WB launches the tool. Daily reports include this field from the 2026-04-06 report onwards;
   * weekly reports from the 2026-04-06 to 2026-04-12 report onwards.
   *
   * @example 5
   * @see {@link https://seller.wildberries.ru/news-v2/news-details?id=11226}
   * @since v3.6.0
   */
  sale_price_wholesale_discount_prc?: number;
}
