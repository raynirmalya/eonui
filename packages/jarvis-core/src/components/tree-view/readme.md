# jarvis-tree-view



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description | Type                                     | Default                |
| ---------------------- | ------------------------ | ----------- | ---------------------------------------- | ---------------------- |
| `ariaLabel`            | `aria-label`             |             | `string`                                 | `'Tree view'`          |
| `clearSelectionText`   | `clear-selection-text`   |             | `string`                                 | `'Clear'`              |
| `collapseAllLabel`     | `collapse-all-label`     |             | `string`                                 | `'Collapse all'`       |
| `emptyStateText`       | `empty-state-text`       |             | `string`                                 | `'No matching nodes.'` |
| `expandAllLabel`       | `expand-all-label`       |             | `string`                                 | `'Expand all'`         |
| `items`                | `items`                  |             | `string`                                 | `''`                   |
| `searchEnabled`        | `search-enabled`         |             | `boolean`                                | `false`                |
| `searchMode`           | `search-mode`            |             | `"contains" \| "equals" \| "startsWith"` | `'contains'`           |
| `searchPlaceholder`    | `search-placeholder`     |             | `string`                                 | `'Search tree'`        |
| `selectAllText`        | `select-all-text`        |             | `string`                                 | `'Select visible'`     |
| `selectByClick`        | `select-by-click`        |             | `boolean`                                | `true`                 |
| `selectNodesRecursive` | `select-nodes-recursive` |             | `boolean`                                | `false`                |
| `selected`             | `selected`               |             | `string`                                 | `''`                   |
| `selectionMode`        | `selection-mode`         |             | `"multiple" \| "single"`                 | `'single'`             |
| `showCheckBoxesMode`   | `show-check-boxes-mode`  |             | `"none" \| "normal"`                     | `'none'`               |
| `showSelectAll`        | `show-select-all`        |             | `boolean`                                | `false`                |
| `showStatus`           | `show-status`            |             | `boolean`                                | `false`                |
| `showToolbar`          | `show-toolbar`           |             | `boolean`                                | `false`                |


## Events

| Event          | Description | Type                                                 |
| -------------- | ----------- | ---------------------------------------------------- |
| `jarvisChange` |             | `CustomEvent<{ values: string[]; }>`                 |
| `jarvisToggle` |             | `CustomEvent<{ value: string; expanded: boolean; }>` |


## Methods

### `clearSelection() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `collapseAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expandAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `selectAllVisible() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"base"`            |             |
| `"children"`        |             |
| `"clear-selection"` |             |
| `"collapse-all"`    |             |
| `"empty"`           |             |
| `"expand-all"`      |             |
| `"label"`           |             |
| `"node"`            |             |
| `"search"`          |             |
| `"select-all"`      |             |
| `"status"`          |             |
| `"toggle"`          |             |
| `"toolbar"`         |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
