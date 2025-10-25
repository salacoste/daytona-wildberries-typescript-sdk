/**
 * Method JSDoc Generator
 *
 * Generates comprehensive JSDoc comments for module methods.
 * Includes summary, description, parameters, returns, throws, see links, and examples.
 *
 * @module method-jsdoc-generator
 */

import type { ParsedOperation } from './path-parser.js';
import type { MethodParameter } from './parameter-extractor.js';

/**
 * Sanitizes description text by removing irregular whitespace
 *
 * Replaces non-breaking spaces, zero-width spaces, and other irregular
 * whitespace characters with regular spaces or empty strings.
 *
 * @param text - Text to sanitize
 * @returns Sanitized text
 */
function sanitizeWhitespace(text: string): string {
  return text
    // Replace non-breaking spaces with regular spaces
    .replace(/\u00A0/g, ' ')
    // Replace zero-width spaces
    .replace(/\u200B/g, '')
    // Replace other Unicode whitespace with regular spaces
    .replace(/[\u2000-\u200F\u202F\u205F\u3000]/g, ' ')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    // Trim leading/trailing whitespace
    .trim();
}

/**
 * Generates complete JSDoc comment for a module method
 *
 * **JSDoc Structure:**
 * 1. Summary (from operation.summary)
 * 2. Description (from operation.description, if present)
 * 3. @param tags for each parameter
 * 4. @returns tag with return type description
 * 5. @throws tags for standard SDK errors
 * 6. @see tag with external docs link (if present)
 * 7. @example tag with usage example
 *
 * @param operation - Parsed OpenAPI operation
 * @param parameters - Method parameters
 * @param methodName - Generated method name
 * @param returnType - TypeScript return type
 * @returns JSDoc comment block
 *
 * @example
 * ```typescript
 * generateMethodJSDoc(
 *   { summary: 'Проверка подключения', ... },
 *   [],
 *   'ping',
 *   'Promise<PingResponse>'
 * )
 * // Returns:
 * // /**
 * //  * Проверка подключения
 * //  * @returns Health check response
 * //  * @throws {AuthenticationError} When API key is invalid
 * //  * ...
 * //  *\/
 * ```
 */
export function generateMethodJSDoc(
  operation: ParsedOperation,
  parameters: MethodParameter[],
  methodName: string,
  returnType: string
): string {
  const lines: string[] = [];

  // Add summary (required)
  if (operation.summary) {
    lines.push(sanitizeWhitespace(operation.summary));
  } else {
    lines.push(`${methodName} operation`);
  }

  // Add description (optional, with blank line separator)
  if (operation.description) {
    lines.push('');
    lines.push(sanitizeWhitespace(operation.description));
  }

  // Add blank line before tags
  lines.push('');

  // Add @param tags for each parameter
  for (const param of parameters) {
    const paramDoc = generateParamTag(param);
    lines.push(paramDoc);
  }

  // Add @returns tag
  const returnsDoc = generateReturnsTag(returnType, operation);
  lines.push(returnsDoc);

  // Add @throws tags for standard SDK errors
  const throwsTags = generateThrowsTags();
  lines.push(...throwsTags);

  // Add @see tag for external docs (if present)
  if (operation.externalDocs?.url) {
    const seeTag = `@see {@link ${operation.externalDocs.url}} - Official API documentation`;
    lines.push(seeTag);
  }

  // Add @example tag with usage example
  const exampleTag = generateExampleTag(methodName, parameters, returnType);
  lines.push(exampleTag);

  // Format as JSDoc block
  return formatAsJSDoc(lines);
}

/**
 * Generates @param tag for a method parameter
 *
 * @param param - Method parameter
 * @returns @param JSDoc tag
 *
 * @example
 * ```typescript
 * generateParamTag({ name: 'id', type: 'string', required: true, description: 'Order ID', location: 'path' })
 * // Returns: '@param id - Order ID'
 *
 * generateParamTag({ name: 'options', type: '{ from?: string }', required: false, description: 'Query params', location: 'query' })
 * // Returns: '@param [options] - Query params'
 * ```
 */
export function generateParamTag(param: MethodParameter): string {
  const paramName = param.required ? param.name : `[${param.name}]`;
  const description = param.description ? sanitizeWhitespace(param.description) : 'Parameter';

  return `@param ${paramName} - ${description}`;
}

/**
 * Generates @returns tag for method return type
 *
 * @param _returnType - TypeScript return type (unused, kept for API consistency)
 * @param operation - Parsed operation (for response description)
 * @returns @returns JSDoc tag
 *
 * @example
 * ```typescript
 * generateReturnsTag('Promise<PingResponse>', { ... })
 * // Returns: '@returns Health check response'
 * ```
 */
export function generateReturnsTag(_returnType: string, operation: ParsedOperation): string {
  // Extract response description from 200/201 response
  let successResponse = undefined;
  if ('200' in operation.responses) {
    successResponse = operation.responses['200'];
  } else if ('201' in operation.responses) {
    successResponse = operation.responses['201'];
  } else if ('202' in operation.responses) {
    successResponse = operation.responses['202'];
  }

  const rawDescription = successResponse?.description ?? 'Response data';
  const description = sanitizeWhitespace(rawDescription);

  return `@returns ${description}`;
}

/**
 * Generates standard @throws tags for SDK errors
 *
 * All SDK methods can throw these standard errors:
 * - AuthenticationError (401/403)
 * - RateLimitError (429)
 * - ValidationError (400/422)
 * - NetworkError (timeouts, 5xx)
 *
 * @returns Array of @throws JSDoc tags
 */
export function generateThrowsTags(): string[] {
  return [
    '@throws {AuthenticationError} When API key is invalid (401/403)',
    '@throws {RateLimitError} When rate limit exceeded (429)',
    '@throws {ValidationError} When request data is invalid (400/422)',
    '@throws {NetworkError} When network request fails or times out',
  ];
}

/**
 * Generates @example tag with realistic usage example
 *
 * Creates a practical code example showing how to call the method.
 *
 * @param methodName - Method name
 * @param parameters - Method parameters
 * @param returnType - Return type
 * @returns @example JSDoc tag with code block
 *
 * @example
 * ```typescript
 * generateExampleTag('ping', [], 'Promise<PingResponse>')
 * // Returns:
 * // @example
 * // const result = await sdk.general.ping();
 * // console.log(result.Status); // 'OK'
 * ```
 */
export function generateExampleTag(
  methodName: string,
  parameters: MethodParameter[],
  returnType: string
): string {
  const lines: string[] = ['@example'];

  // Generate method call with parameters
  const paramExamples = parameters.map((param) => {
    if (param.location === 'query') {
      // Options object example (avoid nested comments!)
      return '{}';
    }
    if (param.location === 'body') {
      // Data object example
      return '{}';
    }
    // Path parameter example
    return `'${param.name}-value'`;
  });

  const paramString = paramExamples.length > 0 ? paramExamples.join(', ') : '';
  const methodCall = `const result = await sdk.general.${methodName}(${paramString});`;

  lines.push(methodCall);

  // Add example response access (if not void)
  if (!returnType.includes('void')) {
    lines.push('console.log(result);');
  }

  return lines.join('\n');
}

/**
 * Formats lines as JSDoc comment block
 *
 * Adds /** and *\/ delimiters and * prefix to each line.
 *
 * @param lines - JSDoc content lines
 * @returns Formatted JSDoc block
 *
 * @example
 * ```typescript
 * formatAsJSDoc(['Summary', '@param id - ID', '@returns Data'])
 * // Returns:
 * // /**
 * //  * Summary
 * //  * @param id - ID
 * //  * @returns Data
 * //  *\/
 * ```
 */
export function formatAsJSDoc(lines: string[]): string {
  const formattedLines = lines.map((line) => {
    if (line === '') {
      return ' *';
    }
    return ` * ${line}`;
  });

  return ['/**', ...formattedLines, ' */'].join('\n');
}

/**
 * Generates minimal JSDoc for methods without full OpenAPI metadata
 *
 * Fallback for methods where OpenAPI spec is incomplete.
 *
 * @param methodName - Method name
 * @param returnType - Return type
 * @returns Basic JSDoc comment
 */
export function generateMinimalJSDoc(methodName: string, returnType: string): string {
  const lines = [
    `${methodName} operation`,
    '',
    `@returns ${returnType.replace('Promise<', '').replace('>', '')}`,
    '@throws {AuthenticationError} When API key is invalid',
    '@throws {NetworkError} When network request fails',
  ];

  return formatAsJSDoc(lines);
}
