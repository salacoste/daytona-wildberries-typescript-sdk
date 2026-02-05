---
title: Security Guide
description: Security best practices for the Wildberries SDK - API key management, network security, data protection, and monitoring
layout: doc
---

# Security Guide

Comprehensive security guidelines for using the Wildberries TypeScript SDK safely and securely.

## Table of Contents

- [Overview](#overview)
- [API Key Management](#api-key-management)
- [Secure Configuration](#secure-configuration)
- [Network Security](#network-security)
- [Data Protection](#data-protection)
- [Error Handling](#error-handling)
- [Logging & Monitoring](#logging--monitoring)
- [Security Checklist](#security-checklist)

## Overview

Security is paramount when integrating with the Wildberries API. This guide covers best practices for protecting your API keys, securing data transmission, and handling sensitive information.

### Security Principles

1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Grant minimum necessary permissions
3. **Secure by Default**: Security enabled from the start
4. **Zero Trust**: Verify everything, trust nothing
5. **Fail Secure**: Handle errors securely

## API Key Management

### Storing API Keys Securely

**❌ Never do this:**

```typescript
// DON'T hardcode API keys
const sdk = new WildberriesSDK({
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // ❌ BAD!
});

// DON'T commit keys to version control
// DON'T share keys in chat/email
// DON'T store keys in frontend code
```

**✅ Best Practices:**

```typescript
// Use environment variables
import dotenv from 'dotenv';
dotenv.config();

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY! // ✅ GOOD!
});
```

### Environment Variable Configuration

**`.env` file** (add to `.gitignore`):

```bash
# Wildberries API Configuration
WB_API_KEY=your_api_key_here
WB_API_TIMEOUT=30000
WB_API_MAX_RETRIES=3

# Never commit this file to version control!
```

**`.env.example`** (safe to commit):

```bash
# Wildberries API Configuration
WB_API_KEY=your_api_key_here
WB_API_TIMEOUT=30000
WB_API_MAX_RETRIES=3
```

### Secret Management Services

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

### API Key Rotation

```typescript
class SecureSDKManager {
  private sdk: WildberriesSDK;
  private apiKey: string;

  constructor(initialApiKey: string) {
    this.apiKey = initialApiKey;
    this.sdk = new WildberriesSDK({ apiKey: this.apiKey });

    // Rotate key every 24 hours
    setInterval(() => this.rotateApiKey(), 24 * 60 * 60 * 1000);
  }

  private async rotateApiKey() {
    try {
      // Fetch new API key from secure storage
      const newApiKey = await getApiKey();

      // Create new SDK instance with new key
      this.sdk = new WildberriesSDK({ apiKey: newApiKey });

      // Securely dispose of old key
      this.apiKey = '';

      console.log('API key rotated successfully');
    } catch (error) {
      console.error('Failed to rotate API key:', error);
    }
  }

  getSDK(): WildberriesSDK {
    return this.sdk;
  }
}
```

## Secure Configuration

### Minimal Configuration

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  // Security settings
  timeout: 30000, // 30 second timeout prevents hanging
  retryConfig: {
    maxRetries: 3,
    retryDelay: 1000,
    exponentialBackoff: true,
  },

  // Logging (ensure no sensitive data logged)
  logLevel: 'warn', // 'debug' only in development
});
```

### Input Validation

```typescript
import { z } from 'zod';

const ProductIdSchema = z.number().int().positive();

async function getProduct(productId: unknown) {
  // Validate input before using
  const validatedId = ProductIdSchema.parse(productId);

  try {
    return await sdk.products.getProductCard(validatedId);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new Error('Invalid product ID format');
    }
    throw error;
  }
}
```

### Rate Limit Protection

```typescript
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  rateLimitConfig: {
    // Prevent accidental API abuse
    requestsPerSecond: 10,
    requestsPerMinute: 100,
  }
});
```

## Network Security

### HTTPS Only

```typescript
// SDK enforces HTTPS by default
// All API calls use encrypted connections

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  // HTTPS is always enforced - cannot be disabled
});
```

### Certificate Pinning (Advanced)

```typescript
import https from 'https';
import axios from 'axios';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,
  httpClient: axios.create({
    httpsAgent: new https.Agent({
      // Enable certificate validation
      rejectUnauthorized: true,

      // Optional: Certificate pinning
      ca: [fs.readFileSync('wildberries-ca-cert.pem')]
    })
  })
});
```

### Firewall Configuration

```typescript
// Whitelist Wildberries API endpoints
const allowedHosts = [
  'common-api.wildberries.ru',
  'content-api.wildberries.ru',
  'marketplace-api.wildberries.ru',
  'seller-analytics-api.wildberries.ru',
  'finance-api.wildberries.ru',
  'statistics-api.wildberries.ru',
];

// Configure firewall to allow only these hosts
```

## Data Protection

### Sensitive Data Handling

```typescript
class SecureDataHandler {
  // Mask sensitive data in logs
  private maskSensitiveData(data: any): any {
    if (typeof data !== 'object') return data;

    const masked = { ...data };

    const sensitiveFields = [
      'apiKey', 'token', 'password', 'secret',
      'cardNumber', 'cvv', 'ssn', 'passport'
    ];

    for (const field of sensitiveFields) {
      if (field in masked) {
        masked[field] = '***REDACTED***';
      }
    }

    return masked;
  }

  // Encrypt data before storage
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

### Secure Storage

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

### PII Protection

```typescript
// Personal Identifiable Information handling
interface SecureCustomerData {
  // Store hashed identifiers only
  customerHash: string; // SHA-256 of customer ID

  // Encrypt sensitive fields
  encryptedPhone: string;
  encryptedEmail: string;

  // Store non-sensitive data in plain text
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

## Error Handling

### Secure Error Messages

```typescript
class SecureErrorHandler {
  handleError(error: any): never {
    // Log detailed error internally
    console.error('[Internal] Full error:', error);

    // Return sanitized error to user
    if (error instanceof AuthenticationError) {
      throw new Error('Authentication failed. Please check your credentials.');
    }

    if (error instanceof RateLimitError) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    if (error instanceof ValidationError) {
      // Don't expose internal validation details
      throw new Error('Invalid request parameters.');
    }

    // Generic error for unexpected issues
    throw new Error('An error occurred. Please contact support.');
  }
}
```

### Information Disclosure Prevention

```typescript
// ❌ Bad: Exposes internal details
catch (error) {
  res.status(500).json({
    error: error.message, // May contain sensitive info
    stack: error.stack,   // Exposes code structure
    apiKey: sdk.apiKey    // Leaks credentials
  });
}

// ✅ Good: Safe error response
catch (error) {
  console.error('[Internal Error]:', error); // Log internally

  res.status(500).json({
    error: 'Internal server error',
    reference: generateErrorId() // For support tracking
  });
}
```

## Logging & Monitoring

### Secure Logging

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

// Log with sensitive data masking
logger.info('API request', {
  endpoint: '/api/products',
  userId: hashUserId(userId),
  // Never log API keys or tokens
});
```

### Security Monitoring

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
    console.error(`[SECURITY] Suspicious activity detected: ${identifier}`);
    // Send alert to security team
  }

  private blockIdentifier(identifier: string) {
    // Implement rate limiting or blocking
  }
}
```

### Audit Logging

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
    // Store in secure audit log database
    await auditDb.insert({
      ...log,
      userId: hashUserId(log.userId),
      ipAddress: hashIpAddress(log.ipAddress)
    });
  }
}
```

## Security Checklist

### Development

- [ ] API keys stored in environment variables
- [ ] `.env` file added to `.gitignore`
- [ ] No hardcoded credentials in code
- [ ] Input validation on all user inputs
- [ ] Secure error handling implemented
- [ ] Sensitive data masked in logs
- [ ] HTTPS enforced for all API calls

### Production

- [ ] API keys rotated regularly
- [ ] Secret management service configured
- [ ] Rate limiting enabled
- [ ] Monitoring and alerting set up
- [ ] Audit logging enabled
- [ ] Firewall rules configured
- [ ] Certificate pinning (if required)
- [ ] Data encryption at rest
- [ ] PII handling compliance (GDPR, etc.)
- [ ] Security headers configured
- [ ] DDoS protection enabled
- [ ] Backup and recovery plan

### Code Review

- [ ] No API keys in code or comments
- [ ] Error messages don't leak information
- [ ] Logging doesn't expose sensitive data
- [ ] Input validation comprehensive
- [ ] Authentication checks present
- [ ] Authorization checks present
- [ ] SQL injection prevention (if using DB)
- [ ] XSS prevention (if rendering HTML)

## Security Incident Response

### Detection

```typescript
class SecurityIncidentDetector {
  detectAnomalies(logs: ApiLog[]) {
    // High request rate from single IP
    const requestsByIp = groupBy(logs, 'ipAddress');
    for (const [ip, requests] of Object.entries(requestsByIp)) {
      if (requests.length > 1000) {
        this.reportIncident('HIGH_REQUEST_RATE', { ip });
      }
    }

    // Unusual access patterns
    const failedAuth = logs.filter(l => l.status === 401);
    if (failedAuth.length > 50) {
      this.reportIncident('BRUTE_FORCE_ATTEMPT', {});
    }

    // Data exfiltration attempts
    const largePulls = logs.filter(l => l.responseSize > 10_000_000);
    if (largePulls.length > 100) {
      this.reportIncident('POSSIBLE_DATA_EXFILTRATION', {});
    }
  }

  private reportIncident(type: string, details: any) {
    console.error(`[SECURITY INCIDENT] ${type}`, details);
    // Alert security team immediately
  }
}
```

### Response Plan

1. **Immediate Actions**
   - Rotate compromised API keys
   - Block suspicious IP addresses
   - Review recent API activity logs

2. **Investigation**
   - Analyze audit logs
   - Identify scope of breach
   - Document timeline

3. **Remediation**
   - Apply security patches
   - Update access controls
   - Strengthen monitoring

4. **Post-Incident**
   - Update security procedures
   - Train team on new threats
   - Improve detection capabilities

## Compliance

### GDPR Compliance

```typescript
class GDPRCompliantSDK {
  async deleteCustomerData(customerId: string) {
    // Right to be forgotten
    await sdk.communications.deleteCustomerChats(customerId);
    await cache.del(`customer:${customerId}`);

    console.log(`Customer data deleted: ${customerId}`);
  }

  async exportCustomerData(customerId: string) {
    // Right to data portability
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

## Related Documentation

- [Best Practices Guide](./best-practices.md)
- [Configuration Guide](./configuration.md)
- [Troubleshooting Guide](./troubleshooting.md)

## Security Support

For security vulnerabilities:
- **DO NOT** open public GitHub issues
- Email: security@example.com (replace with actual security contact)
- Use [Security Advisories](https://github.com/salacoste/daytona-wildberries-typescript-sdk/security/advisories)

## Updates

This security guide is regularly updated. Last review: 2025-10-27
