import { WildberriesSDK } from '../../../src/index';

type Equal<Left, Right> = [Left] extends [Right]
  ? [Right] extends [Left]
    ? true
    : false
  : false;
type Expect<Value extends true> = Value;

export async function compileEnglishProductsGuideFences(sdk: WildberriesSDK): Promise<void> {
  // Exact body of the "TN VED and OKPD2 Directories" TypeScript fence.
  const tnved = await sdk.products.getDirectoryTnvedAll({
    search: 6106,
    locale: 'en',
  });

  const subjectOkpd = await sdk.products.getDirectoryOkpd({
    subjectId: 105,
    search: '61.06',
    locale: 'ru',
  });

  const allOkpd = await sdk.products.getDirectoryOkpdAll({
    search: 61.06,
    locale: 'ru',
  });

  // Exact body of the "Additional GTIN" TypeScript fence.
  const historicalGtin = '04600000000018';

  await sdk.products.createCardsUpload([{
    subjectID: 105,
    variants: [{
      vendorCode: 'ART-GTIN-CREATE',
      gtin: historicalGtin,
      sizes: [{ skus: ['04600000000995'] }],
    }],
  }]);

  await sdk.products.createCardsUpdate([{
    nmID: 12345678,
    vendorCode: 'ART-GTIN-UPDATE',
    gtin: historicalGtin,
    sizes: [{ skus: ['04600000000996'] }],
  }]);

  await sdk.products.createUploadAdd({
    imtID: 98765,
    cardsToAdd: [{
      vendorCode: 'ART-GTIN-ADD',
      gtin: historicalGtin,
      sizes: [{ skus: ['04600000000997'] }],
    }],
  });

  const cards = await sdk.products.getCardsList({
    settings: { cursor: { limit: 100 } },
  });
  const listedGtin: string | undefined = cards.cards?.[0]?.gtin;

  void tnved;
  void subjectOkpd;
  void allOkpd;
  void listedGtin;
}

type CreatePayload = NonNullable<
  Parameters<WildberriesSDK['products']['createCardsUpload']>[0]
>;
type UpdatePayload = NonNullable<
  Parameters<WildberriesSDK['products']['createCardsUpdate']>[0]
>;
type AddPayload = NonNullable<Parameters<WildberriesSDK['products']['createUploadAdd']>[0]>;
type AddCard = NonNullable<AddPayload['cardsToAdd']>[number];
type ListResponse = Awaited<ReturnType<WildberriesSDK['products']['getCardsList']>>;
type ListedCard = NonNullable<ListResponse['cards']>[number];

export type CreateGtinIsOptionalNonNullString = Expect<
  Equal<CreatePayload[number]['variants'][number]['gtin'], string | undefined>
>;
export type UpdateGtinIsOptionalNonNullString = Expect<
  Equal<UpdatePayload[number]['gtin'], string | undefined>
>;
export type AddGtinIsOptionalNonNullString = Expect<
  Equal<AddCard['gtin'], string | undefined>
>;
export type ListGtinIsOptionalNonNullString = Expect<
  Equal<ListedCard['gtin'], string | undefined>
>;

const createWithoutGtin: CreatePayload = [{
  subjectID: 105,
  variants: [{ vendorCode: 'NO-GTIN-CREATE', sizes: [] }],
}];
const updateWithoutGtin: UpdatePayload = [{
  nmID: 12345678,
  vendorCode: 'NO-GTIN-UPDATE',
  sizes: [],
}];
const addWithoutGtin: AddPayload = {
  cardsToAdd: [{ vendorCode: 'NO-GTIN-ADD', sizes: [] }],
};
const listWithoutGtin: ListedCard = { nmID: 12345678 };

void createWithoutGtin;
void updateWithoutGtin;
void addWithoutGtin;
void listWithoutGtin;
