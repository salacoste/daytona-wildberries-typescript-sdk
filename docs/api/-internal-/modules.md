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
| [MainRequest](interfaces/MainRequest.md) | Параметры запроса для формирования главной страницы: - `currentPeriod` — текущий период - `pastPeriod` — предыдущий период для сравнения |
| [MainResponse](interfaces/MainResponse.md) | - |
| [CommonInfo](interfaces/CommonInfo.md) | - |
| [PositionInfo](interfaces/PositionInfo.md) | Информация о позиции товара |
| [SearchReportPositionChartItem](interfaces/SearchReportPositionChartItem.md) | - |
| [SearchReportPositionClusters](interfaces/SearchReportPositionClusters.md) | Количество товаров со средней позицией в поиске: - `firstHundred` — от 1 до 100 - `secondHundred` — от 101 до 200 - `below` — от 201 и ниже |
| [VisibilityInfo](interfaces/VisibilityInfo.md) | Видимость карточек и переходы в карточки. По дням, неделям, месяцам |
| [TableGroupItem](interfaces/TableGroupItem.md) | К группе товаров относятся все карточки, подходящие хотя бы по одному из параметров: - `subjectName` — название предмета - `brandName` — бренд - `tagName` — название ярлыка |
| [TableProductItem](interfaces/TableProductItem.md) | - |
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
| [~~NmReportDetailRequest~~](interfaces/NmReportDetailRequest.md) | - |
| [~~NmReportDetailHistoryRequest~~](interfaces/NmReportDetailHistoryRequest.md) | - |
| [~~NmReportGroupedHistoryRequest~~](interfaces/NmReportGroupedHistoryRequest.md) | - |
| [~~NmReportDetailResponse~~](interfaces/NmReportDetailResponse.md) | - |
| [~~NmReportDetailHistoryResponse~~](interfaces/NmReportDetailHistoryResponse.md) | - |
| [~~NmReportGroupedHistoryResponse~~](interfaces/NmReportGroupedHistoryResponse.md) | - |
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
| [ResponseTemplate](interfaces/ResponseTemplate.md) | Успешно |
| [PostTemplate](interfaces/PostTemplate.md) | - |
| [PatchDelResp](interfaces/PatchDelResp.md) | - |
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
| [RequestDownload](interfaces/RequestDownload.md) | Auto-generated TypeScript types for finances module Generated from: wildberries_api_doc/13-finances.yaml |
| [GetCategories](interfaces/GetCategories.md) | - |
| [GetList](interfaces/GetList.md) | - |
| [GetDoc](interfaces/GetDoc.md) | - |
| [GetDocs](interfaces/GetDocs.md) | - |
| [DetailReportItem](interfaces/DetailReportItem.md) | - |
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
| [DBSOrderMeta](interfaces/DBSOrderMeta.md) | Order metadata structure |
| [GetNewOrdersResponse](interfaces/GetNewOrdersResponse.md) | Response from getNewOrders |
| [GetOrdersParams](interfaces/GetOrdersParams.md) | Parameters for getOrders |
| [GetOrdersResponse](interfaces/GetOrdersResponse.md) | Response from getOrders |
| [GetClientInfoResponse](interfaces/GetClientInfoResponse.md) | Response from getClientInfo |
| [GetStatusInfoResponse](interfaces/GetStatusInfoResponse.md) | Response from bulk status info endpoint |
| [BulkStatusChangeResponse](interfaces/BulkStatusChangeResponse.md) | Response from bulk status change operations |
| [GetB2BInfoResponse](interfaces/GetB2BInfoResponse.md) | Response from B2B info endpoint |
| [GetOrderMetaResponse](interfaces/GetOrderMetaResponse.md) | Response from getOrderMeta |
| [~~DBSOrderStatusLegacy~~](interfaces/DBSOrderStatusLegacy.md) | - |
| [~~GetStatusResponseLegacy~~](interfaces/GetStatusResponseLegacy.md) | - |
| [PassOffice](interfaces/PassOffice.md) | Данные о складе, для которого требуется пропуск |
| [Order](interfaces/Order.md) | - |
| [Supply](interfaces/Supply.md) | - |
| [OrderNew](interfaces/OrderNew.md) | - |
| [SupplyOrder](interfaces/SupplyOrder.md) | - |
| [SupplyTrbx](interfaces/SupplyTrbx.md) | - |
| [TrbxStickers](interfaces/TrbxStickers.md) | - |
| [Meta](interfaces/Meta.md) | Метаданные сборочного задания |
| [Pass](interfaces/Pass.md) | Данные о пропуске продавца |
| [CrossborderTurkeyClientInfo](interfaces/CrossborderTurkeyClientInfo.md) | - |
| [CrossborderTurkeyClientInfoResp](interfaces/CrossborderTurkeyClientInfoResp.md) | - |
| [OrdersRequestAPI](interfaces/OrdersRequestAPI.md) | - |
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
| [V0GetConfigCategoriesResponse](interfaces/V0GetConfigCategoriesResponse.md) | - |
| [V0AdvertMultiBidItem](interfaces/V0AdvertMultiBidItem.md) | - |
| [V0AdvertMultibid](interfaces/V0AdvertMultibid.md) | - |
| [ResponseWithReturn](interfaces/ResponseWithReturn.md) | - |
| [ResponseInfoAdvert](interfaces/ResponseInfoAdvert.md) | - |
| [ResponseInfoAdvertType8](interfaces/ResponseInfoAdvertType8.md) | - |
| [ResponseInfoAdvertType9](interfaces/ResponseInfoAdvertType9.md) | - |
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
| [FullStatsItem](interfaces/FullStatsItem.md) | Статистика по одной кампании за период, указанный в запросе. По всем артикулам WB и платформам |
| [IncomesItem](interfaces/IncomesItem.md) | Auto-generated TypeScript types for reports module Generated from: wildberries_api_doc/12-reports.yaml |
| [StocksItem](interfaces/StocksItem.md) | - |
| [OrdersItem](interfaces/OrdersItem.md) | - |
| [SalesItem](interfaces/SalesItem.md) | - |
| [ExciseReportRequest](interfaces/ExciseReportRequest.md) | - |
| [ExciseReportResponse](interfaces/ExciseReportResponse.md) | - |
| [ModelsExciseReportResponse](interfaces/ModelsExciseReportResponse.md) | - |
| [Penalty](interfaces/Penalty.md) | - |
| [Measurement](interfaces/Measurement.md) | - |
| [GetTasksResponse](interfaces/GetTasksResponse.md) | - |
| [GetTasksResponseData](interfaces/GetTasksResponseData.md) | - |
| [CreateTaskResponse](interfaces/CreateTaskResponse.md) | - |
| [CreateTaskResponseData](interfaces/CreateTaskResponseData.md) | - |
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

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [PositionCluster](type-aliases/PositionCluster.md) | Товары с какой средней позицией в поиске показывать в отчёте: - `all` — все - `firstHundred` — от 1 до 100 - `secondHundred` — от 101 до 200 - `below` — от 201 и ниже |
| [TableGroupRequestSt](type-aliases/TableGroupRequestSt.md) | - |
| [StockType](type-aliases/StockType.md) | Тип складов хранения товаров: - `""` — все - `wb` — Склады WB - `mp` — Склады Маркетплейс (FBS) |
| [AvailabilityFilters](type-aliases/AvailabilityFilters.md) | Доступность товара: - `deficient` — Дефицит - `actual` — Актуальный - `balanced` — Баланс - `nonActual` — Неактуальный - `nonLiquid` — Неликвид - `invalidData` — Не рассчитано |
| [TableGroupField](type-aliases/TableGroupField.md) | Cортировка по полю: - `ordersCount` — Заказы, шт. - `ordersSum` — Заказы, сумма - `avgOrders` — Среднее количество заказов в день - `buyoutCount` — Выкупы, шт. - `buyoutSum` — Выкупы, сумма - `buyoutPercent` — Процент выкупа - `stockCount` — Остатки на текущий день, шт. - `stockSum` — Стоимость остатков на текущий день - `saleRate` — Оборачиваемость текущих остатков - `avgStockTurnover` — Оборачиваемость средних остатков - `toClientCount` — В пути к клиенту, шт. - `fromClientCount` — В пути от клиента, шт. - `minPrice` — Минимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба) - `maxPrice` — Максимальная цена продавца со скидкой продавца (без учёта скидки WB Клуба) - `officeMissingTime` — Время отсутствия товара на складе - `lostOrdersCount` — Упущенные заказы, шт. - `lostOrdersSum` — Упущенные заказы, сумма - `lostBuyoutsCount` — Упущенные выкупы, шт. - `lostBuyoutsSum` — Упущенные выкупы, сумма |
| [OrderByMode](type-aliases/OrderByMode.md) | Порядок сортировки: - asc — по возрастанию - desc — по убыванию |
| [TableGroups](type-aliases/TableGroups.md) | Множество данных по группам |
| [TableProductRequest](type-aliases/TableProductRequest.md) | Параметры запроса об остатках по товарам |
| [AggregationLevel](type-aliases/AggregationLevel.md) | Тип агрегации: по дням или по неделям |
| [SalesFunnelProductsHistoryResponse](type-aliases/SalesFunnelProductsHistoryResponse.md) | Ответ истории по товарам воронки продаж v3 (Swagger: ProductHistoryResponse) |
| [SalesFunnelGroupedHistoryResponse](type-aliases/SalesFunnelGroupedHistoryResponse.md) | Ответ сгруппированной истории воронки продаж v3 (Swagger: GroupedHistoryResponse) |
| [ResponseFeedback](type-aliases/ResponseFeedback.md) | Массив отзывов |
| [Sender](type-aliases/Sender.md) | Отправитель: - `client` — покупатель - `seller` — продавец - `wb` — Wildberries |
| [DBSSupplierStatus](type-aliases/DBSSupplierStatus.md) | DBS supplier status Triggered by seller actions |
| [DBSMetadataKey](type-aliases/DBSMetadataKey.md) | Metadata key types |
| [ModelsHandySupplyStatus](type-aliases/ModelsHandySupplyStatus.md) | - |
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
| [ModelsExciseReportResponseData](type-aliases/ModelsExciseReportResponseData.md) | - |
| [ResponsePaidStorage](type-aliases/ResponsePaidStorage.md) | - |
