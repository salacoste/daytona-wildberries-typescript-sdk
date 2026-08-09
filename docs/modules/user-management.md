# User Management Module

The **User Management** module manages users of a seller profile — creating invitations, listing active/invited users, updating per-section access rights, and removing users.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `userManagement` |
| **SDK Namespace** | `sdk.userManagement.*` |
| **Base URL** | `https://user-management-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/01-general.yaml` (Seller user-management endpoints) |
| **Methods** | 4 |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// 1. List active users (paginated)
const { total, users } = await sdk.userManagement.getUsers({ limit: 100, offset: 0 });

// 2. Invite a new user with section access
const invite = await sdk.userManagement.createInvite({
  invite: { phoneNumber: '+79991234567', position: 'Manager' },
  access: [
    { code: 'balance', disabled: false },
    { code: 'finance', disabled: true },
  ],
});
console.log(invite.inviteUrl);

// 3. Update access rights for an existing user
await sdk.userManagement.updateUserAccess({
  usersAccesses: [
    { userId: 12345, access: [{ code: 'finance', disabled: false }] },
  ],
});

// 4. Remove a user
await sdk.userManagement.deleteUser(12345);
```

---

## Methods Reference

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getUsers(params?)` | GET | `/api/v1/users` | List active or invited seller-profile users (paginated) |
| `createInvite(data)` | POST | `/api/v1/invite` | Create an invitation for a new user with access settings |
| `updateUserAccess(data)` | PUT | `/api/v1/users/access` | Update section access for one or more users |
| `deleteUser(deletedUserID)` | DELETE | `/api/v1/user` | Remove a user from the seller profile |

---

## Key Types

All types below are re-exported from the main SDK entry.

| Type | Description |
|------|-------------|
| `GetUsersParams` | `{ limit?, offset?, isInviteOnly? }` — pagination + invite-only filter |
| `GetUsersResponse` | `{ users: UserInfo[], total: number }` |
| `UserInfo` | Active or invited user (id, firstName, secondName, phone, role, …) |
| `CreateInviteRequest` | `{ invite: InviteeInfo, access?: AccessItem[] }` |
| `CreateInviteResponse` | Invitation result (`inviteID`, `inviteUrl`, …) |
| `UpdateUserAccessRequest` | `{ usersAccesses: UserAccess[] }` (each `UserAccess` = `{ userId, access: AccessItem[] }`) |
| `AccessItem` | `{ code: AccessCode, disabled: boolean }` — per-section permission |
| `AccessCode` | Section-code union (e.g. `balance`, `finance`, …) |

```typescript
import type {
  UserInfo,
  CreateInviteRequest,
  AccessCode,
} from 'daytona-wildberries-typescript-sdk';
```

---

## Rate Limits

| Operation | Limit | Interval | Burst |
|-----------|-------|----------|-------|
| `getUsers` / `createInvite` / `updateUserAccess` | 60 req/min | 1s | 5 |
| `deleteUser` | 60 req/min | 1s | 10 |

> `basic` / `test` tokens receive reduced limits automatically (set `tokenType` in `SDKConfig`).

---

## Related Resources

- [API Reference: UserManagementModule](/api/classes/UserManagementModule)
- [User Management Guide](/guides/user-management)
- [Official WB API — Seller user management](https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca)
