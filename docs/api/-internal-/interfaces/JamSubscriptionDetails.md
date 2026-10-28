[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / JamSubscriptionDetails

# Interface: JamSubscriptionDetails

Defined in: [types/general.types.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L325)

Detailed Jam subscription information from GET /api/common/v1/subscriptions

- If seller never subscribed: empty 200 response (all fields undefined)
- If active: state='active', since/till populated
- If expired/cancelled then resubscribed: since = first activation, till = current period end
- If inactive: since = first activation, till = last paid period end

## Since

3.5.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="state"></a> `state?` | `"active"` \| `"inactive"` | Subscription state: 'active' when active, 'inactive' when expired or cancelled | [types/general.types.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L327) |
| <a id="activationsource"></a> `activationSource?` | `"constructor"` \| `"jam"` | How the subscription was activated: 'constructor' (Plan Builder) or 'jam' (Jam Subscription) | [types/general.types.ts:329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L329) |
| <a id="level"></a> `level?` | `"standard"` \| `"advanced"` \| `"premium"` | Subscription level | [types/general.types.ts:331](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L331) |
| <a id="since"></a> `since?` | `string` | Date of first subscription activation (ISO 8601) | [types/general.types.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L333) |
| <a id="till"></a> `till?` | `string` | End date of current/last paid period (ISO 8601) | [types/general.types.ts:335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/general.types.ts#L335) |
