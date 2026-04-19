import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { createId } from '@jarvis/utils';
import { matchesSearchTerm, parseOptions, type JarvisSearchMode } from '../shared/helpers';

@Component({
  tag: 'jarvis-autocomplete',
  styleUrl: 'autocomplete.scss',
  shadow: true
})
export class JarvisAutocomplete {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() placeholder = 'Start typing';
  @Prop() noDataText = 'No matching suggestions';
  @Prop() suggestions = '';
  @Prop({ mutable: true }) value = '';
  @Prop() clearButton = false;
  @Prop() showClearButton = false;
  @Prop() disabled = false;
  @Prop({ mutable: true, reflect: true }) opened = false;
  @Prop() openOnFieldClick = true;
  @Prop() searchMode: JarvisSearchMode = 'contains';
  @Prop() minSearchLength = 0;
  @Prop() showDataBeforeSearch = true;
  @Prop() acceptCustomValue = false;

  @State() activeIndex = -1;

  @Event() jarvisInput: EventEmitter<{ value: string }>;
  @Event() jarvisSelect: EventEmitter<{ value: string }>;
  @Event() jarvisOpened: EventEmitter<void>;
  @Event() jarvisClosed: EventEmitter<void>;
  @Event() jarvisCustomItemCreate: EventEmitter<{ value: string }>;

  private inputId = createId('jarvis-autocomplete');
  private listboxId = createId('jarvis-autocomplete-listbox');
  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      this.setOpened(false);
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
  }

  private get wantsClearButton() {
    return this.clearButton || this.showClearButton;
  }

  private get filteredSuggestions() {
    const suggestions = parseOptions(this.suggestions);
    const query = this.value.trim().toLowerCase();

    if (!query && !this.showDataBeforeSearch) {
      return [];
    }

    if (query && query.length < this.minSearchLength) {
      return this.showDataBeforeSearch ? suggestions : [];
    }

    return suggestions.filter((item) => matchesSearchTerm(item, query, this.searchMode));
  }

  private get canCreateCustomValue() {
    const normalized = this.value.trim();
    if (!this.acceptCustomValue || !normalized) {
      return false;
    }

    return !parseOptions(this.suggestions).some((item) => item.toLowerCase() === normalized.toLowerCase());
  }

  private setOpened(nextValue: boolean) {
    if (this.opened === nextValue) {
      return;
    }

    this.opened = nextValue;
    this.activeIndex = nextValue ? this.activeIndex : -1;

    if (nextValue) {
      this.jarvisOpened.emit();
    } else {
      this.jarvisClosed.emit();
    }
  }

  private selectValue(nextValue: string) {
    this.value = nextValue;
    this.setOpened(false);
    this.jarvisInput.emit({ value: nextValue });
    this.jarvisSelect.emit({ value: nextValue });
  }

  private selectCustomValue() {
    const nextValue = this.value.trim();
    if (!nextValue) {
      return;
    }

    this.jarvisCustomItemCreate.emit({ value: nextValue });
    this.selectValue(nextValue);
  }

  render() {
    const filtered = this.filteredSuggestions;
    const activeItem = this.activeIndex >= 0 ? filtered[this.activeIndex] : undefined;
    return (
      <Host>
        <label class="field" part="base">
          {this.label ? <span class="label" id={`${this.inputId}-label`}>{this.label}</span> : null}
          <div class="control-wrap">
            <input
              id={this.inputId}
              part="control"
              type="text"
              role="combobox"
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              aria-autocomplete="list"
              aria-expanded={String(this.opened)}
              aria-controls={this.listboxId}
              aria-haspopup="listbox"
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-activedescendant={activeItem ? `${this.listboxId}-${this.activeIndex}` : undefined}
              onFocus={() => {
                if (this.openOnFieldClick && !this.disabled) {
                  this.setOpened(true);
                }
              }}
              onClick={() => {
                if (this.openOnFieldClick && !this.disabled) {
                  this.setOpened(true);
                }
              }}
              onInput={(event) => {
                this.value = (event.target as HTMLInputElement).value;
                this.setOpened(true);
                this.activeIndex = -1;
                this.jarvisInput.emit({ value: this.value });
              }}
              onKeyDown={(event: KeyboardEvent) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  this.setOpened(true);
                  this.activeIndex = Math.min(filtered.length - 1, this.activeIndex + 1);
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  this.setOpened(true);
                  this.activeIndex = Math.max(0, this.activeIndex - 1);
                } else if (event.key === 'Home' && filtered.length) {
                  this.activeIndex = 0;
                } else if (event.key === 'End' && filtered.length) {
                  this.activeIndex = filtered.length - 1;
                } else if (event.key === 'Enter' && activeItem) {
                  event.preventDefault();
                  this.selectValue(activeItem);
                } else if (event.key === 'Enter' && this.canCreateCustomValue) {
                  event.preventDefault();
                  this.selectCustomValue();
                } else if (event.key === 'Escape') {
                  this.setOpened(false);
                } else if (event.key === 'Tab') {
                  this.setOpened(false);
                }
              }}
            />
            {this.wantsClearButton && this.value ? (
              <button type="button" class="clear" part="clear" onClick={() => this.selectValue('')} aria-label="Clear value">
                x
              </button>
            ) : null}
          </div>
          {this.opened && (filtered.length || this.canCreateCustomValue) ? (
            <div class="panel" id={this.listboxId} part="panel" role="listbox">
              {filtered.map((item, index) => (
                <button
                  type="button"
                  id={`${this.listboxId}-${index}`}
                  role="option"
                  class={{ active: this.activeIndex === index }}
                  part="option"
                  tabindex={this.activeIndex === index ? 0 : -1}
                  onMouseEnter={() => (this.activeIndex = index)}
                  onClick={() => this.selectValue(item)}
                >
                  {item}
                </button>
              ))}
              {this.canCreateCustomValue ? (
                <button type="button" class="create" onClick={() => this.selectCustomValue()}>
                  Use "{this.value.trim()}"
                </button>
              ) : null}
            </div>
          ) : null}
          {this.opened && !filtered.length && !this.canCreateCustomValue ? (
            <div class="panel empty-panel" part="panel">
                <div class="empty-state">
                  {this.value.trim().length < this.minSearchLength && !this.showDataBeforeSearch
                    ? `Type at least ${this.minSearchLength} characters`
                    : this.noDataText}
                </div>
              </div>
          ) : null}
        </label>
      </Host>
    );
  }
}
