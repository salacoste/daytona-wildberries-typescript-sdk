/**
 * TDD RED-PHASE Tests for EPIC 14: General -- New User Management Endpoints
 *
 * These tests define the expected behavior for NEW methods that do not yet exist
 * on GeneralModule. They are EXPECTED TO FAIL until the implementation is complete.
 *
 * Acceptance Criteria verified:
 *  1. New getUsersList method calling GET on user-management-api.wildberries.ru
 *  2. New createUser method calling POST on user-management-api.wildberries.ru
 *  3. New updateUser method calling PATCH on user-management-api.wildberries.ru
 *  4. New deleteUser method calling DELETE on user-management-api.wildberries.ru
 *  5. 7 new TypeScript interfaces generated from swagger schemas
 *  6. New base URL user-management-api.wildberries.ru configured
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeneralModule } from '../../src/modules/general';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 14: General -- New User Management Endpoints', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: GeneralModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    module = new GeneralModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: getUsersList method calls GET on user-management-api.wildberries.ru', () => {
    it('should have a getUsersList method', () => {
      expect(typeof module.getUsersList).toBe('function');
    });

    it('should call BaseClient.get with user-management-api domain', async () => {
      mockClient.get.mockResolvedValue({ data: [] });

      await module.getUsersList();

      expect(mockClient.get).toHaveBeenCalledTimes(1);
      const calledUrl = mockClient.get.mock.calls[0][0] as string;
      expect(calledUrl).toContain('user-management-api.wildberries.ru');
    });

    it('should use GET HTTP method (not POST/PUT/PATCH/DELETE)', async () => {
      mockClient.get.mockResolvedValue({ data: [] });

      await module.getUsersList();

      expect(mockClient.get).toHaveBeenCalled();
      expect(mockClient.post).not.toHaveBeenCalled();
      expect(mockClient.put).not.toHaveBeenCalled();
      expect(mockClient.patch).not.toHaveBeenCalled();
      expect(mockClient.delete).not.toHaveBeenCalled();
    });

    it('should return a response containing a data array', async () => {
      const mockResponse = {
        data: [
          { id: 'user-1', name: 'Test User', role: 'admin' },
          { id: 'user-2', name: 'Another User', role: 'viewer' },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.getUsersList();

      expect(result).toEqual(mockResponse);
      expect(result.data).toHaveLength(2);
    });
  });

  describe('AC #2: createUser method calls POST on user-management-api.wildberries.ru', () => {
    it('should have a createUser method', () => {
      expect(typeof module.createUser).toBe('function');
    });

    it('should call BaseClient.post with user-management-api domain', async () => {
      const userData = { name: 'New User', role: 'editor' };
      mockClient.post.mockResolvedValue({ id: 'user-3' });

      await module.createUser(userData);

      expect(mockClient.post).toHaveBeenCalledTimes(1);
      const calledUrl = mockClient.post.mock.calls[0][0] as string;
      expect(calledUrl).toContain('user-management-api.wildberries.ru');
    });

    it('should use POST HTTP method (not GET/PUT/PATCH/DELETE)', async () => {
      const userData = { name: 'New User', role: 'editor' };
      mockClient.post.mockResolvedValue({ id: 'user-3' });

      await module.createUser(userData);

      expect(mockClient.post).toHaveBeenCalled();
      expect(mockClient.get).not.toHaveBeenCalled();
      expect(mockClient.put).not.toHaveBeenCalled();
      expect(mockClient.patch).not.toHaveBeenCalled();
      expect(mockClient.delete).not.toHaveBeenCalled();
    });

    it('should pass user data as request body', async () => {
      const userData = { name: 'New User', role: 'editor' };
      mockClient.post.mockResolvedValue({ id: 'user-3' });

      await module.createUser(userData);

      const calledData = mockClient.post.mock.calls[0][1];
      expect(calledData).toEqual(userData);
    });
  });

  describe('AC #3: updateUser method calls PATCH on user-management-api.wildberries.ru', () => {
    it('should have an updateUser method', () => {
      expect(typeof module.updateUser).toBe('function');
    });

    it('should call BaseClient.patch with user-management-api domain', async () => {
      const updateData = { name: 'Updated Name' };
      mockClient.patch.mockResolvedValue({ success: true });

      await module.updateUser('user-1', updateData);

      expect(mockClient.patch).toHaveBeenCalledTimes(1);
      const calledUrl = mockClient.patch.mock.calls[0][0] as string;
      expect(calledUrl).toContain('user-management-api.wildberries.ru');
    });

    it('should use PATCH HTTP method (not GET/POST/PUT/DELETE)', async () => {
      const updateData = { name: 'Updated Name' };
      mockClient.patch.mockResolvedValue({ success: true });

      await module.updateUser('user-1', updateData);

      expect(mockClient.patch).toHaveBeenCalled();
      expect(mockClient.get).not.toHaveBeenCalled();
      expect(mockClient.post).not.toHaveBeenCalled();
      expect(mockClient.put).not.toHaveBeenCalled();
      expect(mockClient.delete).not.toHaveBeenCalled();
    });

    it('should pass update data as request body', async () => {
      const updateData = { name: 'Updated Name', role: 'admin' };
      mockClient.patch.mockResolvedValue({ success: true });

      await module.updateUser('user-1', updateData);

      const calledData = mockClient.patch.mock.calls[0][1];
      expect(calledData).toEqual(updateData);
    });
  });

  describe('AC #4: deleteUser method calls DELETE on user-management-api.wildberries.ru', () => {
    it('should have a deleteUser method', () => {
      expect(typeof module.deleteUser).toBe('function');
    });

    it('should call BaseClient.delete with user-management-api domain', async () => {
      mockClient.delete.mockResolvedValue({ success: true });

      await module.deleteUser('user-1');

      expect(mockClient.delete).toHaveBeenCalledTimes(1);
      const calledUrl = mockClient.delete.mock.calls[0][0] as string;
      expect(calledUrl).toContain('user-management-api.wildberries.ru');
    });

    it('should use DELETE HTTP method (not GET/POST/PUT/PATCH)', async () => {
      mockClient.delete.mockResolvedValue({ success: true });

      await module.deleteUser('user-1');

      expect(mockClient.delete).toHaveBeenCalled();
      expect(mockClient.get).not.toHaveBeenCalled();
      expect(mockClient.post).not.toHaveBeenCalled();
      expect(mockClient.put).not.toHaveBeenCalled();
      expect(mockClient.patch).not.toHaveBeenCalled();
    });

    it('should include user identifier in the request URL', async () => {
      mockClient.delete.mockResolvedValue({ success: true });

      await module.deleteUser('user-42');

      const calledUrl = mockClient.delete.mock.calls[0][0] as string;
      expect(calledUrl).toContain('user-42');
    });
  });

  describe('AC #5: 7 new TypeScript interfaces generated from swagger schemas', () => {
    it('should export User interface from general types', async () => {
      // Dynamically import to check type exports exist
      const types = await import('../../src/types/general.types');
      expect(types).toHaveProperty('User');
    });

    it('should export UserListResponse interface from general types', async () => {
      const types = await import('../../src/types/general.types');
      expect(types).toHaveProperty('UserListResponse');
    });

    it('should export CreateUserRequest interface from general types', async () => {
      const types = await import('../../src/types/general.types');
      expect(types).toHaveProperty('CreateUserRequest');
    });

    it('should export CreateUserResponse interface from general types', async () => {
      const types = await import('../../src/types/general.types');
      expect(types).toHaveProperty('CreateUserResponse');
    });

    it('should export UpdateUserRequest interface from general types', async () => {
      const types = await import('../../src/types/general.types');
      expect(types).toHaveProperty('UpdateUserRequest');
    });

    it('should export UpdateUserResponse interface from general types', async () => {
      const types = await import('../../src/types/general.types');
      expect(types).toHaveProperty('UpdateUserResponse');
    });

    it('should export DeleteUserResponse interface from general types', async () => {
      const types = await import('../../src/types/general.types');
      expect(types).toHaveProperty('DeleteUserResponse');
    });
  });

  describe('AC #6: New base URL user-management-api.wildberries.ru configured', () => {
    it('should use user-management-api.wildberries.ru for getUsersList', async () => {
      mockClient.get.mockResolvedValue({ data: [] });

      await module.getUsersList();

      const calledUrl = mockClient.get.mock.calls[0][0] as string;
      expect(calledUrl).toMatch(/^https:\/\/user-management-api\.wildberries\.ru\//);
    });

    it('should use user-management-api.wildberries.ru for createUser', async () => {
      mockClient.post.mockResolvedValue({});

      await module.createUser({ name: 'Test', role: 'viewer' });

      const calledUrl = mockClient.post.mock.calls[0][0] as string;
      expect(calledUrl).toMatch(/^https:\/\/user-management-api\.wildberries\.ru\//);
    });

    it('should use user-management-api.wildberries.ru for updateUser', async () => {
      mockClient.patch.mockResolvedValue({});

      await module.updateUser('user-1', { name: 'Updated' });

      const calledUrl = mockClient.patch.mock.calls[0][0] as string;
      expect(calledUrl).toMatch(/^https:\/\/user-management-api\.wildberries\.ru\//);
    });

    it('should use user-management-api.wildberries.ru for deleteUser', async () => {
      mockClient.delete.mockResolvedValue({});

      await module.deleteUser('user-1');

      const calledUrl = mockClient.delete.mock.calls[0][0] as string;
      expect(calledUrl).toMatch(/^https:\/\/user-management-api\.wildberries\.ru\//);
    });
  });
});
