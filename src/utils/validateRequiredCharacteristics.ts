import type { SubjectCharacteristic, CardCharacteristicInput } from '../types/products.types';
import { warnOnce } from './deprecation';

/**
 * Validates that all mandatory characteristics are present in a card creation request.
 * Returns the list of missing mandatory characteristics.
 *
 * **v3.10.2 update**: added optional `namedFields` parameter to correctly handle WB API
 * characteristics with `existNamedField: true` (e.g. `brand`, `height`, `length`, `name`,
 * `width`, `weight`) which are submitted as top-level card fields rather than inside
 * the `characteristics[]` array.
 *
 * Without the `namedFields` parameter the helper falls back to legacy behaviour and emits
 * a one-time `console.warn` whenever a required `existNamedField: true` characteristic is
 * encountered — this may cause false positives. Pass the named-field values as the third
 * argument to suppress the warning and get accurate results.
 *
 * @param characteristics - All characteristics for the category (from getObjectCharc())
 * @param input - Characteristics included in the card creation request
 * @param namedFields - Optional map of named-field values (brand, height, length, etc.)
 *   keyed by characteristic name. Pass values from the top-level card fields.
 * @returns Array of missing mandatory characteristics (empty if all present)
 *
 * @example New call pattern (v3.10.2+):
 * ```typescript
 * const charcs = await sdk.products.getObjectCharc(1260);
 * const myChars = [{ id: 101, value: '64GB' }];
 * const missing = validateRequiredCharacteristics(
 *   charcs.data ?? [],
 *   myChars,
 *   { brand: 'Acme', height: 10, length: 20, width: 5, weight: 0.5 }
 * );
 * if (missing.length > 0) {
 *   console.error('Missing:', missing.map(c => c.name));
 * }
 * ```
 *
 * @example Legacy call pattern (still supported, emits one-time warn if existNamedField found):
 * ```typescript
 * const missing = validateRequiredCharacteristics(charcs.data ?? [], myChars);
 * ```
 *
 * @see CHANGELOG v3.10.2 for migration details
 * @since v3.9.0
 */
export function validateRequiredCharacteristics(
  characteristics: SubjectCharacteristic[],
  input: CardCharacteristicInput[],
  namedFields?: Record<string, unknown>
): SubjectCharacteristic[] {
  const inputByCharcId = new Set(input.map((c) => c.id));
  let warnEmitted = false;

  return characteristics
    .filter((c) => c.isRequiredForCreate === true)
    .filter((c) => {
      if (c.existNamedField === true) {
        if (!namedFields) {
          if (!warnEmitted) {
            warnOnce(
              'validateRequiredCharacteristics:legacy-call',
              'validateRequiredCharacteristics: a required characteristic with existNamedField:true was found, ' +
                'but no `namedFields` parameter was provided. Helper may report false positives. ' +
                'Pass the named-field values (brand, height, length, etc.) as the third argument. ' +
                'See CHANGELOG v3.10.2 for migration details.'
            );
            warnEmitted = true;
          }
          // Legacy fallback: assume not satisfied (matches old behaviour, surfaces the bug visibly)
          return !inputByCharcId.has(c.charcID ?? -1);
        }
        // New behaviour: check namedFields by name
        const value = c.name ? namedFields[c.name] : undefined;
        const present = value !== undefined && value !== null && value !== '';
        return !present;
      }
      // existNamedField: false | undefined → check input[] by id (existing behaviour)
      return !inputByCharcId.has(c.charcID ?? -1);
    });
}
