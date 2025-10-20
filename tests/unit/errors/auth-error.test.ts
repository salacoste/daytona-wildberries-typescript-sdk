import { describe, it, expect } from 'vitest';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { WBAPIError } from '../../../src/errors/base-error';

describe('AuthenticationError', () => {
  describe('constructor', () => {
    it('should create error with default message and statusCode 401', () => {
      const error = new AuthenticationError();

      expect(error.message).toBe('Authentication failed. Please verify your API key is valid and has the required permissions.');
      expect(error.statusCode).toBe(401);
      expect(error.response).toBeUndefined();
      expect(error.requestId).toBeUndefined();
    });

    it('should create error with custom message', () => {
      const error = new AuthenticationError('Custom auth error');

      expect(error.message).toBe('Custom auth error');
      expect(error.statusCode).toBe(401);
    });

    it('should create error with statusCode 401', () => {
      const error = new AuthenticationError('Test', 401);

      expect(error.statusCode).toBe(401);
    });

    it('should create error with statusCode 403', () => {
      const error = new AuthenticationError('Forbidden', 403);

      expect(error.statusCode).toBe(403);
    });

    it('should create error with all parameters', () => {
      const response = { error: 'invalid_token' };
      const error = new AuthenticationError('Invalid token', 401, response, 'req-abc');

      expect(error.message).toBe('Invalid token');
      expect(error.statusCode).toBe(401);
      expect(error.response).toEqual(response);
      expect(error.requestId).toBe('req-abc');
    });
  });

  describe('inheritance', () => {
    it('should extend WBAPIError', () => {
      const error = new AuthenticationError();
      expect(error).toBeInstanceOf(WBAPIError);
    });

    it('should extend Error', () => {
      const error = new AuthenticationError();
      expect(error).toBeInstanceOf(Error);
    });

    it('should be instanceof AuthenticationError', () => {
      const error = new AuthenticationError();
      expect(error).toBeInstanceOf(AuthenticationError);
    });
  });

  describe('name property', () => {
    it('should set name to AuthenticationError', () => {
      const error = new AuthenticationError();
      expect(error.name).toBe('AuthenticationError');
    });
  });

  describe('getUserMessage()', () => {
    it('should include base message with recovery guidance', () => {
      const error = new AuthenticationError('Auth failed', 401);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Auth failed (Status: 401)');
      expect(userMessage).toContain('To resolve this issue:');
      expect(userMessage).toContain('Verify your API key is valid and correctly formatted');
      expect(userMessage).toContain('Check that your API key has the required permissions');
      expect(userMessage).toContain('Ensure the Authorization header is properly set');
      expect(userMessage).toContain('Confirm your API key has not been revoked or expired');
    });

    it('should provide guidance for 401 errors', () => {
      const error = new AuthenticationError('Unauthorized', 401);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('(Status: 401)');
      expect(userMessage).toContain('To resolve this issue:');
    });

    it('should provide guidance for 403 errors', () => {
      const error = new AuthenticationError('Forbidden', 403);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('(Status: 403)');
      expect(userMessage).toContain('To resolve this issue:');
    });

    it('should include all four recovery steps', () => {
      const error = new AuthenticationError();
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('1. Verify your API key');
      expect(userMessage).toContain('2. Check that your API key has the required permissions');
      expect(userMessage).toContain('3. Ensure the Authorization header');
      expect(userMessage).toContain('4. Confirm your API key has not been revoked');
    });
  });

  describe('serialization', () => {
    it('should serialize to JSON preserving properties', () => {
      const error = new AuthenticationError('Invalid API key', 401, { detail: 'expired' }, 'req-123');
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as {
        message: string;
        name: string;
        statusCode: number;
        response: { detail: string };
        requestId: string;
      };

      expect(parsed.message).toBe('Invalid API key');
      expect(parsed.name).toBe('AuthenticationError');
      expect(parsed.statusCode).toBe(401);
      expect(parsed.response).toEqual({ detail: 'expired' });
      expect(parsed.requestId).toBe('req-123');
    });
  });

  describe('error scenarios', () => {
    it('should represent invalid API key scenario', () => {
      const error = new AuthenticationError('Invalid API key', 401);

      expect(error.message).toContain('Invalid API key');
      expect(error.statusCode).toBe(401);
      expect(error.getUserMessage()).toContain('Verify your API key');
    });

    it('should represent insufficient permissions scenario', () => {
      const error = new AuthenticationError('Insufficient permissions', 403);

      expect(error.message).toContain('Insufficient permissions');
      expect(error.statusCode).toBe(403);
      expect(error.getUserMessage()).toContain('required permissions');
    });

    it('should represent expired token scenario', () => {
      const error = new AuthenticationError('Token expired', 401, { error: 'token_expired' });

      expect(error.message).toContain('Token expired');
      expect(error.response).toEqual({ error: 'token_expired' });
      expect(error.getUserMessage()).toContain('revoked or expired');
    });
  });
});
