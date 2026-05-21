import { MetaValidationFailError } from '../errors/meta-validation-fail-error';
import type { MetaDetail } from '../types/orders-fbs.types';

/**
 * Parsed payload extracted from a MetaValidationFailError or a compatible plain object.
 */
export interface MetaValidationFailPayload {
  code: string;
  message: string;
  metaDetails: MetaDetail[];
}

/**
 * Extracts marking-code validation failure details from an unknown caught value.
 *
 * Useful in shared error boundaries (e.g. middleware, global catch handlers) that
 * cannot import `MetaValidationFailError` directly but still want typed access to
 * the `metaDetails` array.
 *
 * Returns `null` for any input that is not a 409 meta-validation failure.
 *
 * @param err - The value caught in a `catch` block (typically `unknown`)
 * @returns Parsed payload `{ code, message, metaDetails }` or `null`
 *
 * @since 3.15.0
 *
 * @example Using in a shared error boundary
 * ```typescript
 * import { parseMetaValidationFail } from 'daytona-wildberries-typescript-sdk';
 *
 * async function deliverSupply(supplyId: string) {
 *   try {
 *     await sdk.ordersFBS.updateSuppliesDeliver(supplyId);
 *   } catch (err) {
 *     const parsed = parseMetaValidationFail(err);
 *     if (parsed) {
 *       // Typed access without importing MetaValidationFailError
 *       parsed.metaDetails
 *         .filter(d => d.decision === 'invalid')
 *         .forEach(d => console.error(`Invalid code for ${d.key}: "${d.value}"`));
 *       return;
 *     }
 *     throw err;
 *   }
 * }
 * ```
 */
export function parseMetaValidationFail(err: unknown): MetaValidationFailPayload | null {
  if (err == null || typeof err !== 'object') {
    return null;
  }

  // Fast path: instanceof check when MetaValidationFailError is available in scope
  if (err instanceof MetaValidationFailError) {
    return {
      code: err.code,
      message: err.message,
      metaDetails: err.metaDetails,
    };
  }

  // Fallback: duck-type check for plain WBAPIError-shaped objects with statusCode 409
  // and a response containing a metaDetails array. Handles cross-realm / bundler
  // scenarios where instanceof checks may fail.
  // All fields typed unknown — defensive parsing for hostile/malformed inputs from external boundaries.
  interface ErrorLike {
    statusCode?: unknown;
    response?: unknown;
    message?: unknown;
  }
  interface ResponseLike {
    code?: unknown;
    message?: unknown;
    metaDetails?: unknown;
  }

  const errObj = err as ErrorLike;

  if (errObj.statusCode !== 409) {
    return null;
  }

  const response = errObj.response;
  if (response == null || typeof response !== 'object') {
    return null;
  }

  const responseObj = response as ResponseLike;
  if (!Array.isArray(responseObj.metaDetails)) {
    return null;
  }

  const code = typeof responseObj.code === 'string' ? responseObj.code : 'Unknown';
  const message =
    typeof responseObj.message === 'string'
      ? responseObj.message
      : typeof errObj.message === 'string'
        ? errObj.message
        : 'Meta validation failed';

  return {
    code,
    message,
    metaDetails: responseObj.metaDetails as MetaDetail[],
  };
}
