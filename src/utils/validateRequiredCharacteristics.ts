import type { SubjectCharacteristic, CardCharacteristicInput } from '../types/products.types';

/**
 * Validates that all mandatory characteristics are present in a card creation request.
 * Returns the list of missing mandatory characteristics.
 *
 * @param characteristics - All characteristics for the category (from getObjectCharc())
 * @param input - Characteristics included in the card creation request
 * @returns Array of missing mandatory characteristics (empty if all present)
 *
 * @example
 * ```typescript
 * const charcs = await sdk.products.getObjectCharc(1260);
 * const myChars = [{ id: 101, value: '64GB' }];
 * const missing = validateRequiredCharacteristics(charcs.data ?? [], myChars);
 * if (missing.length > 0) {
 *   console.error('Missing:', missing.map(c => c.name));
 * }
 * ```
 *
 * @since v3.9.0
 */
export function validateRequiredCharacteristics(
  characteristics: SubjectCharacteristic[],
  input: CardCharacteristicInput[]
): SubjectCharacteristic[] {
  const inputIds = new Set(input.map((c) => c.id));
  return characteristics.filter(
    (c) => c.isRequiredForCreate === true && !inputIds.has(c.charcID ?? -1)
  );
}
