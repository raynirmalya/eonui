import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { createId } from '@jarvis/utils';

interface DropdownMenuItemDefinition {
  label: string;
  value: string;
  group: string;
  description: string;
  disabled: boolean;
  danger: boolean;
}

function parseDropdownMenuItems(value: string): DropdownMenuItemDefinition[] {
  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry, index) => {
      const [pathLabel = '', rawValue = '', rawFlags = '', description = ''] = entry.split('|').map((segment) => segment.trim());
      const parts = pathLabel
        .split('/')
        .map((segment) => segment.trim())
        .filter(Boolean);
      const label = parts[parts.length - 1] || `Item ${index + 1}`;
      const group = parts.length > 1 ? parts.slice(0, -1).join(' / ') : '';
      const flags = rawFlags
        .toLowerCase()
        .split(/[ ,]+/)
        .map((segment) => segment.trim())
        .filter(Boolean);

      return {
        label,
        value: rawValue || pathLabel || label,
        group,
        description,
        disabled: flags.includes('disabled'),
        danger: flags.includes('danger') || /delete|remove|archive/i.test(label)
      };
    });
}

function groupDropdownMenuItems(items: DropdownMenuItemDefinition[]): Array<{ label: string; items: DropdownMenuItemDefinition[] }> {
  const groups = new Map<string, DropdownMenuItemDefinition[]>();

  for (const item of items) {
    const key = item.group || '';
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return [...groups.entries()].map(([label, groupItems]) => ({ label, items: groupItems }));
}

@Component({
  tag: 'jarvis-dropdown-menu',
  styleUrl: 'dropdown-menu.scss',
  shadow: true
})
export class JarvisDropdownMenu {
  @Element() host!: HTMLElement;

  @Prop() label = 'Open menu';
  @Prop() items = '';
  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop({ mutable: true, reflect: true }) value = '';
  @Prop() triggerMode: 'click' | 'hover' = 'click';
  @Prop() closeOnOutsideClick = true;
  @Prop() placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';
  @Prop() noDataText = 'No actions available';
  @Prop() showSelection = false;

  @State() activeIndex = -1;

  @Event() jarvisSelect: EventEmitter<{ value: string; label: string }>;
  @Event() jarvisOpenChange: EventEmitter<{ open: boolean }>;

  private menuId = createId('jarvis-menu');
  private showTimer?: number;
  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      if (this.open && this.closeOnOutsideClick) {
        this.closeMenu();
      }
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
    this.syncActiveIndex();
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
    this.clearShowTimer();
  }

  @Watch('items')
  @Watch('value')
  syncActiveIndex() {
    const items = this.flatItems;
    if (!items.length) {
      this.activeIndex = -1;
      return;
    }

    const selectedIndex = items.findIndex((item) => item.value === this.value);
    this.activeIndex = selectedIndex === -1 ? 0 : selectedIndex;
  }

  @Method()
  async show(): Promise<void> {
    if (!this.flatItems.length) {
      return;
    }

    this.openMenu();
  }

  @Method()
  async hide(): Promise<void> {
    this.closeMenu();
  }

  private get flatItems(): DropdownMenuItemDefinition[] {
    return parseDropdownMenuItems(this.items);
  }

  private get groupedItems() {
    return groupDropdownMenuItems(this.flatItems);
  }

  private openMenu() {
    if (!this.open) {
      this.open = true;
      this.jarvisOpenChange.emit({ open: true });
    }

    requestAnimationFrame(() => this.focusItem(this.activeIndex === -1 ? 0 : this.activeIndex));
  }

  private closeMenu() {
    this.clearShowTimer();
    if (this.open) {
      this.open = false;
      this.jarvisOpenChange.emit({ open: false });
    }
  }

  private clearShowTimer() {
    if (this.showTimer !== undefined) {
      window.clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
  }

  private scheduleOpen() {
    if (this.triggerMode !== 'hover') {
      return;
    }

    this.clearShowTimer();
    this.showTimer = window.setTimeout(() => this.openMenu(), 70);
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
    const items = this.flatItems;
    if (!items.length) {
      return;
    }

    let nextIndex = this.activeIndex;
    do {
      nextIndex = (nextIndex + offset + items.length) % items.length;
    } while (items[nextIndex]?.disabled && nextIndex !== this.activeIndex);

    this.focusItem(nextIndex);
  }

  private selectItem(item: DropdownMenuItemDefinition, index: number) {
    if (item.disabled) {
      return;
    }

    this.value = item.value;
    this.activeIndex = index;
    this.jarvisSelect.emit({ value: item.value, label: item.label });
    this.closeMenu();
  }

  private onTriggerKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.openMenu();
        break;
      case 'Enter':
      case ' ':
        if (this.triggerMode === 'click') {
          event.preventDefault();
          this.open ? this.closeMenu() : this.openMenu();
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.closeMenu();
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
        this.focusItem(this.flatItems.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.activeIndex >= 0) {
          this.selectItem(this.flatItems[this.activeIndex], this.activeIndex);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.closeMenu();
        break;
      case 'Tab':
        this.closeMenu();
        break;
      default:
        break;
    }
  }

  render() {
    const items = this.flatItems;
    const groupedItems = this.groupedItems;

    return (
      <Host>
        <div
          class="menu"
          part="base"
          onMouseEnter={() => this.scheduleOpen()}
          onMouseLeave={() => {
            if (this.triggerMode === 'hover') {
              this.closeMenu();
            }
          }}
        >
          <button
            type="button"
            class="trigger"
            part="trigger"
            aria-expanded={String(this.open)}
            aria-haspopup="menu"
            aria-controls={this.menuId}
            onClick={() => (this.triggerMode === 'click' ? (this.open ? this.closeMenu() : this.openMenu()) : undefined)}
            onKeyDown={(event: KeyboardEvent) => this.onTriggerKeyDown(event)}
          >
            <span class="trigger-label">{this.label}</span>
            <span class="trigger-chevron" aria-hidden="true">
              &gt;
            </span>
          </button>
          <div
            class={{
              panel: true,
              open: this.open,
              'bottom-start': this.placement === 'bottom-start',
              'bottom-end': this.placement === 'bottom-end',
              'top-start': this.placement === 'top-start',
              'top-end': this.placement === 'top-end'
            }}
            id={this.menuId}
            part="panel"
            role="menu"
            aria-hidden={this.open ? 'false' : 'true'}
            hidden={!this.open}
            tabIndex={-1}
            onKeyDown={(event: KeyboardEvent) => this.onPanelKeyDown(event)}
          >
            {!items.length ? (
              <div class="empty" part="empty-state">
                {this.noDataText}
              </div>
            ) : (
              groupedItems.map((group) => (
                <section class="section" part="section" role="none">
                  {group.label ? (
                    <div class="section-label" part="section-label" role="presentation">
                      {group.label}
                    </div>
                  ) : null}
                  {group.items.map((item) => {
                    const itemIndex = items.findIndex((candidate) => candidate.value === item.value);
                    const selected = item.value === this.value;

                    return (
                      <button
                        type="button"
                        class={{ 'menu-item': true, active: this.activeIndex === itemIndex, selected, danger: item.danger }}
                        part="item"
                        role={this.showSelection ? 'menuitemradio' : 'menuitem'}
                        aria-checked={this.showSelection ? String(selected) : undefined}
                        aria-disabled={item.disabled ? 'true' : undefined}
                        disabled={item.disabled}
                        tabIndex={this.activeIndex === itemIndex ? 0 : -1}
                        onMouseEnter={() => (this.activeIndex = itemIndex)}
                        onClick={() => this.selectItem(item, itemIndex)}
                      >
                        <span class="item-main">
                          <span class="item-label">{item.label}</span>
                          {item.description ? <span class="item-description">{item.description}</span> : null}
                        </span>
                        {this.showSelection && selected ? (
                          <span class="item-meta" aria-hidden="true">
                            Selected
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </section>
              ))
            )}
          </div>
        </div>
      </Host>
    );
  }
}
