[Wildberries API TypeScript SDK](../modules.md) / RequestAlreadyExistsError

# Interface: RequestAlreadyExistsError

Defined in: [types/products.types.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L139)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `id?`: `number`; `alreadyExists?`: `boolean`; \} | Данные ответа | [types/products.types.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L141) |
| `data.id?` | `number` | ID загрузки | [types/products.types.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L143) |
| `data.alreadyExists?` | `boolean` | Флаг дублирования загрузки: `true` — такая загрузка уже есть | [types/products.types.ts:145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L145) |
| <a id="error"></a> `error?` | `boolean` | Флаг ошибки | [types/products.types.ts:148](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L148) |
| <a id="errortext"></a> `errorText?` | `string` | Текст ошибки | [types/products.types.ts:150](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/products.types.ts#L150) |
