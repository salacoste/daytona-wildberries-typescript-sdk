[Wildberries API TypeScript SDK](../modules.md) / TemplateVariable

# Interface: TemplateVariable

Defined in: [types/communications.types.ts:1404](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1404)

Template variable for dynamic content insertion

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Variable name (used in template content as {{variable_name}}) | [types/communications.types.ts:1408](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1408) |
| <a id="displayname"></a> `displayName` | `string` | Variable display name for UI | [types/communications.types.ts:1413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1413) |
| <a id="type"></a> `type` | `"number"` \| `"boolean"` \| `"date"` \| `"text"` \| `"select"` \| `"multiline"` | Variable type | [types/communications.types.ts:1418](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1418) |
| <a id="required"></a> `required` | `boolean` | Whether this variable is required | [types/communications.types.ts:1423](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1423) |
| <a id="defaultvalue"></a> `defaultValue?` | `string` | Default value for the variable | [types/communications.types.ts:1428](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1428) |
| <a id="options"></a> `options?` | `string`[] | Available options (for 'select' type) | [types/communications.types.ts:1433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1433) |
| <a id="description"></a> `description?` | `string` | Variable description/help text | [types/communications.types.ts:1438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1438) |
| <a id="validationpattern"></a> `validationPattern?` | `string` | Regular expression for validation (optional) | [types/communications.types.ts:1443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1443) |
| <a id="maxlength"></a> `maxLength?` | `number` | Maximum length for text variables | [types/communications.types.ts:1448](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1448) |
