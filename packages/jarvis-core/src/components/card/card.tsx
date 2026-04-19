import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'jarvis-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class JarvisCard {
  render() {
    return (
      <Host>
        <article class="card" part="base">
          <header part="header"><slot name="header" /></header>
          <div part="body"><slot /></div>
          <footer part="footer"><slot name="footer" /></footer>
        </article>
      </Host>
    );
  }
}

