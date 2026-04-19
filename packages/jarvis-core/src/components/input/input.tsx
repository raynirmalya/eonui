import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { createId } from '@jarvis/utils';

@Component({
  tag: 'jarvis-input',
  styleUrl: 'input.scss',
  shadow: true
})
export class JarvisInput {
  @Prop() label = '';
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder = '';
  @Prop() name = '';
  @Prop() type: 'text' | 'email' | 'password' | 'search' = 'text';
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() showClearButton = false;
  @Prop() showRevealButton = false;
  @Prop() maxLength?: number;
  @Prop() showCount = false;

  @State() passwordVisible = false;

  @Event() jarvisInput: EventEmitter<{ value: string }>;
  private inputId = createId('jarvis-input');
  private helpTextId = createId('jarvis-input-help');
  private errorTextId = createId('jarvis-input-error');
  private counterId = createId('jarvis-input-count');

  private onInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
    this.jarvisInput.emit({ value: this.value });
  };

  private clearValue = () => {
    if (this.disabled || this.readOnly) {
      return;
    }

    this.value = '';
    this.jarvisInput.emit({ value: this.value });
  };

  render() {
    const describedBy = [
      this.helpText ? this.helpTextId : '',
      this.errorText ? this.errorTextId : '',
      this.showCount && Number.isFinite(this.maxLength) ? this.counterId : ''
    ]
      .filter(Boolean)
      .join(' ');
    const resolvedType = this.type === 'password' && this.passwordVisible ? 'text' : this.type;
    const canShowClear = this.showClearButton && !!this.value && !this.disabled && !this.readOnly;
    const canShowReveal = this.type === 'password' && this.showRevealButton;
    const showActions = canShowClear || canShowReveal;

    return (
      <Host>
        <label part="label">
          {this.label ? <span class="label" id={`${this.inputId}-label`}>{this.label}</span> : null}
          <div class={{ field: true, 'has-actions': showActions }} part="base">
            <input
              id={this.inputId}
              part="control"
              name={this.name}
              type={resolvedType}
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readOnly}
              required={this.required}
              maxLength={this.maxLength}
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-describedby={describedBy || undefined}
              aria-invalid={this.invalid || this.errorText ? 'true' : 'false'}
              onInput={this.onInput}
            />
            {showActions ? (
              <div class="actions" part="actions">
                {canShowClear ? (
                  <button type="button" class="action-button" part="clear-button" aria-label="Clear value" onClick={this.clearValue}>
                    x
                  </button>
                ) : null}
                {canShowReveal ? (
                  <button
                    type="button"
                    class="action-button"
                    part="reveal-button"
                    aria-label={this.passwordVisible ? 'Hide password' : 'Show password'}
                    onClick={() => (this.passwordVisible = !this.passwordVisible)}
                  >
                    {this.passwordVisible ? 'Hide' : 'Show'}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </label>
        {this.showCount && Number.isFinite(this.maxLength) ? (
          <div id={this.counterId} part="count" class="count">
            {this.value.length}/{this.maxLength}
          </div>
        ) : null}
        {this.helpText ? <div id={this.helpTextId} part="help-text" class="help-text">{this.helpText}</div> : null}
        {this.errorText ? <div id={this.errorTextId} part="error-text" class="error-text">{this.errorText}</div> : null}
      </Host>
    );
  }
}
