import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type { JarvisOrientation } from '../shared/types';

interface StepItemDefinition {
  label: string;
  icon?: string;
  hint?: string;
  optional: boolean;
  disabled: boolean;
  invalid: boolean;
  completed?: boolean;
}

function parseStepOptions(value: string): string[] {
  const delimiter = value.includes(';') ? ';' : ',';
  return value
    .split(delimiter)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseStepItems(value: string): StepItemDefinition[] {
  const delimiter = value.includes(';') ? ';' : ',';
  return value
    .split(delimiter)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [label, icon, hint, flags = ''] = entry.split('|').map((segment) => segment.trim());
      const normalizedFlags = flags.toLowerCase().split(/[ ,]+/).filter(Boolean);
      const optional = normalizedFlags.includes('optional') || /\(optional\)/i.test(label);

      return {
        label,
        icon: icon || undefined,
        hint: hint || undefined,
        optional,
        disabled: normalizedFlags.includes('disabled'),
        invalid: normalizedFlags.includes('invalid')
      };
    });
}

@Component({
  tag: 'jarvis-stepper',
  styleUrl: 'stepper.scss',
  shadow: true
})
export class JarvisStepper {
  @Element() host!: HTMLElement;

  @Prop() items = '';
  @Prop({ mutable: true, reflect: true }) current = 0;
  @Prop() orientation: JarvisOrientation = 'horizontal';
  @Prop() linear = false;
  @Prop() displayMode: 'auto' | 'numbers' | 'icons' | 'labels' = 'auto';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() selectOnFocus = false;
  @Prop() showConnectors = true;
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() completed = '';
  @Prop() invalidSteps = '';
  @Prop() disabledSteps = '';
  @Prop() ariaLabel = 'Stepper';

  @State() activeIndex = 0;

  @Event() jarvisStepChange: EventEmitter<{ index: number; label: string }>;

  connectedCallback() {
    this.activeIndex = this.current;
  }

  @Watch('current')
  syncCurrent(nextCurrent: number) {
    this.activeIndex = nextCurrent;
  }

  @Method()
  async next(): Promise<void> {
    const items = this.stepItems;
    for (let index = this.current + 1; index < items.length; index += 1) {
      if (this.canActivate(index, items[index])) {
        this.requestStep(index, items[index]);
        return;
      }
    }
  }

  @Method()
  async previous(): Promise<void> {
    const items = this.stepItems;
    for (let index = this.current - 1; index >= 0; index -= 1) {
      if (this.canActivate(index, items[index])) {
        this.requestStep(index, items[index]);
        return;
      }
    }
  }

  private get stepItems(): StepItemDefinition[] {
    const completedValues = new Set(parseStepItems(this.completed).map((entry) => entry.label).concat(parseStepOptions(this.completed)));
    const invalidValues = new Set(parseStepItems(this.invalidSteps).map((entry) => entry.label).concat(parseStepOptions(this.invalidSteps)));
    const disabledValues = new Set(parseStepItems(this.disabledSteps).map((entry) => entry.label).concat(parseStepOptions(this.disabledSteps)));

    return parseStepItems(this.items).map((item, index) => ({
      ...item,
      completed: completedValues.has(String(index)) || completedValues.has(item.label),
      invalid: item.invalid || invalidValues.has(String(index)) || invalidValues.has(item.label),
      disabled: item.disabled || disabledValues.has(String(index)) || disabledValues.has(item.label)
    }));
  }

  private focusIndex(index: number) {
    const buttons = Array.from(this.host.shadowRoot?.querySelectorAll<HTMLButtonElement>('.step') ?? []);
    const safeIndex = Math.max(0, Math.min(index, buttons.length - 1));
    this.activeIndex = safeIndex;
    buttons.forEach((button, buttonIndex) => {
      button.tabIndex = buttonIndex === safeIndex ? 0 : -1;
    });
    buttons[safeIndex]?.focus();
  }

  private canActivate(index: number, item: StepItemDefinition): boolean {
    if (this.disabled) {
      return false;
    }

    if (this.readOnly) {
      return false;
    }

    if (item.disabled) {
      return false;
    }

    if (this.linear && index > this.current + 1) {
      return false;
    }

    return true;
  }

  private requestStep(index: number, item: StepItemDefinition) {
    if (!this.canActivate(index, item)) {
      return;
    }

    this.current = index;
    this.activeIndex = index;
    this.jarvisStepChange.emit({ index, label: item.label });
  }

  private handleKeyDown(event: KeyboardEvent, index: number) {
    const items = this.stepItems;
    if (!items.length) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.focusIndex((index + 1) % items.length);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.focusIndex((index - 1 + items.length) % items.length);
        break;
      case 'Home':
        event.preventDefault();
        this.focusIndex(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusIndex(items.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.requestStep(index, items[index]);
        break;
      default:
        break;
    }
  }

  private getIndicatorContent(item: StepItemDefinition, index: number): string {
    const resolvedDisplayMode = this.displayMode === 'auto' ? (item.icon ? 'icons' : 'numbers') : this.displayMode;

    if (resolvedDisplayMode === 'numbers') {
      return String(index + 1);
    }

    if (resolvedDisplayMode === 'icons' && item.icon) {
      return item.icon.slice(0, 2).toUpperCase();
    }

    return item.label.charAt(0).toUpperCase();
  }

  render() {
    const items = this.stepItems;
    return (
      <Host>
        <div class={{ stepper: true, vertical: this.orientation === 'vertical' }} part="base" role="list" aria-label={this.ariaLabel}>
          {items.map((item, index) => {
            const complete = index < this.current || Boolean(item.completed);
            const active = index === this.current;
            const blocked = !this.canActivate(index, item);

            return (
              <button
                type="button"
                class={{
                  step: true,
                  [this.size]: true,
                  active,
                  complete,
                  blocked,
                  invalid: item.invalid,
                  optional: item.optional
                }}
                part="step"
                tabIndex={index === this.activeIndex ? 0 : -1}
                aria-current={active ? 'step' : undefined}
                aria-disabled={blocked ? 'true' : undefined}
                onClick={() => this.requestStep(index, item)}
                onFocus={() => {
                  this.activeIndex = index;
                  if (this.selectOnFocus) {
                    this.requestStep(index, item);
                  }
                }}
                onKeyDown={(event) => this.handleKeyDown(event, index)}
              >
                <span class="indicator" part="indicator">
                  {this.getIndicatorContent(item, index)}
                </span>
                <span class="content">
                  <span class="label" part="label">{item.label}</span>
                  {item.hint || item.optional ? <span class="hint">{item.hint ?? 'Optional'}</span> : null}
                </span>
                {this.showConnectors && index < items.length - 1 ? <span class="connector" part="connector" aria-hidden="true"></span> : null}
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
