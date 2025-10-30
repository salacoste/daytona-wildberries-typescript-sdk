[Wildberries API TypeScript SDK](../modules.md) / ProductCard

# Interface: ProductCard

Defined in: [types/products.types.ts:852](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L852)

Full product card response

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID?` | `number` | Wildberries article ID | [types/products.types.ts:854](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L854) |
| <a id="imtid"></a> `imtID?` | `number` | Unified card ID | [types/products.types.ts:856](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L856) |
| <a id="nmuuid"></a> `nmUUID?` | `string` | UUID of the product card | [types/products.types.ts:858](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L858) |
| <a id="subjectid"></a> `subjectID?` | `number` | Subject/category ID | [types/products.types.ts:860](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L860) |
| <a id="subjectname"></a> `subjectName?` | `string` | Subject/category name | [types/products.types.ts:862](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L862) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Seller's article ID | [types/products.types.ts:864](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L864) |
| <a id="brand"></a> `brand?` | `string` | Brand name | [types/products.types.ts:866](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L866) |
| <a id="title"></a> `title?` | `string` | Product title | [types/products.types.ts:868](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L868) |
| <a id="description"></a> `description?` | `string` | Product description | [types/products.types.ts:870](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L870) |
| <a id="needkiz"></a> `needKiz?` | `boolean` | Requires KiZ marking | [types/products.types.ts:872](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L872) |
| <a id="photos"></a> `photos?` | \{ `big?`: `string`; `c246x328?`: `string`; `c516x688?`: `string`; `square?`: `string`; `tm?`: `string`; \}[] | Product photos | [types/products.types.ts:874](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L874) |
| <a id="video"></a> `video?` | `string` | Video URL | [types/products.types.ts:887](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L887) |
| <a id="wholesale"></a> `wholesale?` | \{ `enabled?`: `boolean`; `quantum?`: `number`; \} | Wholesale settings | [types/products.types.ts:889](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L889) |
| `wholesale.enabled?` | `boolean` | - | [types/products.types.ts:890](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L890) |
| `wholesale.quantum?` | `number` | - | [types/products.types.ts:891](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L891) |
| <a id="dimensions"></a> `dimensions?` | [`ProductDimensions`](ProductDimensions.md) & \{ `isValid?`: `boolean`; \} | Product dimensions | [types/products.types.ts:894](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L894) |
| <a id="characteristics"></a> `characteristics?` | \{ `id?`: `number`; `name?`: `string`; `value?`: `unknown`; \}[] | Product characteristics | [types/products.types.ts:899](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L899) |
| <a id="sizes"></a> `sizes?` | \{ `chrtID?`: `number`; `techSize?`: `string`; `wbSize?`: `string`; `skus?`: `string`[]; \}[] | Product sizes | [types/products.types.ts:908](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L908) |
| <a id="tags"></a> `tags?` | \{ `id?`: `number`; `name?`: `string`; `color?`: `string`; \}[] | Tags/labels | [types/products.types.ts:919](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L919) |
| <a id="createdat"></a> `createdAt?` | `string` | Creation timestamp (ISO 8601) | [types/products.types.ts:928](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L928) |
| <a id="updatedat"></a> `updatedAt?` | `string` | Last update timestamp (ISO 8601) | [types/products.types.ts:930](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L930) |
