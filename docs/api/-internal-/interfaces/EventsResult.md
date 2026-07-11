[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / EventsResult

# Interface: EventsResult

Defined in: [types/communications.types.ts:588](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L588)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next?` | `number` | Пагинатор. Значение поля необходимо указать в запросе для получения следующего пакета данных. | [types/communications.types.ts:590](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L590) |
| <a id="newesteventtime"></a> `newestEventTime?` | `string` | Время новейшего события в ответе | [types/communications.types.ts:592](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L592) |
| <a id="oldesteventtime"></a> `oldestEventTime?` | `string` | Время старейшего события в ответе | [types/communications.types.ts:594](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L594) |
| <a id="totalevents"></a> `totalEvents?` | `number` | Количество событий | [types/communications.types.ts:596](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L596) |
| <a id="events"></a> `events?` | [`Event`](Event.md)[] | - | [types/communications.types.ts:597](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L597) |
