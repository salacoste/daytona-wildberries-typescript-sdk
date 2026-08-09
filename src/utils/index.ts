/**
 * Utility functions for Wildberries SDK
 *
 * This module exports various utility functions for calculations,
 * comparisons, and other helper operations.
 *
 * @module utils
 */

export {
  calculateSupplyCost,
  type SupplyCostInput,
  type SupplyCostResult,
} from './calculateSupplyCost';

export {
  compareTariffs,
  type CompareTariffsInput,
  type TariffComparison,
  type TariffData,
  type TariffDifference,
  type TariffRecommendation,
} from './compareTariffs';

export { parseMoneyAmount } from './parseMoneyAmount';

export { warnOnce, resetDeprecationWarnings } from './deprecation';

export { validateRequiredCharacteristics } from './validateRequiredCharacteristics';

export {
  validateMergedCardVariants,
  type MergedCardVariant,
  type MergedCardValidationResult,
} from './validateMergedCardVariants';

export { classifyReturnReason, type ReturnReasonCode } from './classifyReturnReason';

export { enrichReturnsWithType, type WbReturn, type FbsReturnInput } from './enrichReturnsWithType';

export { classifyFbsReturnCategory, type FbsStatusEvent } from './classifyFbsReturnCategory';

export {
  reconcileBuyoutsAndReturns,
  type BuyoutInput,
  type ReconciliationAnomaly,
  type ReconciliationResult,
  type ReconcileOptions,
} from './reconcileBuyoutsAndReturns';

// FBS marking-code validation helper (since 3.15.0)
export { parseMetaValidationFail, type MetaValidationFailPayload } from './parseMetaValidationFail';

// Pre-network bid validation/clamp against getBidsRecommendations (since 3.16.0)
export { validateBid, clampBid, extractBidRange, type BidRange } from './bid-validation';

// ROAS computation over fullstats (rolling window, exclude freshest day) (since 4.0.0)
export { computeROAS, type ROASResult, type ComputeROASOptions } from './roas';

// FBO acceptance reconciliation: declared vs accepted qty per nmId (since 4.1.0)
export {
  reconcileAcceptanceDelta,
  type AcceptanceDeltaItem,
  type ReconcileAcceptanceDeltaInput,
  type ReconcileAcceptanceDeltaResult,
} from './reconcileAcceptanceDelta';
