import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// Types
export type ResponsePaidStorage = {
    date?: string;
    logWarehouseCoef?: number;
    officeId?: number;
    warehouse?: string;
    warehouseCoef?: number;
    giId?: number;
    chrtId?: number;
    size?: string;
    barcode?: string;
    subject?: string;
    brand?: string;
    vendorCode?: string;
    nmId?: number;
    volume?: number;
    calcType?: string;
    warehousePrice?: number;
    barcodesCount?: number;
    palletPlaceCode?: number;
    palletCount?: number;
    originalDate?: string;
    loyaltyDiscount?: number;
    tariffFixDate?: string;
    tariffLowerDate?: string;
}[];

export interface CreateTaskResponse {
    data?: {
        taskId?: string;
    }
}

export interface GetTasksResponse {
    data?: {
        id?: string;
        status?: string;
    }
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verifyPaidStorage() {
    const apiKey = process.env.WB_API_KEY;
    if (!apiKey) {
        throw new Error('WB_API_KEY is not set. Please ensure .env file exists and contains WB_API_KEY.');
    }

    const client = axios.create({
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
        },
        validateStatus: () => true // Handle errors manually
    });

    try {
        const dateFrom = '2024-11-25';
        const dateTo = '2024-12-01';

        console.log(`Creating paid storage report task for ${dateFrom} to ${dateTo}...`);
        console.log('Sending request to: https://seller-analytics-api.wildberries.ru/api/v1/paid_storage');
        const createResp = await client.get<CreateTaskResponse>(
            'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage',
            { params: { dateFrom, dateTo } }
        );

        if (createResp.status !== 200) {
            console.error('Failed to create task:', JSON.stringify(createResp.data, null, 2));
            return;
        }

        const taskId = createResp.data.data?.taskId;
        if (!taskId) {
            console.error('No taskId received in response:', createResp.data);
            return;
        }
        console.log(`Task created. ID: ${taskId}`);

        // 2. Poll for Status
        let status = 'new';
        let attempts = 0;
        const maxAttempts = 20;

        while (status !== 'done' && attempts < maxAttempts) {
            await delay(3000); // 3 sec delay
            console.log(`Checking status (attempt ${attempts + 1})...`);

            const statusResp = await client.get<GetTasksResponse>(
                `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/status`
            );

            if (statusResp.status !== 200) {
                console.error('Error checking status:', statusResp.data);
                return;
            }

            status = statusResp.data.data?.status || 'unknown';
            console.log(`Status: ${status}`);

            if (status === 'error' || status === 'canceled') {
                console.error('Task failed or canceled');
                return;
            }
            attempts++;
        }

        if (status !== 'done') {
            console.error('Timeout waiting for report');
            return;
        }

        // 3. Download Report
        console.log('Downloading report...');
        const downloadResp = await client.get<ResponsePaidStorage>(
            `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/download`
        );

        if (downloadResp.status !== 200) {
            console.error('Failed to download report:', downloadResp.data);
            return;
        }

        const reportData = downloadResp.data;
        if (!Array.isArray(reportData)) {
            console.error('Unexpected response format (not an array):', reportData);
            return;
        }

        console.log(`Downloaded ${reportData.length} records.`);

        if (reportData.length > 0) {
            const sample = reportData[0];
            console.log('\nSample Record Fields:');
            Object.keys(sample).forEach(key => console.log(` - ${key}: ${sample[key as keyof typeof sample]}`));

            // Calculate totals for comparison
            const totalStorage = reportData.reduce((sum, item) => sum + (item.warehousePrice || 0), 0);
            const uniqueItems = new Set(reportData.map(item => item.nmId)).size;

            console.log('\nReport Summary:');
            console.log(`Total Records: ${reportData.length}`);
            console.log(`Total Storage Fee: ${totalStorage.toFixed(2)}`);
            console.log(`Unique Items (nmId): ${uniqueItems}`);
        } else {
            console.log('Report is empty.');
        }

    } catch (error: any) {
        console.error('Verification failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

verifyPaidStorage();
