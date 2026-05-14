[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsBox

# Interface: ModelsBox

Defined in: [types/orders-fbw.types.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbw.types.ts#L47)

## Example

```json
{
 "packageCode": "WB_689",
 "quantity": 1,
 "barcodes": [
   {
     "barcode": "1234567891234",
     "quantity": 1
   }
 ]
}
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="packagecode"></a> `packageCode?` | `string` | Штрих-код упаковки | [types/orders-fbw.types.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbw.types.ts#L49) |
| <a id="quantity"></a> `quantity?` | `number` | Суммарное количество товара в упаковке, шт | [types/orders-fbw.types.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbw.types.ts#L51) |
| <a id="barcodes"></a> `barcodes?` | [`ModelsGoodInBox`](ModelsGoodInBox.md)[] | Список упакованных товаров | [types/orders-fbw.types.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbw.types.ts#L53) |
