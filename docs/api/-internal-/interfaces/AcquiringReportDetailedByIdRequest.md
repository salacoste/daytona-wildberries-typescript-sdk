[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedByIdRequest

# Interface: AcquiringReportDetailedByIdRequest

Defined in: [types/finances.types.ts:680](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L680)

Request body for `getAcquiringReportsDetailedByReportId()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:682](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L682) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки для пагинации | [types/finances.types.ts:684](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L684) |
| <a id="fields"></a> `fields?` | keyof [`AcquiringReportDetailedItem`](AcquiringReportDetailedItem.md)[] | Список полей в ответе. Если не указан, возвращаются все поля. **Since** v3.8.0 — narrowed from `string[]` to `AcquiringReportDetailedField[]`. | [types/finances.types.ts:686](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L686) |
