# Multi-Module Workflow

Combining multiple SDK modules for complex business operations.

## Description

This example demonstrates how to orchestrate multiple SDK modules together to implement complete business workflows like order processing, inventory management, and business dashboards.

## Order Processing Dashboard

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

interface OrderDashboard {
  newOrders: number;
  balance: number;
  currency: string;
  pendingQuestions: number;
  unansweredReviews: number;
}

async function getOrderDashboard(): Promise<OrderDashboard> {
  // Fetch data from multiple modules in parallel
  const [
    ordersResponse,
    balanceResponse,
    questionsResponse,
    reviewsResponse
  ] = await Promise.all([
    sdk.ordersFBS.getOrdersNew(),
    sdk.finances.getBalance(),
    sdk.communications.getQuestionsCountUnanswered(),
    sdk.communications.getReviewsCount({ isAnswered: false })
  ]);

  return {
    newOrders: ordersResponse.orders?.length ?? 0,
    balance: balanceResponse.for_withdraw,
    currency: balanceResponse.currency,
    pendingQuestions: questionsResponse.data?.count ?? 0,
    unansweredReviews: reviewsResponse.data?.countUnanswered ?? 0
  };
}

// Usage
const dashboard = await getOrderDashboard();
console.log('Dashboard:', dashboard);
```

## Complete Order Fulfillment Flow

```typescript
interface OrderFulfillmentResult {
  orderId: number;
  status: 'success' | 'failed';
  sticker?: string;
  error?: string;
}

async function processNewOrders(): Promise<OrderFulfillmentResult[]> {
  const results: OrderFulfillmentResult[] = [];

  // 1. Get new orders
  const { orders } = await sdk.ordersFBS.getOrdersNew();

  if (!orders?.length) {
    console.log('No new orders to process');
    return results;
  }

  console.log(`Processing ${orders.length} new orders...`);

  for (const order of orders) {
    try {
      // 2. Get order details and status
      const [statusResponse] = (await sdk.ordersFBS.getOrderStatuses([order.id])).orders;

      // 3. Check if order can be processed
      if (statusResponse.supplierStatus !== 'new') {
        console.log(`Order ${order.id} already processed, skipping`);
        continue;
      }

      // 4. Get sticker for shipping
      const stickerResponse = await sdk.ordersFBS.getOrdersStickers({
        orders: [order.id],
        type: 'png',
        width: 58,
        height: 40
      });

      const sticker = stickerResponse.stickers?.[0];

      results.push({
        orderId: order.id,
        status: 'success',
        sticker: sticker?.file
      });

      console.log(`Order ${order.id} processed successfully`);

    } catch (error) {
      results.push({
        orderId: order.id,
        status: 'failed',
        error: (error as Error).message
      });
      console.error(`Failed to process order ${order.id}:`, error);
    }
  }

  return results;
}
```

## Inventory Sync with Analytics

```typescript
interface InventoryReport {
  totalProducts: number;
  totalStock: number;
  lowStockProducts: Array<{
    nmId: number;
    name: string;
    stock: number;
    sales30d: number;
    daysOfStock: number;
  }>;
  recommendations: string[];
}

async function generateInventoryReport(): Promise<InventoryReport> {
  // 1. Get current stock levels
  const stocks = await sdk.reports.getStocks(
    new Date().toISOString().split('T')[0]
  );

  // 2. Get product cards for names
  const products = await sdk.products.getCardsList({
    locale: 'ru',
    withPhoto: 0
  });

  // 3. Get sales analytics for last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // v3 Sales Funnel API (SDK v2.7.0+)
  const analyticsResponse = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: {
      start: thirtyDaysAgo.toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    limit: 50,
    offset: 0,
  });

  // 4. Build product map
  const productMap = new Map(
    products.map(p => [p.nmID, p])
  );

  // 5. Analyze stock levels
  const lowStockProducts: InventoryReport['lowStockProducts'] = [];
  let totalStock = 0;

  for (const stockItem of stocks) {
    totalStock += stockItem.quantity;

    const product = productMap.get(stockItem.nmId);
    const sales30d = stockItem.quantity > 0 ? 10 : 0; // Simplified

    const daysOfStock = sales30d > 0
      ? Math.floor(stockItem.quantity / (sales30d / 30))
      : Infinity;

    if (daysOfStock < 14 && daysOfStock !== Infinity) {
      lowStockProducts.push({
        nmId: stockItem.nmId,
        name: product?.title ?? `Product ${stockItem.nmId}`,
        stock: stockItem.quantity,
        sales30d,
        daysOfStock
      });
    }
  }

  // 6. Generate recommendations
  const recommendations: string[] = [];
  if (lowStockProducts.length > 0) {
    recommendations.push(
      `Reorder ${lowStockProducts.length} products with less than 14 days of stock`
    );
  }

  return {
    totalProducts: products.length,
    totalStock,
    lowStockProducts: lowStockProducts.sort((a, b) => a.daysOfStock - b.daysOfStock),
    recommendations
  };
}
```

## Customer Communication Hub

```typescript
interface CommunicationHub {
  unreadChats: number;
  pendingQuestions: Array<{
    id: string;
    productId: number;
    question: string;
    createdAt: string;
  }>;
  pendingReviews: Array<{
    id: string;
    productId: number;
    rating: number;
    text: string;
  }>;
}

async function getCommunicationHub(): Promise<CommunicationHub> {
  // Fetch all communication data in parallel
  const [chats, questions, reviews] = await Promise.all([
    sdk.communications.getChats(),
    sdk.communications.getQuestions({
      isAnswered: false,
      take: 20,
      skip: 0
    }),
    sdk.communications.getReviews({
      isAnswered: false,
      take: 20,
      skip: 0
    })
  ]);

  return {
    unreadChats: chats.result?.filter(c => !c.isRead).length ?? 0,
    pendingQuestions: questions.data?.questions?.map(q => ({
      id: q.id,
      productId: q.productDetails.nmId,
      question: q.text,
      createdAt: q.createdDate
    })) ?? [],
    pendingReviews: reviews.data?.feedbacks?.map(r => ({
      id: r.id,
      productId: r.productDetails.nmId,
      rating: r.productValuation,
      text: r.text
    })) ?? []
  };
}

// Respond to pending items
async function respondToCommunications(hub: CommunicationHub) {
  // Answer questions with templates
  for (const question of hub.pendingQuestions.slice(0, 5)) {
    await sdk.communications.answerQuestion(
      question.id,
      'Thank you for your question. Our team will provide detailed information shortly.'
    );
    console.log(`Answered question ${question.id}`);
  }

  // Respond to positive reviews
  for (const review of hub.pendingReviews.filter(r => r.rating >= 4).slice(0, 5)) {
    await sdk.communications.respondToReview(
      review.id,
      'Thank you for your positive feedback! We appreciate your trust.'
    );
    console.log(`Responded to review ${review.id}`);
  }
}
```

## Financial Reconciliation

```typescript
interface FinancialReconciliation {
  period: { from: string; to: string };
  revenue: number;
  commissions: number;
  netProfit: number;
  orderCount: number;
  averageOrderValue: number;
}

async function reconcileFinances(
  dateFrom: string,
  dateTo: string
): Promise<FinancialReconciliation> {
  // Get financial transactions
  const transactions = await sdk.finances.getTransactions({
    dateFrom,
    dateTo,
    period: 'daily'
  });

  // Get sales data
  const sales = await sdk.reports.getSales(dateFrom, 0);

  // Get commission rates
  const commissions = await sdk.tariffs.getTariffsCommission();

  // Calculate metrics
  const totalRevenue = sales.reduce((sum, sale) =>
    sum + (sale.finishedPrice ?? 0), 0
  );

  const totalCommissions = sales.reduce((sum, sale) => {
    const rate = commissions.report?.find(
      c => c.subjectID === sale.subject
    )?.kgvpMarketplace ?? 15;
    return sum + ((sale.finishedPrice ?? 0) * rate / 100);
  }, 0);

  return {
    period: { from: dateFrom, to: dateTo },
    revenue: totalRevenue,
    commissions: totalCommissions,
    netProfit: totalRevenue - totalCommissions,
    orderCount: sales.length,
    averageOrderValue: sales.length > 0 ? totalRevenue / sales.length : 0
  };
}
```

## Full Business Intelligence Pipeline

```typescript
async function runDailyBusinessIntelligence() {
  console.log('Starting daily BI pipeline...');

  // 1. Order Dashboard
  const dashboard = await getOrderDashboard();
  console.log('Dashboard:', dashboard);

  // 2. Inventory Report
  const inventory = await generateInventoryReport();
  console.log('Low stock products:', inventory.lowStockProducts.length);

  // 3. Communication Hub
  const comms = await getCommunicationHub();
  console.log('Pending items:', {
    questions: comms.pendingQuestions.length,
    reviews: comms.pendingReviews.length
  });

  // 4. Financial Summary
  const today = new Date().toISOString().split('T')[0];
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];
  const finances = await reconcileFinances(monthAgo, today);
  console.log('30-day profit:', finances.netProfit);

  return {
    dashboard,
    inventory,
    communications: comms,
    finances
  };
}
```

## Related Materials

- [Batch Operations](../intermediate/batch-operations.md)
- [Performance Optimization](performance.md)
- [API Reference](/api/)

---

[Back to Examples](../index.md) | [Previous: Batch Operations](../intermediate/batch-operations.md) | [Next: Custom Retry Logic](custom-retry.md)
