import { defineCustomElements } from '/vendor/eonui-core/dist/loader/index.js';
import { getExampleOptions, getModernizerFeedback, humanizeName } from './playgrounds.js';

await defineCustomElements(window);

async function loadLibraryManifest() {
  try {
    const response = await fetch('/data/library.manifest.json', { cache: 'no-store' });

    if (!response.ok) {
      return { components: [], charts: [] };
    }

    return await response.json();
  } catch (_error) {
    return { components: [], charts: [] };
  }
}

function getChartCatalogEntries(manifest) {
  return (manifest.charts || []).map((chart, index) => ({
      ...chart,
      kind: 'chart-spec',
      tag: `eon-chart-spec-${slugify(chart.name || `chart-${index + 1}`)}-${index + 1}`,
      category: `charts-${chart.family || 'catalog'}`,
      anatomy: ['renderer', 'series', 'data shape'],
      props: (chart.dataShape || []).map((field) => ({
        name: field.name,
        type: field.type,
        default: field.required ? 'required' : 'optional',
        description: field.description || 'Chart data field.'
      })),
      events: (chart.interactions || []).map((name) => ({
        name,
        description: 'Interaction concept from the chart catalog.'
      })),
      methods: [],
      slots: [],
      parts: (chart.series || []).map((name) => ({
        name,
        description: 'Renderer series primitive.'
      })),
      cssVariables: [],
      accessibility: [
        'Catalog entry sourced from the workspace chart manifest.',
        'Treat this as a chart specification reference until a live runtime is wired into the active workspace.'
      ],
      responsive: ['Responsive behavior depends on the eventual chart runtime or framework wrapper implementation.'],
      antiPatterns: ['Do not assume this chart specification is already shipped as a live custom element in the active core package.'],
      related: chart.d3Analogs || [],
      compositionRules: ['Implement through the dedicated chart runtime packages before treating this as a shipped component surface.'],
      spec: {
        visualAnatomy: chart.series || [],
        variants: chart.variants || ['default'],
        sizes: ['responsive'],
        states: chart.interactions || ['catalog reference'],
        interactions: chart.devextremeHints?.length
          ? chart.devextremeHints
          : ['Catalog-backed chart specification for future runtime work.'],
        accessibilityNotes: ['Interaction and keyboard behavior depend on the eventual chart runtime implementation.'],
        responsiveNotes: ['Renderer and layout behavior depend on the eventual chart runtime or wrapper implementation.'],
        devexpressParity: chart.devextremeHints || []
      }
  }));
}

async function loadMockScreenIndex() {
  try {
    const response = await fetch('/data/eonui-mock-screens.json', { cache: 'no-store' });

    if (!response.ok) {
      return { folders: [], components: {}, sharedByCategory: {} };
    }

    return await response.json();
  } catch (_error) {
    return { folders: [], components: {}, sharedByCategory: {} };
  }
}

async function loadMockDesignIndex() {
  try {
    const response = await fetch('/data/eonui-mock-designs.json', { cache: 'no-store' });

    if (!response.ok) {
      return { components: {}, sharedByCategory: {} };
    }

    return await response.json();
  } catch (_error) {
    return { components: {}, sharedByCategory: {} };
  }
}

const libraryManifest = await loadLibraryManifest();
const chartCatalogEntries = getChartCatalogEntries(libraryManifest);
const mockScreenIndex = await loadMockScreenIndex();
const mockDesignIndex = await loadMockDesignIndex();
const mockDesignsByComponent = new Map(Object.entries(mockDesignIndex.components || {}));
const mockSharedDesignsByCategory = new Map(Object.entries(mockDesignIndex.sharedByCategory || {}));
const componentEntries = (libraryManifest.components || [])
  .map((entry) => ({
    ...entry,
    displayName: humanizeName(entry.name),
    mockDesign: mockDesignsByComponent.get(entry.tag) || null,
  }));

const chartEntries = chartCatalogEntries
  .map((entry) => ({
    ...entry,
    displayName: humanizeName(entry.name),
    mockDesign: null,
  }));

const entries = [...componentEntries, ...chartEntries]
  .map((entry) => ({
    ...entry,
    exampleOptions: buildEntryExampleOptions(entry),
  }))
  .sort((left, right) => left.displayName.localeCompare(right.displayName));

const entriesByTag = new Map(entries.map((entry) => [entry.tag, entry]));
const mockExamplesByComponent = new Map(Object.entries(mockScreenIndex.components || {}));
const mockSharedExamplesByCategory = new Map(Object.entries(mockScreenIndex.sharedByCategory || {}));
const mockFolderCount = mockScreenIndex.folders?.length || 0;
const mockImageCount = [
  ...mockExamplesByComponent.values(),
  ...mockSharedExamplesByCategory.values(),
].reduce((total, items) => total + items.length, 0);
const scopeOptions = [
  { key: 'elements', label: 'Elements only' },
  { key: 'marketing', label: 'Marketing sections' },
  { key: 'catalog', label: 'Chart catalog' },
  { key: 'all', label: 'All surfaces' },
];
const searchParams = new URLSearchParams(window.location.search);
const previewMode = searchParams.get('mode') === 'preview';
const requestedExample = searchParams.get('example');
const app = document.querySelector('#app');

const state = {
  scope: scopeOptions.some((option) => option.key === searchParams.get('scope')) ? searchParams.get('scope') : 'elements',
  category: searchParams.get('category') || 'all',
  component: entriesByTag.has(searchParams.get('component') || '') ? searchParams.get('component') : entries[0]?.tag,
  example: requestedExample || '',
  search: searchParams.get('q') || '',
  themeFamily: ['generic', 'material', 'fluent'].includes(searchParams.get('theme') || '') ? searchParams.get('theme') : 'generic',
  scheme: searchParams.get('scheme') === 'dark' ? 'dark' : 'light',
  exampleCodeOverrides: {},
};

function getScopeEntries() {
  switch (state.scope) {
    case 'marketing':
      return componentEntries.filter((entry) => entry.category === 'marketing');
    case 'catalog':
      return chartEntries;
    case 'all':
      return entries;
    case 'elements':
    default:
      return componentEntries.filter((entry) => entry.category !== 'marketing');
  }
}

function getAvailableCategories() {
  const source = previewMode ? entries : getScopeEntries();
  return ['all', ...new Set(source.map((entry) => entry.category))];
}

function getDashboardEntries() {
  const scopedEntries = getScopeEntries();

  if (!scopedEntries.length) {
    return entries;
  }

  if (state.category === 'all') {
    return scopedEntries;
  }

  return scopedEntries.filter((entry) => entry.category === state.category);
}

function getScopeSummary() {
  const scopedEntries = getScopeEntries();

  switch (state.scope) {
    case 'marketing':
      return {
        title: 'Marketing sections',
        count: scopedEntries.length,
        description: 'Landing and content sections are separated from reusable element QA so the explorer stays calmer.',
      };
    case 'catalog':
      return {
        title: 'Chart catalog',
        count: scopedEntries.length,
        description: 'Specification-backed chart references stay available without mixing into the live element review queue.',
      };
    case 'all':
      return {
        title: 'All surfaces',
        count: scopedEntries.length,
        description: 'Includes live reusable elements, marketing sections, and chart catalog references.',
      };
    case 'elements':
    default:
      return {
        title: 'Elements only',
        count: scopedEntries.length,
        description: 'Focused on reusable actions, forms, navigation, layout, feedback, data-display, and specialist elements.',
      };
  }
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function sanitizeExampleKey(value) {
  return slugify(value || 'mock-concept');
}

function trimItems(items, count = 3) {
  return (Array.isArray(items) ? items : []).filter(Boolean).slice(0, count);
}

function dedupeExampleOptions(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = item?.key || sanitizeExampleKey(item?.title || 'example');

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function renderMockList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function getMockExamplePriority(example) {
  if (example.source === 'manifest') {
    return 0;
  }

  if (example.key !== 'generated' && example.source !== 'modernized') {
    return 1;
  }

  if (example.source === 'modernized') {
    return 2;
  }

  if (example.key === 'generated') {
    return 3;
  }

  return 4;
}

function pickMockBaseExample(baseExamples) {
  const ranked = [...baseExamples].sort((left, right) => getMockExamplePriority(left) - getMockExamplePriority(right));
  return ranked[0] || baseExamples[0];
}

function getMockReferenceExamples(baseExamples, limit = 4) {
  const ranked = [...baseExamples]
    .filter((example) => example.source !== 'mock' && example.source !== 'mock-shared')
    .sort((left, right) => getMockExamplePriority(left) - getMockExamplePriority(right));

  return ranked.slice(0, limit);
}

function ensureExampleSlots(examples, count = 3) {
  if (!examples.length) {
    return [];
  }

  const result = [];

  for (let index = 0; index < count; index += 1) {
    result.push(examples[index] || examples[index % examples.length]);
  }

  return result;
}

function renderBoardTag(label, options = {}) {
  const {
    background = 'rgba(37, 99, 235, 0.1)',
    color = '#1d4ed8',
  } = options;

  return `<span style="display:inline-flex;align-items:center;min-height:1.85rem;padding:0.2rem 0.7rem;border-radius:999px;background:${background};color:${color};font-size:0.76rem;font-weight:700;">${escapeHtml(label)}</span>`;
}

function renderBoardSidebarSection(title, items) {
  const visibleItems = trimItems(items, 5);

  if (!visibleItems.length) {
    return '';
  }

  return `
    <div style="display:grid;gap:0.45rem">
      <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">${escapeHtml(title)}</span>
      <div style="display:grid;gap:0.45rem">
        ${visibleItems
          .map(
            (item) => `
              <div style="display:flex;gap:0.55rem;align-items:flex-start;color:#5f5347;line-height:1.55;">
                <span style="width:0.45rem;height:0.45rem;margin-top:0.5rem;border-radius:999px;background:rgba(37,99,235,0.85);flex:none;"></span>
                <span>${escapeHtml(item)}</span>
              </div>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function createMockInsightPanel(title, items) {
  const visibleItems = trimItems(items);

  if (!visibleItems.length) {
    return '';
  }

  return `
    <article style="display:grid;gap:0.6rem;padding:0.9rem 1rem;border-radius:1rem;background:rgba(255,255,255,0.78);border:1px solid rgba(120,94,62,0.12);">
      <strong style="font-size:0.92rem">${escapeHtml(title)}</strong>
      <ul style="margin:0;padding-left:1rem;color:var(--eon-semantic-text-secondary, #475569);line-height:1.6;">
        ${renderMockList(visibleItems)}
      </ul>
    </article>
  `;
}

function renderBoardSpecimen(example, options = {}) {
  const {
    title = example?.title || 'Live example',
    minHeight = '9rem',
    accent = '#2563eb',
  } = options;

  return `
    <article style="display:grid;gap:0.75rem;padding:0.9rem 1rem;border-radius:1.15rem;border:1px solid rgba(148, 163, 184, 0.22);background:rgba(255,255,255,0.88);box-shadow:0 10px 30px rgba(148,163,184,0.14);">
      <div style="display:flex;justify-content:space-between;gap:0.7rem;align-items:flex-start;flex-wrap:wrap;">
        <strong style="font-size:0.92rem;color:#1f2937">${escapeHtml(title)}</strong>
        <span style="font-size:0.76rem;color:${accent};font-weight:700;">Live</span>
      </div>
      <div style="min-height:${minHeight};display:grid;align-items:center;padding:0.85rem;border-radius:1rem;background:linear-gradient(180deg, rgba(248,250,252,0.98), rgba(255,255,255,0.82));border:1px solid rgba(148,163,184,0.16);overflow:auto;">
        ${example?.code || ''}
      </div>
    </article>
  `;
}

function createInlineMockExample(title, code) {
  return { title, code };
}

function findMockExample(examples, patterns = [], fallbackIndex = 0) {
  const normalized = patterns
    .map((value) => String(value || '').toLowerCase().trim())
    .filter(Boolean);

  if (!normalized.length) {
    return examples[fallbackIndex] || examples[0] || null;
  }

  return examples.find((example) => {
    const haystack = `${example?.key || ''} ${example?.title || ''} ${example?.source || ''}`.toLowerCase();
    return normalized.every((pattern) => haystack.includes(pattern));
  }) || examples[fallbackIndex] || examples[0] || null;
}

function getMockExampleSet(baseExamples) {
  const manifest = baseExamples.find((example) => example.source === 'manifest') || baseExamples[0] || null;
  const generated = baseExamples.find((example) => example.key === 'generated') || null;
  const modernized = baseExamples.find((example) => example.key === 'modernized') || null;
  const custom = baseExamples.find(
    (example) => example.key !== 'modernized' && example.key !== 'generated' && example.source !== 'manifest'
  ) || modernized || manifest;

  return {
    manifest,
    generated,
    modernized,
    custom,
  };
}

function renderExactShellCard(title, body, options = {}) {
  const {
    subtitle = '',
    minHeight = '',
    accent = '#0f766e',
  } = options;

  return `
    <section style="display:grid;gap:0.75rem;padding:1rem 1.05rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);${minHeight ? `min-height:${minHeight};` : ''}">
      <div style="display:grid;gap:0.22rem;">
        <span style="font-size:0.74rem;letter-spacing:0.12em;text-transform:uppercase;color:${accent};font-weight:700;">${escapeHtml(title)}</span>
        ${subtitle ? `<strong style="font-size:0.98rem;line-height:1.4;color:#1f2937;">${escapeHtml(subtitle)}</strong>` : ''}
      </div>
      ${body}
    </section>
  `;
}

function renderExactSpecimen(example, options = {}) {
  const {
    title = example?.title || 'Live example',
    subtitle = '',
    minHeight = '6rem',
    accent = '#2563eb',
  } = options;

  return `
    <article style="display:grid;gap:0.65rem;">
      <div style="display:flex;justify-content:space-between;gap:0.6rem;align-items:flex-start;flex-wrap:wrap;">
        <div style="display:grid;gap:0.15rem;">
          <strong style="font-size:0.9rem;color:#1f2937;">${escapeHtml(title)}</strong>
          ${subtitle ? `<span style="font-size:0.76rem;color:#6b7280;">${escapeHtml(subtitle)}</span>` : ''}
        </div>
        <span style="font-size:0.74rem;color:${accent};font-weight:700;">Live</span>
      </div>
      <div style="min-height:${minHeight};display:grid;align-items:center;padding:0.8rem 0.9rem;border-radius:1rem;border:1px solid rgba(226,232,240,0.96);background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92));overflow:auto;">
        ${example?.code || ''}
      </div>
    </article>
  `;
}

function renderExactBulletList(items, options = {}) {
  const { accent = '#2563eb' } = options;
  const visibleItems = (Array.isArray(items) ? items : []).filter(Boolean);

  return `
    <div style="display:grid;gap:0.6rem;">
      ${visibleItems.map((item) => `
        <div style="display:flex;gap:0.6rem;align-items:flex-start;color:#4b5563;line-height:1.58;">
          <span style="width:0.45rem;height:0.45rem;margin-top:0.48rem;border-radius:999px;background:${accent};flex:none;"></span>
          <span>${escapeHtml(item)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderExactKeyValueList(rows, options = {}) {
  const { minLabel = '5.4rem' } = options;
  const visibleRows = (Array.isArray(rows) ? rows : []).filter((row) => row?.label && row?.value);

  return `
    <div style="display:grid;gap:0.6rem;">
      ${visibleRows.map((row) => `
        <div style="display:grid;grid-template-columns:${minLabel} minmax(0, 1fr);gap:0.7rem;align-items:start;">
          <span style="font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;font-weight:700;">${escapeHtml(row.label)}</span>
          <span style="color:#4b5563;line-height:1.55;">${escapeHtml(row.value)}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderExactBadgeRow(items, options = {}) {
  const { activeIndexes = [0], accent = '#2563eb' } = options;
  const visibleItems = (Array.isArray(items) ? items : []).filter(Boolean);

  return `
    <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
      ${visibleItems.map((item, index) => {
        const active = activeIndexes.includes(index);
        return renderBoardTag(item, active
          ? { background: `${accent}18`, color: accent }
          : { background: 'rgba(241,245,249,0.94)', color: '#475569' });
      }).join('')}
    </div>
  `;
}

function renderExactSidebarNote(title, text) {
  return `
    <div style="display:grid;gap:0.45rem;padding:0.9rem;border-radius:1rem;border:1px solid rgba(226,232,240,0.96);background:rgba(255,255,255,0.92);">
      <span style="font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:#0f766e;font-weight:700;">${escapeHtml(title)}</span>
      <p style="margin:0;color:#4b5563;line-height:1.6;">${escapeHtml(text)}</p>
    </div>
  `;
}

function renderExactSectionGrid(title, cards, options = {}) {
  const {
    columns = 'repeat(3, minmax(0, 1fr))',
    accent = '#6b7280',
  } = options;

  return `
    <section style="display:grid;gap:0.85rem;padding:1rem 1.05rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
      <div style="display:flex;justify-content:space-between;gap:0.75rem;align-items:flex-start;flex-wrap:wrap;">
        <span style="font-size:0.74rem;letter-spacing:0.12em;text-transform:uppercase;color:${accent};font-weight:700;">${escapeHtml(title)}</span>
      </div>
      <div style="display:grid;grid-template-columns:${columns};gap:0.9rem;align-items:start;">
        ${cards.join('')}
      </div>
    </section>
  `;
}

function renderExactTopRailLayout(options = {}) {
  const {
    left,
    center,
    right = '',
    columns = '14rem minmax(0, 1fr) 15rem',
  } = options;

  return `
    <div style="display:grid;grid-template-columns:${columns};gap:1rem;align-items:start;">
      ${left}
      ${center}
      ${right || '<div></div>'}
    </div>
  `;
}

function renderExactSheetLayout(options = {}) {
  const {
    top,
    sections = [],
  } = options;

  return `
    <section style="display:grid;gap:1rem;padding:1rem;border-radius:1.5rem;background:linear-gradient(180deg, rgba(255,255,255,0.985), rgba(248,250,252,0.95));border:1px solid rgba(226,232,240,0.96);box-shadow:0 24px 60px rgba(148,163,184,0.14);">
      ${top}
      ${sections.join('')}
    </section>
  `;
}

function createExactButtonMockConceptPlayground(entry, mockDesign) {
  return `
    <section style="display:grid;gap:1rem;padding:0.95rem;border-radius:1.55rem;background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,255,0.96));border:1px solid rgba(226,232,240,0.95);box-shadow:0 24px 60px rgba(148,163,184,0.14);">
      <div style="display:grid;grid-template-columns:11rem minmax(0, 1fr);gap:1rem;align-items:start;">
        <aside style="display:grid;gap:1rem;padding:0.9rem 0.8rem;border-radius:1.15rem;background:rgba(255,255,255,0.92);border:1px solid rgba(226,232,240,0.9);min-height:100%;">
          <div style="display:grid;gap:0.35rem;">
            <span style="font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;font-weight:700;">EONUI</span>
            <strong style="font-size:1.02rem;color:#334155;">Button System</strong>
            <span style="color:#786d62;font-size:0.92rem;">Action Components</span>
          </div>
          <div style="display:grid;gap:0.45rem;">
            <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Overview</span>
            ${['Anatomy', 'Variants', 'States', 'Patterns', 'Content'].map((item, index) => `
              <div style="display:flex;align-items:center;gap:0.55rem;padding:0.45rem 0.55rem;border-radius:0.8rem;${index === 0 ? 'background:rgba(37,99,235,0.08);' : ''}">
                <span style="width:0.52rem;height:0.52rem;border-radius:999px;background:${index === 0 ? '#2563eb' : 'rgba(148,163,184,0.4)'};"></span>
                <span style="font-size:0.92rem;color:#3f3a35;">${item}</span>
              </div>
            `).join('')}
          </div>
          ${[
            { title: 'Theme', items: ['Light', 'Neutral'] },
            { title: 'Density', items: ['Comfort', 'Compact'] },
            { title: 'Size', items: ['S', 'M', 'L'] },
          ].map((group) => `
            <div style="display:grid;gap:0.42rem;">
              <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">${group.title}</span>
              ${group.items.map((item, index) => `
                <div style="display:flex;align-items:center;gap:0.55rem;padding:0.22rem 0;">
                  <span style="width:0.48rem;height:0.48rem;border-radius:999px;background:${index === 0 || (group.title === 'Size' && item === 'M') ? '#2563eb' : 'rgba(148,163,184,0.35)'};"></span>
                  <span style="font-size:0.9rem;color:#62594d;">${item}</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
          <div style="margin-top:auto;display:grid;gap:0.28rem;padding-top:0.6rem;color:#8b8175;font-size:0.85rem;line-height:1.55;">
            <span>Built for clarity.</span>
            <span>Made for action.</span>
          </div>
        </aside>
        <div style="display:grid;gap:1rem;">
          <div style="display:grid;grid-template-columns:minmax(0, 1fr) 16rem;gap:1rem;align-items:start;">
            <div style="display:grid;gap:0.95rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
              <div style="display:grid;grid-template-columns:11rem minmax(0, 1fr);gap:1rem;align-items:start;">
                <div style="display:grid;gap:0.55rem;padding-right:1rem;border-right:1px solid rgba(226,232,240,0.95);">
                  <strong style="font-size:1.05rem;color:#3f3a35;">Button anatomy</strong>
                  <p style="margin:0;color:#7b6d61;line-height:1.7;">A slot-based structure for consistent actions.</p>
                </div>
                <div style="display:grid;gap:0.95rem;">
                  <div style="display:grid;grid-template-columns:1.6fr 0.9fr;gap:1rem;align-items:start;">
                    <div style="display:grid;gap:0.55rem;">
                      <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:0.5rem;font-size:0.74rem;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;font-weight:700;text-align:center;">
                        <span>Start</span>
                        <span>Default</span>
                        <span>End</span>
                        <span>Loading</span>
                      </div>
                      <div style="display:grid;grid-template-columns:1fr 0.58fr;gap:0.9rem;align-items:center;">
                        <div style="display:grid;justify-items:center;gap:0.55rem;padding:1.1rem;border-radius:1.1rem;background:linear-gradient(180deg, rgba(248,250,252,0.96), rgba(255,255,255,0.88));border:1px solid rgba(219,234,254,0.95);">
                          <eon-button tone="brand" variant="gradient" badge="Ctrl K" shortcut="Ctrl K">Publish</eon-button>
                          <span style="font-size:0.8rem;color:#7b6d61;">Shortcut / Hint</span>
                        </div>
                        <div style="display:grid;justify-items:center;padding:1.1rem;border-radius:1.1rem;background:linear-gradient(180deg, rgba(248,250,252,0.96), rgba(255,255,255,0.88));border:1px solid rgba(219,234,254,0.95);">
                          <eon-button tone="brand" badge="45%" variant="gradient">Publish</eon-button>
                        </div>
                      </div>
                    </div>
                    <div style="display:grid;gap:0.5rem;padding:0.95rem 1rem;border-radius:1rem;background:rgba(255,255,255,0.94);border:1px solid rgba(226,232,240,0.95);">
                      <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Slot system</span>
                      ${[
                        ['Start', 'Optional leading icon or indicator'],
                        ['Default', 'Primary label or text value'],
                        ['End', 'Optional trailing icon or action'],
                        ['Loading', 'Progress or activity indicator'],
                        ['Badge', 'Contextual hint or shortcut'],
                      ].map(([label, text]) => `
                        <div style="display:grid;grid-template-columns:3.8rem 1fr;gap:0.7rem;font-size:0.84rem;line-height:1.5;">
                          <strong style="color:#5b5349;text-transform:uppercase;font-size:0.72rem;letter-spacing:0.08em;">${label}</strong>
                          <span style="color:#7b6d61;">${text}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <article style="display:grid;gap:0.8rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
            <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">States</span>
            <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:0.7rem;">
              ${[
                { label: 'Default', code: '<eon-button tone="brand" badge="Ctrl K">Publish</eon-button>' },
                { label: 'Hover', code: '<eon-button tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>' },
                { label: 'Pressed', code: '<eon-button tone="brand" variant="gradient">Publish</eon-button>' },
                { label: 'Selected', code: '<eon-button variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>' },
                { label: 'Loading', code: '<eon-button tone="brand" badge="45%">Publish</eon-button>' },
                { label: 'Success flash', code: '<eon-button tone="success" variant="soft" badge="Ctrl K">Saved</eon-button>' },
                { label: 'Disabled', code: '<eon-button disabled badge="Ctrl K">Publish</eon-button>' },
              ].map((item) => `
                <div style="display:grid;gap:0.45rem;text-align:center;">
                  <span style="font-size:0.82rem;color:#6e6458;">${item.label}</span>
                  <div style="display:grid;place-items:center;min-height:4.6rem;padding:0.65rem;border-radius:1rem;background:linear-gradient(180deg, rgba(248,250,252,0.95), rgba(255,255,255,0.9));border:1px solid rgba(226,232,240,0.95);">${item.code}</div>
                </div>
              `).join('')}
            </div>
          </article>
          <div style="display:grid;grid-template-columns:1.12fr 0.92fr 1.08fr;gap:1rem;">
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
              <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Content patterns</span>
              ${[
                ['Icon only', '<eon-button tone="brand" size="sm">↗</eon-button><eon-button tone="brand" variant="gradient" size="sm">↗</eon-button><eon-button variant="outline" size="sm">↗</eon-button>'],
                ['Icon leading', '<eon-button tone="brand">Publish</eon-button><eon-button variant="gradient" tone="brand">Publish</eon-button><eon-button variant="outline">Publish</eon-button>'],
                ['Icon trailing', '<eon-button tone="brand">Publish</eon-button><eon-button variant="gradient" tone="brand">Publish</eon-button><eon-button variant="outline">Publish</eon-button>'],
                ['Badge bearing', '<eon-button tone="brand" badge="Ctrl K">Publish</eon-button><eon-button variant="gradient" tone="brand" badge="Ctrl K">Publish</eon-button><eon-button variant="outline" badge="Ctrl K">Publish</eon-button>'],
                ['Split action', '<eon-button tone="brand">Publish</eon-button><eon-button variant="gradient" tone="brand">Publish</eon-button><eon-button variant="outline">Publish</eon-button>'],
              ].map(([label, buttons]) => `
                <div style="display:grid;grid-template-columns:6rem 1fr;gap:0.9rem;align-items:center;">
                  <span style="font-size:0.84rem;color:#6e6458;">${label}</span>
                  <div style="display:flex;gap:0.55rem;flex-wrap:wrap;">${buttons}</div>
                </div>
              `).join('')}
            </article>
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
              <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Size & density</span>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;">
                <div style="display:grid;gap:0.65rem;">
                  <span style="font-size:0.82rem;color:#6e6458;text-align:center;">Compact</span>
                  <div style="display:grid;gap:0.7rem;justify-items:center;">
                    <eon-button size="sm" variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>
                    <eon-button size="md" variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>
                    <eon-button size="lg" variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>
                  </div>
                </div>
                <div style="display:grid;gap:0.65rem;">
                  <span style="font-size:0.82rem;color:#6e6458;text-align:center;">Comfortable (default)</span>
                  <div style="display:grid;gap:0.7rem;justify-items:center;">
                    <eon-button size="sm" tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>
                    <eon-button size="md" tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>
                    <eon-button size="lg" tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>
                  </div>
                </div>
              </div>
            </article>
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
              <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Variants</span>
              ${[
                ['Primary', '<eon-button tone="brand" badge="Ctrl K">Publish</eon-button>'],
                ['Secondary', '<eon-button variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>'],
                ['Tertiary', '<eon-button variant="ghost" tone="brand" badge="Ctrl K">Publish</eon-button>'],
                ['Ghost', '<eon-button variant="ghost">Publish</eon-button>'],
                ['Destructive', '<eon-button variant="outline" tone="danger" badge="Ctrl K">Publish</eon-button>'],
              ].map(([label, button]) => `
                <div style="display:grid;grid-template-columns:5rem 1fr 2.2rem 2.2rem;gap:0.7rem;align-items:center;">
                  <span style="font-size:0.84rem;color:#6e6458;">${label}</span>
                  <div>${button}</div>
                  <div style="display:grid;place-items:center;">${label === 'Destructive' ? '<eon-button variant="outline" tone="danger" size="sm">↗</eon-button>' : '<eon-button size="sm" variant="outline">↗</eon-button>'}</div>
                  <div style="display:grid;place-items:center;">${label === 'Primary' ? '<eon-button size="sm">⌄</eon-button>' : '<eon-button size="sm" variant="outline">⌄</eon-button>'}</div>
                </div>
              `).join('')}
            </article>
          </div>
          <div style="display:grid;grid-template-columns:1.05fr 0.72fr 1fr;gap:1rem;">
            ${[
              ['Usage', ['Use Primary for the main affirmative action.', 'Use Secondary for alternative actions.', 'Use Tertiary or Ghost for low emphasis actions.', 'Use Destructive with care and clear confirmation.']],
              ['Accessibility', ['Minimum target size: 44x44', 'Visible focus for keyboard users', 'Supports shortcuts and hints']],
              ['Implementation notes', ['Slots collapse intelligently when content is absent.', 'Badges adapt to text length and localization.', 'Loading replaces label with progress without layout shift.']],
            ].map(([title, items]) => `
              <article style="display:grid;gap:0.7rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
                <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">${title}</span>
                <ul style="margin:0;padding-left:1rem;color:#6e6458;line-height:1.7;">
                  ${items.map((item) => `<li>${item}</li>`).join('')}
                </ul>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function createExactInputMockConceptPlayground(entry, mockDesign, sharedReferences = []) {
  const sharedLabels = trimItems(sharedReferences.map((item) => `${humanizeName(item.theme || 'default')}: ${item.label}`), 2);

  return `
    <section style="display:grid;gap:1rem;padding:0.95rem;border-radius:1.55rem;background:linear-gradient(180deg, rgba(255,255,255,0.985), rgba(248,250,255,0.96));border:1px solid rgba(226,232,240,0.95);box-shadow:0 24px 60px rgba(148,163,184,0.14);">
      <div style="display:grid;grid-template-columns:16rem minmax(0, 1.55fr) 15.5rem;gap:1rem;align-items:start;">
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);min-height:100%;">
          <div style="display:grid;gap:0.35rem;">
            <span style="font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;color:#2563eb;font-weight:700;">EONUI FORMS</span>
            <strong style="font-size:1.9rem;line-height:0.95;color:#111827;font-family:Georgia, 'Times New Roman', serif;">eon-input</strong>
            <p style="margin:0;color:#6e6458;line-height:1.65;">Floating field. Rich context. Built for modern workflows.</p>
          </div>
          <div style="display:grid;gap:0.55rem;">
            ${[
              'Floating label',
              'Prefix & suffix actions',
              'Inline validation',
              'Async suggestions',
              'Tokenized entries',
              'Multiple states',
              'Size variants',
              'Accessible & keyboard-ready',
            ].map((item) => `
              <div style="display:flex;gap:0.65rem;align-items:flex-start;color:#556070;line-height:1.5;">
                <span style="width:1.2rem;color:#64748b;">◌</span>
                <span>${item}</span>
              </div>
            `).join('')}
          </div>
          <div style="display:grid;gap:0.45rem;padding:0.9rem;border-radius:1rem;background:rgba(255,255,255,0.96);border:1px solid rgba(226,232,240,0.95);">
            <strong style="font-size:0.98rem;color:#334155;">Design goal</strong>
            <p style="margin:0;color:#6e6458;line-height:1.6;">A single input that adapts to intent, context and state.</p>
          </div>
          ${sharedLabels.length ? `
            <div style="display:grid;gap:0.42rem;">
              <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Workspace pack</span>
              ${sharedLabels.map((item) => `<span style="font-size:0.9rem;color:#6e6458;">${escapeHtml(item)}</span>`).join('')}
            </div>
          ` : ''}
        </aside>
        <div style="display:grid;gap:1rem;">
          <article style="display:grid;gap:0.9rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
            <div style="display:flex;justify-content:space-between;gap:0.75rem;align-items:flex-start;flex-wrap:wrap;">
              <div style="display:grid;gap:0.35rem;">
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                  ${renderBoardTag('Primary')}
                  ${renderBoardTag('Default focused', { background: 'rgba(241,245,249,0.95)', color: '#475569' })}
                </div>
                <strong style="font-size:1.08rem;line-height:1.35;color:#111827;">${escapeHtml(mockDesign?.conceptTitle || 'productivity-heavy Input compact console')}</strong>
              </div>
            </div>
            <div style="display:grid;gap:0.85rem;padding:0.95rem;border-radius:1rem;background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92));border:1px solid rgba(226,232,240,0.95);">
              <eon-input
                label="Project or workspace name"
                value="Northstar Platform"
                placeholder="Enter a project or workspace name"
                help-text="Use 3-50 characters. Letters, numbers, spaces and hyphens."
                show-clear-button
                success
              >
                <span slot="prefix">💼</span>
                <span slot="success">Looks good! This name is available.</span>
              </eon-input>
              <div style="display:grid;gap:0.55rem;padding:0.85rem;border-radius:0.9rem;background:rgba(241,245,249,0.68);border:1px solid rgba(226,232,240,0.9);">
                <div style="display:flex;justify-content:space-between;gap:0.75rem;align-items:center;">
                  <strong style="font-size:0.92rem;color:#475569;">Suggested workspaces</strong>
                  <span style="font-size:0.84rem;color:#64748b;">Searching...</span>
                </div>
                ${[
                  ['Northstar Platform', 'Acme Corporation'],
                  ['Northstar Platform Redesign', 'Acme Corporation'],
                  ['Northstar Platform QA', 'Acme Corporation'],
                ].map(([name, meta], index) => `
                  <div style="display:grid;grid-template-columns:2rem 1fr;gap:0.75rem;align-items:center;padding:0.7rem;border-radius:0.85rem;${index === 0 ? 'background:rgba(219,234,254,0.5);' : 'background:rgba(255,255,255,0.82);'}">
                    <span style="display:grid;place-items:center;width:2rem;height:2rem;border-radius:0.75rem;background:rgba(255,255,255,0.92);color:#2563eb;">◎</span>
                    <div style="display:grid;gap:0.1rem;">
                      <strong style="font-size:0.95rem;color:#334155;">${name}</strong>
                      <span style="font-size:0.84rem;color:#64748b;">${meta}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div style="display:flex;gap:0.6rem;flex-wrap:wrap;align-items:center;">
                <span style="font-size:0.9rem;color:#475569;">Recent tokens</span>
                ${['Mobile', 'Q2 FY25', 'Internal', 'High priority'].map((item) => `
                  <span style="display:inline-flex;align-items:center;gap:0.45rem;padding:0.5rem 0.8rem;border-radius:999px;border:1px solid rgba(203,213,225,0.95);background:rgba(255,255,255,0.9);font-size:0.88rem;color:#334155;">${item}<span style="color:#64748b;">×</span></span>
                `).join('')}
                <span style="display:inline-flex;align-items:center;padding:0.5rem 0.8rem;border-radius:999px;border:1px dashed rgba(148,163,184,0.9);background:rgba(255,255,255,0.85);font-size:0.88rem;color:#64748b;">+ Add token</span>
              </div>
            </div>
          </article>
          <div style="display:grid;grid-template-columns:0.8fr 1.1fr;gap:1rem;">
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
              <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Sizes</span>
              <div style="display:grid;gap:0.85rem;">
                <div style="display:grid;gap:0.45rem;">
                  <span style="font-size:0.84rem;color:#6e6458;">Compact</span>
                  <eon-input label="Email address" value="alex@northstar.io">
                    <span slot="prefix">✉</span>
                  </eon-input>
                </div>
                <div style="display:grid;gap:0.45rem;">
                  <span style="font-size:0.84rem;color:#6e6458;">Spacious</span>
                  <eon-input label="Email address" value="alex@northstar.io" help-text="We'll never share your email with anyone.">
                    <span slot="prefix">✉</span>
                  </eon-input>
                </div>
              </div>
            </article>
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
              <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">With tokenized suggestions</span>
              <div style="display:grid;gap:0.75rem;padding:0.8rem;border-radius:0.95rem;border:1px solid rgba(191,219,254,0.95);background:rgba(248,250,255,0.96);">
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                  ${['Olivia Rhye', 'Phoenix Baker', 'Lana Steiner'].map((item) => `
                    <span style="display:inline-flex;align-items:center;gap:0.45rem;padding:0.42rem 0.7rem;border-radius:999px;border:1px solid rgba(203,213,225,0.95);background:#fff;font-size:0.84rem;color:#334155;">👤 ${item}<span style="color:#94a3b8;">×</span></span>
                  `).join('')}
                  <span style="display:inline-flex;align-items:center;padding:0.42rem 0.7rem;border-radius:999px;border:1px dashed rgba(148,163,184,0.9);background:#fff;font-size:0.84rem;color:#64748b;">+ Invite</span>
                </div>
                <span style="font-size:0.82rem;color:#64748b;">Type a name or email and press Enter to add.</span>
              </div>
              <div style="display:grid;gap:0.7rem;padding:0.85rem;border-radius:0.95rem;background:rgba(255,255,255,0.9);border:1px solid rgba(226,232,240,0.95);">
                ${[
                  ['Demi Wilkinson', 'demi.wilkinson@northstar.io'],
                  ['Candice Wu', 'candice.wu@northstar.io'],
                ].map(([name, email]) => `
                  <div style="display:grid;grid-template-columns:2rem 1fr;gap:0.7rem;align-items:center;">
                    <span style="display:grid;place-items:center;width:2rem;height:2rem;border-radius:999px;background:rgba(254,226,226,0.9);font-size:0.82rem;">👤</span>
                    <div style="display:grid;gap:0.08rem;">
                      <strong style="font-size:0.92rem;color:#334155;">${name}</strong>
                      <span style="font-size:0.82rem;color:#64748b;">${email}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </article>
          </div>
        </div>
        <div style="display:grid;gap:1rem;">
          <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
            <strong style="font-size:1rem;color:#111827;">States</strong>
            <div style="display:grid;gap:0.85rem;">
              ${[
                { title: 'Success', code: `<eon-input label="Project or workspace name" value="Northstar Platform" help-text="Looks good! This name is available." success><span slot="prefix">✓</span></eon-input>` },
                { title: 'Warning', code: `<eon-input label="Project or workspace name" value="Northstar Platform" help-text="This name is a bit long. Consider something shorter."><span slot="prefix">⚠</span></eon-input>` },
                { title: 'Error', code: `<eon-input label="Project or workspace name" value="Northstar Platform" invalid error-text="This name is already taken. Try another one."><span slot="prefix">✕</span></eon-input>` },
                { title: 'Loading', code: `<eon-input label="Project or workspace name" value="Checking availability..." help-text="We are validating the latest draft."><span slot="prefix">⟳</span></eon-input>` },
                { title: 'Readonly', code: `<eon-input label="Project or workspace name" value="Northstar Platform" read-only help-text="Read-only field"><span slot="prefix">🔒</span></eon-input>` },
              ].map((item) => `
                <div style="display:grid;gap:0.35rem;">
                  <span style="font-size:0.84rem;color:#475569;">${item.title}</span>
                  <div style="padding:0.2rem 0;">${item.code}</div>
                </div>
              `).join('')}
            </div>
          </article>
          <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
            <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Metadata & status</span>
            <div style="display:grid;gap:0.65rem;">
              <eon-input label="Repository name" value="northstar-main" help-text="Created 2 hours ago • Updated just now">
                <span slot="prefix">🗃</span>
                <span slot="suffix">🟢 Active</span>
              </eon-input>
              <eon-input label="Search projects, teams or tasks" placeholder="Start typing to search..." help-text="Press / to focus • ↑ ↓ to navigate • Enter to select">
                <span slot="prefix">⌕</span>
              </eon-input>
            </div>
          </article>
          <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;background:rgba(255,255,255,0.95);border:1px solid rgba(226,232,240,0.95);">
            <span style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">At a glance</span>
            <p style="margin:0;color:#6e6458;line-height:1.75;">${escapeHtml((mockDesign?.sections?.uniqueDesignDirection || [])[1] || 'Layout bias: Bias the composition toward canvas-first framing inside field groups with side context and sticky actions, so the component feels intentionally different from a default form-control block.')}</p>
            <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
              ${['empty', 'filled', 'focus', 'disabled', 'read-only', 'required'].map((item, index) =>
                renderBoardTag(item, index < 2 ? {} : { background: 'rgba(241,245,249,0.95)', color: '#475569' })
              ).join('')}
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
}

function createExactAppStoreButtonMockConceptPlayground(entry, mockDesign, baseExamples) {
  const exampleSet = getMockExampleSet(baseExamples);
  const primary = exampleSet.manifest || exampleSet.custom;
  const contextual = exampleSet.custom || exampleSet.modernized || primary;
  const modernized = exampleSet.modernized || contextual || primary;
  const generated = exampleSet.generated || primary;
  const featureItems = trimItems(mockDesign?.sections?.fullFeatureStack, 5);
  const stateItems = ['Default', 'Hover', 'Pressed', 'Disabled', 'With badge'];
  const flowCards = [
    createInlineMockExample('Ready to download', `
      <div style="display:grid;gap:0.55rem;">
        <eon-app-store-button store="App Store" label="Download the iOS app" caption="Version 2.4.1" badge="120 MB"></eon-app-store-button>
        <eon-app-store-button store="Google Play" label="Get it on Google Play" caption="Live" badge="Android"></eon-app-store-button>
      </div>
    `),
    createInlineMockExample('Downloading', `
      <div style="display:grid;gap:0.6rem;">
        <eon-app-store-button store="App Store" label="Downloading..." caption="45% · 54 MB / 120 MB" badge="45%"></eon-app-store-button>
        <eon-app-store-button store="Google Play" label="Downloading..." caption="30% · 29 MB / 98 MB" badge="30%"></eon-app-store-button>
      </div>
    `),
    createInlineMockExample('Installing', `
      <div style="display:grid;gap:0.6rem;">
        <eon-app-store-button store="App Store" label="Installing..." caption="Preparing app" badge="Sync"></eon-app-store-button>
        <eon-app-store-button store="Google Play" label="Installing..." caption="Preparing app" badge="Sync"></eon-app-store-button>
      </div>
    `),
    createInlineMockExample('Installed', `
      <div style="display:grid;gap:0.6rem;">
        <eon-app-store-button store="App Store" label="Installed" caption="Open app" badge="Done"></eon-app-store-button>
        <eon-app-store-button store="Google Play" label="Installed" caption="Open app" badge="Done"></eon-app-store-button>
      </div>
    `),
  ];

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '15rem minmax(0, 1.55fr) 14rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.35rem;">
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
              ${renderBoardTag('eon-components', { background: 'rgba(241,245,249,0.95)', color: '#475569' })}
              ${renderBoardTag('Action component', { background: 'rgba(255,255,255,0.9)', color: '#475569' })}
            </div>
            <strong style="font-size:1.9rem;line-height:1.02;color:#111827;font-family:Georgia, 'Times New Roman', serif;">${escapeHtml(entry.tag)}</strong>
            <p style="margin:0;color:#4b5563;line-height:1.65;">${escapeHtml(entry.description)}</p>
          </div>
          ${renderExactBulletList(featureItems, { accent: '#0f766e' })}
          ${renderExactSidebarNote('Design goal', 'Drive installs with clarity and trust. These buttons communicate platform, availability, and progress at a glance.')}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Primary download surface', `
            <div style="display:grid;gap:0.85rem;">
              ${renderExactSpecimen(contextual, { title: mockDesign?.conceptTitle || 'Premium store CTA', subtitle: 'Dock-and-detail framing with platform context', minHeight: '11rem', accent: '#0f766e' })}
              <div style="display:flex;gap:0.75rem;flex-wrap:wrap;color:#4b5563;">
                ${['Free to download', 'Secure & verified', 'Works on iPhone & iPad'].map((item) => `<span style="display:inline-flex;align-items:center;gap:0.45rem;"><span style="color:#0f766e;">✓</span>${escapeHtml(item)}</span>`).join('')}
              </div>
            </div>
          `, { subtitle: 'Confident App Store Button split-panel', accent: '#0f766e' })}
          ${renderExactSectionGrid('Platform variants', [
            renderExactSpecimen(primary, { title: 'App Store / iOS', minHeight: '6rem', accent: '#2563eb' }),
            renderExactSpecimen(contextual, { title: 'Contextual download CTA', minHeight: '6rem', accent: '#0f766e' }),
          ], { columns: 'repeat(2, minmax(0, 1fr))', accent: '#6b7280' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('At a glance', renderExactBulletList([
            'Unified system for download CTAs.',
            'Built-in states for real-world flows.',
            'Designed for high conversion and accessibility.',
          ], { accent: '#2563eb' }), { accent: '#6b7280' })}
          ${renderExactShellCard('Metadata example', `
            <div style="display:grid;gap:0.75rem;">
              ${renderExactSpecimen(contextual, { title: 'Northstar Analytics', subtitle: 'Business Intelligence · Rated 4.8', minHeight: '5.75rem', accent: '#0f766e' })}
              <p style="margin:0;color:#4b5563;line-height:1.55;">50K+ downloads · Rated 4+ · In-app purchases</p>
            </div>
          `, { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('Treatments & sizes', [
        renderExactSpecimen(primary, { title: 'Hero / elevated', minHeight: '5.5rem' }),
        renderExactSpecimen(contextual, { title: 'Large / contextual', minHeight: '5.5rem', accent: '#0f766e' }),
        renderExactSpecimen(generated, { title: 'Compact / generic', minHeight: '5.5rem', accent: '#6b7280' }),
      ], { columns: 'repeat(3, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('State examples', stateItems.map((label, index) =>
        renderExactSpecimen([primary, contextual, modernized, generated, contextual][index] || primary, { title: label, minHeight: '5.6rem', accent: index === 4 ? '#0f766e' : '#2563eb' })
      ), { columns: 'repeat(5, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Install flow states', flowCards.map((example) => renderExactSpecimen(example, { title: example.title, minHeight: '7rem', accent: '#0f766e' })), { columns: 'repeat(4, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Responsive, usage, and trust', [
        renderExactShellCard('Responsive preview', `
          ${renderExactBadgeRow(['Desktop / web', 'Tablet', 'Mobile / inline', 'Stacked card'], { activeIndexes: [0, 3], accent: '#2563eb' })}
          <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.75rem;margin-top:0.75rem;">
            ${renderExactSpecimen(primary, { title: 'Desktop / web', minHeight: '5rem' })}
            ${renderExactSpecimen(contextual, { title: 'Mobile stacked card', minHeight: '5rem', accent: '#0f766e' })}
          </div>
        `, { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Accessibility', renderExactBulletList([
          'High contrast & clear typography.',
          'Minimum touch target 44px.',
          'Announced as link buttons.',
          'Supports keyboard navigation.',
        ], { accent: '#0f766e' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Usage guidelines', renderExactBulletList([
          'Use platform-specific buttons only.',
          'Keep context above the button.',
          'Group button pairings consistently.',
          'Place near the value prop or journey end.',
        ], { accent: '#2563eb' }), { accent: '#6b7280', minHeight: '100%' }),
      ], { columns: 'repeat(3, minmax(0, 1fr))', accent: '#6b7280' }),
    ],
  });
}

function createExactButtonAtlasMockConceptPlayground(entry, mockDesign) {
  const stateExamples = [
    createInlineMockExample('Default', '<eon-button tone="brand" badge="Ctrl K">Publish</eon-button>'),
    createInlineMockExample('Hover', '<eon-button tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>'),
    createInlineMockExample('Pressed', '<eon-button tone="brand" variant="gradient">Publish</eon-button>'),
    createInlineMockExample('Selected', '<eon-button variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>'),
    createInlineMockExample('Loading', '<eon-button tone="brand" badge="45%">Publish</eon-button>'),
    createInlineMockExample('Success flash', '<eon-button tone="success" variant="soft" badge="Ctrl K">Saved</eon-button>'),
    createInlineMockExample('Disabled', '<eon-button disabled badge="Ctrl K">Publish</eon-button>'),
  ];

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '12rem minmax(0, 1fr) 14rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.28rem;">
            <span style="font-size:0.78rem;letter-spacing:0.12em;text-transform:uppercase;color:#2563eb;font-weight:700;">EONUI</span>
            <strong style="font-size:1.1rem;color:#1f2937;">Button System</strong>
            <span style="color:#6b7280;">Action Components</span>
          </div>
          <div style="display:grid;gap:0.45rem;">
            ${['Anatomy', 'Variants', 'States', 'Patterns', 'Content'].map((item, index) => `
              <div style="display:flex;align-items:center;gap:0.55rem;padding:0.38rem 0.45rem;border-radius:0.75rem;${index === 0 ? 'background:rgba(37,99,235,0.1);' : ''}">
                <span style="width:0.45rem;height:0.45rem;border-radius:999px;background:${index === 0 ? '#2563eb' : 'rgba(203,213,225,0.95)'};"></span>
                <span style="font-size:0.9rem;color:#374151;">${item}</span>
              </div>
            `).join('')}
          </div>
          ${renderExactKeyValueList([
            { label: 'Theme', value: 'Light / Neutral' },
            { label: 'Density', value: 'Comfort / Compact' },
            { label: 'Size', value: 'S / M / L' },
          ], { minLabel: '4.5rem' })}
          <div style="margin-top:auto;color:#6b7280;line-height:1.55;">
            <div>Built for clarity.</div>
            <div>Made for action.</div>
          </div>
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Button anatomy', `
            <div style="display:grid;grid-template-columns:11rem minmax(0, 1fr);gap:1rem;align-items:start;">
              <div style="display:grid;gap:0.45rem;padding-right:1rem;border-right:1px solid rgba(226,232,240,0.96);">
                <strong style="font-size:1rem;color:#1f2937;">A slot-based structure for consistent actions.</strong>
                <p style="margin:0;color:#4b5563;line-height:1.65;">${escapeHtml(mockDesign?.conceptTitle || 'architectural Button sheet-based')}</p>
              </div>
              <div style="display:grid;gap:0.9rem;">
                <div style="display:grid;grid-template-columns:1.45fr 0.8fr;gap:0.9rem;">
                  ${renderExactSpecimen(createInlineMockExample('Main call-to-action', '<eon-button tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>'), { title: 'Primary CTA', subtitle: 'Start / label / end / loading', minHeight: '8rem' })}
                  ${renderExactSpecimen(createInlineMockExample('Busy action', '<eon-button tone="brand" badge="45%" variant="gradient">Publish</eon-button>'), { title: 'Loading specimen', minHeight: '8rem' })}
                </div>
                ${renderExactBadgeRow(['Start', 'Default', 'End', 'Loading', 'Badge'], { activeIndexes: [0, 1, 2], accent: '#2563eb' })}
              </div>
            </div>
          `, { accent: '#2563eb' })}
          ${renderExactSectionGrid('States', stateExamples.map((example) => renderExactSpecimen(example, { title: example.title, minHeight: '5.25rem' })), { columns: 'repeat(7, minmax(0, 1fr))', accent: '#6b7280' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Slot system', renderExactKeyValueList([
            { label: 'Start', value: 'Optional leading icon or indicator' },
            { label: 'Default', value: 'Primary label or text value' },
            { label: 'End', value: 'Optional trailing icon or action' },
            { label: 'Loading', value: 'Progress or activity indicator' },
            { label: 'Badge', value: 'Contextual hint or shortcut' },
          ]), { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('Content patterns', [
        renderExactSpecimen(createInlineMockExample('Icon only', '<div style="display:flex;gap:0.55rem;flex-wrap:wrap;"><eon-button tone="brand" size="sm">↗</eon-button><eon-button tone="brand" variant="gradient" size="sm">↗</eon-button><eon-button variant="outline" size="sm">↗</eon-button></div>'), { title: 'Icon only', minHeight: '5.75rem' }),
        renderExactSpecimen(createInlineMockExample('Icon leading', '<div style="display:flex;gap:0.55rem;flex-wrap:wrap;"><eon-button tone="brand">Publish</eon-button><eon-button variant="gradient" tone="brand">Publish</eon-button><eon-button variant="outline">Publish</eon-button></div>'), { title: 'Icon leading', minHeight: '5.75rem' }),
        renderExactSpecimen(createInlineMockExample('Split action', '<div style="display:flex;gap:0.55rem;flex-wrap:wrap;"><eon-button tone="brand">Publish</eon-button><eon-button variant="gradient" tone="brand">Publish</eon-button><eon-button variant="outline">Publish</eon-button></div>'), { title: 'Split action', minHeight: '5.75rem' }),
      ], { columns: 'repeat(3, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Size, density, and variants', [
        renderExactSpecimen(createInlineMockExample('Size & density', `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
            <div style="display:grid;gap:0.55rem;justify-items:center;">
              <span style="font-size:0.82rem;color:#6b7280;">Compact</span>
              <eon-button size="sm" variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>
              <eon-button size="md" variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>
              <eon-button size="lg" variant="outline" tone="brand" badge="Ctrl K">Publish</eon-button>
            </div>
            <div style="display:grid;gap:0.55rem;justify-items:center;">
              <span style="font-size:0.82rem;color:#6b7280;">Comfortable</span>
              <eon-button size="sm" tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>
              <eon-button size="md" tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>
              <eon-button size="lg" tone="brand" variant="gradient" badge="Ctrl K">Publish</eon-button>
            </div>
          </div>
        `), { title: 'Size & density', minHeight: '9rem' }),
        renderExactSpecimen(createInlineMockExample('Variants', `
          <div style="display:grid;gap:0.6rem;">
            <eon-button tone="brand" badge="Ctrl K">Primary</eon-button>
            <eon-button variant="outline" tone="brand" badge="Ctrl K">Secondary</eon-button>
            <eon-button variant="ghost" tone="brand" badge="Ctrl K">Tertiary</eon-button>
            <eon-button variant="outline" tone="danger" badge="Ctrl K">Destructive</eon-button>
          </div>
        `), { title: 'Variants', minHeight: '9rem' }),
      ], { columns: '1.2fr 0.8fr', accent: '#6b7280' }),
      renderExactSectionGrid('Usage, accessibility, and implementation', [
        renderExactShellCard('Usage', renderExactBulletList([
          'Use Primary for the main affirmative action.',
          'Use Secondary for alternative actions.',
          'Use Tertiary or Ghost for low emphasis actions.',
          'Use Destructive with clear confirmation.',
        ], { accent: '#2563eb' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Accessibility', renderExactBulletList([
          'Minimum target size: 44x44.',
          'Visible focus for keyboard users.',
          'Supports shortcuts and hints.',
        ], { accent: '#0f766e' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Implementation notes', renderExactBulletList([
          'Slots collapse intelligently when content is absent.',
          'Badges adapt to text length and localization.',
          'Loading replaces label without layout shift.',
        ], { accent: '#94a3b8' }), { accent: '#6b7280', minHeight: '100%' }),
      ], { columns: 'repeat(3, minmax(0, 1fr))', accent: '#6b7280' }),
    ],
  });
}

function createExactButtonAtlasV2MockConceptPlayground(entry, mockDesign) {
  const stateExamples = [
    {
      title: 'Default',
      code: '<eon-button tone="brand" variant="solid" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>',
    },
    {
      title: 'Hover',
      code: '<eon-button tone="brand" variant="solid" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>',
    },
    {
      title: 'Pressed',
      code: '<eon-button tone="brand" variant="solid"><span slot="start">&#8599;</span>Publish</eon-button>',
    },
    {
      title: 'Selected',
      code: '<eon-button variant="outline" tone="brand" shortcut="Ctrl K" selected><span slot="start">&#10003;</span>Publish</eon-button>',
    },
    {
      title: 'Loading',
      code: '<eon-button tone="brand" variant="solid" badge="45%"><span slot="start">&#9711;</span>Publish</eon-button>',
    },
    {
      title: 'Success flash',
      code: '<eon-button tone="success" variant="soft" shortcut="Ctrl K"><span slot="start">&#10003;</span>Saved</eon-button>',
    },
    {
      title: 'Disabled',
      code: '<eon-button tone="brand" variant="soft" shortcut="Ctrl K" disabled><span slot="start">&#8599;</span>Publish</eon-button>',
    },
  ];

  const patternRows = [
    {
      label: 'Icon only',
      content: `
        <div style="display:flex;gap:0.55rem;flex-wrap:wrap;">
          <eon-button tone="brand" variant="solid" size="sm"><span slot="start">&#8599;</span></eon-button>
          <eon-button tone="brand" variant="solid" size="sm"><span slot="start">&#8599;</span></eon-button>
          <eon-button tone="brand" variant="outline" size="sm"><span slot="start">&#8599;</span></eon-button>
          <eon-button tone="neutral" variant="soft" size="sm"><span slot="start">&#8599;</span></eon-button>
        </div>
      `,
    },
    {
      label: 'Icon leading',
      content: `
        <div style="display:flex;gap:0.55rem;flex-wrap:wrap;">
          <eon-button tone="brand" variant="solid"><span slot="start">&#8599;</span>Publish</eon-button>
          <eon-button tone="brand" variant="solid"><span slot="start">&#8599;</span>Publish</eon-button>
          <eon-button tone="brand" variant="outline" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>
        </div>
      `,
    },
    {
      label: 'Icon trailing',
      content: `
        <div style="display:flex;gap:0.55rem;flex-wrap:wrap;">
          <eon-button tone="brand" variant="solid">Publish<span slot="end">&#8250;</span></eon-button>
          <eon-button tone="brand" variant="solid">Publish<span slot="end">&#8250;</span></eon-button>
          <eon-button tone="brand" variant="outline" shortcut="Ctrl K">Publish<span slot="end">&#8250;</span></eon-button>
        </div>
      `,
    },
    {
      label: 'Badge bearing',
      content: `
        <div style="display:flex;gap:0.55rem;flex-wrap:wrap;">
          <eon-button tone="brand" variant="solid" shortcut="Ctrl K">Publish</eon-button>
          <eon-button tone="brand" variant="solid" shortcut="Ctrl K">Publish</eon-button>
          <eon-button tone="brand" variant="outline" shortcut="Ctrl K">Publish</eon-button>
        </div>
      `,
    },
    {
      label: 'Split action',
      content: `
        <div style="display:flex;gap:0.55rem;flex-wrap:wrap;">
          <eon-button tone="brand" variant="solid">Publish<span slot="end">&#9662;</span></eon-button>
          <eon-button tone="brand" variant="solid">Publish<span slot="end">&#9662;</span></eon-button>
          <eon-button tone="brand" variant="outline">Publish<span slot="end">&#9662;</span></eon-button>
        </div>
      `,
    },
  ];

  const variantRows = [
    {
      label: 'Primary',
      button: '<eon-button tone="brand" variant="solid" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>',
      icon: '<eon-button tone="brand" variant="solid" size="sm"><span slot="start">&#8599;</span></eon-button>',
      action: '<eon-button tone="brand" variant="solid" size="sm"><span slot="end">&#9662;</span></eon-button>',
    },
    {
      label: 'Secondary',
      button: '<eon-button tone="brand" variant="outline" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>',
      icon: '<eon-button tone="brand" variant="outline" size="sm"><span slot="start">&#8599;</span></eon-button>',
      action: '<eon-button tone="brand" variant="outline" size="sm"><span slot="end">&#9662;</span></eon-button>',
    },
    {
      label: 'Tertiary',
      button: '<eon-button tone="brand" variant="ghost" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>',
      icon: '<eon-button tone="brand" variant="ghost" size="sm"><span slot="start">&#8599;</span></eon-button>',
      action: '<eon-button tone="brand" variant="ghost" size="sm"><span slot="end">&#9662;</span></eon-button>',
    },
    {
      label: 'Ghost',
      button: '<eon-button tone="neutral" variant="soft" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>',
      icon: '<eon-button tone="neutral" variant="soft" size="sm"><span slot="start">&#8599;</span></eon-button>',
      action: '<eon-button tone="neutral" variant="soft" size="sm"><span slot="end">&#9662;</span></eon-button>',
    },
    {
      label: 'Destructive',
      button: '<eon-button tone="danger" variant="outline" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>',
      icon: '<eon-button tone="danger" variant="outline" size="sm"><span slot="start">&#8599;</span></eon-button>',
      action: '<eon-button tone="danger" variant="outline" size="sm"><span slot="end">&#9662;</span></eon-button>',
    },
  ];

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '10rem minmax(0, 1fr) 12rem',
      left: `
        <aside style="display:grid;gap:0.9rem;padding:0.95rem;border-radius:1.12rem;border:1px solid rgba(226,232,240,0.92);background:rgba(255,255,255,0.96);min-height:100%;">
          <div style="display:grid;gap:0.25rem;">
            <span style="font-size:0.76rem;letter-spacing:0.1em;text-transform:uppercase;color:#2563eb;font-weight:700;">EONUI</span>
            <strong style="font-size:1.02rem;color:#1f2937;">Button System</strong>
            <span style="font-size:0.9rem;color:#6b7280;">Action Components</span>
          </div>
          <div style="display:grid;gap:0.34rem;">
            <span style="font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;font-weight:700;">Overview</span>
            ${['Anatomy', 'Variants', 'States', 'Patterns', 'Content'].map((item, index) => `
              <div style="display:flex;align-items:center;gap:0.48rem;padding:0.34rem 0.45rem;border-radius:0.72rem;${index === 0 ? 'background:rgba(37,99,235,0.08);' : ''}">
                <span style="width:0.42rem;height:0.42rem;border-radius:999px;background:${index === 0 ? '#2563eb' : 'rgba(203,213,225,0.95)'};"></span>
                <span style="font-size:0.86rem;color:#374151;">${item}</span>
              </div>
            `).join('')}
          </div>
          ${renderExactKeyValueList([
            { label: 'Theme', value: 'Light' },
            { label: 'Density', value: 'Comfort' },
            { label: 'Size', value: 'M' },
          ], { minLabel: '3.9rem' })}
          <div style="margin-top:auto;display:grid;gap:0.2rem;color:#6b7280;font-size:0.82rem;line-height:1.55;">
            <span>Built for clarity.</span>
            <span>Made for action.</span>
          </div>
        </aside>
      `,
      center: `
        ${renderExactShellCard('Button anatomy', `
          <div style="display:grid;grid-template-columns:10.2rem minmax(0, 1.2fr) 0.62fr;gap:0.9rem;align-items:start;">
            <div style="display:grid;gap:0.38rem;padding-right:0.95rem;border-right:1px solid rgba(226,232,240,0.96);">
              <strong style="font-size:0.98rem;line-height:1.42;color:#1f2937;">A slot-based structure for consistent actions.</strong>
              <p style="margin:0;color:#6b7280;line-height:1.62;">${escapeHtml(mockDesign?.conceptTitle || 'architectural Button sheet-based')}</p>
            </div>
            <div style="display:grid;gap:0.68rem;">
              <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:0.5rem;text-align:center;">
                ${[
                  ['Start', 'Icon / Leading'],
                  ['Default', 'Label'],
                  ['End', 'Icon / Trailing'],
                  ['Loading', 'Progress'],
                ].map(([label, meta]) => `
                  <div style="display:grid;gap:0.18rem;">
                    <span style="font-size:0.69rem;letter-spacing:0.11em;text-transform:uppercase;color:#2563eb;font-weight:700;">${label}</span>
                    <span style="font-size:0.74rem;color:#6b7280;">${meta}</span>
                  </div>
                `).join('')}
              </div>
              <div style="display:grid;place-items:center;padding:1rem 1rem 0.65rem;border-radius:1rem;border:1px solid rgba(191,219,254,0.9);background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92));">
                <div style="display:grid;gap:0.42rem;justify-items:center;">
                  <eon-button tone="brand" variant="solid" shortcut="Ctrl K">
                    <span slot="start">&#8599;</span>
                    Publish
                    <span slot="end">&#9662;</span>
                  </eon-button>
                  <div style="display:grid;gap:0.12rem;justify-items:center;">
                    <span style="font-size:0.68rem;letter-spacing:0.11em;text-transform:uppercase;color:#2563eb;font-weight:700;">Badge</span>
                    <span style="font-size:0.74rem;color:#6b7280;">Shortcut / Hint</span>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:grid;gap:0.52rem;">
              <div style="display:grid;gap:0.18rem;text-align:center;">
                <strong style="font-size:0.9rem;color:#1f2937;">Loading specimen</strong>
              </div>
              <div style="display:grid;place-items:center;min-height:6.8rem;padding:0.9rem;border-radius:1rem;border:1px solid rgba(191,219,254,0.9);background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92));">
                <eon-button tone="brand" variant="solid" badge="45%">
                  <span slot="start">&#9711;</span>
                  Publish
                </eon-button>
              </div>
            </div>
          </div>
        `, { accent: '#6b7280' })}
      `,
      right: `
        ${renderExactShellCard('Slot system', renderExactKeyValueList([
          { label: 'Start', value: 'Optional leading icon or indicator' },
          { label: 'Default', value: 'Primary label or text value' },
          { label: 'End', value: 'Optional trailing icon or action' },
          { label: 'Loading', value: 'Progress or activity indicator' },
          { label: 'Badge', value: 'Contextual hint or shortcut' },
        ], { minLabel: '4.2rem' }), { accent: '#6b7280' })}
      `,
    }),
    sections: [
      renderExactShellCard('States', `
        <div style="display:grid;grid-template-columns:repeat(7, minmax(0, 1fr));gap:0.7rem;">
          ${stateExamples.map((item) => `
            <div style="display:grid;gap:0.42rem;">
              <span style="font-size:0.8rem;color:#6b7280;text-align:center;">${item.title}</span>
              <div style="display:grid;place-items:center;min-height:4rem;padding:0.55rem 0.4rem;border-radius:0.95rem;border:1px solid rgba(226,232,240,0.94);background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.92));">
                ${item.code}
              </div>
            </div>
          `).join('')}
        </div>
      `, { accent: '#6b7280' }),
      `
        <div style="display:grid;grid-template-columns:1.28fr 1fr 1fr;gap:0.9rem;align-items:start;">
          ${renderExactShellCard('Content patterns', `
            <div style="display:grid;gap:0.68rem;">
              ${patternRows.map((item) => `
                <div style="display:grid;grid-template-columns:4.8rem minmax(0, 1fr);gap:0.72rem;align-items:center;">
                  <span style="font-size:0.82rem;color:#4b5563;">${item.label}</span>
                  <div style="display:flex;gap:0.55rem;flex-wrap:wrap;">${item.content}</div>
                </div>
              `).join('')}
            </div>
          `, { accent: '#6b7280' })}
          ${renderExactShellCard('Size & density', `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;">
              <div style="display:grid;gap:0.6rem;justify-items:center;">
                <span style="font-size:0.82rem;color:#4b5563;">Compact</span>
                <eon-button size="sm" variant="outline" tone="brand" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>
                <eon-button size="md" variant="outline" tone="brand" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>
                <eon-button size="lg" variant="outline" tone="brand" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>
              </div>
              <div style="display:grid;gap:0.6rem;justify-items:center;">
                <span style="font-size:0.82rem;color:#4b5563;">Comfortable (default)</span>
                <eon-button size="sm" tone="brand" variant="solid" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>
                <eon-button size="md" tone="brand" variant="solid" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>
                <eon-button size="lg" tone="brand" variant="solid" shortcut="Ctrl K"><span slot="start">&#8599;</span>Publish</eon-button>
              </div>
            </div>
          `, { accent: '#6b7280' })}
          ${renderExactShellCard('Variants', `
            <div style="display:grid;gap:0.68rem;">
              ${variantRows.map((item) => `
                <div style="display:grid;grid-template-columns:4rem minmax(0, 1fr) 2.5rem 2.5rem;gap:0.55rem;align-items:center;">
                  <span style="font-size:0.82rem;color:#4b5563;">${item.label}</span>
                  <div>${item.button}</div>
                  <div style="display:grid;place-items:center;">${item.icon}</div>
                  <div style="display:grid;place-items:center;">${item.action}</div>
                </div>
              `).join('')}
            </div>
          `, { accent: '#6b7280' })}
        </div>
      `,
      `
        <div style="display:grid;grid-template-columns:1.35fr 1fr 1fr 1fr;gap:0.9rem;align-items:start;">
          ${renderExactShellCard('Usage', `
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;">
              ${[
                'Use Primary for the main affirmative action.',
                'Use Secondary for alternative actions.',
                'Use Tertiary or Ghost for low emphasis actions.',
                'Use Destructive with care and clear confirmation.',
              ].map((item, index) => `
                <div style="display:flex;gap:0.58rem;align-items:flex-start;color:#4b5563;line-height:1.58;">
                  <span style="width:1rem;height:1rem;margin-top:0.18rem;border-radius:999px;display:inline-grid;place-items:center;border:1px solid rgba(191,219,254,0.95);color:${index === 3 ? '#dc2626' : '#2563eb'};font-size:0.68rem;">${index === 3 ? '!' : '&#10003;'}</span>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          `, { accent: '#6b7280' })}
          ${renderExactShellCard('Accessibility', renderExactBulletList([
            'Minimum target size: 44x44.',
            'Visible focus for keyboard users.',
            'Supports shortcuts and hints.',
          ], { accent: '#94a3b8' }), { accent: '#6b7280' })}
          ${renderExactShellCard('Implementation notes', renderExactBulletList([
            'Slots collapse intelligently when content is absent.',
            'Badges adapt to text length and localization.',
            'Loading replaces label without layout shift.',
          ], { accent: '#cbd5e1' }), { accent: '#6b7280' })}
          ${renderExactShellCard('Anatomy wireframe', `
            <div style="display:grid;gap:0.5rem;justify-items:center;padding-top:0.2rem;">
              <div style="display:grid;grid-template-columns:4rem 8rem 3.4rem;gap:0.18rem;align-items:end;">
                <div style="display:grid;gap:0.18rem;justify-items:center;">
                  <span style="font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;color:#60a5fa;font-weight:700;">Start</span>
                  <div style="width:100%;height:2.8rem;border:1px dashed rgba(96,165,250,0.95);border-radius:0.78rem;"></div>
                </div>
                <div style="display:grid;gap:0.18rem;justify-items:center;">
                  <span style="font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;color:#60a5fa;font-weight:700;">Default</span>
                  <div style="width:100%;height:2.8rem;border:1px dashed rgba(96,165,250,0.95);border-radius:0.78rem;"></div>
                </div>
                <div style="display:grid;gap:0.18rem;justify-items:center;">
                  <span style="font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;color:#60a5fa;font-weight:700;">End</span>
                  <div style="width:100%;height:2.8rem;border:1px dashed rgba(96,165,250,0.95);border-radius:0.78rem;"></div>
                </div>
              </div>
              <div style="display:grid;grid-template-columns:8rem 4rem;gap:1.6rem;">
                <div style="display:grid;gap:0.15rem;justify-items:center;">
                  <div style="width:100%;height:1rem;border:1px dashed rgba(96,165,250,0.95);border-radius:0.5rem;"></div>
                  <span style="font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;color:#60a5fa;font-weight:700;">Loading</span>
                </div>
                <div style="display:grid;gap:0.15rem;justify-items:center;">
                  <div style="width:100%;height:1rem;border:1px dashed rgba(96,165,250,0.95);border-radius:0.5rem;"></div>
                  <span style="font-size:0.66rem;letter-spacing:0.1em;text-transform:uppercase;color:#60a5fa;font-weight:700;">Badge</span>
                </div>
              </div>
            </div>
          `, { accent: '#6b7280' })}
        </div>
      `,
    ],
  });
}

function createExactButtonGroupMockConceptPlayground(entry, mockDesign, baseExamples) {
  const exampleSet = getMockExampleSet(baseExamples);
  const primary = exampleSet.manifest || exampleSet.custom;
  const contextual = exampleSet.custom || exampleSet.modernized || primary;
  const modernized = exampleSet.modernized || contextual || primary;
  const generated = exampleSet.generated || primary;

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '12rem minmax(0, 1fr) 12rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.3rem;">
            <strong style="font-size:1rem;color:#1f2937;">EON UI</strong>
            <span style="color:#6b7280;">Component system</span>
          </div>
          ${renderExactBulletList(['Overview', 'Button', 'Button group', 'Icon button', 'Toggle', 'Menu button'], { accent: '#2563eb' })}
          ${renderExactKeyValueList([
            { label: 'Theme', value: 'Generic / Light · Generic / Dark' },
            { label: 'Density', value: 'Comfortable · Compact · Dense' },
          ], { minLabel: '4.4rem' })}
          ${renderExactSidebarNote('Button groups', 'Organize related actions into scannable clusters that save space and reduce cognitive load.')}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Button group system', `
            <div style="display:grid;gap:0.85rem;">
              <div style="display:grid;grid-template-columns:minmax(0, 1fr) 14rem;gap:0.9rem;align-items:start;">
                ${renderExactSpecimen(contextual, { title: mockDesign?.conceptTitle || 'Segmented action cluster', subtitle: 'Start · Default · Badge · End · Loading', minHeight: '8.25rem' })}
                ${renderExactShellCard('Anatomy', renderExactKeyValueList([
                  { label: 'Start', value: 'Optional leading icon' },
                  { label: 'Default', value: 'Primary label or value' },
                  { label: 'Badge', value: 'Count or status indicator' },
                  { label: 'End', value: 'Trailing icon or menu trigger' },
                  { label: 'Loading', value: 'Progress / busy state' },
                ]), { accent: '#6b7280' })}
              </div>
            </div>
          `, { accent: '#2563eb' })}
          ${renderExactSectionGrid('Variants', [
            renderExactSpecimen(primary, { title: 'Default', minHeight: '5.25rem' }),
            renderExactSpecimen(contextual, { title: 'With badge', minHeight: '5.25rem' }),
            renderExactSpecimen(modernized, { title: 'With shortcuts', minHeight: '5.25rem', accent: '#0f766e' }),
            renderExactSpecimen(generated, { title: 'With dropdown end', minHeight: '5.25rem', accent: '#6b7280' }),
          ], { columns: 'repeat(4, minmax(0, 1fr))', accent: '#6b7280' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('At a glance', renderExactBulletList([
            'Compact action clusters for productivity surfaces.',
            'Optimized for fast workflows and state variation.',
            'Supports badges, shortcuts, and grouped actions.',
          ], { accent: '#2563eb' }), { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('States', ['Default', 'Hover', 'Pressed', 'Selected', 'Loading', 'Partially loading', 'All loading', 'Success', 'Destructive', 'Disabled'].map((label, index) =>
        renderExactSpecimen([primary, contextual, contextual, modernized, generated, contextual, generated, modernized, contextual, generated][index] || primary, { title: label, minHeight: '5rem', accent: index >= 7 ? '#0f766e' : '#2563eb' })
      ), { columns: 'repeat(5, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Density, badges, and splits', [
        renderExactSpecimen(primary, { title: 'Density presets', minHeight: '8rem' }),
        renderExactSpecimen(contextual, { title: 'Icons & order examples', minHeight: '8rem' }),
        renderExactSpecimen(modernized, { title: 'Badge & count patterns', minHeight: '8rem', accent: '#0f766e' }),
        renderExactSpecimen(generated, { title: 'Split button group', minHeight: '8rem', accent: '#6b7280' }),
      ], { columns: 'repeat(4, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Keyboard, contextual, destructive, and overflow', [
        renderExactShellCard('Keyboard shortcuts', renderExactBadgeRow(['Filter', 'Sort', 'Export', 'Share'], { activeIndexes: [0, 2], accent: '#2563eb' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactSpecimen(contextual, { title: 'Contextual group', subtitle: 'Appears by selection or view', minHeight: '6rem', accent: '#0f766e' }),
        renderExactSpecimen(modernized, { title: 'Confirmation flow', subtitle: 'Destructive action', minHeight: '6rem', accent: '#dc2626' }),
        renderExactSpecimen(generated, { title: 'Overflow handling', minHeight: '6rem', accent: '#6b7280' }),
      ], { columns: '1fr 1fr 1fr 0.9fr', accent: '#6b7280' }),
    ],
  });
}

function renderStaticSplitActionTrigger(options = {}) {
  const {
    label = 'Send summary',
    muted = false,
    focused = false,
    loading = false,
    badge = '',
    compact = false,
  } = options;

  const height = compact ? '2.9rem' : '3.25rem';
  const fontSize = compact ? '0.98rem' : '1rem';
  const focusRing = focused ? '0 0 0 4px rgba(59,130,246,0.14)' : '0 14px 28px rgba(226,232,240,0.4)';
  const labelColor = muted ? '#64748b' : '#111827';

  return `
    <div style="display:inline-flex;align-items:stretch;border-radius:1.35rem;border:1px solid rgba(226,232,240,0.98);background:rgba(255,255,255,0.98);box-shadow:${focusRing};overflow:hidden;">
      <div style="display:inline-flex;align-items:center;gap:0.65rem;min-height:${height};padding:0 1.55rem;background:rgba(255,255,255,0.98);color:${labelColor};font-size:${fontSize};font-weight:700;">
        <span>${escapeHtml(label)}</span>
        ${loading ? '<span style="display:inline-flex;align-items:center;justify-content:center;min-width:2.5rem;min-height:1.7rem;padding:0 0.6rem;border-radius:999px;background:rgba(241,245,249,0.95);color:#475569;font-size:0.84rem;font-weight:700;">45%</span>' : ''}
        ${badge ? `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:2.5rem;min-height:1.7rem;padding:0 0.65rem;border-radius:999px;background:rgba(59,130,246,0.1);color:#1d4ed8;font-size:0.84rem;font-weight:700;">${escapeHtml(badge)}</span>` : ''}
      </div>
      <div style="display:inline-flex;align-items:center;justify-content:center;min-width:${compact ? '3.15rem' : '3.45rem'};padding:0 0.7rem;border-left:1px solid rgba(226,232,240,0.98);background:rgba(255,255,255,0.98);color:#334155;font-size:1.05rem;font-weight:700;">⌃</div>
    </div>
  `;
}

function renderStaticDropDownMenuPanel(options = {}) {
  const {
    title = 'Reviewer actions',
    description = 'Pick the next step for this staging-ready release.',
    compact = false,
  } = options;

  const sections = [
    {
      label: 'Share',
      items: [
        {
          label: 'Send summary',
          description: 'Post the current release summary to stakeholders.',
          chips: ['Primary', 'S'],
          selected: true,
        },
      ],
    },
    {
      label: 'Review',
      items: [
        {
          label: 'Request approval',
          description: 'Notify approvers with the current checklist.',
          meta: 'Async',
          chips: ['Pending', 'A'],
        },
      ],
    },
    {
      label: 'Danger',
      items: [
        {
          label: 'Archive draft',
          description: 'Move the current release out of the active queue.',
          tone: 'danger',
          chips: ['Warn'],
        },
      ],
    },
  ];

  return `
    <div style="display:grid;gap:${compact ? '0.65rem' : '0.8rem'};width:min(100%, 26rem);padding:${compact ? '0.9rem' : '1rem'};border-radius:1.35rem;border:1px solid rgba(226,232,240,0.98);background:rgba(255,255,255,0.985);box-shadow:0 18px 36px rgba(148,163,184,0.18);">
      <div style="display:grid;gap:0.35rem;">
        <strong style="font-size:${compact ? '1rem' : '1.02rem'};color:#111827;">${escapeHtml(title)}</strong>
        <span style="color:#64748b;line-height:1.45;">${escapeHtml(description)}</span>
      </div>
      ${sections
        .map((section) => `
          <div style="display:grid;gap:0.5rem;${section.label === 'Share' ? '' : 'padding-top:0.65rem;border-top:1px solid rgba(226,232,240,0.92);'}">
            <span style="font-size:0.72rem;letter-spacing:0.09em;text-transform:uppercase;color:#64748b;font-weight:700;">${escapeHtml(section.label)}</span>
            ${section.items
              .map((item) => `
                <div style="display:grid;gap:0.35rem;padding:${compact ? '0.8rem' : '0.9rem'};border-radius:1rem;${item.selected ? 'background:rgba(59,130,246,0.06);' : ''}">
                  <div style="display:flex;justify-content:space-between;gap:0.75rem;align-items:flex-start;">
                    <strong style="font-size:${compact ? '0.98rem' : '1rem'};color:${item.tone === 'danger' ? '#b42318' : '#111827'};">${escapeHtml(item.label)}</strong>
                    ${item.meta ? `<span style="color:#64748b;font-size:0.84rem;font-weight:700;">${escapeHtml(item.meta)}</span>` : ''}
                  </div>
                  <span style="color:#64748b;line-height:1.45;">${escapeHtml(item.description)}</span>
                  <div style="display:flex;justify-content:flex-end;gap:0.45rem;flex-wrap:wrap;">
                    ${(item.chips || [])
                      .map((chip, index) => `
                        <span style="display:inline-flex;align-items:center;justify-content:center;min-height:1.8rem;padding:0 0.7rem;border-radius:999px;background:${index === 0 && item.selected ? 'rgba(59,130,246,0.12)' : 'rgba(241,245,249,0.95)'};color:${index === 0 && item.selected ? '#1d4ed8' : '#64748b'};font-size:0.82rem;font-weight:700;">${escapeHtml(chip)}</span>
                      `)
                      .join('')}
                    ${item.selected ? '<span style="display:inline-flex;align-items:center;justify-content:center;min-height:1.8rem;padding:0 0.45rem;color:#1d4ed8;font-size:1rem;font-weight:700;">✓</span>' : ''}
                  </div>
                </div>
              `)
              .join('')}
          </div>
        `)
        .join('')}
    </div>
  `;
}

function createStaticDropDownButtonMockExample(options = {}) {
  const {
    title = 'Split action',
    label = 'Send summary',
    expanded = false,
    focused = false,
    loading = false,
    badge = '',
    compact = false,
    showMenuOnly = false,
  } = options;

  return createInlineMockExample(
    title,
    `
      <div style="display:grid;gap:${expanded ? '0.95rem' : '0'};justify-items:start;pointer-events:none;">
        ${showMenuOnly ? '' : renderStaticSplitActionTrigger({ label, focused, loading, badge, compact })}
        ${expanded ? renderStaticDropDownMenuPanel({ compact }) : ''}
      </div>
    `
  );
}

function createExactDropDownButtonMockConceptPlayground(entry, mockDesign, baseExamples) {
  const splitSpecimen = createStaticDropDownButtonMockExample({
    title: 'Split trigger anatomy',
    label: 'Send summary',
  });
  const focusedSpecimen = createStaticDropDownButtonMockExample({
    title: 'Focused trigger',
    label: 'Send summary',
    focused: true,
  });
  const loadingSpecimen = createStaticDropDownButtonMockExample({
    title: 'Loading trigger',
    label: 'Send summary',
    loading: true,
  });
  const badgeSpecimen = createStaticDropDownButtonMockExample({
    title: 'With badge',
    label: 'Send summary',
    badge: 'Primary',
  });
  const expandedSpecimen = createStaticDropDownButtonMockExample({
    title: 'Expanded menu surface',
    label: 'Send summary',
    expanded: true,
  });
  const compactSpecimen = createStaticDropDownButtonMockExample({
    title: 'Compact density',
    label: 'Send summary',
    expanded: true,
    compact: true,
  });
  const menuOnlySpecimen = createStaticDropDownButtonMockExample({
    title: 'Menu item states',
    expanded: true,
    showMenuOnly: true,
  });
  const destructiveSpecimen = createStaticDropDownButtonMockExample({
    title: 'Destructive flow',
    label: 'Archive draft',
    expanded: true,
  });

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '12rem minmax(0, 1fr) 16rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.3rem;">
            <strong style="font-size:1.05rem;color:#1f2937;">${escapeHtml(entry.tag)}</strong>
            <span style="color:#6b7280;">Beta · ${escapeHtml(entry.description)}</span>
          </div>
          ${renderExactBulletList(['Overview', 'Button', 'Button group', 'Icon button', 'Drop down button', 'Menu button', 'Split button'], { accent: '#947c33' })}
          ${renderExactKeyValueList([
            { label: 'Theme', value: 'Generic / Light · Generic / Dark' },
            { label: 'Density', value: 'Comfortable · Compact · Dense' },
          ], { minLabel: '4.4rem' })}
          ${renderExactSidebarNote('Editorial actions', 'Drop down buttons group important actions into a stacked menu so the interface stays focused and uncluttered.')}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Anatomy', `
            <div style="display:grid;grid-template-columns:minmax(0, 1.1fr) 12rem;gap:1rem;align-items:start;">
              ${renderExactSpecimen(splitSpecimen, { title: mockDesign?.conceptTitle || 'Split trigger anatomy', subtitle: 'Start · Label · Badge · End · Loading', minHeight: '8.5rem', accent: '#947c33' })}
              ${renderExactShellCard('Slot system', renderExactKeyValueList([
                { label: 'Start', value: 'Optional leading icon' },
                { label: 'Default', value: 'Primary label or value' },
                { label: 'Badge', value: 'Count or status indicator' },
                { label: 'End', value: 'Chevron or disclosure' },
                { label: 'Loading', value: 'Progress or busy indicator' },
              ]), { accent: '#6b7280' })}
            </div>
          `, { accent: '#947c33' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Expanded menu surface', `
            ${renderExactSpecimen(expandedSpecimen, { title: 'Create menu', subtitle: 'Primary trigger with menu surface', minHeight: '24rem', accent: '#947c33' })}
          `, { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('Trigger states', ['Default', 'Hover', 'Pressed', 'Focused', 'With badge', 'Loading'].map((label, index) =>
        renderExactSpecimen([splitSpecimen, splitSpecimen, splitSpecimen, focusedSpecimen, badgeSpecimen, loadingSpecimen][index] || splitSpecimen, { title: label, minHeight: '5.25rem', accent: '#947c33' })
      ), { columns: 'repeat(6, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Menu item states and layout density', [
        renderExactSpecimen(menuOnlySpecimen, { title: 'Menu item states', minHeight: '24rem', accent: '#947c33' }),
        renderExactSpecimen(compactSpecimen, { title: 'Comfortable / compact / dense', minHeight: '24rem', accent: '#0f766e' }),
      ], { columns: '1.2fr 1fr', accent: '#6b7280' }),
      renderExactSectionGrid('Behavior patterns', [
        renderExactSpecimen(splitSpecimen, { title: 'Split trigger behavior', minHeight: '6rem', accent: '#947c33' }),
        renderExactShellCard('Keyboard shortcuts', renderExactBadgeRow(['Create', 'Duplicate', 'Archive', 'Delete'], { activeIndexes: [0, 3], accent: '#947c33' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactSpecimen(destructiveSpecimen, { title: 'Destructive flow', minHeight: '24rem', accent: '#dc2626' }),
        renderExactSpecimen(expandedSpecimen, { title: 'Success confirmation', minHeight: '24rem', accent: '#0f766e' }),
      ], { columns: '1fr 0.8fr 1fr 1fr', accent: '#6b7280' }),
    ],
  });
}

function createExactFloatingActionButtonMockConceptPlayground(entry, mockDesign, baseExamples) {
  const exampleSet = getMockExampleSet(baseExamples);
  const primary = exampleSet.manifest || exampleSet.custom;
  const contextual = exampleSet.custom || exampleSet.modernized || primary;
  const modernized = exampleSet.modernized || contextual || primary;
  const generated = exampleSet.generated || primary;

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '12rem minmax(0, 1fr) 14rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.3rem;">
            <strong style="font-size:1.9rem;line-height:1;color:#111827;">${escapeHtml(entry.tag)}</strong>
            <span style="color:#6b7280;">Beta</span>
            <p style="margin:0;color:#4b5563;line-height:1.62;">${escapeHtml(entry.description)}</p>
          </div>
          ${renderExactBulletList(['Overview', 'Button', 'Button group', 'Icon button', 'Toggle', 'Menu button', 'Floating action button'], { accent: '#2563eb' })}
          ${renderExactKeyValueList([
            { label: 'Theme', value: 'Generic / Light · Generic / Dark' },
            { label: 'Density', value: 'Comfortable · Compact · Dense' },
          ], { minLabel: '4.4rem' })}
          ${renderExactSidebarNote('Floating action', 'A primary, thumb-friendly action with optional contextual shortcuts.')}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Primary action system', `
            <div style="display:grid;grid-template-columns:minmax(0, 1fr) minmax(15rem, 0.9fr);gap:1rem;align-items:start;">
              ${renderExactSpecimen(contextual, { title: mockDesign?.conceptTitle || 'Split-panel control', subtitle: 'Start · Default · End shortcut', minHeight: '9rem' })}
              ${renderExactSpecimen(modernized, { title: 'Expanded orbit', subtitle: 'New task · Upload · Record · Invite', minHeight: '9rem', accent: '#0f766e' })}
            </div>
          `, { accent: '#2563eb' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Variants', renderExactKeyValueList([
            { label: 'Standard', value: 'Primary action with split menu' },
            { label: 'Icon only', value: 'Single quick action' },
            { label: 'Destructive', value: 'Critical undo / delete task' },
            { label: 'Minimal', value: 'Low emphasis contextual action' },
          ]), { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('States', ['Collapsed', 'Expanded', 'Busy (opening)', 'Busy (action)', 'Success', 'Destructive', 'Disabled'].map((label, index) =>
        renderExactSpecimen([primary, contextual, generated, modernized, modernized, contextual, generated][index] || primary, { title: label, minHeight: '5.5rem', accent: index >= 4 ? '#0f766e' : '#2563eb' })
      ), { columns: 'repeat(7, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Expanded actions and positioning', [
        renderExactSpecimen(primary, { title: 'Expanded actions (default set)', minHeight: '8rem' }),
        renderExactSpecimen(contextual, { title: 'Customizable sets', minHeight: '8rem', accent: '#0f766e' }),
        renderExactSpecimen(modernized, { title: 'Menu alignment', minHeight: '8rem', accent: '#6b7280' }),
        renderExactSpecimen(generated, { title: 'Mobile preview', minHeight: '8rem', accent: '#6b7280' }),
      ], { columns: '1.1fr 1fr 0.8fr 0.8fr', accent: '#6b7280' }),
      renderExactSectionGrid('Accessibility', [
        renderExactShellCard('Behavior notes', renderExactBulletList([
          '44x44 minimum touch target.',
          'High contrast iconography.',
          'Focus visible in keyboard navigation.',
          'Announced as "Create menu".',
          'Supports screen reader labels.',
        ], { accent: '#2563eb' }), { accent: '#6b7280', minHeight: '100%' }),
      ], { columns: '1fr', accent: '#6b7280' }),
    ],
  });
}

function createExactIconButtonMockConceptPlayground(entry, mockDesign, baseExamples) {
  const exampleSet = getMockExampleSet(baseExamples);
  const primary = exampleSet.manifest || exampleSet.custom;
  const contextual = exampleSet.custom || exampleSet.modernized || primary;
  const modernized = exampleSet.modernized || contextual || primary;
  const generated = exampleSet.generated || primary;

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '12rem minmax(0, 1fr) 15rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.3rem;">
            <strong style="font-size:1.05rem;color:#111827;">EON UI</strong>
            <span style="color:#6b7280;">Component system</span>
          </div>
          ${renderExactBulletList(['Overview', 'Button', 'Button group', 'Icon button', 'Toggle', 'Menu button', 'Split button'], { accent: '#0f766e' })}
          ${renderExactKeyValueList([
            { label: 'Theme', value: 'Generic / Light · Generic / Dark' },
            { label: 'Density', value: 'Comfortable · Compact · Dense' },
          ], { minLabel: '4.4rem' })}
          ${renderExactSidebarNote('Rail-driven actions', 'Compact icon controls with strong state feedback and accessibility built in.')}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Icon button', `
            <div style="display:grid;grid-template-columns:minmax(16rem, 0.9fr) minmax(0, 1fr);gap:1rem;align-items:start;">
              <div style="display:grid;gap:0.55rem;">
                <strong style="font-size:3rem;line-height:0.94;color:#111827;font-family:Georgia, 'Times New Roman', serif;">Small control.<br>Big impact.</strong>
                <p style="margin:0;color:#4b5563;line-height:1.62;">Icon buttons are rail-driven utility controls for frequent actions. They prioritize clarity, feedback, and accessibility in the smallest possible footprint.</p>
              </div>
              <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:0.8rem;">
                ${['Edit', 'Share', 'Pin', 'Mute'].map((label, index) => renderExactSpecimen([primary, contextual, modernized, generated][index] || primary, { title: label, subtitle: ['E', 'S', 'P', 'M'][index], minHeight: '7rem', accent: '#0f766e' })).join('')}
              </div>
            </div>
          `, { accent: '#0f766e' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Anatomy', renderExactKeyValueList([
            { label: 'Container', value: 'Hug / square' },
            { label: 'Icon', value: '20px / centered' },
            { label: 'States', value: 'Interaction layer' },
          ]), { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('Basic icon states, toggles, and badges', [
        renderExactSpecimen(primary, { title: 'Basic icon states', minHeight: '7rem', accent: '#0f766e' }),
        renderExactSpecimen(contextual, { title: 'Toggled states', minHeight: '7rem', accent: '#0f766e' }),
        renderExactSpecimen(modernized, { title: 'Badge examples', minHeight: '7rem', accent: '#2563eb' }),
      ], { columns: '1.2fr 0.8fr 0.7fr', accent: '#6b7280' }),
      renderExactSectionGrid('Toolbar, compact, and dense density', [
        renderExactSpecimen(primary, { title: 'Rail / toolbar examples', minHeight: '7rem' }),
        renderExactSpecimen(contextual, { title: 'Compact density', minHeight: '7rem', accent: '#0f766e' }),
        renderExactSpecimen(generated, { title: 'Dense density', minHeight: '7rem', accent: '#dc2626' }),
      ], { columns: '1.4fr 0.8fr 0.8fr', accent: '#6b7280' }),
      renderExactSectionGrid('State matrix and accessibility', [
        renderExactSpecimen(modernized, { title: 'State matrix', minHeight: '9rem', accent: '#2563eb' }),
        renderExactShellCard('Accessibility & behavior', renderExactBulletList([
          'Focus visible with a high-contrast ring.',
          'Keyboard friendly: Tab, Enter / Space.',
          'Minimum touch target 44x44.',
          'Includes screen reader labels.',
        ], { accent: '#0f766e' }), { accent: '#6b7280', minHeight: '100%' }),
      ], { columns: '1.6fr 0.9fr', accent: '#6b7280' }),
    ],
  });
}

function createExactSocialButtonMockConceptPlayground(entry, mockDesign, baseExamples) {
  const exampleSet = getMockExampleSet(baseExamples);
  const primary = exampleSet.manifest || exampleSet.custom;
  const contextual = exampleSet.custom || exampleSet.modernized || primary;
  const modernized = exampleSet.modernized || contextual || primary;
  const generated = exampleSet.generated || primary;

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '12rem minmax(0, 1fr) 14rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.3rem;">
            <strong style="font-size:1.9rem;line-height:1;color:#111827;">${escapeHtml(entry.tag)}</strong>
            <span style="color:#6b7280;">Beta</span>
            <p style="margin:0;color:#4b5563;line-height:1.62;">${escapeHtml(entry.description)}</p>
          </div>
          ${renderExactBulletList(['Overview', 'Button', 'Button group', 'Icon button', 'Floating action button', 'Social button'], { accent: '#ff6b57' })}
          ${renderExactKeyValueList([
            { label: 'Theme', value: 'Generic / Light · Generic / Dark' },
            { label: 'Density', value: 'Comfortable · Compact · Dense' },
          ], { minLabel: '4.4rem' })}
          ${renderExactSidebarNote('Social actions', 'Quick actions to connect, share, follow, or go live across platforms with consistent states.')}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Anatomy', `
            <div style="display:grid;grid-template-columns:minmax(0, 1fr) 12rem;gap:1rem;">
              ${renderExactSpecimen(contextual, { title: mockDesign?.conceptTitle || 'Expressive social trigger', subtitle: 'Start · Label · Badge · End · Loading', minHeight: '8.25rem', accent: '#ff6b57' })}
              ${renderExactShellCard('Slot system', renderExactKeyValueList([
                { label: 'Start', value: 'Required brand or icon' },
                { label: 'Default', value: 'Primary action label' },
                { label: 'Badge', value: 'Optional count or status' },
                { label: 'End', value: 'Shortcut or meta' },
                { label: 'Loading', value: 'Progress or activity' },
              ]), { accent: '#6b7280' })}
            </div>
          `, { accent: '#ff6b57' })}
          ${renderExactSectionGrid('Platform variants', [
            renderExactSpecimen(primary, { title: 'Connect', minHeight: '5.25rem', accent: '#ff6b57' }),
            renderExactSpecimen(contextual, { title: 'Share post', minHeight: '5.25rem', accent: '#2563eb' }),
            renderExactSpecimen(modernized, { title: 'Follow', minHeight: '5.25rem', accent: '#9333ea' }),
            renderExactSpecimen(generated, { title: 'Live', minHeight: '5.25rem', accent: '#dc2626' }),
          ], { columns: 'repeat(4, minmax(0, 1fr))', accent: '#6b7280' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Usage examples', renderExactBulletList([
            'Connect · Build new connections.',
            'Share post · Distribute your content.',
            'Follow · Stay updated.',
            'Live · Go live to an audience.',
          ], { accent: '#ff6b57' }), { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('States', ['Default', 'Hover', 'Pressed', 'Focused', 'Loading', 'Success', 'Destructive', 'Disabled'].map((label, index) =>
        renderExactSpecimen([primary, contextual, contextual, modernized, generated, modernized, contextual, generated][index] || primary, { title: label, minHeight: '5rem', accent: index >= 5 ? '#0f766e' : '#ff6b57' })
      ), { columns: 'repeat(8, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Size, icon, badge, shortcut, and brand options', [
        renderExactSpecimen(primary, { title: 'Size & density', minHeight: '8rem', accent: '#ff6b57' }),
        renderExactSpecimen(contextual, { title: 'Icon options', minHeight: '8rem', accent: '#2563eb' }),
        renderExactSpecimen(modernized, { title: 'Badge options', minHeight: '8rem', accent: '#0f766e' }),
        renderExactSpecimen(generated, { title: 'Shortcut options', minHeight: '8rem', accent: '#6b7280' }),
      ], { columns: 'repeat(4, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Connect, share, live, and accessibility', [
        renderExactSpecimen(primary, { title: 'Connect flow', minHeight: '6rem', accent: '#ff6b57' }),
        renderExactSpecimen(contextual, { title: 'Share flow', minHeight: '6rem', accent: '#2563eb' }),
        renderExactSpecimen(modernized, { title: 'Live flow', minHeight: '6rem', accent: '#dc2626' }),
        renderExactShellCard('Accessibility', renderExactBulletList([
          'Minimum touch target: 44x44.',
          'Keyboard accessible: Tab, Enter, Space.',
          'Screen reader friendly with clear labels.',
          'High contrast and visible focus indicators.',
        ], { accent: '#ff6b57' }), { accent: '#6b7280', minHeight: '100%' }),
      ], { columns: '1fr 1fr 1fr 0.9fr', accent: '#6b7280' }),
    ],
  });
}

function createExactBatchOneActionMockConceptPlayground(entry, mockDesign, baseExamples) {
  switch (entry.tag) {
    case 'eon-app-store-button':
      return createExactAppStoreButtonMockConceptPlayground(entry, mockDesign, baseExamples);
    case 'eon-button':
      return createExactButtonAtlasV2MockConceptPlayground(entry, mockDesign, baseExamples);
    case 'eon-button-group':
      return createExactButtonGroupMockConceptPlayground(entry, mockDesign, baseExamples);
    case 'eon-drop-down-button':
      return createExactDropDownButtonMockConceptPlayground(entry, mockDesign, baseExamples);
    case 'eon-floating-action-button':
      return createExactFloatingActionButtonMockConceptPlayground(entry, mockDesign, baseExamples);
    case 'eon-icon-button':
      return createExactIconButtonMockConceptPlayground(entry, mockDesign, baseExamples);
    case 'eon-social-button':
      return createExactSocialButtonMockConceptPlayground(entry, mockDesign, baseExamples);
    default:
      return null;
  }
}

function createExactAutocompleteMockConceptPlayground(entry, mockDesign, baseExamples, sharedReferences = []) {
  const exampleSet = getMockExampleSet(baseExamples);
  const primary = exampleSet.manifest || exampleSet.custom;
  const contextual = exampleSet.custom || exampleSet.modernized || primary;
  const modernized = exampleSet.modernized || contextual || primary;
  const generated = exampleSet.generated || primary;
  const sharedLabels = trimItems(sharedReferences.map((item) => `${humanizeName(item.theme || 'default')}: ${item.label}`), 2);

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '15rem minmax(0, 1.45fr) 14rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.35rem;">
            <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
              ${renderBoardTag(entry.tag, { background: 'rgba(241,245,249,0.95)', color: '#475569' })}
              ${renderBoardTag('Autocomplete', { background: 'rgba(255,255,255,0.92)', color: '#475569' })}
            </div>
            <strong style="font-size:1.9rem;line-height:1.02;color:#111827;font-family:Georgia, 'Times New Roman', serif;">${escapeHtml(entry.tag)}</strong>
            <p style="margin:0;color:#4b5563;line-height:1.65;">${escapeHtml(entry.description)}</p>
          </div>
          ${renderExactBulletList([
            'Live typeahead & fuzzy matching',
            'Grouped suggestions',
            'Rich metadata & descriptions',
            'Recent searches',
            'Keyboard accessible',
            'Multi-select with tokens',
          ], { accent: '#2563eb' })}
          ${renderExactSidebarNote('Design goal', 'Reduce effort and errors by surfacing the right options at the right time.')}
          ${sharedLabels.length ? renderExactSidebarNote('Workspace pack', sharedLabels.join(' · ')) : ''}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Primary example — spacious', `
            <div style="display:grid;gap:0.85rem;">
              ${renderExactSpecimen(contextual, { title: mockDesign?.conceptTitle || 'Autocomplete console', subtitle: 'Project or workspace · grouped results · quick actions', minHeight: '15rem', accent: '#2563eb' })}
            </div>
          `, { accent: '#2563eb' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Anatomy', renderExactKeyValueList([
            { label: '1', value: 'Floating label' },
            { label: '2', value: 'Input with leading icon' },
            { label: '3', value: 'Clear action' },
            { label: '4', value: 'Dropdown trigger' },
            { label: '5', value: 'Helper text & count' },
            { label: '6', value: 'Suggestion surface' },
            { label: '7', value: 'Group header' },
            { label: '8', value: 'Metadata option rows' },
          ]), { accent: '#6b7280' })}
          ${renderExactShellCard('States overview', renderExactBadgeRow(['Default', 'Focused', 'Selected', 'Loading', 'Empty', 'Error'], { activeIndexes: [0, 1, 2], accent: '#2563eb' }), { accent: '#6b7280' })}
          ${renderExactShellCard('Best practices', renderExactBulletList([
            'Require 2+ characters to search.',
            'Show the most relevant first.',
            'Use groups to improve scanning.',
            'Include metadata for clarity.',
            'Allow creation when appropriate.',
          ], { accent: '#0f766e' }), { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('Recent, multi-select, and async loading', [
        renderExactShellCard('Recent searches', renderExactBulletList([
          'Northwind Analytics Platform',
          'Northstar Redesign Initiative',
          'Northern Lights Data Hub',
          'Clear recent searches',
        ], { accent: '#2563eb' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactSpecimen(modernized, { title: 'Multi-select with creation', minHeight: '10rem', accent: '#2563eb' }),
        renderExactSpecimen(generated, { title: 'Async loading', minHeight: '10rem', accent: '#6b7280' }),
      ], { columns: '0.9fr 1.1fr 1fr', accent: '#6b7280' }),
      renderExactSectionGrid('Empty, error, and compact density', [
        renderExactSpecimen(createInlineMockExample('Empty state', `
          <div style="display:grid;gap:0.8rem;">
            <eon-autocomplete label="Project or workspace" value="xyz" show-clear-button></eon-autocomplete>
            <div style="display:grid;place-items:center;gap:0.4rem;padding:1rem 0;color:#6b7280;">
              <div style="font-size:2rem;">⌕</div>
              <strong style="color:#374151;">No results found</strong>
              <span>Try a different keyword or create a new one.</span>
            </div>
          </div>
        `), { title: 'Empty state', minHeight: '10rem', accent: '#6b7280' }),
        renderExactSpecimen(createInlineMockExample('Error state', `
          <div style="display:grid;gap:0.8rem;">
            <eon-autocomplete label="Project or workspace" value="north" invalid error-text="Something went wrong. Please try again." opened></eon-autocomplete>
            <div style="display:grid;gap:0.45rem;color:#4b5563;">
              <strong style="color:#ef4444;">Try these instead</strong>
              <span>Northwind Analytics Platform</span>
              <span>Northstar Redesign Initiative</span>
            </div>
          </div>
        `), { title: 'Error state', minHeight: '10rem', accent: '#dc2626' }),
        renderExactSpecimen(primary, { title: 'Compact density', minHeight: '10rem', accent: '#2563eb' }),
      ], { columns: 'repeat(3, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Size variants, keyboard shortcuts, and tip', [
        renderExactSpecimen(primary, { title: 'Size variants', minHeight: '7rem', accent: '#2563eb' }),
        renderExactShellCard('Keyboard shortcuts', renderExactBadgeRow(['Navigate', 'Select / Insert', 'Insert & keep typing', 'Close', 'Focus search'], { activeIndexes: [0, 1], accent: '#6b7280' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Tip', '<p style="margin:0;color:#4b5563;line-height:1.6;">Start typing to see results. Use arrows to navigate and Enter to select.</p>', { accent: '#0f766e', minHeight: '100%' }),
      ], { columns: '1fr 1fr 0.8fr', accent: '#6b7280' }),
    ],
  });
}

function createExactCalendarMockConceptPlayground(entry, mockDesign, baseExamples) {
  const exampleSet = getMockExampleSet(baseExamples);
  const primary = exampleSet.manifest || exampleSet.custom;
  const contextual = exampleSet.custom || exampleSet.modernized || primary;
  const modernized = exampleSet.modernized || contextual || primary;
  const generated = exampleSet.generated || primary;

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '15rem minmax(0, 1.5fr) 12rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.35rem;">
            <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
              ${renderBoardTag(entry.tag, { background: 'rgba(241,245,249,0.95)', color: '#475569' })}
              ${renderBoardTag('Calendar & scheduling', { background: 'rgba(255,255,255,0.92)', color: '#475569' })}
            </div>
            <strong style="font-size:1.9rem;line-height:1.02;color:#111827;font-family:Georgia, 'Times New Roman', serif;">${escapeHtml(entry.tag)}</strong>
            <p style="margin:0;color:#4b5563;line-height:1.65;">${escapeHtml(entry.description)}</p>
          </div>
          ${renderExactBulletList([
            'Multiple views (Month, Week, Day)',
            'Range & single date selection',
            'Events, status & availability',
            'Time zones & working hours',
            'Keyboard accessible',
            'Responsive & touch friendly',
          ], { accent: '#22543d' })}
          ${renderExactSidebarNote('Design goal', 'Make time easy to scan, plan, and act on. Reduce friction with smart defaults, clear feedback, and rich context.')}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Primary example — month view', `
            ${renderExactSpecimen(contextual, { title: mockDesign?.conceptTitle || 'Calendar editorial spread', subtitle: 'Month view · filters · quick actions · range awareness', minHeight: '18rem', accent: '#22543d' })}
          `, { accent: '#22543d' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Agenda — Friday, Jun 13', renderExactBulletList([
            '9:00 AM · Team stand-up · 30m',
            '11:00 AM · Client check-in · 1h',
            '1:30 PM · Deep work · 2h',
            '4:00 PM · Release planning · 1h',
            'All day · Offsite prep',
          ], { accent: '#2563eb' }), { accent: '#6b7280' })}
          ${renderExactShellCard('Quick actions', renderExactBulletList([
            'Schedule meeting',
            'Focus time',
            'Out of office',
            'Task deadline',
          ], { accent: '#22543d' }), { accent: '#6b7280' })}
          ${renderExactShellCard('Date presets', renderExactBadgeRow(['Today', 'Tomorrow', 'This week', 'Next week', 'This month', 'Next month'], { activeIndexes: [0, 2, 4], accent: '#22543d' }), { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('Selection, create event, and day preview', [
        renderExactSpecimen(primary, { title: 'Selection & range', minHeight: '10rem', accent: '#22543d' }),
        renderExactSpecimen(modernized, { title: 'Create event (popover preview)', minHeight: '10rem', accent: '#2563eb' }),
        renderExactSpecimen(generated, { title: 'Day preview — Jun 12', minHeight: '10rem', accent: '#6b7280' }),
      ], { columns: 'repeat(3, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('State variants', [
        renderExactShellCard('No events', '<div style="display:grid;place-items:center;gap:0.35rem;padding:1rem 0;color:#4b5563;"><strong>Nothing scheduled</strong><span>Enjoy your free time.</span><span style="color:#22543d;">+ Create an event</span></div>', { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Loading', '<div style="display:grid;place-items:center;gap:0.35rem;padding:1rem 0;color:#4b5563;"><strong>Loading events...</strong><span>Please wait a moment.</span></div>', { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Error state', '<div style="display:grid;place-items:center;gap:0.35rem;padding:1rem 0;color:#ef4444;"><strong>Unable to load events</strong><span style="color:#4b5563;">Check your connection and try again.</span></div>', { accent: '#dc2626', minHeight: '100%' }),
        renderExactShellCard('Out of office', '<div style="display:grid;place-items:center;gap:0.35rem;padding:1rem 0;color:#4b5563;"><strong>Out of office</strong><span>You are unavailable during this period.</span></div>', { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Read-only', '<div style="display:grid;place-items:center;gap:0.35rem;padding:1rem 0;color:#4b5563;"><strong>This calendar is read-only.</strong><span>You can’t create or edit events here.</span></div>', { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Disabled dates', '<div style="display:grid;place-items:center;gap:0.35rem;padding:1rem 0;color:#4b5563;"><strong>Unavailable dates are dimmed.</strong></div>', { accent: '#6b7280', minHeight: '100%' }),
      ], { columns: 'repeat(6, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Compact, mobile, keyboard, and validation', [
        renderExactSpecimen(primary, { title: 'Compact inline picker', minHeight: '7rem', accent: '#22543d' }),
        renderExactSpecimen(generated, { title: 'Mobile preview', minHeight: '7rem', accent: '#6b7280' }),
        renderExactShellCard('Keyboard navigation', renderExactBulletList([
          'Arrow keys to move focus',
          'Enter to select date or open event',
          'Shift + Arrows to select range',
          'T to go to today',
        ], { accent: '#22543d' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactShellCard('Validation example', '<p style="margin:0;color:#ef4444;line-height:1.65;">Please select a valid future date.</p>', { accent: '#dc2626', minHeight: '100%' }),
      ], { columns: '1fr 0.8fr 0.9fr 0.7fr', accent: '#6b7280' }),
    ],
  });
}

function createExactCheckboxMockConceptPlayground(entry, mockDesign, baseExamples) {
  const exampleSet = getMockExampleSet(baseExamples);
  const primary = exampleSet.manifest || exampleSet.custom;
  const contextual = exampleSet.custom || exampleSet.modernized || primary;
  const modernized = exampleSet.modernized || contextual || primary;
  const generated = exampleSet.generated || primary;

  return renderExactSheetLayout({
    top: renderExactTopRailLayout({
      columns: '15rem minmax(0, 1.45fr) 14rem',
      left: `
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.2rem;border:1px solid rgba(209,213,219,0.82);background:rgba(255,255,255,0.92);">
          <div style="display:grid;gap:0.35rem;">
            <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
              ${renderBoardTag(entry.tag, { background: 'rgba(241,245,249,0.95)', color: '#475569' })}
              ${renderBoardTag('Checkbox', { background: 'rgba(255,255,255,0.92)', color: '#475569' })}
            </div>
            <strong style="font-size:1.9rem;line-height:1.02;color:#111827;font-family:Georgia, 'Times New Roman', serif;">${escapeHtml(entry.tag)}</strong>
            <p style="margin:0;color:#4b5563;line-height:1.65;">${escapeHtml(entry.description)}</p>
          </div>
          ${renderExactBulletList([
            'Multiple states & densities',
            'Nested & parent-child logic',
            'Card & list presentations',
            'Bulk actions & validation',
            'Accessible & keyboard-ready',
            'Indeterminate for partial selection',
          ], { accent: '#166534' })}
          ${renderExactSidebarNote('Design principles', 'Clarity first · Respect hierarchy · Reduce friction with smart defaults.')}
          ${renderExactSidebarNote('Density', 'Compact, default, and spacious options balance information density and readability.')}
        </aside>
      `,
      center: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('Checklist example — nested selection', `
            ${renderExactSpecimen(contextual, { title: mockDesign?.conceptTitle || 'Nested selection and validation', subtitle: 'Select all · parent-child logic · partial selection', minHeight: '16rem', accent: '#166534' })}
          `, { accent: '#166534' })}
        </div>
      `,
      right: `
        <div style="display:grid;gap:1rem;">
          ${renderExactShellCard('State reference', renderExactKeyValueList([
            { label: 'Unchecked', value: 'Default state' },
            { label: 'Checked', value: 'Item is selected' },
            { label: 'Indeterminate', value: 'Some child items selected' },
            { label: 'Disabled', value: 'Not interactive' },
            { label: 'Focused', value: 'Keyboard focus visible' },
            { label: 'Error', value: 'Selection required' },
            { label: 'Success', value: 'All required selected' },
          ]), { accent: '#6b7280' })}
          ${renderExactShellCard('Validation example', renderExactBulletList([
            'Select at least one option to continue.',
            'Email notifications',
            'Dashboard access',
            'Data exports',
          ], { accent: '#dc2626' }), { accent: '#6b7280' })}
        </div>
      `,
    }),
    sections: [
      renderExactSectionGrid('Cards, list variants, hierarchy, and actions', [
        renderExactSpecimen(primary, { title: 'Checkbox cards', minHeight: '10rem', accent: '#166534' }),
        renderExactSpecimen(contextual, { title: 'List variants', minHeight: '10rem', accent: '#166534' }),
        renderExactSpecimen(modernized, { title: 'Parent / child logic', minHeight: '10rem', accent: '#2563eb' }),
        renderExactSpecimen(generated, { title: 'Bulk actions', minHeight: '10rem', accent: '#dc2626' }),
      ], { columns: 'repeat(4, minmax(0, 1fr))', accent: '#6b7280' }),
      renderExactSectionGrid('Inline states and compact preview', [
        renderExactShellCard('Inline states', renderExactBulletList([
          'All set! You’re good to go.',
          'Choose one or more options to continue.',
          'Some options are selected.',
          'This option is temporarily unavailable.',
          'Focused item for keyboard users.',
        ], { accent: '#166534' }), { accent: '#6b7280', minHeight: '100%' }),
        renderExactSpecimen(primary, { title: 'Compact preview', minHeight: '10rem', accent: '#166534' }),
        renderExactShellCard('Accessibility', renderExactBulletList([
          'Fully keyboard accessible.',
          'Screen reader friendly.',
          'High contrast ready.',
          'Large touch targets.',
        ], { accent: '#166534' }), { accent: '#6b7280', minHeight: '100%' }),
      ], { columns: '1.4fr 0.8fr 0.8fr', accent: '#6b7280' }),
    ],
  });
}

function createExactBatchOneFormMockConceptPlayground(entry, mockDesign, baseExamples, sharedReferences = []) {
  switch (entry.tag) {
    case 'eon-autocomplete':
      return createExactAutocompleteMockConceptPlayground(entry, mockDesign, baseExamples, sharedReferences);
    case 'eon-calendar':
      return createExactCalendarMockConceptPlayground(entry, mockDesign, baseExamples);
    case 'eon-checkbox':
      return createExactCheckboxMockConceptPlayground(entry, mockDesign, baseExamples);
    default:
      return null;
  }
}

function createDefaultMockConceptPlayground(entry, mockDesign, baseExample, referenceExamples, sharedReferences = []) {
  const directionItems = trimItems(
    (mockDesign?.sections?.uniqueDesignDirection || []).filter(
      (item) => !item.toLowerCase().startsWith('concept title:')
    ),
    3
  );
  const featureItems = trimItems(mockDesign?.sections?.fullFeatureStack, 4);
  const stateItems = trimItems(mockDesign?.sections?.stateModel, 4);
  const contractItems = trimItems(mockDesign?.sections?.templateFirstContract, 3);
  const implementationCode = baseExample?.code?.trim() || `<${entry.tag}></${entry.tag}>`;
  const galleryExamples = ensureExampleSlots(referenceExamples.length ? referenceExamples : [{ title: 'Live sample', code: implementationCode }], 3);
  const sharedLabels = trimItems(sharedReferences.map((item) => `${humanizeName(item.theme || 'default')} reference: ${item.label}`), 2);

  return `
    <section style="display:grid;gap:1rem;padding:1rem;border-radius:1.5rem;background:linear-gradient(135deg, rgba(255,255,255,0.97), rgba(246,249,255,0.95));border:1px solid rgba(120,94,62,0.14);box-shadow:0 28px 60px rgba(148,163,184,0.14);">
      <div style="display:grid;grid-template-columns:minmax(14rem, 0.8fr) minmax(0, 1.2fr);gap:1rem;align-items:start;">
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.86);border:1px solid rgba(148,163,184,0.14);">
          <div style="display:grid;gap:0.45rem">
            <span style="font-size:0.74rem;letter-spacing:0.14em;text-transform:uppercase;color:#1d4ed8;font-weight:700;">EonUI ${escapeHtml(humanizeName(entry.category))}</span>
            <strong style="font-size:1.2rem;line-height:1.25;color:#0f172a">${escapeHtml(entry.displayName)}</strong>
            <p style="margin:0;color:#5f5347;line-height:1.65">${escapeHtml(directionItems[0] || entry.description)}</p>
          </div>
          ${renderBoardSidebarSection('Focus', featureItems)}
          ${renderBoardSidebarSection('States', stateItems)}
          ${sharedLabels.length ? renderBoardSidebarSection('Shared pack', sharedLabels) : ''}
        </aside>
        <div style="display:grid;gap:1rem;">
          <div style="display:grid;gap:0.85rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.16);">
            <div style="display:flex;justify-content:space-between;gap:0.75rem;align-items:flex-start;flex-wrap:wrap;">
              <div style="display:grid;gap:0.35rem">
                <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Mock concept board</span>
                <strong style="font-size:1.05rem;line-height:1.35;color:#111827">${escapeHtml(mockDesign?.conceptTitle || `${entry.displayName} concept`)}</strong>
              </div>
              ${renderBoardTag(humanizeName(entry.category))}
            </div>
            <p style="margin:0;color:#5f5347;line-height:1.65">${escapeHtml(directionItems[1] || 'This board now uses live component examples laid out to follow the original mock composition more closely.')}</p>
            <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.85rem;">
              ${galleryExamples.map((example, index) => renderBoardSpecimen(example, { title: example.title, minHeight: index === 0 ? '11rem' : '8rem' })).join('')}
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.85rem;">
            ${createMockInsightPanel('Contract focus', contractItems)}
            ${createMockInsightPanel('Variant bias', trimItems(mockDesign?.sections?.variantSystem, 4))}
          </div>
        </div>
      </div>
    </section>
  `;
}

function createActionMockConceptPlayground(entry, mockDesign, baseExample, referenceExamples, sharedReferences = []) {
  const directionItems = trimItems(
    (mockDesign?.sections?.uniqueDesignDirection || []).filter(
      (item) => !item.toLowerCase().startsWith('concept title:')
    ),
    3
  );
  const featureItems = trimItems(mockDesign?.sections?.fullFeatureStack, 5);
  const stateItems = trimItems(entry.spec?.states || mockDesign?.sections?.stateModel, 7);
  const variantItems = trimItems(entry.spec?.variants || mockDesign?.sections?.variantSystem, 5);
  const contractItems = trimItems(mockDesign?.sections?.templateFirstContract, 5);
  const usageItems = trimItems(entry.accessibility || entry.compositionRules, 3);
  const heroExamples = ensureExampleSlots(referenceExamples.length ? referenceExamples : [baseExample], 3);
  const contentExamples = ensureExampleSlots(referenceExamples.length ? referenceExamples : [baseExample], 5);
  const sharedLabels = trimItems(sharedReferences.map((item) => `${humanizeName(item.theme || 'default')} reference: ${item.label}`), 2);

  return `
    <section style="display:grid;gap:1rem;padding:1rem;border-radius:1.55rem;background:linear-gradient(135deg, rgba(255,255,255,0.98), rgba(246,250,255,0.96));border:1px solid rgba(120,94,62,0.14);box-shadow:0 24px 60px rgba(148,163,184,0.12);">
      <div style="display:grid;grid-template-columns:14rem minmax(0, 1fr);gap:1rem;">
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.3rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
          <div style="display:grid;gap:0.4rem">
            <span style="font-size:0.76rem;letter-spacing:0.14em;text-transform:uppercase;color:#1d4ed8;font-weight:700;">EonUI</span>
            <strong style="font-size:1.12rem;line-height:1.3;color:#111827">${escapeHtml(entry.displayName)}</strong>
            <p style="margin:0;color:#5f5347;line-height:1.65">${escapeHtml(directionItems[0] || entry.description)}</p>
          </div>
          ${renderBoardSidebarSection('Overview', featureItems)}
          ${renderBoardSidebarSection('Theme', sharedLabels.length ? sharedLabels : ['Light reference board', 'Dark reference board'])}
          ${renderBoardSidebarSection('Size', trimItems(entry.spec?.sizes, 3))}
        </aside>
        <div style="display:grid;gap:1rem;">
          <div style="display:grid;grid-template-columns:minmax(16rem, 0.8fr) minmax(0, 1.6fr) minmax(14rem, 0.7fr);gap:1rem;align-items:start;">
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.88);border:1px solid rgba(148,163,184,0.14);min-height:14rem;">
              <div style="display:grid;gap:0.35rem">
                <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">${escapeHtml(humanizeName(entry.displayName))} anatomy</span>
                <strong style="font-size:1.12rem;line-height:1.35;color:#111827">${escapeHtml(mockDesign?.conceptTitle || `${entry.displayName} concept board`)}</strong>
              </div>
              <p style="margin:0;color:#5f5347;line-height:1.7">${escapeHtml(directionItems[1] || 'The action board is now organized like the mock: a left intro, a dominant specimen zone, and supporting system notes.')}</p>
              <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
                ${variantItems.map((item, index) => renderBoardTag(item, index === 0 ? {} : { background: 'rgba(241,245,249,0.9)', color: '#475569' })).join('')}
              </div>
            </article>
            <article style="display:grid;gap:0.85rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.92);border:1px solid rgba(148,163,184,0.16);">
              <div style="display:grid;grid-template-columns:1fr 0.75fr;gap:0.85rem;align-items:start;">
                ${renderBoardSpecimen(heroExamples[0], { title: 'Primary specimen', minHeight: '10rem' })}
                ${renderBoardSpecimen(heroExamples[1], { title: 'Alternate state', minHeight: '10rem' })}
              </div>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                ${stateItems.map((item, index) => renderBoardTag(item, index < 2 ? {} : { background: 'rgba(239,246,255,0.88)', color: '#2563eb' })).join('')}
              </div>
            </article>
            <article style="display:grid;gap:0.7rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.88);border:1px solid rgba(148,163,184,0.14);min-height:14rem;">
              <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Slot system</span>
              <div style="display:grid;gap:0.55rem;color:#5f5347;line-height:1.55;">
                ${contractItems.map((item) => `<div>${escapeHtml(item)}</div>`).join('')}
              </div>
            </article>
          </div>
          <article style="display:grid;gap:0.85rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.92);border:1px solid rgba(148,163,184,0.16);">
            <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">States</span>
            <div style="display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));gap:0.75rem;">
              ${ensureExampleSlots(contentExamples, 4).map((example, index) => renderBoardSpecimen(example, { title: stateItems[index] || example.title, minHeight: '6.5rem' })).join('')}
            </div>
          </article>
          <div style="display:grid;grid-template-columns:repeat(3, minmax(0, 1fr));gap:1rem;">
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
              <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Content patterns</span>
              <div style="display:grid;gap:0.75rem;">
                ${ensureExampleSlots(contentExamples, 3).map((example) => renderBoardSpecimen(example, { title: example.title, minHeight: '5.75rem' })).join('')}
              </div>
            </article>
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
              <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Size & density</span>
              <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
                ${(entry.spec?.sizes || ['sm', 'md', 'lg']).map((item, index) => renderBoardTag(humanizeName(item), index === 1 ? {} : { background: 'rgba(241,245,249,0.9)', color: '#475569' })).join('')}
              </div>
              <div style="display:grid;gap:0.75rem;">
                ${ensureExampleSlots([heroExamples[0], heroExamples[2] || heroExamples[0]], 2).map((example) => renderBoardSpecimen(example, { title: example.title, minHeight: '6rem' })).join('')}
              </div>
            </article>
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
              <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Usage notes</span>
              <ul style="margin:0;padding-left:1rem;color:#5f5347;line-height:1.7;">
                ${renderMockList(usageItems.length ? usageItems : featureItems)}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  `;
}

function createFormMockConceptPlayground(entry, mockDesign, baseExample, referenceExamples, sharedReferences = []) {
  const directionItems = trimItems(
    (mockDesign?.sections?.uniqueDesignDirection || []).filter(
      (item) => !item.toLowerCase().startsWith('concept title:')
    ),
    4
  );
  const featureItems = trimItems(mockDesign?.sections?.fullFeatureStack, 6);
  const stateItems = trimItems(entry.spec?.states || mockDesign?.sections?.stateModel, 6);
  const variantItems = trimItems(entry.spec?.variants || mockDesign?.sections?.variantSystem, 4);
  const contractItems = trimItems(mockDesign?.sections?.templateFirstContract, 4);
  const examples = ensureExampleSlots(referenceExamples.length ? referenceExamples : [baseExample], 6);
  const sharedLabels = trimItems(sharedReferences.map((item) => `${humanizeName(item.theme || 'default')}: ${item.label}`), 2);

  return `
    <section style="display:grid;gap:1rem;padding:1rem;border-radius:1.55rem;background:linear-gradient(135deg, rgba(255,255,255,0.98), rgba(246,250,255,0.96));border:1px solid rgba(120,94,62,0.14);box-shadow:0 24px 60px rgba(148,163,184,0.12);">
      <div style="display:grid;grid-template-columns:minmax(15rem, 0.7fr) minmax(0, 1.6fr) minmax(16rem, 0.9fr);gap:1rem;align-items:start;">
        <aside style="display:grid;gap:1rem;padding:1rem;border-radius:1.3rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
          <div style="display:grid;gap:0.45rem">
            <span style="font-size:0.76rem;letter-spacing:0.14em;text-transform:uppercase;color:#1d4ed8;font-weight:700;">EonUI ${escapeHtml(humanizeName(entry.category))}</span>
            <strong style="font-size:1.7rem;line-height:1;color:#111827;font-family:Georgia, 'Times New Roman', serif;">eon-${escapeHtml(entry.name)}</strong>
            <p style="margin:0;color:#5f5347;line-height:1.65">${escapeHtml(directionItems[0] || entry.description)}</p>
          </div>
          ${renderBoardSidebarSection('Capabilities', featureItems)}
          ${renderBoardSidebarSection('Variants', variantItems)}
          ${sharedLabels.length ? renderBoardSidebarSection('Workspace pack', sharedLabels) : ''}
        </aside>
        <div style="display:grid;gap:1rem;">
          <article style="display:grid;gap:0.85rem;padding:1rem;border-radius:1.35rem;background:rgba(255,255,255,0.92);border:1px solid rgba(148,163,184,0.16);">
            <div style="display:flex;justify-content:space-between;gap:0.75rem;align-items:flex-start;flex-wrap:wrap;">
              <div style="display:grid;gap:0.35rem">
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                  ${renderBoardTag('Primary')}
                  ${renderBoardTag('Default focused', { background: 'rgba(241,245,249,0.92)', color: '#475569' })}
                </div>
                <strong style="font-size:1.05rem;line-height:1.35;color:#111827">${escapeHtml(mockDesign?.conceptTitle || `${entry.displayName} concept board`)}</strong>
              </div>
            </div>
            ${renderBoardSpecimen(examples[0], { title: 'Main field specimen', minHeight: '12rem' })}
            <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.85rem;">
              ${renderBoardSpecimen(examples[1], { title: examples[1].title, minHeight: '8rem' })}
              ${renderBoardSpecimen(examples[2], { title: examples[2].title, minHeight: '8rem' })}
            </div>
          </article>
          <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:1rem;">
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
              <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Sizes</span>
              ${renderBoardSpecimen(examples[3], { title: 'Compact / dense flow', minHeight: '6rem' })}
              ${renderBoardSpecimen(examples[4], { title: 'Spacious / contextual flow', minHeight: '6rem' })}
            </article>
            <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
              <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">Contract focus</span>
              <ul style="margin:0;padding-left:1rem;color:#5f5347;line-height:1.7;">
                ${renderMockList(contractItems)}
              </ul>
            </article>
          </div>
        </div>
        <div style="display:grid;gap:1rem;">
          <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
            <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">States</span>
            <div style="display:grid;gap:0.75rem;">
              ${ensureExampleSlots(examples, 4).map((example, index) => renderBoardSpecimen(example, { title: stateItems[index] || example.title, minHeight: '6rem' })).join('')}
            </div>
          </article>
          <article style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.25rem;background:rgba(255,255,255,0.9);border:1px solid rgba(148,163,184,0.14);">
            <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:#7c6d5f;font-weight:700;">At a glance</span>
            <p style="margin:0;color:#5f5347;line-height:1.7">${escapeHtml(directionItems[1] || 'The form board now groups state, sizing, and contextual examples in the same composition as the mock direction.')}</p>
            <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
              ${stateItems.map((item, index) => renderBoardTag(item, index < 2 ? {} : { background: 'rgba(241,245,249,0.9)', color: '#475569' })).join('')}
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
}

function createSharedFormWorkspacePlayground(entry, baseExample, sharedReferences = []) {
  const sharedLabels = trimItems(sharedReferences.map((item) => `${humanizeName(item.theme || 'default')}: ${item.label}`), 2);
  const implementationCode = baseExample?.code?.trim() || `<${entry.tag}></${entry.tag}>`;

  return `
    <section style="display:grid;gap:1rem">
      <div style="display:grid;gap:0.8rem;padding:1rem 1.05rem;border-radius:1.25rem;border:1px solid rgba(120,94,62,0.14);background:linear-gradient(135deg, rgba(255,255,255,0.94), rgba(244,249,255,0.92));">
        <span style="font-size:0.76rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--eon-semantic-text-secondary, #475569);font-weight:700;">
          Shared form workspace
        </span>
        <strong style="font-size:1.08rem;line-height:1.35">${escapeHtml(entry.displayName)} inside the feature-form board</strong>
        <p style="margin:0;color:var(--eon-semantic-text-secondary, #475569);line-height:1.65;">
          This live sample keeps the component inside the denser form-workspace direction from the shared mock pack, so validation, helper text, and supporting actions read in context.
        </p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(19rem, 1fr));gap:1rem;align-items:start;">
        <div style="display:grid;gap:0.75rem;padding:1rem;border-radius:1.15rem;border:1px solid rgba(120,94,62,0.12);background:rgba(255,255,255,0.72);">
          <strong style="font-size:0.96rem">Workspace notes</strong>
          <ul style="margin:0;padding-left:1rem;color:var(--eon-semantic-text-secondary, #475569);line-height:1.6;">
            ${renderMockList(sharedLabels)}
          </ul>
        </div>
        <div style="display:grid;gap:0.85rem;padding:1rem;border-radius:1.15rem;border:1px solid rgba(120,94,62,0.12);background:rgba(255,255,255,0.72);">
          <strong style="font-size:0.96rem">Live field sample</strong>
          ${implementationCode}
        </div>
      </div>
    </section>
  `;
}

function buildMockExamples(entry, baseExamples) {
  if (entry.kind === 'chart-spec' || !entry.mockDesign) {
    return [];
  }

  const baseExample = pickMockBaseExample(baseExamples);
  const referenceExamples = getMockReferenceExamples(baseExamples, entry.category === 'forms' ? 6 : 5);
  const sharedReferences = mockSharedDesignsByCategory.get(entry.category) || [];
  const exactBatchOneCode = entry.category === 'actions'
    ? createExactBatchOneActionMockConceptPlayground(entry, entry.mockDesign, baseExamples)
    : entry.category === 'forms'
      ? createExactBatchOneFormMockConceptPlayground(entry, entry.mockDesign, baseExamples, sharedReferences)
      : null;
  const mockCode = exactBatchOneCode || (
    entry.category === 'actions'
      ? createActionMockConceptPlayground(entry, entry.mockDesign, baseExample, referenceExamples, sharedReferences)
      : entry.category === 'forms'
        ? createFormMockConceptPlayground(entry, entry.mockDesign, baseExample, referenceExamples, sharedReferences)
        : createDefaultMockConceptPlayground(entry, entry.mockDesign, baseExample, referenceExamples, sharedReferences)
  );
  const examples = [
    {
      key: `${sanitizeExampleKey(entry.tag)}-mock-concept`,
      source: 'mock',
      title: 'Mock concept board',
      code: mockCode,
    },
  ];

  if (entry.category === 'forms' && sharedReferences.length) {
    examples.push({
      key: `${sanitizeExampleKey(entry.tag)}-mock-workspace`,
      source: 'mock-shared',
      title: 'Shared form workspace',
      code: createSharedFormWorkspacePlayground(entry, baseExample, sharedReferences),
    });
  }

  return examples;
}

function buildEntryExampleOptions(entry) {
  const baseExamples = getExampleOptions(entry);
  const mockExamples = buildMockExamples(entry, baseExamples);

  if (!mockExamples.length) {
    return baseExamples;
  }

  const manifestExamples = baseExamples.filter((example) => example.source === 'manifest');
  const remainingExamples = baseExamples.filter((example) => example.source !== 'manifest');

  return dedupeExampleOptions([
    ...manifestExamples,
    ...mockExamples,
    ...remainingExamples,
  ]);
}

function getSelectedEntry() {
  return entriesByTag.get(state.component) || entries[0];
}

function getSelectedExample(entry) {
  const selected = entry.exampleOptions.find((example) => example.key === state.example);
  return selected || entry.exampleOptions[0];
}

function getExampleByKey(entry, exampleKey) {
  return entry.exampleOptions.find((example) => example.key === exampleKey) || entry.exampleOptions[0];
}

function getExampleOverrideKey(entry, exampleKey) {
  return `${entry.tag}::${exampleKey}`;
}

function hasExampleOverride(entry, exampleKey) {
  return Object.prototype.hasOwnProperty.call(state.exampleCodeOverrides, getExampleOverrideKey(entry, exampleKey));
}

function getExampleMarkup(entry, example) {
  const overrideKey = getExampleOverrideKey(entry, example.key);
  return state.exampleCodeOverrides[overrideKey] ?? example.code;
}

function isPlainGeneratedExample(entry) {
  const generated = entry.exampleOptions.find((example) => example.key === 'generated');
  return Boolean(generated && generated.code.trim() === `<${entry.tag}></${entry.tag}>`);
}

function getPreferredExampleKey(entry) {
  if (!entry?.exampleOptions?.length) {
    return 'generated';
  }

  const mockExample = entry.exampleOptions.find((example) => example.source === 'mock');
  if (mockExample) {
    return mockExample.key;
  }

  const sharedMockExample = entry.exampleOptions.find((example) => example.source === 'mock-shared');
  if (sharedMockExample) {
    return sharedMockExample.key;
  }

  const modernizedExample = entry.exampleOptions.find((example) => example.source === 'modernized');
  if (modernizedExample) {
    return modernizedExample.key;
  }

  const firstManifestExample = entry.exampleOptions.find((example) => example.source === 'manifest');
  if (firstManifestExample && isPlainGeneratedExample(entry)) {
    return firstManifestExample.key;
  }

  return entry.exampleOptions.find((example) => example.key === 'generated')?.key || entry.exampleOptions[0].key;
}

function formatExampleSource(example) {
  if (example.source === 'mock') {
    return 'Mock concept live board';
  }

  if (example.source === 'mock-shared') {
    return 'Shared mock workspace';
  }

  if (example.source === 'manifest') {
    return 'Authored example';
  }

  if (example.source === 'modernized') {
    return 'Modernized blueprint';
  }

  return 'Generated playground';
}

function getExampleOrder(entry, example) {
  const index = entry.exampleOptions.findIndex((candidate) => candidate.key === example.key);
  return index >= 0 ? `${index + 1} of ${entry.exampleOptions.length}` : `1 of ${entry.exampleOptions.length}`;
}

function getHeroMetrics(entry) {
  if (entry.kind === 'chart-spec') {
    return [
      { label: 'Family', value: humanizeName(entry.family || 'catalog') },
      { label: 'Series', value: entry.series?.length || 0 },
      { label: 'Examples', value: entry.examples?.length || 0 },
    ];
  }

  return [
    { label: 'Props', value: entry.props.length },
    { label: 'Events', value: entry.events.length },
    { label: 'Examples', value: entry.exampleOptions.length },
  ];
}

function summarizeMarkup(code) {
  const normalized = code.trim();
  const lines = normalized ? normalized.split('\n').length : 0;
  return {
    characters: normalized.length,
    lines,
  };
}

const VOID_HTML_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function formatMarkup(code) {
  const normalized = code.replaceAll('\r\n', '\n').trim();

  if (!normalized || !normalized.includes('<') || !normalized.includes('>')) {
    return normalized;
  }

  const tokens = normalized
    .replace(/>\s*</g, '>\n<')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const lines = [];
  let depth = 0;

  for (const token of tokens) {
    if (/^<\//.test(token)) {
      depth = Math.max(depth - 1, 0);
    }

    lines.push(`${'  '.repeat(depth)}${token}`);

    const tagMatch = token.match(/^<([a-zA-Z][\w:-]*)\b/);
    const tagName = tagMatch?.[1]?.toLowerCase();
    const isDeclaration = /^<!|^<\?/.test(token);
    const isInlineClosed = tagMatch && token.includes(`</${tagMatch[1]}`);
    const isSelfClosing = /\/>$/.test(token);

    if (tagName && !isDeclaration && !isInlineClosed && !isSelfClosing && !VOID_HTML_TAGS.has(tagName)) {
      depth += 1;
    }
  }

  return lines.join('\n');
}

function highlightTagMarkup(tag) {
  if (/^<!--[\s\S]*-->$/.test(tag)) {
    return `<span class="code-token code-token-comment">${escapeHtml(tag)}</span>`;
  }

  const closing = tag.startsWith('</');
  const selfClosing = tag.endsWith('/>');
  const openPunctuation = closing ? '</' : '<';
  const closePunctuation = selfClosing ? '/>' : '>';
  const inner = tag.slice(openPunctuation.length, tag.length - closePunctuation.length).trim();

  if (!inner) {
    return escapeHtml(tag);
  }

  const whitespaceIndex = inner.search(/\s/);
  const tagName = whitespaceIndex === -1 ? inner : inner.slice(0, whitespaceIndex);
  const attrSource = whitespaceIndex === -1 ? '' : inner.slice(whitespaceIndex).trim();
  const attrs = [];
  const attrPattern = /([^\s=]+)(?:\s*=\s*(".*?"|'.*?'|[^\s"'=<>`]+))?/g;
  let match;

  while ((match = attrPattern.exec(attrSource))) {
    const [, name, rawValue] = match;
    const renderedValue = rawValue
      ? `=<span class="code-token code-token-string">${escapeHtml(rawValue)}</span>`
      : '';

    attrs.push(` <span class="code-token code-token-attr">${escapeHtml(name)}</span>${renderedValue}`);
  }

  return [
    `<span class="code-token code-token-punctuation">${escapeHtml(openPunctuation)}</span>`,
    `<span class="code-token code-token-tag">${escapeHtml(tagName)}</span>`,
    attrs.join(''),
    `<span class="code-token code-token-punctuation">${escapeHtml(closePunctuation)}</span>`,
  ].join('');
}

function highlightMarkup(code) {
  const normalized = code.replaceAll('\r\n', '\n').trim();

  if (!normalized) {
    return '';
  }

  return normalized
    .split(/(<[^>]+>)/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('<') && part.endsWith('>')) {
        return highlightTagMarkup(part);
      }

      return escapeHtml(part);
    })
    .join('');
}

function getExampleNotes(entry, example) {
  const notes = [];
  const feedback = getModernizerFeedback(entry);

  if (entry.kind === 'chart-spec') {
    notes.push('This is a chart catalog entry sourced from the workspace manifest, not a live custom element in the active core package.');
    notes.push(`The active explorer now groups these specs by chart family so the wider catalog is searchable beyond the 3 live chart components.`);

    if (entry.examples?.length) {
      notes.push(`This chart spec carries ${entry.examples.length} story examples and ${entry.series?.length || 0} renderer series hints for implementation planning.`);
    }

    return notes.slice(0, 3);
  }

  if (example.source === 'mock') {
    notes.push('This example is derived from the component mock concept title and its design-doc sections, so staging can review the same direction as the original mock pack.');
  } else if (example.source === 'mock-shared') {
    notes.push('This example places the component inside the shared feature-form workspace direction from the mock pack so denser form workflows can be reviewed live.');
  } else if (example.source === 'modernized') {
    notes.push('This example was synthesized from the modernization blueprint so every component gets a richer staging direction, even before every core API lands.');
  } else if (example.source === 'generated') {
    notes.push('Generated examples are best for baseline rendering, spacing, and state checks before richer authored cases are added.');
  } else {
    notes.push('This example was authored in the manifest, so it is a better reference for intended composition and behavior.');
  }

  if (entry.exampleOptions.length > 1) {
    notes.push(`This component has ${entry.exampleOptions.length} example variants. Switch between them to compare states, density, and interaction patterns.`);
  }

  if (state.themeFamily !== 'generic') {
    notes.push(`You are viewing the ${humanizeName(state.themeFamily)} theme family, which is useful for checking family-specific styling drift.`);
  } else {
    notes.push('The generic theme is the clean baseline for checking structure, content hierarchy, and shared visual rhythm.');
  }

  if (feedback?.focus) {
    notes.push(feedback.focus);
  }

  return notes.slice(0, 3);
}

function renderModernizerInsights(entry) {
  const feedback = getModernizerFeedback(entry);

  if (!feedback) {
    return '';
  }

  return `
    <div class="modernizer-grid">
      <article class="modernizer-card modernizer-card-focus">
        <span class="modernizer-label">Focus</span>
        <p>${escapeHtml(feedback.focus)}</p>
      </article>
      <article class="modernizer-card">
        <span class="modernizer-label">Feature depth</span>
        <ul class="modernizer-list">
          ${feedback.featureIdeas.slice(0, 2).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </article>
      <article class="modernizer-card">
        <span class="modernizer-label">Visual variants</span>
        <ul class="modernizer-list">
          ${feedback.variantIdeas.slice(0, 2).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </article>
      <article class="modernizer-card">
        <span class="modernizer-label">Template-first</span>
        <ul class="modernizer-list">
          ${feedback.templateIdeas.slice(0, 2).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </article>
    </div>
  `;
}

function renderFrameTopbar() {
  return `
    <section class="frame-topbar panel">
      <div class="frame-brand">
        <p class="eyebrow">Mock Guided Staging</p>
        <h2>EonUI Component Review Shell</h2>
        <p class="muted">Left rail, top bar, and footer stay fixed while the middle surface renders editable runtime examples instead of static screenshot boards.</p>
      </div>
      <div class="frame-topbar-metrics">
        <article>
          <span>Live components</span>
          <strong>${componentEntries.length}</strong>
        </article>
        <article>
          <span>Reference folders</span>
          <strong>${mockFolderCount}</strong>
        </article>
        <article>
          <span>Reference screens</span>
          <strong>${mockImageCount}</strong>
        </article>
      </div>
    </section>
  `;
}

function renderFrameFooter() {
  return `
    <footer class="frame-footer panel">
      <div>
        <p class="eyebrow">Sources</p>
        <strong>Shared shell, mock-derived implementation targets, and live editable runtime examples stay aligned here.</strong>
      </div>
      <p class="muted">Optional mock references load from <code>docs/mock-screens</code>, or from the folder set with <code>EONUI_MOCK_SCREENS_ROOT</code>.</p>
    </footer>
  `;
}

function isMockExample(example) {
  return example?.source === 'mock' || example?.source === 'mock-shared';
}

function renderCodePanel(entry, candidate, formattedMarkup, metrics, isEdited, options = {}) {
  const { featured = false } = options;
  const panelMode = isEdited ? 'edit' : 'preview';

  return `
    <details class="example-code-panel${featured ? ' is-featured' : ''}" data-code-panel data-example-key="${escapeHtml(
      candidate.key
    )}" data-code-mode="${panelMode}"${isEdited ? ' open' : ''}>
      <summary class="example-code-summary">
        <div>
          <span class="gallery-kicker">Code</span>
          <strong>${featured ? 'Toggle live code panel' : 'Code and editing'}</strong>
        </div>
        <span class="token token-muted">${metrics.lines} lines</span>
      </summary>
      <div class="example-code-panel-body">
        <div class="example-code-panel-header">
          <div class="example-code-mode-toggle" role="tablist" aria-label="${escapeHtml(`${entry.displayName} code mode`)}">
            <button class="code-mode-button${panelMode === 'preview' ? ' is-active' : ''}" type="button" data-code-mode-button data-example-key="${escapeHtml(
              candidate.key
            )}" data-code-mode="preview">
              Preview
            </button>
            <button class="code-mode-button${panelMode === 'edit' ? ' is-active' : ''}" type="button" data-code-mode-button data-example-key="${escapeHtml(
              candidate.key
            )}" data-code-mode="edit">
              Edit
            </button>
          </div>
          <div class="code-toolbar-actions example-card-actions">
            <span class="code-metric" data-example-lines data-example-key="${escapeHtml(candidate.key)}">${metrics.lines} lines</span>
            <span class="code-metric" data-example-characters data-example-key="${escapeHtml(candidate.key)}">${metrics.characters} chars</span>
            <button class="stage-button stage-button-secondary" type="button" data-format-card-code data-example-key="${escapeHtml(
              candidate.key
            )}">
              Format
            </button>
            <button class="stage-button stage-button-secondary" type="button" data-copy-card-code data-example-key="${escapeHtml(
              candidate.key
            )}">
              Copy
            </button>
            <button class="stage-button stage-button-secondary" type="button" data-reset-card-code data-example-key="${escapeHtml(
              candidate.key
            )}">
              Reset
            </button>
            <button class="stage-button" type="button" data-apply-card-code data-example-key="${escapeHtml(candidate.key)}">
              Apply
            </button>
          </div>
        </div>
        <div class="example-code-surface">
          <pre class="example-code-highlight" data-example-highlight data-example-key="${escapeHtml(
            candidate.key
          )}"><code data-example-highlight-body data-example-key="${escapeHtml(candidate.key)}">${highlightMarkup(formattedMarkup)}</code></pre>
          <textarea
            class="example-code-editor"
            spellcheck="false"
            data-example-editor
            data-example-key="${escapeHtml(candidate.key)}"
            aria-label="${escapeHtml(`${entry.displayName} ${candidate.title} sample code`)}"
          >${escapeHtml(formattedMarkup)}</textarea>
        </div>
        <p class="example-editor-feedback" data-card-feedback data-example-key="${escapeHtml(candidate.key)}">
          ${isEdited ? 'Using your applied edits for this example.' : 'Using the current base sample for this example.'}
        </p>
      </div>
    </details>
  `;
}

function renderExampleGalleryCard(entry, candidate, selectedExample, options = {}) {
  const { featured = false, compact = false } = options;
  const currentMarkup = getExampleMarkup(entry, candidate);
  const formattedMarkup = formatMarkup(currentMarkup);
  const metrics = summarizeMarkup(formattedMarkup);
  const isEdited = hasExampleOverride(entry, candidate.key);
  const isFocused = candidate.key === selectedExample.key;
  const isMockSurface = isMockExample(candidate);
  const cardClasses = [
    'example-gallery-card',
    isFocused ? 'is-active' : '',
    featured ? 'is-featured' : '',
    compact ? 'is-compact' : '',
    isMockSurface ? 'is-mock-surface' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <article class="${cardClasses}">
      <div class="example-gallery-header">
        <div>
          <span class="gallery-kicker">${escapeHtml(formatExampleSource(candidate))}</span>
          <h5>${escapeHtml(candidate.title)}</h5>
        </div>
        <button class="stage-button stage-button-secondary" type="button" data-example-card-button data-example-key="${escapeHtml(
          candidate.key
        )}">
          ${isFocused ? 'Focused' : 'Focus'}
        </button>
      </div>
      <div class="example-gallery-meta">
        <span class="token token-muted">${escapeHtml(getExampleOrder(entry, candidate))}</span>
        <span class="token${isEdited ? '' : ' token-muted'}" data-example-status data-example-key="${escapeHtml(candidate.key)}">
          ${isEdited ? 'Edited sample' : 'Base sample'}
        </span>
      </div>
      <div class="example-gallery-body${featured ? ' is-featured-layout' : ''}">
        <div class="preview-stage preview-stage-card${isMockSurface ? ' is-mock-surface' : ''}" data-preview-stage data-example-key="${escapeHtml(
          candidate.key
        )}"></div>
        ${renderCodePanel(entry, candidate, formattedMarkup, metrics, isEdited, { featured })}
      </div>
    </article>
  `;
}

function renderLiveExampleGallery(entry, selectedExample) {
  const orderedExamples = [
    ...entry.exampleOptions.filter((candidate) => candidate.key === selectedExample.key),
    ...entry.exampleOptions.filter((candidate) => candidate.key !== selectedExample.key),
  ];
  const focusedExample = orderedExamples[0];
  const supportingExamples = orderedExamples.slice(1);
  const mockFocused = isMockExample(selectedExample);

  return `
    <section class="studio-block${mockFocused ? ' is-mock-focused' : ''}">
      <div class="panel-toolbar">
        <div>
          <p class="eyebrow">${mockFocused ? 'Focused Runtime Board' : 'Live Examples'}</p>
          <h4>${mockFocused ? 'Mock-aligned board with editable live code' : 'All runtime examples in one component page'}</h4>
        </div>
        <span class="detail-disclosure-note">${entry.exampleOptions.length} examples</span>
      </div>
      <div class="example-primary-stage">
        ${renderExampleGalleryCard(entry, focusedExample, selectedExample, { featured: true })}
      </div>
      ${
        supportingExamples.length
          ? `
            <details class="supporting-examples-block"${mockFocused ? '' : ' open'}>
              <summary class="supporting-examples-header">
                <div>
                  <p class="eyebrow">Supporting Examples</p>
                  <h5>Alternate states and companion samples</h5>
                </div>
                <span class="detail-disclosure-note">${supportingExamples.length} more</span>
              </summary>
              <div class="example-gallery example-gallery-secondary">
                ${supportingExamples
                  .map((candidate) =>
                    renderExampleGalleryCard(entry, candidate, selectedExample, {
                      compact: true,
                    })
                  )
                  .join('')}
              </div>
            </details>
          `
          : ''
      }
    </section>
  `;
}

function renderAuditDisclosure(entry, notes) {
  const insights = renderModernizerInsights(entry);

  if (!notes.length && !insights) {
    return '';
  }

  return `
    <details class="insight-disclosure">
      <summary>
        <div>
          <p class="eyebrow">Audit Notes</p>
          <h4>What to review before shipping</h4>
        </div>
        <span class="insight-count">${notes.length} notes</span>
      </summary>
      <div class="insight-disclosure-body">
        <div class="example-note-block">
          <ul class="example-note-list">
            ${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}
          </ul>
        </div>
        ${insights}
      </div>
    </details>
  `;
}

function renderExampleStudio(entry, example, options = {}) {
  const { showControls = true, linkHref = '', linkLabel = 'Open standalone' } = options;
  const notes = getExampleNotes(entry, example);
  const mockFocused = isMockExample(example);

  return `
    <div class="example-studio${mockFocused ? ' is-mock-focused' : ''}">
      <div class="panel-toolbar">
        <div>
          <p class="eyebrow">${mockFocused ? 'Mock Guided Stage' : 'Example Studio'}</p>
          <h3>${escapeHtml(example.title)}</h3>
        </div>
        ${
          showControls
            ? `
              <div class="toolbar-actions">
                <label>
                  <span>Theme</span>
                  <select data-theme-family>
                    ${['generic', 'material', 'fluent']
                      .map(
                        (family) =>
                          `<option value="${family}"${family === state.themeFamily ? ' selected' : ''}>${escapeHtml(humanizeName(family))}</option>`
                      )
                      .join('')}
                  </select>
                </label>
                <label>
                  <span>Scheme</span>
                  <select data-theme-scheme>
                    <option value="light"${state.scheme === 'light' ? ' selected' : ''}>Light</option>
                    <option value="dark"${state.scheme === 'dark' ? ' selected' : ''}>Dark</option>
                  </select>
                </label>
                <label>
                  <span>Example</span>
                  <select data-example-select>
                    ${entry.exampleOptions
                      .map(
                        (candidate) =>
                          `<option value="${escapeHtml(candidate.key)}"${candidate.key === example.key ? ' selected' : ''}>${escapeHtml(
                            candidate.title
                          )}</option>`
                      )
                      .join('')}
                  </select>
                </label>
                ${linkHref ? `<a class="ghost-link" href="${linkHref}" target="_blank" rel="noreferrer">${escapeHtml(linkLabel)}</a>` : ''}
              </div>
            `
            : ''
        }
      </div>

      <div class="example-summary-grid${mockFocused ? ' is-mock-focused' : ''}">
        <article class="example-card">
          <span>Focused example</span>
          <strong>${escapeHtml(example.title)}</strong>
        </article>
        <article class="example-card">
          <span>Coverage</span>
          <strong>${escapeHtml(getExampleOrder(entry, example))}</strong>
        </article>
        <article class="example-card">
          <span>Editing mode</span>
          <strong>${escapeHtml(humanizeName(state.themeFamily))} / ${escapeHtml(humanizeName(state.scheme))} / Live code</strong>
        </article>
      </div>

      ${renderLiveExampleGallery(entry, example)}
      ${renderAuditDisclosure(entry, notes)}
    </div>
  `;
}

function normalizeState() {
  const availableCategories = getAvailableCategories();
  const entryPool = previewMode ? entries : getDashboardEntries();
  const fallbackPool = entryPool.length ? entryPool : previewMode ? entries : getScopeEntries();

  if (!availableCategories.includes(state.category)) {
    state.category = 'all';
  }

  if (fallbackPool.length && !fallbackPool.some((entry) => entry.tag === state.component)) {
    state.component = fallbackPool[0].tag;
    state.example = '';
  }

  const entry = getSelectedEntry();

  if (!entry) {
    return;
  }

  if (state.example === 'generated') {
    const modernizedExample = entry.exampleOptions.find((example) => example.source === 'modernized');
    if (modernizedExample) {
      state.example = modernizedExample.key;
      return;
    }
  }

  if (!state.example) {
    state.example = getPreferredExampleKey(entry);
    return;
  }

  if (!entry.exampleOptions.some((example) => example.key === state.example)) {
    state.example = getPreferredExampleKey(entry);
  }
}

function visibleEntries() {
  const query = state.search.trim().toLowerCase();
  const source = previewMode ? entries : getDashboardEntries();

  return source.filter((entry) => {
    if (!query) {
      return true;
    }

    return [
      entry.displayName,
      entry.tag,
      entry.category,
      entry.description,
      entry.family || '',
      ...(entry.series || []),
      ...(entry.capabilities || []),
      ...(entry.spec?.variants || []),
    ].some((candidate) => String(candidate).toLowerCase().includes(query));
  });
}

function renderTokenGroup(title, items) {
  if (!items?.length) {
    return '';
  }

  return `
    <section class="subpanel">
      <h3>${title}</h3>
      <div class="token-list">
        ${items.map((item) => `<span class="token">${escapeHtml(item)}</span>`).join('')}
      </div>
    </section>
  `;
}

function renderBulletGroup(title, items) {
  if (!items?.length) {
    return '';
  }

  return `
    <section class="subpanel">
      <h3>${title}</h3>
      <ul class="bullet-list">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </section>
  `;
}

function renderTable(title, rows, columnA, columnB, columnC) {
  if (!rows?.length) {
    return '';
  }

  return `
    <section class="subpanel">
      <h3>${title}</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>${columnA}</th>
              <th>${columnB}</th>
              ${columnC ? `<th>${columnC}</th>` : ''}
            </tr>
          </thead>
          <tbody>
            ${rows
              .map((row) => {
                const cells = [
                  `<td><code>${escapeHtml(row.name || row.title || '')}</code></td>`,
                  `<td>${escapeHtml(row.description || row.type || row.detail || '')}</td>`,
                ];

                if (columnC) {
                  cells.push(`<td>${escapeHtml(row.default || row.detail || '')}</td>`);
                }

                return `<tr>${cells.join('')}</tr>`;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderThemeNotes(spec) {
  if (!spec?.themeBehavior) {
    return '';
  }

  const families = [
    ['Generic', spec.themeBehavior.generic],
    ['Material', spec.themeBehavior.material],
    ['Fluent', spec.themeBehavior.fluent],
  ].filter(([, items]) => items?.length);

  if (!families.length) {
    return '';
  }

  return `
    <section class="subpanel">
      <h3>Theme Behavior</h3>
      <div class="theme-grid">
        ${families
          .map(
            ([label, items]) => `
              <article class="theme-note">
                <h4>${label}</h4>
                <ul class="bullet-list">
                  ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
                </ul>
              </article>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderDisclosurePanel(eyebrow, title, body, summaryNote = '') {
  if (!body.trim()) {
    return '';
  }

  return `
    <details class="detail-disclosure panel">
      <summary>
        <div class="detail-disclosure-head">
          <div>
            <p class="eyebrow">${escapeHtml(eyebrow)}</p>
            <h3>${escapeHtml(title)}</h3>
          </div>
          ${summaryNote ? `<span class="detail-disclosure-note">${escapeHtml(summaryNote)}</span>` : ''}
        </div>
      </summary>
      <div class="detail-disclosure-body">
        ${body}
      </div>
    </details>
  `;
}

function renderSidebar() {
  const scopeEntries = getScopeEntries();
  const availableCategories = getAvailableCategories();
  const filtered = visibleEntries();
  const grouped = new Map();
  const scopeSummary = getScopeSummary();
  const selectedEntry = getSelectedEntry();

  for (const entry of filtered) {
    const list = grouped.get(entry.category) || [];
    list.push(entry);
    grouped.set(entry.category, list);
  }

  return `
    <aside class="sidebar panel">
      <div class="sidebar-head">
        <div>
          <p class="eyebrow">Explorer</p>
          <h1>EonUI Staging</h1>
        </div>
        <p class="muted">${escapeHtml(scopeSummary.description)}</p>
      </div>

      <div class="sidebar-summary">
        <strong>${escapeHtml(scopeSummary.title)}</strong>
        <span>${escapeHtml(`${filtered.length} shown / ${scopeEntries.length} total`)}</span>
      </div>

      <label class="field">
        <span>Surface set</span>
        <select data-scope-select>
          ${scopeOptions
            .map(
              (option) =>
                `<option value="${escapeHtml(option.key)}"${option.key === state.scope ? ' selected' : ''}>${escapeHtml(option.label)}</option>`
            )
            .join('')}
        </select>
      </label>

      <label class="field">
        <span>Search</span>
        <input data-search-input type="search" placeholder="Search components, tags, variants..." value="${escapeHtml(state.search)}" />
      </label>

      <label class="field">
        <span>Category</span>
        <select data-category-select>
          ${availableCategories
            .map(
              (category) =>
                `<option value="${escapeHtml(category)}"${category === state.category ? ' selected' : ''}>${escapeHtml(
                  category === 'all' ? 'All categories' : humanizeName(category)
                )}</option>`
            )
            .join('')}
        </select>
      </label>

      <div class="component-groups">
        ${
          grouped.size
            ? [...grouped.entries()]
                .map(([category, items]) => {
                  const shouldOpen =
                    Boolean(state.search.trim()) ||
                    state.category === category ||
                    (state.category === 'all' && selectedEntry?.category === category);

                  return `
                    <details class="component-group"${shouldOpen ? ' open' : ''}>
                      <summary class="component-group-label">
                        <span>${escapeHtml(humanizeName(category))}</span>
                        <span>${items.length}</span>
                      </summary>
                      <div class="component-list">
                        ${items
                          .map(
                            (entry) => `
                              <button
                                type="button"
                                class="component-item${entry.tag === state.component ? ' is-active' : ''}"
                                data-component-button
                                data-tag="${escapeHtml(entry.tag)}"
                              >
                                <strong>${escapeHtml(entry.displayName)}</strong>
                                <span>${escapeHtml(entry.tag)}</span>
                              </button>
                            `
                          )
                          .join('')}
                      </div>
                    </details>
                  `;
                })
                .join('')
            : `
                <div class="empty-state">
                  <strong>No matching components</strong>
                  <p>Try a broader search term or switch back to a wider surface set.</p>
                </div>
              `
        }
      </div>
    </aside>
  `;
}

function renderDashboard() {
  normalizeState();
  const entry = getSelectedEntry();
  const example = getSelectedExample(entry);
  const heroMetrics = getHeroMetrics(entry);
  const featureContent = `
    ${renderTokenGroup('Variants', entry.spec?.variants)}
    ${renderTokenGroup('Sizes', entry.spec?.sizes)}
    ${renderTokenGroup('States', entry.spec?.states)}
    ${renderTokenGroup('Anatomy', entry.anatomy?.length ? entry.anatomy : entry.spec?.visualAnatomy)}
    ${renderTokenGroup('Related', entry.related)}
    ${renderBulletGroup('Interactions', entry.spec?.interactions)}
    ${renderBulletGroup('DevExpress Parity', entry.spec?.devexpressParity)}
    ${renderBulletGroup('Accessibility', entry.accessibility)}
    ${renderBulletGroup('Responsive', entry.responsive)}
    ${renderBulletGroup('Composition Rules', entry.compositionRules)}
    ${renderBulletGroup('Anti-Patterns', entry.antiPatterns)}
    ${renderThemeNotes(entry.spec)}
  `;
  const apiContent = `
    ${renderTable('Props', entry.props, 'Name', 'Description', 'Default')}
    ${renderTable('Events', entry.events, 'Name', 'Description', '')}
    ${renderTable('Methods', entry.methods, 'Name', 'Description', '')}
    ${renderTable('Slots', entry.slots, 'Name', 'Description', '')}
    ${renderTable('Parts', entry.parts, 'Name', 'Description', '')}
    ${renderTable('CSS Variables', entry.cssVariables, 'Name', 'Description', '')}
  `;
  const manifestContent = `<pre class="code-block manifest-block"><code>${escapeHtml(JSON.stringify(entry, null, 2))}</code></pre>`;

  document.title = `${entry.displayName} - EonUI Staging`;

  app.innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}

      <main class="workspace">
        ${renderFrameTopbar()}
        <section class="hero panel">
          <div class="hero-copy">
            <p class="eyebrow">${escapeHtml(humanizeName(entry.category))}</p>
            <h2>${escapeHtml(entry.displayName)}</h2>
            <p class="lead">${escapeHtml(entry.description)}</p>
          </div>

          <div class="hero-metrics">
            ${heroMetrics
              .map(
                (metric) => `
                  <article>
                    <span>${escapeHtml(String(metric.label))}</span>
                    <strong>${escapeHtml(String(metric.value))}</strong>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>

        <article class="panel preview-panel">
          ${renderExampleStudio(entry, example, { showControls: true })}
        </article>

        <section class="details-grid">
          ${renderDisclosurePanel(
            'Features',
            'Behavior and design surface',
            featureContent,
            `${entry.spec?.states?.length || 0} states`
          )}
          ${renderDisclosurePanel(
            'API',
            'Props, events, methods, and styling hooks',
            apiContent,
            `${entry.props.length} props / ${entry.events.length} events`
          )}
          ${renderDisclosurePanel('Manifest', 'Raw entry snapshot', manifestContent, 'JSON')}
        </section>
        ${renderFrameFooter()}
      </main>
    </div>
  `;

  mountPreview(entry, example);
}

function renderStandalonePreview() {
  normalizeState();
  const entry = getSelectedEntry();
  const example = getSelectedExample(entry);
  const backHref = `/?component=${encodeURIComponent(entry.tag)}&example=${encodeURIComponent(example.key)}&theme=${encodeURIComponent(
    state.themeFamily
  )}&scheme=${encodeURIComponent(state.scheme)}&scope=${encodeURIComponent(state.scope)}`;

  document.title = `${entry.displayName} Preview - EonUI Staging`;

  app.innerHTML = `
    <main class="standalone-shell">
      ${renderFrameTopbar()}
      <section class="hero panel standalone-hero">
        <div class="hero-copy">
          <p class="eyebrow">Standalone Preview</p>
          <h1>${escapeHtml(entry.displayName)}</h1>
          <p class="lead">${escapeHtml(entry.description)}</p>
        </div>
        <div class="toolbar-actions">
          <label>
            <span>Theme</span>
            <select data-theme-family>
              ${['generic', 'material', 'fluent']
                .map(
                  (family) =>
                    `<option value="${family}"${family === state.themeFamily ? ' selected' : ''}>${escapeHtml(humanizeName(family))}</option>`
                )
                .join('')}
            </select>
          </label>
          <label>
            <span>Scheme</span>
            <select data-theme-scheme>
              <option value="light"${state.scheme === 'light' ? ' selected' : ''}>Light</option>
              <option value="dark"${state.scheme === 'dark' ? ' selected' : ''}>Dark</option>
            </select>
          </label>
          <label>
            <span>Example</span>
            <select data-example-select>
              ${entry.exampleOptions
                .map(
                  (candidate) =>
                    `<option value="${escapeHtml(candidate.key)}"${candidate.key === example.key ? ' selected' : ''}>${escapeHtml(
                      candidate.title
                    )}</option>`
                )
                .join('')}
            </select>
          </label>
          <a class="ghost-link" href="${backHref}">Back to dashboard</a>
        </div>
      </section>

      <section class="panel preview-panel standalone-preview">
        ${renderExampleStudio(entry, example, { showControls: false })}
      </section>

      <section class="details-grid">
        ${renderDisclosurePanel(
          'Features',
          'Behavior and design surface',
          `
            ${renderTokenGroup('Variants', entry.spec?.variants)}
            ${renderTokenGroup('Sizes', entry.spec?.sizes)}
            ${renderTokenGroup('States', entry.spec?.states)}
            ${renderTokenGroup('Anatomy', entry.anatomy?.length ? entry.anatomy : entry.spec?.visualAnatomy)}
            ${renderTokenGroup('Related', entry.related)}
            ${renderBulletGroup('Interactions', entry.spec?.interactions)}
            ${renderBulletGroup('DevExpress Parity', entry.spec?.devexpressParity)}
            ${renderBulletGroup('Accessibility', entry.accessibility)}
            ${renderBulletGroup('Responsive', entry.responsive)}
            ${renderBulletGroup('Composition Rules', entry.compositionRules)}
            ${renderBulletGroup('Anti-Patterns', entry.antiPatterns)}
            ${renderThemeNotes(entry.spec)}
          `,
          `${entry.spec?.states?.length || 0} states`
        )}
        ${renderDisclosurePanel(
          'API',
          'Props, events, methods, and styling hooks',
          `
            ${renderTable('Props', entry.props, 'Name', 'Description', 'Default')}
            ${renderTable('Events', entry.events, 'Name', 'Description', '')}
            ${renderTable('Methods', entry.methods, 'Name', 'Description', '')}
            ${renderTable('Slots', entry.slots, 'Name', 'Description', '')}
            ${renderTable('Parts', entry.parts, 'Name', 'Description', '')}
            ${renderTable('CSS Variables', entry.cssVariables, 'Name', 'Description', '')}
          `,
          `${entry.props.length} props / ${entry.events.length} events`
        )}
        ${renderDisclosurePanel(
          'Manifest',
          'Raw entry snapshot',
          `<pre class="code-block manifest-block"><code>${escapeHtml(JSON.stringify(entry, null, 2))}</code></pre>`,
          'JSON'
        )}
      </section>
      ${renderFrameFooter()}
    </main>
  `;

  mountPreview(entry, example);
}

function mountPreview(entry, selectedExample) {
  const previewStages = [...document.querySelectorAll('[data-preview-stage]')];

  for (const previewStage of previewStages) {
    const exampleKey = previewStage.dataset.exampleKey;
    const example = getExampleByKey(entry, exampleKey) || selectedExample;
    renderPreviewStage(previewStage, entry, example);
  }
}

function renderPreviewStage(previewStage, entry, example) {
  const label = example?.title || entry.displayName;
  const mockSurface = isMockExample(example);

  previewStage.innerHTML = `
    <div class="playground-host${mockSurface ? ' is-mock-surface' : ''}" data-theme-family="${escapeHtml(state.themeFamily)}" data-theme="${escapeHtml(state.scheme)}">
      <div class="playground-canvas ${state.scheme === 'dark' ? 'is-dark' : ''}${mockSurface ? ' is-mock-surface' : ''}">
        ${getExampleMarkup(entry, example)}
      </div>
    </div>
  `;

  previewStage.setAttribute('aria-label', `${entry.displayName} ${label}`);
  bindPreviewInteractions(previewStage);
}

function bindPreviewInteractions(previewStage) {
  bindActionSheetPreview(previewStage);
  bindFormWavePreview(previewStage);
}

function setExampleFeedback(message) {
  document.querySelectorAll('[data-example-feedback]').forEach((node) => {
    if (node instanceof HTMLElement) {
      node.textContent = message;
    }
  });
}

function setCardFeedback(exampleKey, message) {
  document.querySelectorAll('[data-card-feedback]').forEach((node) => {
    if (node instanceof HTMLElement && node.dataset.exampleKey === exampleKey) {
      node.textContent = message;
    }
  });
}

function updateCardMetrics(exampleKey, code) {
  const metrics = summarizeMarkup(code);

  document.querySelectorAll('[data-example-lines]').forEach((node) => {
    if (node instanceof HTMLElement && node.dataset.exampleKey === exampleKey) {
      node.textContent = `${metrics.lines} lines`;
    }
  });

  document.querySelectorAll('[data-example-characters]').forEach((node) => {
    if (node instanceof HTMLElement && node.dataset.exampleKey === exampleKey) {
      node.textContent = `${metrics.characters} chars`;
    }
  });
}

function updateHighlightedCode(exampleKey, code) {
  const formatted = formatMarkup(code);
  const highlighted = highlightMarkup(formatted);

  document.querySelectorAll('[data-example-highlight-body]').forEach((node) => {
    if (node instanceof HTMLElement && node.dataset.exampleKey === exampleKey) {
      node.innerHTML = highlighted;
    }
  });
}

function updateCardStatus(entry, exampleKey) {
  const edited = hasExampleOverride(entry, exampleKey);

  document.querySelectorAll('[data-example-status]').forEach((node) => {
    if (!(node instanceof HTMLElement) || node.dataset.exampleKey !== exampleKey) {
      return;
    }

    node.textContent = edited ? 'Edited sample' : 'Base sample';
    node.classList.toggle('token-muted', !edited);
  });
}

function findExampleEditor(exampleKey) {
  return [...document.querySelectorAll('[data-example-editor]')].find((node) => node.dataset.exampleKey === exampleKey);
}

function updateCodePanelMode(exampleKey, mode) {
  document.querySelectorAll('[data-code-panel]').forEach((panel) => {
    if (!(panel instanceof HTMLElement) || panel.dataset.exampleKey !== exampleKey) {
      return;
    }

    panel.dataset.codeMode = mode;
    panel.querySelectorAll('[data-code-mode-button]').forEach((button) => {
      if (button instanceof HTMLElement) {
        button.classList.toggle('is-active', button.dataset.codeMode === mode);
      }
    });
  });
}

function refreshExamplePreview(entry, exampleKey) {
  const previewStage = [...document.querySelectorAll('[data-preview-stage]')].find((node) => node.dataset.exampleKey === exampleKey);

  if (!previewStage) {
    return;
  }

  renderPreviewStage(previewStage, entry, getExampleByKey(entry, exampleKey));
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } finally {
    textarea.remove();
  }
}

function bindActionSheetPreview(previewStage) {
  const trigger = previewStage.querySelector('[data-action-sheet-trigger]');
  const actionSheet = previewStage.querySelector('eon-action-sheet');
  const status = previewStage.querySelector('[data-action-sheet-status]');

  if (!(trigger instanceof HTMLElement) || !(actionSheet instanceof HTMLElement)) {
    return;
  }

  const setStatus = (message) => {
    if (status instanceof HTMLElement) {
      status.textContent = message;
    }
  };

  trigger.addEventListener('click', async () => {
    setStatus('Action sheet opened. Pick an option or dismiss it.');

    if (typeof actionSheet.show === 'function') {
      await actionSheet.show();
      return;
    }

    actionSheet.setAttribute('open', '');
  });

  actionSheet.addEventListener('eonSelect', (event) => {
    const value = event.detail?.value;
    setStatus(value ? `Selected action: ${value}.` : 'Action selected.');
  });

  actionSheet.addEventListener('eonCancel', () => {
    setStatus('Action sheet dismissed.');
  });
}

function bindFormWavePreview(previewStage) {
  const selectBox = previewStage.querySelector('eon-select-box');
  const lookup = previewStage.querySelector('eon-lookup');
  const numberBox = previewStage.querySelector('eon-number-box');
  const dateBox = previewStage.querySelector('eon-date-box');
  const dateRangeBox = previewStage.querySelector('eon-date-range-box');
  const uploader = previewStage.querySelector('eon-file-uploader');
  const dropdownMenu = previewStage.querySelector('eon-dropdown-menu');

  if (selectBox) {
    selectBox.addEventListener('eonChange', (event) => {
      const labels = event.detail?.labels || [];
      if (labels.length) {
        setExampleFeedback(`Select box updated: ${labels.join(', ')}.`);
      }
    });
  }

  if (lookup) {
    lookup.addEventListener('eonChange', (event) => {
      const label = event.detail?.label || event.detail?.value;
      if (label) {
        setExampleFeedback(`Lookup selected ${label}.`);
      }
    });
  }

  if (numberBox) {
    numberBox.addEventListener('eonChange', (event) => {
      if (event.detail?.value != null) {
        setExampleFeedback(`Number box committed ${event.detail.value}.`);
      }
    });
  }

  if (dateBox) {
    dateBox.addEventListener('eonChange', (event) => {
      if (event.detail?.value) {
        setExampleFeedback(`Date box committed ${event.detail.value}.`);
      }
    });
  }

  if (dateRangeBox) {
    dateRangeBox.addEventListener('eonChange', (event) => {
      if (event.detail?.start || event.detail?.end) {
        setExampleFeedback(`Date range committed ${event.detail.start || '...'} to ${event.detail.end || '...'}.`);
      }
    });
  }

  if (uploader) {
    uploader.addEventListener('eonFileAction', (event) => {
      const action = event.detail?.action;
      const file = event.detail?.file;
      if (action && file) {
        setExampleFeedback(`Uploader ${action.replace(/-/g, ' ')}: ${file}.`);
      }
    });
  }

  if (dropdownMenu) {
    dropdownMenu.addEventListener('eonSelect', (event) => {
      const label = event.detail?.label || event.detail?.value;
      if (label) {
        setExampleFeedback(`Dropdown action selected: ${label}.`);
      }
    });
  }
}

function syncUrl() {
  const params = new URLSearchParams();
  params.set('component', state.component);
  params.set('example', state.example);
  params.set('theme', state.themeFamily);
  params.set('scheme', state.scheme);

  if (state.scope !== 'elements') {
    params.set('scope', state.scope);
  }

  if (state.category !== 'all') {
    params.set('category', state.category);
  }

  if (state.search.trim()) {
    params.set('q', state.search.trim());
  }

  if (previewMode) {
    params.set('mode', 'preview');
  }

  window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
}

app.addEventListener('click', (event) => {
  const componentButton = event.target.closest('[data-component-button]');
  const exampleCardButton = event.target.closest('[data-example-card-button]');
  const codeModeButton = event.target.closest('[data-code-mode-button]');
  const formatCardCodeButton = event.target.closest('[data-format-card-code]');
  const applyCardCodeButton = event.target.closest('[data-apply-card-code]');
  const resetCardCodeButton = event.target.closest('[data-reset-card-code]');
  const copyCardCodeButton = event.target.closest('[data-copy-card-code]');

  if (codeModeButton) {
    const exampleKey = codeModeButton.dataset.exampleKey;
    const mode = codeModeButton.dataset.codeMode;

    if (!exampleKey || !mode) {
      return;
    }

    updateCodePanelMode(exampleKey, mode);
    return;
  }

  if (formatCardCodeButton) {
    const exampleKey = formatCardCodeButton.dataset.exampleKey;
    const editor = findExampleEditor(exampleKey);

    if (!(editor instanceof HTMLTextAreaElement) || !exampleKey) {
      return;
    }

    const formatted = formatMarkup(editor.value);
    editor.value = formatted;
    updateCardMetrics(exampleKey, formatted);
    updateHighlightedCode(exampleKey, formatted);
    setCardFeedback(exampleKey, 'Formatted the sample code. Apply to refresh the live preview.');
    return;
  }

  if (copyCardCodeButton) {
    const editor = findExampleEditor(copyCardCodeButton.dataset.exampleKey);
    const exampleKey = copyCardCodeButton.dataset.exampleKey;

    if (!(editor instanceof HTMLTextAreaElement) || !exampleKey) {
      return;
    }

    copyText(editor.value.trim())
      .then((copied) => {
        setCardFeedback(
          exampleKey,
          copied ? 'Copied the current sample code.' : 'Copy is not available in this browser session.'
        );
      })
      .catch(() => {
        setCardFeedback(exampleKey, 'Copy failed. You can still select the sample code manually.');
      });
    return;
  }

  if (applyCardCodeButton) {
    const entry = getSelectedEntry();
    const exampleKey = applyCardCodeButton.dataset.exampleKey;
    const editor = findExampleEditor(exampleKey);

    if (!(editor instanceof HTMLTextAreaElement) || !exampleKey) {
      return;
    }

    state.exampleCodeOverrides[getExampleOverrideKey(entry, exampleKey)] = editor.value;
    updateCardMetrics(exampleKey, editor.value);
    updateCardStatus(entry, exampleKey);
    updateHighlightedCode(exampleKey, editor.value);
    refreshExamplePreview(entry, exampleKey);
    setCardFeedback(exampleKey, 'Applied your edits to the live preview.');
    return;
  }

  if (resetCardCodeButton) {
    const entry = getSelectedEntry();
    const exampleKey = resetCardCodeButton.dataset.exampleKey;
    const example = getExampleByKey(entry, exampleKey);
    const editor = findExampleEditor(exampleKey);

    if (!(editor instanceof HTMLTextAreaElement) || !exampleKey || !example) {
      return;
    }

    delete state.exampleCodeOverrides[getExampleOverrideKey(entry, exampleKey)];
    editor.value = formatMarkup(example.code);
    updateCardMetrics(exampleKey, editor.value);
    updateCardStatus(entry, exampleKey);
    updateHighlightedCode(exampleKey, editor.value);
    refreshExamplePreview(entry, exampleKey);
    setCardFeedback(exampleKey, 'Reset this example back to the base sample code.');
    return;
  }

  if (exampleCardButton) {
    state.example = exampleCardButton.dataset.exampleKey;
    syncUrl();
    render();
    return;
  }

  if (!componentButton) {
    return;
  }

  state.component = componentButton.dataset.tag;
  state.example = getPreferredExampleKey(getSelectedEntry());
  syncUrl();
  render();
});

app.addEventListener('input', (event) => {
  const target = event.target;

  if (target.matches('[data-search-input]')) {
    state.search = target.value;
    render();
    return;
  }

  if (target.matches('[data-example-editor]')) {
    updateCardMetrics(target.dataset.exampleKey, target.value);
    updateHighlightedCode(target.dataset.exampleKey, target.value);
    setCardFeedback(target.dataset.exampleKey, 'Unsaved edits in the sample code. Apply to refresh the preview.');
  }
});

app.addEventListener('change', (event) => {
  const target = event.target;

  if (target.matches('[data-scope-select]')) {
    state.scope = target.value;
    state.category = 'all';
    state.example = '';
    render();
    return;
  }

  if (target.matches('[data-category-select]')) {
    state.category = target.value;
    state.example = '';
    render();
    return;
  }

  if (target.matches('[data-theme-family]')) {
    state.themeFamily = target.value;
    syncUrl();
    render();
    return;
  }

  if (target.matches('[data-theme-scheme]')) {
    state.scheme = target.value;
    syncUrl();
    render();
    return;
  }

  if (target.matches('[data-example-select]')) {
    state.example = target.value;
    syncUrl();
    render();
  }
});

function render() {
  normalizeState();
  syncUrl();

  if (previewMode) {
    renderStandalonePreview();
    return;
  }

  renderDashboard();
}

render();
