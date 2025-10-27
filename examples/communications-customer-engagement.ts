/**
 * Complete Customer Engagement - Communications Module Full Workflow
 *
 * This comprehensive example demonstrates all customer interaction management:
 * - **Customer Chat**: Real-time messaging about orders with event polling
 * - **Questions & Answers**: Respond to product inquiries from potential buyers
 * - **Reviews Management**: Respond to customer feedback and ratings
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 30 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Communications module permissions enabled on your API key
 * - Active products and orders (to receive chats, questions, and reviews)
 * - Published products (for questions and reviews)
 *
 * **What This Example Covers:**
 * - **Part 1: Chat Management**: Fetch chats, poll events, filter by chatID, send messages
 * - **Part 2: Q&A Management**: Get questions, answer inquiries, reject spam, mark viewed
 * - **Part 3: Reviews Management**: Get reviews, respond to feedback, edit responses
 * - Event-based architecture with cursor pagination (chats)
 * - Filter-based pagination with take/skip parameters (Q&A, reviews)
 * - Rate limit handling (10 req/10s for chat, 3 req/sec for Q&A/reviews)
 *
 * **Expected Output:**
 * ```
 * === Part 1: Customer Chat Management ===
 *
 * Step 1: Fetching all active chats...
 * Found 3 active chat(s)
 *
 * Chat 1:
 *   Chat ID: chat_abc123
 *   Customer: Ivan Petrov (ID: 54321)
 *   Product: Premium Cotton T-Shirt
 *
 * Step 2: Polling for new events...
 * Processing 25 events...
 * Found 8 new messages from customers
 *
 * Step 3: Sending reply...
 * ✅ Message sent successfully
 *
 * === Part 2: Product Q&A Management ===
 *
 * Step 1: Getting all questions...
 * Found 12 unanswered questions
 *
 * Question 1: "What is the material composition?"
 *   Product: nmID 987654
 *   Asked: 2 days ago
 *
 * Step 2: Answering question...
 * ✅ Answer published
 *
 * === Part 3: Customer Reviews Management ===
 *
 * Step 1: Getting all reviews...
 * Found 45 reviews (Average: 4.5 stars)
 *
 * Review 1: ⭐⭐⭐⭐⭐
 *   "Great quality, fast shipping!"
 *   Product: nmID 987654
 *
 * Step 2: Responding to review...
 * ✅ Response published
 * ```
 *
 * **Usage:**
 * ```bash
 * # Set your API key
 * export WB_API_KEY="your_api_key_here"
 *
 * # Run the example
 * tsx examples/communications-customer-engagement.ts
 * ```
 *
 * **Related Examples:**
 * - customer-support.ts - Alternative full communications workflow
 * - customer-engagement.ts - Focused Q&A and reviews examples
 *
 * **Common Issues:**
 * - "No chats found": Chats are customer-initiated (requires active orders)
 * - "No questions": Questions depend on product visibility and traffic
 * - "Response rejected": Follow content guidelines (no URLs, profanity, or spam)
 * - "Event polling incomplete": Use cursor pagination for continuous monitoring
 * - "Rate limit exceeded": Chat API limited to 10 req/10s, Q&A/Reviews to 3 req/sec
 *
 * @see {@link https://dev.wildberries.ru/openapi/user-communication} - Official Communications API documentation
 *
 * @example Basic chat usage
 * ```typescript
 * const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY });
 *
 * // Get all chats
 * const chats = await sdk.communications.getChats();
 *
 * // Poll for new messages
 * const events = await sdk.communications.getEvents();
 *
 * // Reply to customer
 * await sdk.communications.sendMessage(chat.replySign, 'Thank you!');
 * ```
 */

import {
  WildberriesSDK,
  ValidationError,
  RateLimitError,
  AuthenticationError,
  NetworkError,
  WBAPIError,
} from '../src';
import type { Chat, ChatEvent, Sender } from '../src/types/communications.types';

// Initialize SDK
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY || '',
});

/**
 * Helper function to format event timestamp
 */
function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

/**
 * Helper function to truncate long text
 */
function truncate(text: string, maxLength = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Part 1: Customer Chat Management
 *
 * The Chat API uses an event-based architecture:
 * - All messages across all chats come through a single events stream
 * - Events are retrieved with cursor-based pagination
 * - Client-side filtering is needed to view specific conversations
 * - The `replySign` from each chat is required to send messages
 */
async function manageChatConversations() {
  console.log('\n=== Part 1: Customer Chat Management ===\n');

  try {
    // Step 1: Get all active chat conversations
    console.log('Step 1: Fetching all active chats...');
    const chatsResponse = await sdk.communications.getChats();
    const chats = chatsResponse.result;

    if (chats.length === 0) {
      console.log('No active chats found.');
      console.log('Chats are created when customers message you about orders.');
      return;
    }

    console.log(`Found ${chats.length} active chat(s)\n`);

    // Display chat overview
    chats.forEach((chat, index) => {
      console.log(`Chat ${index + 1}:`);
      console.log(`  Chat ID: ${chat.chatID}`);
      console.log(`  Customer: ${chat.clientName} (ID: ${chat.clientID})`);
      if (chat.goodCard) {
        console.log(`  Product: ${chat.goodCard.productName}`);
        console.log(`  Order Status ID: ${chat.goodCard.statusID}`);
      }
      console.log('');
    });

    // Step 2: Poll for new events (messages)
    console.log('Step 2: Polling for new messages...');
    const eventsResponse = await sdk.communications.getEvents();
    const { events, next, totalEvents } = eventsResponse.result;

    console.log(`Total events available: ${totalEvents}`);
    console.log(`Events in this batch: ${events.length}`);
    console.log(`Next cursor: ${next || 'N/A'}\n`);

    if (events.length === 0) {
      console.log('No new events found.');
      console.log('Events include all messages across all chats.');
      return;
    }

    // Step 3: Filter and display recent customer messages
    console.log('Step 3: Recent customer messages:\n');

    const customerMessages = events.filter(
      (event) => event.sender === ('client' as Sender) && event.eventType === 'message'
    );

    if (customerMessages.length === 0) {
      console.log('No customer messages in recent events.');
    } else {
      customerMessages.slice(0, 5).forEach((event, index) => {
        console.log(`Message ${index + 1}:`);
        console.log(`  Chat: ${event.chatID}`);
        console.log(`  Time: ${formatTimestamp(event.time)}`);
        console.log(`  Text: ${truncate(event.text)}`);
        console.log('');
      });
    }

    // Step 4: Respond to a chat (demonstration)
    if (chats.length > 0) {
      console.log('Step 4: Sending response to first chat (dry run)...\n');

      const firstChat = chats[0];
      const responseMessage = 'Thank you for your message! How can I help you today?';

      console.log(`Would send to Chat ${firstChat.chatID}:`);
      console.log(`  Customer: ${firstChat.clientName}`);
      console.log(`  Message: "${responseMessage}"`);
      console.log(`  Reply Sign: ${truncate(firstChat.replySign, 40)}...\n`);

      // Uncomment to actually send the message:
      // try {
      //   await sdk.communications.sendMessage(firstChat.replySign, responseMessage);
      //   console.log('✅ Message sent successfully!\n');
      // } catch (error) {
      //   console.error('❌ Failed to send message:', error.message);
      // }

      console.log('(Message not sent - uncomment code to send)\n');
    }

    // Step 5: Continue pagination if more events exist
    if (next && totalEvents > events.length) {
      console.log('Step 5: Fetching more events with pagination...\n');
      const moreEventsResponse = await sdk.communications.getEvents(next);
      console.log(`Fetched ${moreEventsResponse.result.events.length} more events`);
      console.log(`Next cursor: ${moreEventsResponse.result.next || 'End of stream'}\n`);
    }

  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
      console.log('   Chat API limit: 10 requests per 10 seconds');
      console.log('   Use 10-second polling intervals for production');
    } else if (error instanceof AuthenticationError) {
      console.error('🔐 Authentication Error:', error.message);
      console.log('   Verify API key has Communications module permissions');
    } else if (error instanceof ValidationError) {
      console.error('❌ Validation Error:', error.message);
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else if (error instanceof WBAPIError) {
      console.error('⚠️ API Error:', error.statusCode, error.message);
    } else if (error instanceof Error) {
      console.error('❌ Error managing chats:', error.message);
    }
  }
}

/**
 * Part 2: Customer Questions Management
 *
 * Handle product questions from potential customers:
 * - View unanswered questions
 * - Provide helpful answers
 * - Mark questions as viewed
 */
async function manageCustomerQuestions() {
  console.log('\n=== Part 2: Customer Questions Management ===\n');

  try {
    // Step 1: Get unanswered questions
    console.log('Step 1: Fetching unanswered questions...');

    const questionsResponse = await sdk.communications.getQuestions({
      isAnswered: false,
      take: 10, // Get first 10 questions
      skip: 0,
    });

    const { data, countUnanswered, countArchive } = questionsResponse;

    console.log(`Total unanswered questions: ${countUnanswered}`);
    console.log(`Archived questions: ${countArchive}`);
    console.log(`Questions in this batch: ${data?.questions?.length || 0}\n`);

    if (!data?.questions || data.questions.length === 0) {
      console.log('No unanswered questions found.');
      console.log('Questions appear when customers ask about your products.\n');
      return;
    }

    // Display questions
    data.questions.forEach((question, index) => {
      console.log(`Question ${index + 1}:`);
      console.log(`  ID: ${question.id}`);
      console.log(`  Product: ${question.productDetails?.productName || 'Unknown'}`);
      console.log(`  Customer: ${question.userName}`);
      console.log(`  Asked: ${new Date(question.createdDate).toLocaleDateString()}`);
      console.log(`  Question: ${truncate(question.text, 100)}`);
      console.log(`  Answered: ${question.answer?.text ? 'Yes' : 'No'}`);
      console.log('');
    });

    // Step 2: Answer a question (demonstration)
    if (data.questions.length > 0) {
      const firstQuestion = data.questions[0];

      console.log('Step 2: Answering first question (dry run)...\n');
      console.log(`Question: ${truncate(firstQuestion.text, 80)}`);
      console.log(`Answer: "Thank you for your question! [Your helpful answer here]"`);
      console.log('');

      // Uncomment to actually answer the question:
      // try {
      //   await sdk.communications.answerQuestion(firstQuestion.id, {
      //     text: 'Thank you for your question! [Your helpful answer here]',
      //   });
      //   console.log('✅ Answer submitted successfully!\n');
      // } catch (error) {
      //   console.error('❌ Failed to answer question:', error.message);
      // }

      console.log('(Answer not submitted - uncomment code to answer)\n');

      // Step 3: Mark question as viewed
      console.log('Step 3: Marking question as viewed (dry run)...\n');

      // Uncomment to mark as viewed:
      // try {
      //   await sdk.communications.markQuestionViewed(firstQuestion.id);
      //   console.log('✅ Question marked as viewed!\n');
      // } catch (error) {
      //   console.error('❌ Failed to mark as viewed:', error.message);
      // }

      console.log('(Not marked - uncomment code to mark as viewed)\n');
    }

    // Step 4: Get answered questions
    console.log('Step 4: Fetching answered questions...');

    const answeredResponse = await sdk.communications.getQuestions({
      isAnswered: true,
      take: 5,
      skip: 0,
    });

    const answeredCount = answeredResponse.data?.questions?.length || 0;
    console.log(`Answered questions retrieved: ${answeredCount}\n`);

    if (answeredCount > 0 && answeredResponse.data?.questions) {
      answeredResponse.data.questions.forEach((question, index) => {
        console.log(`Answered Q${index + 1}:`);
        console.log(`  Question: ${truncate(question.text, 60)}`);
        console.log(`  Answer: ${truncate(question.answer?.text || 'N/A', 60)}`);
        console.log('');
      });
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
      console.log('   Answer text must not be empty');
    } else if (error instanceof NetworkError) {
      console.error('🌐 Network Error:', error.message);
    } else if (error instanceof WBAPIError) {
      console.error('⚠️ API Error:', error.statusCode, error.message);
    } else if (error instanceof Error) {
      console.error('❌ Error managing questions:', error.message);
    }
  }
}

/**
 * Part 3: Customer Reviews Management
 *
 * Respond to customer reviews and feedback:
 * - View unanswered reviews
 * - Respond professionally to feedback
 * - Edit existing responses if needed
 */
async function manageCustomerReviews() {
  console.log('\n=== Part 3: Customer Reviews Management ===\n');

  try {
    // Step 1: Get unanswered reviews
    console.log('Step 1: Fetching unanswered reviews...');

    const reviewsResponse = await sdk.communications.getReviews({
      isAnswered: false,
      take: 10,
      skip: 0,
    });

    const { data, countUnanswered, countArchive } = reviewsResponse;

    console.log(`Total unanswered reviews: ${countUnanswered}`);
    console.log(`Archived reviews: ${countArchive}`);
    console.log(`Reviews in this batch: ${data?.feedbacks?.length || 0}\n`);

    if (!data?.feedbacks || data.feedbacks.length === 0) {
      console.log('No unanswered reviews found.');
      console.log('Reviews appear after customers purchase and rate your products.\n');
      return;
    }

    // Display reviews
    data.feedbacks.forEach((review, index) => {
      console.log(`Review ${index + 1}:`);
      console.log(`  ID: ${review.id}`);
      console.log(`  Product: ${review.productDetails?.productName || 'Unknown'}`);
      console.log(`  Rating: ${'⭐'.repeat(review.productValuation)} (${review.productValuation}/5)`);
      console.log(`  Customer: ${review.userName}`);
      console.log(`  Date: ${new Date(review.createdDate).toLocaleDateString()}`);
      console.log(`  Review: ${truncate(review.text || 'No text', 100)}`);
      console.log(`  Answered: ${review.answer?.text ? 'Yes' : 'No'}`);
      console.log('');
    });

    // Step 2: Respond to a review (demonstration)
    if (data.feedbacks.length > 0) {
      const firstReview = data.feedbacks[0];

      console.log('Step 2: Responding to first review (dry run)...\n');
      console.log(`Rating: ${firstReview.productValuation}/5`);
      console.log(`Review: ${truncate(firstReview.text || '', 80)}`);

      const responseText =
        firstReview.productValuation >= 4
          ? 'Thank you for your positive feedback! We appreciate your business!'
          : 'Thank you for your feedback. We are sorry to hear about your experience. Please contact us so we can help resolve this issue.';

      console.log(`Response: "${responseText}"`);
      console.log('');

      // Uncomment to actually respond:
      // try {
      //   await sdk.communications.respondToReview(firstReview.id, responseText);
      //   console.log('✅ Response submitted successfully!\n');
      // } catch (error) {
      //   console.error('❌ Failed to respond to review:', error.message);
      // }

      console.log('(Response not submitted - uncomment code to respond)\n');
    }

    // Step 3: Get reviews with responses
    console.log('Step 3: Fetching reviews with responses...');

    const answeredResponse = await sdk.communications.getReviews({
      isAnswered: true,
      take: 5,
      skip: 0,
    });

    const answeredCount = answeredResponse.data?.feedbacks?.length || 0;
    console.log(`Reviews with responses retrieved: ${answeredCount}\n`);

    if (answeredCount > 0 && answeredResponse.data?.feedbacks) {
      answeredResponse.data.feedbacks.forEach((review, index) => {
        console.log(`Review with Response ${index + 1}:`);
        console.log(`  Rating: ${review.productValuation}/5`);
        console.log(`  Review: ${truncate(review.text || '', 60)}`);
        console.log(`  Your Response: ${truncate(review.answer?.text || 'N/A', 60)}`);
        console.log('');
      });

      // Step 4: Edit a response (demonstration)
      const firstAnswered = answeredResponse.data.feedbacks[0];
      if (firstAnswered.answer?.id) {
        console.log('Step 4: Editing response (dry run)...\n');
        console.log(`Original: ${truncate(firstAnswered.answer.text, 60)}`);
        console.log(`Updated: "Thank you for your valuable feedback! We are constantly working to improve."`);
        console.log('');

        // Uncomment to actually edit:
        // try {
        //   await sdk.communications.editReviewResponse(
        //     firstAnswered.id,
        //     firstAnswered.answer.id,
        //     'Thank you for your valuable feedback! We are constantly working to improve.'
        //   );
        //   console.log('✅ Response updated successfully!\n');
        // } catch (error) {
        //   console.error('❌ Failed to update response:', error.message);
        // }

        console.log('(Response not updated - uncomment code to edit)\n');
      }
    }

    // Step 5: Filter reviews by rating
    console.log('Step 5: Fetching 5-star reviews...');

    const fiveStarResponse = await sdk.communications.getReviews({
      isAnswered: false,
      take: 5,
      skip: 0,
      nmId: undefined, // Can filter by product ID if needed
      order: 'dateDesc', // Sort by date descending
    });

    // Filter 5-star reviews client-side
    const fiveStarReviews =
      fiveStarResponse.data?.feedbacks?.filter((r) => r.productValuation === 5) || [];

    console.log(`Found ${fiveStarReviews.length} 5-star review(s) in this batch\n`);

    if (fiveStarReviews.length > 0) {
      fiveStarReviews.forEach((review, index) => {
        console.log(`⭐⭐⭐⭐⭐ ${index + 1}: ${truncate(review.text || 'Great!', 70)}`);
      });
      console.log('');
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
    } else if (error instanceof WBAPIError) {
      console.error('⚠️ API Error:', error.statusCode, error.message);
    } else if (error instanceof Error) {
      console.error('❌ Error managing reviews:', error.message);
    }
  }
}

/**
 * Main workflow execution
 */
async function main() {
  console.log('=======================================================');
  console.log('  Communications Module - Customer Engagement Workflow');
  console.log('=======================================================');

  // Verify API key
  if (!process.env.WB_API_KEY) {
    console.error('\n❌ Error: WB_API_KEY environment variable is not set');
    console.error('   Please set it before running this example:\n');
    console.error('   export WB_API_KEY="your-api-key"\n');
    process.exit(1);
  }

  try {
    // Part 1: Chat Management
    await manageChatConversations();

    // Wait a bit to respect rate limits (10 req/10 sec)
    console.log('Waiting 2 seconds to respect rate limits...\n');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Part 2: Questions Management
    await manageCustomerQuestions();

    // Wait a bit to respect rate limits
    console.log('Waiting 2 seconds to respect rate limits...\n');
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Part 3: Reviews Management
    await manageCustomerReviews();

    console.log('\n=======================================================');
    console.log('  ✅ Customer Engagement Workflow Complete!');
    console.log('=======================================================\n');

    console.log('Summary of Communications Module Features:\n');
    console.log('1. ✅ Customer Chat Management');
    console.log('   - Event-based messaging system');
    console.log('   - Cursor-based pagination for events');
    console.log('   - Real-time customer support');
    console.log('');
    console.log('2. ✅ Questions & Answers');
    console.log('   - Product inquiry management');
    console.log('   - Help potential customers make informed decisions');
    console.log('   - Mark questions as viewed/answered');
    console.log('');
    console.log('3. ✅ Reviews Management');
    console.log('   - Respond to customer feedback');
    console.log('   - Edit responses as needed');
    console.log('   - Build customer relationships');
    console.log('');
    console.log('Best Practices:');
    console.log('- Poll chat events every 10 seconds (respects rate limits)');
    console.log('- Respond to questions and reviews within 24 hours');
    console.log('- Keep responses professional and helpful');
    console.log('- Monitor negative reviews and address concerns promptly');
    console.log('');

  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('\n⚠️ Rate Limit Error:', error.message);
      console.log(`   Retry after: ${error.retryAfter}ms`);
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
    } else if (error instanceof Error) {
      console.error('\n❌ Fatal error in customer engagement workflow:', error.message);
    } else {
      console.error('\n❌ Unknown error:', error);
    }
    process.exit(1);
  }
}

// Run the workflow
main()
  .then(() => {
    console.log('Exiting successfully.\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nUnhandled error:', error);
    process.exit(1);
  });
