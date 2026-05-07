[Wildberries API TypeScript SDK](../modules.md) / ReturnsApiRequest

# Interface: ReturnsApiRequest

Defined in: [types/returns.types.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L84)

Request parameters for `sdk.returns.getReturns()`.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | ISO 8601 date (YYYY-MM-DD). Required. Max 31 days range. | [types/returns.types.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L86) |
| <a id="dateto"></a> `dateTo` | `string` | ISO 8601 date (YYYY-MM-DD). Required. Must be >= dateFrom. | [types/returns.types.ts:88](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L88) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Filter by SKU. Pre-filter at WB level where supported, post-filter otherwise. | [types/returns.types.ts:90](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L90) |
| <a id="ordertype"></a> `orderType?` | `"fbo"` \| `"fbs"` | Filter by fulfillment type. If omitted, both FBO and FBS are fetched. | [types/returns.types.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L92) |
| <a id="includefbsstatushistory"></a> `includeFbsStatusHistory?` | `boolean` | Whether to fetch FBS status history for return categorization. **Default: false** to prevent N+1 rate-limit exhaustion. Reserved for v3.10.0 — currently NOT implemented; passing `true` adds a warning and falls back to skipping FBS source. | [types/returns.types.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L99) |
| <a id="fbsstatushistorylimit"></a> `fbsStatusHistoryLimit?` | `number` | Hard cap on FBS orders processed when includeFbsStatusHistory is true. Default: 100. | [types/returns.types.ts:101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L101) |
| <a id="limit"></a> `limit?` | `number` | Pagination limit applied to merged result. Default: no limit. | [types/returns.types.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L103) |
| <a id="offset"></a> `offset?` | `number` | Pagination offset applied to merged result. Default: 0. | [types/returns.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/returns.types.ts#L105) |
