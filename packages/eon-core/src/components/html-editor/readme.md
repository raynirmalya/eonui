# eon-html-editor



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type                  | Default              |
| ------------------ | -------------------- | ----------- | --------------------- | -------------------- |
| `disabled`         | `disabled`           |             | `boolean`             | `false`              |
| `height`           | `height`             |             | `string`              | `'30rem'`            |
| `placeholder`      | `placeholder`        |             | `string`              | `'Start writing...'` |
| `readOnly`         | `read-only`          |             | `boolean`             | `false`              |
| `showSourceToggle` | `show-source-toggle` |             | `boolean`             | `true`               |
| `showToolbar`      | `show-toolbar`       |             | `boolean`             | `true`               |
| `showWordCount`    | `show-word-count`    |             | `boolean`             | `true`               |
| `toolbarPreset`    | `toolbar-preset`     |             | `"full" \| "minimal"` | `'full'`             |
| `value`            | `value`              |             | `string`              | `defaultValue`       |


## Events

| Event       | Description | Type                              |
| ----------- | ----------- | --------------------------------- |
| `eonChange` |             | `CustomEvent<{ value: string; }>` |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `focusEditor() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggleSourceView() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"base"`    |             |
| `"editor"`  |             |
| `"footer"`  |             |
| `"toolbar"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
