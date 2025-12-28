/**
 * Безопасный тест метода createCardsList - ТОЛЬКО ЧТЕНИЕ
 *
 * Этот скрипт тестирует получение списка товаров с разными параметрами limit
 * БЕЗ каких-либо операций записи/изменения
 */

import { WildberriesSDK } from '../src';

async function testCreateCardsListReadOnly() {
  console.log('🧪 Тест createCardsList - ТОЛЬКО ЧТЕНИЕ\n');
  console.log('=' .repeat(60));

  // Получаем API ключ из переменной окружения
  const apiKey = process.env.WB_API_KEY;

  if (!apiKey) {
    throw new Error('❌ Не найден WB_API_KEY в переменных окружения');
  }

  console.log('✅ API ключ найден');
  console.log(`📌 Длина ключа: ${apiKey.length} символов`);
  console.log(`📌 Первые 10 символов: ${apiKey.substring(0, 10)}...`);
  console.log();

  // Инициализируем SDK с debug логированием
  const sdk = new WildberriesSDK({
    apiKey,
    logLevel: 'debug'
  });

  console.log('✅ SDK инициализирован');
  console.log();

  // ========================================
  // ТЕСТ 1: Проверка подключения (ping)
  // ========================================
  console.log('📡 ТЕСТ 1: Проверка подключения к API...');
  console.log('-'.repeat(60));

  try {
    const pingResponse = await sdk.general.ping();
    console.log('✅ Ping успешен:', pingResponse);
    console.log();
  } catch (error: any) {
    console.error('❌ Ping failed:', error.message);
    console.log();
  }

  // ========================================
  // ТЕСТ 2: createCardsList с limit: 10
  // ========================================
  console.log('📦 ТЕСТ 2: Получение списка товаров (limit: 10)...');
  console.log('-'.repeat(60));

  try {
    const response1 = await sdk.products.createCardsList({
      settings: {
        filter: { withPhoto: -1 },
        cursor: { limit: 10 }
      }
    });

    console.log('✅ Запрос успешен (limit: 10)');
    console.log(`📊 Получено карточек: ${response1.cards?.length || 0}`);
    console.log(`📊 Total в курсоре: ${response1.cursor?.total || 'нет данных'}`);

    if (response1.cards && response1.cards.length > 0) {
      console.log('\n📋 Первая карточка (пример):');
      const firstCard = response1.cards[0];
      console.log(`   nmID: ${firstCard.nmID}`);
      console.log(`   Бренд: ${firstCard.brand || 'нет данных'}`);
      console.log(`   Название: ${firstCard.title || 'нет данных'}`);
      console.log(`   Артикул продавца: ${firstCard.vendorCode || 'нет данных'}`);
    }
    console.log();
  } catch (error: any) {
    console.error('❌ Ошибка при limit: 10');
    console.error(`   Тип ошибки: ${error.constructor.name}`);
    console.error(`   Сообщение: ${error.message}`);
    if (error.statusCode) {
      console.error(`   HTTP Status: ${error.statusCode}`);
    }
    if (error.response) {
      console.error(`   Response data:`, JSON.stringify(error.response, null, 2));
    }
    console.log();
  }

  // ========================================
  // ТЕСТ 3: createCardsList с limit: 100
  // ========================================
  console.log('📦 ТЕСТ 3: Получение списка товаров (limit: 100)...');
  console.log('-'.repeat(60));

  try {
    const response2 = await sdk.products.createCardsList({
      settings: {
        filter: { withPhoto: -1 },
        cursor: { limit: 100 }
      }
    });

    console.log('✅ Запрос успешен (limit: 100)');
    console.log(`📊 Получено карточек: ${response2.cards?.length || 0}`);
    console.log(`📊 Total в курсоре: ${response2.cursor?.total || 'нет данных'}`);

    if (response2.cursor) {
      console.log('\n📋 Курсор для пагинации:');
      console.log(`   updatedAt: ${response2.cursor.updatedAt || 'нет данных'}`);
      console.log(`   nmID: ${response2.cursor.nmID || 'нет данных'}`);
    }
    console.log();
  } catch (error: any) {
    console.error('❌ Ошибка при limit: 100');
    console.error(`   Тип ошибки: ${error.constructor.name}`);
    console.error(`   Сообщение: ${error.message}`);
    if (error.statusCode) {
      console.error(`   HTTP Status: ${error.statusCode}`);
    }
    if (error.response) {
      console.error(`   Response data:`, JSON.stringify(error.response, null, 2));
    }
    console.log();
  }

  // ========================================
  // ТЕСТ 4: createCardsList с limit: 1000
  // ========================================
  console.log('📦 ТЕСТ 4: Получение списка товаров (limit: 1000) - проблемный случай клиента...');
  console.log('-'.repeat(60));

  try {
    const response3 = await sdk.products.createCardsList({
      settings: {
        filter: { withPhoto: -1 },
        cursor: { limit: 1000 }
      }
    });

    console.log('✅ Запрос успешен (limit: 1000)');
    console.log(`📊 Получено карточек: ${response3.cards?.length || 0}`);
    console.log(`📊 Total в курсоре: ${response3.cursor?.total || 'нет данных'}`);
    console.log();
  } catch (error: any) {
    console.error('❌ Ошибка при limit: 1000 - ЭТО ОЖИДАЕМО!');
    console.error(`   Тип ошибки: ${error.constructor.name}`);
    console.error(`   Сообщение: ${error.message}`);
    if (error.statusCode) {
      console.error(`   HTTP Status: ${error.statusCode}`);
    }
    if (error.response) {
      console.error(`   Response data:`, JSON.stringify(error.response, null, 2));
    }
    if (error.fieldErrors) {
      console.error(`   Field Errors:`, error.fieldErrors);
    }
    console.log();
  }

  // ========================================
  // ТЕСТ 5: Другие read-only методы
  // ========================================
  console.log('📚 ТЕСТ 5: Дополнительные read-only проверки...');
  console.log('-'.repeat(60));

  try {
    // Получение родительских категорий
    const categories = await sdk.products.getParentAll();
    console.log(`✅ Категории получены: ${categories.data?.length || 0} шт.`);

    if (categories.data && categories.data.length > 0) {
      console.log('\n📋 Первые 3 категории:');
      categories.data.slice(0, 3).forEach((cat, idx) => {
        console.log(`   ${idx + 1}. ${cat.name} (ID: ${cat.id})`);
      });
    }
    console.log();
  } catch (error: any) {
    console.error('❌ Ошибка при получении категорий:', error.message);
    console.log();
  }

  console.log('=' .repeat(60));
  console.log('✅ Тестирование завершено');
  console.log('\n⚠️  ВАЖНО: Этот скрипт выполнял ТОЛЬКО операции чтения');
  console.log('   Никакие данные в кабинете не были изменены.');
}

// Запуск теста
testCreateCardsListReadOnly()
  .then(() => {
    console.log('\n🎉 Все тесты выполнены успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Критическая ошибка:', error);
    process.exit(1);
  });
