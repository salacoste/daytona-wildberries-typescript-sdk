/**
 * task-135(b) attribution-lag measurement — READ-ONLY.
 * Method: WB attributes sum_price (revenue) to the click-day, but finalization lags ->
 * a past day's sum_price grows over time. Snapshot now, re-pull the SAME past days later,
 * the delta (growth) reveals the finalization lag. No writes, no new clicks.
 *
 * Usage:
 *   npx tsx tools/measure-attribution-lag.ts snapshot   # record current per-day sum_price
 *   npx tsx tools/measure-attribution-lag.ts diff       # re-pull same window, compare to snapshot
 *
 * Snapshot path: backlog/docs/attribution-lag-snapshot.json (persists across sessions).
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, no-console, @typescript-eslint/use-unknown-in-catch-callback-variable -- one-off research/measurement tool */
import 'dotenv/config';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { WildberriesSDK } from '../src/index';
import { WBAPIError } from '../src/errors/base-error';

const CAMPAIGN_IDS = ['36421158', '36483120', '36508180'];
const SNAPSHOT_PATH = resolve(process.cwd(), 'backlog/docs/attribution-lag-snapshot.json');

interface DayRow {
  date: string;
  clicks: number;
  sum: number;
  sum_price: number;
  orders: number;
}
interface Snapshot {
  snapshot_at: string;
  window: { begin: string; end: string };
  campaigns: Record<string, DayRow[]>;
}

const fmt = (d: Date): string => d.toISOString().slice(0, 10);

async function pull(
  sdk: WildberriesSDK,
  begin: string,
  end: string
): Promise<Record<string, DayRow[]>> {
  const out: Record<string, DayRow[]> = {};
  for (const id of CAMPAIGN_IDS) {
    try {
      const res = (await sdk.promotion.getAdvFullstats({
        ids: id,
        beginDate: begin,
        endDate: end,
      })) as unknown as any;
      const item = Array.isArray(res) ? res[0] : res;
      const rows: DayRow[] = (item?.days ?? []).map(
        (d: any): DayRow => ({
          date: String(d.date ?? d.day ?? d.begin ?? '').slice(0, 10),
          clicks: Number(d.clicks ?? 0),
          sum: Number(d.sum ?? 0),
          sum_price: Number(d.sum_price ?? 0),
          orders: Number(d.orders ?? 0),
        })
      );
      rows.sort((a, b) => (a.date < b.date ? -1 : 1));
      out[id] = rows;
    } catch (e: unknown) {
      const msg = e instanceof WBAPIError ? `WBAPIError ${e.statusCode}: ${e.message}` : String(e);
      console.error(`[pull] campaign ${id} failed: ${msg}`);
      out[id] = [];
    }
  }
  return out;
}

async function snapshot(): Promise<void> {
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) throw new Error('WB_API_KEY missing in .env');
  const sdk = new WildberriesSDK({ apiKey });
  const end = new Date();
  const begin = new Date(end.getTime() - 13 * 86400_000);
  const win = { begin: fmt(begin), end: fmt(end) };
  console.log(
    `[snapshot] window ${win.begin} -> ${win.end} (14d). campaigns: ${CAMPAIGN_IDS.join(', ')}`
  );
  const campaigns = await pull(sdk, win.begin, win.end);
  const snap: Snapshot = { snapshot_at: new Date().toISOString(), window: win, campaigns };
  writeFileSync(SNAPSHOT_PATH, JSON.stringify(snap, null, 2) + '\n', 'utf8');
  console.log(`[snapshot] written -> ${SNAPSHOT_PATH}`);
  for (const [id, rows] of Object.entries(campaigns)) {
    const partial = rows.filter((r) => r.clicks > 0 && r.sum_price === 0);
    console.log(
      `  ${id}: ${rows.length} days; recent 0-rev-but-clicked days: ${partial.map((r) => r.date).join(', ') || 'none'}`
    );
  }
  console.log('  Re-run `diff` in +3/+5/+7 days to measure how those days grew.');
}

async function diff(): Promise<void> {
  if (!existsSync(SNAPSHOT_PATH))
    throw new Error(`no snapshot at ${SNAPSHOT_PATH} — run \`snapshot\` first.`);
  const snap = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8')) as Snapshot;
  const apiKey = process.env.WB_API_KEY;
  if (!apiKey) throw new Error('WB_API_KEY missing in .env');
  const sdk = new WildberriesSDK({ apiKey });
  console.log(
    `[diff] snapshot was ${snap.snapshot_at}; re-pulling FIXED window ${snap.window.begin} -> ${snap.window.end}`
  );
  const now = await pull(sdk, snap.window.begin, snap.window.end);
  let anyGrew = false;
  for (const id of CAMPAIGN_IDS) {
    const before = new Map((snap.campaigns[id] ?? []).map((r) => [r.date, r]));
    const after = now[id] ?? [];
    console.log(`\n=== campaign ${id} ===`);
    console.log('  date         clicks  sum_price(before -> after)  orders(b->a)  Δgrew?');
    for (const a of after) {
      const b = before.get(a.date);
      if (!b) continue;
      const grew = a.sum_price - b.sum_price;
      const mark = grew > 0 ? `  +${grew} ↑` : '';
      if (grew > 0) anyGrew = true;
      console.log(
        `  ${a.date}   ${String(a.clicks).padStart(5)}   ${String(b.sum_price).padStart(6)} -> ${String(a.sum_price).padStart(6)}        ${String(b.orders).padStart(2)}->${String(a.orders)}${mark}`
      );
    }
  }
  console.log(
    `\n[diff] ${anyGrew ? 'finalization STILL growing (lag not yet complete).' : 'STABLE — finalization complete, lag window passed.'}`
  );
}

const mode = process.argv[2];
(async () => {
  if (mode === 'snapshot') await snapshot();
  else if (mode === 'diff') await diff();
  else {
    console.error('usage: npx tsx tools/measure-attribution-lag.ts <snapshot|diff>');
    process.exit(2);
  }
})().catch((e) => {
  console.error('failed:', e);
  process.exit(1);
});
