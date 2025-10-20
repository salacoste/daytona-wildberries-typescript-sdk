import { describe, it, expect } from 'vitest';
import { NetworkError } from '../../../src/errors/network-error';
import { WBAPIError } from '../../../src/errors/base-error';

describe('NetworkError', () => {
  describe('constructor', () => {
    it('should create error with required parameters', () => {
      const error = new NetworkError('Connection failed');

      expect(error.message).toBe('Connection failed');
      expect(error.isTimeout).toBe(false);
      expect(error.statusCode).toBeUndefined();
      expect(error.cause).toBeUndefined();
      expect(error.response).toBeUndefined();
      expect(error.requestId).toBeUndefined();
    });

    it('should create timeout error', () => {
      const error = new NetworkError('Request timed out', true);

      expect(error.message).toBe('Request timed out');
      expect(error.isTimeout).toBe(true);
    });

    it('should create error with statusCode for server errors', () => {
      const error = new NetworkError('Server error', false, 500);

      expect(error.message).toBe('Server error');
      expect(error.isTimeout).toBe(false);
      expect(error.statusCode).toBe(500);
    });

    it('should create error with cause', () => {
      const cause = new Error('ECONNREFUSED');
      const error = new NetworkError('Connection refused', false, undefined, cause);

      expect(error.cause).toBe(cause);
      expect(error.cause?.message).toBe('ECONNREFUSED');
    });

    it('should create error with all parameters', () => {
      const cause = new Error('ETIMEDOUT');
      const response = { error: 'timeout' };
      const error = new NetworkError('Timeout', true, 0, cause, response, 'req-123');

      expect(error.message).toBe('Timeout');
      expect(error.isTimeout).toBe(true);
      expect(error.statusCode).toBe(0);
      expect(error.cause).toBe(cause);
      expect(error.response).toEqual(response);
      expect(error.requestId).toBe('req-123');
    });
  });

  describe('inheritance', () => {
    it('should extend WBAPIError', () => {
      const error = new NetworkError('Network error');
      expect(error).toBeInstanceOf(WBAPIError);
    });

    it('should extend Error', () => {
      const error = new NetworkError('Network error');
      expect(error).toBeInstanceOf(Error);
    });

    it('should be instanceof NetworkError', () => {
      const error = new NetworkError('Network error');
      expect(error).toBeInstanceOf(NetworkError);
    });
  });

  describe('name property', () => {
    it('should set name to NetworkError', () => {
      const error = new NetworkError('Network error');
      expect(error.name).toBe('NetworkError');
    });
  });

  describe('isTimeout property', () => {
    it('should default to false when not specified', () => {
      const error = new NetworkError('Network error');
      expect(error.isTimeout).toBe(false);
    });

    it('should be true for timeout errors', () => {
      const error = new NetworkError('Timeout', true);
      expect(error.isTimeout).toBe(true);
    });

    it('should be false for non-timeout errors', () => {
      const error = new NetworkError('Connection failed', false);
      expect(error.isTimeout).toBe(false);
    });

    it('should be readonly', () => {
      const error = new NetworkError('Timeout', true);
      // TypeScript enforces readonly at compile time
      expect(error.isTimeout).toBe(true);
    });
  });

  describe('cause property', () => {
    it('should be undefined when not provided', () => {
      const error = new NetworkError('Network error');
      expect(error.cause).toBeUndefined();
    });

    it('should store original error', () => {
      const originalError = new Error('Original error');
      const error = new NetworkError('Wrapped error', false, undefined, originalError);

      expect(error.cause).toBe(originalError);
      expect(error.cause?.message).toBe('Original error');
    });

    it('should store different error types', () => {
      const typeError = new TypeError('Type error');
      const error = new NetworkError('Network error', false, undefined, typeError);

      expect(error.cause).toBeInstanceOf(TypeError);
      expect(error.cause?.message).toBe('Type error');
    });

    it('should be readonly', () => {
      const cause = new Error('Cause');
      const error = new NetworkError('Error', false, undefined, cause);
      // TypeScript enforces readonly at compile time
      expect(error.cause).toBe(cause);
    });
  });

  describe('getUserMessage()', () => {
    it('should provide timeout-specific guidance', () => {
      const error = new NetworkError('Request timed out', true, 0);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Request timed out');
      expect(userMessage).toContain('This request timed out after 30 seconds');
      expect(userMessage).toContain('The SDK automatically retried this request 3 times');
      expect(userMessage).toContain('To resolve timeout issues:');
      expect(userMessage).toContain('Check if the Wildberries API is experiencing high latency');
      expect(userMessage).toContain('Consider increasing the timeout configuration');
      expect(userMessage).toContain('Verify your network connection is stable');
      expect(userMessage).toContain('Try again later if the API is overloaded');
    });

    it('should provide server error guidance', () => {
      const error = new NetworkError('Internal server error', false, 500);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Internal server error (Status: 500)');
      expect(userMessage).toContain('The Wildberries API server encountered an error');
      expect(userMessage).toContain('The SDK automatically retried this request 3 times');
      expect(userMessage).toContain('To resolve server errors:');
      expect(userMessage).toContain('Wait a few moments and try again');
      expect(userMessage).toContain('Check the Wildberries API status page');
      expect(userMessage).toContain('If the problem persists, contact Wildberries API support');
    });

    it('should provide connection failure guidance', () => {
      const error = new NetworkError('Connection refused', false);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Connection refused');
      expect(userMessage).toContain('Network connection failed');
      expect(userMessage).toContain('The SDK automatically retried this request 3 times');
      expect(userMessage).toContain('To resolve connection issues:');
      expect(userMessage).toContain('Check your internet connection');
      expect(userMessage).toContain('Verify network firewalls allow HTTPS connections');
      expect(userMessage).toContain('Ensure DNS resolution is working properly');
      expect(userMessage).toContain('Try again when network connectivity is restored');
    });

    it('should handle different 5xx status codes', () => {
      const error502 = new NetworkError('Bad gateway', false, 502);
      const error503 = new NetworkError('Service unavailable', false, 503);
      const error504 = new NetworkError('Gateway timeout', false, 504);

      expect(error502.getUserMessage()).toContain('(Status: 502)');
      expect(error503.getUserMessage()).toContain('(Status: 503)');
      expect(error504.getUserMessage()).toContain('(Status: 504)');

      expect(error502.getUserMessage()).toContain('The Wildberries API server encountered an error');
      expect(error503.getUserMessage()).toContain('The Wildberries API server encountered an error');
      expect(error504.getUserMessage()).toContain('The Wildberries API server encountered an error');
    });
  });

  describe('serialization', () => {
    it('should serialize to JSON preserving properties', () => {
      const cause = new Error('Original error');
      const error = new NetworkError('Network error', true, 0, cause, { detail: 'timeout' }, 'req-123');
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as {
        message: string;
        name: string;
        isTimeout: boolean;
        statusCode: number;
        response: { detail: string };
        requestId: string;
      };

      expect(parsed.message).toBe('Network error');
      expect(parsed.name).toBe('NetworkError');
      expect(parsed.isTimeout).toBe(true);
      expect(parsed.statusCode).toBe(0);
      expect(parsed.response).toEqual({ detail: 'timeout' });
      expect(parsed.requestId).toBe('req-123');
    });
  });

  describe('error scenarios', () => {
    it('should represent connection timeout', () => {
      const error = new NetworkError('Connection timeout after 30s', true, 0);

      expect(error.isTimeout).toBe(true);
      expect(error.statusCode).toBe(0);
      expect(error.getUserMessage()).toContain('timed out after 30 seconds');
    });

    it('should represent connection refused', () => {
      const cause = new Error('ECONNREFUSED');
      const error = new NetworkError('Connection refused', false, undefined, cause);

      expect(error.isTimeout).toBe(false);
      expect(error.cause?.message).toBe('ECONNREFUSED');
      expect(error.getUserMessage()).toContain('Network connection failed');
    });

    it('should represent DNS failure', () => {
      const cause = new Error('ENOTFOUND');
      const error = new NetworkError('DNS lookup failed', false, undefined, cause);

      expect(error.cause?.message).toBe('ENOTFOUND');
      expect(error.getUserMessage()).toContain('DNS resolution is working properly');
    });

    it('should represent 500 internal server error', () => {
      const error = new NetworkError('Internal server error', false, 500);

      expect(error.statusCode).toBe(500);
      expect(error.isTimeout).toBe(false);
      expect(error.getUserMessage()).toContain('server encountered an error');
    });

    it('should represent 502 bad gateway', () => {
      const error = new NetworkError('Bad gateway', false, 502);

      expect(error.statusCode).toBe(502);
      expect(error.getUserMessage()).toContain('server encountered an error');
    });

    it('should represent 503 service unavailable', () => {
      const error = new NetworkError('Service temporarily unavailable', false, 503);

      expect(error.statusCode).toBe(503);
      expect(error.getUserMessage()).toContain('server encountered an error');
    });

    it('should represent 504 gateway timeout', () => {
      const error = new NetworkError('Gateway timeout', false, 504);

      expect(error.statusCode).toBe(504);
      expect(error.getUserMessage()).toContain('server encountered an error');
    });

    it('should represent network interruption', () => {
      const cause = new Error('ECONNRESET');
      const error = new NetworkError('Connection reset by peer', false, undefined, cause);

      expect(error.cause?.message).toBe('ECONNRESET');
      expect(error.getUserMessage()).toContain('Network connection failed');
    });
  });

  describe('retry information', () => {
    it('should mention automatic retries in timeout errors', () => {
      const error = new NetworkError('Timeout', true);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('automatically retried this request 3 times');
    });

    it('should mention automatic retries in server errors', () => {
      const error = new NetworkError('Server error', false, 500);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('automatically retried this request 3 times');
    });

    it('should mention automatic retries in connection errors', () => {
      const error = new NetworkError('Connection failed', false);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('automatically retried this request 3 times');
    });
  });

  describe('recovery guidance', () => {
    it('should provide specific timeout troubleshooting steps', () => {
      const error = new NetworkError('Timeout', true);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Check if the Wildberries API is experiencing high latency');
      expect(userMessage).toContain('Consider increasing the timeout configuration');
      expect(userMessage).toContain('Verify your network connection is stable');
      expect(userMessage).toContain('Try again later if the API is overloaded');
    });

    it('should provide specific server error troubleshooting steps', () => {
      const error = new NetworkError('Server error', false, 500);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Wait a few moments and try again');
      expect(userMessage).toContain('Check the Wildberries API status page');
      expect(userMessage).toContain('contact Wildberries API support');
    });

    it('should provide specific connection troubleshooting steps', () => {
      const error = new NetworkError('Connection failed', false);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Check your internet connection');
      expect(userMessage).toContain('Verify network firewalls allow HTTPS connections');
      expect(userMessage).toContain('Ensure DNS resolution is working properly');
      expect(userMessage).toContain('Try again when network connectivity is restored');
    });
  });
});
