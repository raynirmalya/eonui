import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { createId } from '@jarvis/utils';

@Component({
  tag: 'jarvis-textarea',
  styleUrl: 'textarea.scss',
  shadow: true
})
export class JarvisTextarea {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder = '';
  @Prop() rows = 4;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() autoResize = false;
  @Prop() maxLength?: number;
  @Prop() showCount = false;

  @Event() jarvisInput: EventEmitter<{ value: string }>;
  private textareaId = createId('jarvis-textarea');
  private helpTextId = createId('jarvis-textarea-help');
  private errorTextId = createId('jarvis-textarea-error');
  private counterId = createId('jarvis-textarea-count');
  private textarea?: HTMLTextAreaElement;

  componentDidLoad() {
    this.syncHeight();
  }

  componentDidRender() {
    this.syncHeight();
  }

  private onInput = (event: Event) => {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.jarvisInput.emit({ value: this.value });
    this.syncHeight();
  };

  private syncHeight() {
    if (!this.autoResize || !this.textarea) {
      return;
    }

    this.textarea.style.height = 'auto';
    this.textarea.style.height = `${this.textarea.scrollHeight}px`;
  }

  render() {
    const describedBy = [
      this.helpText ? this.helpTextId : '',
      this.errorText ? this.errorTextId : '',
      this.showCount && Number.isFinite(this.maxLength) ? this.counterId : ''
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <Host>
        <label part="label">
          {this.label ? <span class="label" id={`${this.textareaId}-label`}>{this.label}</span> : null}
          <div class="field" part="base">
            <textarea
              id={this.textareaId}
              value={this.value}
              rows={this.rows}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readOnly}
              required={this.required}
              maxLength={this.maxLength}
              aria-labelledby={this.label ? `${this.textareaId}-label` : undefined}
              aria-describedby={describedBy || undefined}
              aria-invalid={this.invalid || this.errorText ? 'true' : 'false'}
              onInput={this.onInput}
              part="control"
              ref={(element) => (this.textarea = element as HTMLTextAreaElement)}
            />
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
