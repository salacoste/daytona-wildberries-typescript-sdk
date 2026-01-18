#!/usr/bin/env node
/**
 * API Documentation Sharding Script
 * Shards large OpenAPI YAML files into smaller, domain-organized modules.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

class YAMLSharder {
    constructor(baseDir) {
        this.baseDir = path.resolve(baseDir);
        this.originalDir = path.join(this.baseDir, 'original');

        // Create backup directory
        if (!fs.existsSync(this.originalDir)) {
            fs.mkdirSync(this.originalDir, { recursive: true });
        }
    }

    backupOriginal(filename) {
        const src = path.join(this.baseDir, filename);
        const dst = path.join(this.originalDir, filename);

        if (!fs.existsSync(dst)) {
            fs.copyFileSync(src, dst);
            console.log(`✓ Backed up: ${filename}`);
        }
        return dst;
    }

    loadYaml(filepath) {
        const content = fs.readFileSync(filepath, 'utf8');
        return yaml.load(content);
    }

    saveYaml(data, filepath) {
        const content = yaml.dump(data, {
            lineWidth: -1,
            noRefs: true,
            sortKeys: false,
            indent: 2
        });
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✓ Created: ${path.relative(this.baseDir, filepath)}`);
    }

    countLines(filepath) {
        const content = fs.readFileSync(filepath, 'utf8');
        return content.split('\n').length;
    }

    groupEndpointsByTag(spec) {
        const tagsMap = new Map();

        const paths = spec.paths || {};
        for (const [path, pathSpec] of Object.entries(paths)) {
            for (const [method, methodSpec] of Object.entries(pathSpec)) {
                if (['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
                    const tags = methodSpec.tags || [];
                    if (tags.length > 0) {
                        const primaryTag = tags[0];
                        if (!tagsMap.has(primaryTag)) {
                            tagsMap.set(primaryTag, []);
                        }

                        tagsMap.get(primaryTag).push({
                            path,
                            method,
                            spec: methodSpec,
                            servers: pathSpec.servers || spec.servers || []
                        });
                    }
                }
            }
        }

        return tagsMap;
    }

    extractSchemasForEndpoints(endpoints, allSchemas) {
        const referencedSchemas = {};
        const visited = new Set();

        const extractRefs = (obj, depth = 0) => {
            if (depth > 20) return; // Prevent infinite recursion

            if (typeof obj === 'object' && obj !== null) {
                if (Array.isArray(obj)) {
                    obj.forEach(item => extractRefs(item, depth + 1));
                } else {
                    if ('$ref' in obj) {
                        const ref = obj.$ref;
                        if (ref.startsWith('#/components/schemas/')) {
                            const schemaName = ref.split('/').pop();
                            if (!visited.has(schemaName) && allSchemas[schemaName]) {
                                visited.add(schemaName);
                                referencedSchemas[schemaName] = allSchemas[schemaName];
                                // Recursively find nested refs
                                extractRefs(allSchemas[schemaName], depth + 1);
                            }
                        }
                    }
                    for (const value of Object.values(obj)) {
                        extractRefs(value, depth + 1);
                    }
                }
            }
        };

        endpoints.forEach(endpoint => {
            extractRefs(endpoint.spec);
        });

        return referencedSchemas;
    }

    sanitizeFilename(name) {
        // Transliterate Cyrillic to Latin
        const translitMap = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
            'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
            'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
            'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
            'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };

        return name.toLowerCase()
            .split('')
            .map(char => translitMap[char] || char)
            .join('')
            .replace(/[^\w\s\-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
            .trim();
    }

    createShard(moduleName, domainName, endpoints, baseSpec, schemas, shardDir) {
        // Build shard specification
        const shardSpec = {
            openapi: baseSpec.openapi || '3.0.1',
            info: {
                title: `${moduleName} - ${domainName}`,
                description: 'Extracted from original file for agent processing',
                version: '1.0.0-shard'
            },
            servers: endpoints[0]?.servers || baseSpec.servers || [],
            tags: [{
                name: domainName,
                description: `${domainName} endpoints`
            }],
            paths: {},
            components: {}
        };

        // Add endpoints
        endpoints.forEach(endpoint => {
            const { path, method, spec } = endpoint;

            if (!shardSpec.paths[path]) {
                shardSpec.paths[path] = {};
            }

            shardSpec.paths[path][method] = spec;
        });

        // Add schemas
        if (Object.keys(schemas).length > 0) {
            shardSpec.components.schemas = schemas;
        }

        // Generate filename
        const safeName = this.sanitizeFilename(domainName);
        const shardFile = path.join(shardDir, `${safeName}.yaml`);

        this.saveYaml(shardSpec, shardFile);
        return shardFile;
    }

    createIndex(moduleName, shards, baseSpec, indexDir, originalFile) {
        const indexData = {
            _module: moduleName,
            _description: baseSpec.info?.description || '',
            _original_file: originalFile,
            _base_url: baseSpec.servers?.[0]?.url || 'N/A',
            _shards: shards,
            _shared_schemas: '_schemas.yaml',
            _total_endpoints: shards.reduce((sum, s) => sum + s.endpoints, 0)
        };

        const indexFile = path.join(indexDir, '_index.yaml');
        this.saveYaml(indexData, indexFile);
        return indexFile;
    }

    shardFile(filename, shardDomains) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`Sharding: ${filename}`);
        console.log(`${'='.repeat(60)}`);

        // Backup original
        this.backupOriginal(filename);

        // Load original spec
        const filepath = path.join(this.baseDir, filename);
        const spec = this.loadYaml(filepath);

        // Create module directory
        const moduleName = filename.replace('.yaml', '');
        const moduleDir = path.join(this.baseDir, moduleName);

        if (!fs.existsSync(moduleDir)) {
            fs.mkdirSync(moduleDir, { recursive: true });
        }

        // Group endpoints by tag
        const tagsMap = this.groupEndpointsByTag(spec);

        // Extract all schemas
        const allSchemas = spec.components?.schemas || {};

        // Create shards for each domain
        const shardsInfo = [];
        const shardFiles = [];

        for (const [domainName, domainEn] of Object.entries(shardDomains)) {
            if (!tagsMap.has(domainName)) {
                console.log(`⚠ Warning: Domain '${domainName}' not found in tags`);
                continue;
            }

            const endpoints = tagsMap.get(domainName);
            const schemas = this.extractSchemasForEndpoints(endpoints, allSchemas);

            const shardFile = this.createShard(
                moduleName,
                domainName,
                endpoints,
                spec,
                schemas,
                moduleDir
            );

            const lineCount = this.countLines(shardFile);
            console.log(`  → ${domainName}: ${endpoints.length} endpoints, ${lineCount} lines`);

            shardsInfo.push({
                file: path.basename(shardFile),
                domain: domainName,
                endpoints: endpoints.length,
                description: domainEn
            });
            shardFiles.push(shardFile);
        }

        // Create shared schemas file (schemas not referenced by any endpoint)
        const allReferencedSchemas = new Set();
        for (const [tag, endpoints] of tagsMap.entries()) {
            const schemas = this.extractSchemasForEndpoints(endpoints, allSchemas);
            Object.keys(schemas).forEach(name => allReferencedSchemas.add(name));
        }

        const sharedSchemas = {};
        for (const [name, schema] of Object.entries(allSchemas)) {
            if (!allReferencedSchemas.has(name)) {
                sharedSchemas[name] = schema;
            }
        }

        if (Object.keys(sharedSchemas).length > 0) {
            const schemasFile = path.join(moduleDir, '_schemas.yaml');
            this.saveYaml({ components: { schemas: sharedSchemas } }, schemasFile);
            const lineCount = this.countLines(schemasFile);
            console.log(`✓ Created: ${path.relative(this.baseDir, schemasFile)} (${Object.keys(sharedSchemas).length} schemas, ${lineCount} lines)`);
        }

        // Create index file
        this.createIndex(moduleName, shardsInfo, spec, moduleDir, filename);
        console.log(`\n✓ Total: ${shardsInfo.reduce((sum, s) => sum + s.endpoints, 0)} endpoints across ${shardsInfo.length} shards`);

        // Validate shard sizes
        const oversized = shardFiles.filter(sf => this.countLines(sf) > 1000);
        if (oversized.length > 0) {
            console.log(`\n⚠ Warning: ${oversized.length} shards exceed 1000 lines:`);
            oversized.forEach(sf => {
                console.log(`  - ${path.basename(sf)}: ${this.countLines(sf)} lines`);
            });
            return false;
        }

        return true;
    }
}

// Main execution
function main() {
    const baseDir = '/Users/r2d2/Documents/Code_Projects/wb_daytona_sdk/wildberries_api_doc';
    const sharder = new YAMLSharder(baseDir);

    // Define sharding configuration for each large file
    const shardingConfig = {
        '02-products.yaml': {
            'Категории, предметы и характеристики': 'Categories and Characteristics',
            'Создание карточек товаров': 'Product Card Creation',
            'Карточки товаров': 'Product Cards',
            'Медиафайлы': 'Media Files',
            'Ярлыки': 'Labels',
            'Цены и скидки': 'Prices and Discounts',
            'Склады продавца': 'Seller Warehouses',
            'Остатки на складах продавца': 'Warehouse Stock'
        },
        '08-promotion.yaml': {
            'Кампании': 'Campaigns',
            'Создание кампаний': 'Campaign Creation',
            'Управление кампаниями': 'Campaign Management',
            'Параметры кампаний': 'Campaign Parameters',
            'Финансы': 'Finances',
            'Медиа': 'Media',
            'Статистика': 'Statistics',
            'Календарь акций': 'Promotion Calendar'
        },
        '11-analytics.yaml': {
            'Воронка продаж': 'Sales Funnel',
            'Поисковые запросы': 'Search Queries',
            'История остатков': 'Stock History',
            'Аналитика продавца CSV': 'Seller Analytics CSV'
        },
        '09-communications.yaml': {
            'Вопросы': 'Questions',
            'Отзывы': 'Reviews',
            'Шаблоны ответов': 'Response Templates',
            'Чат с покупателями': 'Customer Chat',
            'Возвраты покупателями': 'Customer Returns'
        },
        '12-reports.yaml': {
            'Основные отчёты': 'Main Reports',
            'Отчёт об остатках на складах': 'Warehouse Stock Reports',
            'Отчёт о товарах c обязательной маркировкой': 'Marked Goods Reports',
            'Отчёты об удержаниях': 'Deduction Reports',
            'Платная приёмка': 'Paid Receiving',
            'Платное хранение': 'Paid Storage',
            'Продажи по регионам': 'Regional Sales',
            'Доля бренда в продажах': 'Brand Share',
            'Скрытые товары': 'Hidden Items',
            'Отчёт о возвратах и перемещении товаров': 'Returns and Movement Reports'
        },
        '03-orders-fbs.yaml': {
            'Сборочные задания FBS': 'FBS Assembly Tasks',
            'Метаданные FBS': 'FBS Metadata',
            'Поставки FBS': 'FBS Supplies',
            'Пропуска FBS': 'FBS Passes'
        }
    };

    const results = {};

    for (const [filename, domains] of Object.entries(shardingConfig)) {
        try {
            const success = sharder.shardFile(filename, domains);
            results[filename] = success ? '✓ Success' : '⚠ Partial (oversized shards)';
        } catch (error) {
            console.error(`\n✗ Error sharding ${filename}:`, error.message);
            results[filename] = `✗ Failed: ${error.message}`;
        }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('SHARDING SUMMARY');
    console.log(`${'='.repeat(60)}`);
    for (const [filename, result] of Object.entries(results)) {
        console.log(`${filename}: ${result}`);
    }

    console.log(`\n✓ Original files backed up to: original/`);
    console.log(`✓ Sharded modules created in respective directories`);
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = YAMLSharder;
