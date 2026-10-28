[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PlanBuilderPromotion

# Interface: PlanBuilderPromotion

Defined in: [types/general.types.ts:379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L379)

Promo applied to a Plan Builder option.
Returned when the option is activated via a promo and the promo period has not expired.

## Since

3.16.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="commissionrate"></a> `commissionRate` | `number` | Cost of activating the option through a promo, % of turnover | [types/general.types.ts:381](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L381) |
| <a id="expiresat"></a> `expiresAt` | `string` | End date of the promo price (ISO 8601) | [types/general.types.ts:383](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L383) |
