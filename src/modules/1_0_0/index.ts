/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/99-supplemental.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';

export class Type100Module {
  constructor(private client: BaseClient) {}

  /**
   * Список тегов (v2)
   *
   * Получение списка тегов продавца.
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getContentTags();
  console.log(result);
   */
  async getContentTags(): Promise<unknown> {
    return this.client.get<unknown>('https://api.wildberries.ru/content/v2/tags');
  }

  /**
   * Информация о медиакампании (v1)
   *
   * Получение информации о медиакампании по ID.
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getAdvAdvert({});
  console.log(result);
   */
  async getAdvAdvert(options?: { id: number }): Promise<unknown> {
    return this.client.get<unknown>('https://api.wildberries.ru/adv/v1/advert', {
      params: options,
    });
  }

  /**
   * Статистика кампаний (v2 POST)
   *
   * Получение полной статистики по кампаниям (POST метод).
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createAdvFullstat({});
  console.log(result);
   */
  async createAdvFullstat(data?: Record<string, never>[]): Promise<unknown> {
    return this.client.post<unknown>('https://api.wildberries.ru/adv/v2/fullstats', data);
  }

  /**
   * Статистика кампаний (v3)
   *
   * Получение полной статистики по кампаниям (v3).
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getAdvFullstats({});
  console.log(result);
   */
  async getAdvFullstats(options?: {
    ids?: string;
    beginDate?: string;
    endDate?: string;
  }): Promise<unknown> {
    return this.client.get<unknown>('https://api.wildberries.ru/adv/v3/fullstats', {
      params: options,
    });
  }

  /**
   * Список акций
   *
   * Получение списка доступных акций календаря.
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getCalendarPromotions();
  console.log(result);
   */
  async getCalendarPromotions(): Promise<unknown> {
    return this.client.get<unknown>('https://api.wildberries.ru/api/v1/calendar/promotions');
  }
}
