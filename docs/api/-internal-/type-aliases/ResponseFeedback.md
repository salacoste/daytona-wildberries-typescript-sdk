[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ResponseFeedback

# Type Alias: ResponseFeedback

```ts
type ResponseFeedback = {
  id?: string;
  text?: string;
  pros?: string;
  cons?: string;
  productValuation?: number;
  createdDate?: string;
  answer?: {
     text?: string;
     state?: string;
     editable?: boolean;
  };
  state?: string;
  productDetails?: {
     nmId?: number;
     imtId?: number;
     productName?: string;
     supplierArticle?: string;
     supplierName?: string;
     brandName?: string;
     size?: string;
  };
  photoLinks?: {
     fullSize?: string;
     miniSize?: string;
  }[];
  video?: {
     previewImage?: string;
     link?: string;
     durationSec?: number;
  };
  wasViewed?: boolean;
  userName?: string;
  matchingSize?: string;
  isAbleSupplierFeedbackValuation?: boolean;
  supplierFeedbackValuation?: number;
  isAbleSupplierProductValuation?: boolean;
  supplierProductValuation?: number;
  isAbleReturnProductOrders?: boolean;
  returnProductOrdersDate?: string;
  bables?: string[];
  lastOrderShkId?: number;
  lastOrderCreatedAt?: string;
  color?: string;
  subjectId?: number;
  subjectName?: string;
  parentFeedbackId?: string;
  childFeedbackId?: string;
}[];
```

Defined in: [types/communications.types.ts:309](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L309)

Массив отзывов

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `id?` | `string` | ID отзыва | [types/communications.types.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L311) |
| `text?` | `string` | Текст отзыва | [types/communications.types.ts:313](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L313) |
| `pros?` | `string` | Достоинства товара | [types/communications.types.ts:315](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L315) |
| `cons?` | `string` | Недостатки товара | [types/communications.types.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L317) |
| `productValuation?` | `number` | Оценка товара | [types/communications.types.ts:319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L319) |
| `createdDate?` | `string` | Дата и время создания отзыва | [types/communications.types.ts:321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L321) |
| `answer?` | \{ `text?`: `string`; `state?`: `string`; `editable?`: `boolean`; \} | Структура ответа | [types/communications.types.ts:323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L323) |
| `answer.text?` | `string` | Текст ответа | [types/communications.types.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L325) |
| `answer.state?` | `string` | Статус: - `none` — новый - `wbRu` — отображается на сайте - `reviewRequired` — ответ проходит проверку - `rejected` — ответ отклонён | [types/communications.types.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L327) |
| `answer.editable?` | `boolean` | Можно ли отредактировать ответ: - `false` — нет - `true` — да | [types/communications.types.ts:329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L329) |
| `state?` | `string` | Статус отзыва: - `none` - не обработан (новый) - `wbRu` - обработан | [types/communications.types.ts:332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L332) |
| `productDetails?` | \{ `nmId?`: `number`; `imtId?`: `number`; `productName?`: `string`; `supplierArticle?`: `string`; `supplierName?`: `string`; `brandName?`: `string`; `size?`: `string`; \} | Информация о товаре | [types/communications.types.ts:334](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L334) |
| `productDetails.nmId?` | `number` | Артикул WB | [types/communications.types.ts:336](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L336) |
| `productDetails.imtId?` | `number` | ID карточки товара | [types/communications.types.ts:338](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L338) |
| `productDetails.productName?` | `string` | Название товара | [types/communications.types.ts:340](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L340) |
| `productDetails.supplierArticle?` | `string` | Артикул продавца | [types/communications.types.ts:342](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L342) |
| `productDetails.supplierName?` | `string` | Имя продавца | [types/communications.types.ts:344](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L344) |
| `productDetails.brandName?` | `string` | Бренд товара | [types/communications.types.ts:346](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L346) |
| `productDetails.size?` | `string` | Размер товара (`techSize` в КТ) | [types/communications.types.ts:348](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L348) |
| `photoLinks?` | \{ `fullSize?`: `string`; `miniSize?`: `string`; \}[] | Массив структур фотографий | [types/communications.types.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L351) |
| `video?` | \{ `previewImage?`: `string`; `link?`: `string`; `durationSec?`: `number`; \} | Структура видео | [types/communications.types.ts:358](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L358) |
| `video.previewImage?` | `string` | Ссылка на обложку видео | [types/communications.types.ts:360](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L360) |
| `video.link?` | `string` | Ссылка на файл плейлиста видео (доступно по протоколу HLS) | [types/communications.types.ts:362](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L362) |
| `video.durationSec?` | `number` | Общая продолжительность видео | [types/communications.types.ts:364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L364) |
| `wasViewed?` | `boolean` | Просмотрен ли отзыв | [types/communications.types.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L367) |
| `userName?` | `string` | Имя автора отзыва | [types/communications.types.ts:369](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L369) |
| `matchingSize?` | `string` | Соответствие заявленного размера реальному. <br>Возможные значения: - ` ` - для безразмерных товаров - `ок` - соответствует размеру - `smaller` - маломерит - `bigger` - большемерит | [types/communications.types.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L371) |
| `isAbleSupplierFeedbackValuation?` | `boolean` | Доступна ли продавцу возможность оставить жалобу на отзыв (`true` - доступна, `false` - не доступна) | [types/communications.types.ts:373](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L373) |
| `supplierFeedbackValuation?` | `number` | Ключ причины жалобы на отзыв <br> (Значения см. в примерах ответа метода получения <a href="https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get"> списков причин жалоб и проблем с товаром</a>, поле `feedbackValuations` ) | [types/communications.types.ts:375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L375) |
| `isAbleSupplierProductValuation?` | `boolean` | Доступна ли продавцу возможность сообщить о проблеме с товаром: - `true` — да - `false` — нет | [types/communications.types.ts:377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L377) |
| `supplierProductValuation?` | `number` | Ключ проблемы с товаром <br> (Значения см. в примерах ответа метода получения [списков причин жалоб и проблем с товаром](https://dev.wildberries.ru/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get), поле `supplierProductValuation`) | [types/communications.types.ts:379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L379) |
| `isAbleReturnProductOrders?` | `boolean` | Опция возврата товара: - `true` — доступна - `false` — недоступна | [types/communications.types.ts:381](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L381) |
| `returnProductOrdersDate?` | `string` | Дата и время, когда на запрос возврата был получен ответ со статус-кодом 200. | [types/communications.types.ts:383](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L383) |
| `bables?` | `string`[] | Список тегов покупателя | [types/communications.types.ts:385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L385) |
| `lastOrderShkId?` | `number` | Штрихкод единицы товара | [types/communications.types.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L387) |
| `lastOrderCreatedAt?` | `string` | Дата покупки | [types/communications.types.ts:389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L389) |
| `color?` | `string` | Цвет товара | [types/communications.types.ts:391](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L391) |
| `subjectId?` | `number` | ID предмета | [types/communications.types.ts:393](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L393) |
| `subjectName?` | `string` | Название предмета | [types/communications.types.ts:395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L395) |
| `parentFeedbackId?` | `string` | ID начального отзыва (`null`, если этот отзыв начальный) | [types/communications.types.ts:397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L397) |
| `childFeedbackId?` | `string` | ID дополненного отзыва (`null`, если этот отзыв дополненный) | [types/communications.types.ts:399](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/communications.types.ts#L399) |
