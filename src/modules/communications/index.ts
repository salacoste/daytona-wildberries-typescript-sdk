/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/09-communications.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import { warnOnce } from '../../utils/deprecation';
import { ValidationError } from '../../errors/validation-error';
import type {
  ChatsResponse,
  EventsResponse,
  MessageResponse,
  PinnedReviewsCountParams,
  PinnedReviewsCountResponse,
  PinnedReviewsCreateRequest,
  PinnedReviewsCreateResponse,
  PinnedReviewsDeleteRequest,
  PinnedReviewsDeleteResponse,
  PinnedReviewsLimitsResponse,
  PinnedReviewsListParams,
  PinnedReviewsListResponse,
  ResponseFeedback,
  SellerMessageRequest,
} from '../../types/communications.types';

/** Matches the new WB `replySign` format: `<version>:<UUID>:<hex-signature>` */
const NEW_FORMAT_REPLYSIGN_REGEX = /^\d+:[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}:[0-9a-f]+$/i;

/** Exported limits for external testability and documentation. @since 3.13.0 */
export const COMMUNICATIONS_LIMITS = {
  MAX_MESSAGE_LENGTH: 1000,
  MAX_TOTAL_FILE_SIZE: 30 * 1024 * 1024,
  MAX_PER_FILE_SIZE: 5 * 1024 * 1024,
  MAX_REPLYSIGN_LENGTH: 255,
} as const;

const { MAX_MESSAGE_LENGTH, MAX_TOTAL_FILE_SIZE, MAX_PER_FILE_SIZE, MAX_REPLYSIGN_LENGTH } =
  COMMUNICATIONS_LIMITS;

// MIME type inference for tuple-shape file attachments (H3 fix).
const MIME_BY_EXTENSION: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
};

function inferMimeFromFilename(filename: string): string {
  const lower = filename.toLowerCase();
  for (const [ext, mime] of Object.entries(MIME_BY_EXTENSION)) {
    if (lower.endsWith(ext)) return mime;
  }
  // Fall back: let WB reject server-side if extension is unrecognised.
  return 'application/octet-stream';
}

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
   * Список чатов
   *
   * Метод возвращает список всех чатов продавца. По этим данным можно получить [события чатов](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get) или [отправить сообщение покупателю](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>
   *
   * **v3.13.0 — replySign format change (deadline 2026-06-04)**: WB updated the `replySign` field
   * returned by this endpoint. If you cache `replySign` values, you must refresh them via this
   * method before calling `createSellerMessage()` after 2026-06-04 — old-format values will be
   * rejected by WB with HTTP 400. New format: `<version>:<UUID>:<crypto-signature>` (~135 chars).
   * See docs/guides/chat-replysign-format-migration.md.
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const chats = await sdk.communications.getSellerChats();
  console.log(chats.result);
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
   * **v3.13.0 — replySign format change (deadline 2026-06-04)**: when `Event.isNewChat` is `true`,
   * the event includes a `replySign` field in the new format (`<version>:<UUID>:<crypto-signature>`).
   * Old-format `replySign` values (e.g. cached from before 2026-06-04) will be rejected by WB after
   * the deadline. Prefer refreshing via `getSellerChats()` which always returns the latest values.
   * See docs/guides/chat-replysign-format-migration.md.
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
   * Отправить сообщение покупателю (multipart/form-data)
   *
   * Метод отправляет сообщение в [чат с покупателем](/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1chats/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>
   *
   * **v3.13.0 fix**: this method previously took zero parameters and always sent an empty body
   * (broken since introduction). It now requires a `data` parameter with `replySign`.
   *
   * **replySign deadline 2026-06-04**: WB rejects old-format `replySign` values with HTTP 400.
   * Always fetch a fresh `replySign` from `getSellerChats()` before sending. New-format pattern:
   * `<version>:<UUID>:<crypto-signature>` (~135 chars, e.g. `1:1e265a58-a120-b178-008c-60af2460207c:66f136...`).
   * If you pass a value that does not match this pattern the SDK emits a one-time `console.warn`
   * (see `warnOnce` — key `communications.createSellerMessage:legacy-replysign-format`).
   * See docs/guides/chat-replysign-format-migration.md.
   *
   * @param data - Request body: `replySign` (required), optional `message` and `file` attachments
   * @returns Успешно
   * @throws {ValidationError} When `replySign` is missing/empty/exceeds 255 chars, `message` > 1000 chars, or total file size > 30 MB
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @example
  // 1. Fetch chats to get a fresh replySign
  const chats = await sdk.communications.getSellerChats();
  const chat = chats.result?.[0];
  if (!chat?.replySign) throw new Error('No chat found');

  // 2. Send message (optionally with attachments)
  const result = await sdk.communications.createSellerMessage({
    replySign: chat.replySign,
    message: 'Thank you for your order!',
  });
  console.log(result);
   */
  async createSellerMessage(data: SellerMessageRequest): Promise<MessageResponse> {
    // H1: null-guard — JS callers may pass null/undefined; throw documented ValidationError.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- JS-caller guard
    if (data == null) {
      throw new ValidationError('data is required: pass { replySign, message?, file? }');
    }
    // M4: trim() so whitespace-only strings are rejected.
    /* eslint-disable @typescript-eslint/no-unnecessary-condition -- JS-caller guard */
    if (
      data.replySign == null ||
      typeof data.replySign !== 'string' ||
      data.replySign.trim().length === 0
    ) {
      /* eslint-enable @typescript-eslint/no-unnecessary-condition */
      throw new ValidationError('replySign is required (string, non-empty after trim)');
    }
    if (data.replySign.length > MAX_REPLYSIGN_LENGTH) {
      throw new ValidationError(`replySign exceeds maxLength ${String(MAX_REPLYSIGN_LENGTH)}`);
    }
    if (data.message && data.message.length > MAX_MESSAGE_LENGTH) {
      throw new ValidationError(`message exceeds maxLength ${String(MAX_MESSAGE_LENGTH)}`);
    }
    // H2: per-file 5 MB check before total; total check preserved.
    if (data.file) {
      let totalSize = 0;
      for (const f of data.file) {
        const sz = f instanceof Blob ? f.size : f.content.length;
        if (sz > MAX_PER_FILE_SIZE) {
          throw new ValidationError(
            `file size exceeds 5 MB (got ${String(sz)} bytes). WB limit: 5 MB per file.`
          );
        }
        totalSize += sz;
      }
      if (totalSize > MAX_TOTAL_FILE_SIZE) {
        throw new ValidationError(`total file size exceeds 30 MB (got ${String(totalSize)} bytes)`);
      }
    }

    // Heuristic: warn once when replySign looks like the old format (missing version:UUID: prefix).
    // Best-effort — does not block the request; WB API enforces hard rejection after 2026-06-04.
    if (!NEW_FORMAT_REPLYSIGN_REGEX.test(data.replySign)) {
      warnOnce(
        'communications.createSellerMessage:legacy-replysign-format',
        'communications.createSellerMessage: `replySign` does not match the expected ' +
          'new-format pattern (version:UUID:signature). WB API rejects old-format `replySign` ' +
          'after 2026-06-04. Refresh via `getSellerChats()` to get current-format values. ' +
          'See docs/guides/chat-replysign-format-migration.md.'
      );
    }

    // Build multipart body; SDK hands raw FormData to axios.
    const formData = new FormData();
    formData.append('replySign', data.replySign);
    if (data.message) formData.append('message', data.message);
    if (data.file) {
      // H3: infer MIME from filename extension so multipart part has correct Content-Type.
      for (const f of data.file) {
        if (f instanceof Blob) {
          formData.append('file', f);
        } else {
          const mime = inferMimeFromFilename(f.filename);
          formData.append('file', new Blob([f.content], { type: mime }), f.filename);
        }
      }
    }

    return this.client.post<MessageResponse>(
      'https://buyer-chat-api.wildberries.ru/api/v1/seller/message',
      formData,
      {
        rateLimitKey: 'communications.postSellerMessage',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- axios + FormData auto-sets
        // multipart/form-data boundary; overriding to undefined removes the default application/json
        headers: { 'Content-Type': undefined as unknown as string },
      }
    );
  }

  /**
   * Получить файл из сообщения
   *
   * Метод возвращает файл или изображение из сообщения по его ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 10 запросов | 1 секунда | 10 запросов | </div>
   *
   * @param id - ID файла, см. значение поля `downloadID` в методе [События чатов](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1events/get)
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
// Re-export all communications types from the subpath import 'daytona-wildberries-typescript-sdk/communications'.
// Without these, consumers can import the module class but cannot access type definitions.
// Caught by DX integration test for v3.6.0; generated as explicit list because `export type *`
// did not propagate through the build chain in v3.6.1.
// @since v3.6.1
export type {
  ReviewPinMethod,
  ReviewPinOn,
  ReviewState,
  UnpinnedCause,
  PinnedReviewErrorStatus,
  PinnedReviewError,
  RespondResultError,
  PinReviewItem,
  PinReviewItemResultData,
  PinnedReviewItemResult,
  PinnedReviewsCreateRequest,
  PinnedReviewsCreateResponse,
  PinnedReviewsDeleteRequest,
  PinnedReviewsDeleteResponse,
  PinnedReviewsListParams,
  PinnedReviewsListResponse,
  PinnedReviewsCountParams,
  PinnedReviewsCountResponse,
  SellerLimit,
  SellerLimitsData,
  PinnedReviewsLimitsResponse,
  StandardizedFQError,
  ResponsefeedbackErr,
  ResponseFeedback,
  LastMessage,
  Chat,
  ChatsResponse,
  Event,
  EventAttachments,
  EventType,
  File,
  GoodCard,
  Image,
  MessageResponse,
  Sender,
  EventsResponse,
  EventsResult,
  FeedbackListResponse,
  NewFeedbacksQuestionsResponse,
} from '../../types/communications.types';
