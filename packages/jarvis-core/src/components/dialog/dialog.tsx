import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { focusPart, restoreFocus, trapFocus } from '@jarvis/a11y';

@Component({
  tag: 'jarvis-dialog',
  styleUrl: 'dialog.scss',
  shadow: true
})
export class JarvisDialog {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() label = 'Dialog';
  @Prop() heading = '';
  @Prop() description = '';
  @Prop() closeOnOutsideClick = true;
  @Prop() showCloseButton = true;
  @Prop() showOverlay = true;
  @Prop() hideOnEscape = true;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() width = '';
  @Prop() closeLabel = 'Close dialog';
  @Prop() initialFocus: 'panel' | 'close' = 'panel';
  @State() mounted = false;

  @Event() jarvisOpen: EventEmitter<void>;
  @Event() jarvisClose: EventEmitter<{ reason: 'dismiss' | 'programmatic' }>;

  private previousFocus?: HTMLElement | null;
  private closeReason: 'dismiss' | 'programmatic' = 'programmatic';

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

  private hasSlot(name: string) {
    return Boolean(this.host.querySelector(`[slot="${name}"]`));
  }

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
          class={{ overlay: true, open: this.open, 'no-backdrop': !this.showOverlay }}
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
            class={{ panel: true, [this.size]: true }}
            part="panel"
            role="dialog"
            aria-modal="true"
            aria-label={this.label}
            aria-description={this.description || undefined}
            tabindex={-1}
            style={{ '--dialog-width': this.width || undefined }}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          >
            {(this.heading || this.description || this.showCloseButton || this.hasSlot('header')) ? (
              <header class="header" part="header">
                <div class="heading-block">
                  {this.hasSlot('header') ? (
                    <slot name="header" />
                  ) : (
                    [
                      this.heading ? <strong>{this.heading}</strong> : null,
                      this.description ? <p class="description">{this.description}</p> : null
                    ]
                  )}
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
            {this.hasSlot('footer') ? (
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
