import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-stack',
  styleUrl: 'stack.scss',
  shadow: true
})
export class EonStack {
  @Prop() gap = '1rem';
  @Prop() align: 'stretch' | 'start' | 'center' | 'end' = 'stretch';

  render() {
    return (
      <Host style={{ '--stack-gap': this.gap, '--stack-align': this.align }}>
        <div class="stack" part="base">
          <slot />
        </div>
      </Host>
    );
  }
}

