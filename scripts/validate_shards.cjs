#!/usr/bin/env node
/**
 * validate_shards.cjs
 *
 * Validates that all shard YAML files declared in _index.yaml manifests
 * exist on disk and that their declared endpoint counts are plausible
 * (shard file is non-empty and parses as valid YAML).
 *
 * Exits with code 0 when all shards pass, code 1 when any fail.
 * Reports a "N/N clean" summary line to stdout.
 *
 * Usage:
 *   node scripts/validate_shards.cjs
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DOCS_ROOT = path.resolve(__dirname, '../wildberries_api_doc');

/**
 * Walk the docs root for all _index.yaml manifests and return their paths.
 * @returns {string[]}
 */
function findIndexFiles() {
  const results = [];
  const entries = fs.readdirSync(DOCS_ROOT, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = path.join(DOCS_ROOT, entry.name, '_index.yaml');
      if (fs.existsSync(indexPath)) {
        results.push(indexPath);
      }
    }
  }
  return results.sort();
}

/**
 * Validate a single shard entry from an _index.yaml manifest.
 *
 * @param {string} shardDir - Directory containing the shard file
 * @param {{ file: string, domain: string, endpoints: number }} shard
 * @param {string[]} errors - Accumulator for error messages
 * @returns {boolean} true if valid
 */
function validateShard(shardDir, shard, errors) {
  const shardPath = path.join(shardDir, shard.file);

  // 1. File must exist
  if (!fs.existsSync(shardPath)) {
    errors.push(`  MISSING: ${shardPath}`);
    return false;
  }

  // 2. File must be non-empty
  const stat = fs.statSync(shardPath);
  if (stat.size === 0) {
    errors.push(`  EMPTY: ${shardPath}`);
    return false;
  }

  // 3. File must parse as valid YAML
  try {
    const content = fs.readFileSync(shardPath, 'utf8');
    yaml.load(content);
  } catch (/** @type {any} */ e) {
    errors.push(`  YAML PARSE ERROR in ${shardPath}: ${String(e.message ?? e)}`);
    return false;
  }

  // 4. Declared endpoint count must be a positive integer
  if (typeof shard.endpoints !== 'number' || shard.endpoints < 1) {
    errors.push(`  BAD ENDPOINT COUNT in ${shardPath}: endpoints=${String(shard.endpoints)}`);
    return false;
  }

  return true;
}

function main() {
  const indexFiles = findIndexFiles();
  if (indexFiles.length === 0) {
    console.error('ERROR: No _index.yaml files found under', DOCS_ROOT);
    process.exit(1);
  }

  let total = 0;
  let passed = 0;
  const allErrors = [];

  for (const indexPath of indexFiles) {
    let manifest;
    try {
      const raw = fs.readFileSync(indexPath, 'utf8');
      manifest = /** @type {any} */ (yaml.load(raw));
    } catch (/** @type {any} */ e) {
      allErrors.push(`YAML PARSE ERROR in ${indexPath}: ${String(e.message ?? e)}`);
      continue;
    }

    const shards = Array.isArray(manifest._shards) ? manifest._shards : [];
    const shardDir = path.dirname(indexPath);
    const moduleName = String(manifest._module ?? path.basename(shardDir));

    for (const rawShard of shards) {
      // Normalize: some modules use { file, endpoints } others use { _file, _endpoints }
      const shard = rawShard && typeof rawShard === 'object'
        ? {
            file: rawShard.file ?? rawShard._file,
            endpoints: rawShard.endpoints ?? rawShard._endpoints,
          }
        : rawShard;

      // Skip entries that lack a file property (malformed manifest entries)
      if (!shard || typeof shard.file !== 'string') {
        allErrors.push(`[${moduleName}] malformed shard entry (missing "file" or "_file" property): ${JSON.stringify(rawShard)}`);
        total++;
        continue;
      }
      total++;
      const errors = [];
      const ok = validateShard(shardDir, shard, errors);
      if (ok) {
        passed++;
      } else {
        allErrors.push(`[${moduleName}] ${shard.file}:`);
        allErrors.push(...errors);
      }
    }
  }

  if (allErrors.length > 0) {
    console.error('Shard validation FAILED:');
    for (const line of allErrors) {
      console.error(line);
    }
    console.log(`\n${passed.toString()}/${total.toString()} clean`);
    process.exit(1);
  } else {
    console.log(`${total.toString()}/${total.toString()} clean`);
    process.exit(0);
  }
}

main();
