import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'jarvis-chip',
  styleUrl: 'chip.scss',
  shadow: true
})
export class JarvisChip {
  @Prop() removable = false;

  render() {
    return (
      <Host>
        <span class="chip" part="base">
          <slot />
          {this.removable ? (
            <button type="button" part="remove-button" aria-label="Remove">
              ×
            </button>
          ) : null}
        </span>
      </Host>
    );
  }
}

