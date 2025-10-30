[Wildberries API TypeScript SDK](../modules.md) / PayoutDetailResponse

# Interface: PayoutDetailResponse

Defined in: [types/finances.types.ts:503](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L503)

Detailed payout response
Complete payout information including fee breakdown

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Unique payout identifier | [types/finances.types.ts:505](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L505) |
| <a id="amount"></a> `amount` | `number` | Gross payout amount before fees | [types/finances.types.ts:507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L507) |
| <a id="date"></a> `date` | `string` | Payout date (ISO 8601 format) | [types/finances.types.ts:509](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L509) |
| <a id="status"></a> `status` | [`PayoutStatus`](../type-aliases/PayoutStatus.md) | Current payout status | [types/finances.types.ts:511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L511) |
| <a id="bankinfo"></a> `bankInfo` | [`BankTransferInfo`](BankTransferInfo.md) | Complete bank transfer information | [types/finances.types.ts:513](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L513) |
| <a id="currency"></a> `currency` | `string` | Currency code (e.g., 'RUB') | [types/finances.types.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L515) |
| <a id="feebreakdown"></a> `feeBreakdown` | [`PayoutFeeBreakdown`](PayoutFeeBreakdown.md) | Detailed fee breakdown | [types/finances.types.ts:517](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L517) |
| <a id="transactionids"></a> `transactionIds?` | `number`[] | List of transaction IDs included in payout | [types/finances.types.ts:519](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L519) |
| <a id="transactioncount"></a> `transactionCount?` | `number` | Number of transactions included | [types/finances.types.ts:521](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L521) |
| <a id="periodfrom"></a> `periodFrom?` | `string` | Period covered by payout | [types/finances.types.ts:523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L523) |
| <a id="periodto"></a> `periodTo?` | `string` | Period covered by payout | [types/finances.types.ts:525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L525) |
| <a id="notes"></a> `notes?` | `string` | Additional notes or comments | [types/finances.types.ts:527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L527) |
