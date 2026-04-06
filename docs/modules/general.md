# General Module

The General module provides essential utility endpoints for API connectivity testing, marketplace news retrieval, seller account information, subscription status, and user management. It serves as the foundation for validating SDK setup and API key configuration before using other modules.

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `general` |
| **SDK Namespace** | `sdk.general.*` |
| **Base URLs** | `https://common-api.wildberries.ru`, `https://user-management-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/01-general.yaml` |
| **Methods** | 10 (including 1 deprecated) |
| **Swagger Endpoints** | 9 (all implemented) |
| **Authentication** | API Key (Header) — see [Token Types](#token-types) for details |

### Purpose

The General module is designed to:

- **Validate API connectivity** - Test that requests reach the Wildberries API successfully
- **Verify API key validity** - Confirm the token is not expired or revoked
- **Retrieve marketplace news** - Get announcements and updates from the Wildberries seller portal
- **Fetch seller information** - Retrieve authenticated seller's account details (including TIN)
- **Check Jam subscription** - Query subscription state, level, and active period directly via the API
- **Retrieve seller rating** - Get seller rating and review count
- **Manage seller users** - Create invitations, list users, update permissions, and delete users

This module is typically the first one developers use when integrating with the Wildberries SDK, as `ping()` provides a quick health check for both connectivity and authentication.

### Token Types

Some methods require specific token types:

| Token Type | Description | SDKConfig Value |
|------------|-------------|-----------------|
| **Personal** | Proprietary software, on-premise solutions. Full rate limits. | `'personal'` (default) |
| **Service** | Third-party SaaS services from WB Catalog. Full rate limits. | `'service'` |
| **Basic** | Auxiliary token. Reduced rate limits. | `'basic'` |
| **Test** | Testing token. Reduced rate limits. | `'test'` |

Configure via `SDKConfig.tokenType`:

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here',
  tokenType: 'service', // default: 'personal'
});
```

---

## Installation & Setup

### Accessing via SDK

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here',
});

// Access general module methods
const pingResult = await sdk.general.ping();
const news = await sdk.general.news();
const seller = await sdk.general.sellerInfo();
const jam = await sdk.general.getJamSubscription();
const rating = await sdk.general.getSellerRating();
```

### Manual Module Initialization (Advanced)

For cases where you need direct control over the BaseClient:

```typescript
import { GeneralModule } from 'daytona-wildberries-typescript-sdk';
import { BaseClient } from 'daytona-wildberries-typescript-sdk';

const client = new BaseClient({
  apiKey: process.env.WB_API_KEY || 'your-api-key-here',
  timeout: 30000,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
  },
});

const general = new GeneralModule(client);
```

---

## Methods Reference

| Method | HTTP | Endpoint | Description | Rate Limit |
|--------|------|----------|-------------|------------|
| [`ping()`](#ping) | GET | `/ping` | Test API connectivity and token validity | 3 req/30s |
| [`news(options?)`](#news) | GET | `/api/communications/v2/news` | Retrieve seller portal news | 1 req/min |
| [`sellerInfo()`](#sellerinfo) | GET | `/api/v1/seller-info` | Get authenticated seller information | 1 req/min |
| [`getJamSubscription()`](#getjamsubscription) | GET | `/api/common/v1/subscriptions` | Get Jam subscription details | 1 req/min |
| [`getSellerRating()`](#getsellerrating) | GET | `/api/common/v1/rating` | Get seller rating and review count | 1 req/min |
| [`getJamSubscriptionStatus(params)`](#getjamsubscriptionstatus-deprecated) | POST | `/api/v2/search-report/...` | **Deprecated.** Detect Jam tier via probe | Shared with Analytics |

---

## Method Details

### `ping()`

Test API connectivity and validate the API token.

**Signature:**
```typescript
ping(): Promise<PingResponse>
```

**Returns:** `Promise<PingResponse>`

```typescript
interface PingResponse {
  /** Timestamp of the request */
  TS?: string;
  /** Connection status */
  Status?: 'OK';
}
```

**Rate Limit:** Maximum 3 requests per 30 seconds (6 req/min, 10s interval, burst 3)

**What It Checks:**
1. Request successfully reaches the Wildberries API
2. Token validity (not expired, not revoked)
3. Token category matches the service

**Domain Reference:**

The ping endpoint validates connectivity based on the API token category. Each category uses a specific domain:

| Category | Domain |
|----------|--------|
| Content | `content-api.wildberries.ru` |
| Marketplace | `marketplace-api.wildberries.ru` |
| Statistics | `statistics-api.wildberries.ru` |
| Analytics | `seller-analytics-api.wildberries.ru` |
| Recommendations | `recommend-api.wildberries.ru` |
| Feedbacks & Reviews | `feedbacks-api.wildberries.ru` |
| Prices & Discounts | `discounts-prices-api.wildberries.ru` |
| Promotion | `advert-api.wildberries.ru` |
| Buyer Chat | `buyer-chat-api.wildberries.ru` |
| Tariffs | `common-api.wildberries.ru` |
| General | `common-api.wildberries.ru` |
| Returns | `returns-api.wildberries.ru` |
| Documents | `document-api.wildberries.ru` |
| Finances | `finance-api.wildberries.ru` |

**Example:**
```typescript
try {
  const result = await sdk.general.ping();
  console.log('Status:', result.Status); // 'OK'
  console.log('Timestamp:', result.TS);  // '2024-01-15T10:30:00Z'
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  }
}
```

**See Also:** [Official API Documentation](https://dev.wildberries.ru/openapi/api-information#tag/Proverka-podklyucheniya-k-WB-API)

---

### `news()`

Retrieve news and announcements from the Wildberries seller portal.

**Signature:**
```typescript
news(options?: NewsRequestParams): Promise<NewsResponse>
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `options` | `NewsRequestParams` | No | Query parameters for filtering |
| `options.from` | `string` | No | Date to start from (format: `YYYY-MM-DD`) |
| `options.fromID` | `number` | No | News ID to start from |

> **Note:** You must provide at least one of `from` or `fromID` parameters. Maximum 100 news items per request.

**Returns:** `Promise<NewsResponse>`

```typescript
interface NewsResponse {
  /** Array of news items */
  data: NewsItem[];
}

interface NewsItem {
  /** Unique news ID */
  id: number;
  /** News headline */
  header: string;
  /** Publication date and time */
  date: string;
  /** News content/body text */
  content: string;
  /** Associated tags */
  types: NewsTag[];
}

interface NewsTag {
  /** Tag ID */
  id: number;
  /** Tag name */
  name: string;
}
```

**Rate Limit:** 1 request per minute with burst limit of 10

**Examples:**

```typescript
// Fetch news from a specific date
const newsFromDate = await sdk.general.news({ from: '2024-01-01' });
console.log(`Found ${newsFromDate.data.length} news items`);

// Iterate through news
for (const item of newsFromDate.data) {
  console.log(`${item.header} - ${item.date}`);
}
```

```typescript
// Fetch news starting from a specific ID
const newsFromId = await sdk.general.news({ fromID: 100 });

// Display first 3 items with preview
newsFromId.data.slice(0, 3).forEach((item, index) => {
  console.log(`${index + 1}. ${item.header}`);
  console.log(`   Date: ${item.date}`);
  console.log(`   Preview: ${item.content.substring(0, 60)}...`);
});
```

**See Also:** [Official API Documentation](https://dev.wildberries.ru/openapi/api-information#tag/API-novostej)

---

### `sellerInfo()`

Retrieve information about the authenticated seller account.

**Signature:**
```typescript
sellerInfo(): Promise<SellerInfoResponse>
```

**Returns:** `Promise<SellerInfoResponse>`

```typescript
interface SellerInfoResponse {
  /** Seller company name */
  name?: string;
  /** Unique seller ID on Wildberries */
  sid?: string;
  /** Seller's trade mark / brand name */
  tradeMark?: string;
  /** Seller's Taxpayer Identification Number (INN) */
  tin?: string;
}
```

**Rate Limit:** 1 request per minute with burst limit of 10

> **Note:** Any valid API token works (except test environment tokens).

**Example:**
```typescript
try {
  const seller = await sdk.general.sellerInfo();

  console.log('Seller Information:');
  console.log(`  Name: ${seller.name}`);
  console.log(`  Seller ID: ${seller.sid}`);
  console.log(`  Trade Mark: ${seller.tradeMark}`);
  if (seller.tin) {
    console.log(`  TIN (INN): ${seller.tin}`);
  }
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('API key is invalid or expired');
  }
}
```

**See Also:** [Official API Documentation](https://dev.wildberries.ru/openapi/api-information#tag/Informaciya-o-prodavce)

---

### `getJamSubscription()`

Retrieve detailed information about the seller's Jam subscription directly from the API.

Returns the subscription state, level, activation source, and active period dates. If the seller has never subscribed, the API returns an empty 200 response (all fields undefined).

**Added in:** v3.5.0

**Signature:**
```typescript
getJamSubscription(): Promise<JamSubscriptionDetails>
```

**Returns:** `Promise<JamSubscriptionDetails>`

```typescript
interface JamSubscriptionDetails {
  /** Subscription state: 'active' or other values when inactive */
  state?: string;
  /** How the subscription was activated (e.g., 'jam') */
  activationSource?: string;
  /** Subscription level (e.g., 'premium', 'standard') */
  level?: string;
  /** Date of first subscription activation (ISO 8601) */
  since?: string;
  /** End date of current/last paid period (ISO 8601) */
  till?: string;
}
```

**Authorization:** Service token of any category.

**Rate Limit:** 1 request per minute, burst limit 10

**Behavior by subscription state:**

| Scenario | `state` | `since` | `till` |
|----------|---------|---------|--------|
| Never subscribed | `undefined` | `undefined` | `undefined` |
| Active subscription | `'active'` | First activation date | Current period end |
| Expired/cancelled, then resubscribed | `'active'` | First activation date | Current period end |
| Inactive (expired) | Present (non-active) | First activation date | Last paid period end |

**Example:**
```typescript
const jam = await sdk.general.getJamSubscription();

if (jam.state === 'active') {
  console.log(`Jam ${jam.level} active until ${jam.till}`);
  console.log(`Source: ${jam.activationSource}, since: ${jam.since}`);
} else if (jam.state) {
  console.log(`Jam inactive (state: ${jam.state})`);
} else {
  console.log('Never subscribed to Jam');
}
```

**See Also:** [Official API Documentation](https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1Subscriptions) | [Jam Subscription Detection Guide](/guides/jam-subscription)

---

### `getSellerRating()`

Retrieve the seller's user rating and total review count.

**Added in:** v3.5.0

**Signature:**
```typescript
getSellerRating(): Promise<SellerRatingResponse>
```

**Returns:** `Promise<SellerRatingResponse>`

```typescript
interface SellerRatingResponse {
  /** Total number of customer reviews */
  feedbackCount?: number;
  /** Seller rating (e.g., 4.55) */
  valuation?: number;
}
```

**Authorization:** Service token with the **"Feedbacks and Questions"** (Voprosy i otzyvy) category.

**Rate Limit:** 1 request per minute, burst limit 1

**Example:**
```typescript
const rating = await sdk.general.getSellerRating();
console.log(`Rating: ${rating.valuation} (${rating.feedbackCount} reviews)`);
```

**See Also:** [Official API Documentation](https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1Rating)

---

### `getJamSubscriptionStatus()` (Deprecated)

> **Deprecated since v3.5.0.** Use [`getJamSubscription()`](#getjamsubscription) instead. The direct API endpoint does not require `nmIds` and does not consume analytics quota. This probe method is retained as a fallback for cases where a Service token is not available.

Detect the seller's Jam subscription tier by probing the analytics search-texts endpoint.

Since Wildberries did not originally provide a direct API for checking Jam status, this method uses a probe strategy -- sending requests with specific `limit` values and interpreting the responses.

**Signature:**
```typescript
getJamSubscriptionStatus(params: GetJamSubscriptionStatusParams): Promise<JamSubscriptionStatus>
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `params.nmIds` | `number[]` | Yes | One or more WB article IDs (must belong to the seller) |

**Returns:** `Promise<JamSubscriptionStatus>`

```typescript
type JamSubscriptionTier = 'none' | 'standard' | 'advanced';

interface JamSubscriptionStatus {
  /** Detected subscription tier */
  tier: JamSubscriptionTier;
  /** ISO 8601 timestamp when the check was performed */
  checkedAt: string;
  /** Number of probe API calls made (1 for advanced, 2 for standard/none) */
  probeCallsMade: number;
}
```

**Probe Strategy:**

| Step | Request | 200 Response | 400 Response |
|------|---------|-------------|-------------|
| 1 | `limit: 31` | Advanced tier detected | Continue to step 2 |
| 2 | `limit: 1` | Standard tier detected | No Jam subscription |

**Rate Limit:** Shares quota with `analytics.createProductSearchText` (3 req/min, 20s interval, burst 3)

> **Tip:** Cache the result -- subscription tier changes infrequently. See the [Jam Subscription Guide](/guides/jam-subscription) for caching patterns.

**Example:**
```typescript
// Prefer getJamSubscription() for new code. Use this only as fallback.
const status = await sdk.general.getJamSubscriptionStatus({
  nmIds: [12345678]
});

switch (status.tier) {
  case 'advanced':
    console.log('Advanced Jam — limit up to 50');
    break;
  case 'standard':
    console.log('Standard Jam — limit up to 30');
    break;
  case 'none':
    console.log('No Jam subscription');
    break;
}
```

**See Also:** [Jam Subscription Detection Guide](/guides/jam-subscription) | [Analytics Module](/modules/analytics)

---

## Types

All types are exported from the SDK and can be imported directly:

```typescript
import type {
  PingResponse,
  NewsResponse,
  NewsItem,
  NewsTag,
  NewsRequestParams,
  SellerInfoResponse,
  JamSubscriptionTier,
  JamSubscriptionStatus,
  JamSubscriptionDetails,
  GetJamSubscriptionStatusParams,
  SellerRatingResponse,
  // User Management types
  AccessCode,
  AccessItem,
  InviteInfo,
  CreateInviteRequest,
  CreateInviteResponse,
  InviteeInfo,
  UserInfo,
  GetUsersParams,
  GetUsersResponse,
  UserAccessUpdate,
  UpdateUserAccessRequest,
  UserManagementErrorResponse,
} from 'daytona-wildberries-typescript-sdk';
```

### Core Type Definitions

```typescript
/**
 * Response from the ping endpoint
 */
export interface PingResponse {
  /** Timestamp of the request */
  TS?: string;
  /** Connection status - always 'OK' on success */
  Status?: 'OK';
}

/**
 * Parameters for the news endpoint
 */
export interface NewsRequestParams {
  /** Date to fetch news from (format: YYYY-MM-DD) */
  from?: string;
  /** News ID to start pagination from */
  fromID?: number;
}

/**
 * Response from the news endpoint
 */
export interface NewsResponse {
  /** Array of news items */
  data: NewsItem[];
}

/**
 * Individual news item
 */
export interface NewsItem {
  /** Unique identifier for the news item */
  id: number;
  /** News headline/title */
  header: string;
  /** Publication date and time (ISO 8601) */
  date: string;
  /** Full news content/body */
  content: string;
  /** Associated category tags */
  types: NewsTag[];
}

/**
 * News category tag
 */
export interface NewsTag {
  /** Tag identifier */
  id: number;
  /** Human-readable tag name */
  name: string;
}

/**
 * Response from the seller-info endpoint
 */
export interface SellerInfoResponse {
  /** Legal company name */
  name?: string;
  /** Unique seller identifier on Wildberries platform */
  sid?: string;
  /** Registered trade mark or brand name */
  tradeMark?: string;
  /** Seller's Taxpayer Identification Number (INN) */
  tin?: string;
}
```

### Jam Subscription Types

```typescript
/**
 * Jam subscription tier (used by the deprecated probe method)
 */
export type JamSubscriptionTier = 'none' | 'standard' | 'advanced';

/**
 * Result of a Jam subscription status probe (deprecated)
 */
export interface JamSubscriptionStatus {
  tier: JamSubscriptionTier;
  checkedAt: string;
  probeCallsMade: number;
}

/**
 * Parameters for the Jam subscription status probe (deprecated)
 */
export interface GetJamSubscriptionStatusParams {
  nmIds: number[];
}

/**
 * Detailed Jam subscription information from GET /api/common/v1/subscriptions
 * Added in v3.5.0
 */
export interface JamSubscriptionDetails {
  /** Subscription state: 'active' or other values when inactive */
  state?: string;
  /** How the subscription was activated (e.g., 'jam') */
  activationSource?: string;
  /** Subscription level (e.g., 'premium', 'standard') */
  level?: string;
  /** Date of first subscription activation (ISO 8601) */
  since?: string;
  /** End date of current/last paid period (ISO 8601) */
  till?: string;
}
```

### Seller Rating Types

```typescript
/**
 * Seller rating and review count from GET /api/common/v1/rating
 * Added in v3.5.0
 */
export interface SellerRatingResponse {
  /** Total number of customer reviews */
  feedbackCount?: number;
  /** Seller rating (e.g., 4.55) */
  valuation?: number;
}
```

---

## Error Handling

The General module can throw the following errors:

| Error Type | HTTP Status | Description | Auto-Retry |
|------------|-------------|-------------|------------|
| `AuthenticationError` | 401, 403 | Invalid, expired, or revoked API key | No |
| `RateLimitError` | 429 | Rate limit exceeded | Yes |
| `ValidationError` | 400, 422 | Invalid request parameters | No |
| `NetworkError` | 5xx, timeout | Server error or network issue | Yes |

### Error Handling Example

```typescript
import {
  WildberriesSDK,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

try {
  const result = await sdk.general.ping();
  console.log('Connection OK:', result.Status);
} catch (error) {
  if (error instanceof AuthenticationError) {
    // API key is invalid or expired
    console.error('Authentication failed. Check your API key.');
    console.error('Get a new key from: https://seller.wildberries.ru/');
  } else if (error instanceof RateLimitError) {
    // Too many requests - SDK will auto-retry
    console.error(`Rate limited. Retry after ${error.retryAfter}ms`);
  } else if (error instanceof ValidationError) {
    // Invalid request parameters
    console.error('Invalid request:', error.message);
  } else if (error instanceof NetworkError) {
    // Server error or network issue - SDK will auto-retry
    console.error(`Network error: ${error.message}`);
    console.error(`Status: ${error.statusCode}`);
  } else if (error instanceof WBAPIError) {
    // Other API errors
    console.error(`API error: ${error.message}`);
    console.error(`Status: ${error.statusCode}`);
  } else {
    // Unexpected error
    throw error;
  }
}
```

### Rate Limit Recovery

The SDK automatically handles rate limiting with exponential backoff:

```typescript
const sdk = new WildberriesSDK({
  apiKey: 'your-api-key',
  retryConfig: {
    maxRetries: 3,        // Retry up to 3 times
    retryDelay: 1000,     // Initial delay: 1 second
    exponentialBackoff: true,  // Delay doubles each retry
  },
});

// SDK will automatically retry on 429 responses
const result = await sdk.general.ping();
```

---

## Rate Limits Summary

| Method | Requests/Minute | Interval | Burst Limit |
|--------|-----------------|----------|-------------|
| `ping()` | 6 | 10 seconds | 3 |
| `news()` | 1 | 60 seconds | 10 |
| `sellerInfo()` | 1 | 60 seconds | 10 |
| `getJamSubscription()` | 1 | 60 seconds | 10 |
| `getSellerRating()` | 1 | 60 seconds | 1 |
| `getJamSubscriptionStatus()` | 3 (shared) | 20 seconds | 3 |
| `createInvite()` | 60 | 1 second | 5 |
| `getUsers()` | 60 | 1 second | 5 |
| `updateUserAccess()` | 60 | 1 second | 5 |
| `deleteUser()` | 60 | 1 second | 10 |

> **Note:** Rate limits are enforced per API key, not per SDK instance. Multiple SDK instances using the same API key share the same rate limit quota.

---

## Complete Usage Example

```typescript
import { WildberriesSDK, AuthenticationError, RateLimitError } from 'daytona-wildberries-typescript-sdk';

async function demonstrateGeneralModule() {
  // Initialize SDK
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY || 'your-api-key',
  });

  // Step 1: Verify connectivity
  console.log('Testing API connection...');
  try {
    const ping = await sdk.general.ping();
    console.log(`Connection status: ${ping.Status}`);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Invalid API key. Exiting.');
      return;
    }
    throw error;
  }

  // Step 2: Get seller information
  console.log('\nFetching seller info...');
  const seller = await sdk.general.sellerInfo();
  console.log(`Seller: ${seller.name} (ID: ${seller.sid})`);
  if (seller.tin) {
    console.log(`TIN (INN): ${seller.tin}`);
  }

  // Step 3: Get Jam subscription details
  console.log('\nChecking Jam subscription...');
  const jam = await sdk.general.getJamSubscription();
  if (jam.state === 'active') {
    console.log(`Jam ${jam.level} active until ${jam.till}`);
  } else {
    console.log('No active Jam subscription');
  }

  // Step 4: Get seller rating
  console.log('\nFetching seller rating...');
  const rating = await sdk.general.getSellerRating();
  console.log(`Rating: ${rating.valuation} (${rating.feedbackCount} reviews)`);

  // Step 5: Get recent news
  console.log('\nFetching recent news...');
  const news = await sdk.general.news({ from: '2024-01-01' });
  console.log(`Found ${news.data.length} news items`);

  news.data.slice(0, 5).forEach((item) => {
    console.log(`  - ${item.header} (${item.date})`);
  });
}

demonstrateGeneralModule().catch(console.error);
```

---

## User Management (4 methods)

These methods manage seller account users and permissions. They use the base URL `https://user-management-api.wildberries.ru`.

**Authorization:** All User Management methods require a **Personal Token** (category: Users) from the active profile owner. Available for sellers in all countries.

| Method | HTTP | Endpoint | Description | Rate Limit |
|--------|------|----------|-------------|------------|
| [`createInvite(data)`](#createinvite) | POST | `/api/v1/invite` | Create user invitation | 60 req/min |
| [`getUsers(params?)`](#getusers) | GET | `/api/v1/users` | Get list of active/invited users | 60 req/min |
| [`updateUserAccess(data)`](#updateuseraccess) | PUT | `/api/v1/users/access` | Update user access rights | 60 req/min |
| [`deleteUser(userId)`](#deleteuser) | DELETE | `/api/v1/user` | Delete user | 60 req/min |

---

### `createInvite()`

Create an invitation for a new user with configured access permissions.

**Signature:**
```typescript
createInvite(data: CreateInviteRequest): Promise<CreateInviteResponse>
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data.invite` | `InviteInfo` | Yes | Invitation details |
| `data.invite.phoneNumber` | `string` | Yes | User phone number |
| `data.invite.position` | `string` | No | User position/role (max 150 chars) |
| `data.access` | `AccessItem[]` | No | Access permissions |

**Returns:** `Promise<CreateInviteResponse>`

```typescript
interface CreateInviteResponse {
  inviteID: string;
  expiredAt: string;
  isSuccess: boolean;
  inviteUrl: string;
}
```

**Example:**
```typescript
const result = await sdk.general.createInvite({
  invite: { phoneNumber: '79999999999', position: 'Менеджер' },
  access: [
    { code: 'balance', disabled: false },
    { code: 'finance', disabled: true }
  ]
});
console.log(result.inviteUrl);
```

---

### `getUsers()`

Get list of users associated with the seller account.

**Signature:**
```typescript
getUsers(params?: GetUsersParams): Promise<GetUsersResponse>
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `params.limit` | `number` | No | Max users to return (default: 100, max: 100) |
| `params.offset` | `number` | No | Number of items to skip (default: 0) |
| `params.isInviteOnly` | `boolean` | No | true = invited only, false = active only |

**Returns:** `Promise<GetUsersResponse>`

```typescript
interface GetUsersResponse {
  total: number;
  countInResponse: number;
  users: UserInfo[];
}
```

**Example:**
```typescript
const result = await sdk.general.getUsers({ limit: 50 });
console.log(`Total users: ${result.total}`);
for (const user of result.users) {
  console.log(user.firstName, user.email);
}
```

---

### `updateUserAccess()`

Update access permissions for one or more users.

**Signature:**
```typescript
updateUserAccess(data: UpdateUserAccessRequest): Promise<void>
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data.usersAccesses` | `UserAccessUpdate[]` | Yes | Array of user access updates |
| `data.usersAccesses[].userId` | `number` | Yes | User ID |
| `data.usersAccesses[].access` | `AccessItem[]` | Yes | New access permissions |

**Example:**
```typescript
await sdk.general.updateUserAccess({
  usersAccesses: [
    {
      userId: 12345,
      access: [
        { code: 'balance', disabled: true },
        { code: 'finance', disabled: false }
      ]
    }
  ]
});
```

---

### `deleteUser()`

Delete a user from the seller account.

**Signature:**
```typescript
deleteUser(deletedUserID: number): Promise<void>
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deletedUserID` | `number` | Yes | ID of the user to delete |

**Example:**
```typescript
await sdk.general.deleteUser(12345);
```

---

### Access Codes Reference

Available access codes for user permissions:

| Code | Description |
|------|-------------|
| `balance` | Balance information |
| `brands` | Brand management |
| `changeJam` | Jam changes |
| `discountPrice` | Discount and pricing |
| `finance` | Financial information |
| `showcase` | Showcase management |
| `suppliersDocuments` | Supplier documents |
| `supply` | Supply management |
| `feedbacksQuestions` | Feedbacks and questions |
| `questions` | Questions only |
| `pinFeedbacks` | Pin feedbacks |
| `pointsForReviews` | Points for reviews |
| `feedbacks` | Feedbacks only |
| `wbPoint` | WB Points |

---

## Related Documentation

### Guides

- [User Management](#user-management-4-methods) - Team management with invitations, permissions, and user lifecycle (documented in this module)
- [Jam Subscription Detection](/guides/jam-subscription) - Detect and use Jam tier for analytics limit optimization

### EPICs

- [EPIC 14: User Management Module](/docs/epics/EPIC_14_USER_MANAGEMENT.md) - New endpoints for team management (depends on General module patterns)
- [EPIC 15: General Compliance](/docs/epics/EPIC_15_GENERAL_COMPLIANCE.md) - Rate limit fixes and error response standardization

### Stories

- [Story 1.9: General Module Implementation](/docs/stories/1.9.general-module-implementation.md) - Original implementation story with detailed context

### API Reference

- [GeneralModule Class](/docs/api/classes/GeneralModule.html) - TypeDoc generated reference
- [Wildberries API Information](https://dev.wildberries.ru/openapi/api-information) - Official API documentation

### Related Modules

- [Finances Module](/modules/finances) - Financial operations and balance management
- [Analytics Module](/modules/analytics) - Seller analytics and statistics
- [Communications Module](/modules/communications) - Customer reviews, Q&A, and feedback management

---

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial release with `ping()`, `news()`, `sellerInfo()` methods |
| 2.8.0 | Rate limit values corrected per EPIC 15; JSDoc enriched |
| 3.3.0 | Added `getJamSubscriptionStatus()` for Jam tier detection via probe strategy |
| 3.4.0 | Added `tin` (INN) field to `SellerInfoResponse`; added `SDKConfig.tokenType` for token type awareness; User Management methods note Personal Token requirement |
| 3.5.0 | Added `getJamSubscription()` direct API method and `getSellerRating()`; deprecated `getJamSubscriptionStatus()` in favor of `getJamSubscription()` |
