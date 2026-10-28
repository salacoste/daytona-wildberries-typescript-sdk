import { classifyReturnReason, type ReturnReasonCode } from './classifyReturnReason';

/**
 * Unified return record across FBO and FBS sources.
 *
 * Constructed by `enrichReturnsWithType()` from raw WB API responses.
 * Adds `orderType` (FBO vs FBS) and `reasonCode` (standardized enum) which are
 * not directly available from any single WB endpoint.
 *
 * @since v3.9.3
 */
export interface WbReturn {
  /** Артикул WB (numeric) */
  nmId: number;
  /** ID заказа */
  orderId: number;
  /** Дата возврата (ISO 8601) — completedDt for FBO, lastChangeDate for FBS */
  returnDate: string;
  /** Свободно-текстовая причина возврата */
  reason: string;
  /** Стандартизированный код причины (классификатор) */
  reasonCode: ReturnReasonCode;
  /** Адрес/имя склада (если доступно) */
  warehouseName?: string;
  /** Тип заказа — derived from data source */
  orderType: 'fbo' | 'fbs';
  /** Количество (по умолчанию 1 — каждая запись = одна единица) */
  quantity: number;
}

/**
 * Minimal FBS return shape — what consumers should pass for FBS returns.
 * The actual FBS return data comes from order status history; consumers shape it
 * into this minimal record before calling enrichReturnsWithType().
 *
 * @since v3.9.3
 */
export interface FbsReturnInput {
  nmId?: number;
  orderId?: number;
  /** Дата изменения статуса на возврат */
  lastChangeDate?: string;
  /** Причина возврата */
  reason?: string;
  /** Имя склада */
  warehouseName?: string;
  /** Количество (по умолчанию 1) */
  quantity?: number;
}

/**
 * Minimal FBO return shape — what consumers should pass for FBO returns.
 * Structural type: satisfies both the legacy goods-return report items (removed
 * from the SDK in v5.0.0 — WB disabled the endpoint on 2026-10-26) and the
 * current `GoodsReturnV1Item` records from `getAnalyticsV1GoodsReturn().report`
 * (map `returnReason` → `reason` when feeding v1 data).
 *
 * @since v5.0.0
 */
export interface FboReturnInput {
  nmId?: number;
  orderId?: number;
  /** Дата получения возврата продавцом (v1: completedDt) */
  completedDt?: string;
  /** Дата готовности к возврату (v1: readyToReturnDt) */
  readyToReturnDt?: string;
  /** Дата заказа на возврат (v1: orderDt) */
  orderDt?: string;
  /** Причина возврата (v1: returnReason) */
  reason?: string;
  /** Адрес ПВЗ назначения (v1: dstOfficeAddress) */
  dstOfficeAddress?: string;
}

/**
 * Builds a unified WbReturn[] from FBO returns and optional FBS returns
 * (derived from sdk.ordersFBS status history).
 *
 * Records missing required fields (nmId, orderId, return date) are silently skipped.
 *
 * Pure function — no network calls.
 *
 * @param fboReturns - FBO returns — pass `getAnalyticsV1GoodsReturn().report`
 *   items mapped to `FboReturnInput` (the v1 field for the reason is `returnReason`)
 * @param fbsReturns - Optional FBS return records (consumer-shaped from order status history)
 * @returns Unified array sorted by returnDate descending
 *
 * @example
 * ```typescript
 * const page = await sdk.reports.getAnalyticsV1GoodsReturn({
 *   dateFrom, dateTo, status: 'active', limit: 1000, offset: 0,
 * });
 * const fbo = page.report.map(r => ({ ...r, reason: r.returnReason }));
 * const unified = enrichReturnsWithType(fbo, myFbsReturns);
 * console.log(`Total: ${unified.length}, FBO: ${unified.filter(r => r.orderType === 'fbo').length}`);
 * ```
 *
 * @since v3.9.3
 */
export function enrichReturnsWithType(
  fboReturns: FboReturnInput[],
  fbsReturns: FbsReturnInput[] = []
): WbReturn[] {
  const result: WbReturn[] = [];

  for (const item of fboReturns) {
    const returnDate = item.completedDt ?? item.readyToReturnDt ?? item.orderDt;
    if (item.nmId === undefined || item.orderId === undefined || !returnDate) continue;
    const reason = item.reason ?? '';
    result.push({
      nmId: item.nmId,
      orderId: item.orderId,
      returnDate,
      reason,
      reasonCode: classifyReturnReason(reason),
      warehouseName: item.dstOfficeAddress,
      orderType: 'fbo',
      quantity: 1,
    });
  }

  for (const item of fbsReturns) {
    if (item.nmId === undefined || item.orderId === undefined || !item.lastChangeDate) continue;
    const reason = item.reason ?? '';
    result.push({
      nmId: item.nmId,
      orderId: item.orderId,
      returnDate: item.lastChangeDate,
      reason,
      reasonCode: classifyReturnReason(reason),
      warehouseName: item.warehouseName,
      orderType: 'fbs',
      quantity: item.quantity ?? 1,
    });
  }

  result.sort((a, b) => b.returnDate.localeCompare(a.returnDate));
  return result;
}
