[Wildberries API TypeScript SDK](../modules.md) / Claim

# Interface: Claim

Defined in: [types/communications.types.ts:3908](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3908)

Customer return claim object

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Claim ID (UUID format) | [types/communications.types.ts:3912](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3912) |
| <a id="claim_type"></a> `claim_type` | `1` \| `3` | Claim source type: - 1: customer portal - 3: chat | [types/communications.types.ts:3919](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3919) |
| <a id="status"></a> `status` | `0` \| `1` \| `2` | Return decision status: - 0: under review - 1: rejected - 2: approved | [types/communications.types.ts:3927](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3927) |
| <a id="status_ex"></a> `status_ex` | `0` \| `1` \| `2` \| `5` \| `8` \| `10` | Product status: - 0: under review - 1: stays with customer (rejected) - 2: return to WB for disposal - 5: stays with customer (approved) - 8: returned for resale after check - 10: returned to seller | [types/communications.types.ts:3938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3938) |
| <a id="nm_id"></a> `nm_id` | `number` | Product nmId (Wildberries article) | [types/communications.types.ts:3943](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3943) |
| <a id="user_comment"></a> `user_comment` | `string` | Customer's comment about the issue | [types/communications.types.ts:3948](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3948) |
| <a id="wb_comment"></a> `wb_comment` | `string` \| `null` | Response message to customer | [types/communications.types.ts:3953](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3953) |
| <a id="dt"></a> `dt` | `string` | Claim creation date (ISO 8601) | [types/communications.types.ts:3958](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3958) |
| <a id="imt_name"></a> `imt_name` | `string` \| `null` | Product name | [types/communications.types.ts:3963](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3963) |
| <a id="order_dt"></a> `order_dt` | `string` | Order date (ISO 8601) | [types/communications.types.ts:3968](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3968) |
| <a id="dt_update"></a> `dt_update` | `string` | Last update date (ISO 8601) | [types/communications.types.ts:3973](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3973) |
| <a id="photos"></a> `photos` | `string`[] | Photo URLs from claim | [types/communications.types.ts:3978](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3978) |
| <a id="video_paths"></a> `video_paths` | `string`[] | Video URLs from claim | [types/communications.types.ts:3983](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3983) |
| <a id="actions"></a> `actions` | `string`[] | Available response actions - approve1: approve with defect check - approve2: approve and return product - autorefund1: approve without product return - reject1-3: reject with template - rejectcustom: reject with custom comment - approvecc1: approve for in-store pickup return - confirmreturngoodcc1: confirm pickup receipt | [types/communications.types.ts:3995](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3995) |
| <a id="price"></a> `price` | `number` | Price with discounts applied | [types/communications.types.ts:4000](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L4000) |
| <a id="currency_code"></a> `currency_code` | `string` | Currency code (e.g., '643' for RUB) | [types/communications.types.ts:4005](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L4005) |
| <a id="srid"></a> `srid` | `string` | Unique order ID (srid) | [types/communications.types.ts:4010](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L4010) |
