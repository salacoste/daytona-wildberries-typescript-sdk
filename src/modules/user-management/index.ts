/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/01-general.yaml (User Management endpoints)
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  CreateInviteRequest,
  CreateInviteResponse,
  GetUsersParams,
  GetUsersResponse,
  UpdateUserAccessRequest,
} from '../../types/user-management.types';

export class UserManagementModule {
  constructor(private client: BaseClient) {}

  /**
   * Создание приглашения для пользователя
   *
   * Создаёт приглашение для нового пользователя профиля продавца.
   * В запросе указываются номер телефона, должность и настройки доступа к разделам.
   * Если массив `access` пустой или не указан — будут применены доступы по умолчанию.
   * Возвращает ID приглашения, ссылку для приглашения и срок действия.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 60 запросов | 1 секунда | 5 запросов |
   *
   * @param data - Данные для создания приглашения (доступы и информация о приглашённом)
   * @returns Результат создания приглашения (ID, URL, срок действия, статус)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.userManagement.createInvite({
   *   invite: {
   *     phoneNumber: '+79991234567',
   *     position: 'Менеджер',
   *   },
   *   access: [
   *     { code: 'balance', disabled: false },
   *     { code: 'finance', disabled: true },
   *   ],
   * });
   * console.log(result.inviteUrl);
   * console.log(result.inviteID);
   * ```
   */
  async createInvite(data: CreateInviteRequest): Promise<CreateInviteResponse> {
    return this.client.post<CreateInviteResponse>(
      'https://user-management-api.wildberries.ru/api/v1/invite',
      data,
      {
        rateLimitKey: 'userManagement.createInvite',
      }
    );
  }

  /**
   * Получение списка пользователей профиля продавца
   *
   * Возвращает список активных или приглашённых пользователей профиля продавца.
   * Поддерживает пагинацию через `limit` и `offset`.
   * Параметр `isInviteOnly` позволяет фильтровать только приглашённых,
   * которые ещё не активировали доступ.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 60 запросов | 1 секунда | 5 запросов |
   *
   * @readonly
   * @param [params] - Параметры запроса (пагинация и фильтрация)
   * @param [params.limit] - Количество пользователей в ответе (по умолчанию 100, максимум 100)
   * @param [params.offset] - Сколько элементов пропустить (по умолчанию 0)
   * @param [params.isInviteOnly] - Фильтр: true — только приглашённые, false — активные
   * @returns Список пользователей с общим количеством
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.userManagement.getUsers({ limit: 50, offset: 0 });
   * console.log(result.total);
   * for (const user of result.users) {
   *   console.log(user.firstName, user.secondName, user.role);
   * }
   * ```
   */
  async getUsers(params?: GetUsersParams): Promise<GetUsersResponse> {
    return this.client.get<GetUsersResponse>(
      'https://user-management-api.wildberries.ru/api/v1/users',
      {
        params: params ? { ...params } : undefined,
        rateLimitKey: 'userManagement.getUsers',
      }
    );
  }

  /**
   * Обновление настроек доступа пользователей
   *
   * Обновляет настройки доступа к разделам профиля продавца для указанных пользователей.
   * Для каждого пользователя передаётся массив настроек доступа с кодом раздела
   * и статусом (disabled: true — запрещён, false — разрешён).
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 60 запросов | 1 секунда | 5 запросов |
   *
   * @param data - Настройки доступа для пользователей
   * @returns void (200 ответ без тела)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
   * @example
   * ```typescript
   * await sdk.userManagement.updateUserAccess({
   *   usersAccesses: [
   *     {
   *       userId: 12345,
   *       access: [
   *         { code: 'balance', disabled: false },
   *         { code: 'finance', disabled: true },
   *       ],
   *     },
   *   ],
   * });
   * ```
   */
  async updateUserAccess(data: UpdateUserAccessRequest): Promise<void> {
    return this.client.put('https://user-management-api.wildberries.ru/api/v1/users/access', data, {
      rateLimitKey: 'userManagement.updateAccess',
    });
  }

  /**
   * Удаление пользователя из профиля продавца
   *
   * Удаляет пользователя из профиля продавца по его ID.
   * ID пользователя передаётся как query-параметр `deletedUserID`.
   * После удаления пользователь теряет доступ ко всем разделам профиля.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 60 запросов | 1 секунда | 10 запросов |
   *
   * @param deletedUserID - ID удаляемого пользователя
   * @returns void (200 ответ без тела)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
   * @example
   * ```typescript
   * await sdk.userManagement.deleteUser(12345);
   * ```
   */
  async deleteUser(deletedUserID: number): Promise<void> {
    return this.client.delete('https://user-management-api.wildberries.ru/api/v1/user', undefined, {
      params: { deletedUserID },
      rateLimitKey: 'userManagement.deleteUser',
    });
  }
}
