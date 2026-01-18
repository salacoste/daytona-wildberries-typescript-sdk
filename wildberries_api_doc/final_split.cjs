#!/usr/bin/env node
/**
 * Final split for remaining oversized shards - split by single endpoint
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const OVERSIZE_THRESHOLD = 1000;

class FinalSplitter {
    constructor(baseDir) {
        this.baseDir = path.resolve(baseDir);
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

    splitSingleEndpoint(shardPath) {
        console.log(`\nSplitting single-endpoint shard: ${path.basename(shardPath)}`);

        const spec = this.loadYaml(shardPath);
        const paths = spec.paths || {};
        const endpoints = [];

        // Collect all endpoints
        for (const [path, pathSpec] of Object.entries(paths)) {
            for (const [method, methodSpec] of Object.entries(pathSpec)) {
                if (['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
                    endpoints.push({
                        path,
                        method,
                        spec: methodSpec,
                        servers: pathSpec.servers || spec.servers || []
                    });
                }
            }
        }

        const moduleDir = path.dirname(shardPath);
        const baseName = path.basename(shardPath, '.yaml');
        const chunkFiles = [];

        // Split into single-endpoint shards
        endpoints.forEach((endpoint, index) => {
            const chunkSpec = {
                openapi: spec.openapi,
                info: {
                    ...spec.info,
                    title: `${spec.info.title} (Endpoint ${index + 1}/${endpoints.length})`
                },
                servers: spec.servers,
                tags: spec.tags,
                paths: {},
                components: spec.components || {}
            };

            // Add single endpoint
            chunkSpec.paths[endpoint.path] = {};
            chunkSpec.paths[endpoint.path][endpoint.method] = endpoint.spec;

            const chunkFile = path.join(moduleDir, `${baseName}-ep${index + 1}.yaml`);
            this.saveYaml(chunkSpec, chunkFile);

            const lineCount = this.countLines(chunkFile);
            console.log(`  → Endpoint ${index + 1}: ${lineCount} lines`);
            chunkFiles.push(chunkFile);
        });

        // Remove original oversized shard
        fs.unlinkSync(shardPath);
        console.log(`✓ Removed original: ${path.basename(shardPath)}`);

        return chunkFiles;
    }

    processModule(moduleName) {
        const moduleDir = path.join(this.baseDir, moduleName);
        const files = fs.readdirSync(moduleDir).filter(f => f.endsWith('.yaml') && !f.startsWith('_'));

        const oversized = [];

        for (const file of files) {
            const filepath = path.join(moduleDir, file);
            const lineCount = this.countLines(filepath);

            if (lineCount > OVERSIZE_THRESHOLD) {
                oversized.push(filepath);
            }
        }

        if (oversized.length > 0) {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`Processing module: ${moduleName}`);
            console.log(`Found ${oversized.length} oversized shard(s)`);
            console.log(`${'='.repeat(60)}`);

            oversized.forEach(filepath => {
                this.splitSingleEndpoint(filepath);
            });

            return true;
        }

        return false;
    }
}

// Main execution
function main() {
    const baseDir = '/Users/r2d2/Documents/Code_Projects/wb_daytona_sdk/wildberries_api_doc';
    const splitter = new FinalSplitter(baseDir);

    const modules = [
        '08-promotion',
        '11-analytics'
    ];

    let totalSplit = 0;

    for (const module of modules) {
        const moduleDir = path.join(baseDir, module);
        if (fs.existsSync(moduleDir)) {
            const split = splitter.processModule(module);
            if (split) totalSplit++;
        }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('FINAL SPLIT SUMMARY');
    console.log(`${'='.repeat(60)}`);
    console.log(`✓ Processed ${totalSplit} module(s) with oversized shards`);

    // Final verification
    console.log('\nFinal verification:');
    let allValid = true;

    for (const module of modules) {
        const moduleDir = path.join(baseDir, module);
        if (!fs.existsSync(moduleDir)) continue;

        const files = fs.readdirSync(moduleDir).filter(f => f.endsWith('.yaml') && !f.startsWith('_'));
        const oversized = [];

        for (const file of files) {
            const filepath = path.join(moduleDir, file);
            const lineCount = splitter.countLines(filepath);

            if (lineCount > OVERSIZE_THRESHOLD) {
                oversized.push({ file, lineCount });
            }
        }

        if (oversized.length > 0) {
            console.log(`⚠ ${module}: Still has ${oversized.length} oversized shard(s):`);
            oversized.forEach(({ file, lineCount }) => {
                console.log(`  - ${file}: ${lineCount} lines`);
            });
            allValid = false;
        } else {
            console.log(`✓ ${module}: All shards within limit`);
        }
    }

    if (allValid) {
        console.log('\n✓ All shards successfully validated and under 1000 lines!');
    }
}

if (require.main === module) {
    main();
}

module.exports = FinalSplitter;
