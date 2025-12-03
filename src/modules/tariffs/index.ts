/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/10-tariffs.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors/validation-error';
import type { Commission, CommissionChina, CommissionTurkey, CommissionUAE, CommissionUzbekistan, ReturnTariffsResponse, TariffsBoxResponse, TariffsPalletResponse } from '../../types/tariffs.types';

export class TariffsModule {
  constructor(private client: BaseClient) {}

  /**
   * Комиссия по категориям товаров
   *
   * Метод возвращает данные о [комиссии](https://seller.wildberries.ru/dynamic-product-categories/commission) WB
   * по [родительским категориям товаров] согласно модели продаж.
   *
   * **Rate Limit**: 1 request per minute (burst: 2)
   *
   * @param locale - Optional language for response fields (parentName, subjectName):
   *   - 'ru' - Russian (default)
   *   - 'en' - English
   *   - 'zh' - Chinese
   * @returns Promise resolving to commission data structure
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When locale value is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get commission data in Russian (default)
   * const result = await sdk.tariffs.getTariffsCommission();
   * console.log(result);
   *
   * // Get commission data in English
   * const resultEn = await sdk.tariffs.getTariffsCommission('en');
   * console.log(resultEn);
   *
   * // Get commission data in Chinese
   * const resultZh = await sdk.tariffs.getTariffsCommission('zh');
   * console.log(resultZh);
   * ```
   */
  async getTariffsCommission(
    locale?: 'ru' | 'en' | 'zh'
  ): Promise<Commission | CommissionChina | CommissionTurkey | CommissionUzbekistan | CommissionUAE> {
    const params: Record<string, string> = {};
    if (locale) {
      params.locale = locale;
    }

    return this.client.get<Commission | CommissionChina | CommissionTurkey | CommissionUzbekistan | CommissionUAE>(
      'https://common-api.wildberries.ru/api/v1/tariffs/commission',
      { params, rateLimitKey: 'tariffs.getTariffsCommission' }
    );
  }

  /**
   * Тарифы для коробов
   *
   * Для товаров, которые поставляются на склад в коробах, метод возвращает [тарифы на остаток](https://seller.wildberries.ru/dynamic-product-categories): - доставка со склада или пункта приёма до покупателя - доставка от покупателя до пункта приёма - хранение на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>
   *
   * @param date - Date for tariff calculation in YYYY-MM-DD format (e.g., '2025-01-15')
   * @returns Promise resolving to box tariffs data structure
   * @throws {ValidationError} When date format is invalid or missing (HTTP 400)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * ```typescript
   * // Get box tariffs for specific date
   * const tariffs = await sdk.tariffs.getTariffsBox('2025-01-15');
   * console.log('Box tariffs:', tariffs);
   *
   * // Get tariffs for today
   * const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
   * const todayTariffs = await sdk.tariffs.getTariffsBox(today);
   * console.log('Today\'s box tariffs:', todayTariffs);
   * ```
   */
  async getTariffsBox(date: string): Promise<TariffsBoxResponse> {
    // Validate date format (YYYY-MM-DD)
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ValidationError(
        'Invalid date format. Date must be in YYYY-MM-DD format (e.g., "2025-01-15")',
        { date: `Required format: YYYY-MM-DD, received: ${date || 'undefined'}` }
      );
    }

    return this.client.get<TariffsBoxResponse>(
      'https://common-api.wildberries.ru/api/v1/tariffs/box',
      {
        params: { date },
        rateLimitKey: 'tariffs.getTariffsBox'
      }
    );
  }

  /**
   * Тарифы для монопаллет
   *
   * Для товаров, которые поставляются на склад WB на монопаллетах, метод возвращает [стоимость](https://seller.wildberries.ru/dynamic-product-categories): - доставки со склада до покупателя - доставки от покупателя до склада - хранения на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.tariffs.getTariffsPallet();
  console.log(result);
   */
  async getTariffsPallet(date: string): Promise<TariffsPalletResponse> {
    // Validate date format (YYYY-MM-DD)
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ValidationError(
        'Invalid date format. Date must be in YYYY-MM-DD format (e.g., "2025-01-15")',
        { date: `Required format: YYYY-MM-DD, received: ${date || 'undefined'}` }
      );
    }

    return this.client.get<TariffsPalletResponse>(
      'https://common-api.wildberries.ru/api/v1/tariffs/pallet',
      {
        params: { date },
        rateLimitKey: 'tariffs.getTariffsPallet'
      }
    );
  }

  /**
   * Тарифы на возврат
   *
   * Метод возвращает [тарифы](https://seller.wildberries.ru/dynamic-product-categories/return-cost): - на перевозку товаров со склада WB или из пункта приёма до продавца - на обратную перевозку возвратов, которые не забрал продавец <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.tariffs.getTariffsReturn();
  console.log(result);
   */
  async getTariffsReturn(date: string): Promise<ReturnTariffsResponse> {
    // Validate date format (YYYY-MM-DD)
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ValidationError(
        'Invalid date format. Date must be in YYYY-MM-DD format (e.g., "2025-01-15")',
        { date: `Required format: YYYY-MM-DD, received: ${date || 'undefined'}` }
      );
    }

    return this.client.get<ReturnTariffsResponse>(
      'https://common-api.wildberries.ru/api/v1/tariffs/return',
      {
        params: { date },
        rateLimitKey: 'tariffs.getTariffsReturn'
      }
    );
  }

}