import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { createId } from '@eonui/utils';

@Component({
  tag: 'eon-switch',
  styleUrl: 'switch.scss',
  shadow: true
})
export class EonSwitch {
  @Prop() label = '';
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop({ attribute: 'on-text' }) enabledText = 'On';
  @Prop({ attribute: 'off-text' }) disabledText = 'Off';
  @Prop() showText = false;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() labelPosition: 'start' | 'end' = 'end';

  @Event() eonChange: EventEmitter<{ checked: boolean }>;
  private fieldId = createId('eon-switch');

  private onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (this.readOnly) {
      input.checked = this.checked;
      event.preventDefault();
      return;
    }

    this.checked = input.checked;
    this.eonChange.emit({ checked: this.checked });
  };

  private get descriptionId(): string | undefined {
    if (this.invalid && this.errorText) {
      return `${this.fieldId}-error`;
    }

    if (this.helpText) {
      return `${this.fieldId}-help`;
    }

    return undefined;
  }

  render() {
    return (
      <Host>
        <div class={{ field: true, invalid: this.invalid, readonly: this.readOnly }} part="base">
          <label class={{ switch: true, [this.size]: true, 'label-start': this.labelPosition === 'start' }} part="control">
            <span part="label" class="label">
              <slot>{this.label}</slot>
              {this.required ? <span class="required-indicator" aria-hidden="true">*</span> : null}
            </span>
            <span class="track">
              <input
                type="checkbox"
                role="switch"
                checked={this.checked}
                disabled={this.disabled}
                aria-invalid={this.invalid ? 'true' : 'false'}
                aria-required={this.required ? 'true' : undefined}
                aria-readonly={this.readOnly ? 'true' : undefined}
                aria-describedby={this.descriptionId}
                onChange={this.onChange}
              />
              <span class="thumb" part="thumb" aria-hidden="true" />
              {this.showText ? <span class="state-text" part="text">{this.checked ? this.enabledText : this.disabledText}</span> : null}
            </span>
          </label>
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
