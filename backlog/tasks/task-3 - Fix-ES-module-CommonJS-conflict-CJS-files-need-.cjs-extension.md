---
id: task-3
title: Fix ES module/CommonJS conflict - CJS files need .cjs extension
status: Done
assignee:
  - '@james'
created_date: '2025-11-13'
updated_date: '2025-11-13'
labels: []
dependencies: []
---

## Description

Critical bug: CommonJS files in dist/cjs/ have .js extension instead of .cjs, causing ReferenceError when package.json has type:module

## Acceptance Criteria

- [x] CJS files built with .cjs extension
- [x] package.json exports updated to reference .cjs files
- [x] Both ESM and CJS imports work correctly
- [x] Tests pass for both module systems

## Implementation Plan

1. Update vite.config.ts to output .cjs extension for CommonJS builds
2. Update package.json exports to reference .cjs files instead of .js
3. Rebuild the project
4. Verify both ESM and CJS imports work correctly
5. Run test suite to ensure no regressions

## Implementation Notes

### Problem Analysis
- **Root Cause**: When `package.json` contains `"type": "module"`, Node.js treats ALL `.js` files as ES modules
- **Symptom**: CommonJS code in `dist/cjs/index.js` (with `exports.something = ...`) was being interpreted as ESM → `ReferenceError: exports is not defined`
- **Solution**: CommonJS files MUST use `.cjs` extension when package.json has `"type": "module"`

### Changes Made

1. **vite.config.ts** (line 35):
   - Changed CommonJS output from `cjs/index.js` to `cjs/index.cjs`
   - Added detailed comment explaining the fix and linking to Node.js documentation

2. **package.json** (lines 18-46):
   - Updated `main` field: `./dist/cjs/index.js` → `./dist/cjs/index.cjs`
   - Updated all `exports` paths to use `.cjs` extension:
     - Main export: `./dist/cjs/index.cjs`
     - Subpath exports (finances, analytics, communications, reports): all `.cjs`

### Verification

- ✅ Build successful: `dist/cjs/index.cjs` created (108.03 kB, gzip: 28.51 kB)
- ✅ ESM build unchanged: `dist/esm/index.js` (454.65 kB, gzip: 84.61 kB)
- ✅ All 1,584 tests passed (54 test files, 84.51s)
- ✅ Code coverage maintained: 97.17% (no regressions)
- ✅ CommonJS code properly recognized: file contains `"use strict";Object.defineProperties(exports,...`

### Technical Details

- **Module Resolution**: Node.js now correctly identifies `.cjs` files as CommonJS regardless of package.json `type` field
- **Dual Package Support**: SDK now properly supports both ESM (`import`) and CJS (`require`) imports
- **Backward Compatibility**: Previous versions may need upgrade; this is a patch release fixing critical bug

### Files Modified

- `vite.config.ts` - Updated fileName function for CJS format
- `package.json` - Updated main field and all exports paths to `.cjs`
- `dist/cjs/index.cjs` - Generated with correct extension (previously `.js`)
