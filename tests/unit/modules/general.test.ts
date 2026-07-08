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

/* eslint-disable @typescript-eslint/no-deprecated */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeneralModule } from '../../../src/modules/general';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';

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
      delete: vi.fn(),
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
      expect(mockClient.get).toHaveBeenCalledWith('https://common-api.wildberries.ru/ping', {
        rateLimitKey: 'general.ping',
      });
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
          types: [{ id: 1, name: 'Announcement' }],
        },
      ],
    };

    it('should work without parameters', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewsResponse);

      // Act
      const result = await generalModule.news();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/communications/v2/news',
        { params: undefined, rateLimitKey: 'general.communicationsNews' }
      );
      expect(result).toEqual(mockNewsResponse);
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
        expect.objectContaining({
          params: expect.objectContaining({ from: '2024-01-01' }),
          rateLimitKey: 'general.communicationsNews',
        })
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
        expect.objectContaining({
          params: expect.objectContaining({ fromID: 123 }),
          rateLimitKey: 'general.communicationsNews',
        })
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
        expect.objectContaining({
          params: expect.objectContaining({ from: '2024-01-01', fromID: 123 }),
          rateLimitKey: 'general.communicationsNews',
        })
      );
    });

    it('should return typed response with news data', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockNewsResponse);
      const options = { from: '2024-01-01' };

      // Act
      const result = await generalModule.news(options);

      // Assert
      expect(result).toEqual(mockNewsResponse);
      expect(result.data).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].header).toBe('Test News Header');
    });

    it('should handle empty news array gracefully', async () => {
      // Arrange
      const emptyResponse = { data: [] };
      mockClient.get.mockResolvedValue(emptyResponse);
      const options = { from: '2024-01-01' };

      // Act
      const result = await generalModule.news(options);

      // Assert
      expect(result.data).toEqual([]);
      expect(result.data).toHaveLength(0);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.get.mockRejectedValue(error);
      const options = { from: '2024-01-01' };

      // Act & Assert
      await expect(generalModule.news(options)).rejects.toThrow(RateLimitError);
    });
  });

  describe('sellerInfo()', () => {
    const mockSellerResponse = {
      name: 'Test Seller',
      sid: 'seller-123',
      tradeMark: 'TestBrand',
    };

    it('should call BaseClient.get with correct URL', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSellerResponse);

      // Act
      await generalModule.sellerInfo();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/v1/seller-info',
        { rateLimitKey: 'general.sellerInfo' }
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

  // ============================================================================
  // User Management Methods
  // ============================================================================

  const USER_MGMT_BASE_URL = 'https://user-management-api.wildberries.ru';

  describe('createInvite()', () => {
    const mockResponse = {
      inviteID: '741b8aa6-08ac-4782-8a9d-d931bcbbf608',
      expiredAt: '2025-10-06T10:56:04.335060746Z',
      isSuccess: true,
      inviteUrl: 'https://seller.wildberries.ru/supplier-settings/supplier-card?inviteId=xxx',
    };

    it('should call correct endpoint with POST method', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockResponse);
      const request = {
        invite: { phoneNumber: '79999999999', position: 'Manager' },
        access: [{ code: 'balance' as const, disabled: false }],
      };

      // Act
      await generalModule.createInvite(request);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(`${USER_MGMT_BASE_URL}/api/v1/invite`, request, {
        rateLimitKey: 'general.createInvite',
      });
    });

    it('should accept the new WB access codes (brandsFlow, copyrightComplaints, pretrialClaims, sellersChat)', async () => {
      // Arrange — the 4 access sections WB added (task-145)
      mockClient.post.mockResolvedValue(mockResponse);
      const request = {
        invite: { phoneNumber: '79999999999' },
        access: [
          { code: 'brandsFlow' as const, disabled: false },
          { code: 'copyrightComplaints' as const, disabled: true },
          { code: 'pretrialClaims' as const, disabled: true },
          { code: 'sellersChat' as const, disabled: false },
        ],
      };

      // Act
      await generalModule.createInvite(request);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(`${USER_MGMT_BASE_URL}/api/v1/invite`, request, {
        rateLimitKey: 'general.createInvite',
      });
    });

    it('should return invite response with all fields', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await generalModule.createInvite({
        invite: { phoneNumber: '79999999999' },
      });

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.inviteID).toBe('741b8aa6-08ac-4782-8a9d-d931bcbbf608');
      expect(result.inviteUrl).toContain('https://');
      expect(result.expiredAt).toBeDefined();
    });

    it('should propagate AuthenticationError', async () => {
      // Arrange
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      // Act & Assert
      await expect(
        generalModule.createInvite({ invite: { phoneNumber: '79999999999' } })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      // Arrange
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      // Act & Assert
      await expect(
        generalModule.createInvite({ invite: { phoneNumber: '79999999999' } })
      ).rejects.toThrow(RateLimitError);
    });

    it('should propagate ValidationError on bad request', async () => {
      // Arrange
      mockClient.post.mockRejectedValue(new ValidationError('Invalid phone number format'));

      // Act & Assert
      await expect(
        generalModule.createInvite({ invite: { phoneNumber: 'invalid' } })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('getUsers()', () => {
    const mockResponse = {
      total: 2,
      countInResponse: 2,
      users: [
        {
          id: 1001,
          role: 'user' as const,
          position: 'Analyst',
          phone: '79999999999',
          email: 'test@example.com',
          isOwner: true,
          firstName: 'Ivan',
          secondName: 'Ivanov',
          patronymic: '',
          goodsReturn: true,
          isInvitee: false,
          inviteeInfo: null,
          access: [],
        },
      ],
    };

    it('should call correct endpoint with GET method (no params)', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      await generalModule.getUsers();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(`${USER_MGMT_BASE_URL}/api/v1/users`, {
        rateLimitKey: 'general.getUsers',
      });
    });

    it('should pass query params correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      await generalModule.getUsers({ limit: 50, offset: 10, isInviteOnly: true });

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(`${USER_MGMT_BASE_URL}/api/v1/users`, {
        params: { limit: 50, offset: 10, isInviteOnly: true },
        rateLimitKey: 'general.getUsers',
      });
    });

    it('should return users list with correct structure', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await generalModule.getUsers();

      // Assert
      expect(result.total).toBe(2);
      expect(result.countInResponse).toBe(2);
      expect(result.users).toHaveLength(1);
      expect(result.users[0].id).toBe(1001);
      expect(result.users[0].isOwner).toBe(true);
    });

    it('should propagate AuthenticationError', async () => {
      // Arrange
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));

      // Act & Assert
      await expect(generalModule.getUsers()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      // Arrange
      mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      // Act & Assert
      await expect(generalModule.getUsers()).rejects.toThrow(RateLimitError);
    });
  });

  describe('updateUserAccess()', () => {
    it('should call correct endpoint with PUT method', async () => {
      // Arrange
      mockClient.put.mockResolvedValue(undefined);
      const request = {
        usersAccesses: [
          { userId: 42334965, access: [{ code: 'balance' as const, disabled: false }] },
        ],
      };

      // Act
      await generalModule.updateUserAccess(request);

      // Assert
      expect(mockClient.put).toHaveBeenCalledWith(
        `${USER_MGMT_BASE_URL}/api/v1/users/access`,
        request,
        { rateLimitKey: 'general.updateUserAccess' }
      );
    });

    it('should handle successful response (void return)', async () => {
      // Arrange
      mockClient.put.mockResolvedValue(undefined);

      // Act & Assert - should not throw
      await expect(
        generalModule.updateUserAccess({
          usersAccesses: [{ userId: 123, access: [{ code: 'balance' as const, disabled: true }] }],
        })
      ).resolves.toBeUndefined();
    });

    it('should propagate ValidationError on bad request', async () => {
      // Arrange
      mockClient.put.mockRejectedValue(new ValidationError('Invalid user ID'));

      // Act & Assert
      await expect(generalModule.updateUserAccess({ usersAccesses: [] })).rejects.toThrow(
        ValidationError
      );
    });

    it('should propagate AuthenticationError', async () => {
      // Arrange
      mockClient.put.mockRejectedValue(new AuthenticationError('Invalid API key'));

      // Act & Assert
      await expect(generalModule.updateUserAccess({ usersAccesses: [] })).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  describe('deleteUser()', () => {
    it('should call correct endpoint with DELETE method', async () => {
      // Arrange
      mockClient.delete.mockResolvedValue(undefined);

      // Act
      await generalModule.deleteUser(12345);

      // Assert
      expect(mockClient.delete).toHaveBeenCalledWith(
        `${USER_MGMT_BASE_URL}/api/v1/user`,
        {},
        { params: { deletedUserID: 12345 }, rateLimitKey: 'general.deleteUser' }
      );
    });

    it('should handle successful deletion (void return)', async () => {
      // Arrange
      mockClient.delete.mockResolvedValue(undefined);

      // Act & Assert - should not throw
      await expect(generalModule.deleteUser(12345)).resolves.toBeUndefined();
    });

    it('should propagate AuthenticationError', async () => {
      // Arrange
      mockClient.delete.mockRejectedValue(new AuthenticationError('Invalid API key'));

      // Act & Assert
      await expect(generalModule.deleteUser(12345)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      // Arrange
      mockClient.delete.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      // Act & Assert
      await expect(generalModule.deleteUser(12345)).rejects.toThrow(RateLimitError);
    });

    it('should propagate ValidationError for invalid user ID', async () => {
      // Arrange
      mockClient.delete.mockRejectedValue(new ValidationError('User not found'));

      // Act & Assert
      await expect(generalModule.deleteUser(99999)).rejects.toThrow(ValidationError);
    });
  });

  // ============================================================================
  // Jam Subscription Status (deprecated — probe-based, kept as fallback)
  // ============================================================================

  describe('getJamSubscriptionStatus()', () => {
    const PROBE_URL =
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/search-texts';
    const RATE_LIMIT_KEY = 'analytics.postSearchReportProductSearchTexts';
    const TEST_NM_IDS = [12345678];

    /** Helper to build expected probe payload for a given limit */
    function expectedPayload(limit: number) {
      return expect.objectContaining({
        currentPeriod: expect.objectContaining({
          start: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
          end: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        }),
        nmIds: TEST_NM_IDS,
        topOrderBy: 'openCard',
        orderBy: { field: 'avgPosition', mode: 'asc' },
        limit,
      });
    }

    it('should detect Advanced tier when probe with limit=31 succeeds (1 call)', async () => {
      // Arrange - first probe succeeds → advanced
      mockClient.post.mockResolvedValueOnce({ data: { items: [] } });

      // Act
      const result = await generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS });

      // Assert
      expect(result.tier).toBe('advanced');
      expect(result.probeCallsMade).toBe(1);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should detect Standard tier when limit=31 fails but limit=1 succeeds (2 calls)', async () => {
      // Arrange - first probe fails (400), second succeeds
      mockClient.post
        .mockRejectedValueOnce(new ValidationError('limit exceeds tariff'))
        .mockResolvedValueOnce({ data: { items: [] } });

      // Act
      const result = await generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS });

      // Assert
      expect(result.tier).toBe('standard');
      expect(result.probeCallsMade).toBe(2);
      expect(mockClient.post).toHaveBeenCalledTimes(2);
    });

    it('should detect None tier when both probes fail with ValidationError (2 calls)', async () => {
      // Arrange - both probes fail (400)
      mockClient.post
        .mockRejectedValueOnce(new ValidationError('limit exceeds tariff'))
        .mockRejectedValueOnce(new ValidationError('no subscription'));

      // Act
      const result = await generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS });

      // Assert
      expect(result.tier).toBe('none');
      expect(result.probeCallsMade).toBe(2);
      expect(mockClient.post).toHaveBeenCalledTimes(2);
    });

    it('should throw ValidationError for empty nmIds array', async () => {
      // Act & Assert
      await expect(generalModule.getJamSubscriptionStatus({ nmIds: [] })).rejects.toThrow(
        ValidationError
      );
      await expect(generalModule.getJamSubscriptionStatus({ nmIds: [] })).rejects.toThrow(
        'nmIds must be a non-empty array'
      );
    });

    it('should re-throw AuthenticationError from probe 1', async () => {
      // Arrange
      mockClient.post.mockRejectedValueOnce(new AuthenticationError('Invalid API key'));

      // Act & Assert
      await expect(generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS })).rejects.toThrow(
        AuthenticationError
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should re-throw RateLimitError from probe 1', async () => {
      // Arrange
      mockClient.post.mockRejectedValueOnce(new RateLimitError('Rate limit exceeded', 5000));

      // Act & Assert
      await expect(generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS })).rejects.toThrow(
        RateLimitError
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should re-throw NetworkError from probe 1', async () => {
      // Arrange
      mockClient.post.mockRejectedValueOnce(new NetworkError('Connection refused', false, 500));

      // Act & Assert
      await expect(generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS })).rejects.toThrow(
        NetworkError
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should re-throw AuthenticationError from probe 2', async () => {
      // Arrange - probe 1 fails with ValidationError, probe 2 fails with AuthError
      mockClient.post
        .mockRejectedValueOnce(new ValidationError('limit exceeds tariff'))
        .mockRejectedValueOnce(new AuthenticationError('Token expired'));

      // Act & Assert
      await expect(generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS })).rejects.toThrow(
        AuthenticationError
      );
      expect(mockClient.post).toHaveBeenCalledTimes(2);
    });

    it('should re-throw RateLimitError from probe 2', async () => {
      // Arrange
      mockClient.post
        .mockRejectedValueOnce(new ValidationError('limit exceeds tariff'))
        .mockRejectedValueOnce(new RateLimitError('Rate limit exceeded', 3000));

      // Act & Assert
      await expect(generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS })).rejects.toThrow(
        RateLimitError
      );
      expect(mockClient.post).toHaveBeenCalledTimes(2);
    });

    it('should re-throw NetworkError from probe 2', async () => {
      // Arrange
      mockClient.post
        .mockRejectedValueOnce(new ValidationError('limit exceeds tariff'))
        .mockRejectedValueOnce(new NetworkError('Timeout', true));

      // Act & Assert
      await expect(generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS })).rejects.toThrow(
        NetworkError
      );
      expect(mockClient.post).toHaveBeenCalledTimes(2);
    });

    it('should call probe 1 with correct URL, payload (limit=31), and rateLimitKey', async () => {
      // Arrange
      mockClient.post.mockResolvedValueOnce({ data: { items: [] } });

      // Act
      await generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(PROBE_URL, expectedPayload(31), {
        rateLimitKey: RATE_LIMIT_KEY,
      });
    });

    it('should call probe 2 with correct URL, payload (limit=1), and rateLimitKey', async () => {
      // Arrange
      mockClient.post
        .mockRejectedValueOnce(new ValidationError('limit exceeds tariff'))
        .mockResolvedValueOnce({ data: { items: [] } });

      // Act
      await generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS });

      // Assert — second call uses limit=1
      expect(mockClient.post).toHaveBeenNthCalledWith(2, PROBE_URL, expectedPayload(1), {
        rateLimitKey: RATE_LIMIT_KEY,
      });
    });

    it('should return checkedAt as a valid ISO 8601 string', async () => {
      // Arrange
      mockClient.post.mockResolvedValueOnce({ data: { items: [] } });

      // Act
      const result = await generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS });

      // Assert
      expect(result.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      expect(new Date(result.checkedAt).toISOString()).toBe(result.checkedAt);
    });

    it('should use yesterday as the probe date period', async () => {
      // Arrange
      mockClient.post.mockResolvedValueOnce({ data: { items: [] } });
      const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

      // Act
      await generalModule.getJamSubscriptionStatus({ nmIds: TEST_NM_IDS });

      // Assert
      const payload = mockClient.post.mock.calls[0][1];
      expect(payload.currentPeriod.start).toBe(yesterday);
      expect(payload.currentPeriod.end).toBe(yesterday);
    });

    it('should pass through multiple nmIds in the probe payload', async () => {
      // Arrange
      const multipleNmIds = [111, 222, 333];
      mockClient.post.mockResolvedValueOnce({ data: { items: [] } });

      // Act
      await generalModule.getJamSubscriptionStatus({ nmIds: multipleNmIds });

      // Assert
      const payload = mockClient.post.mock.calls[0][1];
      expect(payload.nmIds).toEqual(multipleNmIds);
    });
  });

  // ============================================================================
  // Jam Subscription Direct API
  // ============================================================================

  describe('getJamSubscription()', () => {
    it('should return Jam subscription details for active subscription', async () => {
      const mockResponse = {
        state: 'active',
        activationSource: 'jam',
        level: 'premium',
        since: '2026-03-16T08:38:08.056406Z',
        till: '2026-04-25T14:44:28.393587Z',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await generalModule.getJamSubscription();

      expect(result.state).toBe('active');
      expect(result.activationSource).toBe('jam');
      expect(result.level).toBe('premium');
      expect(result.since).toBeDefined();
      expect(result.till).toBeDefined();
    });

    it('should call correct URL and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue({});

      await generalModule.getJamSubscription();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/common/v1/subscriptions',
        { rateLimitKey: 'general.getJamSubscription' }
      );
    });

    it('should handle empty response for never-subscribed seller', async () => {
      mockClient.get.mockResolvedValue({});

      const result = await generalModule.getJamSubscription();

      expect(result.state).toBeUndefined();
      expect(result.level).toBeUndefined();
    });

    it('should propagate AuthenticationError for non-Service token', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('personal token is not allowed'));
      await expect(generalModule.getJamSubscription()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(generalModule.getJamSubscription()).rejects.toThrow(RateLimitError);
    });
  });

  // ============================================================================
  // Seller Rating
  // ============================================================================

  describe('getSellerRating()', () => {
    it('should return seller rating and review count', async () => {
      const mockResponse = { feedbackCount: 12355, valuation: 4.55 };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await generalModule.getSellerRating();

      expect(result.feedbackCount).toBe(12355);
      expect(result.valuation).toBe(4.55);
    });

    it('should call correct URL and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue({});

      await generalModule.getSellerRating();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/common/v1/rating',
        { rateLimitKey: 'general.getSellerRating' }
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid token category'));
      await expect(generalModule.getSellerRating()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(generalModule.getSellerRating()).rejects.toThrow(RateLimitError);
    });
  });

  // ============================================================================
  // Tariff Constructor (Plan Builder) Options
  // ============================================================================

  describe('getTariffConstructorOptions()', () => {
    it('should return Plan Builder options and packages', async () => {
      const mockResponse = {
        activeOptionCount: 2,
        activePackageCount: 1,
        totalCommissionRate: 2.3,
        packages: [
          {
            slug: 'super-seller',
            name: 'Суперпродавец',
            status: 'active',
            periodDuration: 90,
            commissionRate: 0.8,
            activatedAt: '2026-03-15T00:00:00+03:00',
            expiresAt: '2026-06-15T00:00:00+03:00',
            options: [
              {
                id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                slug: 'review-pin',
                name: 'Закрепление отзыва',
              },
            ],
          },
        ],
        options: [
          {
            id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
            slug: 'priority-support',
            name: 'Приоритетная поддержка',
            status: 'pendingDeactivation',
            periodDuration: 30,
            activatedAt: '2026-03-15T00:00:00+03:00',
            expiresAt: '2026-04-10T00:00:00+03:00',
            promotion: { commissionRate: 0.3, expiresAt: '2026-04-30T00:00:00+03:00' },
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await generalModule.getTariffConstructorOptions();

      expect(result.totalCommissionRate).toBe(2.3);
      expect(result.activePackageCount).toBe(1);
      expect(result.activeOptionCount).toBe(2);
      expect(result.packages).toHaveLength(1);
      expect(result.packages[0].options).toHaveLength(1);
      expect(result.options[0].promotion?.commissionRate).toBe(0.3);
    });

    it('should call correct URL and rateLimitKey without params', async () => {
      mockClient.get.mockResolvedValue({
        activeOptionCount: 0,
        activePackageCount: 0,
        totalCommissionRate: 0,
        packages: [],
        options: [],
      });

      await generalModule.getTariffConstructorOptions();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/common/v1/tariff-constructor/options',
        { params: undefined, rateLimitKey: 'general.tariffConstructorOptions' }
      );
    });

    it('should forward locale param when provided', async () => {
      mockClient.get.mockResolvedValue({
        activeOptionCount: 0,
        activePackageCount: 0,
        totalCommissionRate: 0,
        packages: [],
        options: [],
      });

      await generalModule.getTariffConstructorOptions({ locale: 'en' });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://common-api.wildberries.ru/api/common/v1/tariff-constructor/options',
        { params: { locale: 'en' }, rateLimitKey: 'general.tariffConstructorOptions' }
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid token'));
      await expect(generalModule.getTariffConstructorOptions()).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(generalModule.getTariffConstructorOptions()).rejects.toThrow(RateLimitError);
    });
  });
});
