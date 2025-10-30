[Wildberries API TypeScript SDK](../modules.md) / WarehouseUpdateRequest

# Interface: WarehouseUpdateRequest

Defined in: [types/products.types.ts:1262](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1262)

Request to update seller warehouse details

**IMPORTANT:**
- Office binding can only be changed once per 24 hours
- Cannot reuse WB office already bound to another warehouse

## Example

```typescript
const request: WarehouseUpdateRequest = {
  name: 'Склад Москва Обновлённый',
  officeId: 123  // Can change max once/day
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Warehouse name (1-200 characters) | [types/products.types.ts:1264](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1264) |
| <a id="officeid"></a> `officeId` | `number` | WB office ID (can change max once per 24 hours) | [types/products.types.ts:1266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1266) |
