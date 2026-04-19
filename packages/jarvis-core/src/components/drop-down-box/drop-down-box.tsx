import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { createId } from '@jarvis/utils';
import { buildPathTree, filterLabeledOptions, parseLabeledOptions, parseOptions, type JarvisSearchMode, type LabeledOption, type PathOptionNode } from '../shared/helpers';
import type { JarvisSelectionMode } from '../shared/types';

type JarvisApplyValueMode = 'instantly' | 'useButtons';

function filterTree(nodes: PathOptionNode[], query: string): PathOptionNode[] {
  if (!query) {
    return nodes;
  }

  return nodes
    .map((node) => ({
      ...node,
      children: filterTree(node.children, query)
    }))
    .filter((node) => node.label.toLowerCase().includes(query) || node.children.length);
}

@Component({
  tag: 'jarvis-drop-down-box',
  styleUrl: 'drop-down-box.scss',
  shadow: true
})
export class JarvisDropDownBox {
  @Element() host!: HTMLElement;
  @Prop() label = '';
  @Prop() items = '';
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder = 'Select a value...';
  @Prop() noDataText = 'No matching items';
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() selectionMode: JarvisSelectionMode = 'single';
  @Prop() contentType: 'tree' | 'list' = 'tree';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop({ mutable: true, reflect: true }) opened = false;
  @Prop() openOnFieldClick = true;
  @Prop() showClearButton = false;
  @Prop() showDropDownButton = true;
  @Prop() showSelectionControls = true;
  @Prop() searchEnabled = true;
  @Prop() searchMode: JarvisSearchMode = 'contains';
  @Prop() minSearchLength = 0;
  @Prop() showDataBeforeSearch = true;
  @Prop() searchExpr = '';
  @Prop() searchPlaceholder = 'Search';
  @Prop() acceptCustomValue = false;
  @Prop() applyValueMode: JarvisApplyValueMode = 'instantly';

  @State() query = '';
  @State() activeIndex = -1;
  @State() expandedPaths: string[] = [];
  @State() draftValues: string[] = [];

  @Event() jarvisChange: EventEmitter<{ values: string[] }>;
  @Event() jarvisOpened: EventEmitter<void>;
  @Event() jarvisClosed: EventEmitter<void>;
  @Event() jarvisCustomItemCreate: EventEmitter<{ value: string }>;

  private inputId = createId('jarvis-drop-down-box');
  private listboxId = createId('jarvis-drop-down-box-listbox');
  private labelId = createId('jarvis-drop-down-box-label');
  private helpTextId = createId('jarvis-drop-down-box-help');
  private errorTextId = createId('jarvis-drop-down-box-error');
  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private searchInput?: HTMLInputElement;

  connectedCallback() {
    this.expandedPaths = this.getInitialExpandedPaths();
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

  private getInitialExpandedPaths() {
    const rootPaths = buildPathTree(this.items).map((node) => node.value);
    const selectedPaths = this.selectedValues.flatMap((value) => {
      const segments = value.split('/').map((segment) => segment.trim()).filter(Boolean);
      return segments.map((_, index) => segments.slice(0, index + 1).join('/'));
    });

    return [...new Set([...rootPaths, ...selectedPaths])];
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

  private get searchAllowed() {
    return this.showDataBeforeSearch || this.query.trim().length >= this.minSearchLength;
  }

  private get displayValue() {
    const lookup = new Map(this.allOptions.map((option) => [option.value, option.label]));
    return this.selectedValues.map((item) => lookup.get(item) || item.split('/').at(-1) || item).join(', ');
  }

  private get flatOptions(): LabeledOption[] {
    return this.searchAllowed
      ? filterLabeledOptions(this.allOptions, {
          expr: this.searchExpr,
          mode: this.searchMode,
          minLength: this.minSearchLength,
          query: this.query,
          showDataBeforeSearch: this.showDataBeforeSearch
        })
      : [];
  }

  private get treeNodes(): PathOptionNode[] {
    const tree = buildPathTree(this.items);
    if (!this.searchAllowed) {
      return [];
    }

    return filterTree(tree, this.query.trim().toLowerCase());
  }

  private get canCreateCustomValue() {
    const normalized = this.query.trim();
    if (!this.acceptCustomValue || !normalized || this.contentType !== 'list') {
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
      this.draftValues = [...this.selectedValues];
      this.jarvisOpened.emit();
      return;
    }

    this.query = '';
    this.activeIndex = -1;
    this.draftValues = [...this.selectedValues];
    this.jarvisClosed.emit();
  }

  private emitValues(nextValues: string[]) {
    const uniqueValues = [...new Set(nextValues)];
    this.value = uniqueValues.join(',');
    this.jarvisChange.emit({ values: uniqueValues });
  }

  private updateValues(nextValues: string[]) {
    if (this.applyValueMode === 'useButtons') {
      this.draftValues = [...new Set(nextValues)];
      return;
    }

    this.emitValues(nextValues);
    if (this.selectionMode === 'single') {
      this.setOpened(false);
    }
  }

  private applyDraftValues() {
    this.emitValues(this.draftValues);
    this.setOpened(false);
  }

  private clearAll() {
    if (this.applyValueMode === 'useButtons') {
      this.draftValues = [];
      return;
    }

    this.emitValues([]);
  }

  private toggleValue(nextValue: string) {
    const nextValues =
      this.selectionMode === 'multiple'
        ? this.workingValues.includes(nextValue)
          ? this.workingValues.filter((item) => item !== nextValue)
          : [...this.workingValues, nextValue]
        : [nextValue];

    this.updateValues(nextValues);
  }

  private toggleExpanded(value: string) {
    this.expandedPaths = this.expandedPaths.includes(value)
      ? this.expandedPaths.filter((item) => item !== value)
      : [...this.expandedPaths, value];
  }

  private toggleSelectAll() {
    const visibleValues = this.flatOptions.map((option) => option.value);
    const hasAllVisible = visibleValues.length > 0 && visibleValues.every((value) => this.workingValues.includes(value));
    const nextValues = hasAllVisible ? this.workingValues.filter((value) => !visibleValues.includes(value)) : [...this.workingValues, ...visibleValues];
    this.updateValues(nextValues);
  }

  private selectCustomValue() {
    const nextValue = this.query.trim();
    if (!nextValue) {
      return;
    }

    this.jarvisCustomItemCreate.emit({ value: nextValue });
    this.updateValues([...this.workingValues, nextValue]);
    this.query = '';
    this.activeIndex = -1;
    if (this.applyValueMode === 'instantly' && this.selectionMode === 'single') {
      this.setOpened(false);
    }
  }

  private moveActive(offset: number) {
    if (!this.flatOptions.length) {
      return;
    }

    const nextIndex = this.activeIndex < 0 ? (offset > 0 ? 0 : this.flatOptions.length - 1) : this.activeIndex + offset;
    this.activeIndex = Math.max(0, Math.min(this.flatOptions.length - 1, nextIndex));
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

      const activeOption = this.flatOptions[this.activeIndex];
      if (activeOption) {
        event.preventDefault();
        this.toggleValue(activeOption.value);
      } else if (this.canCreateCustomValue) {
        event.preventDefault();
        this.selectCustomValue();
      }
    } else if (event.key === 'Home' && this.flatOptions.length) {
      event.preventDefault();
      this.activeIndex = 0;
    } else if (event.key === 'End' && this.flatOptions.length) {
      event.preventDefault();
      this.activeIndex = this.flatOptions.length - 1;
    } else if (event.key === 'Escape') {
      this.setOpened(false);
    } else if (event.key === 'Tab') {
      this.setOpened(false);
    }
  }

  private renderTreeNode(node: PathOptionNode) {
    const expanded = Boolean(this.query.trim()) || this.expandedPaths.includes(node.value);
    const checked = this.workingValues.includes(node.value);

    return (
      <li class="tree-node">
        <div class="tree-row">
          {node.children.length ? (
            <button type="button" class="toggle" onClick={() => this.toggleExpanded(node.value)} aria-label={expanded ? 'Collapse node' : 'Expand node'}>
              {expanded ? 'v' : '>'}
            </button>
          ) : (
            <span class="toggle spacer"></span>
          )}
          {this.selectionMode === 'multiple' && this.showSelectionControls ? (
            <span class={{ checkbox: true, checked }} aria-hidden="true">
              {checked ? 'Selected' : ''}
            </span>
          ) : null}
          <button type="button" class={{ item: true, selected: checked }} onClick={() => this.toggleValue(node.value)}>
            {node.label}
          </button>
        </div>
        {node.children.length && expanded ? <ul class="tree-children">{node.children.map((child) => this.renderTreeNode(child))}</ul> : null}
      </li>
    );
  }

  render() {
    const hasAllVisibleSelected = this.flatOptions.length > 0 && this.flatOptions.every((option) => this.workingValues.includes(option.value));
    const describedBy = [this.helpText ? this.helpTextId : '', this.errorText ? this.errorTextId : ''].filter(Boolean).join(' ');
    const isInvalid = this.invalid || !!this.errorText;

    return (
      <Host>
        <div class="field" part="base">
          {this.label ? <span class="label" id={this.labelId}>{this.label}</span> : null}
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
            aria-labelledby={this.label ? this.labelId : undefined}
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
              {this.showClearButton && this.selectedValues.length && !this.readOnly ? (
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
                  x
                </span>
              ) : null}
              {this.showDropDownButton ? <span class="icon chevron">v</span> : null}
            </span>
          </button>
          {this.helpText ? <div id={this.helpTextId} part="help-text" class="help-text">{this.helpText}</div> : null}
          {this.errorText ? <div id={this.errorTextId} part="error-text" class="error-text">{this.errorText}</div> : null}
        </div>
        {this.opened ? (
          <div class="panel" id={this.listboxId} part="panel">
            {this.searchEnabled ? (
              <input
                class="search"
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
            ) : null}
            {this.selectionMode === 'multiple' && this.showSelectionControls && this.contentType === 'list' && this.flatOptions.length ? (
              <button type="button" class={{ 'select-all': true, checked: hasAllVisibleSelected }} onClick={() => this.toggleSelectAll()}>
                <span class={{ checkbox: true, checked: hasAllVisibleSelected }}>{hasAllVisibleSelected ? 'Selected' : ''}</span>
                <span>Select all</span>
              </button>
            ) : null}
            {this.contentType === 'tree' ? (
              this.treeNodes.length ? (
                <ul class="tree">{this.treeNodes.map((node) => this.renderTreeNode(node))}</ul>
              ) : (
                <div class="empty">
                  {this.query.trim().length < this.minSearchLength && !this.showDataBeforeSearch
                    ? `Type at least ${this.minSearchLength} characters`
                    : this.noDataText}
                </div>
              )
            ) : (
              <div class="list">
                {this.flatOptions.map((option) => {
                  const checked = this.workingValues.includes(option.value);
                  const active = this.flatOptions[this.activeIndex]?.value === option.value;
                  return (
                    <button
                      type="button"
                      class={{ item: true, selected: checked, active }}
                      onMouseEnter={() => {
                        this.activeIndex = this.flatOptions.findIndex((item) => item.value === option.value);
                      }}
                      onClick={() => this.toggleValue(option.value)}
                    >
                      {this.selectionMode === 'multiple' && this.showSelectionControls ? (
                        <span class={{ checkbox: true, checked }}>{checked ? 'Selected' : ''}</span>
                      ) : null}
                      <span>{option.label}</span>
                    </button>
                  );
                })}
                {!this.flatOptions.length && !this.canCreateCustomValue ? (
                  <div class="empty">
                    {this.query.trim().length < this.minSearchLength && !this.showDataBeforeSearch
                      ? `Type at least ${this.minSearchLength} characters`
                      : this.noDataText}
                  </div>
                ) : null}
                {this.canCreateCustomValue ? (
                  <button type="button" class="item create-option" onClick={() => this.selectCustomValue()}>
                    Use "{this.query.trim()}"
                  </button>
                ) : null}
              </div>
            )}
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
