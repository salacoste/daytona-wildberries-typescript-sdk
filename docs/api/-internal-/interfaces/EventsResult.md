[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / EventsResult

# Interface: EventsResult

Defined in: [types/communications.types.ts:564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/communications.types.ts#L564)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next?` | `number` | Пагинатор. Значение поля необходимо указать в запросе для получения следующего пакета данных. | [types/communications.types.ts:566](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/communications.types.ts#L566) |
| <a id="newesteventtime"></a> `newestEventTime?` | `string` | Время новейшего события в ответе | [types/communications.types.ts:568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/communications.types.ts#L568) |
| <a id="oldesteventtime"></a> `oldestEventTime?` | `string` | Время старейшего события в ответе | [types/communications.types.ts:570](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/communications.types.ts#L570) |
| <a id="totalevents"></a> `totalEvents?` | `number` | Количество событий | [types/communications.types.ts:572](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/communications.types.ts#L572) |
| <a id="events"></a> `events?` | [`Event`](Event.md)[] | - | [types/communications.types.ts:573](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/communications.types.ts#L573) |
