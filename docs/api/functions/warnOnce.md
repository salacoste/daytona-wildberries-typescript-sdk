[Wildberries API TypeScript SDK](../modules.md) / warnOnce

# Function: warnOnce()

```ts
function warnOnce(methodKey: string, message: string): void;
```

Defined in: [utils/deprecation.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/utils/deprecation.ts#L28)

Emit a deprecation warning for a method, at most once per process.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `methodKey` | `string` | Unique identifier for the deprecated method (e.g. 'FinancesModule.getSupplierReportDetailByPeriod') |
| `message` | `string` | The warning message to display |

## Returns

`void`

## Example

```typescript
warnOnce(
  'FinancesModule.getSupplierReportDetailByPeriod',
  '[DEPRECATED] getSupplierReportDetailByPeriod() is deprecated. Migrate to getSalesReportsDetailed().'
);
```
