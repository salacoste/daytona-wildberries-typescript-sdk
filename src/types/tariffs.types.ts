/**
 * Auto-generated TypeScript types for tariffs module
 * Generated from: wildberries_api_doc/10-tariffs.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.799Z
 */

export interface ModelsTariffsBoxResponse {
  data?: ModelsWarehousesBoxRates;
}

export interface ModelsWarehousesBoxRates {
  /** Дата начала следующего тарифа */
  dtNextBox?: string;
  /** Дата окончания последнего установленного тарифа */
  dtTillMax?: string;
  /** Тарифы для коробов, сгруппированные по складам */
  warehouseList?: ModelsWarehouseBoxRates[];
}

export interface ModelsWarehouseBoxRates {
  /** Логистика, первый литр, ₽ */
  boxDeliveryBase?: string;
  /** Коэффициент **Логистика**, %. На него умножается стоимость логистики. Уже учтён в тарифах */
  boxDeliveryCoefExpr?: string;
  /** Логистика, дополнительный литр, ₽ */
  boxDeliveryLiter?: string;
  /** Логистика FBS, первый литр, ₽ */
  boxDeliveryMarketplaceBase?: string;
  /** Коэффициент **FBS**, %. На него умножается стоимость логистики FBS. Уже учтён в тарифах */
  boxDeliveryMarketplaceCoefExpr?: string;
  /** Логистика FBS, дополнительный литр, ₽ */
  boxDeliveryMarketplaceLiter?: string;
  /** Хранение в день, первый литр, ₽ */
  boxStorageBase?: string;
  /** Коэффициент **Хранение**, %. На него умножается стоимость хранения в день. Уже учтён в тарифах */
  boxStorageCoefExpr?: string;
  /** Хранение в день, дополнительный литр, ₽ */
  boxStorageLiter?: string;
  /** Страна, для РФ — округ */
  geoName?: string;
  /** Название склада */
  warehouseName?: string;
}

export interface ModelsTariffsPalletResponse {
  data?: ModelsWarehousesPalletRates;
}

export interface ModelsWarehousesPalletRates {
  /** Дата начала следующего тарифа */
  dtNextPallet?: string;
  /** Дата окончания последнего установленного тарифа */
  dtTillMax?: string;
  /** Тарифы для монопаллет, сгруппированные по складам */
  warehouseList?: ModelsWarehousePalletRates[];
}

export interface ModelsWarehousePalletRates {
  /** Коэффициент доставки, %. На него умножается стоимость доставки. Во всех тарифах этот коэффициент уже учтён */
  palletDeliveryExpr?: string;
  /** Доставка 1 литра, ₽ */
  palletDeliveryValueBase?: string;
  /** Доставка каждого дополнительного литра, ₽ */
  palletDeliveryValueLiter?: string;
  /** Коэффициент хранения, %. На него умножается стоимость хранения. Во всех тарифах этот коэффициент уже учтён */
  palletStorageExpr?: string;
  /** Хранение 1 монопаллеты, ₽ */
  palletStorageValueExpr?: string;
  /** Название склада */
  warehouseName?: string;
}

export interface ModelsReturnTariffsResponse {
  data?: ModelsWarehousesReturnRates;
}

export interface ModelsWarehousesReturnRates {
  /** Дата начала следующего тарифа при грузовой доставке */
  dtNextDeliveryDumpKgt?: string;
  /** Дата начала следующего тарифа для неопознанных товаров */
  dtNextDeliveryDumpSrg?: string;
  /** Дата начала следующего тарифа при обычной доставке */
  dtNextDeliveryDumpSup?: string;
  /** Тарифы на возврат, сгруппированные по складам: - стоимость возврата брака и возврата по инициативе продавца при грузовой доставке. - стоимость возврата неопознанного складом товара. - стоимость возврата брака, возврата по инициативе продавца и автовозвратов Маркетплейс (в пункт выдачи и обратно). Можно получить стоимость возврата в пункт выдачи (ПВЗ) и обратной логистики — если продавец не забрал товары из пункта выдачи за 7 дней. */
  warehouseList?: ModelsWarehouseReturnRates[];
}

export interface ModelsWarehouseReturnRates {
  /** **Стоимость возврата при грузовой доставке, доставка на ПВЗ (базовая цена за 1 л), ₽** Применяется для крупногабаритных товаров, когда: - продавец хочет вывезти товары со склада WB; - на складе обнаружили бракованные товары; - покупатель возвращает товар, но его нельзя вернуть в продажу. */
  deliveryDumpKgtOfficeBase?: string;
  /** **Стоимость возврата при грузовой доставке, доставка на ПВЗ (доп. литр), ₽**<br> Стоимость за каждый дополнительный литр. */
  deliveryDumpKgtOfficeLiter?: string;
  /** **Стоимость возврата при грузовой доставке, обратная логистика невостребованного возврата, ₽**<br> Грузовая доставка невостребованного возврата обратно на склад WB. За единицу товара. */
  deliveryDumpKgtReturnExpr?: string;
  /** **Стоимость возврата неопознанного складом товара за каждую единицу, доставка на ПВЗ, ₽**<br> Применяется для товаров, которые не смогли принять на складе. */
  deliveryDumpSrgOfficeExpr?: string;
  /** **Стоимость возврата неопознанного складом товара за каждую единицу, обратная логистика невостребованного возврата, ₽** <br>Доставка невостребованного возврата обратно на склад WB. */
  deliveryDumpSrgReturnExpr?: string;
  /** **Стоимость возврата, доставка курьером (базовая цена за 1 л), ₽** Применяется, когда: - продавец хочет вывезти товары со склада Wildberries - на складе обнаружили бракованные товары - покупатель возвращает товар, но его нельзя вернуть в продажу - подключён автовозврат товаров, продаваемых по схеме Маркетплейс */
  deliveryDumpSupCourierBase?: string;
  /** **Стоимость возврата, доставка курьером (доп. л), ₽** <br>Стоимость за каждый дополнительный литр. */
  deliveryDumpSupCourierLiter?: string;
  /** **Стоимость возврата, доставка на ПВЗ (базовая цена за 1 л), ₽** Применяется, когда: - продавец хочет вывезти товары со склада Wildberries - на складе обнаружили бракованные товары - покупатель возвращает товар, но его нельзя вернуть в продажу - подключён автовозврат товаров, продаваемых по схеме Маркетплейс */
  deliveryDumpSupOfficeBase?: string;
  /** **Стоимость возврата, доставка на ПВЗ (доп. литр), ₽** <br>Стоимость за каждый дополнительный литр */
  deliveryDumpSupOfficeLiter?: string;
  /** **Стоимость возврата, обратная логистика невостребованного возврата, за единицу товара, ₽**<br> Доставка невостребованного возврата обратно на склад Wildberries. Применяется, когда: - продавец хочет вывезти товары со склада Wildberries - на складе обнаружили бракованные товары - покупатель возвращает товар, но его нельзя вернуть в продажу - подключён автовозврат товаров, продаваемых по схеме Маркетплейс */
  deliveryDumpSupReturnExpr?: string;
  /** Название склада */
  warehouseName?: string;
}

export interface TariffsBoxResponse {
  response?: ModelsTariffsBoxResponse;
}

export interface TariffsPalletResponse {
  response?: ModelsTariffsPalletResponse;
}

export interface ReturnTariffsResponse {
  response?: ModelsReturnTariffsResponse;
}

export interface Commission {
  /** Список комиссий */
  report?: {
    /** Комиссия по модели «Бронирование», % */
    kgvpBooking?: number;
    /** Комиссия по модели «Маркетплейс» (`FBS`), % */
    kgvpMarketplace?: number;
    /** Комиссия по модели «Самовывоз из магазина продавца» (`C&C`), % */
    kgvpPickup?: number;
    /** Комиссия по моделям «Витрина» (`DBS`) и «Курьер WB» (`DBW`), % */
    kgvpSupplier?: number;
    /** Комиссия по модели «Витрина экспресс» (`EDBS`), % */
    kgvpSupplierExpress?: number;
    /** Комиссия по модели «Склад WB» (`FBW`), % */
    paidStorageKgvp?: number;
    /** ID родительской категории */
    parentID?: number;
    /** Название родительской категории */
    parentName?: string;
    /** ID предмета */
    subjectID?: number;
    /** Название предмета */
    subjectName?: string;
  }[];
}

export interface CommissionChina {
  /** Список комиссий */
  report?: {
    /** Комиссия для продавцов из Китая, % */
    kgvpChina?: number;
    /** ID родительской категории */
    parentID?: number;
    /** Название родительской категории */
    parentName?: string;
    /** ID предмета */
    subjectID?: number;
    /** Название предмета */
    subjectName?: string;
  }[];
}

export interface CommissionTurkey {
  /** Список комиссий */
  report?: {
    /** Комиссия для продавцов из Турции, % */
    kgvpTurkey?: number;
    /** ID родительской категории */
    parentID?: number;
    /** Название родительской категории */
    parentName?: string;
    /** ID предмета */
    subjectID?: number;
    /** Название предмета */
    subjectName?: string;
  }[];
}

export interface CommissionUzbekistan {
  /** Список комиссий */
  report?: {
    /** Комиссия по модели «Маркетплейс» (FBS) для Узбекистана, % */
    kgvpMarketplaceUz?: number;
    /** Комиссия по модели «Склад WB» (FBW) для Узбекистана, % */
    kgvpPaidStorageUz?: number;
    /** Комиссия по модели «Витрина» (DBS) для Узбекистана, % */
    kgvpSupplierUz?: number;
    /** ID родительской категории */
    parentID?: number;
    /** Название родительской категории */
    parentName?: string;
    /** ID предмета */
    subjectID?: number;
    /** Название предмета */
    subjectName?: string;
  }[];
}

export interface CommissionUAE {
  /** Список комиссий */
  report?: {
    /** Комиссия для продавцов из ОАЭ, % */
    kgvpUAE?: number;
    /** ID родительской категории */
    parentID?: number;
    /** Название родительской категории */
    parentName?: string;
    /** ID предмета */
    subjectID?: number;
    /** Название предмета */
    subjectName?: string;
  }[];
}

export interface BadRequest {
  /** Детали ошибки */
  detail?: string;
  /** ID внутреннего сервиса WB */
  origin?: string;
  /** Уникальный ID запроса */
  requestId?: string;
  /** Заголовок ошибки */
  title?: string;
}

/**
 * Error model for tariffs API responses
 * Used by getAcceptanceCoefficients endpoint for 400 errors
 */
export interface ModelsErrorModel {
  /** HTTP status code */
  status?: number;
  /** Error identifier */
  title?: string;
  /** Error description */
  detail?: string;
  /** Unique request ID */
  requestId?: string;
  /** WB internal service that returned the error */
  origin?: string;
}

/**
 * Acceptance coefficient for warehouse supplies
 * Used by getAcceptanceCoefficients endpoint
 * Returns tariffs for supplies to specific warehouses for the next 14 days
 */
export interface ModelsAcceptanceCoefficient {
  /** Date when coefficient takes effect */
  date?: string;
  /**
   * Acceptance coefficient:
   * - `-1` — acceptance unavailable, regardless of allowUnload value
   * - `0` — free acceptance
   * - `1+` — acceptance cost multiplier
   */
  coefficient?: number;
  /** Warehouse ID. Can be used to get warehouse info */
  warehouseID?: number;
  /** Warehouse name */
  warehouseName?: string;
  /**
   * Acceptance availability for supplies of this type (see boxTypeID):
   * - `true` — acceptance available
   * - `false` — acceptance not available
   */
  allowUnload?: boolean;
  /**
   * Supply type ID:
   * - `2` — Boxes
   * - `5` — Monopallets
   * - `6` — Supersafe
   * For QR-supply with boxes, this field is not returned
   */
  boxTypeID?: number;
  /** Storage coefficient */
  storageCoef?: string | null;
  /** Logistics coefficient */
  deliveryCoef?: string | null;
  /** Logistics cost for first liter */
  deliveryBaseLiter?: string | null;
  /** Logistics cost for each additional liter */
  deliveryAdditionalLiter?: string | null;
  /**
   * Storage cost:
   * - for pallets — cost per one pallet
   * - for boxes — storage cost for the first liter
   */
  storageBaseLiter?: string | null;
  /**
   * Storage cost for each additional liter:
   * - for pallets — always null, as storage cost per pallet unit is defined in storageBaseLiter
   * - for boxes — storage cost for each additional liter
   */
  storageAdditionalLiter?: string | null;
  /**
   * Warehouse type:
   * - `true` — sorting center (SC)
   * - `false` — regular
   */
  isSortingCenter?: boolean;
}

// Type aliases for backward compatibility and convenience
export type TariffItem =
  | ModelsWarehouseBoxRates
  | ModelsWarehousePalletRates
  | ModelsWarehouseReturnRates;
export type BoxTariffItem = ModelsWarehouseBoxRates;
export type PalletTariffItem = ModelsWarehousePalletRates;

/** Response type for getTariffsCommission method */
export type TariffsCommissionResponse =
  | Commission
  | CommissionChina
  | CommissionTurkey
  | CommissionUzbekistan
  | CommissionUAE;
