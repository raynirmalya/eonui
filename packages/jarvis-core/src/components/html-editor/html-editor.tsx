import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch, h, Host } from '@stencil/core';

const defaultValue = `
<h1>Formatted Text Editor (HTML Editor)</h1>
<p>Jarvis HTML Editor helps you format text, create lists, and embed links or media without leaving the design system.</p>
<ul>
  <li>Inline emphasis and headings</li>
  <li>Links, lists, and block quotes</li>
  <li>Lightweight media insertion</li>
</ul>
<blockquote>Use Jarvis HTML Editor for editorial experiences, settings pages, and knowledge workflows.</blockquote>
`;

@Component({
  tag: 'jarvis-html-editor',
  styleUrl: 'html-editor.scss',
  shadow: true
})
export class JarvisHtmlEditor {
  @Element() host!: HTMLElement;
  @Prop({ mutable: true }) value = defaultValue;
  @Prop() placeholder = 'Start writing...';
  @Prop() height = '30rem';
  @Prop() disabled = false;
  @Prop() readOnly = false;
  @Prop() showToolbar = true;
  @Prop() showWordCount = true;
  @Prop() showSourceToggle = true;
  @Prop() toolbarPreset: 'full' | 'minimal' = 'full';

  @State() html = defaultValue;
  @State() sourceMode = false;

  @Event() jarvisChange: EventEmitter<{ value: string }>;

  private editor?: HTMLDivElement;

  @Watch('value')
  syncValue(nextValue: string) {
    this.html = nextValue;
    if (this.editor && this.editor.innerHTML !== nextValue) {
      this.editor.innerHTML = nextValue;
    }
  }

  componentWillLoad() {
    this.html = this.value;
  }

  @Method()
  async focusEditor(): Promise<void> {
    this.editor?.focus();
  }

  @Method()
  async clear(): Promise<void> {
    this.html = '';
    this.value = '';
    if (this.editor) {
      this.editor.innerHTML = '';
    }
    this.jarvisChange.emit({ value: '' });
  }

  @Method()
  async toggleSourceView(): Promise<void> {
    this.sourceMode = !this.sourceMode;
  }

  private syncFromEditor() {
    this.html = this.editor?.innerHTML ?? '';
    this.value = this.html;
    this.jarvisChange.emit({ value: this.html });
  }

  private applyCommand(command: string, argument?: string) {
    if (this.disabled || this.readOnly) {
      return;
    }

    this.editor?.focus();
    document.execCommand(command, false, argument);
    this.syncFromEditor();
  }

  private insertLink() {
    this.applyCommand('createLink', 'https://jarvis-ui.dev/docs');
  }

  private insertImage() {
    this.applyCommand('insertHTML', '<figure><img src="https://placehold.co/640x320/e2e8f0/0f172a?text=Jarvis+Media" alt="Inserted media" /></figure>');
  }

  private insertCodeBlock() {
    this.applyCommand('insertHTML', '<pre><code>const workspace = { name: "Jarvis UI", stage: "review" };</code></pre>');
  }

  private insertTable() {
    this.applyCommand(
      'insertHTML',
      '<table><thead><tr><th>Milestone</th><th>Owner</th></tr></thead><tbody><tr><td>Design review</td><td>Maya</td></tr><tr><td>QA signoff</td><td>Victor</td></tr></tbody></table>'
    );
  }

  private insertCallout() {
    this.applyCommand(
      'insertHTML',
      '<aside class="callout"><strong>Review note</strong><p>Use callouts for policy changes, handoff notes, and guidance that should stay visually distinct.</p></aside>'
    );
  }

  private get plainText(): string {
    return (this.sourceMode ? this.html.replace(/<[^>]+>/g, ' ') : this.editor?.innerText ?? '').trim();
  }

  private get textLength(): number {
    return this.plainText.length;
  }

  private get wordCount(): number {
    return this.plainText ? this.plainText.split(/\s+/).length : 0;
  }

  render() {
    const locked = this.disabled || this.readOnly;

    return (
      <Host>
        <div class="shell" part="base">
          {this.showToolbar ? (
            <div class="toolbar" part="toolbar">
              <div class="group">
                <button type="button" onClick={() => this.applyCommand('undo')} disabled={locked || this.sourceMode}>Undo</button>
                <button type="button" onClick={() => this.applyCommand('redo')} disabled={locked || this.sourceMode}>Redo</button>
              </div>
              {this.toolbarPreset === 'full' ? (
                <div class="group">
                  <select onInput={(event) => this.applyCommand('fontName', (event.target as HTMLSelectElement).value)} disabled={locked || this.sourceMode}>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Inter">Inter</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                  <select onInput={(event) => this.applyCommand('fontSize', (event.target as HTMLSelectElement).value)} disabled={locked || this.sourceMode}>
                    <option value="3">Body</option>
                    <option value="4">Lead</option>
                    <option value="5">Heading</option>
                  </select>
                </div>
              ) : null}
              <div class="group">
                <button type="button" onClick={() => this.applyCommand('bold')} disabled={locked || this.sourceMode}>B</button>
                <button type="button" onClick={() => this.applyCommand('italic')} disabled={locked || this.sourceMode}>I</button>
                <button type="button" onClick={() => this.applyCommand('underline')} disabled={locked || this.sourceMode}>U</button>
                <button type="button" onClick={() => this.applyCommand('strikeThrough')} disabled={locked || this.sourceMode}>S</button>
                {this.toolbarPreset === 'full' ? <button type="button" onClick={() => this.applyCommand('justifyLeft')} disabled={locked || this.sourceMode}>Left</button> : null}
                {this.toolbarPreset === 'full' ? <button type="button" onClick={() => this.applyCommand('justifyCenter')} disabled={locked || this.sourceMode}>Center</button> : null}
                {this.toolbarPreset === 'full' ? <button type="button" onClick={() => this.applyCommand('justifyRight')} disabled={locked || this.sourceMode}>Right</button> : null}
              </div>
              <div class="group">
                <select onInput={(event) => this.applyCommand('formatBlock', (event.target as HTMLSelectElement).value)} disabled={locked || this.sourceMode}>
                  <option value="P">Paragraph</option>
                  <option value="H1">Heading 1</option>
                  <option value="H2">Heading 2</option>
                  <option value="BLOCKQUOTE">Quote</option>
                </select>
                <button type="button" onClick={() => this.applyCommand('insertUnorderedList')} disabled={locked || this.sourceMode}>List</button>
                <button type="button" onClick={() => this.applyCommand('insertOrderedList')} disabled={locked || this.sourceMode}>1.</button>
                {this.toolbarPreset === 'full' ? <button type="button" onClick={() => this.insertLink()} disabled={locked || this.sourceMode}>Link</button> : null}
                {this.toolbarPreset === 'full' ? <button type="button" onClick={() => this.insertImage()} disabled={locked || this.sourceMode}>Image</button> : null}
                {this.toolbarPreset === 'full' ? <button type="button" onClick={() => this.insertTable()} disabled={locked || this.sourceMode}>Table</button> : null}
                {this.toolbarPreset === 'full' ? <button type="button" onClick={() => this.insertCodeBlock()} disabled={locked || this.sourceMode}>Code</button> : null}
                {this.toolbarPreset === 'full' ? <button type="button" onClick={() => this.insertCallout()} disabled={locked || this.sourceMode}>Callout</button> : null}
                <button type="button" onClick={() => this.clear()} disabled={locked}>Clear</button>
              </div>
              {this.showSourceToggle ? (
                <div class="group">
                  <button type="button" class={{ selected: this.sourceMode }} onClick={() => (this.sourceMode = !this.sourceMode)} disabled={this.disabled}>
                    {this.sourceMode ? 'Preview' : 'HTML'}
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
          {this.sourceMode ? (
            <textarea
              class={{ source: true, disabled: locked }}
              part="editor"
              style={{ minHeight: this.height }}
              value={this.html}
              placeholder={this.placeholder}
              readOnly={locked}
              onInput={(event) => {
                this.html = (event.target as HTMLTextAreaElement).value;
                this.value = this.html;
                this.jarvisChange.emit({ value: this.html });
              }}
            ></textarea>
          ) : (
            <div
              class={{ editor: true, disabled: locked }}
              part="editor"
              style={{ minHeight: this.height }}
              contentEditable={!locked}
              innerHTML={this.html}
              data-placeholder={this.placeholder}
              onInput={() => this.syncFromEditor()}
              ref={(element) => (this.editor = element as HTMLDivElement)}
            ></div>
          )}
          <div class="footer" part="footer">
            <span>{this.textLength} characters{this.showWordCount ? ` · ${this.wordCount} words` : ''}</span>
            <span>{locked ? 'Read only' : this.sourceMode ? 'HTML source' : 'Editable'}</span>
          </div>
        </div>
      </Host>
    );
  }
}
