# WB API October 2026 — isolated official-browser supplement

**Retrieval date:** 2026-10-11 (Europe/Moscow)
**Evidence class:** direct, ordinary browser rendering attempt against the official WB documentation origin.
**Scope:** only the still-unclosed property/schema gates identified in `wb-api-news-2026-10-official-confirmation.md`: TASK-219, TASK-221, TASK-218, TASK-224, plus the conditional `deliveryType` check.

## Outcome

This one bounded browser attempt did **not** obtain an inspectable official OpenAPI schema. A fresh, isolated Playwright session with its default in-memory profile opened the official Item Management page below, then remained on Wildberries' visible anti-bot interstitial for the full 30-second SPA-render allowance:

- Visible title/text: `Что-то не так...` / `Подозрительная активность. Пожалуйста, подождите.`
- Main-document status: HTTP 498, both on initial navigation and the automatic retry.
- No account, browser attachment, persistent profile, cookie/state import, credentials, API token, extension, or user-cookie surface was used.
- The browser's request log shows the page itself invoked WB anti-bot endpoints during its automatic retry. No anti-bot control was clicked, altered, or bypassed. The session was then closed.

Because the documentation SPA never rendered, no operation was expanded, no publicly linked OpenAPI export was visible, and no schema fact below can be confirmed from a direct official browser view. This is an environment-specific access result; it does not establish removal or absence of any API field.

## Direct official-browser retrieval record

| Official source URL | Method and wait | Retrieval status | Directly visible result |
| --- | --- | --- | --- |
| [Item Management](https://dev.wildberries.ru/docs/openapi/item-management) | Ordinary navigation in fresh in-memory browser session; 30 seconds allowed for SPA bootstrap and automatic reload | **HTTP 498** | WB anti-bot interstitial only; no OpenAPI navigation, operation detail, response schema, rate-limit section, or export link was rendered. |

The following are official controlling URLs identified by the earlier report, but were **not separately fetched in this bounded pass**. Listing them makes the remaining evidence target precise; it is not evidence that their schemas were retrieved:

- [TN VED full directory](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnvedAll)
- [OKPD2 by subject](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpd)
- [OKPD2 full directory](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpdAll)
- [Create listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUpload)
- [Update listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate)
- [Create listing with merge](https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd)
- [List listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList)
- [Detailed report by ID](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId)
- [Detailed report by period](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed)
- [DBS buyer information](https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersClient)

## Schema-gate results

### TASK-219 — TN VED and OKPD2 directories

| Operation | Required direct official fact | Browser result |
| --- | --- | --- |
| TN VED full directory | Route, `search` type/requiredness, `locale` values/default, response envelope and items, host, rate/burst limits | **ABSENT / unsupported.** None of these fields or documentation sections rendered. |
| OKPD2 by subject | Route, `subjectId`, `search` type/requiredness, `locale` values/default, response envelope and items, host, rate/burst limits | **ABSENT / unsupported.** |
| OKPD2 full directory | Route, `search` type/requiredness, `locale` values/default, response envelope and items, host, rate/burst limits | **ABSENT / unsupported.** |

In particular, the prior snapshot's possible numeric-versus-string discrepancy for `okpd/all` `search` remains unresolved. This direct browser attempt supplies no basis to normalize or choose either candidate.

### TASK-221 — additional listing GTIN

| Required direct official fact | Browser result |
| --- | --- |
| `gtin` exact placement for create listings | **ABSENT / unsupported.** |
| `gtin` exact placement for update listings | **ABSENT / unsupported.** |
| `gtin` exact placement for create listing with merge | **ABSENT / unsupported.** |
| `gtin` exact placement for list-listings response | **ABSENT / unsupported.** |
| Each placement's type, requiredness, and nullability | **ABSENT / unsupported.** |
| Any official wording that a value is returned only when populated | **ABSENT / unsupported.** |
| Any official geographic/RF-only availability wording | **ABSENT / unsupported.** |

### TASK-218 — finance detailed-report fields

| Required response-property fact | Browser result |
| --- | --- |
| `buyerTaxRegistrationReasonCode`: presence, placement, type, requiredness, nullability | **ABSENT / unsupported.** |
| `utdUcdNumber`: presence, placement, type, requiredness, nullability | **ABSENT / unsupported.** |
| `utdUcdDate`: presence, placement, type, requiredness, nullability, and response date/date-time format | **ABSENT / unsupported.** |
| Whether both detailed-report operations share the relevant item schema / selection surface | **ABSENT / unsupported.** |

No conclusion is made from request-date documentation about `utdUcdDate`; a request parameter's examples cannot establish a response property's schema.

### TASK-224 — DBS buyer-contact arrays

| Required response-property fact | Browser result |
| --- | --- |
| `orders[].additionalPhones`: exact placement, array/item type, requiredness, nullability, and any empty-array meaning | **ABSENT / unsupported.** |
| `orders[].replacementAdditionalPhones`: exact placement, array/item type, requiredness, nullability, and any empty-array meaning | **ABSENT / unsupported.** |

### Conditional sandbox `deliveryType` gate

`deliveryType` was not visible in any rendered official documentation because the entry page did not progress past the anti-bot interstitial. Therefore its placement, type, enum, requiredness, and default are all **ABSENT / unsupported** in this supplement. No sandbox call was made.

## Boundary against earlier evidence

`wb-api-news-2026-10-official-confirmation.md` was used only to locate the exact unmet gates and controlling URLs. Its prior direct-HTTP/search-index results, user-supplied announcement context, and third-party snapshot references are historical or supplemental evidence; none is promoted here to direct official-schema proof. No third-party schema is labeled official in this report.

## Retrieval sufficiency and next evidence target

The ordinary-browser path is exhausted for this single bounded attempt. Strict source gates remain open. They require either a browser session that actually renders the expanded official operation schemas, or a publicly available WB-published and versionable OpenAPI export whose provenance and exact property declarations can be inspected. Until then, the requested `type`, `required`, `nullable`, item-type, default/enum, format, geographic wording, host, and rate assertions must remain unconfirmed.

No repository source, test, task, configuration, credential, or external account state was changed. This supplement is the sole authored research artifact for the attempt.
