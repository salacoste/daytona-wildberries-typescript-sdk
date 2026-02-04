# Epic 14: User Management Module

**Epic Goal**: Implement a new `userManagement` SDK module exposing 4 endpoints on the dedicated `user-management-api.wildberries.ru` domain, enabling sellers to programmatically manage team members -- invitations, access rights, listing, and deletion.

**Target Completion**: Epic 14.x (Stories 14.1-14.6)
**SDK Version**: 2.8.0
**Status**: TO DO

**Business Value**:
- Unlocks team management automation previously available only through the WB web interface
- Enables ERP/CRM integrations to provision and deprovision seller staff programmatically
- Access rights management via API allows audit trails and compliance workflows
- New dedicated domain (`user-management-api.wildberries.ru`) demonstrates SDK extensibility for future WB API expansions

---

## Epic 14 Overview

### Strategic Context

Wildberries expanded the General API specification (`wildberries_api_doc/01-general.yaml`) with a new "Upravlenie polzovatelyami prodavtsa" (Seller User Management) section. This adds 4 endpoints on a brand-new domain with 7 new schemas. The SDK currently has 12 modules; this epic adds module #13 (`userManagement`).

### Technical Context

**API Documentation**: `wildberries_api_doc/01-general.yaml` (lines 262-967)
**Base URL**: `https://user-management-api.wildberries.ru`

**New Endpoints:**

| Method | Path | Description | Rate Limit |
|--------|------|-------------|------------|
| POST | `/api/v1/invite` | Create invitation with access configuration | 1 req/s, burst 5 |
| GET | `/api/v1/users` | List active and invited users | 1 req/s, burst 5 |
| PUT | `/api/v1/users/access` | Update user access rights | 1 req/s, burst 5 |
| DELETE | `/api/v1/user` | Delete a user | 1 req/s, burst 10 |

**New Schemas (7)**:
- `Access` (enum with 14 access code values)
- `getUsersResponse` (paginated user list with nested `inviteeInfo`)
- `createInviteRequest` / `createInviteResponse`
- `updateUserAccessRequest` / `UserAccess`
- `errorResponse` (RFC 7807-compatible error structure)

### Dependencies

**Depends On:**
- Epic 1 Complete -- Foundation infrastructure (BaseClient, rate limiting, error handling)
- Epic 15 Recommended -- Story 15.2 (`application/problem+json` support) should land first, since User Management error responses use that content-type

**Depended On By:**
- No downstream epics currently depend on this module

---

## Story Breakdown

### Story 14.1: TypeScript Types for User Management Schemas (CRITICAL)

**Priority**: CRITICAL -- Foundation for module implementation
**Estimated Complexity**: MEDIUM
**Status**: TO DO
**Backlog Task**: `task-11.1`

**Description**: Generate TypeScript interfaces for all 7 new schemas from the User Management section of `01-general.yaml` (lines 658-967), plus helper types for query parameters.

**Key Deliverables**:
- `AccessCode` -- string union of 14 access code values (`balance`, `brands`, `changeJam`, `discountPrice`, `finance`, `showcase`, `suppliersDocuments`, `supply`, `feedbacksQuestions`, `questions`, `pinFeedbacks`, `pointsForReviews`, `feedbacks`, `wbPoint`)
- `AccessItem` -- `{ code: AccessCode; disabled: boolean }`
- `InviteeInfo` -- nested type with `phoneNumber`, `position`, `inviteUuid`, `expiredAt`, `isActive`
- `UserInfo` -- full user record with 13 fields including nested `inviteeInfo` and `access[]`
- `GetUsersResponse` -- `{ total, countInResponse, users: UserInfo[] }`
- `CreateInviteRequest` / `CreateInviteResponse`
- `UpdateUserAccessRequest` / `UserAccess`
- `ErrorResponse` -- `{ title, detail, requestId, origin, status }`
- `GetUsersParams` -- query parameters helper (`limit`, `offset`, `isInviteOnly`)

**Files Created**:
- `src/types/user-management.types.ts`

**Acceptance Criteria**:
- [ ] All 7 schema interfaces defined with correct required/optional fields
- [ ] AccessCode enum includes all 14 values from swagger
- [ ] Nested `inviteeInfo` type correctly modeled
- [ ] JSDoc comments derived from swagger descriptions
- [ ] File passes `tsc --noEmit` with strict mode
- [ ] Types exported from module barrel export

---

### Story 14.2: User Management Module Implementation (CRITICAL)

**Priority**: CRITICAL -- Core functionality
**Estimated Complexity**: HIGH
**Status**: TO DO
**Backlog Task**: `task-11.2`
**Depends On**: Story 14.1

**Description**: Create `UserManagementModule` class implementing all 4 endpoints, following the established pattern from `src/modules/general/index.ts`.

**Methods**:
- `createInvite(data: CreateInviteRequest): Promise<CreateInviteResponse>` -- POST `/api/v1/invite`
- `getUsers(params?: GetUsersParams): Promise<GetUsersResponse>` -- GET `/api/v1/users`
- `updateUserAccess(data: UpdateUserAccessRequest): Promise<void>` -- PUT `/api/v1/users/access`
- `deleteUser(userId: number): Promise<void>` -- DELETE `/api/v1/user?deletedUserID={userId}`

**Implementation Pattern**:
```typescript
import { BaseClient } from '../../client/base-client';
import type { CreateInviteRequest, CreateInviteResponse, ... } from '../../types/user-management.types';

export class UserManagementModule {
  constructor(private client: BaseClient) {}

  async createInvite(data: CreateInviteRequest): Promise<CreateInviteResponse> {
    return this.client.post<CreateInviteResponse>(
      'https://user-management-api.wildberries.ru/api/v1/invite',
      data,
      { rateLimitKey: 'userManagement.createInvite' }
    );
  }
  // ...
}
```

**Files Created**:
- `src/modules/user-management/index.ts`

**Acceptance Criteria**:
- [ ] All 4 methods implemented with correct HTTP method and URL
- [ ] All methods use `user-management-api.wildberries.ru` domain
- [ ] Each method includes `rateLimitKey` option
- [ ] Full JSDoc with `@throws`, `@example`, `@see` tags
- [ ] Module exported as named and default export

---

### Story 14.3: Rate Limits Configuration (MEDIUM)

**Priority**: MEDIUM -- Required for production safety
**Estimated Complexity**: LOW
**Status**: TO DO
**Backlog Task**: `task-11.3`
**Depends On**: Story 14.2

**Description**: Create rate limit configuration file for User Management endpoints, following the pattern from `src/config/general-rate-limits.ts`.

**Rate Limit Values (from swagger)**:

| Endpoint | Key | requestsPerMinute | intervalSeconds | burstLimit |
|----------|-----|-------------------|-----------------|------------|
| POST /api/v1/invite | `userManagement.createInvite` | 60 | 1 | 5 |
| GET /api/v1/users | `userManagement.getUsers` | 60 | 1 | 5 |
| PUT /api/v1/users/access | `userManagement.updateAccess` | 60 | 1 | 5 |
| DELETE /api/v1/user | `userManagement.deleteUser` | 60 | 1 | 10 |

**Files Created**:
- `src/config/user-management-rate-limits.ts`

**Files Modified**:
- `src/config/index.ts` (add re-export)
- Aggregated rate limits map (register new entries)

**Acceptance Criteria**:
- [ ] Rate limit config file created with all 4 endpoint entries
- [ ] Burst limits correct: 5 for invite/users/access, 10 for delete
- [ ] Keys match those used in `UserManagementModule` methods
- [ ] Registered in aggregated rate limits map
- [ ] Enforced at runtime (verified by test)

---

### Story 14.4: SDK Integration (HIGH)

**Priority**: HIGH -- Makes module accessible to consumers
**Estimated Complexity**: LOW
**Status**: TO DO
**Backlog Task**: `task-11.4`
**Depends On**: Story 14.2, Story 14.3

**Description**: Register `UserManagementModule` in the `WildberriesSDK` class and configure all exports.

**Changes Required**:

1. **`src/index.ts`**:
   - Import `UserManagementModule`
   - Add `public readonly userManagement: UserManagementModule` property
   - Initialize in constructor: `this.userManagement = new UserManagementModule(this.client)`
   - Re-export module class and all types
   - Re-export rate limit configuration

2. **`src/config/sdk-config.ts`** (if needed):
   - Verify `baseUrls` type supports `'userManagement'` key
   - Add default domain `https://user-management-api.wildberries.ru`

**Files Modified**:
- `src/index.ts`
- `src/config/sdk-config.ts` (potentially)
- `src/config/index.ts`

**Acceptance Criteria**:
- [ ] `sdk.userManagement` property accessible with correct types
- [ ] All user-management types re-exported from barrel
- [ ] `UserManagementModule` class re-exported
- [ ] All 12 existing modules unaffected -- no breaking changes
- [ ] Default domain configured for `userManagement`

---

### Story 14.5: Unit & Integration Tests (HIGH)

**Priority**: HIGH -- Quality assurance
**Estimated Complexity**: HIGH
**Status**: TO DO
**Backlog Task**: `task-11.5`
**Depends On**: Story 14.2, Story 14.4

**Description**: Write comprehensive unit tests (Vitest + mocked BaseClient) and integration tests (MSW) for all 4 User Management methods.

**Unit Test Coverage**:

| Method | Success Cases | Error Cases |
|--------|--------------|-------------|
| `createInvite` | Full access config; minimal (phoneNumber only) | 400 validation, 401 auth, 429 rate limit |
| `getUsers` | Default params; filtered (`isInviteOnly`); empty result | 401, 429 |
| `updateUserAccess` | Single user; batch update | 400 validation, 401, 429 |
| `deleteUser` | Valid userId | 400 invalid userId, 401, 429 |

**Integration Tests**:
- MSW handlers for `user-management-api.wildberries.ru` domain
- End-to-end flow: SDK instantiation through method call through response validation
- Fixtures from swagger examples (lines 371-563 of `01-general.yaml`)

**Files Created**:
- `tests/unit/modules/user-management.test.ts`
- `tests/integration/user-management.integration.test.ts`

**Acceptance Criteria**:
- [ ] Unit tests cover all 4 methods with success and error paths
- [ ] Error scenarios: 401, 429, 400 for each method
- [ ] MSW handlers configured for new domain
- [ ] Integration tests verify HTTP method, URL, headers, query params
- [ ] Test fixtures use realistic data from swagger
- [ ] All tests pass with `npm test`
- [ ] Coverage >= 80% for user-management module

---

### Story 14.6: Documentation & Examples (MEDIUM)

**Priority**: MEDIUM -- Developer experience
**Estimated Complexity**: MEDIUM
**Status**: TO DO
**Backlog Task**: `task-11.6`
**Depends On**: Story 14.4, Story 14.5

**Description**: Create API guide, runnable examples, and update overview documentation.

**Key Deliverables**:
- API guide: `docs/guides/user-management.md`
  - Endpoint reference table with rate limits
  - Access code reference table (all 14 codes with descriptions)
  - Code examples for each method
  - Common workflows: staff onboarding, access audit, access revocation
  - Error handling specifics
- Runnable examples: `docs/examples/user-management-examples.ts`
- Updated overview docs: `docs/PROJECT_STATUS_SUMMARY.md` (module count 12 to 13)

**Files Created/Modified**:
- `docs/guides/user-management.md` (new)
- `docs/examples/user-management-examples.ts` (new)
- `docs/PROJECT_STATUS_SUMMARY.md` (updated)
- `docs/index.md` (updated, if module list exists)

**Acceptance Criteria**:
- [ ] API guide with all 4 operations documented
- [ ] Access code reference table with all 14 enum values
- [ ] Rate limit summary table
- [ ] Runnable TypeScript examples for all methods
- [ ] Overview documentation updated (module count incremented)
- [ ] Follows existing style conventions in `docs/`

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `src/types/user-management.types.ts` | TypeScript interfaces for 7 schemas + helpers |
| `src/modules/user-management/index.ts` | Module class with 4 endpoint methods |
| `src/config/user-management-rate-limits.ts` | Rate limit configuration (4 entries) |
| `tests/unit/modules/user-management.test.ts` | Unit tests |
| `tests/integration/user-management.integration.test.ts` | Integration tests with MSW |
| `docs/guides/user-management.md` | API guide |
| `docs/examples/user-management-examples.ts` | Runnable TypeScript examples |
| `docs/epics/EPIC_14_USER_MANAGEMENT.md` | This EPIC summary |

### Modified Files
| File | Changes |
|------|---------|
| `src/index.ts` | Import, property, constructor init, re-exports for UserManagement |
| `src/config/index.ts` | Re-export `userManagementRateLimits` |
| `src/config/sdk-config.ts` | Default domain for `userManagement` (if needed) |
| `docs/PROJECT_STATUS_SUMMARY.md` | Updated module count and metrics |
| `docs/index.md` | Updated module list |
| `CHANGELOG.md` | v2.8.0 entry |
| `package.json` | Version bump to 2.8.0 |

---

## API Methods Summary

### New Methods (4)
| SDK Method | HTTP | Endpoint | Description |
|---|---|---|---|
| `userManagement.createInvite()` | POST | `/api/v1/invite` | Create invitation with access rights |
| `userManagement.getUsers()` | GET | `/api/v1/users` | List active and invited users |
| `userManagement.updateUserAccess()` | PUT | `/api/v1/users/access` | Update user access rights |
| `userManagement.deleteUser()` | DELETE | `/api/v1/user` | Delete a user from seller account |

### Access Codes Reference (14 values)
| Code | Description |
|------|-------------|
| `balance` | View balance and withdraw funds |
| `brands` | Manage brands |
| `changeJam` | Access to "Jam" subscription |
| `discountPrice` | Change prices and discounts |
| `finance` | Financial analytics |
| `showcase` | Manage showcase |
| `suppliersDocuments` | Platform documents |
| `supply` | Manage FBW supplies |
| `feedbacksQuestions` | Customer questions and reviews |
| `questions` | Customer questions |
| `pinFeedbacks` | Pin reviews |
| `pointsForReviews` | Points for reviews |
| `feedbacks` | Customer reviews |
| `wbPoint` | WB Point |

**Total SDK Modules After Epic**: 13 (12 existing + 1 new)

---

## Risk Assessment

### Low Risk
- Established module pattern (`GeneralModule` serves as direct template at 60 lines)
- Rate limit structure identical to existing modules
- Authentication uses same `HeaderApiKey` scheme as all other endpoints

### Medium Risk
- New domain (`user-management-api.wildberries.ru`) -- must verify `BaseClient` supports it correctly
- `DELETE /api/v1/user` uses query parameter (`deletedUserID`) instead of path parameter -- unusual pattern
- Nested `inviteeInfo` nullable field requires careful type modeling (`InviteeInfo | null`)

### High Risk
- Epic 15 Story 15.2 (`application/problem+json` support) should ideally land before this epic, since User Management error responses use that content-type for 401/429

### Mitigation
- Follow existing module patterns exactly to minimize integration risk
- Implement Story 14.1 (types) thoroughly with all edge cases before module implementation
- Coordinate with Epic 15 to ensure error handling supports the new content-type
- Integration tests with MSW will validate the full domain-to-response flow

---

## Backlog Task References

| Story | Backlog Task | Title |
|-------|-------------|-------|
| Epic 14 (parent) | `task-11` | EPIC 14: User Management Module |
| Story 14.1 | `task-11.1` | TypeScript Types for User Management Schemas |
| Story 14.2 | `task-11.2` | User Management Module Implementation |
| Story 14.3 | `task-11.3` | Rate Limits Configuration for User Management |
| Story 14.4 | `task-11.4` | SDK Integration -- Register User Management Module |
| Story 14.5 | `task-11.5` | Unit & Integration Tests for User Management |
| Story 14.6 | `task-11.6` | Documentation & Examples for User Management |

---

## Notes

- The User Management endpoints are defined in `wildberries_api_doc/01-general.yaml` (lines 262-967) under the existing General API spec, but use a separate domain
- The swagger spec defines error responses using `application/problem+json` (RFC 7807), which is a cross-cutting concern addressed in Epic 15 Story 15.2
- All 4 endpoints have consistent rate limits (1 req/s) but different burst limits (5 for most, 10 for delete)
- The `errorResponse` schema in User Management is structurally compatible with the RFC 7807 problem+json format being added in Epic 15
