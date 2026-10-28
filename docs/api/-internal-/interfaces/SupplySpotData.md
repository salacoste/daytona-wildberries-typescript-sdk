[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplySpotData

# Interface: SupplySpotData

Defined in: [types/orders-fbs.types.ts:1108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1108)

SPOT data for a single supply — echo of the data submitted via
`updateSupplySpot()` plus the DOPP formation status.
Maps to swagger schema: SupplySpotData

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="status"></a> `status` | [`SpotStatus`](../type-aliases/SpotStatus.md) | DOPP formation status: - `pending` — waiting for the DOPP (Declaration of Upcoming Supply) formation result - `completed` — DOPP formed successfully; the QR code can be fetched via `getSupplySpotStickers()` - `failed` — DOPP formation error; see `errorCode` | [types/orders-fbs.types.ts:1115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1115) |
| <a id="carriername"></a> `carrierName` | `string` | Carrier name | [types/orders-fbs.types.ts:1117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1117) |
| <a id="carriertaxnumber"></a> `carrierTaxNumber` | `string` | Carrier tax number | [types/orders-fbs.types.ts:1119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1119) |
| <a id="carriercountrycode"></a> `carrierCountryCode` | `string` | Carrier country code in the OKSM classifier | [types/orders-fbs.types.ts:1121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1121) |
| <a id="vehicleregistrationnumber"></a> `vehicleRegistrationNumber` | `string` | Vehicle registration number | [types/orders-fbs.types.ts:1123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1123) |
| <a id="trailerregistrationnumber"></a> `trailerRegistrationNumber?` | `string` | Trailer registration number | [types/orders-fbs.types.ts:1125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1125) |
| <a id="errorcode"></a> `errorCode?` | `"doppFailed"` | DOPP formation service error code; present when `status` is `failed`. Fix the SPOT data and re-submit via `updateSupplySpot()` | [types/orders-fbs.types.ts:1127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1127) |
