/**
 * User Management Module - Управление пользователями профиля продавца
 *
 * This example demonstrates the complete user management workflow:
 * - Creating invitations for new team members with custom access settings
 * - Listing active and invited users with pagination
 * - Updating user access rights to specific seller profile sections
 * - Deleting users from the seller profile
 *
 * **Complexity**: 🟢 Beginner
 * **Estimated Time**: 10 minutes
 *
 * **Prerequisites:**
 * - Valid Wildberries API key set in WB_API_KEY environment variable
 * - Owner-level permissions on the seller profile
 *
 * **What This Example Covers:**
 * - **Invitations**: Create invite links with phone number, position, and access settings
 * - **User Listing**: Fetch active and invited users with pagination
 * - **Access Management**: Grant or revoke access to 14 profile sections
 * - **User Deletion**: Remove users from the seller profile
 * - **Complete Workflow**: Invite -> list -> update access -> delete
 * - **Error Handling**: Authentication, rate limits, validation, network errors
 *
 * **Access Codes Reference (14 sections):**
 * - `balance` — Просмотр баланса и вывод средств
 * - `brands` — Управление брендами
 * - `changeJam` — Подключение подписки Джем
 * - `discountPrice` — Цены, скидки и акции
 * - `finance` — Финансовая аналитика
 * - `showcase` — Витрина магазина
 * - `suppliersDocuments` — Документы продавца
 * - `supply` — Поставки FBW
 * - `feedbacksQuestions` — Вопросы и отзывы
 * - `questions` — Вопросы покупателей
 * - `pinFeedbacks` — Закрепление отзывов
 * - `pointsForReviews` — Баллы за отзывы
 * - `feedbacks` — Отзывы покупателей
 * - `wbPoint` — WB Point
 *
 * **Expected Output:**
 * ```
 * === Управление пользователями профиля продавца ===
 *
 * Step 1: Создание приглашения для нового пользователя...
 *   Приглашение создано!
 *   ID: a1b2c3d4-...
 *   URL: https://...
 *   Действительно до: 2024-03-20T12:00:00Z
 *
 * Step 2: Получение списка активных пользователей...
 *   Всего пользователей: 5
 *   1. Иван Петров (Менеджер) — role: user
 *   2. Мария Сидорова (Аналитик) — role: user
 *
 * Step 3: Обновление прав доступа пользователя...
 *   Доступ обновлён для пользователя ID: 12345
 *
 * Step 4: Удаление пользователя из профиля...
 *   Пользователь ID: 67890 удалён
 * ```
 *
 * **Usage:**
 * ```bash
 * export WB_API_KEY="your_api_key_here"
 * tsx examples/user-management.ts
 * ```
 *
 * **Related Examples:**
 * - general.ts - General module (ping, news, seller info)
 * - quickstart.ts - SDK quickstart guide
 *
 * **Common Issues:**
 * - "Invalid phone number": Phone must include country code (e.g., +79991234567)
 * - "Access denied": Only the profile owner can manage users
 * - "User not found": Verify user ID via getUsers() before updating/deleting
 *
 * @see {@link https://dev.wildberries.ru/openapi/api-information#tag/Upravlenie-polzovatelyami-prodavca}
 */

import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError,
} from '../src';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function main() {
  console.log('=== Управление пользователями профиля продавца ===\n');

  try {
    // ============================================================================
    // Step 1: Создание приглашения для нового пользователя
    // Указываем телефон, должность и настройки доступа к разделам профиля.
    // Если массив `access` пустой — применяются доступы по умолчанию.
    // ============================================================================
    console.log('Step 1: Создание приглашения для нового пользователя...');

    const inviteResult = await sdk.userManagement.createInvite({
      invite: {
        phoneNumber: '+79991234567',
        position: 'Менеджер по продажам',
      },
      access: [
        // Разрешаем доступ к ключевым разделам
        { code: 'balance', disabled: false },
        { code: 'finance', disabled: false },
        { code: 'showcase', disabled: false },
        { code: 'discountPrice', disabled: false },
        // Запрещаем доступ к чувствительным разделам
        { code: 'suppliersDocuments', disabled: true },
        { code: 'brands', disabled: true },
        { code: 'changeJam', disabled: true },
        { code: 'supply', disabled: true },
      ],
    });

    if (inviteResult.isSuccess) {
      console.log('  Приглашение создано!');
      console.log(`    ID: ${inviteResult.inviteID}`);
      console.log(`    URL: ${inviteResult.inviteUrl}`);
      console.log(`    Действительно до: ${inviteResult.expiredAt}`);
    } else {
      console.log('  Не удалось создать приглашение. Повторите запрос.');
    }
    console.log('');

    // ============================================================================
    // Step 2: Получение списка активных пользователей с пагинацией
    // isInviteOnly: false — активные пользователи, true — только приглашённые
    // ============================================================================
    console.log('Step 2: Получение списка активных пользователей...');

    // Первая страница — активные пользователи
    const activeUsers = await sdk.userManagement.getUsers({
      limit: 50,
      offset: 0,
      isInviteOnly: false,
    });

    console.log(`  Всего активных пользователей: ${activeUsers.total}`);
    console.log(`  На текущей странице: ${activeUsers.countInResponse}\n`);

    activeUsers.users.forEach((user, index) => {
      const ownerBadge = user.isOwner ? ' [Владелец]' : '';
      const roleName = user.role === 'user' ? 'user' : 'не активирован';
      console.log(
        `  ${index + 1}. ${user.firstName} ${user.secondName} (${user.position || 'Без должности'}) — role: ${roleName}${ownerBadge}`
      );
      console.log(`     Телефон: ${user.phone || 'N/A'}, Email: ${user.email || 'N/A'}`);

      // Показываем настройки доступа
      if (user.access && user.access.length > 0) {
        const enabled = user.access.filter((a) => !a.disabled).map((a) => a.code);
        const disabled = user.access.filter((a) => a.disabled).map((a) => a.code);

        if (enabled.length > 0) {
          console.log(`     Доступ разрешён: ${enabled.join(', ')}`);
        }
        if (disabled.length > 0) {
          console.log(`     Доступ запрещён: ${disabled.join(', ')}`);
        }
      }
      console.log('');
    });

    // ============================================================================
    // Step 2b: Получение приглашённых пользователей (ещё не активировали доступ)
    // ============================================================================
    console.log('Step 2b: Получение приглашённых пользователей...');

    const invitedUsers = await sdk.userManagement.getUsers({
      limit: 50,
      offset: 0,
      isInviteOnly: true,
    });

    console.log(`  Всего приглашённых: ${invitedUsers.total}\n`);

    invitedUsers.users.forEach((user, index) => {
      console.log(
        `  ${index + 1}. ${user.firstName || 'Ожидает активации'} ${user.secondName || ''}`
      );
      console.log(`     Телефон: ${user.phone || 'N/A'}`);

      if (user.inviteeInfo) {
        console.log(
          `     Статус приглашения: ${user.inviteeInfo.isActive ? 'Активно' : 'Неактивно'}`
        );
        if (user.inviteeInfo.expiredAt) {
          console.log(`     Действительно до: ${user.inviteeInfo.expiredAt}`);
        }
      }
      console.log('');
    });

    // ============================================================================
    // Step 2c: Полная пагинация по всем пользователям
    // ============================================================================
    console.log('Step 2c: Пагинация по всем пользователям...');

    let allUsers: typeof activeUsers.users = [];
    let offset = 0;
    const pageSize = 100;
    let totalExpected = 0;

    do {
      const page = await sdk.userManagement.getUsers({
        limit: pageSize,
        offset,
      });

      totalExpected = page.total;
      allUsers = allUsers.concat(page.users);
      offset += page.countInResponse;

      console.log(
        `  Загружено: ${allUsers.length}/${totalExpected} (страница offset=${offset - page.countInResponse})`
      );

      // Защита от бесконечного цикла
      if (page.countInResponse === 0) break;
    } while (allUsers.length < totalExpected);

    console.log(`  Итого загружено пользователей: ${allUsers.length}\n`);

    // ============================================================================
    // Step 3: Обновление прав доступа пользователя
    // disabled: true — запретить доступ, false — разрешить доступ
    // ============================================================================
    console.log('Step 3: Обновление прав доступа пользователя...');

    // Находим первого не-владельца для обновления
    const targetUser = activeUsers.users.find((u) => !u.isOwner);

    if (targetUser) {
      // Предоставляем расширенный доступ к финансовым и аналитическим разделам
      await sdk.userManagement.updateUserAccess({
        usersAccesses: [
          {
            userId: targetUser.id,
            access: [
              { code: 'balance', disabled: false },
              { code: 'finance', disabled: false },
              { code: 'showcase', disabled: false },
              { code: 'discountPrice', disabled: false },
              { code: 'feedbacksQuestions', disabled: false },
              { code: 'feedbacks', disabled: false },
              { code: 'questions', disabled: false },
              { code: 'pinFeedbacks', disabled: false },
              { code: 'pointsForReviews', disabled: false },
              { code: 'wbPoint', disabled: false },
              // Ограничиваем доступ к административным разделам
              { code: 'suppliersDocuments', disabled: true },
              { code: 'brands', disabled: true },
              { code: 'changeJam', disabled: true },
              { code: 'supply', disabled: true },
            ],
          },
        ],
      });

      console.log(
        `  Доступ обновлён для пользователя: ${targetUser.firstName} ${targetUser.secondName} (ID: ${targetUser.id})`
      );
      console.log('    Разрешено: balance, finance, showcase, discountPrice, feedbacksQuestions,');
      console.log('               feedbacks, questions, pinFeedbacks, pointsForReviews, wbPoint');
      console.log('    Запрещено: suppliersDocuments, brands, changeJam, supply');
    } else {
      console.log('  Нет доступных пользователей для обновления (только владелец).');
    }
    console.log('');

    // ============================================================================
    // Step 3b: Массовое обновление доступа для нескольких пользователей
    // ============================================================================
    console.log('Step 3b: Массовое обновление доступа...');

    const nonOwnerUsers = activeUsers.users.filter((u) => !u.isOwner);

    if (nonOwnerUsers.length >= 2) {
      await sdk.userManagement.updateUserAccess({
        usersAccesses: nonOwnerUsers.slice(0, 2).map((user) => ({
          userId: user.id,
          access: [
            { code: 'showcase', disabled: false },
            { code: 'feedbacks', disabled: false },
            { code: 'questions', disabled: false },
          ],
        })),
      });

      console.log(`  Доступ обновлён для ${Math.min(nonOwnerUsers.length, 2)} пользователей.`);
      console.log('  Всем предоставлен доступ к: showcase, feedbacks, questions');
    } else {
      console.log('  Недостаточно пользователей для массового обновления.');
    }
    console.log('');

    // ============================================================================
    // Step 4: Удаление пользователя из профиля
    // После удаления пользователь теряет доступ ко всем разделам.
    // ВНИМАНИЕ: Действие необратимо. Используйте с осторожностью.
    // ============================================================================
    console.log('Step 4: Удаление пользователя из профиля...');
    console.log('  ВНИМАНИЕ: В данном примере удаление закомментировано.');
    console.log('  Раскомментируйте код ниже для реального удаления.\n');

    // Пример удаления (закомментировано для безопасности):
    // const userToDelete = activeUsers.users.find((u) => !u.isOwner);
    // if (userToDelete) {
    //   await sdk.userManagement.deleteUser(userToDelete.id);
    //   console.log(`  Пользователь ${userToDelete.firstName} ${userToDelete.secondName} (ID: ${userToDelete.id}) удалён.`);
    // }

    // Демонстрация вызова с известным ID:
    console.log('  Пример вызова:');
    console.log('    await sdk.userManagement.deleteUser(12345);');
    console.log('    // Пользователь с ID 12345 будет удалён из профиля продавца.\n');

    // ============================================================================
    // Summary
    // ============================================================================
    console.log('=== Управление пользователями — Завершено ===\n');

    console.log('Жизненный цикл пользователя:');
    console.log('  1. Создать приглашение: createInvite() — возвращает URL для перехода');
    console.log('  2. Пользователь активирует доступ по ссылке');
    console.log('  3. Просмотреть список: getUsers() — активные и приглашённые');
    console.log('  4. Настроить доступ: updateUserAccess() — 14 разделов профиля');
    console.log('  5. Удалить пользователя: deleteUser() — необратимое действие\n');

    console.log('Лимиты API:');
    console.log('  - createInvite: 60 запросов/мин, интервал 1 сек, всплеск 5');
    console.log('  - getUsers:     60 запросов/мин, интервал 1 сек, всплеск 5');
    console.log('  - updateAccess: 60 запросов/мин, интервал 1 сек, всплеск 5');
    console.log('  - deleteUser:   60 запросов/мин, интервал 1 сек, всплеск 10');
  } catch (error) {
    console.error('\nОшибка в процессе управления пользователями:');

    if (error instanceof RateLimitError) {
      console.error(`  Превышен лимит запросов: ${error.message}`);
      console.error(`  Повторите через: ${error.retryAfter}мс`);
      console.error('  User Management API: 60 запросов/мин с интервалом 1 сек');
    } else if (error instanceof AuthenticationError) {
      console.error(`  Ошибка аутентификации: ${error.message}`);
      console.error('  Проверьте API-ключ и наличие прав владельца профиля.');
    } else if (error instanceof ValidationError) {
      console.error(`  Ошибка валидации: ${error.message}`);
      console.error('  Частые причины:');
      console.error('  - Неверный формат номера телефона');
      console.error('  - Несуществующий userId');
      console.error('  - Некорректный код доступа (accessCode)');
    } else if (error instanceof NetworkError) {
      console.error(`  Ошибка сети: ${error.message}`);
      console.error('  Проверьте подключение к user-management-api.wildberries.ru');
    } else if (error instanceof WBAPIError) {
      console.error(`  Ошибка API (${error.statusCode}): ${error.message}`);
      console.error('  Документация: https://dev.wildberries.ru/openapi/api-information');
    } else if (error instanceof Error) {
      console.error(`  Непредвиденная ошибка: ${error.message}`);
    } else {
      console.error('  Неизвестная ошибка:', error);
    }

    process.exit(1);
  }
}

// Run the example
main();
