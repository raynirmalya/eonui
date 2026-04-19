import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { parseOptions } from '../shared/helpers';

function createTasks(label: string): Array<{ title: string; meta: string; tone: string }> {
  return [
    { title: `${label} overview`, meta: 'Updated just now', tone: 'info' },
    { title: `${label} sync`, meta: 'Assigned to Jarvis team', tone: 'success' },
    { title: `${label} follow-up`, meta: 'Due this afternoon', tone: 'warning' },
    { title: `${label} audit`, meta: 'Waiting for approval', tone: 'neutral' }
  ];
}

@Component({
  tag: 'jarvis-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true
})
export class JarvisTabPanel {
  @Prop() items = '';
  @Prop({ mutable: true, reflect: true }) current = 0;
  @Prop() tabPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Prop() stylingMode: 'primary' | 'secondary' = 'secondary';
  @Prop() iconPosition: 'start' | 'top' = 'start';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() disabledTabs = '';
  @Prop() badges = '';
  @Prop() showTaskMeta = true;
  @Prop() showNavButtons = false;
  @Prop() loop = false;
  @Prop() fullWidth = false;
  @Prop() height = '';
  @Prop() ariaLabel = 'Tab panel';

  @Event() jarvisChange: EventEmitter<{ index: number; label: string }>;

  @Method()
  async select(index: number): Promise<void> {
    const tabs = parseOptions(this.items);
    if (index < 0 || index >= tabs.length || this.isTabDisabled(index) || this.readOnly || this.disabled) {
      return;
    }
    this.current = index;
    this.jarvisChange.emit({ index, label: tabs[index] });
  }

  @Method()
  async next(): Promise<void> {
    const tabs = parseOptions(this.items);
    if (!tabs.length) {
      return;
    }

    const nextIndex = this.current + 1;
    if (nextIndex < tabs.length) {
      await this.select(nextIndex);
      return;
    }

    if (this.loop) {
      await this.select(0);
    }
  }

  @Method()
  async previous(): Promise<void> {
    const tabs = parseOptions(this.items);
    if (!tabs.length) {
      return;
    }

    const nextIndex = this.current - 1;
    if (nextIndex >= 0) {
      await this.select(nextIndex);
      return;
    }

    if (this.loop) {
      await this.select(tabs.length - 1);
    }
  }

  private onSelect(index: number, label: string): void {
    if (this.disabled || this.readOnly || this.isTabDisabled(index)) {
      return;
    }
    this.current = index;
    this.jarvisChange.emit({ index, label });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const tabs = parseOptions(this.items);
    if (!tabs.length || this.disabled || this.readOnly) {
      return;
    }

    const horizontal = this.tabPosition === 'top' || this.tabPosition === 'bottom';

    switch (event.key) {
      case 'ArrowRight':
        if (horizontal) {
          event.preventDefault();
          void this.next();
        }
        break;
      case 'ArrowLeft':
        if (horizontal) {
          event.preventDefault();
          void this.previous();
        }
        break;
      case 'ArrowDown':
        if (!horizontal) {
          event.preventDefault();
          void this.next();
        }
        break;
      case 'ArrowUp':
        if (!horizontal) {
          event.preventDefault();
          void this.previous();
        }
        break;
      case 'Home':
        event.preventDefault();
        void this.select(0);
        break;
      case 'End':
        event.preventDefault();
        void this.select(tabs.length - 1);
        break;
      default:
        break;
    }
  }

  private get badgeItems(): string[] {
    return parseOptions(this.badges);
  }

  private get disabledTabItems(): string[] {
    return parseOptions(this.disabledTabs).map((item) => item.toLowerCase());
  }

  private isTabDisabled(index: number): boolean {
    const tabs = parseOptions(this.items);
    const label = tabs[index]?.toLowerCase();
    return this.disabledTabItems.includes(String(index)) || (!!label && this.disabledTabItems.includes(label));
  }

  render() {
    const tabs = parseOptions(this.items);
    const activeLabel = tabs[this.current] ?? tabs[0] ?? 'Overview';
    const tasks = createTasks(activeLabel);

    return (
      <Host>
        <div class={{ panel: true, [this.tabPosition]: true, fullWidth: this.fullWidth }} part="base" style={this.height ? { '--panel-height': this.height } : undefined}>
          <div
            class={{ tabs: true, [this.stylingMode]: true, [this.iconPosition]: true }}
            part="tabs"
            role="tablist"
            aria-label={this.ariaLabel}
            aria-orientation={this.tabPosition === 'left' || this.tabPosition === 'right' ? 'vertical' : 'horizontal'}
            onKeyDown={(event) => this.handleKeyDown(event)}
          >
            {tabs.map((label, index) => (
              <button
                type="button"
                class={{ tab: true, active: index === this.current, disabled: this.isTabDisabled(index) }}
                part="tab"
                role="tab"
                aria-selected={index === this.current ? 'true' : 'false'}
                aria-disabled={this.isTabDisabled(index) ? 'true' : undefined}
                disabled={this.isTabDisabled(index)}
                onClick={() => this.onSelect(index, label)}
              >
                <span class="tab-icon" aria-hidden="true">
                  {index + 1}
                </span>
                <span class="tab-label">{label}</span>
                {this.badgeItems[index] ? <span class="tab-badge">{this.badgeItems[index]}</span> : null}
              </button>
            ))}
          </div>
          <section class="body" part="body" role="tabpanel" aria-label={activeLabel}>
            <header class="body-header">
              <div>
                <strong>{activeLabel}</strong>
                <p>Use tab panels for grouped views, step progress, and task dashboards.</p>
              </div>
              {this.showNavButtons ? (
                <div class="nav-buttons" part="nav">
                  <button type="button" class="nav-button" onClick={() => void this.previous()} aria-label="Previous tab">
                    {'<'}
                  </button>
                  <button type="button" class="nav-button" onClick={() => void this.next()} aria-label="Next tab">
                    {'>'}
                  </button>
                </div>
              ) : null}
            </header>
            <div class="task-list">
              {tasks.map((task) => (
                <article class={{ task: true, [task.tone]: true }}>
                  <div class="task-line"></div>
                  <div>
                    <strong>{task.title}</strong>
                    {this.showTaskMeta ? <p>{task.meta}</p> : null}
                  </div>
                  <button type="button" class="task-more" aria-label={`More options for ${task.title}`}>
                    x
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </Host>
    );
  }
}
