[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / EventsResult

# Interface: EventsResult

Defined in: [types/communications.types.ts:619](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L619)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next?` | `number` | Пагинатор. Значение поля необходимо указать в запросе для получения следующего пакета данных. | [types/communications.types.ts:621](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L621) |
| <a id="newesteventtime"></a> `newestEventTime?` | `string` | Время новейшего события в ответе | [types/communications.types.ts:623](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L623) |
| <a id="oldesteventtime"></a> `oldestEventTime?` | `string` | Время старейшего события в ответе | [types/communications.types.ts:625](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L625) |
| <a id="totalevents"></a> `totalEvents?` | `number` | Количество событий | [types/communications.types.ts:627](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L627) |
| <a id="events"></a> `events?` | [`Event`](Event.md)[] | - | [types/communications.types.ts:628](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L628) |
