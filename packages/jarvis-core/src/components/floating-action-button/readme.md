# jarvis-floating-action-button



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                                          | Default          |
| ------------------ | ------------------- | ----------- | --------------------------------------------- | ---------------- |
| `ariaDescription`  | `aria-description`  |             | `string`                                      | `''`             |
| `closeOnSelect`    | `close-on-select`   |             | `boolean`                                     | `true`           |
| `direction`        | `direction`         |             | `"left" \| "right" \| "up"`                   | `'up'`           |
| `disabled`         | `disabled`          |             | `boolean`                                     | `false`          |
| `extended`         | `extended`          |             | `boolean`                                     | `false`          |
| `icon`             | `icon`              |             | `string`                                      | `'+'`            |
| `items`            | `items`             |             | `string`                                      | `''`             |
| `label`            | `label`             |             | `string`                                      | `'Add'`          |
| `open`             | `open`              |             | `boolean`                                     | `false`          |
| `position`         | `position`          |             | `"bottom-left" \| "bottom-right" \| "inline"` | `'bottom-right'` |
| `showDescriptions` | `show-descriptions` |             | `boolean`                                     | `true`           |


## Events

| Event          | Description | Type                                                            |
| -------------- | ----------- | --------------------------------------------------------------- |
| `jarvisAction` |             | `CustomEvent<{ value: string; label: string; index: number; }>` |
| `jarvisToggle` |             | `CustomEvent<{ open: boolean; }>`                               |


## Methods

### `hide() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"action"`  |             |
| `"actions"` |             |
| `"base"`    |             |
| `"icon"`    |             |
| `"label"`   |             |
| `"trigger"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
