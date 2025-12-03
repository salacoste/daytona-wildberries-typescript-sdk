[Wildberries API TypeScript SDK](../modules.md) / TemplateOperationResponse

# Interface: TemplateOperationResponse

Defined in: [types/communications.types.ts:1754](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1754)

Response from template operations (create/update/delete)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="success"></a> `success` | `boolean` | Whether the operation was successful | [types/communications.types.ts:1758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1758) |
| <a id="template"></a> `template?` | [`Template`](Template.md) | Template ID (for create operations) or updated template (for update operations) | [types/communications.types.ts:1763](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1763) |
| <a id="operation"></a> `operation` | `"create"` \| `"update"` \| `"delete"` | Operation performed ('create', 'update', 'delete') | [types/communications.types.ts:1768](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1768) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:1773](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1773) |
| <a id="errortext"></a> `errorText?` | `string` | Error description text | [types/communications.types.ts:1778](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1778) |
| <a id="additionalerrors"></a> `additionalErrors?` | `string`[] | Additional errors array | [types/communications.types.ts:1783](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1783) |
| <a id="validationerrors"></a> `validationErrors?` | \{ `field`: `string`; `message`: `string`; \}[] | Validation errors by field (for create/update operations) | [types/communications.types.ts:1788](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1788) |
