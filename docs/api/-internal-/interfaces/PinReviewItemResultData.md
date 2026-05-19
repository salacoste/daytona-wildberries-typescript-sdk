[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PinReviewItemResultData

# Interface: PinReviewItemResultData

Defined in: [types/communications.types.ts:117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L117)

Result item from pin operation

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="feedbackid"></a> `feedbackId` | `string` | Review ID | [types/communications.types.ts:119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L119) |
| <a id="pinid"></a> `pinId?` | `number` | Pin operation ID (absent if pinning failed) | [types/communications.types.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L121) |
| <a id="pinmethod"></a> `pinMethod` | [`ReviewPinMethod`](../type-aliases/ReviewPinMethod.md) | Pin method | [types/communications.types.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L123) |
| <a id="pinon"></a> `pinOn` | [`ReviewPinOn`](../type-aliases/ReviewPinOn.md) | Pin location | [types/communications.types.ts:125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L125) |
| <a id="iserrors"></a> `isErrors` | `boolean` | Whether there are errors | [types/communications.types.ts:127](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L127) |
| <a id="errors"></a> `errors?` | [`PinnedReviewError`](PinnedReviewError.md)[] | Error details if any | [types/communications.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/communications.types.ts#L129) |
