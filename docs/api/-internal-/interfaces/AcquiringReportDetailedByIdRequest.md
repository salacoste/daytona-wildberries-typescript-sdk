[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedByIdRequest

# Interface: AcquiringReportDetailedByIdRequest

Defined in: [types/finances.types.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L439)

Request body for `getAcquiringReportsDetailedByReportId()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L441) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки для пагинации | [types/finances.types.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L443) |
| <a id="fields"></a> `fields?` | keyof [`AcquiringReportDetailedItem`](AcquiringReportDetailedItem.md)[] | Список полей в ответе. Если не указан, возвращаются все поля. **Since** v3.8.0 — narrowed from `string[]` to `AcquiringReportDetailedField[]`. | [types/finances.types.ts:445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L445) |
