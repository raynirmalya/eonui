import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { renderChevronIcon } from '../shared/icons';
import { buildPathTree, parseOptions, type PathOptionNode } from '../shared/helpers';
import type { EonSelectionMode } from '../shared/types';

type CheckboxMode = 'none' | 'normal';
type SelectionState = 'selected' | 'mixed' | 'unselected';
type EonSearchMode = 'contains' | 'startsWith' | 'equals';

function filterNodes(nodes: PathOptionNode[], query: string): PathOptionNode[] {
  if (!query) {
    return nodes;
  }

  return nodes
    .map((node) => {
      const children = filterNodes(node.children, query);
      return {
        ...node,
        children
      };
    })
    .filter((node) => node.label.toLowerCase().includes(query) || node.children.length);
}

function flattenVisibleNodes(nodes: PathOptionNode[], expandedPaths: string[]): PathOptionNode[] {
  const flattened: PathOptionNode[] = [];

  const visit = (branch: PathOptionNode[]) => {
    for (const node of branch) {
      flattened.push(node);
      if (node.children.length && expandedPaths.includes(node.value)) {
        visit(node.children);
      }
    }
  };

  visit(nodes);
  return flattened;
}

function collectExpandableValues(nodes: PathOptionNode[]): string[] {
  const values: string[] = [];

  const visit = (branch: PathOptionNode[]) => {
    for (const node of branch) {
      if (node.children.length) {
        values.push(node.value);
        visit(node.children);
      }
    }
  };

  visit(nodes);
  return values;
}

@Component({
  tag: 'eon-tree-view',
  styleUrl: 'tree-view.scss',
  shadow: true
})
export class EonTreeView {
  @Element() host!: HTMLElement;

  @Prop() items = '';
  @Prop() selectionMode: EonSelectionMode = 'single';
  @Prop() searchEnabled = false;
  @Prop() searchMode: EonSearchMode = 'contains';
  @Prop() showCheckBoxesMode: CheckboxMode = 'none';
  @Prop() selectNodesRecursive = false;
  @Prop() selectByClick = true;
  @Prop() searchPlaceholder = 'Search tree';
  @Prop() emptyStateText = 'No matching nodes.';
  @Prop() showToolbar = false;
  @Prop() showStatus = false;
  @Prop() showSelectAll = false;
  @Prop() expandAllLabel = 'Expand all';
  @Prop() collapseAllLabel = 'Collapse all';
  @Prop() selectAllText = 'Select visible';
  @Prop() clearSelectionText = 'Clear';
  @Prop() ariaLabel = 'Tree view';
  @Prop({ mutable: true }) selected = '';

  @State() expandedPaths: string[] = [];
  @State() query = '';
  @State() selectedValues: string[] = [];
  @State() activePath = '';

  @Event() eonChange: EventEmitter<{ values: string[] }>;
  @Event() eonToggle: EventEmitter<{ value: string; expanded: boolean }>;

  connectedCallback() {
    this.syncSelection();
    this.initializeTree();
  }

  @Watch('selected')
  syncSelection() {
    this.selectedValues = parseOptions(this.selected);
  }

  @Watch('items')
  initializeTree() {
    const rootNodes = this.nodes;
    this.expandedPaths = rootNodes.map((node) => node.value);
    this.activePath = rootNodes[0]?.value ?? '';
  }

  @Method()
  async expandAll(): Promise<void> {
    this.expandAllNodes();
  }

  @Method()
  async collapseAll(): Promise<void> {
    this.collapseAllNodes();
  }

  @Method()
  async selectAllVisible(): Promise<void> {
    if (this.selectionMode !== 'multiple') {
      return;
    }

    const nextValues = new Set(this.selectedValues);
    this.visibleNodes.forEach((node) => nextValues.add(node.value));
    this.emitSelection([...nextValues]);
  }

  @Method()
  async clearSelection(): Promise<void> {
    this.emitSelection([]);
  }

  @Watch('activePath')
  focusActivePath(nextPath: string) {
    if (!nextPath) {
      return;
    }

    requestAnimationFrame(() => {
      const button = this.host.shadowRoot?.querySelector<HTMLButtonElement>(`button.node-label[data-value="${this.selectorValue(nextPath)}"]`);
      button?.focus();
    });
  }

  private get nodes(): PathOptionNode[] {
    return buildPathTree(this.items);
  }

  private get filteredNodes(): PathOptionNode[] {
    const normalizedQuery = this.query.toLowerCase();
    if (!normalizedQuery) {
      return this.nodes;
    }

    if (this.searchMode === 'contains') {
      return filterNodes(this.nodes, normalizedQuery);
    }

    const matcher = (label: string) =>
      this.searchMode === 'startsWith'
        ? label.startsWith(normalizedQuery)
        : label === normalizedQuery;

    const visit = (nodes: PathOptionNode[]): PathOptionNode[] =>
      nodes
        .map((node) => ({
          ...node,
          children: visit(node.children)
        }))
        .filter((node) => matcher(node.label.toLowerCase()) || node.children.length);

    return visit(this.nodes);
  }

  private get visibleExpandedPaths(): string[] {
    return this.query ? collectExpandableValues(this.filteredNodes) : this.expandedPaths;
  }

  private get visibleNodes(): PathOptionNode[] {
    return flattenVisibleNodes(this.filteredNodes, this.visibleExpandedPaths);
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

  private getDescendantValues(node: PathOptionNode): string[] {
    return [node.value, ...node.children.flatMap((child) => this.getDescendantValues(child))];
  }

  private emitSelection(nextValues: string[]) {
    this.selectedValues = nextValues;
    this.selected = nextValues.join(',');
    this.eonChange.emit({ values: nextValues });
  }

  private toggleExpanded(value: string) {
    const expanded = !this.expandedPaths.includes(value);
    this.expandedPaths = expanded
      ? [...this.expandedPaths, value]
      : this.expandedPaths.filter((item) => item !== value);
    this.eonToggle.emit({ value, expanded });
  }

  private expandAllNodes() {
    this.expandedPaths = collectExpandableValues(this.nodes);
  }

  private collapseAllNodes() {
    this.expandedPaths = [];
  }

  private getSelectionState(node: PathOptionNode): SelectionState {
    if (this.selectionMode !== 'multiple' || !this.selectNodesRecursive) {
      return this.selectedValues.includes(node.value) ? 'selected' : 'unselected';
    }

    const descendantValues = this.getDescendantValues(node);
    const selectedCount = descendantValues.filter((value) => this.selectedValues.includes(value)).length;

    if (!selectedCount) {
      return 'unselected';
    }

    if (selectedCount === descendantValues.length) {
      return 'selected';
    }

    return 'mixed';
  }

  private updateSelection(node: PathOptionNode) {
    if (this.selectionMode === 'single') {
      this.emitSelection([node.value]);
      return;
    }

    const nextValues = new Set(this.selectedValues);
    const valuesToToggle = this.selectNodesRecursive ? this.getDescendantValues(node) : [node.value];
    const fullySelected = valuesToToggle.every((value) => nextValues.has(value));

    for (const value of valuesToToggle) {
      if (fullySelected) {
        nextValues.delete(value);
      } else {
        nextValues.add(value);
      }
    }

    this.emitSelection([...nextValues]);
  }

  private moveActive(offset: number) {
    const nodes = this.visibleNodes;
    if (!nodes.length) {
      return;
    }

    const currentIndex = Math.max(0, nodes.findIndex((node) => node.value === this.activePath));
    const nextIndex = (currentIndex + offset + nodes.length) % nodes.length;
    this.activePath = nodes[nextIndex].value;
  }

  private handleNodeKeyDown(event: KeyboardEvent, node: PathOptionNode) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (node.children.length && !this.expandedPaths.includes(node.value)) {
          this.toggleExpanded(node.value);
          break;
        }

        if (node.children.length) {
          this.activePath = node.children[0].value;
        }
        break;
      case 'ArrowLeft': {
        event.preventDefault();
        if (node.children.length && this.expandedPaths.includes(node.value)) {
          this.toggleExpanded(node.value);
          break;
        }

        const parentValue = this.getParentValue(node.value);
        if (parentValue) {
          this.activePath = parentValue;
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        const first = this.visibleNodes[0];
        if (first) {
          this.activePath = first.value;
        }
        break;
      }
      case 'End': {
        event.preventDefault();
        const nodes = this.visibleNodes;
        const last = nodes[nodes.length - 1];
        if (last) {
          this.activePath = last.value;
        }
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.updateSelection(node);
        break;
      default:
        break;
    }
  }

  private renderNode(node: PathOptionNode, depth = 0) {
    const expanded = this.visibleExpandedPaths.includes(node.value);
    const selectionState = this.getSelectionState(node);
    const showCheckboxes = this.selectionMode === 'multiple' || this.showCheckBoxesMode === 'normal';

    return (
      <li class={{ node: true, selected: selectionState === 'selected', mixed: selectionState === 'mixed' }} role="none">
        <div class="row" part="node">
          {node.children.length ? (
            <button
              type="button"
              class="toggle"
              part="toggle"
              tabIndex={-1}
              aria-label={expanded ? 'Collapse node' : 'Expand node'}
              onClick={() => this.toggleExpanded(node.value)}
            >
              {renderChevronIcon(expanded ? 'down' : 'right')}
            </button>
          ) : (
            <span class="toggle spacer" aria-hidden="true"></span>
          )}
          {showCheckboxes ? (
            <input
              type={this.selectionMode === 'single' ? 'radio' : 'checkbox'}
              tabIndex={-1}
              checked={selectionState === 'selected'}
              ref={(input) => {
                if (input && this.selectionMode === 'multiple') {
                  input.indeterminate = selectionState === 'mixed';
                }
              }}
              onInput={() => this.updateSelection(node)}
            />
          ) : null}
          <button
            type="button"
            class="node-label"
            part="label"
            role="treeitem"
            data-value={node.value}
            tabIndex={this.activePath === node.value ? 0 : -1}
            aria-expanded={node.children.length ? String(expanded) : undefined}
            aria-selected={selectionState === 'selected' ? 'true' : 'false'}
            aria-level={depth + 1}
            onKeyDown={(event) => this.handleNodeKeyDown(event, node)}
            onFocus={() => (this.activePath = node.value)}
            onClick={() => {
              if (this.selectByClick || this.selectionMode === 'single') {
                this.updateSelection(node);
              }
            }}
          >
            <span class="label-text">{node.label}</span>
          </button>
        </div>
        {node.children.length && expanded ? (
          <ul class="children" part="children" role="group">
            {node.children.map((child) => this.renderNode(child, depth + 1))}
          </ul>
        ) : null}
      </li>
    );
  }

  render() {
    const canBulkSelect = this.selectionMode === 'multiple' && this.visibleNodes.length > 0;

    return (
      <Host>
        <div class="tree" part="base">
          {this.showToolbar ? (
            <div class="toolbar" part="toolbar">
              <button type="button" class="toolbar-button" part="expand-all" onClick={() => this.expandAllNodes()}>
                {this.expandAllLabel}
              </button>
              <button type="button" class="toolbar-button" part="collapse-all" onClick={() => this.collapseAllNodes()}>
                {this.collapseAllLabel}
              </button>
              {this.showSelectAll && canBulkSelect ? (
                <button type="button" class="toolbar-button" part="select-all" onClick={() => this.selectAllVisible()}>
                  {this.selectAllText}
                </button>
              ) : null}
              {this.selectionMode === 'multiple' ? (
                <button type="button" class="toolbar-button" part="clear-selection" onClick={() => this.clearSelection()}>
                  {this.clearSelectionText}
                </button>
              ) : null}
            </div>
          ) : null}
          {this.searchEnabled ? (
            <div class="search-wrap">
              <input type="search" part="search" placeholder={this.searchPlaceholder} value={this.query} onInput={(event) => (this.query = (event.target as HTMLInputElement).value)} />
            </div>
          ) : null}
          {this.showStatus ? (
            <div class="status" part="status">
              <span>{this.visibleNodes.length} visible</span>
              <span>{this.selectedValues.length} selected</span>
            </div>
          ) : null}
          {this.filteredNodes.length ? (
            <ul class="root" role="tree" aria-label={this.ariaLabel}>
              {this.filteredNodes.map((node) => this.renderNode(node))}
            </ul>
          ) : (
            <div class="empty" part="empty">
              {this.emptyStateText}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
