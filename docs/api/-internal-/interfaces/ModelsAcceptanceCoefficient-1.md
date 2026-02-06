[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsAcceptanceCoefficient

# Interface: ModelsAcceptanceCoefficient

Defined in: [types/tariffs.types.ts:255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L255)

Acceptance coefficient for warehouse supplies
Used by getAcceptanceCoefficients endpoint
Returns tariffs for supplies to specific warehouses for the next 14 days

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date?` | `string` | Date when coefficient takes effect | [types/tariffs.types.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L257) |
| <a id="coefficient"></a> `coefficient?` | `number` | Acceptance coefficient: - `-1` — acceptance unavailable, regardless of allowUnload value - `0` — free acceptance - `1+` — acceptance cost multiplier | [types/tariffs.types.ts:264](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L264) |
| <a id="warehouseid"></a> `warehouseID?` | `number` | Warehouse ID. Can be used to get warehouse info | [types/tariffs.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L266) |
| <a id="warehousename"></a> `warehouseName?` | `string` | Warehouse name | [types/tariffs.types.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L268) |
| <a id="allowunload"></a> `allowUnload?` | `boolean` | Acceptance availability for supplies of this type (see boxTypeID): - `true` — acceptance available - `false` — acceptance not available | [types/tariffs.types.ts:274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L274) |
| <a id="boxtypeid"></a> `boxTypeID?` | `number` | Supply type ID: - `2` — Boxes - `5` — Monopallets - `6` — Supersafe For QR-supply with boxes, this field is not returned | [types/tariffs.types.ts:282](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L282) |
| <a id="storagecoef"></a> `storageCoef?` | `string` \| `null` | Storage coefficient | [types/tariffs.types.ts:284](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L284) |
| <a id="deliverycoef"></a> `deliveryCoef?` | `string` \| `null` | Logistics coefficient | [types/tariffs.types.ts:286](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L286) |
| <a id="deliverybaseliter"></a> `deliveryBaseLiter?` | `string` \| `null` | Logistics cost for first liter | [types/tariffs.types.ts:288](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L288) |
| <a id="deliveryadditionalliter"></a> `deliveryAdditionalLiter?` | `string` \| `null` | Logistics cost for each additional liter | [types/tariffs.types.ts:290](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L290) |
| <a id="storagebaseliter"></a> `storageBaseLiter?` | `string` \| `null` | Storage cost: - for pallets — cost per one pallet - for boxes — storage cost for the first liter | [types/tariffs.types.ts:296](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L296) |
| <a id="storageadditionalliter"></a> `storageAdditionalLiter?` | `string` \| `null` | Storage cost for each additional liter: - for pallets — always null, as storage cost per pallet unit is defined in storageBaseLiter - for boxes — storage cost for each additional liter | [types/tariffs.types.ts:302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L302) |
| <a id="issortingcenter"></a> `isSortingCenter?` | `boolean` | Warehouse type: - `true` — sorting center (SC) - `false` — regular | [types/tariffs.types.ts:308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/tariffs.types.ts#L308) |
