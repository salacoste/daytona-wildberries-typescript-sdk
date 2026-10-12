---
title: NodeNext ESM and CommonJS
description: Strict TypeScript configuration and supported imports for .mts and .cts consumers
layout: doc
---

# NodeNext ESM and CommonJS

The package supports TypeScript projects that use Node's native ESM and CommonJS rules. Use `NodeNext` for both `module` and `moduleResolution`; pairing `NodeNext` with another resolver can select the wrong declaration or runtime condition.

## Compiler configuration

Create a dedicated `tsconfig.json` for Node consumers:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "skipLibCheck": false,
    "noEmit": true
  },
  "include": ["src/**/*.mts", "src/**/*.cts"]
}
```

Keeping `skipLibCheck` disabled makes package declaration problems visible during CI instead of hiding them.

## ESM with `.mts`

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { FinancesModule } from 'daytona-wildberries-typescript-sdk/finances';

type Sdk = WildberriesSDK;
type Finances = FinancesModule;

declare const sdk: Sdk;
declare const finances: Finances;
void [sdk, finances];
```

The package root supplies `WildberriesSDK` and public shared types. Supported module subpaths are `/finances`, `/analytics`, `/communications`, and `/reports`.

## CommonJS with `.cts`

```typescript
import SDK = require('daytona-wildberries-typescript-sdk');
import Reports = require('daytona-wildberries-typescript-sdk/reports');

type Sdk = InstanceType<typeof SDK.WildberriesSDK>;
type ReportClient = InstanceType<typeof Reports.ReportsModule>;

declare const sdk: Sdk;
declare const reports: ReportClient;
void [sdk, reports];
```

Do not import private files from `dist/` or unlisted module folders. Those paths are implementation details and are not package exports.

## Offline verification

This repository keeps equivalent `.mts` and `.cts` fixtures under `tests/fixtures/docs/nodenext/`. They contain type-only usage and make no Wildberries requests. Run:

```bash
npm run validate:docs:nodenext
```

The command builds local package artifacts and compiles both fixtures with the strict configuration above.
