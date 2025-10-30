[Wildberries API TypeScript SDK](../modules.md) / GoodCard

# Interface: GoodCard

Defined in: [types/communications.types.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L16)

Order information attached to a chat message

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date` | `string` | Order date | [types/communications.types.ts:20](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L20) |
| <a id="needrefund"></a> ~~`needRefund?`~~ | `boolean` | **Deprecated** This field will be removed. Use separate method for customer return requests. Whether return is requested: - `false` — not requested - `true` — requested | [types/communications.types.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L28) |
| <a id="nmid"></a> `nmID` | `number` | Wildberries product ID (nmID) | [types/communications.types.ts:33](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L33) |
| <a id="price"></a> `price` | `number` | Actual price with all discounts applied (charged to customer) | [types/communications.types.ts:38](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L38) |
| <a id="pricecurrency"></a> `priceCurrency` | `string` | Currency code (e.g., 'RUB') | [types/communications.types.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L43) |
| <a id="rid"></a> `rid` | `string` | Unique order ID Note: `rid` is equivalent to `srid` in Orders/Sales API responses | [types/communications.types.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L49) |
| <a id="size"></a> `size` | `string` | Product size (corresponds to `wbSize` in product card) | [types/communications.types.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L54) |
| <a id="statusid"></a> `statusID` | `number` | Product order status: - `0` — Active - `1` — Created - `2` — Being collected - `3` — In transit - `4` — Waiting at pickup point - `5` — With courier - `10` — Archived - `11` — Purchased - `12` — Cancelled - `13` — Return requested - `14` — Cancelled (out of stock) | [types/communications.types.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L70) |
