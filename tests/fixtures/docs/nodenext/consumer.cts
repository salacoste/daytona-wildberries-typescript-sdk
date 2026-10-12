import SDK = require('daytona-wildberries-typescript-sdk');
import Reports = require('daytona-wildberries-typescript-sdk/reports');

type Sdk = InstanceType<typeof SDK.WildberriesSDK>;
type ReportClient = InstanceType<typeof Reports.ReportsModule>;

declare const sdk: Sdk;
declare const reports: ReportClient;
void [sdk, reports];
