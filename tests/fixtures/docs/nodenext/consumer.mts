import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import type { FinancesModule } from 'daytona-wildberries-typescript-sdk/finances';

type Sdk = WildberriesSDK;
type Finances = FinancesModule;

declare const sdk: Sdk;
declare const finances: Finances;
void [sdk, finances];
