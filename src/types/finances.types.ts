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
      /** ID категории документа из параметра [запроса](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get) `category` */
      name?: string;
      /** Название категории документа из поля [ответа](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty/~1api~1v1~1documents~1list/get) `category` */
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
      /** Название [категории документов](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1categories/get) из поля ответа `title` */
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

/**
 * Response item from `getSupplierReportDetailByPeriod()` (v5, **deprecated**).
 *
 * @deprecated Will be removed after 2026-07-15 when WB disables the v5 endpoint.
 * Migrate to {@link SalesReportDetailedItem} (v1). Key differences:
 * - camelCase field names (was snake_case)
 * - Money amounts as `string` (was `number`) — use `parseMoneyAmount()` helper
 *
 * See migration guide: https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/migration-finance-reports-v5-to-v1
 */
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
  /** Тип отчёта: - `1` — стандартный - `2` — для уведомления о выкупе - `3` — уведомление о выкупе для Грузии */
  report_type?: 1 | 2 | 3;
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
  /** ИНН покупателя B2B (B2B buyer TIN) */
  b2b_customer_tin?: string;
}

// ============================================================================
// v1 Sales Reports (since v3.7.0) — replaces deprecated v5 method
// Source: https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty
// ============================================================================

/** Request body for `getSalesReportsList()` (v1). @since v3.7.0 */
export interface SalesReportListRequest {
  /** Начальная дата отчёта (RFC3339, МСК UTC+3). Примеры: "2026-03-17" или "2026-03-17T00:00:00" */
  dateFrom: string;
  /** Конечная дата отчёта (RFC3339, МСК UTC+3) */
  dateTo: string;
  /** Количество отчётов в ответе (max 1000, default 1000) */
  limit?: number;
  /** Сколько элементов пропустить (default 0) */
  offset?: number;
  /** Периодичность: weekly (default) или daily */
  period?: 'weekly' | 'daily';
}

/** Request body for `getSalesReportsDetailed()` (v1). @since v3.7.0 */
export interface SalesReportDetailedRequest {
  /** Начальная дата отчёта (RFC3339, МСК UTC+3) */
  dateFrom: string;
  /** Конечная дата отчёта (RFC3339, МСК UTC+3) */
  dateTo: string;
  /** Количество строк в ответе (max 100000, default 100000) */
  limit?: number;
  /** ID строки ответа для пагинации. Начинайте с 0, затем передавайте rrdId последней строки предыдущего ответа. Повторяйте запрос до ответа 204. */
  rrdId?: number;
  /** Периодичность: weekly (default) или daily */
  period?: 'weekly' | 'daily';
  /** Список полей, которые вернутся в ответе. Если параметр не указан, возвращаются все поля. Пример: ["rrdId", "nmId", "forPay"]. @since v3.8.0 — narrowed from `string[]` to `SalesReportDetailedField[]` for autocomplete and type safety. */
  fields?: SalesReportDetailedField[];
}

/** Request body for `getSalesReportsDetailedByReportId()` (v1). @since v3.7.0 */
export interface SalesReportDetailedByIdRequest {
  /** Количество строк в ответе (max 100000, default 100000) */
  limit?: number;
  /** ID строки ответа для пагинации. Начинайте с 0, затем передавайте rrdId последней строки предыдущего ответа. */
  rrdId?: number;
  /** Список полей в ответе. Если не указан, возвращаются все поля. @since v3.8.0 — narrowed from `string[]` to `SalesReportDetailedField[]`. */
  fields?: SalesReportDetailedField[];
}

/**
 * Item returned by `getSalesReportsList()` — metadata for a single sales report.
 * All money amounts are `string` (not number) to preserve precision. Use `parseMoneyAmount()` helper for math.
 *
 * @since v3.7.0
 * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsList}
 */
export interface SalesReportListItem {
  /**
   * Номер отчёта реализации.
   *
   * **BigInt precision note**: For daily reports, this value may exceed `Number.MAX_SAFE_INTEGER`
   * (2^53). If you plan to pass this ID to `getSalesReportsDetailedByReportId()` for daily reports,
   * consider using a BigInt-aware JSON parser on this response — the default JSON.parse will
   * silently truncate precision. For typical weekly reports, `number` is safe.
   */
  reportId?: number;
  /** Название продавца (юрлицо/ИП) */
  sellerFinanceName?: string;
  /** Дата начала отчётного периода */
  dateFrom?: string;
  /** Дата конца отчётного периода */
  dateTo?: string;
  /** Дата формирования отчёта */
  createDate?: string;
  /** Валюта (e.g., "RUB") */
  currency?: string;
  /** Тип отчёта: 1 — стандартный, 2 — уведомление о выкупе, 3 — уведомление о выкупе для Грузии */
  reportType?: 1 | 2 | 3;
  /** Сумма розничных цен (string — use parseMoneyAmount) */
  retailAmountSum?: string;
  /** К перечислению продавцу (string — use parseMoneyAmount) */
  forPaySum?: string;
  /** Средний % согласованной скидки */
  avgSalePercent?: number;
  /** Сумма услуг доставки (string) */
  deliveryServiceSum?: string;
  /** Сумма платного хранения (string) */
  paidStorageSum?: string;
  /** Сумма платной приёмки (string) */
  paidAcceptanceSum?: string;
  /** Сумма удержаний (string) */
  deductionSum?: string;
  /** Сумма штрафов (string) */
  penaltySum?: string;
  /** Сумма корректировок ВВ (string) */
  additionalPaymentSum?: string;
  /** Сумма начисленного кэшбэка (string) */
  cashbackAmountSum?: string;
  /** Сумма компенсаций скидки по программе лояльности (string) */
  cashbackDiscountSum?: string;
  /** Стоимость участия в программе лояльности (string) */
  cashbackCommissionChangeSum?: string;
  /** Разовое изменение срока перечисления (string) */
  paymentSchedule?: string;
  /** Сумма банковского платежа (string) */
  bankPaymentSum?: string;
}

/**
 * Item returned by `getSalesReportsDetailed()` and `getSalesReportsDetailedByReportId()`.
 *
 * **v5 → v1 migration**: Replaces `DetailReportItem`. All ~70 fields use camelCase (was snake_case in v5).
 * **All money amounts are `string`** (was `number` in v5) — use `parseMoneyAmount()` helper for math.
 * Each field's JSDoc notes the v5 equivalent name for migration reference.
 *
 * @since v3.7.0
 * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsDetailed}
 */
export interface SalesReportDetailedItem {
  /** Номер отчёта (was `realizationreport_id` in v5) */
  reportId?: number;
  /** Дата начала отчётного периода (was `date_from`) */
  dateFrom?: string;
  /** Дата конца отчётного периода (was `date_to`) */
  dateTo?: string;
  /** Дата формирования отчёта (was `create_dt`) */
  createDate?: string;
  /** Валюта (was `currency_name`) */
  currency?: string;
  /** Тип отчёта (was `report_type`): 1 — стандартный, 2 — уведомление о выкупе, 3 — уведомление о выкупе для Грузии */
  reportType?: 1 | 2 | 3;
  /** ID строки отчёта (was `rrd_id`) */
  rrdId?: number;
  /** Номер поставки (was `gi_id`) */
  giId?: number;
  /** Фиксированный коэффициент склада (was `dlv_prc`) */
  dlvPrc?: number;
  /** Дата начала действия фиксации (was `fix_tariff_date_from`) */
  fixTariffDateFrom?: string;
  /** Дата конца действия фиксации (was `fix_tariff_date_to`) */
  fixTariffDateTo?: string;
  /** Предмет (was `subject_name`) */
  subjectName?: string;
  /** Артикул WB (was `nm_id`) */
  nmId?: number;
  /** Бренд (was `brand_name`) */
  brandName?: string;
  /** Артикул продавца (was `sa_name` in v5) */
  vendorCode?: string;
  /** Название товара (NEW in v1, no v5 equivalent) */
  title?: string;
  /** Размер (was `ts_name` in v5) */
  techSize?: string;
  /** Баркод (was `barcode` in v5) */
  sku?: string;
  /** Тип документа (was `doc_type_name`) */
  docTypeName?: string;
  /** Количество */
  quantity?: number;
  /** Цена розничная (was `retail_price`, now string — use parseMoneyAmount) */
  retailPrice?: string;
  /** Вайлдберриз реализовал (was `retail_amount`, now string) */
  retailAmount?: string;
  /** Согласованный продуктовый дисконт, % (was `sale_percent`) */
  salePercent?: number;
  /** Размер кВВ, % (was `commission_percent`) */
  commissionPercent?: number;
  /** Склад (was `office_name`) */
  officeName?: string;
  /** Обоснование для оплаты (was `supplier_oper_name`) */
  sellerOperName?: string;
  /** Дата заказа (was `order_dt`) */
  orderDt?: string;
  /** Дата продажи (was `sale_dt`) */
  saleDt?: string;
  /** Дата операции (was `rr_dt` in v5) */
  rrDate?: string;
  /** Штрихкод (was `shk_id`) */
  shkId?: number;
  /** Цена розничная с учётом согласованной скидки (was `retail_price_withdisc_rub`, now string) */
  retailPriceWithDisc?: string;
  /** Количество доставок (was `delivery_amount`) */
  deliveryAmount?: number;
  /** Количество возврата (was `return_amount`) */
  returnAmount?: number;
  /** Услуги по доставке (was `delivery_rub`, now string) */
  deliveryService?: string;
  /** Тип коробов (was `gi_box_type_name`) */
  giBoxTypeName?: string;
  /** Итоговая согласованная скидка, % (was `product_discount_for_report`) */
  productDiscountForReport?: number;
  /** Промокод, % (was `supplier_promo`, now string) */
  sellerPromo?: string;
  /** Скидка постоянного покупателя (was `ppvz_spp_prc` in v5) */
  spp?: number;
  /** Размер кВВ без НДС, % базовый (was `ppvz_kvw_prc_base` in v5) */
  kvwBase?: number;
  /** Итоговый кВВ без НДС, % (was `ppvz_kvw_prc` in v5) */
  kvw?: number;
  /** Размер снижения кВВ из-за рейтинга, % (was `sup_rating_prc_up`) */
  supRatingUp?: number;
  /** Размер снижения кВВ из-за акции, % (was `is_kgvp_v2`) */
  isKgvpV2?: number;
  /** Вознаграждение с продаж до вычета услуг поверенного, без НДС (was `ppvz_sales_commission`, now string) */
  ppvzSalesCommission?: string;
  /** К перечислению продавцу (was `ppvz_for_pay` in v5, now string — use parseMoneyAmount) */
  forPay?: string;
  /** Возмещение за выдачу и возврат товаров на ПВЗ (was `ppvz_reward`, now string) */
  ppvzReward?: string;
  /** Эквайринг/Комиссии за организацию платежей (was `acquiring_fee`, now string) */
  acquiringFee?: string;
  /** Размер комиссии за эквайринг, % (was `acquiring_percent`) */
  acquiringPercent?: number;
  /** Тип платежа за эквайринг (was `payment_processing`) */
  paymentProcessing?: string;
  /** Наименование банка-эквайера (was `acquiring_bank`) */
  acquiringBank?: string;
  /** Вознаграждение Вайлдберриз (ВВ), без НДС (was `ppvz_vw` in v5, now string) */
  vw?: string;
  /** НДС с вознаграждения Вайлдберриз (was `ppvz_vw_nds` in v5, now string) */
  vwNds?: string;
  /** Наименование офиса доставки (was `ppvz_office_name`) */
  ppvzOfficeName?: string;
  /** Номер офиса доставки (was `ppvz_office_id`) */
  ppvzOfficeId?: number;
  /** Партнёр (was `ppvz_supplier_name`) */
  ppvzSupplierName?: string;
  /** ИНН партнёра (was `ppvz_inn` in v5) */
  ppvzSupplierInn?: string;
  /** Номер таможенной декларации (was `declaration_number`) */
  declarationNumber?: string;
  /** Виды логистики, штрафов и корректировок ВВ (was `bonus_type_name`) */
  bonusTypeName?: string;
  /** Цифровое значение стикера (was `sticker_id`) */
  stickerId?: string;
  /** Страна продажи (was `site_country` in v5) */
  country?: string;
  /** Признак услуги платной доставки (was `srv_dbs`) */
  srvDbs?: boolean;
  /** Общая сумма штрафов (was `penalty`, now string) */
  penalty?: string;
  /** Корректировка Вознаграждения Вайлдберриз (was `additional_payment`, now string) */
  additionalPayment?: string;
  /** Возмещение издержек по перевозке/складским операциям (was `rebill_logistic_cost`, now string) */
  rebillLogisticCost?: string;
  /** Организатор перевозки (was `rebill_logistic_org`) */
  rebillLogisticOrg?: string;
  /** Платное хранение (was `storage_fee` in v5, now string — use parseMoneyAmount) */
  paidStorage?: string;
  /** Удержания (was `deduction`, now string) */
  deduction?: string;
  /** Операции на приёмке (was `acceptance` in v5, now string — use parseMoneyAmount) */
  paidAcceptance?: string;
  /** Номер сборочного задания (was `assembly_id` in v5) */
  orderId?: number;
  /** Код маркировки (was `kiz`) */
  kiz?: string;
  /** Признак B2B-продажи (was `is_legal_entity` in v5) */
  isB2b?: boolean;
  /** Номер короба для обработки товара (was `trbx_id`) */
  trbxId?: string;
  /** Скидка по программе софинансирования (was `installment_cofinancing_amount`, now string) */
  installmentCofinancingAmount?: string;
  /** Скидка Wibes, % (was `wibes_wb_discount_percent` in v5) */
  wibesDiscountPercent?: number;
  /** Сумма, удержанная за начисленные баллы программы лояльности (was `cashback_amount`, now string) */
  cashbackAmount?: string;
  /** Компенсация скидки по программе лояльности (was `cashback_discount`, now string) */
  cashbackDiscount?: string;
  /** Стоимость участия в программе лояльности (was `cashback_commission_change`, now string) */
  cashbackCommissionChange?: string;
  /** Разовое изменение срока перечисления (was `payment_schedule`, now string) */
  paymentSchedule?: string;
  /** Способ продажи (was `delivery_method`) */
  deliveryMethod?: string;
  /** ID собственной акции продавца (was `seller_promo_id`) */
  sellerPromoId?: number;
  /** Размер дополнительной скидки по собственной акции, % (was `seller_promo_discount`) */
  sellerPromoDiscount?: number;
  /** Идентификатор программы лояльности (was `loyalty_id`) */
  loyaltyId?: number;
  /** Скидка по программе лояльности, % (was `loyalty_discount`) */
  loyaltyDiscount?: number;
  /** ID промокода (was `uuid_promocode`) */
  uuidPromocode?: string;
  /** Скидка за промокод, % (was `sale_price_promocode_discount_prc`) */
  salePricePromocodeDiscountPrc?: number;
  /** ID подменного артикула (was `article_substitution`, added v3.6.0) */
  articleSubstitution?: string;
  /** Скидка по подменному артикулу, % (was `sale_price_affiliated_discount_prc`) */
  salePriceAffiliatedDiscountPrc?: number;
  /** Agency VAT (was `agency_vat`, undocumented by WB) */
  agencyVat?: number;
  /** Оптовая скидка для бизнеса, % (was `sale_price_wholesale_discount_prc`) */
  salePriceWholesaleDiscountPrc?: number;
  /** ИНН покупателя B2B (B2B buyer TIN) */
  b2bCustomerTin?: string;
  /** ID транзакции (was `order_uid`) */
  orderUid?: string;
  /** Уникальный ID заказа (was `srid`) */
  srid?: string;
}

/**
 * Valid field names for selective loading in `getSalesReportsDetailed()` and
 * `getSalesReportsDetailedByReportId()`. Derived from `keyof SalesReportDetailedItem`.
 *
 * Pass an array of these values as the `fields` parameter to load only specific columns
 * instead of the full ~70-field response.
 *
 * @since v3.8.0
 * @example
 * ```typescript
 * const rows = await sdk.finances.getSalesReportsDetailed({
 *   dateFrom: '2026-03-17',
 *   dateTo: '2026-03-20',
 *   limit: 100000,
 *   rrdId: 0,
 *   fields: ['rrdId', 'nmId', 'forPay', 'retailAmount'],
 * });
 * ```
 */
export type SalesReportDetailedField = keyof SalesReportDetailedItem;

// ============================================================================
// v1 Acquiring Reports (since v3.7.0) — payment acquisition costs (эквайринг)
// Available ONLY for Russian sellers. Personal/Service tokens only.
// Source: https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty
// ============================================================================

/** Request body for `getAcquiringReportsList()` (v1). @since v3.7.0 */
export interface AcquiringReportListRequest {
  /** Начальная дата отчёта (RFC3339, МСК UTC+3) */
  dateFrom: string;
  /** Конечная дата отчёта (RFC3339, МСК UTC+3) */
  dateTo: string;
  /** Количество отчётов в ответе (max 1000, default 1000) */
  limit?: number;
  /** Сколько элементов пропустить (default 0) */
  offset?: number;
}

/** Request body for `getAcquiringReportsDetailed()` (v1). @since v3.7.0 */
export interface AcquiringReportDetailedRequest {
  /** Начальная дата отчёта (RFC3339, МСК UTC+3) */
  dateFrom: string;
  /** Конечная дата отчёта (RFC3339, МСК UTC+3) */
  dateTo: string;
  /** Количество строк в ответе (max 100000, default 100000) */
  limit?: number;
  /** ID строки для пагинации. Начинайте с 0, повторяйте до ответа 204. */
  rrdId?: number;
  /** Список полей в ответе. Если не указан, возвращаются все поля. @since v3.8.0 — narrowed from `string[]` to `AcquiringReportDetailedField[]`. */
  fields?: AcquiringReportDetailedField[];
}

/** Request body for `getAcquiringReportsDetailedByReportId()` (v1). @since v3.7.0 */
export interface AcquiringReportDetailedByIdRequest {
  /** Количество строк в ответе (max 100000, default 100000) */
  limit?: number;
  /** ID строки для пагинации */
  rrdId?: number;
  /** Список полей в ответе. Если не указан, возвращаются все поля. @since v3.8.0 — narrowed from `string[]` to `AcquiringReportDetailedField[]`. */
  fields?: AcquiringReportDetailedField[];
}

/**
 * Item returned by `getAcquiringReportsList()` — metadata for a single acquiring report.
 * All money sums are `string` (not number) — use `parseMoneyAmount()` helper for math.
 *
 * **Available only to Russian sellers.**
 *
 * @since v3.7.0
 * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringList}
 */
export interface AcquiringReportListItem {
  /** Номер отчёта об издержках на приём платежей */
  reportId?: number;
  /** Название продавца (юрлицо/ИП) */
  sellerFinanceName?: string;
  /** Дата начала отчётного периода */
  dateFrom?: string;
  /** Дата конца отчётного периода */
  dateTo?: string;
  /** Дата формирования отчёта */
  createDate?: string;
  /** Валюта (e.g., "RUB") */
  currency?: string;
  /** Суммарная комиссия за эквайринг (string — use parseMoneyAmount) */
  acquiringFeeSum?: string;
  /** НДС с комиссии за эквайринг (string — use parseMoneyAmount) */
  acquiringFeeVatSum?: string;
}

/**
 * Item returned by `getAcquiringReportsDetailed()` and `getAcquiringReportsDetailedByReportId()`.
 * Detailed row for acquiring (payment acquisition) fees.
 *
 * Money fields (`retailAmount`, `acquiringFee`, `acquiringFeeVat`) are `string` — use `parseMoneyAmount()`.
 *
 * **Available only to Russian sellers.**
 *
 * @since v3.7.0
 * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailed}
 */
export interface AcquiringReportDetailedItem {
  /** ID строки отчёта */
  rrdId?: number;
  /** Номер отчёта */
  reportId?: number;
  /** Дата эквайринга */
  acqDate?: string;
  /** Банк-эквайер (e.g., "Тинькофф") */
  acquiringBank?: string;
  /** ИНН */
  tin?: string;
  /** КПП (код причины постановки на учёт) */
  taxRegistrationReasonCode?: string;
  /** Дата продажи */
  saleDate?: string;
  /** Уникальный ID заказа */
  srid?: string;
  /** Тип документа */
  docTypeName?: string;
  /** Артикул WB */
  nmId?: number;
  /** Вайлдберриз реализовал (string — use parseMoneyAmount) */
  retailAmount?: string;
  /** Комиссия за эквайринг (string — use parseMoneyAmount) */
  acquiringFee?: string;
  /** НДС с комиссии за эквайринг (string — use parseMoneyAmount) */
  acquiringFeeVat?: string;
  /** Номер счёта-фактуры */
  invoiceNumber?: string;
  /** Дата счёта-фактуры */
  invoiceDate?: string;
  /** Штрихкод */
  shkId?: number;
  /** Валюта */
  currency?: string;
}

/**
 * Valid field names for selective loading in `getAcquiringReportsDetailed()` and
 * `getAcquiringReportsDetailedByReportId()`. Derived from `keyof AcquiringReportDetailedItem`.
 *
 * Pass an array of these values as the `fields` parameter to load only specific columns.
 *
 * @since v3.8.0
 * @example
 * ```typescript
 * const rows = await sdk.finances.getAcquiringReportsDetailed({
 *   dateFrom: '2026-03-17',
 *   dateTo: '2026-03-20',
 *   limit: 100000,
 *   rrdId: 0,
 *   fields: ['rrdId', 'acquiringBank', 'acquiringFee'],
 * });
 * ```
 */
export type AcquiringReportDetailedField = keyof AcquiringReportDetailedItem;
