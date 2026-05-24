import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { createId } from '@eonui/utils';
import { parseOptions } from '../shared/helpers';

@Component({
  tag: 'eon-select',
  styleUrl: 'select.scss',
  shadow: true
})
export class EonSelect {
  @Prop() label = '';
  @Prop({ mutable: true }) value = '';
  @Prop() options = '';
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() invalid = false;

  @Event() eonChange: EventEmitter<{ value: string }>;
  private selectId = createId('eon-select');
  private helpTextId = createId('eon-select-help');
  private errorTextId = createId('eon-select-error');

  private onChange = (event: Event) => {
    this.value = (event.target as HTMLSelectElement).value;
    this.eonChange.emit({ value: this.value });
  };

  render() {
    const items = parseOptions(this.options);
    const describedBy = [this.helpText ? this.helpTextId : '', this.errorText ? this.errorTextId : ''].filter(Boolean).join(' ');
    return (
      <Host>
        <label class="field" part="base">
          {this.label ? <span class="label" id={`${this.selectId}-label`}>{this.label}</span> : null}
          <select
            id={this.selectId}
            part="control"
            disabled={this.disabled}
            required={this.required}
            aria-labelledby={this.label ? `${this.selectId}-label` : undefined}
            aria-describedby={describedBy || undefined}
            aria-invalid={this.invalid || this.errorText ? 'true' : 'false'}
            onChange={this.onChange}
          >
            {items.map((item) => (
              <option value={item} selected={item === this.value}>
                {item}
              </option>
            ))}
          </select>
          {this.helpText ? <div id={this.helpTextId} class="help-text">{this.helpText}</div> : null}
          {this.errorText ? <div id={this.errorTextId} class="error-text">{this.errorText}</div> : null}
        </label>
      </Host>
    );
  }
}
