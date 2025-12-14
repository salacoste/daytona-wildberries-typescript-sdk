
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDocDir = path.join(__dirname, '../wildberries_api_doc');
const output = {};

try {
    const files = fs.readdirSync(apiDocDir).filter(file => file.endsWith('.yaml'));

    files.forEach(file => {
        const filePath = path.join(apiDocDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        try {
            const doc = yaml.load(fileContent);
            const paths = doc.paths || {};

            output[file] = [];

            for (const [endpointPath, methods] of Object.entries(paths)) {
                for (const [method, details] of Object.entries(methods)) {
                    if (['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
                        output[file].push({
                            method: method.toUpperCase(),
                            path: endpointPath,
                            summary: details.summary || details.description || 'No description'
                        });
                    }
                }
            }
        } catch (e) {
            console.error(`Error parsing ${file}:`, e.message);
        }
    });

    console.log(JSON.stringify(output, null, 2));

} catch (e) {
    console.error('Error reading directory:', e.message);
}
