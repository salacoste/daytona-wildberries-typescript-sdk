[Wildberries API TypeScript SDK](../modules.md) / ExciseReportRequest

# Interface: ExciseReportRequest

Defined in: [types/reports.types.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L224)

Request body for excise/marked goods report

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="countries"></a> `countries?` | (`"AM"` \| `"BY"` \| `"KG"` \| `"KZ"` \| `"RU"` \| `"UZ"`)[] | Country codes by ISO 3166-2 standard. Leave empty to get data for all countries Supported countries: - AM: Armenia - BY: Belarus - KG: Kyrgyzstan - KZ: Kazakhstan - RU: Russia - UZ: Uzbekistan | [types/reports.types.ts:236](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L236) |
| <a id="brands"></a> `brands?` | `string`[] | Optional brand filters | [types/reports.types.ts:238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L238) |
| <a id="inns"></a> `inns?` | `string`[] | Optional INN (tax identification number) filters | [types/reports.types.ts:240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/reports.types.ts#L240) |
