import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { clamp, createId } from '@eonui/utils';

@Component({
  tag: 'eon-number-box',
  styleUrl: 'number-box.scss',
  shadow: true
})
export class EonNumberBox {
  @Prop() label = '';
  @Prop({ mutable: true }) value: number | null = 0;
  @Prop() min = Number.NEGATIVE_INFINITY;
  @Prop() max = Number.POSITIVE_INFINITY;
  @Prop() step = 1;
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() showSpinButtons = true;
  @Prop() showClearButton = false;
  @Prop() placeholder = '';
  @Prop() format: 'decimal' | 'integer' | 'fixed-point' | 'currency' | 'accounting' | 'percent' | 'unit' = 'decimal';
  @Prop() locale = 'en-US';
  @Prop() currency = 'USD';
  @Prop() unit = '';
  @Prop() fractionDigits = -1;

  @State() inputValue = '';
  @State() focused = false;

  @Event() eonChange: EventEmitter<{ value: number | null }>;

  private inputId = createId('eon-number-box');

  componentWillLoad() {
    this.syncInputValue();
  }

  @Watch('value')
  syncInputValue() {
    this.inputValue = this.focused ? this.toEditableValue(this.value) : this.toDisplayValue(this.value);
  }

  private get descriptionId(): string | undefined {
    return this.invalid && this.errorText ? `${this.inputId}-error` : this.helpText ? `${this.inputId}-help` : undefined;
  }

  private get normalizedMin(): number {
    const nextValue = Number(this.min);
    return Number.isFinite(nextValue) ? nextValue : Number.NEGATIVE_INFINITY;
  }

  private get normalizedMax(): number {
    const nextValue = Number(this.max);
    return Number.isFinite(nextValue) ? nextValue : Number.POSITIVE_INFINITY;
  }

  private get normalizedStep(): number {
    const nextValue = Number(this.step);
    return Number.isFinite(nextValue) && nextValue > 0 ? nextValue : 1;
  }

  private get boundedValue(): number {
    return this.value == null ? (Number.isFinite(this.normalizedMin) ? this.normalizedMin : 0) : clamp(this.value, this.normalizedMin, this.normalizedMax);
  }

  private get effectiveFractionDigits(): number | undefined {
    return this.fractionDigits >= 0 ? this.fractionDigits : undefined;
  }

  private get formatOptions(): Intl.NumberFormatOptions {
    const maximumFractionDigits = this.effectiveFractionDigits;
    const minimumFractionDigits = this.format === 'fixed-point' ? maximumFractionDigits ?? 2 : undefined;

    switch (this.format) {
      case 'integer':
        return {
          maximumFractionDigits: 0
        };
      case 'fixed-point':
        return {
          minimumFractionDigits,
          maximumFractionDigits: maximumFractionDigits ?? 2
        };
      case 'currency':
        return {
          style: 'currency',
          currency: this.currency,
          minimumFractionDigits,
          maximumFractionDigits
        };
      case 'accounting':
        return {
          style: 'currency',
          currency: this.currency,
          currencySign: 'accounting',
          minimumFractionDigits,
          maximumFractionDigits
        };
      case 'unit':
        return {
          minimumFractionDigits,
          maximumFractionDigits
        };
      case 'percent':
        return {
          minimumFractionDigits,
          maximumFractionDigits
        };
      default:
        return {
          minimumFractionDigits,
          maximumFractionDigits
        };
    }
  }

  private get numberFormatter(): Intl.NumberFormat {
    return new Intl.NumberFormat(this.locale, this.formatOptions);
  }

  private get localeSymbols(): { group: string; decimal: string } {
    const parts = new Intl.NumberFormat(this.locale).formatToParts(12345.6);
    return {
      group: parts.find((part) => part.type === 'group')?.value ?? ',',
      decimal: parts.find((part) => part.type === 'decimal')?.value ?? '.'
    };
  }

  private toDisplayValue(value: number | null): string {
    if (value == null || Number.isNaN(value)) {
      return '';
    }

    const formatted = this.numberFormatter.format(value);

    if (this.format === 'percent') {
      return `${formatted}%`;
    }

    if (this.format === 'unit' && this.unit) {
      return `${formatted} ${this.unit}`.trim();
    }

    return formatted;
  }

  private toEditableValue(value: number | null): string {
    if (value == null || Number.isNaN(value)) {
      return '';
    }

    return String(value);
  }

  private parseValue(rawValue: string): number | null {
    const trimmedValue = rawValue.trim();
    if (!trimmedValue) {
      return null;
    }

    const { group, decimal } = this.localeSymbols;
    const escapedGroup = group.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedDecimal = decimal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sanitizedValue = trimmedValue
      .replace(new RegExp(`[^0-9+\\-()${escapedGroup}${escapedDecimal}]`, 'g'), '')
      .replace(new RegExp(escapedGroup, 'g'), '')
      .replace(new RegExp(escapedDecimal, 'g'), '.');

    const wrappedNegative = sanitizedValue.startsWith('(') && sanitizedValue.endsWith(')');
    const normalizedValue = wrappedNegative ? `-${sanitizedValue.slice(1, -1)}` : sanitizedValue;
    const nextValue = Number(normalizedValue);

    return Number.isNaN(nextValue) ? null : nextValue;
  }

  private emitValue(nextValue: number | null) {
    this.value = nextValue;
    this.inputValue = this.focused ? this.toEditableValue(nextValue) : this.toDisplayValue(nextValue);
    this.eonChange.emit({ value: nextValue });
  }

  private updateValue(nextValue: number | null) {
    if (nextValue == null || Number.isNaN(nextValue)) {
      this.emitValue(null);
      return;
    }

    const bounded = clamp(nextValue, this.normalizedMin, this.normalizedMax);
    this.emitValue(Number.isFinite(bounded) ? bounded : 0);
  }

  private commitRawValue(rawValue: string) {
    const nextValue = this.parseValue(rawValue);
    if (nextValue != null) {
      this.updateValue(nextValue);
      return;
    }

    if (rawValue.trim() === '') {
      this.emitValue(null);
      return;
    }

    this.inputValue = this.toDisplayValue(this.value);
  }

  render() {
    return (
      <Host>
        <label class="field" part="base">
          {this.label ? <span class="label" id={`${this.inputId}-label`}>{this.label}</span> : null}
          <div class={{ 'control-wrap': true, invalid: this.invalid, readonly: this.readOnly }}>
            <input
              id={this.inputId}
              part="control"
              type="text"
              value={this.inputValue}
              inputMode={this.format === 'integer' ? 'numeric' : 'decimal'}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readOnly}
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-describedby={this.descriptionId}
              aria-invalid={this.invalid ? 'true' : 'false'}
              onFocus={() => {
                this.focused = true;
                this.inputValue = this.toEditableValue(this.value);
              }}
              onInput={(event) => {
                const rawValue = (event.target as HTMLInputElement).value;
                this.inputValue = rawValue;
                if (rawValue.trim() === '') {
                  this.emitValue(null);
                  return;
                }

                const nextValue = this.parseValue(rawValue);
                if (nextValue != null) {
                  this.value = nextValue;
                  this.eonChange.emit({ value: nextValue });
                }
              }}
              onBlur={() => {
                this.focused = false;
                this.commitRawValue(this.inputValue);
              }}
            />
            {this.showClearButton ? (
              <button type="button" class="icon clear" part="clear" aria-label="Clear value" onClick={() => this.updateValue(null)} disabled={this.disabled || this.readOnly}>
                x
              </button>
            ) : null}
            {this.showSpinButtons ? (
              <div class="spin-buttons" part="spin-buttons">
                <button type="button" class="icon" part="spin-up" aria-label="Increase value" disabled={this.disabled || this.readOnly} onClick={() => this.updateValue(this.boundedValue + this.normalizedStep)}>
                  +
                </button>
                <button type="button" class="icon" part="spin-down" aria-label="Decrease value" disabled={this.disabled || this.readOnly} onClick={() => this.updateValue(this.boundedValue - this.normalizedStep)}>
                  -
                </button>
              </div>
            ) : null}
          </div>
          {this.invalid && this.errorText ? (
            <div class="message error" id={`${this.inputId}-error`} part="error">
              {this.errorText}
            </div>
          ) : this.helpText ? (
            <div class="message help" id={`${this.inputId}-help`} part="help">
              {this.helpText}
            </div>
          ) : null}
        </label>
      </Host>
    );
  }
}
