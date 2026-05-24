import { Component, Element, Event, EventEmitter, Prop, State, h, Host } from '@stencil/core';
import { clamp } from '@eonui/utils';

interface RangeSelectorTick {
  value: number;
  label: string;
}

function parseTicks(value: string, min: number, max: number, format: 'number' | 'currency' | 'label'): RangeSelectorTick[] {
  if (!value.trim()) {
    const step = (max - min) / 5;
    return new Array(6).fill(null).map((_, index) => {
      const next = Math.round(min + step * index);
      return {
        value: next,
        label: format === 'currency' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(next) : new Intl.NumberFormat('en-US').format(next)
      };
    });
  }

  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [rawValue, label] = entry.split('|').map((part) => part.trim());
      return {
        value: Number(rawValue),
        label: label || rawValue
      };
    });
}

@Component({
  tag: 'eon-range-selector',
  styleUrl: 'range-selector.scss',
  shadow: true
})
export class EonRangeSelector {
  @Element() host!: HTMLElement;
  @Prop() heading = 'Select range';
  @Prop({ mutable: true }) start = 40000;
  @Prop({ mutable: true }) end = 80000;
  @Prop() min = 15000;
  @Prop() max = 150000;
  @Prop() ticks = '';
  @Prop() format: 'number' | 'currency' | 'label' = 'currency';
  @Prop() step = 1000;
  @Prop() minRange = 0;
  @Prop() maxRange = 0;
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() showTicks = true;
  @Prop() showValueLabels = true;

  @State() activeHandle: '' | 'start' | 'end' = '';

  @Event() eonChange: EventEmitter<{ start: number; end: number }>;

  private track?: HTMLDivElement;

  private get tickList(): RangeSelectorTick[] {
    return parseTicks(this.ticks, this.min, this.max, this.format);
  }

  private valueToPercent(value: number): number {
    return ((value - this.min) / (this.max - this.min)) * 100;
  }

  private pointerToValue(clientX: number): number {
    const rect = this.track?.getBoundingClientRect();
    if (!rect) {
      return this.start;
    }

    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = this.min + ratio * (this.max - this.min);
    return Math.round(raw / this.step) * this.step;
  }

  private formatValue(value: number): string {
    if (this.format === 'currency') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    }
    return new Intl.NumberFormat('en-US').format(value);
  }

  private commit(nextStart: number, nextEnd: number) {
    const minGap = Math.max(0, this.minRange);
    const maxGap = Math.max(0, this.maxRange);
    let resolvedStart = Math.min(nextStart, nextEnd);
    let resolvedEnd = Math.max(nextStart, nextEnd);

    if (resolvedEnd - resolvedStart < minGap) {
      if (this.activeHandle === 'start') {
        resolvedStart = resolvedEnd - minGap;
      } else {
        resolvedEnd = resolvedStart + minGap;
      }
    }

    if (maxGap && resolvedEnd - resolvedStart > maxGap) {
      if (this.activeHandle === 'start') {
        resolvedStart = resolvedEnd - maxGap;
      } else {
        resolvedEnd = resolvedStart + maxGap;
      }
    }

    this.start = clamp(resolvedStart, this.min, this.max);
    this.end = clamp(resolvedEnd, this.min, this.max);
    this.eonChange.emit({ start: this.start, end: this.end });
  }

  private onPointerMove = (event: PointerEvent) => {
    if (!this.activeHandle) {
      return;
    }

    const nextValue = this.pointerToValue(event.clientX);
    if (this.activeHandle === 'start') {
      this.commit(Math.min(nextValue, this.end), this.end);
      return;
    }

    this.commit(this.start, Math.max(nextValue, this.start));
  };

  private stopDragging = () => {
    this.activeHandle = '';
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.stopDragging);
  };

  private startDragging(handle: 'start' | 'end') {
    if (this.disabled || this.readOnly) {
      return;
    }
    this.activeHandle = handle;
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.stopDragging);
  }

  private nudge(handle: 'start' | 'end', amount: number) {
    if (this.disabled || this.readOnly) {
      return;
    }
    this.activeHandle = handle;
    if (handle === 'start') {
      this.commit(this.start + amount, this.end);
    } else {
      this.commit(this.start, this.end + amount);
    }
    this.activeHandle = '';
  }

  render() {
    return (
      <Host>
        <div class={{ selector: true, disabled: this.disabled, readonly: this.readOnly }} part="base">
          <div class="header" part="header">
            <div>
              <strong>{this.heading}</strong>
              <span>{this.formatValue(this.start)} - {this.formatValue(this.end)}</span>
            </div>
          </div>
          <div class="track-shell">
            <div class="track" part="track" ref={(element) => (this.track = element as HTMLDivElement)}>
              <div class="rail"></div>
              <div class="selection" style={{ left: `${this.valueToPercent(this.start)}%`, width: `${this.valueToPercent(this.end) - this.valueToPercent(this.start)}%` }}></div>
              <button
                type="button"
                class="handle"
                part="start-handle"
                style={{ left: `${this.valueToPercent(this.start)}%` }}
                aria-label="Range start"
                disabled={this.disabled}
                onPointerDown={() => this.startDragging('start')}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                    this.nudge('start', -this.step);
                  } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                    this.nudge('start', this.step);
                  }
                }}
              >
                {this.showValueLabels ? <span>{this.formatValue(this.start)}</span> : null}
              </button>
              <button
                type="button"
                class="handle"
                part="end-handle"
                style={{ left: `${this.valueToPercent(this.end)}%` }}
                aria-label="Range end"
                disabled={this.disabled}
                onPointerDown={() => this.startDragging('end')}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                    this.nudge('end', -this.step);
                  } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                    this.nudge('end', this.step);
                  }
                }}
              >
                {this.showValueLabels ? <span>{this.formatValue(this.end)}</span> : null}
              </button>
            </div>
            {this.showTicks ? (
              <div class="ticks" part="ticks">
                {this.tickList.map((tick) => (
                  <div class="tick" style={{ left: `${this.valueToPercent(tick.value)}%` }}>
                    <span class="tick-mark"></span>
                    <span class="tick-label">{tick.label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Host>
    );
  }
}
