/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/02-products.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  BrandsResponse,
  ClubDisc,
  GetContentTagsResponse,
  GetDirectoryColorsResponse,
  GetDirectoryCountriesResponse,
  GetParentAllResponse,
  Goods,
  GoodsBufferResponse,
  GoodsFilterByNmResponse,
  GoodsFilterResponse,
  GoodsHistoryResponse,
  Office,
  QuarantineGoodsResponse,
  RequestMoveNmsImtConn,
  RequestMoveNmsImtDisconn,
  RequestPublicViewerPublicErrorsTableListV2,
  ResponseCardCreate,
  ResponseContentError,
  ResponsePublicViewerPublicErrorsTableListV2,
  SizeGoodsBody,
  SizeGoodsResponse,
  StoreContactRequestBody,
  TaskBufferResponse,
  TaskHistoryResponse,
  UploadTaskResponse,
  Warehouse,
} from '../../types/products.types';

export class ProductsModule {
  constructor(private client: BaseClient) {}

  /**
   * Родительские категории товаров
   *
   * Returns parent category names and IDs for product card creation (e.g., Electronics, Household chemicals).
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Parent categories list
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getParentAll({ locale: 'ru' });
   * console.log(result.data); // Parent categories array
   * ```
   */
  async getParentAll(options?: { locale?: string }): Promise<GetParentAllResponse> {
    return this.client.get<GetParentAllResponse>(
      'https://content-api.wildberries.ru/content/v2/object/parent/all',
      {
        params: options,
        rateLimitKey: 'products.contentObjectParentAll',
      }
    );
  }

  /**
   * Список предметов
   *
   * Returns parent category names and their subjects with IDs (e.g., category "Toys" contains "Kaleidoscopes", "Dolls", "Balls").
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @param [options.name] - Subject name filter
   * @param [options.limit] - Number of items to return
   * @param [options.offset] - Items offset
   * @param [options.parentID] - Parent category ID filter
   * @returns List of subjects with their parent categories
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getObjectAll({ parentID: 306, locale: 'ru', limit: 50 });
   * console.log(result.data); // [{ subjectID, parentID, subjectName, parentName }]
   * ```
   */
  async getObjectAll(options?: {
    locale?: string;
    name?: string;
    limit?: number;
    offset?: number;
    parentID?: number;
  }): Promise<{
    data?: { subjectID?: number; parentID?: number; subjectName?: string; parentName?: string }[];
    error?: boolean;
    errorText?: string;
    additionalErrors?: string;
  }> {
    return this.client.get<{
      data?: { subjectID?: number; parentID?: number; subjectName?: string; parentName?: string }[];
      error?: boolean;
      errorText?: string;
      additionalErrors?: string;
    }>('https://content-api.wildberries.ru/content/v2/object/all', {
      params: options,
      rateLimitKey: 'products.contentObjectAll',
    });
  }

  /**
   * Характеристики предмета
   *
   * Returns characteristic parameters for a subject: names, data types, units of measure, etc.
   * Use separate methods for Color, Gender, Country, Season, VAT, and TNVED values.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param subjectId - ID предмета
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Subject characteristics list
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getObjectCharc(105, { locale: 'ru' });
   * console.log(result.data); // [{ charcID, name, required, unitName, charcType }]
   * ```
   */
  async getObjectCharc(
    subjectId: number,
    options?: { locale?: string }
  ): Promise<{
    data?: {
      charcID?: number;
      subjectName?: string;
      subjectID?: number;
      name?: string;
      required?: boolean;
      unitName?: string;
      maxCount?: number;
      popular?: boolean;
      charcType?: number;
    }[];
    error?: boolean;
    errorText?: string;
    additionalErrors?: string;
  }> {
    return this.client.get<{
      data?: {
        charcID?: number;
        subjectName?: string;
        subjectID?: number;
        name?: string;
        required?: boolean;
        unitName?: string;
        maxCount?: number;
        popular?: boolean;
        charcType?: number;
      }[];
      error?: boolean;
      errorText?: string;
      additionalErrors?: string;
    }>(`https://content-api.wildberries.ru/content/v2/object/charcs/${subjectId}`, {
      params: options,
      rateLimitKey: 'products.contentObjectCharcs',
    });
  }

  /**
   * Цвет
   *
   * Returns possible values for the "Color" product characteristic.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Available color values
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getDirectoryColors({ locale: 'ru' });
   * console.log(result.data); // Available color values
   * ```
   */
  async getDirectoryColors(options?: { locale?: string }): Promise<GetDirectoryColorsResponse> {
    return this.client.get<GetDirectoryColorsResponse>(
      'https://content-api.wildberries.ru/content/v2/directory/colors',
      {
        params: options,
        rateLimitKey: 'products.contentDirectoryColors',
      }
    );
  }

  /**
   * Пол
   *
   * Returns possible values for the "Gender" product characteristic.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Available gender values
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getDirectoryKinds({ locale: 'ru' });
   * console.log(result.data); // ['Мужской', 'Женский', 'Унисекс']
   * ```
   */
  async getDirectoryKinds(options?: {
    locale?: string;
  }): Promise<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{
      data?: string[];
      error?: boolean;
      errorText?: string;
      additionalErrors?: string;
    }>('https://content-api.wildberries.ru/content/v2/directory/kinds', {
      params: options,
      rateLimitKey: 'products.contentDirectoryKinds',
    });
  }

  /**
   * Страна производства
   *
   * Returns possible values for the "Country of manufacture" product characteristic.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Available country values
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getDirectoryCountries({ locale: 'ru' });
   * console.log(result.data); // Available country values
   * ```
   */
  async getDirectoryCountries(options?: {
    locale?: string;
  }): Promise<GetDirectoryCountriesResponse> {
    return this.client.get<GetDirectoryCountriesResponse>(
      'https://content-api.wildberries.ru/content/v2/directory/countries',
      {
        params: options,
        rateLimitKey: 'products.contentDirectoryCountries',
      }
    );
  }

  /**
   * Сезон
   *
   * Returns possible values for the "Season" product characteristic.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Available season values
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getDirectorySeasons({ locale: 'ru' });
   * console.log(result.data); // ['Лето', 'Зима', 'Демисезон', 'Всесезон']
   * ```
   */
  async getDirectorySeasons(options?: {
    locale?: string;
  }): Promise<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{
      data?: string[];
      error?: boolean;
      errorText?: string;
      additionalErrors?: string;
    }>('https://content-api.wildberries.ru/content/v2/directory/seasons', {
      params: options,
      rateLimitKey: 'products.contentDirectorySeasons',
    });
  }

  /**
   * Ставка НДС
   *
   * Returns possible values for the "VAT rate" product characteristic.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Available VAT rate values
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getDirectoryVat({ locale: 'ru' });
   * console.log(result.data); // Available VAT rate values
   * ```
   */
  async getDirectoryVat(options?: {
    locale?: string;
  }): Promise<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.get<{
      data?: string[];
      error?: boolean;
      errorText?: string;
      additionalErrors?: string;
    }>('https://content-api.wildberries.ru/content/v2/directory/vat', {
      params: options,
      rateLimitKey: 'products.contentDirectoryVat',
    });
  }

  /**
   * ТНВЭД-код
   *
   * Returns list of TNVED codes by subject ID and optional code fragment search.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param options.subjectID - Subject ID (required)
   * @param [options.search] - TNVED code fragment to search
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns TNVED codes with KIZ marking flag
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getDirectoryTnved({ subjectID: 105, search: 6403 });
   * console.log(result.data); // [{ tnved: '6403919100', isKiz: true }]
   * ```
   */
  async getDirectoryTnved(options?: {
    subjectID: number;
    search?: number;
    locale?: string;
  }): Promise<{
    data?: { tnved?: string; isKiz?: boolean }[];
    error?: boolean;
    errorText?: string;
    additionalErrors?: string;
  }> {
    return this.client.get<{
      data?: { tnved?: string; isKiz?: boolean }[];
      error?: boolean;
      errorText?: string;
      additionalErrors?: string;
    }>('https://content-api.wildberries.ru/content/v2/directory/tnved', {
      params: options,
      rateLimitKey: 'products.contentDirectoryTnved',
    });
  }

  /**
   * Бренды
   *
   * Метод возвращает список брендов по ID предмета.
   * Используйте курсорную пагинацию с параметром `next` для получения всех результатов.
   *
   * Rate limit: 1 запрос в секунду, всплеск 5
   *
   * @readonly
   * @param subjectId - ID предмета
   * @param [next] - Курсор пагинации из предыдущего ответа
   * @returns Пагинированный список брендов с общим количеством
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Kategorii-predmety-i-harakteristiki}
   * @example
   * ```typescript
   * // Получить первую страницу брендов для предмета 1234
   * const result = await sdk.products.getBrands(1234);
   * console.log(`Всего брендов: ${result.total}`);
   *
   * // Пагинация по всем брендам
   * let next: number | undefined;
   * do {
   *   const page = await sdk.products.getBrands(1234, next);
   *   page.brands.forEach(b => console.log(b.name));
   *   next = page.next;
   * } while (next);
   * ```
   */
  async getBrands(subjectId: number, next?: number): Promise<BrandsResponse> {
    return this.client.get<BrandsResponse>(
      'https://content-api.wildberries.ru/api/content/v1/brands',
      {
        params: { subjectId, ...(next !== undefined && { next }) },
        rateLimitKey: 'products.brands',
      }
    );
  }

  /**
   * Список ярлыков
   *
   * Returns all seller tags for grouping and filtering products.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @returns Seller tags list
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getContentTags();
   * console.log(result.data); // Seller tags array
   * ```
   */
  async getContentTags(): Promise<GetContentTagsResponse> {
    return this.client.get<GetContentTagsResponse>(
      'https://content-api.wildberries.ru/content/v2/tags',
      {
        rateLimitKey: 'products.contentTags',
      }
    );
  }

  /**
   * Создание ярлыка
   *
   * Creates a seller tag. Max 15 tags per seller, max 15 characters per tag name.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param data - Tag creation data
   * @param [data.color] - Tag color
   * @param [data.name] - Tag name (max 15 characters)
   * @returns Creation result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createContentTag({ color: '#ff0000', name: 'Sale' });
   * console.log(result);
   * ```
   */
  async createContentTag(data: { color?: string; name?: string }): Promise<ResponseContentError> {
    return this.client.post<ResponseContentError>(
      'https://content-api.wildberries.ru/content/v2/tag',
      data,
      { rateLimitKey: 'products.postContentTag' }
    );
  }

  /**
   * Изменение ярлыка
   *
   * Replaces tag data: name and color.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param id - Числовой ID ярлыка
   * @param data - Tag update data
   * @param [data.color] - New tag color
   * @param [data.name] - New tag name
   * @returns Update result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.updateContentTag(42, { color: '#00ff00', name: 'New Arrivals' });
   * console.log(result);
   * ```
   */
  async updateContentTag(
    id: number,
    data: { color?: string; name?: string }
  ): Promise<ResponseContentError> {
    return this.client.patch<ResponseContentError>(
      `https://content-api.wildberries.ru/content/v2/tag/${id}`,
      data,
      { rateLimitKey: 'products.patchContentTag' }
    );
  }

  /**
   * Удаление ярлыка
   *
   * Deletes a tag from the seller's tag list.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param id - Числовой ID ярлыка
   * @returns Deletion result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.deleteContentTag(42);
   * console.log(result);
   * ```
   */
  async deleteContentTag(id: number): Promise<ResponseContentError> {
    return this.client.delete<ResponseContentError>(
      `https://content-api.wildberries.ru/content/v2/tag/${id}`,
      undefined,
      { rateLimitKey: 'products.deleteContentTag' }
    );
  }

  /**
   * Управление ярлыками в карточке товара
   *
   * Adds or removes tags from a product card. Max 15 tags per card.
   * Removing a tag from a card does not delete it from the seller's tag list.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param data - Tag link data
   * @param [data.nmID] - Product card nomenclature ID
   * @param [data.tagsIDs] - Array of tag IDs to link/unlink
   * @returns Link result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createNomenclatureLink({ nmID: 12345678, tagsIDs: [1, 2, 3] });
   * console.log(result);
   * ```
   */
  async createNomenclatureLink(data: {
    nmID?: number;
    tagsIDs?: number[];
  }): Promise<ResponseContentError> {
    return this.client.post<ResponseContentError>(
      'https://content-api.wildberries.ru/content/v2/tag/nomenclature/link',
      data,
      { rateLimitKey: 'products.postContentTagNomenclatureLink' }
    );
  }

  /**
   * Список карточек товаров
   *
   * Returns a paginated list of product cards. Trashed cards are excluded; use getTrashedCards() instead.
   * Use cursor-based pagination with updatedAt and nmID from the response cursor to fetch more than 100 cards.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param data - Request body with settings, filters, and cursor
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Product cards with pagination cursor
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getCardsList({
   *   settings: {
   *     cursor: { limit: 100 },
   *     filter: { withPhoto: -1 },
   *   },
   * }, { locale: 'ru' });
   * console.log(result.cards); // Product cards array
   * console.log(result.cursor?.total); // Total count
   * ```
   */
  async getCardsList(
    data: {
      settings?: {
        sort?: { ascending?: boolean };
        filter?: {
          withPhoto?: number;
          textSearch?: string;
          tagIDs?: number[];
          allowedCategoriesOnly?: boolean;
          objectIDs?: number[];
          brands?: string[];
          imtID?: number;
        };
        cursor?: { limit?: number; updatedAt?: string; nmID?: number };
      };
    },
    options?: { locale?: string }
  ): Promise<{
    cards?: {
      nmID?: number;
      imtID?: number;
      nmUUID?: string;
      subjectID?: number;
      subjectName?: string;
      vendorCode?: string;
      brand?: string;
      title?: string;
      description?: string;
      needKiz?: boolean;
      photos?: {
        big?: string;
        c246x328?: string;
        c516x688?: string;
        square?: string;
        tm?: string;
      }[];
      video?: string;
      wholesale?: { enabled?: boolean; quantum?: number };
      dimensions?: {
        length?: number;
        width?: number;
        height?: number;
        weightBrutto?: number;
        isValid?: boolean;
      };
      characteristics?: { id?: number; name?: string; value?: unknown }[];
      sizes?: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[];
      tags?: { id?: number; name?: string; color?: string }[];
      createdAt?: string;
      updatedAt?: string;
    }[];
    cursor?: { updatedAt?: string; nmID?: number; total?: number };
  }> {
    // Validate cursor limit (maximum enforced by Wildberries API)
    const MAXIMUM_CARDS_LIMIT = 100;

    if (data.settings?.cursor?.limit) {
      const limit = data.settings.cursor.limit;

      if (limit > MAXIMUM_CARDS_LIMIT) {
        throw new Error(
          `Invalid cursor limit: ${limit}. ` +
            `Maximum allowed is ${MAXIMUM_CARDS_LIMIT} cards per request. ` +
            `Use pagination to fetch all cards. ` +
            `See: https://salacoste.github.io/daytona-wildberries-typescript-sdk/guides/working-with-product-cards#pagination-limit-restrictions`
        );
      }

      if (limit <= 0) {
        throw new Error(
          `Invalid cursor limit: ${limit}. ` +
            `Limit must be a positive integer (recommended: ${MAXIMUM_CARDS_LIMIT}).`
        );
      }
    }

    return this.client.post<{
      cards?: {
        nmID?: number;
        imtID?: number;
        nmUUID?: string;
        subjectID?: number;
        subjectName?: string;
        vendorCode?: string;
        brand?: string;
        title?: string;
        description?: string;
        needKiz?: boolean;
        photos?: {
          big?: string;
          c246x328?: string;
          c516x688?: string;
          square?: string;
          tm?: string;
        }[];
        video?: string;
        wholesale?: { enabled?: boolean; quantum?: number };
        dimensions?: {
          length?: number;
          width?: number;
          height?: number;
          weightBrutto?: number;
          isValid?: boolean;
        };
        characteristics?: { id?: number; name?: string; value?: unknown }[];
        sizes?: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[];
        tags?: { id?: number; name?: string; color?: string }[];
        createdAt?: string;
        updatedAt?: string;
      }[];
      cursor?: { updatedAt?: string; nmID?: number; total?: number };
    }>('https://content-api.wildberries.ru/content/v2/get/cards/list', data, {
      params: options,
      rateLimitKey: 'products.postContentGetCardsList',
    });
  }

  /**
   * Список несозданных карточек товаров с ошибками
   *
   * Returns product cards (drafts) that failed during creation or editing, with error descriptions.
   * Data is returned in batches. Use cursor pagination with updatedAt and batchUUID.
   *
   * Rate limit: 10 req/min, 6s interval, burst 5
   *
   * @param data - Request body with cursor and order settings
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale (e.g., 'ru', 'en')
   * @returns Error list with pagination
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createErrorList(
   *   { cursor: { limit: 100 }, order: { ascending: true } },
   *   { locale: 'ru' }
   * );
   * console.log(result);
   * ```
   */
  async createErrorList(
    data: RequestPublicViewerPublicErrorsTableListV2,
    options?: { locale?: string }
  ): Promise<ResponsePublicViewerPublicErrorsTableListV2> {
    return this.client.post<ResponsePublicViewerPublicErrorsTableListV2>(
      'https://content-api.wildberries.ru/content/v2/cards/error/list',
      data,
      { params: options, rateLimitKey: 'products.postContentCardsErrorList' }
    );
  }

  /**
   * Редактирование карточек товаров
   *
   * Updates product cards. Card is fully overwritten, so all parameters must be sent including unchanged ones.
   * Cannot edit barcodes, photos, video, or tags. Max 3000 cards per request, 10 MB max.
   * Dimensions in cm, weight in kg.
   *
   * Rate limit: 10 req/min, 6s interval, burst 5
   *
   * @param [data] - Array of product cards to update
   * @returns Update result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createCardsUpdate([{
   *   nmID: 12345678,
   *   vendorCode: 'ART-001',
   *   title: 'Updated Product',
   *   sizes: [{ techSize: '42', skus: ['1234567890123'] }],
   *   characteristics: [{ id: 1, value: 'Blue' }],
   * }]);
   * console.log(result);
   * ```
   */
  async createCardsUpdate(
    data?: {
      nmID: number;
      vendorCode: string;
      brand?: string;
      title?: string;
      description?: string;
      dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number };
      characteristics?: { id: number; value: unknown }[];
      sizes: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[];
    }[]
  ): Promise<ResponseCardCreate> {
    return this.client.post<ResponseCardCreate>(
      'https://content-api.wildberries.ru/content/v2/cards/update',
      data,
      { rateLimitKey: 'products.postContentCardsUpdate' }
    );
  }

  /**
   * Объединение и разъединение карточек товаров
   *
   * Merges or splits product cards by imtID. With imtID: merge (max 30 cards, same subject only).
   * Without imtID: split (new imtID generated). Max request size 10 MB.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param [data] - Merge/split request (with or without imtID)
   * @returns Operation result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * // Merge cards under a single imtID
   * const result = await sdk.products.createCardsMovenm({
   *   imtID: 98765,
   *   nmIDs: [12345678, 12345679],
   * });
   * console.log(result);
   * ```
   */
  async createCardsMovenm(
    data?: RequestMoveNmsImtConn | RequestMoveNmsImtDisconn
  ): Promise<ResponseCardCreate> {
    return this.client.post<ResponseCardCreate>(
      'https://content-api.wildberries.ru/content/v2/cards/moveNm',
      data,
      { rateLimitKey: 'products.postContentCardsMoveNm' }
    );
  }

  /**
   * Перенос карточек товаров в корзину
   *
   * Moves product cards to trash. Cards are not deleted and can be recovered.
   * Cards get a new imtID after trashing. Auto-deleted after 30 days.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param data - Request body with nmIDs to trash
   * @param [data.nmIDs] - Array of product card IDs to move to trash
   * @returns Trash operation result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createDeleteTrash({ nmIDs: [12345678, 12345679] });
   * console.log(result);
   * ```
   */
  async createDeleteTrash(data: { nmIDs?: number[] }): Promise<{
    data?: Record<string, never>;
    error?: boolean;
    errorText?: string;
    additionalErrors?: Record<string, never>;
  }> {
    return this.client.post<{
      data?: Record<string, never>;
      error?: boolean;
      errorText?: string;
      additionalErrors?: Record<string, never>;
    }>('https://content-api.wildberries.ru/content/v2/cards/delete/trash', data, {
      rateLimitKey: 'products.postContentCardsDeleteTrash',
    });
  }

  /**
   * Восстановление карточек товаров из корзины
   *
   * Restores product cards from trash. Card retains the imtID assigned when it was trashed.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param data - Request body with nmIDs to recover
   * @param [data.nmIDs] - Array of product card IDs to restore
   * @returns Recovery result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createCardsRecover({ nmIDs: [12345678] });
   * console.log(result);
   * ```
   */
  async createCardsRecover(data: { nmIDs?: number[] }): Promise<{
    data?: Record<string, never>;
    error?: boolean;
    errorText?: string;
    additionalErrors?: Record<string, never>;
  }> {
    return this.client.post<{
      data?: Record<string, never>;
      error?: boolean;
      errorText?: string;
      additionalErrors?: Record<string, never>;
    }>('https://content-api.wildberries.ru/content/v2/cards/recover', data, {
      rateLimitKey: 'products.postContentCardsRecover',
    });
  }

  /**
   * Список карточек товаров в корзине
   *
   * Returns trashed product cards with cursor-based pagination (trashedAt + nmID).
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param data - Request body with settings, cursor, and filter
   * @param [options] - Query parameters
   * @param [options.locale] - Language locale ('ru', 'en', 'zh')
   * @returns Trashed product cards with pagination cursor
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getTrashedCards({
   *   settings: { cursor: { limit: 100 }, filter: { textSearch: 'shoes' } },
   * }, { locale: 'ru' });
   * console.log(result.cards); // Trashed cards array
   * ```
   */
  async getTrashedCards(
    data: {
      settings?: {
        sort?: { ascending?: boolean };
        cursor?: { limit?: number; trashedAt?: string; nmID?: number };
        filter?: { textSearch?: string };
      };
    },
    options?: { locale?: 'ru' | 'en' | 'zh' }
  ): Promise<{
    cards?: {
      nmID?: number;
      vendorCode?: string;
      subjectID?: number;
      subjectName?: string;
      photos?: {
        big?: string;
        c246x328?: string;
        c516x688?: string;
        square?: string;
        tm?: string;
      }[];
      video?: string;
      wholesale?: { enabled?: boolean; quantum?: number };
      sizes?: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[];
      dimensions?: {
        length?: number;
        width?: number;
        height?: number;
        weightBrutto?: number;
        isValid?: boolean;
      };
      characteristics?: { id?: number; name?: string; value?: unknown }[];
      createdAt?: string;
      trashedAt?: string;
    }[];
    cursor?: { trashedAt?: string; nmID?: number; total?: number };
  }> {
    return this.client.post<{
      cards?: {
        nmID?: number;
        vendorCode?: string;
        subjectID?: number;
        subjectName?: string;
        photos?: {
          big?: string;
          c246x328?: string;
          c516x688?: string;
          square?: string;
          tm?: string;
        }[];
        video?: string;
        wholesale?: { enabled?: boolean; quantum?: number };
        sizes?: { chrtID?: number; techSize?: string; wbSize?: string; skus?: string[] }[];
        dimensions?: {
          length?: number;
          width?: number;
          height?: number;
          weightBrutto?: number;
          isValid?: boolean;
        };
        characteristics?: { id?: number; name?: string; value?: unknown }[];
        createdAt?: string;
        trashedAt?: string;
      }[];
      cursor?: { trashedAt?: string; nmID?: number; total?: number };
    }>('https://content-api.wildberries.ru/content/v2/get/cards/trash', data, {
      params: options,
      rateLimitKey: 'products.postContentGetCardsTrash',
    });
  }

  /**
   * Лимиты карточек товаров
   *
   * Returns free and paid limits for product card creation.
   * Available cards = (freeLimits + paidLimits) - created cards count.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @returns Card creation limits
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.getCardsLimits();
   * console.log(result.data); // { freeLimits: 1000, paidLimits: 500 }
   * ```
   */
  async getCardsLimits(): Promise<{
    data?: { freeLimits?: number; paidLimits?: number };
    error?: boolean;
    errorText?: string;
    additionalErrors?: string;
  }> {
    return this.client.get<{
      data?: { freeLimits?: number; paidLimits?: number };
      error?: boolean;
      errorText?: string;
      additionalErrors?: string;
    }>('https://content-api.wildberries.ru/content/v2/cards/limits', {
      rateLimitKey: 'products.contentCardsLimits',
    });
  }

  /**
   * Генерация баркодов
   *
   * Generates unique barcodes for product card size creation. Use when you don't have your own barcodes.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param data - Request body
   * @param [data.count] - Number of barcodes to generate
   * @returns Generated barcodes array
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createContentBarcode({ count: 5 });
   * console.log(result.data); // ['1234567890123', '1234567890124', ...]
   * ```
   */
  async createContentBarcode(data: {
    count?: number;
  }): Promise<{ data?: string[]; error?: boolean; errorText?: string; additionalErrors?: string }> {
    return this.client.post<{
      data?: string[];
      error?: boolean;
      errorText?: string;
      additionalErrors?: string;
    }>('https://content-api.wildberries.ru/content/v2/barcodes', data, {
      rateLimitKey: 'products.postContentBarcodes',
    });
  }

  /**
   * Создание карточек товаров
   *
   * Creates product cards asynchronously. Max 100 merged cards (imtID) with 30 cards each per request, 10 MB max.
   * Dimensions in cm, weight in kg. Check error list if 200 response but some cards were not created.
   *
   * Rate limit: 10 req/min, 6s interval, burst 5
   *
   * @param [data] - Array of product card groups to create
   * @returns Creation result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createCardsUpload([{
   *   subjectID: 105,
   *   variants: [{
   *     vendorCode: 'ART-001',
   *     brand: 'MyBrand',
   *     title: 'Product Name',
   *     sizes: [{ techSize: '42', skus: ['1234567890123'] }],
   *     characteristics: [{ id: 1, value: 'Blue' }],
   *   }],
   * }]);
   * console.log(result);
   * ```
   */
  async createCardsUpload(
    data?: {
      subjectID: number;
      variants: {
        brand?: string;
        title?: string;
        description?: string;
        vendorCode: string;
        wholesale?: { enabled?: boolean; quantum?: number };
        dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number };
        sizes?: { techSize?: string; wbSize?: string; price?: number; skus?: string[] }[];
        characteristics?: { id: number; value: unknown }[];
      }[];
    }[]
  ): Promise<ResponseCardCreate> {
    return this.client.post<ResponseCardCreate>(
      'https://content-api.wildberries.ru/content/v2/cards/upload',
      data,
      { rateLimitKey: 'products.postContentCardsUpload' }
    );
  }

  /**
   * Создание карточек товаров с присоединением
   *
   * Creates new product cards and joins them to existing cards by imtID. Async processing, 10 MB max.
   * Dimensions in cm, weight in kg.
   *
   * Rate limit: 10 req/min, 6s interval, burst 5
   *
   * @param [data] - Cards to create and join to existing imtID
   * @returns Creation result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createUploadAdd({
   *   imtID: 98765,
   *   cardsToAdd: [{
   *     vendorCode: 'ART-002',
   *     sizes: [{ techSize: '44', skus: ['1234567890124'] }],
   *     characteristics: [{ id: 1, value: 'Red' }],
   *   }],
   * });
   * console.log(result);
   * ```
   */
  async createUploadAdd(data?: {
    imtID?: number;
    cardsToAdd?: {
      brand?: string;
      vendorCode: string;
      wholesale?: { enabled?: boolean; quantum?: number };
      title?: string;
      description?: string;
      dimensions?: { length?: number; width?: number; height?: number; weightBrutto?: number };
      sizes?: { techSize?: string; wbSize?: string; price?: number; skus?: string[] }[];
      characteristics?: { id: number; value: unknown }[];
    }[];
  }): Promise<ResponseCardCreate> {
    return this.client.post<ResponseCardCreate>(
      'https://content-api.wildberries.ru/content/v2/cards/upload/add',
      data,
      { rateLimitKey: 'products.postContentCardsUploadAdd' }
    );
  }

  /**
   * Загрузить медиафайл
   *
   * Uploads a single media file to a product card. Images: max 30 per card, min 700x900px, max 32MB,
   * formats JPG/PNG/BMP/GIF/WebP. Video: max 1 per card, max 50MB, formats MOV/MP4.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @returns Upload result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createMediaFile();
   * console.log(result);
   * ```
   */
  async createMediaFile(): Promise<{
    data?: Record<string, never>;
    error?: boolean;
    errorText?: string;
    additionalErrors?: Record<string, never>;
  }> {
    return this.client.post<{
      data?: Record<string, never>;
      error?: boolean;
      errorText?: string;
      additionalErrors?: Record<string, never>;
    }>('https://content-api.wildberries.ru/content/v3/media/file', undefined, {
      rateLimitKey: 'products.postContentMediaFile',
    });
  }

  /**
   * Загрузить медиафайлы по ссылкам
   *
   * Uploads media files to a product card via URLs. New files fully replace old ones.
   * Links must be direct file URLs (no auth required). If any file fails validation, none are uploaded.
   *
   * Rate limit: 100 req/min, 600ms interval, burst 5
   *
   * @param data - Request body
   * @param [data.nmId] - Product card nomenclature ID
   * @param [data.data] - Array of direct file URLs
   * @returns Upload result
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products}
   * @example
   * ```typescript
   * const result = await sdk.products.createMediaSave({
   *   nmId: 12345678,
   *   data: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
   * });
   * console.log(result);
   * ```
   */
  async createMediaSave(data: { nmId?: number; data?: string[] }): Promise<{
    data?: Record<string, never>;
    error?: boolean;
    errorText?: string;
    additionalErrors?: Record<string, never>;
  }> {
    return this.client.post<{
      data?: Record<string, never>;
      error?: boolean;
      errorText?: string;
      additionalErrors?: Record<string, never>;
    }>('https://content-api.wildberries.ru/content/v3/media/save', data, {
      rateLimitKey: 'products.postContentMediaSave',
    });
  }

  /**
   * Установить цены и скидки
   *
   * Sets prices and discounts for products. Use createTaskSize() for per-size pricing.
   * Track upload status via getHistoryTasks() and getGoodsTask().
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param data - Goods pricing data
   * @returns Upload task response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.createUploadTask({
   *   data: [{ nmID: 12345678, price: 1500, discount: 10 }],
   * });
   * console.log(result);
   * ```
   */
  async createUploadTask(data: Goods): Promise<UploadTaskResponse> {
    return this.client.post<UploadTaskResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/upload/task',
      data,
      { rateLimitKey: 'products.postUploadTask' }
    );
  }

  /**
   * Установить цены для размеров
   *
   * Sets prices per size for eligible products (editableSizePrice: true).
   * Use createUploadTask() for product-level pricing.
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param data - Size pricing data
   * @returns Upload task response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.createTaskSize({
   *   data: [{ nmID: 12345678, sizeID: 100, price: 2000 }],
   * });
   * console.log(result);
   * ```
   */
  async createTaskSize(data: SizeGoodsBody): Promise<UploadTaskResponse> {
    return this.client.post<UploadTaskResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/upload/task/size',
      data,
      { rateLimitKey: 'products.postUploadTaskSize' }
    );
  }

  /**
   * Установить скидки WB Клуба
   *
   * Sets WB Club subscription discounts for products.
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param data - Club discount data
   * @returns Upload task response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.createTaskClubDiscount({
   *   data: [{ nmID: 12345678, clubDiscount: 15 }],
   * });
   * console.log(result);
   * ```
   */
  async createTaskClubDiscount(data: ClubDisc): Promise<UploadTaskResponse> {
    return this.client.post<UploadTaskResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/upload/task/club-discount',
      data,
      { rateLimitKey: 'products.postUploadTaskClubDiscount' }
    );
  }

  /**
   * Состояние обработанной загрузки
   *
   * Returns processed upload status for prices, size prices, and WB Club discounts.
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param options.uploadID - Upload task ID to check
   * @returns Task history with status
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.getHistoryTasks({ uploadID: 12345 });
   * console.log(result);
   * ```
   */
  async getHistoryTasks(options?: { uploadID: number }): Promise<TaskHistoryResponse> {
    return this.client.get<TaskHistoryResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/history/tasks',
      { params: options, rateLimitKey: 'products.historyTasks' }
    );
  }

  /**
   * Детализация обработанной загрузки
   *
   * Returns per-item details and errors from a processed price/discount upload.
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param options.limit - Number of items to return
   * @param [options.offset] - Items offset
   * @param options.uploadID - Upload task ID
   * @returns Goods history with errors
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.getGoodsTask({ limit: 100, uploadID: 12345 });
   * console.log(result);
   * ```
   */
  async getGoodsTask(options?: {
    limit: number;
    offset?: number;
    uploadID: number;
  }): Promise<GoodsHistoryResponse> {
    return this.client.get<GoodsHistoryResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/history/goods/task',
      { params: options, rateLimitKey: 'products.historyGoodsTask' }
    );
  }

  /**
   * Состояние необработанной загрузки
   *
   * Returns pending upload status (promo calendar discounts not yet applied).
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param options.uploadID - Upload task ID to check
   * @returns Buffer task status
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.getBufferTasks({ uploadID: 12345 });
   * console.log(result);
   * ```
   */
  async getBufferTasks(options?: { uploadID: number }): Promise<TaskBufferResponse> {
    return this.client.get<TaskBufferResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/buffer/tasks',
      { params: options, rateLimitKey: 'products.bufferTasks' }
    );
  }

  /**
   * Детализация необработанной загрузки
   *
   * Returns per-item details and errors from a pending (promo calendar) discount upload.
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param options.limit - Number of items to return
   * @param [options.offset] - Items offset
   * @param options.uploadID - Upload task ID
   * @returns Buffer goods with errors
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.getBufferGoodsTask({ limit: 100, uploadID: 12345 });
   * console.log(result);
   * ```
   */
  async getBufferGoodsTask(options?: {
    limit: number;
    offset?: number;
    uploadID: number;
  }): Promise<GoodsBufferResponse> {
    return this.client.get<GoodsBufferResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/buffer/goods/task',
      { params: options, rateLimitKey: 'products.bufferGoodsTask' }
    );
  }

  /**
   * Получить товары с ценами
   *
   * Returns product pricing info: prices, currency, discounts, WB Club discounts.
   * Use limit/offset pagination for all products, or filterNmID for a single article.
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param options.limit - Number of items to return (max 1000)
   * @param [options.offset] - Items offset for pagination
   * @param [options.filterNmID] - Filter by single article ID
   * @returns Goods with pricing information
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.getGoodsFilter({ limit: 1000, offset: 0 });
   * console.log(result);
   * ```
   */
  async getGoodsFilter(options?: {
    limit: number;
    offset?: number;
    filterNmID?: number;
  }): Promise<GoodsFilterResponse> {
    return this.client.get<GoodsFilterResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
      { params: options, rateLimitKey: 'products.listGoodsFilter' }
    );
  }

  /**
   * Получить товары с ценами по артикулам
   *
   * Returns pricing info for multiple products by article IDs.
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param data - Request body with article IDs
   * @param data.nmIDs - Array of article IDs to fetch pricing for
   * @returns Goods with pricing information filtered by nmIDs
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.createGoodsFilter({ nmIDs: [12345678, 87654321] });
   * console.log(result);
   * ```
   */
  async createGoodsFilter(data: { nmIDs: number[] }): Promise<GoodsFilterByNmResponse> {
    return this.client.post<GoodsFilterByNmResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
      data,
      { rateLimitKey: 'products.postListGoodsFilter' }
    );
  }

  /**
   * Получить размеры товара с ценами
   *
   * Returns per-size pricing info for a single product (only for categories with editableSizePrice: true).
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param options.limit - Number of items to return
   * @param [options.offset] - Items offset
   * @param options.nmID - Product article ID
   * @returns Size-level pricing data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.getSizeNm({ limit: 100, nmID: 12345678 });
   * console.log(result);
   * ```
   */
  async getSizeNm(options?: {
    limit: number;
    offset?: number;
    nmID: number;
  }): Promise<SizeGoodsResponse> {
    return this.client.get<SizeGoodsResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/size/nm',
      { params: options, rateLimitKey: 'products.listGoodsSizeNm' }
    );
  }

  /**
   * Получить товары в карантине
   *
   * Returns quarantined products (price dropped 3x or more). Quarantine does not apply to per-size pricing.
   * Products sell at old price while quarantined. Remove via API or seller dashboard.
   *
   * Rate limit: 10 req/6s, 600ms interval, burst 5
   *
   * @param [options] - Query parameters
   * @param options.limit - Number of items to return
   * @param [options.offset] - Items offset
   * @returns Quarantined goods list
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki}
   * @example
   * ```typescript
   * const result = await sdk.products.getQuarantineGoods({ limit: 100, offset: 0 });
   * console.log(result);
   * ```
   */
  async getQuarantineGoods(options?: {
    limit: number;
    offset?: number;
  }): Promise<QuarantineGoodsResponse> {
    return this.client.get<QuarantineGoodsResponse>(
      'https://discounts-prices-api.wildberries.ru/api/v2/quarantine/goods',
      { params: options, rateLimitKey: 'products.quarantineGoods' }
    );
  }

  /**
   * Получить остатки товаров
   *
   * Returns stock amounts for products at a seller's warehouse. A 409 response counts as 10 requests.
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @param warehouseId - ID склада продавца
   * @param data - Request body with SKUs
   * @param data.skus - Array of SKU barcodes to check
   * @returns Stock amounts per SKU
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.products.getStocks(12345, { skus: ['1234567890123', '1234567890124'] });
   * console.log(result.stocks); // [{ sku: '1234567890123', amount: 50 }]
   * ```
   */
  async getStocks(
    warehouseId: number,
    data: { skus: string[] }
  ): Promise<{ stocks?: { sku?: string; amount?: number }[] }> {
    return this.client.post<{ stocks?: { sku?: string; amount?: number }[] }>(
      `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
      data,
      { rateLimitKey: 'products.postStocks' }
    );
  }

  /**
   * Обновить остатки товаров
   *
   * Updates stock amounts for products at a seller's warehouse. Parameter names are not validated;
   * incorrect names return 204 but do not update stocks. A 409 response counts as 10 requests.
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @param warehouseId - ID склада продавца
   * @param [data] - Stock update data
   * @param data.stocks - Array of SKU/amount pairs
   * @returns void on success (204)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca}
   * @example
   * ```typescript
   * await sdk.products.updateStock(12345, {
   *   stocks: [{ sku: '1234567890123', amount: 100 }],
   * });
   * ```
   */
  async updateStock(
    warehouseId: number,
    data?: { stocks: { sku?: string; amount?: number }[] }
  ): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
      data,
      { rateLimitKey: 'products.putStocks' }
    );
  }

  /**
   * Удалить остатки товаров
   *
   * Irreversibly deletes stock records. Must re-upload stocks to resume sales.
   * A 409 response counts as 10 requests.
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @param warehouseId - ID склада продавца
   * @param data - Request body with SKUs to delete
   * @param [data.skus] - Array of SKU barcodes to delete
   * @returns void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Ostatki-na-skladah-prodavca}
   * @example
   * ```typescript
   * await sdk.products.deleteStock(12345, { skus: ['1234567890123'] });
   * ```
   */
  async deleteStock(warehouseId: number, data: { skus?: string[] }): Promise<void> {
    return this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
      data,
      { rateLimitKey: 'products.deleteStocks' }
    );
  }

  /**
   * Получить список складов WB
   *
   * Returns all WB warehouses for binding to seller warehouses (FBS model).
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @returns Array of WB office/warehouse locations
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.products.offices();
   * console.log(result); // [{ id: 1, name: 'Коледино', ... }]
   * ```
   */
  async offices(): Promise<Office[]> {
    return this.client.get<Office[]>('https://marketplace-api.wildberries.ru/api/v3/offices', {
      rateLimitKey: 'products.offices',
    });
  }

  /**
   * Получить список складов продавца
   *
   * Returns all seller warehouses. Use warehouse IDs to manage stock.
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @returns Array of seller warehouses
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.products.warehouses();
   * console.log(result); // [{ id: 12345, name: 'Main Warehouse', officeId: 1 }]
   * ```
   */
  async warehouses(): Promise<Warehouse[]> {
    return this.client.get<Warehouse[]>(
      'https://marketplace-api.wildberries.ru/api/v3/warehouses',
      { rateLimitKey: 'products.warehouses' }
    );
  }

  /**
   * Создать склад продавца
   *
   * Creates a seller warehouse bound to a WB office for FBS fulfillment.
   * Cannot bind a WB warehouse that is already in use.
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @param data - Warehouse creation data
   * @param data.name - Warehouse name
   * @param data.officeId - WB office ID to bind
   * @returns Created warehouse with ID
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.products.createWarehouse({ name: 'Main Warehouse', officeId: 1 });
   * console.log(result.id); // New warehouse ID
   * ```
   */
  async createWarehouse(data: { name: string; officeId: number }): Promise<{ id?: number }> {
    return this.client.post<{ id?: number }>(
      'https://marketplace-api.wildberries.ru/api/v3/warehouses',
      data,
      { rateLimitKey: 'products.postWarehouses' }
    );
  }

  /**
   * Обновить склад продавца
   *
   * Updates seller warehouse data. WB office binding can be changed once per day.
   * Cannot bind a WB warehouse that is already in use.
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @param warehouseId - ID склада продавца
   * @param data - Warehouse update data
   * @param data.name - Updated warehouse name
   * @param data.officeId - Updated WB office ID
   * @returns void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   * @example
   * ```typescript
   * await sdk.products.updateWarehouse(12345, { name: 'Updated Warehouse', officeId: 2 });
   * ```
   */
  async updateWarehouse(
    warehouseId: number,
    data: { name: string; officeId: number }
  ): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/warehouses/${warehouseId}`,
      data,
      { rateLimitKey: 'products.putWarehouses' }
    );
  }

  /**
   * Удалить склад продавца
   *
   * Deletes a seller warehouse from the list.
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @param warehouseId - ID склада продавца
   * @returns void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   * @example
   * ```typescript
   * await sdk.products.deleteWarehouse(12345);
   * ```
   */
  async deleteWarehouse(warehouseId: number): Promise<void> {
    return this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/warehouses/${warehouseId}`,
      undefined,
      { rateLimitKey: 'products.deleteWarehouses' }
    );
  }

  /**
   * Список контактов
   *
   * Returns contacts linked to a seller warehouse. Only for warehouses with delivery type 3 (DBW - WB courier).
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @param warehouseId - ID склада продавца
   * @returns Warehouse contacts list
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   * @example
   * ```typescript
   * const result = await sdk.products.getWarehousesContact(12345);
   * console.log(result.contacts); // [{ phone: '+79001234567', comment: 'Main' }]
   * ```
   */
  async getWarehousesContact(
    warehouseId: number
  ): Promise<{ contacts?: { comment?: string; phone?: string }[] }> {
    return this.client.get<{ contacts?: { comment?: string; phone?: string }[] }>(
      `https://marketplace-api.wildberries.ru/api/v3/dbw/warehouses/${warehouseId}/contacts`,
      { rateLimitKey: 'products.dbwWarehousesContacts' }
    );
  }

  /**
   * Обновить список контактов
   *
   * Overwrites the contact list for a seller warehouse (DBW delivery type 3 only).
   * Send ALL contacts including unchanged ones. Max 5 contacts. Send empty array to delete all.
   *
   * Rate limit: 300 req/min, 200ms interval, burst 20
   *
   * @param warehouseId - ID склада продавца
   * @param data - Contact list data (overwrites existing)
   * @returns void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/work-with-products#tag/Sklady-prodavca}
   * @example
   * ```typescript
   * await sdk.products.updateWarehousesContact(12345, {
   *   contacts: [{ phone: '+79001234567', comment: 'Main contact' }],
   * });
   * ```
   */
  async updateWarehousesContact(warehouseId: number, data: StoreContactRequestBody): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/dbw/warehouses/${warehouseId}/contacts`,
      data,
      { rateLimitKey: 'products.putDbwWarehousesContacts' }
    );
  }
}
