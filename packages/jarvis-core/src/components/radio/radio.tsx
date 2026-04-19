import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { createId } from '@jarvis/utils';

@Component({
  tag: 'jarvis-radio',
  styleUrl: 'radio.scss',
  shadow: true
})
export class JarvisRadio {
  @Prop() label = '';
  @Prop({ reflect: true }) checked = false;
  @Prop() name = '';
  @Prop() value = '';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';

  @Event() jarvisChange: EventEmitter<{ checked: boolean; value: string }>;
  private fieldId = createId('jarvis-radio');

  private onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (this.readOnly) {
      input.checked = this.checked;
      event.preventDefault();
      return;
    }

    this.jarvisChange.emit({ checked: input.checked, value: this.value });
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
          <label class="radio" part="control">
            <input
              type="radio"
              name={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              aria-invalid={this.invalid ? 'true' : 'false'}
              aria-required={this.required ? 'true' : undefined}
              aria-readonly={this.readOnly ? 'true' : undefined}
              aria-describedby={this.descriptionId}
              onChange={this.onChange}
            />
            <span class="indicator" part="indicator" aria-hidden="true" />
            <span part="label" class="label">
              <slot>{this.label}</slot>
              {this.required ? <span class="required-indicator" aria-hidden="true">*</span> : null}
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
