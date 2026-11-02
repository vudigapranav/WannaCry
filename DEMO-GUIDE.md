# WannaCry — presenter quick reference

**Open:** `index.html` → **Lecturer demo**. All events are fictional and browser-only.

| Beat | Show | Ask the room |
| --- | --- | --- |
| 1. Orientation | Persistent simulation label; fictional NS-FIN-07 | What makes an invoice feel credible? |
| 2. Email | Sender mismatch, urgency, `.pdf.exe` | How would you verify the request independently? |
| 3. Attachment | Stage → mock Downloads → explicit trigger confirmation | Does reading the email automatically cause this incident? (No.) |
| 4. Impact | Note, `.locked` labels, pressure timer | What is the demand trying to make you do? |
| 5. Evidence | Timeline, indicator list, fictional relay | Which statements are observations and which are assumptions? |
| 6. Response | Isolate → preserve → rebuild → secure → restore → validate → reconnect | Why is a recent backup not necessarily a trustworthy backup? |
| 7. Debrief | Final report and decision corrections | What evidence would support reconnecting a real service? |

**Pacing:** the story is manual. Lecturer mode starts with the pressure timer paused. Use Resume/Pause, 1×/4×/12×, or End timer safely. Minimize the lecturer desk to see content beneath it. Navigation never automatically approves a response step.

**Correct recovery path:**

1. Isolate NS-FIN-07 from the network.
2. Preserve all three: logs/email, system-state record, responder notes.
3. Rebuild from a trusted, patched image.
4. Revoke sessions and reset credentials/verify MFA.
5. Restore yesterday's verified offline baseline.
6. Validate all three: files, host health, monitoring/access.
7. Confirm the monitored handover.

**Optional teaching detours:** try the wipe-first choice, delete-note-only choice, and newest connected backup. Each gets explanatory feedback without damaging the exercise. End the timer to show that its expiration never deletes anything.

**Closing:** highlight preserved evidence, eight restored mock files, and the difference between a network indicator and attribution. Copy the report using normal text selection or print through the browser if desired. Reset clears only the page's fictional state.

**Historical distinction:** the requested WannaCry name is branding for a fictional email-based exercise. The historical outbreak spread as a worm; this site is not a technical reproduction of it.
