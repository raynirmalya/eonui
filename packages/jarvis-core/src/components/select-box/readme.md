# jarvis-select-box



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                 | Description | Type                                                     | Default               |
| ---------------------- | ------------------------- | ----------- | -------------------------------------------------------- | --------------------- |
| `acceptCustomValue`    | `accept-custom-value`     |             | `boolean`                                                | `false`               |
| `disabled`             | `disabled`                |             | `boolean`                                                | `false`               |
| `errorText`            | `error-text`              |             | `string`                                                 | `''`                  |
| `grouped`              | `grouped`                 |             | `boolean`                                                | `false`               |
| `helpText`             | `help-text`               |             | `string`                                                 | `''`                  |
| `invalid`              | `invalid`                 |             | `boolean`                                                | `false`               |
| `items`                | `items`                   |             | `string`                                                 | `''`                  |
| `label`                | `label`                   |             | `string`                                                 | `''`                  |
| `minSearchLength`      | `min-search-length`       |             | `number`                                                 | `0`                   |
| `noDataText`           | `no-data-text`            |             | `string`                                                 | `'No matching items'` |
| `openOnFieldClick`     | `open-on-field-click`     |             | `boolean`                                                | `true`                |
| `opened`               | `opened`                  |             | `boolean`                                                | `false`               |
| `placeholder`          | `placeholder`             |             | `string`                                                 | `'Select...'`         |
| `readOnly`             | `read-only`               |             | `boolean`                                                | `false`               |
| `required`             | `required`                |             | `boolean`                                                | `false`               |
| `searchEnabled`        | `search-enabled`          |             | `boolean`                                                | `false`               |
| `searchExpr`           | `search-expr`             |             | `string`                                                 | `''`                  |
| `searchMode`           | `search-mode`             |             | `"contains" \| "equals" \| "startsWith" \| "startswith"` | `'contains'`          |
| `showClearButton`      | `show-clear-button`       |             | `boolean`                                                | `false`               |
| `showDataBeforeSearch` | `show-data-before-search` |             | `boolean`                                                | `true`                |
| `showDropDownButton`   | `show-drop-down-button`   |             | `boolean`                                                | `true`                |
| `value`                | `value`                   |             | `string`                                                 | `''`                  |


## Events

| Event                    | Description | Type                              |
| ------------------------ | ----------- | --------------------------------- |
| `jarvisChange`           |             | `CustomEvent<{ value: string; }>` |
| `jarvisClosed`           |             | `CustomEvent<void>`               |
| `jarvisCustomItemCreate` |             | `CustomEvent<{ value: string; }>` |
| `jarvisOpened`           |             | `CustomEvent<void>`               |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"base"`       |             |
| `"control"`    |             |
| `"error-text"` |             |
| `"help-text"`  |             |
| `"panel"`      |             |
| `"search"`     |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
