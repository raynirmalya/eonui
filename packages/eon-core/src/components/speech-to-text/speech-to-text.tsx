import { Component, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult?: (event: SpeechRecognitionEventLike) => void;
  onstart?: () => void;
  onend?: () => void;
  onerror?: (event: { error?: string }) => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

@Component({
  tag: 'eon-speech-to-text',
  styleUrl: 'speech-to-text.scss',
  shadow: true
})
export class EonSpeechToText {
  @Prop() label = 'Use voice recognition';
  @Prop() startText = 'Start listening';
  @Prop() stopText = 'Stop listening';
  @Prop() hint = 'Recognized text will appear here...';
  @Prop() language = 'en-US';
  @Prop() disabled = false;
  @Prop() interimResults = true;
  @Prop() continuous = false;
  @Prop() animation = true;
  @Prop() displayMode: 'icon' | 'button' | 'extended' = 'icon';
  @Prop({ mutable: true }) value = '';
  @Prop() showTranscript = true;
  @Prop() showClearButton = true;
  @Prop() clearOnStart = false;
  @Prop() autoStopAfterFinal = false;
  @Prop() maxLength = 0;
  @Prop() showOptions = false;
  @Prop() availableLanguages = 'en-US|English (US);en-GB|English (UK);hi-IN|Hindi;fr-FR|French';

  @State() listening = false;
  @State() interimText = '';
  @State() supported = true;
  @State() activeLanguage = 'en-US';
  @State() activeInterimResults = true;
  @State() activeContinuous = false;

  @Event() eonResult: EventEmitter<{ value: string; final: boolean }>;
  @Event() eonStart: EventEmitter<void>;
  @Event() eonEnd: EventEmitter<{ value: string }>;
  @Event() eonError: EventEmitter<{ message: string }>;
  @Event() eonUnsupported: EventEmitter<void>;

  private recognition?: SpeechRecognitionInstance;

  componentWillLoad() {
    this.supported = Boolean(this.getRecognitionConstructor());
    this.activeLanguage = this.language;
    this.activeInterimResults = this.interimResults;
    this.activeContinuous = this.continuous;
  }

  disconnectedCallback() {
    this.recognition?.abort();
  }

  @Method()
  async start(): Promise<void> {
    if (this.disabled) {
      return;
    }

    this.ensureRecognition();

    if (!this.recognition) {
      this.supported = false;
      this.eonUnsupported.emit();
      return;
    }

    this.recognition.lang = this.activeLanguage;
    this.recognition.interimResults = this.activeInterimResults;
    this.recognition.continuous = this.activeContinuous;

    try {
      if (this.clearOnStart) {
        this.value = '';
        this.interimText = '';
      }
      this.recognition.start();
    } catch (error) {
      this.eonError.emit({
        message: error instanceof Error ? error.message : 'Speech recognition could not start.'
      });
    }
  }

  @Method()
  async stop(): Promise<void> {
    this.recognition?.stop();
  }

  @Method()
  async clear(): Promise<void> {
    this.value = '';
    this.interimText = '';
  }

  private getRecognitionConstructor(): SpeechRecognitionConstructor | undefined {
    const speechWindow = (typeof globalThis === 'undefined' ? undefined : globalThis) as
      | (typeof globalThis & {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        })
      | undefined;

    if (!speechWindow) {
      return undefined;
    }

    return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
  }

  private get languageOptions(): Array<{ value: string; label: string }> {
    return this.availableLanguages
      .split(';')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [value, label] = entry.split('|').map((part) => part.trim());
        return {
          value,
          label: label || value
        };
      });
  }

  private ensureRecognition() {
    if (this.recognition) {
      return;
    }

    const Recognition = this.getRecognitionConstructor();
    if (!Recognition) {
      return;
    }

    const recognition = new Recognition();
    recognition.onresult = (event) => this.handleResult(event);
    recognition.onstart = () => {
      this.listening = true;
      this.eonStart.emit();
    };
    recognition.onend = () => {
      this.listening = false;
      this.interimText = '';
      this.eonEnd.emit({ value: this.value });
    };
    recognition.onerror = (event) => {
      this.listening = false;
      this.eonError.emit({ message: event.error ?? 'speech-recognition-error' });
    };

    this.recognition = recognition;
  }

  private handleResult(event: SpeechRecognitionEventLike) {
    const finalSegments: string[] = [];
    const interimSegments: string[] = [];

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const transcript = event.results[index]?.[0]?.transcript?.trim();
      if (!transcript) {
        continue;
      }

      if (event.results[index].isFinal) {
        finalSegments.push(transcript);
      } else {
        interimSegments.push(transcript);
      }
    }

    if (finalSegments.length) {
      this.value = [this.value, ...finalSegments].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
      if (this.maxLength > 0) {
        this.value = this.value.slice(0, this.maxLength);
      }
      this.eonResult.emit({ value: this.value, final: true });
      if (this.autoStopAfterFinal) {
        this.stop();
      }
    }

    this.interimText = interimSegments.join(' ').trim();
    if (this.maxLength > 0) {
      this.interimText = this.interimText.slice(0, Math.max(0, this.maxLength - this.value.length));
    }

    if (this.interimText) {
      this.eonResult.emit({ value: [this.value, this.interimText].filter(Boolean).join(' ').trim(), final: false });
    }
  }

  private onToggle() {
    if (this.listening) {
      this.stop();
      return;
    }

    this.start();
  }

  render() {
    const transcript = [this.value, this.interimText].filter(Boolean).join(' ').trim();

    return (
      <Host>
        <div class="shell" part="base">
          <div class="header">
            <div>
              <strong>{this.label}</strong>
              <p>{this.supported ? 'Capture voice input directly in the browser.' : 'Speech recognition is not supported in this browser.'}</p>
            </div>
            <button
              type="button"
              class={{ trigger: true, listening: this.listening, [this.displayMode]: true }}
              part="trigger"
              disabled={this.disabled || !this.supported}
              aria-pressed={this.listening ? 'true' : 'false'}
              onClick={() => this.onToggle()}
            >
              <span class="microphone" aria-hidden="true">
                {this.listening ? 'REC' : 'MIC'}
              </span>
              {this.displayMode !== 'icon' ? <span>{this.listening ? this.stopText : this.startText}</span> : null}
            </button>
          </div>
          {this.showTranscript ? (
            <div class={{ transcript: true, listening: this.listening && this.animation }} part="transcript">
              {transcript ? <span>{transcript}</span> : <span class="hint">{this.hint}</span>}
            </div>
          ) : null}
          {this.showOptions ? (
            <div class="options" part="options">
              <label class="option">
                <span>Language</span>
                <select
                  disabled={this.disabled || !this.supported || this.listening}
                  onInput={(event) => {
                    this.activeLanguage = (event.target as HTMLSelectElement).value;
                  }}
                >
                  {this.languageOptions.map((option) => (
                    <option value={option.value} selected={option.value === this.activeLanguage}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label class="toggle-option">
                <input
                  type="checkbox"
                  checked={this.activeInterimResults}
                  disabled={this.disabled || !this.supported || this.listening}
                  onInput={(event) => {
                    this.activeInterimResults = (event.target as HTMLInputElement).checked;
                  }}
                />
                <span>Interim results</span>
              </label>
              <label class="toggle-option">
                <input
                  type="checkbox"
                  checked={this.activeContinuous}
                  disabled={this.disabled || !this.supported || this.listening}
                  onInput={(event) => {
                    this.activeContinuous = (event.target as HTMLInputElement).checked;
                  }}
                />
                <span>Continuous recognition</span>
              </label>
            </div>
          ) : null}
          <div class="footer">
            <span class="status">
              {this.listening ? `Listening - ${this.activeLanguage}` : this.supported ? `Idle - ${this.activeLanguage}` : 'Unavailable'}
              {this.maxLength > 0 ? ` Â· ${transcript.length}/${this.maxLength}` : ''}
            </span>
            {this.showClearButton ? (
              <button type="button" class="clear" part="clear-button" disabled={!this.value && !this.interimText} onClick={() => this.clear()}>
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </Host>
    );
  }
}
