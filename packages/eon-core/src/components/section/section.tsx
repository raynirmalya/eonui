import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-section',
  styleUrl: 'section.scss',
  shadow: true
})
export class EonSection {
  @Prop() heading = '';
  @Prop() description = '';

  render() {
    return (
      <Host>
        <section class="section" part="base">
          {(this.heading || this.description) && (
            <header class="header" part="header">
              <div>
                {this.heading ? <h2>{this.heading}</h2> : null}
                {this.description ? <p>{this.description}</p> : null}
              </div>
              <div part="actions"><slot name="actions" /></div>
            </header>
          )}
          <div part="content"><slot /></div>
        </section>
      </Host>
    );
  }
}

