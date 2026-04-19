import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { focusPart, restoreFocus, trapFocus } from '@jarvis/a11y';

@Component({
  tag: 'jarvis-drawer',
  styleUrl: 'drawer.scss',
  shadow: true
})
export class JarvisDrawer {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop() side: 'left' | 'right' = 'right';
  @Prop() label = 'Drawer';
  private previousFocus?: HTMLElement | null;

  @Method()
  async show(): Promise<void> {
    this.previousFocus = document.activeElement as HTMLElement | null;
    this.open = true;
    requestAnimationFrame(() => focusPart(this.host, 'panel'));
  }

  @Method()
  async hide(): Promise<void> {
    this.open = false;
    restoreFocus(this.previousFocus);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.hide();
      return;
    }

    trapFocus(event, this.host.shadowRoot ?? this.host);
  };

  render() {
    return (
      <Host onKeyDown={this.onKeyDown}>
        <div class={{ overlay: true, open: this.open }} part="overlay" hidden={!this.open} aria-hidden={this.open ? 'false' : 'true'} onClick={() => this.hide()}>
          <aside
            class={{ drawer: true, open: this.open, left: this.side === 'left', right: this.side === 'right' }}
            part="panel"
            role="dialog"
            aria-modal="true"
            aria-label={this.label}
            tabindex={-1}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          >
            <header class="header" part="header">
              <slot name="header" />
            </header>
            <div class="body" part="body">
              <slot />
            </div>
            <footer class="footer" part="footer">
              <slot name="footer" />
            </footer>
          </aside>
        </div>
      </Host>
    );
  }
}
