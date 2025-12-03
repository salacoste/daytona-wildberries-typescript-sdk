[Wildberries API TypeScript SDK](../modules.md) / ReturnRequest

# Interface: ReturnRequest

Defined in: [types/communications.types.ts:1894](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1894)

Return request with customer data and status

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Return request ID | [types/communications.types.ts:1898](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1898) |
| <a id="createdat"></a> `createdAt` | `string` | Return request date (ISO 8601) | [types/communications.types.ts:1903](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1903) |
| <a id="customerid"></a> `customerID` | `string` | Customer ID from GoodCard clientID (number converted to string) | [types/communications.types.ts:1908](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1908) |
| <a id="orderuid"></a> `orderUID` | `string` | Order ID from GoodCard orderID (string) | [types/communications.types.ts:1913](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1913) |
| <a id="product"></a> `product` | [`ReturnProduct`](ReturnProduct.md) | Product details | [types/communications.types.ts:1918](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1918) |
| <a id="quantity"></a> `quantity` | `number` | Return quantity | [types/communications.types.ts:1923](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1923) |
| <a id="price"></a> `price` | `number` | Return price (seller price × quantity) | [types/communications.types.ts:1928](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1928) |
| <a id="currency"></a> `currency` | `string` | Currency code (always 'RUB') | [types/communications.types.ts:1933](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1933) |
| <a id="status"></a> `status` | [`ReturnStatus`](../type-aliases/ReturnStatus.md) | Current return status | [types/communications.types.ts:1938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1938) |
| <a id="created"></a> `created` | `number` | When return was created (Unix timestamp) | [types/communications.types.ts:1943](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1943) |
| <a id="updated"></a> `updated` | `number` | When return was last updated (Unix timestamp) | [types/communications.types.ts:1948](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1948) |
| <a id="chatid"></a> `chatId?` | `string` | Chat ID associated with this return (if any) | [types/communications.types.ts:1953](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1953) |
| <a id="chatmessageid"></a> `chatMessageId?` | `string` | Chat message associated with this return (if any) | [types/communications.types.ts:1958](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1958) |
| <a id="returnimages"></a> `returnImages?` | [`ReturnImage`](ReturnImage.md)[] | Return images provided by customer (optional) | [types/communications.types.ts:1963](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1963) |
| <a id="tracking"></a> `tracking` | [`ReturnTracking`](ReturnTracking.md) | Return tracking information | [types/communications.types.ts:1968](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1968) |
| <a id="refund"></a> `refund?` | [`RefundInfo`](RefundInfo.md) | Refund information (when applicable) | [types/communications.types.ts:1973](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1973) |
| <a id="metrics"></a> `metrics?` | [`ReturnMetrics`](ReturnMetrics.md) | Performance metrics for return processing | [types/communications.types.ts:1978](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1978) |
| <a id="deliveryaddress"></a> `deliveryAddress?` | [`CommunicationsAddress`](CommunicationsAddress.md) | /** * Customer's actual delivery address from GoodCard order | [types/communications.types.ts:1984](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1984) |
