/**
 * Auto-generated types for user-management module
 * Generated from: wildberries_api_doc/01-general.yaml (components/schemas, lines 658-967)
 *
 * Manages seller team members: invitations, access rights, user listing, and deletion.
 * Domain: https://user-management-api.wildberries.ru
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 */

/**
 * Код раздела профиля продавца, к которому пользователь получит доступ.
 *
 * - `balance` — Просмотр баланса и вывод средств
 * - `brands` — Управление брендами
 * - `changeJam` — Доступ к подключению подписки Джем
 * - `discountPrice` — Изменение цен на товары, управление скидками и акциями
 * - `finance` — Финансовая аналитика
 * - `showcase` — Управление витриной магазина
 * - `suppliersDocuments` — Просмотр и скачивание документов
 * - `supply` — Создание и управление поставками FBW
 * - `questions` — Просмотр и ответы на вопросы покупателей
 * - `pinFeedbacks` — Возможность закреплять и откреплять отзывы
 * - `pointsForReviews` — Баллы за отзывы
 * - `feedbacks` — Просмотр и ответы на отзывы покупателей
 * - `oldAnalyticsReports` — Отчёты
 * - `marketplace` — Склад продавца
 * - `brandsFlow` — Мои бренды
 * - `copyrightComplaints` — Обращения правообладателей
 * - `pretrialClaims` — Досудебные претензии
 * - `sellersChat` — Чат с покупателями
 * - `brandzone` — Бренд-зона
 * - `brandzoneSubscribe` — Управление подпиской бренд-зоны
 */
export type AccessCode =
  | 'balance'
  | 'brands'
  | 'changeJam'
  | 'discountPrice'
  | 'finance'
  | 'showcase'
  | 'suppliersDocuments'
  | 'supply'
  | 'questions'
  | 'pinFeedbacks'
  | 'pointsForReviews'
  | 'feedbacks'
  | 'oldAnalyticsReports'
  | 'marketplace'
  | 'brandsFlow'
  | 'copyrightComplaints'
  | 'pretrialClaims'
  | 'sellersChat'
  | 'brandzone'
  | 'brandzoneSubscribe';

/**
 * Элемент настройки доступа к разделу профиля продавца
 */
export interface AccessItem {
  /** Код раздела профиля продавца */
  code: AccessCode;
  /**
   * Статус доступа к разделу:
   * - `true` — доступ к разделу запрещён
   * - `false` — доступ к разделу разрешён
   */
  disabled: boolean;
}

/**
 * Информация о приглашении пользователя
 */
export interface InviteeInfo {
  /** Номер телефона приглашённого пользователя */
  phoneNumber?: string;
  /** Должность приглашённого пользователя */
  position?: string;
  /** ID приглашения (UUID) */
  inviteUuid?: string;
  /**
   * Дата и время окончания срока действия приглашения
   * Format: date-time
   */
  expiredAt?: string;
  /**
   * Статус приглашения:
   * - `true` — приглашение активно
   * - `false` — приглашение неактивно
   */
  isActive?: boolean;
}

/**
 * Информация о пользователе профиля продавца
 */
export interface UserInfo {
  /** ID пользователя */
  id: number;
  /**
   * Роль пользователя:
   * - `user` — пользователь, который активировал доступ
   * - `` (пустая строка) — пользователь, который не активировал доступ
   */
  role: 'user' | '';
  /** Должность пользователя */
  position: string;
  /** Номер телефона пользователя */
  phone: string;
  /** Email пользователя */
  email: string;
  /** Является ли пользователь владельцем профиля продавца */
  isOwner: boolean;
  /** Имя пользователя */
  firstName: string;
  /** Фамилия пользователя */
  secondName: string;
  /** Отчество пользователя */
  patronymic: string;
  /** Может ли пользователь одобрять возвраты товаров */
  goodsReturn: boolean;
  /** Приглашён ли пользователь */
  isInvitee: boolean;
  /** Информация о приглашении, если пользователь приглашён */
  inviteeInfo: InviteeInfo | null;
  /** Настройки доступа к разделам профиля продавца */
  access: AccessItem[];
}

/**
 * Ответ на запрос списка пользователей
 */
export interface GetUsersResponse {
  /** Общее количество активных или приглашённых пользователей */
  total: number;
  /** Количество активных или приглашённых пользователей на текущей странице */
  countInResponse: number;
  /** Информация о пользователях */
  users: UserInfo[];
}

/**
 * Параметры запроса для получения списка пользователей
 */
export interface GetUsersParams {
  /**
   * Количество активных или приглашённых пользователей в ответе
   * @default 100
   * Maximum: 100
   */
  limit?: number;
  /**
   * Сколько элементов пропустить. Например, для значения 10 ответ начнется с 11 элемента
   * @default 0
   */
  offset?: number;
  /**
   * Фильтр по типу пользователей:
   * - `true` — список приглашённых пользователей, которые ещё не активировали доступ
   * - `false` или не указан — список активных пользователей профиля продавца
   * @default false
   */
  isInviteOnly?: boolean;
}

/**
 * Запрос на создание приглашения пользователя
 */
export interface CreateInviteRequest {
  /** Настройки доступа (если пустой массив или не указан — доступы по умолчанию) */
  access?: AccessItem[];
  /** Данные приглашения */
  invite: {
    /** Номер телефона пользователя для приглашения */
    phoneNumber: string;
    /**
     * Должность пользователя
     * Max length: 150
     */
    position?: string;
  };
}

/**
 * Ответ на запрос создания приглашения
 */
export interface CreateInviteResponse {
  /**
   * ID приглашения
   * Format: uuid
   */
  inviteID: string;
  /**
   * Дата и время окончания срока действия приглашения
   * Format: date-time
   */
  expiredAt: string;
  /**
   * Результат создания приглашения:
   * - `true` — приглашение создано успешно
   * - `false` — повторите запрос
   */
  isSuccess: boolean;
  /**
   * URL приглашения, по которому должен перейти пользователь
   * Format: uri
   */
  inviteUrl: string;
}

/**
 * Настройки доступа для конкретного пользователя
 */
export interface UserAccess {
  /** ID пользователя */
  userId?: number;
  /** Настройки доступа к разделам профиля продавца */
  access?: AccessItem[];
}

/**
 * Запрос на обновление настроек доступа пользователей
 */
export interface UpdateUserAccessRequest {
  /** Настройки доступа для пользователей */
  usersAccesses: UserAccess[];
}

/**
 * Ответ с информацией об ошибке от User Management API
 */
export interface UserManagementErrorResponse {
  /** Заголовок ошибки */
  title: string;
  /** Детали ошибки */
  detail: string;
  /** ID запроса */
  requestId: string;
  /** Название внутреннего сервиса */
  origin: string;
  /** HTTP статус-код */
  status: number;
}
