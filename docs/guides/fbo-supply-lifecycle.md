---
title: 'FBO Supply Lifecycle (WB-Repricer Guide)'
description: 'Code-accurate developer guide for the FBO supply lifecycle: ordersFBS supply methods, status model, marking-validation gates, and an acceptance-reconciliation recipe.'
layout: doc
---

# FBO Supply Lifecycle — Developer Guide

Audience: teams automating FBO (Fulfilled By Operator) supplies against the Wildberries SDK.
Verified against SDK `main` (v4.1.0). Every method signature, type, and rate-limit note below was
read directly from the shipped source (`src/modules/orders-fbs/index.ts`, `src/modules/reports/index.ts`,
`src/modules/finances/index.ts`, and the corresponding `*.types.ts`).

## Contents

1. [Overview](#1-overview)
2. [Supply status model (important correction)](#2-supply-status-model-important-correction)
3. [List supplies: `supplies()` (and the `getSupplies()` alias)](#3-list-supplies-supplies-and-the-getsupplies-alias)
4. [Method reference table](#4-method-reference-table)
5. [Marking-validation gates (critical for `updateSuppliesDeliver`)](#5-marking-validation-gates-critical-for-updatesuppliesdeliver)
6. [Acceptance & «акт приёмки» (reconciliation recipe)](#6-acceptance--акт-приёмки-reconciliation-recipe)
7. [Rate limits summary](#7-rate-limits-summary)
8. [End-to-end example](#8-end-to-end-example)
9. [Related resources](#9-related-resources)

---

## 1. Overview

The FBO supply lifecycle is implemented entirely in **`sdk.ordersFBS`** and talks to
`marketplace-api.wildberries.ru/api/v3/supplies/*` (plus `…/api/marketplace/v3/supplies/*` for the
bulk order-attach and order-id lookup endpoints). All methods referenced in this guide live on
[`OrdersFBSModule`](/api/classes/OrdersFbsModule) — see the [Orders FBS module](/modules/orders-fbs)
page for the full surface.

> **Do NOT use `sdk.ordersFBW` for this lifecycle.** `ordersFBW` is a different, legacy "DBW" surface:
> it uses **numeric** supply IDs and exposes `deliverBulk(orderIds: number[])`, which operates on
> **order** IDs rather than supply IDs. The TRBX / Pass / Deliver lifecycle described here does not
> exist on `ordersFBW`. If you find yourself reaching for `ordersFBW`, you are on the wrong module.

A supply (поставка) is a named container you ship to a WB warehouse. You create it, attach assembly
tasks (orders) to it, optionally manage boxes (TRBX) and a warehouse pass (пропуск), transfer it to
delivery, then later reconcile what WB actually accepted. The sections below walk each step with the
exact signatures the SDK ships today.

---

## 2. Supply status model (important correction)

A common (but incorrect) assumption is that a supply carries a string status enum such as
`DRAFT → NEW → ACTIVE → SHIPPED → DELIVERED → CLOSED`. **The WB v3 supplies API does not expose a
supply-level `status` field.** There is no such enum on the `Supply` entity.

The lifecycle is **binary and time-stamped**, expressed through `done: boolean` plus timestamps:

```ts
// src/types/orders-fbs.types.ts:536
export interface Supply {
  /** Supply ID (e.g. "WB-GI-1234") */
  id?: string;
  /** Whether the supply is closed: false = open/active, true = closed/delivered */
  done?: boolean;
  /** Supply creation date (RFC3339) */
  createdAt?: string;
  /** Supply closing date (RFC3339) — set when delivered/closed */
  closedAt?: string;
  /** Supply scan date (RFC3339) — scanned at warehouse */
  scanDt?: string;
  /** Supply name */
  name?: string;
  /** Cargo type: 0 = unset, 1 = small, 2 = oversized, 3 = large */
  cargoType?: 0 | 1 | 2 | 3;
  /** Cross-border type: 0 = not cross-border, 1 = cross-border, null = unset */
  crossBorderType?: 0 | 1 | null;
  /** Destination warehouse ID; null if not specified */
  destinationOfficeId?: number;
  /** Whether this supply contains B2B orders. First order sets the flag; since
   *  2026-03-19, mixing B2B and non-B2B orders in one supply is rejected. */
  isB2b?: boolean;
  /** Whether you can dispatch the order to a pickup point (PVZ) */
  isPickupPointShipmentAllowed?: boolean;
  /** ID of the recommended warehouse for acceptance (Moscow & MO); 0 if not determined */
  recommendedWhId?: number;
}
```

### Effective supply lifecycle

1. `createSupply({ name })` → `done: false`, `createdAt` set.
2. Attach orders via `addOrdersToSupply(supplyId, { orders })` → cargo type locked from the first
   order; B2B flag locked (no B2B + non-B2B mixing since 2026-03-19).
3. `updateSuppliesDeliver(supplyId)` → `done: true`, `closedAt` set, **all assembly tasks in the
   supply move to `complete`**. This is the terminal open→closed transition; no new tasks can be
   added afterwards.

### Granular status lives at the assembly-task level

Per-task status is obtained from `getOrderStatuses({ orders })`, which returns
`OrderSupplierStatus` (and a WB-system `OrderWbStatus`):

```ts
// src/types/orders-fbs.types.ts:15-29
export type OrderSupplierStatus = 'new' | 'confirm' | 'complete' | 'cancel';
export type OrderWbStatus =
  | 'waiting' | 'sorted' | 'sold' | 'canceled' | 'canceled_by_client'
  | 'declined_by_client' | 'defect' | 'ready_for_pickup' | 'postponed_delivery'
  | 'accepted_by_carrier' | 'sent_to_carrier';
```

Build any "status machine" preconditions from **order statuses + `Supply.done`**, not from a
supply-level enum. For example, "this supply is fully assembled and ready to deliver" =
`Supply.done === false` AND every task returned by `getSupplyOrderIds(supplyId)` → `getOrderStatuses`
has `supplierStatus === 'confirm'`.

---

## 3. List supplies: `supplies()` (and the `getSupplies()` alias)

The shipped list method is:

```ts
// src/modules/orders-fbs/index.ts:639
sdk.ordersFBS.supplies(options?: GetSuppliesParams): Promise<SuppliesResponse>
// GET https://marketplace-api.wildberries.ru/api/v3/supplies
```

The request params are **cursor-based**, not status/date-based:

```ts
// src/types/orders-fbs.types.ts:184
export interface GetSuppliesParams {
  /** Maximum number of items to return */
  limit: number;
  /** Pagination cursor; set to 0 for the first request */
  next: number;
  [key: string]: unknown;
}

export interface SuppliesResponse {
  /** Pagination cursor for the next page (absent/undefined when exhausted) */
  next?: number;
  /** List of supplies */
  supplies?: Supply[];
}
```

> **Correction of a frequent assumption:** there is **no `status`, `dateFrom`, or `dateTo`** filter
> on this endpoint. Calls like `supplies({ status: 'ACTIVE' })` or `supplies({ dateFrom, dateTo })`
> will **not** filter server-side — those keys are silently ignored (the index signature accepts
> them but the WB API does not act on them).
>
> - **"Status" filtering is client-side** via `Supply.done`: `ACTIVE` ≈ `done === false`,
>   `CLOSED` ≈ `done === true`.
> - **Date filtering is client-side** on `createdAt` / `closedAt`.

### Fetch-all-open-supplies loop

```ts
// Fetch every *open* supply (the "ACTIVE" set)
let next = 0;
const open: Supply[] = [];
do {
  const page = await sdk.ordersFBS.supplies({ limit: 100, next });
  open.push(...(page.supplies ?? []).filter((s) => s.done === false));
  next = page.next ?? 0;
} while (next);
```

### Note on the `getSupplies()` alias

For naming consistency with the singular [`getSupply(supplyId)`](#4-method-reference-table), a thin
`getSupplies()` alias for `supplies()` is shipped (`src/modules/orders-fbs/index.ts`, alongside
`supplies()`). It delegates directly to `supplies()` — same endpoint, same `rateLimitKey`
(`orders-fbs.supplies`), identical results:

```ts
// identical to sdk.ordersFBS.supplies({ limit, next })
const { supplies } = await sdk.ordersFBS.getSupplies({ limit: 100, next: 0 });
```

Use whichever name reads better in your code; `getSupplies()` mirrors the `getSupply()` / `getSupplies()` pair.

---

## 4. Method reference table

All methods below are on `sdk.ordersFBS` unless noted. Signatures are reproduced verbatim from
`src/modules/orders-fbs/index.ts`.

| Method | Signature | HTTP / path | Key precondition |
|---|---|---|---|
| `supplies` | `(options?: GetSuppliesParams) => Promise<SuppliesResponse>` | `GET /api/v3/supplies` | Cursor pagination (`limit`+`next`); no status/date filter |
| `createSupply` | `(data: SupplyCreateRequest) => Promise<SupplyCreateResponse>` | `POST /api/v3/supplies` | Body is **only `{ name?: string }`** — no warehouse/date/type. Cargo type is inherited from the first order added |
| `getSupply` | `(supplyId: string) => Promise<Supply>` | `GET /api/v3/supplies/{id}` | `supplyId` is a string (e.g. `'WB-GI-1234'`) |
| `deleteSupply` | `(supplyId: string) => Promise<void>` | `DELETE /api/v3/supplies/{id}` | Only if **active (`done:false`) and has no assembly tasks** |
| `updateSuppliesDeliver` | `(supplyId: string) => Promise<void>` | `PATCH /api/v3/supplies/{id}/deliver` | **`supplyId` only — no request body.** Closes the supply, sets all tasks → `complete`. Throws `MetaValidationFailError` (409) on invalid marking; **a 409 costs 10× rate budget.** See [§5](#5-marking-validation-gates-critical-for-updatesuppliesdeliver) |
| `getSuppliesBarcode` | `(supplyId: string, options?: BarcodeParams) => Promise<BarcodeResponse>` | `GET /api/v3/supplies/{id}/barcode` | Only **after** transfer-to-deliver |
| `getSuppliesTrbx` | `(supplyId: string) => Promise<TrbxListResponse>` | `GET /api/v3/supplies/{id}/trbx` | Returns `{ trbxes: [{ id }] }` |
| `createSuppliesTrbx` | `(supplyId: string, data?: TrbxCreateRequest) => Promise<TrbxCreateResponse>` | `POST /api/v3/supplies/{id}/trbx` | **PVZ supplies only** (`isPickupPointShipmentAllowed`), and the supply must be open |
| `deleteSuppliesTrbx` | `(supplyId: string, data?: TrbxDeleteRequest) => Promise<void>` | `DELETE /api/v3/supplies/{id}/trbx` | Only **during assembly** (before deliver) |
| `createTrbxSticker` | `(supplyId: string, options?: BarcodeParams, data?: TrbxStickerRequest) => Promise<{ stickers?: TrbxStickers[] }>` | `POST /api/v3/supplies/{id}/trbx/stickers` | Returns QR stickers (580×400 px); format via `options.type` |
| `addOrdersToSupply` | `(supplyId: string, data: AddOrdersToSupplyRequest) => Promise<void>` | `PATCH /api/marketplace/v3/supplies/{id}/orders` | Bulk-attach assembly tasks; `data = { orders: number[] }` |
| `getSupplyOrderIds` | `(supplyId: string) => Promise<SupplyOrderIdsResponse>` | `GET /api/marketplace/v3/supplies/{id}/order-ids` | Returns `{ orderIds: number[] }` — the declared set for reconciliation (see [§6](#6-acceptance--акт-приёмки-reconciliation-recipe)) |
| `getOrderStatuses` | `(data: { orders: number[] }) => Promise<OrderStatusResponse>` | `POST /api/v3/orders/status` | Granular per-task status (`OrderSupplierStatus` + `OrderWbStatus`) |
| `getOrdersMetaBulk` | `(data: GetMetaMultiRequest) => Promise<OrdersMetaResponse>` | `POST /api/marketplace/v3/orders/meta` | Max 100 order IDs; **pre-flight for marking validation** before `updateSuppliesDeliver` |
| `getOrdersReshipment` | `() => Promise<ReshipmentResponse>` | `GET /api/v3/supplies/orders/reshipment` | Tasks needing reshipment (scanned at reception but with unscanned items) |
| `createPass` | `(data: PassCreateRequest) => Promise<PassCreateResponse>` | `POST /api/v3/passes` | Warehouse-visit credential; **independent of any supply**. Valid 48h |
| `updatePass` | `(passId: number, data: PassCreateRequest) => Promise<void>` | `PUT /api/v3/passes/{passId}` | Full-name length 6–100; car number letters+digits only |
| `deletePass` | `(passId: number) => Promise<void>` | `DELETE /api/v3/passes/{passId}` | — |
| `passes` | `() => Promise<Pass[]>` | `GET /api/v3/passes` | Lists all seller passes |
| `getPassesOffices` | `() => Promise<PassOffice[]>` | `GET /api/v3/passes/offices` | Warehouses that require a pass (periodically re-sync) |

Request/response bodies referenced above are all optional-fielded in the SDK:

```ts
export interface SupplyCreateRequest { name?: string; }      // :134
export interface SupplyCreateResponse { id?: string; }       // :392
export interface AddOrdersToSupplyRequest { orders: number[]; } // :140
export interface SupplyOrderIdsResponse { orderIds?: number[]; } // :412
export interface GetMetaMultiRequest { orders: number[]; }   // :202  (max 100)
```

---

## 5. Marking-validation gates (critical for `updateSuppliesDeliver`)

`updateSuppliesDeliver` (transfer-to-deliver) is where WB enforces mandatory marking metadata. From
the shipped JSDoc (`src/modules/orders-fbs/index.ts:727-798`), the following validations are enforced
server-side:

| Validation | Enforced since |
|---|---|
| IMEI validation | 2026-03-31 |
| UIN validation | 2026-04-07 |
| Marking code for **B2B** orders | 2026-04-09 |
| **B2C «Честный Знак»** marking codes (GS separator `0x1D` + crypto-tail) | 2026-06-03 |

On failure the SDK throws a typed **`MetaValidationFailError`** (HTTP **409**) carrying a
`metaDetails[]` array. Each `metaDetail` has `{ key, value, decision }` where `decision` is one of
`filled | optional | required | invalid`.

> **⚠️ Rate-limit penalty:** each 409 response counts as **10 requests** against your FBS
> supply/order rate-limit budget. Pre-flight validation is not just hygiene — it protects budget.

### Pattern A — pre-flight via `getOrdersMetaBulk` (cheap, no 10× penalty)

Validate before delivering; only call `updateSuppliesDeliver` when nothing is `required`/`invalid`.

```ts
import { MetaValidationFailError } from 'daytona-wildberries-typescript-sdk';

const orderIds = (await sdk.ordersFBS.getSupplyOrderIds('WB-GI-1234')).orderIds ?? [];
const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: orderIds });

const blocking = (meta.orders ?? []).flatMap((o) =>
  (o.metaDetails ?? []).filter((d) => d.decision === 'required' || d.decision === 'invalid'),
);

if (blocking.length) {
  console.log('Fix metadata before delivering:', blocking.map((d) => d.key));
} else {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234'); // safe to close
}
```

### Pattern B — typed catch (when you deliver first and react)

```ts
import { MetaValidationFailError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
} catch (err) {
  if (err instanceof MetaValidationFailError) {
    err.metaDetails.forEach((d) => console.log(d.key, d.value, d.decision));
  }
  throw err;
}
```

For the full marking-code story (GS1 separators, crypto-tails, IMEI/UIN/GTIN attaches), see the
[FBS marking-code validation guide](/guides/fbs-marking-code-validation).

---

## 6. Acceptance & «акт приёмки» (reconciliation recipe)

This section answers the recurring question: *"Is `reports.acceptanceReport` the FBO act-of-acceptance
(акт приёмки / расхождения)?"* — **No.** Be precise about what each report is.

### 6.1 `reports.acceptanceReport` = «Платная приёмка» (paid acceptance), NOT the act-of-acceptance

`sdk.reports.acceptanceReport` (`src/modules/reports/index.ts:268`) generates the WB **«Отчёт о
платной приёмке»** (paid-acceptance report), per its JSDoc and the OpenAPI tag `Platnaya-priyomka`.
It is **not** the cabinet's act-of-acceptance/discrepancy («акт приёмки / расхождения»,
packed-vs-accepted) report.

It is an **async-task** flow of three methods:

```ts
// 1. Create the report task
const task = await sdk.reports.acceptanceReport({
  dateFrom: '2026-07-01',
  dateTo: '2026-07-31',
});  // → CreateTaskResponse  ({ data: { task_id } })

// 2. Poll status until done
const status = await sdk.reports.getAcceptanceReportTaskStatus(task.data!.task_id!);
// status.data?.status === 'done'

// 3. Download rows
const rows = await sdk.reports.downloadAcceptanceReport(task.data!.task_id!);
// → AcceptanceReportDownloadItem[]
```

**Params & limits:**

- `dateFrom` + `dateTo` **both required**, maximum 31-day window.
- **No `supplyId` filter** — you filter client-side after download (see recipe below).
- Rate limit: **1 request / minute** (the tightest in this domain — queue/space calls).

**Columns** (`AcceptanceReportDownloadItem`, `src/types/reports.types.ts:664`):

```ts
export interface AcceptanceReportDownloadItem {
  count?: number;          // количество (accepted quantity)
  giCreateDate?: string;   // дата создания приёмки
  incomeId?: number;       // ID поставки  (← your supply correlation key)
  nmID?: number;           // артикул WB
  shkCreateDate?: string;  // дата создания ШК
  subjectName?: string;    // предмет
  total?: number;          // сумма
}
```

This report does **not** contain declared-vs-accepted deltas or order statuses. Those columns belong
to the act-of-acceptance/discrepancy report, which has no SDK wrapper (see §6.3).

### 6.2 `finances.getSalesReportsDetailed()` = realization report (financial reconciliation)

`sdk.finances.getSalesReportsDetailed()` (`src/modules/finances/index.ts:251`) is the **realization
report** (детализация к отчёту реализации, v1) — the replacement for the removed v5
`reportDetailByPeriod`. It is a **financial** reconciliation surface, ~70 fields per row, and
includes the supply correlation key `giId` (ID поставки), `nmId`, and `quantity`:

```ts
// POST https://finance-api.wildberries.ru/api/finance/v1/sales-reports/detailed
const rows = await sdk.finances.getSalesReportsDetailed({
  dateFrom: '2026-07-01',
  dateTo: '2026-07-31',
  limit: 100000,
  rrdId: 0,
  fields: ['giId', 'nmId', 'quantity', 'forPay', 'retailAmount'],
});
```

Use it for **money** reconciliation per supply (`giId`) + article (`nmId`) + quantity. Requires a
**Personal or Service** token (not Basic/Test). Rate limit: 1 req/min.

### 6.3 There is NO public SDK endpoint for a dedicated «акт приёмки / расхождения» report

There is currently **no SDK method** for the cabinet's act-of-acceptance/discrepancy report
(declared-vs-accepted delta per nm, "Исправить заказ"). That endpoint is a known gap awaiting a
WB-side spike. Until it ships, build the reconciliation **client-side** from the primitives that do
exist.

### 6.4 Client-side reconciliation recipe (declared vs accepted per supply)

Strategy:

- **Declared** = sum of order quantities for the supply, from `getSupplyOrderIds(supplyId)` →
  `orders()`/`getOrderStatuses()` (order quantities).
- **Accepted** = sum of `count` from `downloadAcceptanceReport` rows where `incomeId === supplyId`,
  grouped per `nmID`.
- **Delta** = declared − accepted (positive = under-accepted / discrepancy).

```ts
import type { Supply } from 'daytona-wildberries-typescript-sdk';

interface ReconciliationRow {
  nmID: number;
  declaredQty: number;
  acceptedQty: number;
  delta: number; // declared - accepted
}

async function reconcileSupply(
  sdk: import('daytona-wildberries-typescript-sdk').WildberriesSDK,
  supplyId: string,
  dateFrom: string,   // window must cover when the supply was accepted
  dateTo: string,
): Promise<ReconciliationRow[]> {
  // 1. DECLARED: order IDs in the supply → their quantities (via orders() lookup).
  //    Map order -> article/qty from the assembly-task list within the supply's window.
  const { orderIds } = await sdk.ordersFBS.getSupplyOrderIds(supplyId);
  const declaredByNm = new Map<number, number>();
  for await (const qtyByNm of lookupOrderQuantities(sdk, orderIds ?? [])) {
    for (const [nm, qty] of qtyByNm) {
      declaredByNm.set(nm, (declaredByNm.get(nm) ?? 0) + qty);
    }
  }
  // (lookupOrderQuantities resolves each orderId -> { nmID, quantity } via sdk.ordersFBS.orders()
  //  and/or getOrderStatuses(); implemented by the caller against their catalog mapping.)

  // 2. ACCEPTED: paid-acceptance report rows for THIS supply (client-side filter on incomeId).
  const task = await sdk.reports.acceptanceReport({ dateFrom, dateTo });
  await sdk.reports.getAcceptanceReportTaskStatus(task.data!.task_id!); // poll to 'done'
  const rows = await sdk.reports.downloadAcceptanceReport(task.data!.task_id!);

  const acceptedByNm = new Map<number, number>();
  for (const r of rows) {
    if (String(r.incomeId) === String(supplyId) && r.nmID != null) {
      acceptedByNm.set(r.nmID, (acceptedByNm.get(r.nmID) ?? 0) + (r.count ?? 0));
    }
  }

  // 3. DELTA per nm
  const nmIds = new Set<number>([...declaredByNm.keys(), ...acceptedByNm.keys()]);
  return [...nmIds].map((nmID) => {
    const declaredQty = declaredByNm.get(nmID) ?? 0;
    const acceptedQty = acceptedByNm.get(nmID) ?? 0;
    return { nmID, declaredQty, acceptedQty, delta: declaredQty - acceptedQty };
  });
}
```

> **Caveats:** (a) `acceptanceReport` has no `supplyId` filter and a 1/min limit, so for many
> supplies batch by date window and cache downloads. (b) `incomeId` is a `number` in the type, but
> compare it as a string against the string `supplyId` to avoid radix surprises. (c) The paid-
> acceptance report only covers items that went through acceptance; for **financial** reconciliation
> use `getSalesReportsDetailed` keyed by `giId`.

---

## 7. Rate limits summary

Rate limits are wired per method via `rateLimitKey`. The values below come from each method's JSDoc
`description_limit`; where the WB spec does not embed a table, defer to the method's JSDoc.

| Method(s) | Limit | Notes |
|---|---|---|
| `reports.acceptanceReport` | **1 req / 1 min**, burst 1 | Tightest in the lifecycle — space calls; consider a 1/min queue |
| `reports.getAcceptanceReportTaskStatus` | see method JSDoc | Polling endpoint |
| `reports.downloadAcceptanceReport` | see method JSDoc | One download per completed task |
| `finances.getSalesReportsDetailed` | 1 req / 1 min, burst 1 | Personal/Service token only |
| `updateSuppliesDeliver` | see method JSDoc | **409 marking failures count 10×** against budget |
| `getOrdersMetaBulk` | see method JSDoc | Max 100 order IDs per call |
| `supplies` / `getSupply` / `getSupplyOrderIds` / `getOrderStatuses` | see method JSDoc | Read paths |
| `createSupply` / `addOrdersToSupply` / `createSuppliesTrbx` / `deleteSuppliesTrbx` / `createTrbxSticker` / `deleteSupply` | see method JSDoc | Write paths |
| `createPass` / `updatePass` / `deletePass` / `passes` / `getPassesOffices` | see method JSDoc | Pass-management surface |

> When in doubt, read the `description_limit` block in each method's JSDoc in
> [`OrdersFBSModule`](/api/classes/OrdersFbsModule) — that is the source of truth.

---

## 8. End-to-end example

A single walkthrough using realistic IDs and the verified signatures. Assumes a PVZ-bound supply
with marking-relevant orders.

```ts
import {
  WildberriesSDK,
  MetaValidationFailError,
  RateLimitError,
} from 'daytona-wildberries-typescript-sdk';

async function fboSupplyE2E(sdk: WildberriesSDK) {
  // 1) Create the supply (name only — no warehouse/date/type).
  const { id: supplyId } = (await sdk.ordersFBS.createSupply({ name: 'FBO-2026-08-09-A' }))!;
  // e.g. supplyId === 'WB-GI-1234'

  // 2) Attach assembly tasks (orders) to the supply.
  const orderIds = [5012345, 5012346, 5012347];
  await sdk.ordersFBS.addOrdersToSupply(supplyId!, { orders: orderIds });

  // 3) PVZ supplies only: create boxes (TRBX).
  const { trbxIds } = (await sdk.ordersFBS.createSuppliesTrbx(supplyId!, { amount: 2 }))!;

  // 4) Print box stickers (QR, 580x400 png).
  const stickers = await sdk.ordersFBS.createTrbxSticker(
    supplyId!,
    { type: 'png' },
    { trbxIds: trbxIds ?? [] },
  );

  // 5) (Optional) warehouse pass — independent of the supply.
  const { id: passId } = (await sdk.ordersFBS.createPass({
    firstName: 'Ivan',
    lastName: 'Petrov',
    carModel: 'GAZelle',
    carNumber: 'A123BC77',
    officeId: 1,
  }))!;

  // 6) PRE-FLIGHT marking validation (cheap; avoids the 10x 409 penalty).
  const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: orderIds });
  const blocking = (meta.orders ?? []).flatMap((o) =>
    (o.metaDetails ?? []).filter((d) => d.decision === 'required' || d.decision === 'invalid'),
  );
  if (blocking.length) {
    throw new Error(`Fix marking metadata before deliver: ${JSON.stringify(blocking)}`);
  }

  // 7) Transfer to delivery — supplyId only, NO body. Closes supply; tasks -> complete.
  try {
    await sdk.ordersFBS.updateSuppliesDeliver(supplyId!);
  } catch (err) {
    if (err instanceof MetaValidationFailError) {
      console.error('Marking validation failed:', err.metaDetails);
    }
    throw err;
  }

  // 8) Now that the supply is in delivery, fetch its supply QR/barcode.
  const { barcode } = await sdk.ordersFBS.getSuppliesBarcode(supplyId!, { type: 'png' });

  // 9) Later — reconcile accepted vs declared (see §6.4 for the full helper).
  //    acceptanceReport is 1/min, so pick a window that covers acceptance time.
  // const recon = await reconcileSupply(sdk, supplyId!, '2026-08-09', '2026-08-15');
}
```

Notes on the flow:

- Steps 1–2 set cargo type and B2B flag from the first order; you cannot mix afterwards.
- Step 3 is **PVZ-only** (`Supply.isPickupPointShipmentAllowed === true`); skip it for warehouse-bound supplies.
- `getSuppliesBarcode` (step 8) is only valid **after** `updateSuppliesDeliver`.
- Wrap the whole thing in your own retry/backoff that **does not retry** `MetaValidationFailError`
  (409) — fix the metadata first. The SDK's retry handler already skips auth/validation errors.

---

## 9. Related resources

- [Orders FBS API Reference — `OrdersFBSModule`](/api/classes/OrdersFbsModule) — every supply method, full JSDoc, and rate-limit tables.
- [Orders FBS module overview](/modules/orders-fbs) — module page summarising the FBS surface.
- [FBS marking-code validation guide](/guides/fbs-marking-code-validation) — GS separators, crypto-tails, IMEI/UIN/GTIN, and `MetaValidationFailError` handling.
- [Migration to v4](/guides/migration-v4) — what changed across the v4 boundary (supply methods are unchanged v4.0.0 → v4.1.0).
- [Reports module](/modules/reports) — `acceptanceReport`, `paidStorage`, and the async-task report pattern.
- [Finances module](/modules/finances) — `getSalesReportsDetailed` (realization report) for financial reconciliation.
