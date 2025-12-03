# Returns Handling

Managing product returns and customer feedback.

## Description

This use case demonstrates how to handle product returns on Wildberries, including processing return requests from customer feedback, tracking return status, and analyzing return patterns.

## Request Return by Feedback

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Request a product return based on customer feedback
async function requestReturnByFeedback(feedbackId: string) {
  await sdk.communications.requestReturnByFeedback(feedbackId);
  console.log(`Return requested for feedback ${feedbackId}`);
}

// Example: Process return request
await requestReturnByFeedback('abc123-feedback-id');
```

## Monitor Negative Reviews for Returns

```typescript
interface NegativeReview {
  id: string;
  productId: number;
  rating: number;
  text: string;
  createdAt: string;
  hasPhoto: boolean;
}

async function getNegativeReviews(
  maxRating = 2
): Promise<NegativeReview[]> {
  const reviews = await sdk.communications.getReviews({
    isAnswered: false,
    take: 100,
    skip: 0
  });

  const negativeReviews = reviews.data?.feedbacks
    ?.filter(r => (r.productValuation ?? 5) <= maxRating)
    .map(r => ({
      id: r.id ?? '',
      productId: r.productDetails?.nmId ?? 0,
      rating: r.productValuation ?? 0,
      text: r.text ?? '',
      createdAt: r.createdDate ?? '',
      hasPhoto: (r.photoLinks?.length ?? 0) > 0
    })) ?? [];

  console.log(`Found ${negativeReviews.length} negative reviews (rating <= ${maxRating})`);

  return negativeReviews;
}

const negativeReviews = await getNegativeReviews(2);
```

## Auto-Process Returns Workflow

```typescript
interface ReturnCandidate {
  feedbackId: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  autoProcess: boolean;
}

async function identifyReturnCandidates(): Promise<ReturnCandidate[]> {
  const reviews = await sdk.communications.getReviews({
    isAnswered: false,
    take: 100,
    skip: 0
  });

  const candidates: ReturnCandidate[] = [];

  for (const review of reviews.data?.feedbacks ?? []) {
    const text = (review.text ?? '').toLowerCase();
    const rating = review.productValuation ?? 5;

    // Keywords indicating return request
    const returnKeywords = [
      'возврат', 'вернуть', 'брак', 'сломан', 'дефект',
      'return', 'refund', 'broken', 'defect', 'damaged'
    ];

    const hasReturnIntent = returnKeywords.some(kw => text.includes(kw));
    const hasPhoto = (review.photoLinks?.length ?? 0) > 0;

    if (rating <= 2 || hasReturnIntent) {
      candidates.push({
        feedbackId: review.id ?? '',
        reason: hasReturnIntent ? 'Return request in text' : `Low rating: ${rating}`,
        priority: rating === 1 || hasPhoto ? 'high' : rating === 2 ? 'medium' : 'low',
        autoProcess: rating === 1 && hasPhoto && hasReturnIntent
      });
    }
  }

  console.log(`Identified ${candidates.length} return candidates`);
  console.log(`  High priority: ${candidates.filter(c => c.priority === 'high').length}`);
  console.log(`  Auto-process: ${candidates.filter(c => c.autoProcess).length}`);

  return candidates;
}
```

## Respond to Return Request

```typescript
async function respondToReturnRequest(
  feedbackId: string,
  acceptReturn: boolean
) {
  if (acceptReturn) {
    // Request the return
    await sdk.communications.requestReturnByFeedback(feedbackId);

    // Send confirmation message
    await sdk.communications.respondToReview(
      feedbackId,
      'We apologize for the inconvenience. A return has been initiated for your order. ' +
      'Please follow the instructions in your Wildberries app to complete the return process.'
    );

    console.log(`Return accepted for feedback ${feedbackId}`);
  } else {
    // Respond with alternative solution
    await sdk.communications.respondToReview(
      feedbackId,
      'We are sorry to hear about your experience. ' +
      'Our customer service team will contact you to resolve this issue.'
    );

    console.log(`Return declined for feedback ${feedbackId}, alternative offered`);
  }
}
```

## Track Return Sales

```typescript
interface ReturnAnalysis {
  period: { from: string; to: string };
  totalSales: number;
  totalReturns: number;
  returnRate: number;
  returnsByProduct: Array<{
    nmId: number;
    name: string;
    sales: number;
    returns: number;
    returnRate: number;
  }>;
}

async function analyzeReturns(days = 30): Promise<ReturnAnalysis> {
  const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  // Get sales data (includes returns as negative quantities)
  const sales = await sdk.reports.getSales(fromDate, 0);

  // Get product names
  const products = await sdk.products.getAllProducts({ locale: 'ru' });
  const productNames = new Map(products.map(p => [p.nmID, p.title]));

  // Analyze by product
  const productStats = new Map<number, { sales: number; returns: number }>();

  for (const sale of sales) {
    if (!sale.nmId) continue;

    const current = productStats.get(sale.nmId) ?? { sales: 0, returns: 0 };
    const quantity = sale.quantity ?? 1;

    if (quantity > 0) {
      current.sales += quantity;
    } else {
      current.returns += Math.abs(quantity);
    }

    productStats.set(sale.nmId, current);
  }

  // Calculate totals
  let totalSales = 0;
  let totalReturns = 0;
  const returnsByProduct: ReturnAnalysis['returnsByProduct'] = [];

  for (const [nmId, stats] of productStats) {
    totalSales += stats.sales;
    totalReturns += stats.returns;

    if (stats.returns > 0) {
      returnsByProduct.push({
        nmId,
        name: productNames.get(nmId) ?? `Product ${nmId}`,
        sales: stats.sales,
        returns: stats.returns,
        returnRate: stats.sales > 0
          ? Math.round((stats.returns / stats.sales) * 1000) / 10
          : 0
      });
    }
  }

  // Sort by return rate
  returnsByProduct.sort((a, b) => b.returnRate - a.returnRate);

  return {
    period: { from: fromDate, to: new Date().toISOString().split('T')[0] },
    totalSales,
    totalReturns,
    returnRate: totalSales > 0
      ? Math.round((totalReturns / totalSales) * 1000) / 10
      : 0,
    returnsByProduct
  };
}

// Usage
const analysis = await analyzeReturns(30);
console.log(`Return rate: ${analysis.returnRate}%`);
console.log('Top products by return rate:');
analysis.returnsByProduct.slice(0, 5).forEach(p => {
  console.log(`  ${p.name}: ${p.returnRate}% (${p.returns}/${p.sales})`);
});
```

## Return Reason Analysis

```typescript
interface ReturnReasonReport {
  reasons: Array<{
    category: string;
    count: number;
    percentage: number;
    examples: string[];
  }>;
  totalAnalyzed: number;
}

async function analyzeReturnReasons(): Promise<ReturnReasonReport> {
  // Get negative reviews
  const reviews = await sdk.communications.getReviews({
    isAnswered: false,
    take: 200,
    skip: 0
  });

  const negativeReviews = reviews.data?.feedbacks
    ?.filter(r => (r.productValuation ?? 5) <= 2) ?? [];

  // Categorize by keywords
  const categories: Record<string, { count: number; examples: string[] }> = {
    'Quality Issues': { count: 0, examples: [] },
    'Size/Fit Problems': { count: 0, examples: [] },
    'Not as Described': { count: 0, examples: [] },
    'Damaged in Shipping': { count: 0, examples: [] },
    'Wrong Item': { count: 0, examples: [] },
    'Other': { count: 0, examples: [] }
  };

  const keywordMap: Record<string, string[]> = {
    'Quality Issues': ['качество', 'брак', 'сломал', 'порвал', 'quality', 'defect'],
    'Size/Fit Problems': ['размер', 'велик', 'мал', 'не подош', 'size', 'fit'],
    'Not as Described': ['не соответств', 'другой цвет', 'не похож', 'different'],
    'Damaged in Shipping': ['повреж', 'помят', 'доставк', 'damaged', 'shipping'],
    'Wrong Item': ['не то', 'перепут', 'wrong', 'incorrect']
  };

  for (const review of negativeReviews) {
    const text = (review.text ?? '').toLowerCase();
    let matched = false;

    for (const [category, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(kw => text.includes(kw))) {
        categories[category].count++;
        if (categories[category].examples.length < 3) {
          categories[category].examples.push(text.slice(0, 100));
        }
        matched = true;
        break;
      }
    }

    if (!matched) {
      categories['Other'].count++;
    }
  }

  const total = negativeReviews.length;
  const reasons = Object.entries(categories)
    .filter(([_, data]) => data.count > 0)
    .map(([category, data]) => ({
      category,
      count: data.count,
      percentage: total > 0 ? Math.round((data.count / total) * 100) : 0,
      examples: data.examples
    }))
    .sort((a, b) => b.count - a.count);

  return {
    reasons,
    totalAnalyzed: total
  };
}
```

## Proactive Return Prevention

```typescript
// Monitor products with high return rates and take action
async function preventiveReturnActions() {
  const analysis = await analyzeReturns(30);

  const highReturnProducts = analysis.returnsByProduct
    .filter(p => p.returnRate > 10 && p.sales >= 10);

  for (const product of highReturnProducts) {
    console.log(`High return rate alert for ${product.name}:`);
    console.log(`  Return rate: ${product.returnRate}%`);
    console.log(`  Recommendations:`);
    console.log(`    - Review product photos and description for accuracy`);
    console.log(`    - Check size chart for clothing items`);
    console.log(`    - Review packaging for damage prevention`);
    console.log(`    - Consider adding video review`);
  }

  return highReturnProducts;
}
```

## Related Materials

- [API Reference: CommunicationsModule](/api/classes/CommunicationsModule)
- [Order Processing](order-processing.md)
- [Shipping Management](shipping.md)

---

[Back to Examples](../index.md) | [Previous: Shipping Management](shipping.md) | [Next: Sales Dashboard](sales-dashboard.md)
