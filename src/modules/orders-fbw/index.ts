/**
 * Orders FBW (Fulfillment by Wildberries) Module
 *
 * Provides access to warehouse operations for supplies managed by Wildberries:
 * - Warehouse information and acceptance coefficients
 * - Supply management and details
 * - Transit tariff calculations
 *
 * All operations use base URL: https://supplies-api.wildberries.ru
 *
 * @module modules/orders-fbw
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors/validation-error';
import type {
  ModelsAcceptanceCoefficient,
  ModelsBox,
  ModelsGood,
  ModelsGoodInSupply,
  ModelsOptionsResultModel,
  ModelsSuppliesFiltersRequest,
  ModelsSupply,
  ModelsSupplyDetails,
  ModelsTransitTariff,
  ModelsWarehousesResultItems,
} from '../../types/orders-fbw.types';

export class OrdersFBWModule {
  constructor(private client: BaseClient) {}

  /**
   * Get list of Wildberries warehouses
   *
   * Rate limit: 6 requests per minute (10 second intervals)
   *
   * @returns List of warehouses with details (ID, name, address, work time, capabilities)
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * const warehouses = await sdk.ordersFBW.getWarehouses();
   * console.log(warehouses[0].name); // "Коледино"
   * ```
   */
  async getWarehouses(): Promise<ModelsWarehousesResultItems[]> {
    return this.client.get<ModelsWarehousesResultItems[]>(
      'https://supplies-api.wildberries.ru/api/v1/warehouses',
      { rateLimitKey: 'ordersFBW.getWarehouses' }
    );
  }

  /**
   * Get acceptance coefficients for warehouses
   *
   * Returns acceptance coefficients for specific warehouses for the next 14 days.
   * Acceptance is only available when: coefficient = 0 or 1 AND allowUnload = true
   *
   * Rate limit: 6 requests per minute (10 second intervals)
   *
   * @param warehouseIDs - Optional comma-separated warehouse IDs (e.g., "507,117501")
   * @returns List of acceptance coefficients with warehouse details and pricing
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // All warehouses
   * const allCoeffs = await sdk.ordersFBW.getAcceptanceCoefficients();
   *
   * // Specific warehouses
   * const coeffs = await sdk.ordersFBW.getAcceptanceCoefficients('507,117501');
   * ```
   */
  async getAcceptanceCoefficients(warehouseIDs?: string): Promise<ModelsAcceptanceCoefficient[]> {
    const params = warehouseIDs ? { warehouseIDs } : {};

    return this.client.get<ModelsAcceptanceCoefficient[]>(
      'https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients',
      { params, rateLimitKey: 'ordersFBW.getAcceptanceCoefficients' }
    );
  }

  /**
   * Get acceptance options for goods
   *
   * Returns information about which warehouses and package types are available for supply.
   * List of warehouses is determined by barcode and quantity.
   *
   * Rate limit: 6 requests per minute (10 second intervals)
   *
   * @param goods - Array of goods with barcodes and quantities (1-5000 items)
   * @param warehouseID - Optional warehouse ID to filter results
   * @returns Acceptance options including available warehouses and packaging types
   * @throws {ValidationError} When goods array is empty, too large, or contains invalid data
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * const goods = [
   *   { barcode: '1234567891234', quantity: 10 },
   *   { barcode: '9876543210987', quantity: 5 }
   * ];
   *
   * const options = await sdk.ordersFBW.getAcceptanceOptions(goods);
   * console.log(options.result[0].warehouses); // Available warehouses
   *
   * // Filter by warehouse
   * const warehouseOptions = await sdk.ordersFBW.getAcceptanceOptions(goods, '507');
   * ```
   */
  async getAcceptanceOptions(
    goods: ModelsGood[],
    warehouseID?: string
  ): Promise<ModelsOptionsResultModel> {
    // Validation
    if (goods.length === 0) {
      throw new ValidationError('Goods array cannot be empty');
    }

    if (goods.length > 5000) {
      throw new ValidationError('Maximum 5000 goods per request');
    }

    // Validate each good
    for (let i = 0; i < goods.length; i++) {
      const good = goods[i];

      if (!good.barcode || good.barcode.trim() === '') {
        throw new ValidationError(`Good at index ${i} is missing barcode`);
      }

      if (!good.quantity || good.quantity < 1 || good.quantity > 999999) {
        throw new ValidationError(`Good at index ${i}: quantity must be 1-999999`);
      }
    }

    const params = warehouseID ? { warehouseID } : {};

    return this.client.post<ModelsOptionsResultModel>(
      'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
      goods,
      { params, rateLimitKey: 'ordersFBW.getAcceptanceOptions' }
    );
  }

  /**
   * Get transit tariffs
   *
   * Returns information about available transit directions and their pricing.
   *
   * Rate limit: 6 requests per minute (10 second intervals, burst: 10)
   *
   * @returns List of transit tariffs with pricing for boxes and pallets
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * const tariffs = await sdk.ordersFBW.getTransitTariffs();
   * console.log(tariffs[0].transitWarehouseName); // "Москва (транзит)"
   * console.log(tariffs[0].palletTariff); // 1200.0
   * ```
   */
  async getTransitTariffs(): Promise<ModelsTransitTariff[]> {
    return this.client.get<ModelsTransitTariff[]>(
      'https://supplies-api.wildberries.ru/api/v1/transit-tariffs',
      { rateLimitKey: 'ordersFBW.getTransitTariffs' }
    );
  }

  /**
   * Get list of supplies
   *
   * Returns list of supplies with optional filters. Default: last 1000 supplies.
   *
   * Rate limit: 30 requests per minute (2 second intervals)
   *
   * @param filters - Date and status filters
   * @param limit - Number of supplies to return (1-1000, default: 1000)
   * @param offset - Number of supplies to skip (>= 0, default: 0)
   * @returns List of supplies matching filters
   * @throws {ValidationError} When limit/offset are invalid or filters contain invalid data
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get all supplies
   * const allSupplies = await sdk.ordersFBW.getSupplies({
   *   dates: [],
   *   statusIDs: []
   * });
   *
   * // Filter by date and status
   * const filteredSupplies = await sdk.ordersFBW.getSupplies({
   *   dates: [{
   *     from: '2024-01-01',
   *     till: '2024-12-31',
   *     type: 'createDate'
   *   }],
   *   statusIDs: [2, 3, 4] // Planned, Allowed, In Acceptance
   * }, 100, 0);
   * ```
   */
  async getSupplies(
    filters: ModelsSuppliesFiltersRequest,
    limit = 1000,
    offset = 0
  ): Promise<ModelsSupply[]> {
    // Validate pagination
    if (limit < 1 || limit > 1000) {
      throw new ValidationError('Limit must be 1-1000');
    }

    if (offset < 0) {
      throw new ValidationError('Offset must be >= 0');
    }

    // Validate date filters
    if (filters.dates) {
      for (const dateFilter of filters.dates) {
        // Simple date format validation (YYYY-MM-DD or ISO 8601)
        const dateRegex = /^\d{4}-\d{2}-\d{2}/;

        if (dateFilter.from && !dateRegex.test(dateFilter.from)) {
          throw new ValidationError('Invalid from date format. Use YYYY-MM-DD or ISO 8601');
        }

        if (dateFilter.till && !dateRegex.test(dateFilter.till)) {
          throw new ValidationError('Invalid till date format. Use YYYY-MM-DD or ISO 8601');
        }
      }
    }

    // Validate status IDs (must be 1-6)
    if (filters.statusIDs) {
      for (const statusID of filters.statusIDs) {
        if (statusID < 1 || statusID > 6) {
          throw new ValidationError(`Invalid status ID: ${statusID}. Status must be 1-6`);
        }
      }
    }

    return this.client.post<ModelsSupply[]>(
      `https://supplies-api.wildberries.ru/api/v1/supplies?limit=${limit}&offset=${offset}`,
      filters,
      { rateLimitKey: 'ordersFBW.getSupplies' }
    );
  }

  /**
   * Get supply details by ID
   *
   * Returns detailed information about a specific supply or preorder.
   *
   * Rate limit: 30 requests per minute (2 second intervals)
   *
   * @param ID - Supply ID or Preorder ID
   * @param isPreorderID - Whether ID is a preorder ID (default: false)
   * @returns Detailed supply information including quantities, costs, and coefficients
   * @throws {ValidationError} When ID is invalid
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get supply details
   * const supply = await sdk.ordersFBW.getSupplyDetails(12345);
   * console.log(supply.statusName); // "Принято"
   * console.log(supply.warehouseName); // "Коледино"
   *
   * // Get preorder details
   * const preorder = await sdk.ordersFBW.getSupplyDetails(67890, true);
   * ```
   */
  async getSupplyDetails(ID: number, isPreorderID = false): Promise<ModelsSupplyDetails> {
    // Validate ID
    if (!ID || ID <= 0) {
      throw new ValidationError('Supply/Preorder ID must be > 0');
    }

    return this.client.get<ModelsSupplyDetails>(
      `https://supplies-api.wildberries.ru/api/v1/supplies/${ID}?isPreorderID=${isPreorderID}`,
      { rateLimitKey: 'ordersFBW.getSupplyDetails' }
    );
  }

  /**
   * Get goods in supply
   *
   * Returns information about goods in a supply with pagination.
   *
   * Rate limit: 30 requests per minute (2 second intervals)
   *
   * @param ID - Supply ID or Preorder ID
   * @param isPreorderID - Whether ID is a preorder ID (default: false)
   * @param limit - Number of goods to return (1-1000, default: 100)
   * @param offset - Number of goods to skip (>= 0, default: 0)
   * @returns List of goods with barcodes, quantities, and acceptance status
   * @throws {ValidationError} When ID, limit, or offset are invalid
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get first 100 goods
   * const goods = await sdk.ordersFBW.getSupplyGoods(12345);
   *
   * // Get next 100 goods
   * const moreGoods = await sdk.ordersFBW.getSupplyGoods(12345, false, 100, 100);
   *
   * // Get goods from preorder
   * const preorderGoods = await sdk.ordersFBW.getSupplyGoods(67890, true);
   * ```
   */
  async getSupplyGoods(
    ID: number,
    isPreorderID = false,
    limit = 100,
    offset = 0
  ): Promise<ModelsGoodInSupply[]> {
    // Validate ID
    if (!ID || ID <= 0) {
      throw new ValidationError('Supply/Preorder ID must be > 0');
    }

    // Validate pagination
    if (limit < 1 || limit > 1000) {
      throw new ValidationError('Limit must be 1-1000');
    }

    if (offset < 0) {
      throw new ValidationError('Offset must be >= 0');
    }

    return this.client.get<ModelsGoodInSupply[]>(
      `https://supplies-api.wildberries.ru/api/v1/supplies/${ID}/goods?limit=${limit}&offset=${offset}&isPreorderID=${isPreorderID}`,
      { rateLimitKey: 'ordersFBW.getSupplyGoods' }
    );
  }

  /**
   * Get supply package information
   *
   * Returns information about packaging for a supply.
   *
   * Rate limit: 30 requests per minute (2 second intervals)
   *
   * @param ID - Supply ID
   * @returns List of boxes with package codes and contained goods
   * @throws {ValidationError} When ID is invalid
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * const packages = await sdk.ordersFBW.getSupplyPackage(12345);
   * console.log(packages[0].packageCode); // "WB-PKG-12345"
   * console.log(packages[0].quantity); // 15
   * console.log(packages[0].barcodes); // [{ barcode: '...', quantity: 10 }, ...]
   * ```
   */
  async getSupplyPackage(ID: number): Promise<ModelsBox[]> {
    // Validate ID
    if (!ID || ID <= 0) {
      throw new ValidationError('Supply ID must be > 0');
    }

    return this.client.get<ModelsBox[]>(
      `https://supplies-api.wildberries.ru/api/v1/supplies/${ID}/package`,
      { rateLimitKey: 'ordersFBW.getSupplyPackage' }
    );
  }
}
