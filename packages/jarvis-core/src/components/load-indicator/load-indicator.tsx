import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'jarvis-load-indicator',
  styleUrl: 'load-indicator.scss',
  shadow: true
})
export class JarvisLoadIndicator {
  @Prop() type: 'ring' | 'dots' | 'bars' = 'ring';
  @Prop() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop() visible = true;
  @Prop() label = 'Loading';
  @Prop() message = '';
  @Prop() showLabel = false;
  @Prop() layout: 'inline' | 'stacked' = 'inline';

  private renderIndicator() {
    if (this.type === 'dots') {
      return (
        <div class={`dots ${this.size}`} aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
    }

    if (this.type === 'bars') {
      return (
        <div class={`bars ${this.size}`} aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      );
    }

    return <div class={`ring ${this.size}`} aria-hidden="true"></div>;
  }

  render() {
    const statusText = this.message || this.label;

    return (
      <Host hidden={!this.visible}>
        <div class={{ indicator: true, [this.layout]: true }} part="base" role="status" aria-live="polite" aria-label={this.label || statusText}>
          {this.renderIndicator()}
          {this.showLabel && statusText ? (
            <span class="message" part="message">
              {statusText}
            </span>
          ) : null}
        </div>
      </Host>
    );
  }
}
