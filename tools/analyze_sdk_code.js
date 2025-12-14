
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modulesDir = path.join(__dirname, '../src/modules');
const output = {};

function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            scanDirectory(filePath);
        } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
            analyzeFile(filePath);
        }
    });
}

function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(modulesDir, filePath);
    const moduleName = relativePath.split(path.sep)[0]; // e.g., 'products'

    if (!output[moduleName]) {
        output[moduleName] = [];
    }

    // Regex to find this.client.method(...) calls
    // Matches: this.client.(get|post|put|delete|patch)<...>(['"`](url)['"`]
    const regex = /this\.client\.(get|post|put|delete|patch)(?:<[^>]+>)?\(\s*[`'"]([^`'"]+)[`'"]/gm;

    let match;
    while ((match = regex.exec(content)) !== null) {
        const method = match[1].toUpperCase();
        let url = match[2];

        // Normalize URL: remove domain if present
        try {
            // If it's a full URL, extract pathname
            if (url.startsWith('http')) {
                const urlObj = new URL(url.replace(/\$\{([^}]+)\}/g, 'PLACEHOLDER')); // Handle template literals for URL parsing
                url = urlObj.pathname;

                // Restore placeholders if needed, but for now just keeping the path is enough
                // Actually, the regex capture might contain ${...} which is not valid URL char, so new URL() might fail if not handled.
                // Let's just strip the domain manually to be safer with template strings
                const domainRegex = /^https?:\/\/[^\/]+/;
                url = match[2].replace(domainRegex, '');
            }
        } catch (e) {
            // If new URL() fails, it might be a relative path or complex template string
            // Just keep it as is or try to strip domain regex
            const domainRegex = /^https?:\/\/[^\/]+/;
            url = match[2].replace(domainRegex, '');
        }

        // Normalize template literals: ${id} -> {id}
        url = url.replace(/\$\{([^}]+)\}/g, '{$1}');

        output[moduleName].push({
            method,
            path: url,
            file: relativePath
        });
    }
}

try {
    scanDirectory(modulesDir);
    console.log(JSON.stringify(output, null, 2));
} catch (e) {
    console.error('Error scanning directory:', e.message);
}
