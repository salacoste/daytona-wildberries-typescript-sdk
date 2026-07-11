[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / JamSubscriptionDetails

# Interface: JamSubscriptionDetails

Defined in: [types/general.types.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L269)

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
| <a id="state"></a> `state?` | `"active"` \| `"inactive"` | Subscription state: 'active' when active, 'inactive' when expired or cancelled | [types/general.types.ts:271](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L271) |
| <a id="activationsource"></a> `activationSource?` | `"constructor"` \| `"jam"` | How the subscription was activated: 'constructor' (Plan Builder) or 'jam' (Jam Subscription) | [types/general.types.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L273) |
| <a id="level"></a> `level?` | `"standard"` \| `"advanced"` \| `"premium"` | Subscription level | [types/general.types.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L275) |
| <a id="since"></a> `since?` | `string` | Date of first subscription activation (ISO 8601) | [types/general.types.ts:277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L277) |
| <a id="till"></a> `till?` | `string` | End date of current/last paid period (ISO 8601) | [types/general.types.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/general.types.ts#L279) |
