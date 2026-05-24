import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'eon-pagination',
  styleUrl: 'pagination.scss',
  shadow: true
})
export class EonPagination {
  @Prop() page = 1;
  @Prop() total = 1;
  @Prop() disabled = false;

  @Event() eonPageChange: EventEmitter<{ page: number }>;

  private goTo(nextPage: number) {
    const page = Math.max(1, Math.min(this.total, nextPage));
    this.eonPageChange.emit({ page });
  }

  render() {
    return (
      <Host>
        <nav class="pagination" part="base" aria-label="Pagination">
          <button type="button" part="previous" disabled={this.disabled || this.page <= 1} onClick={() => this.goTo(this.page - 1)}>
            Previous
          </button>
          <span part="status">Page {this.page} of {this.total}</span>
          <button type="button" part="next" disabled={this.disabled || this.page >= this.total} onClick={() => this.goTo(this.page + 1)}>
            Next
          </button>
        </nav>
      </Host>
    );
  }
}
