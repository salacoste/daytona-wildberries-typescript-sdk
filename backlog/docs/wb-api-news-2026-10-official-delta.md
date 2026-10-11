# WB API October 2026: direct official contract delta

**Date:** 2026-10-11
**Tasks:** TASK-219, TASK-224
**Status:** implemented and locally verified; tasks remain In Progress pending independent review and the external gates below.

## Source evidence and bounded decisions

This delta uses the direct rendered official evidence recorded in
`backlog/docs/wb-api-news-2026-10-official-headful-supplement.md`. No seller,
production, or sandbox API call was made for this implementation.

Only two unequivocal displayed facts were integrated:

1. `GET /api/content/v2/directory/okpd/all` displays `locale` values `ru` and `en`,
   while subject-specific `GET /api/content/v2/directory/okpd` displays only `ru`.
   The SDK now exposes separate public locale types for those boundaries.
2. `POST /api/v3/dbs/orders/client` displays its top-level response `orders` as
   "Array of objects or null". The public response type and all three local OpenAPI
   copies now accept `null`.

The official full-OKPD2 documentation displays `search` as `number` while its prose
describes dotted text. The SDK continues to use `number`; documentation records the
official ambiguity and does not invent string normalization.

The existing directory response `additionalErrors: string | null` was already correct
and was not broadened to unrelated error responses. No optionality or nullability was
inferred for DBS phone fields from missing UI badges.

## Exact changes

### Products

- `src/types/products.types.ts`: added public `OkpdFullDirectoryLocale = 'ru' | 'en'`;
  retained `OkpdDirectoryLocale = 'ru'` for the subject-specific endpoint; assigned the
  new type only to `GetDirectoryOkpdAllOptions.locale`; documented the official `search`
  mismatch without changing its numeric type.
- `src/index.ts`: exported `OkpdFullDirectoryLocale` from the supported package root.
- `wildberries_api_doc/02-products.yaml`,
  `wildberries_api_doc/02-products/kategorii-predmety-i-kharakteristiki.yaml`, and
  `docs/api-reference/raw-yaml/02-products.local-stopgap.yaml`: changed only the full
  OKPD2 locale enum to `[ru, en]`; the subject-specific enum remains `[ru]`.
- `tests/unit/modules/products-news-2026-10.test.ts`: compiled the new root export,
  retained the negative subject-specific English case, and exercised English on the
  full-directory request.
- `tests/unit/modules/products-openapi-contract.test.ts`: asserted the full-directory
  `ru`/`en` enum across root, shard, and raw copies.
- `docs/modules/products.md` and `docs/ru/guides/working-with-product-cards.md`: documented
  the distinct locale boundaries and the unresolved official number-versus-dotted-text
  ambiguity.

### Orders DBS

- `src/types/orders-dbs.types.ts`: changed `GetClientInfoResponse.orders` to
  `DBSClientInfo[] | null` while preserving its existing optional property boundary.
- `wildberries_api_doc/04-orders-dbs.yaml`,
  `wildberries_api_doc/04-orders-dbs/_schemas.yaml`, and
  `docs/api-reference/raw-yaml/04-orders-dbs.local-stopgap.yaml`: added `nullable: true`
  only to `DbsOnlyClientInfoResp.properties.orders`.
- `tests/unit/modules/orders-dbs.test.ts`: added a synthetic `null` response passthrough
  and package-root compile contract.
- `tests/unit/modules/orders-dbs-openapi-contract.test.ts`: added root/shard/raw parity
  coverage for the nullable top-level collection.
- `docs/modules/orders-dbs.md` and `docs/ru/guides/orders-dbs-getting-started.md`:
  documented the directly confirmed top-level null alternative while retaining the
  phone-field raw-metadata qualification and privacy guidance.

### Task records

- TASK-219 and TASK-224 were reopened from Done to In Progress before source edits.
- Delta-specific implementation-plan entries and implementation notes were appended
  through the Backlog CLI. They are intentionally not marked Done.

## Fresh verification

- `npx vitest run tests/unit/modules/products-news-2026-10.test.ts tests/unit/modules/products-openapi-contract.test.ts tests/unit/modules/orders-dbs.test.ts tests/unit/modules/orders-dbs-openapi-contract.test.ts`
  — 4 files passed, 87 tests passed.
- `npm run type-check` — passed.
- Scoped ESLint over the seven changed/new TypeScript source and test files — passed.
- Scoped Prettier check over changed source, tests, and hand-written docs — passed.
- `npm run validate:shards` — 60/60 clean.
- `npm run build` — passed; ESM, CJS, and declarations generated.
- `npm run validate:package` — 5 package export surfaces validated across 191 packed
  files.
- Built declaration inspection confirmed the package-root export of
  `OkpdFullDirectoryLocale`, the full-directory locale assignment, and
  `GetClientInfoResponse.orders?: DBSClientInfo[] | null`.
- `npm run validate:examples` — passed all 230 examples in its configured 46 files, but
  the command explicitly reports that the four edited Products/DBS hand-written guides
  are outside `docsToValidate`; no broader validator-scope change was made in this delta.

The repository-wide 2,555-test suite was not repeated because this delta has focused
module, compile-contract, OpenAPI parity, shard, build, and package evidence.

## Remaining gates

- Independent final review of this delta has not yet been completed.
- A version-pinned raw/full official schema comparison remains required before closing
  field-level optionality/nullability claims that the rendered UI does not expose,
  including the two DBS phone arrays.
- WB's official full-OKPD2 `search` number-versus-dotted-text inconsistency remains
  unresolved; the current numeric contract is deliberately preserved.
- No authenticated production, seller-account, or sandbox contract execution was run.
- The earlier main-delivery Done state is superseded for TASK-219 and TASK-224 by this
  reopened In Progress delta and its remaining gates.

## Subsequent official raw Swagger reconciliation

The rendered observations above remain accurate dated evidence. A later same-date
capture of WB's official public raw Swagger, recorded in
`backlog/docs/wb-api-news-2026-10-official-raw-contracts.md`, exposed one source
conflict: raw `02-items.yaml` declares `GET /api/content/v2/directory/okpd/all`
`locale` as `[ru]`, while the rendered page displayed `ru`, `en`. The SDK and its
root/shard/raw local OpenAPI copies now follow the exact machine-readable request
contract and narrow `OkpdFullDirectoryLocale` to `ru`. This reconciliation does not
claim that WB runtime rejects `en`; no live API call was made.

The same raw capture closes the previously open Products GTIN, Finance, and DBS
phone/order property gates. It confirms optional non-null GTIN strings, required
non-null Finance strings with a date-formatted `utdUcdDate`, optional non-null DBS
phone arrays, and nullable DBS `orders`. Public Finance members remain optional only
as a documented compatibility accommodation for selective `fields` projections.

## Final integration follow-up

The historical 60-shard, 191-file package, 46-file example-validator, and 2,555-test
results above remain accurate for this earlier bounded delta. The final composed
integration later passed 61/61 shards, 193 packed files across 5 exports, 50 configured
documentation files with 378 examples, and 2,577 default-suite tests across 89 files
with 1 skipped. The four changed Products/DBS EN/RU guides are now inside configured
example validation. `TASK-219` and `TASK-224` stay In Progress only for the already
pending composed review; their raw source gates are closed. No successful live proof
was added.
