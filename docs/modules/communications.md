# Communications Module

Customer engagement and feedback management for Wildberries marketplace.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `communications` |
| **SDK Namespace** | `sdk.communications.*` |
| **Base URLs** | `https://feedbacks-api.wildberries.ru`, `https://buyer-chat-api.wildberries.ru`, `https://returns-api.wildberries.ru`, `https://api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/09-communications/` |
| **Methods** | 25 |
| **Authentication** | API Key (Header) |

---

## Features

- **Questions & Answers** - Manage customer questions on products
- **Feedbacks/Reviews** - Handle customer reviews and ratings
- **Pinned Reviews** (NEW in Feb 2026) - Pin important reviews to product cards
- **Claims/Returns** - Process return claims
- **Customer Chat** - Direct messaging with customers

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Check for unread reviews and questions
const unread = await sdk.communications.newFeedbacksQuestions();

// Get list of reviews
const reviews = await sdk.communications.feedbacks({ isAnswered: false });

// Reply to a review
await sdk.communications.createFeedbacksAnswer({ id: 'review-id', text: 'Thank you!' });

// Get customer chats
const chats = await sdk.communications.getSellerChats();

// NEW: Pin important reviews
const pinnedCount = await sdk.communications.getPinnedFeedbacksCount();
console.log('Pinned reviews:', pinnedCount.data?.countPinned);

await sdk.communications.pinFeedback([
  {
    pinMethod: 'subscription',
    pinOn: 'nm',
    feedbackId: 'positive-review-id'
  }
]);
```

---

## Methods Reference

### Questions (6 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `newFeedbacksQuestions()` | GET | `/api/v1/new-feedbacks-questions` | Check for unread reviews and questions |
| `getQuestionsCountUnanswered()` | GET | `/api/v1/questions/count-unanswered` | Get unanswered questions count |
| `getQuestionsCount()` | GET | `/api/v1/questions/count` | Get question count for period |
| `questions()` | GET | `/api/v1/questions` | Get questions with filters and pagination |
| `updateQuestion()` | PATCH | `/api/v1/questions` | Mark viewed, reject, answer, or edit answer |
| `question()` | GET | `/api/v1/question` | Get single question by ID |

### Reviews (6 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getFeedbacksCountUnanswered()` | GET | `/api/v1/feedbacks/count-unanswered` | Get unprocessed reviews count and avg rating |
| `getFeedbacksCount()` | GET | `/api/v1/feedbacks/count` | Get review count for period |
| `feedbacks()` | GET | `/api/v1/feedbacks` | Get reviews with filters and pagination |
| `createFeedbacksAnswer()` | POST | `/api/v1/feedbacks/answer` | Reply to customer review |
| `updateFeedbacksAnswer()` | PATCH | `/api/v1/feedbacks/answer` | Edit review response (once per 60 days) |
| `feedback()` | GET | `/api/v1/feedback` | Get single review by ID |

### Reviews - Extended (2 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createOrderReturn()` | POST | `/api/v1/feedbacks/order/return` | Request product return by review ID |
| `getFeedbacksArchive()` | GET | `/api/v1/feedbacks/archive` | Get archived reviews |

### Pinned Reviews (5 methods) - NEW in Feb 2026

Pin important reviews to product cards to highlight positive customer feedback.

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getPinnedFeedbacksCount()` | GET | `/api/feedbacks/v1/pins/count` | Get count of pinned reviews |
| `getPinnedFeedbacksLimits()` | GET | `/api/feedbacks/v1/pins/limits` | Get pinning limits per seller |
| `getPinnedFeedbacks()` | GET | `/api/feedbacks/v1/pins` | List pinned reviews with details |
| `pinFeedback()` | POST | `/api/feedbacks/v1/pins` | Pin reviews to products |
| `unpinFeedback()` | DELETE | `/api/feedbacks/v1/pins` | Unpin reviews from products |

### Buyer Chat (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getSellerChats()` | GET | `/api/v1/seller/chats` | Get all seller chats |
| `getSellerEvents()` | GET | `/api/v1/seller/events` | Get chat events with pagination |
| `createSellerMessage()` | POST | `/api/v1/seller/message` | Send message to customer |
| `getSellerDownload()` | GET | `/api/v1/seller/download/{id}` | Get file/image from message |

### Returns (2 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `claims()` | GET | `/api/v1/claims` | Get return requests (last 14 days) |
| `updateClaim()` | PATCH | `/api/v1/claim` | Respond to return request |

---

## Deprecated Methods

The following methods have been removed from the Wildberries API:

| Method | Status | Notes |
|--------|--------|-------|
| `supplierValuations()` | **Removed** | Complaint reasons endpoint removed from API |
| `createFeedbacksAction()` | **Removed** | Feedback actions endpoint removed from API |
| `templates()` | **Removed** | Templates tag removed from API |
| `createTemplate()` | **Removed** | Templates tag removed from API |
| `updateTemplate()` | **Removed** | Templates tag removed from API |
| `deleteTemplate()` | **Removed** | Templates tag removed from API |

---

## Rate Limits

| Tier | Operations | Limit | Interval |
|------|-----------|-------|----------|
| T1 Questions & Reviews | Questions, reviews, feedback actions | 3 req/sec | 333ms |
| T2 Chat | Seller chats, events, messages, downloads | 10 req/10s | 1s |
| T3 Returns | Claims list and response | 20 req/min | 3s |
| T4 Pinned Reviews | All pinned review operations | 3 req/min | 20s |

---

## See Also

- [Getting Started Guide](../guides/communications-getting-started.md)
- [API Reference: CommunicationsModule](../api/classes/CommunicationsModule.html)
- [Examples](../../examples/communications-pinned-reviews.ts)
