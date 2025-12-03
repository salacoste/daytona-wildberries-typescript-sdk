[Wildberries API TypeScript SDK](../modules.md) / CommunicationsModule

# Class: CommunicationsModule

Defined in: [modules/communications/index.ts:112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L112)

CommunicationsModule class

Provides methods for interacting with the Wildberries Chat with Customers API.

## Constructors

### Constructor

```ts
new CommunicationsModule(client: BaseClient): CommunicationsModule;
```

Defined in: [modules/communications/index.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L118)

Creates a new CommunicationsModule instance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) | The BaseClient instance for making HTTP requests |

#### Returns

`CommunicationsModule`

## Methods

### getChats()

```ts
getChats(): Promise<ChatsResponse>;
```

Defined in: [modules/communications/index.ts:153](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L153)

Get all chat conversations

This method retrieves ALL active chat conversations with customers.
The API does not support filtering, so all chats are returned in a single response.

Each chat includes a `replySign` field which is required for sending messages
to that chat via `sendMessage()`.

**Rate Limit**: 10 requests per 10 seconds

#### Returns

`Promise`\<[`ChatsResponse`](../interfaces/ChatsResponse.md)\>

Promise resolving to list of all chats with replySign for each

#### Throws

When API key is invalid or missing

#### Throws

When rate limit is exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
const chatsResponse = await sdk.communications.getChats();
const chats = chatsResponse.result;

console.log(`You have ${chats.length} active chats`);

// Extract replySign for sending messages
chats.forEach(chat => {
  console.log(`Chat ${chat.chatID} with ${chat.clientName}`);
  console.log(`Reply sign: ${chat.replySign}`);
});
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1chats/get](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1chats/get)

***

### getChatEvents()

```ts
getChatEvents(next?: number): Promise<EventsResponse>;
```

Defined in: [modules/communications/index.ts:217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L217)

Get chat events using cursor pagination

This method retrieves events for ALL chats (not per-chat).
The API uses cursor-based pagination with the `next` parameter.

**Event-Based Architecture**:
- Returns events for ALL chats in a single stream
- Use `next` parameter for pagination (Unix timestamp with milliseconds)
- Continue fetching until `totalEvents` equals 0
- Client-side filtering required to view events for specific chats

**Cursor Pagination Pattern**:
1. First request: Call without `next` parameter
2. Subsequent requests: Use `next` value from previous response
3. Stop when `totalEvents` is 0 (no more events)

**Rate Limit**: 10 requests per 10 seconds

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `next?` | `number` | Optional cursor timestamp (Unix timestamp with milliseconds) from previous response |

#### Returns

`Promise`\<[`EventsResponse`](../interfaces/EventsResponse.md)\>

Promise resolving to events with pagination cursor

#### Throws

When next parameter is invalid (must be positive number)

#### Throws

When API key is invalid or missing

#### Throws

When rate limit is exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// First request (no cursor)
const firstPage = await sdk.communications.getChatEvents();
console.log(`Found ${firstPage.result.totalEvents} events`);

// Continue pagination
let cursor = firstPage.result.next;
while (firstPage.result.totalEvents > 0) {
  const nextPage = await sdk.communications.getChatEvents(cursor);
  console.log(`Fetched ${nextPage.result.events.length} more events`);

  if (nextPage.result.totalEvents === 0) break;
  cursor = nextPage.result.next;
}
```

```typescript
// Filter events for specific chat
const eventsResponse = await sdk.communications.getChatEvents();
const chatID = '1:4019cd7d-cca8-4e90-8b11-f78afbea42e3';
const chatEvents = eventsResponse.result.events.filter(e => e.chatID === chatID);

// Filter only customer messages
const customerMessages = eventsResponse.result.events.filter(e => e.sender === 'client');
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get)

***

### sendMessage()

```ts
sendMessage(
   replySign: string, 
   message?: string, 
files?: File[] | Blob[]): Promise<MessageResponse>;
```

Defined in: [modules/communications/index.ts:298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L298)

Send message to customer chat

Sends a text message and/or file attachments to a customer chat conversation.
Uses multipart/form-data format for file uploads.

**Required Parameters**:
- `replySign`: Chat signature from `getChats()` or `getChatEvents()` (when isNewChat=true)
- At least one of: `message` (text) or `files` (attachments)

**Message Constraints**:
- Text: Maximum 1000 characters
- Files: JPEG, PDF, PNG only
- File size: 5MB per file, 30MB total

**Rate Limit**: 10 requests per 10 seconds

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `replySign` | `string` | Chat signature (required, max 255 characters) |
| `message?` | `string` | Optional message text (max 1000 characters) |
| `files?` | `File`[] \| `Blob`[] | Optional file attachments (File[] or Blob[]) |

#### Returns

`Promise`\<[`MessageResponse`](../interfaces/MessageResponse.md)\>

Promise resolving to sent message confirmation with chatID and addTime

#### Throws

When replySign is empty, too long, or message exceeds 1000 chars

#### Throws

When neither message nor files are provided

#### Throws

When file type is unsupported or size exceeds limits

#### Throws

When API key is invalid or missing

#### Throws

When rate limit is exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// Text-only message
const replySign = chat.replySign;
await sdk.communications.sendMessage(
  replySign,
  'Thank you for your message! We will help you shortly.'
);
```

```typescript
// Message with file attachments
const files = [
  new File([pdfBlob], 'receipt.pdf', { type: 'application/pdf' }),
  new File([imageBlob], 'photo.jpg', { type: 'image/jpeg' })
];

await sdk.communications.sendMessage(
  replySign,
  'Here are the requested documents.',
  files
);
```

```typescript
// Files only (no text)
await sdk.communications.sendMessage(replySign, undefined, files);
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post)

***

### pollForNewEvents()

```ts
pollForNewEvents(intervalMs: number, callback: (events: ChatEvent[]) => void | Promise<void>): {
  stop: () => void;
};
```

Defined in: [modules/communications/index.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L413)

Poll for new chat events (message-based updates)

Sets up periodic polling for new chat events using cursor-based pagination.
Automatically tracks the cursor across polling cycles and invokes the callback
with new events when they arrive.

**Polling Pattern**:
- Uses cursor from previous response for subsequent requests
- Only invokes callback when `totalEvents > 0`
- Continues polling until `stop()` is called
- Handles errors gracefully (continues polling on transient errors)

**Best Practices**:
- Minimum interval: 10 seconds (matches rate limit: 10 req/10s)
- Use `stop()` function for graceful shutdown
- Handle errors in callback to prevent polling interruption

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `intervalMs` | `number` | `10000` | Polling interval in milliseconds (default: 10000ms, min recommended: 10000ms) |
| `callback` | (`events`: [`ChatEvent`](../interfaces/ChatEvent.md)[]) => `void` \| `Promise`\<`void`\> | `undefined` | Function called with new events (can be async) |

#### Returns

```ts
{
  stop: () => void;
}
```

Object with `stop()` method to cancel polling

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `stop()` | () => `void` | [modules/communications/index.ts:416](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L416) |

#### Example

```typescript
// Start polling for new events every 10 seconds
const polling = sdk.communications.pollForNewEvents(10000, async (events) => {
  console.log(`Received ${events.length} new events`);

  // Process customer messages
  const customerMessages = events.filter(e => e.sender === 'client');
  for (const event of customerMessages) {
    console.log(`New message from ${event.clientName}: ${event.message?.text}`);

    // Auto-respond (example)
    if (event.isNewChat && event.replySign) {
      await sdk.communications.sendMessage(
        event.replySign,
        'Thank you for contacting us! We will respond shortly.'
      );
    }
  }
});

// Stop polling when done (e.g., on application shutdown)
process.on('SIGTERM', () => {
  polling.stop();
});
```

#### See

[getChatEvents](#getchatevents) for manual event fetching

***

### getQuestions()

```ts
getQuestions(filters: QuestionFilters): Promise<QuestionsResponse>;
```

Defined in: [modules/communications/index.ts:504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L504)

Get product questions with filtering

Retrieves customer questions about products with support for filtering by
answered status, product ID, date range, and pagination.

**Pagination Limits**:
- Maximum 10,000 questions per response
- `take + skip` must not exceed 10,000

**Question States**:
- `suppliersPortalSynch` — New unanswered question
- `wbRu` — Answered question visible to customers
- `none` — Rejected question (not visible)

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters` | [`QuestionFilters`](../interfaces/QuestionFilters.md) | Filter criteria (isAnswered, take, skip required; nmId, order, dateFrom, dateTo optional) |

#### Returns

`Promise`\<[`QuestionsResponse`](../interfaces/QuestionsResponse.md)\>

Promise resolving to questions with counts and product details

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When required filters missing

#### Throws

When network request fails

#### Example

```typescript
// Get unanswered questions sorted by newest first
const response = await sdk.communications.getQuestions({
  isAnswered: false,
  take: 20,
  skip: 0,
  order: 'dateDesc'
});

console.log(`${response.data.countUnanswered} unanswered questions`);
for (const q of response.data.questions) {
  console.log(`Q: ${q.text}`);
  console.log(`Product: ${q.productDetails.productName} (nmId: ${q.productDetails.nmId})`);
}

// Filter questions for specific product
const productQuestions = await sdk.communications.getQuestions({
  isAnswered: false,
  nmId: 12345,
  take: 10,
  skip: 0
});
```

***

### answerQuestion()

```ts
answerQuestion(
   questionId: string, 
   answerText: string, 
reject?: boolean): Promise<void>;
```

Defined in: [modules/communications/index.ts:571](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L571)

Answer or reject product question

Provides an answer to a customer question or rejects it. Answered questions
with state `wbRu` are visible to all customers on the product page.

**Answer Editing**:
- Can edit answer once within 60 days of original response
- Check `question.answer.editable` field before attempting edit
- Use same method to edit (just call with updated text)

**Question States**:
- `wbRu` — Answer visible to customers (use `reject: false` or omit)
- `none` — Question rejected, not visible (use `reject: true`)

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `questionId` | `string` | Question ID from getQuestions() |
| `answerText` | `string` | Answer text to display to customer |
| `reject?` | `boolean` | Optional: true to reject question (state='none'), false/undefined to answer (state='wbRu') |

#### Returns

`Promise`\<`void`\>

Promise resolving to void (204 No Content)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded

#### Throws

When questionId or answerText empty

#### Throws

When network request fails

#### Example

```typescript
// Answer a question
await sdk.communications.answerQuestion(
  'q123',
  'This product is made of 100% cotton and machine washable.'
);

// Reject a question (not visible to customers)
await sdk.communications.answerQuestion(
  'q456',
  'Internal note: inappropriate question',
  true // reject = true sets state to 'none'
);

// Edit an existing answer (within 60 days)
const questions = await sdk.communications.getQuestions({
  isAnswered: true,
  take: 10,
  skip: 0
});
const editableQuestion = questions.data.questions.find(q => q.answer?.editable);
if (editableQuestion) {
  await sdk.communications.answerQuestion(
    editableQuestion.id,
    'Updated answer with more details.'
  );
}
```

***

### markQuestionViewed()

```ts
markQuestionViewed(questionId: string): Promise<void>;
```

Defined in: [modules/communications/index.ts:629](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L629)

Mark question as viewed without answering

Marks a question as viewed for tracking purposes without providing an answer.
Useful for keeping track of which questions the seller has reviewed.

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `questionId` | `string` | Question ID from getQuestions() |

#### Returns

`Promise`\<`void`\>

Promise resolving to void

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded

#### Throws

When questionId is empty

#### Throws

When network request fails

#### Example

```typescript
// Batch mark questions as viewed
const response = await sdk.communications.getQuestions({
  isAnswered: false,
  take: 20,
  skip: 0
});

for (const question of response.data.questions) {
  if (!question.wasViewed) {
    await sdk.communications.markQuestionViewed(question.id);
    console.log(`Marked question ${question.id} as viewed`);
  }
}
```

***

### getNewFeedbacksQuestions()

```ts
getNewFeedbacksQuestions(): Promise<NewFeedbacksQuestionsResponse>;
```

Defined in: [modules/communications/index.ts:701](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L701)

Check for new unviewed feedbacks and questions

Essential method for SLA compliance and customer service monitoring.
Returns indicators for new unviewed customer interactions that require attention.

**Use Cases:**
- Dashboard notifications for customer service teams
- Automated alerting for high-priority interactions
- SLA monitoring and compliance tracking
- Real-time customer service workload management

**Rate Limit**: 3 requests per second (burst: 6)

#### Returns

`Promise`\<[`NewFeedbacksQuestionsResponse`](../interfaces/NewFeedbacksQuestionsResponse.md)\>

Promise resolving to new feedbacks and questions indicators

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// Check for new customer interactions
const result = await sdk.communications.getNewFeedbacksQuestions();

if (result.hasNewQuestions) {
  console.log(`You have ${result.newQuestionsCount} new questions`);
  // Trigger alert or update UI
}

if (result.hasNewFeedbacks) {
  console.log(`You have ${result.newFeedbacksCount} new reviews`);
  // Update review queue
}

// Use for dashboard notifications
const requiresAttention = result.hasNewQuestions || result.hasNewFeedbacks;
setNotificationBadge(requiresAttention);
```

```typescript
// Periodic monitoring for SLA compliance
setInterval(async () => {
  const check = await sdk.communications.getNewFeedbacksQuestions();
  if (check.hasNewQuestions) {
    await notifySupportTeam(check.newQuestionsCount);
  }
}, 60000); // Check every minute
```

***

### getQuestionsCountUnanswered()

```ts
getQuestionsCountUnanswered(): Promise<QuestionsCountUnansweredResponse>;
```

Defined in: [modules/communications/index.ts:763](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L763)

Get dashboard metrics for unanswered questions

Returns comprehensive metrics for unanswered questions including daily counts,
category breakdown, and performance indicators. Essential for customer service
team management and performance tracking.

**Dashboard Metrics:**
- Total unanswered questions count
- Today's unanswered questions (SLA tracking)
- Weekly and monthly trends
- Breakdown by product categories
- Average response time performance

**Rate Limit**: 3 requests per second (burst: 6)

#### Returns

`Promise`\<[`QuestionsCountUnansweredResponse`](../interfaces/QuestionsCountUnansweredResponse.md)\>

Promise resolving to unanswered questions dashboard metrics

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// Get customer service dashboard metrics
const metrics = await sdk.communications.getQuestionsCountUnanswered();

console.log(`Total unanswered: ${metrics.countUnanswered}`);
console.log(`New today: ${metrics.countUnansweredToday}`);
console.log(`Average response time: ${metrics.averageResponseTimeHours}h`);

// Display category breakdown
if (metrics.byCategories) {
  metrics.byCategories.forEach(category => {
    console.log(`${category.categoryName}: ${category.count} questions`);
  });
}

// SLA compliance check
const slaCompliant = metrics.averageResponseTimeHours <= 2;
updateSlaIndicator(slaCompliant);
```

```typescript
// Team workload management
const workload = await sdk.communications.getQuestionsCountUnanswered();
const teamCapacity = 50; // questions per team member per day
const requiredStaff = Math.ceil(workload.countUnansweredToday / teamCapacity);

if (requiredStaff > currentStaff) {
  alertManagement(`Need ${requiredStaff - currentStaff} more staff today`);
}
```

***

### getQuestionById()

```ts
getQuestionById(questionId: string): Promise<QuestionByIdResponse>;
```

Defined in: [modules/communications/index.ts:842](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L842)

Get detailed information about a specific question

Retrieves comprehensive question details including priority assessment,
customer history, product performance data, and suggested responses.
Essential for personalized customer service and efficient question handling.

**Enhanced Features:**
- Priority assessment (urgent/high/medium/low)
- Customer purchase history and VIP status
- Product sales performance data
- Suggested response templates
- Related questions and context
- Sentiment analysis
- Recommended response time

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `questionId` | `string` | Question ID from getQuestions() |

#### Returns

`Promise`\<[`QuestionByIdResponse`](../interfaces/QuestionByIdResponse.md)\>

Promise resolving to detailed question information with metadata

#### Throws

When questionId is empty

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// Get detailed question information
const questionDetail = await sdk.communications.getQuestionById('q123');
const question = questionDetail.data;

console.log(`Priority: ${question.priority}`);
console.log(`Age: ${question.hoursSinceCreation} hours`);
console.log(`Urgent: ${question.requiresUrgentAttention}`);

// Check customer VIP status
if (question.customerHistory?.isVipCustomer) {
  console.log('VIP customer - prioritize response');
}

// Review suggested templates
if (question.suggestedTemplates && question.suggestedTemplates.length > 0) {
  const bestTemplate = question.suggestedTemplates[0];
  console.log(`Suggested: ${bestTemplate.templateName}`);
  console.log(`Match: ${bestTemplate.matchScore}%`);
  console.log(`Preview: ${bestTemplate.preview}`);
}
```

```typescript
// Automated question triage
const question = await sdk.communications.getQuestionById(questionId);

if (question.data.requiresUrgentAttention) {
  // Notify support team immediately
  await notifyUrgentQuestion(question.data);
} else if (question.data.priority === 'high') {
  // Add to priority queue
  addToPriorityQueue(question.data);
} else {
  // Add to regular queue
  addToRegularQueue(question.data);
}

// Check sentiment for negative reviews
if (question.data.sentiment?.sentiment === 'negative') {
  await escalateToManager(question.data);
}
```

***

### getReviews()

```ts
getReviews(filters: ReviewFilters): Promise<ReviewsResponse>;
```

Defined in: [modules/communications/index.ts:922](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L922)

Get product reviews with filtering

Retrieves customer reviews with ratings, photos, videos, and product details.
Supports filtering by answered status, product ID, date range, and pagination.

**Pagination Limits**:
- Maximum 5,000 reviews per response (`take` max: 5000)
- Maximum skip offset: 199,990

**Review Structure**:
- Rating: 1-5 stars (`productValuation`)
- Content: text, pros, cons
- Media: photos (fullSize, miniSize URLs), video (HLS playlist)
- Customer info: userName, matchingSize, bables (tags)

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters` | [`ReviewFilters`](../interfaces/ReviewFilters.md) | Filter criteria (isAnswered, take, skip required; nmId, order, dateFrom, dateTo optional) |

#### Returns

`Promise`\<[`ReviewsResponse`](../interfaces/ReviewsResponse.md)\>

Promise resolving to reviews with photos, videos, and ratings

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When required filters missing

#### Throws

When network request fails

#### Example

```typescript
// Get unanswered reviews with newest first
const response = await sdk.communications.getReviews({
  isAnswered: false,
  take: 20,
  skip: 0,
  order: 'dateDesc'
});

console.log(`${response.data.countUnanswered} unanswered reviews`);
for (const review of response.data.feedbacks) {
  console.log(`Rating: ${review.productValuation}/5 stars`);
  console.log(`Review: ${review.text}`);
  console.log(`Pros: ${review.pros}, Cons: ${review.cons}`);

  // Check for photos
  if (review.photoLinks && review.photoLinks.length > 0) {
    console.log(`Photos: ${review.photoLinks.length}`);
    review.photoLinks.forEach(photo => {
      console.log(`  - ${photo.fullSize}`);
    });
  }

  // Check for video
  if (review.video) {
    console.log(`Video: ${review.video.durationSec}s - ${review.video.link}`);
  }
}

// Filter reviews for specific product
const productReviews = await sdk.communications.getReviews({
  isAnswered: false,
  nmId: 12345,
  take: 10,
  skip: 0
});
```

***

### respondToReview()

```ts
respondToReview(reviewId: string, responseText: string): Promise<void>;
```

Defined in: [modules/communications/index.ts:991](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L991)

Respond to customer review

Provides a professional response to a customer review. Responses are visible
to all customers viewing the product page.

**Response Constraints**:
- Minimum length: 2 characters
- Maximum length: 5,000 characters
- Professional tone recommended

**Response Editing**:
- Can edit response once within 60 days
- Check `review.answer.editable` field before attempting edit
- Use `editReviewResponse()` method to edit existing response

**Note**: Review ID is not validated by API - invalid IDs won't throw errors

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reviewId` | `string` | Review ID from getReviews() |
| `responseText` | `string` | Response text (min 2, max 5000 characters) |

#### Returns

`Promise`\<`void`\>

Promise resolving to void (204 No Content)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded

#### Throws

When reviewId empty or responseText length invalid

#### Throws

When network request fails

#### Example

```typescript
// Professional response to positive review
await sdk.communications.respondToReview(
  'rev123',
  'Thank you for your wonderful feedback! We're delighted that you enjoyed our product. We appreciate your business and hope to serve you again soon.'
);

// Constructive response to negative review
await sdk.communications.respondToReview(
  'rev456',
  'We sincerely apologize for your experience. Customer satisfaction is our priority. Please contact us directly at support@example.com so we can make this right.'
);

// Response to review with specific feedback
const reviews = await sdk.communications.getReviews({
  isAnswered: false,
  take: 10,
  skip: 0
});
for (const review of reviews.data.feedbacks) {
  if (review.productValuation === 5) {
    await sdk.communications.respondToReview(
      review.id,
      `Thank you ${review.userName}! We're thrilled you love the ${review.productDetails.productName}!`
    );
  }
}
```

***

### editReviewResponse()

```ts
editReviewResponse(reviewId: string, newResponseText: string): Promise<void>;
```

Defined in: [modules/communications/index.ts:1070](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1070)

Edit existing response to review

Edits a previously submitted response to a customer review.

**Edit Limitations**:
- Can only edit once within 60 days of original response
- Check `review.answer.editable` field before attempting
- Same validation as respondToReview (2-5000 characters)

**Note**: Review ID is not validated by API - invalid IDs won't throw errors

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reviewId` | `string` | Review ID from getReviews() |
| `newResponseText` | `string` | New response text (min 2, max 5000 characters) |

#### Returns

`Promise`\<`void`\>

Promise resolving to void (204 No Content)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded

#### Throws

When reviewId empty or newResponseText length invalid

#### Throws

When network request fails

#### Example

```typescript
// Check if response is editable before editing
const reviews = await sdk.communications.getReviews({
  isAnswered: true,
  take: 10,
  skip: 0
});

for (const review of reviews.data.feedbacks) {
  if (review.answer && review.answer.editable) {
    await sdk.communications.editReviewResponse(
      review.id,
      'Updated response with additional information and improved tone.'
    );
    console.log(`Edited response for review ${review.id}`);
  }
}

// Edit specific review response
await sdk.communications.editReviewResponse(
  'rev789',
  'Thank you for your feedback! We have updated our product based on your suggestions.'
);
```

***

### getTemplates()

```ts
getTemplates(filters?: TemplateFilters): Promise<TemplatesResponse>;
```

Defined in: [modules/communications/index.ts:1196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1196)

Get response templates with filtering and pagination

Retrieves response templates for customer service efficiency. Templates support
dynamic variable insertion, performance tracking, and categorization for organized
customer communication workflows.

**Template Features:**
- Dynamic content with variable placeholders ({{variable_name}})
- Performance tracking (usage, satisfaction, effectiveness scores)
- Categorization and tagging for organization
- Multi-language support
- Usage guidelines and examples
- A/B testing capabilities

**Template Categories:**
- `general` - General responses for common questions
- `product_info` - Product-specific information responses
- `shipping` - Shipping and delivery related responses
- `returns` - Returns and refund related responses
- `technical` - Technical support responses
- `billing` - Payment and billing related responses
- `complaints` - Customer complaint handling responses
- `feedback` - Feedback and review responses
- `promotions` - Promotional and sales responses
- `custom` - Custom user-defined categories

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`TemplateFilters`](../interfaces/TemplateFilters.md) | Filter criteria for template retrieval (optional) |

#### Returns

`Promise`\<[`TemplatesResponse`](../interfaces/TemplatesResponse.md)\>

Promise resolving to templates with pagination and metadata

#### Throws

When filter parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// Get all active templates
const allTemplates = await sdk.communications.getTemplates({
  isActive: true,
  sortBy: 'name',
  sortOrder: 'asc'
});
console.log(`Found ${allTemplates.total} templates`);

// Search templates by keyword
const searchResults = await sdk.communications.getTemplates({
  search: 'shipping delay',
  limit: 10
});

// Filter by category
const shippingTemplates = await sdk.communications.getTemplates({
  category: 'shipping',
  language: 'ru'
});

// Get high-priority templates
const priorityTemplates = await sdk.communications.getTemplates({
  minPriority: 8,
  sortBy: 'effectiveness',
  sortOrder: 'desc'
});
```

```typescript
// Paginated template retrieval
let offset = 0;
const pageSize = 50;
const allTemplates = [];

do {
  const response = await sdk.communications.getTemplates({
    limit: pageSize,
    offset: offset,
    isActive: true
  });

  allTemplates.push(...response.templates);
  offset = response.nextOffset || 0;

} while (response.hasMore);

console.log(`Retrieved ${allTemplates.length} active templates`);
```

***

### createTemplate()

```ts
createTemplate(templateData: TemplateData): Promise<TemplateOperationResponse>;
```

Defined in: [modules/communications/index.ts:1385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1385)

Create a new response template

Creates a new response template with dynamic variables, categorization,
and performance tracking capabilities. Templates are essential for efficient
and consistent customer communication.

**Template Variables:**
- Use `{{variable_name}}` syntax in template content
- Define variables with validation rules and types
- Support for text, number, date, boolean, select, and multiline types
- Required/optional fields with default values

**Template Content Guidelines:**
- Keep templates concise and professional
- Use clear, customer-friendly language
- Include placeholders for personalization
- Follow brand voice and tone guidelines

**Rate Limit**: 1 request per second (burst: 3)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `templateData` | [`TemplateData`](../interfaces/TemplateData.md) | Template data including name, content, category, and variables |

#### Returns

`Promise`\<[`TemplateOperationResponse`](../interfaces/TemplateOperationResponse.md)\>

Promise resolving to created template with metadata

#### Throws

When template data is invalid or missing required fields

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// Create a simple template
const simpleTemplate = await sdk.communications.createTemplate({
  name: 'Shipping Delay Response',
  content: 'Уважаемый клиент, ваш заказ {{order_number}} задерживается. Ожидаемая доставка: {{delivery_date}}. Приносим извинения за неудобства.',
  category: 'shipping',
  description: 'Response for shipping delays',
  keywords: ['shipping', 'delay', 'delivery'],
  language: 'ru',
  variables: [
    {
      name: 'order_number',
      displayName: 'Order Number',
      type: 'text',
      required: true,
      description: 'Customer order number'
    },
    {
      name: 'delivery_date',
      displayName: 'Delivery Date',
      type: 'date',
      required: true,
      description: 'Expected delivery date'
    }
  ]
});

console.log(`Created template: ${simpleTemplate.template?.id}`);
```

```typescript
// Create an advanced template with select options
const advancedTemplate = await sdk.communications.createTemplate({
  name: 'Product Information Request',
  content: 'Спасибо за интерес к нашему продукту {{product_name}}! {{greeting}}\n\nИнформация:\n{{product_info}}\n\n{{additional_info}}',
  category: 'product_info',
  description: 'Comprehensive product information response',
  keywords: ['product', 'information', 'details'],
  language: 'ru',
  priority: 8,
  tags: ['popular', 'product'],
  usageGuidelines: 'Use this template for general product inquiries. Personalize with customer name when possible.',
  examples: [
    'Спасибо за интерес к нашему продукту "Кружка керамическая"! Уважаемый клиент...',
    'Спасибо за интерес к нашему продукту "Футболка хлопковая"! Добрый день...'
  ],
  variables: [
    {
      name: 'product_name',
      displayName: 'Product Name',
      type: 'text',
      required: true,
      maxLength: 100,
      description: 'Name of the product the customer is asking about'
    },
    {
      name: 'greeting',
      displayName: 'Greeting',
      type: 'select',
      required: false,
      defaultValue: 'Уважаемый клиент',
      options: ['Уважаемый клиент', 'Добрый день', 'Здравствуйте'],
      description: 'Choose appropriate greeting based on time of day'
    },
    {
      name: 'product_info',
      displayName: 'Product Information',
      type: 'multiline',
      required: true,
      maxLength: 500,
      description: 'Detailed information about the product'
  *   },
    {
      name: 'additional_info',
      displayName: 'Additional Information',
      type: 'text',
      required: false,
      maxLength: 200,
      description: 'Any additional helpful information'
    }
  ]
});
```

***

### updateTemplate()

```ts
updateTemplate(templateId: string, templateData: TemplateData): Promise<TemplateOperationResponse>;
```

Defined in: [modules/communications/index.ts:1508](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1508)

Update an existing response template

Updates an existing template with new content, variables, or metadata.
Performance metrics and usage history are preserved.

**Update Considerations:**
- Content changes affect future template usage
- Variable changes require updating template content
- Category changes affect template organization
- Priority changes affect suggestion algorithms

**Rate Limit**: 1 request per second (burst: 3)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `templateId` | `string` | ID of template to update |
| `templateData` | [`TemplateData`](../interfaces/TemplateData.md) | Updated template data (only fields to update) |

#### Returns

`Promise`\<[`TemplateOperationResponse`](../interfaces/TemplateOperationResponse.md)\>

Promise resolving to updated template with metadata

#### Throws

When templateId is empty or template data is invalid

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
// Update template content
const updated = await sdk.communications.updateTemplate('tpl_123', {
  content: 'Updated template content with {{new_variable}} placeholder',
  variables: [
    {
      name: 'new_variable',
      displayName: 'New Variable',
      type: 'text',
      required: true,
      description: 'Description of the new variable'
    }
  ]
});

// Update template metadata only
const metadataUpdate = await sdk.communications.updateTemplate('tpl_123', {
  name: 'Updated Template Name',
  priority: 9,
  tags: ['updated', 'priority'],
  isActive: true
});

// Change template category
const categoryChange = await sdk.communications.updateTemplate('tpl_123', {
  category: 'product_info',
  keywords: ['product', 'information', 'updated']
});
```

***

### deleteTemplate()

```ts
deleteTemplate(templateId: string): Promise<TemplateOperationResponse>;
```

Defined in: [modules/communications/index.ts:1649](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1649)

Delete a response template

Permanently deletes a template and its usage history. This action cannot be undone.
Consider deactivating templates instead of deleting if you might need them later.

**Deletion Considerations:**
- Template cannot be recovered after deletion
- Usage history and metrics are lost
- Any references to this template will become invalid
- Consider archiving/deactivating instead of deleting

**Rate Limit**: 1 request per second (burst: 3)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `templateId` | `string` | ID of template to delete |

#### Returns

`Promise`\<[`TemplateOperationResponse`](../interfaces/TemplateOperationResponse.md)\>

Promise resolving to deletion confirmation

#### Throws

When templateId is empty

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// Delete a template
const deletion = await sdk.communications.deleteTemplate('tpl_123');

if (deletion.success) {
  console.log('Template deleted successfully');
  console.log(`Template ID: ${deletion.template?.id}`);
}

// Handle deletion errors
if (deletion.error) {
  console.error('Deletion failed:', deletion.errorText);
  if (deletion.validationErrors) {
    deletion.validationErrors.forEach(err => {
      console.error(`${err.field}: ${err.message}`);
    });
  }
}
```

```typescript
// Safe deletion with confirmation
async function safeDeleteTemplate(templateId: string) {
  try {
    // First get template details for confirmation
    const templates = await sdk.communications.getTemplates();
    const template = templates.templates.find(t => t.id === templateId);

    if (!template) {
      throw new Error('Template not found');
    }

    // Check if it's a system template (shouldn't be deleted)
    if (template.isSystemTemplate) {
      throw new Error('Cannot delete system templates');
    }

    // Check usage statistics before deletion
    if (template.metrics.usage.totalUses > 100) {
      console.warn('Template has been used frequently. Consider deactivating instead.');
    }

    // Proceed with deletion
    const deletion = await sdk.communications.deleteTemplate(templateId);
    console.log(`Template "${template.name}" deleted successfully`);

    return deletion;
  } catch (error) {
    console.error('Safe deletion failed:', error.message);
    throw error;
  }
}
```

***

### getTemplateStats()

```ts
getTemplateStats(): Promise<TemplateStatsResponse>;
```

Defined in: [modules/communications/index.ts:1743](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1743)

Get template statistics and performance metrics

Returns comprehensive statistics about template usage, performance,
and effectiveness metrics. Essential for template optimization and
customer service quality monitoring.

**Statistics Include:**
- Total and active template counts
- Usage statistics by category
- Most effective and most used templates
- Templates requiring improvement
- Usage trends over time
- Performance benchmarks

**Rate Limit**: 3 requests per second (burst: 6)

#### Returns

`Promise`\<[`TemplateStatsResponse`](../interfaces/TemplateStatsResponse.md)\>

Promise resolving to comprehensive template statistics

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Examples

```typescript
// Get template statistics
const stats = await sdk.communications.getTemplateStats();
const data = stats.data;

console.log(`Total templates: ${data.totalTemplates}`);
console.log(`Active templates: ${data.activeTemplates}`);

// Analyze category performance
data.byCategory.forEach(category => {
  console.log(`${category.category}: ${category.count} templates, ${category.usage} uses`);
});

// Show top performing templates
data.bestPerforming.forEach(template => {
  console.log(`${template.name}: ${template.satisfaction}/5 satisfaction, ${template.usage} uses`);
});

// Identify templates needing improvement
data.needsImprovement.forEach(template => {
  console.log(`${template.name}: Effectiveness ${template.effectiveness}/100`);
  console.log(`Issues: ${template.issues.join(', ')}`);
});
```

```typescript
// Generate template performance report
function generateTemplateReport() {
  return sdk.communications.getTemplateStats().then(stats => {
    const data = stats.data;

    const report = {
      summary: {
        totalTemplates: data.totalTemplates,
        activeTemplates: data.activeTemplates,
        activationRate: (data.activeTemplates / data.totalTemplates * 100).toFixed(1) + '%'
      },
      topCategories: data.byCategory
        .sort((a, b) => b.usage - a.usage)
        .slice(0, 5),
      mostUsed: data.mostUsed.slice(0, 10),
      improvementNeeded: data.needsImprovement,
      trends: data.usageTrends
    };

    return report;
  });
}

generateTemplateReport().then(report => {
  console.log('Template Performance Report:');
  console.log(JSON.stringify(report, null, 2));
});
```

***

### getReplySignFromChat()

```ts
getReplySignFromChat(chat: Chat): string;
```

Defined in: [modules/communications/index.ts:1861](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1861)

Extract replySign from Chat object

Helper method to get the replySign needed for sending messages.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `chat` | [`Chat`](../interfaces/Chat.md) | Chat object from getChats() |

#### Returns

`string`

Reply signature string

#### Example

```typescript
const chats = (await sdk.communications.getChats()).result;
const replySign = sdk.communications.getReplySignFromChat(chats[0]);
await sdk.communications.sendMessage(replySign, 'Hello!');
```

***

### getReplySignFromEvent()

```ts
getReplySignFromEvent(event: ChatEvent): string | null;
```

Defined in: [modules/communications/index.ts:1885](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1885)

Extract replySign from ChatEvent (only for new chats)

Helper method to get the replySign from an event when it's a new chat.
Returns null if the event is not a new chat.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | [`ChatEvent`](../interfaces/ChatEvent.md) | ChatEvent from getChatEvents() |

#### Returns

`string` \| `null`

Reply signature string or null if not a new chat

#### Example

```typescript
const events = (await sdk.communications.getChatEvents()).result.events;
for (const event of events) {
  const replySign = sdk.communications.getReplySignFromEvent(event);
  if (replySign) {
    console.log('New chat detected, replySign:', replySign);
  }
}
```

***

### filterEventsByChatID()

```ts
filterEventsByChatID(events: ChatEvent[], chatID: string): ChatEvent[];
```

Defined in: [modules/communications/index.ts:1908](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1908)

Filter events by specific chat ID

Helper method to filter events for a specific chat conversation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `events` | [`ChatEvent`](../interfaces/ChatEvent.md)[] | Array of chat events |
| `chatID` | `string` | Chat ID to filter by |

#### Returns

[`ChatEvent`](../interfaces/ChatEvent.md)[]

Filtered array of events for the specified chat

#### Example

```typescript
const allEvents = (await sdk.communications.getChatEvents()).result.events;
const chatEvents = sdk.communications.filterEventsByChatID(
  allEvents,
  '1:4019cd7d-cca8-4e90-8b11-f78afbea42e3'
);
console.log(`Chat has ${chatEvents.length} events`);
```

***

### getClientMessages()

```ts
getClientMessages(events: ChatEvent[]): ChatEvent[];
```

Defined in: [modules/communications/index.ts:1931](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1931)

Filter events to get only client messages

Helper method to filter events to show only messages from customers.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `events` | [`ChatEvent`](../interfaces/ChatEvent.md)[] | Array of chat events |

#### Returns

[`ChatEvent`](../interfaces/ChatEvent.md)[]

Filtered array containing only client messages

#### Example

```typescript
const allEvents = (await sdk.communications.getChatEvents()).result.events;
const customerMessages = sdk.communications.getClientMessages(allEvents);

// Process only customer messages
for (const message of customerMessages) {
  console.log(`Customer ${message.clientName}: ${message.message?.text}`);
}
```

***

### getReturnRequests()

```ts
getReturnRequests(filters?: ReturnRequestFilters): Promise<ReturnRequestsResponse>;
```

Defined in: [modules/communications/index.ts:1969](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L1969)

Get return requests with filtering and pagination

Retrieves return requests for the seller's orders with comprehensive filtering
capabilities including status, date ranges, and order information.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`ReturnRequestFilters`](../interfaces/ReturnRequestFilters.md) | Optional filters for return requests |

#### Returns

`Promise`\<[`ReturnRequestsResponse`](../interfaces/ReturnRequestsResponse.md)\>

Promise resolving to paginated return requests with metadata

#### Throws

When filter parameters are invalid

#### Throws

When API rate limit is exceeded

#### Throws

When API key is invalid or expired

#### See

[https://dev.wildberries.ru/openapi/returns#tag/Vozvratyi-tovarov](https://dev.wildberries.ru/openapi/returns#tag/Vozvratyi-tovarov)

#### Example

```typescript
// Get all active returns
const activeReturns = await sdk.communications.getReturnRequests({
  status: ['processing', 'pending'],
  limit: 50
});
console.log(`Found ${activeReturns.total} active returns`);

// Get returns for specific date range
const recentReturns = await sdk.communications.getReturnRequests({
  dateFrom: '2024-12-01',
  dateTo: '2024-12-31',
  sortBy: 'createdAt',
  sortOrder: 'desc'
});
```

***

### processReturnRequest()

```ts
processReturnRequest(
   returnId: string, 
   action: "approve" | "reject", 
options?: ReturnProcessOptions): Promise<ReturnProcessResponse>;
```

Defined in: [modules/communications/index.ts:2062](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L2062)

Process return request with approval or rejection

Processes a return request by approving or rejecting it. When approving, you can
specify refund amount and processing notes. When rejecting, you must provide a reason.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `returnId` | `string` | Unique identifier of the return request |
| `action` | `"approve"` \| `"reject"` | Action to take (approve or reject) |
| `options?` | [`ReturnProcessOptions`](../interfaces/ReturnProcessOptions.md) | Additional processing options |

#### Returns

`Promise`\<[`ReturnProcessResponse`](../interfaces/ReturnProcessResponse.md)\>

Promise resolving to processing result with updated return status

#### Throws

When returnId is missing or invalid, or when required options are missing

#### Throws

When API rate limit is exceeded

#### Throws

When API key is invalid or expired

#### Throws

When return request is not found

#### See

[https://dev.wildberries.ru/openapi/returns#tag/Obrabotka-vozvratov](https://dev.wildberries.ru/openapi/returns#tag/Obrabotka-vozvratov)

#### Example

```typescript
// Approve return with full refund
const approveResult = await sdk.communications.processReturnRequest(
  'return-123456',
  'approve',
  {
    refundAmount: 2990.00,
    notes: 'Customer requested return due to size mismatch'
  }
);
console.log(`Return approved with status: ${approveResult.return.status}`);

// Reject return with reason
const rejectResult = await sdk.communications.processReturnRequest(
  'return-789012',
  'reject',
  {
    reason: 'Product does not match return policy requirements',
    notes: 'Item returned after 30-day policy period'
  }
);
console.log(`Return rejected: ${rejectResult.return.rejectionReason}`);
```

***

### updateReturnStatus()

```ts
updateReturnStatus(
   returnId: string, 
   status: ReturnStatus, 
notes?: string): Promise<ReturnProcessResponse>;
```

Defined in: [modules/communications/index.ts:2237](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L2237)

Update return request status

Updates the status of a specific return request with optional notes and tracking information.
This method allows manual status updates for returns that require special handling or
status corrections due to system updates.

Rate limit: 60 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `returnId` | `string` | Unique identifier of the return request |
| `status` | [`ReturnStatus`](../type-aliases/ReturnStatus.md) | New status for the return request |
| `notes?` | `string` | Optional notes explaining the status change |

#### Returns

`Promise`\<[`ReturnProcessResponse`](../interfaces/ReturnProcessResponse.md)\>

Promise resolving to status update confirmation

#### Throws

When parameters are invalid

#### Throws

When API rate limit is exceeded

#### Throws

When API key is invalid or expired

#### Throws

When return request is not found

#### See

[https://dev.wildberries.ru/openapi/returns#tag/Return-Status-Management](https://dev.wildberries.ru/openapi/returns#tag/Return-Status-Management)

#### Example

```typescript
// Update return status to approved with notes
await sdk.communications.updateReturnStatus(
  'return-12345',
  'approved',
  'Customer provided additional documentation, return approved'
);

// Mark return as completed after receiving item
await sdk.communications.updateReturnStatus(
  'return-12345',
  'completed',
  'Item received in good condition, refund processed'
);

// Update to canceled with reason
await sdk.communications.updateReturnStatus(
  'return-12345',
  'canceled',
  'Customer withdrew return request - issue resolved directly'
);
```

***

### getReturnAnalytics()

```ts
getReturnAnalytics(filters?: ReturnAnalyticsFilters): Promise<ReturnAnalyticsResponse>;
```

Defined in: [modules/communications/index.ts:2341](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L2341)

Get return analytics and insights

Retrieves comprehensive analytics for return requests including performance metrics,
trend analysis, quality assessments, and operational insights. This method provides
valuable business intelligence for return process optimization and quality improvement.

Rate limit: 10 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`ReturnAnalyticsFilters`](../interfaces/ReturnAnalyticsFilters.md) | Optional filters for analytics data |

#### Returns

`Promise`\<[`ReturnAnalyticsResponse`](../interfaces/ReturnAnalyticsResponse.md)\>

Promise resolving to comprehensive return analytics

#### Throws

When filter parameters are invalid

#### Throws

When API rate limit is exceeded

#### Throws

When API key is invalid or expired

#### See

[https://dev.wildberries.ru/openapi/returns#tag/Return-Analytics](https://dev.wildberries.ru/openapi/returns#tag/Return-Analytics)

#### Example

```typescript
// Get overall return analytics
const analytics = await sdk.communications.getReturnAnalytics();

console.log(`Total returns: ${analytics.totalReturns}`);
console.log(`Average processing time: ${analytics.performanceMetrics.averageProcessingTime}h`);
console.log(`Customer satisfaction rate: ${analytics.performanceMetrics.customerSatisfactionRate}%`);

// Analyze returns by status
analytics.byStatus.forEach(statusData => {
  console.log(`${statusData.status}: ${statusData.count} (${statusData.percentage}%)`);
});

// Check quality scores by category
analytics.byCategory.forEach(categoryData => {
  console.log(`${categoryData.category}: Quality score ${categoryData.qualityScore}/100`);
  console.log(`  Average processing time: ${categoryData.averageProcessingTime}h`);
});

// Get analytics for specific date range
const recentAnalytics = await sdk.communications.getReturnAnalytics({
  dateFrom: '2024-12-01',
  dateTo: '2024-12-31',
  includeTrends: true,
  includeQualityMetrics: true
});

// Analyze return trends
if (recentAnalytics.trends) {
  console.log('Return Trends:');
  recentAnalytics.trends.daily.forEach(dayData => {
    console.log(`${dayData.date}: ${dayData.count} returns (${dayData.changePercentage > 0 ? '+' : ''}${dayData.changePercentage}%)`);
  });
}

// Check cost analysis
if (recentAnalytics.costAnalysis) {
  console.log(`Total return costs: $${recentAnalytics.costAnalysis.totalCost}`);
  console.log(`Average cost per return: $${recentAnalytics.costAnalysis.averageCostPerReturn}`);
  console.log(`Prevention savings: $${recentAnalytics.costAnalysis.preventionSavings}`);
}
```

***

### getChatHistory()

```ts
getChatHistory(chatId: string, filters?: ChatHistoryFilters): Promise<ChatHistory>;
```

Defined in: [modules/communications/index.ts:2496](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L2496)

Get chat history with comprehensive filtering and pagination

Retrieves the complete message history for a specific chat with advanced
filtering capabilities including message type, sender, date ranges, and content search.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `chatId` | `string` | Unique identifier of the chat |
| `filters?` | [`ChatHistoryFilters`](../interfaces/ChatHistoryFilters.md) | Optional filters for chat messages |

#### Returns

`Promise`\<[`ChatHistory`](../interfaces/ChatHistory.md)\>

Promise resolving to paginated chat history with messages and metadata

#### Throws

When chat ID is invalid or filter parameters are invalid

#### Throws

When API rate limit is exceeded

#### Throws

When API key is invalid or expired

#### Throws

When chat is not found

#### See

[https://dev.wildberries.ru/openapi/chat#tag/Chat-History](https://dev.wildberries.ru/openapi/chat#tag/Chat-History)

#### Example

```typescript
// Get recent messages from chat
const history = await sdk.communications.getChatHistory('chat-12345', {
  limit: 50,
  sortOrder: 'desc'
});
console.log(`Found ${history.messages.length} recent messages`);

// Search for messages containing specific text
const searchResults = await sdk.communications.getChatHistory('chat-12345', {
  searchText: 'shipping',
  messageType: 'text',
  dateFrom: '2024-12-01'
});
console.log(`Found ${searchResults.messages.length} messages about shipping`);

// Get only messages with attachments
const attachments = await sdk.communications.getChatHistory('chat-12345', {
  hasAttachments: true,
  messageType: 'file'
});
```

***

### getChatById()

```ts
getChatById(chatId: string): Promise<ChatDetails>;
```

Defined in: [modules/communications/index.ts:2589](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L2589)

Get comprehensive chat details by ID

Retrieves detailed information about a specific chat including customer details,
message statistics, assignee information, priority, and metadata. This provides
complete context for customer service interactions.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `chatId` | `string` | Unique identifier of the chat |

#### Returns

`Promise`\<[`ChatDetails`](../interfaces/ChatDetails.md)\>

Promise resolving to comprehensive chat details

#### Throws

When chat ID is invalid

#### Throws

When API rate limit is exceeded

#### Throws

When API key is invalid or expired

#### Throws

When chat is not found

#### See

[https://dev.wildberries.ru/openapi/chat#tag/Chat-Details](https://dev.wildberries.ru/openapi/chat#tag/Chat-Details)

#### Example

```typescript
// Get detailed chat information
const chatDetails = await sdk.communications.getChatById('chat-12345');

console.log(`Customer: ${chatDetails.customerName}`);
console.log(`Status: ${chatDetails.status}`);
console.log(`Priority: ${chatDetails.priority}`);
console.log(`Unread messages: ${chatDetails.unreadCount}`);
console.log(`Total messages: ${chatDetails.messageCount}`);

if (chatDetails.metadata?.isVip) {
  console.log('VIP customer - prioritize response');
}

if (chatDetails.metadata?.previousInteractions) {
  console.log(`Previous interactions: ${chatDetails.metadata.previousInteractions}`);
}
```

***

### getFeedbacks()

```ts
getFeedbacks(filters?: EnhancedFeedbackFilters): Promise<EnhancedFeedbacksResponse>;
```

Defined in: [modules/communications/index.ts:2744](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L2744)

Get enhanced feedbacks with comprehensive analysis and filtering

Retrieves customer feedbacks with advanced analytics including sentiment analysis,
customer intelligence, quality assessment, and impact analysis.

Rate limit: 10 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`EnhancedFeedbackFilters`](../interfaces/EnhancedFeedbackFilters.md) | Optional enhanced filters for feedback retrieval |

#### Returns

`Promise`\<[`EnhancedFeedbacksResponse`](../interfaces/EnhancedFeedbacksResponse.md)\>

Promise resolving to enhanced feedbacks with comprehensive analytics

#### Throws

When filter parameters are invalid

#### Throws

When API rate limit is exceeded

#### Throws

When API key is invalid or expired

#### See

[https://dev.wildberries.ru/openapi/feedbacks#tag/Enhanced-Feedback-Analysis](https://dev.wildberries.ru/openapi/feedbacks#tag/Enhanced-Feedback-Analysis)

#### Examples

```typescript
// Get critical feedbacks requiring immediate attention
const criticalFeedbacks = await sdk.communications.getFeedbacks({
  urgencyLevels: ['high', 'critical'],
  sentiments: ['negative'],
  hasResponse: false,
  sortBy: 'urgency',
  sortOrder: 'desc',
  limit: 20
});

console.log(`Found ${criticalFeedbacks.total} critical feedbacks`);
for (const feedback of criticalFeedbacks.data) {
  console.log(`Customer: ${feedback.customer.name} (VIP: ${feedback.customer.isVip})`);
  console.log(`Product: ${feedback.productDetails.productName}`);
  console.log(`Sentiment: ${feedback.analysis.sentiment} (${feedback.analysis.sentimentScore})`);
  console.log(`Urgency: ${feedback.analysis.urgency}`);
  console.log(`Topics: ${feedback.analysis.topics.join(', ')}`);

  if (feedback.response.hasResponse) {
    console.log(`Already responded: ${feedback.response.responseText}`);
  } else {
    console.log('Needs response - suggested actions:');
    feedback.response.suggestedResponses?.forEach((suggestion, index) => {
      console.log(`  ${index + 1}. ${suggestion}`);
    });
  }
}
```

```typescript
// Get VIP customer feedbacks with full analysis
const vipFeedbacks = await sdk.communications.getFeedbacks({
  isVip: true,
  includeAnalysis: true,
  includeCustomer: true,
  includeMetrics: true,
  includeImpact: true,
  dateFrom: '2024-12-01',
  dateTo: '2024-12-31'
});

console.log('VIP Customer Feedback Analytics:');
console.log(`Average Rating: ${vipFeedbacks.analytics.averageRating}/5`);
console.log(`Response Rate: ${vipFeedbacks.analytics.responseRate}%`);
console.log(`Sentiment Distribution:`, vipFeedbacks.analytics.sentimentDistribution);
console.log(`Top Topics:`, vipFeedbacks.analytics.topTopics);

// Analyze VIP feedback trends
for (const feedback of vipFeedbacks.data) {
  if (feedback.analysis.urgency === 'critical') {
    console.log(`CRITICAL: ${feedback.productDetails.productName} - ${feedback.content.text.substring(0, 100)}...`);
    console.log(`Customer LTV: $${feedback.customerJourney.customerLifetimeValue}`);
    console.log(`Impact Score: ${feedback.impact.impactScore}/100`);
  }
}
```

***

### getFeedbackById()

```ts
getFeedbackById(feedbackId: string): Promise<FeedbackDetailsResponse>;
```

Defined in: [modules/communications/index.ts:3027](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3027)

Get detailed feedback analysis by ID

Retrieves comprehensive feedback details including customer journey, product context,
recommended actions, insights, quality analysis, and response optimization suggestions.

Rate limit: 60 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `feedbackId` | `string` | Unique feedback identifier |

#### Returns

`Promise`\<[`FeedbackDetailsResponse`](../interfaces/FeedbackDetailsResponse.md)\>

Promise resolving to detailed feedback analysis with recommendations

#### Throws

When feedbackId is empty or invalid

#### Throws

When API rate limit is exceeded

#### Throws

When API key is invalid or expired

#### Throws

When feedback is not found

#### See

[https://dev.wildberries.ru/openapi/feedbacks#tag/Feedback-Details](https://dev.wildberries.ru/openapi/feedbacks#tag/Feedback-Details)

#### Examples

```typescript
// Get comprehensive analysis for a specific feedback
const feedbackDetails = await sdk.communications.getFeedbackById('feedback-12345');

console.log('Feedback Analysis:');
console.log(`Customer: ${feedbackDetails.feedback.customer.name} (${feedbackDetails.feedback.customer.isVip ? 'VIP' : 'Regular'})`);
console.log(`Product: ${feedbackDetails.feedback.productDetails.productName}`);
console.log(`Rating: ${feedbackDetails.feedback.content.rating}/5 stars`);
console.log(`Sentiment: ${feedbackDetails.feedback.analysis.sentiment}`);
console.log(`Urgency: ${feedbackDetails.feedback.analysis.urgency}`);

// Check recommended actions
console.log(`\nPriority: ${feedbackDetails.recommendations.priority}`);
console.log('Recommended Actions:');
feedbackDetails.recommendations.actions.forEach((action, index) => {
  console.log(`  ${index + 1}. ${action.description} (${action.urgency} urgency)`);
});

// Review customer journey
console.log(`\nCustomer Journey:`);
console.log(`Lifetime Value: $${feedbackDetails.customerJourney.customerLifetimeValue}`);
console.log(`Loyalty Status: ${feedbackDetails.customerJourney.loyaltyStatus}`);
console.log(`Risk Level: ${feedbackDetails.customerJourney.riskLevel}`);
console.log(`Previous Orders: ${feedbackDetails.customerJourney.orderHistory.length}`);

// Check response optimization
console.log(`\nResponse Optimization:`);
console.log(`Best Response Time: ${feedbackDetails.responseOptimization.bestResponseTime}`);
console.log(`Optimal Tone: ${feedbackDetails.responseOptimization.optimalTone}`);
console.log('Key Points to Address:');
feedbackDetails.responseOptimization.keyPoints.forEach(point => {
  console.log(`  - ${point}`);
});

// Review template suggestions
if (feedbackDetails.responseOptimization.templateSuggestions.length > 0) {
  console.log('\nSuggested Templates:');
  feedbackDetails.responseOptimization.templateSuggestions.forEach(template => {
    console.log(`  ${template.templateName} (Relevance: ${template.relevanceScore}%)`);
  });
}
```

```typescript
// Handle critical feedback with comprehensive analysis
const handleCriticalFeedback = async (feedbackId: string) => {
  try {
    const details = await sdk.communications.getFeedbackById(feedbackId);

    // Assess urgency and impact
    const { feedback, recommendations, customerJourney } = details;

    if (feedback.analysis.urgency === 'critical' ||
        feedback.impact.impactScore > 80 ||
        customerJourney.loyaltyStatus === 'vip') {

      console.log('🚨 CRITICAL FEEDBACK DETECTED - Immediate action required');
      console.log(`Customer: ${feedback.customer.name} (${customerJourney.loyaltyStatus.toUpperCase()})`);
      console.log(`Impact Score: ${feedback.impact.impactScore}/100`);

      // Get high-priority recommendations
      const criticalActions = recommendations.actions
        .filter(action => action.urgency === 'high' || action.urgency === 'critical')
        .sort((a, b) => {
          const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        });

      console.log('\nImmediate Actions Required:');
      criticalActions.forEach((action, index) => {
        console.log(`  ${index + 1}. ${action.description}`);
        console.log(`     Impact: ${action.estimatedImpact} | Timeline: ASAP`);
      });

      // Suggest optimal response
      const bestTemplate = details.responseOptimization.templateSuggestions[0];
      if (bestTemplate) {
        console.log(`\nSuggested Response Template: ${bestTemplate.templateName}`);
        console.log(`Customization needed: ${bestTemplate.customizationNeeded.join(', ')}`);
      }

      return {
        isCritical: true,
        actions: criticalActions,
        customerValue: customerJourney.customerLifetimeValue,
        suggestedTemplate: bestTemplate
      };
    }

    return { isCritical: false, details };

  } catch (error) {
    if (error instanceof NotFoundError) {
      console.log(`Feedback ${feedbackId} not found`);
      return null;
    }
    throw error;
  }
};
```

***

### getFeedbacksCountUnanswered()

```ts
getFeedbacksCountUnanswered(): Promise<FeedbacksCountUnansweredResponse>;
```

Defined in: [modules/communications/index.ts:3241](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3241)

Get count of unanswered feedbacks with average rating

Returns metrics for unanswered feedbacks including total count,
today's count, and average rating of all feedbacks.

**Rate Limit**: 3 requests per second (burst: 6)

#### Returns

`Promise`\<[`FeedbacksCountUnansweredResponse`](../interfaces/FeedbacksCountUnansweredResponse.md)\>

Promise resolving to unanswered feedbacks metrics

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
const metrics = await sdk.communications.getFeedbacksCountUnanswered();
console.log(`Unanswered: ${metrics.data.countUnanswered}`);
console.log(`Today: ${metrics.data.countUnansweredToday}`);
console.log(`Average rating: ${metrics.data.valuation}`);
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1count-unanswered/get](https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1count-unanswered/get)

***

### getFeedbacksCount()

```ts
getFeedbacksCount(params?: FeedbacksCountParams): Promise<FeedbacksCountResponse>;
```

Defined in: [modules/communications/index.ts:3281](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3281)

Get count of feedbacks for a given period

Returns count of answered or unanswered feedbacks within specified date range.

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`FeedbacksCountParams`](../interfaces/FeedbacksCountParams.md) | Optional filter parameters (dateFrom, dateTo, isAnswered) |

#### Returns

`Promise`\<[`FeedbacksCountResponse`](../interfaces/FeedbacksCountResponse.md)\>

Promise resolving to feedbacks count

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When parameters are invalid

#### Throws

When network request fails

#### Example

```typescript
// Get count of unanswered feedbacks
const count = await sdk.communications.getFeedbacksCount({
  isAnswered: false
});
console.log(`Unanswered feedbacks: ${count.data}`);

// Get count for specific period
const periodCount = await sdk.communications.getFeedbacksCount({
  dateFrom: 1688465092,
  dateTo: 1699999999,
  isAnswered: true
});
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1count/get](https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1count/get)

***

### getSupplierValuations()

```ts
getSupplierValuations(locale?: "ru" | "en" | "zh"): Promise<SupplierValuationsResponse>;
```

Defined in: [modules/communications/index.ts:3336](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3336)

Get complaint reasons and product issue types

Returns lists of complaint reasons for feedbacks and product issue types.
Use these values when submitting feedback complaints via reportFeedbackAction().

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locale?` | `"ru"` \| `"en"` \| `"zh"` | Optional locale for response values ('ru', 'en', 'zh') |

#### Returns

`Promise`\<[`SupplierValuationsResponse`](../interfaces/SupplierValuationsResponse.md)\>

Promise resolving to complaint reasons and product issues

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
// Get complaint reasons in Russian
const valuations = await sdk.communications.getSupplierValuations('ru');

// feedbackValuations contains complaint reasons (1-7 for API, 11-20 for portal)
console.log('Feedback complaints:', valuations.data.feedbackValuations);
// { "1": "Отзыв не относится к товару", "3": "Спам", ... }

// productValuations contains product issue types
console.log('Product issues:', valuations.data.productValuations);
// { "1": "Повредили при доставке", "2": "Товар подменили", ... }
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get](https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get)

***

### reportFeedbackAction()

```ts
reportFeedbackAction(request: FeedbackActionRequest): Promise<void>;
```

Defined in: [modules/communications/index.ts:3386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3386)

Report feedback complaint or product issue

Submit a complaint about a feedback or report a product issue.
Use values from getSupplierValuations() for reason codes.

**Note**: Feedback ID is not validated. Invalid IDs won't return an error.

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`FeedbackActionRequest`](../interfaces/FeedbackActionRequest.md) | Complaint request with feedback ID and reason codes |

#### Returns

`Promise`\<`void`\>

Promise resolving when complaint is submitted (204 No Content)

#### Throws

When feedback ID is missing

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
// Report feedback as not related to product
await sdk.communications.reportFeedbackAction({
  id: 'J2FMRjUj6hwvwCElqssz',
  supplierFeedbackValuation: 1 // "Отзыв не относится к товару"
});

// Report product issue - damaged during delivery
await sdk.communications.reportFeedbackAction({
  id: 'J2FMRjUj6hwvwCElqssz',
  supplierProductValuation: 1 // "Повредили при доставке"
});
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1actions/post](https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1actions/post)

***

### getArchivedFeedbacks()

```ts
getArchivedFeedbacks(filters: ArchivedFeedbacksFilters): Promise<ArchivedFeedbacksResponse>;
```

Defined in: [modules/communications/index.ts:3436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3436)

Get archived feedbacks list

Returns list of archived feedbacks. A feedback becomes archived when:
- Response was sent
- No response within 30 days
- Feedback has no text or photos

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters` | [`ArchivedFeedbacksFilters`](../interfaces/ArchivedFeedbacksFilters.md) | Filter parameters (take and skip are required) |

#### Returns

`Promise`\<[`ArchivedFeedbacksResponse`](../interfaces/ArchivedFeedbacksResponse.md)\>

Promise resolving to archived feedbacks list

#### Throws

When required parameters missing

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
// Get first page of archived feedbacks
const archived = await sdk.communications.getArchivedFeedbacks({
  take: 100,
  skip: 0,
  order: 'dateDesc'
});

for (const feedback of archived.data.feedbacks) {
  console.log(`Rating: ${feedback.productValuation}/5`);
  console.log(`Text: ${feedback.text}`);
  if (feedback.answer) {
    console.log(`Answer: ${feedback.answer.text}`);
  }
}
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1archive/get](https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1archive/get)

***

### downloadChatFile()

```ts
downloadChatFile(fileId: string): Promise<ArrayBuffer>;
```

Defined in: [modules/communications/index.ts:3501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3501)

Download file from chat message

Downloads a file or image from a chat message by its ID.
File ID can be found in the `downloadID` field from getChatEvents().

**Rate Limit**: 10 requests per 10 seconds

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fileId` | `string` | File ID from downloadID field in chat events |

#### Returns

`Promise`\<`ArrayBuffer`\>

Promise resolving to file binary data (PDF, JPEG, PNG)

#### Throws

When file ID is missing

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
// Get file ID from chat events
const events = await sdk.communications.getChatEvents();
const fileEvent = events.result.events.find(e =>
  e.attachments?.files?.length > 0
);

if (fileEvent && fileEvent.attachments?.files?.[0]) {
  const fileId = fileEvent.attachments.files[0].downloadID;
  const fileData = await sdk.communications.downloadChatFile(fileId);
  // Save or process file data
}
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1download~1%7Bid%7D/get](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1download~1%7Bid%7D/get)

***

### getClaims()

```ts
getClaims(filters?: ClaimsFilters): Promise<ClaimsResponse>;
```

Defined in: [modules/communications/index.ts:3554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3554)

Get customer return claims

Returns customer return claims for the last 14 days.
You can respond to these claims using respondToClaim().

**Rate Limit**: 20 requests per minute (3 second interval)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filters?` | [`ClaimsFilters`](../interfaces/ClaimsFilters.md) | Optional filters for claims list |

#### Returns

`Promise`\<[`ClaimsResponse`](../interfaces/ClaimsResponse.md)\>

Promise resolving to claims list with total count

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When parameters are invalid

#### Throws

When network request fails

#### Example

```typescript
// Get all pending claims
const claims = await sdk.communications.getClaims();
console.log(`Total claims: ${claims.total}`);

for (const claim of claims.claims) {
  console.log(`Claim ${claim.id}:`);
  console.log(`  Product: ${claim.imt_name} (${claim.nm_id})`);
  console.log(`  Status: ${claim.status}`);
  console.log(`  Customer comment: ${claim.user_comment}`);
  console.log(`  Available actions: ${claim.actions.join(', ')}`);
}

// Filter by product
const productClaims = await sdk.communications.getClaims({
  nm_id: 196320101,
  limit: 10
});
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get](https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get)

***

### respondToClaim()

```ts
respondToClaim(request: RespondToClaimRequest): Promise<void>;
```

Defined in: [modules/communications/index.ts:3635](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3635)

Respond to customer return claim

Send response to a customer return claim. Use actions from
the claim's `actions` array obtained from getClaims().

**Available actions:**
- `approve1`: Approve with defect check
- `approve2`: Approve and return product to seller
- `autorefund1`: Approve without product return
- `reject1`: Reject - defect not found
- `reject2`: Reject - need more photos/videos
- `reject3`: Reject - go to service center
- `rejectcustom`: Reject with custom comment (requires `comment`)
- `approvecc1`: Approve for in-store pickup return
- `confirmreturngoodcc1`: Confirm pickup receipt

**Rate Limit**: 20 requests per minute (3 second interval)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`RespondToClaimRequest`](../interfaces/RespondToClaimRequest.md) | Response request with claim ID and action |

#### Returns

`Promise`\<`void`\>

Promise resolving when response is sent

#### Throws

When required parameters missing

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
// Approve claim with defect check
await sdk.communications.respondToClaim({
  id: 'fe3e9337-e9f9-423c-8930-946a8ebef80',
  action: 'approve1'
});

// Reject with custom comment
await sdk.communications.respondToClaim({
  id: 'fe3e9337-e9f9-423c-8930-946a8ebef80',
  action: 'rejectcustom',
  comment: 'Фото не соответствует товару в заявке'
});

// Approve without product return
await sdk.communications.respondToClaim({
  id: 'fe3e9337-e9f9-423c-8930-946a8ebef80',
  action: 'autorefund1'
});
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claim/patch](https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claim/patch)

***

### requestReturnByFeedback()

```ts
requestReturnByFeedback(request: ReturnByFeedbackRequest): Promise<ReturnByFeedbackResponse>;
```

Defined in: [modules/communications/index.ts:3709](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/communications/index.ts#L3709)

Request product return by feedback ID

Requests return of a product associated with a feedback review.
Only available for feedbacks where `isAbleReturnProductOrders` is `true`.

**Prerequisites**:
- Feedback must have `isAbleReturnProductOrders: true`
- Use getReviews() to find eligible feedbacks

**Rate Limit**: 3 requests per second (burst: 6)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`ReturnByFeedbackRequest`](../interfaces/ReturnByFeedbackRequest.md) | Request with feedbackId |

#### Returns

`Promise`\<[`ReturnByFeedbackResponse`](../interfaces/ReturnByFeedbackResponse.md)\>

Promise resolving to return request result

#### Throws

When feedbackId is missing or empty

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails

#### Example

```typescript
// First, find eligible feedbacks
const reviews = await sdk.communications.getReviews({
  isAnswered: true,
  take: 100,
  skip: 0
});

// Filter for returnable reviews
const returnable = reviews.data.feedbacks.filter(
  f => f.isAbleReturnProductOrders
);

// Request return for a feedback
if (returnable.length > 0) {
  const result = await sdk.communications.requestReturnByFeedback({
    feedbackId: returnable[0].id
  });

  if (!result.error) {
    console.log('Return requested successfully');
  } else {
    console.error('Failed:', result.errorText);
  }
}
```

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1order~1return/post](https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1order~1return/post)
