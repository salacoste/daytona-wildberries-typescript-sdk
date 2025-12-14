
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.WB_API_KEY;

if (!apiKey) {
    console.error('WB_API_KEY not found in .env');
    process.exit(1);
}

const endpointsToTest = [
    // --- Products Module ---
    { method: 'GET', url: 'https://content-api.wildberries.ru/content/v2/object/all' },
    { method: 'GET', url: 'https://content-api.wildberries.ru/content/v2/tags' },
    { method: 'POST', url: 'https://content-api.wildberries.ru/content/v2/get/cards/trash', data: { limit: 10, offset: 0 } },

    // --- Promotion Module (Advert API) ---
    { method: 'GET', url: 'https://advert-api.wildberries.ru/adv/v0/config' },
    { method: 'POST', url: 'https://advert-api.wildberries.ru/adv/v0/bids/min', data: {} },
    { method: 'POST', url: 'https://advert-api.wildberries.ru/adv/v2/seacat/save-ad', data: {} },
    { method: 'GET', url: 'https://advert-api.wildberries.ru/adv/v1/supplier/subjects' },
    { method: 'POST', url: 'https://advert-api.wildberries.ru/adv/v2/supplier/nms', data: [] },
    { method: 'GET', url: 'https://advert-api.wildberries.ru/adv/v0/delete', params: { id: 123 } }, // Expect 400/404 or 200
    { method: 'PATCH', url: 'https://advert-api.wildberries.ru/adv/v0/bids', data: [] },
    { method: 'PUT', url: 'https://advert-api.wildberries.ru/adv/v0/auction/placements', data: {} },
    { method: 'PATCH', url: 'https://advert-api.wildberries.ru/adv/v0/auction/bids', data: {} },
    { method: 'GET', url: 'https://advert-api.wildberries.ru/adv/v1/search/set-plus', params: { id: 123 } },
    { method: 'GET', url: 'https://advert-api.wildberries.ru/adv/v1/auto/getnmtoadd', params: { id: 123 } },
    { method: 'POST', url: 'https://advert-api.wildberries.ru/adv/v1/auto/updatenm', data: {} },
    { method: 'PATCH', url: 'https://advert-api.wildberries.ru/adv/v0/auction/nms', data: {} },
    { method: 'POST', url: 'https://advert-api.wildberries.ru/adv/v2/fullstats', data: [] },
    { method: 'GET', url: 'https://advert-api.wildberries.ru/adv/v3/fullstats' },
    { method: 'GET', url: 'https://advert-api.wildberries.ru/adv/v1/stat/words' },
    { method: 'POST', url: 'https://advert-media-api.wildberries.ru/adv/v1/stats', data: {} },

    // --- Promotion Module (Media API) ---
    { method: 'GET', url: 'https://advert-media-api.wildberries.ru/adv/v1/adverts' },
    { method: 'GET', url: 'https://advert-media-api.wildberries.ru/adv/v1/advert', params: { id: 123 } },

    // --- Calendar API ---
    { method: 'GET', url: 'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions' },
    { method: 'GET', url: 'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/details' },
    { method: 'GET', url: 'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/nomenclatures' },
    { method: 'POST', url: 'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/upload', data: {} },

    // --- Reports Module ---
    // Using 'warehouse_remains' as a representative endpoint
    { method: 'GET', url: 'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/dummy-task-id/status' },
    { method: 'GET', url: 'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/dummy-task-id/download' }
];

async function testEndpoint(ep) {
    try {
        const response = await axios({
            method: ep.method,
            url: ep.url,
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            },
            params: ep.params,
            data: ep.data,
            validateStatus: () => true
        });

        let status = 'EXISTS';
        if (response.status === 404) status = 'MISSING (404)';
        if (response.status === 405) status = 'WRONG METHOD (405)';
        // 400, 401, 403, 422, 429 are all signs that the endpoint exists but request was invalid/unauthorized

        return { ...ep, statusCode: response.status, result: status };

    } catch (error) {
        return { ...ep, statusCode: 'ERR', result: `ERROR: ${error.message}` };
    }
}

async function run() {
    console.log('Verifying extra endpoints...');
    const results = [];
    for (const ep of endpointsToTest) {
        const res = await testEndpoint(ep);
        results.push(res);
        console.log(`[${res.method}] ${res.url} -> ${res.statusCode} (${res.result})`);
    }
}

run();
