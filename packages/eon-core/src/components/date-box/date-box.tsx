import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { createId } from '@eonui/utils';

@Component({
  tag: 'eon-date-box',
  styleUrl: 'date-box.scss',
  shadow: true
})
export class EonDateBox {
  @Prop() label = '';
  @Prop() type: 'date' | 'time' | 'datetime-local' = 'date';
  @Prop({ mutable: true }) value = '';
  @Prop() min = '';
  @Prop() max = '';
  @Prop() placeholder = '';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() showClearButton = false;
  @Prop() showDropDownButton = true;
  @Prop() showTodayButton = false;
  @Prop() openOnFieldClick = false;
  @Prop() applyValueMode: 'instantly' | 'useButtons' = 'instantly';
  @Prop() clearButtonText = 'Clear';
  @Prop() openButtonText = 'Open';
  @Prop() todayButtonText = 'Today';
  @Prop() nowButtonText = 'Now';
  @Prop() applyButtonText = 'Apply';
  @Prop() cancelButtonText = 'Cancel';

  @State() draftValue = '';

  @Event() eonChange: EventEmitter<{ value: string }>;

  private inputId = createId('eon-date-box');
  private inputEl?: HTMLInputElement;

  componentWillLoad() {
    this.syncDraftValue(this.value);
  }

  @Watch('value')
  syncDraftValue(value: string) {
    this.draftValue = value;
  }

  private get descriptionId(): string | undefined {
    return this.invalid && this.errorText ? `${this.inputId}-error` : this.helpText ? `${this.inputId}-help` : undefined;
  }

  private get hasPendingChanges(): boolean {
    return this.applyValueMode === 'useButtons' && this.draftValue !== this.value;
  }

  private emitChange(nextValue: string) {
    this.value = nextValue;
    this.draftValue = nextValue;
    this.eonChange.emit({ value: nextValue });
  }

  private clearValue() {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (this.applyValueMode === 'useButtons') {
      this.draftValue = '';
    } else {
      this.emitChange('');
    }
    this.inputEl?.focus();
  }

  private get currentActionText(): string {
    return this.type === 'time' ? this.nowButtonText : this.todayButtonText;
  }

  private createCurrentValue(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    if (this.type === 'time') {
      return `${hours}:${minutes}`;
    }

    if (this.type === 'datetime-local') {
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    return `${year}-${month}-${day}`;
  }

  private showPicker() {
    if (this.disabled || this.readOnly) {
      return;
    }

    (this.inputEl as (HTMLInputElement & { showPicker?: () => void }) | undefined)?.showPicker?.();
    this.inputEl?.focus();
  }

  private applyCurrentValue() {
    const nextValue = this.createCurrentValue();
    if (this.applyValueMode === 'useButtons') {
      this.draftValue = nextValue;
    } else {
      this.emitChange(nextValue);
    }
    this.inputEl?.focus();
  }

  private applyDraftValue() {
    if (this.disabled || this.readOnly) {
      return;
    }

    this.emitChange(this.draftValue);
    this.inputEl?.focus();
  }

  private cancelDraftValue() {
    this.draftValue = this.value;
    this.inputEl?.focus();
  }

  render() {
    const actions = [
      this.showClearButton && this.draftValue
        ? (
            <button type="button" class="action" part="clear" aria-label="Clear value" disabled={this.disabled || this.readOnly} onClick={() => this.clearValue()}>
              {this.clearButtonText}
            </button>
          )
        : null,
      this.showDropDownButton
        ? (
            <button type="button" class="action" part="open" aria-label="Open picker" disabled={this.disabled || this.readOnly} onClick={() => this.showPicker()}>
              {this.openButtonText}
            </button>
          )
        : null,
      this.showTodayButton
        ? (
            <button type="button" class="action primary" part="today" aria-label={this.currentActionText} disabled={this.disabled || this.readOnly} onClick={() => this.applyCurrentValue()}>
              {this.currentActionText}
            </button>
          )
        : null
    ].filter(Boolean);

    return (
      <Host>
        <label class="field" part="base">
          {this.label ? (
            <span class="label" id={`${this.inputId}-label`}>
              {this.label}
              {this.required ? <span class="required-indicator" aria-hidden="true">*</span> : null}
            </span>
          ) : null}
          <div class={{ 'control-wrap': true, invalid: this.invalid, readonly: this.readOnly }}>
            <input
              ref={(element) => (this.inputEl = element as HTMLInputElement)}
              id={this.inputId}
              part="control"
              type={this.type}
              value={this.draftValue}
              min={this.min || undefined}
              max={this.max || undefined}
              placeholder={this.placeholder || undefined}
              disabled={this.disabled}
              readOnly={this.readOnly}
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-describedby={this.descriptionId}
              aria-required={this.required ? 'true' : undefined}
              aria-invalid={this.invalid ? 'true' : 'false'}
              onClick={() => {
                if (this.openOnFieldClick) {
                  this.showPicker();
                }
              }}
              onInput={(event) => {
                const nextValue = (event.target as HTMLInputElement).value;
                if (this.applyValueMode === 'useButtons') {
                  this.draftValue = nextValue;
                } else {
                  this.emitChange(nextValue);
                }
              }}
            />
            {actions.length ? <div class="actions">{actions}</div> : null}
          </div>
          {this.applyValueMode === 'useButtons' && this.hasPendingChanges ? (
            <div class="commit-actions" part="actions">
              <button type="button" class="action secondary" part="cancel" disabled={this.disabled || this.readOnly} onClick={() => this.cancelDraftValue()}>
                {this.cancelButtonText}
              </button>
              <button type="button" class="action primary" part="apply" disabled={this.disabled || this.readOnly} onClick={() => this.applyDraftValue()}>
                {this.applyButtonText}
              </button>
            </div>
          ) : null}
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
