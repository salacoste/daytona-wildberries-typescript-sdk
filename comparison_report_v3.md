# Wildberries SDK vs API Comparison Report

## Summary
- Total API Endpoints: 234
- Total SDK Endpoints: 255
- Matched: 221
- Missing in SDK: 13
- Extra in SDK: 28

## Missing Endpoints (In API but not in SDK)
- [GET] `/api/v2/history/goods/task` (Детализация обработанной загрузки) - Source: 02-products.yaml
- [GET] `/api/v2/buffer/tasks` (Состояние необработанной загрузки) - Source: 02-products.yaml
- [GET] `/api/v2/buffer/goods/task` (Детализация необработанной загрузки) - Source: 02-products.yaml
- [GET] `/api/v2/list/goods/size/nm` (Получить размеры товара с ценами) - Source: 02-products.yaml
- [GET] `/api/v2/quarantine/goods` (Получить товары в карантине) - Source: 02-products.yaml
- [POST] `/api/v1/supplies` (Список поставок) - Source: 07-orders-fbw.yaml
- [GET] `/api/v1/supplies/{ID}` (Детали поставки) - Source: 07-orders-fbw.yaml
- [GET] `/api/v1/supplies/{ID}/goods` (Товары поставки) - Source: 07-orders-fbw.yaml
- [GET] `/api/v1/questions/count` (Количество вопросов) - Source: 09-communications.yaml
- [GET] `/api/v1/question` (Получить вопрос по ID) - Source: 09-communications.yaml
- [GET] `/api/v1/feedback` (Получить отзыв по ID) - Source: 09-communications.yaml
- [PATCH] `/api/v1/templates` (Редактировать шаблон) - Source: 09-communications.yaml
- [DELETE] `/api/v1/templates` (Удалить шаблон) - Source: 09-communications.yaml

## Extra Endpoints (In SDK but not in API)
- [GET] `/api/v1/questions/{questionId}/details` - Module: communications
- [PATCH] `/api/v1/templates/{templateId}` - Module: communications
- [DELETE] `/api/v1/templates/{templateId}` - Module: communications
- [GET] `/api/v1/templates/stats` - Module: communications
- [POST] `/api/v1/reports/generate` - Module: finances
- [GET] `/api/v1/reports/{reportId}` - Module: finances
- [GET] `/api/v1/payouts` - Module: finances
- [GET] `/api/v1/payouts/{payoutId}` - Module: finances
- [GET] `/api/v3/orders/{orderId}/meta/sgtin` - Module: orders-fbs
- [GET] `/api/v3/orders/{orderId}/meta/uin` - Module: orders-fbs
- [GET] `/api/v3/orders/{orderId}/meta/imei` - Module: orders-fbs
- [GET] `/api/v3/orders/{orderId}/meta/gtin` - Module: orders-fbs
- [GET] `/api/v3/orders/{orderId}/meta/expiration` - Module: orders-fbs
- [GET] `/api/v3/orders/client` - Module: orders-fbs
- [GET] `/api/v3/orders/status/history` - Module: orders-fbs
- [GET] `/api/v3/supplies/{supplyId}/trbx/stickers` - Module: orders-fbs
- [POST] `/api/v1/supplies?limit={limit}&offset={offset}` - Module: orders-fbw
- [GET] `/api/v1/supplies/{ID}?isPreorderID={isPreorderID}` - Module: orders-fbw
- [GET] `/api/v1/supplies/{ID}/goods?limit={limit}&offset={offset}&isPreorderID={isPreorderID}` - Module: orders-fbw
- [GET] `/api/v2/history/tasks?uploadID={uploadID}` - Module: products
- [GET] `/api/v2/history/goods/task?{queryParams.toString()}` - Module: products
- [GET] `/api/v2/buffer/tasks?uploadID={uploadID}` - Module: products
- [GET] `/api/v2/buffer/goods/task?{queryParams.toString()}` - Module: products
- [GET] `/api/v2/list/goods/filter${queryString ? ` - Module: products
- [GET] `/api/v2/list/goods/size/nm?{queryParams.toString()}` - Module: products
- [GET] `/api/v2/quarantine/goods${queryString ? ` - Module: products
- [GET] `/api/v1/{endpoint}/tasks/{taskId}/status` - Module: reports
- [GET] `/api/v1/{endpoint}/tasks/{taskId}/download` - Module: reports


