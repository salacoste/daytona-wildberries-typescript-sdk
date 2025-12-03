[Wildberries API TypeScript SDK](../modules.md) / \<internal\>

# \<internal\>

## Classes

| Class | Description |
| ------ | ------ |
| [\_TokenBucket](classes/TokenBucket.md) | Internal token bucket implementation for rate limiting. |
| [RateLimiter](classes/RateLimiter.md) | Rate limiter for API endpoints using the token bucket algorithm. |
| [RetryHandler](classes/RetryHandler.md) | RetryHandler - Automatic retry with exponential backoff |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [RetryConfig](interfaces/RetryConfig.md) | Configuration options for retry behavior |
| [DateRange](interfaces/DateRange.md) | Date range for analytics queries |
| [StockInfo](interfaces/StockInfo.md) | Stock information for product |
| [ResponseError](interfaces/ResponseError.md) | Response error details |
| [GenerateReportRequest](interfaces/GenerateReportRequest.md) | CSV report generation request |
| [GenerateReportResponse](interfaces/GenerateReportResponse.md) | Report generation response |
| [ReportInfo](interfaces/ReportInfo.md) | Report status and download information |
| [ReportDownloadItem](interfaces/ReportDownloadItem.md) | Report download item from nm-report/downloads endpoint |
| [ReportDownloadsResponse](interfaces/ReportDownloadsResponse.md) | Response from GET /api/v2/nm-report/downloads |
| [ProductSearchTextsRequest](interfaces/ProductSearchTextsRequest.md) | Request for product search texts endpoint |
| [SearchTextItem](interfaces/SearchTextItem.md) | Search text item in response |
| [ProductSearchTextsResponse](interfaces/ProductSearchTextsResponse.md) | Response from product search texts endpoint |
| [ProductOrdersRequest](interfaces/ProductOrdersRequest.md) | Request for product orders by search queries |
| [OrdersByDateItem](interfaces/OrdersByDateItem.md) | Order item by date |
| [ProductOrdersResponse](interfaces/ProductOrdersResponse.md) | Response from product orders endpoint |
| [StocksProductsRequest](interfaces/StocksProductsRequest.md) | Request for stocks by products |
| [StockProductItem](interfaces/StockProductItem.md) | Stock product item |
| [StocksProductsResponse](interfaces/StocksProductsResponse.md) | Response from stocks products endpoint |
| [StocksOfficesRequest](interfaces/StocksOfficesRequest.md) | Request for stocks by offices/warehouses |
| [OfficeStockItem](interfaces/OfficeStockItem.md) | Office stock item |
| [StocksOfficesResponse](interfaces/StocksOfficesResponse.md) | Response from stocks offices endpoint |
| [GroupedHistoryRequest](interfaces/GroupedHistoryRequest.md) | Request for grouped history endpoint (POST /api/v2/nm-report/grouped/history) Returns statistics by days grouped by subjects, brands, and tags. Max 7 days of data can be retrieved. |
| [GroupedHistoryItem](interfaces/GroupedHistoryItem.md) | Grouped history item with daily statistics |
| [GroupedHistoryResponse](interfaces/GroupedHistoryResponse.md) | Response from grouped history endpoint |
| [RetryReportRequest](interfaces/RetryReportRequest.md) | Request for retry report generation (POST /api/v2/nm-report/downloads/retry) |
| [RetryReportResponse](interfaces/RetryReportResponse.md) | Response from retry report endpoint |
| [SearchOrderBy](interfaces/SearchOrderBy.md) | Order by configuration for search reports |
| [SearchReportPeriod](interfaces/SearchReportPeriod.md) | Period for search report requests |
| [SearchReportTableGroupsRequest](interfaces/SearchReportTableGroupsRequest.md) | Request for search report table groups (POST /api/v2/search-report/table/groups) |
| [MetricWithDynamics](interfaces/MetricWithDynamics.md) | Metric with current value and dynamics |
| [SearchReportTableGroupItem](interfaces/SearchReportTableGroupItem.md) | Table group item in search report |
| [SearchReportTableGroupsResponse](interfaces/SearchReportTableGroupsResponse.md) | Response from search report table groups endpoint |
| [SearchReportTableDetailsRequest](interfaces/SearchReportTableDetailsRequest.md) | Request for search report table details (POST /api/v2/search-report/table/details) |
| [SearchReportProductItem](interfaces/SearchReportProductItem.md) | Product item in search report table details |
| [SearchReportTableDetailsResponse](interfaces/SearchReportTableDetailsResponse.md) | Response from search report table details endpoint |
| [StocksProductsGroupsRequest](interfaces/StocksProductsGroupsRequest.md) | Request for stocks products groups (POST /api/v2/stocks-report/products/groups) |
| [StocksGroupItem](interfaces/StocksGroupItem.md) | Stock group item |
| [StocksProductsGroupsResponse](interfaces/StocksProductsGroupsResponse.md) | Response from stocks products groups endpoint |
| [StocksProductsSizesRequest](interfaces/StocksProductsSizesRequest.md) | Request for stocks products sizes (POST /api/v2/stocks-report/products/sizes) |
| [OfficeStockDetail](interfaces/OfficeStockDetail.md) | Office stock detail |
| [StocksSizeItem](interfaces/StocksSizeItem.md) | Stock size item |
| [StocksProductsSizesResponse](interfaces/StocksProductsSizesResponse.md) | Response from stocks products sizes endpoint |
| [PingResponse](interfaces/PingResponse.md) | Response structure for ping endpoint |
| [NewsItem](interfaces/NewsItem.md) | News item structure from news endpoint |
| [NewsTag](interfaces/NewsTag.md) | News tag structure |
| [NewsResponse](interfaces/NewsResponse.md) | Response structure for news endpoint |
| [NewsRequestParams](interfaces/NewsRequestParams.md) | Parameters for news endpoint request |
| [SellerInfoResponse](interfaces/SellerInfoResponse.md) | Response structure for seller info endpoint |
| [ProductTag](interfaces/ProductTag.md) | Ярлык продавца |
| [DateRangeParams](interfaces/DateRangeParams.md) | Common date range parameters for reports |
| [WarehouseMeasurementsParams](interfaces/WarehouseMeasurementsParams.md) | Parameters for warehouse measurements report |
| [BrandShareParams](interfaces/BrandShareParams.md) | Parameters for brand share report |
| [BannedProductsParams](interfaces/BannedProductsParams.md) | Parameters for blocked/shadowed products reports |
| [WarehouseMeasurementItem](interfaces/WarehouseMeasurementItem.md) | Warehouse measurement/penalty item |
| [IncorrectAttachmentItem](interfaces/IncorrectAttachmentItem.md) | Incorrect attachment item |
| [GoodsLabelingItem](interfaces/GoodsLabelingItem.md) | Goods labeling item |
| [CharacteristicsChangeItem](interfaces/CharacteristicsChangeItem.md) | Characteristics change item |
| [BrandShareParentSubject](interfaces/BrandShareParentSubject.md) | Parent subject for brand share report |
| [BrandShareData](interfaces/BrandShareData.md) | Brand share report data |
| [BannedProductItem](interfaces/BannedProductItem.md) | Blocked/shadowed product item |
| [GoodsReturnItem](interfaces/GoodsReturnItem.md) | Goods return item |
| [RegionalSalesItem](interfaces/RegionalSalesItem.md) | Regional sales item |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [ReportFormat](type-aliases/ReportFormat.md) | Report format |
| [ReportStatus](type-aliases/ReportStatus.md) | Report status |
| [PositionCluster](type-aliases/PositionCluster.md) | Position cluster filter for search reports |
