# EPIC 48 — SDK Timeout & Configuration DX Improvements

## Epic Goal

Improve SDK developer experience by adding per-request timeout support, enhancing retry/timeout logging transparency, and ensuring documentation clearly communicates all available configuration options — addressing real user confusion about SDK capabilities.

## Epic Description

### Background & User Feedback

Real-world users reported that "WildberriesSDK не предоставляет способа настроить timeout в конструкторе. Параметры только `{ apiKey }`". This is factually incorrect — the SDK supports `timeout`, `retryConfig`, `rateLimitConfig`, `logLevel`, and `baseUrls`. However, the fact that users don't know about these options indicates a serious documentation and discoverability gap.

Additionally, users experience ETIMEDOUT errors on long-running operations (e.g., orders_fbs_sync with large datasets) without understanding that:
1. The timeout is configurable
2. Retries happen automatically
3. The default 30s timeout can be increased

### Existing System Context

- **SDK Config**: `SDKConfig` interface in `src/config/sdk-config.ts` — already supports timeout
- **Request Options**: `RequestOptions` interface — missing per-request timeout
- **Base Client**: `src/client/base-client.ts` — axios instance with global timeout only
- **Retry Handler**: `src/client/retry-handler.ts` — retries timeouts but logs minimally
- **Error Classes**: `NetworkError` with `isTimeout` flag — works correctly
- **Documentation**: VitePress site at GitHub Pages, `docs/guides/configuration.md` exists
- **Examples**: 47+ example files in `examples/`

### Enhancement Details

Three stories addressing SDK code, logging, and documentation:

1. **Per-request timeout override** — Add `timeout` to `RequestOptions`, pass to axios per-call
2. **Retry/timeout logging transparency** — Log retry attempts, timeout warnings, backoff delays
3. **Configuration documentation overhaul** — README, guides, examples, FAQ updates (EN + RU)

### Success Criteria

- Users can set timeout per-request for long-running operations
- Users see informative logs during retry/timeout scenarios
- Documentation clearly shows all configuration options with practical examples
- GitHub Pages updated with new content

## Stories

### Story 1: Per-Request Timeout in RequestOptions
**Scope**: SDK code change (backward compatible)
- Add `timeout?: number` to `RequestOptions` interface
- Update `BaseClient.get/post/put/patch/delete` to pass per-request timeout to axios config
- Per-request timeout overrides global `SDKConfig.timeout`
- Update unit tests for BaseClient
- Update type exports

### Story 2: Retry & Timeout Logging Transparency
**Scope**: SDK code change (backward compatible)
- Add `info`-level log on each retry attempt: "Retry {n}/{max} for {url} after {delay}ms"
- Add `warn`-level log on timeout: "Request to {url} timed out after {timeout}ms"
- Add `debug`-level log with full retry context (error details, attempt history)
- Respect existing `logLevel` configuration
- Update retry-handler and base-client logging

### Story 3: Configuration Documentation & Examples
**Scope**: Documentation + GitHub Pages
- Update `docs/guides/configuration.md` with comprehensive timeout/retry examples
- Update `README.md` quickstart with configuration beyond `{ apiKey }`
- Create `examples/custom-timeout-configuration.ts` example
- Add timeout FAQ entries to `FAQ.md`
- Update Russian docs (`docs/ru/guides/configuration.md`)
- Ensure GitHub Pages deployment includes all changes

## Compatibility Requirements

- [x] Existing APIs unchanged (all changes are additive)
- [x] No DB changes
- [x] RequestOptions changes backward compatible (new optional field)
- [x] No breaking changes to any module
- [x] Existing tests continue to pass

## Risk Mitigation

- **Primary Risk**: Per-request timeout may interact unexpectedly with retry handler
- **Mitigation**: Per-request timeout applies to each individual attempt, not total retry time
- **Rollback Plan**: Revert optional `timeout` field — no breaking change

## Definition of Done

- [ ] All 3 stories completed with AC met
- [ ] Existing functionality verified (all tests pass)
- [ ] GitHub Pages deployed with updated docs
- [ ] No regressions in any module
- [ ] CHANGELOG updated for v3.2.0
