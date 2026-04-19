# jarvis-accordion



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type      | Default     |
| ------------------- | -------------------- | ----------- | --------- | ----------- |
| `animationDuration` | `animation-duration` |             | `number`  | `220`       |
| `collapsible`       | `collapsible`        |             | `boolean` | `true`      |
| `disabled`          | `disabled`           |             | `boolean` | `false`     |
| `items`             | `items`              |             | `string`  | `''`        |
| `multiple`          | `multiple`           |             | `boolean` | `false`     |
| `open`              | `open`               |             | `boolean` | `false`     |
| `readOnly`          | `read-only`          |             | `boolean` | `false`     |
| `summary`           | `summary`            |             | `string`  | `'Details'` |
| `value`             | `value`              |             | `string`  | `''`        |


## Events

| Event          | Description | Type                                             |
| -------------- | ----------- | ------------------------------------------------ |
| `jarvisChange` |             | `CustomEvent<{ values: string[]; }>`             |
| `jarvisToggle` |             | `CustomEvent<{ value: string; open: boolean; }>` |


## Methods

### `collapseAll() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `expandAll() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"base"`    |             |
| `"chevron"` |             |
| `"item"`    |             |
| `"panel"`   |             |
| `"summary"` |             |
| `"trigger"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
