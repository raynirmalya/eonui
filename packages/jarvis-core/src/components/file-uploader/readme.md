# jarvis-file-uploader



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type                    | Default                    |
| ------------------ | -------------------- | ----------- | ----------------------- | -------------------------- |
| `accept`           | `accept`             |             | `string`                | `''`                       |
| `browseText`       | `browse-text`        |             | `string`                | `'Select files'`           |
| `clearButtonText`  | `clear-button-text`  |             | `string`                | `'Clear all'`              |
| `disabled`         | `disabled`           |             | `boolean`               | `false`                    |
| `dropzone`         | `dropzone`           |             | `boolean`               | `true`                     |
| `dropzoneHint`     | `dropzone-hint`      |             | `string`                | `'Or drag files here'`     |
| `emptyStateText`   | `empty-state-text`   |             | `string`                | `'No files selected yet.'` |
| `errorText`        | `error-text`         |             | `string`                | `''`                       |
| `helpText`         | `help-text`          |             | `string`                | `''`                       |
| `invalid`          | `invalid`            |             | `boolean`               | `false`                    |
| `label`            | `label`              |             | `string`                | `''`                       |
| `maxFileSize`      | `max-file-size`      |             | `number`                | `0`                        |
| `maxFiles`         | `max-files`          |             | `number`                | `0`                        |
| `multiple`         | `multiple`           |             | `boolean`               | `false`                    |
| `required`         | `required`           |             | `boolean`               | `false`                    |
| `showFileList`     | `show-file-list`     |             | `boolean`               | `true`                     |
| `uploadButtonText` | `upload-button-text` |             | `string`                | `'Upload selected files'`  |
| `uploadMode`       | `upload-mode`        |             | `"instant" \| "manual"` | `'manual'`                 |


## Events

| Event          | Description | Type                                                |
| -------------- | ----------- | --------------------------------------------------- |
| `jarvisChange` |             | `CustomEvent<{ files: string[]; }>`                 |
| `jarvisReject` |             | `CustomEvent<{ files: string[]; reason: string; }>` |
| `jarvisUpload` |             | `CustomEvent<{ files: string[]; }>`                 |


## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"base"`          |             |
| `"dropzone"`      |             |
| `"error"`         |             |
| `"help"`          |             |
| `"item"`          |             |
| `"list"`          |             |
| `"upload-button"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
