import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { clamp, createId } from '@jarvis/utils';
import { formatNumericValue, type JarvisNumericFormat } from '../shared/helpers';

@Component({
  tag: 'jarvis-range-slider',
  styleUrl: 'range-slider.scss',
  shadow: true
})
export class JarvisRangeSlider {
  @Prop() label = '';
  @Prop({ mutable: true }) start = 20;
  @Prop({ mutable: true }) end = 80;
  @Prop() min = 0;
  @Prop() max = 100;
  @Prop() step = 1;
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() showLabels = false;
  @Prop() showTooltips = false;
  @Prop() showRangeFill = true;
  @Prop() showTicks = false;
  @Prop() showTickLabels = false;
  @Prop() tickInterval = 0;
  @Prop() valuePrefix = '';
  @Prop() valueSuffix = '';
  @Prop() format: JarvisNumericFormat = 'decimal';
  @Prop() locale = 'en-US';
  @Prop() currency = 'USD';
  @Prop() unit = '';
  @Prop() fractionDigits = -1;

  @State() activeThumb: 'start' | 'end' | null = null;

  @Event() jarvisChange: EventEmitter<{ start: number; end: number }>;

  private inputId = createId('jarvis-range-slider');

  private get minValue(): number {
    return Number.isFinite(this.min) ? this.min : 0;
  }

  private get maxValue(): number {
    return Number.isFinite(this.max) && this.max > this.minValue ? this.max : this.minValue + 100;
  }

  private get stepValue(): number {
    return Number.isFinite(this.step) && this.step > 0 ? this.step : 1;
  }

  private get rangeSpan(): number {
    return this.maxValue - this.minValue || 1;
  }

  private get startValue(): number {
    return Math.min(clamp(this.start, this.minValue, this.maxValue), clamp(this.end, this.minValue, this.maxValue));
  }

  private get endValue(): number {
    return Math.max(clamp(this.start, this.minValue, this.maxValue), clamp(this.end, this.minValue, this.maxValue));
  }

  private get effectiveTickInterval(): number {
    return Number.isFinite(this.tickInterval) && this.tickInterval > 0 ? this.tickInterval : this.stepValue;
  }

  private get ticks(): number[] {
    if (!this.showTicks) {
      return [];
    }

    const nextTicks: number[] = [];
    const epsilon = this.rangeSpan / 100000;

    for (let current = this.minValue, index = 0; current <= this.maxValue + epsilon && index < 200; current += this.effectiveTickInterval, index += 1) {
      nextTicks.push(Number(Math.min(current, this.maxValue).toFixed(6)));
    }

    if (!nextTicks.length || Math.abs(nextTicks[nextTicks.length - 1] - this.maxValue) > epsilon) {
      nextTicks.push(this.maxValue);
    }

    return [...new Set(nextTicks)];
  }

  private formatValue(value: number): string {
    return formatNumericValue(value, {
      format: this.format,
      locale: this.locale,
      currency: this.currency,
      unit: this.unit,
      fractionDigits: this.fractionDigits,
      valuePrefix: this.valuePrefix,
      valueSuffix: this.valueSuffix
    });
  }

  private get describedBy(): string | undefined {
    const ids: string[] = [];

    if (this.helpText) {
      ids.push(`${this.inputId}-help`);
    }

    if (this.invalid && this.errorText) {
      ids.push(`${this.inputId}-error`);
    }

    return ids.length ? ids.join(' ') : undefined;
  }

  private updateStart(nextValue: number) {
    if (this.disabled || this.readOnly) {
      return;
    }

    this.start = Math.min(clamp(nextValue, this.minValue, this.maxValue), this.endValue);
    this.jarvisChange.emit({ start: this.startValue, end: this.endValue });
  }

  private updateEnd(nextValue: number) {
    if (this.disabled || this.readOnly) {
      return;
    }

    this.end = Math.max(clamp(nextValue, this.minValue, this.maxValue), this.startValue);
    this.jarvisChange.emit({ start: this.startValue, end: this.endValue });
  }

  render() {
    const startPercent = ((this.startValue - this.minValue) / this.rangeSpan) * 100;
    const endPercent = ((this.endValue - this.minValue) / this.rangeSpan) * 100;
    const startText = this.formatValue(this.startValue);
    const endText = this.formatValue(this.endValue);
    const invalidState = this.invalid;

    return (
      <Host style={{ '--start-percent': `${startPercent}%`, '--end-percent': `${endPercent}%` }}>
        <div
          class={{
            slider: true,
            'no-fill': !this.showRangeFill,
            'with-tick-labels': this.showTicks && this.showTickLabels,
            invalid: invalidState,
            readonly: this.readOnly,
            disabled: this.disabled
          }}
          part="base"
        >
          {this.label ? (
            <div class="label" id={`${this.inputId}-label`} part="label">
              <span>{this.label}</span>
              {this.required ? <span class="required-indicator" aria-hidden="true">*</span> : null}
            </div>
          ) : null}
          <div class="track-wrap">
            <div class="track" part="track"></div>
            {this.showRangeFill ? <div class="range" part="fill"></div> : null}
            {this.showTicks ? (
              <div class="ticks" part="ticks">
                {this.ticks.map((tick) => {
                  const tickPercent = ((tick - this.minValue) / this.rangeSpan) * 100;
                  return (
                    <span class="tick" style={{ left: `${tickPercent}%` }}>
                      <span class="tick-line"></span>
                      {this.showTickLabels ? <span class="tick-label">{this.formatValue(tick)}</span> : null}
                    </span>
                  );
                })}
              </div>
            ) : null}
            <input
              id={`${this.inputId}-start`}
              class={{ start: true, active: this.activeThumb === 'start' }}
              part="start"
              type="range"
              min={String(this.minValue)}
              max={String(this.maxValue)}
              step={String(this.stepValue)}
              value={String(this.startValue)}
              disabled={this.disabled}
              aria-required={this.required ? 'true' : undefined}
              aria-invalid={invalidState ? 'true' : 'false'}
              aria-readonly={this.readOnly ? 'true' : 'false'}
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-describedby={this.describedBy}
              aria-label={this.label ? `${this.label} start value` : 'Start value'}
              aria-valuemin={String(this.minValue)}
              aria-valuemax={String(this.maxValue)}
              aria-valuenow={String(this.startValue)}
              aria-valuetext={startText}
              onPointerDown={() => (this.activeThumb = 'start')}
              onFocus={() => (this.activeThumb = 'start')}
              onBlur={() => (this.activeThumb = null)}
              onInput={(event) => {
                const input = event.target as HTMLInputElement;
                if (this.disabled || this.readOnly) {
                  input.value = String(this.startValue);
                  return;
                }

                this.updateStart(Number(input.value));
              }}
            />
            <input
              id={`${this.inputId}-end`}
              class={{ end: true, active: this.activeThumb === 'end' }}
              part="end"
              type="range"
              min={String(this.minValue)}
              max={String(this.maxValue)}
              step={String(this.stepValue)}
              value={String(this.endValue)}
              disabled={this.disabled}
              aria-required={this.required ? 'true' : undefined}
              aria-invalid={invalidState ? 'true' : 'false'}
              aria-readonly={this.readOnly ? 'true' : 'false'}
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-describedby={this.describedBy}
              aria-label={this.label ? `${this.label} end value` : 'End value'}
              aria-valuemin={String(this.minValue)}
              aria-valuemax={String(this.maxValue)}
              aria-valuenow={String(this.endValue)}
              aria-valuetext={endText}
              onPointerDown={() => (this.activeThumb = 'end')}
              onFocus={() => (this.activeThumb = 'end')}
              onBlur={() => (this.activeThumb = null)}
              onInput={(event) => {
                const input = event.target as HTMLInputElement;
                if (this.disabled || this.readOnly) {
                  input.value = String(this.endValue);
                  return;
                }

                this.updateEnd(Number(input.value));
              }}
            />
            {this.showTooltips ? (
              <div class="tooltips" part="tooltips">
                <span class="tooltip start-tip" part="start-tooltip">{startText}</span>
                <span class="tooltip end-tip" part="end-tooltip">{endText}</span>
              </div>
            ) : null}
          </div>
          {this.showLabels ? (
            <div class="range-labels" part="labels">
              <span>{this.formatValue(this.minValue)}</span>
              <span>{this.formatValue(this.maxValue)}</span>
            </div>
          ) : null}
          {this.helpText || (invalidState && this.errorText) ? (
            <div class="messages">
              {this.helpText ? (
                <div class="help-text" id={`${this.inputId}-help`} part="help">
                  {this.helpText}
                </div>
              ) : null}
              {invalidState && this.errorText ? (
                <div class="error-text" id={`${this.inputId}-error`} part="error">
                  {this.errorText}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
