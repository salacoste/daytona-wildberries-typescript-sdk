/**
 * Auto-generated rate limit configuration for communications module
 * Generated from: wildberries_api_doc/09-communications.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/communications-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const communicationsRateLimits: Record<string, RateLimitConfig> = {
  'communications.newFeedbacksQuestions': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.questionsCountUnanswered': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.questionsCount': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.questions': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.patchQuestions': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.question': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.feedbacksCountUnanswered': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.feedbacksCount': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.feedbacks': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.supplierValuations': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.postFeedbacksActions': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.postFeedbacksAnswer': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.patchFeedbacksAnswer': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.postFeedbacksOrderReturn': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.feedback': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.feedbacksArchive': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.templates': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.postTemplates': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.patchTemplates': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.deleteTemplates': {
    requestsPerMinute: 180,
    intervalSeconds: 0.333,
    burstLimit: 6
  },
  'communications.sellerChats': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10
  },
  'communications.sellerEvents': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10
  },
  'communications.postSellerMessage': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10
  },
  'communications.sellerDownload': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 10
  },
  'communications.claims': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 10
  },
  'communications.patchClaim': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 10
  }
};
