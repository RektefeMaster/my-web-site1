---
name: metek-copy-pipeline
description: >
  Orchestrates METEK multilingual copy using content-system semantic briefs.
  Use when writing or revising site UI, services, project cases, blog, or metadata
  for METEK Digital. Enforces inventory → brief → independent locale drafts →
  UX → SEO → per-locale avoid-AI → lint → human gates. Never translate TR marketing
  copy into other locales.
---

# METEK copy pipeline

## Required reading

1. `content-system/global/production-pipeline.md`
2. `content-system/brands/metek/proof-points.md`
3. Resolve `evidence_ids` under `content-system/evidence/`
4. `audience.md` + `voice-profile.md` + `locales.md`
5. Surface `briefs/**/shared.md` (market sections inline)
6. Vendor: `vendor/ux-writing` → `vendor/avoid-ai-writing` (last)

## Hard rules

- Master = **semantic brief**, not finished marketing prose.
- Draft **tr / en / de / es independently**.
- Claims: Verified → Supported → Derived; Forbidden never. Respect `allowed_surfaces` + `writing_policy`.
- `confidence < 90` → not in hero.
- Hero: one core claim + one proof + one CTA.
- SEO queries from market brief sections — do not translate keywords.
- `npm run content:lint` before handoff.
- Founder gate: `golden-batch-review.md`.

## Output

`messages/*.json` and/or `data/project-*.ts` / `data/blog-content/*.ts` — four locales in one change set.
