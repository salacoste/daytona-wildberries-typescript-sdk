#!/usr/bin/env node
/**
 * Validate all shard YAML files
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const modules = [
    '02-products',
    '03-orders-fbs',
    '04-orders-dbs',
    '07-orders-fbw',
    '08-promotion',
    '09-communications',
    '11-analytics',
    '12-reports'
];

let totalValid = 0;
let totalInvalid = 0;

console.log('Validating all shard YAML files...\n');

for (const module of modules) {
    const moduleDir = path.join(__dirname, module);

    if (!fs.existsSync(moduleDir)) {
        console.log(`⚠ Module not found: ${module}`);
        continue;
    }

    const files = fs.readdirSync(moduleDir).filter(f => f.endsWith('.yaml') && !f.startsWith('_'));

    console.log(`\n${module}:`);

    for (const file of files) {
        const filepath = path.join(moduleDir, file);

        try {
            const content = fs.readFileSync(filepath, 'utf8');
            yaml.load(content);
            console.log(`  ✓ ${file}`);
            totalValid++;
        } catch (error) {
            console.log(`  ✗ ${file}: ${error.message}`);
            totalInvalid++;
        }
    }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`VALIDATION SUMMARY`);
console.log(`${'='.repeat(60)}`);
console.log(`✓ Valid: ${totalValid} files`);
if (totalInvalid > 0) {
    console.log(`✗ Invalid: ${totalInvalid} files`);
    process.exit(1);
} else {
    console.log(`\n✓ All shards are valid YAML!`);
}
