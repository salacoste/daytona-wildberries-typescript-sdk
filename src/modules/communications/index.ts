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
  NewFeedbacksQuestionsResponse,
  EnhancedFeedbackFilters,
  EnhancedFeedbacksResponse,
  FeedbackDetailsResponse,
  QuestionsCountUnansweredResponse,
  QuestionByIdResponse,
  TemplateData,
  TemplateFilters,
  TemplatesResponse,
  TemplateOperationResponse,
  TemplateStatsResponse,
  TemplateVariable,
  ReturnStatus,
  ReturnRequestFilters,
  ReturnRequestsResponse,
  ReturnProcessOptions,
  ReturnProcessResponse,
  ReturnAnalyticsFilters,
  ReturnAnalyticsResponse,
  ChatDetails,
  ChatHistory,
  ChatHistoryFilters,
  // Task 8.5 - New Communications API types
  FeedbacksCountUnansweredResponse,
  FeedbacksCountParams,
  FeedbacksCountResponse,
  SupplierValuationsResponse,
  FeedbackActionRequest,
  ArchivedFeedbacksFilters,
  ArchivedFeedbacksResponse,
  ClaimsFilters,
  ClaimsResponse,
  RespondToClaimRequest,
  ReturnByFeedbackRequest,
  ReturnByFeedbackResponse,
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
  // Questions Monitoring Methods (Task 7.4.1)
  // ============================================================================

  /**
   * Check for new unviewed feedbacks and questions
   *
   * Essential method for SLA compliance and customer service monitoring.
   * Returns indicators for new unviewed customer interactions that require attention.
   *
   * **Use Cases:**
   * - Dashboard notifications for customer service teams
   * - Automated alerting for high-priority interactions
   * - SLA monitoring and compliance tracking
   * - Real-time customer service workload management
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @returns Promise resolving to new feedbacks and questions indicators
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Check for new customer interactions
   * const result = await sdk.communications.getNewFeedbacksQuestions();
   *
   * if (result.hasNewQuestions) {
   *   console.log(`You have ${result.newQuestionsCount} new questions`);
   *   // Trigger alert or update UI
   * }
   *
   * if (result.hasNewFeedbacks) {
   *   console.log(`You have ${result.newFeedbacksCount} new reviews`);
   *   // Update review queue
   * }
   *
   * // Use for dashboard notifications
   * const requiresAttention = result.hasNewQuestions || result.hasNewFeedbacks;
   * setNotificationBadge(requiresAttention);
   * ```
   *
   * @example
   * ```typescript
   * // Periodic monitoring for SLA compliance
   * setInterval(async () => {
   *   const check = await sdk.communications.getNewFeedbacksQuestions();
   *   if (check.hasNewQuestions) {
   *     await notifySupportTeam(check.newQuestionsCount);
   *   }
   * }, 60000); // Check every minute
   * ```
   */
  async getNewFeedbacksQuestions(): Promise<NewFeedbacksQuestionsResponse> {
    return this.client.get<NewFeedbacksQuestionsResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/new-feedbacks-questions',
      { rateLimitKey: 'communications.getNewFeedbacksQuestions' }
    );
  }

  /**
   * Get dashboard metrics for unanswered questions
   *
   * Returns comprehensive metrics for unanswered questions including daily counts,
   * category breakdown, and performance indicators. Essential for customer service
   * team management and performance tracking.
   *
   * **Dashboard Metrics:**
   * - Total unanswered questions count
   * - Today's unanswered questions (SLA tracking)
   * - Weekly and monthly trends
   * - Breakdown by product categories
   * - Average response time performance
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @returns Promise resolving to unanswered questions dashboard metrics
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get customer service dashboard metrics
   * const metrics = await sdk.communications.getQuestionsCountUnanswered();
   *
   * console.log(`Total unanswered: ${metrics.countUnanswered}`);
   * console.log(`New today: ${metrics.countUnansweredToday}`);
   * console.log(`Average response time: ${metrics.averageResponseTimeHours}h`);
   *
   * // Display category breakdown
   * if (metrics.byCategories) {
   *   metrics.byCategories.forEach(category => {
   *     console.log(`${category.categoryName}: ${category.count} questions`);
   *   });
   * }
   *
   * // SLA compliance check
   * const slaCompliant = metrics.averageResponseTimeHours <= 2;
   * updateSlaIndicator(slaCompliant);
   * ```
   *
   * @example
   * ```typescript
   * // Team workload management
   * const workload = await sdk.communications.getQuestionsCountUnanswered();
   * const teamCapacity = 50; // questions per team member per day
   * const requiredStaff = Math.ceil(workload.countUnansweredToday / teamCapacity);
   *
   * if (requiredStaff > currentStaff) {
   *   alertManagement(`Need ${requiredStaff - currentStaff} more staff today`);
   * }
   * ```
   */
  async getQuestionsCountUnanswered(): Promise<QuestionsCountUnansweredResponse> {
    return this.client.get<QuestionsCountUnansweredResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/questions/count-unanswered',
      { rateLimitKey: 'communications.getQuestionsCountUnanswered' }
    );
  }

  /**
   * Get detailed information about a specific question
   *
   * Retrieves comprehensive question details including priority assessment,
   * customer history, product performance data, and suggested responses.
   * Essential for personalized customer service and efficient question handling.
   *
   * **Enhanced Features:**
   * - Priority assessment (urgent/high/medium/low)
   * - Customer purchase history and VIP status
   * - Product sales performance data
   * - Suggested response templates
   * - Related questions and context
   * - Sentiment analysis
   * - Recommended response time
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param questionId - Question ID from getQuestions()
   * @returns Promise resolving to detailed question information with metadata
   *
   * @throws {ValidationError} When questionId is empty
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get detailed question information
   * const questionDetail = await sdk.communications.getQuestionById('q123');
   * const question = questionDetail.data;
   *
   * console.log(`Priority: ${question.priority}`);
   * console.log(`Age: ${question.hoursSinceCreation} hours`);
   * console.log(`Urgent: ${question.requiresUrgentAttention}`);
   *
   * // Check customer VIP status
   * if (question.customerHistory?.isVipCustomer) {
   *   console.log('VIP customer - prioritize response');
   * }
   *
   * // Review suggested templates
   * if (question.suggestedTemplates && question.suggestedTemplates.length > 0) {
   *   const bestTemplate = question.suggestedTemplates[0];
   *   console.log(`Suggested: ${bestTemplate.templateName}`);
   *   console.log(`Match: ${bestTemplate.matchScore}%`);
   *   console.log(`Preview: ${bestTemplate.preview}`);
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Automated question triage
   * const question = await sdk.communications.getQuestionById(questionId);
   *
   * if (question.data.requiresUrgentAttention) {
   *   // Notify support team immediately
   *   await notifyUrgentQuestion(question.data);
   * } else if (question.data.priority === 'high') {
   *   // Add to priority queue
   *   addToPriorityQueue(question.data);
   * } else {
   *   // Add to regular queue
   *   addToRegularQueue(question.data);
   * }
   *
   * // Check sentiment for negative reviews
   * if (question.data.sentiment?.sentiment === 'negative') {
   *   await escalateToManager(question.data);
   * }
   * ```
   */
  async getQuestionById(questionId: string): Promise<QuestionByIdResponse> {
    if (!questionId || questionId.trim() === '') {
      throw new ValidationError('Question ID is required');
    }

    return this.client.get<QuestionByIdResponse>(
      `https://feedbacks-api.wildberries.ru/api/v1/questions/${questionId}/details`,
      { rateLimitKey: 'communications.getQuestionById' }
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
  // Response Template System (Task 7.4.2)
  // ============================================================================

  /**
   * Get response templates with filtering and pagination
   *
   * Retrieves response templates for customer service efficiency. Templates support
   * dynamic variable insertion, performance tracking, and categorization for organized
   * customer communication workflows.
   *
   * **Template Features:**
   * - Dynamic content with variable placeholders ({{variable_name}})
   * - Performance tracking (usage, satisfaction, effectiveness scores)
   * - Categorization and tagging for organization
   * - Multi-language support
   * - Usage guidelines and examples
   * - A/B testing capabilities
   *
   * **Template Categories:**
   * - `general` - General responses for common questions
   * - `product_info` - Product-specific information responses
   * - `shipping` - Shipping and delivery related responses
   * - `returns` - Returns and refund related responses
   * - `technical` - Technical support responses
   * - `billing` - Payment and billing related responses
   * - `complaints` - Customer complaint handling responses
   * - `feedback` - Feedback and review responses
   * - `promotions` - Promotional and sales responses
   * - `custom` - Custom user-defined categories
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param filters - Filter criteria for template retrieval (optional)
   * @returns Promise resolving to templates with pagination and metadata
   *
   * @throws {ValidationError} When filter parameters are invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get all active templates
   * const allTemplates = await sdk.communications.getTemplates({
   *   isActive: true,
   *   sortBy: 'name',
   *   sortOrder: 'asc'
   * });
   * console.log(`Found ${allTemplates.total} templates`);
   *
   * // Search templates by keyword
   * const searchResults = await sdk.communications.getTemplates({
   *   search: 'shipping delay',
   *   limit: 10
   * });
   *
   * // Filter by category
   * const shippingTemplates = await sdk.communications.getTemplates({
   *   category: 'shipping',
   *   language: 'ru'
   * });
   *
   * // Get high-priority templates
   * const priorityTemplates = await sdk.communications.getTemplates({
   *   minPriority: 8,
   *   sortBy: 'effectiveness',
   *   sortOrder: 'desc'
   * });
   * ```
   *
   * @example
   * ```typescript
   * // Paginated template retrieval
   * let offset = 0;
   const pageSize = 50;
   const allTemplates = [];
   *
   * do {
   *   const response = await sdk.communications.getTemplates({
   *     limit: pageSize,
   *     offset: offset,
   *     isActive: true
   *   });
   *
   *   allTemplates.push(...response.templates);
   *   offset = response.nextOffset || 0;
   *
   * } while (response.hasMore);
   *
   * console.log(`Retrieved ${allTemplates.length} active templates`);
   * ```
   */
  async getTemplates(filters?: TemplateFilters): Promise<TemplatesResponse> {
    const params = filters ?? {};

    // Validate filter parameters
    if (params.limit !== undefined && (params.limit < 1 || params.limit > 1000)) {
      throw new ValidationError(
        'Invalid limit parameter: must be between 1 and 1000',
        { limit: `Invalid value: ${params.limit}. Expected: 1-1000` }
      );
    }

    if (params.offset !== undefined && params.offset < 0) {
      throw new ValidationError(
        'Invalid offset parameter: must be non-negative',
        { offset: `Invalid value: ${params.offset}. Expected: >= 0` }
      );
    }

    if (params.minPriority !== undefined && (params.minPriority < 1 || params.minPriority > 10)) {
      throw new ValidationError(
        'Invalid minPriority parameter: must be between 1 and 10',
        { minPriority: `Invalid value: ${params.minPriority}. Expected: 1-10` }
      );
    }

    if (params.maxPriority !== undefined && (params.maxPriority < 1 || params.maxPriority > 10)) {
      throw new ValidationError(
        'Invalid maxPriority parameter: must be between 1 and 10',
        { maxPriority: `Invalid value: ${params.maxPriority}. Expected: 1-10` }
      );
    }

    // Validate min/max priority combination
    if (params.minPriority !== undefined && params.maxPriority !== undefined &&
        params.minPriority > params.maxPriority) {
      throw new ValidationError(
        'Invalid priority range: minPriority cannot be greater than maxPriority',
        {
          minPriority: String(params.minPriority),
          maxPriority: String(params.maxPriority),
          error: 'minPriority > maxPriority'
        }
      );
    }

    // Prepare valid params for API call
    const validParams: Record<string, unknown> = {};
    if (filters) {
      if (filters.category !== undefined) validParams.category = filters.category;
      if (filters.language !== undefined) validParams.language = filters.language;
      if (filters.isActive !== undefined) validParams.isActive = filters.isActive;
      if (filters.search !== undefined) validParams.search = filters.search;
      if (filters.tags !== undefined) validParams.tags = filters.tags;
      if (filters.createdBy !== undefined) validParams.createdBy = filters.createdBy;
      if (filters.minPriority !== undefined) validParams.minPriority = filters.minPriority;
      if (filters.maxPriority !== undefined) validParams.maxPriority = filters.maxPriority;
      if (filters.sortBy !== undefined) validParams.sortBy = filters.sortBy;
      if (filters.sortOrder !== undefined) validParams.sortOrder = filters.sortOrder;
      if (filters.limit !== undefined) validParams.limit = filters.limit;
      if (filters.offset !== undefined) validParams.offset = filters.offset;
      if (filters.createdFrom !== undefined) validParams.createdFrom = filters.createdFrom;
      if (filters.createdTo !== undefined) validParams.createdTo = filters.createdTo;
      if (filters.minUsageCount !== undefined) validParams.minUsageCount = filters.minUsageCount;
    }

    return this.client.get<TemplatesResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/templates',
      {
        params: validParams,
        rateLimitKey: 'communications.getTemplates'
      }
    );
  }

  /**
   * Create a new response template
   *
   * Creates a new response template with dynamic variables, categorization,
   * and performance tracking capabilities. Templates are essential for efficient
   * and consistent customer communication.
   *
   * **Template Variables:**
   * - Use `{{variable_name}}` syntax in template content
   * - Define variables with validation rules and types
   * - Support for text, number, date, boolean, select, and multiline types
   * - Required/optional fields with default values
   *
   * **Template Content Guidelines:**
   * - Keep templates concise and professional
   * - Use clear, customer-friendly language
   * - Include placeholders for personalization
   * - Follow brand voice and tone guidelines
   *
   * **Rate Limit**: 1 request per second (burst: 3)
   *
   * @param templateData - Template data including name, content, category, and variables
   * @returns Promise resolving to created template with metadata
   *
   * @throws {ValidationError} When template data is invalid or missing required fields
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Create a simple template
   * const simpleTemplate = await sdk.communications.createTemplate({
   *   name: 'Shipping Delay Response',
   *   content: 'Уважаемый клиент, ваш заказ {{order_number}} задерживается. Ожидаемая доставка: {{delivery_date}}. Приносим извинения за неудобства.',
   *   category: 'shipping',
   *   description: 'Response for shipping delays',
   *   keywords: ['shipping', 'delay', 'delivery'],
   *   language: 'ru',
   *   variables: [
   *     {
   *       name: 'order_number',
   *       displayName: 'Order Number',
   *       type: 'text',
   *       required: true,
   *       description: 'Customer order number'
   *     },
   *     {
   *       name: 'delivery_date',
   *       displayName: 'Delivery Date',
   *       type: 'date',
   *       required: true,
   *       description: 'Expected delivery date'
   *     }
   *   ]
   * });
   *
   * console.log(`Created template: ${simpleTemplate.template?.id}`);
   * ```
   *
   * @example
   * ```typescript
   * // Create an advanced template with select options
   * const advancedTemplate = await sdk.communications.createTemplate({
   *   name: 'Product Information Request',
   *   content: 'Спасибо за интерес к нашему продукту {{product_name}}! {{greeting}}\n\nИнформация:\n{{product_info}}\n\n{{additional_info}}',
   *   category: 'product_info',
   *   description: 'Comprehensive product information response',
   *   keywords: ['product', 'information', 'details'],
   *   language: 'ru',
   *   priority: 8,
   *   tags: ['popular', 'product'],
   *   usageGuidelines: 'Use this template for general product inquiries. Personalize with customer name when possible.',
   *   examples: [
   *     'Спасибо за интерес к нашему продукту "Кружка керамическая"! Уважаемый клиент...',
   *     'Спасибо за интерес к нашему продукту "Футболка хлопковая"! Добрый день...'
   *   ],
   *   variables: [
   *     {
   *       name: 'product_name',
   *       displayName: 'Product Name',
   *       type: 'text',
   *       required: true,
   *       maxLength: 100,
   *       description: 'Name of the product the customer is asking about'
   *     },
   *     {
   *       name: 'greeting',
   *       displayName: 'Greeting',
   *       type: 'select',
   *       required: false,
   *       defaultValue: 'Уважаемый клиент',
   *       options: ['Уважаемый клиент', 'Добрый день', 'Здравствуйте'],
   *       description: 'Choose appropriate greeting based on time of day'
   *     },
   *     {
   *       name: 'product_info',
   *       displayName: 'Product Information',
   *       type: 'multiline',
   *       required: true,
   *       maxLength: 500,
   *       description: 'Detailed information about the product'
     *   },
   *     {
   *       name: 'additional_info',
   *       displayName: 'Additional Information',
   *       type: 'text',
   *       required: false,
   *       maxLength: 200,
   *       description: 'Any additional helpful information'
   *     }
   *   ]
   * });
   * ```
   */
  async createTemplate(templateData: TemplateData): Promise<TemplateOperationResponse> {
    // Validate required fields
    if (!templateData.name || templateData.name.trim() === '') {
      throw new ValidationError(
        'Template name is required',
        { name: 'This field is required and cannot be empty' }
      );
    }

    if (!templateData.content || templateData.content.trim() === '') {
      throw new ValidationError(
        'Template content is required',
        { content: 'This field is required and cannot be empty' }
      );
    }

    // Category is required by type, validate it's not empty
    if (templateData.category.trim().length === 0) {
      throw new ValidationError(
        'Template category is required',
        { category: 'This field is required. Choose from: general, product_info, shipping, returns, technical, billing, complaints, feedback, promotions, custom' }
      );
    }

    // Validate template name length
    if (templateData.name.length > 200) {
      throw new ValidationError(
        'Template name too long',
        { name: `Maximum length is 200 characters. Received ${templateData.name.length} characters` }
      );
    }

    // Validate template content length
    if (templateData.content.length > 2000) {
      throw new ValidationError(
        'Template content too long',
        { content: `Maximum length is 2000 characters. Received ${templateData.content.length} characters` }
      );
    }

    // Validate priority if provided
    if (templateData.priority !== undefined &&
        (templateData.priority < 1 || templateData.priority > 10)) {
      throw new ValidationError(
        'Invalid template priority',
        { priority: `Priority must be between 1 and 10. Received ${templateData.priority}` }
      );
    }

    // Validate language if provided
    if (templateData.language && !/^[a-z]{2}(-[A-Z]{2})?$/.test(templateData.language)) {
      throw new ValidationError(
        'Invalid language format',
        { language: `Language must be in format "en" or "en-US". Received "${templateData.language}"` }
      );
    }

    // Validate variables if provided
    if (templateData.variables) {
      this.validateTemplateVariables(templateData.variables);
    }

    return this.client.post<TemplateOperationResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/templates',
      templateData,
      { rateLimitKey: 'communications.createTemplate' }
    );
  }

  /**
   * Update an existing response template
   *
   * Updates an existing template with new content, variables, or metadata.
   * Performance metrics and usage history are preserved.
   *
   * **Update Considerations:**
   * - Content changes affect future template usage
   * - Variable changes require updating template content
   * - Category changes affect template organization
   * - Priority changes affect suggestion algorithms
   *
   * **Rate Limit**: 1 request per second (burst: 3)
   *
   * @param templateId - ID of template to update
   * @param templateData - Updated template data (only fields to update)
   * @returns Promise resolving to updated template with metadata
   *
   * @throws {ValidationError} When templateId is empty or template data is invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Update template content
   * const updated = await sdk.communications.updateTemplate('tpl_123', {
   *   content: 'Updated template content with {{new_variable}} placeholder',
   *   variables: [
   *     {
   *       name: 'new_variable',
   *       displayName: 'New Variable',
   *       type: 'text',
   *       required: true,
   *       description: 'Description of the new variable'
   *     }
   *   ]
   * });
   *
   * // Update template metadata only
   * const metadataUpdate = await sdk.communications.updateTemplate('tpl_123', {
   *   name: 'Updated Template Name',
   *   priority: 9,
   *   tags: ['updated', 'priority'],
   *   isActive: true
   * });
   *
   * // Change template category
   * const categoryChange = await sdk.communications.updateTemplate('tpl_123', {
   *   category: 'product_info',
   *   keywords: ['product', 'information', 'updated']
   * });
   * ```
   */
  async updateTemplate(templateId: string, templateData: TemplateData): Promise<TemplateOperationResponse> {
    if (!templateId || templateId.trim() === '') {
      throw new ValidationError(
        'Template ID is required',
        { templateId: 'This field is required and cannot be empty' }
      );
    }

    // Validate template data (same rules as create)
    if (templateData.name.trim().length === 0) {
      throw new ValidationError(
        'Template name cannot be empty',
        { name: 'This field cannot be empty' }
      );
    }
    if (templateData.name.length > 200) {
      throw new ValidationError(
        'Template name too long',
        { name: `Maximum length is 200 characters. Received ${templateData.name.length} characters` }
      );
    }

    if (templateData.content.trim().length === 0) {
      throw new ValidationError(
        'Template content cannot be empty',
        { content: 'This field cannot be empty' }
      );
    }
    if (templateData.content.length > 2000) {
      throw new ValidationError(
        'Template content too long',
        { content: `Maximum length is 2000 characters. Received ${templateData.content.length} characters` }
      );
    }

    if (templateData.priority !== undefined &&
        (templateData.priority < 1 || templateData.priority > 10)) {
      throw new ValidationError(
        'Invalid template priority',
        { priority: `Priority must be between 1 and 10. Received ${templateData.priority}` }
      );
    }

    if (templateData.language !== undefined &&
        templateData.language && !/^[a-z]{2}(-[A-Z]{2})?$/.test(templateData.language)) {
      throw new ValidationError(
        'Invalid language format',
        { language: `Language must be in format "en" or "en-US". Received "${templateData.language}"` }
      );
    }

    // Validate variables if provided
    if (templateData.variables) {
      this.validateTemplateVariables(templateData.variables);
    }

    return this.client.patch<TemplateOperationResponse>(
      `https://feedbacks-api.wildberries.ru/api/v1/templates/${templateId}`,
      templateData,
      { rateLimitKey: 'communications.updateTemplate' }
    );
  }

  /**
   * Delete a response template
   *
   * Permanently deletes a template and its usage history. This action cannot be undone.
   * Consider deactivating templates instead of deleting if you might need them later.
   *
   * **Deletion Considerations:**
   * - Template cannot be recovered after deletion
   * - Usage history and metrics are lost
   * - Any references to this template will become invalid
   * - Consider archiving/deactivating instead of deleting
   *
   * **Rate Limit**: 1 request per second (burst: 3)
   *
   * @param templateId - ID of template to delete
   * @returns Promise resolving to deletion confirmation
   *
   * @throws {ValidationError} When templateId is empty
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Delete a template
   * const deletion = await sdk.communications.deleteTemplate('tpl_123');
   *
   * if (deletion.success) {
   *   console.log('Template deleted successfully');
   *   console.log(`Template ID: ${deletion.template?.id}`);
   * }
   *
   * // Handle deletion errors
   * if (deletion.error) {
   *   console.error('Deletion failed:', deletion.errorText);
   *   if (deletion.validationErrors) {
   *     deletion.validationErrors.forEach(err => {
   *       console.error(`${err.field}: ${err.message}`);
   *     });
   *   }
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Safe deletion with confirmation
   * async function safeDeleteTemplate(templateId: string) {
   *   try {
   *     // First get template details for confirmation
   *     const templates = await sdk.communications.getTemplates();
   *     const template = templates.templates.find(t => t.id === templateId);
   *
   *     if (!template) {
   *       throw new Error('Template not found');
   *     }
   *
   *     // Check if it's a system template (shouldn't be deleted)
   *     if (template.isSystemTemplate) {
   *       throw new Error('Cannot delete system templates');
   *     }
   *
   *     // Check usage statistics before deletion
   *     if (template.metrics.usage.totalUses > 100) {
   *       console.warn('Template has been used frequently. Consider deactivating instead.');
   *     }
   *
   *     // Proceed with deletion
   *     const deletion = await sdk.communications.deleteTemplate(templateId);
   *     console.log(`Template "${template.name}" deleted successfully`);
   *
   *     return deletion;
   *   } catch (error) {
   *     console.error('Safe deletion failed:', error.message);
   *     throw error;
   *   }
   * }
   * ```
   */
  async deleteTemplate(templateId: string): Promise<TemplateOperationResponse> {
    if (!templateId || templateId.trim() === '') {
      throw new ValidationError(
        'Template ID is required',
        { templateId: 'This field is required and cannot be empty' }
      );
    }

    return this.client.delete<TemplateOperationResponse>(
      `https://feedbacks-api.wildberries.ru/api/v1/templates/${templateId}`,
      { rateLimitKey: 'communications.deleteTemplate' }
    );
  }

  /**
   * Get template statistics and performance metrics
   *
   * Returns comprehensive statistics about template usage, performance,
   * and effectiveness metrics. Essential for template optimization and
   * customer service quality monitoring.
   *
   * **Statistics Include:**
   * - Total and active template counts
   * - Usage statistics by category
   * - Most effective and most used templates
   * - Templates requiring improvement
   * - Usage trends over time
   * - Performance benchmarks
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @returns Promise resolving to comprehensive template statistics
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get template statistics
   * const stats = await sdk.communications.getTemplateStats();
   * const data = stats.data;
   *
   * console.log(`Total templates: ${data.totalTemplates}`);
   * console.log(`Active templates: ${data.activeTemplates}`);
   *
   * // Analyze category performance
   * data.byCategory.forEach(category => {
   *   console.log(`${category.category}: ${category.count} templates, ${category.usage} uses`);
   * });
   *
   * // Show top performing templates
   * data.bestPerforming.forEach(template => {
   *   console.log(`${template.name}: ${template.satisfaction}/5 satisfaction, ${template.usage} uses`);
   * });
   *
   * // Identify templates needing improvement
   * data.needsImprovement.forEach(template => {
   *   console.log(`${template.name}: Effectiveness ${template.effectiveness}/100`);
   *   console.log(`Issues: ${template.issues.join(', ')}`);
   * });
   * ```
   *
   * @example
   * ```typescript
   * // Generate template performance report
   * function generateTemplateReport() {
   *   return sdk.communications.getTemplateStats().then(stats => {
   *     const data = stats.data;
   *
   *     const report = {
   *       summary: {
   *         totalTemplates: data.totalTemplates,
   *         activeTemplates: data.activeTemplates,
   *         activationRate: (data.activeTemplates / data.totalTemplates * 100).toFixed(1) + '%'
   *       },
   *       topCategories: data.byCategory
   *         .sort((a, b) => b.usage - a.usage)
   *         .slice(0, 5),
   *       mostUsed: data.mostUsed.slice(0, 10),
   *       improvementNeeded: data.needsImprovement,
   *       trends: data.usageTrends
   *     };
   *
   *     return report;
   *   });
   * }
   *
   * generateTemplateReport().then(report => {
   *   console.log('Template Performance Report:');
   *   console.log(JSON.stringify(report, null, 2));
   * });
   * ```
   */
  async getTemplateStats(): Promise<TemplateStatsResponse> {
    return this.client.get<TemplateStatsResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/templates/stats',
      { rateLimitKey: 'communications.getTemplateStats' }
    );
  }

  /**
   * Validate template variables array
   *
   * Internal helper method to validate template variable definitions.
   *
   * @param variables - Array of template variables to validate
   * @private
   */
  private validateTemplateVariables(variables: TemplateVariable[]): void {
    const variableNames = new Set<string>();

    for (const variable of variables) {
      // Check required fields
      if (!variable.name || typeof variable.name !== 'string') {
        throw new ValidationError(
          'Variable name is required and must be a string',
          { variable: 'Variable name is required and must be a string' }
        );
      }

      if (!variable.displayName || typeof variable.displayName !== 'string') {
        throw new ValidationError(
          'Variable display name is required and must be a string',
          { variable: 'Variable display name is required and must be a string' }
        );
      }

      const validTypes: TemplateVariable['type'][] = ['text', 'number', 'date', 'boolean', 'select', 'multiline'];
      if (!validTypes.includes(variable.type)) {
        throw new ValidationError(
          'Invalid variable type',
          {
            variable: `Invalid type: ${variable.type}. Valid types: ${validTypes.join(', ')}`
          }
        );
      }

      // Check for duplicate variable names
      if (variableNames.has(variable.name)) {
        throw new ValidationError(
          'Duplicate variable name',
          { variable: `Variable name "${variable.name}" is already used` }
        );
      }
      variableNames.add(variable.name);

      // Validate select type has options
      if (variable.type === 'select' && (!variable.options || !Array.isArray(variable.options) || variable.options.length === 0)) {
        throw new ValidationError(
          'Select type variable must have options',
          { variable: `Variable "${variable.name}" of type select must have options array` }
        );
      }

      // Validate regex pattern if provided
      if (variable.validationPattern && typeof variable.validationPattern !== 'string') {
        throw new ValidationError(
          'Invalid validation pattern',
          {
            variable: `Variable "${variable.name}" validation pattern must be a string`
          }
        );
      }

      // Test regex pattern validity
      if (variable.validationPattern) {
        try {
          new RegExp(variable.validationPattern);
        } catch {
          throw new ValidationError(
            'Invalid regex pattern',
            {
              variable: `Variable "${variable.name}" has invalid regex pattern: ${variable.validationPattern}`
            }
          );
        }
      }

      // Validate maxLength for text types
      if ((variable.type === 'text' || variable.type === 'multiline') &&
          variable.maxLength !== undefined &&
          (typeof variable.maxLength !== 'number' || variable.maxLength <= 0)) {
        throw new ValidationError(
          'Invalid maxLength',
          {
            variable: `Variable "${variable.name}" maxLength must be a positive number`
          }
        );
      }
    }
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

  // ============ RETURN PROCESSING METHODS ============

  /**
   * Get return requests with filtering and pagination
   *
   * Retrieves return requests for the seller's orders with comprehensive filtering
   * capabilities including status, date ranges, and order information.
   *
   * @param filters - Optional filters for return requests
   * @returns Promise resolving to paginated return requests with metadata
   * @throws {ValidationError} When filter parameters are invalid
   * @throws {RateLimitError} When API rate limit is exceeded
   * @throws {AuthenticationError} When API key is invalid or expired
   *
   * @see {@link https://dev.wildberries.ru/openapi/returns#tag/Vozvratyi-tovarov}
   *
   * @example
   * ```typescript
   * // Get all active returns
   * const activeReturns = await sdk.communications.getReturnRequests({
   *   status: ['processing', 'pending'],
   *   limit: 50
   * });
   * console.log(`Found ${activeReturns.total} active returns`);
   *
   * // Get returns for specific date range
   * const recentReturns = await sdk.communications.getReturnRequests({
   *   dateFrom: '2024-12-01',
   *   dateTo: '2024-12-31',
   *   sortBy: 'createdAt',
   *   sortOrder: 'desc'
   * });
   * ```
   */
  async getReturnRequests(filters?: ReturnRequestFilters): Promise<ReturnRequestsResponse> {
    // Validate filter parameters
    if (filters) {
      this.validateReturnRequestFilters(filters);
    }

    // Build query parameters
    const params = new URLSearchParams();

    if (filters) {
      if (filters.status?.length) {
        params.append('status', filters.status.join(','));
      }
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom);
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo);
      }
      if (filters.orderId) {
        params.append('orderId', filters.orderId);
      }
      if (filters.nmId) {
        params.append('nmId', filters.nmId.toString());
      }
      if (filters.supplierArticle) {
        params.append('supplierArticle', filters.supplierArticle);
      }
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        params.append('sortOrder', filters.sortOrder);
      }
      if (filters.limit) {
        params.append('limit', filters.limit.toString());
      }
      if (filters.offset) {
        params.append('offset', filters.offset.toString());
      }
    }

    const queryString = params.toString();
    const url = `https://feedbacks-api.wildberries.ru/api/v1/returns${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ReturnRequestsResponse>(
      url,
      { rateLimitKey: 'communications.getReturnRequests' }
    );
  }

  /**
   * Process return request with approval or rejection
   *
   * Processes a return request by approving or rejecting it. When approving, you can
   * specify refund amount and processing notes. When rejecting, you must provide a reason.
   *
   * @param returnId - Unique identifier of the return request
   * @param action - Action to take (approve or reject)
   * @param options - Additional processing options
   * @returns Promise resolving to processing result with updated return status
   * @throws {ValidationError} When returnId is missing or invalid, or when required options are missing
   * @throws {RateLimitError} When API rate limit is exceeded
   * @throws {AuthenticationError} When API key is invalid or expired
   * @throws {NotFoundError} When return request is not found
   *
   * @see {@link https://dev.wildberries.ru/openapi/returns#tag/Obrabotka-vozvratov}
   *
   * @example
   * ```typescript
   * // Approve return with full refund
   * const approveResult = await sdk.communications.processReturnRequest(
   *   'return-123456',
   *   'approve',
   *   {
   *     refundAmount: 2990.00,
   *     notes: 'Customer requested return due to size mismatch'
   *   }
   * );
   * console.log(`Return approved with status: ${approveResult.return.status}`);
   *
   * // Reject return with reason
   * const rejectResult = await sdk.communications.processReturnRequest(
   *   'return-789012',
   *   'reject',
   *   {
   *     reason: 'Product does not match return policy requirements',
   *     notes: 'Item returned after 30-day policy period'
   *   }
   * );
   * console.log(`Return rejected: ${rejectResult.return.rejectionReason}`);
   * ```
   */
  async processReturnRequest(
    returnId: string,
    action: 'approve' | 'reject',
    options?: ReturnProcessOptions
  ): Promise<ReturnProcessResponse> {
    // Validate required parameters
    if (!returnId.trim()) {
      throw new ValidationError('Return ID is required and cannot be empty');
    }

    if (!['approve', 'reject'].includes(action)) {
      throw new ValidationError('Action must be either "approve" or "reject"');
    }

    // Validate options based on action
    if (action === 'reject' && (!options?.reason || options.reason.trim().length === 0)) {
      throw new ValidationError('Reason is required when rejecting a return request');
    }

    // Build request payload
    const payload: Record<string, unknown> = {
      action,
      processedAt: new Date().toISOString(),
      ...options
    };

    // Add default notes if not provided
    payload.notes ??= (action === 'approve'
      ? 'Return approved by seller'
      : 'Return rejected by seller');

    const url = `https://feedbacks-api.wildberries.ru/api/v1/returns/${returnId}/process`;

    return this.client.post<ReturnProcessResponse>(
      url,
      payload,
      { rateLimitKey: 'communications.processReturnRequest' }
    );
  }

  /**
   * Validate return request filter parameters
   *
   * Internal helper method to validate return request filter parameters.
   *
   * @param filters - Filter parameters to validate
   * @private
   */
  private validateReturnRequestFilters(filters: ReturnRequestFilters): void {
    // Validate status array
    if (filters.status && !Array.isArray(filters.status)) {
      throw new ValidationError('Status filter must be an array');
    }

    // Validate status values
    if (filters.status) {
      const validStatuses: ReturnStatus[] = [
        'created', 'processing', 'canceled', 'delivered', 'refunded', 'closed',
        'error', 'expired', 'rejected', 'returned', 'archived', 'draft',
        'pending', 'in_transit', 'ready_for_pickup'
      ];

      for (const status of filters.status) {
        if (!validStatuses.includes(status)) {
          throw new ValidationError(
            `Invalid status: ${status}. Valid statuses: ${validStatuses.join(', ')}`
          );
        }
      }
    }

    // Validate date format
    if (filters.dateFrom && !this.isValidDate(filters.dateFrom)) {
      throw new ValidationError('dateFrom must be a valid date in YYYY-MM-DD format');
    }

    if (filters.dateTo && !this.isValidDate(filters.dateTo)) {
      throw new ValidationError('dateTo must be a valid date in YYYY-MM-DD format');
    }

    // Validate date range logic
    if (filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo) {
      throw new ValidationError('dateFrom cannot be later than dateTo');
    }

    // Validate numeric fields
    if (filters.nmId && (filters.nmId < 1 || filters.nmId > 999999999)) {
      throw new ValidationError('nmId must be between 1 and 999999999');
    }

    if (filters.limit && (filters.limit < 1 || filters.limit > 1000)) {
      throw new ValidationError('limit must be between 1 and 1000');
    }

    if (filters.offset && filters.offset < 0) {
      throw new ValidationError('offset cannot be negative');
    }

    // Validate sort field
    if (filters.sortBy) {
      const validSortFields = ['createdAt', 'updatedAt', 'orderId', 'amount', 'status'];
      if (!validSortFields.includes(filters.sortBy)) {
        throw new ValidationError(
          `Invalid sortBy: ${filters.sortBy}. Valid fields: ${validSortFields.join(', ')}`
        );
      }
    }

    // Validate sort order
    if (filters.sortOrder && !['asc', 'desc'].includes(filters.sortOrder)) {
      throw new ValidationError('sortOrder must be either "asc" or "desc"');
    }
  }

  /**
   * Validate date string format
   *
   * @param dateString - Date string to validate (YYYY-MM-DD format)
   * @returns True if valid date format
   * @private
   */
  private isValidDate(dateString: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  /**
   * Update return request status
   *
   * Updates the status of a specific return request with optional notes and tracking information.
   * This method allows manual status updates for returns that require special handling or
   * status corrections due to system updates.
   *
   * Rate limit: 60 requests per minute
   *
   * @param returnId - Unique identifier of the return request
   * @param status - New status for the return request
   * @param notes - Optional notes explaining the status change
   * @returns Promise resolving to status update confirmation
   * @throws {ValidationError} When parameters are invalid
   * @throws {RateLimitError} When API rate limit is exceeded
   * @throws {AuthenticationError} When API key is invalid or expired
   * @throws {NotFoundError} When return request is not found
   *
   * @see {@link https://dev.wildberries.ru/openapi/returns#tag/Return-Status-Management}
   *
   * @example
   * ```typescript
   * // Update return status to approved with notes
   * await sdk.communications.updateReturnStatus(
   *   'return-12345',
   *   'approved',
   *   'Customer provided additional documentation, return approved'
   * );
   *
   * // Mark return as completed after receiving item
   * await sdk.communications.updateReturnStatus(
   *   'return-12345',
   *   'completed',
   *   'Item received in good condition, refund processed'
   * );
   *
   * // Update to canceled with reason
   * await sdk.communications.updateReturnStatus(
   *   'return-12345',
   *   'canceled',
   *   'Customer withdrew return request - issue resolved directly'
   * );
   * ```
   */
  async updateReturnStatus(
    returnId: string,
    status: ReturnStatus,
    notes?: string
  ): Promise<ReturnProcessResponse> {
    // Validate required parameters
    if (returnId.trim().length === 0) {
      throw new ValidationError('Return ID is required and cannot be empty');
    }

    // Validate status value
    const validStatuses = [
      'created', 'processing', 'canceled', 'delivered',
      'refunded', 'closed', 'error', 'expired', 'rejected',
      'returned', 'archived', 'draft', 'pending', 'in_transit', 'ready_for_pickup'
    ];

    if (!validStatuses.includes(status)) {
      throw new ValidationError(
        `Invalid status: ${status}. Valid statuses: ${validStatuses.join(', ')}`
      );
    }

    // Validate notes length
    if (notes && notes.length > 1000) {
      throw new ValidationError('Notes cannot be longer than 1000 characters');
    }

    const payload = {
      status,
      notes: notes ?? '',
      updatedAt: new Date().toISOString()
    };

    const url = `https://feedbacks-api.wildberries.ru/api/v1/returns/${returnId}/status`;

    return this.client.put<ReturnProcessResponse>(
      url,
      payload,
      { rateLimitKey: 'communications.updateReturnStatus' }
    );
  }

  /**
   * Get return analytics and insights
   *
   * Retrieves comprehensive analytics for return requests including performance metrics,
   * trend analysis, quality assessments, and operational insights. This method provides
   * valuable business intelligence for return process optimization and quality improvement.
   *
   * Rate limit: 10 requests per minute
   *
   * @param filters - Optional filters for analytics data
   * @returns Promise resolving to comprehensive return analytics
   * @throws {ValidationError} When filter parameters are invalid
   * @throws {RateLimitError} When API rate limit is exceeded
   * @throws {AuthenticationError} When API key is invalid or expired
   *
   * @see {@link https://dev.wildberries.ru/openapi/returns#tag/Return-Analytics}
   *
   * @example
   * ```typescript
   * // Get overall return analytics
   * const analytics = await sdk.communications.getReturnAnalytics();
   *
   * console.log(`Total returns: ${analytics.totalReturns}`);
   * console.log(`Average processing time: ${analytics.performanceMetrics.averageProcessingTime}h`);
   * console.log(`Customer satisfaction rate: ${analytics.performanceMetrics.customerSatisfactionRate}%`);
   *
   * // Analyze returns by status
   * analytics.byStatus.forEach(statusData => {
   *   console.log(`${statusData.status}: ${statusData.count} (${statusData.percentage}%)`);
   * });
   *
   * // Check quality scores by category
   * analytics.byCategory.forEach(categoryData => {
   *   console.log(`${categoryData.category}: Quality score ${categoryData.qualityScore}/100`);
   *   console.log(`  Average processing time: ${categoryData.averageProcessingTime}h`);
   * });
   *
   * // Get analytics for specific date range
   * const recentAnalytics = await sdk.communications.getReturnAnalytics({
   *   dateFrom: '2024-12-01',
   *   dateTo: '2024-12-31',
   *   includeTrends: true,
   *   includeQualityMetrics: true
   * });
   *
   * // Analyze return trends
   * if (recentAnalytics.trends) {
   *   console.log('Return Trends:');
   *   recentAnalytics.trends.daily.forEach(dayData => {
   *     console.log(`${dayData.date}: ${dayData.count} returns (${dayData.changePercentage > 0 ? '+' : ''}${dayData.changePercentage}%)`);
   *   });
   * }
   *
   * // Check cost analysis
   * if (recentAnalytics.costAnalysis) {
   *   console.log(`Total return costs: $${recentAnalytics.costAnalysis.totalCost}`);
   *   console.log(`Average cost per return: $${recentAnalytics.costAnalysis.averageCostPerReturn}`);
   *   console.log(`Prevention savings: $${recentAnalytics.costAnalysis.preventionSavings}`);
   * }
   * ```
   */
  async getReturnAnalytics(filters?: ReturnAnalyticsFilters): Promise<ReturnAnalyticsResponse> {
    // Validate filter parameters
    if (filters) {
      this.validateReturnAnalyticsFilters(filters);
    }

    // Build query parameters
    const params = new URLSearchParams();

    if (filters) {
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom);
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo);
      }
      if (filters.status?.length) {
        params.append('status', filters.status.join(','));
      }
      if (filters.category?.length) {
        params.append('category', filters.category.join(','));
      }
      if (filters.reason?.length) {
        params.append('reason', filters.reason.join(','));
      }
      if (filters.includeTrends !== undefined) {
        params.append('includeTrends', filters.includeTrends.toString());
      }
      if (filters.includeQualityMetrics !== undefined) {
        params.append('includeQualityMetrics', filters.includeQualityMetrics.toString());
      }
      if (filters.includeCostAnalysis !== undefined) {
        params.append('includeCostAnalysis', filters.includeCostAnalysis.toString());
      }
      if (filters.includeCustomerFeedback !== undefined) {
        params.append('includeCustomerFeedback', filters.includeCustomerFeedback.toString());
      }
      if (filters.groupBy) {
        params.append('groupBy', filters.groupBy);
      }
    }

    const queryString = params.toString();
    const url = `https://feedbacks-api.wildberries.ru/api/v1/returns/analytics${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ReturnAnalyticsResponse>(
      url,
      { rateLimitKey: 'communications.getReturnAnalytics' }
    );
  }

  /**
   * Validate return analytics filter parameters
   *
   * Internal helper method to validate return analytics filter parameters.
   *
   * @param filters - Filter parameters to validate
   * @private
   */
  private validateReturnAnalyticsFilters(filters: ReturnAnalyticsFilters): void {
    // Validate date format
    if (filters.dateFrom && !this.isValidDate(filters.dateFrom)) {
      throw new ValidationError('dateFrom must be a valid date in YYYY-MM-DD format');
    }

    if (filters.dateTo && !this.isValidDate(filters.dateTo)) {
      throw new ValidationError('dateTo must be a valid date in YYYY-MM-DD format');
    }

    // Validate date range logic
    if (filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo) {
      throw new ValidationError('dateFrom cannot be later than dateTo');
    }

    // Validate status values
    if (filters.status) {
      const validStatuses = [
        'created', 'processing', 'canceled', 'delivered',
        'refunded', 'closed', 'error', 'expired', 'rejected',
        'returned', 'archived', 'draft', 'pending', 'in_transit', 'ready_for_pickup'
      ];

      const invalidStatuses = filters.status.filter(status => !validStatuses.includes(status));
      if (invalidStatuses.length > 0) {
        throw new ValidationError(
          `Invalid status values: ${invalidStatuses.join(', ')}. Valid statuses: ${validStatuses.join(', ')}`
        );
      }
    }

    // Validate groupBy
    if (filters.groupBy) {
      const validGroupBy = ['status', 'category', 'reason', 'date', 'product', 'customer'];
      if (!validGroupBy.includes(filters.groupBy)) {
        throw new ValidationError(
          `Invalid groupBy: ${filters.groupBy}. Valid options: ${validGroupBy.join(', ')}`
        );
      }
    }

    // Validate boolean fields
    const booleanFields = [
      'includeTrends', 'includeQualityMetrics', 'includeCostAnalysis', 'includeCustomerFeedback'
    ];

    booleanFields.forEach(field => {
      const filterKey = field as keyof ReturnAnalyticsFilters;
      if (filters[filterKey] !== undefined && typeof filters[filterKey] !== 'boolean') {
        throw new ValidationError(`${field} must be a boolean value`);
      }
    });
  }

  // ============ ENHANCED CHAT FUNCTIONALITY METHODS ============

  /**
   * Get chat history with comprehensive filtering and pagination
   *
   * Retrieves the complete message history for a specific chat with advanced
   * filtering capabilities including message type, sender, date ranges, and content search.
   *
   * @param chatId - Unique identifier of the chat
   * @param filters - Optional filters for chat messages
   * @returns Promise resolving to paginated chat history with messages and metadata
   * @throws {ValidationError} When chat ID is invalid or filter parameters are invalid
   * @throws {RateLimitError} When API rate limit is exceeded
   * @throws {AuthenticationError} When API key is invalid or expired
   * @throws {NotFoundError} When chat is not found
   *
   * @see {@link https://dev.wildberries.ru/openapi/chat#tag/Chat-History}
   *
   * @example
   * ```typescript
   * // Get recent messages from chat
   * const history = await sdk.communications.getChatHistory('chat-12345', {
   *   limit: 50,
   *   sortOrder: 'desc'
   * });
   * console.log(`Found ${history.messages.length} recent messages`);
   *
   * // Search for messages containing specific text
   * const searchResults = await sdk.communications.getChatHistory('chat-12345', {
   *   searchText: 'shipping',
   *   messageType: 'text',
   *   dateFrom: '2024-12-01'
   * });
   * console.log(`Found ${searchResults.messages.length} messages about shipping`);
   *
   * // Get only messages with attachments
   * const attachments = await sdk.communications.getChatHistory('chat-12345', {
   *   hasAttachments: true,
   *   messageType: 'file'
   * });
   * ```
   */
  async getChatHistory(chatId: string, filters?: ChatHistoryFilters): Promise<ChatHistory> {
    // Validate required parameters
    if (!chatId.trim()) {
      throw new ValidationError('Chat ID is required and cannot be empty');
    }

    // Validate filter parameters
    if (filters) {
      this.validateChatHistoryFilters(filters);
    }

    // Build query parameters
    const params = new URLSearchParams();
    params.append('chatId', chatId);

    if (filters) {
      if (filters.messageType) {
        params.append('messageType', filters.messageType);
      }
      if (filters.sender) {
        params.append('sender', filters.sender);
      }
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom);
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo);
      }
      if (filters.readStatus !== undefined) {
        params.append('readStatus', filters.readStatus.toString());
      }
      if (filters.hasAttachments !== undefined) {
        params.append('hasAttachments', filters.hasAttachments.toString());
      }
      if (filters.searchText) {
        params.append('searchText', encodeURIComponent(filters.searchText));
      }
      if (filters.sortOrder) {
        params.append('sortOrder', filters.sortOrder);
      }
      if (filters.limit) {
        params.append('limit', filters.limit.toString());
      }
      if (filters.offset) {
        params.append('offset', filters.offset.toString());
      }
    }

    const queryString = params.toString();
    const url = `https://feedbacks-api.wildberries.ru/api/v1/chat/history${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ChatHistory>(
      url,
      { rateLimitKey: 'communications.getChatHistory' }
    );
  }

  /**
   * Get comprehensive chat details by ID
   *
   * Retrieves detailed information about a specific chat including customer details,
   * message statistics, assignee information, priority, and metadata. This provides
   * complete context for customer service interactions.
   *
   * @param chatId - Unique identifier of the chat
   * @returns Promise resolving to comprehensive chat details
   * @throws {ValidationError} When chat ID is invalid
   * @throws {RateLimitError} When API rate limit is exceeded
   * @throws {AuthenticationError} When API key is invalid or expired
   * @throws {NotFoundError} When chat is not found
   *
   * @see {@link https://dev.wildberries.ru/openapi/chat#tag/Chat-Details}
   *
   * @example
   * ```typescript
   * // Get detailed chat information
   * const chatDetails = await sdk.communications.getChatById('chat-12345');
   *
   * console.log(`Customer: ${chatDetails.customerName}`);
   * console.log(`Status: ${chatDetails.status}`);
   * console.log(`Priority: ${chatDetails.priority}`);
   * console.log(`Unread messages: ${chatDetails.unreadCount}`);
   * console.log(`Total messages: ${chatDetails.messageCount}`);
   *
   * if (chatDetails.metadata?.isVip) {
   *   console.log('VIP customer - prioritize response');
   * }
   *
   * if (chatDetails.metadata?.previousInteractions) {
   *   console.log(`Previous interactions: ${chatDetails.metadata.previousInteractions}`);
   * }
   * ```
   */
  async getChatById(chatId: string): Promise<ChatDetails> {
    // Validate required parameters
    if (chatId.trim().length === 0) {
      throw new ValidationError('Chat ID is required and cannot be empty');
    }

    const url = `https://feedbacks-api.wildberries.ru/api/v1/chat/${encodeURIComponent(chatId)}`;

    return this.client.get<ChatDetails>(
      url,
      { rateLimitKey: 'communications.getChatById' }
    );
  }

  /**
   * Validate chat history filter parameters
   *
   * Internal helper method to validate chat history filter parameters.
   *
   * @param filters - Filter parameters to validate
   * @private
   */
  private validateChatHistoryFilters(filters: ChatHistoryFilters): void {
    // Validate message type
    if (filters.messageType) {
      const validMessageTypes = ['text', 'file', 'image', 'system'];
      if (!validMessageTypes.includes(filters.messageType)) {
        throw new ValidationError(
          `Invalid messageType: ${filters.messageType}. Valid types: ${validMessageTypes.join(', ')}`
        );
      }
    }

    // Validate sender
    if (filters.sender) {
      const validSenders = ['client', 'seller', 'system'];
      if (!validSenders.includes(filters.sender)) {
        throw new ValidationError(
          `Invalid sender: ${filters.sender}. Valid senders: ${validSenders.join(', ')}`
        );
      }
    }

    // Validate date format
    if (filters.dateFrom && !this.isValidDate(filters.dateFrom)) {
      throw new ValidationError('dateFrom must be a valid date in YYYY-MM-DD format');
    }

    if (filters.dateTo && !this.isValidDate(filters.dateTo)) {
      throw new ValidationError('dateTo must be a valid date in YYYY-MM-DD format');
    }

    // Validate date range logic
    if (filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo) {
      throw new ValidationError('dateFrom cannot be later than dateTo');
    }

    // Validate sort order
    if (filters.sortOrder && !['asc', 'desc'].includes(filters.sortOrder)) {
      throw new ValidationError('sortOrder must be either "asc" or "desc"');
    }

    // Validate numeric fields
    if (filters.limit && (filters.limit < 1 || filters.limit > 100)) {
      throw new ValidationError('limit must be between 1 and 100');
    }

    if (filters.offset && filters.offset < 0) {
      throw new ValidationError('offset cannot be negative');
    }

    // Validate search text length
    if (filters.searchText && filters.searchText.length > 1000) {
      throw new ValidationError('searchText cannot be longer than 1000 characters');
    }
  }

  // ============ ENHANCED REVIEW ANALYSIS METHODS ============

  /**
   * Get enhanced feedbacks with comprehensive analysis and filtering
   *
   * Retrieves customer feedbacks with advanced analytics including sentiment analysis,
   * customer intelligence, quality assessment, and impact analysis.
   *
   * Rate limit: 10 requests per minute
   *
   * @param filters - Optional enhanced filters for feedback retrieval
   * @returns Promise resolving to enhanced feedbacks with comprehensive analytics
   * @throws {ValidationError} When filter parameters are invalid
   * @throws {RateLimitError} When API rate limit is exceeded
   * @throws {AuthenticationError} When API key is invalid or expired
   *
   * @see {@link https://dev.wildberries.ru/openapi/feedbacks#tag/Enhanced-Feedback-Analysis}
   *
   * @example
   * ```typescript
   * // Get critical feedbacks requiring immediate attention
   * const criticalFeedbacks = await sdk.communications.getFeedbacks({
   *   urgencyLevels: ['high', 'critical'],
   *   sentiments: ['negative'],
   *   hasResponse: false,
   *   sortBy: 'urgency',
   *   sortOrder: 'desc',
   *   limit: 20
   * });
   *
   * console.log(`Found ${criticalFeedbacks.total} critical feedbacks`);
   * for (const feedback of criticalFeedbacks.data) {
   *   console.log(`Customer: ${feedback.customer.name} (VIP: ${feedback.customer.isVip})`);
   *   console.log(`Product: ${feedback.productDetails.productName}`);
   *   console.log(`Sentiment: ${feedback.analysis.sentiment} (${feedback.analysis.sentimentScore})`);
   *   console.log(`Urgency: ${feedback.analysis.urgency}`);
   *   console.log(`Topics: ${feedback.analysis.topics.join(', ')}`);
   *
   *   if (feedback.response.hasResponse) {
   *     console.log(`Already responded: ${feedback.response.responseText}`);
   *   } else {
   *     console.log('Needs response - suggested actions:');
   *     feedback.response.suggestedResponses?.forEach((suggestion, index) => {
   *       console.log(`  ${index + 1}. ${suggestion}`);
   *     });
   *   }
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Get VIP customer feedbacks with full analysis
   * const vipFeedbacks = await sdk.communications.getFeedbacks({
   *   isVip: true,
   *   includeAnalysis: true,
   *   includeCustomer: true,
   *   includeMetrics: true,
   *   includeImpact: true,
   *   dateFrom: '2024-12-01',
   *   dateTo: '2024-12-31'
   * });
   *
   * console.log('VIP Customer Feedback Analytics:');
   * console.log(`Average Rating: ${vipFeedbacks.analytics.averageRating}/5`);
   * console.log(`Response Rate: ${vipFeedbacks.analytics.responseRate}%`);
   * console.log(`Sentiment Distribution:`, vipFeedbacks.analytics.sentimentDistribution);
   * console.log(`Top Topics:`, vipFeedbacks.analytics.topTopics);
   *
   * // Analyze VIP feedback trends
   * for (const feedback of vipFeedbacks.data) {
   *   if (feedback.analysis.urgency === 'critical') {
   *     console.log(`CRITICAL: ${feedback.productDetails.productName} - ${feedback.content.text.substring(0, 100)}...`);
   *     console.log(`Customer LTV: $${feedback.customerJourney.customerLifetimeValue}`);
   *     console.log(`Impact Score: ${feedback.impact.impactScore}/100`);
   *   }
   * }
   * ```
   */
  async getFeedbacks(filters?: EnhancedFeedbackFilters): Promise<EnhancedFeedbacksResponse> {
    // Validate filter parameters
    if (filters) {
      this.validateEnhancedFeedbackFilters(filters);
    }

    // Build query parameters
    const params = new URLSearchParams();

    if (filters) {
      // Product filters
      if (filters.nmIds?.length) {
        params.append('nmIds', filters.nmIds.join(','));
      }
      if (filters.supplierArticles?.length) {
        params.append('supplierArticles', filters.supplierArticles.join(','));
      }
      if (filters.ratings?.length) {
        params.append('ratings', filters.ratings.join(','));
      }

      // Analysis filters
      if (filters.sentiments?.length) {
        params.append('sentiments', filters.sentiments.join(','));
      }
      if (filters.urgencyLevels?.length) {
        params.append('urgencyLevels', filters.urgencyLevels.join(','));
      }
      if (filters.topics?.length) {
        params.append('topics', filters.topics.join(','));
      }

      // Customer filters
      if (filters.isVip !== undefined) {
        params.append('isVip', filters.isVip.toString());
      }
      if (filters.isVerified !== undefined) {
        params.append('isVerified', filters.isVerified.toString());
      }
      if (filters.hasResponse !== undefined) {
        params.append('hasResponse', filters.hasResponse.toString());
      }

      // Media filters
      if (filters.hasPhotos !== undefined) {
        params.append('hasPhotos', filters.hasPhotos.toString());
      }
      if (filters.hasVideo !== undefined) {
        params.append('hasVideo', filters.hasVideo.toString());
      }

      // Quality filters
      if (filters.emotionalTones?.length) {
        params.append('emotionalTones', filters.emotionalTones.join(','));
      }
      if (filters.isDetailed !== undefined) {
        params.append('isDetailed', filters.isDetailed.toString());
      }
      if (filters.isConstructive !== undefined) {
        params.append('isConstructive', filters.isConstructive.toString());
      }
      if (filters.hasProsAndCons !== undefined) {
        params.append('hasProsAndCons', filters.hasProsAndCons.toString());
      }

      // Date and text filters
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom);
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo);
      }
      if (filters.searchText) {
        params.append('searchText', filters.searchText);
      }

      // Quality thresholds
      if (filters.minHelpfulness !== undefined) {
        params.append('minHelpfulness', filters.minHelpfulness.toString());
      }
      if (filters.minWordCount !== undefined) {
        params.append('minWordCount', filters.minWordCount.toString());
      }

      // Customer characteristics filters
      if (filters.customerFilters) {
        if (filters.customerFilters.minOrders !== undefined) {
          params.append('customerMinOrders', filters.customerFilters.minOrders.toString());
        }
        if (filters.customerFilters.maxOrders !== undefined) {
          params.append('customerMaxOrders', filters.customerFilters.maxOrders.toString());
        }
        if (filters.customerFilters.minAverageRating !== undefined) {
          params.append('customerMinRating', filters.customerFilters.minAverageRating.toString());
        }
        if (filters.customerFilters.maxAverageRating !== undefined) {
          params.append('customerMaxRating', filters.customerFilters.maxAverageRating.toString());
        }
        if (filters.customerFilters.registrationDateFrom) {
          params.append('customerRegDateFrom', filters.customerFilters.registrationDateFrom);
        }
        if (filters.customerFilters.registrationDateTo) {
          params.append('customerRegDateTo', filters.customerFilters.registrationDateTo);
        }
      }

      // Impact filters
      if (filters.impactFilters) {
        if (filters.impactFilters.affectsSales !== undefined) {
          params.append('affectsSales', filters.impactFilters.affectsSales.toString());
        }
        if (filters.impactFilters.minImpactScore !== undefined) {
          params.append('minImpactScore', filters.impactFilters.minImpactScore.toString());
        }
        if (filters.impactFilters.priceMentioned !== undefined) {
          params.append('priceMentioned', filters.impactFilters.priceMentioned.toString());
        }
        if (filters.impactFilters.shippingMentioned !== undefined) {
          params.append('shippingMentioned', filters.impactFilters.shippingMentioned.toString());
        }
        if (filters.impactFilters.qualityMentioned !== undefined) {
          params.append('qualityMentioned', filters.impactFilters.qualityMentioned.toString());
        }
      }

      // Sorting and pagination
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        params.append('sortOrder', filters.sortOrder);
      }
      if (filters.limit) {
        params.append('limit', filters.limit.toString());
      }
      if (filters.offset) {
        params.append('offset', filters.offset.toString());
      }

      // Include options
      if (filters.includeAnalysis !== undefined) {
        params.append('includeAnalysis', filters.includeAnalysis.toString());
      }
      if (filters.includeCustomer !== undefined) {
        params.append('includeCustomer', filters.includeCustomer.toString());
      }
      if (filters.includeMetrics !== undefined) {
        params.append('includeMetrics', filters.includeMetrics.toString());
      }
      if (filters.includeImpact !== undefined) {
        params.append('includeImpact', filters.includeImpact.toString());
      }
    }

    const queryString = params.toString();
    const url = `https://feedbacks-api.wildberries.ru/api/v1/feedbacks/enhanced${queryString ? `?${queryString}` : ''}`;

    return this.client.get<EnhancedFeedbacksResponse>(
      url,
      { rateLimitKey: 'communications.getFeedbacks' }
    );
  }

  /**
   * Get detailed feedback analysis by ID
   *
   * Retrieves comprehensive feedback details including customer journey, product context,
   * recommended actions, insights, quality analysis, and response optimization suggestions.
   *
   * Rate limit: 60 requests per minute
   *
   * @param feedbackId - Unique feedback identifier
   * @returns Promise resolving to detailed feedback analysis with recommendations
   * @throws {ValidationError} When feedbackId is empty or invalid
   * @throws {RateLimitError} When API rate limit is exceeded
   * @throws {AuthenticationError} When API key is invalid or expired
   * @throws {NotFoundError} When feedback is not found
   *
   * @see {@link https://dev.wildberries.ru/openapi/feedbacks#tag/Feedback-Details}
   *
   * @example
   * ```typescript
   * // Get comprehensive analysis for a specific feedback
   * const feedbackDetails = await sdk.communications.getFeedbackById('feedback-12345');
   *
   * console.log('Feedback Analysis:');
   * console.log(`Customer: ${feedbackDetails.feedback.customer.name} (${feedbackDetails.feedback.customer.isVip ? 'VIP' : 'Regular'})`);
   * console.log(`Product: ${feedbackDetails.feedback.productDetails.productName}`);
   * console.log(`Rating: ${feedbackDetails.feedback.content.rating}/5 stars`);
   * console.log(`Sentiment: ${feedbackDetails.feedback.analysis.sentiment}`);
   * console.log(`Urgency: ${feedbackDetails.feedback.analysis.urgency}`);
   *
   * // Check recommended actions
   * console.log(`\nPriority: ${feedbackDetails.recommendations.priority}`);
   * console.log('Recommended Actions:');
   * feedbackDetails.recommendations.actions.forEach((action, index) => {
   *   console.log(`  ${index + 1}. ${action.description} (${action.urgency} urgency)`);
   * });
   *
   * // Review customer journey
   * console.log(`\nCustomer Journey:`);
   * console.log(`Lifetime Value: $${feedbackDetails.customerJourney.customerLifetimeValue}`);
   * console.log(`Loyalty Status: ${feedbackDetails.customerJourney.loyaltyStatus}`);
   * console.log(`Risk Level: ${feedbackDetails.customerJourney.riskLevel}`);
   * console.log(`Previous Orders: ${feedbackDetails.customerJourney.orderHistory.length}`);
   *
   * // Check response optimization
   * console.log(`\nResponse Optimization:`);
   * console.log(`Best Response Time: ${feedbackDetails.responseOptimization.bestResponseTime}`);
   * console.log(`Optimal Tone: ${feedbackDetails.responseOptimization.optimalTone}`);
   * console.log('Key Points to Address:');
   * feedbackDetails.responseOptimization.keyPoints.forEach(point => {
   *   console.log(`  - ${point}`);
   * });
   *
   * // Review template suggestions
   * if (feedbackDetails.responseOptimization.templateSuggestions.length > 0) {
   *   console.log('\nSuggested Templates:');
   *   feedbackDetails.responseOptimization.templateSuggestions.forEach(template => {
   *     console.log(`  ${template.templateName} (Relevance: ${template.relevanceScore}%)`);
   *   });
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Handle critical feedback with comprehensive analysis
   * const handleCriticalFeedback = async (feedbackId: string) => {
   *   try {
   *     const details = await sdk.communications.getFeedbackById(feedbackId);
   *
   *     // Assess urgency and impact
   *     const { feedback, recommendations, customerJourney } = details;
   *
   *     if (feedback.analysis.urgency === 'critical' ||
   *         feedback.impact.impactScore > 80 ||
   *         customerJourney.loyaltyStatus === 'vip') {
   *
   *       console.log('🚨 CRITICAL FEEDBACK DETECTED - Immediate action required');
   *       console.log(`Customer: ${feedback.customer.name} (${customerJourney.loyaltyStatus.toUpperCase()})`);
   *       console.log(`Impact Score: ${feedback.impact.impactScore}/100`);
   *
   *       // Get high-priority recommendations
   *       const criticalActions = recommendations.actions
   *         .filter(action => action.urgency === 'high' || action.urgency === 'critical')
   *         .sort((a, b) => {
   *           const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
   *           return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
   *         });
   *
   *       console.log('\nImmediate Actions Required:');
   *       criticalActions.forEach((action, index) => {
   *         console.log(`  ${index + 1}. ${action.description}`);
   *         console.log(`     Impact: ${action.estimatedImpact} | Timeline: ASAP`);
   *       });
   *
   *       // Suggest optimal response
   *       const bestTemplate = details.responseOptimization.templateSuggestions[0];
   *       if (bestTemplate) {
   *         console.log(`\nSuggested Response Template: ${bestTemplate.templateName}`);
   *         console.log(`Customization needed: ${bestTemplate.customizationNeeded.join(', ')}`);
   *       }
   *
   *       return {
   *         isCritical: true,
   *         actions: criticalActions,
   *         customerValue: customerJourney.customerLifetimeValue,
   *         suggestedTemplate: bestTemplate
   *       };
   *     }
   *
   *     return { isCritical: false, details };
   *
   *   } catch (error) {
   *     if (error instanceof NotFoundError) {
   *       console.log(`Feedback ${feedbackId} not found`);
   *       return null;
   *     }
   *     throw error;
   *   }
   * };
   * ```
   */
  async getFeedbackById(feedbackId: string): Promise<FeedbackDetailsResponse> {
    // Validate required parameters
    if (feedbackId.trim().length === 0) {
      throw new ValidationError('Feedback ID is required and cannot be empty');
    }

    const url = `https://feedbacks-api.wildberries.ru/api/v1/feedbacks/${encodeURIComponent(feedbackId)}/details`;

    return this.client.get<FeedbackDetailsResponse>(
      url,
      { rateLimitKey: 'communications.getFeedbackById' }
    );
  }

  /**
   * Validate enhanced feedback filter parameters
   *
   * Internal helper method to validate enhanced feedback filter parameters.
   *
   * @param filters - Filter parameters to validate
   * @private
   */
  private validateEnhancedFeedbackFilters(filters: EnhancedFeedbackFilters): void {
    // Validate ratings
    if (filters.ratings) {
      const invalidRatings = filters.ratings.filter(rating => rating < 1 || rating > 5);
      if (invalidRatings.length > 0) {
        throw new ValidationError(
          `Invalid ratings: ${invalidRatings.join(', ')}. Ratings must be between 1 and 5`
        );
      }
    }

    // Validate sentiments
    if (filters.sentiments) {
      const validSentiments = ['positive', 'negative', 'neutral'];
      const invalidSentiments = filters.sentiments.filter(sentiment => !validSentiments.includes(sentiment));
      if (invalidSentiments.length > 0) {
        throw new ValidationError(
          `Invalid sentiments: ${invalidSentiments.join(', ')}. Valid sentiments: ${validSentiments.join(', ')}`
        );
      }
    }

    // Validate urgency levels
    if (filters.urgencyLevels) {
      const validUrgencyLevels = ['low', 'medium', 'high', 'critical'];
      const invalidUrgencyLevels = filters.urgencyLevels.filter(level => !validUrgencyLevels.includes(level));
      if (invalidUrgencyLevels.length > 0) {
        throw new ValidationError(
          `Invalid urgency levels: ${invalidUrgencyLevels.join(', ')}. Valid levels: ${validUrgencyLevels.join(', ')}`
        );
      }
    }

    // Validate emotional tones
    if (filters.emotionalTones) {
      const validTones = ['angry', 'happy', 'disappointed', 'excited', 'neutral'];
      const invalidTones = filters.emotionalTones.filter(tone => !validTones.includes(tone));
      if (invalidTones.length > 0) {
        throw new ValidationError(
          `Invalid emotional tones: ${invalidTones.join(', ')}. Valid tones: ${validTones.join(', ')}`
        );
      }
    }

    // Validate date format
    if (filters.dateFrom && !this.isValidDate(filters.dateFrom)) {
      throw new ValidationError('dateFrom must be a valid date in YYYY-MM-DD format');
    }

    if (filters.dateTo && !this.isValidDate(filters.dateTo)) {
      throw new ValidationError('dateTo must be a valid date in YYYY-MM-DD format');
    }

    // Validate date range logic
    if (filters.dateFrom && filters.dateTo && filters.dateFrom > filters.dateTo) {
      throw new ValidationError('dateFrom cannot be later than dateTo');
    }

    // Validate customer registration dates
    if (filters.customerFilters) {
      if (filters.customerFilters.registrationDateFrom &&
          !this.isValidDate(filters.customerFilters.registrationDateFrom)) {
        throw new ValidationError('customerFilters.registrationDateFrom must be a valid date in YYYY-MM-DD format');
      }

      if (filters.customerFilters.registrationDateTo &&
          !this.isValidDate(filters.customerFilters.registrationDateTo)) {
        throw new ValidationError('customerFilters.registrationDateTo must be a valid date in YYYY-MM-DD format');
      }

      // Validate rating ranges
      if (filters.customerFilters.minOrders !== undefined && filters.customerFilters.minOrders < 0) {
        throw new ValidationError('customerFilters.minOrders cannot be negative');
      }

      if (filters.customerFilters.maxOrders !== undefined && filters.customerFilters.maxOrders < 0) {
        throw new ValidationError('customerFilters.maxOrders cannot be negative');
      }

      if (filters.customerFilters.minAverageRating !== undefined) {
        if (filters.customerFilters.minAverageRating < 1 || filters.customerFilters.minAverageRating > 5) {
          throw new ValidationError('customerFilters.minAverageRating must be between 1 and 5');
        }
      }

      if (filters.customerFilters.maxAverageRating !== undefined) {
        if (filters.customerFilters.maxAverageRating < 1 || filters.customerFilters.maxAverageRating > 5) {
          throw new ValidationError('customerFilters.maxAverageRating must be between 1 and 5');
        }
      }

      // Validate rating range logic
      if (filters.customerFilters.minAverageRating !== undefined &&
          filters.customerFilters.maxAverageRating !== undefined &&
          filters.customerFilters.minAverageRating > filters.customerFilters.maxAverageRating) {
        throw new ValidationError('customerFilters.minAverageRating cannot be greater than customerFilters.maxAverageRating');
      }

      // Validate order count range logic
      if (filters.customerFilters.minOrders !== undefined &&
          filters.customerFilters.maxOrders !== undefined &&
          filters.customerFilters.minOrders > filters.customerFilters.maxOrders) {
        throw new ValidationError('customerFilters.minOrders cannot be greater than customerFilters.maxOrders');
      }
    }

    // Validate impact filters
    if (filters.impactFilters) {
      if (filters.impactFilters.minImpactScore !== undefined) {
        if (filters.impactFilters.minImpactScore < 0 || filters.impactFilters.minImpactScore > 100) {
          throw new ValidationError('impactFilters.minImpactScore must be between 0 and 100');
        }
      }
    }

    // Validate quality thresholds
    if (filters.minHelpfulness !== undefined) {
      if (filters.minHelpfulness < 0 || filters.minHelpfulness > 100) {
        throw new ValidationError('minHelpfulness must be between 0 and 100');
      }
    }

    if (filters.minWordCount !== undefined) {
      if (filters.minWordCount < 0) {
        throw new ValidationError('minWordCount cannot be negative');
      }
    }

    // Validate sort options
    if (filters.sortBy) {
      const validSortBy = [
        'date', 'rating', 'sentimentScore', 'helpfulness', 'urgency', 'impactScore', 'wordCount'
      ];
      if (!validSortBy.includes(filters.sortBy)) {
        throw new ValidationError(
          `Invalid sortBy: ${filters.sortBy}. Valid options: ${validSortBy.join(', ')}`
        );
      }
    }

    if (filters.sortOrder && !['asc', 'desc'].includes(filters.sortOrder)) {
      throw new ValidationError('sortOrder must be either "asc" or "desc"');
    }

    // Validate numeric fields
    if (filters.limit && (filters.limit < 1 || filters.limit > 100)) {
      throw new ValidationError('limit must be between 1 and 100');
    }

    if (filters.offset && filters.offset < 0) {
      throw new ValidationError('offset cannot be negative');
    }

    // Validate search text length
    if (filters.searchText && filters.searchText.length > 1000) {
      throw new ValidationError('searchText cannot be longer than 1000 characters');
    }

    // Validate search text in topics
    if (filters.topics?.some(topic => topic.length > 100)) {
      throw new ValidationError('Topic names cannot be longer than 100 characters');
    }
  }

  // ============================================================================
  // Task 8.5 - New Communications API Methods
  // ============================================================================

  /**
   * Get count of unanswered feedbacks with average rating
   *
   * Returns metrics for unanswered feedbacks including total count,
   * today's count, and average rating of all feedbacks.
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @returns Promise resolving to unanswered feedbacks metrics
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * const metrics = await sdk.communications.getFeedbacksCountUnanswered();
   * console.log(`Unanswered: ${metrics.data.countUnanswered}`);
   * console.log(`Today: ${metrics.data.countUnansweredToday}`);
   * console.log(`Average rating: ${metrics.data.valuation}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1count-unanswered/get}
   */
  async getFeedbacksCountUnanswered(): Promise<FeedbacksCountUnansweredResponse> {
    return this.client.get<FeedbacksCountUnansweredResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count-unanswered',
      { rateLimitKey: 'communications.getFeedbacksCountUnanswered' }
    );
  }

  /**
   * Get count of feedbacks for a given period
   *
   * Returns count of answered or unanswered feedbacks within specified date range.
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param params - Optional filter parameters (dateFrom, dateTo, isAnswered)
   * @returns Promise resolving to feedbacks count
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When parameters are invalid
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get count of unanswered feedbacks
   * const count = await sdk.communications.getFeedbacksCount({
   *   isAnswered: false
   * });
   * console.log(`Unanswered feedbacks: ${count.data}`);
   *
   * // Get count for specific period
   * const periodCount = await sdk.communications.getFeedbacksCount({
   *   dateFrom: 1688465092,
   *   dateTo: 1699999999,
   *   isAnswered: true
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1count/get}
   */
  async getFeedbacksCount(params?: FeedbacksCountParams): Promise<FeedbacksCountResponse> {
    const queryParams: Record<string, string> = {};

    if (params) {
      if (params.dateFrom !== undefined) {
        queryParams.dateFrom = params.dateFrom.toString();
      }
      if (params.dateTo !== undefined) {
        queryParams.dateTo = params.dateTo.toString();
      }
      if (params.isAnswered !== undefined) {
        queryParams.isAnswered = params.isAnswered.toString();
      }
    }

    return this.client.get<FeedbacksCountResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count',
      {
        params: queryParams,
        rateLimitKey: 'communications.getFeedbacksCount',
      }
    );
  }

  /**
   * Get complaint reasons and product issue types
   *
   * Returns lists of complaint reasons for feedbacks and product issue types.
   * Use these values when submitting feedback complaints via reportFeedbackAction().
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param locale - Optional locale for response values ('ru', 'en', 'zh')
   * @returns Promise resolving to complaint reasons and product issues
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get complaint reasons in Russian
   * const valuations = await sdk.communications.getSupplierValuations('ru');
   *
   * // feedbackValuations contains complaint reasons (1-7 for API, 11-20 for portal)
   * console.log('Feedback complaints:', valuations.data.feedbackValuations);
   * // { "1": "Отзыв не относится к товару", "3": "Спам", ... }
   *
   * // productValuations contains product issue types
   * console.log('Product issues:', valuations.data.productValuations);
   * // { "1": "Повредили при доставке", "2": "Товар подменили", ... }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get}
   */
  async getSupplierValuations(locale?: 'ru' | 'en' | 'zh'): Promise<SupplierValuationsResponse> {
    const headers: Record<string, string> = {};
    if (locale) {
      headers['X-Locale'] = locale;
    }

    return this.client.get<SupplierValuationsResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/supplier-valuations',
      {
        headers,
        rateLimitKey: 'communications.getSupplierValuations',
      }
    );
  }

  /**
   * Report feedback complaint or product issue
   *
   * Submit a complaint about a feedback or report a product issue.
   * Use values from getSupplierValuations() for reason codes.
   *
   * **Note**: Feedback ID is not validated. Invalid IDs won't return an error.
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param request - Complaint request with feedback ID and reason codes
   * @returns Promise resolving when complaint is submitted (204 No Content)
   *
   * @throws {ValidationError} When feedback ID is missing
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Report feedback as not related to product
   * await sdk.communications.reportFeedbackAction({
   *   id: 'J2FMRjUj6hwvwCElqssz',
   *   supplierFeedbackValuation: 1 // "Отзыв не относится к товару"
   * });
   *
   * // Report product issue - damaged during delivery
   * await sdk.communications.reportFeedbackAction({
   *   id: 'J2FMRjUj6hwvwCElqssz',
   *   supplierProductValuation: 1 // "Повредили при доставке"
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1actions/post}
   */
  async reportFeedbackAction(request: FeedbackActionRequest): Promise<void> {
    if (!request.id || request.id.trim() === '') {
      throw new ValidationError('Feedback ID is required');
    }

    await this.client.post(
      'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/actions',
      request,
      { rateLimitKey: 'communications.reportFeedbackAction' }
    );
  }

  /**
   * Get archived feedbacks list
   *
   * Returns list of archived feedbacks. A feedback becomes archived when:
   * - Response was sent
   * - No response within 30 days
   * - Feedback has no text or photos
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param filters - Filter parameters (take and skip are required)
   * @returns Promise resolving to archived feedbacks list
   *
   * @throws {ValidationError} When required parameters missing
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get first page of archived feedbacks
   * const archived = await sdk.communications.getArchivedFeedbacks({
   *   take: 100,
   *   skip: 0,
   *   order: 'dateDesc'
   * });
   *
   * for (const feedback of archived.data.feedbacks) {
   *   console.log(`Rating: ${feedback.productValuation}/5`);
   *   console.log(`Text: ${feedback.text}`);
   *   if (feedback.answer) {
   *     console.log(`Answer: ${feedback.answer.text}`);
   *   }
   * }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1archive/get}
   */
  async getArchivedFeedbacks(filters: ArchivedFeedbacksFilters): Promise<ArchivedFeedbacksResponse> {
    if (filters.take < 1) {
      throw new ValidationError('take parameter must be positive');
    }
    if (filters.take > 5000) {
      throw new ValidationError('take cannot exceed 5000');
    }
    if (filters.skip < 0) {
      throw new ValidationError('skip parameter cannot be negative');
    }

    const queryParams: Record<string, string> = {
      take: filters.take.toString(),
      skip: filters.skip.toString(),
    };

    if (filters.nmId !== undefined) {
      queryParams.nmId = filters.nmId.toString();
    }
    if (filters.order) {
      queryParams.order = filters.order;
    }

    return this.client.get<ArchivedFeedbacksResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/archive',
      {
        params: queryParams,
        rateLimitKey: 'communications.getArchivedFeedbacks',
      }
    );
  }

  /**
   * Download file from chat message
   *
   * Downloads a file or image from a chat message by its ID.
   * File ID can be found in the `downloadID` field from getChatEvents().
   *
   * **Rate Limit**: 10 requests per 10 seconds
   *
   * @param fileId - File ID from downloadID field in chat events
   * @returns Promise resolving to file binary data (PDF, JPEG, PNG)
   *
   * @throws {ValidationError} When file ID is missing
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get file ID from chat events
   * const events = await sdk.communications.getChatEvents();
   * const fileEvent = events.result.events.find(e =>
   *   e.attachments?.files?.length > 0
   * );
   *
   * if (fileEvent && fileEvent.attachments?.files?.[0]) {
   *   const fileId = fileEvent.attachments.files[0].downloadID;
   *   const fileData = await sdk.communications.downloadChatFile(fileId);
   *   // Save or process file data
   * }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1download~1%7Bid%7D/get}
   */
  async downloadChatFile(fileId: string): Promise<ArrayBuffer> {
    if (!fileId || fileId.trim() === '') {
      throw new ValidationError('File ID is required');
    }

    return this.client.get<ArrayBuffer>(
      `https://buyer-chat-api.wildberries.ru/api/v1/seller/download/${encodeURIComponent(fileId)}`,
      {
        rateLimitKey: 'communications.downloadChatFile',
        responseType: 'arraybuffer',
      }
    );
  }

  /**
   * Get customer return claims
   *
   * Returns customer return claims for the last 14 days.
   * You can respond to these claims using respondToClaim().
   *
   * **Rate Limit**: 20 requests per minute (3 second interval)
   *
   * @param filters - Optional filters for claims list
   * @returns Promise resolving to claims list with total count
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When parameters are invalid
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get all pending claims
   * const claims = await sdk.communications.getClaims();
   * console.log(`Total claims: ${claims.total}`);
   *
   * for (const claim of claims.claims) {
   *   console.log(`Claim ${claim.id}:`);
   *   console.log(`  Product: ${claim.imt_name} (${claim.nm_id})`);
   *   console.log(`  Status: ${claim.status}`);
   *   console.log(`  Customer comment: ${claim.user_comment}`);
   *   console.log(`  Available actions: ${claim.actions.join(', ')}`);
   * }
   *
   * // Filter by product
   * const productClaims = await sdk.communications.getClaims({
   *   nm_id: 196320101,
   *   limit: 10
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get}
   */
  async getClaims(filters?: ClaimsFilters): Promise<ClaimsResponse> {
    const queryParams: Record<string, string> = {};

    if (filters) {
      if (filters.is_archive !== undefined) {
        queryParams.is_archive = filters.is_archive.toString();
      }
      if (filters.id) {
        queryParams.id = filters.id;
      }
      if (filters.limit !== undefined) {
        queryParams.limit = filters.limit.toString();
      }
      if (filters.offset !== undefined) {
        queryParams.offset = filters.offset.toString();
      }
      if (filters.nm_id !== undefined) {
        queryParams.nm_id = filters.nm_id.toString();
      }
    }

    return this.client.get<ClaimsResponse>(
      'https://returns-api.wildberries.ru/api/v1/claims',
      {
        params: queryParams,
        rateLimitKey: 'communications.getClaims',
      }
    );
  }

  /**
   * Respond to customer return claim
   *
   * Send response to a customer return claim. Use actions from
   * the claim's `actions` array obtained from getClaims().
   *
   * **Available actions:**
   * - `approve1`: Approve with defect check
   * - `approve2`: Approve and return product to seller
   * - `autorefund1`: Approve without product return
   * - `reject1`: Reject - defect not found
   * - `reject2`: Reject - need more photos/videos
   * - `reject3`: Reject - go to service center
   * - `rejectcustom`: Reject with custom comment (requires `comment`)
   * - `approvecc1`: Approve for in-store pickup return
   * - `confirmreturngoodcc1`: Confirm pickup receipt
   *
   * **Rate Limit**: 20 requests per minute (3 second interval)
   *
   * @param request - Response request with claim ID and action
   * @returns Promise resolving when response is sent
   *
   * @throws {ValidationError} When required parameters missing
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Approve claim with defect check
   * await sdk.communications.respondToClaim({
   *   id: 'fe3e9337-e9f9-423c-8930-946a8ebef80',
   *   action: 'approve1'
   * });
   *
   * // Reject with custom comment
   * await sdk.communications.respondToClaim({
   *   id: 'fe3e9337-e9f9-423c-8930-946a8ebef80',
   *   action: 'rejectcustom',
   *   comment: 'Фото не соответствует товару в заявке'
   * });
   *
   * // Approve without product return
   * await sdk.communications.respondToClaim({
   *   id: 'fe3e9337-e9f9-423c-8930-946a8ebef80',
   *   action: 'autorefund1'
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claim/patch}
   */
  async respondToClaim(request: RespondToClaimRequest): Promise<void> {
    if (!request.id || request.id.trim() === '') {
      throw new ValidationError('Claim ID is required');
    }
    if (!request.action || request.action.trim() === '') {
      throw new ValidationError('Action is required');
    }
    if (request.action === 'rejectcustom' && (!request.comment || request.comment.trim() === '')) {
      throw new ValidationError('Comment is required for rejectcustom action');
    }
    if (request.comment && request.comment.length < 10) {
      throw new ValidationError('Comment must be at least 10 characters');
    }
    if (request.comment && request.comment.length > 1000) {
      throw new ValidationError('Comment cannot exceed 1000 characters');
    }

    await this.client.patch(
      'https://returns-api.wildberries.ru/api/v1/claim',
      request,
      { rateLimitKey: 'communications.respondToClaim' }
    );
  }

  /**
   * Request product return by feedback ID
   *
   * Requests return of a product associated with a feedback review.
   * Only available for feedbacks where `isAbleReturnProductOrders` is `true`.
   *
   * **Prerequisites**:
   * - Feedback must have `isAbleReturnProductOrders: true`
   * - Use getReviews() to find eligible feedbacks
   *
   * **Rate Limit**: 3 requests per second (burst: 6)
   *
   * @param request - Request with feedbackId
   * @returns Promise resolving to return request result
   *
   * @throws {ValidationError} When feedbackId is missing or empty
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // First, find eligible feedbacks
   * const reviews = await sdk.communications.getReviews({
   *   isAnswered: true,
   *   take: 100,
   *   skip: 0
   * });
   *
   * // Filter for returnable reviews
   * const returnable = reviews.data.feedbacks.filter(
   *   f => f.isAbleReturnProductOrders
   * );
   *
   * // Request return for a feedback
   * if (returnable.length > 0) {
   *   const result = await sdk.communications.requestReturnByFeedback({
   *     feedbackId: returnable[0].id
   *   });
   *
   *   if (!result.error) {
   *     console.log('Return requested successfully');
   *   } else {
   *     console.error('Failed:', result.errorText);
   *   }
   * }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1order~1return/post}
   */
  async requestReturnByFeedback(
    request: ReturnByFeedbackRequest
  ): Promise<ReturnByFeedbackResponse> {
    if (!request.feedbackId || request.feedbackId.trim() === '') {
      throw new ValidationError('Feedback ID is required');
    }

    return this.client.post<ReturnByFeedbackResponse>(
      'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/order/return',
      request,
      { rateLimitKey: 'communications.requestReturnByFeedback' }
    );
  }
}
