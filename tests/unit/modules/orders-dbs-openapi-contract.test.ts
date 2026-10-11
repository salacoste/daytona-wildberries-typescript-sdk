import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { load } from 'js-yaml';
import { describe, expect, it } from 'vitest';

interface Schema {
  type?: string;
  nullable?: boolean;
  default?: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
  required?: string[];
  properties?: Record<string, Schema>;
  items?: Schema;
  $ref?: string;
}

interface DbsSpec {
  servers?: { url: string }[];
  paths?: Record<
    string,
    {
      servers?: { url: string }[];
      post?: {
        servers?: { url: string }[];
        requestBody?: {
          required?: boolean;
          content: { 'application/json': { schema: Schema } };
        };
        responses: Record<string, unknown>;
        'x-readonly-method'?: boolean;
        'x-category'?: string;
      };
    }
  >;
  components?: { schemas: Record<string, Schema> };
  _shards?: { file: string; endpoints: number }[];
  _total_endpoints?: number;
}

function readSpec(path: string): DbsSpec {
  return load(readFileSync(resolve(path), 'utf8')) as DbsSpec;
}

describe('Orders DBS OpenAPI October 2026 contracts', () => {
  it('keeps nullable client-info orders aligned across root, shard, and raw copies', () => {
    const specs = [
      readSpec('wildberries_api_doc/04-orders-dbs.yaml'),
      readSpec('wildberries_api_doc/04-orders-dbs/_schemas.yaml'),
      readSpec('docs/api-reference/raw-yaml/04-orders-dbs.local-stopgap.yaml'),
    ];
    const rootOrders = specs[0].components!.schemas.DbsOnlyClientInfoResp.properties!.orders;

    expect(rootOrders).toEqual(expect.objectContaining({ type: 'array', nullable: true }));
    for (const spec of specs.slice(1)) {
      expect(spec.components!.schemas.DbsOnlyClientInfoResp.properties!.orders).toEqual(rootOrders);
    }
  });

  it('keeps the sandbox route and visible request contract aligned across local copies', () => {
    const route = '/api/v3/test/dbs/orders/make';
    const root = readSpec('wildberries_api_doc/04-orders-dbs.yaml');
    const shard = readSpec('wildberries_api_doc/04-orders-dbs/sandbox-dbs.yaml');
    const raw = readSpec('docs/api-reference/raw-yaml/04-orders-dbs.local-stopgap.yaml');
    const shared = readSpec('wildberries_api_doc/04-orders-dbs/_schemas.yaml');
    const rootPath = root.paths![route];

    expect(shard.paths![route]).toEqual(rootPath);
    expect(raw.paths![route]).toEqual(rootPath);
    expect(rootPath.servers).toEqual([{ url: 'https://marketplace-api-sandbox.wildberries.ru' }]);
    expect(rootPath.servers).not.toContainEqual({
      url: 'https://marketplace-api.wildberries.ru',
    });
    expect(shard.servers).toEqual([{ url: 'https://marketplace-api-sandbox.wildberries.ru' }]);

    const operation = rootPath.post!;
    expect(operation['x-readonly-method']).toBe(false);
    expect(operation['x-category']).toBe('marketplace');
    expect(operation.requestBody?.required).toBe(true);
    expect(operation.responses).toHaveProperty('204');
    expect(operation.requestBody?.content['application/json'].schema.$ref).toBe(
      '#/components/schemas/CreateTestDbsOrdersRequest'
    );

    const rootSchemas = root.components!.schemas;
    for (const schemaName of [
      'CreateTestDbsOrdersRequest',
      'CreateTestDbsOrder',
      'CreateTestDbsAddress',
    ]) {
      expect(raw.components!.schemas[schemaName]).toEqual(rootSchemas[schemaName]);
      expect(shared.components!.schemas[schemaName]).toEqual(rootSchemas[schemaName]);
    }
    expect(rootSchemas.CreateTestDbsOrdersRequest.required).toEqual(['orders']);
    expect(rootSchemas.CreateTestDbsOrdersRequest.properties!.orders).toEqual(
      expect.objectContaining({ type: 'array', minItems: 1, maxItems: 10 })
    );
    expect(rootSchemas.CreateTestDbsOrdersRequest.properties!.deliveryType).toEqual(
      expect.objectContaining({
        type: 'string',
        default: 'dbs',
        enum: ['dbs', 'dbsPickupPoint', 'edbs'],
      })
    );
    expect(rootSchemas.CreateTestDbsOrdersRequest.required).not.toContain('deliveryType');
    expect(rootSchemas.CreateTestDbsOrdersRequest.required).not.toContain('address');
    expect(rootSchemas.CreateTestDbsOrder.required).toEqual(['sku', 'amount']);
    expect(rootSchemas.CreateTestDbsOrder.properties!.amount).toEqual({
      type: 'integer',
      maximum: 10,
      description: 'Количество товара; отображённая схема не показывает нижнюю границу',
    });
    expect(rootSchemas.CreateTestDbsOrder.properties!.amount.minimum).toBeUndefined();
    expect(rootSchemas.CreateTestDbsAddress.required).toEqual([
      'region',
      'locality',
      'street',
      'houseNumber',
    ]);
  });

  it('keeps root and shard endpoint counts synchronized after adding the sandbox shard', () => {
    const root = readSpec('wildberries_api_doc/04-orders-dbs.yaml');
    const index = readSpec('wildberries_api_doc/04-orders-dbs/_index.yaml');
    const declaredShardCount = index._shards!.reduce((total, shard) => total + shard.endpoints, 0);

    expect(Object.keys(root.paths!)).toHaveLength(33);
    expect(declaredShardCount).toBe(33);
    expect(index._total_endpoints).toBe(33);
  });
});
