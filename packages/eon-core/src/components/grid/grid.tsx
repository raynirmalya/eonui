import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-grid',
  styleUrl: 'grid.scss',
  shadow: true
})
export class EonGrid {
  @Prop() min = '16rem';
  @Prop() gap = '1rem';

  render() {
    return (
      <Host style={{ '--grid-min': this.min, '--grid-gap': this.gap }}>
        <div class="grid" part="base">
          <slot />
        </div>
      </Host>
    );
  }
}

