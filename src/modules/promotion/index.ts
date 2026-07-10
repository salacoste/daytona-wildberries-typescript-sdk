/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/08-promotion.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  BidsRecommendationsResponse,
  CampaignProductsUpdate,
  CreateCampaignRequest,
  GetAdvertsV2Response,
  GetBidsRecommendationsParams,
  GetCampaignCountResponse,
  GetMinusPhrasesRequest,
  GetMinusPhrasesResponse,
  GetSearchClusterStatsRequest,
  GetSearchClusterStatsResponse,
  GetSupplierSubjectsParams,
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  PlacementType,
  RequestWithCampaignID,
  RequestWithDate,
  RequestWithInterval,
  ResponseFullStats,
  ResponseWithReturn,
  SetMinusPhrasesRequest,
  SetRecommendationsRequest,
  SetRecommendationsResponse,
  Stat,
  StatDate,
  StatInterval,
  SupplierNmItem,
  SupplierSubject,
  UpdateBidsRequest,
  UpdateBidsResponse,
  UpdateCampaignProductsRequest,
  UpdateCampaignProductsResponse,
  V0GetNormQueryBidsRequest,
  V0GetNormQueryBidsResponse,
  V0GetNormQueryListRequest,
  V0GetNormQueryListResponse,
  V0GetNormQueryMinusRequest,
  V0GetNormQueryMinusResponse,
  V0GetNormQueryStatsRequest,
  V0GetNormQueryStatsResponse,
  V0SetMinusNormQueryRequest,
  V0SetNormQueryBidsRequest,
  V1GetNormQueryStatsRequest,
  V1GetNormQueryStatsResponse,
  V1SetNormQueryBidsRequest,
  V1SetNormQueryBidsResponse,
  V2GetConfigResponse,
} from '../../types/promotion.types';

export class PromotionModule {
  constructor(private client: BaseClient) {}

  /**
   * Удаление кампании
   *
   * Метод удаляет [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) в статусе `4` — готова к запуску.<br><br> После удаления кампания некоторое время будет находиться в статусе `-1` — кампания в процессе удаления. Полное удаление кампании занимает от 3 до 10 минут. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvDelete({});
  console.log(result);
   */
  async getAdvDelete(options?: { id: number }): Promise<void> {
    return this.client.get('https://advert-api.wildberries.ru/adv/v0/delete', {
      params: options,
      rateLimitKey: 'promotion.advDelete',
    });
  }

  /**
   * Переименование кампании
   *
   * Метод меняет название [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post). Это можно сделать в любой момент существования кампании. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createAdvRename({});
  console.log(result);
   */
  async createAdvRename(data?: { advertId: number; name: string }): Promise<void> {
    return this.client.post('https://advert-api.wildberries.ru/adv/v0/rename', data, {
      rateLimitKey: 'promotion.postAdvRename',
    });
  }

  /**
   * Завершение кампании
   *
   * Метод завершает [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) в статусах: - `4` — готово к запуску - `9` — активна - `11` — пауза <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvStop({});
  console.log(result);
   */
  async getAdvStop(options?: { id: number }): Promise<void> {
    return this.client.get('https://advert-api.wildberries.ru/adv/v0/stop', {
      params: options,
      rateLimitKey: 'promotion.advStop',
    });
  }

  /**
   * Изменение мест размещения в кампаниях с ручной ставкой
   *
   * Метод меняет места размещения в кампаниях с ручной ставкой. <br><br> Для кампаний в статусах `4`, `9` и `11`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 1 запрос | </div>
   *
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.updateAuctionPlacement({});
   */
  async updateAuctionPlacement(data: {
    placements: { advert_id: number; placements: { search: boolean; recommendations: boolean } }[];
  }): Promise<void> {
    return this.client.put('https://advert-api.wildberries.ru/adv/v0/auction/placements', data, {
      rateLimitKey: 'promotion.putAdvAuctionPlacements',
    });
  }

  /**
   * Баланс
   *
   * Метод возвращает информацию о: - счёте кабинета Продвижения WB. Его пополняет продавец. - балансе — максимальной сумме для оплаты камапнии по взаиморасчету: удержании средств из будущих продаж. Баланс пополнить нельзя, он рассчитывается автоматически на основе отчётов по продвижению. - бонусных начислениях WB. Информацию о бюджете кампаний можно получить в [отдельном методе](/openapi/promotion#tag/Finansy/paths/~1adv~1v1~1budget/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvBalance();
  console.log(result);
   */
  async getAdvBalance(): Promise<{
    balance?: number;
    net?: number;
    bonus?: number;
    currency?: string;
    cashbacks?: { sum?: number; percent?: number; expiration_date?: string }[];
  }> {
    return this.client.get<{
      balance?: number;
      net?: number;
      bonus?: number;
      currency?: string;
      cashbacks?: { sum?: number; percent?: number; expiration_date?: string }[];
    }>('https://advert-api.wildberries.ru/adv/v1/balance', {
      rateLimitKey: 'promotion.advBalance',
    });
  }

  /**
   * Бюджет кампании
   *
   * Метод возвращает информацию о бюджете [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) — максимальной сумме затрат на кампанию. Бюджет кампании можно [пополнить](/openapi/promotion#tag/Finansy/paths/~1adv~1v1~1budget~1deposit/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 4 запроса | 250 миллисекунд | 4 запроса | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvBudget({});
  console.log(result);
   */
  async getAdvBudget(options?: {
    id: number;
  }): Promise<{ cash?: number; netting?: number; total?: number; currency?: string }> {
    return this.client.get<{ cash?: number; netting?: number; total?: number; currency?: string }>(
      'https://advert-api.wildberries.ru/adv/v1/budget',
      { params: options, rateLimitKey: 'promotion.advBudget' }
    );
  }

  /**
   * Пополнение бюджета кампании
   *
   * Метод пополняет [бюджет](/openapi/promotion#tag/Finansy/paths/~1adv~1v1~1budget/get) кампании в статусе `11` — на паузе. <br> Чтобы запустить кампанию после пополнения бюджета, используйте метод [Запуск кампании](/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1start/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createBudgetDeposit({}, {});
  console.log(result);
   */
  async createBudgetDeposit(
    data: {
      sum?: number;
      cashback_sum?: number;
      cashback_percent?: number;
      type?: number;
      return?: boolean;
    },
    options?: { id: number }
  ): Promise<ResponseWithReturn> {
    return this.client.post<ResponseWithReturn>(
      'https://advert-api.wildberries.ru/adv/v1/budget/deposit',
      data,
      { params: options, rateLimitKey: 'promotion.postAdvBudgetDeposit' }
    );
  }

  /**
   * Получение истории затрат
   *
   * Метод формирует список фактических затрат на рекламные кампании за заданный период. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvUpd({});
  console.log(result);
   */
  async getAdvUpd(options?: { from: string; to: string }): Promise<
    {
      updNum?: number;
      updTime?: string;
      updSum?: number;
      advertId?: number;
      campName?: string;
      advertType?: number;
      paymentType?: string;
      advertStatus?: number;
    }[]
  > {
    return this.client.get<
      {
        updNum?: number;
        updTime?: string;
        updSum?: number;
        advertId?: number;
        campName?: string;
        advertType?: number;
        paymentType?: string;
        advertStatus?: number;
      }[]
    >('https://advert-api.wildberries.ru/adv/v1/upd', {
      params: options,
      rateLimitKey: 'promotion.advUpd',
    });
  }

  /**
   * Получение истории пополнений счёта
   *
   * Метод возвращает историю пополнений счёта **WB Продвижение** за заданный период. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvPayments({});
  console.log(result);
   */
  async getAdvPayments(options?: { from?: string; to?: string }): Promise<
    {
      id?: number;
      date?: string;
      sum?: number;
      type?: number;
      statusId?: number;
      cardStatus?: string;
      currency?: string;
    }[]
  > {
    return this.client.get<
      {
        id?: number;
        date?: string;
        sum?: number;
        type?: number;
        statusId?: number;
        cardStatus?: string;
        currency?: string;
      }[]
    >('https://advert-api.wildberries.ru/adv/v1/payments', {
      params: options,
      rateLimitKey: 'promotion.advPayments',
    });
  }

  /**
   * Изменение списка карточек товаров в кампаниях
   *
   * Метод добавляет и удаляет карточки товаров в кампаниях. <br><br> Для кампаний в статусах `4`, `9` и `11`. <br><br> Для добавляемых товаров устанавливается текущая минимальная ставка. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 1 запрос | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.updateAuctionNm({});
  console.log(result);
   */
  async updateAuctionNm(data: {
    nms: { advert_id: number; nms: { add?: unknown; delete?: number[] } }[];
  }): Promise<{ nms: { advert_id: number; nms: { added: number[]; deleted: number[] } }[] }> {
    return this.client.patch<{
      nms: { advert_id: number; nms: { added: number[]; deleted: number[] } }[];
    }>('https://advert-api.wildberries.ru/adv/v0/auction/nms', data, {
      rateLimitKey: 'promotion.patchAdvAuctionNms',
    });
  }

  /**
   * Количество медиакампаний
   *
   * Метод возвращает количество [медиакампаний](/openapi/promotion#tag/Media/paths/~1adv~1v1~1advert/get) продавца с группировкой по статусам. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 10 запросов | 100 миллисекунд | 10 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvCount();
  console.log(result);
   */
  async getAdvCount(): Promise<{
    all?: number;
    adverts?: { type?: number; status?: number; count?: number };
  }> {
    return this.client.get<{
      all?: number;
      adverts?: { type?: number; status?: number; count?: number };
    }>('https://advert-media-api.wildberries.ru/adv/v1/count', {
      rateLimitKey: 'promotion.advCount',
    });
  }

  /**
   * Список медиакампаний
   *
   * Метод возвращает список всех [медиакампаний](/openapi/promotion#tag/Media/paths/~1adv~1v1~1advert/get) продавца по их типам и статусам. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 10 запросов | 100 миллисекунд | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvAdverts({});
  console.log(result);
   */
  async getAdvAdverts(options?: {
    status?: number;
    type?: number;
    limit?: number;
    offset?: number;
    order?: string;
    direction?: string;
  }): Promise<
    {
      advertId?: number;
      name?: string;
      brand?: string;
      type?: number;
      status?: number;
      createTime?: string;
      endTime?: string;
    }[]
  > {
    return this.client.get<
      {
        advertId?: number;
        name?: string;
        brand?: string;
        type?: number;
        status?: number;
        createTime?: string;
        endTime?: string;
      }[]
    >('https://advert-media-api.wildberries.ru/adv/v1/adverts', {
      params: options,
      rateLimitKey: 'promotion.advAdverts',
    });
  }

  /**
   * Информация о медиакампании
   *
   * Метод возвращает информацию о кампании [WB Медиа](https://cmp.wildberries.ru/cmpf/list). Вместо карточек товаров в медиакампаниях продвигаются рекламные баннеры продавца на сайте и в приложении WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 10 запросов | 100 миллисекунд | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvAdvert({});
  console.log(result);
   */
  async getAdvAdvert(options?: { id: number }): Promise<{
    advertId?: number;
    name?: string;
    brand?: string;
    type?: number;
    status?: number;
    createTime?: string;
    extended?: {
      reason?: string;
      expenses?: number;
      from?: string;
      to?: string;
      updated_at?: string;
      price?: number;
      budget?: number;
      operation?: number;
      contract_id?: number;
    };
    items?: {
      id?: number;
      name?: string;
      status?: number;
      place?: number;
      budget?: number;
      daily_limit?: number;
      category_name?: string;
      cpm?: number;
      url?: string;
      advert_type?: number;
      created_at?: string;
      updated_at?: string;
      date_from?: string;
      date_to?: string;
      nms?: number[];
      bottomText1?: string;
      bottomText2?: string;
      message?: string;
      additionalSettings?: number;
      receiversCount?: number;
      subject_id?: number;
      subject_name?: string;
      action_name?: string;
      show_hours?: { From?: number; To?: number }[];
      Erid?: string;
    }[];
  }> {
    return this.client.get<{
      advertId?: number;
      name?: string;
      brand?: string;
      type?: number;
      status?: number;
      createTime?: string;
      extended?: {
        reason?: string;
        expenses?: number;
        from?: string;
        to?: string;
        updated_at?: string;
        price?: number;
        budget?: number;
        operation?: number;
        contract_id?: number;
      };
      items?: {
        id?: number;
        name?: string;
        status?: number;
        place?: number;
        budget?: number;
        daily_limit?: number;
        category_name?: string;
        cpm?: number;
        url?: string;
        advert_type?: number;
        created_at?: string;
        updated_at?: string;
        date_from?: string;
        date_to?: string;
        nms?: number[];
        bottomText1?: string;
        bottomText2?: string;
        message?: string;
        additionalSettings?: number;
        receiversCount?: number;
        subject_id?: number;
        subject_name?: string;
        action_name?: string;
        show_hours?: { From?: number; To?: number }[];
        Erid?: string;
      }[];
    }>('https://advert-media-api.wildberries.ru/adv/v1/advert', {
      params: options,
      rateLimitKey: 'promotion.advAdvert',
    });
  }

  /**
   * Статистика кампаний
   *
   * Метод формирует статистику для кампаний независимо от типа. <br><br> Максимальный период в запросе — 31 день. <br><br> Для кампаний в статусах `7`, `9` и `11`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 1 запрос | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvFullstats({});
  console.log(result);
   */
  async getAdvFullstats(options?: {
    ids: string;
    beginDate: string;
    endDate: string;
  }): Promise<ResponseFullStats> {
    return this.client.get<ResponseFullStats>(
      'https://advert-api.wildberries.ru/adv/v3/fullstats',
      { params: options, rateLimitKey: 'promotion.advFullstats' }
    );
  }

  /**
   * Статистика медиакампаний
   *
   * Метод формирует статистику кампаний сервиса [WB Медиа](https://cmp.wildberries.ru/cmpf/statistics). Статистику можно группировать по датам и/или интервалам. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 10 запросов | 100 миллисекунд | 10 запросов | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createAdvStat({});
  console.log(result);
   */
  async createAdvStat(
    data: RequestWithDate | RequestWithInterval | RequestWithCampaignID[]
  ): Promise<StatInterval | StatDate | Stat[]> {
    return this.client.post<StatInterval | StatDate | Stat[]>(
      'https://advert-media-api.wildberries.ru/adv/v1/stats',
      data,
      { rateLimitKey: 'promotion.postAdvStats' }
    );
  }

  /**
   * Список акций
   *
   * Метод возвращает список [акций](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1details/get) в WB с датами и временем проведения. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Календарь акций</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getCalendarPromotions({});
  console.log(result);
   */
  async getCalendarPromotions(options?: {
    startDateTime: string;
    endDateTime: string;
    allPromo: boolean;
    limit?: number;
    offset?: number;
  }): Promise<unknown> {
    return this.client.get<unknown>(
      'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions',
      { params: options, rateLimitKey: 'promotion.calendarPromotions' }
    );
  }

  /**
   * Детальная информация об акциях
   *
   * Метод возвращает подробную информацию об [акции](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1details/get) по ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Календарь акций</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getPromotionsDetails({});
  console.log(result);
   */
  async getPromotionsDetails(options?: { promotionIDs: string }): Promise<unknown> {
    return this.client.get<unknown>(
      'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/details',
      { params: options, rateLimitKey: 'promotion.calendarPromotionsDetails' }
    );
  }

  /**
   * Список товаров для участия в акции
   *
   * Метод формирует список товаров, подходящих для участия в [акции](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1details/get). Эти товары можно добавить в акцию с помощью [отдельного метода](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1upload/post). <div class="description_important"> Данный метод неприменим для автоакций. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Календарь акций</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getPromotionsNomenclatures({});
  console.log(result);
   */
  async getPromotionsNomenclatures(options?: {
    promotionID: number;
    inAction: boolean;
    limit?: number;
    offset?: number;
  }): Promise<unknown> {
    return this.client.get<unknown>(
      'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/nomenclatures',
      { params: options, rateLimitKey: 'promotion.calendarPromotionsNomenclatures' }
    );
  }

  /**
   * Добавить товар в акцию
   *
   * Метод создаёт задание на загрузку товара в [акцию](/openapi/promotion#tag/Kalendar-akcij/paths/~1api~1v1~1calendar~1promotions~1details/get).<br> Состояние загрузки можно проверить с помощью [отдельных методов](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get). <div class="description_important"> Данный метод неприменим для автоакций. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Календарь акций</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createPromotionsUpload();
  console.log(result);
   */
  async createPromotionsUpload(): Promise<unknown> {
    return this.client.post<unknown>(
      'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/upload',
      undefined,
      { rateLimitKey: 'promotion.postCalendarPromotionsUpload' }
    );
  }

  // ============================================================================
  // Search Clusters (NormQuery) Methods - NEW in Feb 2026
  // ============================================================================

  /**
   * Статистика поисковых кластеров
   *
   * Метод возвращает статистику по поисковым кластерам за указанный период.
   * Можно использовать только для кампаний с моделью оплаты `cpm` — за показы.
   *
   * Rate limit: 10 requests per minute, 6 second interval, burst 20
   *
   * @param data - Request body with date range and campaign/product items
   * @returns Statistics for search clusters
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Statistika/paths/~1adv~1v0~1normquery~1stats/post}
   * @example
   * ```typescript
   * const stats = await sdk.promotion.getNormqueryStats({
   *   from: '2025-10-07',
   *   to: '2025-10-08',
   *   items: [{ advert_id: 1825035, nm_id: 983512347 }]
   * });
   * console.log(stats.stats);
   * ```
   *
   * @remarks Prefer the V1 successor {@link PromotionModule.getNormqueryStatsV1}
   * (`/adv/v1/normquery/stats`), which returns daily-detailed statistics and supports
   * both `cpm` and `cpc` campaigns.
   */
  async getNormqueryStats(data: V0GetNormQueryStatsRequest): Promise<V0GetNormQueryStatsResponse> {
    return this.client.post<V0GetNormQueryStatsResponse>(
      'https://advert-api.wildberries.ru/adv/v0/normquery/stats',
      data,
      { rateLimitKey: 'promotion.normqueryStats' }
    );
  }

  /**
   * Active and Inactive Search Cluster Lists
   *
   * Метод возвращает списки активных и неактивных поисковых кластеров
   * с количеством просмотров от 100 по ID кампаний и артикулам WB.
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 10
   *
   * @param data - Request body with campaign/product items (max 100)
   * @returns Lists of active and inactive search clusters per campaign/product
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Search-Clusters/paths/~1adv~1v0~1normquery~1list/post}
   * @example
   * ```typescript
   * const result = await sdk.promotion.getNormqueryList({
   *   items: [{ advertId: 123456789, nmId: 987654321 }]
   * });
   * console.log(result.items?.[0]?.normQueries?.active);
   * ```
   */
  async getNormqueryList(data: V0GetNormQueryListRequest): Promise<V0GetNormQueryListResponse> {
    return this.client.post<V0GetNormQueryListResponse>(
      'https://advert-api.wildberries.ru/adv/v0/normquery/list',
      data,
      { rateLimitKey: 'promotion.getNormqueryList' }
    );
  }

  /**
   * Daily Search Clusters Statistics (v1)
   *
   * Метод возвращает статистику (просмотры, клики, добавления в корзину, заказы,
   * CTR, CPC, CPM и т.д.) по поисковым кластерам за указанный период с детализацией
   * по дням. Применимо для кампаний с моделью оплаты `cpm` — за показы, и `cpc` —
   * за клики.
   *
   * V1-преемник метода {@link PromotionModule.getNormqueryStats} (`/adv/v0/normquery/stats`).
   *
   * Rate limit: 10 requests per minute, 6 second interval, burst 20
   *
   * @param data - Request body with date range and campaign/product items (max 100)
   * @returns Daily-detailed statistics for search clusters
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Statistics/paths/~1adv~1v1~1normquery~1stats/post}
   * @example
   * ```typescript
   * const stats = await sdk.promotion.getNormqueryStatsV1({
   *   from: '2026-01-01',
   *   to: '2026-01-30',
   *   items: [{ advertId: 123456789, nmId: 987654321 }]
   * });
   * console.log(stats.items[0]?.dailyStats);
   * ```
   */
  async getNormqueryStatsV1(
    data: V1GetNormQueryStatsRequest
  ): Promise<V1GetNormQueryStatsResponse> {
    return this.client.post<V1GetNormQueryStatsResponse>(
      'https://advert-api.wildberries.ru/adv/v1/normquery/stats',
      data,
      { rateLimitKey: 'promotion.getNormqueryStatsV1' }
    );
  }

  /**
   * Список ставок поисковых кластеров
   *
   * Метод возвращает список поисковых кластеров со ставками по ID кампаний и артикулам WB.
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 10
   *
   * @param data - Request body with campaign/product items
   * @returns List of search cluster bids
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-bids/post}
   * @example
   * ```typescript
   * const bids = await sdk.promotion.getNormqueryBids({
   *   items: [{ advert_id: 1825035, nm_id: 983512347 }]
   * });
   * console.log(bids.bids);
   * ```
   */
  async getNormqueryBids(data: V0GetNormQueryBidsRequest): Promise<V0GetNormQueryBidsResponse> {
    return this.client.post<V0GetNormQueryBidsResponse>(
      'https://advert-api.wildberries.ru/adv/v0/normquery/get-bids',
      data,
      { rateLimitKey: 'promotion.normqueryGetBids' }
    );
  }

  /**
   * Установить ставки для поисковых кластеров
   *
   * Метод устанавливает ставки на поисковые кластеры.
   * Можно использовать только для кампаний с ручной ставкой и моделью оплаты `cpm` — за показы.
   *
   * **Единицы**: `bid` указывается в **целых рублях (₽)**, а НЕ в копейках — это
   *   ставка CPM (цена за 1000 показов) для конкретного поискового кластера
   *   (`norm_query`). В отличие от {@link PromotionModule.updateBids}, где
   *   `bid_kopecks` — в копейках и применяется к кампании/артикулу, а не к кластеру.
   *   Не путайте единицы — частый footgun.
   *
   * **Модель**: это устаревшая поверхность биддинга normquery/catalog (`/adv/v0/...`).
   *   Для нового кода предпочитайте {@link PromotionModule.updateBids} (V1, копейки);
   *   этот метод — только если нужен CPM-контроль per search-cluster в ручной
   *   `cpm`-кампании.
   *
   * Rate limit: 2 requests per second, 500ms interval, burst 4
   *
   * @param data - Request body with bids to set
   * @returns void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1bids/post}
   * @example
   * ```typescript
   * await sdk.promotion.setNormqueryBids({
   *   bids: [{
   *     advert_id: 1825035,
   *     nm_id: 983512347,
   *     norm_query: 'Фраза 1',
   *     bid: 1000
   *   }]
   * });
   * ```
   */
  async setNormqueryBids(data: V0SetNormQueryBidsRequest): Promise<void> {
    await this.client.post('https://advert-api.wildberries.ru/adv/v0/normquery/bids', data, {
      rateLimitKey: 'promotion.normquerySetBids',
    });
  }

  /**
   * Удалить ставки поисковых кластеров
   *
   * Метод удаляет ставки с поисковых кластеров.
   * Можно использовать только для кампаний с ручной ставкой и моделью оплаты `cpm` — за показы.
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 10
   *
   * @param data - Request body with bids to delete
   * @returns void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1bids/delete}
   * @example
   * ```typescript
   * await sdk.promotion.deleteNormqueryBids({
   *   bids: [{
   *     advert_id: 1825035,
   *     nm_id: 983512347,
   *     norm_query: 'Фраза 1',
   *     bid: 1000
   *   }]
   * });
   * ```
   */
  async deleteNormqueryBids(data: V0SetNormQueryBidsRequest): Promise<void> {
    await this.client.delete('https://advert-api.wildberries.ru/adv/v0/normquery/bids', data, {
      rateLimitKey: 'promotion.normqueryDeleteBids',
    });
  }

  /**
   * Конфигурация кабинета продвижения (V1)
   *
   * Возвращает валюту, код валюты [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances)
   * и допустимые шаги ставок (`cpmStep`, `cpcStep`) для метода
   * {@link PromotionModule.postV1NormqueryBids}.
   *
   * Rate limit: 1 request per minute, 1 min interval, burst 10
   *
   * @returns Account currency, currency code and allowed bid steps (CPM and CPC)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since task-170
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Kampanii/operation/getV1Config}
   * @example
   * ```typescript
   * const config = await sdk.promotion.getV1Config();
   * console.log(config.currency, config.currencyCode, config.cpmStep, config.cpcStep);
   * ```
   */
  async getV1Config(): Promise<V2GetConfigResponse> {
    return this.client.get<V2GetConfigResponse>(
      'https://advert-api.wildberries.ru/api/advert/v1/config',
      {
        rateLimitKey: 'promotion.v1Config',
      }
    );
  }

  /**
   * Установить ставки для поисковых кластеров в валюте кабинета (V1)
   *
   * Устанавливает ставки для поисковых кластеров в валюте [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances).
   * Доступно только для кампаний с ручной ставкой и моделью оплаты `cpm` — за показы.
   * Допустимый шаг ставки возвращается методом {@link PromotionModule.getV1Config}.
   *
   * Отличается от {@link PromotionModule.setNormqueryBids} (v0, `/adv/v0/normquery/bids`):
   * v1 принимает ставку в `bidMinorUnits` и работает в валюте кабинета продавца.
   *
   * Rate limit: 2 requests per second, 500ms interval, burst 4
   *
   * @param data - Request body with bids in minor currency units (max 100 items)
   * @returns Result with successfully applied bids and failed bids (with reasons)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since task-170
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/operation/postV1NormqueryBids}
   * @example
   * ```typescript
   * const result = await sdk.promotion.postV1NormqueryBids({
   *   bids: [{
   *     advertId: 1825035,
   *     nmId: 983512347,
   *     normQuery: 'Фраза 1',
   *     bidMinorUnits: 1000
   *   }]
   * });
   * console.log(result.success, result.failed);
   * ```
   */
  async postV1NormqueryBids(data: V1SetNormQueryBidsRequest): Promise<V1SetNormQueryBidsResponse> {
    return this.client.post<V1SetNormQueryBidsResponse>(
      'https://advert-api.wildberries.ru/api/advert/v1/normquery/bids',
      data,
      { rateLimitKey: 'promotion.v1NormqueryBids' }
    );
  }

  /**
   * Список минус-фраз кампаний
   *
   * Метод возвращает список минус-фраз по ID кампаний и артикулам WB.
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 10
   *
   * @param data - Request body with campaign/product items
   * @returns List of minus-phrases
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-minus/post}
   * @example
   * ```typescript
   * const minusPhrases = await sdk.promotion.getNormqueryMinus({
   *   items: [{ advert_id: 1825035, nm_id: 983512347 }]
   * });
   * console.log(minusPhrases.items);
   * ```
   */
  async getNormqueryMinus(data: V0GetNormQueryMinusRequest): Promise<V0GetNormQueryMinusResponse> {
    return this.client.post<V0GetNormQueryMinusResponse>(
      'https://advert-api.wildberries.ru/adv/v0/normquery/get-minus',
      data,
      { rateLimitKey: 'promotion.normqueryGetMinus' }
    );
  }

  /**
   * Установка и удаление минус-фраз
   *
   * Метод устанавливает и удаляет минус-фразы в кампаниях с ручной ставкой и моделью оплаты `cpm` — за показы.
   * Отправка пустого массива удаляет все минус-фразы.
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 10
   *
   * @param data - Request body with minus-phrases to set
   * @returns void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1set-minus/post}
   * @example
   * ```typescript
   * await sdk.promotion.setNormqueryMinus({
   *   advert_id: 1825035,
   *   nm_id: 983512347,
   *   norm_queries: ['Фраза 1', 'Фраза 2']
   * });
   * ```
   */
  async setNormqueryMinus(data: V0SetMinusNormQueryRequest): Promise<void> {
    await this.client.post('https://advert-api.wildberries.ru/adv/v0/normquery/set-minus', data, {
      rateLimitKey: 'promotion.normquerySetMinus',
    });
  }

  // ============================================================================
  // V2 Replacement Methods - NEW in Feb 2026
  // ============================================================================

  /**
   * Информация о кампаниях (V2)
   *
   * Метод возвращает информацию о рекламных кампаниях с единой или ручной ставкой
   * по их статусам, типам оплаты и ID. Replaces deprecated v1 endpoints.
   *
   * Данные синхронизируются с базой раз в 3 минуты. Статусы кампаний меняются раз в минуту.
   * Ставки кампаний меняются раз в 30 секунд.
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 5
   *
   * @param options - Query parameters for filtering campaigns
   * @param options.ids - Campaign IDs, comma-separated (max 50)
   * @param options.statuses - Campaign statuses: -1 (deleted), 4 (ready), 7 (finished), 8 (cancelled), 9 (active), 11 (paused)
   * @param options.payment_type - Payment type: cpm (per impressions) or cpc (per click)
   * @returns List of campaigns with bid_type (unified/manual) and bids in kopecks
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.4.0 — Return type changed from GetAdverts to GetAdvertsV2Response
   * @see {@link https://dev.wildberries.ru/docs/openapi/promotion#tag/Kampanii/paths/~1api~1advert~1v2~1adverts/get}
   * @example
   * ```typescript
   * const campaigns = await sdk.promotion.getAdvertsV2({
   *   ids: '12345,23456',
   *   statuses: '9,11',
   *   payment_type: 'cpm',
   * });
   * for (const advert of campaigns.adverts) {
   *   console.log(advert.id, advert.bid_type, advert.status);
   *   for (const nm of advert.nm_settings) {
   *     console.log(`  nmId=${nm.nm_id} search=${nm.bids_kopecks.search} reco=${nm.bids_kopecks.recommendations}`);
   *   }
   * }
   * ```
   */
  async getAdvertsV2(options?: {
    ids?: string;
    statuses?: string;
    payment_type?: 'cpm' | 'cpc';
  }): Promise<GetAdvertsV2Response> {
    return this.client.get<GetAdvertsV2Response>(
      'https://advert-api.wildberries.ru/api/advert/v2/adverts',
      {
        params: options,
        rateLimitKey: 'promotion.advertsV2',
      }
    );
  }

  /**
   * Минимальные ставки для карточек товаров (V1 API)
   *
   * Метод возвращает минимальные ставки для карточек товаров в копейках
   * по типу оплаты и местам размещения. Replaces deprecated v0 endpoint.
   *
   * Rate limit: 20 requests per minute, 3 second interval, burst 5
   *
   * @param data - Request body with campaign ID, product IDs, payment type, and placement types
   * @returns Minimum bids for products by placement type (in kopecks)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij/paths/~1api~1advert~1v1~1bids~1min/post}
   * @example
   * ```typescript
   * const minBids = await sdk.promotion.getBidsMinV2({
   *   advert_id: 98765432,
   *   nm_ids: [12345678, 87654321],
   *   payment_type: 'cpm',
   *   placement_types: ['combined', 'search', 'recommendation']
   * });
   * console.log(minBids.bids);
   * ```
   */
  async getBidsMinV2(data: {
    advert_id: number;
    nm_ids: number[];
    payment_type: 'cpm' | 'cpc';
    placement_types: ('combined' | 'search' | 'recommendation')[];
  }): Promise<{
    bids: {
      nm_id: number;
      bids: { type: PlacementType; value: number; currency?: string }[];
    }[];
  }> {
    return this.client.post<{
      bids: {
        nm_id: number;
        bids: { type: PlacementType; value: number; currency?: string }[];
      }[];
    }>('https://advert-api.wildberries.ru/api/advert/v1/bids/min', data, {
      rateLimitKey: 'promotion.bidsMinV1',
    });
  }

  /**
   * Рекомендуемые ставки для карточек товаров и поисковых кластеров
   *
   * Метод возвращает рекомендуемые ставки для карточек товаров и поисковых кластеров кампании.
   * Только для кампаний с типом оплаты cpm (за показы).
   *
   * Данные синхронизируются с базой раз в 3 минуты.
   * Для приостановленных кампаний `normQueries` может быть пустым массивом.
   *
   * **Кэширование**: данные обновляются на стороне WB раз в ~3 минуты, поэтому
   *   кэшируйте ответ на стороне клиента с TTL ~180 с. Это удержит вас в рамках
   *   лимита 5 запросов/мин (и спасёт от 429) — более частые вызовы всё равно
   *   вернут устаревшие данные.
   *
   * Rate limit: 5 requests per minute, 12-second interval, burst 5
   *
   * @param params - Campaign ID and WB article ID
   * @param params.advertId - Campaign ID
   * @param params.nmId - WB article ID (must belong to the campaign)
   * @returns Recommended bids: base (card-level) and normQueries (per search cluster)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When nmId does not belong to campaign or params invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.4.0
   * @see {@link https://dev.wildberries.ru/docs/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1api~1advert~1v0~1bids~1recommendations/get}
   * @example
   * ```typescript
   * const reco = await sdk.promotion.getBidsRecommendations({
   *   advertId: 29081652,
   *   nmId: 148190095,
   * });
   * for (const nq of reco.normQueries) {
   *   console.log(`${nq.normQuery}: min=${nq.reachMin.bidKopecks} med=${nq.reachMedium.bidKopecks} max=${nq.reachMax.bidKopecks}`);
   * }
   * ```
   */
  async getBidsRecommendations(
    params: GetBidsRecommendationsParams
  ): Promise<BidsRecommendationsResponse> {
    return this.client.get<BidsRecommendationsResponse>(
      'https://advert-api.wildberries.ru/api/advert/v0/bids/recommendations',
      {
        params: { advertId: params.advertId, nmId: params.nmId },
        rateLimitKey: 'promotion.getBidsRecommendations',
      }
    );
  }

  // ============================================================================
  // Campaign Management Methods - NEW
  // ============================================================================

  /**
   * Получение списков кампаний
   *
   * Возвращает списки всех рекламных кампаний продавца с их ID.
   * Кампании сгруппированы по типу и статусу, у каждой указана дата последнего изменения.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 сек | 5 запросов | 200 мс | 5 запросов |
   *
   * @readonly
   * @returns Списки кампаний по типам и статусам
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Kampanii}
   * @example
   * ```typescript
   * const campaigns = await sdk.promotion.getCampaignCount();
   * console.log(`Total campaigns: ${campaigns.all}`);
   * for (const group of campaigns.adverts || []) {
   *   console.log(`Type ${group.type}, Status ${group.status}: ${group.count} campaigns`);
   * }
   * ```
   */
  async getCampaignCount(): Promise<GetCampaignCountResponse> {
    return this.client.get<GetCampaignCountResponse>(
      'https://advert-api.wildberries.ru/adv/v1/promotion/count',
      { rateLimitKey: 'promotion.getCampaignCount' }
    );
  }

  /**
   * Создание кампании
   *
   * Метод создаёт рекламную кампанию с единой или ручной ставкой.
   * Возвращает ID созданной кампании.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 5 запросов | 12 сек | 5 запросов |
   *
   * @param data - Данные для создания кампании
   * @returns ID созданной кампании
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij}
   * @example
   * ```typescript
   * const campaignId = await sdk.promotion.createCampaign({
   *   name: 'My Campaign',
   *   nms: [12345678, 87654321],
   *   bid_type: 'manual',
   *   payment_type: 'cpm',
   *   placement_types: ['search', 'recommendation']
   * });
   * console.log(`Created campaign with ID: ${campaignId}`);
   * ```
   */
  async createCampaign(data: CreateCampaignRequest): Promise<number> {
    return this.client.post<number>(
      'https://advert-api.wildberries.ru/adv/v2/seacat/save-ad',
      data,
      { rateLimitKey: 'promotion.createCampaign' }
    );
  }

  /**
   * Список предметов продавца
   *
   * Метод возвращает список предметов, для которых можно создать кампанию.
   * Возвращает null, если нет товаров для создания кампаний.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 5 запросов | 12 сек | 5 запросов |
   *
   * @param params - Параметры фильтрации
   * @returns Список предметов или null
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij}
   * @example
   * ```typescript
   * const subjects = await sdk.promotion.getSupplierSubjects({ payment_type: 'cpm' });
   * if (subjects) {
   *   for (const subject of subjects) {
   *     console.log(`${subject.name}: ${subject.count} products`);
   *   }
   * }
   * ```
   */
  async getSupplierSubjects(params?: GetSupplierSubjectsParams): Promise<SupplierSubject[] | null> {
    return this.client.get<SupplierSubject[] | null>(
      'https://advert-api.wildberries.ru/adv/v1/supplier/subjects',
      { params: params ? { ...params } : undefined, rateLimitKey: 'promotion.getSupplierSubjects' }
    );
  }

  /**
   * Список карточек товаров продавца
   *
   * Метод возвращает список карточек товаров по указанным предметам.
   * Используется для получения артикулов WB для добавления в кампанию.
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 мин | 5 запросов | 12 сек | 5 запросов |
   *
   * @param subjectIds - Массив ID предметов
   * @returns Список карточек товаров
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Sozdanie-kampanij}
   * @example
   * ```typescript
   * const products = await sdk.promotion.getSupplierNms([123, 456]);
   * for (const product of products) {
   *   console.log(`${product.title} (nmId: ${product.nm})`);
   * }
   * ```
   */
  async getSupplierNms(subjectIds: number[]): Promise<SupplierNmItem[]> {
    return this.client.post<SupplierNmItem[]>(
      'https://advert-api.wildberries.ru/adv/v2/supplier/nms',
      subjectIds,
      { rateLimitKey: 'promotion.getSupplierNms' }
    );
  }

  /**
   * Запуск кампании
   *
   * Метод запускает кампании в статусах:
   * - `4` — готова к запуску
   * - `11` — на паузе
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 сек | 5 запросов | 200 мс | 5 запросов |
   *
   * @param id - ID кампании
   * @returns void
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When campaign is in wrong status (400)
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami}
   * @example
   * ```typescript
   * await sdk.promotion.startCampaign(12345);
   * console.log('Campaign started successfully');
   * ```
   */
  async startCampaign(id: number): Promise<void> {
    return this.client.get('https://advert-api.wildberries.ru/adv/v0/start', {
      params: { id },
      rateLimitKey: 'promotion.startCampaign',
    });
  }

  /**
   * Пауза кампании
   *
   * Метод ставит кампании на паузу. Работает только для кампаний в статусе:
   * - `9` — активна
   *
   * Rate limit:
   * | Период | Лимит | Интервал | Всплеск |
   * | --- | --- | --- | --- |
   * | 1 сек | 5 запросов | 200 мс | 5 запросов |
   *
   * @param id - ID кампании
   * @returns void
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When campaign is in wrong status (400)
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami}
   * @example
   * ```typescript
   * await sdk.promotion.pauseCampaign(12345);
   * console.log('Campaign paused successfully');
   * ```
   */
  async pauseCampaign(id: number): Promise<void> {
    return this.client.get('https://advert-api.wildberries.ru/adv/v0/pause', {
      params: { id },
      rateLimitKey: 'promotion.pauseCampaign',
    });
  }

  // ============================================================================
  // Minus Phrases Methods (task-54) - New naming convention
  // ============================================================================

  /**
   * Получить минус-фразы для кампаний
   *
   * Возвращает список минус-фраз по ID кампаний и артикулам WB.
   *
   * **nm_id по типу кампании:**
   * - Type 8 (устаревший): nm_id=0 для всей кампании
   * - Type 9 (актуальный): nm_id = реальный артикул WB
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 10
   *
   * @param request - Запрос с массивом items (max 100)
   * @returns Promise<GetMinusPhrasesResponse>
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1get-minus/post}
   * @example
   * ```typescript
   * const result = await sdk.promotion.getMinusPhrases({
   *   items: [{ advert_id: 123456, nm_id: 789012 }]
   * });
   * console.log(result.items[0].norm_queries); // ['фраза1', 'фраза2']
   * ```
   */
  async getMinusPhrases(request: GetMinusPhrasesRequest): Promise<GetMinusPhrasesResponse> {
    return this.client.post<GetMinusPhrasesResponse>(
      'https://advert-api.wildberries.ru/adv/v0/normquery/get-minus',
      request,
      { rateLimitKey: 'promotion.getMinusPhrases' }
    );
  }

  /**
   * Установить минус-фразы для кампании
   *
   * Устанавливает минус-фразы в кампаниях с ручной ставкой и CPM.
   *
   * **ВАЖНО:** Отправка пустого массива norm_queries УДАЛЯЕТ ВСЕ минус-фразы!
   *
   * **nm_id по типу кампании:**
   * - Type 8: nm_id=0 для настроек всей кампании
   * - Type 9: nm_id = реальный артикул WB
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 10
   *
   * @param request - Запрос (max 1000 norm_queries)
   * @returns Promise<void>
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Poiskovye-klastery/paths/~1adv~1v0~1normquery~1set-minus/post}
   * @example
   * ```typescript
   * // Установить минус-фразы
   * await sdk.promotion.setMinusPhrases({
   *   advert_id: 123456,
   *   nm_id: 789012,
   *   norm_queries: ['нежелательная фраза', 'другая фраза']
   * });
   *
   * // Удалить ВСЕ минус-фразы
   * await sdk.promotion.setMinusPhrases({
   *   advert_id: 123456,
   *   nm_id: 789012,
   *   norm_queries: []  // УДАЛЯЕТ ВСЕ!
   * });
   * ```
   */
  async setMinusPhrases(request: SetMinusPhrasesRequest): Promise<void> {
    await this.client.post(
      'https://advert-api.wildberries.ru/adv/v0/normquery/set-minus',
      request,
      { rateLimitKey: 'promotion.setMinusPhrases' }
    );
  }

  // ============================================================================
  // Search Cluster Statistics (task-55) - New naming convention
  // ============================================================================

  /**
   * Получить статистику поисковых кластеров
   *
   * Возвращает статистику по поисковым кластерам за период.
   *
   * Поддерживает кампании cpm и cpc. Для cpc-кампаний поля `views`, `ctr`, `cpm` отсутствуют в ответе.
   *
   * **nm_id по типу кампании:**
   * - Type 8: nm_id=0 для агрегированной статистики
   * - Type 9: nm_id = реальный артикул WB
   *
   * Rate limit: 10 requests per minute, 6 second interval, burst 20
   *
   * @param request - Запрос с периодом и items (max 100)
   * @returns Promise<GetSearchClusterStatsResponse>
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Statistika/paths/~1adv~1v0~1normquery~1stats/post}
   * @example
   * ```typescript
   * const stats = await sdk.promotion.getSearchClusterStats({
   *   from: '2026-02-01',
   *   to: '2026-02-09',
   *   items: [{ advert_id: 123456, nm_id: 789012 }]
   * });
   * // stats.stats[0].stats[0].norm_query = "фраза"
   * // stats.stats[0].stats[0].views = 1949
   * ```
   */
  async getSearchClusterStats(
    request: GetSearchClusterStatsRequest
  ): Promise<GetSearchClusterStatsResponse> {
    return this.client.post<GetSearchClusterStatsResponse>(
      'https://advert-api.wildberries.ru/adv/v0/normquery/stats',
      request,
      { rateLimitKey: 'promotion.getSearchClusterStats' }
    );
  }

  // ============================================================================
  // V1 API Methods with kopecks (bid_kopecks)
  // ============================================================================

  /**
   * Изменение ставок в кампаниях (V1 API с копейками)
   *
   * Меняет ставки карточек товаров по артикулам WB в кампаниях с единой или ручной ставкой.
   * Для кампаний в статусах 4, 9 и 11.
   *
   * **ВАЖНО**: Ставки указываются в КОПЕЙКАХ (bid_kopecks), не в рублях!
   *
   * **Семантика placement** (поле `placement` каждой ставки):
   * - `combined` — поиск и рекомендации вместе (кампании с **единой** ставкой,
   *   `bid_type: unified` / Type 8)
   * - `search` / `recommendations` — одно место размещения (кампании с **ручной**
   *   ставкой, `bid_type: manual` / Type 9)
   *
   * **Идемпотентность**: повторная установка той же ставки не списывает средства
   *   дважды, но каждый вызов всё равно расходует слот rate-limit (300/мин,
   *   интервал 200 мс) — избегайте no-op обновлений.
   *
   * **Ошибки диапазона**: выход ставки за пределы допустимого диапазона возвращает
   *   HTTP 400 с телом `wrong bid value: <received>; min: <floor>` — BaseClient
   *   парсит его в {@link BidOutOfRangeError} (поля `received` / `min` / `max?`),
   *   поэтому канонический минимальный bid доступен сразу, без отдельного запроса
   *   {@link PromotionModule.getBidsRecommendations} (5/мин).
   *
   * Rate limit: 5 requests per second, 200ms interval, burst 5
   *
   * @param data - Request body with bids in kopecks
   * @returns Updated bids
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1api~1advert~1v1~1bids/patch}
   * @example
   * ```typescript
   * const result = await sdk.promotion.updateBids({
   *   bids: [{
   *     advert_id: 12345,
   *     nm_bids: [{
   *       nm_id: 13335157,
   *       bid_kopecks: 250, // = 2.50 RUB
   *       placement: 'recommendations'
   *     }]
   *   }]
   * });
   * ```
   */
  async updateBids(data: UpdateBidsRequest): Promise<UpdateBidsResponse> {
    return this.client.patch<UpdateBidsResponse>(
      'https://advert-api.wildberries.ru/api/advert/v1/bids',
      data,
      { rateLimitKey: 'promotion.updateBids' }
    );
  }

  /**
   * Управление товарами в кампаниях
   *
   * Добавляет и удаляет карточки товаров в кампаниях типа 9.
   * Для кампаний в статусах 4, 9 и 11.
   * Для добавляемых товаров устанавливается текущая минимальная ставка.
   *
   * Rate limit: 1 request per second, 1000ms interval, burst 1
   *
   * @param data - Request body with campaigns and products to add/delete
   * @returns Results of product updates
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1auction~1nms/patch}
   * @example
   * ```typescript
   * const result = await sdk.promotion.updateCampaignProducts({
   *   campaigns: [{
   *     advert_id: 12345,
   *     add_nms: [111, 222],
   *     delete_nms: [333]
   *   }]
   * });
   * ```
   */
  async updateCampaignProducts(
    data: UpdateCampaignProductsRequest
  ): Promise<UpdateCampaignProductsResponse> {
    return this.client.patch<UpdateCampaignProductsResponse>(
      'https://advert-api.wildberries.ru/adv/v0/auction/nms',
      {
        nms: data.campaigns.map((c: CampaignProductsUpdate) => ({
          advert_id: c.advert_id,
          nms: { add: c.add_nms, delete: c.delete_nms },
        })),
      },
      { rateLimitKey: 'promotion.updateCampaignProducts' }
    );
  }

  /**
   * Get Seller Recommendations list (item recommendations in product cards)
   *
   * Returns the current seller-recommendation assignments for product cards
   * (the "Seller Recommendations" block shown in product listings).
   *
   * Lives on the **content-api** domain (Content-category methods), although
   * documented under the promotion tag. Auth: Personal or Service token
   * (Content category). Gating: Jam subscription (Advanced/Premium) OR the
   * "Seller Recommendations in listings" Tariff-Builder option.
   *
   * Rate limit: 100 requests per minute
   *
   * @param data - Optional filter (WB item numbers). The exact filter shape is
   *   INFERRED — verify against the live spec (task-156 AC#9).
   * @returns Recommendation entries per item in `data`; per-item `errors` on partial success (HTTP 200)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.promotion.getRecommendationsList({ nmIDs: [12345678] });
   * for (const entry of result.data ?? []) {
   *   console.log(`${entry.nmID}: ${entry.tagsIDs.join(', ')}`);
   * }
   * ```
   */
  async getRecommendationsList(
    data: ListRecommendationsRequest
  ): Promise<ListRecommendationsResponse> {
    return this.client.post<ListRecommendationsResponse>(
      'https://content-api.wildberries.ru/api/content/v1/recommendations/list',
      data,
      { rateLimitKey: 'promotion.getRecommendationsList' }
    );
  }

  /**
   * Set Seller Recommendations (item recommendations in product cards)
   *
   * Sets, updates, or removes seller recommendations for product cards.
   * Send an empty `tagsIDs` array to clear a product's recommendations.
   *
   * PARTIAL SUCCESS: WB returns HTTP **200** even when some items fail — the
   * per-item failures are listed in the `errors` array of the response body
   * (each `{ nmID, error }`). Always inspect `result.errors` instead of relying
   * on the status code.
   *
   * Lives on the **content-api** domain. Auth: Personal or Service token
   * (Content category). Gating: Jam subscription (Advanced/Premium) OR the
   * "Seller Recommendations in listings" Tariff-Builder option.
   *
   * Rate limit: 100 requests per minute
   *
   * @param data - Per-product recommendation assignments
   * @returns Response envelope; `data` is `null`. Check `errors` for partial failures.
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.promotion.setRecommendations([
   *   { nmID: 12345678, tagsIDs: [11111111, 22222222] },
   * ]);
   * if (result.errors.length) {
   *   console.warn('Partial failure:', result.errors);
   * }
   * ```
   */
  async setRecommendations(data: SetRecommendationsRequest): Promise<SetRecommendationsResponse> {
    return this.client.post<SetRecommendationsResponse>(
      'https://content-api.wildberries.ru/api/content/v1/recommendations/set',
      data,
      { rateLimitKey: 'promotion.setRecommendations' }
    );
  }
}
