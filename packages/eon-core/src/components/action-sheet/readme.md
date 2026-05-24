# eon-action-sheet



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description | Type                   | Default           |
| ------------------------ | -------------------------- | ----------- | ---------------------- | ----------------- |
| `cancelText`             | `cancel-text`              |             | `string`               | `'Cancel'`        |
| `closeOnOutsideClick`    | `close-on-outside-click`   |             | `boolean`              | `true`            |
| `description`            | `description`              |             | `string`               | `''`              |
| `fullScreen`             | `full-screen`              |             | `boolean`              | `false`           |
| `heading`                | `heading`                  |             | `string`               | `'Choose action'` |
| `items`                  | `items`                    |             | `string`               | `''`              |
| `open`                   | `open`                     |             | `boolean`              | `false`           |
| `presentation`           | `presentation`             |             | `"popover" \| "sheet"` | `'sheet'`         |
| `showCancelButton`       | `show-cancel-button`       |             | `boolean`              | `true`            |
| `showDescriptions`       | `show-descriptions`        |             | `boolean`              | `true`            |
| `showHandle`             | `show-handle`              |             | `boolean`              | `true`            |
| `showSelectionIndicator` | `show-selection-indicator` |             | `boolean`              | `true`            |
| `value`                  | `value`                    |             | `string`               | `''`              |
| `width`                  | `width`                    |             | `string`               | `''`              |


## Events

| Event       | Description | Type                              |
| ----------- | ----------- | --------------------------------- |
| `eonCancel` |             | `CustomEvent<void>`               |
| `eonSelect` |             | `CustomEvent<{ value: string; }>` |


## Methods

### `hide(cancelled?: boolean) => Promise<void>`



#### Parameters

| Name        | Type      | Description |
| ----------- | --------- | ----------- |
| `cancelled` | `boolean` |             |

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"action"`         |             |
| `"actions"`        |             |
| `"cancel-button"`  |             |
| `"dismiss-button"` |             |
| `"footer"`         |             |
| `"handle"`         |             |
| `"header"`         |             |
| `"overlay"`        |             |
| `"panel"`          |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
