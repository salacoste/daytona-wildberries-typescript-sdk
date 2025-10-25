# Code Generator

Automated TypeScript type generation from OpenAPI 3.0.1 specifications.

## Overview

The Wildberries SDK code generator transforms OpenAPI/Swagger YAML files into TypeScript type definitions. It handles:

- **Type Mapping**: OpenAPI schemas → TypeScript interfaces and types
- **JSDoc Generation**: Preserves descriptions and documentation from OpenAPI
- **$ref Resolution**: Resolves schema references automatically
- **PascalCase Conversion**: Converts schema names to TypeScript naming conventions

## Usage

### Generate all modules

```bash
npm run generate
```

### Generate specific module

```bash
npm run generate:general
npm run generate -- wildberries_api_doc/02-products.yaml
```

### Generate types only (future)

```bash
npm run generate:types
```

## Architecture

### Core Components

1. **yaml-parser.ts** - OpenAPI YAML parsing and validation
2. **type-mapper.ts** - OpenAPI → TypeScript type mapping engine
3. **jsdoc-generator.ts** - JSDoc comment generation
4. **schema-to-interface.ts** - Complete interface generation
5. **file-writer.ts** - TypeScript file writing
6. **generate-sdk.ts** - Main orchestrator

### Type Mapping Rules

| OpenAPI Type | OpenAPI Format | TypeScript Type | Example |
|--------------|----------------|-----------------|---------|
| `string` | - | `string` | `name: string` |
| `string` | `date-time` | `string` | `createdAt: string` (ISO 8601) |
| `string` | `enum` | Union type | `status: 'new' \| 'confirmed'` |
| `integer`, `number` | - | `number` | `count: number` |
| `boolean` | - | `boolean` | `isActive: boolean` |
| `array` | - | `T[]` | `tags: string[]` |
| `object` | - | Interface | `metadata: Metadata` |
| `$ref` | - | Interface reference | `product: ProductCard` |

## Output

Generated files are written to `src/types/<module>.types.ts` with:

- File header with generation timestamp and warnings
- JSDoc comments extracted from OpenAPI descriptions
- Exported interfaces and type aliases
- Optional property markers (`?`) based on `required` array

## Example

**Input** (OpenAPI YAML):
```yaml
components:
  schemas:
    ProductCard:
      type: object
      description: Product information
      required: [id, name]
      properties:
        id:
          type: number
          description: Product ID
        name:
          type: string
          description: Product name
        price:
          type: number
          description: Price in rubles
```

**Output** (TypeScript):
```typescript
/**
 * Product information
 */
export interface ProductCard {
  /** Product ID */
  id: number;
  /** Product name */
  name: string;
  /** Price in rubles */
  price?: number;
}
```

## Troubleshooting

### No schemas found

Some OpenAPI files (like `01-general.yaml`) contain only endpoint definitions without reusable schemas. This is expected - the generator will report `0 types` generated.

### TypeScript compilation errors

Generated types are automatically validated against TypeScript's strict mode. If errors occur:

1. Check the OpenAPI schema for invalid structures
2. Verify `$ref` references point to existing schemas
3. Review type mapping for edge cases

### Irregular whitespace warnings

Generated files may contain non-ASCII characters from Russian API descriptions. These are preserved intentionally and can be ignored in generated code.

## Future Enhancements

- **Module method generation** - Generate API client methods from `paths`
- **Rate limit extraction** - Parse rate limits from descriptions
- **Request/response type pairs** - Generate types for each endpoint
- **Validation schemas** - Optional runtime validation code generation
