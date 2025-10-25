/**
 * Unit Tests for Method JSDoc Generator
 *
 * Tests JSDoc generation for module methods including:
 * - Complete JSDoc structure (summary, description, params, returns, throws, see, example)
 * - Parameter tag generation
 * - Returns tag generation
 * - Throws tags (standard SDK errors)
 * - Example code generation
 * - JSDoc formatting
 */

import { describe, it, expect } from 'vitest';
import {
  generateMethodJSDoc,
  generateParamTag,
  generateReturnsTag,
  generateThrowsTags,
  generateExampleTag,
  formatAsJSDoc,
  generateMinimalJSDoc,
} from '../../../tools/generators/method-jsdoc-generator.js';
import type { ParsedOperation } from '../../../tools/generators/path-parser.js';
import type { MethodParameter } from '../../../tools/generators/parameter-extractor.js';

describe('method-jsdoc-generator', () => {
  describe('generateMethodJSDoc', () => {
    it('should generate complete JSDoc with all components', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        summary: 'Health check',
        description: 'Check API connectivity',
        externalDocs: {
          url: 'https://docs.example.com/ping',
        },
        responses: {
          '200': {
            description: 'API is healthy',
          },
        },
      };

      const parameters: MethodParameter[] = [];
      const jsdoc = generateMethodJSDoc(operation, parameters, 'ping', 'Promise<PingResponse>');

      expect(jsdoc).toContain('/**');
      expect(jsdoc).toContain('*/');
      expect(jsdoc).toContain('Health check');
      expect(jsdoc).toContain('Check API connectivity');
      expect(jsdoc).toContain('@returns API is healthy');
      expect(jsdoc).toContain('@throws {AuthenticationError}');
      expect(jsdoc).toContain('@throws {RateLimitError}');
      expect(jsdoc).toContain('@throws {ValidationError}');
      expect(jsdoc).toContain('@throws {NetworkError}');
      expect(jsdoc).toContain('@see');
      expect(jsdoc).toContain('https://docs.example.com/ping');
      expect(jsdoc).toContain('@example');
    });

    it('should generate JSDoc without description when not present', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        summary: 'Health check',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      };

      const jsdoc = generateMethodJSDoc(operation, [], 'ping', 'Promise<PingResponse>');

      expect(jsdoc).toContain('Health check');
      expect(jsdoc).not.toContain('Check API connectivity');
    });

    it('should generate JSDoc without external docs when not present', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        summary: 'Health check',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      };

      const jsdoc = generateMethodJSDoc(operation, [], 'ping', 'Promise<PingResponse>');

      expect(jsdoc).not.toContain('@see');
    });

    it('should use method name as summary when summary is missing', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'get',
        responses: {
          '200': {
            description: 'Success',
          },
        },
      };

      const jsdoc = generateMethodJSDoc(operation, [], 'getData', 'Promise<DataResponse>');

      expect(jsdoc).toContain('getData operation');
    });

    it('should include @param tags for parameters', () => {
      const operation: ParsedOperation = {
        path: '/users/{id}',
        method: 'get',
        summary: 'Get user',
        responses: {
          '200': {
            description: 'User data',
          },
        },
      };

      const parameters: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'User ID',
          location: 'path',
        },
      ];

      const jsdoc = generateMethodJSDoc(operation, parameters, 'getUser', 'Promise<UserResponse>');

      expect(jsdoc).toContain('@param id - User ID');
    });

    it('should sanitize whitespace in summary and description', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'get',
        summary: 'Get  data   with   spaces',
        description: 'Description  with   irregular   whitespace',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      };

      const jsdoc = generateMethodJSDoc(operation, [], 'getData', 'Promise<DataResponse>');

      expect(jsdoc).toContain('Get data with spaces');
      expect(jsdoc).toContain('Description with irregular whitespace');
    });

    it('should include example with method call', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        summary: 'Health check',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      };

      const jsdoc = generateMethodJSDoc(operation, [], 'ping', 'Promise<PingResponse>');

      expect(jsdoc).toContain('@example');
      expect(jsdoc).toContain('await sdk.general.ping()');
      expect(jsdoc).toContain('console.log(result)');
    });

    it('should not include console.log for void responses', () => {
      const operation: ParsedOperation = {
        path: '/items/{id}',
        method: 'delete',
        summary: 'Delete item',
        responses: {
          '204': {
            description: 'Deleted',
          },
        },
      };

      const jsdoc = generateMethodJSDoc(operation, [], 'deleteItem', 'Promise<void>');

      expect(jsdoc).toContain('@example');
      expect(jsdoc).not.toContain('console.log(result)');
    });
  });

  describe('generateParamTag', () => {
    it('should generate tag for required parameter', () => {
      const param: MethodParameter = {
        name: 'id',
        type: 'string',
        required: true,
        description: 'User identifier',
        location: 'path',
      };

      const tag = generateParamTag(param);

      expect(tag).toBe('@param id - User identifier');
    });

    it('should generate tag for optional parameter with brackets', () => {
      const param: MethodParameter = {
        name: 'options',
        type: '{ from?: string }',
        required: false,
        description: 'Query parameters',
        location: 'query',
      };

      const tag = generateParamTag(param);

      expect(tag).toBe('@param [options] - Query parameters');
    });

    it('should use default description when missing', () => {
      const param: MethodParameter = {
        name: 'data',
        type: 'CreateRequest',
        required: true,
        location: 'body',
      };

      const tag = generateParamTag(param);

      expect(tag).toBe('@param data - Parameter');
    });

    it('should sanitize whitespace in description', () => {
      const param: MethodParameter = {
        name: 'id',
        type: 'string',
        required: true,
        description: 'User  identifier   with   spaces',
        location: 'path',
      };

      const tag = generateParamTag(param);

      expect(tag).toBe('@param id - User identifier with spaces');
    });
  });

  describe('generateReturnsTag', () => {
    it('should extract description from 200 response', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'get',
        responses: {
          '200': {
            description: 'List of users',
          },
        },
      };

      const tag = generateReturnsTag('Promise<UserResponse[]>', operation);

      expect(tag).toBe('@returns List of users');
    });

    it('should extract description from 201 response when 200 is not present', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'post',
        responses: {
          '201': {
            description: 'User created successfully',
          },
        },
      };

      const tag = generateReturnsTag('Promise<UserResponse>', operation);

      expect(tag).toBe('@returns User created successfully');
    });

    it('should extract description from 202 response when 200/201 are not present', () => {
      const operation: ParsedOperation = {
        path: '/jobs',
        method: 'post',
        responses: {
          '202': {
            description: 'Job accepted for processing',
          },
        },
      };

      const tag = generateReturnsTag('Promise<JobResponse>', operation);

      expect(tag).toBe('@returns Job accepted for processing');
    });

    it('should use default description when response description is missing', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'get',
        responses: {
          '200': {},
        },
      };

      const tag = generateReturnsTag('Promise<DataResponse>', operation);

      expect(tag).toBe('@returns Response data');
    });

    it('should use default description when no success response exists', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'get',
        responses: {
          '400': {
            description: 'Bad Request',
          },
        },
      };

      const tag = generateReturnsTag('Promise<unknown>', operation);

      expect(tag).toBe('@returns Response data');
    });

    it('should sanitize whitespace in response description', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'get',
        responses: {
          '200': {
            description: 'Response  with   irregular   whitespace',
          },
        },
      };

      const tag = generateReturnsTag('Promise<DataResponse>', operation);

      expect(tag).toBe('@returns Response with irregular whitespace');
    });
  });

  describe('generateThrowsTags', () => {
    it('should return all 4 standard error tags', () => {
      const tags = generateThrowsTags();

      expect(tags).toHaveLength(4);
    });

    it('should include AuthenticationError tag', () => {
      const tags = generateThrowsTags();

      expect(tags).toContain('@throws {AuthenticationError} When API key is invalid (401/403)');
    });

    it('should include RateLimitError tag', () => {
      const tags = generateThrowsTags();

      expect(tags).toContain('@throws {RateLimitError} When rate limit exceeded (429)');
    });

    it('should include ValidationError tag', () => {
      const tags = generateThrowsTags();

      expect(tags).toContain(
        '@throws {ValidationError} When request data is invalid (400/422)'
      );
    });

    it('should include NetworkError tag', () => {
      const tags = generateThrowsTags();

      expect(tags).toContain('@throws {NetworkError} When network request fails or times out');
    });
  });

  describe('generateExampleTag', () => {
    it('should generate example for method with no parameters', () => {
      const example = generateExampleTag('ping', [], 'Promise<PingResponse>');

      expect(example).toContain('@example');
      expect(example).toContain('await sdk.general.ping()');
      expect(example).toContain('console.log(result)');
    });

    it('should generate example for method with path parameter', () => {
      const parameters: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          location: 'path',
        },
      ];

      const example = generateExampleTag('getOrder', parameters, 'Promise<OrderResponse>');

      expect(example).toContain('@example');
      expect(example).toContain("await sdk.general.getOrder('id-value')");
    });

    it('should generate example for method with query parameters', () => {
      const parameters: MethodParameter[] = [
        {
          name: 'options',
          type: '{ from?: string }',
          required: false,
          location: 'query',
        },
      ];

      const example = generateExampleTag('getNews', parameters, 'Promise<NewsResponse>');

      expect(example).toContain('@example');
      expect(example).toContain('await sdk.general.getNews({})');
    });

    it('should generate example for method with body parameter', () => {
      const parameters: MethodParameter[] = [
        {
          name: 'data',
          type: 'CreateUserRequest',
          required: true,
          location: 'body',
        },
      ];

      const example = generateExampleTag('createUser', parameters, 'Promise<UserResponse>');

      expect(example).toContain('@example');
      expect(example).toContain('await sdk.general.createUser({})');
    });

    it('should generate example for method with path and query parameters', () => {
      const parameters: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          location: 'path',
        },
        {
          name: 'options',
          type: '{ expand?: string }',
          required: false,
          location: 'query',
        },
      ];

      const example = generateExampleTag('getUser', parameters, 'Promise<UserResponse>');

      expect(example).toContain('@example');
      expect(example).toContain("await sdk.general.getUser('id-value', {})");
    });

    it('should generate example for method with all parameter types', () => {
      const parameters: MethodParameter[] = [
        {
          name: 'userId',
          type: 'number',
          required: true,
          location: 'path',
        },
        {
          name: 'data',
          type: 'UpdateUserRequest',
          required: true,
          location: 'body',
        },
        {
          name: 'options',
          type: '{ validate?: boolean }',
          required: false,
          location: 'query',
        },
      ];

      const example = generateExampleTag('updateUser', parameters, 'Promise<UserResponse>');

      expect(example).toContain('@example');
      expect(example).toContain("await sdk.general.updateUser('userId-value', {}, {})");
    });

    it('should not include console.log for void return type', () => {
      const example = generateExampleTag('deleteUser', [], 'Promise<void>');

      expect(example).toContain('@example');
      expect(example).toContain('await sdk.general.deleteUser()');
      expect(example).not.toContain('console.log(result)');
    });
  });

  describe('formatAsJSDoc', () => {
    it('should format single line as JSDoc block', () => {
      const lines = ['Summary'];

      const jsdoc = formatAsJSDoc(lines);

      expect(jsdoc).toBe('/**\n * Summary\n */');
    });

    it('should format multiple lines as JSDoc block', () => {
      const lines = ['Summary', '@param id - ID', '@returns Data'];

      const jsdoc = formatAsJSDoc(lines);

      expect(jsdoc).toBe('/**\n * Summary\n * @param id - ID\n * @returns Data\n */');
    });

    it('should format empty lines as * without text', () => {
      const lines = ['Summary', '', '@returns Data'];

      const jsdoc = formatAsJSDoc(lines);

      expect(jsdoc).toBe('/**\n * Summary\n *\n * @returns Data\n */');
    });

    it('should include opening /** and closing */', () => {
      const lines = ['Content'];

      const jsdoc = formatAsJSDoc(lines);

      expect(jsdoc).toMatch(/^\/\*\*/);
      expect(jsdoc).toMatch(/\*\/$/);
    });

    it('should prefix each content line with *', () => {
      const lines = ['Line 1', 'Line 2', 'Line 3'];

      const jsdoc = formatAsJSDoc(lines);

      expect(jsdoc).toContain(' * Line 1');
      expect(jsdoc).toContain(' * Line 2');
      expect(jsdoc).toContain(' * Line 3');
    });
  });

  describe('generateMinimalJSDoc', () => {
    it('should generate minimal JSDoc with method name as summary', () => {
      const jsdoc = generateMinimalJSDoc('getData', 'Promise<DataResponse>');

      expect(jsdoc).toContain('getData operation');
    });

    it('should include @returns tag with unwrapped type', () => {
      const jsdoc = generateMinimalJSDoc('getData', 'Promise<DataResponse>');

      expect(jsdoc).toContain('@returns DataResponse');
      expect(jsdoc).not.toContain('Promise<DataResponse>');
    });

    it('should include AuthenticationError throw', () => {
      const jsdoc = generateMinimalJSDoc('getData', 'Promise<DataResponse>');

      expect(jsdoc).toContain('@throws {AuthenticationError}');
    });

    it('should include NetworkError throw', () => {
      const jsdoc = generateMinimalJSDoc('getData', 'Promise<DataResponse>');

      expect(jsdoc).toContain('@throws {NetworkError}');
    });

    it('should be formatted as proper JSDoc block', () => {
      const jsdoc = generateMinimalJSDoc('getData', 'Promise<DataResponse>');

      expect(jsdoc).toMatch(/^\/\*\*/);
      expect(jsdoc).toMatch(/\*\/$/);
    });

    it('should handle void return type', () => {
      const jsdoc = generateMinimalJSDoc('deleteData', 'Promise<void>');

      expect(jsdoc).toContain('@returns void');
    });

    it('should handle unknown return type', () => {
      const jsdoc = generateMinimalJSDoc('getData', 'Promise<unknown>');

      expect(jsdoc).toContain('@returns unknown');
    });
  });
});
