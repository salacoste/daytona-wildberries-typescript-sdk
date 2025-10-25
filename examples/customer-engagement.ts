/**
 * Customer Engagement Example
 *
 * Demonstrates a unified customer service workflow combining reviews and Q&A
 * for comprehensive customer engagement management and response prioritization.
 *
 * **Use Case**: Daily customer service prioritization for support teams
 *
 * **Modules Used**:
 * - Communications: Product reviews, Q&A
 *
 * **Key Features**:
 * - Aggregate negative reviews (rating 1-2 stars) requiring immediate attention
 * - Identify unanswered questions needing responses
 * - Calculate urgency scores for prioritization
 * - Generate actionable recommendations per product
 * - Multi-channel customer service workflow
 *
 * **Rate Limits**:
 * - Reviews endpoint: 1 request/minute
 * - Q&A endpoint: 1 request/minute
 * - Total workflow time: ~2-3 minutes for complete refresh
 *
 * **Urgency Scoring Algorithm**:
 * - Negative review (1-2 stars): +10 points per review
 * - Unanswered question: +5 points per question
 * - Very old unanswered question (>30 days): +8 points
 * - Multiple issues on same product: cumulative score + bonus
 *
 * **Performance Considerations**:
 * - Fetches all active feedback channels in sequence
 * - Memory usage: 50-150MB for typical daily volume
 * - Processing time: 15-30 seconds after data fetch
 * - Recommend running every 2-4 hours during business hours
 *
 * @example
 * ```bash
 * # Set API key
 * export WB_API_KEY="your-api-key-here"
 *
 * # Run customer engagement analysis
 * npx ts-node examples/customer-engagement.ts
 * ```
 */

import { WildberriesSDK } from '../src';
import type {
  Review,
  Question,
  ReviewFilters,
  QuestionFilters,
} from '../src/types/communications.types';

/**
 * Customer engagement report structure
 */
interface CustomerEngagementReport {
  timestamp: string;
  urgentActions: {
    negativeReviews: Review[];
    unansweredQuestions: Question[];
  };
  metrics: {
    totalReviews: number;
    averageRating: number;
    negativeReviewRate: number; // Percentage of 1-2 star reviews
    unansweredQuestionCount: number;
    customerSatisfaction: number; // Based on ratings and response activity
  };
  priorities: Array<{
    productId: number;
    productName: string;
    urgencyScore: number;
    issues: string[];
    actions: string[];
  }>;
}

/**
 * Product urgency data for scoring
 */
interface ProductUrgency {
  nmId: number;
  productName: string;
  score: number;
  negativeReviews: number;
  unansweredQuestions: number;
  oldestQuestionDays: number;
}

/**
 * Calculate urgency score for a product based on customer service indicators
 */
function calculateUrgencyScore(data: ProductUrgency): {
  score: number;
  issues: string[];
  actions: string[];
} {
  let score = data.score; // Start with base score
  const issues: string[] = [];
  const actions: string[] = [];

  // Negative reviews (1-2 stars)
  if (data.negativeReviews > 0) {
    score += data.negativeReviews * 10;
    issues.push(`${data.negativeReviews} negative review(s)`);
    actions.push('Respond to negative reviews with solutions');
    if (data.negativeReviews >= 3) {
      actions.push('Investigate product quality or description issues');
    }
  }

  // Unanswered questions
  if (data.unansweredQuestions > 0) {
    if (data.oldestQuestionDays > 30) {
      score += data.unansweredQuestions * 8;
      issues.push(`${data.unansweredQuestions} unanswered question(s) >30 days old`);
      actions.push('URGENT: Answer overdue questions immediately');
    } else {
      score += data.unansweredQuestions * 5;
      issues.push(`${data.unansweredQuestions} unanswered question(s)`);
      actions.push('Answer pending questions within 48 hours');
    }
  }

  // Multi-issue bonus (indicates systemic problem)
  const issueCount = issues.length;
  if (issueCount >= 2) {
    score += issueCount * 5;
    actions.push('Escalate to product management - multiple customer issues detected');
  }

  return { score, issues, actions };
}

/**
 * Perform customer engagement analysis across communication channels
 */
async function analyzeCustomerEngagement(
  apiKey: string
): Promise<CustomerEngagementReport> {
  const sdk = new WildberriesSDK({ apiKey });

  const timestamp = new Date().toISOString();
  console.log('=== Customer Engagement Analysis ===');
  console.log(`Timestamp: ${timestamp}`);
  console.log();

  // Track performance
  const perfStart = Date.now();
  const modulePerf: Record<string, number> = {};

  try {
    // Step 1: Fetch product reviews
    console.log('[1/2] Fetching product reviews...');
    const reviewsStart = Date.now();

    let allReviews: Review[] = [];
    let unansweredReviewCount = 0;
    let answeredReviewCount = 0;

    try {
      // Fetch unanswered reviews
      const reviewFilters: ReviewFilters = {
        isAnswered: false,
        take: 5000,
        skip: 0,
      };
      const reviewsResponse = await sdk.communications.getReviews(reviewFilters);

      allReviews = reviewsResponse.data?.feedbacks || [];
      unansweredReviewCount = reviewsResponse.data?.countUnanswered || 0;
      answeredReviewCount = reviewsResponse.data?.countArchive || 0;

      console.log(`  ✓ Fetched ${allReviews.length} unanswered reviews`);
      console.log(`  ℹ  Total: ${unansweredReviewCount} unanswered, ${answeredReviewCount} answered`);
    } catch (error) {
      console.error('  ✗ Failed to fetch reviews:', error);
      // Continue with empty reviews
      allReviews = [];
    }

    modulePerf.reviews = Date.now() - reviewsStart;

    // Rate limit delay (1 req/min for reviews)
    console.log('  ⏳ Waiting 60s for rate limit...');
    await new Promise((resolve) => setTimeout(resolve, 60000));

    // Step 2: Fetch Q&A (unanswered questions)
    console.log('[2/2] Fetching Q&A data...');
    const qaStart = Date.now();

    let unansweredQuestions: Question[] = [];
    let unansweredQuestionCount = 0;
    let answeredQuestionCount = 0;

    try {
      // Fetch unanswered questions
      const questionFilters: QuestionFilters = {
        isAnswered: false,
        take: 5000,
        skip: 0,
      };
      const questionsResponse = await sdk.communications.getQuestions(questionFilters);

      unansweredQuestions = questionsResponse.data?.questions || [];
      unansweredQuestionCount = questionsResponse.data?.countUnanswered || 0;
      answeredQuestionCount = questionsResponse.data?.countArchive || 0;

      console.log(`  ✓ Fetched ${unansweredQuestions.length} unanswered questions`);
      console.log(
        `  ℹ  Total: ${unansweredQuestionCount} unanswered, ${answeredQuestionCount} answered`
      );
    } catch (error) {
      console.error('  ✗ Failed to fetch Q&A data:', error);
      unansweredQuestions = [];
    }

    modulePerf.qa = Date.now() - qaStart;

    console.log();
    console.log('=== Data Fetching Complete ===');
    console.log(`Total fetch time: ${((Date.now() - perfStart) / 1000).toFixed(1)}s`);
    console.log(
      `Breakdown: Reviews=${(modulePerf.reviews / 1000).toFixed(1)}s, Q&A=${(modulePerf.qa / 1000).toFixed(1)}s`
    );
    console.log();

    // Step 3: Analyze and prioritize
    console.log('=== Analyzing Customer Engagement ===');
    const analysisStart = Date.now();

    // Filter negative reviews (1-2 stars)
    const negativeReviews = allReviews.filter(
      (review) => review.productValuation && review.productValuation <= 2
    );

    // Build product urgency map
    const productUrgencyMap = new Map<number, ProductUrgency>();

    // Add negative reviews to urgency map
    for (const review of negativeReviews) {
      const nmId = review.productDetails?.nmId;
      if (!nmId) continue;

      if (!productUrgencyMap.has(nmId)) {
        productUrgencyMap.set(nmId, {
          nmId,
          productName: review.productDetails?.productName || `Product ${nmId}`,
          score: 0,
          negativeReviews: 0,
          unansweredQuestions: 0,
          oldestQuestionDays: 0,
        });
      }

      const urgency = productUrgencyMap.get(nmId)!;
      urgency.negativeReviews += 1;
    }

    // Add unanswered questions to urgency map
    for (const question of unansweredQuestions) {
      const nmId = question.productDetails?.nmId;
      if (!nmId) continue;

      if (!productUrgencyMap.has(nmId)) {
        productUrgencyMap.set(nmId, {
          nmId,
          productName: question.productDetails?.productName || `Product ${nmId}`,
          score: 0,
          negativeReviews: 0,
          unansweredQuestions: 0,
          oldestQuestionDays: 0,
        });
      }

      const urgency = productUrgencyMap.get(nmId)!;
      urgency.unansweredQuestions += 1;

      // Calculate age of question in days
      const questionDate = new Date(question.createdDate);
      const now = new Date();
      const ageInDays = Math.floor(
        (now.getTime() - questionDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Track oldest question age for this product
      if (ageInDays > urgency.oldestQuestionDays) {
        urgency.oldestQuestionDays = ageInDays;
      }
    }

    // Calculate urgency scores and generate priorities
    const priorities: CustomerEngagementReport['priorities'] = [];

    // Convert Map to Array for iteration
    const urgencyEntries = Array.from(productUrgencyMap.entries());

    for (const [nmId, data] of urgencyEntries) {
      const { score, issues, actions } = calculateUrgencyScore(data);

      priorities.push({
        productId: nmId,
        productName: data.productName,
        urgencyScore: score,
        issues,
        actions,
      });
    }

    // Sort by urgency score (highest first)
    priorities.sort((a, b) => b.urgencyScore - a.urgencyScore);

    // Calculate overall metrics
    const totalReviews = allReviews.length;
    const totalRatings = allReviews
      .filter((r) => r.productValuation)
      .map((r) => r.productValuation!);
    const averageRating =
      totalRatings.length > 0
        ? totalRatings.reduce((sum, rating) => sum + rating, 0) / totalRatings.length
        : 0;
    const negativeReviewRate =
      totalReviews > 0 ? (negativeReviews.length / totalReviews) * 100 : 0;

    // Customer satisfaction score (0-100)
    // Based on: average rating (70%) and review response activity (30%)
    const reviewResponseRate =
      unansweredReviewCount + answeredReviewCount > 0
        ? (answeredReviewCount / (unansweredReviewCount + answeredReviewCount)) * 100
        : 100;
    const customerSatisfaction = (averageRating / 5) * 70 + reviewResponseRate * 0.3;

    const analysisTime = Date.now() - analysisStart;
    console.log(`Analysis completed in ${(analysisTime / 1000).toFixed(1)}s`);
    console.log();

    // Build report
    const report: CustomerEngagementReport = {
      timestamp,
      urgentActions: {
        negativeReviews,
        unansweredQuestions,
      },
      metrics: {
        totalReviews,
        averageRating,
        negativeReviewRate,
        unansweredQuestionCount,
        customerSatisfaction,
      },
      priorities,
    };

    // Display report summary
    console.log('=== Customer Engagement Summary ===');
    console.log(`Total Reviews: ${totalReviews}`);
    console.log(`Average Rating: ${averageRating.toFixed(1)}/5.0 ⭐`);
    console.log(
      `Negative Reviews (1-2 stars): ${negativeReviews.length} (${negativeReviewRate.toFixed(1)}%)`
    );
    console.log();
    console.log(`Unanswered Questions: ${unansweredQuestionCount}`);
    console.log(
      `Question Response Rate: ${((answeredQuestionCount / (answeredQuestionCount + unansweredQuestionCount)) * 100).toFixed(1)}%`
    );
    console.log();
    console.log(`Customer Satisfaction Score: ${customerSatisfaction.toFixed(1)}/100`);
    console.log();

    // Display top priorities
    if (priorities.length > 0) {
      console.log('=== TOP PRIORITY PRODUCTS (Urgent Attention Required) ===');
      console.log();

      const topPriorities = priorities.slice(0, 10);
      topPriorities.forEach((priority, index) => {
        console.log(`${index + 1}. ${priority.productName} (ID: ${priority.productId})`);
        console.log(`   Urgency Score: ${priority.urgencyScore}`);
        console.log(`   Issues:`);
        priority.issues.forEach((issue) => {
          console.log(`     - ${issue}`);
        });
        console.log(`   Recommended Actions:`);
        priority.actions.forEach((action) => {
          console.log(`     → ${action}`);
        });
        console.log();
      });

      if (priorities.length > 10) {
        console.log(`... and ${priorities.length - 10} more products needing attention`);
        console.log();
      }
    } else {
      console.log('✅ No urgent customer service issues detected!');
      console.log();
    }

    // Performance summary
    const totalTime = (Date.now() - perfStart) / 1000;
    console.log('=== Performance Summary ===');
    console.log(`Total analysis time: ${totalTime.toFixed(1)}s`);
    console.log(
      `  Data fetching: ${((modulePerf.reviews + modulePerf.qa) / 1000).toFixed(1)}s`
    );
    console.log(`  Analysis logic: ${(analysisTime / 1000).toFixed(1)}s`);
    console.log();

    return report;
  } catch (error) {
    console.error('❌ Customer engagement analysis failed:', error);
    throw error;
  }
}

// Main execution
if (require.main === module) {
  const apiKey = process.env.WB_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: WB_API_KEY environment variable not set');
    console.error(
      'Usage: WB_API_KEY=your-api-key npx ts-node examples/customer-engagement.ts'
    );
    process.exit(1);
  }

  analyzeCustomerEngagement(apiKey)
    .then((report) => {
      console.log('✅ Customer engagement analysis completed successfully');
      console.log();
      console.log('📊 Next Steps:');
      console.log(
        `1. Address ${report.urgentActions.negativeReviews.length} negative reviews immediately`
      );
      console.log(
        `2. Answer ${report.urgentActions.unansweredQuestions.length} pending questions`
      );
      console.log(`3. Focus on top ${Math.min(10, report.priorities.length)} priority products`);
      console.log('4. Schedule next analysis in 2-4 hours');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

export { analyzeCustomerEngagement, CustomerEngagementReport };
