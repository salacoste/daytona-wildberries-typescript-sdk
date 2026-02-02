# Epic 12: Orders DBS Module - Delivery by Seller

**Epic Goal**: Implement complete Orders DBS (Delivery by Seller) module for sellers who handle their own delivery to customers.

**Target Completion**: Epic 12.x (Stories 12.1-12.5)

**Business Value**:
- Support for DBS (Delivery by Seller) fulfillment model
- B2B sales support with buyer organization data (INN, KPP, company name)
- Complete order lifecycle management (new -> confirm -> deliver -> receive/reject)
- Migration path from deprecated single-order methods to new bulk APIs

---

## Epic 12 Overview

### Strategic Context

**DBS vs FBS vs FBW:**
- **FBS (Fulfillment by Seller)**: Seller stores products, WB delivers to pickup points
- **FBW (Fulfillment by Wildberries)**: WB stores and delivers products
- **DBS (Delivery by Seller)**: Seller stores AND delivers products directly to customers

**Key DBS Features:**
- Direct seller-to-customer delivery
- Customer address and phone access
- Delivery confirmation with customer codes
- B2B sales with organization data
- Required metadata (IMEI, UIN, GTIN, SGTIN, customs declaration)

### Technical Context

**API Documentation**: `wildberries_api_doc/04-orders-dbs.yaml`
**Base URL**: `https://marketplace-api.wildberries.ru`

**API Changes (14.01.2026):**
- NEW: Bulk status methods (`/api/marketplace/v3/dbs/orders/status/*`)
- NEW: B2B buyer info method (`/api/marketplace/v3/dbs/orders/b2b/info`)
- DEPRECATED: Single-order PATCH methods (will be disabled 13.04.2026)

### Dependencies

**Depends On:**
- Epic 1 Complete - Foundation infrastructure (BaseClient, rate limiting, error handling)
- Epic 2-3 Complete - Orders FBS module (similar patterns to follow)
- Epic 4 Complete - Orders FBW module (complementary module)

---

## Story Breakdown

### Story 12.1: DBS Core Operations (CRITICAL)

**Priority**: CRITICAL - Foundation for all DBS operations
**Estimated Complexity**: MEDIUM
**Story Points**: 5

**Description**: Implement core DBS order retrieval and customer information methods.

**Key Features**:
- Get new orders list
- Get completed orders with date filtering
- Get customer contact info (address, phone)

**Endpoints**:
- `GET /api/v3/dbs/orders/new` - New orders
- `GET /api/v3/dbs/orders` - Completed orders
- `POST /api/v3/dbs/orders/client` - Customer info

**Rate Limits**:
- All methods: 300 req/min, 200ms interval, 20 burst

**Acceptance Criteria**:
1. OrdersDbsModule class created with BaseClient injection
2. getNewOrders() returns new DBS orders with requiredMeta
3. getOrders() supports pagination and date filtering (max 30 days)
4. getClientInfo() returns customer address and phone
5. Types generated from Swagger schemas (DBSOrderNew, DBSOrder, DBSClientInfo)
6. Unit tests >= 80% coverage
7. Integration tests with MSW
8. JSDoc documentation complete

---

### Story 12.2: DBS Status Management (CRITICAL)

**Priority**: CRITICAL - Order lifecycle management
**Estimated Complexity**: HIGH
**Story Points**: 8

**Description**: Implement bulk status management methods and deprecated single-order methods.

**Key Features**:
- Bulk status retrieval
- Bulk status transitions (confirm, deliver, receive, reject, cancel)
- Deprecated single-order methods with @deprecated markers

**New Bulk Endpoints (recommended)**:
- `POST /api/marketplace/v3/dbs/orders/status/info` - Get statuses
- `POST /api/marketplace/v3/dbs/orders/status/confirm` - Move to assembly
- `POST /api/marketplace/v3/dbs/orders/status/deliver` - Move to delivery
- `POST /api/marketplace/v3/dbs/orders/status/receive` - Mark received (with code)
- `POST /api/marketplace/v3/dbs/orders/status/reject` - Mark rejected (with code)
- `POST /api/marketplace/v3/dbs/orders/status/cancel` - Cancel orders

**Deprecated Endpoints (13.04.2026)**:
- `POST /api/v3/dbs/orders/status` - Get statuses (use bulk instead)
- `PATCH /api/v3/dbs/orders/{orderId}/cancel`
- `PATCH /api/v3/dbs/orders/{order}/confirm`
- `PATCH /api/v3/dbs/orders/{order}/deliver`
- `PATCH /api/v3/dbs/orders/{order}/receive`
- `PATCH /api/v3/dbs/orders/{order}/reject`

**Rate Limits**:
- Read operations: 300 req/min, 200ms interval, 20 burst
- Write operations: 100 req/min, 600ms interval, 20 burst
- Note: 409 errors count as 10 requests

**Status Flow**:
```
new -> confirm -> deliver -> receive (success)
                         \-> reject (customer refused)
new/confirm/deliver -> cancel (seller cancellation)
```

**Supplier Status Values**:
| Status | Description |
| --- | --- |
| `new` | New assembly task |
| `confirm` | In assembly |
| `deliver` | In delivery |
| `receive` | Received by customer |
| `reject` | Customer rejection on delivery |
| `cancel` | Cancelled by seller |
| `canceled_by_missed_call` | Cancelled due to failed call |

**Acceptance Criteria**:
1. All 6 bulk status methods implemented
2. All 6 deprecated methods implemented with @deprecated JSDoc
3. Confirmation code handling for receive/reject
4. Status enum types (new, confirm, deliver, receive, reject, cancel, canceled_by_missed_call)
5. Error handling for 409 conflicts
6. Unit tests for all methods
7. Integration tests for complete workflow
8. Migration guide from deprecated to bulk methods

---

### Story 12.3: DBS Metadata Operations (HIGH)

**Priority**: HIGH - Required for compliance
**Estimated Complexity**: MEDIUM
**Story Points**: 5

**Description**: Implement metadata management for marking codes, customs declarations, etc.

**Key Features**:
- Get/delete order metadata
- Set marking codes (SGTIN - Chestniy Znak)
- Set device identifiers (IMEI, UIN, GTIN)
- Set customs declarations (GTD)

**Endpoints**:
- `GET /api/v3/dbs/orders/{orderId}/meta` - Get metadata
- `DELETE /api/v3/dbs/orders/{orderId}/meta` - Delete metadata
- `PUT /api/v3/dbs/orders/{orderId}/meta/sgtin` - Set marking codes
- `PUT /api/v3/dbs/orders/{orderId}/meta/uin` - Set UIN
- `PUT /api/v3/dbs/orders/{orderId}/meta/imei` - Set IMEI
- `PUT /api/v3/dbs/orders/{orderId}/meta/gtin` - Set GTIN
- `PUT /api/v3/dbs/orders/{orderId}/meta/customs-declaration` - Set GTD

**Metadata Types**:
| Metadata | Description | Constraints |
| --- | --- | --- |
| `imei` | Device IMEI | 15 characters |
| `uin` | Unique Identification Number | 16 characters |
| `gtin` | Global Trade Item Number (Belarus) | 13 characters |
| `sgtin` | Marking code (Chestniy Znak) | 1-24 codes, 16-135 chars each |
| `customsDeclaration` | Customs declaration number | Max 50 characters |

**Rate Limits**:
- Read/delete: 300 req/min
- Set metadata: 1000 req/min (combined for all set methods)

**Acceptance Criteria**:
1. getMeta() returns available metadata for order
2. deleteMeta() removes specific metadata key
3. setSgtin() sets marking codes (1-24 codes per order)
4. setUin() sets UIN (16 characters)
5. setImei() sets IMEI (15 characters)
6. setGtin() sets GTIN (13 characters)
7. setCustomsDeclaration() sets customs number
8. Input validation for all fields
9. Unit and integration tests
10. Documentation with compliance examples

---

### Story 12.4: DBS B2B Support (HIGH)

**Priority**: HIGH - New feature for B2B sales
**Estimated Complexity**: LOW
**Story Points**: 3

**Description**: Implement B2B buyer information retrieval for corporate sales.

**Key Features**:
- Get B2B buyer organization data
- Support for bulk requests (up to 1000 orders)
- Handle both success and error responses per order

**Endpoint**:
- `POST /api/marketplace/v3/dbs/orders/b2b/info` - Get B2B buyer info

**Response Data**:
- `orgName` - Organization name (e.g., "IP Ivanov I.I.")
- `inn` - Tax identification number
- `kpp` - Tax registration reason code (empty for individual entrepreneurs)

**Rate Limits**: 300 req/min, 200ms interval, 20 burst

**Acceptance Criteria**:
1. getB2BInfo() accepts up to 1000 order IDs
2. Returns organization data (orgName, inn, kpp) for B2B orders
3. Handles partial errors (some orders may not be B2B)
4. Types for B2BInfoResult schema
5. Unit tests with success and error scenarios
6. Integration tests
7. Example for B2B order processing workflow
8. Documentation explaining B2B vs B2C orders

---

### Story 12.5: DBS Integration & Testing (CRITICAL)

**Priority**: CRITICAL - Module completion
**Estimated Complexity**: MEDIUM
**Story Points**: 5

**Description**: Integrate DBS module into SDK, comprehensive testing, and documentation.

**Key Features**:
- SDK integration (WildberriesSDK.ordersDBS)
- Cross-module examples (DBS + Products + Finances)
- Complete workflow examples
- Performance benchmarks
- Documentation updates

**Acceptance Criteria**:
1. OrdersDbsModule exported from src/modules/index.ts
2. ordersDBS property added to WildberriesSDK class
3. All rate limits configured in rate-limiter
4. Cross-module example: Complete DBS order workflow
5. Example: B2B order with invoice generation
6. Example: Order with marking codes (SGTIN)
7. README updated with DBS module documentation
8. TypeDoc generated for all methods
9. All tests passing (>= 80% coverage)
10. Performance benchmarks documented
11. CHANGELOG updated

---

## Implementation Strategy

### Phase 1: Core Operations (Story 12.1)
**Timeline**: 2-3 days
**Focus**: Foundation methods for order retrieval
**Dependencies**: None

### Phase 2: Status Management (Story 12.2)
**Timeline**: 3-4 days
**Focus**: Complete order lifecycle management
**Dependencies**: Story 12.1 complete

### Phase 3: Metadata Operations (Story 12.3)
**Timeline**: 2-3 days
**Focus**: Compliance-related metadata
**Dependencies**: Story 12.1 complete (can run parallel with 12.2)

### Phase 4: B2B Support (Story 12.4)
**Timeline**: 1-2 days
**Focus**: New B2B functionality
**Dependencies**: Story 12.1 complete (can run parallel with 12.2/12.3)

### Phase 5: Integration (Story 12.5)
**Timeline**: 2-3 days
**Focus**: Module integration and documentation
**Dependencies**: Stories 12.1-12.4 complete

**Total Epic 12 Duration**: ~10-15 days

---

## API Methods Summary

### Core Operations (Story 12.1)
| Method | SDK Method | Description |
| --- | --- | --- |
| `GET /api/v3/dbs/orders/new` | `getNewOrders()` | Get new assembly tasks |
| `GET /api/v3/dbs/orders` | `getOrders()` | Get completed orders |
| `POST /api/v3/dbs/orders/client` | `getClientInfo()` | Get customer contact info |

### Bulk Status Operations (Story 12.2 - Recommended)
| Method | SDK Method | Description |
| --- | --- | --- |
| `POST /api/marketplace/v3/dbs/orders/status/info` | `getStatusesBulk()` | Get order statuses |
| `POST /api/marketplace/v3/dbs/orders/status/confirm` | `confirmBulk()` | Move to assembly |
| `POST /api/marketplace/v3/dbs/orders/status/deliver` | `deliverBulk()` | Move to delivery |
| `POST /api/marketplace/v3/dbs/orders/status/receive` | `receiveBulk()` | Mark as received |
| `POST /api/marketplace/v3/dbs/orders/status/reject` | `rejectBulk()` | Mark as rejected |
| `POST /api/marketplace/v3/dbs/orders/status/cancel` | `cancelBulk()` | Cancel orders |

### Deprecated Status Operations (Story 12.2 - Until 13.04.2026)
| Method | SDK Method | Description |
| --- | --- | --- |
| `POST /api/v3/dbs/orders/status` | `getStatuses()` | Get order statuses |
| `PATCH /api/v3/dbs/orders/{orderId}/cancel` | `cancel()` | Cancel single order |
| `PATCH /api/v3/dbs/orders/{order}/confirm` | `confirm()` | Confirm single order |
| `PATCH /api/v3/dbs/orders/{order}/deliver` | `deliver()` | Deliver single order |
| `PATCH /api/v3/dbs/orders/{order}/receive` | `receive()` | Receive single order |
| `PATCH /api/v3/dbs/orders/{order}/reject` | `reject()` | Reject single order |

### Metadata Operations (Story 12.3)
| Method | SDK Method | Description |
| --- | --- | --- |
| `GET /api/v3/dbs/orders/{orderId}/meta` | `getMeta()` | Get order metadata |
| `DELETE /api/v3/dbs/orders/{orderId}/meta` | `deleteMeta()` | Delete metadata key |
| `PUT /api/v3/dbs/orders/{orderId}/meta/sgtin` | `setSgtin()` | Set marking codes |
| `PUT /api/v3/dbs/orders/{orderId}/meta/uin` | `setUin()` | Set UIN |
| `PUT /api/v3/dbs/orders/{orderId}/meta/imei` | `setImei()` | Set IMEI |
| `PUT /api/v3/dbs/orders/{orderId}/meta/gtin` | `setGtin()` | Set GTIN |
| `PUT /api/v3/dbs/orders/{orderId}/meta/customs-declaration` | `setCustomsDeclaration()` | Set customs number |

### B2B Operations (Story 12.4)
| Method | SDK Method | Description |
| --- | --- | --- |
| `POST /api/marketplace/v3/dbs/orders/b2b/info` | `getB2BInfo()` | Get B2B buyer info |

**Total: ~20 API methods**

---

## Success Metrics

### Coverage Targets
- **OrdersDbsModule**: >= 80% line coverage
- **Critical paths**: 100% coverage (status transitions, metadata operations)

### Quality Gates
- All tests passing
- TypeScript strict mode compliance
- ESLint + Prettier passing
- Zero high/critical security vulnerabilities
- Rate limits match Swagger specification
- All deprecated methods properly marked

### Documentation Completeness
- JSDoc for all public methods
- TypeDoc generated
- Examples for each feature
- Migration guide for deprecated methods
- B2B workflow documentation

---

## Risk Assessment

### Low Risk
- Established patterns from FBS/FBW modules
- Swagger specification available
- Testing infrastructure in place

### Medium Risk
- Deprecated method migration (user education needed)
- B2B feature is new (limited real-world testing)

### Mitigation Strategies
- Follow FBS module patterns for consistency
- Clear deprecation warnings in JSDoc
- Comprehensive examples for B2B workflows
- Integration tests covering edge cases

---

## Epic 12 Deliverables

### Code
- 1 new API module (OrdersDbsModule)
- ~20 API methods implemented
- ~100+ new tests
- 3+ example workflow files

### Documentation
- Updated README with DBS module
- TypeDoc for all methods
- Migration guide for deprecated methods
- B2B workflow guide
- CHANGELOG with Epic 12 features

### Quality
- Test coverage >= 80%
- All quality gates passed
- Performance benchmarks documented
- Zero regressions in existing modules

---

## Type Definitions

### Core Types
```typescript
interface DBSOrderNew {
  id: number;
  address: {
    fullAddress: string;
    longitude: number;
    latitude: number;
  };
  ddate: string;
  salePrice: number;
  dTimeFrom: string;
  dTimeTo: string;
  requiredMeta: string[];
  deliveryType: 'dbs';
  comment: string;
  orderUid: string;
  article: string;
  colorCode: string;
  rid: string;
  createdAt: string;
  skus: string[];
  warehouseId: number;
  nmId: number;
  chrtId: number;
  price: number;
  convertedPrice: number;
  currencyCode: number;
  convertedCurrencyCode: number;
  cargoType: number;
  isZeroOrder: boolean;
}

interface DBSClientInfo {
  firstName: string;
  fullName: string;
  orderID: number;
  phone: string;
  phoneCode: number;
  additionalPhoneCodes: number[];
}

interface B2BInfoResult {
  orderId: number;
  isError: boolean;
  data?: {
    orgName: string;
    inn: string;
    kpp: string;
  };
  errors?: Array<{
    code: number;
    detail: string;
  }>;
}

type DBSSupplierStatus =
  | 'new'
  | 'confirm'
  | 'deliver'
  | 'receive'
  | 'reject'
  | 'cancel'
  | 'canceled_by_missed_call';

type MetadataKey =
  | 'imei'
  | 'uin'
  | 'gtin'
  | 'sgtin'
  | 'customsDeclaration';
```

---

## Notes

- Epic 12 adds DBS fulfillment model support to the SDK
- DBS is distinct from FBS/FBW - seller handles delivery directly
- New bulk APIs are preferred over deprecated single-order methods
- B2B support enables corporate sales tracking
- Metadata compliance is critical for regulated products (electronics, pharmaceuticals)
