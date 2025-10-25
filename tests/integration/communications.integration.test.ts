/**
 * Integration tests for CommunicationsModule
 *
 * Tests the CommunicationsModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow for chat endpoints
 * - Chat list retrieval from buyer-chat-api.wildberries.ru
 * - Event-based messaging with cursor pagination
 * - Message sending with FormData (multipart/form-data)
 * - Rate limiting enforcement
 * - Error transformation from HTTP responses
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/communications/index CommunicationsModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { ValidationError } from '../../src/errors/validation-error';

/**
 * MSW handlers for Communications API endpoints
 */
const handlers = [
  // GET /api/v1/seller/chats - Get all chat conversations
  http.get('https://buyer-chat-api.wildberries.ru/api/v1/seller/chats', () => {
    return HttpResponse.json({
      result: [
        {
          chatID: '1:4019cd7d-cca8-4e90-8b11-f78afbea42e3',
          replySign: '1:4019cd7d-cca8-4e90-8b11-f78afbea42e3:54828159:signature',
          clientID: '123456',
          clientName: 'Иван',
          goodCard: {
            date: '2024-01-15T10:30:00Z',
            nmID: 12345678,
            price: 1500,
            priceCurrency: 'RUB',
            rid: 'abc123',
            size: 'M',
            statusID: 11,
          },
        },
      ],
      errors: null,
    });
  }),

  // GET /api/v1/seller/events - Get chat events with cursor pagination
  http.get('https://buyer-chat-api.wildberries.ru/api/v1/seller/events', ({ request }) => {
    const url = new URL(request.url);
    const next = url.searchParams.get('next');

    // First request (no cursor) - return events
    if (!next) {
      return HttpResponse.json({
        result: {
          next: 1698045576000,
          newestEventTime: '2023-10-23T07:19:36Z',
          oldestEventTime: '2023-10-23T05:02:20Z',
          totalEvents: 2,
          events: [
            {
              chatID: '1:1e265a58-a120-b178-008c-60af2460207c',
              eventID: '55adee45-11f0-33b6-a847-6ccc7c78b2ec',
              eventType: 'message',
              isNewChat: true,
              message: {
                text: 'Здравствуйте! У меня вопрос по товару',
                attachments: {
                  goodCard: {
                    date: '2023-10-18T11:46:01.528526Z',
                    nmID: 12345678,
                    price: 500,
                    priceCurrency: 'RUB',
                    rid: '2fb52cd9e25e52538a5f05994e688ae5',
                    size: '0',
                    statusID: 11,
                  },
                },
              },
              source: 'rusite',
              addTimestamp: 1698037340000,
              addTime: '2023-10-23T05:02:20Z',
              replySign: '1:1e265a58-a120-b178-008c-60af2460207c:signature',
              sender: 'client',
              clientID: '186132',
              clientName: 'Алёна',
            },
            {
              chatID: '1:1e265a58-a120-b178-008c-60af2460207c',
              eventID: 'cef95d3c-0345-4dc9-b6df-4c8c57a176a9',
              eventType: 'message',
              isNewChat: false,
              message: {
                text: 'Можно вернуть и заказать другой товар?',
              },
              source: 'rusite',
              addTimestamp: 1698037387000,
              addTime: '2023-10-23T05:03:07Z',
              sender: 'client',
              clientID: '186132',
              clientName: 'Алёна',
            },
          ],
        },
        errors: null,
      });
    }

    // Subsequent request (with cursor) - no more events
    return HttpResponse.json({
      result: {
        next: 1698045576000,
        newestEventTime: null,
        oldestEventTime: null,
        totalEvents: 0,
        events: [],
      },
      errors: null,
    });
  }),

  // POST /api/v1/seller/message - Send message
  http.post('https://buyer-chat-api.wildberries.ru/api/v1/seller/message', ({ request }) => {
    const contentType = request.headers.get('content-type');

    // Validate multipart/form-data
    if (!contentType?.includes('multipart/form-data')) {
      return HttpResponse.json(
        {
          status: 400,
          title: 'Bad Request',
          origin: 'proxy-chats',
          detail: 'Content-Type must be multipart/form-data',
          requestId: '1b21cad4833a0c9244dc294a000f6149',
          error: 'Invalid Content-Type',
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      result: {
        addTime: 1712848270018,
        chatID: '1:641b623c-5c0e-295b-db03-3d5b4d484c32',
      },
      errors: [],
    });
  }),

  // GET /api/v1/questions - Get product questions
  http.get('https://feedbacks-api.wildberries.ru/api/v1/questions', ({ request }) => {
    const url = new URL(request.url);
    const isAnswered = url.searchParams.get('isAnswered') === 'true';

    return HttpResponse.json({
      data: {
        countUnanswered: isAnswered ? 0 : 10,
        countArchive: isAnswered ? 50 : 0,
        questions: isAnswered
          ? []
          : [
              {
                id: 'q123',
                text: 'What is the material?',
                createdDate: '2024-01-15T10:00:00Z',
                state: 'suppliersPortalSynch',
                answer: null,
                productDetails: {
                  nmId: 12345,
                  imtId: 67890,
                  productName: 'Test Product',
                  supplierArticle: 'SKU123',
                  supplierName: 'Test Supplier',
                  brandName: 'Test Brand',
                  size: 'M',
                },
                wasViewed: false,
                isWarned: false,
              },
            ],
      },
      error: false,
      errorText: '',
      additionalErrors: null,
    });
  }),

  // PATCH /api/v1/questions - Answer or mark question as viewed
  http.patch('https://feedbacks-api.wildberries.ru/api/v1/questions', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    // Validate question operations
    if (!body.id) {
      return HttpResponse.json(
        {
          data: null,
          error: true,
          errorText: 'Invalid request',
          additionalErrors: null,
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      data: null,
      error: false,
      errorText: '',
      additionalErrors: null,
    });
  }),

  // GET /api/v1/feedbacks - Get product reviews
  http.get('https://feedbacks-api.wildberries.ru/api/v1/feedbacks', ({ request }) => {
    const url = new URL(request.url);
    const isAnswered = url.searchParams.get('isAnswered') === 'true';

    return HttpResponse.json({
      data: {
        countUnanswered: isAnswered ? 0 : 5,
        countArchive: isAnswered ? 100 : 0,
        feedbacks: isAnswered
          ? []
          : [
              {
                id: 'rev123',
                text: 'Great product!',
                pros: 'Good quality',
                cons: 'None',
                productValuation: 5,
                createdDate: '2024-01-15T10:00:00Z',
                answer: null,
                state: 'wbRu',
                productDetails: {
                  nmId: 12345,
                  imtId: 67890,
                  productName: 'Test Product',
                  supplierArticle: 'SKU123',
                  supplierName: 'Test Supplier',
                  brandName: 'Test Brand',
                  size: 'M',
                },
                photoLinks: [
                  {
                    fullSize: 'https://feedback.wbbasket.ru/photo1_full.jpg',
                    miniSize: 'https://feedback.wbbasket.ru/photo1_mini.jpg',
                  },
                ],
                video: {
                  previewImage: 'https://videofeedback.wbbasket.ru/preview.webp',
                  link: 'https://videofeedback.wbbasket.ru/index.m3u8',
                  durationSec: 15,
                },
                wasViewed: false,
                userName: 'Ivan',
                matchingSize: 'ok',
                isAbleSupplierFeedbackValuation: false,
                supplierFeedbackValuation: 0,
                isAbleSupplierProductValuation: false,
                supplierProductValuation: 0,
                isAbleReturnProductOrders: false,
                returnProductOrdersDate: null,
                bables: ['price', 'quality'],
                lastOrderShkId: 123456789,
                lastOrderCreatedAt: '2024-01-10T10:00:00Z',
                color: 'blue',
                subjectId: 219,
                subjectName: 'T-Shirts',
                parentFeedbackId: null,
                childFeedbackId: null,
              },
            ],
      },
      error: false,
      errorText: '',
      additionalErrors: null,
    });
  }),

  // POST /api/v1/feedbacks/answer - Respond to review
  http.post('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer', async ({ request }) => {
    const body = (await request.json()) as { id: string; text: string };

    if (!body.text || body.text.length < 2 || body.text.length > 5000) {
      return HttpResponse.json(
        {
          error: true,
          errorText: 'Invalid text length',
        },
        { status: 400 }
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),

  // PATCH /api/v1/feedbacks/answer - Edit review response
  http.patch('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer', async ({ request }) => {
    const body = (await request.json()) as { id: string; text: string };

    if (!body.text || body.text.length < 2 || body.text.length > 5000) {
      return HttpResponse.json(
        {
          error: true,
          errorText: 'Invalid text length',
        },
        { status: 400 }
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),
];

const server = setupServer(...handlers);

describe('CommunicationsModule Integration Tests', () => {
  let sdk: WildberriesSDK;

  beforeAll(() => {
    // Start MSW server before all tests
    server.listen({ onUnhandledRequest: 'error' });

    // Create SDK instance with test API key
    sdk = new WildberriesSDK({ apiKey: 'test-api-key' });
  });

  afterEach(() => {
    // Reset handlers after each test for test isolation
    server.resetHandlers();
  });

  afterAll(() => {
    // Close server after all tests
    server.close();
  });

  describe('getChats()', () => {
    it('should successfully retrieve all chats', async () => {
      const chatsResponse = await sdk.communications.getChats();

      expect(chatsResponse.result).toHaveLength(1);
      expect(chatsResponse.result[0].chatID).toBe('1:4019cd7d-cca8-4e90-8b11-f78afbea42e3');
      expect(chatsResponse.result[0].replySign).toBeDefined();
      expect(chatsResponse.result[0].clientName).toBe('Иван');
      expect(chatsResponse.errors).toBeNull();
    });

    it('should return chats with goodCard information', async () => {
      const chatsResponse = await sdk.communications.getChats();

      expect(chatsResponse.result[0].goodCard).toBeDefined();
      expect(chatsResponse.result[0].goodCard?.nmID).toBe(12345678);
      expect(chatsResponse.result[0].goodCard?.price).toBe(1500);
    });
  });

  describe('getChatEvents()', () => {
    it('should fetch events without cursor (initial request)', async () => {
      const eventsResponse = await sdk.communications.getChatEvents();

      expect(eventsResponse.result.totalEvents).toBe(2);
      expect(eventsResponse.result.events).toHaveLength(2);
      expect(eventsResponse.result.next).toBe(1698045576000);
    });

    it('should fetch events with cursor (pagination)', async () => {
      // First request
      const firstPage = await sdk.communications.getChatEvents();
      expect(firstPage.result.totalEvents).toBe(2);

      // Second request with cursor
      const secondPage = await sdk.communications.getChatEvents(firstPage.result.next);
      expect(secondPage.result.totalEvents).toBe(0);
      expect(secondPage.result.events).toHaveLength(0);
    });

    it('should return events with isNewChat flag and replySign', async () => {
      const eventsResponse = await sdk.communications.getChatEvents();

      // First event is new chat
      expect(eventsResponse.result.events[0].isNewChat).toBe(true);
      expect(eventsResponse.result.events[0].replySign).toBeDefined();

      // Second event is not new chat
      expect(eventsResponse.result.events[1].isNewChat).toBe(false);
      expect(eventsResponse.result.events[1].replySign).toBeUndefined();
    });

    it('should include message content and attachments', async () => {
      const eventsResponse = await sdk.communications.getChatEvents();

      expect(eventsResponse.result.events[0].message?.text).toContain('вопрос по товару');
      expect(eventsResponse.result.events[0].message?.attachments?.goodCard).toBeDefined();
    });
  });

  describe('sendMessage()', () => {
    it('should send text-only message successfully', async () => {
      const replySign = '1:4019cd7d-cca8-4e90-8b11-f78afbea42e3:signature';
      const messageResponse = await sdk.communications.sendMessage(replySign, 'Thank you!');

      expect(messageResponse.result.chatID).toBe('1:641b623c-5c0e-295b-db03-3d5b4d484c32');
      expect(messageResponse.result.addTime).toBe(1712848270018);
      expect(messageResponse.errors).toHaveLength(0);
    });

    it('should validate replySign requirement', async () => {
      await expect(sdk.communications.sendMessage('', 'message')).rejects.toThrow(ValidationError);
    });

    it('should validate message length (max 1000)', async () => {
      const replySign = '1:test:signature';
      const longMessage = 'a'.repeat(1001);

      await expect(sdk.communications.sendMessage(replySign, longMessage)).rejects.toThrow(
        ValidationError
      );
    });

    it('should require at least one of message or files', async () => {
      const replySign = '1:test:signature';

      await expect(sdk.communications.sendMessage(replySign)).rejects.toThrow(ValidationError);
    });
  });

  describe('Complete Workflow', () => {
    it('should execute complete chat workflow (get chats → poll events → send message)', async () => {
      // Step 1: Get all chats
      const chatsResponse = await sdk.communications.getChats();
      expect(chatsResponse.result).toHaveLength(1);
      const chat = chatsResponse.result[0];

      // Step 2: Poll for events
      const eventsResponse = await sdk.communications.getChatEvents();
      expect(eventsResponse.result.totalEvents).toBeGreaterThan(0);

      // Step 3: Extract replySign (from chat or new chat event)
      const replySign = chat.replySign;
      expect(replySign).toBeDefined();

      // Step 4: Send message
      const messageResponse = await sdk.communications.sendMessage(replySign, 'Response message');
      expect(messageResponse.result.chatID).toBeDefined();
    });

    it('should handle cursor pagination workflow', async () => {
      const allEvents = [];

      // First page
      const firstPage = await sdk.communications.getChatEvents();
      allEvents.push(...firstPage.result.events);
      const cursor = firstPage.result.next;

      // Second page
      if (firstPage.result.totalEvents > 0) {
        const secondPage = await sdk.communications.getChatEvents(cursor);
        allEvents.push(...secondPage.result.events);
      }

      expect(allEvents.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Error Handling', () => {
    it('should handle 401 Unauthorized', async () => {
      server.use(
        http.get('https://buyer-chat-api.wildberries.ru/api/v1/seller/chats', () => {
          return HttpResponse.json(
            {
              title: 'Unauthorized',
              detail: 'Invalid API key',
              code: 'UNAUTHORIZED',
              requestId: '123',
              origin: 'proxy-chats',
            },
            { status: 401 }
          );
        })
      );

      await expect(sdk.communications.getChats()).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 Rate Limit', async () => {
      server.use(
        http.get('https://buyer-chat-api.wildberries.ru/api/v1/seller/chats', () => {
          return HttpResponse.json(
            { error: 'Rate limit exceeded' },
            {
              status: 429,
              headers: {
                'Retry-After': '10',
              },
            }
          );
        })
      );

      await expect(sdk.communications.getChats()).rejects.toThrow(RateLimitError);
    });

    it('should handle 400 Bad Request with validation details', async () => {
      server.use(
        http.post('https://buyer-chat-api.wildberries.ru/api/v1/seller/message', () => {
          return HttpResponse.json(
            {
              status: 400,
              title: 'Bad Request',
              detail: 'Invalid signature',
              error: 'Invalid signature',
            },
            { status: 400 }
          );
        })
      );

      const replySign = 'invalid-signature';
      await expect(sdk.communications.sendMessage(replySign, 'message')).rejects.toThrow();
    });
  });

  describe('Helper Methods', () => {
    it('should extract replySign from Chat', async () => {
      const chatsResponse = await sdk.communications.getChats();
      const chat = chatsResponse.result[0];

      const replySign = sdk.communications.getReplySignFromChat(chat);
      expect(replySign).toBe(chat.replySign);
    });

    it('should extract replySign from new chat event', async () => {
      const eventsResponse = await sdk.communications.getChatEvents();
      const newChatEvent = eventsResponse.result.events[0];

      const replySign = sdk.communications.getReplySignFromEvent(newChatEvent);
      expect(replySign).toBe(newChatEvent.replySign);
    });

    it('should filter events by chatID', async () => {
      const eventsResponse = await sdk.communications.getChatEvents();
      const chatID = eventsResponse.result.events[0].chatID;

      const filtered = sdk.communications.filterEventsByChatID(
        eventsResponse.result.events,
        chatID
      );
      expect(filtered.every((e) => e.chatID === chatID)).toBe(true);
    });

    it('should filter client messages', async () => {
      const eventsResponse = await sdk.communications.getChatEvents();

      const clientMessages = sdk.communications.getClientMessages(eventsResponse.result.events);
      expect(clientMessages.every((e) => e.sender === 'client')).toBe(true);
    });
  });

  // ============================================================================
  // Product Q&A Integration Tests
  // ============================================================================

  describe('Product Q&A Workflows', () => {
    it('should fetch and answer unanswered questions', async () => {
      // Step 1: Fetch unanswered questions
      const questionsResponse = await sdk.communications.getQuestions({
        isAnswered: false,
        take: 20,
        skip: 0,
      });

      expect(questionsResponse.data.countUnanswered).toBe(10);
      expect(questionsResponse.data.questions).toHaveLength(1);
      expect(questionsResponse.data.questions[0].state).toBe('suppliersPortalSynch');

      // Step 2: Answer first question
      const questionId = questionsResponse.data.questions[0].id;
      await sdk.communications.answerQuestion(questionId, 'This product is made of cotton.');

      // Verify no error thrown
      expect(questionId).toBe('q123');
    });

    it('should fetch answered questions', async () => {
      const questionsResponse = await sdk.communications.getQuestions({
        isAnswered: true,
        take: 20,
        skip: 0,
      });

      expect(questionsResponse.data.countUnanswered).toBe(0);
      expect(questionsResponse.data.countArchive).toBe(50);
      expect(questionsResponse.data.questions).toHaveLength(0);
    });

    it('should reject a question', async () => {
      await sdk.communications.answerQuestion('q456', 'Inappropriate', true);
      // Verify no error thrown (204 No Content expected)
    });

    it('should mark question as viewed', async () => {
      await sdk.communications.markQuestionViewed('q789');
      // Verify no error thrown
    });

    it('should throw ValidationError for empty question ID', async () => {
      await expect(sdk.communications.answerQuestion('', 'Answer')).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError for empty answer text', async () => {
      await expect(sdk.communications.answerQuestion('q123', '')).rejects.toThrow(
        ValidationError
      );
    });
  });

  // ============================================================================
  // Customer Reviews Integration Tests
  // ============================================================================

  describe('Customer Reviews Workflows', () => {
    it('should fetch unanswered reviews with photos and video', async () => {
      const reviewsResponse = await sdk.communications.getReviews({
        isAnswered: false,
        take: 20,
        skip: 0,
      });

      expect(reviewsResponse.data.countUnanswered).toBe(5);
      expect(reviewsResponse.data.feedbacks).toHaveLength(1);

      const review = reviewsResponse.data.feedbacks[0];
      expect(review.productValuation).toBe(5);
      expect(review.photoLinks).toHaveLength(1);
      expect(review.video).toBeDefined();
      expect(review.video?.durationSec).toBe(15);
    });

    it('should fetch answered reviews', async () => {
      const reviewsResponse = await sdk.communications.getReviews({
        isAnswered: true,
        take: 20,
        skip: 0,
      });

      expect(reviewsResponse.data.countUnanswered).toBe(0);
      expect(reviewsResponse.data.countArchive).toBe(100);
      expect(reviewsResponse.data.feedbacks).toHaveLength(0);
    });

    it('should respond to review workflow', async () => {
      // Step 1: Fetch unanswered reviews
      const reviewsResponse = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      expect(reviewsResponse.data.feedbacks).toHaveLength(1);
      const reviewId = reviewsResponse.data.feedbacks[0].id;

      // Step 2: Respond to review
      await sdk.communications.respondToReview(reviewId, 'Thank you for your feedback!');

      // Verify no error thrown (204 No Content expected)
      expect(reviewId).toBe('rev123');
    });

    it('should edit review response', async () => {
      await sdk.communications.editReviewResponse('rev789', 'Updated response text.');
      // Verify no error thrown (204 No Content expected)
    });

    it('should throw ValidationError for empty review ID', async () => {
      await expect(sdk.communications.respondToReview('', 'Response')).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError for empty response text', async () => {
      await expect(sdk.communications.respondToReview('rev123', '')).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError for response text too short', async () => {
      await expect(sdk.communications.respondToReview('rev123', 'x')).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError for response text too long', async () => {
      const longText = 'a'.repeat(5001);
      await expect(sdk.communications.respondToReview('rev123', longText)).rejects.toThrow(
        ValidationError
      );
    });

    it('should accept response text at exact boundaries (2 and 5000 chars)', async () => {
      // Minimum (2 chars)
      await sdk.communications.respondToReview('rev123', 'OK');

      // Maximum (5000 chars)
      const maxText = 'a'.repeat(5000);
      await sdk.communications.respondToReview('rev456', maxText);

      // Both should succeed without errors
    });
  });
});
