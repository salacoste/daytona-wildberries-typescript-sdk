[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PinnedReviewErrorStatus

# Type Alias: PinnedReviewErrorStatus

```ts
type PinnedReviewErrorStatus = 
  | "feedbackNotFound"
  | "itemNotFound"
  | "feedbackMismatch"
  | "itemNoImages"
  | "feedbackExcluded"
  | "imtNotDisplayed"
  | "globalLimitReached"
  | "unitLimitReached"
  | "tariffRestriction"
  | "subscriptionRestriction"
  | "alreadyPinned"
  | "bodyNotValid";
```

Defined in: [types/communications.types.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/communications.types.ts#L48)

Error status codes for pinned reviews operations
