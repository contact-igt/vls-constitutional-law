# Approvals tracker

Course-specific details NOT established by the poster or brochure. Do not render on the page until marked APPROVED with a source.

| Item | Status | Notes |
| --- | --- | --- |
| Fee and payment arrangements | PENDING | ₹499 on the DRT page belongs to that course. No payment flow until approved. |
| Start date, class timings, total duration | PENDING | 20 Sept 2026 on the DRT page is NOT this course. |
| Delivery mode (online / offline / hybrid) | PENDING | |
| Assigned faculty / instructor profile | PENDING | Dr. Sivakumar Sivaprakasam is DRT/SARFAESI faculty; do not reuse without confirmation. |
| Recordings, study material, certificates, assignments | PENDING | FAQ says "confirm with the academy". |
| Seat limits, discounts, enrolment deadlines | PENDING | No scarcity copy. |
| Permission to reuse classroom photographs | APPROVED | User requested reuse of suitable VLS landing-page assets on 2026-10-30. Sourced from the local VLS business-law project. |
| Lead destination (endpoint / CRM / sheet / email) | PENDING | Implemented as `LEAD_WEBHOOK_URL` (+ optional `LEAD_WEBHOOK_TOKEN`): JSON POST, payload in lib/enquiry.ts. Unset = WhatsApp handoff only, never claimed as saved. VLS must supply a destination that accepts this JSON (or we adapt the payload). |
| Course identifier for lead tagging | PROPOSED | Sent as `course: "constitutional-law-bootcamp"` in every lead. VLS to confirm the value their system expects. |
| Final page domain / canonical URL | PENDING | Proposed: a vlslawacademy.com subdomain; VLS to choose. Set `NEXT_PUBLIC_SITE_URL` (https). A Vercel production build now FAILS without it; previews/staging are noindex. |
| Favicon and share-card artwork | PLACEHOLDER | `app/icon.svg` is a plain red "VLS" monogram and `app/opengraph-image.tsx` is a text-only card. Replace with the official VLS logo / approved artwork before launch. |
| Privacy Policy / Terms URLs | VERIFIED | https://www.vlslawacademy.com/privacy-policy and /terms-and-conditions both return 200 (2026-10-30). |
| Analytics / Meta Pixel IDs | PENDING | Other VLS pages use `fbq`; www uses GA `G-8W0EVH8CJT`. Do not reuse IDs without approval. |
| Final publication sign-off | PENDING | Stays with the VLS team. |
