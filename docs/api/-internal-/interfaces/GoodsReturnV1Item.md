[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsReturnV1Item

# Interface: GoodsReturnV1Item

Defined in: [types/reports.types.ts:830](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L830)

Item of the goods-return report (v1, analytics)

Field renames vs the old report: `barcode`→`sku`, `status`→`returnStatus`,
`reason`→`returnReason` (now returned only for unidentified-item returns);
`isStatusActive` is replaced by the `status` query parameter.

## See

task-212 - WB news 2026-09-24 (#16)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sku"></a> `sku` | `string` | SKU | [types/reports.types.ts:832](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L832) |
| <a id="brand"></a> `brand` | `string` | Brand | [types/reports.types.ts:834](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L834) |
| <a id="completeddt"></a> `completedDt` | `string` \| `null` | Date and time the seller received the return (null until received) | [types/reports.types.ts:836](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L836) |
| <a id="dstofficeaddress"></a> `dstOfficeAddress` | `string` | Address of the pick-up point where the seller receives returns | [types/reports.types.ts:838](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L838) |
| <a id="dstofficeid"></a> `dstOfficeId` | `number` | ID of the pick-up point where the seller receives returns | [types/reports.types.ts:840](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L840) |
| <a id="expireddt"></a> `expiredDt` | `string` \| `null` | Expiration date and time of the storage period (nullable) | [types/reports.types.ts:842](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L842) |
| <a id="kiz"></a> `kiz` | `string` \| `null` | Labeling code (Chestny ZNAK), nullable | [types/reports.types.ts:844](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L844) |
| <a id="nmid"></a> `nmId` | `number` | WB item number (nmID) | [types/reports.types.ts:846](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L846) |
| <a id="orderdt"></a> `orderDt` | `string` | Date of the return order (YYYY-MM-DD) | [types/reports.types.ts:848](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L848) |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID | [types/reports.types.ts:850](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L850) |
| <a id="readytoreturndt"></a> `readyToReturnDt` | `string` \| `null` | Date and time when the return is ready for pickup (nullable) | [types/reports.types.ts:852](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L852) |
| <a id="returnreason"></a> `returnReason?` | `string` | Reason for the return. Returned only when `returnType` is `"Возврат неопознанного товара"`. | [types/reports.types.ts:857](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L857) |
| <a id="returntype"></a> `returnType` | `string` | Return type (e.g. `"Возврат заблокированного товара"`) | [types/reports.types.ts:859](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L859) |
| <a id="shkid"></a> `shkId` | `number` | Item unit number (ШК) | [types/reports.types.ts:861](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L861) |
| <a id="srid"></a> `srid` | `string` | Return order ID (srid) | [types/reports.types.ts:863](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L863) |
| <a id="returnstatus"></a> `returnStatus` | `string` | Return status (e.g. `"В пути в пвз"`) | [types/reports.types.ts:865](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L865) |
| <a id="stickerid"></a> `stickerId` | `string` | Sticker of the return order | [types/reports.types.ts:867](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L867) |
| <a id="subjectname"></a> `subjectName` | `string` | Subcategory (subject) | [types/reports.types.ts:869](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L869) |
| <a id="techsize"></a> `techSize` | `string` | Size | [types/reports.types.ts:871](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L871) |
