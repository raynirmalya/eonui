import { Component, h, Host, Prop, State } from '@stencil/core';
import { createId } from '@eonui/utils';
import { parseOptions } from '../shared/helpers';

@Component({
  tag: 'eon-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class EonTabs {
  @Prop() labels = '';
  @State() activeIndex = 0;
  private tabsId = createId('eon-tabs');

  private onKeyDown(event: KeyboardEvent, items: string[]) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % items.length;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + items.length) % items.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.activeIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      this.activeIndex = items.length - 1;
    }
  }

  render() {
    const items = parseOptions(this.labels);
    return (
      <Host>
        <div class="list" role="tablist" part="list" onKeyDown={(event: KeyboardEvent) => this.onKeyDown(event, items)}>
          {items.map((label, index) => (
            <button
              type="button"
              role="tab"
              id={`${this.tabsId}-tab-${index}`}
              class={{ active: index === this.activeIndex }}
              aria-selected={index === this.activeIndex ? 'true' : 'false'}
              aria-controls={`${this.tabsId}-panel`}
              tabindex={index === this.activeIndex ? 0 : -1}
              part="tab"
              onClick={() => (this.activeIndex = index)}
            >
              {label}
            </button>
          ))}
        </div>
        <div class="panel" id={`${this.tabsId}-panel`} role="tabpanel" aria-labelledby={`${this.tabsId}-tab-${this.activeIndex}`} part="panel">
          <slot />
        </div>
      </Host>
    );
  }
}
