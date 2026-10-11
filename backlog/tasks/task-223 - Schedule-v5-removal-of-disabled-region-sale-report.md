---
id: TASK-223
title: Schedule v5 removal of disabled region-sale report
status: To Do
assignee: []
created_date: '2026-10-11 15:33'
updated_date: '2026-10-11 15:33'
due_date: '2026-11-03'
labels:
  - reports
  - v5
  - on-hold
  - deprecation
dependencies: []
references:
  - TASK-222
  - >-
    https://dev.wildberries.ru/docs/openapi/reports#tag/salesByRegions/operation/getV1AnalyticsRegionSale
priority: medium
type: chore
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Track the breaking removal of the legacy regional-sales method for the next major version after its documented Wildberries shutdown and after 4.x migration guidance ships.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 The removal is performed only in v5 or later after the 2026-11-03 shutdown and after the 4.x deprecation task is complete.
- [ ] #2 The public method, obsolete rate-limit key, dead local OpenAPI path, and legacy-only documentation are removed together.
- [ ] #3 Migration documentation continues to explain Order Feed aggregation and semantic differences for consumers upgrading from 4.x.
- [ ] #4 Major-version type tests, lint, full relevant tests, OpenAPI validation, and package declaration/build smoke pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Keep this task on hold until v5 work begins and TASK-222 has shipped.
2. Reconfirm the endpoint shutdown and inventory public/internal consumers.
3. Remove the method and obsolete support surfaces as one breaking change while retaining migration guidance.
4. Run major-version compatibility review and complete repository verification.
<!-- SECTION:PLAN:END -->
