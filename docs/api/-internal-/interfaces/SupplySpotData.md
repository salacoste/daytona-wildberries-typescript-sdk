[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplySpotData

# Interface: SupplySpotData

Defined in: [types/orders-fbs.types.ts:1036](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1036)

SPOT data for a single supply — echo of the data submitted via
`updateSupplySpot()` plus the DOPP formation status.
Maps to swagger schema: SupplySpotData

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="status"></a> `status` | [`SpotStatus`](../type-aliases/SpotStatus.md) | DOPP formation status: - `pending` — waiting for the DOPP (Declaration of Upcoming Supply) formation result - `completed` — DOPP formed successfully; the QR code can be fetched via `getSupplySpotStickers()` - `failed` — DOPP formation error; see `errorCode` | [types/orders-fbs.types.ts:1043](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1043) |
| <a id="carriername"></a> `carrierName` | `string` | Carrier name | [types/orders-fbs.types.ts:1045](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1045) |
| <a id="carriertaxnumber"></a> `carrierTaxNumber` | `string` | Carrier tax number | [types/orders-fbs.types.ts:1047](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1047) |
| <a id="carriercountrycode"></a> `carrierCountryCode` | `string` | Carrier country code in the OKSM classifier | [types/orders-fbs.types.ts:1049](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1049) |
| <a id="vehicleregistrationnumber"></a> `vehicleRegistrationNumber` | `string` | Vehicle registration number | [types/orders-fbs.types.ts:1051](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1051) |
| <a id="trailerregistrationnumber"></a> `trailerRegistrationNumber?` | `string` | Trailer registration number | [types/orders-fbs.types.ts:1053](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1053) |
| <a id="errorcode"></a> `errorCode?` | `"doppFailed"` | DOPP formation service error code; present when `status` is `failed`. Fix the SPOT data and re-submit via `updateSupplySpot()` | [types/orders-fbs.types.ts:1055](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1055) |
