[Wildberries API TypeScript SDK](../modules.md) / CommunicationsModule

# Class: CommunicationsModule

Defined in: [modules/communications/index.ts:77](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L77)

CommunicationsModule class

Provides methods for interacting with the Wildberries Chat with Customers API.

## Constructors

### Constructor

```ts
new CommunicationsModule(client: BaseClient): CommunicationsModule;
```

Defined in: [modules/communications/index.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L83)

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

Defined in: [modules/communications/index.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L118)

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

Defined in: [modules/communications/index.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L182)

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

Defined in: [modules/communications/index.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L263)

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

Defined in: [modules/communications/index.ts:378](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L378)

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
| `stop()` | () => `void` | [modules/communications/index.ts:381](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L381) |

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

Defined in: [modules/communications/index.ts:469](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L469)

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

Defined in: [modules/communications/index.ts:536](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L536)

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

Defined in: [modules/communications/index.ts:594](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L594)

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

### getReviews()

```ts
getReviews(filters: ReviewFilters): Promise<ReviewsResponse>;
```

Defined in: [modules/communications/index.ts:680](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L680)

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

Defined in: [modules/communications/index.ts:749](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L749)

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

Defined in: [modules/communications/index.ts:828](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L828)

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

### getReplySignFromChat()

```ts
getReplySignFromChat(chat: Chat): string;
```

Defined in: [modules/communications/index.ts:880](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L880)

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

Defined in: [modules/communications/index.ts:904](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L904)

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

Defined in: [modules/communications/index.ts:927](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L927)

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

Defined in: [modules/communications/index.ts:950](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/modules/communications/index.ts#L950)

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
