import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { createId } from '@jarvis/utils';
import { filterLabeledOptions, parseLabeledOptions, type LabeledOption, type JarvisSearchMode } from '../shared/helpers';

@Component({
  tag: 'jarvis-combobox',
  styleUrl: 'combobox.scss',
  shadow: true
})
export class JarvisCombobox {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() placeholder = 'Select an option';
  @Prop() options = '';
  @Prop() noDataText = 'No matching items';
  @Prop({ mutable: true }) value = '';
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop({ mutable: true, reflect: true }) opened = false;
  @Prop() openOnFieldClick = true;
  @Prop() showClearButton = false;
  @Prop() showDropDownButton = true;
  @Prop() acceptCustomValue = false;
  @Prop() searchMode: JarvisSearchMode = 'contains';
  @Prop() minSearchLength = 0;
  @Prop() showDataBeforeSearch = true;
  @Prop() searchExpr = '';

  @State() inputValue = '';
  @State() activeIndex = -1;

  @Event() jarvisInput: EventEmitter<{ value: string }>;
  @Event() jarvisChange: EventEmitter<{ value: string }>;
  @Event() jarvisOpened: EventEmitter<void>;
  @Event() jarvisClosed: EventEmitter<void>;
  @Event() jarvisCustomItemCreate: EventEmitter<{ value: string }>;

  private listboxId = createId('jarvis-combobox-listbox');
  private inputId = createId('jarvis-combobox-input');
  private helpTextId = createId('jarvis-combobox-help');
  private errorTextId = createId('jarvis-combobox-error');
  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private inputEl?: HTMLInputElement;

  componentWillLoad() {
    this.syncInputValue();
  }

  @Watch('value')
  syncInputValue() {
    this.inputValue = this.displayValue;
  }

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      this.commitInput();
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
  }

  private get allOptions(): LabeledOption[] {
    return parseLabeledOptions(this.options);
  }

  private get filteredOptions(): LabeledOption[] {
    return filterLabeledOptions(this.allOptions, {
      expr: this.searchExpr,
      mode: this.searchMode,
      minLength: this.minSearchLength,
      query: this.opened ? this.inputValue : '',
      showDataBeforeSearch: this.showDataBeforeSearch
    });
  }

  private get displayValue(): string {
    return this.allOptions.find((option) => option.value === this.value)?.label || this.value;
  }

  private get describedBy(): string | undefined {
    return [this.helpText ? this.helpTextId : '', this.errorText ? this.errorTextId : ''].filter(Boolean).join(' ') || undefined;
  }

  private get activeOption(): LabeledOption | undefined {
    return this.activeIndex >= 0 ? this.filteredOptions[this.activeIndex] : undefined;
  }

  private get canCreateCustomValue(): boolean {
    const normalized = this.inputValue.trim();
    if (!this.acceptCustomValue || !normalized) {
      return false;
    }

    return !this.allOptions.some(
      (option) => option.value.toLowerCase() === normalized.toLowerCase() || option.label.toLowerCase() === normalized.toLowerCase()
    );
  }

  private setOpened(nextValue: boolean) {
    if (this.opened === nextValue) {
      return;
    }

    this.opened = nextValue;
    if (nextValue) {
      this.jarvisOpened.emit();
      return;
    }

    this.activeIndex = -1;
    this.inputValue = this.displayValue;
    this.jarvisClosed.emit();
  }

  private emitSelection(nextValue: string, detailValue = nextValue) {
    this.value = nextValue;
    this.inputValue = this.displayValue;
    this.setOpened(false);
    this.jarvisChange.emit({ value: detailValue });
  }

  private selectOption(option: LabeledOption) {
    this.emitSelection(option.value, option.value);
  }

  private clearValue() {
    this.value = '';
    this.inputValue = '';
    this.jarvisInput.emit({ value: '' });
    this.jarvisChange.emit({ value: '' });
    this.activeIndex = -1;
  }

  private selectCustomValue() {
    const nextValue = this.inputValue.trim();
    if (!nextValue) {
      return;
    }

    this.jarvisCustomItemCreate.emit({ value: nextValue });
    this.emitSelection(nextValue, nextValue);
  }

  private commitInput() {
    const normalized = this.inputValue.trim();

    if (!normalized) {
      if (this.value) {
        this.clearValue();
      } else {
        this.setOpened(false);
      }
      return;
    }

    const matchedOption = this.allOptions.find(
      (option) => option.value.toLowerCase() === normalized.toLowerCase() || option.label.toLowerCase() === normalized.toLowerCase()
    );

    if (matchedOption) {
      this.selectOption(matchedOption);
      return;
    }

    if (this.canCreateCustomValue) {
      this.selectCustomValue();
      return;
    }

    this.setOpened(false);
  }

  private moveActive(offset: number) {
    if (!this.filteredOptions.length) {
      return;
    }

    const nextIndex = this.activeIndex < 0 ? (offset > 0 ? 0 : this.filteredOptions.length - 1) : this.activeIndex + offset;
    this.activeIndex = Math.max(0, Math.min(this.filteredOptions.length - 1, nextIndex));
  }

  private onKeyDown(event: KeyboardEvent) {
    if (this.disabled || this.readOnly) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.setOpened(true);
      this.moveActive(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.setOpened(true);
      this.moveActive(-1);
    } else if (event.key === 'Home' && this.filteredOptions.length) {
      event.preventDefault();
      this.activeIndex = 0;
    } else if (event.key === 'End' && this.filteredOptions.length) {
      event.preventDefault();
      this.activeIndex = this.filteredOptions.length - 1;
    } else if (event.key === 'Enter') {
      if (!this.opened) {
        this.setOpened(true);
        return;
      }

      if (this.activeOption) {
        event.preventDefault();
        this.selectOption(this.activeOption);
      } else {
        event.preventDefault();
        this.commitInput();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.setOpened(false);
    } else if (event.key === 'Tab') {
      this.commitInput();
    }
  }

  render() {
    const filtered = this.filteredOptions;

    return (
      <Host>
        <label class="field" part="base">
          {this.label ? <span class="label" id={`${this.inputId}-label`}>{this.label}</span> : null}
          <div class="control-wrap">
            <input
              ref={(element) => (this.inputEl = element as HTMLInputElement)}
              id={this.inputId}
              part="control"
              type="text"
              role="combobox"
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-expanded={String(this.opened)}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              aria-describedby={this.describedBy}
              aria-invalid={this.invalid || this.errorText ? 'true' : 'false'}
              aria-controls={this.listboxId}
              aria-activedescendant={this.activeOption ? `${this.listboxId}-${this.activeIndex}` : undefined}
              value={this.inputValue}
              placeholder={this.placeholder}
              disabled={this.disabled}
              readOnly={this.readOnly}
              required={this.required}
              onFocus={() => {
                if (!this.disabled && !this.readOnly) {
                  this.setOpened(true);
                }
              }}
              onBlur={(event: FocusEvent) => {
                const next = event.relatedTarget as Node | null;
                if (next && this.host.contains(next)) {
                  return;
                }
                this.commitInput();
              }}
              onClick={() => {
                if (this.openOnFieldClick && !this.disabled && !this.readOnly) {
                  this.setOpened(true);
                }
              }}
              onInput={(event: Event) => {
                this.inputValue = (event.target as HTMLInputElement).value;
                this.setOpened(true);
                this.activeIndex = -1;
                this.jarvisInput.emit({ value: this.inputValue });
              }}
              onKeyDown={(event: KeyboardEvent) => this.onKeyDown(event)}
            />
            <div class="icons">
              {this.showClearButton && this.inputValue && !this.readOnly ? (
                <button
                  type="button"
                  class="icon clear"
                  part="clear"
                  aria-label="Clear value"
                  disabled={this.disabled}
                  onClick={() => this.clearValue()}
                >
                  x
                </button>
              ) : null}
              {this.showDropDownButton ? (
                <button
                  type="button"
                  class="icon toggle"
                  part="toggle"
                  aria-label="Toggle options"
                  disabled={this.disabled}
                  onClick={() => {
                    if (!this.readOnly) {
                      this.setOpened(!this.opened);
                      this.inputEl?.focus();
                    }
                  }}
                >
                  v
                </button>
              ) : null}
            </div>
          </div>
          <div class={{ listbox: true, open: this.opened }} id={this.listboxId} part="listbox" role="listbox" aria-hidden={this.opened ? 'false' : 'true'} hidden={!this.opened}>
            {filtered.map((option, index) => (
              <button
                type="button"
                id={`${this.listboxId}-${index}`}
                role="option"
                part="option"
                tabindex={this.activeIndex === index ? 0 : -1}
                aria-selected={option.value === this.value ? 'true' : 'false'}
                class={{ active: this.activeIndex === index, selected: option.value === this.value }}
                onMouseEnter={() => (this.activeIndex = index)}
                onClick={() => this.selectOption(option)}
              >
                <span>{option.label}</span>
                {option.value === this.value ? <span class="check">Selected</span> : null}
              </button>
            ))}
            {!filtered.length && !this.canCreateCustomValue ? (
              <div class="empty-state">
                {this.inputValue.trim().length < this.minSearchLength && !this.showDataBeforeSearch
                  ? `Type at least ${this.minSearchLength} characters`
                  : this.noDataText}
              </div>
            ) : null}
            {this.canCreateCustomValue ? (
              <button type="button" class="create-option" part="option" onClick={() => this.selectCustomValue()}>
                Use "{this.inputValue.trim()}"
              </button>
            ) : null}
          </div>
          {this.helpText ? <div id={this.helpTextId} class="help-text">{this.helpText}</div> : null}
          {this.errorText ? <div id={this.errorTextId} class="error-text">{this.errorText}</div> : null}
        </label>
      </Host>
    );
  }
}
