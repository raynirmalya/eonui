import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { createId } from '@jarvis/utils';
import { parseLabeledOptions } from '../shared/helpers';
import type { JarvisOrientation } from '../shared/types';

@Component({
  tag: 'jarvis-radio-group',
  styleUrl: 'radio-group.scss',
  shadow: true
})
export class JarvisRadioGroup {
  @Prop() label = '';
  @Prop() items = '';
  @Prop({ mutable: true }) value = '';
  @Prop() orientation: JarvisOrientation = 'vertical';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() name = '';
  @Prop() ariaLabel = '';
  @Prop() ariaDescription = '';
  @Prop() showDescriptions = true;

  @State() focusedIndex = 0;

  @Event() jarvisChange: EventEmitter<{ value: string }>;

  private groupId = createId('jarvis-radio-group');

  connectedCallback() {
    this.syncFocusFromValue();
  }

  @Watch('value')
  @Watch('items')
  syncFocusFromValue() {
    const items = this.getItems();
    const selectedIndex = items.findIndex((item) => item.value === this.value);
    const firstEnabled = items.findIndex((item) => !item.disabled);
    this.focusedIndex = selectedIndex >= 0 ? selectedIndex : Math.max(firstEnabled, 0);
  }

  private get descriptionId(): string | undefined {
    const ids = [
      this.ariaDescription ? `${this.groupId}-description` : '',
      this.invalid && this.errorText ? `${this.groupId}-error` : '',
      !this.invalid && this.helpText ? `${this.groupId}-help` : ''
    ].filter(Boolean);

    return ids.length ? ids.join(' ') : undefined;
  }

  private getItems() {
    return parseLabeledOptions(this.items);
  }

  private selectValue(nextValue: string, itemDisabled: boolean) {
    if (this.disabled || this.readOnly || itemDisabled) {
      return;
    }

    this.value = nextValue;
    this.jarvisChange.emit({ value: nextValue });
  }

  private moveFocus(items: ReturnType<JarvisRadioGroup['getItems']>, direction: 1 | -1) {
    if (!items.length) {
      return;
    }

    let nextIndex = this.focusedIndex;
    for (let attempt = 0; attempt < items.length; attempt += 1) {
      nextIndex = (nextIndex + direction + items.length) % items.length;
      if (!items[nextIndex].disabled) {
        this.focusedIndex = nextIndex;
        this.selectValue(items[nextIndex].value, false);
        return;
      }
    }
  }

  private onKeyDown(event: KeyboardEvent, items: ReturnType<JarvisRadioGroup['getItems']>) {
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
        this.selectValue(items[nextIndex].value, false);
      }
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const nextIndex = [...items].reverse().findIndex((item) => !item.disabled);
      if (nextIndex >= 0) {
        const resolvedIndex = items.length - 1 - nextIndex;
        this.focusedIndex = resolvedIndex;
        this.selectValue(items[resolvedIndex].value, false);
      }
    }
  }

  render() {
    const items = this.getItems();
    return (
      <Host>
        <fieldset class={{ group: true, horizontal: this.orientation === 'horizontal', invalid: this.invalid, readonly: this.readOnly }} part="base" disabled={this.disabled}>
          {this.label ? (
            <legend class="label">
              {this.label}
              {this.required ? <span class="required-indicator" aria-hidden="true">*</span> : null}
            </legend>
          ) : null}
          {this.ariaDescription ? (
            <div class="message help" id={`${this.groupId}-description`}>
              {this.ariaDescription}
            </div>
          ) : null}
          <div
            class="items"
            role="radiogroup"
            aria-label={this.ariaLabel || this.label || 'Options'}
            aria-required={this.required ? 'true' : undefined}
            aria-invalid={this.invalid ? 'true' : 'false'}
            aria-readonly={this.readOnly ? 'true' : undefined}
            aria-describedby={this.descriptionId}
            onKeyDown={(event) => this.onKeyDown(event, items)}
          >
            {items.map((item, index) => (
              <label class={{ item: true, checked: item.value === this.value, described: !!item.description && this.showDescriptions, toneDanger: item.tone === 'danger' }} part="item">
                <input
                  type="radio"
                  name={this.name || this.groupId}
                  value={item.value}
                  checked={item.value === this.value}
                  disabled={this.disabled || !!item.disabled}
                  tabindex={index === this.focusedIndex ? 0 : -1}
                  onFocus={() => {
                    this.focusedIndex = index;
                  }}
                  onChange={() => {
                    this.selectValue(item.value, !!item.disabled);
                  }}
                />
                <span class="indicator" part="indicator" aria-hidden="true"></span>
                <span class="copy">
                  <span class="text">{item.label}</span>
                  {item.description && this.showDescriptions ? <span class="description">{item.description}</span> : null}
                </span>
              </label>
            ))}
          </div>
          {this.invalid && this.errorText ? (
            <div class="message error" id={`${this.groupId}-error`} part="error">
              {this.errorText}
            </div>
          ) : this.helpText ? (
            <div class="message help" id={`${this.groupId}-help`} part="help">
              {this.helpText}
            </div>
          ) : null}
        </fieldset>
      </Host>
    );
  }
}
