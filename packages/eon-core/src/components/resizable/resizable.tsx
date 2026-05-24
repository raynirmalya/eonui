import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { clamp } from '@eonui/utils';

function parseHandles(value: string): string[] {
  return value
    .split(/[,\s]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

@Component({
  tag: 'eon-resizable',
  styleUrl: 'resizable.scss',
  shadow: true
})
export class EonResizable {
  @Prop() width = 420;
  @Prop() height = 260;
  @Prop() minWidth = 240;
  @Prop() maxWidth = 960;
  @Prop() minHeight = 160;
  @Prop() maxHeight = 720;
  @Prop() handles = 'right bottom';
  @Prop() keepAspectRatio = false;
  @Prop() disabled = false;
  @Prop() step = 8;
  @Prop() resizeAxis: 'both' | 'horizontal' | 'vertical' = 'both';
  @Prop() showSizeLabel = false;
  @Prop() ariaLabel = 'Resizable surface';

  @State() currentWidth = 420;
  @State() currentHeight = 260;

  @Event() eonResize: EventEmitter<{ width: number; height: number }>;

  private activeHandle = '';
  private startX = 0;
  private startY = 0;
  private startWidth = 420;
  private startHeight = 260;

  componentWillLoad() {
    this.syncSize();
  }

  disconnectedCallback() {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
  }

  @Watch('width')
  @Watch('height')
  syncSize() {
    this.currentWidth = Number(this.width);
    this.currentHeight = Number(this.height);
  }

  private onPointerDown(handle: string, event: PointerEvent): void {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    this.activeHandle = handle;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = this.currentWidth;
    this.startHeight = this.currentHeight;
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.activeHandle) {
      return;
    }

    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;
    let nextWidth = this.startWidth;
    let nextHeight = this.startHeight;

    if (this.resizeAxis !== 'vertical' && this.activeHandle.includes('right')) {
      nextWidth = this.startWidth + deltaX;
    }

    if (this.resizeAxis !== 'vertical' && this.activeHandle.includes('left')) {
      nextWidth = this.startWidth - deltaX;
    }

    if (this.resizeAxis !== 'horizontal' && this.activeHandle.includes('bottom')) {
      nextHeight = this.startHeight + deltaY;
    }

    if (this.resizeAxis !== 'horizontal' && this.activeHandle.includes('top')) {
      nextHeight = this.startHeight - deltaY;
    }

    if (this.keepAspectRatio) {
      const ratio = this.startWidth / this.startHeight;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        nextHeight = nextWidth / ratio;
      } else {
        nextWidth = nextHeight * ratio;
      }
    }

    this.currentWidth = Math.round(clamp(nextWidth, this.minWidth, this.maxWidth) / this.step) * this.step;
    this.currentHeight = Math.round(clamp(nextHeight, this.minHeight, this.maxHeight) / this.step) * this.step;
    this.eonResize.emit({ width: this.currentWidth, height: this.currentHeight });
  };

  private onPointerUp = (): void => {
    this.activeHandle = '';
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
  };

  private onHandleKeyDown(handle: string, event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    let nextWidth = this.currentWidth;
    let nextHeight = this.currentHeight;
    const delta = this.step;

    switch (event.key) {
      case 'ArrowLeft':
        if (this.resizeAxis !== 'vertical' && (handle.includes('left') || handle.includes('right'))) {
          event.preventDefault();
          nextWidth -= delta;
        }
        break;
      case 'ArrowRight':
        if (this.resizeAxis !== 'vertical' && (handle.includes('left') || handle.includes('right'))) {
          event.preventDefault();
          nextWidth += delta;
        }
        break;
      case 'ArrowUp':
        if (this.resizeAxis !== 'horizontal' && (handle.includes('top') || handle.includes('bottom'))) {
          event.preventDefault();
          nextHeight -= delta;
        }
        break;
      case 'ArrowDown':
        if (this.resizeAxis !== 'horizontal' && (handle.includes('top') || handle.includes('bottom'))) {
          event.preventDefault();
          nextHeight += delta;
        }
        break;
      default:
        return;
    }

    this.currentWidth = clamp(nextWidth, this.minWidth, this.maxWidth);
    this.currentHeight = clamp(nextHeight, this.minHeight, this.maxHeight);
    this.eonResize.emit({ width: this.currentWidth, height: this.currentHeight });
  }

  render() {
    const handles = parseHandles(this.handles);
    return (
      <Host>
        <div
          class={{ frame: true, disabled: this.disabled }}
          part="base"
          aria-label={this.ariaLabel}
          style={{
            width: `${this.currentWidth}px`,
            height: `${this.currentHeight}px`
          }}
        >
          <div class="content" part="content">
            <slot />
          </div>
          {handles.map((handle) => (
            <button
              type="button"
              class={{ handle: true, [handle]: true }}
              part="handle"
              aria-label={`Resize from ${handle}`}
              onPointerDown={(event) => this.onPointerDown(handle, event)}
              onKeyDown={(event) => this.onHandleKeyDown(handle, event)}
            ></button>
          ))}
          {this.showSizeLabel ? <div class="size-label" part="size-label">{this.currentWidth} x {this.currentHeight}</div> : null}
        </div>
      </Host>
    );
  }
}
