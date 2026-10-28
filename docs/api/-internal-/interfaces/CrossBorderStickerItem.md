[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CrossBorderStickerItem

# Interface: CrossBorderStickerItem

Defined in: [types/orders-fbs.types.ts:384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L384)

Individual cross-border sticker data item

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="file"></a> `file?` | `string` | Base64-encoded sticker file | [types/orders-fbs.types.ts:386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L386) |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-fbs.types.ts:388](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L388) |
| <a id="parcelid"></a> `parcelId?` | `string` | Parcel ID | [types/orders-fbs.types.ts:390](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L390) |
| <a id="status"></a> `status?` | `"awaitingTrackNumber"` \| `"ready"` | Sticker generation status. Stickers may generate with delay — poll until 'ready'. | [types/orders-fbs.types.ts:392](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L392) |
