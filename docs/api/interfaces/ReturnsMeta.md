[Wildberries API TypeScript SDK](../modules.md) / ReturnsMeta

# Interface: ReturnsMeta

Defined in: [types/returns.types.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L125)

Per-source telemetry — surfaces what was fetched/skipped.

## Since

v3.10.0

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="sources"></a> `sources` | \{ `fbo`: \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \}; `fbs`: \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \}; `finance`: \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \}; \} | [types/returns.types.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L126) |
| `sources.fbo` | \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \} | [types/returns.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L127) |
| `sources.fbo.fetched` | `number` | [types/returns.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L127) |
| `sources.fbo.skipped` | `boolean` | [types/returns.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L127) |
| `sources.fbo.failed` | `boolean` | [types/returns.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L127) |
| `sources.fbo.reason?` | `string` | [types/returns.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L127) |
| `sources.fbs` | \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \} | [types/returns.types.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L128) |
| `sources.fbs.fetched` | `number` | [types/returns.types.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L128) |
| `sources.fbs.skipped` | `boolean` | [types/returns.types.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L128) |
| `sources.fbs.failed` | `boolean` | [types/returns.types.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L128) |
| `sources.fbs.reason?` | `string` | [types/returns.types.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L128) |
| `sources.finance` | \{ `fetched`: `number`; `skipped`: `boolean`; `failed`: `boolean`; `reason?`: `string`; \} | [types/returns.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L129) |
| `sources.finance.fetched` | `number` | [types/returns.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L129) |
| `sources.finance.skipped` | `boolean` | [types/returns.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L129) |
| `sources.finance.failed` | `boolean` | [types/returns.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L129) |
| `sources.finance.reason?` | `string` | [types/returns.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/returns.types.ts#L129) |
