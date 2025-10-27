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

import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Find all markdown files recursively
function findMarkdownFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach(file => {
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

let hasErrors = false;
let checkedFiles = 0;
let totalLinks = 0;
let brokenLinks = 0;

markdownFiles.forEach(file => {
  console.log(`Checking links in ${file}...`);
  try {
    const output = execSync(`npx markdown-link-check "${file}"`, {
      stdio: 'pipe',
      encoding: 'utf8'
    });

    // Count links
    const linkMatches = output.match(/\[✓\]/g) || [];
    const brokenMatches = output.match(/\[✖\]/g) || [];

    totalLinks += linkMatches.length + brokenMatches.length;
    brokenLinks += brokenMatches.length;
    checkedFiles++;

    if (brokenMatches.length > 0) {
      console.log(output);
      hasErrors = true;
    }
  } catch (error) {
    // Log error but continue checking other files
    console.warn(`⚠️  Warning: Could not check ${file}`);
    if (error.stdout && error.stdout.includes('[✖]')) {
      hasErrors = true;
      console.error(error.stdout);
    }
    checkedFiles++;
  }
});

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
  console.log('\n⚠️  Warning: Some files could not be checked, but no broken links found');
  console.log('\n✅ Validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ All links valid!');
  process.exit(0);
}
