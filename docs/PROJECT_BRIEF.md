PROJECT: VLS Constitutional Law & Practice Boot Camp
DESCRIPTION: Mobile-first, conversion-focused course landing page
EXECUTION PLATFORM: Claude Code
STACK: Fresh Next.js (App Router) + Tailwind, matching the VLS sites' stack (Next.js on Vercel). Decided 2026-10-30.
SCOPE: One landing page, enquiry flow, responsive UI
OUT OF SCOPE: Other courses, student portal, unapproved payments
PRIMARY GOAL: Qualified course enquiries
SECONDARY GOAL: WhatsApp and telephone enquiries

DESIGN:
  primary: "#AE1015"
  dark: "#161616"
  background: "#FAF8F5"
  accent: "#C8A46B"
  variance: 6
  motion: 3
  density: 5

CONTENT SOURCE:
  - Constitutional Law Boot Camp poster
  - VLS syllabus brochure, Module 1
  - docs/VLS_BOOTCAMP_CONTENT.md

MODULES:
  M0: Repository research and setup
  M1: Landing page layout and content
  M2: Registration enquiry flow
  M3: Responsive, accessible and performance polish
  M4: Read-only verification and release preparation

STATUS: M1 complete (page built with photo placeholders; form validates + WhatsApp handoff). M2 next: lead endpoint, UTM, duplicate-click handling.
DEPLOYMENT: Local preview and staging only until approved

LOOP RULES:
  Actions:      Read repo, write scoped frontend changes, run local tests
  Done:         All approved content renders, lead flow works, audits pass
  Bounds:       One module at a time, bounded retries, stop on unresolved external dependencies
  Blast radius: Never modify existing live landing pages, production leads, payments or unrelated routes
  Digest:       Short change report, screenshots, test results, remaining approval items
  Publication approval stays with the VLS team.
