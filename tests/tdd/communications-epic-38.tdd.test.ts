/**
 * TDD RED-PHASE Tests for EPIC 38: Communications Code Quality
 *
 * These tests verify code quality improvements in the CommunicationsModule:
 * correct JSDoc examples and proper rate limit key wiring.
 * They are EXPECTED TO FAIL until the implementation is complete.
 *
 * Acceptance Criteria verified:
 *  1. JSDoc @example blocks use sdk.communications.* not sdk.general.*
 *  2. Rate limit keys wired for all communications methods
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { CommunicationsModule } from '../../src/modules/communications';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 38: Communications Code Quality', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: CommunicationsModule;

  beforeEach(() => {
    mockClient = { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() };
    module = new CommunicationsModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: JSDoc @example blocks use sdk.communications.*', () => {
    it('all @example blocks reference sdk.communications.* not sdk.general.*', () => {
      const moduleSource = readFileSync(
        resolve(__dirname, '../../src/modules/communications/index.ts'),
        'utf-8'
      );

      // Find all @example blocks
      const exampleBlocks = moduleSource.match(/@example[\s\S]*?(?=\*\/|\* @)/g) ?? [];

      expect(exampleBlocks.length).toBeGreaterThan(0);

      for (const block of exampleBlocks) {
        // Should NOT reference sdk.general.* in communications module examples
        expect(block).not.toMatch(/sdk\.general\./);

        // Should reference sdk.communications.*
        expect(block).toMatch(/sdk\.communications\./);
      }
    });

    it('no @example blocks reference incorrect module namespaces', () => {
      const moduleSource = readFileSync(
        resolve(__dirname, '../../src/modules/communications/index.ts'),
        'utf-8'
      );

      // Should not reference any other module namespace in examples
      const wrongNamespaces = [
        'sdk.general.',
        'sdk.products.',
        'sdk.orders.',
        'sdk.tariffs.',
        'sdk.analytics.',
        'sdk.reports.',
        'sdk.finances.',
        'sdk.promotion.',
      ];

      for (const ns of wrongNamespaces) {
        expect(moduleSource).not.toContain(ns);
      }
    });
  });

  describe('AC #2: Rate limit keys wired', () => {
    it('all communications methods pass rateLimitKey to BaseClient', async () => {
      // Get all public methods from the module
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(module)).filter(
        (m) => m !== 'constructor' && typeof (module as any)[m] === 'function'
      );

      expect(methods.length).toBeGreaterThan(0);

      for (const methodName of methods) {
        // Reset all mocks before each method call
        mockClient.get.mockReset().mockResolvedValue({});
        mockClient.post.mockReset().mockResolvedValue({});
        mockClient.put.mockReset().mockResolvedValue({});
        mockClient.patch.mockReset().mockResolvedValue({});
        mockClient.delete.mockReset().mockResolvedValue({});

        try {
          // Call the method with empty/minimal args
          await (module as any)[methodName]({});
        } catch {
          // Some methods may throw due to missing required params -- that's OK
          // We still check if the client was called with rateLimitKey
        }

        // Check that at least one client method was called with rateLimitKey
        const allCalls = [
          ...mockClient.get.mock.calls,
          ...mockClient.post.mock.calls,
          ...mockClient.put.mock.calls,
          ...mockClient.patch.mock.calls,
          ...mockClient.delete.mock.calls,
        ];

        if (allCalls.length > 0) {
          const hasRateLimitKey = allCalls.some((call) =>
            call.some((arg: any) => arg && typeof arg === 'object' && 'rateLimitKey' in arg)
          );

          expect(hasRateLimitKey, `Method ${methodName} missing rateLimitKey`).toBe(true);
        }
      }
    });

    it('rate limit keys follow communications.{methodName} naming convention', async () => {
      mockClient.get.mockResolvedValue({});
      await module.newFeedbacksQuestions();

      const allCalls = [...mockClient.get.mock.calls, ...mockClient.post.mock.calls];

      const rateLimitKeyArg = allCalls
        .flatMap((call) => call)
        .find((arg: any) => arg && typeof arg === 'object' && 'rateLimitKey' in arg);

      expect(rateLimitKeyArg).toBeDefined();
      expect(rateLimitKeyArg.rateLimitKey).toMatch(/^communications\./);
    });
  });
});
