[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / JamSubscriptionStatus

# Interface: JamSubscriptionStatus

Defined in: [types/general.types.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/general.types.ts#L268)

Result of a Jam subscription status probe

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="tier"></a> `tier` | [`JamSubscriptionTier`](../type-aliases/JamSubscriptionTier.md) | Detected subscription tier | [types/general.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/general.types.ts#L270) |
| <a id="checkedat"></a> `checkedAt` | `string` | ISO 8601 timestamp when the check was performed | [types/general.types.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/general.types.ts#L272) |
| <a id="probecallsmade"></a> `probeCallsMade` | `number` | Number of probe API calls made (1 for advanced, 2 for standard/none) | [types/general.types.ts:274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/general.types.ts#L274) |
