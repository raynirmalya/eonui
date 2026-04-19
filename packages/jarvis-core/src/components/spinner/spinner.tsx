import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'jarvis-spinner',
  styleUrl: 'spinner.scss',
  shadow: true
})
export class JarvisSpinner {
  @Prop() label = 'Loading';

  render() {
    return (
      <Host aria-label={this.label} role="status">
        <span class="spinner" part="base" />
      </Host>
    );
  }
}

