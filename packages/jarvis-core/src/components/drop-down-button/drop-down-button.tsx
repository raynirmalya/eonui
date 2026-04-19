import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { parseLabeledOptions } from '../shared/helpers';
import type { JarvisSize } from '../shared/types';

@Component({
  tag: 'jarvis-drop-down-button',
  styleUrl: 'drop-down-button.scss',
  shadow: true
})
export class JarvisDropDownButton {
  @Element() host!: HTMLElement;
  @Prop() label = 'Action';
  @Prop() items = '';
  @Prop() icon = '';
  @Prop() variant: 'solid' | 'outline' | 'ghost' = 'outline';
  @Prop() size: JarvisSize = 'md';
  @Prop() disabled = false;
  @Prop() splitButton = false;
  @Prop() showDescriptions = true;
  @Prop() showSelectionIndicator = true;
  @Prop() showArrowIcon = true;
  @Prop() closeOnSelect = true;
  @Prop({ mutable: true, reflect: true }) value = '';
  @Prop() ariaLabel = 'Drop-down button';

  @State() open = false;
  @State() activeIndex = -1;

  @Event() jarvisSelect: EventEmitter<{ value: string }>;

  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;

  componentWillLoad() {
    this.syncActiveIndex();
  }

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      this.open = false;
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
  }

  @Watch('items')
  syncActiveIndex() {
    const firstEnabled = this.options.findIndex((option) => !option.disabled);
    this.activeIndex = firstEnabled === -1 ? -1 : firstEnabled;
  }

  @Method()
  async show(): Promise<void> {
    if (this.disabled || !this.options.length) {
      return;
    }

    this.open = true;
    requestAnimationFrame(() => this.focusItem(this.activeIndex === -1 ? 0 : this.activeIndex));
  }

  @Method()
  async hide(): Promise<void> {
    this.open = false;
  }

  private get options() {
    return parseLabeledOptions(this.items);
  }

  private focusItem(index: number) {
    const items = Array.from(this.host.shadowRoot?.querySelectorAll<HTMLButtonElement>('button.menu-item') ?? []);
    if (!items.length) {
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, items.length - 1));
    this.activeIndex = safeIndex;
    items.forEach((item, itemIndex) => {
      item.tabIndex = itemIndex === safeIndex ? 0 : -1;
    });
    items[safeIndex].focus();
  }

  private moveActive(offset: number) {
    const enabledItems = this.options.map((option, index) => ({ option, index })).filter(({ option }) => !option.disabled);
    if (!enabledItems.length) {
      return;
    }

    const currentEnabledIndex = Math.max(
      0,
      enabledItems.findIndex(({ index }) => index === this.activeIndex)
    );
    const nextEnabledIndex = (currentEnabledIndex + offset + enabledItems.length) % enabledItems.length;
    this.focusItem(enabledItems[nextEnabledIndex].index);
  }

  private onSelect(optionValue: string, disabled = false) {
    if (disabled) {
      return;
    }

    this.value = optionValue;
    this.jarvisSelect.emit({ value: optionValue });
    if (this.closeOnSelect) {
      this.open = false;
    }
  }

  private onTriggerKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.show();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.open ? this.hide() : this.show();
        break;
      case 'Escape':
        event.preventDefault();
        this.hide();
        break;
      default:
        break;
    }
  }

  private onPanelKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusItem(this.options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.activeIndex >= 0) {
          const activeOption = this.options[this.activeIndex];
          this.onSelect(activeOption.value, activeOption.disabled);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.hide();
        break;
      case 'Tab':
        this.hide();
        break;
      default:
        break;
    }
  }

  private onPrimaryAction(): void {
    if (this.disabled) {
      return;
    }

    const selectedOption = this.options.find((option) => option.value === this.value && !option.disabled);
    const fallbackOption = this.options.find((option) => !option.disabled);
    const targetOption = selectedOption ?? fallbackOption;
    if (!targetOption) {
      return;
    }

    this.onSelect(targetOption.value, targetOption.disabled);
  }

  render() {
    const options = this.options;
    const selectedOption = options.find((option) => option.value === this.value);

    return (
      <Host>
        <div class="shell" part="base">
          {this.splitButton ? (
            <div class={`split-shell ${this.variant} ${this.size}`} part="trigger">
              <button
                type="button"
                class={`trigger primary ${this.variant} ${this.size}`}
                part="primary-trigger"
                aria-label={this.ariaLabel}
                disabled={this.disabled}
                onClick={() => this.onPrimaryAction()}
              >
                {this.icon ? <span class="icon" part="icon">{this.icon}</span> : null}
                <span class="label" part="label">{selectedOption?.label || this.label}</span>
              </button>
              <button
                type="button"
                class={`trigger toggle ${this.variant} ${this.size}`}
                part="toggle-trigger"
                aria-haspopup="menu"
                aria-expanded={String(this.open)}
                aria-label={`${this.ariaLabel} menu`}
                disabled={this.disabled}
                onClick={() => (this.open ? this.hide() : this.show())}
                onKeyDown={(event: KeyboardEvent) => this.onTriggerKeyDown(event)}
              >
                {this.showArrowIcon ? <span class={{ chevron: true, open: this.open }} aria-hidden="true">v</span> : null}
              </button>
            </div>
          ) : (
            <button
              type="button"
              class={`trigger ${this.variant} ${this.size}`}
              part="trigger"
              aria-label={this.ariaLabel}
              aria-haspopup="menu"
              aria-expanded={String(this.open)}
              disabled={this.disabled}
              onClick={() => (this.open ? this.hide() : this.show())}
              onKeyDown={(event: KeyboardEvent) => this.onTriggerKeyDown(event)}
            >
              {this.icon ? <span class="icon" part="icon">{this.icon}</span> : null}
              <span class="label" part="label">{selectedOption?.label || this.label}</span>
              {this.showArrowIcon ? <span class={{ chevron: true, open: this.open }} aria-hidden="true">v</span> : null}
            </button>
          )}
          <div class={{ panel: true, open: this.open }} part="panel" role="menu" hidden={!this.open} onKeyDown={(event: KeyboardEvent) => this.onPanelKeyDown(event)}>
            {options.map((option, index) => (
              <button
                type="button"
                class={{ 'menu-item': true, danger: option.tone === 'danger', selected: option.value === this.value }}
                part="item"
                role="menuitem"
                disabled={option.disabled}
                aria-disabled={option.disabled ? 'true' : undefined}
                tabIndex={this.activeIndex === index ? 0 : -1}
                onMouseEnter={() => {
                  if (!option.disabled) {
                    this.activeIndex = index;
                  }
                }}
                onClick={() => this.onSelect(option.value, option.disabled)}
              >
                <span class="item-main">
                  <span class="item-label">{option.label}</span>
                  {this.showDescriptions && option.description ? <span class="item-description">{option.description}</span> : null}
                </span>
                {this.showSelectionIndicator && option.value === this.value ? <span class="item-indicator" aria-hidden="true">v</span> : null}
              </button>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
