[Wildberries API TypeScript SDK](../modules.md) / ProductCharacteristic

# Interface: ProductCharacteristic

Defined in: [types/products.types.ts:602](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L602)

Product characteristic (attribute) with ID and value

## Example

```typescript
const characteristic: ProductCharacteristic = {
  id: 1,           // Characteristic ID from getCharacteristics
  value: ['Red']   // Value(s) - type depends on charcType
};
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Characteristic ID from getCharacteristics endpoint | [types/products.types.ts:604](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L604) |
| <a id="value"></a> `value` | `unknown` | Characteristic value(s) - can be string array or number depending on charcType | [types/products.types.ts:606](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L606) |
