# Generated API reference refresh — October 2026

## Scope and ownership

This report records the isolated TypeDoc refresh for `docs/api/**`. The generated API reference and this report are the only owned paths for this lane. Source, tests, task records, the canonical spec, Git staging, commits, and final delivery records remain owned by the integration lane.

The package source test baseline of 2,555 unit tests and 228 mocked integration tests is prior integration evidence supplied for this handoff; this documentation lane does not repeat that suite and does not claim task completion or release readiness.

## Confirmed stale baseline

Before regeneration, the checked-in generated reference had the following concrete defects:

- `docs/api/classes/ProductsModule.md` omitted `getDirectoryTnvedAll()`, `getDirectoryOkpd()`, and `getDirectoryOkpdAll()`.
- `docs/api/interfaces/ReturnItem.md`, `docs/api/classes/ReturnsModule.md`, and `docs/api/classes/WildberriesSDK.md` still described FBO data as coming from `getAnalyticsGoodsReturn()` instead of the v1 item-returns source.
- root-exported `DBSClientInfo` and `GetClientInfoResponse` were documented only under `docs/api/-internal-/interfaces/`, without public interface pages.
- newly exported directory types and the October additions to GTIN, finance, and Returns SKU contracts were not yet synchronized across the generated reference.

`git status --short -- docs/api backlog/docs/wb-api-news-2026-10-generated-docs-fix.md` showed no pre-existing `docs/api/**` changes before this lane wrote the report. The custom `docs/api/index.md` is preserved from `docs/api-templates/index.md` as required by the project pipeline.

## Generation and synchronization record

The installed project TypeDoc toolchain was run without installing dependencies, using live credentials, or calling WB services:

```bash
npm exec typedoc -- --out /tmp/wb-sdk-generated-docs-KCa5TW
cp docs/api-templates/index.md /tmp/wb-sdk-generated-docs-KCa5TW/index.md
```

TypeDoc exited 0 and generated 802 Markdown pages. The custom API landing page was restored in the isolated output from the project template before comparison, matching the `docs:build` pipeline.

The synchronization was deliberately scoped from a complete fresh generation. A path was selected when it was new or when its content still differed after normalizing only the generated Git revision and TypeScript source-line anchors. This produced 37 add/update paths and two obsolete internal paths. The other 765 shared pages contained source-link revision/line churn only and were omitted.

The exact selected path manifest is retained at `/tmp/wb-sdk-generated-docs-KCa5TW-selected-manifest.txt` (SHA-256 `984b70675bd6f35b47a32f94f55cdf7b2b0b0f3e67430d81242cdc07aa3f276f`). The corresponding ordered per-path content-hash manifest is retained at `/tmp/wb-sdk-generated-docs-KCa5TW-selected-sha256.txt` (SHA-256 `fe3aebefbad52a2da90a93505ae9680e5bb6088dd54d6cfdf5668017260b305b`). All 37 synchronized files compare byte-for-byte with the isolated generator output.

Selected generated paths:

- internal Returns v1 pages: `GetAnalyticsV1GoodsReturnParams`, `GoodsReturnV1Item`, `GoodsReturnV1Response`, and `GoodsReturnStatus`;
- internal Analytics/Finance request and row pages: `SalesFunnelGroupReq`, `SalesFunnelProductReq`, `SalesReportDetailedItem`, `SearchReportGroupReq`, `SearchReportProductReq`, and `SearchReportTextReq`;
- internal FBS waybill pages: `UpdateSuppliesWaybillRequest`, `UpdateSupplyWaybill`, and `SupplyShippingType`;
- class pages: `AnalyticsModule`, `OrdersDbsModule`, `OrdersFBSModule`, `ProductsModule`, `PromotionModule`, `ReportsModule`, `ReturnsModule`, and `WildberriesSDK`;
- public DBS pages: `DBSClientInfo` and `GetClientInfoResponse`;
- public directory pages: `GetDirectoryOkpdAllOptions`, `GetDirectoryOkpdOptions`, `GetDirectoryOkpdResponse`, `GetDirectoryTnvedAllOptions`, `GetDirectoryTnvedAllResponse`, `OkpdDirectoryEntry`, `TnvedDirectoryEntry`, `GetDirectoryOkpdAllResponse`, `OkpdDirectoryLocale`, and `TnvedDirectoryLocale`;
- public Returns pages: `ReturnItem` and `ReturnsApiRequest`;
- generated indexes: `docs/api/modules.md` and `docs/api/-internal-/modules.md`.

The obsolete internal `DBSClientInfo` and `GetClientInfoResponse` pages were removed because the root exports now generate their canonical pages under `docs/api/interfaces/`. The resulting generated change set is 19 modified pages, 18 new pages, and two removed pages. The repository and isolated output each contain 802 Markdown pages, with zero remaining semantic path/content differences under the same source-link normalization.

Key synchronized content hashes:

| Path | SHA-256 |
|---|---|
| `docs/api/classes/ProductsModule.md` | `58260a94da7e74c1cc2ffa33a596c24a6d12d923e860cde28f4194cd5049b7ab` |
| `docs/api/interfaces/ReturnItem.md` | `c27ca2e77905e5d3d32e3a90f7bfae36d8285f74826e2719ab094edbfbc8e629` |
| `docs/api/classes/ReturnsModule.md` | `bfc966b0a333cab3c86309a954ab1170468b55df9d6f0ae4219d4ff5f1b81769` |
| `docs/api/classes/WildberriesSDK.md` | `9967c92e665d465d4ca3b4b65ed3e3ea1a560c6c2d42437530985de944bca58c` |
| `docs/api/interfaces/DBSClientInfo.md` | `a71cb02a3f344e8d5a92c753d5f5786cd60803623ed43dc434f08fac6043bcf3` |
| `docs/api/interfaces/GetClientInfoResponse.md` | `f55b3194bdb4952c7b1e59eb95af7081ced7a8c2f7f06e232d9f62a0a524fded` |
| `docs/api/-internal-/interfaces/SalesReportDetailedItem.md` | `982f0aa3f85f54b5cf75f8cd757aa0bfac9ea4800df5513c98e0f98d0745af6e` |
| `docs/api/modules.md` | `d9ed98d422027b5cd1eb270bdc30adc445c4b85fc0f545c11b09718f32431659` |

`docs/api/index.md` remains byte-identical to `docs/api-templates/index.md`; both have SHA-256 `7f9b53c8e0d687db2991d788b208cee044cbe0d539952ac52ac96a35491bcb6b`.

## Validation

- `npm run docs:validate` — exit 0; TypeDoc validation passed.
- `npm run validate:links` — exit 0; 1,615/1,615 Markdown files checked, 190 links checked, 0 broken.
- `npm exec vitepress -- build docs --outDir /tmp/wb-sdk-generated-docs-KCa5TW-vitepress` — exit 0; client/server bundles and all pages rendered in 31.36 seconds. VitePress emitted its non-failing large-chunk advisory.
- selected-manifest byte comparison — all 37 synchronized pages match the isolated output.
- generated-tree semantic comparison — zero remaining new, removed, or content-different paths after normalizing only generated source-link revision and line anchors.
- targeted symbol assertions — all three Products directory methods, public DBS response types, directory types, Product GTIN fields, Finance buyer KPP/UPD/UKD fields, and `ReturnItem.sku` are present; the three affected Returns-facing public pages contain `getAnalyticsV1GoodsReturn` and no `getAnalyticsGoodsReturn` reference.
- `git diff --check -- docs/api backlog/docs/wb-api-news-2026-10-generated-docs-fix.md` — exit 0.

Other generated pages still mention `getAnalyticsGoodsReturn` where they document the still-exported deprecated Reports method or the legacy `enrichReturnsWithType` helper. Those are source-faithful legacy API references, not stale source attribution in `ReturnItem`, `ReturnsModule`, or `WildberriesSDK`.

The source test suites were not rerun. Their 2,555/228 green results remain prior integration evidence rather than evidence produced by this documentation lane.

## Review state

The owned generated API documentation is ready for final review. This statement is limited to `docs/api/**` and this evidence report; it is not a task-Done, package-ready, release-ready, or broader local-ready claim.

The report exists at the requested path, but `backlog/` is ignored by the repository-wide `.gitignore`. The integration staging owner must explicitly include this report when composing the final staged set. This lane did not stage or commit any file.
