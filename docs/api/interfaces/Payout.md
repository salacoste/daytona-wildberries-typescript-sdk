[Wildberries API TypeScript SDK](../modules.md) / Payout

# Interface: Payout

Defined in: [types/finances.types.ts:462](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L462)

Individual payout record
Basic payout information in list view

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Unique payout identifier | [types/finances.types.ts:464](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L464) |
| <a id="amount"></a> `amount` | `number` | Gross payout amount before fees | [types/finances.types.ts:466](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L466) |
| <a id="date"></a> `date` | `string` | Payout date (ISO 8601 format) | [types/finances.types.ts:468](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L468) |
| <a id="status"></a> `status` | [`PayoutStatus`](../type-aliases/PayoutStatus.md) | Current payout status | [types/finances.types.ts:470](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L470) |
| <a id="bankinfo"></a> `bankInfo` | [`BankTransferInfo`](BankTransferInfo.md) | Bank account information (masked) | [types/finances.types.ts:472](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L472) |
| <a id="currency"></a> `currency` | `string` | Currency code (e.g., 'RUB') | [types/finances.types.ts:474](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L474) |
| <a id="transactioncount"></a> `transactionCount?` | `number` | Number of transactions included in payout | [types/finances.types.ts:476](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/finances.types.ts#L476) |
