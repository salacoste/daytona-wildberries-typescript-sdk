/**
 * Auto-generated TypeScript types for orders-fbw module
 * Generated from: wildberries_api_doc/07-orders-fbw.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.786Z
 */

export interface ModelsTransitTariff {
  /** Транзитный склад */
  transitWarehouseName?: string;
  /** Склад назначения */
  destinationWarehouseName?: string;
  /** С какого числа доступно транзитное направление */
  activeFrom?: string;
  /** Тариф за транзит коробов. Если `null`, транзит для коробов недоступен */
  boxTariff?: ModelsVolumeTariff[];
  /** Тариф за паллету, ₽ */
  palletTariff?: number;
}

export interface ModelsVolumeTariff {
  /** Объём поставки от, литры */
  from?: number;
  /** Объём поставки до, литры */
  to?: number;
  /** Тариф, ₽ за литр */
  value?: number;
}

/**
 * @example
```json
{
  "packageCode": "WB_689",
  "quantity": 1,
  "barcodes": [
    {
      "barcode": "1234567891234",
      "quantity": 1
    }
  ]
}
```
 */
export interface ModelsBox {
  /** Штрих-код упаковки */
  packageCode?: string;
  /** Суммарное количество товара в упаковке, шт */
  quantity?: number;
  /** Список упакованных товаров */
  barcodes?: ModelsGoodInBox[];
}

export interface ModelsGoodInBox {
  /** Баркод */
  barcode?: string;
  /** Количество, шт */
  quantity?: number;
}

export interface ModelsSuppliesFiltersRequest {
  /** Фильтр по датам */
  dates?: ModelsDateFilterRequest[];
  /** Фильтр поставок по статусам. Возможные значения: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах */
  statusIDs?: ModelsHandySupplyStatus[];
}

/**
 * @example
```json
{
  "barcode": "1234567891234",
  "vendorCode": "wb4sewt0vg",
  "nmID": 987456654,
  "needKiz": true,
  "tnved": "6204430000",
  "techSize": "C",
  "color": "красный",
  "supplierBoxAmount": 10,
  "quantity": 10,
  "readyForSaleQuantity": 0,
  "unloadingQuantity": 0,
  "acceptedQuantity": 0
}
```
 */
export interface ModelsGoodInSupply {
  /** Баркод товара */
  barcode?: string;
  /** Артикул продавца */
  vendorCode?: string;
  /** Артикул WB */
  nmID?: number;
  /** Нужен ли [код маркировки](https://честныйзнак.рф/) для этого товара: - `false` — не нужен - `true` — нужен */
  needKiz?: boolean;
  /** Код ТНВЭД. <br> Если `"needKIZ":true`, а `"tnved":null`, нужно заполнить характеристику товара **ТН ВЭД** в [личном кабинете](https://seller.wildberries.ru/new-goods) или по [API](https://dev.wildberries.ru/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post) */
  tnved?: string;
  /** Размер товара, указанный продавцом */
  techSize?: string;
  /** Цвет товара */
  color?: string;
  /** Указано в упаковке, шт */
  supplierBoxAmount?: number;
  /** Указано в поставке/заказе, шт */
  quantity?: number;
  /** Поступило в продажу, шт */
  readyForSaleQuantity?: number;
  /** Принято, шт */
  acceptedQuantity?: number;
  /** Количество товара на раскладке, шт */
  unloadingQuantity?: number;
}

export interface ModelsDateFilterRequest {
  /** Дата начала периода */
  from?: string;
  /** Дата окончания периода */
  till?: string;
  /** Тип дат: - `factDate` — дата фактической отгрузки поставки - `createDate` — дата создания поставки - `supplyDate` — плановая дата отгрузки поставки - `updatedDate` — дата изменения поставки */
  type: 'factDate' | 'createDate' | 'supplyDate' | 'updatedDate';
}

/**
 * @example
```json
{
  "phone": "+7 903 *** 98 62",
  "statusID": 5,
  "statusName": "Принято",
  "boxTypeID": 5,
  "boxTypeName": "Монопаллеты",
  "createDate": "2025-07-15T17:17:45+03:00",
  "supplyDate": "2025-07-15T00:00:00+03:00",
  "factDate": "2025-07-18T11:37:32+03:00",
  "updatedDate": "2025-07-18T12:59:53+03:00",
  "warehouseID": 507,
  "warehouseName": "Коледино",
  "actualWarehouseID": 507,
  "actualWarehouseName": "Коледино",
  "transitWarehouseID": null,
  "transitWarehouseName": "",
  "acceptanceCost": 5000,
  "paidAcceptanceCoefficient": 10,
  "rejectReason": null,
  "supplierAssignName": "Магазн",
  "storageCoef": "215",
  "deliveryCoef": "200",
  "quantity": 10,
  "readyForSaleQuantity": 0,
  "acceptedQuantity": 10,
  "unloadingQuantity": 10,
  "depersonalizedQuantity": 0,
  "discrepancies": 0
}
```
 */
export interface ModelsSupplyDetails {
  /** Телефон пользователя, создавшего поставку */
  phone?: string;
  /** ID статуса поставки: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах */
  statusID?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Статус поставки */
  statusName?:
    | 'Не запланировано'
    | 'Запланировано'
    | 'Отгрузка разрешена'
    | 'Идёт приёмка'
    | 'Принято'
    | 'Отгружено на воротах';
  /** ID типа виртуальной поставки. Отображается только для поставок с `"boxTypeID":0`. - `0` — Перенос остатков - `1` — Обезличка - `4` — QR-поставка - `5` — Допринято - `6` — Скан-приёмка */
  virtualTypeID?: number;
  /** Тип виртуальной поставки. Отображается только для поставок с `"boxTypeID":0`. - `Перенос остатков` - `Обезличка` - `QR-поставка` - `Допринято` - `Скан-приёмка` */
  virtualTypeName?: string;
  /** ID типа поставки: - `0` — Без коробов (виртуальная поставка) - `1` и `2` — Короба - `5` — Монопаллеты - `6` — Суперсейф - `7` — Поштучная паллета */
  boxTypeID?: number;
  /** Тип поставки: - `Короба` - `Монопаллеты` - `Суперсейф` - `Без коробов` - `Поштучная паллета` */
  boxTypeName?: string;
  /** Является ли поставка типом «Поштучная паллета» */
  isBoxOnPallet?: boolean;
  /** Дата и время создания поставки */
  createDate?: string;
  /** Плановая дата отгрузки поставки */
  supplyDate?: string;
  /** Дата фактической отгрузки поставки */
  factDate?: string;
  /** Дата изменения поставки */
  updatedDate?: string;
  /** ID склада, на который планируется поставка */
  warehouseID?: number;
  /** Название склада, на который планируется поставка */
  warehouseName?: string;
  /** ID склада, на который поставка была привезена */
  actualWarehouseID?: number;
  /** Название склада, на который поставка привезена */
  actualWarehouseName?: string;
  /** ID транзитного склада */
  transitWarehouseID?: number;
  /** Название транзитного склада */
  transitWarehouseName?: string;
  /** Предварительная стоимость приёмки, ₽ */
  acceptanceCost?: number;
  /** Коэффициент приёмки */
  paidAcceptanceCoefficient?: number;
  /** Причина, по которой поставка не может быть принята */
  rejectReason?: string;
  /** Краткое название продавца */
  supplierAssignName?: string;
  /** Коэффициент хранения */
  storageCoef?: string;
  /** Коэффициент логистики */
  deliveryCoef?: string;
  /** Добавлено в поставку/заказ, шт */
  quantity?: number;
  /** Поступило в продажу, шт */
  readyForSaleQuantity?: number;
  /** Принято, шт */
  acceptedQuantity?: number;
  /** Количество товара, находящегося на раскладке, шт */
  unloadingQuantity?: number;
  /** Количество обезличенного товара, шт */
  depersonalizedQuantity?: number;
  /**
   * Расхождения между заявленным и фактическим количеством товара в поставке, шт.
   * Присутствует только при `"statusID":5` (Принято).
   *
   * Расшифровку расхождений (излишки/недостача/пересорт) см. в методе
   * `getSupplyDiscrepancies()` модуля orders-fbw.
   */
  discrepancies?: number;
}

/**
 * @example
```json
[
  {
    "packageCode": "WB_2282893992",
    "videoUrl": "",
    "videoStartsAt": "2026-07-11T10:02:42Z",
    "videoUnavailable": false,
    "items": [
      {
        "declaredSku": "1234567890",
        "discrepancyType": "surplus",
        "declaredAmount": 1,
        "actualAmount": 2,
        "discrepancyQuantity": 2,
        "actualSku": "1234567890",
        "skuScans": [
          {
            "scanId": 1,
            "declaredSku": "1234567890",
            "scanTime": "2025-01-18T21:11:54+03:00",
            "discrepancyLabel": "surplus",
            "actualSku": "1234567890"
          }
        ]
      }
    ]
  }
]
```
 */
export interface ModelsItemDiscrepancyResponse {
  /** Идентификатор упаковки */
  packageCode: string;
  /** Видео расхождений при приёмке */
  videoUrl: string;
  /** Дата и время записи видео расхождений при приёмке */
  videoStartsAt: string;
  /** Доступно ли видео: - `false` — да - `true` — нет */
  videoUnavailable: boolean;
  /** Товары поставки */
  items: ModelsDiscrepancyResponseItem[];
}

export interface ModelsDiscrepancyResponseItem {
  /** Артикул WB, заявленный при создании поставки */
  declaredSku: string;
  /**
   * Общий тип расхождения для короба:
   * - `surplus` — фактически доставлено больше товара, чем заявлено
   * - `shortage` — фактически доставлено меньше товара, чем заявлено
   * - `re-sorting` — артикул принятого товара не совпадает с заявленным при создании поставки
   */
  discrepancyType: 'surplus' | 'shortage' | 're-sorting';
  /** Количество товара, заявленное при создании поставки, шт */
  declaredAmount: number;
  /** Фактическое количество товара, шт */
  actualAmount: number;
  /** Разница между заявленным и фактическим количеством товара, шт */
  discrepancyQuantity: number;
  /** Фактический артикул WB */
  actualSku: string;
  /** Результаты сканирования товара. `null`, если сканов нет */
  skuScans: ModelsItemScans[] | null;
}

export interface ModelsItemScans {
  /** Идентификатор скана */
  scanId: number;
  /** Артикул WB, заявленный при создании поставки */
  declaredSku: string;
  /** Дата и время сканирования */
  scanTime: string;
  /**
   * Тип расхождения:
   * - `surplus` — фактически доставлено больше товара, чем заявлено
   * - `shortage` — фактически доставлено меньше товара, чем заявлено
   * - `re-sorting` — артикул принятого товара не совпадает с заявленным при создании поставки
   */
  discrepancyLabel: 'surplus' | 'shortage' | 're-sorting';
  /** Фактический артикул WB */
  actualSku: string;
}

export type ModelsHandySupplyStatus = 1 | 2 | 3 | 4 | 5 | 6;

export interface ModelsSupply {
  /** Телефон пользователя, создавшего поставку */
  phone?: string;
  /** ID поставки. Если `null`, это заказ, тогда используйте значение поля `preorderID` */
  supplyID?: number;
  /** ID заказа (незапланированная поставка). Для всех виртуальных поставок будет `0` */
  preorderID?: number;
  /** Дата и время создания поставки */
  createDate?: string;
  /** Плановая дата отгрузки поставки */
  supplyDate?: string;
  /** Дата фактической отгрузки поставки */
  factDate?: string;
  /** Дата изменения поставки */
  updatedDate?: string;
  /** ID статуса поставки: - `1` — Не запланировано - `2` — Запланировано - `3` — Отгрузка разрешена - `4` — Идёт приёмка - `5` — Принято - `6` — Отгружено на воротах */
  statusID?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Текущий статус поставки */
  statusName?:
    | 'Не запланировано'
    | 'Запланировано'
    | 'Отгрузка разрешена'
    | 'Идёт приёмка'
    | 'Принято'
    | 'Отгружено на воротах';
  /** ID типа поставки: - `0` — Без коробов - `1`,`2` — Короба - `5` — Монопаллеты - `6` — Суперсейф - `7` — Поштучная паллета */
  boxTypeID?: number;
  /** Является ли поставка типом «Поштучная паллета» */
  isBoxOnPallet?: boolean;
}

export interface ModelsAcceptanceCoefficient {
  /** Дата начала действия коэффициента */
  date?: string;
  /** Коэффициент приёмки: - `-1` — приёмка недоступна, вне зависимости от значения поля `allowUnload` - `0` — бесплатная приёмка - от `1` — множитель стоимости приёмки */
  coefficient?: number;
  /** ID склада. По нему можно получить [информацию о складе](https://dev.wildberries.ru/openapi/orders-fbw#tag/Informaciya-dlya-formirovaniya-postavok/paths/~1api~1v1~1warehouses/get) */
  warehouseID?: number;
  /** Название склада */
  warehouseName?: string;
  /** Доступность приёмки для поставок данного типа, смотри значение поля `boxTypeName`: - `true` — приёмка доступна - `false` — приёмка не доступна */
  allowUnload?: boolean;
  /** Тип поставки: - `Короба` - `Монопаллеты` - `Суперсейф` - `QR-поставка с коробами` */
  boxTypeName?: string;
  /** ID типа поставки: - `2` — Короба - `5` — Монопаллеты - `6` — Суперсейф <br>Для типа поставки **QR-поставка с коробами** поле не возвращается */
  boxTypeID?: number;
  /** Коэффициент хранения */
  storageCoef?: string;
  /** Коэффициент логистики */
  deliveryCoef?: string;
  /** Стоимость логистики первого литра */
  deliveryBaseLiter?: string;
  /** Стоимость логистики каждого следующего литра */
  deliveryAdditionalLiter?: string;
  /** Стоимость хранения: - для паллет — стоимость за одну паллету - для коробов — стоимость хранения за первый литр */
  storageBaseLiter?: string;
  /** Стоимость хранения каждого последующего литра: - для паллет — всегда будет `null`, т.к. стоимость хранения за единицу паллеты определяется в `StorageBaseLiter` - для коробов — стоимость хранения за каждый последующий литр */
  storageAdditionalLiter?: string;
  /** Тип склада: - `true` — сортировочный центр (СЦ) - `false` — обычный */
  isSortingCenter?: boolean;
}

/**
 * @example
```json
{
  "ID": 300461,
  "name": "Гомель 2",
  "address": "Гомель, Могилёвская улица 1/А",
  "workTime": "24/7",
  "acceptsQR": false,
  "isActive": false,
  "isTransitActive": true
}
```
 */
export interface ModelsWarehousesResultItems {
  /** ID склада */
  ID?: number;
  /** Название склада */
  name?: string;
  /** Адрес склада */
  address?: string;
  /** Режим работы склада */
  workTime?: string;
  /** Принимает ли склад QR-поставки: - `true` — да - `false` — нет */
  acceptsQR?: boolean;
  /** Доступен ли в качестве склада назначения: - `true` — да - `false` — нет */
  isActive?: boolean;
  /** Доступен ли в качестве транзитного склада: - `true` — да - `false` — нет */
  isTransitActive?: boolean;
}

export interface ModelsGood {
  /** Суммарное количество товаров, планируемых для поставки. <br> **Максимум 999999** */
  quantity?: number;
  /** Баркод из карточки товара */
  barcode?: string;
}

export interface ModelsErrorModel {
  /** HTTP статус-код */
  status?: number;
  /** ID ошибки */
  title?: string;
  /** Описание ошибки */
  detail?: string;
  /** ID запроса */
  requestId?: string;
  /** Сервис, вернувший ошибку */
  origin?: string;
}

export interface ModelsOptionsResultModel {
  result?: {
    /** Баркод из карточки товара */
    barcode?: string;
    /** Данные ошибки. При наличии */
    error?: {
      /** ID ошибки */
      title?: string;
      /** Описание ошибки */
      detail?: string;
    };
    /** Наличие ошибки: - `true` — ошибка есть - Поля нет — ошибка отсутствует */
    isError?: boolean;
    /** Список складов. При наличии ошибки будет `null` */
    warehouses?: {
      /** ID склада. По нему можно получить [информацию о складе](https://dev.wildberries.ru/openapi/orders-fbw#tag/Informaciya-dlya-formirovaniya-postavok/paths/~1api~1v1~1warehouses/get) */
      warehouseID?: number;
      /** Тип упаковки **Короб**: - `true` — доступен - `false` — недоступен */
      canBox?: boolean;
      /** Тип упаковки **Монопаллета**: - `true` — доступен - `false` — недоступен */
      canMonopallet?: boolean;
      /** Тип упаковки **Суперсейф**: - `true` — доступен - `false` — недоступен */
      canSupersafe?: boolean;
      /** Тип упаковки **Поштучная паллета**: - `true` — доступен - `false` — недоступен */
      canBoxOnPallet?: boolean;
    }[];
  }[];
  /** ID запроса при наличии ошибок */
  requestId?: string;
}

// ============================================================================
// DBW Client Info Types
// ============================================================================

/** Buyer information for a DBW order
 * @since 3.4.0 */
export interface DBWClientInfo {
  /** Order ID */
  orderID?: number;
  /** Customer first name */
  firstName?: string;
  /** Customer full name */
  fullName?: string;
  /** Phone number (without country code) */
  phone?: string;
  /** Phone country code */
  phoneCode?: number;
  /** Additional phone country codes */
  additionalPhoneCodes?: number[];
}

/** Response from POST /api/marketplace/v3/dbw/orders/client
 * @since 3.4.0 */
export interface GetDBWClientInfoResponse {
  /** List of buyer information by order (null when no matching orders) */
  orders?: DBWClientInfo[] | null;
}

// ============================================================================
// DBW Bulk Meta / Status Types (added v3.11.0 — WB 2026-05-06 announcement)
// ============================================================================

/**
 * Request body for bulk deletion of marking metadata from DBW orders.
 * Mirrors DBS `DeleteMetaBulkRequest`.
 *
 * @since 3.11.0
 */
export interface DBWDeleteMetaBulkRequest {
  /** Array of order IDs whose metadata should be deleted */
  orders: number[];
  /** Metadata key to delete — e.g. 'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration' */
  key: string;
}

/**
 * Response from bulk metadata deletion for DBW orders.
 * Mirrors DBS `DeleteMetaBulkResponse`.
 *
 * @since 3.11.0
 */
export interface DBWDeleteMetaBulkResponse {
  /** Per-order deletion results */
  orders: { orderId: number; success: boolean; error?: string }[];
}

/**
 * Request body for bulk SGTIN code assignment on DBW orders.
 * Mirrors DBS `SetSgtinBulkRequest`.
 *
 * @since 3.11.0
 */
export interface DBWSetSgtinBulkRequest {
  /** Array of per-order SGTIN assignments */
  orders: { orderId: number; sgtins: string[] }[];
}

/**
 * Response from bulk metadata set operations for DBW orders.
 * Mirrors DBS `SetMetaBulkResponse`.
 *
 * @since 3.11.0
 */
export interface DBWSetMetaBulkResponse {
  /** Per-order set results */
  orders: { orderId: number; success: boolean; error?: string }[];
  /** Array of per-order errors (present when some orders failed) */
  errors?: { orderId: number; message: string; code: string }[];
}

// Re-export DBS types for deliverBulk return type — single source of truth.
// The 409 MetaValidationFail response shape is server-side identical between DBS and DBW.
// If WB diverges the shape in a future swagger update, switch to a local copy here.
export type {
  MetaValidationDetail,
  StatusSetResponse,
  BulkStatusChangeResponse,
} from './orders-dbs.types';

// DBW-prefixed aliases for the above re-exports.
// Provided to satisfy AC-5 API symmetry: consumers can import either the bare DBS-canonical name
// or the DBW-prefixed alias — they resolve to the same type.
import type {
  BulkStatusChangeResponse,
  StatusSetResponse,
  MetaValidationDetail,
} from './orders-dbs.types';

/**
 * Response shape for DBW bulk status-change operations (alias for {@link BulkStatusChangeResponse}).
 * Maintained as a DBW-prefixed alias to preserve API symmetry with DBW request types.
 * @since 3.11.0
 */
export type DBWBulkStatusChangeResponse = BulkStatusChangeResponse;

/**
 * Per-order result item in a DBW bulk status-change response (alias for {@link StatusSetResponse}).
 * @since 3.11.0
 */
export type DBWStatusSetResponse = StatusSetResponse;

/**
 * Per-order metadata validation detail (alias for {@link MetaValidationDetail}).
 * @since 3.11.0
 */
export type DBWMetaValidationDetail = MetaValidationDetail;

/**
 * Request body for {@link OrdersFbwModule.checkMetaValidation}.
 * @since 3.11.0
 */
export interface DBWCheckMetaValidationRequest {
  /** Array of DBW order IDs to validate metadata for. Max 1000. */
  orders: number[];
}

/**
 * Response from {@link OrdersFbwModule.checkMetaValidation}.
 * Each item in `metaDetails[]` reports the validation status of a single
 * order's marking metadata. Use this *before* calling deliverBulk() to
 * detect orders that would fail with 409 MetaValidationFail.
 * @since 3.11.0
 */
export interface DBWCheckMetaValidationResponse {
  /** Per-order validation status entries. */
  metaDetails: MetaValidationDetail[];
}

// ============================================================================
// Supply Drafts Types (task-193 — WB news 2026-09)
// ============================================================================

/**
 * Товар в запросе добавления в черновик поставки (spec: `models.Item`).
 * @since task-193
 */
export interface ModelsItem {
  /** Количество товара (1–999999) */
  quantity: number;
  /** SKU (баркод) из карточки товара */
  sku: string;
}

/**
 * Ответ на создание черновика поставки.
 * @since task-193
 */
export interface ModelsDraftCreateResponse {
  /** Идентификатор черновика (UUID) */
  draftId: string;
}

/**
 * Черновик поставки — элемент списка `listDrafts()`.
 * @since task-193
 */
export interface ModelsDraftItem {
  /** Идентификатор черновика (UUID) */
  draftId: string;
  /** Телефон пользователя, создавшего черновик */
  phone: string;
  /** Дата и время создания черновика (ISO 8601) */
  createdAt: string;
  /** Дата и время обновления черновика (ISO 8601) */
  updatedAt: string;
  /** Количество SKU в черновике */
  skuQuantity: number;
  /** Количество товаров в черновике */
  itemQuantity: number;
}

/**
 * Ответ на получение списка черновиков поставок.
 * @since task-193
 */
export interface ModelsListDraftsResponse {
  /** Общее количество черновиков */
  total: number;
  /** Список черновиков */
  drafts: ModelsDraftItem[];
}

/**
 * Товар в черновике поставки — элемент списка `getDraftItems()`.
 * @since task-193
 */
export interface ModelsDraftItemItem {
  /** SKU (баркод) товара */
  sku: string;
  /** Цвет товара */
  color: string;
  /** Количество товара */
  quantity: number;
  /** Бренд */
  brandName: string;
  /** Ссылка на изображение товара */
  imgSrc: string;
  /** Артикул WB */
  nmId: number;
  /** Предмет (подкатегория) */
  subjectName: string;
  /** Размер товара */
  techSize: string;
  /** Наименование товара */
  title: string;
  /** Артикул продавца */
  vendorCode: string;
}

/**
 * Ответ на получение списка товаров в черновике поставки.
 * @since task-193
 */
export interface ModelsListDraftItemsResponse {
  /** Количество SKU в черновике */
  skuQuantity: number;
  /** Количество товаров в черновике */
  itemQuantity: number;
  /** Список товаров */
  items: ModelsDraftItemItem[];
}

/**
 * Тело запроса `addDraftItems()` — добавление товаров в черновик поставки.
 * Максимум 1000 элементов в массиве `items`.
 * @since task-193
 */
export interface ModelsDraftAdditemsRequest {
  /** Список товаров (максимум 1000) */
  items: ModelsItem[];
}

/**
 * Ошибка валидации SKU при добавлении товаров в черновик.
 * @since task-193
 */
export interface ModelsDraftAddItemsResultError {
  /** Детали ошибки */
  detail: string;
  /** Заголовок ошибки */
  title: string;
}

/**
 * Элемент результата добавления товаров — невалидный SKU с описанием ошибки.
 * @since task-193
 */
export interface ModelsDraftAddItemsResultItem {
  /** Детали ошибки валидации */
  error: ModelsDraftAddItemsResultError;
  /** Невалидный SKU */
  sku: string;
}

/**
 * Ответ на добавление товаров в черновик поставки.
 *
 * **Атомарность:** пустой `results` (`[]`) означает, что все SKU прошли
 * валидацию и товары добавлены в черновик. Непустой `results` содержит список
 * невалидных SKU — в этом случае **ни один** товар не добавлен.
 * @since task-193
 */
export interface ModelsDraftAddItemsErrorResponse {
  /** Список невалидных SKU с ошибками. `[]` — все товары добавлены */
  results: ModelsDraftAddItemsResultItem[];
}

/**
 * Тело запроса `deleteDraftItems()` — удаление товаров из черновика поставки.
 * @since task-193
 */
export interface ModelsDraftDeleteitemsRequest {
  /** Список SKU для удаления (минимум 1) */
  skus: string[];
}

/**
 * Ответ на удаление товаров из черновика поставки.
 *
 * SKU **не валидируются**: неверные SKU молча игнорируются,
 * корректные — удаляются из черновика.
 * @since task-193
 */
export interface ModelsDraftDeleteItemsErrorResponse {
  /** Результат операции */
  results: unknown[];
}
