import { describe, it, expect } from 'vitest';
import { classifyReturnReason } from '../../../src/utils/classifyReturnReason';

describe('classifyReturnReason', () => {
  // damage — 3 examples
  it('classifies "Повреждение упаковки" as damage', () => {
    expect(classifyReturnReason('Повреждение упаковки')).toBe('damage');
  });

  it('classifies "Товар разбит при доставке" as damage', () => {
    expect(classifyReturnReason('Товар разбит при доставке')).toBe('damage');
  });

  it('classifies "Помятая коробка" as damage', () => {
    expect(classifyReturnReason('Помятая коробка')).toBe('damage');
  });

  // defect — 2 examples
  it('classifies "Брак товара" as defect', () => {
    expect(classifyReturnReason('Брак товара')).toBe('defect');
  });

  it('classifies "Заводской дефект, не включается" as defect', () => {
    expect(classifyReturnReason('Заводской дефект, не включается')).toBe('defect');
  });

  // wrong_size — 2 examples
  it('classifies "Не подошёл размер" as wrong_size', () => {
    expect(classifyReturnReason('Не подошёл размер')).toBe('wrong_size');
  });

  it('classifies "Размер не подошел, маловат" as wrong_size', () => {
    expect(classifyReturnReason('Размер не подошел, маловат')).toBe('wrong_size');
  });

  // wrong_item — 1 example
  it('classifies "Пришло другое изделие" as wrong_item', () => {
    expect(classifyReturnReason('Пришло другое изделие')).toBe('wrong_item');
  });

  // expired — 1 example
  it('classifies "Истёк срок годности" as expired', () => {
    expect(classifyReturnReason('Истёк срок годности')).toBe('expired');
  });

  // not_as_described — 1 example
  it('classifies "Не соответствует описанию на сайте" as not_as_described', () => {
    expect(classifyReturnReason('Не соответствует описанию на сайте')).toBe('not_as_described');
  });

  // customer_refused — 1 example
  it('classifies "Покупатель передумал" as customer_refused', () => {
    expect(classifyReturnReason('Покупатель передумал')).toBe('customer_refused');
  });

  // unknown → other
  it('returns "other" for an unrecognised reason', () => {
    expect(classifyReturnReason('Какая-то неизвестная причина xyz')).toBe('other');
  });

  // empty string → other
  it('returns "other" for an empty string', () => {
    expect(classifyReturnReason('')).toBe('other');
  });

  // null → other
  it('returns "other" for null', () => {
    expect(classifyReturnReason(null)).toBe('other');
  });

  // undefined → other
  it('returns "other" for undefined', () => {
    expect(classifyReturnReason(undefined)).toBe('other');
  });

  // case-insensitivity — uppercase input
  it('is case-insensitive (uppercase "БРАК ТОВАРА" → defect)', () => {
    expect(classifyReturnReason('БРАК ТОВАРА')).toBe('defect');
  });
});
