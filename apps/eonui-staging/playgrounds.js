import { modernizerFeedback } from './modernizer-feedback.generated.js';

function wrapPanel(title, content) {
  return `
    <eon-card>
      <eon-stack gap="0.75rem">
        <strong>${title}</strong>
        ${content}
      </eon-stack>
    </eon-card>
  `;
}

function renderChartSpecTokenSection(title, items) {
  if (!items?.length) {
    return '';
  }

  return `
    <div style="display:grid;gap:0.45rem">
      <strong style="font-size:0.95rem">${title}</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
        ${items
          .map(
            (item) => `
              <span style="padding:0.35rem 0.7rem;border:1px solid rgba(148,163,184,0.18);border-radius:999px;background:rgba(255,255,255,0.88);">
                ${item}
              </span>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function createChartSpecPlayground(entry) {
  const dataShapeRows = (entry.dataShape || [])
    .map(
      (field) => `
        <div style="padding:0.85rem 0.95rem;border:1px solid rgba(148,163,184,0.18);border-radius:0.95rem;background:rgba(255,255,255,0.92);display:grid;gap:0.3rem;">
          <div style="display:flex;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;">
            <strong style="margin:0">${field.name}</strong>
            <span style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">
              ${field.type}${field.required ? ' required' : ' optional'}
            </span>
          </div>
          <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.5;">
            ${field.description || 'Field used by the chart data model.'}
          </p>
        </div>
      `
    )
    .join('');

  const usageNotes = [...(entry.devextremeHints || []), ...(entry.d3Analogs || []).map((value) => `D3: ${value}`)].slice(0, 4);
  const exampleList = (entry.examples || []).slice(0, 4);

  return `
    <eon-stack gap="1rem">
      <eon-card>
        <div style="display:grid;gap:0.9rem">
          <div style="display:flex;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;align-items:start;">
            <div style="display:grid;gap:0.2rem">
              <span style="font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--eon-semantic-text-secondary, #475569);">
                ${humanizeName(entry.family || 'chart spec')}
              </span>
              <strong style="font-size:1.1rem;margin:0">${humanizeName(entry.name)}</strong>
            </div>
            <span style="padding:0.35rem 0.7rem;border-radius:999px;background:rgba(59,130,246,0.08);color:#1d4ed8;font-size:0.82rem;font-weight:700;">
              ${humanizeName(entry.renderer || 'renderer')}
            </span>
          </div>
          <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.6;">
            ${entry.description}
          </p>
          ${renderChartSpecTokenSection('Series', entry.series)}
          ${renderChartSpecTokenSection('Variants', entry.variants)}
          ${renderChartSpecTokenSection('Capabilities', entry.capabilities)}
          ${renderChartSpecTokenSection('Interactions', entry.interactions)}
        </div>
      </eon-card>

      ${
        dataShapeRows
          ? `
            <eon-card>
              <div style="display:grid;gap:0.75rem">
                <strong>Data shape</strong>
                <div style="display:grid;gap:0.75rem">${dataShapeRows}</div>
              </div>
            </eon-card>
          `
          : ''
      }

      ${
        usageNotes.length || exampleList.length
          ? `
            <eon-grid min="16rem" gap="0.9rem">
              ${
                usageNotes.length
                  ? `
                    <eon-card>
                      <div style="display:grid;gap:0.65rem">
                        <strong>Implementation cues</strong>
                        <ul style="margin:0;padding-left:1.1rem;display:grid;gap:0.45rem;color:var(--eon-semantic-text-secondary, #475569);line-height:1.5;">
                          ${usageNotes.map((item) => `<li>${item}</li>`).join('')}
                        </ul>
                      </div>
                    </eon-card>
                  `
                  : ''
              }
              ${
                exampleList.length
                  ? `
                    <eon-card>
                      <div style="display:grid;gap:0.65rem">
                        <strong>Story examples</strong>
                        <ul style="margin:0;padding-left:1.1rem;display:grid;gap:0.45rem;color:var(--eon-semantic-text-secondary, #475569);line-height:1.5;">
                          ${exampleList.map((item) => `<li>${item}</li>`).join('')}
                        </ul>
                      </div>
                    </eon-card>
                  `
                  : ''
              }
            </eon-grid>
          `
          : ''
      }
    </eon-stack>
  `;
}

const labeledOptions =
  'Admin|admin||Full workspace control;Editor|editor||Can update content and settings;Viewer|viewer||Read-only access';
const groupedOptions =
  'Workspace / Strategy|strategy||Board-level review;Workspace / Delivery|delivery||Day-to-day execution;Automation / Alerts|alerts||Real-time watchlist;Automation / Archive|archive|disabled|Locked historic runs';
const menuTree =
  'Workspace/Overview;Workspace/Members;Workspace/Billing|disabled;Automation/Rules;Automation/Playbooks;Automation/Archive|danger';
const treeItems =
  'Workspace/Overview;Workspace/Incidents/Critical;Workspace/Incidents/Resolved;Operations/Hiring/Backend;Operations/Hiring/Design;Operations/Risk Register';
const breadcrumbTrailData = JSON.stringify([
  { label: 'Workspace', value: 'workspace', meta: 'Primary', icon: 'WS' },
  { label: 'Releases', value: 'workspace/releases', badge: 'Live', description: 'Current launch board and release notes.' },
  { label: 'June launch', value: 'workspace/releases/june-launch', status: 'Current', description: 'Final review before staging sign-off.' }
]);
const navigationMenuData = JSON.stringify([
  {
    label: 'Workspace',
    value: 'workspace',
    icon: 'WS',
    children: [
      { label: 'Overview', value: 'workspace/overview', meta: 'Home', description: 'Current release summary and launch status.' },
      { label: 'Members', value: 'workspace/members', badge: '12', description: 'Owners, reviewers, and on-call responders.' },
      { label: 'Archive', value: 'workspace/archive', status: 'Locked', shortcut: 'A', description: 'Historic snapshots and release notes.', tone: 'warning' }
    ]
  },
  {
    label: 'Automation',
    value: 'automation',
    icon: 'AI',
    children: [
      { label: 'Rules', value: 'automation/rules', meta: 'Policy', description: 'Runtime checks that protect the release flow.' },
      { label: 'Playbooks', value: 'automation/playbooks', badge: 'New', description: 'Reusable response and escalation templates.' },
      { label: 'Archive', value: 'automation/archive', status: 'Restricted', shortcut: 'Shift+A', description: 'Historic runs are kept read only.', tone: 'danger', destructive: true }
    ]
  }
]);
const headerNavigationData = JSON.stringify([
  { label: 'Overview', value: 'overview', meta: 'Home', description: 'Workspace summary and launch status.', icon: 'OV' },
  {
    label: 'Approvals',
    value: 'approvals',
    badge: 'Review',
    description: 'Pending reviewers, blockers, and final sign-off.',
    icon: 'AP',
    children: [
      { label: 'Pending', value: 'approvals/pending', status: '3 waiting', description: 'Stakeholders still reviewing the final package.' },
      { label: 'Resolved', value: 'approvals/resolved', meta: 'Audit trail', description: 'Previously approved decisions and notes.' }
    ]
  },
  {
    label: 'Signals',
    value: 'signals',
    badge: 'Live',
    description: 'Track runtime changes and watchlist alerts.',
    icon: 'SG',
    children: [
      { label: 'Runtime', value: 'signals/runtime', status: 'Healthy', description: 'Health and anomaly checks for staging.' },
      { label: 'Watchlist', value: 'signals/watchlist', badge: '12', description: 'Flagged changes and notable regressions.' }
    ]
  },
  { label: 'Archive', value: 'archive', meta: 'Docs', description: 'Historic snapshots and release notes.', icon: 'AR' }
]);
const headerUtilityData = JSON.stringify([
  { label: 'Search', value: 'search', badge: 'Cmd K', description: 'Jump to a page, component, or task.', icon: 'SR' },
  { label: 'Share', value: 'share', badge: 'Live', description: 'Post the latest review board to stakeholders.', icon: 'SH' },
  { label: 'Account', value: 'account', status: 'Owner', description: 'Workspace permissions and profile actions.', avatar: 'AS' }
]);
const pageHeaderBreadcrumbsData = JSON.stringify([
  { label: 'Workspace', value: 'workspace', icon: 'WS' },
  { label: 'Releases', value: 'workspace/releases', meta: 'Launch board', badge: 'Live' },
  { label: 'June launch', value: 'workspace/releases/june-launch', status: 'Current', description: 'Final review before staging sign-off.' }
]);
const pageHeaderMetaData = JSON.stringify([
  { label: 'Owner', value: 'Ariana Singh', status: 'Review lead', avatar: 'AS' },
  { label: 'State', value: 'Ready for parity', badge: 'Healthy', tone: 'success' },
  { label: 'Window', value: 'Today, 5:30 PM', meta: 'Release freeze' }
]);
const pageHeaderProofData = JSON.stringify([
  { label: 'Launch score', value: '94%', description: 'Readiness across parity, QA, and docs.', badge: 'Primary' },
  { label: 'Open approvals', value: '3', description: 'Stakeholders still need to review the final package.', status: 'Pending' },
  { label: 'Regression sweep', value: '12 / 12', description: 'All mock-driven examples stayed green in the latest run.', tone: 'success' }
]);
const pageHeaderActionData = JSON.stringify([
  { label: 'Publish review', value: 'publish-review', badge: 'Primary' },
  { label: 'Share board', value: 'share-board', meta: 'Stakeholders' },
  { label: 'Open history', value: 'open-history', tone: 'warning' }
]);
const sectionHeaderMetaData = JSON.stringify([
  { label: 'Status', value: 'Healthy', tone: 'success' },
  { label: 'Owner', value: 'Mira Chen', avatar: 'MC', meta: 'Review owner' },
  { label: 'Updated', value: '5 min ago', badge: 'Live' }
]);
const sectionHeaderAnchorData = JSON.stringify([
  { label: 'Overview', value: 'overview', meta: 'Summary' },
  { label: 'Approvals', value: 'approvals', badge: '3 pending' },
  { label: 'Audit notes', value: 'audit-notes', status: 'Review' }
]);
const sectionHeaderActionData = JSON.stringify([
  { label: 'Assign owner', value: 'assign-owner', badge: 'Quick action' },
  { label: 'Request sign-off', value: 'request-sign-off', tone: 'success' }
]);
const sectionFooterSummaryData = JSON.stringify([
  { label: 'Docs', value: 'Packages', description: 'Browse source packages and implementation notes.', icon: 'PK' },
  { label: 'Support', value: 'Help thread', description: 'Keep the implementation discussion close to the component.', avatar: 'HT' },
  { label: 'Status', value: 'Checks green', description: 'Review build and test health before handoff.', tone: 'success' }
]);
const sectionFooterLinkData = JSON.stringify([
  { label: 'Open staging preview', value: 'staging-preview', meta: '127.0.0.1:4310' },
  { label: 'Compare generic and dark', value: 'theme-compare', badge: 'Themes' },
  { label: 'Review the tracker', value: 'program-index', status: 'Updated' }
]);
const sectionFooterStatusData = JSON.stringify([
  { label: 'Wave 4', value: 'Header shells', badge: 'Current' },
  { label: 'Ready for sign-off', value: '12 checks', tone: 'success' }
]);
const sectionFooterActionData = JSON.stringify([
  { label: 'Request final approval', value: 'request-approval', badge: 'Primary' },
  { label: 'Share summary', value: 'share-summary' },
  { label: 'Archive notes', value: 'archive-notes', tone: 'danger', destructive: true }
]);
const bannerItemsData = JSON.stringify([
  { title: 'Spring launch', subtitle: 'Now live', description: 'A refreshed account workspace with faster task switching.', accent: 'Workspace shells', badge: 'Live' },
  { title: 'Priority workflow', subtitle: 'Editorial rail', description: 'Move updates, tasks, and approvals into one calmer announcement band.', meta: 'Rollout ready' },
  { title: 'Team recap', subtitle: 'This week', description: 'Summarize the headline, proof, and next step without losing hierarchy.', actionLabel: 'Read notes' }
]);
const bannerMetaData = JSON.stringify([
  { label: 'Wave 9', value: 'Marketing', badge: 'Current' },
  { label: 'Updated', value: '5 minutes ago', meta: 'Staging' }
]);
const bannerProofData = JSON.stringify([
  { label: 'Preview routes', value: '2 themes', description: 'Light and dark examples are both ready for review.' },
  { label: 'Coverage', value: '10 components', description: 'This batch upgrades the first marketing foundation slice.', tone: 'success' }
]);
const bannerActionData = JSON.stringify([
  { label: 'Open staging board', value: 'open-staging-board', badge: 'Primary' },
  { label: 'Share summary', value: 'share-summary' }
]);
const bannerLinkData = JSON.stringify([
  { label: 'Read release notes', value: 'read-release-notes', meta: 'Docs' },
  { label: 'Review tracker', value: 'review-tracker', badge: 'Index' }
]);
const marketingHeaderMetaData = JSON.stringify([
  { label: 'Owner', value: 'Mira Chen', avatar: 'MC' },
  { label: 'Window', value: 'Today, 5:30 PM', meta: 'Freeze' }
]);
const marketingHeaderProofData = JSON.stringify([
  { label: 'Coverage', value: '10 / 19', description: 'Marketing components completed in this wave.' },
  { label: 'Staging', value: '4310', description: 'Examples are visible in the staging workspace.', tone: 'success' }
]);
const marketingHeaderActionData = JSON.stringify([
  { label: 'Assign owner', value: 'assign-owner', badge: 'Primary' },
  { label: 'Request sign-off', value: 'request-sign-off', tone: 'success' }
]);
const marketingHeaderLinkData = JSON.stringify([
  { label: 'Open tracker', value: 'open-tracker', meta: 'Program index' },
  { label: 'See components', value: 'see-components', badge: 'Catalog' }
]);
const heroHeaderMetaData = JSON.stringify([
  { label: 'Staging URL', value: '127.0.0.1:4310', badge: 'Local' },
  { label: 'Mode', value: 'Mock to component', meta: 'Wave 9' }
]);
const heroHeaderProofData = JSON.stringify([
  { label: 'Launch score', value: '94%', description: 'Readiness across parity, QA, and docs.' },
  { label: 'Open approvals', value: '3', description: 'Stakeholders still need the final pass.', status: 'Pending' },
  { label: 'Regression sweep', value: '12 / 12', description: 'This batch kept the current checks green.', tone: 'success' }
]);
const heroHeaderActionData = JSON.stringify([
  { label: 'Publish review', value: 'publish-review', badge: 'Primary' },
  { label: 'Share board', value: 'share-board', meta: 'Stakeholders' }
]);
const inlineCtaMetaData = JSON.stringify([
  { label: 'Next step', value: 'React surface', badge: 'Typed' }
]);
const inlineCtaProofData = JSON.stringify([
  { label: 'Wrapper parity', value: '10 props typed', description: 'Structured marketing props now stay typed in React.' }
]);
const inlineCtaActionData = JSON.stringify([
  { label: 'View package docs', value: 'view-package-docs', badge: 'Primary' },
  { label: 'See examples', value: 'see-examples' }
]);
const newsletterMetaData = JSON.stringify([
  { label: 'Cadence', value: 'Weekly', badge: 'Digest' },
  { label: 'Audience', value: 'Product teams', meta: 'Design + engineering' }
]);
const newsletterProofData = JSON.stringify([
  { label: 'Subscribers', value: '1.4k', description: 'Existing readers already following release notes.' },
  { label: 'Open rate', value: '61%', description: 'People still prefer concise launch notes.', tone: 'success' }
]);
const newsletterActionData = JSON.stringify([
  { label: 'Join the brief', value: 'join-the-brief', badge: 'Primary' },
  { label: 'See archive', value: 'see-archive' }
]);
const ctaSectionItemsData = JSON.stringify([
  { title: 'Install the package', subtitle: 'Setup', description: 'Register elements once and compose primitives quickly.', accent: '5 mins', badge: 'Fast' },
  { title: 'Audit your gaps', subtitle: 'Planning', description: 'Map docs-only families to actual source coverage.', meta: 'Checklist' },
  { title: 'Ship a pilot', subtitle: 'Delivery', description: 'Roll out a real workspace surface end to end.', actionLabel: 'Start now' }
]);
const ctaSectionProofData = JSON.stringify([
  { label: 'Packages', value: 'Core + React', description: 'The first shipping surface is already aligned.' },
  { label: 'Examples', value: 'Staging ready', description: 'Every converted component shows a modernized example.', tone: 'success' }
]);
const ctaSectionActionData = JSON.stringify([
  { label: 'Request approval', value: 'request-approval', badge: 'Primary' },
  { label: 'Share rollout', value: 'share-rollout' }
]);
const ctaSectionLinkData = JSON.stringify([
  { label: 'Review the tracker', value: 'review-the-tracker', meta: 'Program index' },
  { label: 'Inspect staging', value: 'inspect-staging', badge: '4310' }
]);
const contentSectionItemsData = JSON.stringify([
  { title: 'Reusable primitives', subtitle: 'Design system', description: 'Move from docs-only surfaces to shipping packages.', accent: 'Source-first' },
  { title: 'Calmer workflows', subtitle: 'Operations', description: 'Keep wrappers, manifests, and runtime aligned.', meta: 'Fewer regressions' },
  { title: 'Faster onboarding', subtitle: 'DX', description: 'Give product teams real components instead of screenshots.', actionLabel: 'Read story' }
]);
const contentSectionMetaData = JSON.stringify([
  { label: 'Format', value: 'Narrative grid', badge: 'Editorial' },
  { label: 'Audience', value: 'Product teams', meta: 'Cross-functional' }
]);
const contentSectionLinkData = JSON.stringify([
  { label: 'Read the migration story', value: 'read-the-migration-story', meta: 'Journal' },
  { label: 'Compare before and after', value: 'compare-before-after', badge: 'Review' }
]);
const featuresSectionItemsData = JSON.stringify([
  { title: 'Real package source', subtitle: 'Foundation', description: 'Core and React now live in the workspace.', accent: 'Inspectable', badge: 'Source' },
  { title: 'Manifest-aware', subtitle: 'Metadata', description: 'Catalog and registry stay in sync with the source tree.', meta: 'Traceable' },
  { title: 'Theme capable', subtitle: 'Styling', description: 'Generic, Material, and Fluent hooks remain intact.', actionLabel: 'See themes' }
]);
const featuresSectionProofData = JSON.stringify([
  { label: 'Theme families', value: '3', description: 'Generic, Material, and Fluent stay visible in staging.' },
  { label: 'State coverage', value: 'Loading, empty, error', description: 'The shared shell now normalizes marketing states.' }
]);
const faqSectionItemsData = JSON.stringify([
  { title: 'Can I use the components with React?', subtitle: 'Framework support', description: 'Yes, the React bridge wraps the underlying custom elements.', meta: 'React package' },
  { title: 'Do the sections support SSR?', subtitle: 'Rendering', description: 'Server markup is safe, with client-side upgrade on load.', meta: 'SSR guidance' },
  { title: 'Can we theme the surfaces?', subtitle: 'Tokens', description: 'Yes, the shells pick up Eon tokens and family overrides.', actionLabel: 'Read docs' }
]);
const faqSectionLinkData = JSON.stringify([
  { label: 'Read SSR guidance', value: 'read-ssr-guidance', meta: 'Docs' },
  { label: 'Open token notes', value: 'open-token-notes', badge: 'Themes' }
]);
const footerItemsData = JSON.stringify([
  { title: 'Docs', subtitle: 'Packages', description: 'Browse source packages and implementation notes.', badge: 'Catalog' },
  { title: 'Support', subtitle: 'Help thread', description: 'Keep the implementation discussion close to the component.', meta: 'Workspace' },
  { title: 'Status', subtitle: 'Checks green', description: 'Review build and test health before handoff.', actionLabel: 'Review CI' }
]);
const footerMetaData = JSON.stringify([
  { label: 'Wave 9', value: 'Marketing foundation', badge: 'Current' },
  { label: 'Verified', value: '10 more surfaces', tone: 'success' }
]);
const footerLinkData = JSON.stringify([
  { label: 'Open staging preview', value: 'open-staging-preview', meta: '127.0.0.1:4310' },
  { label: 'Review the tracker', value: 'review-the-tracker', badge: 'Index' }
]);
const footerActionData = JSON.stringify([
  { label: 'Share summary', value: 'share-summary', badge: 'Primary' },
  { label: 'Archive notes', value: 'archive-notes', tone: 'danger', destructive: true }
]);
const blogSectionItemsData = JSON.stringify([
  { title: 'Scaling design review', subtitle: 'Issue 14', description: 'How we reduced approval loops across squads.', accent: '6 min read', badge: 'Featured' },
  { title: 'Building calmer onboarding', subtitle: 'Playbook', description: 'Small interaction changes that improved activation.', meta: '4 min read' },
  { title: 'Shipping system tokens', subtitle: 'Engineering', description: 'What moved from docs into product packages.', actionLabel: 'Read article' }
]);
const blogSectionMetaData = JSON.stringify([
  { label: 'Series', value: 'Mock to component', badge: 'Journal' },
  { label: 'Updated', value: 'Today', meta: 'Editorial board' }
]);
const blogSectionProofData = JSON.stringify([
  { label: 'Readers', value: '1.4k', description: 'Teams following the release digest.' },
  { label: 'Issues shipped', value: '18', description: 'Editorial stories tied directly to staged rollouts.', tone: 'success' }
]);
const blogSectionActionData = JSON.stringify([
  { label: 'Open journal', value: 'open-journal', badge: 'Primary' },
  { label: 'Share issue', value: 'share-issue' }
]);
const blogSectionLinkData = JSON.stringify([
  { label: 'View archive', value: 'view-archive', meta: 'Issue history' },
  { label: 'Meet the authors', value: 'meet-authors', badge: 'Team' }
]);
const careersSectionItemsData = JSON.stringify([
  { title: 'Frontend engineer', subtitle: 'Remote', description: 'Build resilient component infrastructure.', accent: 'Remote friendly', badge: 'Open' },
  { title: 'Product designer', subtitle: 'Hybrid', description: 'Shape onboarding and billing surfaces.', meta: 'Bengaluru' },
  { title: 'Developer advocate', subtitle: 'Hybrid', description: 'Teach the platform through examples and docs.', actionLabel: 'See role' }
]);
const careersSectionMetaData = JSON.stringify([
  { label: 'Hiring mode', value: 'Distributed', badge: 'Hybrid' },
  { label: 'Team size', value: '14', meta: 'Core org' }
]);
const careersSectionProofData = JSON.stringify([
  { label: 'Open roles', value: '6', description: 'Across product, docs, and platform.' },
  { label: 'Response SLA', value: '5 days', description: 'Candidates hear back quickly.', tone: 'success' }
]);
const careersSectionActionData = JSON.stringify([
  { label: 'View all roles', value: 'view-all-roles', badge: 'Primary' },
  { label: 'Meet the team', value: 'meet-the-team' }
]);
const careersSectionLinkData = JSON.stringify([
  { label: 'Read hiring notes', value: 'read-hiring-notes', meta: 'Culture' },
  { label: 'See benefits', value: 'see-benefits', badge: 'Support' }
]);
const contactSectionItemsData = JSON.stringify([
  { title: 'Sales', subtitle: 'Mon-Fri', description: 'Talk through rollout, procurement, and pricing.', accent: 'sales@eonui.com', badge: 'Priority' },
  { title: 'Support', subtitle: '24/5', description: 'Get help with components and integration issues.', meta: 'support@eonui.com' },
  { title: 'Partnerships', subtitle: 'Ongoing', description: 'Explore design, distribution, and ecosystem ideas.', actionLabel: 'Start conversation' }
]);
const contactSectionMetaData = JSON.stringify([
  { label: 'Coverage', value: 'Global', badge: 'Follow the sun' },
  { label: 'Escalation', value: '2 hrs', meta: 'Critical issues' }
]);
const contactSectionProofData = JSON.stringify([
  { label: 'Support score', value: '97%', description: 'Average satisfaction for rollout help.' },
  { label: 'Regional desks', value: '3', description: 'APAC, Europe, and Americas coverage.', tone: 'success' }
]);
const contactSectionActionData = JSON.stringify([
  { label: 'Open help center', value: 'open-help-center', badge: 'Primary' },
  { label: 'Book a call', value: 'book-a-call' }
]);
const contactSectionLinkData = JSON.stringify([
  { label: 'Escalation policy', value: 'escalation-policy', meta: 'Docs' },
  { label: 'Partner program', value: 'partner-program', badge: 'Ecosystem' }
]);
const illustrationItemsData = JSON.stringify([
  { title: 'Empty-state stage', subtitle: 'Use case', description: 'Pair the illustration with guidance when no records are available.', accent: 'Recovery', badge: 'Default' },
  { title: 'Campaign accent', subtitle: 'Marketing', description: 'Anchor promotional copy with calm supporting artwork.', meta: 'Brand surface' },
  { title: 'Editorial cue', subtitle: 'Storytelling', description: 'Keep richer shell regions visible even when media leads the layout.', actionLabel: 'Use pattern' }
]);
const illustrationMetaData = JSON.stringify([
  { label: 'Asset mode', value: 'Built-in SVG', badge: 'Default media' },
  { label: 'Override', value: 'Slot media', meta: 'Optional' }
]);
const illustrationProofData = JSON.stringify([
  { label: 'States', value: 'Loading, empty, error', description: 'The shell keeps copy and actions visible across recovery flows.' },
  { label: 'Themes', value: '2', description: 'Generic light and dark previews stay aligned.', tone: 'success' }
]);
const illustrationActionData = JSON.stringify([
  { label: 'Browse empty states', value: 'browse-empty-states', badge: 'Primary' },
  { label: 'Open asset notes', value: 'open-asset-notes' }
]);
const illustrationLinkData = JSON.stringify([
  { label: 'See artwork slots', value: 'see-artwork-slots', meta: 'Docs' },
  { label: 'Review examples', value: 'review-examples', badge: 'Staging' }
]);
const metricsSectionItemsData = JSON.stringify([
  { title: '119 families', subtitle: 'Catalog', description: 'Expanded Eon component family surface.', accent: 'Now mapped', badge: 'Coverage' },
  { title: '110 previews', subtitle: 'Staging', description: 'Modernized examples already visible in the playground.', meta: 'Before final 9' },
  { title: '0 guesswork', subtitle: 'Workflow', description: 'The workspace mirrors package reality instead of docs-only placeholders.', actionLabel: 'Open report' }
]);
const metricsSectionMetaData = JSON.stringify([
  { label: 'Window', value: 'This week', badge: 'Program' },
  { label: 'Source', value: 'Tracker', meta: 'Generated index' }
]);
const metricsSectionProofData = JSON.stringify([
  { label: 'Typed props', value: '110', description: 'React surfaces already carrying structured props.' },
  { label: 'Custom demos', value: '110', description: 'Staging custom examples before the final pass.', tone: 'success' }
]);
const metricsSectionActionData = JSON.stringify([
  { label: 'Open report', value: 'open-report', badge: 'Primary' },
  { label: 'Export summary', value: 'export-summary' }
]);
const metricsSectionLinkData = JSON.stringify([
  { label: 'Review tracker', value: 'review-tracker', meta: 'JSON' },
  { label: 'Compare waves', value: 'compare-waves', badge: 'Program' }
]);
const pricingSectionItemsData = JSON.stringify([
  { title: 'Starter', subtitle: '$0', description: 'Use the base package surface for prototypes and internal tools.', accent: 'Free', badge: 'Entry' },
  { title: 'Growth', subtitle: '$49', description: 'Ship branded workspaces with wrappers and manifests.', meta: 'Per seat' },
  { title: 'Enterprise', subtitle: 'Custom', description: 'Align packages, governance, and adoption workflows.', actionLabel: 'Talk to sales' }
]);
const pricingSectionMetaData = JSON.stringify([
  { label: 'Billing', value: 'Monthly', badge: 'Default' },
  { label: 'Buyer', value: 'Product teams', meta: 'Primary' }
]);
const pricingSectionProofData = JSON.stringify([
  { label: 'Lower churn', value: '32%', description: 'Teams reduce rework after the structured conversion pass.' },
  { label: 'Adoption', value: '14 teams', description: 'Current users expanding the catalog footprint.', tone: 'success' }
]);
const pricingSectionActionData = JSON.stringify([
  { label: 'Compare plans', value: 'compare-plans', badge: 'Primary' },
  { label: 'Contact sales', value: 'contact-sales' }
]);
const pricingSectionLinkData = JSON.stringify([
  { label: 'See FAQ', value: 'see-faq', meta: 'Billing' },
  { label: 'Read procurement notes', value: 'read-procurement-notes', badge: 'Enterprise' }
]);
const socialProofSectionItemsData = JSON.stringify([
  { title: 'Design systems', subtitle: 'Outcome', description: 'Moved docs examples into shipping packages faster.', accent: 'Case study', badge: 'Story' },
  { title: 'Platform teams', subtitle: 'Outcome', description: 'Reduced wrapper drift across apps and previews.', meta: 'Customer note' },
  { title: 'Growth teams', subtitle: 'Outcome', description: 'Used the catalog to prioritize UI investment with less churn.', actionLabel: 'Read story' }
]);
const socialProofSectionMetaData = JSON.stringify([
  { label: 'Signals', value: 'Enterprise', badge: 'B2B' },
  { label: 'Collected', value: 'Quarterly', meta: 'Recent voice' }
]);
const socialProofSectionProofData = JSON.stringify([
  { label: 'Case studies', value: '14', description: 'Linked to specific rollout outcomes.' },
  { label: 'Retention', value: '96%', description: 'Teams stay active after the first staged wave.', tone: 'success' }
]);
const socialProofSectionActionData = JSON.stringify([
  { label: 'Read case study', value: 'read-case-study', badge: 'Primary' },
  { label: 'Share proof', value: 'share-proof' }
]);
const socialProofSectionLinkData = JSON.stringify([
  { label: 'Open quote bank', value: 'open-quote-bank', meta: 'Voice of customer' },
  { label: 'See logos', value: 'see-logos', badge: 'Brands' }
]);
const teamSectionItemsData = JSON.stringify([
  { title: 'Nadia Khan', subtitle: 'Design systems', description: 'Owns component structure and theme coverage.', meta: 'Bengaluru', avatar: 'NK', badge: 'Lead' },
  { title: 'Leo Martinez', subtitle: 'Frontend', description: 'Builds runtime primitives and React bridges.', meta: 'Remote', avatar: 'LM' },
  { title: 'Asha Raman', subtitle: 'Docs', description: 'Turns component behavior into adoptable guidance.', meta: 'Chennai', avatar: 'AR', actionLabel: 'View profile' }
]);
const teamSectionMetaData = JSON.stringify([
  { label: 'Timezone overlap', value: '6 hrs', badge: 'Core window' },
  { label: 'Org', value: 'Product platform', meta: 'EonUI' }
]);
const teamSectionProofData = JSON.stringify([
  { label: 'Builders', value: '14', description: 'Design, engineering, docs, and staging partners.' },
  { label: 'Avg tenure', value: '3.2 yrs', description: 'Experience across rollout-heavy product teams.', tone: 'success' }
]);
const teamSectionActionData = JSON.stringify([
  { label: 'Meet the team', value: 'meet-the-team', badge: 'Primary' },
  { label: 'See open roles', value: 'see-open-roles' }
]);
const teamSectionLinkData = JSON.stringify([
  { label: 'Read operating notes', value: 'read-operating-notes', meta: 'Culture' },
  { label: 'Browse profiles', value: 'browse-profiles', badge: 'People' }
]);
const testimonialSectionItemsData = JSON.stringify([
  { title: '"We finally had source, wrappers, and docs pointing to the same thing."', subtitle: 'Platform lead', description: 'Saved weeks by keeping staging and packages aligned.', meta: 'Internal migration', badge: 'Outcome' },
  { title: '"The new family components gave us better parity without blocking the release."', subtitle: 'Staff engineer', description: 'Lowered rollout risk while preserving the delivery window.', meta: 'Product UI' },
  { title: '"It feels like a real package now, not a promise."', subtitle: 'Design engineer', description: 'Gave teams more trust in the catalog during adoption.', actionLabel: 'Share quote' }
]);
const testimonialSectionMetaData = JSON.stringify([
  { label: 'Collected from', value: 'Recent rollouts', badge: 'Fresh' },
  { label: 'Format', value: 'Customer voice', meta: 'Concise' }
]);
const testimonialSectionProofData = JSON.stringify([
  { label: 'Quotes', value: '12', description: 'Recent testimonial snippets tied to adoption outcomes.' },
  { label: 'Confidence', value: 'High', description: 'Stakeholders trust the staged examples more after the upgrade.', tone: 'success' }
]);
const testimonialSectionActionData = JSON.stringify([
  { label: 'Share quote', value: 'share-quote', badge: 'Primary' },
  { label: 'Read story', value: 'read-story' }
]);
const testimonialSectionLinkData = JSON.stringify([
  { label: 'Open quote bank', value: 'open-quote-bank', meta: 'Source notes' },
  { label: 'See case studies', value: 'see-case-studies', badge: 'Proof' }
]);
const contextMenuActionData = JSON.stringify([
  {
    label: 'Review',
    value: 'review',
    icon: 'RV',
    children: [
      { label: 'Request approval', value: 'review/request-approval', badge: 'Async', shortcut: 'A', description: 'Notify approvers with the latest checklist.', status: 'Pending' },
      { label: 'Share summary', value: 'review/share-summary', meta: 'Stakeholders', shortcut: 'S', description: 'Post the current release summary to the review channel.' }
    ]
  },
  {
    label: 'Workspace',
    value: 'workspace-actions',
    icon: 'WS',
    children: [
      { label: 'Open audit trail', value: 'workspace-actions/open-audit-trail', badge: 'Live', description: 'Inspect the staged audit log and recent operator actions.' },
      { label: 'Archive draft', value: 'workspace-actions/archive-draft', status: 'Final', shortcut: 'D', description: 'Move this draft out of the live queue.', tone: 'danger', destructive: true }
    ]
  }
]);
const actionSheetOverlayData = JSON.stringify([
  { group: 'Review', label: 'Request approval', value: 'request-approval', description: 'Notify approvers and attach the staged summary.', badge: 'Async', status: 'Pending', shortcut: 'A' },
  { group: 'Review', label: 'Share summary', value: 'share-summary', description: 'Post the latest review package to stakeholders.', meta: 'Stakeholders', shortcut: 'S' },
  { group: 'Workspace', label: 'Open audit trail', value: 'open-audit-trail', description: 'Inspect the latest staged events and parity notes.', badge: 'Live', status: 'Healthy' },
  { group: 'Danger', label: 'Delete draft', value: 'delete-draft', description: 'Remove the current draft from the release queue.', tone: 'danger', destructive: true }
]);
const popupFooterActionData = JSON.stringify([
  { id: 'share-review', label: 'Share review', value: 'share-review', badge: 'Live' },
  { id: 'assign-owner', label: 'Assign owner', value: 'assign-owner', meta: 'Team lead' }
]);
const loadPanelTaskData = JSON.stringify([
  { label: 'Workspace summary', value: 'workspace-summary', status: 'Done', badge: 'Cached' },
  { label: 'Recent activity', value: 'recent-activity', status: 'Syncing', badge: 'Live', description: 'Refreshing the latest staged updates and approvals.' },
  { label: 'Regression sweep', value: 'regression-sweep', status: 'Queued', meta: '12 checks remaining' }
]);
const loadPanelActionData = JSON.stringify([
  { id: 'retry-sync', label: 'Retry sync', value: 'retry-sync', badge: 'Primary' },
  { id: 'open-log', label: 'Open log', value: 'open-log' }
]);
const sidebarNavigationData = JSON.stringify([
  {
    label: 'Workspace',
    value: 'workspace',
    icon: 'WS',
    children: [
      { label: 'Overview', value: 'workspace/overview', meta: 'Primary', badge: 'Live', description: 'Current release summary and owner status.' },
      { label: 'Incidents', value: 'workspace/incidents', status: '12 open', description: 'Critical issues, regressions, and follow-up notes.' },
      { label: 'Approvals', value: 'workspace/approvals', badge: '3 waiting', description: 'Pending reviewers and final sign-off.' }
    ]
  },
  {
    label: 'Operations',
    value: 'operations',
    icon: 'OP',
    children: [
      { label: 'Signals', value: 'operations/signals', meta: 'Runtime', description: 'Monitor alerts, watchlists, and validation checks.' },
      { label: 'Archive', value: 'operations/archive', badge: 'Read only', status: 'Locked', description: 'Historic notes and snapshots.' }
    ]
  },
  {
    label: 'Publishing',
    value: 'publishing',
    icon: 'PB',
    children: [
      { label: 'Release notes', value: 'publishing/release-notes', description: 'Prepare the final announcement and stakeholder summary.' },
      { label: 'Distribution', value: 'publishing/distribution', meta: 'Channels', description: 'Choose where the final launch update is shared.' }
    ]
  }
]);
const sidebarUtilityData = JSON.stringify([
  { label: 'Account', value: 'account', status: 'Owner', badge: 'Ariana Singh', avatar: 'AS' },
  { label: 'Settings', value: 'settings', badge: 'Admin', icon: 'ST' }
]);
const treeViewWorkspaceData = JSON.stringify([
  {
    label: 'Workspace',
    value: 'workspace',
    icon: 'WS',
    children: [
      { label: 'Overview', value: 'workspace/overview', meta: 'Home', status: 'Healthy', description: 'Primary launch summary and review state.' },
      {
        label: 'Incidents',
        value: 'workspace/incidents',
        badge: '12',
        description: 'Critical issues, escalations, and resolved follow-ups.',
        children: [
          { label: 'Critical', value: 'workspace/incidents/critical', status: '4 urgent', badge: 'Priority', description: 'Blocking issues still under investigation.', icon: 'CR' },
          { label: 'Resolved', value: 'workspace/incidents/resolved', meta: 'Archive', description: 'Issues closed after the last review cycle.', icon: 'RS' }
        ]
      }
    ]
  },
  {
    label: 'Operations',
    value: 'operations',
    icon: 'OP',
    children: [
      {
        label: 'Hiring',
        value: 'operations/hiring',
        description: 'People coverage for the next release window.',
        children: [
          { label: 'Backend', value: 'operations/hiring/backend', meta: '2 open', description: 'Platform and API support roles.', avatar: 'BE' },
          { label: 'Design', value: 'operations/hiring/design', status: 'Reviewing', description: 'UI system and staging polish support.', avatar: 'DS' }
        ]
      },
      { label: 'Risk register', value: 'operations/risk-register', badge: 'Watch', description: 'Open risks, mitigations, and owner summaries.', icon: 'RK' }
    ]
  }
]);
const pickerTreeItems =
  'Workspace/Strategy;Workspace/Delivery;Automation/Alerts;Automation/Archive|disabled;Automation/Playbooks';
const stepperItems =
  'Discovery|search|Audit the current interface;Build|bolt|Ship the analysis workspace;Review|check|Validate interactions and polish';
const structuredSelectionItems = JSON.stringify([
  { group: 'Workspace', label: 'Primary owner', value: 'owner', description: 'Final approval and sign-off', meta: 'Ariana Singh', badge: 'Owner', avatar: 'AS', status: 'Live', keywords: ['owner', 'approval'] },
  { group: 'Workspace', label: 'Review lead', value: 'review', description: 'Coordinates QA and design review', meta: 'Mira Chen', badge: 'Review', avatar: 'MC', status: 'Ready', keywords: ['qa', 'review'] },
  { group: 'Automation', label: 'Policy watcher', value: 'watcher', description: 'Monitors anomaly rules after launch', meta: 'Noah Patel', badge: 'Async', avatar: 'NP', status: 'Monitoring', keywords: ['alerts', 'watcher'] },
  { group: 'Automation', label: 'Archive access', value: 'archive', description: 'Historic records are locked for editing', meta: 'Restricted', badge: 'Locked', disabled: true, avatar: 'AR', status: 'Read only', keywords: ['archive'] }
]);
const lookupDirectoryItems = JSON.stringify([
  { group: 'People', label: 'Ariana Singh', value: 'ariana', description: 'Design systems lead for the release board', meta: 'Design systems', badge: 'Primary', avatar: 'AS', status: 'Available', keywords: ['design', 'systems'] },
  { group: 'People', label: 'Noah Patel', value: 'noah', description: 'Runtime engineer covering staging and docs', meta: 'Platform', badge: 'On call', avatar: 'NP', status: 'Online', keywords: ['platform', 'runtime'] },
  { group: 'Teams', label: 'Compliance desk', value: 'compliance', description: 'Escalates policy and legal sign-off', meta: 'Shared queue', badge: 'Queue', avatar: 'CD', status: 'Shared', keywords: ['policy', 'legal'] }
]);
const commandMenuItems = JSON.stringify([
  { group: 'Share', label: 'Send review summary', value: 'share', description: 'Post the current workspace summary to stakeholders', meta: 'Cmd+K', badge: 'Primary', shortcut: 'S', status: 'Live' },
  { group: 'Review', label: 'Request approval', value: 'approve', description: 'Notify approvers with the attached checklist', meta: 'Cmd+Enter', badge: 'Async', shortcut: 'A', status: 'Pending' },
  { group: 'Danger', label: 'Archive draft', value: 'archive', description: 'Move this draft out of the live queue', tone: 'danger', badge: 'Final', shortcut: 'D', status: 'Irreversible' }
]);
const datePresetItems = JSON.stringify([
  { label: 'Today', value: '2026-06-18' },
  { label: 'Board review', value: '2026-06-24' },
  { label: 'Release lock', value: '2026-06-30' }
]);
const dateRangePresetItems = JSON.stringify([
  { label: 'Last 7 days', start: '2026-06-01', end: '2026-06-07' },
  { label: 'Current sprint', start: '2026-06-08', end: '2026-06-21' },
  { label: 'Quarter close', start: '2026-06-22', end: '2026-06-30' }
]);
const uploaderSeedItems = JSON.stringify([
  { name: 'review-summary.pdf', size: '1.2 MB', progress: 100, status: 'uploaded', message: 'Uploaded and attached to the release note.' },
  { name: 'qa-checklist.png', size: '482 KB', progress: 72, status: 'uploading', message: 'Still transferring the latest markup snapshot.' },
  { name: 'broken-export.zip', size: '3.4 MB', progress: 0, status: 'error', message: 'Transfer failed. Retry after the archive is rebuilt.' }
]);
const primaryActionData = JSON.stringify({
  id: 'publish',
  label: 'Publish release',
  value: 'publish',
  badge: 'Live',
  shortcut: 'Cmd+Enter',
  meta: 'Staging synced',
  icon: '↗'
});
const iconActionData = JSON.stringify({
  id: 'share',
  label: 'Share summary',
  value: 'share',
  badge: '3',
  icon: '↗'
});
const actionButtonItems = JSON.stringify([
  { group: 'Share', label: 'Send summary', value: 'share', badge: 'Primary', shortcut: 'S', description: 'Post the current release summary to stakeholders.' },
  { group: 'Review', label: 'Request approval', value: 'approve', meta: 'Async', status: 'Pending', shortcut: 'A', description: 'Notify approvers with the current checklist.' },
  { group: 'Danger', label: 'Archive draft', value: 'archive', destructive: true, description: 'Move this draft out of the live queue.' }
]);
const fabPrimaryActionData = JSON.stringify({
  id: 'compose',
  label: 'Compose',
  value: 'compose',
  badge: 'Live',
  icon: '+'
});
const fabActionItems = JSON.stringify([
  { label: 'Email', value: 'email', status: 'Live', description: 'Open the email composer for the current release thread.' },
  { label: 'Message', value: 'message', badge: 'Async', description: 'Send a quick chat ping to the review team.' },
  { label: 'Archive draft', value: 'archive', destructive: true, description: 'Move this draft out of the active queue.' }
]);
const appStoreActionData = JSON.stringify({
  id: 'ios',
  label: 'Download the iOS app',
  value: 'ios',
  badge: 'Live',
  meta: 'Version 4.8',
  icon: 'iOS'
});
const socialActionData = JSON.stringify({
  id: 'discord',
  label: 'Join the review channel',
  value: 'discord',
  badge: '1.2k',
  meta: 'Reply in minutes',
  icon: 'DC'
});
const comboboxDirectoryItems = JSON.stringify([
  { group: 'Leadership', label: 'Ariana Singh', value: 'ariana', description: 'Design systems lead covering parity and polish.', meta: 'Board review', badge: 'Primary', avatar: 'AS', status: 'Ready' },
  { group: 'Leadership', label: 'Mira Chen', value: 'mira', description: 'Coordinates the review checklist and staging sign-off.', meta: 'Review owner', badge: 'Async', avatar: 'MC', status: 'Pending' },
  { group: 'Engineering', label: 'Kevin Carter', value: 'kevin', description: 'Runtime engineer handling staging and release automation.', meta: 'Platform', avatar: 'KC', status: 'On call' },
  { group: 'Engineering', label: 'Victor Norris', value: 'victor', description: 'Infrastructure contact for final deploy readiness.', meta: 'Infra', avatar: 'VN', status: 'Standby' }
]);
const autocompleteDirectoryItems = JSON.stringify([
  { group: 'Workspace', label: 'Signal review', value: 'signal-review', description: 'Board-facing summary used for the final release checkpoint.', meta: 'Primary brief', badge: 'Ready', icon: 'SR', status: 'Pinned' },
  { group: 'Workspace', label: 'Security audit', value: 'security-audit', description: 'Detailed audit notes with linked remediation work.', meta: 'Risk desk', badge: 'Review', icon: 'SA', status: 'In progress' },
  { group: 'Automation', label: 'Quarterly memo', value: 'quarterly-memo', description: 'Generated operational memo enriched with watchlist insights.', meta: 'Automation', badge: 'Async', icon: 'QM', status: 'Draft' },
  { group: 'Automation', label: 'Launch retrospective', value: 'launch-retro', description: 'Historic summary kept for post-release analysis.', meta: 'Archive', badge: 'Locked', icon: 'LR', status: 'Read only' }
]);
const verificationCodeDeliveryHints = JSON.stringify([
  { label: 'SMS message', description: 'Fastest path for time-sensitive approvals.', meta: 'Preferred', tone: 'success' },
  { label: 'Email backup', description: 'Use this when SMS delivery is delayed.', meta: 'Fallback', tone: 'neutral' },
  { label: 'Trusted device', description: 'Push verification is enabled on your current device.', meta: 'Secure', tone: 'success' }
]);
const buttonGroupItems = JSON.stringify([
  { label: 'Overview', value: 'overview', description: 'Track launch status, parity, and open blockers.', badge: 'Live', icon: '◉' },
  { label: 'Review', value: 'review', description: 'Compare generic and dark previews before sign-off.', badge: 'QA', icon: '✓' },
  { label: 'Publish', value: 'publish', description: 'Prepare the final rollout checklist and release note.', badge: 'Next', icon: '↗' }
]);

const sliderMarkers = JSON.stringify([
  { value: 0, label: 'Low' },
  { value: 50, label: 'Medium', emphasis: true },
  { value: 100, label: 'High', tone: 'success' }
]);
const rangeSliderPresets = JSON.stringify([
  { label: 'Last 7 days', start: 10, end: 45, meta: 'Fresh' },
  { label: 'Last 30 days', start: 20, end: 80, meta: 'Primary', tone: 'success' },
  { label: 'Quarterly', start: 35, end: 90, meta: 'Wide' }
]);
const rangeSelectorPresets = JSON.stringify([
  { label: 'Starter', start: 20, end: 120, meta: 'Narrow', tone: 'neutral' },
  { label: 'Growth', start: 40, end: 240, meta: 'Recommended', tone: 'success', selected: true },
  { label: 'Enterprise', start: 120, end: 360, meta: 'Wide', tone: 'warning' }
]);
const rangeSelectorDistributionData = JSON.stringify([
  { value: 0, count: 12, tone: 'neutral' },
  { value: 60, count: 28, tone: 'neutral' },
  { value: 120, count: 54, tone: 'success' },
  { value: 180, count: 84, tone: 'success' },
  { value: 240, count: 72, tone: 'success' },
  { value: 300, count: 42, tone: 'warning' },
  { value: 360, count: 24, tone: 'neutral' },
  { value: 420, count: 14, tone: 'neutral' }
]);
const rangeSelectorSummaryData = JSON.stringify([
  { label: 'Range', value: '$40 - $240', meta: 'Recommended', tone: 'success' },
  { label: 'Results', value: '240 matches', meta: 'Across staging inventory', tone: 'neutral' },
  { label: 'Span', value: '$200', meta: 'Balanced coverage', tone: 'neutral' }
]);
const speechLanguageOptions = JSON.stringify([
  { value: 'en-US', label: 'English (US)', meta: 'Primary review language' },
  { value: 'en-GB', label: 'English (UK)', meta: 'Regional fallback' },
  { value: 'hi-IN', label: 'Hindi', meta: 'Support channel' }
]);
const speechTranscriptEntries = JSON.stringify([
  { time: '00:02', speaker: 'Alex', text: 'Start the release readiness summary with the accessibility checks.', final: true },
  { time: '00:08', speaker: 'Alex', text: 'Dark mode and generic themes now match the latest mock direction.', final: true },
  { time: '00:13', speaker: 'System', text: 'Capturing final notes for the staging review.', final: false }
]);
const speechUseCases = JSON.stringify([
  { title: 'Release notes', description: 'Capture spoken updates and turn them into launch-ready summaries.', meta: 'Product ops', tone: 'success' },
  { title: 'Interview capture', description: 'Transcribe stakeholder sessions before the notes are cleaned up.', meta: 'Research', tone: 'neutral' },
  { title: 'Accessibility', description: 'Keep text entry available for hands-free drafting and review.', meta: 'Inclusive', tone: 'neutral' }
]);
const speechShortcutHints = JSON.stringify([
  { label: 'Start / Stop', value: 'Ctrl Shift Space' },
  { label: 'Clear transcript', value: 'Ctrl L' },
  { label: 'Switch language', value: 'Alt L' }
]);
const calendarEvents = JSON.stringify([
  { date: '2026-06-12', label: 'Design review', startTime: '11:30 AM', endTime: '12:30 PM', tone: 'warning', meta: 'Board room' },
  { date: '2026-06-12', label: 'Focus time', startTime: '3:00 PM', endTime: '4:30 PM', tone: 'success', meta: 'No interruptions' },
  { date: '2026-06-13', label: 'Release planning', startTime: '4:00 PM', endTime: '5:00 PM', tone: 'neutral', meta: 'Online' },
  { date: '2026-06-16', label: 'Sprint planning', startTime: '9:30 AM', tone: 'neutral', meta: 'Workspace sync' },
  { date: '2026-06-18', label: 'QA review', startTime: '11:00 AM', tone: 'danger', meta: 'Issue triage' }
]);
const calendarPresets = JSON.stringify([
  { label: 'Today', start: '2026-06-13' },
  { label: 'This week', start: '2026-06-09', end: '2026-06-15', meta: 'Primary', tone: 'success' },
  { label: 'Next week', start: '2026-06-16', end: '2026-06-22', meta: 'Forward look' }
]);
const colorBoxPresets = JSON.stringify([
  { label: 'Forest 600', value: '#1c7a5b', meta: 'Primary', tone: 'success' },
  { label: 'Forest 500', value: '#2a9d6b', meta: 'Hover' },
  { label: 'Ocean 600', value: '#2563eb', meta: 'Secondary' },
  { label: 'Sand 400', value: '#f59e0b', meta: 'Accent', tone: 'warning' },
  { label: 'Rose 500', value: '#ef4444', meta: 'Warning', tone: 'danger' }
]);
const colorBoxTokens = JSON.stringify([
  { label: 'Forest 600', value: '#1c7a5b', meta: 'Primary', tone: 'success' },
  { label: 'Forest 500', value: '#2a9d6b', meta: 'Hover' },
  { label: 'Forest 100', value: '#d1fae5', meta: 'Subtle' },
  { label: 'Ocean 600', value: '#2563eb', meta: 'Secondary' },
  { label: 'Sand 400', value: '#f59e0b', meta: 'Accent', tone: 'warning' }
]);
const colorBoxRecent = JSON.stringify([
  { label: 'Forest 600', value: '#1c7a5b' },
  { label: 'Forest 500', value: '#2a9d6b' },
  { label: 'Ocean 600', value: '#2563eb' },
  { label: 'Violet 500', value: '#7c3aed' },
  { label: 'Coral 500', value: '#f97316' }
]);
const dropDownBoxExplorerItems = JSON.stringify([
  {
    label: 'Data Warehouses',
    value: 'warehouses',
    description: 'Curated analytics and operational datasets',
    quickFilters: ['recent', 'favorite'],
    children: [
      {
        label: 'Production',
        value: 'warehouses/production',
        description: 'Live production environments',
        quickFilters: ['recent', 'accessible'],
        children: [
          {
            label: 'Analytics',
            value: 'warehouses/production/analytics',
            title: 'Analytics Warehouse',
            description: 'Curated analytics datasets optimized for dashboards and machine learning workloads.',
            meta: 'Recommended',
            status: 'Live',
            badge: 'AA',
            quickFilters: ['recent', 'accessible', 'favorite']
          },
          {
            label: 'Reporting',
            value: 'warehouses/production/reporting',
            description: 'Operational reports and metrics',
            meta: 'Shared',
            status: 'Ready',
            quickFilters: ['recent']
          }
        ]
      },
      {
        label: 'Staging',
        value: 'warehouses/staging',
        description: 'Pre-production validation',
        quickFilters: ['recent'],
        children: [
          {
            label: 'Analytics Sandbox',
            value: 'warehouses/staging/sandbox',
            description: 'Testing workspace for draft dashboards',
            meta: 'Sandbox',
            status: 'Preview'
          }
        ]
      }
    ]
  },
  {
    label: 'APIs & Services',
    value: 'apis',
    description: 'External APIs and data services',
    quickFilters: ['favorite'],
    children: [
      {
        label: 'Stripe',
        value: 'apis/stripe',
        description: 'Billing and payment events',
        meta: 'Finance',
        status: 'Connected'
      }
    ]
  }
]);
const dropDownBoxQuickFilters = JSON.stringify([
  { label: 'Recent', value: 'recent', badge: '4' },
  { label: 'Favorite', value: 'favorite', badge: '2' },
  { label: 'Accessible', value: 'accessible', badge: 'AA', tone: 'success' }
]);
const gradientPickerPresets = JSON.stringify([
  {
    id: 'sunrise-blend',
    label: 'Sunrise blend',
    description: 'Warm hero gradient for launches and campaigns.',
    meta: 'Hero',
    badge: 'Featured',
    status: 'Ready',
    featured: true,
    type: 'linear',
    angle: 135,
    opacity: 100,
    stops: [
      { label: 'Dawn', color: '#ffd166', position: 0 },
      { label: 'Amber', color: '#ff7a00', position: 32 },
      { label: 'Bloom', color: '#ff4d9d', position: 68 },
      { label: 'Orbit', color: '#6a5cff', position: 100 }
    ]
  },
  {
    id: 'ocean-depth',
    label: 'Ocean depth',
    description: 'Cool analytics and product storytelling surfaces.',
    meta: 'Data',
    status: 'Live',
    type: 'radial',
    angle: 180,
    opacity: 94,
    stops: [
      { label: 'Mist', color: '#67e8f9', position: 0 },
      { label: 'Current', color: '#0ea5e9', position: 35 },
      { label: 'Drift', color: '#2563eb', position: 72 },
      { label: 'Trench', color: '#1e3a8a', position: 100 }
    ]
  },
  {
    id: 'forest-mist',
    label: 'Forest mist',
    description: 'Editorial and sustainability storytelling gradients.',
    meta: 'Editorial',
    status: 'Draft',
    type: 'angular',
    angle: 220,
    opacity: 88,
    stops: [
      { label: 'Leaf', color: '#bef264', position: 0 },
      { label: 'Canopy', color: '#22c55e', position: 36 },
      { label: 'Lagoon', color: '#14b8a6', position: 70 },
      { label: 'Depth', color: '#0f766e', position: 100 }
    ]
  }
]);
const gradientPickerStops = JSON.stringify([
  { label: 'Dawn', color: '#ffd166', position: 0 },
  { label: 'Amber', color: '#ff7a00', position: 32 },
  { label: 'Bloom', color: '#ff4d9d', position: 68 },
  { label: 'Orbit', color: '#6a5cff', position: 100 }
]);
const imagePickerAssets = JSON.stringify([
  {
    id: 'hero-image',
    label: 'hero-image.jpg',
    description: 'Warm lounge photography for the launch hero.',
    status: 'Approved',
    usage: 'Hero image',
    credit: 'Photo by Eon Studio',
    tags: ['interior', 'lifestyle'],
    width: 1920,
    height: 1080,
    size: '1.2 MB',
    updatedText: '2 min ago',
    palette: ['#f7e8d4', '#d8a36d', '#8a6c47'],
    featured: true
  },
  {
    id: 'product-shot',
    label: 'product-shot.jpg',
    description: 'Studio product still for commerce and launch cards.',
    status: 'Approved',
    usage: 'Product tile',
    width: 1920,
    height: 1280,
    size: '6.2 MB',
    palette: ['#f7efe6', '#d2b48c', '#9a7b5f']
  },
  {
    id: 'team-photo',
    label: 'team-photo.png',
    description: 'Editorial team photography for about and press pages.',
    status: 'Pending',
    usage: 'Team section',
    width: 1600,
    height: 1067,
    size: '3.1 MB',
    palette: ['#dceef6', '#6b9fb3', '#365164']
  },
  {
    id: 'office-space',
    label: 'office-space.jpg',
    description: 'Interior photography for workspace campaign modules.',
    status: 'Approved',
    usage: 'Campaign card',
    width: 1920,
    height: 1080,
    size: '2.4 MB',
    palette: ['#e8e3dc', '#8b7d73', '#574942']
  },
  {
    id: 'texture-bg',
    label: 'texture-bg.jpg',
    description: 'Soft paper texture for editorial backgrounds.',
    status: 'Approved',
    usage: 'Background texture',
    width: 2048,
    height: 1365,
    size: '1.1 MB',
    palette: ['#f5f0e8', '#d9d0c4', '#94897b']
  }
]);
const imagePickerUploadQueue = JSON.stringify([
  { label: 'product-shot.jpg', size: '6.2 MB', progress: 72, status: 'uploading' },
  { label: 'team-photo.png', size: '3.1 MB', progress: 40, status: 'uploading' }
]);
const imagePickerValidation = JSON.stringify([
  { label: 'Alt text looks good', message: '48 / 125', tone: 'success' },
  { label: 'Alt text is required', message: 'Enter alt text for accessibility.', tone: 'danger' },
  { label: 'File type supported', message: 'Use JPG, PNG, or GIF.', tone: 'warning' }
]);
const imagePickerQuickInsert = JSON.stringify([
  { label: 'Upload', description: 'Browse and upload files' },
  { label: 'Choose from library', description: 'Select existing assets' },
  { label: 'Use link', description: 'Insert image from URL' }
]);
const imagePickerActions = JSON.stringify([
  { label: 'Replace image', description: 'Swap the selected asset with a new file' },
  { label: 'Edit image', description: 'Open crop and optimization tools' },
  { label: 'Download', description: 'Export the original asset' },
  { label: 'Delete image', description: 'Remove the asset from the library', tone: 'danger', destructive: true }
]);
const imagePickerFilters = JSON.stringify(['All assets', 'Approved', 'Pending', 'Recent']);
const filterBarFilters = JSON.stringify([
  { label: 'Region', value: 'region', meta: 'Asia Pacific', selected: true },
  { label: 'Product category', value: 'analytics', meta: 'Analytics', selected: true },
  { label: 'Status', value: 'active', meta: 'Active', selected: true, tone: 'success' },
  { label: 'Owner', value: 'olivia-rhye', meta: 'Olivia Rhye, +2', selected: true }
]);
const filterBarGroups = JSON.stringify([
  {
    label: 'Region',
    options: [
      { label: 'North America', value: 'north-america', count: '248K' },
      { label: 'Europe', value: 'europe', count: '312K' },
      { label: 'Asia Pacific', value: 'asia-pacific', count: '456K', selected: true, tone: 'success' }
    ]
  },
  {
    label: 'Product category',
    options: [
      { label: 'Analytics', value: 'analytics', count: '512K', selected: true },
      { label: 'Infrastructure', value: 'infrastructure', count: '238K' },
      { label: 'Security', value: 'security', count: '192K' }
    ]
  },
  {
    label: 'Status',
    options: [
      { label: 'Active', value: 'active', count: '832K', selected: true, tone: 'success' },
      { label: 'Pending', value: 'pending', count: '96K', tone: 'warning' },
      { label: 'Archived', value: 'archived', count: '64K' }
    ]
  },
  {
    label: 'Owner',
    options: [
      { label: 'Olivia Rhye', value: 'olivia-rhye', count: '+2', selected: true },
      { label: 'Phoenix Baker', value: 'phoenix-baker' },
      { label: 'Demi Wilkinson', value: 'demi-wilkinson' }
    ]
  }
]);
const filterBarPresets = JSON.stringify(['Today', 'Last 7 days', 'This month', 'Last quarter']);
const filterBarOverflowActions = JSON.stringify([
  { label: 'Copy link to this view', description: 'Share the current configuration' },
  { label: 'Save changes', description: 'Overwrite the current view' },
  { label: 'Share view', description: 'Invite collaborators' },
  { label: 'Export results', description: 'Download the filtered result set' },
  { label: 'Clear all filters', description: 'Reset the workspace', tone: 'danger', destructive: true }
]);
const filterBarSortOptions = JSON.stringify(['Newest', 'Oldest', 'Most used']);
const htmlEditorHeaderStats = JSON.stringify([
  { label: 'Mode', value: 'Write' },
  { label: 'Status', value: 'Autosaved', tone: 'success' },
  { label: 'Last saved', value: '2 min ago' }
]);
const htmlEditorBlocks = JSON.stringify([
  { category: 'Text', label: 'Heading', description: 'Introduce a new section.', icon: 'H' },
  { category: 'Text', label: 'Quote', description: 'Add a quote block.', icon: 'Q' },
  { category: 'Text', label: 'Paragraph', description: 'Write body copy.', icon: 'P' },
  { category: 'Media', label: 'Image', description: 'Upload or insert an image.', icon: 'IMG' },
  { category: 'Media', label: 'Video', description: 'Embed a hosted video.', icon: 'VID' },
  { category: 'Media', label: 'Divider', description: 'Separate content sections.', icon: 'DV' }
]);
const htmlEditorInspector = JSON.stringify([
  {
    title: 'Block settings',
    description: 'Heading',
    fields: [
      { label: 'Level', value: 'H1', options: ['H1', 'H2', 'H3', 'H4'] },
      { label: 'Font', value: 'DM Serif Display' },
      { label: 'Size', value: '48 px' },
      { label: 'Weight', value: 'Bold' },
      { label: 'Line height', value: '1.2' }
    ]
  },
  {
    title: 'Publish profile',
    description: 'Current rules',
    fields: [
      { label: 'Sanitize', value: 'Enabled' },
      { label: 'Schema', value: 'Headings, paragraphs, media' },
      { label: 'Sync mode', value: 'Markdown' }
    ]
  }
]);
const htmlEditorComments = JSON.stringify([
  { author: 'Alex Morgan', time: '2m ago', text: 'Can we link to the research here?', reply: 'Reply' },
  { author: 'You', time: 'just now', text: 'Added link to the research notes.' }
]);
const htmlEditorValidation = JSON.stringify([
  { label: 'Missing heading', status: 'pass', detail: 'A visible heading is already present.' },
  { label: 'Add alt text to images', status: 'warning', detail: 'One image still needs descriptive alt text.' },
  { label: 'No empty blocks', status: 'pass', detail: 'The current content passes the empty-block check.' }
]);
const htmlEditorPublishSteps = JSON.stringify([
  { label: 'Review content', value: 'All good to publish.', status: 'complete' },
  { label: 'Set visibility', value: 'Public', status: 'pending' },
  { label: 'Publish', value: 'Ready when checks pass.', status: 'pending' }
]);
const htmlEditorOutline = JSON.stringify([
  { level: 1, label: 'Design systems, done right', kind: 'h1' },
  { level: 2, label: 'Consistency is not about uniformity.', kind: 'blockquote' },
  { level: 2, label: 'Core principles', kind: 'h2' }
]);
const htmlEditorShortcuts = JSON.stringify([
  { label: 'Bold', value: 'Ctrl B' },
  { label: 'Italic', value: 'Ctrl I' },
  { label: 'Preview', value: 'Ctrl Shift P' },
  { label: 'Heading', value: 'Ctrl Alt 1' }
]);

const customExamples = {
  'eon-button': [
    {
      key: 'button-modernized-actions',
      source: 'generated',
      title: 'Structured publish CTA',
      code: `
        <eon-button tone="brand" variant="gradient" action-data='${primaryActionData}'>
          <span slot="start">↗</span>
          Publish release
        </eon-button>
      `,
    },
  ],
  'eon-button-group': [
    {
      key: 'button-group-modernized-actions',
      source: 'generated',
      title: 'Segmented release stages',
      code: `
        <eon-button-group
          label="Release stages"
          items-data='${buttonGroupItems}'
          value="overview,review"
          selection-mode="multiple"
          help-text="Keep both overview and review active while the final checks are still open."
        ></eon-button-group>
      `,
    },
  ],
  'eon-breadcrumb': [
    {
      key: 'breadcrumb-modernized-navigation',
      source: 'generated',
      title: 'Docked release breadcrumb',
      code: `
        <eon-breadcrumb
          items-data='${breadcrumbTrailData}'
          value="workspace/releases/june-launch"
          variant="dashboard"
          density="compact"
        >
          <div slot="header" style="display:grid;gap:0.3rem">
            <strong style="margin:0">Release path</strong>
            <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Keep the current launch context visible while moving through staging checks.</span>
          </div>
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Current stage: final review before publish.</div>
        </eon-breadcrumb>
      `,
    },
  ],
  'eon-menu': [
    {
      key: 'menu-modernized-navigation',
      source: 'generated',
      title: 'Structured navigation board',
      code: `
        <eon-menu
          items-data='${navigationMenuData}'
          orientation="vertical"
          value="workspace/overview"
          variant="dashboard"
          search-enabled
          show-descriptions
          show-meta
          show-badges
          show-status
          show-shortcuts
          show-icons
        >
          <div slot="header" style="display:grid;gap:0.28rem">
            <strong style="margin:0">Workspace map</strong>
            <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">A mock-driven navigation shell with metadata rails, badges, and nested release commands.</span>
          </div>
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Tip: search narrows both top-level rails and nested commands.</div>
        </eon-menu>
      `,
    },
  ],
    'eon-context-menu': [
      {
        key: 'context-menu-modernized-navigation',
        source: 'generated',
      title: 'Contextual action board',
      code: `
        <eon-context-menu
          items-data='${contextMenuActionData}'
          show-on="click"
          variant="card-row"
          search-enabled
          show-descriptions
          show-meta
          show-badges
          show-status
          show-shortcuts
          show-icons
        >
          <div slot="header" style="display:grid;gap:0.28rem">
            <strong style="margin:0">Review actions</strong>
            <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Context actions can now surface badges, keyboard hints, and nested review paths.</span>
          </div>
          <div style="padding:1rem;border:1px dashed rgba(125,125,125,.35);border-radius:1rem;background:rgba(255,255,255,0.5);">Click this card to open the mock-driven context menu.</div>
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Use right click in real flows, click in staging for easier inspection.</div>
        </eon-context-menu>
        `,
      },
    ],
    'eon-action-sheet': [
      {
        key: 'action-sheet-modernized-overlay',
        source: 'generated',
        title: 'Structured review action sheet',
        code: `
          <eon-action-sheet
            open
            heading="Release actions"
            description="Choose the next step for this staged review."
            presentation="floating"
            variant="glassy"
            items-data='${actionSheetOverlayData}'
            show-meta
            show-badges
            show-status
            show-shortcuts
          >
            <eon-toolbar slot="actions" aria-label="Action sheet header actions">
              <eon-button size="sm" variant="ghost">Sync</eon-button>
              <eon-button size="sm" variant="ghost">Preview</eon-button>
            </eon-toolbar>
            <div style="padding:0.9rem 1rem;border:1px solid rgba(148,163,184,0.18);border-radius:1rem;background:rgba(248,250,252,0.72);display:grid;gap:0.35rem;">
              <strong style="margin:0">Workspace context</strong>
              <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Use the shell slot before the command list when the mock wants context, metrics, or async guidance inside the overlay.</span>
            </div>
            <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Selection stays structured with badges, status, metadata, and shortcuts.</div>
          </eon-action-sheet>
        `,
      },
    ],
    'eon-icon-button': [
      {
        key: 'icon-button-modernized-actions',
        source: 'generated',
      title: 'Badge-bearing icon action',
      code: `
        <eon-icon-button
          label="Share summary"
          variant="soft"
          action-data='${iconActionData}'
        ></eon-icon-button>
        `,
      },
    ],
    'eon-popup': [
      {
        key: 'popup-modernized-overlay',
        source: 'generated',
        title: 'Editorial summary popup',
        code: `
          <eon-popup
            open
            heading="Workspace summary"
            eyebrow="Release review"
            status="Live"
            description="Keep the popup structured when the content includes both narrative context and action rails."
            variant="glassy"
            dismiss-behavior="button"
            actions-data='${popupFooterActionData}'
            sticky-footer
          >
            <eon-toolbar slot="actions" aria-label="Popup header actions">
              <eon-button size="sm" variant="ghost">Pin</eon-button>
              <eon-button size="sm" variant="ghost">Export</eon-button>
            </eon-toolbar>
            <span slot="subtitle">652 Avonwick Gate</span>
            <div style="display:grid;gap:0.9rem">
              <div style="padding:1rem;border:1px solid rgba(148,163,184,0.18);border-radius:1rem;background:rgba(255,255,255,0.75);display:grid;gap:0.35rem;">
                <strong style="margin:0">Readiness score</strong>
                <span style="font-size:0.92rem;color:var(--eon-semantic-text-secondary, #475569);">94% complete across parity, tests, and modernized staging stories.</span>
              </div>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(10rem,1fr));gap:0.75rem">
                <div style="padding:0.9rem;border-radius:0.95rem;background:rgba(59,130,246,0.08);">3 approvals waiting</div>
                <div style="padding:0.9rem;border-radius:0.95rem;background:rgba(16,185,129,0.1);">12 checks green</div>
              </div>
            </div>
          </eon-popup>
        `,
      },
    ],
    'eon-combobox': [
      {
        key: 'combobox-modernized-form',
        source: 'generated',
      title: 'Structured owner combobox',
      code: `
        <eon-combobox
          label="Escalation owner"
          placeholder="Select or type an owner"
          options-data='${comboboxDirectoryItems}'
          value="kevin"
          show-clear-button
          search-mode="startsWith"
          success
          success-text="Ready for the release handoff."
        >
          <span slot="prefix">AI</span>
          <span slot="help">Type to filter by name, group, or metadata while keeping grouped context visible.</span>
        </eon-combobox>
      `,
    },
  ],
  'eon-autocomplete': [
    {
      key: 'autocomplete-modernized-form',
      source: 'generated',
      title: 'Structured search console',
      code: `
        <eon-autocomplete
          label="Saved search"
          placeholder="Type to search saved briefings"
          suggestions-data='${autocompleteDirectoryItems}'
          search-expr="label,meta"
          show-clear-button
          opened
          success
          success-text="Ready to reuse in the current workspace."
        >
          <span slot="prefix">AI</span>
          <span slot="help">Filter by title, group, or metadata without losing the grouped search context.</span>
          <eon-toolbar slot="footer" aria-label="Autocomplete footer actions">
            <eon-button variant="outline" size="sm">Create search</eon-button>
            <eon-button size="sm">Open saved brief</eon-button>
          </eon-toolbar>
        </eon-autocomplete>
        `,
      },
    ],
    'eon-load-panel': [
      {
        key: 'load-panel-modernized-overlay',
        source: 'generated',
        title: 'Structured sync load panel',
        code: `
          <eon-load-panel
            visible
            heading="Publishing release"
            message="Syncing staged assets and review metadata"
            description="The panel now supports structured tasks, richer actions, and completion-ready states."
            status="3 tasks left"
            state="loading"
            variant="banner"
            progress-value="72"
            show-cancel-button
            show-dismiss-button
            tasks-data='${loadPanelTaskData}'
            actions-data='${loadPanelActionData}'
          >
            <div slot="actions" style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Auto-dismiss can stay disabled while the user still needs the progress context.</div>
            <div slot="footer">The banner variant keeps long-running work visible without dropping the task list.</div>
          </eon-load-panel>
        `,
      },
    ],
    'eon-tag-box': [
      {
        key: 'tag-box-modernized-form',
        source: 'generated',
      title: 'Structured watchlist tagging workspace',
      code: `
        <eon-tag-box
          label="Watchlist tags"
          items-data='${structuredSelectionItems}'
          value="owner,review"
          status-text="2 selected"
          status-tone="success"
          help-text="Search by team, role, or urgency before applying."
          success-text="Selections are ready for the release handoff."
          search-enabled
          accept-custom-value
          apply-value-mode="useButtons"
          show-clear-button
          show-drop-down-button
          show-selection-controls
          variant="outlined"
          size="lg"
          opened
        >
          <span slot="prefix">AI</span>
          <eon-toolbar slot="actions" aria-label="Tag box header actions">
            <eon-button size="sm" variant="ghost">Sync</eon-button>
            <eon-button size="sm" variant="ghost">Rules</eon-button>
          </eon-toolbar>
          <span slot="help">Use the structured dataset to keep metadata, status, and selection scale visible while you search.</span>
          <eon-toolbar slot="footer" aria-label="Tag box footer actions">
            <eon-button size="sm" variant="outline">Create rule</eon-button>
            <eon-button size="sm">Apply tags</eon-button>
          </eon-toolbar>
        </eon-tag-box>
      `,
    },
  ],
  'eon-verification-code-input': [
    {
      key: 'verification-code-input-modernized-form',
      source: 'generated',
      title: 'Trusted-device verification workspace',
      code: `
        <eon-verification-code-input
          label="Confirm secure action"
          description="Enter the code before publishing the staged release."
          caption="We sent a 6-digit code to &bull;&bull;&bull;&bull;&bull;&bull;34"
          value="483921"
          length="6"
          status-text="Trusted device"
          status-tone="success"
          success
          success-text="Identity confirmed. You can continue."
          delivery-hints-data='${verificationCodeDeliveryHints}'
          variant="outlined"
          size="lg"
        >
          <eon-toolbar slot="actions" aria-label="Verification header actions">
            <eon-button size="sm" variant="ghost">Change method</eon-button>
          </eon-toolbar>
          <span slot="help">Paste the code or type each digit. Resend unlocks automatically when the timer reaches zero.</span>
          <div slot="delivery" style="padding-top:0.25rem;color:var(--eon-semantic-text-secondary, #475569);font-size:0.9rem;">
            Need help? Try the email backup path before requesting a new code.
          </div>
          <eon-toolbar slot="footer" aria-label="Verification footer actions">
            <eon-button size="sm" variant="outline">Use another method</eon-button>
          </eon-toolbar>
        </eon-verification-code-input>
      `,
    },
  ],
  'eon-html-editor': [
    {
      key: 'html-editor-editorial-workspace',
      source: 'generated',
      title: 'Editorial publishing workspace',
      code: `
        <eon-html-editor
          label="Release notes editor"
          description="Capture the launch narrative, block settings, and publish checks in one place."
          view-mode="split"
          source-format="markdown"
          toolbar-preset="editorial"
          status-text="Autosaved"
          status-tone="success"
          help-text="Use split preview to review the final layout while you keep editing."
          header-stats-data='${htmlEditorHeaderStats}'
          blocks-data='${htmlEditorBlocks}'
          inspector-data='${htmlEditorInspector}'
          comments-data='${htmlEditorComments}'
          validation-data='${htmlEditorValidation}'
          publish-data='${htmlEditorPublishSteps}'
          outline-data='${htmlEditorOutline}'
          shortcut-hints-data='${htmlEditorShortcuts}'
          variant="outlined"
          size="lg"
        >
          <eon-toolbar slot="actions" aria-label="Html editor header actions">
            <eon-button size="sm" variant="ghost">Share</eon-button>
            <eon-button size="sm" variant="ghost">History</eon-button>
          </eon-toolbar>
          <span slot="help">The editor keeps validation, comments, and publish flow visible while content is still changing.</span>
          <eon-toolbar slot="footer" aria-label="Html editor footer actions">
            <eon-button size="sm" variant="outline">Save draft</eon-button>
            <eon-button size="sm">Publish now</eon-button>
          </eon-toolbar>
        </eon-html-editor>
      `,
    },
  ],
  'eon-textarea': [
    {
      key: 'textarea-longform-workspace',
      source: 'generated',
      title: 'Long-form summary workspace',
      code: `
        <eon-textarea
          label="Write summary"
          value="We have completed the design review and aligned on the final assets. Testing is underway and we are tracking ahead of schedule."
          rows="6"
          status-text="Autosave"
          status-tone="success"
          variant="outlined"
          size="lg"
          show-count
          max-length="1000"
          success
          success-text="Changes are saved automatically."
          auto-resize
          help-text="Press Ctrl + Enter to submit. Press Esc to discard changes."
        >
          <eon-toolbar slot="actions" aria-label="Textarea header actions">
            <eon-button size="sm" variant="ghost">Expand</eon-button>
            <eon-button size="sm" variant="ghost">More</eon-button>
          </eon-toolbar>
          <eon-toolbar slot="footer" aria-label="Textarea formatting toolbar">
            <eon-button size="sm" variant="ghost">Bold</eon-button>
            <eon-button size="sm" variant="ghost">Italic</eon-button>
            <eon-button size="sm" variant="ghost">Quote</eon-button>
            <eon-button size="sm" variant="ghost">Link</eon-button>
          </eon-toolbar>
        </eon-textarea>
      `,
    },
  ],
  'eon-slider': [
    {
      key: 'slider-precision-control',
      source: 'generated',
      title: 'Precision intensity workspace',
      code: `
        <eon-slider
          label="Intensity"
          name="intensity"
          value="72"
          min="0"
          max="100"
          limit-min="20"
          limit-max="90"
          step="2"
          status-text="Precision mode"
          status-tone="success"
          success
          success-text="Value is inside the approved range."
          help-text="Use arrow keys for fine control and Shift plus arrow keys for larger adjustments."
          variant="outlined"
          size="lg"
          value-display="chip"
          show-tooltip
          show-ticks
          tick-interval="10"
          value-suffix="%"
          markers-data='${sliderMarkers}'
        >
          <span slot="prefix">Min 20</span>
          <span slot="suffix">Max 90</span>
          <eon-toolbar slot="actions" aria-label="Slider quick actions">
            <eon-button size="sm" variant="ghost">Reset</eon-button>
            <eon-button size="sm" variant="ghost">Lock</eon-button>
          </eon-toolbar>
          <span slot="footer">Use tighter steps near the threshold when the final review needs precision.</span>
        </eon-slider>
      `,
    },
  ],
  'eon-range-slider': [
    {
      key: 'range-slider-command-bar',
      source: 'generated',
      title: 'Command-bar range workspace',
      code: `
        <eon-range-slider
          label="Coverage range"
          name="coverage"
          start="20"
          end="80"
          min="0"
          max="100"
          limit-min="10"
          limit-max="90"
          step="5"
          status-text="Range active"
          status-tone="success"
          success
          success-text="Range is inside the approved window."
          help-text="Drag either handle or type values directly to refine the range."
          variant="outlined"
          size="lg"
          value-display="inline"
          result-text="60 results"
          show-inputs
          show-tooltips
          show-ticks
          tick-interval="10"
          value-suffix="%"
          markers-data='${sliderMarkers}'
          presets-data='${rangeSliderPresets}'
        >
          <span slot="prefix">From review</span>
          <span slot="suffix">To launch</span>
          <eon-toolbar slot="actions" aria-label="Range slider quick actions">
            <eon-button size="sm" variant="ghost">Apply</eon-button>
            <eon-button size="sm" variant="ghost">More</eon-button>
          </eon-toolbar>
          <span slot="footer">Preset ranges keep the review flow fast while manual handles still allow precise tuning.</span>
        </eon-range-slider>
      `,
    },
  ],
  'eon-range-selector': [
    {
      key: 'range-selector-coverage-workspace',
      source: 'generated',
      title: 'Context-rich range workspace',
      code: `
        <eon-range-selector
          heading="Coverage budget"
          description="Refine the approved spend window while keeping range context, presets, and summary metrics visible."
          start="40"
          end="240"
          min="0"
          max="500"
          step="10"
          format="currency"
          currency="USD"
          result-text="240 matching records"
          status-text="Applied"
          status-tone="success"
          success
          success-text="The recommended budget window is ready for review."
          variant="outlined"
          size="lg"
          show-apply-button
          presets-data='${rangeSelectorPresets}'
          distribution-data='${rangeSelectorDistributionData}'
          summary-data='${rangeSelectorSummaryData}'
        >
          <span slot="prefix">Approved floor</span>
          <span slot="suffix">Target ceiling</span>
          <eon-toolbar slot="actions" aria-label="Range selector actions">
            <eon-button size="sm" variant="ghost">Compare</eon-button>
            <eon-button size="sm" variant="ghost">Export</eon-button>
          </eon-toolbar>
          <eon-toolbar slot="footer" aria-label="Range selector footer actions">
            <eon-button size="sm" variant="outline">Reset</eon-button>
            <eon-button size="sm">Apply range</eon-button>
          </eon-toolbar>
        </eon-range-selector>
      `,
    },
  ],
  'eon-speech-to-text': [
    {
      key: 'speech-to-text-live-session',
      source: 'generated',
      title: 'Live dictation workspace',
      code: `
        <eon-speech-to-text
          label="Release notes dictation"
          description="Capture the spoken staging summary and turn it into structured text."
          value="We have completed the parity review and the modernized examples are ready for sign-off."
          display-mode="button"
          status-text="Live session"
          status-tone="warning"
          preview-state="listening"
          preview-duration="15"
          available-languages-data='${speechLanguageOptions}'
          transcript-entries-data='${speechTranscriptEntries}'
          use-cases-data='${speechUseCases}'
          shortcut-hints-data='${speechShortcutHints}'
          help-text="Keep the microphone live while the final notes are still being collected."
          show-settings-panel
          show-compact-preview
          variant="outlined"
          size="lg"
        >
          <eon-toolbar slot="actions" aria-label="Speech capture actions">
            <eon-button size="sm" variant="ghost">Template</eon-button>
            <eon-button size="sm" variant="ghost">Share</eon-button>
          </eon-toolbar>
          <eon-toolbar slot="footer" aria-label="Speech capture footer actions">
            <eon-button size="sm" variant="outline">Clear draft</eon-button>
            <eon-button size="sm">Insert transcript</eon-button>
          </eon-toolbar>
        </eon-speech-to-text>
      `,
    },
  ],
  'eon-calendar': [
    {
      key: 'calendar-editorial-workspace',
      source: 'generated',
      title: 'Editorial calendar workspace',
      code: `
        <eon-calendar
          label="Review calendar"
          value="2026-06-12,2026-06-13"
          selection-mode="range"
          status-text="Live agenda"
          status-tone="success"
          success
          success-text="Range is valid and ready to share."
          help-text="Choose a range for the review window or jump to a preset."
          locale="en-US"
          time-zone="Asia/Singapore"
          variant="outlined"
          size="lg"
          show-today-button
          show-clear-button
          show-week-numbers
          show-agenda
          events-data='${calendarEvents}'
          presets-data='${calendarPresets}'
        >
          <eon-toolbar slot="actions" aria-label="Calendar header actions">
            <eon-button size="sm" variant="ghost">New event</eon-button>
            <eon-button size="sm" variant="ghost">Share</eon-button>
          </eon-toolbar>
          <span slot="footer">Working hours: 9:00 AM to 6:00 PM. Events outside working hours stay dimmed in agenda review.</span>
        </eon-calendar>
      `,
    },
  ],
  'eon-color-box': [
    {
      key: 'color-box-editorial-workspace',
      source: 'generated',
      title: 'Editorial color workspace',
      code: `
        <eon-color-box
          label="Primary color"
          value="#1c7a5b"
          status-text="Accessible palette"
          status-tone="success"
          success
          success-text="Contrast is ready for production surfaces."
          help-text="Choose a brand color, compare contrast, and keep recent picks reusable."
          variant="outlined"
          size="lg"
          edit-alpha-channel
          show-clear-button
          show-eyedropper-button
          show-preview-panel
          show-contrast-panel
          show-recent-colors
          show-token-chips
          presets-data='${colorBoxPresets}'
          tokens-data='${colorBoxTokens}'
          recent-colors-data='${colorBoxRecent}'
        >
          <span slot="prefix">Brand</span>
          <span slot="suffix">Forest 600</span>
          <eon-toolbar slot="actions" aria-label="Color box header actions">
            <eon-button size="sm" variant="ghost">Save palette</eon-button>
            <eon-button size="sm" variant="ghost">Share tokens</eon-button>
          </eon-toolbar>
          <div>
            Keep HEX, RGB, and HSL visible during review so designers and engineers can confirm the same value model.
          </div>
          <div slot="preview">
            <strong style="display:block;margin-bottom:0.35rem">Suggested usage</strong>
            <span style="display:block;color:var(--eon-semantic-text-secondary, #475569)">Use this tone for primary buttons and focused chart callouts.</span>
          </div>
          <span slot="footer">Token chips help keep the palette aligned with the design system while recent colors keep experimentation fast.</span>
        </eon-color-box>
      `,
    },
  ],
  'eon-drop-down-box': [
    {
      key: 'drop-down-box-rail-workspace',
      source: 'generated',
      title: 'Rail-driven source explorer',
      code: `
        <eon-drop-down-box
          label="Data source"
          value="warehouses/production/analytics"
          status-text="3 levels selected"
          status-tone="success"
          help-text="Choose the source that best fits the current analysis workspace."
          content-type="tree"
          show-clear-button
          search-enabled
          show-quick-filters
          show-preview-panel
          variant="outlined"
          size="lg"
          items-data='${dropDownBoxExplorerItems}'
          quick-filters-data='${dropDownBoxQuickFilters}'
        >
          <span slot="prefix">Catalog</span>
          <span slot="suffix">Recommended</span>
          <eon-toolbar slot="actions" aria-label="Drop-down box actions">
            <eon-button size="sm" variant="ghost">Create source</eon-button>
            <eon-button size="sm" variant="ghost">Compare</eon-button>
          </eon-toolbar>
          <span slot="footer">Use quick filters to narrow sources before opening the final dataset path.</span>
        </eon-drop-down-box>
      `,
    },
  ],
  'eon-filter-bar': [
    {
      key: 'filter-bar-workspace',
      source: 'generated',
      title: 'Structured filter workspace',
      code: `
        <eon-filter-bar
          label="Filter toolbar system"
          description="Search, narrow, and save complex views with structured filters."
          value="region,analytics,active,olivia-rhye"
          search-value="revenue"
          results-text="1.2M results"
          updated-text="Updated 2m ago"
          status-text="Auto-refresh on"
          variant="outlined"
          size="lg"
          filters-data='${filterBarFilters}'
          groups-data='${filterBarGroups}'
          presets-data='${filterBarPresets}'
          sort-options-data='${filterBarSortOptions}'
          overflow-actions-data='${filterBarOverflowActions}'
          show-summary-cards
          show-responsive-preview
          show-footer-actions
          show-apply-button
          help-text="Keep the key filters visible, then use the expanded panel for richer refinement."
        >
          <eon-toolbar slot="actions" aria-label="Filter bar header actions">
            <eon-button size="sm" variant="ghost">Save view</eon-button>
            <eon-button size="sm" variant="ghost">Share</eon-button>
          </eon-toolbar>
          <span slot="summary">Owner: Olivia Rhye, +2</span>
          <span slot="footer">Use the summary cards to review the active date preset, sort order, and overflow actions before applying.</span>
        </eon-filter-bar>
      `,
    },
  ],
  'eon-gradient-picker': [
    {
      key: 'gradient-picker-hero-workspace',
      source: 'generated',
      title: 'Hero gradient workspace',
      code: `
        <eon-gradient-picker
          heading="Hero gradient workspace"
          description="Shape launch-ready gradients with editable stops, reusable presets, and live CSS output."
          label="Saved gradients"
          value="sunrise-blend"
          gradient-type="linear"
          angle="135"
          opacity="100"
          status-text="4 stops synced"
          status-tone="success"
          success
          success-text="Gradient is ready for hero and campaign surfaces."
          help-text="Adjust stops, angle, and opacity while keeping the preset library reusable across themes."
          variant="outlined"
          size="lg"
          show-preset-library
          show-variant-previews
          show-value-sync
          show-apply-button
          show-copy-button
          presets-data='${gradientPickerPresets}'
          stops-data='${gradientPickerStops}'
        >
          <eon-toolbar slot="actions" aria-label="Gradient picker actions">
            <eon-button size="sm" variant="ghost">Save preset</eon-button>
            <eon-button size="sm" variant="ghost">Share tokens</eon-button>
          </eon-toolbar>
          <div>
            Keep the gradient CSS visible during review so design and engineering can validate the same stop positions and opacity model.
          </div>
          <div slot="preview">
            <strong style="display:block;margin-bottom:0.35rem">Suggested usage</strong>
            <span style="display:block;color:var(--eon-semantic-text-secondary, #475569)">Use this treatment for hero banners, campaign cards, and premium empty states.</span>
          </div>
          <span slot="footer">Saved presets stay reusable, while variant previews help compare linear, radial, angular, and diamond treatments before applying.</span>
        </eon-gradient-picker>
      `,
    },
  ],
  'eon-image-picker': [
    {
      key: 'image-picker-workspace',
      source: 'generated',
      title: 'Asset-management workspace',
      code: `
        <eon-image-picker
          heading="Hero image manager"
          description="Upload, validate, crop, and approve launch visuals from one workspace."
          label="Recent assets"
          value="hero-image"
          status-text="Autosaved"
          status-tone="success"
          success
          success-text="Selected asset is approved and ready to publish."
          help-text="Keep alt text and usage metadata aligned before applying."
          variant="outlined"
          size="lg"
          assets-data='${imagePickerAssets}'
          upload-queue-data='${imagePickerUploadQueue}'
          validation-data='${imagePickerValidation}'
          quick-insert-data='${imagePickerQuickInsert}'
          actions-data='${imagePickerActions}'
          filters-data='${imagePickerFilters}'
          show-upload-queue
          show-selection-panel
          show-crop-panel
          show-validation-panel
          show-state-gallery
          show-variant-gallery
          show-quick-insert
          show-filter-bar
          show-action-panel
          show-apply-button
        >
          <eon-toolbar slot="actions" aria-label="Image picker header actions">
            <eon-button size="sm" variant="ghost">Filter</eon-button>
            <eon-button size="sm" variant="ghost">Share</eon-button>
          </eon-toolbar>
          <div>
            Asset metadata, crop preview, and validation notes stay visible together so content and engineering can review the same asset state.
          </div>
          <div slot="preview">
            <strong style="display:block;margin-bottom:0.35rem">Preview guidance</strong>
            <span style="display:block;color:var(--eon-semantic-text-secondary, #475569)">Review desktop, tablet, and mobile framing before the hero image is approved.</span>
          </div>
          <span slot="footer">Use the upload queue for incoming files, then validate alt text and crop output before clicking Done.</span>
        </eon-image-picker>
      `,
    },
  ],
  'eon-input': [
    {
      key: 'input-modernized-form',
      source: 'generated',
      title: 'Structured field with actions',
      code: `
        <eon-input
          label="Workspace alias"
          value="Northwind-Labs"
          placeholder="Choose a public alias"
          help-text="Press Enter to commit. We trim and normalize the alias on save."
          success
          text-transform="lowercase"
          show-clear-button
        >
          <span slot="prefix">https://</span>
          <span slot="suffix">.eon</span>
          <eon-button slot="action" size="sm" variant="outline">Check</eon-button>
          <span slot="success">Alias is available for this release workspace.</span>
        </eon-input>
      `,
    },
  ],
  'eon-select-box': [
    {
      key: 'select-box-modernized-form',
      source: 'generated',
      title: 'Multi-owner selector',
      code: `
        <eon-select-box
          label="Assign owners"
          items-data='${structuredSelectionItems}'
          value="owner,review"
          selection-mode="multiple"
          render-in-viewport
          search-enabled
          show-clear-button
          opened
        >
          <eon-toolbar slot="footer" aria-label="Owner actions">
            <eon-button variant="outline">Invite owner</eon-button>
            <eon-button>Apply selection</eon-button>
          </eon-toolbar>
        </eon-select-box>
      `,
    },
  ],
  'eon-lookup': [
    {
      key: 'lookup-modernized-form',
      source: 'generated',
      title: 'Owner directory sheet',
      code: `
        <eon-lookup
          label="Escalation owner"
          heading="Select the on-call owner"
          subtitle="Search people, teams, or saved directories without leaving the current review flow."
          items-data='${lookupDirectoryItems}'
          value="ariana"
          search-enabled
          opened
          show-clear-button
        >
          <div slot="context" style="display:grid;gap:0.65rem">
            <strong style="margin:0">Selected owner</strong>
            <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.5">
              Ariana signs off on component parity, staging screenshots, and the rollout checklist for this workspace.
            </p>
            <eon-chip>Primary approver</eon-chip>
          </div>
          <eon-toolbar slot="footer" aria-label="Lookup footer actions">
            <eon-button variant="outline">Invite teammate</eon-button>
          </eon-toolbar>
        </eon-lookup>
      `,
    },
  ],
  'eon-number-box': [
    {
      key: 'number-box-modernized-form',
      source: 'generated',
      title: 'Budget threshold control',
      code: `
        <eon-number-box
          label="Budget threshold"
          value="24000"
          min="5000"
          max="50000"
          step="500"
          format="currency"
          currency="USD"
          show-spin-buttons
          show-clear-button
          help-text="Type a draft amount, then tab away to commit it."
        ></eon-number-box>
      `,
    },
  ],
  'eon-date-box': [
    {
      key: 'date-box-modernized-form',
      source: 'generated',
      title: 'Preset review date',
      code: `
        <eon-date-box
          label="Review date"
          type="date"
          value="2026-06-18"
          show-today-button
          show-clear-button
          show-summary
          apply-value-mode="useButtons"
          presets-data='${datePresetItems}'
          help-text="Use presets for the common review checkpoints."
        ></eon-date-box>
      `,
    },
  ],
  'eon-date-range-box': [
    {
      key: 'date-range-box-modernized-form',
      source: 'generated',
      title: 'Preset reporting window',
      code: `
        <eon-date-range-box
          label="Reporting window"
          start="2026-06-01"
          end="2026-06-07"
          show-summary
          show-picker-buttons
          apply-value-mode="useButtons"
          presets-data='${dateRangePresetItems}'
          help-text="Pick a preset range, then fine-tune it if the review cycle changed."
        ></eon-date-range-box>
      `,
    },
  ],
  'eon-file-uploader': [
    {
      key: 'file-uploader-modernized-form',
      source: 'generated',
      title: 'Attachment review queue',
      code: `
        <eon-file-uploader
          label="Release attachments"
          multiple
          max-files="4"
          accept=".pdf,.png,.zip"
          upload-mode="manual"
          files-data='${uploaderSeedItems}'
          upload-failure-pattern="broken"
          help-text="Retry failed files before the publish checklist closes."
        >
          <div slot="footer" style="display:flex;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;color:var(--eon-semantic-text-secondary, #475569);font-size:0.84rem">
            <span>3 attachments are staged for this release.</span>
            <span>Uploads keep their per-file status until you clear the list.</span>
          </div>
        </eon-file-uploader>
      `,
    },
  ],
  'eon-dropdown-menu': [
    {
      key: 'dropdown-menu-modernized-form',
      source: 'generated',
      title: 'Contextual reviewer actions',
      code: `
        <eon-dropdown-menu
          label="Reviewer actions"
          items-data='${commandMenuItems}'
          show-selection
          search-enabled
          value="share"
          open
        >
          <div slot="header" style="display:grid;gap:0.3rem;padding:0.4rem 0.55rem 0.25rem">
            <strong style="margin:0">Reviewer actions</strong>
            <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.84rem">Share the summary, request approval, or archive the draft.</span>
          </div>
          <div slot="footer" style="padding:0.35rem 0.55rem;color:var(--eon-semantic-text-secondary, #475569);font-size:0.82rem">
            Actions keep badges, shortcuts, and meta without a custom row renderer.
          </div>
        </eon-dropdown-menu>
      `,
    },
  ],
  'eon-drop-down-button': [
    {
      key: 'drop-down-button-modernized-actions',
      source: 'generated',
      title: 'Structured reviewer actions',
      code: `
        <eon-drop-down-button
          label="Reviewer actions"
          value="share"
          items-data='${actionButtonItems}'
          split-button
          render-in-viewport
        >
          <div slot="header" style="display:grid;gap:0.25rem;padding:0.35rem 0.55rem 0.2rem">
            <strong style="margin:0">Reviewer actions</strong>
            <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.82rem">Pick the next step for this staging-ready release.</span>
          </div>
        </eon-drop-down-button>
      `,
    },
  ],
  'eon-popover': [
    {
      key: 'popover-modernized-form',
      source: 'generated',
      title: 'Contextual owner summary',
      code: `
        <eon-popover
          open
          trigger-label="Review details"
          eyebrow="Context"
          heading="Workspace summary"
          description="Quick context for the current release review"
          status="Live"
          width="20rem"
        >
          <eon-button slot="actions" size="sm" variant="outline">Open</eon-button>
          <div style="display:grid;gap:0.75rem">
            <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.55">
              Use the popover for contextual notes, compact action bundles, and lightweight decision support without leaving the form.
            </p>
            <eon-stack gap="0.45rem">
              <eon-chip>3 owners assigned</eon-chip>
              <eon-chip>2 approvals pending</eon-chip>
            </eon-stack>
          </div>
          <eon-toolbar slot="footer" aria-label="Popover footer actions">
            <eon-button variant="outline">Open full panel</eon-button>
          </eon-toolbar>
        </eon-popover>
      `,
    },
  ],
  'eon-dialog': [
    {
      key: 'dialog-modernized-form',
      source: 'generated',
      title: 'Confirm release dialog',
      code: `
        <eon-dialog open eyebrow="Final check" heading="Confirm release" description="Review the checklist before you publish the updated workflow." status="2 approvals pending">
          <eon-button slot="actions" size="sm" variant="outline">History</eon-button>
          <div style="display:grid;gap:0.9rem">
            <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.55">
              Dialog headers can now carry eyebrow, status, and action content without replacing the full confirmation layout.
            </p>
            <eon-grid min="10rem" gap="0.75rem">
              <eon-card><p style="margin:0">12 checks passed</p></eon-card>
              <eon-card><p style="margin:0">2 approvals pending</p></eon-card>
            </eon-grid>
          </div>
          <eon-toolbar slot="footer" aria-label="Dialog footer actions">
            <eon-button variant="outline">Cancel</eon-button>
            <eon-button>Publish release</eon-button>
          </eon-toolbar>
        </eon-dialog>
      `,
    },
  ],
  'eon-pagination': [
    {
      key: 'pagination-page-default',
      source: 'generated',
      title: 'Page default',
      code: '<eon-pagination page="3" total="12"></eon-pagination>',
    },
    {
      key: 'pagination-card-advanced',
      source: 'generated',
      title: 'Card advanced',
      code: '<eon-pagination variant="advanced" page="3" total="12" page-size="25" show-page-buttons></eon-pagination>',
    },
    {
      key: 'pagination-button-group',
      source: 'generated',
      title: 'Button group center aligned',
      code: '<eon-pagination variant="button-group" align="center" page="3" total="12"></eon-pagination>',
    },
    {
      key: 'pagination-dots',
      source: 'generated',
      title: 'Pagination dots',
      code: '<eon-pagination variant="dots" align="center" page="3" total="8"></eon-pagination>',
    },
    {
      key: 'pagination-line',
      source: 'generated',
      title: 'Pagination line',
      code: '<eon-pagination variant="line" align="center" page="4" total="8"></eon-pagination>',
    },
  ],
  'eon-stepper': [
    {
      key: 'stepper-icon-centered',
      source: 'generated',
      title: 'Icon centered',
      code: '<eon-stepper items="Details|user|Name and email;Company|building|Website and location;Invite|users|Add your team;Socials|share|Connect your channels" current="1" display-mode="icons"></eon-stepper>',
    },
    {
      key: 'stepper-icon-centered-number',
      source: 'generated',
      title: 'Icon centered with number',
      code: '<eon-stepper items="Details|user|Name and email;Company|building|Website and location;Invite|users|Add your team;Socials|share|Connect your channels" current="1" display-mode="icons-number"></eon-stepper>',
    },
    {
      key: 'stepper-featured-inline',
      source: 'generated',
      title: 'Featured icon with text',
      code: '<eon-stepper variant="inline" indicator-style="featured" items="Details|user|Name and email;Company|building|Website and location;Invite|users|Add your team;Socials|share|Connect your channels" current="1" completed="Details"></eon-stepper>',
    },
    {
      key: 'stepper-minimal',
      source: 'generated',
      title: 'Minimal icons connected',
      code: '<eon-stepper variant="minimal" display-mode="icons" show-step-summary items="Details|user|Name and email;Company|building|Website and location;Invite|users|Add your team;Socials|share|Connect your channels" current="1"></eon-stepper>',
    },
    {
      key: 'stepper-line',
      source: 'generated',
      title: 'Text with line',
      code: '<eon-stepper variant="line" items="Details|user|Name and email;Company|building|Website and location;Invite|users|Add your team;Socials|share|Connect your channels" current="2" completed="Details,Company"></eon-stepper>',
    },
  ],
  'eon-floating-action-button': [
    {
      key: 'floating-action-button-modernized-actions',
      source: 'generated',
      title: 'Structured compose launcher',
      code: `
        <eon-floating-action-button
          position="inline"
          extended
          action-data='${fabPrimaryActionData}'
          items-data='${fabActionItems}'
        ></eon-floating-action-button>
      `,
    },
  ],
  'eon-app-store-button': [
    {
      key: 'app-store-button-modernized-actions',
      source: 'generated',
      title: 'Mobile download CTA',
      code: `
        <eon-app-store-button
          store="App Store"
          description="Install the release workspace app to approve, annotate, and publish away from the desktop board."
          action-data='${appStoreActionData}'
        ></eon-app-store-button>
      `,
    },
  ],
  'eon-social-button': [
    {
      key: 'social-button-modernized-actions',
      source: 'generated',
      title: 'Community handoff CTA',
      code: `
        <eon-social-button
          network="Discord"
          description="Guide the release team into the live community thread when the staging review is complete."
          action-data='${socialActionData}'
        ></eon-social-button>
      `,
    },
  ],
  'eon-checkbox': [
    {
      key: 'checkbox-checked',
      source: 'generated',
      title: 'Checked with help text',
      code: '<eon-checkbox label="Notify the compliance channel" checked help-text="A matching audit note will be stored automatically."></eon-checkbox>',
    },
    {
      key: 'checkbox-mixed',
      source: 'generated',
      title: 'Indeterminate state',
      code: '<eon-checkbox label="Partial workspace selection" indeterminate help-text="Use the mixed state when only some nested items are selected."></eon-checkbox>',
    },
    {
      key: 'checkbox-three-state',
      source: 'generated',
      title: 'Three-state showcase',
      code: `
        <div style="display:grid;gap:1rem;max-width:34rem">
          <div style="display:grid;gap:0.75rem">
            <strong>Three visible states</strong>
            <eon-checkbox label="Unchecked parent selection" three-state help-text="No nested items are selected."></eon-checkbox>
            <eon-checkbox label="Mixed parent selection" three-state indeterminate help-text="Some nested items are selected."></eon-checkbox>
            <eon-checkbox label="Checked parent selection" three-state checked help-text="All nested items are selected."></eon-checkbox>
          </div>
          <eon-divider></eon-divider>
          <div style="display:grid;gap:0.75rem">
            <strong>Interactive cycle</strong>
            <eon-checkbox label="Parent selection" three-state indeterminate help-text="Click repeatedly to cycle unchecked, mixed, and checked states."></eon-checkbox>
          </div>
        </div>
      `,
    },
  ],
  'eon-radio': [
    {
      key: 'radio-modernized-form',
      source: 'generated',
      title: 'Single selection with validation copy',
      code: `
        <eon-radio
          label="Board review owner"
          name="owner-surface"
          value="board"
          checked
          help-text="Use a single radio when the surrounding card already establishes the larger choice set."
        ></eon-radio>
      `,
    },
  ],
  'eon-radio-group': [
    {
      key: 'radio-group-modernized-form',
      source: 'generated',
      title: 'Structured role selector',
      code: `
        <eon-radio-group
          label="Escalation owner"
          items-data='${structuredSelectionItems}'
          value="review"
          show-descriptions
          help-text="Choose the owner who carries the current release review across staging and sign-off."
        ></eon-radio-group>
      `,
    },
  ],
  'eon-switch': [
    {
      key: 'switch-modernized-form',
      source: 'generated',
      title: 'Immediate settings toggle',
      code: `
        <eon-switch
          label="Enable live alerts"
          checked
          show-text
          on-text="Live"
          off-text="Paused"
          help-text="Use immediate toggles for monitoring behavior that should update as soon as the setting changes."
        ></eon-switch>
      `,
    },
  ],
  'eon-select': [
    {
      key: 'select-modernized-form',
      source: 'generated',
      title: 'Native-backed role select',
      code: `
        <eon-select
          label="Workspace role"
          value="Editor"
          options="Admin,Editor,Viewer"
          help-text="Keep the native picker path when a simple role choice is enough."
        ></eon-select>
      `,
    },
  ],
  'eon-chip': [
    {
      key: 'chip-modernized-form',
      source: 'generated',
      title: 'Compact removable token',
      code: `
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
          <eon-chip removable>Quarterly review</eon-chip>
          <eon-chip removable>Stakeholder handoff</eon-chip>
          <eon-chip>Live monitor</eon-chip>
        </div>
      `,
    },
  ],
  'eon-badge': [
    {
      key: 'badge-feedback-states',
      source: 'generated',
      title: 'Inline release state badges',
      code: `
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
          <eon-badge tone="success">Live</eon-badge>
          <eon-badge tone="warning">Needs review</eon-badge>
          <eon-badge tone="danger">Blocked</eon-badge>
          <eon-badge>Draft</eon-badge>
        </div>
      `,
    },
  ],
  'eon-alert': [
    {
      key: 'alert-slotted-review-warning',
      source: 'generated',
      title: 'Review warning with rich title',
      code: `
        <eon-alert tone="warning" heading="Manual review pending">
          <span slot="title" style="display:grid;gap:0.2rem">
            <strong style="margin:0">Manual review pending</strong>
            <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Keep richer heading copy inside the title slot when the message needs more context.</span>
          </span>
          Analysts still need to sign off on the final rule changes before this release can move out of staging.
        </eon-alert>
      `,
    },
  ],
  'eon-progress': [
    {
      key: 'progress-upload-status',
      source: 'generated',
      title: 'Determinate and indeterminate progress',
      code: `
        <eon-stack gap="1rem">
          <eon-progress
            label="Uploading assets"
            value="72"
            show-value-label
            helper-text="3 of 4 files complete."
            tone="success"
          ></eon-progress>
          <eon-progress
            label="Refreshing review indexes"
            indeterminate
            show-value-label
            helper-text="Use indeterminate progress while the runtime is still estimating completion."
          ></eon-progress>
        </eon-stack>
      `,
    },
  ],
  'eon-spinner': [
    {
      key: 'spinner-inline-refresh',
      source: 'generated',
      title: 'Inline refresh status',
      code: `
        <eon-stack gap="0.75rem" align="center">
          <eon-spinner label="Refreshing the staged workspace"></eon-spinner>
          <span style="color:var(--eon-semantic-text-secondary, #475569);">Refreshing the staged workspace</span>
        </eon-stack>
      `,
    },
  ],
  'eon-skeleton': [
    {
      key: 'skeleton-dashboard-shell',
      source: 'generated',
      title: 'Dashboard loading shell',
      code: `
        <eon-stack gap="0.85rem">
          <eon-skeleton width="18rem" height="1.25rem"></eon-skeleton>
          <eon-skeleton width="100%" height="5.5rem" radius="1rem"></eon-skeleton>
          <eon-grid min="12rem" gap="0.85rem">
            <eon-skeleton height="4rem" radius="1rem"></eon-skeleton>
            <eon-skeleton height="4rem" radius="1rem"></eon-skeleton>
            <eon-skeleton height="4rem" radius="1rem"></eon-skeleton>
          </eon-grid>
        </eon-stack>
      `,
    },
  ],
  'eon-card': [
    {
      key: 'card-review-summary',
      source: 'generated',
      title: 'Composed review card',
      code: `
        <eon-card>
          <div slot="header" style="display:grid;gap:0.35rem">
            <strong style="margin:0">Executive summary</strong>
            <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.92rem;">Use the card shell to group the current release narrative and next action.</span>
          </div>
          <div style="display:grid;gap:0.85rem">
            <p style="margin:0;line-height:1.6;color:var(--eon-semantic-text-secondary, #475569);">Cards stay quiet enough for dashboards while still supporting richer content composition.</p>
            <eon-chip>Review ready</eon-chip>
          </div>
          <eon-toolbar slot="footer" aria-label="Card footer actions">
            <eon-button variant="outline">Open report</eon-button>
            <eon-button>Share summary</eon-button>
          </eon-toolbar>
        </eon-card>
      `,
    },
  ],
  'eon-divider': [
    {
      key: 'divider-section-rhythm',
      source: 'generated',
      title: 'Horizontal and vertical separation',
      code: `
        <eon-stack gap="1rem">
          <span>Signal overview</span>
          <eon-divider></eon-divider>
          <div style="display:flex;gap:1rem;align-items:stretch">
            <span>Primary owner</span>
            <eon-divider orientation="vertical"></eon-divider>
            <span>Review lead</span>
          </div>
        </eon-stack>
      `,
    },
  ],
  'eon-stack': [
    {
      key: 'stack-review-rhythm',
      source: 'generated',
      title: 'One-dimensional review rhythm',
      code: `
        <eon-stack gap="1rem">
          <eon-chip>Audit notes</eon-chip>
          <eon-card><p style="margin:0">Stacks keep one-dimensional spacing predictable across cards, actions, and helper text.</p></eon-card>
          <eon-button>Primary action</eon-button>
        </eon-stack>
      `,
    },
  ],
  'eon-grid': [
    {
      key: 'grid-release-dashboard',
      source: 'generated',
      title: 'Responsive release dashboard',
      code: `
        <eon-grid min="15rem" gap="1rem">
          <eon-card><p style="margin:0">Signal review</p></eon-card>
          <eon-card><p style="margin:0">Escalation queue</p></eon-card>
          <eon-card><p style="margin:0">Publishing checks</p></eon-card>
        </eon-grid>
      `,
    },
  ],
  'eon-section': [
    {
      key: 'section-actions-shell',
      source: 'generated',
      title: 'Section with title, description, and actions',
      code: `
        <eon-section heading="Review workspace" description="Use the section shell to group a slice of the workflow while keeping quick actions nearby.">
          <eon-toolbar slot="actions" aria-label="Section actions">
            <eon-button variant="outline">Export</eon-button>
            <eon-button>Share</eon-button>
          </eon-toolbar>
          <eon-card>
            <p style="margin:0">Section content can hold any EonUI composition without forcing a heavier card-first layout.</p>
          </eon-card>
        </eon-section>
      `,
    },
  ],
  'eon-avatar': [
    {
      key: 'avatar-identity-states',
      source: 'generated',
      title: 'Photo and initials identity states',
      code: `
        <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
          <eon-avatar name="Ariana Singh" size="lg"></eon-avatar>
          <eon-avatar name="Noah Patel" size="md"></eon-avatar>
          <eon-avatar name="Compliance Desk" size="sm"></eon-avatar>
        </div>
      `,
    },
  ],
  'eon-empty-state': [
    {
      key: 'empty-state-guided-recovery',
      source: 'generated',
      title: 'Guided no-data recovery',
      code: `
        <eon-empty-state heading="No incidents matched" description="Adjust the filters or widen the investigation window before reviewing the staged release again.">
          <div slot="visual" style="display:grid;place-items:center;width:4rem;height:4rem;border-radius:1rem;background:rgba(59,130,246,0.08);color:#1d4ed8;font-weight:700;">0</div>
          <eon-toolbar slot="actions" aria-label="Empty state actions">
            <eon-button variant="outline">Reset filters</eon-button>
            <eon-button>Open saved search</eon-button>
          </eon-toolbar>
        </eon-empty-state>
      `,
    },
  ],
  'eon-surface': [
    {
      key: 'surface-elevated-shell',
      source: 'generated',
      title: 'Quiet elevated surface',
      code: `
        <eon-surface elevated>
          <eon-stack gap="0.75rem">
            <strong>Surface container</strong>
            <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);">Use surface as the calm framing layer around denser cards, lists, or form groups.</p>
          </eon-stack>
        </eon-surface>
      `,
    },
  ],
  'eon-tabs': [
    {
      key: 'tabs-workspace-switcher',
      source: 'generated',
      title: 'Workspace tab switcher',
      code: `
        <eon-tabs labels="Overview,Signals,Escalations">
          <eon-stack gap="0.75rem">
            <strong>Use tabs to switch between major workflow slices</strong>
            <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);">Keep the content inside the panel slot while the header tracks active state and keyboard navigation.</p>
          </eon-stack>
        </eon-tabs>
      `,
    },
  ],
  'eon-toast': [
    {
      key: 'toast-inline-notification',
      source: 'generated',
      title: 'Inline saved notification',
      code: `
        <eon-toast tone="success" heading="Saved" duration="5000" show-progress-bar pause-on-hover show-close-button show-timestamp density="compact">
          <div slot="title" style="display:grid;gap:0.2rem">
            <strong style="margin:0">Saved</strong>
          </div>
          Workspace changes are live and ready for the next review pass.
          <span slot="actions"><eon-button size="sm" variant="ghost">Undo</eon-button></span>
        </eon-toast>
      `,
    },
  ],
  'eon-drawer': [
    {
      key: 'drawer-details-workspace',
      source: 'generated',
      title: 'Structured details drawer',
      code: `
        <eon-drawer
          open
          label="Project details"
          eyebrow="Focused panel"
          heading="Details"
          description="Use a structured drawer when people need to review or edit task details without losing page context."
          status="Active"
          placement="right"
          size="md"
          mode="temporary"
          initial-focus="close"
        >
          <eon-button slot="actions" size="sm" variant="ghost">Pin</eon-button>
          <eon-stack gap="0.9rem">
            <eon-tabs labels="Overview,Activity,Files">
              <eon-stack gap="0.85rem">
                <eon-input label="Name" value="Project Apollo"></eon-input>
                <eon-input label="Owner" value="Olivia Rhye"></eon-input>
                <eon-grid min="10rem" gap="0.75rem">
                  <eon-badge tone="success">Active</eon-badge>
                  <eon-badge tone="warning">High priority</eon-badge>
                </eon-grid>
                <eon-textarea label="Description" value="A strategic initiative to improve customer engagement and operational efficiency." rows="4"></eon-textarea>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
                  <eon-chip>Strategy</eon-chip>
                  <eon-chip>Growth</eon-chip>
                  <eon-chip>Q2</eon-chip>
                </div>
              </eon-stack>
            </eon-tabs>
          </eon-stack>
          <eon-toolbar slot="footer" aria-label="Drawer footer actions">
            <eon-button variant="outline">Close</eon-button>
            <eon-button>Save</eon-button>
          </eon-toolbar>
        </eon-drawer>
      `,
    },
  ],
  'eon-header-navigation': [
    {
      key: 'header-navigation-modernized-shell',
      source: 'generated',
      title: 'Operational navigation slab',
      code: `
        <eon-header-navigation
          items-data='${headerNavigationData}'
          actions-data='${headerUtilityData}'
          value="approvals/pending"
          search-enabled
          variant="dashboard"
          density="compact"
          show-descriptions
          show-meta
          show-badges
          show-status
          show-icons
        >
          <span slot="eyebrow" style="font-size:0.74rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--eon-semantic-text-secondary, #475569);">Control center</span>
          <div slot="title" style="display:grid;gap:0.18rem">
            <strong style="font-size:1.1rem;margin:0">Release command bar</strong>
          </div>
          <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.9rem;">
            Use structured primary links, utility actions, and secondary rails to keep staging review wayfinding visible without a page fork.
          </div>
          <div slot="aside" style="display:flex;gap:0.45rem;flex-wrap:wrap;justify-content:flex-end;">
            <span style="padding:0.35rem 0.7rem;border-radius:999px;background:rgba(16,185,129,0.14);color:#047857;font-size:0.78rem;font-weight:700;">Staging synced</span>
            <span style="padding:0.35rem 0.7rem;border-radius:999px;background:rgba(59,130,246,0.1);color:#1d4ed8;font-size:0.78rem;font-weight:700;">3 approvals pending</span>
          </div>
          <eon-button slot="actions" size="sm" variant="outline">Share board</eon-button>
          <div slot="media" style="padding:0.95rem 1rem;border-radius:1rem;background:linear-gradient(135deg, rgba(59,130,246,0.1), rgba(14,165,233,0.08));display:grid;gap:0.3rem;">
            <strong style="margin:0">Mock-driven banner band</strong>
            <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.84rem;">The header shell now supports announcement or utility media without hardcoding page-specific layouts.</span>
          </div>
        </eon-header-navigation>
      `,
    },
  ],
  'eon-page-header': [
    {
      key: 'page-header-modernized-shell',
      source: 'generated',
      title: 'Hero and proof launch slab',
      code: `
        <eon-page-header
          breadcrumbs-data='${pageHeaderBreadcrumbsData}'
          breadcrumb-value="workspace/releases/june-launch"
          meta-data='${pageHeaderMetaData}'
          proof-data='${pageHeaderProofData}'
          actions-data='${pageHeaderActionData}'
          variant="dashboard"
          layout="split-media"
          show-meta
          show-proof
          show-actions
          show-icons
        >
          <span slot="eyebrow" style="font-size:0.74rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--eon-semantic-text-secondary, #475569);">Launch program</span>
          <div slot="title" style="display:grid;gap:0.2rem">
            <strong style="font-size:1.45rem;line-height:1.05;margin:0">June launch review</strong>
          </div>
          <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.92rem;line-height:1.65;">
            Mock-aligned page headers now combine path context, proof cards, and CTA rails without collapsing into one rigid hero pattern.
          </div>
          <div slot="aside" style="display:grid;gap:0.55rem;justify-items:end;">
            <div style="padding:0.8rem 0.9rem;border-radius:1rem;background:rgba(15,23,42,0.04);display:grid;gap:0.22rem;max-width:18rem;">
              <strong style="margin:0">Review owner</strong>
              <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Ariana Singh is coordinating parity, staging, and release sign-off.</span>
            </div>
          </div>
          <div slot="media" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem;">
            <div style="padding:1rem;border-radius:1rem;background:linear-gradient(135deg, rgba(59,130,246,0.1), rgba(14,165,233,0.08));display:grid;gap:0.35rem;">
              <strong style="margin:0">Proof band</strong>
              <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Use proof cards when the header needs to summarize launch readiness before people scroll.</span>
            </div>
            <div style="padding:1rem;border-radius:1rem;border:1px solid rgba(148,163,184,0.18);background:rgba(255,255,255,0.78);display:grid;gap:0.3rem;">
              <strong style="margin:0">Responsive hero</strong>
              <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">The same shell can collapse into a stacked editorial slab on smaller screens.</span>
            </div>
          </div>
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Use the footer slot for milestone notes, timeline copy, or a compact audit rail.</div>
        </eon-page-header>
      `,
    },
  ],
  'eon-section-header': [
    {
      key: 'section-header-modernized-shell',
      source: 'generated',
      title: 'Anchor-aware review section',
      code: `
        <eon-section-header
          icon="RC"
          meta-data='${sectionHeaderMetaData}'
          anchors-data='${sectionHeaderAnchorData}'
          actions-data='${sectionHeaderActionData}'
          value="approvals"
          variant="editorial"
          layout="split-media"
          show-meta
          show-actions
          show-anchors
          show-icons
        >
          <span slot="eyebrow" style="font-size:0.74rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--eon-semantic-text-secondary, #475569);">Review cluster</span>
          <div slot="title" style="display:grid;gap:0.18rem">
            <strong style="font-size:1.15rem;margin:0">Approvals and ownership</strong>
          </div>
          <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.9rem;line-height:1.6;">
            Section headers now support leading tokens, inline status, and anchor rows that can act like tabs or in-page wayfinding.
          </div>
          <div slot="aside" style="padding:0.85rem 0.95rem;border:1px solid rgba(148,163,184,0.16);border-radius:1rem;background:rgba(255,255,255,0.76);display:grid;gap:0.28rem;max-width:18rem;">
            <strong style="margin:0">Current reviewer</strong>
            <span style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Mira Chen is collecting final decisions from design, platform, and QA.</span>
          </div>
          <div slot="media" style="padding:0.95rem 1rem;border-radius:1rem;background:linear-gradient(135deg, rgba(59,130,246,0.08), rgba(255,255,255,0.9));display:grid;gap:0.3rem;">
            <strong style="margin:0">Anchor rail</strong>
            <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Use the anchor row for summaries, tabs, or progress landmarks without reworking the header shell.</span>
          </div>
        </eon-section-header>
      `,
    },
  ],
  'eon-sidebar-navigation': [
    {
      key: 'sidebar-navigation-modernized-shell',
      source: 'generated',
      title: 'Workspace rail with grouped sections',
      code: `
        <eon-sidebar-navigation
          items-data='${sidebarNavigationData}'
          actions-data='${sidebarUtilityData}'
          value="workspace/overview"
          search-enabled
          variant="editorial"
          show-descriptions
          show-meta
          show-badges
          show-status
          show-icons
        >
          <div slot="footer" style="display:grid;gap:0.4rem;padding-top:0.4rem;border-top:1px solid rgba(148,163,184,0.16);">
            <strong style="margin:0">Current owner</strong>
            <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.84rem;">Ariana Singh is covering final review, parity, and release sign-off.</span>
          </div>
        </eon-sidebar-navigation>
      `,
    },
  ],
  'eon-section-footer': [
    {
      key: 'section-footer-modernized-shell',
      source: 'generated',
      title: 'Next-step handoff dock',
      code: `
        <eon-section-footer
          items-data='${sectionFooterSummaryData}'
          links-data='${sectionFooterLinkData}'
          status-data='${sectionFooterStatusData}'
          actions-data='${sectionFooterActionData}'
          variant="campaign"
          layout="split"
          show-status
          show-links
          show-actions
          show-icons
        >
          <span slot="eyebrow" style="font-size:0.74rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--eon-semantic-text-secondary, #475569);">Release handoff</span>
          <div slot="title" style="display:grid;gap:0.18rem">
            <strong style="font-size:1.1rem;margin:0">Close the review with clear next steps</strong>
          </div>
          <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.9rem;line-height:1.6;">
            Footer shells now support summary cards, utility links, and CTA groupings instead of a single legacy item strip.
          </div>
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Share the approval packet after the final sign-off lands and archive the review notes once the release window closes.</div>
        </eon-section-footer>
      `,
    },
  ],
  'eon-tree-view': [
    {
      key: 'tree-view-modernized-shell',
      source: 'generated',
      title: 'Split-panel navigation tree',
      code: `
        <eon-tree-view
          items-data='${treeViewWorkspaceData}'
          selected="workspace/incidents/critical"
          selection-mode="multiple"
          search-enabled
          show-toolbar
          show-select-all
          show-status
          show-descriptions
          show-meta
          show-badges
          show-node-status
          show-icons
          variant="dashboard"
          density="compact"
        >
          <div slot="header" style="display:grid;gap:0.32rem">
            <strong style="margin:0">Command tree</strong>
            <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">The upgraded tree now supports structured metadata, selection summaries, and a mock-aligned split panel.</span>
          </div>
          <div slot="context" style="display:grid;gap:0.85rem">
            <div style="display:grid;gap:0.28rem">
              <strong style="margin:0">Critical incident detail</strong>
              <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.84rem;">Selected branch: Workspace / Incidents / Critical</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.55rem">
              <div style="padding:0.7rem;border-radius:0.9rem;background:rgba(59,130,246,0.08);display:grid;gap:0.18rem;">
                <strong style="margin:0">4</strong>
                <span style="font-size:0.78rem;color:var(--eon-semantic-text-secondary, #475569);">urgent blockers</span>
              </div>
              <div style="padding:0.7rem;border-radius:0.9rem;background:rgba(16,185,129,0.08);display:grid;gap:0.18rem;">
                <strong style="margin:0">12</strong>
                <span style="font-size:0.78rem;color:var(--eon-semantic-text-secondary, #475569);">watchlist items</span>
              </div>
              <div style="padding:0.7rem;border-radius:0.9rem;background:rgba(245,158,11,0.12);display:grid;gap:0.18rem;">
                <strong style="margin:0">2h</strong>
                <span style="font-size:0.78rem;color:var(--eon-semantic-text-secondary, #475569);">to next review</span>
              </div>
            </div>
            <div style="padding:0.85rem;border:1px solid rgba(148,163,184,0.18);border-radius:1rem;background:rgba(255,255,255,0.74);display:grid;gap:0.3rem;">
              <strong style="margin:0">Follow-up</strong>
              <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Use the context slot for tabs, metrics, ownership notes, or branch-specific helper actions without changing the tree contract.</span>
            </div>
          </div>
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Tip: filter the tree before using "Select visible" to bulk-select a focused branch set.</div>
        </eon-tree-view>
      `,
    },
  ],
  'eon-accordion': [
    {
      key: 'accordion-multi-item',
      source: 'generated',
      title: 'Multi-item review stack',
      code: `
        <eon-accordion
          items="Signal summary|Review unusual spikes and quiet periods before publishing the analyst brief.;Operational notes|Use this panel for reviewer commentary, unresolved risks, and next actions.;Owner handoff|Capture who is reviewing the release now and who signs it off next.;Risk register|Track blockers, audit concerns, and issues that still need mitigation.;Escalation actions|Share the report, notify leads, and archive the workspace when sign-off is complete."
          multiple
          value="Signal summary;Owner handoff"
        ></eon-accordion>
      `,
    },
    {
      key: 'accordion-non-collapsible',
      source: 'generated',
      title: 'Single-open with more items',
      code: `
        <eon-accordion
          items="Overview|Keep one section open when the workflow needs a stable starting point.;Ownership|Surface who is reviewing the current release and who signs it off.;Release notes|Summarize the changes that are safe to communicate externally.;Risk review|Call out the issues that still need mitigation before rollout.;Stakeholders|List the teams that should be notified after sign-off.;Publish checklist|Collect the final release checks in one predictable place.;Aftercare|Outline the next monitoring window after the rollout is live."
          value="Overview"
          collapsible="false"
        ></eon-accordion>
      `,
    },
  ],
  'eon-chat': [
    {
      key: 'chat-structured-thread',
      source: 'custom',
      title: 'Structured support thread',
      code: `
        <eon-chat
          label="Release support"
          user="Ariana Singh"
          status="2 reviewers online"
          status-tone="success"
          state="ready"
          show-quick-replies
          quick-replies-data='[{"label":"Share the staging link"},{"label":"Open the tracker"},{"label":"Request approval"}]'
          messages-data='[
            {"role":"other","author":"Support agent","time":"11:42 AM","text":"Can you share the latest staging link before sign-off?","date":"Today 6/17/2026","status":"Needs reply","tone":"warning"},
            {"role":"self","author":"Ariana Singh","time":"11:44 AM","text":"Yes. I also attached the checklist summary.","date":"Today 6/17/2026","attachments":[{"name":"checklist.pdf","size":"18 KB"}],"status":"Sent","tone":"success"},
            {"role":"system","author":"System","time":"11:45 AM","text":"The release tracker refreshed with the latest mock-driven pass.","date":"Today 6/17/2026","status":"Synced","tone":"neutral"}
          ]'
          attachments-enabled
          composer-help-text="Ctrl+Enter sends the note while preserving the staged attachment set."
        ></eon-chat>
      `,
    },
  ],
  'eon-load-indicator': [
    {
      key: 'load-indicator-panel',
      source: 'custom',
      title: 'Panel progress state',
      code: `
        <eon-load-indicator
          label="Refreshing staging data"
          message="Verifying the current component batch and rebuilding the tracker."
          caption="This richer load indicator can stay inline or expand into a status card."
          type="bars"
          size="lg"
          variant="panel"
          layout="stacked"
          tone="success"
          progress="64"
          show-track
          show-label
        ></eon-load-indicator>
      `,
    },
  ],
  'eon-tooltip': [
    {
      key: 'tooltip-rich-status',
      source: 'custom',
      title: 'Rich tooltip with status copy',
      code: `
        <eon-tooltip
          heading="Mock-aligned guidance"
          description="The tooltip now supports status-aware helper content, richer slots, and explicit open-state typing."
          status-text="Ready"
          status-tone="success"
          footer-text="Use click mode when the content includes multiple lines or review context."
          trigger-mode="click"
          variant="rich"
          interactive
        >
          <eon-button slot="trigger" variant="outline">Open tooltip</eon-button>
        </eon-tooltip>
      `,
    },
  ],
  'eon-activity-gauge': [
    {
      key: 'activity-gauge-summary',
      source: 'custom',
      title: 'Threshold summary gauge',
      code: `
        <eon-activity-gauge
          heading="Launch readiness"
          description="Track progress against the staged release goal with thresholds and summary proof points."
          value="72"
          goal="100"
          status-text="Healthy"
          status-tone="success"
          thresholds-data='[{"label":"At risk","value":35,"meta":"Needs intervention","tone":"danger"},{"label":"On track","value":70,"meta":"Current pacing","tone":"success"},{"label":"Goal","value":100,"meta":"Ready to publish","tone":"neutral"}]'
          summary-data='[{"label":"Current","meta":"72"},{"label":"Target","meta":"100"},{"label":"Remaining","meta":"28"}]'
          variant="summary"
        ></eon-activity-gauge>
      `,
    },
  ],
  'eon-badge-group': [
    {
      key: 'badge-group-rich-cards',
      source: 'custom',
      title: 'Structured grouped badges',
      code: `
        <eon-badge-group
          label="Workspace badges"
          description="The mock-driven version supports structured metadata instead of only comma-separated labels."
          items-data='[
            {"label":"Live","description":"Current staging preview is healthy.","badge":"Healthy","meta":"Now"},
            {"label":"Review","description":"Stakeholders still need to approve the final pass.","status":"3 pending","meta":"Queue"},
            {"label":"Docs","description":"Program index refreshed from the latest custom examples.","badge":"Updated","meta":"Tracker"}
          ]'
          variant="mixed"
        ></eon-badge-group>
      `,
    },
  ],
  'eon-card-header': [
    {
      key: 'card-header-actions',
      source: 'custom',
      title: 'Action-ready card header',
      code: `
        <eon-card-header
          eyebrow="Modernized review"
          heading="Release readiness workspace"
          description="Pair the primary title with metadata, status, and helper actions."
          meta-data='[{"label":"Updated","meta":"5 minutes ago"},{"label":"Owner","meta":"Ariana Singh"}]'
          actions-data='[{"label":"Share review","value":"share-review"},{"label":"Open tracker","value":"open-tracker"}]'
          status-text="Ready"
          status-tone="success"
        >
          <div style="display:grid;gap:0.55rem">
            <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.84rem;">Use the body slot for compact summary rows, proof points, or nested review actions.</span>
          </div>
        </eon-card-header>
      `,
    },
  ],
  'eon-featured-icon': [
    {
      key: 'featured-icon-highlights',
      source: 'custom',
      title: 'Feature callout with highlights',
      code: `
        <eon-featured-icon
          label="Theme-aware rollout"
          description="Show a compact hero callout before the supporting proof points."
          icon="TH"
          eyebrow="Key improvement"
          status-text="Live"
          status-tone="success"
          highlights-data='[
            {"label":"Generic and dark","description":"Previewed with the same structured content model."},
            {"label":"Typed React surface","description":"Structured props stay visible in downstream apps."}
          ]'
          variant="card"
        ></eon-featured-icon>
      `,
    },
  ],
  'eon-metric': [
    {
      key: 'metric-supporting-proof',
      source: 'custom',
      title: 'Metric with supporting proof',
      code: `
        <eon-metric
          label="Mock conversion coverage"
          value="70 / 119"
          trend="+10"
          trend-tone="success"
          previous-value="60 / 119"
          description="This metric now supports supporting proof cards instead of only a single string block."
          supporting-data='[
            {"label":"Typed props","meta":"70"},
            {"label":"Typed events","meta":"54"},
            {"label":"Custom staging stories","meta":"70"}
          ]'
          variant="comparison"
        ></eon-metric>
      `,
    },
  ],
  'eon-qr-code': [
    {
      key: 'qr-code-metadata-actions',
      source: 'custom',
      title: 'QR code with metadata and actions',
      code: `
        <eon-qr-code
          label="Open the staging explorer"
          value="http://127.0.0.1:4310"
          description="Layer metadata and helper actions around the QR handoff."
          meta-data='[{"label":"Mobile handoff"},{"label":"Private LAN"},{"label":"Theme preview"}]'
          actions-data='[{"label":"Copy URL","value":"copy-url"},{"label":"Share route","value":"share-route"}]'
          size="lg"
        ></eon-qr-code>
      `,
    },
  ],
  'eon-rating': [
    {
      key: 'rating-breakdown',
      source: 'custom',
      title: 'Rating with breakdown cards',
      code: `
        <eon-rating
          label="Reviewer confidence"
          description="Show the summary score plus a compact breakdown of how the current batch feels."
          rating="4.8"
          review-count="128"
          caption="Based on the latest implementation, typing, and staging review pass."
          status-text="High confidence"
          status-tone="success"
          breakdown-data='[
            {"label":"5 stars","meta":"84%","description":"Strong parity and clear staging stories."},
            {"label":"4 stars","meta":"12%","description":"Minor polish still possible for visuals."},
            {"label":"3 stars","meta":"4%","description":"Mostly around future component waves."}
          ]'
          variant="detailed"
        ></eon-rating>
      `,
    },
  ],
  'eon-toolbar': [
    {
      key: 'toolbar-structured-shell',
      source: 'custom',
      title: 'Structured toolbar shell',
      code: `
        <eon-toolbar
          heading="Release review actions"
          description="Layer metadata and status around the action rail without breaking the existing slot model."
          meta-data='[{"title":"Live"},{"label":"Owner","meta":"Ariana Singh"},{"label":"Wave 8","badge":"Current"}]'
          status-text="Healthy"
          status-tone="success"
          variant="dashboard"
        >
          <eon-button slot="start" variant="outline">Archive</eon-button>
          <eon-button slot="start" variant="outline">Share</eon-button>
          <eon-button>Publish</eon-button>
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Use the footer slot for secondary ownership notes or staged helper actions.</div>
        </eon-toolbar>
      `,
    },
  ],
  'eon-scroll-view': [
    {
      key: 'scroll-view-summary-shell',
      source: 'custom',
      title: 'Scroll shell with summary pills',
      code: `
        <eon-scroll-view
          heading="Live activity stream"
          description="The richer contract adds summary pills, explicit states, and typed reach events."
          summary-data='[{"title":"12 updates"},{"label":"Sync","meta":"Live"},{"label":"Theme","badge":"Dark + light"}]'
          status-text="Monitoring"
          status-tone="success"
          show-refresh-button
          refresh-label="Refresh feed"
          height="18rem"
          variant="carded"
        >
          <eon-stack gap="0.75rem">
            <eon-card>Release tracker refreshed from the latest mock-driven pass.</eon-card>
            <eon-card>React wrappers now expose typed structured props for the current workspace-shell batch.</eon-card>
            <eon-card>Light and dark staging previews are ready for verification.</eon-card>
            <eon-card>Use the reach events to trigger lazy loading or sticky section updates.</eon-card>
            <eon-card>Refresh actions can stay inside the shell instead of living in a separate toolbar.</eon-card>
          </eon-stack>
        </eon-scroll-view>
      `,
    },
  ],
  'eon-sortable': [
    {
      key: 'sortable-kanban-structured',
      source: 'custom',
      title: 'Structured sortable board',
      code: `
        <eon-sortable
          heading="Implementation board"
          description="Move component work across stages while preserving richer card metadata."
          items-data='[
            {"name":"Audit","cards":[{"title":"Review mock","value":"review-mock","meta":"Design doc","badge":"Ready"},{"title":"Check staging gaps","value":"check-staging","meta":"4310 preview","status":"Live"}]},
            {"name":"Build","cards":[{"title":"Patch core","value":"patch-core","meta":"packages/core","badge":"In progress"},{"title":"Type React wrappers","value":"type-react","meta":"packages/react","status":"Queued"}]},
            {"name":"Verify","cards":[{"title":"Run build and tests","value":"run-build","meta":"Vitest + build","badge":"Pending"}]}
          ]'
          variant="editorial"
          status-text="Drag cards to update the staged execution flow."
          show-counts
        ></eon-sortable>
      `,
    },
  ],
  'eon-splitter': [
    {
      key: 'splitter-review-shell',
      source: 'custom',
      title: 'Split review workspace',
      code: `
        <eon-splitter
          heading="Review workspace split"
          description="Use the richer shell props for two-pane audit and implementation flows."
          status-text="Keyboard + pointer aware"
          status-tone="success"
          position="42"
          collapsible
          variant="carded"
        >
          <div slot="start" style="display:grid;gap:0.75rem;height:100%;padding:0.5rem;">
            <eon-card>Mock notes and component requirements stay visible in the start pane.</eon-card>
            <eon-card>Keep the dependency-aware batch list here while implementation moves forward.</eon-card>
          </div>
          <div slot="end" style="display:grid;gap:0.75rem;height:100%;padding:0.5rem;">
            <eon-card>Code changes, staging notes, and typed wrapper work can live in the paired pane.</eon-card>
            <eon-card>The change event now reports whether the update came from pointer, keyboard, or toggle actions.</eon-card>
          </div>
        </eon-splitter>
      `,
    },
  ],
  'eon-resizable': [
    {
      key: 'resizable-presets',
      source: 'custom',
      title: 'Resizable surface with presets',
      code: `
        <eon-resizable
          heading="Resizable preview pane"
          description="Preset-aware resizing keeps workspace variants easy to compare in staging."
          status-text="Preset ready"
          status-tone="success"
          presets-data='[{"label":"Editorial","width":560,"height":320,"meta":"Wide review"},{"label":"Compact","width":360,"height":260,"meta":"Dense shell"},{"label":"Dashboard","width":720,"height":360,"meta":"Metrics first"}]'
          show-presets
          show-size-label
          variant="dashboard"
        >
          <div style="height:100%;display:grid;place-items:center;border-radius:0.9rem;background:linear-gradient(135deg, rgba(59,130,246,0.12), rgba(16,185,129,0.12));">
            Resize this staged surface to compare compact and editorial compositions.
          </div>
        </eon-resizable>
      `,
    },
  ],
  'eon-command-menu': [
    {
      key: 'command-menu-structured-search',
      source: 'custom',
      title: 'Structured command palette',
      code: `
        <eon-command-menu
          heading="Workspace commands"
          description="Search, select, and route across staged implementation actions from one shell."
          items-data='[
            {"group":"Review","label":"Open tracker","value":"open-tracker","description":"Jump to the refreshed conversion index.","shortcut":"T","status":"Live"},
            {"group":"Review","label":"Request approval","value":"request-approval","description":"Notify the current reviewer set.","badge":"Async","shortcut":"A"},
            {"group":"Build","label":"Open staging","value":"open-staging","description":"Preview the modernized example route.","meta":"127.0.0.1:4310","shortcut":"S"},
            {"group":"Docs","label":"Compare spec","value":"compare-spec","description":"Review the matching markdown design contract.","badge":"Docs","shortcut":"D"}
          ]'
          search-enabled
          show-icons
          variant="dashboard"
        ></eon-command-menu>
      `,
    },
  ],
  'eon-tab-panel': [
    {
      key: 'tab-panel-structured-workspace',
      source: 'custom',
      title: 'Structured workspace tabs',
      code: `
        <eon-tab-panel
          heading="Batch review tabs"
          description="Move between grouped review surfaces while keeping the active panel summary visible."
          items-data='[
            {"label":"Overview","value":"overview","description":"Primary parity and staging summary.","badge":"Live","meta":"Updated now"},
            {"label":"Typing","value":"typing","description":"React wrapper and event contract pass.","badge":"React","meta":"Typed"},
            {"label":"Verification","value":"verification","description":"Build, tests, and theme preview sweep.","badge":"QA","meta":"Pending"}
          ]'
          panel-items-data='[
            {"title":"Compare the mock direction","description":"Keep the visual hierarchy close to the source concept.","meta":"Design review","badge":"Docs"},
            {"title":"Expose additive APIs","description":"Preserve legacy props while structured data becomes the preferred path.","meta":"Core contract","status":"Ready"},
            {"title":"Publish the staging example","description":"Modernized stories should show states and richer inputs, not only the legacy happy path.","meta":"4310 preview","badge":"Current"}
          ]'
          value="overview"
          show-nav-buttons
          variant="workspace"
        ></eon-tab-panel>
      `,
    },
  ],
  'eon-list': [
    {
      key: 'list-rich-selection',
      source: 'custom',
      title: 'Rich structured list',
      code: `
        <eon-list
          heading="Current review owners"
          description="Use structured list items for badges, status, and metadata instead of only plain labels."
          items-data='[
            {"group":"Workspace","label":"Primary owner","value":"owner","description":"Final sign-off and publish path.","meta":"Ariana Singh","badge":"Owner","status":"Ready","avatar":"AS"},
            {"group":"Workspace","label":"Review lead","value":"review","description":"Coordinates QA and design review.","meta":"Mira Chen","badge":"Review","status":"Live","avatar":"MC"},
            {"group":"Automation","label":"Policy watcher","value":"watcher","description":"Monitors alerts after release.","meta":"Noah Patel","badge":"Async","status":"Monitoring","avatar":"NP"}
          ]'
          selection-mode="multiple"
          search-enabled
          show-toolbar
          show-select-all
          show-status
          show-selection-controls
          variant="dashboard"
        ></eon-list>
      `,
    },
  ],
  'eon-tile-view': [
    {
      key: 'tile-view-structured-grid',
      source: 'custom',
      title: 'Structured editorial tile grid',
      code: `
        <eon-tile-view
          heading="Workspace destinations"
          description="The tile grid now accepts structured items with status, metadata, and selection detail."
          items-data='[
            {"title":"North campus","subtitle":"Innovation lab","description":"Compare the staging shell in a wider editorial layout.","value":"north-campus","palette":["#dbeafe","#60a5fa"],"width":2,"height":1,"badge":"Live","meta":"Primary","status":"Ready"},
            {"title":"Studio nine","subtitle":"Production floor","description":"Track the denser dashboard variant for review workflows.","value":"studio-nine","palette":["#fee2e2","#ef4444"],"width":1,"height":1,"badge":"Review","status":"Queued"},
            {"title":"Forest retreat","subtitle":"Boardroom wing","description":"Use a calmer surface for content-heavy previews.","value":"forest-retreat","palette":["#dcfce7","#22c55e"],"width":1,"height":2,"badge":"Editorial","meta":"Story"}
          ]'
          variant="dashboard"
          value="north-campus"
        ></eon-tile-view>
      `,
    },
  ],
  'eon-carousel': [
    {
      key: 'carousel-structured-rail',
      source: 'custom',
      title: 'Structured featured rail',
      code: `
        <eon-carousel
          eyebrow="Modernized blueprint"
          heading="Featured implementation notes"
          description="The carousel now supports structured items, selection state, and explicit nav controls."
          items-data='[
            {"title":"Design system sync","subtitle":"Component parity","description":"Checklist for wrappers, staging stories, and typed event payloads.","meta":"12 blockers closed","badge":"Live"},
            {"title":"Workspace shell batch","subtitle":"Wave 8","description":"Toolbar, splitter, resizable, and list-style shells moved to structured contracts.","meta":"10 components","badge":"Current"},
            {"title":"Verification sweep","subtitle":"Build + tests","description":"Use the staged rail to surface what still needs review before marking the batch done.","meta":"Next action","badge":"QA"}
          ]'
          show-nav-buttons
          variant="dashboard"
        >
          <eon-button slot="actions" size="sm" variant="outline">Share summary</eon-button>
        </eon-carousel>
      `,
    },
  ],
  'eon-activity-feed': [
    {
      key: 'activity-feed-structured-console',
      source: 'custom',
      title: 'Structured activity console',
      code: `
        <eon-activity-feed
          eyebrow="Mock-driven batch"
          heading="Release activity"
          description="The feed now accepts structured entries with status, badges, selection, and filterable history."
          items-data='[
            {"title":"Launch prep","subtitle":"2m ago","description":"Updated the rollout checklist for the staging batch.","badge":"Live","status":"Ready","meta":"Ariana Singh"},
            {"title":"Review sync","subtitle":"18m ago","description":"Confirmed which components still need dark theme review.","badge":"QA","status":"Queued","meta":"Mira Chen"},
            {"title":"React typing","subtitle":"41m ago","description":"Typed the remaining wrappers and event payloads.","badge":"React","status":"Merged","meta":"Noah Patel"}
          ]'
          selection-mode="multiple"
          search-enabled
          show-toolbar
          show-selection-controls
          show-status
          variant="dashboard"
        >
          <eon-button slot="actions" size="sm" variant="outline">Share summary</eon-button>
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Use the search field and selection helpers to compare mock-derived activity states.</div>
        </eon-activity-feed>
      `,
    },
  ],
  'eon-gallery': [
    {
      key: 'gallery-structured-console',
      source: 'custom',
      title: 'Structured gallery console',
      code: `
        <eon-gallery
          heading="Workspace gallery"
          description="Slides now accept structured media, metadata, search, thumbnails, and selection-ready stories."
          items-data='[
            {"title":"Signal desk","subtitle":"Workspace review room","description":"Use a richer editorial frame for release summaries.","value":"signal-desk","media":"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80","meta":"Live review","badge":"Primary","status":"Ready"},
            {"title":"Launch room","subtitle":"Cross-functional sync","description":"Track the mock hierarchy with denser metadata and evidence framing.","value":"launch-room","media":"https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80","meta":"Current batch","badge":"Workspace","status":"Live"},
            {"title":"Signal wall","subtitle":"Metrics board","description":"A more analytical card row can still use the same core slide contract.","value":"signal-wall","palette":["#e0f2fe","#38bdf8"],"meta":"Analytics","badge":"Dashboard","status":"Queued"}
          ]'
          selected="launch-room"
          search-enabled
          show-toolbar
          show-status
          show-thumbnails
          show-counter
          variant="editorial"
        >
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">Search narrows the structured slide set without losing keyboard and thumbnail navigation.</div>
        </eon-gallery>
      `,
    },
  ],
  'eon-file-manager': [
    {
      key: 'file-manager-structured-workspace',
      source: 'custom',
      title: 'Structured file workspace',
      code: `
        <eon-file-manager
          heading="Launch files"
          description="Nested structured items now drive the file manager instead of only encoded path strings."
          status-text="Synced"
          status-tone="success"
          items-data='[
            {
              "label":"Files",
              "kind":"folder",
              "children":[
                {
                  "label":"Launches",
                  "kind":"folder",
                  "children":[
                    {"label":"launch-summary.pdf","kind":"doc","size":"2.4 MB","modified":"2026-06-18","description":"Board-ready export","badge":"Docs","status":"Ready"},
                    {"label":"hero-frame.png","kind":"image","size":"814 KB","modified":"2026-06-18","description":"Hero image from the staging pack","badge":"Media","status":"Live"}
                  ]
                },
                {
                  "label":"Notes",
                  "kind":"folder",
                  "children":[
                    {"label":"qa-checklist.md","kind":"file","size":"28 KB","modified":"2026-06-17","description":"Dark and light theme review checklist","badge":"QA","status":"Queued"}
                  ]
                }
              ]
            }
          ]'
          current-path="Files/Launches"
          show-preview
          variant="dashboard"
        ></eon-file-manager>
      `,
    },
  ],
  'eon-vector-map': [
    {
      key: 'vector-map-structured-surface',
      source: 'custom',
      title: 'Structured operational map',
      code: `
        <eon-vector-map
          heading="Regional rollout health"
          subtitle="Mock-driven structured map surface"
          description="The map now accepts typed regions, markers, routes, thresholds, and summary cards."
          status-text="Live telemetry"
          status-tone="success"
          regions-data='[
            {"name":"Canada","label":"Canada","value":5200000,"meta":"Stable"},
            {"name":"Brazil","label":"Brazil","value":2100000,"meta":"Review"},
            {"name":"Europe","label":"Europe","value":3900000,"meta":"Ready"},
            {"name":"China","label":"China","value":18000000,"meta":"Primary"},
            {"name":"India","label":"India","value":3700000,"meta":"Fastest growth"},
            {"name":"Australia","label":"Australia","value":1700000,"meta":"Monitoring"}
          ]'
          markers-data='[
            {"label":"Bengaluru","x":710,"y":348,"value":82,"meta":"Healthy"},
            {"label":"London","x":452,"y":170,"value":74,"meta":"Ready"},
            {"label":"Toronto","x":170,"y":160,"value":68,"meta":"Queued"}
          ]'
          routes-data='[
            {"label":"Primary corridor","fromX":452,"fromY":170,"toX":710,"toY":348},
            {"label":"Support route","fromX":170,"fromY":160,"toX":452,"toY":170}
          ]'
          thresholds-data='[
            {"label":"Watch","value":1500000,"color":"#f59e0b"},
            {"label":"Target","value":5000000,"color":"#14b8a6"}
          ]'
          summary-data='[
            {"title":"Markers","description":"Regional rollout nodes"},
            {"title":"Routes","description":"Tracked handoff corridors"},
            {"title":"Regions","description":"Active coverage zones"}
          ]'
          legend-mode="top-regions"
          show-summary
        ></eon-vector-map>
      `,
    },
  ],
  'eon-video-player': [
    {
      key: 'video-player-structured-stage',
      source: 'custom',
      title: 'Structured video stage',
      code: `
        <eon-video-player
          eyebrow="Modernized media"
          heading="Workspace walkthrough"
          description="The video-player now supports structured metadata, chapters, actions, and richer shell states."
          caption="Release handoff overview"
          duration="06:12"
          status-text="Ready to review"
          status-tone="success"
          meta-data='[
            {"title":"Format","description":"Product walkthrough","badge":"1080p"},
            {"title":"Owner","description":"Design systems team","status":"Current"}
          ]'
          actions-data='[
            {"title":"Share clip","actionLabel":"Share","actionValue":"share"},
            {"title":"Open notes","actionLabel":"Notes","actionValue":"notes"}
          ]'
          chapters-data='[
            {"title":"Overview","subtitle":"00:18","description":"Context and batch summary."},
            {"title":"API changes","subtitle":"02:10","description":"Structured prop and event pass."},
            {"title":"Staging sweep","subtitle":"04:54","description":"Light and dark example review."}
          ]'
          show-chapters
          show-actions
          show-meta
          variant="editorial"
        ></eon-video-player>
      `,
    },
  ],
  'eon-credit-card': [
    {
      key: 'credit-card-structured-commerce',
      source: 'custom',
      title: 'Structured payment surface',
      code: `
        <eon-credit-card
          brand="Eon Workspace Card"
          number="4242 4242 4242 4242"
          cardholder="Platform operations"
          expires="09/29"
          description="Primary billing surface for workspace subscriptions and release environments."
          status-text="Primary"
          status-tone="success"
          meta-data='[
            {"title":"Limit","description":"USD 12,000","badge":"Team"},
            {"title":"Region","description":"Global billing","status":"Synced"},
            {"title":"Owner","description":"Finance operations"}
          ]'
          actions-data='[
            {"title":"Set primary","actionLabel":"Set primary","actionValue":"set-primary"},
            {"title":"Replace card","actionLabel":"Replace","actionValue":"replace"}
          ]'
          show-actions
          show-meta
        ></eon-credit-card>
      `,
    },
  ],
  'eon-code-snippet': [
    {
      key: 'code-snippet-structured-tabs',
      source: 'custom',
      title: 'Structured code tabs',
      code: `
        <eon-code-snippet
          heading="Install and wire EonUI"
          description="The snippet surface now supports typed tabs, metadata, actions, and preview results."
          snippets-data='[
            {"label":"Install","language":"bash","code":"pnpm add @eonui/core @eonui/react","meta":"Package step","badge":"CLI","resultText":"Packages added to the workspace."},
            {"label":"Bootstrap","language":"tsx","code":"import { ensureEonReact } from \\"@eonui/react\\";\\n\\nensureEonReact();","meta":"React bridge","badge":"Runtime","resultText":"Custom elements registered on the client."},
            {"label":"Usage","language":"tsx","code":"<EonActivityFeed heading=\\"Release activity\\" />","meta":"Example","badge":"UI","resultText":"Rendered the upgraded feed in staging."}
          ]'
          meta-data='[
            {"title":"Runtime","description":"React wrapper"},
            {"title":"State","description":"Ready for staging","status":"Typed"}
          ]'
          actions-data='[
            {"title":"Copy sample","actionLabel":"Copy","actionValue":"copy"},
            {"title":"Open preview","actionLabel":"Preview","actionValue":"preview"}
          ]'
          show-result
          show-line-numbers
          status-text="Typed surface"
          status-tone="success"
        ></eon-code-snippet>
      `,
    },
  ],
  'eon-line-bar-chart': [
    {
      key: 'line-bar-chart-structured-analytics',
      source: 'custom',
      title: 'Structured line and bar chart',
      code: `
        <eon-line-bar-chart
          heading="Workspace signals"
          description="Line and bar series now follow a typed chart model with thresholds, annotations, and summary cards."
          categories-data='["Jan","Feb","Mar","Apr"]'
          series-data='[
            {"label":"Revenue","type":"bar","values":[120,180,240,200],"color":"#93c5fd","meta":"Monthly total"},
            {"label":"Activation rate","type":"line","values":[62,68,74,82],"color":"#0f172a","meta":"Efficiency"}
          ]'
          thresholds-data='[
            {"label":"Target","value":200,"color":"#14b8a6"}
          ]'
          annotations-data='[
            {"label":"Peak review","index":2,"detail":"Highest revenue month","tone":"success"}
          ]'
          summary-data='[
            {"title":"Top month","description":"March"},
            {"title":"Bar total","description":"740"},
            {"title":"Latest rate","description":"82"}
          ]'
          show-annotations
          show-summary
        ></eon-line-bar-chart>
      `,
    },
  ],
  'eon-pie-chart': [
    {
      key: 'pie-chart-structured-breakdown',
      source: 'custom',
      title: 'Structured pie breakdown',
      code: `
        <eon-pie-chart
          heading="Traffic mix"
          description="The pie chart now accepts typed slices and summary cards for dashboard storytelling."
          series-data='[
            {"label":"Organic","type":"slice","values":[68],"color":"#60a5fa","meta":"Primary traffic"},
            {"label":"Direct","type":"slice","values":[24],"color":"#14b8a6","meta":"Brand traffic"},
            {"label":"Partner","type":"slice","values":[8],"color":"#f59e0b","meta":"Affiliate"}
          ]'
          summary-data='[
            {"title":"Largest source","description":"Organic"},
            {"title":"Tracked mix","description":"3 channels"},
            {"title":"Total sessions","description":"100"}
          ]'
          status-text="Stable mix"
          status-tone="success"
        ></eon-pie-chart>
      `,
    },
  ],
  'eon-radar-chart': [
    {
      key: 'radar-chart-structured-comparison',
      source: 'custom',
      title: 'Structured radar comparison',
      code: `
        <eon-radar-chart
          heading="Capability comparison"
          description="The radar chart now uses typed axes, series, thresholds, annotations, and summary cards."
          categories-data='["Speed","Coverage","Quality","Resilience","Adoption"]'
          series-data='[
            {"label":"Current","type":"shape","values":[72,78,66,82,74],"color":"#2563eb","meta":"Current workspace"},
            {"label":"Target","type":"shape","values":[88,84,80,90,86],"color":"#93c5fd","meta":"Target profile"}
          ]'
          thresholds-data='[
            {"label":"Target ring","value":80,"color":"#14b8a6"}
          ]'
          annotations-data='[
            {"label":"Watch quality","index":2,"detail":"Needs more parity coverage","tone":"warning"}
          ]'
          summary-data='[
            {"title":"Strongest axis","description":"Resilience"},
            {"title":"Attention area","description":"Quality"},
            {"title":"Tracked rings","description":"2 profiles"}
          ]'
          show-annotations
          show-summary
        ></eon-radar-chart>
      `,
    },
  ],
  'eon-banner': [
    {
      key: 'banner-modernized-marketing',
      source: 'generated',
      title: 'Campaign release banner',
      code: `
        <eon-banner
          eyebrow="Release note"
          heading="Spring launch is live"
          description="Bring campaign context, proof, and follow-up actions into one announcement rail."
          status-text="Now live"
          status-tone="success"
          meta-data='${bannerMetaData}'
          proof-data='${bannerProofData}'
          actions-data='${bannerActionData}'
          items-data='${bannerItemsData}'
          links-data='${bannerLinkData}'
          variant="campaign"
          layout="split-media"
        >
          <div slot="media" style="display:grid;gap:0.55rem">
            <strong style="margin:0">Release board</strong>
            <div style="padding:1rem;border:1px dashed rgba(148,163,184,0.28);border-radius:1rem;background:rgba(255,255,255,0.72);display:grid;gap:0.35rem;">
              <span>Announcement</span>
              <span>Proof</span>
              <span>Next action</span>
            </div>
          </div>
        </eon-banner>
      `,
    },
  ],
  'eon-header-section': [
    {
      key: 'header-section-modernized-marketing',
      source: 'generated',
      title: 'Editorial section header',
      code: `
        <eon-header-section
          eyebrow="Program index"
          heading="Marketing foundation wave"
          description="Use section headers to frame grouped content with proof and actions before the deeper stories begin."
          meta-data='${marketingHeaderMetaData}'
          proof-data='${marketingHeaderProofData}'
          actions-data='${marketingHeaderActionData}'
          links-data='${marketingHeaderLinkData}'
          status-text="Updated today"
          layout="centered"
          variant="editorial"
        ></eon-header-section>
      `,
    },
  ],
  'eon-hero-header-section': [
    {
      key: 'hero-header-modernized-marketing',
      source: 'generated',
      title: 'Mock-to-component hero',
      code: `
        <eon-hero-header-section
          eyebrow="Launch ready"
          heading="Convert the mock direction into a real staged surface"
          description="Make the promise, proof, and next action obvious in one pass while the media panel keeps the rollout context visible."
          meta-data='${heroHeaderMetaData}'
          proof-data='${heroHeaderProofData}'
          actions-data='${heroHeaderActionData}'
          status-text="Staging reviewed"
          status-tone="success"
          variant="product"
          layout="split-media"
        >
          <div slot="media" style="display:grid;gap:0.75rem">
            <strong style="margin:0">Launch board snapshot</strong>
            <div style="padding:1rem;border-radius:1rem;background:linear-gradient(135deg,rgba(37,99,235,0.08),rgba(16,185,129,0.08));border:1px solid rgba(148,163,184,0.18);display:grid;gap:0.45rem;">
              <span>Wave 9 rollout</span>
              <span>Typed React surface</span>
              <span>Custom staging preview</span>
            </div>
          </div>
        </eon-hero-header-section>
      `,
    },
  ],
  'eon-inline-cta': [
    {
      key: 'inline-cta-modernized-marketing',
      source: 'generated',
      title: 'Typed wrapper CTA',
      code: `
        <eon-inline-cta
          eyebrow="Next step"
          heading="Bring the wrappers into your app shell"
          description="Use the compact CTA when the call to action belongs directly beside the copy, not on a separate hero."
          meta-data='${inlineCtaMetaData}'
          proof-data='${inlineCtaProofData}'
          actions-data='${inlineCtaActionData}'
          status-text="Ready for handoff"
          status-tone="success"
          variant="campaign"
          layout="centered"
        ></eon-inline-cta>
      `,
    },
  ],
  'eon-cta-section': [
    {
      key: 'cta-section-modernized-marketing',
      source: 'generated',
      title: 'Conversion editorial spread',
      code: `
        <eon-cta-section
          eyebrow="Get started"
          heading="Start building with EonUI"
          description="Combine conversion copy, proof, actions, and the next three rollout stories in one structured section."
          proof-data='${ctaSectionProofData}'
          actions-data='${ctaSectionActionData}'
          items-data='${ctaSectionItemsData}'
          links-data='${ctaSectionLinkData}'
          status-text="Conversion ready"
          status-tone="success"
          variant="campaign"
          layout="split-media"
        >
          <div slot="media" style="display:grid;gap:0.65rem">
            <strong style="margin:0">Pilot path</strong>
            <div style="display:grid;gap:0.45rem;padding:1rem;border-radius:1rem;border:1px solid rgba(148,163,184,0.18);background:rgba(255,255,255,0.78);">
              <span>Install</span>
              <span>Audit gaps</span>
              <span>Ship a pilot</span>
            </div>
          </div>
        </eon-cta-section>
      `,
    },
  ],
  'eon-newsletter-cta-section': [
    {
      key: 'newsletter-cta-modernized-marketing',
      source: 'generated',
      title: 'Launch digest signup',
      code: `
        <eon-newsletter-cta-section
          eyebrow="Launch notes"
          heading="Stay close to releases and field updates"
          description="Combine value, trust, and the subscription path in one editorial signup module."
          meta-data='${newsletterMetaData}'
          proof-data='${newsletterProofData}'
          actions-data='${newsletterActionData}'
          status-text="Weekly digest"
          status-tone="success"
          variant="editorial"
          layout="split-media"
        >
          <div slot="media" style="display:grid;gap:0.6rem">
            <strong style="margin:0">Brief preview</strong>
            <div style="padding:1rem;border-radius:1rem;background:rgba(37,99,235,0.06);border:1px solid rgba(148,163,184,0.18);display:grid;gap:0.35rem;">
              <span>Release highlights</span>
              <span>Design direction</span>
              <span>Next actions</span>
            </div>
          </div>
        </eon-newsletter-cta-section>
      `,
    },
  ],
  'eon-content-section': [
    {
      key: 'content-section-modernized-marketing',
      source: 'generated',
      title: 'Narrative content board',
      code: `
        <eon-content-section
          eyebrow="Story arc"
          heading="Why teams switch"
          description="Keep mixed narrative blocks, supporting metadata, and links visible in one structured content board."
          meta-data='${contentSectionMetaData}'
          items-data='${contentSectionItemsData}'
          links-data='${contentSectionLinkData}'
          status-text="Editorial narrative"
          variant="editorial"
        >
          <div slot="media" style="padding:1rem;border-radius:1rem;border:1px solid rgba(148,163,184,0.18);background:rgba(255,255,255,0.78);display:grid;gap:0.35rem;">
            <strong style="margin:0">Quote panel</strong>
            <span style="color:var(--eon-semantic-text-secondary, #475569);">"We finally have a staged surface that matches the mock direction."</span>
          </div>
        </eon-content-section>
      `,
    },
  ],
  'eon-features-section': [
    {
      key: 'features-section-modernized-marketing',
      source: 'generated',
      title: 'Feature grid with proof',
      code: `
        <eon-features-section
          eyebrow="Capability map"
          heading="Platform highlights"
          description="Frame the grouped product benefits as a structured feature board instead of a flat list."
          items-data='${featuresSectionItemsData}'
          proof-data='${featuresSectionProofData}'
          status-text="Structured benefits"
          status-tone="success"
          variant="product"
        ></eon-features-section>
      `,
    },
  ],
  'eon-faq-section': [
    {
      key: 'faq-section-modernized-marketing',
      source: 'generated',
      title: 'Docs-aware FAQ rail',
      code: `
        <eon-faq-section
          eyebrow="FAQ"
          heading="Frequently asked questions"
          description="Keep grouped questions, concise answers, and docs pointers visible together."
          items-data='${faqSectionItemsData}'
          links-data='${faqSectionLinkData}'
          status-text="Docs aligned"
          status-tone="success"
          variant="editorial"
        ></eon-faq-section>
      `,
    },
  ],
  'eon-footer': [
    {
      key: 'footer-modernized-marketing',
      source: 'generated',
      title: 'Structured footer summary',
      code: `
        <eon-footer
          eyebrow="Next steps"
          heading="Keep exploring"
          description="Close the content block with summary cards, metadata, supporting links, and two clear follow-up actions."
          items-data='${footerItemsData}'
          meta-data='${footerMetaData}'
          links-data='${footerLinkData}'
          actions-data='${footerActionData}'
          status-text="Support and docs"
          variant="product"
        ></eon-footer>
      `,
    },
  ],
  'eon-blog-section': [
    {
      key: 'blog-section-modernized-marketing',
      source: 'generated',
      title: 'Editorial story spread',
      code: `
        <eon-blog-section
          eyebrow="Editorial picks"
          heading="From the journal"
          description="Bring featured stories, proof, and follow-up reading into one structured editorial block."
          meta-data='${blogSectionMetaData}'
          proof-data='${blogSectionProofData}'
          actions-data='${blogSectionActionData}'
          items-data='${blogSectionItemsData}'
          links-data='${blogSectionLinkData}'
          status-text="Featured stories"
          variant="editorial"
          layout="split-media"
        >
          <div slot="media" style="display:grid;gap:0.55rem">
            <strong style="margin:0">Issue snapshot</strong>
            <div style="padding:1rem;border-radius:1rem;border:1px solid rgba(148,163,184,0.18);background:rgba(255,255,255,0.78);display:grid;gap:0.3rem;">
              <span>Launch story</span>
              <span>Playbook article</span>
              <span>Engineering note</span>
            </div>
          </div>
        </eon-blog-section>
      `,
    },
  ],
  'eon-careers-section': [
    {
      key: 'careers-section-modernized-marketing',
      source: 'generated',
      title: 'Hiring dock-and-detail',
      code: `
        <eon-careers-section
          eyebrow="Hiring now"
          heading="Join the team"
          description="Use the careers shell to combine hiring proof, open roles, and culture context without a page-specific fork."
          meta-data='${careersSectionMetaData}'
          proof-data='${careersSectionProofData}'
          actions-data='${careersSectionActionData}'
          items-data='${careersSectionItemsData}'
          links-data='${careersSectionLinkData}'
          status-text="Open roles"
          status-tone="success"
          variant="product"
          layout="split-media"
        >
          <div slot="aside" style="padding:0.9rem 1rem;border-radius:1rem;background:rgba(15,23,42,0.04);display:grid;gap:0.25rem;">
            <strong style="margin:0">Why this team</strong>
            <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">People join to work across design systems, runtime primitives, and adoption tooling in one tight loop.</span>
          </div>
        </eon-careers-section>
      `,
    },
  ],
  'eon-contact-section': [
    {
      key: 'contact-section-modernized-marketing',
      source: 'generated',
      title: 'Regional support board',
      code: `
        <eon-contact-section
          eyebrow="Reach the team"
          heading="Contact us"
          description="Present support, sales, and partner paths with response proof and next-step actions in one calmer shell."
          meta-data='${contactSectionMetaData}'
          proof-data='${contactSectionProofData}'
          actions-data='${contactSectionActionData}'
          items-data='${contactSectionItemsData}'
          links-data='${contactSectionLinkData}'
          status-text="Response channels"
          variant="product"
          layout="split-media"
        >
          <div slot="media" style="display:grid;gap:0.5rem">
            <strong style="margin:0">Coverage map</strong>
            <div style="padding:1rem;border-radius:1rem;background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(16,185,129,0.08));display:grid;gap:0.3rem;">
              <span>APAC desk</span>
              <span>Europe desk</span>
              <span>Americas desk</span>
            </div>
          </div>
        </eon-contact-section>
      `,
    },
  ],
  'eon-illustration': [
    {
      key: 'illustration-modernized-marketing',
      source: 'generated',
      title: 'Editorial empty-state shell',
      code: `
        <eon-illustration
          eyebrow="Visual cue"
          heading="Guide the next move"
          description="Keep the illustration, recovery copy, proof, and follow-up actions visible in one structured empty-state stage."
          label="Orbit"
          meta-data='${illustrationMetaData}'
          proof-data='${illustrationProofData}'
          actions-data='${illustrationActionData}'
          items-data='${illustrationItemsData}'
          links-data='${illustrationLinkData}'
          status-text="Editorial artwork"
          variant="campaign"
          layout="split-media"
        >
          <div slot="footer" style="font-size:0.82rem;color:var(--eon-semantic-text-secondary, #475569);">The built-in artwork stays available by default, but the media slot can replace it for campaign-specific visuals.</div>
        </eon-illustration>
      `,
    },
  ],
  'eon-metrics-section': [
    {
      key: 'metrics-section-modernized-marketing',
      source: 'generated',
      title: 'Program KPI board',
      code: `
        <eon-metrics-section
          eyebrow="Proof"
          heading="Program health"
          description="Use the metrics shell to keep KPIs, proof cards, export actions, and comparison links aligned in one board."
          meta-data='${metricsSectionMetaData}'
          proof-data='${metricsSectionProofData}'
          actions-data='${metricsSectionActionData}'
          items-data='${metricsSectionItemsData}'
          links-data='${metricsSectionLinkData}'
          status-text="Live metrics"
          status-tone="success"
          variant="product"
          layout="centered"
        >
          <div slot="media" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.5rem;">
            <div style="height:4rem;border-radius:0.9rem;background:rgba(59,130,246,0.12);"></div>
            <div style="height:5.2rem;border-radius:0.9rem;background:rgba(16,185,129,0.12);"></div>
            <div style="height:3.4rem;border-radius:0.9rem;background:rgba(245,158,11,0.12);"></div>
          </div>
        </eon-metrics-section>
      `,
    },
  ],
  'eon-pricing-section': [
    {
      key: 'pricing-section-modernized-marketing',
      source: 'generated',
      title: 'Plan comparison shell',
      code: `
        <eon-pricing-section
          eyebrow="Plans"
          heading="Pricing at a glance"
          description="Show tiers, proof, and conversion context without collapsing the comparison into one flat card row."
          meta-data='${pricingSectionMetaData}'
          proof-data='${pricingSectionProofData}'
          actions-data='${pricingSectionActionData}'
          items-data='${pricingSectionItemsData}'
          links-data='${pricingSectionLinkData}'
          status-text="Plan comparison"
          variant="campaign"
          layout="centered"
        ></eon-pricing-section>
      `,
    },
  ],
  'eon-social-proof-section': [
    {
      key: 'social-proof-section-modernized-marketing',
      source: 'generated',
      title: 'Outcome-led endorsement rail',
      code: `
        <eon-social-proof-section
          eyebrow="Trusted by teams"
          heading="Why product teams stay"
          description="Layer endorsements, proof, and next actions into one social-proof rail that still feels editorial."
          meta-data='${socialProofSectionMetaData}'
          proof-data='${socialProofSectionProofData}'
          actions-data='${socialProofSectionActionData}'
          items-data='${socialProofSectionItemsData}'
          links-data='${socialProofSectionLinkData}'
          status-text="Customer outcomes"
          status-tone="success"
          variant="editorial"
          layout="split-media"
        >
          <div slot="media" style="display:flex;flex-wrap:wrap;gap:0.55rem;">
            <span style="padding:0.45rem 0.75rem;border-radius:999px;background:rgba(15,23,42,0.08);">Northwind</span>
            <span style="padding:0.45rem 0.75rem;border-radius:999px;background:rgba(15,23,42,0.08);">Aster Labs</span>
            <span style="padding:0.45rem 0.75rem;border-radius:999px;background:rgba(15,23,42,0.08);">Signal Foundry</span>
          </div>
        </eon-social-proof-section>
      `,
    },
  ],
  'eon-team-section': [
    {
      key: 'team-section-modernized-marketing',
      source: 'generated',
      title: 'People and culture spread',
      code: `
        <eon-team-section
          eyebrow="People"
          heading="Meet the builders"
          description="Give the team section a structured people contract with avatars, proof, and follow-up links."
          meta-data='${teamSectionMetaData}'
          proof-data='${teamSectionProofData}'
          actions-data='${teamSectionActionData}'
          items-data='${teamSectionItemsData}'
          links-data='${teamSectionLinkData}'
          status-text="Core contributors"
          variant="editorial"
          layout="split-media"
        >
          <div slot="aside" style="padding:0.95rem 1rem;border-radius:1rem;border:1px solid rgba(148,163,184,0.18);background:rgba(255,255,255,0.78);display:grid;gap:0.25rem;">
            <strong style="margin:0">Working style</strong>
            <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Small, cross-functional, and close to staging so the examples stay believable.</span>
          </div>
        </eon-team-section>
      `,
    },
  ],
  'eon-testimonial-section': [
    {
      key: 'testimonial-section-modernized-marketing',
      source: 'generated',
      title: 'Customer voice stack',
      code: `
        <eon-testimonial-section
          eyebrow="Customer voice"
          heading="What teams say"
          description="Keep quotes, proof, and share actions visible together so the testimonial block reads like evidence, not filler."
          meta-data='${testimonialSectionMetaData}'
          proof-data='${testimonialSectionProofData}'
          actions-data='${testimonialSectionActionData}'
          items-data='${testimonialSectionItemsData}'
          links-data='${testimonialSectionLinkData}'
          status-text="Stories from the field"
          status-tone="success"
          variant="editorial"
          layout="centered"
        ></eon-testimonial-section>
      `,
    },
  ],
};

const overrides = {
  'eon-button': () => '<eon-button>Save changes</eon-button>',
  'eon-icon-button': () => '<eon-icon-button label="Open search">Go</eon-icon-button>',
  'eon-input': () => '<eon-input label="Workspace name" value="Northwind Labs" placeholder="Enter a name" help-text="Shown in audit logs and review queues." show-clear-button></eon-input>',
  'eon-textarea': () => '<eon-textarea label="Summary" value="Investigate anomaly clusters across the trading workspace." rows="5" show-count max-length="180" help-text="Use this note for reviewer handoff."></eon-textarea>',
  'eon-checkbox': () => '<eon-checkbox label="Notify the compliance channel" checked help-text="A matching audit note will be stored automatically."></eon-checkbox>',
  'eon-radio': () => `
    <eon-stack gap="0.75rem">
      <eon-radio name="cadence" label="Daily digest" checked></eon-radio>
      <eon-radio name="cadence" label="Weekly board summary"></eon-radio>
    </eon-stack>
  `,
  'eon-switch': () => '<eon-switch label="Enable live alerts" checked show-text on-text="On" off-text="Off"></eon-switch>',
  'eon-select': () => '<eon-select label="Workspace role" value="Editor" options="Admin,Editor,Viewer" help-text="Switch the permission profile for this view."></eon-select>',
  'eon-badge': () => '<eon-badge tone="success">Live</eon-badge>',
  'eon-alert': () => `
    <eon-alert tone="warning">
      <span slot="title" style="display:grid;gap:0.2rem">
        <strong style="margin:0">Manual review pending</strong>
        <span style="font-size:0.84rem;color:var(--eon-semantic-text-secondary, #475569);">Heading content can now be authored through the title slot.</span>
      </span>
      Analysts still need to sign off on the final rule changes.
    </eon-alert>
  `,
  'eon-avatar': () => '<eon-avatar name="Ariana Singh" size="lg"></eon-avatar>',
  'eon-breadcrumb': () => '<eon-breadcrumb items="Security,Workspace,Incident review"></eon-breadcrumb>',
  'eon-card': () => wrapPanel('Executive Summary', '<p>Pair cards with stack and grid primitives when you want a denser review surface.</p><eon-button variant="outline">Open report</eon-button>'),
  'eon-chip': () => '<eon-chip removable>Quarterly review</eon-chip>',
  'eon-divider': () => '<eon-stack gap="0.75rem"><span>Signal overview</span><eon-divider></eon-divider><span>Resolution details</span></eon-stack>',
  'eon-empty-state': () => '<eon-empty-state heading="No incidents matched" description="Adjust the filters or widen the investigation window."></eon-empty-state>',
  'eon-pagination': () => '<eon-pagination variant="advanced" page="3" total="12" page-size="25" show-page-buttons></eon-pagination>',
  'eon-tabs': () => '<eon-tabs labels="Overview,Signals,Escalations"><p>Use tabs to switch between major slices of a workflow without leaving the current page.</p></eon-tabs>',
  'eon-skeleton': () => '<eon-stack gap="0.75rem"><eon-skeleton width="16rem" height="1.2rem"></eon-skeleton><eon-skeleton width="100%" height="5rem" radius="1rem"></eon-skeleton><eon-skeleton width="60%" height="1rem"></eon-skeleton></eon-stack>',
  'eon-toolbar': () => '<eon-toolbar aria-label="Review actions"><eon-button variant="outline">Archive</eon-button><eon-button variant="outline">Share</eon-button><eon-button>Publish</eon-button></eon-toolbar>',
  'eon-toast': () => `
    <eon-toast tone="success" duration="5000" show-progress-bar pause-on-hover show-close-button show-timestamp density="compact">
      <div slot="title" style="display:grid;gap:0.2rem">
        <strong style="margin:0">Saved</strong>
      </div>
      Workspace changes are live.
      <span slot="actions"><eon-button size="sm" variant="ghost">Undo</eon-button></span>
    </eon-toast>
  `,
  'eon-drawer': () => `
    <eon-drawer open label="Workspace navigation" heading="Workspace navigation">
      <div slot="title" style="display:grid;gap:0.2rem">
        <strong style="margin:0">Workspace navigation</strong>
      </div>
      <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.92rem;">
        Use title and description slots when the drawer header needs richer composition.
      </div>
      <div style="display:grid;gap:0.75rem">
        <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.6;">Use drawers for contextual navigation, filters, or supporting task details.</p>
        <eon-stack gap="0.65rem">
          <eon-chip>Overview</eon-chip>
          <eon-chip>Members</eon-chip>
          <eon-chip>Audit log</eon-chip>
        </eon-stack>
      </div>
      <eon-toolbar slot="footer" aria-label="Drawer footer actions">
        <eon-button variant="outline">Close</eon-button>
        <eon-button>Open full workspace</eon-button>
      </eon-toolbar>
    </eon-drawer>
  `,
  'eon-dialog': () => `
    <eon-dialog open heading="Confirm release" description="Review the checklist before you publish the updated workflow.">
      <div slot="title" style="display:grid;gap:0.2rem">
        <strong style="margin:0">Confirm release</strong>
      </div>
      <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.95rem;">
        Dialog headers can now accept richer title and description slot content without replacing the full header.
      </div>
      <p>Dialogs work well for focused confirmations and review loops.</p>
      <eon-toolbar slot="footer" aria-label="Dialog footer actions">
        <eon-button variant="outline">Cancel</eon-button>
        <eon-button>Publish</eon-button>
      </eon-toolbar>
    </eon-dialog>
  `,
  'eon-action-sheet': () => `
    <div style="display:grid;gap:1rem;justify-items:start;max-width:30rem">
      <eon-button data-action-sheet-trigger>Open workspace actions</eon-button>
      <p data-action-sheet-status style="margin:0;color:var(--eon-semantic-text-secondary, #475569);font:inherit;">
        Launch the action sheet to inspect the selection flow.
      </p>
      <eon-action-sheet
        heading="Workspace actions"
        description="Choose the next step for this staged review."
        items="Communication/Message owner|message-owner||Send a threaded update.; Review/Request approval|request-approval||Notify approvers and attach the summary.; Danger/Delete draft|delete-draft|danger|This cannot be undone."
        cancel-text="Close"
      >
        <div slot="title" style="display:grid;gap:0.2rem">
          <strong style="margin:0">Workspace actions</strong>
        </div>
        <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.92rem;">
          Header slots can now carry richer copy without replacing the action list itself.
        </div>
        <eon-toolbar slot="footer" aria-label="Action sheet footer helpers">
          <eon-button variant="outline">Need help?</eon-button>
        </eon-toolbar>
      ></eon-action-sheet>
    </div>
  `,
  'eon-spinner': () => '<eon-spinner label="Refreshing the staged workspace"></eon-spinner>',
  'eon-stack': () => '<eon-stack gap="1rem"><eon-chip>Audit</eon-chip><eon-card><p>Stacks keep one-dimensional rhythm consistent.</p></eon-card><eon-button>Primary action</eon-button></eon-stack>',
  'eon-grid': () => '<eon-grid min="15rem" gap="1rem"><eon-card><p>Signal review</p></eon-card><eon-card><p>Escalation queue</p></eon-card><eon-card><p>Publishing checks</p></eon-card></eon-grid>',
  'eon-surface': () => '<eon-surface elevated><eon-stack gap="0.75rem"><strong>Surface container</strong><p>Use surfaces as the quiet framing layer around denser content.</p></eon-stack></eon-surface>',
  'eon-section': () => '<eon-section heading="Review workspace" description="A section establishes hierarchy and leaves room for actions."><eon-toolbar slot="actions"><eon-button variant="outline">Export</eon-button><eon-button>Share</eon-button></eon-toolbar><eon-card><p>Section content can be any EonUI composition.</p></eon-card></eon-section>',
  'eon-menu': () => `<eon-menu items="${menuTree}" orientation="vertical" value="Workspace/Overview" show-descriptions></eon-menu>`,
  'eon-context-menu': () => `<eon-context-menu items="${menuTree}" show-descriptions><div style="padding:1rem;border:1px dashed rgba(125,125,125,.35);border-radius:1rem;">Right click this card to inspect the context menu.</div></eon-context-menu>`,
  'eon-stepper': () => `<eon-stepper items="${stepperItems}" current="1" completed="Discovery" display-mode="icons" variant="inline" indicator-style="featured"></eon-stepper>`,
  'eon-autocomplete': () => '<eon-autocomplete label="Saved searches" suggestions="Signal review,Security audit,Workspace brief,Quarterly memo" value="Signal review" show-clear-button></eon-autocomplete>',
  'eon-radio-group': () => `<eon-radio-group label="Default role" items="${labeledOptions}" value="editor" show-descriptions></eon-radio-group>`,
  'eon-select-box': () => `<eon-select-box label="Choose a reviewer" items="${groupedOptions}" value="delivery" grouped render-in-viewport search-enabled show-clear-button opened></eon-select-box>`,
  'eon-lookup': () => `<eon-lookup label="Owner" heading="Select workspace owner" items="${groupedOptions}" value="delivery" grouped search-enabled show-clear-button></eon-lookup>`,
  'eon-drop-down-box': () => `<eon-drop-down-box label="Destination" items="${pickerTreeItems}" value="Workspace/Strategy" content-type="tree" search-enabled show-clear-button show-drop-down-button opened></eon-drop-down-box>`,
  'eon-tag-box': () => `
    <eon-tag-box
      label="Watchlist tags"
      items-data='${structuredSelectionItems}'
      value="owner,review"
      status-text="2 selected"
      search-enabled
      accept-custom-value
      show-clear-button
      show-drop-down-button
      show-selection-controls
      variant="outlined"
    ></eon-tag-box>
  `,
  'eon-verification-code-input': () => `
    <eon-verification-code-input
      label="Confirm secure action"
      description="Enter the code before publishing the staged release."
      caption="We sent a 6-digit code to &bull;&bull;&bull;&bull;&bull;&bull;34"
      value="483921"
      status-text="Trusted device"
      status-tone="success"
      delivery-hints-data='${verificationCodeDeliveryHints}'
      variant="outlined"
    ></eon-verification-code-input>
  `,
  'eon-html-editor': () => `
    <eon-html-editor
      label="Release notes editor"
      description="Capture the launch narrative, block settings, and publish checks in one place."
      view-mode="split"
      source-format="markdown"
      toolbar-preset="editorial"
      status-text="Autosaved"
      status-tone="success"
      header-stats-data='${htmlEditorHeaderStats}'
      blocks-data='${htmlEditorBlocks}'
      inspector-data='${htmlEditorInspector}'
      comments-data='${htmlEditorComments}'
      validation-data='${htmlEditorValidation}'
      publish-data='${htmlEditorPublishSteps}'
      outline-data='${htmlEditorOutline}'
      shortcut-hints-data='${htmlEditorShortcuts}'
      variant="outlined"
    ></eon-html-editor>
  `,
  'eon-number-box': () => '<eon-number-box label="Budget" value="24000" min="0" max="50000" step="500" format="currency" currency="USD" show-spin-buttons></eon-number-box>',
  'eon-slider': () => '<eon-slider label="Confidence threshold" value="72" min="0" max="100" step="1" value-suffix="%" show-labels show-tooltip show-ticks show-tick-labels></eon-slider>',
  'eon-range-slider': () => '<eon-range-slider label="Coverage range" start="20" end="80" min="0" max="100" step="5" value-suffix="%" show-labels show-tooltips show-range-fill show-ticks show-tick-labels></eon-range-slider>',
  'eon-range-selector': () => `
    <eon-range-selector
      heading="Coverage budget"
      description="Keep range context, presets, and summary metrics visible while refining the approved window."
      start="40"
      end="240"
      min="0"
      max="500"
      step="10"
      format="currency"
      currency="USD"
      result-text="240 matching records"
      status-text="Applied"
      status-tone="success"
      show-apply-button
      variant="outlined"
      presets-data='${rangeSelectorPresets}'
      distribution-data='${rangeSelectorDistributionData}'
      summary-data='${rangeSelectorSummaryData}'
    ></eon-range-selector>
  `,
  'eon-speech-to-text': () => `
    <eon-speech-to-text
      label="Release notes dictation"
      description="Capture the spoken staging summary and turn it into structured text."
      value="We have completed the parity review and the modernized examples are ready for sign-off."
      display-mode="button"
      status-text="Live session"
      status-tone="warning"
      preview-state="listening"
      preview-duration="15"
      available-languages-data='${speechLanguageOptions}'
      transcript-entries-data='${speechTranscriptEntries}'
      use-cases-data='${speechUseCases}'
      shortcut-hints-data='${speechShortcutHints}'
      show-settings-panel
      show-compact-preview
      variant="outlined"
    ></eon-speech-to-text>
  `,
  'eon-calendar': () => '<eon-calendar value="2026-05-30" show-today-button></eon-calendar>',
  'eon-date-box': () => '<eon-date-box label="Review date" type="date" value="2026-05-30" show-today-button show-clear-button></eon-date-box>',
  'eon-date-range-box': () => '<eon-date-range-box label="Investigation window" start="2026-05-01" end="2026-05-30" show-summary show-picker-buttons></eon-date-range-box>',
  'eon-tree-view': () => `<eon-tree-view items="${treeItems}" selected="Workspace/Incidents/Critical" selection-mode="multiple" show-toolbar show-status show-select-all></eon-tree-view>`,
  'eon-accordion': () => `
    <eon-stack gap="1rem">
      <eon-accordion summary="Release review workspace" open>
        <div slot="summary" style="display:grid;gap:0.35rem">
          <strong style="margin:0">Release review workspace</strong>
          <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.92rem;">
            Header content now comes from the summary slot, so richer trigger layouts are possible.
          </span>
        </div>
        <div style="display:grid;gap:1rem">
          <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.6;">
            Use the summary slot for richer trigger content when one disclosure needs more than a plain text title.
          </p>
          <eon-grid min="11rem" gap="0.75rem">
            <eon-card><p style="margin:0">12 checks passed</p></eon-card>
            <eon-card><p style="margin:0">3 items need review</p></eon-card>
            <eon-card><p style="margin:0">2 approvals pending</p></eon-card>
            <eon-card><p style="margin:0">1 release blocked</p></eon-card>
          </eon-grid>
        </div>
      </eon-accordion>

      <eon-accordion summary="Owner handoff">
        <div slot="summary" style="display:grid;gap:0.35rem">
          <strong style="margin:0">Owner handoff</strong>
          <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.92rem;">
            Each disclosure in this stack can use the same slotted-header pattern.
          </span>
        </div>
        <div style="display:grid;gap:0.75rem">
          <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.6;">
            Hand off the release with the reviewer, status, and remaining action items in one compact section.
          </p>
          <eon-toolbar aria-label="Owner handoff actions">
            <eon-button variant="outline">Assign owner</eon-button>
            <eon-button>Send summary</eon-button>
          </eon-toolbar>
        </div>
      </eon-accordion>

      <eon-accordion summary="Risk review">
        <div slot="summary" style="display:grid;gap:0.35rem">
          <strong style="margin:0">Risk review</strong>
          <span style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.92rem;">
            Keep additional slotted headers available when audit details need stronger hierarchy.
          </span>
        </div>
        <div style="display:grid;gap:0.75rem">
          <eon-stack gap="0.65rem">
            <eon-chip removable>Audit notes</eon-chip>
            <eon-chip removable>Stakeholder review</eon-chip>
            <eon-chip removable>Publish checklist</eon-chip>
          </eon-stack>
          <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.6;">
            Use separate disclosures when the design needs more than one slot-based header today.
          </p>
        </div>
      </eon-accordion>
    </eon-stack>
  `,
  'eon-popover': () => `
    <eon-popover label="Workspace summary" heading="Workspace summary" width="19rem">
      <span slot="trigger">Review details</span>
      <div slot="title" style="display:grid;gap:0.2rem">
        <strong style="margin:0">Workspace summary</strong>
      </div>
      <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.9rem;">
        Popovers now support title and description slots alongside the trigger slot.
      </div>
      <p style="margin:0">Use a popover when people need lightweight context without leaving the current surface.</p>
      <eon-toolbar slot="footer" aria-label="Popover footer actions">
        <eon-button variant="outline">Open workspace</eon-button>
      </eon-toolbar>
    </eon-popover>
  `,
  'eon-popup': () => `
    <eon-popup open heading="Information" eyebrow="Workspace summary" status="Live" description="Use popups for deeper task details and focused content." sticky-footer>
      <span slot="eyebrow">Workspace summary</span>
      <div slot="title" style="display:grid;gap:0.2rem">
        <strong style="margin:0">Information</strong>
      </div>
      <span slot="status" style="padding:0.22rem 0.7rem;border-radius:999px;background:rgba(16,185,129,0.14);color:#047857;font-size:0.78rem;font-weight:700;">Live</span>
      <div slot="description" style="color:var(--eon-semantic-text-secondary, #475569);font-size:0.92rem;">
        Popup headers now support eyebrow, title, description, and status slots without replacing the full header.
      </div>
      <span slot="subtitle">652 Avonwick Gate</span>
      <p>Keep the popup structured when the content includes both context and actions.</p>
      <eon-toolbar slot="footer" aria-label="Popup footer actions">
        <eon-button variant="outline">Send</eon-button>
        <eon-button>Close</eon-button>
      </eon-toolbar>
    </eon-popup>
  `,
};

const sampleCollectionsByTag = {
  'eon-accordion': {
    items: 'Release review|Review the current launch summary before sign-off.;Owner handoff|Confirm who publishes the update and who monitors it next.;Risk register|Track blockers, audit concerns, and final mitigations.',
    value: 'Release review;Risk register'
  },
  'eon-autocomplete': {
    suggestions: 'Signal review,Security audit,Workspace brief,Quarterly memo'
  },
  'eon-breadcrumb': {
    items: 'Security,Workspace,Incident review'
  },
  'eon-button-group': {
    items: 'Overview|overview||Monitor the live summary;Escalate|escalate||Notify the response team;Publish|publish||Release the final update'
  },
  'eon-command-menu': {
    items: 'Open settings|Cmd+,|Jump to workspace settings|Navigation;Create component|Cmd+K|Start a new component shell|Action;Request approval|Cmd+Enter|Notify the release approvers|Review;Archive workspace|Shift+A|Move this workspace into the historic queue|Danger'
  },
  'eon-context-menu': {
    items: menuTree
  },
  'eon-drop-down-box': {
    items: pickerTreeItems,
    value: 'Workspace/Strategy'
  },
  'eon-dropdown-menu': {
    items: menuTree
  },
  'eon-faq-section': {
    items: 'How does review work?|Invite reviewers and compare examples in staging.;Can I test themes?|Switch between generic, material, and fluent instantly.;Where do examples come from?|Manifest stories, generated playgrounds, and modernized blueprint variants.'
  },
  'eon-features-section': {
    items: 'Richer examples|Every component now gets a modernized staging pass.;Template-first direction|Slots and structured data stay visible in staging.;Cross-family checks|Compare density, state, and theme behavior quickly.'
  },
  'eon-footer': {
    items: 'Docs|Product|Browse the core component catalog and parity notes.|Components;Guides|Reference|Inspect richer examples, slots, and state patterns.|Patterns;Support|Workspace|Share implementation issues and rollout questions.|Help'
  },
  'eon-gallery': {
    items: 'Signal desk|https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80;Review board|https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80;Launch room|https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80'
  },
  'eon-header-navigation': {
    items: 'Overview|Home|Workspace summary and launch status|Primary;Signals|Monitoring|Track runtime changes and watchlist alerts.|Live;Approvals|Queue|Compare release decisions and pending reviewers.|Review;Archive|History|Open previous audit snapshots and notes.|Docs'
  },
  'eon-page-header': {
    breadcrumbsData: pageHeaderBreadcrumbsData,
    breadcrumbValue: 'workspace/releases/june-launch',
    metaData: pageHeaderMetaData,
    proofData: pageHeaderProofData,
    actionsData: pageHeaderActionData,
    meta: 'Current core registry coverage'
  },
  'eon-list': {
    items: 'Launch review|Confirm the staging refresh is visible.;Design check|Compare generic, material, and fluent modes.;Release handoff|Share the approved example markup.'
  },
  'eon-lookup': {
    items: groupedOptions,
    value: 'delivery'
  },
  'eon-menu': {
    items: menuTree
  },
  'eon-pagination': {
    page: '3',
    total: '12'
  },
  'eon-radio-group': {
    items: labeledOptions,
    value: 'editor'
  },
  'eon-select': {
    options: 'Admin,Editor,Viewer',
    value: 'Editor'
  },
  'eon-select-box': {
    items: groupedOptions,
    value: 'delivery'
  },
  'eon-section-footer': {
    items: 'Docs|Browse source packages|Packages;Support|Open an implementation thread|Help;Status|Review build and test health|CI',
    itemsData: sectionFooterSummaryData,
    linksData: sectionFooterLinkData,
    statusData: sectionFooterStatusData,
    actionsData: sectionFooterActionData
  },
  'eon-section-header': {
    metaData: sectionHeaderMetaData,
    anchorsData: sectionHeaderAnchorData,
    actionsData: sectionHeaderActionData,
    value: 'approvals',
    icon: 'RC',
    meta: 'Updated today'
  },
  'eon-sidebar-navigation': {
    items: 'Overview|Workspace|Release summary and current status.|Pinned;Review queue|Operations|Compare blockers, comments, and current owners.|Live;Approvals|Governance|Track sign-off state and legal review.|Review;Archive|History|Return to previous release snapshots.|Docs'
  },
  'eon-stepper': {
    items: stepperItems,
    current: '1'
  },
  'eon-tabs': {
    labels: 'Overview,Signals,Escalations'
  },
  'eon-tag-box': {
    items: labeledOptions,
    value: 'admin,viewer'
  },
  'eon-team-section': {
    items: 'Ariana Singh|Design systems lead;Noah Patel|Staging runtime engineer;Mira Chen|Review workflow owner'
  },
  'eon-testimonial-section': {
    items: 'The new staging explorer finally makes parity visible.|Platform team;The examples now read like product-ready stories, not empty shells.|Design review'
  },
  'eon-tree-view': {
    items: treeItems,
    selected: 'Workspace/Incidents/Critical'
  }
};

const sampleValueByPropName = {
  actionLabel: 'Apply',
  badge: 'Live',
  caption: 'Use the refreshed example to compare hierarchy and state handling.',
  currency: 'USD',
  description: 'Use the refreshed staging pass to compare hierarchy, density, and interaction clarity.',
  eyebrow: 'Modernized preview',
  heading: 'Release review workspace',
  helpText: 'Use this refreshed example to compare hierarchy, spacing, and state handling.',
  label: 'Release review workspace',
  language: 'tsx',
  locale: 'en-US',
  meta: 'Updated 5 minutes ago',
  name: 'releaseReview',
  onText: 'On',
  offText: 'Off',
  placeholder: 'Search the review workspace',
  primaryLabel: 'Apply changes',
  query: 'Search commands',
  secondaryLabel: 'Review details',
  status: 'Live',
  statusTone: 'success',
  subtitle: 'Compare the refreshed component direction in staging.',
  summary: 'Release review workspace',
  title: 'Release review workspace',
  unit: '%',
  value: 'Northwind Labs'
};

function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function getModernizerFeedback(entry) {
  if (entry.kind === 'chart-spec') {
    return null;
  }

  return modernizerFeedback[entry.tag] || null;
}

function extractUnionOptions(type = '') {
  const values = [];
  const pattern = /"([^"]+)"|'([^']+)'/g;
  let match = pattern.exec(type);

  while (match) {
    values.push(match[1] || match[2]);
    match = pattern.exec(type);
  }

  return [...new Set(values)];
}

function chooseOption(options, preferred) {
  for (const candidate of preferred) {
    if (options.includes(candidate)) {
      return candidate;
    }
  }

  return options[0] || '';
}

function getCollectionSample(entry, propName) {
  return sampleCollectionsByTag[entry.tag]?.[propName] || '';
}

function getStructuredCollectionSample(entry, propName) {
  if (sampleCollectionsByTag[entry.tag]?.[propName]) {
    return sampleCollectionsByTag[entry.tag][propName];
  }

  if (propName === 'presetsData') {
    return entry.tag === 'eon-date-range-box' ? dateRangePresetItems : datePresetItems;
  }

  if (propName === 'filesData') {
    return uploaderSeedItems;
  }

  if (
    [
      'eon-dropdown-menu',
      'eon-command-menu',
      'eon-action-sheet',
      'eon-menu',
      'eon-context-menu',
      'eon-drop-down-button'
    ].includes(entry.tag)
  ) {
    return commandMenuItems;
  }

  if (entry.tag === 'eon-lookup') {
    return lookupDirectoryItems;
  }

  return structuredSelectionItems;
}

function getBooleanSample(propName) {
  if (
    [
      'showClearButton',
      'showRevealButton',
      'showCount',
      'multiple',
      'open',
      'checked',
      'searchEnabled',
      'showDropDownButton',
      'showSelectionControls',
      'grouped',
      'showTodayButton',
      'showSummary',
      'showPickerButtons',
      'showPageButtons',
      'showLabels',
      'showTooltips',
      'showTooltip',
      'showTicks',
      'showTickLabels',
      'showToolbar',
      'showStatus',
      'showText',
      'pauseOnHover',
      'showCloseButton',
      'stickyFooter',
      'elevated',
      'removable'
    ].includes(propName)
  ) {
    return true;
  }

  return false;
}

function getTypedSample(entry, prop) {
  const unionOptions = extractUnionOptions(prop.type);
  const propName = prop.name;

  if (propName === 'type' && unionOptions.length) {
    return chooseOption(unionOptions, ['search', 'text', 'email', 'password', 'date']);
  }

  if (propName === 'variant' && unionOptions.length) {
    return chooseOption(unionOptions, ['advanced', 'inline', 'outline', 'outlined', 'soft', 'quiet', 'default']);
  }

  if (propName === 'size' && unionOptions.length) {
    return chooseOption(unionOptions, ['lg', 'md', 'default']);
  }

  if (propName === 'tone' && unionOptions.length) {
    return chooseOption(unionOptions, ['success', 'warning', 'brand', 'primary', 'default']);
  }

  if (propName === 'format' && unionOptions.length) {
    return chooseOption(unionOptions, ['currency', 'decimal', 'fixed-point', 'percent']);
  }

  if (propName === 'align' && unionOptions.length) {
    return chooseOption(unionOptions, ['center', 'start']);
  }

  if (propName === 'orientation' && unionOptions.length) {
    return chooseOption(unionOptions, ['vertical', 'horizontal']);
  }

  if (propName === 'displayMode' && unionOptions.length) {
    return chooseOption(unionOptions, ['icons', 'icons-number', 'default']);
  }

  if (propName === 'indicatorStyle' && unionOptions.length) {
    return chooseOption(unionOptions, ['featured', 'default']);
  }

  if (propName === 'selectionMode' && unionOptions.length) {
    return chooseOption(unionOptions, ['multiple', 'single']);
  }

  if (propName === 'presentation' && unionOptions.length) {
    return chooseOption(unionOptions, ['sheet', 'popover', 'default']);
  }

  if (propName === 'legendMode' && unionOptions.length) {
    return chooseOption(unionOptions, ['top-regions', 'buckets']);
  }

  return '';
}

function getNumericSample(propName) {
  if (propName === 'page') return '3';
  if (propName === 'total') return '12';
  if (propName === 'pageSize') return '25';
  if (propName === 'current') return '1';
  if (propName === 'min') return '0';
  if (propName === 'max') return '100';
  if (propName === 'step') return '5';
  if (propName === 'start') return '20';
  if (propName === 'end') return '80';
  if (propName === 'duration') return '5000';
  if (propName === 'rows') return '4';
  if (propName === 'width') return '20rem';
  if (propName === 'height') return '12rem';
  return '';
}

function getPropSample(entry, prop) {
  const propName = prop.name;

  if (/Data$/.test(propName)) {
    return getStructuredCollectionSample(entry, propName);
  }

  if (propName === 'items' || propName === 'options' || propName === 'suggestions' || propName === 'labels') {
    return getCollectionSample(entry, propName);
  }

  if (propName === 'uploadAdapter') {
    return '';
  }

  if (sampleCollectionsByTag[entry.tag]?.[propName]) {
    return sampleCollectionsByTag[entry.tag][propName];
  }

  if (prop.type === 'boolean' || prop.type === 'Boolean') {
    return getBooleanSample(propName) ? true : '';
  }

  if (prop.type === 'number' || prop.type === 'number | undefined') {
    return getNumericSample(propName);
  }

  const typedSample = getTypedSample(entry, prop);
  if (typedSample) {
    return typedSample;
  }

  if (sampleValueByPropName[propName]) {
    return sampleValueByPropName[propName];
  }

  if (propName === 'value') {
    if (entry.tag === 'eon-number-box') return '24000';
    if (entry.tag === 'eon-date-box') return '2026-06-13';
    if (entry.tag === 'eon-date-range-box') return '2026-06-01';
    return 'Northwind Labs';
  }

  return '';
}

function createPropDrivenPlayground(entry) {
  const attributes = [];

  for (const prop of entry.props || []) {
    const value = getPropSample(entry, prop);

    if (value === '' || value == null) {
      continue;
    }

    if (value === true) {
      attributes.push(toKebabCase(prop.name));
      continue;
    }

    attributes.push(`${toKebabCase(prop.name)}="${String(value).replace(/"/g, '&quot;')}"`);
  }

  const slotContent = [];
  const slotNames = new Set((entry.slots || []).map((slot) => slot.name));

  if (slotNames.has('label')) {
    slotContent.push('<span slot="label">Release review workspace</span>');
  }
  if (slotNames.has('title')) {
    slotContent.push('<div slot="title"><strong>Release review workspace</strong></div>');
  }
  if (slotNames.has('eyebrow')) {
    slotContent.push('<span slot="eyebrow">Modernized preview</span>');
  }
  if (slotNames.has('description')) {
    slotContent.push('<span slot="description">Use the refreshed staging pass to compare hierarchy, density, and interaction clarity.</span>');
  }
  if (slotNames.has('status')) {
    slotContent.push('<span slot="status">Live</span>');
  }
  if (slotNames.has('prefix')) {
    slotContent.push('<span slot="prefix">AI</span>');
  }
  if (slotNames.has('suffix')) {
    slotContent.push('<span slot="suffix">Live</span>');
  }
  if (slotNames.has('trigger')) {
    slotContent.push('<eon-button slot="trigger" variant="outline">Open panel</eon-button>');
  }
  if (slotNames.has('action')) {
    slotContent.push('<button slot="action" type="button">Apply</button>');
  }
  if (slotNames.has('actions')) {
    slotContent.push('<eon-button slot="actions" size="sm">Apply</eon-button>');
  }
  if (slotNames.has('header')) {
    slotContent.push('<div slot="header"><strong>Review workspace</strong><p style="margin:0.35rem 0 0;color:var(--eon-semantic-text-secondary, #475569);">Use the header slot to layer richer status and actions.</p></div>');
  }
  if (slotNames.has('context')) {
    slotContent.push('<div slot="context"><strong>Current selection</strong><p style="margin:0.35rem 0 0;color:var(--eon-semantic-text-secondary, #475569);">Primary owner is tracking the current release checklist.</p></div>');
  }
  if (slotNames.has('media')) {
    slotContent.push('<div slot="media" style="min-height:8rem;border-radius:0.85rem;background:linear-gradient(135deg, rgba(59,130,246,0.12), rgba(16,185,129,0.12));"></div>');
  }
  if (slotNames.has('footer')) {
    slotContent.push('<eon-toolbar slot="footer" aria-label="Footer actions"><eon-button variant="outline">Close</eon-button><eon-button>Continue</eon-button></eon-toolbar>');
  }
  if (slotNames.has('loading')) {
    slotContent.push('<div slot="loading">Loading live workspace data…</div>');
  }
  if (slotNames.has('empty')) {
    slotContent.push('<div slot="empty">No matching records yet. Adjust the current review filters.</div>');
  }
  if (slotNames.has('error')) {
    slotContent.push('<div slot="error">The preview could not load the latest release data.</div>');
  }
  if (slotNames.has('help')) {
    slotContent.push('<span slot="help">Use this refreshed example to compare hierarchy, spacing, and state handling.</span>');
  }
  if (slotNames.has('success')) {
    slotContent.push('<span slot="success">Ready for the next review step.</span>');
  }

  const openTag = `<${entry.tag}${attributes.length ? ` ${attributes.join(' ')}` : ''}>`;
  const innerContent = slotContent.length
    ? `\n  ${slotContent.join('\n  ')}\n`
    : '\n';

  return `${openTag}${innerContent}</${entry.tag}>`;
}

function isMinimalManifestExample(entry, code) {
  const normalized = code.replace(/\s+/g, ' ').trim();

  if (!normalized.startsWith(`<${entry.tag}`) || !normalized.endsWith(`</${entry.tag}>`)) {
    return false;
  }

  if (normalized.includes(' slot=')) {
    return false;
  }

  const attributeCount = (normalized.match(/\s[\w-]+(?:=|(?=[\s>]))/g) || []).length;
  return attributeCount <= 2 && normalized.length <= 220;
}

function getBaseModernizedCode(entry) {
  const customExample = customExamples[entry.tag]?.[0]?.code;
  if (customExample) {
    return customExample.trim();
  }

  const manifestExample = entry.examples?.[0]?.code;
  if (manifestExample && !isMinimalManifestExample(entry, manifestExample)) {
    return manifestExample.trim();
  }

  const override = overrides[entry.tag];
  if (override) {
    return override(entry).trim();
  }

  return createPropDrivenPlayground(entry).trim();
}

function createModernizedPlayground(entry) {
  const feedback = getModernizerFeedback(entry);

  if (!feedback) {
    return getBaseModernizedCode(entry);
  }

  const baseCode = getBaseModernizedCode(entry);

  return `
    <eon-stack gap="1rem">
      <eon-card>
        <div style="display:grid;gap:0.75rem">
          <div style="display:flex;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;align-items:start;">
            <div style="display:grid;gap:0.2rem">
              <span style="font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--eon-semantic-text-secondary, #475569);">
                Modernized blueprint
              </span>
              <strong style="font-size:1.05rem;margin:0">${humanizeName(entry.name)}</strong>
            </div>
            <span style="padding:0.3rem 0.7rem;border-radius:999px;background:rgba(15,118,110,0.1);color:#0f766e;font-size:0.78rem;font-weight:700;">
              ${feedback.categoryLabel}
            </span>
          </div>
          <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.6;">
            ${feedback.focus}
          </p>
        </div>
      </eon-card>
      ${baseCode}
    </eon-stack>
  `;
}

export function humanizeName(value) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function createGeneratedPlayground(entry) {
  if (entry.kind === 'chart-spec') {
    return createChartSpecPlayground(entry);
  }

  const override = overrides[entry.tag];

  if (override) {
    return override(entry);
  }

  return `<${entry.tag}></${entry.tag}>`;
}

export { getModernizerFeedback };

export function getExampleOptions(entry) {
  if (entry.kind === 'chart-spec') {
    return [
      {
        key: 'generated',
        source: 'generated',
        title: 'Chart catalog summary',
        code: createGeneratedPlayground(entry),
      },
    ];
  }

  const manifestExamples = (entry.examples || []).map((example, index) => ({
    ...example,
    key: `manifest-${index}`,
    source: 'manifest',
  }));

  const generatedExample = {
    key: 'generated',
    source: 'generated',
    title: 'Generated playground',
    code: createGeneratedPlayground(entry),
  };

  const modernizedExample = entry.kind === 'chart-spec'
    ? null
    : {
        key: 'modernized',
        source: 'modernized',
        title: 'Modernized blueprint',
        code: createModernizedPlayground(entry),
      };

  if (customExamples[entry.tag]) {
    return [...manifestExamples, ...(modernizedExample ? [modernizedExample] : []), generatedExample, ...customExamples[entry.tag]];
  }

  return [
    ...manifestExamples,
    ...(modernizedExample ? [modernizedExample] : []),
    generatedExample,
  ];
}
