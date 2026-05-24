# eon-file-manager



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type                     | Default              |
| ------------------- | -------------------- | ----------- | ------------------------ | -------------------- |
| `allowCreate`       | `allow-create`       |             | `boolean`                | `true`               |
| `allowDelete`       | `allow-delete`       |             | `boolean`                | `true`               |
| `allowDownload`     | `allow-download`     |             | `boolean`                | `true`               |
| `allowRename`       | `allow-rename`       |             | `boolean`                | `true`               |
| `allowUpload`       | `allow-upload`       |             | `boolean`                | `true`               |
| `currentPath`       | `current-path`       |             | `string`                 | `'Files/Widescreen'` |
| `heading`           | `heading`            |             | `string`                 | `'Files'`            |
| `items`             | `items`              |             | `string`                 | `defaultItems`       |
| `searchPlaceholder` | `search-placeholder` |             | `string`                 | `'Search files'`     |
| `selectionMode`     | `selection-mode`     |             | `"multiple" \| "single"` | `'single'`           |
| `showPreview`       | `show-preview`       |             | `boolean`                | `true`               |
| `showSearch`        | `show-search`        |             | `boolean`                | `true`               |


## Events

| Event           | Description | Type                                                                                                                       |
| --------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `eonAction`     |             | `CustomEvent<{ action: string; path?: string \| undefined; paths?: string[] \| undefined; query?: string \| undefined; }>` |
| `eonPathChange` |             | `CustomEvent<{ path: string; }>`                                                                                           |
| `eonSelect`     |             | `CustomEvent<{ path: string; kind: string; }>`                                                                             |


## Methods

### `clearSelection() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openPath(path: string) => Promise<void>`



#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `path` | `string` |             |

#### Returns

Type: `Promise<void>`



### `refresh() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part             | Description |
| ---------------- | ----------- |
| `"action-panel"` |             |
| `"base"`         |             |
| `"cards"`        |             |
| `"content"`      |             |
| `"empty-state"`  |             |
| `"preview"`      |             |
| `"sidebar"`      |             |
| `"table"`        |             |
| `"toolbar"`      |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
