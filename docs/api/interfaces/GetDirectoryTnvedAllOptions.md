[Wildberries API TypeScript SDK](../modules.md) / GetDirectoryTnvedAllOptions

# Interface: GetDirectoryTnvedAllOptions

Defined in: [types/products.types.ts:930](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L930)

Query parameters for GET /api/content/v2/directory/tnved/all.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="search"></a> `search?` | `number` | First digits of a TN VED code. The upstream schema declares an integer. | [types/products.types.ts:932](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L932) |
| <a id="locale"></a> `locale?` | [`TnvedDirectoryLocale`](../type-aliases/TnvedDirectoryLocale.md) | Response language. Defaults to `ru`. | [types/products.types.ts:934](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L934) |
