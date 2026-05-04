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
