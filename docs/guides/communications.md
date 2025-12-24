# Communications Guide

**Complete guide to customer engagement features: chat, Q&A, and reviews management**

---

## Overview

The Communications module provides comprehensive tools for engaging with customers through:

- **Customer Chat**: Real-time messaging with buyers, file attachments, and chat previews with last messages
- **Product Q&A**: Answer customer questions about products before purchase
- **Reviews & Ratings**: Manage customer feedback, respond to reviews, and improve product ratings

**Module**: `sdk.communications`
**API Documentation**: [Wildberries Communications API](https://dev.wildberries.ru/openapi/user-communication)

---

## Table of Contents

- [Customer Chat Management](#customer-chat-management)
- [Product Q&A System](#product-qa-system)
- [Reviews & Ratings](#reviews--ratings)
- [Best Practices](#best-practices)
- [Rate Limits](#rate-limits)
- [Error Handling](#error-handling)
- [Complete Examples](#complete-examples)

---

## Customer Chat Management

### Getting Chat List

Retrieve all active customer conversations with chat previews:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get all chats
const chats = await sdk.communications.getSellerChats();

// Display chat list with last messages (NEW in v2.3.2)
chats.result?.forEach(chat => {
  console.log(`Chat ID: ${chat.chatID}`);
  console.log(`Customer: ${chat.clientName} (ID: ${chat.clientID})`);

  // Show last message preview
  if (chat.lastMessage) {
    const date = new Date(chat.lastMessage.addTimestamp!);
    console.log(`Last Message: "${chat.lastMessage.text}"`);
    console.log(`Sent: ${date.toLocaleString('ru-RU')}`);
  }

  // Product information (if related to specific product)
  if (chat.goodCard) {
    console.log(`Product: ${chat.goodCard.goodsName} (SKU: ${chat.goodCard.nmID})`);
  }

  console.log('---');
});
```

**Response Interface**:
```typescript
interface Chat {
  chatID?: string;            // Unique chat identifier
  replySign?: string;         // Required for sending messages
  clientID?: string;          // Customer ID
  clientName?: string;        // Customer name
  goodCard?: GoodCard;        // Associated product (optional)
  lastMessage?: {             // Last message preview (NEW)
    text?: string;            // Message text
    addTimestamp?: number;    // Unix timestamp (milliseconds)
  };
}
```

### Polling for New Messages

Get new events (messages) from chats:

```typescript
// First poll - get initial events
const events1 = await sdk.communications.getSellerEvents();

console.log(`Received ${events1.result?.length} events`);

// Process events
events1.result?.forEach(event => {
  console.log(`Event Type: ${event.eventType}`);
  console.log(`Chat ID: ${event.chatID}`);
  console.log(`Message: ${event.message?.text}`);

  if (event.isNewChat) {
    console.log('⚠️ This is a new chat!');
  }

  // Handle attachments
  event.message?.attachments?.forEach(file => {
    console.log(`Attachment: ${file.fileName} (${file.extension})`);
    console.log(`Download: ${file.originalUrl}`);
  });
});

// Next poll - use cursor for pagination
if (events1.next) {
  const events2 = await sdk.communications.getSellerEvents(events1.next);
  console.log(`Next batch: ${events2.result?.length} events`);
}
```

**Event Polling Pattern**:
```typescript
async function pollChatEvents() {
  let cursor: string | undefined = undefined;

  while (true) {
    try {
      const response = await sdk.communications.getSellerEvents(cursor);

      // Process new events
      response.result?.forEach(event => {
        handleEvent(event);
      });

      // Update cursor for next poll
      cursor = response.next;

      // Wait before next poll (respect rate limits: 10 req/10 sec)
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Polling error:', error);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

function handleEvent(event: Event) {
  if (event.eventType === 'MessageFromCustomer') {
    console.log(`New message from ${event.chatID}: ${event.message?.text}`);
    // Process customer message...
  }
}
```

### Sending Messages

Reply to customer messages:

```typescript
// Send text message
await sdk.communications.postSellerMessage({
  replySign: chat.replySign!,  // From chat object
  text: 'Спасибо за ваш вопрос! Отвечаем...'
});

// Send message with file attachments
await sdk.communications.postSellerMessage({
  replySign: chat.replySign!,
  text: 'Высылаем инструкцию по применению',
  parts: [
    {
      file: {
        fileName: 'instruction.pdf',
        fileData: base64FileContent  // Base64-encoded file
      }
    }
  ]
});
```

**File Upload Limits**:
- Max file size: 5MB per file
- Max total size: 30MB per message
- Supported formats: JPEG, PNG, PDF

---

## Product Q&A System

### Getting Product Questions

Retrieve unanswered questions about your products:

```typescript
// Get all product questions
const questions = await sdk.communications.getProductQuestions({
  isAnswered: false,  // Only unanswered questions
  take: 100,          // Max 5000
  skip: 0
});

// Display questions
questions.data?.questions?.forEach(q => {
  console.log(`Question ID: ${q.id}`);
  console.log(`Product SKU: ${q.productDetails.nmID}`);
  console.log(`Product: ${q.productDetails.productName}`);
  console.log(`Question: ${q.text}`);
  console.log(`Asked: ${new Date(q.createdDate).toLocaleDateString()}`);

  if (q.answer) {
    console.log(`Your Answer: ${q.answer.text}`);
    console.log(`Editable: ${q.answer.editable}`);
  }

  console.log('---');
});
```

### Answering Questions

Submit answers to customer questions:

```typescript
// Answer a question
await sdk.communications.patchProductQuestionAnswer({
  id: question.id!,
  answer: {
    text: 'Да, этот товар подходит для использования на улице при температуре до -30°C.'
  }
});

// Get question statistics
const stats = await sdk.communications.getProductQuestionsStats();
console.log(`Total questions: ${stats.data?.countUnanswered}`);
console.log(`Unanswered: ${stats.data?.countUnanswered}`);
console.log(`Awaiting publication: ${stats.data?.countUnansweredWbRu}`);
```

---

## Reviews & Ratings

### Getting Product Reviews

Fetch customer reviews with filtering:

```typescript
// Get all reviews
const reviews = await sdk.communications.getNewFeedbacks({
  isAnswered: false,  // Only unanswered reviews
  take: 100,
  skip: 0
});

// Display reviews
reviews.data?.feedbacks?.forEach(review => {
  console.log(`Review ID: ${review.id}`);
  console.log(`Product SKU: ${review.productDetails.nmID}`);
  console.log(`Rating: ${'⭐'.repeat(review.productValuation)}`);
  console.log(`Text: ${review.text}`);
  console.log(`Date: ${new Date(review.createdDate).toLocaleDateString()}`);

  // Check if customer complained
  if (review.hasSupplierComplaint) {
    console.log('⚠️ Customer filed a complaint');
  }

  if (review.answer) {
    console.log(`Your Response: ${review.answer.text}`);
  }

  console.log('---');
});
```

### Responding to Reviews

Reply to customer feedback:

```typescript
// Respond to positive review
await sdk.communications.patchNewFeedbackAnswer({
  id: review.id!,
  text: 'Спасибо за ваш отзыв! Рады, что вам понравился товар. 😊'
});

// Respond to negative review
await sdk.communications.patchNewFeedbackAnswer({
  id: negativeReview.id!,
  text: 'Приносим извинения за неудобства. Мы исправили эту проблему в новой партии товаров. Свяжитесь с нами для решения вашего вопроса.'
});
```

### Review Management

Archive and manage reviews:

```typescript
// Archive old reviews
await sdk.communications.postNewFeedbacksArchive({
  feedbacks: [review1.id!, review2.id!]
});

// Get archived reviews
const archived = await sdk.communications.getArchivedFeedbacks({
  take: 50,
  skip: 0
});

// Unarchive reviews
await sdk.communications.postNewFeedbacksUnarchive({
  feedbacks: [archivedReview.id!]
});
```

### Parent-Child Review Relationships

Handle reviews with parent-child relationships:

```typescript
// Get parent reviews with children
const parents = await sdk.communications.getNewParentFeedbacks({
  take: 100,
  skip: 0
});

parents.data?.feedbacks?.forEach(parent => {
  console.log(`Parent Review ID: ${parent.id}`);
  console.log(`Rating: ${parent.productValuation} stars`);

  // Get child reviews (follow-ups)
  if (parent.id) {
    sdk.communications.getNewFeedbackChildren(parent.id).then(children => {
      children.data?.feedbacks?.forEach(child => {
        console.log(`  └─ Follow-up: ${child.text}`);
      });
    });
  }
});
```

---

## Best Practices

### 1. Chat Response Time

**Respond quickly to customer messages:**

```typescript
// Automated response for common questions
async function handleCustomerMessage(event: Event) {
  const message = event.message?.text?.toLowerCase();

  // Auto-reply patterns
  if (message?.includes('статус заказа')) {
    await sdk.communications.postSellerMessage({
      replySign: getReplySignForChat(event.chatID),
      text: 'Проверяю статус вашего заказа. Один момент...'
    });

    // Fetch order status and reply
    // ... order lookup logic
  }
}
```

**Target Response Times:**
- First response: <1 hour
- Follow-up responses: <3 hours
- Resolution: <24 hours

### 2. Q&A Management

**Answer questions thoroughly:**

```typescript
async function answerProductQuestions() {
  const questions = await sdk.communications.getProductQuestions({
    isAnswered: false,
    take: 100
  });

  for (const q of questions.data?.questions || []) {
    // Generate comprehensive answer
    const answer = generateAnswer(q.text, q.productDetails);

    await sdk.communications.patchProductQuestionAnswer({
      id: q.id!,
      answer: { text: answer }
    });

    console.log(`Answered question ${q.id}`);
  }
}

function generateAnswer(question: string, product: ProductDetails): string {
  // Use product specifications to generate accurate answers
  // Include relevant details: sizes, materials, usage instructions
  return `Detailed answer based on product specifications...`;
}
```

### 3. Review Response Strategy

**Respond to all reviews:**

```typescript
async function respondToReviews() {
  const reviews = await sdk.communications.getNewFeedbacks({
    isAnswered: false,
    take: 100
  });

  for (const review of reviews.data?.feedbacks || []) {
    let response: string;

    // Positive reviews (4-5 stars)
    if (review.productValuation >= 4) {
      response = 'Спасибо за ваш отзыв! Рады, что товар вам понравился. ❤️';
    }
    // Negative reviews (1-3 stars)
    else {
      response = `Приносим извинения за неудобства. ${getIssueResolution(review.text)}`;
    }

    await sdk.communications.patchNewFeedbackAnswer({
      id: review.id!,
      text: response
    });
  }
}

function getIssueResolution(reviewText: string): string {
  // Analyze review text and provide appropriate resolution
  if (reviewText.includes('размер')) {
    return 'Мы обновили таблицу размеров для более точного подбора.';
  }
  // ... other patterns
  return 'Мы работаем над улучшением качества товара.';
}
```

### 4. Chat Dashboard

**Build a comprehensive chat dashboard:**

```typescript
interface ChatDashboard {
  totalChats: number;
  unreadChats: number;
  recentMessages: Array<{
    chatId: string;
    customer: string;
    lastMessage: string;
    timestamp: Date;
  }>;
}

async function getChatDashboard(): Promise<ChatDashboard> {
  const chats = await sdk.communications.getSellerChats();

  // Sort by most recent message
  const sortedChats = chats.result
    ?.filter(chat => chat.lastMessage)
    .sort((a, b) => {
      const timeA = a.lastMessage?.addTimestamp ?? 0;
      const timeB = b.lastMessage?.addTimestamp ?? 0;
      return timeB - timeA;  // Newest first
    });

  return {
    totalChats: chats.result?.length ?? 0,
    unreadChats: 0,  // TODO: Implement unread tracking
    recentMessages: sortedChats?.slice(0, 10).map(chat => ({
      chatId: chat.chatID!,
      customer: chat.clientName!,
      lastMessage: chat.lastMessage!.text!,
      timestamp: new Date(chat.lastMessage!.addTimestamp!)
    })) ?? []
  };
}
```

---

## Rate Limits

**Respect API rate limits to avoid blocks:**

| Endpoint | Rate Limit |
|----------|-----------|
| `getSellerChats()` | 10 requests per 10 seconds |
| `getSellerEvents()` | 10 requests per 10 seconds |
| `postSellerMessage()` | 10 requests per 10 seconds |
| Q&A methods | 5 requests per 5 seconds |
| Reviews methods | 1 request per 5 seconds |

**The SDK automatically enforces rate limits.** No additional throttling needed.

---

## Error Handling

### Common Errors

```typescript
import { RateLimitError, ValidationError, WBAPIError } from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.communications.postSellerMessage({
    replySign: chat.replySign!,
    text: 'Hello!'
  });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded. Retry after:', error.retryAfter);
    await new Promise(resolve => setTimeout(resolve, error.retryAfter));
    // Retry...
  } else if (error instanceof ValidationError) {
    console.error('Invalid request:', error.message);
  } else if (error instanceof WBAPIError) {
    console.error('API error:', error.statusCode, error.message);
  }
}
```

### Retry Logic for Polling

```typescript
async function pollWithRetry(maxRetries = 3) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const events = await sdk.communications.getSellerEvents();
      return events;
    } catch (error) {
      retries++;
      console.error(`Polling failed (attempt ${retries}/${maxRetries}):`, error);

      if (retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000 * retries));
      } else {
        throw error;
      }
    }
  }
}
```

---

## Complete Examples

### Example 1: Customer Support Bot

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Chat bot that auto-replies to common questions
async function customerSupportBot() {
  let cursor: string | undefined = undefined;

  while (true) {
    try {
      const events = await sdk.communications.getSellerEvents(cursor);

      for (const event of events.result || []) {
        if (event.eventType === 'MessageFromCustomer') {
          await handleCustomerMessage(event);
        }
      }

      cursor = events.next;
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Bot error:', error);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function handleCustomerMessage(event: Event) {
  const text = event.message?.text?.toLowerCase();
  const chatId = event.chatID;

  // Get chat details for replySign
  const chats = await sdk.communications.getSellerChats();
  const chat = chats.result?.find(c => c.chatID === chatId);

  if (!chat) return;

  let response: string | null = null;

  // Auto-reply patterns
  if (text?.includes('график работы') || text?.includes('время работы')) {
    response = 'Мы работаем ежедневно с 9:00 до 21:00 по московскому времени.';
  } else if (text?.includes('доставка') || text?.includes('когда придет')) {
    response = 'Доставка обычно занимает 3-7 рабочих дней. Вы можете отследить заказ в личном кабинете.';
  } else if (text?.includes('возврат') || text?.includes('вернуть')) {
    response = 'Вы можете вернуть товар в течение 14 дней. Инструкция: https://...';
  }

  if (response) {
    await sdk.communications.postSellerMessage({
      replySign: chat.replySign!,
      text: response
    });

    console.log(`Auto-replied to ${chat.clientName}: ${response}`);
  }
}

// Start bot
customerSupportBot();
```

### Example 2: Q&A Management Dashboard

```typescript
// Daily Q&A processing
async function processUnansweredQuestions() {
  const questions = await sdk.communications.getProductQuestions({
    isAnswered: false,
    take: 1000
  });

  console.log(`Processing ${questions.data?.questions?.length} unanswered questions`);

  for (const question of questions.data?.questions || []) {
    // Generate answer based on product details
    const answer = await generateProductAnswer(question);

    // Submit answer
    await sdk.communications.patchProductQuestionAnswer({
      id: question.id!,
      answer: { text: answer }
    });

    console.log(`Answered: "${question.text}"`);

    // Respect rate limit
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Get updated stats
  const stats = await sdk.communications.getProductQuestionsStats();
  console.log(`Remaining unanswered: ${stats.data?.countUnanswered}`);
}

async function generateProductAnswer(question: any): Promise<string> {
  // Use product specifications to generate accurate answer
  const product = question.productDetails;

  // Example: Size-related questions
  if (question.text.toLowerCase().includes('размер')) {
    return `Этот товар (${product.productName}) доступен в размерах: ...`;
  }

  // Default comprehensive answer
  return `Спасибо за ваш вопрос! По товару "${product.productName}" (артикул ${product.nmID}): ...`;
}
```

### Example 3: Review Response Automation

```typescript
// Automated review responses
async function manageReviews() {
  const reviews = await sdk.communications.getNewFeedbacks({
    isAnswered: false,
    take: 500
  });

  for (const review of reviews.data?.feedbacks || []) {
    const response = generateReviewResponse(review);

    await sdk.communications.patchNewFeedbackAnswer({
      id: review.id!,
      text: response
    });

    console.log(`Responded to ${review.productValuation}-star review from ${review.userName}`);

    // Respect rate limit: 1 req per 5 seconds
    await new Promise(resolve => setTimeout(resolve, 6000));
  }
}

function generateReviewResponse(review: any): string {
  const rating = review.productValuation;

  // 5-star reviews
  if (rating === 5) {
    return 'Спасибо огромное за ваш отзыв! ❤️ Рады, что товар вам понравился!';
  }

  // 4-star reviews
  if (rating === 4) {
    return 'Спасибо за ваш отзыв! Рады, что в целом товар вам понравился. Будем работать над улучшением!';
  }

  // 1-3 star reviews
  const issues = analyzeNegativeReview(review.text);
  return `Приносим извинения за неудобства! ${issues.resolution} Мы ценим ваш отзыв и работаем над улучшением качества.`;
}

function analyzeNegativeReview(text: string): { issue: string; resolution: string } {
  if (text.toLowerCase().includes('размер')) {
    return {
      issue: 'Размер не подошел',
      resolution: 'Мы обновили таблицу размеров для более точного подбора.'
    };
  }

  if (text.toLowerCase().includes('качество') || text.toLowerCase().includes('брак')) {
    return {
      issue: 'Проблема с качеством',
      resolution: 'Мы усилили контроль качества на производстве.'
    };
  }

  return {
    issue: 'Общая неудовлетворенность',
    resolution: 'Мы работаем над улучшением нашего товара.'
  };
}
```

---

## Related Resources

- **[API Reference](https://salacoste.github.io/daytona-wildberries-typescript-sdk/api/)** - Complete TypeDoc documentation
- **[Customer Support Example](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/customer-support.ts)** - Full working example
- **[Official Wildberries Docs](https://dev.wildberries.ru/openapi/user-communication)** - Official API documentation
- **[Story 3.5: Customer Chat](../stories/3.5.communications-customer-chat.md)** - Implementation story
- **[Story 3.6: Q&A and Reviews](../stories/3.6.communications-qa-reviews.md)** - Q&A and reviews story
- **[Story 3.7: Chat Last Message](../stories/3.7.communications-chat-lastmessage.md)** - lastMessage feature story
- **[Epic 3: Communications Module](../epics/epic-3-communications-module.md)** - Complete module overview

---

**Need Help?** [Open an issue](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues) or [join discussions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)
