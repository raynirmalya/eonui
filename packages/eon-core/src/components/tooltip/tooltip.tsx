import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { createOutsidePointerHandler } from '@eonui/a11y';
import { createId } from '@eonui/utils';

@Component({
  tag: 'eon-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true
})
export class EonTooltip {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() heading = '';
  @Prop() text = '';
  @Prop() position: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Prop() triggerMode: 'hover' | 'focus' | 'click' = 'hover';
  @Prop() showArrow = true;
  @Prop() disabled = false;
  @Prop() delay = 80;
  @Prop() hideDelay = 40;
  @Prop() maxWidth = '18rem';
  @Prop() closeOnOutsideClick = true;
  @Prop() interactive = false;

  private tooltipId = createId('eon-tooltip');
  private showTimer?: number;
  private hideTimer?: number;
  private onOutsidePointerDown = (_event: PointerEvent): void => undefined;

  connectedCallback() {
    this.onOutsidePointerDown = createOutsidePointerHandler(this.host, () => {
      if (this.open && this.closeOnOutsideClick) {
        this.hide();
      }
    });
    document.addEventListener('pointerdown', this.onOutsidePointerDown);
  }

  disconnectedCallback() {
    this.clearTimer();
    document.removeEventListener('pointerdown', this.onOutsidePointerDown);
  }

  @Method()
  async show(): Promise<void> {
    if (this.disabled || !this.hasContent) {
      return;
    }

    this.clearTimer();
    this.open = true;
  }

  @Method()
  async hide(): Promise<void> {
    this.clearTimer();
    this.open = false;
  }

  private clearTimer() {
    if (this.showTimer !== undefined) {
      window.clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }

    if (this.hideTimer !== undefined) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  private get hasCustomContent(): boolean {
    return Boolean(this.host.querySelector('[slot="content"]'));
  }

  private get hasContent(): boolean {
    return Boolean(this.heading || this.text || this.hasCustomContent);
  }

  private scheduleShow() {
    if (this.disabled || !this.hasContent) {
      return;
    }

    this.clearTimer();
    this.showTimer = window.setTimeout(() => {
      this.open = true;
    }, this.delay);
  }

  private scheduleHide() {
    this.clearTimer();
    this.hideTimer = window.setTimeout(() => {
      this.open = false;
    }, this.hideDelay);
  }

  private onMouseEnter = () => {
    if (this.triggerMode === 'hover') {
      this.scheduleShow();
    }
  };

  private onMouseLeave = () => {
    if (this.triggerMode === 'hover') {
      this.scheduleHide();
    }
  };

  private onFocusIn = () => {
    if (this.triggerMode === 'hover' || this.triggerMode === 'focus') {
      this.scheduleShow();
    }
  };

  private onFocusOut = (event: FocusEvent) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && this.host.shadowRoot?.contains(nextTarget)) {
      return;
    }

    if (this.triggerMode === 'hover' || this.triggerMode === 'focus') {
      this.scheduleHide();
    }
  };

  private onClick = () => {
    if (this.triggerMode === 'click') {
      this.clearTimer();
      this.open = !this.open;
    }
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.hide();
    }
  };

  private onContentMouseEnter = () => {
    if (this.interactive && (this.triggerMode === 'hover' || this.triggerMode === 'click')) {
      this.clearTimer();
    }
  };

  private onContentMouseLeave = () => {
    if (this.interactive && this.triggerMode === 'hover') {
      this.scheduleHide();
    }
  };

  render() {
    const hasCustomContent = this.hasCustomContent;

    return (
      <Host>
        <span
          class="trigger"
          part="trigger"
          aria-describedby={this.open && this.hasContent ? this.tooltipId : undefined}
          aria-expanded={this.triggerMode === 'click' ? String(this.open) : undefined}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onFocusin={this.onFocusIn}
          onFocusout={this.onFocusOut}
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
        >
          <slot />
          <span
            class={{ content: true, open: this.open, [this.position]: true, arrow: this.showArrow, interactive: this.interactive }}
            id={this.tooltipId}
            role="tooltip"
            aria-hidden={this.open && this.hasContent ? 'false' : 'true'}
            part="content"
            style={{ '--tooltip-max-width': this.maxWidth }}
            onMouseEnter={this.onContentMouseEnter}
            onMouseLeave={this.onContentMouseLeave}
            onKeyDown={this.onKeyDown}
          >
            {this.heading ? (
              <strong class="heading" part="heading">
                {this.heading}
              </strong>
            ) : null}
            {!hasCustomContent && this.text ? (
              <span class="body" part="body">
                {this.text}
              </span>
            ) : null}
            <slot name="content"></slot>
          </span>
        </span>
      </Host>
    );
  }
}
