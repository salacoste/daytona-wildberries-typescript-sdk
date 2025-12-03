/**
 * Auto-generated types for general module
 * Generated from: wildberries_api_doc/01-general.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 */

/**
 * Response structure for ping endpoint
 */
export interface PingResponse {
  /** Timestamp запроса */
  TS?: string;
  /** Статус подключения */
  Status?: 'OK';
}

/**
 * News item structure from news endpoint
 */
export interface NewsItem {
  /** ID новости */
  id: number;
  /** Заголовок новости */
  header: string;
  /** Дата и время публикации новости */
  date: string;
  /** Текст новости */
  content: string;
  /** Теги новости */
  types: NewsTag[];
}

/**
 * News tag structure
 */
export interface NewsTag {
  /** ID тега */
  id: number;
  /** Название тега */
  name: string;
}

/**
 * Response structure for news endpoint
 */
export interface NewsResponse {
  /** Массив новостей */
  data: NewsItem[];
}

/**
 * Parameters for news endpoint request
 */
export interface NewsRequestParams {
  /** Дата, от которой необходимо выдать новости (format: YYYY-MM-DD) */
  from?: string;
  /** ID новости, начиная с которой нужно получить список */
  fromID?: number;
}

/**
 * Response structure for seller info endpoint
 */
export interface SellerInfoResponse {
  /** Наименование продавца */
  name?: string;
  /** Уникальный ID продавца на Wildberries */
  sid?: string;
  /** Торговое наименование продавца */
  tradeMark?: string;
}
