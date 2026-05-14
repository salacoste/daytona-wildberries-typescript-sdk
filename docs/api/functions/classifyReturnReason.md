[Wildberries API TypeScript SDK](../modules.md) / classifyReturnReason

# Function: classifyReturnReason()

```ts
function classifyReturnReason(reason: string | null | undefined): ReturnReasonCode;
```

Defined in: [utils/classifyReturnReason.ts:31](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/41c8c8d606c0e53924cd1cbbea0b9d4165c56f88/src/utils/classifyReturnReason.ts#L31)

Classifies a Wildberries return reason string into a standardized enum code.

Pure function — no side effects. Returns 'other' for unknown reasons.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reason` | `string` \| `null` \| `undefined` | Free-text Russian reason string from WB API (e.g., GoodsReturnItem.reason) |

## Returns

[`ReturnReasonCode`](../type-aliases/ReturnReasonCode.md)

Standardized ReturnReasonCode

## Example

```ts
classifyReturnReason('Брак товара') // → 'defect'
classifyReturnReason('Не подошёл размер') // → 'wrong_size'
classifyReturnReason('') // → 'other'
```

## Since

v3.9.3
