[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CrossBorderStickerItem

# Interface: CrossBorderStickerItem

Defined in: [types/orders-fbs.types.ts:294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/orders-fbs.types.ts#L294)

Individual cross-border sticker data item

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="file"></a> `file?` | `string` | Base64-encoded sticker file | [types/orders-fbs.types.ts:296](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/orders-fbs.types.ts#L296) |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-fbs.types.ts:298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/orders-fbs.types.ts#L298) |
| <a id="parcelid"></a> `parcelId?` | `string` | Parcel ID | [types/orders-fbs.types.ts:300](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/orders-fbs.types.ts#L300) |
| <a id="status"></a> `status?` | `"awaitingTrackNumber"` \| `"ready"` | Sticker generation status. Stickers may generate with delay — poll until 'ready'. | [types/orders-fbs.types.ts:302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/orders-fbs.types.ts#L302) |
