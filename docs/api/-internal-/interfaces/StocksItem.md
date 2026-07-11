[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksItem

# Interface: StocksItem

Defined in: [types/reports.types.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L39)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="lastchangedate"></a> `lastChangeDate?` | `string` | Дата и время обновления информации в сервисе. Это поле соответствует параметру `dateFrom` в запросе. Если часовой пояс не указан, то берётся Московское время (UTC+3) | [types/reports.types.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L41) |
| <a id="warehousename"></a> `warehouseName?` | `string` | Название склада | [types/reports.types.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L43) |
| <a id="supplierarticle"></a> `supplierArticle?` | `string` | Артикул продавца | [types/reports.types.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L45) |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/reports.types.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L47) |
| <a id="barcode"></a> `barcode?` | `string` | Баркод | [types/reports.types.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L49) |
| <a id="quantity"></a> `quantity?` | `number` | Количество, доступное для продажи (сколько можно добавить в корзину) | [types/reports.types.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L51) |
| <a id="inwaytoclient"></a> `inWayToClient?` | `number` | В пути к клиенту | [types/reports.types.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L53) |
| <a id="inwayfromclient"></a> `inWayFromClient?` | `number` | В пути от клиента | [types/reports.types.ts:55](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L55) |
| <a id="quantityfull"></a> `quantityFull?` | `number` | Полное (непроданное) количество, которое числится за складом (= `quantity` + в пути) | [types/reports.types.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L57) |
| <a id="category"></a> `category?` | `string` | Категория | [types/reports.types.ts:59](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L59) |
| <a id="subject"></a> `subject?` | `string` | Предмет | [types/reports.types.ts:61](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L61) |
| <a id="brand"></a> `brand?` | `string` | Бренд | [types/reports.types.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L63) |
| <a id="techsize"></a> `techSize?` | `string` | Размер | [types/reports.types.ts:65](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L65) |
| <a id="price"></a> `Price?` | `number` | Цена | [types/reports.types.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L67) |
| <a id="discount"></a> `Discount?` | `number` | Скидка | [types/reports.types.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L69) |
| <a id="issupply"></a> `isSupply?` | `boolean` | Договор поставки (внутренние технологические данные) | [types/reports.types.ts:71](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L71) |
| <a id="isrealization"></a> `isRealization?` | `boolean` | Договор реализации (внутренние технологические данные) | [types/reports.types.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L73) |
| <a id="sccode"></a> `SCCode?` | `string` | Код контракта (внутренние технологические данные) | [types/reports.types.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L75) |
