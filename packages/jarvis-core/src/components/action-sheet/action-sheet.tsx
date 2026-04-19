import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler, restoreFocus } from '@jarvis/a11y';
import { parseLabeledOptions } from '../shared/helpers';

@Component({
  tag: 'jarvis-action-sheet',
  styleUrl: 'action-sheet.scss',
  shadow: true
})
export class JarvisActionSheet {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() heading = 'Choose action';
  @Prop() description = '';
  @Prop() items = '';
  @Prop({ mutable: true, reflect: true }) value = '';
  @Prop() presentation: 'sheet' | 'popover' = 'sheet';
  @Prop() showCancelButton = true;
  @Prop() showDescriptions = true;
  @Prop() showSelectionIndicator = true;
  @Prop() cancelText = 'Cancel';
  @Prop() closeOnOutsideClick = true;
  @Prop() showHandle = true;
  @Prop() width = '';

  @State() mounted = false;
  @State() activeIndex = 0;

  @Event() jarvisSelect: EventEmitter<{ value: string }>;
  @Event() jarvisCancel: EventEmitter<void>;

  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private previousFocus?: HTMLElement | null;

  componentWillLoad() {
    this.mounted = this.open;
  }

  componentDidLoad() {
    if (this.open) {
      requestAnimationFrame(() => this.focusAction(this.activeIndex));
    }
  }

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      if (this.open && this.closeOnOutsideClick) {
        this.hide(true);
      }
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
  }

  @Watch('open')
  handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      this.mounted = true;
      this.activeIndex = this.getFirstEnabledIndex();
      requestAnimationFrame(() => this.focusAction(this.activeIndex));
      return;
    }

    this.activeIndex = 0;
  }

  @Method()
  async show(): Promise<void> {
    this.previousFocus = document.activeElement as HTMLElement | null;
    this.activeIndex = this.getFirstEnabledIndex();
    this.open = true;
    this.mounted = true;
  }

  @Method()
  async hide(cancelled = false): Promise<void> {
    this.open = false;
    if (cancelled) {
      this.jarvisCancel.emit();
    }
    restoreFocus(this.previousFocus);
  }

  private get actionButtons(): HTMLButtonElement[] {
    return Array.from(this.host.shadowRoot?.querySelectorAll<HTMLButtonElement>('.action') ?? []);
  }

  private getFirstEnabledIndex(): number {
    const options = parseLabeledOptions(this.items);
    const firstEnabledIndex = options.findIndex((option) => !option.disabled);
    return firstEnabledIndex === -1 ? 0 : firstEnabledIndex;
  }

  private focusAction(index: number) {
    const buttons = this.actionButtons;
    if (!buttons.length) {
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, buttons.length - 1));
    this.activeIndex = safeIndex;
    buttons.forEach((button, buttonIndex) => {
      button.tabIndex = buttonIndex === safeIndex ? 0 : -1;
    });
    buttons[safeIndex].focus();
  }

  private onSelect(value: string, index: number) {
    this.activeIndex = index;
    this.value = value;
    this.jarvisSelect.emit({ value });
    this.hide();
  }

  private onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && this.closeOnOutsideClick) {
      this.hide(true);
    }
  }

  private getAdjacentEnabledIndex(enabledIndexes: Array<{ index: number }>, offset: number): number {
    if (!enabledIndexes.length) {
      return this.activeIndex;
    }

    const currentEnabledIndex = enabledIndexes.findIndex(({ index }) => index === this.activeIndex);
    const safeEnabledIndex = currentEnabledIndex === -1 ? 0 : currentEnabledIndex;
    const nextEnabledIndex = (safeEnabledIndex + offset + enabledIndexes.length) % enabledIndexes.length;
    return enabledIndexes[nextEnabledIndex].index;
  }

  private onKeyDown(event: KeyboardEvent, count: number) {
    const options = parseLabeledOptions(this.items);
    const enabledIndexes = options.map((option, index) => ({ option, index })).filter(({ option }) => !option.disabled);
    if (!count) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        if (!enabledIndexes.length) {
          return;
        }
        this.focusAction(this.getAdjacentEnabledIndex(enabledIndexes, 1));
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        if (!enabledIndexes.length) {
          return;
        }
        this.focusAction(this.getAdjacentEnabledIndex(enabledIndexes, -1));
        break;
      case 'Home':
        event.preventDefault();
        this.focusAction(this.getFirstEnabledIndex());
        break;
      case 'End':
        event.preventDefault();
        this.focusAction(enabledIndexes[enabledIndexes.length - 1]?.index ?? count - 1);
        break;
      case 'Escape':
        event.preventDefault();
        this.hide(true);
        break;
      default:
        break;
    }
  }

  render() {
    const options = parseLabeledOptions(this.items);

    if (!this.mounted && !this.open) {
      return <Host />;
    }

    return (
      <Host>
        <div class={{ overlay: true, open: this.open }} part="overlay" hidden={!this.open} aria-hidden={this.open ? 'false' : 'true'} onClick={(event) => this.onBackdropClick(event)}>
          <section
            class={{ panel: true, [this.presentation]: true }}
            part="panel"
            role="dialog"
            aria-modal="true"
            aria-label={this.heading}
            style={{ '--action-sheet-width': this.width || undefined }}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => this.onKeyDown(event, options.length)}
          >
            {this.presentation === 'sheet' && this.showHandle ? <div class="handle" part="handle" aria-hidden="true"></div> : null}
            <header class="header" part="header">
              <div class="heading-group">
                <strong>{this.heading}</strong>
                {this.description ? <p class="description">{this.description}</p> : null}
              </div>
              {this.presentation === 'popover' ? (
                <button type="button" class="dismiss" part="dismiss-button" onClick={() => this.hide(true)} aria-label="Close action sheet">
                  x
                </button>
              ) : null}
            </header>
            <div class="actions" part="actions" role="menu" aria-label={this.heading}>
              {options.map((option, index) => (
                <button
                  type="button"
                  class={{ action: true, selected: this.value === option.value, danger: option.tone === 'danger' || /delete|remove|danger/i.test(option.label) }}
                  part="action"
                  role="menuitem"
                  disabled={option.disabled}
                  aria-disabled={option.disabled ? 'true' : undefined}
                  aria-current={this.value === option.value ? 'true' : undefined}
                  tabIndex={index === this.activeIndex ? 0 : -1}
                  onClick={() => {
                    if (!option.disabled) {
                      this.onSelect(option.value, index);
                    }
                  }}
                  onFocus={() => {
                    if (!option.disabled) {
                      this.activeIndex = index;
                    }
                  }}
                >
                  <span class="action-main">
                    <span class="action-label">{option.label}</span>
                    {this.showDescriptions && option.description ? <span class="action-description">{option.description}</span> : null}
                    {option.group ? <span class="action-group">{option.group}</span> : null}
                  </span>
                  {this.value === option.value && this.showSelectionIndicator ? <span class="indicator" aria-hidden="true">Selected</span> : null}
                </button>
              ))}
            </div>
            {this.showCancelButton ? (
              <footer class="footer" part="footer">
                <button type="button" class="cancel" part="cancel-button" onClick={() => this.hide(true)}>
                  {this.cancelText}
                </button>
              </footer>
            ) : null}
          </section>
        </div>
      </Host>
    );
  }
}
