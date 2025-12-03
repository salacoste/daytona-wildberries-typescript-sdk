/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/01-general.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors/validation-error';
import type {
  PingResponse,
  NewsResponse,
  NewsRequestParams,
  SellerInfoResponse,
} from '../../types/general.types';

export class GeneralModule {
  constructor(private client: BaseClient) {}

  /**
   * Проверка подключения
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.ping();
  console.log(result);
   */
  async ping(): Promise<PingResponse> {
    return this.client.get<PingResponse>('https://common-api.wildberries.ru/ping');
  }

  /**
   * Получение новостей портала продавцов
   *
   * @param options - Query parameters (at least one required)
   * @param options.from - Дата, от которой необходимо выдать новости (format: YYYY-MM-DD)
   * @param options.fromID - ID новости, начиная с которой нужно получить список
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422) or no parameters provided
   * @throws {NetworkError} When network request fails or times out
   * @example
  // Get news from specific date
  const result = await sdk.general.news({ from: '2025-01-01' });

  // Get news from specific ID
  const result = await sdk.general.news({ fromID: 7369 });
   */
  async news(options: NewsRequestParams): Promise<NewsResponse> {
    // Validate that options object is provided (runtime safety for JS callers)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!options) {
      throw new ValidationError(
        'At least one parameter (from or fromID) must be provided for news() method',
        { required: 'Provide either "from" date or "fromID" parameter' }
      );
    }

    // Validate that at least one parameter is provided
    if (!options.from && !options.fromID) {
      throw new ValidationError(
        'At least one parameter (from or fromID) must be provided for news() method',
        { required: 'Provide either "from" date or "fromID" parameter' }
      );
    }

    // Validate date format if provided
    if (options.from) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(options.from)) {
        throw new ValidationError(
          'Invalid date format for "from" parameter. Use YYYY-MM-DD format',
          { from: `Required format: YYYY-MM-DD, received: ${options.from}` }
        );
      }
    }

    // Validate fromID if provided
    if (options.fromID) {
      if (!Number.isInteger(options.fromID) || options.fromID <= 0) {
        throw new ValidationError('Invalid "fromID" parameter. Must be a positive integer', {
          fromID: `Required: positive integer, received: ${options.fromID}`,
        });
      }
    }

    return this.client.get<NewsResponse>(
      'https://common-api.wildberries.ru/api/communications/v2/news',
      {
        params: options as Record<string, unknown>,
        rateLimitKey: 'general.communicationsNews',
      }
    );
  }

  /**
   * Получение информации о продавце
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.sellerInfo();
  console.log(result);
   */
  async sellerInfo(): Promise<SellerInfoResponse> {
    return this.client.get<SellerInfoResponse>(
      'https://common-api.wildberries.ru/api/v1/seller-info'
    );
  }
}
