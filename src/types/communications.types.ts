/**
 * Communications Module Types
 * Generated from wildberries_api_doc/09-communications.yaml
 *
 * This module provides types for:
 * 1. Chat with Customers - Real-time messaging with buyers
 * 2. Product Q&A - Managing customer questions about products
 * 3. Customer Reviews - Responding to product reviews with photos/videos
 *
 * @module communications.types
 */

/**
 * Order information attached to a chat message
 */
export interface GoodCard {
  /**
   * Order date
   */
  date: string;

  /**
   * @deprecated This field will be removed. Use separate method for customer return requests.
   * Whether return is requested:
   * - `false` — not requested
   * - `true` — requested
   */
  needRefund?: boolean;

  /**
   * Wildberries product ID (nmID)
   */
  nmID: number;

  /**
   * Actual price with all discounts applied (charged to customer)
   */
  price: number;

  /**
   * Currency code (e.g., 'RUB')
   */
  priceCurrency: string;

  /**
   * Unique order ID
   * Note: `rid` is equivalent to `srid` in Orders/Sales API responses
   */
  rid: string;

  /**
   * Product size (corresponds to `wbSize` in product card)
   */
  size: string;

  /**
   * Product order status:
   * - `0` — Active
   * - `1` — Created
   * - `2` — Being collected
   * - `3` — In transit
   * - `4` — Waiting at pickup point
   * - `5` — With courier
   * - `10` — Archived
   * - `11` — Purchased
   * - `12` — Cancelled
   * - `13` — Return requested
   * - `14` — Cancelled (out of stock)
   */
  statusID: number;
}

/**
 * Chat conversation object
 */
export interface Chat {
  /**
   * Chat ID
   * @example "1:4019cd7d-cca8-4e90-8b11-f78afbea42e3"
   */
  chatID: string;

  /**
   * Chat signature required for sending messages
   * Use this value as the `replySign` parameter when calling sendMessage()
   * @example "1:4019cd7d-cca8-4e90-8b11-f78afbea42e3:54828159:bc3a4c04079f5956cff170b25e73523aa1208b5c0bd7aea1e520a64ae3e212b1ebae6712661f3afd27520fa785fa3042254e8a3100ce00644322054ae7cfcd0e"
   */
  replySign: string;

  /**
   * Customer ID
   * @example "123456"
   */
  clientID: string;

  /**
   * Customer name
   * @example "Иван"
   */
  clientName: string;

  /**
   * Order information associated with the chat
   */
  goodCard?: GoodCard;
}

/**
 * Response from getChats() method
 */
export interface ChatsResponse {
  /**
   * Array of chat conversations
   */
  result: Chat[];

  /**
   * Error messages, if any
   */
  errors: string[] | null;
}

/**
 * Event type enum
 */
export enum EventType {
  /**
   * Message event
   */
  MESSAGE = 'message',
}

/**
 * Message sender enum
 */
export enum Sender {
  /**
   * Message sent by customer
   */
  CLIENT = 'client',

  /**
   * Message sent by seller
   */
  SELLER = 'seller',

  /**
   * Message sent by Wildberries system
   */
  WB = 'wb',
}

/**
 * File attachment in chat event
 */
export interface EventFile {
  /**
   * MIME type of the file
   * @example "application/pdf"
   */
  contentType: string;

  /**
   * Upload date
   */
  date: string;

  /**
   * File download ID (use with download endpoint)
   */
  downloadID: string;

  /**
   * Original file name
   * @example "Чек.pdf"
   */
  name: string;

  /**
   * Direct URL for file download
   */
  url: string;

  /**
   * File size in bytes
   */
  size: number;
}

/**
 * Image attachment in chat event
 */
export interface EventImage {
  /**
   * Upload date
   */
  date: string;

  /**
   * Image download ID (use with download endpoint)
   */
  downloadID: string;

  /**
   * Direct URL for image download
   */
  url: string;
}

/**
 * Attachments in chat event message
 */
export interface EventAttachments {
  /**
   * Order information
   */
  goodCard?: GoodCard;

  /**
   * File attachments (PDF, etc.)
   */
  files?: EventFile[];

  /**
   * Image attachments (JPEG, PNG)
   */
  images?: EventImage[];
}

/**
 * Message content in chat event
 */
export interface EventMessage {
  /**
   * Message text content
   */
  text?: string;

  /**
   * Attachments included in the message
   */
  attachments?: EventAttachments;
}

/**
 * Chat event object
 * Represents a message or activity in the chat conversation
 */
export interface ChatEvent {
  /**
   * Chat ID this event belongs to
   */
  chatID: string;

  /**
   * Unique event ID
   */
  eventID: string;

  /**
   * Event type (currently only 'message')
   */
  eventType: EventType | string;

  /**
   * Indicates if this is a new chat
   * - `false` — existing chat
   * - `true` — new chat (replySign will be available)
   */
  isNewChat: boolean;

  /**
   * Message content and attachments
   */
  message?: EventMessage;

  /**
   * Message source platform:
   * - `seller-portal` — seller portal
   * - `seller-public-api` — Chat API
   * - `rusite` — customer portal
   * - `global` — global.wildberries.ru
   * - `ios` — iOS mobile app
   * - `android` — Android mobile app
   */
  source: string;

  /**
   * Event timestamp (Unix timestamp with milliseconds)
   * @example 1698037340000
   */
  addTimestamp: number;

  /**
   * Event timestamp in UTC (RFC 3339 format)
   * @example "2023-10-23T05:02:20Z"
   */
  addTime: string;

  /**
   * Chat signature for sending replies
   * Only available when `isNewChat: true`
   * Use this value as the `replySign` parameter when calling sendMessage()
   */
  replySign?: string;

  /**
   * Message sender
   */
  sender: Sender | string;

  /**
   * Customer ID
   */
  clientID: string;

  /**
   * Customer name
   */
  clientName: string;
}

/**
 * Result object containing events and pagination data
 */
export interface EventsResult {
  /**
   * Cursor for next page (Unix timestamp with milliseconds)
   * Use this value in the next getChatEvents() call to fetch subsequent events
   */
  next: number;

  /**
   * Timestamp of newest event in response (RFC 3339 format)
   */
  newestEventTime: string | null;

  /**
   * Timestamp of oldest event in response (RFC 3339 format)
   */
  oldestEventTime: string | null;

  /**
   * Number of events in this response
   * When `totalEvents` is 0, there are no more events to fetch
   */
  totalEvents: number;

  /**
   * Array of chat events
   */
  events: ChatEvent[];
}

/**
 * Response from getChatEvents() method
 */
export interface EventsResponse {
  /**
   * Events result with pagination
   */
  result: EventsResult;

  /**
   * Error messages, if any
   */
  errors: string[] | null;
}

/**
 * Response from sendMessage() method
 */
export interface MessageResponse {
  /**
   * Message send result
   */
  result: {
    /**
     * Message upload timestamp (Unix timestamp with milliseconds)
     */
    addTime: number;

    /**
     * Chat ID where message was sent
     */
    chatID: string;
  };

  /**
   * File upload errors, if any
   */
  errors: string[];
}

/**
 * Request parameters for sendMessage() method
 * Note: This is sent as multipart/form-data, not JSON
 */
export interface SendMessageRequest {
  /**
   * Chat signature (required)
   * Obtain from Chat.replySign or Event.replySign (when isNewChat=true)
   */
  replySign: string;

  /**
   * Message text (optional, max 1000 characters)
   * At least one of message or file must be provided
   */
  message?: string;

  /**
   * File attachments (optional)
   * Formats: JPEG, PDF, PNG
   * Max size: 5MB per file, 30MB total
   */
  files?: File[] | Blob[];
}

// ============================================================================
// Product Q&A Types
// ============================================================================

/**
 * Filter criteria for retrieving product questions
 */
export interface QuestionFilters {
  /**
   * Whether question has been answered (required)
   * - `true` — answered questions
   * - `false` — unanswered questions
   */
  isAnswered: boolean;

  /**
   * Wildberries product ID to filter by (optional)
   * Filter questions for a specific product
   */
  nmId?: number;

  /**
   * Number of questions to retrieve (required)
   * Maximum allowed: 10,000
   * Note: take + skip must not exceed 10,000
   */
  take: number;

  /**
   * Number of questions to skip for pagination (required)
   * Maximum allowed: 10,000
   * Note: take + skip must not exceed 10,000
   */
  skip: number;

  /**
   * Sort order by date (optional)
   * - `dateAsc` — oldest first
   * - `dateDesc` — newest first (default)
   */
  order?: 'dateAsc' | 'dateDesc';

  /**
   * Filter start date (Unix timestamp) (optional)
   */
  dateFrom?: number;

  /**
   * Filter end date (Unix timestamp) (optional)
   */
  dateTo?: number;

  /**
   * Index signature for compatibility with HTTP client params
   */
  [key: string]: unknown;
}

/**
 * Question state enum
 */
export enum QuestionState {
  /**
   * Question rejected by seller (not visible to customers)
   */
  NONE = 'none',

  /**
   * Answer provided and visible on customer portal
   */
  WB_RU = 'wbRu',

  /**
   * New question from customer awaiting response
   */
  SUPPLIERS_PORTAL_SYNCH = 'suppliersPortalSynch',
}

/**
 * Answer to a customer question
 */
export interface QuestionAnswer {
  /**
   * Answer text content
   */
  text: string;

  /**
   * Whether answer can be edited
   * - `false` — cannot edit (60 days passed or not editable)
   * - `true` — can edit (within 60 days, edit once allowed)
   */
  editable: boolean;

  /**
   * Answer creation timestamp (ISO 8601)
   * @example "2024-01-16T10:00:00Z"
   */
  createDate: string;
}

/**
 * Product information in question
 */
export interface QuestionProductDetails {
  /**
   * Wildberries product ID (nmId)
   */
  nmId: number;

  /**
   * Product card ID
   */
  imtId: number;

  /**
   * Product name
   */
  productName: string;

  /**
   * Seller's article/SKU
   */
  supplierArticle: string;

  /**
   * Seller name
   */
  supplierName: string;

  /**
   * Brand name
   */
  brandName: string;

  /**
   * Product size
   * @deprecated This field will be deprecated
   */
  size: string;
}

/**
 * Customer question object
 */
export interface Question {
  /**
   * Question ID
   */
  id: string;

  /**
   * Question text from customer
   */
  text: string;

  /**
   * Question creation timestamp (ISO 8601)
   * @example "2022-02-01T11:18:08.769513469Z"
   */
  createdDate: string;

  /**
   * Question state/status
   */
  state: QuestionState | string;

  /**
   * Answer to question (null if not answered)
   */
  answer: QuestionAnswer | null;

  /**
   * Product information
   */
  productDetails: QuestionProductDetails;

  /**
   * Whether seller has viewed the question
   */
  wasViewed: boolean;

  /**
   * Whether question is suspicious
   * If `true`, question is published but marked with warning banner
   */
  isWarned: boolean;
}

/**
 * Response from getQuestions() method
 */
export interface QuestionsResponse {
  /**
   * Questions data
   */
  data: {
    /**
     * Count of unanswered questions
     */
    countUnanswered: number;

    /**
     * Count of answered/archived questions
     */
    countArchive: number;

    /**
     * Array of questions
     */
    questions: Question[];
  };

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText: string;

  /**
   * Additional errors array
   */
  additionalErrors: string[] | null;
}

/**
 * Request payload for answering a question
 * Used internally by answerQuestion() method
 */
export interface AnswerQuestionRequest {
  /**
   * Question ID
   */
  id: string;

  /**
   * Answer object
   */
  answer: {
    /**
     * Answer text
     */
    text: string;
  };

  /**
   * Question state after answer
   * - `none` — reject question (not visible to customers)
   * - `wbRu` — answer visible to customers
   */
  state: 'none' | 'wbRu';
}

/**
 * Request payload for marking question as viewed
 * Used internally by markQuestionViewed() method
 */
export interface MarkQuestionViewedRequest {
  /**
   * Question ID
   */
  id: string;

  /**
   * Mark as viewed
   */
  wasViewed: boolean;
}

// ============================================================================
// Customer Reviews Types
// ============================================================================

/**
 * Filter criteria for retrieving customer reviews
 */
export interface ReviewFilters {
  /**
   * Whether review has been answered (required)
   * - `true` — answered/processed reviews
   * - `false` — unanswered/unprocessed reviews
   */
  isAnswered: boolean;

  /**
   * Wildberries product ID to filter by (optional)
   * Filter reviews for a specific product
   */
  nmId?: number;

  /**
   * Number of reviews to retrieve (required)
   * Maximum allowed: 5,000
   */
  take: number;

  /**
   * Number of reviews to skip for pagination (required)
   * Maximum allowed: 199,990
   */
  skip: number;

  /**
   * Sort order by date (optional)
   * - `dateAsc` — oldest first
   * - `dateDesc` — newest first (default)
   */
  order?: 'dateAsc' | 'dateDesc';

  /**
   * Filter start date (Unix timestamp) (optional)
   */
  dateFrom?: number;

  /**
   * Filter end date (Unix timestamp) (optional)
   */
  dateTo?: number;

  /**
   * Index signature for compatibility with HTTP client params
   */
  [key: string]: unknown;
}

/**
 * Review state enum
 */
export enum ReviewState {
  /**
   * New/unprocessed review
   */
  NONE = 'none',

  /**
   * Processed review (visible on site)
   */
  WB_RU = 'wbRu',
}

/**
 * Review answer state enum
 */
export enum ReviewAnswerState {
  /**
   * New response
   */
  NONE = 'none',

  /**
   * Response visible on customer portal
   */
  WB_RU = 'wbRu',

  /**
   * Response under review
   */
  REVIEW_REQUIRED = 'reviewRequired',

  /**
   * Response rejected
   */
  REJECTED = 'rejected',
}

/**
 * Seller's response to a review
 */
export interface ReviewAnswer {
  /**
   * Response text
   */
  text: string;

  /**
   * Response state/status
   */
  state: ReviewAnswerState | string;

  /**
   * Whether response can be edited
   * - `false` — cannot edit (60 days passed or already edited)
   * - `true` — can edit (within 60 days, edit once allowed)
   */
  editable: boolean;
}

/**
 * Product information in review
 */
export interface ReviewProductDetails {
  /**
   * Wildberries product ID (nmId)
   */
  nmId: number;

  /**
   * Product card ID
   */
  imtId: number;

  /**
   * Product name
   */
  productName: string;

  /**
   * Seller's article/SKU
   */
  supplierArticle: string | null;

  /**
   * Seller name
   */
  supplierName: string | null;

  /**
   * Brand name
   */
  brandName: string | null;

  /**
   * Product size (techSize in product card)
   */
  size: string;
}

/**
 * Photo link in review
 */
export interface ReviewPhoto {
  /**
   * Full-size photo URL
   * @example "https://feedback04.wbbasket.ru/vol1333/part133337/123456789/photos/fs.jpg"
   */
  fullSize: string;

  /**
   * Thumbnail photo URL
   * @example "https://feedback04.wbbasket.ru/vol1333/part133337/123456789/photos/ms.jpg"
   */
  miniSize: string;
}

/**
 * Video in review
 */
export interface ReviewVideo {
  /**
   * Video preview image URL
   * @example "https://videofeedback01.wbbasket.ru/8defc853-7f62-4d6d-b236-8a16cfb63128/preview.webp"
   */
  previewImage: string;

  /**
   * HLS playlist URL (index.m3u8)
   * @example "https://videofeedback01.wbbasket.ru/8defc853-7f62-4d6d-b236-8a16cfb63128/index.m3u8"
   */
  link: string;

  /**
   * Video duration in seconds
   */
  durationSec: number;
}

/**
 * Customer review object
 */
export interface Review {
  /**
   * Review ID
   */
  id: string;

  /**
   * Review text content
   */
  text: string;

  /**
   * Product pros/advantages
   */
  pros: string;

  /**
   * Product cons/disadvantages
   */
  cons: string;

  /**
   * Product rating (1-5 stars)
   */
  productValuation: number;

  /**
   * Review creation timestamp (ISO 8601)
   * @example "2024-09-26T10:20:48+03:00"
   */
  createdDate: string;

  /**
   * Seller's response to review (null if not answered)
   */
  answer: ReviewAnswer | null;

  /**
   * Review state/status
   */
  state: ReviewState | string;

  /**
   * Product information
   */
  productDetails: ReviewProductDetails;

  /**
   * Customer photos attached to review
   */
  photoLinks: ReviewPhoto[] | null;

  /**
   * Customer video attached to review (HLS format)
   */
  video: ReviewVideo | null;

  /**
   * Whether seller has viewed the review
   */
  wasViewed: boolean;

  /**
   * Customer name
   * @example "Николай"
   */
  userName: string;

  /**
   * Product size fit feedback:
   * - ` ` (empty) — for non-sized products
   * - `ok` — fits as expected
   * - `smaller` — runs small
   * - `bigger` — runs large
   */
  matchingSize: string;

  /**
   * Whether seller can file complaint about review
   */
  isAbleSupplierFeedbackValuation: boolean;

  /**
   * Complaint reason key (if filed)
   * See supplier-valuations endpoint for reason mapping
   */
  supplierFeedbackValuation: number;

  /**
   * Whether seller can report product issue
   */
  isAbleSupplierProductValuation: boolean;

  /**
   * Product issue key (if reported)
   * See supplier-valuations endpoint for issue mapping
   */
  supplierProductValuation: number;

  /**
   * Whether product return is available
   */
  isAbleReturnProductOrders: boolean;

  /**
   * Product return request timestamp (ISO 8601)
   */
  returnProductOrdersDate: string | null;

  /**
   * Customer tags/labels
   * @example ["price", "quality"]
   */
  bables: string[] | null;

  /**
   * Product barcode (shkId)
   */
  lastOrderShkId: number;

  /**
   * Purchase date (ISO 8601)
   * @example "2024-08-12T10:20:48+03:00"
   */
  lastOrderCreatedAt: string;

  /**
   * Product color
   * @example "blue", "colorless"
   */
  color: string;

  /**
   * Product category ID
   */
  subjectId: number;

  /**
   * Product category name
   * @example "Футболки-поло"
   */
  subjectName: string;

  /**
   * Parent review ID (null if this is the initial review)
   */
  parentFeedbackId: string | null;

  /**
   * Child review ID (null if this is the updated review)
   */
  childFeedbackId: string | null;
}

/**
 * Response from getReviews() method
 */
export interface ReviewsResponse {
  /**
   * Reviews data
   */
  data: {
    /**
     * Count of unanswered/unprocessed reviews
     */
    countUnanswered: number;

    /**
     * Count of answered/processed reviews
     */
    countArchive: number;

    /**
     * Array of customer reviews
     */
    feedbacks: Review[];
  };

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText: string;

  /**
   * Additional errors array
   */
  additionalErrors: string[] | null;
}

/**
 * Request payload for responding to a review
 * Used by both respondToReview() and editReviewResponse() methods
 */
export interface RespondToReviewRequest {
  /**
   * Review ID
   */
  id: string;

  /**
   * Response text (min 2, max 5000 characters)
   */
  text: string;
}

// ============================================================================
// Questions Monitoring Types (Task 7.4.1)
// ============================================================================

/**
 * Response from getNewFeedbacksQuestions() method
 * Returns indicators for new unviewed feedbacks and questions
 */
export interface NewFeedbacksQuestionsResponse {
  /**
   * Whether there are new unviewed questions
   */
  hasNewQuestions: boolean;

  /**
   * Whether there are new unviewed feedbacks/reviews
   */
  hasNewFeedbacks: boolean;

  /**
   * Count of new unviewed questions
   */
  newQuestionsCount?: number;

  /**
   * Count of new unviewed feedbacks
   */
  newFeedbacksCount?: number;

  /**
   * Timestamp of last check (ISO 8601)
   */
  lastCheckTime: string;

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText?: string;

  /**
   * Additional errors array
   */
  additionalErrors?: string[];
}

/**
 * Response from getQuestionsCountUnanswered() method
 * Returns dashboard metrics for unanswered questions
 */
export interface QuestionsCountUnansweredResponse {
  /**
   * Total count of unanswered questions
   */
  countUnanswered: number;

  /**
   * Count of unanswered questions received today
   */
  countUnansweredToday: number;

  /**
   * Count of unanswered questions from this week
   */
  countUnansweredWeek?: number;

  /**
   * Count of unanswered questions from this month
   */
  countUnansweredMonth?: number;

  /**
   * Breakdown by product categories (if available)
   */
  byCategories?: {
    categoryId: number;
    categoryName: string;
    count: number;
  }[];

  /**
   * Average response time for recently answered questions (in hours)
   */
  averageResponseTimeHours?: number;

  /**
   * Timestamp when this data was last updated (ISO 8601)
   */
  lastUpdated: string;

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText?: string;

  /**
   * Additional errors array
   */
  additionalErrors?: string[];
}

/**
 * Enhanced question details with additional metadata
 * Used in getQuestionById() response
 */
export interface QuestionDetails extends Question {
  /**
   * Question priority based on age and product importance
   */
  priority: 'low' | 'medium' | 'high' | 'urgent';

  /**
   * Hours since question was asked
   */
  hoursSinceCreation: number;

  /**
   * Customer's purchase history (if available)
   */
  customerHistory?: {
    totalOrders: number;
    totalSpent: number;
    lastOrderDate?: string;
    isVipCustomer: boolean;
  };

  /**
   * Product sales performance (last 30 days)
   */
  productPerformance?: {
    totalSales: number;
    averageRating: number;
    questionsPerDay: number;
    conversionRate: number;
  };

  /**
   * Suggested response templates based on question content
   */
  suggestedTemplates?: {
    templateId: string;
    templateName: string;
    matchScore: number;
    preview: string;
  }[];

  /**
   * Related questions from same customer or about same product
   */
  relatedQuestions?: {
    questionId: string;
    questionText: string;
    similarity: number;
  }[];

  /**
   * Whether this question requires urgent attention
   */
  requiresUrgentAttention: boolean;

  /**
   * Recommended response time based on customer tier and question type
   */
  recommendedResponseTime: 'immediate' | 'within_1_hour' | 'within_4_hours' | 'within_24_hours';

  /**
   * Auto-generated sentiment analysis
   */
  sentiment?: {
    score: number; // -1 to 1, where negative indicates dissatisfaction
    sentiment: 'positive' | 'neutral' | 'negative';
    keywords: string[];
  };
}

/**
 * Response from getQuestionById() method
 * Returns detailed information about a specific question
 */
export interface QuestionByIdResponse {
  /**
   * Detailed question information with additional metadata
   */
  data: QuestionDetails;

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText?: string;

  /**
   * Additional errors array
   */
  additionalErrors?: string[];
}

// ============================================================================
// Response Template System Types (Task 7.4.2)
// ============================================================================

/**
 * Response template category for organization and filtering
 */
export type TemplateCategory =
  | 'general' // General responses for common questions
  | 'product_info' // Product-specific information responses
  | 'shipping' // Shipping and delivery related responses
  | 'returns' // Returns and refund related responses
  | 'technical' // Technical support responses
  | 'billing' // Payment and billing related responses
  | 'complaints' // Customer complaint handling responses
  | 'feedback' // Feedback and review responses
  | 'promotions' // Promotional and sales responses
  | 'custom'; // Custom user-defined categories

/**
 * Template usage statistics and performance metrics
 */
export interface TemplateUsage {
  /**
   * Number of times this template has been used
   */
  totalUses: number;

  /**
   * Number of times this template was used in the last 30 days
   */
  last30Days: number;

  /**
   * Number of times this template was used today
   */
  today: number;

  /**
   * Average response time when using this template (in minutes)
   */
  averageResponseTimeMin: number;

  /**
   * Customer satisfaction rating for responses using this template (1-5)
   */
  customerSatisfaction?: number;

  /**
   * Last time this template was used (ISO 8601)
   */
  lastUsed?: string;

  /**
   * Usage trend: 'increasing', 'stable', 'decreasing'
   */
  usageTrend: 'increasing' | 'stable' | 'decreasing';
}

/**
 * Template performance metrics
 */
export interface TemplateMetrics {
  /**
   * Usage statistics
   */
  usage: TemplateUsage;

  /**
   * Effectiveness score based on customer response time and satisfaction
   */
  effectivenessScore: number; // 0-100

  /**
   * Suggested improvements based on performance data
   */
  suggestedImprovements?: string[];

  /**
   * A/B test results if template variants exist
   */
  abTestResults?: {
    variantA: { uses: number; satisfaction: number };
    variantB: { uses: number; satisfaction: number };
    winner: 'A' | 'B' | 'inconclusive';
  };
}

/**
 * Template variable for dynamic content insertion
 */
export interface TemplateVariable {
  /**
   * Variable name (used in template content as {{variable_name}})
   */
  name: string;

  /**
   * Variable display name for UI
   */
  displayName: string;

  /**
   * Variable type
   */
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multiline';

  /**
   * Whether this variable is required
   */
  required: boolean;

  /**
   * Default value for the variable
   */
  defaultValue?: string;

  /**
   * Available options (for 'select' type)
   */
  options?: string[];

  /**
   * Variable description/help text
   */
  description?: string;

  /**
   * Regular expression for validation (optional)
   */
  validationPattern?: string;

  /**
   * Maximum length for text variables
   */
  maxLength?: number;
}

/**
 * Response template for customer communication
 */
export interface Template {
  /**
   * Unique template identifier
   */
  id: string;

  /**
   * Template name for identification and search
   */
  name: string;

  /**
   * Template content with variable placeholders ({{variable_name}})
   */
  content: string;

  /**
   * Template category for organization
   */
  category: TemplateCategory;

  /**
   * Short description of template purpose
   */
  description: string;

  /**
   * Keywords for template search and matching
   */
  keywords: string[];

  /**
   * Template creation timestamp (ISO 8601)
   */
  createdAt: string;

  /**
   * Template last update timestamp (ISO 8601)
   */
  updatedAt: string;

  /**
   * User who created this template
   */
  createdBy: string;

  /**
   * User who last updated this template
   */
  updatedBy: string;

  /**
   * Whether template is currently active
   */
  isActive: boolean;

  /**
   * Variables that can be used in this template
   */
  variables: TemplateVariable[];

  /**
   * Template usage statistics and performance metrics
   */
  metrics: TemplateMetrics;

  /**
   * Language code for the template (e.g., 'ru', 'en')
   */
  language: string;

  /**
   * Template priority in suggestion algorithms (higher = more likely to be suggested)
   */
  priority: number; // 1-10

  /**
   * Tags for additional categorization and filtering
   */
  tags: string[];

  /**
   * Whether this template is a system template (not editable by users)
   */
  isSystemTemplate: boolean;

  /**
   * Template usage guidelines and best practices
   */
  usageGuidelines?: string;

  /**
   * Examples of how to use this template effectively
   */
  examples?: string[];

  /**
   * Related template IDs for cross-referencing
   */
  relatedTemplateIds?: string[];
}

/**
 * Request payload for creating or updating a template
 */
export interface TemplateData {
  /**
   * Template name for identification and search
   */
  name: string;

  /**
   * Template content with variable placeholders
   */
  content: string;

  /**
   * Template category for organization
   */
  category: TemplateCategory;

  /**
   * Short description of template purpose
   */
  description?: string;

  /**
   * Keywords for template search and matching
   */
  keywords?: string[];

  /**
   * Variables that can be used in this template
   */
  variables?: TemplateVariable[];

  /**
   * Whether template should be active
   */
  isActive?: boolean;

  /**
   * Language code for the template
   */
  language?: string;

  /**
   * Template priority in suggestion algorithms
   */
  priority?: number;

  /**
   * Tags for additional categorization
   */
  tags?: string[];

  /**
   * Template usage guidelines
   */
  usageGuidelines?: string;

  /**
   * Examples of template usage
   */
  examples?: string[];

  /**
   * Related template IDs
   */
  relatedTemplateIds?: string[];
}

/**
 * Filter criteria for retrieving templates
 */
export interface TemplateFilters {
  /**
   * Filter by template category
   */
  category?: TemplateCategory;

  /**
   * Filter by language code
   */
  language?: string;

  /**
   * Filter by active status
   */
  isActive?: boolean;

  /**
   * Filter by keywords (search in name, content, description)
   */
  search?: string;

  /**
   * Filter by tags
   */
  tags?: string[];

  /**
   * Filter by creator user
   */
  createdBy?: string;

  /**
   * Filter by priority level (minimum)
   */
  minPriority?: number;

  /**
   * Filter by priority level (maximum)
   */
  maxPriority?: number;

  /**
   * Filter by usage count (minimum)
   */
  minUsageCount?: number;

  /**
   * Filter by creation date range (from)
   */
  createdFrom?: string;

  /**
   * Filter by creation date range (to)
   */
  createdTo?: string;

  /**
   * Sort templates by field
   */
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'usage' | 'priority' | 'effectiveness';

  /**
   * Sort order
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Number of templates to retrieve
   */
  limit?: number;

  /**
   * Number of templates to skip for pagination
   */
  offset?: number;
}

/**
 * Response from getTemplates() method
 */
export interface TemplatesResponse {
  /**
   * Array of templates matching the criteria
   */
  templates: Template[];

  /**
   * Total number of templates matching the criteria
   */
  total: number;

  /**
   * Whether there are more templates available
   */
  hasMore: boolean;

  /**
   * Next offset for pagination (if applicable)
   */
  nextOffset?: number;

  /**
   * Filter criteria applied (echoed back)
   */
  filters: TemplateFilters;

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText?: string;

  /**
   * Additional errors array
   */
  additionalErrors?: string[];
}

/**
 * Response from template operations (create/update/delete)
 */
export interface TemplateOperationResponse {
  /**
   * Whether the operation was successful
   */
  success: boolean;

  /**
   * Template ID (for create operations) or updated template (for update operations)
   */
  template?: Template;

  /**
   * Operation performed ('create', 'update', 'delete')
   */
  operation: 'create' | 'update' | 'delete';

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText?: string;

  /**
   * Additional errors array
   */
  additionalErrors?: string[];

  /**
   * Validation errors by field (for create/update operations)
   */
  validationErrors?: {
    field: string;
    message: string;
  }[];
}

/**
 * Template statistics summary
 */
export interface TemplateStats {
  /**
   * Total number of templates
   */
  totalTemplates: number;

  /**
   * Number of active templates
   */
  activeTemplates: number;

  /**
   * Templates by category
   */
  byCategory: {
    category: TemplateCategory;
    count: number;
    usage: number;
  }[];

  /**
   * Most used templates (top 10)
   */
  mostUsed: {
    templateId: string;
    name: string;
    usage: number;
    effectiveness: number;
  }[];

  /**
   * Templates with highest customer satisfaction
   */
  bestPerforming: {
    templateId: string;
    name: string;
    satisfaction: number;
    usage: number;
  }[];

  /**
   * Templates that need improvement
   */
  needsImprovement: {
    templateId: string;
    name: string;
    effectiveness: number;
    issues: string[];
  }[];

  /**
   * Overall template usage trends
   */
  usageTrends: {
    period: '7d' | '30d' | '90d';
    totalUsage: number;
    changePercent: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  }[];
}

/**
 * Response from getTemplateStats() method
 */
export interface TemplateStatsResponse {
  /**
   * Template statistics
   */
  data: TemplateStats;

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText?: string;

  /**
   * Additional errors array
   */
  additionalErrors?: string[];
}

// ============================================================================
// ============================================================================
// Return Request Processing Types (Task 7.4.3)
// ============================================================================

/**
 * Return request status enumeration
 */
/**
 * Return request with customer data and status
 */
export interface ReturnRequest {
  /**
   * Return request ID
   */
  id: string;

  /**
   * Return request date (ISO 8601)
   */
  createdAt: string;

  /**
   * Customer ID from GoodCard clientID (number converted to string)
   */
  customerID: string;

  /**
   * Order ID from GoodCard orderID (string)
   */
  orderUID: string;

  /**
   * Product details
   */
  product: ReturnProduct;

  /**
   * Return quantity
   */
  quantity: number;

  /**
   * Return price (seller price × quantity)
   */
  price: number;

  /**
   * Currency code (always 'RUB')
   */
  currency: string;

  /**
   * Current return status
   */
  status: ReturnStatus;

  /**
   * When return was created (Unix timestamp)
   */
  created: number;

  /**
   * When return was last updated (Unix timestamp)
   */
  updated: number;

  /**
   * Chat ID associated with this return (if any)
   */
  chatId?: string;

  /**
   * Chat message associated with this return (if any)
   */
  chatMessageId?: string;

  /**
   * Return images provided by customer (optional)
   */
  returnImages?: ReturnImage[];

  /**
   * Return tracking information
   */
  tracking: ReturnTracking;

  /**
   * Refund information (when applicable)
   */
  refund?: RefundInfo;

  /**
   * Performance metrics for return processing
   */
  metrics?: ReturnMetrics;

  /**
   /**
   * Customer's actual delivery address from GoodCard order
   */
  deliveryAddress?: CommunicationsAddress;
}

/**
 * Return tracking information
 */
export interface ReturnTracking {
  /**
   * Return tracking status (not to be confused with ReturnStatus)
   */
  status: 'created' | 'in_transit' | 'delivered' | 'returned' | 'canceled' | 'archived';

  /**
   * Return ID
   */
  id: number;

  /**
   * Return creation timestamp (ISO 8601)
   */
  createdAt: string;

  /**
   * Return last updated timestamp (ISO 8601)
   */
  updatedAt: string;

  /**
   /**
   * Return confirmation timestamp (ISO 8601)
   */
  confirmedAt: string;

  /**
   /**
   * Returns tracking ID from the WB API
   */
  wbReturnId?: string;

  /**
   * Return office ID where return was processed
   */
  returnId?: number;

  /**
   * Return office where return should be delivered
   */
  officeId?: number;

  /**
   * Return timestamp (ISO 8601)
   */
  returnDate: string;

  /**
   * Return delivery address
   */
  returnAddress?: CommunicationsAddress;
}

/**
 * Address for return delivery
 */
export interface CommunicationsAddress {
  /**
   * Delivery city
   */
  city: string;

  /**
   * Full address string from API
   */
  fullAddress: string;

  /**
   * Postal code
   */
  postalCode: string;

  /**
   * House number
   */
  house: string;

  /**
   * Street address
   */
  street: string;

  /**
   * Region
   */
  region: string;

  /**
   * Country
   */
  country: string;
}

/**
 * Return product information
 */
export interface ReturnProduct {
  /**
   * Wildberries product ID
   */
  nmId: number;

  /**
   * Warehouse ID where stock is available
   */
  warehouseId: number;

  /**
   * SKU ID for color variant
   */
  chrtId: number;

  /**
   * Barcode for return
   */
  barcode: string;

  /**
   * Product images provided by customer
   */
  clientPhotos: ReturnImage[];
}

/**
 * Return image provided by customer for return
 */
export interface ReturnImage {
  /**
   * Image size in bytes
   */
  size: number;

  /**
   * Full image URL
   */
  url: string;
}

/**
 * Refund information (when applicable)
 */
export interface RefundInfo {
  /**
   * Refund amount (in kopecks)
   */
  amount: number;

  /**
   * Refund reason code from WB system
   */
  reason: string;

  /**
   * Refund description
   */
  description: string;
}

/**
 * Performance metrics for return processing
 */
export interface ReturnMetrics {
  /**
   * Processing time in minutes
   */
  processingTimeMin: number;

  /**
   * Return rate percentage (100% = successful returns / total returns)
   */
  returnRate: number;

  /**
   * Average resolution time in hours
   */
  avgResolutionTimeHours: number;

  /**
   * Quality score (1-100)
   */
  qualityScore: number;

  /**
   * Delivery percentage (100% = on_time / on_time × 100)
   */
  deliveryRate: number;
}

/**
 * Analytics for return processing
 */
export interface ReturnAnalytics {
  /**
   * Total return requests count
   */
  totalReturns: number;

  /**
   * Returns by status
   */
  byStatus: {
    status: ReturnStatus;
    count: number;
    percentage: number;
  }[];

  /**
   * Returns by category
   */
  byCategory: {
    category: string;
    count: number;
    averageProcessingTime: number;
    qualityScore: number;
  }[];

  /**
   * Performance metrics
   */
  metrics: ReturnMetrics;

  /**
   * Time frame for analytics data
   */
  timeFrame: '7d' | '30d' | '90d' | 'all';

  /**
   * Analytics update timestamp (ISO 8601)
   */
  lastUpdated: string;
}

// ============ RETURN PROCESSING TYPES ============

/**
 * Return request filters for getReturnRequests()
 */
export interface ReturnRequestFilters {
  /**
   * Filter by return status
   */
  status?: ReturnStatus[];

  /**
   * Filter by date from (YYYY-MM-DD format)
   */
  dateFrom?: string;

  /**
   * Filter by date to (YYYY-MM-DD format)
   */
  dateTo?: string;

  /**
   * Filter by specific order ID
   */
  orderId?: string;

  /**
   * Filter by product ID (nmId)
   */
  nmId?: number;

  /**
   * Filter by supplier article number
   */
  supplierArticle?: string;

  /**
   * Sort results by field
   */
  sortBy?: 'createdAt' | 'updatedAt' | 'orderId' | 'amount' | 'status';

  /**
   * Sort order direction
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Limit number of results (1-1000)
   */
  limit?: number;

  /**
   * Offset for pagination
   */
  offset?: number;
}

/**
 * Response from getReturnRequests()
 */
export interface ReturnRequestsResponse {
  /**
   * Array of return requests
   */
  data: ReturnRequest[];

  /**
   * Total number of returns matching filters
   */
  total: number;

  /**
   * Current page offset
   */
  offset: number;

  /**
   * Limit applied to this request
   */
  limit: number;

  /**
   * Whether more results are available
   */
  hasMore: boolean;

  /**
   * Response metadata
   */
  metadata?: {
    /**
     * Processing time in milliseconds
     */
    processingTime?: number;

    /**
     * Filters applied (echoed back)
     */
    filters?: ReturnRequestFilters;

    /**
     * Available status counts
     */
    statusCounts?: Record<ReturnStatus, number>;
  };
}

/**
 * Options for return request processing
 */
export interface ReturnProcessOptions {
  /**
   * Refund amount (for approve action)
   */
  refundAmount?: number;

  /**
   * Rejection reason (required for reject action)
   */
  reason?: string;

  /**
   * Processing notes (optional)
   */
  notes?: string;

  /**
   * Internal flags for processing
   */
  flags?: {
    /**
     * Whether to notify customer
     */
    notifyCustomer?: boolean;

    /**
     * Whether to update inventory
     */
    updateInventory?: boolean;

    /**
     * Whether to track as quality issue
     */
    trackQuality?: boolean;
  };

  /**
   * Additional metadata
   */
  metadata?: Record<string, unknown>;
}

/**
 * Response from processReturnRequest()
 */
export interface ReturnProcessResponse {
  /**
   * Updated return request
   */
  return: ReturnRequest;

  /**
   * Processing result details
   */
  result: {
    /**
     * Action performed
     */
    action: 'approve' | 'reject';

    /**
     * Processing timestamp (ISO 8601)
     */
    processedAt: string;

    /**
     * Whether processing was successful
     */
    success: boolean;

    /**
     * Processing message
     */
    message: string;

    /**
     * Refund amount (if approved)
     */
    refundAmount?: number;

    /**
     * Refund status
     */
    refundStatus?: 'pending' | 'processing' | 'completed' | 'failed';

    /**
     * Rejection reason (if rejected)
     */
    rejectionReason?: string;
  };

  /**
   * Additional information
   */
  additional?: {
    /**
     * Customer notification status
     */
    customerNotified?: boolean;

    /**
     * Inventory update status
     */
    inventoryUpdated?: boolean;

    /**
     * Next steps or required actions
     */
    nextSteps?: string[];

    /**
     * Related transaction IDs
     */
    transactionIds?: string[];
  };
}

/**
 * Return status for tracking return request lifecycle
 */
export type ReturnStatus =
  | 'created' // Created and waiting for processing
  | 'processing' // Currently being processed
  | 'canceled' // Canceled by customer
  | 'delivered' // Delivered to customer
  | 'refunded' // Money returned to customer
  | 'closed' // Return completed
  | 'error' // Processing failed
  | 'expired' // Return deadline expired
  | 'rejected' // Return rejected by seller
  | 'returned' // Refund completed
  | 'archived' // Archived in system
  | 'draft' // Draft state
  | 'pending' // Pending processing
  | 'in_transit' // In transit
  | 'ready_for_pickup' // Ready for pickup
  | 'awaiting_pickup' // Awaiting at pickup point
  | 'shipped'; // Ready for pickup

// ============ ENHANCED CHAT FUNCTIONALITY TYPES ============

/**
 * Chat message with enhanced details
 */
export interface ChatMessage {
  /**
   * Message ID
   */
  id: string;

  /**
   * Message text content
   */
  text?: string;

  /**
   * Message timestamp (ISO 8601)
   */
  createdAt: string;

  /**
   * Message sender
   */
  sender: 'client' | 'seller' | 'system';

  /**
   * Sender name (for client messages)
   */
  senderName?: string;

  /**
   * Whether message has been read
   */
  read: boolean;

  /**
   * Message type
   */
  type: 'text' | 'file' | 'image' | 'system';

  /**
   * File attachments (if any)
   */
  attachments?: ChatAttachment[];

  /**
   * Message metadata
   */
  metadata?: Record<string, unknown>;
}

/**
 * Chat attachment
 */
export interface ChatAttachment {
  /**
   * Attachment ID
   */
  id: string;

  /**
   * Attachment filename
   */
  filename: string;

  /**
   * File type
   */
  type: 'image' | 'document' | 'video' | 'audio';

  /**
   * File URL
   */
  url: string;

  /**
   * File size in bytes
   */
  size: number;

  /**
   * MIME type
   */
  mimeType: string;
}

/**
 * Enhanced chat details with comprehensive information
 */
export interface ChatDetails {
  /**
   * Chat ID
   */
  chatId: string;

  /**
   * Order ID associated with chat (if any)
   */
  orderId?: string;

  /**
   * Product ID associated with chat (if any)
   */
  nmId?: number;

  /**
   * Customer ID
   */
  customerId: string;

  /**
   * Customer name
   */
  customerName: string;

  /**
   * Customer email
   */
  customerEmail?: string;

  /**
   * Customer phone
   */
  customerPhone?: string;

  /**
   * Chat status
   */
  status: 'active' | 'closed' | 'archived';

  /**
   * Chat creation timestamp (ISO 8601)
   */
  createdAt: string;

  /**
   * Last activity timestamp (ISO 8601)
   */
  lastActivityAt: string;

  /**
   * Total message count
   */
  messageCount: number;

  /**
   * Unread message count
   */
  unreadCount: number;

  /**
   * Chat priority
   */
  priority: 'low' | 'normal' | 'high' | 'urgent';

  /**
   * Chat tags or labels
   */
  tags?: string[];

  /**
   * Chat assignee (seller user ID)
   */
  assigneeId?: string;

  /**
   * Chat assignee name
   */
  assigneeName?: string;

  /**
   * Estimated response time (minutes)
   */
  estimatedResponseTime?: number;

  /**
   * Customer satisfaction rating (1-5)
   */
  satisfactionRating?: number;

  /**
   * Chat metadata
   */
  metadata?: {
    /**
     * Source of chat creation
     */
    source?: 'question' | 'review' | 'order' | 'manual';

    /**
     * Campaign or promotion source
     */
    campaign?: string;

    /**
     * Device type used by customer
     */
    deviceType?: 'mobile' | 'desktop' | 'tablet';

    /**
     * Customer location (country)
     */
    customerCountry?: string;

    /**
     * Customer language preference
     */
    language?: string;

    /**
     * Customer VIP status
     */
    isVip?: boolean;

    /**
     * Previous interaction count
     */
    previousInteractions?: number;
  };
}

/**
 * Chat history with pagination and filtering
 */
export interface ChatHistory {
  /**
   * Chat ID
   */
  chatId: string;

  /**
   * Array of chat messages in chronological order
   */
  messages: ChatMessage[];

  /**
   * Total number of messages in chat
   */
  totalMessages: number;

  /**
   * Current page offset
   */
  offset: number;

  /**
   * Limit applied to this request
   */
  limit: number;

  /**
   * Whether more messages are available
   */
  hasMore: boolean;

  /**
   * Chat details summary
   */
  chat: ChatDetails;

  /**
   * Pagination metadata
   */
  pagination?: {
    /**
     * Next page offset (if available)
     */
    nextOffset?: number;

    /**
     * Previous page offset (if available)
     */
    prevOffset?: number;

    /**
     * Current page number
     */
    currentPage: number;

    /**
     * Total number of pages
     */
    totalPages: number;
  };
}

/**
 * Filters for chat history retrieval
 */
export interface ChatHistoryFilters {
  /**
   * Filter by message type
   */
  messageType?: 'text' | 'file' | 'image' | 'system';

  /**
   * Filter by sender
   */
  sender?: 'client' | 'seller' | 'system';

  /**
   * Filter by date range (YYYY-MM-DD format)
   */
  dateFrom?: string;

  /**
   * Filter by date range (YYYY-MM-DD format)
   */
  dateTo?: string;

  /**
   * Filter by read status
   */
  readStatus?: boolean;

  /**
   * Include attachments only
   */
  hasAttachments?: boolean;

  /**
   * Search message content
   */
  searchText?: string;

  /**
   * Sort order
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Limit number of messages (1-100)
   */
  limit?: number;

  /**
   * Offset for pagination
   */
  offset?: number;
}

/**
 * Chat list filters for enhanced chat retrieval
 */
export interface ChatListFilters {
  /**
   * Filter by chat status
   */
  status?: ('active' | 'closed' | 'archived')[];

  /**
   * Filter by priority
   */
  priority?: ('low' | 'normal' | 'high' | 'urgent')[];

  /**
   * Filter by assignee ID
   */
  assigneeId?: string;

  /**
   * Filter by customer VIP status
   */
  isVip?: boolean;

  /**
   * Filter by date range (YYYY-MM-DD format)
   */
  dateFrom?: string;

  /**
   * Filter by date range (YYYY-MM-DD format)
   */
  dateTo?: string;

  /**
   * Filter by tags
   */
  tags?: string[];

  /**
   * Filter by source
   */
  source?: ('question' | 'review' | 'order' | 'manual')[];

  /**
   * Filter by unread messages only
   */
  hasUnread?: boolean;

  /**
   * Search by customer name or email
   */
  customerSearch?: string;

  /**
   * Sort results by field
   */
  sortBy?: 'lastActivityAt' | 'createdAt' | 'priority' | 'messageCount';

  /**
   * Sort order direction
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Limit number of results (1-100)
   */
  limit?: number;

  /**
   * Offset for pagination
   */
  offset?: number;
}

// ============ ENHANCED REVIEW ANALYSIS TYPES ============

/**
 * Enhanced feedback with comprehensive analysis and metadata
 */
export interface EnhancedFeedback {
  /**
   * Unique feedback identifier
   */
  id: string;

  /**
   * Product details associated with the feedback
   */
  productDetails: {
    nmId: number;
    supplierArticle: string;
    productName: string;
    brandName: string;
    category: string;
    rating: number;
  };

  /**
   * Customer information
   */
  customer: {
    name: string;
    isVip: boolean;
    totalOrders: number;
    previousFeedbacks: number;
    averageRating: number;
    registrationDate?: string;
    lastOrderDate?: string;
  };

  /**
   * Feedback content and analysis
   */
  content: {
    text: string;
    rating: number; // 1-5 stars
    date: string;
    isVerified: boolean;
    hasPhotos: boolean;
    hasVideo: boolean;
    photoLinks?: string[];
    video?: {
      link: string;
      durationSec: number;
      thumbnail?: string;
    };
  };

  /**
   * Enhanced analysis data
   */
  analysis: {
    sentiment: 'positive' | 'negative' | 'neutral';
    sentimentScore: number; // -1 to 1
    urgency: 'low' | 'medium' | 'high' | 'critical';
    topics: string[]; // e.g., ['quality', 'shipping', 'packaging']
    keywords: string[];
    language: string;
    translatedText?: string;
    readabilityScore: number; // 0-100
    emotionalTone: 'angry' | 'happy' | 'disappointed' | 'excited' | 'neutral';
  };

  /**
   * Response management
   */
  response: {
    hasResponse: boolean;
    responseDate?: string;
    responseText?: string;
    isEditable: boolean;
    responseTemplateId?: string;
    suggestedResponses?: string[];
  };

  /**
   * Performance metrics
   */
  metrics: {
    helpfulness: number; // 0-100
    viewCount: number;
    shareCount: number;
    reportCount: number;
    lastUpdated: string;
  };

  /**
   * Quality indicators
   */
  quality: {
    isDetailed: boolean;
    wordCount: number;
    hasProsAndCons: boolean;
    pros?: string;
    cons?: string;
    isConstructive: boolean;
    verificationLevel: 'basic' | 'verified' | 'premium';
  };

  /**
   * Product impact assessment
   */
  impact: {
    affectsSales: boolean;
    impactScore: number; // 0-100
    competitorMentioned?: string;
    priceMentioned: boolean;
    shippingMentioned: boolean;
    qualityMentioned: boolean;
  };

  /**
   * Moderation status
   */
  moderation: {
    isModerated: boolean;
    moderationDate?: string;
    moderationStatus: 'approved' | 'pending' | 'rejected';
    flags: string[];
    automatedChecks: {
      spamScore: number; // 0-100
      profanityScore: number; // 0-100
      relevanceScore: number; // 0-100
    };
  };
}

/**
 * Enhanced filters for feedback retrieval with advanced analytics
 */
export interface EnhancedFeedbackFilters {
  /**
   * Filter by product IDs
   */
  nmIds?: number[];

  /**
   * Filter by supplier articles
   */
  supplierArticles?: string[];

  /**
   * Filter by ratings (1-5)
   */
  ratings?: number[];

  /**
   * Filter by sentiment analysis
   */
  sentiments?: ('positive' | 'negative' | 'neutral')[];

  /**
   * Filter by urgency level
   */
  urgencyLevels?: ('low' | 'medium' | 'high' | 'critical')[];

  /**
   * Filter by feedback topics
   */
  topics?: string[];

  /**
   * Filter by customer VIP status
   */
  isVip?: boolean;

  /**
   * Filter by verification status
   */
  isVerified?: boolean;

  /**
   * Filter by response status
   */
  hasResponse?: boolean;

  /**
   * Filter by media content
   */
  hasPhotos?: boolean;
  hasVideo?: boolean;

  /**
   * Filter by emotional tone
   */
  emotionalTones?: ('angry' | 'happy' | 'disappointed' | 'excited' | 'neutral')[];

  /**
   * Filter by moderation status
   */
  moderationStatus?: ('approved' | 'pending' | 'rejected')[];

  /**
   * Filter by language
   */
  languages?: string[];

  /**
   * Filter by quality indicators
   */
  isDetailed?: boolean;
  isConstructive?: boolean;
  hasProsAndCons?: boolean;

  /**
   * Filter by date range (YYYY-MM-DD format)
   */
  dateFrom?: string;
  dateTo?: string;

  /**
   * Filter by minimum helpfulness score
   */
  minHelpfulness?: number;

  /**
   * Filter by minimum word count
   */
  minWordCount?: number;

  /**
   * Search in feedback text and analysis
   */
  searchText?: string;

  /**
   * Filter by customer characteristics
   */
  customerFilters?: {
    minOrders?: number;
    maxOrders?: number;
    minAverageRating?: number;
    maxAverageRating?: number;
    registrationDateFrom?: string;
    registrationDateTo?: string;
  };

  /**
   * Filter by impact assessment
   */
  impactFilters?: {
    affectsSales?: boolean;
    minImpactScore?: number;
    priceMentioned?: boolean;
    shippingMentioned?: boolean;
    qualityMentioned?: boolean;
  };

  /**
   * Sort results by field
   */
  sortBy?:
    | 'date'
    | 'rating'
    | 'sentimentScore'
    | 'helpfulness'
    | 'urgency'
    | 'impactScore'
    | 'wordCount';

  /**
   * Sort order direction
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Limit number of results (1-100)
   */
  limit?: number;

  /**
   * Offset for pagination
   */
  offset?: number;

  /**
   * Include analysis data
   */
  includeAnalysis?: boolean;

  /**
   * Include customer data
   */
  includeCustomer?: boolean;

  /**
   * Include metrics data
   */
  includeMetrics?: boolean;

  /**
   * Include impact assessment
   */
  includeImpact?: boolean;
}

/**
 * Response structure for enhanced feedback retrieval
 */
export interface EnhancedFeedbacksResponse {
  /**
   * Array of enhanced feedback objects
   */
  data: EnhancedFeedback[];

  /**
   * Total count of feedbacks matching filters
   */
  total: number;

  /**
   * Current page information
   */
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };

  /**
   * Analytics summary for the filtered results
   */
  analytics: {
    averageRating: number;
    sentimentDistribution: {
      positive: number;
      negative: number;
      neutral: number;
    };
    urgencyDistribution: {
      low: number;
      medium: number;
      high: number;
      critical: number;
    };
    topTopics: {
      topic: string;
      count: number;
      percentage: number;
    }[];
    averageWordCount: number;
    verifiedPercentage: number;
    responseRate: number;
    averageHelpfulness: number;
    vipCustomerFeedbacks: number;
  };

  /**
   * Performance metrics for the request
   */
  performance: {
    requestTime: number;
    analysisTime: number;
    cacheHit: boolean;
  };

  /**
   * Date range of included feedbacks
   */
  dateRange: {
    earliest: string;
    latest: string;
  };

  /**
   * Filter summary
   */
  filterSummary: {
    appliedFilters: string[];
    resultCount: number;
    filterEffectiveness: number;
  };
}

/**
 * Detailed feedback response for individual feedback retrieval
 */
export interface FeedbackDetailsResponse {
  /**
   * Enhanced feedback object with full details
   */
  feedback: EnhancedFeedback;

  /**
   * Related feedbacks from same customer
   */
  relatedFeedbacks: {
    fromSameCustomer: EnhancedFeedback[];
    fromSameProduct: EnhancedFeedback[];
    similarTopics: EnhancedFeedback[];
  };

  /**
   * Customer journey context
   */
  customerJourney: {
    orderHistory: {
      orderId: string;
      date: string;
      nmId: number;
      productName: string;
      rating?: number;
      feedbackId?: string;
    }[];
    customerLifetimeValue: number;
    loyaltyStatus: 'new' | 'regular' | 'vip' | 'premium';
    riskLevel: 'low' | 'medium' | 'high';
  };

  /**
   * Product performance context
   */
  productContext: {
    totalFeedbacks: number;
    averageRating: number;
    ratingDistribution: {
      rating: number;
      count: number;
      percentage: number;
    }[];
    recentTrend: 'improving' | 'stable' | 'declining';
    competitivePosition: number;
    marketRank: number;
  };

  /**
   * Recommended actions
   */
  recommendations: {
    priority: 'low' | 'medium' | 'high' | 'critical';
    actions: {
      type: 'respond' | 'investigate' | 'improve' | 'promote' | 'escalate';
      description: string;
      urgency: 'low' | 'medium' | 'high' | 'critical';
      estimatedImpact: 'low' | 'medium' | 'high';
    }[];
    suggestedResponses: {
      template: string;
      customization: string;
      expectedOutcome: string;
    }[];
    followUpActions: {
      action: string;
      timeline: string;
      responsible: string;
    }[];
  };

  /**
   * Analysis insights
   */
  insights: {
    keyFindings: string[];
    redFlags: string[];
    opportunities: string[];
    trends: {
      trend: string;
      confidence: number;
      timeframe: string;
    }[];
    correlations: {
      factor: string;
      correlation: number;
      significance: string;
    }[];
  };

  /**
   * Quality and moderation details
   */
  qualityDetails: {
    authenticityScore: number; // 0-100
    biasIndicators: string[];
    manipulationRisk: number; // 0-100
    qualityFactors: {
      factor: string;
      score: number;
      impact: 'positive' | 'negative' | 'neutral';
    }[];
    improvementSuggestions: string[];
  };

  /**
   * Response optimization suggestions
   */
  responseOptimization: {
    bestResponseTime: string;
    optimalTone: string;
    keyPoints: string[];
    avoidTopics: string[];
    personalizationOpportunities: string[];
    templateSuggestions: {
      templateId: string;
      templateName: string;
      relevanceScore: number;
      customizationNeeded: string[];
    }[];
  };

  /**
   * Performance metrics
   */
  metrics: {
    viewRate: number;
    engagementRate: number;
    conversionImpact: number;
    seoValue: number;
    brandImpact: number;
    operationalCost: number;
    opportunityCost: number;
  };
}

// ============ ADDITIONAL RETURN ANALYSIS TYPES ============

/**
 * Filters for return analytics data
 */
export interface ReturnAnalyticsFilters {
  /**
   * Filter by date from (YYYY-MM-DD format)
   */
  dateFrom?: string;

  /**
   * Filter by date to (YYYY-MM-DD format)
   */
  dateTo?: string;

  /**
   * Filter by return status
   */
  status?: ReturnStatus[];

  /**
   * Filter by return category
   */
  category?: string[];

  /**
   * Filter by return reason
   */
  reason?: string[];

  /**
   * Include trend analysis data
   */
  includeTrends?: boolean;

  /**
   * Include quality metrics data
   */
  includeQualityMetrics?: boolean;

  /**
   * Include cost analysis data
   */
  includeCostAnalysis?: boolean;

  /**
   * Include customer feedback data
   */
  includeCustomerFeedback?: boolean;

  /**
   * Group analytics by field
   */
  groupBy?: 'status' | 'category' | 'reason' | 'date' | 'product' | 'customer';
}

/**
 * Comprehensive response structure for return analytics
 */
export interface ReturnAnalyticsResponse {
  /**
   * Overall return analytics
   */
  analytics: ReturnAnalytics;

  /**
   * Trend analysis data (if requested)
   */
  trends?: {
    /**
     * Daily return trends
     */
    daily: {
      date: string;
      count: number;
      changePercentage: number;
      trend: 'up' | 'down' | 'stable';
    }[];

    /**
     * Weekly return trends
     */
    weekly: {
      week: string;
      count: number;
      changePercentage: number;
      trend: 'up' | 'down' | 'stable';
    }[];

    /**
     * Monthly return trends
     */
    monthly: {
      month: string;
      count: number;
      changePercentage: number;
      trend: 'up' | 'down' | 'stable';
    }[];
  };

  /**
   * Quality metrics (if requested)
   */
  qualityMetrics?: {
    /**
     * Overall quality score (0-100)
     */
    overallQualityScore: number;

    /**
     * Product quality analysis
     */
    productQuality: {
      nmId: number;
      productName: string;
      returnRate: number;
      qualityScore: number;
      issues: string[];
    }[];

    /**
     * Process quality indicators
     */
    processQuality: {
      averageProcessingTime: number;
      processingEfficiency: number;
      errorRate: number;
      customerSatisfactionRate: number;
    };
  };

  /**
   * Cost analysis (if requested)
   */
  costAnalysis?: {
    /**
     * Total return costs
     */
    totalCost: number;

    /**
     * Average cost per return
     */
    averageCostPerReturn: number;

    /**
     * Cost breakdown by category
     */
    costByCategory: {
      category: string;
      cost: number;
      percentage: number;
    }[];

    /**
     * Prevention savings
     */
    preventionSavings: number;

    /**
     * ROI of quality improvements
     */
    qualityImprovementROI: number;
  };

  /**
   * Customer feedback analysis (if requested)
   */
  customerFeedback?: {
    /**
     * Overall customer satisfaction score
     */
    satisfactionScore: number;

    /**
     * Feedback distribution
     */
    feedbackDistribution: {
      positive: number;
      neutral: number;
      negative: number;
    };

    /**
     * Common feedback themes
     */
    themes: {
      theme: string;
      count: number;
      sentiment: 'positive' | 'negative' | 'neutral';
    }[];

    /**
     * Improvement suggestions
     */
    suggestions: string[];
  };

  /**
   * Performance metrics
   */
  performance: {
    /**
     * Request processing time in milliseconds
     */
    requestTime: number;

    /**
     * Analytics computation time in milliseconds
     */
    computationTime: number;

    /**
     * Whether data was retrieved from cache
     */
    cacheHit: boolean;
  };

  /**
   * Date range of included data
   */
  dateRange: {
    earliest: string;
    latest: string;
  };

  /**
   * Summary statistics
   */
  summary: {
    totalReturns: number;
    averageDailyReturns: number;
    peakReturnDay: string;
    mostCommonReason: string;
    mostCommonCategory: string;
  };
}

// ============================================================================
// Feedbacks Count Types (Task 8.5)
// ============================================================================

/**
 * Response from getFeedbacksCountUnanswered() method
 * Returns metrics for unanswered feedbacks
 */
export interface FeedbacksCountUnansweredResponse {
  /**
   * Feedbacks data
   */
  data: {
    /**
     * Total count of unanswered feedbacks
     */
    countUnanswered: number;

    /**
     * Count of unanswered feedbacks received today
     */
    countUnansweredToday: number;

    /**
     * Average rating of all feedbacks (as string)
     * @example "4.7"
     */
    valuation: string;
  };

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText: string;

  /**
   * Additional errors array
   */
  additionalErrors: string[] | null;
}

/**
 * Parameters for getFeedbacksCount() method
 */
export interface FeedbacksCountParams {
  /**
   * Start date as Unix timestamp (optional)
   * @example 1688465092
   */
  dateFrom?: number;

  /**
   * End date as Unix timestamp (optional)
   * @example 1688465092
   */
  dateTo?: number;

  /**
   * Filter by answered status (optional, defaults to true)
   * - true: answered feedbacks
   * - false: unanswered feedbacks
   */
  isAnswered?: boolean;
}

/**
 * Response from getFeedbacksCount() method
 */
export interface FeedbacksCountResponse {
  /**
   * Count of feedbacks matching criteria
   */
  data: number;

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText: string;

  /**
   * Additional errors array
   */
  additionalErrors: string[] | null;
}

// ============================================================================
// Supplier Valuations Types (Task 8.5)
// ============================================================================

/**
 * Response from getSupplierValuations() method
 * Returns complaint reasons and product issue types
 */
export interface SupplierValuationsResponse {
  /**
   * Valuations data
   */
  data: {
    /**
     * Complaint reasons for feedbacks (key = reason ID, value = description)
     * Keys: 1-7 (API reasons), 11-20 (portal reasons)
     * @example { "1": "Отзыв не относится к товару", "3": "Спам" }
     */
    feedbackValuations: Record<string, string>;

    /**
     * Product issue types (key = issue ID, value = description)
     * @example { "1": "Повредили при доставке", "2": "Товар подменили" }
     */
    productValuations: Record<string, string>;
  };

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText: string;

  /**
   * Additional errors array
   */
  additionalErrors: string[] | null;
}

// ============================================================================
// Feedback Actions Types (Task 8.5)
// ============================================================================

/**
 * Request for reportFeedbackAction() method
 * Submit complaint or report product issue
 */
export interface FeedbackActionRequest {
  /**
   * Feedback ID (required)
   * @example "J2FMRjUj6hwvwCElqssz"
   */
  id: string;

  /**
   * Complaint reason for feedback (optional)
   * Use values 1-7 from supplier-valuations API feedbackValuations
   * @example 1 for "Отзыв не относится к товару"
   */
  supplierFeedbackValuation?: number;

  /**
   * Product issue type (optional)
   * Use values 1-4 from supplier-valuations API productValuations
   * @example 1 for "Повредили при доставке"
   */
  supplierProductValuation?: number;
}

// ============================================================================
// Archived Feedbacks Types (Task 8.5)
// ============================================================================

/**
 * Filters for getArchivedFeedbacks() method
 */
export interface ArchivedFeedbacksFilters {
  /**
   * Filter by product nmId (optional)
   */
  nmId?: number;

  /**
   * Number of feedbacks to retrieve (required, max 5000)
   */
  take: number;

  /**
   * Number of feedbacks to skip (required)
   */
  skip: number;

  /**
   * Sort order by date (optional)
   * - 'dateAsc': oldest first
   * - 'dateDesc': newest first
   */
  order?: 'dateAsc' | 'dateDesc';
}

/**
 * Response from getArchivedFeedbacks() method
 * Same structure as ReviewsResponse but with archived feedbacks
 */
export interface ArchivedFeedbacksResponse {
  /**
   * Archived feedbacks data
   */
  data: {
    /**
     * Array of archived feedbacks
     */
    feedbacks: Review[];
  };

  /**
   * Whether there was an error
   */
  error: boolean;

  /**
   * Error description text
   */
  errorText: string;

  /**
   * Additional errors array
   */
  additionalErrors: string[] | null;
}

// ============================================================================
// Customer Return Claims Types (Task 8.5)
// ============================================================================

/**
 * Filters for getClaims() method
 */
export interface ClaimsFilters {
  /**
   * Filter by archive status (optional)
   */
  is_archive?: boolean;

  /**
   * Filter by specific claim ID (optional)
   */
  id?: string;

  /**
   * Maximum number of claims to return (default: 50)
   */
  limit?: number;

  /**
   * Number of claims to skip for pagination
   */
  offset?: number;

  /**
   * Filter by product nmId (optional)
   */
  nm_id?: number;
}

/**
 * Customer return claim object
 */
export interface Claim {
  /**
   * Claim ID (UUID format)
   */
  id: string;

  /**
   * Claim source type:
   * - 1: customer portal
   * - 3: chat
   */
  claim_type: 1 | 3;

  /**
   * Return decision status:
   * - 0: under review
   * - 1: rejected
   * - 2: approved
   */
  status: 0 | 1 | 2;

  /**
   * Product status:
   * - 0: under review
   * - 1: stays with customer (rejected)
   * - 2: return to WB for disposal
   * - 5: stays with customer (approved)
   * - 8: returned for resale after check
   * - 10: returned to seller
   */
  status_ex: 0 | 1 | 2 | 5 | 8 | 10;

  /**
   * Product nmId (Wildberries article)
   */
  nm_id: number;

  /**
   * Customer's comment about the issue
   */
  user_comment: string;

  /**
   * Response message to customer
   */
  wb_comment: string | null;

  /**
   * Claim creation date (ISO 8601)
   */
  dt: string;

  /**
   * Product name
   */
  imt_name: string | null;

  /**
   * Order date (ISO 8601)
   */
  order_dt: string;

  /**
   * Last update date (ISO 8601)
   */
  dt_update: string;

  /**
   * Photo URLs from claim
   */
  photos: string[];

  /**
   * Video URLs from claim
   */
  video_paths: string[];

  /**
   * Available response actions
   * - approve1: approve with defect check
   * - approve2: approve and return product
   * - autorefund1: approve without product return
   * - reject1-3: reject with template
   * - rejectcustom: reject with custom comment
   * - approvecc1: approve for in-store pickup return
   * - confirmreturngoodcc1: confirm pickup receipt
   */
  actions: string[];

  /**
   * Price with discounts applied
   */
  price: number;

  /**
   * Currency code (e.g., '643' for RUB)
   */
  currency_code: string;

  /**
   * Unique order ID (srid)
   */
  srid: string;
}

/**
 * Response from getClaims() method
 */
export interface ClaimsResponse {
  /**
   * Array of return claims
   */
  claims: Claim[];

  /**
   * Total count of claims matching filters (ignoring limit/offset)
   */
  total: number;
}

/**
 * Request for respondToClaim() method
 */
export interface RespondToClaimRequest {
  /**
   * Claim ID (UUID format, required)
   */
  id: string;

  /**
   * Action to take on claim (required)
   * Use one of values from claim's `actions` array
   */
  action: string;

  /**
   * Comment for response (optional)
   * Required when action is 'rejectcustom'
   * Optional for 'approvecc1'
   * Min 10 chars, max 1000 chars
   */
  comment?: string;
}

// ============================================================================
// Return by Feedback Types
// ============================================================================

/**
 * Request for requestReturnByFeedback() method
 *
 * Requests return of a product associated with a feedback review.
 * Only available for feedbacks with isAbleReturnProductOrders = true.
 */
export interface ReturnByFeedbackRequest {
  /**
   * Feedback ID to request return for
   */
  feedbackId: string;
}

/**
 * Response from requestReturnByFeedback() method
 */
export interface ReturnByFeedbackResponse {
  /**
   * Whether the request was successful
   */
  error: boolean;

  /**
   * Error message if error is true
   */
  errorText: string;
}
