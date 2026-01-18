# API Documentation Sharding Index

**Purpose**: This index provides navigation to sharded OpenAPI YAML files organized by functional domains for AI agent processing.

**Last Updated**: 2025-01-18

**Location**: `/Users/r2d2/Documents/Code_Projects/wb_daytona_sdk/wildberries_api_doc/`

---

## Sharding Overview

Large OpenAPI YAML files have been sharded into smaller, domain-organized modules to prevent token overflow when AI agents read them. Each shard file is under 1000 lines and organized by functional domain.

**Backup**: Original files are preserved in `original/` subdirectory.

---

## Sharded Modules

### 1. Products Module (`02-products/`)
**Original**: `02-products.yaml` (6,615 lines, 48 endpoints)
**Base URL**: `https://content-api.wildberries.ru`

| Shard File | Domain | Endpoints | Lines | Description |
|------------|--------|-----------|-------|-------------|
| `kategorii-predmety-i-kharakteristiki.yaml` | Categories and Characteristics | 9 | 888 | Parent categories, object characteristics, colors, kinds, countries, seasons, VAT, TNVED |
| `sozdanie-kartochek-tovarov.yaml` | Product Card Creation | 4 | 675 | Create product cards, bulk operations |
| `kartochki-tovarov-part1.yaml` | Product Cards (Part 1) | 2 | 822 | Product card management operations |
| `kartochki-tovarov-part2.yaml` | Product Cards (Part 2) | 2 | 530 | Product card operations continued |
| `kartochki-tovarov-part3.yaml` | Product Cards (Part 3) | 2 | 531 | Product card operations continued |
| `kartochki-tovarov-part4.yaml` | Product Cards (Part 4) | 1 | 377 | Product card operations final |
| `mediafayly.yaml` | Media Files | 2 | 193 | Media file upload and save operations |
| `yarlyki.yaml` | Labels | 5 | 456 | Label management operations |
| `tseny-i-skidki.yaml` | Prices and Discounts | 11 | 663 | Price management and discount operations |
| `sklady-prodavtsa.yaml` | Seller Warehouses | 7 | 591 | Warehouse management operations |
| `ostatki-na-skladakh-prodavtsa.yaml` | Warehouse Stock | 3 | 313 | Stock level management |

**Supporting Files**:
- `_index.yaml`: Module index with metadata
- `_schemas.yaml`: Shared schemas (21 schemas, 433 lines)

---

### 2. Promotion Module (`08-promotion/`)
**Original**: `08-promotion.yaml` (6,873 lines, 42 endpoints)
**Base URL**: `https://promo-api.wildberries.ru`

| Shard File | Domain | Endpoints | Lines | Description |
|------------|--------|-----------|-------|-------------|
| `kampanii.yaml` | Campaigns | 3 | 875 | Campaign listing and overview |
| `sozdanie-kampaniy.yaml` | Campaign Creation | 6 | 660 | Create new campaigns |
| `upravlenie-kampaniyami.yaml` | Campaign Management | 8 | 687 | Manage existing campaigns |
| `parametry-kampaniy.yaml` | Campaign Parameters | 7 | 579 | Campaign parameter management |
| `finansy.yaml` | Finances | 5 | 480 | Financial operations |
| `media.yaml` | Media | 3 | 494 | Media management |
| `statistika-part1.yaml` | Statistics (Part 1) | 2 | 872 | Campaign statistics |
| `statistika-part2.yaml` | Statistics (Part 2) | 2 | 870 | Campaign statistics continued |
| `statistika-part3.yaml` | Statistics (Part 3) | 2 | 840 | Campaign statistics final |
| `kalendar-aktsiy.yaml` | Promotion Calendar | 4 | 149 | Promotion calendar management |

**Supporting Files**:
- `_index.yaml`: Module index with metadata
- `_schemas.yaml`: Shared schemas (3 schemas, 82 lines)

---

### 3. Analytics Module (`11-analytics/`)
**Original**: `11-analytics.yaml` (5,174 lines, 16 endpoints)
**Base URL**: `https://seller-analytics-api.wildberries.ru`

| Shard File | Domain | Endpoints | Lines | Description |
|------------|--------|-----------|-------|-------------|
| `voronka-prodazh.yaml` | Sales Funnel | 3 | 999 | Sales funnel analytics |
| `poiskovye-zaprosy-part1.yaml` | Search Queries (Part 1) | 2 | 909 | Search query analytics |
| `poiskovye-zaprosy-part2.yaml` | Search Queries (Part 2) | 2 | 896 | Search query analytics continued |
| `poiskovye-zaprosy-part3.yaml` | Search Queries (Part 3) | 1 | 638 | Search query analytics final |
| `istoriya-ostatkov-part1.yaml` | Stock History (Part 1) | 2 | 827 | Stock history reports |
| `istoriya-ostatkov-part2.yaml` | Stock History (Part 2) | 2 | 838 | Stock history reports continued |
| `analitika-prodavtsa-csv-part1.yaml` | Seller Analytics CSV (Part 1) | 2 | 830 | CSV export operations |
| `analitika-prodavtsa-csv-part2.yaml` | Seller Analytics CSV (Part 2) | 2 | 832 | CSV export operations continued |

**Supporting Files**:
- `_index.yaml`: Module index with metadata
- `_schemas.yaml`: Shared schemas (1 schema, 26 lines)

---

### 4. Communications Module (`09-communications/`)
**Original**: `09-communications.yaml` (3,833 lines, 26 endpoints)
**Base URL**: `https://communications-api.wildberries.ru`

| Shard File | Domain | Endpoints | Lines | Description |
|------------|--------|-----------|-------|-------------|
| `voprosy.yaml` | Questions | 6 | 794 | Customer questions management |
| `otzyvy-part1.yaml` | Reviews (Part 1) | 3 | 581 | Product reviews |
| `otzyvy-part2.yaml` | Reviews (Part 2) | 3 | 530 | Product reviews continued |
| `otzyvy-part3.yaml` | Reviews (Part 3) | 3 | 664 | Product reviews continued |
| `otzyvy-part4.yaml` | Reviews (Part 4) | 1 | 389 | Product reviews final |
| `shablony-otvetov.yaml` | Response Templates | 4 | 313 | Template management |
| `chat-s-pokupatelyami.yaml` | Customer Chat | 4 | 643 | Chat operations |
| `vozvraty-pokupatelyami.yaml` | Customer Returns | 2 | 73 | Return management |

**Supporting Files**:
- `_index.yaml`: Module index with metadata
- `_schemas.yaml`: Shared schemas (2 schemas, 38 lines)

---

### 5. Reports Module (`12-reports/`)
**Original**: `12-reports.yaml` (3,677 lines, 26 endpoints)
**Base URL**: `https://seller-analytics-api.wildberries.ru`

| Shard File | Domain | Endpoints | Lines | Description |
|------------|--------|-----------|-------|-------------|
| `osnovnye-otchety.yaml` | Main Reports | 4 | 711 | Main report operations |
| `otchet-ob-ostatkakh-na-skladakh.yaml` | Warehouse Stock Reports | 3 | 367 | Warehouse stock reports |
| `otchet-o-tovarakh-c-obyazatelnoy-markirovkoy.yaml` | Marked Goods Reports | 1 | 165 | Marked goods reporting |
| `otchety-ob-uderzhaniyakh.yaml` | Deduction Reports | 5 | 568 | Deduction reports |
| `platnaya-priemka.yaml` | Paid Receiving | 3 | 270 | Paid receiving operations |
| `platnoe-khranenie.yaml` | Paid Storage | 3 | 383 | Paid storage operations |
| `prodazhi-po-regionam.yaml` | Regional Sales | 1 | 77 | Regional sales reports |
| `dolya-brenda-v-prodazhakh.yaml` | Brand Share | 3 | 197 | Brand share reports |
| `skrytye-tovary.yaml` | Hidden Items | 2 | 245 | Hidden items reports |
| `otchet-o-vozvratakh-i-peremeshchenii-tovarov.yaml` | Returns and Movement Reports | 1 | 192 | Returns and movement reporting |

**Supporting Files**:
- `_index.yaml`: Module index with metadata
- `_schemas.yaml`: None (all schemas embedded in shards)

---

### 6. Orders FBS Module (`03-orders-fbs/`)
**Original**: `03-orders-fbs.yaml` (3,497 lines, 35 endpoints)
**Base URL**: `https://marketplace-api.wildberries.ru`

| Shard File | Domain | Endpoints | Lines | Description |
|------------|--------|-----------|-------|-------------|
| `sborochnye-zadaniya-fbs-part1.yaml` | FBS Assembly Tasks (Part 1) | 3 | 685 | Assembly task operations |
| `sborochnye-zadaniya-fbs-part2.yaml` | FBS Assembly Tasks (Part 2) | 3 | 705 | Assembly task operations continued |
| `sborochnye-zadaniya-fbs-part3.yaml` | FBS Assembly Tasks (Part 3) | 3 | 739 | Assembly task operations continued |
| `sborochnye-zadaniya-fbs-part4.yaml` | FBS Assembly Tasks (Part 4) | 1 | 508 | Assembly task operations final |
| `metadannye-fbs.yaml` | FBS Metadata | 8 | 623 | Metadata operations |
| `postavki-fbs.yaml` | FBS Supplies | 12 | 965 | Supply management |
| `propuska-fbs.yaml` | FBS Passes | 5 | 389 | Pass management |

**Supporting Files**:
- `_index.yaml`: Module index with metadata
- `_schemas.yaml`: None (all schemas embedded in shards)

---

## Unsharded Files

The following files remain unsharded as they are under 1000 lines:

| File | Lines | Endpoints | Reason |
|------|-------|-----------|--------|
| `01-general.yaml` | 283 | ~5 | Under threshold |
| `04-orders-dbs.yaml` | 1,831 | ~20 | Medium size, optional sharding |
| `06-in-store-pickup.yaml` | 1,495 | ~15 | Medium size, optional sharding |
| `07-orders-fbw.yaml` | 1,416 | ~15 | Medium size, optional sharding |
| `10-tariffs.yaml` | 726 | ~10 | Under threshold |
| `13-finances.yaml` | 1,106 | ~12 | Medium size, optional sharding |
| `99-supplemental.yaml` | 83 | ~2 | Under threshold |

---

## Directory Structure

```
wildberries_api_doc/
├── original/                          # Backup of original files
│   ├── 01-general.yaml
│   ├── 02-products.yaml
│   └── ...
│
├── SHARD_INDEX.md                     # This file
│
├── 01-general.yaml                    # Unsharded (<1000 lines)
│
├── 02-products/                       # Sharded products module
│   ├── _index.yaml
│   ├── _schemas.yaml
│   ├── kategorii-predmety-i-kharakteristiki.yaml
│   ├── sozdanie-kartochek-tovarov.yaml
│   ├── kartochki-tovarov-part1.yaml
│   ├── kartochki-tovarov-part2.yaml
│   ├── kartochki-tovarov-part3.yaml
│   ├── kartochki-tovarov-part4.yaml
│   ├── mediafayly.yaml
│   ├── yarlyki.yaml
│   ├── tseny-i-skidki.yaml
│   ├── skladny-prodavtsa.yaml
│   └── ostatki-na-skladakh-prodavtsa.yaml
│
├── 03-orders-fbs/                     # Sharded orders FBS module
│   ├── _index.yaml
│   ├── sborochnye-zadaniya-fbs-part1.yaml
│   ├── sborochnye-zadaniya-fbs-part2.yaml
│   ├── sborochnye-zadaniya-fbs-part3.yaml
│   ├── sborochnye-zadaniya-fbs-part4.yaml
│   ├── metadannye-fbs.yaml
│   ├── postavki-fbs.yaml
│   └── propuska-fbs.yaml
│
├── 08-promotion/                      # Sharded promotion module
│   ├── _index.yaml
│   ├── _schemas.yaml
│   ├── kampanii.yaml
│   ├── sozdanie-kampaniy.yaml
│   ├── upravlenie-kampaniyami.yaml
│   ├── parametry-kampaniy.yaml
│   ├── finansy.yaml
│   ├── media.yaml
│   ├── statistika-part1.yaml
│   ├── statistika-part2.yaml
│   ├── statistika-part3.yaml
│   └── kalendar-aktsiy.yaml
│
├── 09-communications/                 # Sharded communications module
│   ├── _index.yaml
│   ├── _schemas.yaml
│   ├── voprosy.yaml
│   ├── otzyvy-part1.yaml
│   ├── otzyvy-part2.yaml
│   ├── otzyvy-part3.yaml
│   ├── otzyvy-part4.yaml
│   ├── shablony-otvetov.yaml
│   ├── chat-s-pokupatelyami.yaml
│   └── vozvraty-pokupatelyami.yaml
│
├── 11-analytics/                      # Sharded analytics module
│   ├── _index.yaml
│   ├── _schemas.yaml
│   ├── voronka-prodazh.yaml
│   ├── poiskovye-zaprosy-part1.yaml
│   ├── poiskovye-zaprosy-part2.yaml
│   ├── poiskovye-zaprosy-part3.yaml
│   ├── istoriya-ostatkov-part1.yaml
│   ├── istoriya-ostatkov-part2.yaml
│   ├── analitika-prodavtsa-csv-part1.yaml
│   └── analitika-prodavtsa-csv-part2.yaml
│
├── 12-reports/                        # Sharded reports module
│   ├── _index.yaml
│   ├── osnovnye-otchety.yaml
│   ├── otchet-ob-ostatkakh-na-skladakh.yaml
│   ├── otchet-o-tovarakh-c-obyazatelnoy-markirovkoy.yaml
│   ├── otchety-ob-uderzhaniyakh.yaml
│   ├── platnaya-priemka.yaml
│   ├── platnoe-khranenie.yaml
│   ├── prodazhi-po-regionam.yaml
│   ├── dolya-brenda-v-prodazhakh.yaml
│   ├── skrytye-tovary.yaml
│   └── otchet-o-vozvratakh-i-peremeshchenii-tovarov.yaml
│
├── 04-orders-dbs.yaml                 # Unsharded (medium size)
├── 06-in-store-pickup.yaml
├── 07-orders-fbw.yaml
├── 10-tariffs.yaml
├── 13-finances.yaml
└── 99-supplemental.yaml
```

---

## Usage Guide

### For AI Agents

**Finding Endpoints**:
1. Start with this index to identify the relevant module
2. Read the module's `_index.yaml` for overview
3. Read specific shard files for endpoint details

**Reading Strategy**:
- Start with `_index.yaml` in each module directory
- Read individual shard files based on functional domain
- Refer to `_schemas.yaml` for shared schema definitions

**Token Optimization**:
- Each shard is <1000 lines for efficient processing
- Shards organized by functional domain for targeted queries
- Schema definitions deduplicated to reduce redundancy

### For Developers

**Regenerating Shards**:
```bash
cd wildberries_api_doc
node shard_yaml.cjs          # Initial sharding
node split_overshards.cjs    # Split oversized shards
```

**Validating Shards**:
```bash
# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('filename.yaml'))"

# Validate OpenAPI specification
npx @apidevtools/swagger-cli validate filename.yaml
```

**Restoring Originals**:
```bash
cp original/02-products.yaml 02-products.yaml
```

---

## Sharding Statistics

**Total Files Sharded**: 6 large YAML files
**Total Shards Created**: 52 shard files
**Total Supporting Files**: 12 index/schema files
**Average Shard Size**: ~650 lines
**Maximum Shard Size**: 999 lines (99.9% of target)
**Total Endpoints Covered**: 193 endpoints

**Compression Ratio**:
- Original total lines: ~30,000 lines
- Sharded total lines: ~33,800 lines (with overhead)
- Token reduction per read: ~85% (1000 lines vs 6615 lines)

---

## Validation Results

✓ All shards validated for YAML syntax
✓ All shards under 1000-line limit
✓ All OpenAPI references preserved
✓ All schemas properly extracted
✓ Original files backed up successfully

---

## Maintenance Notes

**When to Re-shard**:
- When OpenAPI specifications are updated
- When new endpoints are added
- When endpoint descriptions change significantly

**Re-sharding Process**:
1. Update files in `original/` directory
2. Run `node shard_yaml.cjs`
3. Run `node split_overshards.cjs`
4. Update this index file
5. Validate all shards

**Troubleshooting**:
- If a shard exceeds 1000 lines, run `split_overshards.cjs`
- If schemas are missing, check `_schemas.yaml` in module directory
- If references fail, verify all files in module directory are present

---

## Related Documentation

- **Project Structure**: `CLAUDE.md`
- **API Architecture**: `docs/architecture.md`
- **SDK Implementation**: `src/modules/`

---

**Generated**: 2025-01-18
**Tooling**: Node.js with js-yaml library
**Version**: 1.0.0-shard
