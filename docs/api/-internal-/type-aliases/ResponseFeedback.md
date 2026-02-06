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

Defined in: [types/communications.types.ts:364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L364)

Массив отзывов

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `id?` | `string` | ID отзыва | [types/communications.types.ts:366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L366) |
| `text?` | `string` | Текст отзыва | [types/communications.types.ts:368](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L368) |
| `pros?` | `string` | Достоинства товара | [types/communications.types.ts:370](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L370) |
| `cons?` | `string` | Недостатки товара | [types/communications.types.ts:372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L372) |
| `productValuation?` | `number` | Оценка товара | [types/communications.types.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L374) |
| `createdDate?` | `string` | Дата и время создания отзыва | [types/communications.types.ts:376](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L376) |
| `answer?` | \{ `text?`: `string`; `state?`: `string`; `editable?`: `boolean`; \} | Структура ответа | [types/communications.types.ts:378](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L378) |
| `answer.text?` | `string` | Текст ответа | [types/communications.types.ts:380](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L380) |
| `answer.state?` | `string` | Статус: - `none` — новый - `wbRu` — отображается на сайте - `reviewRequired` — ответ проходит проверку - `rejected` — ответ отклонён | [types/communications.types.ts:382](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L382) |
| `answer.editable?` | `boolean` | Можно ли отредактировать ответ: - `false` — нет - `true` — да | [types/communications.types.ts:384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L384) |
| `state?` | `string` | Статус отзыва: - `none` - не обработан (новый) - `wbRu` - обработан | [types/communications.types.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L387) |
| `productDetails?` | \{ `nmId?`: `number`; `imtId?`: `number`; `productName?`: `string`; `supplierArticle?`: `string`; `supplierName?`: `string`; `brandName?`: `string`; `size?`: `string`; \} | Информация о товаре | [types/communications.types.ts:389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L389) |
| `productDetails.nmId?` | `number` | Артикул WB | [types/communications.types.ts:391](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L391) |
| `productDetails.imtId?` | `number` | ID карточки товара | [types/communications.types.ts:393](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L393) |
| `productDetails.productName?` | `string` | Название товара | [types/communications.types.ts:395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L395) |
| `productDetails.supplierArticle?` | `string` | Артикул продавца | [types/communications.types.ts:397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L397) |
| `productDetails.supplierName?` | `string` | Имя продавца | [types/communications.types.ts:399](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L399) |
| `productDetails.brandName?` | `string` | Бренд товара | [types/communications.types.ts:401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L401) |
| `productDetails.size?` | `string` | Размер товара (`techSize` в КТ) | [types/communications.types.ts:403](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L403) |
| `photoLinks?` | \{ `fullSize?`: `string`; `miniSize?`: `string`; \}[] | Массив структур фотографий | [types/communications.types.ts:406](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L406) |
| `video?` | \{ `previewImage?`: `string`; `link?`: `string`; `durationSec?`: `number`; \} | Структура видео | [types/communications.types.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L413) |
| `video.previewImage?` | `string` | Ссылка на обложку видео | [types/communications.types.ts:415](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L415) |
| `video.link?` | `string` | Ссылка на файл плейлиста видео (доступно по протоколу HLS) | [types/communications.types.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L417) |
| `video.durationSec?` | `number` | Общая продолжительность видео | [types/communications.types.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L419) |
| `wasViewed?` | `boolean` | Просмотрен ли отзыв | [types/communications.types.ts:422](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L422) |
| `userName?` | `string` | Имя автора отзыва | [types/communications.types.ts:424](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L424) |
| `matchingSize?` | `string` | Соответствие заявленного размера реальному. <br>Возможные значения: - ` ` - для безразмерных товаров - `ок` - соответствует размеру - `smaller` - маломерит - `bigger` - большемерит | [types/communications.types.ts:426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L426) |
| `isAbleSupplierFeedbackValuation?` | `boolean` | Доступна ли продавцу возможность оставить жалобу на отзыв (`true` - доступна, `false` - не доступна) | [types/communications.types.ts:428](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L428) |
| `supplierFeedbackValuation?` | `number` | Ключ причины жалобы на отзыв <br> (Значения см. в примерах ответа метода получения <a href="./user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get"> списков причин жалоб и проблем с товаром</a>, поле `feedbackValuations` ) | [types/communications.types.ts:430](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L430) |
| `isAbleSupplierProductValuation?` | `boolean` | Доступна ли продавцу возможность сообщить о проблеме с товаром: - `true` — да - `false` — нет | [types/communications.types.ts:432](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L432) |
| `supplierProductValuation?` | `number` | Ключ проблемы с товаром <br> (Значения см. в примерах ответа метода получения [списков причин жалоб и проблем с товаром](./user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get), поле `supplierProductValuation`) | [types/communications.types.ts:434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L434) |
| `isAbleReturnProductOrders?` | `boolean` | Опция возврата товара: - `true` — доступна - `false` — недоступна | [types/communications.types.ts:436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L436) |
| `returnProductOrdersDate?` | `string` | Дата и время, когда на запрос возврата был получен ответ со статус-кодом 200. | [types/communications.types.ts:438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L438) |
| `bables?` | `string`[] | Список тегов покупателя | [types/communications.types.ts:440](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L440) |
| `lastOrderShkId?` | `number` | Штрихкод единицы товара | [types/communications.types.ts:442](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L442) |
| `lastOrderCreatedAt?` | `string` | Дата покупки | [types/communications.types.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L444) |
| `color?` | `string` | Цвет товара | [types/communications.types.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L446) |
| `subjectId?` | `number` | ID предмета | [types/communications.types.ts:448](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L448) |
| `subjectName?` | `string` | Название предмета | [types/communications.types.ts:450](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L450) |
| `parentFeedbackId?` | `string` | ID начального отзыва (`null`, если этот отзыв начальный) | [types/communications.types.ts:452](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L452) |
| `childFeedbackId?` | `string` | ID дополненного отзыва (`null`, если этот отзыв дополненный) | [types/communications.types.ts:454](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/communications.types.ts#L454) |
