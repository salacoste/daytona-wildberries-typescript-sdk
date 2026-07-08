# WB SDK ↔ OpenAPI Conformance Report (v3.1)

## general

- **9/10** — 1 MISSING

**Missing:**
- [GET] `/api/common/v1/tariff-constructor/options` (base https://common-api.wildberries.ru) — Get Information about Plan Builder Options (op:getCommonV1TariffConstructorOptions)

**Enums:**
- `Status` = [OK]
- `schema` = [ru, en]
- `code` = [balance, brands, changeJam, discountPrice, finance, showcase, suppliersDocuments, supply, questions, pinFeedbacks, pointsForReviews, feedbacks, oldAnalyticsReports, marketplace, brandsFlow, copyrightComplaints, pretrialClaims, sellersChat, brandzone, brandzoneSubscribe]
- `role` = [user, ]
- `state` = [active, inactive]
- `activationSource` = [constructor, jam]
- `level` = [standard, advanced, premium]
- `status` = [active, pendingActivation, pendingDeactivation]

## products

- **46/49** — 3 MISSING

**Missing:**
- [GET] `/content/v2/object/all` (base https://content-api.wildberries.ru) — Список предметов (op:?)
- [POST] `/content/v2/get/cards/list` (base https://content-api.wildberries.ru) — Список карточек товаров (op:?)
- [POST] `/content/v2/get/cards/trash` (base https://content-api.wildberries.ru) — Список карточек товаров в корзине (op:?)

**SDK-only (1):**
- `/content/v1/cards/delete`

**Enums:**
- `schema` = [ru, en, zh]
- `cargoType` = [1, 2, 3]
- `deliveryType` = [1, 2, 3, 5, 6]

## ordersFBS

- **34/35** — 1 MISSING

**Missing:**
- [GET] `/api/marketplace/v3/fbs/orders/archive` (base https://marketplace-api.wildberries.ru) — Get the List of Archived Assembly Orders (op:?)

**Enums:**
- `supplierStatus` = [new, confirm, complete, cancel]
- `wbStatus` = [waiting, sorted, sold, canceled, canceled_by_client, declined_by_client, defect, ready_for_pickup, postponed_delivery, accepted_by_carrier, sent_to_carrier]
- `schema` = [svg, zplv, zplh, png]
- `schema` = [58, 40]
- `schema` = [40, 30]
- `schema` = [imei, uin, gtin, sgtin, customsDeclaration]
- `status` = [awaitingTrackNumber, ready]
- `deliveryType` = [fbs]
- `cargoType` = [1, 2, 3]
- `crossBorderType` = [0, 1]
- `cargoType` = [0, 1, 2, 3]

## ordersDBS

- **19/31** — 12 MISSING

**Missing:**
- [POST] `/api/v3/dbs/orders/status` (base https://marketplace-api.wildberries.ru) (DEPR) — Получить статусы сборочных заданий (op:?)
- [PATCH] `/api/v3/dbs/orders/{orderId}/cancel` (base https://marketplace-api.wildberries.ru) (DEPR) — Отменить сборочное задание (op:?)
- [PATCH] `/api/v3/dbs/orders/{orderId}/confirm` (base https://marketplace-api.wildberries.ru) (DEPR) — Перевести на сборку (op:?)
- [PATCH] `/api/v3/dbs/orders/{orderId}/deliver` (base https://marketplace-api.wildberries.ru) (DEPR) — Перевести в доставку (op:?)
- [PATCH] `/api/v3/dbs/orders/{orderId}/receive` (base https://marketplace-api.wildberries.ru) (DEPR) — Сообщить, что заказ принят покупателем (op:?)
- [PATCH] `/api/v3/dbs/orders/{orderId}/reject` (base https://marketplace-api.wildberries.ru) (DEPR) — Сообщить, что покупатель отказался от заказа (op:?)
- [GET] `/api/v3/dbs/orders/{orderId}/meta` (base https://marketplace-api.wildberries.ru) (DEPR) — Получить метаданные сборочного задания (op:?)
- [DELETE] `/api/v3/dbs/orders/{orderId}/meta` (base https://marketplace-api.wildberries.ru) (DEPR) — Удалить метаданные сборочного задания (op:?)
- [PUT] `/api/v3/dbs/orders/{orderId}/meta/sgtin` (base https://marketplace-api.wildberries.ru) (DEPR) — Закрепить за сборочным заданием код маркировки товара (op:?)
- [PUT] `/api/v3/dbs/orders/{orderId}/meta/uin` (base https://marketplace-api.wildberries.ru) (DEPR) — Закрепить за сборочным заданием УИН (уникальный идентиф (op:?)
- [PUT] `/api/v3/dbs/orders/{orderId}/meta/imei` (base https://marketplace-api.wildberries.ru) (DEPR) — Закрепить за сборочным заданием IMEI (op:?)
- [PUT] `/api/v3/dbs/orders/{orderId}/meta/gtin` (base https://marketplace-api.wildberries.ru) (DEPR) — Закрепить за сборочным заданием GTIN (op:?)

**Enums:**
- `deliveryType` = [dbs, edbs]
- `cargoType` = [1, 2, 3]

## inStorePickup

- **4/18** — 14 MISSING

**Missing:**
- [POST] `/api/marketplace/v3/click-collect/orders/status/confirm` (base https://marketplace-api.wildberries.ru) — Transfer to Assembly (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/status/prepare` (base https://marketplace-api.wildberries.ru) — Notify That the Assembly Orders Are Ready for Pickup (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/status/receive` (base https://marketplace-api.wildberries.ru) — Notify That the Orders Were Received by the Buyers (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/status/reject` (base https://marketplace-api.wildberries.ru) — Notify that the Orders Are Declined (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/status/info` (base https://marketplace-api.wildberries.ru) — Get Assembly Order Statuses (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/status/cancel` (base https://marketplace-api.wildberries.ru) — Cancel the Assembly Orders (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/meta/details` (base https://marketplace-api.wildberries.ru) — Get Assembly Orders Label Identifiers (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/meta/info` (base https://marketplace-api.wildberries.ru) (DEPR) — Get Assembly Orders Label Identifiers (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/meta/delete` (base https://marketplace-api.wildberries.ru) — Delete Assembly Order Label Identifiers (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/meta/sgtin` (base https://marketplace-api.wildberries.ru) — Add Labeling codes Chestny ZNAK to the Assembly Orders  (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/meta/uin` (base https://marketplace-api.wildberries.ru) — Add UIN (Unique Identification Numbers) to the Assembly (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/meta/imei` (base https://marketplace-api.wildberries.ru) — Add IMEI to the Assembly Orders (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/meta/gtin` (base https://marketplace-api.wildberries.ru) — Add GTIN to the Assembly Orders (op:?)
- [POST] `/api/marketplace/v3/click-collect/orders/meta/customs-declaration` (base https://marketplace-api.wildberries.ru) — Add Customs Declaration Numbers to the Orders (op:postV3ClickCollectOrdersMetaCustomsDeclaration)

**SDK-only (11):**
- `/api/v3/click-collect/orders/{}/confirm`
- `/api/v3/click-collect/orders/{}/prepare`
- `/api/v3/click-collect/orders/{}/receive`
- `/api/v3/click-collect/orders/{}/reject`
- `/api/v3/click-collect/orders/status`
- `/api/v3/click-collect/orders/{}/cancel`
- `/api/v3/click-collect/orders/{}/meta`
- `/api/v3/click-collect/orders/{}/meta/sgtin`
- `/api/v3/click-collect/orders/{}/meta/uin`
- `/api/v3/click-collect/orders/{}/meta/imei`
- `/api/v3/click-collect/orders/{}/meta/gtin`

**Enums:**
- `cargoType` = [1, 2, 3]
- `key` = [imei, uin, gtin, sgtin, customsDeclaration]

## ordersFBW

- **7/7**

**SDK-only (5):**
- `/api/marketplace/v3/dbw/orders/client`
- `/api/marketplace/v3/dbw/orders/meta/delete`
- `/api/marketplace/v3/dbw/orders/meta/sgtin`
- `/api/marketplace/v3/dbw/orders/status/deliver`
- `/api/marketplace/v3/dbw/orders/meta/details`

**Enums:**
- `type` = [factDate, createDate, supplyDate, updatedDate]
- `statusID` = [1, 2, 3, 4, 5, 6]
- `models.HandySupplyStatus` = [1, 2, 3, 4, 5, 6]

## promotion

- **31/39** — 8 MISSING

**Missing:**
- [GET] `/adv/v1/upd` (base https://advert-api.wildberries.ru) — Receiving Costs History (op:?)
- [GET] `/adv/v1/payments` (base https://advert-api.wildberries.ru) — Receiving the History of Account Top-ups (op:?)
- [GET] `/api/advert/v1/config` (base https://advert-api.wildberries.ru) — Promotion Configuration Values (op:getV1Config)
- [POST] `/api/advert/v1/normquery/bids` (base https://advert-api.wildberries.ru) — Set Bids for Search Clusters in the Currency of the Sel (op:postV1NormqueryBids)
- [GET] `/adv/v1/adverts` (base https://advert-media-api.wildberries.ru) — List of Media Campaigns (op:?)
- [GET] `/adv/v1/advert` (base https://advert-media-api.wildberries.ru) — Information About Media Campaign (op:?)
- [POST] `/adv/v0/normquery/list` (base https://advert-api.wildberries.ru) — Active and Inactive Search Cluster Lists (op:?)
- [POST] `/adv/v1/normquery/stats` (base https://advert-api.wildberries.ru) — Daily Search Clusters Statistics (op:?)

**SDK-only (6):**
- `/adv/v0/auction/bids`
- `/adv/v1/auto/set-excluded`
- `/adv/v1/auto/updatenm`
- `/adv/v0/stats/keywords`
- `/adv/v1/promotion/adverts`
- `/adv/v0/auction/adverts`

**Enums:**
- `schema` = [cpm, cpc]
- `payment_type` = [cpm, cpc]
- `items` = [combined, search, recommendation]
- `bid_type` = [manual, unified]
- `items` = [search, recommendations]
- `placement` = [search, recommendations, combined]
- `PlacementType` = [combined, search, recommendation]
- `status` = [-1, 4, 7, 8, 9, 11]
- `appType` = [1, 32, 64]
- `type` = [regular, auto]

## communications

- **18/25** — 6 MISSING — 1 method-mismatch

**Missing:**
- [GET] `/api/v1/new-feedbacks-questions` (base https://feedbacks-api.wildberries.ru) — Unseen Feedbacks and Questions (op:?)
- [GET] `/api/v1/questions/count-unanswered` (base https://feedbacks-api.wildberries.ru) — Unanswered Questions (op:?)
- [GET] `/api/v1/question` (base https://feedbacks-api.wildberries.ru) — Get the Question by ID (op:?)
- [GET] `/api/v1/feedbacks/count-unanswered` (base https://feedbacks-api.wildberries.ru) — Unanswered Feedbacks (op:?)
- [GET] `/api/v1/feedbacks` (base https://feedbacks-api.wildberries.ru) — Feedbacks List (op:?)
- [GET] `/api/v1/feedback` (base https://feedbacks-api.wildberries.ru) — Get the Feedback by ID (op:?)

**Method-mismatch:**
- [GET] `/api/v1/questions` — Questions List

**Enums:**
- `schema` = [dateAsc, dateDesc]
- `schema` = [pinned, unpinned]
- `schema` = [nm, imt]
- `EventType` = [message]
- `Sender` = [client, seller, wb]
- `domain.ReviewPinMethod` = [subscription, tariff]
- `domain.ReviewPinOn` = [imt, nm]
- `domain.ReviewState` = [pinned, unpinned]
- `pinMethod` = [tariff, subscription]
- `pinOn` = [nm, imt]
- `unpinnedCause` = [sysTariffUnpinned, sysLimitReached, sysNoratingUnpinned, sysAdditionalSlot]
- `status` = [feedbackNotFound, itemNotFound, feedbackMismatch, itemNoImages, feedbackExcluded, imtNotDisplayed, globalLimitReached, unitLimitReached, tariffRestriction, subscriptionRestriction, alreadyPinned, bodyNotValid]

## tariffs

- **5/5**

## analytics

- **17/18** — 1 MISSING

**Missing:**
- [POST] `/api/analytics/v1/item-rating` (base https://seller-analytics-api.wildberries.ru) — Get Report (op:postV1ItemRating)

**Enums:**
- `positionCluster` = [all, firstHundred, secondHundred, below]
- `topOrderBy` = [openCard, addToCart, openToCart, orders, cartToOrder]
- `PositionCluster` = [all, firstHundred, secondHundred, below]
- `field` = [avgPosition, openCard, addToCart, openToCart, orders, cartToOrder, visibility]
- `mode` = [asc, desc]
- `field` = [avgPosition, openCard, addToCart, openToCart, orders, cartToOrder, visibility, minPrice, maxPrice]
- `aggregationLevel` = [day, week, month]
- `StockType` = [, wb, mp]
- `items` = [deficient, actual, balanced, nonActual, nonLiquid, invalidData]
- `TableGroupField` = [ordersCount, ordersSum, avgOrders, buyoutCount, buyoutSum, buyoutPercent, stockCount, stockSum, saleRate, avgStockTurnover, toClientCount, fromClientCount, minPrice, maxPrice, officeMissingTime, lostOrdersCount, lostOrdersSum, lostBuyoutsCount, lostBuyoutsSum]
- `OrderByMode` = [asc, desc]
- `availability` = [deficient, actual, balanced, nonActual, nonLiquid, invalidData]
- `Level` = [day, week]
- `field` = [openCard, addToCart, orderCount, orderSum, buyoutCount, buyoutSum, cancelCount, cancelSum, avgPrice, stockMpQty, stockWbQty, shareOrderPercent, addToWishlist, timeToReady, localizationPercent, wbClub.orderCount, wbClub.orderSum, wbClub.buyoutSum, wbClub.cancelSum, wbClub.buyoutCount, wbClub.avgPrice, wbClub.buyoutPercent, wbClub.avgOrderCountPerDay, wbClub.cancelCount]
- `field` = [feedbackRating, feedbackCount, fiveStar, fourStar, threeStar, twoStar, oneStar, disqualified]

## reports

- **24/24**

**SDK-only (1):**
- `/api/v1/supplier/stocks`

**Enums:**
- `schema` = [nmId, dtBonus, bonusSumm]
- `schema` = [desc, asc]
- `schema` = [brand, nmId, title, vendorCode, reason]
- `schema` = [brand, nmId, title, vendorCode, nmRating]
- `isStatusActive` = [0, 1]
- `warehouseType` = [Склад WB, Склад продавца]
- `items` = [AM, BY, KG, KZ, RU, UZ]

## finances

- **12/12**

**Enums:**
- `schema` = [weekly, daily]
- `schema` = [date, category]
- `schema` = [desc, asc]
- `period` = [daily, weekly]
- `reportType` = [1, 2, 3]
- `report_type` = [1, 2, 3]

