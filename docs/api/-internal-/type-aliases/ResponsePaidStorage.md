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

Defined in: [types/reports.types.ts:435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L435)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `date?` | `string` | Дата, за которую был расчёт или перерасчёт | [types/reports.types.ts:437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L437) |
| `logWarehouseCoef?` | `number` | Коэффициент логистики и хранения | [types/reports.types.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L439) |
| `officeId?` | `number` | ID склада | [types/reports.types.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L441) |
| `warehouse?` | `string` | Название склада | [types/reports.types.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L443) |
| `warehouseCoef?` | `number` | Коэффициент склада | [types/reports.types.ts:445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L445) |
| `giId?` | `number` | ID поставки | [types/reports.types.ts:447](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L447) |
| `chrtId?` | `number` | ID размера для этого артикула WB | [types/reports.types.ts:449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L449) |
| `size?` | `string` | Размер (`techSize` в карточке товара) | [types/reports.types.ts:451](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L451) |
| `barcode?` | `string` | Баркод | [types/reports.types.ts:453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L453) |
| `subject?` | `string` | Предмет | [types/reports.types.ts:455](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L455) |
| `brand?` | `string` | Бренд | [types/reports.types.ts:457](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L457) |
| `vendorCode?` | `string` | Артикул продавца | [types/reports.types.ts:459](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L459) |
| `nmId?` | `number` | Артикул WB | [types/reports.types.ts:461](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L461) |
| `volume?` | `number` | Объём товара | [types/reports.types.ts:463](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L463) |
| `calcType?` | `string` | Способ расчёта | [types/reports.types.ts:465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L465) |
| `warehousePrice?` | `number` | Сумма хранения | [types/reports.types.ts:467](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L467) |
| `barcodesCount?` | `number` | Количество единиц товара (штук), подлежащих тарифицированию за расчётные сутки | [types/reports.types.ts:469](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L469) |
| `palletPlaceCode?` | `number` | Код паллетоместа | [types/reports.types.ts:471](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L471) |
| `palletCount?` | `number` | Количество паллет | [types/reports.types.ts:473](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L473) |
| `originalDate?` | `string` | Если был перерасчёт, это дата первоначального расчёта. Если перерасчёта не было, совпадает с `date` | [types/reports.types.ts:475](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L475) |
| `loyaltyDiscount?` | `number` | Скидка программы лояльности, ₽ | [types/reports.types.ts:477](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L477) |
| `tariffFixDate?` | `string` | Дата фиксации тарифа | [types/reports.types.ts:479](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L479) |
| `tariffLowerDate?` | `string` | Дата понижения тарифа | [types/reports.types.ts:481](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/reports.types.ts#L481) |

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
