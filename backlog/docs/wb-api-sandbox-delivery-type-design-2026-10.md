# TASK-226 — sandbox DBS delivery type design

**Date:** 2026-10-11
**Status:** accepted local implementation design
**Evidence basis:** the official rendered contract captured in
`wb-api-news-2026-10-official-schema-completion.md`; no sandbox or production API
request was executed.

## Decision

Add one method to the existing module:

```typescript
ordersDBS.createTestOrders(
  request: CreateTestDbsOrdersRequest
): Promise<void>
```

The method always posts to:

```text
https://marketplace-api-sandbox.wildberries.ru/api/v3/test/dbs/orders/make
```

Users create a separate `WildberriesSDK` instance with their provided
Test-scope token and `tokenType: 'test'`. The SDK gains no new namespace,
constructor mode, subpath export, base-URL switch, credential override, or
production order-creation route.

## Rationale

The route is a single DBS operation and its request/response concepts belong to
the existing `ordersDBS` module. A new sandbox namespace or SDK constructor
would expand public architecture for one method and create routing and
credential configuration that the official contract does not require.

A literal fixed URL keeps the production/sandbox boundary reviewable. It also
prevents `baseUrls` configuration from accidentally redirecting this mutation
to a production marketplace host. The separate SDK instance makes token
ownership explicit without allowing per-call credential injection.

The return type is `Promise<void>` because the visible official operation
documents success as HTTP 204 and no response body. This is documentation
modelling, not an observed runtime response.

## Evidence-supported request model

- `orders` is required and contains 1–10 items.
- Each item requires `sku: string` and `amount: integer`.
- The only displayed amount bound is `maximum: 10`; there is no displayed
  minimum.
- `deliveryType` is a top-level string with values `dbs`, `dbsPickupPoint`, and
  `edbs`. It has no displayed required badge and displays `Default: dbs`.
- `address` is a top-level object with no displayed required badge. When
  omitted, the operation description documents a Moscow default address.
- Present addresses require string fields `region`, `locality`, `street`, and
  `houseNumber`; `entrance`, `intercom`, `floor`, and `apartment` are optional
  strings.

The client therefore models `deliveryType` and `address` as optional and does
not inject either default. It uses a string literal union and does not add
`null`. Runtime validation enforces only the visible order cardinality,
integer amount, and amount maximum. It deliberately adds no amount minimum,
SKU/address length rule, or string pattern.

This optionality is an evidence-based client interpretation of the rendered
badges plus documented defaults. It is not a claim that the hidden raw schema
contains a particular `required` list or `nullable: false`, and it is not proof
that the server applied either documented default at runtime.

## Retry safety

Operation metadata registers `ordersDBS.createTestOrders` with:

```text
readonly: false
category: marketplace
rateLimitKey: sandbox-dbs.createTestOrders
```

`RequestOptions` gains an optional `operationKey`. `BaseClient.post()` forwards
that value to the existing `RetryHandler`; calls that omit it retain their
legacy behavior. The sandbox method supplies its key, so a transient network,
5xx, or 429 failure is surfaced after the first attempt and cannot create
duplicate test orders through an automatic retry.

## Rate limiting

`sandbox-dbs.createTestOrders` is configured as 60 requests/minute, one-second
interval, burst one, and penalty multiplier one. The `sandbox-dbs` Basic/Test
category multiplier is exactly one because the published sandbox limit already
describes Test-scope use. This prevents the general Test-token scaling code
from reducing the limit a second time to one request/minute.

## Local OpenAPI placement

The local root, raw stopgap, shared schemas, and a dedicated
`sandbox-dbs.yaml` shard carry the request contract. The shard has the sandbox
host at both document and path level. The root/raw operation also has an
explicit path-level sandbox server, so it cannot inherit or imply the
production marketplace host.

The special sandbox operation is not added to, or presented as copied from,
the ordinary official DBS raw YAML. The official public DBS YAML checked during
research does not contain this route; the local contract is derived from the
official rendered operation.

## Known evidence limits

- No raw sandbox OpenAPI asset was exposed.
- Hidden raw `required` and `nullable` flags remain unknown.
- No sandbox token, authorization attempt, mutation, 204 response, default
  application, or rate-limit behavior was exercised.
- No production API request was made.
