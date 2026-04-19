import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { focusPart, restoreFocus, trapFocus } from '@jarvis/a11y';
import type { JarvisTone } from '../shared/types';

@Component({
  tag: 'jarvis-popup',
  styleUrl: 'popup.scss',
  shadow: true
})
export class JarvisPopup {
  @Element() host!: HTMLElement;

  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() heading = 'Popup';
  @Prop() ariaDescription = '';
  @Prop() description = '';
  @Prop() eyebrow = '';
  @Prop() status = '';
  @Prop() closeOnOutsideClick = true;
  @Prop() showCloseButton = true;
  @Prop() showOverlay = true;
  @Prop() hideOnEscape = true;
  @Prop() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop() position: 'center' | 'top' | 'bottom' = 'center';
  @Prop() width = '';
  @Prop() height = '';
  @Prop() fullScreen = false;
  @Prop() tone: JarvisTone = 'neutral';
  @Prop() showHeader = true;
  @Prop() showFooter = true;
  @Prop() stickyFooter = false;
  @Prop() showHandle = false;
  @Prop() closeLabel = 'Close popup';
  @Prop() initialFocus: 'panel' | 'close' = 'panel';
  @Prop() bodyPadding: 'comfortable' | 'none' = 'comfortable';
  @Prop() maxHeight = '';

  @State() mounted = false;

  @Event() jarvisOpen: EventEmitter<void>;
  @Event() jarvisClose: EventEmitter<{ reason: 'dismiss' | 'programmatic' }>;

  private previousFocus?: HTMLElement | null;
  private closeReason: 'dismiss' | 'programmatic' = 'programmatic';

  private hasSlot(name: string) {
    return Boolean(this.host.querySelector(`[slot="${name}"]`));
  }

  componentWillLoad() {
    this.mounted = this.open;
  }

  componentDidLoad() {
    if (this.open) {
      this.previousFocus = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => this.focusInitialTarget());
    }
  }

  @Watch('open')
  handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      this.mounted = true;
      this.jarvisOpen.emit();
      requestAnimationFrame(() => this.focusInitialTarget());
      return;
    }

    this.jarvisClose.emit({ reason: this.closeReason });
  }

  @Method()
  async show(): Promise<void> {
    this.previousFocus = document.activeElement as HTMLElement | null;
    this.closeReason = 'programmatic';
    this.open = true;
    this.mounted = true;
  }

  @Method()
  async hide(reason: 'dismiss' | 'programmatic' = 'programmatic'): Promise<void> {
    this.closeReason = reason;
    this.open = false;
    restoreFocus(this.previousFocus);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.hideOnEscape && event.key === 'Escape') {
      this.hide('dismiss');
      return;
    }
    trapFocus(event, this.host.shadowRoot ?? this.host);
  };

  private focusInitialTarget() {
    if (this.initialFocus === 'close' && this.showCloseButton) {
      focusPart(this.host, 'close');
      return;
    }

    focusPart(this.host, 'panel');
  }

  render() {
    if (!this.mounted && !this.open) {
      return <Host />;
    }

    return (
      <Host onKeyDown={this.onKeyDown}>
        <div
          class={{ overlay: true, open: this.open, [this.position]: true, 'no-backdrop': !this.showOverlay }}
          part="overlay"
          hidden={!this.open}
          aria-hidden={this.open ? 'false' : 'true'}
          onClick={() => {
            if (this.closeOnOutsideClick) {
              this.hide('dismiss');
            }
          }}
        >
          <section
            class={{
              panel: true,
              [this.size]: true,
              fullscreen: this.fullScreen,
              [this.tone]: true,
              stickyFooter: this.stickyFooter,
              bodyPaddingNone: this.bodyPadding === 'none'
            }}
            part="panel"
            role="dialog"
            aria-modal="true"
            aria-label={this.heading}
            aria-description={this.ariaDescription || this.description || undefined}
            tabindex={-1}
            style={{
              '--popup-width': this.width || undefined,
              '--popup-height': this.height || undefined,
              '--popup-max-height': this.maxHeight || undefined
            }}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          >
            {this.showHandle && this.position === 'bottom' ? <div class="handle" part="handle" aria-hidden="true"></div> : null}
            {this.showHeader ? (
              <header class="header" part="header">
                <div class="heading-block">
                  {this.eyebrow ? <span class="eyebrow">{this.eyebrow}</span> : null}
                  <div class="heading-row">
                    <strong>{this.heading}</strong>
                    {this.status ? (
                      <span class={`status ${this.tone}`} part="status">
                        {this.status}
                      </span>
                    ) : null}
                  </div>
                  {this.description ? <p class="description">{this.description}</p> : null}
                  {this.hasSlot('subtitle') ? (
                    <div class="subtitle" part="subtitle">
                      <slot name="subtitle" />
                    </div>
                  ) : null}
                </div>
                {this.showCloseButton ? (
                  <button type="button" class="close" part="close" aria-label={this.closeLabel} onClick={() => this.hide('dismiss')}>
                    x
                  </button>
                ) : null}
              </header>
            ) : null}
            <div class="body" part="body">
              <slot />
            </div>
            {this.showFooter && this.hasSlot('footer') ? (
              <footer class="footer" part="footer">
                <slot name="footer" />
              </footer>
            ) : null}
          </section>
        </div>
      </Host>
    );
  }
}
