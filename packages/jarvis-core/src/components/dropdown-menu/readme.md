# jarvis-dropdown-menu



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description | Type                                                         | Default                  |
| --------------------- | ------------------------ | ----------- | ------------------------------------------------------------ | ------------------------ |
| `closeOnOutsideClick` | `close-on-outside-click` |             | `boolean`                                                    | `true`                   |
| `items`               | `items`                  |             | `string`                                                     | `''`                     |
| `label`               | `label`                  |             | `string`                                                     | `'Open menu'`            |
| `noDataText`          | `no-data-text`           |             | `string`                                                     | `'No actions available'` |
| `open`                | `open`                   |             | `boolean`                                                    | `false`                  |
| `placement`           | `placement`              |             | `"bottom-end" \| "bottom-start" \| "top-end" \| "top-start"` | `'bottom-start'`         |
| `showSelection`       | `show-selection`         |             | `boolean`                                                    | `false`                  |
| `triggerMode`         | `trigger-mode`           |             | `"click" \| "hover"`                                         | `'click'`                |
| `value`               | `value`                  |             | `string`                                                     | `''`                     |


## Events

| Event              | Description | Type                                             |
| ------------------ | ----------- | ------------------------------------------------ |
| `jarvisOpenChange` |             | `CustomEvent<{ open: boolean; }>`                |
| `jarvisSelect`     |             | `CustomEvent<{ value: string; label: string; }>` |


## Methods

### `hide() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part              | Description |
| ----------------- | ----------- |
| `"base"`          |             |
| `"empty-state"`   |             |
| `"item"`          |             |
| `"panel"`         |             |
| `"section"`       |             |
| `"section-label"` |             |
| `"trigger"`       |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
