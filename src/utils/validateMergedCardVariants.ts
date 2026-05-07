import type { SubjectCharacteristic, CardCharacteristicInput } from '../types/products.types';
import { warnOnce } from './deprecation';

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
 * **v3.10.2 update**: added optional `namedFieldsPerVariant` parameter — an array (one map per
 * variant by index) — to correctly handle WB API characteristics with `existNamedField: true`
 * (e.g. `brand`, `height`, `length`, `name`, `width`, `weight`) which are submitted as top-level
 * card fields rather than inside the variant `characteristics[]` array.
 *
 * Without the `namedFieldsPerVariant` parameter the helper falls back to legacy behaviour and
 * emits a one-time `console.warn` whenever a required `existNamedField: true` characteristic is
 * encountered — this may cause false positives.
 *
 * This is a best-effort client-side hint. The Wildberries API is the final authority —
 * a validation pass here doesn't guarantee API acceptance.
 *
 * @param characteristics - All characteristics for the category (from `getObjectCharc()`)
 * @param variants - Variants planned for the merged card
 * @param namedFieldsPerVariant - Optional array of named-field maps, one per variant (by index).
 *   Each map holds top-level field values (brand, height, etc.) keyed by characteristic name.
 * @returns Validation result with violations grouped by type
 *
 * @example New call pattern (v3.10.2+):
 * ```typescript
 * const charcs = await sdk.products.getObjectCharc(2314);
 * const result = validateMergedCardVariants(
 *   charcs.data ?? [],
 *   [
 *     { characteristics: [{ id: 14177449, value: 'Red' }] },
 *     { characteristics: [{ id: 14177449, value: 'Blue' }] },
 *   ],
 *   [
 *     { brand: 'Acme', height: 10 },
 *     { brand: 'Acme', height: 10 },
 *   ]
 * );
 * if (result.divergentFixedChars.length > 0) {
 *   throw new Error(`Fixed chars differ: ${result.divergentFixedChars.map(c => c.name).join(', ')}`);
 * }
 * ```
 *
 * @example Legacy call pattern (still supported, emits one-time warn if existNamedField found):
 * ```typescript
 * const result = validateMergedCardVariants(charcs.data ?? [], variants);
 * ```
 *
 * @see CHANGELOG v3.10.2 for migration details
 * @since v3.9.2
 */
export function validateMergedCardVariants(
  characteristics: SubjectCharacteristic[],
  variants: MergedCardVariant[],
  namedFieldsPerVariant?: Record<string, unknown>[]
): MergedCardValidationResult {
  if (variants.length < 2) {
    return { divergentFixedChars: [], identicalVariableChars: [], duplicateVariants: false };
  }

  // Build map: charcID -> SubjectCharacteristic for lookup
  const charcsById = new Map<number, SubjectCharacteristic>();
  for (const c of characteristics) {
    if (c.charcID !== undefined) charcsById.set(c.charcID, c);
  }

  // For each characteristic in any variant, gather distinct values across all variants.
  // For existNamedField:true chars, values come from namedFieldsPerVariant rather than
  // the variant's characteristics[] array.
  const valueByCharcId = new Map<number, Set<string>>();

  // Track whether we have already emitted the legacy warn for this call
  let legacyWarnEmitted = false;

  // Helper to resolve value for a characteristic in a given variant
  const resolveValue = (
    charc: SubjectCharacteristic,
    variantIndex: number,
    variant: MergedCardVariant
  ): string => {
    if (charc.existNamedField === true) {
      const namedMap = namedFieldsPerVariant?.[variantIndex];
      if (namedMap === undefined) {
        if (!legacyWarnEmitted) {
          warnOnce(
            'validateMergedCardVariants:legacy-call',
            'validateMergedCardVariants: a required characteristic with existNamedField:true was found, ' +
              'but no `namedFieldsPerVariant` parameter was provided (or the slot for this variant is undefined). ' +
              'Helper may report false positives. ' +
              'Pass the named-field values per variant as the third argument. ' +
              'See CHANGELOG v3.10.2 for migration details.'
          );
          legacyWarnEmitted = true;
        }
        // Legacy fallback: look in characteristics[] (old behaviour)
        const input = variant.characteristics.find((c) => c.id === (charc.charcID ?? -1));
        return JSON.stringify(input?.value ?? null);
      }
      // New behaviour: read from namedFields map by characteristic name
      const fieldValue = charc.name ? namedMap[charc.name] : undefined;
      return JSON.stringify(fieldValue ?? null);
    }
    // existNamedField: false | undefined → existing behaviour
    const input = variant.characteristics.find((c) => c.id === (charc.charcID ?? -1));
    return JSON.stringify(input?.value ?? null);
  };

  // Build valueByCharcId using resolved values
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];

    // For normal chars (not existNamedField), gather from variant.characteristics
    for (const input of variant.characteristics) {
      let set = valueByCharcId.get(input.id);
      if (!set) {
        set = new Set();
        valueByCharcId.set(input.id, set);
      }
      set.add(JSON.stringify(input.value));
    }

    // For existNamedField:true chars, gather from namedFieldsPerVariant (or fallback)
    for (const c of characteristics) {
      if (c.existNamedField === true && c.charcID !== undefined) {
        let set = valueByCharcId.get(c.charcID);
        if (!set) {
          set = new Set();
          valueByCharcId.set(c.charcID, set);
        }
        set.add(resolveValue(c, i, variant));
      }
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
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    const sig = variableCharIds
      .map((id) => {
        const c = charcsById.get(id);
        if (c?.existNamedField === true) {
          return `${id}:${resolveValue(c, i, variant)}`;
        }
        const input = variant.characteristics.find((ci) => ci.id === id);
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
