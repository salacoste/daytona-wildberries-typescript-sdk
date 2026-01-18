# Краткое руководство по началу работы

Начните работу с Wildberries TypeScript SDK за 5 минут.

## Что вы изучите

- Установка SDK
- Инициализация с вашим API ключом
- Выполнение первого API вызова
- Обработка базовых ошибок

**Примерное время:** 5 минут

---

## Требования

- Node.js ≥ 20.0.0
- npm ≥ 10.0.0
- API ключ Wildberries ([получить можно здесь](https://seller.wildberries.ru/))

---

## Шаг 1: Установка (1 минута)

Установите SDK через npm:

```bash
npm install daytona-wildberries-typescript-sdk
```

Проверьте установку:

```bash
npm list daytona-wildberries-typescript-sdk
```

---

## Шаг 2: Инициализация SDK (1 минута)

Создайте новый файл `index.ts` и инициализируйте SDK:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Инициализация с вашим API ключом
const sdk = new WildberriesSDK({
  apiKey: 'ВАШ_API_КЛЮЧ_ЗДЕСЬ' // Замените на ваш настоящий ключ
});

console.log('SDK инициализирован успешно!');
```

---

## Шаг 3: Выполните ваш первый API вызов (2 минуты)

Давайте получим категории товаров:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY // Используйте переменную окружения
});

async function main() {
  try {
    // Получение родительских категорий
    const categories = await sdk.products.getParentAll();

    console.log('Категории:', categories.data);
    console.log('Успех! 🎉');
  } catch (error) {
    console.error('Ошибка:', error.message);
  }
}

main();
```

**Запустите скрипт:**

```bash
# Установите ваш API ключ как переменную окружения
export WB_API_KEY='ваш_api_ключ_здесь'

# Запустите скрипт
npx tsx index.ts
```

**Ожидаемый результат:**

```
Категории: [
  { id: 1, name: 'Электроника' },
  { id: 2, name: 'Бытовая химия' },
  ...
]
Успех! 🎉
```

---

## Распространенные проблемы при первом запуске

**Проблема: "Ошибка аутентификации"**
- ✅ **Решение**: Убедитесь, что ваш API ключ правильный и активный

**Проблема: "Превышен лимит запросов"**
- ✅ **Решение**: SDK автоматически обрабатывает лимиты с повторными попытками

**Проблема: "Таймаут сети"**
- ✅ **Решение**: Проверьте ваше интернет-соединение и статус API Wildberries

---

## Следующие шаги

Теперь, когда вы выполнили свой первый API вызов, изучите:

1. **[Учебные руководства](tutorials/)** - Пошаговые руководства для распространенных сценариев
2. **[Справочник по API](../api/)** - Полная документация по методам
3. **[Примеры кода](../examples/)** - Рабочие примеры кода
4. **[Лучшие практики](../guides/best-practices.md)** - Паттерны для production-среды

---

**Поздравляем! Вы готовы к разработке с Wildberries API.** 🚀

[← Назад к Началу работы](index.md) | [Главная страница документации](../index.md) | [English Version](../../getting-started/quickstart.md)
