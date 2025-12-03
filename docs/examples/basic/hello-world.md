# Hello World

SDK initialization and connectivity testing.

## Description

This example shows how to initialize the Wildberries SDK and verify that your API key is working correctly using the ping endpoint.

## Requirements

- SDK version 2.0.0+
- Valid Wildberries API key

## Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

## Code

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

// Initialize SDK with your API key
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Test connectivity with ping
async function testConnection() {
  try {
    const response = await sdk.general.ping();

    console.log('Connection successful!');
    console.log('Server status:', response.Status);  // 'OK'
    console.log('Server timestamp:', response.TS);   // Unix timestamp

    return true;
  } catch (error) {
    console.error('Connection failed:', error);
    return false;
  }
}

testConnection();
```

## Expected Output

```json
{
  "Status": "OK",
  "TS": 1733234567890
}
```

## Configuration Options

```typescript
// Advanced configuration
const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!,

  // Request timeout (default: 30000ms)
  timeout: 60000,

  // Retry configuration
  retryConfig: {
    maxRetries: 3,           // Number of retry attempts
    retryDelay: 1000,        // Initial delay between retries (ms)
    exponentialBackoff: true // Use exponential backoff
  },

  // Logging level
  logLevel: 'info'  // 'debug' | 'info' | 'warn' | 'error'
});
```

## Environment Variables

Store your API key securely:

```bash
# .env file
WB_API_KEY=your_wildberries_api_key_here
```

```typescript
// Load with dotenv
import 'dotenv/config';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

## Related Materials

- [API Reference: GeneralModule](/api/classes/GeneralModule)
- [Configuration Guide](/guides/configuration)
- [Authentication](/guides/security)

---

[Back to Examples](../index.md) | [Next: Single API Call](single-call.md)
