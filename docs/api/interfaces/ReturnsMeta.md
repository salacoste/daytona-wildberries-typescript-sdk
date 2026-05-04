[Wildberries API TypeScript SDK](../modules.md) / ReturnsMeta

# Interface: ReturnsMeta

Defined in: types/returns.types.ts:123

Per-source telemetry — surfaces what was fetched/skipped.

## Since

v3.10.0

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="sources"></a> `sources` | \{ `fbo`: \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \}; `fbs`: \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \}; `finance`: \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \}; \} | types/returns.types.ts:124 |
| `sources.fbo` | \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \} | types/returns.types.ts:125 |
| `sources.fbo.fetched` | `number` | types/returns.types.ts:125 |
| `sources.fbo.skipped` | `boolean` | types/returns.types.ts:125 |
| `sources.fbo.failed` | `boolean` | types/returns.types.ts:125 |
| `sources.fbo.reason?` | `string` | types/returns.types.ts:125 |
| `sources.fbs` | \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \} | types/returns.types.ts:126 |
| `sources.fbs.fetched` | `number` | types/returns.types.ts:126 |
| `sources.fbs.skipped` | `boolean` | types/returns.types.ts:126 |
| `sources.fbs.failed` | `boolean` | types/returns.types.ts:126 |
| `sources.fbs.reason?` | `string` | types/returns.types.ts:126 |
| `sources.finance` | \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \} | types/returns.types.ts:127 |
| `sources.finance.fetched` | `number` | types/returns.types.ts:127 |
| `sources.finance.skipped` | `boolean` | types/returns.types.ts:127 |
| `sources.finance.failed` | `boolean` | types/returns.types.ts:127 |
| `sources.finance.reason?` | `string` | types/returns.types.ts:127 |
