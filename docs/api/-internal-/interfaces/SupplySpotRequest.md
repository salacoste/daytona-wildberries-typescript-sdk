[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplySpotRequest

# Interface: SupplySpotRequest

Defined in: [types/orders-fbs.types.ts:1070](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1070)

Request body for adding SPOT data to a supply.
Maps to the inline request body of PUT /api/marketplace/v3/fbs/supplies/{supplyId}/spot

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="carriername"></a> `carrierName` | `string` | Carrier name (1-1000 chars) | [types/orders-fbs.types.ts:1072](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1072) |
| <a id="carriertaxnumber"></a> `carrierTaxNumber` | `string` | Carrier tax number (1-50 chars) | [types/orders-fbs.types.ts:1074](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1074) |
| <a id="carriercountrycode"></a> `carrierCountryCode` | `string` | Carrier country code in the OKSM classifier (exactly 3 digits) — see `getSpotCountries()` | [types/orders-fbs.types.ts:1076](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1076) |
| <a id="vehicleregistrationnumber"></a> `vehicleRegistrationNumber` | `string` | Vehicle registration number (1-30 chars) | [types/orders-fbs.types.ts:1078](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1078) |
| <a id="trailerregistrationnumber"></a> `trailerRegistrationNumber?` | `string` | Trailer registration number (1-30 chars) | [types/orders-fbs.types.ts:1080](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1080) |
