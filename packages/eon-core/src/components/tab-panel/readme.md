# eon-tab-panel



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type                                     | Default       |
| ---------------- | ------------------ | ----------- | ---------------------------------------- | ------------- |
| `ariaLabel`      | `aria-label`       |             | `string`                                 | `'Tab panel'` |
| `badges`         | `badges`           |             | `string`                                 | `''`          |
| `current`        | `current`          |             | `number`                                 | `0`           |
| `disabled`       | `disabled`         |             | `boolean`                                | `false`       |
| `disabledTabs`   | `disabled-tabs`    |             | `string`                                 | `''`          |
| `fullWidth`      | `full-width`       |             | `boolean`                                | `false`       |
| `height`         | `height`           |             | `string`                                 | `''`          |
| `iconPosition`   | `icon-position`    |             | `"start" \| "top"`                       | `'start'`     |
| `items`          | `items`            |             | `string`                                 | `''`          |
| `loop`           | `loop`             |             | `boolean`                                | `false`       |
| `readOnly`       | `read-only`        |             | `boolean`                                | `false`       |
| `showNavButtons` | `show-nav-buttons` |             | `boolean`                                | `false`       |
| `showTaskMeta`   | `show-task-meta`   |             | `boolean`                                | `true`        |
| `stylingMode`    | `styling-mode`     |             | `"primary" \| "secondary"`               | `'secondary'` |
| `tabPosition`    | `tab-position`     |             | `"bottom" \| "left" \| "right" \| "top"` | `'top'`       |


## Events

| Event       | Description | Type                                             |
| ----------- | ----------- | ------------------------------------------------ |
| `eonChange` |             | `CustomEvent<{ index: number; label: string; }>` |


## Methods

### `next() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `previous() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `select(index: number) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `index` | `number` |             |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"base"` |             |
| `"body"` |             |
| `"nav"`  |             |
| `"tab"`  |             |
| `"tabs"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
