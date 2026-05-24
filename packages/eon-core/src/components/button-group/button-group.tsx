import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { createId } from '@eonui/utils';
import { parseLabeledOptions } from '../shared/helpers';
import type { EonOrientation, EonSelectionMode } from '../shared/types';

@Component({
  tag: 'eon-button-group',
  styleUrl: 'button-group.scss',
  shadow: true
})
export class EonButtonGroup {
  @Prop() label = '';
  @Prop() items = '';
  @Prop() selectionMode: EonSelectionMode = 'single';
  @Prop() orientation: EonOrientation = 'horizontal';
  @Prop({ mutable: true }) value = '';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() ariaLabel = '';
  @Prop() ariaDescription = '';
  @Prop() showSelectionIndicator = true;

  @State() selectedValues: string[] = [];
  @State() focusedIndex = 0;

  @Event() eonChange: EventEmitter<{ values: string[] }>;

  private groupId = createId('eon-button-group');

  connectedCallback() {
    this.syncFromValue();
  }

  @Watch('value')
  syncFromValue() {
    const items = parseLabeledOptions(this.items);
    this.selectedValues = this.value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const selectedIndex = items.findIndex((item) => this.selectedValues.includes(item.value));
    this.focusedIndex = selectedIndex >= 0 ? selectedIndex : 0;
  }

  @Watch('items')
  syncFromItems() {
    this.syncFromValue();
  }

  private get descriptionId(): string | undefined {
    const ids = [
      this.ariaDescription ? `${this.groupId}-description` : '',
      this.invalid && this.errorText ? `${this.groupId}-error` : '',
      !this.invalid && this.helpText ? `${this.groupId}-help` : ''
    ].filter(Boolean);

    return ids.length ? ids.join(' ') : undefined;
  }

  private getInteractiveItems() {
    return parseLabeledOptions(this.items);
  }

  private onSelect(itemValue: string, itemDisabled: boolean) {
    if (this.disabled || this.readOnly || itemDisabled) {
      return;
    }

    let nextValues: string[];
    if (this.selectionMode === 'multiple') {
      nextValues = this.selectedValues.includes(itemValue)
        ? this.selectedValues.filter((value) => value !== itemValue)
        : [...this.selectedValues, itemValue];
    } else {
      nextValues = [itemValue];
    }

    this.selectedValues = nextValues;
    this.value = nextValues.join(',');
    this.eonChange.emit({ values: nextValues });
  }

  private moveFocus(items: ReturnType<EonButtonGroup['getInteractiveItems']>, direction: 1 | -1) {
    if (!items.length) {
      return;
    }

    let nextIndex = this.focusedIndex;
    for (let attempt = 0; attempt < items.length; attempt += 1) {
      nextIndex = (nextIndex + direction + items.length) % items.length;
      if (!items[nextIndex].disabled) {
        this.focusedIndex = nextIndex;
        if (this.selectionMode === 'single') {
          this.onSelect(items[nextIndex].value, false);
        }
        return;
      }
    }
  }

  private onKeyDown(event: KeyboardEvent, items: ReturnType<EonButtonGroup['getInteractiveItems']>) {
    if (this.disabled || this.readOnly || !items.length) {
      return;
    }

    const isHorizontal = this.orientation === 'horizontal';
    if ((isHorizontal && event.key === 'ArrowRight') || (!isHorizontal && event.key === 'ArrowDown')) {
      event.preventDefault();
      this.moveFocus(items, 1);
      return;
    }

    if ((isHorizontal && event.key === 'ArrowLeft') || (!isHorizontal && event.key === 'ArrowUp')) {
      event.preventDefault();
      this.moveFocus(items, -1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const nextIndex = items.findIndex((item) => !item.disabled);
      if (nextIndex >= 0) {
        this.focusedIndex = nextIndex;
        if (this.selectionMode === 'single') {
          this.onSelect(items[nextIndex].value, false);
        }
      }
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const nextIndex = [...items].reverse().findIndex((item) => !item.disabled);
      if (nextIndex >= 0) {
        const resolvedIndex = items.length - 1 - nextIndex;
        this.focusedIndex = resolvedIndex;
        if (this.selectionMode === 'single') {
          this.onSelect(items[resolvedIndex].value, false);
        }
      }
      return;
    }

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      const focusedItem = items[this.focusedIndex];
      if (focusedItem) {
        this.onSelect(focusedItem.value, !!focusedItem.disabled);
      }
    }
  }

  render() {
    const items = this.getInteractiveItems();
    const groupRole = this.selectionMode === 'single' ? 'radiogroup' : 'group';
    const itemRole = this.selectionMode === 'single' ? 'radio' : 'button';
    return (
      <Host>
        <div
          class={{
            wrapper: true,
            vertical: this.orientation === 'vertical',
            invalid: this.invalid,
            readonly: this.readOnly,
            disabled: this.disabled
          }}
        >
          {this.label ? (
            <div class="label-row">
              <span class="label" id={`${this.groupId}-label`}>
                {this.label}
                {this.required ? <span class="required-indicator" aria-hidden="true">*</span> : null}
              </span>
            </div>
          ) : null}
          <div
            class={{ group: true, vertical: this.orientation === 'vertical' }}
            part="base"
            role={groupRole}
            aria-label={this.ariaLabel || this.label || 'Button group'}
            aria-labelledby={this.label ? `${this.groupId}-label` : undefined}
            aria-describedby={this.descriptionId}
            aria-invalid={this.invalid ? 'true' : 'false'}
            aria-required={this.required ? 'true' : undefined}
            aria-readonly={this.readOnly ? 'true' : undefined}
            onKeyDown={(event) => this.onKeyDown(event, items)}
          >
          {items.map((item, index) => {
            const pressed = this.selectedValues.includes(item.value);
            const itemDisabled = this.disabled || !!item.disabled;
            return (
              <button
                type="button"
                class={{ item: true, selected: pressed, withDescription: !!item.description }}
                part="button"
                role={itemRole}
                aria-pressed={this.selectionMode === 'multiple' ? (pressed ? 'true' : 'false') : undefined}
                aria-checked={this.selectionMode === 'single' ? (pressed ? 'true' : 'false') : undefined}
                aria-disabled={itemDisabled ? 'true' : undefined}
                disabled={itemDisabled}
                tabindex={index === this.focusedIndex ? 0 : -1}
                onFocus={() => {
                  this.focusedIndex = index;
                }}
                onClick={() => this.onSelect(item.value, itemDisabled)}
              >
                <span class="copy">
                  <span class="text">{item.label}</span>
                  {item.description ? <span class="description">{item.description}</span> : null}
                </span>
                {this.showSelectionIndicator ? <span class="selection-indicator" aria-hidden="true"></span> : null}
              </button>
            );
          })}
        </div>
          {this.ariaDescription ? (
            <div class="message help" id={`${this.groupId}-description`}>
              {this.ariaDescription}
            </div>
          ) : null}
          {this.invalid && this.errorText ? (
            <div class="message error" id={`${this.groupId}-error`} part="error">
              {this.errorText}
            </div>
          ) : this.helpText ? (
            <div class="message help" id={`${this.groupId}-help`} part="help">
              {this.helpText}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
