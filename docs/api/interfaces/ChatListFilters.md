[Wildberries API TypeScript SDK](../modules.md) / ChatListFilters

# Interface: ChatListFilters

Defined in: [types/communications.types.ts:2817](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2817)

Chat list filters for enhanced chat retrieval

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="status"></a> `status?` | (`"closed"` \| `"archived"` \| `"active"`)[] | Filter by chat status | [types/communications.types.ts:2821](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2821) |
| <a id="priority"></a> `priority?` | (`"low"` \| `"high"` \| `"urgent"` \| `"normal"`)[] | Filter by priority | [types/communications.types.ts:2826](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2826) |
| <a id="assigneeid"></a> `assigneeId?` | `string` | Filter by assignee ID | [types/communications.types.ts:2831](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2831) |
| <a id="isvip"></a> `isVip?` | `boolean` | Filter by customer VIP status | [types/communications.types.ts:2836](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2836) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Filter by date range (YYYY-MM-DD format) | [types/communications.types.ts:2841](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2841) |
| <a id="dateto"></a> `dateTo?` | `string` | Filter by date range (YYYY-MM-DD format) | [types/communications.types.ts:2846](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2846) |
| <a id="tags"></a> `tags?` | `string`[] | Filter by tags | [types/communications.types.ts:2851](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2851) |
| <a id="source"></a> `source?` | (`"question"` \| `"review"` \| `"order"` \| `"manual"`)[] | Filter by source | [types/communications.types.ts:2856](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2856) |
| <a id="hasunread"></a> `hasUnread?` | `boolean` | Filter by unread messages only | [types/communications.types.ts:2861](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2861) |
| <a id="customersearch"></a> `customerSearch?` | `string` | Search by customer name or email | [types/communications.types.ts:2866](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2866) |
| <a id="sortby"></a> `sortBy?` | `"createdAt"` \| `"priority"` \| `"lastActivityAt"` \| `"messageCount"` | Sort results by field | [types/communications.types.ts:2871](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2871) |
| <a id="sortorder"></a> `sortOrder?` | `"asc"` \| `"desc"` | Sort order direction | [types/communications.types.ts:2876](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2876) |
| <a id="limit"></a> `limit?` | `number` | Limit number of results (1-100) | [types/communications.types.ts:2881](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2881) |
| <a id="offset"></a> `offset?` | `number` | Offset for pagination | [types/communications.types.ts:2886](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2886) |
