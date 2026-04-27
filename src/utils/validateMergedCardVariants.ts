import type { SubjectCharacteristic, CardCharacteristicInput } from '../types/products.types';

/**
 * A single product variant within a merged card.
 * @since v3.9.2
 */
export interface MergedCardVariant {
  /** Characteristics for this variant */
  characteristics: CardCharacteristicInput[];
}

/**
 * Result of merged card variant validation.
 * @since v3.9.2
 */
export interface MergedCardValidationResult {
  /** Non-variable characteristics (isVariable: false) that have DIFFERENT values across variants — WB will reject these. */
  divergentFixedChars: SubjectCharacteristic[];
  /** Variable characteristics (isVariable: true) that have IDENTICAL values across all variants — possibly intentional, but flagged for review. */
  identicalVariableChars: SubjectCharacteristic[];
  /** True if two or more variants share the exact same combination of variable characteristic values (duplicate variants — WB rejects). */
  duplicateVariants: boolean;
}

/**
 * Client-side validator for merged product card variants.
 *
 * Checks that:
 * 1. All variants share the same value for `isVariable: false` characteristics (fixed chars).
 * 2. No two variants have identical combinations of `isVariable: true` values (duplicate variants).
 * 3. Optionally flags variable characteristics that don't actually vary across variants.
 *
 * This is a best-effort client-side hint. The Wildberries API is the final authority —
 * a validation pass here doesn't guarantee API acceptance.
 *
 * @param characteristics - All characteristics for the category (from `getObjectCharc()`)
 * @param variants - Variants planned for the merged card
 * @returns Validation result with violations grouped by type
 *
 * @example
 * ```typescript
 * const charcs = await sdk.products.getObjectCharc(2314);
 * const result = validateMergedCardVariants(charcs.data ?? [], [
 *   { characteristics: [{ id: 91, value: 'Acme' }, { id: 14177449, value: 'Red' }] },
 *   { characteristics: [{ id: 91, value: 'Acme' }, { id: 14177449, value: 'Blue' }] },
 * ]);
 * if (result.divergentFixedChars.length > 0) {
 *   throw new Error(`Fixed chars differ: ${result.divergentFixedChars.map(c => c.name).join(', ')}`);
 * }
 * ```
 *
 * @since v3.9.2
 */
export function validateMergedCardVariants(
  characteristics: SubjectCharacteristic[],
  variants: MergedCardVariant[]
): MergedCardValidationResult {
  if (variants.length < 2) {
    return { divergentFixedChars: [], identicalVariableChars: [], duplicateVariants: false };
  }

  // Build map: charcID -> SubjectCharacteristic for lookup
  const charcsById = new Map<number, SubjectCharacteristic>();
  for (const c of characteristics) {
    if (c.charcID !== undefined) charcsById.set(c.charcID, c);
  }

  // For each characteristic in any variant, gather distinct values across all variants
  const valueByCharcId = new Map<number, Set<string>>();
  for (const variant of variants) {
    for (const input of variant.characteristics) {
      let set = valueByCharcId.get(input.id);
      if (!set) {
        set = new Set();
        valueByCharcId.set(input.id, set);
      }
      set.add(JSON.stringify(input.value));
    }
  }

  const divergentFixedChars: SubjectCharacteristic[] = [];
  const identicalVariableChars: SubjectCharacteristic[] = [];

  for (const [charcId, valueSet] of valueByCharcId) {
    const charc = charcsById.get(charcId);
    if (!charc) continue; // Unknown char — skip
    if (charc.isVariable === false && valueSet.size > 1) {
      divergentFixedChars.push(charc);
    }
    if (charc.isVariable === true && valueSet.size === 1) {
      identicalVariableChars.push(charc);
    }
  }

  // Detect duplicate variants by comparing combined variable-char value signatures
  const variableCharIds = characteristics
    .filter(
      (c): c is SubjectCharacteristic & { charcID: number } =>
        c.isVariable === true && c.charcID !== undefined
    )
    .map((c) => c.charcID);

  const signatures = new Set<string>();
  let duplicateVariants = false;
  for (const variant of variants) {
    const sig = variableCharIds
      .map((id) => {
        const input = variant.characteristics.find((c) => c.id === id);
        return `${id}:${JSON.stringify(input?.value ?? null)}`;
      })
      .join('|');
    if (signatures.has(sig)) {
      duplicateVariants = true;
      break;
    }
    signatures.add(sig);
  }

  return { divergentFixedChars, identicalVariableChars, duplicateVariants };
}
