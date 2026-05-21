[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CrossBorderStickerItem

# Interface: CrossBorderStickerItem

Defined in: [types/orders-fbs.types.ts:314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L314)

Individual cross-border sticker data item

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="file"></a> `file?` | `string` | Base64-encoded sticker file | [types/orders-fbs.types.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L316) |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-fbs.types.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L318) |
| <a id="parcelid"></a> `parcelId?` | `string` | Parcel ID | [types/orders-fbs.types.ts:320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L320) |
| <a id="status"></a> `status?` | `"awaitingTrackNumber"` \| `"ready"` | Sticker generation status. Stickers may generate with delay — poll until 'ready'. | [types/orders-fbs.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbs.types.ts#L322) |
