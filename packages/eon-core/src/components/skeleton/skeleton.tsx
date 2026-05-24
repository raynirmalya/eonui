import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-skeleton',
  styleUrl: 'skeleton.scss',
  shadow: true
})
export class EonSkeleton {
  @Prop() width = '100%';
  @Prop() height = '1rem';
  @Prop() radius = '0.5rem';

  render() {
    return (
      <Host>
        <span
          class="skeleton"
          part="base"
          aria-hidden="true"
          style={{ width: this.width, height: this.height, borderRadius: this.radius }}
        />
      </Host>
    );
  }
}

