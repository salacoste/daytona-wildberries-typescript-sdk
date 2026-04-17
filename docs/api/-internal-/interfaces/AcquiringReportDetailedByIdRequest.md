[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedByIdRequest

# Interface: AcquiringReportDetailedByIdRequest

Defined in: [types/finances.types.ts:659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L659)

Request body for `getAcquiringReportsDetailedByReportId()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:661](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L661) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки для пагинации | [types/finances.types.ts:663](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L663) |
| <a id="fields"></a> `fields?` | `string`[] | Список полей в ответе. Если не указан, возвращаются все поля. | [types/finances.types.ts:665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L665) |
