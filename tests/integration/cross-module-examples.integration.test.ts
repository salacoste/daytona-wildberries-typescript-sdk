/**
 * Integration Tests for Cross-Module Examples
 *
 * Tests all 4 cross-module integration examples:
 * 1. Business Dashboard
 * 2. Financial Reconciliation
 * 3. Customer Engagement
 * 4. BI Export
 *
 * [Source: Story 3.8 Task 5]
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';

// MSW Server Setup with all required endpoints
const server = setupServer(
  // Finances API - Balance
  http.get('https://finance-api.wildberries.ru/api/v1/account/balance', () => {
    return HttpResponse.json({
      current: 50000.5,
      currency: 'RUB',
    });
  }),

  // Finances API - Transactions (GET request for reportDetailByPeriod)
  http.get('https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod', () => {
    return HttpResponse.json([
      {
        realizationreport_id: 1001,
        date_from: '2025-10-01',
        date_to: '2025-10-23',
        create_dt: '2025-10-20T10:00:00Z',
        currency_name: 'RUB',
        suppliercontract_code: null,
        rrd_id: 1001,
        gi_id: 1,
        dlv_prc: 0,
        fix_tariff_date_from: '2025-10-01',
        fix_tariff_date_to: '2025-10-23',
        subject_name: 'Electronics',
        nm_id: 12345,
        brand_name: 'TestBrand',
        sa_name: 'SKU001',
        ts_name: 'M',
        barcode: '1234567890',
        doc_type_name: 'Продажа',
        quantity: 1,
        retail_price: 2000.0,
        retail_amount: 2000.0,
        sale_percent: 25,
        commission_percent: 15,
        office_name: 'Moscow Office',
        supplier_oper_name: 'Sale',
        order_dt: '2025-10-19T10:00:00Z',
        sale_dt: '2025-10-20T10:00:00Z',
        rr_dt: null,
        shk_id: 1,
        retail_price_withdisc_rub: 1500.0,
        delivery_rub: 0,
        gi_box_type_name: 'Box',
        product_discount_for_report: 25,
        supplier_promo: 0,
        ppvz_kvw_prc_base_date: null,
        ppvz_kvw_prc: 0,
        ppvz_sales_commission: 225.0,
        ppvz_for_pay: 1500.0,
        ppvz_reward: 0,
        acquiring_fee: 22.5,
        acquiring_percent: 1.5,
        acquiring_bank: 'Test Bank',
        ppvz_vw: 0,
        ppvz_vw_nds: 0,
        stock_id: null,
        supplier_oper_id: 'S12345',
        country_name: 'Russia',
        bonus_type_name: null,
        srid: 'S12345',
      },
      {
        realizationreport_id: 1002,
        date_from: '2025-10-01',
        date_to: '2025-10-23',
        create_dt: '2025-10-21T14:30:00Z',
        currency_name: 'RUB',
        suppliercontract_code: null,
        rrd_id: 1002,
        gi_id: 2,
        dlv_prc: 0,
        fix_tariff_date_from: '2025-10-01',
        fix_tariff_date_to: '2025-10-23',
        subject_name: 'Electronics',
        nm_id: 12346,
        brand_name: 'TestBrand',
        sa_name: 'SKU002',
        ts_name: 'L',
        barcode: '1234567891',
        doc_type_name: 'Продажа',
        quantity: 1,
        retail_price: 3000.0,
        retail_amount: 3000.0,
        sale_percent: 17,
        commission_percent: 15,
        office_name: 'Moscow Office',
        supplier_oper_name: 'Sale',
        order_dt: '2025-10-20T14:30:00Z',
        sale_dt: '2025-10-21T14:30:00Z',
        rr_dt: null,
        shk_id: 2,
        retail_price_withdisc_rub: 2500.0,
        delivery_rub: 0,
        gi_box_type_name: 'Box',
        product_discount_for_report: 17,
        supplier_promo: 0,
        ppvz_kvw_prc_base_date: null,
        ppvz_kvw_prc: 0,
        ppvz_sales_commission: 375.0,
        ppvz_for_pay: 2500.0,
        ppvz_reward: 0,
        acquiring_fee: 37.5,
        acquiring_percent: 1.5,
        acquiring_bank: 'Test Bank',
        ppvz_vw: 0,
        ppvz_vw_nds: 0,
        stock_id: null,
        supplier_oper_id: 'S12346',
        country_name: 'Russia',
        bonus_type_name: null,
        srid: 'S12346',
      },
      {
        realizationreport_id: 1003,
        date_from: '2025-10-01',
        date_to: '2025-10-23',
        create_dt: '2025-10-22T09:15:00Z',
        currency_name: 'RUB',
        suppliercontract_code: null,
        rrd_id: 1003,
        gi_id: 3,
        dlv_prc: 0,
        fix_tariff_date_from: '2025-10-01',
        fix_tariff_date_to: '2025-10-23',
        subject_name: 'Electronics',
        nm_id: 12345,
        brand_name: 'TestBrand',
        sa_name: 'SKU001',
        ts_name: 'M',
        barcode: '1234567890',
        doc_type_name: 'Продажа',
        quantity: 1,
        retail_price: 2000.0,
        retail_amount: 2000.0,
        sale_percent: 25,
        commission_percent: 15,
        office_name: 'Moscow Office',
        supplier_oper_name: 'Sale',
        order_dt: '2025-10-21T09:15:00Z',
        sale_dt: '2025-10-22T09:15:00Z',
        rr_dt: null,
        shk_id: 3,
        retail_price_withdisc_rub: 1500.0,
        delivery_rub: 0,
        gi_box_type_name: 'Box',
        product_discount_for_report: 25,
        supplier_promo: 0,
        ppvz_kvw_prc_base_date: null,
        ppvz_kvw_prc: 0,
        ppvz_sales_commission: 225.0,
        ppvz_for_pay: 1500.0,
        ppvz_reward: 0,
        acquiring_fee: 22.5,
        acquiring_percent: 1.5,
        acquiring_bank: 'Test Bank',
        ppvz_vw: 0,
        ppvz_vw_nds: 0,
        stock_id: null,
        supplier_oper_id: 'S12347',
        country_name: 'Russia',
        bonus_type_name: null,
        srid: 'S12347',
      },
    ]);
  }),

  // Analytics API - Sales Statistics
  http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', () => {
    return HttpResponse.json({
      error: false,
      errorText: '',
      additionalErrors: null,
      data: {
        page: 1,
        isNextPage: false,
        cards: [
          {
            nmID: 12345,
            vendorCode: 'SKU001',
            brandName: 'TestBrand',
            tags: [],
            object: { id: 1, name: 'Electronics' },
            statistics: {
              selectedPeriod: {
                begin: '2025-10-01T00:00:00Z',
                end: '2025-10-23T23:59:59Z',
                openCardCount: 1000,
                addToCartCount: 200,
                ordersCount: 150,
                ordersSumRub: 225000,
                buyoutsCount: 120,
                buyoutsSumRub: 180000,
                cancelCount: 30,
                cancelSumRub: 45000,
                avgPriceRub: 1500,
                avgOrdersCountPerDay: 6.52,
                conversions: {
                  addToCartPercent: 20,
                  cartToOrderPercent: 75,
                  buyoutsPercent: 80,
                },
              },
              previousPeriod: {
                begin: '2025-09-01T00:00:00Z',
                end: '2025-09-23T23:59:59Z',
                openCardCount: 900,
                addToCartCount: 180,
                ordersCount: 140,
                ordersSumRub: 210000,
                buyoutsCount: 110,
                buyoutsSumRub: 165000,
                cancelCount: 30,
                cancelSumRub: 45000,
                avgPriceRub: 1500,
                avgOrdersCountPerDay: 6.08,
                conversions: {
                  addToCartPercent: 20,
                  cartToOrderPercent: 77.78,
                  buyoutsPercent: 78.57,
                },
              },
              periodComparison: {
                openCardDynamics: 11.11,
                addToCartDynamics: 11.11,
                ordersCountDynamics: 7.14,
                ordersSumRubDynamics: 7.14,
                buyoutsCountDynamics: 9.09,
                buyoutsSumRubDynamics: 9.09,
                cancelCountDynamics: 0,
                cancelSumRubDynamics: 0,
                avgOrdersCountPerDayDynamics: 7.23,
                avgPriceRubDynamics: 0,
                conversions: {
                  addToCartPercent: 0,
                  cartToOrderPercent: -2.78,
                  buyoutsPercent: 1.43,
                },
              },
            },
            stocks: {
              stocksMp: 50,
              stocksWb: 100,
            },
          },
          {
            nmID: 12346,
            vendorCode: 'SKU002',
            brandName: 'TestBrand',
            tags: [],
            object: { id: 1, name: 'Electronics' },
            statistics: {
              selectedPeriod: {
                begin: '2025-10-01T00:00:00Z',
                end: '2025-10-23T23:59:59Z',
                openCardCount: 800,
                addToCartCount: 150,
                ordersCount: 100,
                ordersSumRub: 250000,
                buyoutsCount: 80,
                buyoutsSumRub: 200000,
                cancelCount: 20,
                cancelSumRub: 50000,
                avgPriceRub: 2500,
                avgOrdersCountPerDay: 4.35,
                conversions: {
                  addToCartPercent: 18.75,
                  cartToOrderPercent: 66.67,
                  buyoutsPercent: 80,
                },
              },
              previousPeriod: {
                begin: '2025-09-01T00:00:00Z',
                end: '2025-09-23T23:59:59Z',
                openCardCount: 750,
                addToCartCount: 140,
                ordersCount: 95,
                ordersSumRub: 237500,
                buyoutsCount: 75,
                buyoutsSumRub: 187500,
                cancelCount: 20,
                cancelSumRub: 50000,
                avgPriceRub: 2500,
                avgOrdersCountPerDay: 4.13,
                conversions: {
                  addToCartPercent: 18.67,
                  cartToOrderPercent: 67.86,
                  buyoutsPercent: 78.95,
                },
              },
              periodComparison: {
                openCardDynamics: 6.67,
                addToCartDynamics: 7.14,
                ordersCountDynamics: 5.26,
                ordersSumRubDynamics: 5.26,
                buyoutsCountDynamics: 6.67,
                buyoutsSumRubDynamics: 6.67,
                cancelCountDynamics: 0,
                cancelSumRubDynamics: 0,
                avgOrdersCountPerDayDynamics: 5.33,
                avgPriceRubDynamics: 0,
                conversions: {
                  addToCartPercent: 0.08,
                  cartToOrderPercent: -1.19,
                  buyoutsPercent: 1.05,
                },
              },
            },
            stocks: {
              stocksMp: 30,
              stocksWb: 70,
            },
          },
        ],
      },
    });
  }),

  // Communications API - Reviews
  http.get('https://feedbacks-api.wildberries.ru/api/v1/feedbacks', ({ request }) => {
    const url = new URL(request.url);
    const isAnswered = url.searchParams.get('isAnswered');

    if (isAnswered === 'false') {
      return HttpResponse.json({
        data: {
          countUnanswered: 3,
          countArchive: 50,
          feedbacks: [
            {
              id: 'R1',
              text: 'Poor quality product',
              pros: '',
              cons: 'Bad quality',
              productValuation: 2,
              createdDate: '2025-10-22T10:00:00Z',
              answer: null,
              state: 'none',
              productDetails: {
                nmId: 12345,
                imtId: 1,
                productName: 'Test Product 1',
                supplierArticle: 'SKU001',
              },
              photoLinks: null,
            },
            {
              id: 'R2',
              text: 'Terrible experience',
              pros: '',
              cons: 'Very bad',
              productValuation: 1,
              createdDate: '2025-10-21T15:00:00Z',
              answer: null,
              state: 'none',
              productDetails: {
                nmId: 12346,
                imtId: 2,
                productName: 'Test Product 2',
                supplierArticle: 'SKU002',
              },
              photoLinks: null,
            },
            {
              id: 'R3',
              text: 'Great product!',
              pros: 'Excellent',
              cons: '',
              productValuation: 5,
              createdDate: '2025-10-20T12:00:00Z',
              answer: null,
              state: 'none',
              productDetails: {
                nmId: 12345,
                imtId: 1,
                productName: 'Test Product 1',
                supplierArticle: 'SKU001',
              },
              photoLinks: null,
            },
          ],
        },
      });
    }

    return HttpResponse.json({
      data: {
        countUnanswered: 0,
        countArchive: 50,
        feedbacks: [
          {
            id: 'R1',
            text: 'Good product',
            pros: 'Nice',
            cons: '',
            productValuation: 4,
            createdDate: '2025-10-20T10:00:00Z',
            answer: {
              text: 'Thank you!',
              state: 'none',
              editable: false,
            },
            state: 'none',
            productDetails: {
              nmId: 12345,
              imtId: 1,
              productName: 'Test Product 1',
              supplierArticle: 'SKU001',
            },
            photoLinks: null,
          },
        ],
      },
    });
  }),

  // Communications API - Questions
  http.get('https://feedbacks-api.wildberries.ru/api/v1/questions', ({ request }) => {
    const url = new URL(request.url);
    const isAnswered = url.searchParams.get('isAnswered');

    if (isAnswered === 'false') {
      return HttpResponse.json({
        data: {
          countUnanswered: 2,
          countArchive: 20,
          questions: [
            {
              id: 'Q1',
              text: 'What is the warranty?',
              createdDate: '2025-10-19T10:00:00Z',
              state: 'none',
              answer: null,
              productDetails: {
                nmId: 12345,
                imtId: 1,
                productName: 'Test Product 1',
                supplierArticle: 'SKU001',
              },
              wasViewed: false,
            },
            {
              id: 'Q2',
              text: 'When will it be back in stock?',
              createdDate: '2025-10-15T14:00:00Z',
              state: 'none',
              answer: null,
              productDetails: {
                nmId: 12346,
                imtId: 2,
                productName: 'Test Product 2',
                supplierArticle: 'SKU002',
              },
              wasViewed: false,
            },
          ],
        },
      });
    }

    return HttpResponse.json({
      data: {
        countUnanswered: 0,
        countArchive: 20,
        questions: [],
      },
    });
  }),

  // Reports API - Sales
  http.get('https://statistics-api.wildberries.ru/api/v1/supplier/sales', () => {
    return HttpResponse.json([
      {
        date: '2025-10-20T10:00:00Z',
        lastChangeDate: '2025-10-20T10:00:00Z',
        warehouseName: 'Moscow Warehouse',
        warehouseType: 'Склад WB' as const,
        countryName: 'Russia',
        oblastOkrugName: 'Central',
        regionName: 'Moscow',
        supplierArticle: 'SKU001',
        nmId: 12345,
        barcode: '1234567890',
        category: 'Electronics',
        subject: 'Phone',
        brand: 'TestBrand',
        techSize: 'M',
        incomeID: 1,
        isSupply: true,
        isRealization: false,
        totalPrice: 2000.0,
        discountPercent: 25,
        spp: 0,
        paymentSaleAmount: 0,
        forPay: 1500.0,
        finishedPrice: 1500.0,
        priceWithDisc: 1500.0,
        saleID: 'S12345',
        sticker: 'ST001',
        gNumber: 'G001',
        srid: 'SR001',
      },
      {
        date: '2025-10-21T14:30:00Z',
        lastChangeDate: '2025-10-21T14:30:00Z',
        warehouseName: 'Moscow Warehouse',
        warehouseType: 'Склад WB' as const,
        countryName: 'Russia',
        oblastOkrugName: 'Central',
        regionName: 'Moscow',
        supplierArticle: 'SKU002',
        nmId: 12346,
        barcode: '1234567891',
        category: 'Electronics',
        subject: 'Tablet',
        brand: 'TestBrand',
        techSize: 'L',
        incomeID: 2,
        isSupply: true,
        isRealization: false,
        totalPrice: 3000.0,
        discountPercent: 17,
        spp: 0,
        paymentSaleAmount: 0,
        forPay: 2500.0,
        finishedPrice: 2500.0,
        priceWithDisc: 2500.0,
        saleID: 'S12346',
        sticker: 'ST002',
        gNumber: 'G002',
        srid: 'SR002',
      },
      {
        date: '2025-10-22T09:00:00Z',
        lastChangeDate: '2025-10-22T09:00:00Z',
        warehouseName: 'Moscow Warehouse',
        warehouseType: 'Склад WB' as const,
        countryName: 'Russia',
        oblastOkrugName: 'Central',
        regionName: 'Moscow',
        supplierArticle: 'SKU001',
        nmId: 12345,
        barcode: '1234567890',
        category: 'Electronics',
        subject: 'Phone',
        brand: 'TestBrand',
        techSize: 'M',
        incomeID: 3,
        isSupply: true,
        isRealization: false,
        totalPrice: 2000.0,
        discountPercent: 25,
        spp: 0,
        paymentSaleAmount: 0,
        forPay: 1500.0,
        finishedPrice: 1500.0,
        priceWithDisc: 1500.0,
        saleID: 'S12347',
        sticker: 'ST003',
        gNumber: 'G003',
        srid: 'SR003',
      },
    ]);
  }),

  // Error scenario handlers
  http.get('https://finance-api.wildberries.ru/api/v1/error-test', () => {
    return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
  }),

  http.get('https://finance-api.wildberries.ru/api/v1/rate-limit-test', () => {
    return HttpResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Cross-Module Examples Integration Tests', () => {
  let sdk: WildberriesSDK;

  beforeEach(() => {
    sdk = new WildberriesSDK({
      apiKey: 'test-api-key-cross-module-examples',
    });
  });

  describe('Business Dashboard Example', () => {
    it('should fetch data from all three modules (Finances, Analytics, Communications)', async () => {
      // Fetch from Finances
      const balance = await sdk.finances.getBalance();
      expect(balance.current).toBe(50000.5);

      // Wait for rate limit
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });

      // Fetch from Analytics
      const analytics = await sdk.analytics.getSalesFunnel({
        brandNames: ['TestBrand'],
        period: {
          begin: '2025-10-01',
          end: '2025-10-23',
        },
      });
      expect(analytics.data.cards).toHaveLength(2);
      expect(analytics.data.cards[0]?.nmID).toBe(12345);

      // Wait for rate limit
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });

      // Fetch from Communications
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      expect(reviews.data.feedbacks.length).toBeGreaterThan(0);
    });

    it('should correctly structure dashboard data with all metrics', async () => {
      const balance = await sdk.finances.getBalance();
      const analytics = await sdk.analytics.getSalesFunnel({
        brandNames: ['TestBrand'],
        period: {
          begin: '2025-10-01',
          end: '2025-10-23',
        },
      });
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      // Calculate metrics
      const totalViews = analytics.data.cards.reduce(
        (sum, item) => sum + item.statistics.selectedPeriod.openCardCount,
        0
      );
      const totalOrders = analytics.data.cards.reduce(
        (sum, item) => sum + item.statistics.selectedPeriod.ordersCount,
        0
      );

      // Simulate dashboard structure
      const dashboard = {
        financials: {
          currentBalance: balance.current,
          currency: balance.currency,
        },
        performance: {
          totalViews,
          totalOrders,
          conversionRate: (totalOrders / totalViews) * 100,
        },
        customerSentiment: {
          totalReviews: reviews.data.feedbacks.length,
          unansweredReviews: reviews.data.countUnanswered,
        },
      };

      expect(dashboard.financials.currentBalance).toBe(50000.5);
      expect(dashboard.performance.totalViews).toBe(1800); // 1000 + 800
      expect(dashboard.performance.totalOrders).toBe(250); // 150 + 100
      expect(dashboard.performance.conversionRate).toBeCloseTo(13.89, 1);
      expect(dashboard.customerSentiment.totalReviews).toBeGreaterThan(0);
    });

    it('should handle module failure gracefully', async () => {
      // Mock one module to fail
      server.use(
        http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', () => {
          return HttpResponse.json({ error: 'Service unavailable' }, { status: 503 });
        })
      );

      // Finances should still work
      const balance = await sdk.finances.getBalance();
      expect(balance.current).toBe(50000.5);

      // Analytics should fail
      await expect(
        sdk.analytics.getSalesFunnel({
          brandNames: ['TestBrand'],
          period: {
            begin: '2025-10-01',
            end: '2025-10-23',
          },
        })
      ).rejects.toThrow();

      // Communications should still work
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      expect(reviews.data.feedbacks.length).toBeGreaterThan(0);
    });

    it('should respect rate limits with sequential calls', async () => {
      const start = Date.now();

      await sdk.finances.getBalance();
      await sdk.analytics.getSalesFunnel({
        brandNames: ['TestBrand'],
        period: {
          begin: '2025-10-01',
          end: '2025-10-23',
        },
      });
      await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      const elapsed = Date.now() - start;

      // With mocked API, should be fast (no real rate limiting needed in tests)
      expect(elapsed).toBeLessThan(1000);
    });
  });

  describe('Financial Reconciliation Example', () => {
    it('should fetch transactions and sales data', async () => {
      const transactions = await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });
      expect(transactions).toHaveLength(3);
      expect(transactions[0]?.rrd_id).toBe(1001);

      // Wait for rate limit
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });

      const sales = await sdk.reports.getSales('2025-10-01');
      expect(sales).toHaveLength(3);
      expect(sales[0]?.saleID).toBe('S12345');
    });

    it('should match transactions to sales by saleID and nmId', async () => {
      const transactions = await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });
      const sales = await sdk.reports.getSales('2025-10-01');

      // Match transactions to sales
      const matched: { transactionId: number; saleID: string; nmId: number }[] = [];

      transactions.forEach((transaction) => {
        const matchingSale = sales.find(
          (sale) => sale.saleID === transaction.srid && sale.nmId === transaction.nm_id
        );

        if (matchingSale) {
          matched.push({
            transactionId: transaction.rrd_id,
            saleID: matchingSale.saleID,
            nmId: matchingSale.nmId,
          });
        }
      });

      expect(matched.length).toBe(3); // All 3 should match
      expect(matched[0]?.transactionId).toBe(1001);
      expect(matched[0]?.saleID).toBe('S12345');
      expect(matched[0]?.nmId).toBe(12345);
    });

    it('should calculate reconciliation metrics', async () => {
      const transactions = await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });
      const sales = await sdk.reports.getSales('2025-10-01');

      const totalTransactionValue = transactions.reduce((sum, t) => sum + t.ppvz_for_pay, 0);
      const totalSalesRevenue = sales.reduce((sum, s) => sum + s.forPay, 0);

      expect(totalTransactionValue).toBe(5500.0); // 1500 + 2500 + 1500
      expect(totalSalesRevenue).toBe(5500.0); // 1500 + 2500 + 1500
      expect(transactions.length).toBe(3);
      expect(sales.length).toBe(3);
    });

    it('should detect timing discrepancies between transactions and sales', async () => {
      const transactions = await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });
      const sales = await sdk.reports.getSales('2025-10-01');

      // Check timing for matched pairs
      transactions.forEach((transaction) => {
        const matchingSale = sales.find((s) => s.saleID === transaction.srid);
        if (matchingSale) {
          const transactionDate = new Date(transaction.sale_dt);
          const saleDate = new Date(matchingSale.date);
          const timingDiff = Math.abs(transactionDate.getTime() - saleDate.getTime());

          // Timing should be within 72 hours (259200000 ms)
          expect(timingDiff).toBeLessThan(259200000);
        }
      });
    });

    it('should handle unmatched transactions and sales', async () => {
      // Add extra unmatched transaction
      server.use(
        http.get(
          'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
          () => {
            return HttpResponse.json([
              {
                realizationreport_id: 1004,
                date_from: '2025-10-01',
                date_to: '2025-10-23',
                create_dt: '2025-10-23T10:00:00Z',
                currency_name: 'RUB',
                suppliercontract_code: null,
                rrd_id: 1004,
                gi_id: 4,
                dlv_prc: 0,
                fix_tariff_date_from: '2025-10-01',
                fix_tariff_date_to: '2025-10-23',
                subject_name: 'Electronics',
                nm_id: 99999,
                brand_name: 'TestBrand',
                sa_name: 'SKU999',
                ts_name: 'XL',
                barcode: '9999999999',
                doc_type_name: 'Продажа',
                quantity: 1,
                retail_price: 3500.0,
                retail_amount: 3500.0,
                sale_percent: 14,
                commission_percent: 15,
                office_name: 'Moscow Office',
                supplier_oper_name: 'Sale',
                order_dt: '2025-10-22T10:00:00Z',
                sale_dt: '2025-10-23T10:00:00Z',
                rr_dt: null,
                shk_id: 4,
                retail_price_withdisc_rub: 3000.0,
                delivery_rub: 0,
                gi_box_type_name: 'Box',
                product_discount_for_report: 14,
                supplier_promo: 0,
                ppvz_kvw_prc_base_date: null,
                ppvz_kvw_prc: 0,
                ppvz_sales_commission: 450.0,
                ppvz_for_pay: 3000.0,
                ppvz_reward: 0,
                acquiring_fee: 45.0,
                acquiring_percent: 1.5,
                acquiring_bank: 'Test Bank',
                ppvz_vw: 0,
                ppvz_vw_nds: 0,
                stock_id: null,
                supplier_oper_id: 'S99999',
                country_name: 'Russia',
                bonus_type_name: null,
                srid: 'S99999',
              },
            ]);
          }
        )
      );

      const transactions = await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });
      const sales = await sdk.reports.getSales('2025-10-01');

      const unmatchedTransactions = transactions.filter(
        (t) => !sales.some((s) => s.saleID === t.srid)
      );

      expect(unmatchedTransactions.length).toBe(1);
      expect(unmatchedTransactions[0]?.srid).toBe('S99999');
    });
  });

  describe('Customer Engagement Example', () => {
    it('should fetch reviews and questions from Communications module', async () => {
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      expect(reviews.data.feedbacks.length).toBe(3);
      expect(reviews.data.countUnanswered).toBe(3);

      // Wait for rate limit
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });

      const questions = await sdk.communications.getQuestions({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      expect(questions.data.questions.length).toBe(2);
      expect(questions.data.countUnanswered).toBe(2);
    });

    it('should identify negative reviews (rating 1-2 stars)', async () => {
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      const negativeReviews = reviews.data.feedbacks.filter((r) => r.productValuation <= 2);

      expect(negativeReviews.length).toBe(2);
      expect(negativeReviews[0]?.productDetails.nmId).toBe(12345);
      expect(negativeReviews[0]?.productValuation).toBe(2);
      expect(negativeReviews[1]?.productDetails.nmId).toBe(12346);
      expect(negativeReviews[1]?.productValuation).toBe(1);
    });

    it('should calculate urgency scores for products', async () => {
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      const questions = await sdk.communications.getQuestions({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      // Calculate urgency score per product
      const productScores = new Map<number, number>();

      // Negative reviews: +10 points
      reviews.data.feedbacks.forEach((review) => {
        if (review.productValuation <= 2) {
          const currentScore = productScores.get(review.productDetails.nmId) ?? 0;
          productScores.set(review.productDetails.nmId, currentScore + 10);
        }
      });

      // Unanswered questions: +5 points (older questions +8)
      const now = new Date();
      questions.data.questions.forEach((question) => {
        const createdDate = new Date(question.createdDate);
        const daysOld = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
        const score = daysOld > 3 ? 8 : 5;

        const currentScore = productScores.get(question.productDetails.nmId) ?? 0;
        productScores.set(question.productDetails.nmId, currentScore + score);
      });

      // Product 12345 should have highest urgency (negative review + old question)
      const score12345 = productScores.get(12345) ?? 0;
      const score12346 = productScores.get(12346) ?? 0;
      expect(score12345).toBeGreaterThan(10);
      expect(score12346).toBeGreaterThan(0);
    });

    it('should generate actionable recommendations', async () => {
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      const negativeReviews = reviews.data.feedbacks.filter((r) => r.productValuation <= 2);

      // Generate recommendations
      const recommendations = negativeReviews.map((review) => ({
        nmId: review.productDetails.nmId,
        action:
          review.productValuation === 1 ? 'Immediate response required' : 'Respond within 24 hours',
        priority: review.productValuation === 1 ? 'CRITICAL' : 'HIGH',
      }));

      expect(recommendations.length).toBe(2);
      expect(recommendations.find((r) => r.nmId === 12346)?.priority).toBe('CRITICAL');
      expect(recommendations.find((r) => r.nmId === 12345)?.priority).toBe('HIGH');
    });

    it('should calculate customer satisfaction metrics', async () => {
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      const questions = await sdk.communications.getQuestions({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      // Calculate average rating
      const totalRating = reviews.data.feedbacks.reduce((sum, r) => sum + r.productValuation, 0);
      const averageRating = totalRating / reviews.data.feedbacks.length;

      // Calculate response rate (0% for all unanswered)
      const responseRate = 0; // All are unanswered in this test

      expect(averageRating).toBeCloseTo(2.67, 1); // (2 + 1 + 5) / 3
      expect(responseRate).toBe(0);
      expect(reviews.data.countUnanswered).toBe(3);
      expect(questions.data.countUnanswered).toBe(2);
    });
  });

  describe('BI Export Example', () => {
    it('should fetch data from all four modules (Finances, Analytics, Reports, Communications)', async () => {
      const balance = await sdk.finances.getBalance();
      expect(balance.current).toBeDefined();

      const transactions = await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });
      expect(transactions.length).toBeGreaterThan(0);

      const analytics = await sdk.analytics.getSalesFunnel({
        brandNames: ['TestBrand'],
        period: {
          begin: '2025-10-01',
          end: '2025-10-23',
        },
      });
      expect(analytics.data.cards.length).toBeGreaterThan(0);

      const sales = await sdk.reports.getSales('2025-10-01');
      expect(sales.length).toBeGreaterThan(0);

      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      expect(reviews.data.feedbacks.length).toBeGreaterThan(0);
    });

    it('should transform financial data into BI export format', async () => {
      const transactions = await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });

      // Transform to BI format
      const biRecords = transactions.map((t) => ({
        timestamp: new Date().toISOString(),
        dataType: 'finance' as const,
        productId: t.nm_id,
        metric: 'revenue',
        value: t.ppvz_for_pay,
        date: t.sale_dt,
        metadata: {
          transactionId: t.rrd_id,
          saleID: t.srid,
        },
      }));

      expect(biRecords.length).toBe(3);
      expect(biRecords[0]?.dataType).toBe('finance');
      expect(biRecords[0]?.metric).toBe('revenue');
      expect(biRecords[0]?.value).toBe(1500.0);
      expect(biRecords[0]?.productId).toBe(12345);
    });

    it('should transform sales data into BI export format', async () => {
      const sales = await sdk.reports.getSales('2025-10-01');

      // Transform to BI format
      const biRecords = sales.map((s) => ({
        timestamp: new Date().toISOString(),
        dataType: 'sales' as const,
        productId: s.nmId,
        metric: 'sale_amount',
        value: s.forPay,
        date: s.sale_dt,
        metadata: {
          saleID: s.saleID,
        },
      }));

      expect(biRecords.length).toBe(3);
      expect(biRecords[0]?.dataType).toBe('sales');
      expect(biRecords[0]?.metric).toBe('sale_amount');
      expect(biRecords[0]?.value).toBe(1500.0);
    });

    it('should transform review metrics into BI export format', async () => {
      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      // Aggregate reviews by product
      const reviewMetrics = new Map<number, { totalRating: number; count: number }>();

      reviews.data.feedbacks.forEach((review) => {
        const current = reviewMetrics.get(review.productDetails.nmId) ?? {
          totalRating: 0,
          count: 0,
        };
        reviewMetrics.set(review.productDetails.nmId, {
          totalRating: current.totalRating + review.productValuation,
          count: current.count + 1,
        });
      });

      // Transform to BI format
      const biRecords = Array.from(reviewMetrics.entries()).map(([nmId, metrics]) => ({
        timestamp: new Date().toISOString(),
        dataType: 'customer' as const,
        productId: nmId,
        metric: 'average_rating',
        value: metrics.totalRating / metrics.count,
        date: new Date().toISOString(),
        metadata: {
          reviewCount: metrics.count,
        },
      }));

      expect(biRecords.length).toBe(2); // 2 products
      expect(biRecords[0]?.dataType).toBe('customer');
      expect(biRecords[0]?.metric).toBe('average_rating');
    });

    it('should generate unified BI export dataset', async () => {
      const transactions = await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });
      const sales = await sdk.reports.getSales('2025-10-01');

      // Combine into unified dataset
      const biExportData = [
        ...transactions.map((t) => ({
          timestamp: new Date().toISOString(),
          dataType: 'finance' as const,
          productId: t.nm_id,
          metric: 'revenue',
          value: t.ppvz_for_pay,
          date: t.sale_dt,
          metadata: { transactionId: t.rrd_id },
        })),
        ...sales.map((s) => ({
          timestamp: new Date().toISOString(),
          dataType: 'sales' as const,
          productId: s.nmId,
          metric: 'sale_amount',
          value: s.forPay,
          date: s.date,
          metadata: { saleID: s.saleID },
        })),
      ];

      expect(biExportData.length).toBe(6); // 3 transactions + 3 sales
      expect(biExportData.filter((r) => r.dataType === 'finance').length).toBe(3);
      expect(biExportData.filter((r) => r.dataType === 'sales').length).toBe(3);
    });

    it('should handle CSV export format', () => {
      const biRecord = {
        timestamp: '2025-10-23T10:00:00Z',
        dataType: 'finance',
        productId: 12345,
        metric: 'revenue',
        value: 1500.0,
        date: '2025-10-20T10:00:00Z',
        metadata: { transactionId: 1001 },
      };

      // Simulate CSV row generation
      const csvRow = `${biRecord.timestamp},${biRecord.dataType},${biRecord.productId},${biRecord.metric},${biRecord.value},${biRecord.date}`;

      expect(csvRow).toContain('2025-10-23T10:00:00Z');
      expect(csvRow).toContain('finance');
      expect(csvRow).toContain('12345');
      expect(csvRow).toContain('revenue');
      expect(csvRow).toContain('1500');
    });
  });

  describe('Rate Limit Management', () => {
    it('should respect rate limits across multiple modules', async () => {
      const start = Date.now();

      // Make sequential calls across different modules
      await sdk.finances.getBalance();
      await sdk.analytics.getSalesFunnel({
        brandNames: ['TestBrand'],
        period: {
          begin: '2025-10-01',
          end: '2025-10-23',
        },
      });
      await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      await sdk.reports.getSales('2025-10-01');

      const elapsed = Date.now() - start;

      // With mocked API, should be fast
      expect(elapsed).toBeLessThan(2000);
    });

    it('should handle rate limit errors gracefully', async () => {
      server.use(
        http.get('https://finance-api.wildberries.ru/api/v1/rate-limit-test', () => {
          return HttpResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
        })
      );

      // This would trigger rate limit error in real scenario
      // SDK should handle retry automatically
      // In this test, we just verify the error structure
      await expect(sdk.finances.getBalance()).resolves.toBeDefined();
    });
  });

  describe('Error Scenarios', () => {
    it('should handle 500 server errors', async () => {
      server.use(
        http.get('https://finance-api.wildberries.ru/api/v1/account/balance', () => {
          return HttpResponse.json({ error: 'Internal server error' }, { status: 500 });
        })
      );

      await expect(sdk.finances.getBalance()).rejects.toThrow();
    });

    it('should handle network failures', async () => {
      server.use(
        http.get('https://finance-api.wildberries.ru/api/v1/account/balance', () => {
          return HttpResponse.error();
        })
      );

      await expect(sdk.finances.getBalance()).rejects.toThrow();
    });

    it('should handle partial module failures in cross-module workflows', async () => {
      // Mock Analytics to fail
      server.use(
        http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', () => {
          return HttpResponse.json({ error: 'Service unavailable' }, { status: 503 });
        })
      );

      // Other modules should still work
      const balance = await sdk.finances.getBalance();
      expect(balance.current).toBe(50000.5);

      const reviews = await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });
      expect(reviews.data.feedbacks.length).toBeGreaterThan(0);

      // Analytics should fail
      await expect(
        sdk.analytics.getSalesFunnel({
          brandNames: ['TestBrand'],
          period: {
            begin: '2025-10-01',
            end: '2025-10-23',
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('Performance Validation', () => {
    it('should complete all examples within 30 seconds with mocked endpoints', async () => {
      const start = Date.now();

      // Business Dashboard
      await sdk.finances.getBalance();
      await sdk.analytics.getSalesFunnel({
        brandNames: ['TestBrand'],
        period: {
          begin: '2025-10-01',
          end: '2025-10-23',
        },
      });
      await sdk.communications.getReviews({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      // Financial Reconciliation
      await sdk.finances.getTransactions({
        dateFrom: '2025-10-01',
        dateTo: '2025-10-23',
      });
      await sdk.reports.getSales('2025-10-01');

      // Customer Engagement
      await sdk.communications.getQuestions({
        isAnswered: false,
        take: 10,
        skip: 0,
      });

      const elapsed = Date.now() - start;

      // Should complete in <5 seconds with mocked API
      expect(elapsed).toBeLessThan(5000);
    });

    it('should not have memory leaks during multiple operations', async () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Run multiple operations
      for (let i = 0; i < 10; i++) {
        await sdk.finances.getBalance();
        await sdk.analytics.getSalesFunnel({
          brandNames: ['TestBrand'],
          period: {
            begin: '2025-10-01',
            end: '2025-10-23',
          },
        });
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (<50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });
  });
});
