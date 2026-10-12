[Wildberries API TypeScript SDK](../modules.md) / WITH\_PHOTO\_FILTER

# Variable: WITH\_PHOTO\_FILTER

```ts
const WITH_PHOTO_FILTER: {
  ALL: -1;
  WITH_PHOTO: 1;
  NO_PHOTO: 2;
};
```

Defined in: [modules/products/index.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/modules/products/index.ts#L73)

Filter values for [ProductsModule.getCardsList](../classes/ProductsModule.md#getcardslist) `data.settings.filter.withPhoto`.

**Deadline 2026-06-16**: WB changes the semantic of value `0`. After the deadline, `0`
(or missing parameter) means "ALL cards" (not "no photo only"). The NEW value `2`
replaces the old `0` semantic for "no photo only" cards.

Using this const instead of magic numbers makes consumer code survive the schema change
automatically — `WITH_PHOTO_FILTER.NO_PHOTO` resolves to `2` (the new value) in v3.14.0+.

## Type Declaration

| Name | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="all"></a> `ALL` | `-1` | `-1` | All cards regardless of photo state. Same semantic before and after 2026-06-16. | [modules/products/index.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/modules/products/index.ts#L75) |
| <a id="with_photo"></a> `WITH_PHOTO` | `1` | `1` | Only cards WITH photo. Same semantic before and after 2026-06-16. | [modules/products/index.ts:77](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/modules/products/index.ts#L77) |
| <a id="no_photo"></a> `NO_PHOTO` | `2` | `2` | Only cards WITHOUT photo. NEW value `2` in v3.14.0+ — replaces legacy `0` semantic post-2026-06-16. | [modules/products/index.ts:79](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/modules/products/index.ts#L79) |

## Since

3.14.0
