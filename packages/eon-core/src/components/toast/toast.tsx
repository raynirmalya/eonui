import { Component, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type { EonTone } from '../shared/types';

@Component({
  tag: 'eon-toast',
  styleUrl: 'toast.scss',
  shadow: true
})
export class EonToast {
  @Prop({ mutable: true, reflect: true }) visible = true;
  @Prop() tone: EonTone = 'neutral';
  @Prop() heading = '';
  @Prop() polite: 'polite' | 'assertive' = 'polite';
  @Prop({ reflect: true })
  position: 'inline' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' = 'inline';
  @Prop() duration = 0;
  @Prop() showCloseButton = false;
  @Prop() showIcon = true;
  @Prop() icon = '';
  @Prop() showProgressBar = false;
  @Prop() pauseOnHover = false;
  @Prop() stackIndex = 0;
  @Prop() dismissLabel = 'Close notification';
  @Prop() showTimestamp = false;
  @Prop() timestamp = '';
  @Prop({ reflect: true }) density: 'comfortable' | 'compact' = 'comfortable';

  @Event() eonShow: EventEmitter<void>;
  @Event() eonHide: EventEmitter<{ reason: 'dismiss' | 'programmatic' | 'timeout' }>;

  @State() progressDuration = 0;
  @State() progressPaused = false;
  @State() resolvedTimestamp = '';

  private hideTimer?: number;
  private remainingDuration = 0;
  private timerStartedAt = 0;
  private hideReason: 'dismiss' | 'programmatic' | 'timeout' = 'programmatic';

  componentDidLoad() {
    if (this.visible) {
      this.syncTimestamp();
      this.queueAutoHide(this.duration);
    }
  }

  disconnectedCallback() {
    this.clearTimer();
  }

  @Watch('visible')
  handleVisibleChange(nextVisible: boolean) {
    this.clearTimer();
    if (nextVisible) {
      this.syncTimestamp();
      this.eonShow.emit();
      this.queueAutoHide(this.duration);
      return;
    }

    this.progressPaused = false;
    this.progressDuration = 0;
    this.eonHide.emit({ reason: this.hideReason });
  }

  @Watch('showTimestamp')
  @Watch('timestamp')
  handleTimestampChange() {
    this.syncTimestamp();
  }

  @Method()
  async show(): Promise<void> {
    this.hideReason = 'programmatic';
    this.visible = true;
  }

  @Method()
  async hide(reason: 'dismiss' | 'programmatic' | 'timeout' = 'programmatic'): Promise<void> {
    this.hideReason = reason;
    this.visible = false;
  }

  private syncTimestamp() {
    if (!this.showTimestamp) {
      this.resolvedTimestamp = '';
      return;
    }

    this.resolvedTimestamp =
      this.timestamp ||
      new Date().toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      });
  }

  private clearTimer() {
    if (this.hideTimer !== undefined) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  private queueAutoHide(duration: number) {
    if (duration <= 0) {
      this.progressDuration = 0;
      this.progressPaused = false;
      return;
    }

    this.remainingDuration = duration;
    this.progressDuration = duration;
    this.progressPaused = false;
    this.timerStartedAt = performance.now();

    this.hideTimer = window.setTimeout(() => {
      this.hide('timeout');
    }, duration);
  }

  private pauseAutoHide() {
    if (!this.pauseOnHover || this.hideTimer === undefined) {
      return;
    }

    const elapsed = performance.now() - this.timerStartedAt;
    this.remainingDuration = Math.max(0, this.remainingDuration - elapsed);
    this.progressPaused = true;
    this.clearTimer();
  }

  private resumeAutoHide() {
    if (!this.pauseOnHover || this.hideTimer !== undefined || !this.visible || this.remainingDuration <= 0) {
      return;
    }

    this.queueAutoHide(this.remainingDuration);
  }

  private getIcon() {
    if (this.icon) {
      return this.icon;
    }

    switch (this.tone) {
      case 'success':
        return 'check';
      case 'warning':
        return '!';
      case 'danger':
        return 'x';
      default:
        return 'i';
    }
  }

  render() {
    if (!this.visible) {
      return <Host hidden />;
    }

    const liveRole = this.tone === 'danger' || this.polite === 'assertive' ? 'alert' : 'status';
    return (
      <Host style={{ '--toast-stack-index': String(this.stackIndex) }}>
        <div
          class={`toast ${this.tone} ${this.density}`}
          part="base"
          role={liveRole}
          aria-live={this.polite}
          onMouseEnter={() => this.pauseAutoHide()}
          onMouseLeave={() => this.resumeAutoHide()}
        >
          {this.showIcon ? (
            <span class="icon" part="icon" aria-hidden="true">
              {this.getIcon()}
            </span>
          ) : null}
          <div class="content" part="content">
            {this.heading || this.resolvedTimestamp ? (
              <div class="title-row">
                {this.heading ? <strong part="title">{this.heading}</strong> : null}
                {this.resolvedTimestamp ? (
                  <span class="timestamp" part="timestamp">
                    {this.resolvedTimestamp}
                  </span>
                ) : null}
              </div>
            ) : null}
            <slot />
          </div>
          <div class="actions" part="actions">
            <slot name="actions" />
            {this.showCloseButton ? (
              <button type="button" class="close" part="close-button" aria-label={this.dismissLabel} onClick={() => this.hide('dismiss')}>
                x
              </button>
            ) : null}
          </div>
          {this.showProgressBar && this.duration > 0 ? (
            <span
              class="progress-bar"
              part="progress-bar"
              aria-hidden="true"
              style={{
                animation: `eon-toast-progress ${Math.max(this.progressDuration, 1)}ms linear forwards`,
                animationPlayState: this.progressPaused ? 'paused' : 'running'
              }}
            />
          ) : null}
        </div>
      </Host>
    );
  }
}
