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

Defined in: [types/communications.types.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L80)

Массив отзывов

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `id?` | `string` | ID отзыва | [types/communications.types.ts:82](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L82) |
| `text?` | `string` | Текст отзыва | [types/communications.types.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L84) |
| `pros?` | `string` | Достоинства товара | [types/communications.types.ts:86](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L86) |
| `cons?` | `string` | Недостатки товара | [types/communications.types.ts:88](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L88) |
| `productValuation?` | `number` | Оценка товара | [types/communications.types.ts:90](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L90) |
| `createdDate?` | `string` | Дата и время создания отзыва | [types/communications.types.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L92) |
| `answer?` | \{ `text?`: `string`; `state?`: `string`; `editable?`: `boolean`; \} | Структура ответа | [types/communications.types.ts:94](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L94) |
| `answer.text?` | `string` | Текст ответа | [types/communications.types.ts:96](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L96) |
| `answer.state?` | `string` | Статус: - `none` — новый - `wbRu` — отображается на сайте - `reviewRequired` — ответ проходит проверку - `rejected` — ответ отклонён | [types/communications.types.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L98) |
| `answer.editable?` | `boolean` | Можно ли отредактировать ответ: - `false` — нет - `true` — да | [types/communications.types.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L100) |
| `state?` | `string` | Статус отзыва: - `none` - не обработан (новый) - `wbRu` - обработан | [types/communications.types.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L103) |
| `productDetails?` | \{ `nmId?`: `number`; `imtId?`: `number`; `productName?`: `string`; `supplierArticle?`: `string`; `supplierName?`: `string`; `brandName?`: `string`; `size?`: `string`; \} | Информация о товаре | [types/communications.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L105) |
| `productDetails.nmId?` | `number` | Артикул WB | [types/communications.types.ts:107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L107) |
| `productDetails.imtId?` | `number` | ID карточки товара | [types/communications.types.ts:109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L109) |
| `productDetails.productName?` | `string` | Название товара | [types/communications.types.ts:111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L111) |
| `productDetails.supplierArticle?` | `string` | Артикул продавца | [types/communications.types.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L113) |
| `productDetails.supplierName?` | `string` | Имя продавца | [types/communications.types.ts:115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L115) |
| `productDetails.brandName?` | `string` | Бренд товара | [types/communications.types.ts:117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L117) |
| `productDetails.size?` | `string` | Размер товара (`techSize` в КТ) | [types/communications.types.ts:119](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L119) |
| `photoLinks?` | \{ `fullSize?`: `string`; `miniSize?`: `string`; \}[] | Массив структур фотографий | [types/communications.types.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L122) |
| `video?` | \{ `previewImage?`: `string`; `link?`: `string`; `durationSec?`: `number`; \} | Структура видео | [types/communications.types.ts:129](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L129) |
| `video.previewImage?` | `string` | Ссылка на обложку видео | [types/communications.types.ts:131](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L131) |
| `video.link?` | `string` | Ссылка на файл плейлиста видео (доступно по протоколу HLS) | [types/communications.types.ts:133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L133) |
| `video.durationSec?` | `number` | Общая продолжительность видео | [types/communications.types.ts:135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L135) |
| `wasViewed?` | `boolean` | Просмотрен ли отзыв | [types/communications.types.ts:138](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L138) |
| `userName?` | `string` | Имя автора отзыва | [types/communications.types.ts:140](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L140) |
| `matchingSize?` | `string` | Соответствие заявленного размера реальному. <br>Возможные значения: - ` ` - для безразмерных товаров - `ок` - соответствует размеру - `smaller` - маломерит - `bigger` - большемерит | [types/communications.types.ts:142](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L142) |
| `isAbleSupplierFeedbackValuation?` | `boolean` | Доступна ли продавцу возможность оставить жалобу на отзыв (`true` - доступна, `false` - не доступна) | [types/communications.types.ts:144](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L144) |
| `supplierFeedbackValuation?` | `number` | Ключ причины жалобы на отзыв <br> (Значения см. в примерах ответа метода получения <a href="./user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get"> списков причин жалоб и проблем с товаром</a>, поле `feedbackValuations` ) | [types/communications.types.ts:146](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L146) |
| `isAbleSupplierProductValuation?` | `boolean` | Доступна ли продавцу возможность сообщить о проблеме с товаром: - `true` — да - `false` — нет | [types/communications.types.ts:148](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L148) |
| `supplierProductValuation?` | `number` | Ключ проблемы с товаром <br> (Значения см. в примерах ответа метода получения [списков причин жалоб и проблем с товаром](./user-communication#tag/Otzyvy/paths/~1api~1v1~1supplier-valuations/get), поле `supplierProductValuation`) | [types/communications.types.ts:150](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L150) |
| `isAbleReturnProductOrders?` | `boolean` | Опция возврата товара: - `true` — доступна - `false` — недоступна | [types/communications.types.ts:152](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L152) |
| `returnProductOrdersDate?` | `string` | Дата и время, когда на запрос возврата был получен ответ со статус-кодом 200. | [types/communications.types.ts:154](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L154) |
| `bables?` | `string`[] | Список тегов покупателя | [types/communications.types.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L156) |
| `lastOrderShkId?` | `number` | Штрихкод единицы товара | [types/communications.types.ts:158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L158) |
| `lastOrderCreatedAt?` | `string` | Дата покупки | [types/communications.types.ts:160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L160) |
| `color?` | `string` | Цвет товара | [types/communications.types.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L162) |
| `subjectId?` | `number` | ID предмета | [types/communications.types.ts:164](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L164) |
| `subjectName?` | `string` | Название предмета | [types/communications.types.ts:166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L166) |
| `parentFeedbackId?` | `string` | ID начального отзыва (`null`, если этот отзыв начальный) | [types/communications.types.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L168) |
| `childFeedbackId?` | `string` | ID дополненного отзыва (`null`, если этот отзыв дополненный) | [types/communications.types.ts:170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/communications.types.ts#L170) |
