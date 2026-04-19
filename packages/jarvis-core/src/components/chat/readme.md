# jarvis-chat



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description | Type                                              | Default                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | -------------------------- | ----------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `attachButtonText`       | `attach-button-text`       |             | `string`                                          | `'Attach sample files'`                                                                                                                                                                                                                                                                                                                                                    |
| `attachmentPreset`       | `attachment-preset`        |             | `string`                                          | `'Screenshot.png~10 KB,Instructions.pdf~10 KB'`                                                                                                                                                                                                                                                                                                                            |
| `attachmentsEnabled`     | `attachments-enabled`      |             | `boolean`                                         | `false`                                                                                                                                                                                                                                                                                                                                                                    |
| `composerHelpText`       | `composer-help-text`       |             | `string`                                          | `'Press Ctrl+Enter to send quickly.'`                                                                                                                                                                                                                                                                                                                                      |
| `composerRows`           | `composer-rows`            |             | `number`                                          | `3`                                                                                                                                                                                                                                                                                                                                                                        |
| `disabled`               | `disabled`                 |             | `boolean`                                         | `false`                                                                                                                                                                                                                                                                                                                                                                    |
| `emptyStateText`         | `empty-state-text`         |             | `string`                                          | `'No messages yet.'`                                                                                                                                                                                                                                                                                                                                                       |
| `label`                  | `label`                    |             | `string`                                          | `'Support conversation'`                                                                                                                                                                                                                                                                                                                                                   |
| `maxAttachments`         | `max-attachments`          |             | `number`                                          | `4`                                                                                                                                                                                                                                                                                                                                                                        |
| `messages`               | `messages`                 |             | `string`                                          | `"other\|Support Agent\|11:51 PM\|Hello, John!\\nHow can I assist you today?\|Yesterday 4/14/2026\|;;self\|John Doe\|11:53 PM\|Hi, I'm having trouble accessing my account.\|Yesterday 4/14/2026\|Pic1.png~10 KB,Pic2.png~10 KB;;other\|Support Agent\|11:53 PM\|I can help with that. Can you please confirm your user ID for security purposes?\|Yesterday 4/14/2026\|"` |
| `placeholder`            | `placeholder`              |             | `string`                                          | `'Type a message'`                                                                                                                                                                                                                                                                                                                                                         |
| `removeAttachmentsLabel` | `remove-attachments-label` |             | `string`                                          | `'Remove files'`                                                                                                                                                                                                                                                                                                                                                           |
| `sendLabel`              | `send-label`               |             | `string`                                          | `'Send'`                                                                                                                                                                                                                                                                                                                                                                   |
| `showAttachmentSizes`    | `show-attachment-sizes`    |             | `boolean`                                         | `true`                                                                                                                                                                                                                                                                                                                                                                     |
| `showAvatars`            | `show-avatars`             |             | `boolean`                                         | `true`                                                                                                                                                                                                                                                                                                                                                                     |
| `showComposer`           | `show-composer`            |             | `boolean`                                         | `true`                                                                                                                                                                                                                                                                                                                                                                     |
| `showStatus`             | `show-status`              |             | `boolean`                                         | `true`                                                                                                                                                                                                                                                                                                                                                                     |
| `status`                 | `status`                   |             | `string`                                          | `'Online now'`                                                                                                                                                                                                                                                                                                                                                             |
| `statusTone`             | `status-tone`              |             | `"danger" \| "neutral" \| "success" \| "warning"` | `'neutral'`                                                                                                                                                                                                                                                                                                                                                                |
| `user`                   | `user`                     |             | `string`                                          | `'John Doe'`                                                                                                                                                                                                                                                                                                                                                               |


## Events

| Event                    | Description | Type                                                               |
| ------------------------ | ----------- | ------------------------------------------------------------------ |
| `jarvisAttachmentRemove` |             | `CustomEvent<{ name: string; attachments: ChatAttachment[]; }>`    |
| `jarvisAttachmentToggle` |             | `CustomEvent<{ attachments: ChatAttachment[]; }>`                  |
| `jarvisSend`             |             | `CustomEvent<{ message: string; attachments: ChatAttachment[]; }>` |
| `jarvisTypingEnd`        |             | `CustomEvent<void>`                                                |
| `jarvisTypingStart`      |             | `CustomEvent<void>`                                                |


## Methods

### `clearDraft() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `focusComposer() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"attachment"`      |             |
| `"attachment-chip"` |             |
| `"attachments"`     |             |
| `"avatar"`          |             |
| `"base"`            |             |
| `"bubble"`          |             |
| `"composer"`        |             |
| `"day-divider"`     |             |
| `"empty-state"`     |             |
| `"header"`          |             |
| `"message"`         |             |
| `"status"`          |             |
| `"textarea"`        |             |
| `"thread"`          |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
