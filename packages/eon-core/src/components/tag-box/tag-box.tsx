import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { renderChevronIcon, renderCloseIcon } from '../shared/icons';
import { createOutsidePointerHandler } from '@eonui/a11y';
import { createId } from '@eonui/utils';
import { filterLabeledOptions, groupOptions, parseLabeledOptions, parseOptions, type EonSearchMode, type LabeledOption } from '../shared/helpers';

type EonApplyValueMode = 'instantly' | 'useButtons';
type EonSelectAllMode = 'page' | 'allPages';

@Component({
  tag: 'eon-tag-box',
  styleUrl: 'tag-box.scss',
  shadow: true
})
export class EonTagBox {
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
  @Prop() showDropDownButton = true;
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop({ mutable: true, reflect: true }) opened = false;
  @Prop() openOnFieldClick = true;
  @Prop() showSelectionControls = true;
  @Prop() showMultiTagOnly = false;
  @Prop() hideSelectedItems = false;
  @Prop() maxDisplayedTags = 999;
  @Prop() acceptCustomValue = false;
  @Prop() applyValueMode: EonApplyValueMode = 'instantly';
  @Prop() selectAllMode: EonSelectAllMode = 'page';
  @Prop() selectAllText = 'Select all';
  @Prop() searchMode: EonSearchMode = 'contains';
  @Prop() minSearchLength = 0;
  @Prop() showDataBeforeSearch = true;
  @Prop() searchExpr = '';
  @Prop() searchPlaceholder = 'Search';

  @State() query = '';
  @State() activeIndex = -1;
  @State() draftValues: string[] = [];

  @Event() eonChange: EventEmitter<{ values: string[] }>;
  @Event() eonOpened: EventEmitter<void>;
  @Event() eonClosed: EventEmitter<void>;
  @Event() eonCustomItemCreate: EventEmitter<{ value: string }>;

  private inputId = createId('eon-tag-box');
  private listboxId = createId('eon-tag-box-listbox');
  private helpTextId = createId('eon-tag-box-help');
  private errorTextId = createId('eon-tag-box-error');
  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private searchInput?: HTMLInputElement;

  connectedCallback() {
    this.draftValues = this.selectedValues;
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

  private get selectedValues() {
    return parseOptions(this.value);
  }

  private get workingValues() {
    return this.applyValueMode === 'useButtons' ? this.draftValues : this.selectedValues;
  }

  private get filteredOptions() {
    return filterLabeledOptions(this.allOptions, {
      expr: this.searchExpr,
      mode: this.searchMode,
      minLength: this.minSearchLength,
      query: this.query,
      showDataBeforeSearch: this.showDataBeforeSearch
    }).filter((option) => !this.hideSelectedItems || !this.workingValues.includes(option.value));
  }

  private get groupedOptions() {
    return this.grouped ? groupOptions(this.filteredOptions) : [{ label: '', items: this.filteredOptions }];
  }

  private get selectedOptions() {
    const selectedSet = new Set(this.selectedValues);
    return this.allOptions.filter((option) => selectedSet.has(option.value));
  }

  private get canCreateCustomValue() {
    const normalized = this.query.trim();
    if (!this.acceptCustomValue || !normalized) {
      return false;
    }

    return !this.allOptions.some(
      (option) => option.value.toLowerCase() === normalized.toLowerCase() || option.label.toLowerCase() === normalized.toLowerCase()
    );
  }

  private emitValues(values: string[]) {
    const uniqueValues = [...new Set(values)];
    this.value = uniqueValues.join(',');
    this.eonChange.emit({ values: uniqueValues });
  }

  private setOpened(nextValue: boolean) {
    if (this.opened === nextValue) {
      return;
    }

    this.opened = nextValue;
    if (nextValue) {
      this.draftValues = [...this.selectedValues];
      this.eonOpened.emit();
      return;
    }

    this.query = '';
    this.activeIndex = -1;
    this.draftValues = [...this.selectedValues];
    this.eonClosed.emit();
  }

  private clearAll() {
    if (this.applyValueMode === 'useButtons') {
      this.draftValues = [];
      return;
    }

    this.emitValues([]);
  }

  private updateValues(nextValues: string[]) {
    if (this.applyValueMode === 'useButtons') {
      this.draftValues = [...new Set(nextValues)];
      return;
    }

    this.emitValues(nextValues);
  }

  private applyDraftValues() {
    this.emitValues(this.draftValues);
    this.setOpened(false);
  }

  private removeValue(nextValue: string) {
    this.updateValues(this.workingValues.filter((item) => item !== nextValue));
  }

  private toggleValue(nextValue: string) {
    const nextValues = this.workingValues.includes(nextValue)
      ? this.workingValues.filter((item) => item !== nextValue)
      : [...this.workingValues, nextValue];
    this.updateValues(nextValues);
  }

  private toggleSelectAll() {
    const visibleValues =
      this.selectAllMode === 'allPages'
        ? this.allOptions.map((option) => option.value)
        : this.filteredOptions.map((option) => option.value);
    const workingSet = new Set(this.workingValues);
    const hasAllVisible = visibleValues.length > 0 && visibleValues.every((value) => workingSet.has(value));
    const nextValues = hasAllVisible ? this.workingValues.filter((value) => !visibleValues.includes(value)) : [...this.workingValues, ...visibleValues];
    this.updateValues(nextValues);
  }

  private selectCustomValue() {
    const nextValue = this.query.trim();
    if (!nextValue) {
      return;
    }

    this.eonCustomItemCreate.emit({ value: nextValue });
    this.updateValues([...this.workingValues, nextValue]);
    this.query = '';
    this.activeIndex = -1;
    if (this.applyValueMode === 'instantly') {
      this.setOpened(false);
    }
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
    } else if (event.key === 'Enter') {
      if (!this.opened) {
        this.setOpened(true);
        return;
      }

      const activeOption = this.filteredOptions[this.activeIndex];
      if (activeOption) {
        event.preventDefault();
        this.toggleValue(activeOption.value);
      } else if (this.canCreateCustomValue) {
        event.preventDefault();
        this.selectCustomValue();
      }
    } else if (event.key === 'Home' && this.filteredOptions.length) {
      event.preventDefault();
      this.activeIndex = 0;
    } else if (event.key === 'End' && this.filteredOptions.length) {
      event.preventDefault();
      this.activeIndex = this.filteredOptions.length - 1;
    } else if (event.key === 'Escape') {
      this.setOpened(false);
    } else if (event.key === 'Tab') {
      this.setOpened(false);
    }
  }

  render() {
    const visibleTags = this.selectedOptions.slice(0, this.maxDisplayedTags);
    const hiddenCount = Math.max(0, this.selectedOptions.length - visibleTags.length);
    const shouldCollapseToMultiTag = this.showMultiTagOnly && this.selectedOptions.length > 1;
    const hasAllVisibleSelected =
      (this.selectAllMode === 'allPages' ? this.allOptions : this.filteredOptions).length > 0 &&
      (this.selectAllMode === 'allPages' ? this.allOptions : this.filteredOptions).every((option) =>
        this.workingValues.includes(option.value)
      );
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
              control: true,
              open: this.opened,
              invalid: isInvalid,
              readonly: this.readOnly,
              disabled: this.disabled
            }}
            part="control"
            disabled={this.disabled}
            aria-expanded={String(this.opened)}
            aria-haspopup="listbox"
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
            <span class="tags">
              {shouldCollapseToMultiTag ? <span class="tag multi">{this.selectedOptions.length} selected</span> : null}
              {!shouldCollapseToMultiTag
                ? visibleTags.map((option) => (
                    <span class="tag" part="tag">
                      <span>{option.label}</span>
                      {!this.readOnly ? (
                        <span
                          class="remove"
                          role="button"
                          tabindex={0}
                          onClick={(event) => {
                            event.stopPropagation();
                            this.removeValue(option.value);
                          }}
                          onKeyDown={(event: KeyboardEvent) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              event.stopPropagation();
                              this.removeValue(option.value);
                            }
                          }}
                        >
                          x
                        </span>
                      ) : null}
                    </span>
                  ))
                : null}
              {!shouldCollapseToMultiTag && hiddenCount ? <span class="tag multi">+{hiddenCount} more</span> : null}
              {!this.selectedOptions.length ? <span class="placeholder">{this.placeholder}</span> : null}
            </span>
            <span class="icons">
              {this.showClearButton && this.selectedOptions.length && !this.readOnly ? (
                <span
                  class="icon clear"
                  role="button"
                  tabindex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    this.clearAll();
                  }}
                  onKeyDown={(event: KeyboardEvent) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      event.stopPropagation();
                      this.clearAll();
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
          {this.helpText ? <div id={this.helpTextId} part="help-text" class="help-text">{this.helpText}</div> : null}
          {this.errorText ? <div id={this.errorTextId} part="error-text" class="error-text">{this.errorText}</div> : null}
        </div>
        {this.opened ? (
          <div class="panel" id={this.listboxId} part="panel" role="listbox" aria-multiselectable="true">
            {this.searchEnabled ? (
              <input
                type="search"
                class="search"
                part="search"
                placeholder={this.searchPlaceholder}
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
              {this.showSelectionControls && this.filteredOptions.length ? (
                <button type="button" class={{ 'select-all': true, checked: hasAllVisibleSelected }} onClick={() => this.toggleSelectAll()}>
                  <span class={{ checkbox: true, checked: hasAllVisibleSelected }}>{hasAllVisibleSelected ? 'Selected' : ''}</span>
                  <span>{this.selectAllMode === 'allPages' ? `${this.selectAllText} (all)` : this.selectAllText}</span>
                </button>
              ) : null}
              {this.groupedOptions.map((group) => (
                <section class="group">
                  {group.label ? <div class="group-label">{group.label}</div> : null}
                  {group.items.map((option) => {
                    const checked = this.workingValues.includes(option.value);
                    const active = this.filteredOptions[this.activeIndex]?.value === option.value;
                    return (
                      <button
                        type="button"
                        class={{ option: true, checked, active }}
                        role="option"
                        aria-selected={checked ? 'true' : 'false'}
                        onMouseEnter={() => {
                          this.activeIndex = this.filteredOptions.findIndex((item) => item.value === option.value);
                        }}
                        onClick={() => this.toggleValue(option.value)}
                      >
                        {this.showSelectionControls ? (
                          <span class={{ checkbox: true, checked }} aria-hidden="true">
                            {checked ? 'Selected' : ''}
                          </span>
                        ) : null}
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </section>
              ))}
              {!this.filteredOptions.length && !this.canCreateCustomValue ? (
                <div class="empty">
                  {this.query.trim().length < this.minSearchLength && !this.showDataBeforeSearch
                    ? `Type at least ${this.minSearchLength} characters`
                    : this.noDataText}
                </div>
              ) : null}
              {this.canCreateCustomValue ? (
                <button type="button" class="option create-option" onClick={() => this.selectCustomValue()}>
                  Add "{this.query.trim()}"
                </button>
              ) : null}
            </div>
            {this.applyValueMode === 'useButtons' ? (
              <footer class="footer">
                <button type="button" class="action secondary" onClick={() => this.setOpened(false)}>
                  Cancel
                </button>
                <button type="button" class="action primary" onClick={() => this.applyDraftValues()}>
                  Apply
                </button>
              </footer>
            ) : null}
          </div>
        ) : null}
      </Host>
    );
  }
}
