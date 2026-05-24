import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { renderChevronIcon, renderCloseIcon } from '../shared/icons';
import { createOutsidePointerHandler } from '@eonui/a11y';
import { createId } from '@eonui/utils';
import { filterLabeledOptions, groupOptions, parseLabeledOptions, type EonSearchMode } from '../shared/helpers';

@Component({
  tag: 'eon-select-box',
  styleUrl: 'select-box.scss',
  shadow: true
})
export class EonSelectBox {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() items = '';
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder = 'Select...';
  @Prop() noDataText = 'No matching items';
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() grouped = false;
  @Prop() searchEnabled = false;
  @Prop() showClearButton = false;
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop({ mutable: true, reflect: true }) opened = false;
  @Prop() openOnFieldClick = true;
  @Prop() showDropDownButton = true;
  @Prop() searchMode: EonSearchMode = 'contains';
  @Prop() minSearchLength = 0;
  @Prop() showDataBeforeSearch = true;
  @Prop() searchExpr = '';
  @Prop() acceptCustomValue = false;

  @State() query = '';
  @State() activeIndex = -1;

  @Event() eonChange: EventEmitter<{ value: string }>;
  @Event() eonOpened: EventEmitter<void>;
  @Event() eonClosed: EventEmitter<void>;
  @Event() eonCustomItemCreate: EventEmitter<{ value: string }>;

  private inputId = createId('eon-select-box');
  private listboxId = createId('eon-select-box-listbox');
  private helpTextId = createId('eon-select-box-help');
  private errorTextId = createId('eon-select-box-error');
  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private searchInput?: HTMLInputElement;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      this.setOpened(false);
      this.query = '';
      this.activeIndex = -1;
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
  }

  componentDidRender() {
    if (this.opened && this.searchEnabled && this.searchInput && document.activeElement !== this.searchInput) {
      this.searchInput.focus();
      this.searchInput.select();
    }
  }

  private get options() {
    return filterLabeledOptions(parseLabeledOptions(this.items), {
      expr: this.searchExpr,
      mode: this.searchMode,
      minLength: this.minSearchLength,
      query: this.query,
      showDataBeforeSearch: this.showDataBeforeSearch
    });
  }

  private get displayValue() {
    const option = parseLabeledOptions(this.items).find((item) => item.value === this.value);
    return option?.label || this.value;
  }

  private get canCreateCustomValue() {
    const normalized = this.query.trim();
    if (!this.acceptCustomValue || !normalized) {
      return false;
    }

    return !parseLabeledOptions(this.items).some(
      (item) => item.value.toLowerCase() === normalized.toLowerCase() || item.label.toLowerCase() === normalized.toLowerCase()
    );
  }

  private setOpened(nextValue: boolean) {
    if (this.opened === nextValue) {
      return;
    }

    this.opened = nextValue;
    if (!nextValue) {
      this.activeIndex = -1;
    }

    if (nextValue) {
      this.eonOpened.emit();
    } else {
      this.eonClosed.emit();
    }
  }

  private updateValue(nextValue: string) {
    this.value = nextValue;
    this.setOpened(false);
    this.query = '';
    this.activeIndex = -1;
    this.eonChange.emit({ value: nextValue });
  }

  private selectCustomValue() {
    const nextValue = this.query.trim();
    if (!nextValue) {
      return;
    }

    this.eonCustomItemCreate.emit({ value: nextValue });
    this.updateValue(nextValue);
  }

  private onKeyDown(event: KeyboardEvent) {
    const options = this.options;
    if (this.disabled || this.readOnly) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.setOpened(true);
      this.activeIndex = Math.min(options.length - 1, this.activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.setOpened(true);
      this.activeIndex = Math.max(0, this.activeIndex - 1);
    } else if (event.key === 'Home' && options.length) {
      event.preventDefault();
      this.activeIndex = 0;
    } else if (event.key === 'End' && options.length) {
      event.preventDefault();
      this.activeIndex = options.length - 1;
    } else if (event.key === 'Enter') {
      if (!this.opened) {
        this.setOpened(true);
        return;
      }

      const active = options[this.activeIndex];
      if (active) {
        event.preventDefault();
        this.updateValue(active.value);
      } else if (this.canCreateCustomValue) {
        event.preventDefault();
        this.selectCustomValue();
      }
    } else if (event.key === 'Escape') {
      this.setOpened(false);
    } else if (event.key === 'Tab') {
      this.setOpened(false);
    }
  }

  render() {
    const options = this.options;
    const active = this.activeIndex >= 0 ? options[this.activeIndex] : undefined;
    const groupedOptions = this.grouped ? groupOptions(options) : [{ label: '', items: options }];
    const describedBy = [this.helpText ? this.helpTextId : '', this.errorText ? this.errorTextId : ''].filter(Boolean).join(' ') || undefined;

    return (
      <Host>
        <label class="field" part="base">
          {this.label ? <span class="label" id={`${this.inputId}-label`}>{this.label}</span> : null}
          <div class={{ trigger: true, disabled: this.disabled, readonly: this.readOnly, invalid: this.invalid }}>
            <button
              id={this.inputId}
              type="button"
              class="control"
              part="control"
              disabled={this.disabled}
              aria-expanded={String(this.opened)}
              aria-haspopup="listbox"
              aria-controls={this.listboxId}
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-describedby={describedBy}
              aria-invalid={this.invalid ? 'true' : 'false'}
              aria-activedescendant={active ? `${this.listboxId}-${active.value}` : undefined}
              onClick={() => {
                if (!this.readOnly && this.openOnFieldClick) {
                  this.setOpened(!this.opened);
                }
              }}
              onKeyDown={(event: KeyboardEvent) => this.onKeyDown(event)}
            >
              <span class={{ value: true, placeholder: !this.displayValue }}>{this.displayValue || this.placeholder}</span>
              <span class="icons">
                {this.showClearButton && this.value && !this.readOnly ? (
                  <span
                    class="icon clear"
                    role="button"
                    tabindex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      this.updateValue('');
                    }}
                    onKeyDown={(event: KeyboardEvent) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        event.stopPropagation();
                        this.updateValue('');
                      }
                    }}
                  >
                    {renderCloseIcon()}
                  </span>
                ) : null}
                {this.showDropDownButton ? (
                  <span class="icon chevron" aria-hidden="true">
                    {renderChevronIcon()}
                  </span>
                ) : null}
              </span>
            </button>
          </div>
          {this.opened ? (
            <div class="panel" id={this.listboxId} part="panel" role="listbox">
              {this.searchEnabled ? (
                <input
                  class="search"
                  type="search"
                  part="search"
                  placeholder="Search"
                  value={this.query}
                  ref={(element) => (this.searchInput = element as HTMLInputElement)}
                  onInput={(event) => {
                    this.query = (event.target as HTMLInputElement).value;
                    this.activeIndex = -1;
                  }}
                  onKeyDown={(event: KeyboardEvent) => this.onKeyDown(event)}
                />
              ) : null}
              <div class="options">
                {groupedOptions.map((group) => (
                  <div class="group">
                    {group.label ? <div class="group-label">{group.label}</div> : null}
                    {group.items.map((option) => (
                      <button
                        id={`${this.listboxId}-${option.value}`}
                        type="button"
                        role="option"
                        class={{
                          option: true,
                          selected: option.value === this.value,
                          active: option.value === active?.value
                        }}
                        aria-selected={option.value === this.value ? 'true' : 'false'}
                        onMouseEnter={() => {
                          this.activeIndex = options.findIndex((item) => item.value === option.value);
                        }}
                        onClick={() => this.updateValue(option.value)}
                      >
                        <span>{option.label}</span>
                        {option.value === this.value ? <span class="check">Selected</span> : null}
                      </button>
                    ))}
                  </div>
                ))}
                {!options.length && !this.canCreateCustomValue ? (
                  <div class="empty">
                    {this.query.trim().length < this.minSearchLength && !this.showDataBeforeSearch
                      ? `Type at least ${this.minSearchLength} characters`
                      : this.noDataText}
                  </div>
                ) : null}
                {this.canCreateCustomValue ? (
                  <button type="button" class="option create-option" onClick={() => this.selectCustomValue()}>
                    Use "{this.query.trim()}"
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
          {this.helpText ? (
            <span class="support-text help-text" id={this.helpTextId} part="help-text">
              {this.helpText}
            </span>
          ) : null}
          {this.errorText ? (
            <span class="support-text error-text" id={this.errorTextId} part="error-text">
              {this.errorText}
            </span>
          ) : null}
        </label>
      </Host>
    );
  }
}
