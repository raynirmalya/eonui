import type { ChartDefinition, ChartType } from '@mystique/core';
import {
  MYSTIQUE_CHART_CATALOG_SIZE,
  createChartDefinition,
  createChartInteractionModel,
  createSampleChartData,
  getMystiqueChartManifest,
  resolveChartType
} from '@mystique/core';
import { drawMystiqueChart } from '@mystique/canvas';
import { renderMystiqueSvgChart } from '@mystique/svg';

type GenericDatum = Record<string, unknown>;
type MystiqueCapability = ChartDefinition['capabilities'][number];
type InteractionPayload = ReturnType<typeof createChartInteractionModel> & {
  renderer: MystiqueRenderer;
  width: number;
  height: number;
  title: string;
  type: ChartType;
  drilldown: boolean;
};

export type MystiqueChartConfig = {
  type: ChartType;
  data: GenericDatum[];
  options?: {
    title?: string;
    width?: number;
    height?: number;
    renderer?: 'svg' | 'canvas' | 'hybrid';
    showLegend?: boolean;
    showAxes?: boolean;
    showGrid?: boolean;
    showTooltip?: boolean;
    capabilities?: MystiqueCapability[];
    [key: string]: unknown;
  };
  definition?: ChartDefinition;
};

export type MystiqueChartPreview = {
  type: ChartType;
  definition: ChartDefinition;
  data: GenericDatum[];
  svg: string;
  canvas: string;
};

type MystiqueRenderer = 'svg' | 'canvas' | 'hybrid';

const DATA_MYSTIQUE_ELEMENT = 'mystique-chart';

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeNarrowArray(value: unknown, fallback: GenericDatum[] = []): GenericDatum[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is GenericDatum => typeof item === 'object' && item !== null);
}

function encodeBase64(value: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value, 'utf8').toString('base64');
  }

  return btoa(unescape(encodeURIComponent(value)));
}

function decodeBase64(raw: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(raw, 'base64').toString('utf8');
  }

  return decodeURIComponent(escape(atob(raw)));
}

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function createInteractionPayload(
  type: ChartType,
  renderer: MystiqueRenderer,
  data: GenericDatum[],
  width: number,
  height: number,
  title: string
): InteractionPayload {
  return {
    ...createChartInteractionModel(type, data, width, height),
    renderer,
    width,
    height,
    title,
    type,
    drilldown: type.includes('drilldown-workbench')
  };
}

function createInteractionWrapper(
  stageMarkup: string,
  renderer: MystiqueRenderer,
  type: ChartType,
  data: GenericDatum[],
  width: number,
  height: number,
  title: string
): string {
  const payload = encodeBase64(JSON.stringify(createInteractionPayload(type, renderer, data, width, height, title)));
  return `<div
    data-mystique-runtime
    data-mystique-runtime-payload="${payload}"
    data-mystique-runtime-renderer="${renderer}"
    data-mystique-runtime-type="${escapeAttribute(type)}"
    style="display:grid;gap:0.65rem;"
  >
    <div
      data-mystique-surface
      style="position:relative;overflow:hidden;border-radius:18px;border:1px solid rgba(148,163,184,0.18);background:linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,250,252,0.98));"
    >
      <div
        data-mystique-viewport
        style="transform-origin:center center;transition:transform 180ms cubic-bezier(0.22, 1, 0.36, 1);"
      >${stageMarkup}</div>
      <div data-mystique-overlay aria-hidden="true" style="pointer-events:none;position:absolute;inset:0;">
        <div data-mystique-crosshair-x hidden style="position:absolute;top:0;bottom:0;width:1px;background:rgba(15,23,42,0.2);"></div>
        <div data-mystique-crosshair-y hidden style="position:absolute;left:0;right:0;height:1px;background:rgba(15,23,42,0.14);"></div>
        <div data-mystique-focus hidden style="position:absolute;width:12px;height:12px;border-radius:999px;border:2px solid rgba(15,23,42,0.2);background:rgba(14,165,233,0.18);box-shadow:0 0 0 6px rgba(14,165,233,0.08);transform:translate(-50%, -50%);"></div>
        <div data-mystique-brush hidden style="position:absolute;border:1px dashed rgba(14,165,233,0.55);background:rgba(14,165,233,0.08);"></div>
      </div>
      <div
        data-mystique-tooltip
        hidden
        style="position:absolute;min-width:12rem;max-width:18rem;padding:0.75rem 0.8rem;border-radius:14px;background:rgba(15,23,42,0.92);color:#f8fafc;box-shadow:0 16px 40px rgba(15,23,42,0.18);font:500 0.78rem/1.5 'Segoe UI', Arial, sans-serif;pointer-events:none;transform:translate(-50%, calc(-100% - 12px));"
      ></div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;">
      <div style="display:flex;gap:0.45rem;align-items:center;flex-wrap:wrap;">
        <button type="button" data-mystique-zoom="in" style="border:1px solid rgba(148,163,184,0.28);background:rgba(255,255,255,0.92);color:#0f172a;border-radius:999px;padding:0.35rem 0.7rem;font:600 0.73rem/1 'Segoe UI', Arial, sans-serif;cursor:pointer;">Zoom in</button>
        <button type="button" data-mystique-zoom="out" style="border:1px solid rgba(148,163,184,0.28);background:rgba(255,255,255,0.92);color:#0f172a;border-radius:999px;padding:0.35rem 0.7rem;font:600 0.73rem/1 'Segoe UI', Arial, sans-serif;cursor:pointer;">Zoom out</button>
        <button type="button" data-mystique-zoom="reset" style="border:1px solid rgba(148,163,184,0.28);background:rgba(255,255,255,0.92);color:#0f172a;border-radius:999px;padding:0.35rem 0.7rem;font:600 0.73rem/1 'Segoe UI', Arial, sans-serif;cursor:pointer;">Reset view</button>
      </div>
      <div data-mystique-status style="color:#475569;font:500 0.76rem/1.45 'Segoe UI', Arial, sans-serif;">Hover to inspect, click to pin, Shift+drag to brush-select.</div>
    </div>
  </div>`;
}

function createCanvasChartMarkup(
  width: number,
  height: number,
  type: ChartType,
  data: GenericDatum[],
  title: string,
  definition?: ChartDefinition
): string {
  const config = JSON.stringify({
    type,
    data,
    width,
    height,
    title
  });
  const resolvedType = resolveChartType(type);
  const motion = definition?.options.motion;
  const scales = definition?.scales;
  const canvasAttrs = [
    `width="${width}"`,
    `height="${height}"`,
    `role="img"`,
    `aria-label="${escapeAttribute(title || resolvedType)}"`,
    `data-mystique-type="${escapeAttribute(resolvedType)}"`,
    `data-mystique-canvas="${encodeBase64(config)}"`,
    `data-mystique-motion-enabled="${motion?.enabled ? 'true' : 'false'}"`,
    `data-mystique-motion-preset="${motion?.preset ?? 'none'}"`,
    `data-mystique-motion-duration="${motion?.durationMs ?? 0}"`,
    `data-mystique-motion-easing="${escapeAttribute(motion?.easing ?? 'linear')}"`,
    `data-scale-x="${scales?.x?.type ?? 'none'}"`,
    `data-scale-y="${scales?.y?.type ?? 'none'}"`,
    `data-scale-y-secondary="${scales?.ySecondary?.type ?? 'none'}"`,
    `data-scale-radius="${scales?.radius?.type ?? 'none'}"`,
    `data-scale-color="${scales?.color?.type ?? 'none'}"`,
    `data-scale-size="${scales?.size?.type ?? 'none'}"`,
    `data-scale-angle="${scales?.angle?.type ?? 'none'}"`,
    `data-scale-node="${scales?.node?.type ?? 'none'}"`
  ].join(' ');

  return `<canvas ${canvasAttrs}></canvas>`;
}

export function createMystiqueChart(config: MystiqueChartConfig): string {
  const width = config.options?.width ?? 640;
  const height = config.options?.height ?? 320;
  const definition = config.definition ?? createChartDefinition(config.type, config.options);
  const preferredRenderer = config.options?.renderer ?? definition.options.renderer;
  const chartType = resolveChartType(config.type);
  const title = config.options?.title ?? definition.options.title ?? '';
  const data = config.data ?? [];
  let renderer: MystiqueRenderer = preferredRenderer;
  let markup = '';

  if (preferredRenderer === 'canvas') {
    markup = createCanvasChartMarkup(width, height, config.type, data, title, definition);
    renderer = 'canvas';
    return createInteractionWrapper(markup, renderer, config.type, data, width, height, title || chartType);
  }

  if (preferredRenderer === 'hybrid') {
    markup =
      chartType === 'heatmap' || chartType === 'treemap' || chartType === 'network' || chartType === 'sankey'
        ? createCanvasChartMarkup(width, height, config.type, data, title, definition)
        : renderMystiqueSvgChart({ type: config.type, data, options: definition.options, definition });
    renderer = chartType === 'heatmap' || chartType === 'treemap' || chartType === 'network' || chartType === 'sankey' ? 'canvas' : 'svg';
    return createInteractionWrapper(markup, renderer, config.type, data, width, height, title || chartType);
  }

  markup = renderMystiqueSvgChart({ type: config.type, data, options: definition.options, definition });
  renderer = 'svg';
  return createInteractionWrapper(markup, renderer, config.type, data, width, height, title || chartType);
}

export function createMystiqueChartDefinition(type: ChartType, options: MystiqueChartConfig['options'] = {}): ChartDefinition {
  return createChartDefinition(type, {
    title: options?.title,
    width: options?.width,
    height: options?.height,
    renderer: options?.renderer,
    showLegend: options?.showLegend ?? true,
    showAxes: options?.showAxes ?? true,
    showGrid: options?.showGrid ?? true,
    showTooltip: options?.showTooltip ?? true,
    capabilities: (options?.capabilities as MystiqueCapability[] | undefined) ?? undefined
  });
}

export function createMystiqueChartPreview(type: ChartType, options: MystiqueChartConfig['options'] = {}): MystiqueChartPreview {
  const definition = createMystiqueChartDefinition(type, options);
  const data = createSampleChartData(type) as GenericDatum[];
  const sharedOptions = {
    ...options,
    title: options.title ?? definition.title ?? definition.options.title ?? `${resolveChartType(type)} chart`
  };

  return {
    type,
    definition,
    data,
    svg: createMystiqueChart({
      type,
      data,
      options: {
        ...sharedOptions,
        renderer: 'svg'
      },
      definition
    }),
    canvas: createMystiqueChart({
      type,
      data,
      options: {
        ...sharedOptions,
        renderer: 'canvas'
      },
      definition
    })
  };
}

export function createMystiqueCatalogPreviews(limit = MYSTIQUE_CHART_CATALOG_SIZE): MystiqueChartPreview[] {
  return getMystiqueChartManifest(limit).map((entry) =>
    createMystiqueChartPreview(entry.name, {
      title: entry.name
    })
  );
}

function decodeCanvasPayload(raw: string): {
  type: ChartType;
  data: GenericDatum[];
  width: number;
  height: number;
  title?: string;
} | null {
  try {
    const decoded = decodeBase64(raw);
    const parsed = JSON.parse(decoded) as {
      type: ChartType;
      data: GenericDatum[];
      width: number;
      height: number;
      title?: string;
    };
    return parsed;
  } catch {
    return null;
  }
}

function decodeInteractionPayload(raw: string): InteractionPayload | null {
  try {
    return JSON.parse(decodeBase64(raw)) as InteractionPayload;
  } catch {
    return null;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function escapeText(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function hydrateMystiqueRuntime(runtime: HTMLElement): void {
  if (runtime.dataset.mystiqueRuntimeMounted === 'true') {
    return;
  }

  const payload = decodeInteractionPayload(runtime.dataset.mystiqueRuntimePayload ?? '');
  const surface = runtime.querySelector<HTMLElement>('[data-mystique-surface]');
  const viewport = runtime.querySelector<HTMLElement>('[data-mystique-viewport]');
  const tooltip = runtime.querySelector<HTMLElement>('[data-mystique-tooltip]');
  const crosshairX = runtime.querySelector<HTMLElement>('[data-mystique-crosshair-x]');
  const crosshairY = runtime.querySelector<HTMLElement>('[data-mystique-crosshair-y]');
  const focus = runtime.querySelector<HTMLElement>('[data-mystique-focus]');
  const brush = runtime.querySelector<HTMLElement>('[data-mystique-brush]');
  const status = runtime.querySelector<HTMLElement>('[data-mystique-status]');
  if (!payload || !surface || !viewport || !tooltip || !crosshairX || !crosshairY || !focus || !brush || !status) {
    return;
  }

  runtime.dataset.mystiqueRuntimeMounted = 'true';

  let zoom = 1;
  let pinnedAnchor: InteractionPayload['anchors'][number] | null = null;
  let brushing = false;
  let brushStart: { x: number; y: number } | null = null;

  const scaledAnchor = (anchor: InteractionPayload['anchors'][number]) => ({
    ...anchor,
    x: anchor.x * (surface.clientWidth / Math.max(payload.width, 1)),
    y: anchor.y * (surface.clientHeight / Math.max(payload.height, 1))
  });

  const setStatus = (message: string) => {
    status.textContent = message;
  };

  const applyZoom = () => {
    viewport.style.transform = `scale(${zoom})`;
  };

  const hideFocus = () => {
    tooltip.hidden = true;
    crosshairX.hidden = true;
    crosshairY.hidden = true;
    focus.hidden = true;
  };

  const showAnchor = (anchor: InteractionPayload['anchors'][number], pinned = false) => {
    const scaled = scaledAnchor(anchor);
    crosshairX.hidden = false;
    crosshairY.hidden = false;
    focus.hidden = false;
    crosshairX.style.left = `${scaled.x}px`;
    crosshairY.style.top = `${scaled.y}px`;
    focus.style.left = `${scaled.x}px`;
    focus.style.top = `${scaled.y}px`;
    tooltip.hidden = false;
    tooltip.innerHTML = `<strong style="display:block;font-size:0.76rem;margin-bottom:0.18rem;">${escapeText(anchor.label)}</strong><span style="display:block;color:rgba(226,232,240,0.84);">${escapeText(anchor.summary)}</span>`;
    const tooltipWidth = tooltip.offsetWidth || 220;
    const left = clamp(scaled.x, tooltipWidth / 2 + 10, surface.clientWidth - tooltipWidth / 2 - 10);
    const top = clamp(scaled.y - 12, 24, surface.clientHeight - 12);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    setStatus(
      payload.drilldown && pinned
        ? `Drill focus: ${anchor.label}`
        : pinned
          ? `Pinned: ${anchor.label}`
          : `Inspecting ${anchor.label}`
    );
    surface.style.boxShadow = payload.drilldown && pinned ? '0 0 0 1px rgba(14,165,233,0.26), 0 22px 60px rgba(14,165,233,0.12)' : '';
  };

  const nearestAnchor = (x: number, y: number) => {
    return payload.anchors
      .map((anchor) => scaledAnchor(anchor))
      .reduce<{ anchor: InteractionPayload['anchors'][number] | null; distance: number }>(
        (best, anchor) => {
          const distance = Math.hypot(anchor.x - x, anchor.y - y);
          return distance < best.distance ? { anchor, distance } : best;
        },
        { anchor: null, distance: Number.POSITIVE_INFINITY }
      ).anchor;
  };

  const finishBrushSelection = (x: number, y: number) => {
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
      const primary = selected[0]!;
      pinnedAnchor = primary;
      showAnchor(primary, true);
      setStatus(
        payload.drilldown
          ? `Drill focus ready from ${selected.length} selected point${selected.length === 1 ? '' : 's'}`
          : `${selected.length} point${selected.length === 1 ? '' : 's'} selected`
      );
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
      brush.style.left = `${left}px`;
      brush.style.top = `${top}px`;
      brush.style.width = `${Math.abs(x - brushStart.x)}px`;
      brush.style.height = `${Math.abs(y - brushStart.y)}px`;
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
    brushStart = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    brush.hidden = false;
    brush.style.left = `${brushStart.x}px`;
    brush.style.top = `${brushStart.y}px`;
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

  runtime.querySelectorAll<HTMLButtonElement>('[data-mystique-zoom]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.mystiqueZoom;
      if (action === 'in') {
        zoom = clamp(zoom + 0.2, 0.8, 2.4);
        applyZoom();
        setStatus(`Zoom ${zoom.toFixed(1)}x`);
        return;
      }
      if (action === 'out') {
        zoom = clamp(zoom - 0.2, 0.8, 2.4);
        applyZoom();
        setStatus(`Zoom ${zoom.toFixed(1)}x`);
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
}

export function hydrateMystiqueCharts(root: ParentNode = document): void {
  if (root instanceof HTMLElement && root.matches?.('[data-mystique-runtime]')) {
    hydrateMystiqueRuntime(root);
  }

  root.querySelectorAll<HTMLElement>('[data-mystique-runtime]').forEach((runtime) => {
    hydrateMystiqueRuntime(runtime);
  });
}

function mountCanvasChart(element: HTMLElement): void {
  const canvas = element.querySelector<HTMLCanvasElement>('canvas[data-mystique-canvas]');
  if (!canvas) {
    return;
  }

  const payload = decodeCanvasPayload(canvas.dataset.mystiqueCanvas ?? '');
  if (!payload) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  drawMystiqueChart(ctx, payload.type, payload.data, payload.width, payload.height, payload.title);

  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const motionEnabled = canvas.dataset.mystiqueMotionEnabled === 'true';
  const duration = asNumber(canvas.dataset.mystiqueMotionDuration, 0);
  if (!motionEnabled || duration <= 0 || typeof canvas.animate !== 'function') {
    return;
  }

  const easing = canvas.dataset.mystiqueMotionEasing ?? 'cubic-bezier(0.22, 1, 0.36, 1)';
  const preset = canvas.dataset.mystiqueMotionPreset ?? 'fade-scale';
  const keyframes: Keyframe[] =
    preset === 'rise'
      ? [
          { opacity: 0, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ]
      : preset === 'sweep'
        ? [
            { opacity: 0, transform: 'scale(0.95) rotate(-4deg)' },
            { opacity: 1, transform: 'scale(1) rotate(0deg)' }
          ]
        : preset === 'pulse'
          ? [
              { opacity: 0, transform: 'scale(0.96)' },
              { opacity: 1, transform: 'scale(1.02)' },
              { opacity: 1, transform: 'scale(1)' }
            ]
          : preset === 'draw'
            ? [
                { opacity: 0, transform: 'translateY(12px)' },
                { opacity: 1, transform: 'translateY(0)' }
              ]
            : [
                { opacity: 0, transform: 'translateY(10px) scale(0.985)', filter: 'saturate(0.94)' },
                { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'saturate(1)' }
              ];

  canvas.animate(keyframes, {
    duration,
    easing,
    fill: 'both'
  });
}

export function defineMystiqueChartElement(): void {
  if (typeof window === 'undefined' || customElements.get(DATA_MYSTIQUE_ELEMENT)) {
    return;
  }

  class MystiqueChartElement extends HTMLElement {
    static get observedAttributes(): string[] {
      return ['type', 'data', 'renderer', 'width', 'height', 'title'];
    }

    connectedCallback(): void {
      this.render();
    }

    attributeChangedCallback(): void {
      this.render();
    }

    private getType(): ChartType {
      return ((this.getAttribute('type') as ChartType | null) ?? 'line') as ChartType;
    }

    private getOptions(): MystiqueChartConfig['options'] {
      const width = asNumber(this.getAttribute('width'), 640);
      const height = asNumber(this.getAttribute('height'), 320);
      const renderer = (this.getAttribute('renderer') as MystiqueRenderer | null) ?? 'svg';
      const title = this.getAttribute('title') ?? undefined;
      return {
        width,
        height,
        renderer,
        title
      };
    }

    private getData(): GenericDatum[] {
      const raw = this.getAttribute('data');
      return normalizeNarrowArray(raw ? (JSON.parse(raw) as unknown) : [], []);
    }

    private render(): void {
      const type = this.getType();
      const options = this.getOptions();
      const data = this.getData();
      const definition = createChartDefinition(type, options);
      this.innerHTML = createMystiqueChart({ type, data, options, definition });
      mountCanvasChart(this);
      hydrateMystiqueCharts(this);
    }
  }

  customElements.define(DATA_MYSTIQUE_ELEMENT, MystiqueChartElement);
}
