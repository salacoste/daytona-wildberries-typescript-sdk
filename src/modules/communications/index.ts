/**
 * Communications Module
 *
 * This module implements the Wildberries Chat with Customers API,
 * enabling sellers to communicate with buyers through the marketplace.
 *
 * ## Event-Based Architecture
 *
 * The Chat API uses an event-based architecture where:
 * - A single events stream contains messages for ALL chats
 * - Events are retrieved using cursor-based pagination
 * - Client-side filtering is required to view specific conversations
 * - The `replySign` is required to send messages and is obtained from:
 *   1. `Chat.replySign` from `getChats()`
 *   2. `Event.replySign` from `getChatEvents()` when `isNewChat: true`
 *
 * ## Typical Workflow
 *
 * 1. **Get All Chats**: Call `getChats()` to fetch all active conversations
 * 2. **Poll for Events**: Call `getChatEvents()` periodically to monitor new messages
 * 3. **Filter Events**: Filter events by `chatID` and `sender` as needed (client-side)
 * 4. **Extract replySign**: Get `replySign` from Chat or new chat events
 * 5. **Send Messages**: Use `sendMessage(replySign, message)` to reply
 *
 * ## Rate Limits
 *
 * All chat endpoints have the same rate limit:
 * - **10 requests per 10 seconds** (1 request/second average, burst of 10)
 *
 * For polling, use a minimum interval of 10 seconds to stay within limits.
 *
 * @module CommunicationsModule
 *
 * @example
 * ```typescript
 * // Get all chats
 * const chatsResponse = await sdk.communications.getChats();
 * const chats = chatsResponse.result;
 *
 * // Poll for new events
 * const eventsResponse = await sdk.communications.getChatEvents();
 * const { events, next, totalEvents } = eventsResponse.result;
 *
 * // Continue pagination
 * if (totalEvents > 0) {
 *   const moreEvents = await sdk.communications.getChatEvents(next);
 * }
 *
 * // Send message
 * const replySign = chats[0].replySign;
 * await sdk.communications.sendMessage(replySign, 'Thank you for your message!');
 * ```
 */

import type { BaseClient } from '../../client/base-client';
import type {
  ChatsResponse,
  EventsResponse,
  MessageResponse,
  ChatEvent,
  Chat,
  QuestionFilters,
  QuestionsResponse,
  AnswerQuestionRequest,
  MarkQuestionViewedRequest,
  ReviewFilters,
  ReviewsResponse,
  RespondToReviewRequest,
} from '../../types/communications.types';
import { ValidationError } from '../../errors/validation-error';

/**
 * CommunicationsModule class
 *
 * Provides methods for interacting with the Wildberries Chat with Customers API.
 */
export class CommunicationsModule {
  /**
   * Creates a new CommunicationsModule instance
   *
   * @param client - The BaseClient instance for making HTTP requests
   */
  constructor(private client: BaseClient) {}

  /**
   * Get all chat conversations
   *
   * This method retrieves ALL active chat conversations with customers.
   * The API does not support filtering, so all chats are returned in a single response.
   *
   * Each chat includes a `replySign` field which is required for sending messages
   * to that chat via `sendMessage()`.
   *
   * **Rate Limit**: 10 requests per 10 seconds
   *
   * @returns Promise resolving to list of all chats with replySign for each
   *
   * @throws {AuthenticationError} When API key is invalid or missing
   * @throws {RateLimitError} When rate limit is exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * const chatsResponse = await sdk.communications.getChats();
   * const chats = chatsResponse.result;
   *
   * console.log(`You have ${chats.length} active chats`);
   *
   * // Extract replySign for sending messages
   * chats.forEach(chat => {
   *   console.log(`Chat ${chat.chatID} with ${chat.clientName}`);
   *   console.log(`Reply sign: ${chat.replySign}`);
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1chats/get}
   */
  async getChats(): Promise<ChatsResponse> {
    return this.client.get<ChatsResponse>(
      'https://buyer-chat-api.wildberries.ru/api/v1/seller/chats',
      { rateLimitKey: 'communications.getChats' }
    );
  }

  /**
   * Get chat events using cursor pagination
   *
   * This method retrieves events for ALL chats (not per-chat).
   * The API uses cursor-based pagination with the `next` parameter.
   *
   * **Event-Based Architecture**:
   * - Returns events for ALL chats in a single stream
   * - Use `next` parameter for pagination (Unix timestamp with milliseconds)
   * - Continue fetching until `totalEvents` equals 0
   * - Client-side filtering required to view events for specific chats
   *
   * **Cursor Pagination Pattern**:
   * 1. First request: Call without `next` parameter
   * 2. Subsequent requests: Use `next` value from previous response
   * 3. Stop when `totalEvents` is 0 (no more events)
   *
   * **Rate Limit**: 10 requests per 10 seconds
   *
   * @param next - Optional cursor timestamp (Unix timestamp with milliseconds) from previous response
   * @returns Promise resolving to events with pagination cursor
   *
   * @throws {ValidationError} When next parameter is invalid (must be positive number)
   * @throws {AuthenticationError} When API key is invalid or missing
   * @throws {RateLimitError} When rate limit is exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // First request (no cursor)
   * const firstPage = await sdk.communications.getChatEvents();
   * console.log(`Found ${firstPage.result.totalEvents} events`);
   *
   * // Continue pagination
   * let cursor = firstPage.result.next;
   * while (firstPage.result.totalEvents > 0) {
   *   const nextPage = await sdk.communications.getChatEvents(cursor);
   *   console.log(`Fetched ${nextPage.result.events.length} more events`);
   *
   *   if (nextPage.result.totalEvents === 0) break;
   *   cursor = nextPage.result.next;
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Filter events for specific chat
   * const eventsResponse = await sdk.communications.getChatEvents();
   * const chatID = '1:4019cd7d-cca8-4e90-8b11-f78afbea42e3';
   * const chatEvents = eventsResponse.result.events.filter(e => e.chatID === chatID);
   *
   * // Filter only customer messages
   * const customerMessages = eventsResponse.result.events.filter(e => e.sender === 'client');
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get}
   */
  async getChatEvents(next?: number): Promise<EventsResponse> {
    // Validate next parameter if provided
    if (next !== undefined) {
      if (typeof next !== 'number' || next <= 0) {
        throw new ValidationError(
          'Invalid next parameter: must be a positive number (Unix timestamp with milliseconds)',
          { next: `Invalid value: ${next}. Expected positive number (Unix timestamp with milliseconds).` }
        );
      }
    }

    const params = next ? { next } : {};

    return this.client.get<EventsResponse>(
      'https://buyer-chat-api.wildberries.ru/api/v1/seller/events',
      { params, rateLimitKey: 'communications.getChatEvents' }
    );
  }

  /**
   * Send message to customer chat
   *
   * Sends a text message and/or file attachments to a customer chat conversation.
   * Uses multipart/form-data format for file uploads.
   *
   * **Required Parameters**:
   * - `replySign`: Chat signature from `getChats()` or `getChatEvents()` (when isNewChat=true)
   * - At least one of: `message` (text) or `files` (attachments)
   *
   * **Message Constraints**:
   * - Text: Maximum 1000 characters
   * - Files: JPEG, PDF, PNG only
   * - File size: 5MB per file, 30MB total
   *
   * **Rate Limit**: 10 requests per 10 seconds
   *
   * @param replySign - Chat signature (required, max 255 characters)
   * @param message - Optional message text (max 1000 characters)
   * @param files - Optional file attachments (File[] or Blob[])
   * @returns Promise resolving to sent message confirmation with chatID and addTime
   *
   * @throws {ValidationError} When replySign is empty, too long, or message exceeds 1000 chars
   * @throws {ValidationError} When neither message nor files are provided
   * @throws {ValidationError} When file type is unsupported or size exceeds limits
   * @throws {AuthenticationError} When API key is invalid or missing
   * @throws {RateLimitError} When rate limit is exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Text-only message
   * const replySign = chat.replySign;
   * await sdk.communications.sendMessage(
   *   replySign,
   *   'Thank you for your message! We will help you shortly.'
   * );
   * ```
   *
   * @example
   * ```typescript
   * // Message with file attachments
   * const files = [
   *   new File([pdfBlob], 'receipt.pdf', { type: 'application/pdf' }),
   *   new File([imageBlob], 'photo.jpg', { type: 'image/jpeg' })
   * ];
   *
   * await sdk.communications.sendMessage(
   *   replySign,
   *   'Here are the requested documents.',
   *   files
   * );
   * ```
   *
   * @example
   * ```typescript
   * // Files only (no text)
   * await sdk.communications.sendMessage(replySign, undefined, files);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post}
   */
  async sendMessage(
    replySign: string,
    message?: string,
    files?: File[] | Blob[]
  ): Promise<MessageResponse> {
    // Validate replySign (required, max 255 characters)
    if (replySign.trim().length === 0) {
      throw new ValidationError(
        'replySign is required',
        { replySign: 'This field is required. Obtain from Chat.replySign or Event.replySign (when isNewChat=true).' }
      );
    }

    if (replySign.length > 255) {
      throw new ValidationError(
        'replySign exceeds maximum length',
        { replySign: `Maximum length is 255 characters. Received ${replySign.length} characters.` }
      );
    }

    // Validate message length if provided
    if (message !== undefined && message.length > 1000) {
      throw new ValidationError(
        'message exceeds maximum length',
        { message: `Maximum length is 1000 characters. Received ${message.length} characters.` }
      );
    }

    // Validate that at least one of message or files is provided
    if (!message && (!files || files.length === 0)) {
      throw new ValidationError(
        'At least one of message or files must be provided',
        {
          message: 'Either provide message text or file attachments.',
          files: 'Either provide message text or file attachments.',
        }
      );
    }

    // Build FormData for multipart/form-data request
    // Based on Context7 axios documentation for file uploads
    const formData = new FormData();
    formData.append('replySign', replySign);

    if (message) {
      formData.append('message', message);
    }

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('file', file);
      });
    }

    return this.client.post<MessageResponse>(
      'https://buyer-chat-api.wildberries.ru/api/v1/seller/message',
      formData,
      {
        rateLimitKey: 'communications.sendMessage',
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }

  /**
   * Poll for new chat events (message-based updates)
   *
   * Sets up periodic polling for new chat events using cursor-based pagination.
   * Automatically tracks the cursor across polling cycles and invokes the callback
   * with new events when they arrive.
   *
   * **Polling Pattern**:
   * - Uses cursor from previous response for subsequent requests
   * - Only invokes callback when `totalEvents > 0`
   * - Continues polling until `stop()` is called
   * - Handles errors gracefully (continues polling on transient errors)
   *
   * **Best Practices**:
   * - Minimum interval: 10 seconds (matches rate limit: 10 req/10s)
   * - Use `stop()` function for graceful shutdown
   * - Handle errors in callback to prevent polling interruption
   *
   * @param intervalMs - Polling interval in milliseconds (default: 10000ms, min recommended: 10000ms)
   * @param callback - Function called with new events (can be async)
   * @returns Object with `stop()` method to cancel polling
   *
   * @example
   * ```typescript
   * // Start polling for new events every 10 seconds
   * const polling = sdk.communications.pollForNewEvents(10000, async (events) => {
   *   console.log(`Received ${events.length} new events`);
   *
   *   // Process customer messages
   *   const customerMessages = events.filter(e => e.sender === 'client');
   *   for (const event of customerMessages) {
   *     console.log(`New message from ${event.clientName}: ${event.message?.text}`);
   *
   *     // Auto-respond (example)
   *     if (event.isNewChat && event.replySign) {
   *       await sdk.communications.sendMessage(
   *         event.replySign,
   *         'Thank you for contacting us! We will respond shortly.'
   *       );
   *     }
   *   }
   * });
   *
   * // Stop polling when done (e.g., on application shutdown)
   * process.on('SIGTERM', () => {
   *   polling.stop();
   * });
   * ```
   *
   * @see {@link getChatEvents} for manual event fetching
   */
  pollForNewEvents(
    intervalMs = 10000,
    callback: (events: ChatEvent[]) => void | Promise<void>
  ): { stop: () => void } {
    let cursor: number | undefined;

    const poll = async () => {
      try {
        const response = await this.getChatEvents(cursor);
        const { events, next, totalEvents } = response.result;

        // Update cursor for next iteration
        cursor = next;

        // Invoke callback with new events if any
        if (totalEvents > 0 && events.length > 0) {
          await callback(events);
        }
      } catch {
        // Silently continue polling on errors (graceful degradation)
        // Users can handle errors in their callback if needed
      }
    };

    // Start polling immediately, then at intervals
    void poll();
    const intervalId = setInterval(() => {
      void poll();
    }, intervalMs);

    return {
      stop: () => {
        clearInterval(intervalId);
      },
    };
  }

  // ============================================================================
  // Product Q&A Methods
  // ============================================================================

  /**
   * Get product questions with filtering
   *
   * Retrieves customer questions about products with support for filtering by
   * answered status, product ID, date range, and pagination.
   *
   * **Pagination Limits**:
   * - Maximum 10,000 questions per response
   * - `take + skip` must not exceed 10,000
   *
   * **Question States**:
   * - `suppliersPortalSynch` — New unanswered question
   * - `wbRu` — Answered question visible to customers
   * - `none` — Rejected question (not visible)
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param filters - Filter criteria (isAnswered, take, skip required; nmId, order, dateFrom, dateTo optional)
   * @returns Promise resolving to questions with counts and product details
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When required filters missing
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get unanswered questions sorted by newest first
   * const response = await sdk.communications.getQuestions({
   *   isAnswered: false,
   *   take: 20,
   *   skip: 0,
   *   order: 'dateDesc'
   * });
   *
   * console.log(`${response.data.countUnanswered} unanswered questions`);
   * for (const q of response.data.questions) {
   *   console.log(`Q: ${q.text}`);
   *   console.log(`Product: ${q.productDetails.productName} (nmId: ${q.productDetails.nmId})`);
   * }
   *
   * // Filter questions for specific product
   * const productQuestions = await sdk.communications.getQuestions({
   *   isAnswered: false,
   *   nmId: 12345,
   *   take: 10,
   *   skip: 0
   * });
   * ```
   */
  async getQuestions(filters: QuestionFilters): Promise<QuestionsResponse> {
    return this.client.get<QuestionsResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/questions',
      {
        params: filters as Record<string, unknown>,
        rateLimitKey: 'communications.getQuestions',
      }
    );
  }

  /**
   * Answer or reject product question
   *
   * Provides an answer to a customer question or rejects it. Answered questions
   * with state `wbRu` are visible to all customers on the product page.
   *
   * **Answer Editing**:
   * - Can edit answer once within 60 days of original response
   * - Check `question.answer.editable` field before attempting edit
   * - Use same method to edit (just call with updated text)
   *
   * **Question States**:
   * - `wbRu` — Answer visible to customers (use `reject: false` or omit)
   * - `none` — Question rejected, not visible (use `reject: true`)
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param questionId - Question ID from getQuestions()
   * @param answerText - Answer text to display to customer
   * @param reject - Optional: true to reject question (state='none'), false/undefined to answer (state='wbRu')
   * @returns Promise resolving to void (204 No Content)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {ValidationError} When questionId or answerText empty
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Answer a question
   * await sdk.communications.answerQuestion(
   *   'q123',
   *   'This product is made of 100% cotton and machine washable.'
   * );
   *
   * // Reject a question (not visible to customers)
   * await sdk.communications.answerQuestion(
   *   'q456',
   *   'Internal note: inappropriate question',
   *   true // reject = true sets state to 'none'
   * );
   *
   * // Edit an existing answer (within 60 days)
   * const questions = await sdk.communications.getQuestions({
   *   isAnswered: true,
   *   take: 10,
   *   skip: 0
   * });
   * const editableQuestion = questions.data.questions.find(q => q.answer?.editable);
   * if (editableQuestion) {
   *   await sdk.communications.answerQuestion(
   *     editableQuestion.id,
   *     'Updated answer with more details.'
   *   );
   * }
   * ```
   */
  async answerQuestion(
    questionId: string,
    answerText: string,
    reject?: boolean
  ): Promise<void> {
    if (!questionId || questionId.trim() === '') {
      throw new ValidationError('Question ID is required');
    }
    if (!answerText || answerText.trim() === '') {
      throw new ValidationError('Answer text is required');
    }

    const payload: AnswerQuestionRequest = {
      id: questionId,
      answer: { text: answerText },
      state: reject ? 'none' : 'wbRu',
    };

    await this.client.patch<unknown>(
      'https://feedbacks-api.wildberries.ru/api/v1/questions',
      payload,
      { rateLimitKey: 'communications.answerQuestion' }
    );
  }

  /**
   * Mark question as viewed without answering
   *
   * Marks a question as viewed for tracking purposes without providing an answer.
   * Useful for keeping track of which questions the seller has reviewed.
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param questionId - Question ID from getQuestions()
   * @returns Promise resolving to void
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {ValidationError} When questionId is empty
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Batch mark questions as viewed
   * const response = await sdk.communications.getQuestions({
   *   isAnswered: false,
   *   take: 20,
   *   skip: 0
   * });
   *
   * for (const question of response.data.questions) {
   *   if (!question.wasViewed) {
   *     await sdk.communications.markQuestionViewed(question.id);
   *     console.log(`Marked question ${question.id} as viewed`);
   *   }
   * }
   * ```
   */
  async markQuestionViewed(questionId: string): Promise<void> {
    if (!questionId || questionId.trim() === '') {
      throw new ValidationError('Question ID is required');
    }

    const payload: MarkQuestionViewedRequest = {
      id: questionId,
      wasViewed: true,
    };

    await this.client.patch<unknown>(
      'https://feedbacks-api.wildberries.ru/api/v1/questions',
      payload,
      { rateLimitKey: 'communications.markQuestionViewed' }
    );
  }

  // ============================================================================
  // Customer Reviews Methods
  // ============================================================================

  /**
   * Get product reviews with filtering
   *
   * Retrieves customer reviews with ratings, photos, videos, and product details.
   * Supports filtering by answered status, product ID, date range, and pagination.
   *
   * **Pagination Limits**:
   * - Maximum 5,000 reviews per response (`take` max: 5000)
   * - Maximum skip offset: 199,990
   *
   * **Review Structure**:
   * - Rating: 1-5 stars (`productValuation`)
   * - Content: text, pros, cons
   * - Media: photos (fullSize, miniSize URLs), video (HLS playlist)
   * - Customer info: userName, matchingSize, bables (tags)
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param filters - Filter criteria (isAnswered, take, skip required; nmId, order, dateFrom, dateTo optional)
   * @returns Promise resolving to reviews with photos, videos, and ratings
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When required filters missing
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get unanswered reviews with newest first
   * const response = await sdk.communications.getReviews({
   *   isAnswered: false,
   *   take: 20,
   *   skip: 0,
   *   order: 'dateDesc'
   * });
   *
   * console.log(`${response.data.countUnanswered} unanswered reviews`);
   * for (const review of response.data.feedbacks) {
   *   console.log(`Rating: ${review.productValuation}/5 stars`);
   *   console.log(`Review: ${review.text}`);
   *   console.log(`Pros: ${review.pros}, Cons: ${review.cons}`);
   *
   *   // Check for photos
   *   if (review.photoLinks && review.photoLinks.length > 0) {
   *     console.log(`Photos: ${review.photoLinks.length}`);
   *     review.photoLinks.forEach(photo => {
   *       console.log(`  - ${photo.fullSize}`);
   *     });
   *   }
   *
   *   // Check for video
   *   if (review.video) {
   *     console.log(`Video: ${review.video.durationSec}s - ${review.video.link}`);
   *   }
   * }
   *
   * // Filter reviews for specific product
   * const productReviews = await sdk.communications.getReviews({
   *   isAnswered: false,
   *   nmId: 12345,
   *   take: 10,
   *   skip: 0
   * });
   * ```
   */
  async getReviews(filters: ReviewFilters): Promise<ReviewsResponse> {
    return this.client.get<ReviewsResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/feedbacks',
      {
        params: filters as Record<string, unknown>,
        rateLimitKey: 'communications.getReviews',
      }
    );
  }

  /**
   * Respond to customer review
   *
   * Provides a professional response to a customer review. Responses are visible
   * to all customers viewing the product page.
   *
   * **Response Constraints**:
   * - Minimum length: 2 characters
   * - Maximum length: 5,000 characters
   * - Professional tone recommended
   *
   * **Response Editing**:
   * - Can edit response once within 60 days
   * - Check `review.answer.editable` field before attempting edit
   * - Use `editReviewResponse()` method to edit existing response
   *
   * **Note**: Review ID is not validated by API - invalid IDs won't throw errors
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param reviewId - Review ID from getReviews()
   * @param responseText - Response text (min 2, max 5000 characters)
   * @returns Promise resolving to void (204 No Content)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {ValidationError} When reviewId empty or responseText length invalid
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Professional response to positive review
   * await sdk.communications.respondToReview(
   *   'rev123',
   *   'Thank you for your wonderful feedback! We're delighted that you enjoyed our product. We appreciate your business and hope to serve you again soon.'
   * );
   *
   * // Constructive response to negative review
   * await sdk.communications.respondToReview(
   *   'rev456',
   *   'We sincerely apologize for your experience. Customer satisfaction is our priority. Please contact us directly at support@example.com so we can make this right.'
   * );
   *
   * // Response to review with specific feedback
   * const reviews = await sdk.communications.getReviews({
   *   isAnswered: false,
   *   take: 10,
   *   skip: 0
   * });
   * for (const review of reviews.data.feedbacks) {
   *   if (review.productValuation === 5) {
   *     await sdk.communications.respondToReview(
   *       review.id,
   *       `Thank you ${review.userName}! We're thrilled you love the ${review.productDetails.productName}!`
   *     );
   *   }
   * }
   * ```
   */
  async respondToReview(reviewId: string, responseText: string): Promise<void> {
    if (!reviewId || reviewId.trim() === '') {
      throw new ValidationError('Review ID is required');
    }
    if (!responseText || responseText.trim() === '') {
      throw new ValidationError('Response text is required');
    }
    if (responseText.length < 2) {
      throw new ValidationError(
        'Response text must be at least 2 characters long'
      );
    }
    if (responseText.length > 5000) {
      throw new ValidationError(
        'Response text must not exceed 5000 characters'
      );
    }

    const payload: RespondToReviewRequest = {
      id: reviewId,
      text: responseText,
    };

    await this.client.post<unknown>(
      'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer',
      payload,
      { rateLimitKey: 'communications.respondToReview' }
    );
  }

  /**
   * Edit existing response to review
   *
   * Edits a previously submitted response to a customer review.
   *
   * **Edit Limitations**:
   * - Can only edit once within 60 days of original response
   * - Check `review.answer.editable` field before attempting
   * - Same validation as respondToReview (2-5000 characters)
   *
   * **Note**: Review ID is not validated by API - invalid IDs won't throw errors
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param reviewId - Review ID from getReviews()
   * @param newResponseText - New response text (min 2, max 5000 characters)
   * @returns Promise resolving to void (204 No Content)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {ValidationError} When reviewId empty or newResponseText length invalid
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Check if response is editable before editing
   * const reviews = await sdk.communications.getReviews({
   *   isAnswered: true,
   *   take: 10,
   *   skip: 0
   * });
   *
   * for (const review of reviews.data.feedbacks) {
   *   if (review.answer && review.answer.editable) {
   *     await sdk.communications.editReviewResponse(
   *       review.id,
   *       'Updated response with additional information and improved tone.'
   *     );
   *     console.log(`Edited response for review ${review.id}`);
   *   }
   * }
   *
   * // Edit specific review response
   * await sdk.communications.editReviewResponse(
   *   'rev789',
   *   'Thank you for your feedback! We have updated our product based on your suggestions.'
   * );
   * ```
   */
  async editReviewResponse(
    reviewId: string,
    newResponseText: string
  ): Promise<void> {
    if (!reviewId || reviewId.trim() === '') {
      throw new ValidationError('Review ID is required');
    }
    if (!newResponseText || newResponseText.trim() === '') {
      throw new ValidationError('Response text is required');
    }
    if (newResponseText.length < 2) {
      throw new ValidationError(
        'Response text must be at least 2 characters long'
      );
    }
    if (newResponseText.length > 5000) {
      throw new ValidationError(
        'Response text must not exceed 5000 characters'
      );
    }

    const payload: RespondToReviewRequest = {
      id: reviewId,
      text: newResponseText,
    };

    await this.client.patch<unknown>(
      'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer',
      payload,
      { rateLimitKey: 'communications.editReviewResponse' }
    );
  }

  // ============================================================================
  // Chat Helper Methods
  // ============================================================================

  /**
   * Extract replySign from Chat object
   *
   * Helper method to get the replySign needed for sending messages.
   *
   * @param chat - Chat object from getChats()
   * @returns Reply signature string
   *
   * @example
   * ```typescript
   * const chats = (await sdk.communications.getChats()).result;
   * const replySign = sdk.communications.getReplySignFromChat(chats[0]);
   * await sdk.communications.sendMessage(replySign, 'Hello!');
   * ```
   */
  getReplySignFromChat(chat: Chat): string {
    return chat.replySign;
  }

  /**
   * Extract replySign from ChatEvent (only for new chats)
   *
   * Helper method to get the replySign from an event when it's a new chat.
   * Returns null if the event is not a new chat.
   *
   * @param event - ChatEvent from getChatEvents()
   * @returns Reply signature string or null if not a new chat
   *
   * @example
   * ```typescript
   * const events = (await sdk.communications.getChatEvents()).result.events;
   * for (const event of events) {
   *   const replySign = sdk.communications.getReplySignFromEvent(event);
   *   if (replySign) {
   *     console.log('New chat detected, replySign:', replySign);
   *   }
   * }
   * ```
   */
  getReplySignFromEvent(event: ChatEvent): string | null {
    return event.isNewChat ? event.replySign ?? null : null;
  }

  /**
   * Filter events by specific chat ID
   *
   * Helper method to filter events for a specific chat conversation.
   *
   * @param events - Array of chat events
   * @param chatID - Chat ID to filter by
   * @returns Filtered array of events for the specified chat
   *
   * @example
   * ```typescript
   * const allEvents = (await sdk.communications.getChatEvents()).result.events;
   * const chatEvents = sdk.communications.filterEventsByChatID(
   *   allEvents,
   *   '1:4019cd7d-cca8-4e90-8b11-f78afbea42e3'
   * );
   * console.log(`Chat has ${chatEvents.length} events`);
   * ```
   */
  filterEventsByChatID(events: ChatEvent[], chatID: string): ChatEvent[] {
    return events.filter((e) => e.chatID === chatID);
  }

  /**
   * Filter events to get only client messages
   *
   * Helper method to filter events to show only messages from customers.
   *
   * @param events - Array of chat events
   * @returns Filtered array containing only client messages
   *
   * @example
   * ```typescript
   * const allEvents = (await sdk.communications.getChatEvents()).result.events;
   * const customerMessages = sdk.communications.getClientMessages(allEvents);
   *
   * // Process only customer messages
   * for (const message of customerMessages) {
   *   console.log(`Customer ${message.clientName}: ${message.message?.text}`);
   * }
   * ```
   */
  getClientMessages(events: ChatEvent[]): ChatEvent[] {
    return events.filter((e) => e.sender === 'client');
  }
}
