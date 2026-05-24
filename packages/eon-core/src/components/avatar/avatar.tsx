import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-avatar',
  styleUrl: 'avatar.scss',
  shadow: true
})
export class EonAvatar {
  @Prop() name = '';
  @Prop() src = '';
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  private getInitials(): string {
    return this.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  render() {
    return (
      <Host>
        <div class={`avatar ${this.size}`} part="base" role="img" aria-label={this.name || 'Avatar'}>
          {this.src ? <img src={this.src} alt="" part="image" /> : <span part="fallback">{this.getInitials() || '?'}</span>}
        </div>
      </Host>
    );
  }
}

