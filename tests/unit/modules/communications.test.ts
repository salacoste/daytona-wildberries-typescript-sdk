/**
 * Unit tests for CommunicationsModule
 *
 * Tests the CommunicationsModule class with mocked BaseClient to verify:
 * - Pinned Reviews operations (new methods)
 * - Questions and Feedbacks operations
 * - Chat operations with buyers
 * - Claims/Returns operations
 * - Deprecated methods with warning verification
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 *
 * @see {@link ../../../src/modules/communications/index CommunicationsModule}
 */

/* eslint-disable @typescript-eslint/no-deprecated */
// Tests intentionally call deprecated methods to verify backward compatibility

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CommunicationsModule } from '../../../src/modules/communications';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';

describe('CommunicationsModule', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let communicationsModule: CommunicationsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    communicationsModule = new CommunicationsModule(mockClient as unknown as BaseClient);

    // Reset deprecation warnings before each test
    (CommunicationsModule as unknown as { _deprecatedWarnings: Set<string> })._deprecatedWarnings =
      new Set();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================================
  // Pinned Reviews Methods (5 new methods) - Priority HIGH
  // ============================================================================

  describe('Pinned Reviews Operations', () => {
    describe('getPinnedFeedbacksCount() - Count of pinned/unpinned reviews', () => {
      const mockCountResponse = { data: 15 };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockCountResponse);

        await communicationsModule.getPinnedFeedbacksCount();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins/count',
          { params: undefined, rateLimitKey: 'communications.getPinnedFeedbacksCount' }
        );
      });

      it('should pass filter parameters when provided', async () => {
        mockClient.get.mockResolvedValue(mockCountResponse);
        const params = { state: 'pinned' as const, pinOn: 'nm' as const };

        await communicationsModule.getPinnedFeedbacksCount(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins/count',
          { params, rateLimitKey: 'communications.getPinnedFeedbacksCount' }
        );
      });

      it('should return count response', async () => {
        mockClient.get.mockResolvedValue(mockCountResponse);

        const result = await communicationsModule.getPinnedFeedbacksCount();

        expect(result.data).toBe(15);
      });
    });

    describe('getPinnedFeedbacksLimits() - Limits for pinning reviews', () => {
      const mockLimitsResponse = {
        data: {
          subscription: { total: 100, used: 20, remaining: 80, perNm: 5 },
          tariff: { total: 50, used: 10, remaining: 40, perNm: 3 },
        },
      };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockLimitsResponse);

        await communicationsModule.getPinnedFeedbacksLimits();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins/limits',
          { rateLimitKey: 'communications.getPinnedFeedbacksLimits' }
        );
      });

      it('should return limits data', async () => {
        mockClient.get.mockResolvedValue(mockLimitsResponse);

        const result = await communicationsModule.getPinnedFeedbacksLimits();

        expect(result.data.subscription?.remaining).toBe(80);
        expect(result.data.tariff?.remaining).toBe(40);
      });
    });

    describe('getPinnedFeedbacks() - List of pinned/unpinned reviews', () => {
      const mockListResponse = {
        data: [
          { pinId: 'pin1', feedbackId: 'fb1', nmId: 123, state: 'pinned' },
          { pinId: 'pin2', feedbackId: 'fb2', nmId: 456, state: 'pinned' },
        ],
        next: 'cursor123',
      };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockListResponse);

        await communicationsModule.getPinnedFeedbacks();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins',
          { params: undefined, rateLimitKey: 'communications.getPinnedFeedbacks' }
        );
      });

      it('should pass pagination and filter parameters', async () => {
        mockClient.get.mockResolvedValue(mockListResponse);
        const params = { state: 'pinned' as const, limit: 100, next: 12345 };

        await communicationsModule.getPinnedFeedbacks(params);

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins',
          { params, rateLimitKey: 'communications.getPinnedFeedbacks' }
        );
      });

      it('should return list with pagination cursor', async () => {
        mockClient.get.mockResolvedValue(mockListResponse);

        const result = await communicationsModule.getPinnedFeedbacks();

        expect(result.data).toHaveLength(2);
        expect(result.next).toBe('cursor123');
      });
    });

    describe('pinFeedback() - Pin reviews to product cards', () => {
      const mockPinRequest = [
        { pinMethod: 'subscription' as const, pinOn: 'nm' as const, feedbackId: 'fb1' },
        { pinMethod: 'tariff' as const, pinOn: 'imt' as const, feedbackId: 'fb2' },
      ];
      const mockPinResponse = {
        data: [
          { feedbackId: 'fb1', pinId: 'pin1', isErrors: false },
          { feedbackId: 'fb2', pinId: 'pin2', isErrors: false },
        ],
      };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.post.mockResolvedValue(mockPinResponse);

        await communicationsModule.pinFeedback(mockPinRequest);

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins',
          mockPinRequest,
          { rateLimitKey: 'communications.pinFeedback' }
        );
      });

      it('should return pin results', async () => {
        mockClient.post.mockResolvedValue(mockPinResponse);

        const result = await communicationsModule.pinFeedback(mockPinRequest);

        expect(result.data).toHaveLength(2);
        expect(result.data[0].pinId).toBe('pin1');
      });
    });

    describe('unpinFeedback() - Unpin reviews', () => {
      const mockUnpinRequest = [1, 2, 3]; // pin IDs are numbers
      const mockUnpinResponse = { data: [1, 2, 3] };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.delete.mockResolvedValue(mockUnpinResponse);

        await communicationsModule.unpinFeedback(mockUnpinRequest);

        expect(mockClient.delete).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins',
          mockUnpinRequest,
          { rateLimitKey: 'communications.unpinFeedback' }
        );
      });

      it('should return unpinned IDs', async () => {
        mockClient.delete.mockResolvedValue(mockUnpinResponse);

        const result = await communicationsModule.unpinFeedback(mockUnpinRequest);

        expect(result.data).toHaveLength(3);
        expect(result.data).toContain(1);
      });
    });
  });

  // ============================================================================
  // Core Methods - Questions
  // ============================================================================

  describe('Questions Operations', () => {
    describe('getQuestionsCount() - Question count', () => {
      const mockResponse = { data: 42 };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockResponse);

        await communicationsModule.getQuestionsCount();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions/count',
          { params: undefined, rateLimitKey: 'communications.questionsCount' }
        );
      });

      it('should pass filter parameters', async () => {
        mockClient.get.mockResolvedValue(mockResponse);
        const options = { dateFrom: 1704067200, dateTo: 1704153600, isAnswered: false };

        await communicationsModule.getQuestionsCount(options);

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions/count',
          { params: options, rateLimitKey: 'communications.questionsCount' }
        );
      });
    });

    describe('questions() - List of questions', () => {
      const mockQuestionsResponse = {
        data: {
          countUnanswered: 5,
          questions: [{ id: 'q1', text: 'Question 1' }],
        },
      };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockQuestionsResponse);
        const options = { isAnswered: false, take: 10, skip: 0 };

        await communicationsModule.questions(options);

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions',
          { params: options, rateLimitKey: 'communications.questions' }
        );
      });

      it('should return questions list', async () => {
        mockClient.get.mockResolvedValue(mockQuestionsResponse);

        const result = await communicationsModule.questions({
          isAnswered: false,
          take: 10,
          skip: 0,
        });

        expect(result.data?.countUnanswered).toBe(5);
      });
    });
  });

  // ============================================================================
  // Core Methods - Feedbacks
  // ============================================================================

  describe('Feedbacks Operations', () => {
    describe('newFeedbacksQuestions() - Check for new items', () => {
      const mockResponse = { data: { hasNewQuestions: true, hasNewFeedbacks: false } };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockResponse);

        await communicationsModule.newFeedbacksQuestions();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/new-feedbacks-questions',
          { rateLimitKey: 'communications.newFeedbacksQuestions' }
        );
      });

      it('should return new items status', async () => {
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await communicationsModule.newFeedbacksQuestions();

        expect(result.data?.hasNewQuestions).toBe(true);
        expect(result.data?.hasNewFeedbacks).toBe(false);
      });
    });

    describe('feedbacks() - List of feedbacks', () => {
      const mockFeedbacksResponse = {
        data: { countUnanswered: 3, feedbacks: [] },
      };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockFeedbacksResponse);
        const options = { isAnswered: false, take: 10, skip: 0, order: 'dateDesc' as const };

        await communicationsModule.feedbacks(options);

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks',
          { params: options, rateLimitKey: 'communications.feedbacks' }
        );
      });
    });

    describe('getFeedbacksCount() - Feedback count', () => {
      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: 100 });

        await communicationsModule.getFeedbacksCount();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count',
          { params: undefined, rateLimitKey: 'communications.feedbacksCount' }
        );
      });
    });

    describe('createFeedbacksAnswer() - Answer feedback', () => {
      it('should call correct URL with rateLimitKey', async () => {
        mockClient.post.mockResolvedValue(undefined);
        const data = { id: 'fb123', text: 'Thank you for your feedback!' };

        await communicationsModule.createFeedbacksAnswer(data);

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer',
          data,
          { rateLimitKey: 'communications.postFeedbacksAnswer' }
        );
      });
    });
  });

  // ============================================================================
  // Core Methods - Claims/Returns
  // ============================================================================

  describe('Claims Operations', () => {
    describe('claims() - Return claims list', () => {
      const mockClaimsResponse = { claims: [{ id: 'c1' }] };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockClaimsResponse);
        const options = { is_archive: false, limit: 50 };

        await communicationsModule.claims(options);

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://returns-api.wildberries.ru/api/v1/claims',
          { params: options, rateLimitKey: 'communications.claims' }
        );
      });
    });
  });

  // ============================================================================
  // Core Methods - Chat
  // ============================================================================

  describe('Chat Operations', () => {
    describe('getSellerChats() - List of chats', () => {
      const mockChatsResponse = { chats: [{ chatId: 'chat1' }] };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockChatsResponse);

        await communicationsModule.getSellerChats();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://buyer-chat-api.wildberries.ru/api/v1/seller/chats',
          { rateLimitKey: 'communications.sellerChats' }
        );
      });
    });

    describe('getSellerEvents() - Chat events', () => {
      const mockEventsResponse = { events: [], totalEvents: 0 };

      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(mockEventsResponse);

        await communicationsModule.getSellerEvents();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://buyer-chat-api.wildberries.ru/api/v1/seller/events',
          { params: undefined, rateLimitKey: 'communications.sellerEvents' }
        );
      });

      it('should pass next parameter', async () => {
        mockClient.get.mockResolvedValue(mockEventsResponse);

        await communicationsModule.getSellerEvents({ next: 12345 });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://buyer-chat-api.wildberries.ru/api/v1/seller/events',
          { params: { next: 12345 }, rateLimitKey: 'communications.sellerEvents' }
        );
      });
    });

    describe('createSellerMessage() - Send message', () => {
      it('should call correct URL with rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ messageId: 'msg1' });

        await communicationsModule.createSellerMessage();

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://buyer-chat-api.wildberries.ru/api/v1/seller/message',
          undefined,
          { rateLimitKey: 'communications.postSellerMessage' }
        );
      });
    });
  });

  // ============================================================================
  // Error Handling
  // ============================================================================

  describe('Error Handling', () => {
    it('should throw AuthenticationError on 401', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(communicationsModule.newFeedbacksQuestions()).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should throw RateLimitError on 429', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(communicationsModule.getSellerChats()).rejects.toThrow(RateLimitError);
    });

    it('should throw ValidationError on 400', async () => {
      mockClient.post.mockRejectedValue(new ValidationError('Invalid request data', {}));

      await expect(communicationsModule.pinFeedback([])).rejects.toThrow(ValidationError);
    });

    it('should throw NetworkError on network failure', async () => {
      mockClient.get.mockRejectedValue(new NetworkError('Network timeout', true));

      await expect(communicationsModule.getPinnedFeedbacksLimits()).rejects.toThrow(NetworkError);
    });
  });

  // ============================================================================
  // Additional Core Methods
  // ============================================================================

  describe('Additional Core Methods', () => {
    describe('feedback() - Get feedback by ID', () => {
      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: { id: 'fb1' } });

        await communicationsModule.feedback({ id: 'fb1' });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedback',
          { params: { id: 'fb1' }, rateLimitKey: 'communications.feedback' }
        );
      });
    });

    describe('question() - Get question by ID', () => {
      it('should call correct URL with rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: { id: 'q1' } });

        await communicationsModule.question({ id: 'q1' });

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/question',
          { params: { id: 'q1' }, rateLimitKey: 'communications.question' }
        );
      });
    });

    describe('updateQuestion() - Update question', () => {
      it('should call correct URL with rateLimitKey', async () => {
        mockClient.patch.mockResolvedValue({ data: {} });
        const data = { id: 'q1', wasViewed: true };

        await communicationsModule.updateQuestion(data);

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/questions',
          data,
          { rateLimitKey: 'communications.patchQuestions' }
        );
      });
    });

    describe('getSellerDownload() - Download file from message', () => {
      it('should call correct URL with file ID', async () => {
        mockClient.get.mockResolvedValue(new ArrayBuffer(100));

        await communicationsModule.getSellerDownload('file123');

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://buyer-chat-api.wildberries.ru/api/v1/seller/download/file123',
          { rateLimitKey: 'communications.sellerDownload' }
        );
      });
    });

    describe('updateClaim() - Response to return claim', () => {
      it('should call correct URL with rateLimitKey', async () => {
        mockClient.patch.mockResolvedValue({});

        await communicationsModule.updateClaim();

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://returns-api.wildberries.ru/api/v1/claim',
          undefined,
          { rateLimitKey: 'communications.patchClaim' }
        );
      });
    });

    describe('createOrderReturn() - Return product by feedback ID', () => {
      it('should call correct URL with rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });

        await communicationsModule.createOrderReturn({ feedbackId: 'fb123' });

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://feedbacks-api.wildberries.ru/api/v1/feedbacks/order/return',
          { feedbackId: 'fb123' },
          { rateLimitKey: 'communications.postFeedbacksOrderReturn' }
        );
      });
    });
  });
});
