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
| [ProblemJsonFields](interfaces/ProblemJsonFields.md) | Parsed fields from an RFC 7807 problem+json error response. |
| [RetryConfig](interfaces/RetryConfig.md) | Configuration options for retry behavior |
| [RetryOptions](interfaces/RetryOptions.md) | Options for controlling retry behavior per-operation |
| [MainRequest](interfaces/MainRequest.md) | Параметры запроса для формирования главной страницы: - `currentPeriod` — текущий период - `pastPeriod` — предыдущий период для сравнения |
| [MainResponse](interfaces/MainResponse.md) | - |
| [CommonInfo](interfaces/CommonInfo.md) | - |
| [PositionInfo](interfaces/PositionInfo.md) | Информация о позиции товара |
| [SearchReportPositionChartItem](interfaces/SearchReportPositionChartItem.md) | - |
| [SearchReportPositionClusters](interfaces/SearchReportPositionClusters.md) | Количество товаров со средней позицией в поиске: - `firstHundred` — от 1 до 100 - `secondHundred` — от 101 до 200 - `below` — от 201 и ниже |
| [VisibilityInfo](interfaces/VisibilityInfo.md) | Видимость карточек и переходы в карточки. По дням, неделям, месяцам |
| [TableGroupItem](interfaces/TableGroupItem.md) | К группе товаров относятся все карточки, подходящие хотя бы по одному из параметров: - `subjectName` — название предмета - `brandName` — бренд - `tagName` — название ярлыка |
| [TableProductItem](interfaces/TableProductItem.md) | Товар в группе для отчёта по поисковым запросам |
| [TableGroupRequest](interfaces/TableGroupRequest.md) | Параметры запроса для пагинации по группам: - `currentPeriod` — текущий период - `pastPeriod` — предыдущий период для сравнения |
| [TableGroupResponse](interfaces/TableGroupResponse.md) | - |
| [TableDetailsRequest](interfaces/TableDetailsRequest.md) | Параметры запроса для пагинации по товарам в группе: - `currentPeriod` — текущий период - `pastPeriod` — предыдущий период для сравнения |
| [TableDetailsResponse](interfaces/TableDetailsResponse.md) | - |
| [ProductSearchTextsRequest](interfaces/ProductSearchTextsRequest.md) | Параметры для запроса по рейтингу поисковых запросов: - `currentPeriod` — текущий период - `pastPeriod` — предыдущий период для сравнения |
| [ProductSearchTextsResponse](interfaces/ProductSearchTextsResponse.md) | - |
| [TableSearchTextItem](interfaces/TableSearchTextItem.md) | - |
| [ProductOrdersRequest](interfaces/ProductOrdersRequest.md) | - |
| [ProductOrdersResponse](interfaces/ProductOrdersResponse.md) | - |
| [ProductOrdersTextItem](interfaces/ProductOrdersTextItem.md) | - |
| [ProductOrdersMetrics](interfaces/ProductOrdersMetrics.md) | - |
| [OrderBy](interfaces/OrderBy.md) | Параметры сортировки |
| [OrderByGrTe](interfaces/OrderByGrTe.md) | Параметры сортировки |
| [PeriodOrdersRequest](interfaces/PeriodOrdersRequest.md) | Текущий период. Максимум 7 суток |
| [Period](interfaces/Period.md) | Текущий период |
| [PastPeriod](interfaces/PastPeriod.md) | Прошлый период для сравнения. Количество дней — меньше или равно `currentPeriod` |
| [CommonResponseProperties](interfaces/CommonResponseProperties.md) | Результат запроса |
| [SalesFunnelProductReq](interfaces/SalesFunnelProductReq.md) | - |
| [SalesFunnelGroupReq](interfaces/SalesFunnelGroupReq.md) | - |
| [SearchReportGroupReq](interfaces/SearchReportGroupReq.md) | - |
| [SearchReportProductReq](interfaces/SearchReportProductReq.md) | - |
| [SearchReportTextReq](interfaces/SearchReportTextReq.md) | - |
| [StocksReportReq](interfaces/StocksReportReq.md) | - |
| [NmReportRetryReportRequest](interfaces/NmReportRetryReportRequest.md) | - |
| [NmReportCreateReportResponse](interfaces/NmReportCreateReportResponse.md) | - |
| [NmReportGetReportsResponse](interfaces/NmReportGetReportsResponse.md) | - |
| [NmReportRetryReportResponse](interfaces/NmReportRetryReportResponse.md) | - |
| [CommonReportFilters](interfaces/CommonReportFilters.md) | Общие фильтры по отчёту |
| [PeriodSt](interfaces/PeriodSt.md) | Период |
| [TableOrderBy](interfaces/TableOrderBy.md) | Вид сортировки данных |
| [TableGroupResponseSt](interfaces/TableGroupResponseSt.md) | - |
| [TableGroupItemSt](interfaces/TableGroupItemSt.md) | Данные по группе |
| [TableCommonMetrics](interfaces/TableCommonMetrics.md) | Метрики |
| [FloatGraphByPeriodItem](interfaces/FloatGraphByPeriodItem.md) | Среднее количество заказов за месяц |
| [TableProductItemSt](interfaces/TableProductItemSt.md) | Данные по товару |
| [CommonProductFilters](interfaces/CommonProductFilters.md) | Общие фильтры по товару |
| [TableProductResponse](interfaces/TableProductResponse.md) | - |
| [CommonSizeFilters](interfaces/CommonSizeFilters.md) | Общие фильтры по размеру |
| [TableSizeResponse](interfaces/TableSizeResponse.md) | - |
| [TableOfficeItem](interfaces/TableOfficeItem.md) | Данные по складу |
| [CommonShippingOfficeFilters](interfaces/CommonShippingOfficeFilters.md) | Общие фильтры по регионам отгрузки |
| [TableShippingOfficeResponse](interfaces/TableShippingOfficeResponse.md) | - |
| [TableShippingOfficeItem](interfaces/TableShippingOfficeItem.md) | Данные по региону отгрузки |
| [TableShippingOfficeMetrics](interfaces/TableShippingOfficeMetrics.md) | Общие метрики по регионам/складам отгрузки |
| [DatePeriod](interfaces/DatePeriod.md) | Период дат для v3 Sales Funnel запросов |
| [SalesFunnelOrderBy](interfaces/SalesFunnelOrderBy.md) | Параметры сортировки для v3 Sales Funnel |
| [SalesFunnelTag](interfaces/SalesFunnelTag.md) | Ярлык товара (v3) |
| [SalesFunnelTimeToReady](interfaces/SalesFunnelTimeToReady.md) | Среднее время доставки |
| [SalesFunnelConversions](interfaces/SalesFunnelConversions.md) | Конверсии |
| [SalesFunnelWbClubMetrics](interfaces/SalesFunnelWbClubMetrics.md) | Статистика WB Клуба |
| [SalesFunnelWbClubMetricsDynamic](interfaces/SalesFunnelWbClubMetricsDynamic.md) | Динамика статистики WB Клуба |
| [SalesFunnelProductsRequest](interfaces/SalesFunnelProductsRequest.md) | Запрос списка товаров воронки продаж v3 (Swagger: ProductsRequest) |
| [SalesFunnelProductsHistoryRequest](interfaces/SalesFunnelProductsHistoryRequest.md) | Запрос истории по товарам воронки продаж v3 (Swagger: ProductHistoryRequest) |
| [SalesFunnelGroupedHistoryRequest](interfaces/SalesFunnelGroupedHistoryRequest.md) | Запрос сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryRequest) |
| [SalesFunnelProduct](interfaces/SalesFunnelProduct.md) | Карточка товара v3 (Swagger: Product) |
| [SalesFunnelHistoryProduct](interfaces/SalesFunnelHistoryProduct.md) | Облегчённая карточка товара для истории v3 (Swagger: HistoryProduct) |
| [SalesFunnelStatistic](interfaces/SalesFunnelStatistic.md) | Статистика за период v3 (Swagger: Statistic) |
| [SalesFunnelComparison](interfaces/SalesFunnelComparison.md) | Сравнение двух периодов v3 (Swagger: Comparison) |
| [SalesFunnelStatistics](interfaces/SalesFunnelStatistics.md) | Статистика по периодам v3 (Swagger: Statistics) |
| [SalesFunnelHistory](interfaces/SalesFunnelHistory.md) | Запись истории v3 (Swagger: History) — использует `date` вместо `dt` |
| [SalesFunnelProductsResponse](interfaces/SalesFunnelProductsResponse.md) | Ответ списка товаров воронки продаж v3 (Swagger: ProductsResponse) |
| [PinnedReviewError](interfaces/PinnedReviewError.md) | Error details for pinned reviews operations |
| [PinReviewItem](interfaces/PinReviewItem.md) | Request item for pinning a review |
| [PinReviewItemResultData](interfaces/PinReviewItemResultData.md) | Result item from pin operation |
| [PinnedReviewItemResult](interfaces/PinnedReviewItemResult.md) | Detailed information about a pinned/unpinned review |
| [PinnedReviewsCreateResponse](interfaces/PinnedReviewsCreateResponse.md) | Response from pin reviews operation |
| [PinnedReviewsDeleteResponse](interfaces/PinnedReviewsDeleteResponse.md) | Response from unpin reviews operation |
| [PinnedReviewsListParams](interfaces/PinnedReviewsListParams.md) | Parameters for listing pinned/unpinned reviews |
| [PinnedReviewsListResponse](interfaces/PinnedReviewsListResponse.md) | Response from list pinned/unpinned reviews |
| [PinnedReviewsCountParams](interfaces/PinnedReviewsCountParams.md) | Parameters for counting pinned/unpinned reviews |
| [PinnedReviewsCountResponse](interfaces/PinnedReviewsCountResponse.md) | Response from count pinned/unpinned reviews |
| [SellerLimit](interfaces/SellerLimit.md) | Seller limit details for pinned reviews |
| [SellerLimitsData](interfaces/SellerLimitsData.md) | Seller limits data for subscription and tariff |
| [PinnedReviewsLimitsResponse](interfaces/PinnedReviewsLimitsResponse.md) | Response from get pinned reviews limits |
| [LastMessage](interfaces/LastMessage.md) | Информация о последнем сообщении в чате |
| [Chat](interfaces/Chat.md) | - |
| [ChatsResponse](interfaces/ChatsResponse.md) | - |
| [Event](interfaces/Event.md) | - |
| [EventAttachments](interfaces/EventAttachments.md) | Вложения |
| [File](interfaces/File.md) | - |
| [GoodCard](interfaces/GoodCard.md) | Информация о заказе |
| [Image](interfaces/Image.md) | Изображение |
| [MessageResponse](interfaces/MessageResponse.md) | - |
| [EventsResponse](interfaces/EventsResponse.md) | - |
| [EventsResult](interfaces/EventsResult.md) | - |
| [AccountBalanceResponse](interfaces/AccountBalanceResponse.md) | Response from the balance endpoint |
| [RequestDownload](interfaces/RequestDownload.md) | - |
| [GetCategories](interfaces/GetCategories.md) | - |
| [GetList](interfaces/GetList.md) | - |
| [GetDoc](interfaces/GetDoc.md) | - |
| [GetDocs](interfaces/GetDocs.md) | - |
| [DetailReportItem](interfaces/DetailReportItem.md) | - |
| [PingResponse](interfaces/PingResponse.md) | Response structure for ping endpoint |
| [NewsItem](interfaces/NewsItem.md) | News item structure from news endpoint |
| [NewsTag](interfaces/NewsTag.md) | News tag structure |
| [NewsResponse](interfaces/NewsResponse.md) | Response structure for news endpoint |
| [NewsRequestParams](interfaces/NewsRequestParams.md) | Parameters for news endpoint request |
| [SellerInfoResponse](interfaces/SellerInfoResponse.md) | Response structure for seller info endpoint |
| [AccessItem](interfaces/AccessItem.md) | Access permission item |
| [InviteInfo](interfaces/InviteInfo.md) | Invite information |
| [CreateInviteRequest](interfaces/CreateInviteRequest.md) | Request to create user invitation |
| [CreateInviteResponse](interfaces/CreateInviteResponse.md) | Response from create invitation endpoint |
| [InviteeInfo](interfaces/InviteeInfo.md) | Invitee information (for invited users) |
| [UserInfo](interfaces/UserInfo.md) | User information |
| [GetUsersParams](interfaces/GetUsersParams.md) | Parameters for getting users list |
| [GetUsersResponse](interfaces/GetUsersResponse.md) | Response from get users endpoint |
| [UserAccessUpdate](interfaces/UserAccessUpdate.md) | User access update item |
| [UpdateUserAccessRequest](interfaces/UpdateUserAccessRequest.md) | Request to update user access |
| [ApiCheckedIdentity](interfaces/ApiCheckedIdentity.md) | Auto-generated TypeScript types for in-store-pickup module Generated from: wildberries_api_doc/06-in-store-pickup.yaml |
| [ApiCheckIdentityRequest](interfaces/ApiCheckIdentityRequest.md) | - |
| [ApiGTINRequest](interfaces/ApiGTINRequest.md) | - |
| [ApiIMEIRequest](interfaces/ApiIMEIRequest.md) | - |
| [ApiNewOrder](interfaces/ApiNewOrder.md) | - |
| [ApiNewOrders](interfaces/ApiNewOrders.md) | - |
| [ApiOrder](interfaces/ApiOrder.md) | - |
| [ApiOrderClientInfo](interfaces/ApiOrderClientInfo.md) | - |
| [ApiOrderClientInfoResp](interfaces/ApiOrderClientInfoResp.md) | - |
| [ApiOrderStatus](interfaces/ApiOrderStatus.md) | - |
| [ApiOrderStatuses](interfaces/ApiOrderStatuses.md) | - |
| [ApiOrders](interfaces/ApiOrders.md) | - |
| [ApiOrdersMeta](interfaces/ApiOrdersMeta.md) | - |
| [ApiOrdersRequest](interfaces/ApiOrdersRequest.md) | - |
| [ApiSGTINsRequest](interfaces/ApiSGTINsRequest.md) | - |
| [ApiUINRequest](interfaces/ApiUINRequest.md) | - |
| [ApiBaseMeta](interfaces/ApiBaseMeta.md) | - |
| [DBSAddress](interfaces/DBSAddress.md) | Address information for DBS delivery Contains full address and GPS coordinates for delivery routing |
| [DBSOrderNew](interfaces/DBSOrderNew.md) | New DBS order (assembly task) awaiting processing Contains delivery window, customer address, and required metadata |
| [DBSOrder](interfaces/DBSOrder.md) | Completed DBS order information Returned by getOrders for completed/cancelled orders |
| [DBSClientInfo](interfaces/DBSClientInfo.md) | Customer contact information for DBS orders Returned by getClientInfo |
| [DBSOrderStatusBulk](interfaces/DBSOrderStatusBulk.md) | Order status from bulk status info endpoint |
| [StatusSetResponse](interfaces/StatusSetResponse.md) | Response item for bulk status change operations |
| [OrderCodeRequest](interfaces/OrderCodeRequest.md) | Request item for receive/reject operations requiring confirmation code |
| [B2BInfoResult](interfaces/B2BInfoResult.md) | B2B buyer information result |
| [GetNewOrdersResponse](interfaces/GetNewOrdersResponse.md) | Response from getNewOrders |
| [GetOrdersParams](interfaces/GetOrdersParams.md) | Parameters for getOrders |
| [GetOrdersResponse](interfaces/GetOrdersResponse.md) | Response from getOrders |
| [GetClientInfoResponse](interfaces/GetClientInfoResponse.md) | Response from getClientInfo |
| [GetStatusInfoResponse](interfaces/GetStatusInfoResponse.md) | Response from bulk status info endpoint |
| [BulkStatusChangeResponse](interfaces/BulkStatusChangeResponse.md) | Response from bulk status change operations |
| [GetB2BInfoResponse](interfaces/GetB2BInfoResponse.md) | Response from B2B info endpoint |
| [OrderGroupsRequest](interfaces/OrderGroupsRequest.md) | Request body for getGroupsInfo Used to query order group information |
| [OrderGroup](interfaces/OrderGroup.md) | A single order group containing related orders |
| [OrderGroupsResponse](interfaces/OrderGroupsResponse.md) | Response from getGroupsInfo |
| [DeliveryDatesRequest](interfaces/DeliveryDatesRequest.md) | Request body for getDeliveryDates Used to query delivery date information for orders |
| [DeliveryDateInfo](interfaces/DeliveryDateInfo.md) | Delivery date information for a single order |
| [DeliveryDatesInfoResponse](interfaces/DeliveryDatesInfoResponse.md) | Response from getDeliveryDates |
| [GetMetaBulkRequest](interfaces/GetMetaBulkRequest.md) | Request body for getMetaBulk |
| [BulkOrderMeta](interfaces/BulkOrderMeta.md) | Metadata for a single order in bulk response |
| [GetOrderMetaBulkResponse](interfaces/GetOrderMetaBulkResponse.md) | Response from getMetaBulk |
| [DeleteMetaBulkRequest](interfaces/DeleteMetaBulkRequest.md) | Request body for deleteMetaBulk |
| [DeleteMetaBulkResponse](interfaces/DeleteMetaBulkResponse.md) | Response from deleteMetaBulk |
| [SetSgtinBulkRequest](interfaces/SetSgtinBulkRequest.md) | Request body for setSgtinBulk |
| [SetUinBulkRequest](interfaces/SetUinBulkRequest.md) | Request body for setUinBulk |
| [SetImeiBulkRequest](interfaces/SetImeiBulkRequest.md) | Request body for setImeiBulk |
| [SetGtinBulkRequest](interfaces/SetGtinBulkRequest.md) | Request body for setGtinBulk |
| [SetCustomsDeclarationBulkRequest](interfaces/SetCustomsDeclarationBulkRequest.md) | Request body for setCustomsDeclarationBulk |
| [BulkMetaResultItem](interfaces/BulkMetaResultItem.md) | Result item for a single order in bulk metadata set response |
| [BulkMetaError](interfaces/BulkMetaError.md) | Error detail for a single order in bulk metadata operations |
| [SetMetaBulkResponse](interfaces/SetMetaBulkResponse.md) | Response from bulk metadata set operations (setSgtinBulk, setUinBulk, etc.) |
| [GetOrdersParams](interfaces/GetOrdersParams-1.md) | Parameters for paginated order listing |
| [StickerRequest](interfaces/StickerRequest.md) | Request body for retrieving order stickers |
| [StickerParams](interfaces/StickerParams.md) | Query parameters for sticker format and dimensions |
| [CrossBorderStickerRequest](interfaces/CrossBorderStickerRequest.md) | Request body for cross-border order stickers |
| [StatusHistoryRequest](interfaces/StatusHistoryRequest.md) | Request body for cross-border status history lookup |
| [DeleteMetaParams](interfaces/DeleteMetaParams.md) | Query parameters for deleting order metadata by key |
| [MetaSgtinRequest](interfaces/MetaSgtinRequest.md) | Request body for attaching SGTIN marking codes to an order |
| [MetaUinRequest](interfaces/MetaUinRequest.md) | Request body for attaching a UIN to an order |
| [MetaImeiRequest](interfaces/MetaImeiRequest.md) | Request body for attaching an IMEI to an order |
| [MetaGtinRequest](interfaces/MetaGtinRequest.md) | Request body for attaching a GTIN to an order |
| [MetaExpirationRequest](interfaces/MetaExpirationRequest.md) | Request body for attaching an expiration date to an order |
| [MetaCustomsDeclarationRequest](interfaces/MetaCustomsDeclarationRequest.md) | Request body for attaching a customs declaration number to an order |
| [SupplyCreateRequest](interfaces/SupplyCreateRequest.md) | Request body for creating a new supply |
| [AddOrdersToSupplyRequest](interfaces/AddOrdersToSupplyRequest.md) | Request body for adding orders to a supply |
| [TrbxCreateRequest](interfaces/TrbxCreateRequest.md) | Request body for creating boxes (trbx) in a supply |
| [TrbxDeleteRequest](interfaces/TrbxDeleteRequest.md) | Request body for deleting boxes from a supply |
| [TrbxStickerRequest](interfaces/TrbxStickerRequest.md) | Request body for retrieving box stickers |
| [PassCreateRequest](interfaces/PassCreateRequest.md) | Request body for creating a seller pass |
| [PassCreateResponse](interfaces/PassCreateResponse.md) | Response after creating a seller pass |
| [GetSuppliesParams](interfaces/GetSuppliesParams.md) | Query parameters for fetching supplies list |
| [BarcodeParams](interfaces/BarcodeParams.md) | Query parameters for sticker/barcode format |
| [GetMetaMultiRequest](interfaces/GetMetaMultiRequest.md) | Request body for retrieving metadata of multiple orders (max 100) |
| [OrdersRequestAPI](interfaces/OrdersRequestAPI.md) | Generic order IDs request body used across multiple endpoints |
| [OrdersNewResponse](interfaces/OrdersNewResponse.md) | Response containing a list of new (unprocessed) orders |
| [OrdersResponse](interfaces/OrdersResponse.md) | Paginated response containing orders |
| [OrderStatusItem](interfaces/OrderStatusItem.md) | Individual order status entry |
| [OrderStatusResponse](interfaces/OrderStatusResponse.md) | Response containing order statuses |
| [ReshipmentResponse](interfaces/ReshipmentResponse.md) | Response containing orders that require reshipment |
| [ReshipmentOrder](interfaces/ReshipmentOrder.md) | An order that requires reshipment |
| [StickerItem](interfaces/StickerItem.md) | Individual sticker data item |
| [StickerResponse](interfaces/StickerResponse.md) | Response containing order stickers |
| [CrossBorderStickerItem](interfaces/CrossBorderStickerItem.md) | Individual cross-border sticker data item |
| [CrossBorderStickerResponse](interfaces/CrossBorderStickerResponse.md) | Response containing cross-border order stickers |
| [StatusHistoryEntry](interfaces/StatusHistoryEntry.md) | Individual status entry in status history |
| [StatusHistoryItem](interfaces/StatusHistoryItem.md) | Individual order status history item |
| [StatusHistoryResponse](interfaces/StatusHistoryResponse.md) | Response containing cross-border status history |
| [OrdersMetaResponse](interfaces/OrdersMetaResponse.md) | Response containing metadata for multiple orders |
| [OrderMetaItem](interfaces/OrderMetaItem.md) | A single order's metadata entry (used in bulk metadata responses) |
| [SupplyCreateResponse](interfaces/SupplyCreateResponse.md) | Response after creating a new supply |
| [SuppliesResponse](interfaces/SuppliesResponse.md) | Paginated response containing supplies |
| [SupplyOrderIdsResponse](interfaces/SupplyOrderIdsResponse.md) | Response containing order IDs within a supply |
| [BarcodeResponse](interfaces/BarcodeResponse.md) | Response containing a supply barcode / QR code |
| [TrbxListResponse](interfaces/TrbxListResponse.md) | Response containing a list of supply boxes |
| [TrbxCreateResponse](interfaces/TrbxCreateResponse.md) | Response after creating boxes in a supply |
| [Order](interfaces/Order.md) | Assembly order (sborochnoe zadanie) with full details |
| [Supply](interfaces/Supply.md) | Supply (postavka) entity representing a shipment batch |
| [OrderNew](interfaces/OrderNew.md) | New (unprocessed) assembly order with additional pricing and metadata fields |
| [SupplyTrbx](interfaces/SupplyTrbx.md) | Supply box (transport box) entity |
| [TrbxStickers](interfaces/TrbxStickers.md) | Box sticker data with encoded barcode and file content |
| [Meta](interfaces/Meta.md) | Order metadata containing various identification and tracking codes |
| [PassOffice](interfaces/PassOffice.md) | Warehouse office data for seller pass registration |
| [Pass](interfaces/Pass.md) | Seller pass for warehouse access |
| [CrossborderTurkeyClientInfo](interfaces/CrossborderTurkeyClientInfo.md) | Client information for cross-border orders from Turkey |
| [CrossborderTurkeyClientInfoResp](interfaces/CrossborderTurkeyClientInfoResp.md) | Response wrapper for cross-border Turkey client information |
| [ModelsTransitTariff](interfaces/ModelsTransitTariff.md) | Auto-generated TypeScript types for orders-fbw module Generated from: wildberries_api_doc/07-orders-fbw.yaml |
| [ModelsVolumeTariff](interfaces/ModelsVolumeTariff.md) | - |
| [ModelsBox](interfaces/ModelsBox.md) | - |
| [ModelsGoodInBox](interfaces/ModelsGoodInBox.md) | - |
| [ModelsSuppliesFiltersRequest](interfaces/ModelsSuppliesFiltersRequest.md) | - |
| [ModelsGoodInSupply](interfaces/ModelsGoodInSupply.md) | - |
| [ModelsDateFilterRequest](interfaces/ModelsDateFilterRequest.md) | - |
| [ModelsSupplyDetails](interfaces/ModelsSupplyDetails.md) | - |
| [ModelsSupply](interfaces/ModelsSupply.md) | - |
| [ModelsAcceptanceCoefficient](interfaces/ModelsAcceptanceCoefficient.md) | - |
| [ModelsWarehousesResultItems](interfaces/ModelsWarehousesResultItems.md) | - |
| [ModelsGood](interfaces/ModelsGood.md) | - |
| [ModelsOptionsResultModel](interfaces/ModelsOptionsResultModel.md) | - |
| [StoreContactRequestBody](interfaces/StoreContactRequestBody.md) | Контакты склада продавца |
| [ResponseCardCreate](interfaces/ResponseCardCreate.md) | - |
| [RequestMoveNmsImtConn](interfaces/RequestMoveNmsImtConn.md) | - |
| [RequestMoveNmsImtDisconn](interfaces/RequestMoveNmsImtDisconn.md) | - |
| [ResponseContentError](interfaces/ResponseContentError.md) | - |
| [Good](interfaces/Good.md) | - |
| [SizeGoodReq](interfaces/SizeGoodReq.md) | - |
| [ClubDiscReq](interfaces/ClubDiscReq.md) | - |
| [GoodsList](interfaces/GoodsList.md) | Размеры товара |
| [SizeGood](interfaces/SizeGood.md) | Информация о размере |
| [GoodBufferHistory](interfaces/GoodBufferHistory.md) | - |
| [GoodHistory](interfaces/GoodHistory.md) | - |
| [SupplierTaskMetadata](interfaces/SupplierTaskMetadata.md) | Данные ответа |
| [SupplierTaskMetadataBuffer](interfaces/SupplierTaskMetadataBuffer.md) | Данные ответа |
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
| [Brand](interfaces/Brand.md) | Бренд |
| [BrandsResponse](interfaces/BrandsResponse.md) | Ответ со списком брендов |
| [UploadTaskResponse](interfaces/UploadTaskResponse.md) | Response for upload task creation (POST /api/v2/upload/task, /task/size, /task/club-discount) |
| [TaskHistoryResponse](interfaces/TaskHistoryResponse.md) | Response for processed upload tasks history (GET /api/v2/history/tasks) |
| [GoodsHistoryResponse](interfaces/GoodsHistoryResponse.md) | Response for goods in processed upload (GET /api/v2/history/goods/task) |
| [TaskBufferResponse](interfaces/TaskBufferResponse.md) | Response for buffer upload tasks (GET /api/v2/buffer/tasks) |
| [GoodsBufferResponse](interfaces/GoodsBufferResponse.md) | Response for goods in buffer upload (GET /api/v2/buffer/goods/task) |
| [GoodsFilterResponse](interfaces/GoodsFilterResponse.md) | Response for goods list with prices (GET /api/v2/list/goods/filter) |
| [GoodsFilterByNmResponse](interfaces/GoodsFilterByNmResponse.md) | Response for goods list by article numbers (POST /api/v2/list/goods/filter) |
| [SizeGoodsResponse](interfaces/SizeGoodsResponse.md) | Response for size-specific pricing (GET /api/v2/list/goods/size/nm) |
| [QuarantineGoodsResponse](interfaces/QuarantineGoodsResponse.md) | Response for quarantine goods (GET /api/v2/list/goods/quarantine) |
| [ParentCategory](interfaces/ParentCategory.md) | Родительская категория |
| [GetParentAllResponse](interfaces/GetParentAllResponse.md) | Response for parent categories (GET /content/v2/object/parent/all) |
| [DirectoryColor](interfaces/DirectoryColor.md) | Цвет из справочника |
| [GetDirectoryColorsResponse](interfaces/GetDirectoryColorsResponse.md) | Response for colors directory (GET /content/v2/directory/colors) |
| [DirectoryCountry](interfaces/DirectoryCountry.md) | Страна из справочника |
| [GetDirectoryCountriesResponse](interfaces/GetDirectoryCountriesResponse.md) | Response for countries directory (GET /content/v2/directory/countries) |
| [ContentTag](interfaces/ContentTag.md) | Ярлык (тег контента) |
| [GetContentTagsResponse](interfaces/GetContentTagsResponse.md) | Response for content tags (GET /content/v2/tags) |
| [ResponseWithReturn](interfaces/ResponseWithReturn.md) | - |
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
| [FullStatsItem](interfaces/FullStatsItem.md) | Статистика по одной кампании за период, указанный в запросе. По всем артикулам WB и платформам |
| [DaysV3Item](interfaces/DaysV3Item.md) | Элемент статистики по дням (V3) |
| [DaysV3AppItem](interfaces/DaysV3AppItem.md) | Элемент статистики по платформе (V3) |
| [DaysV3NmItem](interfaces/DaysV3NmItem.md) | Элемент статистики по артикулу WB (V3) |
| [BoosterStatsV3Item](interfaces/BoosterStatsV3Item.md) | Элемент статистики по средней позиции товара (V3) |
| [V0GetNormQueryStatsRequest](interfaces/V0GetNormQueryStatsRequest.md) | Запрос статистики по поисковым кластерам |
| [V0GetNormQueryStatsRequestItem](interfaces/V0GetNormQueryStatsRequestItem.md) | Элемент запроса статистики по поисковым кластерам |
| [V0GetNormQueryStatsResponse](interfaces/V0GetNormQueryStatsResponse.md) | Статистика по поисковым кластерам |
| [V0GetNormQueryStatsItem](interfaces/V0GetNormQueryStatsItem.md) | Элемент статистики по поисковым кластерам |
| [V0GetNormQueryStatsItemStat](interfaces/V0GetNormQueryStatsItemStat.md) | Статистика по конкретному поисковому кластеру |
| [V0SetNormQueryBidsRequest](interfaces/V0SetNormQueryBidsRequest.md) | Запрос на установку ставок для поисковых кластеров |
| [V0SetNormQueryBidsRequestItem](interfaces/V0SetNormQueryBidsRequestItem.md) | Элемент запроса на установку ставки |
| [V0GetNormQueryBidsRequest](interfaces/V0GetNormQueryBidsRequest.md) | Запрос на получение ставок поисковых кластеров |
| [V0GetNormQueryBidsRequestItem](interfaces/V0GetNormQueryBidsRequestItem.md) | Элемент запроса на получение ставок |
| [V0GetNormQueryBidsResponse](interfaces/V0GetNormQueryBidsResponse.md) | Ответ со списком ставок поисковых кластеров |
| [V0GetNormQueryBidsItem](interfaces/V0GetNormQueryBidsItem.md) | Элемент ставки поискового кластера |
| [V0SetMinusNormQueryRequest](interfaces/V0SetMinusNormQueryRequest.md) | Запрос на установку/удаление минус-фраз |
| [V0GetNormQueryMinusRequest](interfaces/V0GetNormQueryMinusRequest.md) | Запрос на получение минус-фраз |
| [V0GetNormQueryMinusRequestItem](interfaces/V0GetNormQueryMinusRequestItem.md) | Элемент запроса на получение минус-фраз |
| [V0GetNormQueryMinusResponse](interfaces/V0GetNormQueryMinusResponse.md) | Ответ со списком минус-фраз |
| [V0GetNormQueryMinusResponseItem](interfaces/V0GetNormQueryMinusResponseItem.md) | Элемент ответа со списком минус-фраз |
| [GetAdverts](interfaces/GetAdverts.md) | Ответ со списком кампаний (с ставками в копейках) |
| [GetAdvertsItem](interfaces/GetAdvertsItem.md) | Элемент списка кампаний |
| [AdvertNMsSettings](interfaces/AdvertNMsSettings.md) | Настройки товаров кампании (с ставками в копейках) |
| [AdvertBidsKopecks](interfaces/AdvertBidsKopecks.md) | Ставки в копейках |
| [AdvertSubject](interfaces/AdvertSubject.md) | Предмет (для кампаний с копейками) |
| [AdvertSettings](interfaces/AdvertSettings.md) | Настройки кампании |
| [AdvertPlacements](interfaces/AdvertPlacements.md) | Места размещения кампании |
| [CampaignListItem](interfaces/CampaignListItem.md) | Campaign list item in count response |
| [CampaignGroup](interfaces/CampaignGroup.md) | Campaign group by type/status in count response |
| [GetCampaignCountResponse](interfaces/GetCampaignCountResponse.md) | Response from campaign count endpoint |
| [CreateCampaignRequest](interfaces/CreateCampaignRequest.md) | Request to create a campaign |
| [SupplierSubject](interfaces/SupplierSubject.md) | Subject item for campaigns |
| [GetSupplierSubjectsParams](interfaces/GetSupplierSubjectsParams.md) | Parameters for getting supplier subjects |
| [SupplierNmItem](interfaces/SupplierNmItem.md) | Product card item for campaigns |
| [StocksItem](interfaces/StocksItem.md) | - |
| [OrdersItem](interfaces/OrdersItem.md) | - |
| [SalesItem](interfaces/SalesItem.md) | - |
| [ExciseReportRequest](interfaces/ExciseReportRequest.md) | - |
| [ExciseReportResponse](interfaces/ExciseReportResponse.md) | - |
| [ModelsExciseReportResponse](interfaces/ModelsExciseReportResponse.md) | - |
| [Penalty](interfaces/Penalty.md) | MeasurementPenalties response type for penalty reports |
| [Measurement](interfaces/Measurement.md) | WHM (Warehouse Measurements) response type for warehouse measurement reports |
| [GetTasksResponse](interfaces/GetTasksResponse.md) | - |
| [GetTasksResponseData](interfaces/GetTasksResponseData.md) | - |
| [CreateTaskResponse](interfaces/CreateTaskResponse.md) | - |
| [CreateTaskResponseData](interfaces/CreateTaskResponseData.md) | - |
| [AntifraudDetailsItem](interfaces/AntifraudDetailsItem.md) | Antifraud details report item |
| [AntifraudDetailsResponse](interfaces/AntifraudDetailsResponse.md) | Response for getAnalyticsAntifraudDetails |
| [GoodsLabelingItem](interfaces/GoodsLabelingItem.md) | Goods labeling report item |
| [GoodsLabelingResponse](interfaces/GoodsLabelingResponse.md) | Response for getAnalyticsGoodsLabeling |
| [RegionSaleItem](interfaces/RegionSaleItem.md) | Region sale report item |
| [RegionSaleResponse](interfaces/RegionSaleResponse.md) | Response for getAnalyticsRegionSale |
| [BrandShareBrandsItem](interfaces/BrandShareBrandsItem.md) | Brand share brands item |
| [BrandShareBrandsResponse](interfaces/BrandShareBrandsResponse.md) | Response for getBrandShareBrands |
| [BrandShareParentSubjectsItem](interfaces/BrandShareParentSubjectsItem.md) | Brand share parent subjects item |
| [BrandShareParentSubjectsResponse](interfaces/BrandShareParentSubjectsResponse.md) | Response for getBrandShareParentSubjects |
| [BrandShareItem](interfaces/BrandShareItem.md) | Brand share report item |
| [BrandShareResponse](interfaces/BrandShareResponse.md) | Response for getAnalyticsBrandShare |
| [WarehouseRemainsDownloadItem](interfaces/WarehouseRemainsDownloadItem.md) | Warehouse remains download item (extracted from getTasksDownload inline type) |
| [WarehouseQuantity](interfaces/WarehouseQuantity.md) | Warehouse quantity for remains report |
| [AcceptanceReportDownloadItem](interfaces/AcceptanceReportDownloadItem.md) | Acceptance report download item (extracted from getTasksDownload2 inline type) |
| [BannedProductBlockedItem](interfaces/BannedProductBlockedItem.md) | Banned product item for blocked products report |
| [BannedProductsBlockedResponse](interfaces/BannedProductsBlockedResponse.md) | Response for getBannedProductsBlocked |
| [BannedProductShadowedItem](interfaces/BannedProductShadowedItem.md) | Banned product item for shadowed products report |
| [BannedProductsShadowedResponse](interfaces/BannedProductsShadowedResponse.md) | Response for getBannedProductsShadowed |
| [GoodsReturnItem](interfaces/GoodsReturnItem.md) | Goods return report item |
| [GoodsReturnResponse](interfaces/GoodsReturnResponse.md) | Response for getAnalyticsGoodsReturn |
| [MeasurementPenaltiesParams](interfaces/MeasurementPenaltiesParams.md) | Parameters for getMeasurementPenalties |
| [WarehouseMeasurementsV2Params](interfaces/WarehouseMeasurementsV2Params.md) | Parameters for getWarehouseMeasurementsV2 |
| [DeductionsParams](interfaces/DeductionsParams.md) | Parameters for getDeductions |
| [DeductionItem](interfaces/DeductionItem.md) | Deduction report item |
| [DeductionsResponse](interfaces/DeductionsResponse.md) | Response for getDeductions |
| [MeasurementPenaltiesResponse](interfaces/MeasurementPenaltiesResponse.md) | Response for getMeasurementPenalties Uses the Penalty interface for report items |
| [WarehouseMeasurementsV2Response](interfaces/WarehouseMeasurementsV2Response.md) | Response for getWarehouseMeasurementsV2 Uses the Measurement interface for report items |
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
| [ModelsAcceptanceCoefficient](interfaces/ModelsAcceptanceCoefficient-1.md) | Acceptance coefficient for warehouse supplies Used by getAcceptanceCoefficients endpoint Returns tariffs for supplies to specific warehouses for the next 14 days |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [PositionCluster](type-aliases/PositionCluster.md) | Товары с какой средней позицией в поиске показывать в отчёте: - `all` — все - `firstHundred` — от 1 до 100 - `secondHundred` — от 101 до 200 - `below` — от 201 и ниже |
| [TableGroupRequestSt](type-aliases/TableGroupRequestSt.md) | - |
| [StockType](type-aliases/StockType.md) | Тип складов хранения товаров: - `""` — все - `wb` — Склады WB - `mp` — Склады Маркетплейс (FBS) |
| [AvailabilityFilters](type-aliases/AvailabilityFilters.md) | Доступность товара (массив фильтров): - `deficient` — Дефицит - `actual` — Актуальный - `balanced` — Баланс - `nonActual` — Неактуальный - `nonLiquid` — Неликвид - `invalidData` — Не рассчитано |
| [TableGroupField](type-aliases/TableGroupField.md) | Cортировка по полю: - `ordersCount` — Заказы, шт. - `ordersSum` — Заказы, сумма - `avgOrders` — Среднее количество заказов в день - `buyoutCount` — Выкупы, шт. - `buyoutSum` — Выкупы, сумма - `buyoutPercent` — Процент выкупа - `stockCount` — Остатки на текущий день, шт. - `stockSum` — Стоимость остатков на текущий день - `saleRate` — Оборачиваемость текущих остатков - `avgStockTurnover` — Оборачиваемость средних остатков - `toClientCount` — В пути к клиенту, шт. - `fromClientCount` — В пути от клиента, шт. - `minPrice` — Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба) - `maxPrice` — Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба) - `officeMissingTime` — Время отсутствия товара на складе - `lostOrdersCount` — Упущенные заказы, шт. - `lostOrdersSum` — Упущенные заказы, сумма - `lostBuyoutsCount` — Упущенные выкупы, шт. - `lostBuyoutsSum` — Упущенные выкупы, сумма |
| [OrderByMode](type-aliases/OrderByMode.md) | Порядок сортировки: - asc — по возрастанию - desc — по убыванию |
| [TableGroups](type-aliases/TableGroups.md) | Множество данных по группам |
| [TableProductRequest](type-aliases/TableProductRequest.md) | Параметры запроса об остатках по товарам |
| [AggregationLevel](type-aliases/AggregationLevel.md) | Тип агрегации: по дням или по неделям |
| [SalesFunnelProductsHistoryResponse](type-aliases/SalesFunnelProductsHistoryResponse.md) | Ответ истории по товарам воронки продаж v3 (Swagger: ProductHistoryResponse) |
| [SalesFunnelGroupedHistoryResponse](type-aliases/SalesFunnelGroupedHistoryResponse.md) | Ответ сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryResponse) |
| [ReviewPinMethod](type-aliases/ReviewPinMethod.md) | Method for pinning reviews - `subscription` - Jam subscription (подписка Джем) - `tariff` - Tariff option (тарифная опция) |
| [ReviewPinOn](type-aliases/ReviewPinOn.md) | Location where review is pinned - `nm` - Product card (карточка товара) - `imt` - Group of merged product cards (группа объединённых карточек товаров) |
| [ReviewState](type-aliases/ReviewState.md) | State of pinned review - `pinned` - Review is pinned - `unpinned` - Review is unpinned |
| [UnpinnedCause](type-aliases/UnpinnedCause.md) | Cause for review being unpinned automatically |
| [PinnedReviewErrorStatus](type-aliases/PinnedReviewErrorStatus.md) | Error status codes for pinned reviews operations |
| [PinnedReviewsCreateRequest](type-aliases/PinnedReviewsCreateRequest.md) | Request body for pinning reviews (array of items, max 500) |
| [PinnedReviewsDeleteRequest](type-aliases/PinnedReviewsDeleteRequest.md) | Request body for unpinning reviews (array of pin IDs, max 500) |
| [ResponseFeedback](type-aliases/ResponseFeedback.md) | Массив отзывов |
| [Sender](type-aliases/Sender.md) | Отправитель: - `client` — покупатель - `seller` — продавец - `wb` — Wildberries |
| [DocumentsLocale](type-aliases/DocumentsLocale.md) | Supported locale values for document endpoints |
| [AccessCode](type-aliases/AccessCode.md) | Access code for user permissions Determines which sections of the seller profile the user can access |
| [DBSSupplierStatus](type-aliases/DBSSupplierStatus.md) | DBS supplier status Triggered by seller actions |
| [OrderSupplierStatus](type-aliases/OrderSupplierStatus.md) | Supplier-side order status |
| [OrderWbStatus](type-aliases/OrderWbStatus.md) | Wildberries system order status |
| [CargoType](type-aliases/CargoType.md) | Cargo type: 1 = small, 2 = oversized, 3 = large |
| [StickerType](type-aliases/StickerType.md) | Sticker output format |
| [ModelsHandySupplyStatus](type-aliases/ModelsHandySupplyStatus.md) | - |
| [Goods](type-aliases/Goods.md) | Товары, цены и скидки для них. Максимум 1 000 товаров. Цена и скидка не могут быть пустыми одновременно. |
| [SizeGoodsBody](type-aliases/SizeGoodsBody.md) | Размеры и цены для них. Максимум 1 000 размеров. |
| [ClubDisc](type-aliases/ClubDisc.md) | Товары и скидки WB Клуба для них. Максимум 1 000 товаров. |
| [PlacementType](type-aliases/PlacementType.md) | Места размещения: - `search` — поиск - `recommendation` — рекомендации - `combined` — поиск и рекомендации |
| [DailyStats1](type-aliases/DailyStats1.md) | - |
| [Stats1](type-aliases/Stats1.md) | - |
| [DailyStats2](type-aliases/DailyStats2.md) | - |
| [Stats2](type-aliases/Stats2.md) | - |
| [ResponseFullStats](type-aliases/ResponseFullStats.md) | Статистика по кампаниям за период, указанный в запросе. По всем артикулам WB и платформам |
| [DaysV3](type-aliases/DaysV3.md) | Статистка по дням (V3) |
| [BoosterStatsV3](type-aliases/BoosterStatsV3.md) | Статистика по средней позиции товара (для кампаний с единой ставкой) (V3) |
| [BidType](type-aliases/BidType.md) | Bid type for campaign creation |
| [CampaignPlacementType](type-aliases/CampaignPlacementType.md) | Campaign placement types |
| [ModelsExciseReportResponseData](type-aliases/ModelsExciseReportResponseData.md) | - |
| [ResponsePaidStorage](type-aliases/ResponsePaidStorage.md) | - |
