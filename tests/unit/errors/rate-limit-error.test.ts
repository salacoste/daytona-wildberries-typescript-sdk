import { describe, it, expect } from 'vitest';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { WBAPIError } from '../../../src/errors/base-error';

describe('RateLimitError', () => {
  describe('constructor', () => {
    it('should create error with default message and retryAfter', () => {
      const error = new RateLimitError(undefined, 5000);

      expect(error.message).toBe('Rate limit exceeded. The SDK will automatically retry this request.');
      expect(error.statusCode).toBe(429);
      expect(error.retryAfter).toBe(5000);
      expect(error.response).toBeUndefined();
      expect(error.requestId).toBeUndefined();
    });

    it('should create error with custom message', () => {
      const error = new RateLimitError('Custom rate limit message', 3000);

      expect(error.message).toBe('Custom rate limit message');
      expect(error.retryAfter).toBe(3000);
    });

    it('should create error with all parameters', () => {
      const response = { limit: 60, remaining: 0 };
      const error = new RateLimitError('Rate limit exceeded', 10000, response, 'req-xyz');

      expect(error.message).toBe('Rate limit exceeded');
      expect(error.statusCode).toBe(429);
      expect(error.retryAfter).toBe(10000);
      expect(error.response).toEqual(response);
      expect(error.requestId).toBe('req-xyz');
    });

    it('should always set statusCode to 429', () => {
      const error = new RateLimitError(undefined, 1000);
      expect(error.statusCode).toBe(429);
    });
  });

  describe('inheritance', () => {
    it('should extend WBAPIError', () => {
      const error = new RateLimitError(undefined, 1000);
      expect(error).toBeInstanceOf(WBAPIError);
    });

    it('should extend Error', () => {
      const error = new RateLimitError(undefined, 1000);
      expect(error).toBeInstanceOf(Error);
    });

    it('should be instanceof RateLimitError', () => {
      const error = new RateLimitError(undefined, 1000);
      expect(error).toBeInstanceOf(RateLimitError);
    });
  });

  describe('name property', () => {
    it('should set name to RateLimitError', () => {
      const error = new RateLimitError(undefined, 1000);
      expect(error.name).toBe('RateLimitError');
    });
  });

  describe('retryAfter property', () => {
    it('should be a readonly number in milliseconds', () => {
      const error = new RateLimitError(undefined, 5000);
      expect(typeof error.retryAfter).toBe('number');
      expect(error.retryAfter).toBe(5000);
    });

    it('should handle different retry durations', () => {
      const error1 = new RateLimitError(undefined, 1000);
      const error2 = new RateLimitError(undefined, 60000);
      const error3 = new RateLimitError(undefined, 120000);

      expect(error1.retryAfter).toBe(1000);  // 1 second
      expect(error2.retryAfter).toBe(60000); // 1 minute
      expect(error3.retryAfter).toBe(120000); // 2 minutes
    });

    it('should handle zero retryAfter', () => {
      const error = new RateLimitError(undefined, 0);
      expect(error.retryAfter).toBe(0);
    });
  });

  describe('getUserMessage()', () => {
    it('should include retry timing in seconds', () => {
      const error = new RateLimitError('Rate limited', 5000);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Rate limited (Status: 429)');
      expect(userMessage).toContain('Retry after: 5.0 seconds');
    });

    it('should format different retry durations correctly', () => {
      const error1 = new RateLimitError(undefined, 1000);
      const error2 = new RateLimitError(undefined, 30000);
      const error3 = new RateLimitError(undefined, 90000);

      expect(error1.getUserMessage()).toContain('Retry after: 1.0 seconds');
      expect(error2.getUserMessage()).toContain('Retry after: 30.0 seconds');
      expect(error3.getUserMessage()).toContain('Retry after: 90.0 seconds');
    });

    it('should include automatic retry notice', () => {
      const error = new RateLimitError(undefined, 5000);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('The SDK will automatically retry this request.');
    });

    it('should include recovery guidance', () => {
      const error = new RateLimitError(undefined, 5000);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('If rate limiting occurs frequently, consider:');
      expect(userMessage).toContain('1. Implementing request batching');
      expect(userMessage).toContain('2. Caching responses');
      expect(userMessage).toContain('3. Reviewing your application');
    });

    it('should format fractional seconds correctly', () => {
      const error = new RateLimitError(undefined, 2500);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Retry after: 2.5 seconds');
    });

    it('should handle zero retry time', () => {
      const error = new RateLimitError(undefined, 0);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Retry after: 0.0 seconds');
    });
  });

  describe('serialization', () => {
    it('should serialize to JSON preserving properties', () => {
      const error = new RateLimitError('Rate limited', 5000, { limit: 60 }, 'req-123');
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as {
        message: string;
        name: string;
        statusCode: number;
        retryAfter: number;
        response: { limit: number };
        requestId: string;
      };

      expect(parsed.message).toBe('Rate limited');
      expect(parsed.name).toBe('RateLimitError');
      expect(parsed.statusCode).toBe(429);
      expect(parsed.retryAfter).toBe(5000);
      expect(parsed.response).toEqual({ limit: 60 });
      expect(parsed.requestId).toBe('req-123');
    });
  });

  describe('error scenarios', () => {
    it('should represent short-term rate limit', () => {
      const error = new RateLimitError('Too many requests', 1000);

      expect(error.retryAfter).toBe(1000);
      expect(error.getUserMessage()).toContain('1.0 seconds');
    });

    it('should represent long-term rate limit', () => {
      const error = new RateLimitError('Daily limit exceeded', 86400000);

      expect(error.retryAfter).toBe(86400000); // 24 hours
      expect(error.getUserMessage()).toContain('86400.0 seconds');
    });

    it('should include rate limit metadata in response', () => {
      const response = {
        limit: 100,
        remaining: 0,
        reset: 1234567890,
      };
      const error = new RateLimitError('Rate limit exceeded', 60000, response);

      expect(error.response).toEqual(response);
    });
  });

  describe('retry guidance', () => {
    it('should suggest request batching', () => {
      const error = new RateLimitError(undefined, 5000);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Implementing request batching');
    });

    it('should suggest caching', () => {
      const error = new RateLimitError(undefined, 5000);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Caching responses');
    });

    it('should suggest reviewing usage patterns', () => {
      const error = new RateLimitError(undefined, 5000);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Reviewing your application');
    });
  });
});
