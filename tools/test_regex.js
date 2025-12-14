
const content = `
    return this.client.get<PassOfficesResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/passes/offices',
      {
`;

const regex = /this\.client\.(get|post|put|delete|patch)(?:<[^>]+>)?\(\s*[`'"]([^`'"]+)[`'"]/g;
// const regex = /this\.client\.(get|post|put|delete|patch)(?:<[^>]+>)?\(\s*[`'"]([^`'"]+)[`'"]/gm;

let match;
while ((match = regex.exec(content)) !== null) {
    console.log('Match:', match[1], match[2]);
}
