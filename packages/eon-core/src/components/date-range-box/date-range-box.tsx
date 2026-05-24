import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { createId } from '@eonui/utils';

function maxDateValue(...values: string[]): string {
  return values.filter(Boolean).sort().slice(-1)[0] || '';
}

function minDateValue(...values: string[]): string {
  return values.filter(Boolean).sort()[0] || '';
}

@Component({
  tag: 'eon-date-range-box',
  styleUrl: 'date-range-box.scss',
  shadow: true
})
export class EonDateRangeBox {
  @Prop() label = '';
  @Prop({ mutable: true }) start = '';
  @Prop({ mutable: true }) end = '';
  @Prop() min = '';
  @Prop() max = '';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() showClearButton = false;
  @Prop() showSummary = true;
  @Prop() showPickerButtons = false;
  @Prop() openOnFieldClick = false;
  @Prop() applyValueMode: 'instantly' | 'useButtons' = 'instantly';
  @Prop() startLabel = 'Start date';
  @Prop() endLabel = 'End date';
  @Prop() startPlaceholder = '';
  @Prop() endPlaceholder = '';
  @Prop() clearButtonText = 'Clear';
  @Prop() openButtonText = 'Open';
  @Prop() applyButtonText = 'Apply';
  @Prop() cancelButtonText = 'Cancel';

  @State() draftStart = '';
  @State() draftEnd = '';

  @Event() eonChange: EventEmitter<{ start: string; end: string }>;

  private rangeId = createId('eon-date-range');
  private startInputEl?: HTMLInputElement;
  private endInputEl?: HTMLInputElement;

  componentWillLoad() {
    this.syncDraftStart(this.start);
    this.syncDraftEnd(this.end);
  }

  @Watch('start')
  syncDraftStart(value: string) {
    this.draftStart = value;
  }

  @Watch('end')
  syncDraftEnd(value: string) {
    this.draftEnd = value;
  }

  private emitChange() {
    this.eonChange.emit({ start: this.start, end: this.end });
  }

  private get hasPendingChanges(): boolean {
    return this.applyValueMode === 'useButtons' && (this.draftStart !== this.start || this.draftEnd !== this.end);
  }

  private get dayCount(): number | null {
    if (!this.draftStart || !this.draftEnd) {
      return null;
    }

    const startDate = new Date(this.draftStart);
    const endDate = new Date(this.draftEnd);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return null;
    }

    return Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
  }

  private get rangeInvalid(): boolean {
    return Boolean(this.draftStart && this.draftEnd && this.draftEnd < this.draftStart);
  }

  private get invalidState(): boolean {
    return this.invalid || this.rangeInvalid;
  }

  private get summaryText(): string | null {
    if (this.rangeInvalid) {
      return 'End date must be on or after the start date.';
    }

    if (this.draftStart && !this.draftEnd) {
      return 'Select an end date to complete the range.';
    }

    if (!this.draftStart && this.draftEnd) {
      return 'Select a start date to complete the range.';
    }

    if (this.dayCount) {
      return `${this.dayCount} day selection`;
    }

    return null;
  }

  private get descriptionId(): string | undefined {
    const ids: string[] = [];
    if (this.invalidState && this.errorText) {
      ids.push(`${this.rangeId}-error`);
    } else if (this.helpText) {
      ids.push(`${this.rangeId}-help`);
    }
    if (this.summaryText) {
      ids.push(`${this.rangeId}-summary`);
    }
    return ids.length ? ids.join(' ') : undefined;
  }

  private showPicker(target?: HTMLInputElement) {
    if (this.disabled || this.readOnly) {
      return;
    }

    (target as (HTMLInputElement & { showPicker?: () => void }) | undefined)?.showPicker?.();
    target?.focus();
  }

  private clearRange() {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (this.applyValueMode === 'useButtons') {
      this.draftStart = '';
      this.draftEnd = '';
      return;
    }

    this.start = '';
    this.end = '';
    this.draftStart = '';
    this.draftEnd = '';
    this.emitChange();
  }

  private updateDraftStart(value: string) {
    if (this.applyValueMode === 'useButtons') {
      this.draftStart = value;
      return;
    }

    this.start = value;
    this.draftStart = value;
    this.emitChange();
  }

  private updateDraftEnd(value: string) {
    if (this.applyValueMode === 'useButtons') {
      this.draftEnd = value;
      return;
    }

    this.end = value;
    this.draftEnd = value;
    this.emitChange();
  }

  private applyDraftRange() {
    if (this.disabled || this.readOnly) {
      return;
    }

    this.start = this.draftStart;
    this.end = this.draftEnd;
    this.emitChange();
  }

  private cancelDraftRange() {
    this.draftStart = this.start;
    this.draftEnd = this.end;
  }

  render() {
    return (
      <Host>
        <div class={{ field: true, invalid: this.invalidState, readonly: this.readOnly }} part="base">
          {this.label ? (
            <span class="label" id={`${this.rangeId}-label`}>
              {this.label}
              {this.required ? <span class="required-indicator" aria-hidden="true">*</span> : null}
            </span>
          ) : null}
          <div class="inputs">
            <label class={{ 'input-shell': true, invalid: this.invalidState, readonly: this.readOnly }}>
              <span>{this.startLabel}</span>
              <input
                ref={(element) => (this.startInputEl = element as HTMLInputElement)}
                part="start"
                type="date"
                value={this.draftStart}
                min={this.min || undefined}
                max={minDateValue(this.max, this.draftEnd) || undefined}
                placeholder={this.startPlaceholder || undefined}
                disabled={this.disabled}
                readOnly={this.readOnly}
                aria-labelledby={this.label ? `${this.rangeId}-label` : undefined}
                aria-describedby={this.descriptionId}
                aria-required={this.required ? 'true' : undefined}
                aria-invalid={this.invalidState ? 'true' : 'false'}
                onClick={() => {
                  if (this.openOnFieldClick) {
                    this.showPicker(this.startInputEl);
                  }
                }}
                onInput={(event) => this.updateDraftStart((event.target as HTMLInputElement).value)}
              />
              {this.showPickerButtons ? (
                <button type="button" class="action" part="open-start" disabled={this.disabled || this.readOnly} onClick={() => this.showPicker(this.startInputEl)}>
                  {this.openButtonText}
                </button>
              ) : null}
            </label>
            <label class={{ 'input-shell': true, invalid: this.invalidState, readonly: this.readOnly }}>
              <span>{this.endLabel}</span>
              <input
                ref={(element) => (this.endInputEl = element as HTMLInputElement)}
                part="end"
                type="date"
                value={this.draftEnd}
                min={maxDateValue(this.min, this.draftStart) || undefined}
                max={this.max || undefined}
                placeholder={this.endPlaceholder || undefined}
                disabled={this.disabled}
                readOnly={this.readOnly}
                aria-labelledby={this.label ? `${this.rangeId}-label` : undefined}
                aria-describedby={this.descriptionId}
                aria-required={this.required ? 'true' : undefined}
                aria-invalid={this.invalidState ? 'true' : 'false'}
                onClick={() => {
                  if (this.openOnFieldClick) {
                    this.showPicker(this.endInputEl);
                  }
                }}
                onInput={(event) => this.updateDraftEnd((event.target as HTMLInputElement).value)}
              />
              {this.showPickerButtons ? (
                <button type="button" class="action" part="open-end" disabled={this.disabled || this.readOnly} onClick={() => this.showPicker(this.endInputEl)}>
                  {this.openButtonText}
                </button>
              ) : null}
            </label>
            {this.showClearButton && (this.start || this.end) ? (
              <button
                type="button"
                class="clear"
                part="clear"
                disabled={this.disabled || this.readOnly}
                onClick={() => this.clearRange()}
              >
                {this.clearButtonText}
              </button>
            ) : null}
          </div>
          {this.applyValueMode === 'useButtons' && this.hasPendingChanges ? (
            <div class="commit-actions" part="actions">
              <button type="button" class="action secondary" part="cancel" disabled={this.disabled || this.readOnly} onClick={() => this.cancelDraftRange()}>
                {this.cancelButtonText}
              </button>
              <button type="button" class="action primary" part="apply" disabled={this.disabled || this.readOnly} onClick={() => this.applyDraftRange()}>
                {this.applyButtonText}
              </button>
            </div>
          ) : null}
          {this.invalidState && this.errorText ? (
            <div class="message error" id={`${this.rangeId}-error`} part="error">
              {this.errorText}
            </div>
          ) : this.helpText ? (
            <div class="message help" id={`${this.rangeId}-help`} part="help">
              {this.helpText}
            </div>
          ) : null}
          {this.showSummary && this.summaryText ? (
            <div class="summary" id={`${this.rangeId}-summary`} part="summary">
              {this.summaryText}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
