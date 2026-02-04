import { describe, it, expect } from 'vitest';
import { WBAPIError } from '../../../src/errors/base-error';

describe('WBAPIError', () => {
  describe('constructor', () => {
    it('should create error with message only', () => {
      const error = new WBAPIError('Test error');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(WBAPIError);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBeUndefined();
      expect(error.response).toBeUndefined();
      expect(error.requestId).toBeUndefined();
    });

    it('should create error with all parameters', () => {
      const response = { error: 'details' };
      const error = new WBAPIError('Test error', 400, response, 'req-123');

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.response).toEqual(response);
      expect(error.requestId).toBe('req-123');
    });

    it('should create error with statusCode only', () => {
      const error = new WBAPIError('Test error', 500);

      expect(error.statusCode).toBe(500);
      expect(error.response).toBeUndefined();
      expect(error.requestId).toBeUndefined();
    });

    it('should create error with statusCode and response', () => {
      const response = { message: 'Server error' };
      const error = new WBAPIError('Test error', 500, response);

      expect(error.statusCode).toBe(500);
      expect(error.response).toEqual(response);
      expect(error.requestId).toBeUndefined();
    });
  });

  describe('inheritance', () => {
    it('should extend Error', () => {
      const error = new WBAPIError('Test error');
      expect(error).toBeInstanceOf(Error);
    });

    it('should be instanceof WBAPIError', () => {
      const error = new WBAPIError('Test error');
      expect(error).toBeInstanceOf(WBAPIError);
    });

    it('should not be instanceof other error types', () => {
      const error = new WBAPIError('Test error');
      expect(error).not.toBeInstanceOf(TypeError);
      expect(error).not.toBeInstanceOf(ReferenceError);
    });
  });

  describe('name property', () => {
    it('should set name to WBAPIError', () => {
      const error = new WBAPIError('Test error');
      expect(error.name).toBe('WBAPIError');
    });

    it('should use constructor name for subclasses', () => {
      class CustomError extends WBAPIError {}
      const error = new CustomError('Test error');
      expect(error.name).toBe('CustomError');
    });
  });

  describe('stack trace', () => {
    it('should have a stack trace', () => {
      const error = new WBAPIError('Test error');
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
    });

    it('should contain error name in stack trace', () => {
      const error = new WBAPIError('Test error');
      expect(error.stack).toContain('WBAPIError');
    });

    it('should contain error message in stack trace', () => {
      const error = new WBAPIError('Test error message');
      expect(error.stack).toContain('Test error message');
    });

    it('should preserve stack trace for debugging', () => {
      const error = new WBAPIError('Test error');
      const stackLines = error.stack?.split('\n') ?? [];

      // Stack should have at least the error line and some trace
      expect(stackLines.length).toBeGreaterThan(1);
    });
  });

  describe('getUserMessage()', () => {
    it('should return message without statusCode when statusCode is undefined', () => {
      const error = new WBAPIError('Test error');
      const userMessage = error.getUserMessage();

      expect(userMessage).toBe('Test error');
    });

    it('should include statusCode in message when provided', () => {
      const error = new WBAPIError('Test error', 400);
      const userMessage = error.getUserMessage();

      expect(userMessage).toBe('Test error (Status: 400)');
    });

    it('should format different status codes correctly', () => {
      const error401 = new WBAPIError('Unauthorized', 401);
      const error500 = new WBAPIError('Server error', 500);
      const error429 = new WBAPIError('Rate limited', 429);

      expect(error401.getUserMessage()).toBe('Unauthorized (Status: 401)');
      expect(error500.getUserMessage()).toBe('Server error (Status: 500)');
      expect(error429.getUserMessage()).toBe('Rate limited (Status: 429)');
    });

    it('should handle zero status code', () => {
      const error = new WBAPIError('Network failure', 0);
      const userMessage = error.getUserMessage();

      expect(userMessage).toBe('Network failure (Status: 0)');
    });
  });

  describe('serialization', () => {
    it('should serialize to JSON preserving key properties', () => {
      const error = new WBAPIError('Test error', 400, { detail: 'info' }, 'req-123');
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as { message: string; name: string };

      expect(parsed.message).toBe('Test error');
      expect(parsed.name).toBe('WBAPIError');
    });

    it('should preserve statusCode in serialization', () => {
      const error = new WBAPIError('Test error', 404);
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as { statusCode: number };

      expect(parsed.statusCode).toBe(404);
    });

    it('should preserve response in serialization', () => {
      const response = { error: 'details', code: 'ERR001' };
      const error = new WBAPIError('Test error', 400, response);
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as { response: typeof response };

      expect(parsed.response).toEqual(response);
    });

    it('should preserve requestId in serialization', () => {
      const error = new WBAPIError('Test error', 400, undefined, 'req-xyz');
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as { requestId: string };

      expect(parsed.requestId).toBe('req-xyz');
    });
  });

  describe('readonly properties', () => {
    it('should have readonly statusCode', () => {
      const error = new WBAPIError('Test error', 400);

      // TypeScript enforces readonly at compile time
      // At runtime, we can verify the property exists
      expect(error.statusCode).toBe(400);
    });

    it('should have readonly response', () => {
      const response = { error: 'test' };
      const error = new WBAPIError('Test error', 400, response);

      expect(error.response).toEqual(response);
    });

    it('should have readonly requestId', () => {
      const error = new WBAPIError('Test error', 400, undefined, 'req-123');

      expect(error.requestId).toBe('req-123');
    });
  });

  describe('RFC 7807 fields (origin and timestamp)', () => {
    it('should create error with origin and timestamp', () => {
      const error = new WBAPIError(
        'unauthorized',
        401,
        { title: 'unauthorized' },
        'req-123',
        's2s-api-auth-catalog',
        '2024-09-30T06:52:38Z'
      );

      expect(error.origin).toBe('s2s-api-auth-catalog');
      expect(error.timestamp).toBe('2024-09-30T06:52:38Z');
    });

    it('should default origin and timestamp to undefined', () => {
      const error = new WBAPIError('Test error', 400, undefined, 'req-123');

      expect(error.origin).toBeUndefined();
      expect(error.timestamp).toBeUndefined();
    });

    it('should include origin in getUserMessage()', () => {
      const error = new WBAPIError('Test error', 401, undefined, undefined, 's2s-api-auth-catalog');

      expect(error.getUserMessage()).toContain('[Origin: s2s-api-auth-catalog]');
    });

    it('should not include origin bracket when origin is undefined', () => {
      const error = new WBAPIError('Test error', 401);

      expect(error.getUserMessage()).not.toContain('[Origin:');
    });

    it('should include origin and timestamp in toJSON()', () => {
      const error = new WBAPIError(
        'Test error',
        401,
        undefined,
        'req-123',
        's2s-api-auth-catalog',
        '2024-09-30T06:52:38Z'
      );
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as {
        origin: string;
        timestamp: string;
      };

      expect(parsed.origin).toBe('s2s-api-auth-catalog');
      expect(parsed.timestamp).toBe('2024-09-30T06:52:38Z');
    });

    it('should preserve backward compatibility with 4-arg constructor', () => {
      const error = new WBAPIError('Test error', 400, { data: true }, 'req-abc');

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.response).toEqual({ data: true });
      expect(error.requestId).toBe('req-abc');
      expect(error.origin).toBeUndefined();
      expect(error.timestamp).toBeUndefined();
    });
  });

  describe('error message handling', () => {
    it('should handle empty message', () => {
      const error = new WBAPIError('');
      expect(error.message).toBe('');
      expect(error.getUserMessage()).toBe('');
    });

    it('should handle long messages', () => {
      const longMessage = 'A'.repeat(1000);
      const error = new WBAPIError(longMessage);
      expect(error.message).toBe(longMessage);
      expect(error.getUserMessage()).toBe(longMessage);
    });

    it('should handle special characters in message', () => {
      const message = 'Error: "test" & <special> characters';
      const error = new WBAPIError(message, 400);
      expect(error.message).toBe(message);
      expect(error.getUserMessage()).toContain(message);
    });
  });
});
