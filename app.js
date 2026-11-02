'use strict';
/* All scenario data is fictional and held only in memory. No network, storage,
   filesystem, OS, encryption, download, or malware APIs are used. */
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const icons = {
    arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    folder:'<path d="M3 7V5h6l2 3h10v11H3z"/>',
    file:'<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
    shield:'<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z"/><path d="m8 12 3 3 5-6"/>',
    search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
    activity:'<path d="M2 12h4l3-8 5 16 3-8h5"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 17v4m-5 0h10"/>',
    network:'<circle cx="5" cy="12" r="3"/><circle cx="18" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8 11 7-5M8 13l7 5"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    reset:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.file}</svg>`;
  const escape = text => String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const files = [
    {name:'Project_Atlas.pdf',folder:'Documents',size:'2.4 MB',type:'PDF document',body:'PROJECT ATLAS\nFictional project brief · Training dataset\nMilestone: complete the quarterly review.'},
    {name:'Team_Roster.xlsx',folder:'Documents',size:'84 KB',type:'Spreadsheet',body:'TEAM ROSTER\nAlex Morgan · Finance\nSam Rivera · Operations\nAll names and records are fictional.'},
    {name:'Meeting_Notes.docx',folder:'Documents',size:'126 KB',type:'Document',body:'MEETING NOTES\nReview the offline backup schedule.\nRun the incident response exercise.'},
    {name:'Brand_Assets.zip',folder:'Documents',size:'18 MB',type:'Archive',body:'MOCK ARCHIVE\n4 fictional brand assets.\nThis preview is text, not a real archive.'},
    {name:'Client_Brief.pdf',folder:'Documents',size:'630 KB',type:'PDF document',body:'CLIENT BRIEF\nNorthstar Studio · Fictional organization\nDeliverable: training workshop materials.'},
    {name:'Budget_2026.xlsx',folder:'Finance',size:'215 KB',type:'Spreadsheet',body:'FICTIONAL BUDGET\nTraining allocation: 12,000 units.\nNo real financial data is present.'},
    {name:'Quarterly_Report.pdf',folder:'Finance',size:'1.8 MB',type:'PDF document',body:'QUARTERLY REPORT\nAll numbers are fabricated for this exercise.'},
    {name:'Purchase_Orders.csv',folder:'Finance',size:'45 KB',type:'Data file',body:'order_id,description,status\nDEMO-01,Training equipment,Approved'}
  ];
  const steps = [
    ['Contain the incident','Isolate the workstation','network'],
    ['Preserve evidence','Capture the fictional record','search'],
    ['Remove the foothold','Rebuild from a clean image','shield'],
    ['Secure access','Revoke sessions and reset access','lock'],
    ['Restore a clean backup','Choose a trustworthy baseline','folder'],
    ['Validate the recovery','Check files and system health','check'],
    ['Reconnect & monitor','Return the host to service','activity']
  ];
  const makeState = () => ({emailOpened:false,staged:false,incident:false,isolated:false,restored:false,complete:false,tab:'inbox',folder:'Documents',search:'',hints:false,remaining:600,paused:true,expired:false,speed:1,responseStep:0,reviewStep:0,attempts:0,presenter:false,minimized:false,choices:{},events:[{time:'09:41',title:'Suspicious invoice delivered',detail:'A fabricated message arrives at the fictional Northstar workstation.',kind:'neutral'}]});
  let state = makeState();
  let route = 'overview';
  let timerAnchor = performance.now();
  let toastTimeout;
  let dialogReturnFocus;
  const main = $('#main');
  const modal = $('#modal');
  const button = (text, action, type='primary', extra='') => `<button class="btn btn-${type}" data-action="${action}" ${extra}>${text}</button>`;
  const badge = (text,color='') => `<span class="badge ${color}">${text}</span>`;
  const eyebrow = text => `<div class="eyebrow"><span class="dash"></span>${text}</div>`;
  const timeText = () => `${String(Math.floor(state.remaining / 60)).padStart(2,'0')}:${String(Math.floor(state.remaining % 60)).padStart(2,'0')}`;
  function addEvent(title,detail,kind='defense') {
    const count = state.events.length;
    state.events.push({time:`09:${String(41+count).padStart(2,'0')}`,title,detail,kind});
  }
  function toast(message) {
    clearTimeout(toastTimeout); $('#toast').textContent=message; $('#toast').classList.add('visible');
    toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),5500);
  }
  function go(next) {
    if(location.hash === '#'+next) render(true); else location.hash = next;
  }
  function showModal(title,body,actions='',tag='SIMULATION ONLY') {
    if(modal.open) modal.close();
    dialogReturnFocus=document.activeElement;
    modal.innerHTML=`<div class="modal-top">${badge(tag)}<button class="modal-close" data-action="close-modal" aria-label="Close dialog">×</button></div><h2 id="modal-title">${title}</h2>${body}<div class="action-row">${actions || button('Got it','close-modal')}</div>`;
    modal.showModal();
  }
  function closeModal(){modal.close(); if(dialogReturnFocus?.isConnected) dialogReturnFocus.focus();}
  function progress(){
    const current=state.complete?4:state.isolated?3:state.incident?2:state.staged?1:0;
    return `<div class="progress-strip" aria-label="Scenario progress">${['Inspect the email','Stage attachment','Investigate','Respond','Recover'].map((x,i)=>`<div class="progress-step ${i<current?'done':i===current?'current':''}" ${i===current?'aria-current="step"':''}><b>${i<current?'✓':String(i+1).padStart(2,'0')}</b><span>${x}</span></div>`).join('')}</div>`;
  }
  function overview(){return `<div class="container">
    <section class="hero"><div class="hero-copy">${eyebrow('THE INCIDENT LAB / INTERACTIVE EXPERIENCE')}<h1>One click.<br>Everything<br><em>changes.</em></h1><p class="hero-description">Step inside a ransomware incident.<br>Follow the evidence. Contain the threat.<br>Bring a fictional business back online.</p><div class="hero-actions">${button(`Enter the simulation ${icon('arrow')}`,'begin')}${button('Lecturer demo ↗','start-demo','secondary')}</div><div class="hero-footnote"><span><b>◷</b> 10–15 MIN EXPERIENCE</span><span><b>◇</b> ZERO REAL-WORLD RISK</span></div></div>
    <div class="hero-art" aria-label="Illustration of a fictional workstation security core"><img src="assets/incident-core.svg" alt="A dark security core with a luminous violet padlock and orbital connections"><div class="telemetry telemetry-one"><div class="telemetry-label">ENDPOINT STATUS / FICTIONAL</div><div class="telemetry-value"><span class="status-dot"></span>Unusual activity detected</div></div><div class="telemetry telemetry-two"><div class="telemetry-label">YOUR MISSION</div><div class="telemetry-value">Detect. Contain. Recover.</div></div><div class="art-caption">NS-FIN-07 / TRAINING ENVIRONMENT</div></div></section>
    <section class="overview-stats" aria-label="Exercise at a glance"><div class="stats-title">A SMALL SCENARIO.<br>A BIGGER PERSPECTIVE.</div><div><div class="stat-number">01<span>HOST</span></div><div class="stat-caption">One fictional workstation</div></div><div><div class="stat-number">04<span>PHASES</span></div><div class="stat-caption">From first click to recovery</div></div><div><div class="stat-number">100<span>% SAFE</span></div><div class="stat-caption">Entirely inside your browser</div></div></section>
    <section class="journey"><div class="section-heading"><div>${eyebrow('UNDERSTAND THE WHOLE STORY')}<h2>See the incident.<br>Become the response.</h2></div><p>Learn by making decisions in a contained, fictional environment. Every action tells part of the story.</p></div><div class="journey-grid">${[['01 / THE ENTRY','mail','The convincing email','An ordinary-looking invoice. A sender that does not quite add up.'],['02 / THE IMPACT','lock','The turning point','A deliberate mock attachment action changes the fictional files.'],['03 / THE EVIDENCE','search','Follow the signals','Reconstruct the timeline and learn what an indicator can tell you.'],['04 / THE RESPONSE','shield','Take back control','Preserve evidence, contain the host, and validate a clean recovery.']].map(x=>`<article class="journey-card"><span class="step-label">${x[0]}</span><span class="card-arrow">↗</span><div>${icon(x[1])}</div><h3>${x[2]}</h3><p>${x[3]}</p></article>`).join('')}</div></section>
    <aside class="safe-callout">${icon('shield')}<div><h3>Real learning. A completely fictional incident.</h3><p>No files are accessed or encrypted. No attachment is downloaded. All evidence lives in memory and disappears on reset or reload. This email scenario is not a reconstruction of the historical WannaCry worm.</p></div>${badge('OFFLINE BY DESIGN')}</aside>
  </div>`;}
  function hostPanel(){return `<section class="panel"><div class="panel-eyebrow">FICTIONAL WORKSTATION ${icon('monitor')}</div><h2>Northstar / Finance</h2><p>A single host in a fabricated company. You are the incident responder.</p>${[['Host','NS-FIN-07'],['User','Alex Morgan'],['Network',state.complete?'Monitored':state.isolated?'Isolated':'Connected (mock)'],['Files',state.restored?'8 restored':state.incident?'8 locked (mock)':'8 available']].map(x=>`<div class="host-row"><span>${x[0]}</span><span>${x[1]}</span></div>`).join('')}</section>`;}
  function sim(){return `<div class="container page"><div class="page-top"><div>${eyebrow('01 / EXPERIENCE THE INCIDENT')}<h1>The everyday workstation.</h1><p>Explore the email and the files. Every item below is a fictional browser interface.</p></div><div class="page-tools">${badge(state.complete?'RECOVERED':state.isolated?'CONTAINED':state.incident?'INCIDENT ACTIVE':'WORKSTATION READY',state.complete||state.isolated?'green':state.incident?'red':'')}</div></div>${progress()}<div class="workspace-layout"><div class="window"><div class="window-titlebar"><i class="window-dot"></i><i class="window-dot"></i><i class="window-dot"></i><span class="window-name">Northstar desktop / NS-FIN-07</span><span class="window-controls" aria-hidden="true">− □ ×</span></div><div class="workspace-tabs" role="tablist" aria-label="Mock desktop applications">${[['inbox','mail','Inbox'],['files','folder','File explorer'],['note','lock','Incident note']].map(x=>`<button id="tab-${x[0]}" class="tab" role="tab" aria-selected="${state.tab===x[0]}" aria-controls="work-panel" data-tab="${x[0]}">${icon(x[1])}${x[2]}${x[0]==='inbox'?'<span class="count">1</span>':''}</button>`).join('')}</div><div class="work-area" id="work-panel" role="tabpanel" aria-labelledby="tab-${state.tab}">${state.tab==='inbox'?inbox():state.tab==='files'?explorer():note()}</div></div><aside class="side-stack">${hostPanel()}<section class="panel"><div class="insight-icon">${icon(state.incident?'search':'info')}</div><div class="panel-eyebrow">${state.incident?'YOUR NEXT MOVE':'BEFORE YOU CLICK'}</div><h2>${state.complete?'Recovery verified.':state.incident?'Understand the impact.':'Look a little closer.'}</h2><p>${state.incident?'The fictional timeline and indicators are already captured in the investigation dashboard. Start there before making recovery decisions.':'An urgent tone, a mismatched sender, and a double file extension are reasons to pause. Opening this email alone does not trigger an incident.'}</p>${state.incident?button(`Open investigation ${icon('arrow')}`,'investigate','secondary'):button(state.hints?'Hide warning signs':'Reveal warning signs','hints','secondary')}</section></aside></div><div class="scenario-note">${icon('info')}This is an intentionally simplified training scenario. The historical WannaCry outbreak spread as a worm; this fictional exercise uses an email attachment.</div></div>`;}
  function inbox(){return `<div class="inbox-layout"><div class="mail-list"><div class="mail-list-label"><span>INBOX</span><span>1 MESSAGE</span></div><button class="mail-card" data-action="open-email"><strong>Accounts Payable</strong><span>Action required: Q4 invoice</span><span>Please review before 12:00…</span><time>09:41</time></button></div>${state.emailOpened?email():`<div class="mail-empty">${icon('mail')}<h2>A familiar kind of message.</h2><p>There is one new invoice in Alex’s inbox. Open it and decide what deserves a closer look.</p>${button('Read the fictional email','open-email','secondary')}</div>`}</div>`;}
  function email(){return `<article class="email"><h2 class="email-subject">Action required: Q4 invoice</h2><div class="email-sender"><div class="avatar">AP</div><div class="sender-meta"><strong>Accounts Payable</strong> <span>&lt;finance@northstar-billing.invalid&gt;</span><br><small>To: alex@northstar.invalid · Today, 09:41 · Fictional email</small></div></div><div class="email-body"><p>Hi Alex,</p><p>We need your approval on the updated Q4 invoice. Please review the attached document <strong>before 12:00 today</strong> to avoid a payment delay.</p><p>Our document system has changed, so please use the attached copy.</p><p>Thanks,<br>Accounts Payable</p></div><div class="attachment"><span class="file-symbol">${icon('file')}</span><div class="attachment-info">Invoice_Q4.pdf.exe<small>SIMULATED ATTACHMENT · 284 KB · NEVER DOWNLOADED</small></div>${button(state.staged?'View mock file':'Stage mock attachment',state.staged?'show-downloads':'stage','secondary')}</div><div class="inline-note">Staging only adds a row to the mock Downloads folder. Nothing is saved to your device.</div>${state.hints?`<div class="hint-box"><strong>Three reasons to pause</strong><br>① Sender domain: northstar-billing.invalid does not match northstar.invalid.<br>② Urgency: an unnecessary deadline discourages verification.<br>③ Double extension: .pdf.exe suggests an executable disguised as a document.<br>Verify through a known, trusted channel before opening unexpected attachments.</div>`:''}${state.staged&&!state.incident?`<div class="hint-box">The fictional attachment is staged. Inspect it in File explorer; running the scenario requires a separate confirmation.</div>`:''}</article>`;}
  function explorer(){
    const locked=state.incident&&!state.restored;
    const inFolder=files.filter(f=>f.folder===state.folder);
    const list=state.folder==='Downloads'?(state.staged?[{name:'Invoice_Q4.pdf.exe',size:'284 KB',type:state.incident?'Mock artifact':'Mock executable',attachment:true}]:[]):inFolder;
    const filtered=list.filter(f=>f.name.toLowerCase().includes(state.search.toLowerCase()));
    return `<div class="explorer-toolbar">${icon('folder')}<div class="address-bar">This PC &nbsp;›&nbsp; Alex &nbsp;›&nbsp; ${state.folder}</div>${badge('MOCK FILES')}</div><div class="search-wrap"><label class="visually-hidden" for="file-search">Search mock files in ${state.folder}</label><input id="file-search" type="search" placeholder="Search ${state.folder}…" value="${escape(state.search)}" autocomplete="off"></div><div class="explorer-layout"><nav class="folder-list" aria-label="Fictional folders">${['Documents','Finance','Downloads'].map(f=>`<button class="folder-button ${state.folder===f?'active':''}" data-folder="${f}" ${state.folder===f?'aria-current="true"':''}>${icon('folder')}${f}</button>`).join('')}</nav><div class="file-list">${filtered.length?`<table class="file-table"><thead><tr><th scope="col">Name</th><th scope="col" class="type-col">Status</th><th scope="col" class="size-col">Size</th></tr></thead><tbody>${filtered.map(f=>`<tr><td><button class="file-button ${locked&&!f.attachment?'locked':''}" data-file="${escape(f.name)}">${icon(locked&&!f.attachment?'lock':'file')}<span>${f.name}${locked&&!f.attachment?'.locked':''}</span></button></td><td class="type-col">${f.attachment?f.type:locked?'Locked (mock)':state.restored?'Restored':'Available'}</td><td class="size-col">${f.size}</td></tr>`).join('')}</tbody></table>`:`<div class="empty-state">${icon('folder')}<h2>${state.search?'No matching mock files.':'This folder is empty.'}</h2><p>${state.search?'Try a different file name or clear the search.':'Stage the fictional email attachment to place a mock item here.'}</p></div>`}</div></div><div class="file-statusbar"><span>${filtered.length} OF ${list.length} ITEMS</span><span>FICTIONAL DATA / NO DISK ACCESS</span></div>`;
  }
  function note(){if(!state.incident)return `<div class="empty-state">${icon('shield')}<h2>No incident yet.</h2><p>Reading the email and browsing files are harmless. The incident begins only after you deliberately trigger the mock attachment.</p>${button('Return to inbox','show-inbox','secondary')}</div>`;
    return `<section class="ransom-note">${badge('FICTIONAL RANSOM NOTE','red')}<div class="ransom-heading">${icon('lock')}<h2>${state.restored?'Your files are restored.':'Your documents are locked.'}</h2></div><p>${state.restored?'The note remains here as preserved fictional evidence. Recovery came from a validated backup, not from the demand below.':'“We have locked your important documents. Act before the timer runs out.”'}</p><p class="note-disclaimer">A mock pressure tactic. There is no attacker, payment address, or real encryption. The eight displayed file names are browser-only records.</p><div class="countdown-box"><div><small>SIMULATED PRESSURE TIMER</small><div class="countdown" data-countdown>${timeText()}</div></div><div class="timer-controls"><span class="timer-state" data-timer-state>${timerLabel()}</span>${button(state.paused?'Resume timer':'Pause timer','pause','secondary','data-pause-button '+(state.isolated||state.expired?'disabled':''))}</div></div><p class="inline-note" data-expiry-message>${state.expired?'Timer ended safely. No files were deleted; all response actions remain available.':state.isolated?'Containment froze the fictional pressure timer. It does not undo the mock locked files.':'Expiration only ends this pressure cue. Nothing is deleted and recovery stays available.'}</p><div class="action-row">${button(`Investigate incident ${icon('arrow')}`,'investigate')}${button('View mock files','show-documents','secondary')}</div></section>`;
  }
  function lockedPage(name){return `<div class="container page"><section class="locked-page"><div class="lock-illustration">${icon('lock')}</div>${eyebrow('WAITING FOR THE SCENARIO')}<h1>${name==='report'?'Your report starts with a response.':'No incident to investigate. '}</h1><p>${name==='report'?'Complete all seven response decisions and validate the recovery to generate your final incident report.':'Begin with the fictional email. Triggering the mock attachment will automatically populate the evidence and response workspace.'}</p>${button(name==='report'&&state.incident?'Continue the response':'Enter the simulation',name==='report'&&state.incident?'respond':'begin')}${name==='report'?'<p class="history-note">Your progress stays in memory while this page is open.</p>':''}</section></div>`;}
  function timeline(){return `<ol class="timeline">${state.events.map(e=>`<li class="${e.kind}"><time>${e.time}</time><span class="timeline-marker" aria-hidden="true"></span><div><strong>${e.title}</strong><p>${e.detail}</p></div></li>`).join('')}</ol>`;}
  function metrics(){return `<div class="dashboard-stats"><div class="metric"><small>IMPACTED HOSTS</small><strong>01</strong><p>NS-FIN-07 / fictional</p></div><div class="metric"><small>${state.restored?'FILES RESTORED':'MOCK FILES LOCKED'}</small><strong class="${state.restored?'green':'red'}">08</strong><p>${state.restored?'Clean baseline selected':'Names changed in memory'}</p></div><div class="metric"><small>RESPONSE PROGRESS</small><strong>${state.responseStep}<span class="muted"> / 7</span></strong><p>${state.complete?'Recovery validated':'Defensive decisions completed'}</p></div><div class="metric"><small>NETWORK STATE</small><strong class="network-metric">${state.complete?'Monitored':state.isolated?'Isolated':'Exposed'}</strong><p>Simulated status only</p></div></div>`;}
  function investigation(){if(!state.incident)return lockedPage('investigation');return `<div class="container page"><div class="page-top"><div>${eyebrow('02 / RECONSTRUCT THE STORY')}<h1>Evidence, before assumptions.</h1><p>Automatically collected fictional telemetry. These are clues in a training story, not findings from your device.</p></div><div class="page-tools">${button(`Open response ${icon('arrow')}`,'respond')}</div></div>${metrics()}<div class="dashboard-grid"><section class="panel"><div class="panel-title"><h2>Incident timeline</h2>${badge('SCENARIO TIME')}</div>${timeline()}<p class="history-note">Times are a fixed fictional sequence, not measurements of your actions or a live device clock.</p></section><div><section class="panel"><div class="panel-title"><h2>Indicators & observations</h2>${badge('FABRICATED')}</div><div class="indicator"><div class="label">DELIVERY / SENDER DOMAIN</div><code>northstar-billing.invalid</code><p>A lookalike of the fictional organization’s northstar.invalid domain. A reason to verify, not proof of a specific actor.</p></div><div class="indicator"><div class="label">EXECUTION / MOCK FILE NAME</div><code>Invoice_Q4.pdf.exe</code><p>The final extension matters. This label represents a disguised executable; no executable exists here.</p></div><div class="indicator"><div class="label">IMPACT / FILENAME PATTERN</div><code>8 original names → *.locked</code><p>A visible change in the mock file list. This lab never transforms file contents or touches real files.</p></div><div class="indicator"><div class="label">NETWORK / FICTIONAL DESTINATION</div><code>203.0.113.42 · relay.nightglass.invalid</code><p>Documentation-only IP and reserved example name. No request, DNS lookup, scan, or connection occurs.</p></div></section><section class="panel trace"><div class="panel-title"><h2>What a “trace” can tell you</h2>${icon('network')}</div><div class="trace-map"><div class="trace-node">${icon('monitor')}NS-FIN-07<br><small>MOCK HOST</small></div><span class="trace-line">⋯ →</span><div class="trace-node">${icon('network')}203.0.113.42<br><small>MOCK RELAY</small></div><span class="trace-line">⋯ →</span><div class="trace-node">${icon('search')}Unknown<br><small>ACTOR IDENTITY</small></div></div><p>The fabricated event links a host to an address in this story. An address may represent shared or compromised infrastructure; it cannot establish the person behind an incident.</p><div class="hint-box"><strong>Evidence ≠ attribution.</strong> Correlate independent records and preserve their origin. This lab does not trace, locate, or identify anyone.</div></section></div></div></div>`;}
  const choice=(value,title,description,type='radio',group='decision')=>`<label class="choice"><input type="${type}" name="${group}" value="${value}" ${state.choices[state.reviewStep]?.includes(value)?'checked':''}><span><strong>${title}</strong><small>${description}</small></span></label>`;
  function responseBody(index){
    const completed=index<state.responseStep;
    const result=[
      ['Host isolated','The fictional network link is disabled. The pressure timer is frozen; the locked files remain unchanged.'],
      ['Evidence preserved','Mock event logs, a system-state snapshot record, and responder notes are preserved in the exercise timeline.'],
      ['Clean rebuild recorded','The mock attachment is quarantined as evidence and the fictional workstation is rebuilt from a trusted image.'],
      ['Access secured','Compromised sessions are revoked and credentials are reset through the fictional trusted management environment.'],
      ['Eight files restored','The verified offline baseline is restored. The workstation remains isolated until validation and release.'],
      ['Recovery checks passed','All eight files match the baseline. The fictional host health and monitoring checks pass.'],
      ['Service restored with monitoring','The host is reconnected after validation. A recovery owner and a monitoring window are recorded.']
    ];
    if(completed)return `<div class="panel-eyebrow">STEP ${index+1} / COMPLETED ${icon('check')}</div><h2>${result[index][0]}.</h2><p>${result[index][1]}</p><div class="hint-box step-completed">This step is complete and recorded. Reviewing it does not change the evidence or repeat an action.</div><div class="step-footer">${button(state.complete?'View final report':'Continue current step',state.complete?'report':'current-step')}</div>`;
    const content=[
      `${eyebrow('FIRST, LIMIT THE IMPACT')}<h2>Contain the workstation.</h2><p>Separate the affected host from the network using your organization’s approved response process. Isolation limits spread, but does not automatically stop all local malicious activity or recover data.</p><fieldset><legend class="decision-label">Which action best preserves your next options?</legend>${choice('isolate','Isolate NS-FIN-07 from the network','Keep the host available to qualified responders for evidence preservation. This only changes a mock status.')}${choice('poweroff','Immediately power off and wipe the workstation','This can lose volatile evidence and erase the record needed to understand the incident.')}</fieldset>`,
      `${eyebrow('KEEP THE RECORD INTACT')}<h2>Preserve the evidence.</h2><p>Before rebuilding, collect a coherent incident record. In a real incident, qualified responders use approved tools and document handling; this exercise records placeholders only.</p><fieldset><legend class="decision-label">Select the three evidence records to preserve.</legend>${choice('logs','Event logs and original email','Retain timestamps, the sender information, and attachment metadata.','checkbox')}${choice('snapshot','System-state and volatile-evidence record','Record a simulated snapshot and memory-capture reference, with no actual device access.','checkbox')}${choice('notes','Responder notes and handling history','Document what was observed, who acted, and the order of decisions.','checkbox')}</fieldset>`,
      `${eyebrow('REMOVE THE CAUSE, NOT JUST THE SYMPTOM')}<h2>Re-establish a trusted host.</h2><p>Evidence is preserved. Choose a defensible way to remove the fictional foothold before restoring business data.</p><fieldset><legend class="decision-label">Choose a remediation plan.</legend>${choice('rebuild','Rebuild from a trusted, patched image','Quarantine the mock attachment as evidence. Record a clean operating baseline and close the scenario’s entry path.')}${choice('delete-note','Delete only the ransom note','A missing note does not demonstrate that the underlying compromise is gone.')}</fieldset>`,
      `${eyebrow('CLOSE THE ACCESS PATH')}<h2>Secure identities and access.</h2><p>A clean device alone does not address potentially compromised credentials. Use a trusted environment for access recovery.</p><fieldset><legend class="decision-label">Complete both access safeguards.</legend>${choice('sessions','Revoke affected sessions','Invalidate the fictional user’s active sessions and access tokens.','checkbox')}${choice('credentials','Reset credentials and verify MFA','Record a credential reset and a review of multi-factor authentication from a clean system.','checkbox')}</fieldset>`,
      `${eyebrow('RECOVERY STARTS WITH TRUST')}<h2>Choose the recovery source.</h2><p>Recency alone does not make a backup safe. Select a baseline that predates the fictional incident and has a recorded integrity check.</p><fieldset><legend class="decision-label">Which backup should be restored?</legend>${choice('offline','Offline baseline · yesterday, 18:00','8 of 8 fictional files · pre-incident · isolated copy · integrity check passed.')}${choice('live','Connected sync copy · today, 09:47','Newest copy, but its eight records contain the mock .locked names. Integrity is not established.')}</fieldset>`,
      `${eyebrow('RESTORED IS NOT YET READY')}<h2>Validate before reconnecting.</h2><p>All eight fictional files have been restored. Check completeness, integrity, and host readiness before releasing the workstation.</p><fieldset><legend class="decision-label">Verify all three recovery conditions.</legend>${choice('files','8 of 8 expected files open correctly','The restored mock file contents match the trusted baseline.','checkbox')}${choice('health','Clean host and patched baseline confirmed','The fictional rebuild is complete and no unresolved mock alert remains.','checkbox')}${choice('monitoring','Monitoring and access checks pass','Detection is enabled, expected access works, and backup protection is recorded.','checkbox')}</fieldset>`,
      `${eyebrow('RETURN WITH VISIBILITY')}<h2>Reconnect. Then keep watching.</h2><p>The recovery checks passed. Record a controlled return to service and ownership of the follow-up review.</p><fieldset><legend class="decision-label">Confirm the handover.</legend>${choice('handover','Approve monitored reconnection','Recovery owner: Alex Morgan (fictional). Enhanced monitoring: next 24 scenario hours. Review the root cause and improve the playbook.','checkbox')}</fieldset>`
    ];
    return `${content[index]}<div id="decision-feedback" class="validation-feedback" role="status" hidden></div><div class="step-footer">${button(index===6?'Complete recovery & view report':index===4?'Restore mock backup':`Confirm ${index===0?'containment':index===1?'preservation':index===2?'clean rebuild':index===3?'access safeguards':'validation'} ${icon('arrow')}`,'complete-step')}<small>UI-only decision · no real system action</small></div>`;
  }
  function response(){if(!state.incident)return lockedPage('response');if(state.complete&&state.reviewStep===7)state.reviewStep=6;const i=state.reviewStep;return `<div class="container page"><div class="page-top"><div>${eyebrow('03 / TAKE BACK CONTROL')}<h1>A response with a reason.</h1><p>Contain, preserve, then recover. Each decision unlocks the next step and becomes part of your final report.</p></div><div class="page-tools">${badge(`${state.responseStep} / 7 COMPLETE`,state.complete?'green':'')}${state.complete?button('Final report','report','secondary'):''}</div></div><div class="response-layout"><aside class="panel response-list" aria-label="Response steps">${steps.map((s,n)=>`<button class="response-step ${n<state.responseStep?'done':''} ${n===i?'active':''}" data-step="${n}" ${n>state.responseStep?'disabled':''} ${n===i?'aria-current="step"':''}><span class="response-number">${n<state.responseStep?'✓':n+1}</span><span><strong>${s[0]}</strong><small>${n<state.responseStep?'Completed':n===state.responseStep?'Ready for your decision':'Complete earlier steps'}</small></span></button>`).join('')}</aside><section class="panel response-content" aria-label="Current response decision">${responseBody(i)}</section></div><p class="scenario-note">${icon('info')}This ordered exercise is simplified for learning. Real teams may coordinate containment and evidence capture in parallel, following their incident response plan.</p></div>`;}
  function reportText(){return `WANNACRY — FICTIONAL INCIDENT REPORT\nExercise: NS-FIN-07 / Northstar Finance\nStatus: recovered and monitored\n\nSCOPE\nOne fictional host; eight in-memory files.\nNo real files, networks, downloads, or devices accessed.\nThis email scenario is not a reconstruction of the historical WannaCry worm.\n\nSEQUENCE\n${state.events.map(e=>`${e.time} | ${e.title}\n${e.detail}`).join('\n\n')}\n\nRECOVERY VALIDATION\n8/8 mock files restored and checked.\nClean host baseline confirmed.\nAccess reset and sessions revoked.\nMonitoring active; 24 scenario-hour follow-up assigned.\nEvidence preserved before remediation.\n${state.attempts} decision correction${state.attempts===1?'':'s'} during the exercise.\n\nLIMITS\nAll evidence and times are fictional. No actor attribution was established.\nThe timer is a pressure cue only; expiration never deletes data.\n\nLESSONS\nVerify unexpected attachments through a trusted channel.\nPreserve evidence, use a trusted recovery source, validate before release.\n\nREFERENCE\nCISA #StopRansomware Guide: https://www.cisa.gov/stopransomware/ransomware-guide`}
  function report(){if(!state.complete)return lockedPage('report');return `<div class="container page"><section class="report-hero"><div class="success-icon">${icon('shield')}</div>${badge('EXERCISE COMPLETE','green')}<h1>You changed the outcome.</h1><p>One fictional incident. Seven deliberate decisions.<br>Evidence preserved, access secured, and eight files safely restored in the simulation.</p><div class="action-row center-actions">${button('Review the evidence','investigate','secondary')}${button('Run the exercise again','reset','secondary')}</div></section>${metrics()}<div class="report-grid"><section class="panel"><div class="panel-title"><h2>Your response record</h2>${badge('7 / 7')}</div><ul class="report-list">${['Isolated the affected fictional workstation.','Preserved logs, state records, and responder notes.','Rebuilt from a trusted, patched mock image.','Revoked sessions and reset fictional credentials.','Restored the verified pre-incident offline baseline.','Validated all eight files, host health, and monitoring.','Reconnected with an owner and a monitoring window.'].map((x,i)=>`<li><strong class="green">0${i+1} ✓</strong>&nbsp; ${x}</li>`).join('')}</ul></section><section class="panel"><div class="panel-title"><h2>Carry the learning forward</h2>${icon('activity')}</div><ul class="report-list"><li><strong>Pause before the attachment.</strong><br>Verify unexpected requests through a trusted channel. A familiar display name is not identity proof.</li><li><strong>Preserve, then rebuild.</strong><br>Keep useful evidence and handling notes before remediation changes the incident record.</li><li><strong>Restore trust, not just files.</strong><br>A validated backup, clean host, secured access, and monitoring all matter.</li><li><strong>Separate observations from conclusions.</strong><br>An IP address is not a person. No attacker identity was established in this exercise.</li></ul><div class="hint-box">${state.attempts?`${state.attempts} decision correction${state.attempts===1?'':'s'} recorded. Trying an option and understanding its consequence is part of the learning.`:'Every recovery decision passed on its first submission.'}</div></section></div><section class="panel report-document"><div class="panel-title"><h2>Final incident report</h2>${badge('SELECTABLE TEXT')}</div><p>Select the text below to copy it with your browser’s normal controls, or use the browser’s Print command. Nothing is exported automatically.</p><pre class="report-text" tabindex="0" aria-label="Final fictional incident report">${escape(reportText())}</pre></section><p class="report-note">Training reference: CISA’s #StopRansomware Guide (source and historical context in README.md). This exercise is a simplified learning aid; it does not inspect your security posture. Reloading or resetting clears the in-memory record.</p></div>`;}
  function timerLabel(){return state.expired?'ENDED SAFELY':state.isolated?'FROZEN / CONTAINED':state.paused?'PAUSED':`RUNNING / ${state.speed}×`;}
  function updateTimer(){
    $$('[data-countdown]').forEach(el=>el.textContent=timeText());
    $$('[data-timer-state]').forEach(el=>el.textContent=timerLabel());
    $$('[data-pause-button]').forEach(el=>{el.textContent=state.paused?'Resume timer':'Pause timer';el.disabled=state.isolated||state.expired||!state.incident;});
    $$('[data-expiry-message]').forEach(el=>el.textContent=state.expired?'Timer ended safely. No files were deleted; all response actions remain available.':state.isolated?'Containment froze the fictional pressure timer. It does not undo the mock locked files.':'Expiration only ends this pressure cue. Nothing is deleted and recovery stays available.');
  }
  function expireTimer(){if(!state.incident||state.expired||state.isolated)return;state.remaining=0;state.expired=true;state.paused=true;addEvent('Pressure timer ended safely','Only a fictional pressure cue expired. No deletion occurred and recovery remained available.','neutral');updateTimer();renderPresenter();toast('Timer ended safely. Nothing was deleted. Continue the response.');}
  function pauseTimer(){if(!state.incident||state.expired||state.isolated)return;state.paused=!state.paused;timerAnchor=performance.now();updateTimer();renderPresenter();}
  function openEmail(){if(!state.emailOpened){state.emailOpened=true;addEvent('Email inspected','The message was opened. No incident is triggered by reading this email.','neutral');}state.tab='inbox';render();}
  function stageAttachment(){if(!state.emailOpened){toast('Read the fictional email first.');return;}if(!state.staged){state.staged=true;addEvent('Mock attachment staged','An in-memory row was added to Downloads. No file was downloaded.','neutral');}state.tab='files';state.folder='Downloads';state.search='';render();toast('Mock attachment staged. Your device has not downloaded anything.');}
  function triggerPrompt(){if(!state.staged||state.incident)return;showModal('Start the fictional incident?',`<p>You are about to open <strong>Invoice_Q4.pdf.exe</strong> inside this simulation. This deliberate action will mark eight fictional file records as locked and reveal a mock ransom note.</p><p><strong>No executable runs.</strong> No real file changes, encryption, payment, download, or network connection occurs.</p><p>${state.presenter?'Lecturer mode starts with the pressure timer paused.':'The pressure timer starts at 10 minutes. You can pause it at any time; expiration never deletes anything.'}</p>`,button('Trigger simulated incident','trigger','danger')+button('Keep inspecting','close-modal','secondary'),'DELIBERATE MOCK ACTION');}
  function trigger(){if(!state.staged||state.incident)return;closeModal();state.incident=true;state.paused=state.presenter;state.tab='note';state.folder='Documents';state.remaining=600;timerAnchor=performance.now();addEvent('Mock attachment deliberately opened','The learner explicitly confirmed the simulated incident. No executable was run.','incident');addEvent('Eight fictional file names changed','All eight document records received a displayed .locked suffix. Contents remained fabricated in memory.','incident');addEvent('Fictional network indicator recorded','203.0.113.42 and relay.nightglass.invalid were inserted as static example telemetry. No connection occurred.','incident');render();toast('Fictional incident started. Real files remain untouched.');}
  function openFile(name){
    if(name==='Invoice_Q4.pdf.exe'){
      if(state.incident)showModal('A preserved mock artifact.',`<p>This row represents the original attachment. ${state.responseStep>=3?'It is marked quarantined in the fictional response record.':'Keep it as part of the incident evidence.'}</p><p>There is no executable behind this label and it cannot run again.</p>`);
      else triggerPrompt();return;
    }
    const file=files.find(f=>f.name===name);if(!file)return;
    if(state.incident&&!state.restored)showModal('File unavailable in the scenario.',`<p><strong>${escape(file.name)}.locked</strong></p><p>The interface is showing a fictional locked state. No real file was encrypted. Complete containment and recovery to restore access to the mock contents.</p>`,button('Open response','modal-respond')+button('Return to files','close-modal','secondary'),'MOCK FILE STATUS');
    else showModal(escape(file.name),`<p>${state.restored?'Restored mock record · matches the clean baseline.':'Fictional preview · no file is opened from your device.'}</p><div class="file-preview">${escape(file.body).replace(/\n/g,'<br>')}</div>`);
  }
  function completeStep(){
    if(!state.incident||state.reviewStep!==state.responseStep||state.responseStep>=7)return;
    const i=state.responseStep,selected=$$('input[name="decision"]:checked',main).map(e=>e.value);
    state.choices[i]=selected;
    const required=[['isolate'],['logs','snapshot','notes'],['rebuild'],['sessions','credentials'],['offline'],['files','health','monitoring'],['handover']][i];
    const valid=required.every(x=>selected.includes(x))&&selected.length===required.length;
    if(!valid){
      state.attempts++;
      const feedback=[
        selected.includes('poweroff')?'Powering off or wiping immediately can destroy volatile evidence. Choose coordinated network isolation here; real responders assess shutdown decisions based on the incident.':'Select an isolation plan to continue.',
        'Preserve all three evidence records before changing the fictional host.',
        selected.includes('delete-note')?'Deleting the note does not remove the foothold. Choose a trusted rebuild after preserving evidence.':'Choose a remediation plan to continue.',
        'Confirm both session revocation and credential/MFA recovery.',
        selected.includes('live')?'The connected copy includes the affected file names and has no integrity assurance. Choose the verified pre-incident offline baseline.':'Select a verified recovery source.',
        'Validate all three conditions before the fictional host can reconnect.',
        'Confirm the monitored handover to complete the exercise.'
      ][i];
      const box=$('#decision-feedback');box.hidden=false;box.textContent=feedback;box.scrollIntoView({block:'nearest',behavior:'smooth'});return;
    }
    const records=[
      ['Workstation isolated','The simulated network status changed to isolated. The pressure timer froze; mock file impact remained.'],
      ['Evidence preserved','Original email, event logs, simulated state record, and responder handling notes preserved before remediation.'],
      ['Trusted rebuild completed','The mock attachment was quarantined as evidence; a clean patched system baseline was recorded.'],
      ['Identity access secured','Fictional sessions revoked, credentials reset, and MFA reviewed through a trusted management environment.'],
      ['Verified offline backup restored','Yesterday’s 18:00 baseline restored all eight fictional file records. The host remained isolated.'],
      ['Recovery validation passed','Eight of eight files checked; clean host, expected access, and monitoring confirmed.'],
      ['Monitored service restored','Reconnection approved. Alex Morgan assigned the next 24 scenario hours of monitoring and a lessons review.']
    ];
    addEvent(...records[i]);
    if(i===0){state.isolated=true;state.paused=true;}
    if(i===4)state.restored=true;
    state.responseStep++;state.reviewStep=Math.min(state.responseStep,6);
    if(i===6){state.complete=true;go('report');}else {render(true);toast(`Step ${i+1} completed and recorded.`);}
  }
  function presenterContent(){
    if(state.complete)return ['Debrief / the outcome','Connect the seven decisions back to the evidence. The report records the whole fictional story.','Ask: “What would make you confident enough to reconnect a real service?”','View final report','report'];
    if(state.responseStep>0)return [`Response / step ${state.responseStep+1} of 7`,steps[state.responseStep][1],'Ask learners to explain why the current safeguard must precede the next action. Complete the decision on the response page.','Show current decision','respond'];
    if(state.incident&&route==='response')return ['Containment / first decision','The timer is a pressure cue. Isolate first, preserve evidence, and explain why locked files are not repaired by isolation.','Ask: “What might we lose if we wipe the host immediately?”','Show current decision','respond'];
    if(state.incident&&route==='investigation')return ['Investigation / interpret carefully','Walk through the fictional timeline. The address is documentation-only; it is not a location or an attacker identity.','Ask: “Which details are observations, and which would be assumptions?”','Open response','respond'];
    if(state.incident)return ['Impact / pause and observe','Inspect the mock note and locked file names. The actual file contents never changed. The timer can be paused or ended safely.','Ask: “What is the note trying to make you do under pressure?”','Open investigation','investigate'];
    if(state.staged)return ['Attachment / a deliberate boundary','Staging created a browser row, not a download. The next action explicitly confirms the fictional incident.','Ask: “Which extension determines the actual file type?”','Open mock attachment','demo-trigger'];
    if(state.emailOpened)return ['Email / spot the warning signs','Compare the sender domain with the organization. Discuss urgency and the double extension before staging the mock file.','Ask: “How would you verify this request through a known channel?”','Stage mock attachment','stage'];
    return ['Orientation / set the scene','Introduce Northstar, its finance workstation, and the simulation-only boundary. Explain that reading an email does not inevitably cause infection.','Ask: “What makes an unexpected invoice seem credible?”','Read the email','demo-email'];
  }
  function renderPresenter(){
    const panel=$('#presenter');panel.hidden=!state.presenter;
    document.body.classList.toggle('presenter-open',state.presenter);
    $$('.presenter-toggle').forEach(b=>b.setAttribute('aria-pressed',String(state.presenter)));
    if(!state.presenter)return;
    const p=presenterContent();
    panel.className=`presenter-panel ${state.minimized?'presenter-minimized':''}`;
    panel.innerHTML=`<div class="presenter-heading"><strong>LECTURER DESK</strong><button data-action="minimize-presenter" aria-label="${state.minimized?'Expand':'Minimize'} lecturer controls">${state.minimized?'Expand ↗':'−'}</button><button data-action="presenter" aria-label="Close lecturer controls">×</button></div><div class="presenter-body"><h2>${p[0]}</h2><p>${p[1]}</p><div class="presenter-prompt">${p[2]}</div><div class="presenter-controls">${button(p[3],'demo-next','primary','data-next="'+p[4]+'"')}</div><div class="presenter-controls"><label class="visually-hidden" for="pace">Pressure timer speed</label><select id="pace" aria-label="Pressure timer speed"><option value="1" ${state.speed===1?'selected':''}>Timer: 1×</option><option value="4" ${state.speed===4?'selected':''}>Timer: 4×</option><option value="12" ${state.speed===12?'selected':''}>Timer: 12×</option></select>${button(state.paused?'Resume timer':'Pause timer','pause','secondary','data-pause-button '+(!state.incident||state.isolated||state.expired?'disabled':''))}${button('End timer safely','expire','secondary',!state.incident||state.expired||state.isolated?'disabled':'')}</div><div class="presenter-meta"><span data-countdown>${timeText()}</span> · <span data-timer-state>${timerLabel()}</span> · MANUAL STORY ADVANCE</div></div>`;
  }
  function render(focus=false){
    const valid=['overview','simulation','investigation','response','report'];
    route=location.hash.slice(1);if(!valid.includes(route))route='overview';
    $('#nav').innerHTML=[['overview','Overview'],['simulation','Simulation'],['investigation','Investigation'],['response','Response']].map(([r,label])=>`<a class="nav-link ${route===r||(route==='report'&&r==='response')?'active':''}" href="#${r}" ${route===r?'aria-current="page"':''}>${label}${(r==='investigation'||r==='response')&&!state.incident?'<span aria-label="Requires incident">◇</span>':''}</a>`).join('');
    main.innerHTML=({overview,simulation:sim,investigation,response,report}[route])();
    document.title=`WannaCry — ${route==='overview'?'The Incident Lab':route[0].toUpperCase()+route.slice(1)} · Simulation`;
    renderPresenter();
    if(focus){window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});}
  }
  const actions={
    begin:()=>go('simulation'),
    'start-demo':()=>{state.presenter=true;state.paused=true;state.minimized=false;go('simulation');},
    presenter:()=>{state.presenter=!state.presenter;if(state.presenter){state.paused=true;state.minimized=false;}renderPresenter();updateTimer();},
    'minimize-presenter':()=>{state.minimized=!state.minimized;renderPresenter();},
    'open-email':openEmail,
    stage:stageAttachment,
    'show-downloads':()=>{state.tab='files';state.folder='Downloads';state.search='';render();},
    'show-documents':()=>{state.tab='files';state.folder='Documents';state.search='';render();},
    'show-inbox':()=>{state.tab='inbox';render();},
    hints:()=>{state.hints=!state.hints;render();},
    trigger,investigate:()=>go('investigation'),respond:()=>{state.reviewStep=Math.min(state.responseStep,6);go('response');},report:()=>go('report'),
    'modal-respond':()=>{closeModal();actions.respond();},
    'close-modal':closeModal,
    pause:pauseTimer,expire:expireTimer,
    'complete-step':completeStep,
    'current-step':()=>{state.reviewStep=Math.min(state.responseStep,6);render(true);},
    reset:()=>showModal('Reset this exercise?',`<p>This clears the fictional evidence, response decisions, and timer held in this page’s memory. Your real files are never involved.</p><p>Save any report text you need using normal browser controls before resetting.</p>`,button('Reset exercise','confirm-reset','danger')+button('Keep my progress','close-modal','secondary')),
    'confirm-reset':()=>{const presenter=state.presenter;closeModal();state=makeState();state.presenter=presenter;timerAnchor=performance.now();if(location.hash==='#overview')render(true);else go('overview');toast('Exercise reset. A fresh fictional scenario is ready.');},
    'demo-email':()=>{if(!state.emailOpened){state.emailOpened=true;addEvent('Email inspected','The message was opened. No incident is triggered by reading this email.','neutral');}state.tab='inbox';go('simulation');},
    'demo-trigger':()=>{if(route!=='simulation'){state.tab='files';state.folder='Downloads';location.hash='simulation';setTimeout(triggerPrompt,0);}else triggerPrompt();},
    'demo-next':buttonElement=>{const next=buttonElement.dataset.next;if(next==='stage'&&route!=='simulation'){state.tab='files';stageAttachment();go('simulation');}else actions[next]?.();}
  };
  document.addEventListener('click',e=>{
    const target=e.target.closest('button');if(!target||target.disabled)return;
    if(target.dataset.action){actions[target.dataset.action]?.(target);return;}
    if(target.dataset.tab){state.tab=target.dataset.tab;render();$(`#tab-${state.tab}`).focus();return;}
    if(target.dataset.folder){state.folder=target.dataset.folder;state.search='';render();$(`[data-folder="${state.folder}"]`).focus();return;}
    if(target.dataset.file){openFile(target.dataset.file);return;}
    if(target.dataset.step!==undefined){const n=Number(target.dataset.step);if(n<=state.responseStep){state.reviewStep=n;render();$('.response-content').scrollIntoView({block:'nearest'});}return;}
  });
  document.addEventListener('change',e=>{
    if(e.target.id==='pace'){state.speed=Number(e.target.value);timerAnchor=performance.now();updateTimer();}
    if(e.target.name==='decision')state.choices[state.reviewStep]=$$('input[name="decision"]:checked',main).map(el=>el.value);
  });
  document.addEventListener('input',e=>{
    if(e.target.id!=='file-search')return;
    const start=e.target.selectionStart;state.search=e.target.value;
    $('#work-panel').innerHTML=explorer();const field=$('#file-search');field.focus();if(field.type!=='search')field.setSelectionRange(start,start);
  });
  document.addEventListener('keydown',e=>{
    if(e.target.getAttribute('role')!=='tab')return;
    const tabs=$$('[role="tab"]'),current=tabs.indexOf(e.target);
    let next;if(e.key==='ArrowRight')next=(current+1)%tabs.length;if(e.key==='ArrowLeft')next=(current-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;
    if(next!==undefined){e.preventDefault();tabs[next].click();}
  });
  modal.addEventListener('cancel',e=>{e.preventDefault();closeModal();});
  modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
  window.addEventListener('hashchange',()=>render(true));
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.incident&&!state.paused){state.paused=true;updateTimer();renderPresenter();toast('Timer paused while the page is hidden. Resume when ready.');}timerAnchor=performance.now();});
  setInterval(()=>{const now=performance.now();if(state.incident&&!state.paused&&!state.isolated&&!state.expired){const elapsed=(now-timerAnchor)/1000;state.remaining=Math.max(0,state.remaining-elapsed*state.speed);if(state.remaining<=0)expireTimer();else updateTimer();}timerAnchor=now;},250);
  render();
})();
