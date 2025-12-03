/**
 * Coverage Report Generator
 * Сравнивает YAML endpoints с SDK методами и генерирует отчёт покрытия
 */

const fs = require('fs');
const path = require('path');
const { extractAllEndpoints } = require('./parse-yaml-endpoints.cjs');
const { extractAllMethods } = require('./extract-sdk-methods.cjs');

/**
 * Нормализация URL для сравнения
 */
function normalizeUrl(url) {
  return url
    .replace(/https?:\/\/[^\/]+/, '') // Remove domain
    .replace(/\$\{[^}]+\}/g, '{param}') // Normalize template literals
    .replace(/\{[^}]+\}/g, '{param}') // Normalize path params
    .replace(/\?.*$/, '') // Remove query string
    .toLowerCase();
}

/**
 * Поиск соответствующего SDK метода для YAML endpoint
 */
function findMatchingMethod(endpoint, sdkMethods) {
  const normalizedEndpoint = normalizeUrl(endpoint.path);

  for (const method of sdkMethods) {
    const normalizedMethod = normalizeUrl(method.url);

    // Check if paths match
    if (normalizedEndpoint === normalizedMethod && endpoint.method === method.httpMethod) {
      return {
        match: 'exact',
        method: method
      };
    }

    // Check partial match (endpoint path is in method URL)
    if (normalizedMethod.includes(normalizedEndpoint) && endpoint.method === method.httpMethod) {
      return {
        match: 'partial',
        method: method
      };
    }
  }

  return null;
}

/**
 * Генерация отчёта покрытия
 */
function generateCoverageReport() {
  console.log('📊 Generating coverage report...\n');

  const yamlEndpoints = extractAllEndpoints();
  const sdkMethods = extractAllMethods();

  const coverage = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalYamlEndpoints: 0,
      totalSdkMethods: 0,
      matched: 0,
      partial: 0,
      missing: 0,
      extra: 0
    },
    modules: {}
  };

  // Process each module
  for (const [yamlModule, endpoints] of Object.entries(yamlEndpoints)) {
    const moduleMethods = sdkMethods[yamlModule] || [];

    coverage.summary.totalYamlEndpoints += endpoints.length;
    coverage.summary.totalSdkMethods += moduleMethods.length;

    const moduleReport = {
      yamlEndpoints: endpoints.length,
      sdkMethods: moduleMethods.length,
      matched: [],
      partial: [],
      missing: [],
      extra: []
    };

    const matchedMethodNames = new Set();

    // Check each YAML endpoint
    for (const endpoint of endpoints) {
      const match = findMatchingMethod(endpoint, moduleMethods);

      if (match) {
        if (match.match === 'exact') {
          moduleReport.matched.push({
            endpoint: `${endpoint.method} ${endpoint.path}`,
            sdkMethod: match.method.name,
            summary: endpoint.summary
          });
          matchedMethodNames.add(match.method.name);
          coverage.summary.matched++;
        } else {
          moduleReport.partial.push({
            endpoint: `${endpoint.method} ${endpoint.path}`,
            sdkMethod: match.method.name,
            summary: endpoint.summary,
            note: 'Partial URL match'
          });
          matchedMethodNames.add(match.method.name);
          coverage.summary.partial++;
        }
      } else {
        moduleReport.missing.push({
          endpoint: `${endpoint.method} ${endpoint.path}`,
          summary: endpoint.summary,
          requiredParams: endpoint.parameters.filter(p => p.required).map(p => p.name)
        });
        coverage.summary.missing++;
      }
    }

    // Find extra SDK methods (not in YAML)
    for (const method of moduleMethods) {
      if (!matchedMethodNames.has(method.name)) {
        moduleReport.extra.push({
          method: method.name,
          httpMethod: method.httpMethod,
          url: method.url
        });
        coverage.summary.extra++;
      }
    }

    coverage.modules[yamlModule] = moduleReport;
  }

  return coverage;
}

/**
 * Генерация Markdown отчёта
 */
function generateMarkdownReport(coverage) {
  let md = '# SDK Coverage Report\n\n';
  md += `**Дата генерации:** ${coverage.generatedAt.split('T')[0]}\n\n`;

  // Summary
  md += '## 📊 Summary\n\n';
  md += '| Metric | Value |\n';
  md += '|--------|------:|\n';
  md += `| YAML Endpoints | ${coverage.summary.totalYamlEndpoints} |\n`;
  md += `| SDK Methods | ${coverage.summary.totalSdkMethods} |\n`;
  md += `| ✅ Exact Match | ${coverage.summary.matched} |\n`;
  md += `| ⚠️ Partial Match | ${coverage.summary.partial} |\n`;
  md += `| ❌ Missing in SDK | ${coverage.summary.missing} |\n`;
  md += `| ➕ Extra in SDK | ${coverage.summary.extra} |\n`;

  const coveragePercent = ((coverage.summary.matched + coverage.summary.partial) / coverage.summary.totalYamlEndpoints * 100).toFixed(1);
  md += `| **Coverage** | **${coveragePercent}%** |\n\n`;

  // Quick overview by module
  md += '## 📋 Module Overview\n\n';
  md += '| Module | YAML | SDK | Matched | Missing | Extra | Status |\n';
  md += '|--------|-----:|----:|--------:|--------:|------:|--------|\n';

  for (const [module, data] of Object.entries(coverage.modules)) {
    const matched = data.matched.length + data.partial.length;
    const status = data.missing.length === 0 ? '✅ Complete' :
                   data.missing.length <= 2 ? '⚠️ Almost' : '❌ Gaps';
    md += `| ${module} | ${data.yamlEndpoints} | ${data.sdkMethods} | ${matched} | ${data.missing.length} | ${data.extra.length} | ${status} |\n`;
  }

  md += '\n---\n\n';

  // Detailed per-module reports
  for (const [module, data] of Object.entries(coverage.modules)) {
    md += `## ${module}\n\n`;

    if (data.matched.length > 0) {
      md += '### ✅ Matched Endpoints\n\n';
      md += '| YAML Endpoint | SDK Method | Summary |\n';
      md += '|---------------|------------|----------|\n';
      for (const m of data.matched) {
        md += `| \`${m.endpoint}\` | \`${m.sdkMethod}()\` | ${m.summary.substring(0, 40)}... |\n`;
      }
      md += '\n';
    }

    if (data.partial.length > 0) {
      md += '### ⚠️ Partial Matches\n\n';
      md += '| YAML Endpoint | SDK Method | Note |\n';
      md += '|---------------|------------|------|\n';
      for (const m of data.partial) {
        md += `| \`${m.endpoint}\` | \`${m.sdkMethod}()\` | ${m.note} |\n`;
      }
      md += '\n';
    }

    if (data.missing.length > 0) {
      md += '### ❌ Missing in SDK\n\n';
      md += '| YAML Endpoint | Summary | Required Params |\n';
      md += '|---------------|---------|------------------|\n';
      for (const m of data.missing) {
        const params = m.requiredParams.join(', ') || '-';
        md += `| \`${m.endpoint}\` | ${m.summary.substring(0, 40)}... | ${params} |\n`;
      }
      md += '\n';
    }

    if (data.extra.length > 0) {
      md += '### ➕ Extra SDK Methods (not in YAML)\n\n';
      md += '| SDK Method | HTTP | URL |\n';
      md += '|------------|------|-----|\n';
      for (const m of data.extra) {
        const url = m.url.length > 50 ? m.url.substring(0, 47) + '...' : m.url;
        md += `| \`${m.method}()\` | ${m.httpMethod} | \`${url}\` |\n`;
      }
      md += '\n';
    }

    md += '---\n\n';
  }

  return md;
}

// Main execution
if (require.main === module) {
  const coverage = generateCoverageReport();

  // Save JSON
  const jsonPath = path.join(__dirname, '../comparison_docs/coverage-report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(coverage, null, 2));
  console.log(`✅ JSON report saved: ${jsonPath}`);

  // Save Markdown
  const mdReport = generateMarkdownReport(coverage);
  const mdPath = path.join(__dirname, '../comparison_docs/coverage-report.md');
  fs.writeFileSync(mdPath, mdReport);
  console.log(`✅ Markdown report saved: ${mdPath}`);

  // Print summary
  console.log('\n📋 Coverage Summary:');
  console.log(`   YAML Endpoints: ${coverage.summary.totalYamlEndpoints}`);
  console.log(`   SDK Methods: ${coverage.summary.totalSdkMethods}`);
  console.log(`   ✅ Matched: ${coverage.summary.matched}`);
  console.log(`   ⚠️ Partial: ${coverage.summary.partial}`);
  console.log(`   ❌ Missing: ${coverage.summary.missing}`);
  console.log(`   ➕ Extra: ${coverage.summary.extra}`);

  const pct = ((coverage.summary.matched + coverage.summary.partial) / coverage.summary.totalYamlEndpoints * 100).toFixed(1);
  console.log(`\n   📊 Coverage: ${pct}%`);
}

module.exports = { generateCoverageReport, generateMarkdownReport };
