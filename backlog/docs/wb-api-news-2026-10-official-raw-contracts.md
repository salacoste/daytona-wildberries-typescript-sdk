# WB API October 2026 — public raw Swagger contract closure

**Retrieved:** 2026-10-11 (Europe/Moscow); public assets fetched directly on the same date.
**Scope:** read-only, unauthenticated inspection of public WB Swagger YAML for the October Products, Finance, and DBS gates. This report does not call a seller, production, or sandbox API, and does not use a user profile, cookies, headers, token, credential, proxy, or stealth setting.

## Outcome

The public official raw OpenAPI gates for Products directories/GTIN, the three Finance detailed-report fields, and DBS buyer-phone arrays are now closed with WB-published OAS 3.0.1 YAML. The evidence below distinguishes raw YAML from the earlier official rendered-page observations.

The raw Product schema conflicts with the rendered Item Management page on one point: raw `GET /api/content/v2/directory/okpd/all` declares `locale` enum `[ru]`, while the 2026-10-11 headed-browser supplement recorded displayed `ru`, `en`. The raw asset is the exact machine-readable contract captured here; the UI observation must remain recorded as a genuine official-documentation conflict. Do not silently treat the existing `en` TypeScript value as raw-schema parity.

## Provenance and reproducibility

The public portal's visible Swagger menu linked the following official pages in a fresh browser session, without login:

- [Item Management Swagger](https://dev.wildberries.ru/en/swagger/items)
- [DBS Swagger](https://dev.wildberries.ru/en/swagger/dbs)
- [Documents and Accounting Swagger](https://dev.wildberries.ru/en/swagger/finances)

The directly retrievable public YAML assets were downloaded with ordinary unauthenticated HTTPS `GET`, parsed with the repository's installed `yaml` parser, and retained only in a dedicated temporary directory outside the repository. Each reports `openapi: 3.0.1`; WB supplies only a module label such as `info.version: items`, not an immutable document revision or publication timestamp.

| Module | Official public raw URL | HTTP | Bytes | SHA-256 |
| --- | --- | ---: | ---: | --- |
| Item Management | [02-items.yaml](https://dev.wildberries.ru/api/swagger/yaml/en/02-items.yaml) | 200 | 385,782 | `e2eef8712991355a44e5c28cdb96ad493a31775d18605f6b3263a3a84f0aa220` |
| DBS | [05-dbs.yaml](https://dev.wildberries.ru/api/swagger/yaml/en/05-dbs.yaml) | 200 | 126,751 | `b5f8ab9d9828757540cb9e7b230fa8c501ab5c1c02f788c2f15af595573c4f31` |
| Documents and Accounting | [13-finances.yaml](https://dev.wildberries.ru/api/swagger/yaml/en/13-finances.yaml) | 200 | 78,072 | `b2ef4fae9fa1601cc33942081fcd7d48ce5255101946ba014d9b5abd8f95cb96` |

The asset URLs are mutable WB endpoints. The hashes, retrieval date, byte counts, and JSONPaths make this dated observation reproducible; they do not turn the live URLs into immutable releases.

## Products: directories and additional GTIN

### Exact raw directory results

All three operations are in `02-items.yaml`. In each HTTP 200 envelope, `$..required` contains `data`, `error`, `errorText`, and `additionalErrors`; `additionalErrors` is `type: string`, `nullable: true`. Each item requires both its code field and `description`, and both are strings.

| Operation and raw JSONPath | Requiredness/type/nullability result | Repository comparison |
| --- | --- | --- |
| `GET /api/content/v2/directory/tnved/all`; `$.paths["/api/content/v2/directory/tnved/all"].get.parameters` | `search`: query, optional, `integer`; `locale`: optional, `string`, enum `ru`, `en`, default `ru`. Response code item: `data[].tnved: string`, required; `data[].description: string`, required. | `GetDirectoryTnvedAllOptions` and `TnvedDirectoryLocale = 'ru' | 'en'` match. |
| `GET /api/content/v2/directory/okpd`; `$.paths["/api/content/v2/directory/okpd"].get.parameters` | `subjectId`: query, required, `integer`; `search`: optional `string`; `locale`: optional `string`, enum `ru`, default `ru`. Response item `okpd2` and `description` are required strings. | `GetDirectoryOkpdOptions` and `OkpdDirectoryLocale = 'ru'` match. |
| `GET /api/content/v2/directory/okpd/all`; `$.paths["/api/content/v2/directory/okpd/all"].get.parameters` | `search`: optional `number` (example `61.06`); `locale`: optional `string`, enum **only** `ru`, default `ru`. Response item `okpd2` and `description` are required strings. | `search?: number` matches. `OkpdFullDirectoryLocale = 'ru' | 'en'` is wider than this raw asset. |

**Concrete raw-parity correction needed:** the active `src/types/products.types.ts` alias `OkpdFullDirectoryLocale = 'ru' | 'en'` and its matching modified local Product YAML currently permit `en`; the retrieved raw asset permits only `ru`. For exact raw-OAS parity, narrow that alias and the local raw YAML enum to `ru`. The earlier rendered page's `ru`, `en` display means this is an official-source conflict, not evidence that `en` is invalid at runtime. Preserve the discrepancy in release notes/tests if choosing compatibility over literal raw parity.

### Exact raw GTIN results

All four property nodes are `type: string`, have no property-level `nullable` keyword, and are absent from their immediate object schema's `required` array:

| Operation | Raw JSONPath to `gtin` | Immediate object `required` |
| --- | --- | --- |
| `POST /content/v2/cards/upload` request | `$.paths["/content/v2/cards/upload"].post.requestBody.content["application/json"].schema.items.properties.variants.items.properties.gtin` | `vendorCode` |
| `POST /content/v2/cards/upload/add` request | `$.paths["/content/v2/cards/upload/add"].post.requestBody.content["application/json"].schema.properties.cardsToAdd.items.properties.gtin` | `vendorCode` |
| `POST /content/v2/get/cards/list` 200 response | `$.paths["/content/v2/get/cards/list"].post.responses["200"].content["application/json"].schema.properties.cards.items.properties.gtin` | none |
| `POST /content/v2/cards/update` request | `$.paths["/content/v2/cards/update"].post.requestBody.content["application/json"].schema.items.properties.gtin` | `nmID`, `vendorCode`, `sizes` |

The raw descriptions also retain the previously rendered conditions: an additional GTIN must previously have occurred in `skus` of one seller listing, `skus` values are not reusable across listings or sizes, and the feature is for sellers in the Russian Federation; the list response says it is returned only when supplied.

For OpenAPI 3.0.x, `nullable` defaults to `false` when `type` is present ([OAS 3.0.1 Schema Object](https://spec.openapis.org/oas/v3.0.1.html#schema-object)). Thus these raw nodes do not admit JSON `null`; they are also not required members of their parent objects. The existing SDK `gtin?: string` placements are the compatible TypeScript representation. No `string | null` widening and no local historical/reuse validation are warranted.

## Finance: three detailed-report fields

Both routes use the same item schema:

- `$.paths["/api/finance/v1/sales-reports/detailed/{reportId}"].post.responses["200"].content["application/json"].schema.items.$ref` → `#/components/schemas/SalesReportsDetailedRes`
- `$.paths["/api/finance/v1/sales-reports/detailed"].post.responses["200"].content["application/json"].schema.items.$ref` → `#/components/schemas/SalesReportsDetailedRes`

In `$.components.schemas.SalesReportsDetailedRes.required`, all three field names are present. Their exact nodes are:

| Field / raw JSONPath | Type and metadata | Raw nullability |
| --- | --- | --- |
| `buyerTaxRegistrationReasonCode`; `$.components.schemas.SalesReportsDetailedRes.properties.buyerTaxRegistrationReasonCode` | `string`; “Tax registration reason code of B2B-buyer” | no `nullable`; OAS 3.0.1 default is non-null |
| `utdUcdNumber`; `$.components.schemas.SalesReportsDetailedRes.properties.utdUcdNumber` | `string`; “Universal transfer or adjustment document number” | no `nullable`; OAS 3.0.1 default is non-null |
| `utdUcdDate`; `$.components.schemas.SalesReportsDetailedRes.properties.utdUcdDate` | `string`, `format: date`; “Universal transfer or adjustment document date” | no `nullable`; OAS 3.0.1 default is non-null |

**Raw-contract effect:** a generated exact response model would make all three fields required and non-null strings, with `utdUcdDate` a date-formatted string.

**Conservative SDK compatibility exception:** the current `SalesReportDetailedItem` makes the three members optional. Both request schemas expose an optional `fields: string[]` selection parameter whose official description says it lists fields returned in the response; if absent, all fields are returned. Keeping `?:` for a consumer-facing projection model is therefore defensible, provided it is documented as a response-projection accommodation, not asserted as raw-OAS parity. The types already explain that rationale. Do not add `| null`; raw YAML does not support it.

## DBS: buyer phone arrays and `orders`

The raw operation is `POST /api/v3/dbs/orders/client` (`operationId: postV3DbsOrdersClient`). Its 200 response JSONPath is:

```text
$.paths["/api/v3/dbs/orders/client"].post.responses["200"].content["application/json"].schema
  → #/components/schemas/DbsOnlyClientInfoResp
$.components.schemas.DbsOnlyClientInfoResp.properties.orders
  = { type: array, nullable: true, items: { $ref: "#/components/schemas/DbsOnlyClientInfo" } }
```

`DbsOnlyClientInfo` declares no `required` array. Its two new phone nodes are exact matches for their names, array type, and explicit property non-nullability:

| Raw JSONPath | Required? | Type/item type | `nullable` metadata | Description consequence |
| --- | ---: | --- | --- | --- |
| `$.components.schemas.DbsOnlyClientInfo.properties.additionalPhones` | no (no parent required array) | `array` of `string` | array `false`; item omits `nullable` (OAS-default non-null) | Empty value means the number is not specified. No `minItems` is declared. |
| `$.components.schemas.DbsOnlyClientInfo.properties.replacementAdditionalPhones` | no (no parent required array) | `array` of `string` | array `false`; item omits `nullable` (OAS-default non-null) | Empty value means the number is not specified. No `minItems` is declared. |

`GetClientInfoResponse.orders?: DBSClientInfo[] | null` matches the raw nullable `orders` property, and `additionalPhones?: string[]` / `replacementAdditionalPhones?: string[]` matches the unrequired, non-null arrays. No TypeScript correction is required for these fields. The local DBS stopgap contains explicit `nullable: false` on array items; the freshly downloaded WB asset omits it, but the OAS 3.0.1 effective value is still non-null, so this is syntactic rather than semantic drift.

## Required follow-up versus compatibility choices

| Area | Exact raw finding | Change status |
| --- | --- | --- |
| Products `okpd/all.locale` | Official raw enum `[ru]`; current SDK/local YAML allow `ru | en`; earlier official rendering showed `ru`, `en`. | **Concrete raw-parity mismatch.** Reconcile deliberately; narrowing to `ru` achieves raw parity, retaining `en` is a documented compatibility choice pending WB clarification. |
| Products GTIN | Optional parent members, string, no null. | Existing `gtin?: string` is correct; do not add nulls or local history gates. |
| Finance fields | Raw `required`, non-null; date format for `utdUcdDate`. | Exact generated surfaces should mark them required. The public SDK's optional projection fields are a justified consumer-compatibility choice because `fields` may select the returned columns; do not label that as raw parity. |
| DBS phones and response orders | Phone arrays are unrequired, non-null; `orders` is nullable. | Existing TypeScript representation is compatible. No changes required. |

## Limits

1. This is a dated capture of mutable public URLs; WB gives no immutable version ID for these YAML files.
2. No runtime API behavior was tested. The raw schema does not establish a live response under every `fields` projection or every seller/account condition.
3. This closes only the three named public raw-schema gates. The special sandbox make-order route remains governed by the separately recorded rendered contract because `05-dbs.yaml` contains no `/api/v3/test/dbs/orders/make` path.
4. No source, task, spec, index, generated documentation, tests, staging area, or commit was modified by this evidence lane.
