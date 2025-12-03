[Wildberries API TypeScript SDK](../modules.md) / ReturnTracking

# Interface: ReturnTracking

Defined in: [types/communications.types.ts:1990](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1990)

Return tracking information

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="status"></a> `status` | \| `"canceled"` \| `"created"` \| `"delivered"` \| `"returned"` \| `"archived"` \| `"in_transit"` | Return tracking status (not to be confused with ReturnStatus) | [types/communications.types.ts:1994](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1994) |
| <a id="id"></a> `id` | `number` | Return ID | [types/communications.types.ts:1999](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1999) |
| <a id="createdat"></a> `createdAt` | `string` | Return creation timestamp (ISO 8601) | [types/communications.types.ts:2004](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2004) |
| <a id="updatedat"></a> `updatedAt` | `string` | Return last updated timestamp (ISO 8601) | [types/communications.types.ts:2009](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2009) |
| <a id="confirmedat"></a> `confirmedAt` | `string` | /** * Return confirmation timestamp (ISO 8601) | [types/communications.types.ts:2015](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2015) |
| <a id="wbreturnid"></a> `wbReturnId?` | `string` | /** * Returns tracking ID from the WB API | [types/communications.types.ts:2021](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2021) |
| <a id="returnid"></a> `returnId?` | `number` | Return office ID where return was processed | [types/communications.types.ts:2026](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2026) |
| <a id="officeid"></a> `officeId?` | `number` | Return office where return should be delivered | [types/communications.types.ts:2031](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2031) |
| <a id="returndate"></a> `returnDate` | `string` | Return timestamp (ISO 8601) | [types/communications.types.ts:2036](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2036) |
| <a id="returnaddress"></a> `returnAddress?` | [`CommunicationsAddress`](CommunicationsAddress.md) | Return delivery address | [types/communications.types.ts:2041](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2041) |
