import { Component, Event, EventEmitter, Fragment, Method, Prop, State, h, Host } from '@stencil/core';
import { buildPathTree, type PathOptionNode } from '../shared/helpers';

interface FileManagerItem {
  path: string;
  label: string;
  kind: 'folder' | 'file' | 'image' | 'doc' | 'archive';
  size: string;
  modified: string;
}

const defaultItems = [
  'Files|folder',
  'Files/Cities|folder',
  'Files/Contacts|folder',
  'Files/Landscapes|folder',
  'Files/Portraits|folder',
  'Files/Widescreen|folder',
  'Files/Widescreen/man-climbing-on-limestone-wall.jpg|image|34.3 KB|2026-04-07',
  'Files/Widescreen/swimmer-underwater.jpg|image|51.8 KB|2026-04-07',
  'Files/Widescreen/typing-male-hands.jpg|image|31.2 KB|2026-04-07',
  'Files/Widescreen/woman-using-laptop.jpg|image|23.8 KB|2026-04-07',
  'Files/Widescreen/woman-using-notebook.jpg|image|45.2 KB|2026-04-07',
  'Files/Landscapes/alpine-lake.jpg|image|18.6 KB|2026-04-05',
  'Files/Contacts/vendor-list.csv|doc|12.1 KB|2026-04-01',
  'Files/Portraits/creative-director.jpg|image|28.4 KB|2026-03-26'
].join(';');

function normalizePath(value: string): string {
  return value.replace(/\\/g, '/').replace(/\/+/g, '/').replace(/^\/+|\/+$/g, '');
}

function parentPath(value: string): string {
  const normalized = normalizePath(value);
  const parts = normalized.split('/');
  parts.pop();
  return parts.join('/');
}

function parseItems(value: string): FileManagerItem[] {
  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [rawPath, rawKind = 'file', rawSize = '--', rawModified = '--'] = entry.split('|').map((part) => part.trim());
      const path = normalizePath(rawPath);
      const parts = path.split('/');
      return {
        path,
        label: parts[parts.length - 1],
        kind: rawKind as FileManagerItem['kind'],
        size: rawSize,
        modified: rawModified
      };
    });
}

function iconForKind(kind: FileManagerItem['kind']): string {
  if (kind === 'folder') {
    return '[dir]';
  }
  if (kind === 'image') {
    return '[img]';
  }
  if (kind === 'doc') {
    return '[doc]';
  }
  if (kind === 'archive') {
    return '[zip]';
  }
  return '[file]';
}

function findNode(nodes: PathOptionNode[], value: string): PathOptionNode | undefined {
  for (const node of nodes) {
    if (node.value === value) {
      return node;
    }
    const nested = findNode(node.children, value);
    if (nested) {
      return nested;
    }
  }
  return undefined;
}

@Component({
  tag: 'eon-file-manager',
  styleUrl: 'file-manager.scss',
  shadow: true
})
export class EonFileManager {
  @Prop() heading = 'Files';
  @Prop() items = defaultItems;
  @Prop({ mutable: true }) currentPath = 'Files/Widescreen';
  @Prop() showSearch = true;
  @Prop() searchPlaceholder = 'Search files';
  @Prop() showPreview = true;
  @Prop() selectionMode: 'single' | 'multiple' = 'single';
  @Prop() allowCreate = true;
  @Prop() allowUpload = true;
  @Prop() allowDownload = true;
  @Prop() allowRename = true;
  @Prop() allowDelete = true;

  @State() selectedItem = 'Files/Widescreen/man-climbing-on-limestone-wall.jpg';
  @State() selectedItems = 'Files/Widescreen/man-climbing-on-limestone-wall.jpg';
  @State() viewMode: 'details' | 'grid' = 'details';
  @State() expandedPaths = 'Files,Files/Widescreen';
  @State() searchQuery = '';
  @State() pendingAction: '' | 'create-directory' | 'upload' | 'rename' | 'delete' = '';
  @State() draftName = '';

  @Event() eonSelect: EventEmitter<{ path: string; kind: string }>;
  @Event() eonPathChange: EventEmitter<{ path: string }>;
  @Event() eonAction: EventEmitter<{ action: string; path?: string; paths?: string[]; query?: string }>;

  @Method()
  async openPath(path: string): Promise<void> {
    const nextPath = normalizePath(path);
    this.currentPath = nextPath;
    this.ensureExpanded(nextPath);
    this.eonPathChange.emit({ path: nextPath });
  }

  @Method()
  async refresh(): Promise<void> {
    this.selectedItem = this.currentRows[0]?.path ?? this.selectedItem;
  }

  @Method()
  async clearSelection(): Promise<void> {
    this.selectedItems = '';
    this.selectedItem = '';
  }

  private get entries(): FileManagerItem[] {
    return parseItems(this.items);
  }

  private get folderTree(): PathOptionNode[] {
    const folders = this.entries.filter((item) => item.kind === 'folder').map((item) => item.path).join(';');
    return buildPathTree(folders);
  }

  private get expandedSet(): Set<string> {
    return new Set(this.expandedPaths.split(',').map((value) => value.trim()).filter(Boolean));
  }

  private get selectedSet(): Set<string> {
    return new Set(this.selectedItems.split(',').map((value) => value.trim()).filter(Boolean));
  }

  private get selectedCount(): number {
    return this.selectedSet.size;
  }

  private get currentRows(): FileManagerItem[] {
    return this.entries.filter((item) => {
      if (parentPath(item.path) !== this.currentPath) {
        return false;
      }
      if (!this.searchQuery.trim()) {
        return true;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return item.label.toLowerCase().includes(query) || item.path.toLowerCase().includes(query);
    });
  }

  private get breadcrumbSegments(): Array<{ label: string; value: string }> {
    const parts = normalizePath(this.currentPath).split('/');
    return parts.map((part, index) => ({
      label: part,
      value: parts.slice(0, index + 1).join('/')
    }));
  }

  private get activeSelection(): FileManagerItem | undefined {
    const fallbackPath = this.selectedItem || [...this.selectedSet][0];
    return this.entries.find((item) => item.path === fallbackPath);
  }

  private ensureExpanded(path: string) {
    const expanded = this.expandedSet;
    const parts = normalizePath(path).split('/');
    parts.forEach((_part, index) => expanded.add(parts.slice(0, index + 1).join('/')));
    this.expandedPaths = [...expanded].join(',');
  }

  private toggleExpanded(path: string) {
    const expanded = this.expandedSet;
    if (expanded.has(path)) {
      expanded.delete(path);
    } else {
      expanded.add(path);
    }
    this.expandedPaths = [...expanded].join(',');
  }

  private setSelection(path: string, kind: string, checked = true) {
    if (this.selectionMode === 'single') {
      this.selectedItems = checked ? path : '';
      this.selectedItem = checked ? path : '';
      if (checked) {
        this.eonSelect.emit({ path, kind });
      }
      return;
    }

    const selected = this.selectedSet;
    if (checked) {
      selected.add(path);
      this.selectedItem = path;
      this.eonSelect.emit({ path, kind });
    } else {
      selected.delete(path);
      if (this.selectedItem === path) {
        this.selectedItem = [...selected][0] ?? '';
      }
    }
    this.selectedItems = [...selected].join(',');
  }

  private runAction(action: string, path?: string) {
    this.eonAction.emit({
      action,
      path,
      paths: [...this.selectedSet],
      query: this.searchQuery || undefined
    });
  }

  private openAction(action: '' | 'create-directory' | 'upload' | 'rename' | 'delete') {
    this.pendingAction = action;
    if (!action) {
      this.draftName = '';
      return;
    }

    if (action === 'rename' && this.activeSelection) {
      this.draftName = this.activeSelection.label;
      return;
    }

    this.draftName = '';
  }

  private applyAction() {
    const active = this.activeSelection;
    const targetPath = active?.path ?? this.currentPath;
    this.eonAction.emit({
      action: this.pendingAction,
      path: targetPath,
      paths: [...this.selectedSet],
      query: this.draftName || this.searchQuery || undefined
    });
    this.openAction('');
  }

  private renderTree(nodes: PathOptionNode[]) {
    return (
      <ul class="tree">
        {nodes.map((node) => {
          const open = this.expandedSet.has(node.value);
          const active = this.currentPath === node.value;
          return (
            <li>
              <button
                type="button"
                class={{ node: true, active }}
                onClick={() => {
                  this.currentPath = node.value;
                  this.ensureExpanded(node.value);
                  this.eonPathChange.emit({ path: node.value });
                }}
              >
                <span
                  class="toggle"
                  onClick={(event) => {
                    event.stopPropagation();
                    this.toggleExpanded(node.value);
                  }}
                >
                  {node.children.length ? (open ? 'v' : '>') : ' '}
                </span>
                <span>{node.label}</span>
              </button>
              {open && node.children.length ? this.renderTree(node.children) : null}
            </li>
          );
        })}
      </ul>
    );
  }

  private renderTable() {
    return (
      <table part="table">
        <thead>
          <tr>
            <th scope="col">Selection</th>
            <th scope="col">Name</th>
            <th scope="col">Date modified</th>
            <th scope="col">File size</th>
          </tr>
        </thead>
        <tbody>
          {this.currentRows.map((row) => (
            <tr class={{ active: this.selectedSet.has(row.path) }}>
              <td>
                <input
                  type={this.selectionMode === 'multiple' ? 'checkbox' : 'radio'}
                  checked={this.selectedSet.has(row.path)}
                  name="eon-file-manager-selection"
                  aria-label={`Select ${row.label}`}
                  onInput={(event) => this.setSelection(row.path, row.kind, (event.target as HTMLInputElement).checked)}
                />
              </td>
              <td>
                <button
                  type="button"
                  class="row-link"
                  onClick={() => {
                    if (row.kind === 'folder') {
                      this.currentPath = row.path;
                      this.ensureExpanded(row.path);
                      this.eonPathChange.emit({ path: row.path });
                    } else {
                      this.setSelection(row.path, row.kind, true);
                    }
                  }}
                >
                  <span class="icon">{iconForKind(row.kind)}</span>
                  <span>{row.label}</span>
                </button>
              </td>
              <td>{row.modified}</td>
              <td>{row.kind === 'folder' ? '--' : row.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  private renderCards() {
    return (
      <div class="cards" part="cards">
        {this.currentRows.map((row) => (
          <button
            type="button"
            class={{ card: true, active: this.selectedSet.has(row.path) }}
            onClick={() => {
              if (row.kind === 'folder') {
                this.currentPath = row.path;
                this.ensureExpanded(row.path);
                this.eonPathChange.emit({ path: row.path });
              } else {
                this.setSelection(row.path, row.kind, true);
              }
            }}
          >
            <div class="thumb">{iconForKind(row.kind)}</div>
            <strong>{row.label}</strong>
            <span>{row.kind === 'folder' ? 'Folder' : row.size}</span>
          </button>
        ))}
      </div>
    );
  }

  private renderPreview() {
    if (!this.showPreview) {
      return null;
    }

    const active = this.activeSelection;
    if (!active) {
      return (
        <div class="preview empty" part="preview">
          <strong>No selection</strong>
          <span>Select a file or folder to inspect details.</span>
        </div>
      );
    }

    return (
      <div class="preview" part="preview">
        <div class="preview-card">
          <span class="preview-kind">{iconForKind(active.kind)}</span>
          <strong>{active.label}</strong>
          <span>{active.kind === 'folder' ? 'Folder' : active.size}</span>
          <span>Updated {active.modified}</span>
        </div>
        <dl class="meta">
          <div>
            <dt>Path</dt>
            <dd>{active.path}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{active.kind}</dd>
          </div>
          <div>
            <dt>Selection</dt>
            <dd>{this.selectedCount} item{this.selectedCount === 1 ? '' : 's'}</dd>
          </div>
        </dl>
      </div>
    );
  }

  private renderActionPanel() {
    if (!this.pendingAction) {
      return null;
    }

    const labels: Record<NonNullable<typeof this.pendingAction>, { title: string; description: string; confirm: string }> = {
      'create-directory': {
        title: 'Create a new directory',
        description: `Add a new folder inside ${this.currentPath}.`,
        confirm: 'Create'
      },
      upload: {
        title: 'Queue an upload',
        description: `Use a filename or bundle label for items uploaded to ${this.currentPath}.`,
        confirm: 'Queue upload'
      },
      rename: {
        title: 'Rename selection',
        description: `Update the selected item label without losing its current location.`,
        confirm: 'Rename'
      },
      delete: {
        title: 'Delete selection',
        description: 'Confirm before removing the selected items from the current workspace view.',
        confirm: 'Delete'
      }
    };

    const content = labels[this.pendingAction];

    return (
      <div class="action-panel" part="action-panel">
        <div class="action-copy">
          <strong>{content.title}</strong>
          <span>{content.description}</span>
        </div>
        {this.pendingAction !== 'delete' ? (
          <label class="action-field">
            <span class="sr-only">Action label</span>
            <input
              type="text"
              value={this.draftName}
              placeholder={this.pendingAction === 'upload' ? 'launch-asset-bundle.zip' : 'New folder'}
              onInput={(event) => (this.draftName = (event.target as HTMLInputElement).value)}
            />
          </label>
        ) : (
          <div class="action-summary">
            <span>{this.selectedCount || 1} item{(this.selectedCount || 1) === 1 ? '' : 's'} selected</span>
            <span>{this.activeSelection?.label ?? this.currentPath}</span>
          </div>
        )}
        <div class="action-buttons">
          <button type="button" onClick={() => this.openAction('')}>Cancel</button>
          <button type="button" class="confirm" onClick={() => this.applyAction()}>{content.confirm}</button>
        </div>
      </div>
    );
  }

  render() {
    const selected = this.activeSelection;
    const currentFolder = findNode(this.folderTree, this.currentPath);

    return (
      <Host>
        <div class="manager" part="base">
          <header class="toolbar" part="toolbar">
            <div class="toolbar-group">
              {this.allowCreate ? <button type="button" onClick={() => this.openAction('create-directory')}>New directory</button> : null}
              {this.allowUpload ? <button type="button" onClick={() => this.openAction('upload')}>Upload files</button> : null}
              {this.showSearch ? (
                <label class="search-field">
                  <span class="sr-only">Search files</span>
                  <input
                    type="search"
                    value={this.searchQuery}
                    placeholder={this.searchPlaceholder}
                    onInput={(event) => {
                      this.searchQuery = (event.target as HTMLInputElement).value;
                      this.runAction('search', this.currentPath);
                    }}
                  />
                </label>
              ) : null}
            </div>
            <div class="toolbar-group">
              <button type="button" class={{ selected: this.viewMode === 'details' }} onClick={() => (this.viewMode = 'details')}>
                Details
              </button>
              <button type="button" class={{ selected: this.viewMode === 'grid' }} onClick={() => (this.viewMode = 'grid')}>
                Grid
              </button>
              <button type="button" onClick={() => this.refresh()}>
                Refresh
              </button>
              {this.allowRename && this.selectedCount ? <button type="button" onClick={() => this.openAction('rename')}>Rename</button> : null}
              {this.allowDelete && this.selectedCount ? <button type="button" onClick={() => this.openAction('delete')}>Delete</button> : null}
            </div>
          </header>

          <div class="layout">
            <div class="sidebar" part="sidebar">
              <div class="sidebar-heading">{this.heading}</div>
              {this.renderTree(this.folderTree)}
            </div>

            <section class="content" part="content">
              {this.renderActionPanel()}
              <div class="content-head">
                <nav class="breadcrumbs" aria-label="Breadcrumb">
                  {this.breadcrumbSegments.map((segment, index) => (
                    <Fragment>
                      {index ? <span class="crumb-separator">/</span> : null}
                      <button type="button" onClick={() => this.openPath(segment.value)}>
                        {segment.label}
                      </button>
                    </Fragment>
                  ))}
                </nav>
                <div class="content-actions">
                  {this.allowDownload && selected && selected.kind !== 'folder' ? <button type="button" onClick={() => this.runAction('download', selected.path)}>Download</button> : null}
                  <button type="button" onClick={() => this.runAction('more', this.selectedItem || this.currentPath)}>More</button>
                </div>
              </div>

              <div class="section-title">
                <strong>{currentFolder?.label ?? 'Folder'}</strong>
                <span>{this.currentRows.length} items</span>
              </div>

              <div class="content-layout">
                <div class="listing">
                  {this.currentRows.length ? (
                    this.viewMode === 'details' ? this.renderTable() : this.renderCards()
                  ) : (
                    <div class="empty-state" part="empty-state">
                      <strong>No files found</strong>
                      <span>Try a different search or switch folders.</span>
                    </div>
                  )}
                </div>
                {this.renderPreview()}
              </div>
            </section>
          </div>
        </div>
      </Host>
    );
  }
}
