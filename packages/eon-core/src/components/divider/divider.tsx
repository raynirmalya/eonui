import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-divider',
  styleUrl: 'divider.scss',
  shadow: true
})
export class EonDivider {
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  render() {
    return (
      <Host>
        <div class={`divider ${this.orientation}`} part="base" role="separator" aria-orientation={this.orientation} />
      </Host>
    );
  }
}

