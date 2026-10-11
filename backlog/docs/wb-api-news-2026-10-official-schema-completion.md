# WB API October 2026 — official-schema completion handoff

**Retrieved:** 2026-10-11 (Europe/Moscow)
**Purpose:** close only the remaining public-documentation questions needed to implement the sandbox DBS make-order request without guessing. This is documentation evidence, not a seller, production, or sandbox runtime test.

## Outcome

The public WB portal now supplies a complete **rendered** request contract for the part of `POST /api/v3/test/dbs/orders/make` that had remained unexpanded: the item properties, the address-object properties, and `deliveryType`. It is sufficient to model the request body from the visible contract while preserving the source limits below.

The portal did **not** expose a public raw OpenAPI asset for the special sandbox operation. Its publicly loaded DBS Swagger YAML is an authentic official asset, but it has no `/api/v3/test/dbs/orders/make` path and therefore cannot replace the sandbox document as evidence for this route.

No API request was made. No seller account, token value, browser attachment, existing user profile, stored cookies, raw request headers, JWT, or tokenized URL was accessed or retained.

## Retrieval method and provenance

One fresh named session used the installed Playwright CLI with headed full Chrome and its own temporary profile:

```text
playwright-cli -s=wb-official-schema-20261011 open \
  https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceDbs/operation/postV3TestDbsOrdersMake \
  --headed --browser=chrome --profile=/tmp/wb-official-schema-20261011.tnskaE
```

The first ordinary page load returned HTTP 498. After the normal 30-second bootstrap wait, the page redirected normally to the English official documentation and rendered the operation. No challenge UI was clicked or modified. The same one session then used ordinary public navigation to inspect the relevant GTIN update operation and the portal's public Swagger link. This is not an attached user browser or a reused profile.

Official WB sources:

- [Seller API Test Environment — Create Test DBS Assembly Orders](https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment#tag/marketplaceDbs/operation/postV3TestDbsOrdersMake)
- [Seller API Test Environment / Sandbox](https://dev.wildberries.ru/en/sandbox)
- [Item Management — Update Listings](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate)
- [DBS — Buyer information](https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersClient)
- [Documents and Accounting](https://dev.wildberries.ru/docs/openapi/documents-and-accounting)
- [Item Management](https://dev.wildberries.ru/en/docs/openapi/item-management)

The directly rendered pages are a dated portal snapshot: 2026-10-11. The portal did not show a document revision identifier for the sandbox operation.

## Direct official displayed contract: sandbox DBS make order

The operation header visibly renders:

```text
POST https://marketplace-api-sandbox.wildberries.ru/api/v3/test/dbs/orders/make
Authorizations: HeaderApiKey
Request Body schema: application/json required
204 Success
```

The page introduction also states that sandbox authorization uses a token with the **Test** scope. The sandbox-category page states that DBS test methods are available at `https://marketplace-api-sandbox.wildberries.ru` and have a maximum of **1 request/second for every method**. These are route/category documentation facts; no token was supplied and no method was executed.

### Top-level request members

| Member | Directly rendered type / constraint | Directly rendered badge / default / enum | Evidence-safe implementation reading |
|---|---|---|---|
| request body | JSON | body is `required` | A body is required for the operation. |
| `orders` | array of objects, **1..10 items** | `required` | Send one through ten order objects. |
| `deliveryType` | string | no displayed `required` badge; `Default: dbs`; enum `dbs`, `dbsPickupPoint`, `edbs` | A literal default and the three values are displayed. The missing badge does not prove a raw `required` array or nullability attribute. |
| `address` | object | no displayed `required` badge | Omission is documented to use the shown Moscow default address. No property-level `default` keyword is displayed for its members. |

The operation explains the enum labels as: `dbs` — Delivery By Seller; `dbsPickupPoint` — Delivery By Seller to Pickup Point; `edbs` — Express Delivery By Seller.

### `orders[]` item schema

After expanding the official `orders` row, the portal shows:

| Member | Directly rendered type / bound | Directly rendered required badge | Notes |
|---|---|---:|---|
| `orders[].sku` | string | yes | Description: SKU. No string-length/pattern bound was rendered. |
| `orders[].amount` | integer, **`<= 10`** | yes | Description: quantity. No lower bound was rendered. |

The operation-level `orders` cardinality of 1..10 must not be silently converted into an item-`amount` minimum or maximum other than the visible `<= 10` bound.

### `address` object schema

Expanding the official `address` row renders the following members:

| Member | Directly rendered type | Directly rendered required badge |
|---|---|---:|
| `address.region` | string | yes |
| `address.locality` | string | yes |
| `address.street` | string | yes |
| `address.houseNumber` | string | yes |
| `address.entrance` | string | none displayed |
| `address.intercom` | string | none displayed |
| `address.floor` | string | none displayed |
| `address.apartment` | string | none displayed |

The literal description for the **whole `address` object** says to specify an unabbreviated delivery address and that, if no address is specified, the default address is `Москва, Сумская улица, 6 к 5, 5545`. It does not show a member-level default, a `nullable` attribute, a string length/pattern constraint, or an explicit raw required-array declaration.

### `deliveryType`: displayed literal versus OAS default semantics

The exact visible property row is:

```text
deliveryType | string | Default: dbs | Enum: dbs dbsPickupPoint edbs
```

The **literal WB document attribute** is therefore the displayed default `dbs`, not a demonstrated live-server result. The OpenAPI Initiative's [OpenAPI 3.0.3 Schema Object](https://spec.openapis.org/oas/v3.0.3.html#schema-object) says that `default` is the value assumed by the *consumer of the input* if none is provided, and that it must conform to the schema type. That supports treating `dbs` as the schema's documented omission value in generated/client-facing documentation. It does **not** establish a separate WB runtime experiment, does not turn an omitted property into a raw `nullable: false` assertion, and does not license inferring a raw OpenAPI `required` list from the UI's missing badge.

## Other official facts previously required by the October scope

The rows below combine the current session's direct GTIN ancestor check with the already recorded direct rendered official-page evidence in `wb-api-news-2026-10-official-headful-supplement.md`. They remain direct portal-display evidence, not a claim about hidden raw `nullable` values.

| Contract target | Direct official displayed fact | Handoff correction / limit |
|---|---|---|
| OKPD all `locale` | `GET /api/content/v2/directory/okpd/all` shows `locale: string`, `Default: ru`, values `ru`, `en`, and no displayed required badge. | The current SDK's ru-only value surface is too narrow for the displayed `en` value. Missing badge is not raw optionality proof. |
| DBS client response `orders` | `POST /api/v3/dbs/orders/client` response row renders **Array of objects or null**. | Model the union as array-or-`null`; do not replace it with a non-null array. |
| GTIN create | `POST /content/v2/cards/upload`: `[].variants[].gtin` renders as string and has no displayed required badge. | No displayed `or null`; no claim of hidden `nullable: false`. |
| GTIN create with merge | `POST /content/v2/cards/upload/add`: `cardsToAdd[].gtin` renders as string and has no displayed required badge. | Same limit. |
| GTIN list response | `POST /content/v2/get/cards/list`: `cards[].gtin` renders as string and has no displayed required badge; the page says it is returned only when an additional GTIN is specified. | Same limit. |
| GTIN update | The current session shows `POST /content/v2/cards/update` request body as **Array**; its element table contains `gtin: string` with no displayed required badge. Its direct ancestor is therefore **top-level `[].gtin`**, not an unproven `items[].gtin`. | This closes the previously unresolved update-body ancestor. No displayed `or null`; no claim of hidden `nullable: false`. |
| Finance detailed reports | Both detailed-report operations show `buyerTaxRegistrationReasonCode` required string, `utdUcdNumber` required string, and `utdUcdDate` required string `<date>`. | No `or null` display; required/type/format are the direct claims only. |
| DBS additional phones | In the DBS client response, `orders[].additionalPhones` and `orders[].replacementAdditionalPhones` both render as array of strings with no displayed required badge and no displayed `or null`. | Preserve absence/array handling according to the visible contract; do not invent property or item nullability. |

## Official public schema asset check

The portal's visible **Swagger → DBS** link loaded the following genuine public WB asset in this same isolated session:

| Asset | Retrieval result | Hash / scope result |
|---|---|---|
| `https://dev.wildberries.ru/api/swagger/yaml/en/05-dbs.yaml` | HTTP 200; `text/yaml; charset=utf-8`; 126,751 bytes | SHA-256 `b5f8ab9d9828757540cb9e7b230fa8c501ab5c1c02f788c2f15af595573c4f31`; it contains **no** `/api/v3/test/dbs/orders/make` path. |

This asset is an official public DBS document, but it is not a schema source for the special sandbox test operation. No raw sandbox YAML/JSON download, export link, or publicly loaded document asset containing that path was exposed by the sandbox page during this bounded pass. The rendered operation table above is therefore the controlling official source for the sandbox request shape.

## Clauses genuinely closed for TASK-226

- Sandbox host and exact route: closed.
- `HeaderApiKey` display and the portal's Test-scope-token instruction: closed as documentation facts.
- 1 request/second DBS sandbox-method category limit: closed.
- Required JSON request body, required `orders`, and 1..10 order objects: closed.
- `orders[].sku`: required string; no displayed length/pattern bound: closed.
- `orders[].amount`: required integer with displayed maximum 10; no displayed minimum: closed.
- `address`: object omission behavior and all eight displayed member type/badge facts: closed.
- `deliveryType`: top-level placement, string type, literal default `dbs`, enum `dbs | dbsPickupPoint | edbs`, and absent displayed required badge: closed.
- Success status `204`: closed.

## Remaining limits that must survive implementation

1. The browser UI does not expose the raw sandbox OpenAPI `required` array or any raw `nullable` values. Do not record `nullable: false`, an item-nullability rule, or an OpenAPI `required` set merely because the Redoc row lacks `or null` or lacks a badge.
2. The portal does not show a lower bound for `orders[].amount`, or string length/pattern constraints for `sku` and address members. Do not add guessed validation bounds.
3. The literal display `Default: dbs` is a schema/documentation default. It is not live proof of server behavior on omitted input.
4. No runtime request, authorization attempt, rate-limit test, 204 execution, or response-body observation was performed. `204` means the operation documentation has no success body to model; it is not an observed API response.
5. The public normal-DBS YAML hash is reproducibility evidence for that distinct asset only. It must not be cited as proof for the sandbox test route.

## Cleanup record

The standalone command `playwright-cli -s=wb-official-schema-20261011 close` completed successfully after inspection. The only profile used by this research remains confined to `/tmp/wb-official-schema-20261011.tnskaE`. It is deliberately retained rather than recursively deleted; no user profile or browser session was affected.

## Implementation follow-up

The final local implementation uses this visible contract through
`ordersDBS.createTestOrders(request)`, fixed sandbox routing, omission-preserving
optional `deliveryType`/`address`, 1–10 order validation, a dedicated 1 request/second
limiter, and operation-key retry suppression for the write. Types, root exports,
root/shard/raw local OpenAPI, EN/RU documentation, declarations, and mocked tests are
synchronized. The remaining limits above still apply: hidden raw flags, server-side
defaulting, HTTP 204 runtime behavior, and actual rate enforcement were not tested.
