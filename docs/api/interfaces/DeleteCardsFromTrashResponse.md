[Wildberries API TypeScript SDK](../modules.md) / DeleteCardsFromTrashResponse

# Interface: DeleteCardsFromTrashResponse

Defined in: [types/products.types.ts:1121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L1121)

Response from [ProductsModule.deleteCardsFromTrash](../classes/ProductsModule.md#deletecardsfromtrash).

Standard WB content-api envelope: `error` flag + `errorText` for failure modes,
`additionalErrors` for per-card errors when partial failure, empty `data` object
on success (WB does not return the deleted nmIDs back).

## Since

3.13.1

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | `Record`\<`string`, `never`\> | - | [types/products.types.ts:1122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L1122) |
| <a id="error"></a> `error?` | `boolean` | - | [types/products.types.ts:1123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L1123) |
| <a id="errortext"></a> `errorText?` | `string` | - | [types/products.types.ts:1124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L1124) |
| <a id="additionalerrors"></a> `additionalErrors?` | `Record`\<`string`, `string`\> | Per-card error details (when partial failure). Keys are card identifiers (e.g., nmID as string), values are error messages. WB sandbox returns `{}` on full-success; this shape accommodates the per-card-error case documented in the JSDoc above. NOTE: Intentional divergence from `createCardsRecover`'s `Record<string, never>` — this field's JSDoc semantics ("per-card errors") require a value type of `string`, not `never`. `Record<string, never>` can only represent `{}` and cannot hold any per-card error map. See story-task-139 Implementation Notes for rationale. | [types/products.types.ts:1135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/products.types.ts#L1135) |
