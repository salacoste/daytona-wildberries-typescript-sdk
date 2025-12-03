[Wildberries API TypeScript SDK](../modules.md) / WarehouseCreateRequest

# Interface: WarehouseCreateRequest

Defined in: [types/products.types.ts:1240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1240)

Request to create seller warehouse bound to WB office

**CRITICAL Constraints:**
- Name: 1-200 characters
- WB office binding: Cannot reuse office already bound to another warehouse (409 error)
- Office binding enables FBS (Fulfillment by Seller) model

## Example

```typescript
const request: WarehouseCreateRequest = {
  name: 'Склад Москва Центр',
  officeId: 123  // WB office ID from getWBOffices()
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Warehouse name (1-200 characters) | [types/products.types.ts:1242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1242) |
| <a id="officeid"></a> `officeId` | `number` | WB office/warehouse ID (must not be bound elsewhere) | [types/products.types.ts:1244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/products.types.ts#L1244) |
