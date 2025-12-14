/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/09-communications.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type { ChatsResponse, EventsResponse, MessageResponse, PatchDelResp, PostTemplate, ResponseFeedback, ResponseTemplate } from '../../types/communications.types';

export class CommunicationsModule {
  constructor(private client: BaseClient) {}

  /**
   * Непросмотренные отзывы и вопросы
   *
   * Метод проверяет наличие непросмотренных [вопросов](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) и [отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) от покупателей. Если у продавца есть непросмотренные вопросы или отзывы, возвращает `true`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.newFeedbacksQuestions();
  console.log(result);
   */
  async newFeedbacksQuestions(): Promise<{ data?: { hasNewQuestions?: boolean; hasNewFeedbacks?: boolean }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { hasNewQuestions?: boolean; hasNewFeedbacks?: boolean }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/new-feedbacks-questions');
  }

  /**
   * Неотвеченные вопросы
   *
   * Метод возвращает общее количество неотвеченных [вопросов](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) и количество неотвеченных вопросов за сегодня. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getQuestionsCountUnanswered();
  console.log(result);
   */
  async getQuestionsCountUnanswered(): Promise<{ data?: { countUnanswered?: number; countUnansweredToday?: number }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { countUnanswered?: number; countUnansweredToday?: number }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/questions/count-unanswered');
  }

  /**
   * Количество вопросов
   *
   * Метод возвращает количество отвеченных или неотвеченных [вопросов](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) за заданный период. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getQuestionsCount({});
  console.log(result);
   */
  async getQuestionsCount(options?: { dateFrom?: number; dateTo?: number; isAnswered?: boolean }): Promise<{ data?: number; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: number; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/questions/count', { params: options });
  }

  /**
   * Список вопросов
   *
   * Метод возвращает список вопросов по заданным фильтрам. Вы можете: - получить данные отвеченных и неотвеченных вопросов - сортировать вопросы по дате - настроить пагинацию и количество вопросов в ответе <div class="description_important"> Можно получить максимум 10 000 вопросов в одном ответе </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.questions({});
  console.log(result);
   */
  async questions(options?: { isAnswered: boolean; nmId?: number; take: number; skip: number; order?: string; dateFrom?: number; dateTo?: number }): Promise<{ data?: { countUnanswered?: number; countArchive?: number; questions?: { id?: string; text?: string; createdDate?: string; state?: string; answer?: { text?: string; editable?: boolean; createDate?: string }; productDetails?: { nmId?: number; imtId?: number; productName?: string; supplierArticle?: string; supplierName?: string; brandName?: string; size?: string }; wasViewed?: boolean; isWarned?: boolean }[] }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { countUnanswered?: number; countArchive?: number; questions?: { id?: string; text?: string; createdDate?: string; state?: string; answer?: { text?: string; editable?: boolean; createDate?: string }; productDetails?: { nmId?: number; imtId?: number; productName?: string; supplierArticle?: string; supplierName?: string; brandName?: string; size?: string }; wasViewed?: boolean; isWarned?: boolean }[] }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/questions', { params: options });
  }

  /**
   * Работа с вопросами
   *
   * В зависимости от тела запроса, метод позволяет: - отметить [вопрос](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) как просмотренный - отклонить вопрос - ответить на вопрос или отредактировать ответ <div class="description_important"> Отредактировать ответ на вопрос можно 1 раз в течение 60 дней после отправки ответа </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateQuestion({});
  console.log(result);
   */
  async updateQuestion(data?: { id: string; wasViewed: boolean } | { id: string; answer: { text: string }; state: string }): Promise<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.patch<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/questions', data);
  }

  /**
   * Получить вопрос по ID
   *
   * Метод возвращает данные [вопроса](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/get) по его ID. Далее вы можете [работать с этим вопросом](/openapi/user-communication#tag/Voprosy/paths/~1api~1v1~1questions/patch). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.question({});
  console.log(result);
   */
  async question(options?: { id: string }): Promise<{ data?: { id?: string; text?: string; createdDate?: string; state?: string; answer?: { text?: string; editable?: boolean; createDate?: string }; productDetails?: { nmId?: number; imtId?: number; productName?: string; supplierArticle?: string; supplierName?: string; brandName?: string; size?: string }; wasViewed?: boolean; isWarned?: boolean }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { id?: string; text?: string; createdDate?: string; state?: string; answer?: { text?: string; editable?: boolean; createDate?: string }; productDetails?: { nmId?: number; imtId?: number; productName?: string; supplierArticle?: string; supplierName?: string; brandName?: string; size?: string }; wasViewed?: boolean; isWarned?: boolean }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/question', { params: options });
  }

  /**
   * Необработанные отзывы
   *
   * Метод возвращает: - количество необработанных [отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) за сегодня и за всё время - среднюю оценку всех отзывов <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getFeedbacksCountUnanswered();
  console.log(result);
   */
  async getFeedbacksCountUnanswered(): Promise<{ data?: { countUnanswered?: number; countUnansweredToday?: number; valuation?: string }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { countUnanswered?: number; countUnansweredToday?: number; valuation?: string }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count-unanswered');
  }

  /**
   * Количество отзывов
   *
   * Метод возвращает количество обработанных или необработанных [отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) за заданный период. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getFeedbacksCount({});
  console.log(result);
   */
  async getFeedbacksCount(options?: { dateFrom?: number; dateTo?: number; isAnswered?: boolean }): Promise<{ data?: number; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: number; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count', { params: options });
  }

  /**
   * Список отзывов
   *
   * Метод возвращает список отзывов по заданным фильтрам. Вы можете: - получить данные обработанных и необработанных отзывов - сортировать отзывы по дате - настроить пагинацию и количество отзывов в ответе <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.feedbacks({});
  console.log(result);
   */
  async feedbacks(options?: { isAnswered: boolean; nmId?: number; take: number; skip: number; order?: 'dateAsc' | 'dateDesc'; dateFrom?: number; dateTo?: number }): Promise<{ data?: { countUnanswered?: number; countArchive?: number; feedbacks?: ResponseFeedback }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { countUnanswered?: number; countArchive?: number; feedbacks?: ResponseFeedback }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks', { params: options });
  }

  /**
   * Получить списки причин жалоб на отзыв и проблем с товаром
   *
   * Метод возвращает списки причин [жалоб на отзыв и проблем с товаром](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1actions/post). <br> <br> <div class="description_important"> Списки причин жалоб на <a href='https://seller.wildberries.ru/feedbacks/feedbacks-tab/not-answered'>портале продавцов</a> и в API различаются. При этом подать жалобу по API по причине с портала продавца невозможно. <br> </div> Если жалоба подана через портал продавцов (например, `13` — Спам-реклама в тексте), в ответах методов получения [отзыва по ID](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedback/get), [списка отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) и [списка архивных отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1archive/get) будет отображаться причина, указанная на портале (`13` — Спам-реклама в тексте). Если жалоба подана по API (например, с причиной `3` — Спам), в ответах тех же методов будет отображаться причина, переданная по API, а на портале продавцов отобразится соответствующая причина из списка портала (`13` — Спам-реклама в тексте). Сопоставление причин жалоб в API и на портале продавцов: | Причины в API | Причины на портале продавцов | Описание | |---|---|---| | `1` | `11` | Отзыв не относится к товару | | `2` | `12` | Отзыв оставили конкуренты | | `3` | `13` | • **API** — Спам <br> • **Портал продавцов** — Спам-реклама в тексте | | `4` | `15` | • **API** — Нецензурное содержимое в фото<br>• **Портал продавцов** — Нецензурное содержимое в фото или видео | | `5` | `16` | Нецензурная лексика | | `6` | `17` | • **API** — Фото не имеет отношения к товару <br> • **Портал продавцов** — Фото или видео не имеет отношения к товару | | `7` | `18` | Отзыв с политическим контекстом | |Нет аналога в API | `14` | Спам-реклама на фото или видео | |Нет аналога в API | `19` | Другое | |Нет аналога в API | `20` | Угрозы, оскорбления | <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.supplierValuations();
  console.log(result);
   */
  async supplierValuations(): Promise<{ data?: { feedbackValuations?: { 1?: string; 2?: string; 3?: string; 4?: string; 5?: string; 6?: string; 7?: string; 11?: string; 12?: string; 13?: string; 14?: string; 15?: string; 16?: string; 17?: string; 18?: string; 19?: string; 20?: string }; productValuations?: { 1?: string; 2?: string; 3?: string; 4?: string } }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { feedbackValuations?: { 1?: string; 2?: string; 3?: string; 4?: string; 5?: string; 6?: string; 7?: string; 11?: string; 12?: string; 13?: string; 14?: string; 15?: string; 16?: string; 17?: string; 18?: string; 19?: string; 20?: string }; productValuations?: { 1?: string; 2?: string; 3?: string; 4?: string } }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/supplier-valuations');
  }

  /**
   * Пожаловаться на отзыв, сообщить о проблеме с товаром
   *
   * Метод позволяет: - подать жалобу на отзыв - сообщить о проблеме с товаром из отзыва <div class="description_important"> ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createFeedbacksAction({});
   */
  async createFeedbacksAction(data?: { id: string; supplierFeedbackValuation?: number; supplierProductValuation?: number }): Promise<void> {
    return this.client.post('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/actions', data);
  }

  /**
   * Ответить на отзыв
   *
   * Метод позволяет ответить на [отзыв](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) покупателя. <div class="description_important"> ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createFeedbacksAnswer({});
   */
  async createFeedbacksAnswer(data?: { id: string; text: string }): Promise<void> {
    return this.client.post('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer', data);
  }

  /**
   * Отредактировать ответ на отзыв
   *
   * Метод позволяет отредактировать уже отправленный [ответ на отзыв](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1answer/post) покупателя. <br><br> Отредактировать ответ можно только один раз в течение 60 дней c момента отправки. <div class="description_important"> ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateFeedbacksAnswer({});
   */
  async updateFeedbacksAnswer(data?: { id: string; text: string }): Promise<void> {
    return this.client.patch('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer', data);
  }

  /**
   * Возврат товара по ID отзыва
   *
   * Метод запрашивает возврат товара, по которому оставлен [отзыв](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get). <br><br> Возврат доступен для отзывов с полем `"isAbleReturnProductOrders": true`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createOrderReturn({});
  console.log(result);
   */
  async createOrderReturn(data: { feedbackId?: string }): Promise<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.post<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/order/return', data);
  }

  /**
   * Получить отзыв по ID
   *
   * Метод возвращает данные [отзыва](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) по его ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.feedback({});
  console.log(result);
   */
  async feedback(options?: { id: string }): Promise<{ data?: { id?: string; userName?: string; pros?: string; cons?: string; matchingSize?: string; text?: string; productValuation?: number; createdDate?: string; answer?: { text?: string; state?: string; editable?: boolean }; state?: string; productDetails?: { nmId?: number; imtId?: number; productName?: string; supplierArticle?: string; supplierName?: string; brandName?: string; size?: string }; photoLinks?: { fullSize?: string; miniSize?: string }[]; video?: { previewImage?: string; link?: string; durationSec?: number }; wasViewed?: boolean; isAbleSupplierFeedbackValuation?: boolean; supplierFeedbackValuation?: number; isAbleSupplierProductValuation?: boolean; supplierProductValuation?: number; isAbleReturnProductOrders?: boolean; returnProductOrdersDate?: string; bables?: string[]; lastOrderShkId?: number; lastOrderCreatedAt?: string; color?: string; subjectId?: number; subjectName?: string; parentFeedbackId?: string; childFeedbackId?: string }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { id?: string; userName?: string; pros?: string; cons?: string; matchingSize?: string; text?: string; productValuation?: number; createdDate?: string; answer?: { text?: string; state?: string; editable?: boolean }; state?: string; productDetails?: { nmId?: number; imtId?: number; productName?: string; supplierArticle?: string; supplierName?: string; brandName?: string; size?: string }; photoLinks?: { fullSize?: string; miniSize?: string }[]; video?: { previewImage?: string; link?: string; durationSec?: number }; wasViewed?: boolean; isAbleSupplierFeedbackValuation?: boolean; supplierFeedbackValuation?: number; isAbleSupplierProductValuation?: boolean; supplierProductValuation?: number; isAbleReturnProductOrders?: boolean; returnProductOrdersDate?: string; bables?: string[]; lastOrderShkId?: number; lastOrderCreatedAt?: string; color?: string; subjectId?: number; subjectName?: string; parentFeedbackId?: string; childFeedbackId?: string }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/feedback', { params: options });
  }

  /**
   * Список архивных отзывов
   *
   * Метод возвращает список архивных [отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get). <br><br> Отзыв становится архивным, если: - на отзыв получен ответ - на отзыв не получен ответ в течение 30 дней - в отзыве нет текста и фото <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getFeedbacksArchive({});
  console.log(result);
   */
  async getFeedbacksArchive(options?: { nmId?: number; take: number; skip: number; order?: 'dateAsc' | 'dateDesc' }): Promise<{ data?: { feedbacks?: ResponseFeedback }; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{ data?: { feedbacks?: ResponseFeedback }; error?: boolean; errorText?: string; additionalErrors?: string[] }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/archive', { params: options });
  }

  /**
   * Получить шаблоны ответов на вопросы и отзывы
   *
   * Метод возвращает список шаблонов ответов на [вопросы](/openapi/user-communication#tag/Voprosy) и [отзывы](/openapi/user-communication#tag/Otzyvy) покупателей. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.templates({});
  console.log(result);
   */
  async templates(options?: { templateType: number }): Promise<ResponseTemplate> {
    return this.client.get<ResponseTemplate>('https://feedbacks-api.wildberries.ru/api/v1/templates', { params: options });
  }

  /**
   * Создать шаблон
   *
   * Метод добавляет [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя.<br><br> Можно создать максимум 20 шаблонов: 10 для отзывов и 10 для вопросов. В тексте шаблона можно использовать любые символы. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createTemplate({});
  console.log(result);
   */
  async createTemplate(data?: { name: string; templateType: number; text: string }): Promise<PostTemplate> {
    return this.client.post<PostTemplate>('https://feedbacks-api.wildberries.ru/api/v1/templates', data);
  }

  /**
   * Редактировать шаблон
   *
   * Метод редактирует [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя.<br><br> В тексте шаблона можно использовать любые символы. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateTemplate({});
  console.log(result);
   */
  async updateTemplate(data?: { name: string; templateID: string; text: string }): Promise<PatchDelResp> {
    return this.client.patch<PatchDelResp>('https://feedbacks-api.wildberries.ru/api/v1/templates', data);
  }

  /**
   * Удалить шаблон
   *
   * Метод редактирует [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.deleteTemplate({});
  console.log(result);
   */
  async deleteTemplate(data?: { templateID: string }): Promise<PatchDelResp> {
    return this.client.delete<PatchDelResp>('https://feedbacks-api.wildberries.ru/api/v1/templates', data);
  }

  /**
   * Список чатов
   *
   * Метод возвращает список всех чатов продавца. По этим данным можно получить [события чатов](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get) или [отправить сообщение покупателю](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSellerChats();
  console.log(result);
   */
  async getSellerChats(): Promise<ChatsResponse> {
    return this.client.get<ChatsResponse>('https://buyer-chat-api.wildberries.ru/api/v1/seller/chats');
  }

  /**
   * События чатов
   *
   * Метод возвращает список событий всех [чатов с покупателями](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1chats/get). Чтобы получить все события: 1. Сделайте первый запрос без параметра `next`. 2. Повторяйте запрос со значением параметра `next` из ответа на предыдущий запрос, пока `totalEvents` не станет равным `0`. Это будет означать, что вы получили все события. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSellerEvents({});
  console.log(result);
   */
  async getSellerEvents(options?: { next?: number }): Promise<EventsResponse> {
    return this.client.get<EventsResponse>('https://api.wildberries.ru/api/v1/seller/events', { params: options });
  }

  /**
   * Отправить сообщение
   *
   * Метод отправляет сообщения в [чат с покупателем](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1chats/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createSellerMessage();
  console.log(result);
   */
  async createSellerMessage(): Promise<MessageResponse> {
    return this.client.post<MessageResponse>('https://api.wildberries.ru/api/v1/seller/message', undefined);
  }

  /**
   * Получить файл из сообщения
   *
   * Метод возвращает файл или изображение из сообщения по его ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>
   *
   * @param id - ID файла, см. значение поля `downloadID` в методе [События чатов](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get)
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSellerDownload('id-value');
  console.log(result);
   */
  async getSellerDownload(id: string): Promise<unknown> {
    return this.client.get<unknown>(`https://api.wildberries.ru/api/v1/seller/download/${id}`);
  }

  /**
   * Заявки покупателей на возврат
   *
   * Метод возвращает заявки покупателей на возврат товаров за последние 14 дней. Вы можете [отвечать на эти заявки](/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claim/patch). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 20 запросов | 3 секунды | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.claims({});
  console.log(result);
   */
  async claims(options?: { is_archive: boolean; id?: string; limit?: number; offset?: number; nm_id?: number }): Promise<unknown> {
    return this.client.get<unknown>('https://returns-api.wildberries.ru/api/v1/claims', { params: options });
  }

  /**
   * Ответ на заявку покупателя
   *
   * Метод отправляет ответ на [заявку](/openapi/user-communication#tag/Vozvraty-pokupatelyami/paths/~1api~1v1~1claims/get) покупателя на возврат товаров. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 20 запросов | 3 секунды | 10 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateClaim();
  console.log(result);
   */
  async updateClaim(): Promise<unknown> {
    return this.client.patch<unknown>('https://returns-api.wildberries.ru/api/v1/claim', undefined);
  }

}