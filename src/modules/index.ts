/**
 * API Modules Export
 *
 * This file exports all API modules for the Wildberries SDK.
 * Currently only GeneralModule is implemented (Story 1.9).
 * Additional modules will be added in future stories.
 *
 * @module modules
 */

// General Module (Story 1.9)
export { GeneralModule } from './general';

// Products Module (Stories 2.1-2.4)
export { ProductsModule } from './products';

// Orders FBS Module (Stories 2.5-2.6)
export { OrdersFbsModule } from './orders-fbs';

// Orders FBW Module (Story 2.7)
export { OrdersFbwModule } from './orders-fbw';

// Finances Module (Story 3.1-3.2)
export { FinancesModule } from './finances';

// Analytics Module (Stories 3.3-3.4)
export { AnalyticsModule } from './analytics';

// Reports Module (Story 3.7)
export { ReportsModule } from './reports';

// Communications Module (Stories 3.5-3.6)
export { CommunicationsModule } from './communications';

// Promotion Module (Story 4.5)
export { PromotionModule } from './promotion';

// Tariffs Module (Story 4.5)
export { TariffsModule } from './tariffs';

// In-Store Pickup Module (Story 4.6)
export { InStorePickupModule } from './in-store-pickup';

// Orders DBS Module (Epic 12)
export { OrdersDbsModule } from './orders-dbs';

// User Management Module (Story 14.4)
export { UserManagementModule } from './user-management';
