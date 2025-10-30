[Wildberries API TypeScript SDK](../modules.md) / EventsResult

# Interface: EventsResult

Defined in: [types/communications.types.ts:326](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L326)

Result object containing events and pagination data

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next` | `number` | Cursor for next page (Unix timestamp with milliseconds) Use this value in the next getChatEvents() call to fetch subsequent events | [types/communications.types.ts:331](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L331) |
| <a id="newesteventtime"></a> `newestEventTime` | `string` \| `null` | Timestamp of newest event in response (RFC 3339 format) | [types/communications.types.ts:336](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L336) |
| <a id="oldesteventtime"></a> `oldestEventTime` | `string` \| `null` | Timestamp of oldest event in response (RFC 3339 format) | [types/communications.types.ts:341](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L341) |
| <a id="totalevents"></a> `totalEvents` | `number` | Number of events in this response When `totalEvents` is 0, there are no more events to fetch | [types/communications.types.ts:347](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L347) |
| <a id="events"></a> `events` | [`ChatEvent`](ChatEvent.md)[] | Array of chat events | [types/communications.types.ts:352](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L352) |
