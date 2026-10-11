import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { load } from 'js-yaml';

interface CsvSpec {
  components: { examples: Record<string, { value: string }> };
  paths?: Record<
    string,
    {
      get?: {
        responses: { '200': { content: Record<string, { schema: { description: string } }> } };
      };
    }
  >;
}

const removed = [
  'OpenCardPercentile',
  'AddToCartPercentile',
  'OpenToCartPercentile',
  'OrdersPercentile',
  'CartToOrderPercentile',
];

// Только простые синтетические CSV без кавычек; это проверка fixtures/контракта,
// а не CSV-парсер SDK. getDownloadsFile возвращает ZIP как ArrayBuffer.
function rows(csv: string): string[][] {
  return csv
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(','));
}

const copies = [
  'wildberries_api_doc/11-analytics.yaml',
  'wildberries_api_doc/11-analytics/_schemas.yaml',
  'docs/api-reference/raw-yaml/11-analytics.yaml',
];

describe('Search Queries CSV contract effective 2026-10-12', () => {
  for (const path of copies) {
    const spec = load(readFileSync(resolve(path), 'utf8')) as CsvSpec;

    describe(path, () => {
      it.each(['Text', 'Group', 'Product'])(
        '%s matches the synthetic CSV header and row width',
        (variant) => {
          const fixture = rows(
            readFileSync(
              resolve(
                `tests/fixtures/analytics/search-queries-${variant.toLowerCase()}-2026-10-12.csv`
              ),
              'utf8'
            )
          );
          const exampleName =
            variant === 'Product' && path.startsWith('docs/')
              ? 'SearchReportItemRes'
              : `SearchReport${variant}Res`;
          const example = rows(spec.components.examples[exampleName].value);
          // Английская закреплённая копия дополнительно содержит Currency.
          const expectedHeader =
            path.startsWith('docs/') && variant !== 'Group'
              ? [...fixture[0], 'Currency']
              : fixture[0];
          expect(example[0]).toEqual(expectedHeader);
          // Старые upstream examples имеют неполные строки; не исправляем
          // несвязанный контракт. Новые synthetic fixtures всегда полные.
          for (const row of fixture.slice(1)) {
            expect(row).toHaveLength(fixture[0].length);
          }
        }
      );

      it('omits only the five disabled text columns and retains neighbouring metrics', () => {
        const [header] = rows(spec.components.examples.SearchReportTextRes.value);
        for (const field of removed) expect(header).not.toContain(field);
        for (const field of [
          'OpenCard',
          'AddToCart',
          'OpenToCart',
          'Orders',
          'CartToOrder',
          'Visibility',
          'OrdersPast',
          'CartToOrderPast',
        ]) {
          expect(header).toContain(field);
        }
        const [fixtureHeader, fixtureRow] = rows(
          readFileSync(
            resolve('tests/fixtures/analytics/search-queries-text-2026-10-12.csv'),
            'utf8'
          )
        );
        expect(fixtureRow[fixtureHeader.indexOf('Orders')]).toBe('7');
        expect(fixtureRow[fixtureHeader.indexOf('CartToOrder')]).toBe('35');
      });
    });
  }

  it.each([
    'wildberries_api_doc/11-analytics.yaml',
    'wildberries_api_doc/11-analytics/analitika-prodavtsa-csv.yaml',
    'docs/api-reference/raw-yaml/11-analytics.yaml',
  ])('%s no longer advertises disabled columns in the download field table', (path) => {
    const spec = load(readFileSync(resolve(path), 'utf8')) as CsvSpec;
    const content =
      spec.paths?.['/api/v2/nm-report/downloads/file/{downloadId}'].get?.responses['200'].content;
    expect(content).toBeDefined();
    const description = Object.values(content!)[0].schema.description;
    for (const field of removed) expect(description).not.toMatch(new RegExp(`\\| ${field}\\s*\\|`));
  });
});
