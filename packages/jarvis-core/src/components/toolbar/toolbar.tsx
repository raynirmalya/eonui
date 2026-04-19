import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'jarvis-toolbar',
  styleUrl: 'toolbar.scss',
  shadow: true
})
export class JarvisToolbar {
  @Prop() density: 'comfortable' | 'compact' = 'comfortable';
  @Prop() sticky = false;
  @Prop() dividers = false;
  @Prop() ariaLabel = 'Toolbar';
  @Prop() justify: 'space-between' | 'start' | 'center' | 'end' = 'space-between';
  @Prop() wrap = true;
  @Prop() ariaDescription = '';

  render() {
    return (
      <Host>
        <div
          class={{
            toolbar: true,
            compact: this.density === 'compact',
            sticky: this.sticky,
            dividers: this.dividers,
            nowrap: !this.wrap,
            startAligned: this.justify === 'start',
            centerAligned: this.justify === 'center',
            endAligned: this.justify === 'end'
          }}
          part="base"
          role="toolbar"
          aria-label={this.ariaLabel}
          aria-description={this.ariaDescription || undefined}
        >
          <div class="start" part="start"><slot name="start" /></div>
          <div class="center" part="center"><slot /></div>
          <div class="end" part="end"><slot name="end" /></div>
        </div>
      </Host>
    );
  }
}
