import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { createId } from '@jarvis/utils';

function normalizeHex(value: string): string {
  const match = value.trim().match(/^#?([0-9a-f]{6})$/i);
  return match ? `#${match[1].toLowerCase()}` : '#f05b41';
}

function parseAlpha(value: string): number {
  const rgbaMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (!rgbaMatch) {
    return 1;
  }

  const values = rgbaMatch[1].split(',').map((part) => Number(part.trim()));
  return Number.isFinite(values[3]) ? Math.max(0, Math.min(1, values[3])) : 1;
}

function displayColor(hex: string, alpha: number, editAlpha: boolean): string {
  if (!editAlpha) {
    return hex;
  }

  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(2)})`;
}

@Component({
  tag: 'jarvis-color-box',
  styleUrl: 'color-box.scss',
  shadow: true
})
export class JarvisColorBox {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop({ mutable: true }) value = '#f05b41';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() editAlphaChannel = false;
  @Prop() showApplyButton = true;
  @Prop() applyButtonText = 'Apply';
  @Prop() cancelButtonText = 'Cancel';
  @Prop() presets = '';

  @State() open = false;
  @State() workingHex = '#f05b41';
  @State() workingAlpha = 1;

  @Event() jarvisChange: EventEmitter<{ value: string }>;

  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private fieldId = createId('jarvis-color-box');

  componentWillLoad() {
    this.syncFromValue(this.value);
  }

  @Watch('value')
  syncFromValue(value: string) {
    const hex = normalizeHex(value);
    this.workingHex = hex;
    this.workingAlpha = parseAlpha(value);
  }

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      this.open = false;
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
  }

  private get descriptionId(): string | undefined {
    return this.invalid && this.errorText ? `${this.fieldId}-error` : this.helpText ? `${this.fieldId}-help` : undefined;
  }

  private applyValue() {
    const nextValue = displayColor(this.workingHex, this.workingAlpha, this.editAlphaChannel);
    this.value = nextValue;
    this.jarvisChange.emit({ value: nextValue });
    this.open = false;
  }

  private get presetColors(): string[] {
    return this.presets
      .split(/[;,]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => normalizeHex(item));
  }

  render() {
    const displayValue = displayColor(this.workingHex, this.workingAlpha, this.editAlphaChannel);

    return (
      <Host>
        <div class="field" part="base">
          {this.label ? (
            <span class="label" part="label">
              {this.label}
              {this.required ? <span class="required-indicator" aria-hidden="true">*</span> : null}
            </span>
          ) : null}
          <button
            type="button"
            class={{ trigger: true, invalid: this.invalid }}
            part="trigger"
            disabled={this.disabled}
            aria-haspopup="dialog"
            aria-expanded={String(this.open)}
            aria-required={this.required ? 'true' : undefined}
            aria-invalid={this.invalid ? 'true' : 'false'}
            aria-describedby={this.descriptionId}
            onClick={() => {
              if (!this.readOnly && !this.disabled) {
                this.open = !this.open;
              }
            }}
          >
            <span class="swatch" part="swatch" style={{ background: displayValue }}></span>
            <span class="value" part="value">{displayValue}</span>
            <span class={{ chevron: true, open: this.open }} aria-hidden="true">v</span>
          </button>
          <div class={{ panel: true, open: this.open }} part="panel" role="dialog" aria-label="Color picker" hidden={!this.open}>
            <div class="preview-row">
              <div class="preview" style={{ background: displayValue }}></div>
              <div class="channels">
                <label>
                  <span>Hex</span>
                  <input type="text" value={this.workingHex} onInput={(event) => (this.workingHex = normalizeHex((event.target as HTMLInputElement).value))} />
                </label>
                {this.editAlphaChannel ? (
                  <label>
                    <span>Alpha</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={String(Math.round(this.workingAlpha * 100))}
                      onInput={(event) => (this.workingAlpha = Number((event.target as HTMLInputElement).value) / 100)}
                    />
                  </label>
                ) : null}
              </div>
            </div>
            {this.presetColors.length ? (
              <div class="presets" part="presets">
                {this.presetColors.map((preset) => (
                  <button
                    type="button"
                    class={{ preset: true, active: preset === this.workingHex }}
                    part="preset"
                    style={{ background: preset }}
                    aria-label={`Select ${preset}`}
                    onClick={() => {
                      this.workingHex = preset;
                      if (!this.showApplyButton) {
                        this.applyValue();
                      }
                    }}
                  />
                ))}
              </div>
            ) : null}
            <input
              class="color-input"
              part="color-input"
              type="color"
              value={this.workingHex}
              onInput={(event) => {
                this.workingHex = normalizeHex((event.target as HTMLInputElement).value);
                if (!this.showApplyButton) {
                  this.applyValue();
                }
              }}
            />
            <div class="actions">
              {this.showApplyButton ? (
                [
                  <button type="button" class="secondary" onClick={() => (this.open = false)}>{this.cancelButtonText}</button>,
                  <button type="button" class="primary" onClick={() => this.applyValue()}>{this.applyButtonText}</button>
                ]
              ) : null}
            </div>
          </div>
          {this.invalid && this.errorText ? (
            <div class="message error" id={`${this.fieldId}-error`} part="error">
              {this.errorText}
            </div>
          ) : this.helpText ? (
            <div class="message help" id={`${this.fieldId}-help`} part="help">
              {this.helpText}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
