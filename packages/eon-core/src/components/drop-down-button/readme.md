# eon-drop-down-button



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description | Type                              | Default              |
| ------------------------ | -------------------------- | ----------- | --------------------------------- | -------------------- |
| `ariaLabel`              | `aria-label`               |             | `string`                          | `'Drop-down button'` |
| `closeOnSelect`          | `close-on-select`          |             | `boolean`                         | `true`               |
| `disabled`               | `disabled`                 |             | `boolean`                         | `false`              |
| `icon`                   | `icon`                     |             | `string`                          | `''`                 |
| `items`                  | `items`                    |             | `string`                          | `''`                 |
| `label`                  | `label`                    |             | `string`                          | `'Action'`           |
| `showArrowIcon`          | `show-arrow-icon`          |             | `boolean`                         | `true`               |
| `showDescriptions`       | `show-descriptions`        |             | `boolean`                         | `true`               |
| `showSelectionIndicator` | `show-selection-indicator` |             | `boolean`                         | `true`               |
| `size`                   | `size`                     |             | `"lg" \| "md" \| "sm"`            | `'md'`               |
| `splitButton`            | `split-button`             |             | `boolean`                         | `false`              |
| `value`                  | `value`                    |             | `string`                          | `''`                 |
| `variant`                | `variant`                  |             | `"ghost" \| "outline" \| "solid"` | `'outline'`          |


## Events

| Event       | Description | Type                              |
| ----------- | ----------- | --------------------------------- |
| `eonSelect` |             | `CustomEvent<{ value: string; }>` |


## Methods

### `hide() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"base"`            |             |
| `"icon"`            |             |
| `"item"`            |             |
| `"label"`           |             |
| `"panel"`           |             |
| `"primary-trigger"` |             |
| `"toggle-trigger"`  |             |
| `"trigger"`         |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
