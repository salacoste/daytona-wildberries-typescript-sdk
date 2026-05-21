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

Defined in: [types/communications.types.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/communications.types.ts#L48)

Error status codes for pinned reviews operations
