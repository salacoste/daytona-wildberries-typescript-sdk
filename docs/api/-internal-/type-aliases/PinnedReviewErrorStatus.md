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

Defined in: [types/communications.types.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L48)

Error status codes for pinned reviews operations
