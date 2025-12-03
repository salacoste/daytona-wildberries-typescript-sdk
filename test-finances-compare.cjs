/**
 * Finances Module Comparison: Direct API vs SDK
 */
require('dotenv').config();
const { WildberriesSDK } = require('./dist/cjs/index.cjs');

const API_KEY = process.env.WB_API_KEY;
const sdk = new WildberriesSDK({ apiKey: API_KEY });

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function test() {
  console.log('=== FINANCES MODULE: Direct API vs SDK ===\n');

  // 1. Balance
  console.log('1. GET /api/v1/account/balance');
  const directBalance = await fetch('https://finance-api.wildberries.ru/api/v1/account/balance', {
    headers: { 'Authorization': API_KEY }
  }).then(r => r.json());
  console.log('   Direct:', JSON.stringify(directBalance));

  await sleep(2000);

  const sdkBalance = await sdk.finances.getBalance();
  console.log('   SDK:', JSON.stringify(sdkBalance));
  console.log('   Match:', JSON.stringify(directBalance) === JSON.stringify(sdkBalance) ? '✅' : '❌');

  await sleep(3000);

  // 2. Document Categories
  console.log('\n2. GET /api/v1/documents/categories');
  const directCats = await fetch('https://documents-api.wildberries.ru/api/v1/documents/categories', {
    headers: { 'Authorization': API_KEY }
  }).then(r => r.json());
  console.log('   Direct: ' + Object.keys(directCats).join(', '));

  await sleep(2000);

  const sdkCats = await sdk.finances.getDocumentCategories();
  console.log('   SDK: ' + Object.keys(sdkCats).join(', '));
  console.log('   Match:', JSON.stringify(directCats) === JSON.stringify(sdkCats) ? '✅' : '❌');

  await sleep(3000);

  // 3. Documents List
  console.log('\n3. GET /api/v1/documents/list');
  const directDocs = await fetch('https://documents-api.wildberries.ru/api/v1/documents/list', {
    headers: { 'Authorization': API_KEY }
  }).then(r => r.json());
  console.log('   Direct: ' + Object.keys(directDocs).join(', '));

  await sleep(2000);

  const sdkDocs = await sdk.finances.getDocuments();
  console.log('   SDK: ' + Object.keys(sdkDocs).join(', '));
  console.log('   Match:', JSON.stringify(directDocs) === JSON.stringify(sdkDocs) ? '✅' : '❌');
}

test().catch(e => console.log('Error:', e.message));
