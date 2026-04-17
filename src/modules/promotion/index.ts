/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/08-promotion.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import { warnOnce } from '../../utils/deprecation';
import type {
  BidsRecommendationsResponse,
  CampaignProductsUpdate,
  CreateCampaignRequest,
  GetAdverts,
  GetAdvertsV2Response,
  GetBidsRecommendationsParams,
  GetCampaignCountResponse,
  GetMinusPhrasesRequest,
  GetMinusPhrasesResponse,
  GetSearchClusterStatsRequest,
  GetSearchClusterStatsResponse,
  GetSupplierSubjectsParams,
  PlacementType,
  RequestWithCampaignID,
  RequestWithDate,
  RequestWithInterval,
  ResponseFullStats,
  ResponseWithReturn,
  SetMinusPhrasesRequest,
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
  V0GetNormQueryMinusRequest,
  V0GetNormQueryMinusResponse,
  V0GetNormQueryStatsRequest,
  V0GetNormQueryStatsResponse,
  V0KeywordsStatisticsResponse,
  V0SetMinusNormQueryRequest,
  V0SetNormQueryBidsRequest,
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
   * Изменение ставок в кампаниях
   *
   * Метод меняет ставки карточек товаров по артикулам WB в кампаниях типа `9` с единой или ручной ставкой. <br><br> Для кампаний в статусах `4`, `9` и `11`. <br><br> В запросе укажите место размещения в параметре `placement`: - `combined` — в поиске и рекомендациях для кампаний с единой ставкой - `search `или `recommendations` — в поиске или рекомендациях для кампаний с ручной ставкой <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @deprecated Use updateBidsV2() instead for kopeck-based bidding.
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.updateAuctionBid({});
  console.log(result);
   */
  async updateAuctionBid(data: {
    bids: {
      advert_id: number;
      nm_bids: {
        nm_id: number;
        bid: number;
        placement: 'search' | 'recommendations' | 'combined';
      }[];
    }[];
  }): Promise<{
    bids: { advert_id: number; nm_bids: { nm_id: number; bid: number; placement: string }[] }[];
  }> {
    return this.client.patch<{
      bids: { advert_id: number; nm_bids: { nm_id: number; bid: number; placement: string }[] }[];
    }>('https://advert-api.wildberries.ru/adv/v0/auction/bids', data, {
      rateLimitKey: 'promotion.patchAdvAuctionBids',
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
    cashbacks?: { sum?: number; percent?: number; expiration_date?: string }[];
  }> {
    return this.client.get<{
      balance?: number;
      net?: number;
      bonus?: number;
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
  }): Promise<{ cash?: number; netting?: number; total?: number }> {
    return this.client.get<{ cash?: number; netting?: number; total?: number }>(
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
      }[]
    >('https://advert-api.wildberries.ru/adv/v1/payments', {
      params: options,
      rateLimitKey: 'promotion.advPayments',
    });
  }

  /**
   * Установка/удаление минус-фраз для кампании с единой ставкой
   *
   * <div class="description_important"> ⚠️ **DEPRECATED**: Этот метод устарел и будет отключён **2 февраля 2026**.<br><br> **Обновление**: Дата отключения перенесена с 15 января на 2 февраля 2026.<br><br> **Причина**: Переход от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9).<br><br> **Альтернатива**: Для работы с минус-фразами в кампаниях type 9 используйте соответствующие методы управления кампаниями с ручной ставкой. </div> Метод устанавливает и удаляет минус-фразы для кампании [с единой ставкой](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v1~1save-ad/post).<br><br> Данные фразы можно выбрать из списка запросов, по которым покупатели находили ваш товар. Список запросов можно получить в [статистике ключевых фраз](/openapi/analytics#tag/Statistika-po-prodvizheniyu/paths/~1adv~1v0~1stats~1keywords/get).<br> Отправка пустого массива удаляет все минус-фразы из кампании. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 1 запрос | 6 секунд | 5 запросов | </div>
   *
   * @deprecated This method will be disabled by Wildberries API on February 2, 2026.
   * Use setNormqueryMinus() for type 9 campaigns with manual bidding instead.
   * @see {@link https://dev.wildberries.ru/release-notes?id=388} Release notes
   * @see {@link PromotionModule.setNormqueryMinus} New method
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.promotion.createAutoSetExcluded({}, {}); // February 2, 2026
   * console.log(result);
   */
  async createAutoSetExcluded(
    data: { excluded?: string[] },
    options?: { id: number }
  ): Promise<void> {
    warnOnce(
      'PromotionModule.createAutoSetExcluded',
      '[DEPRECATED] createAutoSetExcluded() will be disabled by Wildberries API on February 2, 2026. ' +
        'Use setNormqueryMinus() for type 9 campaigns with manual bidding instead.'
    );
    return this.client.post('https://advert-api.wildberries.ru/adv/v1/auto/set-excluded', data, {
      params: options,
      rateLimitKey: 'promotion.postAdvAutoSetExcluded',
    });
  }

  /**
   * Изменение списка карточек товаров в кампании с единой ставкой
   *
   * <div class="description_important"> ⚠️ **DEPRECATED**: Этот метод устарел и будет отключён **2 февраля 2026**.<br><br> **Причина**: Переход от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9).<br><br> **Альтернатива**: Для работы с товарами в кампаниях type 9 используйте метод [Управление товарами в кампаниях](/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1auction~1nms/patch). </div> Метод добавляет и удаляет карточки товаров в кампании с единой ставкой.<br><br> <div class="description_important"> Добавить можно только те карточки товаров, которые вернутся в <a href="/openapi/promotion#tag/Parametry-avtomaticheskih-kampanij/paths/~1adv~1v1~1auto~1getnmtoadd/get">списке карточек товаров для кампании с единой ставкой</a>.<br>Удалить единственную карточку товара из кампании нельзя. </div> Проверки по параметру `delete` не предусмотрено. Если пришел ответ со статус-кодом `200`, а изменений не произошло, проверьте, чтобы запрос соответствовал документации. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>
   *
   * @deprecated This method will be disabled by Wildberries API on February 2, 2026.
   * Use updateAuctionNm() for type 9 campaigns instead.
   * @see {@link https://dev.wildberries.ru/release-notes?id=388} Release notes
   * @see {@link PromotionModule.updateAuctionNm} New method
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.promotion.createAutoUpdatenm({}, {}); // February 2, 2026
   * console.log(result);
   */
  async createAutoUpdatenm(
    data: { add?: number[]; delete?: number[] },
    options?: { id: number }
  ): Promise<void> {
    warnOnce(
      'PromotionModule.createAutoUpdatenm',
      '[DEPRECATED] createAutoUpdatenm() will be disabled by Wildberries API on February 2, 2026. ' +
        'Use updateAuctionNm() for type 9 campaigns instead.'
    );
    return this.client.post('https://advert-api.wildberries.ru/adv/v1/auto/updatenm', data, {
      params: options,
      rateLimitKey: 'promotion.postAdvAutoUpdatenm',
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
   * Статистика по ключевым фразам
   *
   * Метод формирует статистику по ключевым фразам из поисковой строки: количество просмотров товара и затраты по одной ключевой фразе. Подходит для кампаний c единой и ручной ставкой. <br><br> Статистика формируется за каждый день, когда кампания была активна. В одном запросе можно получить данные максимум за 7 дней. <br> Данные обновляются каждый час. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 4 запроса | 250 миллисекунд | 4 запроса | </div>
   *
   * @deprecated This endpoint is deprecated. Use alternative methods for keyword statistics.
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getStatsKeywords({});
  console.log(result);
   */
  async getStatsKeywords(options?: {
    advert_id: number;
    from: string;
    to: string;
  }): Promise<V0KeywordsStatisticsResponse> {
    return this.client.get<V0KeywordsStatisticsResponse>(
      'https://advert-api.wildberries.ru/adv/v0/stats/keywords',
      { params: options, rateLimitKey: 'promotion.advStatsKeywords' }
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
  // Deprecated V0/V1 Methods - Will be removed February 2, 2026
  // ============================================================================

  /**
   * Получить информацию о кампаниях (устаревший метод)
   *
   * Метод возвращает информацию о рекламных кампаниях по их идентификаторам.
   *
   * @deprecated Будет удалён 2 февраля 2026. Используйте getAdvertsV2() вместо этого.
   * @see {@link https://dev.wildberries.ru/release-notes?id=388} Release notes
   * @see {@link PromotionModule.getAdvertsV2} Новый метод
   *
   * @param ids - Массив идентификаторов кампаний
   * @returns Информация о кампаниях
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * ```typescript
   * const adverts = await sdk.promotion.getPromotionAdverts([12345, 67890]);
   * console.log(adverts);
   * ```
   */
  async getPromotionAdverts(ids: number[]): Promise<GetAdverts> {
    warnOnce(
      'PromotionModule.getPromotionAdverts',
      '[DEPRECATED] getPromotionAdverts() будет удалён 2 февраля 2026. Используйте getAdvertsV2().'
    );
    return this.client.post<GetAdverts>(
      'https://advert-api.wildberries.ru/adv/v1/promotion/adverts',
      ids,
      { rateLimitKey: 'promotion.postAdvPromotionAdverts' }
    );
  }

  /**
   * Получить список аукционных кампаний (устаревший метод)
   *
   * Метод возвращает список рекламных кампаний типа "аукцион".
   *
   * @deprecated Будет удалён 2 февраля 2026. Используйте getAdvertsV2() вместо этого.
   * @see {@link https://dev.wildberries.ru/release-notes?id=388} Release notes
   * @see {@link PromotionModule.getAdvertsV2} Новый метод
   *
   * @param params - Параметры фильтрации
   * @returns Список аукционных кампаний
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * ```typescript
   * const adverts = await sdk.promotion.getAuctionAdverts({ status: 9 });
   * console.log(adverts);
   * ```
   */
  async getAuctionAdverts(params?: { status?: number; type?: number }): Promise<GetAdverts> {
    warnOnce(
      'PromotionModule.getAuctionAdverts',
      '[DEPRECATED] getAuctionAdverts() будет удалён 2 февраля 2026. Используйте getAdvertsV2().'
    );
    return this.client.get<GetAdverts>('https://advert-api.wildberries.ru/adv/v0/auction/adverts', {
      params,
      rateLimitKey: 'promotion.advAuctionAdverts',
    });
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
   */
  async getNormqueryStats(data: V0GetNormQueryStatsRequest): Promise<V0GetNormQueryStatsResponse> {
    return this.client.post<V0GetNormQueryStatsResponse>(
      'https://advert-api.wildberries.ru/adv/v0/normquery/stats',
      data,
      { rateLimitKey: 'promotion.normqueryStats' }
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
   * @returns List of campaigns with bid_type (auto/manual) and bids in kopecks
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
      bids: { type: PlacementType; value: number }[];
    }[];
  }> {
    return this.client.post<{
      bids: {
        nm_id: number;
        bids: { type: PlacementType; value: number }[];
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

  /**
   * Изменение ставок в кампаниях (V1 API)
   *
   * Метод меняет ставки карточек товаров по артикулам WB в кампаниях с единой или ручной ставкой.
   * Для кампаний в статусах 4, 9 и 11. Replaces deprecated v0 endpoint.
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
   * const result = await sdk.promotion.updateBidsV2({
   *   bids: [{
   *     advert_id: 12345,
   *     nm_bids: [{
   *       nm_id: 13335157,
   *       bid_kopecks: 250,
   *       placement: 'recommendations'
   *     }]
   *   }]
   * });
   * console.log(result.bids);
   * ```
   */
  async updateBidsV2(data: {
    bids: {
      advert_id: number;
      nm_bids: {
        nm_id: number;
        bid_kopecks: number;
        placement: 'search' | 'recommendations' | 'combined';
      }[];
    }[];
  }): Promise<{
    bids: {
      advert_id: number;
      nm_bids: {
        nm_id: number;
        bid_kopecks: number;
        placement: string;
      }[];
    }[];
  }> {
    return this.client.patch<{
      bids: {
        advert_id: number;
        nm_bids: {
          nm_id: number;
          bid_kopecks: number;
          placement: string;
        }[];
      }[];
    }>('https://advert-api.wildberries.ru/api/advert/v1/bids', data, {
      rateLimitKey: 'promotion.bidsV1',
    });
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
   *   placement_types: ['search', 'recommendations']
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
}
