import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { createId } from '@jarvis/utils';

interface UploadItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'selected' | 'uploading' | 'uploaded' | 'error';
}

@Component({
  tag: 'jarvis-file-uploader',
  styleUrl: 'file-uploader.scss',
  shadow: true
})
export class JarvisFileUploader {
  @Prop() label = '';
  @Prop() accept = '';
  @Prop() multiple = false;
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() invalid = false;
  @Prop() helpText = '';
  @Prop() errorText = '';
  @Prop() uploadMode: 'manual' | 'instant' = 'manual';
  @Prop() dropzone = true;
  @Prop() maxFiles = 0;
  @Prop() maxFileSize = 0;
  @Prop() showFileList = true;
  @Prop() browseText = 'Select files';
  @Prop() dropzoneHint = 'Or drag files here';
  @Prop() uploadButtonText = 'Upload selected files';
  @Prop() clearButtonText = 'Clear all';
  @Prop() emptyStateText = 'No files selected yet.';

  @State() files: UploadItem[] = [];
  @State() dragActive = false;
  @State() validationMessage = '';
  @State() runtimeMessage = '';

  @Event() jarvisChange: EventEmitter<{ files: string[] }>;
  @Event() jarvisUpload: EventEmitter<{ files: string[] }>;
  @Event() jarvisReject: EventEmitter<{ files: string[]; reason: string }>;

  private inputId = createId('jarvis-file-uploader');
  private inputEl?: HTMLInputElement;
  private timers = new Map<string, number>();

  disconnectedCallback() {
    this.clearTimers();
  }

  private fileSizeLabel(size: number): string {
    if (size >= 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }

    if (size >= 1024) {
      return `${Math.round(size / 1024)} KB`;
    }

    return `${size} B`;
  }

  private clearTimers() {
    this.timers.forEach((timer) => clearInterval(timer));
    this.timers.clear();
  }

  private clearTimer(id: string) {
    const timer = this.timers.get(id);
    if (timer) {
      clearInterval(timer);
      this.timers.delete(id);
    }
  }

  private clearInputValue() {
    if (this.inputEl) {
      this.inputEl.value = '';
    }
  }

  private acceptsFile(file: File): boolean {
    if (!this.accept.trim()) {
      return true;
    }

    const acceptedTokens = this.accept
      .split(',')
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean);
    const fileName = file.name.toLowerCase();
    const extension = fileName.includes('.') ? fileName.slice(fileName.lastIndexOf('.')) : '';
    const mime = file.type.toLowerCase();

    return acceptedTokens.some((token) => {
      if (token === '*/*') {
        return true;
      }

      if (token.startsWith('.')) {
        return extension === token;
      }

      if (token.endsWith('/*')) {
        return mime.startsWith(token.slice(0, -1));
      }

      return mime === token;
    });
  }

  private createUploadItem(file: File, index: number): UploadItem {
    return {
      id: `${file.name}-${file.lastModified}-${file.size}-${Date.now()}-${index}`,
      name: file.name,
      size: this.fileSizeLabel(file.size),
      progress: 0,
      status: this.uploadMode === 'instant' ? 'uploading' : 'selected'
    };
  }

  private statusLabel(status: UploadItem['status']): string {
    if (status === 'uploaded') {
      return 'Uploaded';
    }

    if (status === 'uploading') {
      return 'Uploading';
    }

    if (status === 'error') {
      return 'Error';
    }

    return 'Selected';
  }

  private describeSelection(count: number, verb: 'selected' | 'accepted' | 'uploaded') {
    return `${count} file${count === 1 ? '' : 's'} ${verb}.`;
  }

  private syncFiles(fileList: FileList | null) {
    if (!fileList) {
      return;
    }

    this.clearInputValue();

    let acceptedFiles = Array.from(fileList);
    const currentFiles = this.multiple ? [...this.files] : [];
    let rejectionMessage = '';

    const reject = (files: File[], reason: string) => {
      if (!files.length) {
        return;
      }

      rejectionMessage = rejectionMessage || reason;
      this.jarvisReject.emit({ files: files.map((file) => file.name), reason });
    };

    if (!this.multiple && acceptedFiles.length > 1) {
      reject(acceptedFiles.slice(1), 'Only one file can be selected for this field.');
      acceptedFiles = acceptedFiles.slice(0, 1);
    }

    const rejectedByAccept = acceptedFiles.filter((file) => !this.acceptsFile(file));
    reject(
      rejectedByAccept,
      this.accept
        ? `Only files matching ${this.accept} can be selected here.`
        : 'One or more files are not accepted for this field.'
    );
    acceptedFiles = acceptedFiles.filter((file) => this.acceptsFile(file));

    if (this.maxFileSize > 0) {
      const rejectedBySize = acceptedFiles.filter((file) => file.size > this.maxFileSize);
      reject(rejectedBySize, `Each file must be ${this.fileSizeLabel(this.maxFileSize)} or smaller.`);
      acceptedFiles = acceptedFiles.filter((file) => file.size <= this.maxFileSize);
    }

    if (this.maxFiles > 0) {
      const availableSlots = Math.max(this.maxFiles - currentFiles.length, 0);
      if (acceptedFiles.length > availableSlots) {
        reject(acceptedFiles.slice(availableSlots), `You can add up to ${this.maxFiles} file${this.maxFiles === 1 ? '' : 's'} here.`);
        acceptedFiles = acceptedFiles.slice(0, availableSlots);
      }
    }

    const nextFiles = acceptedFiles.map((file, index) => this.createUploadItem(file, index));

    if (!nextFiles.length) {
      this.validationMessage = rejectionMessage;
      this.runtimeMessage = rejectionMessage || this.runtimeMessage;
      return;
    }

    this.files = this.multiple ? [...currentFiles, ...nextFiles] : nextFiles;
    this.validationMessage = rejectionMessage;
    this.runtimeMessage = rejectionMessage
      ? `${this.describeSelection(nextFiles.length, 'accepted')} Review the error message for skipped files.`
      : this.describeSelection(nextFiles.length, this.uploadMode === 'instant' ? 'accepted' : 'selected');
    this.jarvisChange.emit({ files: this.files.map((file) => file.name) });

    if (this.uploadMode === 'instant') {
      nextFiles.forEach((file) => this.simulateUpload(file.id));
    }
  }

  private simulateUpload(id: string) {
    this.clearTimer(id);

    const timer = window.setInterval(() => {
      const item = this.files.find((file) => file.id === id);
      if (!item) {
        this.clearTimer(id);
        return;
      }

      const nextProgress = Math.min(item.progress + 20, 100);
      this.files = this.files.map((file) =>
        file.id === id
          ? {
              ...file,
              progress: nextProgress,
              status: nextProgress >= 100 ? 'uploaded' : 'uploading'
            }
          : file
      );

      if (nextProgress >= 100) {
        this.clearTimer(id);
        if (this.files.every((file) => file.status === 'uploaded')) {
          this.runtimeMessage = this.describeSelection(this.files.length, 'uploaded');
          this.jarvisUpload.emit({ files: this.files.map((file) => file.name) });
        }
      }
    }, 180);

    this.timers.set(id, timer);
  }

  private removeFile(id: string) {
    this.clearTimer(id);
    this.files = this.files.filter((file) => file.id !== id);
    this.runtimeMessage = this.files.length ? `${this.files.length} file${this.files.length === 1 ? '' : 's'} remaining.` : 'All files cleared.';
    this.jarvisChange.emit({ files: this.files.map((file) => file.name) });
  }

  private uploadAll() {
    const pendingIds = this.files.filter((file) => file.status === 'selected' || file.status === 'error').map((file) => file.id);
    if (!pendingIds.length) {
      return;
    }

    this.files = this.files.map((file) =>
      pendingIds.includes(file.id)
        ? {
            ...file,
            progress: 0,
            status: 'uploading'
          }
        : file
    );
    this.runtimeMessage = `Uploading ${pendingIds.length} file${pendingIds.length === 1 ? '' : 's'}.`;
    pendingIds.forEach((id) => this.simulateUpload(id));
  }

  private clearAll() {
    this.clearTimers();
    this.files = [];
    this.validationMessage = '';
    this.runtimeMessage = 'All selected files were removed.';
    this.clearInputValue();
    this.jarvisChange.emit({ files: [] });
  }

  render() {
    const hasSelectedFiles = this.files.some((file) => file.status === 'selected');
    const hasFiles = this.files.length > 0;
    const errorMessage =
      this.invalid && this.errorText
        ? this.errorText
        : this.validationMessage || (this.invalid ? this.errorText || 'Please review the selected files.' : '');
    const helpMessage = errorMessage ? '' : this.helpText;
    const describedBy = [helpMessage ? `${this.inputId}-help` : '', errorMessage ? `${this.inputId}-error` : '', this.runtimeMessage ? `${this.inputId}-status` : '']
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <Host>
        <div class="uploader" part="base">
          {this.label ? (
            <div class="field-head">
              <span class="label" id={`${this.inputId}-label`}>
                {this.label}
              </span>
              {this.required ? <span class="required" aria-hidden="true">*</span> : null}
            </div>
          ) : null}
          <label
            class={{ dropzone: true, active: this.dragActive, disabled: this.disabled, invalid: !!errorMessage }}
            part="dropzone"
            onDragOver={(event) => {
              if (!this.dropzone || this.disabled) {
                return;
              }
              event.preventDefault();
              this.dragActive = true;
            }}
            onDragLeave={() => (this.dragActive = false)}
            onDrop={(event) => {
              if (!this.dropzone || this.disabled) {
                return;
              }
              event.preventDefault();
              this.dragActive = false;
              this.syncFiles(event.dataTransfer?.files ?? null);
            }}
          >
            <input
              id={this.inputId}
              type="file"
              accept={this.accept || undefined}
              multiple={this.multiple}
              disabled={this.disabled}
              required={this.required}
              aria-labelledby={this.label ? `${this.inputId}-label` : undefined}
              aria-describedby={describedBy}
              aria-invalid={errorMessage ? 'true' : 'false'}
              ref={(element) => (this.inputEl = element as HTMLInputElement)}
              onInput={(event) => this.syncFiles((event.target as HTMLInputElement).files)}
            />
            <div class="drop-content">
              <span class="browse-chip">{this.browseText}</span>
              <strong>{this.dropzone ? 'Drop files here or browse from your device' : 'Choose files from your device'}</strong>
              <span>{this.dropzone ? this.dropzoneHint : 'Browse from your device to add attachments.'}</span>
              <div class="constraints">
                {this.accept ? <span>Accepted: {this.accept}</span> : null}
                {this.maxFiles > 0 ? <span>Up to {this.maxFiles} file{this.maxFiles === 1 ? '' : 's'}</span> : null}
                {this.maxFileSize > 0 ? <span>Max {this.fileSizeLabel(this.maxFileSize)}</span> : null}
              </div>
            </div>
          </label>
          {!hasFiles ? <div class="empty-state">{this.emptyStateText}</div> : null}
          {this.showFileList && hasFiles ? (
            <div class="file-list" part="list">
              {this.files.map((file) => (
                <div class="file-item" part="item">
                  <div class="meta">
                    <strong>{file.name}</strong>
                    <span>{file.size}</span>
                  </div>
                  <div class="progress-shell">
                    <div class="progress" style={{ width: `${file.progress}%` }}></div>
                  </div>
                  <div class="status-row">
                    <span class={`status ${file.status}`}>{this.statusLabel(file.status)}</span>
                    <button type="button" class="button secondary" onClick={() => this.removeFile(file.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {hasFiles ? (
            <div class="actions">
              {this.uploadMode === 'manual' ? (
                <button type="button" class="button primary" part="upload-button" disabled={!hasSelectedFiles} onClick={() => this.uploadAll()}>
                  {this.uploadButtonText}
                </button>
              ) : null}
              <button type="button" class="button secondary" onClick={() => this.clearAll()}>
                {this.clearButtonText}
              </button>
            </div>
          ) : null}
          {helpMessage ? (
            <div class="assistive help" id={`${this.inputId}-help`} part="help">
              {helpMessage}
            </div>
          ) : null}
          {errorMessage ? (
            <div class="assistive error" id={`${this.inputId}-error`} part="error">
              {errorMessage}
            </div>
          ) : null}
          {this.runtimeMessage ? (
            <div class="assistive status" id={`${this.inputId}-status`} aria-live="polite">
              {this.runtimeMessage}
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
