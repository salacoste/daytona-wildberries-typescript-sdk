[Wildberries API TypeScript SDK](../modules.md) / UpdatePassRequest

# Interface: UpdatePassRequest

Defined in: [types/orders-fbs.types.ts:756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L756)

Request type for updatePass endpoint
PUT /api/v3/passes/{passId}

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="firstname"></a> `firstName` | `string` | Driver first name (min 1 character) | [types/orders-fbs.types.ts:758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L758) |
| <a id="lastname"></a> `lastName` | `string` | Driver last name (min 6 characters) | [types/orders-fbs.types.ts:760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L760) |
| <a id="carmodel"></a> `carModel` | `string` | Vehicle model (1-100 characters) | [types/orders-fbs.types.ts:762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L762) |
| <a id="carnumber"></a> `carNumber` | `string` | Vehicle license plate (6-9 characters, letters and digits only) | [types/orders-fbs.types.ts:764](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L764) |
| <a id="officeid"></a> `officeId` | `number` | Warehouse/office ID | [types/orders-fbs.types.ts:766](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L766) |
