[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderPromotion

# Interface: PlanBuilderPromotion

Defined in: [types/general.types.ts:323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L323)

Promo applied to a Plan Builder option.
Returned when the option is activated via a promo and the promo period has not expired.

## Since

3.16.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="commissionrate"></a> `commissionRate` | `number` | Cost of activating the option through a promo, % of turnover | [types/general.types.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L325) |
| <a id="expiresat"></a> `expiresAt` | `string` | End date of the promo price (ISO 8601) | [types/general.types.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L327) |
