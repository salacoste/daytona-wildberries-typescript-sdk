# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          | End of Support |
| ------- | ------------------ | -------------- |
| 1.0.x   | :white_check_mark: | TBD            |
| < 1.0   | :x:                | Already ended  |

**Recommendation**: Always use the latest version of the SDK to ensure you have the most recent security patches.

---

## Security Features

The Wildberries API TypeScript SDK implements several security best practices:

### 1. API Key Protection

**Secure Storage:**
```typescript
// ✅ GOOD: Use environment variables
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// ❌ BAD: Never hardcode API keys
const sdk = new WildberriesSDK({
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Don't do this!
});
```

**Best Practices:**
- Store API keys in `.env` files (add `.env` to `.gitignore`)
- Use secret management services in production (AWS Secrets Manager, HashiCorp Vault, etc.)
- Rotate API keys regularly (every 90 days recommended)
- Never commit API keys to version control
- Use separate API keys for development, staging, and production

### 2. HTTPS Enforcement

All SDK requests use HTTPS by default:
- Communication with Wildberries API is encrypted (TLS 1.2+)
- No configuration needed - HTTPS is enforced

### 3. Input Validation

The SDK validates inputs to prevent injection attacks:
- Request data validated against TypeScript types
- Query parameters sanitized
- File upload types validated

### 4. Error Message Sanitization

Error messages **never expose** sensitive information:
```typescript
// ✅ SAFE: Generic error message
catch (error) {
  if (error instanceof AuthenticationError) {
    console.error('Authentication failed'); // API key NOT included
  }
}
```

### 5. Dependency Security

- All dependencies scanned with `npm audit`
- Automated Dependabot updates enabled
- No known critical vulnerabilities in dependencies
- Minimal dependency footprint (only `axios` in production)

---

## Reporting a Vulnerability

**We take security seriously.** If you discover a security vulnerability, please follow responsible disclosure:

### How to Report

**DO NOT** open a public GitHub issue for security vulnerabilities.

Instead, please email us at:

**📧 Security Contact**: [security@example.com](mailto:security@example.com)

*(Note: Replace with actual security contact email)*

### What to Include

Please include as much information as possible:

1. **Description of the vulnerability**
   - Type of issue (e.g., SQL injection, XSS, authentication bypass)
   - Impact and severity assessment

2. **Steps to reproduce**
   - Detailed steps to reproduce the issue
   - Proof of concept code (if applicable)
   - Environment details (SDK version, Node.js version, OS)

3. **Potential impact**
   - What could an attacker do with this vulnerability?
   - What data or systems are at risk?

4. **Suggested fix** (optional)
   - Proposed solution or mitigation

### Response Timeline

We aim to respond to security reports within:

- **Initial Response**: 48 hours
- **Triage and Assessment**: 5 business days
- **Fix Development**: Depends on severity
  - **Critical**: 7 days
  - **High**: 14 days
  - **Medium**: 30 days
  - **Low**: 90 days
- **Public Disclosure**: After fix is released and users have had time to upgrade (typically 30 days)

### Disclosure Policy

- We will acknowledge your report within 48 hours
- We will keep you informed of our progress
- We will credit you in the security advisory (unless you prefer anonymity)
- We request that you do not publicly disclose the issue until we have released a fix

---

## Security Advisories

Security advisories are published on:

- **GitHub Security Advisories**: [https://github.com/salacoste/daytona-wildberries-typescript-sdk/security/advisories](https://github.com/salacoste/daytona-wildberries-typescript-sdk/security/advisories)
- **CHANGELOG.md**: Security fixes are clearly marked
- **GitHub Releases**: Security patches noted in release notes

Subscribe to our repository to receive notifications of security updates.

---

## Security Best Practices for Users

### 1. Keep SDK Updated

```bash
# Check for updates
npm outdated

# Update to latest version
npm update daytona-wildberries-typescript-sdk

# Or install specific version
npm install daytona-wildberries-typescript-sdk@latest
```

### 2. Secure API Key Management

**Development:**
```bash
# .env file (add to .gitignore)
WB_API_KEY=your_api_key_here
```

```typescript
// Load from environment
import { config } from 'dotenv';
config();

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

**Production:**
- Use secret management services (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager)
- Never log API keys
- Implement key rotation policies
- Use different keys per environment

### 3. Network Security

**Firewall Rules:**
```
Allow outbound HTTPS (443) to:
- *.wildberries.ru
- content-api.wildberries.ru
- marketplace-api.wildberries.ru
- seller-analytics-api.wildberries.ru
- finance-api.wildberries.ru
- statistics-api.wildberries.ru
```

**IP Whitelisting:**
Check with Wildberries if they support IP whitelisting for your API keys.

### 4. Error Handling

**Never expose sensitive information in logs:**

```typescript
// ✅ GOOD: Safe logging
try {
  await sdk.products.createProduct(data);
} catch (error) {
  console.error('Product creation failed:', error.message);
}

// ❌ BAD: Exposes request data
try {
  await sdk.products.createProduct(data);
} catch (error) {
  console.error('Failed:', error, 'Data:', data); // May contain sensitive info
}
```

### 5. Rate Limiting

The SDK enforces rate limits automatically, but be aware:

- Rate limit violations can trigger account suspensions
- Respect the built-in rate limiter
- Don't override or disable rate limiting in production

### 6. Dependency Auditing

Regularly audit your project's dependencies:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities (patch versions)
npm audit fix

# Fix vulnerabilities (may update major versions)
npm audit fix --force
```

---

## Known Security Considerations

### 1. API Key Permissions

Wildberries API keys may have different permission scopes. Use the principle of least privilege:

- Use read-only keys for analytics/reporting
- Use limited-scope keys for specific modules
- Avoid using master keys with full permissions

### 2. Data Privacy

**Personal Data Handling:**
- The SDK may process customer data (orders, reviews, etc.)
- Ensure compliance with GDPR, CCPA, and local data protection laws
- Implement proper data retention and deletion policies
- Encrypt sensitive data at rest

**Recommendations:**
- Minimize data collection
- Anonymize/pseudonymize when possible
- Implement access controls
- Log access to sensitive data

### 3. Third-Party Integrations

If integrating the SDK with third-party services:

- Validate data before sending to external systems
- Use encrypted connections (HTTPS/TLS)
- Implement authentication for webhooks
- Sanitize data from external sources

---

## Compliance

### Standards and Frameworks

The SDK follows security best practices from:

- **OWASP Top 10**: Protection against common web vulnerabilities
- **CWE/SANS Top 25**: Mitigation of most dangerous software weaknesses
- **Node.js Security Best Practices**: Secure Node.js development guidelines

### Certifications

The SDK itself is not certified, but it is designed to support your compliance with:

- **PCI DSS**: If handling payment card data
- **GDPR**: If processing EU customer data
- **CCPA**: If processing California resident data
- **SOC 2**: If undergoing SOC 2 audits

**Note**: Compliance is ultimately the responsibility of the SDK user and their implementation.

---

## Security Checklist for Production Deployments

Use this checklist before deploying to production:

### Environment
- [ ] API keys stored in secure secret management system
- [ ] Different API keys for dev/staging/production
- [ ] `.env` files not committed to version control
- [ ] Environment variables validated on startup

### Dependencies
- [ ] `npm audit` run with no high/critical vulnerabilities
- [ ] All dependencies up to date (or exceptions documented)
- [ ] Dependabot enabled for automated updates
- [ ] Minimal dependency footprint (no unnecessary packages)

### Configuration
- [ ] HTTPS enforced for all API calls
- [ ] Rate limiting enabled (default SDK behavior)
- [ ] Retry logic configured appropriately
- [ ] Timeout values set for production environment

### Monitoring
- [ ] Error logging implemented (without exposing sensitive data)
- [ ] API key usage monitored
- [ ] Anomaly detection in place (unusual traffic patterns)
- [ ] Security incident response plan documented

### Code
- [ ] No hardcoded secrets in source code
- [ ] Input validation on all user-provided data
- [ ] Error messages don't expose sensitive information
- [ ] TypeScript strict mode enabled
- [ ] ESLint security rules enabled

### Network
- [ ] Firewall rules configured (allow HTTPS to Wildberries domains)
- [ ] IP whitelisting configured (if supported by Wildberries)
- [ ] TLS 1.2+ enforced
- [ ] Certificate validation enabled

---

## Security Updates

To stay informed about security updates:

1. **Watch this repository** on GitHub (Releases only or All Activity)
2. **Enable Dependabot alerts** in your repository
3. **Subscribe to our security advisories**
4. **Check CHANGELOG.md** for security-related updates

---

## Acknowledgments

We thank the security researchers and community members who responsibly disclose vulnerabilities. Contributors who report security issues will be credited in:

- Security advisories (unless anonymity requested)
- CHANGELOG.md
- GitHub Security tab

---

## Questions?

For security-related questions that are **not vulnerabilities**:

- Open a [GitHub Discussion](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)
- Check [Documentation](https://github.com/salacoste/daytona-wildberries-typescript-sdk#readme)

For **vulnerability reports**, email: [security@example.com](mailto:security@example.com)

---

**Last Updated**: 2025-10-25
**Next Review**: 2026-01-25 (Quarterly review schedule)
