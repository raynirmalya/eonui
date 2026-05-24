import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { renderCheckIcon, renderChevronIcon } from '../shared/icons';
import { createOutsidePointerHandler } from '@eonui/a11y';
import { buildPathTree, type PathOptionNode } from '../shared/helpers';
import type { EonOrientation } from '../shared/types';

@Component({
  tag: 'eon-menu',
  styleUrl: 'menu.scss',
  shadow: true
})
export class EonMenu {
  @Element() host!: HTMLElement;

  @Prop() items = '';
  @Prop() orientation: EonOrientation = 'horizontal';
  @Prop() ariaLabel = 'Menu';
  @Prop() triggerMode: 'click' | 'hover' = 'click';
  @Prop() showFirstSubmenuMode?: 'click' | 'hover';
  @Prop() showDescriptions = true;
  @Prop() showSelectionIndicator = true;
  @Prop() closeOnMouseLeave = false;
  @Prop() closeOnSelect = true;
  @Prop() ariaDescription = '';
  @Prop({ mutable: true, reflect: true }) value = '';

  @State() openPath = '';
  @State() activePath = '';

  @Event() eonSelect: EventEmitter<{ value: string }>;

  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private typeaheadBuffer = '';
  private typeaheadTimer?: number;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      this.openPath = '';
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
    this.initializeActiveItem();
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
    this.clearTypeahead();
  }

  @Watch('items')
  initializeActiveItem() {
    this.syncToValue();
  }

  @Watch('value')
  syncToValue() {
    if (this.value) {
      this.activePath = this.value;
      this.openPath = this.getParentValue(this.value);
      return;
    }

    this.openPath = '';
    this.activePath = this.getFirstEnabledValue(this.nodes);
  }

  @Method()
  async expandAll(): Promise<void> {
    const firstWithChildren = this.findFirstNodeWithChildren(this.nodes);
    if (firstWithChildren) {
      this.openPath = firstWithChildren.value;
      this.activePath = firstWithChildren.value;
    }
  }

  @Method()
  async collapseAll(): Promise<void> {
    this.openPath = '';
  }

  private get nodes(): PathOptionNode[] {
    return buildPathTree(this.items);
  }

  private get submenuMode(): 'click' | 'hover' {
    return this.showFirstSubmenuMode ?? this.triggerMode;
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

  private findFirstNodeWithChildren(nodes: PathOptionNode[]): PathOptionNode | undefined {
    for (const node of nodes) {
      if (node.children.length) {
        return node;
      }

      const childMatch = this.findFirstNodeWithChildren(node.children);
      if (childMatch) {
        return childMatch;
      }
    }

    return undefined;
  }

  private selectorValue(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
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

  private focusValue(value: string) {
    if (!value) {
      return;
    }

    const trigger = this.host.shadowRoot?.querySelector<HTMLButtonElement>(`button.trigger[data-value="${this.selectorValue(value)}"]`);
    trigger?.focus();
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

  private setActivePath(value: string) {
    if (!value) {
      return;
    }

    this.activePath = value;
    requestAnimationFrame(() => this.focusValue(value));
  }

  private isOpen(node: PathOptionNode): boolean {
    return this.openPath === node.value || this.openPath.startsWith(`${node.value}/`);
  }

  private moveWithinBranch(offset: number) {
    const siblings = this.getSiblingNodes(this.activePath).filter((node) => !node.disabled);
    if (!siblings.length) {
      return;
    }

    const currentIndex = Math.max(0, siblings.findIndex((node) => node.value === this.activePath));
    const nextIndex = (currentIndex + offset + siblings.length) % siblings.length;
    this.setActivePath(siblings[nextIndex].value);
  }

  private toggleNode(node: PathOptionNode) {
    if (node.disabled) {
      return;
    }

    if (!node.children.length) {
      this.value = node.value;
      this.eonSelect.emit({ value: node.value });
      if (this.closeOnSelect) {
        this.openPath = '';
      }
      return;
    }

    this.openPath = this.isOpen(node) && this.submenuMode === 'click' ? this.getParentValue(node.value) : node.value;
    this.setActivePath(node.value);
  }

  private handleKeyDown(event: KeyboardEvent) {
    const activeNode = this.findNode(this.nodes, this.activePath);
    if (!activeNode) {
      return;
    }

    const parentValue = this.getParentValue(activeNode.value);
    const atTopLevel = !parentValue;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        if ((this.orientation === 'horizontal' && atTopLevel) || this.orientation === 'vertical') {
          if (activeNode.children.length) {
            this.openPath = activeNode.value;
            this.setActivePath(this.getFirstEnabledValue(activeNode.children));
          } else {
            this.moveWithinBranch(1);
          }
        } else {
          this.moveWithinBranch(1);
        }
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (this.orientation === 'horizontal' && atTopLevel) {
          this.moveWithinBranch(-1);
          break;
        }

        if (parentValue) {
          this.openPath = this.getParentValue(parentValue);
          this.setActivePath(parentValue);
          break;
        }

        this.moveWithinBranch(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (activeNode.children.length && (atTopLevel || this.orientation === 'vertical')) {
          this.openPath = activeNode.value;
          this.setActivePath(activeNode.children[0].value);
          break;
        }

        this.moveWithinBranch(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveWithinBranch(-1);
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
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleNode(activeNode);
        break;
      case 'Escape':
        event.preventDefault();
        if (parentValue) {
          this.openPath = this.getParentValue(parentValue);
          this.setActivePath(parentValue);
        } else {
          this.openPath = '';
        }
        break;
      case 'Tab':
        this.openPath = '';
        break;
      default:
        if (event.key.length === 1 && /\S/.test(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey) {
          this.focusNextMatchingNode(event.key);
        }
        break;
    }
  }

  private renderBranch(nodes: PathOptionNode[], depth = 0) {
    const rootHorizontal = depth === 0 && this.orientation === 'horizontal';
    return (
      <div
        class={{ branch: true, [`depth-${depth}`]: true, floating: depth > 0, horizontal: rootHorizontal }}
        part={depth === 0 ? 'base' : 'submenu'}
        role={depth === 0 && this.orientation === 'horizontal' ? 'menubar' : 'menu'}
        aria-orientation={depth === 0 ? this.orientation : 'vertical'}
      >
        {nodes.map((node) => {
          const submenuOpen = this.isOpen(node);
          const selected = this.value === node.value;
          return (
            <div
              class={{ item: true, open: submenuOpen, active: this.activePath === node.value, selected, danger: node.tone === 'danger' }}
              role="none"
              onMouseEnter={() => {
                if (node.disabled) {
                  return;
                }

                this.activePath = node.value;
                if (this.submenuMode === 'hover') {
                  this.openPath = node.children.length ? node.value : this.getParentValue(node.value);
                }
              }}
            >
              <button
                type="button"
                class="trigger"
                part="item"
                role="menuitem"
                data-value={node.value}
                disabled={node.disabled}
                tabIndex={this.activePath === node.value ? 0 : -1}
                aria-haspopup={node.children.length ? 'menu' : undefined}
                aria-expanded={node.children.length ? String(submenuOpen) : undefined}
                aria-current={selected ? 'page' : undefined}
                aria-disabled={node.disabled ? 'true' : undefined}
                onClick={() => this.toggleNode(node)}
                onFocus={() => {
                  if (!node.disabled) {
                    this.activePath = node.value;
                  }
                }}
              >
                <span class="content">
                  <span class="label">{node.label}</span>
                  {this.showDescriptions && node.description ? <span class="description">{node.description}</span> : null}
                </span>
                {selected && this.showSelectionIndicator && !node.children.length ? (
                  <span class="indicator" aria-hidden="true">
                    {renderCheckIcon()}
                  </span>
                ) : null}
                {node.children.length ? (
                  <span class="chevron" aria-hidden="true">
                    {renderChevronIcon(rootHorizontal ? 'down' : 'right')}
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
          class={{ menu: true, vertical: this.orientation === 'vertical' }}
          role="presentation"
          aria-label={this.ariaLabel}
          aria-description={this.ariaDescription || undefined}
          onKeyDown={(event) => this.handleKeyDown(event)}
          onMouseLeave={() => {
            if (this.closeOnMouseLeave) {
              this.openPath = '';
            }
          }}
        >
          {this.renderBranch(this.nodes)}
        </div>
      </Host>
    );
  }
}
