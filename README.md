# WannaCry — The Incident Lab

A complete, offline, frontend-only educational incident simulation. Built with HTML, CSS, and vanilla JavaScript. All story data is fictional.

## Open the site

Open **index.html** in a modern browser. No installation, build, internet connection, account, or backend is needed. Keep `index.html`, `styles.css`, `app.js`, and `assets/` together.

For an optional local preview, run `python3 -m http.server 8765 --bind 127.0.0.1` from this folder and open `http://127.0.0.1:8765`. Stop the server with Ctrl+C when finished. This serves static project assets only; it is not an application backend.

## What the experience includes

- Cinematic landing page and responsive layouts.
- Fictional phishing email with optional warning-sign explanations.
- Mock attachment staging: only a row is added to an in-memory Downloads list.
- Interactive desktop-style file explorer, folders, search, and fabricated file previews.
- Explicit confirmation before the incident starts. Simply reading the email does not cause the incident.
- Eight fictional locked records, mock note, and controllable ten-minute pressure timer.
- Automatically populated timeline, indicators, and an explanation of why an address is not an actor identity.
- Seven gated defensive decisions: isolate, preserve, rebuild, secure access, restore, validate, reconnect.
- A final selectable incident report and print-friendly report layout.
- Lecturer controls with prompts, manual advancement, timer pause/resume, speed controls, and a safe expiration demonstration.
- Persistent simulation indicator, keyboard navigation, native modal focus handling, reduced-motion support, and reset confirmation.

## Safety boundary

This is a UI exercise. It uses fabricated JavaScript objects held in page memory. It does **not** read, write, enumerate, encrypt, delete, upload, or download real files. It contains no executable attachment, malware payload, OS integration, security bypass, persistence, telemetry collection, payment feature, or wallet. It makes no runtime network requests beyond loading its own local static assets when served over localhost. No browser storage or service worker is used.

The `.locked` suffix is a displayed label. The countdown creates no destructive effect: expiration stops at zero, records a fictional event, and leaves recovery available. Containment freezes it. Switching away from the page pauses it. Reload or reset clears the exercise; nothing is persisted.

All `.invalid` names are reserved examples. `203.0.113.42` is a documentation IP. The “trace” is a static fictional relationship, not a probe or attribution mechanism.

The site is named **WannaCry** at the user's request. This email-based scenario is **not a historical reconstruction of the WannaCry/WannaCrypt outbreak**, which involved worm propagation and Windows SMB vulnerabilities. The story organization, workstation, people, file contents, relay, and timeline are invented.

## Lecturer demo (10–15 minutes)

1. **Set the boundary (1 minute).** Select “Lecturer demo.” Explain the persistent simulation label. The story advances only through deliberate actions; the incident timer begins paused in lecturer mode.
2. **Inspect the email (2 minutes).** Use “Read the email,” then “Reveal warning signs.” Compare `northstar-billing.invalid` with `northstar.invalid`, discuss the deadline, and inspect the final `.exe` extension. Ask how learners would verify an unexpected invoice through a known channel.
3. **Stage and inspect (1 minute).** Stage the mock attachment and show Downloads. Nothing is saved. Open a normal document preview if desired. Click the staged attachment and read the confirmation before triggering the fictional incident.
4. **Observe the impact (2 minutes).** Show the note and mock locked files. The countdown is a pressure tactic. Use the lecturer panel to resume/pause, change speed, or “End timer safely.” No deletion happens at zero. Minimize the lecturer panel when it covers content.
5. **Investigate (2 minutes).** Show the automatic timeline and fabricated indicators. Explain that a destination address is not a person's identity. All timeline timestamps are scenario time, not elapsed real time.
6. **Respond (4 minutes).** Work through each decision. Incorrect or incomplete selections explain the issue and preserve progress. After containment, collect all three evidence records; choose a trusted rebuild; secure access; select the verified offline baseline; validate all checks; approve monitored reconnection.
7. **Debrief (2 minutes).** Review the final report. Discuss how actual teams coordinate activities and use their own approved playbooks. Learners can select the report text or use the browser's Print command. Nothing exports automatically.

The lecturer panel's next action never silently approves recovery decisions. Completing the response still requires interacting with the checklist. Closing the panel does not discard progress. Reset requires confirmation. Every completed response step can be reviewed without repeating its action.

## Navigation and controls

- Main navigation: Overview, Simulation, Investigation, Response.
- Investigation and Response are gated until the fictional incident starts.
- The report becomes available after the full response is complete.
- Desktop application tabs support Left/Right arrows and Home/End.
- Escape closes dialogs. The skip link moves to the main content.
- In File explorer, single-click a file to preview its fictional record.
- Search applies to the current mock folder and never queries the device.
- Timer speed changes only the fictional pressure cue, not the story sequence.
- Progress is intentionally ephemeral. Reloading with a deep link shows the relevant gate until a new exercise starts.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry point and persistent page shell |
| `styles.css` | Responsive design, reduced motion, and print styles |
| `app.js` | In-memory scenario, navigation, decisions, presenter controls |
| `assets/incident-core.svg` | Original code-drawn hero illustration |
| `assets/favicon.svg` | Local icon |
| `DEMO-GUIDE.md` | Short presenter reference |
| `QA.md` | Verification results and limitations |
| `qa/` | Developer test script, results, and screenshots; never loaded by the app |

No external fonts, images, CDNs, libraries, analytics, or APIs are used by the site. A restrictive Content Security Policy blocks connections and external embedded content.

## Educational references

The response themes are informed by the [CISA #StopRansomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide), including containment, evidence preservation, and careful recovery. See also the [joint CISA/FBI guide PDF](https://www.ic3.gov/CSA/2023/231019.pdf).

For historical context, see [Microsoft's May 2017 WannaCrypt analysis](https://www.microsoft.com/en-us/security/blog/2017/05/12/wannacrypt-ransomware-worm-targets-out-of-date-systems/). These are optional reading links in this document; the application does not fetch them.

This is a simplified learning aid, not an incident response tool or an assessment of the device on which it runs. Real responses depend on the incident, the organization, and qualified responders.
# WannaCry
