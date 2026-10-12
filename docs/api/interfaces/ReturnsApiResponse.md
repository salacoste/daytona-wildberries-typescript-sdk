[Wildberries API TypeScript SDK](../modules.md) / ReturnsApiResponse

# Interface: ReturnsApiResponse

Defined in: [types/returns.types.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L141)

Response from `sdk.returns.getReturns()`.

Aggregates FBO + FBS + Finance sources with full transparency about which
sources succeeded, were skipped, or failed.

## Since

v3.10.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`ReturnItem`](ReturnItem.md)[] | Unified return records, sorted by returnDate descending. | [types/returns.types.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L143) |
| <a id="total"></a> `total` | `number` | Total count BEFORE pagination (limit/offset). | [types/returns.types.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L145) |
| <a id="warnings"></a> `warnings` | `string`[] | Non-fatal warnings (e.g., FBS skipped due to opt-out). | [types/returns.types.ts:147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L147) |
| <a id="partialfailures"></a> `partialFailures` | [`PartialFailure`](PartialFailure.md)[] | Per-source failures (one source down, others succeed). | [types/returns.types.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L149) |
| <a id="_meta"></a> `_meta` | [`ReturnsMeta`](ReturnsMeta.md) | Per-source telemetry. | [types/returns.types.ts:151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/returns.types.ts#L151) |
