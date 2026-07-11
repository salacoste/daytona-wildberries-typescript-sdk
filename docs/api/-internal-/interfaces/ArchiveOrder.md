[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ArchiveOrder

# Interface: ArchiveOrder

Defined in: [types/orders-fbs.types.ts:898](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L898)

A single archived FBS assembly order
Maps to swagger schema: v3.ArchiveOrder

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cargotype"></a> `cargoType` | `"mgt"` \| `"sgt"` \| `"kgtPlus"` | Cargo type: 'mgt' (small), 'sgt' (medium), 'kgtPlus' (large+) | [types/orders-fbs.types.ts:900](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L900) |
| <a id="colorcode"></a> `colorCode` | `string` \| `null` | Color code, or null when not applicable | [types/orders-fbs.types.ts:902](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L902) |
| <a id="createdat"></a> `createdAt` | `string` | Order creation timestamp (ISO 8601) | [types/orders-fbs.types.ts:904](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L904) |
| <a id="crossborder"></a> `crossBorder` | \| \{ `parcel?`: `string`; \} \| `null` | Cross-border delivery details, or null for non-cross-border orders | [types/orders-fbs.types.ts:906](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L906) |
| <a id="crossbordertype"></a> `crossBorderType` | `"local"` \| `"crossBorder"` | Cross-border type: 'local' (domestic) or 'crossBorder' | [types/orders-fbs.types.ts:908](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L908) |
| <a id="id"></a> `id` | `number` | Numeric order identifier | [types/orders-fbs.types.ts:910](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L910) |
| <a id="iszeroorder"></a> `isZeroOrder` | `boolean` | Whether this is a zero-price (free) order | [types/orders-fbs.types.ts:912](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L912) |
| <a id="metadetails"></a> `metaDetails` | `unknown`[] | Additional metadata details | [types/orders-fbs.types.ts:914](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L914) |
| <a id="options"></a> `options` | \{ `isB2B?`: `boolean`; \} | Order-level options | [types/orders-fbs.types.ts:916](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L916) |
| `options.isB2B?` | `boolean` | - | [types/orders-fbs.types.ts:916](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L916) |
| <a id="orderuid"></a> `orderUid` | `string` | Unique order UID | [types/orders-fbs.types.ts:918](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L918) |
| <a id="priceinfo"></a> `priceInfo` | [`ArchiveOrderPriceInfo`](ArchiveOrderPriceInfo.md) | Price information for the order | [types/orders-fbs.types.ts:920](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L920) |
| <a id="product"></a> `product` | [`ArchiveOrderProduct`](ArchiveOrderProduct.md) | Product details for the order | [types/orders-fbs.types.ts:922](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L922) |
| <a id="rid"></a> `rid` | `string` | Request ID (rid) for tracing | [types/orders-fbs.types.ts:924](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L924) |
| <a id="scanprice"></a> `scanPrice` | `number` \| `null` | Scan price, or null when not applicable | [types/orders-fbs.types.ts:926](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L926) |
| <a id="status"></a> `status` | [`ArchiveOrderStatus`](ArchiveOrderStatus.md) | Supplier and WB statuses | [types/orders-fbs.types.ts:928](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L928) |
| <a id="stickerid"></a> `stickerId` | `number` | Sticker (label) ID assigned to the order | [types/orders-fbs.types.ts:930](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L930) |
| <a id="supplyid"></a> `supplyId` | `string` \| `null` | Supply ID the order is bound to, or null when not bound | [types/orders-fbs.types.ts:932](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L932) |
| <a id="warehouseid"></a> `warehouseId` | `number` | Warehouse ID the order is fulfilled from | [types/orders-fbs.types.ts:934](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L934) |
