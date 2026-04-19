import { Component, h, Host, Prop } from '@stencil/core';
import type { JarvisSize } from '../shared/types';

@Component({
  tag: 'jarvis-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class JarvisButton {
  @Prop() variant: 'solid' | 'outline' | 'ghost' = 'solid';
  @Prop() size: JarvisSize = 'md';
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() disabled = false;
  @Prop() loading = false;

  render() {
    return (
      <Host>
        <button
          class={`button ${this.variant} ${this.size}`}
          part="base"
          type={this.type}
          disabled={this.disabled || this.loading}
          aria-busy={this.loading ? 'true' : 'false'}
        >
          <span part="prefix"><slot name="prefix" /></span>
          <span part="label">{this.loading ? 'Loading...' : <slot />}</span>
          <span part="suffix"><slot name="suffix" /></span>
        </button>
      </Host>
    );
  }
}
