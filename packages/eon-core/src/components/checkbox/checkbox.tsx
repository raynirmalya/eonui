import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { createId } from '@eonui/utils';

@Component({
  tag: 'eon-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true
})
export class EonCheckbox {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop() name = '';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop({ mutable: true, reflect: true }) indeterminate = false;
  @Prop() threeState = false;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() labelPosition: 'start' | 'end' = 'end';

  @Event() eonChange: EventEmitter<{ checked: boolean; indeterminate: boolean }>;
  private input?: HTMLInputElement;
  private fieldId = createId('eon-checkbox');

  componentDidLoad() {
    this.syncInputState();
  }

  componentDidRender() {
    this.syncInputState();
  }

  private syncInputState() {
    if (!this.input) {
      return;
    }

    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
  }

  private emitChange() {
    this.eonChange.emit({ checked: this.checked, indeterminate: this.indeterminate });
  }

  private onToggle = (event: Event) => {
    event.preventDefault();

    if (this.disabled || this.readOnly) {
      if (this.input) {
        this.input.checked = this.checked;
        this.input.indeterminate = this.indeterminate;
      }
      return;
    }

    if (this.threeState) {
      if (this.indeterminate) {
        this.indeterminate = false;
        this.checked = true;
      } else if (this.checked) {
        this.indeterminate = false;
        this.checked = false;
      } else {
        this.indeterminate = true;
        this.checked = false;
      }
    } else {
      this.indeterminate = false;
      this.checked = !this.checked;
    }

    this.emitChange();
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
          <label part="control" class={{ checkbox: true, [this.size]: true, 'label-start': this.labelPosition === 'start' }}>
            <input
              type="checkbox"
              checked={this.checked}
              name={this.name}
              disabled={this.disabled}
              aria-checked={this.indeterminate ? 'mixed' : String(this.checked)}
              aria-invalid={this.invalid ? 'true' : 'false'}
              aria-required={this.required ? 'true' : undefined}
              aria-readonly={this.readOnly ? 'true' : undefined}
              aria-describedby={this.descriptionId}
              onClick={this.onToggle}
              ref={(element) => (this.input = element as HTMLInputElement)}
            />
            <span part="indicator" class="indicator" aria-hidden="true" />
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
