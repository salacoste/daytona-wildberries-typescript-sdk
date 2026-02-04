/**
 * Unit tests for UserManagementModule
 *
 * Tests the UserManagementModule class with mocked BaseClient to verify:
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Type safety and error handling
 *
 * @see {@link ../../../src/modules/user-management/index UserManagementModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { UserManagementModule } from '../../../src/modules/user-management';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { ValidationError } from '../../../src/errors/validation-error';

describe('UserManagementModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let module: UserManagementModule;

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
    module = new UserManagementModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  // ──────────────────────────────────────────────────
  // Test Fixtures
  // ──────────────────────────────────────────────────

  const mockCreateInviteRequestFull = {
    access: [
      { code: 'balance' as const, disabled: false },
      { code: 'brands' as const, disabled: true },
    ],
    invite: {
      phoneNumber: '79999999999',
      position: 'Менеджер',
    },
  };

  const mockCreateInviteRequestMinimal = {
    invite: {
      phoneNumber: '79999999999',
    },
  };

  const mockCreateInviteResponse = {
    inviteID: '741b8aa6-08ac-4782-8a9d-d931bcbbf608',
    expiredAt: '2025-10-06T10:56:04.335060746Z',
    isSuccess: true,
    inviteUrl:
      'https://seller.wildberries.ru/supplier-settings/supplier-card?inviteId=e5a813c7-65e0-4599-a550-a6b3d85661ed',
  };

  const mockGetUsersResponse = {
    total: 2,
    countInResponse: 2,
    users: [
      {
        id: 1001,
        role: 'user' as const,
        position: 'Аналитик',
        phone: '79999999999',
        email: 'user1@example.com',
        isOwner: true,
        firstName: 'Иван',
        secondName: 'Иванов',
        patronymic: '',
        goodsReturn: true,
        isInvitee: false,
        inviteeInfo: null,
        access: [{ code: 'balance' as const, disabled: false }],
      },
      {
        id: 1002,
        role: '' as const,
        position: 'Менеджер',
        phone: '79998887766',
        email: 'user2@example.com',
        isOwner: false,
        firstName: 'Петр',
        secondName: 'Петров',
        patronymic: 'Петрович',
        goodsReturn: false,
        isInvitee: true,
        inviteeInfo: {
          phoneNumber: '79998887766',
          position: 'Менеджер',
          inviteUuid: 'abc12345-defg-6789-hijk-lmnop0123456',
          expiredAt: '2025-11-01T00:00:00Z',
          isActive: true,
        },
        access: [
          { code: 'balance' as const, disabled: false },
          { code: 'finance' as const, disabled: true },
        ],
      },
    ],
  };

  const mockUpdateAccessRequest = {
    usersAccesses: [
      {
        userId: 42334965,
        access: [
          { code: 'balance' as const, disabled: false },
          { code: 'finance' as const, disabled: true },
        ],
      },
    ],
  };

  const mockUpdateAccessRequestBatch = {
    usersAccesses: [
      {
        userId: 42334965,
        access: [
          { code: 'balance' as const, disabled: false },
          { code: 'finance' as const, disabled: true },
        ],
      },
      {
        userId: 42334966,
        access: [
          { code: 'brands' as const, disabled: false },
          { code: 'supply' as const, disabled: false },
        ],
      },
    ],
  };

  // ──────────────────────────────────────────────────
  // createInvite()
  // ──────────────────────────────────────────────────

  describe('createInvite()', () => {
    it('should call BaseClient.post with correct URL', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateInviteResponse);

      // Act
      await module.createInvite(mockCreateInviteRequestFull);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/invite',
        mockCreateInviteRequestFull,
        { rateLimitKey: 'userManagement.createInvite' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should pass request body to post', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateInviteResponse);

      // Act
      await module.createInvite(mockCreateInviteRequestFull);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          access: expect.arrayContaining([
            expect.objectContaining({ code: 'balance', disabled: false }),
          ]),
          invite: expect.objectContaining({
            phoneNumber: '79999999999',
            position: 'Менеджер',
          }),
        }),
        expect.any(Object)
      );
    });

    it('should pass rateLimitKey to post options', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateInviteResponse);

      // Act
      await module.createInvite(mockCreateInviteRequestFull);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'userManagement.createInvite' })
      );
    });

    it('should return typed CreateInviteResponse', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateInviteResponse);

      // Act
      const result = await module.createInvite(mockCreateInviteRequestFull);

      // Assert
      expect(result).toEqual(mockCreateInviteResponse);
      expect(result.inviteID).toBe('741b8aa6-08ac-4782-8a9d-d931bcbbf608');
      expect(result.isSuccess).toBe(true);
      expect(result.inviteUrl).toContain('seller.wildberries.ru');
      expect(result.expiredAt).toBe('2025-10-06T10:56:04.335060746Z');
    });

    it('should work with full access config', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateInviteResponse);

      // Act
      const result = await module.createInvite(mockCreateInviteRequestFull);

      // Assert
      expect(result).toEqual(mockCreateInviteResponse);
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          access: [
            { code: 'balance', disabled: false },
            { code: 'brands', disabled: true },
          ],
        }),
        expect.any(Object)
      );
    });

    it('should work with minimal request (only phoneNumber)', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateInviteResponse);

      // Act
      const result = await module.createInvite(mockCreateInviteRequestMinimal);

      // Assert
      expect(result).toEqual(mockCreateInviteResponse);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/invite',
        mockCreateInviteRequestMinimal,
        { rateLimitKey: 'userManagement.createInvite' }
      );
    });

    it('should propagate AuthenticationError (401)', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(module.createInvite(mockCreateInviteRequestFull)).rejects.toThrow(
        AuthenticationError
      );
      await expect(module.createInvite(mockCreateInviteRequestFull)).rejects.toThrow(
        'Invalid API key'
      );
    });

    it('should propagate RateLimitError (429)', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(module.createInvite(mockCreateInviteRequestFull)).rejects.toThrow(
        RateLimitError
      );
    });

    it('should propagate ValidationError (400)', async () => {
      // Arrange
      const error = new ValidationError('Invalid phone number format', {
        phoneNumber: 'Must be a valid phone number',
      });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(module.createInvite(mockCreateInviteRequestFull)).rejects.toThrow(
        ValidationError
      );
      await expect(module.createInvite(mockCreateInviteRequestFull)).rejects.toThrow(
        'Invalid phone number format'
      );
    });
  });

  // ──────────────────────────────────────────────────
  // getUsers()
  // ──────────────────────────────────────────────────

  describe('getUsers()', () => {
    it('should call BaseClient.get with correct URL', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockGetUsersResponse);

      // Act
      await module.getUsers();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/users',
        { params: undefined, rateLimitKey: 'userManagement.getUsers' }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should work without parameters (default params)', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockGetUsersResponse);

      // Act
      const result = await module.getUsers();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/users',
        { params: undefined, rateLimitKey: 'userManagement.getUsers' }
      );
      expect(result).toEqual(mockGetUsersResponse);
    });

    it('should pass isInviteOnly param correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockGetUsersResponse);

      // Act
      await module.getUsers({ isInviteOnly: true });

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/users',
        expect.objectContaining({
          params: expect.objectContaining({ isInviteOnly: true }),
          rateLimitKey: 'userManagement.getUsers',
        })
      );
    });

    it('should pass limit and offset params', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockGetUsersResponse);

      // Act
      await module.getUsers({ limit: 50, offset: 10 });

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/users',
        expect.objectContaining({
          params: expect.objectContaining({ limit: 50, offset: 10 }),
          rateLimitKey: 'userManagement.getUsers',
        })
      );
    });

    it('should pass rateLimitKey to get options', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockGetUsersResponse);

      // Act
      await module.getUsers();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'userManagement.getUsers' })
      );
    });

    it('should return typed GetUsersResponse', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockGetUsersResponse);

      // Act
      const result = await module.getUsers();

      // Assert
      expect(result).toEqual(mockGetUsersResponse);
      expect(result.total).toBe(2);
      expect(result.countInResponse).toBe(2);
      expect(result.users).toHaveLength(2);
      expect(result.users[0].firstName).toBe('Иван');
      expect(result.users[0].role).toBe('user');
      expect(result.users[0].isOwner).toBe(true);
      expect(result.users[0].access[0].code).toBe('balance');
    });

    it('should handle empty users list', async () => {
      // Arrange
      const emptyResponse = { total: 0, countInResponse: 0, users: [] };
      mockClient.get.mockResolvedValue(emptyResponse);

      // Act
      const result = await module.getUsers();

      // Assert
      expect(result.users).toEqual([]);
      expect(result.users).toHaveLength(0);
      expect(result.total).toBe(0);
    });

    it('should propagate AuthenticationError (401)', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(module.getUsers()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError (429)', async () => {
      // Arrange
      const retryAfter = 5000;
      const error = new RateLimitError('Rate limit exceeded', retryAfter);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(module.getUsers()).rejects.toThrow(RateLimitError);

      try {
        await module.getUsers();
      } catch (err) {
        expect(err).toBeInstanceOf(RateLimitError);
        if (err instanceof RateLimitError) {
          expect(err.retryAfter).toBe(retryAfter);
        }
      }
    });
  });

  // ──────────────────────────────────────────────────
  // updateUserAccess()
  // ──────────────────────────────────────────────────

  describe('updateUserAccess()', () => {
    it('should call BaseClient.put with correct URL', async () => {
      // Arrange
      mockClient.put.mockResolvedValue(undefined);

      // Act
      await module.updateUserAccess(mockUpdateAccessRequest);

      // Assert
      expect(mockClient.put).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/users/access',
        mockUpdateAccessRequest,
        { rateLimitKey: 'userManagement.updateAccess' }
      );
      expect(mockClient.put).toHaveBeenCalledTimes(1);
    });

    it('should pass request body with single user access update', async () => {
      // Arrange
      mockClient.put.mockResolvedValue(undefined);

      // Act
      await module.updateUserAccess(mockUpdateAccessRequest);

      // Assert
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          usersAccesses: expect.arrayContaining([
            expect.objectContaining({
              userId: 42334965,
              access: expect.arrayContaining([
                expect.objectContaining({ code: 'balance', disabled: false }),
                expect.objectContaining({ code: 'finance', disabled: true }),
              ]),
            }),
          ]),
        }),
        expect.any(Object)
      );
    });

    it('should pass request body with batch update (multiple users)', async () => {
      // Arrange
      mockClient.put.mockResolvedValue(undefined);

      // Act
      await module.updateUserAccess(mockUpdateAccessRequestBatch);

      // Assert
      expect(mockClient.put).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/users/access',
        mockUpdateAccessRequestBatch,
        { rateLimitKey: 'userManagement.updateAccess' }
      );
      expect(mockUpdateAccessRequestBatch.usersAccesses).toHaveLength(2);
    });

    it('should pass rateLimitKey to put options', async () => {
      // Arrange
      mockClient.put.mockResolvedValue(undefined);

      // Act
      await module.updateUserAccess(mockUpdateAccessRequest);

      // Assert
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'userManagement.updateAccess' })
      );
    });

    it('should return void (no response body expected)', async () => {
      // Arrange
      mockClient.put.mockResolvedValue(undefined);

      // Act & Assert - void method should resolve without error
      await expect(module.updateUserAccess(mockUpdateAccessRequest)).resolves.toBeUndefined();
    });

    it('should propagate AuthenticationError (401)', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.put.mockRejectedValue(error);

      // Act & Assert
      await expect(module.updateUserAccess(mockUpdateAccessRequest)).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should propagate RateLimitError (429)', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.put.mockRejectedValue(error);

      // Act & Assert
      await expect(module.updateUserAccess(mockUpdateAccessRequest)).rejects.toThrow(
        RateLimitError
      );
    });

    it('should propagate ValidationError (400)', async () => {
      // Arrange
      const error = new ValidationError('Invalid user access data', {
        userId: 'User not found',
      });
      mockClient.put.mockRejectedValue(error);

      // Act & Assert
      await expect(module.updateUserAccess(mockUpdateAccessRequest)).rejects.toThrow(
        ValidationError
      );
      await expect(module.updateUserAccess(mockUpdateAccessRequest)).rejects.toThrow(
        'Invalid user access data'
      );
    });
  });

  // ──────────────────────────────────────────────────
  // deleteUser()
  // ──────────────────────────────────────────────────

  describe('deleteUser()', () => {
    it('should call BaseClient.delete with correct URL', async () => {
      // Arrange
      mockClient.delete.mockResolvedValue(undefined);

      // Act
      await module.deleteUser(12345);

      // Assert
      expect(mockClient.delete).toHaveBeenCalledWith(
        'https://user-management-api.wildberries.ru/api/v1/user',
        undefined,
        {
          params: { deletedUserID: 12345 },
          rateLimitKey: 'userManagement.deleteUser',
        }
      );
      expect(mockClient.delete).toHaveBeenCalledTimes(1);
    });

    it('should pass deletedUserID as query parameter', async () => {
      // Arrange
      const userId = 42334965;
      mockClient.delete.mockResolvedValue(undefined);

      // Act
      await module.deleteUser(userId);

      // Assert
      expect(mockClient.delete).toHaveBeenCalledWith(
        expect.any(String),
        undefined,
        expect.objectContaining({
          params: expect.objectContaining({ deletedUserID: userId }),
        })
      );
    });

    it('should pass rateLimitKey to delete options', async () => {
      // Arrange
      mockClient.delete.mockResolvedValue(undefined);

      // Act
      await module.deleteUser(12345);

      // Assert
      expect(mockClient.delete).toHaveBeenCalledWith(
        expect.any(String),
        undefined,
        expect.objectContaining({ rateLimitKey: 'userManagement.deleteUser' })
      );
    });

    it('should return void', async () => {
      // Arrange
      mockClient.delete.mockResolvedValue(undefined);

      // Act & Assert - void method should resolve without error
      await expect(module.deleteUser(12345)).resolves.toBeUndefined();
    });

    it('should propagate AuthenticationError (401)', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(module.deleteUser(12345)).rejects.toThrow(AuthenticationError);
      await expect(module.deleteUser(12345)).rejects.toThrow('Invalid API key');
    });

    it('should propagate RateLimitError (429)', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(module.deleteUser(12345)).rejects.toThrow(RateLimitError);
    });

    it('should propagate ValidationError (400 - invalid userId)', async () => {
      // Arrange
      const error = new ValidationError('Invalid user ID', {
        deletedUserID: 'User ID does not exist',
      });
      mockClient.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(module.deleteUser(99999)).rejects.toThrow(ValidationError);
      await expect(module.deleteUser(99999)).rejects.toThrow('Invalid user ID');
    });
  });
});
