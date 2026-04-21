import { describe, it, expect } from 'vitest';
import { validateRequiredCharacteristics } from '../../../src/utils/validateRequiredCharacteristics';
import type {
  SubjectCharacteristic,
  CardCharacteristicInput,
} from '../../../src/types/products.types';

describe('validateRequiredCharacteristics', () => {
  const makeCharc = (
    charcID: number,
    name: string,
    isRequiredForCreate?: boolean
  ): SubjectCharacteristic => ({
    charcID,
    name,
    isRequiredForCreate,
  });

  it('should return empty array when all mandatory charcs are present', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(1, 'Color', true),
      makeCharc(2, 'Size', true),
      makeCharc(3, 'Optional field', false),
    ];
    const input: CardCharacteristicInput[] = [
      { id: 1, value: 'Red' },
      { id: 2, value: 'XL' },
    ];

    const missing = validateRequiredCharacteristics(charcs, input);
    expect(missing).toEqual([]);
  });

  it('should return missing charcs when some mandatory ones are absent', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(1, 'Color', true),
      makeCharc(2, 'Size', true),
      makeCharc(3, 'Material', true),
    ];
    const input: CardCharacteristicInput[] = [{ id: 1, value: 'Red' }];

    const missing = validateRequiredCharacteristics(charcs, input);
    expect(missing).toHaveLength(2);
    expect(missing.map((c) => c.charcID)).toEqual([2, 3]);
    expect(missing.map((c) => c.name)).toEqual(['Size', 'Material']);
  });

  it('should ignore non-mandatory charcs (isRequiredForCreate false)', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(1, 'Color', true),
      makeCharc(2, 'Optional 1', false),
      makeCharc(3, 'Optional 2', false),
    ];
    const input: CardCharacteristicInput[] = [];

    const missing = validateRequiredCharacteristics(charcs, input);
    expect(missing).toHaveLength(1);
    expect(missing[0].charcID).toBe(1);
  });

  it('should ignore charcs with isRequiredForCreate undefined', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(1, 'Color', undefined),
      makeCharc(2, 'Size', undefined),
    ];
    const input: CardCharacteristicInput[] = [];

    const missing = validateRequiredCharacteristics(charcs, input);
    expect(missing).toEqual([]);
  });

  it('should handle empty characteristics list', () => {
    const missing = validateRequiredCharacteristics([], [{ id: 1, value: 'test' }]);
    expect(missing).toEqual([]);
  });

  it('should handle empty input list', () => {
    const charcs: SubjectCharacteristic[] = [
      makeCharc(1, 'Color', true),
      makeCharc(2, 'Optional', false),
    ];

    const missing = validateRequiredCharacteristics(charcs, []);
    expect(missing).toHaveLength(1);
    expect(missing[0].charcID).toBe(1);
  });

  it('should handle both lists empty', () => {
    const missing = validateRequiredCharacteristics([], []);
    expect(missing).toEqual([]);
  });

  it('should handle charcs with undefined charcID (never matched)', () => {
    const charcs: SubjectCharacteristic[] = [{ name: 'NoID Field', isRequiredForCreate: true }];
    const input: CardCharacteristicInput[] = [{ id: -1, value: 'test' }];

    // charcID is undefined → fallback to -1 → input has id=-1 → matched
    const missing = validateRequiredCharacteristics(charcs, input);
    expect(missing).toEqual([]);
  });

  it('should not match by name, only by charcID vs id', () => {
    const charcs: SubjectCharacteristic[] = [makeCharc(100, 'Color', true)];
    // id does not match charcID even though "Color" could appear in value
    const input: CardCharacteristicInput[] = [{ id: 999, value: 'Color' }];

    const missing = validateRequiredCharacteristics(charcs, input);
    expect(missing).toHaveLength(1);
    expect(missing[0].charcID).toBe(100);
  });
});
