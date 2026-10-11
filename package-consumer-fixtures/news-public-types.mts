import type {
  CreateTestDbsOrdersRequest,
  DBSClientInfo,
  DbsTestDeliveryType,
  GetClientInfoResponse,
  GetDirectoryOkpdAllOptions,
  GetDirectoryOkpdOptions,
  GetDirectoryTnvedAllOptions,
  RequestOptions,
  ReturnItem,
  ReturnsApiRequest,
  ReturnsApiResponse,
  WildberriesSDK,
} from 'daytona-wildberries-typescript-sdk';
import type { FinancesModule } from 'daytona-wildberries-typescript-sdk/finances';
import type { AnalyticsModule } from 'daytona-wildberries-typescript-sdk/analytics';
import type { CommunicationsModule } from 'daytona-wildberries-typescript-sdk/communications';
import type { ReportsModule } from 'daytona-wildberries-typescript-sdk/reports';

type Equal<Left, Right> = [Left] extends [Right] ? ([Right] extends [Left] ? true : false) : false;
type Expect<Value extends true> = Value;

type CreatePayload = NonNullable<Parameters<WildberriesSDK['products']['createCardsUpload']>[0]>;
type UpdatePayload = NonNullable<Parameters<WildberriesSDK['products']['createCardsUpdate']>[0]>;
type AddPayload = NonNullable<Parameters<WildberriesSDK['products']['createUploadAdd']>[0]>;
type AddCard = NonNullable<AddPayload['cardsToAdd']>[number];
type ListResponse = Awaited<ReturnType<WildberriesSDK['products']['getCardsList']>>;
type ListedCard = NonNullable<ListResponse['cards']>[number];
type CreateTestOrders = WildberriesSDK['ordersDBS']['createTestOrders'];
type GetReturns = WildberriesSDK['returns']['getReturns'];

export type TnvedLocaleContract = Expect<
  Equal<GetDirectoryTnvedAllOptions['locale'], 'ru' | 'en' | undefined>
>;
export type SubjectOkpdLocaleContract = Expect<
  Equal<GetDirectoryOkpdOptions['locale'], 'ru' | undefined>
>;
export type FullOkpdLocaleContract = Expect<
  Equal<GetDirectoryOkpdAllOptions['locale'], 'ru' | undefined>
>;
export type FullOkpdSearchContract = Expect<
  Equal<GetDirectoryOkpdAllOptions['search'], number | undefined>
>;
export type CreateGtinContract = Expect<
  Equal<CreatePayload[number]['variants'][number]['gtin'], string | undefined>
>;
export type UpdateGtinContract = Expect<Equal<UpdatePayload[number]['gtin'], string | undefined>>;
export type AddGtinContract = Expect<Equal<AddCard['gtin'], string | undefined>>;
export type ListedGtinContract = Expect<Equal<ListedCard['gtin'], string | undefined>>;
export type SandboxDeliveryTypeContract = Expect<
  Equal<DbsTestDeliveryType, 'dbs' | 'dbsPickupPoint' | 'edbs'>
>;
export type SandboxRequestContract = Expect<
  Equal<Parameters<CreateTestOrders>[0], CreateTestDbsOrdersRequest>
>;
export type SandboxResultContract = Expect<Equal<Awaited<ReturnType<CreateTestOrders>>, void>>;
export type OperationKeyContract = Expect<
  Equal<RequestOptions['operationKey'], string | undefined>
>;
export type DbsOrdersContract = Expect<
  Equal<GetClientInfoResponse['orders'], DBSClientInfo[] | null | undefined>
>;
export type AdditionalPhonesContract = Expect<
  Equal<DBSClientInfo['additionalPhones'], string[] | undefined>
>;
export type ReplacementPhonesContract = Expect<
  Equal<DBSClientInfo['replacementAdditionalPhones'], string[] | undefined>
>;
export type ReturnsRequestContract = Expect<Equal<Parameters<GetReturns>[0], ReturnsApiRequest>>;
export type ReturnsResponseContract = Expect<
  Equal<Awaited<ReturnType<GetReturns>>, ReturnsApiResponse>
>;
export type ReturnSkuContract = Expect<Equal<ReturnItem['sku'], string | undefined>>;

export type PackageExportConstructors = [
  WildberriesSDK,
  FinancesModule,
  AnalyticsModule,
  CommunicationsModule,
  ReportsModule,
];

const sandboxRequest: CreateTestDbsOrdersRequest = {
  orders: [{ sku: 'TEST-SKU', amount: 1 }],
  deliveryType: 'dbsPickupPoint',
};
const nullableDbsOrders: GetClientInfoResponse = { orders: null };
const requestOptions: RequestOptions = { operationKey: 'ordersDBS.createTestOrders' };
const returnsRequest: ReturnsApiRequest = {
  dateFrom: '2026-10-01',
  dateTo: '2026-10-02',
  orderType: 'fbo',
};

void sandboxRequest;
void nullableDbsOrders;
void requestOptions;
void returnsRequest;
