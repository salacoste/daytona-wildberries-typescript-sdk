[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ResponsePaidStorage

# Type Alias: ResponsePaidStorage

```ts
type ResponsePaidStorage = {
  date?: string;
  logWarehouseCoef?: number;
  officeId?: number;
  warehouse?: string;
  warehouseCoef?: number;
  giId?: number;
  chrtId?: number;
  size?: string;
  barcode?: string;
  subject?: string;
  brand?: string;
  vendorCode?: string;
  nmId?: number;
  volume?: number;
  calcType?: string;
  warehousePrice?: number;
  barcodesCount?: number;
  palletPlaceCode?: number;
  palletCount?: number;
  originalDate?: string;
  loyaltyDiscount?: number;
  tariffFixDate?: string;
  tariffLowerDate?: string;
}[];
```

Defined in: [types/reports.types.ts:401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L401)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `date?` | `string` | Дата, за которую был расчёт или перерасчёт | [types/reports.types.ts:403](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L403) |
| `logWarehouseCoef?` | `number` | Коэффициент логистики и хранения | [types/reports.types.ts:405](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L405) |
| `officeId?` | `number` | ID склада | [types/reports.types.ts:407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L407) |
| `warehouse?` | `string` | Название склада | [types/reports.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L409) |
| `warehouseCoef?` | `number` | Коэффициент склада | [types/reports.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L411) |
| `giId?` | `number` | ID поставки | [types/reports.types.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L413) |
| `chrtId?` | `number` | ID размера для этого артикула WB | [types/reports.types.ts:415](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L415) |
| `size?` | `string` | Размер (`techSize` в карточке товара) | [types/reports.types.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L417) |
| `barcode?` | `string` | Баркод | [types/reports.types.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L419) |
| `subject?` | `string` | Предмет | [types/reports.types.ts:421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L421) |
| `brand?` | `string` | Бренд | [types/reports.types.ts:423](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L423) |
| `vendorCode?` | `string` | Артикул продавца | [types/reports.types.ts:425](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L425) |
| `nmId?` | `number` | Артикул WB | [types/reports.types.ts:427](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L427) |
| `volume?` | `number` | Объём товара | [types/reports.types.ts:429](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L429) |
| `calcType?` | `string` | Способ расчёта | [types/reports.types.ts:431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L431) |
| `warehousePrice?` | `number` | Сумма хранения | [types/reports.types.ts:433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L433) |
| `barcodesCount?` | `number` | Количество единиц товара (штук), подлежащих тарифицированию за расчётные сутки | [types/reports.types.ts:435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L435) |
| `palletPlaceCode?` | `number` | Код паллетоместа | [types/reports.types.ts:437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L437) |
| `palletCount?` | `number` | Количество паллет | [types/reports.types.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L439) |
| `originalDate?` | `string` | Если был перерасчёт, это дата первоначального расчёта. Если перерасчёта не было, совпадает с `date` | [types/reports.types.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L441) |
| `loyaltyDiscount?` | `number` | Скидка программы лояльности, ₽ | [types/reports.types.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L443) |
| `tariffFixDate?` | `string` | Дата фиксации тарифа | [types/reports.types.ts:445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L445) |
| `tariffLowerDate?` | `string` | Дата понижения тарифа | [types/reports.types.ts:447](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/42b5681888bc6199eb6bb7e5ae1c5201dbe79356/src/types/reports.types.ts#L447) |

## Example

```json
[
 {
   "date": "2023-10-01",
   "logWarehouseCoef": 0,
   "officeId": 507,
   "warehouse": "Коледино",
   "warehouseCoef": 1.7,
   "giId": 123456,
   "chrt_id": 1234567,
   "size": "0",
   "barcode": "",
   "subject": "Маски одноразовые",
   "brand": "1000 Каталог",
   "vendorCode": "Артикул_продавца",
   "nmId": 1234567,
   "volume": 12,
   "calcType": "короба: без габаритов",
   "warehousePrice": 7.65,
   "barcodesCount": 1,
   "palletPlaceCode": 0,
   "palletCount": 0,
   "originalDate": "2023-10-01",
   "loyaltyDiscount": 10,
   "tariffFixDate": "2023-10-01",
   "tariffLowerDate": "2023-11-01"
 }
]
```
