import { createServer, type IncomingMessage } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { chartLibrary, componentLibrary } from '@jarvis/manifest';
import type { ComponentManifestEntry, LibraryManifest, ManifestProp } from '@jarvis/manifest';
import { createMystiqueChart, createMystiqueChartPreview } from '@mystique/components';
import {
  MYSTIQUE_FULLY_IMPLEMENTED_CHART_TARGET,
  createSampleChartData,
  isFullyImplementedChart as isFullyImplementedMystiqueChart,
  resolveChartType
} from '@mystique/core';
import { sharedGuides } from './accessibility-guides.js';
import { chartGuide } from './chart-guides.js';
import { guidePages } from './content.js';
import { frameworkGuides } from './framework-guides.js';
import { tokenGuide } from './token-guides.js';
import { themeBundleCss } from '@jarvis/styles';

const componentCategoryLabels: Record<string, string> = {
  forms: 'Forms and input',
  actions: 'Actions',
  feedback: 'Messaging and feedback',
  navigation: 'Navigation',
  overlays: 'Overlays and layering',
  layout: 'Layout and structure',
  disclosure: 'Disclosure',
  'data-display': 'Text and data display'
};

const chartFamilyLabels: Record<string, string> = {
  cartesian: 'Cartesian',
  polar: 'Polar',
  hierarchical: 'Hierarchical',
  network: 'Network',
  distribution: 'Distribution',
  financial: 'Financial',
  composite: 'Composite'
};

type ChartManifestEntry = LibraryManifest['charts'][number];

const featuredPlaygroundChartNames = [
  'line-forecast-band',
  'area-confidence-envelope',
  'scatter-outlier-lens',
  'heatmap-multi-resolution',
  'network-topology-health',
  'sankey-tapered-flow',
  'combo-control-room',
  'treemap-drilldown-workbench'
] as const;

const docsPort = Number(process.env.PORT ?? '4321');
const docsBaseUrl = `http://localhost:${docsPort}`;
const fullyImplementedChartCount = MYSTIQUE_FULLY_IMPLEMENTED_CHART_TARGET;

function isFullyImplementedChart(chartName: string): boolean {
  return isFullyImplementedMystiqueChart(chartName);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function titleCase(value: string): string {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function renderInlineCodes(values: readonly string[]): string {
  return values.length ? values.map((value) => `<code>${escapeHtml(value)}</code>`).join(' ') : 'None';
}

function renderRows(rows: readonly string[], emptyLabel: string): string {
  return rows.length ? `<ul>${rows.map((row) => `<li>${escapeHtml(row)}</li>`).join('')}</ul>` : `<p>${emptyLabel}</p>`;
}

function renderPills(values: readonly string[], emptyLabel: string): string {
  return values.length ? `<div class="pill-row">${values.map((value) => `<span class="pill">${escapeHtml(value)}</span>`).join('')}</div>` : `<p>${emptyLabel}</p>`;
}

function renderProps(props: Array<{ name: string; type: string; default?: string; description: string }>): string {
  if (!props.length) {
    return '<p>No public props documented yet.</p>';
  }

  return `<table><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>${props
    .map(
      (prop) =>
        `<tr><td><code>${escapeHtml(prop.name)}</code></td><td><code>${escapeHtml(prop.type)}</code></td><td>${escapeHtml(prop.default ?? '')}</td><td>${escapeHtml(prop.description)}</td></tr>`
    )
    .join('')}</tbody></table>`;
}

function renderEvents(events: Array<{ name: string; detail?: string; description: string }>): string {
  if (!events.length) {
    return '<p>No custom events documented yet.</p>';
  }

  return `<table><thead><tr><th>Event</th><th>Detail</th><th>Description</th></tr></thead><tbody>${events
    .map(
      (event) =>
        `<tr><td><code>${escapeHtml(event.name)}</code></td><td><code>${escapeHtml(event.detail ?? '')}</code></td><td>${escapeHtml(event.description)}</td></tr>`
    )
    .join('')}</tbody></table>`;
}

function renderMethods(methods: Array<{ name: string; description: string }>): string {
  if (!methods.length) {
    return '<p>No public methods documented yet.</p>';
  }

  return `<table><thead><tr><th>Method</th><th>Description</th></tr></thead><tbody>${methods
    .map((method) => `<tr><td><code>${escapeHtml(method.name)}</code></td><td>${escapeHtml(method.description)}</td></tr>`)
    .join('')}</tbody></table>`;
}

function renderCodeBlock(code: string): string {
  return `<pre><code>${escapeHtml(code)}</code></pre>`;
}

function groupChartsByFamily(charts: ChartManifestEntry[]) {
  return Object.entries(
    charts.reduce<Record<string, ChartManifestEntry[]>>((acc, chart) => {
      const family = chart.family ?? 'cartesian';
      (acc[family] ??= []).push(chart);
      return acc;
    }, {})
  )
    .sort(([left], [right]) => (chartFamilyLabels[left] ?? left).localeCompare(chartFamilyLabels[right] ?? right))
    .map(([family, items]) => ({
      family,
      label: chartFamilyLabels[family] ?? titleCase(family),
      items: items.sort((left, right) => left.name.localeCompare(right.name))
    }));
}

function selectFeaturedCharts(charts: ChartManifestEntry[], limit: number): ChartManifestEntry[] {
  const curated = featuredPlaygroundChartNames
    .map((chartName) => charts.find((chart) => chart.name === chartName))
    .filter((chart): chart is ChartManifestEntry => Boolean(chart));

  if (curated.length >= limit) {
    return curated.slice(0, limit);
  }

  const fallback = charts.filter((chart) => !curated.some((item) => item.name === chart.name)).slice(0, limit - curated.length);
  return [...curated, ...fallback];
}

function renderChartDataShape(dataShape: ChartManifestEntry['dataShape']): string {
  if (!dataShape?.length) {
    return '<p>No chart data schema documented yet.</p>';
  }

  return `<table><thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody>${dataShape
    .map(
      (field) =>
        `<tr><td><code>${escapeHtml(field.name)}</code></td><td><code>${escapeHtml(field.type)}</code></td><td>${field.required ? 'Yes' : 'No'}</td><td>${escapeHtml(field.description)}</td></tr>`
    )
    .join('')}</tbody></table>`;
}

function formatScaleValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return `${value}`;
}

function renderChartScales(scales: ReturnType<typeof createMystiqueChartPreview>['definition']['scales']): string {
  const entries = Object.entries(scales).filter(([, scale]) => Boolean(scale));
  if (!entries.length) {
    return '<p>No scale metadata available yet.</p>';
  }

  return `<table><thead><tr><th>Channel</th><th>Scale</th><th>Range</th><th>Domain</th></tr></thead><tbody>${entries
    .map(([channel, scale]) => {
      const resolvedScale = scale!;
      const range = resolvedScale.range.join(' → ');
      const domain = resolvedScale.domain.map((value) => formatScaleValue(value)).join(', ');
      return `<tr><td><code>${escapeHtml(channel)}</code></td><td><code>${escapeHtml(resolvedScale.type)}</code></td><td>${escapeHtml(range)}</td><td>${escapeHtml(domain)}</td></tr>`;
    })
    .join('')}</tbody></table>`;
}

function renderMotionSpec(motion: ReturnType<typeof createMystiqueChartPreview>['definition']['options']['motion']): string {
  const enabled = motion?.enabled ?? false;
  const preset = motion?.preset ?? 'draw';
  const durationMs = motion?.durationMs ?? 0;
  const easing = motion?.easing ?? 'linear';
  const staggerMs = motion?.staggerMs ?? 0;

  return `<table><tbody>
    <tr><th>Enabled</th><td>${enabled ? 'Yes' : 'No'}</td></tr>
    <tr><th>Preset</th><td><code>${escapeHtml(preset)}</code></td></tr>
    <tr><th>Duration</th><td>${durationMs}ms</td></tr>
    <tr><th>Easing</th><td><code>${escapeHtml(easing)}</code></td></tr>
    <tr><th>Stagger</th><td>${staggerMs}ms</td></tr>
  </tbody></table>`;
}

function renderChartSvgPreview(chart: ChartManifestEntry, width = 640, height = 320): string {
  const chartName = chart.name ?? 'line';
  return createMystiqueChart({
    type: chartName,
    data: createSampleChartData(chartName) as Array<Record<string, unknown>>,
    options: {
      title: titleCase(chartName),
      width,
      height,
      renderer: 'svg'
    }
  });
}

function createChartRendererCode(chart: ChartManifestEntry, renderer: 'svg' | 'canvas', sampleData: unknown): string {
  const chartName = chart.name ?? 'line';
  const title = titleCase(chartName);
  const dataBlock = JSON.stringify(sampleData, null, 2);

  if (renderer === 'svg') {
    return `import { createMystiqueChart } from '@mystique/components';

const data = ${dataBlock};

const markup = createMystiqueChart({
  type: '${chartName}',
  data,
  options: {
    title: '${title}',
    width: 640,
    height: 320,
    renderer: 'svg'
  }
});`;
  }

  return `import { drawMystiqueChart } from '@mystique/canvas';

const data = ${dataBlock};
const canvas = document.querySelector('canvas');
const ctx = canvas?.getContext('2d');

if (ctx) {
  drawMystiqueChart(ctx, '${chartName}', data, 640, 320, '${title}');
}`;
}

function renderChartCatalogCard(chart: ChartManifestEntry): string {
  const chartName = chart.name ?? 'chart';
  const baseType = resolveChartType(chartName);
  const isVariant = chartName !== baseType;
  const family = chart.family ?? 'cartesian';
  const renderer = chart.renderer ?? 'hybrid';
  const implemented = isFullyImplementedChart(chartName);

  return `<a class="card-link chart-card" href="/charts/${chartName}">
    <div class="preview-render chart-card-preview">${renderChartSvgPreview(chart, 248, 148)}</div>
    <div class="pill-row">
      <span class="pill">${escapeHtml(renderer)}</span>
      <span class="pill">${escapeHtml(chartFamilyLabels[family] ?? titleCase(family))}</span>
      <span class="pill">${implemented ? 'Fully implemented' : 'Catalog variant'}</span>
      <span class="pill">${escapeHtml(isVariant ? `Variant of ${baseType}` : 'Base implementation')}</span>
    </div>
    <strong>${escapeHtml(titleCase(chartName))}</strong>
    <p class="quiet">${escapeHtml(chart.description)}</p>
  </a>`;
}

function groupComponentsByCategory(components: ComponentManifestEntry[]) {
  return Object.entries(
    components.reduce<Record<string, ComponentManifestEntry[]>>((acc, component) => {
      (acc[component.category] ??= []).push(component);
      return acc;
    }, {})
  )
    .sort(([left], [right]) => (componentCategoryLabels[left] ?? left).localeCompare(componentCategoryLabels[right] ?? right))
    .map(([category, items]) => ({
      category,
      label: componentCategoryLabels[category] ?? titleCase(category),
      items: items.sort((left, right) => left.tag.localeCompare(right.tag))
    }));
}

function deriveAllowedValues(type: string): string[] {
  return [...type.matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function deriveStates(props: Array<{ name: string; description: string }>): string[] {
  const stateNames = ['disabled', 'loading', 'invalid', 'required', 'checked', 'open', 'selected', 'polite'];
  return props.filter((prop) => stateNames.includes(prop.name)).map((prop) => `${prop.name}: ${prop.description}`);
}

function deriveOptions(props: ManifestProp[]): string[] {
  return props.flatMap((prop) => {
    const values = deriveAllowedValues(prop.type);
    return values.length ? [`${prop.name}: ${values.join(', ')}`] : [];
  });
}

function deriveManifestExamples(component: ComponentManifestEntry): Array<{ title: string; markup: string }> {
  return component.examples
    .filter((example) => typeof example?.code === 'string' && example.code.trim().length)
    .map((example, index) => ({
      title: example.title || `Example ${index + 1}`,
      markup: example.code.trim()
    }))
    .slice(0, 6);
}

function formatPropValue(value: string): string {
  return `"${value.replaceAll('"', '&quot;')}"`;
}

function buildAutoGeneratedExamples(component: ComponentManifestEntry): Array<{ title: string; markup: string }> {
  const stringProps = component.props.filter((prop) => /^string|^number|^boolean|^\"/.test(prop.type) || prop.name === 'label' || prop.name === 'title');
  const enumProps = component.props
    .map((prop) => ({ prop, values: deriveAllowedValues(prop.type) }))
    .filter((item) => item.values.length);

  if (!component.props.length && !enumProps.length) {
    return [{ title: 'Basic usage', markup: `<${component.tag}></${component.tag}>` }];
  }

  const boolProps = component.props.filter((prop) => prop.type === 'boolean');
  const labelProp = component.props.find((prop) => prop.name === 'label');
  const textProp = component.props.find((prop) => prop.name === 'text');
  const placeholderProp = component.props.find((prop) => prop.name === 'placeholder');
  const openProp = component.props.find((prop) => prop.name === 'open');
  const valueProp = component.props.find((prop) => prop.name === 'value');

  const baseAttributes: string[] = [];
  const baseTitle = `${titleCase(component.name)} baseline`;

  if (labelProp) {
    baseAttributes.push(`label=${formatPropValue(`${baseTitle}`)}`);
  }

  if (textProp) {
    baseAttributes.push(`text=${formatPropValue('Sample content')}`);
  }

  if (placeholderProp) {
    baseAttributes.push(`placeholder=${formatPropValue('Search value')}`);
  }

  if (valueProp) {
    baseAttributes.push(`value=${formatPropValue('demo')}`);
  }

  if (openProp && openProp.type === 'boolean') {
    baseAttributes.push('open');
  } else if (boolProps.length) {
    const boolProp = boolProps.find((prop) => !['disabled', 'readonly', 'required', 'checkable', 'collapsed'].includes(prop.name));
    if (boolProp) {
      baseAttributes.push(boolProp.name);
    }
  }

  stringProps.slice(0, 2).forEach((prop) => {
    if (prop.name === 'label' || prop.name === 'text' || prop.name === 'placeholder' || prop.name === 'value') {
      return;
    }
    if (prop.name === 'items' && prop.type.includes('string')) {
      return;
    }
    baseAttributes.push(`${prop.name}=${formatPropValue(titleCase(prop.name))}`);
  });

  const baseMarkup = `<${component.tag}${baseAttributes.length ? ` ${baseAttributes.join(' ')}` : ''}></${component.tag}>`;
  const generated: Array<{ title: string; markup: string }> = [
    {
      title: `Auto-generated baseline`,
      markup: baseMarkup
    }
  ];

  const topEnumProp = enumProps[0];
  if (topEnumProp) {
    const { prop, values } = topEnumProp;
    values.slice(0, 2).forEach((value, index) => {
      generated.push({
        title: `Auto variant: ${prop.name}="${value}"`,
        markup: `<${component.tag} ${prop.name}="${value}"${baseAttributes.length ? ` ${baseAttributes.slice(0, 2).join(' ')}` : ''}></${component.tag}>`
      });
    });
  }

  if (enumProps.length > 1 && baseAttributes.length < 6) {
    const secondary = enumProps[1];
    if (secondary) {
      const [value] = secondary.values;
      if (value) {
        generated.push({
          title: `Auto variant: ${secondary.prop.name}="${value}"`,
          markup: `<${component.tag} ${secondary.prop.name}="${value}">${titleCase(component.name)} variant</${component.tag}>`
        });
      }
    }
  }

  if (!generated.length) {
    generated.push({ title: 'Fallback usage', markup: `<${component.tag}></${component.tag}>` });
  }

  return dedupeGalleryItems(generated);
}

function dedupeGalleryItems(items: Array<{ title: string; markup: string }>): Array<{ title: string; markup: string }> {
  const known = new Set<string>();
  const result: Array<{ title: string; markup: string }> = [];

  for (const item of items) {
    const canonicalMarkup = item.markup.replace(/\s+/g, ' ').trim();
    const canonicalTitle = item.title.replace(/\s+/g, ' ').trim();
    const key = `${canonicalMarkup}::${canonicalTitle}`;
    if (!known.has(key)) {
      known.add(key);
      result.push({ title: item.title, markup: item.markup });
    }
  }

  return result;
}

function createDefaultExample(component: ComponentManifestEntry): string {
  if (component.examples[0]?.code) {
    return component.examples[0].code;
  }

  if (component.tag === 'jarvis-accordion') {
    return `<jarvis-accordion items="Workspace defaults|Control the base workspace experience and save preferred launch views.|; Notifications|Route alerts by priority, owner, and working hours.|; Escalations|Choose who gets paged after hours and which channels stay enabled.|" value="Workspace defaults"></jarvis-accordion>`;
  }

  if (component.tag === 'jarvis-dropdown-menu') {
    return `<jarvis-dropdown-menu label="More actions" items="Workspace/Edit|edit||Update the current workspace details.; Workspace/Duplicate|duplicate||Create a copy for experimentation.; Reviews/Archive|archive||Move this workspace to the archive.; Reviews/Delete|delete|danger|This action cannot be undone." show-selection value="duplicate"></jarvis-dropdown-menu>`;
  }

  if (component.tag === 'jarvis-breadcrumb') {
    return `<jarvis-breadcrumb items="Workspace,Projects,Jarvis UI,Components"></jarvis-breadcrumb>`;
  }

  if (component.tag === 'jarvis-list') {
    return `<div style="display:grid;grid-template-columns:minmax(18rem,1fr) minmax(15rem,18rem);gap:1rem;align-items:start;"><jarvis-list items="Hamburg/Hamburg Suites~20099, An Der Alster 82; Hamburg/The Park Hotel~20537, Borstelmannsweg 82; Honolulu/Honolulu Inn~96801, 822 Mauna Loa Rd; Honolulu/Waikiki Beach Hotel~96801, 800 Waikiki Ave" selection-mode="multiple" search-enabled search-mode="startsWith" show-selection-controls show-toolbar show-select-all show-status search-placeholder="Search hotels" selected="Hamburg/Hamburg Suites~20099, An Der Alster 82,Hamburg/The Park Hotel~20537, Borstelmannsweg 82"></jarvis-list><jarvis-surface elevated><jarvis-stack><strong>Selection workspace</strong><p>Toolbar actions now let people refine with search, bulk select visible results, and clear the current set without leaving the list.</p><jarvis-chip removable>2 selected</jarvis-chip></jarvis-stack></jarvis-surface></div>`;
  }

  if (component.tag === 'jarvis-pagination') {
    return `<jarvis-pagination page="3" total="8"></jarvis-pagination>`;
  }

  if (component.tag === 'jarvis-popover') {
    return `<jarvis-popover trigger-label="Review details" heading="Workspace summary" description="Quick context for reviewers" width="18rem"><jarvis-stack><p>Use a popover when people need lightweight context without leaving the current surface.</p><jarvis-button variant="outline">Open workspace</jarvis-button></jarvis-stack></jarvis-popover>`;
  }

  if (component.tag === 'jarvis-tabs') {
    return `<jarvis-tabs labels="Overview,Usage,Accessibility"><div>Use tabs to switch related content in place.</div></jarvis-tabs>`;
  }

  if (component.tag === 'jarvis-button-group') {
    return `<jarvis-button-group label="Align content" items="Left~Primary reading edge; Center~Balanced layouts; Right~Edge anchored notes; Justify~Long-form paragraphs" value="Center" help-text="Choose the default content alignment for this workspace."></jarvis-button-group>`;
  }

  if (component.tag === 'jarvis-menu') {
    return `<div style="display:grid;gap:1rem;"><jarvis-menu aria-label="Product catalog navigation" aria-description="Top-level product catalog with hover-first submenus and remembered selection." items="Catalog/Video Players/HD Video Player~Best for compact rooms; Catalog/Video Players/SuperHD Video Player~Cinematic upgrade; Catalog/Televisions/SuperLCD 42~Backordered this month|disabled; Catalog/Televisions/SuperLED 50~Flagship showroom panel; Workspace/Admin/Delete workspace~Requires owner approval|danger" orientation="horizontal" trigger-mode="click" show-first-submenu-mode="hover" value="Catalog/Televisions/SuperLED 50"></jarvis-menu><div style="display:grid;grid-template-columns:minmax(13rem,16rem) minmax(0,1fr);gap:1rem;align-items:start;"><jarvis-menu aria-label="Workspace command rail" aria-description="Vertical workspace rail with persistent flyouts and explicit selection indicators." items="Workspace/Overview~Live dashboard; Workspace/Members~32 collaborators; Workspace/Billing~Invoices and plans; Reports/Sales/Daily~Updated hourly; Reports/Sales/Weekly~Board review ready; Reports/Inventory/Reorder list~2 suppliers pending|disabled; Settings/Security~MFA enforced" orientation="vertical" trigger-mode="click" close-on-select="false" value="Reports/Sales/Weekly"></jarvis-menu><jarvis-surface elevated><jarvis-stack><strong>Catalog workspace</strong><p>Use hover or click to reveal submenu actions while keeping disabled and destructive rows clearly distinct. Type a few letters to jump focus to the next matching command.</p></jarvis-stack></jarvis-surface></div></div>`;
  }

  if (component.tag === 'jarvis-context-menu') {
    return `<jarvis-context-menu aria-label="Product media actions" show-on="click" close-on-select="false" value="Add to favorite" items="Share/Facebook~Publish to the company page; Share/Twitter~Post the teaser copy; Download~Save the latest preview; Add comment~Open the review thread; Add to favorite~Pin to quick access; Delete asset~Cannot be undone|danger"><div style="display:grid;gap:0.8rem;justify-items:start;padding:1rem;border:1px solid rgba(120,138,164,0.22);border-radius:1rem;background:linear-gradient(180deg,#ffffff,#f8fbff);min-height:12rem;"><div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Product media</div><div style="width:100%;min-height:8rem;border-radius:0.9rem;background:linear-gradient(135deg,#0f172a,#1e293b 45%,#334155);display:grid;place-items:center;color:#f8fafc;font-weight:600;">Click the display preview</div><div style="display:flex;justify-content:space-between;width:100%;font-size:0.95rem;color:#334155;"><span>SuperLCD 55</span><strong>$799</strong></div></div></jarvis-context-menu>`;
  }

  if (component.tag === 'jarvis-stepper') {
    return `<div style="display:grid;gap:1rem;"><jarvis-stepper items="Cart|cart||; Shipping info|truck||; Promo code|gift|Optional|optional; Checkout|card||; Ordered|check|Confirmed|" current="2" completed="0,1" invalid-steps="3" disabled-steps="4" size="lg"></jarvis-stepper><jarvis-surface elevated><jarvis-stack><strong>Reviewable step flow</strong><p>Completed, invalid, and disabled steps can now be driven externally, which makes the stepper useful for form review and workflow summary screens.</p></jarvis-stack></jarvis-surface></div>`;
  }

  if (component.tag === 'jarvis-autocomplete') {
    return `<jarvis-autocomplete label="Assignee" placeholder="Search teammates" suggestions="George,Margaret,Olivia,Victor,Sam,John" show-clear-button accept-custom-value value="Olivia"></jarvis-autocomplete>`;
  }

  if (component.tag === 'jarvis-combobox') {
    return `<jarvis-combobox label="Owner" placeholder="Select or type an owner" options="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter; Engineering/Victor Norris" show-clear-button search-mode="startsWith" value="Engineering/Kevin Carter"></jarvis-combobox>`;
  }

  if (component.tag === 'jarvis-radio') {
    return `<jarvis-radio label="Primary contact" name="contact-choice" value="primary" checked help-text="Single radios can still carry helper copy when the surrounding form provides the group context."></jarvis-radio>`;
  }

  if (component.tag === 'jarvis-radio-group') {
    return `<jarvis-radio-group label="Priority" items="Low~Standard response window; Normal~Default handling pace; Urgent~Routes to the incident queue; High~Escalates to the on-call lead|high|danger" value="Urgent" required help-text="Choose the escalation level before routing the ticket."></jarvis-radio-group>`;
  }

  if (component.tag === 'jarvis-select-box') {
    return `<jarvis-select-box label="Product" items="Video Players/HD Video Player; Video Players/SuperHD Video Player; Televisions/SuperLCD 42; Televisions/SuperLED 50" grouped search-enabled show-clear-button value="Video Players/HD Video Player" help-text="Search, clear, and validation states now align with the rest of the Jarvis editor family."></jarvis-select-box>`;
  }

  if (component.tag === 'jarvis-lookup') {
    return `<jarvis-lookup label="Owner" heading="Select employee" items="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter; Engineering/Victor Norris" value="Engineering/Kevin Carter" grouped show-clear-button help-text="Search the full employee list and confirm the right owner."></jarvis-lookup>`;
  }

  if (component.tag === 'jarvis-drop-down-box') {
    return `<jarvis-drop-down-box label="Products" items="HD Video Player|hd; SuperHD Video Player|super-hd; SuperLCD 42|lcd-42; SuperLED 50|led-50; Projector Plus|projector" content-type="list" selection-mode="multiple" search-enabled show-selection-controls apply-value-mode="useButtons" show-clear-button value="hd,lcd-42" help-text="Use the embedded list when a plain select box is too shallow."></jarvis-drop-down-box>`;
  }

  if (component.tag === 'jarvis-drop-down-button') {
    return `<jarvis-drop-down-button label="Download trial" icon="save" split-button value="Download trial" items="Download trial||success|Export the latest evaluation build.; Share preview||default|Send the link to reviewers.; Archive draft||warning|Move the current draft out of the active queue.; Delete workspace||danger|Permanently remove the current draft."></jarvis-drop-down-button>`;
  }

  if (component.tag === 'jarvis-tag-box') {
    return `<jarvis-tag-box label="Products" items="Automation/ExcelRemote IR; Automation/ExcelRemote IP; Monitors/DesktopLCD 21; Monitors/DesktopLED 19; Projectors/Projector Plus" grouped search-enabled show-clear-button max-displayed-tags="2" value="Automation/ExcelRemote IR,Automation/ExcelRemote IP,Monitors/DesktopLCD 21" help-text="Selected items collapse into tags without hiding the search flow."></jarvis-tag-box>`;
  }

  if (component.tag === 'jarvis-number-box') {
    return `<jarvis-number-box label="Budget" value="14500.55" format="currency" currency="USD" fraction-digits="2" show-spin-buttons show-clear-button help-text="Currency formatting collapses to an editable value on focus."></jarvis-number-box>`;
  }

  if (component.tag === 'jarvis-slider') {
    return `<jarvis-slider label="Completion" value="65" min="0" max="100" value-suffix="%" show-labels show-tooltip show-ticks tick-interval="25"></jarvis-slider>`;
  }

  if (component.tag === 'jarvis-range-slider') {
    return `<jarvis-range-slider label="Budget range" start="15" end="65" min="0" max="100" value-prefix="$" value-suffix="k" show-labels show-tooltips show-ticks tick-interval="25"></jarvis-range-slider>`;
  }

  if (component.tag === 'jarvis-calendar') {
    return `<jarvis-calendar selection-mode="multiple" show-week-numbers show-today-button first-day-of-week="1" min="2026-04-05" max="2026-04-28" disabled-dates="2026-04-12,2026-04-19" value="2026-04-15,2026-04-16"></jarvis-calendar>`;
  }

  if (component.tag === 'jarvis-date-box') {
    return `<jarvis-date-box label="Billing cutoff" type="date" value="2026-04-15" min="2026-04-01" max="2026-04-30" help-text="Stage a new billing date, then apply it when you're ready." apply-value-mode="useButtons" show-clear-button show-today-button open-on-field-click></jarvis-date-box>`;
  }

  if (component.tag === 'jarvis-date-range-box') {
    return `<jarvis-date-range-box label="Publishing window" start="2026-04-12" end="2026-04-18" min="2026-04-01" max="2026-05-15" start-placeholder="Start" end-placeholder="End" help-text="Stage the range before committing it to the release schedule." apply-value-mode="useButtons" show-clear-button show-picker-buttons></jarvis-date-range-box>`;
  }

  if (component.tag === 'jarvis-file-uploader') {
    return `<jarvis-file-uploader label="Attachments" accept=".png,.jpg,.pdf" multiple max-files="3" max-file-size="2000000" help-text="Upload up to 3 files, each under 2 MB." upload-mode="manual"></jarvis-file-uploader>`;
  }

  if (component.tag === 'jarvis-color-box') {
    return `<jarvis-color-box label="Brand accent" value="#f05b41" help-text="Choose a theme color for highlighted actions and links." presets="#f05b41;#2563eb;#16a34a;#111827"></jarvis-color-box>`;
  }

  if (component.tag === 'jarvis-gallery') {
    return `<jarvis-gallery items="Coastal residence~Oceanfront suite with panoramic windows~Featured stay|#dbeafe,#93c5fd; Downtown studio~Creative review room and lounge~Urban workspace|#e0f2fe,#38bdf8; Forest retreat~Calm woodland lodge with spa access~Wellness escape|#dcfce7,#22c55e" show-thumbnails thumbnail-position="side" show-counter pause-on-hover></jarvis-gallery>`;
  }

  if (component.tag === 'jarvis-chat') {
    return `<jarvis-chat label="Account recovery" user="John Doe" status="Agent online" status-tone="success" attachments-enabled composer-help-text="Press Ctrl+Enter to send quickly." max-attachments="2"></jarvis-chat>`;
  }

  if (component.tag === 'jarvis-load-indicator') {
    return `<jarvis-load-indicator type="ring" size="lg" layout="stacked" show-label message="Syncing workspace data"></jarvis-load-indicator>`;
  }

  if (component.tag === 'jarvis-load-panel') {
    return `<jarvis-load-panel visible heading="Loading employee profile" message="Fetching profile details and recent activity" description="This usually takes a few seconds while we hydrate the card and timeline." progress-value="72" show-cancel-button><jarvis-surface><jarvis-stack><strong>John Heart</strong><p>Fetching profile details and activity...</p></jarvis-stack></jarvis-surface></jarvis-load-panel>`;
  }

  if (component.tag === 'jarvis-progress') {
    return `<jarvis-progress label="Uploading media" value="64" show-value-label helper-text="3 of 5 files complete."></jarvis-progress>`;
  }

  if (component.tag === 'jarvis-scroll-view') {
    return `<jarvis-scroll-view height="18rem" top-status-text="Top of the workspace timeline" bottom-status-text="More updates below" show-shadows show-refresh-button refresh-label="Reload feed"><jarvis-stack><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p></jarvis-stack></jarvis-scroll-view>`;
  }

  if (component.tag === 'jarvis-floating-action-button') {
    return `<div style="display:grid;gap:1rem;"><jarvis-floating-action-button position="inline" extended label="Add row" aria-description="Inline launcher with described follow-up actions." items="New row~Insert a row beneath the active one.|row|success; Invite teammate~Send an access invite to a collaborator.|invite; Duplicate report~Clone the active workspace card.|duplicate"></jarvis-floating-action-button><jarvis-floating-action-button position="inline" label="Compose" direction="right" close-on-select="false" items="Email~Open the email composer.|email; Message~Send a quick chat ping.|message; Delete draft~Remove the current draft.|delete|danger"></jarvis-floating-action-button></div>`;
  }

  if (component.tag === 'jarvis-sortable') {
    return `<jarvis-sortable compact columns="Backlog,Ready,Review,Done" empty-column-text="Queue is clear" items="Backlog/Write launch brief|Olivia Peyton|success; Ready/Prep stakeholder deck|Victor Norris|warning; Review/Confirm launch date|Maya Chen|danger"></jarvis-sortable>`;
  }

  if (component.tag === 'jarvis-tile-view') {
    return `<jarvis-tile-view items="Launch prep|Campaign command room|#dbeafe,#60a5fa|2x1|Featured; North Campus|Innovation lab|#e0f2fe,#38bdf8|1x1|Live; Legacy archive|Read-only records|#e2e8f0,#94a3b8|1x1|Archived|disabled"></jarvis-tile-view>`;
  }

  if (component.tag === 'jarvis-speech-to-text') {
    return `<jarvis-speech-to-text label="Use voice recognition" display-mode="button" clear-on-start auto-stop-after-final max-length="160" show-options></jarvis-speech-to-text>`;
  }

  if (component.tag === 'jarvis-file-manager') {
    return `<jarvis-file-manager current-path="Files/Widescreen" show-search search-placeholder="Search assets" show-preview selection-mode="multiple"></jarvis-file-manager>`;
  }

  if (component.tag === 'jarvis-html-editor') {
    return `<jarvis-html-editor show-word-count show-source-toggle toolbar-preset="full"></jarvis-html-editor>`;
  }

  if (component.tag === 'jarvis-range-selector') {
    return `<jarvis-range-selector heading="Select house price range" step="5000" min-range="10000" max-range="70000"></jarvis-range-selector>`;
  }

  if (component.tag === 'jarvis-vector-map') {
    return `<jarvis-vector-map legend-title="GDP bands" value-format="compact" legend-mode="top-regions"></jarvis-vector-map>`;
  }

  if (component.tag === 'jarvis-tree-view') {
    return `<div style="display:grid;grid-template-columns:minmax(16rem,1fr) minmax(14rem,18rem);gap:1rem;align-items:start;"><jarvis-tree-view items="Stores/Super Mart of the West/Video Players/HD Video Player; Stores/Super Mart of the West/Televisions/SuperLCD 42; Stores/Super Mart of the West/Televisions/SuperLED 50; Stores/Braeburn/Monitors/DesktopLCD 19; Stores/Braeburn/Projectors/Projector Plus" selection-mode="multiple" show-check-boxes-mode="normal" select-nodes-recursive search-enabled search-mode="startsWith" show-toolbar show-select-all show-status search-placeholder="Search products" selected="Stores/Super Mart of the West/Televisions/SuperLCD 42,Stores/Braeburn/Projectors/Projector Plus"></jarvis-tree-view><jarvis-surface elevated><jarvis-stack><strong>Visible-node selection</strong><jarvis-chip removable>SuperLCD 42</jarvis-chip><jarvis-chip removable>Projector Plus</jarvis-chip><p>Search, expand, bulk-select the visible branch set, and clear selection without losing tree context.</p></jarvis-stack></jarvis-surface></div>`;
  }

  if (component.tag === 'jarvis-popup') {
    return `<jarvis-popup open heading="Employee details" eyebrow="Workspace summary" status="Live" description="Use popup for focused detail, confirmation, and image-driven modal layouts." aria-description="Employee details popup with staged footer actions." initial-focus="close" show-overlay="false" position="top" width="30rem" sticky-footer><span slot="subtitle">652 Avonwick Gate</span><p>Highlight the key content, then use footer actions to drive the next step.</p><div slot="footer"><jarvis-button variant="outline">Send</jarvis-button> <jarvis-button>Close</jarvis-button></div></jarvis-popup>`;
  }

  if (component.tag === 'jarvis-toast') {
    return `<jarvis-toast tone="success" heading="Saved" duration="5000" show-progress-bar pause-on-hover show-close-button show-timestamp density="compact"><span slot="actions"><jarvis-button size="sm" variant="ghost">Undo</jarvis-button></span>Workspace changes are live.</jarvis-toast>`;
  }

  if (component.tag === 'jarvis-action-sheet') {
    return `<jarvis-action-sheet open heading="Choose action" description="Action sheets bundle task-specific commands and keep destructive actions clearly separated." width="24rem" value="Review/Request approval" items="Communication/Call||default|Start a voice call.; Communication/Send message||default|Open the threaded composer.; Review/Request approval||success|Notify approvers.; Review/Export summary||default|Send a shareable recap.; Danger/Delete draft||danger|This cannot be undone."></jarvis-action-sheet>`;
  }

  if (component.tag === 'jarvis-tab-panel') {
    return `<jarvis-tab-panel items="Not started,Help needed,In progress,Deferred,Completed" current="2" tab-position="left" show-nav-buttons loop height="24rem" badges="3,1,8,2,0" disabled-tabs="Deferred"></jarvis-tab-panel>`;
  }

  if (component.tag === 'jarvis-splitter') {
    return `<jarvis-splitter position="32" step="4" keyboard-resize-step="8" collapsible start-label="Navigation pane" end-label="Editor pane"><jarvis-surface slot="start"><jarvis-stack><strong>Left pane</strong><p>Navigation and filters live here.</p></jarvis-stack></jarvis-surface><jarvis-surface slot="end"><jarvis-stack><strong>Right pane</strong><p>Main content stretches in the remaining area.</p></jarvis-stack></jarvis-surface></jarvis-splitter>`;
  }

    if (component.tag === 'jarvis-resizable') {
      return `<jarvis-resizable width="420" height="260" handles="right bottom" step="12" show-size-label><jarvis-surface><jarvis-stack><strong>Resizable panel</strong><p>Drag the handles to resize this surface.</p></jarvis-stack></jarvis-surface></jarvis-resizable>`;
    }

    if (component.tag === 'jarvis-floating-action-button') {
      return `<div style="display:grid;gap:1rem;"><jarvis-floating-action-button position="inline" extended label="Add row" aria-description="Inline launcher with described follow-up actions." items="New row~Insert a row beneath the active one.|row|success; Invite teammate~Send an access invite to a collaborator.|invite; Duplicate report~Clone the active workspace card.|duplicate"></jarvis-floating-action-button><jarvis-floating-action-button position="inline" label="Compose" direction="right" close-on-select="false" items="Email~Open the email composer.|email; Message~Send a quick chat ping.|message; Delete draft~Remove the current draft.|delete|danger"></jarvis-floating-action-button></div>`;
    }

    if (component.tag === 'jarvis-sortable') {
      return `<jarvis-sortable compact columns="Backlog,Ready,Review,Done" empty-column-text="Queue is clear" items="Backlog/Write launch brief|Olivia Peyton|success; Ready/Prep stakeholder deck|Victor Norris|warning; Review/Confirm launch date|Maya Chen|danger"></jarvis-sortable>`;
    }

    if (component.tag === 'jarvis-tile-view') {
      return `<jarvis-tile-view items="Launch prep|Campaign command room|#dbeafe,#60a5fa|2x1|Featured; North Campus|Innovation lab|#e0f2fe,#38bdf8|1x1|Live; Legacy archive|Read-only records|#e2e8f0,#94a3b8|1x1|Archived|disabled" read-only></jarvis-tile-view>`;
    }

    if (component.tag === 'jarvis-chip') {
      return `<div class="pill-row"><jarvis-chip>Platform</jarvis-chip><jarvis-chip removable>Selected filter</jarvis-chip></div>`;
    }

  if (component.tag === 'jarvis-toolbar') {
    return `<div style="display:grid;gap:1rem;"><jarvis-toolbar dividers sticky justify="space-between" aria-description="Workspace command bar with back, status, and publish actions."><jarvis-button slot="start" variant="ghost">Back</jarvis-button><jarvis-badge>Live</jarvis-badge><jarvis-button slot="end">Publish</jarvis-button></jarvis-toolbar><jarvis-toolbar density="compact" justify="start" wrap="false" aria-description="Compact command row for dense utility actions."><jarvis-button slot="start" variant="ghost">Refresh</jarvis-button><jarvis-chip>Compact</jarvis-chip><jarvis-button variant="ghost">Export</jarvis-button><jarvis-button slot="end" variant="outline">Share</jarvis-button></jarvis-toolbar></div>`;
  }

  if (component.tag === 'jarvis-section') {
    return `<jarvis-section heading="Team settings" description="Keep related controls grouped with a clear title."><jarvis-button slot="actions" variant="outline">Manage</jarvis-button><jarvis-stack><jarvis-input label="Workspace name"></jarvis-input><jarvis-switch label="Enable alerts"></jarvis-switch></jarvis-stack></jarvis-section>`;
  }

  if (component.tag === 'jarvis-input') {
    return `<jarvis-input label="Email" helpText="We only use this for account updates." show-clear-button></jarvis-input>`;
  }

  if (component.tag === 'jarvis-textarea') {
    return `<jarvis-textarea label="Notes" helpText="Capture the important follow-up details." auto-resize max-length="240" show-count></jarvis-textarea>`;
  }

  if (component.tag === 'jarvis-checkbox') {
    return `<jarvis-checkbox label="I agree to the terms" checked required help-text="You must acknowledge the terms before continuing."></jarvis-checkbox>`;
  }

  if (component.tag === 'jarvis-switch') {
    return `<jarvis-switch label="Enable notifications" checked show-text on-text="On" off-text="Off" help-text="Immediate toggles should communicate their effect without extra explanation."></jarvis-switch>`;
  }

  if (component.tag === 'jarvis-dialog') {
    return `<jarvis-dialog open label="Confirm deletion" heading="Delete item" description="Use dialog for compact confirmation and focused review steps." initial-focus="close"><p>This action cannot be undone.</p><div slot="footer"><jarvis-button variant="outline">Cancel</jarvis-button><jarvis-button>Delete</jarvis-button></div></jarvis-dialog>`;
  }

  return `<${component.tag}>${titleCase(component.name)}</${component.tag}>`;
}

function indentBlock(value: string, spaces = 2): string {
  const indent = ' '.repeat(spaces);
  return value
    .trim()
    .split('\n')
    .map((line) => `${indent}${line}`)
    .join('\n');
}

function createFrameworkExamples(_component: ComponentManifestEntry, markup: string) {
  const html = markup.trim();

  return {
    web: html,
    react: `import { useEffect } from 'react';
import { ensureJarvisReact } from '@jarvis/react';

export function Example() {
  useEffect(() => {
    ensureJarvisReact();
  }, []);

  return (
    <>
${indentBlock(html, 6)}
    </>
  );
}`,
    angular: `import { Component } from '@angular/core';
import { ensureJarvisAngular } from '@jarvis/angular';

ensureJarvisAngular();

@Component({
  selector: 'app-example',
  standalone: true,
  template: \`
${indentBlock(html, 4)}
  \`
})
export class ExampleComponent {}`,
    vue: `<script setup lang="ts">
import { ensureJarvisVue } from '@jarvis/vue';

ensureJarvisVue();
</script>

<template>
${indentBlock(html, 2)}
</template>`
  };
}

function createPlaygroundId(component: ComponentManifestEntry): string {
  return component.tag.replace(/[^a-z0-9-]/gi, '-');
}

function createThemeShowcaseMarkup(component: ComponentManifestEntry): string {
  const galleryItem = createVariantGallery(component)[0];
  return galleryItem?.markup ?? createDefaultExample(component);
}

function createContextualExample(component: ComponentManifestEntry, markup: string): { title: string; markup: string } {
  const contextLabel =
    component.category === 'forms'
      ? 'Inside a settings form'
      : component.category === 'navigation'
        ? 'Inside a workspace shell'
        : component.category === 'overlays'
          ? 'Anchored to surrounding content'
          : component.category === 'feedback'
            ? 'On a composed surface'
            : component.category === 'layout'
              ? 'Inside a composed layout'
              : 'In context';

  return {
    title: contextLabel,
    markup: `<div style="display:grid;gap:0.85rem;align-items:start;">
  <div style="font-size:0.76rem;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;font-weight:700;">${escapeHtml(contextLabel)}</div>
  <div>${markup}</div>
  <p style="margin:0;color:#64748b;">Use ${escapeHtml(component.name)} where its semantics stay clear and the surrounding layout gives it room to breathe.</p>
</div>`
  };
}

function ensureGalleryDepth(component: ComponentManifestEntry, items: Array<{ title: string; markup: string }>) {
  return items.length >= 2 ? items : [...items, createContextualExample(component, items[0]?.markup ?? createDefaultExample(component))];
}

function renderCodeTabs(
  id: string,
  codes: ReturnType<typeof createFrameworkExamples>,
  options: { loadTarget?: string; loadLabel?: string } = {}
): string {
  const tabs: Array<{ key: keyof typeof codes; label: string }> = [
    { key: 'web', label: 'Web Components' },
    { key: 'react', label: 'React' },
    { key: 'angular', label: 'Angular' },
    { key: 'vue', label: 'Vue' }
  ];

  return `<section class="code-tabs" data-code-tabs="${id}" data-default-tab="web">
    <div class="code-tabs-header">
      <div class="code-tab-list" role="tablist" aria-label="Code examples">
        ${tabs
          .map(
            (tab) => `<button class="code-tab" type="button" role="tab" aria-selected="false" data-code-tab="${tab.key}">
              ${tab.label}
            </button>`
          )
          .join('')}
      </div>
      <div class="code-tab-actions">
        ${
          options.loadTarget
            ? `<button class="code-action" type="button" data-load-example-editor="${options.loadTarget}" data-example-source="${id}">
                ${escapeHtml(options.loadLabel ?? 'Load into editor')}
              </button>`
            : ''
        }
        <button class="code-action" type="button" data-code-copy="${id}">Copy code</button>
      </div>
    </div>
    ${tabs
      .map(
        (tab) => `<pre data-code-panel="${tab.key}"><code>${escapeHtml(codes[tab.key])}</code></pre>`
      )
      .join('')}
  </section>
  <textarea hidden data-example-markup="${id}">${escapeHtml(codes.web)}</textarea>`;
}

function renderExampleCard(
  component: ComponentManifestEntry,
  item: { title: string; markup: string },
  editorId: string,
  index: number
): string {
  const exampleId = `${component.tag}-example-${index}`;
  const codes = createFrameworkExamples(component, item.markup);

  return `<article class="example-card">
    <div class="example-card-head">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <p>Preview the component, inspect the code in different stacks, and load the exact markup into the live editor below.</p>
      </div>
      <div class="editor-actions">
        <button class="toolbar-button" type="button" data-load-example-editor="${editorId}" data-example-source="${exampleId}">
          Load into editor
        </button>
      </div>
    </div>
    <div class="preview example-stage">
      <div class="preview-render preview-render-flow">${item.markup}</div>
    </div>
    ${renderCodeTabs(exampleId, codes, { loadTarget: editorId, loadLabel: 'Load this example' })}
  </article>`;
}

function renderEditor(markup: string, id: string): string {
  return `<section class="panel" id="playground">
    <div class="section-head">
      <div>
        <p class="eyebrow">Edit and play</p>
        <h2>Run the component code live</h2>
        <p>Use the example cards above to load real scenarios, edit the markup here, and re-run the preview instantly.</p>
      </div>
      <div class="editor-actions">
        <button class="toolbar-button" type="button" data-editor-run="${id}">Run</button>
        <button class="toolbar-button" type="button" data-editor-reset="${id}">Reset</button>
        <button class="toolbar-button" type="button" data-editor-copy="${id}">Copy</button>
      </div>
    </div>
    <div class="editor-layout">
      <div class="preview">
        <div class="preview-render preview-render-stage live-preview" data-playground-output="${id}">${markup}</div>
      </div>
      <div class="editor-pane">
        <div class="code-pane-head">
          <strong>Web Components markup</strong>
          <span class="quiet">Paste any Jarvis markup here, then run it.</span>
        </div>
        <div class="monaco-banner" data-playground-editor-label="${id}">Monaco editor loading...</div>
        <div class="code-editor-monaco" data-playground-editor="${id}"></div>
        <textarea class="code-editor-fallback" spellcheck="false" data-playground-editor-fallback="${id}">${escapeHtml(markup)}</textarea>
      </div>
    </div>
  </section>`;
}

function renderPlaygroundCard(component: ComponentManifestEntry, markup: string, sourceId: string): string {
  return `<article
    class="option-card playground-component-card"
    data-playground-card
    data-playground-tag="${component.tag}"
    data-playground-category="${escapeHtml(component.category)}"
    data-playground-name="${escapeHtml(component.name)}"
    data-playground-description="${escapeHtml(component.description)}"
  >
    <strong>${escapeHtml(titleCase(component.name))}</strong>
    <p class="quiet">${escapeHtml(component.description)}</p>
    <div class="preview option-preview">
      <div class="preview-render preview-render-flow">${markup}</div>
    </div>
    <div class="editor-actions playground-card-actions">
      <button class="toolbar-button" type="button" data-load-example-editor="global-playground" data-example-source="${sourceId}">
        Load this component into playground
      </button>
    </div>
    <textarea hidden data-example-markup="${sourceId}">${escapeHtml(markup)}</textarea>
  </article>`;
}

function renderThemeComparison(markup: string): string {
  const families: Array<{ name: 'generic' | 'material' | 'fluent'; label: string }> = [
    { name: 'generic', label: 'Generic' },
    { name: 'material', label: 'Material' },
    { name: 'fluent', label: 'Fluent' }
  ];

  return `<section class="panel" id="themes">
    <div class="section-head">
      <div>
        <p class="eyebrow">Theme behavior</p>
        <h2>Compare the same component across theme families</h2>
      </div>
    </div>
    <div class="grid cards">
      ${families
        .map(
          (family) => `<article class="option-card">
            <strong>${family.label}</strong>
            <div class="preview theme-preview" data-theme-family="${family.name}" data-theme="light" data-density="comfortable">
              <div class="preview-render">${markup}</div>
            </div>
          </article>`
        )
        .join('')}
    </div>
  </section>`;
}

function renderSpec(component: ComponentManifestEntry): string {
  const spec = component.spec;
  const visualAnatomy = spec?.visualAnatomy ?? component.anatomy;
  const variants = spec?.variants ?? deriveOptions(component.props).map((option) => option.split(':')[0]);
  const sizes = spec?.sizes ?? [];
  const states = spec?.states?.length ? spec.states : deriveStates(component.props);
  const interactions = spec?.interactions ?? [];
  const accessibilityNotes = [...(spec?.accessibilityNotes ?? []), ...component.accessibility];
  const responsiveNotes = [...(spec?.responsiveNotes ?? []), ...component.responsive];
  const themeBehavior = spec?.themeBehavior;
  const parity = spec?.devexpressParity ?? [];
  const doUse = component.compositionRules.length ? component.compositionRules : [`Use ${component.name} when its interaction model matches the task.`];
  const avoidUse = component.antiPatterns.length
    ? component.antiPatterns
    : ['Avoid this control when the interaction would conflict with existing platform conventions.'];

  const specStatus = spec ? 'Spec coverage from metadata package' : 'Spec coverage generated from manifest properties';

  return `<section class="panel" id="specs">
    <div class="section-head">
      <div>
        <p class="eyebrow">Component spec</p>
        <h2>${escapeHtml(specStatus)}</h2>
      </div>
    </div>
    <div class="spec-summary">
      <article class="option-card">
        <strong>Use when</strong>
        ${renderRows(doUse, 'No explicit usage guidance documented yet.')}
      </article>
      <article class="option-card">
        <strong>Avoid when</strong>
        ${renderRows(avoidUse, 'No anti-pattern guidance documented yet.')}
      </article>
    </div>
    <div class="mini-grid">
      <div class="option-card"><strong>Visual anatomy</strong>${renderPills(visualAnatomy, 'No anatomy notes documented yet.')}</div>
      <div class="option-card"><strong>Variants</strong>${renderPills(variants, 'No variants documented yet.')}</div>
      <div class="option-card"><strong>Sizes</strong>${renderPills(sizes, 'No sizes documented yet.')}</div>
      <div class="option-card"><strong>States</strong>${renderRows(states, 'No states documented yet.')}</div>
      <div class="option-card"><strong>Interactions</strong>${renderRows(interactions, 'No interaction notes documented yet.')}</div>
      <div class="option-card"><strong>Related / follow-up components</strong>${renderRows(component.related, 'No related components documented yet.')}</div>
    </div>
    <div class="split">
      <article class="option-card">
        <strong>Accessibility baseline</strong>
        ${renderRows(accessibilityNotes, 'No accessibility notes documented yet.')}
      </article>
      <article class="option-card">
        <strong>Responsive baseline</strong>
        ${renderRows(responsiveNotes, 'No responsive notes documented yet.')}
      </article>
    </div>
    <div class="grid cards" style="margin-top:0.75rem;">
      <article class="option-card">
        <strong>DevExpress-style parity goals</strong>
        ${renderRows(parity, 'No parity goals documented yet.')}
      </article>
      <article class="option-card">
        <strong>Generic theme</strong>
        ${renderRows(themeBehavior?.generic ?? [], 'No Generic theme notes documented yet.')}
      </article>
      <article class="option-card">
        <strong>Material theme</strong>
        ${renderRows(themeBehavior?.material ?? [], 'No Material theme notes documented yet.')}
      </article>
      <article class="option-card">
        <strong>Fluent theme</strong>
        ${renderRows(themeBehavior?.fluent ?? [], 'No Fluent theme notes documented yet.')}
      </article>
    </div>
  </section>`;
}

async function loadStaticAsset(pathname: string): Promise<{ body: Buffer; contentType: string } | null> {
  if (!pathname.startsWith('/jarvis-dist/')) {
    return null;
  }

  const relativePath = pathname.replace('/jarvis-dist/', '');
  const filePath = resolve(process.cwd(), '../../packages/jarvis-core/dist', relativePath);
  const body = await readFile(filePath);
  const extension = extname(filePath);
  const contentType =
    extension === '.js'
      ? 'text/javascript; charset=utf-8'
      : extension === '.css'
        ? 'text/css; charset=utf-8'
        : extension === '.json'
          ? 'application/json; charset=utf-8'
          : 'application/octet-stream';

  return { body, contentType };
}

function createVariantGallery(component: ComponentManifestEntry): Array<{ title: string; markup: string }> {
  const manifestItems = dedupeGalleryItems(deriveManifestExamples(component));
  const manualItems = (() => {
    switch (component.tag) {
    case 'jarvis-button':
      return [
        { title: 'Variants', markup: `<div class="pill-row"><jarvis-button variant="solid">Primary</jarvis-button><jarvis-button variant="outline">Secondary</jarvis-button><jarvis-button variant="ghost">Ghost</jarvis-button></div>` },
        { title: 'States', markup: `<div class="pill-row"><jarvis-button>Default</jarvis-button><jarvis-button loading>Loading</jarvis-button><jarvis-button disabled>Disabled</jarvis-button></div>` }
      ];
    case 'jarvis-icon-button':
      return [
        { title: 'Sizes', markup: `<div class="pill-row"><jarvis-icon-button size="sm" label="Small action">+</jarvis-icon-button><jarvis-icon-button size="md" label="Medium action">+</jarvis-icon-button><jarvis-icon-button size="lg" label="Large action">+</jarvis-icon-button></div>` },
        { title: 'States', markup: `<div class="pill-row"><jarvis-icon-button label="Default action">+</jarvis-icon-button><jarvis-icon-button loading label="Loading action"></jarvis-icon-button><jarvis-icon-button disabled label="Disabled action">+</jarvis-icon-button></div>` }
      ];
    case 'jarvis-input':
      return [
        { title: 'Field states', markup: `<div class="grid cards"><jarvis-input label="Email" value="hello@jarvis.dev"></jarvis-input><jarvis-input label="Search" placeholder="Find a component"></jarvis-input><jarvis-input label="Required" required help-text="This field is required."></jarvis-input><jarvis-input label="Invalid" invalid error-text="Please enter a valid value."></jarvis-input></div>` },
        { title: 'Clear, password reveal, and character count', markup: `<div class="grid cards"><jarvis-input label="Clearable search" value="Design system" show-clear-button></jarvis-input><jarvis-input label="Password" type="password" value="hunter2" show-reveal-button></jarvis-input><jarvis-input label="Workspace name" value="Jarvis Enterprise Platform" max-length="32" show-count></jarvis-input></div>` },
        { title: 'Readonly and message patterns', markup: `<div class="grid cards"><jarvis-input label="Readonly email" value="ops@jarvis.dev" read-only></jarvis-input><jarvis-input label="Recovery email" value="" show-clear-button invalid error-text="Add a backup email before you continue."></jarvis-input></div>` },
        { title: 'Credentials step before final review', markup: `<div class="grid cards"><jarvis-surface><jarvis-stack gap="1rem"><strong>Credentials</strong><jarvis-input label="Email" value="owner@jarvis.dev" required help-text="Used for release and recovery updates." show-clear-button></jarvis-input><jarvis-input label="Password" type="password" value="strong-password" required></jarvis-input><jarvis-input label="Confirm password" type="password" value="short" invalid error-text="Confirmation must match the original password."></jarvis-input><jarvis-button>Continue to review</jarvis-button></jarvis-stack></jarvis-surface></div>` }
      ];
    case 'jarvis-textarea':
      return [
        { title: 'Multiline states', markup: `<div class="grid cards"><jarvis-textarea label="Default mode" value="Prepare launch notes and share the meeting summary."></jarvis-textarea><jarvis-textarea label="Invalid notes" invalid error-text="A written explanation is required."></jarvis-textarea></div>` },
        { title: 'Auto resize and character count', markup: `<div class="grid cards"><jarvis-textarea label="Executive summary" value="Prepare the final rollout memo and include the validation checkpoints for design, engineering, and support." auto-resize max-length="220" show-count></jarvis-textarea><jarvis-textarea label="Readonly transcript" value="This text area is locked for audit review." read-only></jarvis-textarea></div>` },
        { title: 'Reviewer notes in a submit workflow', markup: `<div class="grid cards"><jarvis-surface><jarvis-stack gap="1rem"><strong>Release notes</strong><jarvis-textarea label="Summary for approvers" auto-resize value="Localization is complete and analytics have been verified on staging." help-text="Keep the first paragraph short so a review popup can reuse it."></jarvis-textarea><jarvis-textarea label="Required implementation note" invalid error-text="Document the rollback plan before requesting approval."></jarvis-textarea></jarvis-stack></jarvis-surface></div>` }
      ];
    case 'jarvis-checkbox':
      return [
        { title: 'Checked, mixed, and invalid', markup: `<div class="grid cards"><jarvis-checkbox label="Checked" checked></jarvis-checkbox><jarvis-checkbox label="Indeterminate" indeterminate help-text="Use mixed state when a nested list is only partially selected."></jarvis-checkbox><jarvis-checkbox label="Invalid" invalid error-text="A consent choice is required."></jarvis-checkbox></div>` },
        { title: 'Three-state, required, and readonly', markup: `<div class="grid cards"><jarvis-checkbox label="Required consent" required help-text="Confirm this before we submit the request."></jarvis-checkbox><jarvis-checkbox label="Three-state workflow" three-state indeterminate></jarvis-checkbox><jarvis-checkbox label="Readonly acceptance" checked read-only help-text="This acceptance was locked after approval."></jarvis-checkbox></div>` },
        { title: 'Size and label position options', markup: `<div class="grid cards"><jarvis-checkbox label="Small option" size="sm"></jarvis-checkbox><jarvis-checkbox label="Medium option" size="md" checked></jarvis-checkbox><jarvis-checkbox label="Large option" size="lg" checked label-position="start"></jarvis-checkbox></div>` }
      ];
    case 'jarvis-radio':
      return [
        { title: 'Single radio with helper text', markup: `<div class="grid cards"><jarvis-radio label="Primary contact" name="contact-choice" value="primary" checked help-text="Use a single radio when the surrounding copy already explains the selection context."></jarvis-radio><jarvis-radio label="Readonly choice" name="locked-choice" value="locked" checked read-only help-text="This answer was locked after approval."></jarvis-radio></div>` },
        { title: 'Required and invalid radios', markup: `<div class="grid cards"><jarvis-radio label="Required approval" name="approval-choice" value="approved" required help-text="Choose whether this change is approved."></jarvis-radio><jarvis-radio label="Invalid radio choice" name="audit-choice" value="audit" invalid error-text="Pick a compliant option before continuing."></jarvis-radio></div>` }
      ];
    case 'jarvis-switch':
      return [
        { title: 'On, off, and disabled', markup: `<div class="grid cards"><jarvis-switch label="Switched on" checked></jarvis-switch><jarvis-switch label="Switched off"></jarvis-switch><jarvis-switch label="Disabled" checked disabled></jarvis-switch></div>` },
        { title: 'Track text and sizing', markup: `<div class="grid cards"><jarvis-switch label="Live updates" checked show-text on-text="Live" off-text="Idle"></jarvis-switch><jarvis-switch label="Compact mode" size="sm" show-text></jarvis-switch><jarvis-switch label="Executive mode" size="lg" checked show-text label-position="start"></jarvis-switch></div>` },
        { title: 'Readonly, helper, and validation', markup: `<div class="grid cards"><jarvis-switch label="Readonly automation" checked read-only show-text on-text="Auto" off-text="Manual" help-text="This automation is locked by policy."></jarvis-switch><jarvis-switch label="Validation and helper text" required invalid error-text="Choose whether notifications are enabled."></jarvis-switch></div>` }
      ];
    case 'jarvis-select':
      return [
        { title: 'Select states', markup: `<div class="grid cards"><jarvis-select label="Role" options="Admin,Editor,Viewer"></jarvis-select><jarvis-select label="Required" required options="One,Two,Three"></jarvis-select><jarvis-select label="Invalid" invalid error-text="Choose a value." options="One,Two,Three"></jarvis-select></div>` }
      ];
    case 'jarvis-alert':
      return [
        { title: 'Tones', markup: `<div class="grid cards"><jarvis-alert tone="neutral" heading="Neutral">General guidance.</jarvis-alert><jarvis-alert tone="success" heading="Success">Changes saved.</jarvis-alert><jarvis-alert tone="warning" heading="Warning">Review your configuration.</jarvis-alert><jarvis-alert tone="danger" heading="Danger" polite="assertive">Something went wrong.</jarvis-alert></div>` }
      ];
    case 'jarvis-chip':
      return [
        { title: 'Static and removable', markup: `<div class="pill-row"><jarvis-chip>Platform</jarvis-chip><jarvis-chip removable>Selected filter</jarvis-chip><jarvis-chip removable>Assigned</jarvis-chip></div>` }
      ];
    case 'jarvis-avatar':
      return [
        { title: 'Initials fallback', markup: `<div class="grid cards"><jarvis-avatar name="Priya Nair"></jarvis-avatar><jarvis-avatar name="Design Ops"></jarvis-avatar><jarvis-avatar name="QA Team"></jarvis-avatar><jarvis-avatar name="Long Name Here" size="lg"></jarvis-avatar></div>` },
        { title: 'Image and fallback mix', markup: `<div class="grid cards"><jarvis-avatar size="sm" name="Nora Wells" src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=200&q=80"></jarvis-avatar><jarvis-avatar size="sm" name="Mia Chen" src=""></jarvis-avatar><jarvis-avatar size="lg" name="Ops Desk" src="https://images.unsplash.com/photo-1521577352947-9bb587dbecbd?auto=format&fit=crop&w=300&q=80"></jarvis-avatar></div>` }
      ];
    case 'jarvis-card':
      return [
        { title: 'Slots and hierarchy', markup: `<jarvis-card><div slot="header"><strong>Release review</strong></div><p>Use card headers for quick scan and footer for primary action.</p><div slot="footer"><jarvis-button size="sm" variant="outline">Start review</jarvis-button></div></jarvis-card>` },
        { title: 'Surface within grid', markup: `<div class="grid cards"><jarvis-card><div slot="header"><strong>Ops dashboard</strong></div><jarvis-stack gap="0.65rem"><p>Keep each card focused. Use compact spacing to preserve rhythm in long lists.</p><jarvis-badge tone="success">Healthy</jarvis-badge></jarvis-stack><div slot="footer"><jarvis-button size="sm">Open</jarvis-button></div></jarvis-card><jarvis-card><div slot="header"><strong>Risk register</strong></div><p>Store related metadata and actions together.</p><div slot="footer"><jarvis-button size="sm" variant="ghost">View details</jarvis-button></div></jarvis-card></div>` }
      ];
    case 'jarvis-divider':
      return [
        { title: 'Horizontal separators', markup: `<div class="grid cards"><p>Context before divider</p><jarvis-divider></jarvis-divider><p>Context after divider</p><jarvis-divider></jarvis-divider><p>Last block</p></div>` },
        { title: 'Vertical divider in header rows', markup: `<div style="display:grid;grid-template-columns:auto 1px auto 1px auto;align-items:center;justify-content:center;gap:1.1rem;min-height:4.5rem"><div>Design</div><jarvis-divider orientation="vertical"></jarvis-divider><div>Engineering</div><jarvis-divider orientation="vertical"></jarvis-divider><div>Ops</div></div>` }
      ];
    case 'jarvis-empty-state':
      return [
        { title: 'Search empty state', markup: `<jarvis-empty-state heading="No results" description="Try a broader term or clear all filters."><span slot="visual">🔍</span><div slot="actions"><jarvis-button variant="outline">Clear filters</jarvis-button><jarvis-button>Try again</jarvis-button></div></jarvis-empty-state>` },
        { title: 'Upload empty state', markup: `<jarvis-empty-state heading="No files yet" description="Add files to begin your submission packet." ><span slot="visual">📂</span><div slot="actions"><jarvis-button>Upload first file</jarvis-button></div></jarvis-empty-state>` }
      ];
    case 'jarvis-accordion':
      return [
        { title: 'Single and stacked disclosures', markup: `<div class="grid cards"><jarvis-accordion summary="Advanced settings"><p>Use accordion for secondary content that can stay collapsed by default.</p></jarvis-accordion><jarvis-accordion items="Workspace defaults|Control the base workspace experience and save preferred launch views.|; Notifications|Route alerts by priority, owner, and working hours.|; Escalations|Choose who gets paged after hours and which channels stay enabled.|" value="Workspace defaults"></jarvis-accordion></div>` },
        { title: 'Multiple and readonly behavior', markup: `<div class="grid cards"><jarvis-accordion items="Brand tone|Choose how editorial UI voice is framed for this release.|; Access review|Confirm reviewer coverage before launch.|; Escalation path|Document after-hours ownership and routing.|" multiple value="Brand tone;Access review"></jarvis-accordion><jarvis-accordion items="Policy summary|This disclosure is locked after handoff.|; Audit history|Change history stays visible but stays read-only after policy review.|" read-only value="Policy summary"></jarvis-accordion></div>` }
      ];
    case 'jarvis-stack':
      return [
        { title: 'Spacing and alignment options', markup: `<jarvis-stack gap="0.75rem" align="start"><jarvis-badge>Start aligned</jarvis-badge><jarvis-input label="Workspace name" value="Operations"></jarvis-input><jarvis-button>Continue</jarvis-button></jarvis-stack>` },
        { title: 'Compact and compact center flow', markup: `<jarvis-stack gap="0.5rem" align="center"><jarvis-badge>Compact</jarvis-badge><jarvis-chip>Ready</jarvis-chip><jarvis-button size="sm" variant="ghost">Next</jarvis-button></jarvis-stack>` }
      ];
    case 'jarvis-grid':
      return [
        { title: 'Adaptive two-column cards', markup: `<jarvis-grid min="12rem" gap="1rem"><jarvis-surface><jarvis-stack><strong>A</strong><p>Responsive cells adapt to available width.</p></jarvis-stack></jarvis-surface><jarvis-surface><jarvis-stack><strong>B</strong><p>Use grids for dashboards and option clusters.</p></jarvis-stack></jarvis-surface><jarvis-surface><jarvis-stack><strong>C</strong><p>Each cell stays consistent in rhythm.</p></jarvis-stack></jarvis-surface><jarvis-surface><jarvis-stack><strong>D</strong><p>Add spacing control through density tokens.</p></jarvis-stack></jarvis-surface></jarvis-grid>` },
        { title: 'Dense, narrow cards', markup: `<jarvis-grid min="8rem" gap="0.8rem"><jarvis-card><div slot="header"><strong>Step 1</strong></div><p>Collect</p></jarvis-card><jarvis-card><div slot="header"><strong>Step 2</strong></div><p>Validate</p></jarvis-card><jarvis-card><div slot="header"><strong>Step 3</strong></div><p>Publish</p></jarvis-card></jarvis-grid>` }
      ];
    case 'jarvis-popover':
      return [
        { title: 'Anchored details and side placement', markup: `<div class="grid cards"><jarvis-popover trigger-label="Review details" heading="Workspace summary" description="Quick context for reviewers" width="18rem"><jarvis-stack><p>Use a popover when people need lightweight context without leaving the current surface.</p><jarvis-button variant="outline">Open workspace</jarvis-button></jarvis-stack></jarvis-popover><jarvis-popover trigger-label="Open side note" placement="right" heading="Shipping guidance" description="Shown beside the trigger for dense forms."><p>Right placement keeps secondary details close to the field that needs them.</p></jarvis-popover></div>` },
        { title: 'Hover trigger and compact action card', markup: `<div class="grid cards"><jarvis-popover trigger-label="Hover preview" trigger-mode="hover" heading="Release note" description="A lightweight preview surface."><p>Use hover only when the trigger is obvious and the content stays short.</p></jarvis-popover><jarvis-popover trigger-label="Quiet card" placement="left" width="16rem" heading="Reviewer note"><p>Use a compact anchored card when the content stays short but needs more presence than a tooltip.</p></jarvis-popover></div>` }
      ];
    case 'jarvis-dropdown-menu':
      return [
        { title: 'Grouped actions, descriptions, and danger states', markup: `<div class="grid cards"><jarvis-dropdown-menu label="More actions" items="Workspace/Edit|edit||Update the current workspace details.; Workspace/Duplicate|duplicate||Create a copy for experimentation.; Reviews/Archive|archive||Move this workspace to the archive.; Reviews/Delete|delete|danger|This action cannot be undone." show-selection value="duplicate"></jarvis-dropdown-menu><jarvis-dropdown-menu label="Hover actions" trigger-mode="hover" placement="top-end" items="Customer message/Reply|reply||Send a quick response.; Customer message/Assign owner|assign||Route the thread to another owner.; Customer message/Close ticket|close|danger|Close the open support request."></jarvis-dropdown-menu></div>` },
        { title: 'Selection and empty fallback', markup: `<div class="grid cards"><jarvis-dropdown-menu label="Current status" items="Status/In review|review||Currently being reviewed.; Status/Approved|approved||Ready to publish.; Status/On hold|hold||Waiting on dependencies." show-selection value="approved"></jarvis-dropdown-menu><jarvis-dropdown-menu label="Empty state" no-data-text="No contextual actions are available right now."></jarvis-dropdown-menu></div>` }
      ];
    case 'jarvis-tooltip':
      return [
        { title: 'Hover, focus, and click tooltips', markup: `<div class="grid cards"><jarvis-tooltip text="Helpful supporting text" position="top"><jarvis-button variant="outline">Hover trigger</jarvis-button></jarvis-tooltip><jarvis-tooltip text="Keyboard users see this on focus." trigger-mode="focus" position="right"><jarvis-button variant="ghost">Focus trigger</jarvis-button></jarvis-tooltip><jarvis-tooltip text="Click again or press Escape to close." trigger-mode="click" position="bottom"><jarvis-button>Click trigger</jarvis-button></jarvis-tooltip></div>` },
        { title: 'Arrow, width, and interactive content', markup: `<div class="grid cards"><jarvis-tooltip text="Short status tooltip." position="left"><jarvis-chip>With arrow</jarvis-chip></jarvis-tooltip><jarvis-tooltip heading="Inline guidance" trigger-mode="click" interactive max-width="24rem" position="bottom"><jarvis-button variant="outline">Interactive tooltip</jarvis-button><div slot="content" style="display:grid;gap:0.55rem;"><p style="margin:0;">Use click-triggered tooltips when the guidance needs one extra action without becoming a full popover.</p><jarvis-button variant="ghost">Review checklist</jarvis-button></div></jarvis-tooltip></div>` }
      ];
    case 'jarvis-button-group':
      return [
        { title: 'Single and multiple selection', markup: `<div class="grid cards"><jarvis-button-group label="Status" items="Normal~Default row state; Success~Positive completion state|success; Default~Balanced fallback option; Danger~Use carefully|danger" value="Default"></jarvis-button-group><jarvis-button-group label="Text alignment" items="Left~Primary reading edge; Center~Balanced layouts; Right~Edge anchored notes; Justify~Long-form paragraphs" selection-mode="multiple" value="Left,Center"></jarvis-button-group></div>` },
        { title: 'Vertical, invalid, and readonly states', markup: `<div class="grid cards"><jarvis-button-group label="Publishing stage" items="Draft~Work in progress; Review~Needs sign-off; Publish~Goes live after approval; Archive~Hidden from public listings|archive|disabled" orientation="vertical" value="Review" help-text="Choose the next lifecycle state."></jarvis-button-group><jarvis-button-group label="Review mode" items="Primary~Default view; Secondary~Support context; Locked~Audit-only state|locked|disabled" value="Primary" read-only aria-description="Selection is locked while the audit is open."></jarvis-button-group><jarvis-button-group label="Required justification" items="Keep open~Continue work this sprint; Pause~Revisit next sprint; Close~No further action|danger" invalid error-text="Choose the resolution path before closing the issue."></jarvis-button-group></div>` }
      ];
    case 'jarvis-menu':
      return [
        { title: 'Catalog and nested navigation', markup: `<div style="display:grid;gap:1rem;"><jarvis-menu aria-label="Catalog menu" items="Catalog/Video players/HD Video Player~Best for compact rooms; Catalog/Video players/SuperHD Video Player~Cinematic upgrade; Catalog/Televisions/SuperLCD 42~Backordered this month|disabled; Catalog/Televisions/SuperLED 50~Flagship showroom panel; Catalog/Monitors/DesktopLCD 19~Desk-ready setup; Catalog/Projectors/Projector Plus~Boardroom optics" orientation="horizontal" trigger-mode="click" show-first-submenu-mode="hover" value="Catalog/Televisions/SuperLED 50"></jarvis-menu><jarvis-surface elevated><jarvis-stack><strong>Hover-first product browse</strong><p>Open the first submenu on hover while preserving click selection for deliberate navigation.</p></jarvis-stack></jarvis-surface></div>` },
        { title: 'Vertical command rail', markup: `<div style="display:grid;grid-template-columns:minmax(14rem,16rem) minmax(0,1fr);gap:1rem;align-items:start;"><jarvis-menu aria-label="Workspace rail" items="Workspace/Overview~Live dashboard; Workspace/Members~32 collaborators; Workspace/Billing~Invoices and plans; Reports/Sales/Daily~Updated hourly; Reports/Sales/Weekly~Board review ready; Reports/Inventory/Reorder list~2 suppliers pending|disabled; Settings/Security~MFA enforced; Settings/Delete workspace~Requires owner approval|danger" orientation="vertical" trigger-mode="click" close-on-mouse-leave value="Reports/Sales/Weekly"></jarvis-menu><jarvis-surface elevated><jarvis-stack><strong>Command details</strong><p>Use a left rail when submenu density matters more than horizontal scanning and collapse flyouts when the user leaves the rail.</p><jarvis-button variant="outline">Review weekly sales</jarvis-button></jarvis-stack></jarvis-surface></div>` },
        { title: 'Selection indicators and hidden descriptions', markup: `<div style="display:grid;grid-template-columns:minmax(14rem,16rem) minmax(0,1fr);gap:1rem;align-items:start;"><jarvis-menu aria-label="Compact command menu" aria-description="Persistent command menu with remembered selection." items="Content/Overview~Summary panel; Content/Drafts~3 pending reviews; Content/Archive~Read-only history|disabled; Workspace/Pin this workspace~Keep it at the top of the switcher; Workspace/Delete workspace~Requires owner approval|danger" orientation="vertical" show-descriptions="false" close-on-select="false" value="Workspace/Pin this workspace"></jarvis-menu><jarvis-surface elevated><jarvis-stack><strong>Keyboard scan</strong><p>Type the first few letters of a command to move focus across sibling rows while keeping the selected action visibly marked.</p></jarvis-stack></jarvis-surface></div>` }
      ];
    case 'jarvis-context-menu':
      return [
        { title: 'Product actions on click', markup: `<jarvis-context-menu aria-label="Product media actions" show-on="click" value="Add to favorite" items="Share/Facebook~Publish to the company page; Share/Twitter~Post the teaser copy; Download~Save the latest preview; Add comment~Open the review thread; Add to favorite~Pin to quick access; Delete asset~Cannot be undone|danger"><div style="display:grid;gap:0.8rem;justify-items:start;padding:1rem;border:1px solid rgba(120,138,164,0.22);border-radius:1rem;background:linear-gradient(180deg,#ffffff,#f8fbff);min-height:12rem;"><div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.08em;color:#64748b;">Click the media card</div><div style="width:100%;min-height:8rem;border-radius:0.9rem;background:linear-gradient(135deg,#0f172a,#1e293b 45%,#334155);display:grid;place-items:center;color:#f8fafc;font-weight:600;">Display preview</div><div style="display:flex;justify-content:space-between;width:100%;font-size:0.95rem;color:#334155;"><span>SuperLCD 55</span><strong>$799</strong></div></div></jarvis-context-menu>` },
        { title: 'Nested share menu with disabled actions', markup: `<jarvis-context-menu aria-label="Asset share menu" items="Share/Facebook~Publish to the company page; Share/Twitter~Post teaser copy; Share/Copy link~Copy the public review URL; Download~Save the latest preview; Archive~Move to cold storage|disabled" close-on-outside-click="false"><div style="display:grid;place-items:center;min-height:10rem;border:1px solid rgba(120,138,164,0.18);border-radius:1rem;background:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,0.72);">Use right click, long press, or Shift+F10</div></jarvis-context-menu>` },
        { title: 'Remembered selection and compact rows', markup: `<jarvis-context-menu aria-label="Quick asset actions" show-on="click" close-on-select="false" value="Review/Approve" show-descriptions="false" items="Review/Approve~Mark this asset as approved.; Review/Request changes~Send back for revision.; Organize/Move to archive~Move out of the active queue.; Organize/Delete asset~Cannot be undone|danger"><div style="display:grid;gap:0.5rem;padding:1rem;border:1px dashed rgba(120,138,164,0.32);border-radius:1rem;background:rgba(248,250,252,0.92);"><strong>Compact context target</strong><span style="color:#64748b;">Selected actions keep a visible indicator when you reopen the menu.</span></div></jarvis-context-menu>` }
      ];
    case 'jarvis-stepper':
      return [
        { title: 'Horizontal and vertical progress', markup: `<div class="grid cards"><jarvis-stepper items="Cart|cart||; Shipping info|truck||; Promo code|gift|Optional|optional; Checkout|card||; Ordered|check|Confirmed|" current="2" completed="0,1" invalid-steps="3" disabled-steps="4" size="lg"></jarvis-stepper><jarvis-stepper items="Profile|user||; Workspace|grid||; Billing|card|Needs review|invalid; Review|check||" current="1" completed="Profile" orientation="vertical"></jarvis-stepper></div>` },
        { title: 'Linear, blocked, and focus-select states', markup: `<div class="grid cards"><jarvis-stepper items="Dates|calendar||; Guests|users||; Room and meal plan|bed||; Additional requests|message|Optional|optional; Confirmation|check|Waiting for validation|disabled" current="2" linear disabled-steps="4"></jarvis-stepper><jarvis-stepper items="Cart|cart||; Shipping|truck||; Payment|card||; Review|check||" current="1" select-on-focus show-connectors="false" size="sm"></jarvis-stepper></div>` },
        { title: 'Readonly review and explicit status control', markup: `<div class="grid cards"><jarvis-stepper items="Intake|inbox||; Review|search||; Approval|check||; Archive|folder||" current="1" completed="Intake" invalid-steps="Approval" read-only aria-label="Readonly audit flow"></jarvis-stepper><jarvis-stepper items="Draft|edit||; Review|search||; Publish|send||" current="2" completed="Draft,Review" size="sm" aria-label="Publishing review flow"></jarvis-stepper></div>` }
      ];
    case 'jarvis-autocomplete':
      return [
        { title: 'Default, clear button, and starts-with search', markup: `<div class="grid cards"><jarvis-autocomplete label="First name" suggestions="George,Margaret,Olivia,Victor,Sam,John" search-mode="startsWith"></jarvis-autocomplete><jarvis-autocomplete label="Last name" suggestions="Stanwick,Hill,Reagan,Norris,Hart" show-clear-button value="Stanwick"></jarvis-autocomplete></div>` },
        { title: 'Disabled and filled', markup: `<div class="grid cards"><jarvis-autocomplete label="Role" suggestions="CEO,CTO,COO,Designer,Engineer" value="CEO" disabled></jarvis-autocomplete><jarvis-autocomplete label="State" suggestions="California,Georgia,Missouri,Utah,Idaho" placeholder="Type a state"></jarvis-autocomplete></div>` },
        { title: 'Custom values, exact matching, and empty state copy', markup: `<div class="grid cards"><jarvis-autocomplete label="Client" suggestions="Acme,Northwind,Globex,Initech" accept-custom-value min-search-length="2"></jarvis-autocomplete><jarvis-autocomplete label="Search by exact code" suggestions="OPS-100,OPS-120,OPS-140,OPS-200" search-mode="equals" no-data-text="Type a full code like OPS-120" placeholder="Type an exact code"></jarvis-autocomplete></div>` }
      ];
    case 'jarvis-combobox':
      return [
        { title: 'Default, grouped options, and clear button', markup: `<div class="grid cards"><jarvis-combobox label="Owner" placeholder="Select an owner" options="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter; Engineering/Victor Norris" value="Engineering/Kevin Carter" show-clear-button></jarvis-combobox><jarvis-combobox label="Client" placeholder="Start typing a client" options="Acme North|acme-north; Acme South|acme-south; Globex Prime|globex-prime; Initech Labs|initech-labs" search-mode="startsWith"></jarvis-combobox></div>` },
        { title: 'Exact search, custom values, and no-data guidance', markup: `<div class="grid cards"><jarvis-combobox label="Team code" placeholder="Type a full code" options="OPS-100|ops-100; OPS-120|ops-120; OPS-140|ops-140" search-mode="equals" no-data-text="Type a full code like OPS-120"></jarvis-combobox><jarvis-combobox label="Create a new tag" placeholder="Select or type a tag" options="Design|design; Engineering|engineering; Product|product" accept-custom-value show-clear-button></jarvis-combobox></div>` },
        { title: 'Readonly, invalid, and delayed search', markup: `<div class="grid cards"><jarvis-combobox label="Readonly owner" options="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter; Engineering/Victor Norris" value="Leadership/Samantha Bright" read-only></jarvis-combobox><jarvis-combobox label="Search after 2 letters" placeholder="Type at least 2 letters" options="California|ca; Colorado|co; Connecticut|ct; Georgia|ga; Idaho|id" min-search-length="2" show-data-before-search="false" invalid error-text="Choose a valid state."></jarvis-combobox></div>` }
      ];
    case 'jarvis-radio-group':
      return [
        { title: 'Vertical and horizontal', markup: `<div class="grid cards"><jarvis-radio-group label="Priority" items="Low~Default response window; Normal~Routes to the shared queue; Urgent~Escalates to the incident rotation; High~Board-level attention required|high|danger" value="Urgent"></jarvis-radio-group><jarvis-radio-group label="Direction" items="Auto~Use default layout rule; Left~Anchor support rail; Right~Anchor analytics rail" value="Left" orientation="horizontal"></jarvis-radio-group></div>` },
        { title: 'Required, invalid, and readonly groups', markup: `<div class="grid cards"><jarvis-radio-group label="Required shipping method" items="Standard~3 to 5 business days; Express~Next business day; Same day~Local coverage only|same-day|disabled" required help-text="Choose how the order should ship."></jarvis-radio-group><jarvis-radio-group label="Invalid selection guidance" items="Design~Owns the visual system; Engineering~Ships the underlying implementation; Product~Sets the delivery brief" invalid error-text="Pick the team that owns this request."></jarvis-radio-group><jarvis-radio-group label="Readonly review state" items="Draft~Changes still allowed; Review~Pending audit approval; Approved~Locked for release" value="Review" read-only aria-description="This workflow state is locked during audit."></jarvis-radio-group></div>` }
      ];
    case 'jarvis-select-box':
      return [
        { title: 'Default, grouped, and readonly', markup: `<div class="grid cards"><jarvis-select-box label="Product" items="HD Video Player|hd; SuperHD Video Player|super-hd; SuperLCD 42|lcd-42; SuperLED 50|led-50" value="hd" show-clear-button></jarvis-select-box><jarvis-select-box label="Grouped data" items="Video Players/HD Video Player; Video Players/SuperHD Video Player; Televisions/SuperLCD 42; Televisions/SuperLED 50" grouped search-enabled></jarvis-select-box><jarvis-select-box label="Read only" items="Low|low; Normal|normal; Urgent|urgent" value="urgent" read-only></jarvis-select-box></div>` },
        { title: 'Search, custom value, and disabled state', markup: `<div class="grid cards"><jarvis-select-box label="Search products" items="HD Video Player|hd; SuperHD Video Player|super-hd; SuperLCD 42|lcd-42; SuperLED 50|led-50" search-enabled accept-custom-value placeholder="Choose or type a product"></jarvis-select-box><jarvis-select-box label="Disabled catalog" items="Projector Plus|projector; Projector PlusHD|projector-hd; Wireless Display|wireless" value="projector-hd" disabled></jarvis-select-box></div>` },
        { title: 'Exact search and custom no-data text', markup: `<div class="grid cards"><jarvis-select-box label="Exact SKU match" items="OPS-100|ops-100; OPS-120|ops-120; OPS-140|ops-140" search-enabled search-mode="equals" no-data-text="No SKU matched. Try OPS-120." placeholder="Type a full SKU"></jarvis-select-box><jarvis-select-box label="Starts-with search" items="Acme North|acme-north; Acme South|acme-south; Globex Prime|globex-prime" search-enabled search-mode="startsWith" placeholder="Start typing a client"></jarvis-select-box></div>` },
        { title: 'Required, helper, and validation states', markup: `<div class="grid cards"><jarvis-select-box label="Required category" items="Finance|finance; Operations|operations; Product|product; Support|support" required help-text="Pick a team before routing the request."></jarvis-select-box><jarvis-select-box label="Invalid category" items="Finance|finance; Operations|operations; Product|product; Support|support" invalid error-text="Select a valid team before continuing."></jarvis-select-box><jarvis-select-box label="Readonly selection" items="Low|low; Normal|normal; Urgent|urgent" value="urgent" read-only help-text="This routing level is locked after approval."></jarvis-select-box></div>` },
        { title: 'Routing and approval ownership', markup: `<div class="grid cards"><jarvis-surface><jarvis-stack gap="1rem"><strong>Assign release ownership</strong><jarvis-select-box label="Owning team" items="Design|design; Engineering|engineering; Product|product; Support|support" value="engineering" help-text="The selected team becomes the default approver group."></jarvis-select-box><jarvis-select-box label="Escalation path" items="Standard review|standard; Legal review|legal; Executive sign-off|executive" required invalid error-text="Choose the approval route before continuing."></jarvis-select-box><jarvis-button>Open approval review</jarvis-button></jarvis-stack></jarvis-surface></div>` }
      ];
    case 'jarvis-lookup':
      return [
        { title: 'Simple and grouped lookup', markup: `<div class="grid cards"><jarvis-lookup label="Simple lookup" heading="Select employee" items="John Heart|john; Samantha Bright|samantha; Kevin Carter|kevin" value="john" help-text="Use the sheet when you need more deliberate selection."></jarvis-lookup><jarvis-lookup label="Grouped lookup" heading="Select owner" items="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter; Engineering/Victor Norris" grouped value="Engineering/Victor Norris"></jarvis-lookup></div>` },
        { title: 'Clear button, search-first flow, and empty state copy', markup: `<div class="grid cards"><jarvis-lookup label="Assignee" heading="Pick an owner" items="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter; Engineering/Victor Norris" grouped show-clear-button search-placeholder="Search employees" value="Leadership/Samantha Bright"></jarvis-lookup><jarvis-lookup label="Empty search guidance" heading="Search department code" items="FIN-100|fin-100; OPS-200|ops-200; HR-300|hr-300" search-mode="equals" no-data-text="Enter a full code like OPS-200" show-cancel-button="false"></jarvis-lookup></div>` },
        { title: 'Required, readonly, and invalid states', markup: `<div class="grid cards"><jarvis-lookup label="Required owner" heading="Choose an owner" items="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter" required invalid error-text="Pick an owner before submitting."></jarvis-lookup><jarvis-lookup label="Readonly owner" heading="Owner details" items="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter" value="Leadership/Samantha Bright" read-only help-text="This owner is locked after approval."></jarvis-lookup></div>` }
      ];
    case 'jarvis-drop-down-box':
      return [
        { title: 'Embedded tree and list', markup: `<div class="grid cards"><jarvis-drop-down-box label="Store tree" items="Stores/Super Mart of the West/Televisions/SuperLCD 42; Stores/Super Mart of the West/Televisions/SuperLED 50; Stores/Braeburn/Projectors/Projector Plus" value="Stores/Super Mart of the West/Televisions/SuperLCD 42" help-text="Tree mode works well for nested catalogs and directories."></jarvis-drop-down-box><jarvis-drop-down-box label="Products list" items="HD Video Player|hd; SuperHD Video Player|super-hd; SuperLCD 42|lcd-42; SuperLED 50|led-50" content-type="list" selection-mode="multiple" value="hd,lcd-42" show-clear-button></jarvis-drop-down-box></div>` },
        { title: 'Search, selection controls, and staged apply', markup: `<div class="grid cards"><jarvis-drop-down-box label="Embedded explorer" items="Automation/ExcelRemote IR; Automation/ExcelRemote IP; Monitors/DesktopLCD 21; Monitors/DesktopLED 19; Projectors/Projector Plus" content-type="list" selection-mode="multiple" search-enabled show-selection-controls apply-value-mode="useButtons" value="Automation/ExcelRemote IR,Monitors/DesktopLCD 21"></jarvis-drop-down-box><jarvis-drop-down-box label="Create a custom option" items="Starter|starter; Growth|growth; Scale|scale" content-type="list" search-enabled accept-custom-value placeholder="Select or create a tier"></jarvis-drop-down-box></div>` },
        { title: 'Tree search visibility and invalid guidance', markup: `<div class="grid cards"><jarvis-drop-down-box label="Search a tree path" items="Stores/Super Mart of the West/Televisions/SuperLCD 42; Stores/Super Mart of the West/Televisions/SuperLED 50; Stores/Braeburn/Projectors/Projector Plus; Stores/Braeburn/Projectors/Projector Pro" search-enabled search-mode="startsWith" placeholder="Search by store or product"></jarvis-drop-down-box><jarvis-drop-down-box label="Exact list search" items="OPS-100|ops-100; OPS-120|ops-120; OPS-140|ops-140" content-type="list" search-enabled search-mode="equals" no-data-text="No matching SKU. Try OPS-120." placeholder="Type an exact SKU" required invalid error-text="Choose a valid SKU before continuing."></jarvis-drop-down-box></div>` },
        { title: 'Readonly and helper states', markup: `<div class="grid cards"><jarvis-drop-down-box label="Readonly selections" items="Leadership/John Heart; Leadership/Samantha Bright; Engineering/Kevin Carter" value="Leadership/Samantha Bright" read-only help-text="Selections are locked after handoff."></jarvis-drop-down-box><jarvis-drop-down-box label="Required multi-select" items="Finance|finance; Operations|operations; Product|product; Support|support" content-type="list" selection-mode="multiple" apply-value-mode="useButtons" required help-text="Pick one or more teams, then apply."></jarvis-drop-down-box></div>` }
      ];
    case 'jarvis-drop-down-button':
      return [
        { title: 'Standalone button and profile actions', markup: `<div class="grid cards"><jarvis-drop-down-button label="Download trial" icon="save" items="Download trial||success|Export the latest evaluation build.; Share preview||default|Send the link to reviewers.; Archive draft||warning|Move the current draft out of the active queue.; Delete workspace||danger|Permanently remove the current draft."></jarvis-drop-down-button><jarvis-drop-down-button label="Olivia Peyton" icon="user" variant="ghost" items="Profile||default|Open profile and workspace history.; Messages||default|Review unread threads.; Friends||default|See collaborator access.; Exit||warning|End the shared preview session."></jarvis-drop-down-button></div>` },
        { title: 'Split button and remembered primary action', markup: `<div class="grid cards"><jarvis-drop-down-button label="Publish" icon="send" split-button value="Schedule send" items="Run checks||success|Validate the release checklist.; Schedule send||default|Choose the publication window.; Merge now||default|Publish immediately.; Delete release||danger|Remove the pending release.; Locked action||default|Requires elevated approval.|disabled"></jarvis-drop-down-button><jarvis-drop-down-button label="Compact actions" variant="outline" show-descriptions="false" show-arrow-icon="false" show-selection-indicator value="Archive draft" items="Share preview||default|Send the link to reviewers.; Archive draft||warning|Move the current draft out of the active queue.; Delete workspace||danger|Permanently remove the current draft."></jarvis-drop-down-button></div>` }
      ];
    case 'jarvis-tag-box':
      return [
        { title: 'Default, grouped, and limited tags', markup: `<div class="grid cards"><jarvis-tag-box label="Products" items="HD Video Player|hd; SuperHD Video Player|super-hd; SuperLCD 42|lcd-42; SuperLED 50|led-50; Projector Plus|projector" value="hd,super-hd,lcd-42" help-text="Use tags when people need to see all selected values at a glance."></jarvis-tag-box><jarvis-tag-box label="Grouped items" items="Automation/ExcelRemote IR; Automation/ExcelRemote IP; Monitors/DesktopLCD 21; Monitors/DesktopLED 19" grouped search-enabled value="Automation/ExcelRemote IR,Automation/ExcelRemote IP"></jarvis-tag-box><jarvis-tag-box label="Multi-tag" items="One|one; Two|two; Three|three; Four|four; Five|five" value="one,two,three,four" max-displayed-tags="2"></jarvis-tag-box></div>` },
        { title: 'Select all, hide selected items, and apply buttons', markup: `<div class="grid cards"><jarvis-tag-box label="Product filters" items="HD Video Player|hd; SuperHD Video Player|super-hd; SuperLCD 42|lcd-42; SuperLED 50|led-50; Projector Plus|projector" search-enabled show-selection-controls hide-selected-items apply-value-mode="useButtons" select-all-text="Select visible products" value="hd,lcd-42"></jarvis-tag-box><jarvis-tag-box label="Custom tags" items="Design|design; Engineering|engineering; Product|product" search-enabled accept-custom-value show-multi-tag-only value="design,engineering"></jarvis-tag-box></div>` },
        { title: 'Single collapsed tag and exact search guidance', markup: `<div class="grid cards"><jarvis-tag-box label="Single collapsed tag" items="Design|design; Engineering|engineering; Product|product" show-multi-tag-only value="design"></jarvis-tag-box><jarvis-tag-box label="Exact team search" items="OPS-100|ops-100; OPS-120|ops-120; OPS-140|ops-140" search-enabled search-mode="equals" no-data-text="Type a full team code like OPS-120" placeholder="Search exact team code" invalid error-text="Add at least one valid team code."></jarvis-tag-box></div>` },
        { title: 'Required and readonly states', markup: `<div class="grid cards"><jarvis-tag-box label="Required reviewers" items="Design|design; Engineering|engineering; Product|product; Support|support" search-enabled required help-text="Choose one or more reviewers before continuing."></jarvis-tag-box><jarvis-tag-box label="Readonly tags" items="Design|design; Engineering|engineering; Product|product" value="design,engineering" read-only help-text="Selections are frozen after approval."></jarvis-tag-box></div>` }
      ];
    case 'jarvis-number-box':
      return [
        { title: 'Spin, clear, and bounds', markup: `<div class="grid cards"><jarvis-number-box label="Quantity" value="20" show-clear-button help-text="Use whole numbers."></jarvis-number-box><jarvis-number-box label="Stock" value="15" min="10" max="30" step="5"></jarvis-number-box><jarvis-number-box label="Disabled" value="10" disabled></jarvis-number-box></div>` },
        { title: 'Formatting modes', markup: `<div class="grid cards"><jarvis-number-box label="Currency" value="14500.55" format="currency" currency="USD" fraction-digits="2"></jarvis-number-box><jarvis-number-box label="Accounting" value="-2314.12" format="accounting" currency="USD" fraction-digits="2"></jarvis-number-box><jarvis-number-box label="Percent" value="15" format="percent" fraction-digits="0"></jarvis-number-box><jarvis-number-box label="Weight" value="3.14" format="unit" unit="kg" fraction-digits="2"></jarvis-number-box></div>` },
        { title: 'Readonly and invalid states', markup: `<div class="grid cards"><jarvis-number-box label="Readonly amount" value="42" read-only></jarvis-number-box><jarvis-number-box label="Invalid amount" value="" invalid error-text="A quantity is required." show-clear-button></jarvis-number-box></div>` }
      ];
    case 'jarvis-slider':
      return [
        { title: 'Labels, tooltip, and disabled state', markup: `<div class="grid cards"><jarvis-slider label="Default mode" value="90"></jarvis-slider><jarvis-slider label="With labels" value="50" min="0" max="100" value-suffix="%" show-labels></jarvis-slider><jarvis-slider label="With tooltip" value="35" value-prefix="$" value-suffix="k" show-tooltip></jarvis-slider><jarvis-slider label="Disabled" value="20" disabled></jarvis-slider></div>` },
        { title: 'Formatting and discrete tick marks', markup: `<div class="grid cards"><jarvis-slider label="Revenue target" value="14500" min="0" max="30000" step="2500" format="currency" currency="USD" tick-interval="5000" show-ticks show-tick-labels show-tooltip></jarvis-slider><jarvis-slider label="Completion" value="75" min="0" max="100" step="5" format="percent" fraction-digits="0" show-labels show-ticks tick-interval="25"></jarvis-slider><jarvis-slider label="Weight" value="12.5" min="0" max="20" step="2.5" format="unit" unit="kg" fraction-digits="1" show-tooltip show-ticks tick-interval="5"></jarvis-slider></div>` },
        { title: 'Filled and plain track', markup: `<div class="grid cards"><jarvis-slider label="Filled track" value="72" value-suffix="%" show-tooltip show-ticks tick-interval="20"></jarvis-slider><jarvis-slider label="Plain track" value="48" value-suffix="%" show-tooltip show-range-fill="false" show-ticks tick-interval="20"></jarvis-slider></div>` },
        { title: 'Readonly, helper, and error states', markup: `<div class="grid cards"><jarvis-slider label="Approval threshold" value="62" value-suffix="%" read-only help-text="Readonly fields still surface the current value for review."></jarvis-slider><jarvis-slider label="Risk tolerance" value="18" max="100" value-suffix="%" invalid error-text="Choose a value between 25% and 75%."></jarvis-slider><jarvis-slider label="Required target" value="40" required help-text="Use helper text for context before validation is triggered." show-labels></jarvis-slider></div>` }
      ];
    case 'jarvis-range-slider':
      return [
        { title: 'Range configurations', markup: `<div class="grid cards"><jarvis-range-slider label="Default mode" start="20" end="60"></jarvis-range-slider><jarvis-range-slider label="With labels" start="35" end="65" value-prefix="$" value-suffix="k" show-labels></jarvis-range-slider><jarvis-range-slider label="With tooltips" start="15" end="65" value-prefix="$" value-suffix="k" show-tooltips></jarvis-range-slider><jarvis-range-slider label="Disabled" start="25" end="75" disabled></jarvis-range-slider></div>` },
        { title: 'Formatted values and tick labels', markup: `<div class="grid cards"><jarvis-range-slider label="Budget range" start="5000" end="15000" min="0" max="20000" step="1000" format="currency" currency="USD" tick-interval="5000" show-ticks show-tick-labels show-tooltips></jarvis-range-slider><jarvis-range-slider label="Adoption range" start="15" end="65" min="0" max="100" step="5" format="percent" fraction-digits="0" show-labels show-ticks tick-interval="25" show-tooltips></jarvis-range-slider></div>` },
        { title: 'Filled and plain track', markup: `<div class="grid cards"><jarvis-range-slider label="Filled track" start="10" end="45" value-suffix="%" show-tooltips show-ticks tick-interval="20"></jarvis-range-slider><jarvis-range-slider label="Plain track" start="55" end="80" value-suffix="%" show-tooltips show-range-fill="false" show-ticks tick-interval="10"></jarvis-range-slider></div>` },
        { title: 'Readonly, helper, and error states', markup: `<div class="grid cards"><jarvis-range-slider label="Readonly budget band" start="35" end="65" value-prefix="$" value-suffix="k" read-only help-text="Keep the range visible in review and approval flows."></jarvis-range-slider><jarvis-range-slider label="Invalid coverage range" start="10" end="15" min="0" max="100" value-suffix="%" invalid error-text="Coverage should span at least 25 percentage points."></jarvis-range-slider><jarvis-range-slider label="Required spend window" start="20" end="50" required help-text="Choose both bounds before continuing." show-labels></jarvis-range-slider></div>` }
      ];
    case 'jarvis-calendar':
      return [
        { title: 'Default and constrained selection', markup: `<div class="grid cards"><jarvis-calendar value="2026-04-15" show-today-button></jarvis-calendar><jarvis-calendar selection-mode="multiple" show-week-numbers first-day-of-week="1" min="2026-04-05" max="2026-04-28" disabled-dates="2026-04-12,2026-04-19" value="2026-04-15,2026-04-16"></jarvis-calendar></div>` },
        { title: 'Whole-week selection', markup: `<div class="grid cards"><jarvis-calendar selection-mode="multiple" first-day-of-week="1" select-week-on-click show-week-numbers value="2026-04-14"></jarvis-calendar></div>` }
      ];
    case 'jarvis-date-box':
      return [
        { title: 'Date, time, date-time, and staged apply', markup: `<div class="grid cards"><jarvis-date-box label="Date" type="date" value="2026-04-15" show-today-button open-on-field-click></jarvis-date-box><jarvis-date-box label="Time" type="time" value="22:02" show-today-button></jarvis-date-box><jarvis-date-box label="Date and time" type="datetime-local" value="2026-04-15T22:02" show-today-button></jarvis-date-box><jarvis-date-box label="Apply and cancel staged changes" type="date" value="2026-04-21" apply-value-mode="useButtons" show-clear-button show-today-button help-text="Review the new date before applying it to the invoice schedule."></jarvis-date-box></div>` },
        { title: 'Required, readonly, and validation', markup: `<div class="grid cards"><jarvis-date-box label="Birthday" type="date" value="1981-04-27" show-clear-button help-text="Used for profile verification."></jarvis-date-box><jarvis-date-box label="Readonly window" type="date" value="2026-04-21" read-only></jarvis-date-box><jarvis-date-box label="Required reminder" type="date" required help-text="Required fields can still guide the user before validation runs."></jarvis-date-box><jarvis-date-box label="Missing date" type="date" invalid error-text="Choose a valid ship date."></jarvis-date-box></div>` }
      ];
    case 'jarvis-date-range-box':
      return [
        { title: 'Range selection, picker actions, and staged apply', markup: `<div class="grid cards"><jarvis-date-range-box label="Vacation period" start="2026-04-12" end="2026-04-18" min="2026-04-01" max="2026-05-15" show-picker-buttons start-placeholder="Start" end-placeholder="End"></jarvis-date-range-box><jarvis-date-range-box label="Clearable range" start="2026-05-01" end="2026-05-08" show-clear-button show-picker-buttons open-on-field-click></jarvis-date-range-box><jarvis-date-range-box label="Stage the range before committing" start="2026-06-10" end="2026-06-14" apply-value-mode="useButtons" show-picker-buttons help-text="Review the publishing window before it updates the campaign."></jarvis-date-range-box></div>` },
        { title: 'Summary, readonly, and validation', markup: `<div class="grid cards"><jarvis-date-range-box label="Incomplete range" start="2026-04-12" help-text="Pick an end date to complete the request."></jarvis-date-range-box><jarvis-date-range-box label="Readonly itinerary" start="2026-06-01" end="2026-06-08" read-only></jarvis-date-range-box><jarvis-date-range-box label="Required travel window" required help-text="Choose both dates before approving the trip."></jarvis-date-range-box><jarvis-date-range-box label="Invalid range" start="2026-04-18" end="2026-04-12" invalid error-text="End date must be after the start date."></jarvis-date-range-box></div>` },
        { title: 'Release scheduling workflow', markup: `<div class="grid cards"><jarvis-surface><jarvis-stack gap="1rem"><strong>Choose the release window</strong><jarvis-date-range-box label="Marketing launch window" start="2026-05-12" end="2026-05-19" show-summary use-buttons apply-text="Use this window" cancel-text="Reset draft" help-text="Keep the press and product windows aligned before review."></jarvis-date-range-box><jarvis-date-range-box label="Fallback window" required invalid error-text="Add a fallback window before requesting approval."></jarvis-date-range-box></jarvis-stack></jarvis-surface></div>` }
      ];
    case 'jarvis-file-uploader':
      return [
        { title: 'Manual and instant upload', markup: `<div class="grid cards"><jarvis-file-uploader label="Profile photo" accept=".png,.jpg" max-files="1" max-file-size="1200000" help-text="Upload one photo under 1.2 MB." upload-mode="manual"></jarvis-file-uploader><jarvis-file-uploader label="Async upload" accept=".pdf,.docx" multiple max-files="4" max-file-size="3000000" upload-mode="instant" help-text="Files begin uploading as soon as they are accepted."></jarvis-file-uploader></div>` },
        { title: 'Validation and list handling', markup: `<div class="grid cards"><jarvis-file-uploader label="Contract packet" accept=".pdf" required help-text="Use PDF only so legal review can process the files consistently." max-files="2" max-file-size="1500000"></jarvis-file-uploader><jarvis-file-uploader label="Compact trigger" accept=".png,.jpg" show-file-list="false" dropzone="false" browse-text="Browse assets" empty-state-text="Use the browse action to add artwork."></jarvis-file-uploader></div>` },
        { title: 'Submission packet before final review', markup: `<div class="grid cards"><jarvis-surface><jarvis-stack gap="1rem"><strong>Approval attachments</strong><jarvis-file-uploader label="Required evidence" accept=".pdf,.png" required help-text="Include the annotated screenshot and compliance PDF before opening the review popup." max-files="3" max-file-size="2500000" upload-mode="manual" upload-button-text="Stage files"></jarvis-file-uploader><jarvis-button>Review submission packet</jarvis-button></jarvis-stack></jarvis-surface></div>` }
      ];
    case 'jarvis-progress':
      return [
        { title: 'Determinate progress and tone states', markup: `<div class="grid cards"><jarvis-progress label="Uploading assets" value="64" show-value-label helper-text="3 of 5 files complete."></jarvis-progress><jarvis-progress label="Importing accounts" tone="success" value="84" show-value-label helper-text="Validation checks passed."></jarvis-progress><jarvis-progress label="Migration review" tone="warning" value="38" show-value-label helper-text="Waiting on one final approval."></jarvis-progress><jarvis-progress label="Failed sync" tone="danger" value="12" show-value-label helper-text="The pipeline stopped before completion."></jarvis-progress></div>` },
        { title: 'Indeterminate status', markup: `<div class="grid cards"><jarvis-progress label="Preparing workspace" indeterminate show-value-label value-suffix=""></jarvis-progress></div>` }
      ];
    case 'jarvis-color-box':
      return [
        { title: 'Default, alpha channel, and inline apply', markup: `<div class="grid cards"><jarvis-color-box label="Default mode" value="#f05b41"></jarvis-color-box><jarvis-color-box label="Alpha channel" value="rgba(240,91,65,1)" edit-alpha-channel></jarvis-color-box><jarvis-color-box label="Auto apply" value="#2563eb" show-apply-button="false"></jarvis-color-box></div>` },
        { title: 'Validation, helper text, and custom action copy', markup: `<div class="grid cards"><jarvis-color-box label="Brand presets" value="#111827" help-text="Choose a theme color for highlights and icon accents." presets="#111827;#2563eb;#16a34a;#f59e0b;#dc2626"></jarvis-color-box><jarvis-color-box label="Localized actions" value="#7c3aed" presets="#7c3aed;#a855f7;#c084fc" apply-button-text="Use color" cancel-button-text="Keep current"></jarvis-color-box><jarvis-color-box label="Validation and helper text" value="#16a34a" invalid error-text="Choose a color with better contrast for the current theme."></jarvis-color-box></div>` }
      ];
    case 'jarvis-floating-action-button':
      return [
        { title: 'Inline launcher with described actions', markup: `<div class="grid cards"><jarvis-floating-action-button position="inline" extended label="Add row" aria-description="Inline launcher with described follow-up actions." items="New row~Insert a row beneath the active one.|row|success; Invite teammate~Send an access invite to a collaborator.|invite; Duplicate report~Clone the active workspace card.|duplicate"></jarvis-floating-action-button><jarvis-floating-action-button position="inline" label="Compose" direction="right" close-on-select="false" items="Email~Open the email composer.|email; Message~Send a quick chat ping.|message; Calendar~Create a follow-up booking.|calendar"></jarvis-floating-action-button></div>` },
        { title: 'Bottom-corner launcher with disabled and danger actions', markup: `<div class="grid cards"><jarvis-surface elevated><jarvis-stack><strong>Workspace command center</strong><p>Use a fixed-corner launcher for global actions that stay available from anywhere in the view.</p></jarvis-stack><jarvis-floating-action-button extended label="Quick actions" items="Share update~Send a workspace digest.|share|success; Pin report~Keep this dashboard on top.|pin; Delete draft~Cannot be undone.|delete|danger; Archive project~Unavailable until review closes.|archive|disabled"></jarvis-floating-action-button></jarvis-surface></div>` }
      ];
    case 'jarvis-gallery':
      return [
        { title: 'Captions, side thumbnails, and hover pause', markup: `<div class="grid cards"><jarvis-gallery items="Coastal residence~Oceanfront suite with panoramic windows~Featured stay|#dbeafe,#93c5fd; Downtown studio~Creative review room and lounge~Urban workspace|#e0f2fe,#38bdf8; Forest retreat~Calm woodland lodge with spa access~Wellness escape|#dcfce7,#22c55e" show-thumbnails thumbnail-position="side" show-counter pause-on-hover></jarvis-gallery><jarvis-gallery items="North campus~Flexible collaboration floor~New campus|#dbeafe,#60a5fa; South wing~Editorial lounge and lab~Open house|#d1fae5,#10b981; Rooftop deck~Panoramic evening terrace~Preview event|#fef3c7,#f59e0b" slide-show show-indicators show-nav-buttons show-captions show-counter></jarvis-gallery></div>` },
        { title: 'Compact viewer, offset start, and keyboard navigation', markup: `<div class="grid cards"><jarvis-gallery items="Harbour villa~A compact visual story~Waterfront|#e0f2fe,#38bdf8; Forest studio~Quiet retreat for writers~Editorial|#dcfce7,#22c55e; Skyline loft~Night review suite~Launch prep|#ede9fe,#8b5cf6" height="22rem" start-index="1" show-counter></jarvis-gallery><jarvis-gallery items="Studio one~Minimal gallery without captions~Lookbook|#fef3c7,#f59e0b; Studio two~Focus on the imagery~Moodboard|#fee2e2,#ef4444" show-captions="false" keyboard-navigation="true" show-counter></jarvis-gallery></div>` }
      ];
    case 'jarvis-chat':
      return [
        { title: 'Support thread, tone, and staged attachments', markup: `<div class="grid cards"><jarvis-chat label="Account recovery" user="John Doe" status="Agent online" status-tone="success" attachments-enabled composer-help-text="Press Ctrl+Enter to send quickly." max-attachments="2"></jarvis-chat><jarvis-chat label="Support transcript" user="Olivia Peyton" status="Escalated review" status-tone="warning" show-composer="false" messages="system|System|11:50 PM|A supervisor joined the conversation.|Yesterday 4/14/2026|;;other|Support Agent|11:51 PM|Hello, Olivia!|Yesterday 4/14/2026|;;self|Olivia Peyton|11:53 PM|Please send the final report to the operations channel.|Yesterday 4/14/2026|Instructions.pdf~10 KB;;other|Support Agent|11:55 PM|Done. The file is ready for review.|Today 4/15/2026|"></jarvis-chat></div>` },
        { title: 'Empty, readonly, and compact composer states', markup: `<div class="grid cards"><jarvis-chat label="Onboarding thread" user="Maya Chen" status="Waiting for first reply" empty-state-text="No onboarding updates have been posted yet." composer-help-text="Draft the first update to kick off the handoff." composer-rows="2"></jarvis-chat><jarvis-chat label="Readonly log" user="Victor Norris" status="Archived" status-tone="neutral" show-composer="false" show-avatars="false" show-attachment-sizes="false" messages="system|System|9:10 AM|This conversation is archived for compliance review.|Today 4/15/2026|;;other|Ops Lead|9:12 AM|The export has been stored in the secure evidence vault.|Today 4/15/2026|"></jarvis-chat></div>` }
      ];
    case 'jarvis-load-indicator':
      return [
        { title: 'Indicator types and sizes', markup: `<div class="pill-row"><jarvis-load-indicator type="ring" size="sm"></jarvis-load-indicator><jarvis-load-indicator type="ring" size="md"></jarvis-load-indicator><jarvis-load-indicator type="dots" size="lg"></jarvis-load-indicator><jarvis-load-indicator type="bars" size="xl"></jarvis-load-indicator></div>` },
        { title: 'Inline and stacked labels', markup: `<div class="grid cards"><jarvis-load-indicator type="ring" size="md" show-label message="Saving draft"></jarvis-load-indicator><jarvis-load-indicator type="dots" size="lg" layout="stacked" show-label message="Syncing channels"></jarvis-load-indicator></div>` }
      ];
    case 'jarvis-load-panel':
      return [
        { title: 'Overlay, pane, and dismissible states', markup: `<div class="grid cards"><jarvis-load-panel visible heading="Loading employee profile" message="Fetching the profile and recent activity" description="This usually takes a few seconds while we hydrate the card and timeline." progress-value="72" show-cancel-button><jarvis-surface><jarvis-stack><strong>John Heart</strong><p>Birth date: 1978/01/09</p><p>Address: 424 N Main St.</p></jarvis-stack></jarvis-surface></jarvis-load-panel><jarvis-load-panel visible message="Refreshing dashboard" indicator-type="dots" indicator-size="lg" show-pane="false"><jarvis-surface><jarvis-stack><strong>Analytics board</strong><p>Updating tiles and activity feed...</p></jarvis-stack></jarvis-surface></jarvis-load-panel></div>` },
        { title: 'Compact pane with hidden indicator', markup: `<div class="grid cards"><jarvis-load-panel visible heading="Saving settings" message="Committing theme changes to the workspace." show-indicator="false" show-overlay="false"><jarvis-surface><jarvis-stack><strong>Theme settings</strong><p>Accent, density, and motion preferences are being stored.</p></jarvis-stack></jarvis-surface></jarvis-load-panel></div>` }
      ];
    case 'jarvis-scroll-view':
      return [
        { title: 'Long-form content and reach-bottom', markup: `<div class="grid cards"><jarvis-scroll-view height="18rem" top-status-text="Top of the workspace timeline" bottom-status-text="More updates below" show-shadows show-refresh-button refresh-label="Reload feed"><jarvis-stack><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p><p>Content has been updated on the reach-bottom event.</p></jarvis-stack></jarvis-scroll-view><jarvis-scroll-view height="18rem" show-scrollbar="always"><div style="display:flex;gap:1rem;width:54rem;"><jarvis-surface>Panel A</jarvis-surface><jarvis-surface>Panel B</jarvis-surface><jarvis-surface>Panel C</jarvis-surface><jarvis-surface>Panel D</jarvis-surface></div></jarvis-scroll-view></div>` },
        { title: 'Status rows, quiet edges, and refresh states', markup: `<div class="grid cards"><jarvis-scroll-view height="16rem" show-shadows top-status-text="Back at the beginning" bottom-status-text="Continue scrolling for more activity" show-refresh-button refresh-label="Sync updates"><jarvis-stack><p>System note 01</p><p>System note 02</p><p>System note 03</p><p>System note 04</p><p>System note 05</p><p>System note 06</p><p>System note 07</p><p>System note 08</p><p>System note 09</p><p>System note 10</p></jarvis-stack></jarvis-scroll-view><jarvis-scroll-view height="16rem" show-refresh-button refreshing refresh-label="Syncing feed"><jarvis-stack><p>Refresh states should stay visible without covering the scroll surface.</p><p>Use the action for staged reloads or feed refreshes.</p><p>Additional content keeps the scrollbar visible.</p><p>More content below.</p><p>Even more content.</p></jarvis-stack></jarvis-scroll-view></div>` }
      ];
    case 'jarvis-sortable':
      return [
        { title: 'Kanban board with live counts', markup: `<jarvis-sortable items="Not Started/Report on the State of Engineering Dept|Bart Armaz|success; Not Started/Staff Productivity Report|Brett Wade|success; Need Assistance/Update Employee Files with New NDA|Greta Sims|success; Need Assistance/Sign Updated NDA|Ed Holmes|warning; In Progress/Health Insurance|Samantha Bright|warning; In Progress/NDA|Greta Sims|warning; Deferred/New HDMI Spec|Bart Armaz|success; Deferred/Refund Request|Ed Holmes|danger"></jarvis-sortable>` },
        { title: 'Compact board and empty stages', markup: `<jarvis-sortable compact columns="Backlog,Ready,Review,Done" empty-column-text="Queue is clear" items="Backlog/Write launch brief|Olivia Peyton|success; Ready/Prep stakeholder deck|Victor Norris|warning; Review/Confirm launch date|Maya Chen|danger"></jarvis-sortable>` },
        { title: 'Readonly board summary', markup: `<jarvis-sortable disabled show-meta="false" columns="Planned,Active,Completed" empty-column-text="No cards in this stage" items="Planned/Refresh hiring panel|Today|success; Active/Review launch metrics|Tomorrow|warning; Completed/Archive Q1 board|Done|neutral"></jarvis-sortable>` }
      ];
    case 'jarvis-speech-to-text':
      return [
        { title: 'Display modes', markup: `<div class="grid cards"><jarvis-speech-to-text label="Icon only" display-mode="icon"></jarvis-speech-to-text><jarvis-speech-to-text label="Contained trigger" display-mode="button"></jarvis-speech-to-text><jarvis-speech-to-text label="Extended transcript" display-mode="extended"></jarvis-speech-to-text></div>` },
        { title: 'Clear-on-start, transcript controls, and language options', markup: `<div class="grid cards"><jarvis-speech-to-text label="Interview capture" display-mode="button" clear-on-start auto-stop-after-final max-length="160" show-options></jarvis-speech-to-text><jarvis-speech-to-text label="Minimal trigger" display-mode="icon" show-transcript="false" show-clear-button="false" interim-results="false"></jarvis-speech-to-text></div>` }
      ];
    case 'jarvis-tile-view':
      return [
        { title: 'Horizontal and vertical tile browsing', markup: `<div class="grid cards"><jarvis-tile-view items="Hamburg Suites|$299 per night|#dbeafe,#60a5fa|2x2|Featured; Forest Retreat|Boardroom and wellness wing|#dcfce7,#22c55e|1x2|Wellness; City Loft|Skyline meeting room|#ede9fe,#8b5cf6|1x1|Urban; Harbour Villa|Waterfront residence|#fef3c7,#f59e0b|1x1|New"></jarvis-tile-view><jarvis-tile-view direction="vertical" items="North Campus|Innovation lab|#e0f2fe,#38bdf8|2x1|Live; Studio Nine|Production floor|#fee2e2,#ef4444|1x1|Studio; Harbour Deck|Executive suite|#fef3c7,#f59e0b|1x2|Review"></jarvis-tile-view></div>` },
        { title: 'Readonly and disabled tiles', markup: `<div class="grid cards"><jarvis-tile-view read-only items="Launch prep|Campaign command room|#dbeafe,#60a5fa|2x1|Featured; North Campus|Innovation lab|#e0f2fe,#38bdf8|1x1|Live; Legacy archive|Read-only records|#e2e8f0,#94a3b8|1x1|Archived|disabled"></jarvis-tile-view><jarvis-tile-view show-subtitles="false" show-selection-indicator="false" items="Boardroom|Schedule room|#fef3c7,#f59e0b|1x1|Open; Studio|Editorial suite|#ede9fe,#8b5cf6|1x1|Reserved; Terrace|Event deck|#dcfce7,#22c55e|2x1|Booked"></jarvis-tile-view></div>` }
      ];
    case 'jarvis-tree-view':
      return [
        { title: 'Catalog search, toolbar, and recursive selection', markup: `<div class="grid cards"><jarvis-tree-view items="Stores/Super Mart of the West/Video Players/HD Video Player; Stores/Super Mart of the West/Televisions/SuperLCD 42; Stores/Super Mart of the West/Televisions/SuperLED 50; Stores/Braeburn/Monitors/DesktopLCD 19; Stores/Braeburn/Projectors/Projector Plus" search-enabled search-mode="startsWith" search-placeholder="Search products" show-toolbar show-select-all show-status selection-mode="multiple" show-check-boxes-mode="normal" select-nodes-recursive selected="Stores/Super Mart of the West/Televisions/SuperLCD 42,Stores/Braeburn/Projectors/Projector Plus"></jarvis-tree-view><jarvis-tree-view items="Employees/Leadership/John Heart (CEO); Employees/Leadership/Samantha Bright (COO); Employees/Operations/Victor Norris (Shipping Assistant); Employees/Operations/Kevin Carter (Shipping Manager); Employees/Engineering/Amelia Harper (Network Admin); Employees/Engineering/Wally Hobbs (Programmer)" selection-mode="multiple" show-check-boxes-mode="normal" show-toolbar show-select-all show-status selected="Employees/Operations/Victor Norris (Shipping Assistant)" select-by-click="false" empty-state-text="No employees match the current search."></jarvis-tree-view></div>` },
        { title: 'Exact tree search and clear selection', markup: `<div class="grid cards"><jarvis-tree-view items="Stores/Super Mart of the West/Video Players/HD Video Player; Stores/Super Mart of the West/Televisions/SuperLCD 42; Stores/Super Mart of the West/Televisions/SuperLED 50; Stores/Braeburn/Monitors/DesktopLCD 19; Stores/Braeburn/Projectors/Projector Plus" search-enabled search-mode="equals" show-toolbar show-select-all show-status search-placeholder="Type a full node label" empty-state-text="No catalog nodes match this exact search."></jarvis-tree-view></div>` }
      ];
    case 'jarvis-popup':
      return [
        { title: 'Editorial header, status, and sticky footer', markup: `<jarvis-popup open heading="Information" eyebrow="Workspace summary" status="Live" description="Use popup for employee details, media surfaces, and richer confirmation flows." aria-description="Information popup with footer actions and live workspace status." initial-focus="close" show-overlay="false" position="top" width="30rem" sticky-footer><span slot="subtitle">652 Avonwick Gate</span><p>Keep the popup compact when the surrounding page should remain visible, but still give the header and footer enough structure to feel deliberate.</p><div slot="footer"><jarvis-button variant="outline">Send</jarvis-button><jarvis-button>Close</jarvis-button></div></jarvis-popup>` },
        { title: 'Bottom-sheet handle and toned confirmation', markup: `<jarvis-popup open heading="Downtown Inn" eyebrow="Travel review" status="Needs approval" tone="warning" description="Bottom positioning works well for booking, mobile confirmation, and staged next actions." show-overlay="false" position="bottom" size="sm" show-handle><p>Popups can also hold compact content regions with one clear follow-up action.</p><div slot="footer"><jarvis-button variant="outline">Dismiss</jarvis-button><jarvis-button>Book</jarvis-button></div></jarvis-popup>` },
        { title: 'Review workflow and staged footer actions', markup: `<jarvis-popup open heading="Submission review" eyebrow="Release workflow" status="Needs decision" description="Use popup when validation is done and the user needs one final structured decision point." width="34rem" sticky-footer show-overlay="false"><div style="display:grid;gap:1rem;"><div style="display:grid;gap:0.45rem;"><strong>Checks completed</strong><span style="color:var(--jarvis-semantic-text-secondary);">Localization, analytics, accessibility, and release notes are all ready for approval.</span></div><div style="display:grid;gap:0.55rem;padding:0.9rem 1rem;border:1px solid rgba(120,138,164,0.16);border-radius:1rem;background:rgba(248,250,252,0.82);"><strong>Outstanding note</strong><span style="color:var(--jarvis-semantic-text-secondary);">Legal review requested one final screenshot on the changelog page before publication.</span></div></div><div slot="footer"><jarvis-button variant="outline">Request changes</jarvis-button><jarvis-button>Approve release</jarvis-button></div></jarvis-popup>` },
        { title: 'Media layout and fullscreen detail', markup: `<div class="grid cards"><jarvis-popup open heading="Gallery spotlight" eyebrow="Marketing review" status="Ready" width="34rem" max-height="34rem" body-padding="none" show-overlay="false"><div style="display:grid;gap:0;"><div style="min-height:14rem;background:linear-gradient(135deg,#dbeafe,#93c5fd);"></div><div style="padding:1.25rem;display:grid;gap:0.75rem;"><strong>Campaign launch story</strong><p>Use a no-padding body when the top region behaves like a media surface rather than a padded article.</p></div></div><div slot="footer"><jarvis-button variant="outline">Share</jarvis-button><jarvis-button>Publish</jarvis-button></div></jarvis-popup><jarvis-popup open heading="Workspace takeover" eyebrow="Command center" status="Focused" full-screen width="60rem" max-height="40rem" show-overlay="false"><div style="display:grid;grid-template-columns:minmax(14rem,18rem) 1fr;min-height:20rem;"><div style="padding:1.25rem;border-right:1px solid rgba(120,138,164,0.16);display:grid;gap:0.75rem;"><strong>Sections</strong><jarvis-button variant="ghost">Overview</jarvis-button><jarvis-button variant="ghost">Participants</jarvis-button><jarvis-button variant="ghost">Files</jarvis-button></div><div style="padding:1.25rem;display:grid;gap:0.75rem;"><strong>Full-screen popup</strong><p>Use this mode for image review, multi-column workflows, and denser detail pages that still need modal focus.</p></div></div><div slot="footer"><jarvis-button variant="outline">Cancel</jarvis-button><jarvis-button>Continue</jarvis-button></div></jarvis-popup></div>` }
      ];
    case 'jarvis-action-sheet':
      return [
        { title: 'Bottom sheet presentation', markup: `<jarvis-action-sheet open heading="Choose action" description="Use the bottom sheet for mobile-first task actions." width="24rem" value="Review/Request approval" items="Communication/Call||default|Start a voice call.; Communication/Send message||default|Open the threaded composer.; Review/Request approval||success|Notify approvers.; Review/Export summary||default|Send a shareable recap.; Danger/Delete draft||danger|This cannot be undone."></jarvis-action-sheet>` },
        { title: 'Popover presentation', markup: `<jarvis-action-sheet open heading="Choose action" description="Use popover mode when the sheet should stay anchored to a trigger region." presentation="popover" show-handle="false" close-on-outside-click="false" width="22rem" items="Reply/Quick reply||default|Respond with a prepared summary.; Reply/Forward||default|Share with another reviewer.; Organize/Archive||warning|Move this thread out of the active queue.; Organize/Delete||danger|Remove this thread permanently."></jarvis-action-sheet>` },
        { title: 'Remembered action and compact rows', markup: `<jarvis-action-sheet open heading="Recent command" description="Hide descriptions when the command set is already familiar and keep the last choice visibly selected." value="Review/Export summary" show-descriptions="false" width="22rem" items="Review/Request approval||success|Notify approvers.; Review/Export summary||default|Send a shareable recap.; Review/Send to finance||warning|Needs cost-center confirmation.; Danger/Delete draft||danger|This cannot be undone."></jarvis-action-sheet>` },
        { title: 'Approval routing and destructive separation', markup: `<div class="grid cards"><jarvis-action-sheet open heading="Route submission" description="Keep approval, escalation, and destructive actions visually separate when a review step branches." width="24rem" value="Approvals/Request legal review" items="Approvals/Approve now||success|Publish the release immediately.; Approvals/Request legal review||warning|Send the draft back for legal review.; Approvals/Schedule publish||default|Choose a later release window.; Organize/Archive draft||default|Move this draft out of the active queue.; Danger/Delete release||danger|This action permanently removes the release."></jarvis-action-sheet><jarvis-action-sheet open heading="Compact command list" description="Popover mode works well for anchored review actions after validation completes." presentation="popover" show-handle="false" show-cancel-button="false" width="21rem" items="Review/Open summary||default|Inspect the submission summary.; Review/Assign reviewer||default|Route to another approver.; Review/Reject submission||danger|Mark the submission as rejected."></jarvis-action-sheet></div>` }
      ];
    case 'jarvis-breadcrumb':
      return [
        { title: 'Hierarchy', markup: `<jarvis-breadcrumb items="Workspace,Projects,Jarvis UI,Components"></jarvis-breadcrumb>` }
      ];
    case 'jarvis-list':
      return [
        { title: 'Grouped search and toolbar actions', markup: `<div class="grid cards"><jarvis-list items="Hamburg/Hamburg Suites~20099, An Der Alster 82; Hamburg/The Park Hotel~20537, Borstelmannsweg 82; Honolulu/Honolulu Inn~96801, 822 Mauna Loa Rd; Honolulu/Waikiki Beach Hotel~96801, 800 Waikiki Ave" selection-mode="multiple" search-enabled search-mode="startsWith" show-selection-controls show-toolbar show-select-all show-status search-placeholder="Search hotels" selected="Hamburg/Hamburg Suites~20099, An Der Alster 82,Hamburg/The Park Hotel~20537, Borstelmannsweg 82"></jarvis-list><jarvis-list items="Backlog/Prepare 2026 Financial Plan~Assigned to the finance team; Backlog/Update personnel files~Requires HR review; In progress/New website rollout~Coordinate design and engineering; In progress/Comment on revenue projections~Waiting on finance" selection-mode="multiple" show-selection-controls show-toolbar show-select-all show-status selected="Backlog/Prepare 2026 Financial Plan~Assigned to the finance team,In progress/New website rollout~Coordinate design and engineering"></jarvis-list></div>` },
        { title: 'Exact matching and empty-state filtering', markup: `<div class="grid cards"><jarvis-list items="Launch checklist/Confirm analytics wiring~Verify event coverage before release; Launch checklist/Review permissions copy~Confirm the latest localized strings; Launch checklist/QA keyboard navigation~Focus and tab order must be stable" search-enabled search-mode="startsWith" show-toolbar show-status search-placeholder="Filter checklist"></jarvis-list><jarvis-list items="OPS-100/Operations code 100~Primary release queue; OPS-120/Operations code 120~Fallback release queue; OPS-140/Operations code 140~Read-only release archive" search-enabled search-mode="equals" search-placeholder="Type an exact code" empty-state-text="No tasks match the current filter."></jarvis-list></div>` }
      ];
    case 'jarvis-badge':
      return [
        { title: 'Status labels', markup: `<div class="pill-row"><jarvis-badge>Default</jarvis-badge><jarvis-badge tone="success">Ready</jarvis-badge><jarvis-badge tone="warning">Review</jarvis-badge><jarvis-badge tone="danger">Blocked</jarvis-badge></div>` }
      ];
    case 'jarvis-dialog':
      return [
        { title: 'Built-in heading and close-first focus', markup: `<jarvis-dialog open label="Confirm action" heading="Delete item" description="Keep built-in heading and description available for quick confirmation flows." initial-focus="close"><p>This action cannot be undone.</p><div slot="footer"><jarvis-button variant="outline">Cancel</jarvis-button><jarvis-button>Delete</jarvis-button></div></jarvis-dialog>` },
        { title: 'Slotted header and quiet backdrop', markup: `<jarvis-dialog open label="Review request" show-overlay="false" close-on-outside-click="false" size="sm"><div slot="header" style="display:grid;gap:0.35rem;"><strong>Review request</strong><span style="color:var(--jarvis-semantic-text-secondary);font-size:0.92rem;">Use the header slot when the title region needs badges, status, or richer copy.</span></div><p>Dialogs can stay lightweight while still carrying richer decision context.</p><div slot="footer"><jarvis-button variant="outline">Later</jarvis-button><jarvis-button>Approve</jarvis-button></div></jarvis-dialog>` },
        { title: 'Wide dialog and footer workflow', markup: `<jarvis-dialog open label="Workspace review" heading="Quarterly launch review" description="Wider dialogs work for denser content without jumping all the way to popup or full-screen takeover." size="lg" width="46rem"><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;"><div><strong>Summary</strong><p>Confirm launch readiness, owners, and deliverables before publication.</p></div><div><strong>Checks</strong><p>Accessibility, analytics, localization, and legal review are all complete.</p></div></div><div slot="footer"><jarvis-button variant="outline">Request changes</jarvis-button><jarvis-button>Approve launch</jarvis-button></div></jarvis-dialog>` }
      ];
    case 'jarvis-drawer':
      return [
        { title: 'Drawer layout', markup: `<jarvis-drawer open side="right" label="Project drawer"><span slot="header">Project details</span><p>Use drawers for secondary detail and contextual actions.</p><div slot="footer"><jarvis-button variant="outline">Close</jarvis-button></div></jarvis-drawer>` }
      ];
    case 'jarvis-tabs':
      return [
        { title: 'Tab labels', markup: `<jarvis-tabs labels="Overview,Usage,Accessibility"><div>Use tabs to switch related content in place.</div></jarvis-tabs>` }
      ];
    case 'jarvis-tab-panel':
      return [
        { title: 'Left rail and horizontal tab panel', markup: `<div class="grid cards"><jarvis-tab-panel items="Not started,Help needed,In progress,Deferred,Completed" current="2" tab-position="left" show-nav-buttons loop height="24rem" badges="3,1,8,2,0" disabled-tabs="Deferred"></jarvis-tab-panel><jarvis-tab-panel items="Online sales,New website design,Support,Training" current="1" styling-mode="primary" full-width show-nav-buttons badges="12,4,3,1"></jarvis-tab-panel></div>` },
        { title: 'Readonly flow and hidden task meta', markup: `<div class="grid cards"><jarvis-tab-panel items="Intake,Review,Approval,Archive" current="1" read-only height="22rem" show-task-meta="false" badges="2,5,1,0"></jarvis-tab-panel><jarvis-tab-panel items="Overview,Files,Activity" current="0" disabled-tabs="Files" badges="1,7,3" styling-mode="secondary"></jarvis-tab-panel></div>` }
      ];
    case 'jarvis-toolbar':
      return [
        { title: 'Toolbar regions', markup: `<div class="grid cards"><jarvis-toolbar dividers aria-description="Workspace command bar"><jarvis-button slot="start" variant="ghost">Back</jarvis-button><jarvis-badge>Live</jarvis-badge><jarvis-button slot="end">Publish</jarvis-button></jarvis-toolbar><jarvis-toolbar density="compact" sticky justify="start" wrap="false" aria-description="Compact sticky toolbar"><jarvis-button slot="start" variant="ghost">Refresh</jarvis-button><jarvis-chip>Compact</jarvis-chip><jarvis-button variant="ghost">Export</jarvis-button><jarvis-button slot="end" variant="outline">Share</jarvis-button></jarvis-toolbar></div>` },
        { title: 'Centered utility cluster and end-aligned actions', markup: `<div class="grid cards"><jarvis-toolbar justify="center" aria-description="Centered workflow toolbar"><jarvis-button variant="ghost">Preview</jarvis-button><jarvis-button variant="ghost">Compare</jarvis-button><jarvis-button variant="ghost">Inspect</jarvis-button></jarvis-toolbar><jarvis-toolbar justify="end" dividers aria-description="End aligned workspace actions"><jarvis-badge slot="start">Review mode</jarvis-badge><jarvis-button variant="outline">Save draft</jarvis-button><jarvis-button>Approve</jarvis-button></jarvis-toolbar></div>` }
      ];
    case 'jarvis-splitter':
      return [
        { title: 'Horizontal and vertical split panes', markup: `<div class="grid cards"><jarvis-splitter position="32" step="4" keyboard-resize-step="8" collapsible start-label="Navigation pane" end-label="Editor pane"><jarvis-surface slot="start"><jarvis-stack><strong>Left pane</strong><p>Navigation and filters live here.</p></jarvis-stack></jarvis-surface><jarvis-surface slot="end"><jarvis-stack><strong>Right pane</strong><p>Main content stretches in the remaining area.</p></jarvis-stack></jarvis-surface></jarvis-splitter><jarvis-splitter orientation="vertical" position="48" step="5" keyboard-resize-step="10" start-label="Top workspace" end-label="Bottom workspace"><jarvis-surface slot="start"><strong>Top pane</strong></jarvis-surface><jarvis-surface slot="end"><strong>Bottom pane</strong></jarvis-surface></jarvis-splitter></div>` }
      ];
    case 'jarvis-resizable':
      return [
        { title: 'Resizable cards and ratio lock', markup: `<div class="grid cards"><jarvis-resizable width="420" height="260" handles="right bottom" step="12" show-size-label><jarvis-surface><jarvis-stack><strong>Resizable panel</strong><p>Drag the handles to resize this surface.</p></jarvis-stack></jarvis-surface></jarvis-resizable><jarvis-resizable width="320" height="240" keep-aspect-ratio handles="right bottom" step="10" show-size-label><jarvis-surface><jarvis-stack><strong>Media ratio lock</strong><p>Aspect ratio stays stable while resizing.</p></jarvis-stack></jarvis-surface></jarvis-resizable></div>` },
        { title: 'Horizontal-only resizing', markup: `<div class="grid cards"><jarvis-resizable width="360" height="220" resize-axis="horizontal" handles="left right" step="16" show-size-label><jarvis-surface><jarvis-stack><strong>Resizable toolbar dock</strong><p>Keyboard arrows and resize handles both respect the horizontal-only constraint.</p></jarvis-stack></jarvis-surface></jarvis-resizable></div>` }
      ];
    case 'jarvis-surface':
      return [
        { title: 'Surface levels', markup: `<div class="grid cards"><jarvis-surface>Default surface</jarvis-surface><jarvis-surface elevated>Elevated surface</jarvis-surface></div>` }
      ];
    case 'jarvis-section':
      return [
        { title: 'Section shell', markup: `<jarvis-section heading="Team settings" description="Keep related controls grouped with a clear title."><jarvis-button slot="actions" variant="outline">Manage</jarvis-button><jarvis-stack><jarvis-input label="Workspace name"></jarvis-input><jarvis-switch label="Enable alerts"></jarvis-switch></jarvis-stack></jarvis-section>` }
      ];
    case 'jarvis-pagination':
      return [
        { title: 'Navigation states', markup: `<div class="pill-row"><jarvis-pagination page="1" total="8"></jarvis-pagination><jarvis-pagination page="4" total="8"></jarvis-pagination><jarvis-pagination page="8" total="8"></jarvis-pagination></div>` }
      ];
    case 'jarvis-spinner':
      return [
        { title: 'Default and labeled loading', markup: `<div class="grid cards"><jarvis-spinner></jarvis-spinner><jarvis-spinner label="Syncing workspace"></jarvis-spinner></div>` },
        { title: 'Loading in status flows', markup: `<div class="grid cards"><jarvis-stack gap="0.85rem" align="start"><jarvis-spinner label="Uploading"></jarvis-spinner><p>Use spinners where work is expected to continue for a moment.</p></jarvis-stack><jarvis-load-indicator label="Fetching latest spec version"></jarvis-load-indicator></div>` }
      ];
    case 'jarvis-skeleton':
      return [
        { title: 'Text placeholder chain', markup: `<div class="grid cards"><jarvis-skeleton width="62%" height="1.4rem"></jarvis-skeleton><jarvis-skeleton width="87%" height="1rem"></jarvis-skeleton><jarvis-skeleton width="72%" height="1rem"></jarvis-skeleton><jarvis-skeleton width="55%" height="0.9rem"></jarvis-skeleton></div>` },
        { title: 'Profile card loading skeleton', markup: `<div class="grid cards"><jarvis-surface><jarvis-stack direction="horizontal" align="center" gap="0.75rem"><jarvis-skeleton width="4rem" height="4rem" radius="50%"></jarvis-skeleton><jarvis-stack><jarvis-skeleton width="9rem" height="1.05rem"></jarvis-skeleton><jarvis-skeleton width="12rem" height="0.9rem"></jarvis-skeleton><jarvis-skeleton width="8rem" height="0.8rem"></jarvis-skeleton></jarvis-stack></jarvis-stack><jarvis-skeleton width="100%" height="4.75rem" radius="0.6rem"></jarvis-skeleton></jarvis-surface></div>` },
      ];
    case 'jarvis-toast':
      return [
        { title: 'Inline notification tones and dismiss actions', markup: `<div class="grid cards"><jarvis-toast tone="success" heading="Saved" icon="check" show-close-button show-timestamp density="compact">All changes are live.</jarvis-toast><jarvis-toast tone="warning" heading="Heads up" show-close-button show-timestamp timestamp="2:14 PM">Review the latest moderation queue.</jarvis-toast><jarvis-toast tone="danger" heading="Error" polite="assertive" show-close-button show-timestamp timestamp="2:16 PM">We could not save your changes.</jarvis-toast></div>` },
        { title: 'Auto-hide progress and stacked presets', markup: `<div class="grid cards"><jarvis-toast heading="Deployment scheduled" duration="4000" show-progress-bar pause-on-hover show-close-button show-timestamp density="compact"><span slot="actions"><jarvis-button size="sm" variant="ghost">Undo</jarvis-button></span>Production rollout begins in 5 minutes.</jarvis-toast><div style="display:grid;gap:0.75rem;"><jarvis-toast tone="neutral" position="inline" stack-index="0" show-icon density="compact">Top-left, top-center, and top-right positions are available for global stacks.</jarvis-toast><jarvis-toast tone="success" position="inline" stack-index="1" show-icon density="compact">Bottom-left, bottom-center, and bottom-right are also supported.</jarvis-toast></div></div>` }
      ];
    case 'jarvis-file-manager':
      return [
        { title: 'Widescreen asset browser', markup: `<jarvis-file-manager current-path="Files/Widescreen"></jarvis-file-manager>` },
        { title: 'Search, preview, and bulk selection', markup: `<jarvis-file-manager current-path="Files/Widescreen" show-search search-placeholder="Search assets" show-preview selection-mode="multiple" allow-rename allow-delete></jarvis-file-manager>` },
        { title: 'Inline file actions and workspace flow', markup: `<jarvis-file-manager current-path="Files/Widescreen" show-search search-placeholder="Search assets" show-preview selection-mode="multiple" allow-create allow-upload allow-rename allow-delete></jarvis-file-manager>` }
      ];
    case 'jarvis-html-editor':
      return [
        { title: 'Editorial document', markup: `<jarvis-html-editor></jarvis-html-editor>` },
        { title: 'Minimal toolbar and source mode', markup: `<jarvis-html-editor show-word-count show-source-toggle toolbar-preset="minimal"></jarvis-html-editor>` },
        { title: 'Full authoring toolbar with blocks and callouts', markup: `<jarvis-html-editor show-word-count show-source-toggle toolbar-preset="full"></jarvis-html-editor>` }
      ];
    case 'jarvis-range-selector':
      return [
        { title: 'House price range', markup: `<jarvis-range-selector heading="Select house price range"></jarvis-range-selector>` },
        { title: 'Plan tiers', markup: `<jarvis-range-selector heading="Select budget envelope" min="500" max="5000" start="1200" end="3600" format="number" ticks="500|Starter;1500|Growth;2500|Scale;3500|Advanced;5000|Enterprise"></jarvis-range-selector>` },
        { title: 'Readonly and stepped planning range', markup: `<div class="grid cards"><jarvis-range-selector heading="Quarterly planning band" min="0" max="100" start="25" end="65" format="number" step="5" min-range="10" max-range="50"></jarvis-range-selector><jarvis-range-selector heading="Locked approved range" min="0" max="100" start="40" end="70" format="number" read-only show-value-labels="false"></jarvis-range-selector></div>` }
      ];
    case 'jarvis-vector-map':
      return [
        { title: 'Nominal GDP overview', markup: `<jarvis-vector-map></jarvis-vector-map>` },
        { title: 'Compact analytics and legend tuning', markup: `<div class="grid cards"><jarvis-vector-map legend-title="GDP bands" value-format="compact" legend-mode="top-regions"></jarvis-vector-map><jarvis-vector-map show-controls="false" show-labels="false" value-format="currency" legend-title="Regional totals" show-routes="false"></jarvis-vector-map></div>` },
        { title: 'Markers, routes, and ranked legend', markup: `<div class="grid cards"><jarvis-vector-map legend-title="Top regions" legend-mode="top-regions" value-format="compact" markers="Toronto|170|160;London|452|170;Shanghai|720|262;Sydney|810|446;Bengaluru|704|350" routes="Atlantic corridor|170|160|452|170;Growth route|452|170|720|262;Pacific route|720|262|810|446;India expansion|720|262|704|350"></jarvis-vector-map></div>` }
      ];
    default:
      return [
        { title: 'Default usage', markup: createDefaultExample(component) }
      ];
    }
  })();

  const generatedItems = buildAutoGeneratedExamples(component);
  const combinedExamples = dedupeGalleryItems([...manifestItems, ...manualItems, ...generatedItems]);
  const fallback = manifestItems.length ? manifestItems : [{ title: 'Default usage', markup: createDefaultExample(component) }];
  return ensureGalleryDepth(component, combinedExamples.length ? combinedExamples : fallback);
}

async function loadManifestData(): Promise<LibraryManifest> {
  try {
    const raw = await readFile(resolve(process.cwd(), '../../packages/jarvis-manifest/generated/library.manifest.json'), 'utf8');
    return JSON.parse(raw) as LibraryManifest;
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      components: componentLibrary,
      charts: chartLibrary
    };
  }
}

function layout(title: string, body: string, data: LibraryManifest, activePath = '/'): string {
  const guideLinks = guidePages
    .map((page) => {
      const path = `/guides/${page.slug}`;
      const isActive = path === activePath;
      return `<li><a class="nav-item${isActive ? ' is-active' : ''}" href="${path}">${escapeHtml(page.title)}</a></li>`;
    })
    .join('');
  const playgroundActive = activePath === '/playground' ? ' class="is-active"' : '';
  const componentGroups = groupComponentsByCategory(data.components)
    .map(
      (group) => `<section class="nav-group"><h3>${escapeHtml(group.label)}</h3><ul>${group.items
        .map((component) => {
          const path = `/components/${component.tag}`;
          const isActive = path === activePath;
          return `<li><a class="nav-item${isActive ? ' is-active' : ''}" href="${path}" data-component-nav="${component.tag}" data-search-target="${escapeHtml(
            `${component.name} ${component.description}`
          )}">${escapeHtml(titleCase(component.name))}</a></li>`;
        })
        .join('')}</ul></section>`
    )
    .join('');
  const chartLinks = data.charts
    .map((chart) => {
      const path = `/charts/${chart.name}`;
      const isActive = path === activePath;
      return `<li><a class="nav-item${isActive ? ' is-active' : ''}" href="${path}" data-search-target="${escapeHtml(
        `${chart.name} ${chart.description}`
      )}">${escapeHtml(titleCase(chart.name))}</a></li>`;
    })
    .join('');

  return `<!doctype html>
<html data-theme-family="generic" data-theme="light" data-density="comfortable">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} | Jarvis UI</title>
    <link rel="stylesheet" href="/jarvis-dist/jarvis/jarvis.css" />
    <script type="module">
      import { defineCustomElements } from '/jarvis-dist/loader/index.js';
      defineCustomElements();
    </script>
    <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs/loader.js" crossorigin="anonymous"></script>
    <style>${themeBundleCss}</style>
    <style>
      :root {
        --bg: var(--jarvis-semantic-surface-canvas);
        --surface: var(--jarvis-semantic-surface-elevated);
        --surface-strong: var(--jarvis-semantic-surface-raised);
        --surface-subtle: var(--jarvis-semantic-surface-sunken);
        --border: var(--jarvis-semantic-border-default);
        --border-strong: var(--jarvis-semantic-border-strong);
        --text: var(--jarvis-semantic-text-primary);
        --text-subtle: var(--jarvis-semantic-text-secondary);
        --accent: var(--jarvis-semantic-action-primaryBg);
        --accent-soft: color-mix(in srgb, var(--jarvis-semantic-action-primaryBg) 12%, transparent);
        --accent-ink: var(--jarvis-semantic-action-primaryBgHover);
        --accent-glow: var(--jarvis-semantic-action-glow);
        --shadow-soft: var(--jarvis-semantic-shadow-soft);
        --shadow-elevated: var(--jarvis-semantic-shadow-elevated);
        --motion-ui: var(--jarvis-semantic-motion-ui);
        --motion-complex: var(--jarvis-semantic-motion-complex);
        --motion-ease: var(--jarvis-semantic-motion-ease);
      }
      * { box-sizing: border-box; }
      body {
        font-family: var(--jarvis-base-font-family-sans);
        margin: 0;
        background:
          radial-gradient(circle at top left, color-mix(in srgb, var(--jarvis-semantic-action-primaryBg) 12%, transparent), transparent 28%),
          radial-gradient(circle at 80% 0%, color-mix(in srgb, var(--jarvis-semantic-text-secondary) 10%, transparent), transparent 24%),
          linear-gradient(180deg, #fbfcff 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: inherit; }
      code { background: #edf2f7; padding: 0.125rem 0.35rem; border-radius: 0.35rem; }
      pre { margin: 0; overflow: auto; background: linear-gradient(180deg, #111827 0%, #0b1220 100%); color: #eff6ff; padding: 1rem; border-radius: 1rem; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04); }
      table { width: 100%; border-collapse: collapse; margin-top: 0.75rem; }
      th, td { padding: 0.85rem 0.75rem; border-top: 1px solid #e7ebf0; text-align: left; vertical-align: top; }
      .shell { display: grid; grid-template-columns: 19rem minmax(0, 1fr); min-height: 100vh; }
      .sidebar {
        background: linear-gradient(180deg, rgba(10, 16, 26, 0.96) 0%, rgba(12, 18, 30, 0.92) 100%);
        color: #e5eef7;
        padding: 1.5rem 1.25rem;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow: auto;
        border-right: 1px solid rgba(255,255,255,0.06);
        backdrop-filter: blur(18px);
      }
      .brand { display: grid; gap: 0.45rem; margin-bottom: 1.5rem; }
      .brand a { text-decoration: none; }
      .brand strong { font-size: 1.2rem; color: #ffffff; letter-spacing: -0.03em; }
      .brand span { color: #9fb0c3; font-size: 0.95rem; }
      .sidebar h2 { margin: 1.35rem 0 0.5rem; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: #89a0b7; }
      .sidebar h3 { margin: 1rem 0 0.35rem; font-size: 0.9rem; color: #c8d7e6; }
      .nav-search-wrap { margin: 0.4rem 0 0.95rem; }
      .nav-search {
        width: 100%;
        border-radius: 0.7rem;
        border: 1px solid rgba(255,255,255,0.2);
        background: rgba(10, 16, 26, 0.92);
        color: #e8f1fb;
        padding: 0.55rem 0.75rem;
        font: inherit;
        min-height: 2.25rem;
      }
      .nav-search:focus-visible {
        outline: none;
        border-color: #4f73ff;
        box-shadow: 0 0 0 3px color-mix(in srgb, #4f73ff 22%, transparent);
      }
      .nav-group { margin-bottom: 0.55rem; }
      .sidebar ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.28rem; }
      .sidebar li a { display: block; padding: 0.35rem 0.55rem; border-radius: 0.7rem; text-decoration: none; color: #d9e5f1; transition: background var(--motion-ui) var(--motion-ease), transform var(--motion-ui) var(--motion-ease), color var(--motion-ui) var(--motion-ease); }
      .sidebar li a.is-hidden { display: none; }
      .sidebar li a.is-active { background: rgba(255,255,255,0.16); color: #ffffff; }
      .sidebar li a:hover { background: rgba(255,255,255,0.07); transform: translateX(2px); color: #ffffff; }
      .sidebar li a.is-active:hover { transform: none; }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        border: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(100%);
        overflow: hidden;
        white-space: nowrap;
      }
      [data-sidebar-empty] { margin: 0.6rem 0 0; }
      main { padding: 2rem clamp(1.25rem, 3vw, 3rem); }
      .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }
      .toolbar-groups {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      .toolbar-group {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
      }
      .toolbar-group label {
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-subtle);
        font-weight: 700;
      }
      .toolbar-select,
      .toolbar-button {
        min-height: 2.7rem;
        border-radius: 0.8rem;
        border: 1px solid var(--border);
        background: var(--surface-strong);
        color: var(--text);
        padding: 0.65rem 0.9rem;
        font: inherit;
        box-shadow: var(--shadow-soft);
      }
      .toolbar-button {
        cursor: pointer;
        font-weight: 600;
      }
      .toolbar-actions {
        display: flex;
        gap: 0.55rem;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .playground-toolbar {
        display: flex;
        gap: 0.6rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .playground-toolbar .toolbar-select {
        min-width: 16rem;
      }
      .playground-card-stack {
        display: grid;
        gap: 0.9rem;
      }
      .playground-card-grid {
        display: grid;
        gap: 0.75rem;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
      }
      .playground-component-card {
        min-height: 15.5rem;
        display: grid;
        grid-template-rows: auto auto 1fr auto auto;
      }
      .playground-component-card .preview {
        margin-bottom: 0.2rem;
      }
      .playground-component-card .preview-render {
        min-height: 8rem;
        display: grid;
        align-content: start;
      }
      .playground-card-actions {
        margin-top: auto;
      }
      .hero {
        background:
          linear-gradient(135deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.92) 40%, rgba(242,247,255,0.88) 100%);
        border: 1px solid var(--border);
        border-radius: 1.5rem;
        padding: 1.8rem;
        margin-bottom: 1rem;
        box-shadow: var(--shadow-elevated);
        display: grid;
        gap: 0.9rem;
        backdrop-filter: blur(18px);
      }
      .hero h1 { margin: 0; font-size: clamp(2.4rem, 4vw, 4.25rem); line-height: 0.96; letter-spacing: -0.05em; }
      .hero p { max-width: 58rem; color: var(--text-subtle); font-size: 1.05rem; margin: 0; line-height: 1.65; }
      .hero-stats { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 0.25rem; }
      .hero-stats span { background: var(--accent-soft); color: var(--accent-ink); padding: 0.55rem 0.85rem; border-radius: 999px; font-weight: 600; border: 1px solid rgba(36, 70, 216, 0.08); box-shadow: inset 0 1px 0 rgba(255,255,255,0.85); }
      .panel {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 1.2rem;
        padding: 1.25rem;
        box-shadow: var(--shadow-soft);
        margin-bottom: 1rem;
        backdrop-filter: blur(14px);
      }
      .grid { display: grid; gap: 1rem; }
      .cards { grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); }
      .card-link {
        display: grid;
        gap: 0.45rem;
        padding: 1rem;
        border: 1px solid var(--border);
        border-radius: 1rem;
        background: linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(250,252,255,0.88) 100%);
        text-decoration: none;
        transition: transform var(--motion-ui) var(--motion-ease), box-shadow var(--motion-ui) var(--motion-ease), border-color var(--motion-ui) var(--motion-ease);
      }
      .card-link:hover { transform: translateY(-4px); border-color: var(--border-strong); box-shadow: 0 22px 48px rgba(16, 24, 40, 0.10); }
      .eyebrow { color: var(--accent); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin: 0; }
      .section-head { display: flex; justify-content: space-between; align-items: end; gap: 1rem; margin-bottom: 0.85rem; }
      .section-head p { margin: 0.25rem 0 0; color: var(--text-subtle); }
      .pill-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
      .pill { display: inline-flex; align-items: center; padding: 0.42rem 0.72rem; border-radius: 999px; background: rgba(255,255,255,0.8); color: #2d3a48; font-size: 0.92rem; border: 1px solid rgba(16,24,40,0.08); box-shadow: inset 0 1px 0 rgba(255,255,255,0.85); }
      .split { display: grid; grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr)); gap: 1rem; }
      .mini-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: 0.85rem; }
      .spec-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); gap: 0.85rem; }
      .option-card { border: 1px solid var(--border); background: var(--surface-subtle); border-radius: 0.9rem; padding: 0.95rem; box-shadow: inset 0 1px 0 rgba(255,255,255,0.7); }
      .option-card strong { display: block; margin-bottom: 0.35rem; }
      .quiet { color: var(--text-subtle); }
      .option-card ul,
      .example-card ul,
      .panel ul {
        margin: 0.35rem 0 0;
        padding-left: 1.1rem;
        line-height: 1.55;
        display: grid;
        gap: 0.25rem;
      }
      .option-card li,
      .example-card li,
      .panel li {
        margin: 0;
      }
      .option-card p,
      .panel p,
      .example-card p,
      .editor-pane p,
      .preview p {
        line-height: 1.55;
      }
      .label { font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-subtle); font-weight: 700; }
      .component-layout { display: grid; grid-template-columns: minmax(0, 1fr) 18rem; gap: 1rem; }
      .toc { position: sticky; top: 1rem; align-self: start; }
      .subnav { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.35rem; }
      .subnav a { text-decoration: none; color: var(--text-subtle); transition: color var(--motion-ui) var(--motion-ease), transform var(--motion-ui) var(--motion-ease); }
      .subnav a:hover { color: var(--accent-ink); transform: translateX(2px); }
      .preview {
        background: linear-gradient(180deg, rgba(247, 249, 252, 0.92) 0%, rgba(240, 245, 250, 0.82) 100%);
        border: 1px solid rgba(36, 70, 216, 0.12);
        border-radius: 1rem;
        padding: 1rem;
        margin-bottom: 0.9rem;
      }
      .overview-stage,
      .example-stage {
        margin-bottom: 0;
      }
      .preview-render {
        border: 1px solid var(--border);
        border-radius: 0.9rem;
        padding: 1rem;
        background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,251,255,0.95) 100%);
        min-height: 5rem;
        display: block;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.72);
        overflow: hidden;
      }
      .preview-render-flow {
        min-height: 7rem;
      }
      .preview-render-stage {
        min-height: 16rem;
        display: grid;
        align-content: start;
      }
      .chart-preview-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(20rem, 0.95fr);
        gap: 1rem;
        align-items: start;
      }
      .chart-preview-stage {
        min-height: 18rem;
      }
      .chart-meta {
        display: grid;
        gap: 0.9rem;
      }
      .chart-family-sections {
        display: grid;
        gap: 1rem;
      }
      .chart-card {
        display: grid;
        gap: 0.8rem;
      }
      .chart-card-preview {
        min-height: 9rem;
        padding: 0.75rem;
      }
      .chart-card-preview svg,
      .chart-preview-stage svg {
        width: 100%;
        height: auto;
        display: block;
      }
      .chart-code-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 1rem;
      }
      .chart-sample pre {
        max-height: 18rem;
        overflow: auto;
      }
      .preview-render > * {
        max-width: 100%;
      }
      .preview-render .grid.cards {
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
      }
      .theme-preview { margin-bottom: 0; padding: 1rem; }
      .example-grid { display: grid; gap: 1rem; }
      .example-card {
        border: 1px solid var(--border);
        border-radius: 1rem;
        padding: 1rem;
        background: linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,251,255,0.92) 100%);
        box-shadow: var(--shadow-soft);
        display: grid;
        gap: 0.9rem;
      }
      .example-card-head {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .example-card-head p {
        margin: 0.35rem 0 0;
        color: var(--text-subtle);
        max-width: 42rem;
      }
      .code-tabs {
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 1rem;
        overflow: hidden;
        background: linear-gradient(180deg, #121a2a 0%, #0b1220 100%);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
      }
      .code-tabs-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.8rem 0.95rem;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        background: linear-gradient(180deg, rgba(20,29,45,0.98) 0%, rgba(15,23,36,0.95) 100%);
        flex-wrap: wrap;
      }
      .code-tab-list,
      .code-tab-actions {
        display: flex;
        gap: 0.45rem;
        flex-wrap: wrap;
      }
      .code-tab,
      .code-action {
        min-height: 2.3rem;
        border-radius: 0.75rem;
        border: 1px solid rgba(148, 163, 184, 0.24);
        background: rgba(15, 23, 36, 0.7);
        color: #d9e7f7;
        font: inherit;
        padding: 0.45rem 0.8rem;
        cursor: pointer;
        transition: border-color var(--motion-ui) var(--motion-ease), background var(--motion-ui) var(--motion-ease), transform var(--motion-ui) var(--motion-ease);
      }
      .code-tab:hover,
      .code-action:hover {
        border-color: rgba(125, 170, 255, 0.42);
        transform: translateY(-1px);
      }
      .code-tab.is-active {
        background: rgba(54, 93, 220, 0.22);
        border-color: rgba(125, 170, 255, 0.46);
        color: #ffffff;
      }
      .code-tabs pre {
        display: none;
        margin: 0;
        border-radius: 0;
        background: transparent;
        max-height: 24rem;
        overflow: auto;
      }
      .code-tabs pre.is-active {
        display: block;
      }
      .editor-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(22rem, 30rem); gap: 1rem; }
      .editor-pane { display: grid; gap: 0.6rem; }
      .code-pane-head {
        display: grid;
        gap: 0.2rem;
      }
      .editor-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
      .code-editor {
        display: none;
      }
      .code-editor-fallback {
        width: 100%;
        min-height: 22rem;
        border: 1px solid var(--border);
        border-radius: 1rem;
        padding: 1rem;
        resize: vertical;
        background: linear-gradient(180deg, #111827 0%, #0b1220 100%);
        color: #eff6ff;
        font: 500 0.93rem/1.55 "JetBrains Mono", "Cascadia Code", monospace;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
      }
      .code-editor-monaco {
        display: none;
        width: 100%;
        min-height: 22rem;
        border-radius: 1rem;
        border: 1px solid var(--border);
        overflow: hidden;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
      }
      .monaco-banner {
        font-size: 0.82rem;
        color: var(--text-subtle);
        border: 1px solid rgba(148, 163, 184, 0.35);
        border-radius: 0.7rem;
        padding: 0.55rem 0.7rem;
        background: rgba(15, 23, 36, 0.82);
        color: #d8e6ff;
        margin-bottom: 0.55rem;
      }
      .monaco-ready .code-editor-fallback {
        display: none;
      }
      .editor-pane.monaco-enabled .code-editor-monaco {
        display: block;
      }
      .editor-pane.monaco-enabled .code-editor-fallback {
        display: none;
      }
      .live-preview { min-height: 14rem; }
      h1, h2, h3, h4, p { margin-top: 0; }
      @media (prefers-reduced-motion: no-preference) {
        .hero,
        .panel,
        .card-link,
        .option-card {
          animation: jarvis-docs-fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      }
      @keyframes jarvis-docs-fade-up {
        from { opacity: 0; transform: translateY(10px) scale(0.985); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @media (max-width: 900px) {
        .shell { grid-template-columns: 1fr; }
        .sidebar { height: auto; position: static; }
      }
      @media (max-width: 1100px) {
        .component-layout,
        .chart-preview-grid { grid-template-columns: 1fr; }
        .toc { position: static; }
        .editor-layout { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <a href="/"><strong>Jarvis UI</strong></a>
          <span>Cross-framework components, tokens, AI metadata, and Mystique charting.</span>
        </div>
        <div class="nav-search-wrap">
          <label for="sidebar-search" class="visually-hidden">Find component or chart</label>
          <input id="sidebar-search" class="nav-search" placeholder="Search components and charts" data-nav-search type="text" />
        </div>
        <h2>Foundations</h2>
        <ul>${guideLinks}</ul>
        <h2>Playground</h2>
        <ul><li><a href="/playground"${playgroundActive}>Interactive playground</a></li></ul>
        <h2>Components</h2>
        ${componentGroups}
        <h2>Charts</h2>
        <section class="nav-group"><ul>${chartLinks}</ul></section>
        <p class="quiet" data-sidebar-empty hidden>No matches found. Try a shorter search term.</p>
      </aside>
      <main>
        <section class="toolbar panel">
          <div>
            <p class="eyebrow">Theme lab</p>
            <h2 style="margin-bottom:0.2rem;">Switch design language live</h2>
            <p class="quiet">Use DevExpress-style base themes to compare the same Jarvis component across Generic, Material, and Fluent foundations.</p>
          </div>
          <div class="toolbar-groups">
            <div class="toolbar-group">
              <label for="theme-family">Theme family</label>
              <select class="toolbar-select" id="theme-family" data-theme-family-switcher>
                ${tokenGuide.families.map((family) => `<option value="${family.name}">${escapeHtml(titleCase(family.name))}</option>`).join('')}
              </select>
            </div>
            <div class="toolbar-group">
              <label for="theme-mode">Mode</label>
              <select class="toolbar-select" id="theme-mode" data-theme-switcher>
                ${tokenGuide.themes.map((theme) => `<option value="${theme.name}">${escapeHtml(titleCase(theme.name))}</option>`).join('')}
              </select>
            </div>
            <div class="toolbar-group">
              <label for="density-mode">Density</label>
              <select class="toolbar-select" id="density-mode" data-density-switcher>
                ${tokenGuide.density.map((density) => `<option value="${density.name}">${escapeHtml(titleCase(density.name))}</option>`).join('')}
              </select>
            </div>
          </div>
        </section>
        ${body}
      </main>
    </div>
    <script>
      (() => {
        const root = document.documentElement;
        const storageKeys = {
          family: 'jarvis-docs-theme-family',
          theme: 'jarvis-docs-theme',
          density: 'jarvis-docs-density'
        };

        const familySelect = document.querySelector('[data-theme-family-switcher]');
        const themeSelect = document.querySelector('[data-theme-switcher]');
        const densitySelect = document.querySelector('[data-density-switcher]');

        const applyThemeState = () => {
          const family = localStorage.getItem(storageKeys.family) || 'generic';
          const theme = localStorage.getItem(storageKeys.theme) || 'light';
          const density = localStorage.getItem(storageKeys.density) || 'comfortable';
          root.dataset.themeFamily = family;
          root.dataset.theme = theme;
          root.dataset.density = density;
          if (familySelect) familySelect.value = family;
          if (themeSelect) themeSelect.value = theme;
          if (densitySelect) densitySelect.value = density;
        };

        applyThemeState();

        const applyNavSearch = () => {
          const searchInput = document.querySelector('[data-nav-search]');
          const emptyState = document.querySelector('[data-sidebar-empty]');
          if (!(searchInput instanceof HTMLInputElement) || !(emptyState instanceof HTMLElement)) {
            return;
          }

          const query = searchInput.value.trim().toLowerCase();
          let visibleCount = 0;

          document.querySelectorAll('[data-component-nav],[href^="/charts/"],[href^="/guides/"],[href="/playground"]').forEach((node) => {
            if (!(node instanceof HTMLAnchorElement)) {
              return;
            }
            const searchable = ((node.textContent ?? '') + ' ' + (node.getAttribute('data-search-target') ?? '')).toLowerCase();
            const shouldHide = query.length > 0 && !searchable.includes(query);
            node.classList.toggle('is-hidden', shouldHide);
            if (!shouldHide) {
              visibleCount += 1;
            }
          });

          emptyState.hidden = query.length === 0 || visibleCount > 0;
        };

        const applyPlaygroundFilters = () => {
          const searchInput = document.querySelector('[data-playground-search]');
          const categoryFilter = document.querySelector('[data-playground-category]');
          const emptyState = document.querySelector('[data-playground-empty]');
          if (!searchInput || !emptyState) {
            return;
          }

          const query = (searchInput instanceof HTMLInputElement ? searchInput.value : '').trim().toLowerCase();
          const selectedCategory = categoryFilter instanceof HTMLSelectElement ? categoryFilter.value : 'all';

          let visibleCount = 0;
          document.querySelectorAll('[data-playground-card]').forEach((card) => {
            if (!(card instanceof HTMLElement)) {
              return;
            }

            const rawName = card.dataset.playgroundName?.toLowerCase() ?? '';
            const rawDescription = card.dataset.playgroundDescription?.toLowerCase() ?? '';
            const rawTag = card.dataset.playgroundTag?.toLowerCase() ?? '';
            const category = card.dataset.playgroundCategory ?? '';
            const matchesSearch = !query || rawName.includes(query) || rawDescription.includes(query) || rawTag.includes(query);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            const shouldHide = !(matchesSearch && matchesCategory);

            card.classList.toggle('is-hidden', shouldHide);
            if (!shouldHide) {
              visibleCount += 1;
            }
          });
          document.querySelectorAll('[data-playground-category-group]').forEach((section) => {
            if (!(section instanceof HTMLElement)) {
              return;
            }
            const visibleCards = section.querySelectorAll('[data-playground-card]:not(.is-hidden)').length;
            section.classList.toggle('is-hidden', visibleCards === 0);
          });

          emptyState.hidden = visibleCount > 0;
        };

        const decodeMystiquePayload = (raw) => {
          try {
            return JSON.parse(atob(raw));
          } catch {
            return null;
          }
        };

        const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);

        const escapeMystiqueText = (value) =>
          String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;');

        const hydrateMystiqueCharts = (scope = document) => {
          const runtimes = scope.matches?.('[data-mystique-runtime]')
            ? [scope, ...scope.querySelectorAll?.('[data-mystique-runtime]') ?? []]
            : Array.from(scope.querySelectorAll?.('[data-mystique-runtime]') ?? []);

          runtimes.forEach((runtime) => {
            if (!(runtime instanceof HTMLElement) || runtime.dataset.mystiqueRuntimeMounted === 'true') {
              return;
            }

            const payload = decodeMystiquePayload(runtime.dataset.mystiqueRuntimePayload ?? '');
            const surface = runtime.querySelector('[data-mystique-surface]');
            const viewport = runtime.querySelector('[data-mystique-viewport]');
            const tooltip = runtime.querySelector('[data-mystique-tooltip]');
            const crosshairX = runtime.querySelector('[data-mystique-crosshair-x]');
            const crosshairY = runtime.querySelector('[data-mystique-crosshair-y]');
            const focus = runtime.querySelector('[data-mystique-focus]');
            const brush = runtime.querySelector('[data-mystique-brush]');
            const status = runtime.querySelector('[data-mystique-status]');
            if (!payload || !(surface instanceof HTMLElement) || !(viewport instanceof HTMLElement) || !(tooltip instanceof HTMLElement) || !(crosshairX instanceof HTMLElement) || !(crosshairY instanceof HTMLElement) || !(focus instanceof HTMLElement) || !(brush instanceof HTMLElement) || !(status instanceof HTMLElement)) {
              return;
            }

            runtime.dataset.mystiqueRuntimeMounted = 'true';

            let zoom = 1;
            let pinnedAnchor = null;
            let brushing = false;
            let brushStart = null;

            const scaledAnchor = (anchor) => ({
              ...anchor,
              x: anchor.x * (surface.clientWidth / Math.max(payload.width, 1)),
              y: anchor.y * (surface.clientHeight / Math.max(payload.height, 1))
            });

            const setStatus = (message) => {
              status.textContent = message;
            };

            const applyZoom = () => {
              viewport.style.transform = 'scale(' + zoom + ')';
            };

            const hideFocus = () => {
              tooltip.hidden = true;
              crosshairX.hidden = true;
              crosshairY.hidden = true;
              focus.hidden = true;
            };

            const showAnchor = (anchor, pinned = false) => {
              const scaled = scaledAnchor(anchor);
              crosshairX.hidden = false;
              crosshairY.hidden = false;
              focus.hidden = false;
              crosshairX.style.left = scaled.x + 'px';
              crosshairY.style.top = scaled.y + 'px';
              focus.style.left = scaled.x + 'px';
              focus.style.top = scaled.y + 'px';
              tooltip.hidden = false;
              tooltip.innerHTML = '<strong style="display:block;font-size:0.76rem;margin-bottom:0.18rem;">' + escapeMystiqueText(anchor.label) + '</strong><span style="display:block;color:rgba(226,232,240,0.84);">' + escapeMystiqueText(anchor.summary) + '</span>';
              const tooltipWidth = tooltip.offsetWidth || 220;
              const left = clampValue(scaled.x, tooltipWidth / 2 + 10, surface.clientWidth - tooltipWidth / 2 - 10);
              const top = clampValue(scaled.y - 12, 24, surface.clientHeight - 12);
              tooltip.style.left = left + 'px';
              tooltip.style.top = top + 'px';
              setStatus(payload.drilldown && pinned ? 'Drill focus: ' + anchor.label : pinned ? 'Pinned: ' + anchor.label : 'Inspecting ' + anchor.label);
              surface.style.boxShadow = payload.drilldown && pinned ? '0 0 0 1px rgba(14,165,233,0.26), 0 22px 60px rgba(14,165,233,0.12)' : '';
            };

            const nearestAnchor = (x, y) =>
              payload.anchors
                .map((anchor) => scaledAnchor(anchor))
                .reduce(
                  (best, anchor) => {
                    const distance = Math.hypot(anchor.x - x, anchor.y - y);
                    return distance < best.distance ? { anchor, distance } : best;
                  },
                  { anchor: null, distance: Number.POSITIVE_INFINITY }
                ).anchor;

            const finishBrushSelection = (x, y) => {
              if (!brushStart) {
                return;
              }

              const left = Math.min(brushStart.x, x);
              const top = Math.min(brushStart.y, y);
              const right = Math.max(brushStart.x, x);
              const bottom = Math.max(brushStart.y, y);
              const selected = payload.anchors.filter((anchor) => {
                const scaled = scaledAnchor(anchor);
                return scaled.x >= left && scaled.x <= right && scaled.y >= top && scaled.y <= bottom;
              });

              brushing = false;
              brushStart = null;
              brush.hidden = true;

              if (selected.length) {
                pinnedAnchor = selected[0];
                showAnchor(selected[0], true);
                setStatus(payload.drilldown ? 'Drill focus ready from ' + selected.length + ' selected point' + (selected.length === 1 ? '' : 's') : selected.length + ' point' + (selected.length === 1 ? '' : 's') + ' selected');
              } else if (!pinnedAnchor) {
                hideFocus();
                setStatus('Hover to inspect, click to pin, Shift+drag to brush-select.');
              }
            };

            surface.addEventListener('pointermove', (event) => {
              const rect = surface.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;

              if (brushing && brushStart) {
                const left = Math.min(brushStart.x, x);
                const top = Math.min(brushStart.y, y);
                brush.hidden = false;
                brush.style.left = left + 'px';
                brush.style.top = top + 'px';
                brush.style.width = Math.abs(x - brushStart.x) + 'px';
                brush.style.height = Math.abs(y - brushStart.y) + 'px';
                setStatus('Brush selecting points...');
                return;
              }

              if (pinnedAnchor) {
                return;
              }

              const anchor = nearestAnchor(x, y);
              if (anchor) {
                showAnchor(anchor);
              }
            });

            surface.addEventListener('pointerleave', () => {
              if (!pinnedAnchor && !brushing) {
                hideFocus();
                setStatus('Hover to inspect, click to pin, Shift+drag to brush-select.');
              }
            });

            surface.addEventListener('click', (event) => {
              const rect = surface.getBoundingClientRect();
              const anchor = nearestAnchor(event.clientX - rect.left, event.clientY - rect.top);
              if (!anchor) {
                return;
              }
              pinnedAnchor = anchor;
              showAnchor(anchor, true);
            });

            surface.addEventListener('dblclick', () => {
              pinnedAnchor = null;
              brush.hidden = true;
              hideFocus();
              setStatus('Focus cleared.');
              surface.style.boxShadow = '';
            });

            surface.addEventListener('pointerdown', (event) => {
              if (!event.shiftKey) {
                return;
              }
              const rect = surface.getBoundingClientRect();
              brushing = true;
              brushStart = { x: event.clientX - rect.left, y: event.clientY - rect.top };
              brush.hidden = false;
              brush.style.left = brushStart.x + 'px';
              brush.style.top = brushStart.y + 'px';
              brush.style.width = '0px';
              brush.style.height = '0px';
              if (surface.setPointerCapture) {
                surface.setPointerCapture(event.pointerId);
              }
            });

            surface.addEventListener('pointerup', (event) => {
              if (!brushing) {
                return;
              }
              const rect = surface.getBoundingClientRect();
              finishBrushSelection(event.clientX - rect.left, event.clientY - rect.top);
              if (surface.releasePointerCapture) {
                surface.releasePointerCapture(event.pointerId);
              }
            });

            runtime.querySelectorAll('[data-mystique-zoom]').forEach((button) => {
              button.addEventListener('click', () => {
                const action = button.getAttribute('data-mystique-zoom');
                if (action === 'in') {
                  zoom = clampValue(zoom + 0.2, 0.8, 2.4);
                  applyZoom();
                  setStatus('Zoom ' + zoom.toFixed(1) + 'x');
                  return;
                }
                if (action === 'out') {
                  zoom = clampValue(zoom - 0.2, 0.8, 2.4);
                  applyZoom();
                  setStatus('Zoom ' + zoom.toFixed(1) + 'x');
                  return;
                }

                zoom = 1;
                pinnedAnchor = null;
                applyZoom();
                hideFocus();
                brush.hidden = true;
                surface.style.boxShadow = '';
                setStatus('View reset.');
              });
            });
          });
        };

        applyNavSearch();
        document.querySelector('[data-nav-search]')?.addEventListener('input', applyNavSearch);
        applyPlaygroundFilters();
        document.querySelector('[data-playground-search]')?.addEventListener('input', applyPlaygroundFilters);
        document.querySelector('[data-playground-category]')?.addEventListener('change', applyPlaygroundFilters);
        hydrateMystiqueCharts(document);

        familySelect?.addEventListener('change', (event) => {
          localStorage.setItem(storageKeys.family, event.target.value);
          applyThemeState();
        });
        themeSelect?.addEventListener('change', (event) => {
          localStorage.setItem(storageKeys.theme, event.target.value);
          applyThemeState();
        });
        densitySelect?.addEventListener('change', (event) => {
          localStorage.setItem(storageKeys.density, event.target.value);
          applyThemeState();
        });

        const activateCodeTab = (container, tabName) => {
          container.querySelectorAll('[data-code-tab]').forEach((button) => {
            const isActive = button.getAttribute('data-code-tab') === tabName;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-selected', String(isActive));
          });
          container.querySelectorAll('[data-code-panel]').forEach((panel) => {
            panel.classList.toggle('is-active', panel.getAttribute('data-code-panel') === tabName);
          });
        };

        document.querySelectorAll('[data-code-tabs]').forEach((container) => {
          const defaultTab = container.getAttribute('data-default-tab') || 'web';
          activateCodeTab(container, defaultTab);

          container.querySelectorAll('[data-code-tab]').forEach((button) => {
            button.addEventListener('click', () => {
              activateCodeTab(container, button.getAttribute('data-code-tab'));
            });
          });

          const copyButton = container.querySelector('[data-code-copy]');
          copyButton?.addEventListener('click', async () => {
            const activePanel = container.querySelector('[data-code-panel].is-active code');
            const text = activePanel?.textContent ?? '';
            if (!text) {
              return;
            }
            await navigator.clipboard.writeText(text);
            copyButton.textContent = 'Copied';
            setTimeout(() => {
              copyButton.textContent = 'Copy code';
            }, 1200);
          });
        });

        const monacoEditors = new Map();
        const editorMounts = [];

        const getFallbackEditor = (id) => {
          const node = document.querySelector('[data-playground-editor-fallback="' + id + '"]');
          return node instanceof HTMLTextAreaElement ? node : null;
        };

        const getEditorValue = (id) => {
          const monacoEditor = monacoEditors.get(id);
          const fallbackEditor = getFallbackEditor(id);
          return monacoEditor ? monacoEditor.getValue() : fallbackEditor?.value ?? '';
        };

        const setEditorBanner = (id, text) => {
          const banner = document.querySelector('[data-playground-editor-label="' + id + '"]');
          if (banner) {
            banner.textContent = text;
          }
        };

        const setEditorValue = (id, code) => {
          const monacoEditor = monacoEditors.get(id);
          const fallbackEditor = getFallbackEditor(id);
          if (monacoEditor) {
            monacoEditor.setValue(code);
          } else if (fallbackEditor) {
            fallbackEditor.value = code;
          }
        };

        const renderPlaygroundOutput = (id, code) => {
          const output = document.querySelector('[data-playground-output="' + id + '"]');
          if (output) {
            output.innerHTML = code;
            hydrateMystiqueCharts(output);
          }
        };

        const runPlayground = (id) => {
          renderPlaygroundOutput(id, getEditorValue(id));
        };

        const attachEditorActions = (id, initialCode, outputExists = true) => {
          const runButton = document.querySelector('[data-editor-run="' + id + '"]');
          const resetButton = document.querySelector('[data-editor-reset="' + id + '"]');
          const copyButton = document.querySelector('[data-editor-copy="' + id + '"]');

          if (runButton) {
            runButton.addEventListener('click', () => runPlayground(id));
          }
          if (resetButton) {
            resetButton.addEventListener('click', () => {
              setEditorValue(id, initialCode);
              runPlayground(id);
            });
          }
          if (copyButton) {
            copyButton.addEventListener('click', async () => {
              await navigator.clipboard.writeText(getEditorValue(id));
              copyButton.textContent = 'Copied';
              setTimeout(() => {
                copyButton.textContent = 'Copy';
              }, 1200);
            });
          }
          if (outputExists) {
            renderPlaygroundOutput(id, initialCode);
          }
        };

        document.querySelectorAll('[data-playground-editor]').forEach((host) => {
          const id = host.getAttribute('data-playground-editor');
          const fallbackEditor = getFallbackEditor(id);
          if (!id || !fallbackEditor) {
            return;
          }

          const initialCode = fallbackEditor.value;
          editorMounts.push({ id, host, initialCode });
          attachEditorActions(id, initialCode);
          setEditorBanner(id, 'Monaco editor ready when available (or text fallback).');
        });

        const bootstrapMonaco = () => {
          const requireJs = window.require;
          if (!requireJs) {
            document.querySelectorAll('[data-playground-editor-label]').forEach((banner) => {
              banner.textContent = 'Text editor enabled. Monaco CDN is unavailable.';
            });
            return;
          }

          if (window.monaco && window.monaco.editor) {
            mountMonacoEditors();
            return;
          }

          requireJs.config({
            paths: {
              vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs'
            }
          });
          requireJs(['vs/editor/editor.main'], mountMonacoEditors);
        };

        const mountMonacoEditors = () => {
          if (!window.monaco || !window.monaco.editor) {
            return;
          }

          editorMounts.forEach((item) => {
            if (!(item.host instanceof HTMLElement)) {
              return;
            }
            const id = item.id;
            const fallbackEditor = getFallbackEditor(id);
            if (!fallbackEditor) {
              return;
            }
            if (monacoEditors.has(id)) {
              return;
            }

            const editor = window.monaco.editor.create(item.host, {
              value: fallbackEditor.value,
              language: 'html',
              theme: 'vs-dark',
              automaticLayout: true,
              minimap: { enabled: false },
              fontFamily: '"JetBrains Mono", "Cascadia Code", monospace',
              fontSize: 13,
              lineNumbers: 'on',
              folding: true,
              renderLineHighlight: 'all',
              scrollBeyondLastLine: false
            });

            monacoEditors.set(id, editor);
            const pane = item.host.closest('.editor-pane');
            pane?.classList.add('monaco-enabled');
            editor.getModel()?.onDidChangeContent(() => {
              renderPlaygroundOutput(id, editor.getValue());
            });
            setEditorBanner(id, 'Monaco editor (syntax highlighted, HTML mode).');
          });
        };

        if (window.monaco) {
          mountMonacoEditors();
        } else {
          bootstrapMonaco();
        }

        document.querySelectorAll('[data-load-example-editor]').forEach((button) => {
          button.addEventListener('click', () => {
            const editorId = button.getAttribute('data-load-example-editor');
            const sourceId = button.getAttribute('data-example-source');
            const source = document.querySelector('[data-example-markup="' + sourceId + '"]');
            const output = document.querySelector('[data-playground-output="' + editorId + '"]');

            if (!(source instanceof HTMLTextAreaElement) || !editorId) {
              return;
            }

            setEditorValue(editorId, source.value);
            if (output) {
              output.innerHTML = source.value;
            }
            document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });

        const loadSourceIntoGlobalPlayground = () => {
          const select = document.querySelector('[data-global-component-select]');
          if (!(select instanceof HTMLSelectElement)) {
            return;
          }

          const sourceId = 'playground-source-' + select.value;
          const source = document.querySelector('[data-example-markup="' + CSS.escape(sourceId) + '"]');
          const output = document.querySelector('[data-playground-output="global-playground"]');

          if (!(source instanceof HTMLTextAreaElement)) {
            return;
          }

          setEditorValue('global-playground', source.value);
          if (output) {
            output.innerHTML = source.value;
          }
          document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        document.querySelector('[data-load-global-component]')?.addEventListener('click', loadSourceIntoGlobalPlayground);
        document.querySelector('[data-global-component-select]')?.addEventListener('change', loadSourceIntoGlobalPlayground);
      })();
    </script>
  </body>
</html>`;
}

function createPlaygroundSourceId(tag: string): string {
  return `playground-source-${tag}`;
}

function renderHome(data: LibraryManifest): string {
  const componentGroups = groupComponentsByCategory(data.components);
  return layout(
    'Home',
    `<section class="hero">
      <p class="eyebrow">Design system website</p>
      <h1>Build with Jarvis UI and Mystique charts</h1>
      <p>Jarvis UI provides token-driven Web Components with framework wrappers, manifest-backed docs, and AI-safe metadata. Mystique provides standards-aligned charting primitives designed to match the same system.</p>
      <div class="hero-stats">
        <span>${data.components.length} components</span>
        <span>${data.charts.length} chart types</span>
        <span>React, Angular, Vue, and Web Components</span>
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Foundations</p>
          <h2>Start with principles and setup</h2>
          <p>These guides cover installation, tokens, accessibility, frameworks, AI usage, and design-to-code flow.</p>
        </div>
      </div>
      <div class="grid cards">
        ${guidePages.map((page) => `<a class="card-link" href="/guides/${page.slug}"><span class="label">Guide</span><strong>${escapeHtml(page.title)}</strong><p class="quiet">${escapeHtml(page.summary)}</p></a>`).join('')}
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Components</p>
          <h2>Browse by category</h2>
          <p>Each component page shows overview, options, states, anatomy, accessibility guidance, and framework usage.</p>
        </div>
      </div>
      <div class="grid">
        ${componentGroups
          .map(
            (group) => `<section class="panel">
              <div class="section-head">
                <div>
                  <p class="eyebrow">Category</p>
                  <h3>${escapeHtml(group.label)}</h3>
                </div>
              </div>
              <div class="grid cards">
                ${group.items
                  .map((component) => `<a class="card-link" href="/components/${component.tag}"><strong>${escapeHtml(titleCase(component.name))}</strong><p class="quiet">${escapeHtml(component.description)}</p></a>`)
                  .join('')}
              </div>
            </section>`
          )
          .join('')}
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Charts</p>
          <h2>Analytical building blocks</h2>
          <p>Mystique chart pages explain renderer choices, interaction model, and composition guidance.</p>
        </div>
      </div>
      <div class="grid cards">
        ${data.charts.map((chart) => `<a class="card-link" href="/charts/${chart.name}"><span class="label">${escapeHtml(chart.renderer)}</span><strong>${escapeHtml(titleCase(chart.name))}</strong><p class="quiet">${escapeHtml(chart.description)}</p></a>`).join('')}
      </div>
    </section>`,
    data
  );
}

function renderGuide(slug: string, data: LibraryManifest): string {
  const page = guidePages.find((item) => item.slug === slug);
  if (!page) {
    return renderNotFound(data);
  }

  const frameworkSection =
    slug === 'frameworks'
      ? `<section class="panel">
          <h2>Framework Examples</h2>
          ${Object.values(frameworkGuides)
            .map(
              (framework) => {
                const registration = 'registration' in framework.notes ? framework.notes.registration : framework.notes.ssr;
                return `
                <article class="panel">
                  <p class="eyebrow">${framework.title}</p>
                  <p><strong>Registration:</strong> ${registration}</p>
                  <p><strong>Events:</strong> ${renderInlineCodes(framework.notes.events)}</p>
                  <p><strong>Forms:</strong> ${framework.notes.forms}</p>
                  <p><strong>SSR:</strong> ${framework.notes.ssr}</p>
                  <pre><code>${framework.example.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                </article>
              `;
              }
            )
            .join('')}
        </section>`
      : '';
  const tokenSection =
    slug === 'theming'
      ? `<section class="panel">
          <h2>Theme Selectors</h2>
          <p><strong>Themes:</strong> ${tokenGuide.themes.map((theme) => `<code>${theme.selector}</code>`).join(' ')}</p>
          <p><strong>Theme families:</strong> ${tokenGuide.families.map((family) => `<code>${family.selector}</code>`).join(' ')}</p>
          <p><strong>Density:</strong> ${tokenGuide.density.map((density) => `<code>${density.selector}</code>`).join(' ')}</p>
          <h2>Featured Tokens</h2>
          <table>
            <thead><tr><th>Token</th><th>CSS Variable</th><th>Value</th><th>Type</th></tr></thead>
            <tbody>
              ${tokenGuide.featuredTokens
                .map(
                  (token) =>
                    `<tr><td><code>${token.key}</code></td><td><code>${token.cssVariable}</code></td><td>${token.value}</td><td>${token.type}</td></tr>`
                )
                .join('')}
            </tbody>
          </table>
        </section>`
      : '';
  const sharedGuideSection =
    slug === 'accessibility'
      ? `<section class="panel">
          <h2>A11y Package Guidance</h2>
          <h3>Focus</h3>
          ${renderRows(sharedGuides.a11y.focus, 'No focus guidance documented.')}
          <h3>Overlays</h3>
          ${renderRows(sharedGuides.a11y.overlays, 'No overlay guidance documented.')}
          <h3>Live Regions</h3>
          ${renderRows(sharedGuides.a11y.liveRegions, 'No live region guidance documented.')}
        </section>`
      : slug === 'i18n'
        ? `<section class="panel">
            <h2>I18n Package Guidance</h2>
            <h3>Locale</h3>
            ${renderRows(sharedGuides.i18n.locale, 'No locale guidance documented.')}
            <h3>Formatting</h3>
            ${renderRows(sharedGuides.i18n.formatting, 'No formatting guidance documented.')}
            <h3>Direction</h3>
            ${renderRows(sharedGuides.i18n.direction, 'No direction guidance documented.')}
          </section>`
        : '';

  return layout(
    page.title,
    `<section class="panel">
      <p class="eyebrow">Guide</p>
      <h1>${page.title}</h1>
      <p>${page.summary}</p>
      ${page.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
    </section>
    ${frameworkSection}
    ${tokenSection}
    ${sharedGuideSection}`,
    data
  );
}

function renderComponent(component: ComponentManifestEntry, data: LibraryManifest): string {
  const options = deriveOptions(component.props);
  const states = deriveStates(component.props);
  const example = createDefaultExample(component);
  const themeShowcaseMarkup = createThemeShowcaseMarkup(component);
  const frameworkExamples = createFrameworkExamples(component, example);
  const variantGallery = ensureGalleryDepth(component, createVariantGallery(component));
  const playgroundId = createPlaygroundId(component);
  const quickUseCases = component.compositionRules.slice(0, 3).map(escapeHtml);
  const tocItems = [
    ['#overview', 'Overview'],
    ['#gallery', 'Visual gallery'],
    ['#themes', 'Theme comparison'],
    ['#frameworks', 'Framework usage'],
    ['#playground', 'Edit and play'],
    ['#usage', 'Usage'],
    ['#options', 'Options'],
    ['#specs', 'Specs'],
    ['#api', 'API'],
    ['#quality', 'Accessibility and responsive']
  ] as Array<[string, string]>;

  return layout(
    component.tag,
    `<section class="hero">
      <p class="eyebrow">${escapeHtml(componentCategoryLabels[component.category] ?? titleCase(component.category))}</p>
      <h1>${escapeHtml(titleCase(component.name))}</h1>
      <p>${escapeHtml(component.description)}</p>
      ${quickUseCases.length ? `<p class="quiet">Best for: ${quickUseCases.join(' • ')}</p>` : ''}
      <div class="hero-stats">
        <span>${component.props.length} props</span>
        <span>${component.parts.length} parts</span>
        <span>${component.slots.length} slots</span>
        <span>${component.events.length} events</span>
      </div>
    </section>
    <div class="component-layout">
      <div>
        <section class="panel" id="overview">
          <div class="section-head">
            <div>
              <p class="eyebrow">Overview</p>
              <h2>Preview, purpose, and quick guidance</h2>
              <p>Start here for the component’s primary use, then move into the example cards for richer scenarios and copyable code.</p>
            </div>
          </div>
          <div class="split">
            <div class="preview overview-stage">
              <div class="preview-render preview-render-stage">${example}</div>
            </div>
            <div class="grid">
              <article class="option-card">
                <strong>Best for</strong>
                ${renderRows(
                  component.compositionRules.length
                    ? component.compositionRules.slice(0, 3)
                    : [`Use ${component.name} when its semantics match the interaction you need.`],
                  'No usage guidance documented yet.'
                )}
              </article>
              <article class="option-card">
                <strong>Key options</strong>
                ${
                  options.length
                    ? `<div class="pill-row">${options.slice(0, 4).map((option) => `<span class="pill">${escapeHtml(option)}</span>`).join('')}</div>`
                    : '<p class="quiet">No named variants documented yet.</p>'
                }
              </article>
              <article class="option-card">
                <strong>Accessibility snapshot</strong>
                ${renderRows(component.accessibility.slice(0, 3), 'No accessibility notes documented yet.')}
              </article>
            </div>
          </div>
        </section>

        <section class="panel" id="gallery">
          <div class="section-head">
            <div>
              <p class="eyebrow">Visual gallery</p>
              <h2>Examples first, with code for every scenario</h2>
              <p>Each example includes a live preview, switchable framework code, and a button to load that exact markup into the live editor.</p>
            </div>
          </div>
          <div class="example-grid">
            ${variantGallery
              .map((item, index) => renderExampleCard(component, item, playgroundId, index))
              .join('')}
          </div>
        </section>

        ${renderThemeComparison(themeShowcaseMarkup)}

        <section class="panel" id="frameworks">
          <div class="section-head">
            <div>
              <p class="eyebrow">Framework usage</p>
              <h2>Switch the same example across stacks</h2>
              <p>Use this as the canonical starter snippet before moving into the live editor below.</p>
            </div>
          </div>
          ${renderCodeTabs(`${component.tag}-frameworks`, frameworkExamples)}
        </section>

        ${renderEditor(example, playgroundId)}

        <section class="panel" id="usage">
          <div class="section-head">
            <div>
              <p class="eyebrow">Usage</p>
              <h2>When to use and what to avoid</h2>
            </div>
          </div>
          <div class="split">
            <div class="option-card">
              <strong>Use when</strong>
              ${renderRows(component.compositionRules.length ? component.compositionRules : [`Use ${component.name} when its semantics match the interaction you need.`], 'No guidance documented yet.')}
            </div>
            <div class="option-card">
              <strong>Avoid when</strong>
              ${renderRows(component.antiPatterns, 'No anti-patterns documented yet.')}
            </div>
          </div>
        </section>

        <section class="panel" id="options">
          <div class="section-head">
            <div>
              <p class="eyebrow">Options</p>
              <h2>Variants, states, anatomy, and extensibility</h2>
            </div>
          </div>
          <div class="mini-grid">
            <div class="option-card"><strong>Variants</strong>${options.length ? `<div class="pill-row">${options.map((option) => `<span class="pill">${escapeHtml(option)}</span>`).join('')}</div>` : '<p class="quiet">No named variants documented yet.</p>'}</div>
            <div class="option-card"><strong>States</strong>${states.length ? renderRows(states, 'No states documented yet.') : '<p class="quiet">No explicit states documented yet.</p>'}</div>
            <div class="option-card"><strong>Anatomy</strong><div class="pill-row">${component.anatomy.map((part) => `<span class="pill">${escapeHtml(part)}</span>`).join('')}</div></div>
            <div class="option-card"><strong>CSS parts</strong><div class="pill-row">${component.parts.map((part) => `<span class="pill">${escapeHtml(part.name)}</span>`).join('')}</div></div>
            <div class="option-card"><strong>Slots</strong><div class="pill-row">${component.slots.map((slot) => `<span class="pill">${escapeHtml(slot.name)}</span>`).join('')}</div></div>
            <div class="option-card"><strong>CSS variables</strong><div class="pill-row">${component.cssVariables.map((variable) => `<span class="pill"><code>${escapeHtml(variable.name)}</code></span>`).join('')}</div></div>
          </div>
        </section>

        ${renderSpec(component)}

        <section class="panel" id="api">
          <div class="section-head">
            <div>
              <p class="eyebrow">API</p>
              <h2>Props, events, and methods</h2>
            </div>
          </div>
          <h3>Props</h3>
          ${renderProps(component.props)}
          <h3 style="margin-top: 1rem;">Events</h3>
          ${renderEvents(component.events)}
          <h3 style="margin-top: 1rem;">Methods</h3>
          ${renderMethods(component.methods)}
        </section>
        <section class="panel" id="quality">
          <div class="section-head">
            <div>
              <p class="eyebrow">Quality</p>
              <h2>Accessibility and responsive guidance</h2>
            </div>
          </div>
          <div class="split">
            <div class="option-card"><strong>Accessibility</strong>${renderRows(component.accessibility, 'No accessibility notes documented yet.')}</div>
            <div class="option-card"><strong>Responsive</strong>${renderRows(component.responsive, 'No responsive guidance documented yet.')}</div>
          </div>
        </section>
      </div>
      <aside class="toc panel">
        <p class="eyebrow">On this page</p>
        <ul class="subnav">
          ${tocItems.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
        </ul>
      </aside>
    </div>`,
    data
  );
}

function renderChart(name: string, data: LibraryManifest): string {
  const chart = data.charts.find((item) => item.name === name);
  if (!chart) {
    return renderNotFound(data);
  }

  const preview = createMystiqueChartPreview(chart.name, {
    title: titleCase(chart.name),
    width: 640,
    height: 320
  });
  const baseType = resolveChartType(chart.name);
  const isVariant = chart.name !== baseType;
  const family = chart.family ?? 'cartesian';
  const familyLabel = chartFamilyLabels[family] ?? titleCase(family);
  const renderer = chart.renderer ?? 'hybrid';
  const preferredRenderer = renderer === 'hybrid' ? 'SVG and canvas' : `${renderer} first`;
  const implemented = isFullyImplementedChart(chart.name);
  const series = chart.series ?? [];
  const variants = chart.variants ?? [];
  const interactions = chart.interactions ?? [];
  const capabilities = chart.capabilities ?? [];
  const d3Analogs = chart.d3Analogs ?? [];
  const devextremeHints = chart.devextremeHints ?? [];
  const examples = chart.examples ?? [];
  const svgCode = createChartRendererCode(chart, 'svg', preview.data);
  const canvasCode = createChartRendererCode(chart, 'canvas', preview.data);

  return layout(
    chart.name,
    `<section class="hero">
      <p class="eyebrow">Mystique chart</p>
      <h1>${escapeHtml(titleCase(chart.name))}</h1>
      <p>${escapeHtml(chart.description)}</p>
      <div class="hero-stats">
        <span>${escapeHtml(preferredRenderer)}</span>
        <span>${escapeHtml(familyLabel)} family</span>
        <span>${series.length} series primitives</span>
        <span>${implemented ? 'Fully implemented chart' : 'Catalog-supported chart'}</span>
        <span>${escapeHtml(isVariant ? `Variant of ${baseType}` : 'Base chart')}</span>
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Preview</p>
          <h2>Live SVG preview with dual-render contract</h2>
          <p>The live preview uses the SVG path so every chart is viewable in docs. Hover to inspect values, click to pin a point, Shift+drag to brush-select, and use the runtime zoom controls to test the same interaction model shared with canvas.</p>
        </div>
      </div>
      <div class="chart-preview-grid">
        <div class="preview">
          <div class="preview-render preview-render-stage chart-preview-stage">${preview.svg}</div>
        </div>
        <div class="chart-meta">
          <article class="option-card">
            <strong>Renderer coverage</strong>
            <p class="quiet">Preferred: <code>${escapeHtml(renderer)}</code></p>
            <p class="quiet">Also implemented in canvas for the shared Mystique drawing API.</p>
          </article>
          <article class="option-card">
            <strong>Series model</strong>
            <div class="pill-row">${series.map((seriesName) => `<span class="pill">${escapeHtml(seriesName)}</span>`).join('')}</div>
          </article>
          <article class="option-card">
            <strong>Sample data</strong>
            <p class="quiet">Manifest-backed sample generated from the chart family contract.</p>
            <div class="chart-sample">${renderCodeBlock(JSON.stringify(preview.data, null, 2))}</div>
          </article>
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Specification</p>
          <h2>Family, variants, interactions, scales, and motion</h2>
        </div>
      </div>
      <div class="mini-grid">
        <div class="option-card"><strong>Family</strong><p class="quiet">${escapeHtml(familyLabel)}</p></div>
        <div class="option-card"><strong>Variants</strong>${renderPills(variants, 'No named variants documented yet.')}</div>
        <div class="option-card"><strong>Interactions</strong>${renderPills(interactions, 'No interaction modes documented yet.')}</div>
        <div class="option-card"><strong>Capabilities</strong>${renderPills(capabilities, 'No capabilities documented yet.')}</div>
      </div>
      <div class="chart-code-grid" style="margin-top: 1rem;">
        <article class="option-card">
          <strong>Scale system</strong>
          <p class="quiet">The shared definition now exposes channel-level scales so SVG, canvas, and docs describe the same mapping contract.</p>
          ${renderChartScales(preview.definition.scales)}
        </article>
        <article class="option-card">
          <strong>Motion system</strong>
          <p class="quiet">Preview cards now inherit the default animation preset for this chart family and respect reduced-motion preferences.</p>
          ${renderMotionSpec(preview.definition.options.motion)}
        </article>
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Data contract</p>
          <h2>Expected fields for the shared chart definition</h2>
          <p>Each chart family declares a stable data shape so SVG and canvas stay aligned even as the visuals evolve.</p>
        </div>
      </div>
      ${renderChartDataShape(chart.dataShape ?? [])}
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Implementation</p>
          <h2>D3 lineage and renderer entry points</h2>
          <p>Use these references to map Mystique charts to familiar D3 concepts and to the runtime entry points used in SVG and canvas.</p>
        </div>
      </div>
      <div class="split">
        <div class="option-card"><strong>D3 analogs</strong>${renderRows(d3Analogs, 'No D3 analogs documented yet.')}</div>
        <div class="option-card"><strong>DevExtreme parity hints</strong>${renderRows(devextremeHints, 'No parity hints documented yet.')}</div>
        <div class="option-card"><strong>Manifest examples</strong>${renderRows(examples, 'No examples documented yet.')}</div>
      </div>
      <div class="chart-code-grid" style="margin-top: 1rem;">
        <article class="option-card">
          <strong>SVG usage</strong>
          ${renderCodeBlock(svgCode)}
        </article>
        <article class="option-card">
          <strong>Canvas usage</strong>
          ${renderCodeBlock(canvasCode)}
        </article>
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Guidance</p>
          <h2>Interaction and composition model</h2>
        </div>
      </div>
      <div class="split">
        <div class="option-card"><strong>Interaction model</strong>${renderRows(chartGuide.interactions, 'No interaction guidance documented yet.')}</div>
        <div class="option-card"><strong>Rendering guidance</strong>${renderRows(chartGuide.rendering, 'No rendering guidance documented yet.')}</div>
        <div class="option-card"><strong>Composition guidance</strong>${renderRows(chartGuide.composition, 'No composition guidance documented yet.')}</div>
      </div>
    </section>`,
    data
  );
}

function renderPlaygroundHub(data: LibraryManifest): string {
  const defaultComponent = data.components[0];
  const defaultMarkup = defaultComponent ? createDefaultExample(defaultComponent) : '<jarvis-button>Launch</jarvis-button>';
  const featuredCharts = selectFeaturedCharts(data.charts, 8);
  const componentSelectOptions = data.components
    .map((component) => `<option value="${component.tag}">${escapeHtml(titleCase(component.name))}</option>`)
    .join('');

  const componentGroups = groupComponentsByCategory(data.components);
  const categoryOptions = componentGroups.map((group) => `<option value="${group.category}">${escapeHtml(group.label)}</option>`).join('');
  const getPlaygroundMarkup = (component: ComponentManifestEntry): string => {
    const examples = createVariantGallery(component);
    return examples[0]?.markup ?? createDefaultExample(component);
  };
  const quickCards = componentGroups
    .map(
      (group) => `<section class="panel" data-playground-category-group="${group.category}">
        <div class="section-head">
          <div>
            <p class="eyebrow">Category</p>
            <h2>${escapeHtml(group.label)}</h2>
          </div>
          <div class="quiet">${group.items.length} component${group.items.length === 1 ? '' : 's'}</div>
        </div>
        <div class="playground-card-grid">
          ${group.items
            .map((component) => {
              const markup = getPlaygroundMarkup(component);
              return renderPlaygroundCard(component, markup, createPlaygroundSourceId(component.tag));
            })
            .join('')}
        </div>
      </section>`
    )
    .join('');

  const allSources = data.components
    .map((component) => `<textarea hidden data-example-markup="${createPlaygroundSourceId(component.tag)}">${escapeHtml(getPlaygroundMarkup(component))}</textarea>`)
    .join('');

  return layout(
    'Playground',
    `<section class="hero">
      <p class="eyebrow">Interactive lab</p>
      <h1>Jarvis UI playground</h1>
      <p>Build quickly with copyable markup, theme switching, and a live output preview. Use the component cards for presets, then jump into the Mystique chart gallery to inspect the shared ${data.charts.length}-chart catalog with ${fullyImplementedChartCount} fully real chart implementations.</p>
      <div class="hero-stats">
        <span>${data.components.length} components</span>
        <span>${data.charts.length} charts</span>
        <span>${fullyImplementedChartCount} fully implemented</span>
        <span>Monaco-ready web editor</span>
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Mystique quick start</p>
          <h2>Featured advanced chart implementations</h2>
          <p>Every chart entry is manifest-backed. These starter cards intentionally spotlight richer forecasting, topology, drilldown, and control-room variants so the expanded catalog is visible immediately.</p>
        </div>
      </div>
      <div class="grid cards">
        ${featuredCharts.map((chart) => renderChartCatalogCard(chart)).join('')}
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Component quick start</p>
          <h2>All presets with instant load</h2>
          <p>Load one of the preset component examples, then adjust attributes and run instantly.</p>
        </div>
      </div>
      <div class="playground-toolbar">
        <label class="visually-hidden" for="playground-search-input">Search components</label>
        <input id="playground-search-input" class="toolbar-select" type="text" placeholder="Search component name or description" data-playground-search />
        <label class="visually-hidden" for="playground-category-filter">Filter by category</label>
        <select class="toolbar-select" id="playground-category-filter" data-playground-category>
          <option value="all">All categories</option>
          ${categoryOptions}
        </select>
      </div>
      <p class="quiet" data-playground-empty hidden>No component matches your current filter.</p>
      <div class="playground-card-stack">
        ${quickCards}
      </div>
    </section>
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Global component editor</p>
          <h2>Choose component and render</h2>
        </div>
        <div class="toolbar-actions">
          <select class="toolbar-select" id="global-playground-select" data-global-component-select>
            ${componentSelectOptions}
          </select>
          <button class="toolbar-button" type="button" data-load-global-component>Load selected component</button>
        </div>
      </div>
      ${renderEditor(defaultMarkup, 'global-playground')}
      <p class="quiet">Tip: For a fully framework-specific copy, switch to an individual component page and use the Framework usage tabs.</p>
    </section>
    ${allSources}`,
    data,
    '/playground'
  );
}

function renderComponentIndex(data: LibraryManifest): string {
  const groups = groupComponentsByCategory(data.components);
  return layout(
    'Components',
    `<section class="hero">
      <p class="eyebrow">Components</p>
      <h1>Jarvis component library</h1>
      <p>Browse components by category. Each page includes options, states, API tables, anatomy, accessibility notes, and framework examples.</p>
    </section>
    ${groups
      .map(
        (group) => `<section class="panel">
          <div class="section-head">
            <div>
              <p class="eyebrow">Category</p>
              <h2>${escapeHtml(group.label)}</h2>
            </div>
          </div>
          <div class="grid cards">
            ${group.items
              .map((component) => `<a class="card-link" href="/components/${component.tag}"><strong>${escapeHtml(titleCase(component.name))}</strong><p class="quiet">${escapeHtml(component.description)}</p></a>`)
              .join('')}
          </div>
        </section>`
      )
      .join('')}`,
    data
  );
}

function renderChartIndex(data: LibraryManifest): string {
  const grouped = groupChartsByFamily(data.charts);

  return layout(
    'Charts',
    `<section class="hero">
      <p class="eyebrow">Charts</p>
      <h1>Mystique chart catalog</h1>
      <p>Explore the ${data.charts.length}-chart Mystique catalog with manifest-backed previews, family groupings, and D3-inspired implementation notes. ${fullyImplementedChartCount} entries currently have fully real SVG and canvas implementation coverage.</p>
      <div class="hero-stats">
        <span>${data.charts.length} chart entries</span>
        <span>${fullyImplementedChartCount} fully implemented charts</span>
        <span>${grouped.length} chart families</span>
        <span>SVG and canvas implementation path</span>
      </div>
    </section>
    <div class="chart-family-sections">
      ${grouped
        .map(
          (group) => `<section class="panel">
            <div class="section-head">
              <div>
                <p class="eyebrow">Chart family</p>
                <h2>${escapeHtml(group.label)}</h2>
                <p>${group.items.length} chart${group.items.length === 1 ? '' : 's'} in this family.</p>
              </div>
            </div>
            <div class="grid cards">
              ${group.items.map((chart) => renderChartCatalogCard(chart)).join('')}
            </div>
          </section>`
        )
        .join('')}
    </div>`,
    data
  );
}

function renderNotFound(data: LibraryManifest): string {
  return layout(
    'Not Found',
    `<section class="hero"><p class="eyebrow">Not found</p><h1>That page does not exist</h1><p>The requested documentation page is not present in the current Jarvis manifest slice.</p></section>`,
    data
  );
}

function route(request: IncomingMessage, data: LibraryManifest): string {
  const url = new URL(request.url ?? '/', docsBaseUrl);
  const segments = url.pathname.split('/').filter(Boolean);

  if (!segments.length) {
    return renderHome(data);
  }

  if (segments[0] === 'guides' && segments[1]) {
    return renderGuide(segments[1], data);
  }

  if (segments[0] === 'components' && !segments[1]) {
    return renderComponentIndex(data);
  }

  if (segments[0] === 'components' && segments[1]) {
    const component = data.components.find((item) => item.tag === segments[1]);
    return component ? renderComponent(component, data) : renderNotFound(data);
  }

  if (segments[0] === 'charts' && !segments[1]) {
    return renderChartIndex(data);
  }

  if (segments[0] === 'charts' && segments[1]) {
    return renderChart(segments[1], data);
  }

  if (segments[0] === 'playground' && !segments[1]) {
    return renderPlaygroundHub(data);
  }

  return renderNotFound(data);
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', docsBaseUrl);
  loadStaticAsset(url.pathname)
    .then((asset) => {
      if (asset) {
        response.setHeader('content-type', asset.contentType);
        response.end(asset.body);
        return;
      }

      return loadManifestData().then((data) => {
        response.setHeader('content-type', 'text/html; charset=utf-8');
        response.end(route(request, data));
      });
    })
    .catch((error) => {
      response.statusCode = 500;
      response.end(String(error));
    });
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Docs server is already running on ${docsBaseUrl}`);
    console.log(`Open ${docsBaseUrl} or set PORT to use a different port.`);
    process.exit(0);
  }

  throw error;
});

server.listen(docsPort, () => {
  console.log(`Docs server listening on ${docsBaseUrl}`);
});


