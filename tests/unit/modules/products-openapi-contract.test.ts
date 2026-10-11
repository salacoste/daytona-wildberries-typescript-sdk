import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { load } from 'js-yaml';
import { describe, expect, it } from 'vitest';

interface Schema {
  type?: string;
  nullable?: boolean;
  default?: string;
  enum?: string[];
  required?: string[];
  properties?: Record<string, Schema>;
  items?: Schema;
}

interface Operation {
  description?: string;
  parameters?: { name: string; required?: boolean; schema: Schema }[];
  requestBody?: { content: { 'application/json': { schema: Schema } } };
  responses: Record<string, { content?: { 'application/json': { schema: Schema } } }>;
}

interface ProductSpec {
  paths: Record<string, { get?: Operation; post?: Operation }>;
}

function readSpec(path: string): ProductSpec {
  return load(readFileSync(resolve(path), 'utf8')) as ProductSpec;
}

const root = readSpec('wildberries_api_doc/02-products.yaml');
const directoryShard = readSpec(
  'wildberries_api_doc/02-products/kategorii-predmety-i-kharakteristiki.yaml'
);
const raw = readSpec('docs/api-reference/raw-yaml/02-products.local-stopgap.yaml');

const directoryContracts = [
  {
    route: '/api/content/v2/directory/tnved/all',
    parameters: [
      { name: 'search', schema: { type: 'integer' } },
      { name: 'locale', schema: { type: 'string', enum: ['ru', 'en'], default: 'ru' } },
    ],
    entry: ['tnved', 'description'],
  },
  {
    route: '/api/content/v2/directory/okpd',
    parameters: [
      { name: 'subjectId', required: true, schema: { type: 'integer' } },
      { name: 'search', schema: { type: 'string' } },
      { name: 'locale', schema: { type: 'string', enum: ['ru'], default: 'ru' } },
    ],
    entry: ['okpd2', 'description'],
  },
  {
    route: '/api/content/v2/directory/okpd/all',
    parameters: [
      { name: 'search', schema: { type: 'number' } },
      { name: 'locale', schema: { type: 'string', enum: ['ru'], default: 'ru' } },
    ],
    entry: ['okpd2', 'description'],
  },
];

describe('Products OpenAPI October 2026 contracts', () => {
  it.each(directoryContracts)('$route keeps root, shard, and raw directory semantics', (item) => {
    const operation = root.paths[item.route].get!;

    expect(directoryShard.paths[item.route].get).toEqual(operation);
    expect(raw.paths[item.route].get).toEqual(operation);
    expect(operation.parameters).toEqual(
      item.parameters.map((parameter) =>
        expect.objectContaining({
          name: parameter.name,
          ...(parameter.required ? { required: true } : {}),
          schema: expect.objectContaining(parameter.schema),
        })
      )
    );
    const response = operation.responses['200'].content!['application/json'].schema;
    expect(response.required).toEqual(['data', 'error', 'errorText', 'additionalErrors']);
    expect(response.properties!.data.items!.required).toEqual(item.entry);
    expect(response.properties!.additionalErrors).toEqual(
      expect.objectContaining({ type: 'string', nullable: true })
    );
    expect(operation.description).toContain('100 запросов в минуту');
    expect(operation.description).toContain('интервал 600 мс');
    expect(operation.description).toContain('всплеск 5');
  });

  const gtinPlacements = [
    {
      route: '/content/v2/cards/upload',
      shard: 'wildberries_api_doc/02-products/sozdanie-kartochek-tovarov.yaml',
      locate: (operation: Operation) =>
        operation.requestBody!.content['application/json'].schema.items!.properties!.variants
          .items!,
    },
    {
      route: '/content/v2/cards/update',
      shard: 'wildberries_api_doc/02-products/kartochki-tovarov-part2.yaml',
      locate: (operation: Operation) =>
        operation.requestBody!.content['application/json'].schema.items!,
    },
    {
      route: '/content/v2/cards/upload/add',
      shard: 'wildberries_api_doc/02-products/sozdanie-kartochek-tovarov.yaml',
      locate: (operation: Operation) =>
        operation.requestBody!.content['application/json'].schema.properties!.cardsToAdd.items!,
    },
    {
      route: '/content/v2/get/cards/list',
      shard: 'wildberries_api_doc/02-products/kartochki-tovarov-part1.yaml',
      locate: (operation: Operation) =>
        operation.responses['200'].content!['application/json'].schema.properties!.cards.items!,
    },
  ];

  it.each(gtinPlacements)('$route keeps optional non-null gtin at the exact placement', (item) => {
    const rootOperation = root.paths[item.route].post!;
    const rawOperation = raw.paths[item.route].post!;
    const shardOperation = readSpec(item.shard).paths[item.route].post!;
    const rootParent = item.locate(rootOperation);
    const rootGtin = rootParent.properties!.gtin;

    for (const parent of [rootParent, item.locate(rawOperation), item.locate(shardOperation)]) {
      expect(parent.properties!.gtin).toEqual(rootGtin);
      expect(parent.properties!.gtin).toEqual(expect.objectContaining({ type: 'string' }));
      expect(parent.properties!.gtin.nullable).not.toBe(true);
      expect(parent.required ?? []).not.toContain('gtin');
    }
  });
});
