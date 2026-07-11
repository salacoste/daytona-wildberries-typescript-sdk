[Wildberries API TypeScript SDK](../modules.md) / parseBidOutOfRangeDetail

# Function: parseBidOutOfRangeDetail()

```ts
function parseBidOutOfRangeDetail(detail: unknown): ParsedBidRange | null;
```

Defined in: [errors/bid-out-of-range-error.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/errors/bid-out-of-range-error.ts#L73)

Parse a WB advert `detail` string for the bid-out-of-range format.

Pure, side-effect-free, network-free. Exported so callers (and tests) can
probe a detail string without constructing a full error, and so BaseClient
can reuse it without duplicating the regex.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `detail` | `unknown` | The `detail` field from a WB RFC 7807 400 response |

## Returns

[`ParsedBidRange`](../-internal-/interfaces/ParsedBidRange.md) \| `null`

Parsed `{ received, min, max? }` when the detail matches the
  bid-out-of-range shape, otherwise `null`

## Example

```typescript
parseBidOutOfRangeDetail('wrong bid value: 3; min: 150');
// => { received: 3, min: 150 }

parseBidOutOfRangeDetail('wrong bid value: 3; min: 150; max: 5000');
// => { received: 3, min: 150, max: 5000 }

parseBidOutOfRangeDetail('some other validation error');
// => null
```
