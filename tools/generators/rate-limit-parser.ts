/**
 * Rate Limit Parser for Wildberries OpenAPI Specifications
 *
 * This module extracts rate limit information from Russian-language table descriptions
 * embedded in Wildberries OpenAPI specification files. The Wildberries API uses a
 * non-standard approach where rate limits are documented as markdown tables within
 * operation description fields rather than using OpenAPI extensions.
 *
 * **Parsing Strategy:**
 * 1. Search for rate limit table markers in operation descriptions ("Лимит запросов")
 * 2. Extract markdown table with format: "| Период | Лимит | Интервал | Всплеск |"
 * 3. Parse table rows using regex to extract numerical values and Russian time units
 * 4. Convert Russian time units to seconds (миллисекунд → ms, секунд → s, минут → min)
 * 5. Calculate requestsPerMinute from period and limit values
 * 6. Generate RateLimitConfig compatible with Story 1.4 RateLimiter
 * 7. Fallback to conservative defaults when parsing fails
 *
 * **Example Russian Table Format:**
 * ```
 * | Период | Лимит | Интервал | Всплеск |
 * | --- | --- | --- | --- |
 * | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |
 * ```
 *
 * **Parsed Result:**
 * ```typescript
 * {
 *   requestsPerMinute: 100,
 *   intervalSeconds: 0.6,
 *   burstLimit: 5
 * }
 * ```
 *
 * @module tools/generators/rate-limit-parser
 * @see {@link https://dev.wildberries.ru/ Wildberries API Documentation}
 *
 * Context7 References:
 * - TypeScript interface patterns: /microsoft/typescript
 * - Regex pattern matching: Standard TypeScript RegExp
 * - String manipulation: Template literals and string methods
 */

// Import RateLimitConfig from Story 1.4 RateLimiter
import type { RateLimitConfig } from '../../src/client/rate-limiter';
// Import ParsedOperation type for operation-level parsing
import type { ParsedOperation } from './path-parser';

/**
 * Parsed rate limit information extracted from Russian text tables.
 *
 * This interface represents the raw data extracted from Wildberries API
 * description tables before conversion to RateLimitConfig format.
 *
 * **Table Format:**
 * ```
 * | Период           | Лимит        | Интервал         | Всплеск      |
 * |------------------|--------------|------------------|--------------|
 * | {period} {unit}  | {N} запросов | {interval} {unit}| {N} запросов |
 * ```
 *
 * @example
 * ```typescript
 * // From table: "| 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |"
 * const info: RateLimitInfo = {
 *   period: "1 минута",
 *   periodValue: 1,
 *   periodUnit: "минута",
 *   limit: 100,
 *   interval: "600 миллисекунд",
 *   intervalValue: 600,
 *   intervalUnit: "миллисекунд",
 *   burst: 5
 * };
 * ```
 */
export interface RateLimitInfo {
  /**
   * Full period string from table (e.g., "1 минута", "30 секунд").
   * Combined from periodValue + periodUnit.
   */
  period: string;

  /**
   * Numerical value of the time period (e.g., 1, 30, 60).
   * Extracted from period column.
   */
  periodValue: number;

  /**
   * Russian time unit for period (e.g., "минута", "минуты", "минут", "секунд").
   * Handles all Russian plural forms automatically.
   */
  periodUnit: string;

  /**
   * Maximum number of requests allowed within the period.
   * Extracted from limit column (e.g., 100 from "100 запросов").
   */
  limit: number;

  /**
   * Full interval string from table (e.g., "600 миллисекунд", "10 секунд").
   * Combined from intervalValue + intervalUnit.
   * Represents minimum time between consecutive requests.
   */
  interval: string;

  /**
   * Numerical value of the interval duration (e.g., 600, 10, 20).
   * Extracted from interval column.
   */
  intervalValue: number;

  /**
   * Russian time unit for interval (e.g., "миллисекунд", "секунд", "минут").
   * Handles all Russian plural forms automatically.
   */
  intervalUnit: string;

  /**
   * Maximum number of requests allowed in burst (rapid succession).
   * Extracted from burst column (e.g., 5 from "5 запросов").
   * Represents the token bucket capacity.
   */
  burst: number;
}

/**
 * Re-export RateLimitConfig for convenience.
 *
 * This is the target format for rate limit configuration used by
 * the RateLimiter (Story 1.4). Generated from RateLimitInfo after
 * parsing and unit conversion.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimitConfig RateLimitConfig Documentation}
 */
export type { RateLimitConfig };

/**
 * Mapping of endpoint keys to their rate limit configurations.
 *
 * Each key represents a unique SDK operation (e.g., 'products.createProduct', 'general.ping').
 * Keys follow the format: `{moduleName}.{methodName}`
 *
 * @example
 * ```typescript
 * const limits: EndpointLimits = {
 *   'general.ping': {
 *     requestsPerMinute: 60,
 *     burstLimit: 10
 *   },
 *   'products.createProduct': {
 *     requestsPerMinute: 6,
 *     intervalSeconds: 10,
 *     burstLimit: 1
 *   },
 *   'orders.getOrder': {
 *     requestsPerMinute: 30,
 *     intervalSeconds: 2,
 *     burstLimit: 10
 *   }
 * };
 * ```
 */
export type EndpointLimits = Record<string, RateLimitConfig>;

/**
 * Conservative default rate limit configuration.
 *
 * Used when:
 * - No rate limit table found in operation description
 * - Regex parsing fails (malformed table)
 * - Extracted values are invalid (zero, negative, impossible values)
 * - HTML parsing fails
 * - Description field is missing
 *
 * **Default Values:**
 * - `requestsPerMinute: 10` - Very conservative rate (1 request every 6 seconds)
 * - `intervalSeconds: 6` - Enforced 6-second minimum interval between requests
 * - `burstLimit: 5` - Allow small initial burst of 5 requests
 *
 * **Rationale:**
 * These conservative defaults prevent API bans while the actual limits are unknown.
 * They provide a safe baseline that won't trigger most API rate limits, giving
 * headroom for the actual limits (which are typically higher).
 *
 * @example
 * ```typescript
 * // When parsing fails, log warning and use defaults
 * if (!rateLimitInfo) {
 *   console.warn(
 *     `No rate limit found for ${operationId}, using conservative defaults:`,
 *     DEFAULT_RATE_LIMIT_CONFIG
 *   );
 *   return DEFAULT_RATE_LIMIT_CONFIG;
 * }
 * ```
 */
export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  requestsPerMinute: 10,      // 1 request every 6 seconds
  intervalSeconds: 6,         // Enforced 6s minimum interval
  burstLimit: 5               // Allow 5 rapid requests initially
};

/**
 * Comprehensive regex pattern for matching Russian rate limit tables.
 *
 * This regex matches Wildberries API rate limit tables with the following structure:
 * ```
 * | Период | Лимит | Интервал | Всплеск |
 * | ---    | ---   | ---      | ---     |
 * | {period_value} {period_unit} | {limit_value} запросов | {interval_value} {interval_unit} | {burst_value} запросов |
 * ```
 *
 * **Capture Groups:**
 * 1. Period value (e.g., "1")
 * 2. Period unit (e.g., "минута")
 * 3. Limit value (e.g., "100")
 * 4. "запросов" (discarded)
 * 5. Interval value (e.g., "600")
 * 6. Interval unit (e.g., "миллисекунд")
 * 7. Burst value (e.g., "5")
 * 8. "запросов" (discarded)
 *
 * **Handles Variations:**
 * - Whitespace (spaces, tabs, multiple spaces)
 * - Table separators (pipes `|`, whitespace)
 * - Russian plurals (минута/минуты/минут, секунда/секунды/секунд)
 * - Case sensitivity (uses `/i` flag)
 * - HTML tags (should be stripped before applying regex)
 *
 * Context7 Reference: /microsoft/typescript - Template literal types and regex patterns
 *
 * @internal
 */
const RATE_LIMIT_REGEX = /Период[\s|]*Лимит[\s|]*Интервал[\s|]*Всплеск[\s|]*[\n\r]+[\s|]*-+[\s|]*-+[\s|]*-+[\s|]*-+[\s|]*[\n\r]+[\s|]*(\d+)\s+(минута|минуты|минут|секунд|секунды|секунда|час|часа|часов)[\s|]*(\d+)\s+(запросов|запроса|запрос)[\s|]*(\d+)\s+(миллисекунд|миллисекунды|миллисекунда|секунд|секунды|секунда|минута|минуты|минут)[\s|]*(\d+)\s+(запросов|запроса|запрос)/i;

/**
 * Finds and extracts the rate limit table from an operation description.
 *
 * Searches for markdown tables with Russian rate limit headers ("Лимит запросов")
 * and extracts the complete table including header, separator, and data rows.
 *
 * **Search Strategy:**
 * 1. Look for "Лимит запросов" (rate limit heading)
 * 2. Find markdown table with headers: "Период | Лимит | Интервал | Всплеск"
 * 3. Strip HTML tags if present (tables may be wrapped in `<div class="description_limit">`)
 * 4. Extract complete table including all rows
 * 5. Return null if no table found or table is malformed
 *
 * @param description - Operation description from OpenAPI specification
 * @returns Extracted table string or null if not found
 *
 * @example
 * ```typescript
 * const description = `
 *   <div class="description_limit">
 *   Лимит запросов на один аккаунт продавца:
 *   | Период | Лимит | Интервал | Всплеск |
 *   | --- | --- | --- | --- |
 *   | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |
 *   </div>
 * `;
 *
 * const table = findRateLimitTable(description);
 * console.log(table);
 * // Returns: "| Период | Лимит | Интервал | Всплеск | ... data row ..."
 * ```
 *
 * @example
 * ```typescript
 * // No table found
 * const description = "Simple description without rate limit table";
 * const table = findRateLimitTable(description);
 * console.log(table); // null
 * ```
 */
export function findRateLimitTable(description: string): string | null {
  if (!description) {
    return null;
  }

  // Strip HTML tags to get clean text
  const cleanDescription = description.replace(/<[^>]*>/g, '');

  // Check if description contains rate limit markers
  if (!cleanDescription.includes('Лимит') && !cleanDescription.includes('лимит')) {
    return null;
  }

  // Look for table header pattern
  if (!cleanDescription.includes('Период') || !cleanDescription.includes('Интервал')) {
    return null;
  }

  // Return the cleaned description for regex matching
  return cleanDescription;
}

/**
 * Converts Russian time units to seconds.
 *
 * Handles all common Russian time units and their plural forms:
 * - **Milliseconds:** миллисекунд(а/ы) → value / 1000
 * - **Seconds:** секунд(а/ы) → value
 * - **Minutes:** минут(а/ы) → value * 60
 * - **Hours:** час(ов/а) → value * 3600
 *
 * Uses case-insensitive substring matching to automatically handle
 * all Russian plural variations (e.g., минута, минуты, минут all match).
 *
 * @param value - Numerical value to convert
 * @param unit - Russian time unit string
 * @returns Value converted to seconds
 *
 * @example
 * ```typescript
 * convertToSeconds(600, "миллисекунд");  // 0.6
 * convertToSeconds(20, "секунд");        // 20
 * convertToSeconds(1, "минута");         // 60
 * convertToSeconds(2, "минуты");         // 120
 * convertToSeconds(5, "минут");          // 300
 * convertToSeconds(1, "час");            // 3600
 * ```
 *
 * @example
 * ```typescript
 * // Unknown unit defaults to seconds with warning
 * convertToSeconds(10, "unknown");
 * // Console: "Warning: Unknown time unit 'unknown', treating as seconds"
 * // Returns: 10
 * ```
 */
export function convertToSeconds(value: number, unit: string): number {
  const normalized = unit.toLowerCase();

  // Milliseconds: миллисекунд, миллисекунды, миллисекунда
  if (normalized.includes('миллисекунд')) {
    return value / 1000;
  }

  // Seconds: секунд, секунды, секунда
  if (normalized.includes('секунд')) {
    return value;
  }

  // Minutes: минут, минуты, минута
  if (normalized.includes('минут')) {
    return value * 60;
  }

  // Hours: часов, часа, час
  if (normalized.includes('час')) {
    return value * 3600;
  }

  // Unknown unit - default to seconds and log warning
  // eslint-disable-next-line no-console
  console.warn(`Warning: Unknown time unit '${unit}', treating as seconds`);
  return value;
}

/**
 * Extracts rate limit information from operation description.
 *
 * Parses Russian rate limit tables and extracts numerical values and time units.
 * Returns structured RateLimitInfo object or null if parsing fails.
 *
 * **Parsing Flow:**
 * 1. Find rate limit table using findRateLimitTable()
 * 2. Apply RATE_LIMIT_REGEX to extract values
 * 3. Parse captured groups into RateLimitInfo structure
 * 4. Return null if no match found or table malformed
 *
 * @param description - Operation description from OpenAPI specification
 * @returns Parsed rate limit information or null
 *
 * @example
 * ```typescript
 * const description = `
 *   | Период | Лимит | Интервал | Всплеск |
 *   | --- | --- | --- | --- |
 *   | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов |
 * `;
 *
 * const info = extractRateLimitInfo(description);
 * console.log(info);
 * // {
 * //   period: "1 минута",
 * //   periodValue: 1,
 * //   periodUnit: "минута",
 * //   limit: 100,
 * //   interval: "600 миллисекунд",
 * //   intervalValue: 600,
 * //   intervalUnit: "миллисекунд",
 * //   burst: 5
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // No table or malformed table
 * const description = "No rate limit information";
 * const info = extractRateLimitInfo(description);
 * console.log(info); // null
 * ```
 */
export function extractRateLimitInfo(description: string): RateLimitInfo | null {
  // Find the rate limit table
  const table = findRateLimitTable(description);
  if (!table) {
    return null;
  }

  // Apply regex pattern to extract values
  const match = RATE_LIMIT_REGEX.exec(table);
  if (!match) {
    return null;
  }

  // Extract captured groups
  const periodValue = parseInt(match[1], 10);
  const periodUnit = match[2];
  const limit = parseInt(match[3], 10);
  // match[4] is "запросов" (discarded)
  const intervalValue = parseInt(match[5], 10);
  const intervalUnit = match[6];
  const burst = parseInt(match[7], 10);
  // match[8] is "запросов" (discarded)

  // Validate extracted numbers
  if (isNaN(periodValue) || isNaN(limit) || isNaN(intervalValue) || isNaN(burst)) {
    return null;
  }

  if (periodValue <= 0 || limit <= 0 || intervalValue <= 0 || burst <= 0) {
    return null;
  }

  return {
    period: `${periodValue} ${periodUnit}`,
    periodValue,
    periodUnit,
    limit,
    interval: `${intervalValue} ${intervalUnit}`,
    intervalValue,
    intervalUnit,
    burst
  };
}

/**
 * Generates RateLimitConfig from parsed RateLimitInfo.
 *
 * Converts Russian time units to seconds and calculates requests per minute.
 *
 * **Calculation:**
 * 1. Convert period to seconds: `periodSeconds = convertToSeconds(periodValue, periodUnit)`
 * 2. Calculate requests per minute: `(limit / periodSeconds) * 60`
 * 3. Convert interval to seconds: `convertToSeconds(intervalValue, intervalUnit)`
 * 4. Use burst value directly
 *
 * @param info - Parsed rate limit information
 * @returns Rate limit configuration for RateLimiter
 *
 * @example
 * ```typescript
 * const info: RateLimitInfo = {
 *   period: "1 минута",
 *   periodValue: 1,
 *   periodUnit: "минута",
 *   limit: 100,
 *   interval: "600 миллисекунд",
 *   intervalValue: 600,
 *   intervalUnit: "миллисекунд",
 *   burst: 5
 * };
 *
 * const config = generateRateLimitConfig(info);
 * console.log(config);
 * // {
 * //   requestsPerMinute: 100,
 * //   intervalSeconds: 0.6,
 * //   burstLimit: 5
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // Strict rate limit: 6 requests per minute, 10 second intervals
 * const strictInfo: RateLimitInfo = {
 *   period: "1 минута",
 *   periodValue: 1,
 *   periodUnit: "минута",
 *   limit: 6,
 *   interval: "10 секунд",
 *   intervalValue: 10,
 *   intervalUnit: "секунд",
 *   burst: 1
 * };
 *
 * const strictConfig = generateRateLimitConfig(strictInfo);
 * console.log(strictConfig);
 * // {
 * //   requestsPerMinute: 6,
 * //   intervalSeconds: 10,
 * //   burstLimit: 1
 * // }
 * ```
 */
export function generateRateLimitConfig(info: RateLimitInfo): RateLimitConfig {
  // Convert period to seconds
  const periodSeconds = convertToSeconds(info.periodValue, info.periodUnit);

  // Calculate requests per minute
  // Formula: (requests / periodSeconds) * 60
  const requestsPerMinute = Math.round((info.limit / periodSeconds) * 60);

  // Convert interval to seconds
  const intervalSeconds = convertToSeconds(info.intervalValue, info.intervalUnit);

  return {
    requestsPerMinute,
    intervalSeconds,
    burstLimit: info.burst
  };
}

/**
 * Gets conservative default rate limit configuration.
 *
 * Returns DEFAULT_RATE_LIMIT_CONFIG constant.
 * This function exists for consistency with the parser API and
 * allows future customization of default values.
 *
 * @returns Conservative default configuration
 *
 * @example
 * ```typescript
 * const config = getDefaultRateLimitConfig();
 * console.log(config);
 * // {
 * //   requestsPerMinute: 10,
 * //   intervalSeconds: 6,
 * //   burstLimit: 5
 * // }
 * ```
 */
export function getDefaultRateLimitConfig(): RateLimitConfig {
  return DEFAULT_RATE_LIMIT_CONFIG;
}

/**
 * Parses rate limit from a single OpenAPI operation.
 *
 * Attempts to extract rate limit information from the operation's description field.
 * Falls back to conservative defaults if parsing fails.
 *
 * **Process:**
 * 1. Extract description from operation
 * 2. Try to extract rate limit info using extractRateLimitInfo()
 * 3. If successful, generate config using generateRateLimitConfig()
 * 4. If failed, use conservative defaults and log warning
 *
 * @param operation - Parsed OpenAPI operation
 * @param operationKey - Endpoint key for logging (e.g., 'products.createProduct')
 * @returns Rate limit configuration
 *
 * @example
 * ```typescript
 * const operation: ParsedOperation = {
 *   path: '/api/v1/news',
 *   method: 'get',
 *   summary: 'Get news',
 *   description: `
 *     Get latest news
 *     | Период | Лимит | Интервал | Всплеск |
 *     | --- | --- | --- | --- |
 *     | 1 минута | 30 запросов | 2 секунды | 10 запросов |
 *   `,
 *   responses: { '200': { description: 'Success' } }
 * };
 *
 * const config = parseOperationRateLimit(operation, 'general.getNews');
 * console.log(config);
 * // {
 * //   requestsPerMinute: 30,
 * //   intervalSeconds: 2,
 * //   burstLimit: 10
 * // }
 * ```
 *
 * @example
 * ```typescript
 * // Operation without rate limit table
 * const operation: ParsedOperation = {
 *   path: '/ping',
 *   method: 'get',
 *   summary: 'Ping endpoint',
 *   responses: { '200': { description: 'Pong' } }
 * };
 *
 * const config = parseOperationRateLimit(operation, 'general.ping');
 * // Console: "Warning: No rate limit found for general.ping, using defaults"
 * // Returns: { requestsPerMinute: 10, intervalSeconds: 6, burstLimit: 5 }
 * ```
 */
export function parseOperationRateLimit(
  operation: ParsedOperation,
  operationKey: string
): RateLimitConfig {
  // Handle missing description
  if (!operation.description) {
    // eslint-disable-next-line no-console
    console.warn(
      `No rate limit found for ${operationKey} (missing description), using conservative defaults`
    );
    return getDefaultRateLimitConfig();
  }

  // Try to extract rate limit info
  const rateLimitInfo = extractRateLimitInfo(operation.description);

  if (!rateLimitInfo) {
    // eslint-disable-next-line no-console
    console.warn(
      `No rate limit found for ${operationKey}, using conservative defaults`
    );
    return getDefaultRateLimitConfig();
  }

  // Successfully parsed rate limit
  const config = generateRateLimitConfig(rateLimitInfo);

  // Log successful parse (informational)
  // eslint-disable-next-line no-console
  console.log(
    `Parsed rate limit for ${operationKey}:`,
    `${config.requestsPerMinute} req/min`,
    config.intervalSeconds ? `(${config.intervalSeconds}s interval)` : '',
    `burst: ${config.burstLimit}`
  );

  return config;
}

/**
 * Generates rate limit map for all operations in a module.
 *
 * Creates an EndpointLimits object mapping endpoint keys to their rate limit configurations.
 * Endpoint keys follow the format: `{moduleName}.{methodName}`
 *
 * **Process:**
 * 1. For each operation, generate endpoint key
 * 2. Parse rate limit using parseOperationRateLimit()
 * 3. Add to map with endpoint key
 * 4. Return complete map
 *
 * @param operations - Array of parsed OpenAPI operations
 * @param moduleName - Module name (e.g., 'general', 'products')
 * @param methodNames - Map of operation paths to generated method names
 * @returns Mapping of endpoint keys to rate limit configurations
 *
 * @example
 * ```typescript
 * const operations: ParsedOperation[] = [
 *   { path: '/ping', method: 'get', ... },
 *   { path: '/api/v1/news', method: 'get', ... }
 * ];
 *
 * const methodNames = new Map([
 *   ['/ping:get', 'ping'],
 *   ['/api/v1/news:get', 'getNews']
 * ]);
 *
 * const limits = generateRateLimitMap(operations, 'general', methodNames);
 * console.log(limits);
 * // {
 * //   'general.ping': { requestsPerMinute: 10, ... },
 * //   'general.getNews': { requestsPerMinute: 30, ... }
 * // }
 * ```
 */
export function generateRateLimitMap(
  operations: ParsedOperation[],
  moduleName: string,
  methodNames: Map<string, string>
): EndpointLimits {
  const limits: EndpointLimits = {};

  for (const operation of operations) {
    // Generate unique key for this operation
    const operationKey = `${operation.path}:${operation.method}`;
    const methodName = methodNames.get(operationKey);

    if (!methodName) {
      // eslint-disable-next-line no-console
      console.warn(
        `No method name found for operation ${operationKey}, skipping rate limit`
      );
      continue;
    }

    // Generate endpoint key: moduleName.methodName
    const endpointKey = `${moduleName}.${methodName}`;

    // Parse rate limit for this operation
    const config = parseOperationRateLimit(operation, endpointKey);

    // Add to map
    limits[endpointKey] = config;
  }

  return limits;
}
