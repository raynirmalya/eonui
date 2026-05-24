# eon-dialog



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description | Type                   | Default          |
| --------------------- | ------------------------ | ----------- | ---------------------- | ---------------- |
| `closeLabel`          | `close-label`            |             | `string`               | `'Close dialog'` |
| `closeOnOutsideClick` | `close-on-outside-click` |             | `boolean`              | `true`           |
| `description`         | `description`            |             | `string`               | `''`             |
| `fullScreen`          | `full-screen`            |             | `boolean`              | `false`          |
| `heading`             | `heading`                |             | `string`               | `''`             |
| `hideOnEscape`        | `hide-on-escape`         |             | `boolean`              | `true`           |
| `initialFocus`        | `initial-focus`          |             | `"close" \| "panel"`   | `'panel'`        |
| `label`               | `label`                  |             | `string`               | `'Dialog'`       |
| `open`                | `open`                   |             | `boolean`              | `false`          |
| `showCloseButton`     | `show-close-button`      |             | `boolean`              | `true`           |
| `showOverlay`         | `show-overlay`           |             | `boolean`              | `true`           |
| `size`                | `size`                   |             | `"lg" \| "md" \| "sm"` | `'md'`           |
| `width`               | `width`                  |             | `string`               | `''`             |


## Events

| Event      | Description | Type                                                    |
| ---------- | ----------- | ------------------------------------------------------- |
| `eonClose` |             | `CustomEvent<{ reason: "dismiss" \| "programmatic"; }>` |
| `eonOpen`  |             | `CustomEvent<void>`                                     |


## Methods

### `hide(reason?: "dismiss" | "programmatic") => Promise<void>`



#### Parameters

| Name     | Type                          | Description |
| -------- | ----------------------------- | ----------- |
| `reason` | `"dismiss" \| "programmatic"` |             |

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"body"`    |             |
| `"close"`   |             |
| `"footer"`  |             |
| `"header"`  |             |
| `"overlay"` |             |
| `"panel"`   |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
