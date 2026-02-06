/**
 * Communications Module - Pinned Reviews & Customer Engagement Examples
 *
 * This example demonstrates the Communications API for managing customer interactions:
 * - Pinned Reviews: Pin positive reviews to product cards
 * - Feedbacks: View and respond to customer reviews
 * - Questions: Manage Q&A on products
 * - Buyer Chat: Direct messaging with customers
 * - Return Claims: Handle customer return requests
 *
 * **Complexity**: 🟡 Intermediate
 * **Estimated Time**: 20 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Communications module permissions enabled
 * - For pinned reviews: Active Jam subscription or tariff option
 *
 * **What This Example Covers:**
 * - **Pinned Reviews**: Check limits, list, pin, and unpin reviews
 * - **Feedbacks**: List reviews, respond, edit responses
 * - **Questions**: List questions, answer, mark as viewed
 * - **Chat**: List chats, get events, send messages
 * - **Claims**: View and respond to return requests
 *
 * **Expected Output:**
 * ```
 * === Communications Module Demo ===
 *
 * 📌 Section 1: Pinned Reviews
 * ✅ Limits retrieved:
 *    Subscription: 10 total, 3 used, 7 remaining
 *    Tariff: 5 total, 1 used, 4 remaining
 *
 * ✅ Pinned reviews count: 4
 *
 * ✅ Pinned reviews list:
 *    Pin ID: 123, Feedback: abc123, Product: 12345678
 *
 * 💬 Section 2: Feedbacks (Reviews)
 * ✅ Unanswered reviews: 5 total, 2 today
 * ✅ Average rating: 4.7
 *
 * ❓ Section 3: Questions
 * ✅ Unanswered questions: 3 total, 1 today
 *
 * 💬 Section 4: Buyer Chat
 * ✅ Active chats: 2
 *
 * 📦 Section 5: Return Claims
 * ✅ Active claims: 1
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/communications-pinned-reviews.ts
 * ```
 *
 * **Related Examples:**
 * - products-basic.ts - Product management basics
 * - orders-fbs-basic.ts - Order fulfillment
 *
 * @see {@link https://dev.wildberries.ru/openapi/user-communication} - Official API Documentation
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';

// Configuration
const API_KEY = process.env.WB_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: WB_API_KEY environment variable not set');
  console.log('Set your API key: export WB_API_KEY="your_key_here"');
  process.exit(1);
}

// Initialize SDK
const sdk = new WildberriesSDK({
  apiKey: API_KEY,
  timeout: 30000,
  logLevel: 'info',
});

/**
 * Demo configuration
 * Replace these with your actual IDs when testing
 */
const DEMO_CONFIG = {
  // Example feedback ID for pinning
  feedbackId: 'VlbkVVl7mtw37wyWkJZz',
  // Example product nmId
  productId: 12345678,
  // Example question ID
  questionId: 'question-uuid-here',
  // Pagination settings
  pageSize: 10,
};

// ============================================================================
// SECTION 1: PINNED REVIEWS
// ============================================================================

/**
 * Check pinning limits for subscription and tariff
 */
async function checkPinningLimits(): Promise<void> {
  console.log('📊 Checking pinning limits...\n');

  const limits = await sdk.communications.getPinnedFeedbacksLimits();

  if (limits.data) {
    if (limits.data.subscription) {
      const sub = limits.data.subscription;
      console.log('   Subscription limits:');
      console.log(`      Total: ${sub.total || 0}`);
      console.log(`      Used: ${sub.used || 0}`);
      console.log(`      Remaining: ${sub.remaining || 0}`);
      console.log(`      Per product: ${sub.perUnit || 'N/A'}`);
    } else {
      console.log('   No active subscription for pinning');
    }

    if (limits.data.tariff) {
      const tariff = limits.data.tariff;
      console.log('   Tariff limits:');
      console.log(`      Total: ${tariff.total || 0}`);
      console.log(`      Used: ${tariff.used || 0}`);
      console.log(`      Remaining: ${tariff.remaining || 0}`);
    } else {
      console.log('   No tariff option for pinning');
    }
  }
  console.log('');
}

/**
 * Get count of pinned reviews with various filters
 */
async function getPinnedCount(): Promise<void> {
  console.log('🔢 Getting pinned reviews count...\n');

  // Count all pinned reviews
  const pinnedCount = await sdk.communications.getPinnedFeedbacksCount({
    state: 'pinned',
  });
  console.log(`   Total pinned: ${pinnedCount.data || 0}`);

  // Count pinned to product cards (nm)
  const nmCount = await sdk.communications.getPinnedFeedbacksCount({
    state: 'pinned',
    pinOn: 'nm',
  });
  console.log(`   Pinned to product cards: ${nmCount.data || 0}`);

  // Count pinned to merged groups (imt)
  const imtCount = await sdk.communications.getPinnedFeedbacksCount({
    state: 'pinned',
    pinOn: 'imt',
  });
  console.log(`   Pinned to merged groups: ${imtCount.data || 0}`);

  // Count unpinned (automatically removed)
  const unpinnedCount = await sdk.communications.getPinnedFeedbacksCount({
    state: 'unpinned',
  });
  console.log(`   Auto-unpinned: ${unpinnedCount.data || 0}`);
  console.log('');
}

/**
 * List pinned reviews with pagination
 */
async function listPinnedReviews(): Promise<void> {
  console.log('📋 Listing pinned reviews...\n');

  const response = await sdk.communications.getPinnedFeedbacks({
    state: 'pinned',
    limit: DEMO_CONFIG.pageSize,
  });

  if (response.data && response.data.pins && response.data.pins.length > 0) {
    console.log(`   Found ${response.data.pins.length} pinned reviews:`);
    response.data.pins.slice(0, 5).forEach((pin) => {
      console.log(`      Pin ID: ${pin.pinId}`);
      console.log(`        Feedback: ${pin.feedbackId}`);
      console.log(`        Product (nmId): ${pin.nmId}`);
      console.log(`        Pinned on: ${pin.pinOn === 'nm' ? 'Product card' : 'Merged group'}`);
      console.log(`        Method: ${pin.pinMethod}`);
      if (pin.pinnedAt) {
        console.log(`        Pinned at: ${pin.pinnedAt}`);
      }
    });

    if (response.data.next) {
      console.log(`\n   More results available (cursor: ${response.data.next})`);
    }
  } else {
    console.log('   No pinned reviews found');
  }
  console.log('');
}

/**
 * Pin a review to a product card
 * NOTE: Requires active subscription or tariff
 */
async function pinReviewExample(): Promise<void> {
  console.log('📌 Pin review example (commented - requires real data)...\n');

  console.log('   To pin a review, use:');
  console.log('   ```typescript');
  console.log('   const result = await sdk.communications.pinFeedback([');
  console.log('     {');
  console.log("       feedbackId: 'feedback-uuid',");
  console.log('       nmId: 12345678,');
  console.log("       pinOn: 'nm',        // 'nm' = product card, 'imt' = merged group");
  console.log("       pinMethod: 'subscription' // or 'tariff'");
  console.log('     }');
  console.log('   ]);');
  console.log('   ```\n');

  /*
  // UNCOMMENT TO PIN A REAL REVIEW:
  const result = await sdk.communications.pinFeedback([
    {
      feedbackId: DEMO_CONFIG.feedbackId,
      nmId: DEMO_CONFIG.productId,
      pinOn: 'nm',
      pinMethod: 'subscription',
    },
  ]);

  if (result.data) {
    result.data.forEach((item) => {
      if (item.isErrors) {
        console.log(`   Failed to pin ${item.feedbackId}:`, item.errors);
      } else {
        console.log(`   ✅ Pinned! Pin ID: ${item.pinId}`);
      }
    });
  }
  */
}

/**
 * Unpin reviews
 */
async function unpinReviewExample(): Promise<void> {
  console.log('🗑️  Unpin review example (commented - requires real data)...\n');

  console.log('   To unpin reviews, first get the pinId values:');
  console.log('   ```typescript');
  console.log(
    "   const pinned = await sdk.communications.getPinnedFeedbacks({ state: 'pinned' });"
  );
  console.log('   const pinIds = pinned.data.pins.map(p => p.pinId);');
  console.log('');
  console.log('   const result = await sdk.communications.unpinFeedback(pinIds);');
  console.log('   console.log("Unpinned:", result.data);');
  console.log('   ```\n');

  /*
  // UNCOMMENT TO UNPIN REAL REVIEWS:
  const pinned = await sdk.communications.getPinnedFeedbacks({ state: 'pinned', limit: 3 });
  if (pinned.data?.pins?.length) {
    const pinIds = pinned.data.pins.map((p) => p.pinId);
    const result = await sdk.communications.unpinFeedback(pinIds);
    console.log(`   ✅ Unpinned: ${result.data?.join(', ')}`);
  }
  */
}

// ============================================================================
// SECTION 2: FEEDBACKS (REVIEWS)
// ============================================================================

/**
 * Check for new and unanswered feedbacks
 */
async function checkFeedbackStatus(): Promise<void> {
  console.log('📬 Checking feedback status...\n');

  // Check for new feedbacks
  const hasNew = await sdk.communications.newFeedbacksQuestions();
  if (hasNew.data) {
    console.log(`   Has new feedbacks: ${hasNew.data.hasNewFeedbacks ? 'Yes' : 'No'}`);
    console.log(`   Has new questions: ${hasNew.data.hasNewQuestions ? 'Yes' : 'No'}`);
  }

  // Get unanswered count and average rating
  const unanswered = await sdk.communications.getFeedbacksCountUnanswered();
  if (unanswered.data) {
    console.log(`   Unanswered feedbacks: ${unanswered.data.countUnanswered || 0}`);
    console.log(`   Unanswered today: ${unanswered.data.countUnansweredToday || 0}`);
    console.log(`   Average rating: ${unanswered.data.valuation || 'N/A'}`);
  }
  console.log('');
}

/**
 * List feedbacks with filters
 */
async function listFeedbacks(): Promise<void> {
  console.log('📝 Listing recent feedbacks...\n');

  const feedbacks = await sdk.communications.feedbacks({
    isAnswered: false,
    take: 5,
    skip: 0,
    order: 'dateDesc',
  });

  if (feedbacks.data?.feedbacks && Array.isArray(feedbacks.data.feedbacks)) {
    console.log(`   Unanswered: ${feedbacks.data.countUnanswered || 0}`);
    console.log(`   Archive: ${feedbacks.data.countArchive || 0}`);
    console.log('   Recent feedbacks:');

    const feedbackList = feedbacks.data.feedbacks as Array<{
      id?: string;
      text?: string;
      productValuation?: number;
      productDetails?: { productName?: string };
    }>;

    feedbackList.slice(0, 3).forEach((fb) => {
      console.log(`      ID: ${fb.id}`);
      console.log(`        Rating: ${'⭐'.repeat(fb.productValuation || 0)}`);
      console.log(`        Product: ${fb.productDetails?.productName || 'N/A'}`);
      console.log(`        Text: ${(fb.text || '').substring(0, 50)}...`);
    });
  } else {
    console.log('   No unanswered feedbacks');
  }
  console.log('');
}

/**
 * Get a single feedback by ID
 */
async function getFeedbackById(): Promise<void> {
  console.log('🔍 Get feedback by ID example...\n');

  console.log('   To get a specific feedback:');
  console.log('   ```typescript');
  console.log("   const feedback = await sdk.communications.feedback({ id: 'feedback-id' });");
  console.log('   console.log(feedback.data);');
  console.log('   ```\n');
}

/**
 * Respond to a feedback
 */
async function respondToFeedback(): Promise<void> {
  console.log('💬 Respond to feedback example (commented)...\n');

  console.log('   To respond to a feedback:');
  console.log('   ```typescript');
  console.log('   await sdk.communications.createFeedbacksAnswer({');
  console.log("     id: 'feedback-uuid',");
  console.log("     text: 'Thank you for your feedback! We appreciate...'");
  console.log('   });');
  console.log('   ```');
  console.log('');
  console.log('   To edit a response (once within 60 days):');
  console.log('   ```typescript');
  console.log('   await sdk.communications.updateFeedbacksAnswer({');
  console.log("     id: 'feedback-uuid',");
  console.log("     text: 'Updated response text...'");
  console.log('   });');
  console.log('   ```\n');
}

// ============================================================================
// SECTION 3: QUESTIONS
// ============================================================================

/**
 * Check unanswered questions count
 */
async function checkQuestionsStatus(): Promise<void> {
  console.log('❓ Checking questions status...\n');

  const unanswered = await sdk.communications.getQuestionsCountUnanswered();
  if (unanswered.data) {
    console.log(`   Unanswered questions: ${unanswered.data.countUnanswered || 0}`);
    console.log(`   Unanswered today: ${unanswered.data.countUnansweredToday || 0}`);
  }
  console.log('');
}

/**
 * List questions
 */
async function listQuestions(): Promise<void> {
  console.log('📋 Listing recent questions...\n');

  const questions = await sdk.communications.questions({
    isAnswered: false,
    take: 5,
    skip: 0,
    order: 'dateDesc',
  });

  if (questions.data?.questions && questions.data.questions.length > 0) {
    console.log(`   Unanswered: ${questions.data.countUnanswered || 0}`);
    console.log('   Recent questions:');

    questions.data.questions.slice(0, 3).forEach((q) => {
      console.log(`      ID: ${q.id}`);
      console.log(`        Question: ${(q.text || '').substring(0, 50)}...`);
      console.log(`        Product: ${q.productDetails?.productName || 'N/A'}`);
      console.log(`        Viewed: ${q.wasViewed ? 'Yes' : 'No'}`);
    });
  } else {
    console.log('   No unanswered questions');
  }
  console.log('');
}

/**
 * Answer a question
 */
async function answerQuestionExample(): Promise<void> {
  console.log('✏️  Answer question example (commented)...\n');

  console.log('   To answer a question:');
  console.log('   ```typescript');
  console.log('   await sdk.communications.updateQuestion({');
  console.log("     id: 'question-uuid',");
  console.log("     state: 'answered',");
  console.log("     answer: { text: 'Thank you for your question! The answer is...' }");
  console.log('   });');
  console.log('   ```');
  console.log('');
  console.log('   To mark as viewed:');
  console.log('   ```typescript');
  console.log('   await sdk.communications.updateQuestion({');
  console.log("     id: 'question-uuid',");
  console.log('     wasViewed: true');
  console.log('   });');
  console.log('   ```\n');
}

// ============================================================================
// SECTION 4: BUYER CHAT
// ============================================================================

/**
 * List buyer chats
 */
async function listBuyerChats(): Promise<void> {
  console.log('💬 Listing buyer chats...\n');

  try {
    const chats = await sdk.communications.getSellerChats();
    if (chats.chats && chats.chats.length > 0) {
      console.log(`   Active chats: ${chats.chats.length}`);
      chats.chats.slice(0, 3).forEach((chat) => {
        console.log(`      Chat ID: ${chat.chatID}`);
        console.log(`        Unread: ${chat.unreadCount || 0} messages`);
      });
    } else {
      console.log('   No active chats');
    }
  } catch (error) {
    console.log('   ⚠️  Could not retrieve chats (may require specific permissions)');
  }
  console.log('');
}

/**
 * Get chat events
 */
async function getChatEvents(): Promise<void> {
  console.log('📨 Getting chat events...\n');

  try {
    const events = await sdk.communications.getSellerEvents({});
    if (events.events && events.events.length > 0) {
      console.log(`   Total events: ${events.totalEvents || events.events.length}`);
      events.events.slice(0, 3).forEach((event) => {
        console.log(`      Event ID: ${event.id}`);
        console.log(`        Type: ${event.type}`);
        console.log(`        Chat: ${event.chatID}`);
      });

      if (events.next) {
        console.log(`   More events available (next: ${events.next})`);
      }
    } else {
      console.log('   No chat events');
    }
  } catch (error) {
    console.log('   ⚠️  Could not retrieve events');
  }
  console.log('');
}

// ============================================================================
// SECTION 5: RETURN CLAIMS
// ============================================================================

/**
 * List return claims
 */
async function listReturnClaims(): Promise<void> {
  console.log('📦 Listing return claims...\n');

  try {
    const claims = await sdk.communications.claims({
      is_archive: false,
      limit: 10,
      offset: 0,
    });

    if (claims && Array.isArray(claims) && claims.length > 0) {
      console.log(`   Active claims: ${claims.length}`);
    } else {
      console.log('   No active return claims');
    }
  } catch (error) {
    console.log('   ⚠️  Could not retrieve claims');
  }
  console.log('');
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('=== Communications Module Demo ===');
  console.log('='.repeat(60));
  console.log('');

  try {
    // Section 1: Pinned Reviews
    console.log('📌 SECTION 1: PINNED REVIEWS');
    console.log('-'.repeat(40));
    await checkPinningLimits();
    await getPinnedCount();
    await listPinnedReviews();
    await pinReviewExample();
    await unpinReviewExample();

    // Section 2: Feedbacks
    console.log('💬 SECTION 2: FEEDBACKS (REVIEWS)');
    console.log('-'.repeat(40));
    await checkFeedbackStatus();
    await listFeedbacks();
    await getFeedbackById();
    await respondToFeedback();

    // Section 3: Questions
    console.log('❓ SECTION 3: QUESTIONS');
    console.log('-'.repeat(40));
    await checkQuestionsStatus();
    await listQuestions();
    await answerQuestionExample();

    // Section 4: Buyer Chat
    console.log('💬 SECTION 4: BUYER CHAT');
    console.log('-'.repeat(40));
    await listBuyerChats();
    await getChatEvents();

    // Section 5: Return Claims
    console.log('📦 SECTION 5: RETURN CLAIMS');
    console.log('-'.repeat(40));
    await listReturnClaims();

    // Summary
    console.log('='.repeat(60));
    console.log('\n💡 Communications Best Practices:\n');

    console.log('1. Pinned Reviews:');
    console.log('   - Requires Jam subscription or tariff option');
    console.log('   - Pin positive 5-star reviews to boost visibility');
    console.log('   - Max 500 reviews per request');
    console.log('   - Monitor auto-unpinned reviews (review deleted, etc.)\n');

    console.log('2. Feedbacks:');
    console.log('   - Respond promptly to maintain good seller rating');
    console.log('   - Edits allowed once within 60 days');
    console.log('   - Use templates for common responses\n');

    console.log('3. Questions:');
    console.log('   - Answer questions to help customers decide');
    console.log('   - Mark irrelevant questions as viewed');
    console.log('   - Edits allowed once within 60 days\n');

    console.log('4. Rate Limits:');
    console.log('   - Q&A/Feedbacks: 3 req/sec (333ms interval)');
    console.log('   - Chat: 10 req/10sec (1 second interval)');
    console.log('   - Claims: 20 req/min (3 second interval)\n');

    console.log('🎉 Communications demo complete!\n');
  } catch (error) {
    handleError(error);
    process.exit(1);
  }
}

/**
 * Centralized error handling
 */
function handleError(error: unknown): void {
  if (error instanceof RateLimitError) {
    console.error('⚠️  Rate Limit Error:', error.message);
    console.log(`   Retry after: ${error.retryAfter}ms`);
  } else if (error instanceof AuthenticationError) {
    console.error('🔐 Authentication Error:', error.message);
    console.log('   Verify your WB_API_KEY is valid and has communications permissions');
  } else if (error instanceof ValidationError) {
    console.error('❌ Validation Error:', error.message);
  } else if (error instanceof NetworkError) {
    console.error('🌐 Network Error:', error.message);
  } else if (error instanceof WBAPIError) {
    console.error('⚠️  API Error:', error.statusCode, error.message);
  } else {
    console.error('❌ Unexpected error:', error);
  }
}

// Run example
main();
