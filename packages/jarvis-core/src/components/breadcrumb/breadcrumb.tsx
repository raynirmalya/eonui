import { Component, h, Host, Prop } from '@stencil/core';
import { parseOptions } from '../shared/helpers';

@Component({
  tag: 'jarvis-breadcrumb',
  styleUrl: 'breadcrumb.scss',
  shadow: true
})
export class JarvisBreadcrumb {
  @Prop() items = '';
  @Prop() separator = '/';

  render() {
    const entries = parseOptions(this.items);
    return (
      <Host>
        <nav aria-label="Breadcrumb" part="base">
          <ol class="breadcrumb">
            {entries.map((item, index) => (
              <li>
                <span part="item">{item}</span>
                {index < entries.length - 1 ? <span class="separator" part="separator">{this.separator}</span> : null}
              </li>
            ))}
          </ol>
        </nav>
      </Host>
    );
  }
}

