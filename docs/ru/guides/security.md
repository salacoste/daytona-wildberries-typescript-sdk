---
title: Руководство по безопасности
description: Лучшие практики безопасности для Wildberries SDK - управление API ключами, сетевая безопасность, защита данных и мониторинг
layout: doc
---

# Руководство по безопасности

Полное руководство по безопасности для безопасного использования Wildberries TypeScript SDK.

## Содержание

- [Обзор](#обзор)
- [Управление API ключами](#управление-api-ключами)
- [Безопасная конфигурация](#безопасная-конфигурация)
- [Сетевая безопасность](#сетевая-безопасность)
- [Защита данных](#защита-данных)
- [Обработка ошибок](#обработка-ошибок)
- [Логирование и мониторинг](#логирование-и-мониторинг)
- [Контрольный список безопасности](#контрольный-список-безопасности)

## Обзор

Безопасность имеет первостепенное значение при интеграции с Wildberries API. Это руководство охватывает лучшие практики защиты ваших API ключей, безопасной передачи данных и обработки конфиденциальной информации.

### Принципы безопасности

1. **Эшелонированная оборона**: Множественные уровни контроля безопасности
2. **Минимальные привилегии**: Предоставление минимально необходимых разрешений
3. **Безопасность по умолчанию**: Безопасность включена с самого начала
4. **Нулевое доверие**: Проверяйте всё, не доверяйте ничему
5. **Безопасный провал**: Безопасная обработка ошибок

## Управление API ключами

### Безопасное хранение API ключей

**❌ Никогда не делайте так:**

```typescript
// НЕ жестко кодируйте API ключи
const sdk = new WildberriesSDK({
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // ❌ ПЛОХО!
});

// НЕ коммитьте ключи в систему контроля версий
// НЕ делитесь ключами в чате/email
// НЕ храните ключи в frontend коде
```

**✅ Лучшие практики:**

```typescript
// Используйте переменные окружения
import dotenv from 'dotenv';
dotenv.config();

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY! // ✅ ХОРОШО!
});
```

### Конфигурация переменных окружения

**Файл `.env`** (добавьте в `.gitignore`):

```bash
# Конфигурация Wildberries API
WB_API_KEY=your_api_key_here
WB_API_TIMEOUT=30000
WB_API_MAX_RETRIES=3

# Никогда не коммитьте этот файл в систему контроля версий!
```

**Файл `.env.example`** (безопасно коммитить):

```bash
# Конфигурация Wildberries API
WB_API_KEY=your_api_key_here
WB_API_TIMEOUT=30000
WB_API_MAX_RETRIES=3
```

### Сервисы управления секретами

**AWS Secrets Manager:**

```typescript
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

async function getApiKey(): Promise<string> {
  const client = new SecretsManagerClient({ region: 'eu-west-1' });

  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: 'wildberries/api-key'
    })
  );

  return JSON.parse(response.SecretString!).apiKey;
}

const apiKey = await getApiKey();
const sdk = new WildberriesSDK({ apiKey });
```

**Azure Key Vault:**

```typescript
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

async function getApiKeyFromAzure(): Promise<string> {
  const credential = new DefaultAzureCredential();
  const vaultUrl = 'https://your-vault.vault.azure.net';

  const client = new SecretClient(vaultUrl, credential);
  const secret = await client.getSecret('wildberries-api-key');

  return secret.value!;
}
```

**HashiCorp Vault:**

```typescript
import vault from 'node-vault';

async function getApiKeyFromVault(): Promise<string> {
  const client = vault({
    apiVersion: 'v1',
    endpoint: 'http://127.0.0.1:8200',
    token: process.env.VAULT_TOKEN
  });

  const result = await client.read('secret/data/wildberries');
  return result.data.data.apiKey;
}
```

### Ротация API ключей

```typescript
class SecureSDKManager {
  private sdk: WildberriesSDK;
  private apiKey: string;

  constructor(initialApiKey: string) {
    this.apiKey = initialApiKey;
    this.sdk = new WildberriesSDK({ apiKey: this.apiKey });

    // Ротация ключа каждые 24 часа
    setInterval(() => this.rotateApiKey(), 24 * 60 * 60 * 1000);
  }

  private async rotateApiKey() {
    try {
      // Получить новый API ключ из безопасного хранилища
      const newApiKey = await getApiKey();

      // Создать новый экземпляр SDK с новым ключом
      this.sdk = new WildberriesSDK({ apiKey: newApiKey });

      // Безопасно удалить старый ключ
      this.apiKey = '';

      console.log('API ключ успешно ротирован');
    } catch (error) {
      console.error('Не удалось ротировать API ключ:', error);
    }
  }

  getSDK(): WildberriesSDK {
    return this.sdk;
  }
}
```

## Безопасная конфигурация

### Минимальная конфигурация

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  // Настройки безопасности
  timeout: 30000, // Таймаут 30 секунд предотвращает зависание
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
  },

  // Логирование (убедитесь, что конфиденциальные данные не логируются)
  logLevel: 'warn', // 'debug' только в разработке
});
```

### Валидация входных данных

```typescript
import { z } from 'zod';

const ProductIdSchema = z.number().int().positive();

async function getProduct(productId: unknown) {
  // Валидация входных данных перед использованием
  const validatedId = ProductIdSchema.parse(productId);

  try {
    return await sdk.products.getProductCard(validatedId);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new Error('Неверный формат ID товара');
    }
    throw error;
  }
}
```

### Защита от превышения лимита запросов

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  rateLimitConfig: {
    // Предотвращение случайного злоупотребления API
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  }
});
```

## Сетевая безопасность

### Только HTTPS

```typescript
// SDK принудительно использует HTTPS по умолчанию
// Все API вызовы используют зашифрованные соединения

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  // HTTPS всегда принудительно применяется - не может быть отключен
});
```

### Закрепление сертификатов (расширенная настройка)

```typescript
import https from 'https';
import axios from 'axios';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpClient: axios.create({
    httpsAgent: new https.Agent({
      // Включить валидацию сертификата
      rejectUnauthorized: true,

      // Опционально: Закрепление сертификата
      ca: [fs.readFileSync('wildberries-ca-cert.pem')]
    })
  })
});
```

### Конфигурация межсетевого экрана

```typescript
// Белый список конечных точек Wildberries API
const allowedHosts = [
  'common-api.wildberries.ru',
  'content-api.wildberries.ru',
  'marketplace-api.wildberries.ru',
  'seller-analytics-api.wildberries.ru',
  'finance-api.wildberries.ru',
  'statistics-api.wildberries.ru',
];

// Настроить межсетевой экран для разрешения только этих хостов
```

## Защита данных

### Обработка конфиденциальных данных

```typescript
class SecureDataHandler {
  // Маскировка конфиденциальных данных в логах
  private maskSensitiveData(data: any): any {
    if (typeof data !== 'object') return data;

    const masked = { ...data };

    const sensitiveFields = [
      'apiKey', 'token', 'password', 'secret',
      'cardNumber', 'cvv', 'ssn', 'passport'
    ];

    for (const field of sensitiveFields) {
      if (field in masked) {
        masked[field] = '***СКРЫТО***';
      }
    }

    return masked;
  }

  // Шифрование данных перед хранением
  private async encryptData(data: string): Promise<string> {
    const crypto = require('crypto');
    const algorithm = 'aes-256-gcm';
    const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return JSON.stringify({
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    });
  }
}
```

### Безопасное хранилище

```typescript
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

class SecureCache {
  private algorithm = 'aes-256-gcm';
  private key = Buffer.from(process.env.CACHE_ENCRYPTION_KEY!, 'hex');

  async setSecure(key: string, value: any, ttl: number): Promise<void> {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(JSON.stringify(value), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    await cache.set(key, {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    }, ttl);
  }

  async getSecure<T>(key: string): Promise<T | null> {
    const cached = await cache.get(key);
    if (!cached) return null;

    const decipher = createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(cached.iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(cached.authTag, 'hex'));

    let decrypted = decipher.update(cached.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }
}
```

### Защита персональных данных

```typescript
// Обработка персональных идентифицируемых данных
interface SecureCustomerData {
  // Хранить только хешированные идентификаторы
  customerHash: string; // SHA-256 от ID клиента

  // Шифровать конфиденциальные поля
  encryptedPhone: string;
  encryptedEmail: string;

  // Хранить неконфиденциальные данные в открытом виде
  orderCount: number;
  lastOrderDate: Date;
}

function hashCustomerId(customerId: string): string {
  return crypto
    .createHash('sha256')
    .update(customerId)
    .digest('hex');
}
```

## Обработка ошибок

### Безопасные сообщения об ошибках

```typescript
class SecureErrorHandler {
  handleError(error: any): never {
    // Логировать подробную ошибку внутренне
    console.error('[Внутренняя] Полная ошибка:', error);

    // Возвращать санитизированную ошибку пользователю
    if (error instanceof AuthenticationError) {
      throw new Error('Ошибка аутентификации. Пожалуйста, проверьте ваши учетные данные.');
    }

    if (error instanceof RateLimitError) {
      throw new Error('Превышен лимит запросов. Пожалуйста, попробуйте позже.');
    }

    if (error instanceof ValidationError) {
      // Не раскрывать внутренние детали валидации
      throw new Error('Неверные параметры запроса.');
    }

    // Общая ошибка для неожиданных проблем
    throw new Error('Произошла ошибка. Пожалуйста, свяжитесь с поддержкой.');
  }
}
```

### Предотвращение раскрытия информации

```typescript
// ❌ Плохо: Раскрывает внутренние детали
catch (error) {
  res.status(500).json({
    error: error.message, // Может содержать конфиденциальную информацию
    stack: error.stack,   // Раскрывает структуру кода
    apiKey: sdk.apiKey    // Утечка учетных данных
  });
}

// ✅ Хорошо: Безопасный ответ об ошибке
catch (error) {
  console.error('[Внутренняя ошибка]:', error); // Логировать внутренне

  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
    reference: generateErrorId() // Для отслеживания в поддержке
  });
}
```

## Логирование и мониторинг

### Безопасное логирование

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Логирование с маскировкой конфиденциальных данных
logger.info('API запрос', {
  endpoint: '/api/products',
  userId: hashUserId(userId),
  // Никогда не логируйте API ключи или токены
});
```

### Мониторинг безопасности

```typescript
class SecurityMonitor {
  private failedAttempts = new Map<string, number>();

  trackFailedAuth(identifier: string) {
    const attempts = (this.failedAttempts.get(identifier) || 0) + 1;
    this.failedAttempts.set(identifier, attempts);

    if (attempts >= 5) {
      this.alertSecurityTeam(identifier);
      this.blockIdentifier(identifier);
    }
  }

  private alertSecurityTeam(identifier: string) {
    console.error(`[БЕЗОПАСНОСТЬ] Обнаружена подозрительная активность: ${identifier}`);
    // Отправить оповещение команде безопасности
  }

  private blockIdentifier(identifier: string) {
    // Реализовать ограничение запросов или блокировку
  }
}
```

### Аудит логирования

```typescript
interface AuditLog {
  timestamp: Date;
  userId: string;
  action: string;
  resource: string;
  result: 'success' | 'failure';
  ipAddress: string;
  userAgent: string;
}

class AuditLogger {
  async logAction(log: AuditLog) {
    // Хранить в безопасной базе данных аудита
    await auditDb.insert({
      ...log,
      userId: hashUserId(log.userId),
      ipAddress: hashIpAddress(log.ipAddress)
    });
  }
}
```

## Контрольный список безопасности

### Разработка

- [ ] API ключи хранятся в переменных окружения
- [ ] Файл `.env` добавлен в `.gitignore`
- [ ] Нет жестко закодированных учетных данных в коде
- [ ] Валидация входных данных на всех пользовательских вводах
- [ ] Реализована безопасная обработка ошибок
- [ ] Конфиденциальные данные замаскированы в логах
- [ ] HTTPS принудительно применяется для всех API вызовов

### Продакшн

- [ ] API ключи регулярно ротируются
- [ ] Настроен сервис управления секретами
- [ ] Включено ограничение запросов
- [ ] Настроен мониторинг и оповещения
- [ ] Включен аудит логирования
- [ ] Настроены правила межсетевого экрана
- [ ] Закрепление сертификатов (если требуется)
- [ ] Шифрование данных в покое
- [ ] Соответствие обработки персональных данных (GDPR и т.д.)
- [ ] Настроены заголовки безопасности
- [ ] Включена защита от DDoS
- [ ] План резервного копирования и восстановления

### Код ревью

- [ ] Нет API ключей в коде или комментариях
- [ ] Сообщения об ошибках не раскрывают информацию
- [ ] Логирование не раскрывает конфиденциальные данные
- [ ] Валидация входных данных всеобъемлющая
- [ ] Присутствуют проверки аутентификации
- [ ] Присутствуют проверки авторизации
- [ ] Предотвращение SQL-инъекций (если используется БД)
- [ ] Предотвращение XSS (если отрисовывается HTML)

## Реагирование на инциденты безопасности

### Обнаружение

```typescript
class SecurityIncidentDetector {
  detectAnomalies(logs: ApiLog[]) {
    // Высокая частота запросов с одного IP
    const requestsByIp = groupBy(logs, 'ipAddress');
    for (const [ip, requests] of Object.entries(requestsByIp)) {
      if (requests.length > 1000) {
        this.reportIncident('HIGH_REQUEST_RATE', { ip });
      }
    }

    // Необычные паттерны доступа
    const failedAuth = logs.filter(l => l.status === 401);
    if (failedAuth.length > 50) {
      this.reportIncident('BRUTE_FORCE_ATTEMPT', {});
    }

    // Попытки эксфильтрации данных
    const largePulls = logs.filter(l => l.responseSize > 10_000_000);
    if (largePulls.length > 100) {
      this.reportIncident('POSSIBLE_DATA_EXFILTRATION', {});
    }
  }

  private reportIncident(type: string, details: any) {
    console.error(`[ИНЦИДЕНТ БЕЗОПАСНОСТИ] ${type}`, details);
    // Немедленно оповестить команду безопасности
  }
}
```

### План реагирования

1. **Немедленные действия**
   - Ротация скомпрометированных API ключей
   - Блокировка подозрительных IP адресов
   - Проверка журналов последней активности API

2. **Расследование**
   - Анализ аудит логов
   - Определение масштаба нарушения
   - Документирование временной шкалы

3. **Устранение**
   - Применение исправлений безопасности
   - Обновление контроля доступа
   - Усиление мониторинга

4. **После инцидента**
   - Обновление процедур безопасности
   - Обучение команды новым угрозам
   - Улучшение возможностей обнаружения

## Соответствие требованиям

### Соответствие GDPR

```typescript
class GDPRCompliantSDK {
  async deleteCustomerData(customerId: string) {
    // Право быть забытым
    await sdk.communications.deleteCustomerChats(customerId);
    await cache.del(`customer:${customerId}`);

    console.log(`Данные клиента удалены: ${customerId}`);
  }

  async exportCustomerData(customerId: string) {
    // Право на переносимость данных
    const orders = await sdk.ordersFBS.orders({ limit: 1000, next: 0 });
    const reviews = await sdk.communications.getCustomerReviews(customerId);

    return {
      orders,
      reviews,
      exportDate: new Date().toISOString()
    };
  }
}
```

## Связанная документация

- [Руководство по лучшим практикам](/ru/guides/best-practices.md)
- [Руководство по конфигурации](/ru/guides/configuration.md)
- [Руководство по устранению неполадок](/ru/guides/troubleshooting.md)

## Поддержка безопасности

По вопросам уязвимостей безопасности:
- **НЕ** открывайте публичные GitHub issues
- Email: security@example.com (замените на реальный контакт безопасности)
- Используйте [Рекомендации по безопасности](https://github.com/salacoste/daytona-wildberries-typescript-sdk/security/advisories)

## Обновления

Это руководство по безопасности регулярно обновляется. Последняя проверка: 2025-10-27
