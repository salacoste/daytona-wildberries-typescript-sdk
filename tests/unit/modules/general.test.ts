/**
 * Unit tests for GeneralModule
 *
 * Tests the GeneralModule class with mocked BaseClient to verify:
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Type safety and error handling
 *
 * @see {@link ../../../src/modules/general/index GeneralModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeneralModule } from '../../../src/modules/general';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';

describe('GeneralModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let generalModule: GeneralModule;

  beforeEach(() => {
    // Create fresh mocks before each test
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn()
    };

    // Create fresh instance before each test
    generalModule = new GeneralModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('ping()', () => {
    it('should call BaseClient.get with correct URL', async () => {
      // Arrange
      const mockResponse = { TS: '2024-01-01T00:00:00Z', Status: 'OK' as const };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      await generalModule.ping();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/ping'
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return typed response', async () => {
      // Arrange
      const mockResponse = { TS: '2024-01-01T00:00:00Z', Status: 'OK' as const };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await generalModule.ping();

      // Assert
      expect(result).toEqual(mockResponse);
      expect(result.Status).toBe('OK'); // Type-safe access
      expect(result.TS).toBe('2024-01-01T00:00:00Z');
    });

    it('should propagate NetworkError from BaseClient', async () => {
      // Arrange
      const error = new NetworkError('Network request failed', false, 500);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(generalModule.ping()).rejects.toThrow(NetworkError);
      await expect(generalModule.ping()).rejects.toThrow('Network request failed');
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(generalModule.ping()).rejects.toThrow(AuthenticationError);
    });

    it('should handle retry scenario (mock succeeds after failures)', async () => {
      // Arrange - simulate BaseClient's retry logic already handled
      const mockResponse = { TS: '2024-01-01T00:00:00Z', Status: 'OK' as const };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await generalModule.ping();

      // Assert - If BaseClient succeeds, module should return result
      expect(result).toEqual(mockResponse);
    });
  });

  describe('news()', () => {
    const mockNewsResponse = {
      data: [
        {
          content: 'Test news content',
          date: '2024-01-01',
          header: 'Test News Header',
          id: 1,
          types: [{ id: 1, name: 'Announcement' }]
        }
      ]
    };

    it('should call BaseClient.get with correct URL when no parameters provided', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewsResponse);

      // Act
      await generalModule.news();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/communications/v2/news',
        { params: undefined }
      );
    });

    it('should pass from parameter correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewsResponse);
      const options = { from: '2024-01-01' };

      // Act
      await generalModule.news(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/communications/v2/news',
        { params: options }
      );
    });

    it('should pass fromID parameter correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewsResponse);
      const options = { fromID: 123 };

      // Act
      await generalModule.news(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/communications/v2/news',
        { params: options }
      );
    });

    it('should pass both from and fromID parameters correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewsResponse);
      const options = { from: '2024-01-01', fromID: 123 };

      // Act
      await generalModule.news(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/communications/v2/news',
        { params: options }
      );
    });

    it('should return typed response with news data', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewsResponse);

      // Act
      const result = await generalModule.news();

      // Assert
      expect(result).toEqual(mockNewsResponse);
      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(1);
      if (result.data && result.data.length > 0) {
        expect(result.data[0].header).toBe('Test News Header');
      }
    });

    it('should handle empty news array gracefully', async () => {
      // Arrange
      const emptyResponse = { data: [] };
      mockClient.get.mockResolvedValue(emptyResponse);

      // Act
      const result = await generalModule.news();

      // Assert
      expect(result.data).toEqual([]);
      expect(result.data).toHaveLength(0);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(generalModule.news()).rejects.toThrow(RateLimitError);
    });
  });

  describe('sellerInfo()', () => {
    const mockSellerResponse = {
      name: 'Test Seller',
      sid: 'seller-123',
      tradeMark: 'TestBrand'
    };

    it('should call BaseClient.get with correct URL', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSellerResponse);

      // Act
      await generalModule.sellerInfo();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/v1/seller-info'
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return typed seller information', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSellerResponse);

      // Act
      const result = await generalModule.sellerInfo();

      // Assert
      expect(result).toEqual(mockSellerResponse);
      expect(result.name).toBe('Test Seller');
      expect(result.sid).toBe('seller-123');
      expect(result.tradeMark).toBe('TestBrand');
    });

    it('should propagate AuthenticationError for invalid API key', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(generalModule.sellerInfo()).rejects.toThrow(AuthenticationError);
      await expect(generalModule.sellerInfo()).rejects.toThrow('Invalid API key');
    });

    it('should propagate RateLimitError with retry information', async () => {
      // Arrange
      const retryAfter = 5000;
      const error = new RateLimitError('Rate limit exceeded', retryAfter);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(generalModule.sellerInfo()).rejects.toThrow(RateLimitError);

      try {
        await generalModule.sellerInfo();
      } catch (err) {
        expect(err).toBeInstanceOf(RateLimitError);
        if (err instanceof RateLimitError) {
          expect(err.retryAfter).toBe(retryAfter);
        }
      }
    });

    it('should propagate NetworkError from BaseClient', async () => {
      // Arrange
      const error = new NetworkError('Service unavailable', false, 503);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(generalModule.sellerInfo()).rejects.toThrow(NetworkError);
    });
  });
});
