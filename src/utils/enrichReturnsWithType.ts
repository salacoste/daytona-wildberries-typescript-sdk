import type { GoodsReturnItem } from '../types/reports.types';
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
 * Builds a unified WbReturn[] from FBO returns (sdk.reports.getAnalyticsGoodsReturn)
 * and optional FBS returns (derived from sdk.ordersFBS status history).
 *
 * Records missing required fields (nmId, orderId, return date) are silently skipped.
 *
 * Pure function — no network calls.
 *
 * @param fboReturns - FBO returns from getAnalyticsGoodsReturn().report
 * @param fbsReturns - Optional FBS return records (consumer-shaped from order status history)
 * @returns Unified array sorted by returnDate descending
 *
 * @example
 * ```typescript
 * const fbo = await sdk.reports.getAnalyticsGoodsReturn({ dateFrom, dateTo });
 * const unified = enrichReturnsWithType(fbo.report ?? [], myFbsReturns);
 * console.log(`Total: ${unified.length}, FBO: ${unified.filter(r => r.orderType === 'fbo').length}`);
 * ```
 *
 * @since v3.9.3
 */
export function enrichReturnsWithType(
  fboReturns: GoodsReturnItem[],
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
