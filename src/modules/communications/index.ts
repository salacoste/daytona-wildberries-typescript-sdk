/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/09-communications.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  ChatsResponse,
  EventsResponse,
  MessageResponse,
  PatchDelResp,
  PinnedReviewsCountParams,
  PinnedReviewsCountResponse,
  PinnedReviewsCreateRequest,
  PinnedReviewsCreateResponse,
  PinnedReviewsDeleteRequest,
  PinnedReviewsDeleteResponse,
  PinnedReviewsLimitsResponse,
  PinnedReviewsListParams,
  PinnedReviewsListResponse,
  PostTemplate,
  ResponseFeedback,
  ResponseTemplate,
} from '../../types/communications.types';

export class CommunicationsModule {
  private static _deprecatedWarnings = new Set<string>();

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
  const result = await sdk.communications.newFeedbacksQuestions();
  console.log(result);
   */
  async newFeedbacksQuestions(): Promise<{
    data?: { hasNewQuestions?: boolean; hasNewFeedbacks?: boolean };
    error?: boolean;
    errorText?: string;
    additionalErrors?: string[];
  }> {
    return this.client.get<{
      data?: { hasNewQuestions?: boolean; hasNewFeedbacks?: boolean };
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/new-feedbacks-questions', {
      rateLimitKey: 'communications.newFeedbacksQuestions',
    });
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
  const result = await sdk.communications.getQuestionsCountUnanswered();
  console.log(result);
   */
  async getQuestionsCountUnanswered(): Promise<{
    data?: { countUnanswered?: number; countUnansweredToday?: number };
    error?: boolean;
    errorText?: string;
    additionalErrors?: string[];
  }> {
    return this.client.get<{
      data?: { countUnanswered?: number; countUnansweredToday?: number };
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/questions/count-unanswered', {
      rateLimitKey: 'communications.questionsCountUnanswered',
    });
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
  const result = await sdk.communications.getQuestionsCount({});
  console.log(result);
   */
  async getQuestionsCount(options?: {
    dateFrom?: number;
    dateTo?: number;
    isAnswered?: boolean;
  }): Promise<{ data?: number; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{
      data?: number;
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/questions/count', {
      params: options,
      rateLimitKey: 'communications.questionsCount',
    });
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
  const result = await sdk.communications.questions({});
  console.log(result);
   */
  async questions(options?: {
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
        answer?: { text?: string; editable?: boolean; createDate?: string };
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
  }> {
    return this.client.get<{
      data?: {
        countUnanswered?: number;
        countArchive?: number;
        questions?: {
          id?: string;
          text?: string;
          createdDate?: string;
          state?: string;
          answer?: { text?: string; editable?: boolean; createDate?: string };
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
    }>('https://feedbacks-api.wildberries.ru/api/v1/questions', {
      params: options,
      rateLimitKey: 'communications.questions',
    });
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
  const result = await sdk.communications.updateQuestion({});
  console.log(result);
   */
  async updateQuestion(
    data?:
      | { id: string; wasViewed: boolean }
      | { id: string; answer: { text: string }; state: string }
  ): Promise<{
    data?: Record<string, never>;
    error?: boolean;
    errorText?: string;
    additionalErrors?: string[];
  }> {
    return this.client.patch<{
      data?: Record<string, never>;
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/questions', data, {
      rateLimitKey: 'communications.patchQuestions',
    });
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
  const result = await sdk.communications.question({});
  console.log(result);
   */
  async question(options?: { id: string }): Promise<{
    data?: {
      id?: string;
      text?: string;
      createdDate?: string;
      state?: string;
      answer?: { text?: string; editable?: boolean; createDate?: string };
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
  }> {
    return this.client.get<{
      data?: {
        id?: string;
        text?: string;
        createdDate?: string;
        state?: string;
        answer?: { text?: string; editable?: boolean; createDate?: string };
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
    }>('https://feedbacks-api.wildberries.ru/api/v1/question', {
      params: options,
      rateLimitKey: 'communications.question',
    });
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
  const result = await sdk.communications.getFeedbacksCountUnanswered();
  console.log(result);
   */
  async getFeedbacksCountUnanswered(): Promise<{
    data?: { countUnanswered?: number; countUnansweredToday?: number; valuation?: string };
    error?: boolean;
    errorText?: string;
    additionalErrors?: string[];
  }> {
    return this.client.get<{
      data?: { countUnanswered?: number; countUnansweredToday?: number; valuation?: string };
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count-unanswered', {
      rateLimitKey: 'communications.feedbacksCountUnanswered',
    });
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
  const result = await sdk.communications.getFeedbacksCount({});
  console.log(result);
   */
  async getFeedbacksCount(options?: {
    dateFrom?: number;
    dateTo?: number;
    isAnswered?: boolean;
  }): Promise<{ data?: number; error?: boolean; errorText?: string; additionalErrors?: string[] }> {
    return this.client.get<{
      data?: number;
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/count', {
      params: options,
      rateLimitKey: 'communications.feedbacksCount',
    });
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
  const result = await sdk.communications.feedbacks({});
  console.log(result);
   */
  async feedbacks(options?: {
    isAnswered: boolean;
    nmId?: number;
    take: number;
    skip: number;
    order?: 'dateAsc' | 'dateDesc';
    dateFrom?: number;
    dateTo?: number;
  }): Promise<{
    data?: { countUnanswered?: number; countArchive?: number; feedbacks?: ResponseFeedback };
    error?: boolean;
    errorText?: string;
    additionalErrors?: string[];
  }> {
    return this.client.get<{
      data?: { countUnanswered?: number; countArchive?: number; feedbacks?: ResponseFeedback };
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks', {
      params: options,
      rateLimitKey: 'communications.feedbacks',
    });
  }

  /**
   * Получить списки причин жалоб на отзыв и проблем с товаром
   *
   * Метод возвращает списки причин [жалоб на отзыв и проблем с товаром](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1actions/post). <br> <br> <div class="description_important"> Списки причин жалоб на <a href='https://seller.wildberries.ru/feedbacks/feedbacks-tab/not-answered'>портале продавцов</a> и в API различаются. При этом подать жалобу по API по причине с портала продавца невозможно. <br> </div> Если жалоба подана через портал продавцов (например, `13` — Спам-реклама в тексте), в ответах методов получения [отзыва по ID](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedback/get), [списка отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks/get) и [списка архивных отзывов](/openapi/user-communication#tag/Otzyvy/paths/~1api~1v1~1feedbacks~1archive/get) будет отображаться причина, указанная на портале (`13` — Спам-реклама в тексте). Если жалоба подана по API (например, с причиной `3` — Спам), в ответах тех же методов будет отображаться причина, переданная по API, а на портале продавцов отобразится соответствующая причина из списка портала (`13` — Спам-реклама в тексте). Сопоставление причин жалоб в API и на портале продавцов: | Причины в API | Причины на портале продавцов | Описание | |---|---|---| | `1` | `11` | Отзыв не относится к товару | | `2` | `12` | Отзыв оставили конкуренты | | `3` | `13` | • **API** — Спам <br> • **Портал продавцов** — Спам-реклама в тексте | | `4` | `15` | • **API** — Нецензурное содержимое в фото<br>• **Портал продавцов** — Нецензурное содержимое в фото или видео | | `5` | `16` | Нецензурная лексика | | `6` | `17` | • **API** — Фото не имеет отношения к товару <br> • **Портал продавцов** — Фото или видео не имеет отношения к товару | | `7` | `18` | Отзыв с политическим контекстом | |Нет аналога в API | `14` | Спам-реклама на фото или видео | |Нет аналога в API | `19` | Другое | |Нет аналога в API | `20` | Угрозы, оскорбления | <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   * @deprecated This endpoint has been removed from the Wildberries API.
   * Use alternative methods or contact Wildberries support.
   * @see {@link https://dev.wildberries.ru/openapi/communications}

   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.communications.supplierValuations();
  console.log(result);
   */
  async supplierValuations(): Promise<{
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
      productValuations?: { 1?: string; 2?: string; 3?: string; 4?: string };
    };
    error?: boolean;
    errorText?: string;
    additionalErrors?: string[];
  }> {
    if (!CommunicationsModule._deprecatedWarnings.has('supplierValuations')) {
      CommunicationsModule._deprecatedWarnings.add('supplierValuations');
      console.warn(
        '[WB SDK] supplierValuations is deprecated and may be removed. This endpoint has been removed from the Wildberries API.'
      );
    }
    return this.client.get<{
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
        productValuations?: { 1?: string; 2?: string; 3?: string; 4?: string };
      };
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/supplier-valuations', {
      rateLimitKey: 'communications.supplierValuations',
    });
  }

  /**
   * Пожаловаться на отзыв, сообщить о проблеме с товаром
   *
   * Метод позволяет: - подать жалобу на отзыв - сообщить о проблеме с товаром из отзыва <div class="description_important"> ID отзыва не валидируется. Если в запросе вы передали некорректный ID, вы не получите ошибку. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @deprecated This endpoint has been removed from the Wildberries API.
   * Use alternative methods or contact Wildberries support.
   * @see {@link https://dev.wildberries.ru/openapi/communications}

   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.communications.createFeedbacksAction({});
   */
  async createFeedbacksAction(data?: {
    id: string;
    supplierFeedbackValuation?: number;
    supplierProductValuation?: number;
  }): Promise<void> {
    if (!CommunicationsModule._deprecatedWarnings.has('createFeedbacksAction')) {
      CommunicationsModule._deprecatedWarnings.add('createFeedbacksAction');
      console.warn(
        '[WB SDK] createFeedbacksAction is deprecated and may be removed. This endpoint has been removed from the Wildberries API.'
      );
    }
    return this.client.post('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/actions', data, {
      rateLimitKey: 'communications.postFeedbacksActions',
    });
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
  const result = await sdk.communications.createFeedbacksAnswer({});
   */
  async createFeedbacksAnswer(data?: { id: string; text: string }): Promise<void> {
    return this.client.post('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer', data, {
      rateLimitKey: 'communications.postFeedbacksAnswer',
    });
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
  const result = await sdk.communications.updateFeedbacksAnswer({});
   */
  async updateFeedbacksAnswer(data?: { id: string; text: string }): Promise<void> {
    return this.client.patch('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/answer', data, {
      rateLimitKey: 'communications.patchFeedbacksAnswer',
    });
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
  const result = await sdk.communications.createOrderReturn({});
  console.log(result);
   */
  async createOrderReturn(data: { feedbackId?: string }): Promise<{
    data?: Record<string, never>;
    error?: boolean;
    errorText?: string;
    additionalErrors?: string[];
  }> {
    return this.client.post<{
      data?: Record<string, never>;
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/order/return', data, {
      rateLimitKey: 'communications.postFeedbacksOrderReturn',
    });
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
  const result = await sdk.communications.feedback({});
  console.log(result);
   */
  async feedback(options?: { id: string }): Promise<{
    data?: {
      id?: string;
      userName?: string;
      pros?: string;
      cons?: string;
      matchingSize?: string;
      text?: string;
      productValuation?: number;
      createdDate?: string;
      answer?: { text?: string; state?: string; editable?: boolean };
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
      photoLinks?: { fullSize?: string; miniSize?: string }[];
      video?: { previewImage?: string; link?: string; durationSec?: number };
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
  }> {
    return this.client.get<{
      data?: {
        id?: string;
        userName?: string;
        pros?: string;
        cons?: string;
        matchingSize?: string;
        text?: string;
        productValuation?: number;
        createdDate?: string;
        answer?: { text?: string; state?: string; editable?: boolean };
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
        photoLinks?: { fullSize?: string; miniSize?: string }[];
        video?: { previewImage?: string; link?: string; durationSec?: number };
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
    }>('https://feedbacks-api.wildberries.ru/api/v1/feedback', {
      params: options,
      rateLimitKey: 'communications.feedback',
    });
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
  const result = await sdk.communications.getFeedbacksArchive({});
  console.log(result);
   */
  async getFeedbacksArchive(options?: {
    nmId?: number;
    take: number;
    skip: number;
    order?: 'dateAsc' | 'dateDesc';
  }): Promise<{
    data?: { feedbacks?: ResponseFeedback };
    error?: boolean;
    errorText?: string;
    additionalErrors?: string[];
  }> {
    return this.client.get<{
      data?: { feedbacks?: ResponseFeedback };
      error?: boolean;
      errorText?: string;
      additionalErrors?: string[];
    }>('https://feedbacks-api.wildberries.ru/api/v1/feedbacks/archive', {
      params: options,
      rateLimitKey: 'communications.feedbacksArchive',
    });
  }

  /**
   * Получить шаблоны ответов на вопросы и отзывы
   *
   * Метод возвращает список шаблонов ответов на [вопросы](/openapi/user-communication#tag/Voprosy) и [отзывы](/openapi/user-communication#tag/Otzyvy) покупателей. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @deprecated This endpoint has been removed from the Wildberries API.
   * Use alternative methods or contact Wildberries support.
   * @see {@link https://dev.wildberries.ru/openapi/communications}

   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.communications.templates({});
  console.log(result);
   */
  async templates(options?: { templateType: number }): Promise<ResponseTemplate> {
    if (!CommunicationsModule._deprecatedWarnings.has('templates')) {
      CommunicationsModule._deprecatedWarnings.add('templates');
      console.warn(
        '[WB SDK] templates is deprecated and may be removed. This endpoint has been removed from the Wildberries API.'
      );
    }
    return this.client.get<ResponseTemplate>(
      'https://feedbacks-api.wildberries.ru/api/v1/templates',
      { params: options, rateLimitKey: 'communications.templates' }
    );
  }

  /**
   * Создать шаблон
   *
   * Метод добавляет [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя.<br><br> Можно создать максимум 20 шаблонов: 10 для отзывов и 10 для вопросов. В тексте шаблона можно использовать любые символы. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @deprecated This endpoint has been removed from the Wildberries API.
   * Use alternative methods or contact Wildberries support.
   * @see {@link https://dev.wildberries.ru/openapi/communications}

   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.communications.createTemplate({});
  console.log(result);
   */
  async createTemplate(data?: {
    name: string;
    templateType: number;
    text: string;
  }): Promise<PostTemplate> {
    if (!CommunicationsModule._deprecatedWarnings.has('createTemplate')) {
      CommunicationsModule._deprecatedWarnings.add('createTemplate');
      console.warn(
        '[WB SDK] createTemplate is deprecated and may be removed. This endpoint has been removed from the Wildberries API.'
      );
    }
    return this.client.post<PostTemplate>(
      'https://feedbacks-api.wildberries.ru/api/v1/templates',
      data,
      { rateLimitKey: 'communications.postTemplates' }
    );
  }

  /**
   * Редактировать шаблон
   *
   * Метод редактирует [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя.<br><br> В тексте шаблона можно использовать любые символы. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @deprecated This endpoint has been removed from the Wildberries API.
   * Use alternative methods or contact Wildberries support.
   * @see {@link https://dev.wildberries.ru/openapi/communications}

   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.communications.updateTemplate({});
  console.log(result);
   */
  async updateTemplate(data?: {
    name: string;
    templateID: string;
    text: string;
  }): Promise<PatchDelResp> {
    if (!CommunicationsModule._deprecatedWarnings.has('updateTemplate')) {
      CommunicationsModule._deprecatedWarnings.add('updateTemplate');
      console.warn(
        '[WB SDK] updateTemplate is deprecated and may be removed. This endpoint has been removed from the Wildberries API.'
      );
    }
    return this.client.patch<PatchDelResp>(
      'https://feedbacks-api.wildberries.ru/api/v1/templates',
      data,
      { rateLimitKey: 'communications.patchTemplates' }
    );
  }

  /**
   * Удалить шаблон
   *
   * Метод редактирует [шаблон](/openapi/user-communication#tag/Shablony-otvetov/paths/~1api~1v1~1templates/get) ответа на [вопрос](/openapi/user-communication#tag/Voprosy) или [отзыв](/openapi/user-communication#tag/Otzyvy) покупателя. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Вопросы и отзывы</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 3 запроса | 333 миллисекунды | 6 запросов | </div>
   *
   * @deprecated This endpoint has been removed from the Wildberries API.
   * Use alternative methods or contact Wildberries support.
   * @see {@link https://dev.wildberries.ru/openapi/communications}

   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.communications.deleteTemplate({});
  console.log(result);
   */
  async deleteTemplate(data?: { templateID: string }): Promise<PatchDelResp> {
    if (!CommunicationsModule._deprecatedWarnings.has('deleteTemplate')) {
      CommunicationsModule._deprecatedWarnings.add('deleteTemplate');
      console.warn(
        '[WB SDK] deleteTemplate is deprecated and may be removed. This endpoint has been removed from the Wildberries API.'
      );
    }
    return this.client.delete<PatchDelResp>(
      'https://feedbacks-api.wildberries.ru/api/v1/templates',
      data,
      { rateLimitKey: 'communications.deleteTemplates' }
    );
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
  const result = await sdk.communications.getSellerChats();
  console.log(result);
   */
  async getSellerChats(): Promise<ChatsResponse> {
    return this.client.get<ChatsResponse>(
      'https://buyer-chat-api.wildberries.ru/api/v1/seller/chats',
      { rateLimitKey: 'communications.sellerChats' }
    );
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
  const result = await sdk.communications.getSellerEvents({});
  console.log(result);
   */
  async getSellerEvents(options?: { next?: number }): Promise<EventsResponse> {
    return this.client.get<EventsResponse>(
      'https://buyer-chat-api.wildberries.ru/api/v1/seller/events',
      {
        params: options,
        rateLimitKey: 'communications.sellerEvents',
      }
    );
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
  const result = await sdk.communications.createSellerMessage();
  console.log(result);
   */
  async createSellerMessage(): Promise<MessageResponse> {
    return this.client.post<MessageResponse>(
      'https://buyer-chat-api.wildberries.ru/api/v1/seller/message',
      undefined,
      { rateLimitKey: 'communications.postSellerMessage' }
    );
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
  const result = await sdk.communications.getSellerDownload('id-value');
  console.log(result);
   */
  async getSellerDownload(id: string): Promise<unknown> {
    return this.client.get<unknown>(
      `https://buyer-chat-api.wildberries.ru/api/v1/seller/download/${id}`,
      {
        rateLimitKey: 'communications.sellerDownload',
      }
    );
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
  const result = await sdk.communications.claims({});
  console.log(result);
   */
  async claims(options?: {
    is_archive: boolean;
    id?: string;
    limit?: number;
    offset?: number;
    nm_id?: number;
  }): Promise<unknown> {
    return this.client.get<unknown>('https://returns-api.wildberries.ru/api/v1/claims', {
      params: options,
      rateLimitKey: 'communications.claims',
    });
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
  const result = await sdk.communications.updateClaim();
  console.log(result);
   */
  async updateClaim(): Promise<unknown> {
    return this.client.patch<unknown>(
      'https://returns-api.wildberries.ru/api/v1/claim',
      undefined,
      {
        rateLimitKey: 'communications.patchClaim',
      }
    );
  }

  // ============================================================================
  // Pinned Reviews Methods (Закреплённые отзывы)
  // ============================================================================

  /**
   * Get count of pinned/unpinned reviews
   *
   * Returns the count of pinned and unpinned reviews for the given filters.
   * Unpinned reviews are only those that were automatically unpinned due to reasons
   * specified in the `unpinnedCause` field.
   *
   * Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.
   *
   * @param params - Optional filter parameters
   * @returns Count of reviews matching the filter
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy}
   * @example
   * ```typescript
   * // Get count of all pinned reviews
   * const count = await sdk.communications.getPinnedFeedbacksCount({ state: 'pinned' });
   * console.log(`Pinned reviews: ${count.data}`);
   *
   * // Get count of pinned reviews on product cards
   * const cardCount = await sdk.communications.getPinnedFeedbacksCount({
   *   state: 'pinned',
   *   pinOn: 'nm'
   * });
   * ```
   */
  async getPinnedFeedbacksCount(
    params?: PinnedReviewsCountParams
  ): Promise<PinnedReviewsCountResponse> {
    return this.client.get<PinnedReviewsCountResponse>(
      'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins/count',
      { params, rateLimitKey: 'communications.getPinnedFeedbacksCount' }
    );
  }

  /**
   * Get limits for pinning reviews
   *
   * Returns the limits for pinning reviews by subscription and tariff option.
   * Shows total limits, used count, remaining slots, and per-unit limits.
   *
   * Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.
   *
   * @returns Limits data for subscription and tariff
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy}
   * @example
   * ```typescript
   * const limits = await sdk.communications.getPinnedFeedbacksLimits();
   * if (limits.data.subscription) {
   *   console.log(`Subscription remaining: ${limits.data.subscription.remaining}`);
   * }
   * if (limits.data.tariff) {
   *   console.log(`Tariff remaining: ${limits.data.tariff.remaining}`);
   * }
   * ```
   */
  async getPinnedFeedbacksLimits(): Promise<PinnedReviewsLimitsResponse> {
    return this.client.get<PinnedReviewsLimitsResponse>(
      'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins/limits',
      { rateLimitKey: 'communications.getPinnedFeedbacksLimits' }
    );
  }

  /**
   * Get list of pinned/unpinned reviews
   *
   * Returns a list of pinned and unpinned reviews with pagination support.
   * Unpinned reviews are only those that were automatically unpinned due to reasons
   * specified in the `unpinnedCause` field.
   *
   * Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.
   *
   * @param params - Optional filter and pagination parameters
   * @returns List of pinned/unpinned review items with pagination cursor
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy}
   * @example
   * ```typescript
   * // Get first page of pinned reviews
   * const response = await sdk.communications.getPinnedFeedbacks({
   *   state: 'pinned',
   *   limit: 100
   * });
   * console.log(`Found ${response.data.length} pinned reviews`);
   *
   * // Get next page if available
   * if (response.next) {
   *   const nextPage = await sdk.communications.getPinnedFeedbacks({
   *     state: 'pinned',
   *     next: response.next
   *   });
   * }
   * ```
   */
  async getPinnedFeedbacks(params?: PinnedReviewsListParams): Promise<PinnedReviewsListResponse> {
    return this.client.get<PinnedReviewsListResponse>(
      'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins',
      { params, rateLimitKey: 'communications.getPinnedFeedbacks' }
    );
  }

  /**
   * Pin reviews to product cards or merged groups
   *
   * Pins reviews to a product card or group of merged product cards.
   * Requires an active Jam subscription or tariff option for pinning reviews.
   * Maximum 500 reviews can be pinned in a single request.
   *
   * Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.
   *
   * @param data - Array of reviews to pin (max 500 items)
   * @returns Result of pin operations with success/error details per item
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {ForbiddenError} When no active subscription or tariff (403)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy}
   * @example
   * ```typescript
   * const result = await sdk.communications.pinFeedback([
   *   {
   *     pinMethod: 'subscription',
   *     pinOn: 'imt',
   *     feedbackId: 'VlbkVVl7mtw37wyWkJZz'
   *   },
   *   {
   *     pinMethod: 'tariff',
   *     pinOn: 'nm',
   *     feedbackId: 'DibuRAImknLyiqgzvGcU'
   *   }
   * ]);
   *
   * result.data.forEach(item => {
   *   if (item.isErrors) {
   *     console.log(`Failed to pin ${item.feedbackId}:`, item.errors);
   *   } else {
   *     console.log(`Pinned ${item.feedbackId} with pinId: ${item.pinId}`);
   *   }
   * });
   * ```
   */
  async pinFeedback(data: PinnedReviewsCreateRequest): Promise<PinnedReviewsCreateResponse> {
    return this.client.post<PinnedReviewsCreateResponse>(
      'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins',
      data,
      { rateLimitKey: 'communications.pinFeedback' }
    );
  }

  /**
   * Unpin reviews from product cards or merged groups
   *
   * Unpins reviews using their pin operation IDs (pinId).
   * Get pinId values from the getPinnedFeedbacks method.
   * Maximum 500 pin IDs can be unpinned in a single request.
   *
   * Rate limit: 3 requests per second with 333ms interval, burst of 6 requests.
   *
   * @param data - Array of pin IDs to unpin (max 500 items)
   * @returns Array of successfully unpinned pin IDs
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/user-communication#tag/Zakreplyonnye-otzyvy}
   * @example
   * ```typescript
   * // Get pinned reviews first to obtain pinIds
   * const pinned = await sdk.communications.getPinnedFeedbacks({ state: 'pinned' });
   * const pinIdsToUnpin = pinned.data.slice(0, 3).map(item => item.pinId);
   *
   * // Unpin the reviews
   * const result = await sdk.communications.unpinFeedback(pinIdsToUnpin);
   * console.log(`Successfully unpinned: ${result.data.join(', ')}`);
   * ```
   */
  async unpinFeedback(data: PinnedReviewsDeleteRequest): Promise<PinnedReviewsDeleteResponse> {
    return this.client.delete<PinnedReviewsDeleteResponse>(
      'https://feedbacks-api.wildberries.ru/api/feedbacks/v1/pins',
      data,
      { rateLimitKey: 'communications.unpinFeedback' }
    );
  }
}
