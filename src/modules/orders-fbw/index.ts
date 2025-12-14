/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/07-orders-fbw.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type { ModelsAcceptanceCoefficient, ModelsBox, ModelsGood, ModelsGoodInSupply, ModelsOptionsResultModel, ModelsSuppliesFiltersRequest, ModelsSupply, ModelsSupplyDetails, ModelsTransitTariff, ModelsWarehousesResultItems } from '../../types/orders-fbw.types';

export class OrdersFbwModule {
  constructor(private client: BaseClient) {}

  /**
   * Коэффициенты приёмки
   *
   * Метод возвращает коэффициенты приёмки для конкретных складов на ближайшие 14 дней. <div class="description_important"> Приёмка для поставки доступна только при сочетании: <br> <code>coefficient</code> — <code>0</code> или <code>1</code> <br> и <code>allowUnload</code> — <code>true</code> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getAcceptanceCoefficients({});
  console.log(result);
   */
  async getAcceptanceCoefficients(options?: { warehouseIDs?: string }): Promise<ModelsAcceptanceCoefficient[]> {
    return this.client.get<ModelsAcceptanceCoefficient[]>('https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients', { params: options });
  }

  /**
   * Опции приёмки
   *
   * Метод возвращает информацию о том, какие склады и типы упаковки доступны для поставки. Список складов определяется по баркоду и количеству товара. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 6 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createAcceptanceOption({}, {});
  console.log(result);
   */
  async createAcceptanceOption(data: ModelsGood[], options?: { warehouseID?: string }): Promise<ModelsOptionsResultModel> {
    return this.client.post<ModelsOptionsResultModel>('https://supplies-api.wildberries.ru/api/v1/acceptance/options', data, { params: options });
  }

  /**
   * Список складов
   *
   * Метод возвращает список складов WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 6 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.warehouses();
  console.log(result);
   */
  async warehouses(): Promise<ModelsWarehousesResultItems[]> {
    return this.client.get<ModelsWarehousesResultItems[]>('https://supplies-api.wildberries.ru/api/v1/warehouses');
  }

  /**
   * Транзитные направления
   *
   * Метод возвращает информацию о доступных транзитных направлениях. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 10 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.transitTariffs();
  console.log(result);
   */
  async transitTariffs(): Promise<ModelsTransitTariff[]> {
    return this.client.get<ModelsTransitTariff[]>('https://supplies-api.wildberries.ru/api/v1/transit-tariffs');
  }

  /**
   * Список поставок
   *
   * Метод возвращает список поставок, по умолчанию — последние 1000 поставок. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createSupply({}, {});
  console.log(result);
   */
  async createSupply(data: ModelsSuppliesFiltersRequest, options?: { limit?: number; offset?: number }): Promise<ModelsSupply[]> {
    return this.client.post<ModelsSupply[]>('https://supplies-api.wildberries.ru/api/v1/supplies', data, { params: options });
  }

  /**
   * Детали поставки
   *
   * Метод возвращает детали поставки по ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>
   *
   * @param ID - ID поставки или заказа
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSupply('ID-value', {});
  console.log(result);
   */
  async getSupply(ID: number, options?: { isPreorderID?: boolean }): Promise<ModelsSupplyDetails> {
    return this.client.get<ModelsSupplyDetails>(`https://supplies-api.wildberries.ru/api/v1/supplies/${ID}`, { params: options });
  }

  /**
   * Товары поставки
   *
   * Метод возвращает информацию о товарах в поставке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>
   *
   * @param ID - ID поставки или заказа
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSuppliesGood('ID-value', {});
  console.log(result);
   */
  async getSuppliesGood(ID: number, options?: { limit?: number; offset?: number; isPreorderID?: boolean }): Promise<ModelsGoodInSupply[]> {
    return this.client.get<ModelsGoodInSupply[]>(`https://supplies-api.wildberries.ru/api/v1/supplies/${ID}/goods`, { params: options });
  }

  /**
   * Упаковка поставки
   *
   * Метод возвращает информацию об упаковке поставки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>
   *
   * @param ID - ID поставки
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSuppliesPackage('ID-value');
  console.log(result);
   */
  async getSuppliesPackage(ID: number): Promise<ModelsBox[]> {
    return this.client.get<ModelsBox[]>(`https://supplies-api.wildberries.ru/api/v1/supplies/${ID}/package`);
  }

}