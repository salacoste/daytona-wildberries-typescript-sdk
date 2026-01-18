#!/usr/bin/env tsx
/**
 * Troubleshooting Documentation Validator
 *
 * Validates code examples in troubleshooting.md against actual SDK implementation.
 * This prevents documentation drift and ensures all examples are accurate.
 *
 * Usage:
 *   npm run validate:examples
 *   tsx scripts/validate-doc-examples.ts
 *
 * Exit codes:
 *   0 - All validations passed
 *   1 - Validation errors found
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

interface ValidationError {
  line: number;
  type: 'method' | 'module' | 'property' | 'response' | 'await';
  message: string;
  suggestion?: string;
  codeSnippet?: string;
}

interface ValidationResult {
  file: string;
  totalExamples: number;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Known SDK modules from src/index.ts
 */
const VALID_MODULES = [
  'general',
  'products',
  'ordersFBS',
  'ordersFBW',
  'finances',
  'analytics',
  'communications',
  'reports',
  'promotion',
  'tariffs',
  'inStorePickup',
];

/**
 * Known SDK methods per module (extracted from actual implementation)
 * This is the source of truth for validation
 */
const VALID_METHODS: Record<string, string[]> = {
  general: ['ping', 'news', 'sellerInfo'],

  products: [
    'getParentAll',
    'getObjectAll',
    'getObjectCharc',
    'getDirectoryColors',
    'getDirectoryKinds',
    'getDirectoryCountries',
    'getDirectorySeasons',
    'getDirectoryVat',
    'getDirectoryTnved',
    'listProducts',
    'getAllProducts',
    'createCardsList',
    'createProduct',
    'updateProduct',
    'deleteProduct',
    'getProductCard',
    'uploadMediaFile',
    'uploadMediaByURLs',
    'getMediaList',
    'updatePricing',
    'getPricing',
    'getPricingTaskStatus',
    'getWBOffices',
    'getWarehouses',
    'createWarehouse',
    'updateWarehouse',
    'deleteWarehouse',
    'getStock',
    'updateStockLevels',
    'deleteStockRecords',
  ],

  ordersFBS: [
    'getPassesOffices',
    'passes',
    'createPass',
    'updatePass',
    'deletePass',
    'getOrdersNew',
    'orders',
    'createOrdersStatu',
    'getOrders',
    'getOrderStatuses',
    'getAssemblyTasks',
    'getAssemblyTask',
    'createSupply',
    'getSupplies',
    'getSupply',
    'addOrderToSupply',
    'deliverSupply',
    'deleteSupply',
    'getOrderStickers',
    'getSupplyBarcode',
    'cancelOrder',
  ],

  ordersFBW: [
    'getWarehouses',
    'getAcceptanceCoefficients',
    'getAcceptanceOptions',
    'getSupplyDetails',
  ],

  finances: [
    'getAccountBalance',
    'getBalance',
    'getTransactions',
    'getTransactionDetail',
    'getSupplierReportdetailbyperiod',
    'getDocumentCategories',
    'getDocumentsCategories',
    'getDocumentsList',
    'getDocuments',
    'getDocumentsDownload',
    'downloadDocument',
    'downloadDocuments',
    'getPayouts',
    'getPayoutDetail',
  ],

  analytics: [
    'getSalesFunnel',
    'createNmReportDetail',
    'createDetailHistory',
    'createGroupedHistory',
    'getNmReportDownloads',
    'createNmReportDownload',
    'createDownloadsRetry',
    'getSearchReport',
    'createSearchReportReport',
    'getStocksReport',
    'getStocksReportOffice',
    'getProductPerformance',
    'getProductStatistics',
    'getHistoricalStatistics',
    'getSearchQueries',
    'getCategoryPerformance',
    'getStockHistory',
    'generateCSVReport',
    'getCSVReportStatus',
    'downloadCSVReport',
  ],

  communications: [
    'getChats',
    'getEvents',
    'sendMessage',
    'getQuestions',
    'answerQuestion',
    'markQuestionViewed',
    'getReviews',
    'respondToReview',
    'editReviewResponse',
  ],

  reports: [
    'getIncomes',
    'getStocks',
    'getOrders',
    'getSales',
    'createWarehouseRemainsReport',
    'checkReportStatus',
    'downloadReport',
  ],

  promotion: [
    'getPromotionCount',
    'createSeacatSaveAd',
    'getPromotionInfo',
    'pauseCampaign',
    'resumeCampaign',
    'updateBids',
  ],

  tariffs: [
    'getTariffsCommission',
    'getTariffsBox',
    'getTariffsPallet',
    'getTariffsReturn',
  ],

  inStorePickup: [
    'getNewOrders',
    'getOrders',
    'getOrderStatuses',
    'getOrderClientInfo',
    'verifyCustomerIdentity',
    'confirmOrder',
    'prepareOrder',
    'receiveOrder',
    'rejectOrder',
    'setSGTINCode',
    'setUINCode',
    'setIMEICode',
    'setGTINCode',
    'getOrderMetadata',
  ],
};

/**
 * Methods that are intentionally shown as wrong examples or are placeholder methods not yet implemented
 * These are educational examples demonstrating common mistakes or future API methods
 */
const KNOWN_WRONG_EXAMPLES = [
  'sdk.products.list(',
  'sdk.orders.list(',
  'sdk.products.getCategories(',
  'sdk.products.create(',
  'sdk.products.createBatch(',
  'sdk.general.getQuotaStatus(',
  'sdk.products.creatProduct(',        // Intentional typo example
  'sdk.products.archiveProduct(',      // Non-existent method example

  // Placeholder methods - not yet implemented in SDK
  'sdk.finances.generateReport(',
  'sdk.finances.getReport(',
  'sdk.finances.downloadReport(',
  'sdk.analytics.getProductHistory(',
  'sdk.analytics.generateReport(',
  'sdk.analytics.getReport(',
  'sdk.analytics.downloadReport(',
  'sdk.analytics.exportAnalyticsCSV(',
  'sdk.reports.getExciseReport(',
  'sdk.ordersFBW.getTransitTariffs(',
  'sdk.ordersFBW.getSupplies(',
  'sdk.ordersFBW.getSupplyGoods(',
  'sdk.ordersFBW.getSupplyPackage(',
  'sdk.inStorePickup.getCustomerInfo(',
  'sdk.inStorePickup.deleteOrderMetadata(',
  'sdk.inStorePickup.cancelOrder(',
  'sdk.promotion.getAdvConfig(',
  'sdk.promotion.createAdvSaveAd(',
  'sdk.promotion.createAdvFullstats(',
  'sdk.promotion.getAdvBudget(',
  'sdk.promotion.createBudgetDeposit(',
  'sdk.promotion.getAdvPause(',
  'sdk.promotion.getAdvStart(',
];

/**
 * Extract TypeScript code blocks from markdown
 */
function extractCodeBlocks(markdown: string): Array<{ code: string; line: number }> {
  const codeBlocks: Array<{ code: string; line: number }> = [];
  const lines = markdown.split('\n');
  let inCodeBlock = false;
  let isTypeScriptBlock = false;
  let currentBlock: string[] = [];
  let blockStartLine = 0;

  lines.forEach((line, index) => {
    if (line.trim().startsWith('```typescript')) {
      inCodeBlock = true;
      isTypeScriptBlock = true;
      blockStartLine = index + 1;
      currentBlock = [];
    } else if (line.trim().startsWith('```') && inCodeBlock && isTypeScriptBlock) {
      inCodeBlock = false;
      isTypeScriptBlock = false;
      if (currentBlock.length > 0) {
        codeBlocks.push({
          code: currentBlock.join('\n'),
          line: blockStartLine,
        });
      }
    } else if (inCodeBlock && isTypeScriptBlock) {
      currentBlock.push(line);
    }
  });

  return codeBlocks;
}

/**
 * Check if a code snippet is a known wrong example
 */
function isKnownWrongExample(code: string): boolean {
  return KNOWN_WRONG_EXAMPLES.some((wrongExample) => code.includes(wrongExample));
}

/**
 * Validate response structure usage in code
 * All SDK methods return Promise<{ data?, error?, errorText?, additionalErrors? }>
 */
function validateResponseStructure(
  code: string,
  lineOffset: number
): { errors: ValidationError[]; warnings: ValidationError[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const lines = code.split('\n');

  // Skip validation for known wrong examples
  if (isKnownWrongExample(code)) {
    return { errors, warnings };
  }

  // For blocks with "✅ CORRECT" and "❌ WRONG" markers, we need special handling
  // These blocks show both correct and incorrect examples for educational purposes
  // We should only skip validation for lines that are explicitly marked as WRONG
  const hasCorrectWrongMarkers = code.includes('✅ CORRECT') && code.includes('❌ WRONG');

  if (hasCorrectWrongMarkers) {
    // Split by the markers and only validate the CORRECT section
    const lines = code.split('\n');
    const correctSectionStart = lines.findIndex(line => line.includes('✅ CORRECT'));
    const wrongSectionStart = lines.findIndex(line => line.includes('❌ WRONG'));

    // If we can clearly separate the sections, only validate the correct part
    if (correctSectionStart >= 0 && wrongSectionStart >= 0 && correctSectionStart < wrongSectionStart) {
      // Extract only the CORRECT section for validation
      const correctSection = lines.slice(correctSectionStart, wrongSectionStart).join('\n');
      code = correctSection;
    }
  }

  // Pattern 1: Await validation - SDK calls should be awaited
  const unawaited = /(?<!await\s)sdk\.\w+\.\w+\(/g;
  const lines_array = code.split('\n');

  lines_array.forEach((line, index) => {
    // Skip if line has await before sdk call
    if (line.includes('await') && line.includes('sdk.')) return;

    // Skip comment lines
    if (line.trim().startsWith('//')) return;

    // Check for unwaited SDK calls
    const match = line.match(/(?<!await\s)sdk\.\w+\.\w+\(/);
    if (match && !line.includes('await')) {
      // Check if this is actually a problematic pattern
      const trimmed = line.trim();

      // Allow patterns like:
      // - sdk.method().then() - explicit promise handling
      // - => sdk.method() - arrow function returning promise (for .map(), .forEach(), etc.)
      // - .map(... sdk.method() - array operations creating promise arrays
      const isAllowedPattern =
        trimmed.includes('.then(') ||
        trimmed.includes('=>') ||
        lines_array[index - 1]?.includes('.map(') ||
        lines_array[index - 1]?.includes('.forEach(') ||
        lines_array[index - 1]?.includes('.filter(');

      if (!isAllowedPattern) {
        warnings.push({
          line: lineOffset + index,
          type: 'await',
          message: 'SDK method call should be awaited',
          suggestion: `Add 'await' before SDK call: await ${match[0]}`,
          codeSnippet: line.trim()
        });
      }
    }
  });

  // Pattern 2: Response property access - should use .data for actual response data
  const responseAccessPattern = /(const|let|var)\s+(\w+)\s*=\s*await\s+sdk\.\w+\.\w+\([^)]*\);?\s*$/gm;
  let match;

  while ((match = responseAccessPattern.exec(code)) !== null) {
    const varName = match[2];
    const matchIndex = match.index;

    // Find line number
    let currentPos = 0;
    let lineNum = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1;
      if (currentPos + lineLength > matchIndex) {
        lineNum = i;
        break;
      }
      currentPos += lineLength;
    }

    // Check if .data is accessed in subsequent lines (basic check)
    const subsequentCode = lines.slice(lineNum + 1, lineNum + 10).join('\n');

    // Look for direct property access without .data
    const directAccessPattern = new RegExp(`${varName}\\.(\\w+)`, 'g');
    const directAccessMatch = directAccessPattern.exec(subsequentCode);

    if (directAccessMatch && directAccessMatch[1] !== 'data' &&
        directAccessMatch[1] !== 'error' && directAccessMatch[1] !== 'errorText' &&
        !subsequentCode.includes(`${varName}.data`)) {
      warnings.push({
        line: lineOffset + lineNum,
        type: 'response',
        message: `Response property access should use .data: ${varName}.${directAccessMatch[1]}`,
        suggestion: `SDK responses have structure { data, error, errorText }. Use: ${varName}.data.${directAccessMatch[1]}`,
        codeSnippet: lines[lineNum].trim()
      });
    }
  }

  return { errors, warnings };
}

/**
 * Validate SDK method calls in code
 */
function validateSDKCalls(
  code: string,
  lineOffset: number
): { errors: ValidationError[]; warnings: ValidationError[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Skip validation for known wrong examples
  if (isKnownWrongExample(code)) {
    return { errors, warnings };
  }

  // Pattern: sdk.module.method(
  const sdkCallPattern = /sdk\.(\w+)\.(\w+)\(/g;
  const lines = code.split('\n');

  let match;
  while ((match = sdkCallPattern.exec(code)) !== null) {
    const [fullMatch, moduleName, methodName] = match;
    const matchIndex = match.index;

    // Find line number within code block
    let currentPos = 0;
    let lineNum = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 for newline
      if (currentPos + lineLength > matchIndex) {
        lineNum = i;
        break;
      }
      currentPos += lineLength;
    }

    const absoluteLine = lineOffset + lineNum;
    const codeLine = lines[lineNum]?.trim() || fullMatch;

    // Validate module name
    if (!VALID_MODULES.includes(moduleName)) {
      // Check if it's a common typo
      const suggestions = VALID_MODULES.filter((m) =>
        m.toLowerCase().includes(moduleName.toLowerCase())
      );

      errors.push({
        line: absoluteLine,
        type: 'module',
        message: `Invalid module name: "sdk.${moduleName}"`,
        suggestion: suggestions.length
          ? `Did you mean: ${suggestions.map((s) => `sdk.${s}`).join(' or ')}?`
          : `Valid modules: ${VALID_MODULES.join(', ')}`,
        codeSnippet: codeLine,
      });
      continue;
    }

    // Validate method name
    const validMethods = VALID_METHODS[moduleName] || [];
    if (!validMethods.includes(methodName)) {
      // Find similar method names (fuzzy match)
      const suggestions = validMethods.filter(
        (m) => m.toLowerCase().includes(methodName.toLowerCase()) || methodName.toLowerCase().includes(m.toLowerCase())
      );

      errors.push({
        line: absoluteLine,
        type: 'method',
        message: `Invalid method: "sdk.${moduleName}.${methodName}()" does not exist`,
        suggestion: suggestions.length
          ? `Did you mean: sdk.${moduleName}.${suggestions[0]}()?`
          : `Available methods: ${validMethods.slice(0, 5).join(', ')}...`,
        codeSnippet: codeLine,
      });
    }
  }

  return { errors, warnings };
}

/**
 * Remove multi-line comments from TypeScript code
 */
function removeMultiLineComments(code: string): string {
  // Remove /* ... */ comments while preserving line count (replace with empty lines)
  return code.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    // Replace comment content with newlines to preserve line numbers
    return '\n'.repeat((match.match(/\n/g) || []).length);
  });
}

/**
 * Validate a documentation or example file
 */
function validateDocFile(filePath: string): ValidationResult {
  const content = readFileSync(filePath, 'utf-8');

  let codeBlocks: Array<{ code: string; line: number }>;

  // For TypeScript files, treat the entire file as code (excluding multi-line comments)
  if (filePath.endsWith('.ts')) {
    const codeWithoutComments = removeMultiLineComments(content);
    codeBlocks = [{ code: codeWithoutComments, line: 1 }];
  } else {
    // For markdown files, extract code blocks
    codeBlocks = extractCodeBlocks(content);
  }

  const result: ValidationResult = {
    file: filePath,
    totalExamples: codeBlocks.length,
    errors: [],
    warnings: [],
  };

  codeBlocks.forEach(({ code, line }) => {
    // Validate method names
    const methodValidation = validateSDKCalls(code, line);
    result.errors.push(...methodValidation.errors);
    result.warnings.push(...methodValidation.warnings);

    // Validate response structure usage
    const responseValidation = validateResponseStructure(code, line);
    result.errors.push(...responseValidation.errors);
    result.warnings.push(...responseValidation.warnings);
  });

  return result;
}

/**
 * Print validation results
 */
function printResults(result: ValidationResult): void {
  console.log(`\n${colors.cyan}Validating:${colors.reset} ${result.file}`);
  console.log(`${colors.blue}Total code examples:${colors.reset} ${result.totalExamples}`);

  if (result.errors.length === 0 && result.warnings.length === 0) {
    console.log(`${colors.green}✓ All examples are valid!${colors.reset}`);
    return;
  }

  // Print errors
  if (result.errors.length > 0) {
    console.log(`\n${colors.red}✗ Errors found: ${result.errors.length}${colors.reset}`);
    result.errors.forEach((error, index) => {
      console.log(`\n${colors.red}Error ${index + 1}:${colors.reset}`);
      console.log(`  Line ${error.line}: ${error.message}`);
      if (error.codeSnippet) {
        console.log(`  ${colors.yellow}Code:${colors.reset} ${error.codeSnippet}`);
      }
      if (error.suggestion) {
        console.log(`  ${colors.green}Suggestion:${colors.reset} ${error.suggestion}`);
      }
    });
  }

  // Print warnings
  if (result.warnings.length > 0) {
    console.log(`\n${colors.yellow}⚠ Warnings: ${result.warnings.length}${colors.reset}`);
    result.warnings.forEach((warning, index) => {
      console.log(`\n${colors.yellow}Warning ${index + 1}:${colors.reset}`);
      console.log(`  Line ${warning.line}: ${warning.message}`);
      if (warning.codeSnippet) {
        console.log(`  ${colors.blue}Code:${colors.reset} ${warning.codeSnippet}`);
      }
      if (warning.suggestion) {
        console.log(`  ${colors.cyan}Suggestion:${colors.reset} ${warning.suggestion}`);
      }
    });
  }
}

/**
 * Main validation function
 */
function main() {
  console.log(`${colors.magenta}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.magenta}  Documentation Examples Validator${colors.reset}`);
  console.log(`${colors.magenta}═══════════════════════════════════════════════════════${colors.reset}`);

  // Documentation files to validate
  const docsToValidate = [
    // Guides
    join(__dirname, '..', 'docs', 'guides', 'troubleshooting.md'),
    join(__dirname, '..', 'docs', 'guides', 'best-practices.md'),

    // Getting Started
    join(__dirname, '..', 'docs', 'getting-started', 'quickstart.md'),
    join(__dirname, '..', 'docs', 'getting-started', 'tutorials', 'product-catalog-sync.md'),
    join(__dirname, '..', 'docs', 'getting-started', 'tutorials', 'order-fulfillment.md'),
    join(__dirname, '..', 'docs', 'getting-started', 'tutorials', 'analytics-dashboard.md'),
    join(__dirname, '..', 'docs', 'getting-started', 'tutorials', 'multi-module-integration.md'),

    // Example TypeScript files
    join(__dirname, '..', 'examples', 'general.ts'),
    join(__dirname, '..', 'examples', 'quickstart.ts'),
    join(__dirname, '..', 'examples', 'products-categories.ts'),
    join(__dirname, '..', 'examples', 'products-crud.ts'),
    join(__dirname, '..', 'examples', 'products-media-pricing.ts'),
    join(__dirname, '..', 'examples', 'products-warehouse-stock.ts'),
    join(__dirname, '..', 'examples', 'orders-fbs-processing.ts'),
    join(__dirname, '..', 'examples', 'orders-fbs-fulfillment.ts'),
    join(__dirname, '..', 'examples', 'complete-product-workflow.ts'),
    join(__dirname, '..', 'examples', 'finances-balance-transactions.ts'),
    join(__dirname, '..', 'examples', 'finances-reports-payouts.ts'),
    join(__dirname, '..', 'examples', 'analytics-dashboard.ts'),
    join(__dirname, '..', 'examples', 'customer-support.ts'),
    join(__dirname, '..', 'examples', 'reports-analytics.ts'),
    join(__dirname, '..', 'examples', 'business-dashboard.ts'),
    join(__dirname, '..', 'examples', 'financial-reconciliation.ts'),
    join(__dirname, '..', 'examples', 'customer-engagement.ts'),
    join(__dirname, '..', 'examples', 'export-to-bi.ts'),
    join(__dirname, '..', 'examples', 'orders-fbw-fulfillment.ts'),
    join(__dirname, '..', 'examples', 'communications-customer-engagement.ts'),
    join(__dirname, '..', 'examples', 'in-store-pickup-workflow.ts'),
    join(__dirname, '..', 'examples', 'tariffs-pricing-calculator.ts'),
    join(__dirname, '..', 'examples', 'promotion-campaign-automation.ts'),
    join(__dirname, '..', 'examples', 'integration-product-order-finance.ts'),
  ];

  const results: ValidationResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalExamples = 0;

  // Validate each file
  for (const filePath of docsToValidate) {
    // Check if file exists
    try {
      const result = validateDocFile(filePath);
      results.push(result);
      totalErrors += result.errors.length;
      totalWarnings += result.warnings.length;
      totalExamples += result.totalExamples;
      printResults(result);
    } catch (error) {
      console.log(`\n${colors.yellow}⚠ File not found or unreadable:${colors.reset} ${filePath}`);
      console.log(`${colors.cyan}  Skipping validation for this file${colors.reset}`);
    }
  }

  // Print summary
  console.log(`\n${colors.magenta}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.magenta}  Validation Summary${colors.reset}`);
  console.log(`${colors.magenta}═══════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}Files validated:${colors.reset} ${results.length}/${docsToValidate.length}`);
  console.log(`${colors.cyan}Total code examples:${colors.reset} ${totalExamples}`);

  if (totalErrors === 0 && totalWarnings === 0) {
    console.log(`${colors.green}✓ All examples are valid across all documentation!${colors.reset}`);
  } else {
    if (totalErrors > 0) {
      console.log(`${colors.red}✗ Total errors:${colors.reset} ${totalErrors}`);
    }
    if (totalWarnings > 0) {
      console.log(`${colors.yellow}⚠ Total warnings:${colors.reset} ${totalWarnings}`);
    }
  }

  console.log(`${colors.magenta}═══════════════════════════════════════════════════════${colors.reset}\n`);

  if (totalErrors > 0) {
    console.log(`${colors.red}✗ Validation failed with ${totalErrors} error(s)${colors.reset}\n`);
    process.exit(1);
  } else {
    if (totalWarnings > 0) {
      console.log(`${colors.green}✓ Validation passed with ${totalWarnings} warning(s)${colors.reset}`);
      console.log(`${colors.cyan}  Warnings are informational and don't fail the build${colors.reset}\n`);
    } else {
      console.log(`${colors.green}✓ Validation passed! All examples are accurate.${colors.reset}\n`);
    }
    process.exit(0);
  }
}

// Run validator
main();
