[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesReportDetailedByIdRequest

# Interface: SalesReportDetailedByIdRequest

Defined in: [types/finances.types.ts:365](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L365)

Request body for `getSalesReportsDetailedByReportId()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L367) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки ответа для пагинации. Начинайте с 0, затем передавайте rrdId последней строки предыдущего ответа. | [types/finances.types.ts:369](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L369) |
| <a id="fields"></a> `fields?` | `string`[] | Список полей в ответе. Если не указан, возвращаются все поля. | [types/finances.types.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/finances.types.ts#L371) |
