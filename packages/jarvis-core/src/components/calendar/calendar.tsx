import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { parseOptions } from '../shared/helpers';

function formatDateValue(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function monthLabel(year: number, month: number): string {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(year, month, 1));
}

function weekNumber(date: Date): number {
  const normalized = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = normalized.getUTCDay() || 7;
  normalized.setUTCDate(normalized.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(normalized.getUTCFullYear(), 0, 1));
  return Math.ceil((((normalized.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

@Component({
  tag: 'jarvis-calendar',
  styleUrl: 'calendar.scss',
  shadow: true
})
export class JarvisCalendar {
  @Prop({ mutable: true }) value = '';
  @Prop() selectionMode: 'single' | 'multiple' = 'single';
  @Prop() showWeekNumbers = false;
  @Prop() showTodayButton = false;
  @Prop() todayText = 'Today';
  @Prop() min = '';
  @Prop() max = '';
  @Prop() disabled = false;
  @Prop() firstDayOfWeek = 0;
  @Prop() selectWeekOnClick = false;
  @Prop() disabledDates = '';

  @State() displayMonth = new Date().getMonth();
  @State() displayYear = new Date().getFullYear();

  @Event() jarvisChange: EventEmitter<{ values: string[] }>;

  componentWillLoad() {
    const selected = parseOptions(this.value);
    if (selected[0]) {
      const seed = new Date(selected[0]);
      if (!Number.isNaN(seed.getTime())) {
        this.displayMonth = seed.getMonth();
        this.displayYear = seed.getFullYear();
      }
    }
  }

  private get selectedValues(): string[] {
    return parseOptions(this.value);
  }

  private get disabledDateValues(): Set<string> {
    return new Set(parseOptions(this.disabledDates));
  }

  private get weekdayLabels(): string[] {
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return labels.slice(this.firstDayOfWeek).concat(labels.slice(0, this.firstDayOfWeek));
  }

  private isDateUnavailable(dateValue: string): boolean {
    if (this.disabledDateValues.has(dateValue)) {
      return true;
    }

    if (this.min && dateValue < this.min) {
      return true;
    }

    if (this.max && dateValue > this.max) {
      return true;
    }

    return false;
  }

  private emitValues(nextValues: string[]) {
    this.value = nextValues.join(',');
    this.jarvisChange.emit({ values: nextValues });
  }

  private moveMonth(offset: number) {
    if (this.disabled) {
      return;
    }

    const next = new Date(this.displayYear, this.displayMonth + offset, 1);
    this.displayYear = next.getFullYear();
    this.displayMonth = next.getMonth();
  }

  private jumpToToday() {
    const todayDate = new Date();
    const todayValue = formatDateValue(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

    this.displayYear = todayDate.getFullYear();
    this.displayMonth = todayDate.getMonth();

    if (this.disabled || this.isDateUnavailable(todayValue)) {
      return;
    }

    if (this.selectionMode === 'single') {
      this.emitValues([todayValue]);
    }
  }

  private toggleWeek(seedDateValue: string) {
    const seed = new Date(seedDateValue);
    if (Number.isNaN(seed.getTime())) {
      return;
    }

    const offset = (seed.getDay() - this.firstDayOfWeek + 7) % 7;
    const start = new Date(seed);
    start.setDate(seed.getDate() - offset);

    const nextValues = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return formatDateValue(date.getFullYear(), date.getMonth(), date.getDate());
    }).filter((dateValue) => !this.isDateUnavailable(dateValue));

    this.emitValues(nextValues);
  }

  private toggleDate(dateValue: string) {
    if (this.disabled || this.isDateUnavailable(dateValue)) {
      return;
    }

    if (this.selectWeekOnClick && this.selectionMode === 'multiple') {
      this.toggleWeek(dateValue);
      return;
    }

    const selected = this.selectedValues;
    const nextValues =
      this.selectionMode === 'multiple'
        ? selected.includes(dateValue)
          ? selected.filter((value) => value !== dateValue)
          : [...selected, dateValue]
        : [dateValue];

    this.emitValues(nextValues);
  }

  private createGrid() {
    const start = new Date(this.displayYear, this.displayMonth, 1);
    const daysInMonth = new Date(this.displayYear, this.displayMonth + 1, 0).getDate();
    const previousMonthDays = new Date(this.displayYear, this.displayMonth, 0).getDate();
    const leadingDays = (start.getDay() - this.firstDayOfWeek + 7) % 7;
    const cells: Array<{ label: number; dateValue: string; currentMonth: boolean; disabled: boolean }> = [];

    for (let index = leadingDays - 1; index >= 0; index -= 1) {
      const day = previousMonthDays - index;
      const date = new Date(this.displayYear, this.displayMonth - 1, day);
      const dateValue = formatDateValue(date.getFullYear(), date.getMonth(), date.getDate());
      cells.push({
        label: day,
        dateValue,
        currentMonth: false,
        disabled: this.isDateUnavailable(dateValue)
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dateValue = formatDateValue(this.displayYear, this.displayMonth, day);
      cells.push({
        label: day,
        dateValue,
        currentMonth: true,
        disabled: this.isDateUnavailable(dateValue)
      });
    }

    while (cells.length % 7 !== 0) {
      const overflow = cells.length - (leadingDays + daysInMonth) + 1;
      const date = new Date(this.displayYear, this.displayMonth + 1, overflow);
      const dateValue = formatDateValue(date.getFullYear(), date.getMonth(), date.getDate());
      cells.push({
        label: overflow,
        dateValue,
        currentMonth: false,
        disabled: this.isDateUnavailable(dateValue)
      });
    }

    return cells;
  }

  render() {
    const selected = this.selectedValues;
    const today = formatDateValue(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const cells = this.createGrid();
    return (
      <Host>
        <div class="calendar" part="base">
          <div class="toolbar" part="toolbar">
            <button type="button" class="nav" part="previous" onClick={() => this.moveMonth(-1)} aria-label="Previous month" disabled={this.disabled}>
              ‹
            </button>
            <strong>{monthLabel(this.displayYear, this.displayMonth)}</strong>
            <button type="button" class="nav" part="next" onClick={() => this.moveMonth(1)} aria-label="Next month" disabled={this.disabled}>
              ›
            </button>
          </div>
          <div class={{ weekdays: true, weeks: this.showWeekNumbers }}>
            {this.showWeekNumbers ? <span class="week-heading">Wk</span> : null}
            {this.weekdayLabels.map((day) => (
              <span>{day}</span>
            ))}
          </div>
          <div class={{ grid: true, weeks: this.showWeekNumbers }}>
            {cells.map((cell, index) => {
              const selectedDate = selected.includes(cell.dateValue);
              const showWeek = this.showWeekNumbers && index % 7 === 0;
              const weekDate = new Date(cell.dateValue);
              return [
                showWeek ? <span class="week-number">{weekNumber(weekDate)}</span> : null,
                <button
                  type="button"
                  class={{
                    day: true,
                    'current-month': cell.currentMonth,
                    selected: selectedDate,
                    today: cell.dateValue === today,
                    disabled: cell.disabled
                  }}
                  part="day"
                  onClick={() => this.toggleDate(cell.dateValue)}
                  disabled={this.disabled || cell.disabled}
                  aria-current={cell.dateValue === today ? 'date' : undefined}
                >
                  {cell.label}
                </button>
              ];
            })}
          </div>
          {this.showTodayButton ? (
            <div class="footer" part="footer">
              <button type="button" class="today-button" part="today" disabled={this.disabled} onClick={() => this.jumpToToday()}>
                {this.todayText}
              </button>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
