/**
 * Unit tests for OrdersFbsModule — Supply Management & Specialized Operations
 *
 * Tests covering:
 * - Supply management (get, delete, barcode, cancel order)
 * - TRBX (boxes) operations (list, create, delete, stickers)
 * - Specialized/cross-border (status history, client info)
 * - Reshipment orders
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
});
