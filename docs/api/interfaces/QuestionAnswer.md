[Wildberries API TypeScript SDK](../modules.md) / QuestionAnswer

# Interface: QuestionAnswer

Defined in: [types/communications.types.ts:501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L501)

Answer to a customer question

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="text"></a> `text` | `string` | Answer text content | [types/communications.types.ts:505](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L505) |
| <a id="editable"></a> `editable` | `boolean` | Whether answer can be edited - `false` — cannot edit (60 days passed or not editable) - `true` — can edit (within 60 days, edit once allowed) | [types/communications.types.ts:512](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L512) |
| <a id="createdate"></a> `createDate` | `string` | Answer creation timestamp (ISO 8601) **Example** `"2024-01-16T10:00:00Z"` | [types/communications.types.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L518) |
