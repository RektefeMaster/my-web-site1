# Production pipeline

Orchestrated by `.cursor/skills/metek-copy-pipeline/SKILL.md`.

1. Inventory — `npm run content:inventory`
2. Facts — `proof-points.md` + `lib/site.ts` (human `status: approved`)
3. Audience — segment id(s) from `audience.md`
4. Brief — `briefs/**/shared.md` (includes `## Market: *` sections)
5. Draft — tr / en / de / es **independently** (never TR→translate)
6. Structure — every paragraph adds information; vary openings, sentence lengths, and section shapes; compare leads and endings across the full series
7. UX → SEO → avoid-AI (per locale; avoid-AI last)
8. Read aloud — remove metronomic rhythm, stock closers, and repeated project templates
9. Lint — `npm run content:lint`
10. Human — claims + visual (esp. de-DE lengths)
11. Publish QA — titles/H1/alts/hreflang; GSC baseline

## Layout budgets

```yaml
headline_max_chars: 48
support_max_chars: 140
button_max_chars: 22
card_summary_max_chars: 120
```

de-DE often +15–30%; shorten stems. Length overages are report-only unless `--strict-lengths`.

Length compliance does not justify vague copy. Shorten the idea before replacing concrete nouns with slogans.

## Golden batch

`brands/metek/golden-batch-review.md` before further voice iterations.
