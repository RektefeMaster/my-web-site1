# Evidence index — METEK

Claim → `evidence_ids` → file. Each file declares machine fields:

```yaml
id: WCC-001
path: data/project-details.ts   # must exist
anchor: wcc                     # optional; for type=project checked in data/projects.ts
type: project | locale | brand | quality | process | technical | portfolio-index
```

Verify all refs: `npm run content:evidence`

```text
evidence/
  projects/     # portfolio / case facts
  quality/      # release gates
  brand/        # identity & contact
  seo/          # locales & search practices
  process/      # delivery model & copy pipeline
```

| ID | File | path |
|----|------|------|
| WCC-001 | [projects/WCC-001.md](projects/WCC-001.md) | data/project-details.ts |
| MASAL-001 | [projects/MASAL-001.md](projects/MASAL-001.md) | data/project-details.ts |
| AIAHI-001 | [projects/AIAHI-001.md](projects/AIAHI-001.md) | data/projects.ts |
| CRM-001 | [projects/CRM-001.md](projects/CRM-001.md) | data/projects.ts |
| CSS-001 | [projects/CSS-001.md](projects/CSS-001.md) | data/projects.ts |
| PORT-001 | [projects/PORT-001.md](projects/PORT-001.md) | data/projects.ts |
| STACK-001 | [projects/STACK-001.md](projects/STACK-001.md) | package.json |
| QG-001 | [quality/QG-001.md](quality/QG-001.md) | content-system/brands/metek/quality-gate.md |
| BRAND-001 | [brand/BRAND-001.md](brand/BRAND-001.md) | lib/site.ts |
| LOC-001 | [seo/LOC-001.md](seo/LOC-001.md) | messages/ |
| PROC-001 | [process/PROC-001.md](process/PROC-001.md) | content-system/brands/metek/voice-profile.md |
| PROC-002 | [process/PROC-002.md](process/PROC-002.md) | content-system/global/production-pipeline.md |
