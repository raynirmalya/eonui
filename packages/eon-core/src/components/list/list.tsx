import { Component, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { filterLabeledOptions, groupOptions, parseLabeledOptions, parseOptions, type LabeledOption } from '../shared/helpers';
import type { EonSelectionMode } from '../shared/types';

type EonListSelectionMode = EonSelectionMode | 'none';
type EonSearchMode = 'contains' | 'startsWith' | 'equals';

@Component({
  tag: 'eon-list',
  styleUrl: 'list.scss',
  shadow: true
})
export class EonList {
  @Prop() ordered = false;
  @Prop() items = '';
  @Prop() selectionMode: EonListSelectionMode = 'none';
  @Prop() searchEnabled = false;
  @Prop() searchMode: EonSearchMode = 'contains';
  @Prop() searchPlaceholder = 'Search list';
  @Prop() showSelectionControls = false;
  @Prop() showToolbar = false;
  @Prop() showSelectAll = false;
  @Prop() showStatus = false;
  @Prop() selectAllText = 'Select all';
  @Prop() clearSelectionText = 'Clear';
  @Prop() ariaLabel = 'List';
  @Prop({ mutable: true }) selected = '';
  @Prop() height = '';
  @Prop() emptyStateText = 'No items match this view.';

  @State() query = '';
  @State() selectedValues: string[] = [];
  @State() activeValue = '';

  @Event() eonChange: EventEmitter<{ values: string[] }>;

  connectedCallback() {
    this.syncSelection();
    this.initializeActiveValue();
  }

  @Watch('selected')
  syncSelection() {
    this.selectedValues = parseOptions(this.selected);
  }

  @Watch('items')
  initializeActiveValue() {
    this.activeValue = this.baseOptions[0]?.value ?? '';
  }

  @Watch('query')
  handleQueryChange() {
    if (!this.filteredOptions.some((option) => option.value === this.activeValue)) {
      this.activeValue = this.filteredOptions[0]?.value ?? '';
    }
  }

  private get baseOptions(): LabeledOption[] {
    return parseLabeledOptions(this.items);
  }

  private get filteredOptions(): LabeledOption[] {
    return filterLabeledOptions(this.baseOptions, {
      query: this.query,
      mode: this.searchMode
    });
  }

  private get groupedOptions(): Array<{ label: string; items: LabeledOption[] }> {
    return groupOptions(this.filteredOptions);
  }

  private get hasInteractiveItems(): boolean {
    return this.baseOptions.length > 0;
  }

  private get canSelectAll(): boolean {
    return this.selectionMode === 'multiple' && this.filteredOptions.length > 0;
  }

  private isSelected(value: string): boolean {
    if (this.selectionMode === 'multiple') {
      return this.selectedValues.includes(value);
    }

    return this.selectedValues[0] === value;
  }

  private emitSelection(nextValues: string[]) {
    this.selectedValues = nextValues;
    this.selected = nextValues.join(',');
    this.eonChange.emit({ values: nextValues });
  }

  private toggleOption(option: LabeledOption) {
    this.activeValue = option.value;

    if (this.selectionMode === 'none') {
      this.eonChange.emit({ values: [option.value] });
      return;
    }

    if (this.selectionMode === 'single') {
      this.emitSelection([option.value]);
      return;
    }

    const nextValues = new Set(this.selectedValues);
    if (nextValues.has(option.value)) {
      nextValues.delete(option.value);
    } else {
      nextValues.add(option.value);
    }

    const orderedValues = this.baseOptions.map((entry) => entry.value).filter((value) => nextValues.has(value));
    this.emitSelection(orderedValues);
  }

  @Method()
  async selectAll(): Promise<void> {
    if (!this.canSelectAll) {
      return;
    }

    const nextValues = new Set(this.selectedValues);
    this.filteredOptions.forEach((option) => nextValues.add(option.value));
    const orderedValues = this.baseOptions.map((entry) => entry.value).filter((value) => nextValues.has(value));
    this.emitSelection(orderedValues);
  }

  @Method()
  async clearSelection(): Promise<void> {
    this.emitSelection([]);
  }

  private handleRowKeyDown(event: KeyboardEvent, option: LabeledOption) {
    const options = this.filteredOptions;
    const currentIndex = options.findIndex((entry) => entry.value === option.value);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeValue = options[(currentIndex + 1 + options.length) % options.length]?.value ?? option.value;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeValue = options[(currentIndex - 1 + options.length) % options.length]?.value ?? option.value;
        break;
      case 'Home':
        event.preventDefault();
        this.activeValue = options[0]?.value ?? option.value;
        break;
      case 'End':
        event.preventDefault();
        this.activeValue = options[options.length - 1]?.value ?? option.value;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleOption(option);
        break;
      default:
        break;
    }
  }

  private renderStaticList() {
    return this.ordered ? (
      <ol class="list" part="base">
        <slot />
      </ol>
    ) : (
      <ul class="list" part="base">
        <slot />
      </ul>
    );
  }

  private renderInteractiveList() {
    const showSelectionControls = this.showSelectionControls && this.selectionMode !== 'none';
    const isSelectable = this.selectionMode !== 'none';
    const selectedCount = this.selectedValues.filter((value) => this.filteredOptions.some((option) => option.value === value)).length;
    const renderItems = (items: LabeledOption[]) =>
      items.map((option) => {
        const selected = this.isSelected(option.value);
        return (
          <li role="none">
            <button
              type="button"
              class={{ row: true, selected, active: this.activeValue === option.value }}
              part="item"
              role={isSelectable ? 'option' : undefined}
              aria-selected={isSelectable ? String(selected) : undefined}
              onFocus={() => {
                this.activeValue = option.value;
              }}
              onClick={() => this.toggleOption(option)}
              onKeyDown={(event) => this.handleRowKeyDown(event, option)}
            >
              {showSelectionControls ? (
                <input
                  type={this.selectionMode === 'multiple' ? 'checkbox' : 'radio'}
                  checked={selected}
                  tabIndex={-1}
                  onInput={() => this.toggleOption(option)}
                />
              ) : null}
              <span class="copy">
                <span class="title">{option.label}</span>
                {option.description ? <span class="description">{option.description}</span> : null}
              </span>
            </button>
          </li>
        );
      });

    return (
      <div class="interactive-list" part="base">
        {this.showToolbar || this.showStatus ? (
          <div class="toolbar" part="toolbar">
            {this.showStatus ? (
              <div class="status" part="status">
                <span>{this.filteredOptions.length} visible</span>
                {isSelectable ? <span>{selectedCount} selected</span> : null}
              </div>
            ) : (
              <span class="status-spacer" aria-hidden="true"></span>
            )}
            {this.showToolbar ? (
              <div class="actions" part="actions">
                {this.showSelectAll && this.canSelectAll ? (
                  <button type="button" class="toolbar-button" part="select-all" onClick={() => this.selectAll()}>
                    {this.selectAllText}
                  </button>
                ) : null}
                {isSelectable ? (
                  <button type="button" class="toolbar-button" part="clear-selection" onClick={() => this.clearSelection()}>
                    {this.clearSelectionText}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        {this.searchEnabled ? (
          <label class="search-field">
            <span class="search-label">Filter items</span>
            <input
              type="search"
              part="search"
              placeholder={this.searchPlaceholder}
              value={this.query}
              onInput={(event) => {
                this.query = (event.target as HTMLInputElement).value;
              }}
            />
          </label>
        ) : null}
        <div class="viewport" style={this.height ? { maxHeight: this.height } : undefined}>
          {this.filteredOptions.length ? (
            this.groupedOptions.map((group) => (
              <section class="group" part="group">
                {group.label ? (
                  <div class="group-label" part="group-label">
                    {group.label}
                  </div>
                ) : null}
                {this.ordered ? (
                  <ol class="list interactive" role={isSelectable ? 'listbox' : 'list'} aria-label={this.ariaLabel} aria-multiselectable={this.selectionMode === 'multiple' ? 'true' : undefined}>
                    {renderItems(group.items)}
                  </ol>
                ) : (
                  <ul class="list interactive" role={isSelectable ? 'listbox' : 'list'} aria-label={this.ariaLabel} aria-multiselectable={this.selectionMode === 'multiple' ? 'true' : undefined}>
                    {renderItems(group.items)}
                  </ul>
                )}
              </section>
            ))
          ) : (
            <div class="empty" part="empty">
              {this.emptyStateText}
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Host>
        {this.hasInteractiveItems ? this.renderInteractiveList() : this.renderStaticList()}
      </Host>
    );
  }
}
