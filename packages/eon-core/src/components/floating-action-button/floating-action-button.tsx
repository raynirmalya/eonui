import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler } from '@eonui/a11y';
import { parseLabeledOptions } from '../shared/helpers';

@Component({
  tag: 'eon-floating-action-button',
  styleUrl: 'floating-action-button.scss',
  shadow: true
})
export class EonFloatingActionButton {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() label = 'Add';
  @Prop() icon = '+';
  @Prop() items = '';
  @Prop() position: 'bottom-right' | 'bottom-left' | 'inline' = 'bottom-right';
  @Prop() direction: 'up' | 'left' | 'right' = 'up';
  @Prop() disabled = false;
  @Prop() extended = false;
  @Prop() ariaDescription = '';
  @Prop() closeOnSelect = true;
  @Prop() showDescriptions = true;

  @State() focusedIndex = 0;

  @Event() eonAction: EventEmitter<{ value: string; label: string; index: number }>;
  @Event() eonToggle: EventEmitter<{ open: boolean }>;

  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      if (this.open) {
        this.setOpen(false);
      }
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
  }

  @Method()
  async show(): Promise<void> {
    if (!this.disabled) {
      this.setOpen(true);
    }
  }

  @Method()
  async hide(): Promise<void> {
    this.setOpen(false);
  }

  @Method()
  async toggle(): Promise<void> {
    if (!this.disabled) {
      this.setOpen(!this.open);
    }
  }

  @Watch('items')
  syncFocusAfterItemsChange() {
    this.focusedIndex = this.getNextEnabledIndex(0);
  }

  private setOpen(next: boolean) {
    if (this.open === next) {
      return;
    }

    this.open = next;
    if (next) {
      this.focusedIndex = this.getNextEnabledIndex(this.focusedIndex);
    }
    this.eonToggle.emit({ open: next });
  }

  private getActions() {
    return parseLabeledOptions(this.items);
  }

  private getNextEnabledIndex(startIndex: number, direction: 1 | -1 = 1): number {
    const actions = this.getActions();
    if (!actions.length) {
      return 0;
    }

    const total = actions.length;
    let index = Math.max(0, Math.min(startIndex, total - 1));

    for (let attempt = 0; attempt < total; attempt += 1) {
      const candidate = actions[index];
      if (!candidate?.disabled) {
        return index;
      }
      index = (index + direction + total) % total;
    }

    return 0;
  }

  private onMainClick() {
    const actions = this.getActions();
    if (this.disabled) {
      return;
    }

    if (!actions.length) {
      this.eonAction.emit({ value: 'primary', label: this.label, index: -1 });
      return;
    }

    this.setOpen(!this.open);
  }

  private onAction(value: string, label: string, index: number) {
    const actions = this.getActions();
    if (actions[index]?.disabled) {
      return;
    }

    this.eonAction.emit({ value, label, index });
    if (this.closeOnSelect) {
      this.setOpen(false);
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const actions = this.getActions();
    const isHorizontal = this.direction !== 'up';
    const previousKeys = isHorizontal ? ['ArrowLeft'] : ['ArrowUp'];
    const nextKeys = isHorizontal ? ['ArrowRight'] : ['ArrowDown'];

    if (!actions.length) {
      if ((event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') && !this.disabled) {
        this.setOpen(true);
        event.preventDefault();
      }
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && !this.open && !this.disabled) {
      this.setOpen(true);
      event.preventDefault();
      return;
    }

    if (event.key === 'Escape' && this.open) {
      this.setOpen(false);
      event.preventDefault();
      return;
    }

    if (!this.open) {
      return;
    }

    if (nextKeys.includes(event.key)) {
      this.focusedIndex = this.getNextEnabledIndex((this.focusedIndex + 1) % actions.length);
      event.preventDefault();
      return;
    }

    if (previousKeys.includes(event.key)) {
      this.focusedIndex = this.getNextEnabledIndex((this.focusedIndex - 1 + actions.length) % actions.length, -1);
      event.preventDefault();
      return;
    }

    if (event.key === 'Home') {
      this.focusedIndex = this.getNextEnabledIndex(0);
      event.preventDefault();
      return;
    }

    if (event.key === 'End') {
      this.focusedIndex = this.getNextEnabledIndex(actions.length - 1, -1);
      event.preventDefault();
      return;
    }
  };

  render() {
    const actions = this.getActions();
    const descriptionIds = [this.ariaDescription || undefined].filter(Boolean).join(' ') || undefined;

    return (
      <Host onKeyDown={this.onKeyDown}>
        <div class={{ shell: true, [this.position]: true }} part="base">
          {actions.length ? (
            <div
              class={{ actions: true, open: this.open, [this.direction]: true }}
              part="actions"
              role="menu"
              aria-label={`${this.label} actions`}
              aria-describedby={descriptionIds}
            >
              {actions.map((action, index) => (
                <button
                  type="button"
                  class={{ 'speed-action': true, disabled: Boolean(action.disabled), active: index === this.focusedIndex }}
                  part="action"
                  role="menuitem"
                  aria-disabled={action.disabled ? 'true' : undefined}
                  tabindex={index === this.focusedIndex && !action.disabled ? 0 : -1}
                  onClick={() => this.onAction(action.value, action.label, index)}
                >
                  <span class="action-dot" aria-hidden="true"></span>
                  <span class="action-copy">
                    <span class="action-label">{action.label}</span>
                    {this.showDescriptions && action.description ? <span class="action-description">{action.description}</span> : null}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
          <button
            type="button"
            class={{ trigger: true, extended: this.extended || this.position === 'inline' }}
            part="trigger"
            aria-expanded={actions.length ? String(this.open) : undefined}
            aria-haspopup={actions.length ? 'menu' : undefined}
            aria-label={this.label}
            aria-describedby={descriptionIds}
            disabled={this.disabled}
            onClick={() => this.onMainClick()}
          >
            <span class="icon" part="icon" aria-hidden="true">
              {this.icon}
            </span>
            {this.extended || this.position === 'inline' ? (
              <span class="label" part="label">
                {this.label}
              </span>
            ) : null}
          </button>
        </div>
      </Host>
    );
  }
}
