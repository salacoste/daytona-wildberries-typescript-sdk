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
  CreateInviteRequest,
  CreateInviteResponse,
  GetUsersParams,
  GetUsersResponse,
  UpdateUserAccessRequest,
  GetJamSubscriptionStatusParams,
  JamSubscriptionStatus,
  JamSubscriptionTier,
  JamSubscriptionDetails,
  SellerRatingResponse,
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

  /**
   * Создание приглашения для нового пользователя
   *
   * Метод создаёт приглашение для нового пользователя с настройкой доступов к разделам профиля продавца.
   * Приглашение действительно в течение ограниченного времени, указанного в ответе.
   *
   * **Авторизация:** Требуется Персональный токен (категория: Пользователи) от активного владельца профиля.
   * Доступно для всех стран продавцов.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 сек | 1 запрос | 1 сек | 5 запросов |
   *
   * @param data - Данные для создания приглашения
   * @returns Информация о созданном приглашении
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.general.createInvite({
   *   invite: { phoneNumber: '79999999999', position: 'Менеджер' },
   *   access: [
   *     { code: 'balance', disabled: false },
   *     { code: 'finance', disabled: true }
   *   ]
   * });
   * console.log(result.inviteUrl);
   * ```
   */
  async createInvite(data: CreateInviteRequest): Promise<CreateInviteResponse> {
    return this.client.post<CreateInviteResponse>(
      'https://user-management-api.wildberries.ru/api/v1/invite',
      data,
      { rateLimitKey: 'general.createInvite' }
    );
  }

  /**
   * Получение списка пользователей продавца
   *
   * Возвращает список пользователей профиля продавца с их правами доступа.
   * Можно фильтровать по активным пользователям или только приглашённым.
   *
   * **Авторизация:** Требуется Персональный токен (категория: Пользователи) от активного владельца профиля.
   * Доступно для всех стран продавцов.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 сек | 1 запрос | 1 сек | 5 запросов |
   *
   * @readonly
   * @param [params] - Параметры запроса
   * @param [params.limit] - Количество пользователей в ответе (макс. 100, по умолчанию 100)
   * @param [params.offset] - Количество элементов для пропуска (по умолчанию 0)
   * @param [params.isInviteOnly] - true - только приглашённые, false - только активные
   * @returns Список пользователей с общим количеством
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.general.getUsers({ limit: 50 });
   * console.log(`Total users: ${result.total}`);
   * for (const user of result.users) {
   *   console.log(user.firstName, user.email);
   * }
   * ```
   */
  async getUsers(params?: GetUsersParams): Promise<GetUsersResponse> {
    return this.client.get<GetUsersResponse>(
      'https://user-management-api.wildberries.ru/api/v1/users',
      {
        params: params ? { ...params } : undefined,
        rateLimitKey: 'general.getUsers',
      }
    );
  }

  /**
   * Изменение доступов пользователей
   *
   * Обновляет права доступа для одного или нескольких пользователей профиля продавца.
   * Можно изменить доступ к различным разделам: баланс, финансы, документы и др.
   *
   * **Авторизация:** Требуется Персональный токен (категория: Пользователи) от активного владельца профиля.
   * Доступно для всех стран продавцов.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 сек | 1 запрос | 1 сек | 5 запросов |
   *
   * @param data - Данные для обновления доступов
   * @returns void
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
   * @example
   * ```typescript
   * await sdk.general.updateUserAccess({
   *   usersAccesses: [
   *     {
   *       userId: 12345,
   *       access: [
   *         { code: 'balance', disabled: true },
   *         { code: 'finance', disabled: false }
   *       ]
   *     }
   *   ]
   * });
   * ```
   */
  async updateUserAccess(data: UpdateUserAccessRequest): Promise<void> {
    await this.client.put<undefined>(
      'https://user-management-api.wildberries.ru/api/v1/users/access',
      data,
      { rateLimitKey: 'general.updateUserAccess' }
    );
  }

  /**
   * Удаление пользователя
   *
   * Удаляет пользователя из профиля продавца по его ID.
   * Удалённый пользователь теряет доступ ко всем разделам профиля.
   *
   * **Авторизация:** Требуется Персональный токен (категория: Пользователи) от активного владельца профиля.
   * Доступно для всех стран продавцов.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 сек | 1 запрос | 1 сек | 10 запросов |
   *
   * @param deletedUserID - ID пользователя для удаления
   * @returns void
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
   * @example
   * ```typescript
   * await sdk.general.deleteUser(12345);
   * ```
   */
  async deleteUser(deletedUserID: number): Promise<void> {
    await this.client.delete<undefined>(
      'https://user-management-api.wildberries.ru/api/v1/user',
      {},
      {
        params: { deletedUserID },
        rateLimitKey: 'general.deleteUser',
      }
    );
  }

  /**
   * Определение тарифа подписки Джем (Jam) через пробные запросы
   *
   * @deprecated Используйте {@link getJamSubscription} вместо этого метода.
   * Прямой API `GET /api/common/v1/subscriptions` не требует nmIds и не тратит квоту аналитики.
   * Этот probe-метод сохранён как fallback для случаев, когда нет Сервисного токена.
   *
   * Определяет тариф через пробные запросы к аналитическому эндпоинту
   * поисковых запросов товара (`/api/v2/search-report/product/search-texts`),
   * используя разные значения `limit`:
   *
   * 1. Запрос с `limit: 31` (выше лимита стандартного тарифа = 30)
   *    - **200** → тариф «Продвинутый» (advanced)
   *    - **400** → не продвинутый → продолжаем
   * 2. Запрос с `limit: 1`
   *    - **200** → тариф «Стандартный» (standard)
   *    - **400** → подписка Джем отсутствует (none)
   *
   * Ошибки аутентификации, превышения лимитов и сетевые ошибки не перехватываются
   * и пробрасываются вызывающему коду.
   *
   * Rate limit: Uses the same quota as `analytics.createProductSearchText`
   * (3 requests/minute, 20-second interval, burst 3).
   * Each call makes 1–2 probe requests.
   *
   * @param params - Parameters containing nmIds for the probe
   * @param params.nmIds - One or more WB article IDs to use in the probe
   * @returns Jam subscription status with detected tier and metadata
   * @throws {ValidationError} When nmIds array is empty
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * const status = await sdk.general.getJamSubscriptionStatus({ nmIds: [12345678] });
   *
   * switch (status.tier) {
   *   case 'advanced':
   *     console.log('Advanced Jam — limit up to 50');
   *     break;
   *   case 'standard':
   *     console.log('Standard Jam — limit up to 30');
   *     break;
   *   case 'none':
   *     console.log('No Jam subscription');
   *     break;
   * }
   * ```
   */
  async getJamSubscriptionStatus(
    params: GetJamSubscriptionStatusParams
  ): Promise<JamSubscriptionStatus> {
    if (params.nmIds.length === 0) {
      throw new ValidationError('nmIds must be a non-empty array');
    }

    const probeUrl =
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/search-texts';
    const rateLimitKey = 'analytics.postSearchReportProductSearchTexts';

    // Build yesterday's date for the probe period
    const yesterday = new Date(Date.now() - 86_400_000);
    const dateStr = yesterday.toISOString().slice(0, 10);

    const buildPayload = (limit: number) => ({
      currentPeriod: { start: dateStr, end: dateStr },
      nmIds: params.nmIds,
      topOrderBy: 'openCard' as const,
      orderBy: { field: 'avgPosition' as const, mode: 'asc' as const },
      limit,
    });

    let probeCallsMade = 0;

    // Probe 1: limit=31 (above Standard max of 30)
    try {
      probeCallsMade++;
      await this.client.post(probeUrl, buildPayload(31), { rateLimitKey });
      return this.buildResult('advanced', probeCallsMade);
    } catch (error: unknown) {
      if (!(error instanceof ValidationError)) {
        throw error;
      }
      // ValidationError (400) → not advanced, continue probing
    }

    // Probe 2: limit=1
    try {
      probeCallsMade++;
      await this.client.post(probeUrl, buildPayload(1), { rateLimitKey });
      return this.buildResult('standard', probeCallsMade);
    } catch (error: unknown) {
      if (!(error instanceof ValidationError)) {
        throw error;
      }
      // ValidationError (400) → no Jam subscription
      return this.buildResult('none', probeCallsMade);
    }
  }

  /** Build a JamSubscriptionStatus result */
  private buildResult(tier: JamSubscriptionTier, probeCallsMade: number): JamSubscriptionStatus {
    return {
      tier,
      checkedAt: new Date().toISOString(),
      probeCallsMade,
    };
  }

  /**
   * Получение информации о подписке Джем (Jam)
   *
   * Возвращает подробную информацию о подписке Джем продавца:
   * даты активации и окончания, уровень подписки, способ оформления и статус.
   *
   * Если продавец никогда не подключал подписку, возвращается пустой объект (200).
   *
   * **Авторизация:** Сервисный токен любой категории.
   *
   * Rate limit: 1 request per minute, 1 min interval, burst 10
   *
   * @returns Jam subscription details (empty object if never subscribed)
   * @throws {AuthenticationError} When API key is invalid or not a Service token (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.5.0
   * @see {@link https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1Subscriptions}
   * @example
   * ```typescript
   * const jam = await sdk.general.getJamSubscription();
   * if (jam.state === 'active') {
   *   console.log(`Jam ${jam.level} active until ${jam.till}`);
   *   console.log(`Source: ${jam.activationSource}, since: ${jam.since}`);
   * } else if (jam.state) {
   *   console.log(`Jam inactive (state: ${jam.state})`);
   * } else {
   *   console.log('Never subscribed to Jam');
   * }
   * ```
   */
  async getJamSubscription(): Promise<JamSubscriptionDetails> {
    return this.client.get<JamSubscriptionDetails>(
      'https://common-api.wildberries.ru/api/common/v1/subscriptions',
      { rateLimitKey: 'general.getJamSubscription' }
    );
  }

  /**
   * Получить рейтинг продавца и количество отзывов
   *
   * Возвращает пользовательский рейтинг продавца и общее количество отзывов.
   *
   * **Авторизация:** Сервисный токен категории **Вопросы и отзывы**.
   *
   * Rate limit: 1 request per minute, 1 min interval, burst 1
   *
   * @returns Seller rating and review count
   * @throws {AuthenticationError} When API key is invalid or wrong token category (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.5.0
   * @see {@link https://dev.wildberries.ru/docs/openapi/api-information#tag/Informaciya-o-prodavce/operation/getCommonV1Rating}
   * @example
   * ```typescript
   * const rating = await sdk.general.getSellerRating();
   * console.log(`Rating: ${rating.valuation} (${rating.feedbackCount} reviews)`);
   * ```
   */
  async getSellerRating(): Promise<SellerRatingResponse> {
    return this.client.get<SellerRatingResponse>(
      'https://common-api.wildberries.ru/api/common/v1/rating',
      { rateLimitKey: 'general.getSellerRating' }
    );
  }
}
