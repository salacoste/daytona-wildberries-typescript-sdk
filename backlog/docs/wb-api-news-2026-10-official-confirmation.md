# WB API October 2026 — bounded official-contract confirmation

**Retrieval date:** 2026-10-11 (Europe/Moscow)

**Scope:** `TASK-218`, `TASK-219`, `TASK-221`, and `TASK-224` only.
**Live API calls:** not made. No token, seller account, sandbox, or customer data was used. This is documentation-reference evidence, not runtime proof.

## Later source-gate closure

This report remains the dated result of its bounded retrieval method. It is superseded
for current source-gate status by
`backlog/docs/wb-api-news-2026-10-official-raw-contracts.md`: official public raw
Swagger assets later returned HTTP 200 and closed the Products directories/GTIN,
Finance, and DBS phone/order property gates with retained hashes and JSONPaths. The
earlier HTTP 498 observations below remain true for this retrieval attempt; they are
not the current overall evidence status and do not invalidate the later raw capture.

## Result

The selected official WB documentation pages remain the controlling sources, but this bounded retrieval **does not close a strict official-schema source gate** for the four tasks. The purpose-built web retrieval service was used for the five selected official documentation page families; direct opens of all five returned WB HTTP 498 on 2026-10-11. Its official-page search index did return operation-level material for Finance and DBS, but not the requested expanded response/property schemas. Therefore every unexposed property-level assertion below is marked **ABSENT**, rather than inferred from a sample, a notification, or the existing third-party snapshot.

This result does not contradict the implementation already present in the repository or the existing pinned snapshot. It says only that the requested strict evidence class — current, directly inspectable official OpenAPI schema for each property — was not obtained in this environment.

## Source classes and retrieval boundary

### Official WB reference pages — primary, selected scope

The following exact pages were requested through the purpose-built web retriever on 2026-10-11:

1. [Item Management, EN](https://dev.wildberries.ru/en/docs/openapi/item-management)
2. [Item Management, RU](https://dev.wildberries.ru/docs/openapi/item-management)
3. [Financial Reports and Accounting, EN](https://dev.wildberries.ru/en/docs/openapi/financial-reports-and-accounting)
4. [Financial Reports and Accounting, RU](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting)
5. [DBS, EN](https://dev.wildberries.ru/en/docs/openapi/dbs)

All five direct opens returned HTTP 498 (`Unknown Status Code`) in this retrieval environment. This is an access limitation; it is neither evidence that the operations have been removed nor evidence of an API response.

The same retriever's search index did expose these official, operation-level excerpts on 2026-10-11:

- [RU financial documentation](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting) identifies both `POST /api/finance/v1/sales-reports/detailed/{reportId}` and `POST /api/finance/v1/sales-reports/detailed`, with base `https://finance-api.wildberries.ru`. The period operation shows its request body and its `dateFrom` documentation; it does **not** show `buyerTaxRegistrationReasonCode`, `utdUcdNumber`, or `utdUcdDate` in the retrieved text.
- [EN financial documentation](https://dev.wildberries.ru/en/openapi/financial-reports-and-accounting) likewise identifies both detailed-report operations and the finance host. The indexed period-operation text says `dateFrom` accepts a date or a date-time in RFC3339-style examples. That concerns the request date and is not evidence of the response format of `utdUcdDate`.
- [RU release note 214](https://dev.wildberries.ru/release-notes?id=214) says the newer period detailed-report operation lets clients obtain only fields named in a request `fields` array. This establishes the *reason* to include supported response properties in a field-selection surface; it does not enumerate these three property names or their schemas.
- [EN DBS documentation](https://dev.wildberries.ru/en/openapi/orders-dbs) identifies `POST /api/v3/dbs/orders/client`, base `https://marketplace-api.wildberries.ru`, and a required request `orders` array of integer assembly-order IDs. Its indexed response sample contains earlier contact fields (`replacementPhone`, `phone`, `phoneCode`, `additionalPhoneCodes`) but no `additionalPhones` or `replacementAdditionalPhones` schema expansion. An omitted sample property is not a declaration of absence.

No publication date is asserted from search-index crawl/retrieval metadata. Where a date is shown in this report it is the retrieval date above, not an official news publication date.

### Official user-announcement evidence — narrower than an OpenAPI schema

The existing October intake records user-supplied WB announcement context for all four changes. This report does **not** promote that context into newly verified official web evidence: the search results that mentioned the changes did not provide an exact official WB source URL plus a property-level excerpt that could be retained here. Those results are therefore not used for any schema conclusion. The intake context remains distinct from OpenAPI evidence and cannot establish `required`, `nullable`, `type`, item schema, or `format` declarations.

### Supplemental source-reference — not an official gate closer

The pre-existing evidence register pins the public, third-party OpenAPI-derived snapshot:

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed`, retrieved previously on 2026-10-11 and described in [the existing contract register](wb-api-news-2026-10-official-contracts.md).

Its exact file/line citations below are retained only as candidate contract evidence. They do **not** establish that the current WB official documentation agrees, and do not close any strict official-schema AC.

## TASK-219 — TN VED and OKPD2 directories

**Controlling operation URLs:**

- [TN VED full directory](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnvedAll)
- [OKPD2 by subject](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpd)
- [OKPD2 full directory](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpdAll)

| Required confirmation | Official retrieval result on 2026-10-11 | Supplemental candidate only | Strict-official status |
| --- | --- | --- | --- |
| Exact routes | **ABSENT as current-page text.** The requested item-management pages were HTTP 498. | `/api/content/v2/directory/tnved/all`, `/api/content/v2/directory/okpd`, `/api/content/v2/directory/okpd/all`; `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/02-items.yaml:L1166-L1423`. | Not closed. |
| Host and Content token category | **ABSENT as current-page text.** | Candidate host `content-api.wildberries.ru` and Content-category wording in the same snapshot range. | Not closed. |
| `tnved/all` `search` type, `locale`, rate | **ABSENT.** | Candidate optional `search: integer`; candidate `locale` `ru`/`en`, default `ru`; candidate 100/min, 600 ms, burst 5. | Not closed. |
| `okpd` `subjectId`, `search`, `locale` | **ABSENT.** | Candidate required `subjectId: integer`, optional `search: string`, `locale: ru`. | Not closed. |
| `okpd/all` `search` and `locale` | **ABSENT.** | Candidate optional `search: number`, `locale: ru`. The previously recorded snapshot prose/example uses a dotted prefix, so its prose-versus-number conflict remains unresolved until the official schema is visible. | Not closed. |
| Success envelope and item properties | **ABSENT.** | Candidate required envelope keys `data`, `error`, `errorText`, `additionalErrors`; candidate TN VED entries `tnved: string`, `description: string`; OKPD2 entries `okpd2: string`, `description: string`. | Not closed. |

The pre-existing user-announcement context identifies these three directory capabilities, but this report did not obtain an exact official-page property excerpt for them. Do not turn the candidate numeric/string disagreement into an official fact or silently normalize the type.

**AC source-gate outcome:** the strict evidence portion of `TASK-219` AC #1 cannot be closed by this report. The task's existing checked state was not changed; a task owner/reviewer must reconcile it against an accessible official schema or an approved official WB artifact.

## TASK-221 — additional listing GTIN

**Controlling operation URLs:**

- [Create listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUpload)
- [Update listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate)
- [Create listing with merge](https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd)
- [List listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList)

| Required confirmation | Official retrieval result on 2026-10-11 | Supplemental candidate only | Strict-official status |
| --- | --- | --- | --- |
| `gtin` placement in the four operations | **ABSENT.** Both selected item-management pages were HTTP 498, and no indexed official operation expansion exposed this property. | `items[].variants[].gtin` for upload; `items[].gtin` for update; `cardsToAdd[].gtin` for upload/add; response `cards[].gtin` for cards/list. `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/02-items.yaml:L2311-L2314`, `L2962-L2965`, `L4094-L4097`, `L4405-L4408`. | Not closed. |
| `gtin` type, optionality, nullability | **ABSENT.** | Candidate non-required, non-null `string` at each placement. | Not closed. |
| Return-only-when-populated wording | **ABSENT.** | Candidate prose was recorded in the existing register, but no current official page text was retrieved. | Not closed. |
| Historical `skus` rule | **ABSENT from newly retrieved official evidence.** The existing user-provided announcement context states the historical rule, but this report did not obtain an exact attributable official URL and excerpt for it. | Same rule recorded in the pinned snapshot. | Not used to close a schema source gate. |
| RF-only availability | **ABSENT.** No retrieved official item-management text states the geographic restriction. | Candidate RF-seller-only prose in the pinned snapshot/existing register. | Not closed. |

**AC source-gate outcome:** the strict official-schema source requirement in `TASK-221` AC #1 cannot be closed by this report. This evidence review does not assess whether the existing JSDoc and EN/RU documentation implementation satisfies AC #3; AC #3 itself does not require an OpenAPI schema. The report does not alter the task or its checked boxes.

## TASK-218 — financial detailed-report buyer KPP and UPD/UKD fields

**Controlling operation URLs:**

- [Details by report ID](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId)
- [Details by period](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed)

The indexed official documentation confirms both operation paths and the finance host. The indexed release note confirms that the period operation deliberately exposes a request `fields` selection array. This is a valid selection rationale: if the three fields are supported response properties, they must be selectable where the API exposes a field selector. It is **not** proof that they are supported, required, nullable/non-nullable, or formatted in a particular way.

| Required response-property confirmation | Official retrieval result on 2026-10-11 | Supplemental candidate only | Strict-official status |
| --- | --- | --- | --- |
| `buyerTaxRegistrationReasonCode` | Field name appears in the provided announcement context; **type, requiredness, and nullability are ABSENT** from retrieved official schema text. | `string`, in the shared detailed-report response required set, non-null; `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/13-finances.yaml:L1258-L1267`, `L1644-L1656`. | Not closed. |
| `utdUcdNumber` | Field name appears in the provided announcement context; **type, requiredness, and nullability are ABSENT** from retrieved official schema text. | `string`, required and non-null in that snapshot. | Not closed. |
| `utdUcdDate` | Field name appears in the provided announcement context; **type, requiredness, nullability, and response format are ABSENT** from retrieved official schema text. The official indexed `dateFrom` request examples do not establish this response property's format. | `string`, `format: date`, required and non-null in that snapshot. | Not closed. |
| Both operations use the same response item | **ABSENT.** The index identifies both operations but does not expose their response schema reference. | Candidate shared `SalesReportsDetailedRes` item in the pinned snapshot. | Not closed. |

The unrelated acquiring `taxRegistrationReasonCode` was not researched or altered. No conclusion about it is made here.

**AC source-gate outcome:** `TASK-218` AC #1 cannot close from this report. Its future present/absent/null test matrix must wait for an accessible official schema because the difference between optional, required, nullable, and absent controls that matrix.

## TASK-224 — DBS buyer-contact arrays

**Controlling operation URL:** [DBS buyer information](https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersClient)

| Required confirmation | Official retrieval result on 2026-10-11 | Supplemental candidate only | Strict-official status |
| --- | --- | --- | --- |
| Operation and request shape | Indexed official EN documentation identifies `POST /api/v3/dbs/orders/client`, host `https://marketplace-api.wildberries.ru`, and a required request `orders` array of integer assembly-order IDs. | — | Confirmed only for the operation/request facts stated here. |
| `orders[].additionalPhones` placement/type/nullability | **ABSENT.** The indexed response sample does not display the property/schema. | Optional, non-null array of non-null `string`; `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/05-dbs.yaml:L340-L420`, `L2706-L2724`. | Not closed. |
| `orders[].replacementAdditionalPhones` placement/type/nullability | **ABSENT.** The indexed response sample does not display the property/schema. | Optional, non-null array of non-null `string` in the same snapshot range. | Not closed. |
| Empty-array semantics | **ABSENT.** | Candidate wording says an empty array means no number is provided. | Not closed. |

An official WB news/article search result describes DBS buyer information as returning additional contact numbers, but it does not supply the two exact property names and OpenAPI array/nullability declarations. The known older response-sample fields cannot safely be substituted for the newly announced fields.

**AC source-gate outcome:** `TASK-224` AC #1 cannot close from this report. The schema is required before deciding whether tests must cover absent values only, absent plus `null`, or arrays containing nullable elements. Until then, use no real phone data in any future test fixture.

## Handoff and stop condition

An implementation/review owner needs one of the following before treating these source gates as closed:

1. an accessible current official WB OpenAPI page with the expanded request/response schema for each named operation; or
2. an official WB-published, versioned OpenAPI export/artifact whose provenance, retrieval date, operation, property, `required`, `nullable`, `type`, item type, and `format` can be pinned.

Do not use a notification, response sample, crawler timestamp, or the third-party `eslazarev` snapshot as a substitute for that evidence. No repository source, task, test, index, configuration, credential, or external system was changed while preparing this report.
