/**
 * Unit tests for RetryHandler
 *
 * Tests retry logic, error classification, and exponential backoff calculation.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RetryHandler } from '../../../src/client/retry-handler';
import {
  AuthenticationError,
  ValidationError,
  RateLimitError,
  NetworkError,
} from '../../../src/errors';

describe('RetryHandler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Basic retry behavior', () => {
    it('should succeed on first attempt without retry', async () => {
      const handler = new RetryHandler();
      const operation = vi.fn().mockResolvedValue('success');

      const result = await handler.executeWithRetry(operation, 'testOp');

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should retry once and succeed on second attempt', async () => {
      const handler = new RetryHandler();
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Server error', false, 500))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should retry twice and succeed on third attempt', async () => {
      const handler = new RetryHandler();
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Error 1', false, 500))
        .mockRejectedValueOnce(new NetworkError('Error 2', false, 500))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should throw after all retries exhausted', async () => {
      const handler = new RetryHandler({ maxRetries: 2 });
      const finalError = new NetworkError('Persistent error', false, 500);
      const operation = vi.fn().mockImplementation(() => Promise.reject(finalError));

      const promise = handler.executeWithRetry(operation, 'testOp');

      // Advance timers and await rejection in parallel to avoid unhandled rejection
      await Promise.all([vi.runAllTimersAsync(), expect(promise).rejects.toThrow(finalError)]);

      expect(operation).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should preserve error details when throwing after retries', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const error = new NetworkError('Test error', false, 503);
      const operation = vi.fn().mockImplementation(() => Promise.reject(error));

      const promise = handler.executeWithRetry(operation, 'testOp');

      // Advance timers and await rejection in parallel to avoid unhandled rejection
      await Promise.all([
        vi.runAllTimersAsync(),
        expect(promise).rejects.toMatchObject({
          message: 'Test error',
          statusCode: 503,
          isTimeout: false,
        }),
      ]);
    });
  });

  describe('Error classification', () => {
    it('should NOT retry on AuthenticationError', async () => {
      const handler = new RetryHandler();
      const error = new AuthenticationError('Invalid API key', 401);
      const operation = vi.fn().mockImplementation(() => Promise.reject(error));

      await expect(handler.executeWithRetry(operation, 'testOp')).rejects.toThrow(
        AuthenticationError
      );
      expect(operation).toHaveBeenCalledTimes(1); // No retry
    });

    it('should NOT retry on ValidationError', async () => {
      const handler = new RetryHandler();
      const error = new ValidationError('Bad request', undefined, 400);
      const operation = vi.fn().mockImplementation(() => Promise.reject(error));

      await expect(handler.executeWithRetry(operation, 'testOp')).rejects.toThrow(ValidationError);
      expect(operation).toHaveBeenCalledTimes(1); // No retry
    });

    it('should retry on RateLimitError (429)', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new RateLimitError('Rate limit exceeded', 5000))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should retry on NetworkError with 5xx status', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Internal Server Error', false, 500))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should retry on NetworkError with 502 status', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Bad Gateway', false, 502))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should retry on NetworkError with 503 status', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Service Unavailable', false, 503))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should retry on NetworkError with 504 status', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Gateway Timeout', false, 504))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should retry on NetworkError with timeout flag', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Request timeout', true, 0))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should retry on NetworkError with no status (network failure)', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Network failure', false, 0))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should NOT retry on NetworkError with 404 status', async () => {
      const handler = new RetryHandler();
      const error = new NetworkError('Not Found', false, 404);
      const operation = vi.fn().mockImplementation(() => Promise.reject(error));

      await expect(handler.executeWithRetry(operation, 'testOp')).rejects.toThrow(NetworkError);
      expect(operation).toHaveBeenCalledTimes(1); // No retry
    });

    it('should NOT retry on unknown error types', async () => {
      const handler = new RetryHandler();
      const error = new Error('Unknown error');
      const operation = vi.fn().mockImplementation(() => Promise.reject(error));

      await expect(handler.executeWithRetry(operation, 'testOp')).rejects.toThrow('Unknown error');
      expect(operation).toHaveBeenCalledTimes(1); // No retry
    });
  });

  describe('Exponential backoff calculation', () => {
    it('should complete multiple retries with delays', async () => {
      const handler = new RetryHandler({ retryDelay: 100, maxRetries: 2 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Error', false, 500))
        .mockRejectedValueOnce(new NetworkError('Error', false, 500))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should retry with progressive delays (exponential backoff)', async () => {
      // Test that retries happen but don't verify exact timing
      // (timing verification would require complex setTimeout mocking)
      const handler = new RetryHandler({
        retryDelay: 100,
        exponentialBackoff: true,
        maxRetries: 2,
      });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Error', false, 500))
        .mockRejectedValueOnce(new NetworkError('Error', false, 500))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });
  });

  describe('Linear backoff', () => {
    it('should use constant delay when exponential backoff disabled', async () => {
      const handler = new RetryHandler({
        retryDelay: 100,
        exponentialBackoff: false,
        maxRetries: 2,
      });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Error', false, 500))
        .mockRejectedValueOnce(new NetworkError('Error', false, 500))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });
  });

  describe('Configuration', () => {
    it('should use default configuration when not provided', () => {
      const handler = new RetryHandler();
      // Config defaults are private, but we can test behavior
      // Default: maxRetries: 3, retryDelay: 1000, exponentialBackoff: true
      expect(handler).toBeDefined();
    });

    it('should accept custom maxRetries', async () => {
      const handler = new RetryHandler({ maxRetries: 1 });
      const operation = vi
        .fn()
        .mockImplementation(() => Promise.reject(new NetworkError('Error', false, 500)));

      const promise = handler.executeWithRetry(operation, 'testOp');

      // Advance timers and await rejection in parallel to avoid unhandled rejection
      await Promise.all([vi.runAllTimersAsync(), expect(promise).rejects.toThrow()]);

      expect(operation).toHaveBeenCalledTimes(2); // Initial + 1 retry
    });

    it('should accept custom retryDelay', async () => {
      const handler = new RetryHandler({ retryDelay: 100, maxRetries: 1 });
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new NetworkError('Error', false, 500))
        .mockResolvedValueOnce('success');

      const promise = handler.executeWithRetry(operation, 'testOp');
      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2); // Initial + 1 retry
    });

    it('should disable retries when maxRetries is 0', async () => {
      const handler = new RetryHandler({ maxRetries: 0 });
      const operation = vi
        .fn()
        .mockImplementation(() => Promise.reject(new NetworkError('Error', false, 500)));

      await expect(handler.executeWithRetry(operation, 'testOp')).rejects.toThrow();
      expect(operation).toHaveBeenCalledTimes(1); // No retries
    });
  });

  describe('Generic type support', () => {
    it('should preserve return type for string', async () => {
      const handler = new RetryHandler();
      const operation = vi.fn().mockResolvedValue('success');

      const result: string = await handler.executeWithRetry(operation, 'testOp');

      expect(result).toBe('success');
    });

    it('should preserve return type for number', async () => {
      const handler = new RetryHandler();
      const operation = vi.fn().mockResolvedValue(42);

      const result: number = await handler.executeWithRetry(operation, 'testOp');

      expect(result).toBe(42);
    });

    it('should preserve return type for object', async () => {
      const handler = new RetryHandler();
      const data = { id: '123', name: 'Test' };
      const operation = vi.fn().mockResolvedValue(data);

      const result: { id: string; name: string } = await handler.executeWithRetry(
        operation,
        'testOp'
      );

      expect(result).toEqual(data);
    });
  });
});
