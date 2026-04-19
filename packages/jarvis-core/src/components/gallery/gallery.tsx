import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';

interface GallerySlide {
  title: string;
  subtitle: string;
  meta: string;
  palette: string[];
}

function parseSlides(value: string): GallerySlide[] {
  return value
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item, index) => {
      const [contentPart, colorsPart] = item.split('|');
      const [titlePart, subtitlePart, metaPart] = (contentPart ?? '')
        .split('~')
        .map((segment) => segment.trim());
      const palette = (colorsPart ?? '').split(',').map((color) => color.trim()).filter(Boolean);
      return {
        title: titlePart?.trim() || `Slide ${index + 1}`,
        subtitle: subtitlePart ?? 'Premium media surface',
        meta: metaPart ?? '',
        palette: palette.length ? palette : ['#c3dafe', '#60a5fa']
      };
    });
}

@Component({
  tag: 'jarvis-gallery',
  styleUrl: 'gallery.scss',
  shadow: true
})
export class JarvisGallery {
  @Prop() items =
    'Coastal residence~Oceanfront suite with panoramic windows~Featured stay|#dbeafe,#93c5fd; Downtown studio~Creative review room and lounge~Urban workspace|#e0f2fe,#38bdf8; Forest retreat~Calm woodland lodge with spa access~Wellness escape|#dcfce7,#22c55e';
  @Prop() loop = true;
  @Prop() showNavButtons = true;
  @Prop() showIndicators = true;
  @Prop() showCaptions = true;
  @Prop() showThumbnails = false;
  @Prop() slideShow = false;
  @Prop() slideShowDelay = 3200;
  @Prop() pauseOnHover = false;
  @Prop() keyboardNavigation = true;
  @Prop() height = '';
  @Prop() startIndex = 0;
  @Prop({ reflect: true }) thumbnailPosition: 'bottom' | 'side' = 'bottom';
  @Prop() showCounter = false;

  @State() currentIndex = 0;
  @State() hovering = false;

  @Event() jarvisSelect: EventEmitter<{ index: number; title: string }>;

  private timer?: number;

  @Watch('slideShow')
  @Watch('slideShowDelay')
  @Watch('pauseOnHover')
  handlePlaybackChange() {
    this.syncTimer();
  }

  @Watch('items')
  handleItemsChange() {
    const slides = parseSlides(this.items);
    const initialIndex = Math.max(0, Math.min(this.startIndex, Math.max(slides.length - 1, 0)));
    this.currentIndex = slides.length ? Math.min(this.currentIndex, Math.max(slides.length - 1, 0)) : initialIndex;
    this.syncTimer();
  }

  @Watch('startIndex')
  handleStartIndexChange(nextStartIndex: number) {
    const slides = parseSlides(this.items);
    this.currentIndex = Math.max(0, Math.min(nextStartIndex, Math.max(slides.length - 1, 0)));
  }

  componentDidLoad() {
    this.handleStartIndexChange(this.startIndex);
    this.syncTimer();
  }

  disconnectedCallback() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private syncTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.slideShow && !(this.pauseOnHover && this.hovering)) {
      this.timer = window.setInterval(() => this.next(), this.slideShowDelay);
    }
  }

  private setIndex(nextIndex: number) {
    const slides = parseSlides(this.items);
    if (!slides.length) {
      this.currentIndex = 0;
      return;
    }

    const boundedIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
    this.currentIndex = boundedIndex;
    this.jarvisSelect.emit({
      index: boundedIndex,
      title: slides[boundedIndex]?.title ?? `Slide ${boundedIndex + 1}`
    });
  }

  private next() {
    const slides = parseSlides(this.items);
    if (!slides.length) {
      return;
    }

    if (this.currentIndex >= slides.length - 1) {
      this.setIndex(this.loop ? 0 : slides.length - 1);
      return;
    }

    this.setIndex(this.currentIndex + 1);
  }

  private previous() {
    const slides = parseSlides(this.items);
    if (!slides.length) {
      return;
    }

    if (this.currentIndex <= 0) {
      this.setIndex(this.loop ? slides.length - 1 : 0);
      return;
    }

    this.setIndex(this.currentIndex - 1);
  }

  private onPointerEnter() {
    if (!this.pauseOnHover) {
      return;
    }

    this.hovering = true;
    this.syncTimer();
  }

  private onPointerLeave() {
    if (!this.pauseOnHover) {
      return;
    }

    this.hovering = false;
    this.syncTimer();
  }

  private onKeyDown(event: KeyboardEvent) {
    if (!this.keyboardNavigation) {
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setIndex(parseSlides(this.items).length - 1);
    }
  }

  render() {
    const slides = parseSlides(this.items);
    const current = slides[this.currentIndex] ?? slides[0];

    return (
      <Host>
        <div class={{ gallery: true, thumbnailsSide: this.showThumbnails && this.thumbnailPosition === 'side' }} part="base">
          <div
            class="viewport"
            part="viewport"
            tabindex={this.keyboardNavigation ? 0 : undefined}
            style={{ '--gallery-height': this.height || undefined }}
            onMouseEnter={() => this.onPointerEnter()}
            onMouseLeave={() => this.onPointerLeave()}
            onKeyDown={(event) => this.onKeyDown(event)}
          >
            <div
              class="slide"
              part="slide"
              style={{
                background: current
                  ? `linear-gradient(135deg, ${current.palette[0]} 0%, ${current.palette[1] ?? current.palette[0]} 100%)`
                  : undefined
              }}
            >
              <div class="media-grid" aria-hidden="true">
                <div class="media-card primary"></div>
                <div class="media-card secondary"></div>
                <div class="media-card tertiary"></div>
              </div>
              <div class="overlay">
                {current?.meta ? <span class="eyebrow">{current.meta}</span> : null}
                <strong>{current?.title ?? 'Gallery'}</strong>
                <span>{current?.subtitle ?? 'Premium media surface'}</span>
              </div>
              {this.showCounter && slides.length ? (
                <div class="counter" part="counter">
                  {this.currentIndex + 1} / {slides.length}
                </div>
              ) : null}
            </div>
            {this.showNavButtons
              ? [
                  <button type="button" class="nav prev" part="prev-button" aria-label="Previous slide" onClick={() => this.previous()}>
                    &lt;
                  </button>,
                  <button type="button" class="nav next" part="next-button" aria-label="Next slide" onClick={() => this.next()}>
                    &gt;
                  </button>
                ]
              : null}
          </div>
          {this.showCaptions && current ? (
            <div class="caption" part="caption">
              <div>
                <strong>{current.title}</strong>
                <p>{current.subtitle}</p>
              </div>
              {current.meta ? <span class="meta-badge">{current.meta}</span> : null}
            </div>
          ) : null}
          {this.showThumbnails ? (
            <div class="thumbnails" part="thumbnails">
              {slides.map((slide, index) => (
                <button
                  type="button"
                  class={{ thumbnail: true, active: index === this.currentIndex }}
                  part="thumbnail"
                  aria-label={`Show ${slide.title}`}
                  onClick={() => this.setIndex(index)}
                >
                  <span
                    class="thumbnail-swatch"
                    aria-hidden="true"
                    style={{
                      background: `linear-gradient(135deg, ${slide.palette[0]} 0%, ${slide.palette[1] ?? slide.palette[0]} 100%)`
                    }}
                  ></span>
                  <span class="thumbnail-label">
                    <strong>{slide.title}</strong>
                    <small>{slide.meta || slide.subtitle}</small>
                  </span>
                </button>
              ))}
            </div>
          ) : null}
          {this.showIndicators ? (
            <div class="indicators" part="indicators">
              {slides.map((_slide, index) => (
                <button
                  type="button"
                  class={{ dot: true, active: index === this.currentIndex }}
                  part="indicator"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => this.setIndex(index)}
                ></button>
              ))}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
