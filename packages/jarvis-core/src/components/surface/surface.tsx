import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'jarvis-surface',
  styleUrl: 'surface.scss',
  shadow: true
})
export class JarvisSurface {
  @Prop() elevated = false;

  render() {
    return (
      <Host>
        <section class={{ surface: true, elevated: this.elevated }} part="base">
          <slot />
        </section>
      </Host>
    );
  }
}

