[Wildberries API TypeScript SDK](../modules.md) / CommunicationsModule

# Class: CommunicationsModule

Defined in: [modules/communications/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L10)

## Constructors

### Constructor

```ts
new CommunicationsModule(client: BaseClient): CommunicationsModule;
```

Defined in: [modules/communications/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L11)

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

Defined in: [modules/communications/index.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L27)

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
const result = await sdk.general.newFeedbacksQuestions();
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

Defined in: [modules/communications/index.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L45)

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
const result = await sdk.general.getQuestionsCountUnanswered();
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

Defined in: [modules/communications/index.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L64)

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
const result = await sdk.general.getQuestionsCount({});
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

Defined in: [modules/communications/index.ts:83](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L83)

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
const result = await sdk.general.questions({});
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

Defined in: [modules/communications/index.ts:102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L102)

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
const result = await sdk.general.updateQuestion({});
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

Defined in: [modules/communications/index.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L121)

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
const result = await sdk.general.question({});
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

Defined in: [modules/communications/index.ts:139](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L139)

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
const result = await sdk.general.getFeedbacksCountUnanswered();
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

Defined in: [modules/communications/index.ts:158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L158)

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
const result = await sdk.general.getFeedbacksCount({});
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

Defined in: [modules/communications/index.ts:177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L177)

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
const result = await sdk.general.feedbacks({});
console.log(result);
```

***

### supplierValuations()

```ts
supplierValuations(): Promise<{
  data?: {
     feedbackValuations?: {
        1?: string;
        2?: string;
        3?: string;
        4?: string;
        5?: string;
        6?: string;
        7?: string;
        11?: string;
        12?: string;
        13?: string;
        14?: string;
        15?: string;
        16?: string;
        17?: string;
        18?: string;
        19?: string;
        20?: string;
     };
     productValuations?: {
        1?: string;
        2?: string;
        3?: string;
        4?: string;
     };
  };
  error?: boolean;
  errorText?: string;
  additionalErrors?: string[];
}>;
```

Defined in: [modules/communications/index.ts:195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L195)

Получить списки причин жалоб на отзыв и проблем с товаром

Метод возвращает списки причин [жалоб на отзыв и проблем с товаром](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1actions/post). <br> <br> <div class="description_important"> Списки причин жалоб на <a href='https://seller.wildberries.ru/feedbacks/feedbacks-tab/not-answered'>портале продавцов</a> и в API различаются. При этом подать жалобу по API по причине с портала продавца невозможно. <br> </div> Если жалоба подана через портал продавцов (например, `13` — Спам-реклама в тексте), в ответах методов получения [отзыва по ID](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedback/get), [списка отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) и [списка архивных отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1archive/get) будет отображаться причина, указанная на портале (`13` — Спам-реклама в тексте). Если жалоба подана по API (например, с причиной `3` — Спам), в ответах тех же методов будет отображаться причина, переданная по API, а на портале продавцов отобразится соответствующая причина из списка портала (`13` — Спам-реклама в тексте). Сопоставление причин жалоб в API и на портале продавцов: | Причины в API | Причины на портале продавцов | Описание | |---|---|---| | `1` | `11` | Отзыв не относится к товару | | `2` | `12` | Отзыв оставили конкуренты | | `3` | `13` | • **API** — Спам <br> • **Портал продавцов** — Спам-реклама в тексте | | `4` | `15` | • **API** — Нецензурное содержимое в фото<br>• **Портал продавцов** — Нецензурное содержимое в фото или видео | | `5` | `16` | Нецензурная лексика | | `6` | `17` | • **API** — Фото не имеет отношения к товару <br> • **Портал продавцов** — Фото или видео не имеет отношения к товару | | `7` | `18` | Отзыв с политическим контекстом | |Нет аналога в API | `14` | Спам-реклама на фото или видео | |Нет аналога в API | `19` | Другое | |Нет аналога в API | `20` | Угрозы, оскорбления | <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Returns

`Promise`\<\{
  `data?`: \{
     `feedbackValuations?`: \{
        `1?`: `string`;
        `2?`: `string`;
        `3?`: `string`;
        `4?`: `string`;
        `5?`: `string`;
        `6?`: `string`;
        `7?`: `string`;
        `11?`: `string`;
        `12?`: `string`;
        `13?`: `string`;
        `14?`: `string`;
        `15?`: `string`;
        `16?`: `string`;
        `17?`: `string`;
        `18?`: `string`;
        `19?`: `string`;
        `20?`: `string`;
     \};
     `productValuations?`: \{
        `1?`: `string`;
        `2?`: `string`;
        `3?`: `string`;
        `4?`: `string`;
     \};
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
const result = await sdk.general.supplierValuations();
console.log(result);
```

***

### createFeedbacksAction()

```ts
createFeedbacksAction(data?: {
  id: string;
  supplierFeedbackValuation?: number;
  supplierProductValuation?: number;
}): Promise<void>;
```

Defined in: [modules/communications/index.ts:213](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L213)

Пожаловаться на отзыв, сообщить о проблеме с товаром

Метод позволяет: - подать жалобу на отзыв - сообщить о проблеме с товаром из отзыва <div class="description_important"> ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `id`: `string`; `supplierFeedbackValuation?`: `number`; `supplierProductValuation?`: `number`; \} | Request body data |
| `data.id?` | `string` | - |
| `data.supplierFeedbackValuation?` | `number` | - |
| `data.supplierProductValuation?` | `number` | - |

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
const result = await sdk.general.createFeedbacksAction({});
```

***

### createFeedbacksAnswer()

```ts
createFeedbacksAnswer(data?: {
  id: string;
  text: string;
}): Promise<void>;
```

Defined in: [modules/communications/index.ts:231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L231)

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
const result = await sdk.general.createFeedbacksAnswer({});
```

***

### updateFeedbacksAnswer()

```ts
updateFeedbacksAnswer(data?: {
  id: string;
  text: string;
}): Promise<void>;
```

Defined in: [modules/communications/index.ts:249](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L249)

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
const result = await sdk.general.updateFeedbacksAnswer({});
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

Defined in: [modules/communications/index.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L268)

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
const result = await sdk.general.createOrderReturn({});
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

Defined in: [modules/communications/index.ts:287](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L287)

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
const result = await sdk.general.feedback({});
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

Defined in: [modules/communications/index.ts:306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L306)

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
const result = await sdk.general.getFeedbacksArchive({});
console.log(result);
```

***

### templates()

```ts
templates(options?: {
  templateType: number;
}): Promise<ResponseTemplate>;
```

Defined in: [modules/communications/index.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L325)

Получить шаблоны ответов на вопросы и отзывы

Метод возвращает список шаблонов ответов на [вопросы](/openapi/user-communication#tag/Voprosy) и [отзывы](/openapi/user-communication#tag/Otzyvy) покупателей. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `templateType`: `number`; \} | Query parameters |
| `options.templateType?` | `number` | - |

#### Returns

`Promise`\<[`ResponseTemplate`](../-internal-/interfaces/ResponseTemplate.md)\>

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
const result = await sdk.general.templates({});
console.log(result);
```

***

### createTemplate()

```ts
createTemplate(data?: {
  name: string;
  templateType: number;
  text: string;
}): Promise<PostTemplate>;
```

Defined in: [modules/communications/index.ts:344](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L344)

Создать шаблон

Метод добавляет [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя.<br><br> Можно создать максимум 20 шаблонов: 10 для отзывов и 10 для вопросов. В тексте шаблона можно использовать любые символы. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `name`: `string`; `templateType`: `number`; `text`: `string`; \} | Request body data |
| `data.name?` | `string` | - |
| `data.templateType?` | `number` | - |
| `data.text?` | `string` | - |

#### Returns

`Promise`\<[`PostTemplate`](../-internal-/interfaces/PostTemplate.md)\>

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
const result = await sdk.general.createTemplate({});
console.log(result);
```

***

### updateTemplate()

```ts
updateTemplate(data?: {
  name: string;
  templateID: string;
  text: string;
}): Promise<PatchDelResp>;
```

Defined in: [modules/communications/index.ts:363](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L363)

Редактировать шаблон

Метод редактирует [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя.<br><br> В тексте шаблона можно использовать любые символы. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `name`: `string`; `templateID`: `string`; `text`: `string`; \} | Request body data |
| `data.name?` | `string` | - |
| `data.templateID?` | `string` | - |
| `data.text?` | `string` | - |

#### Returns

`Promise`\<[`PatchDelResp`](../-internal-/interfaces/PatchDelResp.md)\>

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
const result = await sdk.general.updateTemplate({});
console.log(result);
```

***

### deleteTemplate()

```ts
deleteTemplate(data?: {
  templateID: string;
}): Promise<PatchDelResp>;
```

Defined in: [modules/communications/index.ts:382](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L382)

Удалить шаблон

Метод редактирует [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \{ `templateID`: `string`; \} | Request body data |
| `data.templateID?` | `string` | - |

#### Returns

`Promise`\<[`PatchDelResp`](../-internal-/interfaces/PatchDelResp.md)\>

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
const result = await sdk.general.deleteTemplate({});
console.log(result);
```

***

### getSellerChats()

```ts
getSellerChats(): Promise<ChatsResponse>;
```

Defined in: [modules/communications/index.ts:400](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L400)

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
const result = await sdk.general.getSellerChats();
console.log(result);
```

***

### getSellerEvents()

```ts
getSellerEvents(options?: {
  next?: number;
}): Promise<EventsResponse>;
```

Defined in: [modules/communications/index.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L419)

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
const result = await sdk.general.getSellerEvents({});
console.log(result);
```

***

### createSellerMessage()

```ts
createSellerMessage(): Promise<MessageResponse>;
```

Defined in: [modules/communications/index.ts:437](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L437)

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
const result = await sdk.general.createSellerMessage();
console.log(result);
```

***

### getSellerDownload()

```ts
getSellerDownload(id: string): Promise<unknown>;
```

Defined in: [modules/communications/index.ts:456](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L456)

Получить файл из сообщения

Метод возвращает файл или изображение из сообщения по его ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | ID файла, см. значение поля `downloadID` в методе [События чатов](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get) |

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
const result = await sdk.general.getSellerDownload('id-value');
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

Defined in: [modules/communications/index.ts:475](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L475)

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
const result = await sdk.general.claims({});
console.log(result);
```

***

### updateClaim()

```ts
updateClaim(): Promise<unknown>;
```

Defined in: [modules/communications/index.ts:493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/modules/communications/index.ts#L493)

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
const result = await sdk.general.updateClaim();
console.log(result);
```
