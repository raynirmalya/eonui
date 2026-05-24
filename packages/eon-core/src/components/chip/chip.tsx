import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-chip',
  styleUrl: 'chip.scss',
  shadow: true
})
export class EonChip {
  @Prop() removable = false;

  render() {
    return (
      <Host>
        <span class="chip" part="base">
          <slot />
          {this.removable ? (
            <button type="button" part="remove-button" aria-label="Remove">
              Ã—
            </button>
          ) : null}
        </span>
      </Host>
    );
  }
}

