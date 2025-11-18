[Wildberries API TypeScript SDK](../modules.md) / WarehouseRemainsParams

# Interface: WarehouseRemainsParams

Defined in: [types/reports.types.ts:299](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L299)

Parameters for warehouse remains report generation

Can combine groupBy and filter parameters in any combination.

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="locale"></a> `locale?` | `"ru"` \| `"en"` \| `"zh"` | Language for subjectName and warehouseName fields: - ru: Russian (default) - en: English - zh: Chinese (warehouseName in English) | [types/reports.types.ts:306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L306) |
| <a id="groupbybrand"></a> `groupByBrand?` | `boolean` | Group by brands | [types/reports.types.ts:308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L308) |
| <a id="groupbysubject"></a> `groupBySubject?` | `boolean` | Group by subjects | [types/reports.types.ts:310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L310) |
| <a id="groupbysa"></a> `groupBySa?` | `boolean` | Group by seller articles | [types/reports.types.ts:312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L312) |
| <a id="groupbynm"></a> `groupByNm?` | `boolean` | Group by WB articles (nmId). When true, response includes volume field | [types/reports.types.ts:314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L314) |
| <a id="groupbybarcode"></a> `groupByBarcode?` | `boolean` | Group by barcodes | [types/reports.types.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L316) |
| <a id="groupbysize"></a> `groupBySize?` | `boolean` | Group by sizes | [types/reports.types.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L318) |
| <a id="filterpics"></a> `filterPics?` | `0` \| `1` \| `-1` | Filter by photos: - -1: Without photos - 0: No filter (default) - 1: With photos | [types/reports.types.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L325) |
| <a id="filtervolume"></a> `filterVolume?` | `0` \| `3` \| `-1` | Filter by volume: - -1: Without dimensions - 0: No filter (default) - 3: Over 3 liters | [types/reports.types.ts:332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/reports.types.ts#L332) |
