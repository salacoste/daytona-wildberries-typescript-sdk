# Promotion Module

The **Promotion** module manages advertising campaigns, bid management, budget operations, keyword statistics, and calendar promotions on the Wildberries marketplace.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `promotion` |
| **SDK Namespace** | `sdk.promotion.*` |
| **Base URLs** | `https://advert-api.wildberries.ru`, `https://advert-media-api.wildberries.ru`, `https://dp-calendar-api.wildberries.ru`, `https://api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/08-promotion/` |
| **Methods** | 42 (38 active + 4 deprecated) |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get all campaign counts by type and status
const counts = await sdk.promotion.getPromotionCount();

// Get account balance
const balance = await sdk.promotion.getAdvBalance();

// Get full campaign statistics
const stats = await sdk.promotion.getAdvFullstats();

// List calendar promotions
const promos = await sdk.promotion.getCalendarPromotions();
```

---

## Methods Reference

### Campaign Information (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getPromotionCount()` | GET | `/adv/v1/promotion/count` | Get campaign counts grouped by type and status |
| `createPromotionAdvert()` | POST | `/adv/v1/promotion/adverts` | Get campaigns info by status, type and ID |
| `getAuctionAdverts()` | GET | `/adv/v0/auction/adverts` | Get manual bid campaigns by status |
| `getAdvConfig()` | GET | `/adv/v0/config` | Get allowed config parameters (min bids, categories) |

### Campaign Creation (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createBidsMin()` | POST | `/adv/v0/bids/min` | Get minimum bids for product cards |
| `createAdvSaveAd()` | POST | `/adv/v1/save-ad` | Create campaign with single bid |
| `createSeacatSaveAd()` | POST | `/adv/v2/seacat/save-ad` | Create campaign with manual or single bid |
| `getSupplierSubjects()` | GET | `/adv/v1/supplier/subjects` | Get product items for campaigns |

### Campaign Management (8 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createSupplierNm()` | POST | `/adv/v2/supplier/nms` | Get product cards for campaigns |
| `getAdvDelete()` | GET | `/adv/v0/delete` | Delete campaigns in "ready to launch" status |
| `createAdvRename()` | POST | `/adv/v0/rename` | Rename a campaign |
| `getAdvStart()` | GET | `/adv/v0/start` | Launch campaigns (ready or paused) |
| `getAdvPause()` | GET | `/adv/v0/pause` | Pause active campaigns |
| `getAdvStop()` | GET | `/adv/v0/stop` | Complete campaigns |
| `updateAdvBid()` | PATCH | `/adv/v0/bids` | Change bids for single bid campaigns |
| `updateAuctionBid()` | PATCH | `/adv/v0/auction/bids` | Change bids for type 9 campaigns |

### Placement & Product Management (2 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `updateAuctionPlacement()` | PUT | `/adv/v0/auction/placements` | Change placement locations |
| `updateAuctionNm()` | PATCH | `/adv/v0/auction/nms` | Add/remove product cards in campaigns |

### Budget & Finance (5 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvBalance()` | GET | `/adv/v1/balance` | Get account balance and bonus accruals |
| `getAdvBudget()` | GET | `/adv/v1/budget` | Get campaign budget info |
| `createBudgetDeposit()` | POST | `/adv/v1/budget/deposit` | Replenish campaign budget |
| `getAdvUpd()` | GET | `/adv/v1/upd` | Get actual campaign spending history |
| `getAdvPayments()` | GET | `/adv/v1/payments` | Get account replenishment history |

### Keyword Management (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getSearchSetPlus()` | GET | `/adv/v1/search/set-plus` | Get fixed phrases activity status |
| `createSearchSetPlu()` | POST | `/adv/v1/search/set-plus` | Set/remove fixed phrases |
| `createSearchSetExcluded()` | POST | `/adv/v1/search/set-excluded` | Set/remove negative phrases |

### Media Campaigns (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvCount()` | GET | `/adv/v1/count` | Get media campaign count by status |
| `getAdvAdverts()` | GET | `/adv/v1/adverts` | Get all media campaigns |
| `getAdvAdvert()` | GET | `/adv/v1/advert` | Get WB Media campaign info |

### Statistics (5 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createAdvFullstat()` | POST | `/adv/v2/fullstats` | Get campaign statistics (v2) |
| `getAdvFullstats()` | GET | `/adv/v3/fullstats` | Get full statistics for all campaign types |
| `getStatWords()` | GET | `/adv/v1/stat/words` | Get manual bid campaign keyword stats |
| `getStatsKeywords()` | GET | `/adv/v0/stats/keywords` | Get keyword stats for all campaign types |
| `createAdvStat()` | POST | `/adv/v1/stats` | Get WB Media campaign statistics |

### Calendar Promotions (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getCalendarPromotions()` | GET | `/api/v1/calendar/promotions` | Get WB promotions list with dates |
| `getPromotionsDetails()` | GET | `/api/v1/calendar/promotions/details` | Get promotion details by ID |
| `getPromotionsNomenclatures()` | GET | `/api/v1/calendar/promotions/nomenclatures` | Get eligible products for promotion |
| `createPromotionsUpload()` | POST | `/api/v1/calendar/promotions/upload` | Add product to promotion |

### Deprecated (4 methods)

> These methods were deprecated on **February 2, 2026**. Use the replacements below.

| Method | Replacement |
|--------|-------------|
| `createAutoSetExcluded()` | `createSearchSetExcluded()` |
| `getAutoGetnmtoadd()` | `getAuctionAdverts()` |
| `createAutoUpdatenm()` | `updateAuctionNm()` |
| `getAutoStatWords()` | `getAdvFullstats()` |

---

## Rate Limits

| Tier | Operations | Limit | Interval |
|------|-----------|-------|----------|
| T1 Ultra-High | Media campaigns (count, list, info, stats) | 600 req/min | 100ms |
| T2 Very High | Campaign list, management, bid changes | 300 req/min | 200ms |
| T3 High | Budget queries, keyword stats | 240 req/min | 250ms |
| T4 Medium | Negative phrases (search) | 120 req/min | 500ms |
| T5 Moderate | Calendar promotions | 100 req/min | 600ms |
| T6 Low | Balance, placements, spending history | 60 req/min | 1s |
| T7 Very Low | Minimum bids | 20 req/min | 3s |
| T8 Minimal | Fixed/negative phrases | 10 req/min | 600ms |
| T9 Extremely Low | Campaign creation | 5 req/min | 12s |
| T10 Single | Config, full statistics | 1 req/min | 60s |

---

## Related Resources

- [API Reference: PromotionModule](/api/classes/PromotionModule)
- [Promotion Module Guide](/guides/promotion-advertising)
- [Advertising Statistics Guide](/guides/advertising-statistics-guide)
- [Advertising Best Practices](/guides/best-practices-advertising)
