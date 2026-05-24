# eon-combobox



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                 | Description | Type                                                     | Default               |
| ---------------------- | ------------------------- | ----------- | -------------------------------------------------------- | --------------------- |
| `acceptCustomValue`    | `accept-custom-value`     |             | `boolean`                                                | `false`               |
| `disabled`             | `disabled`                |             | `boolean`                                                | `false`               |
| `errorText`            | `error-text`              |             | `string`                                                 | `''`                  |
| `helpText`             | `help-text`               |             | `string`                                                 | `''`                  |
| `invalid`              | `invalid`                 |             | `boolean`                                                | `false`               |
| `label`                | `label`                   |             | `string`                                                 | `''`                  |
| `minSearchLength`      | `min-search-length`       |             | `number`                                                 | `0`                   |
| `noDataText`           | `no-data-text`            |             | `string`                                                 | `'No matching items'` |
| `openOnFieldClick`     | `open-on-field-click`     |             | `boolean`                                                | `true`                |
| `opened`               | `opened`                  |             | `boolean`                                                | `false`               |
| `options`              | `options`                 |             | `string`                                                 | `''`                  |
| `placeholder`          | `placeholder`             |             | `string`                                                 | `'Select an option'`  |
| `readOnly`             | `read-only`               |             | `boolean`                                                | `false`               |
| `required`             | `required`                |             | `boolean`                                                | `false`               |
| `searchExpr`           | `search-expr`             |             | `string`                                                 | `''`                  |
| `searchMode`           | `search-mode`             |             | `"contains" \| "equals" \| "startsWith" \| "startswith"` | `'contains'`          |
| `showClearButton`      | `show-clear-button`       |             | `boolean`                                                | `false`               |
| `showDataBeforeSearch` | `show-data-before-search` |             | `boolean`                                                | `true`                |
| `showDropDownButton`   | `show-drop-down-button`   |             | `boolean`                                                | `true`                |
| `value`                | `value`                   |             | `string`                                                 | `''`                  |


## Events

| Event                 | Description | Type                              |
| --------------------- | ----------- | --------------------------------- |
| `eonChange`           |             | `CustomEvent<{ value: string; }>` |
| `eonClosed`           |             | `CustomEvent<void>`               |
| `eonCustomItemCreate` |             | `CustomEvent<{ value: string; }>` |
| `eonInput`            |             | `CustomEvent<{ value: string; }>` |
| `eonOpened`           |             | `CustomEvent<void>`               |


## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"base"`    |             |
| `"clear"`   |             |
| `"control"` |             |
| `"listbox"` |             |
| `"option"`  |             |
| `"toggle"`  |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
