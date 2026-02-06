/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/08-promotion.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  GetAdverts,
  GetAuctionAdverts,
  PlacementType,
  RequestWithCampaignID,
  RequestWithDate,
  RequestWithInterval,
  ResponseFullStats,
  ResponseInfoAdvert,
  ResponseInfoAdvertType8,
  ResponseInfoAdvertType9,
  ResponseWithDate,
  ResponseWithInterval,
  ResponseWithReturn,
  Stat,
  StatDate,
  StatInterval,
  V0AdvertMultibid,
  V0GetConfigCategoriesResponse,
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
  private static _deprecatedMethodsWarned = new Set<string>();
  constructor(private client: BaseClient) {}

  /**
   * Списки кампаний
   *
   * Метод возвращает списки всех [рекламных кампаний](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) продавца с их ID. Кампании сгруппированы по типу и статусу, у каждой указана дата последнего изменения. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getPromotionCount();
  console.log(result);
   
   * @deprecated Use GET /api/advert/v2/adverts instead.*/
  async getPromotionCount(): Promise<{
    adverts?: {
      type?: number;
      status?: number;
      count?: number;
      advert_list?: { advertId?: number; changeTime?: string }[];
    }[];
    all?: number;
  }> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getPromotionCount')) {
      console.warn(
        '[WB SDK] getPromotionCount() is deprecated. Use GET /api/advert/v2/adverts instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getPromotionCount');
    }
    return this.client.get<{
      adverts?: {
        type?: number;
        status?: number;
        count?: number;
        advert_list?: { advertId?: number; changeTime?: string }[];
      }[];
      all?: number;
    }>('https://advert-api.wildberries.ru/adv/v1/promotion/count', {
      rateLimitKey: 'promotion.advPromotionCount',
    });
  }

  /**
   * Информация о кампаниях
   *
   * Метод возвращает информацию о рекламных кампаниях с устаревшими типами (4-8) по их статусам, типам и ID. <br><br> Для получения информации о кампаниях с типом 9 используйте [отдельный метод](/openapi/promotion#tag/Kampanii/paths/~1adv~1v0~1auction~1adverts/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createPromotionAdvert({}, {});
  console.log(result);
   
   * @deprecated Use GET /api/advert/v2/adverts instead.*/
  async createPromotionAdvert(
    data: number[],
    options?: {
      status?: -1 | 4 | 7 | 8 | 9 | 11;
      type?: 4 | 5 | 6 | 7 | 8;
      order?: 'create' | 'change' | 'id';
      direction?: 'desc' | 'asc';
    }
  ): Promise<ResponseInfoAdvertType8 | ResponseInfoAdvert | ResponseInfoAdvertType9[]> {
    if (!PromotionModule._deprecatedMethodsWarned.has('createPromotionAdvert')) {
      console.warn(
        '[WB SDK] createPromotionAdvert() is deprecated. Use GET /api/advert/v2/adverts instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('createPromotionAdvert');
    }
    return this.client.post<
      ResponseInfoAdvertType8 | ResponseInfoAdvert | ResponseInfoAdvertType9[]
    >('https://advert-api.wildberries.ru/adv/v1/promotion/adverts', data, {
      params: options,
      rateLimitKey: 'promotion.postAdvPromotionAdverts',
    });
  }

  /**
   * Информация о кампаниях с ручной ставкой
   *
   * Метод возвращает информацию о рекламных кампаниях с ручной ставкой по их статусам, типам оплаты и ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAuctionAdverts({});
  console.log(result);
   
   * @deprecated Use the updated campaign management API instead.*/
  async getAuctionAdverts(options?: {
    ids?: string;
    statuses?: '-1' | '4' | '7' | '8' | '9' | '11';
    payment_type?: 'cpm' | 'cpc';
  }): Promise<GetAuctionAdverts> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getAuctionAdverts')) {
      console.warn(
        '[WB SDK] getAuctionAdverts() is deprecated. Use the updated campaign management API instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getAuctionAdverts');
    }
    return this.client.get<GetAuctionAdverts>(
      'https://advert-api.wildberries.ru/adv/v0/auction/adverts',
      { params: options, rateLimitKey: 'promotion.advAuctionAdverts' }
    );
  }

  /**
   * Конфигурационные значения Продвижения
   *
   * Метод возвращает допустимые значения основных параметров конфигурации [кампаний](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post): например, минимальные ставки, доступные категории и максимальное количество товаров, которые можно добавить в кампанию. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvConfig();
  console.log(result);
   
   * @deprecated Use the updated configuration API instead.*/
  async getAdvConfig(): Promise<{
    categories?: V0GetConfigCategoriesResponse[];
    config?: { description?: string; name?: string; value?: string }[];
  }> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getAdvConfig')) {
      console.warn(
        '[WB SDK] getAdvConfig() is deprecated. Use the updated configuration API instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getAdvConfig');
    }
    return this.client.get<{
      categories?: V0GetConfigCategoriesResponse[];
      config?: { description?: string; name?: string; value?: string }[];
    }>('https://advert-api.wildberries.ru/adv/v0/config', { rateLimitKey: 'promotion.advConfig' });
  }

  /**
   * Минимальные ставки для карточек товаров
   *
   * Метод возвращает минимальные ставки для карточек товаров по типу оплаты и местам размещения. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 20 запросов | 3 секунды | 5 запросов | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createBidsMin({});
  console.log(result);
   
   * @deprecated Use POST /api/advert/v1/bids/min instead.*/
  async createBidsMin(data: {
    advert_id: number;
    nm_ids: number[];
    payment_type: 'cpm' | 'cpc';
    placement_types: ('combined' | 'search' | 'recommendation')[];
  }): Promise<{ bids: { bids: { type: PlacementType; value: number }[]; nm_id: number }[] }> {
    if (!PromotionModule._deprecatedMethodsWarned.has('createBidsMin')) {
      console.warn(
        '[WB SDK] createBidsMin() is deprecated. Use POST /api/advert/v1/bids/min instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('createBidsMin');
    }
    return this.client.post<{
      bids: { bids: { type: PlacementType; value: number }[]; nm_id: number }[];
    }>('https://advert-api.wildberries.ru/adv/v0/bids/min', data, {
      rateLimitKey: 'promotion.postAdvBidsMin',
    });
  }

  /**
   * Создать кампанию с единой ставкой
   *
   * Метод создаёт кампанию [с единой ставкой](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) для продвижения товаров в: - каталоге - поиске - карточках товаров - рекомендациях на главной странице WB <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 20 секунд | 1 запрос | 20 секунд | 5 запросов | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createAdvSaveAd({});
  console.log(result);
   
   * @deprecated Use POST /adv/v2/seacat/save-ad. Note: This endpoint has been removed from the API instead.*/
  async createAdvSaveAd(data: {
    type?: number;
    name?: string;
    subjectId?: number;
    sum?: number;
    btype?: number;
    on_pause?: boolean;
    nms?: number[];
    cpm?: number;
  }): Promise<string> {
    if (!PromotionModule._deprecatedMethodsWarned.has('createAdvSaveAd')) {
      console.warn(
        '[WB SDK] createAdvSaveAd() is deprecated. Use POST /adv/v2/seacat/save-ad. Note: This endpoint has been removed from the API instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('createAdvSaveAd');
    }
    return this.client.post<string>('https://advert-api.wildberries.ru/adv/v1/save-ad', data, {
      rateLimitKey: 'promotion.postAdvSaveAd',
    });
  }

  /**
   * Создать кампанию
   *
   * Метод создаёт кампанию: - с ручной ставкой для продвижения товаров в поиске и/или рекомендациях - с единой ставкой для продвижения товаров одновременно в поиске и рекомендациях Тип всех созданных этим методом кампаний — `9`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 5 запросов | 12 секунд | 5 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createSeacatSaveAd({});
  console.log(result);
   
   * @deprecated Use the current campaign creation API instead.*/
  async createSeacatSaveAd(data?: {
    name?: string;
    nms?: number[];
    bid_type?: 'manual' | 'unified';
    placement_types?: ('search' | 'recommendations')[];
  }): Promise<number> {
    if (!PromotionModule._deprecatedMethodsWarned.has('createSeacatSaveAd')) {
      console.warn(
        '[WB SDK] createSeacatSaveAd() is deprecated. Use the current campaign creation API instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('createSeacatSaveAd');
    }
    return this.client.post<number>(
      'https://advert-api.wildberries.ru/adv/v2/seacat/save-ad',
      data,
      { rateLimitKey: 'promotion.postAdvSeacatSaveAd' }
    );
  }

  /**
   * Предметы для кампаний
   *
   * Метод возвращает список [предметов](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1all/get), которые можно добавить в рекламную [кампанию](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 12 секунд | 1 запрос | 12 секунд | 5 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getSupplierSubjects();
  console.log(result);
   
   * @deprecated Use the updated supplier API instead.*/
  async getSupplierSubjects(): Promise<{ id?: number; name?: string; count?: number }[]> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getSupplierSubjects')) {
      console.warn(
        '[WB SDK] getSupplierSubjects() is deprecated. Use the updated supplier API instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getSupplierSubjects');
    }
    return this.client.get<{ id?: number; name?: string; count?: number }[]>(
      'https://advert-api.wildberries.ru/adv/v1/supplier/subjects',
      { rateLimitKey: 'promotion.advSupplierSubjects' }
    );
  }

  /**
   * Карточки товаров для кампаний
   *
   * Метод возвращает список [карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post), которые можно добавить в рекламную [кампанию](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post). Для получения карточек необходимы ID [предметов](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v1~1supplier~1subjects/get), также доступных для добавления в кампанию. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 5 запросов | 12 секунд | 5 запросов | </div>
   *
   * @param [data] - ID предметов, для которых нужно получить карточки товаров
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createSupplierNm({});
  console.log(result);
   
   * @deprecated Use the updated supplier API instead.*/
  async createSupplierNm(
    data?: number[]
  ): Promise<{ title?: string; nm?: number; subjectId?: number }[]> {
    if (!PromotionModule._deprecatedMethodsWarned.has('createSupplierNm')) {
      console.warn(
        '[WB SDK] createSupplierNm() is deprecated. Use the updated supplier API instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('createSupplierNm');
    }
    return this.client.post<{ title?: string; nm?: number; subjectId?: number }[]>(
      'https://advert-api.wildberries.ru/adv/v2/supplier/nms',
      data,
      { rateLimitKey: 'promotion.postAdvSupplierNms' }
    );
  }

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
   * Запуск кампании
   *
   * Метод запускает [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) в статусах `4` — готово к запуску — или `11` — пауза. Чтобы запустить кампанию со статусом `4`, необходимо выполнить два условия: 1. После создания кампании в кабинете **WB. Продвижение** нажать кнопку **Применить изменения**. 2. Установить бюджет — максимальную сумму затрат на кампанию. Чтобы запустить кампанию со статусом `11`, проверьте ее бюджет. Если бюджета недостаточно, [пополните его](/openapi/promotion#tag/Finansy/paths/~1adv~1v1~1budget~1deposit/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvStart({});
  console.log(result);
   
   * @deprecated Use the updated campaign management API instead.*/
  async getAdvStart(options?: { id: number }): Promise<void> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getAdvStart')) {
      console.warn(
        '[WB SDK] getAdvStart() is deprecated. Use the updated campaign management API instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getAdvStart');
    }
    return this.client.get('https://advert-api.wildberries.ru/adv/v0/start', {
      params: options,
      rateLimitKey: 'promotion.advStart',
    });
  }

  /**
   * Пауза кампании
   *
   * Метод ставит [кампании](/openapi/promotion#tag/Kampanii/paths/~1adv~1v1~1promotion~1adverts/post) в статусе `9` — активна — на паузу. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getAdvPause({});
  console.log(result);
   
   * @deprecated Use the updated campaign management API instead.*/
  async getAdvPause(options?: { id: number }): Promise<void> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getAdvPause')) {
      console.warn(
        '[WB SDK] getAdvPause() is deprecated. Use the updated campaign management API instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getAdvPause');
    }
    return this.client.get('https://advert-api.wildberries.ru/adv/v0/pause', {
      params: options,
      rateLimitKey: 'promotion.advPause',
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
   * Изменение ставок
   *
   * Метод меняет ставки карточек товаров по артикулам WB в кампаниях с единой ставкой. <br><br> Для кампаний в статусах `4`, `9` и `11`. <br><br> Для изменения ставок в кампаниях с ручной ставкой используйте [отдельный метод](/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1auction~1bids/patch). <br><br> Минимально допустимые ставки вы можете получить в ответе метода [получения минимальных ставок для карточек товаров](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v0~1bids~1min/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 5 запросов | 200 миллисекунд | 5 запросов | </div>
   *
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.updateAdvBid({});
   
   * @deprecated Use PATCH /api/advert/v1/bids instead.*/
  async updateAdvBid(data: { bids: V0AdvertMultibid[] }): Promise<void> {
    if (!PromotionModule._deprecatedMethodsWarned.has('updateAdvBid')) {
      console.warn('[WB SDK] updateAdvBid() is deprecated. Use PATCH /api/advert/v1/bids instead.');
      PromotionModule._deprecatedMethodsWarned.add('updateAdvBid');
    }
    return this.client.patch('https://advert-api.wildberries.ru/adv/v0/bids', data, {
      rateLimitKey: 'promotion.patchAdvBids',
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
   * Управление активностью фиксированных фраз
   *
   * Метод делает активными или неактивными фиксированные фразы в кампаниях [с ручной ставкой](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v2~1seacat~1save-ad/post). Фиксированные фразы нужны, чтобы товар отображался в поиске только по определенным поисковым запросам.<br><br> Установить или удалить фиксированные фразы можно через [отдельный метод](/openapi/promotion#tag/Parametry-kampanij/paths/~1adv~1v1~1search~1set-plus/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 500 миллисекунд | 1 запрос | 500 миллисекунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const result = await sdk.promotion.getSearchSetPlus({});
  console.log(result);

   * @deprecated This method will be removed on January 15, 2025.*/
  async getSearchSetPlus(options?: { id: number; fixed?: boolean }): Promise<void> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getSearchSetPlus')) {
      console.warn(
        '[WB SDK] getSearchSetPlus() is deprecated and will be removed on January 15, 2025.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getSearchSetPlus');
    }
    return this.client.get('https://advert-api.wildberries.ru/adv/v1/search/set-plus', {
      params: options,
      rateLimitKey: 'promotion.advSearchSetPlus',
    });
  }

  /**
   * Установка/удаление фиксированных фраз
   *
   * Метод устанавливает и удаляет фиксированные фразы в кампаниях [с ручной ставкой](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v2~1seacat~1save-ad/post). Фиксированные фразы можно выбрать в списке ключевых фраз кампании, который формируется после запуска.<br><br> Отправка пустого массива в методе удаляет все фиксированные фразы и отключает [активность](/openapi/promotion#tag/Parametry-kampanij/paths/~1adv~1v1~1search~1set-plus/get) всех фиксированных фраз кампании. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 500 миллисекунд | 1 запрос | 500 миллисекунд | 5 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const result = await sdk.promotion.createSearchSetPlu({}, {});
  console.log(result);

   * @deprecated This method will be removed on January 15, 2025.*/
  async createSearchSetPlu(
    data: { pluse?: string[] },
    options?: { id: number }
  ): Promise<string[]> {
    if (!PromotionModule._deprecatedMethodsWarned.has('createSearchSetPlu')) {
      console.warn(
        '[WB SDK] createSearchSetPlu() is deprecated and will be removed on January 15, 2025.'
      );
      PromotionModule._deprecatedMethodsWarned.add('createSearchSetPlu');
    }
    return this.client.post<string[]>(
      'https://advert-api.wildberries.ru/adv/v1/search/set-plus',
      data,
      { params: options, rateLimitKey: 'promotion.postAdvSearchSetPlus' }
    );
  }

  /**
   * Установка/удаление минус-фраз в поиске
   *
   * Метод устанавливает и удаляет минус-фразы в поиске, в кампаниях [с ручной ставкой](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v2~1seacat~1save-ad/post).<br><br> Данные фразы можно выбрать из списка запросов, по которым покупатели находили ваш товар. Список запросов можно получить в [статистике ключевых фраз](/openapi/analytics#tag/Statistika-po-prodvizheniyu/paths/~1adv~1v0~1stats~1keywords/get).<br>Максимально допустимое количество минус-фраз в кампании — 1000.<br> Отправка пустого массива удаляет все минус-фразы из поиска из кампании. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 2 запроса | 500 миллисекунд | 2 запроса | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const result = await sdk.promotion.createSearchSetExcluded({}, {});
  console.log(result);

   * @deprecated This method will be removed on January 15, 2025.*/
  async createSearchSetExcluded(
    data: { excluded?: string[] },
    options?: { id: number }
  ): Promise<void> {
    if (!PromotionModule._deprecatedMethodsWarned.has('createSearchSetExcluded')) {
      console.warn(
        '[WB SDK] createSearchSetExcluded() is deprecated and will be removed on January 15, 2025.'
      );
      PromotionModule._deprecatedMethodsWarned.add('createSearchSetExcluded');
    }
    return this.client.post('https://advert-api.wildberries.ru/adv/v1/search/set-excluded', data, {
      params: options,
      rateLimitKey: 'promotion.postAdvSearchSetExcluded',
    });
  }

  /**
   * Установка/удаление минус-фраз для кампании с единой ставкой
   *
   * <div class="description_important"> ⚠️ **DEPRECATED**: Этот метод устарел и будет отключён **2 февраля 2026**.<br><br> **Обновление**: Дата отключения перенесена с 15 января на 2 февраля 2026.<br><br> **Причина**: Переход от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9).<br><br> **Альтернатива**: Для работы с минус-фразами в кампаниях type 9 используйте соответствующие методы управления кампаниями с ручной ставкой. </div> Метод устанавливает и удаляет минус-фразы для кампании [с единой ставкой](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v1~1save-ad/post).<br><br> Данные фразы можно выбрать из списка запросов, по которым покупатели находили ваш товар. Список запросов можно получить в [статистике ключевых фраз](/openapi/analytics#tag/Statistika-po-prodvizheniyu/paths/~1adv~1v0~1stats~1keywords/get).<br> Отправка пустого массива удаляет все минус-фразы из кампании. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 1 запрос | 6 секунд | 5 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createAutoSetExcluded({}, {});
  console.log(result);
   */
  async createAutoSetExcluded(
    data: { excluded?: string[] },
    options?: { id: number }
  ): Promise<void> {
    return this.client.post('https://advert-api.wildberries.ru/adv/v1/auto/set-excluded', data, {
      params: options,
      rateLimitKey: 'promotion.postAdvAutoSetExcluded',
    });
  }

  /**
   * Список карточек товаров для кампании с единой ставкой
   *
   * <div class="description_important"> ⚠️ **DEPRECATED**: Этот метод устарел и будет отключён **2 февраля 2026**.<br><br> **Причина**: Переход от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9).<br><br> **Альтернатива**: Для работы с кампаниями type 9 используйте метод [Информация о кампаниях с ручной ставкой](/openapi/promotion#tag/Kampanii/paths/~1adv~1v0~1auction~1adverts/get) и [Управление товарами в кампаниях](/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1auction~1nms/patch). </div> Метод формирует [список карточек товаров](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v2~1supplier~1nms/post), которые можно добавить в кампанию с единой ставкой.<br><br> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const result = await sdk.promotion.getAutoGetnmtoadd({});
  console.log(result);

   * @deprecated Use GET /adv/v0/auction/adverts and PATCH /adv/v0/auction/nms for type 9 campaigns. Will be removed February 2, 2026.*/
  async getAutoGetnmtoadd(options?: { id: number }): Promise<number[]> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getAutoGetnmtoadd')) {
      console.warn(
        '[WB SDK] getAutoGetnmtoadd() is deprecated. Use GET /adv/v0/auction/adverts and PATCH /adv/v0/auction/nms for type 9 campaigns. Will be removed February 2, 2026.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getAutoGetnmtoadd');
    }
    return this.client.get<number[]>('https://advert-api.wildberries.ru/adv/v1/auto/getnmtoadd', {
      params: options,
      rateLimitKey: 'promotion.advAutoGetnmtoadd',
    });
  }

  /**
   * Изменение списка карточек товаров в кампании с единой ставкой
   *
   * <div class="description_important"> ⚠️ **DEPRECATED**: Этот метод устарел и будет отключён **2 февраля 2026**.<br><br> **Причина**: Переход от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9).<br><br> **Альтернатива**: Для работы с товарами в кампаниях type 9 используйте метод [Управление товарами в кампаниях](/openapi/promotion#tag/Upravlenie-kampaniyami/paths/~1adv~1v0~1auction~1nms/patch). </div> Метод добавляет и удаляет карточки товаров в кампании с единой ставкой.<br><br> <div class="description_important"> Добавить можно только те карточки товаров, которые вернутся в <a href="/openapi/promotion#tag/Parametry-avtomaticheskih-kampanij/paths/~1adv~1v1~1auto~1getnmtoadd/get">списке карточек товаров для кампании с единой ставкой</a>.<br>Удалить единственную карточку товара из кампании нельзя. </div> Проверки по параметру `delete` не предусмотрено. Если пришел ответ со статус-кодом `200`, а изменений не произошло, проверьте, чтобы запрос соответствовал документации. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createAutoUpdatenm({}, {});
  console.log(result);
   */
  async createAutoUpdatenm(
    data: { add?: number[]; delete?: number[] },
    options?: { id: number }
  ): Promise<void> {
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
   * Метод будет отключён 30 сентября. Используйте [актуальный метод](/openapi/promotion#tag/Statistika/paths/~1adv~1v3~1fullstats/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 5 запросов | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.createAdvFullstat({});
  console.log(result);
   
   * @deprecated Use GET /adv/v3/fullstats instead.*/
  async createAdvFullstat(
    data: RequestWithDate | RequestWithInterval | RequestWithCampaignID[]
  ): Promise<ResponseWithDate | ResponseWithInterval> {
    if (!PromotionModule._deprecatedMethodsWarned.has('createAdvFullstat')) {
      console.warn(
        '[WB SDK] createAdvFullstat() is deprecated. Use GET /adv/v3/fullstats instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('createAdvFullstat');
    }
    return this.client.post<ResponseWithDate | ResponseWithInterval>(
      'https://advert-api.wildberries.ru/adv/v2/fullstats',
      data,
      { rateLimitKey: 'promotion.postAdvFullstats' }
    );
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
   * Статистика кампании с единой ставкой по кластерам фраз
   *
   * <div class="description_important"> ⚠️ **DEPRECATED**: Этот метод устарел и будет отключён **2 февраля 2026**.<br><br> **Причина**: Переход от кампаний с единой ставкой (type 8) к кампаниям с ручной и единой ставкой (type 9).<br><br> **Альтернатива**: Для получения статистики всех типов кампаний (включая type 9) используйте универсальный метод [Полная статистика кампаний](/openapi/promotion#tag/Statistika/paths/~1adv~1v3~1fullstats/get). Он предоставляет более подробную статистику для всех типов кампаний. </div> Метод формирует кластеры ключевых — то есть, наборы похожих — фраз из поисковой строки, если по ним хотя бы один раз были показаны товары из кампании. В ответе метода также указано количество показов этих товаров. <br><br> Информация обновляется каждые 15 минут. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 4 запроса | 250 миллисекунд | 4 запроса | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const result = await sdk.promotion.getAutoStatWords({});
  console.log(result);

   * @deprecated Use GET /adv/v3/fullstats instead. Will be removed February 2, 2026.*/
  async getAutoStatWords(options?: { id: number }): Promise<{
    excluded?: string[];
    clusters?: { cluster?: string; count?: number; keywords?: string[] }[];
  }> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getAutoStatWords')) {
      console.warn(
        '[WB SDK] getAutoStatWords() is deprecated. Use GET /adv/v3/fullstats instead. Will be removed February 2, 2026.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getAutoStatWords');
    }
    return this.client.get<{
      excluded?: string[];
      clusters?: { cluster?: string; count?: number; keywords?: string[] }[];
    }>('https://advert-api.wildberries.ru/adv/v2/auto/stat-words', {
      params: options,
      rateLimitKey: 'promotion.advAutoStatWords',
    });
  }

  /**
   * Статистика кампании c ручной ставкой по ключевым фразам
   *
   * Метод формирует статистику кампании c ручной ставкой по ключевым фразам из поисковой строки: количество просмотров товара и затраты по одной ключевой фразе. <br><br> Информация обновляется каждые 30 минут. <div class="description_important"> Тип рекламных кампаний <strong>Поиск</strong> устарел. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 4 запроса | 250 миллисекунд | 4 запроса | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.promotion.getStatWords({});
  console.log(result);
   
   * @deprecated Use GET /adv/v0/stats/keywords instead.*/
  async getStatWords(options?: { id: number }): Promise<{
    words?: {
      phrase?: string[];
      strong?: string[];
      excluded?: string[];
      pluse?: string[];
      keywords?: { keyword?: string; count?: number }[];
      fixed?: boolean;
    };
    stat?: {
      advertId?: number;
      keyword?: string;
      advertName?: string;
      campaignName?: string;
      begin?: string;
      end?: string;
      views?: number;
      clicks?: number;
      frq?: number;
      ctr?: number;
      cpc?: number;
      duration?: number;
      sum?: number;
    }[];
  }> {
    if (!PromotionModule._deprecatedMethodsWarned.has('getStatWords')) {
      console.warn(
        '[WB SDK] getStatWords() is deprecated. Use GET /adv/v0/stats/keywords instead.'
      );
      PromotionModule._deprecatedMethodsWarned.add('getStatWords');
    }
    return this.client.get<{
      words?: {
        phrase?: string[];
        strong?: string[];
        excluded?: string[];
        pluse?: string[];
        keywords?: { keyword?: string; count?: number }[];
        fixed?: boolean;
      };
      stat?: {
        advertId?: number;
        keyword?: string;
        advertName?: string;
        campaignName?: string;
        begin?: string;
        end?: string;
        views?: number;
        clicks?: number;
        frq?: number;
        ctr?: number;
        cpc?: number;
        duration?: number;
        sum?: number;
      }[];
    }>('https://advert-api.wildberries.ru/adv/v1/stat/words', {
      params: options,
      rateLimitKey: 'promotion.advStatWords',
    });
  }

  /**
   * Статистика по ключевым фразам
   *
   * Метод формирует статистику по ключевым фразам из поисковой строки: количество просмотров товара и затраты по одной ключевой фразе. Подходит для кампаний c единой и ручной ставкой. <br><br> Статистика формируется за каждый день, когда кампания была активна. В одном запросе можно получить данные максимум за 7 дней. <br> Данные обновляются каждый час. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 4 запроса | 250 миллисекунд | 4 запроса | </div>
   *
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
      'https://api.wildberries.ru/adv/v0/stats/keywords',
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
   * Rate limit: 5 requests per second, 200ms interval, burst 5
   *
   * @param options - Query parameters for filtering campaigns
   * @returns List of campaigns with bid settings in kopecks
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/promotion#tag/Kampanii/paths/~1api~1advert~1v2~1adverts/get}
   * @example
   * ```typescript
   * const campaigns = await sdk.promotion.getAdvertsV2({
   *   ids: '12345,23456',
   *   statuses: '9,11',
   *   payment_type: 'cpm'
   * });
   * console.log(campaigns.adverts);
   * ```
   */
  async getAdvertsV2(options?: {
    ids?: string;
    statuses?: string;
    payment_type?: 'cpm' | 'cpc';
  }): Promise<GetAdverts> {
    return this.client.get<GetAdverts>('https://advert-api.wildberries.ru/api/advert/v2/adverts', {
      params: options,
      rateLimitKey: 'promotion.advertsV2',
    });
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
}
