import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import { parseOptions } from '../shared/helpers';

interface SortableCard {
  column: string;
  title: string;
  meta: string;
  tone: string;
  value: string;
}

interface SortableColumn {
  name: string;
  cards: SortableCard[];
}

function parseSortableItems(value: string): SortableColumn[] {
  const groups = new Map<string, SortableCard[]>();

  value
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .forEach((entry, index) => {
      const [columnAndTitle, meta, tone] = entry.split('|').map((segment) => segment.trim());
      const [column, title] = columnAndTitle.includes('/')
        ? columnAndTitle.split('/').map((segment) => segment.trim())
        : ['Items', columnAndTitle];
      const card: SortableCard = {
        column: column || 'Items',
        title: title || `Card ${index + 1}`,
        meta: meta || '',
        tone: tone || 'neutral',
        value: `${column || 'Items'}/${title || `Card ${index + 1}`}`
      };
      groups.set(card.column, [...(groups.get(card.column) ?? []), card]);
    });

  return [...groups.entries()].map(([name, cards]) => ({
    name,
    cards
  }));
}

function serializeSortableItems(columns: SortableColumn[]): string {
  return columns
    .flatMap((column) => column.cards.map((card) => `${column.name}/${card.title}|${card.meta}|${card.tone}`))
    .join('; ');
}

@Component({
  tag: 'eon-sortable',
  styleUrl: 'sortable.scss',
  shadow: true
})
export class EonSortable {
  @Prop() items =
    'Not Started/Report on the State of Engineering Dept|Bart Armaz|success; Not Started/Staff Productivity Report|Brett Wade|success; Need Assistance/Update Employee Files with New NDA|Greta Sims|success; Need Assistance/Sign Updated NDA|Ed Holmes|warning; In Progress/Health Insurance|Samantha Bright|warning; In Progress/NDA|Greta Sims|warning; Deferred/New HDMI Spec|Bart Armaz|success; Deferred/Refund Request|Ed Holmes|danger';
  @Prop() disabled = false;
  @Prop() columns = '';
  @Prop() emptyColumnText = 'Drop cards here';
  @Prop() showMeta = true;
  @Prop() showCounts = true;
  @Prop() compact = false;
  @Prop() ariaLabel = 'Sortable board';

  @State() boardColumns: SortableColumn[] = [];

  @Event() eonReorder: EventEmitter<{ value: string; fromColumn: string; toColumn: string; index: number }>;

  private dragged?: { columnIndex: number; cardIndex: number };

  componentWillLoad() {
    this.syncColumns();
  }

  @Watch('items')
  @Watch('columns')
  syncColumns() {
    const parsedColumns = parseSortableItems(this.items);
    const explicitColumns = parseOptions(this.columns);
    const seen = new Set(parsedColumns.map((column) => column.name));
    const missingColumns = explicitColumns
      .filter((column) => !seen.has(column))
      .map((name) => ({ name, cards: [] as SortableCard[] }));
    this.boardColumns = [...parsedColumns, ...missingColumns];
  }

  private onDragStart(columnIndex: number, cardIndex: number, event: DragEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.dragged = { columnIndex, cardIndex };
    event.dataTransfer?.setData('text/plain', `${columnIndex}:${cardIndex}`);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  private onDragOver(event: DragEvent) {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  private moveCard(targetColumnIndex: number, targetCardIndex: number | null) {
    if (!this.dragged) {
      return;
    }

    const nextColumns = this.boardColumns.map((column) => ({
      name: column.name,
      cards: [...column.cards]
    }));

    const sourceColumn = nextColumns[this.dragged.columnIndex];
    const [card] = sourceColumn.cards.splice(this.dragged.cardIndex, 1);
    if (!card) {
      return;
    }

    const destinationColumn = nextColumns[targetColumnIndex];
    let insertionIndex = targetCardIndex ?? destinationColumn.cards.length;

    if (this.dragged.columnIndex === targetColumnIndex && targetCardIndex !== null && this.dragged.cardIndex < targetCardIndex) {
      insertionIndex -= 1;
    }

    destinationColumn.cards.splice(Math.max(insertionIndex, 0), 0, {
      ...card,
      column: destinationColumn.name
    });

    this.boardColumns = nextColumns;
    this.eonReorder.emit({
      value: serializeSortableItems(nextColumns),
      fromColumn: sourceColumn.name,
      toColumn: destinationColumn.name,
      index: Math.max(insertionIndex, 0)
    });
    this.dragged = undefined;
  }

  render() {
    return (
      <Host>
        <div class="board" part="base" aria-label={this.ariaLabel}>
          {this.boardColumns.map((column, columnIndex) => (
            <section
              class={{ column: true, compact: this.compact }}
              part="column"
              onDragOver={(event) => this.onDragOver(event)}
              onDrop={() => this.moveCard(columnIndex, null)}
            >
              <header class="column-header" part="column-header">
                <strong>{column.name}</strong>
                {this.showCounts ? <span>{column.cards.length}</span> : null}
              </header>
              <div class="column-body">
                {column.cards.map((card, cardIndex) => (
                  <article
                    class={{ card: true, [card.tone]: true }}
                    part="card"
                    draggable={!this.disabled}
                    onDragStart={(event) => this.onDragStart(columnIndex, cardIndex, event)}
                    onDragOver={(event) => this.onDragOver(event)}
                    onDrop={() => this.moveCard(columnIndex, cardIndex)}
                  >
                    <div class="card-accent" aria-hidden="true"></div>
                    <div class="card-content">
                      <strong>{card.title}</strong>
                      {this.showMeta && card.meta ? <span>{card.meta}</span> : null}
                    </div>
                    <span class="grip" aria-hidden="true">
                      ::
                    </span>
                  </article>
                ))}
                {!column.cards.length ? (
                  <div class="empty-state" part="empty-state">
                    {this.emptyColumnText}
                  </div>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </Host>
    );
  }
}
