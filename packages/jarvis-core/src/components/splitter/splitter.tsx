import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { clamp } from '@jarvis/utils';
import type { JarvisOrientation } from '../shared/types';

@Component({
  tag: 'jarvis-splitter',
  styleUrl: 'splitter.scss',
  shadow: true
})
export class JarvisSplitter {
  @Element() host!: HTMLElement;
  @Prop() orientation: JarvisOrientation = 'horizontal';
  @Prop({ mutable: true, reflect: true }) position = 35;
  @Prop() min = 15;
  @Prop() max = 85;
  @Prop() step = 1;
  @Prop() keyboardResizeStep = 5;
  @Prop() collapsible = false;
  @Prop({ mutable: true, reflect: true }) collapsed = false;
  @Prop() ariaLabel = 'Splitter';
  @Prop() startLabel = 'Start pane';
  @Prop() endLabel = 'End pane';

  @Event() jarvisChange: EventEmitter<{ position: number; collapsed: boolean }>;

  private resizing = false;
  private startPointer = 0;
  private startPosition = 35;

  disconnectedCallback() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
  }

  @Method()
  async toggle(): Promise<void> {
    if (!this.collapsible) {
      return;
    }

    this.collapsed = !this.collapsed;
    this.jarvisChange.emit({ position: this.position, collapsed: this.collapsed });
  }

  private updatePosition(nextPosition: number): void {
    const stepped = Math.round(clamp(nextPosition, this.min, this.max) / this.step) * this.step;
    this.position = Math.round(stepped * 100) / 100;
    this.collapsed = false;
    this.jarvisChange.emit({ position: this.position, collapsed: this.collapsed });
  }

  private onPointerDown = (event: PointerEvent): void => {
    event.preventDefault();
    this.resizing = true;
    this.startPointer = this.orientation === 'horizontal' ? event.clientX : event.clientY;
    this.startPosition = this.position;
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.resizing) {
      return;
    }

    const rect = this.host.getBoundingClientRect();
    const size = this.orientation === 'horizontal' ? rect.width : rect.height;
    if (!size) {
      return;
    }

    const currentPointer = this.orientation === 'horizontal' ? event.clientX : event.clientY;
    const delta = currentPointer - this.startPointer;
    const nextPosition = this.startPosition + (delta / size) * 100;
    this.updatePosition(nextPosition);
  };

  private onPointerUp = (): void => {
    this.resizing = false;
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
  };

  private onDividerKeyDown = (event: KeyboardEvent): void => {
    const delta = this.keyboardResizeStep;
    switch (event.key) {
      case 'ArrowLeft':
        if (this.orientation === 'horizontal') {
          event.preventDefault();
          this.updatePosition(this.position - delta);
        }
        break;
      case 'ArrowRight':
        if (this.orientation === 'horizontal') {
          event.preventDefault();
          this.updatePosition(this.position + delta);
        }
        break;
      case 'ArrowUp':
        if (this.orientation === 'vertical') {
          event.preventDefault();
          this.updatePosition(this.position - delta);
        }
        break;
      case 'ArrowDown':
        if (this.orientation === 'vertical') {
          event.preventDefault();
          this.updatePosition(this.position + delta);
        }
        break;
      case 'Home':
        event.preventDefault();
        this.updatePosition(this.min);
        break;
      case 'End':
        event.preventDefault();
        this.updatePosition(this.max);
        break;
      case 'Enter':
      case ' ':
        if (this.collapsible) {
          event.preventDefault();
          void this.toggle();
        }
        break;
      default:
        break;
    }
  };

  render() {
    const effectivePosition = this.collapsed ? 0 : this.position;
    return (
      <Host>
        <div
          class={{ splitter: true, vertical: this.orientation === 'vertical' }}
          part="base"
          style={{ '--split-position': `${effectivePosition}%` }}
        >
          <section class="pane start" part="start">
            <div class="sr-only">{this.startLabel}</div>
            <slot name="start" />
          </section>
          <div
            class="divider"
            part="divider"
            role="separator"
            tabIndex={0}
            aria-label={this.ariaLabel}
            aria-orientation={this.orientation === 'horizontal' ? 'vertical' : 'horizontal'}
            aria-valuemin={this.min}
            aria-valuemax={this.max}
            aria-valuenow={effectivePosition}
            onPointerDown={this.onPointerDown}
            onKeyDown={this.onDividerKeyDown}
          >
            <span class="grip" aria-hidden="true"></span>
            {this.collapsible ? (
              <button type="button" class="collapse" part="collapse" aria-label={this.collapsed ? 'Expand panel' : 'Collapse panel'} onClick={() => this.toggle()}>
                {this.collapsed ? '+' : '-'}
              </button>
            ) : null}
          </div>
          <section class="pane end" part="end">
            <div class="sr-only">{this.endLabel}</div>
            <slot name="end" />
          </section>
        </div>
      </Host>
    );
  }
}
