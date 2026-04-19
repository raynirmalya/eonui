import { Component, h, Host, Prop } from '@stencil/core';
import { asPercent } from '../shared/helpers';
import { JarvisTone } from '../shared/types';

@Component({
  tag: 'jarvis-progress',
  styleUrl: 'progress.scss',
  shadow: true
})
export class JarvisProgress {
  @Prop() value = 0;
  @Prop() label = '';
  @Prop() helperText = '';
  @Prop() tone: JarvisTone = 'neutral';
  @Prop() showValueLabel = false;
  @Prop() valueSuffix = '%';
  @Prop() indeterminate = false;

  render() {
    const percent = asPercent(this.value);
    const valueLabel = `${percent}${this.valueSuffix}`;

    return (
      <Host>
        <div class="progress-field">
          {this.label || this.showValueLabel ? (
            <div class="header">
              {this.label ? <span class="label">{this.label}</span> : <span></span>}
              {this.showValueLabel ? <span class="value">{this.indeterminate ? 'Loading…' : valueLabel}</span> : null}
            </div>
          ) : null}
          <div
            class={{ track: true, indeterminate: this.indeterminate, [`tone-${this.tone}`]: true }}
            part="track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={this.indeterminate ? undefined : percent}
            aria-valuetext={this.indeterminate ? 'Loading' : valueLabel}
          >
            <div class={{ indicator: true, indeterminate: this.indeterminate }} part="indicator" style={this.indeterminate ? undefined : { width: `${percent}%` }} />
          </div>
          {this.helperText ? <div class="helper">{this.helperText}</div> : null}
        </div>
      </Host>
    );
  }
}
