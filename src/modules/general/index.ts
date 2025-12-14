/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/01-general.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';

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
  async ping(): Promise<{ TS?: string; Status?: 'OK' }> {
    return this.client.get<{ TS?: string; Status?: 'OK' }>('https://common-api.wildberries.ru/ping');
  }

  /**
   * Получение новостей портала продавцов
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.news({});
  console.log(result);
   */
  async news(options?: { from?: string; fromID?: number }): Promise<{ data?: { content?: string; date?: string; header?: string; id?: number; types?: { id?: number; name?: string }[] }[] }> {
    return this.client.get<{ data?: { content?: string; date?: string; header?: string; id?: number; types?: { id?: number; name?: string }[] }[] }>('https://common-api.wildberries.ru/api/communications/v2/news', { params: options });
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
  async sellerInfo(): Promise<{ name?: string; sid?: string; tradeMark?: string }> {
    return this.client.get<{ name?: string; sid?: string; tradeMark?: string }>('https://common-api.wildberries.ru/api/v1/seller-info');
  }

}