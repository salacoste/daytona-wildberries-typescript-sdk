import RootPackage = require('daytona-wildberries-typescript-sdk');
import FinancesPackage = require('daytona-wildberries-typescript-sdk/finances');
import AnalyticsPackage = require('daytona-wildberries-typescript-sdk/analytics');
import CommunicationsPackage = require('daytona-wildberries-typescript-sdk/communications');
import ReportsPackage = require('daytona-wildberries-typescript-sdk/reports');

type Equal<Left, Right> = [Left] extends [Right] ? ([Right] extends [Left] ? true : false) : false;
type Expect<Value extends true> = Value;

type CreateTestOrders = RootPackage.WildberriesSDK['ordersDBS']['createTestOrders'];
type GetReturns = RootPackage.WildberriesSDK['returns']['getReturns'];

export type FullOkpdLocaleContract = Expect<
  Equal<RootPackage.GetDirectoryOkpdAllOptions['locale'], 'ru' | undefined>
>;
export type SandboxRequestContract = Expect<
  Equal<Parameters<CreateTestOrders>[0], RootPackage.CreateTestDbsOrdersRequest>
>;
export type OperationKeyContract = Expect<
  Equal<RootPackage.RequestOptions['operationKey'], string | undefined>
>;
export type DbsOrdersContract = Expect<
  Equal<RootPackage.GetClientInfoResponse['orders'], RootPackage.DBSClientInfo[] | null | undefined>
>;
export type AdditionalPhonesContract = Expect<
  Equal<RootPackage.DBSClientInfo['additionalPhones'], string[] | undefined>
>;
export type ReturnsRequestContract = Expect<
  Equal<Parameters<GetReturns>[0], RootPackage.ReturnsApiRequest>
>;
export type ReturnsResponseContract = Expect<
  Equal<Awaited<ReturnType<GetReturns>>, RootPackage.ReturnsApiResponse>
>;

export type PackageExportConstructors = [
  typeof RootPackage.WildberriesSDK,
  typeof FinancesPackage.FinancesModule,
  typeof AnalyticsPackage.AnalyticsModule,
  typeof CommunicationsPackage.CommunicationsModule,
  typeof ReportsPackage.ReportsModule,
];
