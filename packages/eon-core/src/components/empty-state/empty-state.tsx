import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-empty-state',
  styleUrl: 'empty-state.scss',
  shadow: true
})
export class EonEmptyState {
  @Prop() heading = '';
  @Prop() description = '';

  render() {
    return (
      <Host>
        <section class="empty-state" part="base">
          <div class="visual" part="visual">
            <slot name="visual" />
          </div>
          <div class="content" part="content">
            {this.heading ? <h2 part="heading">{this.heading}</h2> : null}
            {this.description ? <p part="description">{this.description}</p> : null}
            <div class="actions" part="actions">
              <slot name="actions" />
            </div>
          </div>
        </section>
      </Host>
    );
  }
}

