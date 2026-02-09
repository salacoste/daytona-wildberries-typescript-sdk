---
title: User Management Guide
description: Complete guide to managing seller profile users, invitations, and access permissions using the Wildberries TypeScript SDK
layout: doc
---

# User Management Guide

This guide covers everything you need to know to manage users, create invitations, and control access permissions for your Wildberries seller profile.

## Table of Contents

- [What is User Management?](#what-is-user-management)
- [Key Capabilities](#key-capabilities)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Complete Workflow Example](#complete-workflow-example)
- [Access Codes Reference](#access-codes-reference)
- [API Methods](#api-methods)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Best Practices](#best-practices)
- [Related Resources](#related-resources)

## What is User Management?

The **User Management API** allows you to manage team access to your Wildberries seller profile. You can:

- **Invite new users** to collaborate on your seller account
- **Control permissions** for each user across 14 different sections
- **Monitor user activity** and track pending invitations
- **Revoke access** when team members leave

This is essential for businesses with multiple employees managing different aspects of their Wildberries operations (finance, customer support, inventory, etc.).

## Key Capabilities

| Feature | Description | Key Methods |
|---------|-------------|-------------|
| **Create Invitations** | Invite new users via phone number | `createInvite()` |
| **List Users** | View all active and invited users | `getUsers()` |
| **Update Permissions** | Modify user access to sections | `updateUserAccess()` |
| **Remove Users** | Delete user access completely | `deleteUser()` |

## Prerequisites

### SDK Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

### API Key Setup

You need a valid Wildberries API key with user management permissions. Create a `.env` file:

```bash
WB_API_KEY=your_api_key_here
```

### Import and Initialize

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function main() {
  // List all users on your seller profile
  const users = await sdk.general.getUsers();
  console.log(`Total users: ${users.total}`);

  for (const user of users.users) {
    console.log(`- ${user.firstName} ${user.secondName} (${user.email})`);
    console.log(`  Role: ${user.role || 'pending'}`);
    console.log(`  Is Owner: ${user.isOwner}`);
  }
}

main();
```

## Complete Workflow Example

This example demonstrates the full user management lifecycle: inviting a user, listing users, updating permissions, and removing a user.

### Step 1: Create an Invitation

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { AccessCode, AccessItem } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function inviteNewUser() {
  // Define access permissions for the new user
  const accessPermissions: AccessItem[] = [
    { code: 'feedbacksQuestions', disabled: false }, // Allow Q&A access
    { code: 'finance', disabled: false },            // Allow finance viewing
    { code: 'balance', disabled: true },             // Deny balance/withdrawals
    { code: 'supply', disabled: true }               // Deny supply creation
  ];

  const result = await sdk.general.createInvite({
    invite: {
      phoneNumber: '79991234567',
      position: 'Customer Support Manager'
    },
    access: accessPermissions
  });

  console.log('Invitation created successfully!');
  console.log(`Invite ID: ${result.inviteID}`);
  console.log(`Invite URL: ${result.inviteUrl}`);
  console.log(`Expires: ${result.expiredAt}`);

  // Share the inviteUrl with the new user
  return result;
}
```

### Step 2: List All Users

```typescript
async function listAllUsers() {
  // Get all users with pagination
  const activeUsers = await sdk.general.getUsers({
    limit: 100,
    offset: 0,
    isInviteOnly: false // Active users only
  });

  console.log('\n=== Active Users ===');
  console.log(`Total: ${activeUsers.total}`);

  for (const user of activeUsers.users) {
    console.log(`\nUser ID: ${user.id}`);
    console.log(`Name: ${user.firstName} ${user.secondName}`);
    console.log(`Phone: ${user.phone}`);
    console.log(`Email: ${user.email}`);
    console.log(`Position: ${user.position}`);
    console.log(`Is Owner: ${user.isOwner}`);

    // Show access permissions
    console.log('Permissions:');
    for (const access of user.access) {
      const status = access.disabled ? 'DENIED' : 'ALLOWED';
      console.log(`  ${access.code}: ${status}`);
    }
  }

  // Get pending invitations
  const pendingInvites = await sdk.general.getUsers({
    limit: 100,
    offset: 0,
    isInviteOnly: true // Invited users only
  });

  console.log('\n=== Pending Invitations ===');
  console.log(`Total: ${pendingInvites.total}`);

  for (const user of pendingInvites.users) {
    if (user.inviteeInfo) {
      console.log(`\nPhone: ${user.inviteeInfo.phoneNumber}`);
      console.log(`Position: ${user.inviteeInfo.position}`);
      console.log(`Expires: ${user.inviteeInfo.expiredAt}`);
      console.log(`Active: ${user.inviteeInfo.isActive}`);
    }
  }

  return { activeUsers, pendingInvites };
}
```

### Step 3: Update User Permissions

```typescript
async function updateUserPermissions(userId: number) {
  // Grant access to finance and documents, deny balance access
  await sdk.general.updateUserAccess({
    usersAccesses: [
      {
        userId: userId,
        access: [
          { code: 'finance', disabled: false },
          { code: 'suppliersDocuments', disabled: false },
          { code: 'balance', disabled: true },
          { code: 'brands', disabled: true }
        ]
      }
    ]
  });

  console.log(`Permissions updated for user ${userId}`);
}

// Update multiple users at once
async function bulkUpdatePermissions() {
  await sdk.general.updateUserAccess({
    usersAccesses: [
      {
        userId: 12345,
        access: [
          { code: 'finance', disabled: false },
          { code: 'balance', disabled: true }
        ]
      },
      {
        userId: 67890,
        access: [
          { code: 'feedbacksQuestions', disabled: false },
          { code: 'supply', disabled: true }
        ]
      }
    ]
  });

  console.log('Bulk permissions update completed');
}
```

### Step 4: Delete a User

```typescript
async function removeUser(userId: number) {
  await sdk.general.deleteUser(userId);
  console.log(`User ${userId} has been removed from the seller profile`);
}
```

### Complete Management Script

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { AccessItem, UserInfo } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function manageTeam() {
  // 1. Invite a new customer support user
  const invite = await sdk.general.createInvite({
    invite: {
      phoneNumber: '79991234567',
      position: 'Support Agent'
    },
    access: [
      { code: 'feedbacksQuestions', disabled: false },
      { code: 'questions', disabled: false },
      { code: 'feedbacks', disabled: false }
    ]
  });
  console.log(`New user invited: ${invite.inviteUrl}`);

  // 2. List current team members
  const { users, total } = await sdk.general.getUsers({ limit: 100 });
  console.log(`\nCurrent team size: ${total}`);

  // 3. Find users without finance access and grant it
  for (const user of users) {
    if (user.isOwner) continue; // Skip owner

    const hasFinanceAccess = user.access.find(
      a => a.code === 'finance' && !a.disabled
    );

    if (!hasFinanceAccess) {
      console.log(`Granting finance access to ${user.firstName}`);
      await sdk.general.updateUserAccess({
        usersAccesses: [{
          userId: user.id,
          access: [{ code: 'finance', disabled: false }]
        }]
      });
    }
  }

  // 4. Remove inactive users (no role = never activated)
  const inactiveUsers = users.filter(u => !u.role && !u.isOwner);
  for (const user of inactiveUsers) {
    console.log(`Removing inactive user: ${user.id}`);
    await sdk.general.deleteUser(user.id);
  }

  console.log('\nTeam management complete!');
}

manageTeam().catch(console.error);
```

## Access Codes Reference

The following access codes control what sections a user can access:

| Access Code | Description | Section |
|-------------|-------------|---------|
| `balance` | View account balance and withdraw funds | Finance |
| `brands` | Manage brand settings | Settings |
| `changeJam` | Modify Jam subscription settings | Subscription |
| `discountPrice` | Change prices, set discounts, run promotions | Pricing |
| `finance` | View financial analytics and reports | Finance |
| `showcase` | Manage store showcase and appearance | Store |
| `suppliersDocuments` | View and download documents | Documents |
| `supply` | Create and manage FBW supplies | Logistics |
| `feedbacksQuestions` | View and respond to questions and reviews | Communications |
| `questions` | View and respond to customer questions | Communications |
| `pinFeedbacks` | Pin/unpin reviews on product cards | Communications |
| `pointsForReviews` | Manage points-for-reviews campaigns | Communications |
| `feedbacks` | View and respond to product reviews | Communications |
| `wbPoint` | Manage WB Point settings | Settings |

### Permission Logic

- `disabled: false` = Access **ALLOWED**
- `disabled: true` = Access **DENIED**

### Common Permission Templates

**Customer Support Agent:**
```typescript
const supportAccess: AccessItem[] = [
  { code: 'feedbacksQuestions', disabled: false },
  { code: 'questions', disabled: false },
  { code: 'feedbacks', disabled: false },
  { code: 'balance', disabled: true },
  { code: 'finance', disabled: true }
];
```

**Finance Manager:**
```typescript
const financeAccess: AccessItem[] = [
  { code: 'balance', disabled: false },
  { code: 'finance', disabled: false },
  { code: 'suppliersDocuments', disabled: false },
  { code: 'discountPrice', disabled: true },
  { code: 'supply', disabled: true }
];
```

**Inventory Manager:**
```typescript
const inventoryAccess: AccessItem[] = [
  { code: 'supply', disabled: false },
  { code: 'suppliersDocuments', disabled: false },
  { code: 'balance', disabled: true },
  { code: 'finance', disabled: true }
];
```

## API Methods

### createInvite(data)

Creates an invitation for a new user.

```typescript
const result = await sdk.general.createInvite({
  invite: {
    phoneNumber: '79991234567',  // Required
    position: 'Manager'          // Optional, max 150 chars
  },
  access: [                      // Optional
    { code: 'finance', disabled: false }
  ]
});

// Response
interface CreateInviteResponse {
  inviteID: string;      // UUID of the invitation
  expiredAt: string;     // Expiration date/time
  isSuccess: boolean;    // Creation status
  inviteUrl: string;     // URL for user to accept
}
```

### getUsers(params?)

Retrieves users from the seller profile.

```typescript
const result = await sdk.general.getUsers({
  limit: 100,           // Max 100, default 100
  offset: 0,            // Default 0
  isInviteOnly: false   // true = invited only, false = active only
});

// Response
interface GetUsersResponse {
  total: number;           // Total user count
  countInResponse: number; // Users in this response
  users: UserInfo[];       // User list
}
```

### updateUserAccess(data)

Updates access permissions for one or more users.

```typescript
await sdk.general.updateUserAccess({
  usersAccesses: [
    {
      userId: 12345,
      access: [
        { code: 'finance', disabled: false },
        { code: 'balance', disabled: true }
      ]
    }
  ]
});
// Returns void on success
```

### deleteUser(deletedUserID)

Removes a user from the seller profile.

```typescript
await sdk.general.deleteUser(12345);
// Returns void on success
```

## Error Handling

### Comprehensive Error Handling

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

async function safeInviteUser(phoneNumber: string) {
  try {
    const result = await sdk.general.createInvite({
      invite: { phoneNumber },
      access: [{ code: 'finance', disabled: false }]
    });
    return result;
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded');
      console.error(`Retry after: ${error.retryAfter}ms`);
      // SDK handles retry automatically
    } else if (error instanceof AuthenticationError) {
      console.error('Invalid API key - check your credentials');
      // Verify API key permissions include user management
    } else if (error instanceof ValidationError) {
      console.error('Invalid request:', error.message);
      // Check phone number format (should be 11 digits starting with 7)
    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
      // Check connectivity to user-management-api.wildberries.ru
    } else if (error instanceof WBAPIError) {
      console.error(`API error ${error.statusCode}: ${error.message}`);
    }
    throw error;
  }
}
```

### Common Error Scenarios

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid or expired API key | Regenerate API key with user management scope |
| 403 Forbidden | Insufficient permissions | Ensure API key has user management access |
| 400 Bad Request | Invalid phone number format | Use 11-digit format starting with 7 |
| 404 Not Found | User ID does not exist | Verify user ID with getUsers() first |
| 429 Rate Limit | Too many requests | SDK handles automatically with retry |

### Validation Tips

```typescript
// Validate phone number before sending
function validatePhoneNumber(phone: string): boolean {
  // Russian format: 7XXXXXXXXXX (11 digits)
  return /^7\d{10}$/.test(phone);
}

// Validate user exists before update/delete
async function ensureUserExists(userId: number): Promise<boolean> {
  const { users } = await sdk.general.getUsers({ limit: 100 });
  return users.some(u => u.id === userId);
}
```

## Rate Limits

The User Management API has the following rate limits:

| Method | Requests/Sec | Interval | Burst |
|--------|-------------|----------|-------|
| `createInvite()` | 1 | 1 second | 5 |
| `getUsers()` | 1 | 1 second | 5 |
| `updateUserAccess()` | 1 | 1 second | 5 |
| `deleteUser()` | 1 | 1 second | 10 |

### Rate Limit Tips

- The SDK handles rate limiting automatically with queuing and retry
- Bulk update permissions in a single call using `usersAccesses` array
- Cache user lists to reduce API calls
- Use pagination efficiently (max 100 users per request)

```typescript
// Efficient: Update multiple users in one call
await sdk.general.updateUserAccess({
  usersAccesses: [
    { userId: 1, access: [{ code: 'finance', disabled: false }] },
    { userId: 2, access: [{ code: 'finance', disabled: false }] },
    { userId: 3, access: [{ code: 'finance', disabled: false }] }
  ]
});

// Less efficient: Separate calls for each user
await sdk.general.updateUserAccess({ usersAccesses: [{ userId: 1, access: [...] }] });
await sdk.general.updateUserAccess({ usersAccesses: [{ userId: 2, access: [...] }] });
await sdk.general.updateUserAccess({ usersAccesses: [{ userId: 3, access: [...] }] });
```

## Best Practices

### 1. Use Role-Based Permission Templates

```typescript
const ROLE_TEMPLATES = {
  support: [
    { code: 'feedbacksQuestions', disabled: false },
    { code: 'questions', disabled: false },
    { code: 'feedbacks', disabled: false }
  ],
  finance: [
    { code: 'balance', disabled: false },
    { code: 'finance', disabled: false },
    { code: 'suppliersDocuments', disabled: false }
  ],
  logistics: [
    { code: 'supply', disabled: false },
    { code: 'suppliersDocuments', disabled: false }
  ],
  marketing: [
    { code: 'discountPrice', disabled: false },
    { code: 'showcase', disabled: false },
    { code: 'brands', disabled: false }
  ]
} as const;

async function inviteWithRole(phone: string, role: keyof typeof ROLE_TEMPLATES) {
  return sdk.general.createInvite({
    invite: { phoneNumber: phone, position: role },
    access: ROLE_TEMPLATES[role]
  });
}
```

### 2. Regularly Audit User Access

```typescript
async function auditUserAccess() {
  const { users } = await sdk.general.getUsers({ limit: 100 });

  console.log('\n=== User Access Audit ===\n');

  for (const user of users) {
    if (user.isOwner) {
      console.log(`[OWNER] ${user.firstName} ${user.secondName}`);
      continue;
    }

    // Check for sensitive permissions
    const hasBalanceAccess = user.access.find(a => a.code === 'balance' && !a.disabled);
    const hasFinanceAccess = user.access.find(a => a.code === 'finance' && !a.disabled);

    if (hasBalanceAccess) {
      console.log(`[ALERT] ${user.firstName} has BALANCE access (can withdraw funds)`);
    }

    if (!user.role) {
      console.log(`[PENDING] User ${user.id} has not activated their account`);
    }
  }
}
```

### 3. Handle Expired Invitations

```typescript
async function cleanupExpiredInvitations() {
  const { users } = await sdk.general.getUsers({
    limit: 100,
    isInviteOnly: true
  });

  const now = new Date();

  for (const user of users) {
    if (user.inviteeInfo) {
      const expiry = new Date(user.inviteeInfo.expiredAt);

      if (expiry < now || !user.inviteeInfo.isActive) {
        console.log(`Removing expired invitation for ${user.inviteeInfo.phoneNumber}`);
        await sdk.general.deleteUser(user.id);
      }
    }
  }
}
```

### 4. Implement Principle of Least Privilege

```typescript
// Only grant permissions that are necessary for the role
async function createRestrictedUser(phone: string, position: string) {
  // Start with no access
  const minimalAccess: AccessItem[] = [
    { code: 'balance', disabled: true },
    { code: 'brands', disabled: true },
    { code: 'changeJam', disabled: true },
    { code: 'discountPrice', disabled: true },
    { code: 'finance', disabled: true },
    { code: 'showcase', disabled: true },
    { code: 'suppliersDocuments', disabled: true },
    { code: 'supply', disabled: true },
    { code: 'feedbacksQuestions', disabled: true },
    { code: 'questions', disabled: true },
    { code: 'pinFeedbacks', disabled: true },
    { code: 'pointsForReviews', disabled: true },
    { code: 'feedbacks', disabled: true },
    { code: 'wbPoint', disabled: true }
  ];

  // Create user with minimal access, then grant specific permissions as needed
  return sdk.general.createInvite({
    invite: { phoneNumber: phone, position },
    access: minimalAccess
  });
}
```

### 5. Log All User Management Actions

```typescript
function logUserAction(action: string, details: Record<string, unknown>) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    action,
    ...details
  }));
}

async function inviteWithLogging(phone: string, position: string) {
  const result = await sdk.general.createInvite({
    invite: { phoneNumber: phone, position }
  });

  logUserAction('USER_INVITED', {
    inviteId: result.inviteID,
    phone: phone.slice(-4), // Log only last 4 digits
    position,
    expiresAt: result.expiredAt
  });

  return result;
}
```

## Related Resources

- [API Reference: GeneralModule](/api/classes/GeneralModule)
- [Rate Limits Configuration](/src/config/general-rate-limits.ts)
- [Types Reference](/src/types/general.types.ts)
- [Official WB User Management API](https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca)
