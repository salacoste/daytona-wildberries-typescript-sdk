/**
 * SDK Methods Extractor
 * Извлекает все методы из SDK модулей для сравнения с YAML
 */

const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.join(__dirname, '../src/modules');

/**
 * Маппинг имён папок модулей на имена YAML файлов
 */
const MODULE_MAPPING = {
  'general': '01-general',
  'products': '02-products',
  'orders-fbs': '03-orders-fbs',
  'in-store-pickup': '06-in-store-pickup',
  'orders-fbw': '07-orders-fbw',
  'promotion': '08-promotion',
  'communications': '09-communications',
  'tariffs': '10-tariffs',
  'analytics': '11-analytics',
  'reports': '12-reports',
  'finances': '13-finances'
};

/**
 * Извлечь методы из одного модуля SDK
 */
function extractMethodsFromModule(modulePath) {
  const content = fs.readFileSync(modulePath, 'utf8');
  const methods = [];

  // Regex для поиска async методов с их URL
  const methodRegex = /\/\*\*[\s\S]*?\*\/\s*async\s+(\w+)\s*\(([^)]*)\)[^{]*{[\s\S]*?this\.client\.(get|post|put|delete|patch)\s*(?:<[^>]+>)?\s*\(\s*[`'"]([^`'"]+)[`'"]/g;

  let match;
  while ((match = methodRegex.exec(content)) !== null) {
    const [, methodName, params, httpMethod, url] = match;

    // Parse parameters
    const paramList = params.split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map(p => {
        const [name] = p.split(':');
        return name.replace('?', '').trim();
      });

    methods.push({
      name: methodName,
      httpMethod: httpMethod.toUpperCase(),
      url: url,
      parameters: paramList,
      hasBody: ['POST', 'PUT', 'PATCH'].includes(httpMethod.toUpperCase()) && paramList.some(p => p === 'data' || p === 'body')
    });
  }

  return methods;
}

/**
 * Методы которые не обнаруживаются regex-ом из-за особенностей форматирования кода
 * (eslint-disable комментарии, deprecated методы и т.д.)
 */
const MANUAL_METHOD_WHITELIST = {
  '03-orders-fbs': [
    {
      name: 'getExternalStickersUrls',
      httpMethod: 'POST',
      url: 'https://marketplace-api.wildberries.ru/api/v3/files/orders/external-stickers',
      parameters: ['orderIds'],
      hasBody: true
    }
  ]
};

/**
 * Извлечь методы из всех модулей SDK
 */
function extractAllMethods() {
  const allMethods = {};

  const moduleFolders = fs.readdirSync(MODULES_DIR).filter(f => {
    const stat = fs.statSync(path.join(MODULES_DIR, f));
    return stat.isDirectory();
  });

  for (const folder of moduleFolders) {
    const indexPath = path.join(MODULES_DIR, folder, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const yamlName = MODULE_MAPPING[folder] || folder;
      allMethods[yamlName] = extractMethodsFromModule(indexPath);

      // Add whitelisted methods that can't be detected by regex
      if (MANUAL_METHOD_WHITELIST[yamlName]) {
        allMethods[yamlName].push(...MANUAL_METHOD_WHITELIST[yamlName]);
      }
    }
  }

  return allMethods;
}

/**
 * Генерация Markdown отчёта
 */
function generateMarkdownReport(allMethods) {
  let md = '# SDK Methods Report\n\n';
  md += `**Дата генерации:** ${new Date().toISOString().split('T')[0]}\n\n`;

  let totalMethods = 0;
  const summary = [];

  for (const [module, methods] of Object.entries(allMethods)) {
    totalMethods += methods.length;
    summary.push({ module, count: methods.length });
  }

  // Summary
  md += '## Summary\n\n';
  md += `**Всего методов:** ${totalMethods}\n\n`;
  md += '| Module | Methods |\n';
  md += '|--------|--------:|\n';
  for (const { module, count } of summary.sort((a, b) => b.count - a.count)) {
    md += `| ${module} | ${count} |\n`;
  }
  md += '\n---\n\n';

  // Detailed tables
  for (const [module, methods] of Object.entries(allMethods)) {
    md += `## ${module}\n\n`;
    md += `**Methods:** ${methods.length}\n\n`;
    md += '| # | Method | HTTP | URL | Params |\n';
    md += '|---|--------|------|-----|--------|\n';

    methods.forEach((m, idx) => {
      const url = m.url.length > 60 ? m.url.substring(0, 57) + '...' : m.url;
      const params = m.parameters.join(', ') || '-';
      md += `| ${idx + 1} | \`${m.name}()\` | ${m.httpMethod} | \`${url}\` | ${params} |\n`;
    });

    md += '\n';
  }

  return md;
}

/**
 * Генерация JSON отчёта
 */
function generateJSONReport(allMethods) {
  const report = {
    generatedAt: new Date().toISOString(),
    totalMethods: 0,
    modules: {}
  };

  for (const [module, methods] of Object.entries(allMethods)) {
    report.totalMethods += methods.length;
    report.modules[module] = {
      count: methods.length,
      methods: methods
    };
  }

  return report;
}

// Main execution
if (require.main === module) {
  console.log('📊 Extracting SDK methods...\n');

  const allMethods = extractAllMethods();

  // Generate Markdown report
  const mdReport = generateMarkdownReport(allMethods);
  const mdPath = path.join(__dirname, '../comparison_docs/sdk-methods-report.md');
  fs.writeFileSync(mdPath, mdReport);
  console.log(`✅ Markdown report saved: ${mdPath}`);

  // Generate JSON report
  const jsonReport = generateJSONReport(allMethods);
  const jsonPath = path.join(__dirname, '../comparison_docs/sdk-methods.json');
  fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2));
  console.log(`✅ JSON report saved: ${jsonPath}`);

  // Print summary
  console.log('\n📋 Summary:');
  console.log(`   Total methods: ${jsonReport.totalMethods}`);
  for (const [module, data] of Object.entries(jsonReport.modules)) {
    console.log(`   ${module}: ${data.count} methods`);
  }
}

module.exports = { extractMethodsFromModule, extractAllMethods, generateMarkdownReport, generateJSONReport };
