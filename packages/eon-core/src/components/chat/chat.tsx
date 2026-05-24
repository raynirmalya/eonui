import { Component, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import type { EonTone } from '../shared/types';

interface ChatAttachment {
  name: string;
  size: string;
}

interface ChatMessage {
  role: 'self' | 'other' | 'system';
  author: string;
  time: string;
  text: string;
  date: string;
  attachments: ChatAttachment[];
}

function parseAttachments(value: string): ChatAttachment[] {
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, size] = entry.split('~').map((segment) => segment.trim());
      return {
        name: name || 'Attachment',
        size: size || ''
      };
    });
}

function parseMessages(value: string): ChatMessage[] {
  return value
    .split(';;')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [role, author, time, text, date, attachments] = entry.split('|');
      return {
        role: role === 'self' || role === 'system' ? role : 'other',
        author: author?.trim() || 'Support Agent',
        time: time?.trim() || '',
        text: (text ?? '').replaceAll('\\n', '\n').trim(),
        date: date?.trim() || '',
        attachments: parseAttachments(attachments ?? '')
      };
    });
}

function getInitials(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'JA';
}

function formatDateLabel(date: Date): string {
  const today = new Date();
  const isSameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isSameDay) {
    return `Today ${today.toLocaleDateString()}`;
  }

  return date.toLocaleDateString();
}

function formatTimeLabel(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });
}

@Component({
  tag: 'eon-chat',
  styleUrl: 'chat.scss',
  shadow: true
})
export class EonChat {
  @Prop() label = 'Support conversation';
  @Prop() user = 'John Doe';
  @Prop() status = 'Online now';
  @Prop() statusTone: EonTone = 'neutral';
  @Prop() showStatus = true;
  @Prop() placeholder = 'Type a message';
  @Prop() emptyStateText = 'No messages yet.';
  @Prop() composerHelpText = 'Press Ctrl+Enter to send quickly.';
  @Prop() sendLabel = 'Send';
  @Prop() attachButtonText = 'Attach sample files';
  @Prop() removeAttachmentsLabel = 'Remove files';
  @Prop() attachmentPreset = 'Screenshot.png~10 KB,Instructions.pdf~10 KB';
  @Prop() disabled = false;
  @Prop() showComposer = true;
  @Prop() attachmentsEnabled = false;
  @Prop() showAvatars = true;
  @Prop() composerRows = 3;
  @Prop() maxAttachments = 4;
  @Prop() showAttachmentSizes = true;
  @Prop() messages =
    "other|Support Agent|11:51 PM|Hello, John!\\nHow can I assist you today?|Yesterday 4/14/2026|;;self|John Doe|11:53 PM|Hi, I'm having trouble accessing my account.|Yesterday 4/14/2026|Pic1.png~10 KB,Pic2.png~10 KB;;other|Support Agent|11:53 PM|I can help with that. Can you please confirm your user ID for security purposes?|Yesterday 4/14/2026|";

  @State() draft = '';
  @State() stagedAttachments: ChatAttachment[] = [];
  @State() sentMessages: ChatMessage[] = [];
  @State() typing = false;

  @Event() eonSend: EventEmitter<{ message: string; attachments: ChatAttachment[] }>;
  @Event() eonTypingStart: EventEmitter<void>;
  @Event() eonTypingEnd: EventEmitter<void>;
  @Event() eonAttachmentToggle: EventEmitter<{ attachments: ChatAttachment[] }>;
  @Event() eonAttachmentRemove: EventEmitter<{ name: string; attachments: ChatAttachment[] }>;

  private composer?: HTMLTextAreaElement;
  private typingTimer?: number;

  disconnectedCallback() {
    if (this.typingTimer) {
      window.clearTimeout(this.typingTimer);
    }
  }

  @Method()
  async focusComposer(): Promise<void> {
    this.composer?.focus();
  }

  @Method()
  async clearDraft(): Promise<void> {
    this.endTyping();
    this.draft = '';
    this.stagedAttachments = [];
  }

  private get thread(): ChatMessage[] {
    return [...parseMessages(this.messages), ...this.sentMessages];
  }

  private beginTyping() {
    if (!this.typing) {
      this.typing = true;
      this.eonTypingStart.emit();
    }

    if (this.typingTimer) {
      window.clearTimeout(this.typingTimer);
    }

    this.typingTimer = window.setTimeout(() => this.endTyping(), 1200);
  }

  private endTyping() {
    if (this.typingTimer) {
      window.clearTimeout(this.typingTimer);
      this.typingTimer = undefined;
    }

    if (this.typing) {
      this.typing = false;
      this.eonTypingEnd.emit();
    }
  }

  private onDraftInput(event: Event) {
    const nextValue = (event.target as HTMLTextAreaElement).value;
    this.draft = nextValue;

    if (nextValue.trim()) {
      this.beginTyping();
    } else {
      this.endTyping();
    }
  }

  private toggleAttachment() {
    if (this.stagedAttachments.length) {
      this.stagedAttachments = [];
    } else {
      const attachments = parseAttachments(this.attachmentPreset);
      this.stagedAttachments = this.maxAttachments > 0 ? attachments.slice(0, this.maxAttachments) : [];
    }

    this.eonAttachmentToggle.emit({ attachments: this.stagedAttachments });
  }

  private removeStagedAttachment(name: string) {
    this.stagedAttachments = this.stagedAttachments.filter((attachment) => attachment.name !== name);
    this.eonAttachmentRemove.emit({
      name,
      attachments: this.stagedAttachments
    });
    this.eonAttachmentToggle.emit({ attachments: this.stagedAttachments });
  }

  private sendMessage() {
    const message = this.draft.trim();

    if (!message && !this.stagedAttachments.length) {
      return;
    }

    const now = new Date();
    const entry: ChatMessage = {
      role: 'self',
      author: this.user,
      time: formatTimeLabel(now),
      text: message,
      date: formatDateLabel(now),
      attachments: this.stagedAttachments
    };

    this.sentMessages = [...this.sentMessages, entry];
    this.eonSend.emit({
      message,
      attachments: this.stagedAttachments
    });

    this.draft = '';
    this.stagedAttachments = [];
    this.endTyping();
  }

  private onComposerKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  }

  render() {
    const thread = this.thread;

    return (
      <Host>
        <section class="chat" part="base" aria-label={this.label}>
          <header class="header" part="header">
            <div class="heading-copy">
              <strong>{this.label}</strong>
              <span>{this.typing ? `${this.user} is typing...` : `${thread.length} messages`}</span>
            </div>
            {this.showStatus && this.status ? (
              <span class={`status-pill ${this.statusTone}`} part="status">
                {this.status}
              </span>
            ) : null}
          </header>

          <div class="thread" part="thread">
            {thread.length ? (
              thread.map((message, index) => {
                const previous = thread[index - 1];
                const showDate = !previous || previous.date !== message.date;

                return (
                  <div class="entry">
                    {showDate ? (
                      <div class="day-divider" part="day-divider">
                        <span>{message.date}</span>
                      </div>
                    ) : null}

                    <article class={{ message: true, [message.role]: true }} part="message">
                      {this.showAvatars && message.role !== 'system' ? (
                        <div class="avatar" part="avatar" aria-hidden="true">
                          {getInitials(message.author)}
                        </div>
                      ) : null}
                      <div class="bubble" part="bubble">
                        <div class="meta">
                          <strong>{message.author}</strong>
                          <span>{message.time}</span>
                        </div>
                        {message.text ? <p>{message.text}</p> : null}
                        {message.attachments.length ? (
                          <div class="attachments" part="attachments">
                            {message.attachments.map((attachment) => (
                              <span class="attachment" part="attachment">
                                <strong>{attachment.name}</strong>
                                {this.showAttachmentSizes && attachment.size ? <small>{attachment.size}</small> : null}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  </div>
                );
              })
            ) : (
              <div class="empty" part="empty-state">
                {this.emptyStateText}
              </div>
            )}
          </div>

          {this.showComposer ? (
            <footer class="composer" part="composer">
              <div class="composer-shell">
                <textarea
                  ref={(element) => (this.composer = element as HTMLTextAreaElement)}
                  part="textarea"
                  rows={this.composerRows}
                  placeholder={this.placeholder}
                  value={this.draft}
                  disabled={this.disabled}
                  onInput={(event) => this.onDraftInput(event)}
                  onKeyDown={(event) => this.onComposerKeyDown(event)}
                />
                {this.stagedAttachments.length ? (
                  <div class="composer-attachments">
                    {this.stagedAttachments.map((attachment) => (
                      <span class="attachment" part="attachment-chip">
                        <strong>{attachment.name}</strong>
                        {this.showAttachmentSizes && attachment.size ? <small>{attachment.size}</small> : null}
                        <button
                          type="button"
                          class="attachment-remove"
                          aria-label={`Remove ${attachment.name}`}
                          disabled={this.disabled}
                          onClick={() => this.removeStagedAttachment(attachment.name)}
                        >
                          x
                        </button>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              {this.composerHelpText ? <p class="composer-help">{this.composerHelpText}</p> : null}
              <div class="actions">
                {this.attachmentsEnabled ? (
                  <button type="button" class="secondary" onClick={() => this.toggleAttachment()} disabled={this.disabled}>
                    {this.stagedAttachments.length
                      ? `${this.removeAttachmentsLabel} (${this.stagedAttachments.length})`
                      : this.attachButtonText}
                  </button>
                ) : null}
                <button
                  type="button"
                  class="primary"
                  onClick={() => this.sendMessage()}
                  disabled={this.disabled || (!this.draft.trim() && !this.stagedAttachments.length)}
                >
                  {this.sendLabel}
                </button>
              </div>
            </footer>
          ) : null}
        </section>
      </Host>
    );
  }
}
