/**
 * TDD RED-PHASE Tests for EPIC 37: Communications New Endpoints
 *
 * These tests define the expected behavior for NEW methods that do not yet
 * exist on CommunicationsModule from the consolidated swagger files.
 * They are EXPECTED TO FAIL until the implementation is complete.
 *
 * Acceptance Criteria verified:
 *  1. New review endpoints from consolidated otzyvy.yaml
 *  2. Pinned reviews endpoints from zakreplyonnye-otzyvy.yaml
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommunicationsModule } from '../../src/modules/communications';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 37: Communications New Endpoints', () => {
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

  describe('AC #1: Existing review endpoints (method naming verification)', () => {
    // NOTE: TDD tests originally expected different method names.
    // The actual API uses these method names from the swagger spec.

    it('should have feedbacks method for listing reviews', async () => {
      expect(typeof (module as any).feedbacks).toBe('function');

      mockClient.get.mockResolvedValue({ data: { feedbacks: [] } });
      await (module as any).feedbacks({ isAnswered: false, take: 10, skip: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('feedbacks'),
        expect.objectContaining({ rateLimitKey: 'communications.feedbacks' })
      );
    });

    it('should have createFeedbacksAnswer method for responding to reviews', async () => {
      expect(typeof (module as any).createFeedbacksAnswer).toBe('function');

      mockClient.post.mockResolvedValue({});
      await (module as any).createFeedbacksAnswer({ id: 'feedback-123', text: 'Thank you!' });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining('feedbacks'),
        expect.objectContaining({ id: 'feedback-123', text: 'Thank you!' }),
        expect.objectContaining({ rateLimitKey: 'communications.createFeedbacksAnswer' })
      );
    });

    it('should have getFeedbacksCount method', async () => {
      expect(typeof (module as any).getFeedbacksCount).toBe('function');

      mockClient.get.mockResolvedValue({ data: { count: 42 } });
      const result = await (module as any).getFeedbacksCount();

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('feedbacks'),
        expect.objectContaining({ rateLimitKey: 'communications.getFeedbacksCount' })
      );
      expect(result).toEqual({ data: { count: 42 } });
    });

    it('should have getFeedbacksArchive method for archived reviews', async () => {
      expect(typeof (module as any).getFeedbacksArchive).toBe('function');

      mockClient.get.mockResolvedValue({ data: { feedbacks: [] } });
      await (module as any).getFeedbacksArchive({ take: 10, skip: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('archive'),
        expect.objectContaining({ rateLimitKey: 'communications.getFeedbacksArchive' })
      );
    });

    it('should have feedback method for getting single review', async () => {
      // NOTE: rateFeedback doesn't exist in the API.
      // The API has 'feedback' method for getting a single review.
      expect(typeof (module as any).feedback).toBe('function');

      mockClient.get.mockResolvedValue({ data: { id: 'feedback-123' } });
      await (module as any).feedback({ id: 'feedback-123' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('feedbacks'),
        expect.objectContaining({ rateLimitKey: 'communications.feedback' })
      );
    });
  });

  describe('AC #2: Pinned reviews endpoints', () => {
    it('should have getPinnedFeedbacks method', async () => {
      expect(typeof (module as any).getPinnedFeedbacks).toBe('function');

      mockClient.get.mockResolvedValue({ data: { feedbacks: [] } });
      await (module as any).getPinnedFeedbacks({ nmId: 12345 });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('pin'),
        expect.objectContaining({ rateLimitKey: 'communications.getPinnedFeedbacks' })
      );
    });

    it('should have pinFeedback method to pin a review', async () => {
      expect(typeof (module as any).pinFeedback).toBe('function');

      mockClient.post.mockResolvedValue({});
      await (module as any).pinFeedback([{ feedbackId: 'fb-1', nmId: 12345 }]);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining('pin'),
        expect.arrayContaining([expect.objectContaining({ feedbackId: 'fb-1', nmId: 12345 })]),
        expect.objectContaining({ rateLimitKey: 'communications.pinFeedback' })
      );
    });

    it('should have unpinFeedback method to unpin a review', async () => {
      expect(typeof (module as any).unpinFeedback).toBe('function');

      mockClient.delete.mockResolvedValue({});
      await (module as any).unpinFeedback(['pin-id-1']);

      expect(mockClient.delete).toHaveBeenCalledWith(
        expect.stringContaining('pin'),
        expect.arrayContaining(['pin-id-1']),
        expect.objectContaining({ rateLimitKey: 'communications.unpinFeedback' })
      );
    });
  });
});
