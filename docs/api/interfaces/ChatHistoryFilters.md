[Wildberries API TypeScript SDK](../modules.md) / ChatHistoryFilters

# Interface: ChatHistoryFilters

Defined in: [types/communications.types.ts:2762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2762)

Filters for chat history retrieval

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="messagetype"></a> `messageType?` | `"text"` \| `"system"` \| `"file"` \| `"image"` | Filter by message type | [types/communications.types.ts:2766](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2766) |
| <a id="sender"></a> `sender?` | `"client"` \| `"seller"` \| `"system"` | Filter by sender | [types/communications.types.ts:2771](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2771) |
| <a id="datefrom"></a> `dateFrom?` | `string` | Filter by date range (YYYY-MM-DD format) | [types/communications.types.ts:2776](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2776) |
| <a id="dateto"></a> `dateTo?` | `string` | Filter by date range (YYYY-MM-DD format) | [types/communications.types.ts:2781](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2781) |
| <a id="readstatus"></a> `readStatus?` | `boolean` | Filter by read status | [types/communications.types.ts:2786](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2786) |
| <a id="hasattachments"></a> `hasAttachments?` | `boolean` | Include attachments only | [types/communications.types.ts:2791](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2791) |
| <a id="searchtext"></a> `searchText?` | `string` | Search message content | [types/communications.types.ts:2796](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2796) |
| <a id="sortorder"></a> `sortOrder?` | `"asc"` \| `"desc"` | Sort order | [types/communications.types.ts:2801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2801) |
| <a id="limit"></a> `limit?` | `number` | Limit number of messages (1-100) | [types/communications.types.ts:2806](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2806) |
| <a id="offset"></a> `offset?` | `number` | Offset for pagination | [types/communications.types.ts:2811](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2811) |
