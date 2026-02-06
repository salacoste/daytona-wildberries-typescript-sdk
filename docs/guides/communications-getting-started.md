---
title: Communications Module Getting Started Guide
description: Complete guide to using the Communications module for managing customer Q&A, reviews, chat, claims, and pinned reviews on Wildberries
layout: doc
---

# Communications Module Getting Started Guide

This guide covers everything you need to know to work with customer communications features in the Wildberries TypeScript SDK.

> **Important**: Several legacy methods have been removed from the Wildberries API and are now deprecated in this SDK. See the [Deprecated Methods](#deprecated-methods) section for details.

## Table of Contents

- [What is the Communications Module?](#what-is-the-communications-module)
- [Key Capabilities](#key-capabilities)
- [Prerequisites](#prerequisites)
- [Basic Usage](#basic-usage)
- [Questions & Answers](#questions--answers)
- [Feedbacks & Reviews](#feedbacks--reviews)
- [Pinned Reviews](#pinned-reviews)
- [Customer Chat](#customer-chat)
- [Claims & Returns](#claims--returns)
- [Deprecated Methods](#deprecated-methods)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Best Practices](#best-practices)

## What is the Communications Module?

The **Communications module** provides complete control over customer communication channels, including:

- **Questions & Answers**: Manage and respond to customer questions about products
- **Feedbacks & Reviews**: View, respond to, and manage product reviews
- **Pinned Reviews**: Pin positive reviews to product cards (NEW feature)
- **Customer Chat**: Real-time messaging with buyers
- **Claims & Returns**: Handle return requests and customer claims

## Key Capabilities

| Feature | Description | Key Methods |
|---------|-------------|-------------|
| **Questions** | View and answer customer questions | `questions()`, `question()`, `updateQuestion()` |
| **Question Counts** | Track unanswered questions | `getQuestionsCount()`, `getQuestionsCountUnanswered()` |
| **Reviews** | View and respond to product reviews | `feedbacks()`, `feedback()`, `createFeedbacksAnswer()` |
| **Review Counts** | Track unprocessed reviews | `getFeedbacksCount()`, `getFeedbacksCountUnanswered()` |
| **Pinned Reviews** | Pin reviews to product cards | `pinFeedback()`, `unpinFeedback()`, `getPinnedFeedbacks()` |
| **Chat** | Communicate with buyers | `getSellerChats()`, `getSellerEvents()`, `createSellerMessage()` |
| **Claims** | Handle return requests | `claims()`, `updateClaim()` |
| **New Items Check** | Check for new Q&A | `newFeedbacksQuestions()` |

## Prerequisites

### SDK Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

### API Key Setup

You need a valid Wildberries API key with communications permissions. Create a `.env` file:

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

## Basic Usage

### Quick Start Example

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function main() {
  // Check for new questions and feedbacks
  const newItems = await sdk.communications.newFeedbacksQuestions();

  if (newItems.data?.hasNewQuestions) {
    console.log('You have new questions to answer!');
  }

  if (newItems.data?.hasNewFeedbacks) {
    console.log('You have new feedbacks to process!');
  }

  // Get unanswered questions count
  const questionCount = await sdk.communications.getQuestionsCountUnanswered();
  console.log(`Unanswered questions: ${questionCount.data?.countUnanswered}`);
  console.log(`Today: ${questionCount.data?.countUnansweredToday}`);
}

main();
```

## Questions & Answers

### Listing Questions

```typescript
// Get unanswered questions with pagination
const questions = await sdk.communications.questions({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc'
});

console.log(`Total unanswered: ${questions.data?.countUnanswered}`);

for (const q of questions.data?.questions ?? []) {
  console.log(`Question ID: ${q.id}`);
  console.log(`Text: ${q.text}`);
  console.log(`Product: ${q.productDetails?.productName}`);
  console.log(`Date: ${q.createdDate}`);
  console.log('---');
}
```

### Get Question by ID

```typescript
// Get a specific question
const question = await sdk.communications.question({ id: 'question-uuid-here' });

if (question.data) {
  console.log(`Question: ${question.data.text}`);
  console.log(`Product: ${question.data.productDetails?.productName}`);
  console.log(`State: ${question.data.state}`);

  if (question.data.answer) {
    console.log(`Answer: ${question.data.answer.text}`);
    console.log(`Editable: ${question.data.answer.editable}`);
  }
}
```

### Answer a Question

```typescript
// Answer or edit an answer to a question
await sdk.communications.updateQuestion({
  id: 'question-uuid-here',
  answer: { text: 'Thank you for your question! The product is...' },
  state: 'wbRu'  // State for answered question
});

console.log('Question answered successfully');
```

### Mark Question as Viewed

```typescript
// Mark a question as viewed without answering
await sdk.communications.updateQuestion({
  id: 'question-uuid-here',
  wasViewed: true
});
```

### Question Count by Date Range

```typescript
// Get count of questions in a date range
const count = await sdk.communications.getQuestionsCount({
  dateFrom: Date.parse('2025-01-01') / 1000, // Unix timestamp
  dateTo: Date.parse('2025-01-31') / 1000,
  isAnswered: false
});

console.log(`Unanswered questions in January: ${count.data}`);
```

## Feedbacks & Reviews

### Listing Reviews

```typescript
// Get unprocessed reviews
const feedbacks = await sdk.communications.feedbacks({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc'
});

console.log(`Unprocessed reviews: ${feedbacks.data?.countUnanswered}`);
console.log(`Archived reviews: ${feedbacks.data?.countArchive}`);

// Process each feedback
for (const fb of feedbacks.data?.feedbacks ?? []) {
  console.log(`Review ID: ${fb.id}`);
  console.log(`Rating: ${fb.productValuation}/5`);
  console.log(`Pros: ${fb.pros}`);
  console.log(`Cons: ${fb.cons}`);
  console.log(`Text: ${fb.text}`);
  console.log('---');
}
```

### Get Review by ID

```typescript
const feedback = await sdk.communications.feedback({ id: 'feedback-uuid-here' });

if (feedback.data) {
  console.log(`User: ${feedback.data.userName}`);
  console.log(`Rating: ${feedback.data.productValuation}/5`);
  console.log(`Product: ${feedback.data.productDetails?.productName}`);

  // Check for media
  if (feedback.data.photoLinks?.length) {
    console.log('Photos:', feedback.data.photoLinks.map(p => p.fullSize));
  }

  if (feedback.data.video) {
    console.log(`Video: ${feedback.data.video.link}`);
  }

  // Check if can request return
  if (feedback.data.isAbleReturnProductOrders) {
    console.log('Product return can be requested');
  }
}
```

### Answer a Review

```typescript
// Send an answer to a review
await sdk.communications.createFeedbacksAnswer({
  id: 'feedback-uuid-here',
  text: 'Thank you for your feedback! We appreciate your kind words.'
});

console.log('Review answered successfully');
```

### Edit Review Answer

```typescript
// Edit an existing answer (can only edit once within 60 days)
await sdk.communications.updateFeedbacksAnswer({
  id: 'feedback-uuid-here',
  text: 'Updated response: Thank you for your detailed feedback!'
});
```

### Request Product Return

```typescript
// Request a return for the product mentioned in the review
// Only available when isAbleReturnProductOrders is true
const result = await sdk.communications.createOrderReturn({
  feedbackId: 'feedback-uuid-here'
});

if (!result.error) {
  console.log('Return request submitted');
}
```

### Get Archived Reviews

```typescript
// Get reviews that have been processed or auto-archived
const archived = await sdk.communications.getFeedbacksArchive({
  take: 50,
  skip: 0,
  order: 'dateDesc'
});

console.log(`Archived reviews: ${archived.data?.feedbacks?.length}`);
```

## Pinned Reviews

The pinned reviews feature allows you to highlight positive reviews on your product cards. This requires an active Jam subscription or tariff option.

### Check Pinning Limits

```typescript
// Check your limits for pinning reviews
const limits = await sdk.communications.getPinnedFeedbacksLimits();

if (limits.data.subscription) {
  console.log('Subscription limits:');
  console.log(`  Total: ${limits.data.subscription.limit}`);
  console.log(`  Used: ${limits.data.subscription.used}`);
  console.log(`  Remaining: ${limits.data.subscription.remaining}`);
}

if (limits.data.tariff) {
  console.log('Tariff limits:');
  console.log(`  Total: ${limits.data.tariff.limit}`);
  console.log(`  Used: ${limits.data.tariff.used}`);
  console.log(`  Remaining: ${limits.data.tariff.remaining}`);
}
```

### Get Pinned Reviews Count

```typescript
// Count pinned reviews
const pinnedCount = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned'
});
console.log(`Total pinned reviews: ${pinnedCount.data}`);

// Count by pin location
const cardCount = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned',
  pinOn: 'nm'  // On product card
});
console.log(`Pinned on cards: ${cardCount.data}`);

const groupCount = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned',
  pinOn: 'imt'  // On merged product group
});
console.log(`Pinned on groups: ${groupCount.data}`);
```

### List Pinned Reviews

```typescript
// Get list of pinned reviews
const pinned = await sdk.communications.getPinnedFeedbacks({
  state: 'pinned',
  limit: 100
});

for (const item of pinned.data ?? []) {
  console.log(`Pin ID: ${item.pinId}`);
  console.log(`Feedback ID: ${item.feedbackId}`);
  console.log(`Pinned on: ${item.pinOn}`);
  console.log(`Pin method: ${item.pinMethod}`);
  console.log(`Pinned at: ${item.pinnedAt}`);
  console.log('---');
}

// Get next page if available
if (pinned.next) {
  const nextPage = await sdk.communications.getPinnedFeedbacks({
    state: 'pinned',
    next: pinned.next
  });
}
```

### Pin a Review

```typescript
// Pin reviews to product cards
const result = await sdk.communications.pinFeedback([
  {
    pinMethod: 'subscription',  // or 'tariff'
    pinOn: 'nm',                // 'nm' for product card, 'imt' for merged group
    feedbackId: 'VlbkVVl7mtw37wyWkJZz'
  },
  {
    pinMethod: 'tariff',
    pinOn: 'imt',
    feedbackId: 'DibuRAImknLyiqgzvGcU'
  }
]);

// Check results
for (const item of result.data ?? []) {
  if (item.isErrors) {
    console.log(`Failed to pin ${item.feedbackId}:`, item.errors);
  } else {
    console.log(`Pinned ${item.feedbackId} with pinId: ${item.pinId}`);
  }
}
```

### Unpin Reviews

```typescript
// Get pinned reviews first to obtain pinIds
const pinned = await sdk.communications.getPinnedFeedbacks({ state: 'pinned' });
const pinIdsToUnpin = pinned.data?.slice(0, 3).map(item => item.pinId) ?? [];

// Unpin the reviews
const result = await sdk.communications.unpinFeedback(pinIdsToUnpin);
console.log(`Successfully unpinned: ${result.data?.join(', ')}`);
```

## Customer Chat

### List All Chats

```typescript
// Get all chats with buyers
const chats = await sdk.communications.getSellerChats();

for (const chat of chats.chats ?? []) {
  console.log(`Chat ID: ${chat.chatId}`);
  console.log(`Buyer ID: ${chat.buyerId}`);
  console.log(`Order ID: ${chat.orderId}`);
  console.log(`Status: ${chat.status}`);
  console.log('---');
}
```

### Get Chat Events

```typescript
// Get chat events (messages, status changes, etc.)
let allEvents: any[] = [];
let nextToken: number | undefined;

// Paginate through all events
do {
  const events = await sdk.communications.getSellerEvents(
    nextToken ? { next: nextToken } : undefined
  );

  allEvents = allEvents.concat(events.events ?? []);
  nextToken = events.next;

  console.log(`Fetched ${events.events?.length} events, total: ${events.totalEvents}`);
} while (nextToken);

console.log(`Total events fetched: ${allEvents.length}`);
```

### Send Message

```typescript
// Send a message to a buyer
// Note: Message content is sent via form data
const result = await sdk.communications.createSellerMessage();
console.log('Message sent:', result);
```

### Download File from Chat

```typescript
// Download a file or image from a chat message
// Get the downloadID from chat events
const downloadId = 'download-id-from-event';
const file = await sdk.communications.getSellerDownload(downloadId);
console.log('File downloaded');
```

## Claims & Returns

### List Return Claims

```typescript
// Get active return claims (last 14 days)
const claims = await sdk.communications.claims({
  is_archive: false,
  limit: 50,
  offset: 0
});

console.log('Return claims:', claims);

// Filter by product
const productClaims = await sdk.communications.claims({
  is_archive: false,
  nm_id: 123456789
});

// Get a specific claim
const specificClaim = await sdk.communications.claims({
  is_archive: false,
  id: 'claim-id-here'
});
```

### Respond to a Claim

```typescript
// Respond to a customer return claim
const result = await sdk.communications.updateClaim();
console.log('Claim response sent:', result);
```

## Deprecated Methods

The following methods have been **removed from the Wildberries API** and are deprecated in this SDK. They will log a warning when called and may return errors from the API.

| Deprecated Method | Description | Reason |
|-------------------|-------------|--------|
| `supplierValuations()` | Get complaint reasons for reviews | Removed from API |
| `createFeedbacksAction()` | Report a review or product issue | Removed from API |
| `templates()` | Get response templates | Removed from API |
| `createTemplate()` | Create a response template | Removed from API |
| `updateTemplate()` | Update a response template | Removed from API |
| `deleteTemplate()` | Delete a response template | Removed from API |

### Migration Notes

**Templates functionality has been removed.** You will need to:
1. Store response templates in your own application
2. Manage templates through your own database or configuration
3. Use the standard `createFeedbacksAnswer()` method to send responses

**Review complaint/action functionality has been removed.** Contact Wildberries support for alternative methods to report problematic reviews.

### Deprecated Method Warnings

When you call a deprecated method, the SDK will log a warning:

```typescript
// This will log a warning to console
const templates = await sdk.communications.templates({ templateType: 1 });
// [WB SDK] templates is deprecated and may be removed. This endpoint has been removed from the Wildberries API.
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

async function processQuestions() {
  try {
    const questions = await sdk.communications.questions({
      isAnswered: false,
      take: 100,
      skip: 0
    });
    // Process questions...
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded');
      console.error(`Retry after: ${error.retryAfter}ms`);
      // SDK handles retry automatically
    } else if (error instanceof AuthenticationError) {
      console.error('Invalid API key - check your credentials');
    } else if (error instanceof ValidationError) {
      console.error('Invalid request:', error.message);
      // Fix request parameters
    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
      // Check connectivity
    } else if (error instanceof WBAPIError) {
      console.error(`API error ${error.statusCode}: ${error.message}`);
    }
  }
}
```

### Handling API Response Errors

The Communications API returns errors in a consistent format:

```typescript
const response = await sdk.communications.questions({
  isAnswered: false,
  take: 100,
  skip: 0
});

if (response.error) {
  console.error(`API Error: ${response.errorText}`);
  if (response.additionalErrors?.length) {
    console.error('Additional errors:', response.additionalErrors);
  }
} else {
  // Process response.data
}
```

## Rate Limits

The Communications API uses different rate limits by endpoint category:

### Rate Limit Tiers

| Category | Requests/Sec | Interval | Burst | Methods |
|----------|-------------|----------|-------|---------|
| **Q&A and Reviews** | 3 | 333ms | 6 | Most feedback/question methods |
| **Pinned Reviews** | 3 | 333ms | 6 | All pinning methods |
| **Customer Chat** | 1 | 1s | 10 | Chat list, events, messages |
| **Claims** | 0.33 | 3s | 10 | `claims()`, `updateClaim()` |

### Rate Limit Tips

- The SDK handles rate limiting automatically with queuing and retry
- **Claims methods are slowest** - only 20 requests per minute
- **Q&A and Reviews** allow 180 requests per minute with 6-request bursts
- Use pagination to reduce the number of API calls
- Batch operations when possible

```typescript
// Efficient: Get 100 items per request
const questions = await sdk.communications.questions({
  isAnswered: false,
  take: 100,  // Maximum items per request
  skip: 0
});

// Less efficient: Get fewer items, requiring more requests
const questions = await sdk.communications.questions({
  isAnswered: false,
  take: 10,
  skip: 0
});
```

## Best Practices

### 1. Monitor for New Content Regularly

```typescript
// Set up a polling interval to check for new questions/reviews
async function checkForNewContent() {
  const newItems = await sdk.communications.newFeedbacksQuestions();

  if (newItems.data?.hasNewQuestions || newItems.data?.hasNewFeedbacks) {
    // Trigger notification or processing
    console.log('New content available!');
  }
}

// Poll every 5 minutes
setInterval(checkForNewContent, 5 * 60 * 1000);
```

### 2. Process Reviews by Rating

```typescript
// Prioritize responding to negative reviews
async function processNegativeReviews() {
  const feedbacks = await sdk.communications.feedbacks({
    isAnswered: false,
    take: 100,
    skip: 0
  });

  // Sort by rating (lowest first)
  const sortedByRating = (feedbacks.data?.feedbacks ?? [])
    .sort((a, b) => (a.productValuation ?? 5) - (b.productValuation ?? 5));

  for (const fb of sortedByRating) {
    if ((fb.productValuation ?? 5) <= 3) {
      console.log(`Priority: ${fb.productValuation} star review`);
      // Handle negative review
    }
  }
}
```

### 3. Use Pinned Reviews Strategically

```typescript
async function pinTopReviews(nmId: number) {
  // Get reviews for a product
  const feedbacks = await sdk.communications.feedbacks({
    isAnswered: true,  // Only processed reviews
    nmId: nmId,
    take: 100,
    skip: 0
  });

  // Find 5-star reviews with photos
  const topReviews = (feedbacks.data?.feedbacks ?? [])
    .filter(fb => fb.productValuation === 5 && fb.photoLinks?.length);

  // Check limits before pinning
  const limits = await sdk.communications.getPinnedFeedbacksLimits();
  const remaining = limits.data.subscription?.remaining ?? 0;

  if (topReviews.length > 0 && remaining > 0) {
    const toPin = topReviews.slice(0, Math.min(remaining, 3));

    await sdk.communications.pinFeedback(
      toPin.map(fb => ({
        pinMethod: 'subscription',
        pinOn: 'nm',
        feedbackId: fb.id!
      }))
    );
  }
}
```

### 4. Track Response Times

```typescript
async function getResponseMetrics() {
  const unansweredToday = await sdk.communications.getQuestionsCountUnanswered();
  const totalUnanswered = await sdk.communications.getQuestionsCount({
    isAnswered: false
  });

  console.log('Question Response Metrics:');
  console.log(`  Unanswered today: ${unansweredToday.data?.countUnansweredToday}`);
  console.log(`  Total unanswered: ${totalUnanswered.data}`);

  const feedbackMetrics = await sdk.communications.getFeedbacksCountUnanswered();
  console.log('Feedback Response Metrics:');
  console.log(`  Unprocessed today: ${feedbackMetrics.data?.countUnansweredToday}`);
  console.log(`  Total unprocessed: ${feedbackMetrics.data?.countUnanswered}`);
  console.log(`  Average rating: ${feedbackMetrics.data?.valuation}`);
}
```

### 5. Handle Claims Promptly

```typescript
async function processReturnClaims() {
  // Claims expire after 14 days - process them regularly
  const claims = await sdk.communications.claims({
    is_archive: false,
    limit: 100,
    offset: 0
  });

  console.log(`Active claims: ${(claims as any[]).length}`);

  // Process each claim based on your return policy
  for (const claim of claims as any[]) {
    console.log(`Claim ${claim.id}: ${claim.status}`);
    // Respond to claim
  }
}
```

## Related Resources

- [API Reference: CommunicationsModule](/api/classes/CommunicationsModule)
- [Rate Limits Configuration](/src/config/communications-rate-limits.ts)
- [Types Reference](/src/types/communications.types.ts)
- [Official WB Communications API](https://dev.wildberries.ru/openapi/user-communication)
