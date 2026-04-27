import { describe, it, expect } from 'vitest';
import { validateMergedCardVariants } from '../../../src/utils/validateMergedCardVariants';
import type {
  SubjectCharacteristic,
  CardCharacteristicInput,
} from '../../../src/types/products.types';
import type { MergedCardVariant } from '../../../src/utils/validateMergedCardVariants';

const makeCharc = (charcID: number, name: string, isVariable?: boolean): SubjectCharacteristic => ({
  charcID,
  name,
  isVariable,
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
});
