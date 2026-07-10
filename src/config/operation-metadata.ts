/**
 * Operation Metadata Registry
 *
 * This module provides metadata for SDK operations extracted from Swagger/OpenAPI specifications.
 * The metadata includes:
 * - `readonly`: Whether the operation is safe to retry (from x-readonly-method)
 * - `category`: API category for the operation (from x-category)
 * - `rateLimitKey`: Key used for rate limiting configuration
 *
 * **Use Cases:**
 * - Retry logic: Only retry operations marked as readonly=true
 * - Request routing: Route requests based on category to correct API domain
 * - Monitoring: Track operations by category for analytics
 *
 * @packageDocumentation
 * @module config/operation-metadata
 */

/**
 * Metadata for a single SDK operation
 *
 * @example
 * ```typescript
 * import { operationMetadata, type OperationMetadata } from 'daytona-wildberries-typescript-sdk';
 *
 * const pingMeta = operationMetadata['general.ping'];
 * if (pingMeta.readonly) {
 *   // Safe to retry on transient failures
 * }
 * ```
 */
export interface OperationMetadata {
  /**
   * Whether the operation is readonly (safe to retry)
   *
   * Operations marked as readonly=true are idempotent and safe to retry
   * on transient failures (network errors, timeouts, 5xx errors).
   *
   * Operations with readonly=false may have side effects (create, update, delete)
   * and should NOT be automatically retried.
   */
  readonly: boolean;

  /**
   * API category for the operation
   *
   * Categories map to different API domains:
   * - 'all': Can be used with any API domain (e.g., /ping)
   * - 'content': https://content-api.wildberries.ru
   * - 'marketplace': https://marketplace-api.wildberries.ru
   * - 'discountsandprices': https://discounts-prices-api.wildberries.ru
   * - 'commonapi': https://common-api.wildberries.ru
   * - 'usermanagement': https://user-management-api.wildberries.ru
   */
  category: string;

  /**
   * Rate limit key for the operation
   *
   * This key is used to look up rate limit configuration in the rate limits registry.
   * Format: '{module}.{operationName}'
   */
  rateLimitKey: string;
}

/**
 * Registry of operation metadata for all SDK operations
 *
 * Keys follow the pattern: '{module}.{methodName}'
 *
 * @example
 * ```typescript
 * import { operationMetadata, isOperationReadonly, getOperationCategory } from 'daytona-wildberries-typescript-sdk';
 *
 * // Direct access
 * const meta = operationMetadata['products.getParentAll'];
 * console.log(meta.readonly); // true
 * console.log(meta.category); // 'content'
 *
 * // Helper functions
 * if (isOperationReadonly('products.getParentAll')) {
 *   // Safe to retry
 * }
 *
 * const category = getOperationCategory('products.getParentAll');
 * // Returns 'content'
 * ```
 */
export const operationMetadata: Record<string, OperationMetadata> = {
  // ============================================================================
  // General Module (from 01-general.yaml)
  // ============================================================================

  /**
   * Ping - connectivity check
   * x-readonly-method: true, x-category: all
   */
  'general.ping': {
    readonly: true,
    category: 'all',
    rateLimitKey: 'general.ping',
  },

  /**
   * Get news - portal seller news
   * x-readonly-method: true, x-category: commonapi
   */
  'general.news': {
    readonly: true,
    category: 'commonapi',
    rateLimitKey: 'general.communicationsNews',
  },

  /**
   * Get seller info - seller name and profile ID
   * x-readonly-method: true, x-category: commonapi
   */
  'general.sellerInfo': {
    readonly: true,
    category: 'commonapi',
    rateLimitKey: 'general.sellerInfo',
  },

  // ============================================================================
  // Products Module - Categories, Subjects, Characteristics (from 02-products.yaml)
  // ============================================================================

  /**
   * Get parent categories
   * x-readonly-method: true, x-category: content
   */
  'products.getParentAll': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentObjectParentAll',
  },

  /**
   * Get all subjects (categories with items)
   * x-readonly-method: true, x-category: content
   */
  'products.getObjectAll': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentObjectAll',
  },

  /**
   * Get subject characteristics
   * x-readonly-method: true, x-category: content
   */
  'products.getObjectCharc': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentObjectCharcs',
  },

  /**
   * Get color directory
   * x-readonly-method: true, x-category: content
   */
  'products.getDirectoryColors': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentDirectoryColors',
  },

  /**
   * Get gender/kind directory
   * x-readonly-method: true, x-category: content
   */
  'products.getDirectoryKinds': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentDirectoryKinds',
  },

  /**
   * Get countries directory
   * x-readonly-method: true, x-category: content
   */
  'products.getDirectoryCountries': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentDirectoryCountries',
  },

  /**
   * Get seasons directory
   * x-readonly-method: true, x-category: content
   */
  'products.getDirectorySeasons': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentDirectorySeasons',
  },

  /**
   * Get VAT rates directory
   * x-readonly-method: true, x-category: content
   */
  'products.getDirectoryVat': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentDirectoryVat',
  },

  /**
   * Get TNVED codes directory
   * x-readonly-method: true, x-category: content
   */
  'products.getDirectoryTnved': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentDirectoryTnved',
  },

  /**
   * Get brands by subject
   * x-readonly-method: true, x-category: content
   */
  'products.getBrands': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.brands',
  },

  // ============================================================================
  // Products Module - Tags (Labels)
  // ============================================================================

  /**
   * Get content tags list
   * x-readonly-method: true, x-category: content
   */
  'products.getContentTags': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentTags',
  },

  /**
   * Create content tag
   * x-readonly-method: false, x-category: content
   */
  'products.createContentTag': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentTag',
  },

  /**
   * Update content tag
   * x-readonly-method: false, x-category: content
   */
  'products.updateContentTag': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.patchContentTag',
  },

  /**
   * Delete content tag
   * x-readonly-method: false, x-category: content
   */
  'products.deleteContentTag': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.deleteContentTag',
  },

  /**
   * Link tags to nomenclature
   * x-readonly-method: false, x-category: content
   */
  'products.createNomenclatureLink': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentTagNomenclatureLink',
  },

  // ============================================================================
  // Products Module - Product Cards
  // ============================================================================

  /**
   * Get product cards list
   * x-readonly-method: true, x-category: content
   */
  'products.getCardsList': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.postContentGetCardsList',
  },

  /**
   * Get error list for failed card creation
   * x-readonly-method: true, x-category: content
   */
  'products.createErrorList': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.postContentCardsErrorList',
  },

  /**
   * Update product cards
   * x-readonly-method: false, x-category: content
   */
  'products.createCardsUpdate': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentCardsUpdate',
  },

  /**
   * Merge/split product cards by imtID
   * x-readonly-method: false, x-category: content
   */
  'products.createCardsMovenm': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentCardsMoveNm',
  },

  /**
   * Move cards to trash
   * x-readonly-method: false, x-category: content
   */
  'products.createDeleteTrash': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentCardsDeleteTrash',
  },

  /**
   * Recover cards from trash
   * x-readonly-method: false, x-category: content
   */
  'products.createCardsRecover': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentCardsRecover',
  },

  /**
   * Get trashed cards list
   * x-readonly-method: true, x-category: content
   */
  'products.getTrashedCards': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.postContentGetCardsTrash',
  },

  /**
   * Get card creation limits
   * x-readonly-method: true, x-category: content
   */
  'products.getCardsLimits': {
    readonly: true,
    category: 'content',
    rateLimitKey: 'products.contentCardsLimits',
  },

  /**
   * Generate barcodes
   * x-readonly-method: false, x-category: content
   */
  'products.createContentBarcode': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentBarcodes',
  },

  /**
   * Create product cards (upload)
   * x-readonly-method: false, x-category: content
   */
  'products.createCardsUpload': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentCardsUpload',
  },

  /**
   * Create cards and join to existing imtID
   * x-readonly-method: false, x-category: content
   */
  'products.createUploadAdd': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentCardsUploadAdd',
  },

  // ============================================================================
  // Products Module - Media
  // ============================================================================

  /**
   * Upload media file
   * x-readonly-method: false, x-category: content
   */
  'products.createMediaFile': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentMediaFile',
  },

  /**
   * Upload media by URLs
   * x-readonly-method: false, x-category: content
   */
  'products.createMediaSave': {
    readonly: false,
    category: 'content',
    rateLimitKey: 'products.postContentMediaSave',
  },

  // ============================================================================
  // Products Module - Prices and Discounts
  // ============================================================================

  /**
   * Set prices and discounts
   * x-readonly-method: false, x-category: discountsandprices
   */
  'products.createUploadTask': {
    readonly: false,
    category: 'discountsandprices',
    rateLimitKey: 'products.postUploadTask',
  },

  /**
   * Set prices per size
   * x-readonly-method: false, x-category: discountsandprices
   */
  'products.createTaskSize': {
    readonly: false,
    category: 'discountsandprices',
    rateLimitKey: 'products.postUploadTaskSize',
  },

  /**
   * Set WB Club discounts
   * x-readonly-method: false, x-category: discountsandprices
   */
  'products.createTaskClubDiscount': {
    readonly: false,
    category: 'discountsandprices',
    rateLimitKey: 'products.postUploadTaskClubDiscount',
  },

  /**
   * Get processed upload status (history tasks)
   * x-readonly-method: true, x-category: discountsandprices
   */
  'products.getHistoryTasks': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'products.historyTasks',
  },

  /**
   * Get processed upload details (goods history)
   * x-readonly-method: true, x-category: discountsandprices
   */
  'products.getGoodsTask': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'products.historyGoodsTask',
  },

  /**
   * Get pending upload status (buffer tasks)
   * x-readonly-method: true, x-category: discountsandprices
   */
  'products.getBufferTasks': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'products.bufferTasks',
  },

  /**
   * Get pending upload details (buffer goods)
   * x-readonly-method: true, x-category: discountsandprices
   */
  'products.getBufferGoodsTask': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'products.bufferGoodsTask',
  },

  /**
   * Get goods with prices (filter)
   * x-readonly-method: true, x-category: discountsandprices
   */
  'products.getGoodsFilter': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'products.listGoodsFilter',
  },

  /**
   * Get goods with prices by nmIDs
   * x-readonly-method: false, x-category: discountsandprices
   * Note: POST method but conceptually a read operation
   */
  'products.createGoodsFilter': {
    readonly: false,
    category: 'discountsandprices',
    rateLimitKey: 'products.postListGoodsFilter',
  },

  /**
   * Get size prices for a product
   * x-readonly-method: true, x-category: discountsandprices
   */
  'products.getSizeNm': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'products.listGoodsSizeNm',
  },

  /**
   * Get quarantined goods
   * x-readonly-method: true, x-category: discountsandprices
   */
  'products.getQuarantineGoods': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'products.quarantineGoods',
  },

  // ============================================================================
  // Products Module - Stocks (Marketplace)
  // ============================================================================

  /**
   * Get stocks for a warehouse
   * x-readonly-method: false, x-category: marketplace
   * Note: POST method but conceptually a read operation
   */
  'products.getStocks': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'products.postStocks',
  },

  /**
   * Update stocks for a warehouse
   * x-readonly-method: false, x-category: marketplace
   */
  'products.updateStock': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'products.putStocks',
  },

  /**
   * Delete stocks for a warehouse
   * x-readonly-method: false, x-category: marketplace
   */
  'products.deleteStock': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'products.deleteStocks',
  },

  // ============================================================================
  // Products Module - Warehouses (Marketplace)
  // ============================================================================

  /**
   * Get WB offices/warehouses
   * x-readonly-method: true, x-category: marketplace
   */
  'products.offices': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'products.offices',
  },

  /**
   * Get seller warehouses
   * x-readonly-method: true, x-category: marketplace
   */
  'products.warehouses': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'products.warehouses',
  },

  /**
   * Create seller warehouse
   * x-readonly-method: false, x-category: marketplace
   */
  'products.createWarehouse': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'products.postWarehouses',
  },

  /**
   * Update seller warehouse
   * x-readonly-method: false, x-category: marketplace
   */
  'products.updateWarehouse': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'products.putWarehouses',
  },

  /**
   * Delete seller warehouse
   * x-readonly-method: false, x-category: marketplace
   */
  'products.deleteWarehouse': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'products.deleteWarehouses',
  },

  /**
   * Get warehouse contacts
   * x-readonly-method: true, x-category: marketplace
   */
  'products.getWarehousesContact': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'products.dbwWarehousesContacts',
  },

  /**
   * Update warehouse contacts
   * x-readonly-method: false, x-category: marketplace
   */
  'products.updateWarehousesContact': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'products.putDbwWarehousesContacts',
  },

  // ============================================================================
  // User Management Module (from 01-general.yaml)
  // ============================================================================

  /**
   * Create user invitation
   * x-readonly-method: false, x-category: usermanagement
   */
  'userManagement.createInvite': {
    readonly: false,
    category: 'usermanagement',
    rateLimitKey: 'userManagement.createInvite',
  },

  /**
   * Get users list
   * x-readonly-method: true, x-category: usermanagement
   */
  'userManagement.getUsers': {
    readonly: true,
    category: 'usermanagement',
    rateLimitKey: 'userManagement.getUsers',
  },

  /**
   * Update user access
   * x-readonly-method: false, x-category: usermanagement
   */
  'userManagement.updateUserAccess': {
    readonly: false,
    category: 'usermanagement',
    rateLimitKey: 'userManagement.updateUserAccess',
  },

  /**
   * Delete user
   * x-readonly-method: false, x-category: usermanagement
   */
  'userManagement.deleteUser': {
    readonly: false,
    category: 'usermanagement',
    rateLimitKey: 'userManagement.deleteUser',
  },

  // ============================================================================
  // Orders FBS Module (from 03-orders-fbs.yaml)
  // ============================================================================

  // Passes (Пропуска FBS)

  /**
   * Get list of warehouses that require a pass
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getPassesOffices': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.passesOffices',
  },

  /**
   * Get list of seller passes
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.passes': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.passes',
  },

  /**
   * Create a seller pass
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.createPass': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postPasses',
  },

  /**
   * Update a seller pass
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updatePass': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.putPasses',
  },

  /**
   * Delete a seller pass
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.deletePass': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.deletePasses',
  },

  // Assembly Tasks (Сборочные задания FBS)

  /**
   * Get list of new assembly tasks
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getOrdersNew': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.ordersNew',
  },

  /**
   * Get assembly tasks information
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.orders': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.orders',
  },

  /**
   * Get assembly task statuses (deprecated)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.createOrdersStatu': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postOrdersStatus',
  },

  /**
   * Get assembly task statuses (new replacement method)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getOrderStatuses': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postOrdersStatus',
  },

  /**
   * Get all assembly tasks requiring reshipment
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getOrdersReshipment': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.suppliesOrdersReshipment',
  },

  /**
   * Cancel an assembly task
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updateOrdersCancel': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.patchOrdersCancel',
  },

  /**
   * Get assembly task stickers
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.createOrdersSticker': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postOrdersStickers',
  },

  /**
   * Get cross-border assembly task stickers
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.createStickersCrossBorder': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postOrdersStickersCrossBorder',
  },

  /**
   * Get cross-border sticker links (deprecated)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.createOrdersExternalSticker': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postFilesOrdersExternalStickers',
  },

  /**
   * Get cross-border assembly task status history
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.createStatusHistory': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postOrdersStatusHistory',
  },

  /**
   * Get orders with client information (Turkey cross-border)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.createOrdersClient': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postOrdersClient',
  },

  // Metadata (Метаданные FBS)

  /**
   * Get metadata for multiple assembly tasks (bulk)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getOrdersMetaBulk': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postMarketplaceOrdersMeta',
  },

  /**
   * Get metadata for an assembly task (deprecated)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getOrdersMeta': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postMarketplaceOrdersMeta',
  },

  /**
   * Delete assembly task metadata
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.deleteOrdersMeta': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.deleteOrdersMeta',
  },

  /**
   * Attach marking codes (SGTIN) to an assembly task
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updateMetaSgtin': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.putOrdersMetaSgtin',
  },

  /**
   * Attach UIN to an assembly task
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updateMetaUin': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.putOrdersMetaUin',
  },

  /**
   * Attach IMEI to an assembly task
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updateMetaImei': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.putOrdersMetaImei',
  },

  /**
   * Attach GTIN to an assembly task
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updateMetaGtin': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.putOrdersMetaGtin',
  },

  /**
   * Attach expiration date to an assembly task
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updateMetaExpiration': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.putOrdersMetaExpiration',
  },

  /**
   * Attach customs declaration number to an assembly task
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.setCustomsDeclaration': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.putOrdersMetaCustomsDeclaration',
  },

  // Supplies (Поставки FBS)

  /**
   * Get list of supplies
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.supplies': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.supplies',
  },

  /**
   * Create a new supply
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.createSupply': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postSupplies',
  },

  /**
   * Add an assembly task to a supply (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updateSuppliesOrder': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.patchSuppliesOrders',
  },

  /**
   * Add multiple assembly tasks to a supply (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.addOrdersToSupply': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.patchMarketplaceSuppliesOrders',
  },

  /**
   * Get supply information
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getSupply': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.getSupply',
  },

  /**
   * Delete a supply
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.deleteSupply': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.deleteSupplies',
  },

  /**
   * Get assembly tasks in a supply (deprecated)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getSuppliesOrder': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.suppliesOrders',
  },

  /**
   * Get assembly task IDs in a supply
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getSupplyOrderIds': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.getMarketplaceSuppliesOrderIds',
  },

  /**
   * Transfer supply to delivery
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.updateSuppliesDeliver': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.patchSuppliesDeliver',
  },

  /**
   * Get supply QR code
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getSuppliesBarcode': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.suppliesBarcode',
  },

  /**
   * Get list of supply boxes (trbx)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.getSuppliesTrbx': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.suppliesTrbx',
  },

  /**
   * Add boxes to a supply
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.createSuppliesTrbx': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postSuppliesTrbx',
  },

  /**
   * Delete boxes from a supply
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersFBS.deleteSuppliesTrbx': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.deleteSuppliesTrbx',
  },

  /**
   * Get supply box stickers
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersFBS.createTrbxSticker': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-fbs.postSuppliesTrbxStickers',
  },

  // ============================================================================
  // Orders DBS Module (from 04-orders-dbs.yaml)
  // ============================================================================

  // Assembly Tasks (Сборочные задания DBS)

  /**
   * Get list of new DBS assembly tasks
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getNewOrders': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getNewOrders',
  },

  /**
   * Get completed DBS orders with pagination and date filtering
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getOrders': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getOrders',
  },

  /**
   * Get paid delivery group information
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getGroupsInfo': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getGroupsInfo',
  },

  /**
   * Get customer contact information for DBS orders
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getClientInfo': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getClientInfo',
  },

  /**
   * Get B2B buyer information for DBS orders
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getB2BInfo': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getB2BInfo',
  },

  /**
   * Get delivery dates for DBS orders
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getDeliveryDates': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getDeliveryDates',
  },

  // Metadata (Метаданные DBS)

  /**
   * Get order metadata (deprecated)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getMeta': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getMeta',
  },

  /**
   * Delete specific metadata from an order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.deleteMeta': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.deleteMeta',
  },

  /**
   * Delete metadata for multiple orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.deleteMetaBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.deleteMetaBulk',
  },

  /**
   * Set SGTIN marking codes for an order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setSgtin': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setMeta',
  },

  /**
   * Set SGTIN codes for multiple orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setSgtinBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setSgtinBulk',
  },

  /**
   * Set UIN code for an order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setUin': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setMeta',
  },

  /**
   * Set UIN codes for multiple orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setUinBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setUinBulk',
  },

  /**
   * Set IMEI code for an order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setImei': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setMeta',
  },

  /**
   * Set IMEI codes for multiple orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setImeiBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setImeiBulk',
  },

  /**
   * Set GTIN code for an order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setGtin': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setMeta',
  },

  /**
   * Set GTIN codes for multiple orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setGtinBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setGtinBulk',
  },

  /**
   * Set customs declaration for an order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setCustomsDeclaration': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setMeta',
  },

  /**
   * Set customs declaration for multiple orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.setCustomsDeclarationBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.setCustomsDeclarationBulk',
  },

  // Status Management

  /**
   * Get order statuses (deprecated)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getStatuses': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getStatuses',
  },

  /**
   * Get order statuses (bulk)
   * x-readonly-method: true, x-category: marketplace
   */
  'ordersDBS.getStatusesBulk': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.getStatusesBulk',
  },

  /**
   * Confirm order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.confirm': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.confirm',
  },

  /**
   * Confirm orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.confirmBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.confirmBulk',
  },

  /**
   * Deliver order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.deliver': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.deliver',
  },

  /**
   * Deliver orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.deliverBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.deliverBulk',
  },

  /**
   * Receive order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.receive': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.receive',
  },

  /**
   * Receive orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.receiveBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.receiveBulk',
  },

  /**
   * Reject order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.reject': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.reject',
  },

  /**
   * Reject orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.rejectBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.rejectBulk',
  },

  /**
   * Cancel order (deprecated)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.cancel': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.cancel',
  },

  /**
   * Cancel orders (bulk)
   * x-readonly-method: false, x-category: marketplace
   */
  'ordersDBS.cancelBulk': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'orders-dbs.cancelBulk',
  },

  // ============================================================================
  // Orders FBW Module (from 07-orders-fbw.yaml)
  // ============================================================================

  /**
   * Get acceptance coefficients (deprecated - moved to tariffs module)
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.getAcceptanceCoefficients': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.acceptanceCoefficients',
  },

  /**
   * Get acceptance options
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.createAcceptanceOption': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.postAcceptanceOptions',
  },

  /**
   * Get list of warehouses
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.warehouses': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.warehouses',
  },

  /**
   * Get transit tariffs
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.transitTariffs': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.transitTariffs',
  },

  /**
   * Get list of supplies
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.listSupplies': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.postSupplies',
  },

  /**
   * Get list of supplies (deprecated alias)
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.createSupply': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.postSupplies',
  },

  /**
   * Get supply details
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.getSupply': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.supplies',
  },

  /**
   * Get supply goods
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.getSuppliesGood': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.suppliesGoods',
  },

  /**
   * Get supply package info
   * x-readonly-method: true, x-category: supplies
   */
  'ordersFBW.getSuppliesPackage': {
    readonly: true,
    category: 'supplies',
    rateLimitKey: 'orders-fbw.suppliesPackage',
  },

  // ============================================================================
  // Promotion Module (from 08-promotion/*.yaml)
  // ============================================================================

  // --- Campaigns (kampanii.yaml) ---

  /**
   * Get campaign count by status
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getPromotionCount': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advPromotionCount',
  },

  /**
   * Get campaign information (POST for filtering)
   * x-readonly-method: true, x-category: advert
   */
  'promotion.createPromotionAdvert': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvPromotionAdverts',
  },

  /**
   * Get campaigns V2 (replacement for deprecated endpoints)
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvertsV2': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advertsV2',
  },

  // --- Campaign Creation (sozdanie-kampaniy.yaml) ---

  /**
   * Get configuration values
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvConfig': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advConfig',
  },

  /**
   * Get minimum bids for product cards (V0)
   * x-readonly-method: true, x-category: advert
   */
  'promotion.createBidsMin': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvBidsMin',
  },

  /**
   * Get minimum bids for product cards (V1)
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getBidsMinV2': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.bidsMinV1',
  },

  /**
   * Create unified bid campaign (V1)
   * x-readonly-method: false, x-category: advert
   */
  'promotion.createAdvSaveAd': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvSaveAd',
  },

  /**
   * Create campaign (V2)
   * x-readonly-method: false, x-category: advert
   */
  'promotion.createSeacatSaveAd': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvSeacatSaveAd',
  },

  /**
   * Get subjects for campaigns
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getSupplierSubjects': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advSupplierSubjects',
  },

  /**
   * Get product cards for campaigns
   * x-readonly-method: true, x-category: advert
   */
  'promotion.createSupplierNm': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvSupplierNms',
  },

  // --- Campaign Management (upravlenie-kampaniyami.yaml) ---

  /**
   * Delete campaign
   * x-readonly-method: false, x-category: advert
   */
  'promotion.getAdvDelete': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.advDelete',
  },

  /**
   * Rename campaign
   * x-readonly-method: false, x-category: advert
   */
  'promotion.createAdvRename': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvRename',
  },

  /**
   * Start campaign
   * x-readonly-method: false, x-category: advert
   */
  'promotion.getAdvStart': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.advStart',
  },

  /**
   * Pause campaign
   * x-readonly-method: false, x-category: advert
   */
  'promotion.getAdvPause': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.advPause',
  },

  /**
   * Stop campaign
   * x-readonly-method: false, x-category: advert
   */
  'promotion.getAdvStop': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.advStop',
  },

  /**
   * Update bids (V0)
   * x-readonly-method: false, x-category: advert
   */
  'promotion.updateAdvBid': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.patchAdvBids',
  },

  /**
   * Update placement for manual bid campaigns
   * x-readonly-method: false, x-category: advert
   */
  'promotion.updateAuctionPlacement': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.putAdvAuctionPlacements',
  },

  /**
   * Update product list in campaigns
   * x-readonly-method: false, x-category: advert
   */
  'promotion.updateAuctionNm': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.patchAdvAuctionNms',
  },

  // --- Finances (finansy.yaml) ---

  /**
   * Get promotion balance
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvBalance': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advBalance',
  },

  /**
   * Get campaign budget
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvBudget': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advBudget',
  },

  /**
   * Deposit campaign budget
   * x-readonly-method: false, x-category: advert
   */
  'promotion.createBudgetDeposit': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvBudgetDeposit',
  },

  /**
   * Get expense history
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvUpd': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advUpd',
  },

  /**
   * Get payment history
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvPayments': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advPayments',
  },

  // --- Campaign Parameters (parametry-kampaniy.yaml) ---

  /**
   * Set fixed phrase activity
   * x-readonly-method: false, x-category: advert
   */
  'promotion.getSearchSetPlus': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.advSearchSetPlus',
  },

  /**
   * Set/remove fixed phrases
   * x-readonly-method: false, x-category: advert
   */
  'promotion.createSearchSetPlu': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvSearchSetPlus',
  },

  /**
   * Set/remove minus-phrases for search campaigns
   * x-readonly-method: false, x-category: advert
   */
  'promotion.createSearchSetExcluded': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvSearchSetExcluded',
  },

  /**
   * Get product list for auto campaign
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAutoGetnmtoadd': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advAutoGetnmtoadd',
  },

  // --- Media Campaigns (media.yaml) ---

  /**
   * Get media campaign count
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvCount': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advCount',
  },

  /**
   * Get media campaigns list
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvAdverts': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advAdverts',
  },

  /**
   * Get media campaign info
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvAdvert': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advAdvert',
  },

  // --- Statistics (statistika.yaml) ---

  /**
   * Get campaign full stats (V2)
   * x-readonly-method: true, x-category: advert
   */
  'promotion.createAdvFullstat': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvFullstats',
  },

  /**
   * Get campaign full stats (V3)
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAdvFullstats': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advFullstats',
  },

  /**
   * Get auto campaign stat words
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getAutoStatWords': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advAutoStatWords',
  },

  /**
   * Get stat words for manual bid campaigns
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getStatWords': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.advStatWords',
  },

  /**
   * Get media campaign statistics
   * x-readonly-method: true, x-category: advert
   */
  'promotion.createAdvStat': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.postAdvStats',
  },

  // --- Calendar Promotions (kalendar-aktsiy.yaml) ---

  /**
   * Get promotions list
   * x-readonly-method: true, x-category: discountsandprices
   */
  'promotion.getCalendarPromotions': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'promotion.calendarPromotions',
  },

  /**
   * Get promotion details
   * x-readonly-method: true, x-category: discountsandprices
   */
  'promotion.getPromotionsDetails': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'promotion.calendarPromotionsDetails',
  },

  /**
   * Get nomenclatures for promotion
   * x-readonly-method: true, x-category: discountsandprices
   */
  'promotion.getPromotionsNomenclatures': {
    readonly: true,
    category: 'discountsandprices',
    rateLimitKey: 'promotion.calendarPromotionsNomenclatures',
  },

  /**
   * Add product to promotion
   * x-readonly-method: false, x-category: discountsandprices
   */
  'promotion.createPromotionsUpload': {
    readonly: false,
    category: 'discountsandprices',
    rateLimitKey: 'promotion.postCalendarPromotionsUpload',
  },

  // --- Search Clusters (poiskovye-klastery.yaml) ---

  /**
   * Get normquery statistics
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getNormqueryStats': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.normqueryStats',
  },

  /**
   * Get normquery bids
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getNormqueryBids': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.normqueryGetBids',
  },

  /**
   * Set normquery bids
   * x-readonly-method: false, x-category: advert
   */
  'promotion.setNormqueryBids': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.normquerySetBids',
  },

  /**
   * Delete normquery bids
   * x-readonly-method: false, x-category: advert
   */
  'promotion.deleteNormqueryBids': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.normqueryDeleteBids',
  },

  /**
   * Get normquery minus-phrases
   * x-readonly-method: true, x-category: advert
   */
  'promotion.getNormqueryMinus': {
    readonly: true,
    category: 'advert',
    rateLimitKey: 'promotion.normqueryGetMinus',
  },

  /**
   * Set normquery minus-phrases
   * x-readonly-method: false, x-category: advert
   */
  'promotion.setNormqueryMinus': {
    readonly: false,
    category: 'advert',
    rateLimitKey: 'promotion.normquerySetMinus',
  },

  // ============================================================================
  // Communications Module (from 09-communications/*.yaml)
  // ============================================================================

  // --- Questions (voprosy.yaml) ---

  /**
   * Check for new feedbacks and questions
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.newFeedbacksQuestions': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.newFeedbacksQuestions',
  },

  /**
   * Get unanswered questions count
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.getQuestionsCountUnanswered': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.questionsCountUnanswered',
  },

  /**
   * Get questions count
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.getQuestionsCount': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.questionsCount',
  },

  /**
   * Get questions list
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.questions': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.questions',
  },

  /**
   * Update question (answer, mark viewed, etc.)
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.updateQuestion': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.patchQuestions',
  },

  /**
   * Get question by ID
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.question': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.question',
  },

  // --- Feedbacks/Reviews (otzyvy.yaml) ---

  /**
   * Get unanswered feedbacks count
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.getFeedbacksCountUnanswered': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.feedbacksCountUnanswered',
  },

  /**
   * Get feedbacks count
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.getFeedbacksCount': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.feedbacksCount',
  },

  /**
   * Get feedbacks list
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.feedbacks': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.feedbacks',
  },

  /**
   * Get supplier valuations (complaint reasons)
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.supplierValuations': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.supplierValuations',
  },

  /**
   * Report feedback/product issue
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.createFeedbacksAction': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.postFeedbacksActions',
  },

  /**
   * Answer feedback
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.createFeedbacksAnswer': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.postFeedbacksAnswer',
  },

  /**
   * Update feedback answer
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.updateFeedbacksAnswer': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.patchFeedbacksAnswer',
  },

  /**
   * Request product return by feedback ID
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.createOrderReturn': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.postFeedbacksOrderReturn',
  },

  /**
   * Get feedback by ID
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.feedback': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.feedback',
  },

  /**
   * Get archived feedbacks
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.getFeedbacksArchive': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.feedbacksArchive',
  },

  // --- Templates (removed from API but kept for compatibility) ---

  /**
   * Get response templates
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.templates': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.templates',
  },

  /**
   * Create response template
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.createTemplate': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.postTemplates',
  },

  /**
   * Update response template
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.updateTemplate': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.patchTemplates',
  },

  /**
   * Delete response template
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.deleteTemplate': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.deleteTemplates',
  },

  // --- Buyer Chat (chat-s-pokupatelyami.yaml) ---

  /**
   * Get seller chats list
   * x-readonly-method: true, x-category: buyerchat
   */
  'communications.getSellerChats': {
    readonly: true,
    category: 'buyerchat',
    rateLimitKey: 'communications.sellerChats',
  },

  /**
   * Get chat events
   * x-readonly-method: true, x-category: buyerchat
   */
  'communications.getSellerEvents': {
    readonly: true,
    category: 'buyerchat',
    rateLimitKey: 'communications.sellerEvents',
  },

  /**
   * Send message to buyer
   * x-readonly-method: false, x-category: buyerchat
   */
  'communications.createSellerMessage': {
    readonly: false,
    category: 'buyerchat',
    rateLimitKey: 'communications.postSellerMessage',
  },

  /**
   * Download file from message
   * x-readonly-method: true, x-category: buyerchat
   */
  'communications.getSellerDownload': {
    readonly: true,
    category: 'buyerchat',
    rateLimitKey: 'communications.sellerDownload',
  },

  // --- Returns (vozvraty-pokupatelyami.yaml) ---

  /**
   * Get buyer return claims
   * x-readonly-method: true, x-category: returns
   */
  'communications.claims': {
    readonly: true,
    category: 'returns',
    rateLimitKey: 'communications.claims',
  },

  /**
   * Respond to buyer claim
   * x-readonly-method: false, x-category: returns
   */
  'communications.updateClaim': {
    readonly: false,
    category: 'returns',
    rateLimitKey: 'communications.patchClaim',
  },

  // --- Pinned Reviews (zakreplyonnye-otzyvy.yaml) ---

  /**
   * Get pinned feedbacks count
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.getPinnedFeedbacksCount': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.getPinnedFeedbacksCount',
  },

  /**
   * Get pinned feedbacks limits
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.getPinnedFeedbacksLimits': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.getPinnedFeedbacksLimits',
  },

  /**
   * Get pinned feedbacks list
   * x-readonly-method: true, x-category: questionsandfeedback
   */
  'communications.getPinnedFeedbacks': {
    readonly: true,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.getPinnedFeedbacks',
  },

  /**
   * Pin feedback to product
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.pinFeedback': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.pinFeedback',
  },

  /**
   * Unpin feedback from product
   * x-readonly-method: false, x-category: questionsandfeedback
   */
  'communications.unpinFeedback': {
    readonly: false,
    category: 'questionsandfeedback',
    rateLimitKey: 'communications.unpinFeedback',
  },

  // ============================================================================
  // Tariffs Module (from 10-tariffs/*.yaml)
  // ============================================================================

  /**
   * Get commission by category
   * x-readonly-method: true, x-category: commonapi
   */
  'tariffs.getTariffsCommission': {
    readonly: true,
    category: 'commonapi',
    rateLimitKey: 'tariffs.tariffsCommission',
  },

  /**
   * Get box tariffs
   * x-readonly-method: true, x-category: commonapi
   */
  'tariffs.getTariffsBox': {
    readonly: true,
    category: 'commonapi',
    rateLimitKey: 'tariffs.tariffsBox',
  },

  /**
   * Get pallet tariffs
   * x-readonly-method: true, x-category: commonapi
   */
  'tariffs.getTariffsPallet': {
    readonly: true,
    category: 'commonapi',
    rateLimitKey: 'tariffs.tariffsPallet',
  },

  /**
   * Get return tariffs
   * x-readonly-method: true, x-category: commonapi
   */
  'tariffs.getTariffsReturn': {
    readonly: true,
    category: 'commonapi',
    rateLimitKey: 'tariffs.tariffsReturn',
  },

  /**
   * Get supply/acceptance coefficients
   * x-readonly-method: true, x-category: commonapi
   */
  'tariffs.getAcceptanceCoefficients': {
    readonly: true,
    category: 'commonapi',
    rateLimitKey: 'tariffs.acceptanceCoefficients',
  },

  // ============================================================================
  // Analytics Module Operations
  // From: wildberries_api_doc/11-analytics.yaml
  // ============================================================================

  /**
   * Create NM report detail
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createNmReportDetail': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createNmReportDetail',
  },

  /**
   * Create detail history
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createDetailHistory': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createDetailHistory',
  },

  /**
   * Create grouped history
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createGroupedHistory': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createGroupedHistory',
  },

  /**
   * Get sales funnel products
   * x-readonly-method: true, x-category: contentanalytics
   */
  'analytics.getSalesFunnelProducts': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.getSalesFunnelProducts',
  },

  /**
   * Get sales funnel products history
   * x-readonly-method: true, x-category: contentanalytics
   */
  'analytics.getSalesFunnelProductsHistory': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.getSalesFunnelProductsHistory',
  },

  /**
   * Get sales funnel grouped history
   * x-readonly-method: true, x-category: contentanalytics
   */
  'analytics.getSalesFunnelGroupedHistory': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.getSalesFunnelGroupedHistory',
  },

  /**
   * Get NM report downloads
   * x-readonly-method: true, x-category: contentanalytics
   */
  'analytics.getNmReportDownloads': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.getNmReportDownloads',
  },

  /**
   * Create NM report download
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createNmReportDownload': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createNmReportDownload',
  },

  /**
   * Create downloads retry
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createDownloadsRetry': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createDownloadsRetry',
  },

  /**
   * Get downloads file
   * x-readonly-method: true, x-category: contentanalytics
   */
  'analytics.getDownloadsFile': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.getDownloadsFile',
  },

  /**
   * Create search report
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createSearchReportReport': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createSearchReportReport',
  },

  /**
   * Create table group
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createTableGroup': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createTableGroup',
  },

  /**
   * Create table detail
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createTableDetail': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createTableDetail',
  },

  /**
   * Create product search text
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createProductSearchText': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createProductSearchText',
  },

  /**
   * Create product order
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createProductOrder': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createProductOrder',
  },

  /**
   * Create products group
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createProductsGroup': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createProductsGroup',
  },

  /**
   * Create products product
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createProductsProduct': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createProductsProduct',
  },

  /**
   * Create products size
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createProductsSize': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createProductsSize',
  },

  /**
   * Create stocks report office
   * x-readonly-method: false, x-category: contentanalytics
   */
  'analytics.createStocksReportOffice': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'analytics.createStocksReportOffice',
  },

  // ============================================================================
  // Reports Module Operations
  // From: wildberries_api_doc/12-reports.yaml
  // ============================================================================

  /**
   * Get supplier incomes
   * x-readonly-method: true, x-category: statistics
   */
  'reports.getSupplierIncomes': {
    readonly: true,
    category: 'statistics',
    rateLimitKey: 'reports.supplierIncomes',
  },

  /**
   * Get supplier stocks
   * x-readonly-method: true, x-category: statistics
   */
  'reports.getSupplierStocks': {
    readonly: true,
    category: 'statistics',
    rateLimitKey: 'reports.supplierStocks',
  },

  /**
   * Get supplier orders
   * x-readonly-method: true, x-category: statistics
   */
  'reports.getSupplierOrders': {
    readonly: true,
    category: 'statistics',
    rateLimitKey: 'reports.supplierOrders',
  },

  /**
   * Get supplier sales
   * x-readonly-method: true, x-category: statistics
   */
  'reports.getSupplierSales': {
    readonly: true,
    category: 'statistics',
    rateLimitKey: 'reports.supplierSales',
  },

  /**
   * Create analytics excise report
   * x-readonly-method: false, x-category: contentanalytics
   */
  'reports.createAnalyticsExciseReport': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'reports.createAnalyticsExciseReport',
  },

  /**
   * Create warehouse remains report
   * x-readonly-method: false, x-category: contentanalytics
   */
  'reports.warehouseRemains': {
    readonly: false,
    category: 'contentanalytics',
    rateLimitKey: 'reports.warehouseRemains',
  },

  /**
   * Get warehouse remains task status
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getWarehouseRemainsTaskStatus': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getWarehouseRemainsTaskStatus',
  },

  /**
   * Download warehouse remains report
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.downloadWarehouseRemainsReport': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.downloadWarehouseRemainsReport',
  },

  /**
   * Get analytics antifraud details
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAnalyticsAntifraudDetails': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAnalyticsAntifraudDetails',
  },

  /**
   * Get analytics goods labeling
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAnalyticsGoodsLabeling': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAnalyticsGoodsLabeling',
  },

  /**
   * Get acceptance report
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.acceptanceReport': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.acceptanceReport',
  },

  /**
   * Get paid storage report
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.paidStorage': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.paidStorage',
  },

  /**
   * Get analytics region sale
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAnalyticsRegionSale': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAnalyticsRegionSale',
  },

  /**
   * Get brand share brands
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getBrandShareBrands': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getBrandShareBrands',
  },

  /**
   * Get banned products blocked
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getBannedProductsBlocked': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getBannedProductsBlocked',
  },

  /**
   * Get measurement penalties
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getMeasurementPenalties': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getMeasurementPenalties',
  },

  /**
   * Get warehouse measurements V2
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getWarehouseMeasurementsV2': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getWarehouseMeasurementsV2',
  },

  /**
   * Get deductions
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getDeductions': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getDeductions',
  },

  /**
   * Get warehouse remains task status (deprecated alias)
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getTasksStatu': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getWarehouseRemainsTaskStatus',
  },

  /**
   * Download warehouse remains report (deprecated alias)
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getTasksDownload': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.downloadWarehouseRemainsReport',
  },

  /**
   * Get analytics warehouse measurements (deprecated)
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAnalyticsWarehouseMeasurements': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAnalyticsWarehouseMeasurements',
  },

  /**
   * Get analytics incorrect attachments
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAnalyticsIncorrectAttachments': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAnalyticsIncorrectAttachments',
  },

  /**
   * Get analytics characteristics change
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAnalyticsCharacteristicsChange': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAnalyticsCharacteristicsChange',
  },

  /**
   * Get acceptance report task status
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAcceptanceReportTaskStatus': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAcceptanceReportTaskStatus',
  },

  /**
   * Download acceptance report
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.downloadAcceptanceReport': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.downloadAcceptanceReport',
  },

  /**
   * Get paid storage task status
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getPaidStorageTaskStatus': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getPaidStorageTaskStatus',
  },

  /**
   * Download paid storage report
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.downloadPaidStorageReport': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.downloadPaidStorageReport',
  },

  /**
   * Get brand share parent subjects
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getBrandShareParentSubjects': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getBrandShareParentSubjects',
  },

  /**
   * Get analytics brand share
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAnalyticsBrandShare': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAnalyticsBrandShare',
  },

  /**
   * Get banned products shadowed
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getBannedProductsShadowed': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getBannedProductsShadowed',
  },

  /**
   * Get analytics goods return
   * x-readonly-method: true, x-category: contentanalytics
   */
  'reports.getAnalyticsGoodsReturn': {
    readonly: true,
    category: 'contentanalytics',
    rateLimitKey: 'reports.getAnalyticsGoodsReturn',
  },

  // ============================================================================
  // Finances Module Operations
  // From: wildberries_api_doc/13-finances.yaml
  // ============================================================================

  /**
   * Get account balance
   * x-readonly-method: true, x-category: finance
   */
  'finances.getAccountBalance': {
    readonly: true,
    category: 'finance',
    rateLimitKey: 'finances.accountBalance',
  },

  /**
   * Get documents categories
   * x-readonly-method: true, x-category: documents
   */
  'finances.getDocumentsCategories': {
    readonly: true,
    category: 'documents',
    rateLimitKey: 'finances.documentsCategories',
  },

  /**
   * Get documents list
   * x-readonly-method: true, x-category: documents
   */
  'finances.getDocumentsList': {
    readonly: true,
    category: 'documents',
    rateLimitKey: 'finances.documentsList',
  },

  /**
   * Get documents download
   * x-readonly-method: true, x-category: documents
   */
  'finances.getDocumentsDownload': {
    readonly: true,
    category: 'documents',
    rateLimitKey: 'finances.documentsDownload',
  },

  /**
   * Create download all documents
   * x-readonly-method: false, x-category: documents
   */
  'finances.createDownloadAll': {
    readonly: false,
    category: 'documents',
    rateLimitKey: 'finances.createDownloadAll',
  },

  // ============================================================================
  // In-Store Pickup Module Operations
  // From: wildberries_api_doc/06-in-store-pickup.yaml
  // ============================================================================

  /**
   * Get new orders for pickup
   * x-readonly-method: true, x-category: marketplace
   */
  'inStorePickup.getOrdersNew': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'in-store-pickup.ordersNew',
  },

  /**
   * Create order client notification
   * x-readonly-method: false, x-category: marketplace
   */
  'inStorePickup.createOrdersClient': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'in-store-pickup.ordersClient',
  },

  /**
   * Create client identity verification
   * x-readonly-method: false, x-category: marketplace
   */
  'inStorePickup.createClientIdentity': {
    readonly: false,
    category: 'marketplace',
    rateLimitKey: 'in-store-pickup.clientIdentity',
  },

  /**
   * Get click & collect orders
   * x-readonly-method: true, x-category: marketplace
   */
  'inStorePickup.getClickCollectOrders': {
    readonly: true,
    category: 'marketplace',
    rateLimitKey: 'in-store-pickup.clickCollectOrders',
  },

  // In-store-pickup shim methods removed in v4.0.0 — their metadata entries
  // (updateOrdersConfirm/Prepare/Receive/Reject/Cancel, createOrdersStatus,
  // getOrdersMeta, deleteOrdersMeta, updateMetaSgtin/Uin/Imei/Gtin) were deleted.
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if an operation is readonly (safe to retry)
 *
 * @param operationKey - Operation key in format '{module}.{methodName}'
 * @returns true if the operation is readonly, false otherwise
 *
 * @example
 * ```typescript
 * import { isOperationReadonly } from 'daytona-wildberries-typescript-sdk';
 *
 * if (isOperationReadonly('products.getParentAll')) {
 *   // Safe to retry on transient failures
 * }
 *
 * if (!isOperationReadonly('products.createCardsUpload')) {
 *   // Should NOT auto-retry - may cause duplicate cards
 * }
 * ```
 */
export function isOperationReadonly(operationKey: string): boolean {
  const metadata = operationMetadata[operationKey] as OperationMetadata | undefined;
  return metadata ? metadata.readonly : false;
}

/**
 * Get the API category for an operation
 *
 * @param operationKey - Operation key in format '{module}.{methodName}'
 * @returns The category string, or undefined if operation not found
 *
 * @example
 * ```typescript
 * import { getOperationCategory } from 'daytona-wildberries-typescript-sdk';
 *
 * const category = getOperationCategory('products.getParentAll');
 * // Returns 'content'
 *
 * // Map category to API domain
 * const domains: Record<string, string> = {
 *   'content': 'https://content-api.wildberries.ru',
 *   'marketplace': 'https://marketplace-api.wildberries.ru',
 *   'discountsandprices': 'https://discounts-prices-api.wildberries.ru',
 * };
 * const domain = domains[category!];
 * ```
 */
export function getOperationCategory(operationKey: string): string | undefined {
  const metadata = operationMetadata[operationKey] as OperationMetadata | undefined;
  return metadata ? metadata.category : undefined;
}

/**
 * Get the rate limit key for an operation
 *
 * @param operationKey - Operation key in format '{module}.{methodName}'
 * @returns The rate limit key, or undefined if operation not found
 *
 * @example
 * ```typescript
 * import { getOperationRateLimitKey, productsRateLimits } from 'daytona-wildberries-typescript-sdk';
 *
 * const rateLimitKey = getOperationRateLimitKey('products.getParentAll');
 * // Returns 'products.contentObjectParentAll'
 *
 * const config = productsRateLimits[rateLimitKey!];
 * console.log(config.requestsPerMinute); // 100
 * ```
 */
export function getOperationRateLimitKey(operationKey: string): string | undefined {
  const metadata = operationMetadata[operationKey] as OperationMetadata | undefined;
  return metadata ? metadata.rateLimitKey : undefined;
}

/**
 * Get full metadata for an operation
 *
 * @param operationKey - Operation key in format '{module}.{methodName}'
 * @returns The full OperationMetadata object, or undefined if not found
 *
 * @example
 * ```typescript
 * import { getOperationMetadata } from 'daytona-wildberries-typescript-sdk';
 *
 * const meta = getOperationMetadata('products.createCardsUpload');
 * if (meta) {
 *   console.log('Readonly:', meta.readonly);        // false
 *   console.log('Category:', meta.category);        // 'content'
 *   console.log('Rate limit key:', meta.rateLimitKey); // 'products.postContentCardsUpload'
 * }
 * ```
 */
export function getOperationMetadata(operationKey: string): OperationMetadata | undefined {
  return operationMetadata[operationKey];
}

/**
 * Get all operations for a specific category
 *
 * @param category - API category (e.g., 'content', 'marketplace', 'discountsandprices')
 * @returns Array of operation keys matching the category
 *
 * @example
 * ```typescript
 * import { getOperationsByCategory } from 'daytona-wildberries-typescript-sdk';
 *
 * const contentOps = getOperationsByCategory('content');
 * // Returns: ['products.getParentAll', 'products.getObjectAll', ...]
 *
 * const marketplaceOps = getOperationsByCategory('marketplace');
 * // Returns: ['products.getStocks', 'products.updateStock', ...]
 * ```
 */
export function getOperationsByCategory(category: string): string[] {
  return Object.entries(operationMetadata)
    .filter(([, meta]) => meta.category === category)
    .map(([key]) => key);
}

/**
 * Get all readonly operations
 *
 * @returns Array of operation keys that are safe to retry
 *
 * @example
 * ```typescript
 * import { getReadonlyOperations } from 'daytona-wildberries-typescript-sdk';
 *
 * const safeToRetry = getReadonlyOperations();
 * // Returns: ['general.ping', 'general.news', 'products.getParentAll', ...]
 * ```
 */
export function getReadonlyOperations(): string[] {
  return Object.entries(operationMetadata)
    .filter(([, meta]) => meta.readonly)
    .map(([key]) => key);
}

/**
 * Get all write operations (not readonly)
 *
 * @returns Array of operation keys that have side effects
 *
 * @example
 * ```typescript
 * import { getWriteOperations } from 'daytona-wildberries-typescript-sdk';
 *
 * const writeOps = getWriteOperations();
 * // Returns: ['products.createContentTag', 'products.createCardsUpload', ...]
 *
 * // These operations should NOT be automatically retried
 * ```
 */
export function getWriteOperations(): string[] {
  return Object.entries(operationMetadata)
    .filter(([, meta]) => !meta.readonly)
    .map(([key]) => key);
}
