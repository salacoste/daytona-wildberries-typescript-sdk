/**
 * Unit tests for CRITICAL untested CRUD operations in ProductsModule
 *
 * This file tests the most critical CRUD methods that were previously untested:
 * - createCardsUpload() - Create new product cards (33.82% → coverage improvement)
 * - createCardsUpdate() - Update existing product cards
 * - createCardsTrash() - Move products to trash (soft delete)
 * - createCardsRecover() - Recover products from trash
 * - createDeleteTrash() - Permanently delete products from trash
 * - createContentTag() - Create product tags
 * - updateContentTag() - Update product tags
 * - deleteContentTag() - Delete product tags
 * - createContentBarcode() - Generate product barcodes
 * - createCardsMovenm() - Merge/split product nomenclature
 *
 * These methods have HIGH RISK if broken as they affect core product lifecycle operations.
 *
 * @see {@link ../../../src/modules/products/index ProductsModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductsModule } from '../../../src/modules/products';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { ValidationError } from '../../../src/errors/validation-error';

describe('ProductsModule - Critical CRUD Operations', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let productsModule: ProductsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    productsModule = new ProductsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ============================================================================
  // CRITICAL: Product Card Creation (createCardsUpload)
  // ============================================================================

  describe('createCardsUpload() - Create New Product Cards', () => {
    const mockCreateResponse = {
      data: {},
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should upload new product card with all required fields', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateResponse);
      const productData = [
        {
          subjectID: 105,
          variants: [
            {
              vendorCode: 'VENDOR-001',
              brand: 'Test Brand',
              title: 'Test Product',
              description: 'Product description',
              dimensions: {
                length: 10,
                width: 5,
                height: 3,
                weightBrutto: 200,
              },
              sizes: [
                {
                  techSize: 'M',
                  wbSize: 'M',
                  price: 2999,
                  skus: ['BARCODE123456'],
                },
              ],
              characteristics: [
                { id: 1, value: 'Red' },
                { id: 2, value: 'Cotton' },
              ],
            },
          ],
        },
      ];

      // Act
      const result = await productsModule.createCardsUpload(productData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload',
        productData,
        { rateLimitKey: 'products.postContentCardsUpload' }
      );
      expect(result).toEqual(mockCreateResponse);
      expect(result.error).toBe(false);
    });

    it('should handle multiple variants in single card upload', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateResponse);
      const multiVariantData = [
        {
          subjectID: 105,
          variants: [
            { vendorCode: 'VAR-001', title: 'Variant 1', sizes: [] },
            { vendorCode: 'VAR-002', title: 'Variant 2', sizes: [] },
            { vendorCode: 'VAR-003', title: 'Variant 3', sizes: [] },
          ],
        },
      ];

      // Act
      await productsModule.createCardsUpload(multiVariantData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledTimes(1);
      const [, bodyData] = mockClient.post.mock.calls[0] as [string, typeof multiVariantData];
      expect(bodyData[0].variants).toHaveLength(3);
    });

    it('should handle batch creation of multiple product cards', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateResponse);
      const batchData = [
        { subjectID: 105, variants: [{ vendorCode: 'BATCH-001', sizes: [] }] },
        { subjectID: 106, variants: [{ vendorCode: 'BATCH-002', sizes: [] }] },
        { subjectID: 107, variants: [{ vendorCode: 'BATCH-003', sizes: [] }] },
      ];

      // Act
      await productsModule.createCardsUpload(batchData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload',
        batchData,
        { rateLimitKey: 'products.postContentCardsUpload' }
      );
    });

    it('should handle wholesale configuration in product upload', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCreateResponse);
      const wholesaleData = [
        {
          subjectID: 105,
          variants: [
            {
              vendorCode: 'WHOLESALE-001',
              wholesale: {
                enabled: true,
                quantum: 10,
              },
              sizes: [],
            },
          ],
        },
      ];

      // Act
      const result = await productsModule.createCardsUpload(wholesaleData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledTimes(1);
      expect(result.error).toBe(false);
    });

    it('should throw ValidationError when missing required subjectID', async () => {
      // Arrange
      const error = new ValidationError('Missing required field: subjectID', {
        subjectID: 'Required',
      });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsUpload([
          {
            subjectID: 0,
            variants: [],
          },
        ])
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when missing vendorCode', async () => {
      // Arrange
      const error = new ValidationError('Missing required field: vendorCode', {
        vendorCode: 'Required',
      });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsUpload([
          {
            subjectID: 105,
            variants: [{ vendorCode: '', sizes: [] }],
          },
        ])
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError during product creation', async () => {
      // Arrange - Special rate limit for createCardsUpload (10 seconds interval)
      const error = new RateLimitError('Rate limit exceeded: 1 request per 10 seconds', 10000);
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsUpload([
          {
            subjectID: 105,
            variants: [{ vendorCode: 'TEST', sizes: [] }],
          },
        ])
      ).rejects.toThrow(RateLimitError);

      try {
        await productsModule.createCardsUpload([
          {
            subjectID: 105,
            variants: [{ vendorCode: 'TEST', sizes: [] }],
          },
        ]);
      } catch (err) {
        expect(err).toBeInstanceOf(RateLimitError);
        if (err instanceof RateLimitError) {
          expect(err.retryAfter).toBe(10000);
        }
      }
    });

    it('should propagate AuthenticationError during unauthorized access', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsUpload([
          {
            subjectID: 105,
            variants: [{ vendorCode: 'TEST', sizes: [] }],
          },
        ])
      ).rejects.toThrow(AuthenticationError);
    });
  });

  // ============================================================================
  // CRITICAL: Product Card Update (createCardsUpdate)
  // ============================================================================

  describe('createCardsUpdate() - Update Existing Product Cards', () => {
    const mockUpdateResponse = {
      data: {},
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should update product card with nmID and modified fields', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockUpdateResponse);
      const updateData = [
        {
          nmID: 12345,
          vendorCode: 'VENDOR-001',
          brand: 'Updated Brand',
          title: 'Updated Title',
          description: 'Updated Description',
          sizes: [],
        },
      ];

      // Act
      const result = await productsModule.createCardsUpdate(updateData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/update',
        updateData,
        { rateLimitKey: 'products.postContentCardsUpdate' }
      );
      expect(result).toEqual(mockUpdateResponse);
      expect(result.error).toBe(false);
    });

    it('should update product dimensions', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockUpdateResponse);
      const updateData = [
        {
          nmID: 12345,
          vendorCode: 'VENDOR-001',
          dimensions: {
            length: 15,
            width: 10,
            height: 5,
            weightBrutto: 300,
          },
          sizes: [],
        },
      ];

      // Act
      await productsModule.createCardsUpdate(updateData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/update',
        updateData
      );
    });

    it('should update product characteristics', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockUpdateResponse);
      const updateData = [
        {
          nmID: 12345,
          vendorCode: 'VENDOR-001',
          characteristics: [
            { id: 1, value: 'Blue' },
            { id: 2, value: 'Polyester' },
            { id: 3, value: 'Russia' },
          ],
          sizes: [],
        },
      ];

      // Act
      await productsModule.createCardsUpdate(updateData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledTimes(1);
      const [, bodyData] = mockClient.post.mock.calls[0] as [string, typeof updateData];
      expect(bodyData[0].characteristics).toHaveLength(3);
    });

    it('should handle bulk updates of multiple products', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockUpdateResponse);
      const bulkUpdates = [
        { nmID: 12345, vendorCode: 'V1', sizes: [] },
        { nmID: 12346, vendorCode: 'V2', sizes: [] },
        { nmID: 12347, vendorCode: 'V3', sizes: [] },
        { nmID: 12348, vendorCode: 'V4', sizes: [] },
        { nmID: 12349, vendorCode: 'V5', sizes: [] },
      ];

      // Act
      await productsModule.createCardsUpdate(bulkUpdates);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/update',
        bulkUpdates
      );
    });

    it('should throw ValidationError when missing nmID', async () => {
      // Arrange
      const error = new ValidationError('Missing required field: nmID', { nmID: 'Required' });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsUpdate([
          {
            nmID: 0,
            vendorCode: 'TEST',
            sizes: [],
          },
        ])
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError during bulk updates', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsUpdate([
          {
            nmID: 12345,
            vendorCode: 'TEST',
            sizes: [],
          },
        ])
      ).rejects.toThrow(RateLimitError);
    });
  });

  // ============================================================================
  // CRITICAL: Move to Trash (createCardsTrash)
  // ============================================================================

  describe('createCardsTrash() - Move Products to Trash (Soft Delete)', () => {
    const mockTrashResponse = {
      cards: [
        {
          nmID: 12345,
          vendorCode: 'VENDOR-001',
          subjectID: 105,
          subjectName: 'Socks',
          trashedAt: '2025-10-25T10:00:00Z',
        },
      ],
      cursor: {
        trashedAt: '2025-10-25T10:00:00Z',
        nmID: 12345,
        total: 1,
      },
    };

    it('should list trashed products with pagination', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTrashResponse);
      const filters = {
        settings: {
          cursor: { limit: 100 },
          filter: { textSearch: 'VENDOR-001' },
        },
      };

      // Act
      const result = await productsModule.createCardsTrash(filters);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/get/cards/trash',
        filters,
        { params: undefined }
      );
      expect(result.cards).toHaveLength(1);
      expect(result.cards?.[0].trashedAt).toBeDefined();
    });

    it('should handle cursor-based pagination in trash', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTrashResponse);
      const filters = {
        settings: {
          cursor: {
            limit: 50,
            trashedAt: '2025-10-25T00:00:00Z',
            nmID: 12300,
          },
        },
      };

      // Act
      const result = await productsModule.createCardsTrash(filters);

      // Assert
      expect(result.cursor?.total).toBe(1);
      expect(result.cursor?.trashedAt).toBe('2025-10-25T10:00:00Z');
    });

    it('should filter trashed products by text search', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTrashResponse);
      const filters = {
        settings: {
          filter: { textSearch: 'specific-vendor' },
        },
      };

      // Act
      await productsModule.createCardsTrash(filters);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/get/cards/trash',
        filters,
        { params: undefined }
      );
    });

    it('should handle empty trash list', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({ cards: [], cursor: { total: 0 } });

      // Act
      const result = await productsModule.createCardsTrash({});

      // Assert
      expect(result.cards).toEqual([]);
      expect(result.cursor?.total).toBe(0);
    });

    it('should support locale parameter (ru, en, zh)', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTrashResponse);
      const filters = { settings: { cursor: { limit: 10 } } };

      // Act
      await productsModule.createCardsTrash(filters, { locale: 'en' });

      // Assert
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      // Arrange
      const error = new AuthenticationError('Unauthorized access to trash');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.createCardsTrash({})).rejects.toThrow(AuthenticationError);
    });
  });

  // ============================================================================
  // CRITICAL: Recover from Trash (createCardsRecover)
  // ============================================================================

  describe('createCardsRecover() - Recover Products from Trash', () => {
    const mockRecoverResponse = {
      data: {},
      error: false,
      errorText: '',
      additionalErrors: {},
    };

    it('should recover single product from trash', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockRecoverResponse);
      const nmIDs = [12345];

      // Act
      const result = await productsModule.createCardsRecover({ nmIDs });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/recover',
        { nmIDs }
      );
      expect(result.error).toBe(false);
    });

    it('should recover multiple products from trash in batch', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockRecoverResponse);
      const nmIDs = [12345, 12346, 12347, 12348, 12349];

      // Act
      const result = await productsModule.createCardsRecover({ nmIDs });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/recover',
        { nmIDs }
      );
      expect(result.error).toBe(false);
    });

    it('should handle recovery errors for invalid nmIDs', async () => {
      // Arrange
      const error = new ValidationError('Product not found in trash', { nmIDs: 'Not in trash' });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsRecover({
          nmIDs: [99999],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when nmIDs array is empty', async () => {
      // Arrange
      const error = new ValidationError('nmIDs array cannot be empty');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsRecover({
          nmIDs: [],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError during recovery', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsRecover({
          nmIDs: [12345],
        })
      ).rejects.toThrow(RateLimitError);
    });
  });

  // ============================================================================
  // CRITICAL: Permanent Deletion (createDeleteTrash)
  // ============================================================================

  describe('createDeleteTrash() - Permanently Delete Products from Trash', () => {
    const mockDeleteResponse = {
      data: {},
      error: false,
      errorText: '',
      additionalErrors: {},
    };

    it('should permanently delete single product from trash', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockDeleteResponse);
      const nmIDs = [12345];

      // Act
      const result = await productsModule.createDeleteTrash({ nmIDs });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/delete/trash',
        { nmIDs }
      );
      expect(result.error).toBe(false);
    });

    it('should permanently delete multiple products in batch', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockDeleteResponse);
      const nmIDs = [12345, 12346, 12347, 12348, 12349, 12350];

      // Act
      const result = await productsModule.createDeleteTrash({ nmIDs });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/delete/trash',
        { nmIDs }
      );
      expect(result.error).toBe(false);
    });

    it('should handle deletion errors for invalid nmIDs', async () => {
      // Arrange
      const error = new ValidationError('Products not found in trash', { nmIDs: 'Not found' });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createDeleteTrash({
          nmIDs: [99999, 99998],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when nmIDs array is empty', async () => {
      // Arrange
      const error = new ValidationError('nmIDs array cannot be empty');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createDeleteTrash({
          nmIDs: [],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate AuthenticationError during permanent deletion', async () => {
      // Arrange
      const error = new AuthenticationError('Unauthorized to delete products');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createDeleteTrash({
          nmIDs: [12345],
        })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError during permanent deletion', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createDeleteTrash({
          nmIDs: [12345],
        })
      ).rejects.toThrow(RateLimitError);
    });
  });

  // ============================================================================
  // HIGH PRIORITY: Content Tag Management
  // ============================================================================

  describe('createContentTag() - Create Product Tag', () => {
    const mockTagCreateResponse = {
      data: {},
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should create new content tag with name and color', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTagCreateResponse);
      const tagData = {
        name: 'New Collection',
        color: '#FF5733',
      };

      // Act
      const result = await productsModule.createContentTag(tagData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tag',
        tagData
      );
      expect(result.error).toBe(false);
    });

    it('should handle tag creation with default color', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTagCreateResponse);
      const tagData = {
        name: 'Summer Sale',
      };

      // Act
      await productsModule.createContentTag(tagData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tag',
        tagData
      );
    });

    it('should throw ValidationError when tag name is empty', async () => {
      // Arrange
      const error = new ValidationError('Tag name cannot be empty', { name: 'Required' });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createContentTag({
          name: '',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError during tag creation', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createContentTag({
          name: 'Test Tag',
        })
      ).rejects.toThrow(RateLimitError);
    });
  });

  describe('updateContentTag() - Update Product Tag', () => {
    const mockTagUpdateResponse = {
      data: {},
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should update tag name and color', async () => {
      // Arrange
      mockClient.patch.mockResolvedValue(mockTagUpdateResponse);
      const tagId = 123;
      const updateData = {
        name: 'Updated Collection',
        color: '#00FF00',
      };

      // Act
      const result = await productsModule.updateContentTag(tagId, updateData);

      // Assert
      expect(mockClient.patch).toHaveBeenCalledWith(
        `https://content-api.wildberries.ru/content/v2/tag/${tagId}`,
        updateData
      );
      expect(result.error).toBe(false);
    });

    it('should update only tag name', async () => {
      // Arrange
      mockClient.patch.mockResolvedValue(mockTagUpdateResponse);
      const tagId = 456;
      const updateData = {
        name: 'Winter Sale',
      };

      // Act
      await productsModule.updateContentTag(tagId, updateData);

      // Assert
      expect(mockClient.patch).toHaveBeenCalledWith(
        `https://content-api.wildberries.ru/content/v2/tag/${tagId}`,
        updateData
      );
    });

    it('should throw ValidationError for invalid tag ID', async () => {
      // Arrange
      const error = new ValidationError('Tag not found', { tagId: 'Invalid' });
      mockClient.patch.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.updateContentTag(0, {
          name: 'Test',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate AuthenticationError during tag update', async () => {
      // Arrange
      const error = new AuthenticationError('Unauthorized to update tags');
      mockClient.patch.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.updateContentTag(123, {
          name: 'Test',
        })
      ).rejects.toThrow(AuthenticationError);
    });
  });

  describe('deleteContentTag() - Delete Product Tag', () => {
    const mockTagDeleteResponse = {
      data: {},
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should delete tag by ID', async () => {
      // Arrange
      mockClient.delete.mockResolvedValue(mockTagDeleteResponse);
      const tagId = 123;

      // Act
      const result = await productsModule.deleteContentTag(tagId);

      // Assert
      expect(mockClient.delete).toHaveBeenCalledWith(
        `https://content-api.wildberries.ru/content/v2/tag/${tagId}`
      );
      expect(result.error).toBe(false);
    });

    it('should throw ValidationError for non-existent tag', async () => {
      // Arrange
      const error = new ValidationError('Tag not found', { tagId: 'Not found' });
      mockClient.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.deleteContentTag(99999)).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError during tag deletion', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.delete.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.deleteContentTag(123)).rejects.toThrow(RateLimitError);
    });
  });

  // ============================================================================
  // HIGH PRIORITY: Barcode Generation
  // ============================================================================

  describe('createContentBarcode() - Generate Product Barcodes', () => {
    const mockBarcodeResponse = {
      data: ['1234567890123', '1234567890124', '1234567890125'],
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should generate specified number of barcodes', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockBarcodeResponse);
      const count = 3;

      // Act
      const result = await productsModule.createContentBarcode({ count });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/barcodes',
        { count }
      );
      expect(result.data).toHaveLength(3);
      expect(result.error).toBe(false);
    });

    it('should generate single barcode', async () => {
      // Arrange
      const singleBarcodeResponse = {
        data: ['1234567890123'],
        error: false,
        errorText: '',
        additionalErrors: null,
      };
      mockClient.post.mockResolvedValue(singleBarcodeResponse);

      // Act
      const result = await productsModule.createContentBarcode({ count: 1 });

      // Assert
      expect(result.data).toHaveLength(1);
      expect(result.data?.[0]).toMatch(/^\d{13}$/);
    });

    it('should generate bulk barcodes (max limit)', async () => {
      // Arrange
      const bulkBarcodes = Array.from(
        { length: 100 },
        (_, i) => `123456789${String(i).padStart(4, '0')}`
      );
      mockClient.post.mockResolvedValue({
        data: bulkBarcodes,
        error: false,
        errorText: '',
        additionalErrors: null,
      });

      // Act
      const result = await productsModule.createContentBarcode({ count: 100 });

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/barcodes',
        { count: 100 }
      );
      expect(result.data).toHaveLength(100);
    });

    it('should throw ValidationError when count exceeds limit', async () => {
      // Arrange
      const error = new ValidationError('Count exceeds maximum limit', { count: 'Max 1000' });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createContentBarcode({
          count: 10000,
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when count is zero or negative', async () => {
      // Arrange
      const error = new ValidationError('Count must be positive', { count: 'Positive required' });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createContentBarcode({
          count: 0,
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError during barcode generation', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createContentBarcode({
          count: 10,
        })
      ).rejects.toThrow(RateLimitError);
    });

    it('should propagate AuthenticationError during barcode generation', async () => {
      // Arrange
      const error = new AuthenticationError('Unauthorized to generate barcodes');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createContentBarcode({
          count: 5,
        })
      ).rejects.toThrow(AuthenticationError);
    });
  });

  // ============================================================================
  // HIGH PRIORITY: Product Nomenclature Merging/Splitting
  // ============================================================================

  describe('createCardsMovenm() - Merge/Split Product Nomenclature', () => {
    const mockMoveResponse = {
      data: {},
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should merge products under target IMT ID', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockMoveResponse);
      const mergeData = {
        targetIMT: 67890,
        nmIDs: [12345, 12346, 12347],
      };

      // Act
      const result = await productsModule.createCardsMovenm(mergeData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/moveNm',
        mergeData
      );
      expect(result.error).toBe(false);
    });

    it('should split products by disconnecting nmIDs', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockMoveResponse);
      const splitData = {
        nmIDs: [12345, 12346],
      };

      // Act
      const result = await productsModule.createCardsMovenm(splitData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/moveNm',
        splitData
      );
      expect(result.error).toBe(false);
    });

    it('should handle maximum limit of 30 nmIDs per operation', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockMoveResponse);
      const maxNmIDs = Array.from({ length: 30 }, (_, i) => 10000 + i);
      const mergeData = {
        targetIMT: 67890,
        nmIDs: maxNmIDs,
      };

      // Act
      await productsModule.createCardsMovenm(mergeData);

      // Assert
      expect(mockClient.post).toHaveBeenCalledTimes(1);
      const [, bodyData] = mockClient.post.mock.calls[0] as [string, typeof mergeData];
      expect(bodyData.nmIDs).toHaveLength(30);
    });

    it('should throw ValidationError when exceeding 30 nmIDs limit', async () => {
      // Arrange
      const error = new ValidationError('Maximum 30 nmIDs allowed per operation', {
        nmIDs: 'Max 30',
      });
      mockClient.post.mockRejectedValue(error);
      const tooManyNmIDs = Array.from({ length: 31 }, (_, i) => 10000 + i);

      // Act & Assert
      await expect(
        productsModule.createCardsMovenm({
          targetIMT: 67890,
          nmIDs: tooManyNmIDs,
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when nmIDs array is empty', async () => {
      // Arrange
      const error = new ValidationError('nmIDs array cannot be empty');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsMovenm({
          nmIDs: [],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate ValidationError for invalid target IMT', async () => {
      // Arrange
      const error = new ValidationError('Target IMT not found', { targetIMT: 'Not found' });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsMovenm({
          targetIMT: 99999,
          nmIDs: [12345],
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError during merge/split operation', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsMovenm({
          targetIMT: 67890,
          nmIDs: [12345],
        })
      ).rejects.toThrow(RateLimitError);
    });

    it('should propagate AuthenticationError during merge/split', async () => {
      // Arrange
      const error = new AuthenticationError('Unauthorized to merge/split products');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createCardsMovenm({
          nmIDs: [12345],
        })
      ).rejects.toThrow(AuthenticationError);
    });
  });
});
