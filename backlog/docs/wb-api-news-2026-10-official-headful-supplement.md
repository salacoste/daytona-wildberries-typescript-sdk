# WB API: supplement from an isolated headed-Chrome official-docs pass

**Date:** 2026-10-11
**Scope:** direct, read-only inspection of the rendered official WB API documentation. This supplement records only the browser evidence collected in this pass; it does not call any seller, production, or sandbox API method.

## Method and provenance

A fresh, named Playwright CLI session launched the installed **full Chrome** in headed mode with its own temporary profile:

```text
playwright-cli -s=wb-official-headful-20261011 open \
  https://dev.wildberries.ru/docs/openapi/item-management \
  --headed --browser=chrome \
  --profile=/tmp/wb-official-headful-20261011.8IzjJW
```

No user-browser attachment, stored-state/cookie import, login, token, credential, extension, proxy, stealth/fingerprint setting, or anti-bot control was used. The requested initial URL first returned HTTP 498. After the required full 30-second ordinary wait, WB's page performed its own normal challenge bootstrap (`create-token` changed from 498 to 200) and rendered documentation at [the official English Item Management page](https://dev.wildberries.ru/en/docs/openapi/item-management). No challenge UI was clicked or altered.

This proves that this **fresh, isolated, headed full-Chrome** pass reached the official rendered documentation after the normal wait. It does not characterize the previous pass beyond its recorded use of the default Playwright browser/profile; it does not call that earlier pass headless.

The portal was read as rendered on 2026-10-11. UI facts below use explicit `required` badges and displayed type text such as `string or null`; a missing `required` badge is reported only as a missing displayed badge, never as a claim that a field is optional or non-nullable.

## Direct official Item Management evidence

Primary page: [Item Management](https://dev.wildberries.ru/en/docs/openapi/item-management).

### Directory operations

All three operations below visibly use `https://content-api.wildberries.ru` and show the **Content** rate limit: **100 requests per minute, 600 ms interval, burst 5**. Their expanded HTTP 200 schemas render the same envelope:

| Field | Rendered required badge | Rendered type |
|---|---:|---|
| `data` | yes | Array of objects |
| `error` | yes | boolean |
| `errorText` | yes | string |
| `additionalErrors` | yes | string or null |

The `or null` text is direct evidence that `additionalErrors` is nullable in the rendered schema; it is not inferred from a sample.

| Official operation | Query schema rendered by the portal | Expanded `data[]` schema |
|---|---|---|
| [GET `/api/content/v2/directory/tnved/all`](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnvedAll) | `search`: integer, no displayed required badge, example `6106`, first digits and no more than 10 characters; `locale`: string, default `ru`, enum `ru`, `en`, no displayed required badge | `tnved`: required string; `description`: required string |
| [GET `/api/content/v2/directory/okpd`](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpd) | `subjectId`: required integer; `search`: string, no displayed required badge, works only with `subjectId`; `locale`: string, default `ru`, displayed value `ru`, no displayed required badge | `okpd2`: required string; `description`: required string |
| [GET `/api/content/v2/directory/okpd/all`](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpdAll) | `search`: number, no displayed required badge, example `61.06`; `locale`: string, default `ru`, displayed allowed values `ru`, `en`, no displayed required badge | `okpd2`: required string; `description`: required string |

The full OKPD2 operation itself says to enter initial digits separated by a dot while displaying `search` as `number`. That type/prose mismatch is an official-documentation ambiguity, so this report preserves it rather than normalizing it.

### Four rendered GTIN placements

For every GTIN row below, the rendered UI shows **`string`** and **no displayed `required` badge**. The UI did not expose an `or null` alternative or an explicit `nullable: false` value. Thus the type and missing displayed badge are direct facts; explicit underlying nullable/non-nullable metadata remains unknown from this view.

| Operation | Directly rendered placement | Direct portal wording |
|---|---|---|
| [POST `/content/v2/cards/upload`](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUpload) | `[].variants[].gtin`; the request body itself is a top-level array, each object contains required `subjectID` and a required `variants` array | Additional GTIN; the portal says it is for a previously used GTIN and restricts reuse across listings/item sizes. |
| [POST `/content/v2/cards/upload/add`](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd) | `cardsToAdd[].gtin` | Additional GTIN. |
| [POST `/content/v2/get/cards/list`](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList) | `cards[].gtin` in the expanded HTTP 200 response | The field is returned only when an additional GTIN is specified. |
| [POST `/content/v2/cards/update`](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate) | `gtin` directly in the update-listing object rendered by the request schema | Additional GTIN. |

The final update operation's visible ancestor/container was not established in this pass, so this report deliberately does not relabel it `items[].gtin`.

## Direct official Finance evidence

The formerly requested `financial-reports-and-accounting` route navigated normally to [Documents and Accounting](https://dev.wildberries.ru/docs/openapi/documents-and-accounting). Both expanded operations display host `https://finance-api.wildberries.ru`:

- [POST `/api/finance/v1/sales-reports/detailed/{reportId}`](https://dev.wildberries.ru/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId)
- [POST `/api/finance/v1/sales-reports/detailed`](https://dev.wildberries.ru/docs/openapi/documents-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed)

The same three fields appeared in both rendered response schemas:

| Field | Rendered required badge | Rendered type/format | Rendered Russian label |
|---|---:|---|---|
| `buyerTaxRegistrationReasonCode` | yes | string | КПП B2B-покупателя |
| `utdUcdNumber` | yes | string | Номер УПД или УКД |
| `utdUcdDate` | yes | string `<date>` | Дата УПД или УКД |

None of these rows displayed `or null`. This supports the displayed requiredness, type, and date format. It does not independently reveal an otherwise hidden OpenAPI `nullable: false` attribute.

## Direct official DBS evidence

On [DBS — POST `/api/v3/dbs/orders/client`](https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersClient), the portal visibly displays production host `https://marketplace-api.wildberries.ru/api/v3/dbs/orders/client` and sandbox host `https://marketplace-api-sandbox.wildberries.ru/api/v3/dbs/orders/client`.

Its HTTP 200 response schema has a top-level `orders` field rendered as **Array of objects or null**. After expanding that array item, both requested phone fields appear at **`orders[].additionalPhones`** and **`orders[].replacementAdditionalPhones`**:

| Field | Rendered required badge | Rendered type | Explicit null alternative |
|---|---:|---|---|
| `orders[].additionalPhones` | none displayed | Array of strings | none displayed |
| `orders[].replacementAdditionalPhones` | none displayed | Array of strings | none displayed |

The request body itself has a `required` body badge, while its `orders` row is rendered as `Array of integers` without a field-level required badge. That request-field detail does not change the response facts above. The fields' descriptions say that an empty value means no number is specified; that wording is not evidence that the fields or their array items are nullable.

## Direct official sandbox `deliveryType` evidence

The sandbox page was readily accessible in the same normal browser session, with no sandbox API request made: [POST `/api/v3/test/dbs/orders/make`](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceDbs/operation/postV3TestDbsOrdersMake).

The rendered request schema establishes the following direct facts:

| Property | Rendered placement | Rendered type | Rendered required badge | Rendered default | Rendered enum |
|---|---|---|---:|---|---|
| `deliveryType` | top-level request-body property, alongside `orders` and `address` | string | none displayed | `dbs` | `dbs`, `dbsPickupPoint`, `edbs` |

The operation is `POST https://marketplace-api-sandbox.wildberries.ru/api/v3/test/dbs/orders/make`. The request body is marked required, and `orders` is separately marked required; the `deliveryType` row is not. The portal describes the values as seller delivery, seller delivery to a pickup point, and express seller delivery. No conclusion about an invisible nullable/non-nullable attribute is made.

## What this pass genuinely closes, and what it does not

### Directly closed evidence gates

- The strict official-schema evidence for the three named Item Management directory operations is now available: hosts, rate limit, parameter presentation, response envelope, and required/type/null rendering.
- The direct official display for the four GTIN occurrences is now available: their visible schema locations, type, and absence of a displayed field-level `required` badge.
- The direct official display for the three Finance fields is now available in both detailed-report operations: type, required badge, and `<date>` format for `utdUcdDate`.
- The direct official display for the two DBS phone arrays is now available: `orders[]` placement, array-of-strings type, and no displayed `or null` or field-level required badge.
- The direct official sandbox display for `deliveryType` is now available: top-level placement, type, displayed enum, default, and missing displayed field-level required badge.

### Still unknown or deliberately not claimed

- This visual documentation pass did not expose raw OpenAPI `nullable` attributes for GTIN, Finance fields, DBS phone arrays, or `deliveryType`. A lack of `or null` display is not treated as proof of non-nullability.
- A missing displayed field-level `required` badge is not treated as a statement that a property is optional.
- No contract execution, seller-account operation, sandbox mutation, production API request, authentication, or live response validation occurred.
- The portal may change after 2026-10-11; this is a dated snapshot of rendered official documentation, not a version-pinned OpenAPI export.

## Cleanup record

The named headed-Chrome session and only its dedicated temporary profile are closed and removed after the inspection. No other browser session or profile is affected.
