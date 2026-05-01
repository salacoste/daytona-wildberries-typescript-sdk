/**
 * Standardized return reason codes derived from Wildberries free-text reason strings.
 *
 * @since v3.9.3
 */
export type ReturnReasonCode =
  | 'damage' // Повреждение товара/упаковки
  | 'defect' // Брак, заводской дефект
  | 'wrong_size' // Не подошёл размер
  | 'wrong_item' // Не тот товар, ошибка комплектации
  | 'customer_refused' // Покупатель отказался
  | 'expired' // Истёк срок годности / время на возврат
  | 'not_as_described' // Не соответствует описанию / фото
  | 'other'; // Не удалось классифицировать

/**
 * Classifies a Wildberries return reason string into a standardized enum code.
 *
 * Pure function — no side effects. Returns 'other' for unknown reasons.
 *
 * @param reason - Free-text Russian reason string from WB API (e.g., GoodsReturnItem.reason)
 * @returns Standardized ReturnReasonCode
 *
 * @example
 * classifyReturnReason('Брак товара') // → 'defect'
 * classifyReturnReason('Не подошёл размер') // → 'wrong_size'
 * classifyReturnReason('') // → 'other'
 *
 * @since v3.9.3
 */
export function classifyReturnReason(reason: string | null | undefined): ReturnReasonCode {
  if (!reason) return 'other';
  const text = reason.toLowerCase().trim();
  if (!text) return 'other';

  // damage — повреждения
  if (/повреждени|поврежд|сломан|разбит|потёрт|царапин|деформ|помят/.test(text)) return 'damage';

  // defect — брак / заводской дефект
  if (/брак|дефект|неисправн|не работает|сломалось|не включается/.test(text)) return 'defect';

  // wrong_size — размер
  if (
    /не подошёл размер|не подошел размер|не по размеру|размер не подошёл|размер не подошел|маловат|великоват|узк|шир/.test(
      text
    )
  ) {
    return 'wrong_size';
  }

  // wrong_item — не тот товар
  if (/не тот товар|неправильный товар|ошибк[аи] комплект|пришло другое|перепутали/.test(text)) {
    return 'wrong_item';
  }

  // expired — сроки
  if (/срок годности|истёк срок|истек срок|просроч|время.*возврат/.test(text)) return 'expired';

  // not_as_described — не соответствует описанию
  if (/не соответств|не как на фото|описан|качество|не оправда/.test(text))
    return 'not_as_described';

  // customer_refused — отказ покупателя (catch-all для добровольных)
  if (/отказ|раздума|передумал|не понравил|не нужен|вернуть/.test(text)) return 'customer_refused';

  return 'other';
}
