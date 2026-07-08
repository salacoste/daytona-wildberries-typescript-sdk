# WB OpenAPI Etalon — Spec Sources & Refresh

The SDK's reference (etalon) is the WB OpenAPI 3.0 spec, stored under `docs/api-reference/raw-yaml/` (raw) and `docs/api-reference/parsed/` (structured). This file documents where each module's spec comes from and how to refresh it.

## Source URL pattern

```
https://dev.wildberries.ru/api/swagger/yaml/{locale}/{NN-module}.yaml
```
- `locale`: `en` | `ru`
- `NN-module`: numbered kebab-name, e.g. `09-communications.yaml`

## Modules

### ✅ Live-fetched (Jul-2026, current)
| # | Module | URL |
|---|---|---|
| 01 | general | `https://dev.wildberries.ru/api/swagger/yaml/en/01-general.yaml` |
| 03 | orders-fbs | `https://dev.wildberries.ru/api/swagger/yaml/en/03-orders-fbs.yaml` |
| 06 | in-store-pickup | `https://dev.wildberries.ru/api/swagger/yaml/en/06-in-store-pickup.yaml` |
| 07 | orders-fbw | `https://dev.wildberries.ru/api/swagger/yaml/en/07-orders-fbw.yaml` |
| 08 | promotion | `https://dev.wildberries.ru/api/swagger/yaml/en/08-promotion.yaml` |
| 09 | communications | `https://dev.wildberries.ru/api/swagger/yaml/en/09-communications.yaml` |
| 11 | analytics | `https://dev.wildberries.ru/api/swagger/yaml/en/11-analytics.yaml` |
| 12 | reports | `https://dev.wildberries.ru/api/swagger/yaml/en/12-reports.yaml` |
| 13 | finances | `https://dev.wildberries.ru/api/swagger/yaml/en/13-finances.yaml` |

### ⚠️ Stopgap — local copy (live slug unknown; WB renamed the file)
| # | Module | Docs section | Note |
|---|---|---|---|
| 02 | products | "Item Management" (`work-with-products`) | local May-2026 copy; live `02-*.yaml` returns 404 |
| 04 | orders-dbs | "DBS Orders" | local copy; live slug unknown |
| 10 | tariffs | "Rates" | local copy; live slug unknown |

The live filenames for these 3 are **not client-discoverable**: the docs portal server-renders spec content into HTML (no YAML request), the `/swagger/<chapter>` UI resolves chapter→file server-side (Next.js RSC), and the client JS bundles contain no module-name→file mapping. To fetch live: open the section's Swagger page in a browser and copy its `/api/swagger/yaml/en/NN-*.yaml` URL, then add it above.

## Fetch method (the endpoint is antibot-protected)

A direct `curl`/`fetch` returns **HTTP 498** (antibot "Почти готово..." challenge). Working procedure:

1. **Playwright passes the challenge.** The `/docs/openapi/*` pages are challenged, but `/swagger/*` is not:
   ```bash
   export PLAYWRIGHT_CLI_SESSION=wb-sdk
   playwright-cli -s=wb-sdk open "https://dev.wildberries.ru/en/swagger/communications" --persistent
   ```
2. **Capture the antibot cookie** (`x_wbaas_token` is the key):
   ```bash
   playwright-cli -s=wb-sdk state-save state.json
   ```
3. **Bulk-fetch with the cookie** (node-fetch + browser User-Agent):
   ```js
   const cookie = cookies.map(c => `${c.name}=${c.value}`).join('; ');
   const r = await fetch(url, { headers: { cookie, 'user-agent': 'Mozilla/5.0 ...' }});
   ```
   (`x_wbaas_token` is short-lived — re-capture if fetches start returning 498.)

The 9 live specs above were fetched this way on 2026-07-08.

## Refresh procedure

```bash
# 1. capture cookie (steps above) → state.json
# 2. bulk-download all known-live modules into docs/api-reference/raw-yaml/
node scripts/refresh-wb-specs.cjs   # (TODO: commit the fetch script)
# 3. re-parse into docs/api-reference/parsed/
node tools/parse-etalon.cjs
# 4. re-run the conformance matcher
node tools/wb-conformance.cjs       # → docs/api-reference/conformance-report.md
```

## Artifacts in this directory
- `raw-yaml/` — the 12 OpenAPI specs (9 live + 3 stopgap). **The etalon.**
- `parsed/` — structured per-module JSON (endpoints, schemas, enums) derived from raw-yaml.
- `conformance-report.md` — automated endpoint-coverage + enum extraction (matcher output).
- `conformance-master-report.md` — synthesized 12-module audit verdicts + prioritized findings.
