import { Component, h, Host, Prop } from '@stencil/core';
import type { EonTone } from '../shared/types';

@Component({
  tag: 'eon-badge',
  styleUrl: 'badge.scss',
  shadow: true
})
export class EonBadge {
  @Prop() tone: EonTone = 'neutral';

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

