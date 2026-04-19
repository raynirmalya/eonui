import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'jarvis-divider',
  styleUrl: 'divider.scss',
  shadow: true
})
export class JarvisDivider {
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  render() {
    return (
      <Host>
        <div class={`divider ${this.orientation}`} part="base" role="separator" aria-orientation={this.orientation} />
      </Host>
    );
  }
}

