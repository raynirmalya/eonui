import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { restoreFocus } from '@jarvis/a11y';

@Component({
  tag: 'jarvis-load-panel',
  styleUrl: 'load-panel.scss',
  shadow: true
})
export class JarvisLoadPanel {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true, reflect: true }) visible = false;
  @Prop() heading = '';
  @Prop() message = 'Loading...';
  @Prop() description = '';
  @Prop() indicatorType: 'ring' | 'dots' | 'bars' = 'ring';
  @Prop() indicatorSize: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop() showIndicator = true;
  @Prop() showPane = true;
  @Prop() showOverlay = true;
  @Prop() progressValue = -1;
  @Prop() showCancelButton = false;
  @Prop() cancelLabel = 'Cancel';
  @Prop() closeOnOutsideClick = false;

  @Event() jarvisVisibilityChange: EventEmitter<{ visible: boolean }>;
  @Event() jarvisCancel: EventEmitter<void>;

  private previousFocus?: HTMLElement | null;

  @Method()
  async show(): Promise<void> {
    this.previousFocus = document.activeElement as HTMLElement | null;
    this.visible = true;
    this.jarvisVisibilityChange.emit({ visible: true });
  }

  @Method()
  async hide(): Promise<void> {
    this.visible = false;
    this.jarvisVisibilityChange.emit({ visible: false });
    restoreFocus(this.previousFocus);
  }

  private onCancel() {
    this.jarvisCancel.emit();
    this.hide();
  }

  render() {
    const showProgress = this.progressValue >= 0;
    const title = this.heading || this.message;
    const showCopy = !!(title || this.description || (this.heading && this.message));

    return (
      <Host>
        <div class="shell" part="base">
          <div class="content" part="content">
            <slot />
          </div>
          <div
            class={{
              overlay: true,
              visible: this.visible,
              transparent: !this.showOverlay
            }}
            part="overlay"
            aria-hidden={this.visible ? 'false' : 'true'}
            hidden={!this.visible}
            onClick={() => {
              if (this.closeOnOutsideClick) {
                this.hide();
              }
            }}
          >
            <div
              class={{
                pane: true,
                minimal: !this.showPane,
                roomy: !!this.description || this.showCancelButton || showProgress
              }}
              part="panel"
              role="status"
              aria-live="polite"
              onClick={(event: MouseEvent) => event.stopPropagation()}
            >
              {this.showIndicator ? (
                <div class="indicator-wrap" part="indicator">
                  <jarvis-load-indicator
                    type={this.indicatorType}
                    size={this.indicatorSize}
                    label={this.message}
                    message={!this.heading && !this.description ? this.message : ''}
                    showLabel={!this.heading && !this.description}
                    layout="stacked"
                  ></jarvis-load-indicator>
                </div>
              ) : null}
              {showCopy ? (
                <div class="copy">
                  {title ? (
                    <div class="heading" part="heading">
                      {title}
                    </div>
                  ) : null}
                  {this.heading && this.message ? (
                    <div class="message" part="message">
                      {this.message}
                    </div>
                  ) : null}
                  {this.description ? (
                    <div class="description" part="description">
                      {this.description}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {showProgress ? <jarvis-progress value={this.progressValue} label="Progress" showValueLabel part="progress"></jarvis-progress> : null}
              {this.showCancelButton ? (
                <div class="actions">
                  <button type="button" class="cancel" onClick={() => this.onCancel()}>
                    {this.cancelLabel}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
