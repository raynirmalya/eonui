import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'jarvis-scroll-view',
  styleUrl: 'scroll-view.scss',
  shadow: true
})
export class JarvisScrollView {
  @Element() host!: HTMLElement;
  @Prop() height = '18rem';
  @Prop() direction: 'vertical' | 'horizontal' | 'both' = 'vertical';
  @Prop() showScrollbar: 'always' | 'on-hover' | 'on-scroll' | 'never' = 'on-scroll';
  @Prop() scrollByContent = true;
  @Prop() scrollByThumb = true;
  @Prop() reachOffset = 32;
  @Prop() showShadows = true;
  @Prop() topStatusText = 'Scroll for more';
  @Prop() bottomStatusText = 'Reached the end of the content';
  @Prop() showRefreshButton = false;
  @Prop() refreshLabel = 'Refresh';
  @Prop() refreshing = false;

  @State() reachedBottom = false;
  @State() reachedTop = true;

  @Event() jarvisScroll: EventEmitter<{ top: number; left: number }>;
  @Event() jarvisReachBottom: EventEmitter<void>;
  @Event() jarvisReachTop: EventEmitter<void>;
  @Event() jarvisRefresh: EventEmitter<void>;

  private viewport?: HTMLDivElement;

  @Method()
  async scrollToTop(): Promise<void> {
    this.viewport?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @Method()
  async scrollToBottom(): Promise<void> {
    if (!this.viewport) {
      return;
    }

    this.viewport.scrollTo({
      top: this.viewport.scrollHeight,
      behavior: 'smooth'
    });
  }

  @Method()
  async scrollToPosition(top: number, left = 0): Promise<void> {
    this.viewport?.scrollTo({ top, left, behavior: 'smooth' });
  }

  @Method()
  async refresh(): Promise<void> {
    this.jarvisRefresh.emit();
  }

  private onScroll = (): void => {
    if (!this.viewport) {
      return;
    }

    const top = this.viewport.scrollTop;
    const left = this.viewport.scrollLeft;
    this.jarvisScroll.emit({ top, left });

    if (top <= this.reachOffset && !this.reachedTop) {
      this.reachedTop = true;
      this.jarvisReachTop.emit();
    }
    if (top > this.reachOffset) {
      this.reachedTop = false;
    }

    const remaining = this.viewport.scrollHeight - this.viewport.clientHeight - top;
    if (remaining <= this.reachOffset && !this.reachedBottom) {
      this.reachedBottom = true;
      this.jarvisReachBottom.emit();
    }

    if (remaining > this.reachOffset) {
      this.reachedBottom = false;
    }
  };

  render() {
    return (
      <Host>
        <div class="frame" part="base" style={{ height: this.height }}>
          {this.showShadows ? <div class={{ edge: true, top: true, visible: !this.reachedTop }} aria-hidden="true"></div> : null}
          <div
            class={{
              viewport: true,
              [this.direction]: true,
              'show-always': this.showScrollbar === 'always',
              'show-hover': this.showScrollbar === 'on-hover',
              'show-scroll': this.showScrollbar === 'on-scroll',
              'show-never': this.showScrollbar === 'never',
              'content-scroll': this.scrollByContent,
              'thumb-scroll': this.scrollByThumb
            }}
            part="viewport"
            ref={(element) => (this.viewport = element as HTMLDivElement)}
            onScroll={this.onScroll}
          >
            <div class={{ content: true, [this.direction]: true }} part="content">
              <slot />
            </div>
          </div>
          {this.showShadows ? <div class={{ edge: true, bottom: true, visible: !this.reachedBottom }} aria-hidden="true"></div> : null}
          <div class="status-row" part="status">
            <div class="status-copy">
              <span>{this.reachedTop ? this.topStatusText : 'Scrolling'}</span>
              <span>{this.reachedBottom ? this.bottomStatusText : 'More content below'}</span>
            </div>
            {this.showRefreshButton ? (
              <button type="button" class="refresh-button" part="refresh-button" disabled={this.refreshing} onClick={() => this.refresh()}>
                {this.refreshing ? 'Refreshing...' : this.refreshLabel}
              </button>
            ) : null}
          </div>
        </div>
      </Host>
    );
  }
}
