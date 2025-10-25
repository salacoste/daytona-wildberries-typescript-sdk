/**
 * Unit tests for WildberriesSDK main class
 *
 * Tests SDK initialization, configuration validation, and module wiring
 * using mocked dependencies for fast, isolated testing.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WildberriesSDK, AuthenticationError, GeneralModule } from '../../src';
import { BaseClient } from '../../src/client/base-client';

// Mock BaseClient
vi.mock('../../src/client/base-client');

// Mock GeneralModule
vi.mock('../../src/modules/general');

describe('WildberriesSDK', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Constructor - Configuration Validation', () => {
    it('should create SDK instance with minimal valid configuration', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-api-key-12345',
      });

      expect(sdk).toBeInstanceOf(WildberriesSDK);
      expect(BaseClient).toHaveBeenCalledWith({
        apiKey: 'test-api-key-12345',
      });
    });

    it('should throw AuthenticationError when API key is missing', () => {
      expect(() => {
        // @ts-expect-error - Testing runtime validation
        new WildberriesSDK({});
      }).toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError when API key is empty string', () => {
      expect(() => {
        new WildberriesSDK({ apiKey: '' });
      }).toThrow(AuthenticationError);
    });

    it('should throw AuthenticationError when API key is whitespace only', () => {
      expect(() => {
        new WildberriesSDK({ apiKey: '   ' });
      }).toThrow(AuthenticationError);

      expect(() => {
        new WildberriesSDK({ apiKey: '\t\n' });
      }).toThrow(AuthenticationError);
    });

    it('should include helpful error message for missing API key', () => {
      try {
        new WildberriesSDK({ apiKey: '' });
        expect.fail('Should have thrown AuthenticationError');
      } catch (error) {
        expect(error).toBeInstanceOf(AuthenticationError);
        const authError = error as AuthenticationError;
        expect(authError.message).toContain('API key is required');
        expect(authError.message).toContain('Wildberries API key');
        expect(authError.statusCode).toBe(401);
      }
    });

    it('should accept API key with leading/trailing spaces after trim', () => {
      const sdk = new WildberriesSDK({ apiKey: '  valid-key  ' });

      expect(sdk).toBeInstanceOf(WildberriesSDK);
      // BaseClient receives original config (trimming is validation-only)
      expect(BaseClient).toHaveBeenCalled();
    });
  });

  describe('Constructor - Custom Configuration', () => {
    it('should pass custom timeout to BaseClient', () => {
      const config = {
        apiKey: 'test-key',
        timeout: 60000,
      };

      new WildberriesSDK(config);

      expect(BaseClient).toHaveBeenCalledWith(config);
    });

    it('should pass custom baseUrls to BaseClient', () => {
      const config = {
        apiKey: 'test-key',
        baseUrls: {
          products: 'https://test-content-api.wildberries.ru',
        },
      };

      new WildberriesSDK(config);

      expect(BaseClient).toHaveBeenCalledWith(config);
    });

    it('should pass custom retry configuration to BaseClient', () => {
      const config = {
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 5,
          retryDelay: 2000,
          exponentialBackoff: true,
        },
      };

      new WildberriesSDK(config);

      expect(BaseClient).toHaveBeenCalledWith(config);
    });

    it('should pass custom rate limit configuration to BaseClient', () => {
      const config = {
        apiKey: 'test-key',
        rateLimitConfig: {
          requestsPerSecond: 10,
          requestsPerMinute: 100,
        },
      };

      new WildberriesSDK(config);

      expect(BaseClient).toHaveBeenCalledWith(config);
    });

    it('should pass custom log level to BaseClient', () => {
      const config = {
        apiKey: 'test-key',
        logLevel: 'debug' as const,
      };

      new WildberriesSDK(config);

      expect(BaseClient).toHaveBeenCalledWith(config);
    });

    it('should pass all custom options together', () => {
      const config = {
        apiKey: 'test-key',
        timeout: 60000,
        baseUrls: { products: 'https://test.example.com' },
        retryConfig: { maxRetries: 5 },
        rateLimitConfig: { requestsPerSecond: 10 },
        logLevel: 'info' as const,
      };

      new WildberriesSDK(config);

      expect(BaseClient).toHaveBeenCalledWith(config);
    });
  });

  describe('Module Initialization', () => {
    it('should initialize GeneralModule with BaseClient instance', () => {
      new WildberriesSDK({ apiKey: 'test-key' });

      expect(GeneralModule).toHaveBeenCalledTimes(1);
      expect(GeneralModule).toHaveBeenCalledWith(expect.any(BaseClient));
    });

    it('should expose general module as public readonly property', () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-key' });

      expect(sdk.general).toBeDefined();
      expect(sdk.general).toBeInstanceOf(GeneralModule);
    });

    it('should share same BaseClient instance across all modules', () => {
      new WildberriesSDK({ apiKey: 'test-key' });

      // BaseClient should be created once
      expect(BaseClient).toHaveBeenCalledTimes(1);

      // GeneralModule should receive that same instance
      expect(GeneralModule).toHaveBeenCalledTimes(1);
      expect(GeneralModule).toHaveBeenCalledWith(expect.any(BaseClient));
    });
  });

  describe('Module Properties', () => {
    it('should have general module property', () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-key' });

      expect(sdk).toHaveProperty('general');
      expect(sdk.general).toBeInstanceOf(GeneralModule);
    });

    it('should maintain stable module references', () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-key' });

      const general1 = sdk.general;
      const general2 = sdk.general;

      expect(general1).toBe(general2);
    });
  });

  describe('Multiple SDK Instances', () => {
    it('should create independent SDK instances', () => {
      const sdk1 = new WildberriesSDK({ apiKey: 'key-1' });
      const sdk2 = new WildberriesSDK({ apiKey: 'key-2' });

      expect(sdk1).not.toBe(sdk2);
      expect(sdk1.general).not.toBe(sdk2.general);
    });

    it('should create separate BaseClient for each SDK instance', () => {
      new WildberriesSDK({ apiKey: 'key-1' });
      new WildberriesSDK({ apiKey: 'key-2' });

      expect(BaseClient).toHaveBeenCalledTimes(2);
      expect(BaseClient).toHaveBeenNthCalledWith(1, { apiKey: 'key-1' });
      expect(BaseClient).toHaveBeenNthCalledWith(2, { apiKey: 'key-2' });
    });

    it('should initialize separate modules for each SDK instance', () => {
      new WildberriesSDK({ apiKey: 'key-1' });
      new WildberriesSDK({ apiKey: 'key-2' });

      expect(GeneralModule).toHaveBeenCalledTimes(2);
    });
  });

  describe('Configuration Edge Cases', () => {
    it('should handle API key with special characters', () => {
      const specialKey = 'key-with-!@#$%^&*()_+=[]{}|;:,.<>?';

      const sdk = new WildberriesSDK({ apiKey: specialKey });

      expect(sdk).toBeInstanceOf(WildberriesSDK);
      expect(BaseClient).toHaveBeenCalledWith({ apiKey: specialKey });
    });

    it('should handle very long API key', () => {
      const longKey = 'a'.repeat(1000);

      const sdk = new WildberriesSDK({ apiKey: longKey });

      expect(sdk).toBeInstanceOf(WildberriesSDK);
      expect(BaseClient).toHaveBeenCalledWith({ apiKey: longKey });
    });

    it('should handle timeout of 0 (immediate timeout)', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-key',
        timeout: 0,
      });

      expect(sdk).toBeInstanceOf(WildberriesSDK);
      expect(BaseClient).toHaveBeenCalledWith({
        apiKey: 'test-key',
        timeout: 0,
      });
    });

    it('should handle very large timeout value', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-key',
        timeout: Number.MAX_SAFE_INTEGER,
      });

      expect(sdk).toBeInstanceOf(WildberriesSDK);
    });
  });

  describe('Type Safety', () => {
    it('should enforce SDKConfig type at compile time', () => {
      // This test validates TypeScript compilation
      // Runtime validation happens in constructor

      const validConfig = {
        apiKey: 'test-key',
        timeout: 30000,
        logLevel: 'warn' as const,
      };

      const sdk = new WildberriesSDK(validConfig);
      expect(sdk).toBeInstanceOf(WildberriesSDK);
    });

    it('should work with type inference', () => {
      const config = {
        apiKey: 'test-key',
      };

      const sdk = new WildberriesSDK(config);
      expect(sdk).toBeInstanceOf(WildberriesSDK);
    });
  });

  describe('Initialization Order', () => {
    it('should validate API key before creating BaseClient', () => {
      // If validation happens after BaseClient creation, this would create a client
      expect(() => {
        new WildberriesSDK({ apiKey: '' });
      }).toThrow(AuthenticationError);

      // BaseClient should not be created for invalid config
      expect(BaseClient).not.toHaveBeenCalled();
    });

    it('should create BaseClient before initializing modules', () => {
      new WildberriesSDK({ apiKey: 'test-key' });

      // Verify call order: BaseClient first, then modules
      const baseClientCallOrder = (BaseClient as unknown as { mock: { invocationCallOrder: number[] } }).mock.invocationCallOrder[0];
      const generalModuleCallOrder = (GeneralModule as unknown as { mock: { invocationCallOrder: number[] } }).mock.invocationCallOrder[0];

      expect(baseClientCallOrder).toBeLessThan(generalModuleCallOrder);
    });
  });
});
