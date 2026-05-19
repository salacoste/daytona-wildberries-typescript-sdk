[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / EventsResult

# Interface: EventsResult

Defined in: [types/communications.types.ts:610](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L610)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next?` | `number` | Пагинатор. Значение поля необходимо указать в запросе для получения следующего пакета данных. | [types/communications.types.ts:612](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L612) |
| <a id="newesteventtime"></a> `newestEventTime?` | `string` | Время новейшего события в ответе | [types/communications.types.ts:614](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L614) |
| <a id="oldesteventtime"></a> `oldestEventTime?` | `string` | Время старейшего события в ответе | [types/communications.types.ts:616](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L616) |
| <a id="totalevents"></a> `totalEvents?` | `number` | Количество событий | [types/communications.types.ts:618](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L618) |
| <a id="events"></a> `events?` | [`Event`](Event.md)[] | - | [types/communications.types.ts:619](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L619) |
