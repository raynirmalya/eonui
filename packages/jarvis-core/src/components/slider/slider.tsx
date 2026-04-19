import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { clamp, createId } from '@jarvis/utils';
import { formatNumericValue, type JarvisNumericFormat } from '../shared/helpers';

@Component({
  tag: 'jarvis-slider',
  styleUrl: 'slider.scss',
  shadow: true
})
export class JarvisSlider {
  @Prop() label = '';
  @Prop({ mutable: true }) value = 50;
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
  @Prop() showTooltip = false;
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

  @Event() jarvisChange: EventEmitter<{ value: number }>;

  private inputId = createId('jarvis-slider');

  private get minValue(): number {
    return Number.isFinite(this.min) ? this.min : 0;
  }

  private get maxValue(): number {
    return Number.isFinite(this.max) && this.max > this.minValue ? this.max : this.minValue + 100;
  }

  private get stepValue(): number {
    return Number.isFinite(this.step) && this.step > 0 ? this.step : 1;
  }

  private get currentValue(): number {
    return clamp(this.value, this.minValue, this.maxValue);
  }

  private get rangeSpan(): number {
    return this.maxValue - this.minValue || 1;
  }

  private get percent(): number {
    return ((this.currentValue - this.minValue) / this.rangeSpan) * 100;
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

  private handleInput(event: Event) {
    if (this.disabled || this.readOnly) {
      (event.target as HTMLInputElement).value = String(this.currentValue);
      return;
    }

    this.value = clamp(Number((event.target as HTMLInputElement).value), this.minValue, this.maxValue);
    this.jarvisChange.emit({ value: this.value });
  }

  render() {
    const valueText = this.formatValue(this.currentValue);
    const invalidState = this.invalid;

    return (
      <Host style={{ '--percent': `${this.percent}%` }}>
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
              id={this.inputId}
              part="control"
              type="range"
              min={String(this.minValue)}
              max={String(this.maxValue)}
              step={String(this.stepValue)}
              value={String(this.currentValue)}
              disabled={this.disabled}
              aria-required={this.required ? 'true' : undefined}
              aria-invalid={invalidState ? 'true' : 'false'}
              aria-readonly={this.readOnly ? 'true' : 'false'}
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-describedby={this.describedBy}
              aria-valuemin={String(this.minValue)}
              aria-valuemax={String(this.maxValue)}
              aria-valuenow={String(this.currentValue)}
              aria-valuetext={valueText}
              onInput={(event) => this.handleInput(event)}
            />
            {this.showTooltip ? (
              <span class="tooltip" part="tooltip">
                {valueText}
              </span>
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
