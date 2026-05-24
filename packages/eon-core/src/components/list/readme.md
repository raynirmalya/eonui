# eon-list



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description | Type                                     | Default                       |
| ----------------------- | ------------------------- | ----------- | ---------------------------------------- | ----------------------------- |
| `ariaLabel`             | `aria-label`              |             | `string`                                 | `'List'`                      |
| `clearSelectionText`    | `clear-selection-text`    |             | `string`                                 | `'Clear'`                     |
| `emptyStateText`        | `empty-state-text`        |             | `string`                                 | `'No items match this view.'` |
| `height`                | `height`                  |             | `string`                                 | `''`                          |
| `items`                 | `items`                   |             | `string`                                 | `''`                          |
| `ordered`               | `ordered`                 |             | `boolean`                                | `false`                       |
| `searchEnabled`         | `search-enabled`          |             | `boolean`                                | `false`                       |
| `searchMode`            | `search-mode`             |             | `"contains" \| "equals" \| "startsWith"` | `'contains'`                  |
| `searchPlaceholder`     | `search-placeholder`      |             | `string`                                 | `'Search list'`               |
| `selectAllText`         | `select-all-text`         |             | `string`                                 | `'Select all'`                |
| `selected`              | `selected`                |             | `string`                                 | `''`                          |
| `selectionMode`         | `selection-mode`          |             | `"multiple" \| "none" \| "single"`       | `'none'`                      |
| `showSelectAll`         | `show-select-all`         |             | `boolean`                                | `false`                       |
| `showSelectionControls` | `show-selection-controls` |             | `boolean`                                | `false`                       |
| `showStatus`            | `show-status`             |             | `boolean`                                | `false`                       |
| `showToolbar`           | `show-toolbar`            |             | `boolean`                                | `false`                       |


## Events

| Event       | Description | Type                                 |
| ----------- | ----------- | ------------------------------------ |
| `eonChange` |             | `CustomEvent<{ values: string[]; }>` |


## Methods

### `clearSelection() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `selectAll() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"actions"`         |             |
| `"base"`            |             |
| `"clear-selection"` |             |
| `"empty"`           |             |
| `"group"`           |             |
| `"group-label"`     |             |
| `"item"`            |             |
| `"search"`          |             |
| `"select-all"`      |             |
| `"status"`          |             |
| `"toolbar"`         |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
