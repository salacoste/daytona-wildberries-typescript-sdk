/**
 * Auto-generated rate limit configuration for promotion module
 * Generated from: wildberries_api_doc/08-promotion.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/promotion-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';

export const promotionRateLimits: Record<string, RateLimitConfig> = {
  'promotion.advPromotionCount': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.postAdvPromotionAdverts': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.advAuctionAdverts': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.advConfig': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 1,
  },
  'promotion.postAdvBidsMin': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 5,
  },
  'promotion.postAdvSaveAd': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 5,
  },
  'promotion.postAdvSeacatSaveAd': {
    requestsPerMinute: 5,
    intervalSeconds: 12,
    burstLimit: 5,
  },
  'promotion.advSupplierSubjects': {
    requestsPerMinute: 5,
    intervalSeconds: 12,
    burstLimit: 5,
  },
  'promotion.postAdvSupplierNms': {
    requestsPerMinute: 5,
    intervalSeconds: 12,
    burstLimit: 5,
  },
  'promotion.advDelete': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.postAdvRename': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.advStart': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.advPause': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.advStop': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.patchAdvBids': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  'promotion.putAdvAuctionPlacements': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 1,
  },
  'promotion.patchAdvAuctionBids': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },
  // GET /api/advert/v0/bids/recommendations — recommended bids for product cards and search clusters (cpm only)
  'promotion.getBidsRecommendations': {
    requestsPerMinute: 5,
    intervalSeconds: 12,
    burstLimit: 5,
  },
  'promotion.advBalance': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'promotion.advBudget': {
    requestsPerMinute: 240,
    intervalSeconds: 0.25,
    burstLimit: 4,
  },
  'promotion.postAdvBudgetDeposit': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'promotion.advUpd': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'promotion.advPayments': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'promotion.advSearchSetPlus': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'promotion.postAdvSearchSetPlus': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'promotion.postAdvSearchSetExcluded': {
    requestsPerMinute: 120,
    intervalSeconds: 0.5,
    burstLimit: 2,
  },
  'promotion.postAdvAutoSetExcluded': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 5,
  },
  'promotion.advAutoGetnmtoadd': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'promotion.postAdvAutoUpdatenm': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 5,
  },
  'promotion.patchAdvAuctionNms': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 1,
  },
  'promotion.advCount': {
    requestsPerMinute: 600,
    intervalSeconds: 0.1,
    burstLimit: 10,
  },
  'promotion.advAdverts': {
    requestsPerMinute: 600,
    intervalSeconds: 0.1,
    burstLimit: 10,
  },
  'promotion.advAdvert': {
    requestsPerMinute: 600,
    intervalSeconds: 0.1,
    burstLimit: 10,
  },
  'promotion.postAdvFullstats': {
    requestsPerMinute: 1,
    intervalSeconds: 60,
    burstLimit: 5,
  },
  'promotion.advFullstats': {
    requestsPerMinute: 3,
    intervalSeconds: 20,
    burstLimit: 1,
  },
  'promotion.advAutoStatWords': {
    requestsPerMinute: 240,
    intervalSeconds: 0.25,
    burstLimit: 4,
  },
  'promotion.advStatWords': {
    requestsPerMinute: 240,
    intervalSeconds: 0.25,
    burstLimit: 4,
  },
  'promotion.advStatsKeywords': {
    requestsPerMinute: 240,
    intervalSeconds: 0.25,
    burstLimit: 4,
  },
  'promotion.postAdvStats': {
    requestsPerMinute: 600,
    intervalSeconds: 0.1,
    burstLimit: 10,
  },
  'promotion.calendarPromotions': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'promotion.calendarPromotionsDetails': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'promotion.calendarPromotionsNomenclatures': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },
  'promotion.postCalendarPromotionsUpload': {
    requestsPerMinute: 100,
    intervalSeconds: 0.6,
    burstLimit: 5,
  },

  // ============================================================================
  // Search Clusters (NormQuery) Rate Limits - NEW in Feb 2026
  // ============================================================================

  /** POST /adv/v0/normquery/stats - Get search cluster statistics */
  'promotion.normqueryStats': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 20,
  },

  /** POST /adv/v0/normquery/get-bids - Get current bids for clusters */
  'promotion.normqueryGetBids': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 10,
  },

  /** POST /adv/v0/normquery/bids - Set bids for clusters */
  'promotion.normquerySetBids': {
    requestsPerMinute: 120,
    intervalSeconds: 0.5,
    burstLimit: 4,
  },

  /** DELETE /adv/v0/normquery/bids - Delete cluster bids */
  'promotion.normqueryDeleteBids': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 10,
  },

  /** POST /adv/v0/normquery/get-minus - Get minus-phrases */
  'promotion.normqueryGetMinus': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 10,
  },

  /** POST /adv/v0/normquery/set-minus - Set minus-phrases */
  'promotion.normquerySetMinus': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 10,
  },

  // ============================================================================
  // V2 Replacement Endpoints Rate Limits - NEW in Feb 2026
  // ============================================================================

  /** GET /api/advert/v2/adverts - Get adverts (replaces deprecated v1) */
  'promotion.advertsV2': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },

  /** POST /api/advert/v1/bids/min - Get min bids (new API path) */
  'promotion.bidsMinV1': {
    requestsPerMinute: 20,
    intervalSeconds: 3,
    burstLimit: 5,
  },

  /** PATCH /api/advert/v1/bids - Update bids (new API path) */
  'promotion.bidsV1': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 10,
  },

  // ============================================================================
  // Campaign Management Rate Limits - NEW
  // ============================================================================

  /** GET /adv/v1/promotion/count - Get campaign count and list */
  'promotion.getCampaignCount': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },

  /** POST /adv/v2/seacat/save-ad - Create campaign */
  'promotion.createCampaign': {
    requestsPerMinute: 5,
    intervalSeconds: 12,
    burstLimit: 5,
  },

  /** GET /adv/v1/supplier/subjects - Get supplier subjects */
  'promotion.getSupplierSubjects': {
    requestsPerMinute: 5,
    intervalSeconds: 12,
    burstLimit: 5,
  },

  /** POST /adv/v2/supplier/nms - Get supplier product cards */
  'promotion.getSupplierNms': {
    requestsPerMinute: 5,
    intervalSeconds: 12,
    burstLimit: 5,
  },

  /** GET /adv/v0/start - Start campaign */
  'promotion.startCampaign': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },

  /** GET /adv/v0/pause - Pause campaign */
  'promotion.pauseCampaign': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 5,
  },

  // ============================================================================
  // New Methods Rate Limits - Feb 2026
  // ============================================================================

  /** PATCH /api/advert/v1/bids - Update bids with bid_kopecks */
  'promotion.updateBids': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 10,
  },

  /** PATCH /adv/v0/auction/nms - Add/remove products from campaigns */
  'promotion.updateCampaignProducts': {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 1,
  },

  // ============================================================================
  // Aliases for New Method Names (task-54, task-55)
  // ============================================================================

  /** POST /adv/v0/normquery/get-minus - Alias for getMinusPhrases() */
  'promotion.getMinusPhrases': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 10,
  },

  /** POST /adv/v0/normquery/set-minus - Alias for setMinusPhrases() */
  'promotion.setMinusPhrases': {
    requestsPerMinute: 300,
    intervalSeconds: 0.2,
    burstLimit: 10,
  },

  /** POST /adv/v0/normquery/stats - Alias for getSearchClusterStats() */
  'promotion.getSearchClusterStats': {
    requestsPerMinute: 10,
    intervalSeconds: 6,
    burstLimit: 20,
  },
};
