import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { buildPathTree, type PathOptionNode } from '../shared/helpers';

@Component({
  tag: 'jarvis-context-menu',
  styleUrl: 'context-menu.scss',
  shadow: true
})
export class JarvisContextMenu {
  @Element() host!: HTMLElement;

  @Prop() items = '';
  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop({ mutable: true, reflect: true }) value = '';
  @Prop() ariaLabel = 'Context menu';
  @Prop() showOn: 'contextmenu' | 'click' = 'contextmenu';
  @Prop() showDescriptions = true;
  @Prop() showSelectionIndicator = true;
  @Prop() closeOnOutsideClick = true;
  @Prop() closeOnSelect = true;
  @Prop() longPressDelay = 420;

  @State() left = 0;
  @State() top = 0;
  @State() openPath = '';
  @State() activePath = '';

  @Event() jarvisSelect: EventEmitter<{ value: string }>;

  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private touchTimer?: number;
  private typeaheadBuffer = '';
  private typeaheadTimer?: number;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      if (this.open && this.closeOnOutsideClick) {
        this.hide();
      }
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
    this.clearTouchTimer();
    this.clearTypeahead();
  }

  @Watch('open')
  handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      this.openPath = '';
      this.activePath = '';
      return;
    }

    const firstNodeValue = this.getFirstEnabledValue(this.nodes);
    this.activePath = firstNodeValue;
    requestAnimationFrame(() => this.focusValue(this.activePath));
  }

  @Method()
  async showAt(clientX: number, clientY: number): Promise<void> {
    const rect = this.host.getBoundingClientRect();
    this.left = clientX - rect.left;
    this.top = clientY - rect.top;
    this.open = true;
  }

  @Method()
  async hide(): Promise<void> {
    this.open = false;
  }

  @Method()
  async focusFirst(): Promise<void> {
    const firstNodeValue = this.getFirstEnabledValue(this.nodes);
    if (firstNodeValue) {
      this.activePath = firstNodeValue;
      requestAnimationFrame(() => this.focusValue(firstNodeValue));
    }
  }

  private get nodes(): PathOptionNode[] {
    return buildPathTree(this.items);
  }

  private getFirstEnabledValue(nodes: PathOptionNode[]): string {
    for (const node of nodes) {
      if (!node.disabled) {
        return node.value;
      }

      const childValue = this.getFirstEnabledValue(node.children);
      if (childValue) {
        return childValue;
      }
    }

    return '';
  }

  private clearTouchTimer() {
    if (this.touchTimer !== undefined) {
      window.clearTimeout(this.touchTimer);
      this.touchTimer = undefined;
    }
  }

  private clearTypeahead() {
    this.typeaheadBuffer = '';
    if (this.typeaheadTimer !== undefined) {
      window.clearTimeout(this.typeaheadTimer);
      this.typeaheadTimer = undefined;
    }
  }

  private queueTypeahead(character: string) {
    this.typeaheadBuffer = `${this.typeaheadBuffer}${character}`.toLowerCase();
    if (this.typeaheadTimer !== undefined) {
      window.clearTimeout(this.typeaheadTimer);
    }
    this.typeaheadTimer = window.setTimeout(() => this.clearTypeahead(), 480);
  }

  private focusNextMatchingNode(character: string) {
    const siblings = this.getSiblingNodes(this.activePath).filter((node) => !node.disabled);
    if (!siblings.length) {
      return;
    }

    this.queueTypeahead(character);
    const startIndex = Math.max(0, siblings.findIndex((node) => node.value === this.activePath));
    const ordered = [...siblings.slice(startIndex + 1), ...siblings.slice(0, startIndex + 1)];
    const match = ordered.find((node) => node.label.toLowerCase().startsWith(this.typeaheadBuffer));
    if (match) {
      this.setActivePath(match.value);
    }
  }

  private selectorValue(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  private focusValue(value: string) {
    if (!value) {
      return;
    }

    const button = this.host.shadowRoot?.querySelector<HTMLButtonElement>(`button.item-button[data-value="${this.selectorValue(value)}"]`);
    button?.focus();
  }

  private findNode(nodes: PathOptionNode[], value: string): PathOptionNode | undefined {
    for (const node of nodes) {
      if (node.value === value) {
        return node;
      }

      const childMatch = this.findNode(node.children, value);
      if (childMatch) {
        return childMatch;
      }
    }

    return undefined;
  }

  private getParentValue(value: string): string {
    const lastSlash = value.lastIndexOf('/');
    return lastSlash === -1 ? '' : value.slice(0, lastSlash);
  }

  private getBranchNodes(parentValue: string): PathOptionNode[] {
    if (!parentValue) {
      return this.nodes;
    }

    return this.findNode(this.nodes, parentValue)?.children ?? [];
  }

  private getSiblingNodes(value: string): PathOptionNode[] {
    return this.getBranchNodes(this.getParentValue(value));
  }

  private setActivePath(value: string) {
    if (!value) {
      return;
    }

    this.activePath = value;
    this.openPath = this.getParentValue(value);
    requestAnimationFrame(() => this.focusValue(value));
  }

  private isOpen(node: PathOptionNode): boolean {
    return this.openPath === node.value || this.openPath.startsWith(`${node.value}/`);
  }

  private moveActive(offset: number) {
    const siblings = this.getSiblingNodes(this.activePath).filter((node) => !node.disabled);
    if (!siblings.length) {
      return;
    }

    const currentIndex = Math.max(0, siblings.findIndex((node) => node.value === this.activePath));
    const nextIndex = (currentIndex + offset + siblings.length) % siblings.length;
    this.setActivePath(siblings[nextIndex].value);
  }

  private activate(node: PathOptionNode) {
    if (node.disabled) {
      return;
    }

    if (node.children.length) {
      this.openPath = this.isOpen(node) ? this.getParentValue(node.value) : node.value;
      this.setActivePath(this.getFirstEnabledValue(node.children) || node.value);
      return;
    }

    this.value = node.value;
    this.jarvisSelect.emit({ value: node.value });
    if (this.closeOnSelect) {
      this.hide();
    }
  }

  private onContextMenu(event: MouseEvent) {
    if (this.showOn !== 'contextmenu') {
      return;
    }

    event.preventDefault();
    this.showAt(event.clientX, event.clientY);
  }

  private onTargetClick(event: MouseEvent) {
    if (this.showOn !== 'click') {
      return;
    }

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.showAt(rect.left + rect.width / 2, rect.bottom + 8);
  }

  private onTargetKeyDown(event: KeyboardEvent) {
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
      event.preventDefault();
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.showAt(rect.left + 24, rect.top + 24);
    }
  }

  private onPointerDown(event: PointerEvent) {
    if (event.pointerType !== 'touch') {
      return;
    }

    const { clientX, clientY } = event;
    this.clearTouchTimer();
    this.touchTimer = window.setTimeout(() => {
      this.showAt(clientX, clientY);
    }, this.longPressDelay);
  }

  private onPanelKeyDown(event: KeyboardEvent) {
    const activeNode = this.findNode(this.nodes, this.activePath);
    if (!activeNode) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Home': {
        event.preventDefault();
        const first = this.getSiblingNodes(this.activePath)[0];
        if (first) {
          this.setActivePath(first.value);
        }
        break;
      }
      case 'End': {
        event.preventDefault();
        const siblings = this.getSiblingNodes(this.activePath);
        const last = siblings[siblings.length - 1];
        if (last) {
          this.setActivePath(last.value);
        }
        break;
      }
      case 'ArrowRight':
        event.preventDefault();
        if (activeNode.children.length) {
          this.openPath = activeNode.value;
          this.setActivePath(activeNode.children[0].value);
        }
        break;
      case 'ArrowLeft': {
        event.preventDefault();
        const parentValue = this.getParentValue(this.activePath);
        if (!parentValue) {
          this.hide();
          break;
        }

        this.openPath = this.getParentValue(parentValue);
        this.setActivePath(parentValue);
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.activate(activeNode);
        break;
      case 'Escape':
        event.preventDefault();
        this.hide();
        break;
      case 'Tab':
        this.hide();
        break;
      default:
        if (event.key.length === 1 && /\S/.test(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey) {
          this.focusNextMatchingNode(event.key);
        }
        break;
    }
  }

  private renderBranch(nodes: PathOptionNode[], depth = 0) {
    return (
      <div class={{ branch: true, floating: depth > 0 }} role="menu" aria-label={depth === 0 ? this.ariaLabel : undefined}>
        {nodes.map((node) => {
          const submenuOpen = this.isOpen(node);
          const selected = this.value === node.value;
          return (
            <div
              class={{ item: true, open: submenuOpen, active: node.value === this.activePath, selected, danger: node.tone === 'danger' }}
              role="none"
              onMouseEnter={() => {
                if (node.disabled) {
                  return;
                }

                this.activePath = node.value;
                this.openPath = node.children.length ? node.value : this.getParentValue(node.value);
              }}
            >
              <button
                type="button"
                class="item-button"
                part="item"
                role="menuitem"
                data-value={node.value}
                disabled={node.disabled}
                tabIndex={node.value === this.activePath ? 0 : -1}
                aria-haspopup={node.children.length ? 'menu' : undefined}
                aria-expanded={node.children.length ? String(submenuOpen) : undefined}
                aria-current={selected ? 'true' : undefined}
                aria-disabled={node.disabled ? 'true' : undefined}
                onClick={() => this.activate(node)}
                onFocus={() => {
                  if (!node.disabled) {
                    this.activePath = node.value;
                  }
                }}
              >
                <span class="item-content">
                  <span class="item-label">{node.label}</span>
                  {this.showDescriptions && node.description ? <span class="item-description">{node.description}</span> : null}
                </span>
                {selected && this.showSelectionIndicator && !node.children.length ? (
                  <span class="indicator" aria-hidden="true">
                    ✓
                  </span>
                ) : null}
                {node.children.length ? (
                  <span class="chevron" aria-hidden="true">
                    &gt;
                  </span>
                ) : null}
              </button>
              {node.children.length && submenuOpen ? this.renderBranch(node.children, depth + 1) : null}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div
          class="target"
          part="target"
          tabIndex={0}
          onContextMenu={(event: MouseEvent) => this.onContextMenu(event)}
          onClick={(event: MouseEvent) => this.onTargetClick(event)}
          onKeyDown={(event: KeyboardEvent) => this.onTargetKeyDown(event)}
          onPointerDown={(event: PointerEvent) => this.onPointerDown(event)}
          onPointerUp={() => this.clearTouchTimer()}
          onPointerCancel={() => this.clearTouchTimer()}
          onPointerLeave={() => this.clearTouchTimer()}
        >
          <slot />
        </div>
        {this.open ? (
          <div class="panel" part="panel" style={{ left: `${this.left}px`, top: `${this.top}px` }} onKeyDown={(event) => this.onPanelKeyDown(event)}>
            {this.renderBranch(this.nodes)}
          </div>
        ) : null}
      </Host>
    );
  }
}
