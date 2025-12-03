/**
 * YAML Endpoints Parser
 * Извлекает все endpoints из YAML файлов Wildberries API
 */

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const YAML_DIR = path.join(__dirname, '../wildberries_api_doc');

/**
 * Извлечь все endpoints из YAML файла
 */
function extractEndpoints(yamlPath) {
  const doc = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
  const endpoints = [];
  const defaultServers = doc.servers || [];

  for (const [pathUrl, pathItem] of Object.entries(doc.paths || {})) {
    // Get servers for this path (may override default)
    const pathServers = pathItem.servers || defaultServers;

    for (const [method, details] of Object.entries(pathItem)) {
      if (['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
        // Get servers for this operation (may override path servers)
        const operationServers = details.servers || pathServers;
        const baseUrl = operationServers[0]?.url || '';

        endpoints.push({
          path: pathUrl,
          fullUrl: `${baseUrl}${pathUrl}`,
          method: method.toUpperCase(),
          operationId: details.operationId || null,
          summary: details.summary || '',
          description: details.description?.substring(0, 200) || '',
          parameters: (details.parameters || []).map(p => ({
            name: p.name || p.$ref?.split('/').pop(),
            in: p.in,
            required: p.required || false
          })),
          hasRequestBody: !!details.requestBody,
          responses: Object.keys(details.responses || {})
        });
      }
    }
  }

  return endpoints;
}

/**
 * Извлечь endpoints из всех YAML файлов
 */
function extractAllEndpoints() {
  const yamlFiles = fs.readdirSync(YAML_DIR).filter(f => f.endsWith('.yaml'));
  const allEndpoints = {};

  for (const file of yamlFiles) {
    const moduleName = file.replace('.yaml', '');
    const filePath = path.join(YAML_DIR, file);
    allEndpoints[moduleName] = extractEndpoints(filePath);
  }

  return allEndpoints;
}

/**
 * Генерация отчёта в Markdown
 */
function generateMarkdownReport(allEndpoints) {
  let md = '# YAML API Endpoints Report\n\n';
  md += `**Дата генерации:** ${new Date().toISOString().split('T')[0]}\n\n`;

  let totalEndpoints = 0;
  const summary = [];

  for (const [module, endpoints] of Object.entries(allEndpoints)) {
    totalEndpoints += endpoints.length;
    summary.push({ module, count: endpoints.length });
  }

  // Summary table
  md += '## Summary\n\n';
  md += `**Всего endpoints:** ${totalEndpoints}\n\n`;
  md += '| Module | Endpoints |\n';
  md += '|--------|----------:|\n';
  for (const { module, count } of summary.sort((a, b) => b.count - a.count)) {
    md += `| ${module} | ${count} |\n`;
  }
  md += '\n---\n\n';

  // Detailed tables per module
  for (const [module, endpoints] of Object.entries(allEndpoints)) {
    md += `## ${module}\n\n`;
    md += `**Endpoints:** ${endpoints.length}\n\n`;
    md += '| # | Method | Path | Summary | Params |\n';
    md += '|---|--------|------|---------|--------|\n';

    endpoints.forEach((ep, idx) => {
      const params = ep.parameters
        .filter(p => p.required)
        .map(p => p.name)
        .join(', ') || '-';
      const summary = ep.summary.substring(0, 50) + (ep.summary.length > 50 ? '...' : '');
      md += `| ${idx + 1} | ${ep.method} | \`${ep.path}\` | ${summary} | ${params} |\n`;
    });

    md += '\n';
  }

  return md;
}

/**
 * Генерация JSON отчёта для программного использования
 */
function generateJSONReport(allEndpoints) {
  const report = {
    generatedAt: new Date().toISOString(),
    totalEndpoints: 0,
    modules: {}
  };

  for (const [module, endpoints] of Object.entries(allEndpoints)) {
    report.totalEndpoints += endpoints.length;
    report.modules[module] = {
      count: endpoints.length,
      endpoints: endpoints
    };
  }

  return report;
}

// Main execution
if (require.main === module) {
  console.log('📊 Parsing YAML endpoints...\n');

  const allEndpoints = extractAllEndpoints();

  // Generate Markdown report
  const mdReport = generateMarkdownReport(allEndpoints);
  const mdPath = path.join(__dirname, '../comparison_docs/yaml-endpoints-report.md');
  fs.writeFileSync(mdPath, mdReport);
  console.log(`✅ Markdown report saved: ${mdPath}`);

  // Generate JSON report
  const jsonReport = generateJSONReport(allEndpoints);
  const jsonPath = path.join(__dirname, '../comparison_docs/yaml-endpoints.json');
  fs.writeFileSync(jsonPath, JSON.stringify(jsonReport, null, 2));
  console.log(`✅ JSON report saved: ${jsonPath}`);

  // Print summary
  console.log('\n📋 Summary:');
  console.log(`   Total endpoints: ${jsonReport.totalEndpoints}`);
  for (const [module, data] of Object.entries(jsonReport.modules)) {
    console.log(`   ${module}: ${data.count} endpoints`);
  }
}

module.exports = { extractEndpoints, extractAllEndpoints, generateMarkdownReport, generateJSONReport };
