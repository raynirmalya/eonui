# eon-menu



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description | Type                              | Default        |
| ------------------------ | -------------------------- | ----------- | --------------------------------- | -------------- |
| `ariaDescription`        | `aria-description`         |             | `string`                          | `''`           |
| `ariaLabel`              | `aria-label`               |             | `string`                          | `'Menu'`       |
| `closeOnMouseLeave`      | `close-on-mouse-leave`     |             | `boolean`                         | `false`        |
| `closeOnSelect`          | `close-on-select`          |             | `boolean`                         | `true`         |
| `items`                  | `items`                    |             | `string`                          | `''`           |
| `orientation`            | `orientation`              |             | `"horizontal" \| "vertical"`      | `'horizontal'` |
| `showDescriptions`       | `show-descriptions`        |             | `boolean`                         | `true`         |
| `showFirstSubmenuMode`   | `show-first-submenu-mode`  |             | `"click" \| "hover" \| undefined` | `undefined`    |
| `showSelectionIndicator` | `show-selection-indicator` |             | `boolean`                         | `true`         |
| `triggerMode`            | `trigger-mode`             |             | `"click" \| "hover"`              | `'click'`      |
| `value`                  | `value`                    |             | `string`                          | `''`           |


## Events

| Event       | Description | Type                              |
| ----------- | ----------- | --------------------------------- |
| `eonSelect` |             | `CustomEvent<{ value: string; }>` |


## Methods

### `collapseAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expandAll() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"item"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
