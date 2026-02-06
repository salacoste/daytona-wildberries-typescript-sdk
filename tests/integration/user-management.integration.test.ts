/**
 * Integration tests for UserManagementModule
 *
 * Tests the UserManagementModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow from module -> BaseClient -> RateLimiter -> RetryHandler -> HTTP
 * - Rate limiting enforcement for user management endpoints
 * - Retry logic with real timing
 * - Error transformation from HTTP responses
 * - User management-specific error scenarios
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/user-management/index UserManagementModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { UserManagementModule } from '../../src/modules/user-management';
import { BaseClient } from '../../src/client/base-client';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { NetworkError } from '../../src/errors/network-error';
import type {
  CreateInviteRequest,
  CreateInviteResponse,
  GetUsersResponse,
  UpdateUserAccessRequest,
} from '../../src/types/user-management.types';

/**
 * MSW handlers for User Management API endpoints
 * These intercept HTTP requests at the network level and return mocked responses
 */
const handlers = [
  // POST /api/v1/invite - Create invitation
  http.post('https://user-management-api.wildberries.ru/api/v1/invite', async ({ request }) => {
    const body = (await request.json()) as CreateInviteRequest;

    return HttpResponse.json({
      inviteID: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      expiredAt: '2026-02-11T12:00:00Z',
      isSuccess: true,
      inviteUrl: `https://seller.wildberries.ru/invite/a1b2c3d4?phone=${encodeURIComponent(body.invite.phoneNumber)}`,
    } satisfies CreateInviteResponse);
  }),

  // GET /api/v1/users - Get users list
  http.get('https://user-management-api.wildberries.ru/api/v1/users', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') ?? '100');
    const offset = parseInt(url.searchParams.get('offset') ?? '0');
    const isInviteOnly = url.searchParams.get('isInviteOnly') === 'true';

    const allUsers = [
      {
        id: 1001,
        role: 'user' as const,
        position: 'Manager',
        phone: '+79991234567',
        email: 'manager@example.com',
        isOwner: true,
        firstName: 'Ivan',
        secondName: 'Petrov',
        patronymic: 'Sergeevich',
        goodsReturn: true,
        isInvitee: false,
        inviteeInfo: null,
        access: [
          { code: 'balance' as const, disabled: false },
          { code: 'finance' as const, disabled: false },
        ],
      },
      {
        id: 1002,
        role: '' as const,
        position: 'Assistant',
        phone: '+79997654321',
        email: 'assistant@example.com',
        isOwner: false,
        firstName: 'Anna',
        secondName: 'Sidorova',
        patronymic: 'Ivanovna',
        goodsReturn: false,
        isInvitee: true,
        inviteeInfo: {
          phoneNumber: '+79997654321',
          position: 'Assistant',
          inviteUuid: 'uuid-invite-1002',
          expiredAt: '2026-03-01T00:00:00Z',
          isActive: true,
        },
        access: [
          { code: 'balance' as const, disabled: true },
          { code: 'showcase' as const, disabled: false },
        ],
      },
    ];

    const filtered = isInviteOnly ? allUsers.filter((u) => u.isInvitee) : allUsers;
    const paged = filtered.slice(offset, offset + limit);

    return HttpResponse.json({
      total: filtered.length,
      countInResponse: paged.length,
      users: paged,
    } satisfies GetUsersResponse);
  }),

  // PUT /api/v1/users/access - Update user access
  http.put('https://user-management-api.wildberries.ru/api/v1/users/access', () => {
    return new HttpResponse(null, { status: 200 });
  }),

  // DELETE /api/v1/user - Delete user
  http.delete('https://user-management-api.wildberries.ru/api/v1/user', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];

/**
 * Setup MSW server
 * This server intercepts all HTTP requests during tests and returns mocked responses
 */
const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// Reset handlers after each test to prevent test interference
afterEach(() => {
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => {
  server.close();
});

describe('UserManagementModule Integration Tests', () => {
  let userManagementModule: UserManagementModule;
  let baseClient: BaseClient;

  beforeEach(() => {
    // Create real BaseClient with test configuration
    baseClient = new BaseClient({
      apiKey: 'test-api-key-123',
      timeout: 5000,
      retryConfig: {
        maxRetries: 2,
        retryDelay: 100,
        exponentialBackoff: true,
      },
    });

    // Create UserManagementModule with real BaseClient
    userManagementModule = new UserManagementModule(baseClient);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // createInvite
  // ─────────────────────────────────────────────────────────────────────────
  describe('createInvite', () => {
    it('should successfully create an invitation with access settings', async () => {
      // Arrange
      const request: CreateInviteRequest = {
        invite: {
          phoneNumber: '+79991234567',
          position: 'Manager',
        },
        access: [
          { code: 'balance', disabled: false },
          { code: 'finance', disabled: true },
        ],
      };

      // Act
      const result = await userManagementModule.createInvite(request);

      // Assert
      expect(result).toBeDefined();
      expect(result.inviteID).toBe('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
      expect(result.isSuccess).toBe(true);
      expect(result.inviteUrl).toContain('invite');
      expect(result.expiredAt).toBe('2026-02-11T12:00:00Z');
    });

    it('should successfully create an invitation without access settings (defaults applied)', async () => {
      // Arrange
      const request: CreateInviteRequest = {
        invite: {
          phoneNumber: '+79990000000',
        },
      };

      // Act
      const result = await userManagementModule.createInvite(request);

      // Assert
      expect(result.isSuccess).toBe(true);
      expect(result.inviteID).toBeDefined();
      expect(typeof result.inviteUrl).toBe('string');
    });

    it('should throw AuthenticationError on 401 response', async () => {
      // Arrange
      server.use(
        http.post('https://user-management-api.wildberries.ru/api/v1/invite', () => {
          return HttpResponse.json(
            {
              title: 'Unauthorized',
              detail: 'Invalid API key',
              requestId: 'req-001',
              origin: 'user-management',
              status: 401,
            },
            {
              status: 401,
              headers: { 'Content-Type': 'application/problem+json' },
            }
          );
        })
      );

      // Act & Assert
      await expect(
        userManagementModule.createInvite({
          invite: { phoneNumber: '+79991234567' },
        })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should throw RateLimitError on 429 response', async () => {
      // Arrange
      server.use(
        http.post('https://user-management-api.wildberries.ru/api/v1/invite', () => {
          return HttpResponse.json(
            { error: 'Too Many Requests' },
            {
              status: 429,
              headers: { 'Retry-After': '10' },
            }
          );
        })
      );

      // Act & Assert
      await expect(
        userManagementModule.createInvite({
          invite: { phoneNumber: '+79991234567' },
        })
      ).rejects.toThrow(RateLimitError);
    });

    it('should throw NetworkError on 500 response', async () => {
      // Arrange
      server.use(
        http.post('https://user-management-api.wildberries.ru/api/v1/invite', () => {
          return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        })
      );

      // Act & Assert
      await expect(
        userManagementModule.createInvite({
          invite: { phoneNumber: '+79991234567' },
        })
      ).rejects.toThrow(NetworkError);
    });

    it('should include Authorization header in requests', async () => {
      // Arrange
      let authHeader: string | null = null;

      server.use(
        http.post('https://user-management-api.wildberries.ru/api/v1/invite', ({ request }) => {
          authHeader = request.headers.get('Authorization');

          return HttpResponse.json({
            inviteID: 'test-uuid',
            expiredAt: '2026-02-11T12:00:00Z',
            isSuccess: true,
            inviteUrl: 'https://seller.wildberries.ru/invite/test',
          });
        })
      );

      // Act
      await userManagementModule.createInvite({
        invite: { phoneNumber: '+79991234567' },
      });

      // Assert
      expect(authHeader).toBeDefined();
      expect(authHeader).toContain('test-api-key-123');
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // getUsers
  // ─────────────────────────────────────────────────────────────────────────
  describe('getUsers', () => {
    it('should successfully get users without parameters (defaults)', async () => {
      // Act
      const result = await userManagementModule.getUsers();

      // Assert
      expect(result).toBeDefined();
      expect(result.total).toBe(2);
      expect(result.countInResponse).toBe(2);
      expect(result.users).toHaveLength(2);
      expect(result.users[0].firstName).toBe('Ivan');
      expect(result.users[0].isOwner).toBe(true);
    });

    it('should successfully get users with pagination parameters', async () => {
      // Act
      const result = await userManagementModule.getUsers({ limit: 1, offset: 0 });

      // Assert
      expect(result.countInResponse).toBe(1);
      expect(result.users).toHaveLength(1);
      expect(result.users[0].id).toBe(1001);
    });

    it('should successfully filter invite-only users', async () => {
      // Act
      const result = await userManagementModule.getUsers({ isInviteOnly: true });

      // Assert
      expect(result.total).toBe(1);
      expect(result.users).toHaveLength(1);
      expect(result.users[0].isInvitee).toBe(true);
      expect(result.users[0].inviteeInfo).not.toBeNull();
      expect(result.users[0].inviteeInfo?.isActive).toBe(true);
    });

    it('should return correct user access information', async () => {
      // Act
      const result = await userManagementModule.getUsers();

      // Assert
      const owner = result.users[0];
      expect(owner.access).toHaveLength(2);
      expect(owner.access[0].code).toBe('balance');
      expect(owner.access[0].disabled).toBe(false);
    });

    it('should throw AuthenticationError on 401 response', async () => {
      // Arrange
      server.use(
        http.get('https://user-management-api.wildberries.ru/api/v1/users', () => {
          return HttpResponse.json(
            {
              title: 'Unauthorized',
              detail: 'Invalid API key',
              requestId: 'req-002',
              origin: 'user-management',
              status: 401,
            },
            {
              status: 401,
              headers: { 'Content-Type': 'application/problem+json' },
            }
          );
        })
      );

      // Act & Assert
      await expect(userManagementModule.getUsers()).rejects.toThrow(AuthenticationError);
    });

    it('should throw RateLimitError on 429 response', async () => {
      // Arrange
      server.use(
        http.get('https://user-management-api.wildberries.ru/api/v1/users', () => {
          return HttpResponse.json(
            { error: 'Too Many Requests' },
            {
              status: 429,
              headers: { 'Retry-After': '30' },
            }
          );
        })
      );

      // Act & Assert
      await expect(userManagementModule.getUsers()).rejects.toThrow(RateLimitError);
    });

    it('should throw NetworkError on 503 response', async () => {
      // Arrange
      server.use(
        http.get('https://user-management-api.wildberries.ru/api/v1/users', () => {
          return new HttpResponse(null, {
            status: 503,
            statusText: 'Service Unavailable',
          });
        })
      );

      // Act & Assert
      await expect(userManagementModule.getUsers()).rejects.toThrow(NetworkError);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // updateUserAccess
  // ─────────────────────────────────────────────────────────────────────────
  describe('updateUserAccess', () => {
    it('should successfully update user access settings', async () => {
      // Arrange
      const request: UpdateUserAccessRequest = {
        usersAccesses: [
          {
            userId: 1001,
            access: [
              { code: 'balance', disabled: false },
              { code: 'finance', disabled: true },
            ],
          },
        ],
      };

      // Act & Assert - void method, just verify it resolves without error
      await expect(userManagementModule.updateUserAccess(request)).resolves.not.toThrow();
    });

    it('should successfully update access for multiple users', async () => {
      // Arrange
      const request: UpdateUserAccessRequest = {
        usersAccesses: [
          {
            userId: 1001,
            access: [{ code: 'balance', disabled: false }],
          },
          {
            userId: 1002,
            access: [
              { code: 'showcase', disabled: true },
              { code: 'supply', disabled: false },
            ],
          },
        ],
      };

      // Act & Assert
      await expect(userManagementModule.updateUserAccess(request)).resolves.not.toThrow();
    });

    it('should send correct request body to the API', async () => {
      // Arrange
      let receivedBody: UpdateUserAccessRequest | null = null;

      server.use(
        http.put(
          'https://user-management-api.wildberries.ru/api/v1/users/access',
          async ({ request }) => {
            receivedBody = (await request.json()) as UpdateUserAccessRequest;
            return new HttpResponse(null, { status: 200 });
          }
        )
      );

      const request: UpdateUserAccessRequest = {
        usersAccesses: [
          {
            userId: 9999,
            access: [{ code: 'brands', disabled: false }],
          },
        ],
      };

      // Act
      await userManagementModule.updateUserAccess(request);

      // Assert
      expect(receivedBody).not.toBeNull();
      expect(receivedBody!.usersAccesses).toHaveLength(1);
      expect(receivedBody!.usersAccesses[0].userId).toBe(9999);
      expect(receivedBody!.usersAccesses[0].access![0].code).toBe('brands');
    });

    it('should throw AuthenticationError on 401 response', async () => {
      // Arrange
      server.use(
        http.put('https://user-management-api.wildberries.ru/api/v1/users/access', () => {
          return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
        })
      );

      // Act & Assert
      await expect(
        userManagementModule.updateUserAccess({
          usersAccesses: [{ userId: 1001, access: [{ code: 'balance', disabled: false }] }],
        })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should throw RateLimitError on 429 response', async () => {
      // Arrange
      server.use(
        http.put('https://user-management-api.wildberries.ru/api/v1/users/access', () => {
          return HttpResponse.json(
            { error: 'Too Many Requests' },
            {
              status: 429,
              headers: { 'Retry-After': '15' },
            }
          );
        })
      );

      // Act & Assert
      await expect(
        userManagementModule.updateUserAccess({
          usersAccesses: [{ userId: 1001, access: [{ code: 'balance', disabled: false }] }],
        })
      ).rejects.toThrow(RateLimitError);
    });

    it('should throw NetworkError on 500 response', async () => {
      // Arrange
      server.use(
        http.put('https://user-management-api.wildberries.ru/api/v1/users/access', () => {
          return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        })
      );

      // Act & Assert
      await expect(
        userManagementModule.updateUserAccess({
          usersAccesses: [{ userId: 1001, access: [{ code: 'balance', disabled: false }] }],
        })
      ).rejects.toThrow(NetworkError);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // deleteUser
  // ─────────────────────────────────────────────────────────────────────────
  describe('deleteUser', () => {
    it('should successfully delete a user by ID', async () => {
      // Act & Assert - void method, just verify it resolves without error
      await expect(userManagementModule.deleteUser(1002)).resolves.not.toThrow();
    });

    it('should pass deletedUserID as query parameter', async () => {
      // Arrange
      let receivedUserID: string | null = null;

      server.use(
        http.delete('https://user-management-api.wildberries.ru/api/v1/user', ({ request }) => {
          const url = new URL(request.url);
          receivedUserID = url.searchParams.get('deletedUserID');
          return new HttpResponse(null, { status: 200 });
        })
      );

      // Act
      await userManagementModule.deleteUser(12345);

      // Assert
      expect(receivedUserID).toBe('12345');
    });

    it('should throw AuthenticationError on 401 response', async () => {
      // Arrange
      server.use(
        http.delete('https://user-management-api.wildberries.ru/api/v1/user', () => {
          return HttpResponse.json(
            {
              title: 'Unauthorized',
              detail: 'Invalid API key',
              requestId: 'req-003',
              origin: 'user-management',
              status: 401,
            },
            {
              status: 401,
              headers: { 'Content-Type': 'application/problem+json' },
            }
          );
        })
      );

      // Act & Assert
      await expect(userManagementModule.deleteUser(1002)).rejects.toThrow(AuthenticationError);
    });

    it('should throw RateLimitError on 429 response', async () => {
      // Arrange
      server.use(
        http.delete('https://user-management-api.wildberries.ru/api/v1/user', () => {
          return HttpResponse.json(
            { error: 'Too Many Requests' },
            {
              status: 429,
              headers: { 'Retry-After': '5' },
            }
          );
        })
      );

      // Act & Assert
      await expect(userManagementModule.deleteUser(1002)).rejects.toThrow(RateLimitError);
    });

    it('should throw NetworkError on 500 response', async () => {
      // Arrange
      server.use(
        http.delete('https://user-management-api.wildberries.ru/api/v1/user', () => {
          return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        })
      );

      // Act & Assert
      await expect(userManagementModule.deleteUser(1002)).rejects.toThrow(NetworkError);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Retry Logic Integration
  // ─────────────────────────────────────────────────────────────────────────
  describe('Retry Logic Integration', () => {
    it('should retry on transient 503 error and eventually succeed for getUsers', async () => {
      // Arrange
      let attempts = 0;

      server.use(
        http.get('https://user-management-api.wildberries.ru/api/v1/users', () => {
          attempts++;

          if (attempts < 3) {
            return new HttpResponse(null, {
              status: 503,
              statusText: 'Service Unavailable',
            });
          }

          return HttpResponse.json({
            total: 1,
            countInResponse: 1,
            users: [
              {
                id: 1001,
                role: 'user',
                position: 'Manager',
                phone: '+79991234567',
                email: 'test@example.com',
                isOwner: true,
                firstName: 'Ivan',
                secondName: 'Petrov',
                patronymic: 'S.',
                goodsReturn: false,
                isInvitee: false,
                inviteeInfo: null,
                access: [],
              },
            ],
          });
        })
      );

      // Act
      const result = await userManagementModule.getUsers();

      // Assert
      expect(attempts).toBeGreaterThanOrEqual(3);
      expect(result.total).toBe(1);
      expect(result.users[0].firstName).toBe('Ivan');
    });

    it('should not retry on 400 Bad Request (permanent error)', async () => {
      // Arrange
      let attempts = 0;

      server.use(
        http.post('https://user-management-api.wildberries.ru/api/v1/invite', () => {
          attempts++;
          return HttpResponse.json({ error: 'Bad Request' }, { status: 400 });
        })
      );

      // Act & Assert
      await expect(
        userManagementModule.createInvite({
          invite: { phoneNumber: '+79991234567' },
        })
      ).rejects.toThrow();
      expect(attempts).toBe(1); // No retry for 4xx errors
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // End-to-End Type Safety
  // ─────────────────────────────────────────────────────────────────────────
  describe('End-to-End Type Safety', () => {
    it('should maintain type safety for createInvite response', async () => {
      // Act
      const result = await userManagementModule.createInvite({
        invite: { phoneNumber: '+79991234567', position: 'Analyst' },
        access: [{ code: 'balance', disabled: false }],
      });

      // Assert - TypeScript ensures correct types
      expect(typeof result.inviteID).toBe('string');
      expect(typeof result.isSuccess).toBe('boolean');
      expect(typeof result.inviteUrl).toBe('string');
      expect(typeof result.expiredAt).toBe('string');
    });

    it('should maintain type safety for getUsers response', async () => {
      // Act
      const result = await userManagementModule.getUsers();

      // Assert
      expect(typeof result.total).toBe('number');
      expect(typeof result.countInResponse).toBe('number');
      expect(Array.isArray(result.users)).toBe(true);

      if (result.users.length > 0) {
        const user = result.users[0];
        expect(typeof user.id).toBe('number');
        expect(typeof user.firstName).toBe('string');
        expect(typeof user.isOwner).toBe('boolean');
        expect(Array.isArray(user.access)).toBe(true);
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Real-World Scenarios
  // ─────────────────────────────────────────────────────────────────────────
  describe('Real-World Scenarios', () => {
    it('should handle complete user invitation and listing workflow', async () => {
      // 1. Create an invitation
      const invite = await userManagementModule.createInvite({
        invite: {
          phoneNumber: '+79990001122',
          position: 'Content Manager',
        },
        access: [
          { code: 'showcase', disabled: false },
          { code: 'discountPrice', disabled: false },
        ],
      });
      expect(invite.isSuccess).toBe(true);
      expect(invite.inviteID).toBeDefined();

      // 2. List all users including invitees
      const allUsers = await userManagementModule.getUsers();
      expect(allUsers.total).toBeGreaterThan(0);

      // 3. List only invited (not yet active) users
      const invitedOnly = await userManagementModule.getUsers({ isInviteOnly: true });
      expect(invitedOnly.users.every((u) => u.isInvitee)).toBe(true);
    });

    it('should handle user access update and deletion workflow', async () => {
      // 1. Get users to find target user
      const users = await userManagementModule.getUsers();
      expect(users.users.length).toBeGreaterThan(0);

      const targetUser = users.users.find((u) => !u.isOwner);

      if (targetUser) {
        // 2. Update the non-owner user's access
        await userManagementModule.updateUserAccess({
          usersAccesses: [
            {
              userId: targetUser.id,
              access: [
                { code: 'balance', disabled: true },
                { code: 'supply', disabled: false },
              ],
            },
          ],
        });

        // 3. Delete the user
        await userManagementModule.deleteUser(targetUser.id);
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Authentication Integration
  // ─────────────────────────────────────────────────────────────────────────
  describe('Authentication Integration', () => {
    it('should include Authorization header in GET requests', async () => {
      // Arrange
      let authHeader: string | null = null;

      server.use(
        http.get('https://user-management-api.wildberries.ru/api/v1/users', ({ request }) => {
          authHeader = request.headers.get('Authorization');

          return HttpResponse.json({
            total: 0,
            countInResponse: 0,
            users: [],
          });
        })
      );

      // Act
      await userManagementModule.getUsers();

      // Assert
      expect(authHeader).toBeDefined();
      expect(authHeader).toContain('test-api-key-123');
    });

    it('should include Authorization header in DELETE requests', async () => {
      // Arrange
      let authHeader: string | null = null;

      server.use(
        http.delete('https://user-management-api.wildberries.ru/api/v1/user', ({ request }) => {
          authHeader = request.headers.get('Authorization');
          return new HttpResponse(null, { status: 200 });
        })
      );

      // Act
      await userManagementModule.deleteUser(12345);

      // Assert
      expect(authHeader).toBeDefined();
      expect(authHeader).toContain('test-api-key-123');
    });
  });
});
