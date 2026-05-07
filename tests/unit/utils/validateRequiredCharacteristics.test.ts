import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateRequiredCharacteristics } from '../../../src/utils/validateRequiredCharacteristics';
import { resetDeprecationWarnings } from '../../../src/utils/deprecation';
import type {
  SubjectCharacteristic,
  CardCharacteristicInput,
} from '../../../src/types/products.types';

describe('validateRequiredCharacteristics', () => {
  const makeCharc = (
    charcID: number,
    name: string,
    isRequiredForCreate?: boolean,
    extra?: Partial<SubjectCharacteristic>
  ): SubjectCharacteristic => ({
    charcID,
    name,
    isRequiredForCreate,
    ...extra,
  });

  // ── existing tests ────────────────────────────────────────────────────────

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

  // ── v3.10.2: existNamedField tests (TC-EN1 … TC-EN6) ─────────────────────

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

    it('TC-EN1: existNamedField:undefined char (legacy) → existing behaviour preserved', () => {
      // A char without existNamedField set — should still check input[] by charcID
      const charcs: SubjectCharacteristic[] = [makeCharc(10, 'Color', true, { required: true })];
      const input: CardCharacteristicInput[] = [{ id: 10, value: 'Red' }];

      const missing = validateRequiredCharacteristics(charcs, input);
      expect(missing).toEqual([]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('TC-EN2: existNamedField:false char → still checked in input[] (existing behaviour)', () => {
      const charcs: SubjectCharacteristic[] = [
        makeCharc(20, 'Size', true, { required: true, existNamedField: false }),
      ];
      // Not in input → should be flagged
      const missing = validateRequiredCharacteristics(charcs, []);
      expect(missing).toHaveLength(1);
      expect(missing[0].charcID).toBe(20);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('TC-EN3: existNamedField:true + namedFields provided + value present → satisfied (not flagged)', () => {
      const charcs: SubjectCharacteristic[] = [
        makeCharc(30, 'brand', true, { required: true, existNamedField: true }),
      ];
      const missing = validateRequiredCharacteristics(charcs, [], { brand: 'Acme' });
      expect(missing).toEqual([]);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('TC-EN4: existNamedField:true + namedFields provided + value missing → flagged as missing', () => {
      const charcs: SubjectCharacteristic[] = [
        makeCharc(31, 'height', true, { required: true, existNamedField: true }),
      ];
      // namedFields provided but 'height' key absent → should be flagged
      const missing = validateRequiredCharacteristics(charcs, [], { brand: 'Acme' });
      expect(missing).toHaveLength(1);
      expect(missing[0].charcID).toBe(31);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('TC-EN5: existNamedField:true + namedFields NOT provided → fires warn-once', () => {
      const charcs: SubjectCharacteristic[] = [
        makeCharc(40, 'brand', true, { required: true, existNamedField: true }),
      ];
      validateRequiredCharacteristics(charcs, []);
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('existNamedField:true');
      expect(warnSpy.mock.calls[0][0]).toContain('v3.10.2');
    });

    it('TC-EN6: 2 calls without namedFields → warn fires only once', () => {
      const charcs: SubjectCharacteristic[] = [
        makeCharc(50, 'brand', true, { required: true, existNamedField: true }),
      ];
      // First call — should warn
      validateRequiredCharacteristics(charcs, []);
      // Second call — warnOnce should suppress duplicate
      validateRequiredCharacteristics(charcs, []);
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });
});
