[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PinnedReviewItemResult

# Interface: PinnedReviewItemResult

Defined in: [types/communications.types.ts:135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L135)

Detailed information about a pinned/unpinned review

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="changestateat"></a> `changeStateAt` | `string` | Date and time of pin/unpin operation | [types/communications.types.ts:137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L137) |
| <a id="imtid"></a> `imtId` | `number` | IMT ID for merged product cards | [types/communications.types.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L139) |
| <a id="nmid"></a> `nmId` | `number` | WB article number | [types/communications.types.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L141) |
| <a id="pinid"></a> `pinId` | `number` | Pin operation ID | [types/communications.types.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L143) |
| <a id="pinmethod"></a> `pinMethod` | [`ReviewPinMethod`](../type-aliases/ReviewPinMethod.md) | Pin method | [types/communications.types.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L145) |
| <a id="pinon"></a> `pinOn` | [`ReviewPinOn`](../type-aliases/ReviewPinOn.md) | Pin location | [types/communications.types.ts:147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L147) |
| <a id="feedbackid"></a> `feedbackId` | `string` | Review ID | [types/communications.types.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L149) |
| <a id="state"></a> `state` | [`ReviewState`](../type-aliases/ReviewState.md) | Review pin state | [types/communications.types.ts:151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L151) |
| <a id="unpinnedcause"></a> `unpinnedCause?` | [`UnpinnedCause`](../type-aliases/UnpinnedCause.md) | Cause for automatic unpinning (only for unpinned reviews) | [types/communications.types.ts:153](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/communications.types.ts#L153) |
