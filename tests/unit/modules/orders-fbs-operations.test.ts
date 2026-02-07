/**
 * Unit tests for OrdersFbsModule - Passes, Metadata & Stickers Operations
 *
 * TDD tests for FBS operations methods:
 *
 * PASSES:
 * - getPassesOffices: List warehouses requiring a pass
 * - passes: List seller passes
 * - createPass: Create a seller pass
 * - updatePass: Update a seller pass
 * - deletePass: Delete a seller pass
 *
 * METADATA:
 * - deleteOrdersMeta: Delete order metadata
 * - updateMetaSgtin: Set SGTIN marking codes
 * - updateMetaUin: Set UIN code
 * - updateMetaImei: Set IMEI code
 * - updateMetaGtin: Set GTIN code
 * - updateMetaExpiration: Set expiration date
 * - setCustomsDeclaration: Set customs declaration number
 *
 * STICKERS:
 * - createOrdersSticker: Get assembly task stickers
 * - createStickersCrossBorder: Get cross-border stickers
 *
 * @see {@link ../../../src/modules/orders-fbs/index OrdersFbsModule}
 */

/* eslint-disable @typescript-eslint/no-confusing-void-expression */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OrdersFbsModule } from '../../../src/modules/orders-fbs';
import type { BaseClient } from '../../../src/client/base-client';

const BASE_URL = 'https://marketplace-api.wildberries.ru';

describe('OrdersFbsModule — Passes, Metadata & Stickers', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let ordersFbs: OrdersFbsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    ordersFbs = new OrdersFbsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // PASSES
  // ==========================================================================

  describe('Passes', () => {
    // ========================================================================
    // getPassesOffices()
    // ========================================================================

    describe('getPassesOffices()', () => {
      const mockOffices = [
        { id: 1, name: 'Warehouse Alpha', address: 'Moscow, ul. Lenina 1' },
        { id: 2, name: 'Warehouse Beta', address: 'SPb, Nevsky 10' },
      ];

      it('should call GET with the correct URL', async () => {
        mockClient.get.mockResolvedValue(mockOffices);

        await ordersFbs.getPassesOffices();

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/passes/offices`,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return the list of pass offices', async () => {
        mockClient.get.mockResolvedValue(mockOffices);

        const result = await ordersFbs.getPassesOffices();

        expect(result).toEqual(mockOffices);
        expect(result).toHaveLength(2);
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.get.mockResolvedValue([]);

        await ordersFbs.getPassesOffices();

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.passesOffices' })
        );
      });
    });

    // ========================================================================
    // passes()
    // ========================================================================

    describe('passes()', () => {
      const mockPasses = [
        {
          id: 1,
          firstName: 'Ivan',
          lastName: 'Petrov',
          carModel: 'GAZelle',
          carNumber: 'A123BC77',
          officeId: 1,
        },
      ];

      it('should call GET with the correct URL', async () => {
        mockClient.get.mockResolvedValue(mockPasses);

        await ordersFbs.passes();

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/passes`,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return the list of passes', async () => {
        mockClient.get.mockResolvedValue(mockPasses);

        const result = await ordersFbs.passes();

        expect(result).toEqual(mockPasses);
        expect(result).toHaveLength(1);
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.get.mockResolvedValue([]);

        await ordersFbs.passes();

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.passes' })
        );
      });
    });

    // ========================================================================
    // createPass()
    // ========================================================================

    describe('createPass()', () => {
      const passData = {
        firstName: 'Ivan',
        lastName: 'Petrov',
        carModel: 'GAZelle',
        carNumber: 'A123BC77',
        officeId: 1,
      };
      const mockResponse = { id: 42 };

      it('should call POST with the correct URL and body', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        await ordersFbs.createPass(passData);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/passes`,
          passData,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return the created pass ID', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await ordersFbs.createPass(passData);

        expect(result).toEqual({ id: 42 });
      });

      it('should send all required fields in the request body', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        await ordersFbs.createPass(passData);

        const sentBody = mockClient.post.mock.calls[0][1] as typeof passData;
        expect(sentBody).toHaveProperty('firstName', 'Ivan');
        expect(sentBody).toHaveProperty('lastName', 'Petrov');
        expect(sentBody).toHaveProperty('carModel', 'GAZelle');
        expect(sentBody).toHaveProperty('carNumber', 'A123BC77');
        expect(sentBody).toHaveProperty('officeId', 1);
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        await ordersFbs.createPass(passData);

        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.postPasses' })
        );
      });
    });

    // ========================================================================
    // updatePass()
    // ========================================================================

    describe('updatePass()', () => {
      const passId = 42;
      const passData = {
        firstName: 'Ivan',
        lastName: 'Sidorov',
        carModel: 'Kamaz',
        carNumber: 'B456DE99',
        officeId: 2,
      };

      it('should call PUT with the correct URL including passId', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updatePass(passId, passData);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/passes/${passId}`,
          passData,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return void on success', async () => {
        mockClient.put.mockResolvedValue(undefined);

        const result = await ordersFbs.updatePass(passId, passData);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updatePass(passId, passData);

        expect(mockClient.put).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.putPasses' })
        );
      });
    });

    // ========================================================================
    // deletePass()
    // ========================================================================

    describe('deletePass()', () => {
      const passId = 42;

      it('should call DELETE with the correct URL including passId', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await ordersFbs.deletePass(passId);

        expect(mockClient.delete).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/passes/${passId}`,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return void on success', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        const result = await ordersFbs.deletePass(passId);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await ordersFbs.deletePass(passId);

        expect(mockClient.delete).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.deletePasses' })
        );
      });
    });
  });

  // ==========================================================================
  // METADATA
  // ==========================================================================

  describe('Metadata', () => {
    const orderId = 98765432;

    // ========================================================================
    // deleteOrdersMeta()
    // ========================================================================

    describe('deleteOrdersMeta()', () => {
      it('should call DELETE with the correct URL including orderId', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await ordersFbs.deleteOrdersMeta(orderId);

        expect(mockClient.delete).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/${orderId}/meta`,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should pass key as query param when provided', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await ordersFbs.deleteOrdersMeta(orderId, { key: 'imei' });

        expect(mockClient.delete).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/${orderId}/meta`,
          expect.objectContaining({
            params: { key: 'imei' },
            rateLimitKey: expect.any(String),
          })
        );
      });

      it('should work without the optional key param', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await ordersFbs.deleteOrdersMeta(orderId);

        expect(mockClient.delete).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/${orderId}/meta`,
          expect.objectContaining({
            params: undefined,
          })
        );
      });

      it('should return void on success', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        const result = await ordersFbs.deleteOrdersMeta(orderId);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await ordersFbs.deleteOrdersMeta(orderId);

        expect(mockClient.delete).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.deleteOrdersMeta' })
        );
      });
    });

    // ========================================================================
    // updateMetaSgtin()
    // ========================================================================

    describe('updateMetaSgtin()', () => {
      const sgtinData = { sgtins: ['0104600000000001', '0104600000000002'] };

      it('should call PUT with the correct URL including orderId', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaSgtin(orderId, sgtinData);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/${orderId}/meta/sgtin`,
          sgtinData,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return void on success', async () => {
        mockClient.put.mockResolvedValue(undefined);

        const result = await ordersFbs.updateMetaSgtin(orderId, sgtinData);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaSgtin(orderId, sgtinData);

        expect(mockClient.put).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.putOrdersMetaSgtin' })
        );
      });
    });

    // ========================================================================
    // updateMetaUin()
    // ========================================================================

    describe('updateMetaUin()', () => {
      const uinData = { uin: 'UIN-1234567890' };

      it('should call PUT with the correct URL including orderId', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaUin(orderId, uinData);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/${orderId}/meta/uin`,
          uinData,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return void on success', async () => {
        mockClient.put.mockResolvedValue(undefined);

        const result = await ordersFbs.updateMetaUin(orderId, uinData);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaUin(orderId, uinData);

        expect(mockClient.put).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.putOrdersMetaUin' })
        );
      });
    });

    // ========================================================================
    // updateMetaImei()
    // ========================================================================

    describe('updateMetaImei()', () => {
      const imeiData = { imei: '359876543210987' };

      it('should call PUT with the correct URL including orderId', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaImei(orderId, imeiData);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/${orderId}/meta/imei`,
          imeiData,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return void on success', async () => {
        mockClient.put.mockResolvedValue(undefined);

        const result = await ordersFbs.updateMetaImei(orderId, imeiData);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaImei(orderId, imeiData);

        expect(mockClient.put).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.putOrdersMetaImei' })
        );
      });
    });

    // ========================================================================
    // updateMetaGtin()
    // ========================================================================

    describe('updateMetaGtin()', () => {
      const gtinData = { gtin: '4607654321098' };

      it('should call PUT with the correct URL including orderId', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaGtin(orderId, gtinData);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/${orderId}/meta/gtin`,
          gtinData,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return void on success', async () => {
        mockClient.put.mockResolvedValue(undefined);

        const result = await ordersFbs.updateMetaGtin(orderId, gtinData);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaGtin(orderId, gtinData);

        expect(mockClient.put).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.putOrdersMetaGtin' })
        );
      });
    });

    // ========================================================================
    // updateMetaExpiration()
    // ========================================================================

    describe('updateMetaExpiration()', () => {
      const expirationData = { expiration: '2026-12-31' };

      it('should call PUT with the correct URL including orderId', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaExpiration(orderId, expirationData);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/${orderId}/meta/expiration`,
          expirationData,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return void on success', async () => {
        mockClient.put.mockResolvedValue(undefined);

        const result = await ordersFbs.updateMetaExpiration(orderId, expirationData);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.updateMetaExpiration(orderId, expirationData);

        expect(mockClient.put).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.putOrdersMetaExpiration' })
        );
      });
    });

    // ========================================================================
    // setCustomsDeclaration()
    // ========================================================================

    describe('setCustomsDeclaration()', () => {
      const declarationData = { customsDeclaration: '10129050/010120/0001234' };

      it('should call PUT with the /api/marketplace/v3/ URL path including orderId', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.setCustomsDeclaration(orderId, declarationData);

        expect(mockClient.put).toHaveBeenCalledWith(
          `${BASE_URL}/api/marketplace/v3/orders/${orderId}/meta/customs-declaration`,
          declarationData,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should use the marketplace URL path (not /api/v3/)', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.setCustomsDeclaration(orderId, declarationData);

        const calledUrl = mockClient.put.mock.calls[0][0] as string;
        expect(calledUrl).toContain('/api/marketplace/v3/');
        expect(calledUrl).not.toMatch(/\/api\/v3\/orders\//);
      });

      it('should return void on success', async () => {
        mockClient.put.mockResolvedValue(undefined);

        const result = await ordersFbs.setCustomsDeclaration(orderId, declarationData);

        expect(result).toBeUndefined();
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.put.mockResolvedValue(undefined);

        await ordersFbs.setCustomsDeclaration(orderId, declarationData);

        expect(mockClient.put).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({
            rateLimitKey: 'orders-fbs.putOrdersMetaCustomsDeclaration',
          })
        );
      });
    });
  });

  // ==========================================================================
  // STICKERS
  // ==========================================================================

  describe('Stickers', () => {
    // ========================================================================
    // createOrdersSticker()
    // ========================================================================

    describe('createOrdersSticker()', () => {
      const stickerOptions = { type: 'png' as const, width: 58 as const, height: 40 as const };
      const stickerBody = { orders: [111222333, 444555666] };
      const mockStickerResponse = {
        stickers: [
          {
            orderId: 111222333,
            partA: 'PART-A-1',
            partB: 'PART-B-1',
            barcode: 'BC1234567890',
            file: 'base64encodedstring==',
          },
          {
            orderId: 444555666,
            partA: 'PART-A-2',
            partB: 'PART-B-2',
            barcode: 'BC9876543210',
            file: 'base64encodedstring2==',
          },
        ],
      };

      it('should call POST with the correct URL', async () => {
        mockClient.post.mockResolvedValue(mockStickerResponse);

        await ordersFbs.createOrdersSticker(stickerOptions, stickerBody);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/stickers`,
          stickerBody,
          expect.objectContaining({
            params: stickerOptions,
            rateLimitKey: expect.any(String),
          })
        );
      });

      it('should pass type, width, and height as query params', async () => {
        mockClient.post.mockResolvedValue(mockStickerResponse);

        await ordersFbs.createOrdersSticker(stickerOptions, stickerBody);

        const calledOptions = mockClient.post.mock.calls[0][2] as {
          params: typeof stickerOptions;
        };
        expect(calledOptions.params).toEqual({
          type: 'png',
          width: 58,
          height: 40,
        });
      });

      it('should return the stickers response', async () => {
        mockClient.post.mockResolvedValue(mockStickerResponse);

        const result = await ordersFbs.createOrdersSticker(stickerOptions, stickerBody);

        expect(result.stickers).toBeDefined();
        expect(result.stickers).toHaveLength(2);
        expect(result.stickers![0].orderId).toBe(111222333);
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.post.mockResolvedValue(mockStickerResponse);

        await ordersFbs.createOrdersSticker(stickerOptions, stickerBody);

        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'orders-fbs.postOrdersStickers' })
        );
      });
    });

    // ========================================================================
    // createStickersCrossBorder()
    // ========================================================================

    describe('createStickersCrossBorder()', () => {
      const crossBorderBody = { orders: [777888999] };
      const mockCrossBorderResponse = {
        stickers: [{ file: 'pdf-base64-encoded', orderId: 777888999 }],
      };

      it('should call POST with the correct URL', async () => {
        mockClient.post.mockResolvedValue(mockCrossBorderResponse);

        await ordersFbs.createStickersCrossBorder(crossBorderBody);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v3/orders/stickers/cross-border`,
          crossBorderBody,
          expect.objectContaining({ rateLimitKey: expect.any(String) })
        );
      });

      it('should return the stickers response', async () => {
        mockClient.post.mockResolvedValue(mockCrossBorderResponse);

        const result = await ordersFbs.createStickersCrossBorder(crossBorderBody);

        expect(result.stickers).toBeDefined();
        expect(result.stickers).toHaveLength(1);
        expect(result.stickers![0].orderId).toBe(777888999);
      });

      it('should pass rateLimitKey in options', async () => {
        mockClient.post.mockResolvedValue(mockCrossBorderResponse);

        await ordersFbs.createStickersCrossBorder(crossBorderBody);

        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.anything(),
          expect.objectContaining({
            rateLimitKey: 'orders-fbs.postOrdersStickersCrossBorder',
          })
        );
      });
    });
  });
});
