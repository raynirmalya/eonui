import { Component, h, Host, Prop } from '@stencil/core';
import type { EonTone } from '../shared/types';

@Component({
  tag: 'eon-alert',
  styleUrl: 'alert.scss',
  shadow: true
})
export class EonAlert {
  @Prop() tone: EonTone = 'neutral';
  @Prop() heading = '';
  @Prop() polite: 'polite' | 'assertive' = 'polite';

  render() {
    const liveRole = this.tone === 'danger' || this.polite === 'assertive' ? 'alert' : 'status';
    return (
      <Host>
        <div class={`alert ${this.tone}`} role={liveRole} aria-live={this.polite} part="base">
          {this.heading ? <strong part="title">{this.heading}</strong> : null}
          <div part="content"><slot /></div>
        </div>
      </Host>
    );
  }
}
