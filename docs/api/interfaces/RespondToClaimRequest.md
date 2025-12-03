[Wildberries API TypeScript SDK](../modules.md) / RespondToClaimRequest

# Interface: RespondToClaimRequest

Defined in: [types/communications.types.ts:4031](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L4031)

Request for respondToClaim() method

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Claim ID (UUID format, required) | [types/communications.types.ts:4035](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L4035) |
| <a id="action"></a> `action` | `string` | Action to take on claim (required) Use one of values from claim's `actions` array | [types/communications.types.ts:4041](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L4041) |
| <a id="comment"></a> `comment?` | `string` | Comment for response (optional) Required when action is 'rejectcustom' Optional for 'approvecc1' Min 10 chars, max 1000 chars | [types/communications.types.ts:4049](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L4049) |
