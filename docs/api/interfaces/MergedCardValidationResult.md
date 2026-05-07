[Wildberries API TypeScript SDK](../modules.md) / MergedCardValidationResult

# Interface: MergedCardValidationResult

Defined in: [utils/validateMergedCardVariants.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/utils/validateMergedCardVariants.ts#L17)

Result of merged card variant validation.

## Since

v3.9.2

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="divergentfixedchars"></a> `divergentFixedChars` | [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[] | Non-variable characteristics (isVariable: false) that have DIFFERENT values across variants — WB will reject these. | [utils/validateMergedCardVariants.ts:19](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/utils/validateMergedCardVariants.ts#L19) |
| <a id="identicalvariablechars"></a> `identicalVariableChars` | [`SubjectCharacteristic`](../-internal-/interfaces/SubjectCharacteristic.md)[] | Variable characteristics (isVariable: true) that have IDENTICAL values across all variants — possibly intentional, but flagged for review. | [utils/validateMergedCardVariants.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/utils/validateMergedCardVariants.ts#L21) |
| <a id="duplicatevariants"></a> `duplicateVariants` | `boolean` | True if two or more variants share the exact same combination of variable characteristic values (duplicate variants — WB rejects). | [utils/validateMergedCardVariants.ts:23](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/utils/validateMergedCardVariants.ts#L23) |
