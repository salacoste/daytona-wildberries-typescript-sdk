/**
 * Unit tests for products rate limit configuration
 *
 * Verifies that all rate limit entries in productsRateLimits have the correct
 * values as specified in the OpenAPI specifications under wildberries_api_doc/02-products.yaml.
 *
 * @module tests/unit/config/products-rate-limits
 */

import { describe, it, expect } from 'vitest';
import { productsRateLimits } from '../../../src/config/products-rate-limits';

describe('productsRateLimits', () => {
  // Helper to assert standard tier values
  function expectStandardTier(key: string) {
    expect(productsRateLimits[key]).toEqual({
      requestsPerMinute: 100,
      intervalSeconds: 0.6,
      burstLimit: 5,
    });
  }

  // Helper to assert marketplace tier values (300 req/min)
  function expectMarketplaceTier(key: string) {
    expect(productsRateLimits[key]).toEqual({
      requestsPerMinute: 300,
      intervalSeconds: 0.2,
      burstLimit: 20,
    });
  }

  // Helper to assert content exceptions tier values (10 req/min)
  function expectExceptionsTier(key: string) {
    expect(productsRateLimits[key]).toEqual({
      requestsPerMinute: 10,
      intervalSeconds: 6,
      burstLimit: 5,
    });
  }

  describe('Content Standard Tier (100 req/min, 0.6s interval, burst 5)', () => {
    const standardKeys = [
      'products.contentObjectParentAll',
      'products.contentObjectAll',
      'products.contentObjectCharcs',
      'products.contentDirectoryColors',
      'products.contentDirectoryKinds',
      'products.contentDirectoryCountries',
      'products.contentDirectorySeasons',
      'products.contentDirectoryVat',
      'products.contentDirectoryTnved',
      'products.contentTags',
      'products.postContentTag',
      'products.patchContentTag',
      'products.deleteContentTag',
      'products.postContentTagNomenclatureLink',
      'products.postContentGetCardsList',
      'products.postContentCardsMoveNm',
      'products.postContentCardsDeleteTrash',
      'products.postContentCardsRecover',
      'products.postContentGetCardsTrash',
      'products.contentCardsLimits',
      'products.postContentBarcodes',
      'products.postContentMediaFile',
      'products.postContentMediaSave',
    ];

    it.each(standardKeys)('should have correct values for %s', (key) => {
      expectStandardTier(key);
    });
  });

  describe('Content Exceptions Tier (10 req/min, 6s interval, burst 5)', () => {
    const exceptionKeys = [
      'products.postContentCardsErrorList',
      'products.postContentCardsUpdate',
      'products.postContentCardsUpload',
      'products.postContentCardsUploadAdd',
    ];

    it.each(exceptionKeys)('should have correct values for %s', (key) => {
      expectExceptionsTier(key);
    });
  });

  describe('Brands Tier (60 req/min, 1s interval, burst 5)', () => {
    it('should have correct values for products.brands', () => {
      expect(productsRateLimits['products.brands']).toEqual({
        requestsPerMinute: 60,
        intervalSeconds: 1,
        burstLimit: 5,
      });
    });
  });

  describe('Prices & Discounts Tier (100 req/min, 0.6s interval, burst 5)', () => {
    const pricesKeys = [
      'products.postUploadTask',
      'products.postUploadTaskSize',
      'products.postUploadTaskClubDiscount',
      'products.historyTasks',
      'products.historyGoodsTask',
      'products.bufferTasks',
      'products.bufferGoodsTask',
      'products.listGoodsFilter',
      'products.postListGoodsFilter',
      'products.listGoodsSizeNm',
      'products.quarantineGoods',
    ];

    it('should have exactly 11 entries', () => {
      const matchingKeys = Object.keys(productsRateLimits).filter((k) => pricesKeys.includes(k));
      expect(matchingKeys).toHaveLength(11);
    });

    it.each(pricesKeys)('should have correct values for %s', (key) => {
      expectStandardTier(key);
    });
  });

  describe('Marketplace Tier - Stocks', () => {
    it('postStocks should have 300 req/min, 0.2s interval, burst 20', () => {
      expect(productsRateLimits['products.postStocks']).toEqual({
        requestsPerMinute: 300,
        intervalSeconds: 0.2,
        burstLimit: 20,
      });
    });

    it('putStocks should have 300 req/min, 0.2s interval, burst 20', () => {
      expect(productsRateLimits['products.putStocks']).toEqual({
        requestsPerMinute: 300,
        intervalSeconds: 0.2,
        burstLimit: 20,
      });
    });

    it('deleteStocks should have 10 req/min, 6s interval, burst 2', () => {
      expect(productsRateLimits['products.deleteStocks']).toEqual({
        requestsPerMinute: 10,
        intervalSeconds: 6,
        burstLimit: 2,
      });
    });

    it('putStocks and deleteStocks should NOT have swapped values', () => {
      // Regression guard: putStocks must be the high-throughput endpoint
      expect(productsRateLimits['products.putStocks'].requestsPerMinute).toBe(300);
      expect(productsRateLimits['products.putStocks'].burstLimit).toBe(20);
      // deleteStocks must be the low-throughput endpoint
      expect(productsRateLimits['products.deleteStocks'].requestsPerMinute).toBe(10);
      expect(productsRateLimits['products.deleteStocks'].burstLimit).toBe(2);
    });
  });

  describe('Marketplace Tier - Warehouses (300 req/min, 0.2s interval, burst 20)', () => {
    const warehouseKeys = [
      'products.offices',
      'products.warehouses',
      'products.postWarehouses',
      'products.putWarehouses',
      'products.deleteWarehouses',
      'products.dbwWarehousesContacts',
      'products.putDbwWarehousesContacts',
    ];

    it.each(warehouseKeys)('should have correct values for %s', (key) => {
      expectMarketplaceTier(key);
    });
  });

  describe('Completeness', () => {
    it('should have entries for all expected keys', () => {
      const allExpectedKeys = [
        // Content Standard
        'products.contentObjectParentAll',
        'products.contentObjectAll',
        'products.contentObjectCharcs',
        'products.contentDirectoryColors',
        'products.contentDirectoryKinds',
        'products.contentDirectoryCountries',
        'products.contentDirectorySeasons',
        'products.contentDirectoryVat',
        'products.contentDirectoryTnved',
        'products.contentTags',
        'products.postContentTag',
        'products.patchContentTag',
        'products.deleteContentTag',
        'products.postContentTagNomenclatureLink',
        'products.postContentGetCardsList',
        // Content Exceptions
        'products.postContentCardsErrorList',
        'products.postContentCardsUpdate',
        'products.postContentCardsMoveNm',
        'products.postContentCardsDeleteTrash',
        'products.postContentCardsRecover',
        'products.postContentGetCardsTrash',
        'products.contentCardsLimits',
        'products.postContentBarcodes',
        'products.postContentCardsUpload',
        'products.postContentCardsUploadAdd',
        'products.postContentMediaFile',
        'products.postContentMediaSave',
        // Brands
        'products.brands',
        // Prices & Discounts
        'products.postUploadTask',
        'products.postUploadTaskSize',
        'products.postUploadTaskClubDiscount',
        'products.historyTasks',
        'products.historyGoodsTask',
        'products.bufferTasks',
        'products.bufferGoodsTask',
        'products.listGoodsFilter',
        'products.postListGoodsFilter',
        'products.listGoodsSizeNm',
        'products.quarantineGoods',
        // Stocks
        'products.postStocks',
        'products.putStocks',
        'products.deleteStocks',
        // Warehouses
        'products.offices',
        'products.warehouses',
        'products.postWarehouses',
        'products.putWarehouses',
        'products.deleteWarehouses',
        'products.dbwWarehousesContacts',
        'products.putDbwWarehousesContacts',
      ];

      for (const key of allExpectedKeys) {
        expect(productsRateLimits).toHaveProperty(key);
      }
    });

    it('should not have any unexpected keys', () => {
      const actualKeys = Object.keys(productsRateLimits);
      expect(actualKeys).toHaveLength(49);
    });
  });
});
