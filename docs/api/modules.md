# Wildberries API TypeScript SDK v1.0.1

Wildberries API TypeScript SDK
Main entry point

## Modules

| Module | Description |
| ------ | ------ |
| [\<internal\>](-internal-/modules.md) | - |

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [EventType](enumerations/EventType.md) | Event type enum |
| [Sender](enumerations/Sender.md) | Message sender enum |
| [QuestionState](enumerations/QuestionState.md) | Question state enum |
| [ReviewState](enumerations/ReviewState.md) | Review state enum |
| [ReviewAnswerState](enumerations/ReviewAnswerState.md) | Review answer state enum |

## Classes

| Class | Description |
| ------ | ------ |
| [BaseClient](classes/BaseClient.md) | Base HTTP client for all Wildberries API modules |
| [AuthenticationError](classes/AuthenticationError.md) | Authentication error thrown when API key is invalid or lacks permissions. |
| [WBAPIError](classes/WBAPIError.md) | Base error class for all Wildberries SDK errors. |
| [PickupOrderNotFoundError](classes/PickupOrderNotFoundError.md) | Error thrown when a pickup order is not found |
| [InvalidOrderStateError](classes/InvalidOrderStateError.md) | Error thrown when an order state transition is invalid |
| [CustomerVerificationError](classes/CustomerVerificationError.md) | Error thrown when customer identity verification fails |
| [MetadataValidationError](classes/MetadataValidationError.md) | Error thrown when product metadata validation fails |
| [NetworkError](classes/NetworkError.md) | Network error thrown for connection failures, timeouts, and server errors. |
| [CampaignNotFoundError](classes/CampaignNotFoundError.md) | Error thrown when a campaign is not found by its ID. |
| [InvalidBidError](classes/InvalidBidError.md) | Error thrown when bid amount is invalid or below minimum. |
| [BudgetExceededError](classes/BudgetExceededError.md) | Error thrown when campaign budget is exceeded or insufficient. |
| [InvalidCampaignStateError](classes/InvalidCampaignStateError.md) | Error thrown when attempting invalid campaign state transitions. |
| [RateLimitError](classes/RateLimitError.md) | Rate limit error thrown when API rate limits are exceeded. |
| [ValidationError](classes/ValidationError.md) | Validation error thrown when request data fails validation. |
| [WildberriesSDK](classes/WildberriesSDK.md) | Main SDK class providing access to all Wildberries API modules. |
| [AnalyticsModule](classes/AnalyticsModule.md) | AnalyticsModule |
| [CommunicationsModule](classes/CommunicationsModule.md) | CommunicationsModule class |
| [FinancesModule](classes/FinancesModule.md) | FinancesModule |
| [GeneralModule](classes/GeneralModule.md) | - |
| [InStorePickupModule](classes/InStorePickupModule.md) | In-Store Pickup (Click & Collect) module |
| [OrdersFBSModule](classes/OrdersFBSModule.md) | Orders FBS (Fulfillment by Seller) module |
| [OrdersFBWModule](classes/OrdersFBWModule.md) | - |
| [ProductsModule](classes/ProductsModule.md) | - |
| [PromotionModule](classes/PromotionModule.md) | - |
| [ReportsModule](classes/ReportsModule.md) | ReportsModule - Generate and retrieve various business reports |
| [TariffsModule](classes/TariffsModule.md) | - |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [RateLimitConfig](interfaces/RateLimitConfig.md) | Configuration for rate limiting a specific endpoint. |
| [SDKConfig](interfaces/SDKConfig.md) | Configuration options for initializing the Wildberries SDK |
| [RequestOptions](interfaces/RequestOptions.md) | Per-request options that can override SDK defaults |
| [AnalyticsPeriod](interfaces/AnalyticsPeriod.md) | Period specification with begin and end timestamps |
| [ConversionMetrics](interfaces/ConversionMetrics.md) | Conversion metrics for sales funnel analysis |
| [PeriodStatistics](interfaces/PeriodStatistics.md) | Period statistics for product card analytics |
| [PeriodComparisonDynamics](interfaces/PeriodComparisonDynamics.md) | Period comparison dynamics (percentage changes) |
| [ProductTag](interfaces/ProductTag.md) | Product card tag information |
| [ProductObject](interfaces/ProductObject.md) | Product object (category) information |
| [CardStatistics](interfaces/CardStatistics.md) | Complete statistics for a product card including period comparison |
| [ProductCardAnalytics](interfaces/ProductCardAnalytics.md) | Product card analytics data |
| [ProductStatisticsRequest](interfaces/ProductStatisticsRequest.md) | Request for product card statistics detail report |
| [ProductStatisticsResponse](interfaces/ProductStatisticsResponse.md) | Response with product card statistics |
| [TimeSeriesDataPoint](interfaces/TimeSeriesDataPoint.md) | Time-series data point for historical analytics |
| [DailyStatistics](interfaces/DailyStatistics.md) | Daily statistics for a product card |
| [HistoricalStatisticsRequest](interfaces/HistoricalStatisticsRequest.md) | Historical statistics request |
| [ProductCardHistory](interfaces/ProductCardHistory.md) | Product card with daily historical statistics |
| [HistoricalStatisticsResponse](interfaces/HistoricalStatisticsResponse.md) | Historical statistics response |
| [GroupedHistory](interfaces/GroupedHistory.md) | Grouped historical statistics (by brand, object, tags) |
| [GroupedHistoricalResponse](interfaces/GroupedHistoricalResponse.md) | Grouped historical statistics response |
| [SearchQueryMetrics](interfaces/SearchQueryMetrics.md) | Search query performance metrics |
| [SearchQueriesResponse](interfaces/SearchQueriesResponse.md) | Search queries response |
| [CategoryPerformanceMetrics](interfaces/CategoryPerformanceMetrics.md) | Category performance metrics |
| [CategoryPerformanceResponse](interfaces/CategoryPerformanceResponse.md) | Category performance response |
| [ProductPerformanceMetrics](interfaces/ProductPerformanceMetrics.md) | Product performance metrics (individual product) |
| [ProductPerformanceResponse](interfaces/ProductPerformanceResponse.md) | Product performance response (for multiple products) |
| [StockHistoryEntry](interfaces/StockHistoryEntry.md) | Individual stock history entry |
| [StockHistoryResponse](interfaces/StockHistoryResponse.md) | Stock history response with time-series summary |
| [CSVFormatOptions](interfaces/CSVFormatOptions.md) | CSV format options for customizing export output |
| [CSVExportRequest](interfaces/CSVExportRequest.md) | CSV export request |
| [CSVExportResponse](interfaces/CSVExportResponse.md) | CSV export initiation response |
| [CSVReport](interfaces/CSVReport.md) | Complete CSV report information with download details |
| [GoodCard](interfaces/GoodCard.md) | Order information attached to a chat message |
| [Chat](interfaces/Chat.md) | Chat conversation object |
| [ChatsResponse](interfaces/ChatsResponse.md) | Response from getChats() method |
| [EventFile](interfaces/EventFile.md) | File attachment in chat event |
| [EventImage](interfaces/EventImage.md) | Image attachment in chat event |
| [EventAttachments](interfaces/EventAttachments.md) | Attachments in chat event message |
| [EventMessage](interfaces/EventMessage.md) | Message content in chat event |
| [ChatEvent](interfaces/ChatEvent.md) | Chat event object Represents a message or activity in the chat conversation |
| [EventsResult](interfaces/EventsResult.md) | Result object containing events and pagination data |
| [EventsResponse](interfaces/EventsResponse.md) | Response from getChatEvents() method |
| [MessageResponse](interfaces/MessageResponse.md) | Response from sendMessage() method |
| [SendMessageRequest](interfaces/SendMessageRequest.md) | Request parameters for sendMessage() method Note: This is sent as multipart/form-data, not JSON |
| [QuestionFilters](interfaces/QuestionFilters.md) | Filter criteria for retrieving product questions |
| [QuestionAnswer](interfaces/QuestionAnswer.md) | Answer to a customer question |
| [QuestionProductDetails](interfaces/QuestionProductDetails.md) | Product information in question |
| [Question](interfaces/Question.md) | Customer question object |
| [QuestionsResponse](interfaces/QuestionsResponse.md) | Response from getQuestions() method |
| [AnswerQuestionRequest](interfaces/AnswerQuestionRequest.md) | Request payload for answering a question Used internally by answerQuestion() method |
| [MarkQuestionViewedRequest](interfaces/MarkQuestionViewedRequest.md) | Request payload for marking question as viewed Used internally by markQuestionViewed() method |
| [ReviewFilters](interfaces/ReviewFilters.md) | Filter criteria for retrieving customer reviews |
| [ReviewAnswer](interfaces/ReviewAnswer.md) | Seller's response to a review |
| [ReviewProductDetails](interfaces/ReviewProductDetails.md) | Product information in review |
| [ReviewPhoto](interfaces/ReviewPhoto.md) | Photo link in review |
| [ReviewVideo](interfaces/ReviewVideo.md) | Video in review |
| [Review](interfaces/Review.md) | Customer review object |
| [ReviewsResponse](interfaces/ReviewsResponse.md) | Response from getReviews() method |
| [RespondToReviewRequest](interfaces/RespondToReviewRequest.md) | Request payload for responding to a review Used by both respondToReview() and editReviewResponse() methods |
| [BalanceResponse](interfaces/BalanceResponse.md) | Balance response from the finance API Returns current account balance information |
| [TransactionFilters](interfaces/TransactionFilters.md) | Transaction filters for querying transaction history |
| [Transaction](interfaces/Transaction.md) | Individual transaction/financial report item Represents a single financial transaction in the report |
| [DocumentCategory](interfaces/DocumentCategory.md) | Document category |
| [DocumentCategoriesResponse](interfaces/DocumentCategoriesResponse.md) | Document categories response |
| [Document](interfaces/Document.md) | Document item |
| [DocumentsListResponse](interfaces/DocumentsListResponse.md) | Documents list response |
| [DocumentDownloadRequest](interfaces/DocumentDownloadRequest.md) | Document download request body |
| [DocumentDownloadResponse](interfaces/DocumentDownloadResponse.md) | Single document download response |
| [DocumentsDownloadResponse](interfaces/DocumentsDownloadResponse.md) | Multiple documents download response |
| [DocumentListFilters](interfaces/DocumentListFilters.md) | Document list query parameters |
| [DateRange](interfaces/DateRange.md) | Date range helper interface Provides convenient date range specification |
| [GenerateReportRequest](interfaces/GenerateReportRequest.md) | Generate report request parameters Input data for initiating report generation |
| [GenerateReportResponse](interfaces/GenerateReportResponse.md) | Generate report response Initial response when report generation is initiated |
| [Report](interfaces/Report.md) | Complete report details Full information about a generated report |
| [ReportDownloadResponse](interfaces/ReportDownloadResponse.md) | Report download response Contains download URL and metadata for completed report |
| [PayoutFilters](interfaces/PayoutFilters.md) | Payout filters for querying payout history Optional parameters for filtering payout list |
| [BankTransferInfo](interfaces/BankTransferInfo.md) | Bank transfer information Details about bank account and transfer |
| [PayoutFeeBreakdown](interfaces/PayoutFeeBreakdown.md) | Payout fee breakdown Detailed breakdown of fees deducted from payout |
| [Payout](interfaces/Payout.md) | Individual payout record Basic payout information in list view |
| [PayoutListResponse](interfaces/PayoutListResponse.md) | Paginated payout list response Response from getPayouts() with pagination metadata |
| [PayoutDetailResponse](interfaces/PayoutDetailResponse.md) | Detailed payout response Complete payout information including fee breakdown |
| [PickupNewOrder](interfaces/PickupNewOrder.md) | New order for in-store pickup |
| [PickupNewOrdersResponse](interfaces/PickupNewOrdersResponse.md) | Response with list of new orders |
| [PickupOrder](interfaces/PickupOrder.md) | Completed order information |
| [PickupOrdersResponse](interfaces/PickupOrdersResponse.md) | Response with list of completed orders (paginated) |
| [PickupOrderStatus](interfaces/PickupOrderStatus.md) | Order status information |
| [PickupOrderStatusesResponse](interfaces/PickupOrderStatusesResponse.md) | Response with order statuses |
| [PickupOrderStatusRequest](interfaces/PickupOrderStatusRequest.md) | Request to get order statuses |
| [PickupOrderClientInfo](interfaces/PickupOrderClientInfo.md) | Customer information for an order |
| [PickupOrderClientInfoResponse](interfaces/PickupOrderClientInfoResponse.md) | Response with customer information |
| [CheckIdentityRequest](interfaces/CheckIdentityRequest.md) | Request to verify customer identity |
| [CheckedIdentity](interfaces/CheckedIdentity.md) | Customer identity verification result |
| [OrderMetadata](interfaces/OrderMetadata.md) | Order metadata |
| [SGTINRequest](interfaces/SGTINRequest.md) | Request to set SGTIN codes |
| [UINRequest](interfaces/UINRequest.md) | Request to set UIN code |
| [IMEIRequest](interfaces/IMEIRequest.md) | Request to set IMEI code |
| [GTINRequest](interfaces/GTINRequest.md) | Request to set GTIN code |
| [PickupAPIError](interfaces/PickupAPIError.md) | API error response |
| [PickupGetOrdersParams](interfaces/PickupGetOrdersParams.md) | Query parameters for getting completed orders |
| [Address](interfaces/Address.md) | Delivery address information |
| [Order](interfaces/Order.md) | FBS Order (сборочное задание - assembly task) |
| [OrderNew](interfaces/OrderNew.md) | New FBS order with additional metadata |
| [OrderStatus](interfaces/OrderStatus.md) | Order status information |
| [OrderFilters](interfaces/OrderFilters.md) | Order filter parameters |
| [GetNewOrdersResponse](interfaces/GetNewOrdersResponse.md) | Response from getNewOrders endpoint |
| [GetOrdersResponse](interfaces/GetOrdersResponse.md) | Response from getOrders endpoint |
| [GetOrderStatusesRequest](interfaces/GetOrderStatusesRequest.md) | Request body for getOrderStatuses endpoint |
| [GetOrderStatusesResponse](interfaces/GetOrderStatusesResponse.md) | Response from getOrderStatuses endpoint |
| [Supply](interfaces/Supply.md) | Supply / Shipment |
| [SupplyFilters](interfaces/SupplyFilters.md) | Supply filter parameters |
| [CreateSupplyRequest](interfaces/CreateSupplyRequest.md) | Request body for createSupply endpoint |
| [CreateSupplyResponse](interfaces/CreateSupplyResponse.md) | Response from createSupply endpoint |
| [GetSuppliesResponse](interfaces/GetSuppliesResponse.md) | Response from getSupplies endpoint |
| [StickerSize](interfaces/StickerSize.md) | Sticker / Label size |
| [StickerOptions](interfaces/StickerOptions.md) | Sticker generation options |
| [OrderSticker](interfaces/OrderSticker.md) | Order shipping label / sticker |
| [GetOrderStickersRequest](interfaces/GetOrderStickersRequest.md) | Request body for getOrderStickers endpoint |
| [GetOrderStickersResponse](interfaces/GetOrderStickersResponse.md) | Response from getOrderStickers endpoint |
| [SupplyBarcode](interfaces/SupplyBarcode.md) | Supply barcode / QR code |
| [FBWTransitTariff](interfaces/FBWTransitTariff.md) | Auto-generated TypeScript types for orders-fbw module Generated from: wildberries_api_doc/07-orders-fbw.yaml |
| [FBWVolumeTariff](interfaces/FBWVolumeTariff.md) | - |
| [FBWBox](interfaces/FBWBox.md) | - |
| [FBWGoodInBox](interfaces/FBWGoodInBox.md) | - |
| [FBWSupplyFilters](interfaces/FBWSupplyFilters.md) | - |
| [FBWGoodInSupply](interfaces/FBWGoodInSupply.md) | - |
| [FBWDateFilter](interfaces/FBWDateFilter.md) | - |
| [FBWSupplyDetails](interfaces/FBWSupplyDetails.md) | - |
| [FBWSupply](interfaces/FBWSupply.md) | - |
| [FBWAcceptanceCoefficient](interfaces/FBWAcceptanceCoefficient.md) | - |
| [FBWWarehouse](interfaces/FBWWarehouse.md) | - |
| [FBWGood](interfaces/FBWGood.md) | - |
| [FBWErrorModel](interfaces/FBWErrorModel.md) | - |
| [FBWAcceptanceOptions](interfaces/FBWAcceptanceOptions.md) | - |
| [StoreContactRequestBody](interfaces/StoreContactRequestBody.md) | Контакты склада продавца |
| [ResponseCardCreate](interfaces/ResponseCardCreate.md) | - |
| [RequestMoveNmsImtConn](interfaces/RequestMoveNmsImtConn.md) | - |
| [RequestMoveNmsImtDisconn](interfaces/RequestMoveNmsImtDisconn.md) | - |
| [ResponseIncorrectDate](interfaces/ResponseIncorrectDate.md) | - |
| [ResponseBodyContentError400](interfaces/ResponseBodyContentError400.md) | - |
| [ResponseBodyContentError403](interfaces/ResponseBodyContentError403.md) | - |
| [ResponseContentError](interfaces/ResponseContentError.md) | - |
| [MediaErrors](interfaces/MediaErrors.md) | - |
| [ResponseError](interfaces/ResponseError.md) | - |
| [RequestAlreadyExistsError](interfaces/RequestAlreadyExistsError.md) | - |
| [TaskCreated](interfaces/TaskCreated.md) | - |
| [Good](interfaces/Good.md) | - |
| [SizeGoodReq](interfaces/SizeGoodReq.md) | - |
| [ClubDiscReq](interfaces/ClubDiscReq.md) | - |
| [GoodsList](interfaces/GoodsList.md) | Размеры товара |
| [SizeGood](interfaces/SizeGood.md) | Информация о размере |
| [GoodBufferHistory](interfaces/GoodBufferHistory.md) | - |
| [GoodHistory](interfaces/GoodHistory.md) | - |
| [SupplierTaskMetadata](interfaces/SupplierTaskMetadata.md) | Данные ответа |
| [SupplierTaskMetadataBuffer](interfaces/SupplierTaskMetadataBuffer.md) | Данные ответа |
| [Error](interfaces/Error.md) | - |
| [QuarantineGoods](interfaces/QuarantineGoods.md) | - |
| [Office](interfaces/Office.md) | Данные о складе WB |
| [Warehouse](interfaces/Warehouse.md) | Данные о складе продавца |
| [ResponsePublicViewerPublicErrorsTableListV2](interfaces/ResponsePublicViewerPublicErrorsTableListV2.md) | - |
| [ModelsErrorTableListPublicRespV2](interfaces/ModelsErrorTableListPublicRespV2.md) | Данные ответа |
| [ModelsErrorTableListPublicRespV2Item](interfaces/ModelsErrorTableListPublicRespV2Item.md) | - |
| [ViewerContractPublicErrorsCursorOutput](interfaces/ViewerContractPublicErrorsCursorOutput.md) | Пагинатор |
| [ModelsErrorSubject](interfaces/ModelsErrorSubject.md) | - |
| [ModelsErrorBrand](interfaces/ModelsErrorBrand.md) | - |
| [RequestPublicViewerPublicErrorsTableListV2](interfaces/RequestPublicViewerPublicErrorsTableListV2.md) | - |
| [SwaggerPublicErrorsCursorInput](interfaces/SwaggerPublicErrorsCursorInput.md) | Пагинатор |
| [SwaggerPublicErrorsOrderV2](interfaces/SwaggerPublicErrorsOrderV2.md) | Порядок выдачи пакетов |
| [ProductCharacteristic](interfaces/ProductCharacteristic.md) | Product characteristic (attribute) with ID and value |
| [ProductDimensions](interfaces/ProductDimensions.md) | Product dimensions and weight |
| [ProductSize](interfaces/ProductSize.md) | Product size information with barcode(s) |
| [UpdateProductSize](interfaces/UpdateProductSize.md) | Product size with chrtID for updates |
| [ProductVariant](interfaces/ProductVariant.md) | Individual product variant within a product card |
| [CreateProductRequest](interfaces/CreateProductRequest.md) | Request body for creating new product cards |
| [UpdateProductRequest](interfaces/UpdateProductRequest.md) | Request body for updating existing product cards |
| [ProductListCursor](interfaces/ProductListCursor.md) | Pagination cursor for product list |
| [ProductListFilter](interfaces/ProductListFilter.md) | Filters for product list |
| [ProductListRequest](interfaces/ProductListRequest.md) | Request body for listing product cards with filtering and pagination |
| [ProductCard](interfaces/ProductCard.md) | Full product card response |
| [ProductListResponse](interfaces/ProductListResponse.md) | Response from listing product cards |
| [ProductOperationResponse](interfaces/ProductOperationResponse.md) | Response from create/update/delete operations |
| [MediaUploadResponse](interfaces/MediaUploadResponse.md) | Media upload response from WB API |
| [MediaSaveRequest](interfaces/MediaSaveRequest.md) | Request body for uploading media via URLs |
| [PricingUpdate](interfaces/PricingUpdate.md) | Pricing update for single product |
| [PricingUpdateRequest](interfaces/PricingUpdateRequest.md) | Request body for bulk pricing updates |
| [PricingTaskResponse](interfaces/PricingTaskResponse.md) | Response from pricing update operation |
| [PricingInfo](interfaces/PricingInfo.md) | Current pricing information for a product |
| [GetPricingResponse](interfaces/GetPricingResponse.md) | Response from getPricing() method |
| [PricingTaskStatusResponse](interfaces/PricingTaskStatusResponse.md) | Pricing task status response |
| [WarehouseCreateRequest](interfaces/WarehouseCreateRequest.md) | Request to create seller warehouse bound to WB office |
| [WarehouseUpdateRequest](interfaces/WarehouseUpdateRequest.md) | Request to update seller warehouse details |
| [WarehouseCreateResponse](interfaces/WarehouseCreateResponse.md) | Response from warehouse creation |
| [StockUpdate](interfaces/StockUpdate.md) | Single SKU stock update |
| [StockInfo](interfaces/StockInfo.md) | Stock information for a product |
| [GetStockRequest](interfaces/GetStockRequest.md) | Request to get stock levels |
| [GetStockResponse](interfaces/GetStockResponse.md) | Response from get stock operation |
| [UpdateStockRequest](interfaces/UpdateStockRequest.md) | Request to update stock quantities (bulk operation) |
| [DeleteStockRequest](interfaces/DeleteStockRequest.md) | Request to delete stock records (bulk operation) |
| [Response400](interfaces/Response400.md) | Auto-generated TypeScript types for promotion module Generated from: wildberries_api_doc/08-promotion.yaml |
| [StandardizedBatchError](interfaces/StandardizedBatchError.md) | - |
| [V0GetConfigCategoriesResponse](interfaces/V0GetConfigCategoriesResponse.md) | - |
| [V0AdvertMultiBidItem](interfaces/V0AdvertMultiBidItem.md) | - |
| [V0AdvertMultibid](interfaces/V0AdvertMultibid.md) | - |
| [ResponseWithReturn](interfaces/ResponseWithReturn.md) | - |
| [ResponseInfoAdvert](interfaces/ResponseInfoAdvert.md) | - |
| [ResponseInfoAdvertType8](interfaces/ResponseInfoAdvertType8.md) | - |
| [ResponseInfoAdvertType9](interfaces/ResponseInfoAdvertType9.md) | - |
| [ResponseAdvError1](interfaces/ResponseAdvError1.md) | - |
| [PromotionsGoodsList](interfaces/PromotionsGoodsList.md) | - |
| [GetAuctionAdverts](interfaces/GetAuctionAdverts.md) | - |
| [AuctionAdvertNMsSettings](interfaces/AuctionAdvertNMsSettings.md) | - |
| [AuctionAdvertSubject](interfaces/AuctionAdvertSubject.md) | Предмет |
| [AuctionAdvertBids](interfaces/AuctionAdvertBids.md) | Ставки |
| [AuctionAdvertSettings](interfaces/AuctionAdvertSettings.md) | Настройки кампании |
| [Timestamps](interfaces/Timestamps.md) | Временные отметки |
| [StatInterval](interfaces/StatInterval.md) | - |
| [StatDate](interfaces/StatDate.md) | - |
| [Stat](interfaces/Stat.md) | - |
| [StatsBlok1](interfaces/StatsBlok1.md) | - |
| [StatsBlok2](interfaces/StatsBlok2.md) | - |
| [RequestWithDate](interfaces/RequestWithDate.md) | - |
| [RequestWithCampaignID](interfaces/RequestWithCampaignID.md) | - |
| [RequestWithInterval](interfaces/RequestWithInterval.md) | - |
| [V0KeywordsStatistic](interfaces/V0KeywordsStatistic.md) | - |
| [V0KeywordsStatistics](interfaces/V0KeywordsStatistics.md) | - |
| [V0KeywordsStatisticsResponse](interfaces/V0KeywordsStatisticsResponse.md) | - |
| [ErrorResponse](interfaces/ErrorResponse.md) | - |
| [FullStatsItem](interfaces/FullStatsItem.md) | Статистика по одной кампании за период, указанный в запросе. По всем артикулам WB и платформам |
| [FullStatsError](interfaces/FullStatsError.md) | Ошибка |
| [IncomesItem](interfaces/IncomesItem.md) | Inbound shipment item from warehouses |
| [StocksItem](interfaces/StocksItem.md) | Stock level item across WB warehouses |
| [OrdersItem](interfaces/OrdersItem.md) | Order item information |
| [SalesItem](interfaces/SalesItem.md) | Sales and returns item |
| [ExciseReportRequest](interfaces/ExciseReportRequest.md) | Request body for excise/marked goods report |
| [ExciseReportDataItem](interfaces/ExciseReportDataItem.md) | Excise report data item |
| [ExciseReportResponse](interfaces/ExciseReportResponse.md) | Excise report response |
| [WarehouseRemainsParams](interfaces/WarehouseRemainsParams.md) | Parameters for warehouse remains report generation |
| [ReportTaskResponse](interfaces/ReportTaskResponse.md) | Async report task response |
| [ReportsReportStatus](interfaces/ReportsReportStatus.md) | Report generation status |
| [ResponseErrorStatistics](interfaces/ResponseErrorStatistics.md) | Error response format 1 |
| [ResponseErrorStatistics2](interfaces/ResponseErrorStatistics2.md) | Error response format 2 |
| [ErrorResponse4xx](interfaces/ErrorResponse4xx.md) | 4xx error response |
| [ModelsTariffsBoxResponse](interfaces/ModelsTariffsBoxResponse.md) | Auto-generated TypeScript types for tariffs module Generated from: wildberries_api_doc/10-tariffs.yaml |
| [ModelsWarehousesBoxRates](interfaces/ModelsWarehousesBoxRates.md) | - |
| [ModelsWarehouseBoxRates](interfaces/ModelsWarehouseBoxRates.md) | - |
| [ModelsTariffsPalletResponse](interfaces/ModelsTariffsPalletResponse.md) | - |
| [ModelsWarehousesPalletRates](interfaces/ModelsWarehousesPalletRates.md) | - |
| [ModelsWarehousePalletRates](interfaces/ModelsWarehousePalletRates.md) | - |
| [ModelsReturnTariffsResponse](interfaces/ModelsReturnTariffsResponse.md) | - |
| [ModelsWarehousesReturnRates](interfaces/ModelsWarehousesReturnRates.md) | - |
| [ModelsWarehouseReturnRates](interfaces/ModelsWarehouseReturnRates.md) | - |
| [TariffsBoxResponse](interfaces/TariffsBoxResponse.md) | - |
| [TariffsPalletResponse](interfaces/TariffsPalletResponse.md) | - |
| [ReturnTariffsResponse](interfaces/ReturnTariffsResponse.md) | - |
| [Commission](interfaces/Commission.md) | - |
| [CommissionChina](interfaces/CommissionChina.md) | - |
| [CommissionTurkey](interfaces/CommissionTurkey.md) | - |
| [CommissionUzbekistan](interfaces/CommissionUzbekistan.md) | - |
| [CommissionUAE](interfaces/CommissionUAE.md) | - |
| [BadRequest](interfaces/BadRequest.md) | - |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [EndpointLimits](type-aliases/EndpointLimits.md) | Mapping of endpoint keys to their rate limit configurations. |
| [AnalyticsReportTypeEnum](type-aliases/AnalyticsReportTypeEnum.md) | Report type for CSV generation |
| [StockChangeReason](type-aliases/StockChangeReason.md) | Stock change reason enumeration |
| [AnalyticsReportType](type-aliases/AnalyticsReportType.md) | Analytics report type enumeration |
| [CSVReportStatus](type-aliases/CSVReportStatus.md) | CSV report status tracking (alias for convenience) |
| [TransactionType](type-aliases/TransactionType.md) | Transaction type enum Represents different types of financial transactions |
| [ReportPeriod](type-aliases/ReportPeriod.md) | Period filter for reports |
| [TransactionListResponse](type-aliases/TransactionListResponse.md) | Paginated list of transactions/financial report items |
| [TransactionDetailResponse](type-aliases/TransactionDetailResponse.md) | Single transaction detail response Returns complete details for a specific transaction Currently identical to Transaction as the API returns the same structure |
| [FinancialReportType](type-aliases/FinancialReportType.md) | Financial report type enumeration Represents different types of financial reports available |
| [ReportFormat](type-aliases/ReportFormat.md) | Report output format enumeration Supported file formats for generated reports |
| [ReportStatus](type-aliases/ReportStatus.md) | Report status enumeration Lifecycle states of a generated report |
| [PayoutStatus](type-aliases/PayoutStatus.md) | Payout status enumeration Lifecycle states of a payout transaction |
| [SupplierStatus](type-aliases/SupplierStatus.md) | Seller-controlled order status |
| [WBStatus](type-aliases/WBStatus.md) | Wildberries system-controlled order status |
| [StickerFormat](type-aliases/StickerFormat.md) | Sticker / Label format |
| [BarcodeType](type-aliases/BarcodeType.md) | Barcode / QR code format |
| [FBWSupplyStatus](type-aliases/FBWSupplyStatus.md) | - |
| [StocksWarehouseError](type-aliases/StocksWarehouseError.md) | - |
| [Goods](type-aliases/Goods.md) | Товары, цены и скидки для них. Максимум 1 000 товаров. Цена и скидка не могут быть пустыми одновременно. |
| [SizeGoodsBody](type-aliases/SizeGoodsBody.md) | Размеры и цены для них. Максимум 1 000 размеров. |
| [ClubDisc](type-aliases/ClubDisc.md) | Товары и скидки WB Клуба для них. Максимум 1 000 товаров. |
| [Date](type-aliases/Date.md) | Дата и время, когда загрузка создана |
| [Date1](type-aliases/Date1.md) | Дата и время, когда загрузка отправляется в обработку |
| [TaskStatus](type-aliases/TaskStatus.md) | Статус загрузки: * `3` — обработана, в товарах нет ошибок, цены и скидки обновились * `4` — отменена * `5` — обработана, но в товарах есть ошибки. Для товаров без ошибок цены и скидки обновились, а ошибки в остальных товарах можно получить с помощью метода [Детализация обработанной загрузки](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get) * `6` — обработана, но во всех товарах есть ошибки. Их тоже можно получить с помощью метода [Детализация обработанной загрузки](./work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get) |
| [TaskStatusBuffer](type-aliases/TaskStatusBuffer.md) | Статус загрузки: `1` — в обработке |
| [GoodStatus](type-aliases/GoodStatus.md) | Статус товара: * `2` — товар без ошибок, цена и/или скидка обновилась * `3` — есть ошибки, данные не обновились |
| [GoodStatusBuffer](type-aliases/GoodStatusBuffer.md) | Статус товара: `1` — в обработке |
| [CreateProductResponse](type-aliases/CreateProductResponse.md) | Type alias for create product response |
| [UpdateProductResponse](type-aliases/UpdateProductResponse.md) | Type alias for update product response |
| [DeleteProductResponse](type-aliases/DeleteProductResponse.md) | Type alias for delete product response |
| [PlacementType](type-aliases/PlacementType.md) | Места размещения: - `search` — поиск - `recommendation` — рекомендации - `combined` — поиск и рекомендации |
| [DailyStats1](type-aliases/DailyStats1.md) | - |
| [Stats1](type-aliases/Stats1.md) | - |
| [DailyStats2](type-aliases/DailyStats2.md) | - |
| [Stats2](type-aliases/Stats2.md) | - |
| [Days](type-aliases/Days.md) | Статистка по дням |
| [BoosterStats](type-aliases/BoosterStats.md) | Статистика по средней позиции товара на страницах поисковой выдачи и каталога (для кампаний с единой ставкой) |
| [ResponseWithInterval](type-aliases/ResponseWithInterval.md) | Ответ при запросе с interval |
| [ResponseWithDate](type-aliases/ResponseWithDate.md) | Ответ при запросе с dates |
| [ResponseFullStats](type-aliases/ResponseFullStats.md) | Статистика по кампаниям за период, указанный в запросе. По всем артикулам WB и платформам |
| [DaysV3](type-aliases/DaysV3.md) | Статистка по дням |
| [BoosterStatsV3](type-aliases/BoosterStatsV3.md) | Статистика по средней позиции товара (для кампаний с единой ставкой) |
| [ReportType](type-aliases/ReportType.md) | Report type discriminator for async operations |

## Variables

| Variable | Description |
| ------ | ------ |
| [generalRateLimits](variables/generalRateLimits.md) | - |
| [ordersFBSRateLimits](variables/ordersFBSRateLimits.md) | - |
| [ordersFBWRateLimits](variables/ordersFBWRateLimits.md) | - |
| [promotionRateLimits](variables/promotionRateLimits.md) | - |
| [ALL\_RATE\_LIMITS](variables/ALL_RATE_LIMITS.md) | Aggregated rate limit configuration for all SDK modules. |
| [tariffsRateLimits](variables/tariffsRateLimits.md) | - |
| [version](variables/version.md) | SDK version |

## References

### default

Renames and re-exports [WildberriesSDK](classes/WildberriesSDK.md)
