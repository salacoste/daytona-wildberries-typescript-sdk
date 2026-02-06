/**
 * TDD Tests for EPIC 36: Communications Type Expansion
 *
 * These tests verify that the Communications module has proper type coverage.
 *
 * NOTE: TypeScript interfaces are compile-time only constructs and are erased
 * during compilation. Runtime checks using Object.keys() cannot verify interfaces.
 * Type correctness is verified by:
 * 1. TypeScript compilation passing (npx tsc --noEmit)
 * 2. These structural tests verifying module behavior
 *
 * Acceptance Criteria verified:
 *  1. All swagger schemas have TypeScript types (verified by compilation)
 *  2. Pinned Reviews types are exported and usable
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommunicationsModule } from '../../src/modules/communications';
import type { BaseClient } from '../../src/client/base-client';
import type {
  // Verify these types exist by importing them
  PinnedReviewsListResponse,
  PinnedReviewsCreateRequest,
  PinnedReviewsCreateResponse,
  PinnedReviewsDeleteResponse,
  PinnedReviewsCountResponse,
  PinnedReviewsLimitsResponse,
  NewFeedbacksQuestionsResponse,
  FeedbackListResponse,
} from '../../src/types/communications.types';

describe('EPIC 36: Communications Type Expansion', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: CommunicationsModule;

  beforeEach(() => {
    mockClient = { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() };
    module = new CommunicationsModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: All swagger schemas have TypeScript types', () => {
    it('Pinned Reviews types are properly defined and imported', () => {
      // This test passes if the imports above compile successfully.
      // TypeScript compiler verifies the types exist.
      // At runtime we verify the module has the corresponding methods.
      expect(typeof module.getPinnedFeedbacks).toBe('function');
      expect(typeof module.pinFeedback).toBe('function');
      expect(typeof module.unpinFeedback).toBe('function');
      expect(typeof module.getPinnedFeedbacksCount).toBe('function');
      expect(typeof module.getPinnedFeedbacksLimits).toBe('function');
    });

    it('module methods return typed responses', async () => {
      // Verify that methods return data matching expected type structure
      const mockPinnedList: PinnedReviewsListResponse = {
        data: { pins: [] },
      };
      mockClient.get.mockResolvedValue(mockPinnedList);

      const result = await module.getPinnedFeedbacks();
      expect(result).toHaveProperty('data');
    });
  });

  describe('AC #2: Response types match API structure', () => {
    it('newFeedbacksQuestions returns correctly typed response', async () => {
      const mockResponse: NewFeedbacksQuestionsResponse = {
        data: { hasNewQuestions: false, hasNewFeedbacks: true },
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.newFeedbacksQuestions();

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });

    it('feedbacks returns correctly typed response', async () => {
      const mockResponse: FeedbackListResponse = {
        data: {
          countUnanswered: 5,
          countArchive: 10,
        },
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.feedbacks();

      expect(result).toBeDefined();
    });

    it('pinFeedback accepts typed request and returns typed response', async () => {
      const request: PinnedReviewsCreateRequest = [
        { feedbackId: 'test-id', nmId: 12345, pinOn: 'nm', pinMethod: 'tariff' },
      ];
      const mockResponse: PinnedReviewsCreateResponse = {
        data: { result: [] },
      };
      mockClient.post.mockResolvedValue(mockResponse);

      await module.pinFeedback(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining('pins'),
        request,
        expect.any(Object)
      );
    });
  });
});
