# eon-popup



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description | Type                                              | Default         |
| --------------------- | ------------------------ | ----------- | ------------------------------------------------- | --------------- |
| `ariaDescription`     | `aria-description`       |             | `string`                                          | `''`            |
| `bodyPadding`         | `body-padding`           |             | `"comfortable" \| "none"`                         | `'comfortable'` |
| `closeLabel`          | `close-label`            |             | `string`                                          | `'Close popup'` |
| `closeOnOutsideClick` | `close-on-outside-click` |             | `boolean`                                         | `true`          |
| `description`         | `description`            |             | `string`                                          | `''`            |
| `eyebrow`             | `eyebrow`                |             | `string`                                          | `''`            |
| `fullScreen`          | `full-screen`            |             | `boolean`                                         | `false`         |
| `heading`             | `heading`                |             | `string`                                          | `'Popup'`       |
| `height`              | `height`                 |             | `string`                                          | `''`            |
| `hideOnEscape`        | `hide-on-escape`         |             | `boolean`                                         | `true`          |
| `initialFocus`        | `initial-focus`          |             | `"close" \| "panel"`                              | `'panel'`       |
| `maxHeight`           | `max-height`             |             | `string`                                          | `''`            |
| `open`                | `open`                   |             | `boolean`                                         | `false`         |
| `position`            | `position`               |             | `"bottom" \| "center" \| "top"`                   | `'center'`      |
| `showCloseButton`     | `show-close-button`      |             | `boolean`                                         | `true`          |
| `showFooter`          | `show-footer`            |             | `boolean`                                         | `true`          |
| `showHandle`          | `show-handle`            |             | `boolean`                                         | `false`         |
| `showHeader`          | `show-header`            |             | `boolean`                                         | `true`          |
| `showOverlay`         | `show-overlay`           |             | `boolean`                                         | `true`          |
| `size`                | `size`                   |             | `"lg" \| "md" \| "sm" \| "xl"`                    | `'md'`          |
| `status`              | `status`                 |             | `string`                                          | `''`            |
| `stickyFooter`        | `sticky-footer`          |             | `boolean`                                         | `false`         |
| `tone`                | `tone`                   |             | `"danger" \| "neutral" \| "success" \| "warning"` | `'neutral'`     |
| `width`               | `width`                  |             | `string`                                          | `''`            |


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

| Part         | Description |
| ------------ | ----------- |
| `"body"`     |             |
| `"close"`    |             |
| `"footer"`   |             |
| `"handle"`   |             |
| `"header"`   |             |
| `"overlay"`  |             |
| `"panel"`    |             |
| `"status"`   |             |
| `"subtitle"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
