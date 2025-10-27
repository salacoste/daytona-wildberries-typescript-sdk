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
