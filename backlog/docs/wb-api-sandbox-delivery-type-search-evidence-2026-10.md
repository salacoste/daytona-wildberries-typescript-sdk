# Evidence supplement: Sandbox DBS `deliveryType` search — 2026-10-11

**Scope:** read-only public-contract research for `POST /api/v3/test/dbs/orders/make`.
This is an evidence supplement, not a new SDK contract or implementation plan.

**Retrieved:** `2026-10-11T16:18:13Z` (UTC).  The WB portal pages do not expose a
document-version identifier or downloadable immutable OpenAPI asset in the retrieved
material, so the retrieval time and exact URLs are the reproducibility anchors.

## Result

The retrieved WB material gives enough official evidence to confirm the special sandbox
base URL, request shell, success status, and sandbox rate limit.  It does **not expose**
a public machine-readable or rendered schema for the newly announced
`deliveryType` property.  In particular, its type, allowed values, requiredness,
nullable flag, default, and exact placement remain unproven.  Do not add a typed SDK
field or serialize a guessed value from this evidence.

The retrieved official community notice says that `deliveryType` was added to this
request, while the retrieved operation-page fragment renders only `orders` and
`address`.  The retrievers do not provide a provable documentation-version relationship
or cache age for the two pages, so this is a retrieval-time documentation discrepancy,
not proof of a publication/cache cause or proof that the field does not exist.

## Official WB evidence

### 1. Operation page

Source: [Seller API Test Environment — Marketplace DBS](https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment)

The independently retrieved operation fragment contains the following source text
(formatting normalized only for Markdown):

```text
Create Test DBS Assembly Orders
post /api/v3/test/dbs/orders/make
https://marketplace-api-sandbox.wildberries.ru /api/v3/test/dbs/orders/make

Request Body schema: application/json
required
orders required | Array of objects [ 1 .. 10 ] items
address | object
Delivery address of the assembly order.
If no address is specified, the default address is used —
Москва, Сумская улица, 6 к 5, 5545

Responses
204 Success
400 Bad request
401 User not authorized
403 Access denied
409 Conflict
429 Too many requests
```

The rendered request **example** contains `orders[].sku`, `orders[].amount`, and
`address` members `region`, `locality`, `street`, `houseNumber`, `entrance`,
`intercom`, `floor`, and `apartment`:

```json
{
  "orders": [{ "sku": "SKUTest123", "amount": 1 }],
  "address": {
    "region": "Челябинская область",
    "locality": "Архангельское",
    "street": "переулок Солнечный",
    "houseNumber": "8А к 1",
    "entrance": "5",
    "intercom": "4857",
    "floor": "4",
    "apartment": "18"
  }
}
```

The source text describes `orders` as the array of item SKUs and inventory quantities.
The success response is **204 No Content**; no success JSON-response schema was exposed
by the retrieved page.

The same retrieval rendered error **examples** for `400`, `401`, `403`, `409`, and
`429`, including:

```json
{ "code": "IncorrectParameter", "message": "Incorrect parameter" }
```

It did not expose complete per-status JSON Schemas.  A separately indexed official
result omitted `401` from its displayed list.  The sources do not let this research
prove why they differ, so consumers should not encode an exhaustive error-body union
from the retrieved material.

**What is explicitly absent from this source fragment:** no `deliveryType` row, no
`enum`, no `type`, no required/optional marker, no `nullable`, no `default`, and no
reference to an `orders` item schema that can be independently dereferenced.  The
default documented here applies to the whole `address` object when omitted; it is not
a `deliveryType` default.

### 2. Official change notice

Source: [RN: Изменения в песочнице Маркетплейс](https://dev.wildberries.ru/forum/topics/2663/rn-izmeneniia-v-pesochnitse-marketpleis)
— `2026-10-08` was returned as `publish_date` metadata by the public retriever; that
date is not asserted here as text independently visible on the page.

Exact relevant announcement text:

```text
Добавили параметр `deliveryType` — тип доставки — в запрос метода
POST /api/v3/test/dbs/orders/make.
```

This establishes only that `deliveryType` belongs in that request.  It does not publish
the field's JSON-schema constraints or values.  It also does not supply the DBS-to-PVZ
or EDBS purpose claim; that purpose remains attributable only to the supplied intake,
which has no publication date/year and is not restated here as official portal evidence.

### 3. Sandbox category contract and rate limit

Source: [Sandbox — WB API](https://dev.wildberries.ru/en/sandbox)

The DBS row names the test-scope URL as:

```text
https://marketplace-api-sandbox.wildberries.ru
```

and its limitation text says:

```text
Test methods for DBS orders are available.
Maximum 1 request per second for every method.
Specifying the label identifiers for the assembly order is optional.
```

Therefore the evidence-supported operation URL is:

```text
POST https://marketplace-api-sandbox.wildberries.ru/api/v3/test/dbs/orders/make
```

The `1 request per second` statement is an official sandbox DBS category limit, not an
inference from the production DBS API.  The optional-label statement does not establish
anything about `deliveryType` optionality.

## Evidence matrix

| Contract point | Result | Official basis |
| --- | --- | --- |
| Operation / route | Confirmed: `POST /api/v3/test/dbs/orders/make` | Operation page |
| Sandbox host | Confirmed: `https://marketplace-api-sandbox.wildberries.ru` | Operation page and sandbox category page |
| Authorization shape | `HeaderApiKey` is rendered by the operation page; the surrounding sandbox documentation uses Test-scope tokens | Operation page / sandbox portal |
| Top-level request | Required JSON request; `orders` required, 1–10 items; `address` documented optional | Operation page |
| Existing item fields visible in sample | `orders[].sku`, `orders[].amount` | Operation page |
| Address behavior | `address` is an object; its omission uses the documented Moscow default address | Operation page |
| Success | `204`, no response body schema rendered | Operation page |
| Error statuses | `400`, `401`, `403`, `409`, `429` in one retrieved extraction; exact response schemas not exposed there | Operation page |
| `deliveryType` placement | Confirmed only as being “in the request”; whether top-level or nested is **unresolved** | 2026-10-08 official notice |
| `deliveryType` type / enum / required / nullable / default | **Unresolved** | No property schema in current rendered operation page or notice |
| Rate limit | 1 request/second for every DBS sandbox method | Sandbox category page |

## Bounded retrieval ledger

Purpose-built public retrievers were used before any direct HTTP retry; no direct HTTP
retry was performed in this pass.

| Tool | Exact input / URL | Outcome and evidentiary use |
| --- | --- | --- |
| `mcp__codex_apps__parallel_search_web_search` | `"POST /api/v3/test/dbs/orders/make"`; `"postV3TestDbsOrdersMake"`; `site:dev.wildberries.ru sandbox environment deliveryType DBS` | Located the canonical official sandbox page and sandbox category page. Search excerpts are locators only. |
| `mcp__codex_apps__search_service_web_run` | `site:dev.wildberries.ru/forum/topics/2663 "deliveryType"`; `site:dev.wildberries.ru "postV3TestDbsOrdersMake" "deliveryType"`; `site:dev.wildberries.ru "deliveryType" "/api/v3/test/dbs/orders/make"` | Located official page/cache material and the official forum notice. Search result text is not used as a schema source. |
| `mcp__perplexity__perplexity_search` | `Locate official Wildberries Developer Portal documentation or immutable OpenAPI source for POST /api/v3/test/dbs/orders/make operationId postV3TestDbsOrdersMake...` | Locator only; claims from the synthesis were not treated as contract proof. |
| `mcp__codex_apps__parallel_search_web_fetch` | `https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment`; `https://dev.wildberries.ru/en/sandbox`; `https://dev.wildberries.ru/forum/topics/2663/rn-izmeneniia-v-pesochnitse-marketpleis`; `https://dev.wildberries.ru/en/release-notes` | Retrieved the quoted official operation, limit, and change-notice fragments. `allow_live_fetch: true` was requested, but this provider can return indexed/cached material; it is therefore called a retrieval, not a guaranteed live origin response. |
| `mcp__context7__resolve_library_id` | Library name `Wildberries API`; official operation-schema query | Resolved the official corpus ID `/websites/dev_wildberries_ru`. |
| `mcp__context7__query_docs` | Corpus `/websites/dev_wildberries_ru`; query `POST /api/v3/test/dbs/orders/make deliveryType` | Returned `orders`, optional `address`, and 204 success, without a `deliveryType` property schema. Supplemental official-doc retrieval. |
| `mcp__codex_apps__parallel_search_web_fetch` | `https://dev.wildberries.ru/docs/openapi-other/sandbox-environment/marketplaceDbs/operation/postV3TestDbsOrdersMake`; `https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment/marketplaceDbs/operation/postV3TestDbsOrdersMake` | Both URLs returned `404` from this fetcher. The canonical category page above was retrievable. |
| `mcp__github__search_code` | Exact `"postV3TestDbsOrdersMake"`; exact `"/api/v3/test/dbs/orders/make"`; exact pair `"deliveryType" "test/dbs/orders/make"` | Each completed with `total_count: 0`. This says only that the public GitHub index had no exact result at retrieval time; it is not evidence that no public repository or schema exists. |

No live sandbox/production request, token read, browser login, CAPTCHA interaction, or
credential access was performed.  The earlier fixed third-party OpenAPI snapshot remains
supplemental only; its absence of this operation cannot negate the later official notice.

## Integration boundary

The current evidence supports a future **sandbox-only** route base and its documented
request shell, but it does not support an SDK field definition for `deliveryType`.
Wait for WB to publish a property-level operation schema (or a versioned/downloadable
OpenAPI document containing the operation) before choosing a TypeScript type, enum,
optionality, serialization placement, or synthetic tests for the new field.  This report
makes no production-readiness claim.
