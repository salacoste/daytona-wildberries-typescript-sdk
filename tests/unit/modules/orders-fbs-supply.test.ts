/**
 * Unit tests for OrdersFbsModule — Supply Management & Specialized Operations
 *
 * Tests covering:
 * - Supply management (get, delete, barcode, cancel order)
 * - TRBX (boxes) operations (list, create, delete, stickers)
 * - Specialized/cross-border (status history, client info)
 * - Reshipment orders
 * - SPOT (EAEU road-import declarations): OKSM countries, supply SPOT data, QR code
 *
 * @module tests/unit/modules/orders-fbs-supply.test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrdersFbsModule } from '../../../src/modules/orders-fbs';
import type { BaseClient } from '../../../src/client/base-client';

describe('OrdersFbsModule — Supply Management & Specialized Operations', () => {
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

  // ============================================================================
  // SUPPLY MANAGEMENT
  // ============================================================================

  describe('getSupply', () => {
    it('should fetch supply information by supplyId', async () => {
      const mockSupply = {
        id: 'WB-GI-12345',
        done: false,
        createdAt: '2025-01-15T10:30:00Z',
        closedAt: '',
        scanDt: '',
        name: 'Test Supply',
        cargoType: 1 as const,
        crossBorderType: 0 as const,
        destinationOfficeId: 507,
      };

      mockClient.get.mockResolvedValue(mockSupply);

      const result = await ordersFbs.getSupply('WB-GI-12345');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-12345',
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockSupply);
    });

    it('should pass through recommendedWhId + isPickupPointShipmentAllowed fields', async () => {
      const mockSupply = {
        id: 'WB-GI-99999',
        done: false,
        name: 'Supply with new fields',
        cargoType: 1,
        destinationOfficeId: 507,
        recommendedWhId: 123569,
        isPickupPointShipmentAllowed: true,
      };

      mockClient.get.mockResolvedValue(mockSupply);

      const result = await ordersFbs.getSupply('WB-GI-99999');

      expect(result.recommendedWhId).toBe(123569);
      expect(result.isPickupPointShipmentAllowed).toBe(true);
    });

    it('should pass through spotAvailable field (SPOT availability flag)', async () => {
      const mockSupply = {
        id: 'WB-GI-1234567',
        done: false,
        name: 'SPOT-eligible supply',
        cargoType: 1,
        spotAvailable: true,
      };

      mockClient.get.mockResolvedValue(mockSupply);

      const result = await ordersFbs.getSupply('WB-GI-1234567');

      expect(result.spotAvailable).toBe(true);
    });
  });

  // ============================================================================
  // getSupplies (alias for supplies)
  // ============================================================================

  describe('getSupplies', () => {
    it('should fetch supplies list with same URL + rateLimitKey as supplies()', async () => {
      const mockSupplies = {
        supplies: [{ id: 'WB-GI-12345', name: 'Supply A' }],
        next: 100,
      };

      mockClient.get.mockResolvedValue(mockSupplies);

      const result = await ordersFbs.getSupplies({ limit: 1, next: 0 });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        expect.objectContaining({
          params: { limit: 1, next: 0 },
          rateLimitKey: 'orders-fbs.supplies',
        })
      );
      expect(result).toEqual(mockSupplies);
    });

    it('should return identical results to supplies() for the same input (delegation)', async () => {
      const mockSupplies = {
        supplies: [{ id: 'WB-GI-67890', name: 'Supply B' }],
        next: 50,
      };

      mockClient.get.mockResolvedValue(mockSupplies);

      const params = { limit: 1, next: 0 };
      const aliasResult = await ordersFbs.getSupplies(params);
      const originalResult = await ordersFbs.supplies(params);

      expect(aliasResult).toEqual(originalResult);
      expect(mockClient.get).toHaveBeenNthCalledWith(
        1,
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        expect.objectContaining({ rateLimitKey: 'orders-fbs.supplies' })
      );
      expect(mockClient.get).toHaveBeenNthCalledWith(
        2,
        'https://marketplace-api.wildberries.ru/api/v3/supplies',
        expect.objectContaining({ rateLimitKey: 'orders-fbs.supplies' })
      );
    });
  });

  // ============================================================================
  // deleteSupply
  // ============================================================================

  describe('deleteSupply', () => {
    it('should delete a supply by supplyId', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await ordersFbs.deleteSupply('WB-GI-12345');

      expect(mockClient.delete).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-12345',
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });
  });

  // ============================================================================
  // getSuppliesBarcode
  // ============================================================================

  describe('getSuppliesBarcode', () => {
    it('should fetch supply barcode with type parameter', async () => {
      const mockBarcode = {
        barcode: 'WB-GI-12345-BARCODE',
        file: 'base64encodedpngdata==',
      };

      mockClient.get.mockResolvedValue(mockBarcode);

      const result = await ordersFbs.getSuppliesBarcode('WB-GI-12345', { type: 'png' });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-12345/barcode',
        expect.objectContaining({
          params: { type: 'png' },
          rateLimitKey: expect.any(String),
        })
      );
      expect(result).toEqual(mockBarcode);
    });

    it('should fetch supply barcode without type parameter', async () => {
      const mockBarcode = {
        barcode: 'WB-GI-12345-BARCODE',
        file: 'base64encodedsvgdata==',
      };

      mockClient.get.mockResolvedValue(mockBarcode);

      const result = await ordersFbs.getSuppliesBarcode('WB-GI-12345');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-12345/barcode',
        expect.objectContaining({
          params: undefined,
          rateLimitKey: expect.any(String),
        })
      );
      expect(result).toEqual(mockBarcode);
    });
  });

  // ============================================================================
  // updateOrdersCancel
  // ============================================================================

  describe('updateOrdersCancel', () => {
    it('should cancel an assembly task by orderId', async () => {
      mockClient.patch.mockResolvedValue(undefined);

      await ordersFbs.updateOrdersCancel(98765432);

      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/98765432/cancel',
        undefined,
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });
  });

  // ============================================================================
  // TRBX (Boxes) Operations
  // ============================================================================

  describe('getSuppliesTrbx', () => {
    it('should fetch boxes for a supply', async () => {
      const mockTrbx = {
        trbxes: [{ id: 'TRBX-001' }, { id: 'TRBX-002' }, { id: 'TRBX-003' }],
      };

      mockClient.get.mockResolvedValue(mockTrbx);

      const result = await ordersFbs.getSuppliesTrbx('WB-GI-12345');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-12345/trbx',
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockTrbx);
      expect(result.trbxes).toHaveLength(3);
    });
  });

  // ============================================================================
  // createSuppliesTrbx
  // ============================================================================

  describe('createSuppliesTrbx', () => {
    it('should create boxes for a supply with specified amount', async () => {
      const mockResponse = {
        trbxIds: ['TRBX-001', 'TRBX-002', 'TRBX-003'],
      };

      mockClient.post.mockResolvedValue(mockResponse);

      const result = await ordersFbs.createSuppliesTrbx('WB-GI-12345', { amount: 3 });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-12345/trbx',
        { amount: 3 },
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockResponse);
      expect(result.trbxIds).toHaveLength(3);
    });
  });

  // ============================================================================
  // deleteSuppliesTrbx
  // ============================================================================

  describe('deleteSuppliesTrbx', () => {
    it('should delete boxes from a supply by trbxIds', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      const trbxIds = ['TRBX-001', 'TRBX-002'];

      await ordersFbs.deleteSuppliesTrbx('WB-GI-12345', { trbxIds });

      expect(mockClient.delete).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-12345/trbx',
        { trbxIds: ['TRBX-001', 'TRBX-002'] },
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
    });
  });

  // ============================================================================
  // createTrbxSticker
  // ============================================================================

  describe('createTrbxSticker', () => {
    it('should fetch box stickers with type param and trbxIds', async () => {
      const mockStickers = {
        stickers: [
          {
            barcode: 'TRBX-001-BC',
            file: 'base64stickerdata001==',
          },
          {
            barcode: 'TRBX-002-BC',
            file: 'base64stickerdata002==',
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockStickers);

      const trbxIds = ['TRBX-001', 'TRBX-002'];
      const result = await ordersFbs.createTrbxSticker('WB-GI-12345', { type: 'png' }, { trbxIds });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/WB-GI-12345/trbx/stickers',
        { trbxIds: ['TRBX-001', 'TRBX-002'] },
        expect.objectContaining({
          params: { type: 'png' },
          rateLimitKey: expect.any(String),
        })
      );
      expect(result).toEqual(mockStickers);
      expect(result.stickers).toHaveLength(2);
    });
  });

  // ============================================================================
  // SPECIALIZED / CROSS-BORDER
  // ============================================================================

  describe('createStatusHistory', () => {
    it('should fetch cross-border status history for given orders', async () => {
      const mockHistory = {
        orders: [
          {
            deliveryDate: '2025-02-01',
            statuses: [
              { date: '2025-01-20T08:00:00Z', code: 'accepted' },
              { date: '2025-01-22T14:30:00Z', code: 'in_transit' },
            ],
            orderID: 98765432,
          },
          {
            deliveryDate: '2025-02-03',
            statuses: [{ date: '2025-01-21T10:00:00Z', code: 'accepted' }],
            orderID: 11223344,
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockHistory);

      const result = await ordersFbs.createStatusHistory({ orders: [98765432, 11223344] });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/status/history',
        { orders: [98765432, 11223344] },
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockHistory);
      expect(result.orders).toHaveLength(2);
      expect(result.orders![0].statuses).toHaveLength(2);
    });
  });

  // ============================================================================
  // createOrdersClient
  // ============================================================================

  describe('createOrdersClient', () => {
    it('should fetch client info for cross-border Turkey orders', async () => {
      const mockClientInfo = {
        orders: [
          {
            firstName: 'Mehmet',
            fullName: 'Yilmaz Mehmet',
            lastName: 'Yilmaz',
            middleName: '',
            orderID: 98765432,
            phone: '+905551234567',
            phoneCode: '',
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockClientInfo);

      const result = await ordersFbs.createOrdersClient({ orders: [98765432] });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/orders/client',
        { orders: [98765432] },
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockClientInfo);
      expect(result.orders).toHaveLength(1);
      expect(result.orders![0].orderID).toBe(98765432);
    });
  });

  // ============================================================================
  // RESHIPMENT
  // ============================================================================

  describe('getOrdersReshipment', () => {
    it('should fetch all orders requiring reshipment', async () => {
      const mockReshipment = {
        orders: [
          { supplyID: 'WB-GI-12345', orderID: 98765432 },
          { supplyID: 'WB-GI-12345', orderID: 55667788 },
          { supplyID: 'WB-GI-67890', orderID: 11223344 },
        ],
      };

      mockClient.get.mockResolvedValue(mockReshipment);

      const result = await ordersFbs.getOrdersReshipment();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/supplies/orders/reshipment',
        expect.objectContaining({ rateLimitKey: expect.any(String) })
      );
      expect(result).toEqual(mockReshipment);
      expect(result.orders).toHaveLength(3);
    });
  });

  // ============================================================================
  // SPOT (EAEU road-import declarations)
  // ============================================================================

  describe('SPOT methods', () => {
    it('getSpotCountries should fetch the OKSM country list', async () => {
      const mockCountries = {
        countries: [
          { code: '036', name: 'Австралия' },
          { code: '112', name: 'Беларусь' },
          { code: '417', name: 'Киргизия' },
        ],
      };

      mockClient.get.mockResolvedValue(mockCountries);

      const result = await ordersFbs.getSpotCountries();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/dictionaries/countries/oksm',
        expect.objectContaining({ rateLimitKey: 'orders-fbs.getSpotCountries' })
      );
      expect(result).toEqual(mockCountries);
      expect(result.countries).toHaveLength(3);
    });

    it('updateSupplySpot should PUT SPOT data with the supplyId in the URL', async () => {
      mockClient.put.mockResolvedValue(undefined);

      const spotData = {
        carrierName: 'ООО СПОТ',
        carrierTaxNumber: '7588179007',
        carrierCountryCode: '112',
        vehicleRegistrationNumber: 'А123АА100',
        trailerRegistrationNumber: 'АА000100',
      };

      await ordersFbs.updateSupplySpot('WB-GI-123456789', spotData);

      expect(mockClient.put).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/supplies/WB-GI-123456789/spot',
        spotData,
        expect.objectContaining({ rateLimitKey: 'orders-fbs.putSupplySpot' })
      );
      expect(mockClient.put).toHaveBeenCalledTimes(1);
    });

    it('getSuppliesSpotList should POST supply IDs and return per-supply SPOT data', async () => {
      const mockSpotList = {
        supplies: [
          {
            id: 'WB-GI-0000001',
            spot: {
              carrierTaxNumber: '7588179007',
              carrierName: 'ООО СПОТ',
              carrierCountryCode: '112',
              vehicleRegistrationNumber: 'А123АА100',
              trailerRegistrationNumber: 'АА000100',
              status: 'completed' as const,
            },
          },
          {
            id: 'WB-GI-0000002',
            spot: {
              carrierTaxNumber: '7588179007',
              carrierName: 'ООО СПОТ',
              carrierCountryCode: '112',
              vehicleRegistrationNumber: 'А123АА100',
              status: 'failed' as const,
              errorCode: 'doppFailed' as const,
            },
          },
          {
            id: 'WB-GI-0000003',
            error: { title: 'NotFound', detail: 'Not Found' },
          },
          {
            id: 'WB-GI-0000004',
            error: { title: 'SpotActionNotAllowed', detail: 'Spot Action Not Allowed' },
          },
        ],
      };

      mockClient.post.mockResolvedValue(mockSpotList);

      const result = await ordersFbs.getSuppliesSpotList({ supplyIds: ['WB-GI-0000001'] });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/supplies/spot/list',
        { supplyIds: ['WB-GI-0000001'] },
        expect.objectContaining({ rateLimitKey: 'orders-fbs.postSuppliesSpotList' })
      );
      expect(result).toEqual(mockSpotList);
      expect(result.supplies).toHaveLength(4);
      expect(result.supplies[0].spot?.status).toBe('completed');
      expect(result.supplies[1].spot?.errorCode).toBe('doppFailed');
      expect(result.supplies[2].error?.title).toBe('NotFound');
    });

    it('getSupplySpotStickers should fetch the base64 SPOT QR code', async () => {
      const mockQr = { qrCode: 'U3dhZ2dlciByb2Nrcw==' };

      mockClient.get.mockResolvedValue(mockQr);

      const result = await ordersFbs.getSupplySpotStickers('WB-GI-123456789');

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/supplies/WB-GI-123456789/stickers/spot',
        expect.objectContaining({ rateLimitKey: 'orders-fbs.getSupplySpotStickers' })
      );
      expect(result).toEqual(mockQr);
    });
  });
});
