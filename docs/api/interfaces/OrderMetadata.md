[Wildberries API TypeScript SDK](../modules.md) / OrderMetadata

# Interface: OrderMetadata

Defined in: [types/in-store-pickup.types.ts:191](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L191)

Order metadata

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="meta"></a> `meta` | \{ `sgtin?`: \{ `value`: `string`[] \| `null`; \}; `uin?`: \{ `value`: `string` \| `null`; \}; `imei?`: \{ `value`: `string` \| `null`; \}; `gtin?`: \{ `value`: `string` \| `null`; \}; \} | Metadata object | [types/in-store-pickup.types.ts:193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L193) |
| `meta.sgtin?` | \{ `value`: `string`[] \| `null`; \} | SGTIN (Честный знак marking code) | [types/in-store-pickup.types.ts:195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L195) |
| `meta.sgtin.value` | `string`[] \| `null` | - | [types/in-store-pickup.types.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L196) |
| `meta.uin?` | \{ `value`: `string` \| `null`; \} | UIN (Unique Identification Number) | [types/in-store-pickup.types.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L199) |
| `meta.uin.value` | `string` \| `null` | - | [types/in-store-pickup.types.ts:200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L200) |
| `meta.imei?` | \{ `value`: `string` \| `null`; \} | IMEI code for electronics | [types/in-store-pickup.types.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L203) |
| `meta.imei.value` | `string` \| `null` | - | [types/in-store-pickup.types.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L204) |
| `meta.gtin?` | \{ `value`: `string` \| `null`; \} | GTIN code (Belarus unique product ID) | [types/in-store-pickup.types.ts:207](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L207) |
| `meta.gtin.value` | `string` \| `null` | - | [types/in-store-pickup.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/in-store-pickup.types.ts#L208) |
