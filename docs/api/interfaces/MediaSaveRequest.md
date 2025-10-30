[Wildberries API TypeScript SDK](../modules.md) / MediaSaveRequest

# Interface: MediaSaveRequest

Defined in: [types/products.types.ts:1049](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1049)

Request body for uploading media via URLs

**CRITICAL:** This COMPLETELY REPLACES all existing media.
To add new media, include both new AND old URLs.

**All-or-Nothing:** If ANY file fails validation, NONE upload.

**URL Requirements:**
- Direct file link (not preview/HTML page)
- No authentication required
- Must return file content, not text

## Example

```typescript
// BAD - Loses existing media
await uploadMediaByURLs(12345, ['https://new-photo.jpg']);

// GOOD - Preserves existing media
const existing = await getMediaList(12345);
await uploadMediaByURLs(12345, [...existing, 'https://new-photo.jpg']);
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Wildberries article ID | [types/products.types.ts:1051](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1051) |
| <a id="data"></a> `data` | `string`[] | Array of media URLs (max 30 images + 1 video) | [types/products.types.ts:1053](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/products.types.ts#L1053) |
