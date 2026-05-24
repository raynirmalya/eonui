import { Component, h, Host, Prop } from '@stencil/core';
import type { EonSize } from '../shared/types';

@Component({
  tag: 'eon-icon-button',
  styleUrl: 'icon-button.scss',
  shadow: true
})
export class EonIconButton {
  @Prop() label = 'Icon button';
  @Prop() size: EonSize = 'md';
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
