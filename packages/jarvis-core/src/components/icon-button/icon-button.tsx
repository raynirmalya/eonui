import { Component, h, Host, Prop } from '@stencil/core';
import type { JarvisSize } from '../shared/types';

@Component({
  tag: 'jarvis-icon-button',
  styleUrl: 'icon-button.scss',
  shadow: true
})
export class JarvisIconButton {
  @Prop() label = 'Icon button';
  @Prop() size: JarvisSize = 'md';
  @Prop() disabled = false;
  @Prop() loading = false;

  render() {
    return (
      <Host>
        <button class={`icon-button ${this.size}`} part="base" aria-label={this.label} disabled={this.disabled || this.loading} aria-busy={this.loading ? 'true' : 'false'}>
          <slot>{this.loading ? '...' : null}</slot>
        </button>
      </Host>
    );
  }
}
