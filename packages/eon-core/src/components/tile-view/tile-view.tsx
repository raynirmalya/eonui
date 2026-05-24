import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';

interface TileViewItem {
  title: string;
  subtitle: string;
  value: string;
  palette: string[];
  width: number;
  height: number;
  badge?: string;
  disabled?: boolean;
}

function parseTileSize(value: string | undefined): { width: number; height: number } {
  const [width, height] = (value ?? '1x1').split('x').map((segment) => Number.parseInt(segment.trim(), 10));
  return {
    width: Number.isFinite(width) && width > 0 ? width : 1,
    height: Number.isFinite(height) && height > 0 ? height : 1
  };
}

function parseTileItems(value: string): TileViewItem[] {
  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry, index) => {
      const [title, subtitle, colors, size, badge, rawFlags = ''] = entry.split('|').map((segment) => segment.trim());
      const disabled = rawFlags.toLowerCase().split(/[ ,]+/).includes('disabled');
      const palette = (colors ?? '')
        .split(',')
        .map((segment) => segment.trim())
        .filter(Boolean);
      const spans = parseTileSize(size);
      const safeTitle = title || `Tile ${index + 1}`;
      return {
        title: safeTitle,
        subtitle: subtitle || '',
        value: safeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        palette: palette.length ? palette : ['#dbeafe', '#60a5fa'],
        width: spans.width,
        height: spans.height,
        badge: badge || undefined,
        disabled
      };
    });
}

@Component({
  tag: 'eon-tile-view',
  styleUrl: 'tile-view.scss',
  shadow: true
})
export class EonTileView {
  @Prop() items =
    'Hamburg Suites|$299 per night|#dbeafe,#60a5fa|2x2; Forest Retreat|Boardroom and wellness wing|#dcfce7,#22c55e|1x2; City Loft|Skyline meeting room|#ede9fe,#8b5cf6|1x1; Harbour Villa|Waterfront residence|#fef3c7,#f59e0b|1x1; Studio Nine|Production floor|#fee2e2,#ef4444|1x1; North Campus|Innovation lab|#e0f2fe,#38bdf8|2x1';
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Prop() baseItemWidth = '9rem';
  @Prop() baseItemHeight = '7rem';
  @Prop() gap = '0.9rem';
  @Prop({ mutable: true, reflect: true }) value = '';
  @Prop() ariaLabel = 'Tile view';
  @Prop() readOnly = false;
  @Prop() showSelectionIndicator = true;
  @Prop() showSubtitles = true;

  @State() focusedIndex = 0;

  @Event() eonSelect: EventEmitter<{ value: string; title: string; index: number }>;

  componentWillLoad() {
    this.syncFocus();
  }

  @Watch('items')
  @Watch('value')
  syncFocus() {
    const items = parseTileItems(this.items);
    const selectedIndex = items.findIndex((item) => item.value === this.value && !item.disabled);
    this.focusedIndex = selectedIndex >= 0 ? selectedIndex : items.findIndex((item) => !item.disabled);
  }

  private onSelect(item: TileViewItem, index: number) {
    if (this.readOnly || item.disabled) {
      return;
    }
    this.value = item.value;
    this.focusedIndex = index;
    this.eonSelect.emit({
      value: item.value,
      title: item.title,
      index
    });
  }

  private onKeyDown = (event: KeyboardEvent, index: number) => {
    const items = parseTileItems(this.items);
    const enabled = items.map((item, itemIndex) => ({ item, itemIndex })).filter(({ item }) => !item.disabled);
    const currentEnabledIndex = enabled.findIndex(({ itemIndex }) => itemIndex === index);
    if (currentEnabledIndex === -1) {
      return;
    }

    const moveTo = (targetEnabledIndex: number) => {
      const target = enabled[Math.max(0, Math.min(targetEnabledIndex, enabled.length - 1))];
      if (target) {
        this.focusedIndex = target.itemIndex;
      }
    };

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      moveTo(currentEnabledIndex + 1);
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      moveTo(currentEnabledIndex - 1);
      event.preventDefault();
      return;
    }

    if (event.key === 'Home') {
      moveTo(0);
      event.preventDefault();
      return;
    }

    if (event.key === 'End') {
      moveTo(enabled.length - 1);
      event.preventDefault();
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && !this.readOnly) {
      const target = items[index];
      if (target && !target.disabled) {
        this.onSelect(target, index);
        event.preventDefault();
      }
    }
  };

  render() {
    const items = parseTileItems(this.items);

    return (
      <Host>
        <div
          class={{ grid: true, [this.direction]: true }}
          part="base"
          aria-label={this.ariaLabel}
          style={{
            '--tile-width': this.baseItemWidth,
            '--tile-height': this.baseItemHeight,
            '--tile-gap': this.gap
          }}
        >
          {items.map((item, index) => (
            <button
              type="button"
              class={{
                tile: true,
                selected: this.value ? this.value === item.value : index === 0,
                disabled: Boolean(item.disabled),
                focused: index === this.focusedIndex
              }}
              part="tile"
              aria-disabled={item.disabled ? 'true' : undefined}
              tabindex={item.disabled ? -1 : index === this.focusedIndex ? 0 : -1}
              style={{
                '--tile-col': `${item.width}`,
                '--tile-row': `${item.height}`,
                '--tile-start': item.palette[0],
                '--tile-end': item.palette[1] ?? item.palette[0]
              }}
              onKeyDown={(event) => this.onKeyDown(event, index)}
              onClick={() => this.onSelect(item, index)}
            >
              <div class="scrim"></div>
              {item.badge ? <span class="badge">{item.badge}</span> : null}
              {this.showSelectionIndicator && (this.value ? this.value === item.value : index === 0) ? <span class="selection-indicator" aria-hidden="true">Selected</span> : null}
              <div class="content">
                <strong>{item.title}</strong>
                {this.showSubtitles && item.subtitle ? <span>{item.subtitle}</span> : null}
              </div>
            </button>
          ))}
        </div>
      </Host>
    );
  }
}
