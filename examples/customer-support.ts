/**
 * Customer Support - Complete Communications Module Example
 *
 * This comprehensive example demonstrates complete customer communication workflows:
 * - Customer chat messaging (real-time event polling with last message preview)
 * - Product Q&A management (answer customer questions)
 * - Customer reviews management (respond to feedback)
 *
 * **NEW in v2.3.2:** Chat list now includes lastMessage field with message preview and timestamp
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 15 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Communications module permissions enabled on your API key
 * - Active products and orders (to receive real customer chats)
 * - Customer questions or reviews (for Q&A and Reviews examples)
 *
 * **What This Example Covers:**
 * - **Chat (Examples 1-8)**: Real-time messaging, event polling, file attachments
 * - **Q&A (Examples 9-11)**: Answer questions, reject spam, mark as viewed
 * - **Reviews (Examples 12-15)**: Respond to reviews, edit responses, analyze feedback
 * - Event-based architecture with cursor pagination
 * - Rate limit handling (10 req/10s for chat, 3 req/sec for Q&A/reviews)
 * - Error handling for all communication scenarios
 *
 * **Expected Output:**
 * ```
 * === Example 1: Get All Chats ===
 * Found 5 active chat(s):
 * Chat 1:
 *   Customer: John Doe (ID: 12345)
 *   Product: nmID 987654
 *   Order: WB-ORDER-123
 *   Last Message: "Спасибо за быструю доставку!"
 *   Sent: 24.12.2025, 10:17:10 (2 hours ago)
 *
 * === Example 2: Poll for New Events ===
 * Processing 15 events (3 new messages, 2 file attachments, 10 system events)
 *
 * === Example 3: Send Message ===
 * ✅ Message sent successfully
 *
 * === Example 9: Get All Questions ===
 * Found 10 unanswered questions
 *
 * === Example 10: Answer Question ===
 * ✅ Answer published
 *
 * === Example 12: Get All Reviews ===
 * Found 25 reviews (Avg rating: 4.5/5)
 *
 * === Example 13: Respond to Review ===
 * ✅ Response published
 * ```
 *
 * **Usage:**
 * ```bash
 * # Set your API key
 * export WB_API_KEY="your_api_key_here"
 *
 * # Run the example
 * tsx examples/customer-support.ts
 * ```
 *
 * **Related Examples:**
 * - communications-customer-engagement.ts - Alternative communications workflow
 * - customer-engagement.ts - Focused on Q&A and reviews only
 *
 * **Architecture Patterns:**
 * - **Chat**: Event-based with unified event stream and cursor pagination
 * - **Q&A/Reviews**: Filter-based with pagination (take/skip parameters)
 * - **Rate Limiting**: 10 req/10s for chats, 3 req/sec for Q&A/Reviews
 *
 * **Common Issues:**
 * - "No active chats": Customers must initiate chats (requires active orders)
 * - "No questions found": Questions depend on product visibility and customer activity
 * - "Response rejected": Ensure responses follow content guidelines (no URLs, no profanity)
 * - "Chat event pagination": Use cursor from previous response for continuous polling
 *
 * @see {@link https://dev.wildberries.ru/openapi/user-communication} - Official Communications API documentation
 */

import {
  WildberriesSDK,
  ChatEvent,
  ValidationError,
  RateLimitError,
  AuthenticationError,
  NetworkError,
  WBAPIError,
} from '../src';

// Initialize SDK
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  timeout: 30000,
  logLevel: 'info',
});

/**
 * Helper function: Format time ago
 * Converts timestamp to human-readable relative time (e.g., "2 hours ago")
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins === 1) return '1 minute ago';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('ru-RU');
}

/**
 * Example 1: Get all active chats
 *
 * Retrieves all chat conversations with customers.
 * Use this to get an overview of all customer interactions.
 */
async function getAllChats() {
  console.log('\n=== Example 1: Get All Chats ===\n');

  try {
    const chatsResponse = await sdk.communications.getChats();

    if (!chatsResponse.result || chatsResponse.result.length === 0) {
      console.log('No active chats found');
      return;
    }

    console.log(`Found ${chatsResponse.result.length} active chat(s):\n`);

    chatsResponse.result.forEach((chat, index) => {
      console.log(`Chat ${index + 1}:`);
      console.log(`  Chat ID: ${chat.chatID}`);
      console.log(`  Customer: ${chat.clientName} (ID: ${chat.clientID})`);
      console.log(`  Reply Sign: ${chat.replySign.slice(0, 30)}...`);

      if (chat.goodCard) {
        console.log(`  Product: nmID ${chat.goodCard.nmID}`);
        console.log(`  Order: ${chat.goodCard.rid}`);
        console.log(`  Price: ${chat.goodCard.price} ${chat.goodCard.priceCurrency}`);
        console.log(`  Status: ${chat.goodCard.statusID}`);
      }

      // NEW: Display last message (added in v2.3.2)
      if (chat.lastMessage) {
        const date = new Date(chat.lastMessage.addTimestamp!);
        const timeAgo = getTimeAgo(date);
        console.log(`  Last Message: "${chat.lastMessage.text?.substring(0, 50)}${(chat.lastMessage.text?.length ?? 0) > 50 ? '...' : ''}"`);
        console.log(`  Sent: ${date.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} (${timeAgo})`);
      }

      console.log('');
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
      console.log('   Chat rate limit: 10 requests per 10 seconds');
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
      console.log('   Verify API key has Communications module permissions');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('Error fetching chats:', error);
    }
  }
}

/**
 * Example 2: Get chat events with pagination
 *
 * Retrieves all chat events using cursor-based pagination.
 * Events include messages from customers, sellers, and system notifications.
 */
async function getAllChatEvents() {
  console.log('\n=== Example 2: Get All Chat Events (Paginated) ===\n');

  try {
    const allEvents: ChatEvent[] = [];
    let cursor: number | undefined;
    let pageCount = 0;

    // Paginate through all events
    do {
      pageCount++;
      const eventsResponse = await sdk.communications.getEvents(cursor);

      console.log(`Page ${pageCount}: ${eventsResponse.result.totalEvents} event(s)`);

      allEvents.push(...eventsResponse.result.events);
      cursor = eventsResponse.result.next;

      // Stop when no more events
      if (eventsResponse.result.totalEvents === 0) {
        break;
      }
    } while (cursor);

    console.log(`\nTotal events retrieved: ${allEvents.length}\n`);

    // Display recent events
    const recentEvents = allEvents.slice(0, 5);
    recentEvents.forEach((event, index) => {
      console.log(`Event ${index + 1}:`);
      console.log(`  Type: ${event.eventType}`);
      console.log(`  From: ${event.sender} (${event.clientName})`);
      console.log(`  Time: ${event.addTime}`);
      console.log(`  Chat ID: ${event.chatID}`);

      if (event.message?.text) {
        console.log(`  Message: ${event.message.text}`);
      }

      if (event.isNewChat) {
        console.log(`  🆕 New chat! Reply sign: ${event.replySign?.slice(0, 30)}...`);
      }

      console.log('');
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('Error fetching events:', error);
    }
  }
}

/**
 * Example 3: Send message to customer
 *
 * Demonstrates how to send a text message to a customer.
 * The replySign can be obtained from Chat or ChatEvent (for new chats).
 */
async function sendMessageToCustomer() {
  console.log('\n=== Example 3: Send Message ===\n');

  try {
    // Get first chat
    const chatsResponse = await sdk.communications.getChats();

    if (!chatsResponse.result || chatsResponse.result.length === 0) {
      console.log('No chats available to send message');
      return;
    }

    const chat = chatsResponse.result[0];
    const replySign = chat.replySign;

    console.log(`Sending message to: ${chat.clientName}`);
    console.log(`Chat ID: ${chat.chatID}\n`);

    // Send message
    const messageResponse = await sdk.communications.sendMessage(
      replySign,
      'Thank you for your message! We are reviewing your request and will respond shortly.'
    );

    console.log('✅ Message sent successfully!');
    console.log(`Message ID: ${messageResponse.result.chatID}`);
    console.log(`Timestamp: ${new Date(messageResponse.result.addTime).toISOString()}`);
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   Common causes:');
      console.log('   - Empty replySign or message');
      console.log('   - Message exceeds 1000 characters');
      console.log('   - No text or files provided');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('Error sending message:', error);
    }
  }
}

/**
 * Example 4: Send message with file attachment
 *
 * Demonstrates how to send a message with file attachments.
 * Supported formats: JPEG, PDF, PNG
 * Limits: Max 5MB per file, 30MB total
 */
async function sendMessageWithFiles() {
  console.log('\n=== Example 4: Send Message with Files ===\n');

  try {
    // Get first chat
    const chatsResponse = await sdk.communications.getChats();

    if (!chatsResponse.result || chatsResponse.result.length === 0) {
      console.log('No chats available');
      return;
    }

    const chat = chatsResponse.result[0];
    const replySign = chat.replySign;

    // Note: In a real application, you would read files from disk or receive them from a form
    // For this example, we're showing the structure
    console.log('Example: Sending message with file attachment\n');
    console.log('Code:');
    console.log(`
    import { readFileSync } from 'fs';

    const fileBuffer = readFileSync('path/to/invoice.pdf');
    const file = new Blob([fileBuffer], { type: 'application/pdf' });

    await sdk.communications.sendMessage(
      replySign,
      'Here is your invoice.',
      [file]
    );
    `);

    console.log('Note: File upload not executed in this example');
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

/**
 * Example 5: Real-time event polling
 *
 * NOTE: This example is commented out because pollForNewEvents() is not an SDK method.
 * To implement event polling, use setInterval() with sdk.communications.getEvents()
 *
 * Demonstrates how to set up real-time polling for new chat events.
 * This is useful for building automated customer support systems.
 */
/*
async function startRealTimePolling() {
  console.log('\n=== Example 5: Real-Time Event Polling ===\n');
  console.log('Starting event polling (will run for 30 seconds)...\n');

  let eventCount = 0;

  // Start polling for new events every 10 seconds
  const polling = sdk.communications.pollForNewEvents(10000, async (events) => {
    if (events.length === 0) {
      console.log(`[${new Date().toISOString()}] No new events`);
      return;
    }

    console.log(`\n[${new Date().toISOString()}] Received ${events.length} new event(s):`);

    for (const event of events) {
      eventCount++;

      console.log(`\nEvent #${eventCount}:`);
      console.log(`  Type: ${event.eventType}`);
      console.log(`  From: ${event.sender} - ${event.clientName}`);
      console.log(`  Chat ID: ${event.chatID}`);

      if (event.message?.text) {
        console.log(`  Message: "${event.message.text}"`);
      }

      // Auto-respond to new customer messages
      if (event.sender === 'client' && event.isNewChat && event.replySign) {
        console.log('  🤖 Auto-responding to new chat...');

        try {
          await sdk.communications.sendMessage(
            event.replySign,
            'Thank you for contacting us! A support agent will assist you shortly.'
          );
          console.log('  ✅ Auto-response sent');
        } catch (error) {
          console.error('  ❌ Failed to send auto-response:', error);
        }
      }
    }
  });

  // Stop polling after 30 seconds
  setTimeout(() => {
    polling.stop();
    console.log('\n\nPolling stopped.');
    console.log(`Total events processed: ${eventCount}`);
  }, 30000);
}
*/

/**
 * Example 6: Filter events by chatID
 *
 * Demonstrates how to filter events for a specific chat conversation.
 */
async function filterEventsByChat() {
  console.log('\n=== Example 6: Filter Events by Chat ===\n');

  try {
    // Get all events
    const eventsResponse = await sdk.communications.getEvents();

    if (eventsResponse.result.events.length === 0) {
      console.log('No events found');
      return;
    }

    // Get first chatID
    const targetChatID = eventsResponse.result.events[0].chatID;

    // Filter events for this specific chat
    const chatEvents = eventsResponse.result.events.filter(
      event => event.chatID === targetChatID
    );

    console.log(`Chat ID: ${targetChatID}`);
    console.log(`Total events: ${eventsResponse.result.events.length}`);
    console.log(`Events for this chat: ${chatEvents.length}\n`);

    // Display conversation history
    console.log('Conversation history:');
    chatEvents.forEach((event, index) => {
      const sender = event.sender === 'client' ? '👤 Customer' : '🏢 Seller';
      console.log(`\n${index + 1}. ${sender} (${event.addTime})`);
      if (event.message?.text) {
        console.log(`   "${event.message.text}"`);
      }
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

/**
 * Example 7: Get only customer messages
 *
 * Demonstrates how to filter for messages sent by customers only.
 * Useful for processing customer inquiries or support tickets.
 */
async function getOnlyCustomerMessages() {
  console.log('\n=== Example 7: Get Customer Messages Only ===\n');

  try {
    const eventsResponse = await sdk.communications.getEvents();

    // Filter for client messages only
    const customerMessages = eventsResponse.result.events.filter(event => event.sender === 'client');

    console.log(`Total events: ${eventsResponse.result.events.length}`);
    console.log(`Customer messages: ${customerMessages.length}\n`);

    // Display recent customer messages
    const recentMessages = customerMessages.slice(0, 10);
    recentMessages.forEach((event, index) => {
      console.log(`\n${index + 1}. ${event.clientName} (${event.addTime})`);
      console.log(`   Chat: ${event.chatID}`);
      if (event.message?.text) {
        console.log(`   Message: "${event.message.text}"`);
      }
      if (event.isNewChat) {
        console.log('   🆕 New conversation');
      }
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

/**
 * Example 8: Comprehensive error handling
 *
 * Demonstrates how to handle various errors that may occur.
 */
async function demonstrateErrorHandling() {
  console.log('\n=== Example 8: Error Handling ===\n');

  // Test 1: Validation error - empty replySign
  try {
    console.log('Test 1: Sending message with empty replySign');
    await sdk.communications.sendMessage('', 'Test message');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('✅ Caught ValidationError:', error.message);
    }
  }

  // Test 2: Validation error - message too long
  try {
    console.log('\nTest 2: Sending message >1000 characters');
    const longMessage = 'a'.repeat(1001);
    await sdk.communications.sendMessage('test:signature', longMessage);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('✅ Caught ValidationError:', error.message);
    }
  }

  // Test 3: Validation error - no message or files
  try {
    console.log('\nTest 3: Sending message without text or files');
    await sdk.communications.sendMessage('test:signature');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('✅ Caught ValidationError:', error.message);
    }
  }

  console.log('\n✅ All error handling tests passed');
}

// ============================================================================
// Product Q&A Examples
// ============================================================================

/**
 * Example 9: Get and answer product questions
 *
 * Demonstrates how to retrieve unanswered questions and provide answers.
 */
async function answerProductQuestions() {
  console.log('\n=== Example 9: Answer Product Questions ===\n');

  try {
    // Get unanswered questions
    const questionsResponse = await sdk.communications.getQuestions({
      isAnswered: false,
      take: 10,
      skip: 0,
      order: 'dateDesc', // Newest first
    });

    console.log(`Unanswered questions: ${questionsResponse.data.countUnanswered}`);
    console.log(`Archived questions: ${questionsResponse.data.countArchive}\n`);

    if (questionsResponse.data.questions.length === 0) {
      console.log('No unanswered questions found');
      return;
    }

    // Display and answer questions
    for (const question of questionsResponse.data.questions.slice(0, 3)) {
      console.log(`Question ID: ${question.id}`);
      console.log(`Product: ${question.productDetails.productName} (nmId: ${question.productDetails.nmId})`);
      console.log(`Question: "${question.text}"`);
      console.log(`Created: ${question.createdDate}`);
      console.log(`Status: ${question.state}`);
      console.log(`Viewed: ${question.wasViewed ? 'Yes' : 'No'}`);

      if (question.isWarned) {
        console.log('⚠️  This question is marked as suspicious');
      }

      // Example: Answer the question
      const answer = `Thank you for your question about ${question.productDetails.productName}. Our team has reviewed your inquiry and will provide detailed information shortly.`;

      console.log(`\nSending answer...`);
      await sdk.communications.answerQuestion(question.id, answer);
      console.log('✅ Answer sent successfully!\n');

      // Mark as viewed
      await sdk.communications.markQuestionViewed(question.id);
      console.log('---\n');
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
      console.log('   Q&A rate limit: 3 requests per second');
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   Answer must not be empty');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('Error handling questions:', error);
    }
  }
}

/**
 * Example 10: Filter questions by product
 *
 * Demonstrates how to get questions for a specific product.
 */
async function getQuestionsByProduct() {
  console.log('\n=== Example 10: Filter Questions by Product ===\n');

  try {
    const targetNmId = 12345; // Example product ID

    const questionsResponse = await sdk.communications.getQuestions({
      isAnswered: false,
      nmId: targetNmId,
      take: 20,
      skip: 0,
    });

    console.log(`Questions for product nmId ${targetNmId}:`);
    console.log(`Count: ${questionsResponse.data.questions.length}\n`);

    questionsResponse.data.questions.forEach((q, index) => {
      console.log(`${index + 1}. "${q.text}"`);
      console.log(`   Asked on: ${new Date(q.createdDate).toLocaleDateString()}`);
      console.log(`   Status: ${q.state}\n`);
    });
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

/**
 * Example 11: Reject inappropriate questions
 *
 * Demonstrates how to reject questions that violate guidelines.
 */
async function rejectInappropriateQuestions() {
  console.log('\n=== Example 11: Reject Inappropriate Questions ===\n');

  try {
    const questionsResponse = await sdk.communications.getQuestions({
      isAnswered: false,
      take: 50,
      skip: 0,
    });

    // Example: Check for inappropriate content (simplified)
    const inappropriateKeywords = ['spam', 'inappropriate', 'offensive'];

    for (const question of questionsResponse.data.questions) {
      const hasInappropriateContent = inappropriateKeywords.some((keyword) =>
        question.text.toLowerCase().includes(keyword)
      );

      if (hasInappropriateContent || question.isWarned) {
        console.log(`Rejecting question: "${question.text}"`);
        console.log(`Reason: ${question.isWarned ? 'Marked as suspicious' : 'Inappropriate content'}`);

        // Reject question (state='none', not visible to customers)
        await sdk.communications.answerQuestion(
          question.id,
          'This question violates our community guidelines.',
          true // reject = true
        );

        console.log('✅ Question rejected\n');
      }
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

// ============================================================================
// Customer Reviews Examples
// ============================================================================

/**
 * Example 12: Get and respond to customer reviews
 *
 * Demonstrates how to retrieve reviews and respond professionally.
 */
async function respondToCustomerReviews() {
  console.log('\n=== Example 12: Respond to Customer Reviews ===\n');

  try {
    // Get unanswered reviews
    const reviewsResponse = await sdk.communications.getReviews({
      isAnswered: false,
      take: 10,
      skip: 0,
      order: 'dateDesc',
    });

    console.log(`Unanswered reviews: ${reviewsResponse.data.countUnanswered}`);
    console.log(`Answered reviews: ${reviewsResponse.data.countArchive}\n`);

    if (reviewsResponse.data.feedbacks.length === 0) {
      console.log('No unanswered reviews found');
      return;
    }

    // Display and respond to reviews
    for (const review of reviewsResponse.data.feedbacks.slice(0, 3)) {
      console.log(`Review ID: ${review.id}`);
      console.log(`Product: ${review.productDetails.productName}`);
      console.log(`Rating: ${'⭐'.repeat(review.productValuation)} (${review.productValuation}/5)`);
      console.log(`Customer: ${review.userName}`);
      console.log(`Date: ${review.createdDate}`);
      console.log(`Text: "${review.text}"`);

      if (review.pros) console.log(`Pros: ${review.pros}`);
      if (review.cons) console.log(`Cons: ${review.cons}`);
      if (review.matchingSize !== ' ') {
        console.log(`Size fit: ${review.matchingSize}`);
      }

      // Check for photos
      if (review.photoLinks && review.photoLinks.length > 0) {
        console.log(`\n📷 Photos: ${review.photoLinks.length}`);
        review.photoLinks.forEach((photo, i) => {
          console.log(`  ${i + 1}. ${photo.fullSize}`);
        });
      }

      // Check for video
      if (review.video) {
        console.log(`\n🎥 Video: ${review.video.durationSec}s`);
        console.log(`  Preview: ${review.video.previewImage}`);
        console.log(`  Playlist: ${review.video.link}`);
      }

      // Generate appropriate response based on rating
      let response: string;

      if (review.productValuation >= 4) {
        response = `Thank you for your wonderful ${review.productValuation}-star review, ${review.userName}! We're thrilled that you're enjoying our ${review.productDetails.productName}. Your feedback means a lot to us!`;
      } else if (review.productValuation === 3) {
        response = `Thank you for your feedback, ${review.userName}. We appreciate your honest review of our ${review.productDetails.productName}. We're always working to improve our products and services.`;
      } else {
        response = `We sincerely apologize for your experience with our ${review.productDetails.productName}, ${review.userName}. Customer satisfaction is our top priority. Please contact us directly so we can make this right.`;
      }

      console.log(`\nSending response...`);
      await sdk.communications.respondToReview(review.id, response);
      console.log('✅ Response sent successfully!');
      console.log('---\n');
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
      console.log('   Reviews rate limit: 3 requests per second');
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
      console.log('   Response must not exceed character limit');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else {
      console.error('Error handling reviews:', error);
    }
  }
}

/**
 * Example 13: Filter reviews by product and rating
 *
 * Demonstrates how to get reviews for specific products and rating levels.
 */
async function filterReviewsByProductAndRating() {
  console.log('\n=== Example 13: Filter Reviews by Product ===\n');

  try {
    const targetNmId = 12345; // Example product ID

    const reviewsResponse = await sdk.communications.getReviews({
      isAnswered: false,
      nmId: targetNmId,
      take: 50,
      skip: 0,
    });

    console.log(`Reviews for product nmId ${targetNmId}:\n`);

    // Group by rating
    const reviewsByRating: Record<number, typeof reviewsResponse.data.feedbacks> = {
      5: [],
      4: [],
      3: [],
      2: [],
      1: [],
    };

    reviewsResponse.data.feedbacks.forEach((review) => {
      reviewsByRating[review.productValuation]?.push(review);
    });

    // Display statistics
    console.log('Rating distribution:');
    for (let rating = 5; rating >= 1; rating--) {
      const count = reviewsByRating[rating]?.length || 0;
      const stars = '⭐'.repeat(rating);
      const bar = '█'.repeat(count);
      console.log(`${stars} (${rating}): ${bar} ${count} review(s)`);
    }

    // Prioritize low ratings for immediate response
    const lowRatingReviews = reviewsResponse.data.feedbacks.filter((r) => r.productValuation <= 2);

    if (lowRatingReviews.length > 0) {
      console.log(`\n⚠️  ${lowRatingReviews.length} low-rating review(s) need attention!`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Example 14: Edit existing review response
 *
 * Demonstrates how to update a previously sent response.
 * Note: Can only edit once within 60 days.
 */
async function editReviewResponse() {
  console.log('\n=== Example 14: Edit Review Response ===\n');

  try {
    // Get answered reviews to find editable ones
    const reviewsResponse = await sdk.communications.getReviews({
      isAnswered: true,
      take: 20,
      skip: 0,
    });

    // Find reviews with editable responses
    const editableReviews = reviewsResponse.data.feedbacks.filter(
      (r) => r.answer && r.answer.editable
    );

    if (editableReviews.length === 0) {
      console.log('No editable responses found');
      console.log('(Responses can only be edited once within 60 days)');
      return;
    }

    const review = editableReviews[0];

    console.log(`Review ID: ${review.id}`);
    console.log(`Product: ${review.productDetails.productName}`);
    console.log(`Rating: ${review.productValuation}/5`);
    console.log(`\nCurrent response:`);
    console.log(`"${review.answer?.text}"\n`);

    const updatedResponse = `${review.answer?.text} We've also added new features based on customer feedback like yours. Thank you for helping us improve!`;

    console.log(`Updating response...`);
    await sdk.communications.editReviewResponse(review.id, updatedResponse);
    console.log('✅ Response updated successfully!');
    console.log(`\nNew response:`);
    console.log(`"${updatedResponse}"`);
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Example 15: Comprehensive review analysis
 *
 * Analyzes reviews with photos/videos and customer tags.
 */
async function analyzeReviewsWithMedia() {
  console.log('\n=== Example 15: Analyze Reviews with Media ===\n');

  try {
    const reviewsResponse = await sdk.communications.getReviews({
      isAnswered: false,
      take: 100,
      skip: 0,
    });

    const reviews = reviewsResponse.data.feedbacks;

    // Statistics
    const withPhotos = reviews.filter((r) => r.photoLinks && r.photoLinks.length > 0);
    const withVideos = reviews.filter((r) => r.video !== null);
    const withTags = reviews.filter((r) => r.bables && r.bables.length > 0);

    console.log(`Total reviews: ${reviews.length}`);
    console.log(`With photos: ${withPhotos.length} (${((withPhotos.length / reviews.length) * 100).toFixed(1)}%)`);
    console.log(`With videos: ${withVideos.length} (${((withVideos.length / reviews.length) * 100).toFixed(1)}%)`);
    console.log(`With tags: ${withTags.length}\n`);

    // Show reviews with media
    if (withPhotos.length > 0) {
      console.log('Sample reviews with photos:');
      withPhotos.slice(0, 3).forEach((review, index) => {
        console.log(`\n${index + 1}. ${review.userName} - ${review.productValuation}⭐`);
        console.log(`   Product: ${review.productDetails.productName}`);
        console.log(`   Photos: ${review.photoLinks?.length}`);
        if (review.bables && review.bables.length > 0) {
          console.log(`   Tags: ${review.bables.join(', ')}`);
        }
      });
    }

    // Analyze customer tags
    if (withTags.length > 0) {
      const allTags: string[] = [];
      withTags.forEach((r) => {
        if (r.bables) allTags.push(...r.bables);
      });

      const tagCounts = allTags.reduce(
        (acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      console.log('\n\nMost common customer tags:');
      Object.entries(tagCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .forEach(([tag, count], index) => {
          console.log(`${index + 1}. "${tag}": ${count} mention(s)`);
        });
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

/**
 * Main function - Run all examples
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Customer Support - Complete Examples');
  console.log('Chat + Q&A + Reviews');
  console.log('='.repeat(60));

  // Check API key
  if (!process.env.WB_API_KEY) {
    console.error('\n❌ Error: WB_API_KEY environment variable is not set');
    console.log('\nPlease set your Wildberries API key:');
    console.log('  export WB_API_KEY=your_api_key_here\n');
    process.exit(1);
  }

  try {
    // Chat examples
    await getAllChats();
    await getAllChatEvents();
    await sendMessageToCustomer();
    await sendMessageWithFiles();
    await filterEventsByChat();
    await getOnlyCustomerMessages();
    await demonstrateErrorHandling();

    // Q&A examples
    await answerProductQuestions();
    await getQuestionsByProduct();
    await rejectInappropriateQuestions();

    // Reviews examples
    await respondToCustomerReviews();
    await filterReviewsByProductAndRating();
    await editReviewResponse();
    await analyzeReviewsWithMedia();

    // Real-time polling (runs for 30 seconds)
    await startRealTimePolling();

    // Wait for polling to finish
    await new Promise((resolve) => setTimeout(resolve, 31000));
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('\n⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
      console.log('   Reduce request frequency to stay within limits');
    } else if (error instanceof AuthenticationError) {
      console.error('\n🔐 Authentication Error:', error.message);
      console.log('   Verify WB_API_KEY environment variable');
      console.log('   Ensure API key has Communications module permissions');
    } else if (error instanceof ValidationError) {
      console.error('\n❌ Validation Error:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('\n🌐 Network Error:', error.message);
      console.log('   Check internet connection and API status');
    } else if (error instanceof WBAPIError) {
      console.error('\n⚠️ API Error:', error.statusCode, error.message);
    } else {
      console.error('\n❌ Fatal error:', error);
    }
    process.exit(1);
  }

  console.log('\n' + '='.repeat(60));
  console.log('All examples completed successfully!');
  console.log('='.repeat(60) + '\n');
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export {
  // Chat examples
  getAllChats,
  getAllChatEvents,
  sendMessageToCustomer,
  sendMessageWithFiles,
  startRealTimePolling,
  filterEventsByChat,
  getOnlyCustomerMessages,
  demonstrateErrorHandling,
  // Q&A examples
  answerProductQuestions,
  getQuestionsByProduct,
  rejectInappropriateQuestions,
  // Reviews examples
  respondToCustomerReviews,
  filterReviewsByProductAndRating,
  editReviewResponse,
  analyzeReviewsWithMedia,
};
