[Wildberries API TypeScript SDK](../modules.md) / warnOnce

# Function: warnOnce()

```ts
function warnOnce(methodKey: string, message: string): void;
```

Defined in: [utils/deprecation.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/deprecation.ts#L28)

Emit a deprecation warning for a method, at most once per process.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `methodKey` | `string` | Unique identifier for the deprecated method (e.g. 'products.getCardsList:legacy-withphoto-zero') |
| `message` | `string` | The warning message to display |

## Returns

`void`

## Example

```typescript
warnOnce(
  'products.getCardsList:legacy-withphoto-zero',
  '[DEPRECATED] withPhoto: 0 semantics changed. Use WITH_PHOTO_FILTER.NO_PHOTO for "no photo only".'
);
```
