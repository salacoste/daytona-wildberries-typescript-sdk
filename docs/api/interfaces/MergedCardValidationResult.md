[Wildberries API TypeScript SDK](../modules.md) / MergedCardValidationResult

# Interface: MergedCardValidationResult

Defined in: [utils/validateMergedCardVariants.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/utils/validateMergedCardVariants.ts#L16)

Result of merged card variant validation.

## Since

v3.9.2

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="divergentfixedchars"></a> `divergentFixedChars` | [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[] | Non-variable characteristics (isVariable: false) that have DIFFERENT values across variants — WB will reject these. | [utils/validateMergedCardVariants.ts:18](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/utils/validateMergedCardVariants.ts#L18) |
| <a id="identicalvariablechars"></a> `identicalVariableChars` | [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[] | Variable characteristics (isVariable: true) that have IDENTICAL values across all variants — possibly intentional, but flagged for review. | [utils/validateMergedCardVariants.ts:20](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/utils/validateMergedCardVariants.ts#L20) |
| <a id="duplicatevariants"></a> `duplicateVariants` | `boolean` | True if two or more variants share the exact same combination of variable characteristic values (duplicate variants — WB rejects). | [utils/validateMergedCardVariants.ts:22](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/utils/validateMergedCardVariants.ts#L22) |
