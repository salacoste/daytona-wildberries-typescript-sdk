/**
 * Auto-generated types for general module
 * Generated from: wildberries_api_doc/01-general.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 */

/**
 * Response structure for ping endpoint
 */
export interface PingResponse {
  /** Timestamp запроса */
  TS?: string;
  /** Статус подключения */
  Status?: 'OK';
}

/**
 * News item structure from news endpoint
 */
export interface NewsItem {
  /** ID новости */
  id: number;
  /** Заголовок новости */
  header: string;
  /** Дата и время публикации новости */
  date: string;
  /** Текст новости */
  content: string;
  /** Теги новости */
  types: NewsTag[];
}

/**
 * News tag structure
 */
export interface NewsTag {
  /** ID тега */
  id: number;
  /** Название тега */
  name: string;
}

/**
 * Response structure for news endpoint
 */
export interface NewsResponse {
  /** Массив новостей */
  data: NewsItem[];
}

/**
 * Parameters for news endpoint request
 */
export interface NewsRequestParams {
  /** Дата, от которой необходимо выдать новости (format: YYYY-MM-DD) */
  from?: string;
  /** ID новости, начиная с которой нужно получить список */
  fromID?: number;
}

/**
 * Response structure for seller info endpoint
 */
export interface SellerInfoResponse {
  /** Наименование продавца */
  name?: string;
  /** Уникальный ID продавца на Wildberries */
  sid?: string;
  /** Торговое наименование продавца */
  tradeMark?: string;
  /** ИНН продавца (Taxpayer Identification Number) */
  tin?: string;
}

// ============================================================================
// User Management Types
// ============================================================================

/**
 * Access code for user permissions
 * Determines which sections of the seller profile the user can access
 */
export type AccessCode =
  | 'balance' // View balance and withdraw funds
  | 'brands' // Brand management
  | 'changeJam' // Jam subscription access
  | 'discountPrice' // Price changes, discounts, promotions
  | 'finance' // Financial analytics
  | 'showcase' // Store showcase management
  | 'suppliersDocuments' // Documents viewing and downloading
  | 'supply' // FBW supply creation and management
  | 'questions' // View and respond to questions
  | 'pinFeedbacks' // Pin/unpin reviews
  | 'pointsForReviews' // Points for reviews
  | 'feedbacks' // View and respond to reviews
  | 'oldAnalyticsReports' // Reports
  | 'marketplace' // Seller Warehouse
  | 'brandsFlow' // My brands
  | 'copyrightComplaints' // Copyright owner claims
  | 'pretrialClaims' // Pre-trial claims
  | 'sellersChat' // Chat with Users
  | 'brandzone' // Edit Brand Zone
  | 'brandzoneSubscribe'; // Manage Brand Zone Subscription

/**
 * Access permission item
 */
export interface AccessItem {
  /** Section code */
  code: AccessCode;
  /** true - access denied, false - access allowed */
  disabled: boolean;
}

/**
 * Invite information
 */
export interface InviteInfo {
  /** Phone number to invite */
  phoneNumber: string;
  /** User position (max 150 chars) */
  position?: string;
}

/**
 * Request to create user invitation
 */
export interface CreateInviteRequest {
  /** Access permissions for the user */
  access?: AccessItem[];
  /** Invitation details */
  invite: InviteInfo;
}

/**
 * Response from create invitation endpoint
 */
export interface CreateInviteResponse {
  /** Invitation ID (UUID) */
  inviteID: string;
  /** Invitation expiration date/time */
  expiredAt: string;
  /** Whether invitation was created successfully */
  isSuccess: boolean;
  /** URL for the user to accept the invitation */
  inviteUrl: string;
}

/**
 * Invitee information (for invited users)
 */
export interface InviteeInfo {
  /** Phone number of invited user */
  phoneNumber: string;
  /** User position */
  position: string;
  /** Invitation UUID */
  inviteUuid: string;
  /** Invitation expiration date/time */
  expiredAt: string;
  /** Whether invitation is active */
  isActive: boolean;
}

/**
 * User information
 */
export interface UserInfo {
  /** User ID */
  id: number;
  /** User role: "user" for activated users, "" for non-activated */
  role: 'user' | '';
  /** User position */
  position: string;
  /** Phone number */
  phone: string;
  /** Email */
  email: string;
  /** Whether user is the profile owner */
  isOwner: boolean;
  /** First name */
  firstName: string;
  /** Last name */
  secondName: string;
  /** Patronymic */
  patronymic: string;
  /** Whether user can approve goods returns */
  goodsReturn: boolean;
  /** Whether user was invited */
  isInvitee: boolean;
  /** Invitation info (null if not invited) */
  inviteeInfo: InviteeInfo | null;
  /** Access permissions */
  access: AccessItem[];
}

/**
 * Parameters for getting users list
 */
export interface GetUsersParams {
  /** Number of users in response (max 100, default 100) */
  limit?: number;
  /** Number of elements to skip (default 0) */
  offset?: number;
  /** true - invited users only, false - active users only */
  isInviteOnly?: boolean;
}

/**
 * Response from get users endpoint
 */
export interface GetUsersResponse {
  /** Total number of users */
  total: number;
  /** Number of users in current response */
  countInResponse: number;
  /** Users list */
  users: UserInfo[];
}

/**
 * User access update item
 */
export interface UserAccessUpdate {
  /** User ID to update */
  userId: number;
  /** New access permissions */
  access: AccessItem[];
}

/**
 * Request to update user access
 */
export interface UpdateUserAccessRequest {
  /** Array of user access updates */
  usersAccesses: UserAccessUpdate[];
}

/**
 * User Management error response
 */
export interface UserManagementErrorResponse {
  /** Error title */
  title: string;
  /** Error details */
  detail: string;
  /** Request ID */
  requestId: string;
  /** Internal service name */
  origin: string;
  /** HTTP status code */
  status: number;
}

// ============================================================================
// Jam Subscription Types
// ============================================================================

/**
 * Jam (Джем) subscription tier
 *
 * Wildberries offers tiered "Jam" subscriptions that unlock higher limits
 * on analytics endpoints (e.g., search-texts limit field).
 *
 * - `'none'` — No Jam subscription (analytics search-texts unavailable)
 * - `'standard'` — Standard tier (limit ≤ 30)
 * - `'advanced'` — Advanced tier (limit ≤ 50)
 */
export type JamSubscriptionTier = 'none' | 'standard' | 'advanced';

/**
 * Result of a Jam subscription status probe
 */
export interface JamSubscriptionStatus {
  /** Detected subscription tier */
  tier: JamSubscriptionTier;
  /** ISO 8601 timestamp when the check was performed */
  checkedAt: string;
  /** Number of probe API calls made (1 for advanced, 2 for standard/none) */
  probeCallsMade: number;
}

/**
 * Parameters for the Jam subscription status check
 */
export interface GetJamSubscriptionStatusParams {
  /** One or more WB article IDs (nmIds) to use in the probe request */
  nmIds: number[];
}

/**
 * Detailed Jam subscription information from GET /api/common/v1/subscriptions
 *
 * - If seller never subscribed: empty 200 response (all fields undefined)
 * - If active: state='active', since/till populated
 * - If expired/cancelled then resubscribed: since = first activation, till = current period end
 * - If inactive: since = first activation, till = last paid period end
 *
 * @since 3.5.0
 */
export interface JamSubscriptionDetails {
  /** Subscription state: 'active' when active, 'inactive' when expired or cancelled */
  state?: 'active' | 'inactive';
  /** How the subscription was activated: 'constructor' (Plan Builder) or 'jam' (Jam Subscription) */
  activationSource?: 'constructor' | 'jam';
  /** Subscription level */
  level?: 'standard' | 'advanced' | 'premium';
  /** Date of first subscription activation (ISO 8601) */
  since?: string;
  /** End date of current/last paid period (ISO 8601) */
  till?: string;
}

/**
 * Seller rating and review count from GET /api/common/v1/rating
 * @since 3.5.0
 */
export interface SellerRatingResponse {
  /** Total number of customer reviews */
  feedbackCount?: number;
  /** Seller rating (e.g., 4.55) */
  valuation?: number;
}

/**
 * Activation status of a Plan Builder (Tariff Constructor) option or package.
 *
 * - `'active'` — active
 * - `'pendingActivation'` — activated, will start working at 00:00 the next day
 * - `'pendingDeactivation'` — deactivated, will stop working at 00:00 the next day
 * @since 3.16.0
 */
export type PlanBuilderActivationStatus = 'active' | 'pendingActivation' | 'pendingDeactivation';

/**
 * Response language for Plan Builder option/package names.
 * @since 3.16.0
 */
export type PlanBuilderLocale = 'ru' | 'en';

/**
 * Parameters for GET /api/common/v1/tariff-constructor/options
 * @since 3.16.0
 */
export interface GetTariffConstructorOptionsParams {
  /** Response field language: `ru` (Russian, default) or `en` (English) */
  locale?: PlanBuilderLocale;
}

/**
 * Promo applied to a Plan Builder option.
 * Returned when the option is activated via a promo and the promo period has not expired.
 * @since 3.16.0
 */
export interface PlanBuilderPromotion {
  /** Cost of activating the option through a promo, % of turnover */
  commissionRate: number;
  /** End date of the promo price (ISO 8601) */
  expiresAt: string;
}

/**
 * Short option reference embedded inside an option package.
 * @since 3.16.0
 */
export interface PlanBuilderOptionShort {
  /** Option ID */
  id: string;
  /** Option code (slug) */
  slug: string;
  /** Option name in the language specified in the `locale` parameter */
  name: string;
}

/**
 * An option activated in the Plan Builder outside of any package.
 * @since 3.16.0
 */
export interface PlanBuilderOption {
  /** Option ID */
  id: string;
  /** Option code (slug) */
  slug: string;
  /** Option name in the language specified in the `locale` parameter */
  name: string;
  /** Option activation status */
  status: PlanBuilderActivationStatus;
  /** Option activation date (ISO 8601) */
  activatedAt?: string;
  /** End date of the minimum duration period; the option cannot be deactivated before this date (ISO 8601) */
  expiresAt?: string;
  /** Cost of activating the option, % of turnover. Returned if the response does not contain the `promotion` object */
  commissionRate?: number;
  /** Minimum duration of the option */
  periodDuration?: number;
  /** Promo details. Present only if the option is activated via a promo whose period has not expired */
  promotion?: PlanBuilderPromotion;
}

/**
 * An option package activated in the Plan Builder.
 * @since 3.16.0
 */
export interface PlanBuilderPackage {
  /** Package ID (UUID) */
  id?: string;
  /** Package code (slug) */
  slug: string;
  /** Package name in the language specified in the `locale` parameter */
  name: string;
  /** Package activation status */
  status: PlanBuilderActivationStatus;
  /** Package activation date (ISO 8601) */
  activatedAt?: string;
  /** End date of the minimum duration period; the package cannot be deactivated before this date (ISO 8601) */
  expiresAt?: string;
  /** Fee for the package, % of turnover */
  commissionRate?: number;
  /** Minimum duration of the package */
  periodDuration?: number;
  /** Options included in the package */
  options?: PlanBuilderOptionShort[];
}

/**
 * Information about all options and option packages the seller activated in the
 * Plan Builder (Tariff Constructor). Returned by GET /api/common/v1/tariff-constructor/options.
 *
 * Options included in activated packages are in `packages`; options activated
 * outside of packages are in `options`.
 * @since 3.16.0
 */
export interface PlanBuilderOptionsInfo {
  /** Number of active options not included in packages */
  activeOptionCount: number;
  /** Number of active option packages */
  activePackageCount: number;
  /** Final fee for activated options and packages, % of turnover */
  totalCommissionRate: number;
  /** Activated option packages */
  packages: PlanBuilderPackage[];
  /** Activated options */
  options: PlanBuilderOption[];
}
