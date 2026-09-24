[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PickupCustomsDeclarationResult

# Interface: PickupCustomsDeclarationResult

Defined in: [types/in-store-pickup.types.ts:241](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L241)

Per-order result in the setCustomsDeclarationBulk response.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | - | [types/in-store-pickup.types.ts:242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L242) |
| <a id="iserror"></a> `isError` | `boolean` | - | [types/in-store-pickup.types.ts:243](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L243) |
| <a id="errors"></a> `errors?` | \{ `code`: `number`; `detail`: `string`; \}[] | Error entries (includes `InvalidOriginCountryCode` for B2B orders missing/invalid originCountryCode). | [types/in-store-pickup.types.ts:245](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L245) |
