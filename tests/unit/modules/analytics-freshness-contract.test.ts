import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { load } from 'js-yaml';
import { describe, expect, it } from 'vitest';

interface AnalyticsSpec {
  paths: Record<string, { post?: { description?: string } }>;
}

function readSpec(path: string): AnalyticsSpec {
  return load(readFileSync(resolve(path), 'utf8')) as AnalyticsSpec;
}

const root = 'wildberries_api_doc/11-analytics.yaml';
const raw = 'docs/api-reference/raw-yaml/11-analytics.yaml';
const freshnessContracts = [
  {
    shard: 'wildberries_api_doc/11-analytics/voronka-prodazh.yaml',
    effectiveDate: '2026-09-24',
    routes: [
      '/api/analytics/v3/sales-funnel/products',
      '/api/analytics/v3/sales-funnel/products/history',
      '/api/analytics/v3/sales-funnel/grouped/history',
    ],
  },
  {
    shard: 'wildberries_api_doc/11-analytics/poiskovye-zaprosy.yaml',
    effectiveDate: '2026-10-12',
    routes: [
      '/api/v2/search-report/report',
      '/api/v2/search-report/table/groups',
      '/api/v2/search-report/table/details',
      '/api/v2/search-report/product/search-texts',
      '/api/v2/search-report/product/orders',
    ],
  },
];

describe('Analytics two-hour freshness contracts', () => {
  for (const contract of freshnessContracts) {
    const copies = [root, contract.shard, raw].map((path) => ({
      path,
      spec: readSpec(path),
    }));

    for (const route of contract.routes) {
      it.each(copies)(`${route} is coherent in $path`, ({ spec }) => {
        const description = spec.paths[route].post?.description;

        expect(description).toContain(contract.effectiveDate);
        expect(description).toMatch(/раз в 2 часа|once every two hours/i);
        expect(description).not.toMatch(/updated once (?:an|per) hour/i);
      });
    }
  }
});
