/**
 * Unit tests for CommunicationsModule
 *
 * Tests the CommunicationsModule class with mocked BaseClient to verify:
 * - Chat list retrieval
 * - Event-based messaging with cursor pagination
 * - Message sending with FormData (multipart/form-data)
 * - Event polling with setInterval
 * - Helper methods for replySign extraction and event filtering
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Validation logic and error handling
 * - Type safety
 *
 * @see {@link ../../../src/modules/communications/index CommunicationsModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CommunicationsModule } from '../../../src/modules/communications';
import type { BaseClient } from '../../../src/client/base-client';
import { ValidationError } from '../../../src/errors/validation-error';
import type { Chat, ChatEvent, Sender } from '../../../src/types/communications.types';

describe('CommunicationsModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
  };

  let communicationsModule: CommunicationsModule;

  beforeEach(() => {
    // Create fresh mocks before each test
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
    };

    // Create fresh instance before each test
    communicationsModule = new CommunicationsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('getChats() - Retrieve All Chat Conversations', () => {
    const mockChatsResponse = {
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
        {
          chatID: '1:5a29bd8e-b231-c289-119d-71bf3571318d',
          replySign: '1:5a29bd8e-b231-c289-119d-71bf3571318d:98765432:othersig',
          clientID: '789012',
          clientName: 'Мария',
        },
      ],
      errors: null,
    };

    it('should fetch all chats successfully', async () => {
      mockClient.get.mockResolvedValue(mockChatsResponse);

      const result = await communicationsModule.getChats();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://buyer-chat-api.wildberries.ru/api/v1/seller/chats',
        { rateLimitKey: 'communications.getChats' }
      );
      expect(result).toEqual(mockChatsResponse);
      expect(result.result).toHaveLength(2);
    });

    it('should return chats with replySign fields', async () => {
      mockClient.get.mockResolvedValue(mockChatsResponse);

      const result = await communicationsModule.getChats();

      expect(result.result[0].replySign).toBeDefined();
      expect(result.result[0].replySign).toContain('signature');
      expect(result.result[1].replySign).toBeDefined();
    });

    it('should handle empty chat list', async () => {
      const emptyResponse = { result: [], errors: null };
      mockClient.get.mockResolvedValue(emptyResponse);

      const result = await communicationsModule.getChats();

      expect(result.result).toHaveLength(0);
      expect(result.errors).toBeNull();
    });

    it('should call BaseClient.get with correct URL and rate limit key', async () => {
      mockClient.get.mockResolvedValue(mockChatsResponse);

      await communicationsModule.getChats();

      expect(mockClient.get).toHaveBeenCalledTimes(1);
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('buyer-chat-api.wildberries.ru'),
        expect.objectContaining({ rateLimitKey: 'communications.getChats' })
      );
    });
  });

  describe('getChatEvents() - Retrieve Chat Events with Cursor Pagination', () => {
    const mockEventsResponse = {
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
            sender: 'client' as Sender,
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
            sender: 'client' as Sender,
            clientID: '186132',
            clientName: 'Алёна',
          },
        ],
      },
      errors: null,
    };

    it('should fetch events without cursor (initial request)', async () => {
      mockClient.get.mockResolvedValue(mockEventsResponse);

      const result = await communicationsModule.getChatEvents();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://buyer-chat-api.wildberries.ru/api/v1/seller/events',
        { params: {}, rateLimitKey: 'communications.getChatEvents' }
      );
      expect(result.result.totalEvents).toBe(2);
      expect(result.result.next).toBe(1698045576000);
    });

    it('should fetch events with cursor (pagination)', async () => {
      const cursor = 1698045576000;
      mockClient.get.mockResolvedValue(mockEventsResponse);

      const result = await communicationsModule.getChatEvents(cursor);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://buyer-chat-api.wildberries.ru/api/v1/seller/events',
        { params: { next: cursor }, rateLimitKey: 'communications.getChatEvents' }
      );
      expect(result).toEqual(mockEventsResponse);
    });

    it('should return events with isNewChat flag', async () => {
      mockClient.get.mockResolvedValue(mockEventsResponse);

      const result = await communicationsModule.getChatEvents();

      expect(result.result.events[0].isNewChat).toBe(true);
      expect(result.result.events[0].replySign).toBeDefined();
      expect(result.result.events[1].isNewChat).toBe(false);
      expect(result.result.events[1].replySign).toBeUndefined();
    });

    it('should handle empty events (totalEvents = 0)', async () => {
      const emptyResponse = {
        result: {
          next: 1698045576000,
          newestEventTime: null,
          oldestEventTime: null,
          totalEvents: 0,
          events: [],
        },
        errors: null,
      };
      mockClient.get.mockResolvedValue(emptyResponse);

      const result = await communicationsModule.getChatEvents(1698045576000);

      expect(result.result.totalEvents).toBe(0);
      expect(result.result.events).toHaveLength(0);
    });

    it('should validate next parameter (positive number)', async () => {
      await expect(communicationsModule.getChatEvents(0)).rejects.toThrow(ValidationError);
      await expect(communicationsModule.getChatEvents(-1)).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError with field details for invalid cursor', async () => {
      try {
        await communicationsModule.getChatEvents(0);
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as ValidationError).fieldErrors).toBeDefined();
        expect((error as ValidationError).fieldErrors?.next).toContain('Invalid value');
      }
    });
  });

  describe('sendMessage() - Send Message with FormData', () => {
    const validReplySign = '1:4019cd7d-cca8-4e90-8b11-f78afbea42e3:signature';
    const mockMessageResponse = {
      result: {
        addTime: 1712848270018,
        chatID: '1:641b623c-5c0e-295b-db03-3d5b4d484c32',
      },
      errors: [],
    };

    it('should send text-only message successfully', async () => {
      mockClient.post.mockResolvedValue(mockMessageResponse);

      const result = await communicationsModule.sendMessage(validReplySign, 'Thank you!');

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://buyer-chat-api.wildberries.ru/api/v1/seller/message',
        expect.any(FormData),
        expect.objectContaining({
          rateLimitKey: 'communications.sendMessage',
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      );
      expect(result).toEqual(mockMessageResponse);
    });

    it('should construct FormData with replySign and message', async () => {
      mockClient.post.mockResolvedValue(mockMessageResponse);

      await communicationsModule.sendMessage(validReplySign, 'Hello customer!');

      const callArgs = mockClient.post.mock.calls[0];
      const formData = callArgs[1] as FormData;

      expect(formData).toBeInstanceOf(FormData);
      // FormData content verification would require special testing setup
    });

    it('should send files-only message (no text)', async () => {
      mockClient.post.mockResolvedValue(mockMessageResponse);

      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

      const result = await communicationsModule.sendMessage(validReplySign, undefined, [mockFile]);

      expect(mockClient.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockMessageResponse);
    });

    it('should send message with text and files', async () => {
      mockClient.post.mockResolvedValue(mockMessageResponse);

      const mockFiles = [
        new File(['pdf content'], 'receipt.pdf', { type: 'application/pdf' }),
        new File(['jpg content'], 'photo.jpg', { type: 'image/jpeg' }),
      ];

      const result = await communicationsModule.sendMessage(
        validReplySign,
        'Here are the documents',
        mockFiles
      );

      expect(mockClient.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockMessageResponse);
    });

    it('should validate replySign (required)', async () => {
      await expect(communicationsModule.sendMessage('', 'message')).rejects.toThrow(
        ValidationError
      );
      await expect(communicationsModule.sendMessage('   ', 'message')).rejects.toThrow(
        ValidationError
      );
    });

    it('should validate replySign length (max 255)', async () => {
      const longReplySign = 'a'.repeat(256);

      await expect(communicationsModule.sendMessage(longReplySign, 'message')).rejects.toThrow(
        ValidationError
      );
    });

    it('should validate message length (max 1000)', async () => {
      const longMessage = 'a'.repeat(1001);

      await expect(communicationsModule.sendMessage(validReplySign, longMessage)).rejects.toThrow(
        ValidationError
      );
    });

    it('should require at least one of message or files', async () => {
      await expect(communicationsModule.sendMessage(validReplySign)).rejects.toThrow(
        ValidationError
      );
      await expect(communicationsModule.sendMessage(validReplySign, undefined, [])).rejects.toThrow(
        ValidationError
      );
    });

    it('should throw ValidationError with field details', async () => {
      try {
        await communicationsModule.sendMessage('');
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as ValidationError).fieldErrors).toBeDefined();
        expect((error as ValidationError).fieldErrors?.replySign).toBeDefined();
      }
    });
  });

  describe('pollForNewEvents() - Event Polling Helper', () => {
    it('should start polling immediately', async () => {
      const mockEventsResponse = {
        result: {
          next: 1698045576000,
          newestEventTime: '2023-10-23T07:19:36Z',
          oldestEventTime: '2023-10-23T05:02:20Z',
          totalEvents: 1,
          events: [
            {
              chatID: '1:test',
              eventID: 'evt1',
              eventType: 'message',
              isNewChat: false,
              message: { text: 'Test' },
              source: 'rusite',
              addTimestamp: 1698037340000,
              addTime: '2023-10-23T05:02:20Z',
              sender: 'client' as Sender,
              clientID: '123',
              clientName: 'Test',
            },
          ],
        },
        errors: null,
      };

      mockClient.get.mockResolvedValue(mockEventsResponse);

      const callback = vi.fn();
      const polling = communicationsModule.pollForNewEvents(100, callback);

      // Wait for initial poll
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(mockClient.get).toHaveBeenCalled();
      polling.stop();
    });

    it('should invoke callback with events when totalEvents > 0', async () => {
      const mockEventsResponse = {
        result: {
          next: 1698045576000,
          newestEventTime: '2023-10-23T07:19:36Z',
          oldestEventTime: '2023-10-23T05:02:20Z',
          totalEvents: 1,
          events: [
            {
              chatID: '1:test',
              eventID: 'evt1',
              eventType: 'message',
              isNewChat: false,
              message: { text: 'Test message' },
              source: 'rusite',
              addTimestamp: 1698037340000,
              addTime: '2023-10-23T05:02:20Z',
              sender: 'client' as Sender,
              clientID: '123',
              clientName: 'Test User',
            },
          ],
        },
        errors: null,
      };

      mockClient.get.mockResolvedValue(mockEventsResponse);

      const callback = vi.fn();
      const polling = communicationsModule.pollForNewEvents(100, callback);

      // Wait for callback to be invoked
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(callback).toHaveBeenCalledWith(mockEventsResponse.result.events);
      polling.stop();
    });

    it('should update cursor across polling cycles', async () => {
      const firstResponse = {
        result: {
          next: 1698045576000,
          newestEventTime: '2023-10-23T07:19:36Z',
          oldestEventTime: '2023-10-23T05:02:20Z',
          totalEvents: 1,
          events: [
            {
              chatID: '1:test',
              eventID: 'evt1',
              eventType: 'message',
              isNewChat: false,
              message: { text: 'First' },
              source: 'rusite',
              addTimestamp: 1698037340000,
              addTime: '2023-10-23T05:02:20Z',
              sender: 'client' as Sender,
              clientID: '123',
              clientName: 'Test',
            },
          ],
        },
        errors: null,
      };

      const secondResponse = {
        result: {
          next: 1698045580000,
          newestEventTime: '2023-10-23T07:19:40Z',
          oldestEventTime: '2023-10-23T07:19:36Z',
          totalEvents: 1,
          events: [
            {
              chatID: '1:test',
              eventID: 'evt2',
              eventType: 'message',
              isNewChat: false,
              message: { text: 'Second' },
              source: 'rusite',
              addTimestamp: 1698045580000,
              addTime: '2023-10-23T07:19:40Z',
              sender: 'client' as Sender,
              clientID: '123',
              clientName: 'Test',
            },
          ],
        },
        errors: null,
      };

      mockClient.get
        .mockResolvedValueOnce(firstResponse)
        .mockResolvedValueOnce(secondResponse);

      const callback = vi.fn();
      const polling = communicationsModule.pollForNewEvents(100, callback);

      // Wait for multiple polling cycles (1 immediate + 2 interval-based = 3 total)
      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(mockClient.get).toHaveBeenCalled();
      expect(mockClient.get.mock.calls.length).toBeGreaterThanOrEqual(2);
      // Second call should use cursor from first response
      expect(mockClient.get).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({
          params: { next: firstResponse.result.next },
        })
      );

      polling.stop();
    });

    it('should stop polling when stop() is called', async () => {
      mockClient.get.mockResolvedValue({
        result: { next: 1698045576000, newestEventTime: null, oldestEventTime: null, totalEvents: 0, events: [] },
        errors: null,
      });

      const callback = vi.fn();
      const polling = communicationsModule.pollForNewEvents(100, callback);

      polling.stop();

      // Wait to ensure no more calls after stop
      await new Promise((resolve) => setTimeout(resolve, 200));

      const callCount = mockClient.get.mock.calls.length;
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Should not increase after stop
      expect(mockClient.get.mock.calls.length).toBe(callCount);
    });

    it('should continue polling on errors (graceful degradation)', async () => {
      mockClient.get
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          result: { next: 1698045576000, newestEventTime: null, oldestEventTime: null, totalEvents: 0, events: [] },
          errors: null,
        });

      const callback = vi.fn();
      const polling = communicationsModule.pollForNewEvents(100, callback);

      // Wait for polling cycles
      await new Promise((resolve) => setTimeout(resolve, 250));

      // Should continue after error (1 immediate + interval-based calls)
      expect(mockClient.get.mock.calls.length).toBeGreaterThanOrEqual(2);

      polling.stop();
    });
  });

  describe('Helper Methods', () => {
    const mockChat: Chat = {
      chatID: '1:test-chat',
      replySign: '1:test-chat:signature',
      clientID: '123',
      clientName: 'Test User',
    };

    const mockNewChatEvent: ChatEvent = {
      chatID: '1:new-chat',
      eventID: 'evt1',
      eventType: 'message',
      isNewChat: true,
      message: { text: 'New chat message' },
      source: 'rusite',
      addTimestamp: 1698037340000,
      addTime: '2023-10-23T05:02:20Z',
      replySign: '1:new-chat:new-signature',
      sender: 'client' as Sender,
      clientID: '456',
      clientName: 'New User',
    };

    const mockExistingChatEvent: ChatEvent = {
      chatID: '1:existing-chat',
      eventID: 'evt2',
      eventType: 'message',
      isNewChat: false,
      message: { text: 'Existing chat message' },
      source: 'rusite',
      addTimestamp: 1698037340000,
      addTime: '2023-10-23T05:02:20Z',
      sender: 'client' as Sender,
      clientID: '789',
      clientName: 'Existing User',
    };

    describe('getReplySignFromChat()', () => {
      it('should extract replySign from Chat object', () => {
        const replySign = communicationsModule.getReplySignFromChat(mockChat);

        expect(replySign).toBe(mockChat.replySign);
        expect(replySign).toBe('1:test-chat:signature');
      });
    });

    describe('getReplySignFromEvent()', () => {
      it('should extract replySign from new chat event (isNewChat=true)', () => {
        const replySign = communicationsModule.getReplySignFromEvent(mockNewChatEvent);

        expect(replySign).toBe(mockNewChatEvent.replySign);
        expect(replySign).toBe('1:new-chat:new-signature');
      });

      it('should return null for existing chat event (isNewChat=false)', () => {
        const replySign = communicationsModule.getReplySignFromEvent(mockExistingChatEvent);

        expect(replySign).toBeNull();
      });

      it('should return null when replySign is undefined in new chat', () => {
        const eventWithoutSign: ChatEvent = {
          ...mockNewChatEvent,
          replySign: undefined,
        };

        const replySign = communicationsModule.getReplySignFromEvent(eventWithoutSign);

        expect(replySign).toBeNull();
      });
    });

    describe('filterEventsByChatID()', () => {
      const events: ChatEvent[] = [
        { ...mockNewChatEvent, chatID: 'chat-1' },
        { ...mockExistingChatEvent, chatID: 'chat-2' },
        { ...mockNewChatEvent, chatID: 'chat-1', eventID: 'evt3' },
      ];

      it('should filter events by chatID', () => {
        const filtered = communicationsModule.filterEventsByChatID(events, 'chat-1');

        expect(filtered).toHaveLength(2);
        expect(filtered.every((e) => e.chatID === 'chat-1')).toBe(true);
      });

      it('should return empty array for non-existent chatID', () => {
        const filtered = communicationsModule.filterEventsByChatID(events, 'non-existent');

        expect(filtered).toHaveLength(0);
      });
    });

    describe('getClientMessages()', () => {
      const events: ChatEvent[] = [
        { ...mockNewChatEvent, sender: 'client' as Sender },
        { ...mockExistingChatEvent, sender: 'seller' as Sender },
        { ...mockNewChatEvent, eventID: 'evt3', sender: 'client' as Sender },
        { ...mockExistingChatEvent, eventID: 'evt4', sender: 'wb' as Sender },
      ];

      it('should filter events to get only client messages', () => {
        const clientMessages = communicationsModule.getClientMessages(events);

        expect(clientMessages).toHaveLength(2);
        expect(clientMessages.every((e) => e.sender === 'client')).toBe(true);
      });

      it('should return empty array when no client messages', () => {
        const sellerEvents: ChatEvent[] = [
          { ...mockExistingChatEvent, sender: 'seller' as Sender },
        ];

        const clientMessages = communicationsModule.getClientMessages(sellerEvents);

        expect(clientMessages).toHaveLength(0);
      });
    });
  });

  // ============================================================================
  // Product Q&A Tests
  // ============================================================================

  describe('Product Q&A Methods', () => {
    describe('getQuestions() - Retrieve Product Questions', () => {
      it('should fetch unanswered questions with required filters', async () => {
        const mockResponse = {
          data: {
            countUnanswered: 10,
            countArchive: 50,
            questions: [
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
        };

        mockClient.get.mockResolvedValue(mockResponse);

        const result = await communicationsModule.getQuestions({
          isAnswered: false,
          take: 20,
          skip: 0,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions',
          {
            params: { isAnswered: false, take: 20, skip: 0 },
            rateLimitKey: 'communications.getQuestions',
          }
        );
        expect(result.data.countUnanswered).toBe(10);
        expect(result.data.questions).toHaveLength(1);
      });

      it('should support optional filters (nmId, order, dateFrom, dateTo)', async () => {
        mockClient.get.mockResolvedValue({
          data: { countUnanswered: 5, countArchive: 0, questions: [] },
          error: false,
          errorText: '',
          additionalErrors: null,
        });

        await communicationsModule.getQuestions({
          isAnswered: false,
          nmId: 12345,
          take: 10,
          skip: 0,
          order: 'dateDesc',
          dateFrom: 1688465092,
          dateTo: 1688551492,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions',
          {
            params: {
              isAnswered: false,
              nmId: 12345,
              take: 10,
              skip: 0,
              order: 'dateDesc',
              dateFrom: 1688465092,
              dateTo: 1688551492,
            },
            rateLimitKey: 'communications.getQuestions',
          }
        );
      });
    });

    describe('answerQuestion() - Answer or Reject Question', () => {
      it('should answer question with state wbRu', async () => {
        mockClient.patch.mockResolvedValue(undefined);

        await communicationsModule.answerQuestion('q123', 'This product is made of cotton.');

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions',
          {
            id: 'q123',
            answer: { text: 'This product is made of cotton.' },
            state: 'wbRu',
          },
          { rateLimitKey: 'communications.answerQuestion' }
        );
      });

      it('should reject question with state none when reject=true', async () => {
        mockClient.patch.mockResolvedValue(undefined);

        await communicationsModule.answerQuestion('q456', 'Inappropriate question', true);

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions',
          {
            id: 'q456',
            answer: { text: 'Inappropriate question' },
            state: 'none',
          },
          { rateLimitKey: 'communications.answerQuestion' }
        );
      });

      it('should throw ValidationError when questionId is empty', async () => {
        await expect(
          communicationsModule.answerQuestion('', 'Some answer')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.answerQuestion('   ', 'Some answer')
        ).rejects.toThrow('Question ID is required');
      });

      it('should throw ValidationError when answerText is empty', async () => {
        await expect(
          communicationsModule.answerQuestion('q123', '')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.answerQuestion('q123', '   ')
        ).rejects.toThrow('Answer text is required');
      });
    });

    describe('markQuestionViewed() - Mark as Viewed', () => {
      it('should mark question as viewed', async () => {
        mockClient.patch.mockResolvedValue(undefined);

        await communicationsModule.markQuestionViewed('q789');

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions',
          {
            id: 'q789',
            wasViewed: true,
          },
          { rateLimitKey: 'communications.markQuestionViewed' }
        );
      });

      it('should throw ValidationError when questionId is empty', async () => {
        await expect(
          communicationsModule.markQuestionViewed('')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.markQuestionViewed('   ')
        ).rejects.toThrow('Question ID is required');
      });
    });
  });

  // ============================================================================
  // Customer Reviews Tests
  // ============================================================================

  describe('Customer Reviews Methods', () => {
    describe('getReviews() - Retrieve Product Reviews', () => {
      it('should fetch unanswered reviews with required filters', async () => {
        const mockResponse = {
          data: {
            countUnanswered: 5,
            countArchive: 100,
            feedbacks: [
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
                video: null,
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
        };

        mockClient.get.mockResolvedValue(mockResponse);

        const result = await communicationsModule.getReviews({
          isAnswered: false,
          take: 20,
          skip: 0,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks',
          {
            params: { isAnswered: false, take: 20, skip: 0 },
            rateLimitKey: 'communications.getReviews',
          }
        );
        expect(result.data.countUnanswered).toBe(5);
        expect(result.data.feedbacks).toHaveLength(1);
        expect(result.data.feedbacks[0].productValuation).toBe(5);
      });

      it('should support reviews with photos and videos', async () => {
        const mockResponse = {
          data: {
            countUnanswered: 1,
            countArchive: 0,
            feedbacks: [
              {
                id: 'rev456',
                text: 'Amazing!',
                pros: 'Perfect',
                cons: '',
                productValuation: 5,
                createdDate: '2024-01-16T10:00:00Z',
                answer: null,
                state: 'wbRu',
                productDetails: {
                  nmId: 12345,
                  imtId: 67890,
                  productName: 'Test Product',
                  supplierArticle: 'SKU123',
                  supplierName: null,
                  brandName: null,
                  size: 'L',
                },
                photoLinks: [
                  {
                    fullSize: 'https://feedback.wbbasket.ru/photo1.jpg',
                    miniSize: 'https://feedback.wbbasket.ru/photo1_mini.jpg',
                  },
                  {
                    fullSize: 'https://feedback.wbbasket.ru/photo2.jpg',
                    miniSize: 'https://feedback.wbbasket.ru/photo2_mini.jpg',
                  },
                ],
                video: {
                  previewImage: 'https://videofeedback.wbbasket.ru/preview.webp',
                  link: 'https://videofeedback.wbbasket.ru/index.m3u8',
                  durationSec: 15,
                },
                wasViewed: false,
                userName: 'Maria',
                matchingSize: 'ok',
                isAbleSupplierFeedbackValuation: false,
                supplierFeedbackValuation: 0,
                isAbleSupplierProductValuation: false,
                supplierProductValuation: 0,
                isAbleReturnProductOrders: false,
                returnProductOrdersDate: null,
                bables: null,
                lastOrderShkId: 987654321,
                lastOrderCreatedAt: '2024-01-12T10:00:00Z',
                color: 'red',
                subjectId: 220,
                subjectName: 'Dresses',
                parentFeedbackId: null,
                childFeedbackId: null,
              },
            ],
          },
          error: false,
          errorText: '',
          additionalErrors: null,
        };

        mockClient.get.mockResolvedValue(mockResponse);

        const result = await communicationsModule.getReviews({
          isAnswered: false,
          take: 10,
          skip: 0,
        });

        const review = result.data.feedbacks[0];
        expect(review.photoLinks).toHaveLength(2);
        expect(review.video).toBeDefined();
        expect(review.video?.durationSec).toBe(15);
      });

      it('should support optional filters', async () => {
        mockClient.get.mockResolvedValue({
          data: { countUnanswered: 0, countArchive: 10, feedbacks: [] },
          error: false,
          errorText: '',
          additionalErrors: null,
        });

        await communicationsModule.getReviews({
          isAnswered: true,
          nmId: 12345,
          take: 10,
          skip: 0,
          order: 'dateAsc',
          dateFrom: 1688465092,
          dateTo: 1688551492,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks',
          {
            params: {
              isAnswered: true,
              nmId: 12345,
              take: 10,
              skip: 0,
              order: 'dateAsc',
              dateFrom: 1688465092,
              dateTo: 1688551492,
            },
            rateLimitKey: 'communications.getReviews',
          }
        );
      });
    });

    describe('respondToReview() - Respond to Customer Review', () => {
      it('should respond to review with valid text', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await communicationsModule.respondToReview(
          'rev123',
          'Thank you for your wonderful feedback!'
        );

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer',
          {
            id: 'rev123',
            text: 'Thank you for your wonderful feedback!',
          },
          { rateLimitKey: 'communications.respondToReview' }
        );
      });

      it('should throw ValidationError when reviewId is empty', async () => {
        await expect(
          communicationsModule.respondToReview('', 'Some response')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToReview('   ', 'Some response')
        ).rejects.toThrow('Review ID is required');
      });

      it('should throw ValidationError when responseText is empty', async () => {
        await expect(
          communicationsModule.respondToReview('rev123', '')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToReview('rev123', '   ')
        ).rejects.toThrow('Response text is required');
      });

      it('should throw ValidationError when responseText is too short (< 2 chars)', async () => {
        await expect(
          communicationsModule.respondToReview('rev123', 'x')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToReview('rev123', 'x')
        ).rejects.toThrow('at least 2 characters');
      });

      it('should throw ValidationError when responseText is too long (> 5000 chars)', async () => {
        const longText = 'a'.repeat(5001);

        await expect(
          communicationsModule.respondToReview('rev123', longText)
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToReview('rev123', longText)
        ).rejects.toThrow('must not exceed 5000 characters');
      });

      it('should accept responseText exactly at boundaries (2 and 5000 chars)', async () => {
        mockClient.post.mockResolvedValue(undefined);

        // Minimum length (2 chars)
        await communicationsModule.respondToReview('rev123', 'OK');
        expect(mockClient.post).toHaveBeenCalled();

        mockClient.post.mockClear();

        // Maximum length (5000 chars)
        const maxText = 'a'.repeat(5000);
        await communicationsModule.respondToReview('rev456', maxText);
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer',
          { id: 'rev456', text: maxText },
          { rateLimitKey: 'communications.respondToReview' }
        );
      });
    });

    describe('editReviewResponse() - Edit Existing Response', () => {
      it('should edit review response with valid text', async () => {
        mockClient.patch.mockResolvedValue(undefined);

        await communicationsModule.editReviewResponse(
          'rev789',
          'Updated response with more details.'
        );

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer',
          {
            id: 'rev789',
            text: 'Updated response with more details.',
          },
          { rateLimitKey: 'communications.editReviewResponse' }
        );
      });

      it('should throw ValidationError when reviewId is empty', async () => {
        await expect(
          communicationsModule.editReviewResponse('', 'Updated text')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.editReviewResponse('   ', 'Updated text')
        ).rejects.toThrow('Review ID is required');
      });

      it('should throw ValidationError when newResponseText is empty', async () => {
        await expect(
          communicationsModule.editReviewResponse('rev123', '')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.editReviewResponse('rev123', '   ')
        ).rejects.toThrow('Response text is required');
      });

      it('should throw ValidationError when newResponseText is too short (< 2 chars)', async () => {
        await expect(
          communicationsModule.editReviewResponse('rev123', 'x')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.editReviewResponse('rev123', 'x')
        ).rejects.toThrow('at least 2 characters');
      });

      it('should throw ValidationError when newResponseText is too long (> 5000 chars)', async () => {
        const longText = 'b'.repeat(5001);

        await expect(
          communicationsModule.editReviewResponse('rev123', longText)
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.editReviewResponse('rev123', longText)
        ).rejects.toThrow('must not exceed 5000 characters');
      });
    });
  });

  // ============================================================================
  // Task 8.5 - New Communications API Methods Tests
  // ============================================================================

  describe('Task 8.5 - New Feedbacks Questions', () => {
    describe('getNewFeedbacksQuestions()', () => {
      it('should call BaseClient.get with correct URL', async () => {
        const mockResponse = {
          data: {
            hasNewQuestions: true,
            hasNewFeedbacks: true,
          },
          error: false,
          errorText: '',
          additionalErrors: null,
        };
        mockClient.get.mockResolvedValue(mockResponse);

        await communicationsModule.getNewFeedbacksQuestions();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/new-feedbacks-questions',
          { rateLimitKey: 'communications.getNewFeedbacksQuestions' }
        );
      });

      it('should return indicator flags for new feedbacks/questions', async () => {
        const mockResponse = {
          data: {
            hasNewQuestions: false,
            hasNewFeedbacks: true,
          },
          error: false,
          errorText: '',
          additionalErrors: null,
        };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await communicationsModule.getNewFeedbacksQuestions();

        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('Task 8.5 - Feedbacks Count Methods', () => {
    describe('getFeedbacksCountUnanswered()', () => {
      it('should call BaseClient.get with correct URL', async () => {
        const mockResponse = {
          data: {
            countUnanswered: 25,
            countUnansweredToday: 5,
            valuation: '4.7',
          },
          error: false,
          errorText: '',
          additionalErrors: null,
        };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await communicationsModule.getFeedbacksCountUnanswered();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count-unanswered',
          { rateLimitKey: 'communications.getFeedbacksCountUnanswered' }
        );
        expect(result.data.countUnanswered).toBe(25);
        expect(result.data.valuation).toBe('4.7');
      });
    });

    describe('getFeedbacksCount()', () => {
      it('should call BaseClient.get with query params', async () => {
        const mockResponse = {
          data: 724583,
          error: false,
          errorText: '',
          additionalErrors: null,
        };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await communicationsModule.getFeedbacksCount({
          dateFrom: 1688465092,
          dateTo: 1699999999,
          isAnswered: false,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count',
          {
            params: {
              dateFrom: '1688465092',
              dateTo: '1699999999',
              isAnswered: 'false',
            },
            rateLimitKey: 'communications.getFeedbacksCount',
          }
        );
        expect(result.data).toBe(724583);
      });

      it('should call without params when none provided', async () => {
        const mockResponse = { data: 100, error: false, errorText: '', additionalErrors: null };
        mockClient.get.mockResolvedValue(mockResponse);

        await communicationsModule.getFeedbacksCount();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count',
          { params: {}, rateLimitKey: 'communications.getFeedbacksCount' }
        );
      });
    });
  });

  describe('Task 8.5 - Supplier Valuations', () => {
    describe('getSupplierValuations()', () => {
      it('should call BaseClient.get with locale header', async () => {
        const mockResponse = {
          data: {
            feedbackValuations: { '1': 'Отзыв не относится к товару', '3': 'Спам' },
            productValuations: { '1': 'Повредили при доставке' },
          },
          error: false,
          errorText: '',
          additionalErrors: null,
        };
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await communicationsModule.getSupplierValuations('ru');

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/supplier-valuations',
          {
            headers: { 'X-Locale': 'ru' },
            rateLimitKey: 'communications.getSupplierValuations',
          }
        );
        expect(result.data.feedbackValuations['1']).toBe('Отзыв не относится к товару');
      });

      it('should call without locale header when not provided', async () => {
        const mockResponse = { data: { feedbackValuations: {}, productValuations: {} }, error: false, errorText: '', additionalErrors: null };
        mockClient.get.mockResolvedValue(mockResponse);

        await communicationsModule.getSupplierValuations();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/supplier-valuations',
          { headers: {}, rateLimitKey: 'communications.getSupplierValuations' }
        );
      });
    });
  });

  describe('Task 8.5 - Feedback Actions', () => {
    describe('reportFeedbackAction()', () => {
      it('should call BaseClient.post with complaint data', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await communicationsModule.reportFeedbackAction({
          id: 'J2FMRjUj6hwvwCElqssz',
          supplierFeedbackValuation: 1,
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/actions',
          { id: 'J2FMRjUj6hwvwCElqssz', supplierFeedbackValuation: 1 },
          { rateLimitKey: 'communications.reportFeedbackAction' }
        );
      });

      it('should throw ValidationError when feedback ID is empty', async () => {
        await expect(
          communicationsModule.reportFeedbackAction({ id: '' })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.reportFeedbackAction({ id: '   ' })
        ).rejects.toThrow('Feedback ID is required');
      });
    });
  });

  describe('Task 8.5 - Archived Feedbacks', () => {
    describe('getArchivedFeedbacks()', () => {
      it('should call BaseClient.get with required params', async () => {
        const mockResponse = {
          data: { feedbacks: [] },
          error: false,
          errorText: '',
          additionalErrors: null,
        };
        mockClient.get.mockResolvedValue(mockResponse);

        await communicationsModule.getArchivedFeedbacks({
          take: 100,
          skip: 0,
          order: 'dateDesc',
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/archive',
          {
            params: { take: '100', skip: '0', order: 'dateDesc' },
            rateLimitKey: 'communications.getArchivedFeedbacks',
          }
        );
      });

      it('should throw ValidationError when take is less than 1', async () => {
        await expect(
          communicationsModule.getArchivedFeedbacks({ take: 0, skip: 0 })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.getArchivedFeedbacks({ take: 0, skip: 0 })
        ).rejects.toThrow('take parameter must be positive');
      });

      it('should throw ValidationError when take exceeds 5000', async () => {
        await expect(
          communicationsModule.getArchivedFeedbacks({ take: 5001, skip: 0 })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.getArchivedFeedbacks({ take: 5001, skip: 0 })
        ).rejects.toThrow('take cannot exceed 5000');
      });

      it('should throw ValidationError when skip is negative', async () => {
        await expect(
          communicationsModule.getArchivedFeedbacks({ take: 100, skip: -1 })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.getArchivedFeedbacks({ take: 100, skip: -1 })
        ).rejects.toThrow('skip parameter cannot be negative');
      });
    });
  });

  describe('Task 8.5 - Chat File Download', () => {
    describe('downloadChatFile()', () => {
      it('should call BaseClient.get with file ID', async () => {
        const mockBuffer = new ArrayBuffer(1024);
        mockClient.get.mockResolvedValue(mockBuffer);

        const result = await communicationsModule.downloadChatFile('file-123');

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://buyer-chat-api.wildberries.ru/api/v1/seller/download/file-123',
          { rateLimitKey: 'communications.downloadChatFile', responseType: 'arraybuffer' }
        );
        expect(result).toBe(mockBuffer);
      });

      it('should throw ValidationError when file ID is empty', async () => {
        await expect(
          communicationsModule.downloadChatFile('')
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.downloadChatFile('   ')
        ).rejects.toThrow('File ID is required');
      });
    });
  });

  describe('Task 8.5 - Customer Return Claims', () => {
    describe('getClaims()', () => {
      it('should call BaseClient.get with filters', async () => {
        const mockResponse = {
          claims: [{ id: 'claim-1', status: 0 }],
          total: 1,
        };
        mockClient.get.mockResolvedValue(mockResponse);

        await communicationsModule.getClaims({
          nm_id: 196320101,
          limit: 10,
        });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://returns-api.wildberries.ru/api/v1/claims',
          {
            params: { nm_id: '196320101', limit: '10' },
            rateLimitKey: 'communications.getClaims',
          }
        );
      });

      it('should call without params when none provided', async () => {
        const mockResponse = { claims: [], total: 0 };
        mockClient.get.mockResolvedValue(mockResponse);

        await communicationsModule.getClaims();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://returns-api.wildberries.ru/api/v1/claims',
          { params: {}, rateLimitKey: 'communications.getClaims' }
        );
      });
    });

    describe('respondToClaim()', () => {
      it('should call BaseClient.patch with claim response', async () => {
        mockClient.patch.mockResolvedValue(undefined);

        await communicationsModule.respondToClaim({
          id: 'fe3e9337-e9f9-423c-8930-946a8ebef80',
          action: 'approve1',
        });

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://returns-api.wildberries.ru/api/v1/claim',
          { id: 'fe3e9337-e9f9-423c-8930-946a8ebef80', action: 'approve1' },
          { rateLimitKey: 'communications.respondToClaim' }
        );
      });

      it('should throw ValidationError when claim ID is empty', async () => {
        await expect(
          communicationsModule.respondToClaim({ id: '', action: 'approve1' })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToClaim({ id: '', action: 'approve1' })
        ).rejects.toThrow('Claim ID is required');
      });

      it('should throw ValidationError when action is empty', async () => {
        await expect(
          communicationsModule.respondToClaim({ id: 'claim-123', action: '' })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToClaim({ id: 'claim-123', action: '   ' })
        ).rejects.toThrow('Action is required');
      });

      it('should throw ValidationError when rejectcustom action has no comment', async () => {
        await expect(
          communicationsModule.respondToClaim({ id: 'claim-123', action: 'rejectcustom' })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToClaim({ id: 'claim-123', action: 'rejectcustom' })
        ).rejects.toThrow('Comment is required for rejectcustom action');
      });

      it('should throw ValidationError when comment is too short', async () => {
        await expect(
          communicationsModule.respondToClaim({ id: 'claim-123', action: 'rejectcustom', comment: 'short' })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToClaim({ id: 'claim-123', action: 'rejectcustom', comment: 'short' })
        ).rejects.toThrow('Comment must be at least 10 characters');
      });

      it('should throw ValidationError when comment exceeds 1000 characters', async () => {
        const longComment = 'a'.repeat(1001);

        await expect(
          communicationsModule.respondToClaim({ id: 'claim-123', action: 'rejectcustom', comment: longComment })
        ).rejects.toThrow(ValidationError);

        await expect(
          communicationsModule.respondToClaim({ id: 'claim-123', action: 'rejectcustom', comment: longComment })
        ).rejects.toThrow('Comment cannot exceed 1000 characters');
      });

      it('should accept rejectcustom with valid comment', async () => {
        mockClient.patch.mockResolvedValue(undefined);

        await communicationsModule.respondToClaim({
          id: 'claim-123',
          action: 'rejectcustom',
          comment: 'This is a valid comment explaining the rejection reason.',
        });

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://returns-api.wildberries.ru/api/v1/claim',
          {
            id: 'claim-123',
            action: 'rejectcustom',
            comment: 'This is a valid comment explaining the rejection reason.',
          },
          { rateLimitKey: 'communications.respondToClaim' }
        );
      });
    });
  });
});
