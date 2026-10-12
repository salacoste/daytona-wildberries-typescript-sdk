import { describe, expect, it } from 'vitest';

import {
  normalizeDocumentationFragment,
  vitePressSlugify,
} from '../../../docs/.vitepress/fragment-utils';

describe('documentation fragment normalization', () => {
  it('uses the VitePress heading slug for human-readable fragments', () => {
    expect(vitePressSlugify('1. Campaign bid_type Enum Changes')).toBe(
      '_1-campaign-bid-type-enum-changes'
    );
  });

  it('preserves exact TypeDoc IDs instead of rewriting their underscores', () => {
    const explicitIds = new Set(['bid_type']);

    expect(normalizeDocumentationFragment('bid_type', explicitIds)).toBe('bid_type');
  });
});
