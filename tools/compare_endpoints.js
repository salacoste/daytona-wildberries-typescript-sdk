
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiEndpointsPath = path.join(__dirname, 'api_endpoints.json');
const sdkEndpointsPath = path.join(__dirname, 'sdk_endpoints.json');

const apiEndpoints = JSON.parse(fs.readFileSync(apiEndpointsPath, 'utf8'));
const sdkEndpoints = JSON.parse(fs.readFileSync(sdkEndpointsPath, 'utf8'));

// Flatten API endpoints
const flatApi = [];
for (const [file, endpoints] of Object.entries(apiEndpoints)) {
    endpoints.forEach(ep => {
        flatApi.push({
            ...ep,
            source: file,
            normalizedPath: normalizePath(ep.path)
        });
    });
}

// Flatten SDK endpoints
const flatSdk = [];
for (const [module, endpoints] of Object.entries(sdkEndpoints)) {
    endpoints.forEach(ep => {
        flatSdk.push({
            ...ep,
            module: module,
            normalizedPath: normalizePath(ep.path)
        });
    });
}

function normalizePath(p) {
    // Replace {param} with {param} to handle different variable names
    // e.g. /api/v1/orders/{orderId} -> /api/v1/orders/{param}
    return p.replace(/\{[^}]+\}/g, '{param}');
}

const missing = [];
const extra = [];
const matched = [];

// Check for missing
flatApi.forEach(apiEp => {
    const found = flatSdk.find(sdkEp =>
        sdkEp.method === apiEp.method &&
        sdkEp.normalizedPath === apiEp.normalizedPath
    );

    if (found) {
        matched.push({ api: apiEp, sdk: found });
    } else {
        missing.push(apiEp);
    }
});

// Check for extra
flatSdk.forEach(sdkEp => {
    const found = flatApi.find(apiEp =>
        apiEp.method === sdkEp.method &&
        apiEp.normalizedPath === sdkEp.normalizedPath
    );

    if (!found) {
        extra.push(sdkEp);
    }
});

// Generate Report
let report = '# Wildberries SDK vs API Comparison Report\n\n';

report += `## Summary\n`;
report += `- Total API Endpoints: ${flatApi.length}\n`;
report += `- Total SDK Endpoints: ${flatSdk.length}\n`;
report += `- Matched: ${matched.length}\n`;
report += `- Missing in SDK: ${missing.length}\n`;
report += `- Extra in SDK: ${extra.length}\n\n`;

report += `## Missing Endpoints (In API but not in SDK)\n`;
if (missing.length === 0) {
    report += 'None\n';
} else {
    missing.forEach(ep => {
        report += `- [${ep.method}] \`${ep.path}\` (${ep.summary}) - Source: ${ep.source}\n`;
    });
}
report += '\n';

report += `## Extra Endpoints (In SDK but not in API)\n`;
if (extra.length === 0) {
    report += 'None\n';
} else {
    extra.forEach(ep => {
        report += `- [${ep.method}] \`${ep.path}\` - Module: ${ep.module}\n`;
    });
}
report += '\n';

console.log(report);
