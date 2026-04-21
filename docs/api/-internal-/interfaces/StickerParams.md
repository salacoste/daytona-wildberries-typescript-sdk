[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StickerParams

# Interface: StickerParams

Defined in: [types/orders-fbs.types.ts:68](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/orders-fbs.types.ts#L68)

Query parameters for sticker format and dimensions

## Indexable

```ts
[key: string]: unknown
```

Index signature for compatibility with Record<string, unknown>

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | [`StickerType`](../type-aliases/StickerType.md) | Output format | [types/orders-fbs.types.ts:70](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/orders-fbs.types.ts#L70) |
| <a id="width"></a> `width` | `number` | Sticker width in mm (58 or 40) | [types/orders-fbs.types.ts:72](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/orders-fbs.types.ts#L72) |
| <a id="height"></a> `height` | `number` | Sticker height in mm (40 or 30) | [types/orders-fbs.types.ts:74](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/orders-fbs.types.ts#L74) |
