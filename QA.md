# WannaCry verification

## Completed automated browser verification

**22 test groups passed** in Google Chrome driven by Playwright. The page was loaded from `file://` with the browser context offline. See `qa/results.json` for the exact test-group record and `qa/browser-test.cjs` for reproducible checks.

- Direct-file offline launch and local asset loading.
- Investigation, response, and report deep-link gates.
- Harmless original-file previews and email reading.
- Warning-sign explanation and mock attachment staging.
- Explicit trigger confirmation, including cancellation.
- Timer pause/resume and expiration with zero destructive effect.
- All mock folders, search, empty results, locked-file previews.
- Automatic fictional timeline, indicators, and attribution explanation.
- Prevention of skipped response steps.
- Wrong isolation, insufficient evidence, incomplete access recovery, wrong remediation, unsafe backup, and incomplete validation feedback.
- Complete recovery, final report, recorded corrections, restored-file preview, and completed-step review.
- Reset cancellation, confirmed reset, and reload state clearance.
- Lecturer flow, manual advance, timer speed, pause, and safe timer ending.
- Keyboard tab navigation, modal containment, and Escape dismissal.
- Simulation strip remains visible while scrolling.
- Width checks at 320, 390, 768, and 1440 pixels.
- Full mobile happy path at 390 × 844.
- **Zero JavaScript/browser-console errors, zero external requests, and zero attachment downloads** during the tested offline flows.

Screenshots from this run are in `qa/`. A full-page capture may place sticky elements at the scroll position at capture time; those elements remain pinned in the live viewport.

## Independent preview review

The parent chat independently reviewed the site through the supported in-app browser at the local preview URL. The core scenario, evidence dashboard, all seven recovery steps, incorrect/incomplete choices, final report, and mobile report layout passed. Its final remaining checks are documented in the parent chat's handoff.

## Source checks

- JavaScript parses with `node --check app.js`.
- All HTML local asset references resolve.
- No inline style attributes or CSS imports remain.
- No external libraries, fonts, CDN assets, analytics, or remote API calls.
- No filesystem, OS, storage, cookie, download, encryption, execution, or network APIs in application logic.
- Content Security Policy includes `connect-src 'none'` and limits assets to local resources.
- Final product branding is WannaCry; historical-vs-fictional distinction is visible in the site and guide.
- Small-screen progress labels wrap rather than overlap (final CSS visual polish).

## Scope and limitations

Verified in Chromium/Google Chrome, with desktop and mobile viewport emulation. Physical iOS/Android devices, Safari, Firefox, and assistive-technology software were not independently tested. Semantic structure, keyboard interaction, focus handling, labels, and reduced-motion support were checked; this is not a formal WCAG conformance audit.

The simulation is intentionally simplified, contains only fictional data, and does not assess real system security. The website is complete and local-only; no hosted deployment or registration was performed.
