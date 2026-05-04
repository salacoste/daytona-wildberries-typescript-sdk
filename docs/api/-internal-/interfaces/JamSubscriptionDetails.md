[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / JamSubscriptionDetails

# Interface: JamSubscriptionDetails

Defined in: [types/general.types.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/general.types.ts#L295)

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
| <a id="state"></a> `state?` | `string` | Subscription state: 'active' or other values when inactive | [types/general.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/general.types.ts#L297) |
| <a id="activationsource"></a> `activationSource?` | `string` | How the subscription was activated (e.g., 'jam') | [types/general.types.ts:299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/general.types.ts#L299) |
| <a id="level"></a> `level?` | `string` | Subscription level (e.g., 'premium', 'standard') | [types/general.types.ts:301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/general.types.ts#L301) |
| <a id="since"></a> `since?` | `string` | Date of first subscription activation (ISO 8601) | [types/general.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/general.types.ts#L303) |
| <a id="till"></a> `till?` | `string` | End date of current/last paid period (ISO 8601) | [types/general.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/general.types.ts#L305) |
