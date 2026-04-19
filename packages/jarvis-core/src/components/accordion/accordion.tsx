import { Component, Element, Event, EventEmitter, Method, h, Host, Prop, State, Watch } from '@stencil/core';
import { createId } from '@jarvis/utils';

interface AccordionItemDefinition {
  summary: string;
  content: string;
  disabled: boolean;
  value: string;
}

function parseAccordionItems(value: string): AccordionItemDefinition[] {
  return value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry, index) => {
      const [summary, content = '', flags = ''] = entry.split('|').map((segment) => segment.trim());
      const normalizedFlags = flags.toLowerCase().split(/[ ,]+/).filter(Boolean);

      return {
        summary,
        content,
        disabled: normalizedFlags.includes('disabled'),
        value: summary || `item-${index + 1}`
      };
    });
}

@Component({
  tag: 'jarvis-accordion',
  styleUrl: 'accordion.scss',
  shadow: true
})
export class JarvisAccordion {
  @Element() host!: HTMLElement;

  @Prop() summary = 'Details';
  @Prop() items = '';
  @Prop({ mutable: true, reflect: true }) open = false;
  @Prop({ mutable: true, reflect: true }) value = '';
  @Prop() multiple = false;
  @Prop() collapsible = true;
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() animationDuration = 220;

  @State() openValues: string[] = [];
  @State() focusedIndex = 0;

  @Event() jarvisToggle: EventEmitter<{ value: string; open: boolean }>;
  @Event() jarvisChange: EventEmitter<{ values: string[] }>;

  private baseId = createId('jarvis-accordion');

  connectedCallback() {
    this.syncState();
  }

  @Watch('items')
  @Watch('value')
  @Watch('open')
  @Watch('multiple')
  @Watch('collapsible')
  syncState() {
    const itemDefinitions = this.itemDefinitions;

    if (!itemDefinitions.length) {
      if (!this.collapsible && !this.open) {
        this.open = true;
      }
      return;
    }

    const tokens = this.value
      .split(/[;,]+/)
      .map((token) => token.trim())
      .filter(Boolean);

    let nextOpenValues = itemDefinitions
      .filter((item) => tokens.includes(item.value))
      .map((item) => item.value);

    if (!nextOpenValues.length && !this.collapsible && itemDefinitions.length) {
      nextOpenValues = [itemDefinitions[0].value];
    }

    if (!this.multiple && nextOpenValues.length > 1) {
      nextOpenValues = [nextOpenValues[0]];
    }

    this.openValues = nextOpenValues;
    this.focusedIndex = Math.min(this.focusedIndex, Math.max(itemDefinitions.length - 1, 0));
  }

  @Method()
  async expandAll(): Promise<void> {
    if (!this.itemDefinitions.length) {
      this.open = true;
      this.value = this.summary;
      return;
    }

    this.openValues = this.multiple ? this.itemDefinitions.map((item) => item.value) : [this.itemDefinitions[0].value];
    this.emitChange(this.openValues);
  }

  @Method()
  async collapseAll(): Promise<void> {
    if (!this.collapsible) {
      return;
    }

    if (!this.itemDefinitions.length) {
      this.open = false;
      this.value = '';
      return;
    }

    this.openValues = [];
    this.emitChange([]);
  }

  private get itemDefinitions(): AccordionItemDefinition[] {
    return parseAccordionItems(this.items);
  }

  private isExpanded(value: string): boolean {
    if (!this.itemDefinitions.length) {
      return this.open;
    }

    return this.openValues.includes(value);
  }

  private emitChange(values: string[]) {
    this.value = values.join(';');
    this.jarvisChange.emit({ values });
  }

  private toggleSingle() {
    if (this.disabled || this.readOnly) {
      return;
    }

    const nextOpen = this.open ? (this.collapsible ? false : true) : true;
    this.open = nextOpen;
    this.value = nextOpen ? this.summary : '';
    this.jarvisToggle.emit({ value: this.summary, open: nextOpen });
    this.emitChange(nextOpen ? [this.summary] : []);
  }

  private toggleItem(item: AccordionItemDefinition) {
    if (this.disabled || this.readOnly || item.disabled) {
      return;
    }

    const expanded = this.isExpanded(item.value);

    if (expanded && !this.collapsible) {
      return;
    }

    let nextOpenValues: string[];

    if (this.multiple) {
      nextOpenValues = expanded ? this.openValues.filter((value) => value !== item.value) : [...this.openValues, item.value];
    } else {
      nextOpenValues = expanded ? [] : [item.value];
    }

    if (!nextOpenValues.length && !this.collapsible) {
      nextOpenValues = [item.value];
    }

    this.openValues = nextOpenValues;
    this.focusedIndex = this.itemDefinitions.findIndex((definition) => definition.value === item.value);
    this.jarvisToggle.emit({ value: item.value, open: !expanded });
    this.emitChange(nextOpenValues);
  }

  private focusTrigger(index: number) {
    const triggers = Array.from(this.host.shadowRoot?.querySelectorAll<HTMLButtonElement>('button.trigger') ?? []);
    const safeIndex = Math.max(0, Math.min(index, triggers.length - 1));
    triggers.forEach((trigger, triggerIndex) => {
      trigger.tabIndex = triggerIndex === safeIndex ? 0 : -1;
    });
    triggers[safeIndex]?.focus();
    this.focusedIndex = safeIndex;
  }

  private onItemKeyDown(event: KeyboardEvent, item: AccordionItemDefinition, index: number) {
    const items = this.itemDefinitions;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.focusTrigger((index + 1) % items.length);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.focusTrigger((index - 1 + items.length) % items.length);
        break;
      case 'Home':
        event.preventDefault();
        this.focusTrigger(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusTrigger(items.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleItem(item);
        break;
      default:
        break;
    }
  }

  render() {
    const itemDefinitions = this.itemDefinitions;
    const sharedStyle = {
      '--accordion-animation-duration': `${Math.max(this.animationDuration, 0)}ms`
    };

    if (itemDefinitions.length) {
      return (
        <Host>
          <div class={{ accordion: true, readonly: this.readOnly, disabled: this.disabled }} part="base" style={sharedStyle}>
            {itemDefinitions.map((item, index) => {
              const expanded = this.isExpanded(item.value);
              const triggerId = `${this.baseId}-trigger-${index}`;
              const panelId = `${this.baseId}-panel-${index}`;

              return (
                <section class={{ item: true, open: expanded, disabled: item.disabled }} part="item">
                  <button
                    type="button"
                    id={triggerId}
                    class="trigger"
                    part="trigger"
                    aria-expanded={String(expanded)}
                    aria-controls={panelId}
                    aria-disabled={this.disabled || this.readOnly || item.disabled ? 'true' : undefined}
                    disabled={this.disabled || item.disabled}
                    tabIndex={index === this.focusedIndex ? 0 : -1}
                    onClick={() => this.toggleItem(item)}
                    onFocus={() => (this.focusedIndex = index)}
                    onKeyDown={(event: KeyboardEvent) => this.onItemKeyDown(event, item, index)}
                  >
                    <span class="summary" part="summary">
                      {item.summary}
                    </span>
                    <span class={{ chevron: true, open: expanded }} part="chevron" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  <div
                    class={{ panel: true, open: expanded }}
                    id={panelId}
                    part="panel"
                    aria-hidden={expanded ? 'false' : 'true'}
                    aria-labelledby={triggerId}
                  >
                    <div class="panel-inner">{item.content ? <p>{item.content}</p> : null}</div>
                  </div>
                </section>
              );
            })}
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <div class={{ accordion: true, readonly: this.readOnly, disabled: this.disabled }} part="base" style={sharedStyle}>
          <section class={{ item: true, open: this.open, disabled: this.disabled }} part="item">
          <button
            type="button"
            class="trigger"
            part="trigger"
            aria-expanded={String(this.open)}
            aria-controls={`${this.baseId}-panel`}
            aria-disabled={this.disabled || this.readOnly ? 'true' : undefined}
            disabled={this.disabled}
            onClick={() => this.toggleSingle()}
          >
            <span class="summary" part="summary">
              {this.summary}
            </span>
            <span class={{ chevron: true, open: this.open }} part="chevron" aria-hidden="true">
              ▾
            </span>
          </button>
          <div class={{ panel: true, open: this.open }} id={`${this.baseId}-panel`} part="panel" aria-hidden={this.open ? 'false' : 'true'}>
            <div class="panel-inner">
              <slot />
            </div>
          </div>
          </section>
        </div>
      </Host>
    );
  }
}
