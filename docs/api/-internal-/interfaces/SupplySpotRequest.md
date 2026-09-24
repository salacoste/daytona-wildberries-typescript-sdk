[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplySpotRequest

# Interface: SupplySpotRequest

Defined in: [types/orders-fbs.types.ts:998](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L998)

Request body for adding SPOT data to a supply.
Maps to the inline request body of PUT /api/marketplace/v3/fbs/supplies/{supplyId}/spot

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="carriername"></a> `carrierName` | `string` | Carrier name (1-1000 chars) | [types/orders-fbs.types.ts:1000](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1000) |
| <a id="carriertaxnumber"></a> `carrierTaxNumber` | `string` | Carrier tax number (1-50 chars) | [types/orders-fbs.types.ts:1002](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1002) |
| <a id="carriercountrycode"></a> `carrierCountryCode` | `string` | Carrier country code in the OKSM classifier (exactly 3 digits) — see `getSpotCountries()` | [types/orders-fbs.types.ts:1004](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1004) |
| <a id="vehicleregistrationnumber"></a> `vehicleRegistrationNumber` | `string` | Vehicle registration number (1-30 chars) | [types/orders-fbs.types.ts:1006](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1006) |
| <a id="trailerregistrationnumber"></a> `trailerRegistrationNumber?` | `string` | Trailer registration number (1-30 chars) | [types/orders-fbs.types.ts:1008](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1008) |
