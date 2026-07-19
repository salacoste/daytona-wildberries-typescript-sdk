#!/usr/bin/env node

/**
 * Link Validation Script
 *
 * Validates all markdown links in the project to ensure documentation integrity.
 * Uses markdown-link-check to verify internal and external links.
 *
 * Usage:
 *   npm run validate:links
 *
 * Exit codes:
 *   0 - All links valid
 *   1 - Broken links detected
 */

import { execFileSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

// Find all markdown files recursively
function findMarkdownFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);

    // Skip hidden directories, node_modules, and dist
    if (file.startsWith('.') || file === 'node_modules' || file === 'dist') {
      return;
    }

    if (statSync(filePath).isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Validate links in all markdown files
console.log('🔍 Finding markdown files...\n');
const markdownFiles = findMarkdownFiles('.');
console.log(`Found ${markdownFiles.length} markdown files\n`);
const markdownLinkCheckCli = resolve('node_modules/markdown-link-check/markdown-link-check');
const batchSize = 100;

let hasErrors = false;
let checkedFiles = 0;
let totalLinks = 0;
let brokenLinks = 0;

for (let index = 0; index < markdownFiles.length; index += batchSize) {
  const batch = markdownFiles.slice(index, index + batchSize);
  console.log(
    `Checking files ${String(index + 1)}-${String(index + batch.length)} of ${String(markdownFiles.length)}...`
  );
  try {
    const output = execFileSync(
      process.execPath,
      [markdownLinkCheckCli, ...batch, '--config', '.markdown-link-check.json'],
      {
        stdio: 'pipe',
        encoding: 'utf8',
      }
    );

    // Count links
    const linkMatches = output.match(/^\s*\[✓\]/gm) || [];
    const brokenMatches = output.match(/^\s*\[✖\].+→ Status:/gm) || [];

    totalLinks += linkMatches.length + brokenMatches.length;
    brokenLinks += brokenMatches.length;
    checkedFiles += batch.length;

    if (brokenMatches.length > 0) {
      console.log(output);
      hasErrors = true;
    }
  } catch (error) {
    // markdown-link-check exits non-zero when broken links are found.
    // The broken link output is in error.stdout, not the try block.
    // Bug fix (Sprint 9 task-100): count broken links from catch block too.
    if (error.stdout) {
      const catchBrokenMatches = error.stdout.match(/^\s*\[✖\].+→ Status:/gm) || [];
      const catchLinkMatches = error.stdout.match(/^\s*\[✓\]/gm) || [];
      brokenLinks += catchBrokenMatches.length;
      totalLinks += catchBrokenMatches.length + catchLinkMatches.length;
      if (catchBrokenMatches.length > 0) {
        hasErrors = true;
        console.error(error.stdout);
      }
    } else {
      hasErrors = true;
      console.warn(
        `⚠️  Warning: Could not check files ${String(index + 1)}-${String(index + batch.length)}`
      );
    }
    checkedFiles += batch.length;
  }
}

console.log('\n' + '='.repeat(60));
console.log('Link Validation Summary');
console.log('='.repeat(60));
console.log(`Files checked: ${checkedFiles}/${markdownFiles.length}`);
console.log(`Total links: ${totalLinks}`);
console.log(`Broken links: ${brokenLinks}`);

if (hasErrors && brokenLinks > 0) {
  console.log('\n❌ Link validation failed - broken links detected');
  console.log('\nTo fix broken links:');
  console.log('1. Check the output above for specific broken links');
  console.log('2. Update or remove broken links');
  console.log('3. Run "npm run validate:links" again');
  process.exit(1);
} else if (hasErrors) {
  console.log('\n❌ Link validation failed - some files could not be checked');
  process.exit(1);
} else {
  console.log('\n✅ All links valid!');
  process.exit(0);
}
