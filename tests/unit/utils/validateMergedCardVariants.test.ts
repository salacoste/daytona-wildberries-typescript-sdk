import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateMergedCardVariants } from '../../../src/utils/validateMergedCardVariants';
import { resetDeprecationWarnings } from '../../../src/utils/deprecation';
import type {
  SubjectCharacteristic,
  CardCharacteristicInput,
} from '../../../src/types/products.types';
import type { MergedCardVariant } from '../../../src/utils/validateMergedCardVariants';

const makeCharc = (
  charcID: number,
  name: string,
  isVariable?: boolean,
  extra?: Partial<SubjectCharacteristic>
): SubjectCharacteristic => ({
  charcID,
  name,
  isVariable,
  ...extra,
});

const makeVariant = (
  inputs: { id: number; value: CardCharacteristicInput['value'] }[]
): MergedCardVariant => ({
  characteristics: inputs.map(({ id, value }) => ({ id, value })),
});

describe('validateMergedCardVariants', () => {
  it('returns empty result for fewer than 2 variants', () => {
    const charcs: SubjectCharacteristic[] = [makeCharc(1, 'Color', true)];

    const resultZero = validateMergedCardVariants(charcs, []);
    expect(resultZero.divergentFixedChars).toEqual([]);
    expect(resultZero.identicalVariableChars).toEqual([]);
    expect(resultZero.duplicateVariants).toBe(false);

    const resultOne = validateMergedCardVariants(charcs, [makeVariant([{ id: 1, value: 'Red' }])]);
    expect(resultOne.divergentFixedChars).toEqual([]);
    expect(resultOne.identicalVariableChars).toEqual([]);
    expect(resultOne.duplicateVariants).toBe(false);
  });

  it('detects divergent fixed chars (isVariable: false with different values)', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(91, 'Brand', false),
      makeCharc(14177449, 'Color', true),
    ];
    const variants: MergedCardVariant[] = [
      makeVariant([
        { id: 91, value: 'Acme' },
        { id: 14177449, value: 'Red' },
      ]),
      makeVariant([
        { id: 91, value: 'OtherBrand' },
        { id: 14177449, value: 'Blue' },
      ]),
    ];

    const result = validateMergedCardVariants(charcs, variants);
    expect(result.divergentFixedChars).toHaveLength(1);
    expect(result.divergentFixedChars[0].charcID).toBe(91);
    expect(result.divergentFixedChars[0].name).toBe('Brand');
    expect(result.identicalVariableChars).toEqual([]);
    expect(result.duplicateVariants).toBe(false);
  });

  it('detects duplicate variants (identical variable value combinations)', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(91, 'Brand', false),
      makeCharc(14177449, 'Color', true),
    ];
    const variants: MergedCardVariant[] = [
      makeVariant([
        { id: 91, value: 'Acme' },
        { id: 14177449, value: 'Red' },
      ]),
      makeVariant([
        { id: 91, value: 'Acme' },
        { id: 14177449, value: 'Red' },
      ]),
    ];

    const result = validateMergedCardVariants(charcs, variants);
    expect(result.duplicateVariants).toBe(true);
  });

  it('flags identical variable chars (isVariable: true, all variants same value)', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(91, 'Brand', false),
      makeCharc(14177449, 'Color', true),
      makeCharc(200, 'Size', true),
    ];
    const variants: MergedCardVariant[] = [
      makeVariant([
        { id: 91, value: 'Acme' },
        { id: 14177449, value: 'Red' },
        { id: 200, value: 'M' },
      ]),
      makeVariant([
        { id: 91, value: 'Acme' },
        { id: 14177449, value: 'Blue' },
        { id: 200, value: 'M' },
      ]),
    ];

    const result = validateMergedCardVariants(charcs, variants);
    expect(result.identicalVariableChars).toHaveLength(1);
    expect(result.identicalVariableChars[0].charcID).toBe(200);
    expect(result.divergentFixedChars).toEqual([]);
    expect(result.duplicateVariants).toBe(false);
  });

  it('ignores characteristics with isVariable undefined', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(1, 'Unknown', undefined),
      makeCharc(2, 'Color', true),
    ];
    const variants: MergedCardVariant[] = [
      makeVariant([
        { id: 1, value: 'X' },
        { id: 2, value: 'Red' },
      ]),
      makeVariant([
        { id: 1, value: 'Y' },
        { id: 2, value: 'Blue' },
      ]),
    ];

    const result = validateMergedCardVariants(charcs, variants);
    // id:1 has isVariable undefined → not flagged as divergentFixed or identicalVariable
    expect(result.divergentFixedChars).toEqual([]);
    expect(result.identicalVariableChars).toEqual([]);
    expect(result.duplicateVariants).toBe(false);
  });

  it('handles empty inputs gracefully', () => {
    // No characteristics defined → two empty-char variants are structurally identical (duplicate)
    const result = validateMergedCardVariants([], [makeVariant([]), makeVariant([])]);
    expect(result.divergentFixedChars).toEqual([]);
    expect(result.identicalVariableChars).toEqual([]);
    expect(result.duplicateVariants).toBe(true);
  });

  it('returns clean result when all variants properly differ', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(91, 'Brand', false),
      makeCharc(14177449, 'Color', true),
    ];
    const variants: MergedCardVariant[] = [
      makeVariant([
        { id: 91, value: 'Acme' },
        { id: 14177449, value: 'Red' },
      ]),
      makeVariant([
        { id: 91, value: 'Acme' },
        { id: 14177449, value: 'Blue' },
      ]),
      makeVariant([
        { id: 91, value: 'Acme' },
        { id: 14177449, value: 'Green' },
      ]),
    ];

    const result = validateMergedCardVariants(charcs, variants);
    expect(result.divergentFixedChars).toEqual([]);
    expect(result.identicalVariableChars).toEqual([]);
    expect(result.duplicateVariants).toBe(false);
  });

  // ── v3.10.2: existNamedField tests (TC-MV1 … TC-MV4) ─────────────────────

  describe('existNamedField behaviour (v3.10.2)', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let warnSpy: any;

    beforeEach(() => {
      resetDeprecationWarnings();
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('TC-MV1: variant existNamedField:true chars + matching namedFieldsPerVariant → no false positive', () => {
      // brand has existNamedField:true and isVariable:false — both variants have same brand
      const charcs: SubjectCharacteristic[] = [
        makeCharc(91, 'brand', false, { required: true, existNamedField: true }),
        makeCharc(14177449, 'Color', true),
      ];
      const variants: MergedCardVariant[] = [
        makeVariant([{ id: 14177449, value: 'Red' }]),
        makeVariant([{ id: 14177449, value: 'Blue' }]),
      ];
      const namedFieldsPerVariant = [{ brand: 'Acme' }, { brand: 'Acme' }];

      const result = validateMergedCardVariants(charcs, variants, namedFieldsPerVariant);
      // brand is fixed (isVariable:false) and both variants have same value → not divergent
      expect(result.divergentFixedChars).toEqual([]);
      expect(result.duplicateVariants).toBe(false);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('TC-MV2: variant existNamedField:true chars without namedFieldsPerVariant → fires warn-once', () => {
      const charcs: SubjectCharacteristic[] = [
        makeCharc(91, 'brand', false, { required: true, existNamedField: true }),
        makeCharc(14177449, 'Color', true),
      ];
      const variants: MergedCardVariant[] = [
        makeVariant([{ id: 14177449, value: 'Red' }]),
        makeVariant([{ id: 14177449, value: 'Blue' }]),
      ];

      validateMergedCardVariants(charcs, variants);
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('existNamedField:true');
      expect(warnSpy.mock.calls[0][0]).toContain('v3.10.2');
    });

    it('TC-MV3: variant with mixed (existNamedField true and false) → both pathways resolved correctly', () => {
      // brand: existNamedField:true, isVariable:false
      // Color: existNamedField:false (default), isVariable:true
      const charcs: SubjectCharacteristic[] = [
        makeCharc(91, 'brand', false, { required: true, existNamedField: true }),
        makeCharc(14177449, 'Color', true, { existNamedField: false }),
      ];
      const variants: MergedCardVariant[] = [
        makeVariant([{ id: 14177449, value: 'Red' }]),
        makeVariant([{ id: 14177449, value: 'Blue' }]),
      ];
      // Provide namedFieldsPerVariant only for brand (existNamedField:true pathway)
      const namedFieldsPerVariant = [{ brand: 'Acme' }, { brand: 'Acme' }];

      const result = validateMergedCardVariants(charcs, variants, namedFieldsPerVariant);
      // brand: same value across variants → not divergent
      expect(result.divergentFixedChars).toEqual([]);
      // Color: differs (Red vs Blue) → not flagged as identicalVariable
      expect(result.identicalVariableChars).toEqual([]);
      expect(result.duplicateVariants).toBe(false);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('TC-MV4: 2 calls without namedFieldsPerVariant → warn fires only once (backwards compat)', () => {
      const charcs: SubjectCharacteristic[] = [
        makeCharc(91, 'brand', false, { required: true, existNamedField: true }),
        makeCharc(14177449, 'Color', true),
      ];
      const variants: MergedCardVariant[] = [
        makeVariant([{ id: 14177449, value: 'Red' }]),
        makeVariant([{ id: 14177449, value: 'Blue' }]),
      ];

      // First call without namedFieldsPerVariant — warn fires
      validateMergedCardVariants(charcs, variants);
      // Second call — warnOnce should suppress
      validateMergedCardVariants(charcs, variants);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });
});
