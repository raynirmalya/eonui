import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { createOutsidePointerHandler } from '@jarvis/a11y';
import { createId } from '@jarvis/utils';

@Component({
  tag: 'jarvis-popover',
  styleUrl: 'popover.scss',
  shadow: true
})
export class JarvisPopover {
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

  @State() mounted = false;

  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;
  private panelId = createId('jarvis-popover-panel');
  private showTimer?: number;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      if (this.open && this.closeOnOutsideClick) {
        this.hide();
      }
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
    this.mounted = this.open;
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
    if (this.showTimer !== undefined) {
      window.clearTimeout(this.showTimer);
    }
  }

  @Watch('open')
  syncOpen(nextOpen: boolean) {
    if (nextOpen) {
      this.mounted = true;
      requestAnimationFrame(() => this.focusPanel());
    }
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
            style={{
              '--popover-offset': `${Math.max(this.offset, 0)}px`,
              '--popover-width': this.width || undefined
            }}
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
                    ×
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
