[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ArchiveOrder

# Interface: ArchiveOrder

Defined in: [types/orders-fbs.types.ts:972](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L972)

A single archived FBS assembly order
Maps to swagger schema: v3.ArchiveOrder

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cargotype"></a> `cargoType` | `"mgt"` \| `"sgt"` \| `"kgtPlus"` | Cargo type: 'mgt' (small), 'sgt' (medium), 'kgtPlus' (large+) | [types/orders-fbs.types.ts:974](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L974) |
| <a id="colorcode"></a> `colorCode` | `string` \| `null` | Color code, or null when not applicable | [types/orders-fbs.types.ts:976](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L976) |
| <a id="createdat"></a> `createdAt` | `string` | Order creation timestamp (ISO 8601) | [types/orders-fbs.types.ts:978](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L978) |
| <a id="crossborder"></a> `crossBorder` | \| \{ `parcel?`: `string`; \} \| `null` | Cross-border delivery details, or null for non-cross-border orders | [types/orders-fbs.types.ts:980](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L980) |
| <a id="crossbordertype"></a> `crossBorderType` | `"local"` \| `"crossBorder"` | Cross-border type: 'local' (domestic) or 'crossBorder' | [types/orders-fbs.types.ts:982](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L982) |
| <a id="id"></a> `id` | `number` | Numeric order identifier | [types/orders-fbs.types.ts:984](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L984) |
| <a id="iszeroorder"></a> `isZeroOrder` | `boolean` | Whether this is a zero-price (free) order | [types/orders-fbs.types.ts:986](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L986) |
| <a id="metadetails"></a> `metaDetails` | `unknown`[] | Additional metadata details | [types/orders-fbs.types.ts:988](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L988) |
| <a id="options"></a> `options` | \{ `isB2B?`: `boolean`; \} | Order-level options | [types/orders-fbs.types.ts:990](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L990) |
| `options.isB2B?` | `boolean` | - | [types/orders-fbs.types.ts:990](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L990) |
| <a id="orderuid"></a> `orderUid` | `string` | Unique order UID | [types/orders-fbs.types.ts:992](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L992) |
| <a id="priceinfo"></a> `priceInfo` | [`ArchiveOrderPriceInfo`](ArchiveOrderPriceInfo.md) | Price information for the order | [types/orders-fbs.types.ts:994](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L994) |
| <a id="product"></a> `product` | [`ArchiveOrderProduct`](ArchiveOrderProduct.md) | Product details for the order | [types/orders-fbs.types.ts:996](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L996) |
| <a id="rid"></a> `rid` | `string` | Request ID (rid) for tracing | [types/orders-fbs.types.ts:998](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L998) |
| <a id="scanprice"></a> `scanPrice` | `number` \| `null` | Scan price, or null when not applicable | [types/orders-fbs.types.ts:1000](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1000) |
| <a id="status"></a> `status` | [`ArchiveOrderStatus`](ArchiveOrderStatus.md) | Supplier and WB statuses | [types/orders-fbs.types.ts:1002](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1002) |
| <a id="stickerid"></a> `stickerId` | `number` | Sticker (label) ID assigned to the order | [types/orders-fbs.types.ts:1004](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1004) |
| <a id="supplyid"></a> `supplyId` | `string` \| `null` | Supply ID the order is bound to, or null when not bound | [types/orders-fbs.types.ts:1006](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1006) |
| <a id="warehouseid"></a> `warehouseId` | `number` | Warehouse ID the order is fulfilled from | [types/orders-fbs.types.ts:1008](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1008) |
