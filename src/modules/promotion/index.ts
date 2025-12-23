/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/08-promotion.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type { GetAuctionAdverts, PlacementType, RequestWithCampaignID, RequestWithDate, RequestWithInterval, ResponseFullStats, ResponseInfoAdvert, ResponseInfoAdvertType8, ResponseInfoAdvertType9, ResponseWithDate, ResponseWithInterval, ResponseWithReturn, Stat, StatDate, StatInterval, V0AdvertMultibid, V0GetConfigCategoriesResponse, V0KeywordsStatisticsResponse } from '../../types/promotion.types';

export class PromotionModule {
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
  const result = await sdk.general.getPromotionCount();
  console.log(result);
   */
  async getPromotionCount(): Promise<{ adverts?: { type?: number; status?: number; count?: number; advert_list?: { advertId?: number; changeTime?: string }[] }[]; all?: number }> {
    return this.client.get<{ adverts?: { type?: number; status?: number; count?: number; advert_list?: { advertId?: number; changeTime?: string }[] }[]; all?: number }>('https://advert-api.wildberries.ru/adv/v1/promotion/count');
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
  const result = await sdk.general.createPromotionAdvert({}, {});
  console.log(result);
   */
  async createPromotionAdvert(data: number[], options?: { status?: -1 | 4 | 7 | 8 | 9 | 11; type?: 4 | 5 | 6 | 7 | 8; order?: 'create' | 'change' | 'id'; direction?: 'desc' | 'asc' }): Promise<ResponseInfoAdvertType8 | ResponseInfoAdvert | ResponseInfoAdvertType9[]> {
    return this.client.post<ResponseInfoAdvertType8 | ResponseInfoAdvert | ResponseInfoAdvertType9[]>('https://advert-api.wildberries.ru/adv/v1/promotion/adverts', data, { params: options });
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
  const result = await sdk.general.getAuctionAdverts({});
  console.log(result);
   */
  async getAuctionAdverts(options?: { ids?: string; statuses?: '-1' | '4' | '7' | '8' | '9' | '11'; payment_type?: 'cpm' | 'cpc' }): Promise<GetAuctionAdverts> {
    return this.client.get<GetAuctionAdverts>('https://advert-api.wildberries.ru/adv/v0/auction/adverts', { params: options });
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
  const result = await sdk.general.getAdvConfig();
  console.log(result);
   */
  async getAdvConfig(): Promise<{ categories?: V0GetConfigCategoriesResponse[]; config?: { description?: string; name?: string; value?: string }[] }> {
    return this.client.get<{ categories?: V0GetConfigCategoriesResponse[]; config?: { description?: string; name?: string; value?: string }[] }>('https://advert-api.wildberries.ru/adv/v0/config');
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
  const result = await sdk.general.createBidsMin({});
  console.log(result);
   */
  async createBidsMin(data: { advert_id: number; nm_ids: number[]; payment_type: 'cpm' | 'cpc'; placement_types: ('combined' | 'search' | 'recommendation')[] }): Promise<{ bids: { bids: { type: PlacementType; value: number }[]; nm_id: number }[] }> {
    return this.client.post<{ bids: { bids: { type: PlacementType; value: number }[]; nm_id: number }[] }>('https://advert-api.wildberries.ru/adv/v0/bids/min', data);
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
  const result = await sdk.general.createAdvSaveAd({});
  console.log(result);
   */
  async createAdvSaveAd(data: { type?: number; name?: string; subjectId?: number; sum?: number; btype?: number; on_pause?: boolean; nms?: number[]; cpm?: number }): Promise<string> {
    return this.client.post<string>('https://advert-api.wildberries.ru/adv/v1/save-ad', data);
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
  const result = await sdk.general.createSeacatSaveAd({});
  console.log(result);
   */
  async createSeacatSaveAd(data?: { name?: string; nms?: number[]; bid_type?: 'manual' | 'unified'; placement_types?: ('search' | 'recommendations')[] }): Promise<number> {
    return this.client.post<number>('https://advert-api.wildberries.ru/adv/v2/seacat/save-ad', data);
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
  const result = await sdk.general.getSupplierSubjects();
  console.log(result);
   */
  async getSupplierSubjects(): Promise<{ id?: number; name?: string; count?: number }[]> {
    return this.client.get<{ id?: number; name?: string; count?: number }[]>('https://advert-api.wildberries.ru/adv/v1/supplier/subjects');
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
  const result = await sdk.general.createSupplierNm({});
  console.log(result);
   */
  async createSupplierNm(data?: number[]): Promise<{ title?: string; nm?: number; subjectId?: number }[]> {
    return this.client.post<{ title?: string; nm?: number; subjectId?: number }[]>('https://advert-api.wildberries.ru/adv/v2/supplier/nms', data);
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
  const result = await sdk.general.getAdvDelete({});
  console.log(result);
   */
  async getAdvDelete(options?: { id: number }): Promise<unknown> {
    return this.client.get<unknown>('https://advert-api.wildberries.ru/adv/v0/delete', { params: options });
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
  const result = await sdk.general.createAdvRename({});
  console.log(result);
   */
  async createAdvRename(data?: { advertId: number; name: string }): Promise<unknown> {
    return this.client.post<unknown>('https://advert-api.wildberries.ru/adv/v0/rename', data);
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
  const result = await sdk.general.getAdvStart({});
  console.log(result);
   */
  async getAdvStart(options?: { id: number }): Promise<unknown> {
    return this.client.get<unknown>('https://advert-api.wildberries.ru/adv/v0/start', { params: options });
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
  const result = await sdk.general.getAdvPause({});
  console.log(result);
   */
  async getAdvPause(options?: { id: number }): Promise<unknown> {
    return this.client.get<unknown>('https://advert-api.wildberries.ru/adv/v0/pause', { params: options });
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
  const result = await sdk.general.getAdvStop({});
  console.log(result);
   */
  async getAdvStop(options?: { id: number }): Promise<unknown> {
    return this.client.get<unknown>('https://advert-api.wildberries.ru/adv/v0/stop', { params: options });
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
  const result = await sdk.general.updateAdvBid({});
   */
  async updateAdvBid(data: { bids: V0AdvertMultibid[] }): Promise<void> {
    return this.client.patch('https://advert-api.wildberries.ru/adv/v0/bids', data);
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
  const result = await sdk.general.updateAuctionPlacement({});
   */
  async updateAuctionPlacement(data: { placements: { advert_id: number; placements: { search: boolean; recommendations: boolean } }[] }): Promise<void> {
    return this.client.put('https://advert-api.wildberries.ru/adv/v0/auction/placements', data);
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
  const result = await sdk.general.updateAuctionBid({});
  console.log(result);
   */
  async updateAuctionBid(data: { bids: { advert_id: number; nm_bids: { nm_id: number; bid: number; placement: 'search' | 'recommendations' | 'combined' }[] }[] }): Promise<{ bids: { advert_id: number; nm_bids: { nm_id: number; bid: number; placement: string }[] }[] }> {
    return this.client.patch<{ bids: { advert_id: number; nm_bids: { nm_id: number; bid: number; placement: string }[] }[] }>('https://advert-api.wildberries.ru/adv/v0/auction/bids', data);
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
  const result = await sdk.general.getAdvBalance();
  console.log(result);
   */
  async getAdvBalance(): Promise<{ balance?: number; net?: number; bonus?: number; cashbacks?: { sum?: number; percent?: number; expiration_date?: string }[] }> {
    return this.client.get<{ balance?: number; net?: number; bonus?: number; cashbacks?: { sum?: number; percent?: number; expiration_date?: string }[] }>('https://advert-api.wildberries.ru/adv/v1/balance');
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
  const result = await sdk.general.getAdvBudget({});
  console.log(result);
   */
  async getAdvBudget(options?: { id: number }): Promise<{ cash?: number; netting?: number; total?: number }> {
    return this.client.get<{ cash?: number; netting?: number; total?: number }>('https://advert-api.wildberries.ru/adv/v1/budget', { params: options });
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
  const result = await sdk.general.createBudgetDeposit({}, {});
  console.log(result);
   */
  async createBudgetDeposit(data: { sum?: number; cashback_sum?: number; cashback_percent?: number; type?: number; return?: boolean }, options?: { id: number }): Promise<ResponseWithReturn> {
    return this.client.post<ResponseWithReturn>('https://advert-api.wildberries.ru/adv/v1/budget/deposit', data, { params: options });
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
  const result = await sdk.general.getAdvUpd({});
  console.log(result);
   */
  async getAdvUpd(options?: { from: string; to: string }): Promise<{ updNum?: number; updTime?: string; updSum?: number; advertId?: number; campName?: string; advertType?: number; paymentType?: string; advertStatus?: number }[]> {
    return this.client.get<{ updNum?: number; updTime?: string; updSum?: number; advertId?: number; campName?: string; advertType?: number; paymentType?: string; advertStatus?: number }[]>('https://advert-api.wildberries.ru/adv/v1/upd', { params: options });
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
  const result = await sdk.general.getAdvPayments({});
  console.log(result);
   */
  async getAdvPayments(options?: { from?: string; to?: string }): Promise<{ id?: number; date?: string; sum?: number; type?: number; statusId?: number; cardStatus?: string }[]> {
    return this.client.get<{ id?: number; date?: string; sum?: number; type?: number; statusId?: number; cardStatus?: string }[]>('https://advert-api.wildberries.ru/adv/v1/payments', { params: options });
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
  const result = await sdk.general.getSearchSetPlus({});
  console.log(result);
   */
  async getSearchSetPlus(options?: { id: number; fixed?: boolean }): Promise<unknown> {
    return this.client.get<unknown>('https://advert-api.wildberries.ru/adv/v1/search/set-plus', { params: options });
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
  const result = await sdk.general.createSearchSetPlu({}, {});
  console.log(result);
   */
  async createSearchSetPlu(data: { pluse?: string[] }, options?: { id: number }): Promise<string[]> {
    return this.client.post<string[]>('https://advert-api.wildberries.ru/adv/v1/search/set-plus', data, { params: options });
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
  const result = await sdk.general.createSearchSetExcluded({}, {});
  console.log(result);
   */
  async createSearchSetExcluded(data: { excluded?: string[] }, options?: { id: number }): Promise<unknown> {
    return this.client.post<unknown>('https://advert-api.wildberries.ru/adv/v1/search/set-excluded', data, { params: options });
  }

  /**
   * Установка/удаление минус-фраз для кампании с единой ставкой
   *
   * Метод устанавливает и удаляет минус-фразы для кампании [с единой ставкой](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v1~1save-ad/post).<br><br> Данные фразы можно выбрать из списка запросов, по которым покупатели находили ваш товар. Список запросов можно получить в [статистике ключевых фраз](/openapi/analytics#tag/Statistika-po-prodvizheniyu/paths/~1adv~1v0~1stats~1keywords/get).<br> Отправка пустого массива удаляет все минус-фразы из кампании. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 1 запрос | 6 секунд | 5 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createAutoSetExcluded({}, {});
  console.log(result);
   */
  async createAutoSetExcluded(data: { excluded?: string[] }, options?: { id: number }): Promise<unknown> {
    return this.client.post<unknown>('https://advert-api.wildberries.ru/adv/v1/auto/set-excluded', data, { params: options });
  }

  /**
   * Список карточек товаров для кампании с единой ставкой
   *
   * Метод формирует [список карточек товаров](/openapi/promotion#tag/Sozdanie-kampanij/paths/~1adv~1v2~1supplier~1nms/post), которые можно добавить в кампанию с единой ставкой.<br><br> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 1 запрос | 1 секунда | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getAutoGetnmtoadd({});
  console.log(result);
   */
  async getAutoGetnmtoadd(options?: { id: number }): Promise<number[]> {
    return this.client.get<number[]>('https://advert-api.wildberries.ru/adv/v1/auto/getnmtoadd', { params: options });
  }

  /**
   * Изменение списка карточек товаров в кампании с единой ставкой
   *
   * Метод добавляет и удаляет карточки товаров в кампании с единой ставкой.<br><br> <div class="description_important"> Добавить можно только те карточки товаров, которые вернутся в <a href="/openapi/promotion#tag/Parametry-avtomaticheskih-kampanij/paths/~1adv~1v1~1auto~1getnmtoadd/get">списке карточек товаров для кампании с единой ставкой</a>.<br>Удалить единственную карточку товара из кампании нельзя. </div> Проверки по параметру `delete` не предусмотрено. Если пришел ответ со статус-кодом `200`, а изменений не произошло, проверьте, чтобы запрос соответствовал документации. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 60 запросов | 1 секунда | 5 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createAutoUpdatenm({}, {});
  console.log(result);
   */
  async createAutoUpdatenm(data: { add?: number[]; delete?: number[] }, options?: { id: number }): Promise<unknown> {
    return this.client.post<unknown>('https://advert-api.wildberries.ru/adv/v1/auto/updatenm', data, { params: options });
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
  const result = await sdk.general.updateAuctionNm({});
  console.log(result);
   */
  async updateAuctionNm(data: { nms: { advert_id: number; nms: { add?: unknown; delete?: number[] } }[] }): Promise<{ nms: { advert_id: number; nms: { added: number[]; deleted: number[] } }[] }> {
    return this.client.patch<{ nms: { advert_id: number; nms: { added: number[]; deleted: number[] } }[] }>('https://advert-api.wildberries.ru/adv/v0/auction/nms', data);
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
  const result = await sdk.general.getAdvCount();
  console.log(result);
   */
  async getAdvCount(): Promise<{ all?: number; adverts?: { type?: number; status?: number; count?: number } }> {
    return this.client.get<{ all?: number; adverts?: { type?: number; status?: number; count?: number } }>('https://advert-media-api.wildberries.ru/adv/v1/count');
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
  const result = await sdk.general.getAdvAdverts({});
  console.log(result);
   */
  async getAdvAdverts(options?: { status?: number; type?: number; limit?: number; offset?: number; order?: string; direction?: string }): Promise<{ advertId?: number; name?: string; brand?: string; type?: number; status?: number; createTime?: string; endTime?: string }[]> {
    return this.client.get<{ advertId?: number; name?: string; brand?: string; type?: number; status?: number; createTime?: string; endTime?: string }[]>('https://advert-media-api.wildberries.ru/adv/v1/adverts', { params: options });
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
  const result = await sdk.general.getAdvAdvert({});
  console.log(result);
   */
  async getAdvAdvert(options?: { id: number }): Promise<{ advertId?: number; name?: string; brand?: string; type?: number; status?: number; createTime?: string; extended?: { reason?: string; expenses?: number; from?: string; to?: string; updated_at?: string; price?: number; budget?: number; operation?: number; contract_id?: number }; items?: { id?: number; name?: string; status?: number; place?: number; budget?: number; daily_limit?: number; category_name?: string; cpm?: number; url?: string; advert_type?: number; created_at?: string; updated_at?: string; date_from?: string; date_to?: string; nms?: number[]; bottomText1?: string; bottomText2?: string; message?: string; additionalSettings?: number; receiversCount?: number; subject_id?: number; subject_name?: string; action_name?: string; show_hours?: { From?: number; To?: number }[]; Erid?: string }[] }> {
    return this.client.get<{ advertId?: number; name?: string; brand?: string; type?: number; status?: number; createTime?: string; extended?: { reason?: string; expenses?: number; from?: string; to?: string; updated_at?: string; price?: number; budget?: number; operation?: number; contract_id?: number }; items?: { id?: number; name?: string; status?: number; place?: number; budget?: number; daily_limit?: number; category_name?: string; cpm?: number; url?: string; advert_type?: number; created_at?: string; updated_at?: string; date_from?: string; date_to?: string; nms?: number[]; bottomText1?: string; bottomText2?: string; message?: string; additionalSettings?: number; receiversCount?: number; subject_id?: number; subject_name?: string; action_name?: string; show_hours?: { From?: number; To?: number }[]; Erid?: string }[] }>('https://advert-media-api.wildberries.ru/adv/v1/advert', { params: options });
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
  const result = await sdk.general.createAdvFullstat({});
  console.log(result);
   */
  async createAdvFullstat(data: RequestWithDate | RequestWithInterval | RequestWithCampaignID[]): Promise<ResponseWithDate | ResponseWithInterval> {
    return this.client.post<ResponseWithDate | ResponseWithInterval>('https://advert-api.wildberries.ru/adv/v2/fullstats', data);
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
  const result = await sdk.general.getAdvFullstats({});
  console.log(result);
   */
  async getAdvFullstats(options?: { ids: string; beginDate: string; endDate: string }): Promise<ResponseFullStats> {
    return this.client.get<ResponseFullStats>('https://advert-api.wildberries.ru/adv/v3/fullstats', { params: options });
  }

  /**
   * Статистика кампании с единой ставкой по кластерам фраз
   *
   * Метод формирует кластеры ключевых — то есть, наборы похожих — фраз из поисковой строки, если по ним хотя бы один раз были показаны товары из кампании. В ответе метода также указано количество показов этих товаров. <br><br> Информация обновляется каждые 15 минут. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 секунда | 4 запроса | 250 миллисекунд | 4 запроса | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getAutoStatWords({});
  console.log(result);
   */
  async getAutoStatWords(options?: { id: number }): Promise<{ excluded?: string[]; clusters?: { cluster?: string; count?: number; keywords?: string[] }[] }> {
    return this.client.get<{ excluded?: string[]; clusters?: { cluster?: string; count?: number; keywords?: string[] }[] }>('https://advert-api.wildberries.ru/adv/v2/auto/stat-words', { params: options });
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
  const result = await sdk.general.getStatWords({});
  console.log(result);
   */
  async getStatWords(options?: { id: number }): Promise<{ words?: { phrase?: string[]; strong?: string[]; excluded?: string[]; pluse?: string[]; keywords?: { keyword?: string; count?: number }[]; fixed?: boolean }; stat?: { advertId?: number; keyword?: string; advertName?: string; campaignName?: string; begin?: string; end?: string; views?: number; clicks?: number; frq?: number; ctr?: number; cpc?: number; duration?: number; sum?: number }[] }> {
    return this.client.get<{ words?: { phrase?: string[]; strong?: string[]; excluded?: string[]; pluse?: string[]; keywords?: { keyword?: string; count?: number }[]; fixed?: boolean }; stat?: { advertId?: number; keyword?: string; advertName?: string; campaignName?: string; begin?: string; end?: string; views?: number; clicks?: number; frq?: number; ctr?: number; cpc?: number; duration?: number; sum?: number }[] }>('https://advert-api.wildberries.ru/adv/v1/stat/words', { params: options });
  }

  /**
   * Статистика по ключевым фразам
   *
   * Метод формирует статистику по ключевым фразам из поисковой строки: количество просмотров товара и затраты по одной ключевой фразе.
   * Подходит для кампаний c единой и ручной ставкой (type 9).
   *
   * Статистика формируется за каждый день, когда кампания была активна.
   * В одном запросе можно получить данные максимум за 7 дней.
   * Данные обновляются каждый час.
   *
   * Rate limit: 4 requests per second (250ms interval)
   *
   * @param options - Query parameters (all required)
   * @param options.advert_id - ID кампании
   * @param options.from - Начало периода (формат: YYYY-MM-DD)
   * @param options.to - Конец периода (формат: YYYY-MM-DD, макс. 7 дней от from)
   * @returns Статистика по ключевым фразам с разбивкой по дням
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400) - e.g., date range > 7 days
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const stats = await sdk.promotion.getStatsKeywords({
   *   advert_id: 27111737,
   *   from: '2024-12-16',
   *   to: '2024-12-23'
   * });
   * stats.keywords?.forEach(day => {
   *   console.log(`${day.date}:`);
   *   day.stats?.forEach(s => console.log(`  ${s.keyword}: ${s.views} views, ${s.clicks} clicks`));
   * });
   */
  async getStatsKeywords(options: { advert_id: number; from: string; to: string }): Promise<V0KeywordsStatisticsResponse> {
    return this.client.get<V0KeywordsStatisticsResponse>('https://advert-api.wildberries.ru/adv/v0/stats/keywords', { params: options });
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
  const result = await sdk.general.createAdvStat({});
  console.log(result);
   */
  async createAdvStat(data: RequestWithDate | RequestWithInterval | RequestWithCampaignID[]): Promise<StatInterval | StatDate | Stat[]> {
    return this.client.post<StatInterval | StatDate | Stat[]>('https://advert-media-api.wildberries.ru/adv/v1/stats', data);
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
  const result = await sdk.general.getCalendarPromotions({});
  console.log(result);
   */
  async getCalendarPromotions(options?: { startDateTime: string; endDateTime: string; allPromo: boolean; limit?: number; offset?: number }): Promise<unknown> {
    return this.client.get<unknown>('https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions', { params: options });
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
  const result = await sdk.general.getPromotionsDetails({});
  console.log(result);
   */
  async getPromotionsDetails(options?: { promotionIDs: string }): Promise<unknown> {
    return this.client.get<unknown>('https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/details', { params: options });
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
  const result = await sdk.general.getPromotionsNomenclatures({});
  console.log(result);
   */
  async getPromotionsNomenclatures(options?: { promotionID: number; inAction: boolean; limit?: number; offset?: number }): Promise<unknown> {
    return this.client.get<unknown>('https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/nomenclatures', { params: options });
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
  const result = await sdk.general.createPromotionsUpload();
  console.log(result);
   */
  async createPromotionsUpload(): Promise<unknown> {
    return this.client.post<unknown>('https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/upload', undefined);
  }

}