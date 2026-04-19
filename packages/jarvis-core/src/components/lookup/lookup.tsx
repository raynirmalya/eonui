import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { createId } from '@jarvis/utils';
import { filterLabeledOptions, groupOptions, parseLabeledOptions, type LabeledOption, type JarvisSearchMode } from '../shared/helpers';

@Component({
  tag: 'jarvis-lookup',
  styleUrl: 'lookup.scss',
  shadow: true
})
export class JarvisLookup {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() heading = 'Select item';
  @Prop() noDataText = 'No matching results';
  @Prop() items = '';
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder = 'Choose...';
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() grouped = false;
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop({ mutable: true, reflect: true }) opened = false;
  @Prop() openOnFieldClick = true;
  @Prop() searchEnabled = true;
  @Prop() searchPlaceholder = 'Search';
  @Prop() showClearButton = false;
  @Prop() showCancelButton = true;
  @Prop() showDropDownButton = true;
  @Prop() searchMode: JarvisSearchMode = 'contains';
  @Prop() minSearchLength = 0;
  @Prop() showDataBeforeSearch = true;
  @Prop() searchExpr = '';

  @State() query = '';
  @State() activeIndex = -1;

  @Event() jarvisChange: EventEmitter<{ value: string }>;
  @Event() jarvisOpened: EventEmitter<void>;
  @Event() jarvisClosed: EventEmitter<void>;

  private inputId = createId('jarvis-lookup');
  private listboxId = createId('jarvis-lookup-listbox');
  private helpTextId = createId('jarvis-lookup-help');
  private errorTextId = createId('jarvis-lookup-error');
  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private searchInput?: HTMLInputElement;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      this.setOpened(false);
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

  private get allOptions(): LabeledOption[] {
    return parseLabeledOptions(this.items);
  }

  private get options(): LabeledOption[] {
    return filterLabeledOptions(this.allOptions, {
      expr: this.searchExpr,
      mode: this.searchMode,
      minLength: this.minSearchLength,
      query: this.query,
      showDataBeforeSearch: this.showDataBeforeSearch
    });
  }

  private get groupedOptions() {
    return this.grouped ? groupOptions(this.options) : [{ label: '', items: this.options }];
  }

  private get displayValue() {
    return this.allOptions.find((item) => item.value === this.value)?.label || this.value;
  }

  private updateValue(nextValue: string) {
    this.value = nextValue;
    this.setOpened(false);
    this.jarvisChange.emit({ value: nextValue });
  }

  private clearValue() {
    this.updateValue('');
  }

  private setOpened(nextValue: boolean) {
    if (this.opened === nextValue) {
      return;
    }

    this.opened = nextValue;
    if (!nextValue) {
      this.query = '';
      this.activeIndex = -1;
    }

    if (nextValue) {
      this.jarvisOpened.emit();
    } else {
      this.jarvisClosed.emit();
    }
  }

  private moveActive(offset: number) {
    if (!this.options.length) {
      return;
    }

    const nextIndex = this.activeIndex < 0 ? (offset > 0 ? 0 : this.options.length - 1) : this.activeIndex + offset;
    this.activeIndex = Math.max(0, Math.min(this.options.length - 1, nextIndex));
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
    } else if (event.key === 'Enter') {
      if (!this.opened) {
        this.setOpened(true);
        return;
      }

      const activeOption = this.options[this.activeIndex];
      if (activeOption) {
        event.preventDefault();
        this.updateValue(activeOption.value);
      }
    } else if (event.key === 'Home' && this.options.length) {
      event.preventDefault();
      this.activeIndex = 0;
    } else if (event.key === 'End' && this.options.length) {
      event.preventDefault();
      this.activeIndex = this.options.length - 1;
    } else if (event.key === 'Escape') {
      this.setOpened(false);
    } else if (event.key === 'Tab') {
      this.setOpened(false);
    }
  }

  render() {
    const activeOption = this.activeIndex >= 0 ? this.options[this.activeIndex] : undefined;
    const describedBy = [this.helpText ? this.helpTextId : '', this.errorText ? this.errorTextId : ''].filter(Boolean).join(' ');
    const isInvalid = this.invalid || !!this.errorText;

    return (
      <Host>
        <div class="field" part="base">
          {this.label ? <span class="label" id={`${this.inputId}-label`}>{this.label}</span> : null}
          <button
            id={this.inputId}
            type="button"
            class={{
              trigger: true,
              open: this.opened,
              invalid: isInvalid,
              readonly: this.readOnly,
              disabled: this.disabled
            }}
            part="control"
            disabled={this.disabled}
            aria-expanded={String(this.opened)}
            aria-haspopup="dialog"
            aria-controls={this.listboxId}
            aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
            aria-describedby={describedBy || undefined}
            aria-invalid={isInvalid ? 'true' : 'false'}
            aria-readonly={this.readOnly ? 'true' : undefined}
            aria-required={this.required ? 'true' : undefined}
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
                    this.clearValue();
                  }}
                  onKeyDown={(event: KeyboardEvent) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      event.stopPropagation();
                      this.clearValue();
                    }
                  }}
                >
                  x
                </span>
              ) : null}
              {this.showDropDownButton ? (
                <span class="icon chevron" aria-hidden="true">
                  v
                </span>
              ) : null}
            </span>
          </button>
          {this.helpText ? <div id={this.helpTextId} part="help-text" class="help-text">{this.helpText}</div> : null}
          {this.errorText ? <div id={this.errorTextId} part="error-text" class="error-text">{this.errorText}</div> : null}
        </div>
        {this.opened ? (
          <div class="sheet" id={this.listboxId} part="panel" role="dialog" aria-modal="false" aria-label={this.heading}>
            <header class="sheet-header">
              <div>
                <strong>{this.heading}</strong>
                <p>Search and select one item.</p>
              </div>
              <button type="button" class="close" onClick={() => this.setOpened(false)} aria-label="Close lookup">
                x
              </button>
            </header>
            {this.searchEnabled ? (
              <div class="search-wrap">
                <input
                  type="search"
                  placeholder={this.searchPlaceholder}
                  value={this.query}
                  ref={(element) => (this.searchInput = element as HTMLInputElement)}
                  onInput={(event) => {
                    this.query = (event.target as HTMLInputElement).value;
                    this.activeIndex = -1;
                  }}
                  onKeyDown={(event: KeyboardEvent) => this.onKeyDown(event)}
                />
              </div>
            ) : null}
            <div class="results">
              {this.groupedOptions.map((group) => (
                <section class="group">
                  {group.label ? <div class="group-label">{group.label}</div> : null}
                  {group.items.map((option) => (
                    <button
                      type="button"
                      class={{
                        option: true,
                        selected: option.value === this.value,
                        active: option.value === activeOption?.value
                      }}
                      onMouseEnter={() => {
                        this.activeIndex = this.options.findIndex((item) => item.value === option.value);
                      }}
                      onClick={() => this.updateValue(option.value)}
                    >
                      <span>{option.label}</span>
                      {option.value === this.value ? <span class="check">Selected</span> : null}
                    </button>
                  ))}
                </section>
              ))}
              {!this.options.length ? (
                <div class="empty">
                  {this.query.trim().length < this.minSearchLength && !this.showDataBeforeSearch
                    ? `Type at least ${this.minSearchLength} characters`
                    : this.noDataText}
                </div>
              ) : null}
            </div>
            {this.showCancelButton ? (
              <footer class="sheet-footer">
                <button type="button" class="cancel" onClick={() => this.setOpened(false)}>
                  Cancel
                </button>
              </footer>
            ) : null}
          </div>
        ) : null}
      </Host>
    );
  }
}
