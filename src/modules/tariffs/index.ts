/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/10-tariffs.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type { Commission, CommissionChina, CommissionTurkey, CommissionUAE, CommissionUzbekistan, ReturnTariffsResponse, TariffsBoxResponse, TariffsPalletResponse } from '../../types/tariffs.types';

export class TariffsModule {
  constructor(private client: BaseClient) {}

  /**
   * Комиссия по категориям товаров
   *
   * Метод возвращает данные о [комиссии](https://seller.wildberries.ru/dynamic-product-categories/commission) WB по [родительским категориям товаров](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1parent~1all/get) согласно модели продаж. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 2 запроса | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.tariffs.getTariffsCommission();
  console.log(result);
   */
  async getTariffsCommission(): Promise<Commission | CommissionChina | CommissionTurkey | CommissionUzbekistan | CommissionUAE> {
    return this.client.get<Commission | CommissionChina | CommissionTurkey | CommissionUzbekistan | CommissionUAE>('https://common-api.wildberries.ru/api/v1/tariffs/commission');
  }

  /**
   * Тарифы для коробов
   *
   * Для товаров, которые поставляются на склад в коробах, метод возвращает [тарифы на остаток](https://seller.wildberries.ru/dynamic-product-categories): - доставка со склада или пункта приёма до покупателя - доставка от покупателя до пункта приёма - хранение на складе WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.tariffs.getTariffsBox();
  console.log(result);
   */
  async getTariffsBox(): Promise<TariffsBoxResponse> {
    return this.client.get<TariffsBoxResponse>('https://common-api.wildberries.ru/api/v1/tariffs/box');
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
  async getTariffsPallet(): Promise<TariffsPalletResponse> {
    return this.client.get<TariffsPalletResponse>('https://common-api.wildberries.ru/api/v1/tariffs/pallet');
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
  async getTariffsReturn(): Promise<ReturnTariffsResponse> {
    return this.client.get<ReturnTariffsResponse>('https://common-api.wildberries.ru/api/v1/tariffs/return');
  }

}