import { Component, h, Host, Prop } from '@stencil/core';
import type { JarvisTone } from '../shared/types';

@Component({
  tag: 'jarvis-badge',
  styleUrl: 'badge.scss',
  shadow: true
})
export class JarvisBadge {
  @Prop() tone: JarvisTone = 'neutral';

  render() {
    return (
      <Host>
        <span class={`badge ${this.tone}`} part="base">
          <slot />
        </span>
      </Host>
    );
  }
}

