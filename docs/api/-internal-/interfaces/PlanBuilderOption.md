[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderOption

# Interface: PlanBuilderOption

Defined in: [types/general.types.ts:347](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L347)

An option activated in the Plan Builder outside of any package.

## Since

3.16.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Option ID | [types/general.types.ts:349](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L349) |
| <a id="slug"></a> `slug` | `string` | Option code (slug) | [types/general.types.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L351) |
| <a id="name"></a> `name` | `string` | Option name in the language specified in the `locale` parameter | [types/general.types.ts:353](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L353) |
| <a id="status"></a> `status` | [`PlanBuilderActivationStatus`](../type-aliases/PlanBuilderActivationStatus.md) | Option activation status | [types/general.types.ts:355](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L355) |
| <a id="activatedat"></a> `activatedAt?` | `string` | Option activation date (ISO 8601) | [types/general.types.ts:357](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L357) |
| <a id="expiresat"></a> `expiresAt?` | `string` | End date of the minimum duration period; the option cannot be deactivated before this date (ISO 8601) | [types/general.types.ts:359](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L359) |
| <a id="commissionrate"></a> `commissionRate?` | `number` | Cost of activating the option, % of turnover. Returned if the response does not contain the `promotion` object | [types/general.types.ts:361](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L361) |
| <a id="periodduration"></a> `periodDuration?` | `number` | Minimum duration of the option | [types/general.types.ts:363](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L363) |
| <a id="promotion"></a> `promotion?` | [`PlanBuilderPromotion`](PlanBuilderPromotion.md) | Promo details. Present only if the option is activated via a promo whose period has not expired | [types/general.types.ts:365](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L365) |
