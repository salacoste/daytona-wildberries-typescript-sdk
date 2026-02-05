# Communications Module

The **Communications** module manages customer interactions including product reviews, questions, buyer chat, answer templates, and return requests.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `communications` |
| **SDK Namespace** | `sdk.communications.*` |
| **Base URLs** | `https://feedbacks-api.wildberries.ru`, `https://buyer-chat-api.wildberries.ru`, `https://returns-api.wildberries.ru`, `https://api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/09-communications/` |
| **Methods** | 26 |
| **Authentication** | API Key (Header) |

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

### Reviews (8 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getFeedbacksCountUnanswered()` | GET | `/api/v1/feedbacks/count-unanswered` | Get unprocessed reviews count and avg rating |
| `getFeedbacksCount()` | GET | `/api/v1/feedbacks/count` | Get review count for period |
| `feedbacks()` | GET | `/api/v1/feedbacks` | Get reviews with filters and pagination |
| `supplierValuations()` | GET | `/api/v1/supplier-valuations` | Get complaint reasons and product problem lists |
| `createFeedbacksAction()` | POST | `/api/v1/feedbacks/actions` | Submit complaint or report product problem |
| `createFeedbacksAnswer()` | POST | `/api/v1/feedbacks/answer` | Reply to customer review |
| `updateFeedbacksAnswer()` | PATCH | `/api/v1/feedbacks/answer` | Edit review response (once per 60 days) |
| `feedback()` | GET | `/api/v1/feedback` | Get single review by ID |

### Reviews - Extended (2 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createOrderReturn()` | POST | `/api/v1/feedbacks/order/return` | Request product return by review ID |
| `getFeedbacksArchive()` | GET | `/api/v1/feedbacks/archive` | Get archived reviews |

### Answer Templates (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `templates()` | GET | `/api/v1/templates` | Get answer templates |
| `createTemplate()` | POST | `/api/v1/templates` | Create answer template (max 20 total) |
| `updateTemplate()` | PATCH | `/api/v1/templates` | Edit answer template |
| `deleteTemplate()` | DELETE | `/api/v1/templates` | Delete answer template |

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

## Rate Limits

| Tier | Operations | Limit | Interval |
|------|-----------|-------|----------|
| T1 Questions & Reviews | Questions, reviews, templates, feedback actions | 3 req/sec | 333ms |
| T2 Chat | Seller chats, events, messages, downloads | 10 req/10s | 1s |
| T3 Returns | Claims list and response | 20 req/min | 3s |

---

## Related Resources

- [API Reference: CommunicationsModule](/api/classes/CommunicationsModule)
