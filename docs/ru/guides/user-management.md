---
title: Руководство по управлению пользователями
description: Полное руководство по управлению пользователями профиля продавца, приглашениями и правами доступа с помощью Wildberries TypeScript SDK
layout: doc
---

# Руководство по управлению пользователями

Это руководство охватывает всё, что нужно знать для управления пользователями, создания приглашений и контроля прав доступа к вашему профилю продавца Wildberries.

## Содержание

- [Что такое управление пользователями?](#что-такое-управление-пользователями)
- [Ключевые возможности](#ключевые-возможности)
- [Предварительные требования](#предварительные-требования)
- [Быстрый старт](#быстрый-старт)
- [Полный пример рабочего процесса](#полный-пример-рабочего-процесса)
- [Справочник кодов доступа](#справочник-кодов-доступа)
- [Методы API](#методы-api)
- [Обработка ошибок](#обработка-ошибок)
- [Лимиты запросов](#лимиты-запросов)
- [Лучшие практики](#лучшие-практики)
- [Связанные ресурсы](#связанные-ресурсы)

## Что такое управление пользователями?

**API управления пользователями** позволяет управлять доступом команды к вашему профилю продавца Wildberries. Вы можете:

- **Приглашать новых пользователей** для совместной работы с аккаунтом продавца
- **Контролировать разрешения** каждого пользователя по 14 различным разделам
- **Отслеживать активность пользователей** и контролировать ожидающие приглашения
- **Отзывать доступ** при уходе сотрудников

Это необходимо для компаний с несколькими сотрудниками, управляющими различными аспектами работы на Wildberries (финансы, поддержка клиентов, складские запасы и т.д.).

## Ключевые возможности

| Функция | Описание | Ключевые методы |
|---------|----------|-----------------|
| **Создание приглашений** | Приглашение новых пользователей по номеру телефона | `createInvite()` |
| **Список пользователей** | Просмотр всех активных и приглашённых пользователей | `getUsers()` |
| **Обновление разрешений** | Изменение доступа пользователей к разделам | `updateUserAccess()` |
| **Удаление пользователей** | Полное удаление доступа пользователя | `deleteUser()` |

## Предварительные требования

### Установка SDK

```bash
npm install daytona-wildberries-typescript-sdk
```

### Настройка API-ключа

Вам нужен действующий API-ключ Wildberries с разрешениями на управление пользователями. Создайте файл `.env`:

```bash
WB_API_KEY=your_api_key_here
```

### Импорт и инициализация

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

## Быстрый старт

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function main() {
  // Получить список всех пользователей профиля продавца
  const users = await sdk.general.getUsers();
  console.log(`Всего пользователей: ${users.total}`);

  for (const user of users.users) {
    console.log(`- ${user.firstName} ${user.secondName} (${user.email})`);
    console.log(`  Роль: ${user.role || 'ожидание'}`);
    console.log(`  Владелец: ${user.isOwner}`);
  }
}

main();
```

## Полный пример рабочего процесса

Этот пример демонстрирует полный жизненный цикл управления пользователями: приглашение пользователя, просмотр списка, обновление разрешений и удаление пользователя.

### Шаг 1: Создание приглашения

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { AccessCode, AccessItem } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function inviteNewUser() {
  // Определяем разрешения доступа для нового пользователя
  const accessPermissions: AccessItem[] = [
    { code: 'feedbacksQuestions', disabled: false }, // Разрешить доступ к вопросам и отзывам
    { code: 'finance', disabled: false },            // Разрешить просмотр финансов
    { code: 'balance', disabled: true },             // Запретить доступ к балансу/выводу средств
    { code: 'supply', disabled: true }               // Запретить создание поставок
  ];

  const result = await sdk.general.createInvite({
    invite: {
      phoneNumber: '79991234567',
      position: 'Менеджер поддержки клиентов'
    },
    access: accessPermissions
  });

  console.log('Приглашение успешно создано!');
  console.log(`ID приглашения: ${result.inviteID}`);
  console.log(`Ссылка приглашения: ${result.inviteUrl}`);
  console.log(`Срок действия: ${result.expiredAt}`);

  // Отправьте inviteUrl новому пользователю
  return result;
}
```

### Шаг 2: Просмотр всех пользователей

```typescript
async function listAllUsers() {
  // Получить всех пользователей с пагинацией
  const activeUsers = await sdk.general.getUsers({
    limit: 100,
    offset: 0,
    isInviteOnly: false // Только активные пользователи
  });

  console.log('\n=== Активные пользователи ===');
  console.log(`Всего: ${activeUsers.total}`);

  for (const user of activeUsers.users) {
    console.log(`\nID пользователя: ${user.id}`);
    console.log(`Имя: ${user.firstName} ${user.secondName}`);
    console.log(`Телефон: ${user.phone}`);
    console.log(`Email: ${user.email}`);
    console.log(`Должность: ${user.position}`);
    console.log(`Владелец: ${user.isOwner}`);

    // Показать разрешения доступа
    console.log('Разрешения:');
    for (const access of user.access) {
      const status = access.disabled ? 'ЗАПРЕЩЕНО' : 'РАЗРЕШЕНО';
      console.log(`  ${access.code}: ${status}`);
    }
  }

  // Получить ожидающие приглашения
  const pendingInvites = await sdk.general.getUsers({
    limit: 100,
    offset: 0,
    isInviteOnly: true // Только приглашённые пользователи
  });

  console.log('\n=== Ожидающие приглашения ===');
  console.log(`Всего: ${pendingInvites.total}`);

  for (const user of pendingInvites.users) {
    if (user.inviteeInfo) {
      console.log(`\nТелефон: ${user.inviteeInfo.phoneNumber}`);
      console.log(`Должность: ${user.inviteeInfo.position}`);
      console.log(`Срок действия: ${user.inviteeInfo.expiredAt}`);
      console.log(`Активно: ${user.inviteeInfo.isActive}`);
    }
  }

  return { activeUsers, pendingInvites };
}
```

### Шаг 3: Обновление разрешений пользователя

```typescript
async function updateUserPermissions(userId: number) {
  // Предоставить доступ к финансам и документам, запретить доступ к балансу
  await sdk.general.updateUserAccess({
    usersAccesses: [
      {
        userId: userId,
        access: [
          { code: 'finance', disabled: false },
          { code: 'suppliersDocuments', disabled: false },
          { code: 'balance', disabled: true },
          { code: 'brands', disabled: true }
        ]
      }
    ]
  });

  console.log(`Разрешения обновлены для пользователя ${userId}`);
}

// Обновление нескольких пользователей одновременно
async function bulkUpdatePermissions() {
  await sdk.general.updateUserAccess({
    usersAccesses: [
      {
        userId: 12345,
        access: [
          { code: 'finance', disabled: false },
          { code: 'balance', disabled: true }
        ]
      },
      {
        userId: 67890,
        access: [
          { code: 'feedbacksQuestions', disabled: false },
          { code: 'supply', disabled: true }
        ]
      }
    ]
  });

  console.log('Массовое обновление разрешений завершено');
}
```

### Шаг 4: Удаление пользователя

```typescript
async function removeUser(userId: number) {
  await sdk.general.deleteUser(userId);
  console.log(`Пользователь ${userId} удалён из профиля продавца`);
}
```

### Полный скрипт управления

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { AccessItem, UserInfo } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function manageTeam() {
  // 1. Пригласить нового сотрудника поддержки
  const invite = await sdk.general.createInvite({
    invite: {
      phoneNumber: '79991234567',
      position: 'Агент поддержки'
    },
    access: [
      { code: 'feedbacksQuestions', disabled: false },
      { code: 'questions', disabled: false },
      { code: 'feedbacks', disabled: false }
    ]
  });
  console.log(`Новый пользователь приглашён: ${invite.inviteUrl}`);

  // 2. Просмотреть текущих участников команды
  const { users, total } = await sdk.general.getUsers({ limit: 100 });
  console.log(`\nРазмер команды: ${total}`);

  // 3. Найти пользователей без доступа к финансам и предоставить его
  for (const user of users) {
    if (user.isOwner) continue; // Пропустить владельца

    const hasFinanceAccess = user.access.find(
      a => a.code === 'finance' && !a.disabled
    );

    if (!hasFinanceAccess) {
      console.log(`Предоставление доступа к финансам для ${user.firstName}`);
      await sdk.general.updateUserAccess({
        usersAccesses: [{
          userId: user.id,
          access: [{ code: 'finance', disabled: false }]
        }]
      });
    }
  }

  // 4. Удалить неактивных пользователей (нет роли = не активирован)
  const inactiveUsers = users.filter(u => !u.role && !u.isOwner);
  for (const user of inactiveUsers) {
    console.log(`Удаление неактивного пользователя: ${user.id}`);
    await sdk.general.deleteUser(user.id);
  }

  console.log('\nУправление командой завершено!');
}

manageTeam().catch(console.error);
```

## Справочник кодов доступа

Следующие коды доступа контролируют, к каким разделам может обращаться пользователь:

| Код доступа | Описание | Раздел |
|-------------|----------|--------|
| `balance` | Просмотр баланса счёта и вывод средств | Финансы |
| `brands` | Управление настройками брендов | Настройки |
| `changeJam` | Изменение настроек подписки Jam | Подписка |
| `discountPrice` | Изменение цен, установка скидок, запуск акций | Ценообразование |
| `finance` | Просмотр финансовой аналитики и отчётов | Финансы |
| `showcase` | Управление витриной магазина и её внешним видом | Магазин |
| `suppliersDocuments` | Просмотр и скачивание документов | Документы |
| `supply` | Создание и управление поставками FBW | Логистика |
| `feedbacksQuestions` | Просмотр и ответы на вопросы и отзывы | Коммуникации |
| `questions` | Просмотр и ответы на вопросы покупателей | Коммуникации |
| `pinFeedbacks` | Закрепление/открепление отзывов на карточках товаров | Коммуникации |
| `pointsForReviews` | Управление кампаниями «баллы за отзывы» | Коммуникации |
| `feedbacks` | Просмотр и ответы на отзывы о товарах | Коммуникации |
| `wbPoint` | Управление настройками WB Point | Настройки |

### Логика разрешений

- `disabled: false` = Доступ **РАЗРЕШЁН**
- `disabled: true` = Доступ **ЗАПРЕЩЁН**

### Типовые шаблоны разрешений

**Агент поддержки клиентов:**
```typescript
const supportAccess: AccessItem[] = [
  { code: 'feedbacksQuestions', disabled: false },
  { code: 'questions', disabled: false },
  { code: 'feedbacks', disabled: false },
  { code: 'balance', disabled: true },
  { code: 'finance', disabled: true }
];
```

**Финансовый менеджер:**
```typescript
const financeAccess: AccessItem[] = [
  { code: 'balance', disabled: false },
  { code: 'finance', disabled: false },
  { code: 'suppliersDocuments', disabled: false },
  { code: 'discountPrice', disabled: true },
  { code: 'supply', disabled: true }
];
```

**Менеджер по складу:**
```typescript
const inventoryAccess: AccessItem[] = [
  { code: 'supply', disabled: false },
  { code: 'suppliersDocuments', disabled: false },
  { code: 'balance', disabled: true },
  { code: 'finance', disabled: true }
];
```

## Методы API

### createInvite(data)

Создаёт приглашение для нового пользователя.

```typescript
const result = await sdk.general.createInvite({
  invite: {
    phoneNumber: '79991234567',  // Обязательно
    position: 'Менеджер'         // Необязательно, макс. 150 символов
  },
  access: [                      // Необязательно
    { code: 'finance', disabled: false }
  ]
});

// Ответ
interface CreateInviteResponse {
  inviteID: string;      // UUID приглашения
  expiredAt: string;     // Дата/время истечения
  isSuccess: boolean;    // Статус создания
  inviteUrl: string;     // URL для принятия приглашения
}
```

### getUsers(params?)

Получает пользователей профиля продавца.

```typescript
const result = await sdk.general.getUsers({
  limit: 100,           // Макс. 100, по умолчанию 100
  offset: 0,            // По умолчанию 0
  isInviteOnly: false   // true = только приглашённые, false = только активные
});

// Ответ
interface GetUsersResponse {
  total: number;           // Общее количество пользователей
  countInResponse: number; // Пользователей в этом ответе
  users: UserInfo[];       // Список пользователей
}
```

### updateUserAccess(data)

Обновляет разрешения доступа для одного или нескольких пользователей.

```typescript
await sdk.general.updateUserAccess({
  usersAccesses: [
    {
      userId: 12345,
      access: [
        { code: 'finance', disabled: false },
        { code: 'balance', disabled: true }
      ]
    }
  ]
});
// При успехе возвращает void
```

### deleteUser(deletedUserID)

Удаляет пользователя из профиля продавца.

```typescript
await sdk.general.deleteUser(12345);
// При успехе возвращает void
```

## Обработка ошибок

### Комплексная обработка ошибок

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

async function safeInviteUser(phoneNumber: string) {
  try {
    const result = await sdk.general.createInvite({
      invite: { phoneNumber },
      access: [{ code: 'finance', disabled: false }]
    });
    return result;
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Превышен лимит запросов');
      console.error(`Повторить через: ${error.retryAfter} мс`);
      // SDK автоматически обрабатывает повторные попытки
    } else if (error instanceof AuthenticationError) {
      console.error('Неверный API-ключ -- проверьте ваши учётные данные');
      // Убедитесь, что разрешения API-ключа включают управление пользователями
    } else if (error instanceof ValidationError) {
      console.error('Некорректный запрос:', error.message);
      // Проверьте формат номера телефона (должен быть 11 цифр, начиная с 7)
    } else if (error instanceof NetworkError) {
      console.error('Сетевая ошибка:', error.message);
      // Проверьте подключение к user-management-api.wildberries.ru
    } else if (error instanceof WBAPIError) {
      console.error(`Ошибка API ${error.statusCode}: ${error.message}`);
    }
    throw error;
  }
}
```

### Типичные сценарии ошибок

| Ошибка | Причина | Решение |
|--------|---------|---------|
| 401 Unauthorized | Неверный или просроченный API-ключ | Перегенерируйте API-ключ с правами управления пользователями |
| 403 Forbidden | Недостаточно разрешений | Убедитесь, что API-ключ имеет доступ к управлению пользователями |
| 400 Bad Request | Неверный формат номера телефона | Используйте формат из 11 цифр, начиная с 7 |
| 404 Not Found | ID пользователя не существует | Сначала проверьте ID пользователя через getUsers() |
| 429 Rate Limit | Слишком много запросов | SDK обрабатывает автоматически с повторными попытками |

### Советы по валидации

```typescript
// Валидация номера телефона перед отправкой
function validatePhoneNumber(phone: string): boolean {
  // Российский формат: 7XXXXXXXXXX (11 цифр)
  return /^7\d{10}$/.test(phone);
}

// Проверка существования пользователя перед обновлением/удалением
async function ensureUserExists(userId: number): Promise<boolean> {
  const { users } = await sdk.general.getUsers({ limit: 100 });
  return users.some(u => u.id === userId);
}
```

## Лимиты запросов

API управления пользователями имеет следующие лимиты:

| Метод | Запросов/сек | Интервал | Всплеск |
|-------|-------------|----------|---------|
| `createInvite()` | 1 | 1 секунда | 5 |
| `getUsers()` | 1 | 1 секунда | 5 |
| `updateUserAccess()` | 1 | 1 секунда | 5 |
| `deleteUser()` | 1 | 1 секунда | 10 |

### Советы по лимитам запросов

- SDK автоматически обрабатывает лимиты запросов с очередью и повторными попытками
- Обновляйте разрешения нескольких пользователей за один вызов, используя массив `usersAccesses`
- Кэшируйте списки пользователей для сокращения обращений к API
- Используйте пагинацию эффективно (максимум 100 пользователей за запрос)

```typescript
// Эффективно: обновление нескольких пользователей за один вызов
await sdk.general.updateUserAccess({
  usersAccesses: [
    { userId: 1, access: [{ code: 'finance', disabled: false }] },
    { userId: 2, access: [{ code: 'finance', disabled: false }] },
    { userId: 3, access: [{ code: 'finance', disabled: false }] }
  ]
});

// Менее эффективно: отдельные вызовы для каждого пользователя
await sdk.general.updateUserAccess({ usersAccesses: [{ userId: 1, access: [...] }] });
await sdk.general.updateUserAccess({ usersAccesses: [{ userId: 2, access: [...] }] });
await sdk.general.updateUserAccess({ usersAccesses: [{ userId: 3, access: [...] }] });
```

## Лучшие практики

### 1. Используйте шаблоны разрешений на основе ролей

```typescript
const ROLE_TEMPLATES = {
  support: [
    { code: 'feedbacksQuestions', disabled: false },
    { code: 'questions', disabled: false },
    { code: 'feedbacks', disabled: false }
  ],
  finance: [
    { code: 'balance', disabled: false },
    { code: 'finance', disabled: false },
    { code: 'suppliersDocuments', disabled: false }
  ],
  logistics: [
    { code: 'supply', disabled: false },
    { code: 'suppliersDocuments', disabled: false }
  ],
  marketing: [
    { code: 'discountPrice', disabled: false },
    { code: 'showcase', disabled: false },
    { code: 'brands', disabled: false }
  ]
} as const;

async function inviteWithRole(phone: string, role: keyof typeof ROLE_TEMPLATES) {
  return sdk.general.createInvite({
    invite: { phoneNumber: phone, position: role },
    access: ROLE_TEMPLATES[role]
  });
}
```

### 2. Регулярно проводите аудит доступа пользователей

```typescript
async function auditUserAccess() {
  const { users } = await sdk.general.getUsers({ limit: 100 });

  console.log('\n=== Аудит доступа пользователей ===\n');

  for (const user of users) {
    if (user.isOwner) {
      console.log(`[ВЛАДЕЛЕЦ] ${user.firstName} ${user.secondName}`);
      continue;
    }

    // Проверка чувствительных разрешений
    const hasBalanceAccess = user.access.find(a => a.code === 'balance' && !a.disabled);
    const hasFinanceAccess = user.access.find(a => a.code === 'finance' && !a.disabled);

    if (hasBalanceAccess) {
      console.log(`[ВНИМАНИЕ] ${user.firstName} имеет доступ к БАЛАНСУ (может выводить средства)`);
    }

    if (!user.role) {
      console.log(`[ОЖИДАНИЕ] Пользователь ${user.id} не активировал свой аккаунт`);
    }
  }
}
```

### 3. Обрабатывайте просроченные приглашения

```typescript
async function cleanupExpiredInvitations() {
  const { users } = await sdk.general.getUsers({
    limit: 100,
    isInviteOnly: true
  });

  const now = new Date();

  for (const user of users) {
    if (user.inviteeInfo) {
      const expiry = new Date(user.inviteeInfo.expiredAt);

      if (expiry < now || !user.inviteeInfo.isActive) {
        console.log(`Удаление просроченного приглашения для ${user.inviteeInfo.phoneNumber}`);
        await sdk.general.deleteUser(user.id);
      }
    }
  }
}
```

### 4. Применяйте принцип минимальных привилегий

```typescript
// Предоставляйте только те разрешения, которые необходимы для данной роли
async function createRestrictedUser(phone: string, position: string) {
  // Начинаем без доступа
  const minimalAccess: AccessItem[] = [
    { code: 'balance', disabled: true },
    { code: 'brands', disabled: true },
    { code: 'changeJam', disabled: true },
    { code: 'discountPrice', disabled: true },
    { code: 'finance', disabled: true },
    { code: 'showcase', disabled: true },
    { code: 'suppliersDocuments', disabled: true },
    { code: 'supply', disabled: true },
    { code: 'feedbacksQuestions', disabled: true },
    { code: 'questions', disabled: true },
    { code: 'pinFeedbacks', disabled: true },
    { code: 'pointsForReviews', disabled: true },
    { code: 'feedbacks', disabled: true },
    { code: 'wbPoint', disabled: true }
  ];

  // Создаём пользователя с минимальным доступом, затем предоставляем конкретные разрешения по мере необходимости
  return sdk.general.createInvite({
    invite: { phoneNumber: phone, position },
    access: minimalAccess
  });
}
```

### 5. Логируйте все действия по управлению пользователями

```typescript
function logUserAction(action: string, details: Record<string, unknown>) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    action,
    ...details
  }));
}

async function inviteWithLogging(phone: string, position: string) {
  const result = await sdk.general.createInvite({
    invite: { phoneNumber: phone, position }
  });

  logUserAction('USER_INVITED', {
    inviteId: result.inviteID,
    phone: phone.slice(-4), // Логируем только последние 4 цифры
    position,
    expiresAt: result.expiredAt
  });

  return result;
}
```

## Связанные ресурсы

- [Справочник API: GeneralModule](/api/classes/GeneralModule)
- [Конфигурация лимитов запросов](/src/config/general-rate-limits.ts)
- [Справочник типов](/src/types/general.types.ts)
- [Официальный API управления пользователями WB](https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca)
