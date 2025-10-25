/**
 * JSDoc Comment Generator
 *
 * Generates JSDoc comments from OpenAPI schema descriptions.
 */

/**
 * Generates JSDoc comment block from description and tags
 *
 * Creates properly formatted JSDoc comments for TypeScript interfaces and types.
 *
 * @param description - Description text from OpenAPI schema
 * @param additionalTags - Additional JSDoc tags (e.g., @see, @example)
 * @returns Formatted JSDoc comment string
 *
 * @example
 * ```typescript
 * generateJSDoc('User account information')
 * // Returns:
 * // /**
 * //  * User account information
 * //  *\/
 *
 * generateJSDoc('Product details', ['@see https://api.example.com'])
 * // Returns:
 * // /**
 * //  * Product details
 * //  *
 * //  * @see https://api.example.com
 * //  *\/
 * ```
 */
export function generateJSDoc(description?: string, additionalTags: string[] = []): string {
  if (!description && additionalTags.length === 0) {
    return '';
  }

  const lines: string[] = ['/**'];

  // Add description
  if (description) {
    const cleanedDescription = cleanDescription(description);
    const descriptionLines = cleanedDescription.split('\n');
    descriptionLines.forEach((line) => {
      lines.push(` * ${line}`);
    });
  }

  // Add separator before tags if description exists
  if (description && additionalTags.length > 0) {
    lines.push(' *');
  }

  // Add additional tags
  additionalTags.forEach((tag) => {
    lines.push(` * ${tag}`);
  });

  lines.push(' */');

  return lines.join('\n');
}

/**
 * Cleans OpenAPI description text for JSDoc
 *
 * Removes HTML tags, irregular whitespace, and excess whitespace from OpenAPI descriptions,
 * which often contain HTML or markdown formatting.
 *
 * @param description - Raw description from OpenAPI
 * @returns Cleaned description text
 *
 * @example
 * ```typescript
 * cleanDescription('<div>Product ID</div>')
 * // Returns: 'Product ID'
 *
 * cleanDescription('Line 1\n\n\nLine 2')
 * // Returns: 'Line 1\n\nLine 2'
 * ```
 */
export function cleanDescription(description: string): string {
  return (
    description
      // Remove HTML tags
      .replace(/<[^>]+>/g, '')
      // Remove non-breaking spaces with regular spaces
      .replace(/\u00A0/g, ' ')
      // Remove zero-width spaces
      .replace(/\u200B/g, '')
      // Remove other Unicode whitespace with regular spaces
      .replace(/[\u2000-\u200F\u202F\u205F\u3000]/g, ' ')
      // Remove excessive newlines (more than 2)
      .replace(/\n{3,}/g, '\n\n')
      // Replace multiple spaces with single space
      .replace(/  +/g, ' ')
      // Trim leading/trailing whitespace
      .trim()
  );
}

/**
 * Generates @see tag from external documentation URL
 *
 * @param url - Documentation URL
 * @param label - Optional label for the link
 * @returns Formatted @see tag
 *
 * @example
 * ```typescript
 * generateSeeTag('https://dev.wildberries.ru/api/products')
 * // Returns: '@see {@link https://dev.wildberries.ru/api/products}'
 *
 * generateSeeTag('https://example.com', 'API Docs')
 * // Returns: '@see {@link https://example.com} - API Docs'
 * ```
 */
export function generateSeeTag(url: string, label?: string): string {
  if (label) {
    return `@see {@link ${url}} - ${label}`;
  }
  return `@see {@link ${url}}`;
}

/**
 * Generates @example tag from schema example value
 *
 * @param exampleValue - Example value from OpenAPI schema
 * @returns Formatted @example tag with code block
 *
 * @example
 * ```typescript
 * generateExampleTag({ id: 1, name: 'Test' })
 * // Returns:
 * // @example
 * // ```json
 * // {"id":1,"name":"Test"}
 * // ```
 * ```
 */
export function generateExampleTag(exampleValue: unknown): string {
  const jsonExample = JSON.stringify(exampleValue, null, 2);
  return `@example\n\`\`\`json\n${jsonExample}\n\`\`\``;
}
