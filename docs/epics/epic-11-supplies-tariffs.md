# Epic 11: Supplies Module - Тарифы на поставку

---

## Epic Overview

**Epic ID:** 11
**Module:** Supplies (`src/modules/supplies`)
**Swagger Source:** `wildberries_api_doc/07-orders-fbw.yaml`
**Status:** ✅ Done
**Priority:** HIGH
**Type:** Feature Expansion

---

## Business Goals

Реализовать функционал модуля Supplies для работы с тарифами на поставку, позволяющий продавцам Wildberries:

1. **Планировать поставки** — получать коэффициенты приёмки на 14 дней вперёд
2. **Выбирать оптимальные склады** — сравнивать условия приёмки по разным складам
3. **Проверять доступность** — узнавать опции упаковки для конкретных товаров
4. **Рассчитывать затраты** — прогнозировать стоимость поставки
5. **Оптимизировать стратегию** — сравнивать FBW vs FBS для выбора выгодного варианта

---

## Epic Scope

### API Endpoints (из Swagger)

| Endpoint | Method | Description | Rate Limit |
|----------|--------|-------------|------------|
| `/api/v1/acceptance/coefficients` | GET | Коэффициенты приёмки на 14 дней | 6 req/min |
| `/api/v1/acceptance/options` | POST | Опции приёмки для товаров | 6 req/min |
| `/api/v1/warehouses` | GET | Список складов WB | 6 req/min |
| `/api/v1/transit-tariffs` | GET | Транзитные направления | 6 req/min |

**Base URL:** `https://supplies-api.wildberries.ru`

### Utility Functions

| Function | Description |
|----------|-------------|
| `calculateSupplyCost()` | Расчёт прогнозируемой стоимости поставки |
| `compareSupplyCosts()` | Сравнение затрат по нескольким складам |
| `compareTariffs()` | Сравнение тарифов FBW vs FBS |

---

## Architecture

### Module Structure

```
src/
├── modules/
│   └── supplies/
│       ├── index.ts              # SuppliesModule class
│       ├── types.ts              # TypeScript interfaces
│       └── utils/
│           ├── cost-calculator.ts    # calculateSupplyCost()
│           └── tariff-comparator.ts  # compareTariffs()
├── types/
│   └── supplies.types.ts         # Shared types
└── config/
    └── supplies-rate-limits.ts   # Rate limit configuration
```

### Key Types

```typescript
// Коэффициент приёмки
interface AcceptanceCoefficient {
  date: string;
  coefficient: number;        // -1 | 0 | 1+
  warehouseID: number;
  warehouseName: string;
  allowUnload: boolean;
  boxTypeID?: number;         // 2=Короба, 5=Монопаллеты, 6=Суперсейф
  boxTypeName?: string;       // deprecated
  storageCoef?: string;
  deliveryCoef?: string;
  deliveryBaseLiter?: string;
  deliveryAdditionalLiter?: string;
  storageBaseLiter?: string;
  storageAdditionalLiter?: string;
  isSortingCenter: boolean;
}

// Товар для проверки опций
interface Good {
  quantity: number;  // 1-999999
  barcode: string;
}

// Результат проверки опций
interface OptionsResult {
  result: Array<{
    barcode: string;
    warehouses?: Array<{
      warehouseID: number;
      canBox: boolean;
      canMonopallet: boolean;
      canSupersafe: boolean;
    }>;
    error?: {
      title: string;
      detail: string;
    };
    isError?: boolean;
  }>;
}
```

---

## Stories

### Story 11.1: Получение коэффициентов приёмки (HIGH)

**Backlog Task:** `task-8.1`
**File:** `docs/stories/11.1.acceptance-coefficients.md`

**Deliverables:**
- [ ] `getAcceptanceCoefficients(warehouseIDs?: number[])` method
- [ ] TypeScript types for AcceptanceCoefficient
- [ ] Rate limiting (6 req/min, 10s interval)
- [ ] Unit tests (80%+ coverage)
- [ ] JSDoc documentation

**Business Value:**
Продавцы смогут планировать поставки, выбирая даты с коэффициентом 0 (бесплатная приёмка).

---

### Story 11.2: Получение опций приёмки для товаров (HIGH)

**Backlog Task:** `task-8.2`
**File:** `docs/stories/11.2.acceptance-options.md`

**Deliverables:**
- [ ] `getAcceptanceOptions(goods: Good[], warehouseID?: number)` method
- [ ] Input validation (max 5000 items)
- [ ] Error handling for invalid barcodes
- [ ] TypeScript types for Good, OptionsResult
- [ ] Unit & integration tests
- [ ] JSDoc documentation

**Business Value:**
Продавцы смогут проверить доступность складов и типов упаковки перед созданием поставки.

---

### Story 11.3: Калькулятор прогноза затрат на поставку (MEDIUM)

**Backlog Task:** `task-8.3`
**File:** `docs/stories/11.3.supply-cost-calculator.md`

**Deliverables:**
- [ ] `calculateSupplyCost(input: SupplyCostInput)` utility
- [ ] `compareSupplyCosts()` for multiple warehouses
- [ ] TypeScript types for input/output
- [ ] Unit tests with various scenarios
- [ ] Example usage code

**Business Value:**
Продавцы смогут прогнозировать затраты и выбирать оптимальный склад/дату.

---

### Story 11.4: Сравнение тарифов остаток vs поставка (MEDIUM)

**Backlog Task:** `task-8.4`
**File:** `docs/stories/11.4.tariff-comparison.md`

**Deliverables:**
- [ ] `compareTariffs(warehouseName: string, date: string)` utility
- [ ] Integration with TariffsModule (box/pallet tariffs)
- [ ] Strategy recommendation (FBW | FBS | EQUAL)
- [ ] Percentage difference calculation
- [ ] Unit tests
- [ ] Example usage code

**Business Value:**
Продавцы смогут принимать обоснованные решения о стратегии хранения товаров.

---

## Acceptance Criteria for Epic Completion

### Foundation
- [x] SuppliesModule class created and exported from SDK (via OrdersFbwModule)
- [x] All 4 API endpoint methods implemented
- [x] TypeScript types generated from OpenAPI schemas
- [x] Rate limiting configured (6 req/min, 10s interval)

### Utilities
- [x] `calculateSupplyCost()` implemented and tested (30 tests)
- [x] `compareSupplyCosts()` implemented and tested (included in calculateSupplyCost)
- [x] `compareTariffs()` implemented and tested (12 tests)

### Quality
- [x] Unit test coverage ≥80% (81 tests total)
- [x] Integration tests with MSW
- [x] JSDoc documentation with examples
- [x] No TypeScript errors in strict mode

### Integration
- [x] Module integrated into main SDK export (`sdk.ordersFbw`)
- [x] Example code provided in `examples/supplies-planning.ts` ✅
- [x] README updated with Supplies module section ✅

---

## Technical Notes

### Coefficient Interpretation

```
coefficient = -1  → Приёмка недоступна (независимо от allowUnload)
coefficient = 0   → Бесплатная приёмка (оптимальное время)
coefficient = 1   → Базовая стоимость приёмки
coefficient > 1   → Множитель (2 = двойная стоимость)

Приёмка возможна только когда:
  (coefficient == 0 || coefficient == 1) && allowUnload == true
```

### Box Type IDs

| ID | Type | Description |
|----|------|-------------|
| 2 | Короба | Стандартная упаковка |
| 5 | Монопаллеты | Паллетная поставка |
| 6 | Суперсейф | Защищённая упаковка |
| - | QR-поставка | boxTypeID не возвращается |

### Rate Limiting

Все endpoints имеют одинаковый лимит:
- **6 запросов в минуту**
- **Интервал: 10 секунд между запросами**
- **Всплеск: 6 запросов** (можно отправить 6 сразу, потом ждать)

---

## Dependencies

### Depends On
- Epic 1 Complete (BaseClient, rate limiting, error handling)
- TariffsModule (for tariff comparison utility)

### Related Modules
- **TariffsModule** — тарифы на остаток (`/api/v1/tariffs/box`, `/api/v1/tariffs/pallet`)
- **OrdersFBWModule** — может потребоваться рефакторинг для избежания дублирования

---

## Risk Management

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| API rate limit changes | LOW | MEDIUM | Configurable rate limits |
| Coefficient calculation changes | LOW | HIGH | Version-aware calculations |
| Integration with TariffsModule | MEDIUM | LOW | Loose coupling via interfaces |

---

## Related Documents

- [Backlog Task: EPIC 11](../../backlog/tasks/task-8%20-%20EPIC-11-Supplies-Module-Тарифы-на-поставку.md)
- [Story 11.1: Acceptance Coefficients](../../backlog/tasks/task-8.1%20-%20Story-11.1-Получение-коэффициентов-приёмки.md)
- [Story 11.2: Acceptance Options](../../backlog/tasks/task-8.2%20-%20Story-11.2-Получение-опций-приёмки-для-товаров.md)
- [Story 11.3: Cost Calculator](../../backlog/tasks/task-8.3%20-%20Story-11.3-Калькулятор-прогноза-затрат-на-поставку.md)
- [Story 11.4: Tariff Comparison](../../backlog/tasks/task-8.4%20-%20Story-11.4-Сравнение-тарифов-остаток-vs-поставка.md)
- [Swagger Source](../../wildberries_api_doc/07-orders-fbw.yaml)
- [Official WB Documentation](https://dev.wildberries.ru/openapi/orders-fbw)

---

**Created:** 2026-01-25
**Status:** Draft - Ready for Implementation
**Estimated Complexity:** Medium (2-3 weeks)
**Dependencies:** Epic 1 Complete, TariffsModule
