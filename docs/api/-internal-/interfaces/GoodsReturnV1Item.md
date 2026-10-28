[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsReturnV1Item

# Interface: GoodsReturnV1Item

Defined in: [types/reports.types.ts:777](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L777)

Item of the goods-return report (v1, analytics)

Field renames vs the old report: `barcode`→`sku`, `status`→`returnStatus`,
`reason`→`returnReason` (now returned only for unidentified-item returns);
`isStatusActive` is replaced by the `status` query parameter.

## See

task-212 - WB news 2026-09-24 (#16)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sku"></a> `sku` | `string` | SKU | [types/reports.types.ts:779](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L779) |
| <a id="brand"></a> `brand` | `string` | Brand | [types/reports.types.ts:781](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L781) |
| <a id="completeddt"></a> `completedDt` | `string` \| `null` | Date and time the seller received the return (null until received) | [types/reports.types.ts:783](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L783) |
| <a id="dstofficeaddress"></a> `dstOfficeAddress` | `string` | Address of the pick-up point where the seller receives returns | [types/reports.types.ts:785](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L785) |
| <a id="dstofficeid"></a> `dstOfficeId` | `number` | ID of the pick-up point where the seller receives returns | [types/reports.types.ts:787](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L787) |
| <a id="expireddt"></a> `expiredDt` | `string` \| `null` | Expiration date and time of the storage period (nullable) | [types/reports.types.ts:789](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L789) |
| <a id="kiz"></a> `kiz` | `string` \| `null` | Labeling code (Chestny ZNAK), nullable | [types/reports.types.ts:791](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L791) |
| <a id="nmid"></a> `nmId` | `number` | WB item number (nmID) | [types/reports.types.ts:793](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L793) |
| <a id="orderdt"></a> `orderDt` | `string` | Date of the return order (YYYY-MM-DD) | [types/reports.types.ts:795](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L795) |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID | [types/reports.types.ts:797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L797) |
| <a id="readytoreturndt"></a> `readyToReturnDt` | `string` \| `null` | Date and time when the return is ready for pickup (nullable) | [types/reports.types.ts:799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L799) |
| <a id="returnreason"></a> `returnReason?` | `string` | Reason for the return. Returned only when `returnType` is `"Возврат неопознанного товара"`. | [types/reports.types.ts:804](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L804) |
| <a id="returntype"></a> `returnType` | `string` | Return type (e.g. `"Возврат заблокированного товара"`) | [types/reports.types.ts:806](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L806) |
| <a id="shkid"></a> `shkId` | `number` | Item unit number (ШК) | [types/reports.types.ts:808](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L808) |
| <a id="srid"></a> `srid` | `string` | Return order ID (srid) | [types/reports.types.ts:810](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L810) |
| <a id="returnstatus"></a> `returnStatus` | `string` | Return status (e.g. `"В пути в пвз"`) | [types/reports.types.ts:812](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L812) |
| <a id="stickerid"></a> `stickerId` | `string` | Sticker of the return order | [types/reports.types.ts:814](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L814) |
| <a id="subjectname"></a> `subjectName` | `string` | Subcategory (subject) | [types/reports.types.ts:816](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L816) |
| <a id="techsize"></a> `techSize` | `string` | Size | [types/reports.types.ts:818](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L818) |
