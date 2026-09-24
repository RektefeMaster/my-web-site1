# Portfolio cases — shared semantic brief

This brief covers project pages other than WCC and MASAL. WCC: `projects/wcc/shared.md`. MASAL: `projects/masal-koltuk/shared.md`.

```yaml
page_goal: Show the business situation, the shipped interface, and the primary user path without inventing commercial outcomes.
primary_audience: [rebuild_legacy, ops_panel, boutique_brand, global_vertical]
main_message: METEK designs the public experience and, where required, the operational surface behind it.
required_information:
  - What the business or product is
  - What METEK built
  - Which user task organizes the interface
  - Recorded stack
  - A scoped next action
desired_action: View the work, visit the live site when available, or describe a related project.
tone_constraints: Case-study concrete; one useful observation per paragraph; no repeated stock closer.
claims_not_allowed: [traffic lift, conversion lift, revenue, ranking, awards, uptime, invented testimonial]
constraints:
  headline_max_chars: 48
  support_max_chars: 150
  button_max_chars: 22
  card_summary_max_chars: 150
```

## Case map

| Project | Business surface | Primary reader task | Evidence |
|---|---|---|---|
| `masal-koltuk` | Local search site + dated chat-engine captures | See dedicated brief | `MASAL-001` |
| `aydnnacar` | Furniture catalog | Browse collections and contact sales about a model | `data/projects.ts`, `data/project-details.ts`, screenshots |
| `wuffbutik` | Boutique storefront | Browse collections, find the store, open WhatsApp | same |
| `altitude-residence` | Residence sales site | Compare residences and request a viewing | same |
| `casa-aurelia` | Bilingual hotel site | Review rooms and move to reservation contact | same |
| `seraphine-atelier` | Fashion lookbook | Browse women/men collections and request a fitting | same |
| `havva-baklava` | Workshop ordering site | See current offer and order through WhatsApp | same |
| `sahra-butik` | Boutique catalog | Browse lines and ask about size or stock | same |
| `vela-skin-atelier` | Skin studio booking site | Review protocols and request a consultation | same |
| `aiahi` | WhatsApp assistant + CRM | Turn appointment inquiries into calendar and customer records | `AIAHI-001` |
| `whatsapp-bot` | WhatsApp automation | Answer known service questions and handle appointment steps | `AIAHI-001`, `CRM-001` |
| `instagram-bot` | Instagram automation | Handle price/appointment questions on the shared schedule | `AIAHI-001`, `CRM-001` |
| `crm` | Operations panel | Review bookings, customer details, channel history, and notes | `CRM-001` |
| `css-system` | CSS design system | Share tokens and components across public and internal interfaces | `CSS-001` |

## Writing shape

- The summary opens with the client or operating situation. It does not begin with mood adjectives.
- “What we built” names visible deliverables and decisions. Vary sentence grammar; do not pad every case to six matching claims.
- “How it works” follows the actual user sequence. Avoid the generic sequence “visitor arrives, browses, contacts.”
- The result names what shipped and which path is available. “Live” is used only when the URL has been checked for that release.
- The final paragraph asks for the facts required to scope that type of work: sector, content, user task, integrations, languages, or update ownership.

## Locale notes

- Draft en-US, tr-TR, de-DE, and es-US independently from this brief and the recorded facts.
- Keep product and framework names unchanged.
- Do not translate metaphors from one locale. Prefer the market's ordinary term for catalog, quote, booking, consultation, and admin panel.
