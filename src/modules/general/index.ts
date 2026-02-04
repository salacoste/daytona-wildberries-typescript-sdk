/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/01-general.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  PingResponse,
  NewsResponse,
  NewsRequestParams,
  SellerInfoResponse,
} from '../../types/general.types';

export class GeneralModule {
  constructor(private client: BaseClient) {}

  /**
   * Проверка подключения к WB API
   *
   * Метод проверяет три вещи:
   * 1. Запрос доходит до WB API
   * 2. Валидность токена (не истёк, не отозван)
   * 3. Совпадение категории токена и сервиса
   *
   * Метод НЕ предназначен для проверки доступности конкретного сервиса.
   * Для каждой категории API используется свой домен:
   *
   * | Категория | Домен |
   * | --- | --- |
   * | Контент | content-api.wildberries.ru |
   * | Маркетплейс | marketplace-api.wildberries.ru |
   * | Статистика | statistics-api.wildberries.ru |
   * | Аналитика | seller-analytics-api.wildberries.ru |
   * | Рекомендации | recommend-api.wildberries.ru |
   * | Вопросы и отзывы | feedbacks-api.wildberries.ru |
   * | Цены и скидки | discounts-prices-api.wildberries.ru |
   * | Продвижение | advert-api.wildberries.ru |
   * | Чат с покупателями | buyer-chat-api.wildberries.ru |
   * | Тарифы | common-api.wildberries.ru |
   * | Общее | common-api.wildberries.ru |
   * | Возвраты покупателям | returns-api.wildberries.ru |
   * | Документы | document-api.wildberries.ru |
   * | Финансы | finance-api.wildberries.ru |
   *
   * Rate limit: Максимум 3 запроса за 30 секунд (6 req/min, 10s interval, burst 3)
   *
   * @readonly
   * @returns Ответ с временной меткой и статусом подключения
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Proverka-podklyucheniya-k-WB-API}
   * @example
   * ```typescript
   * const result = await sdk.general.ping();
   * console.log(result.Status); // 'OK'
   * ```
   */
  async ping(): Promise<PingResponse> {
    return this.client.get<PingResponse>('https://common-api.wildberries.ru/ping', {
      rateLimitKey: 'general.ping',
    });
  }

  /**
   * Получение новостей портала продавцов
   *
   * Возвращает список новостей портала продавцов Wildberries.
   * В запросе необходимо указать один из параметров: `from` (дата) или `fromID` (ID новости).
   * Максимум 100 новостей за один запрос.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 1 запрос | 1 мин | 10 запросов |
   *
   * @readonly
   * @param [options] - Параметры запроса
   * @param [options.from] - Дата, от которой необходимо выдать новости (формат: YYYY-MM-DD)
   * @param [options.fromID] - ID новости, начиная с которой нужно получить список
   * @returns Список новостей
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/API-novostej}
   * @example
   * ```typescript
   * const result = await sdk.general.news({ from: '2024-01-01' });
   * for (const item of result.data) {
   *   console.log(item.header, item.date);
   * }
   * ```
   */
  async news(options?: NewsRequestParams): Promise<NewsResponse> {
    return this.client.get<NewsResponse>(
      'https://common-api.wildberries.ru/api/communications/v2/news',
      {
        params: options ? { ...options } : undefined,
        rateLimitKey: 'general.communicationsNews',
      }
    );
  }

  /**
   * Получение информации о продавце
   *
   * Возвращает наименование продавца и уникальный ID профиля продавца.
   * Для запроса подойдёт любой токен, кроме тестового контура.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 1 запрос | 1 мин | 10 запросов |
   *
   * @readonly
   * @returns Информация о продавце (наименование, ID профиля, торговая марка)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Informaciya-o-prodavce}
   * @example
   * ```typescript
   * const seller = await sdk.general.sellerInfo();
   * console.log(seller.name, seller.sid);
   * ```
   */
  async sellerInfo(): Promise<SellerInfoResponse> {
    return this.client.get<SellerInfoResponse>(
      'https://common-api.wildberries.ru/api/v1/seller-info',
      {
        rateLimitKey: 'general.sellerInfo',
      }
    );
  }
}
