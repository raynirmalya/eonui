import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler } from '@eonui/a11y';
import { clamp, createId } from '@eonui/utils';

@Component({
  tag: 'eon-popover',
  styleUrl: 'popover.scss',
  shadow: true
})
export class EonPopover {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() triggerLabel = 'Toggle popover';
  @Prop() placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  @Prop() label = 'Popover';
  @Prop() heading = '';
  @Prop() description = '';
  @Prop() triggerMode: 'click' | 'hover' = 'click';
  @Prop() closeOnOutsideClick = true;
  @Prop() showCloseButton = true;
  @Prop() showArrow = true;
  @Prop() offset = 8;
  @Prop() width = '';
  @Prop() renderInViewport = false;

  @State() mounted = false;
  @State() viewportStyle: Record<string, string | undefined> = {};

  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private panelId = createId('eon-popover-panel');
  private showTimer?: number;
  private onViewportChange = (): void => {
    if (this.open && this.renderInViewport) {
      requestAnimationFrame(() => this.syncViewportPosition());
    }
  };

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      if (this.open && this.closeOnOutsideClick) {
        this.hide();
      }
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
    window.addEventListener('resize', this.onViewportChange);
    window.addEventListener('scroll', this.onViewportChange, true);
    this.mounted = this.open;
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
    window.removeEventListener('resize', this.onViewportChange);
    window.removeEventListener('scroll', this.onViewportChange, true);
    if (this.showTimer !== undefined) {
      window.clearTimeout(this.showTimer);
    }
  }

  @Watch('open')
  syncOpen(nextOpen: boolean) {
    if (nextOpen) {
      this.mounted = true;
      requestAnimationFrame(() => {
        if (this.renderInViewport) {
          this.syncViewportPosition();
        }
        this.focusPanel();
      });
      return;
    }

    this.viewportStyle = {};
  }

  @Watch('placement')
  @Watch('offset')
  @Watch('renderInViewport')
  syncPositioning() {
    if (!this.open || !this.renderInViewport) {
      this.viewportStyle = {};
      return;
    }

    requestAnimationFrame(() => this.syncViewportPosition());
  }

  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  @Method()
  async hide(): Promise<void> {
    this.open = false;
  }

  private focusPanel() {
    this.host.shadowRoot?.querySelector<HTMLElement>('.panel')?.focus();
  }

  private scheduleOpen() {
    if (this.triggerMode !== 'hover') {
      return;
    }

    if (this.showTimer !== undefined) {
      window.clearTimeout(this.showTimer);
    }

    this.showTimer = window.setTimeout(() => {
      this.open = true;
    }, 50);
  }

  private clearScheduledOpen() {
    if (this.showTimer !== undefined) {
      window.clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
  }

  private onMouseEnter = () => {
    this.scheduleOpen();
  };

  private onMouseLeave = () => {
    if (this.triggerMode === 'hover') {
      this.clearScheduledOpen();
      this.hide();
    }
  };

  private onTriggerClick = () => {
    if (this.triggerMode === 'click') {
      this.open = !this.open;
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.hide();
    }
  };

  private syncViewportPosition() {
    if (!this.renderInViewport) {
      this.viewportStyle = {};
      return;
    }

    const trigger = this.host.shadowRoot?.querySelector<HTMLElement>('.trigger');
    const panel = this.host.shadowRoot?.querySelector<HTMLElement>('.panel');

    if (!trigger || !panel) {
      return;
    }

    const gap = Math.max(this.offset, 0);
    const triggerRect = trigger.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const maxLeft = Math.max(gap, window.innerWidth - panelRect.width - gap);
    const maxTop = Math.max(gap, window.innerHeight - panelRect.height - gap);

    let left = triggerRect.left;
    let top = triggerRect.bottom + gap;

    switch (this.placement) {
      case 'top':
        top = triggerRect.top - panelRect.height - gap;
        break;
      case 'right':
        left = triggerRect.right + gap;
        top = triggerRect.top;
        break;
      case 'left':
        left = triggerRect.left - panelRect.width - gap;
        top = triggerRect.top;
        break;
      case 'bottom':
      default:
        break;
    }

    this.viewportStyle = {
      top: `${clamp(top, gap, maxTop)}px`,
      left: `${clamp(left, gap, maxLeft)}px`,
      '--popover-offset': `${gap}px`,
      '--popover-width': this.width || undefined
    };
  }

  render() {
    const hasHeader = Boolean(this.heading || this.description || this.showCloseButton);

    return (
      <Host>
        <div class="popover" part="base" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <button
            type="button"
            class="trigger"
            part="trigger"
            aria-haspopup="dialog"
            aria-expanded={String(this.open)}
            aria-controls={this.panelId}
            onClick={this.onTriggerClick}
            onKeyDown={this.onKeyDown}
          >
            <slot name="trigger">{this.triggerLabel}</slot>
          </button>
          <div
            class={{
              panel: true,
              open: this.open,
              viewport: this.renderInViewport,
              top: this.placement === 'top',
              right: this.placement === 'right',
              bottom: this.placement === 'bottom',
              left: this.placement === 'left',
              arrow: this.showArrow
            }}
            id={this.panelId}
            part="panel"
            role="dialog"
            aria-label={this.label}
            aria-hidden={this.open ? 'false' : 'true'}
            hidden={!this.open}
            tabIndex={-1}
            style={this.renderInViewport ? this.viewportStyle : { '--popover-offset': `${Math.max(this.offset, 0)}px`, '--popover-width': this.width || undefined }}
            onKeyDown={this.onKeyDown}
          >
            {hasHeader ? (
              <header class="header" part="header">
                <div class="heading-group">
                  {this.heading ? <strong>{this.heading}</strong> : null}
                  {this.description ? <p class="description">{this.description}</p> : null}
                </div>
                {this.showCloseButton ? (
                  <button type="button" class="dismiss" part="dismiss-button" aria-label="Close popover" onClick={() => this.hide()}>
                    Ã—
                  </button>
                ) : null}
              </header>
            ) : null}
            <div class="body" part="body">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
