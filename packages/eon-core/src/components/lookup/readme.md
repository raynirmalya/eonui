# eon-lookup



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                 | Description | Type                                                     | Default                 |
| ---------------------- | ------------------------- | ----------- | -------------------------------------------------------- | ----------------------- |
| `disabled`             | `disabled`                |             | `boolean`                                                | `false`                 |
| `errorText`            | `error-text`              |             | `string`                                                 | `''`                    |
| `grouped`              | `grouped`                 |             | `boolean`                                                | `false`                 |
| `heading`              | `heading`                 |             | `string`                                                 | `'Select item'`         |
| `helpText`             | `help-text`               |             | `string`                                                 | `''`                    |
| `invalid`              | `invalid`                 |             | `boolean`                                                | `false`                 |
| `items`                | `items`                   |             | `string`                                                 | `''`                    |
| `label`                | `label`                   |             | `string`                                                 | `''`                    |
| `minSearchLength`      | `min-search-length`       |             | `number`                                                 | `0`                     |
| `noDataText`           | `no-data-text`            |             | `string`                                                 | `'No matching results'` |
| `openOnFieldClick`     | `open-on-field-click`     |             | `boolean`                                                | `true`                  |
| `opened`               | `opened`                  |             | `boolean`                                                | `false`                 |
| `placeholder`          | `placeholder`             |             | `string`                                                 | `'Choose...'`           |
| `readOnly`             | `read-only`               |             | `boolean`                                                | `false`                 |
| `required`             | `required`                |             | `boolean`                                                | `false`                 |
| `searchEnabled`        | `search-enabled`          |             | `boolean`                                                | `true`                  |
| `searchExpr`           | `search-expr`             |             | `string`                                                 | `''`                    |
| `searchMode`           | `search-mode`             |             | `"contains" \| "equals" \| "startsWith" \| "startswith"` | `'contains'`            |
| `searchPlaceholder`    | `search-placeholder`      |             | `string`                                                 | `'Search'`              |
| `showCancelButton`     | `show-cancel-button`      |             | `boolean`                                                | `true`                  |
| `showClearButton`      | `show-clear-button`       |             | `boolean`                                                | `false`                 |
| `showDataBeforeSearch` | `show-data-before-search` |             | `boolean`                                                | `true`                  |
| `showDropDownButton`   | `show-drop-down-button`   |             | `boolean`                                                | `true`                  |
| `value`                | `value`                   |             | `string`                                                 | `''`                    |


## Events

| Event       | Description | Type                              |
| ----------- | ----------- | --------------------------------- |
| `eonChange` |             | `CustomEvent<{ value: string; }>` |
| `eonClosed` |             | `CustomEvent<void>`               |
| `eonOpened` |             | `CustomEvent<void>`               |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"base"`       |             |
| `"control"`    |             |
| `"error-text"` |             |
| `"help-text"`  |             |
| `"panel"`      |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
