---
title: Customer Communication
description: Guide to managing questions, reviews, chats, and returns using the Wildberries SDK
layout: doc
---

# Customer Communication

This guide covers the full range of customer communication workflows available through the `sdk.communications` module: product questions, reviews and feedback, pinned reviews, buyer chat, and return claims.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Questions](#questions)
- [Feedbacks and Reviews](#feedbacks-and-reviews)
- [Pinned Reviews](#pinned-reviews)
- [Buyer Chat](#buyer-chat)
- [Returns](#returns)
- [Practical Scenarios](#practical-scenarios)

---

## Prerequisites

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
});
```

All methods below are accessed via `sdk.communications.*`. Rate limits for the Questions and Reviews category allow 3 requests per second (333 ms interval, burst of 6). Chat endpoints allow 10 requests per 10 seconds. Claims endpoints allow 20 requests per minute.

---

## Questions

Five methods cover the full question lifecycle: detecting new items, counting unanswered questions, listing with filters, answering, and fetching a single question by ID.

### Check for unseen questions and reviews

`newFeedbacksQuestions()` returns boolean flags indicating whether there are questions or reviews the seller has not yet viewed.

```typescript
const status = await sdk.communications.newFeedbacksQuestions();

if (status.data?.hasNewQuestions) {
  console.log('New questions waiting for review');
}
if (status.data?.hasNewFeedbacks) {
  console.log('New feedbacks waiting for review');
}
```

### Count unanswered questions

`getQuestionsCountUnanswered()` returns the total number of unanswered questions and the count for today specifically.

```typescript
const counts = await sdk.communications.getQuestionsCountUnanswered();

console.log(`Total unanswered: ${counts.data?.countUnanswered}`);
console.log(`Unanswered today: ${counts.data?.countUnansweredToday}`);
```

### List questions with pagination

`questions(params)` returns a paginated list filtered by answer status, product article, date range, and sort order. A single response can hold up to 10,000 questions.

| Parameter | Type | Description |
|-----------|------|-------------|
| `isAnswered` | `boolean` | Filter by answered/unanswered status |
| `nmId` | `number` | Filter by Wildberries article number |
| `take` | `number` | Number of questions to return (max 10,000) |
| `skip` | `number` | Number of questions to skip for pagination |
| `order` | `string` | Sort order (e.g. `'dateAsc'`, `'dateDesc'`) |
| `dateFrom` | `number` | Start date as Unix timestamp (seconds) |
| `dateTo` | `number` | End date as Unix timestamp (seconds) |

```typescript
const result = await sdk.communications.questions({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc',
});

console.log(`Unanswered total: ${result.data?.countUnanswered}`);

for (const q of result.data?.questions ?? []) {
  console.log(`[${q.id}] ${q.text}`);
  console.log(`  Product: ${q.productDetails?.productName} (nmId: ${q.productDetails?.nmId})`);
  console.log(`  Date: ${q.createdDate}`);
  console.log(`  Viewed: ${q.wasViewed}`);
}
```

To paginate through all questions, increment `skip` by the `take` value on each request until the returned array is empty.

### Respond to a question

`updateQuestion(data)` serves three purposes depending on the body you send: mark a question as viewed, answer it, or edit an existing answer. An answer can be edited once within 60 days.

```typescript
// Answer a question
await sdk.communications.updateQuestion({
  id: 'question-uuid',
  answer: { text: 'Thank you for asking. This model supports USB-C charging.' },
  state: 'wbRu',
});

// Mark a question as viewed without answering
await sdk.communications.updateQuestion({
  id: 'question-uuid',
  wasViewed: true,
});
```

### Fetch a single question by ID

`question(params)` returns full details for one question, including its answer if one exists.

```typescript
const detail = await sdk.communications.question({ id: 'question-uuid' });

if (detail.data) {
  console.log(`Question: ${detail.data.text}`);
  console.log(`State: ${detail.data.state}`);
  if (detail.data.answer) {
    console.log(`Answer: ${detail.data.answer.text}`);
    console.log(`Editable: ${detail.data.answer.editable}`);
  }
}
```

---

## Feedbacks and Reviews

Seven methods cover review management: counting unanswered reviews, listing with filters, answering, editing an answer, initiating a product return from a review, fetching a single review, and listing archived reviews.

### Count unanswered feedbacks

`getFeedbacksCountUnanswered()` returns unprocessed review counts and the average rating across all reviews.

```typescript
const stats = await sdk.communications.getFeedbacksCountUnanswered();

console.log(`Unprocessed total: ${stats.data?.countUnanswered}`);
console.log(`Unprocessed today: ${stats.data?.countUnansweredToday}`);
console.log(`Average rating: ${stats.data?.valuation}`);
```

### List feedbacks with pagination

`feedbacks(params)` returns a paginated list of reviews filtered by processing status, product, date range, and sort order.

| Parameter | Type | Description |
|-----------|------|-------------|
| `isAnswered` | `boolean` | Filter by answered/unanswered status |
| `nmId` | `number` | Filter by Wildberries article number |
| `take` | `number` | Number of reviews to return |
| `skip` | `number` | Number of reviews to skip |
| `order` | `'dateAsc' \| 'dateDesc'` | Sort order |
| `dateFrom` | `number` | Start date (Unix timestamp, seconds) |
| `dateTo` | `number` | End date (Unix timestamp, seconds) |

```typescript
const reviews = await sdk.communications.feedbacks({
  isAnswered: false,
  take: 100,
  skip: 0,
  order: 'dateDesc',
});

console.log(`Unprocessed: ${reviews.data?.countUnanswered}`);
console.log(`Archived: ${reviews.data?.countArchive}`);

for (const fb of reviews.data?.feedbacks ?? []) {
  console.log(`[${fb.id}] Rating: ${fb.productValuation}/5`);
  console.log(`  Pros: ${fb.pros}`);
  console.log(`  Cons: ${fb.cons}`);
  console.log(`  Text: ${fb.text}`);
  console.log(`  Product: ${fb.productDetails?.productName}`);

  if (fb.photoLinks?.length) {
    console.log(`  Photos: ${fb.photoLinks.length}`);
  }
  if (fb.video) {
    console.log(`  Has video (${fb.video.durationSec}s)`);
  }
}
```

### Respond to a review

`createFeedbacksAnswer(data)` posts an answer to a review. The review ID is not validated server-side, so ensure you pass a correct ID.

```typescript
await sdk.communications.createFeedbacksAnswer({
  id: 'feedback-uuid',
  text: 'Thank you for your positive feedback! We are glad you liked the product.',
});
```

### Edit an existing response

`updateFeedbacksAnswer(data)` edits a previously submitted answer. This is allowed once within 60 days of the original answer.

```typescript
await sdk.communications.updateFeedbacksAnswer({
  id: 'feedback-uuid',
  text: 'Updated: We have addressed the sizing concern in our latest batch.',
});
```

### Initiate a return from a review

`createOrderReturn(data)` requests a product return for the order associated with a review. Only available when the review has `isAbleReturnProductOrders: true`.

```typescript
const fb = await sdk.communications.feedback({ id: 'feedback-uuid' });

if (fb.data?.isAbleReturnProductOrders) {
  const result = await sdk.communications.createOrderReturn({
    feedbackId: 'feedback-uuid',
  });

  if (!result.error) {
    console.log('Return request submitted successfully');
  }
}
```

### Fetch a single review by ID

`feedback(params)` returns full review details including media, sizing info, complaint options, and return eligibility.

```typescript
const detail = await sdk.communications.feedback({ id: 'feedback-uuid' });

if (detail.data) {
  console.log(`User: ${detail.data.userName}`);
  console.log(`Rating: ${detail.data.productValuation}/5`);
  console.log(`Matching size: ${detail.data.matchingSize}`);
  console.log(`Answer editable: ${detail.data.answer?.editable}`);
  console.log(`Answer state: ${detail.data.answer?.state}`);
  console.log(`Return available: ${detail.data.isAbleReturnProductOrders}`);
}
```

### List archived reviews

`getFeedbacksArchive(params)` returns reviews that have been answered, had no response for 30 days, or lack text and photos.

```typescript
const archived = await sdk.communications.getFeedbacksArchive({
  take: 50,
  skip: 0,
  order: 'dateDesc',
});

for (const fb of archived.data?.feedbacks ?? []) {
  console.log(`[${fb.id}] ${fb.productValuation}/5 - ${fb.text}`);
}
```

---

## Pinned Reviews

Pinned reviews let you highlight positive feedback on product cards. This feature requires an active Jam subscription or a tariff option. Five methods manage the pinning lifecycle.

### Check limits

`getPinnedFeedbacksLimits()` returns the total limit, used count, remaining slots, and per-unit limits for both the subscription and tariff pin methods.

```typescript
const limits = await sdk.communications.getPinnedFeedbacksLimits();

if (limits.data.subscription) {
  const sub = limits.data.subscription;
  console.log(`Subscription: ${sub.used}/${sub.totalLimit} used, ${sub.remaining} remaining`);
  console.log(`  Per-unit limit: ${sub.perUnitLimit}`);
  console.log(`  Unlimited: ${sub.unlimited}`);
}

if (limits.data.tariff) {
  const tar = limits.data.tariff;
  console.log(`Tariff: ${tar.used}/${tar.totalLimit} used, ${tar.remaining} remaining`);
}
```

### Count pinned reviews

`getPinnedFeedbacksCount(params)` returns the count of pinned or unpinned reviews matching optional filters.

```typescript
// Count all pinned reviews
const pinned = await sdk.communications.getPinnedFeedbacksCount({ state: 'pinned' });
console.log(`Total pinned: ${pinned.data}`);

// Count pinned on a specific product card
const forProduct = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned',
  pinOn: 'nm',
  nmId: 123456789,
});
console.log(`Pinned on product: ${forProduct.data}`);

// Count automatically unpinned reviews
const unpinned = await sdk.communications.getPinnedFeedbacksCount({ state: 'unpinned' });
console.log(`Auto-unpinned: ${unpinned.data}`);
```

### List pinned reviews

`getPinnedFeedbacks(params)` returns a paginated list of pinned/unpinned reviews. Use the `next` cursor from the response to fetch subsequent pages.

```typescript
const list = await sdk.communications.getPinnedFeedbacks({
  state: 'pinned',
  limit: 100,
});

for (const item of list.data) {
  console.log(`Pin ID: ${item.pinId}`);
  console.log(`  Feedback: ${item.feedbackId}`);
  console.log(`  Method: ${item.pinMethod}`);
  console.log(`  Location: ${item.pinOn}`);
  console.log(`  nmId: ${item.nmId}, imtId: ${item.imtId}`);
  console.log(`  State changed: ${item.changeStateAt}`);
  if (item.unpinnedCause) {
    console.log(`  Unpinned cause: ${item.unpinnedCause}`);
  }
}

// Fetch next page
if (list.next) {
  const page2 = await sdk.communications.getPinnedFeedbacks({
    state: 'pinned',
    next: list.next,
    limit: 100,
  });
}
```

### Pin reviews

`pinFeedback(data)` pins an array of reviews (max 500 per request). Each item specifies the pin method (`'subscription'` or `'tariff'`), pin location (`'nm'` for a product card, `'imt'` for a merged group), and the feedback ID.

```typescript
const result = await sdk.communications.pinFeedback([
  {
    pinMethod: 'subscription',
    pinOn: 'nm',
    feedbackId: 'VlbkVVl7mtw37wyWkJZz',
  },
  {
    pinMethod: 'tariff',
    pinOn: 'imt',
    feedbackId: 'DibuRAImknLyiqgzvGcU',
  },
]);

for (const item of result.data) {
  if (item.isErrors) {
    console.error(`Failed to pin ${item.feedbackId}:`, item.errors);
  } else {
    console.log(`Pinned ${item.feedbackId} -> pinId: ${item.pinId}`);
  }
}
```

### Unpin reviews

`unpinFeedback(data)` accepts an array of pin IDs (max 500) obtained from `getPinnedFeedbacks()`.

```typescript
const pinned = await sdk.communications.getPinnedFeedbacks({ state: 'pinned' });
const idsToRemove = pinned.data.slice(0, 3).map((item) => item.pinId);

const result = await sdk.communications.unpinFeedback(idsToRemove);
console.log(`Unpinned IDs: ${result.data.join(', ')}`);
```

---

## Buyer Chat

Four methods cover chat interactions: listing chats, retrieving message events, sending a message, and downloading file attachments.

### List chats

`getSellerChats()` returns all chats for the seller. Each chat includes a `replySign` required when sending messages and a `lastMessage` preview.

```typescript
const chats = await sdk.communications.getSellerChats();

for (const chat of chats.result ?? []) {
  console.log(`Chat: ${chat.chatID}`);
  console.log(`  Customer: ${chat.clientName}`);
  console.log(`  Reply sign: ${chat.replySign}`);

  if (chat.lastMessage) {
    const sentAt = new Date(chat.lastMessage.addTimestamp!);
    console.log(`  Last message: "${chat.lastMessage.text}" at ${sentAt.toISOString()}`);
  }

  if (chat.goodCard) {
    console.log(`  Product nmId: ${chat.goodCard.nmID}, price: ${chat.goodCard.price}`);
  }
}
```

### Get chat events and messages

`getSellerEvents(params)` returns paginated events across all chats. Use the `next` cursor from the response to page through all events. An event with `totalEvents: 0` signals that you have received everything.

```typescript
let allEvents: typeof firstPage.result.events = [];
let cursor: number | undefined;

// Fetch the first page
const firstPage = await sdk.communications.getSellerEvents();
allEvents = firstPage.result?.events ?? [];
cursor = firstPage.result?.next;

// Continue fetching until no more events
while (cursor) {
  const page = await sdk.communications.getSellerEvents({ next: cursor });
  const events = page.result?.events ?? [];
  allEvents = allEvents.concat(events);
  cursor = page.result?.totalEvents === 0 ? undefined : page.result?.next;
}

console.log(`Total events fetched: ${allEvents.length}`);

for (const event of allEvents) {
  console.log(`[${event.addTime}] ${event.sender}: ${event.message?.text}`);
  if (event.isNewChat) {
    console.log('  -- New chat started');
  }
  if (event.message?.attachments?.files?.length) {
    for (const file of event.message.attachments.files) {
      console.log(`  Attachment: ${file.name} (${file.contentType}, ${file.size} bytes)`);
    }
  }
}
```

### Send a message

`createSellerMessage()` sends a message to a buyer chat. The message content is transmitted via form data.

```typescript
const response = await sdk.communications.createSellerMessage();

if (response.errors?.length) {
  console.error('Message errors:', response.errors);
} else {
  console.log(`Message sent to chat ${response.result?.chatID} at ${response.result?.addTime}`);
}
```

### Download a file attachment

`getSellerDownload(id)` retrieves a file or image by its `downloadID`, which you obtain from chat event attachments.

```typescript
// Get events first to find downloadIDs
const events = await sdk.communications.getSellerEvents();

for (const event of events.result?.events ?? []) {
  const files = event.message?.attachments?.files ?? [];
  for (const file of files) {
    if (file.downloadID) {
      const data = await sdk.communications.getSellerDownload(file.downloadID);
      console.log(`Downloaded: ${file.name}`);
    }
  }

  const images = event.message?.attachments?.images ?? [];
  for (const img of images) {
    if (img.downloadID) {
      const data = await sdk.communications.getSellerDownload(img.downloadID);
      console.log(`Downloaded image: ${img.downloadID}`);
    }
  }
}
```

---

## Returns

Two methods handle return claims from buyers. Claims are available for the last 14 days.

### List return claims

`claims(params)` returns claims filtered by archive status, claim ID, product article, and pagination parameters.

| Parameter | Type | Description |
|-----------|------|-------------|
| `is_archive` | `boolean` | `false` for active claims, `true` for archived |
| `id` | `string` | Filter by specific claim ID |
| `limit` | `number` | Max claims to return |
| `offset` | `number` | Number of claims to skip |
| `nm_id` | `number` | Filter by product article number |

```typescript
// Get active return claims
const activeClaims = await sdk.communications.claims({
  is_archive: false,
  limit: 50,
  offset: 0,
});

console.log('Active claims:', activeClaims);

// Filter claims for a specific product
const productClaims = await sdk.communications.claims({
  is_archive: false,
  nm_id: 123456789,
});

// Look up a specific claim
const single = await sdk.communications.claims({
  is_archive: false,
  id: 'claim-uuid',
});
```

### Respond to a claim

`updateClaim()` sends a response to a buyer's return claim.

```typescript
const result = await sdk.communications.updateClaim();
console.log('Claim response submitted:', result);
```

---

## Practical Scenarios

### Polling for new questions and reviews

Set up a periodic check that detects unseen questions or feedbacks and triggers downstream processing.

```typescript
async function pollForNewContent(sdk: WildberriesSDK): Promise<void> {
  const status = await sdk.communications.newFeedbacksQuestions();

  if (status.data?.hasNewQuestions) {
    const counts = await sdk.communications.getQuestionsCountUnanswered();
    console.log(`${counts.data?.countUnanswered} unanswered questions detected`);
    // Trigger your question-processing pipeline here
  }

  if (status.data?.hasNewFeedbacks) {
    const counts = await sdk.communications.getFeedbacksCountUnanswered();
    console.log(`${counts.data?.countUnanswered} unprocessed reviews detected`);
    // Trigger your review-processing pipeline here
  }
}

// Poll every 5 minutes
const POLL_INTERVAL_MS = 5 * 60 * 1000;

setInterval(() => {
  pollForNewContent(sdk).catch((err) => {
    console.error('Polling error:', err.message);
  });
}, POLL_INTERVAL_MS);
```

### Bulk responding to unanswered questions

Iterate through all unanswered questions, apply a response based on product category, and respect rate limits by processing in batches.

```typescript
async function answerAllQuestions(sdk: WildberriesSDK): Promise<void> {
  let skip = 0;
  const take = 100;
  let answered = 0;

  while (true) {
    const page = await sdk.communications.questions({
      isAnswered: false,
      take,
      skip,
      order: 'dateAsc', // oldest first
    });

    const questions = page.data?.questions ?? [];
    if (questions.length === 0) break;

    for (const q of questions) {
      if (!q.id || !q.text) continue;

      // Build a response based on the question content
      const responseText = buildQuestionResponse(q.text, q.productDetails);

      await sdk.communications.updateQuestion({
        id: q.id,
        answer: { text: responseText },
        state: 'wbRu',
      });

      answered++;
    }

    skip += take;
  }

  console.log(`Answered ${answered} questions`);
}

function buildQuestionResponse(
  questionText: string,
  product?: { productName?: string; brandName?: string }
): string {
  // Replace with your own template logic
  const name = product?.productName ?? 'this product';
  return `Thank you for your question about ${name}. Our team will review the details and update this response shortly.`;
}
```

### Negative review handling workflow

Detect negative reviews, escalate them, and pin the best positive reviews on the same product to offset the impact.

```typescript
async function handleNegativeReviews(sdk: WildberriesSDK): Promise<void> {
  const result = await sdk.communications.feedbacks({
    isAnswered: false,
    take: 100,
    skip: 0,
    order: 'dateDesc',
  });

  const feedbacks = result.data?.feedbacks ?? [];

  for (const fb of feedbacks) {
    const rating = fb.productValuation ?? 5;
    const nmId = fb.productDetails?.nmId;

    if (rating <= 2) {
      // Step 1: Respond with a conciliatory message
      if (fb.id) {
        await sdk.communications.createFeedbacksAnswer({
          id: fb.id,
          text:
            'We sincerely apologize for the inconvenience. ' +
            'Our quality team has been notified and will investigate. ' +
            'Please contact us via chat so we can resolve this for you.',
        });
      }

      // Step 2: If a return is available, initiate it proactively
      if (fb.isAbleReturnProductOrders && fb.id) {
        await sdk.communications.createOrderReturn({ feedbackId: fb.id });
        console.log(`Return initiated for review ${fb.id}`);
      }

      // Step 3: Pin a top-rated review on the same product to offset
      if (nmId) {
        await pinBestReviewForProduct(sdk, nmId);
      }
    }
  }
}

async function pinBestReviewForProduct(
  sdk: WildberriesSDK,
  nmId: number
): Promise<void> {
  // Check remaining pin slots
  const limits = await sdk.communications.getPinnedFeedbacksLimits();
  const remaining = limits.data.subscription?.remaining ?? limits.data.tariff?.remaining ?? 0;

  if (remaining === 0) {
    console.log('No pinning slots available');
    return;
  }

  // Already pinned on this product?
  const existing = await sdk.communications.getPinnedFeedbacksCount({
    state: 'pinned',
    pinOn: 'nm',
    nmId,
  });

  if (existing.data >= (limits.data.subscription?.perUnitLimit ?? 3)) {
    console.log(`Product ${nmId} already at pin limit`);
    return;
  }

  // Find a 5-star review with photos
  const reviews = await sdk.communications.feedbacks({
    isAnswered: true,
    nmId,
    take: 50,
    skip: 0,
    order: 'dateDesc',
  });

  const candidate = (reviews.data?.feedbacks ?? []).find(
    (fb) => fb.productValuation === 5 && (fb.photoLinks?.length ?? 0) > 0
  );

  if (candidate?.id) {
    const pinResult = await sdk.communications.pinFeedback([
      {
        pinMethod: limits.data.subscription ? 'subscription' : 'tariff',
        pinOn: 'nm',
        feedbackId: candidate.id,
      },
    ]);

    const item = pinResult.data[0];
    if (item?.isErrors) {
      console.error(`Pin failed for ${candidate.id}:`, item.errors);
    } else {
      console.log(`Pinned review ${candidate.id} on product ${nmId}`);
    }
  }
}
```

### Integrating chat events into a CRM

Continuously sync chat events from Wildberries into an external system by tracking the pagination cursor.

```typescript
interface CRMEvent {
  chatId: string;
  timestamp: string;
  sender: string;
  text: string;
  attachments: string[];
  isNew: boolean;
}

async function syncChatEventsToCRM(sdk: WildberriesSDK): Promise<void> {
  const events = await sdk.communications.getSellerEvents();
  const items = events.result?.events ?? [];

  const crmEvents: CRMEvent[] = items.map((event) => ({
    chatId: event.chatID ?? '',
    timestamp: event.addTime ?? '',
    sender: event.sender ?? 'unknown',
    text: event.message?.text ?? '',
    attachments: [
      ...(event.message?.attachments?.files?.map((f) => f.name ?? '') ?? []),
      ...(event.message?.attachments?.images?.map((i) => i.downloadID ?? '') ?? []),
    ],
    isNew: event.isNewChat ?? false,
  }));

  // Push to your CRM system
  for (const crmEvent of crmEvents) {
    await pushToCRM(crmEvent);
  }

  console.log(`Synced ${crmEvents.length} events to CRM`);

  // Continue pagination if more events exist
  if (events.result?.next && events.result?.totalEvents !== 0) {
    await syncNextPage(sdk, events.result.next);
  }
}

async function syncNextPage(sdk: WildberriesSDK, cursor: number): Promise<void> {
  const page = await sdk.communications.getSellerEvents({ next: cursor });
  const items = page.result?.events ?? [];

  if (items.length === 0) return;

  for (const event of items) {
    await pushToCRM({
      chatId: event.chatID ?? '',
      timestamp: event.addTime ?? '',
      sender: event.sender ?? 'unknown',
      text: event.message?.text ?? '',
      attachments: [
        ...(event.message?.attachments?.files?.map((f) => f.name ?? '') ?? []),
        ...(event.message?.attachments?.images?.map((i) => i.downloadID ?? '') ?? []),
      ],
      isNew: event.isNewChat ?? false,
    });
  }

  if (page.result?.next && page.result?.totalEvents !== 0) {
    await syncNextPage(sdk, page.result.next);
  }
}

async function pushToCRM(event: CRMEvent): Promise<void> {
  // Replace with your actual CRM integration
  console.log(`CRM <- [${event.chatId}] ${event.sender}: ${event.text}`);
}
```

---

## Related

- [Communications Module API Reference](/modules/communications) -- full method signatures and type definitions
- [Best Practices](/guides/best-practices) -- general SDK usage patterns and error handling
- [Configuration](/guides/configuration) -- SDK initialization, timeouts, and retry settings
