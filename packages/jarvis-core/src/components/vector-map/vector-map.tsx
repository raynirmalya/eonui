import { Component, Event, EventEmitter, Prop, State, h, Host } from '@stencil/core';

interface VectorRegionShape {
  name: string;
  path: string;
  labelX: number;
  labelY: number;
}

interface VectorRegionData {
  name: string;
  value: number;
}

interface VectorMarker {
  label: string;
  x: number;
  y: number;
}

interface VectorRoute {
  label: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

const regionShapes: VectorRegionShape[] = [
  { name: 'Canada', path: 'M110 130 C145 100 210 102 252 128 C234 165 208 180 176 182 C140 184 112 168 110 130 Z', labelX: 170, labelY: 146 },
  { name: 'Greenland', path: 'M288 72 C314 52 346 56 360 88 C350 124 324 136 300 128 C286 112 282 92 288 72 Z', labelX: 320, labelY: 98 },
  { name: 'Brazil', path: 'M228 272 C258 252 296 258 316 292 C314 334 292 362 258 376 C226 362 212 330 214 298 C216 286 220 278 228 272 Z', labelX: 262, labelY: 316 },
  { name: 'Europe', path: 'M416 142 C448 124 480 126 502 146 C500 174 480 190 454 196 C430 194 412 176 408 154 C410 148 412 144 416 142 Z', labelX: 454, labelY: 162 },
  { name: 'Africa', path: 'M442 226 C476 206 514 214 534 250 C536 316 508 364 466 382 C432 358 418 314 422 264 C426 246 432 234 442 226 Z', labelX: 478, labelY: 296 },
  { name: 'Russia', path: 'M536 112 C596 84 692 88 760 124 C760 168 722 192 664 198 C596 200 548 178 524 146 C522 132 526 120 536 112 Z', labelX: 648, labelY: 146 },
  { name: 'China', path: 'M650 214 C692 196 744 202 782 234 C774 278 738 304 692 308 C656 302 628 278 626 246 C628 232 636 220 650 214 Z', labelX: 706, labelY: 252 },
  { name: 'India', path: 'M684 316 C708 304 734 310 746 336 C742 362 724 380 700 386 C680 378 670 360 672 338 C674 330 678 322 684 316 Z', labelX: 710, labelY: 348 },
  { name: 'Australia', path: 'M744 408 C782 392 832 400 856 430 C852 460 824 478 786 482 C754 474 734 454 734 430 C734 422 738 414 744 408 Z', labelX: 796, labelY: 442 }
];

const defaultRegions = 'Canada|5200000;Greenland|90000;Brazil|2100000;Europe|3900000;Africa|1200000;Russia|2500000;China|18000000;India|3700000;Australia|1700000';
const defaultMarkers = 'Toronto|170|160;London|452|170;Shanghai|720|262;Sydney|810|446';
const defaultRoutes = 'Atlantic corridor|170|160|452|170;Growth route|452|170|720|262;Pacific route|720|262|810|446';

function parseRegions(value: string): VectorRegionData[] {
  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, rawValue = '0'] = entry.split('|').map((part) => part.trim());
      return {
        name,
        value: Number(rawValue)
      };
    });
}

function parseMarkers(value: string): VectorMarker[] {
  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [label, rawX = '0', rawY = '0'] = entry.split('|').map((part) => part.trim());
      return {
        label,
        x: Number(rawX),
        y: Number(rawY)
      };
    });
}

function parseRoutes(value: string): VectorRoute[] {
  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [label, fromX = '0', fromY = '0', toX = '0', toY = '0'] = entry.split('|').map((part) => part.trim());
      return {
        label,
        fromX: Number(fromX),
        fromY: Number(fromY),
        toX: Number(toX),
        toY: Number(toY)
      };
    });
}

function colorForValue(value: number, min: number, max: number): string {
  const palette = ['#8ed0f5', '#73bee9', '#67b0db', '#a7d774', '#88c75c', '#5ea94b'];
  const normalized = max === min ? 0 : (value - min) / (max - min);
  const index = Math.max(0, Math.min(palette.length - 1, Math.round(normalized * (palette.length - 1))));
  return palette[index];
}

@Component({
  tag: 'jarvis-vector-map',
  styleUrl: 'vector-map.scss',
  shadow: true
})
export class JarvisVectorMap {
  @Prop() heading = 'Nominal GDP';
  @Prop() subtitle = 'in millions of US dollars';
  @Prop() items = defaultRegions;
  @Prop() markers = defaultMarkers;
  @Prop() routes = defaultRoutes;
  @Prop() showLegend = true;
  @Prop() legendTitle = 'Legend';
  @Prop() showControls = true;
  @Prop() allowZoom = true;
  @Prop() showLabels = true;
  @Prop() showMarkers = true;
  @Prop() showRoutes = true;
  @Prop() legendMode: 'buckets' | 'top-regions' = 'buckets';
  @Prop() valueFormat: 'number' | 'compact' | 'currency' = 'compact';

  @State() zoom = 1;
  @State() activeRegion = 'China';

  @Event() jarvisSelect: EventEmitter<{ name: string; value: number }>;

  private get regions(): VectorRegionData[] {
    return parseRegions(this.items);
  }

  private get markerPoints(): VectorMarker[] {
    return parseMarkers(this.markers);
  }

  private get routeLines(): VectorRoute[] {
    return parseRoutes(this.routes);
  }

  private get minValue(): number {
    return Math.min(...this.regions.map((item) => item.value));
  }

  private get maxValue(): number {
    return Math.max(...this.regions.map((item) => item.value));
  }

  private get activeData(): VectorRegionData | undefined {
    return this.regions.find((item) => item.name === this.activeRegion);
  }

  private get topRegions(): VectorRegionData[] {
    return [...this.regions].sort((left, right) => right.value - left.value).slice(0, 5);
  }

  private formatValue(value: number): string {
    if (this.valueFormat === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    }
    if (this.valueFormat === 'compact') {
      return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
    }
    return new Intl.NumberFormat('en-US').format(value);
  }

  render() {
    const legendValues = [0, 10000, 50000, 100000, 500000, 1000000];

    return (
      <Host>
        <div class="shell" part="base">
          <div class="map-header" part="header">
            <div>
              <strong>{this.heading}</strong>
              <span>{this.subtitle}</span>
            </div>
            {this.showControls ? (
              <div class="map-controls">
                <button type="button" onClick={() => (this.zoom = Math.max(0.8, this.zoom - 0.1))} disabled={!this.allowZoom}>-</button>
                <button type="button" onClick={() => (this.zoom = Math.min(1.5, this.zoom + 0.1))} disabled={!this.allowZoom}>+</button>
                <button type="button" onClick={() => (this.zoom = 1)}>Reset</button>
              </div>
            ) : null}
          </div>
          <div class="map-panel" part="panel">
            <div class="map-frame">
              <svg viewBox="0 0 960 560" aria-label={this.heading} role="img">
                <rect x="0" y="0" width="960" height="560" rx="32" fill="#f8fbff"></rect>
                <g transform={`translate(${(1 - this.zoom) * 120} ${(1 - this.zoom) * 70}) scale(${this.zoom})`}>
                  {this.showRoutes
                    ? this.routeLines.map((route) => (
                        <g class="route-group">
                          <path
                            class="route"
                            d={`M ${route.fromX} ${route.fromY} C ${(route.fromX + route.toX) / 2} ${route.fromY - 40}, ${(route.fromX + route.toX) / 2} ${route.toY - 40}, ${route.toX} ${route.toY}`}
                          ></path>
                          <text x={(route.fromX + route.toX) / 2} y={Math.min(route.fromY, route.toY) - 24} text-anchor="middle" class="route-label">
                            {route.label}
                          </text>
                        </g>
                      ))
                    : null}
                  {regionShapes.map((shape) => {
                    const datum = this.regions.find((item) => item.name === shape.name);
                    const fill = colorForValue(datum?.value ?? 0, this.minValue, this.maxValue);
                    const active = this.activeRegion === shape.name;
                    return [
                      <path
                        d={shape.path}
                        fill={fill}
                        class={{ region: true, active }}
                        onMouseEnter={() => (this.activeRegion = shape.name)}
                        onClick={() => {
                          this.activeRegion = shape.name;
                          this.jarvisSelect.emit({ name: shape.name, value: datum?.value ?? 0 });
                        }}
                      ></path>,
                      this.showLabels ? <text x={shape.labelX} y={shape.labelY} text-anchor="middle">{shape.name}</text> : null
                    ];
                  })}
                  {this.showMarkers
                    ? this.markerPoints.map((marker) => (
                        <g class="marker" onClick={() => this.jarvisSelect.emit({ name: marker.label, value: 0 })}>
                          <circle cx={marker.x} cy={marker.y} r="7"></circle>
                          <circle cx={marker.x} cy={marker.y} r="14" class="halo"></circle>
                          <text x={marker.x + 18} y={marker.y + 5}>{marker.label}</text>
                        </g>
                      ))
                    : null}
                </g>
              </svg>
              <div class="hover-card" part="tooltip">
                <span class="eyebrow">Active region</span>
                <strong>{this.activeData?.name ?? 'Region'}</strong>
                <span>{this.formatValue(this.activeData?.value ?? 0)}</span>
                {this.showMarkers ? <small>{this.markerPoints.length} markers visible</small> : null}
              </div>
            </div>
            {this.showLegend ? (
              <div class="legend" part="legend">
                <strong>{this.legendTitle}</strong>
                {this.legendMode === 'top-regions'
                  ? this.topRegions.map((region) => (
                      <div class="legend-row">
                        <span class="swatch" style={{ background: colorForValue(region.value, this.minValue, this.maxValue) }}></span>
                        <span class="legend-label">{region.name}</span>
                        <span>{this.formatValue(region.value)}</span>
                      </div>
                    ))
                  : legendValues.map((value) => (
                      <div class="legend-row">
                        <span class="swatch" style={{ background: colorForValue(value, this.minValue, this.maxValue) }}></span>
                        <span>{this.formatValue(value)}</span>
                      </div>
                    ))}
                {this.showRoutes ? <div class="legend-row route-row"><span class="route-swatch"></span><span>Active routes</span></div> : null}
              </div>
            ) : null}
          </div>
        </div>
      </Host>
    );
  }
}
