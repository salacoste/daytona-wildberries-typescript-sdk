[Wildberries API TypeScript SDK](../modules.md) / CommunicationsModule

# Class: CommunicationsModule

Defined in: [modules/communications/index.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L24)

## Constructors

### Constructor

```ts
new CommunicationsModule(client: BaseClient): CommunicationsModule;
```

Defined in: [modules/communications/index.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L25)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`CommunicationsModule`

## Methods

### newFeedbacksQuestions()

```ts
newFeedbacksQuestions(): Promise<{
  data?: {
     hasNewQuestions?: boolean;
     hasNewFeedbacks?: boolean;
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L41)

Непросмотренные отзывы и вопросы

Метод проверяет наличие непросмотренных [вопросов](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) и [отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) от покупателей. Если у продавца есть непросмотренные вопросы или отзывы, возвращает `true`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Returns

`Promise`\<\{
  `data?`: \{
     `hasNewQuestions?`: `boolean`;
     `hasNewFeedbacks?`: `boolean`;
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.newFeedbacksQuestions();
console.log(result);
```

***

### getQuestionsCountUnanswered()

```ts
getQuestionsCountUnanswered(): Promise<{
  data?: {
     countUnanswered?: number;
     countUnansweredToday?: number;
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:71](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L71)

Неотвеченные вопросы

Метод возвращает общее количество неотвеченных [вопросов](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) и количество неотвеченных вопросов за сегодня. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Returns

`Promise`\<\{
  `data?`: \{
     `countUnanswered?`: `number`;
     `countUnansweredToday?`: `number`;
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.getQuestionsCountUnanswered();
console.log(result);
```

***

### getQuestionsCount()

```ts
getQuestionsCount(options?: {
  dateFrom?: number;
  dateTo?: number;
  isAnswered?: boolean;
}): Promise<{
  data?: number;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L102)

Количество вопросов

Метод возвращает количество отвеченных или неотвеченных [вопросов](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) за заданный период. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom?`: `number`; `dateTo?`: `number`; `isAnswered?`: `boolean`; \} | Query parameters |
| `options.dateFrom?` | `number` | - |
| `options.dateTo?` | `number` | - |
| `options.isAnswered?` | `boolean` | - |

#### Returns

`Promise`\<\{
  `data?`: `number`;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.getQuestionsCount({});
console.log(result);
```

***

### questions()

```ts
questions(options?: {
  isAnswered: boolean;
  nmId?: number;
  take: number;
  skip: number;
  order?: string;
  dateFrom?: number;
  dateTo?: number;
}): Promise<{
  data?: {
     countUnanswered?: number;
     countArchive?: number;
     questions?: {
        id?: string;
        text?: string;
        createdDate?: string;
        state?: string;
        answer?: {
           text?: string;
           editable?: boolean;
           createDate?: string;
        };
        productDetails?: {
           nmId?: number;
           imtId?: number;
           productName?: string;
           supplierArticle?: string;
           supplierName?: string;
           brandName?: string;
           size?: string;
        };
        wasViewed?: boolean;
        isWarned?: boolean;
     }[];
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L133)

Список вопросов

Метод возвращает список вопросов по заданным фильтрам. Вы можете: - получить данные отвеченных и неотвеченных вопросов - сортировать вопросы по дате - настроить пагинацию и количество вопросов в ответе <div class="description_important"> Можно получить максимум 10 000 вопросов в одном ответе </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `isAnswered`: `boolean`; `nmId?`: `number`; `take`: `number`; `skip`: `number`; `order?`: `string`; `dateFrom?`: `number`; `dateTo?`: `number`; \} | Query parameters |
| `options.isAnswered?` | `boolean` | - |
| `options.nmId?` | `number` | - |
| `options.take?` | `number` | - |
| `options.skip?` | `number` | - |
| `options.order?` | `string` | - |
| `options.dateFrom?` | `number` | - |
| `options.dateTo?` | `number` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `countUnanswered?`: `number`;
     `countArchive?`: `number`;
     `questions?`: \{
        `id?`: `string`;
        `text?`: `string`;
        `createdDate?`: `string`;
        `state?`: `string`;
        `answer?`: \{
           `text?`: `string`;
           `editable?`: `boolean`;
           `createDate?`: `string`;
        \};
        `productDetails?`: \{
           `nmId?`: `number`;
           `imtId?`: `number`;
           `productName?`: `string`;
           `supplierArticle?`: `string`;
           `supplierName?`: `string`;
           `brandName?`: `string`;
           `size?`: `string`;
        \};
        `wasViewed?`: `boolean`;
        `isWarned?`: `boolean`;
     \}[];
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.questions({});
console.log(result);
```

***

### updateQuestion()

```ts
updateQuestion(data?: 
  | {
  id: string;
  wasViewed: boolean;
}
  | {
  id: string;
  answer: {
     text: string;
  };
  state: string;
}): Promise<{
  data?: Record<string, never>;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:215](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L215)

Работа с вопросами

В зависимости от тела запроса, метод позволяет: - отметить [вопрос](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) как просмотренный - отклонить вопрос - ответить на вопрос или отредактировать ответ <div class="description_important"> Отредактировать ответ на вопрос можно 1 раз в течение 60 дней после отправки ответа </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \| \{ `id`: `string`; `wasViewed`: `boolean`; \} \| \{ `id`: `string`; `answer`: \{ `text`: `string`; \}; `state`: `string`; \} | Request body data |

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.updateQuestion({});
console.log(result);
```

***

### question()

```ts
question(options?: {
  id: string;
}): Promise<{
  data?: {
     id?: string;
     text?: string;
     createdDate?: string;
     state?: string;
     answer?: {
        text?: string;
        editable?: boolean;
        createDate?: string;
     };
     productDetails?: {
        nmId?: number;
        imtId?: number;
        productName?: string;
        supplierArticle?: string;
        supplierName?: string;
        brandName?: string;
        size?: string;
     };
     wasViewed?: boolean;
     isWarned?: boolean;
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L250)

Получить вопрос по ID

Метод возвращает данные [вопроса](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) по его ID. Далее вы можете [работать с этим вопросом](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/patch). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `id`: `string`; \} | Query parameters |
| `options.id?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `id?`: `string`;
     `text?`: `string`;
     `createdDate?`: `string`;
     `state?`: `string`;
     `answer?`: \{
        `text?`: `string`;
        `editable?`: `boolean`;
        `createDate?`: `string`;
     \};
     `productDetails?`: \{
        `nmId?`: `number`;
        `imtId?`: `number`;
        `productName?`: `string`;
        `supplierArticle?`: `string`;
        `supplierName?`: `string`;
        `brandName?`: `string`;
        `size?`: `string`;
     \};
     `wasViewed?`: `boolean`;
     `isWarned?`: `boolean`;
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.question({});
console.log(result);
```

***

### getFeedbacksCountUnanswered()

```ts
getFeedbacksCountUnanswered(): Promise<{
  data?: {
     countUnanswered?: number;
     countUnansweredToday?: number;
     valuation?: string;
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:315](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L315)

Необработанные отзывы

Метод возвращает: - количество необработанных [отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) за сегодня и за всё время - среднюю оценку всех отзывов <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Returns

`Promise`\<\{
  `data?`: \{
     `countUnanswered?`: `number`;
     `countUnansweredToday?`: `number`;
     `valuation?`: `string`;
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.getFeedbacksCountUnanswered();
console.log(result);
```

***

### getFeedbacksCount()

```ts
getFeedbacksCount(options?: {
  dateFrom?: number;
  dateTo?: number;
  isAnswered?: boolean;
}): Promise<{
  data?: number;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:346](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L346)

Количество отзывов

Метод возвращает количество обработанных или необработанных [отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) за заданный период. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom?`: `number`; `dateTo?`: `number`; `isAnswered?`: `boolean`; \} | Query parameters |
| `options.dateFrom?` | `number` | - |
| `options.dateTo?` | `number` | - |
| `options.isAnswered?` | `boolean` | - |

#### Returns

`Promise`\<\{
  `data?`: `number`;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.getFeedbacksCount({});
console.log(result);
```

***

### feedbacks()

```ts
feedbacks(options?: {
  isAnswered: boolean;
  nmId?: number;
  take: number;
  skip: number;
  order?: "dateAsc" | "dateDesc";
  dateFrom?: number;
  dateTo?: number;
}): Promise<{
  data?: {
     countUnanswered?: number;
     countArchive?: number;
     feedbacks?: ResponseFeedback;
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L377)

Список отзывов

Метод возвращает список отзывов по заданным фильтрам. Вы можете: - получить данные обработанных и необработанных отзывов - сортировать отзывы по дате - настроить пагинацию и количество отзывов в ответе <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `isAnswered`: `boolean`; `nmId?`: `number`; `take`: `number`; `skip`: `number`; `order?`: `"dateAsc"` \| `"dateDesc"`; `dateFrom?`: `number`; `dateTo?`: `number`; \} | Query parameters |
| `options.isAnswered?` | `boolean` | - |
| `options.nmId?` | `number` | - |
| `options.take?` | `number` | - |
| `options.skip?` | `number` | - |
| `options.order?` | `"dateAsc"` \| `"dateDesc"` | - |
| `options.dateFrom?` | `number` | - |
| `options.dateTo?` | `number` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `countUnanswered?`: `number`;
     `countArchive?`: `number`;
     `feedbacks?`: [`ResponseFeedback`](../-internal-/type-aliases/ResponseFeedback.md);
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.feedbacks({});
console.log(result);
```

***

### createFeedbacksAnswer()

```ts
createFeedbacksAnswer(data?: {
  id: string;
  text: string;
}): Promise<void>;
```

Defined in: [modules/communications/index.ts:416](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L416)

Ответить на отзыв

Метод позволяет ответить на [отзыв](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) покупателя. <div class="description_important"> ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `id`: `string`; `text`: `string`; \} | Request body data |
| `data.id?` | `string` | - |
| `data.text?` | `string` | - |

#### Returns

`Promise`\<`void`\>

Response data

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.createFeedbacksAnswer({});
```

***

### updateFeedbacksAnswer()

```ts
updateFeedbacksAnswer(data?: {
  id: string;
  text: string;
}): Promise<void>;
```

Defined in: [modules/communications/index.ts:436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L436)

Отредактировать ответ на отзыв

Метод позволяет отредактировать уже отправленный [ответ на отзыв](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1answer/post) покупателя. <br><br> Отредактировать ответ можно только один раз в течение 60 дней c момента отправки. <div class="description_important"> ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `id`: `string`; `text`: `string`; \} | Request body data |
| `data.id?` | `string` | - |
| `data.text?` | `string` | - |

#### Returns

`Promise`\<`void`\>

Response data

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.updateFeedbacksAnswer({});
```

***

### createOrderReturn()

```ts
createOrderReturn(data: {
  feedbackId?: string;
}): Promise<{
  data?: Record<string, never>;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:457](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L457)

Возврат товара по ID отзыва

Метод запрашивает возврат товара, по которому оставлен [отзыв](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get). <br><br> Возврат доступен для отзывов с полем `"isAbleReturnProductOrders": true`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | \{ `feedbackId?`: `string`; \} | Request body data |
| `data.feedbackId?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: `Record`\<`string`, `never`\>;
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.createOrderReturn({});
console.log(result);
```

***

### feedback()

```ts
feedback(options?: {
  id: string;
}): Promise<{
  data?: {
     id?: string;
     userName?: string;
     pros?: string;
     cons?: string;
     matchingSize?: string;
     text?: string;
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
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:488](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L488)

Получить отзыв по ID

Метод возвращает данные [отзыва](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) по его ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `id`: `string`; \} | Query parameters |
| `options.id?` | `string` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `id?`: `string`;
     `userName?`: `string`;
     `pros?`: `string`;
     `cons?`: `string`;
     `matchingSize?`: `string`;
     `text?`: `string`;
     `productValuation?`: `number`;
     `createdDate?`: `string`;
     `answer?`: \{
        `text?`: `string`;
        `state?`: `string`;
        `editable?`: `boolean`;
     \};
     `state?`: `string`;
     `productDetails?`: \{
        `nmId?`: `number`;
        `imtId?`: `number`;
        `productName?`: `string`;
        `supplierArticle?`: `string`;
        `supplierName?`: `string`;
        `brandName?`: `string`;
        `size?`: `string`;
     \};
     `photoLinks?`: \{
        `fullSize?`: `string`;
        `miniSize?`: `string`;
     \}[];
     `video?`: \{
        `previewImage?`: `string`;
        `link?`: `string`;
        `durationSec?`: `number`;
     \};
     `wasViewed?`: `boolean`;
     `isAbleSupplierFeedbackValuation?`: `boolean`;
     `supplierFeedbackValuation?`: `number`;
     `isAbleSupplierProductValuation?`: `boolean`;
     `supplierProductValuation?`: `number`;
     `isAbleReturnProductOrders?`: `boolean`;
     `returnProductOrdersDate?`: `string`;
     `bables?`: `string`[];
     `lastOrderShkId?`: `number`;
     `lastOrderCreatedAt?`: `string`;
     `color?`: `string`;
     `subjectId?`: `number`;
     `subjectName?`: `string`;
     `parentFeedbackId?`: `string`;
     `childFeedbackId?`: `string`;
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.feedback({});
console.log(result);
```

***

### getFeedbacksArchive()

```ts
getFeedbacksArchive(options?: {
  nmId?: number;
  take: number;
  skip: number;
  order?: "dateAsc" | "dateDesc";
}): Promise<{
  data?: {
     feedbacks?: ResponseFeedback;
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:594](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L594)

Список архивных отзывов

Метод возвращает список архивных [отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get). <br><br> Отзыв становится архивным, если: - на отзыв получен ответ - на отзыв не получен ответ в течение 30 дней - в отзыве нет текста и фото <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `nmId?`: `number`; `take`: `number`; `skip`: `number`; `order?`: `"dateAsc"` \| `"dateDesc"`; \} | Query parameters |
| `options.nmId?` | `number` | - |
| `options.take?` | `number` | - |
| `options.skip?` | `number` | - |
| `options.order?` | `"dateAsc"` \| `"dateDesc"` | - |

#### Returns

`Promise`\<\{
  `data?`: \{
     `feedbacks?`: [`ResponseFeedback`](../-internal-/type-aliases/ResponseFeedback.md);
  \};
  `error?`: `boolean`;
  `errorText?`: `string`;
  `additionalErrors?`: `string`[];
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.getFeedbacksArchive({});
console.log(result);
```

***

### getSellerChats()

```ts
getSellerChats(): Promise<ChatsResponse>;
```

Defined in: [modules/communications/index.ts:630](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L630)

Список чатов

Метод возвращает список всех чатов продавца. По этим данным можно получить [события чатов](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get) или [отправить сообщение покупателю](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>

#### Returns

`Promise`\<[`ChatsResponse`](../-internal-/interfaces/ChatsResponse.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.getSellerChats();
console.log(result);
```

***

### getSellerEvents()

```ts
getSellerEvents(options?: {
  next?: number;
}): Promise<EventsResponse>;
```

Defined in: [modules/communications/index.ts:652](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L652)

События чатов

Метод возвращает список событий всех [чатов с покупателями](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1chats/get). Чтобы получить все события: 1. Сделайте первый запрос без параметра `next`. 2. Повторяйте запрос со значением параметра `next` из ответа на предыдущий запрос, пока `totalEvents` не станет равным `0`. Это будет означать, что вы получили все события. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `next?`: `number`; \} | Query parameters |
| `options.next?` | `number` | - |

#### Returns

`Promise`\<[`EventsResponse`](../-internal-/interfaces/EventsResponse.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.getSellerEvents({});
console.log(result);
```

***

### createSellerMessage()

```ts
createSellerMessage(): Promise<MessageResponse>;
```

Defined in: [modules/communications/index.ts:676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L676)

Отправить сообщение

Метод отправляет сообщения в [чат с покупателем](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1chats/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>

#### Returns

`Promise`\<[`MessageResponse`](../-internal-/interfaces/MessageResponse.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.createSellerMessage();
console.log(result);
```

***

### getSellerDownload()

```ts
getSellerDownload(id: string): Promise<unknown>;
```

Defined in: [modules/communications/index.ts:699](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L699)

Получить файл из сообщения

Метод возвращает файл или изображение из сообщения по его ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | ID файла, см. значение поля `downloadID` в методе [События чатов](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get) |

#### Returns

`Promise`\<`unknown`\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.getSellerDownload('id-value');
console.log(result);
```

***

### claims()

```ts
claims(options?: {
  is_archive: boolean;
  id?: string;
  limit?: number;
  offset?: number;
  nm_id?: number;
}): Promise<unknown>;
```

Defined in: [modules/communications/index.ts:723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L723)

Заявки покупателей на возврат

Метод возвращает заявки покупателей на возврат товаров за последние 14 дней. Вы можете [отвечать на эти заявки](/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claim/patch). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 20 запросов | 3 секунды | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `is_archive`: `boolean`; `id?`: `string`; `limit?`: `number`; `offset?`: `number`; `nm_id?`: `number`; \} | Query parameters |
| `options.is_archive?` | `boolean` | - |
| `options.id?` | `string` | - |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |
| `options.nm_id?` | `number` | - |

#### Returns

`Promise`\<`unknown`\>

Response data

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.claims({});
console.log(result);
```

***

### updateClaim()

```ts
updateClaim(): Promise<unknown>;
```

Defined in: [modules/communications/index.ts:750](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L750)

Ответ на заявку покупателя

Метод отправляет ответ на [заявку](/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) покупателя на возврат товаров. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 20 запросов | 3 секунды | 10 запросов | </div>

#### Returns

`Promise`\<`unknown`\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.communications.updateClaim();
console.log(result);
```

***

### getPinnedFeedbacksCount()

```ts
getPinnedFeedbacksCount(params?: PinnedReviewsCountParams): Promise<PinnedReviewsCountResponse>;
```

Defined in: [modules/communications/index.ts:793](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L793)

Get count of pinned/unpinned reviews

Returns the count of pinned and unpinned reviews for the given filters.
Unpinned reviews are only those that were automatically unpinned due to reasons
specified in the `unpinnedCause` field.

Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`PinnedReviewsCountParams`](../-internal-/interfaces/PinnedReviewsCountParams.md) | Optional filter parameters |

#### Returns

`Promise`\<[`PinnedReviewsCountResponse`](../-internal-/interfaces/PinnedReviewsCountResponse.md)\>

Count of reviews matching the filter

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy](https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy)

#### Example

```typescript
// Get count of all pinned reviews
const count = await sdk.communications.getPinnedFeedbacksCount({ state: 'pinned' });
console.log(`Pinned reviews: ${count.data}`);

// Get count of pinned reviews on product cards
const cardCount = await sdk.communications.getPinnedFeedbacksCount({
  state: 'pinned',
  pinOn: 'nm'
});
```

***

### getPinnedFeedbacksLimits()

```ts
getPinnedFeedbacksLimits(): Promise<PinnedReviewsLimitsResponse>;
```

Defined in: [modules/communications/index.ts:826](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L826)

Get limits for pinning reviews

Returns the limits for pinning reviews by subscription and tariff option.
Shows total limits, used count, remaining slots, and per-unit limits.

Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.

#### Returns

`Promise`\<[`PinnedReviewsLimitsResponse`](../-internal-/interfaces/PinnedReviewsLimitsResponse.md)\>

Limits data for subscription and tariff

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy](https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy)

#### Example

```typescript
const limits = await sdk.communications.getPinnedFeedbacksLimits();
if (limits.data.subscription) {
  console.log(`Subscription remaining: ${limits.data.subscription.remaining}`);
}
if (limits.data.tariff) {
  console.log(`Tariff remaining: ${limits.data.tariff.remaining}`);
}
```

***

### getPinnedFeedbacks()

```ts
getPinnedFeedbacks(params?: PinnedReviewsListParams): Promise<PinnedReviewsListResponse>;
```

Defined in: [modules/communications/index.ts:867](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L867)

Get list of pinned/unpinned reviews

Returns a list of pinned and unpinned reviews with pagination support.
Unpinned reviews are only those that were automatically unpinned due to reasons
specified in the `unpinnedCause` field.

Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`PinnedReviewsListParams`](../-internal-/interfaces/PinnedReviewsListParams.md) | Optional filter and pagination parameters |

#### Returns

`Promise`\<[`PinnedReviewsListResponse`](../-internal-/interfaces/PinnedReviewsListResponse.md)\>

List of pinned/unpinned review items with pagination cursor

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy](https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy)

#### Example

```typescript
// Get first page of pinned reviews
const response = await sdk.communications.getPinnedFeedbacks({
  state: 'pinned',
  limit: 100
});
console.log(`Found ${response.data.length} pinned reviews`);

// Get next page if available
if (response.next) {
  const nextPage = await sdk.communications.getPinnedFeedbacks({
    state: 'pinned',
    next: response.next
  });
}
```

***

### pinFeedback()

```ts
pinFeedback(data: PinnedReviewsCreateRequest): Promise<PinnedReviewsCreateResponse>;
```

Defined in: [modules/communications/index.ts:915](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L915)

Pin reviews to product cards or merged groups

Pins reviews to a product card or group of merged product cards.
Requires an active Jam subscription or tariff option for pinning reviews.
Maximum 500 reviews can be pinned in a single request.

Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`PinnedReviewsCreateRequest`](../-internal-/type-aliases/PinnedReviewsCreateRequest.md) | Array of reviews to pin (max 500 items) |

#### Returns

`Promise`\<[`PinnedReviewsCreateResponse`](../-internal-/interfaces/PinnedReviewsCreateResponse.md)\>

Result of pin operations with success/error details per item

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When no active subscription or tariff (403)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy](https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy)

#### Example

```typescript
const result = await sdk.communications.pinFeedback([
  {
    pinMethod: 'subscription',
    pinOn: 'imt',
    feedbackId: 'VlbkVVl7mtw37wyWkJZz'
  },
  {
    pinMethod: 'tariff',
    pinOn: 'nm',
    feedbackId: 'DibuRAImknLyiqgzvGcU'
  }
]);

result.data.forEach(item => {
  if (item.isErrors) {
    console.log(`Failed to pin ${item.feedbackId}:`, item.errors);
  } else {
    console.log(`Pinned ${item.feedbackId} with pinId: ${item.pinId}`);
  }
});
```

***

### unpinFeedback()

```ts
unpinFeedback(data: PinnedReviewsDeleteRequest): Promise<PinnedReviewsDeleteResponse>;
```

Defined in: [modules/communications/index.ts:950](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/communications/index.ts#L950)

Unpin reviews from product cards or merged groups

Unpins reviews using their pin operation IDs (pinId).
Get pinId values from the getPinnedFeedbacks method.
Maximum 500 pin IDs can be unpinned in a single request.

Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`PinnedReviewsDeleteRequest`](../-internal-/type-aliases/PinnedReviewsDeleteRequest.md) | Array of pin IDs to unpin (max 500 items) |

#### Returns

`Promise`\<[`PinnedReviewsDeleteResponse`](../-internal-/interfaces/PinnedReviewsDeleteResponse.md)\>

Array of successfully unpinned pin IDs

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy](https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy)

#### Example

```typescript
// Get pinned reviews first to obtain pinIds
const pinned = await sdk.communications.getPinnedFeedbacks({ state: 'pinned' });
const pinIdsToUnpin = pinned.data.slice(0, 3).map(item => item.pinId);

// Unpin the reviews
const result = await sdk.communications.unpinFeedback(pinIdsToUnpin);
console.log(`Successfully unpinned: ${result.data.join(', ')}`);
```
