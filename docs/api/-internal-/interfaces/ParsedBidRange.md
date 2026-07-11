[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ParsedBidRange

# Interface: ParsedBidRange

Defined in: [errors/bid-out-of-range-error.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L17)

Parsed components of a WB advert "wrong bid value" 400 detail string.

WB returns the out-of-range bid rejection as an RFC 7807 body whose `detail`
has the shape `'wrong bid value: <received>; min: <min>[; max: <max>]'`.
`received` and `min` are always present; `max` is only present when WB
reports a ceiling (currently unobserved — see task-135 experiment (c)).

The numeric unit depends on which endpoint rejected the bid:
- `updateBids` → **kopecks** (e.g. `250` = 2.50 RUB)
- `setNormqueryBids` → **RUB** (whole rubles)

The parser is unit-agnostic; it only extracts the numbers.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="received"></a> `received` | `number` | The bid value WB rejected (the "wrong bid value"). | [errors/bid-out-of-range-error.ts:19](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L19) |
| <a id="min"></a> `min` | `number` | The minimum accepted bid (the floor). | [errors/bid-out-of-range-error.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L21) |
| <a id="max"></a> `max?` | `number` | The maximum accepted bid (the ceiling), only when WB reports one. | [errors/bid-out-of-range-error.ts:23](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L23) |
