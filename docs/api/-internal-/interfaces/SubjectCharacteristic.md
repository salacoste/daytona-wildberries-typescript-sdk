[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SubjectCharacteristic

# Interface: SubjectCharacteristic

Defined in: [types/products.types.ts:878](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L878)

Characteristic metadata for a product category (subject).
Returned by `getObjectCharc()`.

## Since

3.9.0

## See

[https://dev.wildberries.ru/docs/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki](https://dev.wildberries.ru/docs/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="charcid"></a> `charcID?` | `number` | Characteristic ID | [types/products.types.ts:880](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L880) |
| <a id="subjectname"></a> `subjectName?` | `string` | Subject (category) name | [types/products.types.ts:882](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L882) |
| <a id="subjectid"></a> `subjectID?` | `number` | Subject (category) ID | [types/products.types.ts:884](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L884) |
| <a id="name"></a> `name?` | `string` | Characteristic name | [types/products.types.ts:886](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L886) |
| <a id="required"></a> `required?` | `boolean` | Whether this characteristic is required in product cards | [types/products.types.ts:888](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L888) |
| <a id="isrequiredforcreate"></a> `isRequiredForCreate?` | `boolean` | Whether this characteristic is mandatory when **creating** a product card. Enforced by WB starting April 29, 2026 for select categories. Affected categories include: flash drives (1260), fitness bracelets (1514), hair straighteners (2314), blenders (614), nettops/mini PCs (8992), photo frames (28), calculators (977), lids (819), pillowcases (605), cleaning wipes (1202). **Since** 3.9.0 | [types/products.types.ts:900](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L900) |
| <a id="isvariable"></a> `isVariable?` | `boolean` | Whether product variants within a merged card can differ by this characteristic. Use when creating merged cards (`createCardsUpload()`) or attaching to existing merged cards (`createUploadAdd()`) — characteristics with `isVariable: true` can have different values across variants of the same merged card. **Since** 3.9.2 | [types/products.types.ts:909](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L909) |
| <a id="existnamedfield"></a> `existNamedField?` | `boolean` | Routing flag — indicates how this characteristic should be passed in card create/update requests: - `false` → include in the `characteristics[]` array. Example: `color` for a coffee grinder. - `true` → pass as a separate top-level request parameter (NOT in `characteristics[]`). Examples: `brand`, `height`, `length`, `name`, `width`, `weight`. **Important for validation helpers**: when this is `true`, the characteristic value is provided by the consumer outside `characteristics[]`. The `validateRequiredCharacteristics()` and `validateMergedCardVariants()` helpers, **starting in 3.10.2**, accept an optional `namedFields` parameter to correctly track these characteristics. (The helpers themselves were added in 3.9.0/3.9.2.) **Since** 3.10.2 **See** [https://dev.wildberries.ru/release-notes](https://dev.wildberries.ru/release-notes) | [types/products.types.ts:928](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L928) |
| <a id="hasfilter"></a> `hasFilter?` | `boolean` | Read-only flag from `getObjectCharc()`. When `true`, this characteristic appears as a buyer-facing filter on the WB storefront category page. **Consumer impact:** - Combined with `required: true`, marks a key/filter mandatory characteristic - Filter characteristics typically have higher priority for buyer discovery — surface them prominently in seller UIs - Read the obligation matrix in `docs/guides/mandatory-product-characteristics.md` for full routing logic **Since** 3.10.2 | [types/products.types.ts:942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L942) |
| <a id="unitname"></a> `unitName?` | `string` | Unit name (e.g., "см", "г") | [types/products.types.ts:944](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L944) |
| <a id="maxcount"></a> `maxCount?` | `number` | Maximum number of values for this characteristic | [types/products.types.ts:946](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L946) |
| <a id="popular"></a> `popular?` | `boolean` | Whether this is a popular/frequently used characteristic | [types/products.types.ts:948](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L948) |
| <a id="charctype"></a> `charcType?` | `number` | Characteristic value type: 0=string, 1=number, 4=array | [types/products.types.ts:950](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/products.types.ts#L950) |
