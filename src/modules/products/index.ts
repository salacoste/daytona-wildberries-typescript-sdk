/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/02-products.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors/validation-error';
import type { Office, RequestMoveNmsImtConn, RequestMoveNmsImtDisconn, RequestPublicViewerPublicErrorsTableListV2, ResponseCardCreate, ResponseContentError, ResponsePublicViewerPublicErrorsTableListV2, StoreContactRequestBody, Warehouse, CreateProductRequest, CreateProductResponse, ProductListRequest, ProductListResponse, ProductListCursor, UpdateProductRequest, UpdateProductResponse, DeleteProductResponse, ProductCard, MediaUploadResponse, PricingUpdate, PricingTaskResponse, PricingInfo, GetPricingResponse, PricingTaskStatusResponse, StockUpdate, StockInfo } from '../../types/products.types';

export class ProductsModule {
  constructor(private client: BaseClient) {}

  /**
   * Родительские категории товаров
   *
   * Метод возвращает названия и ID всех родительских категорий для [создания карточек товаров](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov): например, `Электроника`, `Бытовая химия`, `Рукоделие`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getParentAll({});
  console.log(result);
   */
  async getParentAll(options?: { locale?: string }): Promise<{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/object/parent/all', { params: options });
  }

  /**
   * Список предметов
   *
   * Метод возвращает список названий [родительских категорий предметов](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1parent~1all/get) и их предметов с ID. Например, у категории `Игрушки` будут предметы `Калейдоскопы`, `Куклы`, `Мячики`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getObjectAll({});
  console.log(result);
   */
  async getObjectAll(options?: { locale?: string; name?: string; limit?: number; offset?: number; parentID?: number }): Promise<{ data?: { subjectID?: number; parentID?: number; subjectName?: string; parentName?: string }[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: { subjectID?: number; parentID?: number; subjectName?: string; parentName?: string }[]; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/object/all', { params: options });
  }

  /**
   * Характеристики предмета
   *
   * Метод возвращает параметры характеристик предмета: названия, типы данных, единицы измерения и так далее. В запросе необходимо указать ID [предмета](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1all/get). <div class="description_important"> Для получения значений характеристик <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1colors/get">Цвет</a>, <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1kinds/get">Пол</a>, <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1countries/get">Страна производства</a>, <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1seasons/get">Сезон</a>, <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1vat/get">Ставка НДС</a> и <a href="/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1directory~1tnved/get">ТНВЭД-код</a> используйте отдельные методы </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param subjectId - ID предмета
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getObjectCharc('subjectId-value', {});
  console.log(result);
   */
  async getObjectCharc(subjectId: number, options?: { locale?: string }): Promise<{ data?: { charcID?: number; subjectName?: string; subjectID?: number; name?: string; required?: boolean; unitName?: string; maxCount?: number; popular?: boolean; charcType?: number }[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: { charcID?: number; subjectName?: string; subjectID?: number; name?: string; required?: boolean; unitName?: string; maxCount?: number; popular?: boolean; charcType?: number }[]; error?: boolean; errorText?: string; additionalErrors?: string }>(`https://content-api.wildberries.ru/content/v2/object/charcs/${subjectId}`, { params: options });
  }

  /**
   * Цвет
   *
   * Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Цвет`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getDirectoryColors({});
  console.log(result);
   */
  async getDirectoryColors(options?: { locale?: string }): Promise<{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/directory/colors', { params: options });
  }

  /**
   * Пол
   *
   * Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Пол`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getDirectoryKinds({});
  console.log(result);
   */
  async getDirectoryKinds(options?: { locale?: string }): Promise<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/directory/kinds', { params: options });
  }

  /**
   * Страна производства
   *
   * Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Страна производства`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getDirectoryCountries({});
  console.log(result);
   */
  async getDirectoryCountries(options?: { locale?: string }): Promise<{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/directory/countries', { params: options });
  }

  /**
   * Сезон
   *
   * Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Сезон`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getDirectorySeasons({});
  console.log(result);
   */
  async getDirectorySeasons(options?: { locale?: string }): Promise<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/directory/seasons', { params: options });
  }

  /**
   * Ставка НДС
   *
   * Метод возвращает возможные значения [характеристики](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1charcs~1%7BsubjectId%7D/get) предмета `Ставка НДС`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getDirectoryVat({});
  console.log(result);
   */
  async getDirectoryVat(options?: { locale?: string }): Promise<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/directory/vat', { params: options });
  }

  /**
   * ТНВЭД-код
   *
   * Метод возвращает список ТНВЭД-кодов по ID [предмета](/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki/paths/~1content~1v2~1object~1all/get) и фрагменту ТНВЭД-кода. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getDirectoryTnved({});
  console.log(result);
   */
  async getDirectoryTnved(options?: { subjectID: number; search?: number; locale?: string }): Promise<{ data?: { tnved?: string; isKiz?: boolean }[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: { tnved?: string; isKiz?: boolean }[]; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/directory/tnved', { params: options });
  }

  /**
   * Список ярлыков
   *
   * Метод возвращает список и характеристики всех ярлыков продавца для группировки и фильтрации товаров. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getContentTags();
  console.log(result);
   */
  async getContentTags(): Promise<{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/tags');
  }

  /**
   * Создание ярлыка
   *
   * Метод добавляет один ярлык продавца. Можно создать максимум 15 ярлыков для одного продавца. Максимальная длина ярлыка — 15 символов. <br>Созданный ярлык можно получить в общем [списке](/openapi/work-with-products#tag/Yarlyki/paths/~1content~1v2~1tags/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createContentTag({});
  console.log(result);
   */
  async createContentTag(data: { color?: string; name?: string }): Promise<ResponseContentError> {
    return this.client.post<ResponseContentError>('https://content-api.wildberries.ru/content/v2/tag', data);
  }

  /**
   * Изменение ярлыка
   *
   * Метод заменяет данные ярлыка: имя и цвет. <br>Новые данные можно получить в общем [списке](/openapi/work-with-products#tag/Yarlyki/paths/~1content~1v2~1tags/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param id - Числовой ID ярлыка
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateContentTag('id-value', {});
  console.log(result);
   */
  async updateContentTag(id: number, data: { color?: string; name?: string }): Promise<ResponseContentError> {
    return this.client.patch<ResponseContentError>(`https://content-api.wildberries.ru/content/v2/tag/${id}`, data);
  }

  /**
   * Удаление ярлыка
   *
   * Метод удаляет ярлык из [списка ярлыков](/openapi/work-with-products#tag/Yarlyki/paths/~1content~1v2~1tags/get) продавца. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param id - Числовой ID ярлыка
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.deleteContentTag('id-value');
  console.log(result);
   */
  async deleteContentTag(id: number): Promise<ResponseContentError> {
    return this.client.delete<ResponseContentError>(`https://content-api.wildberries.ru/content/v2/tag/${id}`);
  }

  /**
   * Управление ярлыками в карточке товара
   *
   * Метод добавляет или снимает ярлык с карточки товара. К карточке можно добавить максимум 15 ярлыков.<br> При удалении ярлыка из карточки товара он не удаляется из [списка ярлыков](/openapi/work-with-products#tag/Yarlyki/paths/~1content~1v2~1tags/get) продавца. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createNomenclatureLink({});
  console.log(result);
   */
  async createNomenclatureLink(data: { nmID?: number; tagsIDs?: number[] }): Promise<ResponseContentError> {
    return this.client.post<ResponseContentError>('https://content-api.wildberries.ru/content/v2/tag/nomenclature/link', data);
  }

  /**
   * Список карточек товаров
   *
   * <div class="description_auth"> Метод доступен по <a href="/openapi/api-information#tag/Avtorizaciya/Kak-sozdat-token">токену</a> с категорией <strong>Контент</strong> или <strong>Продвижение</strong> </div> Метод возвращает список созданных карточек товаров. <div class="description_important"> В ответе метода не будет карточек, находящихся в корзине. Получить такие карточки можно через <a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post">отдельный метод</a>. </div> Чтобы получить **больше 100** карточек товаров, используйте пагинацию: 1. Сделайте первый запрос: <br> <pre style="background-color: rgb(38 50 56 / 5%); color: #e53935"> { "settings": { "cursor": { "limit": 100 }, "filter": { "withPhoto": -1 } } }</pre> 2. Пройдите в конец полученного списка карточек товаров. 3. Скопируйте из `cursor` две строки: - `"updatedAt": "***"` - `"nmID": ***` 4. Вставьте скопированные строки в параметр запроса `cursor`. 5. Повторите запрос. 6. Повторяйте пункты 2-5, пока поле `total` в ответе не станет меньше чем параметр `limit` в запросе. Это будет означать, что вы получили все карточки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createCardsList({}, {});
  console.log(result);
   */
  async createCardsList(data: { settings?: { sort?: { ascending?: boolean }; filter?: { withPhoto?: number; textSearch?: string; tagIDs?: number[]; allowedCategoriesOnly?: boolean; objectIDs?: number[]; brands?: string[]; imtID?: number }; cursor?: { limit?: number; updatedAt?: string; nmID?: number } } }, options?: { locale?: string }): Promise<{ cards?: { nmID?: number; imtID?: number; nmUUID?: string; subjectID?: number; subjectName?: string; vendorCode?: string; brand?: string; title?: string; description?: string; needKiz?: boolean; photos?: { big?: string; c246x328?: string; c516x688?: string; square?: string; tm?: string }[]; video?: string; wholesale?: { enabled?: boolean; quantum?: number }; dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number; isValid?: boolean }; characteristics?: { id?: number; name?: string; value?: unknown }[]; sizes?: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[]; tags?: { id?: number; name?: string; color?: string }[]; createdAt?: string; updatedAt?: string }[]; cursor?: { updatedAt?: string; nmID?: number; total?: number } }> {
    return this.client.post<{ cards?: { nmID?: number; imtID?: number; nmUUID?: string; subjectID?: number; subjectName?: string; vendorCode?: string; brand?: string; title?: string; description?: string; needKiz?: boolean; photos?: { big?: string; c246x328?: string; c516x688?: string; square?: string; tm?: string }[]; video?: string; wholesale?: { enabled?: boolean; quantum?: number }; dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number; isValid?: boolean }; characteristics?: { id?: number; name?: string; value?: unknown }[]; sizes?: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[]; tags?: { id?: number; name?: string; color?: string }[]; createdAt?: string; updatedAt?: string }[]; cursor?: { updatedAt?: string; nmID?: number; total?: number } }>('https://content-api.wildberries.ru/content/v2/get/cards/list', data, { params: options });
  }

  /**
   * Список несозданных карточек товаров с ошибками
   *
   * Метод возвращает список карточек товаров ([черновиков](https://seller.wildberries.ru/new-goods/error-cards)), при создании или редактировании которых произошли ошибки, с описанием этих ошибок. <br><br> Данные в ответе возвращаются пакетами `batch`. Один пакет содержит: - все ошибки по одной объединённой карточке товара `imtID` одного запроса при [создании](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post) карточек товаров - все ошибки одного запроса при [создании с присоединением](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post) или [редактировании](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post) карточек товаров <br><br> Чтобы получить более 100 пакетов, используйте пагинацию: 1. Сделайте первый запрос: <br> <pre style="background-color: rgb(38 50 56 / 5%); color: #e53935"> { "cursor": { "limit": 100 }, "order": { "ascending": true } }</pre> 2. Скопируйте `"updatedAt": "***"`,`"batchUUID": "***" `из `cursor` ответа и вставьте в `cursor` запроса. 3. Повторите запрос. 4. Повторяйте пункты 2 и 3, пока не получите в ответе `"next": false`. Это будет означать, что вы получили все пакеты. <div class="description_important"> Чтобы удалить карточку товара из списка, сделайте ещё один запрос на создание, создание с присоединением или редактирование карточки товара с исправленными ошибками </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 10 запросов | 6 секунд | 5 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createErrorList({}, {});
  console.log(result);
   */
  async createErrorList(data: RequestPublicViewerPublicErrorsTableListV2, options?: { locale?: string }): Promise<ResponsePublicViewerPublicErrorsTableListV2> {
    return this.client.post<ResponsePublicViewerPublicErrorsTableListV2>('https://content-api.wildberries.ru/content/v2/cards/error/list', data, { params: options });
  }

  /**
   * Редактирование карточек товаров
   *
   * Метод обновляет карточки товаров. Данные для обновления можно получить через [список карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) и [список карточек товаров в корзине](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post). <div class="description_important"> Карточка товара перезаписывается при обновлении. Поэтому в запросе нужно передать <strong>все</strong> параметры карточки, в том числе те, которые вы не собираетесь обновлять. </div> Нельзя редактировать или удалять баркоды, но можно добавить дополнительный баркод к карточке товара. Параметры `photos`, `video` и `tags` редактировать или удалять через данный метод нельзя.<br> Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`. <br><br> В одном запросе можно отредактировать максимум 3000 карточек товаров (`nmID`). Максимальный размер запроса 10 Мб.<br> Если ответ `Успешно` (`200`), но какие-то карточки не обновились, проверьте [список несозданных карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 10 запросов | 6 секунд | 5 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createCardsUpdate({});
  console.log(result);
   */
  async createCardsUpdate(data?: { nmID: number; vendorCode: string; brand?: string; title?: string; description?: string; dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number }; characteristics?: { id: number; value: unknown }[]; sizes: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[] }[]): Promise<ResponseCardCreate> {
    return this.client.post<ResponseCardCreate>('https://content-api.wildberries.ru/content/v2/cards/update', data);
  }

  /**
   * Объединение и разъединение карточек товаров
   *
   * Метод объединяет и разъединяет карточки товаров. Карточки товаров считаются объединёнными, если у них одинаковый `imtID`. <br><br> Для объединения карточек товаров сделайте запрос **с указанием** `imtID`. Можно объединять не более 30 карточек товаров.<br> Для разъединения карточек товаров сделайте запрос **без указания** `imtID`. Для разъединенных карточек будут сгенерированы новые `imtID`. <br><br> Если вы разъедините одновременно несколько карточек товаров, эти карточки объединятся в одну и получат новый `imtID`.<br> Чтобы присвоить каждой карточке товара уникальный `imtID`, необходимо передавать по одной карточке товара за запрос.<br> <br> Максимальный размер запроса 10 Мб. <div class="description_important"> Объединить можно только карточки товаров с одинаковыми предметами. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createCardsMovenm({});
  console.log(result);
   */
  async createCardsMovenm(data?: RequestMoveNmsImtConn | RequestMoveNmsImtDisconn): Promise<ResponseCardCreate> {
    return this.client.post<ResponseCardCreate>('https://content-api.wildberries.ru/content/v2/cards/moveNm', data);
  }

  /**
   * Перенос карточек товаров в корзину
   *
   * Метод переносит [карточки товаров в корзину](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post). При этом карточки товаров не удаляются, их можно [восстановить](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1recover/post). <div class="description_important"> После переноса в корзину карточке товара присваивается новый <code>imtID</code>. </div> Карточки товаров удаляются автоматически, если лежат в корзине больше 30 дней. Очистка корзины происходит каждую ночь по московскому времени.<br> Карточки товаров можно удалить в любое время в [личном кабинете](https://seller.wildberries.ru/new-goods/basket-cards). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createDeleteTrash({});
  console.log(result);
   */
  async createDeleteTrash(data: { nmIDs?: number[] }): Promise<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: Record<string, never> }> {
    return this.client.post<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: Record<string, never> }>('https://content-api.wildberries.ru/content/v2/cards/delete/trash', data);
  }

  /**
   * Восстановление карточек товаров из корзины
   *
   * Метод восстанавливает [карточки товаров из корзины](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post). <div class="description_important"> Карточка товара сохраняет тот же <code>imtID</code>, что был присвоен ей при <a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1delete~1trash/post">перемещении в корзину</a>. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createCardsRecover({});
  console.log(result);
   */
  async createCardsRecover(data: { nmIDs?: number[] }): Promise<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: Record<string, never> }> {
    return this.client.post<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: Record<string, never> }>('https://content-api.wildberries.ru/content/v2/cards/recover', data);
  }

  /**
   * Список карточек товаров в корзине
   *
   * <div class="description_auth"> Метод доступен по <a href="/openapi/api-information#tag/Avtorizaciya/Kak-sozdat-token">токену</a> с категорией <strong>Контент</strong> или <strong>Продвижение</strong> </div> Метод возвращает список карточек товаров в корзине.<br><br> Чтобы получить **больше 100** карточек товаров, воспользуйтесь пагинацией: 1. Сделайте первый запрос: <br> <pre style="background-color: rgb(38 50 56 / 5%); color: #e53935"> { "settings": { "cursor": { "limit": 100 }, "filter": { "withPhoto": -1 } } }</pre> 2. Пройдите в конец полученного списка карточек товаров. 3. Скопируйте из `cursor` две строки: - `"trashedAt": "***"` - `"nmID": ***` 4. Вставьте скопированные строки в параметр запроса `cursor`. 5. Повторите запрос. 6. Повторяйте пункты 2-5, пока поле `total` в ответе не станет меньше чем параметр `limit` в запросе. Это будет означать, что вы получили все карточки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createCardsTrash({}, {});
  console.log(result);
   */
  async createCardsTrash(data: { settings?: { sort?: { ascending?: boolean }; cursor?: { limit?: number; trashedAt?: string; nmID?: number }; filter?: { textSearch?: string } } }, options?: { locale?: 'ru' | 'en' | 'zh' }): Promise<{ cards?: { nmID?: number; vendorCode?: string; subjectID?: number; subjectName?: string; photos?: { big?: string; c246x328?: string; c516x688?: string; square?: string; tm?: string }[]; video?: string; wholesale?: { enabled?: boolean; quantum?: number }; sizes?: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[]; dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number; isValid?: boolean }; characteristics?: { id?: number; name?: string; value?: unknown }[]; createdAt?: string; trashedAt?: string }[]; cursor?: { trashedAt?: string; nmID?: number; total?: number } }> {
    return this.client.post<{ cards?: { nmID?: number; vendorCode?: string; subjectID?: number; subjectName?: string; photos?: { big?: string; c246x328?: string; c516x688?: string; square?: string; tm?: string }[]; video?: string; wholesale?: { enabled?: boolean; quantum?: number }; sizes?: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[]; dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number; isValid?: boolean }; characteristics?: { id?: number; name?: string; value?: unknown }[]; createdAt?: string; trashedAt?: string }[]; cursor?: { trashedAt?: string; nmID?: number; total?: number } }>('https://content-api.wildberries.ru/content/v2/get/cards/trash', data, { params: options });
  }

  /**
   * Лимиты карточек товаров
   *
   * Возвращает бесплатные и платные лимиты продавца на [создание карточек товаров](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post).<br><br> Формула для получения количества карточек, которые можно создать: > (`freeLimits` + `paidLimits`) - количество созданных карточек Созданными считаются карточки, которые можно получить через методы [список карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1list/post) и [список карточек товаров в корзине](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1get~1cards~1trash/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getCardsLimits();
  console.log(result);
   */
  async getCardsLimits(): Promise<{ data?: { freeLimits?: number; paidLimits?: number }; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{ data?: { freeLimits?: number; paidLimits?: number }; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/cards/limits');
  }

  /**
   * Генерация баркодов
   *
   * Метод генерирует массив уникальных баркодов для создания размера в [карточке товара](/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post). Можно использовать, если у вас нет собственных баркодов. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createContentBarcodes({});
  console.log(result);
   */
  async createContentBarcodes(data: { count?: number }): Promise<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.post<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }>('https://content-api.wildberries.ru/content/v2/barcodes', data);
  }

  /**
   * Создание карточек товаров
   *
   * Метод создаёт карточки товаров c указанием описаний и характеристик товаров.<br> <div class="description_important"> Есть две формы запроса: для создания отдельных и объединённых карточек товаров. </div> Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`. <br><br> Создание карточки товара происходит асинхронно. После отправки запрос становится в очередь на обработку.<br> В одном запросе можно создать максимум 100 объединённых карточек товаров (`imtID`), по 30 карточек товаров в каждой. Максимальный размер запроса 10 Мб.<br> Если ответ `Успешно` (`200`), но какие-то карточки не создались, проверьте [список несозданных карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 10 запросов | 6 секунд | 5 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createCardsUpload({});
  console.log(result);
   */
  async createCardsUpload(data?: { subjectID: number; variants: { brand?: string; title?: string; description?: string; vendorCode: string; wholesale?: { enabled?: boolean; quantum?: number }; dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number }; sizes?: { techSize?: string; wbSize?: string; price?: number; skus?: string[] }[]; characteristics?: { id: number; value: unknown }[] }[] }[]): Promise<ResponseCardCreate> {
    return this.client.post<ResponseCardCreate>('https://content-api.wildberries.ru/content/v2/cards/upload', data);
  }

  /**
   * Создание карточек товаров с присоединением
   *
   * Метод создаёт новые карточки товаров, присоединяя их к существующим карточкам. <br><br> Габариты товаров можно указать только в `сантиметрах`, вес товара с упаковкой — в `килограммах`. <br><br> Создание карточки товара происходит асинхронно. После отправки запрос становится в очередь на обработку.<br>Максимальный размер запроса 10 Мб.<br> Если ответ `Успешно` (`200`), но какие-то карточки не создались, проверьте [список несозданных карточек товаров](/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 10 запросов | 6 секунд | 5 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createUploadAdd({});
  console.log(result);
   */
  async createUploadAdd(data?: { imtID?: number; cardsToAdd?: { brand?: string; vendorCode: string; wholesale?: { enabled?: boolean; quantum?: number }; title?: string; description?: string; dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number }; sizes?: { techSize?: string; wbSize?: string; price?: number; skus?: string[] }[]; characteristics?: { id: number; value: unknown }[] }[] }): Promise<ResponseCardCreate> {
    return this.client.post<ResponseCardCreate>('https://content-api.wildberries.ru/content/v2/cards/upload/add', data);
  }

  /**
   * Загрузить медиафайл
   *
   * Метод загружает и добавляет один медиафайл к карточке товара. Требования к изображениям: * максимум изображений для одной карточки товара — 30 * минимальное разрешение — 700x900 px * максимальный размер — 32 Мб * минимальное качество — 65% * форматы — JPG, PNG, BMP, GIF (статичные), WebP Требования к видео: * максимум одно видео для одной карточки товара * максимальный размер — 50 Мб * форматы — MOV, MP4 <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createMediaFile();
  console.log(result);
   */
  async createMediaFile(): Promise<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: Record<string, never> }> {
    return this.client.post<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: Record<string, never> }>('https://content-api.wildberries.ru/content/v3/media/file', undefined);
  }

  /**
   * Загрузить медиафайлы по ссылкам
   *
   * Метод загружает набор медиафайлов в карточку товара через указание ссылок в запросе. <div class="description_important"> Новые медиафайлы полностью заменяют старые. Чтобы добавить новые медиафайлы, укажите в запросе ссылки одновременно на новые и старые медиафайлы. </div> Требования к ссылкам: * ссылка должна вести прямо на файл. Убедитесь, что ссылка не ведёт на страницу предпросмотра или авторизации, например. Если по ссылке открывается текстовая страница TXT или HTML, ссылка считается некорректной * для доступа к файлу по ссылке не нужна авторизация Требования к изображениям: * максимум изображений для одной карточки товара — 30 * минимальное разрешение — 700×900 px * максимальный размер — 32 Мб * минимальное качество — 65% * форматы — JPG, PNG, BMP, GIF (статичные), WebP Требования к видео: * максимум одно видео для одной карточки товара * максимальный размер — 50 Мб * форматы — MOV, MP4 Если видео или хотя бы одно изображение в запросе не соответствует требованиям, то даже при успешном ответе (`200`) ни одно изображение/видео не загрузится. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Контент</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 5 запросов | Исключение — методы: <ul> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload/post">создания карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov/paths/~1content~1v2~1cards~1upload~1add/post">создания карточек товаров с присоединением</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1update/post">редактирования карточек товаров</a></li> <li><a href="/openapi/work-with-products#tag/Kartochki-tovarov/paths/~1content~1v2~1cards~1error~1list/post">получения несозданных карточек товаров с ошибками</a></li> </ul> </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createMediaSave({});
  console.log(result);
   */
  async createMediaSave(data: { nmId?: number; data?: string[] }): Promise<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: Record<string, never> }> {
    return this.client.post<{ data?: Record<string, never>; error?: boolean; errorText?: string; additionalErrors?: Record<string, never> }>('https://content-api.wildberries.ru/content/v3/media/save', data);
  }

  /**
   * Установить цены и скидки
   *
   * Метод устанавливает цены и скидки для товаров. <br><br> Чтобы установить цены для размеров товара, используйте [отдельный метод](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1size/post). <div class="description_important"> Получить информацию о процессе установки цен и скидок можно с помощью методов <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get">состояния</a> и <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get">детализации</a> обработанной загрузки. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createUploadTask();
  console.log(result);
   */
  async createUploadTask(): Promise<unknown> {
    return this.client.post<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/upload/task', undefined);
  }

  /**
   * Установить цены для размеров
   *
   * Метод устанавливает цены отдельно для размеров товаров. Работает только для товаров из категорий, где можно устанавливать цены отдельно для разных размеров. Для [таких товаров](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1size~1nm/get) `"editableSizePrice":true`. Чтобы установить цены и скидки для самих товаров, используйте [отдельный метод](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task/post). <div class="description_important"> Получить информацию о процессе установки цен и скидок можно с помощью методов <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get">состояния</a> и <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get">детализации</a> обработанной загрузки. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createTaskSize();
  console.log(result);
   */
  async createTaskSize(): Promise<unknown> {
    return this.client.post<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/upload/task/size', undefined);
  }

  /**
   * Установить скидки WB Клуба
   *
   * Устанавливает скидки для товаров в рамках подписки [WB Клуб](https://seller.wildberries.ru/help-center/article/A-337). <div class="description_important"> Получить информацию о процессе установки цен и скидок можно с помощью методов <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get">состояния</a> и <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get">детализации</a> обработанной загрузки. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createTaskClubDiscount();
  console.log(result);
   */
  async createTaskClubDiscount(): Promise<unknown> {
    return this.client.post<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/upload/task/club-discount', undefined);
  }

  /**
   * Состояние обработанной загрузки
   *
   * Метод возвращает информацию об обработанной загрузке цен и скидок. <div class="description_important"> Обработанная загрузка — это загрузка цен и скидок для <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task/post">товаров</a>, цен для <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1size/post">размеров товаров</a> и скидок <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post">WB Клуба</a>. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getHistoryTasks();
  console.log(result);
   */
  async getHistoryTasks(): Promise<unknown> {
    return this.client.get<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/history/tasks');
  }

  /**
   * Детализация обработанной загрузки
   *
   * Метод возвращает информацию о товарах и об ошибках в товарах в обработанной загрузке. <div class="description_important"> Обработанная загрузка — это загрузка цен и скидок для <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task/post">товаров</a>, цен для <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1size/post">размеров товаров</a> и скидок <a href="/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post">WB Клуба</a>. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getGoodsTask();
  console.log(result);
   */
  async getGoodsTask(): Promise<unknown> {
    return this.client.get<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/history/goods/task');
  }

  /**
   * Состояние необработанной загрузки
   *
   * Метод возвращает информацию про загрузку скидок в обработке. <div class="description_important"> Необработанная загрузка — это загрузка скидок в <a href="/openapi/promotion#tag/Kalendar-akcij">календаре акций</a>. Такие скидки применятся к товарам только в момент старта акции. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getBufferTasks();
  console.log(result);
   */
  async getBufferTasks(): Promise<unknown> {
    return this.client.get<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/buffer/tasks');
  }

  /**
   * Детализация необработанной загрузки
   *
   * Метод возвращает информацию о товарах и ошибках в товарах из загрузки в обработке. <div class="description_important"> Необработанная загрузка — это загрузка скидок в <a href="/openapi/promotion#tag/Kalendar-akcij">календаре акций</a>. Такие скидки применятся к товарам только в момент старта акции. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getGoodsTask();
  console.log(result);
   */
  async getGoodsTask2(): Promise<unknown> {
    return this.client.get<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/buffer/goods/task');
  }

  /**
   * Получить товары с ценами
   *
   * Метод возвращает информацию о товарах: цены, валюту, общие скидки и скидки [WB Клуба](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post). <br><br> В одном запросе можно указать только один артикул. <br><br> Чтобы получить информацию обо всех товарах продавца, не указывая артикулы, установите `limit=1000`, в параметре `offset` установите смещение по количеству записей. Количество нужно рассчитать по формуле: `offset` плюс `limit` из предыдущего запроса. Повторяйте запрос, пока вы не получите ответ с пустым массивом.<br><br> Используйте отдельные методы, чтобы получить информацию: - о [нескольких товарах по артикулам](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/post) - о [размерах товара](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1size~1nm/get) <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getGoodsFilter();
  console.log(result);
   */
  async getGoodsFilter(): Promise<unknown> {
    return this.client.get<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter');
  }

  /**
   * Получить товары с ценами по артикулам
   *
   * Метод возвращает информацию о товарах по их артикулам: цены, валюту, общие скидки и скидки [WB Клуба](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post). <br><br> В одном запросе можно указать более одного артикула. <br><br> Используйте отдельные методы, чтобы получить информацию: - обо [всех товарах продавца, не указывая артикулы](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get) - о [размерах товара](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1size~1nm/get) <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createGoodsFilter();
  console.log(result);
   */
  async createGoodsFilter(): Promise<unknown> {
    return this.client.post<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter', undefined);
  }

  /**
   * Получить размеры товара с ценами
   *
   * Метод возвращает информацию обо всех размерах одного товара: цены, валюту, общие скидки и скидки для [WB Клуба](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1club-discount/post). <br><br> Работает только для товаров из категорий, где можно устанавливать цены отдельно для разных размеров. Для таких товаров `"editableSizePrice":true`. <br><br> Чтобы получить информацию о самом товаре, используйте [отдельный метод](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1list~1goods~1filter/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSizeNm();
  console.log(result);
   */
  async getSizeNm(): Promise<unknown> {
    return this.client.get<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/list/goods/size/nm');
  }

  /**
   * Получить товары в карантине
   *
   * Метод возвращает информацию о товарах в карантине. <br><br> Если новая цена товара со скидкой будет минимум в 3 раза меньше старой, товар попадёт в [карантин](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine) и будет продаваться по старой цене. Ошибка об этом будет в ответах методов [состояний загрузок](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1tasks/get). <br><br> Вы можете изменить цену или скидку с помощью API либо вывести товар из карантина в [личном кабинете](https://seller.wildberries.ru/discount-and-prices/quarantine). <br><br> Для товаров с [поразмерной установкой цен](/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1upload~1task~1size/post) карантин не применяется. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов категории <strong>Цены и скидки</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 6 секунд | 10 запросов | 600 миллисекунд | 5 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getQuarantineGoods();
  console.log(result);
   */
  async getQuarantineGoods(): Promise<unknown> {
    return this.client.get<unknown>('https://discounts-prices-api.wildberries.ru/api/v2/quarantine/goods');
  }

  /**
   * Получить остатки товаров
   *
   * Метод возвращает данные об остатках товаров на [складах продавца](/openapi/work-with-products#tag/Sklady-prodavca). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>остатков на складах продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createStock({});
  console.log(result);
   */
  async createStock(data: { skus: string[] }): Promise<{ stocks?: { sku?: string; amount?: number }[] }> {
    return this.client.post<{ stocks?: { sku?: string; amount?: number }[] }>('https://marketplace-api.wildberries.ru/api/v3/stocks/{warehouseId}', data);
  }

  /**
   * Обновить остатки товаров
   *
   * Метод обновляет количество остатков товаров продавца [в списке](/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca/paths/~1api~1v3~1stocks~1%7BwarehouseId%7D/post). <div class="description_important"> Названия параметров запроса не валидируются. При отправке некорректных названий вы получите успешный ответ (<code>204</code>), но остатки не обновятся. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>остатков на складах продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateStock({});
   */
  async updateStock(data?: { stocks: { sku?: string; amount?: number }[] }): Promise<void> {
    return this.client.put('https://marketplace-api.wildberries.ru/api/v3/stocks/{warehouseId}', data);
  }

  /**
   * Удалить остатки товаров
   *
   * Метод удаляет запись об остатках товаров продавца из [списка остатков](/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca/paths/~1api~1v3~1stocks~1%7BwarehouseId%7D/post). <div class="description_important"> <strong>Действие необратимо</strong>. Удаленный остаток будет необходимо загрузить повторно для возобновления продаж. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>остатков на складах продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.deleteStock({});
   */
  async deleteStock(data: { skus?: string[] }): Promise<void> {
    return this.client.delete('https://marketplace-api.wildberries.ru/api/v3/stocks/{warehouseId}', data);
  }

  /**
   * Получить список складов WB
   *
   * Метод возвращает список всех складов WB для привязки к складам продавца. Предназначен для определения складов WB, чтобы сдавать готовые заказы по модели [FBS](/openapi/orders-fbs#tag/Zakazy-FBS) (Fulfillment by Seller). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.offices();
  console.log(result);
   */
  async offices(): Promise<Office[]> {
    return this.client.get<Office[]>('https://marketplace-api.wildberries.ru/api/v3/offices');
  }

  /**
   * Получить список складов продавца
   *
   * Метод возвращает список всех складов продавца. Может использоваться для получения [остатков товаров](/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca/paths/~1api~1v3~1stocks~1%7BwarehouseId%7D/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.warehouses();
  console.log(result);
   */
  async warehouses(): Promise<Warehouse[]> {
    return this.client.get<Warehouse[]>('https://marketplace-api.wildberries.ru/api/v3/warehouses');
  }

  /**
   * Создать склад продавца
   *
   * Метод создаёт склад продавца для работы с [остатками товаров](/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca/paths/~1api~1v3~1stocks~1%7BwarehouseId%7D/post). Нужно привязать к складу продавца [склад WB](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1offices/get) для работы по модели [FBS](/openapi/orders-fbs#tag/Zakazy-FBS) (Fulfillment by Seller). <div class="description_important"> Нельзя привязывать склад WB, который уже используется </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param data - Request body data
   * @returns Создано
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createWarehouses({});
  console.log(result);
   */
  async createWarehouses(data: { name: string; officeId: number }): Promise<{ id?: number }> {
    return this.client.post<{ id?: number }>('https://marketplace-api.wildberries.ru/api/v3/warehouses', data);
  }

  /**
   * Обновить склад продавца
   *
   * Метод обновляет данные склада продавца в [списке складов](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1warehouses/get). Данные о привязанном [складе WB](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1offices/get) можно изменить один раз в сутки. <div class="description_important"> Нельзя привязывать склад WB, который уже используется </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateWarehous({});
   */
  async updateWarehous(data: { name: string; officeId: number }): Promise<void> {
    return this.client.put('https://marketplace-api.wildberries.ru/api/v3/warehouses/{warehouseId}', data);
  }

  /**
   * Удалить склад продавца
   *
   * Метод удаляет склад продавца из [списка складов](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1warehouses/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>складов продавца</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.deleteWarehous();
   */
  async deleteWarehous(): Promise<void> {
    return this.client.delete('https://marketplace-api.wildberries.ru/api/v3/warehouses/{warehouseId}');
  }

  /**
   * Список контактов
   *
   * Метод возвращает список контактов, привязанных к [складу продавца](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1warehouses/get). <br> Только для складов с типом доставки `3` — доставка курьером WB (DBW). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для следующих методов DBW: <ul> <li>получение и обновление списка контактов</li> <li>получение и удаление метаданных</li> <li>методы сборочных заданий</li> </ul> | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getWarehousesContact();
  console.log(result);
   */
  async getWarehousesContact(): Promise<{ contacts?: { comment?: string; phone?: string }[] }> {
    return this.client.get<{ contacts?: { comment?: string; phone?: string }[] }>('https://marketplace-api.wildberries.ru/api/v3/dbw/warehouses/{warehouseId}/contacts');
  }

  /**
   * Обновить список контактов
   *
   * Метод обновляет список контактов [склада продавца](/openapi/work-with-products#tag/Sklady-prodavca/paths/~1api~1v3~1warehouses/get). <div class="description_important"> Список контактов перезаписывается при обновлении. Поэтому в запросе нужно передать <strong>все</strong> параметры списка контактов, в том числе те, которые вы не собираетесь обновлять. </div> Только для складов с типом доставки `3` — курьером WB (DBW). <br><br> К складу можно добавить максимум 5 контактов. Чтобы удалить контакты, отправьте пустой массив `contacts`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для следующих методов DBW: <ul> <li>получение и обновление списка контактов</li> <li>получение и удаление метаданных</li> <li>методы сборочных заданий</li> </ul> | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | </div>
   *
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateWarehousesContact({});
   */
  async updateWarehousesContact(data: StoreContactRequestBody): Promise<void> {
    return this.client.put('https://marketplace-api.wildberries.ru/api/v3/dbw/warehouses/{warehouseId}/contacts', data);
  }

  // ============================================================================
  // User-Friendly CRUD Operations
  // ============================================================================
  // These methods provide better naming and documentation for common operations.
  // They wrap the auto-generated methods above with improved developer experience.

  /**
   * Create new product cards with descriptions and characteristics
   *
   * Creates product cards in the Wildberries marketplace catalog. This operation
   * is processed **asynchronously** - a 200 OK response means the request was queued,
   * not that products were created successfully.
   *
   * **Important Notes:**
   * - Request is queued for async processing
   * - Check error list endpoint if 200 OK but some cards fail: `/content/v2/cards/error/list`
   * - Dimensions in centimeters, weight in kilograms
   * - Barcodes auto-generated if not provided
   *
   * **Limits:**
   * - Max 100 unified cards (imtID) per request
   * - Max 30 cards per imtID
   * - Max 10MB request size
   *
   * **Rate Limit:** 10 requests/min, 6 second interval
   *
   * @param data - Product creation request with subjectID and variants
   * @returns Promise with creation response (check error field for failures)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429) - automatically retried
   * @throws {ValidationError} When required fields missing (400/422)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
   *
   * const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
   *
   * // Create a complete product card
   * const result = await sdk.products.createProduct({
   *   subjectID: 105,  // Category ID from getCategories
   *   variants: [{
   *     vendorCode: 'VENDOR-001',  // Required: Your article ID
   *     brand: 'My Brand',
   *     title: 'Example Product',
   *     description: 'Detailed product description (1000-5000 chars)...',
   *     dimensions: {
   *       length: 10,        // cm
   *       width: 5,          // cm
   *       height: 2,         // cm
   *       weightBrutto: 0.5  // kg
   *     },
   *     sizes: [{
   *       techSize: 'XL',
   *       wbSize: '52',
   *       skus: ['1234567890123']  // Barcode (auto-generated if omitted)
   *     }],
   *     characteristics: [
   *       { id: 1, value: ['Red'] },     // From getCharacteristics
   *       { id: 2, value: ['Cotton'] }
   *     ]
   *   }]
   * });
   *
   * if (result.error) {
   *   console.error('Creation failed:', result.errorText);
   *   // Check /content/v2/cards/error/list for details
   * } else {
   *   console.log('Product queued for creation');
   * }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sozdanie-kartochek-tovarov}
   */
  async createProduct(data: CreateProductRequest): Promise<CreateProductResponse> {
    return this.client.post<CreateProductResponse>(
      'https://content-api.wildberries.ru/content/v2/cards/upload',
      [data],
      { rateLimitKey: 'products.postContentCardsUpload' }
    );
  }

  /**
   * Get list of product cards with filtering and cursor-based pagination
   *
   * Returns product cards from your catalog with optional filters and pagination.
   * For large catalogs (>100 products), use cursor-based pagination with updatedAt and nmID.
   *
   * **Important Notes:**
   * - Excludes products in trash (use createCardsTrash to get those)
   * - Cursor-based pagination for >100 products
   * - Max 100 products per page
   * - **When called without parameters, returns only the first page (up to 100 products)**
   * - For large catalogs (>100 products), use `getAllProducts()` helper method or implement pagination manually
   *
   * **Rate Limit:** 100 requests/min, 600ms interval
   *
   * @param filters - Optional filtering and pagination parameters. If omitted, returns first page only (up to 100 products).
   * @returns Promise with product cards array and pagination cursor
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429) - automatically retried
   * @throws {ValidationError} When filter parameters invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get first page (up to 100 products) - WARNING: For large catalogs, use getAllProducts()
   * const firstPage = await sdk.products.listProducts();
   * console.log(`First page: ${firstPage.cards?.length} products`);
   * console.log(`Total available: ${firstPage.cursor?.total ?? 'unknown'}`);
   *
   * // Get first page of products with photos
   * const page1 = await sdk.products.listProducts({
   *   filter: {
   *     withPhoto: 1,              // Only with photos
   *     brands: ['My Brand']       // Filter by brand
   *   },
   *   cursor: { limit: 100 }       // Max 100 per page
   * });
   *
   * console.log(`Found ${page1.cursor?.total} products`);
   * page1.cards?.forEach(card => {
   *   console.log(`${card.nmID}: ${card.title}`);
   * });
   *
   * // Get next page using cursor
   * if (page1.cursor?.updatedAt && page1.cursor?.nmID) {
   *   const page2 = await sdk.products.listProducts({
   *     filter: { withPhoto: 1, brands: ['My Brand'] },
   *     cursor: {
   *       limit: 100,
   *       updatedAt: page1.cursor.updatedAt,  // From previous response
   *       nmID: page1.cursor.nmID             // From previous response
   *     }
   *   });
   *   console.log(`Page 2: ${page2.cards?.length} more products`);
   * }
   *
   * // Search by vendor code or nmID
   * const searchResult = await sdk.products.listProducts({
   *   filter: { textSearch: 'VENDOR-001' }
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Kartochki-tovarov}
   */
  async listProducts(filters?: ProductListRequest): Promise<ProductListResponse> {
    // Ensure settings object is always sent, even when filters is undefined
    // API requires settings object in request body
    return this.client.post<ProductListResponse>(
      'https://content-api.wildberries.ru/content/v2/get/cards/list',
      { settings: filters || {} },
      { rateLimitKey: 'products.postContentGetCardsList' }
    );
  }

  /**
   * Get all product cards with automatic pagination
   *
   * Automatically handles cursor-based pagination to retrieve all products,
   * even for large catalogs (>100 products). This method makes multiple API
   * calls as needed to fetch all pages.
   *
   * **Important Notes:**
   * - Automatically paginates through all pages
   * - Respects rate limits (100 req/min, 600ms interval)
   * - For very large catalogs (10,000+ products), this may take several minutes
   * - Consider using `listProducts()` with manual pagination for better control
   * - Excludes products in trash (use createCardsTrash to get those)
   *
   * **Rate Limit:** 100 requests/min, 600ms interval (automatically handled)
   *
   * @param filters - Optional filtering parameters (pagination handled automatically)
   * @param options - Optional configuration
   * @param options.maxProducts - Maximum number of products to fetch (default: unlimited). Use to limit large catalogs.
   * @returns Promise with all product cards array
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429) - automatically retried
   * @throws {ValidationError} When filter parameters invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get all products (automatically paginates)
   * const allProducts = await sdk.products.getAllProducts();
   * console.log(`Total products: ${allProducts.length}`);
   *
   * // Get all products with filters
   * const productsWithPhotos = await sdk.products.getAllProducts({
   *   filter: { withPhoto: 1 }
   * });
   * console.log(`Products with photos: ${productsWithPhotos.length}`);
   *
   * // Limit to first 500 products (useful for large catalogs)
   * const limitedProducts = await sdk.products.getAllProducts(
   *   { filter: { brands: ['My Brand'] } },
   *   { maxProducts: 500 }
   * );
   * ```
   *
   * @see {@link listProducts} For manual pagination control
   */
  async getAllProducts(
    filters?: Omit<ProductListRequest, 'cursor'>,
    options?: { maxProducts?: number }
  ): Promise<ProductCard[]> {
    const allCards: ProductCard[] = [];
    const maxProducts = options?.maxProducts;
    let cursor: ProductListCursor | undefined = { limit: 100 };
    let pageCount = 0;

    // Build base request (without cursor, we'll add it per page)
    const baseRequest: ProductListRequest = {
      ...filters,
      cursor,
    };

    while (true) {
      // Check if we've reached the limit
      if (maxProducts !== undefined && allCards.length >= maxProducts) {
        break;
      }

      // Make request with current cursor
      const response = await this.listProducts(baseRequest);

      // Add cards from this page
      if (response.cards && response.cards.length > 0) {
        allCards.push(...response.cards);

        // Check if we've reached the limit after adding this page
        if (maxProducts !== undefined && allCards.length >= maxProducts) {
          // Trim to exact limit
          allCards.splice(maxProducts);
          break;
        }
      }

      // Check if there are more pages
      const total = response.cursor?.total ?? 0;
      const hasMore =
        response.cursor?.updatedAt &&
        response.cursor?.nmID &&
        allCards.length < total;

      if (!hasMore) {
        // No more pages or we've got everything
        break;
      }

      // Update cursor for next page
      cursor = {
        limit: 100,
        updatedAt: response.cursor!.updatedAt!,
        nmID: response.cursor!.nmID!,
      };
      baseRequest.cursor = cursor;

      pageCount++;

      // Safety check: prevent infinite loops
      if (pageCount > 1000) {
        // This would be 100,000+ products, something is wrong
        throw new Error(
          'Pagination exceeded 1000 pages. Possible infinite loop or API issue.'
        );
      }
    }

    return allCards;
  }

  /**
   * Update existing product cards
   *
   * **CRITICAL WARNING:** This endpoint **completely replaces** the product card.
   * You MUST send ALL parameters, even unchanged ones. Missing fields will be removed!
   *
   * **Workflow:**
   * 1. Get current product: `const product = await sdk.products.getProductCard(nmID)`
   * 2. Modify desired fields: `product.title = 'New Title'`
   * 3. Send ALL fields: `await sdk.products.updateProduct([product])`
   *
   * **Important Notes:**
   * - Request processed asynchronously (check error list if needed)
   * - Cannot edit: barcodes, photos, video, tags (use separate endpoints)
   * - Can add: additional barcodes to existing products
   * - Sizes require chrtID for existing sizes
   *
   * **Limits:**
   * - Max 3000 cards per request
   * - Max 10MB request size
   *
   * **Rate Limit:** 10 requests/min, 6 second interval
   *
   * @param data - Array of update requests (each with ALL product fields)
   * @returns Promise with update response (check error field for failures)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429) - automatically retried
   * @throws {ValidationError} When required fields missing (400/422)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // GOOD: Get product first, then update with all fields
   * const product = await sdk.products.getProductCard(12345);
   * if (product) {
   *   const updateRequest: UpdateProductRequest = {
   *     nmID: product.nmID!,
   *     vendorCode: product.vendorCode!,
   *     sizes: product.sizes?.map(s => ({
   *       chrtID: s.chrtID,      // Required for existing sizes
   *       techSize: s.techSize,
   *       wbSize: s.wbSize,
   *       skus: s.skus
   *     })) || [],
   *     brand: product.brand,
   *     title: 'Updated Title',  // Changed field
   *     description: product.description,  // Keep unchanged
   *     dimensions: product.dimensions,
   *     characteristics: product.characteristics?.map(c => ({
   *       id: c.id!,
   *       value: c.value
   *     }))
   *   };
   *
   *   const result = await sdk.products.updateProduct([updateRequest]);
   *   if (result.error) {
   *     console.error('Update failed:', result.errorText);
   *   }
   * }
   *
   * // BAD: Only sending changed field - other fields will be lost!
   * // await sdk.products.updateProduct([{
   * //   nmID: 12345,
   * //   vendorCode: 'VENDOR-001',
   * //   sizes: [],
   * //   title: 'Updated Title'  // Other fields missing = they'll be removed!
   * // }]);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Kartochki-tovarov}
   */
  async updateProduct(data: UpdateProductRequest[]): Promise<UpdateProductResponse> {
    return this.client.post<UpdateProductResponse>(
      'https://content-api.wildberries.ru/content/v2/cards/update',
      data,
      { rateLimitKey: 'products.postContentCardsUpdate' }
    );
  }

  /**
   * Move product cards to trash (soft delete)
   *
   * Moves specified product cards to trash. This is a **soft delete** - cards are not
   * permanently removed and can be recovered using the recover endpoint.
   *
   * **Important Notes:**
   * - Soft delete - cards can be recovered before auto-deletion
   * - Auto-deleted after 30 days in trash (nightly Moscow time)
   * - New imtID assigned after moving to trash
   * - Use createCardsRecover to restore deleted cards
   *
   * **Limits:**
   * - Max 1000 nmIDs per request
   *
   * **Rate Limit:** 100 requests/min, 600ms interval
   *
   * @param nmIDs - Array of Wildberries article IDs to delete (max 1000)
   * @returns Promise with delete response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429) - automatically retried
   * @throws {ValidationError} When nmIDs array empty or invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Delete single product
   * await sdk.products.deleteProduct([12345]);
   *
   * // Batch delete multiple products
   * const toDelete = [12345, 12346, 12347];
   * const result = await sdk.products.deleteProduct(toDelete);
   *
   * if (result.error) {
   *   console.error('Deletion failed:', result.errorText);
   * } else {
   *   console.log(`${toDelete.length} products moved to trash`);
   *   console.log('Auto-deletion in 30 days');
   *   console.log('Recover before then using createCardsRecover()');
   * }
   *
   * // View products in trash
   * const trashedProducts = await sdk.products.createCardsTrash({
   *   settings: { cursor: { limit: 100 } }
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Kartochki-tovarov}
   */
  async deleteProduct(nmIDs: number[]): Promise<DeleteProductResponse> {
    return this.client.post<DeleteProductResponse>(
      'https://content-api.wildberries.ru/content/v2/cards/delete/trash',
      { nmIDs },
      { rateLimitKey: 'products.postContentCardsDeleteTrash' }
    );
  }

  /**
   * Get single product card by Wildberries article ID (nmID)
   *
   * Convenience method to retrieve a single product card. This wraps listProducts()
   * with a textSearch filter since the API doesn't provide a direct GET endpoint.
   *
   * **Note:** Wildberries API doesn't have a single-product GET endpoint, so this
   * method searches by nmID and returns the first match.
   *
   * **Rate Limit:** 100 requests/min, 600ms interval (same as listProducts)
   *
   * @param nmID - Wildberries article ID to retrieve
   * @returns Promise with product card or null if not found
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429) - automatically retried
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get product by nmID
   * const product = await sdk.products.getProductCard(12345);
   *
   * if (product) {
   *   console.log('Product found:', product.title);
   *   console.log('Brand:', product.brand);
   *   console.log('Vendor Code:', product.vendorCode);
   *   console.log('Stock:', product.sizes?.length, 'sizes');
   * } else {
   *   console.log('Product not found (may be in trash or deleted)');
   * }
   *
   * // Use for updates (get current state first)
   * const current = await sdk.products.getProductCard(12345);
   * if (current) {
   *   await sdk.products.updateProduct([{
   *     ...current,
   *     title: 'Updated Title'
   *   }]);
   * }
   * ```
   */
  async getProductCard(nmID: number): Promise<ProductCard | null> {
    const response = await this.listProducts({
      filter: { textSearch: nmID.toString() }
    });

    // Find exact match by nmID (textSearch may return multiple results)
    return response.cards?.find(card => card.nmID === nmID) ?? null;
  }

  // ============================================================================
  // Media Management (Story 2.3)
  // ============================================================================

  /**
   * Upload single media file to product card
   *
   * Upload product images or video using multipart/form-data.
   * Each request uploads ONE file.
   *
   * **Media Requirements:**
   * - **Images**: Max 30, min 700×900px, max 32MB, min 65% quality
   * - **Formats**: JPG, PNG, BMP, GIF (static only), WebP
   * - **Video**: Max 1, max 50MB, formats: MOV, MP4
   *
   * **Photo Number Rules:**
   * - Starts at 1 for first photo
   * - For video, always use 1
   * - To add to existing photos, use number > current photo count
   *
   * **Rate Limit:** 100 requests/min, 600ms interval
   *
   * @param nmID - Wildberries article ID
   * @param file - File data (Buffer or Blob)
   * @param photoNumber - Photo position 1-30 (video always 1)
   * @returns Promise with upload response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When file invalid or doesn't meet requirements (400)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * import { readFileSync } from 'fs';
   *
   * // Upload first product image
   * const imageBuffer = readFileSync('product-photo.jpg');
   * await sdk.products.uploadMediaFile(12345, imageBuffer, 1);
   *
   * // Upload additional image (photoNumber 2)
   * const image2 = readFileSync('product-photo-2.jpg');
   * await sdk.products.uploadMediaFile(12345, image2, 2);
   *
   * // Upload video (always photoNumber 1)
   * const videoBuffer = readFileSync('product-video.mp4');
   * await sdk.products.uploadMediaFile(12345, videoBuffer, 1);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Media}
   */
  async uploadMediaFile(nmID: number, file: Buffer | Blob, photoNumber: number): Promise<MediaUploadResponse> {
    const formData = new FormData();
    // Convert Buffer to Blob for FormData compatibility
    const blob = (file instanceof Buffer ? new Blob([file]) : file) as Blob;
    formData.append('uploadfile', blob);

    return this.client.post<MediaUploadResponse>(
      'https://content-api.wildberries.ru/content/v3/media/file',
      formData,
      {
        headers: {
          'X-Nm-Id': nmID.toString(),
          'X-Photo-Number': photoNumber.toString(),
          'Content-Type': 'multipart/form-data'
        },
        rateLimitKey: 'products.uploadMediaFile'
      }
    );
  }

  /**
   * Upload media files to product card via URLs
   *
   * **CRITICAL WARNING:** This method **COMPLETELY REPLACES** all existing media.
   * To add new media, you MUST include both new AND old URLs in the request.
   *
   * **All-or-Nothing:** If ANY file fails validation, NONE of the files upload.
   *
   * **URL Requirements:**
   * - Direct file link (not preview/HTML page)
   * - No authentication required
   * - Must return file content, not text
   *
   * **Media Requirements:**
   * - Max 30 images + 1 video
   * - Images: min 700×900px, max 32MB, min 65% quality (JPG/PNG/BMP/GIF/WebP)
   * - Video: max 50MB (MOV/MP4)
   *
   * **Rate Limit:** 100 requests/min, 600ms interval
   *
   * @param nmID - Wildberries article ID
   * @param mediaURLs - Array of media URLs (max 30 images + 1 video)
   * @returns Promise with upload response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When URLs invalid or media doesn't meet requirements (400)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // BAD - Loses existing media!
   * await sdk.products.uploadMediaByURLs(12345, [
   *   'https://example.com/new-photo.jpg'
   * ]);
   *
   * // GOOD - Preserves existing media
   * const existingMedia = await sdk.products.getMediaList(12345);
   * await sdk.products.uploadMediaByURLs(12345, [
   *   ...existingMedia,                    // Keep old media
   *   'https://example.com/new-photo.jpg'  // Add new media
   * ]);
   *
   * // Upload complete media set
   * await sdk.products.uploadMediaByURLs(12345, [
   *   'https://example.com/product-main.jpg',
   *   'https://example.com/product-side.jpg',
   *   'https://example.com/product-back.jpg',
   *   'https://example.com/product-video.mp4'
   * ]);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Media}
   */
  async uploadMediaByURLs(nmID: number, mediaURLs: string[]): Promise<MediaUploadResponse> {
    return this.client.post<MediaUploadResponse>(
      'https://content-api.wildberries.ru/content/v3/media/save',
      { nmId: nmID, data: mediaURLs },
      { rateLimitKey: 'products.uploadMediaByURLs' }
    );
  }

  /**
   * Get list of media URLs for a product
   *
   * Convenience method that retrieves product card and extracts media URLs.
   *
   * **Note:** Wildberries API doesn't have a dedicated media list endpoint,
   * so this wraps getProductCard() and returns the photos array.
   *
   * **Rate Limit:** 100 requests/min, 600ms interval (same as getProductCard)
   *
   * @param nmID - Wildberries article ID
   * @returns Promise with array of media URLs (empty if no media)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get current media
   * const mediaURLs = await sdk.products.getMediaList(12345);
   * console.log(`Product has ${mediaURLs.length} media files`);
   *
   * // Add new media while preserving existing
   * const existing = await sdk.products.getMediaList(12345);
   * await sdk.products.uploadMediaByURLs(12345, [
   *   ...existing,
   *   'https://example.com/new-photo.jpg'
   * ]);
   * ```
   */
  async getMediaList(nmID: number): Promise<string[]> {
    const product = await this.getProductCard(nmID);
    return product?.photos?.map(p => p.big ?? '').filter(Boolean) ?? [];
  }

  // ============================================================================
  // Pricing Management (Story 2.3)
  // ============================================================================

  /**
   * Set prices and discounts for products (async processing)
   *
   * **CRITICAL:** This operation is **asynchronous**. A 200 OK response means the task
   * was queued, NOT that prices were updated. You must poll `getPricingTaskStatus()`
   * to verify when pricing changes are applied.
   *
   * **Pricing Constraints:**
   * - Prices must be **integers only** (whole numbers, no decimals)
   * - Discounts: 0-99%
   * - Price and discount cannot both be empty
   *
   * **Quarantine Warning:**
   * If new price with discount is ≥3x lower than old price, it goes to
   * [quarantine](https://seller.wildberries.ru/instructions/ru/ru/material/price-quarantine)
   * and the old price continues until you fix it.
   *
   * **Limits:**
   * - Max 1000 products per request
   *
   * **Rate Limit:** 10 requests per 6 seconds, 600ms interval
   *
   * @param updates - Array of pricing updates (max 1000)
   * @returns Promise with task ID for status polling
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When prices invalid (decimals) or discounts out of range (400)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Update pricing for products
   * const task = await sdk.products.updatePricing([
   *   { nmID: 12345, price: 2999, discount: 15 },
   *   { nmID: 67890, price: 1499, discount: 10 }
   * ]);
   *
   * console.log('Pricing task created:', task.uploadID);
   *
   * // Poll task status until complete
   * let status;
   * do {
   *   await new Promise(resolve => setTimeout(resolve, 2000));
   *   status = await sdk.products.getPricingTaskStatus(task.uploadID);
   *   console.log('Status:', status.status);
   * } while (status.status === 'processing');
   *
   * if (status.status === 'completed') {
   *   console.log('Prices updated successfully!');
   *   const pricing = await sdk.products.getPricing([12345, 67890]);
   *   console.log('New pricing:', pricing);
   * }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   */
  async updatePricing(updates: PricingUpdate[]): Promise<PricingTaskResponse> {
    return this.client.post<PricingTaskResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/upload/task',
      { data: updates },
      { rateLimitKey: 'products.updatePricing' }
    );
  }

  /**
   * Get current pricing for one or more products
   *
   * Retrieves prices, discounts, promo codes, and WB Club discounts.
   *
   * **Note:** Single nmID uses GET, multiple nmIDs use POST (handled automatically).
   *
   * **Rate Limit:** 10 requests per 6 seconds
   *
   * @param nmIDOrIDs - Single nmID or array of nmIDs
   * @returns Promise with pricing information array
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get pricing for single product
   * const pricing = await sdk.products.getPricing(12345);
   * console.log('Price:', pricing[0].price);
   * console.log('Discount:', pricing[0].discount, '%');
   *
   * // Get pricing for multiple products
   * const bulkPricing = await sdk.products.getPricing([12345, 67890]);
   * bulkPricing.forEach(p => {
   *   console.log(`Product ${p.nmID}: ${p.price} ${p.currency}`);
   *   const finalPrice = p.price * (1 - p.discount / 100);
   *   console.log(`  Final price: ${finalPrice.toFixed(2)}`);
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   */
  async getPricing(nmIDOrIDs: number | number[]): Promise<PricingInfo[]> {
    if (Array.isArray(nmIDOrIDs)) {
      // POST for multiple products
      const response = await this.client.post<GetPricingResponse>(
        'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
        { nmIDs: nmIDOrIDs },
        { rateLimitKey: 'products.getPricing' }
      );
      return response.data;
    } else {
      // GET for single product
      const response = await this.client.get<GetPricingResponse>(
        'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
        {
          params: { filterNmID: nmIDOrIDs },
          rateLimitKey: 'products.getPricing'
        }
      );
      return response.data;
    }
  }

  /**
   * Get status of pricing update task
   *
   * Poll this endpoint after `updatePricing()` to check if prices were applied.
   *
   * **Status Values:**
   * - `pending` - Task queued, not started
   * - `processing` - Task in progress
   * - `completed` - All prices updated successfully
   * - `failed` - Task failed, check error details
   *
   * **Rate Limit:** 10 requests per 6 seconds
   *
   * @param uploadID - Task ID from updatePricing() response
   * @returns Promise with task status
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Start pricing update
   * const task = await sdk.products.updatePricing([
   *   { nmID: 12345, price: 2999, discount: 15 }
   * ]);
   *
   * // Poll until complete with exponential backoff
   * let delay = 1000;
   * let status;
   *
   * do {
   *   await new Promise(resolve => setTimeout(resolve, delay));
   *   status = await sdk.products.getPricingTaskStatus(task.uploadID);
   *   if (status.status === 'processing') {
   *     delay = Math.min(delay * 1.5, 10000);
   *   }
   * } while (status.status === 'processing');
   *
   * if (status.status === 'completed') {
   *   console.log('Pricing updated!');
   * }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   */
  async getPricingTaskStatus(uploadID: string): Promise<PricingTaskStatusResponse> {
    return this.client.get<PricingTaskStatusResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/history/tasks',
      {
        params: { uploadID },
        rateLimitKey: 'products.getPricingTaskStatus'
      }
    );
  }

  // ============================================================================
  // Warehouse and Stock Management (Story 2.4)
  // ============================================================================

  /**
   * Get list of Wildberries warehouses for FBS binding
   *
   * Returns all WB warehouses/offices that can be bound to seller warehouses for
   * FBS (Fulfillment by Seller) fulfillment. You must get a WB office ID from
   * this method before creating a seller warehouse.
   *
   * **Use Case:**
   * - Required before creating seller warehouse (need `officeId`)
   * - Shows available WB warehouses for FBS model
   * - Contains warehouse location, cargo type, and delivery type info
   *
   * **Rate Limit:** 300 requests/min, 200ms interval, 20 burst
   *
   * @returns Promise with array of WB warehouses
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get available WB warehouses
   * const wbOffices = await sdk.products.getWBOffices();
   *
   * console.log(`Found ${wbOffices.length} WB warehouses`);
   * wbOffices.forEach(office => {
   *   console.log(`Office ${office.id}: ${office.name}`);
   *   console.log(`  Location: ${office.city}, ${office.address}`);
   *   console.log(`  Cargo Type: ${office.cargoType} (1=МГТ, 2=СГТ, 3=КГТ+)`);
   *   console.log(`  Delivery Type: ${office.deliveryType} (1=FBS, 2=DBS)`);
   * });
   *
   * // Use office ID to create seller warehouse
   * const newWarehouse = await sdk.products.createWarehouse(
   *   'Склад Коледино',
   *   wbOffices[0].id  // Bind to first available WB office
   * );
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   */
  async getWBOffices(): Promise<Office[]> {
    return this.client.get<Office[]>(
      'https://marketplace-api.wildberries.ru/api/v3/offices',
      { rateLimitKey: 'products.getWBOffices' }
    );
  }

  /**
   * Get list of seller's warehouses
   *
   * Returns all seller warehouses with bindings to WB offices. Used for managing
   * stock locations and FBS fulfillment.
   *
   * **Use Case:**
   * - View all configured seller warehouses
   * - Get warehouse IDs for stock management operations
   * - Check warehouse bindings to WB offices
   *
   * **Rate Limit:** 300 requests/min, 200ms interval, 20 burst
   *
   * @returns Promise with array of seller warehouses
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get seller's warehouse list
   * const warehouses = await sdk.products.getWarehouses();
   *
   * console.log(`You have ${warehouses.length} warehouses`);
   * warehouses.forEach(warehouse => {
   *   console.log(`Warehouse ${warehouse.id}: ${warehouse.name}`);
   *   console.log(`  Bound to WB Office: ${warehouse.officeId}`);
   *   console.log(`  Cargo Type: ${warehouse.cargoType}`);
   *   console.log(`  Processing: ${warehouse.isProcessing}`);
   *   console.log(`  Deleting: ${warehouse.isDeleting}`);
   * });
   *
   * // Use warehouse ID for stock management
   * const stock = await sdk.products.getStock(
   *   warehouses[0].id,
   *   ['BARCODE123']
   * );
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   */
  async getWarehouses(): Promise<Warehouse[]> {
    return this.client.get<Warehouse[]>(
      'https://marketplace-api.wildberries.ru/api/v3/warehouses',
      { rateLimitKey: 'products.getWarehouses' }
    );
  }

  /**
   * Create seller warehouse bound to WB office
   *
   * Creates a new seller warehouse and binds it to a Wildberries office for FBS
   * (Fulfillment by Seller) model.
   *
   * **CRITICAL Constraints:**
   * - Name: 1-200 characters
   * - Cannot bind WB office already in use (409 error)
   * - Office binding enables FBS fulfillment
   *
   * **Rate Limit:** 300 requests/min, 200ms interval, 20 burst
   *
   * @param name - Warehouse name (1-200 characters)
   * @param officeId - WB office/warehouse ID from getWBOffices()
   * @returns Promise with new warehouse ID
   * @throws {ValidationError} When name invalid or office already bound (409)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get available WB offices
   * const offices = await sdk.products.getWBOffices();
   * console.log(`Selected: ${offices[0].name} (ID: ${offices[0].id})`);
   *
   * // Create seller warehouse
   * try {
   *   const newWarehouse = await sdk.products.createWarehouse(
   *     'Склад Коледино',
   *     offices[0].id
   *   );
   *   console.log(`Warehouse created with ID: ${newWarehouse.id}`);
   * } catch (error) {
   *   if (error.statusCode === 409) {
   *     console.error('Office already bound to another warehouse');
   *   }
   *   throw error;
   * }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   */
  async createWarehouse(name: string, officeId: number): Promise<{ id: number }> {
    // Validate name length
    if (!name || name.length < 1 || name.length > 200) {
      throw new ValidationError('Warehouse name must be 1-200 characters');
    }

    // Validate officeId
    if (!officeId || officeId < 1) {
      throw new ValidationError('Office ID must be a positive integer');
    }

    return this.client.post<{ id: number }>(
      'https://marketplace-api.wildberries.ru/api/v3/warehouses',
      { name, officeId },
      { rateLimitKey: 'products.createWarehouse' }
    );
  }

  /**
   * Update seller warehouse details
   *
   * Updates warehouse name and/or WB office binding.
   *
   * **IMPORTANT:**
   * - Office binding can only be changed once per 24 hours
   * - Cannot reuse WB office already bound to another warehouse
   *
   * **Rate Limit:** 300 requests/min, 200ms interval, 20 burst
   *
   * @param warehouseId - Seller warehouse ID
   * @param name - New warehouse name (1-200 chars)
   * @param officeId - New WB office ID (can change max once/day)
   * @returns Promise<void> - 204 on success
   * @throws {ValidationError} When warehouse not found (404) or office conflict (409)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Update warehouse name
   * await sdk.products.updateWarehouse(
   *   123,
   *   'Склад Москва Обновлённый',
   *   456  // Same or different office (max once/day)
   * );
   *
   * console.log('Warehouse updated successfully');
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   */
  async updateWarehouse(warehouseId: number, name: string, officeId: number): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/warehouses/${warehouseId}`,
      { name, officeId },
      { rateLimitKey: 'products.updateWarehouse' }
    );
  }

  /**
   * Delete seller warehouse
   *
   * Removes warehouse from seller's list and unbinds WB office for reuse.
   *
   * **Rate Limit:** 300 requests/min, 200ms interval, 20 burst
   *
   * @param warehouseId - Warehouse ID to delete
   * @returns Promise<void> - 204 on success
   * @throws {NotFoundError} When warehouse doesn't exist (404)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Delete warehouse
   * await sdk.products.deleteWarehouse(123);
   * console.log('Warehouse deleted (WB office unbound for reuse)');
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   */
  async deleteWarehouse(warehouseId: number): Promise<void> {
    return this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/warehouses/${warehouseId}`,
      { rateLimitKey: 'products.deleteWarehouse' }
    );
  }

  /**
   * Get stock levels for products at warehouse
   *
   * Retrieves current stock quantities for specified SKUs at a warehouse.
   *
   * **Constraints:**
   * - Batch size: 1-1000 SKUs
   *
   * **Rate Limit:** 300 requests/min, 200ms interval, 20 burst
   *
   * @param warehouseId - Warehouse ID
   * @param skus - Array of product barcodes (1-1000 SKUs)
   * @returns Promise with array of stock info
   * @throws {ValidationError} When SKU array invalid or warehouse not found
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get stock for multiple products
   * const stocks = await sdk.products.getStock(
   *   123,
   *   ['BARCODE123', 'BARCODE456', 'BARCODE789']
   * );
   *
   * stocks.forEach(stock => {
   *   console.log(`SKU: ${stock.sku}, Stock: ${stock.amount}`);
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca}
   */
  async getStock(warehouseId: number, skus: string[]): Promise<StockInfo[]> {
    // Validate SKU array
    if (skus.length < 1 || skus.length > 1000) {
      throw new ValidationError('SKUs array must contain 1-1000 items');
    }

    const response = await this.client.post<{ stocks: StockInfo[] }>(
      `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
      { skus },
      { rateLimitKey: 'products.getStock' }
    );

    return response.stocks;
  }

  /**
   * Update stock quantities for products (user-friendly wrapper)
   *
   * Updates stock levels for multiple SKUs at a warehouse.
   *
   * **CRITICAL:**
   * - Parameter names NOT validated! Incorrect names = silent failure with 200 OK
   * - Correct field names: `stocks` (array), `sku` (string), `amount` (number)
   *
   * **Constraints:**
   * - Max 1000 SKUs per request
   * - Amount: 0-100,000 per SKU
   *
   * **409 Errors (count as 5 requests!):**
   * - DBS/FBS warehouse restrictions
   * - Cargo type warehouse restrictions (LCL, ODC, CD+)
   * - Warehouse processing in progress
   *
   * **Rate Limit:** 300 requests/min, 200ms interval, 20 burst
   *
   * @param warehouseId - Warehouse ID
   * @param updates - Array of stock updates (SKU + amount, 1-1000 items)
   * @returns Promise<void> - 204 on success
   * @throws {ValidationError} When amounts invalid (0-100,000) or warehouse not found
   * @throws {ConflictError} 409 for warehouse restrictions (DBS/FBS/cargo type conflicts)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Update stock for multiple products
   * await sdk.products.updateStockLevels(123, [
   *   { sku: 'BARCODE123', amount: 100 },
   *   { sku: 'BARCODE456', amount: 50 },
   *   { sku: 'BARCODE789', amount: 200 }
   * ]);
   *
   * console.log('Stock updated for 3 products');
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca}
   */
  async updateStockLevels(warehouseId: number, updates: StockUpdate[]): Promise<void> {
    // Validate updates array
    if (updates.length < 1 || updates.length > 1000) {
      throw new ValidationError('Stock updates array must contain 1-1000 items');
    }

    // Validate each amount
    for (const update of updates) {
      if (update.amount < 0 || update.amount > 100000) {
        throw new ValidationError(`Stock amount must be 0-100000, got ${update.amount} for SKU ${update.sku}`);
      }
    }

    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
      { stocks: updates },
      { rateLimitKey: 'products.updateStock' }
    );
  }

  /**
   * Delete stock records for products (user-friendly wrapper)
   *
   * **IRREVERSIBLE:** Deleted stock must be re-uploaded to resume sales.
   * No undo functionality available.
   *
   * **Constraints:**
   * - Batch size: 1-1000 SKUs
   *
   * **409 Errors (count as 5 requests!):**
   * - Warehouse processing in progress
   *
   * **Rate Limit:** 300 requests/min, 200ms interval, 20 burst
   *
   * @param warehouseId - Warehouse ID
   * @param skus - Array of barcodes to delete (1-1000 SKUs)
   * @returns Promise<void> - 204 on success
   * @throws {NotFoundError} 404 if SKUs not found in warehouse
   * @throws {ConflictError} 409 if warehouse processing in progress
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // WARNING: This is irreversible!
   * await sdk.products.deleteStockRecords(123, ['BARCODE789']);
   * console.log('Stock deleted (IRREVERSIBLE - must re-upload to resume sales)');
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca}
   */
  async deleteStockRecords(warehouseId: number, skus: string[]): Promise<void> {
    // Validate SKU array
    if (skus.length < 1 || skus.length > 1000) {
      throw new ValidationError('SKUs array must contain 1-1000 items');
    }

    return this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
      { skus },
      { rateLimitKey: 'products.deleteStock' }
    );
  }

}